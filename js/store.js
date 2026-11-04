// Event log stored in localStorage and synced to a private GitHub repo.
// Events are append-only and merged by id, so several devices can sync safely.

const LS_EVENTS = 'gdc.events';
const LS_CFG = 'gdc.cfg';
const API = 'https://api.github.com';

const DEFAULT_CFG = {
  owner: 'anR-29',
  repo: 'gate-da-progress',
  token: '',
  examDate: '2027-02-06',
  device: '',
};

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked: the in-memory copy still works for this visit
  }
}

export const cfg = { ...DEFAULT_CFG, ...load(LS_CFG, {}) };
if (!cfg.device) {
  cfg.device = 'dev-' + Math.random().toString(36).slice(2, 8);
  save(LS_CFG, cfg);
}

let events = load(LS_EVENTS, []);
const ids = new Set(events.map((e) => e.id));
const listeners = new Set();
export const syncState = { status: 'idle', message: '', last: null, pending: false };

export function setCfg(patch) {
  Object.assign(cfg, patch);
  save(LS_CFG, cfg);
  emit();
}

export function onChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit() {
  listeners.forEach((fn) => fn());
}

export function allEvents() {
  return events;
}

function uid() {
  return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
}

export function addEvent(type, data) {
  const e = { id: uid(), ts: Date.now(), dev: cfg.device, type, ...data };
  events.push(e);
  ids.add(e.id);
  save(LS_EVENTS, events);
  schedulePush();
  emit();
  return e;
}

function mergeIn(list) {
  let added = 0;
  for (const e of list) {
    if (e && e.id && !ids.has(e.id)) {
      events.push(e);
      ids.add(e.id);
      added++;
    }
  }
  if (added) {
    events.sort((a, b) => a.ts - b.ts);
    save(LS_EVENTS, events);
  }
  return added;
}

// ---------- GitHub sync ----------

function monthOf(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function headers() {
  return {
    Authorization: `Bearer ${cfg.token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

function b64encode(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

function b64decode(b64) {
  const bin = atob(b64.replace(/\n/g, ''));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function getFile(path) {
  const r = await fetch(`${API}/repos/${cfg.owner}/${cfg.repo}/contents/${path}`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (r.status === 404) return { sha: null, events: [] };
  if (!r.ok) throw new Error(`GitHub ${r.status} reading ${path}`);
  const j = await r.json();
  let content = j.content ? b64decode(j.content) : '';
  if (!content && j.download_url) {
    // files over 1 MB come without inline content
    const raw = await fetch(`${API}/repos/${cfg.owner}/${cfg.repo}/contents/${path}`, {
      headers: { ...headers(), Accept: 'application/vnd.github.raw+json' },
      cache: 'no-store',
    });
    content = await raw.text();
  }
  return { sha: j.sha, events: content ? JSON.parse(content).events || [] : [] };
}

async function putFile(path, list, sha) {
  const body = {
    message: `progress ${path} (${cfg.device})`,
    content: b64encode(JSON.stringify({ events: list })),
  };
  if (sha) body.sha = sha;
  const r = await fetch(`${API}/repos/${cfg.owner}/${cfg.repo}/contents/${path}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (r.status === 409 || r.status === 422) return false; // someone else wrote first
  if (!r.ok) throw new Error(`GitHub ${r.status} writing ${path}`);
  return true;
}

async function listMonths() {
  const r = await fetch(`${API}/repos/${cfg.owner}/${cfg.repo}/contents/events`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (r.status === 404) return [];
  if (!r.ok) throw new Error(`GitHub ${r.status} listing events`);
  const j = await r.json();
  return j.filter((f) => f.name.endsWith('.json')).map((f) => f.name.replace('.json', ''));
}

let pushTimer = null;
function schedulePush() {
  syncState.pending = true;
  if (!cfg.token) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(() => sync().catch(() => {}), 4000);
}

let running = null;
export function sync() {
  if (!cfg.token) {
    syncState.status = 'off';
    syncState.message = 'Is device pe GitHub token nahi hai. Progress sirf is browser me save ho raha hai.';
    emit();
    return Promise.resolve();
  }
  if (running) return running;
  running = doSync().finally(() => {
    running = null;
  });
  return running;
}

async function doSync() {
  syncState.status = 'syncing';
  emit();
  try {
    const remoteMonths = await listMonths();
    const localMonths = new Set(events.map((e) => monthOf(e.ts)));
    const months = new Set([...remoteMonths, ...localMonths]);
    for (const m of months) {
      const path = `events/${m}.json`;
      for (let attempt = 0; attempt < 4; attempt++) {
        const remote = await getFile(path);
        mergeIn(remote.events);
        const remoteIds = new Set(remote.events.map((e) => e.id));
        const mine = events.filter((e) => monthOf(e.ts) === m);
        if (mine.every((e) => remoteIds.has(e.id))) break;
        const merged = [...remote.events, ...mine.filter((e) => !remoteIds.has(e.id))];
        merged.sort((a, b) => a.ts - b.ts);
        if (await putFile(path, merged, remote.sha)) break;
      }
    }
    syncState.status = 'ok';
    syncState.pending = false;
    syncState.last = new Date();
    syncState.message = '';
  } catch (err) {
    syncState.status = 'error';
    syncState.message = String(err.message || err);
  }
  emit();
}

export async function testConnection() {
  const r = await fetch(`${API}/repos/${cfg.owner}/${cfg.repo}`, { headers: headers() });
  if (r.status === 401) throw new Error('Token galat ya expire ho gaya hai. Naya fine-grained token banao.');
  if (r.status === 404 || r.status === 403) throw new Error(`Token ko ${cfg.owner}/${cfg.repo} ka access nahi hai. Token me ye repo select karo, Contents: Read and write.`);
  if (!r.ok) throw new Error(`GitHub ne error diya (${r.status}). Thodi der baad try karo.`);
  const j = await r.json();
  return j.private ? 'Connected ✓ (private repo).' : 'Connected, lekin repo PUBLIC hai — ise private karo.';
}

export function exportJson() {
  return JSON.stringify({ events }, null, 1);
}

export function importJson(text) {
  const j = JSON.parse(text);
  const added = mergeIn(j.events || []);
  schedulePush();
  emit();
  return added;
}

window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && syncState.pending) sync();
});

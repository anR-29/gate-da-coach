// Content loading, derived progress state, spaced revision and the adaptive daily session.

import { addEvent, allEvents, cfg } from './store.js?v=202611061742';

export const INTERVALS = [1, 3, 7, 14, 30];
export const MASTERED_AFTER = 5; // passes in a row
export const REVIEW_CAP = 10;
export const REPAIRS_PER_SKILL = 2;
// Question files; a file's "area" field (not its name) decides the subject, so an area can span files.
const AREAS = ['ps', 'la', 'calc', 'py', 'dsa', 'dsa2', 'db', 'ml', 'ml2', 'ai', 'ga'];

export const content = { plan: null, skills: {}, questions: {}, bySkill: {}, theory: new Set() };

export async function loadContent() {
  const plan = await fetch('data/plan.json', { cache: 'no-cache' }).then((r) => r.json());
  content.plan = plan;
  for (const area of AREAS) {
    try {
      const r = await fetch(`data/questions/${area}.json`, { cache: 'no-cache' });
      if (!r.ok) continue;
      const j = await r.json();
      for (const [id, s] of Object.entries(j.skills || {})) {
        content.skills[id] = { id, area: j.area || area, ...s };
        if (s.theory) content.theory.add(s.theory);
      }
      for (const q of j.questions || []) {
        content.questions[q.id] = q;
        (content.bySkill[q.skill] ||= []).push(q);
      }
    } catch {
      // a missing or broken area file should not take the whole app down
    }
  }
}

// ---------- dates ----------

export function today() {
  return isoDate(new Date());
}

export function isoDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function addDays(iso, n) {
  const [y, m, d] = iso.split('-').map(Number);
  return isoDate(new Date(y, m - 1, d + n));
}

export function daysBetween(a, b) {
  const [y1, m1, d1] = a.split('-').map(Number);
  const [y2, m2, d2] = b.split('-').map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
}

// ---------- derived state ----------

export function derive() {
  const events = allEvents();
  const cards = {};
  const dayLogs = {};
  const logList = [];
  const seen = {};
  const attempts = [];
  const mocks = [];
  for (const e of events) {
    if (e.type === 'attempt') {
      attempts.push(e);
      const s = (seen[e.qid] ||= { n: 0, last: 0 });
      s.n++;
      s.last = e.ts;
    } else if (e.type === 'card') {
      applyCard(cards, e);
    } else if (e.type === 'daylog') {
      // the first completion decides plan progress; re-attempts are kept in logList only
      // a day counts as done at its first non-partial log (partial = topic part left for later)
      if (!dayLogs[e.day] && !e.partial) dayLogs[e.day] = e;
      logList.push(e);
    } else if (e.type === 'mock') {
      mocks.push(e);
    }
  }
  return { cards, dayLogs, logList, seen, attempts, mocks };
}

// Status of one plan day for lists: done, fallback, re-attempt count, attempts.
export function dayStatus(state, dayNum) {
  const logs = state.logList.filter((l) => l.day === dayNum);
  const first = state.dayLogs[dayNum];
  return {
    done: !!first || dayNum < 18,
    partial: !first && dayNum >= 18 && logs.some((l) => l.partial),
    fallback: logs.some((l) => l.mode === 'fallback' || l.fallback),
    reattempts: logs.filter((l) => l.mode === 'reattempt').length,
    history: first ? String(first.mode || '').startsWith('history') : dayNum < 18,
    logs,
    attempts: state.attempts.filter((a) => a.day === dayNum),
  };
}

function applyCard(cards, e) {
  let c = cards[e.skill];
  if (e.action === 'open') {
    if (!c || c.mastered) {
      c = cards[e.skill] = {
        skill: e.skill, passes: 0, failures: 0, reviews: 0, opened: e.date,
        due: addDays(e.date, 1), last: null, notes: [], lowconf: !!e.lowconf, mastered: false,
      };
    } else {
      c.passes = 0;
      c.due = addDays(e.date, 1);
    }
    if (e.note) c.notes.push(e.note);
    c.lowconf = c.lowconf && !!e.lowconf;
  } else if (c && e.action === 'good') {
    c.passes++;
    c.reviews++;
    c.last = e.date;
    if (c.passes >= MASTERED_AFTER) c.mastered = true;
    c.due = addDays(e.date, INTERVALS[Math.min(c.passes, INTERVALS.length - 1)]);
  } else if (c && e.action === 'again') {
    c.passes = 0;
    c.failures++;
    c.reviews++;
    c.last = e.date;
    c.due = addDays(e.date, 1);
  }
}

export function dueCards(state, date = today()) {
  return Object.values(state.cards)
    .filter((c) => !c.mastered && c.due <= date && c.last !== date && content.bySkill[c.skill]?.length)
    .sort((a, b) => b.failures - a.failures || Number(b.lowconf) - Number(a.lowconf) || a.due.localeCompare(b.due));
}

export function skillStats(state) {
  const stats = {};
  for (const a of state.attempts) {
    if (a.mode === 'repair' || a.repeated || a.skipped) continue;
    const s = (stats[a.skill] ||= { n: 0, ok: 0 });
    s.n++;
    if (a.correct && a.conf !== 'Guess') s.ok++;
  }
  return stats;
}

export function weakSkills(state) {
  const st = skillStats(state);
  const impact = (id) => (1 - st[id].ok / st[id].n) * subjectWeightPerSkill(id);
  return Object.entries(st)
    .filter(([id, s]) => s.n >= 3 && s.ok / s.n < 0.6 && content.skills[id])
    .map(([id]) => id)
    .sort((a, b) => impact(b) - impact(a));
}

// ---------- target 72 ----------

export const TARGET = 72;
// Average marks per paper in GATE DA 2024–2026 (sums to 100).
export const SUBJECTS = {
  'Probability & Statistics': { areas: ['ps'], marks: 18.3 },
  'Programming, DS & Algorithms': { areas: ['py', 'dsa'], marks: 16 },
  'General Aptitude': { areas: ['ga'], marks: 15 },
  'Machine Learning': { areas: ['ml'], marks: 13.7 },
  'Databases & Warehousing': { areas: ['db'], marks: 12 },
  'Linear Algebra': { areas: ['la'], marks: 10 },
  'Artificial Intelligence': { areas: ['ai'], marks: 8 },
  'Calculus & Optimization': { areas: ['calc'], marks: 7 },
};
const NEG = 0.5 / 3; // about half the marks are MCQ, and a wrong MCQ costs a third
const MIN_N = 10;

function subjectOfArea(area) {
  return Object.keys(SUBJECTS).find((s) => SUBJECTS[s].areas.includes(area));
}

function subjectWeightPerSkill(skillId) {
  const sk = content.skills[skillId];
  const subj = sk && subjectOfArea(sk.area);
  if (!subj) return 0;
  const n = Object.values(content.skills).filter((s) => SUBJECTS[subj].areas.includes(s.area)).length || 1;
  return SUBJECTS[subj].marks / n;
}

// Expected exam marks per subject from recent first-pass accuracy (last 60 unseen attempts).
export function target72(state) {
  const rows = [];
  const all = state.attempts.filter((a) => a.mode !== 'repair' && !a.repeated && !a.skipped && content.skills[a.skill]);
  for (const [name, s] of Object.entries(SUBJECTS)) {
    const mine = all.filter((a) => s.areas.includes(content.skills[a.skill].area)).slice(-60);
    const n = mine.length;
    const ok = mine.filter((a) => a.correct).length;
    const acc = n ? ok / n : null;
    const known = n >= 3; // 3–9 attempts give a provisional, low-data value
    const lowData = n < MIN_N;
    const expected = known ? Math.max(0, s.marks * (acc - (1 - acc) * NEG)) : null;
    rows.push({ name, marks: s.marks, n, acc, known, lowData, expected });
  }
  const knownRows = rows.filter((r) => r.known);
  const accAll = knownRows.length ? knownRows.reduce((t, r) => t + r.acc * r.n, 0) / knownRows.reduce((t, r) => t + r.n, 0) : null;
  for (const r of rows) {
    r.assumed = !r.known && accAll !== null;
    if (r.assumed) r.expected = Math.max(0, r.marks * (accAll - (1 - accAll) * NEG));
    // marks recoverable by lifting this subject to 85% accuracy
    // no gain figure without any data of the subject's own
    r.gain = r.n ? Math.max(0, r.marks * (0.85 - (0.15) * NEG) - (r.expected ?? 0)) : null;
  }
  const total = accAll === null ? null : rows.reduce((t, r) => t + (r.expected || 0), 0);
  const nTotal = rows.reduce((t, r) => t + r.n, 0);
  return {
    rows: rows.sort((a, b) => (b.gain ?? -1) - (a.gain ?? -1)),
    total,
    knownMarks: knownRows.reduce((t, r) => t + r.marks, 0),
    accAll,
    lowData: nTotal < 60 || rows.some((r) => r.known && r.lowData),
    band: nTotal ? Math.min(15, Math.round(40 / Math.sqrt(nTotal))) : null,
  };
}

// Skills whose repair would add the most expected marks.
export function focusSkills(state, k = 3) {
  const st = skillStats(state);
  const scored = Object.entries(st)
    .filter(([id, s]) => content.skills[id] && s.n >= 3 && s.ok / s.n < 0.75)
    .map(([id, s]) => ({ id, acc: s.ok / s.n, n: s.n, impact: (1 - s.ok / s.n) * subjectWeightPerSkill(id) }));
  for (const c of Object.values(state.cards)) {
    if (!c.mastered && content.skills[c.skill] && !st[c.skill]) {
      scored.push({ id: c.skill, acc: null, n: 0, impact: subjectWeightPerSkill(c.skill) * (0.5 + 0.1 * c.failures) });
    }
  }
  return scored.sort((a, b) => b.impact - a.impact).slice(0, k);
}

// ---------- plan position ----------

export function planStatus(state, date = today()) {
  const days = content.plan.days;
  const current = days.find((d) => d.day >= 18 && !state.dayLogs[d.day]) || days[days.length - 1];
  const remaining = days.filter((d) => d.seq >= current.seq).length;
  const behind = current.date ? Math.max(0, daysBetween(current.date, date)) : 0;
  const projectedEnd = addDays(date, remaining - 1);
  const exam = cfg.examDate || content.plan.meta.examEarliest;
  return {
    current,
    remaining,
    behind,
    projectedEnd,
    exam,
    daysToExam: daysBetween(date, exam),
    bufferDays: daysBetween(projectedEnd, exam) - 1,
    doneCount: days.filter((d) => d.day < 18 || state.dayLogs[d.day]).length,
    total: days.length,
  };
}

// ---------- session ----------

const LS_SESSION = 'gdc.session';

export function skillsForDays(dayNums) {
  const want = new Set(dayNums);
  return Object.values(content.skills)
    .filter((s) => (s.days || []).some((d) => want.has(d)) && content.bySkill[s.id]?.length)
    .map((s) => s.id);
}

export const PARTS = {
  review: 'Revision cards',
  topic: 'Brush-up + today’s topic',
  mixed: 'Mixed older topics',
  ga: 'General Aptitude',
};
const DEFAULT_ORDER = ['review', 'topic', 'mixed', 'ga'];
const LS_ORDER = 'gdc.order';

export function getOrder() {
  try {
    const o = JSON.parse(localStorage.getItem(LS_ORDER) || 'null');
    if (Array.isArray(o) && o.length === DEFAULT_ORDER.length && DEFAULT_ORDER.every((p) => o.includes(p))) return o;
  } catch {}
  return [...DEFAULT_ORDER];
}

export function setOrder(order) {
  try { localStorage.setItem(LS_ORDER, JSON.stringify(order)); } catch {}
}

export function newSession(day, opts = {}) {
  const fallback = !!opts.fallback;
  const revisionOnly = !!opts.revisionOnly;
  const base = day.questionTarget || 28;
  const ga = revisionOnly || fallback ? 0 : base >= 38 ? 10 : 8;
  const core = Math.max(0, base - ga);
  const session = {
    day: day.day,
    date: today(),
    started: Date.now(),
    activeMs: 0,
    capMin: revisionOnly ? 45 : fallback ? 50 : Math.round(day.plannedHours * 60),
    reviewCap: fallback ? 5 : REVIEW_CAP,
    base: { topic: revisionOnly ? 0 : fallback ? 6 : Math.round(core * 0.7), mixed: revisionOnly || fallback ? 0 : core - Math.round(core * 0.7), ga },
    gaSkill: day.ga,
    topicSkills: skillsForDays([day.day, ...((day.mergedDays) || [])]),
    spacedSkills: skillsForDays(day.spacedDays || []),
    repairQueue: [],
    served: [],
    mode: revisionOnly ? 'revision' : fallback ? 'fallback' : 'normal',
    reattempt: !!opts.reattempt,
    order: opts.order || getOrder(),
    sid: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    ended: false,
  };
  // continuing an unfinished day: the time already spent counts against today's cap
  if (opts.carryMs) session.activeMs = Math.min(opts.carryMs, session.capMin * 60000);
  saveSession(session);
  return session;
}

// Work already done on an unfinished day (all sessions and devices), for "continue" and the time cap.
export function dayCarry(state, dayNum) {
  const reSids = new Set(state.logList.filter((l) => l.mode === 'reattempt').map((l) => l.sid));
  const prev = state.attempts.filter((a) => a.day === dayNum && !a.re && !reSids.has(a.sid));
  return {
    n: prev.length,
    ms: prev.reduce((s, a) => s + Math.min(a.ms || 0, 10 * 60000), 0),
  };
}

const STALE_MS = 3 * 86400000;

export function loadSession() {
  try {
    const s = JSON.parse(localStorage.getItem(LS_SESSION) || 'null');
    if (!s || s.ended) return null;
    // a session left open past midnight continues; new attempts get today's date
    if (s.date !== today()) {
      if (Date.now() - s.started > STALE_MS) return null;
      s.date = today();
      saveSession(s);
    }
    return s;
  } catch {
    return null;
  }
}

export function saveSession(s) {
  try {
    localStorage.setItem(LS_SESSION, JSON.stringify(s));
  } catch {
    // ignore
  }
}

export function sessionAttempts(session, state) {
  // sessions before ids existed are matched by date and day
  if (!session.sid) return state.attempts.filter((a) => a.date === session.date && a.day === session.day);
  // re-attempts and revision-only runs stand alone
  if (session.reattempt || session.mode === 'revision') return state.attempts.filter((a) => a.sid === session.sid);
  // a normal run counts every non-re-attempt attempt of its day, from any session or device,
  // so a refresh, a new date or another device continues the day instead of restarting it
  const reSids = new Set(state.logList.filter((l) => l.mode === 'reattempt').map((l) => l.sid));
  return state.attempts.filter((a) => a.sid === session.sid
    || (a.day === session.day && !a.re && !reSids.has(a.sid)));
}

export function sessionCounts(session, state) {
  const mine = sessionAttempts(session, state);
  const count = (m) => mine.filter((a) => a.mode === m).length;
  const firstPass = mine.filter((a) => ['diag', 'topic', 'mixed'].includes(a.mode) && !a.repeated);
  const fpOk = firstPass.filter((a) => a.correct && a.conf !== 'Guess').length;
  const reviewedToday = new Set(state.attempts.filter((a) => a.date === session.date && a.mode === 'review').map((a) => a.skill));
  return {
    attempts: mine.length,
    correct: mine.filter((a) => a.correct).length,
    review: count('review'),
    diag: count('diag'),
    topic: count('topic') + count('diag'),
    mixed: count('mixed'),
    ga: count('ga'),
    repair: count('repair'),
    firstPass: firstPass.length,
    firstPassOk: fpOk,
    reviewedToday,
    repairsBySkill: mine.filter((a) => a.mode === 'repair').reduce((m, a) => ((m[a.skill] = (m[a.skill] || 0) + 1), m), {}),
  };
}

// Targets move with first-pass accuracy instead of staying fixed at the plan's number.
export function targets(session, counts) {
  const t = { ...session.base, note: '' };
  if (session.mode !== 'normal' || counts.firstPass < 6) return t;
  const acc = counts.firstPassOk / counts.firstPass;
  if (acc < 0.6) {
    t.topic = Math.max(counts.topic + 2, Math.round(t.topic * 0.75));
    t.mixed = Math.round(t.mixed * 0.5);
    t.note = `First-pass accuracy ${Math.round(acc * 100)}%: fewer new questions, more repair.`;
  } else if (acc >= 0.8) {
    t.mixed = t.mixed + 4;
    t.note = `First-pass accuracy ${Math.round(acc * 100)}%: extra mixed questions from older topics.`;
  }
  return t;
}

export function timeUp(session) {
  return session.activeMs >= session.capMin * 60000;
}

function pickQuestion(skill, session, state, level) {
  const pool = content.bySkill[skill] || [];
  const served = new Set(session.served);
  const unseen = pool.filter((q) => !state.seen[q.id] && !served.has(q.id));
  let cands = unseen;
  if (level) {
    const atLevel = unseen.filter((q) => (q.level || 1) === level);
    if (atLevel.length) cands = atLevel;
  }
  if (cands.length) return { q: cands[Math.floor(Math.random() * cands.length)], repeated: false };
  const old = pool.filter((q) => !served.has(q.id)).sort((a, b) => (state.seen[a.id]?.last || 0) - (state.seen[b.id]?.last || 0));
  return old.length ? { q: old[0], repeated: true } : null;
}

function rotate(list, n) {
  return list.length ? list[n % list.length] : null;
}

export function nextItem(session, state) {
  if (session.ended || session.stopped) return null;
  const counts = sessionCounts(session, state);
  const t = targets(session, counts);

  while (session.repairQueue.length) {
    const r = session.repairQueue[0];
    const picked = pickQuestion(r.skill, session, state);
    if (picked) return { ...picked, skill: r.skill, mode: 'repair', label: 'Fresh variant · repair' };
    session.repairQueue.shift();
  }
  if (timeUp(session)) return null;

  // a re-attempted day may reuse questions already seen (they are flagged as repeats)
  const ok = (picked) => picked && (!picked.repeated || session.reattempt);
  const topic = session.topicSkills;
  const parts = {
    review() {
      const due = dueCards(state).filter((c) => !counts.reviewedToday.has(c.skill));
      if (!due.length || counts.review >= session.reviewCap) return null;
      const c = due[0];
      const picked = pickQuestion(c.skill, session, state);
      return picked ? { ...picked, skill: c.skill, mode: 'review', label: 'Delayed revision · fresh variant' } : null;
    },
    topic() {
      if (counts.topic >= t.topic || !topic.length) return null;
      const mode = counts.diag < 3 && session.mode === 'normal' ? 'diag' : 'topic';
      for (let i = 0; i < topic.length; i++) {
        const skill = rotate(topic, counts.topic + i);
        const level = mode === 'diag' ? 1 : counts.topic < t.topic / 2 ? 1 : 2;
        const picked = pickQuestion(skill, session, state, level);
        if (ok(picked)) return { ...picked, skill, mode, label: mode === 'diag' ? 'Closed-book brush-up' : 'Today’s topic' };
      }
      return null;
    },
    mixed() {
      const pool = [...new Set([...weakSkills(state), ...session.spacedSkills])].filter((s) => !topic.includes(s));
      if (counts.mixed >= t.mixed || !pool.length) return null;
      for (let i = 0; i < pool.length; i++) {
        const skill = rotate(pool, counts.mixed + i);
        const picked = pickQuestion(skill, session, state, 2);
        if (ok(picked)) return { ...picked, skill, mode: 'mixed', label: 'Mixed · older topic' };
      }
      return null;
    },
    ga() {
      if (counts.ga >= t.ga) return null;
      const gaSkills = Object.keys(content.skills).filter((s) => s.startsWith('ga.'));
      const skill = counts.ga % 3 === 2 ? rotate(gaSkills, counts.ga) : session.gaSkill;
      const picked = pickQuestion(skill, session, state) || pickQuestion(session.gaSkill, session, state);
      return picked ? { ...picked, skill: picked.q.skill, mode: 'ga', label: 'General Aptitude' } : null;
    },
  };
  const order = session.mode === 'revision' ? ['review'] : session.order || DEFAULT_ORDER;
  for (const part of order) {
    const item = parts[part]?.();
    if (item) return item;
  }
  return null;
}

// ---------- grading ----------

// How a NAT answer should be entered, worked out from the key's tolerance.
export function natHint(q) {
  const { value, tol = 0 } = q.answer;
  if (Number.isInteger(value) && tol < 0.5) return 'Integer answer';
  if (!tol) return 'Exact value (decimal me)';
  const places = Math.max(0, Math.ceil(-Math.log10(tol * 2)));
  return places ? `${places} decimal tak (jaise ${(0.123456).toFixed(places)})` : 'Integer tak round karo';
}

export function parseNat(raw) {
  const s = String(raw).trim();
  if (s.includes(',')) return null;
  if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s)) return null;
  return Number(s);
}

export function grade(q, response) {
  if (q.type === 'NAT') {
    const v = parseNat(response);
    if (v === null) return { valid: false };
    const tol = (q.answer?.tol || 0) + 1e-9 * Math.max(1, Math.abs(q.answer.value));
    const correct = Math.abs(v - q.answer.value) <= tol;
    const trap = correct ? null : (q.traps || []).find((t) => Math.abs(v - t.value) <= Math.max(tol, 1e-6 * Math.max(1, Math.abs(t.value))));
    return { valid: true, correct, value: v, trap };
  }
  const chosen = new Set(response);
  if (!chosen.size) return { valid: false };
  const right = new Set(q.options.map((o, i) => (o.correct ? i : -1)).filter((i) => i >= 0));
  const correct = chosen.size === right.size && [...chosen].every((i) => right.has(i));
  return { valid: true, correct, chosen: [...chosen], right: [...right] };
}

export const TRAP_CLASSES = {
  C1: 'Converse / missing condition / over-claim',
  C2: 'Swapped paired concepts',
  C3: 'Wrong neighbouring formula',
  C4: 'Square / scale',
  C5: 'Boundary / strictness / endpoints',
  C6: 'Counting / off-by-one / partial step',
  C7: 'Independence / prior / conditional inversion',
  C8: 'Structural impossibility / "always"',
  C9: 'Property misapplied',
  C10: 'Surface look-alike',
  C11: 'Sign / direction',
};

// Trap classes behind a wrong response: chosen wrong options, or the matched NAT trap.
export function trapsOf(q, g) {
  if (g.correct) return [];
  if (q.type === 'NAT') return g.trap?.trap ? [g.trap.trap] : [];
  return g.chosen.map((i) => q.options[i]).filter((o) => !o.correct && o.trap).map((o) => o.trap);
}

// Records the attempt, updates revision cards and queues repair variants.
export function submit(session, item, response, conf, ms) {
  const q = item.q;
  const g = grade(q, response);
  if (!g.valid) return { ...g };
  const skill = content.skills[q.skill];
  const date = session.date;
  const traps = trapsOf(q, g);
  addEvent('attempt', {
    qid: q.id, skill: q.skill, subject: skill?.subject || '', day: session.day, date,
    mode: item.mode, resp: response, correct: g.correct, conf, repeated: item.repeated, ms, sid: session.sid,
    ...(session.reattempt ? { re: true } : {}),
    ...(traps.length ? { traps } : {}),
  });

  const state = derive();
  const counts = sessionCounts(session, state);
  const repairsDone = counts.repairsBySkill[q.skill] || 0;
  const out = { ...g, traps, repairQueued: false, showTheory: false, stopSkill: false, cardOpened: false };
  const guessed = conf === 'Guess';

  if (item.mode === 'review') {
    addEvent('card', { skill: q.skill, action: g.correct && !guessed ? 'good' : 'again', date });
  } else if (!g.correct && item.mode !== 'repair') {
    addEvent('card', { skill: q.skill, action: 'open', date, note: q.id });
    out.cardOpened = true;
  } else if (g.correct && guessed && item.mode !== 'repair') {
    addEvent('card', { skill: q.skill, action: 'open', date, lowconf: true, note: q.id });
    out.cardOpened = true;
  }

  if (item.mode === 'repair') session.repairQueue.shift();
  if (!g.correct) {
    if (repairsDone < REPAIRS_PER_SKILL) {
      session.repairQueue.unshift({ skill: q.skill });
      out.repairQueued = true;
      out.showTheory = repairsDone >= 1;
    } else {
      out.stopSkill = true;
      out.showTheory = true;
    }
  }
  session.served.push(q.id);
  saveSession(session);
  return out;
}

// True when the day's topic part is clearly unfinished (less than half of its target).
export function topicShort(session, state) {
  if (session.mode === 'revision' || !session.topicSkills.length) return false;
  const c = sessionCounts(session, state);
  return c.topic < Math.ceil(session.base.topic / 2);
}

export function endSession(session, { hours, anxiety, notes, partial = false }) {
  const state = derive();
  const c = sessionCounts(session, state);
  addEvent('daylog', {
    day: session.day, date: session.date, hours, anxiety, notes, mode: session.reattempt ? 'reattempt' : session.mode,
    fallback: session.mode === 'fallback', sid: session.sid, order: session.order,
    partial: !!partial && !session.reattempt, stopped: !!session.stopped, topicDone: c.topic, topicTarget: session.base.topic,
    attempts: c.attempts, correct: c.correct, firstPass: c.firstPass, firstPassOk: c.firstPassOk,
  });
  session.ended = true;
  saveSession(session);
}

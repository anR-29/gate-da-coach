// Full mock paper in the GATE DA pattern: 65 questions, 100 marks, 180 minutes.
// GA 10 (5 x 1 + 5 x 2 marks) and technical 55 (25 x 1 + 30 x 2 marks), built from unseen bank
// questions of the subjects studied before the mock day. MCQ wrong = -1/3 of its marks; MSQ/NAT no negative.

import { content, derive, grade, trapsOf, parseNat, today, SUBJECTS, TARGET } from './engine.js?v=202611091158';
import { addEvent, allEvents, sync } from './store.js?v=202611091158';
import { md, typeset, esc, fmtDate } from './render.js?v=202611091158';

const LS_MOCK = 'gdc.mock';
export const MOCK_MIN = 180;
const main = document.getElementById('main');

function set(html) {
  main.innerHTML = html;
  typeset(main);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const round2 = (x) => Math.round(x * 100) / 100;
const fmtMarks = (x) => (Number.isInteger(round2(x)) ? String(round2(x)) : round2(x).toFixed(2));
const bigFrac = (t) => String(t).replace(/\\frac/g, '\\dfrac');

function subjectOfQ(q) {
  const area = content.skills[q.skill]?.area;
  return Object.keys(SUBJECTS).find((s) => SUBJECTS[s].areas.includes(area)) || 'Other';
}

// ---------- paper ----------

// Technical subjects already studied before this day, with their GATE weight.
export function mockSubjects(dayNum) {
  const areas = new Set(Object.values(content.skills)
    .filter((s) => s.area !== 'ga' && (s.days || []).some((d) => d < dayNum)).map((s) => s.area));
  return Object.entries(SUBJECTS)
    .filter(([n, s]) => n !== 'General Aptitude' && s.areas.some((a) => areas.has(a)))
    .map(([name, s]) => ({ name, weight: s.marks, areas: s.areas }));
}

// Approximate technical marks per subject in this day's paper (for the intro screen).
export function mockShare(dayNum) {
  const subs = mockSubjects(dayNum);
  const n1 = split(25, subs);
  const n2 = split(30, subs);
  return subs.map((s, i) => ({ name: s.name, marks: n1[i] + 2 * n2[i] }));
}

// Largest-remainder split of `total` questions by subject weight.
function split(total, subs) {
  const sum = subs.reduce((t, s) => t + s.weight, 0) || 1;
  const raw = subs.map((s) => (total * s.weight) / sum);
  const n = raw.map(Math.floor);
  const left = total - n.reduce((a, b) => a + b, 0);
  raw.map((r, i) => [r - n[i], i]).sort((a, b) => b[0] - a[0]).slice(0, left).forEach(([, i]) => n[i]++);
  return n;
}

function poolFor(areas, marks, dayNum, used) {
  return Object.values(content.questions).filter((q) => {
    const sk = content.skills[q.skill];
    if (!sk || !areas.includes(sk.area) || (q.marks || 1) !== marks || used.has(q.id)) return false;
    return sk.area === 'ga' || (sk.days || []).some((d) => d < dayNum);
  });
}

// n questions: unseen first, spread over as many skills as possible; then the least recently seen.
function pick(pool, n, state, used) {
  const out = [];
  const bySkill = new Map();
  for (const q of shuffle(pool.filter((x) => !state.seen[x.id]))) {
    if (!bySkill.has(q.skill)) bySkill.set(q.skill, []);
    bySkill.get(q.skill).push(q);
  }
  const queues = shuffle([...bySkill.values()]);
  while (out.length < n && queues.some((x) => x.length)) {
    for (const qs of queues) {
      if (out.length >= n) break;
      const q = qs.shift();
      if (q && !used.has(q.id)) {
        used.add(q.id);
        out.push({ qid: q.id, repeated: false });
      }
    }
  }
  if (out.length < n) {
    const seen = pool.filter((q) => state.seen[q.id] && !used.has(q.id))
      .sort((a, b) => state.seen[a.id].last - state.seen[b.id].last);
    for (const q of seen) {
      if (out.length >= n) break;
      used.add(q.id);
      out.push({ qid: q.id, repeated: true });
    }
  }
  return out;
}

export function buildPaper(dayNum, state) {
  const used = new Set();
  const items = [];
  for (const marks of [1, 2]) {
    pick(poolFor(['ga'], marks, dayNum, used), 5, state, used)
      .forEach((x) => items.push({ ...x, sec: 'GA', marks }));
  }
  const subs = mockSubjects(dayNum);
  const tech = [];
  for (const [marks, total] of [[1, 25], [2, 30]]) {
    const counts = split(total, subs);
    const part = [];
    subs.forEach((s, i) => part.push(...pick(poolFor(s.areas, marks, dayNum, used), counts[i], state, used)));
    // a subject that ran out is topped up from the other studied subjects
    if (part.length < total) part.push(...pick(poolFor(subs.flatMap((s) => s.areas), marks, dayNum, used), total - part.length, state, used));
    tech.push(...shuffle(part).map((x) => ({ ...x, sec: 'T', marks })));
  }
  return [...items, ...tech];
}

// ---------- state ----------

// The running mock: this device's copy, or a paused one synced from another device.
// A pause writes a snapshot event; submit ("mock") or quit ("mockend") closes it everywhere.
export function loadMock() {
  let local = null;
  try {
    local = JSON.parse(localStorage.getItem(LS_MOCK) || 'null');
    if (!local || !local.items || !local.items.length) local = null;
  } catch {}
  const events = allEvents();
  const closed = new Set(events.filter((e) => (e.type === 'mock' || e.type === 'mockend') && e.sid).map((e) => e.sid));
  if (local && closed.has(local.sid)) {
    clearMock();
    local = null;
  }
  let remote = null;
  for (const e of events) {
    if (e.type === 'mockstate' && e.snap && !closed.has(e.sid) && (!remote || e.ts > remote.ts)) remote = e;
  }
  if (remote && (!local || (local.sid === remote.sid && (remote.snap.updated || 0) > (local.updated || 0)))) {
    local = { ...remote.snap, paused: true, pauseAt: remote.snap.pauseAt || Date.now() };
    try { localStorage.setItem(LS_MOCK, JSON.stringify(local)); } catch {}
  }
  return local;
}

function saveMock(m) {
  m.updated = Date.now();
  try { localStorage.setItem(LS_MOCK, JSON.stringify(m)); } catch {}
}

function clearMock() {
  try { localStorage.removeItem(LS_MOCK); } catch {}
}

export function startMock(day) {
  const m = {
    sid: 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    day: day.day, date: today(), started: Date.now(), limitMs: MOCK_MIN * 60000, elapsed: 0,
    cur: 0, items: buildPaper(day.day, derive()), ans: {}, marked: [], visited: [0], timeOn: {},
  };
  saveMock(m);
  return m;
}

// ---------- scoring ----------

function isBlank(resp) {
  return resp == null || (Array.isArray(resp) ? !resp.length : !String(resp).trim());
}

function scoreItem(q, resp) {
  if (isBlank(resp)) return { status: 'skip', marks: 0, g: null };
  const g = grade(q, resp);
  if (!g.valid) return { status: 'wrong', marks: 0, g: { valid: false, correct: false } };
  if (g.correct) return { status: 'right', marks: q.marks, g };
  return { status: 'wrong', marks: q.type === 'MCQ' ? -q.marks / 3 : 0, g };
}

function summarize(rows) {
  const s = { net: 0, max: 0, attempted: 0, correct: 0, wrong: 0, skipped: 0, negative: 0, bySubject: {}, byType: {} };
  for (const r of rows) {
    const subj = r.sec === 'GA' ? 'General Aptitude' : r.subject;
    const b = (s.bySubject[subj] ||= { max: 0, net: 0, right: 0, wrong: 0, skip: 0, neg: 0 });
    const t = (s.byType[r.q.type] ||= { n: 0, right: 0, wrong: 0, skip: 0, net: 0 });
    s.max += r.q.marks;
    b.max += r.q.marks;
    s.net += r.marks;
    b.net += r.marks;
    t.n++;
    t.net += r.marks;
    if (r.status === 'skip') { s.skipped++; b.skip++; t.skip++; continue; }
    s.attempted++;
    if (r.status === 'right') { s.correct++; b.right++; t.right++; } else { s.wrong++; b.wrong++; t.wrong++; }
    if (r.marks < 0) { s.negative -= r.marks; b.neg -= r.marks; }
  }
  return s;
}

function submitMock(m, auto) {
  const date = today();
  const rows = m.items.map((it, i) => {
    const q = content.questions[it.qid];
    return { it, q, i, resp: m.ans[i], ...scoreItem(q, m.ans[i]), sec: it.sec, subject: subjectOfQ(q), ms: Math.round(m.timeOn[i] || 0) };
  }).filter((r) => r.q);
  const opened = new Set();
  for (const r of rows) {
    const { q } = r;
    const traps = r.status === 'wrong' && r.g && r.g.valid !== false ? trapsOf(q, r.g) : [];
    addEvent('attempt', {
      qid: q.id, skill: q.skill, subject: content.skills[q.skill]?.subject || '', day: m.day, date,
      mode: 'mock', resp: r.status === 'skip' ? null : r.resp, correct: r.status === 'right', conf: null,
      repeated: !!r.it.repeated, ms: r.ms, sid: m.sid, marks: round2(r.marks),
      ...(r.status === 'skip' ? { skipped: true } : {}), ...(traps.length ? { traps } : {}),
    });
    // a wrong answer, or a question looked at and left, becomes a revision card (one per skill)
    const looked = (m.visited || []).includes(r.i);
    if ((r.status === 'wrong' || (r.status === 'skip' && looked)) && !opened.has(q.skill)) {
      opened.add(q.skill);
      addEvent('card', { skill: q.skill, action: 'open', date, note: q.id });
    }
  }
  const s = summarize(rows);
  addEvent('mock', {
    day: m.day, date, sid: m.sid, source: 'App mock (bank ke unseen sawaal)', fresh: rows.filter((r) => r.it.repeated).length <= 6,
    net: round2(s.net), max: s.max, attempted: s.attempted, correct: s.correct, negative: round2(s.negative),
    durationMs: Math.round(m.elapsed), auto: !!auto, qids: rows.map((r) => r.q.id),
    pauses: m.pauses || 0, pausedMs: Math.round(m.pausedMs || 0),
  });
  addEvent('daylog', {
    day: m.day, date, hours: round2(m.elapsed / 3600000), anxiety: null, notes: '', mode: 'mock', sid: m.sid,
    attempts: s.attempted, correct: s.correct,
  });
  clearMock();
  sync();
  return m.sid;
}

// ---------- exam screen ----------

let exam = null;
let tick = null;

function stopExam() {
  if (tick) clearInterval(tick);
  tick = null;
  document.removeEventListener('keydown', onKey);
  document.body.classList.remove('exam');
}

const fmtClock = (ms) => {
  const t = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(t / 3600)}:${String(Math.floor((t % 3600) / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
};

const answered = (i) => !isBlank(exam.ans[i]);

function status(i) {
  const mk = exam.marked.includes(i);
  if (mk && answered(i)) return 'am';
  if (mk) return 'mk';
  if (answered(i)) return 'an';
  return exam.visited.includes(i) ? 'na' : 'nv';
}

function counts() {
  const c = { an: 0, na: 0, nv: 0, mk: 0, am: 0 };
  exam.items.forEach((_, i) => c[status(i)]++);
  return c;
}

// Shows (or resumes) the running mock. The timer runs while this screen is open.
export function showExam(m) {
  stopExam();
  exam = m;
  document.body.classList.add('exam');
  document.addEventListener('keydown', onKey);
  let last = Date.now();
  tick = setInterval(() => {
    if (!exam || !document.getElementById('mockexam')) return stopExam();
    const now = Date.now();
    const d = Math.min(now - last, 120000); // a sleeping laptop does not eat the clock
    last = now;
    if (exam.paused) return; // paused: the clock and per-question time stand still
    exam.elapsed += d;
    exam.timeOn[exam.cur] = (exam.timeOn[exam.cur] || 0) + d;
    saveMock(exam);
    renderClock();
    if (exam.elapsed >= exam.limitMs) finish(true);
  }, 1000);
  renderExam();
}

function renderClock() {
  const el = document.getElementById('mxclock');
  if (!el) return;
  const left = exam.limitMs - exam.elapsed;
  el.textContent = `⏱ ${fmtClock(left)}`;
  el.classList.toggle('low', left < 10 * 60000);
}

function palette() {
  const c = counts();
  const ga = exam.items.filter((x) => x.sec === 'GA').length;
  const grp = (from, to, title) => `<div class="mxgrp"><div class="muted small">${title}</div><div class="mxnums">${exam.items.slice(from, to).map((_, k) => {
    const i = from + k;
    return `<button type="button" class="pn ${status(i)}${i === exam.cur ? ' cur' : ''}" data-go="${i}" aria-label="Question ${i + 1}">${i + 1}</button>`;
  }).join('')}</div></div>`;
  return `<div class="mxlegend">
      <span><i class="pn an"></i>${c.an} answered</span><span><i class="pn na"></i>${c.na} not answered</span>
      <span><i class="pn nv"></i>${c.nv} not visited</span><span><i class="pn mk"></i>${c.mk} marked</span>
      <span><i class="pn am"></i>${c.am} answered + marked</span></div>
    ${grp(0, ga, `General Aptitude (Q1–${ga})`)}${grp(ga, exam.items.length, `Technical (Q${ga + 1}–${exam.items.length})`)}
    <p class="small"><button type="button" class="link" id="mxquit">Mock chhodo (kuch save nahi hoga)</button></p>`;
}

// Pause: the timer stops and the question is hidden. The snapshot is synced, so the
// paper can be continued from the same point on another device.
function pause() {
  if (!exam || exam.paused || !natOk()) return;
  exam.paused = true;
  exam.pauseAt = Date.now();
  exam.pauses = (exam.pauses || 0) + 1;
  saveMock(exam);
  const { paused, ...snap } = exam;
  addEvent('mockstate', { sid: exam.sid, day: exam.day, snap: { ...snap, paused: true } });
  sync();
  renderExam();
}

function resume() {
  if (!exam || !exam.paused) return;
  exam.pausedMs = (exam.pausedMs || 0) + Math.max(0, Date.now() - (exam.pauseAt || Date.now()));
  exam.paused = false;
  exam.pauseAt = null;
  saveMock(exam);
  renderExam();
}

function quitMock() {
  if (!confirm('Mock chhod dein? Is paper ke answers save nahi honge aur score nahi banega.')) return;
  const { day, sid } = exam;
  stopExam();
  exam = null;
  clearMock();
  addEvent('mockend', { sid, day, why: 'quit' }); // closes a synced pause on other devices too
  sync();
  const to = `#/day/${day}`;
  if (location.hash === to) window.dispatchEvent(new HashChangeEvent('hashchange'));
  else location.hash = to;
}

function renderPaused() {
  const m = exam;
  const c = counts();
  set(`<div id="mockexam" class="mockexam">
    <section class="card hero mxpaused">
      <div class="eyebrow">Day ${m.day} · Full mock</div>
      <h1>⏸ Mock paused</h1>
      <div class="stats">
        <div><b>${fmtClock(m.limitMs - m.elapsed)}</b><span>time baaki</span></div>
        <div><b>${c.an + c.am}/${m.items.length}</b><span>answered</span></div>
        <div><b>${m.pauses || 1}</b><span>pause</span></div>
      </div>
      <p class="muted">Timer ruka hua hai aur sawaal chhupe hain. Ye pause sync ho gaya hai — doosre device pe app kholo toh wahi paper isi jagah se continue hoga (dono pe Settings me token chahiye).</p>
      <p class="banner warn">Asli GATE me pause nahi hota. Result me pause ki ginti aur time likha jaayega — koshish karo ek hi baithak me poora karne ki.</p>
      <div class="actions">
        <button type="button" class="primary" id="mxresume">▶ Resume</button>
        <button type="button" id="mxquit">Mock chhodo</button>
      </div>
    </section></div>`);
  document.getElementById('mxresume').onclick = resume;
  document.getElementById('mxquit').onclick = quitMock;
  document.getElementById('mxresume').focus();
}

function renderExam() {
  const m = exam;
  if (m.paused) return renderPaused();
  const i = m.cur;
  const it = m.items[i];
  const q = content.questions[it.qid];
  const resp = m.ans[i];
  const isMsq = q.type === 'MSQ';
  const n = m.items.length;
  const ga = m.items.filter((x) => x.sec === 'GA').length;
  const neg = q.type === 'MCQ' ? `galat pe −${q.marks === 1 ? '1/3' : '2/3'}` : 'negative marking nahi';
  set(`<div id="mockexam" class="mockexam">
    <div class="mxbar">
      <b class="mxtitle">Day ${m.day} · Full mock</b>
      <span class="mxsec">
        <button type="button" class="pt ${it.sec === 'GA' ? 'on' : ''}" data-go="0">GA</button>
        <button type="button" class="pt ${it.sec === 'T' ? 'on' : ''}" data-go="${ga}">Technical</button>
        <a class="pt mxpaljump" href="javascript:void(0)" id="mxpaljump">Palette ↓</a>
      </span>
      <span class="mxclock" id="mxclock"></span>
      <button type="button" id="mxpause" title="Pause (P)" aria-label="Pause">⏸<span class="lg"> Pause</span></button>
      <button type="button" class="primary" id="mxsubmit">Submit</button>
    </div>
    <div class="mxgrid">
      <section class="card mxq">
        <div class="mxhead"><b>Q${i + 1}<span class="muted">/${n}</span></b>
          <span class="qtype ${isMsq ? 'msq' : ''}">${q.type} · ${q.marks} mark${q.marks > 1 ? 's' : ''}</span>
          <span class="muted small">${neg}</span>
          ${m.marked.includes(i) ? '<span class="chip warnchip">Marked for review</span>' : ''}</div>
        <div class="stem">${md(q.stem)}</div>
        ${q.figure ? `<div class="figure">${q.figure}</div>` : ''}
        <form id="mockform" autocomplete="off">
          ${q.type === 'NAT'
            ? `<label class="nat"><span>Answer</span><input id="mxnat" inputmode="decimal" placeholder="Ek number" value="${esc(resp ?? '')}"></label>`
            : `<div class="opts">${q.options.map((o, k) => `
              <label class="opt ${isMsq ? 'msq' : ''}"><input class="vh" type="${isMsq ? 'checkbox' : 'radio'}" name="mxopt" value="${k}" ${(resp || []).includes(k) ? 'checked' : ''}>
                <span class="key">${'ABCD'[k]}</span><span class="otext">${md(bigFrac(o.text), true)}</span></label>`).join('')}</div>`}
          ${isMsq ? '<p class="hint"><b>MSQ:</b> ek ya zyada sahi. Poora exact set chahiye.</p>' : ''}
          <div class="err" id="mxerr" role="alert"></div>
        </form>
        <div class="mxactions">
          <button type="button" id="mxprev" ${i === 0 ? 'disabled' : ''}>← Previous</button>
          <button type="button" id="mxclear">Clear</button>
          <button type="button" id="mxmark">${m.marked.includes(i) ? 'Unmark' : 'Mark for review'}${i < n - 1 ? ' & Next' : ''}</button>
          <button type="button" class="primary" id="mxnext">${i < n - 1 ? 'Save & Next →' : 'Save'}</button>
        </div>
        <p class="hint keys">Keyboard: 1–4 / A–D option · ← → pichhla/agla · M = mark · answer apne aap save hota hai</p>
      </section>
      <aside class="card mxpal" id="mxpal">${palette()}</aside>
    </div>
  </div>`);
  renderClock();
  bindExam();
}

function refreshPalette() {
  const p = document.getElementById('mxpal');
  if (p) {
    p.innerHTML = palette();
    bindPalette();
  }
}

function readAnswer() {
  const q = content.questions[exam.items[exam.cur].qid];
  if (q.type === 'NAT') return document.getElementById('mxnat').value.trim();
  return [...document.querySelectorAll('input[name=mxopt]:checked')].map((x) => Number(x.value));
}

function storeAnswer() {
  const v = readAnswer();
  if (isBlank(v)) delete exam.ans[exam.cur];
  else exam.ans[exam.cur] = v;
  saveMock(exam);
  refreshPalette();
}

// NAT entries must be a plain number before moving on (GATE's keypad allows nothing else).
function natOk() {
  const q = content.questions[exam.items[exam.cur].qid];
  if (q.type !== 'NAT') return true;
  const v = exam.ans[exam.cur];
  if (isBlank(v) || parseNat(v) !== null) return true;
  document.getElementById('mxerr').textContent = String(v).includes(',')
    ? 'Comma nahi — decimal ke liye point (.) use karo.'
    : 'Sirf ek number likho (fraction ya expression nahi), ya Clear karo.';
  return false;
}

function go(i) {
  if (i < 0 || i >= exam.items.length) return;
  exam.cur = i;
  if (!exam.visited.includes(i)) exam.visited.push(i);
  saveMock(exam);
  renderExam();
  main.scrollTo(0, 0);
  window.scrollTo(0, 0);
}

function bindPalette() {
  document.querySelectorAll('#mxpal [data-go]').forEach((b) => { b.onclick = () => natOk() && go(Number(b.dataset.go)); });
  const quit = document.getElementById('mxquit');
  if (quit) quit.onclick = quitMock;
}

function bindExam() {
  const form = document.getElementById('mockform');
  form.onsubmit = (e) => { e.preventDefault(); next(); };
  form.addEventListener('change', storeAnswer);
  form.addEventListener('input', () => { document.getElementById('mxerr').textContent = ''; storeAnswer(); });
  document.getElementById('mxprev').onclick = () => natOk() && go(exam.cur - 1);
  document.getElementById('mxnext').onclick = next;
  document.getElementById('mxclear').onclick = () => { delete exam.ans[exam.cur]; saveMock(exam); renderExam(); };
  document.getElementById('mxmark').onclick = () => {
    if (!natOk()) return;
    const i = exam.cur;
    exam.marked = exam.marked.includes(i) ? exam.marked.filter((x) => x !== i) : [...exam.marked, i];
    saveMock(exam);
    if (i < exam.items.length - 1) go(i + 1); else renderExam();
  };
  document.querySelectorAll('.mxsec [data-go]').forEach((b) => { b.onclick = () => natOk() && go(Number(b.dataset.go)); });
  document.getElementById('mxpaljump').onclick = () => document.getElementById('mxpal').scrollIntoView({ block: 'start', behavior: 'smooth' });
  document.getElementById('mxpause').onclick = pause;
  document.getElementById('mxsubmit').onclick = () => {
    const c = counts();
    const left = fmtClock(exam.limitMs - exam.elapsed);
    if (!confirm(`Submit karein? (${left} baaki)\n\nAnswered: ${c.an + c.am}\nNot answered: ${c.na}\nNot visited: ${c.nv}\nMarked for review: ${c.mk + c.am}\n\nSubmit ke baad answers badal nahi sakte.`)) return;
    finish(false);
  };
  bindPalette();
  const nat = document.getElementById('mxnat');
  if (nat) nat.focus({ preventScroll: true });
}

function next() {
  if (!natOk()) return;
  if (exam.cur < exam.items.length - 1) go(exam.cur + 1);
  else document.getElementById('mxsubmit').focus();
}

function finish(auto) {
  const m = exam;
  stopExam();
  exam = null;
  const sid = submitMock(m, auto);
  location.hash = `#/mock/${sid}`;
}

function onKey(e) {
  if (!exam || !document.getElementById('mockexam') || e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
  const tag = (e.target.tagName || '').toLowerCase();
  const typing = tag === 'textarea' || (tag === 'input' && !['radio', 'checkbox'].includes(e.target.type));
  if (typing) return;
  const k = e.key.toLowerCase();
  if (exam.paused) return;
  if (k === 'p') { e.preventDefault(); return pause(); }
  if (k === 'arrowright') { e.preventDefault(); return next(); }
  if (k === 'arrowleft') { e.preventDefault(); return natOk() && go(exam.cur - 1); }
  if (k === 'm') { e.preventDefault(); return document.getElementById('mxmark').click(); }
  const idx = k.length === 1 ? Math.max('1234'.indexOf(k), 'abcd'.indexOf(k)) : -1;
  const opt = idx >= 0 ? document.querySelectorAll('input[name=mxopt]')[idx] : null;
  if (opt) {
    e.preventDefault();
    opt.checked = opt.type === 'checkbox' ? !opt.checked : true;
    opt.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

// ---------- result ----------

export function mockRows(sid, state) {
  const ev = state.mocks.find((e) => e.sid === sid);
  if (!ev) return null;
  const atts = new Map(state.attempts.filter((a) => a.sid === sid).map((a) => [a.qid, a]));
  const rows = (ev.qids || []).map((qid, i) => {
    const q = content.questions[qid];
    const a = atts.get(qid);
    if (!q || !a) return null;
    const status = a.skipped ? 'skip' : a.correct ? 'right' : 'wrong';
    // recomputed exactly (the stored value is rounded, and three −0.33s would show as −0.99)
    const marks = status === 'right' ? q.marks : status === 'wrong' && q.type === 'MCQ' ? -q.marks / 3 : 0;
    const sec = content.skills[q.skill]?.area === 'ga' ? 'GA' : 'T';
    return { i, q, a, status, marks, ms: a.ms || 0, sec, subject: subjectOfQ(q) };
  }).filter(Boolean);
  return { ev, rows };
}

const STATUS = { right: ['✓', 'okc'], wrong: ['✗', 'noc'], skip: ['—', 'muted'] };

function reviewBody(r) {
  const { q, a } = r;
  const skill = content.skills[q.skill] || {};
  let body = `<div class="stem">${md(q.stem)}</div>${q.figure ? `<div class="figure">${q.figure}</div>` : ''}`;
  if (q.type === 'NAT') {
    const trap = !a.correct && !a.skipped ? (q.traps || []).find((t) => {
      const v = parseNat(a.resp);
      return v !== null && Math.abs(v - t.value) <= Math.max(q.answer.tol || 0, 1e-6 * Math.max(1, Math.abs(t.value)));
    }) : null;
    body += `<p>Tumhara answer: <b>${a.skipped ? 'chhoda' : esc(a.resp)}</b> · Sahi: <b>${esc(q.answer.value)}</b>${q.answer.tol ? ` (± ${q.answer.tol})` : ''}</p>
      ${trap ? `<div class="why bad"><b>Ye galti lag rahi hai:</b> ${md(trap.why, true)}</div>` : ''}`;
  } else {
    const resp = a.resp || [];
    body += `<div class="opts">${q.options.map((o, k) => {
      const picked = resp.includes(k);
      return `<div class="opt ${q.type === 'MSQ' ? 'msq' : ''} ${o.correct ? 'right' : picked ? 'wrong' : 'plain'}"><span class="key">${'ABCD'[k]}</span><span class="otext">${md(bigFrac(o.text), true)}</span></div>`;
    }).join('')}</div>`;
    body += q.options.map((o, k) => {
      const picked = resp.includes(k);
      if (!picked && !o.correct) return '';
      const tag = o.correct ? (picked ? '✓ tumne chuna, sahi' : '✓ sahi option') : '✗ tumne chuna';
      return `<div class="why ${o.correct ? 'good' : 'bad'}"><b>${'ABCD'[k]} — ${tag}:</b> ${md(o.why, true)}</div>`;
    }).join('');
  }
  body += `<details open><summary>Solution</summary><div class="sol">${md(q.solution)}</div></details>`;
  if (skill.theory) body += `<p><a href="#/theory/${esc(skill.theory)}/q=${encodeURIComponent(q.id)}">📖 Samjho: ${esc(skill.title || q.skill)} — lesson</a></p>`;
  return body;
}

function advice(s, rows, ev) {
  const out = [];
  const negMcq = rows.filter((r) => r.status === 'wrong' && r.q.type === 'MCQ').length;
  if (s.negative >= 2) out.push(`<b>Negative marking se ${fmtMarks(s.negative)} marks gaye</b> (${negMcq} galat MCQ). Jo MCQ 2 options tak cut na ho, use chhodo.`);
  const freeSkips = rows.filter((r) => r.status === 'skip' && r.q.type !== 'MCQ');
  if (freeSkips.length) out.push(`<b>${freeSkips.length} MSQ/NAT chhode</b> (${freeSkips.reduce((t, r) => t + r.q.marks, 0)} marks). Inme negative nahi hota — time bacha ho toh hamesha try karo.`);
  const unseen = rows.filter((r) => r.status === 'skip' && r.ms < 15000).length;
  if (ev.auto || unseen >= 8) out.push(`<b>${unseen} sawaal dekhe bhi nahi ya 15 sec se kam.</b> Pehle round me saare 1-mark aur aasaan sawaal karo, mushkil wale mark karke aage badho.`);
  const slow = rows.filter((r) => r.ms > (r.q.marks === 1 ? 4 : 7) * 60000);
  if (slow.length) out.push(`<b>${slow.length} sawaalon pe bahut time</b> (1-mark pe 4+ min, 2-mark pe 7+ min). 2 min me raasta na dikhe toh mark karke aage jao.`);
  const subj = Object.entries(s.bySubject).map(([n, b]) => ({ n, lost: b.max - b.net, max: b.max })).sort((a, b) => b.lost - a.lost)[0];
  if (subj && subj.lost > 0) out.push(`<b>Sabse zyada marks ${esc(subj.n)} me gaye</b> (${fmtMarks(subj.lost)} / ${subj.max}). Kal ka repair yahin se shuru karo — galat sawaal revision cards me daal diye hain.`);
  return out;
}

export function viewMockResult(sid) {
  const state = derive();
  const res = mockRows(sid, state);
  if (!res) return set('<section class="card"><h1>Result nahi mila</h1><p class="muted">Ye mock is device pe abhi sync nahi hua. Sync karke dobara kholo.</p><a class="button" href="#/today">Today</a></section>');
  const { ev, rows } = res;
  const s = summarize(rows);
  const pct = s.max ? (s.net / s.max) * 100 : 0;
  const tone = pct >= TARGET ? 'ok' : pct >= TARGET - 10 ? 'near' : 'far';
  const subjects = Object.entries(s.bySubject);
  const types = Object.entries(s.byType);
  const slow = rows.slice().sort((a, b) => b.ms - a.ms).slice(0, 5);
  const tips = advice(s, rows, ev);
  const nextDay = content.plan.days.find((d) => d.day > ev.day);
  const mmss = (ms) => `${Math.floor(ms / 60000)}:${String(Math.round((ms % 60000) / 1000)).padStart(2, '0')}`;
  set(`
    <section class="card hero">
      <div class="eyebrow">Day ${ev.day} · Full mock result · ${fmtDate(ev.date)}</div>
      <h1>${fmtMarks(s.net)} / ${s.max}</h1>
      ${ev.auto ? '<p class="banner warn">Time khatam — paper apne aap submit hua.</p>' : ''}
      ${ev.pauses ? `<p class="banner">⏸ ${ev.pauses} baar pause kiya (kul ${Math.round((ev.pausedMs || 0) / 60000)} min). Asli exam me pause nahi hota — agla mock bina pause ke try karo.</p>` : ''}
      <div class="bar t72bar"><div style="width:${Math.max(0, Math.min(100, pct))}%"></div><i style="left:${TARGET}%"></i></div>
      <p class="t72 ${tone}"><b>${pct >= TARGET ? `Target ${TARGET} ke upar ✓` : `Target ${TARGET} tak ${fmtMarks((TARGET / 100) * s.max - s.net)} marks`}</b></p>
      <div class="stats">
        <div><b>${s.attempted}</b><span>attempted / ${rows.length}</span></div>
        <div><b>${s.correct}</b><span>sahi</span></div>
        <div><b>${s.wrong}</b><span>galat</span></div>
        <div><b>−${fmtMarks(s.negative)}</b><span>negative</span></div>
        <div><b>${fmtClock(ev.durationMs || 0)}</b><span>time / 3:00:00</span></div>
      </div>
      <p class="muted small">Ye paper sirf Day ${ev.day} se pehle padhe subjects se bana tha (${subjects.filter(([n]) => n !== 'General Aptitude').map(([n]) => esc(n)).join(', ')} + GA). Baaki subjects aage ke mocks me judenge.</p>
    </section>
    ${tips.length ? `<section class="card"><h2>Kya sudhaarna hai</h2><ul>${tips.map((t) => `<li>${t}</li>`).join('')}</ul></section>` : ''}
    <section class="card">
      <h2>Subject-wise</h2>
      <table class="tbl"><thead><tr><th>Subject</th><th>Marks</th><th>✓ / ✗ / —</th><th>Negative</th></tr></thead><tbody>
      ${subjects.map(([n, b]) => `<tr><td>${esc(n)}</td><td><b>${fmtMarks(b.net)}</b> / ${b.max}</td><td>${b.right} / ${b.wrong} / ${b.skip}</td><td>${b.neg ? '−' + fmtMarks(b.neg) : '—'}</td></tr>`).join('')}
      </tbody></table>
      <h3>Type-wise</h3>
      <table class="tbl"><thead><tr><th>Type</th><th>Sawaal</th><th>✓ / ✗ / —</th><th>Marks</th></tr></thead><tbody>
      ${types.map(([t, b]) => `<tr><td>${t}</td><td>${b.n}</td><td>${b.right} / ${b.wrong} / ${b.skip}</td><td>${fmtMarks(b.net)}</td></tr>`).join('')}
      </tbody></table>
      <h3>Sabse zyada time</h3>
      <ul>${slow.map((r) => `<li>Q${r.i + 1} · ${esc(r.subject)} · ${r.q.type} ${r.q.marks}m · <b>${mmss(r.ms)}</b> · <span class="${STATUS[r.status][1]}">${STATUS[r.status][0]}</span></li>`).join('')}</ul>
    </section>
    <section class="card">
      <h2>Har sawaal ka review</h2>
      <div class="chips" id="mxfilter">
        <button type="button" class="chip on" data-f="all">Saare (${rows.length})</button>
        <button type="button" class="chip" data-f="wrong">Galat (${s.wrong})</button>
        <button type="button" class="chip" data-f="skip">Chhode (${s.skipped})</button>
        <button type="button" class="chip" data-f="right">Sahi (${s.correct})</button>
      </div>
      <div id="mxreview">${rows.map((r) => `
        <details class="mxrev" data-s="${r.status}" data-i="${r.i}">
          <summary><span class="${STATUS[r.status][1]}">${STATUS[r.status][0]}</span> <b>Q${r.i + 1}</b> · ${esc(r.subject)} · ${r.q.type} ${r.q.marks}m
            <span class="muted small">· ${r.marks > 0 ? '+' : ''}${fmtMarks(r.marks)} · ${mmss(r.ms)}${r.a.repeated ? ' · pehle dekha tha' : ''}</span></summary>
          <div class="mxbody"></div>
        </details>`).join('')}</div>
    </section>
    <section class="card">
      <div class="actions">
        <a class="button primary" href="#/revision">Revision cards dekho</a>
        ${nextDay ? `<a class="button" href="#/day/${nextDay.day}">Day ${nextDay.day}: ${esc(nextDay.title)}</a>` : ''}
        <a class="button" href="#/day/${ev.day}">Mock ka page</a>
      </div>
    </section>`);
  // question bodies are typeset only when opened (65 at once is slow on phones)
  main.querySelectorAll('.mxrev').forEach((d) => {
    d.addEventListener('toggle', () => {
      const b = d.querySelector('.mxbody');
      if (!d.open || b.dataset.done) return;
      b.innerHTML = reviewBody(rows.find((r) => String(r.i) === d.dataset.i));
      b.dataset.done = '1';
      typeset(b);
    });
  });
  const filter = document.getElementById('mxfilter');
  filter.onclick = (e) => {
    const b = e.target.closest('[data-f]');
    if (!b) return;
    filter.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c === b));
    main.querySelectorAll('.mxrev').forEach((d) => { d.hidden = b.dataset.f !== 'all' && d.dataset.s !== b.dataset.f; });
  };
}

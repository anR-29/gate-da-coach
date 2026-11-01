// Content loading, derived progress state, spaced revision and the adaptive daily session.

import { addEvent, allEvents, cfg } from './store.js';

export const INTERVALS = [1, 3, 7, 14, 30];
export const MASTERED_AFTER = 5; // passes in a row
export const REVIEW_CAP = 10;
export const REPAIRS_PER_SKILL = 2;
const AREAS = ['ps', 'la', 'calc', 'py', 'ga'];

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
        content.skills[id] = { id, area, ...s };
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
      dayLogs[e.day] = e;
    } else if (e.type === 'mock') {
      mocks.push(e);
    }
  }
  return { cards, dayLogs, seen, attempts, mocks };
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
    if (a.mode === 'repair' || a.repeated) continue;
    const s = (stats[a.skill] ||= { n: 0, ok: 0 });
    s.n++;
    if (a.correct && a.conf !== 'Guess') s.ok++;
  }
  return stats;
}

export function weakSkills(state) {
  const st = skillStats(state);
  return Object.entries(st)
    .filter(([id, s]) => s.n >= 3 && s.ok / s.n < 0.6 && content.skills[id])
    .map(([id]) => id);
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
    ended: false,
  };
  saveSession(session);
  return session;
}

export function loadSession() {
  try {
    const s = JSON.parse(localStorage.getItem(LS_SESSION) || 'null');
    return s && s.date === today() && !s.ended ? s : null;
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

export function sessionCounts(session, state) {
  const mine = state.attempts.filter((a) => a.date === session.date && a.day === session.day);
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
  if (session.ended) return null;
  const counts = sessionCounts(session, state);
  const t = targets(session, counts);

  while (session.repairQueue.length) {
    const r = session.repairQueue[0];
    const picked = pickQuestion(r.skill, session, state);
    if (picked) return { ...picked, skill: r.skill, mode: 'repair', label: 'Fresh variant · repair' };
    session.repairQueue.shift();
  }
  if (timeUp(session)) return null;

  const due = dueCards(state).filter((c) => !counts.reviewedToday.has(c.skill));
  if (due.length && counts.review < session.reviewCap) {
    const c = due[0];
    const picked = pickQuestion(c.skill, session, state);
    if (picked) return { ...picked, skill: c.skill, mode: 'review', label: 'Delayed revision · fresh variant' };
  }
  if (session.mode === 'revision') return null;

  const topic = session.topicSkills;
  if (counts.topic < t.topic && topic.length) {
    const mode = counts.diag < 3 && session.mode === 'normal' ? 'diag' : 'topic';
    for (let i = 0; i < topic.length; i++) {
      const skill = rotate(topic, counts.topic + i);
      const level = mode === 'diag' ? 1 : counts.topic < t.topic / 2 ? 1 : 2;
      const picked = pickQuestion(skill, session, state, level);
      if (picked && !picked.repeated) return { ...picked, skill, mode, label: mode === 'diag' ? 'Closed-book brush-up' : 'Today’s topic' };
    }
  }

  const mixedPool = [...new Set([...weakSkills(state), ...session.spacedSkills])].filter((s) => !topic.includes(s));
  if (counts.mixed < t.mixed && mixedPool.length) {
    for (let i = 0; i < mixedPool.length; i++) {
      const skill = rotate(mixedPool, counts.mixed + i);
      const picked = pickQuestion(skill, session, state, 2);
      if (picked && !picked.repeated) return { ...picked, skill, mode: 'mixed', label: 'Mixed · older topic' };
    }
  }

  if (counts.ga < t.ga) {
    const gaSkills = Object.keys(content.skills).filter((s) => s.startsWith('ga.'));
    const skill = counts.ga % 3 === 2 ? rotate(gaSkills, counts.ga) : session.gaSkill;
    const picked = pickQuestion(skill, session, state) || pickQuestion(session.gaSkill, session, state);
    if (picked) return { ...picked, skill: picked.q.skill, mode: 'ga', label: 'General Aptitude' };
  }
  return null;
}

// ---------- grading ----------

export function parseNat(raw) {
  const s = String(raw).trim().replace(/,/g, '');
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

// Records the attempt, updates revision cards and queues repair variants.
export function submit(session, item, response, conf, ms) {
  const q = item.q;
  const g = grade(q, response);
  if (!g.valid) return { ...g };
  const skill = content.skills[q.skill];
  const date = session.date;
  addEvent('attempt', {
    qid: q.id, skill: q.skill, subject: skill?.subject || '', day: session.day, date,
    mode: item.mode, resp: response, correct: g.correct, conf, repeated: item.repeated, ms,
  });

  const state = derive();
  const counts = sessionCounts(session, state);
  const repairsDone = counts.repairsBySkill[q.skill] || 0;
  const out = { ...g, repairQueued: false, showTheory: false, stopSkill: false, cardOpened: false };
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

export function endSession(session, { hours, anxiety, notes }) {
  const state = derive();
  const c = sessionCounts(session, state);
  addEvent('daylog', {
    day: session.day, date: session.date, hours, anxiety, notes, mode: session.mode,
    attempts: c.attempts, correct: c.correct, firstPass: c.firstPass, firstPassOk: c.firstPassOk,
  });
  session.ended = true;
  saveSession(session);
}

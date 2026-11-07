import { cfg, setCfg, onChange, sync, syncState, testConnection, exportJson, importJson } from './store.js?v=202611080012';
import {
  content, loadContent, derive, dueCards, planStatus, newSession, loadSession, saveSession, nextItem, submit,
  endSession, sessionCounts, targets, timeUp, skillStats, today, addDays, INTERVALS, MASTERED_AFTER, TRAP_CLASSES,
  TARGET, target72, focusSkills, dayStatus, PARTS, getOrder, setOrder, sessionAttempts, natHint, topicShort, dayCarry, grade,
} from './engine.js?v=202611080012';
import { md, typeset, esc, fmtDate, pct } from './render.js?v=202611080012';
import { loadMock, startMock, showExam, viewMockResult, mockShare, MOCK_MIN } from './mock.js?v=202611080012';

const main = document.getElementById('main');
const IDLE_MS = 5 * 60000;

let session = null;
let current = null;      // { q, skill, mode, label, repeated, shownAt }
let feedback = null;     // result of submit() for the current item
let lastInput = Date.now();

// ---------- shell ----------

const CRUMBS = {
  today: 'Today', day: 'Day', days: 'All days', attempt: 'Attempt review', revision: 'Revision cards',
  theory: 'Theory', recall: 'Recall sheet', progress: 'Progress', settings: 'Settings', mock: 'Mock result',
};
const NAV_OF = { day: 'days', attempt: 'days', mock: 'days' };

let viewToken = 0; // async views drop their result if the user has navigated away

function route() {
  viewToken++;
  const hash = location.hash.replace(/^#\/?/, '') || 'today';
  const [view, arg, sub] = hash.split('/');
  // a running full mock locks the app on its paper, like the real exam
  const live = loadMock();
  if (live && !(view === 'day' && Number(arg) === live.day)) {
    location.hash = `#/day/${live.day}`;
    return;
  }
  const known = CRUMBS[view] ? view : 'today';
  const nav = NAV_OF[known] || known;
  document.querySelectorAll('[data-view]').forEach((a) => a.classList.toggle('active', a.dataset.view === nav));
  document.getElementById('crumb').textContent = arg && known !== 'attempt' && known !== 'mock' ? `${CRUMBS[known]} · ${decodeURIComponent(arg)}` : CRUMBS[known];
  const views = {
    today: viewToday, day: (a) => viewDay(Number(a)), days: viewDays, attempt: viewAttempt,
    revision: viewRevision, theory: viewTheory, recall: viewRecall, progress: viewProgress, settings: viewSettings,
    mock: viewMockResult,
  };
  main.scrollTo(0, 0);
  window.scrollTo(0, 0);
  views[known](arg ? decodeURIComponent(arg) : null, sub || null);
  renderChrome();
}

function renderSync() {
  const el = document.getElementById('sync');
  const map = { ok: 'Synced', syncing: 'Syncing…', error: 'Sync error', off: 'Local only', idle: 'Sync' };
  el.textContent = map[syncState.status] || 'Sync';
  const btn = document.getElementById('syncbtn');
  btn.className = `btn outline ${syncState.status === 'ok' ? 'sync-ok' : syncState.status === 'error' ? 'sync-error' : ''}`;
  btn.title = syncState.message || (syncState.last ? `Last sync ${syncState.last.toLocaleTimeString()}` : 'Sync now');
}

// Sidebar counts, upcoming days, exam countdown and the header timer.
function renderChrome() {
  if (!content.plan) return;
  const state = derive();
  const ps = planStatus(state);
  const due = dueCards(state).length;
  const rev = document.getElementById('c-rev');
  rev.textContent = due || '';
  rev.classList.toggle('hot', due > 0);
  document.getElementById('c-today').textContent = `Day ${ps.current.day}`;
  document.getElementById('c-theory').textContent = content.theory.size || '';
  document.getElementById('examdays').textContent = `${ps.daysToExam} days to GATE`;
  const nav = document.getElementById('weeknav');
  const viewing = (location.hash.match(/^#\/day\/(\d+)/) || [])[1];
  const firstRender = !nav.dataset.ready;
  nav.innerHTML = content.plan.days.map((d) => dayRow(state, d, ps, viewing)).join('');
  nav.dataset.ready = '1';
  if (firstRender) {
    const cur = nav.querySelector('.week.current');
    if (cur) cur.scrollIntoView({ block: 'center' });
  }
  const planPct = Math.round((100 * ps.doneCount) / ps.total);
  document.getElementById('sideprog').innerHTML = `
    <strong>Plan ${ps.doneCount}/${ps.total} days</strong>
    <div class="bar"><div style="width:${planPct}%"></div></div>
    <div class="small">${ps.behind ? `<span class="hot">${ps.behind} day(s) behind</span> · ` : ''}finish ${fmtDate(ps.projectedEnd)}<br>${ps.bufferDays >= 0 ? `${ps.bufferDays} days buffer before exam` : 'past the exam date!'}</div>`;
  renderTimer();
}

// One row of the all-days list (sidebar and the Days page).
function dayRow(state, d, ps, viewing) {
  const st = dayStatus(state, d.day);
  const isCur = d.day === ps.current.day;
  const mark = st.fallback ? '<span class="dmark fb" title="Fallback use hua">F</span>'
    : st.done ? '<span class="dmark ok" title="Done">✓</span>'
      : st.partial ? '<span class="dmark part" title="Adhoora — topic baaki">◐</span>' : '';
  const re = st.reattempts ? `<span class="dmark re" title="${st.reattempts}× re-attempt">↻${st.reattempts > 1 ? st.reattempts : ''}</span>` : '';
  const late = isCur && d.date && d.date < today();
  const sub = [d.date ? `planned ${fmtDate(d.date)}` : 'app se pehle', d.isMock ? 'mock' : '', isCur ? (late ? 'abhi (late)' : 'abhi') : ''].filter(Boolean).join(' · ');
  // only the current day is a tab stop, so keyboard users don't tab through 100+ rows
  return `<a class="week ${isCur ? 'current' : ''} ${String(viewing) === String(d.day) ? 'active' : ''} ${d.isMock ? 'mock' : ''} ${st.done ? 'done' : ''}" href="#/day/${d.day}" title="${esc(d.title)}" ${isCur ? '' : 'tabindex="-1"'}>
      <span class="day-icon">${d.day}</span>
      <span class="wtext"><strong>${esc(d.title)}</strong><small>${sub}</small></span>
      <span class="wmarks">${re}${mark}</span>
    </a>`;
}

function renderTimer() {
  const el = document.getElementById('timer');
  if (!session || session.ended) { el.textContent = ''; return; }
  const m = Math.floor(session.activeMs / 60000);
  el.textContent = `${String(Math.floor(m / 60)).padStart(1, '0')}:${String(m % 60).padStart(2, '0')} / ${Math.floor(session.capMin / 60)}:${String(session.capMin % 60).padStart(2, '0')}`;
}

function set(html) {
  main.innerHTML = html;
  typeset(main);
}

// ---------- today ----------

function activeSession() {
  session = session || loadSession();
  return session && !session.ended ? session : null;
}

// Today = the running session if there is one, else the current plan day's page.
function viewToday() {
  const live = loadMock();
  if (live) return viewDay(live.day);
  const state = derive();
  if (activeSession()) return renderSession(state);
  viewDay(planStatus(state).current.day);
}

function viewDay(n) {
  const state = derive();
  const ps = planStatus(state);
  const day = content.plan.days.find((d) => d.day === n);
  if (!day) return set('<section class="card"><h1>Ye din plan me nahi hai</h1><a class="button" href="#/days">All days</a></section>');
  const running = activeSession();
  if (running && running.day === n && running.mode !== 'revision') return renderSession(state);

  const st = dayStatus(state, n);
  const isCur = n === ps.current.day;
  // weekly checkpoints (38 questions) run as a normal mixed session; full papers get the mock screen
  if (day.isMock && day.questionTarget >= 65) return renderMockDay(day, state, running);

  const due = dueCards(state);
  const behind = isCur && ps.behind > 0
    ? `<div class="banner warn">Tum plan se <b>${ps.behind} din peeche</b> ho. Is speed se plan ${fmtDate(ps.projectedEnd)} ko khatam hoga${ps.bufferDays < 10 ? ` — exam se sirf ${Math.max(ps.bufferDays, 0)} din pehle` : ''}. Aaj time kam hai toh <b>Fallback</b> lo.</div>`
    : '';
  const busy = running
    ? `<div class="banner warn">Day ${running.day} ka session abhi chal raha hai. <a href="#/today"><b>Wahi continue karo</b></a> ya pehle use band karo — ek time pe ek hi session.</div>`
    : '';
  const late = isCur && day.date && day.date < today();
  const status = [
    st.done ? '<span class="chip ok">✓ Done</span>'
      : st.partial ? '<span class="chip warnchip">◐ Adhoora — topic baaki</span>'
        : isCur ? `<span class="chip">${late ? 'Abhi ka din (planned date nikal gayi)' : 'Abhi ka din'}</span>`
          : n > ps.current.day ? '<span class="chip">Aage ka din</span>' : '<span class="chip hot">Baaki</span>',
    st.fallback ? '<span class="chip warnchip">Fallback use hua</span>' : '',
    st.reattempts ? `<span class="chip">↻ ${st.reattempts}× re-attempt</span>` : '',
  ].join('');
  const reattempt = st.done;
  const noContent = sessionSkillsCount(day) === 0;
  const carried = reattempt ? 0 : dayCarry(state, n).n; // work already saved for this unfinished day

  set(`
    ${behind}${busy}
    <section class="card hero">
      <div class="eyebrow">Day ${day.day} · ${esc(day.subject)} · ${day.date ? `planned ${fmtDate(day.date)}` : 'app se pehle'}</div>
      <h1>${esc(day.title)}</h1>
      <div class="chips">${status}</div>
      ${day.alsoCovers.length ? `<p class="muted">Isme ye bhi shamil: ${day.alsoCovers.map(esc).join('; ')}</p>` : ''}
      <p><b>Goal:</b> ${esc(day.objective)}</p>
      <div class="chips">
        <span class="chip">${day.plannedHours} h</span>
        <span class="chip">~${day.questionTarget} sawaal (adaptive)</span>
        <span class="chip">GA: ${esc(day.gaLabel)}</span>
        <span class="chip ${due.length ? 'hot' : ''}">${due.length} revision card due</span>
      </div>
      ${orderCard()}
      <div class="actions">
        <button class="primary" id="start" ${running ? 'disabled' : ''}>${reattempt ? `Day ${day.day} re-attempt karo` : carried ? `Day ${day.day} continue karo` : `Day ${day.day} shuru karo`}</button>
        <button id="fallback" ${running ? 'disabled' : ''}>${reattempt ? 'Re-attempt (Fallback 50 min)' : 'Fallback (50 min)'}</button>
        ${!st.done && dayTheories(day).length ? `<a class="button" href="#/theory/${esc(dayTheories(day)[0])}">📖 Pehle samjho</a>` : ''}
      </div>
      ${carried ? `<p class="hint">Is din ke <b>${carried} sawaal</b> pehle se save hain (kisi bhi device se). Wahin se aage chalega — kuch dobara nahi karna.</p>` : ''}
      ${reattempt ? '<p class="hint">Re-attempt me naye variants pehle aate hain; khatam hone pe dekhe hue sawaal "repeat" tag ke saath aate hain (fresh accuracy me nahi ginte). Plan progress nahi badlega.</p>' : ''}
      ${noContent ? '<p class="banner">Is din ke topic ke sawaal abhi bank me nahi hain. Revision aur GA chalenge.</p>' : ''}
    </section>
    ${learnCard(day, st)}
    ${isCur ? focusCard(state) : ''}
    ${dayAttempts(state, n)}
  `);
  fillTitles(main);
  bindOrder();
  const start = document.getElementById('start');
  start.onclick = () => startSession(day, { reattempt });
  document.getElementById('fallback').onclick = () => startSession(day, { fallback: true, reattempt });
  if (!running && !orderOpen) start.focus({ preventScroll: true });
}

let orderOpen = false; // keep the order picker open while it is being edited

// Lets the student pick which part of the day comes first; remembered as the default.
function orderCard() {
  const order = getOrder();
  return `<details class="ordercard" id="ordercard" ${orderOpen ? 'open' : ''}>
      <summary><span class="muted">Order:</span> ${order.map((p) => MODE_LABEL[p]).join(' → ')} <span class="link">badlo</span></summary>
      <p class="muted small">Upar wala part pehle chalega. Galat answer ka repair variant hamesha turant aata hai. Ye order agle dinon ke liye bhi yaad rahega.</p>
      <ol class="order" id="order">
        ${order.map((p, i) => `<li data-p="${p}"><span class="onum">${i + 1}</span><span class="olabel">${esc(PARTS[p])}</span>
          <button type="button" class="btn icon-only" data-mv="-1" ${i === 0 ? 'disabled' : ''} aria-label="Upar">↑</button>
          <button type="button" class="btn icon-only" data-mv="1" ${i === order.length - 1 ? 'disabled' : ''} aria-label="Neeche">↓</button></li>`).join('')}
      </ol>
      <div class="actions"><button type="button" id="order-first-rev">Revision pehle</button><button type="button" id="order-first-topic">Topic pehle</button><button type="button" id="order-first-ga">GA pehle</button></div>
    </details>`;
}

function bindOrder() {
  const el = document.getElementById('order');
  if (!el) return;
  document.getElementById('ordercard').addEventListener('toggle', (e) => { orderOpen = e.target.open; });
  const save = (o) => { setOrder(o); orderOpen = true; route(); };
  el.querySelectorAll('button[data-mv]').forEach((b) => {
    b.onclick = () => {
      const o = getOrder();
      const i = o.indexOf(b.closest('li').dataset.p);
      const j = i + Number(b.dataset.mv);
      [o[i], o[j]] = [o[j], o[i]];
      save(o);
    };
  });
  const first = (p) => () => save([p, ...getOrder().filter((x) => x !== p)]);
  document.getElementById('order-first-rev').onclick = first('review');
  document.getElementById('order-first-topic').onclick = first('topic');
  document.getElementById('order-first-ga').onclick = first('ga');
}

// Every attempt made on this plan day, grouped by session, each linking to its review.
function dayAttempts(state, n) {
  const list = state.attempts.filter((a) => a.day === n);
  if (!list.length) return '';
  const groups = new Map();
  for (const a of list) {
    const key = a.sid || a.date;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(a);
  }
  const log = (sid, date) => state.logList.find((l) => l.day === n && (l.sid ? l.sid === sid : l.date === date));
  return `<section class="card">
      <h2>Is din ke attempts</h2>
      ${[...groups.entries()].reverse().map(([key, arr]) => {
        const l = log(arr[0].sid, arr[0].date);
        const ok = arr.filter((a) => a.correct).length;
        const tag = l ? (l.mode === 'reattempt' ? 're-attempt' : String(l.mode).startsWith('history') ? 'chat (pehle)' : l.mode) : 'chal raha / log nahi';
        const SECTIONS = [['Seekho', ['learn']], ['Topic', ['diag', 'topic']], ['Mixed', ['mixed']], ['GA', ['ga']], ['Revision cards', ['review']], ['Repair variants', ['repair']]];
        const item = (a) => {
          const s = content.skills[a.skill];
          return `<li><a href="#/attempt/${esc(a.id)}"><span class="${a.correct ? 'okc' : 'noc'}">${a.correct ? '✓' : '✗'}</span> ${esc(s ? s.title : a.skill)}</a> <span class="muted small">${a.conf === 'Guess' ? 'guess' : ''}${a.hint ? ' · 💡 ishara' : ''}${a.repeated ? ' · repeat' : ''}</span></li>`;
        };
        return `<details ${groups.size === 1 ? 'open' : ''}><summary>${fmtDate(arr[0].date)} · ${esc(tag)}${l && l.fallback && l.mode === 'reattempt' ? ' · fallback' : ''}${l && l.partial ? ' · adhoora' : ''} · ${ok}/${arr.length} sahi</summary>
          ${SECTIONS.map(([name, modes]) => {
            const part = arr.filter((a) => modes.includes(a.mode));
            return part.length ? `<h3 class="ahead">${name} <span class="muted small">${part.filter((a) => a.correct).length}/${part.length}</span></h3><ol class="alist">${part.map(item).join('')}</ol>` : '';
          }).join('')}</details>`;
      }).join('')}
    </section>`;
}

// The 2–3 skills whose repair adds the most expected marks toward 72.
function focusCard(state) {
  const f = focusSkills(state);
  if (!f.length) return '';
  const t = target72(state);
  return `<section class="card">
      <h2>Aaj ka ${TARGET} focus</h2>
      <p class="muted">${t.total !== null ? `Abhi ka estimate <b>${t.total.toFixed(0)}/100</b> · ${TARGET} tak <b>${Math.max(0, TARGET - t.total).toFixed(0)} marks</b> ka gap. ` : ''}Ye skills sabse zyada marks wapas laayengi — aaj revision/mixed me ye pehle aayengi.</p>
      <ul class="links">${f.map((x) => {
        const s = content.skills[x.id];
        return `<li><b>${esc(s.title)}</b> <span class="muted small">${esc(s.subject)}${x.acc !== null ? ` · accuracy ${Math.round(x.acc * 100)}% (${x.n})` : ' · revision card due'}</span>${s.theory ? ` · <a class="small" href="#/theory/${esc(s.theory)}">theory</a>` : ''}</li>`;
      }).join('')}</ul>
    </section>`;
}

function target72Card(state) {
  const t = target72(state);
  const est = t.total;
  const tone = est === null ? '' : est >= TARGET ? 'ok' : est >= TARGET - 10 ? 'near' : 'far';
  return `<section class="card">
      <h2>Target ${TARGET}</h2>
      ${est === null
        ? '<p class="muted">Kisi bhi subject me 3 unseen attempts hote hi yahan estimate aa jaayega.</p>'
        : `<div class="countdown"><b class="t72 ${tone}">${t.lowData ? '~' : ''}${est.toFixed(0)}</b><span>/100${t.lowData && t.band ? ` ± ${t.band}` : ''} estimated · ${est >= TARGET ? `${TARGET} ke upar ✓` : `${TARGET} tak ${(TARGET - est).toFixed(0)} marks`}</span></div>
           <div class="bar t72bar"><div style="width:${Math.min(100, est)}%"></div><i style="left:${TARGET}%"></i></div>
           ${t.lowData ? '<p class="banner warn">Kam data — abhi ye sirf provisional hai. ~60+ attempts ke baad number bharose layak hoga.</p>' : ''}`}
      <table class="tbl"><thead><tr><th>Subject</th><th>Paper marks</th><th>Accuracy</th><th>Expected</th><th>85% pe +marks</th></tr></thead><tbody>
      ${t.rows.map((r) => `<tr class="${r.n ? '' : 'nodata'}"><td>${esc(r.name)}</td><td>${r.marks}</td>
        <td>${r.acc === null ? '—' : `${Math.round(r.acc * 100)}%`} <span class="muted small">(${r.n}${r.n && r.lowData ? ', kam data' : ''})</span></td>
        <td>${r.expected === null ? '—' : `${r.expected.toFixed(1)}${r.assumed ? ' <span class="muted small">assumed</span>' : ''}`}</td>
        <td>${r.gain === null ? '<span class="muted small">data nahi</span>' : r.gain ? `<b>+${r.gain.toFixed(1)}</b>` : '—'}</td></tr>`).join('')}
      </tbody></table>
      <p class="muted small">Practice accuracy × har subject ke average GATE DA marks (2024–26), MCQ negative marking ke saath. 3–9 attempts = "kam data". Jis subject ke 3 se kam attempts hain uske liye tumhari overall accuracy maani gayi hai ("assumed"). Ye sirf direction batata hai — asli readiness fresh 180-min mocks se hi pata chalegi.</p>
    </section>`;
}

function sessionSkillsCount(day) {
  return Object.values(content.skills).filter((s) => (s.days || []).includes(day.day)).length;
}

// Theory ids taught on this day (checkpoint days list every topic of the week).
function dayTheories(day) {
  return [...new Set(Object.values(content.skills)
    .filter((x) => (x.days || []).includes(day.day) && x.theory).map((x) => x.theory))];
}

// "Pehle samjho": the detailed lessons for the day, before the questions.
function learnCard(day, st) {
  const ids = dayTheories(day);
  if (!ids.length) return '';
  const review = ids.length > 3;
  return `<section class="card learn">
      <h2>${review ? 'Is hafte ke topics' : 'Pehle samjho'}</h2>
      <p class="muted">${st.done || review
        ? 'Jo topic kamzor lage, uska detailed lesson phir se padho.'
        : 'Topic naya hai ya theory yaad nahi? Pehle detailed lesson padho (~30 min, picture + solved examples), phir session shuru karo. Session ke beech bhi har sawaal pe lesson ka link milega.'}</p>
      <ul class="links">${ids.map((id) => `<li><a href="#/theory/${esc(id)}" data-title="${esc(id)}">${esc(id)}</a>
        <span class="muted small"><a href="#/theory/${esc(id)}/short">short note</a></span></li>`).join('')}</ul>
    </section>`;
}

// Fill lesson titles once the notes are fetched (cached after the first time).
async function fillTitles(root) {
  const tok = viewToken;
  for (const a of root.querySelectorAll('[data-title]')) {
    const id = a.dataset.title;
    const text = (await getDoc('learn', id)) || (await getDoc('theory', id));
    if (tok !== viewToken) return;
    a.textContent = noteTitle(id, text);
  }
}

function startSession(day, opts = {}) {
  if (!opts.reattempt && !opts.revisionOnly) {
    const state = derive();
    // a day not finished yet starts with the Seekho part (question first, theory after)
    opts = { ...opts, carryMs: dayCarry(state, day.day).ms, learn: !dayStatus(state, day.day).done };
  }
  session = newSession(day, opts);
  current = null;
  feedback = null;
  if (location.hash === '#/today') route();
  else location.hash = '#/today';
}

const MODE_LABEL = { review: 'Revision', learn: 'Seekho', diag: 'Brush-up', topic: 'Topic', mixed: 'Mixed', ga: 'GA', repair: 'Repair' };
const PART_OF_MODE = { review: 'review', learn: 'learn', diag: 'topic', topic: 'topic', mixed: 'mixed', ga: 'ga', repair: null };

// "Atak gaye?": up to three nudges, mildest first. Using one marks the answer as not yet yours.
function hintSteps(q, skill, formula = '') {
  const lesson = skill.theory ? `<b>Theory:</b> <a href="${lessonHref(q, skill)}" target="_blank" rel="noopener">lesson ka wahi hissa kholo ↗</a> (naye tab me)` : '';
  // hints written for this exact question
  if (q.hints) {
    return [
      `<b>Kya notice karo:</b> ${md(q.hints[0], true)}`,
      `<b>Setup / formula:</b> ${md(q.hints[1], true)}`,
      `<b>Pehla step:</b> ${md(q.hints[2], true)}`,
      lesson,
    ].filter(Boolean);
  }
  const tip = q.type === 'MSQ'
    ? 'Har option ko alag se ek simple example pe check karo — "lagta hai" pe mat chuno.'
    : q.type === 'NAT'
      ? 'Sabse simple case ya chhote numbers pe pehle try karo, phir asli numbers.'
      : 'Jo option kisi simple case pe fail ho, use cut karo.';
  return [
    `<b>Concept:</b> ${esc(skill.title || q.skill)}. ${tip}`,
    formula,
    skill.check ? `<b>Method:</b> ${md(skill.check, true)}` : '',
    skill.theory ? `<b>Theory:</b> <a href="${lessonHref(q, skill)}" target="_blank" rel="noopener">lesson ka wahi hissa kholo ↗</a> (naye tab me)` : '',
  ].filter(Boolean);
}

const FORMULA_PIN = {
  'db.er-tables': /^Minimum tables =|^1:1 with total/,
  'db.keys': /^PK: unique|^Entity integrity/,
  'calc.derivative-rules': /^Rules: |^\$\\frac\{d\^n\}/,
  'la.eig-trace-det': /Use both to find missing eigenvalues/,
  'la.rank-one': /^Rank one \$uv\^T\$|uv\^T\$: \$v\^Tu\$/,
  'ml.leakage': /^\*\*Leakage\*\*|^Fit scalers/,
};

// The formulas this question needs: the short note's lines (core ideas, shortcuts, recall) that
// best match the skill and the question, else the display equations of the matching lesson step.
async function formulaFor(q, skill) {
  if (!skill.theory) return '';
  const [note, lesson] = await Promise.all([getDoc('theory', skill.theory), getDoc('learn', skill.theory)]);
  // the skill's own words decide; the question's words only break ties
  const key = new Map();
  [[skill.title, 3], [skill.check, 2]].forEach(([t, w]) => words(t).forEach((x) => key.set(x, Math.max(key.get(x) || 0, w))));
  const stem = new Set(words(q.stem));
  let picked = [];
  let label = 'Formula';
  if (note) {
    let section = '';
    const cand = [];
    for (const raw of note.split('\n')) {
      const l = raw.trim();
      if (l.startsWith('## ')) { section = l; continue; }
      if (FORMULA_PIN[skill.id]) break; // pinned lines are used instead
      if (/Traps/i.test(section)) continue;
      let text = '';
      if (/^[-*]\s|^\d+\.\s/.test(l)) text = l.replace(/^([-*]|\d+\.)\s+/, '');
      else if (l.startsWith('|') && !/^\|[\s:|-]+\|$/.test(l) && !/^\|\s*(Given|Situation|Case)\b/i.test(l)) text = l.split('|').map((c) => c.trim()).filter(Boolean).join(' → ');
      if (!text) continue;
      const ws = new Set(words(text));
      let own = 0;
      for (const [t, w] of key) if (ws.has(t)) own += w;
      let tie = 0;
      for (const t of stem) if (ws.has(t)) tie += 0.3;
      if (own >= 3) cand.push({ text, s: own + Math.min(tie, 2), math: text.includes('$') });
    }
    const take = (list) => {
      const out = [];
      for (const c of list.sort((a, b) => b.s - a.s)) if (out.length < 2 && !out.includes(c.text)) out.push(c.text);
      return out;
    };
    // a few skills whose key line uses other words than the skill title
    const pin = FORMULA_PIN[skill.id];
    if (pin) {
      for (const raw of note.split('\n')) {
        const t = raw.trim().replace(/^([-*]|\d+\.)\s+/, '');
        if (pin.test(t) && !picked.includes(t) && picked.length < 2) picked.push(t);
      }
      if (picked.length) cand.length = 0;
      if (!picked.some((t) => t.includes('$'))) label = 'Yaad rakho';
    }
    if (!picked.length) picked = take(cand.filter((c) => c.math));
    // topics without formulas (SQL, Python, GA) get their key rule instead
    if (!picked.length) {
      picked = take(cand.filter((c) => c.s >= 5));
      label = 'Yaad rakho';
    }
  }
  if (!picked.length && lesson) {
    const art = document.createElement('article');
    art.innerHTML = md(lesson);
    const block = matchLessonBlock(art, q.id);
    const eqs = block ? block.els.map((e) => e.textContent).join(' ').match(/\$\$[\s\S]+?\$\$/g) || [] : [];
    picked.push(...eqs.slice(0, 2));
    label = 'Formula';
  }
  return picked.length ? `<b>${label}:</b><ul class="fhint">${picked.map((l) => `<li>${md(l, true)}</li>`).join('')}</ul>` : '';
}

// Lines for the 10-second check before submitting, led by the student's own most common traps.
const CHECKS = {
  C1: 'Koi condition chhooti to nahi? "Always / sirf tab" wale claim dobara padho.',
  C2: 'Do jodi wali cheezein ulti to nahi kar di (∪/∩, α/β, single/complete)?',
  C3: 'Formula wahi lagaya jo sawaal maang raha hai, paas wala nahi?',
  C4: 'Square ya root? (variance vs SD, ‖v‖ vs ‖v‖², λ vs 1/λ)',
  C5: 'Boundary: < ya ≤? Endpoints shamil hain ya nahi?',
  C6: 'Ginti dobara: off-by-one, ya koi step adhoora to nahi?',
  C7: 'Given kya hai — P(A|B) ya P(B|A)? Independence maani to sahi hai?',
  C8: 'Kya ye cheez sach me possible hai? "Hamesha" wale options pe ek counter-example socho.',
  C9: 'Property sahi object pe lagayi (data structure / model / Python rule)?',
  C10: 'Dekhne me same lag raha hai, par sawaal alag to nahi?',
  C11: 'Sign aur direction sahi hai (+/−, increase/decrease)?',
};

function checkLines(q, state) {
  const counts = {};
  for (const a of state.attempts) for (const t of a.traps || []) counts[t] = (counts[t] || 0) + 1;
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([c]) => c);
  const codes = [...new Set([...top, 'C4', 'C6'])].filter((c) => CHECKS[c]).slice(0, 2);
  return [
    'Sawaal <b>kya maang raha hai</b> — maine wahi nikala (distance ya distance², count ya probability)?',
    ...codes.map((c) => esc(CHECKS[c])),
    ...(q.type === 'NAT' ? [`Format: ${esc(natHint(q))}.`] : []),
  ];
}

const STUCK = {
  concept: 'Concept pehchana nahi',
  setup: 'Setup nahi bana',
  last: 'Aakhri step / calculation',
  read: 'Padhne me galti',
  unknown: 'Pata hi nahi tha',
};

// The question that was on screen before a reload or a look at a past attempt, if still unanswered.
function restoreCurrent(state) {
  const c = session.cur;
  if (!c || !content.questions[c.qid]) return null;
  if (sessionAttempts(session, state).some((a) => a.qid === c.qid)) return null;
  return { q: content.questions[c.qid], skill: c.skill, mode: c.mode, label: c.label, repeated: c.repeated, hints: c.hints || 0, shownAt: Date.now() };
}

// Progress of each part in the chosen order, e.g. "Revision 3/10 · Topic 0/14 · Mixed 0/6 · GA 0/8".
function partProgress(state, counts, t) {
  const leftDue = Math.max(0, Math.min(
    dueCards(state).filter((c) => !counts.reviewedToday.has(c.skill)).length,
    session.reviewCap - counts.review,
  ));
  const parts = {
    review: [counts.review, counts.review + leftDue],
    learn: [counts.learn, session.base.learn || 0],
    topic: [counts.topic, t.topic],
    mixed: [counts.mixed, t.mixed],
    ga: [counts.ga, t.ga],
  };
  const order = session.mode === 'revision' ? ['review'] : session.shownOrder || session.order || ['review', 'topic', 'mixed', 'ga'];
  const on = current ? PART_OF_MODE[current.mode] : null;
  const switchable = session.mode !== 'revision';
  // each part is a one-tap switcher: the tapped part's questions come next
  return order
    .filter((p) => parts[p] && (parts[p][1] > 0 || parts[p][0] > 0))
    .map((p) => {
      const fin = parts[p][0] >= parts[p][1];
      const label = `${MODE_LABEL[p]} ${parts[p][0]}/${parts[p][1]}`;
      if (!switchable) return `<span class="pt ${p === on ? 'on' : fin ? 'fin' : ''}">${label}</span>`;
      return `<button type="button" class="pt ${p === on ? 'on' : fin ? 'fin' : ''}" data-part="${p}" ${fin && p !== on ? 'disabled' : ''}
        aria-pressed="${p === on}" title="${fin ? `${MODE_LABEL[p]} ho gaya` : p === on ? 'Abhi yahi chal raha hai' : `${MODE_LABEL[p]} pe switch karo`}">${fin ? '✓ ' : ''}${label}</button>`;
    })
    .join('') + (counts.repair ? `<span class="pt">+${counts.repair} repair</span>` : '');
}

// Tap a part in the session bar: its questions come next. An unanswered question of another
// part is put back (it was never recorded); a pending repair still comes first.
function switchPart(part) {
  if (!session || session.mode === 'revision') return;
  const order = session.order || Object.keys(PARTS);
  session.shownOrder = session.shownOrder || order; // chips keep their places in the bar
  session.order = [part, ...order.filter((p) => p !== part)];
  const onRepair = current && current.mode === 'repair';
  if (current && !feedback && !onRepair && PART_OF_MODE[current.mode] !== part) {
    current = null;
    session.cur = null;
    session.sel = null;
  }
  session.switchNote = onRepair && !feedback ? `Pehle ye repair variant, phir ${MODE_LABEL[part]}.` : '';
  saveSession(session);
  renderSession(derive());
}

function stopSession() {
  if (!confirm('Aaj ke naye sawaal yahin band karein? Abhi tak ka kaam save hai; bache hue repair kal revision me aayenge.')) return;
  session.stopped = true;
  session.repairQueue = [];
  session.cur = null;
  current = null;
  feedback = null;
  saveSession(session);
  route();
}

function renderSession(state) {
  if (!current) {
    const restored = restoreCurrent(state);
    const it = restored || nextItem(session, state);
    current = it ? { ...it, shownAt: it.shownAt || Date.now() } : null;
    feedback = null;
    session.cur = current ? { qid: current.q.id, skill: current.skill, mode: current.mode, label: current.label, repeated: current.repeated, hints: current.hints || 0 } : null;
    if (!restored) session.sel = null;
    saveSession(session);
  }
  if (!current) return renderEnd(state);
  const counts = sessionCounts(session, state);
  const t = targets(session, counts);
  const q = current.q;
  const skill = content.skills[q.skill] || {};
  const done = sessionAttempts(session, state);
  const last = done[done.length - 1];
  const isMsq = q.type === 'MSQ';
  const shown = !!feedback;

  set(`
    <div class="sessionbar">
      <span class="sb-day">Day ${session.day}${session.mode === 'fallback' ? ' · fallback' : session.mode === 'revision' ? ' · revision' : ''}${session.reattempt ? ' · ↻' : ''}</span>
      <span class="sb-parts">${partProgress(state, counts, t)}</span>
      <span class="sb-links">${last ? `<a class="link" href="#/attempt/${esc(last.id)}">← Pichhle sawaal (${done.length})</a>` : ''}<button class="link" id="stop">Din band karo</button></span>
      <details class="sb-more"><summary aria-label="Aur options">⋯</summary><div>
        ${last ? `<a class="button" href="#/attempt/${esc(last.id)}">← Pichhle sawaal (${done.length})</a>` : ''}
        <button type="button" id="stop2">Din band karo</button>
      </div></details>
    </div>
    ${t.note ? `<div class="banner">${esc(t.note)}</div>` : ''}
    ${session.switchNote && current.mode === 'repair' ? `<div class="banner">${esc(session.switchNote)}</div>` : ''}
    <section class="card q">
      <div class="eyebrow">${esc(current.label)}${shown ? ` · ${esc(skill.title || q.skill)}` : ''}</div>
      <div class="meta"><span>[${esc(q.source || 'Drill')}]</span><span class="qtype ${isMsq ? 'msq' : ''}">${q.type} · ${q.marks} mark${q.marks > 1 ? 's' : ''}</span>${current.repeated ? '<span class="hot">repeat · fresh evidence nahi</span>' : ''}</div>
      <div class="stem">${md(q.stem)}</div>
      ${q.figure ? `<div class="figure">${q.figure}</div>` : ''}
      <form id="answer" autocomplete="off">
        ${q.type === 'NAT'
          ? `<label class="nat"><span>Answer <span class="muted small">· ${esc(natHint(q))}</span></span><input id="nat" inputmode="decimal" placeholder="Ek number" ${shown ? 'disabled' : ''}></label>`
          : `<div class="opts">${q.options.map((o, i) => `
              <label class="opt ${isMsq ? 'msq' : ''}" data-i="${i}">
                <input class="vh" type="${isMsq ? 'checkbox' : 'radio'}" name="opt" value="${i}" ${shown ? 'disabled' : ''}>
                <span class="key">${'ABCD'[i]}</span><span class="otext">${md(bigFrac(o.text), true)}</span>
              </label>`).join('')}</div>`}
        ${isMsq ? '<p class="hint"><b>MSQ:</b> ek ya zyada sahi. Poora exact set chahiye, partial marks nahi.</p>' : ''}
        <div class="conf" ${shown ? 'hidden' : ''} role="radiogroup" aria-label="Confidence">
          <span>Confidence:</span>
          ${['Sure', 'Likely', 'Guess'].map((c) => `<label><input class="vh" type="radio" name="conf" value="${c}"> ${c}</label>`).join('')}
        </div>
        <div class="err" id="err" role="alert"></div>
        ${shown ? '' : `<p class="hint keys">Keyboard: ${q.type === 'NAT' ? 'number likho' : `1–4 ya A–D${isMsq ? ' (toggle)' : ''}`} · S / L / G confidence · Enter = submit, phir Enter = next</p>`}
        ${shown ? '' : `<div class="hintbox">
          <div class="hintrow"><button type="button" class="link" id="hintbtn">💡 Atak gaye? Ek ishara lo</button>
            ${skill.theory ? `<a class="small" href="${lessonHref(q, skill)}" target="_blank" rel="noopener">📖 Is sawaal wala lesson ka hissa ↗</a>` : ''}</div>
          <ol class="hints" id="hints"></ol></div>
          <div class="precheck" id="precheck" hidden></div>`}
      </form>
      <div id="fb"></div>
    </section>
    <div class="actionbar">${shown
      ? '<button class="primary" type="button" id="next">Next →</button>'
      : '<button class="primary" type="submit" form="answer" id="submitbtn">Submit</button>'}</div>
  `);

  document.getElementById('stop').onclick = stopSession;
  document.getElementById('stop2').onclick = stopSession;
  main.querySelectorAll('.sb-parts [data-part]').forEach((b) => { b.onclick = () => switchPart(b.dataset.part); });
  const onChip = main.querySelector('.sb-parts .pt.on'); // keep the running part visible in the phone's scroll row
  if (onChip) onChip.parentElement.scrollLeft = onChip.offsetLeft - onChip.parentElement.offsetLeft - 8;
  if (shown) return renderFeedback();

  const form = document.getElementById('answer');
  if (session.sel) {
    if (q.type === 'NAT') document.getElementById('nat').value = session.sel.v ?? '';
    else form.querySelectorAll('input[name=opt]').forEach((x) => { x.checked = (session.sel.v || []).includes(Number(x.value)); });
    const c = session.sel.conf && form.querySelector(`input[name=conf][value=${session.sel.conf}]`);
    if (c) c.checked = true;
  }
  const remember = () => {
    document.getElementById('err').textContent = '';
    session.sel = readForm(q);
    saveSession(session);
  };
  form.addEventListener('change', remember);
  form.addEventListener('input', remember);

  // hints: one more nudge per tap; the count is kept with the question across reloads
  let steps = hintSteps(q, skill);
  const hintBtn = document.getElementById('hintbtn');
  const showHints = () => {
    const n = current.hints || 0;
    document.getElementById('hints').innerHTML = steps.slice(0, n).map((h) => `<li>${h}</li>`).join('');
    typeset(document.getElementById('hints'));
    hintBtn.hidden = n >= steps.length;
    hintBtn.classList.remove('nudge');
    hintBtn.textContent = n ? '💡 Ek aur ishara' : '💡 Atak gaye? Ek ishara lo';
  };
  hintBtn.onclick = () => {
    current.hints = Math.min(steps.length, (current.hints || 0) + 1);
    if (session.cur) session.cur.hints = current.hints;
    saveSession(session);
    showHints();
  };
  if (current.hints) showHints();
  // the formula step comes from the notes (cached after the first fetch)
  const forQ = current;
  if (!q.hints) formulaFor(q, skill).then((fh) => {
    if (current !== forQ || feedback || !fh) return;
    steps = hintSteps(q, skill, fh);
    if (current.hints) showHints();
  });

  form.onsubmit = (ev) => {
    ev.preventDefault();
    const err = document.getElementById('err');
    const { v: resp, conf } = readForm(q);
    if (q.type !== 'NAT' && !resp.length) return (err.textContent = 'Pehle koi option chuno.');
    if (q.type === 'NAT' && !String(resp).trim()) return (err.textContent = 'Pehle answer likho.');
    if (!conf) return (err.textContent = 'Confidence chuno: Sure, Likely ya Guess (S / L / G).');
    // 10-second check on NAT and 2-mark questions: the first Submit shows it, the second submits
    if ((q.type === 'NAT' || q.marks === 2) && current.mode !== 'learn' && !current.checked) {
      current.checked = true;
      const box = document.getElementById('precheck');
      box.innerHTML = `<b>10-second check:</b><ul>${checkLines(q, derive()).map((l) => `<li>${l}</li>`).join('')}</ul>
        <span class="muted small">Sab theek? Submit dobara dabao (ya Enter). Kuch galat dikhe toh pehle answer badlo.</span>`;
      box.hidden = false;
      document.getElementById('submitbtn').textContent = 'Haan, check kiya — Submit';
      box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      return;
    }
    const out = submit(session, current, resp, conf, Date.now() - current.shownAt);
    if (!out.valid) {
      err.textContent = String(resp).includes(',')
        ? 'Comma nahi — decimal ke liye point (.) use karo, jaise 0.25.'
        : 'GATE NAT me sirf ek number jaata hai (range, fraction ya expression nahi).';
      return;
    }
    feedback = { ...out, resp, conf };
    session.cur = null;
    session.sel = null;
    saveSession(session);
    renderSession(derive());
  };
  if (q.type === 'NAT') document.getElementById('nat').focus({ preventScroll: true });
}

function readForm(q) {
  const conf = (document.querySelector('input[name=conf]:checked') || {}).value;
  const v = q.type === 'NAT'
    ? document.getElementById('nat').value
    : [...document.querySelectorAll('input[name=opt]:checked')].map((x) => Number(x.value));
  return { v, conf };
}

// Inline \frac renders tiny inside options; display-style fractions are easier to read.
function bigFrac(text) {
  return String(text).replace(/\\frac/g, '\\dfrac');
}

function renderFeedback() {
  const q = current.q;
  const f = feedback;
  const skill = content.skills[q.skill] || {};
  let detail = '';
  if (q.type === 'NAT') {
    document.getElementById('nat').value = f.resp;
    detail = `<p>Tumhara answer: <b>${esc(f.resp)}</b> · Sahi: <b>${esc(q.answer.value)}</b>${q.answer.tol ? ` (± ${q.answer.tol})` : ''}</p>
      ${f.trap ? `<div class="why bad"><b>Ye galti lag rahi hai:</b> ${md(f.trap.why, true)}</div>` : ''}`;
  } else {
    document.querySelectorAll('.opt').forEach((el) => {
      const i = Number(el.dataset.i);
      const o = q.options[i];
      const picked = f.resp.includes(i);
      el.querySelector('input').checked = picked;
      el.classList.add(o.correct ? 'right' : picked ? 'wrong' : 'plain');
    });
    detail = q.options.map((o, i) => {
      const picked = f.resp.includes(i);
      if (q.type === 'MCQ' && !picked && !o.correct) return '';
      if (q.type === 'MSQ') {
        const t = o.correct ? (picked ? '✓ chuna, sahi' : '✗ chhoot gaya (ye sahi tha)') : picked ? '✗ chuna, galat' : '✓ nahi chuna, theek';
        return `<div class="why ${(o.correct === picked) ? 'good' : 'bad'}"><b>${'ABCD'[i]} — ${t}:</b> ${md(o.why, true)}</div>`;
      }
      const tag = o.correct ? (picked ? '✓ tumne chuna, sahi' : '✓ sahi option') : '✗ tumne chuna';
      return `<div class="why ${o.correct ? 'good' : 'bad'}"><b>${'ABCD'[i]} — ${tag}:</b> ${md(o.why, true)}</div>`;
    }).join('');
  }
  const trapTags = (f.traps || []).map((c) => `<span class="chip hot" title="${esc(c)}">${esc(TRAP_CLASSES[c] || c)}</span>`).join('');
  const learning = current.mode === 'learn';
  const verdict = learning
    ? (f.correct
      ? '<div class="verdict ok">Sahi ✓ — ab neeche dekho ye kyun kaam karta hai.</div>'
      : '<div class="verdict no">Abhi nahi hua — koi baat nahi. Ye seekhne wala sawaal hai, ginti me nahi aata. Neeche ka tukda padho.</div>')
    : f.correct
      ? (f.conf === 'Guess' ? '<div class="verdict ok">Sahi — lekin Guess tha, isliye revision card bana diya.</div>'
        : current.hints ? '<div class="verdict ok">Sahi ✓ — ishara lekar. Revision card bana diya, taaki agli baar bina ishare ke ho.</div>'
          : '<div class="verdict ok">Sahi ✓</div>')
      : `<div class="verdict no">Galat ✗</div>${trapTags ? `<div class="chips">Trap: ${trapTags}</div>` : ''}`;
  const stuck = !f.correct ? `<div class="stuck" id="stuck"><span class="muted small">Kahan atke? (ek tap — isse tumhara pattern banta hai)</span>
      <div class="chips">${Object.entries(STUCK).map(([k, l]) => `<button type="button" class="chip ${f.stuck === k ? 'on' : ''}" data-why="${k}">${l}</button>`).join('')}</div></div>` : '';
  const piece = learning && skill.theory ? '<div class="learnstep" id="learnstep"><p class="muted">Theory ka tukda aa raha hai…</p></div>' : '';
  const next = f.repairQueued
    ? `<p class="banner">Agla sawaal <b>isi skill ka naya variant</b> hoga. Check: ${md(skill.check || '', true)}</p>`
    : f.stopSkill
      ? '<p class="banner warn">Is skill pe aaj ke repair khatam. Ye kal revision me aayegi. Pehle theory dekh lo.</p>'
      : '';
  const theory = (f.showTheory || !f.correct || f.conf === 'Guess') && skill.theory
    ? `<p><a href="${lessonHref(q, skill)}" target="_blank" rel="noopener">📖 Samjho: ${esc(skill.title)} — detailed lesson (naya tab)</a></p>` : '';
  const fb = document.getElementById('fb');
  fb.innerHTML = learning ? `
    ${verdict}
    ${piece}
    ${detail}
    <details><summary>Is sawaal ka poora solution</summary><div class="sol">${md(q.solution)}</div></details>
    ${stuck}` : `
    ${verdict}
    ${stuck}
    ${detail}
    <details ${f.correct ? '' : 'open'}><summary>Solution</summary><div class="sol">${md(q.solution)}</div></details>
    ${next}${theory}`;
  typeset(fb);
  fb.querySelectorAll('#stuck [data-why]').forEach((b) => {
    b.onclick = () => {
      f.stuck = b.dataset.why;
      window.__store.addEvent('stuck', { qid: q.id, skill: q.skill, mode: current.mode, why: f.stuck, day: session.day });
      fb.querySelectorAll('#stuck [data-why]').forEach((x) => x.classList.toggle('on', x === b));
    };
  });
  if (piece) showLessonPiece(q, skill);
  const nextBtn = document.getElementById('next');
  nextBtn.onclick = () => {
    current = null;
    feedback = null;
    route();
  };
  fb.querySelector('.verdict')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  nextBtn.focus({ preventScroll: true });
}

function renderEnd(state) {
  const c = sessionCounts(session, state);
  if (session.mode === 'revision') {
    session.ended = true;
    saveSession(session);
    set(`<section class="card"><h1>Revision ho gaya ✓</h1><p>Aaj ${c.review} card dekhe${c.repair ? `, ${c.repair} repair variant` : ''}.</p>
      <div class="actions"><a class="button" href="#/revision">Revision cards</a><a class="button" href="#/today">Today</a></div></section>`);
    session = null;
    return;
  }
  const newCards = Object.values(state.cards).filter((x) => x.opened === session.date).length;
  const short = topicShort(session, state) && !session.reattempt;
  const why = session.stopped ? 'khud band kiya' : timeUp(session) ? 'time cap poora' : 'target poora';
  set(`
    <section class="card">
      <div class="eyebrow">Day ${session.day} · ${why}</div>
      <h1>${session.stopped ? 'Session band' : 'Aaj ke naye sawaal poore'}</h1>
      <div class="stats">
        <div><b>${c.attempts}</b><span>attempts</span></div>
        <div><b>${pct(c.firstPassOk, c.firstPass)}</b><span>first-pass (${c.firstPassOk}/${c.firstPass})</span></div>
        <div><b>${c.review}</b><span>revision</span></div>
        <div><b>${c.repair}</b><span>repair variants</span></div>
        <div><b>${newCards}</b><span>naye cards</span></div>
      </div>
      <form id="log">
        ${short ? `<fieldset class="choice"><legend>Topic part abhi baaki hai (${c.topic}/${session.base.topic}). Is din ko kya maanein?</legend>
          <label><input type="radio" name="dstate" value="partial" checked> ◐ Adhoora — kal yahi din continue karunga</label>
          <label><input type="radio" name="dstate" value="done"> ✓ Done mark karo, aage badho</label></fieldset>` : ''}
        <label>Focused ghante (breaks nahi) <input id="hours" type="number" step="any" min="0" max="16" value="${(session.activeMs / 3600000).toFixed(2)}"></label>
        <fieldset class="anx"><legend>Anxiety (1–5)</legend><div class="pills">
          ${[1, 2, 3, 4, 5].map((n) => `<label><input class="vh" type="radio" name="anx" value="${n}" ${n === 3 ? 'checked' : ''}><span>${n}</span></label>`).join('')}
        </div></fieldset>
        <p class="hint">1 calm · 2 halki nervousness · 3 galti pe frustration, phir wapas · 4 baar baar ruk jaana · 5 aage nahi badh paaye</p>
        <label>Notes (optional) <textarea id="notes" rows="2"></textarea></label>
        <button class="primary" type="submit">Save karke band karo</button>
      </form>
    </section>`);
  document.getElementById('log').onsubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const partial = short && form.dstate.value === 'partial';
    endSession(session, {
      hours: Number(document.getElementById('hours').value) || 0,
      anxiety: Number(form.anx.value),
      notes: document.getElementById('notes').value.trim(),
      partial,
    });
    const closedDay = session.day;
    session = null;
    sync();
    set(`<section class="card"><h1>${partial ? `Day ${closedDay} adhoora save hua ◐` : 'Day closed ✓'}</h1>
      <p>${partial ? `Kal Today me yahi Day ${closedDay} khulega, taaki topic part poora ho.` : 'Progress save ho gaya. Kal ke due cards Revision tab me dikhenge.'}</p>
      <div class="actions"><a class="button" href="#/day/${closedDay}">Day ${closedDay} ke attempts</a><a class="button" href="#/progress">Progress dekho</a></div></section>`);
  };
}

// Read-only review of one past attempt: your answer, every option's explanation, solution, prev/next.
function viewAttempt(id) {
  const state = derive();
  const a = state.attempts.find((x) => x.id === id);
  const q = a && content.questions[a.qid];
  if (!q) return set('<section class="card"><h1>Attempt nahi mila</h1><a class="button" href="#/days">All days</a></section>');
  const skill = content.skills[q.skill] || {};
  const siblings = state.attempts.filter((x) => (a.sid ? x.sid === a.sid : x.date === a.date && x.day === a.day));
  const i = siblings.findIndex((x) => x.id === id);
  const prev = siblings[i - 1];
  const next = siblings[i + 1];
  const running = activeSession();
  const back = running && a.sid === running.sid ? '<a class="button primary-link" href="#/today">Session pe wapas →</a>' : `<a class="button" href="#/day/${a.day}">Day ${a.day} pe wapas</a>`;
  const resp = Array.isArray(a.resp) ? a.resp : [];
  let body = '';
  if (q.type === 'NAT') {
    const trap = (q.traps || []).find((t) => Number(a.resp) === t.value);
    body = `<p>Tumhara answer: <b>${esc(a.resp)}</b> · Sahi: <b>${esc(q.answer.value)}</b>${q.answer.tol ? ` (± ${q.answer.tol})` : ''}</p>
      ${trap ? `<div class="why bad"><b>Ye galti lag rahi hai:</b> ${md(trap.why, true)}</div>` : ''}`;
  } else {
    body = `<div class="opts">${q.options.map((o, k) => {
      const picked = resp.includes(k);
      const cls = o.correct ? 'right' : picked ? 'wrong' : 'plain';
      const tag = o.correct ? (picked ? '✓ tumne chuna, sahi' : '✓ sahi tha') : picked ? '✗ tumne chuna' : '';
      return `<div class="opt ${cls} ${q.type === 'MSQ' ? 'msq' : ''}"><span class="key">${'ABCD'[k]}</span><span class="otext">${md(bigFrac(o.text), true)}
          <div class="why ${o.correct ? 'good' : picked ? 'bad' : ''}">${tag ? `<b>${tag}:</b> ` : ''}${md(o.why, true)}${!o.correct && o.trap ? ` <span class="muted small">· ${esc(TRAP_CLASSES[o.trap] || o.trap)}</span>` : ''}</div></span></div>`;
    }).join('')}</div>`;
  }
  const trapTags = (a.traps || []).map((c) => `<span class="chip hot" title="${esc(c)}">${esc(TRAP_CLASSES[c] || c)}</span>`).join('');
  set(`
    <div class="sessionbar">
      ${prev ? `<a class="link" href="#/attempt/${esc(prev.id)}" id="prevA">← Pichla</a>` : ''}
      <span>${i + 1} / ${siblings.length}</span>
      ${next ? `<a class="link" href="#/attempt/${esc(next.id)}" id="nextA">Agla →</a>` : ''}
      <span class="muted small hidem">← → keys bhi chalti hain</span>
    </div>
    <section class="card q">
      <div class="eyebrow">Day ${a.day} · ${fmtDate(a.date)} · ${esc(a.mode)} · ${esc(skill.title || q.skill)}</div>
      <div class="meta">[${esc(q.source || 'Drill')}] · ${q.type} · ${q.marks} mark${q.marks > 1 ? 's' : ''} · ${a.conf ? `confidence ${esc(a.conf)}` : a.mode === 'mock' ? (a.skipped ? 'mock · chhoda' : 'mock') : ''} · ${Math.round((a.ms || 0) / 1000)} s${a.repeated ? ' · repeat' : ''}</div>
      <div class="verdict ${a.correct ? 'ok' : 'no'}" style="border-top:0;padding-top:0;margin-top:0">${a.correct ? 'Sahi ✓' : 'Galat ✗'}</div>
      ${trapTags ? `<div class="chips">Trap: ${trapTags}</div>` : ''}
      <div class="stem">${md(q.stem)}</div>
      ${q.figure ? `<div class="figure">${q.figure}</div>` : ''}
      ${body}
      <details open><summary>Solution</summary><div class="sol">${md(q.solution)}</div></details>
      ${skill.theory ? `<p><a href="${lessonHref(q, skill)}">📖 ${esc(skill.title)} — lesson ka wahi hissa</a></p>` : ''}
      <div class="actions">${back}</div>
    </section>`);
}

// Every plan day in one scrollable list, plus where Fallback was used.
function viewDays() {
  const state = derive();
  const ps = planStatus(state);
  const all = content.plan.days.map((d) => ({ d, st: dayStatus(state, d.day) }));
  const fb = all.filter((x) => x.st.fallback);
  const re = all.filter((x) => x.st.reattempts);
  set(`
    <section class="card">
      <h1>All days</h1>
      <div class="stats">
        <div><b>${ps.doneCount}/${ps.total}</b><span>din poore</span></div>
        <div><b>${fb.length}</b><span>Fallback wale din</span></div>
        <div><b>${re.reduce((t, x) => t + x.st.reattempts, 0)}</b><span>re-attempts</span></div>
      </div>
      ${fb.length ? `<p><b>Fallback use hua:</b> ${fb.map((x) => `<a href="#/day/${x.d.day}">Day ${x.d.day}</a>`).join(', ')}</p>` : '<p class="muted">Abhi tak koi Fallback din nahi.</p>'}
      <p class="muted small">✓ done · <b>F</b> fallback use hua · ↻ re-attempt · peela = full mock</p>
    </section>
    <section class="card">
      <div class="week-nav daylist">${content.plan.days.map((d) => dayRow(state, d, ps, null)).join('')}</div>
    </section>`);
  const cur = main.querySelector('.daylist .week.current');
  if (cur) cur.scrollIntoView({ block: 'center' });
}

// Full-mock day: the in-app paper (fresh mixed papers) or a score form (official PDFs).
function renderMockDay(day, state, running) {
  const live = loadMock();
  if (live && live.day === day.day) return showExam(live);
  if (day.officialPaperYear) return renderMockForm(day, false);
  const past = state.mocks.filter((m) => m.day === day.day);
  const share = mockShare(day.day);
  const done = !!state.dayLogs[day.day];
  set(`
    <section class="card hero">
      <div class="eyebrow">Day ${day.day} · Full mock · ${day.date ? `planned ${fmtDate(day.date)}` : ''}</div>
      <h1>${esc(day.title)}</h1>
      ${running ? `<div class="banner warn">Day ${running.day} ka session abhi chal raha hai. <a href="#/today"><b>Pehle use band karo</b></a> — mock ek baar me, akele.</div>` : ''}
      <div class="chips"><span class="chip">65 sawaal</span><span class="chip">100 marks</span><span class="chip">${MOCK_MIN} min</span>
        <span class="chip">GA 10 sawaal · 15 marks</span><span class="chip">Technical 55 sawaal · 85 marks</span></div>
      <p><b>Paper me kya hai:</b> ${share.map((s) => `${esc(s.name)} ~${s.marks}`).join(' · ')} · General Aptitude 15
        <br><span class="muted small">Sirf Day ${day.day} se pehle padhe subjects. Baaki subjects aage ke mocks me judenge.</span></p>
      <ol class="flow">
        <li>Ek baar me ${MOCK_MIN} min, asli exam ki tarah. Mock ke dauraan app ke baaki pages band rehte hain.</li>
        <li>Pattern GATE jaisa: pehle GA (Q1–10), phir technical. Har section me pehle 1-mark, phir 2-mark sawaal.</li>
        <li><b>Negative:</b> galat MCQ pe 1-mark me −1/3, 2-mark me −2/3. MSQ aur NAT me negative nahi. MSQ me poora sahi set chahiye.</li>
        <li>Sawaal bank ke wo sawaal hain jo tumne app me abhi tak nahi dekhe.</li>
        <li>Refresh ya tab band hone pe bhi answers save rehte hain. <b>⏸ Pause</b> se timer rukta hai aur paper sync ho jaata hai — doosre device pe wahi se continue kar sakte ho. Asli exam me pause nahi hota, isliye kam use karo.</li>
        <li>Submit ke baad: score, subject-wise marks, time kahan gaya, aur har sawaal ka explanation. Galat sawaal revision cards me jaate hain.</li>
      </ol>
      <div class="actions">
        <button class="primary" id="mstart" ${running ? 'disabled' : ''}>${done ? 'Naya mock paper do' : 'Mock shuru karo'}</button>
      </div>
    </section>
    ${past.length ? `<section class="card"><h2>Pichhle attempts</h2><ul class="links">${past.slice().reverse().map((m) => `<li>${fmtDate(m.date)} · <b>${m.net}/${m.max || 100}</b> · ${m.correct} sahi, ${m.attempted - m.correct} galat
      ${m.sid ? ` · <a href="#/mock/${esc(m.sid)}">result dekho</a>` : ` <span class="muted small">(${esc(m.source || 'manual')})</span>`}</li>`).join('')}</ul></section>` : ''}
    <section class="card"><details><summary>Bahar ka paper diya? Score yahan likho</summary><div id="manualmock"></div></details></section>`);
  document.getElementById('mstart').onclick = () => {
    if (!confirm(`Mock shuru karein? ${MOCK_MIN} min ka timer turant chalega.`)) return;
    showExam(startMock(day));
  };
  renderMockForm(day, true);
}

function renderMockForm(day, embedded) {
  const form = `
      <form id="mock" class="grid2">
        <label>Source <input id="src" value="${day.officialPaperYear ? `GATE DA ${day.officialPaperYear}` : ''}"></label>
        <label>Fresh (pehle nahi dekha)? <select id="fresh"><option value="0" ${day.officialPaperYear ? 'selected' : ''}>No</option><option value="1" ${day.officialPaperYear ? '' : 'selected'}>Yes</option></select></label>
        <label>Net marks /100 <input id="net" type="number" step="any"></label>
        <label>Attempted <input id="att" type="number"></label>
        <label>Correct <input id="cor" type="number"></label>
        <label>Negative marks <input id="neg" type="number" step="any" min="0"></label>
        <label>Anxiety 1–5 <input id="anx" type="number" min="1" max="5" value="3"></label>
        <label>Hours <input id="hrs" type="number" step="any" min="0" value="4.5"></label>
        <label class="span2">Time loss / selection errors / notes <textarea id="notes" rows="3"></textarea></label>
        <button class="primary span2" type="submit">Mock save karo</button>
      </form>`;
  if (embedded) document.getElementById('manualmock').innerHTML = form;
  else {
    set(`
    <section class="card hero">
      <div class="eyebrow">Day ${day.day} · Full mock · ${fmtDate(day.date)}</div>
      <h1>${esc(day.title)}</h1>
      <ol class="flow">
        <li>180 min, exam conditions, ek baar me. Regular blocks aaj nahi.</li>
        <li>Official GATE DA ${day.officialPaperYear} paper (PDF tumhare paas hai). Ye paper partially exposed hai — fresh evidence me nahi ginega.</li>
        <li>~75 min scoring aur triage, 15 min log.</li>
      </ol>
      ${form}
    </section>`);
  }
  document.getElementById('mock').onsubmit = (ev) => {
    ev.preventDefault();
    const v = (id) => document.getElementById(id).value;
    const { addEvent } = window.__store;
    addEvent('mock', {
      day: day.day, date: today(), source: v('src'), fresh: v('fresh') === '1', net: Number(v('net')),
      attempted: Number(v('att')), correct: Number(v('cor')), negative: Number(v('neg')), notes: v('notes'),
    });
    addEvent('daylog', { day: day.day, date: today(), hours: Number(v('hrs')), anxiety: Number(v('anx')), notes: v('notes'), mode: 'mock' });
    sync();
    route();
  };
}

// ---------- revision ----------

function viewRevision() {
  const state = derive();
  const due = dueCards(state);
  const all = Object.values(state.cards).sort((a, b) => a.due.localeCompare(b.due));
  const active = all.filter((c) => !c.mastered);
  const mastered = all.filter((c) => c.mastered);
  const row = (c) => {
    const s = content.skills[c.skill] || { title: c.skill, subject: '' };
    const has = content.bySkill[c.skill]?.length;
    return `<tr class="${c.due <= today() && !c.mastered ? 'due' : ''}">
      <td><b>${esc(s.title)}</b><div class="muted small">${esc(s.subject)}${s.check ? ' · ' + esc(s.check) : ''}</div></td>
      <td>${c.mastered ? 'mastered' : `${c.passes}/${MASTERED_AFTER}`}</td>
      <td>${c.failures}</td>
      <td>${c.mastered ? '—' : fmtDate(c.due)}${has ? '' : ' <span class="muted small">(sawaal pending)</span>'}</td>
      <td>${s.theory ? `<a href="#/theory/${esc(s.theory)}">theory</a>` : ''}</td></tr>`;
  };
  set(`
    <section class="card">
      <h1>Revision cards</h1>
      <p class="muted">Har card ek skill hai. Gap: ${INTERVALS.join(', ')} din. Fail ya Guess → 1 din. ${MASTERED_AFTER} pass lagatar → mastered. Card hamesha naye variant se check hota hai.</p>
      <div class="stats">
        <div><b>${due.length}</b><span>aaj due</span></div>
        <div><b>${active.length}</b><span>active</span></div>
        <div><b>${mastered.length}</b><span>mastered</span></div>
      </div>
      ${activeSession() ? `<div class="banner warn">Day ${session.day} ka session abhi chal raha hai. <a href="#/today"><b>Wahi continue karo</b></a> — usme bhi revision cards aate hain. Ek time pe ek hi session.</div>` : ''}
      <button class="primary" id="rev" ${due.length && !activeSession() ? '' : 'disabled'}>Sirf revision karo (max 10, 45 min)</button>
    </section>
    <section class="card">
      <table class="tbl"><thead><tr><th>Skill</th><th>Pass</th><th>Fails</th><th>Due</th><th></th></tr></thead>
      <tbody>${active.map(row).join('') || '<tr><td colspan="5" class="muted">Abhi koi card nahi.</td></tr>'}</tbody></table>
      ${mastered.length ? `<details><summary>Mastered (${mastered.length})</summary><table class="tbl"><tbody>${mastered.map(row).join('')}</tbody></table></details>` : ''}
    </section>`);
  document.getElementById('rev').onclick = () => {
    if (activeSession()) return;
    const ps = planStatus(state);
    session = newSession(ps.current, { revisionOnly: true });
    current = null;
    location.hash = '#/today';
  };
}

// ---------- theory & recall ----------

const AREA_NAMES = {
  ps: 'Probability & Statistics', la: 'Linear Algebra', calc: 'Calculus & Optimization', py: 'Python',
  dsa: 'Data Structures & Algorithms', db: 'Databases & Warehousing', ml: 'Machine Learning', ai: 'Artificial Intelligence',
  ga: 'General Aptitude',
};

function theoryIndex() {
  const byArea = {};
  for (const s of Object.values(content.skills)) {
    if (!s.theory) continue;
    const list = (byArea[s.area] ||= new Map());
    if (!list.has(s.theory)) list.set(s.theory, { id: s.theory, days: new Set(), skills: [] });
    const e = list.get(s.theory);
    (s.days || []).forEach((d) => e.days.add(d));
    e.skills.push(s.title);
  }
  return byArea;
}

// Short notes (data/theory) and detailed lessons (data/learn) are fetched once per visit.
const docCache = new Map();

function getDoc(kind, id) {
  const key = `${kind}/${id}`;
  // the promise is cached, so two renders at once share one download
  if (!docCache.has(key)) {
    docCache.set(key, fetch(`data/${key}.md`, { cache: 'no-cache' })
      .then((r) => (r.ok ? r.text() : null)) // a missing lesson is remembered too
      .catch(() => {
        docCache.delete(key); // offline: try again next time
        return null;
      }));
  }
  return docCache.get(key);
}

const getNote = (id) => getDoc('theory', id);

function noteTitle(id, text) {
  return (text && (text.match(/^#\s+(.+)$/m) || [])[1]) || id;
}

function theoryTabs(id, hasLesson, on) {
  const tab = (key, href, label) => `<a role="tab" href="${href}" class="${on === key ? 'on' : ''}" aria-selected="${on === key}">${label}</a>`;
  return `<div class="ltabs" role="tablist">
      ${hasLesson ? tab('steps', `#/theory/${esc(id)}`, 'Step-by-step') + tab('full', `#/theory/${esc(id)}/full`, 'Poora lesson') : ''}
      ${tab('short', `#/theory/${esc(id)}/short`, 'Short note')}
    </div>`;
}

// ---------- step-by-step lesson player ----------
// Built for how this student learns: a small question first (try before reading), then only
// the theory piece that answers it, then "say it in one line" — one step at a time.
// Only the current card is rendered and typeset, so long lessons stay light.

const LS_STEPS = 'gdc.steps';

function stepStore(id, patch) {
  let all = {};
  try { all = JSON.parse(localStorage.getItem(LS_STEPS) || '{}'); } catch {}
  const s = { k: 0, notes: {}, ...(all[id] || {}) };
  if (!patch) return s;
  all[id] = { ...s, ...patch };
  try { localStorage.setItem(LS_STEPS, JSON.stringify(all)); } catch {}
  return all[id];
}

const lessonCache = new Map(); // id -> parsed lesson (parsed once per visit)

function parseLesson(id, text) {
  if (lessonCache.has(id)) return lessonCache.get(id);
  const art = document.createElement('article');
  art.innerHTML = md(text);
  const sections = {};
  const steps = [];
  let sec = '';
  let cur = null;
  for (const el of [...art.children]) {
    if (el.tagName === 'H2') { sec = el.textContent.trim(); cur = null; sections[sec] = []; continue; }
    if (el.tagName === 'H3' && /^Concept/i.test(sec)) { cur = { h: el, title: el.textContent.replace(/^\d+\.\s*/, ''), els: [], qs: [] }; steps.push(cur); continue; }
    if (cur) cur.els.push(el);
    else if (sec) sections[sec].push(el);
  }
  const title = art.querySelector('h1')?.textContent || id;
  // each question of this topic goes to the step that teaches it (level 1 first); a step
  // holds at most 3, and an overflow question goes to its next-best step if that fits well
  const qs = Object.values(content.questions)
    .filter((q) => content.skills[q.skill]?.theory === id)
    .sort((a, b) => (a.level || 1) - (b.level || 1));
  const byH = new Map(steps.map((s) => [s.h, s]));
  for (const q of qs) {
    const ranked = rankLessonBlocks(art, q.id).filter((x) => byH.has(x.b.h));
    const top = ranked[0]?.s || 0;
    const pick = ranked.find((x, i) => byH.get(x.b.h).qs.length < 3 && (i === 0 || x.s >= top * 0.85));
    if (pick) byH.get(pick.b.h).qs.push(q);
  }
  const parsed = { title, sections, steps };
  lessonCache.set(id, parsed);
  return parsed;
}

const elsHtml = (els) => els.map((e) => e.outerHTML).join('');

function viewSteps(id, text, days) {
  const L = parseLesson(id, text);
  const n = L.steps.length;
  if (!n) { location.hash = `#/theory/${id}/full`; return; }
  let st = stepStore(id);
  let k = Math.min(st.k, n + 1); // 0 = intro, 1..n = steps, n+1 = summary
  let phase = 'try';
  let qi = 0;
  let res = null;

  const render = () => {
    const dots = Array.from({ length: n + 2 }, (_, i) => `<button type="button" class="sdot ${i === k ? 'on' : i < k ? 'done' : ''}" data-k="${i}" aria-label="${i === 0 ? 'Shuruaat' : i > n ? 'Summary' : `Step ${i}`}"></button>`).join('');
    let body = '';
    if (k === 0) {
      const why = L.sections['Ye topic kyun?'] || [];
      const pic = L.sections['Picture se samjho'] || [];
      body = `<div class="eyebrow">Shuruaat · ${n} chhote steps · har step: pehle ek sawaal, phir theory ka tukda</div>
        <h1>${esc(L.title)}</h1>
        <div class="prose lesson">${elsHtml(why)}</div>
        ${pic.length ? `<details class="pic"><summary>🖼️ Picture se samjho (1–2 min)</summary><div class="prose lesson">${elsHtml(pic)}</div></details>` : ''}
        <div class="actions"><button class="primary" id="snext">Step 1 shuru karo →</button></div>
        <p class="muted small">Har step me pehle bina theory ke try karo — galat hona theek hai, wahi yaad rehta hai. Poora lesson ek saath padhna ho toh "Poora lesson" tab.</p>`;
    } else if (k > n) {
      const notes = L.steps.map((s, i) => ({ s, t: st.notes[i + 1] })).filter((x) => x.t);
      body = `<div class="eyebrow">Ho gaya · ${n}/${n} steps</div>
        <h1>Shabaash 🎉</h1>
        ${notes.length ? `<h2>Tumhare apne shabdon me</h2><ul class="mynotes">${notes.map((x) => `<li><b>${esc(x.s.title)}:</b> ${esc(x.t)}</li>`).join('')}</ul>` : ''}
        <h2>Ek page me</h2><div class="prose lesson">${elsHtml(L.sections['Ek page me'] || [])}</div>
        <div class="actions">
          ${days.length ? `<a class="button primary" href="#/day/${days[0]}">Ab Day ${days[0]} ke sawaal →</a>` : ''}
          <a class="button" href="#/theory/${esc(id)}/short">Short note</a>
          <button type="button" id="sredo">Shuru se dobara</button>
        </div>`;
    } else {
      const s = L.steps[k - 1];
      const q = s.qs[qi];
      const head = `<div class="eyebrow">Step ${k}/${n}</div><h2 class="stitle">${esc(s.title)}</h2>`;
      if (phase === 'try' && q) {
        const isMsq = q.type === 'MSQ';
        body = `${head}
          <div class="trybox">
            <div class="ttag">Pehle khud try karo — theory baad me</div>
            <div class="stem">${md(q.stem)}</div>
            ${q.figure ? `<div class="figure">${q.figure}</div>` : ''}
            <form id="sform" autocomplete="off">
              ${q.type === 'NAT'
                ? `<label class="nat"><span>Answer <span class="muted small">· ${esc(natHint(q))}</span></span><input id="snat" inputmode="decimal" placeholder="Ek number"></label>`
                : `<div class="opts">${q.options.map((o, i) => `<label class="opt ${isMsq ? 'msq' : ''}"><input class="vh" type="${isMsq ? 'checkbox' : 'radio'}" name="sopt" value="${i}"><span class="key">${'ABCD'[i]}</span><span class="otext">${md(bigFrac(o.text), true)}</span></label>`).join('')}</div>`}
              ${isMsq ? '<p class="hint"><b>MSQ:</b> ek ya zyada sahi.</p>' : ''}
              <div class="err" id="serr"></div>
              <div class="actions"><button class="primary" type="submit">Check karo</button>
                <button type="button" class="link" id="sskip">Pata nahi — seedha samjhao</button></div>
            </form>
          </div>`;
      } else if (phase === 'try') {
        // no practice question teaches this step: predict first, then reveal
        body = `${head}
          <div class="trybox">
            <div class="ttag">Pehle socho — 20 second</div>
            <p>"<b>${esc(s.title)}</b>" — tumhe kya lagta hai iska matlab ya rule kya hoga? Ek line me andaza likho, galat bhi chalega. Andaza lagane ke baad padha hua zyada yaad rehta hai.</p>
            <textarea id="sguess" rows="2" class="guess" placeholder="mera andaza…"></textarea>
            <div class="actions"><button class="primary" id="sreveal">Ab dikhao</button></div>
          </div>`;
      } else {
        const verdict = res && res.guess
          ? `<p class="muted small">Tumhara andaza: "${esc(res.guess)}" — ab neeche se milao.</p>`
          : res
          ? res.correct
            ? '<div class="verdict ok">Sahi ✓ — ab dekho ye kyun kaam karta hai.</div>'
            : `<div class="verdict no">Abhi nahi hua — bilkul theek. Neeche ka tukda isi ke liye hai.</div>${res.why ? `<div class="why bad">${md(res.why, true)}</div>` : ''}`
          : '';
        body = `${head}${verdict}
          <div class="ttag">Ab samjho</div>
          <div class="prose lesson piece">${elsHtml(s.els)}</div>
          ${q && res ? `<details><summary>Us sawaal ka solution</summary><div class="sol">${md(q.solution)}</div></details>` : ''}
          <label class="say"><span><b>Ek line me khud bolo:</b> is step ka idea apne shabdon me (bol pao toh samjhe ho)</span>
            <textarea id="ssay" rows="2" placeholder="jaise: dot product 0 matlab 90°">${esc(st.notes[k] || '')}</textarea></label>
          <div class="actions">
            <button class="primary" id="snext">${k < n ? 'Samajh aaya → agla step' : 'Samajh aaya → summary'}</button>
            ${s.qs.length > qi + 1 ? '<button type="button" id="smore">Ek aur sawaal isi pe</button>' : ''}
          </div>`;
      }
    }
    set(`<p><a href="#/theory">← Saari theory</a>${days.length ? ` · <span class="muted">Practice: ${days.map((d) => `<a href="#/day/${d}">Day ${d}</a>`).join(', ')}</span>` : ''}</p>
      ${theoryTabs(id, true, 'steps')}
      <div class="sdots">${dots}</div>
      <section class="card stepcard">${body}</section>`);
    bind();
  };

  const go = (to) => {
    k = Math.max(0, Math.min(n + 1, to));
    phase = 'try';
    qi = 0;
    res = null;
    st = stepStore(id, { k });
    render();
    main.scrollTo(0, 0);
    window.scrollTo(0, 0);
  };

  const bind = () => {
    main.querySelectorAll('.sdot').forEach((b) => { b.onclick = () => go(Number(b.dataset.k)); });
    const say = document.getElementById('ssay');
    if (say) say.oninput = () => { st = stepStore(id, { notes: { ...st.notes, [k]: say.value.trim() } }); };
    const next = document.getElementById('snext');
    if (next) next.onclick = () => go(k + 1);
    const redo = document.getElementById('sredo');
    if (redo) redo.onclick = () => go(0);
    const more = document.getElementById('smore');
    if (more) more.onclick = () => { qi++; phase = 'try'; res = null; render(); };
    const skip = document.getElementById('sskip');
    if (skip) skip.onclick = () => { phase = 'learn'; res = null; render(); };
    const reveal = document.getElementById('sreveal');
    if (reveal) reveal.onclick = () => {
      const g = document.getElementById('sguess').value.trim();
      res = g ? { guess: g } : null;
      phase = 'learn';
      render();
    };
    const form = document.getElementById('sform');
    if (form) {
      form.onsubmit = (ev) => {
        ev.preventDefault();
        const q = L.steps[k - 1].qs[qi];
        const resp = q.type === 'NAT'
          ? document.getElementById('snat').value
          : [...form.querySelectorAll('input[name=sopt]:checked')].map((x) => Number(x.value));
        const g = grade(q, resp);
        if (!g.valid) {
          document.getElementById('serr').textContent = q.type === 'NAT' ? 'Ek number likho (decimal ke liye point).' : 'Pehle koi option chuno.';
          return;
        }
        const wrongPick = q.type !== 'NAT' && !g.correct ? q.options[(g.chosen || []).find((i) => !q.options[i].correct)] : null;
        res = { correct: g.correct, why: q.type === 'NAT' ? (g.trap ? g.trap.why : '') : wrongPick?.why || '' };
        // a learning try: marks the question seen (practice prefers fresh ones); no accuracy, no cards
        window.__store.addEvent('attempt', { qid: q.id, skill: q.skill, subject: content.skills[q.skill]?.subject || '', day: 0,
          date: today(), mode: 'learn', resp, correct: g.correct, conf: null, repeated: false, ms: 0, sid: 'theory' });
        phase = 'learn';
        render();
      };
    }
  };
  render();
}

// One topic: the detailed lesson ("Samjho") by default, the short note under /short.
async function viewNote(id, sub, tok) {
  set('<section class="card"><p class="muted">Loading…</p></section>');
  const [lesson, note] = await Promise.all([getDoc('learn', id), getDoc('theory', id)]);
  if (tok !== viewToken) return;
  const entry = Object.values(theoryIndex()).map((l) => l.get(id)).find(Boolean);
  const days = entry ? [...entry.days].sort((a, b) => a - b) : [];
  // default view of a lesson: the step-by-step player (question first, theory in small pieces)
  if (lesson && !sub) return viewSteps(id, lesson, days);
  const showShort = sub === 'short' || !lesson;
  const text = showShort ? note : lesson;
  const tabs = theoryTabs(id, !!lesson, showShort ? 'short' : 'full');
  set(`<p><a href="#/theory">← Saari theory</a>${days.length ? ` · <span class="muted">Practice: ${days.map((d) => `<a href="#/day/${d}">Day ${d}</a>`).join(', ')}</span>` : ''}</p>
    ${tabs}
    ${!lesson && note ? '<p class="banner">Is topic ka detailed lesson abhi nahi bana — short note neeche hai.</p>' : ''}
    <div class="jump chips" id="ljump" hidden></div>
    <article class="card prose ${showShort ? '' : 'lesson'}">${md(text || '# Nahi mila\nIs topic ki theory abhi nahi bani, ya internet nahi hai.')}</article>
    ${!showShort ? `<p class="muted">Lesson ho gaya? <a href="#/theory/${esc(id)}/short">Short note</a> se revise karo${days.length ? `, phir <a href="#/day/${days[0]}">Day ${days[0]}</a> ke sawaal karo` : ''}.</p>` : ''}`);
  // section chips for long lessons; scroll in place because #anchors are routes here
  const heads = [...main.querySelectorAll('.lesson h2')];
  const jump = document.getElementById('ljump');
  if (heads.length > 2) {
    heads.forEach((h, i) => { h.id = `s${i}`; });
    jump.innerHTML = heads.map((h, i) => `<button type="button" class="chip" data-s="s${i}">${esc(h.textContent)}</button>`).join('');
    jump.hidden = false;
    jump.onclick = (e) => {
      const b = e.target.closest('[data-s]');
      if (b) document.getElementById(b.dataset.s).scrollIntoView({ block: 'start', behavior: 'smooth' });
    };
  }
  // opened from a question: jump to the part of the lesson that question needs
  const qid = sub && sub.startsWith('q=') ? decodeURIComponent(sub.slice(2)) : null;
  if (qid && !showShort) focusLessonPart(qid, jump);
}

const STOP = new Set(('the and for with from that this into are use using each when not than then also only its was were has have '
  + 'can will may one two any all how what which who why does did given find value values answer correct option options '
  + 'hai hota hoti hain aur nahi kya kyun jab toh yahan wahi sirf matlab karo karte liye bhi koi kuch agar par pehle phir '
  + 'frac dfrac left right text mathrm cdot times').split(' '));

function words(text) {
  return String(text || '').toLowerCase()
    .replace(/\\([a-z]+)/g, ' $1 ') // \lambda -> lambda
    .replace(/[^a-z0-9]+/g, ' ').split(' ')
    .filter((w) => w.length >= 3 && !STOP.has(w) && !/^\d+$/.test(w))
    .map((w) => ALIAS[w] || w)
    .map((w) => (w.length > 6 ? w.replace(/(ations?|ings?|ed)$/, '') : w))
    .map((w) => (w.length > 4 && w.endsWith('s') ? w.slice(0, -1) : w));
}

const ALIAS = { det: 'determinant', determinants: 'determinant', eigenvalues: 'eigenvalue', prob: 'probability' };

// Skills whose words don't appear in the heading they belong to.
const PART_HINT = {
  'ai.search-props': /Properties/i, 'ai.search-complexity': /Properties/i,
  'dsa.sort-props': /Ek table/i, 'la.eig-trace-det': /Trace = sum/i, 'la.svd': /Singular values kaise/i,
  'ps.ci-interpret': /interpretation/i, 'ps.test-select': /5 steps/i,
};

// The lesson block (### step, or a ## section) that best matches the question's skill and
// text; it is scrolled to and flashed for a moment, with a chip to jump back to it.
function focusLessonPart(qid, jump) {
  const best = matchLessonBlock(main.querySelector('article.lesson'), qid);
  if (!best) return;
  const { h, els } = best;
  h.id ||= 'qfocus';
  jump.hidden = false;
  jump.insertAdjacentHTML('afterbegin', `<button type="button" class="chip focus" data-s="${h.id}">📍 Is sawaal ka hissa: ${esc(h.textContent.replace(/^\d+\.\s*/, ''))}</button>`);
  requestAnimationFrame(() => {
    h.scrollIntoView({ block: 'start' });
    els.forEach((e) => {
      e.classList.remove('flash');
      void e.offsetWidth; // restart the animation
      e.classList.add('flash');
    });
    setTimeout(() => els.forEach((e) => e.classList.remove('flash')), 1600);
  });
}

// Seekho: after the try, show only the lesson step that question needs, inline.
async function showLessonPiece(q, skill) {
  const box = document.getElementById('learnstep');
  const text = await getDoc('learn', skill.theory);
  if (!box || !box.isConnected) return;
  const href = lessonHref(q, skill);
  if (!text) {
    box.innerHTML = `<p><a href="${href}" target="_blank" rel="noopener">📖 Lesson ka wahi hissa kholo ↗</a></p>`;
    return;
  }
  const art = document.createElement('article');
  art.className = 'lesson';
  art.innerHTML = md(text);
  const best = matchLessonBlock(art, q.id);
  if (!best) {
    box.innerHTML = `<p><a href="${href}" target="_blank" rel="noopener">📖 Lesson ka wahi hissa kholo ↗</a></p>`;
    return;
  }
  const [h, ...rest] = best.els;
  box.innerHTML = `<div class="eyebrow">📘 Theory ka tukda · ${esc(h.textContent.replace(/^\d+\.\s*/, ''))}</div>
    <div class="prose lesson">${rest.map((e) => e.outerHTML).join('')}</div>
    <p class="small"><b>Ek line me khud bolo:</b> ye idea kya kehta hai? Bol pao toh agla sawaal. · <a href="${href}" target="_blank" rel="noopener">poora lesson isi jagah se ↗</a></p>`;
  typeset(box);
}

// Word index of a lesson's blocks, built once per parsed lesson (matching many questions
// against one lesson must not re-read it every time).
const blockIndex = new WeakMap();

function lessonBlocks(art) {
  if (blockIndex.has(art)) return blockIndex.get(art);
  const skip = /^(Ye topic kyun|Ek page me|Khud try karo|Solved examples|Confusions)/i;
  const blocks = [];
  let section = '';
  for (const h of art.querySelectorAll('h2, h3')) {
    if (h.tagName === 'H2') section = h.textContent;
    if (skip.test(section)) continue;
    const els = [h];
    for (let n = h.nextElementSibling; n && !/^H[1-3]$/.test(n.tagName); n = n.nextElementSibling) els.push(n);
    if (els.length < 2) continue; // a heading with nothing under it
    const body = words(els.slice(1).map((e) => e.textContent).join(' '));
    const counts = new Map();
    body.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1));
    blocks.push({ h, els, section, head: new Set(words(h.textContent)), counts, len: body.length });
  }
  const df = new Map();
  blocks.forEach((b) => new Set([...b.head, ...b.counts.keys()]).forEach((t) => df.set(t, (df.get(t) || 0) + 1)));
  const idx = { blocks, df };
  blockIndex.set(art, idx);
  return idx;
}

// Lesson blocks ranked by how well they teach this question (best first; [] if none fits).
function rankLessonBlocks(art, qid) {
  const q = content.questions[qid];
  const sk = q ? content.skills[q.skill] : content.skills[qid];
  if (!sk || !art) return [];
  const { blocks, df } = lessonBlocks(art);
  if (!blocks.length) return [];
  const hint = PART_HINT[sk.id] && blocks.find((b) => PART_HINT[sk.id].test(b.h.textContent));
  if (hint) return [{ b: hint, s: 1 }];
  const want = new Map();
  const add = (text, w) => words(text).forEach((t) => want.set(t, Math.max(want.get(t) || 0, w)));
  add(q ? `${q.stem} ${q.solution || ''}` : '', 1);
  add(sk.check, 1.5);
  add(sk.title, 2.5);
  const score = (b) => {
    let s = 0;
    for (const [t, w] of want) {
      const idf = Math.log(1 + blocks.length / (df.get(t) || blocks.length));
      s += w * idf * ((b.head.has(t) ? 3 : 0) + Math.min(b.counts.get(t) || 0, 3) * 0.6);
    }
    // concept steps teach; solved examples come second
    return s * (/^Concept/i.test(b.section) ? 1.25 : 1) / Math.sqrt(1 + b.len / 120);
  };
  return blocks.map((b) => ({ b, s: score(b) })).filter((x) => x.s > 0).sort((x, y) => y.s - x.s);
}

function matchLessonBlock(art, qid) {
  return rankLessonBlocks(art, qid)[0]?.b || null;
}

// Link from a question to the lesson part it needs.
function lessonHref(q, skill) {
  return `#/theory/${esc(skill.theory)}/q=${encodeURIComponent(q ? q.id : skill.id)}`;
}

async function viewTheory(id, sub) {
  const tok = viewToken;
  if (id) return viewNote(id, sub, tok);
  const idx = theoryIndex();
  const ids = Object.values(idx).flatMap((list) => [...list.keys()]);
  set('<section class="card"><h1>Theory</h1><p class="muted">Loading…</p></section>');
  const texts = Object.fromEntries(await Promise.all(ids.map(async (n) => [n, await getNote(n)])));
  if (tok !== viewToken) return;
  set(`<section class="card"><h1>Theory</h1><p class="muted">Har topic ke teen roop: <b>Step-by-step</b> — ek baar me ek chhota step: pehle khud sawaal try karo, phir sirf wahi theory ka tukda, phir ek line me khud bolo · <b>Poora lesson</b> — sab ek page pe (picture, solved examples) · <b>Short note</b> — revision ke liye.</p>
      <input id="tsearch" class="search" type="search" placeholder="Topic dhoondo… (jaise eigen, SQL, Bayes)" aria-label="Theory search">
      <p id="tnone" class="muted" hidden>Kuch nahi mila. Doosra shabd try karo (jaise "rank", "join", "entropy").</p></section>` +
    Object.entries(idx).map(([area, list]) => `
      <section class="card tsec"><h2>${AREA_NAMES[area] || area}</h2><ul class="links">
        ${[...list.values()].map((e) => `<li data-q="${esc((noteTitle(e.id, texts[e.id]) + ' ' + e.skills.join(' ')).toLowerCase())}"><a href="#/theory/${esc(e.id)}">${esc(noteTitle(e.id, texts[e.id]))}</a>
          <span class="muted small"><a href="#/theory/${esc(e.id)}/short">short note</a> · ${e.days.size ? 'Day ' + [...e.days].sort((a, b) => a - b).join(', ') + ' · ' : ''}${esc(e.skills.slice(0, 3).join(' · '))}${e.skills.length > 3 ? '…' : ''}</span></li>`).join('')}
      </ul></section>`).join(''));
  const box = document.getElementById('tsearch');
  box.oninput = () => {
    const q = box.value.trim().toLowerCase();
    main.querySelectorAll('.tsec').forEach((sec) => {
      let shown = 0;
      sec.querySelectorAll('li').forEach((li) => {
        const hit = !q || li.dataset.q.includes(q);
        li.hidden = !hit;
        shown += hit;
      });
      sec.hidden = !shown;
    });
    document.getElementById('tnone').hidden = !q || !!main.querySelector('.tsec:not([hidden])');
  };
}

async function viewRecall() {
  const tok = viewToken;
  set('<section class="card"><h1>Recall sheet</h1><p class="muted">Recall sheet bana raha hoon…</p></section>');
  const idx = theoryIndex();
  const state = derive();
  const traps = Object.values(state.cards).filter((c) => !c.mastered)
    .map((c) => content.skills[c.skill]).filter((s) => s && s.check);
  const ids = Object.values(idx).flatMap((list) => [...list.keys()]);
  const texts = Object.fromEntries(await Promise.all(ids.map(async (n) => [n, await getNote(n)])));
  if (tok !== viewToken) return;
  const missing = ids.filter((n) => !texts[n]).length;
  const areas = Object.keys(idx);
  let html = `<section class="card"><h1>Recall sheet</h1><p class="muted">Har topic ki sabse zaroori lines, aur kahan se padhna hai. Exam se pehle roz ek baar.</p>
    <div class="chips jump">${traps.length ? '<button type="button" class="chip" data-jump="r-traps">Tumhare traps</button>' : ''}${areas.map((a) => `<button type="button" class="chip" data-jump="r-${a}">${AREA_NAMES[a] || a}</button>`).join('')}</div>
    ${missing ? `<p class="banner warn">${missing} notes load nahi hue (internet?). Baaki neeche hain.</p>` : ''}</section>`;
  if (traps.length) {
    html += `<section class="card" id="r-traps"><h2>Tumhare active traps</h2><ul>${traps.map((s) => `<li><b>${esc(s.title)}:</b> ${md(s.check, true)} <a class="small" href="#/theory/${esc(s.theory)}">theory</a></li>`).join('')}</ul></section>`;
  }
  for (const [area, list] of Object.entries(idx)) {
    let block = '';
    for (const e of list.values()) {
      const text = texts[e.id];
      if (!text) continue;
      const m = text.match(/##\s*Recall\s*\n([\s\S]*?)(\n##\s|$)/i);
      if (!m) continue;
      const days = [...e.days].sort((a, b) => a - b);
      block += `<div class="recall"><h3><a href="#/theory/${esc(e.id)}">${esc(noteTitle(e.id, text))}</a>${days.length ? ` <span class="muted small">Day ${days.join(', ')}</span>` : ''}</h3>${md(m[1])}</div>`;
    }
    if (block) html += `<section class="card" id="r-${area}"><h2>${AREA_NAMES[area] || area}</h2>${block}</section>`;
  }
  set(html);
  // jump buttons scroll in place (a #anchor would be read as a route)
  main.querySelectorAll('[data-jump]').forEach((b) => {
    b.onclick = () => document.getElementById(b.dataset.jump)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  });
}

// ---------- progress ----------

function viewProgress() {
  const state = derive();
  const ps = planStatus(state);
  const st = skillStats(state);
  const bySubject = {};
  for (const [id, s] of Object.entries(st)) {
    const subj = content.skills[id]?.subject || 'Other';
    const b = (bySubject[subj] ||= { n: 0, ok: 0 });
    b.n += s.n;
    b.ok += s.ok;
  }
  // last 21 days
  const days = [];
  for (let i = 20; i >= 0; i--) {
    const d = addDays(today(), -i);
    const at = state.attempts.filter((a) => a.date === d);
    const fp = at.filter((a) => a.mode !== 'repair' && !a.repeated);
    days.push({ d, n: at.length, acc: fp.length ? fp.filter((a) => a.correct && a.conf !== 'Guess').length / fp.length : null });
  }
  const logs = state.logList.slice().sort((a, b) => a.day - b.day || a.ts - b.ts);
  const hours = logs.reduce((s, l) => s + (l.hours || 0), 0);
  const modeTag = (l) => {
    if (l.mode === 'reattempt') return `↻ re-attempt${l.fallback ? ' · <b class="warnchip-t">fallback</b>' : ''}`;
    if (l.mode === 'fallback') return '<b class="warnchip-t">fallback</b>';
    if (String(l.mode || '').startsWith('history')) return 'chat (pehle)';
    return l.mode || 'normal';
  };
  const cards = Object.values(state.cards);
  const planPct = Math.round((100 * ps.doneCount) / ps.total);

  set(`
    <section class="card hero">
      <div class="countdown"><b>${ps.daysToExam}</b><span>din exam tak (${fmtDate(ps.exam)})</span></div>
      <div class="bar"><div style="width:${planPct}%"></div></div>
      <p>Plan: <b>${ps.doneCount}/${ps.total}</b> din poore · ab Day ${ps.current.day} · ${ps.behind ? `<span class="hot">${ps.behind} din peeche</span>` : 'schedule pe'} · projected finish <b>${fmtDate(ps.projectedEnd)}</b> (${ps.bufferDays >= 0 ? ps.bufferDays + ' din buffer' : 'exam ke baad!'})</p>
    </section>
    ${target72Card(state)}
    <section class="card">
      <h2>Pichhle 21 din</h2>
      ${chart(days)}
      <p class="muted small">Bars = attempts · line = first-pass accuracy (Guess = galat)</p>
    </section>
    <section class="card">
      <h2>Subject-wise first-pass accuracy</h2>
      <table class="tbl"><thead><tr><th>Subject</th><th>Attempts</th><th>Accuracy</th></tr></thead><tbody>
        ${Object.entries(bySubject).sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n).map(([s, b]) => `<tr><td>${esc(s)}</td><td>${b.n}</td><td><div class="minibar"><div style="width:${(100 * b.ok) / b.n}%"></div></div> ${pct(b.ok, b.n)}</td></tr>`).join('') || '<tr><td colspan="3" class="muted">Abhi data nahi.</td></tr>'}
      </tbody></table>
      <p class="muted small">${state.attempts.length < 20 ? 'Sample chhota hai (20 se kam unseen attempts) — trend mat padho.' : ''}</p>
    </section>
    ${stuckProfile(state)}
    ${trapProfile(state)}
    <section class="card">
      <h2>Revision cards</h2>
      <div class="stats">
        <div><b>${dueCards(state).length}</b><span>aaj due</span></div>
        <div><b>${cards.filter((c) => !c.mastered).length}</b><span>active</span></div>
        <div><b>${cards.filter((c) => c.mastered).length}</b><span>mastered</span></div>
        <div><b>${hours.toFixed(1)}</b><span>focused ghante</span></div>
      </div>
    </section>
    <section class="card">
      <h2>Mocks</h2>
      ${state.mocks.length ? `<table class="tbl"><thead><tr><th>Date</th><th>Source</th><th>Fresh</th><th>Net</th><th>vs ${TARGET}</th></tr></thead><tbody>${state.mocks.map((m) => `<tr><td>${fmtDate(m.date)}</td><td>${esc(m.source)}</td><td>${m.fresh ? 'yes' : 'no'}</td><td><b>${m.net}</b></td><td><div class="minibar t72mini"><div style="width:${Math.min(100, m.net)}%"></div><i style="left:${TARGET}%"></i></div> ${m.net >= TARGET ? '✓' : `−${(TARGET - m.net).toFixed(0)}`}</td></tr>`).join('')}</tbody></table>` : '<p class="muted">Abhi koi mock nahi.</p>'}
      ${(() => {
        const fresh = state.mocks.filter((m) => m.fresh).slice(-5);
        if (!fresh.length) return '';
        const hit = fresh.filter((m) => m.net >= TARGET).length;
        const sorted = fresh.map((m) => m.net).sort((a, b) => a - b);
        return `<p><b>Last ${fresh.length} fresh mocks:</b> ${hit}/${fresh.length} ne ${TARGET}+ kiya · median ${sorted[Math.floor(sorted.length / 2)]} · lowest ${sorted[0]}</p>`;
      })()}
      <p class="muted small">Readiness sirf fresh 180-min papers se: pichhle 5 fresh me kitne ${TARGET}+ the. Lagaatar 5 me 5 = strong milestone, guarantee nahi.</p>
    </section>
    <section class="card">
      <h2>Day log</h2>
      <p class="muted small">Fallback wale din: ${logs.filter((l) => l.mode === 'fallback' || l.fallback).map((l) => `<a href="#/day/${l.day}">Day ${l.day}</a>`).join(', ') || 'koi nahi'} · <a href="#/days">All days</a></p>
      <table class="tbl"><thead><tr><th>Day</th><th>Date</th><th>Type</th><th>Hours</th><th>Anxiety</th><th>First-pass</th></tr></thead><tbody>
      ${logs.slice().reverse().map((l) => `<tr><td><a href="#/day/${l.day}">${l.day}</a></td><td>${fmtDate(l.date)}</td><td>${modeTag(l)}</td><td>${l.hours ?? '—'}</td><td>${l.anxiety ?? '—'}</td><td>${l.firstPass ? pct(l.firstPassOk, l.firstPass) : '—'}</td></tr>`).join('')}
      </tbody></table>
    </section>`);
}

// Where the student gets stuck on wrong answers ("Kahan atke?"), with what to do about the top reason.
const STUCK_FIX = {
  concept: 'Naye sawaal pe pehle 30 sec sirf ye socho: "kaunsa concept?" Trigger words dhoondo. Atko toh 💡 ka pehla ishara concept hi batata hai. Naye din ka Seekho part skip mat karo.',
  setup: 'Concept pata hai par sawaal ko equation/tree/table me nahi badal pa rahe. Lesson ke Solved examples ka "Soch" hissa padho, wahi setup sikhata hai. Pehle sabse simple case pe setup banao.',
  last: 'Method sahi, aakhri step galat. Submit se pehle wala 10-second check dhyan se padho: root ya square, unit vector, sawaal kya maang raha hai.',
  read: 'Sawaal 2 baar padho. "at least", "not", "without replacement", MSQ ka "select all" pe ruk ke dhyan do.',
  unknown: 'Ye topic abhi baitha nahi. Sawaal ke neeche wala lesson ka hissa padho, phir usi skill ka agla variant karo.',
};

function stuckProfile(state) {
  const list = state.stuck || [];
  const counts = {};
  list.forEach((s) => { counts[s.why] = (counts[s.why] || 0) + 1; });
  const rows = Object.entries(counts).filter(([k]) => STUCK[k]).sort((a, b) => b[1] - a[1]);
  const total = rows.reduce((t, [, n]) => t + n, 0);
  return `<section class="card">
      <h2>Kahan atakte ho</h2>
      <p class="muted small">Galat answer ke baad "Kahan atke?" pe jo tap karte ho, uska hisaab.</p>
      ${rows.length ? `<table class="tbl"><tbody>
        ${rows.map(([k, n]) => `<tr><td><b>${esc(STUCK[k])}</b></td><td>${n}</td><td><div class="minibar"><div style="width:${(100 * n) / rows[0][1]}%"></div></div> ${pct(n, total)}</td></tr>`).join('')}
      </tbody></table>
      <p class="banner"><b>Sabse zyada: ${esc(STUCK[rows[0][0]])}.</b> ${esc(STUCK_FIX[rows[0][0]])}</p>
      ${total < 10 ? '<p class="muted small">Abhi 10 se kam tags hain — pattern 10–15 ke baad pakka hoga.</p>' : ''}`
        : '<p class="muted">Abhi koi tag nahi. Agli baar galat answer pe "Kahan atke?" me ek tap karna.</p>'}
    </section>`;
}

// Which of the 11 recurring GATE trap classes the student falls for, from tagged wrong answers.
function trapProfile(state) {
  const counts = {};
  let total = 0;
  for (const a of state.attempts) {
    for (const t of a.traps || []) {
      counts[t] = (counts[t] || 0) + 1;
      total++;
    }
  }
  const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return `<section class="card">
      <h2>Trap profile</h2>
      <p class="muted small">GATE papers 2024–26 me har sawaal in 11 trap classes me aata hai. Ye tumhari galtiyon ka breakdown hai.</p>
      ${rows.length ? `<table class="tbl"><thead><tr><th>Trap class</th><th>Galtiyan</th><th></th></tr></thead><tbody>
        ${rows.map(([c, n]) => `<tr><td><b>${esc(TRAP_CLASSES[c] || c)}</b> <span class="muted small">${esc(c)}</span></td><td>${n}</td><td><div class="minibar"><div style="width:${(100 * n) / rows[0][1]}%"></div></div> ${pct(n, total)}</td></tr>`).join('')}
      </tbody></table>` : '<p class="muted">Abhi tagged galtiyan nahi hain. Naye banks (DSA, DBMS, ML, AI) ke har galat option pe trap class hai.</p>'}
    </section>`;
}

function chart(days) {
  const W = 630, H = 160, pad = 24, bw = (W - pad * 2) / days.length;
  const maxN = Math.max(10, ...days.map((d) => d.n));
  const bars = days.map((d, i) => {
    const bh = ((H - pad * 2) * d.n) / maxN;
    return `<rect x="${pad + i * bw + 2}" y="${H - pad - bh}" width="${bw - 4}" height="${bh}" rx="2" class="cbar"><title>${d.d}: ${d.n}</title></rect>`;
  }).join('');
  const pts = days.map((d, i) => (d.acc === null ? null : `${pad + i * bw + bw / 2},${H - pad - (H - pad * 2) * d.acc}`)).filter(Boolean);
  const labels = days.filter((_, i) => i % 5 === 0).map((d) => {
    const i = days.indexOf(d);
    return `<text x="${pad + i * bw + bw / 2}" y="${H - 6}" class="clabel">${d.d.slice(5)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Attempts and accuracy">
    <line x1="${pad}" y1="${pad}" x2="${W - pad}" y2="${pad}" class="cgrid"/><text x="${W - pad + 2}" y="${pad + 4}" class="clabel">100%</text>
    <line x1="${pad}" y1="${H / 2}" x2="${W - pad}" y2="${H / 2}" class="cgrid"/><text x="${W - pad + 2}" y="${H / 2 + 4}" class="clabel">50%</text>
    ${bars}${pts.length > 1 ? `<polyline points="${pts.join(' ')}" class="cline"/>` : ''}${pts.map((p) => `<circle cx="${p.split(',')[0]}" cy="${p.split(',')[1]}" r="3" class="cdot"/>`).join('')}${labels}</svg>`;
}

// ---------- settings ----------

function viewSettings() {
  set(`
    <section class="card">
      <h1>Settings</h1>
      <h2>Sync (GitHub)</h2>
      <p class="muted">Progress private repo <code>${esc(cfg.owner)}/${esc(cfg.repo)}</code> me save hota hai. Har device pe ek baar token daalo. Token sirf isi browser me rehta hai.</p>
      <ol class="small">
        <li>GitHub → Settings → Developer settings → <b>Fine-grained tokens</b> → Generate new token</li>
        <li>Repository access: <b>Only select repositories</b> → <code>${esc(cfg.repo)}</code></li>
        <li>Permissions → Repository → <b>Contents: Read and write</b></li>
        <li>Token yahan paste karo (ye kaam tum khud karna).</li>
      </ol>
      <form id="cfg" class="grid2">
        <label>Owner <input id="owner" value="${esc(cfg.owner)}"></label>
        <label>Repo <input id="repo" value="${esc(cfg.repo)}"></label>
        <label class="span2">Token <input id="token" type="password" value="${esc(cfg.token)}" autocomplete="off" placeholder="github_pat_…"></label>
        <label>Exam date <input id="exam" type="date" value="${esc(cfg.examDate)}"></label>
        <label>Device name <input id="device" value="${esc(cfg.device)}"></label>
        <div class="span2 actions"><button class="primary" type="submit">Save + sync</button><button type="button" id="test">Test connection</button></div>
      </form>
      <p id="msg" class="muted"></p>
      <p class="muted small">DA paper ki exact date aate hi exam date update kar dena — countdown aur buffer usi se chalte hain.</p>
    </section>
    <section class="card">
      <h2>Backup</h2>
      <div class="actions"><button id="exp">Export JSON</button><label class="button">Import JSON<input id="imp" type="file" accept=".json" hidden></label></div>
    </section>`);
  const msg = document.getElementById('msg');
  document.getElementById('cfg').onsubmit = async (ev) => {
    ev.preventDefault();
    const v = (id) => document.getElementById(id).value.trim();
    setCfg({ owner: v('owner'), repo: v('repo'), token: v('token'), examDate: v('exam'), device: v('device') || cfg.device });
    msg.textContent = 'Syncing…';
    await sync();
    msg.textContent = syncState.status === 'ok' ? 'Saved and synced ✓' : syncState.message;
  };
  document.getElementById('test').onclick = async () => {
    const token = document.getElementById('token').value.trim();
    if (!token) { msg.textContent = 'Token khaali hai — pehle upar ke steps se token banao aur paste karo.'; return; }
    setCfg({ token });
    msg.textContent = 'Check kar raha hoon…';
    try { msg.textContent = await testConnection(); } catch (e) { msg.textContent = e.message; }
  };
  document.getElementById('exp').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([exportJson()], { type: 'application/json' }));
    a.download = `gate-da-progress-${today()}.json`;
    a.click();
  };
  document.getElementById('imp').onchange = async (ev) => {
    const file = ev.target.files[0];
    if (!file) return;
    try { msg.textContent = `${importJson(await file.text())} events imported.`; } catch (e) { msg.textContent = 'Import failed: ' + e.message; }
  };
}

// ---------- keyboard ----------
// Question screen: 1–4 / A–D pick (MSQ toggles), S/L/G confidence, Enter submits then goes next.
// Attempt review: ← → move between attempts.

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
  const k = e.key.toLowerCase();
  const tag = (e.target.tagName || '').toLowerCase();
  const typing = tag === 'textarea' || tag === 'select' || (tag === 'input' && !['radio', 'checkbox'].includes(e.target.type));

  if (location.hash.startsWith('#/attempt/') && !typing) {
    const to = k === 'arrowleft' ? document.getElementById('prevA') : k === 'arrowright' ? document.getElementById('nextA') : null;
    if (to) { e.preventDefault(); location.hash = to.getAttribute('href'); }
    return;
  }
  const form = document.getElementById('answer');
  if (!form || !current) return;
  if (feedback) {
    // a focused button/link already handles Enter natively; clicking again would skip a question
    if ((k === 'enter' && !['a', 'summary', 'button'].includes(tag)) || k === 'n') {
      e.preventDefault();
      document.getElementById('next')?.click();
    }
    return;
  }
  const conf = { s: 'Sure', l: 'Likely', g: 'Guess' }[k];
  if (conf) {
    const c = form.querySelector(`input[name=conf][value=${conf}]`);
    if (c) {
      e.preventDefault();
      c.checked = true;
      c.dispatchEvent(new Event('change', { bubbles: true }));
    }
    return;
  }
  if (typing) return; // in the NAT box, Enter submits the form natively
  const idx = k.length === 1 ? Math.max('1234'.indexOf(k), 'abcd'.indexOf(k)) : -1;
  if (idx >= 0) {
    const opt = form.querySelectorAll('input[name=opt]')[idx];
    if (opt) {
      e.preventDefault();
      opt.checked = opt.type === 'checkbox' ? !opt.checked : true;
      opt.dispatchEvent(new Event('change', { bubbles: true }));
    }
    return;
  }
  if (k === 'enter' && tag !== 'button' && tag !== 'a' && tag !== 'summary') {
    e.preventDefault();
    form.requestSubmit();
  }
});

// ---------- active-time clock ----------

['click', 'keydown', 'touchstart', 'scroll'].forEach((t) => window.addEventListener(t, () => (lastInput = Date.now()), { passive: true }));
setInterval(() => {
  if (!session || session.ended || !current || document.visibilityState !== 'visible') return;
  // 2 minutes on one question: offer a hint instead of letting the student freeze
  if (!feedback && !current.nudged && !current.hints && Date.now() - current.shownAt > 120000) {
    current.nudged = true;
    const b = document.getElementById('hintbtn');
    if (b) {
      b.textContent = '⏱ 2 min ho gaye — ek ishara dekhoge? Atakna theek hai, rukna nahi.';
      b.classList.add('nudge');
    }
  }
  if (Date.now() - lastInput > IDLE_MS) return;
  session.activeMs += 1000;
  if (session.activeMs % 15000 === 0) saveSession(session);
  if (session.activeMs % 60000 === 0) renderTimer();
}, 1000);

// ---------- boot ----------

async function boot() {
  const store = await import('./store.js?v=202611080012');
  window.__store = store;
  main.innerHTML = '<section class="card"><p class="muted">Loading…</p></section>';
  await loadContent();
  onChange(() => { renderSync(); renderChrome(); });
  renderSync();
  document.getElementById('syncbtn').onclick = () => sync();
  document.getElementById('skip').onclick = () => {
    const target = main.querySelector('#start, #submitbtn, #next, #nat, input, button, a') || main;
    target.focus();
  };
  window.addEventListener('hashchange', route);
  route();
  await sync();
  if (!current) route();
}

boot();

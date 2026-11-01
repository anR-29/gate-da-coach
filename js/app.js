import { cfg, setCfg, onChange, sync, syncState, testConnection, exportJson, importJson } from './store.js?v=202611020516';
import {
  content, loadContent, derive, dueCards, planStatus, newSession, loadSession, saveSession, nextItem, submit,
  endSession, sessionCounts, targets, timeUp, skillStats, today, addDays, INTERVALS, MASTERED_AFTER, TRAP_CLASSES,
} from './engine.js?v=202611020516';
import { md, typeset, esc, fmtDate, pct } from './render.js?v=202611020516';

const main = document.getElementById('main');
const IDLE_MS = 5 * 60000;

let session = null;
let current = null;      // { q, skill, mode, label, repeated, shownAt }
let feedback = null;     // result of submit() for the current item
let lastInput = Date.now();

// ---------- shell ----------

const CRUMBS = { today: 'Today', revision: 'Revision cards', theory: 'Theory', recall: 'Recall sheet', progress: 'Progress', settings: 'Settings' };

let viewToken = 0; // async views drop their result if the user has navigated away

function route() {
  viewToken++;
  const hash = location.hash.replace(/^#\/?/, '') || 'today';
  const [view, arg] = hash.split('/');
  const known = CRUMBS[view] ? view : 'today';
  document.querySelectorAll('[data-view]').forEach((a) => a.classList.toggle('active', a.dataset.view === known));
  document.getElementById('crumb').textContent = arg ? `${CRUMBS[known]} · ${decodeURIComponent(arg)}` : CRUMBS[known];
  const views = { today: viewToday, revision: viewRevision, theory: viewTheory, recall: viewRecall, progress: viewProgress, settings: viewSettings };
  views[known](arg ? decodeURIComponent(arg) : null);
  main.scrollTo(0, 0);
  window.scrollTo(0, 0);
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
  const upcoming = content.plan.days.filter((d) => d.seq >= ps.current.seq).slice(0, 6);
  document.getElementById('weeknav').innerHTML = upcoming.map((d, i) => `
    <a class="week ${i === 0 ? 'active' : ''} ${d.isMock ? 'mock' : ''}" href="#/today" title="${esc(d.title)}">
      <span class="day-icon">${d.day}</span>
      <span><strong>${esc(d.title)}</strong><small>${fmtDate(d.date)}${d.isMock ? ' · mock' : ''}</small></span>
    </a>`).join('');
  const planPct = Math.round((100 * ps.doneCount) / ps.total);
  document.getElementById('sideprog').innerHTML = `
    <strong>Plan ${ps.doneCount}/${ps.total} days</strong>
    <div class="bar"><div style="width:${planPct}%"></div></div>
    <div class="small">${ps.behind ? `<span class="hot">${ps.behind} day(s) behind</span> · ` : ''}finish ${fmtDate(ps.projectedEnd)}<br>${ps.bufferDays >= 0 ? `${ps.bufferDays} days buffer before exam` : 'past the exam date!'}</div>`;
  renderTimer();
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

function viewToday() {
  const state = derive();
  const ps = planStatus(state);
  const day = ps.current;
  session = session || loadSession();
  if (session && session.day !== day.day && session.mode !== 'revision') session = null;

  if (session && !session.ended) return renderSession(state);

  // weekly checkpoints (38 questions) run as a normal mixed session; only full papers use the mock form
  if (day.isMock && day.questionTarget >= 65) return renderMockDay(day, ps);

  const due = dueCards(state);
  const behind = ps.behind > 0
    ? `<div class="banner warn">Tum plan se <b>${ps.behind} din peeche</b> ho. Is speed se plan ${fmtDate(ps.projectedEnd)} ko khatam hoga${ps.bufferDays < 10 ? ` — exam se sirf ${Math.max(ps.bufferDays, 0)} din pehle` : ''}. Aaj time kam hai toh <b>Fallback</b> lo.</div>`
    : '';
  set(`
    ${behind}
    <section class="card hero">
      <div class="eyebrow">Day ${day.day} · ${esc(day.subject)} · ${fmtDate(day.date)}</div>
      <h1>${esc(day.title)}</h1>
      ${day.alsoCovers.length ? `<p class="muted">Isme ye bhi shamil: ${day.alsoCovers.map(esc).join('; ')}</p>` : ''}
      <p><b>Goal:</b> ${esc(day.objective)}</p>
      <div class="chips">
        <span class="chip">${day.plannedHours} h</span>
        <span class="chip">~${day.questionTarget} sawaal (adaptive)</span>
        <span class="chip">GA: ${esc(day.gaLabel)}</span>
        <span class="chip ${due.length ? 'hot' : ''}">${due.length} revision card due</span>
      </div>
      <div class="actions">
        <button class="primary" id="start">Day ${day.day} shuru karo</button>
        <button id="fallback">Fallback (50 min)</button>
        <a class="button" href="#/theory/${esc(firstTheory(day))}">Theory padho</a>
      </div>
      ${content.bySkill && sessionSkillsCount(day) === 0 ? '<p class="banner">Is din ke sawaal abhi bank me nahi hain. Revision aur GA chalenge; topic content agle update me aayega.</p>' : ''}
    </section>
    <section class="card">
      <h2>Aaj ka flow</h2>
      <ol class="flow">
        <li><b>Revision cards</b> — due cards, max 10, har card pe naya variant</li>
        <li><b>Brush-up</b> — 3 closed-book sawaal</li>
        <li><b>Today’s topic + mixed</b> — accuracy ke hisaab se target badlega</li>
        <li><b>GA</b> — ${esc(day.gaLabel)}</li>
        <li><b>Galti pe</b> — tumhare chune option ki galti, phir usi skill ka fresh variant</li>
        <li><b>Log</b> — ghante aur anxiety, phir din band</li>
      </ol>
    </section>
  `);
  document.getElementById('start').onclick = () => startSession(day, {});
  document.getElementById('fallback').onclick = () => startSession(day, { fallback: true });
}

function sessionSkillsCount(day) {
  return Object.values(content.skills).filter((s) => (s.days || []).includes(day.day)).length;
}

function firstTheory(day) {
  const s = Object.values(content.skills).find((x) => (x.days || []).includes(day.day) && x.theory);
  return s ? s.theory : '';
}

function startSession(day, opts) {
  session = newSession(day, opts);
  current = null;
  feedback = null;
  route();
}

function renderSession(state) {
  if (!current || (feedback === null && !current.q)) {
    const it = nextItem(session, state);
    current = it ? { ...it, shownAt: Date.now() } : null;
    feedback = null;
    saveSession(session);
  }
  if (!current) return renderEnd(state);
  const counts = sessionCounts(session, state);
  const t = targets(session, counts);
  const q = current.q;
  const skill = content.skills[q.skill] || {};
  const total = t.topic + t.mixed + t.ga;
  const doneMain = Math.min(counts.topic, t.topic) + Math.min(counts.mixed, t.mixed) + Math.min(counts.ga, t.ga);
  const mins = Math.floor(session.activeMs / 60000);

  set(`
    <div class="sessionbar">
      <span>Day ${session.day}${session.mode !== 'normal' ? ` · ${session.mode}` : ''}</span>
      <span>Revision ${counts.review}</span>
      <span>Main ${doneMain}/${total}</span>
      <span>Repair ${counts.repair}</span>
      <span>${mins}/${session.capMin} min</span>
      <button class="link" id="stop">Din band karo</button>
    </div>
    ${t.note ? `<div class="banner">${esc(t.note)}</div>` : ''}
    <section class="card q">
      <div class="eyebrow">${esc(current.label)} · ${esc(skill.title || q.skill)}</div>
      <div class="meta">[${esc(q.source || 'Drill')}] · ${q.type} · ${q.marks} mark${q.marks > 1 ? 's' : ''}${current.repeated ? ' · <span class="hot">repeat (fresh evidence nahi)</span>' : ''}</div>
      <div class="stem">${md(q.stem)}</div>
      ${q.figure ? `<div class="figure">${q.figure}</div>` : ''}
      <form id="answer">
        ${q.type === 'NAT'
          ? `<label class="nat">Answer <input id="nat" inputmode="decimal" autocomplete="off" placeholder="Ek number, jaise 0.25" ${feedback ? 'disabled' : ''}></label>`
          : `<div class="opts">${q.options.map((o, i) => `
              <label class="opt" data-i="${i}">
                <input type="${q.type === 'MSQ' ? 'checkbox' : 'radio'}" name="opt" value="${i}" ${feedback ? 'disabled' : ''}>
                <span class="key">${'ABCD'[i]}</span><span class="otext">${md(o.text, true)}</span>
              </label>`).join('')}</div>`}
        ${q.type === 'MSQ' ? '<p class="hint">MSQ: ek ya zyada sahi. Poora exact set chahiye.</p>' : ''}
        <div class="conf" ${feedback ? 'hidden' : ''}>
          <span>Confidence:</span>
          ${['Sure', 'Likely', 'Guess'].map((c) => `<label><input type="radio" name="conf" value="${c}"> ${c}</label>`).join('')}
        </div>
        <div class="err" id="err"></div>
        ${feedback ? '' : '<button class="primary" type="submit">Submit</button>'}
      </form>
      <div id="fb"></div>
    </section>
  `);

  document.getElementById('stop').onclick = () => {
    if (confirm('Aaj ke naye sawaal band karke log pe chalein?')) {
      session.capMin = 0;
      session.repairQueue = [];
      current = null;
      saveSession(session);
      route();
    }
  };
  if (feedback) return renderFeedback();

  document.getElementById('answer').onsubmit = (ev) => {
    ev.preventDefault();
    const err = document.getElementById('err');
    const conf = (document.querySelector('input[name=conf]:checked') || {}).value;
    let resp;
    if (q.type === 'NAT') resp = document.getElementById('nat').value;
    else resp = [...document.querySelectorAll('input[name=opt]:checked')].map((x) => Number(x.value));
    if (!conf) return (err.textContent = 'Pehle confidence chuno: Sure, Likely ya Guess.');
    const out = submit(session, current, resp, conf, Date.now() - current.shownAt);
    if (!out.valid) {
      err.textContent = q.type === 'NAT' ? 'GATE NAT me sirf ek number jaata hai (koi range, fraction ya expression nahi).' : 'Koi option chuno.';
      return;
    }
    feedback = { ...out, resp, conf };
    renderSession(derive());
  };
}

function renderFeedback() {
  const q = current.q;
  const f = feedback;
  const skill = content.skills[q.skill] || {};
  let detail = '';
  if (q.type === 'NAT') {
    if (q.type === 'NAT') document.getElementById('nat').value = f.resp;
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
    const rows = q.options.map((o, i) => {
      const picked = f.resp.includes(i);
      if (q.type === 'MCQ' && !picked && !o.correct) return '';
      const tag = o.correct ? (picked ? '✓ tumne chuna, sahi' : '✓ sahi option') : '✗ tumne chuna';
      if (q.type === 'MSQ') {
        const t = o.correct ? (picked ? '✓ chuna, sahi' : '✗ chhoot gaya (ye sahi tha)') : picked ? '✗ chuna, galat' : '✓ nahi chuna, theek';
        return `<div class="why ${(o.correct === picked) ? 'good' : 'bad'}"><b>${'ABCD'[i]} — ${t}:</b> ${md(o.why, true)}</div>`;
      }
      return `<div class="why ${o.correct ? 'good' : 'bad'}"><b>${'ABCD'[i]} — ${tag}:</b> ${md(o.why, true)}</div>`;
    });
    detail = rows.join('');
  }
  const trapTags = (f.traps || []).map((c) => `<span class="chip hot">${esc(c)} · ${esc(TRAP_CLASSES[c] || '')}</span>`).join('');
  const verdict = f.correct
    ? (f.conf === 'Guess' ? '<div class="verdict ok">Sahi — lekin Guess tha, isliye revision card bana diya.</div>' : '<div class="verdict ok">Sahi ✓</div>')
    : `<div class="verdict no">Galat ✗</div>${trapTags ? `<div class="chips">Trap: ${trapTags}</div>` : ''}`;
  const next = f.repairQueued
    ? `<p class="banner">Agla sawaal <b>isi skill ka naya variant</b> hoga. Check: ${esc(skill.check || '')}</p>`
    : f.stopSkill
      ? `<p class="banner warn">Is skill pe aaj ke repair khatam. Ye kal revision me aayegi. Pehle theory dekh lo.</p>`
      : '';
  const theory = f.showTheory && skill.theory ? `<p><a href="#/theory/${esc(skill.theory)}" target="_blank">📖 ${esc(skill.title)} — theory (new tab)</a></p>` : '';
  const fb = document.getElementById('fb');
  fb.innerHTML = `
    ${verdict}
    ${detail}
    <details ${f.correct ? '' : 'open'}><summary>Solution</summary><div class="sol">${md(q.solution)}</div></details>
    ${next}${theory}
    <button class="primary" id="next">Next →</button>`;
  typeset(fb);
  document.getElementById('next').onclick = () => {
    current = null;
    feedback = null;
    route();
  };
}

function renderEnd(state) {
  const c = sessionCounts(session, state);
  if (session.mode === 'revision') {
    session.ended = true;
    saveSession(session);
    set(`<section class="card"><h1>Revision done</h1><p>${c.review} cards reviewed today.</p><a class="button" href="#/revision">Revision cards</a></section>`);
    session = null;
    return;
  }
  const newCards = Object.values(state.cards).filter((x) => x.opened === session.date).length;
  set(`
    <section class="card">
      <div class="eyebrow">Day ${session.day} · ${timeUp(session) ? 'time cap' : 'target'} poora</div>
      <h1>Aaj ke naye sawaal band</h1>
      <div class="stats">
        <div><b>${c.attempts}</b><span>attempts</span></div>
        <div><b>${pct(c.firstPassOk, c.firstPass)}</b><span>first-pass (${c.firstPassOk}/${c.firstPass})</span></div>
        <div><b>${c.review}</b><span>revision</span></div>
        <div><b>${c.repair}</b><span>repair variants</span></div>
        <div><b>${newCards}</b><span>new cards</span></div>
      </div>
      <form id="log">
        <label>Focused ghante (breaks nahi) <input id="hours" type="number" step="0.25" min="0" max="12" value="${(session.activeMs / 3600000).toFixed(2)}"></label>
        <label>Anxiety 1–5
          <select id="anx">${[1, 2, 3, 4, 5].map((n) => `<option ${n === 3 ? 'selected' : ''}>${n}</option>`).join('')}</select>
        </label>
        <p class="hint">1 calm · 2 halki nervousness · 3 galti pe frustration, phir wapas · 4 baar baar ruk jaana · 5 aage nahi badh paaye</p>
        <label>Notes (optional) <textarea id="notes" rows="2"></textarea></label>
        <button class="primary" type="submit">Save karke din band karo</button>
      </form>
    </section>`);
  document.getElementById('log').onsubmit = (ev) => {
    ev.preventDefault();
    endSession(session, {
      hours: Number(document.getElementById('hours').value) || 0,
      anxiety: Number(document.getElementById('anx').value),
      notes: document.getElementById('notes').value.trim(),
    });
    session = null;
    sync();
    set(`<section class="card"><h1>Day closed ✓</h1><p>Progress save ho gaya. Kal ke due cards Revision tab me dikhenge.</p><a class="button" href="#/progress">Progress dekho</a></section>`);
  };
}

function renderMockDay(day, ps) {
  set(`
    <section class="card hero">
      <div class="eyebrow">Day ${day.day} · Full mock · ${fmtDate(day.date)}</div>
      <h1>${esc(day.title)}</h1>
      <ol class="flow">
        <li>180 min, exam conditions, ek baar me. Regular blocks aaj nahi.</li>
        <li>${day.officialPaperYear ? `Official GATE DA ${day.officialPaperYear} paper (PDF tumhare paas hai). Ye paper partially exposed hai — fresh evidence me nahi ginega.` : 'Fresh mixed paper. App ka mock generator agle update me aayega; tab tak koi unseen full paper use karo.'}</li>
        <li>~75 min scoring aur triage, 15 min log.</li>
      </ol>
      <form id="mock" class="grid2">
        <label>Source <input id="src" value="${day.officialPaperYear ? `GATE DA ${day.officialPaperYear}` : ''}"></label>
        <label>Fresh (pehle nahi dekha)? <select id="fresh"><option value="0" ${day.officialPaperYear ? 'selected' : ''}>No</option><option value="1" ${day.officialPaperYear ? '' : 'selected'}>Yes</option></select></label>
        <label>Net marks /100 <input id="net" type="number" step="0.01"></label>
        <label>Attempted <input id="att" type="number"></label>
        <label>Correct <input id="cor" type="number"></label>
        <label>Negative marks <input id="neg" type="number" step="0.01"></label>
        <label>Anxiety 1–5 <input id="anx" type="number" min="1" max="5" value="3"></label>
        <label>Hours <input id="hrs" type="number" step="0.25" value="4.5"></label>
        <label class="span2">Time loss / selection errors / notes <textarea id="notes" rows="3"></textarea></label>
        <button class="primary span2" type="submit">Mock save karo</button>
      </form>
    </section>`);
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
      <button class="primary" id="rev" ${due.length ? '' : 'disabled'}>Sirf revision karo (max 10, 45 min)</button>
    </section>
    <section class="card">
      <table class="tbl"><thead><tr><th>Skill</th><th>Pass</th><th>Fails</th><th>Due</th><th></th></tr></thead>
      <tbody>${active.map(row).join('') || '<tr><td colspan="5" class="muted">Abhi koi card nahi.</td></tr>'}</tbody></table>
      ${mastered.length ? `<details><summary>Mastered (${mastered.length})</summary><table class="tbl"><tbody>${mastered.map(row).join('')}</tbody></table></details>` : ''}
    </section>`);
  document.getElementById('rev').onclick = () => {
    const ps = planStatus(state);
    session = newSession(ps.current, { revisionOnly: true });
    current = null;
    location.hash = '#/today';
  };
}

// ---------- theory & recall ----------

const AREA_NAMES = { ps: 'Probability & Statistics', la: 'Linear Algebra', calc: 'Calculus & Optimization', py: 'Python & DSA', ga: 'General Aptitude' };

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

async function viewTheory(id) {
  if (id) {
    const tok = viewToken;
    set('<section class="card"><p class="muted">Loading…</p></section>');
    const r = await fetch(`data/theory/${id}.md`, { cache: 'no-cache' });
    const text = r.ok ? await r.text() : '# Not found\nIs topic ki theory abhi nahi bani.';
    if (tok !== viewToken) return;
    set(`<p><a href="#/theory">← All theory</a></p><article class="card prose">${md(text)}</article>`);
    return;
  }
  const idx = theoryIndex();
  set(`<section class="card"><h1>Theory</h1><p class="muted">Har topic ka short note: core ideas, shortcuts, traps, recall.</p></section>` +
    Object.entries(idx).map(([area, list]) => `
      <section class="card"><h2>${AREA_NAMES[area] || area}</h2><ul class="links">
        ${[...list.values()].map((e) => `<li><a href="#/theory/${esc(e.id)}">${esc(e.id)}</a> <span class="muted small">${e.days.size ? 'Day ' + [...e.days].sort((a, b) => a - b).join(', ') + ' · ' : ''}${esc(e.skills.slice(0, 3).join(' · '))}${e.skills.length > 3 ? '…' : ''}</span></li>`).join('')}
      </ul></section>`).join(''));
}

async function viewRecall() {
  set('<section class="card"><p class="muted">Recall sheet bana raha hoon…</p></section>');
  const idx = theoryIndex();
  const state = derive();
  const traps = Object.values(state.cards).filter((c) => !c.mastered)
    .map((c) => content.skills[c.skill]).filter((s) => s && s.check);
  let html = `<section class="card"><h1>Recall sheet</h1><p class="muted">Har topic ki sabse zaroori lines, aur kahan se padhna hai. Exam se pehle roz ek baar.</p></section>`;
  if (traps.length) {
    html += `<section class="card"><h2>Tumhare active traps</h2><ul>${traps.map((s) => `<li><b>${esc(s.title)}:</b> ${md(s.check, true)} <a class="small" href="#/theory/${esc(s.theory)}">theory</a></li>`).join('')}</ul></section>`;
  }
  const tok = viewToken;
  const ids = Object.values(idx).flatMap((list) => [...list.keys()]);
  const texts = Object.fromEntries(await Promise.all(ids.map(async (id) => {
    const r = await fetch(`data/theory/${id}.md`, { cache: 'no-cache' });
    return [id, r.ok ? await r.text() : null];
  })));
  if (tok !== viewToken) return;
  for (const [area, list] of Object.entries(idx)) {
    let block = '';
    for (const e of list.values()) {
      const text = texts[e.id];
      if (!text) continue;
      const m = text.match(/##\s*Recall\s*\n([\s\S]*?)(\n##\s|$)/i);
      if (!m) continue;
      const title = (text.match(/^#\s+(.+)$/m) || [, e.id])[1];
      const days = [...e.days].sort((a, b) => a - b);
      block += `<div class="recall"><h3><a href="#/theory/${esc(e.id)}">${esc(title)}</a>${days.length ? ` <span class="muted small">Day ${days.join(', ')}</span>` : ''}</h3>${md(m[1])}</div>`;
    }
    if (block) html += `<section class="card"><h2>${AREA_NAMES[area] || area}</h2>${block}</section>`;
  }
  set(html);
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
  const logs = Object.values(state.dayLogs).sort((a, b) => a.day - b.day);
  const hours = logs.reduce((s, l) => s + (l.hours || 0), 0);
  const cards = Object.values(state.cards);
  const planPct = Math.round((100 * ps.doneCount) / ps.total);

  set(`
    <section class="card hero">
      <div class="countdown"><b>${ps.daysToExam}</b><span>din exam tak (${fmtDate(ps.exam)})</span></div>
      <div class="bar"><div style="width:${planPct}%"></div></div>
      <p>Plan: <b>${ps.doneCount}/${ps.total}</b> din poore · ab Day ${ps.current.day} · ${ps.behind ? `<span class="hot">${ps.behind} din peeche</span>` : 'schedule pe'} · projected finish <b>${fmtDate(ps.projectedEnd)}</b> (${ps.bufferDays >= 0 ? ps.bufferDays + ' din buffer' : 'exam ke baad!'})</p>
    </section>
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
      ${state.mocks.length ? `<table class="tbl"><thead><tr><th>Date</th><th>Source</th><th>Fresh</th><th>Net</th></tr></thead><tbody>${state.mocks.map((m) => `<tr><td>${fmtDate(m.date)}</td><td>${esc(m.source)}</td><td>${m.fresh ? 'yes' : 'no'}</td><td><b>${m.net}</b></td></tr>`).join('')}</tbody></table>` : '<p class="muted">Abhi koi mock nahi.</p>'}
      <p class="muted small">Readiness sirf fresh 180-min papers se: pichhle 5 fresh me kitne 72+ the. Ye guarantee nahi hai.</p>
    </section>
    <section class="card">
      <h2>Day log</h2>
      <table class="tbl"><thead><tr><th>Day</th><th>Date</th><th>Hours</th><th>Anxiety</th><th>First-pass</th></tr></thead><tbody>
      ${logs.slice().reverse().map((l) => `<tr><td>${l.day}</td><td>${fmtDate(l.date)}</td><td>${l.hours ?? '—'}</td><td>${l.anxiety ?? '—'}</td><td>${l.firstPass ? pct(l.firstPassOk, l.firstPass) : '—'}</td></tr>`).join('')}
      </tbody></table>
    </section>`);
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
        ${rows.map(([c, n]) => `<tr><td><b>${esc(c)}</b> ${esc(TRAP_CLASSES[c] || '')}</td><td>${n}</td><td><div class="minibar"><div style="width:${(100 * n) / rows[0][1]}%"></div></div> ${pct(n, total)}</td></tr>`).join('')}
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
    setCfg({ token: document.getElementById('token').value.trim() });
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

// ---------- active-time clock ----------

['click', 'keydown', 'touchstart', 'scroll'].forEach((t) => window.addEventListener(t, () => (lastInput = Date.now()), { passive: true }));
setInterval(() => {
  if (!session || session.ended || !current || document.visibilityState !== 'visible') return;
  if (Date.now() - lastInput > IDLE_MS) return;
  session.activeMs += 1000;
  if (session.activeMs % 15000 === 0) saveSession(session);
  if (session.activeMs % 60000 === 0) renderTimer();
}, 1000);

// ---------- boot ----------

async function boot() {
  const store = await import('./store.js?v=202611020516');
  window.__store = store;
  main.innerHTML = '<section class="card"><p class="muted">Loading…</p></section>';
  await loadContent();
  onChange(() => { renderSync(); renderChrome(); });
  renderSync();
  document.getElementById('syncbtn').onclick = () => sync();
  window.addEventListener('hashchange', route);
  route();
  await sync();
  if (!current) route();
}

boot();

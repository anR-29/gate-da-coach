# Brief: extending the question bank (Days 22–57)

The daily sessions run out of fresh questions: a plan day needs ~32–40 questions (Seekho, 14 topic,
repairs, revision variants) but most days have 10–25. You add new questions for the skills listed in
your task, in a NEW file, plus their hints.

Read first:
1. `CONTENT_SPEC.md` — "Rules for every question", the question file format, trap classes and
   "Design patterns", and the section "Question hints". Follow them exactly.
2. The existing questions of each of your skills (in the source file named in your task) and the
   skill's `title`/`check`, and the lesson `data/learn/<theory>.md` for that skill. New questions must
   test the same skill but be clearly different from every existing one (different numbers, structure,
   context, or the other direction of the idea) — never a near-copy.

Write:
- `data/questions/<your file>.json` = `{"area": "<area>", "skills": {}, "questions": [ ... ]}`.
  `skills` stays empty: the skills already exist in the source file; use their exact ids.
- `data/hints/<your file>.json` = `{question_id: [hint1, hint2, hint3]}` for every new question
  (spec "Question hints").
- Question ids: `<skill id with "." replaced by "-">-NN`, numbering on from the highest NN that
  already exists for that skill anywhere in `data/questions/` (e.g. existing calc-limits-01..05 →
  start at calc-limits-06). Never reuse an id.

Mix for each skill's new questions: about half level 1, half level 2; marks 1 and 2 both present;
types roughly 45% MCQ, 20% MSQ, 35% NAT (code-tracing / conceptual skills may use fewer NAT).
Every wrong option has a `why` naming the mistake and a `trap` class; NATs list likely wrong values in
`traps`. Verify every answer and trap value with `python -I -c "..."` (run code, recompute numbers,
use sqlite3 for SQL) before writing it. A wrong key is worse than a missing question.

Work in chunks: after every ~8 questions rewrite both files with everything so far (earlier agents
stalled by holding everything in memory). When done run:
`python -I tools/validate.py` (must end with OK) and `python -I tools/check_hints.py <your file>`
(0 problems), and fix anything they report in your files.

Never open `analysis/`, never model anything on the GATE DA 2026 paper, never copy official papers
or books. Write only your two files.
Final report: questions added per skill, validator/checker results, anything doubtful.

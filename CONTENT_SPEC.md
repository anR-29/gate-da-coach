# Content spec: GATE DA Coach

All content is plain JSON or Markdown under `data/`. The app is static (GitHub Pages); there is no build step.

## Rules for every question

1. **Original only.** Model questions on GATE DA patterns (official papers 2024 and 2025, plus the GATE CSE style for DSA, DBMS and GA). Never copy text from official papers or GATE Overflow books. **Never model on DA 2026.** Keep it unseen.
2. **GATE format.** `MCQ` has 4 options and exactly one correct answer. `MSQ` has 4 options and one or more correct answers (exact set needed, no partial credit). `NAT` takes a numeric answer with a tolerance. Marks are 1 or 2.
3. **Every option carries its own diagnosis.** For each wrong option, `why` explains the specific mistake that produces it (the wrong step, not "this is wrong"). For each correct option, `why` explains why it holds. Distractors must come from real, named mistakes (for example cⁿ vs c, F(0.5) vs solving F(m)=0.5, wrong Bayes branch, a missed overlap, a direction reversal).
4. **NAT traps.** List the wrong values a student is likely to enter, each with its mistake (`traps`). The app matches the entered value against them.
5. **Verify every answer.** Recompute numerically (for example with `python -I -c "..."`) before writing. A wrong key is worse than a missing question.
6. **Variants.** Each `skill` needs **at least 4 questions** that test the same skill with different numbers or structure. The app serves an unseen variant of the same skill after a miss, and revision cards always use a fresh variant.
7. **Math** is written in LaTeX inside `$...$` (inline) or `$$...$$` (display), rendered by KaTeX. Escape backslashes in JSON (`"$\\lambda$"`).
8. **Language:** short, direct English. Explanations should be at most 2–3 sentences per option.
9. **Figures:** the optional `figure` field holds an inline SVG string (viewBox, no external refs, `currentColor` for strokes so it works in dark mode).

## Question file: `data/questions/<area>.json`

```json
{
  "area": "la",
  "skills": {
    "la.rank-gm": {
      "title": "Geometric multiplicity via rank",
      "subject": "Linear Algebra",
      "days": [17, 18],
      "theory": "la-eigen",
      "check": "Row reduce A − λI, count pivots; GM = n − rank."
    }
  },
  "questions": [
    {
      "id": "la-rank-gm-01",
      "skill": "la.rank-gm",
      "type": "MCQ",
      "marks": 1,
      "level": 1,
      "source": "Drill · GATE-pattern (DA-2024-Q48 style)",
      "stem": "Markdown + LaTeX",
      "figure": null,
      "options": [
        { "text": "...", "correct": false, "why": "Counted non-zero rows before reducing; rows 1 and 3 are multiples." },
        { "text": "...", "correct": true,  "why": "After R3 + R1 only one pivot remains, so rank 1 and GM = 2." }
      ],
      "answer": null,
      "traps": [],
      "solution": "2–5 short steps in Markdown."
    },
    {
      "id": "la-det-poly-03",
      "skill": "la.det-poly",
      "type": "NAT",
      "marks": 2,
      "level": 2,
      "source": "Drill · GATE-pattern",
      "stem": "...",
      "options": [],
      "answer": { "value": 100, "tol": 0 },
      "traps": [ { "value": 25, "why": "Multiplied only two transformed eigenvalues." } ],
      "solution": "..."
    }
  ]
}
```

- `id` is unique across all files: `<area>-<skill-slug>-NN`.
- `level` 1 means direct use of one idea. 2 means GATE 2-mark difficulty (two steps or a trap).
- `days` lists the plan day numbers (from `data/plan.json`) whose topic this skill belongs to. The app pulls a day's questions through this.
- `theory` is the id of a theory note (`data/theory/<id>.md`).

## Theory note: `data/theory/<id>.md`

Concise, at most about 60 lines. Structure:

```markdown
# Title
## Core ideas      (5–10 bullets, formulas in LaTeX)
## Shortcuts       (table if useful)
## Traps           (numbered; each names the mistake and the fix)
## Recall          (5–10 one-line formulas or facts; these lines are copied into the recall sheet)
```

## Areas and file names

| Area id | File | Covers |
|---|---|---|
| `ps` | `data/questions/ps.json` | Probability and Statistics (plan days 1–14) |
| `la` | `data/questions/la.json` | Linear Algebra (days 15–21) |
| `calc` | `data/questions/calc.json` | Calculus and Optimization (days 22–24) |
| `py` | `data/questions/py.json` | Python and DSA (days 25–35) |
| `ga` | `data/questions/ga.json` | General Aptitude (every day, by category) |

GA skills must use these category ids, so they match the plan's GA rotation: `ga.grammar`, `ga.reading`, `ga.numerical`, `ga.di`, `ga.reasoning`, `ga.spatial`. Set `days: []` for GA skills.

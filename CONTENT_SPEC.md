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
| `dsa` | `data/questions/dsa.json` | Data structures and algorithms (days 29–35) |
| `db` | `data/questions/db.json` | Databases and warehousing (days 36–42) |
| `ml` | `data/questions/ml.json` | Machine learning (days 43–56) |
| `ai` | `data/questions/ai.json` | Artificial intelligence (days 57–63) |

## Trap classes (optional `trap` field, from the 2024–26 predictability study)

Wrong options and NAT `traps` may carry `"trap": "C6"`. The app shows the class name in feedback and tracks which classes the student falls for.

| Code | Class |
|---|---|
| C1 | converse / missing condition / over-claim |
| C2 | swap of paired concepts (single↔complete linkage, LIFO↔FIFO, α↔β, ∪↔∩) |
| C3 | wrong neighbouring formula |
| C4 | square / scale (variance vs SD, ‖u‖ vs ‖u‖², λ vs 1/λ) |
| C5 | boundary / strictness / endpoints / support |
| C6 | counting convention / off-by-one / partial step |
| C7 | independence / prior / conditional inversion |
| C8 | structural impossibility / "always" |
| C9 | property misapplied (data structure, model, language semantics) |
| C10 | surface look-alike |
| C11 | sign / direction |

**Design patterns seen in real papers:** most MSQs have 2 correct options and some have 1 or 3; never use "all four correct" as a habit. NAT answers are often integers or probabilities in [0, 1]. Mix these naturally so that no answer pattern can be exploited.

GA skills must use these category ids, so they match the plan's GA rotation: `ga.grammar`, `ga.reading`, `ga.numerical`, `ga.di`, `ga.reasoning`, `ga.spatial`. Set `days: []` for GA skills.

## Detailed lessons: `data/learn/<id>.md`

Each theory note `data/theory/<id>.md` is a concise revision sheet. Its lesson `data/learn/<id>.md` (same id) teaches the topic **from zero** to a student who has never studied it, so they can then solve GATE-level questions. The app shows the lesson as **Samjho** and the note as **Short note**.

**Reader.** A GATE DA aspirant who knows school maths (Class 12) but not this topic. They read the lesson once (~25–40 min), then practise.

**Language.** Simple Hinglish in Roman script, the way a friendly tutor talks: Hindi sentence flow, English technical terms (`eigenvalue`, `primary key`, `gradient`). Short sentences. Explain every new term the first time it appears, in plain words, before using it. Never assume a step is obvious; show it. Example tone: "Matrix $A$ ek vector ko ghumata aur kheenchta hai. Kuch special vectors aise hote hain jo sirf kheenchte hain, ghoomte nahi — wahi eigenvectors hain."

**Length.** 1,800–3,500 words. Depth over breadth; cover everything the matching theory note and question skills test.

**Structure (use these `##` headings, in this order):**

```
# <exactly the same title as data/theory/<id>.md>

> **Time:** ~30 min · **Pehle aana chahiye:** <prerequisites in plain words, or "kuch nahi"> · **Day:** <plan days>

## Ye topic kyun?
2–4 sentences: what problem it solves, and how GATE DA tests it (question types, typical marks).

## Picture se samjho
The intuition first, 3Blue1Brown style: a concrete picture or story before any formula.
1–3 inline SVG figures (rules below). Each figure is followed by 2–4 sentences explaining what to notice.

## Concept step-by-step
Build the theory in small numbered steps (### 1. …, ### 2. …). Each step: plain-language idea → precise definition or formula → a tiny numeric example worked fully → one line "Dhyan do:" with the common confusion.
Cover every formula, rule and property in the theory note's Core ideas and Shortcuts, and say *why* it holds (a short derivation or argument, not just the statement).

## Solved examples
4–6 GATE-pattern examples, easy → hard (at least one MCQ, one MSQ, one NAT). For each:
**Example k (MCQ/MSQ/NAT, level):** the question.
**Soch:** how to recognise which idea applies (the "trigger").
**Solution:** every step, numbered, with arithmetic shown.
**Galti kahan hoti hai:** the tempting wrong answer and the exact wrong step that produces it.
All numbers verified by computation (`python -I -c "..."`). Original questions only; never copy official papers or books; never use DA 2026.

## Confusions clear karo
4–8 Q&A pairs of the form **Q:** … **A:** … for the doubts a beginner actually has (e.g. "AM aur GM me farak kya hai?", "LEFT JOIN me NULL kyun aata hai?").

## Khud try karo
3–5 short practice problems. Answers hidden:
<details><summary>Answer dekho</summary>

worked answer in Markdown

</details>

## Ek page me
A tight summary list (8–12 bullets) of what to remember, then the line:
"Revision ke liye **Short note** tab dekho."
```

**Figures (inline SVG).** Wrap each in `<figure class="fig">…<figcaption>caption</figcaption></figure>`. Put a blank line before and after the figure and **no blank lines inside it** (Markdown ends an HTML block at a blank line). Use `viewBox` and no `width`/`height`. Colours only via `currentColor` or `style="fill:var(--mark)"` / `stroke:var(--info)` / `var(--good)` / `var(--bad)` / `var(--muted)` so they work in light and dark mode. Text inside SVG: plain text and Unicode (λ, ², →, ≤); **never `$` or LaTeX inside SVG**. Keep figures simple: axes, arrows, boxes, trees, Venn diagrams, number lines, tables-as-grids. Max ~60 lines per figure. Check every coordinate makes sense (labels inside the viewBox, arrows pointing the right way).

**Math** in `$...$` / `$$...$$` as elsewhere (this is Markdown, so write single backslashes). Code in fenced blocks with a language tag (` ```python `, ` ```sql `).

**Accuracy.** Every formula, number and claim must be correct. Recompute all examples. If the theory note and the lesson disagree, the lesson is wrong until checked.

## Question hints: `data/hints/<file>.json`

Every question gets three graded hints, shown one at a time when the student taps "Atak gaye?". They are written for **this exact question** (its numbers, its options, its wording), never generic advice such as "use a simple example" or "recall the concept".

File format (one file per question file, same name, e.g. `data/hints/la.json`):

```json
{ "la-rayleigh-01": [
    "Unit vectors pe $x^TAx$ ka max matrix ke ek khaas number ke barabar hota hai — diagonal entry nahi.",
    "Max $=\\lambda_{\\max}(A)$. 2×2 ke liye $\\lambda^2-(\\text{tr})\\lambda+\\det=0$; yahan tr $=6$, det $=8$.",
    "$\\lambda^2-6\\lambda+8=0$ factor karo. Dhyan: $x=(1,1)$ seedha mat daalo — wo unit vector nahi hai."
] }
```

1. **Hint 1 — Kya notice karo.** The trigger in this question: what is really being asked and which idea it needs, pointed at the specific words, numbers or structure of the stem. No formula yet.
2. **Hint 2 — Setup / formula.** The exact formula or rule, written with this question's quantities plugged in (or the table / tree / trace to set up). For conceptual or code questions: the precise rule that decides it, applied to this case.
3. **Hint 3 — Pehla step.** Do the first real step with this question's numbers (or evaluate one option / trace the first iterations), then stop. Add the one trap most students fall into here (use the question's `traps` / wrong-option `why` texts).

Rules:
- **Never reveal the final answer**: not the NAT value, not the correct option letter(s), not "so the answer is". Hint 3 must leave at least one real step for the student.
- Simple Hinglish (Roman script), English technical terms. Each hint 1–2 short sentences (max ~35 words).
- Math in `$...$`, JSON-escaped backslashes (`\\lambda`). Every number must be correct for this question — recompute with `python -I -c "..."`.
- MSQ: hints help judge options one by one; never list which options are correct.
- GA reading questions: point to the sentence/phrase of the passage to re-read, without stating the conclusion.
- Check with `python -I tools/check_hints.py`.

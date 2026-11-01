# GATE DA Coach

A daily, adaptive practice app for GATE Data Science & AI 2027. It is a static site on GitHub Pages; progress syncs to a private GitHub repo, so the same link works on every device.

**Live:** https://anr-29.github.io/gate-da-coach/

## What it does

- **Today** follows the plan (`data/plan.json`; days 19–112 are compressed to finish by 25 Jan 2027). Each day runs: due revision cards → 3 brush-up questions → today's topic → mixed older topics → GA → log.
- **Every option is explained.** A wrong pick shows the specific mistake behind that option. NAT answers are matched against known wrong values.
- **Adaptive.** A miss queues a fresh variant of the same skill, up to 2 per skill per day, with the theory note after the second miss. Daily targets shrink below 60% first-pass accuracy and add mixed questions at 80%+. A time cap stops new questions.
- **Revision cards** are per skill, at 1/3/7/14/30-day gaps. A fail or a Guess sends the card back to 1 day, and a card is reviewed with an unseen variant.
- **Theory**, a **Recall sheet** (the Recall sections of every note plus your active traps), and **Progress** (exam countdown, plan position, accuracy by subject, cards, mocks, day log).

## Sync setup (once per device)

1. Create a fine-grained token: GitHub → Settings → Developer settings → Fine-grained tokens. Give it access to **only** `anR-29/gate-da-progress`, with **Contents: Read and write**.
2. Open the app → Settings → paste the token → Save + sync.

The token stays in that browser's localStorage. Progress is an append-only event log (`events/YYYY-MM.json`) merged by id, so devices never overwrite each other.

## Content

Question banks are in `data/questions/*.json` and theory notes are in `data/theory/*.md`. See `CONTENT_SPEC.md` for the format. All questions are original and written in the GATE pattern. No official paper or book text is included, and DA 2026 is never used as a model.

Check the banks with:

```bash
python -I tools/validate.py
```

## Run locally

```bash
python -m http.server 8765
```

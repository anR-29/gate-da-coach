"""Validate every question bank against CONTENT_SPEC.md.

Usage: python -I tools/validate.py   (run from the repo root)
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QDIR = os.path.join(ROOT, "data", "questions")
TDIR = os.path.join(ROOT, "data", "theory")


def main():
    errors, ids, total = [], set(), 0
    plan_days = {d["day"] for d in json.load(open(os.path.join(ROOT, "data", "plan.json"), encoding="utf-8"))["days"]}
    plan_days |= set(range(1, 113))
    for name in sorted(os.listdir(QDIR)):
        if not name.endswith(".json"):
            continue
        path = os.path.join(QDIR, name)
        try:
            data = json.load(open(path, encoding="utf-8"))
        except Exception as e:  # noqa: BLE001
            errors.append(f"{name}: JSON error {e}")
            continue
        skills = data.get("skills", {})
        per_skill = {k: 0 for k in skills}
        for sid, s in skills.items():
            for d in s.get("days", []):
                if d not in plan_days:
                    errors.append(f"{name}: skill {sid} has unknown day {d}")
            if s.get("theory") and not os.path.exists(os.path.join(TDIR, s["theory"] + ".md")):
                errors.append(f"{name}: skill {sid} theory '{s['theory']}' missing")
        for q in data.get("questions", []):
            total += 1
            qid = q.get("id")
            where = f"{name}:{qid}"
            if qid in ids:
                errors.append(f"{where}: duplicate id")
            ids.add(qid)
            if q.get("skill") not in skills:
                errors.append(f"{where}: unknown skill {q.get('skill')}")
            else:
                per_skill[q["skill"]] += 1
            t = q.get("type")
            if q.get("marks") not in (1, 2):
                errors.append(f"{where}: marks must be 1 or 2")
            if not q.get("stem") or not q.get("solution"):
                errors.append(f"{where}: stem/solution missing")
            if t in ("MCQ", "MSQ"):
                opts = q.get("options", [])
                n_ok = sum(1 for o in opts if o.get("correct"))
                if len(opts) != 4:
                    errors.append(f"{where}: needs 4 options")
                if t == "MCQ" and n_ok != 1:
                    errors.append(f"{where}: MCQ needs exactly one correct, has {n_ok}")
                if t == "MSQ" and n_ok < 1:
                    errors.append(f"{where}: MSQ needs at least one correct")
                for i, o in enumerate(opts):
                    if not o.get("why"):
                        errors.append(f"{where}: option {i} has no 'why'")
            elif t == "NAT":
                a = q.get("answer") or {}
                if not isinstance(a.get("value"), (int, float)):
                    errors.append(f"{where}: NAT answer.value missing")
                for tr in q.get("traps", []):
                    if not isinstance(tr.get("value"), (int, float)) or not tr.get("why"):
                        errors.append(f"{where}: bad trap {tr}")
            else:
                errors.append(f"{where}: bad type {t}")
        for sid, n in per_skill.items():
            need = 10 if sid.startswith("ga.") else 4
            if n < need:
                errors.append(f"{name}: skill {sid} has {n} questions (< {need})")
        print(f"{name}: {len(skills)} skills, {sum(per_skill.values())} questions")
    print(f"TOTAL {total} questions")
    if errors:
        print(f"{len(errors)} problem(s):")
        for e in errors:
            print("  -", e)
        sys.exit(1)
    print("OK")


if __name__ == "__main__":
    main()

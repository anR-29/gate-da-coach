"""Check data/hints/*.json against the questions (CONTENT_SPEC.md, "Question hints").

Usage: python -I tools/check_hints.py [file ...]   (from the project root; files are question
file stems such as la or ps, or part files such as ps.part1). Without arguments checks all.
Exit code 1 on errors. Missing questions are reported per file.
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
QDIR = ROOT / "data" / "questions"
HDIR = ROOT / "data" / "hints"

LEAK = re.compile(r"(answer|jawab|sahi option|correct option)\s*(is|hai|=|:)", re.I)


def questions():
    out = {}
    for f in sorted(QDIR.glob("*.json")):
        for q in json.loads(f.read_text(encoding="utf-8"))["questions"]:
            out[q["id"]] = (f.stem, q)
    return out


def num_strings(v):
    s = {repr(v), str(v)}
    if isinstance(v, float) and v.is_integer():
        s.add(str(int(v)))
    return {x for x in s if len(x.strip("-0.")) >= 1}


def check_file(path, qs):
    errs = []
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as e:  # noqa: BLE001
        return [f"{path.name}: invalid JSON ({e})"], set()
    for qid, hints in data.items():
        if qid not in qs:
            errs.append(f"{qid}: no such question")
            continue
        _, q = qs[qid]
        if not isinstance(hints, list) or len(hints) != 3 or not all(isinstance(h, str) and h.strip() for h in hints):
            errs.append(f"{qid}: needs exactly 3 non-empty strings")
            continue
        for i, h in enumerate(hints, 1):
            if len(h.split()) > 55:
                errs.append(f"{qid} hint {i}: too long ({len(h.split())} words)")
            if h.count("$") % 2:
                errs.append(f"{qid} hint {i}: odd number of $")
            if LEAK.search(h):
                errs.append(f"{qid} hint {i}: looks like it states the answer")
        if q["type"] == "NAT" and q.get("answer"):
            val = q["answer"]["value"]
            # the final value must not appear as a standalone number (small integers are allowed:
            # they often appear as inputs)
            if not (isinstance(val, (int, float)) and float(val).is_integer() and abs(val) <= 12):
                for s in num_strings(val):
                    pat = r"(?<![\d.])" + re.escape(s) + r"(?![\d])"
                    for i, h in enumerate(hints, 1):
                        if re.search(pat, h) and s not in q["stem"]:
                            errs.append(f"{qid} hint {i}: contains the NAT answer {s}")
    return errs, set(data)


def main():
    qs = questions()
    HDIR.mkdir(exist_ok=True)
    args = sys.argv[1:]
    paths = [HDIR / f"{a}.json" for a in args] if args else sorted(HDIR.glob("*.json"))
    all_errs = []
    covered = set()
    for p in paths:
        if not p.exists():
            all_errs.append(f"{p.name}: missing")
            continue
        errs, ids = check_file(p, qs)
        covered |= ids
        all_errs += errs
        print(f"{p.name}: {len(ids)} questions, {len(errs)} problems")
    if not args:
        missing = {}
        for qid, (stem, _) in qs.items():
            if qid not in covered:
                missing.setdefault(stem, []).append(qid)
        for stem, ids in missing.items():
            print(f"missing in {stem}: {len(ids)} (e.g. {', '.join(ids[:3])})")
    for e in all_errs[:80]:
        print("  ", e)
    sys.exit(1 if all_errs else 0)


if __name__ == "__main__":
    main()

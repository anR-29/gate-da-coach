"""Merge data/hints/<file>.partN.json into data/hints/<file>.json and remove the parts.

Usage: python -I tools/merge_hints.py   (from the project root)
"""
import json
import pathlib
import re

HDIR = pathlib.Path(__file__).resolve().parent.parent / "data" / "hints"

groups = {}
for p in sorted(HDIR.glob("*.part*.json")):
    groups.setdefault(re.sub(r"\.part\d+$", "", p.stem), []).append(p)

for stem, parts in groups.items():
    target = HDIR / f"{stem}.json"
    merged = json.loads(target.read_text(encoding="utf-8")) if target.exists() else {}
    for p in parts:
        merged.update(json.loads(p.read_text(encoding="utf-8")))
    target.write_text(json.dumps(merged, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    for p in parts:
        p.unlink()
    print(f"{target.name}: {len(merged)} questions from {len(parts)} parts")

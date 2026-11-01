"""Print a few random questions from a bank for manual review.

Usage: python -I tools/sample.py data/questions/ps.json [count] [seed]
"""
import json
import random
import sys

path = sys.argv[1]
n = int(sys.argv[2]) if len(sys.argv) > 2 else 4
rnd = random.Random(int(sys.argv[3]) if len(sys.argv) > 3 else 7)
data = json.load(open(path, encoding="utf-8"))
for q in rnd.sample(data["questions"], n):
    print("=" * 70)
    print(q["id"], q["type"], q["marks"], "|", q["skill"])
    print(q["stem"])
    for i, o in enumerate(q.get("options", [])):
        print(f"  {'ABCD'[i]}{'*' if o['correct'] else ' '} {o['text']}\n      why: {o['why']}")
    if q["type"] == "NAT":
        print("  ANSWER", q["answer"], "TRAPS", [(t["value"], t["why"][:70]) for t in q.get("traps", [])])
    print("  SOL:", q["solution"][:400])

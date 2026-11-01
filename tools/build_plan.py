"""Build data/plan.json from the 112-day PLAN_SNAPSHOT.json.

Days 1-18 keep their original order. Days 19-112 are compressed into
2026-11-02 .. 2027-01-24 (84 calendar days) by merging ten low-value days
into a neighbour. Usage: python -I tools/build_plan.py <PLAN_SNAPSHOT.json> <out.json>
"""
import json
import sys
from datetime import date, timedelta

GA_IDS = {
    "Grammar": "ga.grammar",
    "Reading": "ga.reading",
    "Ratios": "ga.numerical",
    "Data interpretation": "ga.di",
    "Analytical": "ga.reasoning",
    "Spatial": "ga.spatial",
}

# dropped day -> day it is merged into
MERGES = {
    81: 80,   # slow-but-correct audit joins false-certainty audit
    91: 90,   # week-13 checkpoint sits between two full mocks
    94: 87,   # duplicate ML maintenance
    98: 97,   # week-14 checkpoint sits between two full mocks
    99: 85,   # duplicate P&S maintenance
    102: 95,  # duplicate PDSA maintenance
    105: 106, # mock-104 analysis moves to the next day with P&S maintenance
    107: 93,  # duplicate LA maintenance
    110: 103, # duplicate DBMS maintenance
    112: 111, # two light days become one
}

START_FIRST = date(2026, 9, 13)   # day 1 (from the progress snapshot)
TODAY_DAY, TODAY = 18, date(2026, 11, 1)


def ga_id(text):
    for k, v in GA_IDS.items():
        if k.lower() in text.lower():
            return v
    return "ga.numerical"


def main(src, out):
    raw = json.load(open(src, encoding="utf-8"))
    raw = raw["days"] if isinstance(raw, dict) else raw
    days = {d["day"]: d for d in raw}
    merged_into = {}
    for drop, keep in MERGES.items():
        merged_into.setdefault(keep, []).append(drop)

    result = []
    seq = 0
    cur = TODAY
    for n in range(1, 113):
        if n in MERGES:
            continue
        d = days[n]
        seq += 1
        if n < TODAY_DAY:
            when = None  # already done, real dates are in the progress log
        else:
            when = cur.isoformat()
            cur += timedelta(days=1)
        title = d["title"]
        extra = [days[m]["title"] for m in sorted(merged_into.get(n, []))]
        result.append({
            "day": n,
            "seq": seq,
            "date": when,
            "week": d["week"],
            "phase": d["phase"],
            "subject": d["subject"],
            "title": title,
            "alsoCovers": extra,
            "mergedDays": sorted(merged_into.get(n, [])),
            "objective": d["objective"],
            "mode": d["mode"],
            "isMock": bool(d.get("isCheckpoint")),
            "officialPaperYear": d.get("officialPaperYear"),
            "plannedHours": d["plannedHours"],
            "questionTarget": d["questionTarget"],
            "ga": ga_id(d["ga"]),
            "gaLabel": d["ga"].replace("GA: ", ""),
            "spacedDays": [s["day"] for s in d.get("spacedTopics", [])],
            "fallback": d["fallback"],
        })

    last = result[-1]["date"]
    meta = {
        "start": START_FIRST.isoformat(),
        "compressedFrom": 112,
        "days": len(result),
        "lastDay": last,
        "examEarliest": "2027-02-06",
        "merges": {str(k): v for k, v in MERGES.items()},
    }
    json.dump({"meta": meta, "days": result}, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(len(result), "days; day 18 =", TODAY, "; last =", last)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])


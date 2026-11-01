import json, sys
d = json.load(open(sys.argv[1], encoding='utf-8'))
d = d['days'] if isinstance(d, dict) else d
print(len(d), list(d[0].keys()))
for x in d:
    m = 'MOCK' if x.get('isCheckpoint') else x['mode'][:5]
    print(f"{x['day']:>3} w{x['week']:<2} {m:<5} {x['subject'][:26]:<26} | {x['title'][:70]} | {x['ga'][4:44]} | {x['plannedHours']}h q{x['questionTarget']} {x.get('officialPaperYear') or ''}")

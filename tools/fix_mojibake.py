"""Repair UTF-8 text that was decoded as cp1252 (e.g. 'â†’' back to '→').

Usage: python -I tools/fix_mojibake.py data/questions/ai.json
Only runs of characters that round-trip cleanly are replaced.
"""
import re
import sys

RUN = re.compile("[Â-ô][\u0080-¿ŒœŠšŸŽžƒˆ˜–—‘-„†-•…‰‹›€™]{1,3}")


def fix(match):
    s = match.group(0)
    try:
        return s.encode("cp1252").decode("utf-8")
    except (UnicodeEncodeError, UnicodeDecodeError):
        return s


path = sys.argv[1]
text = open(path, encoding="utf-8").read()
new, n = RUN.subn(fix, text)
changed = sum(1 for a, b in zip(RUN.findall(text), RUN.findall(text)) if a != fix(re.match(RUN, a)))
open(path, "w", encoding="utf-8", newline="").write(new)
left = RUN.findall(new)
print(f"runs matched {n}, fixed {changed}, still suspicious {len(left)} {set(left)}")

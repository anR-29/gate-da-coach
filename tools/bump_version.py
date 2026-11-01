"""Stamp a new ?v= on every CSS/JS reference so browsers never mix old and new files.

Run before each commit that changes js/ or css/:  python -I tools/bump_version.py
All files share one version, so a module imported from two places stays one instance.
"""
import os
import re
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VERSION = time.strftime("%Y%m%d%H%M")

TARGETS = {
    "index.html": [r"(css/app\.css)(\?v=\w+)?", r"(js/app\.js)(\?v=\w+)?"],
    "tools/review.html": [r"(\.\./css/app\.css)(\?v=\w+)?", r"(\.\./js/render\.js)(\?v=\w+)?"],
}
for name in os.listdir(os.path.join(ROOT, "js")):
    if name.endswith(".js"):
        TARGETS[f"js/{name}"] = [r"""(\./[a-z]+\.js)(\?v=\w+)?(?=['"])"""]

for rel, patterns in TARGETS.items():
    path = os.path.join(ROOT, rel)
    text = open(path, encoding="utf-8").read()
    new = text
    for pat in patterns:
        new = re.sub(pat, lambda m: f"{m.group(1)}?v={VERSION}", new)
    if new != text:
        open(path, "w", encoding="utf-8", newline="").write(new)
        print("stamped", rel)
print("version", VERSION)

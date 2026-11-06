"""Check data/learn/*.md lessons against CONTENT_SPEC.md (Detailed lessons).

Usage: python -I tools/check_lessons.py   (from the project root)
Exit code 1 if any lesson has an error; missing lessons are listed as warnings.
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
THEORY = ROOT / "data" / "theory"
LEARN = ROOT / "data" / "learn"
HEADINGS = [
    "Ye topic kyun?",
    "Picture se samjho",
    "Concept step-by-step",
    "Solved examples",
    "Confusions clear karo",
    "Khud try karo",
    "Ek page me",
]


def title(text):
    m = re.search(r"^#\s+(.+)$", text, re.M)
    return m.group(1).strip() if m else None


def check(lid, text, note):
    errs = []
    if title(text) != title(note):
        errs.append(f"title {title(text)!r} != note title {title(note)!r}")
    h2 = [h.strip() for h in re.findall(r"^##\s+(.+)$", text, re.M)]
    missing = [h for h in HEADINGS if h not in h2]
    if missing:
        errs.append(f"missing headings: {missing}")
    for i, fig in enumerate(re.findall(r"<figure\b.*?</figure>", text, re.S), 1):
        if re.search(r"\n[ \t]*\n", fig):
            errs.append(f"figure {i}: blank line inside")
        if "$" in fig:
            errs.append(f"figure {i}: '$' inside")
        if "<svg" not in fig or "viewBox" not in fig:
            errs.append(f"figure {i}: no svg/viewBox")
        if re.search(r"#[0-9a-fA-F]{3,6}\b", fig):
            errs.append(f"figure {i}: hard-coded hex colour (use currentColor/var(--…))")
    if text.count("<figure") != text.count("</figure>"):
        errs.append("unbalanced <figure>")
    if text.count("<details") != text.count("</details>"):
        errs.append("unbalanced <details>")
    # $ outside code blocks and figures must pair up
    body = re.sub(r"```.*?```", "", text, flags=re.S)
    body = re.sub(r"<figure\b.*?</figure>", "", body, flags=re.S)
    body = re.sub(r"`[^`\n]*`", "", body)
    if body.replace("$$", "").count("$") % 2:
        errs.append("odd number of $ (unclosed math)")
    words = len(re.findall(r"\w+", body))
    return errs, words


def main():
    bad = 0
    missing = []
    for note_path in sorted(THEORY.glob("*.md")):
        lid = note_path.stem
        lp = LEARN / f"{lid}.md"
        if not lp.exists():
            missing.append(lid)
            continue
        errs, words = check(lid, lp.read_text(encoding="utf-8"), note_path.read_text(encoding="utf-8"))
        flag = "ok " if not errs else "ERR"
        print(f"{flag} {lid:26} {words:5} words" + ("" if not errs else "  " + "; ".join(errs)))
        bad += bool(errs)
    if missing:
        print(f"missing ({len(missing)}): {', '.join(missing)}")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()

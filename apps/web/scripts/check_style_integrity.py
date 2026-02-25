#!/usr/bin/env python3
"""Ensure stylesheet/script wiring is consistent across all HTML pages."""

from __future__ import annotations

import pathlib
import re
import sys


ROOT = pathlib.Path(__file__).resolve().parents[1]
PAGES = sorted((ROOT / "src" / "pages").glob("*.html"))

STYLESHEET_ROOT = re.compile(r'<link\s+rel="stylesheet"\s+href="/styles\.css"\s*/?>', re.IGNORECASE)
STYLESHEET_RELATIVE = re.compile(r'<link\s+rel="stylesheet"\s+href="styles\.css"\s*/?>', re.IGNORECASE)
SCRIPT_MAIN = re.compile(r'<script\s+src="/app\.js"\s+defer\s*></script>', re.IGNORECASE)


def fail(errors: list[str], page: str, message: str) -> None:
    errors.append(f"{page}: {message}")


def main() -> int:
    errors: list[str] = []

    for path in PAGES:
        text = path.read_text(encoding="utf-8")
        page = path.name

        root_matches = STYLESHEET_ROOT.findall(text)
        rel_matches = STYLESHEET_RELATIVE.findall(text)
        script_match = SCRIPT_MAIN.search(text)

        if len(root_matches) != 1:
            fail(errors, page, "expected exactly one canonical stylesheet link /styles.css")
        if rel_matches:
            fail(errors, page, "found duplicate relative stylesheet link styles.css")
        if not root_matches:
            fail(errors, page, "missing root stylesheet link /styles.css")
        if not script_match:
            fail(errors, page, "missing main script link /app.js")

        root_match = STYLESHEET_ROOT.search(text)
        if root_match and script_match and root_match.start() > script_match.start():
            fail(errors, page, "stylesheet link appears after app.js script")

    if errors:
        for error in errors:
            print(error)
        return 1

    print("style wiring: ok")
    return 0


if __name__ == "__main__":
    sys.exit(main())

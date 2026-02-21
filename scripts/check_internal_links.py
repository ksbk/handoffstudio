#!/usr/bin/env python3
"""Validate internal anchor links across static HTML pages."""

from __future__ import annotations

import html
import pathlib
import re
import sys
from urllib.parse import urlsplit


ROOT = pathlib.Path(__file__).resolve().parents[1]
ANCHOR_HREF_RE = re.compile(r"<a\b[^>]*\shref=\"([^\"]+)\"", re.IGNORECASE)
ID_RE = re.compile(r'id="([^"]+)"')
EXTERNAL_SCHEME_RE = re.compile(r"^(?:https?:|mailto:|tel:|javascript:)", re.IGNORECASE)


def load_ids(path: pathlib.Path, cache: dict[pathlib.Path, set[str]]) -> set[str]:
    if path not in cache:
        text = path.read_text(encoding="utf-8")
        cache[path] = set(ID_RE.findall(text))
    return cache[path]


def resolve_target(source: pathlib.Path, raw_href: str) -> tuple[pathlib.Path | None, str]:
    href = html.unescape(raw_href).strip()
    if not href or href.startswith("#") or EXTERNAL_SCHEME_RE.match(href):
        return None, ""

    parsed = urlsplit(href)
    target = parsed.path or source.name
    if not target:
        return None, parsed.fragment

    if target.startswith("/"):
        resolved = ROOT / target.lstrip("/")
    else:
        resolved = (source.parent / target).resolve()

    try:
        resolved.relative_to(ROOT)
    except ValueError:
        return None, parsed.fragment

    return resolved, parsed.fragment


def main() -> int:
    html_files = sorted(ROOT.glob("*.html"))
    id_cache: dict[pathlib.Path, set[str]] = {}
    errors: list[str] = []

    for page in html_files:
        text = page.read_text(encoding="utf-8")
        for raw_href in ANCHOR_HREF_RE.findall(text):
            target, fragment = resolve_target(page, raw_href)
            if not target:
                continue

            if not target.exists():
                errors.append(f"{page.name}: broken link -> {raw_href}")
                continue

            if fragment:
                ids = load_ids(target, id_cache)
                if fragment not in ids:
                    errors.append(
                        f"{page.name}: missing fragment target -> {raw_href}"
                    )

    if errors:
        for item in errors:
            print(item)
        return 1

    print("internal links: ok")
    return 0


if __name__ == "__main__":
    sys.exit(main())

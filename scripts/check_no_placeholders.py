#!/usr/bin/env python3
"""Fail on production-facing placeholder text."""

from __future__ import annotations

import pathlib
import re
import sys


ROOT = pathlib.Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", ".github", ".preview", "docs", "scripts", "node_modules", "__pycache__"}
INCLUDE_SUFFIXES = {
    ".html",
    ".css",
    ".js",
    ".json",
    ".xml",
    ".txt",
    ".svg",
    ".webmanifest",
    ".md",
    ".yml",
    ".yaml",
    ".toml",
}
INCLUDE_BASENAMES = {"_headers", "robots.txt", "sitemap.xml"}

PATTERNS = (
    (re.compile(r"\btemporary\b", re.IGNORECASE), "temporary placeholder text"),
    (re.compile(r"\.example\b", re.IGNORECASE), "example-domain placeholder"),
    (re.compile(r"hello@[a-z0-9-]+\.example", re.IGNORECASE), "placeholder email"),
    (re.compile(r"studio\.pages\.dev", re.IGNORECASE), "legacy preview domain"),
    (re.compile(r"hello@studio\.dev", re.IGNORECASE), "legacy brand email"),
    (re.compile(r"\bTODO\b", re.IGNORECASE), "TODO marker"),
    (re.compile(r"\blorem\b", re.IGNORECASE), "lorem placeholder"),
)


def should_scan(path: pathlib.Path) -> bool:
    if not path.is_file():
        return False

    rel = path.relative_to(ROOT)
    if any(part in SKIP_DIRS for part in rel.parts):
        return False

    if path.name in INCLUDE_BASENAMES:
        return True

    return path.suffix.lower() in INCLUDE_SUFFIXES


def main() -> int:
    violations: list[str] = []

    for path in sorted(ROOT.rglob("*")):
        if not should_scan(path):
            continue

        rel = path.relative_to(ROOT)
        text = path.read_text(encoding="utf-8", errors="ignore")

        for pattern, reason in PATTERNS:
            for match in pattern.finditer(text):
                line = text.count("\n", 0, match.start()) + 1
                excerpt = match.group(0)
                violations.append(f"{rel}:{line}: {reason} -> {excerpt}")

    if violations:
        for violation in violations:
            print(violation)
        return 1

    print("placeholder scan: ok")
    return 0


if __name__ == "__main__":
    sys.exit(main())

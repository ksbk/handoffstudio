#!/usr/bin/env python3
"""Lightweight secret and security hygiene scan."""

from __future__ import annotations

import pathlib
import re
import json
import sys


ROOT = pathlib.Path(__file__).resolve().parents[1]
INCLUDE_SUFFIXES = {
    ".html",
    ".css",
    ".js",
    ".json",
    ".md",
    ".txt",
    ".xml",
    ".yml",
    ".yaml",
}

PATTERNS = (
    (re.compile(r"AKIA[0-9A-Z]{16}"), "possible AWS access key"),
    (re.compile(r"ghp_[A-Za-z0-9]{36}"), "possible GitHub token"),
    (re.compile(r"xox[baprs]-[A-Za-z0-9-]{10,}"), "possible Slack token"),
    (re.compile(r"-----BEGIN (?:RSA|EC|OPENSSH|PRIVATE) KEY-----"), "private key material"),
)

BRAND_SPAN_RE = re.compile(r'<span\s+data-brand>([^<]+)</span>')
EMAIL_SPAN_RE = re.compile(r'<span\s+data-email>([^<]+)</span>')
EMAIL_LINK_RE = re.compile(r'data-email-link\s+href="mailto:([^"?]+)')


def iter_text_files() -> list[pathlib.Path]:
    files: list[pathlib.Path] = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if any(part.startswith(".") and part not in {".github"} for part in path.parts if part != "."):
            continue
        if path.suffix.lower() in INCLUDE_SUFFIXES:
            files.append(path)
    return sorted(files)


def main() -> int:
    violations: list[str] = []
    config = json.loads((ROOT / "site-config.json").read_text(encoding="utf-8"))
    expected_brand = (config.get("brand", {}).get("name") or "").strip()
    expected_email = (config.get("brand", {}).get("email") or "").strip()

    for path in iter_text_files():
        text = path.read_text(encoding="utf-8", errors="ignore")
        relative = path.relative_to(ROOT)
        for pattern, reason in PATTERNS:
            for match in pattern.finditer(text):
                violations.append(
                    f"{relative}: {reason} -> {match.group(0)[:60]}"
                )

        if path.suffix.lower() == ".html":
            for match in BRAND_SPAN_RE.findall(text):
                if expected_brand and match.strip() != expected_brand:
                    violations.append(
                        f"{relative}: fallback brand mismatch -> {match.strip()}"
                    )
            for match in EMAIL_SPAN_RE.findall(text):
                if expected_email and match.strip() != expected_email:
                    violations.append(
                        f"{relative}: fallback email mismatch -> {match.strip()}"
                    )
            for match in EMAIL_LINK_RE.findall(text):
                if expected_email and match.strip() != expected_email:
                    violations.append(
                        f"{relative}: email link mismatch -> {match.strip()}"
                    )

    if violations:
        for item in violations:
            print(item)
        return 1

    print("security/hygiene scan: ok")
    return 0


if __name__ == "__main__":
    sys.exit(main())

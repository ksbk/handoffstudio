#!/usr/bin/env python3
"""Basic render-smoke checks for static pages."""

from __future__ import annotations

import pathlib
import re
import sys


ROOT = pathlib.Path(__file__).resolve().parents[1]
PAGES = (
    "index.html",
    "services.html",
    "process.html",
    "contact.html",
    "file-sharing.html",
    "sample-delivery.html",
    "terms.html",
    "404.html",
)


def fail(errors: list[str], page: str, message: str) -> None:
    errors.append(f"{page}: {message}")


def main() -> int:
    errors: list[str] = []

    for page in PAGES:
        path = ROOT / page
        text = path.read_text(encoding="utf-8")

        if '<a class="skip-link" href="#main-content">' not in text:
            fail(errors, page, "missing skip link")
        if '<main id="main-content"' not in text:
            fail(errors, page, "missing main landmark")
        if '<header class="site-header">' not in text:
            fail(errors, page, "missing shared header")
        if '<footer class="premium-footer">' not in text:
            fail(errors, page, "missing premium footer")
        if '<link rel="stylesheet" href="/styles.css">' not in text:
            fail(errors, page, "missing root stylesheet")
        if len(re.findall(r"<h1\b", text)) != 1:
            fail(errors, page, "expected exactly one h1")

    home = (ROOT / "index.html").read_text(encoding="utf-8")
    if 'data-delivery-bundle' not in home:
        fail(errors, "index.html", "missing delivery bundle preview container")
    if 'data-services="summary"' not in home:
        fail(errors, "index.html", "missing summary services grid")

    process = (ROOT / "process.html").read_text(encoding="utf-8")
    if "data-process-grid" not in process:
        fail(errors, "process.html", "missing step timeline grid")
    if "timeline-shell" not in process:
        fail(errors, "process.html", "missing timeline shell wrapper")

    sample = (ROOT / "sample-delivery.html").read_text(encoding="utf-8")
    if "data-sample-delivery" not in sample:
        fail(errors, "sample-delivery.html", "missing sample delivery container")
    if "data-delivery-bundle" not in sample:
        fail(errors, "sample-delivery.html", "missing shared bundle preview component")
    if "mini-mock-grid" not in sample:
        fail(errors, "sample-delivery.html", "missing before/after mock grid")

    contact = (ROOT / "contact.html").read_text(encoding="utf-8")
    if 'id="privacy-note"' not in contact:
        fail(errors, "contact.html", "missing privacy-note anchor target")

    file_sharing = (ROOT / "file-sharing.html").read_text(encoding="utf-8")
    if "file-share-layout" not in file_sharing:
        fail(errors, "file-sharing.html", "missing file-sharing illustration layout")

    not_found = (ROOT / "404.html").read_text(encoding="utf-8")
    if 'meta name="robots" content="noindex,nofollow"' not in not_found:
        fail(errors, "404.html", "robots tag should be noindex,nofollow")

    if errors:
        for item in errors:
            print(item)
        return 1

    print("smoke tests: ok")
    return 0


if __name__ == "__main__":
    sys.exit(main())

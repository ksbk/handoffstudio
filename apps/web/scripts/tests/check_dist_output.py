#!/usr/bin/env python3
"""Smoke-check build output artifacts in dist/."""

from __future__ import annotations

import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
DIST = ROOT / "dist"

REQUIRED_FILES = (
    "index.html",
    "services.html",
    "process.html",
    "contact.html",
    "file-sharing.html",
    "sample-delivery.html",
    "terms.html",
    "404.html",
    "styles.css",
    "app.js",
    "site-config.json",
    "robots.txt",
    "sitemap.xml",
    "_headers",
    "_redirects",
)


def main() -> int:
    if not DIST.exists():
        print("dist smoke: missing dist/ (run npm run build first)")
        return 1

    missing = [name for name in REQUIRED_FILES if not (DIST / name).exists()]
    if missing:
        print("dist smoke: missing required files")
        for item in missing:
            print(f" - {item}")
        return 1

    print("dist smoke: ok")
    return 0


if __name__ == "__main__":
    sys.exit(main())

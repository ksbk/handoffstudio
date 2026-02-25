#!/usr/bin/env python3
"""Validate host consistency across config, canonical tags, robots, and sitemap."""

from __future__ import annotations

import json
import pathlib
import re
import sys


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


def fail(message: str) -> None:
    print(message)
    raise SystemExit(1)


def main() -> None:
    root = pathlib.Path(__file__).resolve().parents[1]
    pages_root = root / "src" / "pages"
    public_root = root / "public"
    config = json.loads((root / "src" / "site-config.json").read_text(encoding="utf-8"))
    base_url = (config.get("site", {}).get("baseUrl") or "").rstrip("/")
    if not base_url:
        fail("missing site.baseUrl in site-config.json")

    robots = (public_root / "robots.txt").read_text(encoding="utf-8")
    if f"Sitemap: {base_url}/sitemap.xml" not in robots:
        fail("robots.txt sitemap host mismatch")

    sitemap = (public_root / "sitemap.xml").read_text(encoding="utf-8")
    for loc in re.findall(r"<loc>([^<]+)</loc>", sitemap):
        if not loc.startswith(base_url + "/"):
            fail(f"sitemap host mismatch: {loc}")

    for page in PAGES:
        html = (pages_root / page).read_text(encoding="utf-8")
        match = re.search(r'rel="canonical"\s+href="([^"]+)"', html)
        if not match:
            fail(f"missing canonical tag in {page}")

        canonical = match.group(1)
        if not canonical.startswith(base_url + "/"):
            fail(f"canonical host mismatch in {page}: {canonical}")

        og_url_match = re.search(r'meta property="og:url"\s+content="([^"]+)"', html)
        if not og_url_match:
            fail(f"missing og:url in {page}")
        og_url = og_url_match.group(1)
        if not og_url.startswith(base_url + "/"):
            fail(f"og:url host mismatch in {page}: {og_url}")

        og_image_match = re.search(r'meta property="og:image"\s+content="([^"]+)"', html)
        if not og_image_match:
            fail(f"missing og:image in {page}")
        og_image = og_image_match.group(1)
        if re.match(r"^https?://", og_image) and not og_image.startswith(base_url + "/"):
            fail(f"og:image host mismatch in {page}: {og_image}")


if __name__ == "__main__":
    main()

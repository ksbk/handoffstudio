#!/usr/bin/env python3
"""Smoke-check required keys and basic types for src/site-config.json."""

from __future__ import annotations

import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
CONFIG_PATH = ROOT / "src" / "site-config.json"


def fail(message: str) -> None:
    print(message)
    raise SystemExit(1)


def require_object(parent: dict, key: str) -> dict:
    value = parent.get(key)
    if not isinstance(value, dict):
        fail(f"site-config schema: '{key}' must be an object")
    return value


def require_string(parent: dict, key: str) -> str:
    value = parent.get(key)
    if not isinstance(value, str) or not value.strip():
        fail(f"site-config schema: '{key}' must be a non-empty string")
    return value


def main() -> int:
    if not CONFIG_PATH.exists():
        fail("site-config schema: missing src/site-config.json")

    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    if not isinstance(config, dict):
        fail("site-config schema: root must be an object")

    site = require_object(config, "site")
    brand = require_object(config, "brand")
    pages = require_object(config, "pages")
    conversion = require_object(config, "conversion")

    require_string(site, "baseUrl")
    require_string(brand, "name")
    require_string(brand, "email")
    require_string(conversion, "ctaLabel")

    required_pages = ("home", "services", "process", "contact")
    for page_key in required_pages:
      page_obj = pages.get(page_key)
      if not isinstance(page_obj, dict):
          fail(f"site-config schema: pages.{page_key} must be an object")
      require_string(page_obj, "path")
      require_string(page_obj, "title")
      require_string(page_obj, "description")

    nav = config.get("nav")
    if not isinstance(nav, list) or not nav:
        fail("site-config schema: nav must be a non-empty array")

    print("config schema: ok")
    return 0


if __name__ == "__main__":
    sys.exit(main())

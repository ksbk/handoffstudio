# Architecture Proposal (Target + Implemented Phase 1)

Date: 2026-02-22

## Goals

- Keep static multi-page architecture (no framework migration).
- Keep `site-config.json` as source of truth.
- Preserve existing URLs and deployment behavior.
- Cleanly separate source, public/deploy assets, scripts, and build output.

## Proposed directory layout

```text
apps/web/
  src/
  pages/                 # all HTML source pages
  styles/
    styles.css           # canonical stylesheet source
  js/
    app.js               # runtime entry/orchestration
    config.js            # config load/merge/validate
    dom.js               # DOM helper utilities
    render/
      index.js           # renderers (payments, sla, intake, bundles, etc.)
    utils/
      safe.js            # escaping, URL/email/link safety helpers
  assets/                # icons, thumbs, illustrations, demo files
  site-config.json       # source-of-truth config

  public/
  _headers
  _redirects
  robots.txt
  sitemap.xml
  site.webmanifest
  favicon + social assets

  scripts/
  build_static_site.cjs
  sync_meta_from_config.cjs
  checks + smoke scripts
  tests/
    check_config_schema.py
    check_dist_output.py

  dist/
  # build output only (never source-of-truth)
```

## Separation rules

- **Source of truth:** only `apps/web/src/` + `apps/web/public/`.
- **Build output:** only `apps/web/dist/`; generated, disposable, not edited manually.
- **Runtime JS vs build scripts:**
  - runtime browser code in `apps/web/src/js/**`
  - node/python build/test tooling in `apps/web/scripts/**`
- **SEO metadata generation:** script updates source pages/public files prior to dist copy.

## Naming conventions

- HTML pages: kebab-case (`file-sharing.html`, `sample-delivery.html`).
- JS modules:
  - runtime modules in `apps/web/src/js/**`
  - build/check scripts in `apps/web/scripts/**`
- Python checks: `check_*.py`; smoke tests: `smoke_*.py|.sh`.
- Public files use conventional deploy names (`_headers`, `_redirects`, `robots.txt`).

## Operational flow

1. Edit source in `apps/web/src/` and `apps/web/public/`.
2. Run `npm run build`:
   - sync SEO/meta from config
  - create clean `apps/web/dist/`
   - copy source/public into deploy-ready root
  - assemble single `apps/web/dist/app.js` from modular runtime files
3. Run `make check` for static validation + smoke + schema + dist guardrails.

## Invariants (must not change)

- Public URL paths remain:
  - `/index.html`, `/services.html`, `/process.html`, `/contact.html`, `/file-sharing.html`, `/sample-delivery.html`, `/terms.html`, `/404.html`
  - `/app.js`, `/styles.css`, `/site-config.json`
- Site remains static multi-page and config-driven.
- Pages deployment consumes `apps/web/dist/` only.

## Phase 3 hardening summary (implemented)

- Extracted remaining non-render runtime concerns from `app.js` into dedicated modules:
  - `apps/web/src/js/url.js` (path/base-path/canonical/link URL utilities)
  - `apps/web/src/js/meta.js` (page metadata + canonical/OG/Twitter application)
  - `apps/web/src/js/nav.js` (nav normalization/rendering + active state + mobile menu)
  - `apps/web/src/js/ui.js` (hero variant selection/application + reveal observer)
- Kept `apps/web/src/js/app.js` as orchestration-first entrypoint, then reduced duplicated fallback implementations to thin delegates/no-op safe defaults.
- Updated runtime bundle assembly order in `apps/web/scripts/build_static_site.cjs` so foundational modules load before `app.js`:
  - `safe` → `dom` → `config` → `url` → `meta` → `nav` → `ui` → `render` → `app`
- Behavior contract preserved:
  - No URL/path changes
  - No config shape changes
  - No framework/build-system migration
- Validation after hardening:
  - `npm run build` passed
  - `make check` passed

# Enterprise Premium Audit

Date: 2026-02-18  
Scope: `/Users/ksb/dev/mysite` static multi-page studio site.

## Criteria Covered
- No placeholder branding/copy artifacts.
- No duplicate CSS loads.
- SEO/social metadata baseline.
- Static security headers baseline.
- SVG hygiene baseline.
- CI/check enforcement for regressions.

## Findings And Fixes

### P0
1. Duplicate stylesheet loading on all pages.
- Problem: every page loaded both `/styles.css` and `styles.css`, causing duplicate requests.
- Fix:
  - Removed relative fallback stylesheet from all HTML pages.
  - Kept one canonical stylesheet link: `href="/styles.css"`.
  - Updated style integrity checks to fail on duplicate/relative CSS links.
- Files:
  - `/Users/ksb/dev/mysite/index.html`
  - `/Users/ksb/dev/mysite/services.html`
  - `/Users/ksb/dev/mysite/process.html`
  - `/Users/ksb/dev/mysite/contact.html`
  - `/Users/ksb/dev/mysite/file-sharing.html`
  - `/Users/ksb/dev/mysite/sample-delivery.html`
  - `/Users/ksb/dev/mysite/terms.html`
  - `/Users/ksb/dev/mysite/404.html`
  - `/Users/ksb/dev/mysite/scripts/check_style_integrity.py`
  - `/Users/ksb/dev/mysite/scripts/smoke_test_site.py`

2. Missing dedicated placeholder guard.
- Problem: placeholder checks were mixed into another script and not explicit for CI criteria.
- Fix:
  - Added `scripts/check_no_placeholders.py`.
  - Fails on configured placeholder tokens, placeholder emails, `TODO`, and `lorem` in production-facing files.
  - Wired into `make check` and npm check path.
- Files:
  - `/Users/ksb/dev/mysite/scripts/check_no_placeholders.py`
  - `/Users/ksb/dev/mysite/Makefile`
  - `/Users/ksb/dev/mysite/package.json`

3. Base-path readiness for internal links/canonicals.
- Problem: internal path handling was root-only and not config-driven.
- Fix:
  - Added `site.basePath` to config (default `/`).
  - Added JS helpers to normalize/prefix internal paths and canonical resolution.
  - Applied base-path aware behavior to nav links, intake links, and canonical generation.
- Files:
  - `/Users/ksb/dev/mysite/site-config.json`
  - `/Users/ksb/dev/mysite/app.js`

### P1
1. SEO + social baseline enforcement.
- Status: already present and retained across all pages.
- Verification:
  - Unique title and unique meta description checks enforced in `make check`.
  - Canonical + OG + Twitter tags verified in existing SEO checks.
- Files:
  - `/Users/ksb/dev/mysite/Makefile`
  - `/Users/ksb/dev/mysite/*.html`
  - `/Users/ksb/dev/mysite/robots.txt`
  - `/Users/ksb/dev/mysite/sitemap.xml`

2. Security header baseline checks.
- Status: `_headers` already present; enforcement strengthened.
- Fix:
  - Added checks for `Permissions-Policy` and `X-Frame-Options` in `make check`.
- Files:
  - `/Users/ksb/dev/mysite/_headers`
  - `/Users/ksb/dev/mysite/Makefile`

### P2
1. SVG hygiene pass.
- Fixes:
  - Standardized decorative icon SVG roots with `viewBox`, `aria-hidden="true"`, and `focusable="false"`.
  - Updated icon strokes to use `currentColor` where appropriate.
  - Added `focusable="false"` to decorative inline timeline connector.
  - Added npm `svgo` script with a graceful manual fallback when `svgo` is not installed.
- Files:
  - `/Users/ksb/dev/mysite/assets/icons/*.svg`
  - `/Users/ksb/dev/mysite/process.html`
  - `/Users/ksb/dev/mysite/package.json`

## Validation Run
- `npm run lint` -> pass
- `npm run test` -> pass
- `npm run check` -> pass
- `make check` -> pass
- `npm run svgo` -> reports manual install message (no local `svgo` binary available)

## Notes
- Host strategy remains static-root friendly (Cloudflare Pages shape), with `basePath` support for internal links/canonicals now available through config.
- Placeholder scanning is intentionally scoped to production-facing content files and excludes internal tooling/docs folders to avoid false positives from rule definitions themselves.

## Post-Review Visual Polish
- Implemented headline wrap control and hierarchy tuning:
  - Balanced wrapping and wider desktop headline measure.
  - Slightly reduced desktop hero headline scale for cleaner two-line outcomes.
  - Files: `/Users/ksb/dev/mysite/styles.css`.
- Reduced CTA repetition in-view:
  - Hid desktop header CTA on `home` and `contact` where primary in-page CTA already exists.
  - Footer primary CTA hidden on non-home/non-contact pages (email fallback remains).
  - Converted secondary section CTAs to contextual wording (`Open intake form`, `Open intake checklist`, `Start intake`).
  - Files: `/Users/ksb/dev/mysite/styles.css`, `/Users/ksb/dev/mysite/services.html`, `/Users/ksb/dev/mysite/process.html`, `/Users/ksb/dev/mysite/file-sharing.html`, `/Users/ksb/dev/mysite/sample-delivery.html`.
- Tightened card readability consistency:
  - Raised muted/body-card contrast, standardized card padding scale, and normalized list spacing.
  - Files: `/Users/ksb/dev/mysite/styles.css`.

## Final Ship-Gate Hardening
- Clickjacking and transport header baseline strengthened:
  - Kept `frame-ancestors 'none'` at header level in `/_headers` and enforced in checks.
  - Added `Strict-Transport-Security` and enforced in checks.
  - Files: `/Users/ksb/dev/mysite/_headers`, `/Users/ksb/dev/mysite/Makefile`.
- Build and asset integrity normalized:
  - Added static build script and `dist/` output pipeline.
  - Added deterministic asset-reference checker for all HTML `src`/`href` local paths.
  - Files: `/Users/ksb/dev/mysite/scripts/build_static_site.cjs`, `/Users/ksb/dev/mysite/scripts/check_asset_refs.cjs`, `/Users/ksb/dev/mysite/package.json`.
- E2E suite expanded to release-grade scenarios:
  - Added routing/nav/footer/404, variant A/B hygiene, delivery bundle credibility, no-JS fallback, accessibility smoke, responsive screenshot gates, and explicit security-header baseline scenario.
  - Outputs screenshots to `/Users/ksb/dev/mysite/tests/artifacts`.
  - Files: `/Users/ksb/dev/mysite/scripts/final_launch_checks.cjs`.
- Screenshot workflow made environment-resilient:
  - Localhost capture remains primary for fidelity.
  - Added random free-port binding and inline-render fallback when local server binding is unavailable.
  - Files: `/Users/ksb/dev/mysite/scripts/capture_screenshots.cjs`.
- Hero wrapping stability made variant-aware:
  - Home hero wrap constraints now keyed to `data-hero-variant` to avoid drift across copy variants.
  - Files: `/Users/ksb/dev/mysite/styles.css`.
- CI quality gate upgraded:
  - Added `npm ci`, `npm run build`, and a Lighthouse CI job with baseline assertions.
  - Files: `/Users/ksb/dev/mysite/.github/workflows/ci.yml`, `/Users/ksb/dev/mysite/.lighthouserc.json`.

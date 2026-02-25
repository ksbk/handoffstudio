# Handoff Studio Web App (apps/web)

This directory contains the static Cloudflare Pages website.

Runbook and launch operations live in [../../docs/LAUNCH_RUNBOOK.md](../../docs/LAUNCH_RUNBOOK.md).
UX review artifacts live in:
- [docs/UX_AUDIT.md](/Users/ksb/dev/mysite/apps/web/docs/UX_AUDIT.md)
- [docs/UX_SELF_EVAL.md](/Users/ksb/dev/mysite/apps/web/docs/UX_SELF_EVAL.md)
- Screenshot evidence: [/Users/ksb/dev/mysite/apps/web/tests/artifacts/ui-audit/](/Users/ksb/dev/mysite/apps/web/tests/artifacts/ui-audit/)

## Current Stack

- HTML (semantic, accessible page structure)
- CSS (single design system stylesheet)
- JavaScript (config loading + progressive enhancement + dynamic sections)
- Config source of truth: `/src/site-config.json`

## Pages

- `/index.html` - landing page
- `/services.html` - productized offers + scope boundaries
- `/process.html` - 3-step workflow (Send -> Plan -> Deliver)
- `/contact.html` - intake CTA + email fallback + privacy note
- `/sample-delivery.html` - synthetic before/after + change-log handoff sample
- `/file-sharing.html` - safe file-sharing steps before intake
- `/terms.html` - baseline scope and delivery terms
- `/404.html` - not-found recovery page

## How Content Is Managed

All brand/content variants are controlled from `/src/site-config.json`:

- config metadata (`schemaVersion`, `updatedAt`, `source`) + brand id
- site host strategy (`site.baseUrl`) for canonical URLs
- brand name, tagline, email
- nav page IDs (resolved through `pages`)
- page metadata (title, description, canonical, OG tags)
- CTA label + intake primary URL + fallback email
- service cards and scope boundaries
- package ranges
- process steps
- proof tiles
- FAQ items
- sample delivery page content
- file-sharing page metadata
- privacy and metadata-hygiene notes

`/src/js/app.js` (bundled to `/app.js` at build) updates brand/CTA content and renders dynamic sections from config.
Header/footer stay in raw HTML so nav and primary CTA work even when JavaScript is disabled.

## Scope

- Web app only (no backend runtime in this directory)
- Build command: `npm run build`
- Build output: `dist/`

## Local Preview

```bash
cd <repo-root>/apps/web
npm run build
python3 -m http.server 8080 --directory dist
```

Open [http://localhost:8080/index.html](http://localhost:8080/index.html).

Use `make tree` for a git-aware tree view that excludes generated/dependency directories.

Run `make check` to validate:

- JS/JSON syntax (`npm run check:syntax`)
- header/footer shell consistency across pages
- SEO + social + security meta tags
- host consistency (`site.baseUrl` vs canonical/sitemap/robots)
- internal links + fragment targets
- placeholder/security hygiene scan
- smoke rendering checks (`h1`, landmarks, core containers)

Run `make test` for smoke tests only.

Pre-deploy gate (build + `dist/_headers` check + double E2E run):

```bash
npm run gate:predeploy
```

Deployed smoke (run against the live URL):

```bash
npm run smoke:deployed -- https://handoffstudio.com
```

The deployed smoke check follows redirects, validates security headers on the final response, verifies key page status codes (`200`/`404`), and confirms `/social-preview.png` is reachable.

## Browser-Accurate Screenshots

Preview screenshots are generated with Playwright (Chromium), not Quick Look thumbnails.

Install browser runtime once:

```bash
npm install
npm run screenshots:install
```

Generate screenshots:

```bash
make previews
```

Outputs are written to `.preview/*.png` and include real CSS/JS/assets rendering.
If localhost binding is unavailable in your environment, the screenshot script falls back to inline rendering mode.

## Hero Variant Testing

- `?v=a` or `?v=b` sets and persists the hero copy variant on Home.
- `?v=reset` clears persisted variant and returns to the default.
- Variant query params are removed from the URL after selection to avoid share/index drift.

## CI

GitHub Actions workflow:

- `/.github/workflows/ci.yml` runs `npm run build` + `make check` on push and pull request.
- A Lighthouse CI job runs against `dist/` with baseline thresholds for performance, accessibility, best-practices, SEO, and CLS.

## Security Headers

- Cloudflare Pages headers are configured in `/public/_headers` (copied to `dist/_headers` at build) with CSP (`frame-ancestors 'none'`), HSTS, referrer policy, permissions policy, and anti-MIME/clickjacking headers.

## Future Django Plan

Recommended separation when backend starts:

- keep this static marketing surface isolated
- add Django backend in a dedicated folder/repo (leads, admin, email workflows, portal)

This avoids coupling Cloudflare Pages deploys with backend release cycles.

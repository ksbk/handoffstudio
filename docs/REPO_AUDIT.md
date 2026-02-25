# Repository Audit — handoffstudio

Date: 2026-02-22
Scope: Full repo audit + incremental refactor safety review for static multi-page architecture.

## 1) Current structure snapshot

```text
.
├── src/
│   ├── pages/            # HTML source (multi-page)
│   ├── styles/           # canonical stylesheet source
│   ├── js/               # runtime JS source (modular)
│   ├── assets/           # images/icons/demo assets
│   └── site-config.json  # source of truth content/config
├── public/               # deploy-root static files (headers, redirects, robots, manifest, favicons)
├── scripts/              # build + checks + smoke + launch scripts
│   └── tests/            # new guardrail tests
├── dist/                 # build output only
├── docs/
├── tests/
├── Makefile
└── package.json
```

## 2) What was messy before cleanup

- Source/build coupling: root mixed source and deploy artifacts, making `dist/` easy to treat as source.
- Path coupling: many checks/scripts hardcoded to root HTML/config file paths.
- Runtime monolith: `app.js` mixed config loading, DOM helpers, rendering, URL/meta logic, and utility concerns.
- Guardrail gap: no explicit config schema smoke test; no explicit dist required-files smoke test.
- Operational drift risk: screenshots/e2e did not consistently target built output.

## 3) Security review

### Headers / CSP baseline

- `public/_headers` retains baseline protections (CSP, frame protection, HSTS, referrer policy, permissions policy, content-type options).
- No CSP tightening was introduced in this refactor (per requirement).

### External links and runtime output

- Payment links still enforce `target="_blank" rel="noopener noreferrer"` for external URLs.
- Rendering pipeline continues to escape dynamic string content before injection (`escapeHtml` utility used by renderers).
- Config-driven links are filtered through URL usability checks before rendering.

### Injection/DOM write risks in runtime

- `innerHTML` is still used for component rendering, but content is escaped through shared utility and constrained to expected config shape.
- New config schema validation is intentionally lightweight (smoke-level), reducing malformed-config risk without adding dependencies.
- Recommendation (future): move high-risk render surfaces to DOM node creation for defense-in-depth.

## 4) Build/deploy review

- Build now explicitly copies from `src/` and `public/` into `dist/`.
- Runtime output remains URL-compatible (`/app.js`, `/styles.css`, existing HTML paths unchanged).
- Build process keeps SEO sync (`sync_meta_from_config.cjs`) before output generation.
- Screenshots and e2e scripts now target built site output (`dist/`) for deployment parity.

## 5) Top 10 refactor opportunities (impact vs effort)

1. **Centralize path constants across scripts** — High impact / Low effort
2. **Replace string-built `innerHTML` with DOM builders in critical cards** — High / Medium
3. **Add stricter schema validation (enum/range checks)** — High / Medium
4. **Split large `src/js/app.js` further (nav/meta/url modules)** — Medium-High / Medium
5. **Add CI step for `npm run build && make check && npm run test:e2e`** — High / Low
6. **Add broken-asset checker into `make check` by default** — Medium / Low
7. **Introduce contract tests for generated SEO tags from config** — Medium / Medium
8. **Create shared script helpers (Python + Node) for page list sync** — Medium / Low
9. **Document deployment invariants for Pages in runbook** — Medium / Low
10. **Add optional local pre-commit hooks for syntax/smoke checks** — Medium / Low

## 6) Risk status after this refactor

- **Deployment compatibility:** preserved (static multi-page output and URL paths unchanged).
- **Behavior compatibility:** preserved via `npm run build && make check` validation.
- **Maintainability:** improved via source/public separation + initial runtime modularization.

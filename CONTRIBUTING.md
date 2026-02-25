# Contributing

## Basics

- Keep website behavior unchanged unless explicitly requested.
- Never commit secrets, credentials, or private keys.
- Do not include PII in issues, PRs, screenshots, or fixtures.

## Before Opening a PR

From repo root:

```bash
make check
cd apps/web && npm run build
```

## Coding Expectations

- Keep changes scoped and minimal.
- Preserve Cloudflare Pages build contract (`npm run build` -> `dist/`).
- Update docs when paths or operational steps change.

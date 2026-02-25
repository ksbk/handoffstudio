# handoffstudio monorepo

## Layout

- `apps/web` — static Cloudflare Pages site (build output: `dist/`)
- `apps/backend` — placeholder for future Django backend
- `docs` — product, launch, and architecture documentation
- `infra` — infrastructure notes and templates
- `.github` — CI workflows

## Quick Commands

From repo root:

- `make build` — runs web build (`npm run build` in `apps/web`)
- `make check` — runs web checks
- `make tree` — prints a filtered monorepo root tree (hides cache/build/dependency dirs)
- `make test` — runs web smoke tests
- `make clean` — removes generated web artifacts

Directly in web app:

```bash
cd apps/web
npm ci
npm run build
make check
```

Fast build-only path:

```bash
cd apps/web && npm ci && npm run build
```

Optional local prepush helper:

```bash
cd apps/web && bash scripts/prepush.sh
```

Cloudflare Pages settings remain:

- Build command: `npm run build`
- Output directory: `dist`
- Project root directory: `apps/web`

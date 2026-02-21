# Handoff Studio Cloudflare Pages Launch Runbook

Last updated: 2026-02-21
Project root: `/Users/ksb/dev/mysite`
Production domain: `handoffstudio.com`

## 1) Repo Readiness (Cloudflare Pages)

Required and present:
- Build command exists in `/Users/ksb/dev/mysite/package.json`:
  - `"build": "node scripts/build_static_site.cjs"`
- Build creates static output in `/Users/ksb/dev/mysite/dist` (from `/Users/ksb/dev/mysite/scripts/build_static_site.cjs`)
- No runtime secrets are required for site rendering (static site + config-driven JS)

Pre-launch gate:
```bash
cd /Users/ksb/dev/mysite
npm run build && make check
```

Expected: `build: ok` and `checks: ok`.

## 2) Cloudflare Pages Setup

1. Cloudflare Dashboard -> Workers & Pages -> `Create project`.
2. Connect GitHub repo.
3. Configure build:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy.

## 3) Custom Domains

Attach:
- `handoffstudio.com` (apex)
- `www.handoffstudio.com`

Redirect:
- Redirect `www` -> `https://handoffstudio.com` with `301` (Bulk Redirects or Redirect Rules).

## 4) DNS Records

Verify records point to Pages target (`<your-project>.pages.dev`):
- `@` -> CNAME to `<your-project>.pages.dev` (Cloudflare proxied; flattened at apex)
- `www` -> CNAME to `<your-project>.pages.dev` (proxied)

Validate:
```bash
curl -sSIL https://handoffstudio.com | sed -n '1,20p'
curl -sSIL https://www.handoffstudio.com | sed -n '1,30p'
```

Expected:
- Apex returns `200`
- `www` returns `301` to apex

## 5) Post-Deploy Verification Checklist

- [ ] Home/services/process/contact load on apex domain.
- [ ] `www` redirects to apex.
- [ ] `https://handoffstudio.com/robots.txt` is reachable and contains:
  - `Sitemap: https://handoffstudio.com/sitemap.xml`
- [ ] `https://handoffstudio.com/sitemap.xml` is reachable and all `<loc>` values use `https://handoffstudio.com/...`.
- [ ] Canonical and social meta are correct (`handoffstudio.com`) on page source.
- [ ] Contact flow works:
  - `mailto:hello@handoffstudio.com` opens from contact CTA
  - copy intake template button works
- [ ] Run deployed smoke:

```bash
cd /Users/ksb/dev/mysite
npm run smoke:deployed -- https://handoffstudio.com
```

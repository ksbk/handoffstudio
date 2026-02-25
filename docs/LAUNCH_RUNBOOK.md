# Handoff Studio Cloudflare Pages Launch Runbook

Last updated: 2026-02-21
Project root: `/Users/ksb/dev/mysite`
Web app root: `/Users/ksb/dev/mysite/apps/web`
Production domain: `handoffstudio.com`

## 1) Repo Readiness (Cloudflare Pages)

Required and present:
- Build command exists in `/Users/ksb/dev/mysite/apps/web/package.json`:
  - `"build": "node scripts/build_static_site.cjs"`
- Build creates static output in `/Users/ksb/dev/mysite/apps/web/dist` (from `/Users/ksb/dev/mysite/apps/web/scripts/build_static_site.cjs`)
- No runtime secrets are required for site rendering (static site + config-driven JS)

Pre-launch gate:
```bash
cd /Users/ksb/dev/mysite/apps/web
npm run build && make check
```

Expected: `build: ok` and `checks: ok`.

## 2) Cloudflare Pages Setup

Pages settings:
- Root directory: `apps/web`
- Build command: `npm run build`
- Output directory: `dist`

1. Cloudflare Dashboard -> Workers & Pages -> `Create project`.
2. Connect GitHub repo.
3. Configure build:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy.

Note: production `www -> apex` forwarding is already configured via Cloudflare Page Rule.

## 3) Custom Domains

Attach:
- `handoffstudio.com` (apex)
- `www.handoffstudio.com`

Redirect (required for reliable host-level redirect):
- Preferred path (current production setup): `Rules` -> `Page Rules` -> `Create Page Rule`
  - URL pattern: `www.handoffstudio.com/*`
  - Setting: `Forwarding URL`
  - Status code: `301 - Permanent Redirect`
  - Destination URL: `https://handoffstudio.com/$1`
  - Save and deploy.
- Alternative path (if visible in your account UI): `Rules` -> `Redirect Rules` -> `Create rule`
  - Rule name: `www-to-apex`
  - Condition: `Hostname` `equals` `www.handoffstudio.com`
  - Action: `Dynamic redirect`
  - Status: `301`
  - Destination URL: `https://handoffstudio.com${uri}`

Note:
- `_redirects` in the repo is kept for static deploy compatibility, but it may not enforce domain-level host redirects in Cloudflare Pages. Use Page Rules (or Redirect Rules if available) for `www -> apex`.

Status:
- `COMPLETE` (production redirect active via Cloudflare Page Rule API; rule id `0d3df59fd5c9fc128fd78ef61493da24`).

Cloudflare API commands used (record for repeatability):
```bash
# 1) Resolve zone id for handoffstudio.com
CF_API_TOKEN="<token with Zone:Read + Page Rules:Edit>"
curl -sS "https://api.cloudflare.com/client/v4/zones?name=handoffstudio.com" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json"

# 2) Create the www -> apex forwarding page rule
CF_ZONE_ID="<zone_id_for_handoffstudio.com>"
curl -sS -X POST "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/pagerules" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "targets":[
      {
        "target":"url",
        "constraint":{"operator":"matches","value":"www.handoffstudio.com/*"}
      }
    ],
    "actions":[
      {
        "id":"forwarding_url",
        "value":{"url":"https://handoffstudio.com/$1","status_code":301}
      }
    ],
    "priority":1,
    "status":"active"
  }'
```

## 4) DNS Records

Verify records point to Pages target (`<your-project>.pages.dev`):
- `@` -> CNAME to `<your-project>.pages.dev` (Cloudflare proxied; flattened at apex)
- `www` -> CNAME to `<your-project>.pages.dev` (proxied)

Validate:
```bash
curl -sSIL https://handoffstudio.com | sed -n '1,20p'
curl -sSIL https://www.handoffstudio.com | sed -n '1,30p'
curl -sSIL https://www.handoffstudio.com/contact | sed -n '1,30p'
```

Verification snippet (expected first-hop redirect):
```bash
curl -sSIL https://www.handoffstudio.com/contact | sed -n '1,12p'
# expect:
# HTTP/2 301
# location: https://handoffstudio.com/contact
```

Expected:
- Apex returns `200`
- `www` returns `301` to apex
- `www/contact` resolves to apex contact URL

## 5) Cloudflare Email Routing (hello@handoffstudio.com)

Dashboard path:
- Cloudflare Dashboard -> `handoffstudio.com` -> `Email` -> `Email Routing`

Setup steps:
1. Click `Get started` (or `Enable Email Routing`).
2. In `Destination addresses`, click `Add destination address` and enter your private inbox.
3. Verify destination inbox ownership from the confirmation email.
4. In `Custom addresses`, click `Create address`:
   - Address: `hello`
   - Action: `Send to`
   - Destination: your verified private inbox
5. Save and confirm the route `hello@handoffstudio.com -> <your-private-inbox>`.

Quick validation:
```bash
# send a test email from another mailbox and verify it arrives
```

## 6) Post-Deploy Verification Checklist

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
cd /Users/ksb/dev/mysite/apps/web
npm run smoke:deployed -- https://handoffstudio.com
```

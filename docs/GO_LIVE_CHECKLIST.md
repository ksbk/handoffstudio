# Go-Live Checklist (Handoff Studio)

## 1) Domain + HTTPS + Redirect
- [ ] `handoffstudio.com` is connected in Cloudflare Pages.
- [ ] HTTPS is active on apex.
- [ ] `www` redirects to apex (`301`).

Commands:
```bash
curl -sSIL https://handoffstudio.com | sed -n '1,20p'
curl -sSIL https://www.handoffstudio.com | sed -n '1,30p'
```

## 2) Robots + Sitemap
- [ ] `robots.txt` is reachable and points to the correct sitemap.
- [ ] `sitemap.xml` is reachable and contains only `https://handoffstudio.com/...` URLs.

Files:
- `/Users/ksb/dev/mysite/robots.txt`
- `/Users/ksb/dev/mysite/sitemap.xml`

Commands:
```bash
curl -sS https://handoffstudio.com/robots.txt
curl -sS https://handoffstudio.com/sitemap.xml | rg "handoffstudio.com"
```

## 3) Contact Flow Works
- [ ] Contact page loads: `https://handoffstudio.com/contact.html`.
- [ ] Primary CTA opens mailto draft to `hello@handoffstudio.com` with intake subject/body.
- [ ] "Copy intake template" button works.

Files (source of truth):
- `/Users/ksb/dev/mysite/site-config.json` (`intake.emailTo`, `intake.emailSubject`, `intake.emailBodyTemplate`)
- `/Users/ksb/dev/mysite/contact.html` (`data-intake-link`, `data-intake-template`)

## 4) Payment Links Visible + Correct
- [ ] `site-config.json` has real payment URLs (no placeholders).
- [ ] Payment section renders on home/services/contact.
- [ ] Links open correct checkout pages.

Files:
- `/Users/ksb/dev/mysite/site-config.json` (`payments.methods[*].url`)
- `/Users/ksb/dev/mysite/index.html` (`data-payments`)
- `/Users/ksb/dev/mysite/services.html` (`data-payments`)
- `/Users/ksb/dev/mysite/contact.html` (`data-payments`)

Commands:
```bash
rg -n "PAYMENT_LINK_" /Users/ksb/dev/mysite/site-config.json /Users/ksb/dev/mysite/dist/site-config.json
```
Expected: no matches.

## 5) Smoke Checks
- [ ] Local checks pass.
- [ ] Deployed header/security smoke passes.

Commands:
```bash
cd /Users/ksb/dev/mysite
npm run build && make check
npm run smoke:deployed -- https://handoffstudio.com
```

## 6) Outreach Execution (Day 1)
- [ ] Post in 3 groups.
- [ ] Send 40–80 DMs.
- [ ] Send one follow-up after 6–12h.

Group post:
```text
I’m taking same-day Spreadsheet Rescue requests this week.
Broken Excel/Google Sheets, messy data, pivots, dashboards — I fix it fast.
Pricing: $49 / $149 / $399 with a simple guarantee: if I can’t fix it, you pay $0.
Start here: https://handoffstudio.com/contact
```

DM script:
```text
Quick question — do you have any Excel/Sheets that need fixing or cleaning?
I do same-day rescue ($49 / $149 / $399). If it’s not solvable, you pay $0.
Start here: https://handoffstudio.com/contact
```

Follow-up script:
```text
Want me to quote this now? If you send the file link + what’s wrong, I can start today.
```

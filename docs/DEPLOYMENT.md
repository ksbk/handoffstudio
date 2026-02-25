# Deployment (Cloudflare Pages)

## Prerequisites

- GitHub repository connected to Cloudflare Pages
- `index.html` present at repository root
- `site-config.json` configured with production brand and intake URL

## Pages Configuration

- Framework preset: None
- Build command: (empty)
- Build output directory: `/`

## Deploy Checklist

1. Push branch to GitHub.
2. Trigger Cloudflare Pages deploy.
3. Verify page routing for:
   - `/index.html`
   - `/services.html`
   - `/process.html`
   - `/contact.html`
   - `/sample-delivery.html`
   - `/file-sharing.html`
4. Confirm CTA target resolves to live intake URL.
5. Confirm brand email is correct in footer/contact page.
6. Set `site.baseUrl` in `site-config.json` to `https://handoffstudio.com`.
7. Verify `/robots.txt` and `/sitemap.xml` are accessible and use the same host.

## Post-Deploy Validation

- Mobile and desktop visual check
- CTA consistency check across pages
- Accessibility smoke test (keyboard nav + focus visibility)

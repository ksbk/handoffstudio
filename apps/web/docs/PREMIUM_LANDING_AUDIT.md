# Premium Landing Page Audit — Handoff Studio

Audit date: 2026-02-22
Auditor: self-audit against enterprise service landing page rubric
Scope: `apps/web/src/pages/index.html` · `apps/web/src/styles/styles.css` · `apps/web/src/site-config.json`

---

## Rubric Scorecard

| # | Dimension | Before P0 | After P0 | Evidence |
|---|-----------|-----------|----------|----------|
| 1 | Brand tone & visual polish | 3/5 | 4/5 | Dark/amber system was solid; hero eyebrow now carries value prop instead of brand name |
| 2 | Hierarchy & readability | 3/5 | 4/5 | Subhead now adds a distinct dimension (process + guarantee) instead of re-stating H1 |
| 3 | Layout system | 3/5 | 4/5 | Pricing grid is explicit 3-col with defined responsive collapse; trust bar uses flex + wrap |
| 4 | Conversion clarity | 2/5 | 4/5 | Static pricing cards always visible; featured middle tier with gold border; price signal early |
| 5 | Trust layer | 3/5 | 4/5 | Dedicated 4-pillar full-width trust bar under hero; pillars with icon + title + description |
| 6 | Mobile-first execution | 3/5 | 4/5 | Pricing collapses to 1-col at 980px; trust pillars wrap to 2-col grid; trust dividers hidden |
| 7 | Accessibility | 4/5 | 4/5 | `<article>` for pricing cards; `aria-label` on trust bar; no regressions |
| 8 | Performance hygiene | 4/5 | 4/5 | Pricing is pure HTML/CSS (no new assets); SVG trust icons `loading=lazy` |
| 9 | Content strategy | 2/5 | 3/5 | Pricing context visible on first scroll; trust bar reduces need to parse long anchor line |
| 10 | Competitive parity | 2/5 | 3.5/5 | Pricing cards + trust bar meet agency-tier baseline; missing testimonials and proof metrics |

**Total before P0: 29/50 → After P0: 38.5/50 (+9.5)**

---

## Why It Didn't Feel Premium — Top 5 Causes (before P0)

1. **No visible pricing.** The JS payment section was suppressed (placeholder URLs). Visitors couldn't qualify
   themselves; no price signal existed anywhere on the homepage.

2. **Hero subhead was a weaker re-statement of the headline.** "Fast fixes for spreadsheets..." ↔
   "Reliable fixes for data, automation..." — zero new information. Premium pages use the subhead to add a
   *different* dimension (how it works, the guarantee, or the key differentiator).

3. **Trust signals scattered and small.** Icon chips (0.86rem, pill-style) deep inside hero copy; long
   one-line anchor text; risk panel below the fold — none commanded visual attention as a dedicated section.

4. **Hero eyebrow said the brand name** (already in logo). Redundant repetition of "Handoff Studio" instead
   of a value-reinforcing tagline.

5. **Service cards carried no price signal.** Three service cards described services but gave no cost
   range, making early qualification impossible.

---

## What Premium Looks Like Here — Target Spec

```
HEADER         sticky blur-bg · brand + nav + "Send your request" CTA
────────────────────────────────────────────────────────────────────
HERO           2-col: left = outcome H1 + benefit subhead + 3 bullets + CTA row
               right = delivery bundle card + before/after thumbs
────────────────────────────────────────────────────────────────────
TRUST BAR      4-pillar strip: Scope first · 24–48h · No call · $0 risk
               dividers on desktop, 2×2 grid on mobile
────────────────────────────────────────────────────────────────────
SERVICES       3 cards — icon + title + 1-line summary + turnaround badge
────────────────────────────────────────────────────────────────────
PRICING (NEW)  3 cards — tier name + large price + promise + 3 bullets + full-w CTA
               Middle card featured (gold border + "Most complete" badge)
────────────────────────────────────────────────────────────────────
PROCESS        3 steps, connector line on desktop
────────────────────────────────────────────────────────────────────
PROOF          2 before/after tiles + visual image pair
────────────────────────────────────────────────────────────────────
COMMITMENT     Risk reversal panel
────────────────────────────────────────────────────────────────────
FINAL CTA      Centered card with 3-step instructions + response time
────────────────────────────────────────────────────────────────────
FOOTER         3-col: brand · nav · CTA + email
```

---

## P0 / P1 / P2 Improvement Backlog

### P0 — Implemented (2026-02-22)

| ID | Area | Change | Files |
|----|------|--------|-------|
| P0-1 | Hero eyebrow | Changed from "Handoff Studio" → "Scoped · Delivered · Documented" | `index.html` |
| P0-2 | Hero subhead | Updated `heroVariants.a.subhead` to a benefit-distinct process/guarantee statement | `site-config.json` |
| P0-3 | Trust bar | Added 4-pillar horizontal section between hero and services (icon + title + desc per pillar) | `index.html` + `styles.css` |
| P0-4 | Pricing section | Added static 3-card pricing layout (Quick Fix $49 · Standard $149 · Day Rate $399) | `index.html` + `styles.css` |
| P0-5 | Pricing card styles | `pricing-card`: large price (clamp to 2.9rem), featured gold border, badge, full-width CTA | `styles.css` |
| P0-6 | Responsive | Pricing collapses to 1-col at 980px; trust dividers hide; trust pillars wrap 2×2 | `styles.css` |

### P1 — This week

| ID | Area | Description |
|----|------|-------------|
| P1-1 | Hero H1 copy | Rewrite to lead with client outcome, not service list. E.g. "Your technical blocker, fixed — with written scope, QC review, and full handoff." |
| P1-2 | Service cards | Add starting price hint or turnaround callout to each homepage service card for faster qualification |
| P1-3 | Proof tiles | Display "12 → 1" and "3h → 15m" metrics as large-print numbers with context label (not buried in bullets) |
| P1-4 | Final CTA card | Add gold border accent and gradient background to match featured pricing card visual treatment |
| P1-5 | Font display | Add `font-display: optional` to Google Fonts URL to eliminate invisible-text flash on slow connections |
| P1-6 | Hero visual weight | Increase hero visual column on desktop (ratio 1fr / 1fr instead of 1.2fr / 0.8fr) for stronger proof presence |

### P2 — Later / optional

| ID | Area | Description |
|----|------|-------------|
| P2-1 | Testimonials | One paraphrased client quote (no name required — "Data analyst, SaaS startup" is enough) |
| P2-2 | Proof metric ribbon | Add a thin before/after metric strip between Services and Pricing: "Avg manual steps reduced: 12 → 1" |
| P2-3 | Bundle animation | Subtle CSS fade on delivery bundle "READY" / "PASSED" status chips for perceived quality |
| P2-4 | Styled OG image | Replace placeholder `social-preview.png` with a designed 1200×630 brand card |
| P2-5 | Scroll-spy nav | Active section tracking as visitor scrolls — highlights current nav item |

---

## After P0 Self-Score

| # | Dimension | Before | After | Key change |
|---|-----------|--------|-------|------|
| 1 | Brand tone & visual polish | 3/5 | 4/5 | Eyebrow carries "Scoped · Delivered · Documented" value signal |
| 2 | Hierarchy & readability | 3/5 | 4/5 | Subhead is now clearly distinct from H1 (process + guarantee) |
| 3 | Layout system | 3/5 | 4/5 | Explicit pricing grid + trust bar flex with defined responsive collapse |
| 4 | Conversion clarity | 2/5 | 4/5 | Pricing always visible; price signal in first 2 scrolls; featured tier |
| 5 | Trust layer | 3/5 | 4/5 | Dedicated trust bar section replaces small icon chips as primary trust signal |
| 6 | Mobile-first execution | 3/5 | 4/5 | Pricing → 1-col; trust → 2×2 wrap; all tap targets ≥ 44px |
| 7 | Accessibility | 4/5 | 4/5 | No regressions; `<article>` elements, `aria-label` on trust bar |
| 8 | Performance hygiene | 4/5 | 4/5 | No new assets; pricing is pure HTML/CSS |
| 9 | Content strategy | 2/5 | 3/5 | Pricing context visible; trust bar reduces long-anchor-line dependency |
| 10 | Competitive parity | 2/5 | 3.5/5 | Pricing cards bring it to agency-tier baseline; still missing testimonials |

**Total: 29/50 → 38.5/50 (+9.5)**

### What's Still Missing for True Enterprise-Grade Polish

1. **Testimonials / social proof** — Even one real paraphrased quote creates more trust than any layout improvement.
2. **Hero H1 needs a P1 rewrite** — Current H1 is still a service-list ("Fast fixes for spreadsheets, automation..."). Enterprise landing pages lead with client outcome.
3. **Proof metrics need visual treatment** — "12 → 1 manual steps" deserves a `2.5rem` number, not a `<strong>` tag in a bullet.
4. **Google Fonts LCP risk** — `font-display: optional` is a 5-minute fix that eliminates FOIT on slow connections.
5. **OG image is a placeholder** — Any social share shows no preview card.


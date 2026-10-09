# AYINLA Website Test Report

Date: 9 October 2026

## Status

**Delivered:** Full multi-page website source, dependency-free static website export, local reference assets, visual screenshots and operational documentation.

**Prelaunch:** Business acceptance and the provider-backed enquiry integration remain incomplete.

## Verified checks

| Area | Result | Evidence or scope |
|---|---|---|
| Site coverage | PASS | 21 routes rendered in the offline static export |
| Internal navigation paths | PASS | 21 pages parsed; no broken local file navigation links |
| Local image assets | PASS | Referenced local images exist within the package |
| Image accessibility | PASS | All exported image elements include descriptive alt text |
| CSS syntax | PASS | 0 errors from a CSS syntax parser |
| JavaScript syntax | PASS | Node `--check` for site behavior, content renderer and exporter |
| Content and route integrity | PASS | Custom validator reports no missing routes or required assets |
| No long dashes | PASS | Authored generated HTML, CSS and JavaScript checked for em and en dashes |
| Browser responsive coverage | PASS | 21 routes tested at 320px, 390px and 1440px, with zero overflow or page-level JS errors |
| Homepage responsive behavior | PASS | 320px, 390px, 768px and 1440px visual layout tests |
| Mobile menu | PASS | Opens, closes and updates `aria-expanded`; Escape key closes menu |
| Collection filter | PASS | Six study cards reduce to two when Agbada is selected |
| Commission form required fields | PASS | Native browser validation activates for empty required inputs |
| Omoluabi! placement | PASS | Visible in homepage hero and brand/footer content |

## Environment limitations

| Area | Status | Explanation |
|---|---|---|
| `npm install` | BLOCKED | The execution environment cannot resolve registry.npmjs.org, returning `EAI_AGAIN`. |
| `astro build` | NOT EXECUTED | Dependencies could not be installed here. Run after installation on a machine with npm registry access. |
| `astro check` | NOT EXECUTED | Astro package unavailable for the same reason. |
| Live Tally to Sheets submission | NOT CONFIGURED | Actual Ayinla form URL, data handling policy and owner account connection are unavailable. |
| Live Paystack collection | NOT CONFIGURED | No verified account or commission payment terms supplied. |
| Live contact channels | NOT CONFIGURED | Business WhatsApp number and email have not been verified. |
| Production Lighthouse | NOT EXECUTED | No live deployed URL or connected final photography. |
| Safari device testing | NOT EXECUTED | Only Chromium-based browser tests were available. |
| Legal review | PENDING | Privacy, terms, alterations and delivery pages are visibly marked drafts. |

## Production blocking tasks

The code package is complete as a foundation, but final publication requires owner signoff on brand rights, real garments, identity photographs, business contacts, enquiry collection, privacy, deposits, fittings, timelines and international fulfillment. Full deployment build and live end-to-end tests must be repeated after valid provider accounts and a real domain are available.

## Local reproducibility

Run these after extracting the source package:

```bash
node scripts/export-static.mjs
node scripts/validate.mjs
python scripts/site-audit.py
python scripts/browser-test.py
python scripts/all-pages-browser-check.py
npm install
npm run build
npm run check
```

The Python browser tests require Playwright and Chromium. The Node static exporter and integrity validator require no third-party packages.

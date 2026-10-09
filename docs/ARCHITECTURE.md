# AYINLA architecture and implementation notes

## Purpose

A lightweight, responsive fashion house website that turns portfolio visits into qualified bespoke commission enquiries. The initial system is intentionally static and does not require a permanent backend server.

## Current state

- Astro 5 static site with TypeScript diagnostics.
- Home plus catch-all route generated from the canonical `sitePaths` array in `src/lib/site.mjs`.
- HTML page composition and illustration-based garment examples in `src/lib/site.mjs`.
- Common document head in `src/layouts/Layout.astro`.
- Styles in `public/assets/site.css`; client-side interactions in `public/assets/site.js`.
- Offline reference export generated with `scripts/export-static.mjs`.
- Static route validation in `scripts/check-dist.mjs` and project lint in `scripts/validate.mjs`.
- Automation in `.github/workflows/ci.yml`.

## Design decisions

1. Static-first: no application server is needed for the public portfolio and basic content.
2. Reusable content templates: same garment structure drives collection cards and detail pages.
3. Provider-owned form processing: do not place PII or business secrets in source-controlled JavaScript.
4. Git-based editorial publishing: proposed Pages CMS after content-model refactor.
5. Verified business claims: samples and reference images remain labelled until replaced.

## Known shortcomings

- The content and page renderer are currently combined in one JavaScript module, which is harder for a nontechnical editor to maintain.
- Pages CMS is proposed, not wired into the current content model.
- Enquiry form is a demonstration and does not transmit data.
- Automated quoting, payments, shipping and order tracking are not implemented.
- There is no package-lock.json yet because the original development container could not access npm.
- A successful GitHub Actions Astro build has not yet been observed.

## Environment variables

`SITE_URL`: approved production domain for canonical URLs and sitemap generation. Do not invent it before a real domain is selected. Future server-side secrets must use Cloudflare encrypted secrets, never `public/` assets or Git history.

## Testing and release

Run `npm run lint`, `npm run check`, `npm run build`, `npm run test:routes` and browser smoke tests. CI success is a necessary condition for release, not proof that business features are activated.

## Security

Keep customer measurements and photographs in approved, permission-controlled systems with a retention policy. Implement consent, form spam prevention, webhook signature checks where applicable, and least-privilege integration credentials. Keep all payment steps with the payment provider rather than storing card data.

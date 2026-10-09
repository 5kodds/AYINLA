# AYINLA engineering and launch roadmap

Updated: 2026-10-09

This is the sole implementation roadmap. Keep GitHub issues and PRs aligned to these phases, not competing roadmaps.

## Phase 0: Brand and concept
Status: Visual direction approved for prototype.

- AYINLA bespoke menswear, Ibadan, Nigeria.
- Omoluabi! as a recognisable cultural signature.
- Agbada, senator and kaftan focus.
- Midnight indigo, warm ivory, muted bronze and slate.
- Editorial layout and mobile-first experience.

## Phase 1: Source handoff and quality gates
Status: In progress until CI passes.

- [ ] Source in the 5kodds/AYINLA repository.
- [ ] First successful `npm install`, `npm run check`, `npm run build` and `npm run test:routes` on GitHub Actions.
- [ ] Commit a generated package-lock.json and use `npm ci` in CI.
- [ ] Validate screenshots and routes on real browsers.
- [ ] Protect production branch from unreviewed high-risk changes.

## Phase 2: Production hardening
Status: Pending.

- [ ] Fix issues raised by CI and accessibility review.
- [ ] Audit image provenance and licensing, optimise images.
- [ ] Verify responsive layouts, keyboard support and loading states.
- [ ] Verify SEO titles, descriptions, canonical URLs and sitemap.
- [ ] Add automated basic smoke tests for critical routes and navigation.
- [ ] Reconfirm no publication of fabricated testimonials or business metrics.

## Phase 3: Business activation
Status: Pending.

- [ ] Replace stock and sample garments with approved original work.
- [ ] Verify business name, address, contacts and story with Ayinla.
- [ ] Approve pricing, deposits, lead times, measurement, alterations and delivery terms.
- [ ] Configure Startbuddi Forms or Tally and protect against spam.
- [ ] Verify real enquiry arrives in the approved CRM or inbox and is answered.
- [ ] Review privacy notice, retention and reference-image handling.
- [ ] Confirm Paystack eligibility and actual international fulfillment process.

## Phase 4: Content management
Status: Pending.

- [ ] Refactor garment records from `src/lib/site.mjs` to structured content collection files.
- [ ] Define schema and required image alt text.
- [ ] Add Pages CMS config, GitHub editorial permissions and publishing review.
- [ ] Confirm Ayinla can update a garment, upload an image and undo changes.

## Phase 5: Controlled Cloudflare Pages release
Status: Pending.

- [ ] Connect approved repo, build command and output path.
- [ ] Use preview deployments while business details are incomplete.
- [ ] Set `SITE_URL` and confirm custom domain and DNS with the owner.
- [ ] Validate live production URL, error pages, analytics and final robots policy.
- [ ] Remove pre-launch labels only after all approvals.

## Backlog only: optional growth

- Customer accounts and saved measurements.
- Status tracking and notifications.
- Appointment availability integration.
- Additional payment flows and ready-to-wear shopping cart.
- Editorial journal and customer reviews with consent.

All additions should support real sales, delivery and customer trust rather than complexity for its own sake.

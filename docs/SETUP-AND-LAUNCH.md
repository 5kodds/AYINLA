# Development, Integration and Launch Checklist

## Development workflow

- [ ] Install Node.js and run `npm install` in the project root.
- [ ] Run `npm run dev` and review the full Astro site.
- [ ] Run `npm run build`, `npm run check` and `npm run lint`.
- [ ] Review every generated page at 320, 390, 768 and 1440 pixel viewport widths.
- [ ] Validate all image sizes, copyright rights and source attributions.
- [ ] Review every navigation, filter, CTA, tab and form state.

## Owner approvals

- [ ] Confirm AYINLA name and legal rights to the brand.
- [ ] Approve full and short logo usage, wordmark design and Omoluabi! treatment.
- [ ] Confirm actual founder biography, work location and business contact details.
- [ ] Select real garments to replace six fictional design-study records.
- [ ] Validate quoting, deposit amount, fitting, production timeline and garment alteration policies.
- [ ] Approve countries and partners for international payment and shipping.
- [ ] Complete a privacy review and confirm the identity of the data controller and processors.
- [ ] Sign off on final copy and remove any inaccurate statements.

## Live enquiries

1. Create a branded Tally form using AYINLA's approved customer intake questions, privacy wording and an optional image upload control.
2. Use native Tally to connect submissions to the intended Google Sheet and set notifications.
3. Paste the HTTPS Tally form link into `CONFIG.tallyFormUrl` in `public/assets/site.js`.
4. Review embedded form appearance on phones and desktops.
5. Submit a test enquiry. Confirm receipt in both Tally and Google Sheets, and verify any email notifications.
6. Check the provider's spam protection, upload restrictions, storage location and retention settings.
7. Confirm no personally identifying enquiry data is placed in URL parameters or analytics events.

## Payment model

The project does not provide a checkout. After feasibility, quote, commission terms and customer approval, AYINLA can issue a one-time Paystack payment link through its verified account. Check international card acceptance and chargeback procedures before advertising worldwide payments.

## Domain and Cloudflare Pages

- [ ] Replace `https://example.com` in `astro.config.mjs` with the verified domain.
- [ ] Create a GitHub repository and commit the source code (do not commit credentials).
- [ ] Connect the repository to Cloudflare Pages.
- [ ] Set build command `npm run build` and output directory `dist`.
- [ ] Set primary domain and HTTPS redirect in Cloudflare.
- [ ] Confirm all assets, route pages and custom 404 behavior.
- [ ] Replace the temporary crawler block with an appropriate production robots policy.
- [ ] Generate a sitemap using the approved domain and only pages approved for indexing.
- [ ] Configure Cloudflare Web Analytics and Google Search Console after authorization.
- [ ] Test a successful live enquiry, then confirm the owner can receive and respond to it.

## Deployment gate

Do not launch this concept site as a live business website without replacing the reference portfolio with verified work, activating the lead process, providing real contact information, approving legally adequate policy pages and verifying the business's operating commitments.

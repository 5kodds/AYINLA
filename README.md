# AYINLA Bespoke Menswear

**Omoluabi! | Presence, made personal.**

AYINLA is a premium contemporary bespoke menswear brand concept based in Ibadan, Nigeria. This repository is the canonical source for the AYINLA website, presenting agbada, senator suits and kaftans through an editorial portfolio and a consultation-led commission experience. The initial target markets are Nigerian ceremonial and wedding clients, returning professionals and, when fulfillment is verified, overseas clients.

> **Pre-launch:** This website has demonstration garment records and reference imagery, not verified AYINLA finished commissions. The commission form is not connected to a customer-data provider, and payments are not enabled. Business contacts, legal terms, production capacity and international delivery must be verified before public commercial launch.

## Brand system

| Item | Definition |
| --- | --- |
| Brand name | AYINLA |
| Descriptor | Bespoke Menswear |
| Cultural signature | **Omoluabi!** |
| Positioning | Premium contemporary Nigerian native menswear |
| Categories | Agbada, senator suits and kaftans |
| Base | Ibadan, Nigeria |
| Tagline | Presence, made personal. |
| Palette | Indigo `#192333`, ivory `#F5F0E7`, bronze `#AB895E`, slate `#59616B` |
| Fonts | Cormorant Garamond (display), Manrope (interface) |
| Primary conversion | Start a Commission |

## Technology and principles

Astro 5 static site, JavaScript with Astro TypeScript diagnostics, custom CSS, GitHub Actions, and Cloudflare Pages hosting after verification. No permanent backend is needed for the portfolio. Pages CMS is proposed for editing the garments after a structured content migration. Startbuddi Forms or Tally is proposed for the business enquiry system. Paystack payment links can be used only after a customer approves a personalised quote and account eligibility is verified.

The website is not a ready-to-wear retail checkout. Avoid introducing a shopping cart, saved payment cards, complex user accounts or tracking before there is demand and a clear privacy plan.

## Development in VS Code

Use Node.js 22, npm, Git and optionally VS Code.

```bash
git clone https://github.com/5kodds/AYINLA.git
cd AYINLA
npm install
npm run dev
```

Open the URL Astro prints, normally `http://localhost:4321`.

```bash
npm run lint
npm run check
npm run build
npm run test:routes
npm run preview
```

- `lint` performs project-specific integrity checks, not ESLint.
- `check` runs Astro and TypeScript diagnostics.
- `build` produces the deployable `dist/` directory.
- `test:routes` checks the generated production pages.
- `export:offline` generates a separate dependency-free preview.
- No `package-lock.json` exists yet because npm registry access was blocked in the authoring environment. After the first successful `npm install`, commit the lockfile and change CI to `npm ci`.

## Pages and routes

| Route | Description |
| --- | --- |
| `/` | Brand homepage with featured collections |
| `/collections/` | Collection overview and garment discovery |
| `/collections/agbada/` | Agbada collection |
| `/collections/senator/` | Senator suits |
| `/collections/kaftan/` | Kaftans |
| `/pieces/[slug]/` | Six demonstration garment-detail pages |
| `/bespoke/` | Individual commission process |
| `/atelier/` | Designer, studio and workmanship narrative |
| `/commission/` | Enquiry form, demonstration-only until linked |
| `/contact/` | Contact information and channels |
| `/faq/` | Frequently asked questions |
| `/privacy/` | Privacy notice draft requiring legal review |
| `/terms/` | Bespoke terms draft requiring approval |
| `/delivery-and-alterations/` | Delivery and adjustment guidance |
| `/thank-you/` | Acknowledgement page |
| `/404/` | Not-found page |

The initial architecture generates 21 public routes from shared data. All display images in the working prototype are temporary references or illustrative placeholders.

## Repository structure

```text
.
├── .github/workflows/ci.yml      # GitHub Actions verification
├── .vscode/                     # Editor recommendations
├── docs/                        # Roadmap, architecture, imagery and launch
├── public/
│   ├── assets/images/           # Local design references and illustrations
│   ├── assets/site.css          # Shared responsive brand CSS
│   ├── assets/site.js           # Frontend menu, filtering and form UI
│   └── robots.txt               # Temporary pre-launch no-crawl policy
├── scripts/                     # Export, lint and route verification
├── src/
│   ├── layouts/Layout.astro     # Shared document metadata and layout
│   ├── lib/site.mjs             # Initial canonical content and HTML renderer
│   └── pages/                   # Astro routes
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

**Content source of truth:** Edit `src/lib/site.mjs` and the associated shared styles, not generated offline-preview HTML. The renderer will be split into structured content entries in the planned CMS phase.

## Deployment on Cloudflare Pages

After a passing production CI build, connect this GitHub repository to Cloudflare Pages.

| Setting | Value |
| --- | --- |
| GitHub repository | `5kodds/AYINLA` |
| Production branch | `main` |
| Build command | `npm run build` |
| Root | `/` |
| Output directory | `dist` |
| Node.js | 22 |

Set `SITE_URL` to the verified production domain when available. Keep production deployments disabled or use an appropriately labelled test environment until Ayinla approves business details. Cloudflare Pages preview URLs may be public. The temporary `robots.txt` disallow rule does not provide authentication.

## Enquiries, payments and data protection

The commission form is currently for design and validation only. Do not tell customers their enquiry was submitted until the real endpoint is connected and tested. When activating Startbuddi Forms or Tally, verify required fields, reference-photo upload permissions, spam safeguards, success and failure messages, internal notification, consent wording and appropriate data retention. Do not commit personal details, access tokens, API keys or client measurements.

Paystack may be used to send business-approved quotation and deposit links. No card details should be handled by the website. Overseas card support and shipping eligibility must be checked with the relevant providers before being advertised.

## Verification and release gates

1. GitHub Actions successfully installs dependencies and runs the Astro diagnostics, production build and generated-route checks.
2. Verify all pages, mobile layouts, image loading, keyboard navigation, forms and error states.
3. Obtain Ayinla's approval of designer bio, contact details, garment claims, policies, pricing language and international processes.
4. Replace illustrative garments with originals and record photographic permission and provenance.
5. Test a real commission enquiry from customer browser to the authorised owner inbox or CRM.
6. Verify domain, DNS, SEO metadata, robots policy and Cloudflare deployment behavior.
7. Publish only after the brand owner accepts the complete experience.

## Roadmap and development handoff

Use **one canonical roadmap** in [docs/ROADMAP.md](docs/ROADMAP.md):

| Phase | Status | Description |
| --- | --- | --- |
| 0. Identity | Approved for prototype | Brand direction, Omoluabi! and homepage |
| 1. GitHub handoff | In progress | Source code, developer docs and passing CI |
| 2. Production hardening | Pending | Accessibility, SEO, visual QA and technical fixes |
| 3. Business activation | Pending | Genuine portfolio, verified contacts, policies and CRM form |
| 4. Content management | Pending | Structured garment data and Pages CMS |
| 5. Cloudflare launch | Pending | Reviewed release, domain and production checks |
| 6. Growth | Backlog | Accounts, order tracking and ready-to-wear features |

Development guidance: [Architecture](docs/ARCHITECTURE.md), [Contributing](docs/CONTRIBUTING.md), [Image replacement](docs/IMAGE-REPLACEMENT-GUIDE.md), [Setup and launch](docs/SETUP-AND-LAUNCH.md), [Testing](docs/TEST-REPORT.md).

## Collaboration and ownership

Use feature branches and reviewed pull requests. Run local checks, include mobile and desktop screenshots when visual elements change, and wait for CI. Do not introduce em dashes or en dashes in authored content. This public repository does not grant a general open-source license. Brand, code and image usage rights should be clarified with the owner before redistribution.

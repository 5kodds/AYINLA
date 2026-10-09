# AYINLA Pages CMS owner and developer guide

## Scope

Pages CMS is the editing interface for public website content, not customer data. It edits the GitHub repository directly. The Astro site is generated at build time from these files:

- `src/content/garments/*.json`: one garment per file, including publishing flag, category, copy and image.
- `src/content/categories/*.json`: the three fixed garment categories and their cover images.
- `src/content/site.json`: homepage introductory copy and hero photograph.
- `.pages.yml`: editor fields and upload paths.

The AYINLA brand signature **Omoluabi!**, navigation, visual tokens and pre-launch safeguards remain controlled by code, not editable CMS fields.

## Owner connection steps

1. Open https://app.pagescms.org/ and sign in using the GitHub account `5kodds`.
2. Approve the Pages CMS GitHub App only for `5kodds/AYINLA`. Review its requested access before accepting.
3. Open AYINLA in Pages CMS, select branch `main`, and confirm the three editor sections are visible.
4. Open **Garment portfolio** and choose an existing entry. Check that the title, category, copy, upload field and **Show on public demo** switch are present.
5. Make a harmless text change, save it, inspect the resulting GitHub commit, and verify Cloudflare's deployment. Reverse the change after testing.
6. When adding a new garment, use a unique lowercase slug, provide descriptive alt text with any uploaded image and leave **Show on public demo** off until the content is reviewed.

These steps require your consent in Pages CMS and GitHub. The assistant cannot authorize that third-party app on your behalf.

## Image upload contract

Images uploaded using Pages CMS are stored under `public/assets/garments/` and referenced as `/assets/garments/<filename>`. Use JPG, PNG or WebP and compress images before upload. Suggested target: hero 1600x2000, portrait 1200x1600, detail 1200x1200. Avoid identifying the people in reference photography as actual AYINLA customers. Only use images with explicit publication rights.

Photo fields are optional for current visual studies. Existing local illustration assets remain until an approved original is uploaded. When a garment has an uploaded photo, the renderer does not load the external Pexels reference for that slot.

## Publishing and content integrity

- New garment records start with `published: false`; the site will not create a route or list a card for them.
- Existing six concept studies remain published for the pre-launch demonstration and are still labelled as references.
- Do not rename slugs after the URL is shared. Editing the display title is safe.
- Validate the site with `npm run export:offline && npm run lint && npm run check && npm run build && npm run test:routes`.
- Content validation rejects missing alt text for uploaded images, bad image paths, invalid categories, duplicate slugs and missing publishing flags.
- Because the repository currently builds Cloudflare Pages automatically from `main`, CMS saves to `main` can trigger a fresh pre-launch deployment. This is not equivalent to a fully private editorial draft environment.
- Pre-launch notices, noindex, customer form demo mode and disabled payments stay enforced.

## Known limits and next tasks

- You must complete the Pages CMS GitHub App authorization and manually verify the editor UI. Configuration alone cannot prove the CMS login works.
- This first integration edits garment, category and selected homepage content; Atelier, legal policies and full landing-page text remain code-managed pending verified copy.
- GitHub file and media upload limits apply. Do not use Pages CMS as a repository for sensitive customer information.
- Add branch review workflow and lockfile before final commercial release. See `docs/ROADMAP.md` for the canonical roadmap.

# AYINLA: GitHub, VS Code and Cloudflare Pages

Updated 2026-10-09. The project is now in GitHub and a connected Cloudflare Pages project exists. The first Astro CI build has passed. Production publishing is disabled until AYINLA approves all customer-facing claims and integrations.

## Source repository

https://github.com/5kodds/AYINLA

The repository is currently public. If publication of the source is premature, the repository owner can change the visibility in GitHub Settings. Only use approved images and rights-cleared material in a public repo.

## Clone into VS Code

Open the integrated terminal or any command line with Git and Node.js 22 installed:

```powershell
git clone https://github.com/5kodds/AYINLA.git
cd AYINLA
code .
npm install
npm run dev
```

Astro normally prints http://localhost:4321. If that port is busy it may use another one.

## Quality checks

```powershell
npm run lint
npm run check
npm run build
npm run test:routes
npm run preview
```

The project-specific `lint` command is not ESLint. Astro check validates TypeScript and framework diagnostics. The build writes to `dist/`. `npm install` currently generates an uncommitted package-lock.json. Commit it and switch GitHub CI to `npm ci` for reproducible installs.

GitHub Actions workflow: https://github.com/5kodds/AYINLA/actions/workflows/ci.yml

First successful run: https://github.com/5kodds/AYINLA/actions/runs/37910014376

## Cloudflare Pages connection

- Cloudflare Pages project: `ayinla-bespoke`.
- Connected repository: `5kodds/AYINLA`.
- Production branch: `main`.
- Build command: `npm run build`.
- Output directory: `dist`.
- Root directory: `/`.
- Production deployments: disabled.
- Preview branch deployments: disabled.
- Public site: not deployed yet.

To enable deployment, review the staging content, verify business copy and activate the relevant deployment option under Cloudflare Pages project settings. Preview links may still be public. No custom domain has been configured or assumed. Set `SITE_URL` only when the approved domain is known.

GitHub Actions success does not automatically protect Cloudflare from deploying a failing commit when automatic deployments are enabled. Prefer reviewed PRs and branch protection for the release flow.

The temporary `public/robots.txt` disallows indexing, but it is **not** authentication. Keep commercial collection features disabled until legal and workflow checks are complete.

## Editing and content management

The initial renderer stores page content in `src/lib/site.mjs`. Pages CMS is a future enhancement, not yet integrated. Before enabling Pages CMS, migrate garments into content collections and define the editing schema.

The form in `/commission` remains demonstration-only. Startbuddi or Tally must be connected with appropriate field mapping, consent language, spam controls and a verified owner inbox or CRM. Do not commit API keys, webhook secrets, identity documents or sensitive measurements.

## Troubleshooting

- `EAI_AGAIN` from npm: DNS or network connection error. It did not occur on the successful GitHub Actions run.
- `astro: command not found`: ensure `npm install` completes successfully.
- Cloudflare `dist not found`: debug the Astro build before adjusting the output path.
- `git push` rejected: confirm repository permissions and pull the latest branch. Do not force push without understanding the conflict.

## Next step

Complete the asset, content and business approvals, prepare the Pages CMS migration, then enable an explicitly reviewed preview or production deploy.

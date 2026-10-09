# AYINLA: GitHub, VS Code, and Cloudflare Pages

The project can be maintained outside ChatGPT using GitHub, VS Code, and Cloudflare Pages. The Astro production build still requires verification in an environment with npm registry access.

## First: create a dedicated private GitHub repository

1. Sign into GitHub as `5kodds` and visit https://github.com/new.
2. Suggested name: `ayinla-bespoke-menswear`.
3. Select **Private** until Ayinla approves all website content.
4. Do not initialise the repository with a README, license, or .gitignore, since this project already includes them.
5. Copy the new repository URL. An existing repository can be updated using the connected GitHub account once its exact repository is supplied.

## Option A: upload through VS Code

After downloading and extracting the project ZIP, open the extracted project directory in VS Code. Open **Terminal > New Terminal** and run:

```powershell
git init
git add .
git commit -m "Initial AYINLA website source and CI"
git branch -M main
git remote add origin https://github.com/5kodds/REPOSITORY_NAME.git
git push -u origin main
```

Replace `REPOSITORY_NAME` with the actual repository name. GitHub may request browser login or a credential manager. Never commit GitHub credentials or API tokens to this project.

## Option B: clone the project after it is on GitHub

```powershell
git clone https://github.com/5kodds/REPOSITORY_NAME.git
cd REPOSITORY_NAME
code .
npm install
npm run dev
```

The development server prints a local URL, usually http://localhost:4321. VS Code's integrated terminal, Command Prompt, and PowerShell run the same npm commands. Using VS Code does not itself fix blocked internet or npm DNS access.

## Required development and release commands

```powershell
npm install
npm run lint
npm run check
npm run build
npm run test:routes
npm run preview
```

The `lint` script runs the project's custom integrity checks. It is not ESLint. `check` runs the Astro TypeScript and diagnostics checks. Build output goes to `dist/`. A lockfile has not been generated yet; after successfully installing locally, commit `package-lock.json` and switch CI to `npm ci` for repeatable dependency resolution.

## GitHub Actions

The included `.github/workflows/ci.yml` starts on pushes to `main` and pull requests. It installs Node 22, verifies JavaScript syntax, regenerates the offline preview, checks content and links, runs the Astro diagnostic checker and production build, tests all generated routes, and uploads a build artifact on success.

Check the **Actions** tab after the first push. If it fails, inspect the failing step's logs and fix the cause before publishing. Do not assume this is a passing CI workflow until the first run is observed.

## Cloudflare Pages

1. Sign into https://dash.cloudflare.com and select **Workers & Pages**.
2. Select **Create application**, then **Pages** and **Import an existing Git repository**.
3. Authorise the Cloudflare GitHub integration for the specific AYINLA repository.
4. Select the repository and configure:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | Astro |
| Root directory | `/` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js | 22 |

5. Review the website content before publishing a public domain. Cloudflare preview deployment URLs may be publicly accessible.
6. After obtaining a deployed URL or connecting a verified custom domain, set a `SITE_URL` environment variable in Cloudflare and rerun a deployment.
7. Add the actual domain under Pages custom domains. Configure DNS in the Cloudflare interface. Do not guess DNS records for a domain not yet chosen.

Cloudflare can build on GitHub pushes, but its native integration does not inherently wait for the separate GitHub Actions test workflow to finish. Use a protected release process if strict deployment gating is required.

**Warning:** `public/robots.txt` currently asks search engines not to crawl the site. This is intentional during development, and it is not authentication or an access restriction. Replace it with the final policy only after the business site is ready for public search.

## CMS setup later

Pages CMS can edit GitHub-backed garment data, but the content is currently centralised in `src/lib/site.mjs`. Migrate content to structured files and test schema compatibility before connecting Pages CMS. Do not claim that Pages CMS is already installed.

## Startbuddi or another enquiry endpoint

The website's commission form is demonstration-only until a real provider is configured. Do not place Startbuddi API secrets, Paystack secret keys, Cloudflare tokens, or personal data in public JavaScript or commits. Confirm supported Startbuddi form field handling and reference image uploads; use their authenticated UI to create the endpoint. After implementing and testing real submissions, update the privacy notice and remove demo disclaimers where accurate.

## Troubleshooting

- `npm ERR! EAI_AGAIN`: npm host resolution problem, usually DNS or network; check internet access and proxy settings.
- `astro: command not found`: dependencies were not installed or installation failed; run `npm install` and inspect the log.
- Cloudflare error `Output directory not found`: run and debug `npm run build` first; `dist` exists only after a successful build.
- `git push` rejected: verify the remote URL, authentication, access permissions and remote branch state. Do not force push without inspecting differences.

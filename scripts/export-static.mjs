import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage, sitePaths, escapeHTML } from '../src/lib/site.mjs';
const project = fileURLToPath(new URL('..', import.meta.url));
const out = path.join(project, 'preview');
const publicRoot = path.join(project, 'public');
fs.mkdirSync(out, { recursive: true });
fs.cpSync(path.join(publicRoot, 'assets'), path.join(out, 'assets'), { recursive: true, force: true });
function offlineLinks(html, prefix) {
  // Make every internal page usable directly from disk, without running a web server.
  return html.replace(/(href|src)="\/(.*?)"/g, (_whole, attr, target) => {
    if (target.startsWith('assets/')) return `${attr}="${prefix}${target}"`;
    if (target.startsWith('#')) return `${attr}="${target}"`;
    const [pathPart, fragment=''] = target.split('#');
    const [pathname, query=''] = pathPart.split('?');
    let href = pathname === '' ? 'index.html' : (pathname.endsWith('/') ? `${pathname}index.html` : pathname);
    href = `${prefix}${href}${query ? '?' + query : ''}${fragment ? '#' + fragment : ''}`;
    return `${attr}="${href}"`;
  });
}
for (const route of sitePaths) {
  const page = renderPage(route);
  const depth = route.split('/').filter(Boolean).length;
  const prefix = '../'.repeat(depth);
  const resultDir = path.join(out, route);
  fs.mkdirSync(resultDir, { recursive: true });
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHTML(page.title)}</title><meta name="description" content="${escapeHTML(page.description)}"><meta name="theme-color" content="#192333">${page.noindex ? '<meta name="robots" content="noindex,follow">' : ''}<link rel="icon" href="/assets/images/monogram.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/assets/site.css"></head><body><a class="skip-link" href="#main-content">Skip to main content</a>${page.html}<script src="/assets/site.js" defer></script></body></html>`;
  fs.writeFileSync(path.join(resultDir, 'index.html'), offlineLinks(html, prefix));
}
fs.writeFileSync(path.join(out, '404.html'), fs.readFileSync(path.join(out, '404/index.html'), 'utf8').replaceAll('../assets/', 'assets/').replaceAll('../index.html','index.html').replaceAll('../collections/', 'collections/').replaceAll('../bespoke/', 'bespoke/').replaceAll('../atelier/', 'atelier/').replaceAll('../commission/', 'commission/').replaceAll('../contact/', 'contact/').replaceAll('../faq/', 'faq/').replaceAll('../privacy/', 'privacy/').replaceAll('../terms/', 'terms/').replaceAll('../delivery-and-alterations/', 'delivery-and-alterations/'));
fs.writeFileSync(path.join(publicRoot, '404.html'), fs.readFileSync(path.join(out, '404.html'), 'utf8'));
fs.writeFileSync(path.join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n# Remove this temporary crawl block when launch assets and policies are approved.\n');
console.log(`Exported ${sitePaths.length} independently browsable pages to preview/.`);

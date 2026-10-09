import fs from 'node:fs';
import path from 'node:path';
import { sitePaths } from '../src/lib/site.mjs';

const root = path.resolve('dist');
const issues = [];
let checked = 0;

if (!fs.existsSync(root)) {
  console.error('FAIL: dist directory does not exist. Run npm run build first.');
  process.exit(1);
}

for (const route of sitePaths) {
  const trimmed = route.replace(/^\/+|\/+$/g, '');
  const candidates = trimmed
    ? [path.join(root, trimmed, 'index.html'), path.join(root, `${trimmed}.html`)]
    : [path.join(root, 'index.html')];
  const generatedPath = candidates.find((file) => fs.existsSync(file));
  if (!generatedPath) {
    issues.push(`Missing built page: ${route}`);
    continue;
  }
  const html = fs.readFileSync(generatedPath, 'utf8');
  if (!html.includes('<html') || !html.includes('</html>')) {
    issues.push(`Invalid HTML document for ${route}`);
  }
  checked += 1;
}

for (const asset of ['assets/site.css', 'assets/site.js', 'assets/images/monogram.svg']) {
  if (!fs.existsSync(path.join(root, asset))) issues.push(`Missing built asset: ${asset}`);
}

if (issues.length) {
  issues.forEach((issue) => console.error('FAIL:', issue));
  process.exit(1);
}
console.log(`PASS: ${checked} generated production routes plus critical static assets.`);

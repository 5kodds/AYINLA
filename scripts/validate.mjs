import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sitePaths, renderPage } from '../src/lib/site.mjs';
const root=fileURLToPath(new URL('..',import.meta.url));
const fatal=[];
const css=fs.readFileSync(path.join(root,'public/assets/site.css'),'utf8');
const script=fs.readFileSync(path.join(root,'public/assets/site.js'),'utf8');
const jsSource=fs.readFileSync(path.join(root,'src/lib/site.mjs'),'utf8');
if(css.split('{').length!==css.split('}').length) fatal.push('CSS braces are unbalanced');
const allText=css+script+jsSource;
if(/[\u2013\u2014]/.test(allText)) fatal.push('En dash or em dash found in authored code');
const allPaths=new Set(sitePaths);
for(const route of sitePaths){
 const page=renderPage(route);
 if(!page.html||!page.title) fatal.push(`Empty page ${route}`);
 const links=[...page.html.matchAll(/href="(\/[^"]*)"/g)].map(x=>x[1].split('?')[0].split('#')[0]);
 for(const link of links){if(link!==''&&!link.startsWith('/assets/')&&!allPaths.has(link))fatal.push(`Broken internal link on ${route}: ${link}`);}
 const file=path.join(root,'preview',route,'index.html');
 if(!fs.existsSync(file))fatal.push(`Missing static preview page ${route}`);
}
for(const asset of ['hero-reference.webp','monogram.svg','agbada-emerald.svg','senator-indigo.svg','kaftan-sand.svg']){
 if(!fs.existsSync(path.join(root,'public/assets/images',asset)))fatal.push(`Missing asset ${asset}`);
}
if(fatal.length){fatal.forEach(x=>console.error('FAIL',x));process.exitCode=1;}
else console.log(`PASS: ${sitePaths.length} page routes; internal links; required local assets; brace check; no long dashes.`);

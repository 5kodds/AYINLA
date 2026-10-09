import fs from 'node:fs';
import path from 'node:path';
import { categories, pieces, SITE } from '../src/lib/site.mjs';

const root = path.resolve('src/content');
const issues = [];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const validPhotoPath = (p) => typeof p === 'string' && p.startsWith('/assets/garments/') && !p.includes('..') && /^[a-z0-9/_.-]+$/i.test(p.slice('/assets/garments/'.length)) && ['.jpg','.jpeg','.png','.webp'].some(ext => p.toLowerCase().endsWith(ext));
const cleanText = (v) => typeof v === 'string' && !/[<>]/.test(v) && !v.includes(String.fromCharCode(8211)) && !v.includes(String.fromCharCode(8212));
const required = (x, names, label) => {
  for (const name of names) if (!cleanText(x[name]) || !x[name].trim()) issues.push(`${label}: missing or unsafe ${name}`);
};
const validatePhoto = (x, label) => {
  if (!x.photo) return;
  if (!validPhotoPath(x.photo)) issues.push(`${label}: photo path must be an uploaded asset`);
  else if (!fs.existsSync(path.join('public', x.photo.slice(1)))) issues.push(`${label}: uploaded photo missing from repository`);
  if (!cleanText(x.photoAlt) || !x.photoAlt.trim()) issues.push(`${label}: photoAlt is required for an uploaded photo`);
};
const files = (folder) => fs.readdirSync(path.join(root, folder)).filter((name) => name.endsWith('.json'));
const allSlugs = new Set();
const expectedCategories = ['agbada','senator','kaftan'];
for (const f of files('categories')) {
  const c = JSON.parse(fs.readFileSync(path.join(root, 'categories',f),'utf8'));
  if (!expectedCategories.includes(c.slug) || f !== `${c.slug}.json`) issues.push(`Invalid category file: ${f}`);
  required(c,['name','slug','num','line','intro','image'],'category '+f);
  validatePhoto(c, 'category '+f);
  if (!Number.isFinite(c.order)) issues.push(`Category order missing: ${f}`);
}
for (const f of files('garments')) {
  const p=JSON.parse(fs.readFileSync(path.join(root,'garments',f),'utf8'));
  if (!slugPattern.test(p.slug) || f !== `${p.slug}.json` || allSlugs.has(p.slug)) issues.push(`Invalid/duplicate garment slug: ${f}`);
  allSlugs.add(p.slug);
  required(p,['title','slug','category','code','blurb','style','character','palette','image'],'garment '+f);
  if (!expectedCategories.includes(p.category)) issues.push(`Invalid category: ${f}`);
  if (typeof p.published !== 'boolean' || !Number.isFinite(p.order)) issues.push(`Publishing flag or order missing: ${f}`);
  validatePhoto(p,'garment '+f);
}
required(SITE,['heroIntro'],'homepage');
if (SITE.heroPhoto) validatePhoto({photo:SITE.heroPhoto,photoAlt:SITE.heroPhotoAlt},'homepage');
if (categories.length!==3) issues.push('The three categories must be preserved');
if (pieces.some(p=>!p.published)) issues.push('Unpublished garments must not render');
if (issues.length) { for (const x of issues) console.error('FAIL:',x); process.exitCode=1; }
else console.log(`PASS: Pages CMS content, ${allSlugs.size} garment files, ${pieces.length} visible garments, image paths and publication flags.`);

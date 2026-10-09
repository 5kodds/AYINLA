from PIL import Image,ImageEnhance
from pathlib import Path
from html import escape
import json
root=Path(__file__).resolve().parents[1]
assets=root/'public/assets/images'
assets.mkdir(parents=True,exist_ok=True)
# Source is the user supplied design screenshot. Temporary crop only.
src=root/'docs/approved-hero-reference.png'
im=Image.open(src).convert('RGB')
im=im.crop((907,136,1737,868))
im=ImageEnhance.Contrast(im).enhance(1.035)
im.save(assets/'hero-reference.webp',quality=86,method=6)
colors=[
  ('agbada-emerald','#0d4f4d','#e2ccb0','wide'),
  ('agbada-ceremony','#25334b','#d6a46d','wide'),
  ('senator-indigo','#233754','#cfb690','slim'),
  ('senator-onyx','#282d33','#b5afa6','slim'),
  ('kaftan-sand','#ba9f7b','#f7ecdc','soft'),
  ('kaftan-night','#483c53','#bfaeae','soft'),
]
for i,(name,body,trim,kind) in enumerate(colors):
    robe = ('M180 318 Q130 335 58 453 L6 605 88 648 145 557 124 798 Q246 840 371 798 L350 557 408 648 490 605 438 453 Q374 338 309 318 Z' if kind=='wide' else 'M180 318 Q133 334 98 392 L62 612 132 627 153 487 139 803 Q245 821 355 803 L342 487 369 627 439 612 403 392 Q365 336 309 318 Z' if kind=='slim' else 'M176 318 Q116 353 73 429 L55 649 127 657 153 490 139 802 Q247 821 357 802 L343 490 370 657 444 649 429 429 Q379 352 310 318 Z')
    emb = (f'<path d="M189 330 L246 440 L302 330 M212 350 L246 410 L281 350" stroke="{trim}" stroke-width="8" stroke-linejoin="round" fill="none" opacity=".88"/><path d="M246 446 L246 747" stroke="{trim}" stroke-width="5" stroke-dasharray="9 15" opacity=".65"/>' if kind=='wide' else f'<path d="M209 318 L246 405 L283 318" stroke="{trim}" stroke-width="7" fill="none"/><path d="M247 412 L247 775" stroke="{trim}" stroke-width="3" opacity=".8"/>' if kind=='slim' else f'<path d="M205 319 Q248 399 288 319 M241 407 L241 577" stroke="{trim}" stroke-width="5" fill="none" opacity=".75"/>')
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 890" role="img" aria-label="Illustrative garment silhouette for image reference: {name}">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ded5c6"/><stop offset="1" stop-color="#9faaa8"/></linearGradient><linearGradient id="cloth" x1="0" x2="1" y1="0" y2="1"><stop stop-color="{body}"/><stop offset=".55" stop-color="{body}"/><stop offset="1" stop-color="#121c23"/></linearGradient><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" stroke="#fff" stroke-opacity=".09" fill="none"/></pattern></defs>
<rect width="500" height="890" fill="url(#bg)"/><rect width="500" height="890" fill="url(#grid)"/><circle cx="246" cy="371" r="238" fill="#fff" opacity=".12"/><path d="M0 812L500 690V890H0Z" fill="#192333" opacity=".13"/>
<ellipse cx="247" cy="842" rx="162" ry="25" fill="#1d2228" opacity=".20"/>
<path d="M196 275 L178 330 310 330 294 275" fill="#8a6451"/><ellipse cx="245" cy="193" rx="76" ry="97" fill="#966f59"/><path d="M170 205 Q144 99 209 91 Q262 73 316 129 L319 206 Q291 157 251 156 Q208 150 170 205Z" fill="#292b2a"/>
<path d="{robe}" fill="url(#cloth)" stroke="{trim}" stroke-width="5"/><path d="M180 317L246 398L311 317" fill="none" stroke="{trim}" stroke-width="3" opacity=".85"/>{emb}
<path d="M211 220 Q246 234 283 220" stroke="#684637" stroke-width="3" opacity=".7" fill="none"/><path d="M217 188h17 M264 188h17" stroke="#342a26" stroke-width="4" stroke-linecap="round"/>
<rect x="20" y="20" width="460" height="850" fill="none" stroke="#ffffff" stroke-opacity=".36"/><text x="28" y="44" font-family="sans-serif" font-size="10" fill="#192333" letter-spacing="3">AYINLA / VISUAL STUDY</text><text x="28" y="857" font-family="sans-serif" font-size="9" fill="#172737" letter-spacing="2">ILLUSTRATED FALLBACK • REPLACE WITH ORIGINAL PHOTO</text>
</svg>'''
    (assets/f'{name}.svg').write_text(svg,encoding='utf-8')
# Bespoke line drawing fallback for workshop / atelier
for name,caption in [('craft-reference','CRAFT / WORKSHOP REFERENCE'),('atelier-reference','DESIGNER / ATELIER REFERENCE')]:
  svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 850"><defs><linearGradient id="shade" x2="1" y2="1"><stop stop-color="#c7bba7"/><stop offset="1" stop-color="#8e9997"/></linearGradient></defs><rect width="760" height="850" fill="url(#shade)"/><rect x="110" y="102" width="538" height="638" rx="2" fill="#f4eee3" opacity=".35"/><path d="M60 665H715 M170 666V813 M618 666V813" stroke="#192333" stroke-width="18"/><path d="M220 510Q362 390 563 506L620 665H176Z" fill="#20384b"/><path d="M232 510Q401 470 565 505 M333 519L403 645 M425 519L341 655" stroke="#beaa86" stroke-width="7" fill="none"/><path d="M320 309Q329 254 383 244Q444 254 451 313L434 389H333Z" fill="#94715c"/><circle cx="383" cy="230" r="84" fill="#9d7963"/><path d="M297 216Q275 122 369 117Q479 119 467 228Q384 177 297 216Z" fill="#2e3131"/><path d="M328 310Q260 335 232 510L333 541L374 418L421 540L556 496Q532 337 451 316" fill="#334653"/><path d="M55 44H708" stroke="#fff" stroke-opacity=".43"/><text x="60" y="77" font-family="sans-serif" font-size="14" letter-spacing="5" fill="#192333">{caption}</text><text x="60" y="800" font-family="sans-serif" font-size="11" letter-spacing="2" fill="#192333">ILLUSTRATIVE FALLBACK • REPLACE WITH AYINLA WORKSPACE PHOTO</text></svg>'''
  (assets/f'{name}.svg').write_text(svg,encoding='utf-8')
# Brand symbol as code generated SVG, original vector asset.
(assets/'monogram.svg').write_text('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="#192333"/><path d="M16 61L40 17L64 61M26 47H54" stroke="#f5f0e7" stroke-width="2.5" stroke-linecap="square" fill="none"/><path d="M40 13V19" stroke="#ab895e" stroke-width="3"/></svg>''',encoding='utf-8')
print('Created local hero reference, six garment illustrations, two workshop placeholders, and monogram')

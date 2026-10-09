from pathlib import Path
from bs4 import BeautifulSoup
import re
root=Path(__file__).resolve().parents[1]
preview=root/'preview'
errors=[]
count=0
for page in sorted(preview.rglob('index.html')):
  count+=1
  doc=BeautifulSoup(page.read_text(), 'html.parser')
  if not doc.find('title') or not doc.select_one('main#main-content'):
    errors.append(f'Missing title/main: {page.relative_to(preview)}')
  for anchor in doc.select('a[href]'):
    url=anchor['href'].split('#',1)[0].split('?',1)[0]
    if url.startswith(('http:','https:','mailto:','tel:','#')) or not url:
      continue
    result=(page.parent/url).resolve()
    if not result.is_file():
      errors.append(f'Broken anchor {page.relative_to(preview)}: {url}')
  for img in doc.select('img[src]'):
    result=(page.parent/img['src']).resolve()
    if not result.is_file():
      errors.append(f'Missing image {page.relative_to(preview)}: {img["src"]}')
    if not img.get('alt','').strip():
      errors.append(f'Missing alternative text: {page.relative_to(preview)}')
  if re.search('[\u2013\u2014]',page.read_text()):
    errors.append(f'Long dash in {page.relative_to(preview)}')
print(f'Parsed {count} static route pages; found {len(errors)} issues.')
for error in errors[:30]: print('ERROR:',error)
if errors: raise SystemExit(1)

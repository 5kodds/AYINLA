from pathlib import Path
from playwright.sync_api import sync_playwright
import mimetypes,base64,re
root=Path(__file__).resolve().parents[1]
css=(root/'public/assets/site.css').read_text()
js=(root/'public/assets/site.js').read_text()
files=list(sorted((root/'preview').rglob('index.html')))
def render(file):
 text=file.read_text()
 text=re.sub(r'<link[^>]+href="https://fonts[^>]+>','',text)
 text=re.sub(r'<link rel="stylesheet" href="[^"]+">',lambda _: f'<style>{css}</style>',text)
 text=re.sub(r'<script src="[^"]+" defer></script>',lambda _: f'<script>{js}</script>',text)
 def localimg(m):
  f=(file.parent/m.group(1)).resolve()
  if not f.is_file() or not f.is_relative_to(root/'preview'):return m.group(0)
  mime=mimetypes.guess_type(f)[0] or 'application/octet-stream'
  return f'src="data:{mime};base64,{base64.b64encode(f.read_bytes()).decode()}"'
 return re.sub(r'src="((?:\.\./)*assets/images/[^\"]+)"',localimg,text)
fails=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for file in files:
  for width in (320,390,1440):
   page=browser.new_page(viewport={'width':width,'height':800})
   page.route('https://**/*',lambda r:r.abort())
   errs=[]
   page.on('pageerror',lambda e:errs.append(str(e)))
   page.set_content(render(file),wait_until='load')
   overflow=page.evaluate('document.documentElement.scrollWidth>innerWidth')
   if overflow or errs:
    offenders=page.evaluate('''[...document.querySelectorAll('*')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,4).map(e=>[e.tagName,e.className,Math.round(e.getBoundingClientRect().right)])''')
    fails.append((str(file.relative_to(root/'preview')),width,overflow,offenders,errs))
   page.close()
 browser.close()
print(f'Tested {len(files)} routes at 320, 390 and 1440 pixels: {len(fails)} layout or JS failures')
for fail in fails[:20]: print('FAIL',fail)
if fails: raise SystemExit(1)

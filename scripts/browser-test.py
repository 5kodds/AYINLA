from playwright.sync_api import sync_playwright
from pathlib import Path
import re, base64, json, mimetypes
root=Path(__file__).resolve().parents[1]
css=(root/'public/assets/site.css').read_text()
js=(root/'public/assets/site.js').read_text()
checks=[]
def load_page(route):
  loc=root/'preview'/route.strip('/')/'index.html'
  if route=='/': loc=root/'preview/index.html'
  html=loc.read_text()
  html=re.sub(r'<link[^>]+href="https://fonts[^>]+>', '', html)
  html=re.sub(r'<link rel="stylesheet" href="[^"]+">',lambda _: '<style>'+css+'</style>',html)
  html=re.sub(r'<script src="[^"]+" defer></script>',lambda _: '<script>'+js+'</script>',html)
  def embed(match):
    filename=(loc.parent/match.group(1)).resolve()
    if not filename.is_file() or not filename.is_relative_to((root/'preview').resolve()):
      return match.group(0)
    encoded=base64.b64encode(filename.read_bytes()).decode()
    mimetype=mimetypes.guess_type(filename)[0] or 'application/octet-stream'
    return f'src="data:{mimetype};base64,{encoded}"'
  html=re.sub(r'src="((?:\.\./)*assets/images/[^\"]+)"',embed,html)
  return html
with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
  for label,width,height in [('desktop',1440,900),('tablet',768,1024),('mobile',390,844),('narrow',320,700)]:
    page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
    page.route('https://**/*',lambda r: r.abort())
    errors=[]
    page.on('pageerror',lambda err: errors.append(str(err)))
    page.set_content(load_page('/'),wait_until='load')
    page.screenshot(path=str(root/f'preview-{label}.png'),full_page=(label in ['desktop','mobile']))
    overflow=page.evaluate('document.documentElement.scrollWidth>window.innerWidth')
    if overflow:
      print('OVERFLOW ELEMENTS',page.evaluate('''[...document.querySelectorAll('*')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,12).map(e=>({tag:e.tagName,cls:e.className,scrollWidth:e.scrollWidth,right:Math.round(e.getBoundingClientRect().right)}))'''))
    omoluabi=page.locator('.omoluabi-hero').inner_text()
    if width<920:
      button=page.locator('#menu-toggle')
      button.click()
      menu_ok=button.get_attribute('aria-expanded')=='true' and page.locator('#main-nav').is_visible()
      page.keyboard.press('Escape')
      menu_ok=menu_ok and button.get_attribute('aria-expanded')=='false'
    else: menu_ok=True
    checks.append({'test':label,'no_horizontal_overflow':not overflow,'no_js_errors':len(errors)==0,'menu_ok':menu_ok,'omoluabi':omoluabi,'errors':errors})
    page.close()
  page=browser.new_page(viewport={'width':1280,'height':850})
  page.route('https://**/*',lambda r:r.abort())
  page.set_content(load_page('/collections/'),wait_until='load')
  before=page.locator('.lookbook-grid .garment-card:visible').count()
  page.locator('[data-filter="agbada"]').click()
  after=page.locator('.lookbook-grid .garment-card:visible').count()
  checks.append({'test':'collection_filter','before':before,'after':after,'pass':before==6 and after==2})
  page.close()
  page=browser.new_page(viewport={'width':1280,'height':850})
  page.route('https://**/*',lambda r:r.abort())
  page.set_content(load_page('/commission/'),wait_until='load')
  page.locator('button[type="submit"]').click()
  invalid=page.locator('input[name="name"]').evaluate('(e)=>!e.validity.valid')
  checks.append({'test':'commission_form','required_validation':invalid,'live_submission':False})
  page.close()
  browser.close()
for c in checks: print(json.dumps(c,ensure_ascii=False))
assert all(c.get('no_horizontal_overflow',True) and c.get('no_js_errors',True) and c.get('menu_ok',True) and c.get('pass',True) and c.get('required_validation',True) for c in checks)

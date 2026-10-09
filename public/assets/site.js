/* AYINLA website behavior. All business integration settings stay blank until verified. */
const CONFIG = {
  tallyFormUrl: '',
  whatsappNumber: '',
  contactEmail: ''
};

const menuButton = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
function closeMenu() {
  if (!menuButton || !nav) return;
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    nav.classList.toggle('open', opening);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

// Load external reference photography when available. Local artwork stays visible offline.
const images = document.querySelectorAll('img[data-stock]');
function tryStockImage(img) {
  if (img.dataset.stockAttempted) return;
  img.dataset.stockAttempted = 'true';
  const temporary = new Image();
  temporary.decoding = 'async';
  temporary.onload = () => { img.src = temporary.src; img.dataset.photoLoaded = 'stock'; };
  temporary.src = img.dataset.stock;
}
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        tryStockImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '250px 0px' });
  images.forEach((img) => imageObserver.observe(img));
} else {
  images.forEach(tryStockImage);
}

const filters = document.querySelectorAll('[data-filter]');
const garmentCards = document.querySelectorAll('[data-category]');
filters.forEach((button) => button.addEventListener('click', () => {
  const selection = button.dataset.filter;
  filters.forEach((option) => {
    const active = option === button;
    option.classList.toggle('active', active);
    option.setAttribute('aria-pressed', String(active));
  });
  garmentCards.forEach((card) => { card.hidden = selection !== 'all' && card.dataset.category !== selection; });
}));

// Prefill the category or inspiration when arriving from a collection or garment page.
const params = new URLSearchParams(window.location.search);
const garment = params.get('garment');
const selectedGarment = document.getElementById('garment-select');
if (selectedGarment && ['agbada', 'senator', 'kaftan'].includes(garment)) selectedGarment.value = garment;
const design = params.get('design');
const message = document.getElementById('design-message');
if (message && design && /^[a-z0-9-]{1,100}$/.test(design)) {
  message.value = `I am interested in discussing a design direction inspired by the ${design.replaceAll('-', ' ')} reference on the website.`;
}

// Demo mode never sends, saves, or implies an actual customer enquiry.
const demoForm = document.getElementById('commission-demo');
if (demoForm) {
  demoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedback = document.getElementById('form-feedback');
    if (!demoForm.reportValidity()) {
      feedback.textContent = 'Please review the required fields before proceeding.';
      feedback.className = 'form-feedback error';
      return;
    }
    feedback.textContent = 'Demo validation passed. Your enquiry was NOT sent or stored. The approved AYINLA Tally form must be connected before this website can accept real requests.';
    feedback.className = 'form-feedback success';
    feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// Activates a real provider-managed hosted form only after a verified Tally URL is supplied.
if (CONFIG.tallyFormUrl && document.getElementById('tally-active')) {
  try {
    const formUrl = new URL(CONFIG.tallyFormUrl);
    if (formUrl.protocol === 'https:' && (formUrl.hostname === 'tally.so' || formUrl.hostname.endsWith('.tally.so'))) {
      if (['agbada', 'senator', 'kaftan'].includes(garment)) formUrl.searchParams.set('garment', garment);
      if (design && /^[a-z0-9-]{1,100}$/.test(design)) formUrl.searchParams.set('design', design);
      const embedUrl = new URL(formUrl);
      embedUrl.searchParams.set('transparentBackground', '1');
      const frame = document.createElement('iframe');
      frame.title = 'AYINLA secure commission enquiry form';
      frame.src = embedUrl.toString();
      frame.loading = 'lazy';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      document.getElementById('tally-embed').appendChild(frame);
      document.getElementById('tally-open').href = formUrl.toString();
      document.getElementById('tally-active').hidden = false;
      document.getElementById('form-demo').hidden = true;
    }
  } catch {
    // Invalid configuration intentionally leaves the clearly labelled demonstration form active.
  }
}

const whatsapp = document.querySelector('[data-config="whatsapp"]');
if (whatsapp && /^\d{7,15}$/.test(CONFIG.whatsappNumber)) {
  const anchor = document.createElement('a');
  anchor.href = `https://wa.me/${CONFIG.whatsappNumber}`;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  anchor.textContent = 'Chat with AYINLA on WhatsApp';
  whatsapp.replaceWith(anchor);
}
const email = document.querySelector('[data-config="email"]');
if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONFIG.contactEmail)) {
  const anchor = document.createElement('a');
  anchor.href = `mailto:${CONFIG.contactEmail}`;
  anchor.textContent = CONFIG.contactEmail;
  email.replaceWith(anchor);
}

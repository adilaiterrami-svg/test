/* Cabinet Notarial – Maître Sara Ahmanna */

// ===== NAVBAR =====
const navbar   = document.querySelector('.navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  navLinks.classList.contains('open')
    ? (spans[0].style.transform = 'rotate(45deg) translate(5px,5px)',
       spans[1].style.opacity   = '0',
       spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)')
    : (spans[0].style.transform = '',
       spans[1].style.opacity   = '',
       spans[2].style.transform = '');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => {
      s.style.transform = ''; s.style.opacity = '';
    });
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      const active = navLinks.querySelector(`a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => observer.observe(s));

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

// ===== FADE-IN ON SCROLL =====
const fadeEls = document.querySelectorAll(
  '.service-card, .engagement-card, .faq-item, .value-item, .contact-card'
);
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => { el.classList.add('fade-in'); fadeObs.observe(el); });

// ===== CONTACT FORM =====
const form    = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const t = TRANSLATIONS[localStorage.getItem('lang') || 'fr'];
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    formMsg.className = 'form-msg';
    formMsg.textContent = '';

    try {
      const data = new FormData(form);
      const body = Object.fromEntries(data.entries());
      await fetch('https://formsubmit.co/ajax/contact@ahmanna-notaire.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body)
      });
      formMsg.className = 'form-msg success';
      formMsg.textContent = t.contact.success;
      form.reset();
    } catch {
      formMsg.className = 'form-msg error';
      formMsg.textContent = t.contact.error;
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<i class="fas fa-paper-plane"></i> <span data-i18n="contact.f_submit">${t.contact.f_submit}</span>`;
    }
  });
}

// ===== LANGUAGE SWITCHER =====
function getNestedValue(obj, path) {
  return path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
}

function applyLanguage(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  document.documentElement.lang = t.lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = getNestedValue(t, el.dataset.i18n);
    if (val !== undefined) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = getNestedValue(t, el.dataset.i18nPlaceholder);
    if (val !== undefined) el.placeholder = val;
  });

  // Rebuild service select options
  const serviceSelect = document.getElementById('service');
  if (serviceSelect) {
    const current = serviceSelect.value;
    serviceSelect.innerHTML = `<option value="" disabled selected>${t.contact.f_service_default}</option>`;
    t.contact.f_services.forEach(s => {
      const opt = document.createElement('option');
      opt.textContent = s;
      serviceSelect.appendChild(opt);
    });
    serviceSelect.value = current || '';
  }

  // Rebuild footer domains list
  const footerDomains = document.getElementById('footerDomains');
  if (footerDomains) {
    footerDomains.innerHTML = '';
    t.footer.domains.forEach(d => {
      const li = document.createElement('li');
      li.textContent = d;
      footerDomains.appendChild(li);
    });
  }

  // Update active lang button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  localStorage.setItem('lang', lang);
}

// Language button click handlers
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
});

// Init with saved language or default to French
applyLanguage(localStorage.getItem('lang') || 'fr');

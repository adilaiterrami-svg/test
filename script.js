// ============================================
// TOPBAR + NAVBAR : effet scroll
// ============================================
const navbar  = document.getElementById('navbar');
const topbar  = document.getElementById('topbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

function updateNavbar() {
  const topbarH = topbar ? topbar.offsetHeight : 0;
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNavbar);
updateNavbar();

// ============================================
// MENU MOBILE
// ============================================
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============================================
// HIGHLIGHT LIEN ACTIF
// ============================================
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      const active = navLinks.querySelector(`a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 });

sections.forEach(s => sectionObserver.observe(s));

// ============================================
// ANIMATIONS FADE-UP AU SCROLL
// ============================================
const fadeEls = document.querySelectorAll(
  '.timeline-card, .edu-card, .pub-card, .skill-card, .conf-card, ' +
  '.internship-item, .membership-item, .contact-item, .stat, ' +
  '.video-card, .consult-card'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement.children);
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Math.min(idx * 80, 400));
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));

// ============================================
// COMPTEUR ANIMÉ (statistiques)
// ============================================
function animateCounter(el, target, suffix = '') {
  const step = Math.max(1, Math.ceil(target / 45));
  let current = 0;
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(interval);
  }, 38);
}

const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(el => {
        const raw = el.textContent.trim();
        const num = parseInt(raw);
        const suffix = raw.replace(String(num), '');
        animateCounter(el, num, suffix);
      });
      statsObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObs.observe(statsSection);

// ============================================
// FORMULAIRE DE CONTACT
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

    const fd = new FormData(contactForm);
    const payload = {
      name:    fd.get('name'),
      email:   fd.get('email'),
      phone:   fd.get('phone') || 'Non renseigné',
      objet:   fd.get('objet'),
      message: fd.get('message'),
      _subject: fd.get('_subject'),
      _template: 'table',
      _captcha: 'false'
    };

    try {
      const res = await fetch('https://formsubmit.co/ajax/adaiterrami@yahoo.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success === 'true' || json.success === true) {
        contactForm.innerHTML = `
          <div style="text-align:center;padding:40px 20px">
            <i class="fas fa-check-circle" style="font-size:3.5rem;color:var(--blue-mid);display:block;margin-bottom:16px"></i>
            <h3 style="font-family:'Playfair Display',serif;color:var(--text);margin-bottom:8px">Message envoyé !</h3>
            <p style="color:var(--text-muted);font-size:0.95rem">Merci pour votre message. Le Pr. Ait Errami vous répondra dans les plus brefs délais.</p>
          </div>`;
      } else {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
        alert("Une erreur s'est produite. Veuillez réessayer ou nous contacter par téléphone.");
      }
    } catch {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
      alert("Impossible d'envoyer le message. Vérifiez votre connexion internet.");
    }
  });
}

// ============================================
// SCROLL FLUIDE (compatibilité anciens navigateurs)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ============================================
// VIDÉOS — placeholder click (à remplacer par vraies vidéos)
// ============================================
document.querySelectorAll('.video-placeholder').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h4')?.textContent || 'Vidéo';
    alert(`La vidéo "${title}" sera disponible prochainement.`);
  });
});

// ============================================
// GALERIE — Filtres + Lightbox
// ============================================
(function () {
  const grid    = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lbImg');
  const lbCaption= document.getElementById('lbCaption');
  const lbClose  = document.getElementById('lbClose');
  const lbPrev   = document.getElementById('lbPrev');
  const lbNext   = document.getElementById('lbNext');
  if (!grid || !lightbox) return;

  let items = [];  // items visibles (après filtre)
  let current = 0;

  // ── FILTRES ──
  document.querySelectorAll('.gf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !show);
      });
    });
  });

  // ── OUVRIR LIGHTBOX ──
  function openLightbox(index) {
    items = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
    current = index;
    showSlide(current);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function showSlide(i) {
    const item = items[i];
    if (!item) return;
    const img = item.querySelector('img');
    lbImg.src = img ? img.src : '';
    lbImg.alt = img ? img.alt : '';
    lbCaption.textContent = item.dataset.caption || '';
    lbPrev.style.visibility = i > 0 ? 'visible' : 'hidden';
    lbNext.style.visibility = i < items.length - 1 ? 'visible' : 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery-item').forEach((item, idx) => {
    item.addEventListener('click', () => {
      const visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
      openLightbox(visibleItems.indexOf(item));
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  lbPrev.addEventListener('click', e => { e.stopPropagation(); if (current > 0) showSlide(--current); });
  lbNext.addEventListener('click', e => { e.stopPropagation(); if (current < items.length - 1) showSlide(++current); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft'  && current > 0)              showSlide(--current);
    if (e.key === 'ArrowRight' && current < items.length-1) showSlide(++current);
  });
})();

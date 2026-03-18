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

    const data = new FormData(contactForm);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const json = await res.json();
      if (json.success) {
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

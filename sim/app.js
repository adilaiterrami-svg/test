/* ============================================================
   Alliance Sim Endoscopy Africa — JavaScript partagé
   ============================================================ */

/* ── Mobile nav toggle ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
      }
    });
  }

  /* ── Active nav link ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      item.classList.toggle('open');
    });
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Contact form (prevent default, show thanks) ── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const thanks = document.getElementById('form-thanks');
      if (thanks) { thanks.style.display = 'block'; contactForm.style.display = 'none'; }
    });
  }
});

/* ── Mermaid init ───────────────────────────────────────────── */
if (typeof mermaid !== 'undefined') {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'base',
    themeVariables: {
      primaryColor: '#eef6f4',
      primaryTextColor: '#1a2332',
      primaryBorderColor: '#2d9e8f',
      lineColor: '#2d9e8f',
      secondaryColor: '#f5f5f5',
      tertiaryColor: '#fff',
      fontSize: '14px'
    },
    flowchart: { curve: 'basis', padding: 20 },
    gantt: { axisFormat: '%d %b', titleTopMargin: 25, barHeight: 20, barGap: 6, topPadding: 50, leftPadding: 150 }
  });
}

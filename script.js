// ---- Service filter chips ----
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    cards.forEach(c => {
      const cats = (c.dataset.cat || '').split(/\s+/);
      c.classList.toggle('hidden', f !== 'all' && !cats.includes(f));
    });
  });
});

// ---- Smooth scroll for in-page anchors ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Scroll reveal ----
const targets = document.querySelectorAll(
  '.hero__meta, .hero__copy, .hero__art, ' +
  '.section__rail, .about__lede, .about__body, .about__photo, ' +
  '.services__head, .card, ' +
  '.spotlight__lead, .spotlight__stats, .improve, ' +
  '.faq__head, .faq__item, .visit__card'
);
targets.forEach(t => t.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      // tiny stagger so cards feel like a sequence, not a wall
      setTimeout(() => e.target.classList.add('in'), (i % 6) * 60);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
targets.forEach(t => io.observe(t));

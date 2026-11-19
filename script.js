/* Ahmad Fariz Kazhimy — Portfolio interactions (vanilla JS, no dependencies) */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* Footer year */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Dynamic "years of experience" stat (counted from data-count-since = YYYY-MM) */
  $$('[data-count-since]').forEach((el) => {
    const [y, m] = el.dataset.countSince.split('-').map(Number);
    const now = new Date();
    const years = Math.max(0, Math.floor((now.getFullYear() - y) + (now.getMonth() + 1 - m) / 12));
    el.dataset.count = String(years);
    el.textContent = String(years);
  });

  /* Mobile navigation */
  const nav = $('#nav');
  const toggle = $('#navToggle');
  const links = $('#navLinks');
  const closeMenu = () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  links.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', (e) => { if (!nav.contains(e.target)) closeMenu(); });

  /* Scroll-driven UI: progress bar, nav state, timeline fill (rAF-throttled) */
  const progress = $('#progress');
  const timeline = $('#timeline');
  let ticking = false;
  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    progress.style.transform = `scaleX(${p})`;
    nav.classList.toggle('is-scrolled', window.scrollY > 24);

    if (timeline) {
      const r = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const filled = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      timeline.style.setProperty('--tl', `${(filled * 100).toFixed(1)}%`);
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* Active nav link */
  const navAnchors = $$('.nav__links a');
  const sections = navAnchors.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          navAnchors.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${en.target.id}`));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* Count-up */
  const fmt = (n, d) => n.toFixed(d);
  const countUp = (el) => {
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || '0', 10);
    if (Number.isNaN(target)) return;
    if (reduceMotion) { el.textContent = fmt(target, dec); return; }
    const dur = 1400;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(target * eased, dec);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* Reveal on scroll */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-visible');
        $$('[data-count]', en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    $$('[data-count]').forEach(countUp);
  }

  /* Word rotator in hero */
  const words = $$('.rotator__word');
  if (words.length > 1 && !reduceMotion) {
    let i = 0;
    setInterval(() => {
      const cur = words[i];
      i = (i + 1) % words.length;
      const next = words[i];
      cur.classList.remove('is-active');
      cur.classList.add('is-leaving');
      next.classList.remove('is-leaving');
      next.classList.add('is-active');
      setTimeout(() => cur.classList.remove('is-leaving'), 700);
    }, 2600);
  }

  /* Marquee: clone track content for a seamless loop */
  const track = $('#marqueeTrack');
  if (track && !reduceMotion) {
    const clone = track.cloneNode(true);
    Array.from(clone.children).forEach((c) => track.appendChild(c));
  }

  /* Pointer effects (desktop only) */
  if (finePointer && !reduceMotion) {
    /* Spotlight on glass cards */
    $$('[data-spotlight]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });

    /* Background parallax */
    const blobs = $$('.blob');
    let px = 0, py = 0, raf = null;
    window.addEventListener('pointermove', (e) => {
      px = e.clientX / window.innerWidth - 0.5;
      py = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(() => {
        blobs.forEach((b, idx) => {
          const f = (idx + 1) * 14;
          b.style.translate = `${(px * f).toFixed(1)}px ${(py * f).toFixed(1)}px`;
        });
        raf = null;
      });
    }, { passive: true });

    /* 3D tilt on hero profile card */
    const tilt = $('#tilt');
    if (tilt) {
      const wrap = tilt.parentElement;
      wrap.addEventListener('pointermove', (e) => {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `rotateY(${(x * 10).toFixed(2)}deg) rotateX(${(-y * 10).toFixed(2)}deg)`;
      });
      wrap.addEventListener('pointerleave', () => { tilt.style.transform = ''; });
    }
  }
})();

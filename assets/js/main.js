/* So geht Eisenbahn – Lokführer werden: Interaktionen & Animationen */
(() => {
  const doc = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---- Headline in Buchstaben zerlegen ---- */
  $$('[data-split]').forEach(el => {
    const text = el.textContent.trim();
    el.textContent = '';
    const mask = document.createElement('span');
    mask.className = 'mask';
    [...text].forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'char';
      s.style.setProperty('--i', i);
      s.textContent = ch;
      mask.appendChild(s);
    });
    el.appendChild(mask);
  });

  const start = () => requestAnimationFrame(() => doc.classList.add('is-loaded'));
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1200))]).then(start);
  } else start();

  /* ---- Mobile Menü ---- */
  const toggle = $('.nav__toggle');
  const menu = $('#menu');
  const setMenu = open => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    document.body.classList.toggle('menu-open', open);
    if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add('is-open')); }
    else { menu.classList.remove('is-open'); setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 700); }
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });

  /* ---- Reveal on scroll ---- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
  // gestaffelte Verzögerung für Geschwister
  $$('.features, .reqs, .accordion, .stats__grid').forEach(group => {
    $$('.reveal', group).forEach((el, i) => el.style.setProperty('--d', `${i * 0.08}s`));
  });
  $$('.reveal, .cab').forEach(el => io.observe(el));

  /* ---- Zähler ---- */
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      countIO.unobserve(e.target);
      const el = e.target, to = +el.dataset.count;
      if (reduced || to === 0) { el.textContent = to; return; }
      const dur = 1600, t0 = performance.now();
      const tick = t => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => countIO.observe(el));

  /* ---- Scroll-gesteuerte Effekte ---- */
  const nav = $('.nav');
  const bar = $('.progress span');
  const hero = $('.hero');
  const drive = $('.scene__drive');
  const wheels = $$('.train .wheel');
  const route = $('.route');
  const track = $('.route__track');
  const stations = $$('.station');
  const navLinks = $$('.nav__links a');
  const sections = navLinks.map(a => $(a.getAttribute('href')));
  let lastY = window.scrollY, ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = doc.scrollHeight - vh;
    bar.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);

    // Navigation: Hintergrund nach Hero, beim Runterscrollen ausblenden
    nav.classList.toggle('is-scrolled', y > 40);
    const hide = y > lastY && y > vh * 0.8 && !document.body.classList.contains('menu-open');
    nav.classList.toggle('is-hidden', hide);
    lastY = y;

    // Hero: Zug fährt beim Scrollen weiter nach links aus dem Bild
    if (!reduced) {
      const hy = Math.min(y, hero.offsetHeight * 1.2);
      drive.style.transform = `translate3d(${-hy * 1.1}px,0,0)`;
      const rot = `rotate(${-hy * 1.6}deg)`;
      wheels.forEach(w => { w.style.transform = `${w.getAttribute('data-base')} ${rot}`; });
    }

    // Ablauf: Lok fährt die Strecke entlang
    const r = route.getBoundingClientRect();
    const h = track.offsetHeight;
    const prog = Math.min(1, Math.max(0, (vh * 0.55 - r.top) / h));
    route.style.setProperty('--route', prog.toFixed(4));
    route.style.setProperty('--route-px', `${(prog * h).toFixed(1)}px`);
    const locoY = r.top + prog * h;
    stations.forEach(s => {
      s.classList.toggle('is-passed', s.getBoundingClientRect().top + 14 <= locoY + 1);
    });

    // aktiver Navigationspunkt
    let active = -1;
    sections.forEach((sec, i) => { if (sec && sec.getBoundingClientRect().top < vh * 0.4) active = i; });
    navLinks.forEach((a, i) => a.classList.toggle('is-active', i === active));
  };

  // SVG-Wheels: ursprüngliche translate()-Position sichern, damit Rotation sie nicht überschreibt
  wheels.forEach(w => {
    const t = w.getAttribute('transform') || '';
    const m = t.match(/translate\(([-\d.]+)[ ,]+([-\d.]+)\)/);
    w.setAttribute('data-base', m ? `translate(${m[1]}px, ${m[2]}px)` : '');
    w.removeAttribute('transform');
    w.style.transformBox = 'view-box';
    w.style.transformOrigin = '0 0';
    w.style.transform = w.getAttribute('data-base');
  });

  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  /* ---- Magnetische Buttons ---- */
  if (!reduced && window.matchMedia('(hover: hover)').matches) {
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const b = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', `${(e.clientX - b.left - b.width / 2) * 0.18}px`);
        btn.style.setProperty('--my', `${(e.clientY - b.top - b.height / 2) * 0.3}px`);
      });
      btn.addEventListener('pointerleave', () => { btn.style.setProperty('--mx', '0px'); btn.style.setProperty('--my', '0px'); });
    });
  }

  /* ---- FAQ: nur ein Eintrag offen ---- */
  const details = $$('.accordion details');
  details.forEach(d => d.addEventListener('toggle', () => {
    if (d.open) details.forEach(o => { if (o !== d) o.open = false; });
  }));

  /* ---- Formular → vorbereitete E-Mail ---- */
  const form = $('#apply-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    $$('[required]', form).forEach(f => {
      const valid = f.value.trim() && (f.type !== 'email' || /^\S+@\S+\.\S+$/.test(f.value));
      f.classList.toggle('is-invalid', !valid);
      if (!valid) ok = false;
    });
    const note = $('.form__note', form);
    if (!ok) { note.textContent = 'Bitte gib deinen Namen und eine gültige E-Mail-Adresse an.'; return; }
    const d = new FormData(form);
    const body = [
      `Name: ${d.get('name')}`,
      `E-Mail: ${d.get('email')}`,
      `Telefon: ${d.get('phone') || '–'}`,
      `Interesse: ${d.get('topic')}`,
      '',
      d.get('message') || ''
    ].join('\n');
    window.location.href = `mailto:hey@so-geht-eisenbahn.de?subject=${encodeURIComponent('Anfrage: Lokführer werden – ' + d.get('topic'))}&body=${encodeURIComponent(body)}`;
    note.textContent = 'Danke! Dein E-Mail-Programm öffnet sich mit deiner Anfrage.';
  });

  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();
})();

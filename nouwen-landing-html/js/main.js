/* nouwen — interactions */
(function () {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Countdown placeholder ----------
     Static "05" by default. Set TARGET_DATE for a live day countdown. */
  const TARGET_DATE = null; // e.g. new Date('2026-07-01T00:00:00')
  const cd = document.getElementById('countdown-value');
  if (cd && TARGET_DATE instanceof Date) {
    const update = function () {
      const days = Math.max(0, Math.ceil((TARGET_DATE - Date.now()) / 86400000));
      cd.textContent = String(days).padStart(2, '0');
    };
    update();
    setInterval(update, 60000);
  }

  /* ---------- Align the flip-clock rails to the header dividers ----------
     The two PHOTO BOOTH dividers and the clock strings must read as one
     continuous pair of vertical lines. We measure the dividers and pin the
     clock columns to the same x-positions (and stretch the strings up to the
     header). On mobile (dividers hidden) we fall back to the centred default. */
  const clock = document.querySelector('.flip-clock');
  const header = document.querySelector('.site-header');
  const dividers = Array.from(document.querySelectorAll('.nav-divider'));

  function alignRails() {
    if (!clock || !header || dividers.length < 2) return;

    const visible = dividers[0].offsetParent !== null &&
      getComputedStyle(dividers[0]).display !== 'none';

    if (!visible) {                       // mobile: use the centred CSS defaults
      ['--pin-left', '--pin-right', '--card-w', '--string-h']
        .forEach((p) => clock.style.removeProperty(p));
      return;
    }

    const clockRect = clock.getBoundingClientRect();
    let r = dividers.map((d) => {
      const b = d.getBoundingClientRect();
      return b.left + b.width / 2 - clockRect.left;   // x within the clock box
    }).sort((a, b) => a - b);

    const [xL, xR] = r;
    const gap = xR - xL;
    const cardW = Math.max(70, gap - 14);             // cards nearly touch in the middle
    const stringH = Math.max(40, clockRect.top - header.getBoundingClientRect().bottom);

    clock.style.setProperty('--pin-left', xL + 'px');
    clock.style.setProperty('--pin-right', xR + 'px');
    clock.style.setProperty('--card-w', cardW + 'px');
    clock.style.setProperty('--string-h', stringH + 'px');
  }

  window.addEventListener('resize', alignRails);
  window.addEventListener('load', alignRails);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(alignRails);
  alignRails();

  /* ---------- Showcase slider ----------
     Click a card → it animates to the centre (active) slot.
     Arrows rotate the whole strip. Caption follows the active card. */
  const showcase = document.querySelector('.showcase');
  if (showcase) {
    const cards = Array.from(showcase.querySelectorAll('.card'));
    const imgs  = cards.map((c) => c.querySelector('.card__img'));
    const nameEl = document.getElementById('showcase-name');
    const eyebrowEl = showcase.querySelector('.showcase__eyebrow');
    const featureImg = showcase.querySelector('.card--feature .card__img');
    const CENTER = Math.floor(cards.length / 2);

    // each item = { img: <css url string>, eyebrow, name }
    const items = cards.map((c, i) => ({
      img: (imgs[i].getAttribute('style') || '').replace('--img:', '').trim(),
      eyebrow: c.dataset.eyebrow || '',
      name: c.dataset.name || ''
    }));

    // order[slotIndex] = itemIndex  (which item is shown in each slot)
    let order = items.map((_, i) => i);

    function render(pop) {
      order.forEach((itemIdx, slot) => {
        imgs[slot].style.cssText = '--img:' + items[itemIdx].img;
      });
      const active = items[order[CENTER]];
      if (eyebrowEl) eyebrowEl.textContent = active.eyebrow;
      if (nameEl) nameEl.textContent = active.name;

      if (pop && featureImg) {
        featureImg.classList.remove('is-pop');
        void featureImg.offsetWidth;          // restart animation
        featureImg.classList.add('is-pop');
      }
    }

    function bringToCenter(slot) {
      if (slot === CENTER) return;
      const tmp = order[slot];
      order[slot] = order[CENTER];
      order[CENTER] = tmp;
      render(true);
    }

    function rotate(dir) {
      if (dir > 0) order.push(order.shift());   // next
      else order.unshift(order.pop());          // prev
      render(true);
    }

    cards.forEach((card, i) => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.addEventListener('click', () => bringToCenter(i));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bringToCenter(i); }
      });
    });

    const prev = showcase.querySelector('.showcase__arrow--prev');
    const next = showcase.querySelector('.showcase__arrow--next');
    if (prev) prev.addEventListener('click', () => rotate(-1));
    if (next) next.addEventListener('click', () => rotate(1));

    render(false);  // sync caption with the initial active card
  }
})();

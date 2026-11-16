/* =========================================================
   Oleksii — portfolio · case.js (сторінки-кейси)
   Мова (спільна з головною через localStorage), поява блоків, перегляд скриншотів
   ========================================================= */
(function () {
  var d = document.documentElement;
  var TITLES = {
    uk: document.title,
    en: (document.querySelector('.case-title [data-l="en"]') || {}).textContent + ' — case study · Oleksii',
  };

  function setLang(lang) {
    d.lang = lang;
    document.title = TITLES[lang];
    document.querySelectorAll('.lang-switch [data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    // alt / aria-label — атрибути, тому перемикаємо їх окремо
    document.querySelectorAll('[data-alt-' + lang + ']').forEach(function (el) { el.alt = el.getAttribute('data-alt-' + lang); });
    document.querySelectorAll('[data-label-' + lang + ']').forEach(function (el) { el.setAttribute('aria-label', el.getAttribute('data-label-' + lang)); });
    try { localStorage.setItem('lang', lang); } catch (e) { /* приватний режим */ }
  }
  setLang(d.lang === 'en' ? 'en' : 'uk');
  document.querySelectorAll('.lang-switch [data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

  // Поява блоків при скролі
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Перегляд скриншота на весь екран (<dialog>: Esc закриває, фокус повертається)
  var dlg = document.querySelector('.zoom');
  if (dlg && typeof dlg.showModal === 'function') {
    var big = dlg.querySelector('img');
    var opener = null;
    document.querySelectorAll('[data-zoom]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var img = btn.querySelector('img');
        big.src = btn.dataset.zoom;
        big.width = +btn.dataset.w; big.height = +btn.dataset.h;
        big.alt = img ? img.alt : '';
        dlg.showModal();
      });
    });
    var close = function () { dlg.close(); };
    dlg.querySelector('.zoom-close').addEventListener('click', close);
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target === big) close(); });
    dlg.addEventListener('close', function () { if (opener) opener.focus(); });
  } else {
    // старі браузери: просто відкриваємо картинку
    document.querySelectorAll('[data-zoom]').forEach(function (btn) {
      btn.addEventListener('click', function () { window.open(btn.dataset.zoom, '_blank'); });
    });
  }
})();

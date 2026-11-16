/* =========================================================
   Oleksii — portfolio · main.js
   Етап 1: мова, плавний скрол (Lenis), курсор, магнітні кнопки,
           поява тексту по літерах, 3D-сцена на Three.js
   ========================================================= */

// ---------- Дані проєктів ----------
// Щоб додати/змінити проєкт — редагуй цей масив.
//   image: шлях до картинки в images/ (наприклад 'images/coffee-miniapp.webp').
//          Порожній рядок або файл, що не завантажився → гарна SVG-заглушка.
//   kind:  вигляд заглушки — 'site' | 'bot' | 'miniapp'
//   motif: значок на заглушці — 'cup' | 'calendar' | 'barber' | 'play' | 'bag'
//   demo:  посилання «Демо» (null — кнопки не буде), code: посилання «Код»
const PROJECTS = [
  {
    kind: 'miniapp',
    motif: 'cup',
    image: '',
    type: { uk: 'Mini App', en: 'Mini App' },
    title: { uk: "Telegram Mini App для кав'ярні", en: 'Coffee shop Telegram Mini App' },
    desc: {
      uk: 'Меню, кошик і замовлення на самовивіз просто в Telegram. Бот з адмінкою, де бариста змінює статуси замовлень.',
      en: 'Menu, cart and pickup orders right inside Telegram, plus a bot with an admin panel for order statuses.',
    },
    tags: ['Mini App', 'JavaScript', 'Python', 'aiogram 3'],
    demo: 'https://t.me/coffee_miniapp_bot_bot',
    code: 'https://github.com/blessedrbls/coffee-miniapp',
  },
  {
    kind: 'bot',
    motif: 'calendar',
    image: '',
    type: { uk: 'Telegram-бот', en: 'Telegram bot' },
    title: { uk: 'Бот онлайн-запису в барбершоп', en: 'Barbershop booking bot' },
    desc: {
      uk: 'Запис до майстра у два дотики: вільні слоти, нагадування, відгуки та адмін-панель.',
      en: 'Book a barber in two taps: free time slots, reminders, reviews and an admin panel.',
    },
    tags: ['Python', 'aiogram 3', 'SQLite', 'APScheduler'],
    demo: 'https://t.me/barbershop_barbershop_bot_bot',
    code: 'https://github.com/blessedrbls/telegram-booking-bot',
  },
  {
    kind: 'site',
    motif: 'barber',
    image: '',
    type: { uk: 'Сайт', en: 'Website' },
    title: { uk: 'Сайт барбершопу', en: 'Barbershop website' },
    desc: {
      uk: 'Сайт з онлайн-записом: вільний час кожного майстра, без подвійних бронювань, заявки одразу в Telegram.',
      en: "Website with online booking: each barber's free time, no double bookings, requests go straight to Telegram.",
    },
    tags: ['HTML/CSS/JS', 'Cloudflare Workers', 'D1'],
    demo: 'https://blessedrbls.github.io/barbershop-site/',
    code: 'https://github.com/blessedrbls/barbershop-site',
  },
  {
    kind: 'site',
    motif: 'play',
    image: '',
    type: { uk: 'Лендінг', en: 'Landing page' },
    title: { uk: 'Лендінг онлайн-курсу', en: 'Online course landing page' },
    desc: {
      uk: 'Демо-лендінг для онлайн-курсу з Python на чистому HTML, CSS і JavaScript.',
      en: 'Demo landing page for an online Python course, built with plain HTML, CSS and JavaScript.',
    },
    tags: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://blessedrbls.github.io/landing-course/',
    code: 'https://github.com/blessedrbls/landing-course',
  },
  {
    kind: 'bot',
    motif: 'bag',
    image: '',
    type: { uk: 'Telegram-бот', en: 'Telegram bot' },
    title: { uk: 'Бот-магазин', en: 'Telegram shop bot' },
    desc: {
      uk: 'Магазин у Telegram: каталог, кошик, оформлення замовлення, статуси, адмін-панель і розсилки.',
      en: 'A shop inside Telegram: catalogue, cart, checkout, order statuses, admin panel and broadcasts.',
    },
    tags: ['Python', 'aiogram 3', 'SQLite'],
    demo: null,
    code: 'https://github.com/blessedrbls/telegram-shop-bot',
  },
];

// ---------- Переклади ----------
const I18N = {
  uk: {
    'meta.title': 'Олексій — сайти та Telegram-боти для бізнесу',
    'skip': 'Перейти до змісту',
    'nav.services': 'Послуги',
    'nav.work': 'Роботи',
    'nav.process': 'Процес',
    'nav.contact': 'Контакти',
    'hero.hello': 'Привіт, я',
    'hero.name': 'Олексій',
    'hero.role': 'веб-розробник',
    // *слово* — підсвічується акцентним кольором
    'hero.title': 'Сайти та *Telegram-боти* для бізнесу',
    'hero.lead': 'Швидкі сайти, лендінги, боти та Mini Apps, які приводять клієнтів і економлять ваш час.',
    'hero.cta': 'Обговорити проєкт',
    'hero.status': 'Відкритий до нових проєктів',
    'hero.scroll': 'Гортай',
    'services.title': 'Що я роблю',
    'services.1.title': 'Сайти та лендінги',
    'services.1.text': 'Швидкі адаптивні сайти й лендінги, які гарно виглядають на будь-якому екрані й перетворюють відвідувачів на заявки.',
    'services.1.tags': 'Лендінги · Сайти-візитки · Онлайн-запис',
    'services.2.title': 'Telegram-боти',
    'services.2.text': 'Боти для запису, продажів і підтримки: приймають замовлення й відповідають клієнтам 24/7, поки ви займаєтесь справами.',
    'services.2.tags': 'Запис · Магазини · Адмін-панелі',
    'services.3.title': 'Telegram Mini Apps',
    'services.3.text': 'Повноцінні застосунки всередині Telegram: каталог, кошик і замовлення без встановлення окремої програми.',
    'services.3.tags': 'Меню · Кошик · Замовлення',
    'work.title': 'Роботи',
    'work.hint': 'Гортай — проєкти їдуть убік',
    'work.demo': 'Демо',
    'work.code': 'Код',
    'process.title': 'Як я працюю',
    'contact.title': 'Контакти',
    'footer.top': 'Нагору ↑',
    'statement.text': 'Кожен *сайт* і кожен *бот*, який я роблю, має одну мету — *приводити вам клієнтів*.',
  },
  en: {
    'meta.title': 'Oleksii — websites & Telegram bots for business',
    'skip': 'Skip to content',
    'nav.services': 'Services',
    'nav.work': 'Work',
    'nav.process': 'Process',
    'nav.contact': 'Contact',
    'hero.hello': "Hi, I'm",
    'hero.name': 'Oleksii',
    'hero.role': 'web developer',
    'hero.title': 'Websites & *Telegram bots* for business',
    'hero.lead': 'Fast websites, landing pages, bots and Mini Apps that bring you clients and save your time.',
    'hero.cta': 'Start a project',
    'hero.status': 'Open for new projects',
    'hero.scroll': 'Scroll',
    'services.title': 'What I do',
    'services.1.title': 'Websites & landing pages',
    'services.1.text': 'Fast, responsive websites and landing pages that look great on any screen and turn visitors into leads.',
    'services.1.tags': 'Landing pages · Business sites · Online booking',
    'services.2.title': 'Telegram bots',
    'services.2.text': 'Bots for bookings, sales and support: they take orders and answer your clients 24/7 while you run your business.',
    'services.2.tags': 'Booking · Shops · Admin panels',
    'services.3.title': 'Telegram Mini Apps',
    'services.3.text': 'Full apps inside Telegram: catalogue, cart and orders without installing anything.',
    'services.3.tags': 'Menu · Cart · Orders',
    'work.title': 'Work',
    'work.hint': 'Keep scrolling — projects slide sideways',
    'work.demo': 'Demo',
    'work.code': 'Code',
    'process.title': 'How I work',
    'contact.title': 'Contact',
    'footer.top': 'Back to top ↑',
    'statement.text': 'Every *website* and every *bot* I build has one job: *bring you clients*.',
  },
};

// ---------- Утиліти та середовище ----------
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const html = document.documentElement;

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const IS_TOUCH = window.matchMedia('(hover: none), (pointer: coarse)').matches;
const IS_MOBILE = IS_TOUCH || window.innerWidth < 768;
const HAS_GSAP = typeof window.gsap !== 'undefined';

// Якщо користувач змінить налаштування анімацій — просто перезавантажимо
window.matchMedia('(prefers-reduced-motion: reduce)')
  .addEventListener?.('change', () => location.reload());

let currentLang = 'uk';

// Спільний стан скролу: прогрес «прилиплого» першого екрану (0..1) і швидкість прокрутки
const heroScroll = { p: 0 };
const scrollSpeed = { raw: 0, smooth: 0 };

/* =========================================================
   Розбиття тексту на літери
   ========================================================= */
function splitText(el, text) {
  // *фраза в зірочках* → слова з класом is-accent
  const words = [];
  let accent = false;
  text.split(' ').forEach((raw) => {
    // «*бот*,» → зірочки + слово + розділовий знак після закривальної зірочки
    const m = raw.match(/^(\*?)(.*?)(\*?)([.,!?:;…]*)$/);
    const opens = m[1] === '*';
    const closes = m[3] === '*';
    if (opens) accent = true;
    words.push({ word: m[2], tail: m[4], accent });
    if (closes) accent = false;
  });

  el.setAttribute('aria-label', words.map((w) => w.word + w.tail).join(' '));
  el.textContent = '';
  words.forEach(({ word, tail, accent: isAccent }, i) => {
    const w = document.createElement('span');
    w.className = isAccent ? 'word is-accent' : 'word';
    w.setAttribute('aria-hidden', 'true');
    // розділові знаки після виділеного слова — звичайним кольором
    const chars = [...word].map((ch) => [ch, false]).concat([...tail].map((ch) => [ch, isAccent]));
    for (const [ch, plain] of chars) {
      // .char — для анімації виходу при скролі, .char-in — для появи (щоб вони не конфліктували)
      const c = document.createElement('span');
      c.className = plain ? 'char is-plain' : 'char';
      const inner = document.createElement('span');
      inner.className = 'char-in';
      inner.textContent = ch;
      c.appendChild(inner);
      w.appendChild(c);
    }
    el.appendChild(w);
    if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
  });
}

/* =========================================================
   Мова
   ========================================================= */
function applyLang(lang) {
  const dict = I18N[lang] || I18N.uk;
  currentLang = I18N[lang] ? lang : 'uk';
  html.lang = currentLang;
  document.title = dict['meta.title'];

  $$('[data-i18n]').forEach((el) => {
    const value = dict[el.dataset.i18n];
    if (value == null) return;
    if (el.hasAttribute('data-split')) splitText(el, value);
    else el.textContent = value;
  });

  $$('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === currentLang)));
  try { localStorage.setItem('lang', currentLang); } catch (e) { /* приватний режим */ }
}

function initLangSwitch() {
  $$('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.lang === currentLang) return;
      fxCtx?.revert();          // старі літери зникнуть — анімації скролу треба перебудувати
      applyLang(btn.dataset.lang);
      revealHero(true);
      initScrollFx();
      refreshScroll();
    });
  });
}

/* =========================================================
   Поява тексту на головному екрані
   ========================================================= */
function revealHero(fast = false) {
  clearTimeout(window.__revealFallback);
  if (REDUCED || !HAS_GSAP) {
    html.classList.add('reveal-fallback');
    return;
  }
  const { gsap } = window;
  const chars = $$('.hero-title .char-in');

  gsap.set('.hero-title', { opacity: 1 });

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.fromTo(chars,
    { yPercent: 110, rotate: 8, opacity: 0 },
    { yPercent: 0, rotate: 0, opacity: 1, duration: fast ? 0.8 : 1.2, stagger: fast ? 0.012 : 0.028 },
    fast ? 0 : 0.2);

  if (!fast) {
    tl.fromTo('.hero-reveal',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
      '-=0.8');
  }
  return tl;
}

/* =========================================================
   Плавний скрол (Lenis + GSAP ScrollTrigger)
   ========================================================= */
let lenis = null;

function initScroll() {
  if (HAS_GSAP && window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);

  // Без анімацій або без бібліотеки — звичайний нативний скрол
  if (REDUCED || !HAS_GSAP || typeof window.Lenis === 'undefined') return;

  window.ScrollTrigger.config({ ignoreMobileResize: true });

  // Плавний інерційний скрол колесом/тачпадом. На телефонах — нативний (там він і так плавний).
  lenis = new window.Lenis({
    lerp: 0.1,           // м'якість: менше — довше «пливе», більше — різкіше
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,
  });

  lenis.on('scroll', window.ScrollTrigger.update);
  window.gsap.ticker.add((time) => lenis.raf(time * 1000));
  window.gsap.ticker.lagSmoothing(0);
}

// Шапка отримує фон, щойно сторінку прокрутили
function initHeader() {
  const header = $('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Якірні посилання (#services тощо) — плавно через Lenis
function initAnchors() {
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const target = id.length > 1 ? $(id) : null;
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { duration: 1.6 });
      else target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
      // переносимо фокус для клавіатури/скрінрідерів
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
}

/* =========================================================
   Кастомний курсор
   ========================================================= */
function initCursor() {
  if (IS_TOUCH || REDUCED) return; // на сенсорних і без анімацій — системний курсор
  const cursor = $('.cursor');
  const dot = $('.cursor-dot');
  const ring = $('.cursor-ring');
  if (!cursor) return;

  html.classList.add('has-cursor');

  // Точка і кільце стоять рівно там, де миша — без інерції.
  // pointerrawupdate (Chrome/Edge) приходить частіше й раніше за pointermove → менша затримка.
  const moveEvent = 'onpointerrawupdate' in window ? 'pointerrawupdate' : 'pointermove';
  let x = 0;
  let y = 0;
  let dirty = false;

  window.addEventListener(moveEvent, (e) => {
    if (e.pointerType !== 'mouse') return;
    x = e.clientX;
    y = e.clientY;
    if (!dirty) {
      dirty = true;
      requestAnimationFrame(paint);
    }
  }, { passive: true });

  function paint() {
    dirty = false;
    const t = `translate3d(${x}px, ${y}px, 0)`;
    dot.style.transform = t;
    ring.style.transform = t;
    cursor.classList.add('is-visible');
  }

  document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
  document.addEventListener('pointerdown', () => cursor.classList.add('is-down'));
  document.addEventListener('pointerup', () => cursor.classList.remove('is-down'));

  // Збільшення над інтерактивними елементами
  document.addEventListener('pointerover', (e) => {
    const hit = e.target.closest('a, button, [data-cursor]');
    cursor.classList.toggle('is-hover', !!hit);
  });
}

/* =========================================================
   Магнітні кнопки  (data-magnetic="0.35" — сила притягування)
   ========================================================= */
function initMagnetic() {
  if (IS_TOUCH || REDUCED || !HAS_GSAP) return;
  const { gsap } = window;

  $$('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic) || 0.35;
    const inner = $('.magnetic-inner', el);
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    const ixTo = inner ? gsap.quickTo(inner, 'x', { duration: 0.6, ease: 'power3.out' }) : null;
    const iyTo = inner ? gsap.quickTo(inner, 'y', { duration: 0.6, ease: 'power3.out' }) : null;
    let rect = null;

    el.addEventListener('pointerenter', () => { rect = el.getBoundingClientRect(); });
    el.addEventListener('pointermove', (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      ixTo?.(dx * strength * 0.45);
      iyTo?.(dy * strength * 0.45);
    });
    el.addEventListener('pointerleave', () => {
      rect = null;
      gsap.to([el, inner].filter(Boolean), { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)' });
    });
  });
}

/* =========================================================
   Ефекти скролу
   ========================================================= */
let fxCtx = null;

// Перебудовується при зміні мови (бо літери заголовків створюються заново)
function initScrollFx() {
  if (REDUCED || !HAS_GSAP || !window.ScrollTrigger) return;
  const { gsap } = window;
  fxCtx?.revert();
  fxCtx = gsap.context(() => {
    // 1) Перший екран «прилипає» на висоту ще одного екрана:
    //    літери по черзі виїжджають вгору, решта зникає, а сфера (у 3D) виходить у центр і вибухає
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '+=110%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => { heroScroll.p = self.progress; },
        onLeaveBack: () => { heroScroll.p = 0; },
        refreshPriority: 1, // перший екран вище за інші закріплені секції — рахуємо його першим
      },
    });
    tl.to('.hero-title .char', {
      y: '-1.3em', rotate: -8, opacity: 0, ease: 'power2.in', duration: 0.4, stagger: { each: 0.008, from: 'start' },
    }, 0)
      // дочірні елементи, а не самі .hero-reveal — їх уже анімує поява, і анімації конфліктували б
      .to(['.hero-top > *', '.hero-bottom', '.hero-meta > *'], { autoAlpha: 0, y: -50, duration: 0.25, stagger: 0.03 }, 0.02)
      .to('.hero-glow', { opacity: 0, duration: 0.6 }, 0.3)
      .to({}, { duration: 0.4 }); // «запас» — поки сфера розлітається вибухом

    // 2) Фраза: слова по черзі «загоряються» від ледь помітних до яскравих —
    //    уся фраза видна одразу, а швидкість ефекту задає сам користувач колесом
    const statementWords = $$('.statement-text .word');
    if (statementWords.length) {
      gsap.fromTo(statementWords, { opacity: 0.14 }, {
        opacity: 1, ease: 'none', stagger: 0.1,
        scrollTrigger: { trigger: '.statement-text', start: 'top 80%', end: 'bottom 45%', scrub: 0.5 },
      });
    }

    // 3) Заголовки розділів з'являються по літерах
    $$('.section-title').forEach((title) => {
      const chars = $$('.char-in', title);
      if (!chars.length) return;
      gsap.from(chars, {
        yPercent: 115, rotate: 8, duration: 1.1, ease: 'expo.out', stagger: 0.025,
        scrollTrigger: { trigger: title, start: 'top 88%', once: true },
      });
      const index = title.previousElementSibling;
      if (index) {
        gsap.from(index, {
          opacity: 0, x: -20, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: title, start: 'top 88%', once: true },
        });
      }
    });
  });
}

// Швидкість прокрутки, прогрес-смужка, нахил при швидкому скролі
function initScrollMotion() {
  if (REDUCED || !HAS_GSAP || !window.ScrollTrigger) return;
  const { gsap } = window;

  window.ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: (self) => { scrollSpeed.raw = self.getVelocity(); },
  });

  gsap.to('.scroll-progress', {
    scaleX: 1, ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });

  const skewTargets = $$('[data-skew]');
  const setSkew = skewTargets.length ? gsap.quickSetter(skewTargets, 'skewY', 'deg') : null;
  let lastSkew = 0;
  gsap.ticker.add(() => {
    scrollSpeed.raw *= 0.9; // коли скрол зупинився — швидкість плавно згасає
    scrollSpeed.smooth += (scrollSpeed.raw - scrollSpeed.smooth) * 0.12;
    if (setSkew) {
      const skew = gsap.utils.clamp(-3.5, 3.5, scrollSpeed.smooth * -0.0025);
      if (Math.abs(skew - lastSkew) > 0.01) { setSkew(skew); lastSkew = skew; }
    }
  });
}

/* =========================================================
   2. «Що я роблю»: картки з'являються по черзі, нахиляються за мишею,
      край світиться неоном там, де курсор
   ========================================================= */
function initServices() {
  const cards = $$('.service-card');
  if (!cards.length) return;

  if (!REDUCED && HAS_GSAP && window.ScrollTrigger) {
    window.gsap.from(cards, {
      y: 90, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.15,
      scrollTrigger: { trigger: '.services-grid', start: 'top 82%', once: true },
    });
  }

  // Підсвітка краю йде за курсором (це не рух, тож працює і в режимі «без анімацій»)
  cards.forEach((card) => {
    let rect = null;
    card.addEventListener('pointerenter', () => { rect = card.getBoundingClientRect(); });
    card.addEventListener('pointermove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
    card.addEventListener('pointerleave', () => { rect = null; });
  });

  // 3D-нахил — лише для миші й коли анімації дозволені
  if (IS_TOUCH || REDUCED || !HAS_GSAP) return;
  const { gsap } = window;
  cards.forEach((card) => {
    // перспективу задає батьківська сітка (CSS perspective), тож у спокої картка — звичайний 2D-елемент
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });
    let rect = null;
    card.addEventListener('pointerenter', () => { rect = card.getBoundingClientRect(); });
    card.addEventListener('pointermove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5..0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      ry(px * 12);
      rx(-py * 10);
    });
    card.addEventListener('pointerleave', () => {
      rect = null;
      gsap.to(card, {
        rotationX: 0, rotationY: 0, duration: 0.9, ease: 'power3.out', overwrite: 'auto',
        onComplete: () => gsap.set(card, { clearProps: 'rotationX,rotationY' }), // повертаємо чіткий 2D-текст
      });
    });
  });
}

/* =========================================================
   3. «Роботи»: картки з масиву PROJECTS
   ========================================================= */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Красива заглушка замість картинки: макет пристрою + значок теми проєкту
function placeholderSVG(p, i) {
  const id = `ph${i}`;
  const W = (a) => `rgba(241,240,234,${a})`;
  const frameStroke = 'rgba(255,255,255,.13)';

  const phone = `
    <rect x="150" y="22" width="150" height="256" rx="24" fill="#14121c" stroke="${frameStroke}"/>
    <rect x="200" y="32" width="50" height="6" rx="3" fill="${W(0.12)}"/>`;

  const devices = {
    site: `
      <rect x="56" y="46" width="294" height="208" rx="12" fill="#14121c" stroke="${frameStroke}"/>
      <path d="M56 72h294" stroke="${W(0.08)}"/>
      <circle cx="72" cy="59" r="4" fill="${W(0.25)}"/><circle cx="85" cy="59" r="4" fill="${W(0.25)}"/><circle cx="98" cy="59" r="4" fill="${W(0.25)}"/>
      <rect x="140" y="54" width="140" height="10" rx="5" fill="${W(0.07)}"/>
      <rect x="76" y="94" width="140" height="14" rx="7" fill="${W(0.9)}"/>
      <rect x="76" y="116" width="104" height="14" rx="7" fill="${W(0.5)}"/>
      <rect x="76" y="144" width="128" height="6" rx="3" fill="${W(0.18)}"/>
      <rect x="76" y="156" width="96" height="6" rx="3" fill="${W(0.18)}"/>
      <rect x="76" y="180" width="76" height="24" rx="12" fill="currentColor"/>
      <rect x="230" y="90" width="100" height="122" rx="10" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-opacity=".35"/>
      <rect x="76" y="222" width="254" height="16" rx="6" fill="${W(0.05)}"/>`,
    bot: `${phone}
      <circle cx="174" cy="60" r="11" fill="currentColor" fill-opacity=".85"/>
      <rect x="192" y="54" width="62" height="7" rx="3.5" fill="${W(0.8)}"/>
      <rect x="192" y="65" width="38" height="5" rx="2.5" fill="${W(0.25)}"/>
      <path d="M150 82h150" stroke="${W(0.07)}"/>
      <rect x="164" y="96" width="94" height="26" rx="10" fill="${W(0.1)}"/>
      <rect x="194" y="130" width="92" height="26" rx="10" fill="currentColor" fill-opacity=".85"/>
      <rect x="164" y="164" width="106" height="34" rx="10" fill="${W(0.1)}"/>
      <rect x="164" y="208" width="58" height="22" rx="8" fill="none" stroke="currentColor" stroke-opacity=".7"/>
      <rect x="228" y="208" width="58" height="22" rx="8" fill="none" stroke="currentColor" stroke-opacity=".7"/>
      <rect x="164" y="236" width="122" height="22" rx="8" fill="none" stroke="currentColor" stroke-opacity=".7"/>`,
    miniapp: `${phone}
      <rect x="164" y="48" width="78" height="9" rx="4.5" fill="${W(0.85)}"/>
      <circle cx="276" cy="52" r="8" fill="currentColor" fill-opacity=".85"/>
      ${[[164, 70], [228, 70], [164, 148], [228, 148]].map(([x, y]) => `
        <rect x="${x}" y="${y}" width="58" height="70" rx="10" fill="${W(0.06)}"/>
        <circle cx="${x + 29}" cy="${y + 27}" r="14" fill="currentColor" fill-opacity=".25" stroke="currentColor" stroke-opacity=".7"/>
        <rect x="${x + 10}" y="${y + 52}" width="30" height="6" rx="3" fill="${W(0.35)}"/>`).join('')}
      <rect x="164" y="232" width="122" height="30" rx="15" fill="currentColor"/>`,
  };

  // Значки (центр ≈ 385,109 — у «плаваючій» картці праворуч)
  const s = 'fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
  const motifs = {
    cup: `<path d="M365 98h34v16a14 14 0 0 1-14 14h-6a14 14 0 0 1-14-14z" ${s}/>
          <path d="M399 102h5a7 7 0 0 1 0 14h-5" ${s}/>
          <path d="M375 90c-3-4 3-6 0-10M386 90c-3-4 3-6 0-10" ${s} stroke-width="2.5"/>`,
    calendar: `<rect x="362" y="86" width="46" height="44" rx="6" ${s}/>
          <path d="M362 98h46M374 80v10M396 80v10" ${s}/>
          ${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => (r === 1 && c === 2
            ? `<rect x="${387}" y="${109}" width="8" height="7" rx="2" fill="currentColor"/>`
            : `<circle cx="${371 + c * 10}" cy="${106 + r * 8}" r="1.8" fill="${W(0.45)}"/>`)).join('')).join('')}`,
    barber: `<clipPath id="${id}c"><rect x="378" y="88" width="14" height="42" rx="2"/></clipPath>
          <rect x="375" y="80" width="20" height="9" rx="3" fill="${W(0.85)}"/>
          <rect x="375" y="129" width="20" height="9" rx="3" fill="${W(0.85)}"/>
          <g clip-path="url(#${id}c)"><rect x="378" y="88" width="14" height="42" fill="${W(0.9)}"/>
          ${[0, 1, 2, 3, 4, 5].map((k) => `<path d="M376 ${92 + k * 8}l18 -10v5l-18 10z" fill="currentColor"/>`).join('')}</g>`,
    play: `<circle cx="385" cy="109" r="24" ${s}/><path d="M378 97v24l20-12z" fill="currentColor"/>`,
    bag: `<path d="M366 96h38l-3 36h-32z" ${s}/><path d="M376 96v-6a9 9 0 0 1 18 0v6" ${s}/>`,
  };

  return `
  <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid slice" style="color:var(--accent)" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="${id}g" cx="60%" cy="45%" r="62%">
        <stop offset="0" stop-color="currentColor" stop-opacity=".42"/>
        <stop offset="1" stop-color="currentColor" stop-opacity="0"/>
      </radialGradient>
      <pattern id="${id}p" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" fill="none" stroke="rgba(255,255,255,.045)"/>
      </pattern>
    </defs>
    <rect width="480" height="300" fill="#0b0a12"/>
    <rect width="480" height="300" fill="url(#${id}p)"/>
    <rect width="480" height="300" fill="url(#${id}g)"/>
    ${devices[p.kind] || devices.site}
    <g transform="rotate(6 385 109)">
      <rect x="331" y="55" width="108" height="108" rx="20" fill="#17141f" stroke="currentColor" stroke-opacity=".55"/>
      ${motifs[p.motif] || ''}
    </g>
  </svg>`;
}

function renderProjects() {
  const track = $('.work-track');
  if (!track) return;
  // обидва переклади в картці; CSS показує потрібний (без перебудови при зміні мови)
  const both = (o) => `<span data-l="uk">${esc(o.uk)}</span><span data-l="en">${esc(o.en)}</span>`;
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19L19 5M19 5H8M19 5v11" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
  const codeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const n = (x) => String(x).padStart(2, '0');

  track.innerHTML = PROJECTS.map((p, i) => `
    <li class="project-card">
      <div class="project-media">
        <div class="project-media-inner">
          ${p.image
            ? `<img src="${esc(p.image)}" alt="" loading="lazy" decoding="async" data-ph="${i}">`
            : placeholderSVG(p, i)}
        </div>
      </div>
      <div class="project-body">
        <div class="project-meta mono"><span class="project-type">${both(p.type)}</span><span>${n(i + 1)} / ${n(PROJECTS.length)}</span></div>
        <h3 class="project-title">${both(p.title)}</h3>
        <p class="project-desc">${both(p.desc)}</p>
        <ul class="project-tags" role="list">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        <div class="project-actions">
          ${p.demo ? `<a class="project-btn project-btn--demo" href="${esc(p.demo)}" target="_blank" rel="noopener">${both({ uk: 'Демо', en: 'Demo' })}<span class="sr-only">: ${both(p.title)}</span>${arrow}</a>` : ''}
          ${p.code ? `<a class="project-btn project-btn--code" href="${esc(p.code)}" target="_blank" rel="noopener">${both({ uk: 'Код', en: 'Code' })}<span class="sr-only">: ${both(p.title)}</span>${codeIcon}</a>` : ''}
        </div>
      </div>
    </li>`).join('');

  // Картинку не знайдено → заглушка
  $$('img[data-ph]', track).forEach((img) => {
    img.addEventListener('error', () => {
      const i = Number(img.dataset.ph);
      img.outerHTML = placeholderSVG(PROJECTS[i], i);
    }, { once: true });
  });
}

// Десктоп: секція закріплюється, а картки їдуть уліво, поки гортаєш униз.
// Телефон / планшет / «без анімацій»: звичайний вертикальний список (CSS за замовчуванням).
function initWork() {
  const section = $('.work');
  const track = $('.work-track');
  if (!section || !track || REDUCED || !HAS_GSAP || !window.ScrollTrigger) return;
  const { gsap } = window;

  gsap.matchMedia().add('(min-width: 900px) and (hover: hover) and (pointer: fine)', () => {
    section.classList.add('is-horizontal');
    const viewport = $('.work-viewport', section);
    const bar = $('.work-progress span', section);
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
      },
    });

    // Паралакс картинок усередині карток під час руху стрічки
    $$('.project-media-inner > *', track).forEach((media) => {
      gsap.fromTo(media, { xPercent: -4 }, {
        xPercent: 4, ease: 'none',
        scrollTrigger: { trigger: media.closest('.project-card'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
      });
    });

    return () => section.classList.remove('is-horizontal');
  });
}

// Перерахунок позицій усіх тригерів у порядку їх розташування на сторінці
function refreshScroll() {
  if (!HAS_GSAP || !window.ScrollTrigger) return;
  window.ScrollTrigger.sort();
  window.ScrollTrigger.refresh();
}

/* =========================================================
   3D-сцена: «жива» сфера з частинок
   ========================================================= */
const NOISE_GLSL = /* glsl */`
  // Simplex 3D noise — Ashima Arts / Stefan Gustavson (MIT)
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

const VERTEX = /* glsl */`
  uniform float uTime;
  uniform vec2  uMouse;      // миша в NDC (-1..1)
  uniform float uAspect;
  uniform float uHover;      // 0..1 — чи миша над сценою
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uScroll;     // 0..1 — прогрес скролу першого екрану
  uniform float uIntro;      // 0..1 — анімація появи
  uniform float uExplode;    // 0..1 — «вибух» сфери при скролі
  uniform float uExplodeAmp; // сила вибуху (у легкому режимі менша)
  attribute float aRandom;
  varying float vGlow;
  varying float vAlpha;
  ${NOISE_GLSL}

  void main() {
    vec3 n = normalize(position);
    float t = uTime * 0.22;

    float big   = snoise(n * 1.5 + vec3(t, t * 0.7, -t * 0.5));
    float small = snoise(n * 4.2 - vec3(t * 1.4)) * 0.22;
    float disp  = (big + small) * (0.26 + uScroll * 0.7);

    float radius = (1.0 + disp) * (1.0 + aRandom * 0.07) * mix(0.35, 1.0, uIntro) * (1.0 + uScroll * 0.35);
    vec3 pos = n * radius;

    // Вибух: кожна точка летить назовні зі своєю швидкістю й трохи закручується
    float e = uExplode * uExplode;
    pos += n * e * (0.8 + aRandom * 3.4) * uExplodeAmp;
    pos += vec3(-n.z, 0.0, n.x) * e * (aRandom - 0.5) * 2.4 * uExplodeAmp;

    // Перша проєкція — дізнаємось, де точка на екрані
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vec4 clip = projectionMatrix * mv;
    vec2 d = clip.xy / clip.w - uMouse;
    d.x *= uAspect;
    float m = smoothstep(0.42, 0.0, length(d)) * uHover;

    // Точки біля курсора «відштовхуються» назовні
    pos += n * m * 0.6;
    mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    gl_PointSize = uSize * uPixelRatio * (0.55 + aRandom * 0.9) * (1.0 + m * 1.6) * (1.0 + e * 0.9) / -mv.z;

    vGlow  = clamp(disp * 2.6 + m * 1.6 + e * 0.9, 0.0, 1.0);
    vAlpha = mix(0.18, 1.0, smoothstep(7.4, 5.0, -mv.z)) * uIntro * (1.0 - smoothstep(0.55, 1.0, uExplode));
  }
`;

const FRAGMENT = /* glsl */`
  uniform vec3 uColorA;  // неон
  uniform vec3 uColorB;  // базовий сірий
  varying float vGlow;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.05, d);
    vec3 col = mix(uColorB, uColorA, vGlow);
    gl_FragColor = vec4(col, a * vAlpha);
  }
`;

async function initHero3D() {
  const canvas = $('.hero-canvas');
  const hero = $('.hero');
  if (!canvas || !hero) return;

  let THREE;
  try {
    THREE = await import('three');
  } catch (err) {
    console.warn('[hero] Three.js не завантажився', err);
    html.classList.add('no-webgl');
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  } catch (err) {
    console.warn('[hero] WebGL недоступний', err);
    html.classList.add('no-webgl');
    return;
  }

  // ---- Рівні якості. Якщо кадрів мало — сцена сама спускається на рівень нижче ----
  // crop: малюємо лише прямокутник навколо сфери, а не весь екран (полотно в 2 рази менше)
  // lite: зерно стає нерухомим фоном замість окремого шару поверх сторінки
  // frameMs: мінімальний інтервал між кадрами сфери (33 = ~30 FPS для найслабших пристроїв)
  const dpr = window.devicePixelRatio || 1;
  const QUALITY = [
    { pr: Math.min(dpr, 1.5), frac: 1,    crop: false, frameMs: 12 },
    { pr: Math.min(dpr, 1),   frac: 1,    crop: false, frameMs: 12 },
    { pr: Math.min(dpr, 1),   frac: 0.55, crop: true,  frameMs: 12, size: 1.25 },
    { pr: Math.min(dpr, 1),   frac: 0.4,  crop: true,  frameMs: 33, size: 1.35 },
  ];
  const COUNT = IS_MOBILE ? 5000 : 10000;
  const DUST = IS_MOBILE ? 150 : 400;

  renderer.setClearColor(0x000000, 0);

  // Назва відеокарти. Якщо вона програмна (немає драйвера / вимкнене апаратне прискорення),
  // усю графіку рахує процесор — тоді одразу стартуємо з легкого, але живого режиму.
  try {
    const gl = renderer.getContext();
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    window.__gpu = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
  } catch (e) { window.__gpu = 'unknown'; }
  const params = new URLSearchParams(location.search);
  const SOFTWARE_GPU = /swiftshader|basic render|llvmpipe|softpipe|software/i.test(window.__gpu || '')
    || params.has('softgpu'); // ?softgpu — перевірити цей режим на нормальній відеокарті
  const STATIC = REDUCED;

  let level = SOFTWARE_GPU ? 2 : (IS_MOBILE ? 1 : 0);
  if (params.has('q')) level = Math.max(0, Math.min(QUALITY.length - 1, Number(params.get('q')) || 0)); // ?q=2 — для тестів
  renderer.setPixelRatio(QUALITY[level].pr);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.z = 6;

  // Сфера Фібоначчі — рівномірно розподілені точки.
  // Порядок перемішаний, щоб «перші N точок» теж покривали всю сферу (для нижчих рівнів якості).
  const order = Array.from({ length: COUNT }, (_, i) => i);
  for (let i = COUNT - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const positions = new Float32Array(COUNT * 3);
  const randoms = new Float32Array(COUNT);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let k = 0; k < COUNT; k++) {
    const i = order[k];
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    positions[k * 3] = Math.cos(th) * r;
    positions[k * 3 + 1] = y;
    positions[k * 3 + 2] = Math.sin(th) * r;
    randoms[k] = Math.random();
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

  const accent = getComputedStyle(html).getPropertyValue('--accent').trim() || '#a374ff';
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uAspect: { value: 1 },
    uHover: { value: 0 },
    uSize: { value: 0 }, // задається в applyQuality
    uPixelRatio: { value: QUALITY[level].pr },
    uScroll: { value: 0 },
    uExplode: { value: 0 },
    uExplodeAmp: { value: 1 },
    uIntro: { value: STATIC ? 1 : 0 },
    uColorA: { value: new THREE.Color(accent) },
    uColorB: { value: new THREE.Color('#a4a4b2') },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const root = new THREE.Group();   // позиція на екрані
  const tilt = new THREE.Group();   // нахил за мишею
  const sphere = new THREE.Points(geometry, material);
  tilt.add(sphere);
  root.add(tilt);
  scene.add(root);

  // Пил навколо — дрібні точки
  const dustPos = new Float32Array(DUST * 3);
  for (let i = 0; i < DUST; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 12;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0x9a9aa6, size: 0.014, sizeAttenuation: true, transparent: true, opacity: 0.55, depthWrite: false,
  }));
  scene.add(dust);

  // ---- Розмір і композиція ----
  // view — прямокутник (у пікселях hero), який реально малює полотно
  const view = { x: 0, y: 0, w: 1, h: 1, W: 1, H: 1 };
  const layout = { x: 0, y: 0, s: 1 }; // базова позиція сфери (до ефектів скролу)
  const resize = () => {
    const W = hero.clientWidth;
    const H = hero.clientHeight;
    camera.aspect = W / H;

    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const halfW = halfH * camera.aspect;
    if (camera.aspect > 1.05) {
      // Десктоп: сфера праворуч, за текстом
      root.position.set(halfW * 0.38, halfH * 0.08, 0);
      root.scale.setScalar(Math.min(1.25, halfH * 0.62));
    } else {
      // Телефон / портрет: сфера вгорі по центру
      root.position.set(0, halfH * 0.22, 0);
      root.scale.setScalar(Math.min(halfW * 0.92, 1.1));
    }

    Object.assign(layout, { x: root.position.x, y: root.position.y, s: root.scale.x });

    let x = 0, y = 0, w = W, h = H;
    if (QUALITY[level].crop) {
      // Квадрат навколо сфери із запасом на «дихання» і відштовхування мишею
      const ppu = H / (2 * halfH);
      const cx = W / 2 + root.position.x * ppu;
      const cy = H / 2 - root.position.y * ppu;
      const R = root.scale.x * 2.0 * ppu;
      x = Math.max(0, Math.floor(cx - R));
      y = Math.max(0, Math.floor(cy - R));
      w = Math.min(W, Math.ceil(cx + R)) - x;
      h = Math.min(H, Math.ceil(cy + R)) - y;
      camera.setViewOffset(W, H, x, y, w, h);
      Object.assign(canvas.style, { left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px`, right: 'auto', bottom: 'auto' });
    } else {
      camera.clearViewOffset();
      Object.assign(canvas.style, { left: '', top: '', width: '', height: '', right: '', bottom: '' });
    }
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    Object.assign(view, { x, y, w, h, W, H });
    uniforms.uAspect.value = w / h;
    if (STATIC) renderer.render(scene, camera);
  };
  new ResizeObserver(resize).observe(hero);

  const applyQuality = () => {
    const q = QUALITY[level];
    renderer.setPixelRatio(q.pr);
    uniforms.uPixelRatio.value = q.pr;
    // менше частинок → трохи більші, щоб сфера не ставала блідою
    uniforms.uSize.value = (IS_MOBILE ? 22 : 21) * (q.size || 1);
    geometry.setDrawRange(0, Math.floor(COUNT * q.frac));
    dust.visible = !q.crop;                  // пил по всьому екрану в обрізаному полотні не вміщається
    uniforms.uExplodeAmp.value = q.crop ? 0.3 : 1; // в обрізаному полотні вибух має вміститися
    html.classList.toggle('lite', q.crop);   // зерно → нерухомий фон
    resize();
    window.__heroQuality = level;
  };
  applyQuality();

  window.__heroDebug = { uniforms, view, mouse: () => mouse }; // для перевірки в консолі

  // Для тестів продуктивності: середній час одного кадру (мс) з очікуванням відеокарти.
  // opts: { pr, frac, w, h } — тимчасово змінити параметри для заміру.
  window.__bench3d = (opts = {}, frames = 30) => {
    const gl = renderer.getContext();
    const px = new Uint8Array(4);
    const sync = () => gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); // чекає кінця малювання
    const prevLevel = level;
    if (opts.level != null) { level = opts.level; applyQuality(); }
    const q = QUALITY[level];
    renderer.setPixelRatio(opts.pr ?? q.pr);
    geometry.setDrawRange(0, Math.floor(COUNT * (opts.frac ?? q.frac)));
    if (opts.w) renderer.setSize(opts.w, opts.h, false);
    renderer.render(scene, camera); sync();
    const t0 = performance.now();
    for (let i = 0; i < frames; i++) {
      uniforms.uTime.value += 0.016;
      renderer.render(scene, camera);
      sync();
    }
    const ms = (performance.now() - t0) / frames;
    level = prevLevel;
    applyQuality();
    return Math.round(ms * 100) / 100;
  };

  // ---- Без анімацій або програмна відеокарта: один статичний кадр і все ----
  if (STATIC) {
    window.__heroQuality = 'static';
    tilt.rotation.set(0.25, -0.4, 0);
    renderer.render(scene, camera);
    return;
  }

  // ---- Взаємодія з мишею / пальцем ----
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  let hoverTarget = 0;
  hero.addEventListener('pointermove', (e) => {
    // hero починається з самого верху сторінки, тож ділимо на розмір вікна без getBoundingClientRect
    mouse.tx = (e.clientX / hero.clientWidth) * 2 - 1;
    mouse.ty = -(((e.clientY + window.scrollY) / hero.clientHeight) * 2 - 1);
    hoverTarget = 1;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { hoverTarget = 0; });

  // ---- Анімація появи і зв'язок зі скролом ----
  if (HAS_GSAP) {
    window.gsap.to(uniforms.uIntro, { value: 1, duration: 2.6, ease: 'expo.out', delay: 0.1 });
  } else {
    uniforms.uIntro.value = 1;
  }

  // ---- Цикл рендеру (зупиняється, коли сцена не видна) ----
  const clock = new THREE.Clock();
  let running = false;
  let inView = true;

  // На екранах 120/144 Гц сцену малюємо приблизно 60 разів на секунду —
  // для повільної сфери різниці не видно, а відеокарта звільняється для курсора й скролу.
  let lastRender = 0;

  // Автопідлаштування: рахуємо кадри у вікнах по 1 с.
  // Два «повільні» вікна поспіль (< 50 FPS) → знижуємо якість. Вгору не повертаємось, щоб не «стрибало».
  let winStart = 0;
  let winFrames = 0;
  let slowWindows = 0;
  let fpsBeforeDrop = 0;   // FPS до останнього зниження якості
  let checkWindows = 0;    // скільки вікон міряємо після зниження
  let checkSum = 0;
  let adaptDone = false;   // зниження не допомагає → більше не чіпаємо
  const warmUntil = performance.now() + 1500; // перші 1.5 с завантажуються шрифти — не рахуємо
  const monitor = (now) => {
    if (now < warmUntil) return;
    if (!winStart) { winStart = now; winFrames = 0; return; }
    winFrames++;
    const elapsed = now - winStart;
    if (elapsed < 1000) return;
    const fps = (winFrames * 1000) / elapsed;
    winStart = now;
    winFrames = 0;
    if (adaptDone) return;

    // Після зниження якості перевіряємо, чи це взагалі допомогло
    if (checkWindows > 0) {
      checkSum += fps;
      checkWindows--;
      if (checkWindows === 0) {
        const after = checkSum / 2;
        if (after < fpsBeforeDrop * 1.1) {
          // Приросту немає — гальмує не сфера. Повертаємо якість і зупиняємо адаптацію.
          level--;
          applyQuality();
          adaptDone = true;
        }
      }
      return;
    }

    slowWindows = fps < 50 ? slowWindows + 1 : 0;
    if (slowWindows >= 2 && level < QUALITY.length - 1) {
      fpsBeforeDrop = fps;
      level++;
      slowWindows = 0;
      checkWindows = 2;
      checkSum = 0;
      applyQuality();
    }
  };

  const frame = () => {
    if (!running) return;
    requestAnimationFrame(frame);
    const now = performance.now();
    monitor(now);
    if (now - lastRender < QUALITY[level].frameMs) return;
    lastRender = now;
    const dt = Math.min(clock.getDelta(), 0.05);
    uniforms.uTime.value += dt;

    const k = 1 - Math.pow(1 - 0.12, dt * 60);
    mouse.x += (mouse.tx - mouse.x) * k;
    mouse.y += (mouse.ty - mouse.y) * k;
    // Миша в координатах полотна (воно може бути обрізаним прямокутником навколо сфери)
    const px = ((mouse.x + 1) / 2) * view.W;
    const py = ((1 - mouse.y) / 2) * view.H;
    uniforms.uMouse.value.set(((px - view.x) / view.w) * 2 - 1, -(((py - view.y) / view.h) * 2 - 1));
    uniforms.uHover.value += (hoverTarget - uniforms.uHover.value) * 0.05;

    // Скрол першого екрану: сфера виходить у центр, росте, потім вибухає
    const p = heroScroll.p;
    const move = THREE.MathUtils.smootherstep(p, 0, 0.6);
    const crop = QUALITY[level].crop;
    uniforms.uScroll.value = move * (crop ? 0.4 : 1);
    uniforms.uExplode.value = THREE.MathUtils.smoothstep(p, 0.35, 1);
    if (!crop) {
      root.position.x = layout.x * (1 - move);
      root.position.y = layout.y * (1 - move);
      root.scale.setScalar(layout.s * (1 + move * 0.3));
    }

    sphere.rotation.y += dt * (0.07 + move * 0.5); // при скролі сфера розкручується
    tilt.rotation.x += (-mouse.y * 0.35 - tilt.rotation.x) * 0.05;
    tilt.rotation.y += (mouse.x * 0.5 - tilt.rotation.y) * 0.05;
    dust.rotation.y += dt * 0.012;
    dust.rotation.x = mouse.y * 0.05;

    renderer.render(scene, camera);
  };

  // Для лічильника FPS: можна вимкнути 3D, щоб побачити, скільки воно «з'їдає»
  let disabled = false;
  window.__hero3dToggle = (on) => {
    disabled = !on;
    canvas.style.visibility = on ? '' : 'hidden';
    update();
  };

  const update = () => {
    const shouldRun = inView && !document.hidden && !disabled;
    if (shouldRun && !running) { running = true; winStart = 0; clock.getDelta(); frame(); }
    else if (!shouldRun) running = false;
  };

  new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); }).observe(hero);
  document.addEventListener('visibilitychange', update);
  update();
}

/* =========================================================
   Зерно: маленька PNG-текстура шуму, згенерована один раз.
   Легше для браузера, ніж SVG-фільтр на весь екран.
   ========================================================= */
function initGrain() {
  const el = $('.grain');
  if (!el) return;
  try {
    const size = 160;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(size, size);
    for (let i = 0; i < img.data.length; i += 4) {
      // діапазон 0..220, а не 0..255: зерно менше «висвітлює» чорний фон
      const v = Math.random() * 220;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    el.style.backgroundImage = `url(${c.toDataURL('image/png')})`;

    // Друга текстура — напівпрозора, для легкого режиму (зерно як фон сторінки)
    const img2 = ctx.createImageData(size, size);
    for (let i = 0; i < img2.data.length; i += 4) {
      const v = Math.random() > 0.5 ? 255 : 0;
      img2.data[i] = img2.data[i + 1] = img2.data[i + 2] = v;
      img2.data[i + 3] = 7 + Math.random() * 5; // ~4% непрозорості, як у шару-зерна
    }
    ctx.putImageData(img2, 0, 0);
    html.style.setProperty('--grain-bg', `url(${c.toDataURL('image/png')})`);
  } catch (e) { /* лишається SVG із CSS */ }
}

/* =========================================================
   Лічильник FPS для перевірки: додай ?fps до адреси
   ========================================================= */
function initFpsMeter() {
  const box = document.createElement('div');
  box.style.cssText = 'position:fixed;top:5rem;left:1rem;z-index:400;display:flex;flex-direction:column;gap:.4rem;padding:.6rem .7rem;border-radius:10px;background:#000d;color:#fff;font:12px/1.4 ui-monospace,monospace';
  const info = document.createElement('div');
  const gpu = document.createElement('div');
  gpu.style.cssText = 'opacity:.7;max-width:22rem';
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:.35rem';
  box.append(info, gpu, row);
  setTimeout(() => { gpu.textContent = `GPU: ${window.__gpu || '—'}`; }, 1500);
  document.body.appendChild(box);

  // Кнопки: вимкнути/увімкнути окремі ефекти й подивитись, як зміниться FPS
  const toggles = [
    ['3D', (on) => window.__hero3dToggle?.(on)],
    ['Grain', (on) => { $('.grain').style.display = on ? '' : 'none'; }],
    ['Cursor', (on) => { html.classList.toggle('has-cursor', on); }],
  ];
  toggles.forEach(([name, fn]) => {
    const b = document.createElement('button');
    let on = true;
    const paint = () => {
      b.textContent = `${name}: ${on ? 'on' : 'off'}`;
      b.style.cssText = `padding:.25rem .5rem;border-radius:6px;font:inherit;cursor:pointer;color:${on ? '#000' : '#fff'};background:${on ? '#a374ff' : '#333'}`;
    };
    b.addEventListener('click', () => { on = !on; fn(on); paint(); });
    paint();
    row.appendChild(b);
  });

  let frames = 0;
  let start = performance.now();
  const loop = (now) => {
    frames++;
    if (now - start >= 500) {
      const fps = Math.round((frames * 1000) / (now - start));
      const q = window.__heroQuality ?? '–';
      info.textContent = `${fps} FPS · quality ${q} · ${innerWidth}×${innerHeight} @${devicePixelRatio}x`;
      frames = 0;
      start = now;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/* =========================================================
   Старт
   ========================================================= */
function init() {
  let saved = 'uk';
  try { saved = localStorage.getItem('lang') || 'uk'; } catch (e) { /* ignore */ }
  renderProjects();
  applyLang(saved);
  initLangSwitch();

  initScroll();
  initScrollMotion();
  initHeader();
  initAnchors();
  initCursor();
  initMagnetic();

  // Чекаємо шрифти, щоб літери не «стрибали» під час анімації
  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1200))]).then(() => {
    revealHero();
    initScrollFx();
    initServices();
    initWork();
    refreshScroll();
  });

  initHero3D();
  initGrain();
  if (new URLSearchParams(location.search).has('fps')) initFpsMeter();
}

init();

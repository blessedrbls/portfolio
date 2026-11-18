/* =========================================================
   Oleksii — portfolio · main.js
   Мова, прелоадер, плавний скрол (Lenis), курсор, магнітні кнопки,
           3D-сцена (Three.js), «Що я роблю», «Роботи», «Як я працюю», «Контакти»
   ========================================================= */

// ---------- Дані проєктів ----------
// Щоб додати/змінити проєкт — редагуй цей масив.
//   image: шлях до картинки в images/ (наприклад 'images/coffee-miniapp.webp').
//          Порожній рядок або файл, що не завантажився → гарна SVG-заглушка.
//   kind:  вигляд заглушки — 'site' | 'bot' | 'miniapp'
//   motif: значок на заглушці — 'cup' | 'calendar' | 'barber' | 'play' | 'bag'
//   demo:  посилання «Демо» (null — кнопки не буде), code: посилання «Код»
//   preview: живе демо просто на сайті — { url, device: 'phone' | 'desktop' } (необов'язково)
//   tint:  колір, у який забарвлюється сфера при наведенні на картку; pulse: true — сфера «пульсує»
const PROJECTS = [
  {
    kind: 'miniapp',
    motif: 'cup',
    image: 'images/coffee-miniapp.webp',
    imageUk: 'images/coffee-miniapp-uk.webp', // скрини українською — показуються, коли сайт українською
    case: 'work/coffee-miniapp/', // сторінка-кейс (генерується tools/build-cases.mjs)
    tint: '#d9a066',
    type: { uk: 'Mini App', en: 'Mini App' },
    title: { uk: "Telegram Mini App для кав'ярні", en: 'Coffee shop Telegram Mini App' },
    desc: {
      uk: 'Меню, кошик і замовлення на самовивіз просто в Telegram. Бот з адмінкою, де бариста змінює статуси замовлень.',
      en: 'Menu, cart and pickup orders right inside Telegram, plus a bot with an admin panel for order statuses.',
    },
    tags: ['Mini App', 'JavaScript', 'Python', 'aiogram 3'],
    demo: 'https://t.me/coffee_miniapp_bot_bot',
    preview: { url: 'https://blessedrbls.github.io/coffee-miniapp/', device: 'phone' },
    code: 'https://github.com/blessedrbls/coffee-miniapp',
  },
  {
    kind: 'bot',
    motif: 'calendar',
    image: 'images/booking-bot.webp',
    case: 'work/booking-bot/', // сторінка-кейс (генерується tools/build-cases.mjs)
    tint: '#5aa9ff', pulse: true,
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
    image: 'images/barbershop-site.webp',
    imageUk: 'images/barbershop-site-uk.webp', // скрини українською — показуються, коли сайт українською
    case: 'work/barbershop-site/', // сторінка-кейс (генерується tools/build-cases.mjs)
    tint: '#d4b05a',
    type: { uk: 'Сайт', en: 'Website' },
    title: { uk: 'Сайт барбершопу', en: 'Barbershop website' },
    desc: {
      uk: 'Сайт з онлайн-записом: вільний час кожного майстра, без подвійних бронювань, заявки одразу в Telegram.',
      en: "Website with online booking: each barber's free time, no double bookings, requests go straight to Telegram.",
    },
    tags: ['HTML/CSS/JS', 'Cloudflare Workers', 'D1'],
    demo: 'https://blessedrbls.github.io/barbershop-site/',
    preview: { url: 'https://blessedrbls.github.io/barbershop-site/', device: 'desktop' },
    code: 'https://github.com/blessedrbls/barbershop-site',
  },
  {
    kind: 'site',
    motif: 'play',
    image: 'images/landing-course.webp',
    imageUk: 'images/landing-course-uk.webp', // скрини українською — показуються, коли сайт українською
    case: 'work/landing-course/', // сторінка-кейс (генерується tools/build-cases.mjs)
    tint: '#4c7dff',
    type: { uk: 'Лендінг', en: 'Landing page' },
    title: { uk: 'Лендінг онлайн-курсу', en: 'Online course landing page' },
    desc: {
      uk: 'Лендінг курсу з Python: програма, тарифи, відгуки, FAQ і таймер до старту. Чистий HTML, CSS і JavaScript.',
      en: 'Landing page for a Python course: curriculum, pricing, reviews, FAQ and a countdown. Plain HTML, CSS and JavaScript.',
    },
    tags: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://blessedrbls.github.io/landing-course/',
    preview: { url: 'https://blessedrbls.github.io/landing-course/', device: 'desktop' },
    code: 'https://github.com/blessedrbls/landing-course',
  },
  {
    kind: 'bot',
    motif: 'bag',
    image: 'images/shop-bot.webp',
    case: 'work/shop-bot/', // сторінка-кейс (генерується tools/build-cases.mjs)
    tint: '#4fd1a5',
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
    'work.hint': 'Гортай убік →',
    'work.prev': 'Попередній проєкт',
    'work.next': 'Наступний проєкт',
    'work.list': 'Проєкти',
    'work.demo': 'Демо',
    'work.code': 'Код',
    'process.title': 'Як я працюю',
    'process.1.title': 'Обговорюємо задачу',
    'process.1.text': 'Коротко созвонюємось або пишемо в Telegram: цілі, аудиторія, приклади, бюджет і терміни.',
    'process.2.title': 'Показую дизайн і демо',
    'process.2.text': 'Збираю дизайн і робочий прототип, щоб ви побачили результат ще до основної розробки.',
    'process.3.title': 'Розробка і правки',
    'process.3.text': 'Роблю сайт або бота, показую проміжні версії й вношу правки, поки все не буде так, як треба.',
    'process.4.title': 'Запуск і підтримка',
    'process.4.text': "Публікую проєкт, допомагаю з доменом і хостингом, показую, як усім користуватися, і лишаюсь на зв'язку.",
    'contact.label': 'Контакти',
    'contact.cta': 'Давайте зробимо *щось круте*',
    'contact.lead': 'Напишіть мені — обговоримо ваш проєкт і я підкажу, з чого почати.',
    'footer.name': 'Олексій',
    'footer.top': 'Нагору ↑',
    'preview.close': 'Закрити демо',
    'preview.tab': 'Відкрити в новій вкладці ↗',
    'preview.telegram': 'Відкрити в Telegram ↗',
    'preview.loading': 'Завантажую демо…',
    'egg.toast': '✦ Ви знайшли секрет — дякую, що зазирнули!',
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
    'work.hint': 'Swipe sideways →',
    'work.prev': 'Previous project',
    'work.next': 'Next project',
    'work.list': 'Projects',
    'work.demo': 'Demo',
    'work.code': 'Code',
    'process.title': 'How I work',
    'process.1.title': 'We discuss the task',
    'process.1.text': 'A quick call or a Telegram chat: goals, audience, examples, budget and timeline.',
    'process.2.title': 'I show the design & demo',
    'process.2.text': 'I put together the design and a working prototype so you can see the result before the main development.',
    'process.3.title': 'Development & edits',
    'process.3.text': 'I build the site or bot, share work-in-progress versions and make edits until everything is right.',
    'process.4.title': 'Launch & support',
    'process.4.text': 'I publish the project, help with the domain and hosting, show you how to use everything and stay in touch.',
    'contact.label': 'Contact',
    'contact.cta': "Let's make *something cool*",
    'contact.lead': "Message me — we'll talk about your project and I'll suggest where to start.",
    'footer.name': 'Oleksii',
    'footer.top': 'Back to top ↑',
    'preview.close': 'Close demo',
    'preview.tab': 'Open in a new tab ↗',
    'preview.telegram': 'Open in Telegram ↗',
    'preview.loading': 'Loading the demo…',
    'egg.toast': '✦ You found a secret — thanks for looking around!',
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
// Яка це сторінка: головна чи кейс (work/<slug>/ — <html data-page="case">)
let PAGE = document.documentElement.dataset.page || 'home';

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

  // текст для скрінрідерів — прихованим span (aria-label на <p>/<h*> заборонений)
  el.removeAttribute('aria-label');
  el.textContent = '';
  const sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = words.map((w) => w.word + w.tail).join(' ');
  el.appendChild(sr);
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
  $$('[data-i18n-label]').forEach((el) => {
    const value = dict[el.dataset.i18nLabel];
    if (value != null) el.setAttribute('aria-label', value);
  });

  $$('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === currentLang)));
  try { localStorage.setItem('lang', currentLang); } catch (e) { /* приватний режим */ }
  if (ghData) renderGithub(); // підписи активності GitHub — мовою сайту
}

function initLangSwitch() {
  $$('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.lang === currentLang || html.classList.contains('lang-fade')) return;
      const swap = () => {
        fxCtx?.revert();          // старі літери зникнуть — анімації скролу треба перебудувати
        applyLang(btn.dataset.lang);
        revealHero(true);
        initScrollFx();
        refreshScroll();
      };
      if (REDUCED) { swap(); return; }
      // Плавно: текст гасне → міняємо мову → текст з'являється
      html.classList.add('lang-fade');
      setTimeout(() => {
        swap();
        requestAnimationFrame(() => html.classList.remove('lang-fade'));
      }, 260);
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

  // Mac: тачпад і Magic Mouse і так прокручують плавно з інерцією — «згладжування» поверх них
  // відчувається як затримка й опір («туго»). Там лишаємо звичайний скрол браузера.
  const IS_MAC = /Mac/i.test(navigator.userAgentData?.platform || navigator.platform || '');
  if (IS_MAC) return;

  // Windows / Linux, колесо миші: плавний скрол замість ривків по 100 px. На телефонах — нативний.
  lenis = new window.Lenis({
    lerp: 0.16,          // м'якість: менше — довше «пливе», більше — різкіше (0.16 — швидко відгукується)
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
  // Анімації точно працюють → вмикаємо стилі, що залежать від них
  // (приглушені кроки, «ледь помітні» слова фрази, наїзд фрази на «прилиплий» перший екран).
  // Без цього класу все стоїть звичайним потоком і повністю видно.
  html.classList.add('fx');
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
      // швидко: заголовок зникає в першій третині «прилипання», задовго до того, як під'їде фраза
      y: '-1.3em', rotate: -8, opacity: 0, ease: 'power2.in', duration: 0.3, stagger: { each: 0.005, from: 'start' },
    }, 0)
      // дочірні елементи, а не самі .hero-reveal — їх уже анімує поява, і анімації конфліктували б
      .to(['.hero-top > *', '.hero-bottom', '.hero-meta > *'], { autoAlpha: 0, y: -50, duration: 0.25, stagger: 0.03 }, 0.02)
      // і тонка лінія над «Відкритий до нових проєктів» — інакше вона видніється крізь фразу
      .to('.hero-meta', { borderTopColor: 'rgba(241, 240, 234, 0)', duration: 0.25 }, 0.02)
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

    // 4) «Як я працюю»: лінія малюється зверху вниз разом зі скролом,
    //    крок «загоряється», щойно лінія до нього доходить
    const body = $('.process-body');
    const fill = $('.process-line-fill');
    const tip = $('.process-tip');
    if (body && fill) {
      const line = $('.process-line');
      gsap.fromTo(fill, { strokeDashoffset: 1 }, {
        strokeDashoffset: 0, ease: 'none',
        autoRound: false, // значення від 1 до 0 — без округлення до цілих пікселів (інакше 0.28 → 0)
        scrollTrigger: {
          trigger: line, start: 'top 60%', end: 'bottom 60%', scrub: 0.4,
          onUpdate: (self) => {
            if (!tip) return;
            gsap.set(tip, { y: self.progress * line.getBoundingClientRect().height, opacity: self.progress > 0.001 && self.progress < 0.999 ? 1 : 0 });
          },
        },
      });
      $$('.process-step', body).forEach((step) => {
        const dot = $('.process-dot', step);
        window.ScrollTrigger.create({
          // та сама «лінія 60 % висоти екрана», що й для малювання лінії
          trigger: dot, start: 'center 60%',
          onEnter: () => step.classList.add('is-active'),
          onLeaveBack: () => step.classList.remove('is-active'),
        });
      });
    }

    // 5) Великий заклик у «Контактах»: літери піднімаються одна за одною, поки гортаєш
    const ctaChars = $$('.contact-title .char-in');
    if (ctaChars.length) {
      gsap.fromTo(ctaChars, { yPercent: 115, rotate: 10 }, {
        yPercent: 0, rotate: 0, ease: 'power3.out', stagger: 0.03,
        scrollTrigger: { trigger: '.contact-title', start: 'top 90%', end: 'top 40%', scrub: 0.6 },
      });
    }
  });
}

// Швидкість прокрутки, прогрес-смужка, нахил при швидкому скролі
let setSkew = null;
let lastSkew = 0;
function initScrollMotion() {
  if (REDUCED || !HAS_GSAP || !window.ScrollTrigger) return;
  window.gsap.ticker.add(() => {
    scrollSpeed.raw *= 0.9; // коли скрол зупинився — швидкість плавно згасає
    scrollSpeed.smooth += (scrollSpeed.raw - scrollSpeed.smooth) * 0.12;
    if (setSkew) {
      const skew = window.gsap.utils.clamp(-3.5, 3.5, scrollSpeed.smooth * -0.0025);
      if (Math.abs(skew - lastSkew) > 0.01) { setSkew(skew); lastSkew = skew; }
    }
  });
}

// Для кожної сторінки: швидкість скролу, прогрес-смужка, елементи з нахилом
function initScrollMotionPage() {
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
  setSkew = skewTargets.length ? gsap.quickSetter(skewTargets, 'skewY', 'deg') : null;
  lastSkew = 0;
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
            ? (p.imageUk ? [['uk', p.imageUk], ['en', p.image]] : [[null, p.image]]).map(([l, src]) => `<img${l ? ` data-l="${l}"` : ''} src="${esc(src)}" srcset="${esc(src.replace('.webp', '-1000.webp'))} 1000w, ${esc(src)} 1600w" sizes="(max-width: 900px) min(84vw, 26rem), clamp(18rem, 31vw, 32rem)" width="1600" height="1000" alt="" loading="lazy" decoding="async" data-ph="${i}">`).join('')
            : placeholderSVG(p, i)}
        </div>
      </div>
      <div class="project-body">
        <div class="project-meta mono"><span class="project-type">${both(p.type)}</span><span>${n(i + 1)} / ${n(PROJECTS.length)}</span></div>
        <h3 class="project-title">${p.case ? `<a class="project-link" href="${esc(p.case)}" data-goatcounter-click="card-case-${i}">${both(p.title)}</a>` : both(p.title)}</h3>
        <p class="project-desc">${both(p.desc)}</p>
        <ul class="project-tags" role="list">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        <div class="project-actions">
          ${p.demo ? `<a class="project-btn project-btn--demo" href="${esc(p.demo)}" target="_blank" rel="noopener" data-goatcounter-click="card-demo-${i}"${p.preview ? ` data-preview="${i}"` : ''}>${both({ uk: 'Демо', en: 'Demo' })}<span class="sr-only">: ${both(p.title)}</span>${arrow}</a>` : ''}
          ${p.code ? `<a class="project-btn project-btn--code" href="${esc(p.code)}" target="_blank" rel="noopener" data-goatcounter-click="card-code-${i}">${both({ uk: 'Код', en: 'Code' })}<span class="sr-only">: ${both(p.title)}</span>${codeIcon}</a>` : ''}
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

// Карусель проєктів: звичайний горизонтальний скрол браузера.
//   телефон / тачпад — свайп убік; миша — перетягування, стрілки ← →, Shift + колесо;
//   клавіатура — фокус на стрічці й стрілки на клавіатурі.
// Звичайне колесо миші над каруселлю гортає сторінку вниз, як скрізь.
/* =========================================================
   Живе демо: кнопка «Демо» відкриває проєкт у рамці телефона / браузера просто на сайті.
   Ctrl/Cmd/Shift-клік або середня кнопка — як звичайне посилання (нова вкладка).
   ========================================================= */
function initPreview() {
  const box = $('.preview');
  const track = $('.work-track');
  if (!box || !track) return;
  const device = $('.preview-device', box);
  const iframe = $('iframe', box);
  const title = $('.preview-title', box);
  const openLink = $('.preview-open', box);
  const url = $('.preview-url', box);
  const loading = $('.preview-loading', box);
  const closeBtn = $('.preview-close', box);
  const DESK_W = 1280;
  const DESK_H = 800;
  let lastTrigger = null;
  let current = null;

  // Сайт показуємо в справжньому десктопному вигляді (1280×800) і зменшуємо під екран
  const fit = () => {
    if (!current) return;
    const stage = $('.preview-stage', box).getBoundingClientRect();
    const narrow = window.innerWidth <= 700;
    if (current.device === 'desktop' && !narrow) {
      const chrome = 36;
      const s = Math.min(stage.width / DESK_W, (stage.height - chrome) / DESK_H, 1);
      device.style.width = `${Math.round(DESK_W * s)}px`;
      device.style.height = `${Math.round(DESK_H * s + chrome)}px`;
      Object.assign(iframe.style, { width: `${DESK_W}px`, height: `${DESK_H}px`, transform: `scale(${s})` });
    } else {
      device.style.width = '';
      device.style.height = '';
      Object.assign(iframe.style, { width: '100%', height: '100%', transform: '' });
    }
  };

  const open = (p, trigger) => {
    current = p.preview;
    lastTrigger = trigger;
    const lang = currentLang;
    const dict = I18N[lang] || I18N.uk;
    title.textContent = p.title[lang] || p.title.uk;
    // Для Mini App кнопка веде в Telegram (там вона живе), для сайтів — у нову вкладку
    const isTelegram = /t\.me\//.test(p.demo || '');
    openLink.href = isTelegram ? p.demo : current.url;
    openLink.textContent = isTelegram ? dict['preview.telegram'] : dict['preview.tab'];
    url.textContent = current.url.replace(/^https?:\/\//, '');
    iframe.title = title.textContent;
    device.classList.toggle('is-phone', current.device === 'phone');
    device.classList.toggle('is-desktop', current.device !== 'phone');
    loading.hidden = false;
    iframe.style.opacity = '0';
    iframe.onload = () => { loading.hidden = true; iframe.style.opacity = '1'; };
    iframe.src = current.url;

    box.hidden = false;
    html.classList.add('preview-open');
    lenis?.stop();
    fit();
    closeBtn.focus({ preventScroll: true });
    if (!REDUCED && HAS_GSAP) {
      window.gsap.fromTo($('.preview-backdrop', box), { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      window.gsap.fromTo([$('.preview-bar', box), device], { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'expo.out', stagger: 0.05 });
    }
  };

  const close = () => {
    if (box.hidden) return;
    const finish = () => {
      box.hidden = true;
      iframe.src = 'about:blank';   // зупиняємо демо, щоб не працювало у фоні
      html.classList.remove('preview-open');
      lenis?.start();
      current = null;
      lastTrigger?.focus({ preventScroll: true });
    };
    if (!REDUCED && HAS_GSAP) {
      window.gsap.to([$('.preview-bar', box), device], { opacity: 0, y: 30, scale: 0.97, duration: 0.3, ease: 'power2.in' });
      window.gsap.to($('.preview-backdrop', box), { opacity: 0, duration: 0.35, ease: 'power2.in', onComplete: finish });
    } else {
      finish();
    }
  };

  track.addEventListener('click', (e) => {
    // Клік по картинці проєкту — теж відкриває демо (живе, якщо є; інакше — посилання)
    const media = e.target.closest('.project-media');
    if (media && !media.closest('.project-card')?.querySelector('.project-link')) {
      const card = media.closest('.project-card');
      const p = PROJECTS[[...track.children].indexOf(card)];
      if (!p) return;
      if (p.preview) open(p, $('a[data-preview]', card) || card);
      else if (p.demo) window.open(p.demo, '_blank', 'noopener');
      return;
    }
    const a = e.target.closest('a[data-preview]');
    if (!a) return;
    // Ctrl/Cmd/Shift-клік або середня кнопка — звичайна поведінка посилання
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    open(PROJECTS[Number(a.dataset.preview)], a);
  });
  $$('[data-preview-close]', box).forEach((el) => el.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    // Tab лишається всередині вікна: посилання → закрити → демо
    if (e.key === 'Tab') {
      const items = [openLink, closeBtn, iframe].filter((el) => el.offsetParent !== null);
      const i = items.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    }
  });
  window.addEventListener('resize', fit);
  // курсор сайту ховаємо, коли миша над демо (там свій, системний курсор)
  iframe.addEventListener('mouseenter', () => $('.cursor')?.classList.remove('is-visible'));
}

/* =========================================================
   Сфера реагує на сайт:
   • наведення на картку проєкту — сфера забарвлюється в колір проєкту (бот запису ще й «пульсує»);
   • пасхалка: набрати «hello» / «привіт» або 5 разів швидко клікнути на логотип —
     феєрверк частинок і гіперстрибок крізь зорі.
   ========================================================= */
let eggCelebrate = null;
let eggKeysBound = false;
function initSphereFun() {
  const track = $('.work-track');
  const sphere = () => window.__sphere;   // з'являється, коли завантажиться 3D

  // 1) Колір проєкту при наведенні (лише миша — на телефоні «наведення» немає)
  if (track && !IS_TOUCH) {
    let currentCard = null;
    track.addEventListener('pointerover', (e) => {
      const card = e.target.closest('.project-card');
      if (card === currentCard) return;
      currentCard = card;
      const p = card ? PROJECTS[[...track.children].indexOf(card)] : null;
      sphere()?.tint(p?.tint || null, !!p?.pulse);
    });
    track.addEventListener('pointerleave', () => { currentCard = null; sphere()?.tint(null); });
  }

  // 2) Пасхалка
  const toast = document.createElement('div');
  toast.className = 'egg-toast mono';
  toast.setAttribute('role', 'status');
  document.body.appendChild(toast);
  let toastTimer = 0;
  let celebrating = false;
  const celebrate = () => {
    if (celebrating) return;
    celebrating = true;
    const dict = I18N[currentLang] || I18N.uk;
    toast.textContent = dict['egg.toast'];
    toast.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-shown'), 3200);
    const s = sphere();
    if (s && !REDUCED) {
      // кілька «залпів» різними кольорами, потім гіперстрибок
      const colors = ['#ff5bd6', '#5aa9ff', '#ffd166', '#4fd1a5'];
      colors.forEach((c, i) => setTimeout(() => { s.tint(c); s.burst(1.1 + i * 0.15); }, i * 380));
      setTimeout(() => s.hyper(2.2), 400);
      setTimeout(() => s.tint(null), colors.length * 380 + 600);
    }
    setTimeout(() => { celebrating = false; }, 3500);
  };

  // «hello» або «привіт» з клавіатури (не коли друкуєш у полі вводу)
  eggCelebrate = celebrate;
  if (!eggKeysBound) {
    eggKeysBound = true;
    let typed = '';
    document.addEventListener('keydown', (e) => {
      if (e.target.closest?.('input, textarea, [contenteditable]') || e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-12);
      if (typed.endsWith('hello') || typed.endsWith('привіт')) { typed = ''; eggCelebrate?.(); }
    });
  }

  // 5 швидких кліків по логотипу
  const logo = $('.logo');
  let clicks = [];
  logo?.addEventListener('click', () => {
    const t = performance.now();
    clicks = clicks.filter((c) => t - c < 1600).concat(t);
    if (clicks.length >= 5) { clicks = []; celebrate(); }
  });
}

function initWork() {
  const track = $('.work-track');
  if (!track) return;
  const bar = $('.work-progress span');
  const arrows = $$('.work-arrow');
  const behavior = REDUCED ? 'auto' : 'smooth';

  // Смужка-«повзунок»: ширина = видима частина, позиція = де ми зараз
  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    const ratio = track.scrollWidth ? track.clientWidth / track.scrollWidth : 1;
    const p = max > 0 ? track.scrollLeft / max : 0;
    if (bar) {
      bar.style.width = `${ratio * 100}%`;
      bar.style.transform = `translateX(${ratio < 1 ? (p * (1 - ratio) / ratio) * 100 : 0}%)`;
    }
    arrows.forEach((b) => {
      b.disabled = Number(b.dataset.dir) < 0 ? track.scrollLeft <= 2 : track.scrollLeft >= max - 2;
    });
  };
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  // Крок = ширина картки + проміжок
  const step = () => {
    const cards = track.children;
    if (cards.length < 2) return track.clientWidth;
    return cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
  };
  arrows.forEach((b) => b.addEventListener('click', () => {
    track.scrollBy({ left: Number(b.dataset.dir) * step(), behavior });
  }));

  // Горизонтальний жест (тачпад убік або Shift + колесо) не віддаємо Lenis —
  // хай браузер сам гортає карусель. Вертикальне колесо йде далі й гортає сторінку.
  track.addEventListener('wheel', (e) => {
    if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.stopPropagation();
  }, { passive: true });

  // Перетягування мишею
  let startX = 0;
  let startLeft = 0;
  let pressed = false;
  let moved = false;
  let suppressClick = false;

  track.addEventListener('dragstart', (e) => e.preventDefault()); // не тягнути картинки/посилання браузером
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    pressed = true;
    moved = false;
    startX = e.clientX;
    startLeft = track.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!pressed) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 6) { moved = true; track.classList.add('is-dragging'); }
    if (moved) track.scrollLeft = startLeft - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!pressed) return;
    pressed = false;
    if (!moved) return;
    suppressClick = true;              // відпускання після перетягування — не клік по посиланню
    setTimeout(() => { suppressClick = false; }, 0);
    track.classList.remove('is-dragging');
    // доводимо до найближчої картки
    const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    const left = track.getBoundingClientRect().left + pad;
    let best = Infinity;
    [...track.children].forEach((card) => {
      const d = card.getBoundingClientRect().left - left;
      if (Math.abs(d) < Math.abs(best)) best = d;
    });
    if (Number.isFinite(best)) track.scrollBy({ left: best, behavior });
  });
  track.addEventListener('click', (e) => {
    if (suppressClick) { e.preventDefault(); e.stopPropagation(); }
  }, true);
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
  // «Настрій» сфери — плавно змінюється від блоку до блоку
  uniform float uAmp;        // наскільки сильно «дихає» поверхня
  uniform float uFreq;       // дрібні (більше) чи великі (менше) хвилі
  uniform float uSpread;     // 0 — чітка куля, більше — пухка хмара
  uniform float uFlow;       // швидкість течії шуму
  uniform float uGlow;       // додаткове фіолетове світіння
  uniform float uDim;        // загальна яскравість (за текстом — тьмяніше)
  uniform float uBurst;      // 0..1 — «ударна хвиля» від кліку / пасхалки
  attribute float aRandom;
  varying float vGlow;
  varying float vAlpha;
  ${NOISE_GLSL}

  void main() {
    vec3 n = normalize(position);
    float t = uTime * 0.22 * uFlow;

    float big   = snoise(n * uFreq + vec3(t, t * 0.7, -t * 0.5));
    float small = snoise(n * uFreq * 2.8 - vec3(t * 1.4)) * 0.22;
    float disp  = (big + small) * (uAmp + uScroll * 0.7);

    float radius = (1.0 + disp) * (1.0 + aRandom * uSpread) * mix(0.35, 1.0, uIntro) * (1.0 + uScroll * 0.35);
    vec3 pos = n * radius;
    pos += n * uBurst * (0.5 + aRandom * 1.7);     // частинки розлітаються й повертаються

    // Вибух: кожна точка летить назовні зі своєю швидкістю й трохи закручується
    float e = uExplode * uExplode;
    pos += n * e * (0.8 + aRandom * 3.4);
    pos += vec3(-n.z, 0.0, n.x) * e * (aRandom - 0.5) * 2.4;

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

    gl_PointSize = uSize * uPixelRatio * (0.55 + aRandom * 0.9) * (1.0 + m * 1.6) * (1.0 + e * 0.9) * (1.0 + uBurst * 0.6) / -mv.z;

    vGlow  = clamp(disp * 2.6 + m * 1.6 + e * 0.9 + uGlow + uBurst * 0.9, 0.0, 1.0);
    vAlpha = mix(0.18, 1.0, smoothstep(7.4, 5.0, -mv.z)) * uIntro * (1.0 - smoothstep(0.55, 1.0, uExplode)) * uDim;
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
  const hero = $('.hero') || $('.case-hero');
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

  // «Сфера-провідник»: полотно стає фоном усього сайту й веде нас між блоками.
  // Лише коли працюють анімації; інакше — як раніше, тільки на першому екрані.
  const STATIC = REDUCED;
  const GUIDE = !STATIC && HAS_GSAP && !!window.ScrollTrigger;
  if (GUIDE) {
    document.body.prepend(canvas);
    canvas.classList.add('is-guide');
  }

  // ---- Рівні якості. Якщо кадрів мало — сцена сама спускається на рівень нижче ----
  // pr: чіткість полотна; frac: частка частинок; frameMs: мінімальний інтервал між кадрами;
  // lite: зерно стає нерухомим фоном; size: менше частинок → трохи більші
  const dpr = window.devicePixelRatio || 1;
  const QUALITY = [
    { pr: Math.min(dpr, 1.5),  frac: 1,    frameMs: 12 },
    { pr: Math.min(dpr, 1),    frac: 1,    frameMs: 12 },
    { pr: Math.min(dpr, 0.8),  frac: 0.55, frameMs: 16, size: 1.25, lite: true },
    { pr: Math.min(dpr, 0.65), frac: 0.4,  frameMs: 33, size: 1.35, lite: true },
  ];
  const COUNT = IS_MOBILE ? 5000 : 10000;
  const DUST = IS_MOBILE ? 350 : 900; // зорі на фоні

  renderer.setClearColor(0x000000, 0);

  // Назва відеокарти. Якщо вона програмна (немає драйвера / вимкнене апаратне прискорення),
  // усю графіку рахує процесор — тоді одразу стартуємо з легкого, але живого режиму.
  let gpuName = '';
  try {
    const gl = renderer.getContext();
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    gpuName = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
  } catch (e) { /* назва недоступна — вважаємо відеокарту звичайною */ }
  const SOFTWARE_GPU = /swiftshader|basic render|llvmpipe|softpipe|software/i.test(gpuName || '');
  window.__gpu = gpuName;

  let level = SOFTWARE_GPU ? 2 : (IS_MOBILE ? 1 : 0);
  renderer.setPixelRatio(QUALITY[level].pr);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.z = 6;

  // ---- Сфера Фібоначчі. Порядок точок перемішаний, щоб «перші N» (нижчі рівні якості) покривали всю сферу ----
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
  // «пухка хмара» й вибух виходять за одиничну сферу — щоб Three.js не відкидав їх як «невидимі»
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 4);

  // На сторінці кейсу сфера — кольору проєкту
  const accent = getComputedStyle(html).getPropertyValue(PAGE === 'case' ? '--tint' : '--accent').trim() || '#a374ff';
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uAspect: { value: 1 },
    uHover: { value: 0 },
    uSize: { value: 0 }, // задається в applyQuality
    uPixelRatio: { value: QUALITY[level].pr },
    uScroll: { value: 0 },
    uExplode: { value: 0 },
    uAmp: { value: 0.26 },
    uFreq: { value: 1.5 },
    uSpread: { value: 0.07 },
    uFlow: { value: 1 },
    uGlow: { value: 0 },
    uDim: { value: 1 },
    uBurst: { value: 0 },
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
  sphere.frustumCulled = false;
  tilt.add(sphere);
  root.add(tilt);
  scene.add(root);

  // ---- Зоряне поле: ми «летимо» крізь зорі, а сфера нас переслідує ----
  // Кожна зоря має фазу глибини (z 0..1); uTravel зсуває всі фази — зорі летять назустріч.
  // При швидкому скролі ближні зорі витягуються в штрихи від центру екрана.
  const starPos = new Float32Array(DUST * 3);
  const starRnd = new Float32Array(DUST);
  for (let i = 0; i < DUST; i++) {
    starPos[i * 3] = Math.random() * 2 - 1;
    starPos[i * 3 + 1] = Math.random() * 2 - 1;
    starPos[i * 3 + 2] = Math.random();
    starRnd[i] = Math.random();
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute('aRandom', new THREE.BufferAttribute(starRnd, 1));
  const starUniforms = {
    uTravel: { value: 0 },
    uSpeed: { value: 0 },          // -1..1: напрям і швидкість польоту (від скролу)
    uPixelRatio: uniforms.uPixelRatio,
    uIntro: uniforms.uIntro,
    uColorA: uniforms.uColorA,
  };
  const stars = new THREE.Points(starGeo, new THREE.ShaderMaterial({
    uniforms: starUniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */`
      uniform float uTravel;
      uniform float uSpeed;
      uniform float uPixelRatio;
      uniform float uIntro;
      attribute float aRandom;
      varying float vAlpha;
      varying vec2 vDir;
      varying float vStretch;
      varying float vAccent;
      void main() {
        float z = fract(position.z + uTravel);          // 0 — далеко, 1 — зовсім поруч
        vec3 p = vec3(position.x * 16.0, position.y * 10.0, -42.0 + z * 46.0);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        vec2 ndc = gl_Position.xy / gl_Position.w;
        vDir = normalize(ndc + vec2(0.0001));
        float near = smoothstep(0.35, 1.0, z);
        vStretch = 1.0 + min(abs(uSpeed), 1.0) * 7.0 * near;   // штрих тим довший, чим швидше й ближче
        float size = (1.0 + aRandom * 1.6) * (1.0 + z * 2.2) * uPixelRatio;
        gl_PointSize = size * vStretch;
        vAlpha = smoothstep(0.0, 0.25, z) * (1.0 - smoothstep(0.9, 1.0, z)) * (0.3 + aRandom * 0.7) * uIntro;
        vAccent = step(0.85, aRandom);
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 uColorA;
      varying float vAlpha;
      varying vec2 vDir;
      varying float vStretch;
      varying float vAccent;
      void main() {
        vec2 p = gl_PointCoord - 0.5;
        p.y = -p.y;
        float along = dot(p, vDir);
        float across = dot(p, vec2(-vDir.y, vDir.x)) * vStretch;
        float r = length(vec2(along, across)) * 2.0;
        if (r > 1.0) discard;
        float a = (1.0 - r) * (1.0 - r);
        vec3 col = mix(vec3(0.86, 0.86, 0.93), uColorA, vAccent);
        gl_FragColor = vec4(col, a * vAlpha);
      }
    `,
  }));
  stars.frustumCulled = false;
  scene.add(stars);

  // ---- Розмір і композиція ----
  const layout = { x: 0, y: 0, s: 1 }; // позиція сфери на першому екрані
  let stagesPlace = [];                // позиції фігур для кожного блоку
  const resize = () => {
    const W = GUIDE ? window.innerWidth : hero.clientWidth;
    const H = GUIDE ? window.innerHeight : hero.clientHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H, false);
    uniforms.uAspect.value = W / H;

    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const halfW = halfH * camera.aspect;
    const wide = camera.aspect > 1.05;
    if (PAGE === 'case') {
      // Кейс: на першому екрані сфера праворуч від заголовка; на телефоні — вгорі, тьмяніша
      if (wide) Object.assign(layout, { x: halfW * 0.56, y: halfH * 0.12, s: Math.min(1.0, halfH * 0.5), dim: 0.95 });
      else Object.assign(layout, { x: halfW * 0.35, y: halfH * 0.55, s: Math.min(halfW * 0.62, 0.9), dim: 0.5 });
    } else if (wide) {
      // Десктоп: сфера праворуч, за текстом
      Object.assign(layout, { x: halfW * 0.38, y: halfH * 0.08, s: Math.min(1.25, halfH * 0.62) });
    } else {
      // Телефон / портрет: сфера вгорі по центру
      Object.assign(layout, { x: 0, y: halfH * 0.22, s: Math.min(halfW * 0.92, 1.1) });
    }
    // «Настрій» сфери в кожному блоці. Це одна й та сама сфера — змінюються лише характер і місце:
    //   amp — наскільки «хвилюється», freq — дрібні/великі хвилі, spread — чітка куля / пухка хмара,
    //   flow — швидкість течії, glow — фіолетове світіння, sx/sy — витягнутість, spin — обертання,
    //   dim — яскравість. На десктопі сфера весь час праворуч, на телефоні — по центру й тьмяніше.
    const mood = (o) => ({ amp: 0.26, freq: 1.5, spread: 0.07, flow: 1, glow: 0, sx: 1, sy: 1, spin: 0.07, dim: 1, ...o });
    stagesPlace = wide ? [
      // фраза: після вибуху збирається в м'яку хмару, що повільно колишеться
      mood({ x: halfW * 0.56, y: -halfH * 0.02, s: Math.min(0.75, halfH * 0.4), amp: 0.34, freq: 1.0, spread: 0.1, flow: 0.7, glow: 0.05, spin: 0.05, dim: 0.85 }),
      // «Що я роблю»: маленька, дрібна жвава брижа, крутиться швидше — енергія (праворуч від заголовка)
      mood({ x: halfW * 0.62, y: halfH * 0.64, s: Math.min(0.3, halfH * 0.16), amp: 0.18, freq: 3.2, spread: 0.04, flow: 1.8, glow: 0.12, spin: 0.35, dim: 0.6 }),
      // Сфера ніколи не розтягується (інакше виглядає як розтягнута картинка) — характер дає лише поверхня.
      // «Роботи»: невелика, великі повільні хвилі, ніби переливається — потік (між заголовком і стрілками)
      mood({ x: halfW * 0.12, y: halfH * 0.6, s: Math.min(0.3, halfH * 0.16), amp: 0.3, freq: 1.2, spread: 0.05, flow: 1.6, glow: 0.12, spin: 0.08, dim: 0.75 }),
      // «Як я працюю»: рівна, спокійна, дрібна стримана брижа — фокус
      mood({ x: halfW * 0.58, y: 0, s: Math.min(0.78, halfH * 0.42), amp: 0.12, freq: 2.6, spread: 0.03, flow: 0.6, glow: 0.06, spin: 0.06, dim: 0.75 }),
      // «Контакти»: яскравіша, більше фіолетового — запрошення
      mood({ x: halfW * 0.6, y: halfH * 0.02, s: Math.min(0.85, halfH * 0.45), amp: 0.3, freq: 1.5, spread: 0.08, flow: 1.1, glow: 0.3, spin: 0.15, dim: 0.9 }),
    ] : [
      mood({ x: 0, y: halfH * 0.1,  s: halfW * 0.7,  amp: 0.42, freq: 1.0, spread: 0.16, flow: 0.7, spin: 0.05, dim: 0.45 }),
      mood({ x: 0, y: halfH * 0.55, s: halfW * 0.32, amp: 0.18, freq: 3.2, spread: 0.04, flow: 1.8, glow: 0.15, spin: 0.35, dim: 0.6 }),
      mood({ x: 0, y: halfH * 0.58, s: halfW * 0.3,  amp: 0.3, freq: 1.2, spread: 0.05, flow: 1.6, glow: 0.12, spin: 0.08, dim: 0.5 }),
      mood({ x: 0, y: 0,            s: halfW * 0.5,  amp: 0.12, freq: 2.6, spread: 0.03, flow: 0.6, spin: 0.06, dim: 0.35 }),
      mood({ x: 0, y: -halfH * 0.35, s: halfW * 0.72, amp: 0.3, freq: 1.5, spread: 0.08, flow: 1.1, glow: 0.3, spin: 0.15, dim: 0.6 }),
    ];
    if (PAGE === 'case') {
      // Кейс: обкладинка → «Як це працює» (ліва порожня колонка) → «Цікаві рішення» →
      // скриншоти (велика тьмяна хмара позаду) → наступний проєкт і заклик (яскрава, по центру)
      stagesPlace = wide ? [
        mood({ x: halfW * 0.7, y: halfH * 0.62, s: Math.min(0.42, halfH * 0.22), amp: 0.3, freq: 1.2, spread: 0.06, flow: 1.4, glow: 0.12, spin: 0.12, dim: 0.75 }),
        mood({ x: -halfW * 0.64, y: -halfH * 0.38, s: Math.min(0.48, halfH * 0.26), amp: 0.12, freq: 2.6, spread: 0.03, flow: 0.6, glow: 0.06, spin: 0.06, dim: 0.8 }),
        mood({ x: -halfW * 0.64, y: -halfH * 0.32, s: Math.min(0.36, halfH * 0.2), amp: 0.18, freq: 3.2, spread: 0.04, flow: 1.8, glow: 0.14, spin: 0.35, dim: 0.75 }),
        mood({ x: 0, y: 0, s: Math.min(1.7, halfH * 0.95), amp: 0.34, freq: 1.0, spread: 0.12, flow: 0.7, glow: 0.05, spin: 0.04, dim: 0.32 }),
        mood({ x: halfW * 0.25, y: halfH * 0.3, s: Math.min(0.62, halfH * 0.33), amp: 0.3, freq: 1.5, spread: 0.08, flow: 1.1, glow: 0.3, spin: 0.15, dim: 0.9 }),
      ] : [
        mood({ x: halfW * 0.5, y: halfH * 0.7, s: halfW * 0.3, amp: 0.3, freq: 1.2, spread: 0.06, flow: 1.4, glow: 0.12, dim: 0.5 }),
        mood({ x: 0, y: 0, s: halfW * 0.55, amp: 0.12, freq: 2.6, spread: 0.03, flow: 0.6, spin: 0.06, dim: 0.3 }),
        mood({ x: 0, y: halfH * 0.1, s: halfW * 0.4, amp: 0.18, freq: 3.2, spread: 0.04, flow: 1.8, glow: 0.12, spin: 0.35, dim: 0.35 }),
        mood({ x: 0, y: 0, s: halfW * 0.95, amp: 0.34, freq: 1.0, spread: 0.12, flow: 0.7, spin: 0.04, dim: 0.25 }),
        mood({ x: halfW * 0.3, y: halfH * 0.35, s: halfW * 0.5, amp: 0.3, freq: 1.5, spread: 0.08, flow: 1.1, glow: 0.3, spin: 0.15, dim: 0.6 }),
      ];
    }
    if (!GUIDE || STATIC) {
      root.position.set(layout.x, layout.y, 0);
      root.scale.setScalar(layout.s);
    }
    if (STATIC) renderer.render(scene, camera);
  };
  if (GUIDE) window.addEventListener('resize', resize);
  else new ResizeObserver(resize).observe(hero);

  const applyQuality = () => {
    const q = QUALITY[level];
    renderer.setPixelRatio(q.pr);
    uniforms.uPixelRatio.value = q.pr;
    uniforms.uSize.value = (IS_MOBILE ? 22 : 21) * (q.size || 1);
    geometry.setDrawRange(0, Math.floor(COUNT * q.frac));
    html.classList.toggle('lite', !!q.lite);   // зерно → нерухомий фон
    resize();
    window.__heroQuality = level;
  };
  applyQuality();

  // ---- Без анімацій: один статичний кадр і все ----
  if (STATIC) {
    window.__heroQuality = 'static';
    tilt.rotation.set(0.25, -0.4, 0);
    renderer.render(scene, camera);
    return;
  }

  // ---- Де починається кожен блок: звідси рахуємо, яку фігуру показувати ----
  // Перехід до фігури блоку — поки його верх їде від 60 % до 15 % висоти екрана
  // (пізніше, ніж з'являється блок, — щоб фігура не мінялась, поки дочитуєш попередній)
  const stageSections = () => (PAGE === 'case'
    ? ['.case-cover', '#s-flow', '#s-details', '#s-gallery', '.case-next']
    : ['.statement', '#services', '#work', '#process', '#contact']);
  let stops = [];
  const measure = () => {
    const H = window.innerHeight;
    stops = stageSections().map((sel) => {
      const el = $(sel);
      if (!el) return null;
      const top = el.getBoundingClientRect().top + window.scrollY;
      return { start: top - H * 0.6, end: top - H * 0.15 };
    }).filter(Boolean);
  };
  if (GUIDE) {
    window.ScrollTrigger.addEventListener('refresh', measure);
    measure();
  }

  // ---- Взаємодія з мишею / пальцем ----
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  let hoverTarget = 0;
  let lastActive = performance.now(); // коли востаннє гортали/рухали мишею (для економії енергії)
  const target = GUIDE ? window : hero;
  target.addEventListener('pointermove', (e) => {
    if (GUIDE) {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    } else {
      mouse.tx = (e.clientX / hero.clientWidth) * 2 - 1;
      mouse.ty = -(((e.clientY + window.scrollY) / hero.clientHeight) * 2 - 1);
    }
    hoverTarget = 1;
    lastActive = performance.now();
  }, { passive: true });
  (GUIDE ? document : hero).addEventListener('pointerleave', () => { hoverTarget = 0; });
  window.addEventListener('scroll', () => { lastActive = performance.now(); }, { passive: true });

  // ---- Анімація появи ----
  if (HAS_GSAP) {
    // сфера «збирається», коли прелоадер піднімається
    pageReady.then(() => window.gsap.to(uniforms.uIntro, { value: 1, duration: 2.6, ease: 'expo.out', delay: 0.1 }));
  } else {
    uniforms.uIntro.value = 1;
  }

  // ---- Цикл рендеру ----
  const clock = new THREE.Clock();
  let running = false;
  let inView = true;
  let lastRender = 0;
  let ySmooth = window.scrollY;
  const chase = { y: 0, z: 0 };   // відставання сфери під час швидкого «польоту»
  // поточний «настрій» сфери — щокадру м'яко підтягується до цільового
  const moodNow = {
    x: layout.x, y: layout.y, s: layout.s,
    amp: 0.26, freq: 1.5, spread: 0.07, flow: 1, glow: 0, sx: 1, sy: 1, spin: 0.07, dim: 1,
  };

  // Автопідлаштування: рахуємо кадри у вікнах по 1 с.
  // Два «повільні» вікна поспіль (< 50 FPS) → знижуємо якість; якщо не допомогло — повертаємо.
  let winStart = 0;
  let winFrames = 0;
  let slowWindows = 0;
  let fpsBeforeDrop = 0;
  let checkWindows = 0;
  let checkSum = 0;
  let adaptDone = false;
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
    if (checkWindows > 0) {
      checkSum += fps;
      checkWindows--;
      if (checkWindows === 0 && checkSum / 2 < fpsBeforeDrop * 1.1) {
        level--;            // приросту немає — гальмує не сфера
        applyQuality();
        adaptDone = true;
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

  // ---- «Пульт» сфери для решти сайту: наведення на проєкти й пасхалка ----
  const baseColor = new THREE.Color(accent);
  const tintTarget = baseColor.clone();
  const burstState = { v: 0 };
  let pulse = 0;
  let pulseTarget = 0;
  let hyper = 0;          // скільки секунд ще триває «гіперстрибок»
  window.__sphere = {
    tint(hex, doPulse = false) {            // забарвити сферу в колір проєкту (null — повернути свій)
      tintTarget.set(hex || baseColor);
      pulseTarget = doPulse ? 1 : 0;
      lastActive = performance.now();
    },
    burst(strength = 1) {                    // залп для пасхалки: частинки розлітаються й пружно повертаються
      lastActive = performance.now();
      if (!HAS_GSAP) return;
      window.gsap.killTweensOf(burstState);
      window.gsap.timeline()
        .to(burstState, { v: strength, duration: 0.3, ease: 'power3.out' })
        .to(burstState, { v: 0, duration: 1.6, ease: 'elastic.out(1, 0.4)' });
    },
    hyper(seconds = 1.8) { hyper = seconds; lastActive = performance.now(); }, // ривок крізь зорі
    // Нова сторінка без перезавантаження: свій колір, композиція й етапи — сфера пливе туди сама
    setPage() {
      const c = getComputedStyle(html).getPropertyValue(PAGE === 'case' ? '--tint' : '--accent').trim() || '#a374ff';
      baseColor.set(c);
      tintTarget.set(c);
      pulseTarget = 0;
      resize();
      measure();
      lastActive = performance.now();
    },
  };

  const lerp = THREE.MathUtils.lerp;
  const frame = () => {
    if (!running) return;
    requestAnimationFrame(frame);
    const now = performance.now();
    monitor(now);
    // Економія енергії, коли нічого не відбувається:
    //  • звичайна відеокарта — через 2.5 с малюємо ~30 разів на секунду;
    //  • слабка / програмна (легкий режим) — через 1.2 с фігура «завмирає» й не перемальовується,
    //    бо без відеокарти браузер щокадру змішує з нею весь вміст сторінки, а це дорого.
    //    Щойно гортаєш або рухаєш мишею — вона знову оживає.
    const q = QUALITY[level];
    const quiet = now - lastActive;
    const introDone = uniforms.uIntro.value >= 0.999;
    if (html.classList.contains('preview-open')) return; // поки відкрите живе демо — сцена на паузі
    if (GUIDE && q.lite && quiet > 1200 && introDone && Math.abs(window.scrollY - ySmooth) < 0.5) return;
    const minMs = quiet > 2500 ? Math.max(33, q.frameMs) : q.frameMs;
    if (now - lastRender < minMs) return;
    lastRender = now;
    const dt = Math.min(clock.getDelta(), 0.05);
    uniforms.uTime.value += dt;

    const k = 1 - Math.pow(1 - 0.12, dt * 60);
    mouse.x += (mouse.tx - mouse.x) * k;
    mouse.y += (mouse.ty - mouse.y) * k;
    uniforms.uMouse.value.set(mouse.x, mouse.y);
    uniforms.uHover.value += (hoverTarget - uniforms.uHover.value) * 0.05;

    // Перший екран: сфера виходить у центр, росте, потім вибухає
    const p = heroScroll.p;
    const move = THREE.MathUtils.smootherstep(p, 0, 0.6);
    const heroExplode = THREE.MathUtils.smoothstep(p, 0.35, 1);

    // Цільовий «настрій»: на першому екрані — як було (сфера виходить у центр і вибухає),
    // далі — плавно змішуємо настрої блоків залежно від того, де ми на сторінці
    const target = {
      x: layout.x * (1 - move), y: layout.y * (1 - move), s: layout.s * (1 + move * 0.3),
      amp: 0.26, freq: 1.5, spread: 0.07, flow: 1, glow: 0, sx: 1, sy: 1, spin: 0.07 + move * 0.5, dim: layout.dim ?? 1,
    };
    let regroup = 0;
    if (GUIDE) {
      ySmooth += (window.scrollY - ySmooth) * (1 - Math.pow(1 - 0.18, dt * 60));
      stops.forEach((s, i) => {
        const t = THREE.MathUtils.clamp((ySmooth - s.start) / (s.end - s.start), 0, 1);
        if (i === 0) regroup = t;
        const e = THREE.MathUtils.smootherstep(t, 0, 1);
        const st = stagesPlace[i];
        if (!st || e === 0) return;
        for (const key in target) target[key] = lerp(target[key], st[key], e);
      });
    }

    // Сфера не стрибає до цілі, а м'яко «допливає» (~0.6 с) — навіть при різкому скролі.
    // На першому екрані (поки вона прив'язана до вибуху) — майже без затримки.
    const follow = regroup > 0 ? 0.06 : 0.35;
    const kf = 1 - Math.pow(1 - follow, dt * 60);
    for (const key in target) moodNow[key] += (target[key] - moodNow[key]) * kf;

    // Політ крізь зорі: повільно пливемо завжди, а скрол розганяє (униз — уперед, угору — назад)
    const v = scrollSpeed.smooth;                                   // px/с
    const speed = THREE.MathUtils.clamp(v / 2600, -1, 1);
    // гіперстрибок (пасхалка): різкий розгін, потім плавне гальмування
    if (hyper > 0) hyper = Math.max(0, hyper - dt);
    const hyperK = Math.min(1, hyper * 1.2);
    const speedTarget = Math.max(Math.abs(speed), hyperK) * (speed < 0 && hyperK === 0 ? -1 : 1);
    starUniforms.uSpeed.value += (speedTarget - starUniforms.uSpeed.value) * kf * 1.5;
    starUniforms.uTravel.value += dt * (0.012 + v * 0.00011 + hyperK * 1.1);

    // Сфера «переслідує»: при швидкому польоті трохи відстає й відходить углиб, потім наздоганяє
    chase.y += ((-starUniforms.uSpeed.value * 0.35) - chase.y) * kf;
    chase.z += ((-Math.abs(starUniforms.uSpeed.value) * 0.9) - chase.z) * kf;

    root.position.set(moodNow.x, moodNow.y + chase.y, chase.z);
    root.scale.set(moodNow.s * moodNow.sx, moodNow.s * moodNow.sy, moodNow.s);
    // колір і пульс від наведеного проєкту, ударна хвиля
    pulse += (pulseTarget - pulse) * kf;
    uniforms.uColorA.value.lerp(tintTarget, kf * 0.8);
    uniforms.uBurst.value = burstState.v;
    uniforms.uAmp.value = moodNow.amp + pulse * Math.sin(uniforms.uTime.value * 5) * 0.07;
    // поки триває будь-який ефект — не «засинаємо» (важливо для слабких ПК)
    if (burstState.v > 0.001 || hyper > 0 || pulse > 0.01 || Math.abs(uniforms.uColorA.value.r - tintTarget.r) > 0.004) lastActive = now;
    uniforms.uFreq.value = moodNow.freq;
    uniforms.uSpread.value = moodNow.spread;
    uniforms.uFlow.value = moodNow.flow;
    uniforms.uGlow.value = moodNow.glow;
    uniforms.uDim.value = moodNow.dim;
    uniforms.uScroll.value = move * (1 - regroup);
    uniforms.uExplode.value = heroExplode * (1 - THREE.MathUtils.smoothstep(regroup, 0, 0.85));

    sphere.rotation.y += dt * moodNow.spin; // при скролі першого екрана сфера розкручується
    tilt.rotation.x += (-mouse.y * 0.35 - tilt.rotation.x) * 0.05;
    tilt.rotation.y += (mouse.x * 0.5 - tilt.rotation.y) * 0.05;
    stars.rotation.z += dt * 0.004;              // ледь помітне обертання неба
    stars.rotation.x = mouse.y * 0.03;           // і легкий паралакс за мишею
    stars.rotation.y = -mouse.x * 0.03;

    renderer.render(scene, camera);
  };

  const update = () => {
    const shouldRun = inView && !document.hidden;
    if (shouldRun && !running) { running = true; winStart = 0; clock.getDelta(); frame(); }
    else if (!shouldRun) running = false;
  };

  // Провідник видно завжди; без нього — малюємо лише поки видно перший екран
  if (!GUIDE) new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); }).observe(hero);
  document.addEventListener('visibilitychange', update);
  update();
}

/* =========================================================
   Лічильник FPS для перевірки на своєму комп'ютері: додай ?fps до адреси
   ========================================================= */
function initFpsMeter() {
  const box = document.createElement('div');
  box.style.cssText = 'position:fixed;top:5rem;left:1rem;z-index:400;padding:.45rem .7rem;border-radius:8px;background:#000d;color:#fff;font:12px/1.4 ui-monospace,monospace;pointer-events:none;white-space:pre';
  document.body.appendChild(box);
  let frames = 0;
  let start = performance.now();
  const loop = (now) => {
    frames++;
    if (now - start >= 500) {
      const fps = Math.round((frames * 1000) / (now - start));
      box.textContent = `${fps} FPS · quality ${window.__heroQuality ?? '–'}\nGPU: ${(window.__gpu || '—').slice(0, 60)}`;
      frames = 0;
      start = now;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
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
   Перехід між сторінками одним «дублем»: сторінка НЕ перезавантажується.
   3D-сцена (зорі + сфера) живе весь час. Клік → текст розчиняється, зорі розганяються,
   сфера розлітається; тим часом підвантажуємо нову сторінку й підміняємо лише вміст.
   Сфера сама пливе на нове місце й перефарбовується, зорі гальмують, новий текст проявляється.
   Адреса змінюється (history), «Назад»/«Вперед» працюють, для пошуковиків це звичайні сторінки.
   ========================================================= */
const SWAP_LINKS = '.project-link, .case-header .back, .case-header .logo, .case-next';
const pageCache = new Map();
let swapping = false;
let currentPath = location.pathname;

// Усе, крім 3D-полотна, курсора й зерна (у нього своя прозорість 4 %): саме це гасне й проявляється
const ptContent = () => $$('body > *').filter((el) => !el.matches('.hero-canvas, .cursor, .grain, script, link, style'));
// Звичайний клік лівою кнопкою без модифікаторів (інакше — як звичайне посилання, напр. нова вкладка)
const ptPlainClick = (e) => !(e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey);

function fetchPage(url) {
  if (!pageCache.has(url)) {
    pageCache.set(url, fetch(url).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.text();
    }).catch((err) => { pageCache.delete(url); throw err; }));
  }
  return pageCache.get(url);
}

// Стилі нової сторінки: підключаємо, чекаємо завантаження, потім прибираємо зайві
async function swapStyles(doc, base) {
  const isFont = (h) => h.includes('fonts.googleapis');
  const want = [...doc.querySelectorAll('link[rel="stylesheet"]')]
    .map((l) => new URL(l.getAttribute('href'), base).href).filter((h) => !isFont(h));
  const have = [...document.querySelectorAll('link[rel="stylesheet"]')].filter((l) => !isFont(l.href));
  await Promise.all(want.filter((h) => !have.some((l) => l.href === h)).map((h) => new Promise((done) => {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = h;
    l.onload = l.onerror = done;
    document.head.appendChild(l);
  })));
  have.filter((l) => !want.includes(l.href)).forEach((l) => l.remove());
}

// Прибираємо все, що належить старій сторінці (тригери скролу, «прилиплий» перший екран тощо)
function teardownPage() {
  fxCtx?.revert();
  fxCtx = null;
  window.ScrollTrigger?.getAll().forEach((t) => t.kill());
  heroScroll.p = 0;
  eggCelebrate = null;
  setSkew = null;
  html.classList.remove('fx', 'reveal-fallback', 'preview-open', 'lang-fade');
}

async function swapTo(href, push) {
  const url = new URL(href, location.href);
  const docUrl = url.href.split('#')[0];
  if (swapping) return;
  swapping = true;
  const { gsap } = window;

  // 1) Відліт: текст розчиняється, зорі — у штрихи, сфера розлітається
  lenis?.stop();
  window.__sphere?.hyper(2.6);
  window.__sphere?.burst(1.1);
  window.__sphere?.tint(null);
  const fade = new Promise((done) => gsap.to(ptContent(), { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: done }));

  let doc;
  try {
    const [text] = await Promise.all([fetchPage(docUrl), fade]);
    doc = new DOMParser().parseFromString(text, 'text/html');
    await swapStyles(doc, docUrl);
  } catch (err) {
    location.href = url.href; // щось пішло не так — звичайний перехід
    return;
  }

  // 2) Адреса (до вставки вмісту: відносні шляхи картинок рахуються від нової адреси)
  if (push) history.pushState({ swap: true }, '', url.href);
  currentPath = url.pathname;

  // 3) Підміна вмісту; 3D-полотно, курсор і зерно лишаються
  teardownPage();
  [...document.body.children].forEach((el) => { if (!el.matches('.hero-canvas, .cursor, .grain, script')) el.remove(); });
  const frag = document.createDocumentFragment();
  [...doc.body.children].forEach((el) => {
    if (el.matches('.hero-canvas, .cursor, .grain, .preloader, script')) return;
    const node = document.importNode(el, true);
    node.querySelectorAll('.hero-canvas').forEach((c) => c.remove());
    frag.appendChild(node);
  });
  const nd = doc.documentElement;
  PAGE = nd.dataset.page || 'home';
  html.dataset.page = PAGE;
  const grainBg = html.style.getPropertyValue('--grain-bg');
  html.setAttribute('style', nd.getAttribute('style') || '');
  if (grainBg) html.style.setProperty('--grain-bg', grainBg);
  document.title = doc.title;
  document.body.appendChild(frag);
  const content = ptContent();
  gsap.set(content, { opacity: 0 });

  // 4) Нагору (або до якоря), нова сторінка оживає, сфера пливе на своє місце
  window.scrollTo(0, 0);
  lenis?.scrollTo(0, { immediate: true, force: true });
  if (PAGE === 'case') initCaseContent(true);
  else initHomeContent(true);
  window.__sphere?.setPage();
  refreshScroll();
  const target = url.hash.length > 1 ? document.getElementById(url.hash.slice(1)) : null;
  if (target) {
    if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
    else target.scrollIntoView();
  }
  lenis?.start();
  lenis?.resize();

  // 5) Прибуття: штрихи гальмують самі, текст проявляється
  gsap.to(content, { opacity: 1, duration: 0.5, ease: 'power2.out', clearProps: 'opacity' });
  $('main')?.setAttribute('tabindex', '-1');
  $('main')?.focus({ preventScroll: true }); // для клавіатури й скрінрідерів — фокус на новому вмісті
  try { window.goatcounter?.count?.({ path: location.pathname, title: document.title }); window.goatcounter?.bind_events?.(); } catch (e) { /* статистика — не критично */ }
  swapping = false;
}

function initPageSwap() {
  if (REDUCED || !HAS_GSAP || !window.fetch || !window.DOMParser || !history.pushState) return; // звичайні посилання
  document.addEventListener('click', (e) => {
    const a = e.target.closest?.(SWAP_LINKS);
    if (!a || !ptPlainClick(e) || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    e.preventDefault();
    swapTo(url.href, true);
  });
  // Підвантажуємо сторінку заздалегідь, щойно навели / торкнулись посилання
  const pre = (e) => {
    const a = e.target.closest?.(SWAP_LINKS);
    if (a) fetchPage(new URL(a.href, location.href).href.split('#')[0]).catch(() => {});
  };
  document.addEventListener('pointerover', pre, { passive: true });
  document.addEventListener('touchstart', pre, { passive: true });
  document.addEventListener('focusin', pre);
  history.replaceState({ swap: true }, '');
  window.addEventListener('popstate', () => {
    if (location.pathname !== currentPath) swapTo(location.href, false);
  });
}

/* =========================================================
   Сторінка-кейс (work/<slug>/): та сама сфера-провідник і зорі,
   поява першого екрана по літерах, ефекти скролу, нахил карток
   ========================================================= */

// Мова на кейсі: тексти обома мовами вже в HTML ([data-l]), перемикаємо видимість
function initCaseLang() {
  const titleEn = ($('.case-title [data-l="en"]')?.dataset.text || '') + ' — case study · Oleksii';
  const titles = { uk: document.title, en: titleEn };
  const set = (lang) => {
    html.lang = lang;
    document.title = titles[lang];
    $$('.lang-switch [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $$(`[data-alt-${lang}]`).forEach((el) => { el.alt = el.getAttribute(`data-alt-${lang}`); });
    $$(`[data-label-${lang}]`).forEach((el) => el.setAttribute('aria-label', el.getAttribute(`data-label-${lang}`)));
    try { localStorage.setItem('lang', lang); } catch (e) { /* приватний режим */ }
  };
  set(html.lang === 'en' ? 'en' : 'uk');
  $$('.lang-switch [data-lang]').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.lang === html.lang) return;
    if (HAS_GSAP && !REDUCED) {
      // м'яко: вміст гасне, мова змінюється, вміст з'являється
      window.gsap.to('main', { opacity: 0, duration: 0.2, onComplete: () => {
        set(b.dataset.lang);
        window.ScrollTrigger?.refresh();
        window.gsap.to('main', { opacity: 1, duration: 0.35 });
      } });
    } else set(b.dataset.lang);
  }));
}

// Розбиваємо заголовки на літери (обидві мови). *слово* → акцентний колір
function splitCaseText() {
  $$('[data-split-case] [data-l]').forEach((el) => {
    // <span class="accent">x</span> → *x* (формат splitText)
    const raw = [...el.childNodes].map((n) => (n.nodeType === 3 ? n.textContent : `*${n.textContent}*`)).join('');
    el.dataset.text = raw.replace(/\*/g, '');
    splitText(el, raw.trim());
  });
  // Фраза «Задача»: слова, що «загоряються» при скролі
  $$('.case-statement [data-l]').forEach((el) => {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.innerHTML = '';
    const sr = document.createElement('span'); // текст для скрінрідерів (aria-label на span заборонений)
    sr.className = 'sr-only';
    sr.textContent = text;
    el.appendChild(sr);
    words.forEach((w, i) => {
      const s = document.createElement('span');
      s.className = 'w';
      s.setAttribute('aria-hidden', 'true');
      s.textContent = w;
      el.appendChild(s);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
  });
}

// Поява першого екрана: літери заголовка піднімаються, решта виїжджає знизу
function revealCase() {
  clearTimeout(window.__revealFallback);
  if (REDUCED || !HAS_GSAP) { html.classList.add('reveal-fallback'); return; }
  const { gsap } = window;
  gsap.set(['.case-title', '.intro'], { opacity: 1 });
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .fromTo('.case-kicker', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 0)
    .fromTo('.case-title .char-in', { yPercent: 115, rotate: 8, opacity: 0 },
      { yPercent: 0, rotate: 0, opacity: 1, duration: 1.2, stagger: 0.022 }, 0.1)
    .fromTo('.case-lead', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.1 }, 0.55)
    .fromTo('.case-actions > *', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.7)
    .fromTo('.case-meta > div', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.07 }, 0.8)
    .fromTo('.case-meta', { '--meta-line': 0 }, { '--meta-line': 1, duration: 1.4, ease: 'expo.inOut' }, 0.7);
}

function initCaseFx() {
  if (REDUCED || !HAS_GSAP || !window.ScrollTrigger) return;
  const { gsap } = window;
  const ST = window.ScrollTrigger;
  html.classList.add('fx');

  // Обкладинка: «розкривається» з вузької рамки й наближається, далі — легкий паралакс
  const cover = $('.case-cover');
  if (cover) {
    gsap.fromTo(cover, { clipPath: 'inset(14% 9% 0% 9% round 32px)', y: 60 }, {
      clipPath: 'inset(0% 0% 0% 0% round 26px)', y: 0, ease: 'none',
      scrollTrigger: { trigger: cover, start: 'top bottom', end: 'top 30%', scrub: 0.6 },
    });
    gsap.fromTo($$('img', cover), { scale: 1.22 }, { // обидві версії (укр / англ)
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: cover, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    });
  }

  // Підписи блоків («01 Задача» …): номер і назва виїжджають зліва
  $$('.block-label').forEach((label) => {
    gsap.from(label.children, {
      opacity: 0, x: -30, duration: 0.9, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: label, start: 'top 88%', once: true },
    });
  });

  // «Задача»: слова загоряються від ледь помітних до яскравих, поки гортаєш
  // Приглушуємо слова лише коли блок уже близько до екрана: до того текст повністю видимий
  // (і для перевірки контрасту, і якщо хтось перейде одразу до середини сторінки)
  ST.create({
    trigger: '.case-statement', start: 'top bottom+=10%', once: true,
    onEnter: () => $$('.case-statement [data-l]').forEach((el) => {
      gsap.fromTo($$('.w', el), { opacity: 0.14 }, {
        opacity: 1, ease: 'none', stagger: 0.1,
        scrollTrigger: { trigger: '.case-statement', start: 'top 82%', end: 'bottom 50%', scrub: 0.5 },
      });
    }),
  });

  // «Як це працює»: лінія кожного кроку промальовується, номер і текст виїжджають
  $$('.flow li').forEach((li) => {
    gsap.timeline({ scrollTrigger: { trigger: li, start: 'top 86%', once: true } })
      .fromTo($('.flow-bar', li), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.inOut' }, 0)
      .from($('.flow-num', li), { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, 0.2)
      .from($('p', li), { opacity: 0, y: 26, duration: 1, ease: 'expo.out' }, 0.3);
  });
  const lastFlow = $('.flow li:last-child .flow-bar--end');
  if (lastFlow) {
    gsap.fromTo(lastFlow, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.inOut', scrollTrigger: { trigger: lastFlow, start: 'top 92%', once: true } });
  }

  // «Що зроблено»: колонки піднімаються з легким поворотом, пункти — по черзі
  $$('.feature-col').forEach((col, i) => {
    gsap.timeline({ scrollTrigger: { trigger: col, start: 'top 85%', once: true } })
      .from(col, { opacity: 0, y: 80, rotateX: -12, transformOrigin: '50% 0%', duration: 1.2, ease: 'expo.out', delay: i * 0.1 }, 0)
      .from($$('li', col), { opacity: 0, x: -24, duration: 0.8, ease: 'power3.out', stagger: 0.07 }, 0.35 + i * 0.1);
  });

  // «Цікаві рішення»: картки злітають «віялом»
  const details = $$('.detail');
  if (details.length) {
    gsap.from(details, {
      opacity: 0, y: 100, rotate: (i) => (i % 2 ? 3 : -3), duration: 1.2, ease: 'expo.out', stagger: 0.1,
      scrollTrigger: { trigger: '.details', start: 'top 85%', once: true },
    });
  }

  // Скриншоти: з'являються пачками, коли доходять до екрана
  const shots = $$('.shot');
  if (shots.length) {
    gsap.set(shots, { opacity: 0, y: 70, scale: 0.94 });
    ST.batch(shots, {
      start: 'top 92%', once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'expo.out', stagger: 0.09, overwrite: true }),
    });
  }

  // «Що це дає бізнесу»: рядки виїжджають, лінії під ними промальовуються
  $$('.benefits li').forEach((li) => {
    gsap.timeline({ scrollTrigger: { trigger: li, start: 'top 88%', once: true } })
      .fromTo($('.benefit-bar', li), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.inOut' }, 0)
      .from($('.benefit-text', li), { opacity: 0, x: -50, duration: 1.1, ease: 'expo.out' }, 0.15);
  });

  // Наступний проєкт: картка піднімається, назва — по літерах
  const next = $('.case-next');
  if (next) {
    gsap.timeline({ scrollTrigger: { trigger: next, start: 'top 85%', once: true } })
      .from(next, { opacity: 0, y: 80, scale: 0.96, duration: 1.2, ease: 'expo.out' }, 0)
      .from($$('.case-next-title .char-in', next), { yPercent: 115, rotate: 8, duration: 1, ease: 'expo.out', stagger: 0.02 }, 0.2);
  }

  // Великий заклик: літери піднімаються одна за одною, поки гортаєш (як у «Контактах» на головній)
  const cta = $$('.cta-title .char-in');
  if (cta.length) {
    gsap.fromTo(cta, { yPercent: 115, rotate: 10 }, {
      yPercent: 0, rotate: 0, ease: 'power3.out', stagger: 0.03,
      scrollTrigger: { trigger: '.cta-title', start: 'top 92%', end: 'top 50%', scrub: 0.6 },
    });
    gsap.from(['.case-cta p', '.case-cta .case-btn'], {
      opacity: 0, y: 30, duration: 1, ease: 'expo.out', stagger: 0.1,
      scrollTrigger: { trigger: '.case-cta p', start: 'top 92%', once: true },
    });
  }
}

// Нахил карток за мишею + світло там, де курсор (як картки послуг на головній)
function initTilt(selector) {
  if (IS_TOUCH || REDUCED || !HAS_GSAP) return;
  const { gsap } = window;
  $$(selector).forEach((card) => {
    const rx = gsap.quickTo(card, 'rotateX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(card, 'rotateY', { duration: 0.6, ease: 'power3.out' });
    gsap.set(card, { transformPerspective: 900 });
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      rx((0.5 - py) * 7);
      ry((px - 0.5) * 9);
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
    });
    card.addEventListener('pointerleave', () => { rx(0); ry(0); });
  });
}

// Картинка, яку зараз видно (на скриншоті може бути дві — українською й англійською)
const visibleImg = (root) => $$('img', root).find((i) => getComputedStyle(i).display !== 'none') || $('img', root);

// Перегляд скриншота на весь екран (<dialog>: Esc закриває, фокус повертається)
function initZoom() {
  const dlg = $('.zoom');
  if (!dlg || typeof dlg.showModal !== 'function') {
    $$('[data-zoom]').forEach((b) => b.addEventListener('click', () => window.open(visibleImg(b)?.currentSrc || b.dataset.zoom, '_blank')));
    return;
  }
  const big = $('img', dlg);
  let opener = null;
  $$('[data-zoom]').forEach((btn) => btn.addEventListener('click', () => {
    opener = btn;
    const img = visibleImg(btn);
    big.src = img?.currentSrc || img?.src || btn.dataset.zoom;
    big.width = +(img?.getAttribute('width') || btn.dataset.w);
    big.height = +(img?.getAttribute('height') || btn.dataset.h);
    big.alt = img?.alt || '';
    dlg.showModal();
    lenis?.stop();
    if (HAS_GSAP && !REDUCED) window.gsap.fromTo(big, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' });
  }));
  $('.zoom-close', dlg).addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target === big) dlg.close(); });
  dlg.addEventListener('close', () => { lenis?.start(); opener?.focus(); });
}

/* =========================================================
   Активність на GitHub (у «Контактах»)
   Дані беремо наживо з публічного API (той самий графік, що в профілі GitHub; оновлюється ~щогодини).
   Якщо сервіс не відповів — показуємо знімок data/github-contributions.json (оновлення: node tools/github-snapshot.mjs).
   ========================================================= */
const GH_USER = 'blessedrbls';
const GH_API = `https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`;
let ghData = null;
let ghLive = false;
let ghAnimated = false;

async function loadGithub() {
  if (ghData) return ghData;
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 5000);
    const r = await fetch(GH_API, { signal: ctl.signal });
    clearTimeout(timer);
    if (!r.ok) throw new Error(String(r.status));
    ghData = await r.json();
    ghLive = true;
  } catch (e) {
    try { ghData = await (await fetch('data/github-contributions.json')).json(); } catch (err) { ghData = null; }
  }
  return ghData;
}

const GH_TEXT = {
  uk: {
    months: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
    days: ['', 'Пн', '', 'Ср', '', 'Пт', ''],
    title: (n) => `<b>${n}</b> ${n % 10 === 1 && n % 100 !== 11 ? 'внесок' : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'внески' : 'внесків')} на GitHub за останній рік`,
    tip: (n, d) => `${n || 'Немає'} ${n === 0 ? 'внесків' : (n % 10 === 1 && n % 100 !== 11 ? 'внесок' : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'внески' : 'внесків'))} · ${d}`,
    less: 'Менше', more: 'Більше',
    live: 'Оновлюється автоматично з GitHub', snap: 'Знімок із GitHub',
  },
  en: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['', 'Mon', '', 'Wed', '', 'Fri', ''],
    title: (n) => `<b>${n}</b> contribution${n === 1 ? '' : 's'} on GitHub in the last year`,
    tip: (n, d) => `${n || 'No'} contribution${n === 1 ? '' : 's'} · ${d}`,
    less: 'Less', more: 'More',
    live: 'Updates automatically from GitHub', snap: 'Snapshot from GitHub',
  },
};

function renderGithub() {
  const box = $('#github-activity');
  if (!box || !ghData?.contributions?.length) return;
  const T = GH_TEXT[currentLang] || GH_TEXT.uk;
  const days = ghData.contributions;
  const total = ghData.total?.lastYear ?? days.reduce((s, d) => s + d.count, 0);
  const fmt = new Intl.DateTimeFormat(currentLang === 'en' ? 'en-GB' : 'uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });

  // Тижні йдуть стовпчиками, неділя — зверху (як на GitHub)
  const first = new Date(`${days[0].date}T00:00:00`);
  const pad = first.getDay();
  const weeks = Math.ceil((pad + days.length) / 7);
  const parts = [];
  T.days.forEach((label, row) => { if (label) parts.push(`<span class="gh-day" style="grid-row:${row + 2}">${label}</span>`); });
  let lastMonth = -1;
  days.forEach((d, i) => {
    const pos = pad + i;
    const week = Math.floor(pos / 7);
    const row = pos % 7;
    const date = new Date(`${d.date}T00:00:00`);
    // підпис місяця — над першим тижнем, що починається в новому місяці (і не впритул до кінця)
    if (row === 0 && date.getMonth() !== lastMonth && week < weeks - 2) {
      lastMonth = date.getMonth();
      parts.push(`<span class="gh-month" style="grid-column:${week + 2} / span 4">${T.months[lastMonth]}</span>`);
    }
    parts.push(`<i class="gh-cell" data-level="${d.level}" data-tip="${T.tip(d.count, fmt.format(date))}" style="grid-row:${row + 2};grid-column:${week + 2};--w:${week}"></i>`);
  });

  const cal = $('.gh-cal', box);
  cal.style.setProperty('--weeks', weeks);
  cal.innerHTML = parts.join('');
  if (ghAnimated) { cal.classList.remove('is-waiting'); cal.classList.add('is-in', 'is-done'); }
  cal.setAttribute('aria-label', `${T.title(total).replace(/<\/?b>/g, '')}`);
  $('.gh-title', box).innerHTML = T.title(total);
  $('.gh-less', box).textContent = T.less;
  $('.gh-more', box).textContent = T.more;
  $('.gh-updated', box).textContent = ghLive ? T.live : T.snap;
  box.hidden = false;

  // На вузьких екранах — одразу до останніх тижнів
  const sc = $('.gh-scroll', box);
  sc.scrollLeft = sc.scrollWidth;

  // Клітинки «загоряються» хвилею зліва направо, коли блок з'являється (CSS-анімація, один раз)
  if (!ghAnimated && !REDUCED && 'IntersectionObserver' in window) {
    ghAnimated = true;
    cal.classList.add('is-waiting');
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      cal.classList.remove('is-waiting');
      cal.classList.add('is-in');
    }, { rootMargin: '0px 0px -12% 0px' });
    io.observe(cal);
  }
}

// Підказка над клітинкою (дата й кількість)
function initGithubTip() {
  const box = $('#github-activity');
  if (!box) return;
  const tip = document.createElement('div');
  tip.className = 'gh-tip';
  tip.setAttribute('aria-hidden', 'true');
  box.appendChild(tip);
  box.addEventListener('pointerover', (e) => {
    const c = e.target.closest('.gh-cell');
    if (!c) { tip.classList.remove('is-shown'); return; }
    const r = c.getBoundingClientRect();
    tip.textContent = c.dataset.tip;
    tip.style.left = `${r.left + r.width / 2}px`;
    tip.style.top = `${r.top}px`;
    tip.classList.add('is-shown');
  });
  box.addEventListener('pointerleave', () => tip.classList.remove('is-shown'));
  window.addEventListener('scroll', () => tip.classList.remove('is-shown'), { passive: true });
}

function initGithub() {
  if (!$('#github-activity')) return;
  ghAnimated = false;
  initGithubTip();
  loadGithub().then(() => { renderGithub(); refreshScroll(); });
}

// Вміст кейсу (на старті й після кожного переходу без перезавантаження)
function initCaseContent(swapped = false) {
  splitCaseText();
  initCaseLang();
  initMagnetic();
  initZoom();
  initScrollMotionPage();

  // Наведення на «Наступний проєкт» — сфера забарвлюється в його колір
  const next = $('.case-next');
  if (next && !IS_TOUCH) {
    next.addEventListener('pointerenter', () => window.__sphere?.tint(next.dataset.tint, true));
    next.addEventListener('pointerleave', () => window.__sphere?.tint(null));
  }

  const start = () => {
    revealCase();
    initCaseFx();
    initTilt('.feature-col, .detail');
    refreshScroll();
  };
  if (swapped) { start(); return; }
  const fonts = document.fonts?.ready ?? Promise.resolve();
  Promise.race([fonts, new Promise((r) => setTimeout(r, 1000))]).then(() => {
    resolvePageReady();
    start();
  });
}

// Вміст головної (на старті — після прелоадера; після переходу — одразу)
function initHomeContent(swapped = false) {
  let saved = html.lang === 'en' ? 'en' : 'uk';
  if (!swapped) { try { saved = localStorage.getItem('lang') || 'uk'; } catch (e) { /* ignore */ } }
  renderProjects();
  initPreview();
  initSphereFun();
  applyLang(saved);
  initLangSwitch();
  initHeader();
  initAnchors();
  initMagnetic();
  initScrollMotionPage();
  initGithub();

  const start = () => {
    revealHero();
    initScrollFx();
    initServices();
    initWork();
    refreshScroll();
  };
  if (swapped) { start(); return; }
  // Прелоадер ховається, щойно завантажились шрифти (максимум ~1.5 с), і тоді ж стартує поява першого екрана
  runPreloader().then(() => {
    start();
    // Посилання з якорем (наприклад …/portfolio/#contact) — одразу до потрібного блоку
    const target = location.hash.length > 1 ? document.getElementById(location.hash.slice(1)) : null;
    if (target) {
      if (lenis) lenis.scrollTo(target, { immediate: true });
      else target.scrollIntoView();
    }
  });
}

/* =========================================================
   Старт
   ========================================================= */
function init() {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  // Один раз на весь візит: плавний скрол, швидкість скролу, курсор, 3D-сцена, зерно, переходи
  initScroll();
  initScrollMotion();
  initCursor();
  if (PAGE === 'case') initCaseContent();
  else initHomeContent();
  initHero3D();
  initGrain();
  initPageSwap();
  if (new URLSearchParams(location.search).has('fps')) initFpsMeter();
}

/* =========================================================
   Прелоадер: відсотки 0 → 100 і смужка, потім шторка їде вгору.
   Загалом не довше ~1.5 с. Без анімацій — його немає зовсім.
   ========================================================= */
let resolvePageReady;
const pageReady = new Promise((r) => { resolvePageReady = r; });

function runPreloader() {
  const el = $('.preloader');
  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  const fontsOrTimeout = Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1000))]);

  if (!el || REDUCED || !HAS_GSAP) {
    el?.remove();
    return fontsOrTimeout.then(() => resolvePageReady());
  }

  const { gsap } = window;
  const num = $('.preloader-num', el);
  const bar = $('.preloader-bar span', el);
  const counter = { v: 0 };

  return new Promise((resolve) => {
    // Лічильник іде до 90 %, поки чекаємо шрифти, і добігає до 100 %, коли вони готові
    const draw = () => { num.textContent = Math.round(counter.v); bar.style.transform = `scaleX(${counter.v / 100})`; };
    const toNinety = gsap.to(counter, { v: 90, duration: 0.8, ease: 'power2.out', onUpdate: draw });
    fontsOrTimeout.then(() => {
      toNinety.kill();
      gsap.to(counter, { v: 100, duration: 0.2, ease: 'power1.out', onUpdate: draw });
      gsap.to(el, { yPercent: -100, duration: 0.6, ease: 'expo.inOut', delay: 0.25, onComplete: () => el.remove() });
      // Сайт запускаємо звичайним таймером, а не з анімації: навіть якщо анімації
      // на мить зупиняться (вкладка у фоні), ефекти скролу все одно підключаться
      setTimeout(() => { resolvePageReady(); resolve(); }, 250);
      setTimeout(() => el.remove(), 2500); // страховка: шторка не може «зависнути»
    });
  });
}

init();

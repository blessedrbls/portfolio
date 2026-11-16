/* =========================================================
   Oleksii — portfolio · main.js
   Етап 1: мова, плавний скрол (Lenis), курсор, магнітні кнопки,
           поява тексту по літерах, 3D-сцена на Three.js
   ========================================================= */

// ---------- Дані проєктів (заповнимо на етапі 3) ----------
// eslint-disable-next-line no-unused-vars
const PROJECTS = [];

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
    'work.title': 'Роботи',
    'process.title': 'Як я працюю',
    'contact.title': 'Контакти',
    'footer.top': 'Нагору ↑',
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
    'work.title': 'Work',
    'process.title': 'How I work',
    'contact.title': 'Contact',
    'footer.top': 'Back to top ↑',
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

/* =========================================================
   Розбиття тексту на літери
   ========================================================= */
function splitText(el, text) {
  // *фраза в зірочках* → слова з класом is-accent
  const words = [];
  let accent = false;
  text.split(' ').forEach((raw) => {
    let word = raw;
    const opens = word.startsWith('*');
    if (opens) { accent = true; word = word.slice(1); }
    const closes = word.endsWith('*');
    if (closes) word = word.slice(0, -1);
    words.push({ word, accent });
    if (closes) accent = false;
  });

  el.setAttribute('aria-label', words.map((w) => w.word).join(' '));
  el.textContent = '';
  words.forEach(({ word, accent: isAccent }, i) => {
    const w = document.createElement('span');
    w.className = isAccent ? 'word is-accent' : 'word';
    w.setAttribute('aria-hidden', 'true');
    for (const ch of word) {
      const c = document.createElement('span');
      c.className = 'char';
      c.textContent = ch;
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
      applyLang(btn.dataset.lang);
      revealHero(true);
      if (HAS_GSAP) window.ScrollTrigger?.refresh();
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
  const chars = $$('.hero-title .char');

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

  lenis = new window.Lenis({
    // Колесо і тачпад — нативний скрол браузера (звична інерція, як на будь-якому сайті).
    // Lenis лишається для плавних переходів по якорях (меню, «Гортай») і синхронізації зі ScrollTrigger.
    smoothWheel: false,
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
   Паралакс головного екрану при скролі
   ========================================================= */
function initHeroScroll() {
  if (REDUCED || !HAS_GSAP || !window.ScrollTrigger) return;
  window.gsap.to('.hero-content', {
    yPercent: -18,
    opacity: 0.15,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
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

    gl_PointSize = uSize * uPixelRatio * (0.55 + aRandom * 0.9) * (1.0 + m * 1.6) / -mv.z;

    vGlow  = clamp(disp * 2.6 + m * 1.6, 0.0, 1.0);
    vAlpha = mix(0.18, 1.0, smoothstep(7.4, 5.0, -mv.z)) * uIntro;
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
  const dpr = window.devicePixelRatio || 1;
  const QUALITY = [
    { pr: Math.min(dpr, 1.5), frac: 1 },
    { pr: Math.min(dpr, 1),   frac: 1 },
    { pr: Math.min(dpr, 1),   frac: 0.6 },
    { pr: Math.min(dpr, 0.75), frac: 0.4 },
  ];
  let level = IS_MOBILE ? 1 : 0;
  const COUNT = IS_MOBILE ? 5000 : 10000;
  const DUST = IS_MOBILE ? 150 : 400;

  renderer.setPixelRatio(QUALITY[level].pr);
  renderer.setClearColor(0x000000, 0);

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
    uSize: { value: IS_MOBILE ? 22 : 21 },
    uPixelRatio: { value: QUALITY[level].pr },
    uScroll: { value: 0 },
    uIntro: { value: REDUCED ? 1 : 0 },
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
  const resize = () => {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    uniforms.uAspect.value = w / h;

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
    if (REDUCED) renderer.render(scene, camera);
  };
  new ResizeObserver(resize).observe(hero);

  const applyQuality = () => {
    const q = QUALITY[level];
    renderer.setPixelRatio(q.pr);
    uniforms.uPixelRatio.value = q.pr;
    geometry.setDrawRange(0, Math.floor(COUNT * q.frac));
    resize();
    window.__heroQuality = level;
  };
  applyQuality();

  // ---- Без анімацій: один статичний кадр і все ----
  if (REDUCED) {
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
    if (window.ScrollTrigger) {
      window.gsap.to(uniforms.uScroll, {
        value: 1, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
    }
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
    slowWindows = fps < 50 ? slowWindows + 1 : 0;
    if (slowWindows >= 2 && level < QUALITY.length - 1) {
      level++;
      slowWindows = 0;
      applyQuality();
    }
  };

  const frame = () => {
    if (!running) return;
    requestAnimationFrame(frame);
    const now = performance.now();
    monitor(now);
    if (now - lastRender < 12) return;
    lastRender = now;
    const dt = Math.min(clock.getDelta(), 0.05);
    uniforms.uTime.value += dt;

    const k = 1 - Math.pow(1 - 0.12, dt * 60);
    mouse.x += (mouse.tx - mouse.x) * k;
    mouse.y += (mouse.ty - mouse.y) * k;
    uniforms.uMouse.value.set(mouse.x, mouse.y);
    uniforms.uHover.value += (hoverTarget - uniforms.uHover.value) * 0.05;

    sphere.rotation.y += dt * 0.07;
    tilt.rotation.x += (-mouse.y * 0.35 - tilt.rotation.x) * 0.05;
    tilt.rotation.y += (mouse.x * 0.5 - tilt.rotation.y) * 0.05;
    dust.rotation.y += dt * 0.012;
    dust.rotation.x = mouse.y * 0.05;

    renderer.render(scene, camera);
  };

  const update = () => {
    const shouldRun = inView && !document.hidden;
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
      const v = Math.random() * 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    el.style.backgroundImage = `url(${c.toDataURL('image/png')})`;
  } catch (e) { /* лишається SVG із CSS */ }
}

/* =========================================================
   Лічильник FPS для перевірки: додай ?fps до адреси
   ========================================================= */
function initFpsMeter() {
  const box = document.createElement('div');
  box.style.cssText = 'position:fixed;top:5rem;left:1rem;z-index:400;padding:.4rem .7rem;border-radius:8px;background:#000c;color:#fff;font:12px/1.4 ui-monospace,monospace;pointer-events:none';
  document.body.appendChild(box);
  let frames = 0;
  let start = performance.now();
  const loop = (now) => {
    frames++;
    if (now - start >= 500) {
      const fps = Math.round((frames * 1000) / (now - start));
      const q = window.__heroQuality ?? '–';
      box.textContent = `${fps} FPS · quality ${q} · ${innerWidth}×${innerHeight} @${devicePixelRatio}x`;
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
  applyLang(saved);
  initLangSwitch();

  initScroll();
  initHeader();
  initAnchors();
  initCursor();
  initMagnetic();

  // Чекаємо шрифти, щоб літери не «стрибали» під час анімації
  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1200))]).then(() => {
    revealHero();
    initHeroScroll();
  });

  initHero3D();
  initGrain();
  if (new URLSearchParams(location.search).has('fps')) initFpsMeter();
}

init();

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
    'hero.eyebrow': 'Веб-розробник · фриланс',
    'hero.name': 'Олексій',
    'hero.tagline': 'Сайти та Telegram-боти для бізнесу',
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
    'hero.eyebrow': 'Web developer · freelance',
    'hero.name': 'Oleksii',
    'hero.tagline': 'Websites & Telegram bots for business',
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
  el.setAttribute('aria-label', text);
  el.textContent = '';
  const words = text.split(' ');
  words.forEach((word, i) => {
    const w = document.createElement('span');
    w.className = 'word';
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
  const nameChars = $$('.hero-name .char').concat($('.hero-title-dot'));
  const tagChars = $$('.hero-tagline .char');

  gsap.set(['.hero-title', '.hero-tagline'], { opacity: 1 });

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.fromTo(nameChars,
    { yPercent: 115, rotate: 10, opacity: 0 },
    { yPercent: 0, rotate: 0, opacity: 1, duration: fast ? 0.9 : 1.5, stagger: fast ? 0.035 : 0.07 },
    fast ? 0 : 0.25)
    .fromTo(tagChars,
      { opacity: 0, yPercent: 60, filter: 'blur(6px)' },
      { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: 0.7, stagger: fast ? 0.008 : 0.018, ease: 'power3.out', clearProps: 'filter' },
      fast ? 0.15 : '-=1.0');

  if (!fast) {
    tl.fromTo('.hero-reveal',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
      '-=0.7');
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
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
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

  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const ringPos = { ...pos };

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    pos.x = e.clientX;
    pos.y = e.clientY;
    dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    cursor.classList.add('is-visible');
  }, { passive: true });

  document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
  document.addEventListener('pointerdown', () => cursor.classList.add('is-down'));
  document.addEventListener('pointerup', () => cursor.classList.remove('is-down'));

  // Збільшення над інтерактивними елементами
  document.addEventListener('pointerover', (e) => {
    const hit = e.target.closest('a, button, [data-cursor]');
    cursor.classList.toggle('is-hover', !!hit);
  });

  // Кільце наздоганяє точку з інерцією
  const tick = () => {
    ringPos.x += (pos.x - ringPos.x) * 0.16;
    ringPos.y += (pos.y - ringPos.y) * 0.16;
    ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
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

  // На телефонах — менше частинок і нижча щільність пікселів
  const pixelRatio = Math.min(window.devicePixelRatio || 1, IS_MOBILE ? 1.5 : 2);
  const COUNT = IS_MOBILE ? 5000 : 16000;
  const DUST = IS_MOBILE ? 150 : 500;

  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.z = 6;

  // Сфера Фібоначчі — рівномірно розподілені точки
  const positions = new Float32Array(COUNT * 3);
  const randoms = new Float32Array(COUNT);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    positions[i * 3] = Math.cos(th) * r;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(th) * r;
    randoms[i] = Math.random();
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

  const accent = getComputedStyle(html).getPropertyValue('--accent').trim() || '#c8ff00';
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uAspect: { value: 1 },
    uHover: { value: 0 },
    uSize: { value: IS_MOBILE ? 22 : 17 },
    uPixelRatio: { value: pixelRatio },
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
  resize();

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
    const r = canvas.getBoundingClientRect();
    mouse.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouse.ty = -(((e.clientY - r.top) / r.height) * 2 - 1);
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

  const frame = () => {
    if (!running) return;
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    uniforms.uTime.value += dt;

    mouse.x += (mouse.tx - mouse.x) * 0.07;
    mouse.y += (mouse.ty - mouse.y) * 0.07;
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
    if (shouldRun && !running) { running = true; clock.getDelta(); frame(); }
    else if (!shouldRun) running = false;
  };

  new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); }).observe(hero);
  document.addEventListener('visibilitychange', update);
  update();
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
}

init();

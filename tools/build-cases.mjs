// Генерує сторінки-кейси work/<slug>/index.html і sitemap.xml.
// Запуск з кореня репозиторію: node tools/build-cases.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { CASES } from './cases-data.mjs';

const SITE = 'https://blessedrbls.github.io/portfolio/';
const V = 2; // кеш-бастинг для case.css — збільшуй при змінах
// main.js спільний із головною: беремо ту саму версію, що й в index.html
const MAIN_V = (readFileSync('index.html', 'utf8').match(/main\.js\?v=(\d+)/) || [])[1] || '1';

// PROJECTS беремо прямо з main.js, щоб не дублювати обкладинки, кольори й посилання
const mainSrc = readFileSync('main.js', 'utf8');
const arr = mainSrc.slice(mainSrc.indexOf('const PROJECTS = [') + 'const PROJECTS = '.length);
const PROJECTS = new Function(`return ${arr.slice(0, arr.indexOf('\n];') + 2)}`)();

// Розмір .webp із заголовка файлу (щоб проставити width/height і не було стрибків верстки)
function webpSize(path) {
  const b = readFileSync(path);
  const type = b.toString('ascii', 12, 16);
  if (type === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (type === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  if (type === 'VP8L') {
    const bits = b.readUInt32LE(21);
    return [1 + (bits & 0x3fff), 1 + ((bits >> 14) & 0x3fff)];
  }
  throw new Error(`Unknown webp: ${path}`);
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const both = (o, tag = 'span') => `<${tag} data-l="uk">${esc(o.uk)}</${tag}><${tag} data-l="en">${esc(o.en)}</${tag}>`;
const pad = (n) => String(n).padStart(2, '0');

const UI = {
  back: { uk: 'Усі роботи', en: 'All work' },
  format: { uk: 'Формат', en: 'Format' },
  formatVal: { uk: 'Демо-проєкт для портфоліо', en: 'Portfolio demo project' },
  role: { uk: 'Роль', en: 'Role' },
  year: { uk: 'Рік', en: 'Year' },
  stack: { uk: 'Стек', en: 'Stack' },
  task: { uk: 'Задача', en: 'The task' },
  flow: { uk: 'Як це працює', en: 'How it works' },
  solution: { uk: 'Що зроблено', en: 'What was built' },
  details: { uk: 'Цікаві рішення', en: 'Under the hood' },
  gallery: { uk: 'Скриншоти', en: 'Screenshots' },
  benefits: { uk: 'Що це дає бізнесу', en: 'What it gives the business' },
  next: { uk: 'Наступний проєкт', en: 'Next project' },
  ctaTitle: { uk: 'Потрібно щось *схоже*?', en: 'Need something *like this*?' },
  ctaText: { uk: 'Напишіть у Telegram — обговоримо задачу й терміни.', en: 'Message me on Telegram and we’ll talk about your task and timeline.' },
  ctaBtn: { uk: 'Написати в Telegram', en: 'Message on Telegram' },
  openTg: { uk: 'Відкрити в Telegram', en: 'Open in Telegram' },
  openSite: { uk: 'Відкрити сайт', en: 'Open the site' },
  openWeb: { uk: 'Веб-демо', en: 'Web demo' },
  code: { uk: 'Код на GitHub', en: 'Code on GitHub' },
  zoom: { uk: 'Збільшити', en: 'Enlarge' },
  close: { uk: 'Закрити', en: 'Close' },
  skip: { uk: 'Перейти до змісту', en: 'Skip to content' },
};
const accentText = (s) => esc(s).replace(/\*(.+?)\*/g, '<span class="accent">$1</span>');

const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19L19 5M19 5H8M19 5v11" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
const back = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>';

function page(c, i) {
  const p = PROJECTS[c.project];
  const next = CASES[(i + 1) % CASES.length];
  const nextP = PROJECTS[next.project];
  const url = `${SITE}work/${c.slug}/`;
  const cover = p.image;
  const [cw, ch] = webpSize(cover);
  const isTg = p.demo && p.demo.startsWith('https://t.me/');
  const web = p.preview?.url && p.preview.url !== p.demo ? p.preview.url : null;

  const links = [
    p.demo && `<a class="case-btn case-btn-primary" href="${esc(p.demo)}" target="_blank" rel="noopener" data-magnetic="0.3" data-goatcounter-click="case-demo-${c.slug}"><span class="magnetic-inner">${both(isTg ? UI.openTg : UI.openSite)}${arrow}</span></a>`,
    web && `<a class="case-btn" href="${esc(web)}" target="_blank" rel="noopener" data-magnetic="0.3" data-goatcounter-click="case-web-${c.slug}"><span class="magnetic-inner">${both(UI.openWeb)}${arrow}</span></a>`,
    p.code && `<a class="case-btn" href="${esc(p.code)}" target="_blank" rel="noopener" data-magnetic="0.3" data-goatcounter-click="case-code-${c.slug}"><span class="magnetic-inner">${both(UI.code)}${arrow}</span></a>`,
  ].filter(Boolean).join('\n          ');

  const gallery = c.gallery.map((g) => `
        <div class="gallery gallery-${g.layout}">${g.items.map(([name, alt]) => {
          const src = `images/cases/${c.slug}/${name}.webp`;
          const [w, h] = webpSize(src);
          return `
          <figure class="shot">
            <button type="button" class="shot-btn" data-zoom="../../${src}" data-w="${w}" data-h="${h}" aria-label="${esc(UI.zoom.uk)}: ${esc(alt.uk)}" data-label-uk="${esc(UI.zoom.uk)}: ${esc(alt.uk)}" data-label-en="${esc(UI.zoom.en)}: ${esc(alt.en)}">
              <img src="../../${src}" width="${w}" height="${h}" alt="${esc(alt.uk)}" data-alt-uk="${esc(alt.uk)}" data-alt-en="${esc(alt.en)}" loading="lazy" decoding="async">
            </button>
            <figcaption class="mono">${both(alt)}</figcaption>
          </figure>`;
        }).join('')}
        </div>`).join('');

  return `<!doctype html>
<html lang="uk" class="no-js" data-page="case" style="--tint: ${p.tint}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(c.title.uk)} — кейс · Олексій</title>
  <meta name="description" content="${esc(c.lead.uk)}">
  <meta name="theme-color" content="#000000">
  <meta name="color-scheme" content="dark">
  <link rel="canonical" href="${url}">
  <link rel="icon" href="../../favicon.svg" type="image/svg+xml">
  <link rel="icon" href="../../favicon-32.png" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="../../apple-touch-icon.png">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Oleksii — portfolio">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(c.title.uk)} — кейс">
  <meta property="og:description" content="${esc(c.lead.uk)}">
  <meta property="og:image" content="${SITE}images/og/${c.slug}.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(c.title.uk)} / ${esc(c.title.en)}">
  <meta property="og:locale" content="uk_UA">
  <meta property="og:locale:alternate" content="en_US">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${SITE}images/og/${c.slug}.jpg">
  <script>
    (function () {
      var d = document.documentElement;
      d.classList.remove('no-js'); d.classList.add('js');
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) d.classList.add('reduced');
      try { if (localStorage.getItem('lang') === 'en') d.lang = 'en'; } catch (e) {}
      // Страховка: якщо скрипти не завантажились — показати перший екран через 3.5 с
      window.__revealFallback = setTimeout(function () { d.classList.add('reveal-fallback'); }, 3500);
    })();
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;900&family=Manrope:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;900&family=Manrope:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"></noscript>
  <link rel="stylesheet" href="../../case.css?v=${V}">
  <script type="importmap">{ "imports": { "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js" } }</script>
  <link rel="modulepreload" href="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js" crossorigin>
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script defer src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
  <script type="module" src="../../main.js?v=${MAIN_V}"></script>
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'CreativeWork',
    name: c.title.en, alternateName: c.title.uk, description: c.lead.en, url,
    image: SITE + cover, dateCreated: c.year, keywords: c.stack.join(', '),
    author: { '@type': 'Person', name: 'Oleksii', url: SITE },
    ...(p.code ? { codeRepository: p.code } : {}),
  })}</script>
  <!-- Статистика відвідувань (GoatCounter: без cookie, ~3 КБ). Кліки рахуються через data-goatcounter-click -->
  <script data-goatcounter="https://blessedrbls.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">${both(UI.skip)}</a>
  <div class="case-glow" aria-hidden="true"></div>
  <div class="cursor" aria-hidden="true">
    <div class="cursor-ring"><span></span></div>
    <div class="cursor-dot"></div>
  </div>
  <div class="scroll-progress" aria-hidden="true"></div>
  <div class="grain" aria-hidden="true"></div>

  <header class="case-header">
    <a class="logo" href="../../" aria-label="oleksii — home">oleksii<span class="accent">*</span></a>
    <a class="back mono" href="../../#work">${back}${both(UI.back)}</a>
    <div class="lang-switch" role="group" aria-label="Language">
      <button type="button" data-lang="uk" aria-pressed="true">UA</button>
      <span aria-hidden="true">/</span>
      <button type="button" data-lang="en" aria-pressed="false">EN</button>
    </div>
  </header>

  <main id="main">
    <section class="case-hero">
      <canvas class="hero-canvas" aria-hidden="true"></canvas>
      <p class="case-kicker mono intro"><span class="tint">${both(p.type)}</span><span>${pad(i + 1)} / ${pad(CASES.length)}</span></p>
      <h1 class="case-title" data-split-case>${both(c.title)}</h1>
      <p class="case-lead intro">${both(c.lead)}</p>
      <div class="case-actions intro">
          ${links}
      </div>
      <dl class="case-meta intro">
        <div><dt class="mono">${both(UI.role)}</dt><dd>${both(c.role)}</dd></div>
        <div><dt class="mono">${both(UI.year)}</dt><dd>${esc(c.year)}</dd></div>
        <div><dt class="mono">${both(UI.format)}</dt><dd>${both(UI.formatVal)}</dd></div>
        <div class="meta-stack"><dt class="mono">${both(UI.stack)}</dt><dd><ul class="tags">${c.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></dd></div>
      </dl>
    </section>

    <figure class="case-cover">
      <img src="../../${esc(cover)}" srcset="../../${esc(cover.replace('.webp', '-1000.webp'))} 1000w, ../../${esc(cover)} 1600w" sizes="(max-width: 1200px) 100vw, 1200px" width="${cw}" height="${ch}" alt="" fetchpriority="high">
    </figure>

    <section class="case-block" id="s-task" aria-labelledby="h-task">
      <h2 class="block-label mono" id="h-task"><span class="num">01</span>${both(UI.task)}</h2>
      <p class="case-statement">${both(c.task)}</p>
    </section>

    <section class="case-block" id="s-flow" aria-labelledby="h-flow">
      <h2 class="block-label mono" id="h-flow"><span class="num">02</span>${both(UI.flow)}</h2>
      <ol class="flow">${c.flow.map((s, k) => `
        <li><span class="flow-bar" aria-hidden="true"></span>${k === c.flow.length - 1 ? '<span class="flow-bar flow-bar--end" aria-hidden="true"></span>' : ''}<span class="flow-num mono">${pad(k + 1)}</span><p>${both(s)}</p></li>`).join('')}
      </ol>
    </section>

    <section class="case-block" id="s-solution" aria-labelledby="h-solution">
      <h2 class="block-label mono" id="h-solution"><span class="num">03</span>${both(UI.solution)}</h2>
      <div class="features">${c.features.map((f) => `
        <div class="feature-col">
          <h3>${both(f.title)}</h3>
          <ul>${f.items.map((it) => `<li>${both(it)}</li>`).join('')}</ul>
        </div>`).join('')}
      </div>
    </section>

    <section class="case-block" id="s-details" aria-labelledby="h-details">
      <h2 class="block-label mono" id="h-details"><span class="num">04</span>${both(UI.details)}</h2>
      <div class="details">${c.details.map((d) => `
        <article class="detail">
          <h3>${both(d.title)}</h3>
          <p>${both(d.text)}</p>
        </article>`).join('')}
      </div>
    </section>

    <section class="case-block case-gallery" id="s-gallery" aria-labelledby="h-gallery">
      <h2 class="block-label mono" id="h-gallery"><span class="num">05</span>${both(UI.gallery)}</h2>${gallery}
    </section>

    <section class="case-block" id="s-benefits" aria-labelledby="h-benefits">
      <h2 class="block-label mono" id="h-benefits"><span class="num">06</span>${both(UI.benefits)}</h2>
      <ul class="benefits">${c.benefits.map((b) => `
        <li><span class="benefit-bar" aria-hidden="true"></span><span class="benefit-bar benefit-bar--end" aria-hidden="true"></span><span class="benefit-text">${both(b)}</span></li>`).join('')}
      </ul>
    </section>

    <a class="case-next" href="../${next.slug}/" style="--next-tint: ${nextP.tint}" data-tint="${nextP.tint}" data-cursor>
      <span class="mono">${both(UI.next)}</span>
      <span class="case-next-title"><span class="case-next-name" data-split-case>${both(next.title)}</span>${arrow}</span>
    </a>

    <section class="case-cta">
      <h2 class="cta-title" data-split-case><span data-l="uk">${accentText(UI.ctaTitle.uk)}</span><span data-l="en">${accentText(UI.ctaTitle.en)}</span></h2>
      <p>${both(UI.ctaText)}</p>
      <a class="case-btn case-btn-primary case-btn-big" href="https://t.me/nonelyyo" target="_blank" rel="noopener" data-magnetic="0.35" data-goatcounter-click="case-telegram-${c.slug}"><span class="magnetic-inner">${both(UI.ctaBtn)}${arrow}</span></a>
    </section>
  </main>

  <footer class="case-footer mono">
    <span>© 2026 <span data-l="uk">Олексій</span><span data-l="en">Oleksii</span></span>
    <a href="https://github.com/blessedrbls" target="_blank" rel="noopener">GitHub</a>
  </footer>

  <dialog class="zoom" aria-label="${esc(UI.zoom.uk)}">
    <button type="button" class="zoom-close" aria-label="${esc(UI.close.uk)}" data-label-uk="${esc(UI.close.uk)}" data-label-en="${esc(UI.close.en)}">×</button>
    <img alt="">
  </dialog>
</body>
</html>
`;
}

CASES.forEach((c, i) => {
  if (!existsSync(PROJECTS[c.project].image)) throw new Error(`No cover for ${c.slug}`);
  mkdirSync(`work/${c.slug}`, { recursive: true });
  writeFileSync(`work/${c.slug}/index.html`, page(c, i));
  console.log(`work/${c.slug}/index.html`);
});

const today = new Date().toISOString().slice(0, 10);
writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>
${CASES.map((c) => `  <url><loc>${SITE}work/${c.slug}/</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>`).join('\n')}
</urlset>
`);
console.log('sitemap.xml');

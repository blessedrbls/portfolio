// Генерує картинки-прев'ю для посилань (Open Graph, 1200×630):
//   og-image.jpg — головна, images/og/<slug>.jpg — кожен кейс.
// Фон — справжня сфера й зорі з сайту (у кольорі проєкту), поверх — текст обома мовами.
//
// Запуск з кореня репозиторію (потрібен Google Chrome):
//   python3 -m http.server 8123 &      # локальний сервер
//   node tools/og-images.mjs            # або: node tools/og-images.mjs http://localhost:8123/
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { CASES } from './cases-data.mjs';

const BASE = process.argv[2] || 'http://localhost:8123/';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const W = 1200, H = 630;

const mainSrc = readFileSync('main.js', 'utf8');
const arr = mainSrc.slice(mainSrc.indexOf('const PROJECTS = [') + 'const PROJECTS = '.length);
const PROJECTS = new Function(`return ${arr.slice(0, arr.indexOf('\n];') + 2)}`)();

const port = 9400 + Math.floor(Math.random() * 90);
const profile = mkdtempSync(path.join(tmpdir(), 'og-'));
const chrome = spawn(CHROME, [`--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--headless=new',
  `--window-size=${W},${H}`, '--no-first-run', '--hide-scrollbars', '--use-angle=metal', '--ignore-gpu-blocklist', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let t; for (let i = 0; i < 50 && !t; i++) { await sleep(200); try { t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === 'page'); } catch {} }
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const pending = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => (await send('Runtime.evaluate', { expression: `(async()=>{${e}})()`, awaitPromise: true, returnByValue: true })).result?.result?.value;
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const accent = (s) => esc(s).replace(/(\S)-(\S)/g, '$1\u2011$2').replace(/\*(.+?)\*/g, '<span style="color:var(--og-accent)">$1</span>');

// Шар із текстом поверх сфери
function overlay({ kicker, title, sub, tags = [], tint }) {
  return `
  <style>
    html, body { overflow: hidden !important; }
    body > *:not(.hero-canvas):not(#og) { visibility: hidden !important; }
    .hero-canvas { visibility: visible !important; }
    #og { --og-accent: ${tint}; position: fixed; inset: 0; z-index: 9999; pointer-events: none;
      padding: 64px 72px; display: flex; flex-direction: column; color: #f1f0ea; font-family: 'Manrope', sans-serif;
      background: radial-gradient(60% 80% at 0% 100%, rgba(0,0,0,.85), transparent 70%); }
    #og .k { font-family: 'JetBrains Mono', monospace; font-size: 20px; letter-spacing: .12em; text-transform: uppercase; color: #8b8b94; }
    #og .k b { color: var(--og-accent); font-weight: 500; }
    #og h1 { margin: 18px 0 0; font-family: 'Unbounded', sans-serif; font-weight: 600; font-size: ${title.length > 26 ? 60 : 72}px;
      line-height: 1.04; letter-spacing: -.045em; max-width: 13.5em; text-wrap: balance; }
    #og .s { margin-top: 18px; font-size: 28px; color: #c9c8c2; max-width: 30em; }
    #og .row { display: flex; align-items: center; justify-content: space-between; margin-top: 40px; }
    #og .tags { display: flex; gap: 10px; }
    #og .tags span { padding: 7px 14px; border: 1px solid rgba(241,240,234,.18); border-radius: 999px;
      font-family: 'JetBrains Mono', monospace; font-size: 17px; color: #c9c8c2; background: rgba(0,0,0,.35); }
    #og .url { font-family: 'JetBrains Mono', monospace; font-size: 19px; color: #8b8b94; }
    #og .logo { font-family: 'Unbounded', sans-serif; font-weight: 600; font-size: 30px; letter-spacing: -.03em; color: #f1f0ea; }
    #og .logo i { font-style: normal; color: #a374ff; }
  </style>
  <div id="og">
    <span class="logo">oleksii<i>*</i></span>
    <span class="k" style="margin-top:auto">${kicker}</span>
    <h1>${accent(title)}</h1>
    <p class="s">${esc(sub)}</p>
    <div class="row">${tags.length ? `<div class="tags">${tags.map((x) => `<span>${esc(x)}</span>`).join('')}</div>` : '<span></span>'}<span class="url">blessedrbls.github.io/portfolio</span></div>
  </div>`;
}

async function render(url, html, out) {
  await send('Page.navigate', { url });
  await sleep(4200); // прелоадер / поява сфери
  await ev(`document.fonts && await document.fonts.ready; window.scrollTo(0, 0); document.body.insertAdjacentHTML('beforeend', ${JSON.stringify(html)}); await new Promise(r => setTimeout(r, 900)); return 1`);
  const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 88 });
  writeFileSync(out, Buffer.from(s.result.data, 'base64'));
  console.log(out);
}

await render(BASE, overlay({
  kicker: 'Олексій · веб-розробник', title: 'Сайти та *Telegram-боти* для бізнесу',
  sub: 'Websites & Telegram bots for business', tint: '#a374ff',
  tags: ['Сайти / Websites', 'Telegram-боти', 'Mini Apps'],
}), 'og-image.jpg');

mkdirSync('images/og', { recursive: true });
for (const c of CASES) {
  const p = PROJECTS[c.project];
  await render(`${BASE}work/${c.slug}/`, overlay({
    kicker: `<b>${esc(p.type.uk)}</b> · кейс / case study`, title: c.title.uk, sub: c.title.en,
    tags: c.stack.slice(0, 4), tint: p.tint,
  }), `images/og/${c.slug}.jpg`);
}

ws.close(); chrome.kill(); process.exit(0);

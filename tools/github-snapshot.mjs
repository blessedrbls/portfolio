// Оновлює запасний знімок активності GitHub (data/github-contributions.json).
// Сайт бере дані наживо; знімок показується, лише якщо сервіс з даними не відповів.
// Запуск з кореня репозиторію: node tools/github-snapshot.mjs
import { writeFileSync } from 'node:fs';

const USER = 'blessedrbls';
const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`);
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const data = await res.json();
writeFileSync('data/github-contributions.json', JSON.stringify(data));
console.log(`data/github-contributions.json: ${data.total?.lastYear} contributions, ${data.contributions.length} days`);

// Дані сторінок-кейсів. Після змін: node tools/build-cases.mjs
// Кожен текст — { uk, en }. Метрик не вигадуємо: проєкти демонстраційні.

export const CASES = [
  {
    slug: 'coffee-miniapp',
    project: 0, // індекс у PROJECTS (main.js) — звідти обкладинка, колір, посилання
    year: '2026',
    title: { uk: "Telegram Mini App для кав'ярні", en: 'Coffee shop Telegram Mini App' },
    lead: {
      uk: 'Меню, кошик і замовлення на самовивіз прямо в Telegram — без окремого застосунку та дзвінків. Бариста отримує замовлення в бот і змінює статус одним дотиком.',
      en: 'Menu, cart and pickup orders right inside Telegram, with no separate app and no phone calls. The barista gets each order in a bot and updates its status with one tap.',
    },
    role: { uk: 'Дизайн, Mini App, бот', en: 'Design, Mini App, bot' },
    stack: ['HTML', 'CSS', 'JavaScript', 'Telegram Web Apps API', 'Python', 'aiogram 3', 'SQLite', 'GitHub Pages'],
    task: {
      uk: "Кав'ярні потрібен простий спосіб приймати замовлення на самовивіз: щоб гість зібрав замовлення за хвилину там, де він і так проводить час, а бариста одразу бачив, що готувати, і не губив замовлення в переписках.",
      en: 'A coffee shop needs a simple way to take pickup orders: guests should be able to order in a minute in an app they already use, and the barista should see right away what to make without losing orders in chats.',
    },
    flow: [
      { uk: 'Гість натискає «Відкрити меню» в боті — Mini App відкривається всередині Telegram.', en: 'The guest taps “Open menu” in the bot and the Mini App opens inside Telegram.' },
      { uk: 'Обирає напої й десерти, перевіряє кошик, вказує ім’я, телефон і час самовивозу.', en: 'They pick drinks and desserts, review the cart and enter a name, phone number and pickup time.' },
      { uk: 'Бот перевіряє кожне поле й сам перераховує суму за власним прайсом.', en: 'The bot validates every field and recalculates the total from its own price list.' },
      { uk: 'Бариста отримує картку замовлення з кнопками «Прийнято / Готово / Скасовано», а гість — сповіщення про кожен статус.', en: 'The barista gets an order card with Accepted / Ready / Cancelled buttons, and the guest is notified about every status.' },
    ],
    features: [
      { title: { uk: 'Для гостя', en: 'For guests' }, items: [
        { uk: 'Категорії, фото товарів, кнопки +/− і кошик, що зберігається між сесіями', en: 'Categories, product photos, +/− buttons and a cart that survives between sessions' },
        { uk: 'Кольори теми Telegram, світлий і темний режим', en: 'Telegram theme colours, light and dark mode' },
        { uk: 'Нативні MainButton і BackButton, вібровідгук при додаванні в кошик', en: 'Native MainButton and BackButton, haptic feedback when adding to cart' },
        { uk: 'Українська та англійська — за мовою Telegram', en: 'Ukrainian and English, picked from the Telegram language' },
      ] },
      { title: { uk: 'Для кав’ярні', en: 'For the coffee shop' }, items: [
        { uk: 'Картка замовлення з кнопками статусів, зручна для кількох адміністраторів', en: 'Order cards with status buttons, safe for several admins' },
        { uk: 'Слоти самовивозу за годинами роботи', en: 'Pickup time slots based on opening hours' },
        { uk: 'Замовлення в SQLite — кнопки працюють і після перезапуску', en: 'Orders stored in SQLite, so buttons keep working after a restart' },
      ] },
    ],
    details: [
      { title: { uk: 'Ціни не беруться з телефона', en: 'Prices never come from the phone' },
        text: { uk: 'Mini App надсилає лише id товарів і кількість. Суму рахує бот за своїм прайсом і позначає замовлення, де вона не збіглася — підробити ціну не вийде.', en: 'The Mini App only sends product ids and quantities. The bot calculates the total from its own price list and flags orders where it does not match, so prices cannot be tampered with.' } },
      { title: { uk: 'Відчувається як частина Telegram', en: 'Feels like part of Telegram' },
        text: { uk: 'Тема, кнопки й вібрація беруться з Telegram, тому застосунок не виглядає «вбудованим сайтом».', en: 'Theme, buttons and haptics come from Telegram itself, so the app does not feel like an embedded website.' } },
      { title: { uk: 'Демо-режим у браузері', en: 'Demo mode in the browser' },
        text: { uk: 'Поза Telegram з’являються власні кнопки, перемикачі мови й теми — проєкт можна показати будь-кому за посиланням.', en: 'Outside Telegram it shows its own buttons plus language and theme toggles, so anyone can try it from a link.' } },
    ],
    benefits: [
      { uk: 'Замовлення без черги й дзвінків — гостю нічого не треба встановлювати', en: 'Orders without queues or calls, and guests install nothing' },
      { uk: 'Бариста керує всіма замовленнями з телефона', en: 'The barista handles every order from a phone' },
      { uk: 'Захист від помилок і підробки суми замовлення', en: 'Protection from mistakes and tampered totals' },
    ],
    gallery: [
      { layout: 'phones', items: [
        ['menu', { uk: 'Меню з категоріями', en: 'Menu with categories' }],
        ['products', { uk: 'Список товарів з кнопками +/−', en: 'Product list with +/− buttons' }],
        ['cart', { uk: 'Кошик із сумою', en: 'Cart with total' }],
        ['checkout', { uk: 'Оформлення замовлення', en: 'Checkout form' }],
        ['confirm', { uk: 'Перевірка перед відправкою', en: 'Order review before sending' }],
        ['dark-theme', { uk: 'Темна тема', en: 'Dark theme' }],
      ] },
    ],
  },

  {
    slug: 'booking-bot',
    project: 1,
    year: '2026',
    title: { uk: 'Бот онлайн-запису в барбершоп', en: 'Barbershop booking bot' },
    lead: {
      uk: 'Клієнт записується до майстра за кілька дотиків і бачить лише реально вільний час. Власник керує розкладом прямо з Telegram — без сайту й окремої програми.',
      en: 'Clients book a barber in a few taps and only ever see time that is really free. The owner manages the schedule right from Telegram, with no website or separate app.',
    },
    role: { uk: 'Логіка, розробка бота', en: 'Logic and bot development' },
    stack: ['Python', 'aiogram 3', 'SQLite', 'aiosqlite', 'APScheduler', 'zoneinfo'],
    task: {
      uk: 'Барбершопу потрібно, щоб клієнти записувались самі будь-коли, без дзвінків і переписок, у майстрів не було накладок, а клієнти не забували про візит.',
      en: 'A barbershop wants clients to book on their own at any time, without calls or chats, with no double bookings for barbers and fewer forgotten visits.',
    },
    flow: [
      { uk: 'Клієнт обирає філію, послугу з ціною й тривалістю, майстра (картки з фото) і дату.', en: 'The client picks a location, a service with price and duration, a barber (photo cards) and a date.' },
      { uk: 'Бот показує тільки вільні 30-хвилинні слоти з урахуванням тривалості послуги та вихідних.', en: 'The bot shows only free 30-minute slots, taking service length and days off into account.' },
      { uk: 'Після підтвердження адміни отримують сповіщення, а боту плануються нагадування.', en: 'After confirmation the admins are notified and reminders are scheduled.' },
      { uk: 'За 24 і 2 години — нагадування з кнопками «Прийду / Скасувати», після візиту — оцінка.', en: 'Reminders arrive 24 h and 2 h before with “I’ll come / Cancel” buttons, and a rating request follows the visit.' },
    ],
    features: [
      { title: { uk: 'Для клієнта', en: 'For clients' }, items: [
        { uk: 'Запис в одному повідомленні з кнопками «Назад» і «Скасувати» на кожному кроці', en: 'Booking in a single message with Back and Cancel on every step' },
        { uk: '«Мої записи» зі скасуванням і підтвердженням', en: '“My bookings” with cancel and confirmation' },
        { uk: 'Адреси, години роботи й кнопка Google Maps для кожної філії', en: 'Addresses, opening hours and a Google Maps button for each location' },
        { uk: 'Англійська та українська, мову можна змінити будь-коли', en: 'English and Ukrainian, switchable at any time' },
      ] },
      { title: { uk: 'Для власника', en: 'For the owner' }, items: [
        { uk: 'Миттєві сповіщення про записи, скасування й негативні відгуки', en: 'Instant notifications about bookings, cancellations and negative feedback' },
        { uk: 'Адмін-панель: записи на будь-яку дату з лічильником по днях', en: 'Admin panel: bookings for any date with a per-day counter' },
        { uk: 'Вихідний для майстра одним дотиком', en: 'A day off for a barber in one tap' },
        { uk: 'Автозавершення візиту, якщо адмін забув його відмітити', en: 'Visits are auto-completed if the admin forgets to mark them' },
      ] },
    ],
    details: [
      { title: { uk: 'Жодних подвійних записів', en: 'No double bookings' },
        text: { uk: 'Запис іде в транзакції бази даних: двоє клієнтів не займуть один слот, навіть якщо натиснуть «Підтвердити» в ту саму секунду.', en: 'Bookings run inside a database transaction, so two clients can never take the same slot, even if they confirm in the same second.' } },
      { title: { uk: 'Чесні вільні слоти', en: 'Honest free slots' },
        text: { uk: 'Слот показується, лише якщо послуга встигає закінчитись до кінця зміни, він не в минулому, не перетинається з іншими записами й не припадає на вихідний.', en: 'A slot appears only if the service ends before the shift does, it is not in the past, it does not overlap other bookings and it is not a day off.' } },
      { title: { uk: 'Переживає перезапуск', en: 'Survives restarts' },
        text: { uk: 'Нагадування й запити оцінки відновлюються з бази при старті, а пропущені під час простою — надсилаються одразу.', en: 'Reminders and rating requests are restored from the database on start, and anything missed while offline is sent right away.' } },
      { title: { uk: 'Відгуки туди, де вони потрібні', en: 'Reviews where they matter' },
        text: { uk: 'Оцінка 4–5★ веде на Google Maps, 1–3★ — бот питає, що пішло не так, і пересилає це адмінам.', en: 'A 4–5★ rating leads to Google Maps; for 1–3★ the bot asks what went wrong and forwards it to the admins.' } },
    ],
    benefits: [
      { uk: 'Запис 24/7 без адміністратора на телефоні', en: '24/7 booking with nobody on the phone' },
      { uk: 'Нагадування з кнопками допомагають не втрачати візити', en: 'Reminders with buttons help avoid missed visits' },
      { uk: 'Задоволені клієнти йдуть по відгук на Google Maps, невдоволені — пишуть власнику', en: 'Happy clients are sent to Google Maps; unhappy ones talk to the owner' },
    ],
    gallery: [
      { layout: 'chats', items: [
        ['main-menu', { uk: 'Головне меню', en: 'Main menu' }],
        ['master', { uk: 'Вибір майстра', en: 'Choosing a barber' }],
        ['time', { uk: 'Вільний час', en: 'Free time slots' }],
        ['confirm', { uk: 'Підтвердження запису', en: 'Booking confirmation' }],
        ['reminder', { uk: 'Нагадування', en: 'Reminder' }],
        ['rating', { uk: 'Оцінка після візиту', en: 'Rating after the visit' }],
        ['admin', { uk: 'Адмін: активний запис', en: 'Admin: active booking' }],
        ['admin-done', { uk: 'Адмін: завершений запис з оцінкою', en: 'Admin: completed booking with rating' }],
      ] },
    ],
  },

  {
    slug: 'barbershop-site',
    project: 2,
    year: '2026',
    title: { uk: 'Сайт барбершопу', en: 'Barbershop website' },
    lead: {
      uk: 'Сайт, що не лише презентує барбершоп, а й записує клієнтів: показує вільний час кожного майстра, не допускає подвійних бронювань і надсилає заявки адмінам у Telegram.',
      en: 'A website that does more than present a barbershop: it books clients, shows each barber’s free time, prevents double bookings and sends requests to the admins in Telegram.',
    },
    role: { uk: 'Дизайн, верстка, бекенд', en: 'Design, front end, back end' },
    stack: ['HTML', 'CSS', 'JavaScript', 'Cloudflare Workers', 'Cloudflare D1', 'Telegram Bot API'],
    task: {
      uk: 'Барбершопу з двома філіями потрібен сайт, який за кілька секунд передає атмосферу, показує послуги, ціни й майстрів — і дає записатися, не дзвонячи, з гарантією, що обраний час справді вільний.',
      en: 'A barbershop with two locations needs a site that conveys its atmosphere in seconds, shows services, prices and barbers, and lets people book without calling, knowing the chosen time is really free.',
    },
    flow: [
      { uk: 'Клієнт обирає послугу, майстра (або «будь-який»), філію, день на 2 тижні вперед і вільну годину.', en: 'The client picks a service, a barber (or “any”), a location, a day up to two weeks ahead and a free hour.' },
      { uk: 'Cloudflare Worker перевіряє дані й зберігає запис у базі D1.', en: 'A Cloudflare Worker validates the data and stores the booking in a D1 database.' },
      { uk: 'Заявка миттєво приходить у Telegram-групу адмінів з кнопками ✅ Підтвердити / ❌ Скасувати.', en: 'The request lands instantly in the admins’ Telegram group with ✅ Confirm / ❌ Cancel buttons.' },
      { uk: 'Скасування в Telegram одразу звільняє час на сайті.', en: 'Cancelling in Telegram frees the time on the site right away.' },
    ],
    features: [
      { title: { uk: 'Сайт', en: 'Website' }, items: [
        { uk: 'Темний дизайн із золотим акцентом, анімації появи при скролі', en: 'Dark design with a gold accent and scroll fade-ins' },
        { uk: 'Послуги й ціни, команда майстрів, галерея з лайтбоксом, відгуки', en: 'Services and prices, the team, a gallery with a lightbox, reviews' },
        { uk: 'Карта, що перемикається між двома філіями', en: 'A map that switches between the two locations' },
        { uk: 'Українська й англійська, адаптив під телефон, планшет і ПК', en: 'Ukrainian and English, responsive for phone, tablet and desktop' },
      ] },
      { title: { uk: 'Онлайн-запис', en: 'Online booking' }, items: [
        { uk: 'Слоти з урахуванням годин роботи, тривалості послуги й київського часу', en: 'Slots follow opening hours, service length and Kyiv time' },
        { uk: '«Будь-який майстер» призначає найменш завантаженого', en: '“Any barber” assigns the least busy one' },
        { uk: 'Кнопки підтвердження й скасування прямо в Telegram', en: 'Confirm and cancel buttons right in Telegram' },
      ] },
    ],
    details: [
      { title: { uk: 'Подвійний запис неможливий', en: 'Double booking is impossible' },
        text: { uk: 'Унікальність слота гарантує сама база D1: двоє людей не займуть одного майстра на той самий час, навіть натиснувши кнопку одночасно.', en: 'The D1 database itself guarantees each slot is unique, so two people cannot book the same barber at the same time, even if they press the button together.' } },
      { title: { uk: 'Токен бота не потрапляє на сайт', en: 'The bot token never reaches the site' },
        text: { uk: 'Сайт говорить лише з Worker-ом; токен і чат зберігаються як секрети на сервері. Worker приймає запити тільки з дозволених адрес і перевіряє кожне поле.', en: 'The site only talks to the Worker; the token and chat id live as server-side secrets. The Worker accepts requests only from allowed origins and validates every field.' } },
      { title: { uk: 'Без серверів і збірки', en: 'No servers, no build step' },
        text: { uk: 'Статичний сайт на GitHub Pages плюс безсерверний Worker — хостинг майже нічого не коштує й не потребує підтримки.', en: 'A static site on GitHub Pages plus a serverless Worker: hosting costs next to nothing and needs no maintenance.' } },
    ],
    benefits: [
      { uk: 'Клієнти записуються самі в будь-який час', en: 'Clients book themselves at any time' },
      { uk: 'Адміністратор підтверджує записи в Telegram, не відкриваючи жодних панелей', en: 'The admin confirms bookings in Telegram without opening any dashboard' },
      { uk: 'Накладки в розкладі виключені технічно', en: 'Schedule clashes are ruled out technically' },
    ],
    gallery: [
      { layout: 'wide', items: [
        ['desktop', { uk: 'Головний екран', en: 'Hero section' }],
        ['booking', { uk: 'Запис: лише вільні години майстра', en: 'Booking: only the barber’s free hours' }],
      ] },
      { layout: 'phones', items: [
        ['mobile', { uk: 'Головний екран на телефоні', en: 'Hero on a phone' }],
        ['mobile-booking', { uk: 'Запис на телефоні', en: 'Booking on a phone' }],
      ] },
    ],
  },

  {
    slug: 'landing-course',
    project: 3,
    year: '2026',
    title: { uk: 'Лендінг онлайн-курсу', en: 'Online course landing page' },
    lead: {
      uk: 'Лендінг курсу «Python з нуля за 8 тижнів», який веде відвідувача від першого екрана до заявки: програма, тарифи, відгуки, FAQ і відлік до старту.',
      en: 'A landing page for the “Python from scratch in 8 weeks” course that takes visitors from the first screen to sign-up: curriculum, pricing, reviews, FAQ and a countdown to the start.',
    },
    role: { uk: 'Дизайн і розробка', en: 'Design and development' },
    stack: ['HTML', 'CSS', 'JavaScript', 'IntersectionObserver'],
    task: {
      uk: 'Онлайн-школі потрібна сторінка, яка швидко пояснює, для кого курс і що буде на кожному тижні, знімає сумніви й підводить до вибору тарифу та заявки.',
      en: 'An online school needs a page that quickly explains who the course is for and what each week covers, answers doubts and leads to choosing a plan and signing up.',
    },
    flow: [
      { uk: 'Перший екран: обіцянка, дата старту, таймер і соціальний доказ.', en: 'First screen: the promise, start date, countdown and social proof.' },
      { uk: 'Для кого курс, як проходить навчання і програма на 8 тижнів.', en: 'Who it is for, how learning works and the 8-week curriculum.' },
      { uk: 'Викладач, проєкти студентів, тарифи з оплатою повністю або двома частинами.', en: 'The instructor, student projects, and plans payable in full or in two parts.' },
      { uk: 'Відгуки, FAQ і форма заявки, де тариф уже обрано.', en: 'Reviews, FAQ and a sign-up form with the plan already selected.' },
    ],
    features: [
      { title: { uk: 'Що на сторінці', en: 'What’s on the page' }, items: [
        { uk: 'Таймер до старту — дата задається однією змінною', en: 'A countdown whose date is set by a single variable' },
        { uk: 'Акордеони програми й FAQ, доступні з клавіатури', en: 'Curriculum and FAQ accordions, keyboard accessible' },
        { uk: 'Три тарифи з виділеним популярним; кнопка обирає тариф у формі', en: 'Three plans with the popular one highlighted; the button pre-selects it in the form' },
        { uk: 'Форма з перевіркою полів і локалізованими помилками', en: 'A form with field validation and localised errors' },
      ] },
      { title: { uk: 'Деталі', en: 'Details' }, items: [
        { uk: 'Код, що друкується сам, лічильники, прогрес читання', en: 'Self-typing code, count-up stats, reading progress' },
        { uk: 'Анімований фон «північне сяйво», скляні картки, bento-сітка', en: 'Animated aurora background, frosted-glass cards, a bento grid' },
        { uk: 'Англійська й українська, вибір запам’ятовується', en: 'English and Ukrainian, with the choice remembered' },
      ] },
    ],
    details: [
      { title: { uk: 'Чистий HTML, CSS і JS', en: 'Plain HTML, CSS and JS' },
        text: { uk: 'Без фреймворків і збірки: сторінка легка, швидко відкривається й розміщується будь-де.', en: 'No frameworks and no build step: the page is light, loads fast and can be hosted anywhere.' } },
      { title: { uk: 'Доступність', en: 'Accessibility' },
        text: { uk: 'Акордеони з aria-expanded і aria-controls, анімації вимикаються для тих, хто обрав «менше руху».', en: 'Accordions use aria-expanded and aria-controls, and animations switch off for people who prefer reduced motion.' } },
      { title: { uk: 'Легко редагувати', en: 'Easy to edit' },
        text: { uk: 'Усі тексти обома мовами в одному словнику, дата старту — в одній змінній, а форму просто під’єднати до Telegram чи CRM.', en: 'All texts in both languages live in one dictionary, the start date in one variable, and the form is easy to connect to Telegram or a CRM.' } },
    ],
    benefits: [
      { uk: 'Сторінка, що веде до заявки, а не просто розповідає про курс', en: 'A page that leads to sign-up instead of just describing the course' },
      { uk: 'Таймер і тарифи підштовхують до рішення', en: 'The countdown and plans nudge visitors to decide' },
      { uk: 'Тексти й дати оновлюються без розробника', en: 'Texts and dates can be updated without a developer' },
    ],
    gallery: [
      { layout: 'wide', items: [
        ['desktop-top', { uk: 'Перший екран', en: 'First screen' }],
        ['desktop-program', { uk: 'Програма на 8 тижнів', en: '8-week curriculum' }],
        ['desktop-pricing', { uk: 'Тарифи', en: 'Pricing' }],
      ] },
      { layout: 'phones', items: [
        ['mobile-top', { uk: 'Перший екран на телефоні', en: 'First screen on a phone' }],
        ['mobile-pricing', { uk: 'Тарифи на телефоні', en: 'Pricing on a phone' }],
      ] },
    ],
  },

  {
    slug: 'shop-bot',
    project: 4,
    year: '2026',
    title: { uk: 'Бот-магазин', en: 'Telegram shop bot' },
    lead: {
      uk: 'Магазин усередині Telegram: каталог, кошик і оформлення замовлення для клієнтів, а для власника — товари, статуси, статистика й розсилки без окремого сайту.',
      en: 'A shop inside Telegram: catalogue, cart and checkout for customers, plus products, order statuses, stats and broadcasts for the owner, with no separate website.',
    },
    role: { uk: 'Логіка, розробка бота', en: 'Logic and bot development' },
    stack: ['Python', 'aiogram 3', 'SQLite', 'aiosqlite', 'FSM'],
    task: {
      uk: 'Невеликому магазину потрібно приймати замовлення там, де клієнти вже спілкуються, і керувати товарами та замовленнями з телефона — без сайту й складної адмінки.',
      en: 'A small shop needs to take orders where its customers already chat, and manage products and orders from a phone, without a website or a complex dashboard.',
    },
    flow: [
      { uk: 'Клієнт обирає мову, відкриває каталог: категорії → картка товару з фото, описом і ціною.', en: 'The customer picks a language and opens the catalogue: categories → product card with photo, description and price.' },
      { uk: 'Обирає кількість кнопками ➕/➖ прямо на картці й додає в кошик.', en: 'They choose a quantity with ➕/➖ right on the card and add it to the cart.' },
      { uk: 'Оформлення: ім’я → телефон (однією кнопкою) → адреса → коментар → підтвердження.', en: 'Checkout: name → phone (one tap) → address → comment → confirmation.' },
      { uk: 'Власник отримує замовлення з кнопками статусів, клієнт — сповіщення про кожну зміну.', en: 'The owner receives the order with status buttons, and the customer is notified about every change.' },
    ],
    features: [
      { title: { uk: 'Для клієнта', en: 'For customers' }, items: [
        { uk: 'Каталог із фото, кошик зі зміною кількості та сумою', en: 'Catalogue with photos, a cart with quantity controls and a total' },
        { uk: 'Телефон одним дотиком кнопкою «Поділитися номером»', en: 'Phone number in one tap with “Share phone number”' },
        { uk: '«Мої замовлення» з актуальними статусами', en: '“My orders” with live statuses' },
        { uk: '/cancel виходить з будь-якого кроку', en: '/cancel exits any step' },
      ] },
      { title: { uk: 'Для власника', en: 'For the owner' }, items: [
        { uk: 'Статуси одним дотиком: прийнято, відправлено, доставлено, скасовано', en: 'Statuses in one tap: accepted, shipped, delivered, cancelled' },
        { uk: 'Додавання й видалення товарів з фото прямо в боті', en: 'Add and delete products with photos right in the bot' },
        { uk: 'Статистика: користувачі, замовлення, виручка', en: 'Stats: users, orders, revenue' },
        { uk: 'Розсилка будь-якого повідомлення всім клієнтам', en: 'Broadcast any message to all customers' },
      ] },
    ],
    details: [
      { title: { uk: 'Діалоги на скінченному автоматі', en: 'Dialogs on a state machine' },
        text: { uk: 'Оформлення замовлення, додавання товару й розсилка побудовані на FSM aiogram: бот завжди знає, на якому кроці людина, і коректно обробляє «назад» та скасування.', en: 'Checkout, adding products and broadcasts are built on aiogram’s FSM, so the bot always knows which step a person is on and handles going back or cancelling correctly.' } },
      { title: { uk: 'Готовий до запуску', en: 'Ready to launch' },
        text: { uk: 'При першому старті база створюється сама й наповнюється демо-каталогом: 3 категорії по 3 товари.', en: 'On first start the database creates itself and fills in a demo catalogue: 3 categories with 3 products each.' } },
      { title: { uk: 'Кожен — своєю мовою', en: 'Everyone in their language' },
        text: { uk: 'Мова зберігається для кожного клієнта, тож і сповіщення про статуси приходять англійською чи українською.', en: 'The language is stored per customer, so status notifications also arrive in English or Ukrainian.' } },
    ],
    benefits: [
      { uk: 'Продажі там, де клієнти вже проводять час', en: 'Sales where customers already spend their time' },
      { uk: 'Власник веде весь магазин з телефона', en: 'The owner runs the whole shop from a phone' },
      { uk: 'Розсилки допомагають повертати клієнтів', en: 'Broadcasts help bring customers back' },
    ],
    gallery: [
      { layout: 'chats', items: [
        ['menu', { uk: 'Привітання й головне меню', en: 'Welcome message and main menu' }],
        ['catalog', { uk: 'Категорії каталогу', en: 'Catalogue categories' }],
        ['product', { uk: 'Картка товару з вибором кількості', en: 'Product card with quantity selector' }],
        ['cart', { uk: 'Кошик', en: 'Cart' }],
        ['checkout', { uk: 'Оформлення замовлення', en: 'Checkout' }],
        ['admin-order', { uk: 'Адмін: нове замовлення', en: 'Admin: new order' }],
        ['admin-panel', { uk: 'Адмін-панель', en: 'Admin panel' }],
      ] },
    ],
  },
];

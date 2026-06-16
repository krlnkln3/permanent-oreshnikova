/* ===== Перманент от Алёны Орешниковой — логика каталога услуг ===== */
(function () {
  'use strict';

  // --- Data ---
  const CATEGORIES = [
    { id: 'brows', name: 'Брови', icon: '🪶' },
    { id: 'lips', name: 'Губы', icon: '💋' },
    { id: 'head', name: 'Голова', icon: '🧑‍🦲' },
    { id: 'any', name: 'Выбрать зону', icon: '🎯' },
  ];

  // price — стоимость процедуры, ₽
  const PRODUCTS = [
    { id: 1, name: 'Перманент бровей в технике «окрашивание»', cat: 'brows', glyph: '🌫️', image: 'images/brows-1.jpg', price: 8000, old: 10000, rating: 5.0, reviews: 93, badge: 'Хит', new: false },
    { id: 2, name: 'Трихопигментация', cat: 'head', glyph: '🪶', image: 'images/head-1.jpg', price: 10000, from: true, old: null, rating: 4.9, reviews: 50, badge: null, new: true },
    { id: 5, name: 'Натуральный перманент губ', cat: 'lips', glyph: '💋', image: 'images/lips-1.jpg', price: 9000, from: true, old: null, rating: 5.0, reviews: 120, badge: 'Хит', new: false },
    { id: 6, name: 'Коррекция', cat: 'any', glyph: '💄', image: 'images/correction-1.jpg', price: 5000, from: true, old: null, rating: 4.8, reviews: 30, badge: null, new: false },
  ];

  const DESCRIPTIONS = {
    brows: 'Натуральный перманентный макияж в технике окрашивания. Тот самый естественный результат. Никто никогда не поймёт, что это перманент.',
    lips: 'Ровный контур и здоровый цвет губ без помады. Безопасные пигменты, деликатная техника и аккуратное заживление. Подбираем оттенок под ваш цветотип.',
    head: 'Трихопигментация кожи головы — визуальное восстановление густоты волос. Имитация волосяных фолликулов, маскировка залысин и зон поредения. Гипоаллергенные пигменты и стерильные материалы.',
    any: 'Коррекция результата для любой зоны — брови, губы или голова. Закрепляем форму и насыщенность цвета после заживления. Зону уточним при записи.',
  };

  // Палитра оттенков пигментов
  const PALETTE = [
    { group: 'Губы', shades: [
      { name: 'UMBRA', color: '#AB675A' },
      { name: 'MOONWALK', color: '#A16076' },
      { name: 'LUMIA', color: '#B7807B' },
      { name: 'SUN GLOW', color: '#D79684' },
      { name: 'SATELLITE', color: '#AF585E' },
      { name: 'MILKY WAY', color: '#B05773' },
      { name: 'ORBITAL', color: '#BD6D70' },
      { name: 'POLAR RAY', color: '#C37688' },
      { name: 'STARDUST', color: '#D89992' },
      { name: 'SWEET LIPS', color: '#722420', info: {
        desc: [
          'Нежный карамельно-розовый оттенок с тёплым свечением.',
          'После заживления выглядит как естественный розовый цвет здоровых губ.',
        ],
        suitable: [
          'светлых и средних фототипов кожи',
          'блондинок и русоволосых девушек',
          'любительниц максимально натурального результата',
        ],
        photos: [
          { src: 'images/sweet-lips-1.jpg', label: 'Блондинка' },
          { src: 'images/sweet-lips-2.jpg', label: 'Брюнетка' },
          { src: 'images/sweet-lips-3.jpg', label: 'Рыжеволосая' },
          { src: 'images/sweet-lips-4.jpg', label: 'Русоволосая' },
        ],
      }},
      { name: 'HONEY BUNNY', color: '#761818', info: {
        desc: [
          'Тёплый медово-коралловый оттенок с лёгким оранжевым подтоном.',
          'После заживления превращается в мягкий персиково-розовый цвет с тёплым сиянием.',
        ],
        suitable: [
          'тёплых цветотипов',
          'золотистых блондинок',
          'девушек с тёплым подтоном кожи',
        ],
        photos: [
          { src: 'images/honey-bunny-1.jpg', label: 'Блондинка' },
          { src: 'images/honey-bunny-2.jpg', label: 'Брюнетка' },
          { src: 'images/honey-bunny-3.jpg', label: 'Рыжеволосая' },
          { src: 'images/honey-bunny-4.jpg', label: 'Русоволосая' },
        ],
      }},
      { name: 'SCARLET SUNSET', color: '#930F1D', info: {
        desc: [
          'Выразительный красный оттенок с благородным нейтральным подтоном.',
          'После заживления приобретает элегантную ягодно-красную мягкость без излишней яркости.',
        ],
        suitable: [
          'контрастной внешности',
          'брюнеток',
          'девушек, которые любят заметный, но благородный результат',
        ],
        photos: [
          { src: 'images/scarlet-sunset-1.jpg', label: 'Блондинка' },
          { src: 'images/scarlet-sunset-2.jpg', label: 'Брюнетка' },
          { src: 'images/scarlet-sunset-3.jpg', label: 'Рыжеволосая' },
          { src: 'images/scarlet-sunset-4.jpg', label: 'Русоволосая' },
        ],
      }},
      { name: 'DIVINE WINE', color: '#641B26', info: {
        desc: [
          'Глубокий рубиново-винный оттенок с тёплым акцентом.',
          'После заживления становится мягким винно-розовым цветом с эффектом дорогой помады.',
        ],
        suitable: [
          'средних и тёмных фототипов',
          'выразительной внешности',
          'клиенток, предпочитающих насыщенные оттенки',
        ],
        photos: [
          { src: 'images/divine-wine-1.jpg', label: 'Блондинка' },
          { src: 'images/divine-wine-2.jpg', label: 'Брюнетка' },
          { src: 'images/divine-wine-3.jpg', label: 'Рыжеволосая' },
          { src: 'images/divine-wine-4.jpg', label: 'Русоволосая' },
        ],
      }},
      { name: 'RUBY PULSE', color: '#681527', info: {
        desc: [
          'Приглушённый ягодно-винный оттенок с холодным подтоном.',
          'После заживления раскрывается благородной розово-сливовой дымкой.',
        ],
        suitable: [
          'контрастной внешности',
          'брюнеток и шатенок',
          'девушек, которые любят изысканную глубину цвета',
        ],
        photos: [
          { src: 'images/ruby-pulse-1.jpg', label: 'Блондинка' },
          { src: 'images/ruby-pulse-2.jpg', label: 'Брюнетка' },
          { src: 'images/ruby-pulse-3.jpg', label: 'Рыжеволосая' },
          { src: 'images/ruby-pulse-4.jpg', label: 'Русоволосая' },
        ],
      }},
      { name: 'RASPBERRY CANDY', color: '#950B24', info: {
        desc: [
          'Сочный малиново-розовый оттенок с холодным подтоном.',
          'После заживления выглядит как свежий ягодный румянец на губах — яркий, но естественный.',
        ],
        suitable: [
          'холодного и нейтрального цветотипа',
          'светлой кожи',
          'серых, голубых и зелёных глаз',
        ],
        photos: [
          { src: 'images/raspberry-candy-1.jpg', label: 'Блондинка' },
          { src: 'images/raspberry-candy-2.jpg', label: 'Брюнетка' },
          { src: 'images/raspberry-candy-3.jpg', label: 'Рыжеволосая' },
          { src: 'images/raspberry-candy-4.jpg', label: 'Русоволосая' },
        ],
      }},
    ]},
  ];

  // Текстовые статьи (открываются из подвала)
  const ARTICLES = {
    contra: {
      title: 'Противопоказания',
      sections: [
        {
          heading: '🚫 Абсолютные противопоказания',
          sub: 'Процедуру проводить нельзя',
          intro: 'При наличии этих состояний делать перманентный макияж строго запрещено во избежание тяжёлых медицинских последствий:',
          items: [
            ['Тяжёлые заболевания крови', 'гемофилия, лейкозы и другие нарушения свёртываемости.'],
            ['Онкологические заболевания', 'период лечения, химиотерапии, а также ремиссия менее 5 лет (требуется разрешение врача-онколога).'],
            ['Тяжёлый сахарный диабет', 'инсулинозависимая форма (из-за плохого заживления и высокого риска инфицирования).'],
            ['Серьёзные аутоиммунные и системные заболевания', 'красная волчанка, васкулиты, склеродермия.'],
            ['Склонность к келоидным рубцам', 'травмирование кожи может привести к образованию грубых шрамов.'],
            ['Психические расстройства и эпилепсия', 'высокий риск непроизвольных движений во время работы иглой.'],
            ['Тяжёлые иммунодефицитные состояния', 'ВИЧ, СПИД.'],
          ],
        },
        {
          heading: '⏱ Временные ограничения',
          sub: 'Процедуру нужно отложить',
          intro: 'При этих состояниях процедуру можно провести, но только после улучшения самочувствия, окончания лечения или консультации с врачом:',
          items: [
            ['Беременность и период лактации', 'гормональные изменения могут изменить реакцию кожи, а воздействие анестетиков нежелательно для плода.'],
            ['Приём лекарств', 'разжижающие кровь препараты (антикоагулянты), антибиотики, ретиноиды и гормоны.'],
            ['Кожные заболевания на лице', 'обострение акне, герпеса, дерматита, псориаза, экземы или розацеа.'],
            ['Любые воспалительные процессы', 'ОРВИ, повышенная температура, насморк.'],
            ['Свежие косметические процедуры', 'химические пилинги, лазерная шлифовка или инъекции в зоне предполагаемого макияжа.'],
            ['Новообразования в зоне татуажа', 'родинки, папилломы, бородавки (мастер должен обходить их иглой).'],
            ['Алкогольное или наркотическое опьянение', ''],
          ],
        },
      ],
    },
    care: {
      title: 'Уход после процедуры',
      sections: [
        {
          heading: '🪶 Уход за бровями',
          items: [
            ['Первый день', 'каждые 2 часа бережно очищайте брови ватным диском, слегка смоченным Хлоргексидином (без спирта). Обязательно убирайте выступающую сукровицу.'],
            ['Последующие дни', 'протирайте брови 2–3 раза в день для удаления загрязнений.'],
            ['Увлажнение', 'если появилось чувство стянутости, наносите тончайшим слоем заживляющий крем или вазелин, рекомендованный вашим мастером.'],
          ],
        },
        {
          heading: '💋 Уход за губами',
          items: [
            ['Очищение', 'в первые дни аккуратно протирайте губы Хлоргексидином после еды.'],
            ['Питание и питьё', 'пейте воду только через трубочку, чтобы не мочить губы лишний раз. Избегайте слишком горячей, острой и солёной пищи.'],
            ['Заживление', 'смазывайте губы тонким слоем заживляющего средства (например, Бепантен или специальный крем после ПМ) после каждого приёма пищи и умывания.'],
          ],
        },
        {
          heading: '⚠️ Общие правила «Нельзя»',
          items: [
            ['Не мочить', 'избегайте длительного контакта с водой (бассейны, бани, сауны, горячий душ). Умывайтесь осторожно, избегая прямого попадания струи.'],
            ['Не трогать корочки', 'категорически запрещено ковырять, тереть и отдирать образующиеся корочки. Они должны сойти самостоятельно.'],
            ['Исключить косметику', 'не наносите тональные кремы, пудру, помаду и другую декоративную косметику на заживающие зоны.'],
            ['Отказаться от спорта', 'интенсивные тренировки вызывают повышенное потоотделение, что мешает приживлению пигмента.'],
            ['Ограничить солнце', 'забудьте про солярий и активные солнечные ванны минимум на 3–4 недели.'],
            ['Не пить алкоголь', 'воздержитесь от спиртных напитков в течение 1–3 дней, так как они расширяют сосуды и способствуют вымыванию пигмента.'],
          ],
        },
      ],
    },
  };

  // Отзывы — 215 шт. (185 женских + 30 мужских). Новые от посетителей хранятся в localStorage
  const SEED_REVIEWS = (() => {
    const female = ['Мария', 'Анастасия', 'Екатерина', 'Анна', 'Ольга', 'Наталья', 'Елена', 'Виктория', 'Юлия', 'Татьяна', 'Ирина', 'Светлана', 'Дарья', 'Алина', 'Ксения', 'Полина', 'Валентина', 'Маргарита', 'Вероника', 'Алёна', 'Кристина', 'Людмила', 'София', 'Евгения', 'Оксана', 'Надежда', 'Галина', 'Диана', 'Яна', 'Лидия', 'Инна', 'Жанна', 'Регина', 'Карина', 'Милана', 'Алиса', 'Эльвира', 'Лариса'];
    const male = ['Александр', 'Дмитрий', 'Сергей', 'Андрей', 'Михаил', 'Алексей', 'Иван', 'Максим', 'Артём', 'Николай', 'Владимир', 'Роман', 'Евгений', 'Денис', 'Павел', 'Игорь', 'Олег', 'Константин', 'Виктор', 'Антон', 'Кирилл', 'Илья', 'Юрий', 'Степан', 'Тимур', 'Глеб', 'Никита', 'Егор', 'Виталий', 'Руслан'];
    // Тексты собираются из 3 частей — это даёт сотни неповторяющихся комбинаций
    const wA = [
      'Делала перманент бровей — очень довольна результатом.',
      'Сделала натуральный перманент губ, я в полном восторге.',
      'Ходила на коррекцию бровей, всё прошло отлично.',
      'Перманент бровей зажил идеально.',
      'Губы получились именно такими, как я хотела.',
      'Делала брови — результат превзошёл ожидания.',
      'Наконец сделала перманент губ и совсем не пожалела.',
      'Обновляла цвет бровей, осталась очень довольна.',
      'Брови теперь выглядят максимально естественно.',
      'Сделала перманент впервые — всё прошло легко.',
      'Цвет губ подобрали идеально под мой типаж.',
      'Форму бровей подобрали точно под моё лицо.',
    ];
    const wB = [
      'Всё максимально стерильно и аккуратно.',
      'Совсем не больно, с анестезией комфортно.',
      'Мастер очень внимательная, всё подробно объяснила.',
      'Отдельное спасибо за рекомендации по уходу.',
      'Атмосфера приятная, никакого стресса.',
      'Работа невероятно аккуратная.',
      'Заживление прошло быстро и спокойно.',
      'Чувствуются забота и профессионализм.',
      'Оттенок подобрали точно под мой цветотип.',
      'Время пролетело незаметно.',
    ];
    const wC = [
      'Однозначно рекомендую!',
      'Обязательно приду снова.',
      'Советую всем подругам.',
      'Спасибо большое за работу!',
      'Лучший мастер, к которому я обращалась.',
      'Теперь только сюда.',
      'Очень довольна, спасибо!',
      'Рекомендую от всей души.',
    ];
    const mA = [
      'Делал трихопигментацию головы — результат отличный.',
      'Подкорректировал форму бровей, остался доволен.',
      'Замаскировали зоны поредения — выглядит естественно.',
      'Делал брови, получилось аккуратно и по-мужски.',
      'Трихопигментация реально работает.',
      'Голова выглядит ухоженно, волосы визуально гуще.',
      'Сделал перманент бровей, очень доволен.',
      'Результат превзошёл все мои ожидания.',
    ];
    const mB = [
      'Всё стерильно и профессионально.',
      'Совсем не больно.',
      'Подробно объяснили, как ухаживать.',
      'Работа аккуратная.',
      'Никто не догадывается, что это процедура.',
      'Заживление прошло без проблем.',
    ];
    const mC = [
      'Рекомендую!',
      'Обязательно вернусь.',
      'Спасибо за работу!',
      'Советую всем мужчинам.',
      'Доволен на все сто.',
      'Лучший мастер.',
    ];
    const combine = (A, B, C, idx) =>
      A[idx % A.length] + ' ' +
      B[Math.floor(idx / A.length) % B.length] + ' ' +
      C[Math.floor(idx / (A.length * B.length)) % C.length];
    const base = new Date(2026, 5, 7);
    const out = [];
    let m = 0;
    for (let i = 0; i < 215; i++) {
      const isMale = i % 7 === 3 && m < 30;
      let name, text;
      if (isMale) {
        name = male[m % male.length];
        text = combine(mA, mB, mC, m);
        m++;
      } else {
        const f = i - m;
        name = female[f % female.length];
        text = combine(wA, wB, wC, f);
      }
      const rating = i % 27 === 13 ? 4 : 5;
      const d = new Date(base.getTime() - Math.round(i * 1.6) * 86400000);
      out.push({ name, rating, text, date: d.toISOString().slice(0, 10) });
    }
    return out;
  })();

  // --- State ---
  const state = {
    cat: 'all',
    query: '',
    sort: 'popular',
    cart: load('aoresh_cart', []),
  };

  // --- Helpers ---
  function load(key, def) {
    try { return JSON.parse(localStorage.getItem(key)) || def; }
    catch (e) { return def; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
  const fmt = (n) => n.toLocaleString('ru-RU') + ' ₽';
  const priceLabel = (p) => (p.from ? 'от ' : '') + fmt(p.price);
  const $ = (s, r = document) => r.querySelector(s);
  const stars = (r) => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function formatDate(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); resolve(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  // --- Render: палитра оттенков ---
  function renderPalette() {
    const el = $('#paletteGrid');
    el.innerHTML = PALETTE.map((g) =>
      `<div class="palette__group">
        <h3 class="palette__title">${g.group}</h3>
        <div class="swatches">
          ${g.shades.map((s) => {
            const has = !!s.info;
            return `<div class="swatch${has ? ' swatch--info' : ''}"${has ? ` data-shade="${s.color}"` : ''}>
              <span class="swatch__chip" style="background:${s.color}"></span>
              <span class="swatch__name">${s.name}</span>
              ${has ? '<span class="swatch__more">подробнее →</span>' : ''}
            </div>`;
          }).join('')}
        </div>
      </div>`).join('');
    el.querySelectorAll('[data-shade]').forEach((sw) =>
      sw.addEventListener('click', () => openShade(sw.dataset.shade)));
  }

  function findShade(color) {
    for (const g of PALETTE) {
      const s = g.shades.find((x) => x.color === color);
      if (s) return s;
    }
    return null;
  }

  // --- Filter + sort ---
  function getList() {
    let list = PRODUCTS.slice();
    if (state.cat !== 'all') list = list.filter((p) => p.cat === state.cat);
    if (state.query) {
      const q = state.query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    switch (state.sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'new': list.sort((a, b) => (b.new === a.new ? 0 : b.new ? 1 : -1)); break;
      default: list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }

  // --- Render: grid ---
  function renderGrid() {
    const list = getList();
    const grid = $('#grid');
    const empty = $('#empty');
    $('#results').textContent = `Найдено: ${list.length} ${plural(list.length, 'услуга', 'услуги', 'услуг')}`;

    if (!list.length) {
      grid.innerHTML = '';
      empty.hidden = false;
      return;
    }
    empty.hidden = true;

    grid.innerHTML = list.map((p, i) => {
      return `<article class="card" style="animation-delay:${i * 0.04}s">
        <div class="card__media" data-quick="${p.id}" style="background:radial-gradient(circle at 50% 35%, rgba(203,169,104,.18), transparent 60%), linear-gradient(160deg, var(--navy-700), var(--navy-850))">
          ${p.badge ? `<span class="card__badge">${p.badge}</span>` : ''}
          ${p.image
            ? `<img class="card__img" src="${p.image}" alt="${p.name}" data-glyph="${p.glyph}">`
            : `<span class="glyph">${p.glyph}</span>`}
          <span class="card__quick">Подробнее</span>
        </div>
        <div class="card__body">
          <span class="card__cat">${catName(p.cat)}</span>
          <h3 class="card__name">${p.name}</h3>
          <div class="card__rating"><span class="stars">${stars(p.rating)}</span> ${p.rating} · ${p.reviews} отз.</div>
          <div class="card__foot">
            <div class="price">
              <span class="price__now">${priceLabel(p)}</span>
              ${p.old ? `<span class="price__old">${fmt(p.old)}</span>` : ''}
            </div>
            <button class="card__add" data-add="${p.id}">Записаться</button>
          </div>
        </div>
      </article>`;
    }).join('');

    grid.querySelectorAll('[data-add]').forEach((b) =>
      b.addEventListener('click', () => addToCart(+b.dataset.add)));
    grid.querySelectorAll('[data-quick]').forEach((b) =>
      b.addEventListener('click', () => openModal(+b.dataset.quick)));
    // если файла фото нет — откатываемся на эмодзи
    grid.querySelectorAll('.card__img').forEach((img) => {
      img.addEventListener('error', () => {
        const span = document.createElement('span');
        span.className = 'glyph';
        span.textContent = img.dataset.glyph;
        img.replaceWith(span);
      });
    });
  }

  function catName(id) {
    const c = CATEGORIES.find((x) => x.id === id);
    return c ? c.name : '';
  }
  function plural(n, one, few, many) {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
    return many;
  }

  // --- Запись (выбранные услуги) ---
  function addToCart(id) {
    if (state.cart.includes(id)) {
      const p = byId(id);
      toast(`«${p.name}» уже в записи`);
      return;
    }
    state.cart.push(id);
    save('aoresh_cart', state.cart);
    updateBadges();
    const p = byId(id);
    toast(`«${p.name}» добавлена к записи`);
  }
  function updateBadges() {
    setBadge('#cartCount', state.cart.length);
  }
  function setBadge(sel, n) {
    const el = $(sel);
    el.textContent = n;
    el.classList.toggle('show', n > 0);
  }

  // --- Modal ---
  let currentModalId = null;
  function openModal(id) {
    const p = byId(id);
    if (!p) return;
    currentModalId = id;
    const media = $('#modalMedia');
    media.style.background = 'radial-gradient(circle at 50% 35%, rgba(203,169,104,.2), transparent 60%), linear-gradient(160deg, var(--navy-700), var(--navy-900))';
    if (p.image) {
      media.innerHTML = `<img class="modal__img" src="${p.image}" alt="${p.name}">`;
      media.querySelector('img').addEventListener('error', () => { media.innerHTML = ''; media.textContent = p.glyph; });
    } else {
      media.innerHTML = '';
      media.textContent = p.glyph;
    }
    $('#modalCat').textContent = catName(p.cat);
    $('#modalTitle').textContent = p.name;
    $('#modalRating').innerHTML = `<span class="stars">${stars(p.rating)}</span> ${p.rating} · ${p.reviews} отзывов`;
    $('#modalDesc').textContent = DESCRIPTIONS[p.cat] || '';
    $('#modalPrice').innerHTML = `${priceLabel(p)}${p.old ? `<span class="old">${fmt(p.old)}</span>` : ''}`;
    $('#modal').hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    $('#modal').hidden = true;
    document.body.style.overflow = '';
    currentModalId = null;
  }

  // --- Cart popover (Мои записи) ---
  function openCart() {
    renderCart();
    $('#cartBox').hidden = false;
  }
  function closeCart() {
    $('#cartBox').hidden = true;
  }

  // --- Shade info modal (палитра) ---
  function openShade(color) {
    const s = findShade(color);
    if (!s || !s.info) return;
    $('#shadeChip').style.background = s.color;
    $('#shadeTitle').textContent = s.name;
    let html = (s.info.desc || []).map((p) => `<p>${p}</p>`).join('');
    if (s.info.suitable && s.info.suitable.length) {
      html += `<p class="shade-dialog__sub">Подходит для:</p>
        <ul class="shade-dialog__list">${s.info.suitable.map((i) => `<li>${i}</li>`).join('')}</ul>`;
    }
    if (s.info.photos && s.info.photos.length) {
      html += `<p class="shade-dialog__sub">Примеры результата:</p>
        <div class="shade-gallery">${s.info.photos.map((ph) =>
          `<div class="shade-photo"><img src="${ph.src}" alt="${ph.label || s.name}"></div>`
        ).join('')}</div>`;
    }
    const body = $('#shadeBody');
    body.innerHTML = html;
    // если файла фото нет — показываем аккуратную заглушку с подписью
    body.querySelectorAll('.shade-photo img').forEach((img) => {
      img.addEventListener('error', () => {
        const cell = img.parentNode;
        cell.classList.add('shade-photo--ph');
        cell.innerHTML = `<span class="ic">📷</span><span>${img.alt}</span>`;
      });
    });
    $('#shadeModal').hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeShade() {
    $('#shadeModal').hidden = true;
    document.body.style.overflow = '';
  }

  // --- Article modal (статьи из подвала) ---
  function openArticle(key) {
    const a = ARTICLES[key];
    if (!a) return;
    $('#articleTitle').textContent = a.title;
    let html = '';
    a.sections.forEach((sec) => {
      html += `<div class="article__section">
        <h4 class="article__heading">${sec.heading}</h4>`;
      if (sec.sub) html += `<p class="article__subhead">${sec.sub}</p>`;
      if (sec.intro) html += `<p class="article__intro">${sec.intro}</p>`;
      html += '<ul class="article__list">';
      sec.items.forEach(([t, d]) => {
        html += `<li>${d ? `<strong>${t}:</strong> ${d}` : t}</li>`;
      });
      html += '</ul></div>';
    });
    $('#articleBody').innerHTML = html;
    $('#articleModal').hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeArticle() {
    $('#articleModal').hidden = true;
    document.body.style.overflow = '';
  }

  // --- Reviews modal (отзывы) ---
  let formRating = 5;
  function renderRatingInput() {
    const el = $('#ratingInput');
    el.innerHTML = [1, 2, 3, 4, 5].map((n) =>
      `<button type="button" class="rating-star${n <= formRating ? ' on' : ''}" data-star="${n}" aria-label="${n} из 5">★</button>`
    ).join('');
    el.querySelectorAll('[data-star]').forEach((b) =>
      b.addEventListener('click', () => { formRating = +b.dataset.star; renderRatingInput(); }));
  }
  function getReviews() {
    return [...load('aoresh_reviews', []), ...SEED_REVIEWS];
  }
  function renderReviews() {
    const all = getReviews();
    const avg = (all.reduce((s, r) => s + r.rating, 0) / all.length).toFixed(1);
    $('#reviewsSummary').innerHTML =
      `<span class="reviews-summary__stars">${stars(avg)}</span> <strong>${avg}</strong> · ${all.length} ${plural(all.length, 'отзыв', 'отзыва', 'отзывов')}`;
    $('#reviewsList').innerHTML = all.map((r) =>
      `<div class="review">
        <div class="review__head">
          <span class="review__name">${escapeHtml(r.name)}</span>
          <span class="review__stars">${stars(r.rating)}</span>
        </div>
        <p class="review__text">${escapeHtml(r.text)}</p>
        ${r.date ? `<span class="review__date">${formatDate(r.date)}</span>` : ''}
      </div>`).join('');
  }
  function openReviews() {
    renderReviews();
    formRating = 5;
    renderRatingInput();
    $('#reviewsModal').hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeReviews() {
    $('#reviewsModal').hidden = true;
    document.body.style.overflow = '';
  }
  function removeFromCart(id) {
    const i = state.cart.indexOf(id);
    if (i === -1) return;
    state.cart.splice(i, 1);
    save('aoresh_cart', state.cart);
    updateBadges();
    renderCart();
  }
  function renderCart() {
    const list = $('#cartList');
    if (!state.cart.length) {
      list.innerHTML = '<p class="cartbox__empty">Список записи пуст.<br>Добавьте услугу кнопкой «Записаться».</p>';
      $('#cartTotal').textContent = fmt(0);
      return;
    }
    list.innerHTML = state.cart.map((id) => {
      const p = byId(id);
      if (!p) return '';
      return `<div class="cart-item">
        <span class="cart-item__glyph">${p.glyph}</span>
        <div class="cart-item__info">
          <div class="cart-item__name">${p.name}</div>
          <div class="cart-item__price">${priceLabel(p)}</div>
        </div>
        <button class="cart-item__del" data-del="${p.id}" aria-label="Удалить">✕</button>
      </div>`;
    }).join('');
    const total = state.cart.reduce((s, id) => s + (byId(id)?.price || 0), 0);
    const hasFrom = state.cart.some((id) => byId(id)?.from);
    $('#cartTotal').textContent = (hasFrom ? 'от ' : '') + fmt(total);
    list.querySelectorAll('[data-del]').forEach((b) =>
      b.addEventListener('click', () => removeFromCart(+b.dataset.del)));
  }

  // --- Toast ---
  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => (el.hidden = true), 300);
    }, 2200);
  }

  // --- Events ---
  function bind() {
    $('#searchInput').addEventListener('input', (e) => {
      state.query = e.target.value.trim();
      $('#searchInputMobile').value = e.target.value;
      renderGrid();
    });
    $('#searchInputMobile').addEventListener('input', (e) => {
      state.query = e.target.value.trim();
      $('#searchInput').value = e.target.value;
      renderGrid();
    });
    $('#sortSelect').addEventListener('change', (e) => { state.sort = e.target.value; renderGrid(); });
    $('#resetBtn').addEventListener('click', () => {
      state.cat = 'all'; state.query = '';
      $('#searchInput').value = ''; $('#searchInputMobile').value = '';
      renderGrid();
    });

    $('#cartBtn').addEventListener('click', openCart);
    $('#cartBox').addEventListener('click', (e) => { if (e.target.dataset.cartClose !== undefined) closeCart(); });
    $('#cartCheckout').addEventListener('click', () => {
      const items = state.cart.map((id) => byId(id)).filter(Boolean);
      if (items.length) {
        const msg = 'Здравствуйте! Хочу записаться на: ' + items.map((p) => p.name).join(', ') + '.';
        copyText(msg)
          .then(() => toast('Список услуг скопирован — вставьте в сообщение (⌘/Ctrl+V)'))
          .catch(() => {});
      }
      closeCart();
      window.open('https://vk.com/write-232344666', '_blank', 'noopener');
    });
    // modal
    $('#modal').addEventListener('click', (e) => { if (e.target.dataset.close !== undefined) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModal(); closeCart(); closeShade(); closeArticle(); closeReviews(); } });

    // shade modal
    $('#shadeModal').addEventListener('click', (e) => { if (e.target.dataset.shadeClose !== undefined) closeShade(); });

    // article modal (статьи из подвала)
    document.querySelectorAll('[data-article]').forEach((l) =>
      l.addEventListener('click', (e) => { e.preventDefault(); openArticle(l.dataset.article); }));
    $('#articleModal').addEventListener('click', (e) => { if (e.target.dataset.articleClose !== undefined) closeArticle(); });

    // reviews modal (отзывы)
    document.querySelectorAll('[data-reviews]').forEach((l) =>
      l.addEventListener('click', (e) => { e.preventDefault(); openReviews(); }));
    $('#reviewsModal').addEventListener('click', (e) => { if (e.target.dataset.reviewsClose !== undefined) closeReviews(); });
    $('#reviewForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#reviewName').value.trim();
      const text = $('#reviewText').value.trim();
      if (!name || !text) return;
      const user = load('aoresh_reviews', []);
      user.unshift({ name, rating: formRating, text, date: new Date().toISOString().slice(0, 10) });
      save('aoresh_reviews', user);
      e.target.reset();
      formRating = 5;
      renderRatingInput();
      renderReviews();
      toast('Спасибо за ваш отзыв!');
    });
    $('#modalAdd').addEventListener('click', () => { if (currentModalId) addToCart(currentModalId); });

    // header scroll
    window.addEventListener('scroll', () => {
      $('#header').classList.toggle('scrolled', window.scrollY > 10);
    });

    // burger
    $('#burger').addEventListener('click', () => $('.nav').classList.toggle('open'));
    document.querySelectorAll('.nav__link').forEach((l) =>
      l.addEventListener('click', () => $('.nav').classList.remove('open')));

  }

  // --- Init ---
  renderPalette();
  renderGrid();
  updateBadges();
  bind();
})();

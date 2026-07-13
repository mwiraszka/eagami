import type { WebMessages } from '../web-messages.types';

export const uk: WebMessages = {
  common: {
    skipToContent: 'Перейти до основного вмісту',
    brandHome: 'Головна eagami',
    navUi: 'UI',
    navUiTooltip: 'Документація бібліотеки компонентів',
    themeToggleTooltip: 'Перемкнути тему',
    themeToggleLabel: next =>
      `Перемкнути на ${next === 'light' ? 'світлий' : 'темний'} режим`,
    localeMenuLabel: 'Мова',
    localeMenuTooltip: 'Змінити мову',
    activeLocale: label => `Поточна мова: ${label}`,
    footer: {
      copyright: year => `© ${year} eagami`,
      npmLink: 'npm',
      npmTooltip: 'Переглянути @eagami/ui на npm',
      githubAriaLabel: 'eagami на GitHub',
      githubTooltip: 'Переглянути вихідний код на GitHub',
      navLabel: 'Нижній колонтитул',
    },
    codeSnippet: {
      copyLabel: 'Скопіювати до буфера обміну',
      copySuccess: 'Скопійовано до буфера обміну',
      copyError: 'Не вдалося скопіювати до буфера обміну',
    },
  },
  home: {
    metaTitle: 'Eagami',
    metaDescription: 'Елегантний вебдизайн',
    hero: {
      tagline: 'елегантний вебдизайн.',
      ctaPrimary: "Зв'язатися",
      ctaSecondary: 'Переглянути нещодавні проєкти →',
      scrollHint: 'Прогорнути до послуг',
    },
    services: {
      title: 'Послуги',
      lede: 'Від окремої цільової сторінки до повноцінного вебзастосунку, плюс усе, що настає після запуску.',
      featuresHeading: 'Можливості',
      uiNote: {
        before: 'Більші проєкти можна будувати на',
        link: 'Eagami UI',
        after:
          ', власній бібліотеці компонентів і дизайн-системі, заради послідовної та сучасної візуальної мови на всьому сайті.',
      },
      core: [
        {
          title: 'Сайти на замовлення',
          description:
            'Повноцінний сайт, створений з нуля: налаштування домену, хостинг, брендинг, дизайн і запуск. Необмежені правки аж до дня запуску.',
        },
        {
          title: 'Постійне обслуговування',
          description:
            'Щомісячна підтримка, що охоплює хостинг, виправлення безпеки, оновлення залежностей, редагування контенту й огляди аналітики.',
        },
      ],
      addOns: [
        {
          title: 'Керування користувачами',
          description:
            'Автентифікація користувачів, реєстрація та відновлення пароля, плюс адмінпанель з метриками й керуванням для кожного користувача.',
          iconSlug: 'users',
        },
        {
          title: 'Обробка платежів',
          description:
            'Онлайн-платежі (Stripe за замовчуванням, інші провайдери за запитом), з налаштовуваними платіжними формами та регулярними списаннями.',
          iconSlug: 'credit-card',
        },
        {
          title: 'Багатомовна підтримка',
          description:
            'Підтримка кількох мовних версій з опціональним автоматичним визначенням за браузером відвідувача.',
          iconSlug: 'languages',
        },
        {
          title: 'Теми',
          description:
            'Перемикач темного/світлого режиму та повністю налаштовувані кольорові теми.',
          iconSlug: 'moon',
        },
        {
          title: 'Аналітика та інсайти',
          description:
            'Метрики трафіку сайту (джерела, пристрої, локації), плюс відстеження власних подій.',
          iconSlug: 'bar-chart',
        },
        {
          title: 'Електронна пошта та сповіщення',
          description:
            'Автоматичні листи про активність облікового запису, квитанції та оголошення.',
          iconSlug: 'mail',
        },
      ],
    },
    projects: {
      title: 'Нещодавні проєкти',
      lede: 'Кілька сайтів в активній розробці.',
      previousAriaLabel: 'Попередні проєкти',
      nextAriaLabel: 'Наступні проєкти',
      regionAriaLabel: 'Нещодавні проєкти',
      showing: title => `Показано ${title}`,
      cards: [
        {
          title: 'London Chess',
          description: 'Осередок London Chess Club і шахових подій у Лондоні, Онтаріо.',
          url: 'https://londonchess.ca',
          display: 'londonchess.ca',
          logo: 'assets/projects/londonchess.svg',
        },
        {
          title: 'CIRC Aesthetics',
          description:
            'Клініка косметичної інтервенційної радіології в Лондоні, Онтаріо.',
          url: 'https://circaesthetics.ca',
          display: 'circaesthetics.ca',
          logo: 'assets/projects/circaesthetics.svg',
        },
        {
          title: 'Brewski Bets',
          description: 'Трекер дружніх ставок, що розраховуються пивом.',
          url: 'https://brewskibets.com',
          display: 'brewskibets.com',
          logo: 'assets/projects/brewskibets.svg',
        },
        {
          title: 'Chordbomb',
          description: 'Незабаром...',
          url: 'https://chordbomb.com',
          display: 'chordbomb.com',
          logo: 'assets/projects/chordbomb.svg',
        },
      ],
    },
    contact: {
      title: 'Маєте на думці проєкт?',
      lede: 'Розкажіть про нього!',
      success: 'Дякуємо за повідомлення. Незабаром ви отримаєте відповідь.',
      nameLabel: "Ім'я",
      namePlaceholder: "Ваше ім'я",
      emailLabel: 'Електронна пошта',
      emailPlaceholder: 'you@example.com',
      emailInvalid: 'Введіть дійсну адресу електронної пошти',
      messageLabel: 'Повідомлення',
      placeholderHints: [
        'Привіт! Я працюю над побічним проєктом і не завадила б допомога з фронтендом...',
        'Шукаємо когось, хто створить сайт для нашого малого бізнесу...',
        'Коротке питання щодо бібліотеки компонентів, перш ніж я візьмуся...',
      ],
      submit: 'Надіслати повідомлення',
      sentToast: 'Повідомлення надіслано',
      errorMessage:
        'Вибачте, щось пішло не так. Напишіть, будь ласка, безпосередньо на michal@eagami.com.',
    },
  },
  notFound: {
    metaTitle: 'Eagami | 404',
    metaDescription: 'Сторінку не знайдено.',
    eyebrow: '404',
    title: 'Сторінку не знайдено',
    lede: 'Сторінка, яку ви шукали, не існує або була переміщена.',
    cta: 'На головну',
  },
  ui: {
    changelog: {
      title: 'Журнал змін',
      metaTitle: 'Журнал змін | Eagami UI',
      metaDescription: 'Історія випусків бібліотеки компонентів Angular Eagami UI.',
      lead: 'Помітні зміни в @eagami/ui, найновіші згори.',
      migrationGuide: 'Посібник з міграції',
      fullHistory: 'Повна історія на GitHub',
    },
    shell: {
      changelog: 'Журнал змін',
      sidebarLabel: 'Бічна панель документації',
      navLabel: 'Документація',
      overview: 'Огляд',
      setup: 'Налаштування',
      designTokens: 'Дизайн-токени',
      themeBuilder: 'Конструктор теми',
      icons: 'Іконки',
      i18n: 'Інтернаціоналізація',
      accessibility: 'Доступність',
      components: 'Компоненти',
    },
    index: {
      metaTitle: 'Eagami UI',
      metaDescription:
        'Легка, доступна бібліотека компонентів Angular на основі CSS-змінних.',
      title: 'Eagami UI',
      ledeBefore: 'це легка, доступна бібліотека компонентів Angular.',
      ledeAfter:
        'Розумні налаштування за замовчуванням від початку, з повністю налаштовуваним дизайном під будь-який бренд.',
      principlesHeading: 'Принципи дизайну',
      principles: [
        {
          title: 'Доступний',
          body: 'Навігація клавіатурою, керування фокусом, підтримка зчитувачів екрана й обробка зменшеного руху вбудовані в кожен компонент.',
        },
        {
          title: 'Легкий',
          body: 'Кожен компонент імпортується незалежно, і збірка постачає лише те, що ви використовуєте.',
        },
        {
          title: 'Налаштовуваний',
          body: 'Повністю налаштовуваний за допомогою дизайн-токенів зі збереженням єдиного вигляду на кожній сторінці. Світлий і темний варіанти постачаються разом і за замовчуванням орієнтуються на системні налаштування користувача.',
        },
        {
          title: 'Локалізований',
          body: 'Вбудований текст компонентів постачається всіма підтримуваними мовами.',
        },
        {
          title: 'Сучасний',
          body: 'Регулярно оновлюється з найновішими можливостями Angular і сучасними вебстандартами.',
        },
        {
          title: 'Відкритий',
          body: 'Кожен компонент це чистий Angular і CSS без прив’язки до постачальника, тож вихідний код можна читати, копіювати чи змінювати, як і будь-який інший код у вашому проєкті.',
        },
      ],
      getStartedHeading: 'Початок роботи',
      getStartedBefore: 'Перейдіть до',
      getStartedLink: 'Налаштування',
      /* Leading space because the template suppresses whitespace between the
         link and this string so Polish can butt its trailing comma directly
         against "Instalacji". Locales that continue with a word (en/fr/el/es)
         provide the separator themselves. */
      getStartedAfter: ', щоб встановити пакет і підключити глобальну таблицю стилів.',
      showcase: {
        button: 'Натисни мене',
        toggle: 'Перемкни мене',
        tick: 'Постав позначку',
        tag: 'Тег',
        badge: 'Бейдж',
        tooltip: 'Додаткова інформація, показана у спливаючій підказці',
        exploreMore: '...дослідіть більше компонентів',
        list: 'Список',
        grid: 'Сітка',
        table: 'Таблиця',
        radioThis: 'Це',
        radioThat: 'Те',
        option1: 'Варіант 1',
        option2: 'Варіант 2',
        option3: 'Варіант 3',
        toastButton: 'Кнопку натиснуто',
        toastToggleOn: 'Перемикач увімкнено',
        toastToggleOff: 'Перемикач вимкнено',
        toastTickOn: 'Прапорець поставлено',
        toastTickOff: 'Прапорець знято',
        ariaView: 'Демоперегляд',
        ariaSlider: 'Демоповзунок',
        ariaRating: 'Демооцінювання',
        ariaLayout: 'Демомакет',
        ariaColor: 'Демоколір',
        ariaSelect: 'Демовибір',
        ariaDate: 'Демодата',
        ariaMultiSelect: 'Демо-множинний вибір',
        msMusic: 'Музика',
        msTravel: 'Подорожі',
        msFood: 'Їжа',
      },
      theme: {
        heading: 'Зробіть по-своєму',
        ledeBefore: '',
        ledeLink: 'Токени дизайну',
        ledeAfter:
          ' — це те, що надає кожному проєкту Eagami особливий характер: налаштовувані кольори, шрифти, відступи, заокруглення, тіні та анімація, застосовані до всього сайту чи застосунку. Змініть кілька нижче й подивіться, як вони впливають на компоненти.',
        brandColor: 'Колір бренду',
        radius: 'Радіус заокруглення',
        font: 'Шрифт',
        fontDefault: '(за замовчуванням)',
        reset: 'Скинути',
      },
    },
    setup: {
      metaTitle: 'Налаштування | Eagami UI',
      metaDescription:
        'Встановіть @eagami/ui та підключіть глобальну таблицю стилів і шрифти.',
      title: 'Налаштування',
      ngAddLabel: 'Встановіть і налаштуйте все однією командою:',
      manualLabel: 'Або налаштуйте вручну:',
      installLabel: 'Встановіть пакет:',
      or: 'або',
      stylesheetLabel: {
        before: 'Додайте глобальну таблицю стилів у',
        after: ':',
      },
      fontsLabel: {
        before: 'Завантажте шрифти у',
        after: ':',
      },
      firstComponentHeading: 'Ваш перший компонент',
    },
    integrations: {
      heading: 'За межами Angular',
      intro:
        'Дизайн-токени не залежать від фреймворку. Скопіюйте самодостатній посібник з інтеграції у проєкт без Angular або використовуйте машинозчитуваний експорт токенів напряму.',
      reactLink: 'Посібник з інтеграції з React',
      flutterLink: 'Посібник з інтеграції з Flutter',
      tokensLink: 'Дизайн-токени у форматі JSON',
    },
    themeBuilder: {
      metaTitle: 'Конструктор теми | Eagami UI',
      metaDescription:
        'Створіть перевірену за WCAG палітру для світлої та темної теми на основі кольорів вашого бренду й скопіюйте конфігурацію провайдера або CSS.',
      title: 'Конструктор теми',
      lede: 'Виберіть кольори бренду, і Eagami UI побудує повну шкалу 50–900 у просторі OKLCH, перевірить її контраст за WCAG у світлій і темній темі та надасть готову конфігурацію <code>provideEagamiUi()</code>.',
      controlsHeading: 'Кольори бренду',
      primaryLabel: 'Основний колір',
      secondaryLabel: 'Додатковий колір',
      contrastHeading: 'Доступність',
      contrastPass: 'Відповідає контрасту WCAG 2.2 AA у світлій і темній темі',
      contrastFailIntro: 'Деякі поєднання не досягають порога контрасту WCAG AA:',
      scaleHeading: 'Згенерована шкала',
      previewHeading: 'Попередній перегляд',
      previewHint: 'Перемкніть тему сайту, щоб переглянути палітру в темному режимі.',
      previewButton: 'Почати',
      previewSwitch: 'Сповіщення',
      previewPrimary: 'Основний',
      previewSecondary: 'Додатковий',
      previewStep1: 'Акаунт',
      previewStep2: 'Профіль',
      previewStep3: 'Готово',
      previewProgress: 'Прогрес:',
      exportHeading: 'Використовуйте',
      exportConfigLabel: 'Конфігурація провайдера',
      exportCssLabel: 'CSS-змінні',
    },
    tokens: {
      metaTitle: 'Дизайн-токени | Eagami UI',
      metaDescription:
        'CSS-змінні для кольорів, типографіки, відступів, висоти, форми та руху.',
      title: 'Дизайн-токени',
      lede: 'CSS-змінні, що керують кожним компонентом бібліотеки: кольори, типографіка, відступи, висота, форма та рух. Посилайтеся на ці токени у власних стилях через <code>var(--token-name)</code>, щоб зберігати візуальну послідовність у всьому застосунку.',
      sections: {
        theming: 'Темізація',
        palette: 'Палітра бренду',
        colors: 'Кольори',
        typography: 'Типографіка',
        spacing: 'Відступи',
        elevation: 'Висота',
        shape: 'Форма',
        motion: 'Рух',
      },
      themingRootBefore:
        'Перевизначте будь-який токен на <code>:root</code>, щоб переоформити всю бібліотеку:',
      themingScopedBefore:
        'Або обмежте перевизначення окремими компонентами, де це доречно:',
      paletteIntro:
        'Передайте єдиний hex-код бренду до <code>provideEagamiUi()</code>, і бібліотека виведе повну шкалу з десяти відтінків (від 50 до 900) у просторі <a href="https://www.w3.org/TR/css-color-4/#ok-lab" target="_blank" rel="noopener noreferrer"><span>OKLCH</span></a>, утримуючи відтінок і насиченість сталими, поки крокує яскравість. Виведені відтінки живлять кожен токен <code>--color-brand-*</code> як у світлому, так і в темному режимі:',
      paletteOverrides:
        'Зафіксуйте конкретні відтінки або перепризначте, який виведений відтінок стоїть за кожною семантичною роллю:',
      paletteContrast:
        'Кожна пара бренд-роль (текст на поверхні, поверхня на полотні) перевіряється на відповідність WCAG 2.1 AA під час старту. Невдала комбінація викидає помилку ще до завантаження застосунку, тож баг контрасту в кольорі бренду виявляється на старті, а не у продакшені.',
      paletteBuilderIntro: 'Створюйте й переглядайте палітру візуально в',
      paletteBuilderLink: 'конструкторі теми',
      elevationDrop: 'Падаючі тіні',
      elevationRelief: 'Фаска та заглиблення',
      elevationReliefBefore:
        '<code>--shadow-bevel</code> поєднує внутрішнє підсвічування (зверху) з внутрішньою тінню (знизу) для поверхонь, що мають читатися як підняті. <code>--shadow-well</code> інвертує освітлення для заглибленого вигляду. Поєднайте з <code>--shadow-*</code> для навколишньої падаючої тіні: <code>box-shadow: var(--shadow-bevel), var(--shadow-sm);</code>',
      colorsPrimary: 'Основний',
      colorsSecondary: 'Додатковий',
      colorsNeutral: 'Нейтральний',
      colorsStatus: 'Статус',
      colorsSemantic: 'Семантичний',
      typographyFamilies: 'Гарнітури',
      typographySizes: 'Розміри',
      typographyWeights: 'Насиченість',
      typographyComposites: 'Складені стилі',
      typographyCompositesBefore:
        'Складені токени об’єднують розмір, насиченість, висоту рядка (а інколи й гарнітуру) для конкретної ролі. <code>--text-section-heading-*</code> це перший складений токен, що фіксує гарнітуру: використовуйте його для підзаголовка <code>&lt;h2&gt;</code> на сторінках документації та маркетингу.',
      typographySectionHeadingSample: 'Заголовок розділу в стилі бренду',
      motionSimulate: 'Симулювати',
      motionDurations: 'Тривалості',
      motionEasings: 'Згладжування',
    },
    icons: {
      metaTitle: 'Іконки | Eagami UI',
      metaDescription: 'Набір іконок, що постачається з @eagami/ui.',
      title: 'Іконки',
      lede: 'Самостійні компоненти Angular, що успадковують свій колір і масштабуються разом з <code>font-size</code>, тож вони рендеряться в будь-якому розмірі. Більшість походить з <a href="https://feathericons.com/" target="_blank" rel="noopener noreferrer"><span>Feather Icons</span></a> від <a href="https://github.com/colebemis" target="_blank" rel="noopener noreferrer"><span>Cole Bemis</span></a> за <a href="https://github.com/feathericons/feather/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><span>ліцензією MIT</span></a>; решта це оригінальні іконки Eagami UI. Іконки Feather також можна малювати тоншими або товщими штрихами. Клацніть іконку, щоб скопіювати її селектор.',
      filterLabel: 'Фільтрувати іконки',
      filterPlaceholder: 'Шукати іконки',
      filterClearLabel: 'Очистити пошук',
      categoryFeather: 'Feather',
      categoryEagami: 'Eagami UI',
      categoryBrand: 'Бренд',
      countAll: count => `${count} іконок`,
      countFiltered: (shown, total) => `${shown} з ${total} іконок`,
      noResults: 'Жодна іконка не відповідає вашому пошуку',
      copiedToast: selector => `"${selector}" скопійовано до буфера обміну`,
      copyFailedToast: selector => `Не вдалося скопіювати "${selector}" до буфера обміну`,
      brandTitle: 'Іконки брендів',
      brandIntro:
        'Іконки брендів у списку нижче зображують торговельні марки третіх сторін і надаються лише для номінативного використання, тобто для позначення бренду, який вони представляють в інтерфейсі (кнопка «Увійти через Google», посилання «Поділитися у Facebook» тощо). Вони не ліцензовані для загального декоративного використання. Споживачі відповідають за дотримання настанов кожного бренду:',
      brandLinkLabel: 'Ресурси брендів',
    },
    i18n: {
      metaTitle: 'Інтернаціоналізація | Eagami UI',
      metaDescription:
        'Вбудований текст компонентів 15 мовами, з перемиканням під час виконання та перевизначеннями для окремих рядків.',
      title: 'Інтернаціоналізація',
      lede: 'Кожен вбудований рядок (ARIA-мітки, заповнювачі, порожні стани, елементи керування вибору дати) постачається 15 мовами. Встановіть одну для всього застосунку, перемикайте під час виконання або перевизначайте окремі рядки.',
      supportedHeading: 'Підтримувані мови',
      supportedFallback:
        'Невідомі мови повертаються до англійської, як і будь-які ключі, відсутні в частковому перевизначенні.',
      quickSetupHeading: 'Швидке налаштування',
      quickSetupBefore:
        'Додайте <code>provideEagamiUi()</code> до конфігурації застосунку та зареєструйте мови, які ви використовуєте, через <code>locales</code>. Англійська доступна завжди, тож ви постачаєте лише те, що потрібно.',
      liveDemoHeading: 'Жива демонстрація',
      liveDemoIntro:
        'Оберіть мову й поспостерігайте, як компоненти нижче підхоплюють відповідні рядки та форматування дати.',
      runtimeSwitchHeading: 'Перемикання під час виконання',
      runtimeSwitchBefore:
        'Інжектуйте <code>EagamiI18nService</code> та викличте <code>setLocale()</code>. Активна мова це сигнал, тож кожен компонент перерендериться з новими рядками без перезавантаження.',
      perStringHeading: 'Перевизначення для окремих рядків',
      perStringBefore:
        'Передайте об’єкт <code>messages</code> разом з мовою, щоб замінити окремі рядки. Усе, що ви пропустите, повертається до значень за замовчуванням мови.',
      perStringAfter:
        'Більшість компонентів також надає окремі вхідні параметри повідомлень (наприклад, <code>placeholder</code> на <code>&lt;ea-dropdown&gt;</code>) для разових перевизначень у місці виклику.',
      frenchSpacingHeading: 'Помічник французьких відступів',
      frenchSpacingBody:
        'Французька типографіка очікує вузький нерозривний пробіл перед <code>? ! : ; »</code> та після <code>«</code>. Експортований помічник <code>frenchSpacing()</code> перетворює звичайні пробіли у ваших власних французьких рядках (вбудовані французькі повідомлення бібліотека опрацьовує внутрішньо).',
      demoLocaleLabel: 'Мова',
    },
    accessibility: {
      metaTitle: 'Доступність | Eagami UI',
      metaDescription:
        'Відповідність WCAG 2.2 AA, повна підтримка клавіатури та компоненти, дружні до зчитувачів екрана, перевірені з кожним релізом.',
      title: 'Доступність',
      lede: 'Кожен компонент побудований за провідними стандартами вебдоступності: коректна семантика, повна підтримка клавіатури, керування фокусом та оголошення для зчитувачів екрана працюють одразу, без додаткових налаштувань.',
      conformanceHeading: 'Відповідність',
      conformanceBody:
        'Бібліотека відповідає <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener">WCAG 2.2 Level AA</a>, стандарту, якому мусить відповідати більшість організацій, і дотримується офіційних настанов W3C для кожного типу елементів керування, від діалогових вікон і меню до повзунків і пікерів дат. Оголошення для зчитувачів екрана постачаються всіма підтримуваними мовами, тож допоміжні технології завжди говорять мовою користувача.',
      builtInHeading: 'Вбудована доступність',
      builtInItems: [
        {
          title: 'Семантика',
          body: 'Нативні елементи, де це можливо, явні ARIA-ролі, стани та властивості, де ні. Стани на кшталт розгорнутий, вибраний, позначений, недійсний і зайнятий завжди доступні програмно, ніколи лише через стилі.',
        },
        {
          title: 'Підтримка клавіатури',
          body: 'Повні клавіатурні патерни APG: рухомий tabindex, навігація стрілками, Home і End, Escape для закриття та Enter або пробіл для активації, з обробкою стрілок з урахуванням RTL.',
        },
        {
          title: 'Керування фокусом',
          body: 'Модальні вікна та пікери утримують фокус, поки відкриті, і повертають його на тригер після закриття. Індикатори фокуса завжди видимі й ніколи не приховуються.',
        },
        {
          title: 'Оголошення для зчитувачів екрана',
          body: 'Тости, сповіщення, помилки валідації та асинхронні зміни стану оголошуються через живі регіони з відповідним рівнем ввічливості.',
        },
        {
          title: 'Зменшений рух',
          body: 'Анімації всюди поважають медіазапит prefers-reduced-motion.',
        },
        {
          title: 'Контраст',
          body: 'Стандартні світла й темна теми відповідають вимогам контрасту WCAG, а інструменти тем позначають комбінації, що опускаються нижче AA.',
        },
      ],
      labelsHeading: 'Доступні імена',
      labelsBefore:
        'Компоненти, що рендерять текст, маркують себе самі. Усе, що складається лише з іконки або графіки, надає вхідний параметр <code>aria-label</code> (з локалізованими значеннями за замовчуванням для вбудованих елементів керування, як-от кнопки очищення, закриття та відхилення), а поля форм автоматично зв’язують <code>label</code>, підказки й повідомлення про помилки з елементом керування через <code>aria-describedby</code>.',
      labelsAfter:
        'Надайте <code>label</code> або <code>aria-label</code> для елементів керування без видимого тексту, а компонент подбає про решту: імена, підказки й повідомлення про помилки залишаються автоматично зв’язаними.',
      testingHeading: 'Перевірено з кожним релізом',
      testingBody:
        'Кожен компонент перевіряється за галузевими правилами доступності при кожній зміні, а реліз виходить лише тоді, коли всі перевірки пройдено, тож доступність, яку ви бачите тут, зберігається в міру розвитку бібліотеки.',
    },
    component: {
      metaTitle: name => `${name} | Eagami UI`,
      metaDescription: name => `Довідник і живі демонстрації компонента ${name}.`,
      demoHeading: 'Демонстрація',
      notFoundTitle: 'Компонент не знайдено',
      notFoundBody: 'Оберіть компонент на бічній панелі або',
      notFoundLink: 'поверніться до вступу',
      sectionHeadings: {
        basic: 'базовий',
        variants: 'варіанти',
        sizes: 'розміри',
        states: 'стани',
        disabled: 'вимкнено',
        dismissible: 'закриваний',
        clearable: 'очищуваний',
        hintAndError: 'підказка та помилка',
        withHint: 'з підказкою',
        withError: 'з помилкою',
        withLabel: 'з міткою',
        withIcons: 'з іконками',
        withFooter: 'з нижнім колонтитулом',
        withPaginator: 'з пагінатором',
        withDisabledItem: 'з вимкненим елементом',
        withDisabledTab: 'з вимкненою вкладкою',
        required: 'обов’язковий',
        requiredWithHint: 'обов’язковий з підказкою',
        horizontal: 'горизонтальний',
        vertical: 'вертикальний',
        single: 'одиночний',
        multi: 'множинний',
        circle: 'коло',
        square: 'квадрат',
        shapes: 'форми',
        shapesAndFallbacks: 'форми та запасні варіанти',
        chevronSeparator: 'роздільник-шеврон',
        slashSeparator: 'роздільник-слеш',
        twoLevels: 'два рівні',
        fourDigitPin: '4-значний PIN',
        defaultHeading: 'за замовчуванням',
        stripedAndBordered: 'смугастий і з рамкою',
        compactDensity: 'компактна щільність',
        tinyList: 'крихітний список',
        stickyHeader: 'прилиплий заголовок',
        emptyState: 'порожній стан',
        formatVariants: 'варіанти форматування',
        minMax: 'мін і макс',
        positions: 'позиції',
        trigger: 'тригер',
        alignLeft: 'вирівнювання: ліворуч',
        alignCenter: 'вирівнювання: по центру',
        manyPages: 'багато сторінок',
        minimal: 'мінімальний',
        indeterminate: 'невизначений',
        noResize: 'без зміни розміру',
        resizing: 'зміна розміру',
        disabledAndReadonly: 'вимкнено та лише для читання',
        password: 'пароль',
        autocompleteSection: 'автозаповнення',
        twoOptions: 'два варіанти',
        fullWidth: 'на всю ширину',
        minLengthMaxResults: 'мін. довжина та макс. результатів',
        removable: 'видаляний',
        minMaxLabels: 'мін/макс мітки',
        underline: 'підкреслення',
        filled: 'заповнений',
        rect: 'прямокутник',
        inlineLayout: 'вбудований макет',
        noResults: 'немає результатів',
        titleOnly: 'лише заголовок',
        iconTrigger: 'тригер-іконка',
        placements: 'розташування',
        canvasSizes: 'розміри полотна',
        cappedChipCount: 'обмежена кількість чипів',
        customIcon: 'власна іконка',
        customIconAndColor: 'власна іконка та колір',
        halfSteps: 'половинні кроки',
        customLabel: 'власна мітка',
        customSize: 'власний розмір',
        linearFlow: 'лінійний потік',
        manyLevels: 'багато рівнів',
        notAnimated: 'без анімації',
        numberOfStars: 'кількість зірок',
        minimumOne: 'мінімум 1 зірка',
        outputFormats: 'формати виводу',
        quarterHourSteps: 'кроки по чверть години',
        readonly: 'лише для читання',
        singleFile: 'один файл',
        stepped: 'покроковий',
        sundayStart: 'початок з неділі',
        twelveHourFormat: '12-годинний формат',
        twoActions: 'дві дії',
        withCompletedSteps: 'із завершеними кроками',
        withConstraints: 'з обмеженнями',
        withInitialValue: 'з початковим значенням',
        withMaxlength: 'з максимальною довжиною',
        withMaxHeight: 'з максимальною висотою',
        withMinMaxLabels: 'з мін/макс мітками',
        withOptionalStep: 'з необов’язковим кроком',
        withSeconds: 'із секундами',
        withSelection: 'з вибором',
        withoutAlpha: 'без прозорості',
        withoutSearch: 'без пошуку',
        withoutSelectAll: 'без вибору всіх',
        wrapping: 'перенесення',
      },
      common: {
        small: 'Малий',
        medium: 'Середній',
        large: 'Великий',
        cancel: 'Скасувати',
        save: 'Зберегти',
        close: 'Закрити',
        confirm: 'Підтвердити',
        disabled: 'Вимкнено',
        defaultLabel: 'За замовчуванням',
        successLabel: 'Успіх',
        warningLabel: 'Попередження',
        errorLabel: 'Помилка',
        infoLabel: 'Інформація',
      },
      demos: {
        accordion: {
          whatLabel: 'Що таке @eagami/ui?',
          whatBody:
            'Легка, доступна бібліотека компонентів Angular на основі CSS-змінних.',
          installLabel: 'Як його встановити?',
          installBody:
            'Виконайте pnpm add @eagami/ui, потім додайте глобальну таблицю стилів до вашого angular.json.',
          themeLabel: 'Чи можу я налаштувати тему?',
          themeBody:
            'Так, перевизначте будь-яку CSS-змінну на :root або обмежте перевизначення окремими компонентами.',
          sectionOneLabel: 'Розділ перший',
          sectionOneBody:
            'У множинному режимі кілька розділів можуть бути відкритими одночасно.',
          sectionTwoLabel: 'Розділ другий',
          sectionTwoBody: 'Вміст другого розділу.',
          disabledSectionLabel: 'Вимкнений розділ',
          disabledSectionBody: 'Цей вміст недоступний.',
        },
        alert: {
          defaultText: 'Це стандартне сповіщення',
          successText: 'Ваші зміни збережено',
          warningText: 'Ваш пробний період закінчується через 3 дні',
          errorText: 'Щось пішло не так, спробуйте ще раз',
          infoText: 'Доступна нова версія',
          dismissibleText: 'Це сповіщення можна закрити',
          tooltipSuppressed:
            'Спливаючі підказки пригнічуються на сенсорних пристроях, щоб уникнути липкої поведінки наведення. Перегляньте цей розділ на пристрої з мишею, щоб побачити демонстрації в дії.',
        },
        autocomplete: {
          startTyping: 'Почніть вводити…',
          hintText: 'Почніть вводити, щоб побачити збіги',
          errorText: 'Оберіть, будь ласка, породу собаки',
          breedPlaceholder: 'Порода собаки…',
          minMaxLabel: 'Мін. 2 символи, макс. 3 результати',
          minMaxPlaceholder: 'Введіть щонайменше 2 символи…',
        },
        avatarEditor: {
          result: 'Результат:',
        },
        badge: {
          successText: 'Активний',
          warningText: 'Очікує',
          newText: 'Новий',
        },
        button: {
          primary: 'Основна',
          secondary: 'Додаткова',
          ghost: 'Прозора',
          danger: 'Небезпека',
          toggleLoading: 'Перемкнути завантаження',
          fullWidth: 'На всю ширину',
          clickedToast: 'Кнопку натиснуто!',
        },
        card: {
          elevatedHeader: 'Піднята',
          elevatedBody: 'Картка з тінню.',
          outlinedHeader: 'З контуром',
          outlinedBody: 'Картка з рамкою.',
          filledHeader: 'Заповнена',
          filledBody: 'Картка з ненав’язливим тлом.',
          cardTitleHeader: 'Заголовок картки',
          cardWithFooterBody:
            'Ця картка має заголовок, тіло та нижній колонтитул з діями.',
        },
        checkbox: {
          acceptTermsAndConditions: 'Прийняти умови та положення',
          disabledChecked: 'Вимкнено з позначкою',
          indeterminate: 'Невизначено',
          iAgreeToTerms: 'Я погоджуюся з умовами',
          subscribeToUpdates: 'Підписатися на оновлення',
          subscribeHint: 'Надсилається щомісячний дайджест, без спаму',
          acceptTermsLabel: 'Прийняти умови',
          acceptTermsError: 'Щоб продовжити, потрібно прийняти умови',
        },
        codeInput: {
          verificationCodeLabel: 'Код підтвердження',
          verificationCodeHint: 'Перевірте електронну пошту на 6-значний код',
          verificationCodeError: 'Недійсний код підтвердження',
          pinLabel: 'PIN',
          pinHint: 'Введіть свій 4-значний PIN',
        },
        colorPicker: {
          brandLabel: 'Колір бренду',
          hintBrandColor: 'Використовується як основний колір бренду',
          errorRequired: 'Це поле обов’язкове',
          hexLabel: 'Формат HEX',
          rgbLabel: 'Формат RGB',
          hslLabel: 'Формат HSL',
          noAlphaHeading: 'Лише непрозорий',
          opaqueOnlyLabel: 'Суцільний колір',
        },
        dataTable: {
          tableColumnId: 'ID',
          tableColumnFirstName: 'Ім’я',
          tableColumnLastName: 'Прізвище',
          tableColumnAdmin: 'Адмін',
          tableColumnPosts: 'Дописи',
        },
        datePicker: {
          appointmentLabel: 'Зустріч',
          pickDatePlaceholder: 'Оберіть дату…',
          hintAnyFutureDate: 'Оберіть будь-яку майбутню дату',
          errorRequired: 'Це поле обов’язкове',
          shortLabel: 'Короткий',
          mediumLabel: 'Середній',
          longLabel: 'Довгий',
          withinNextWeeksLabel: 'Протягом наступних 3 тижнів',
          withinNextWeeksHint: '±1 тиждень / +3 тижні від сьогодні',
        },
        dialog: {
          openButton: 'Відкрити діалог',
          title: 'Заголовок діалогу',
          body: 'Це тіло діалогу. Воно підтримує будь-який вміст, включно з формами, текстом та іншими компонентами.',
        },
        divider: {
          orLabel: 'або',
          sectionLabel: 'Розділ',
          leftLabel: 'Ліворуч',
          rightLabel: 'Праворуч',
        },
        drawer: {
          openButton: 'Відкрити панель',
          rightButton: 'Праворуч',
          leftButton: 'Ліворуч',
          topButton: 'Зверху',
          bottomButton: 'Знизу',
          rightTitle: 'Права панель',
          rightBody: 'Висувається з правого краю, корисна для панелей деталей.',
          leftTitle: 'Ліва панель',
          leftBody: 'Висувається зліва, корисна для меню навігації.',
          topTitle: 'Верхня панель',
          topBody: 'Опускається згори, корисна для сповіщень.',
          bottomTitle: 'Нижня панель',
          bottomBody: 'Піднімається знизу, поширена на мобільних для аркушів дій.',
        },
        dropdown: {
          fruitLabel: 'Фрукт',
          fruitPlaceholder: 'Оберіть фрукт…',
          hintFavourite: 'Оберіть свій улюблений',
          errorRequired: 'Це поле обов’язкове',
          selectPlaceholder: 'Оберіть…',
        },
        emptyState: {
          noItemsTitle: 'Ще немає елементів',
          noItemsDescription: 'Почніть зі створення свого першого елемента.',
          createItem: 'Створити елемент',
          noResultsTitle: 'Результатів не знайдено',
          noResultsDescription:
            'Спробуйте скоригувати пошук або фільтр, щоб знайти те, що шукаєте.',
          clearFilters: 'Очистити фільтри',
          nothingHereTitle: 'Тут немає на що дивитися',
        },
        fileUploader: {
          attachmentsLabel: 'Вкладення',
          imagesLabel: 'Завантажити зображення',
          imagesHint: 'PNG або JPEG, до 2 МБ кожне, макс. 4 файли',
          resumeLabel: 'Завантажити резюме',
          customIconLabel: 'Прикріпити файли',
          withHintHint: 'До 10 МБ на файл',
          withErrorText: 'Потрібне щонайменше одне зображення',
        },
        formField: {
          emailPlaceholder: 'you@example.com',
        },
        input: {
          defaultLabel: 'За замовчуванням',
          enterTextPlaceholder: 'Введіть текст…',
          hintGuidance: 'Тут наводиться корисна підказка',
          errorRequired: 'Це поле обов’язкове',
          readonlyLabel: 'Лише для читання',
          readonlyValue: 'Значення лише для читання',
          passwordLabel: 'Пароль',
          passwordPlaceholder: 'Введіть свій пароль…',
          passwordNoToggleLabel: 'Пароль (перемикач прихований)',
          passwordNoTogglePlaceholder: 'Без перемикача видимості',
          emailLabel: 'Електронна пошта',
          emailPlaceholder: 'you@example.com',
        },
        menu: {
          openButton: 'Відкрити меню',
          edit: 'Редагувати',
          duplicate: 'Дублювати',
          archive: 'Архівувати',
          delete: 'Видалити',
          file: 'Файл',
          moreOptionsLabel: 'Більше параметрів',
          view: 'Перегляд',
          rename: 'Перейменувати',
          newItem: 'Новий',
          open: 'Відкрити',
          saveUnavailable: 'Зберегти (недоступно)',
          saveAs: 'Зберегти як',
        },
        popover: {
          openLabel: 'Відкрити поповер',
          basicContent:
            'Плаваюча поверхня, прив’язана до свого тригера. Використовуйте її як будівельний блок для меню, випадних списків та власних накладок.',
          placementTopLabel: 'зверху',
          placementTopStartLabel: 'зверху-початок',
          placementTopEndLabel: 'зверху-кінець',
          placementBottomLabel: 'знизу',
          placementBottomStartLabel: 'знизу-початок',
          placementBottomEndLabel: 'знизу-кінець',
          placementLeftLabel: 'ліворуч',
          placementRightLabel: 'праворуч',
          placementTopContent: 'По центру над тригером',
          placementTopStartContent: 'Над тригером, вирівняно по його лівому краю',
          placementTopEndContent: 'Над тригером, вирівняно по його правому краю',
          placementBottomContent: 'По центру під тригером',
          placementBottomStartContent: 'Під тригером, вирівняно по його лівому краю',
          placementBottomEndContent: 'Під тригером, вирівняно по його правому краю',
          placementLeftContent: 'По центру ліворуч від тригера',
          placementRightContent: 'По центру праворуч від тригера',
        },
        progressBar: {
          processing: 'Обробка…',
        },
        radio: {
          appleLabel: 'Яблуко',
          bananaLabel: 'Банан',
          cherryLabel: 'Вишня',
          optionALabel: 'Варіант A',
          optionBLabel: 'Варіант B',
          subscriptionPlanLabel: 'Тарифний план',
          freeLabel: 'Безкоштовний',
          proLabel: 'Pro',
          enterpriseLabel: 'Корпоративний',
          deliverySpeedLabel: 'Швидкість доставки',
          deliverySpeedHint: 'Оберіть, наскільки швидко ви це хочете',
          standardLabel: 'Стандартна',
          expressLabel: 'Експрес',
          accountTypeLabel: 'Тип облікового запису',
          accountTypeError: 'Оберіть, будь ласка, тип облікового запису',
          personalLabel: 'Особистий',
          businessLabel: 'Бізнес',
        },
        rating: {
          experienceLabel: 'Оцініть свій досвід',
          halfStepsLabel: 'Оцінювання з половинним кроком',
          halfStepsHint:
            'Клацніть ліву або праву половину зірки, щоб задати кроки по 0,5.',
          readonlyLabel: 'Середня оцінка',
          withHintHint: 'Торкніться зірки, щоб задати оцінку',
          withErrorText: 'Оцінка обов’язкова',
          numberOfStarsLabel: 'Оцініть',
          customIconLabel: 'Наскільки сильно ви це любите?',
        },
        segmented: {
          viewLabel: 'Перегляд',
          themeLabel: 'Тема',
          themeHint: 'Впливає на весь застосунок',
          layoutLabel: 'Макет',
          layoutError: 'Вибір макета обов’язковий',
          viewOptionList: 'Список',
          viewOptionGrid: 'Сітка',
          viewOptionKanban: 'Канбан',
          themeOptionLight: 'Світла',
          themeOptionDark: 'Темна',
        },
        slider: {
          volumeLabel: 'Гучність',
          brightnessLabel: 'Яскравість',
          withHintLabel: 'З підказкою',
          sliderHint:
            'Перетягніть повзунок або скористайтеся клавішами зі стрілками для коригування',
          withErrorLabel: 'З помилкою',
          sliderError: 'Оберіть, будь ласка, значення понад 50',
        },
        switch: {
          enableNotificationsLabel: 'Увімкнути сповіщення',
          disabledOnLabel: 'Вимкнено в увімкненому стані',
          confirmConsentLabel: 'Підтвердити згоду',
          marketingEmailsLabel: 'Маркетингові листи',
          marketingEmailsHint: 'Можна скасувати будь-коли',
          twoFactorAuthLabel: 'Двофакторна автентифікація',
          twoFactorAuthError: 'Двофакторна автентифікація має бути увімкнена',
        },
        tabs: {
          account: 'Обліковий запис',
          accountContent: 'Вміст налаштувань облікового запису',
          security: 'Безпека',
          securityContent: 'Вміст налаштувань безпеки',
          notifications: 'Сповіщення',
          notificationsContent: 'Налаштування сповіщень',
          overview: 'Огляд',
          overviewContent: 'Вміст огляду',
          analytics: 'Аналітика',
          analyticsContent: 'Вміст аналітики',
          reports: 'Звіти',
          reportsContent: 'Вміст звітів',
          general: 'Загальне',
          generalContent: 'Загальні налаштування',
          billing: 'Оплата',
          billingContent: 'Деталі оплати',
          admin: 'Адмін',
          adminContent: 'Адмінпанель',
        },
        tag: {
          disabledSuccess: 'Вимкнений успіх',
        },
        textarea: {
          messageLabel: 'Повідомлення',
          messagePlaceholder: 'Введіть своє повідомлення…',
          hintMaxCharacters: 'Максимум 500 символів',
          errorRequired: 'Це поле обов’язкове',
          fixedSizeLabel: 'Фіксований розмір',
          fixedSizePlaceholder: 'Розмір неможливо змінити',
          readonlyLabel: 'Лише для читання',
          readonlyValue: 'Вміст лише для читання',
        },
        toast: {
          message: variant => {
            return `Це ${variant} тост`;
          },
        },
        tooltip: {
          triggerLabel: '(наведи на мене)',
          topLabel: 'Зверху',
          topTooltip: 'Підказка зверху',
          bottomLabel: 'Знизу',
          bottomTooltip: 'Підказка знизу',
          leftLabel: 'Ліворуч',
          leftTooltip: 'Підказка ліворуч',
          rightLabel: 'Праворуч',
          rightTooltip: 'Підказка праворуч',
        },
        transferList: {
          sourceLabel: 'Доступні',
          targetLabel: 'Обрані',
          roleAdmin: 'Адмін',
          roleEditor: 'Редактор',
          roleViewer: 'Глядач',
          roleGuest: 'Гість',
          roleBilling: 'Оплата',
          roleOwner: 'Власник',
        },
        virtualList: {
          row: 'Рядок',
          detail: n => `Згенерований запис #${n}`,
          scrollPosition: (first, total) =>
            `Показано рядок ${first.toLocaleString('uk-UA')} з ${total.toLocaleString('uk-UA')}`,
        },
        commandPalette: {
          hint: 'Натисніть Ctrl + K (або Cmd + K), щоб відкрити палітру команд будь-де на цій сторінці.',
          openButton: 'Відкрити палітру команд',
          fileGroup: 'Файл',
          editGroup: 'Редагувати',
          newFile: 'Новий файл',
          openFile: 'Відкрити файл',
          save: 'Зберегти',
          find: 'Знайти',
          findKeyword: 'пошук',
          replace: 'Замінити',
          undo: 'Скасувати',
          toggleTheme: 'Перемкнути тему',
          toggleThemeDescription: 'Перемикання між світлим і темним режимом',
          lockWorkspace: 'Заблокувати робочий простір',
          lockWorkspaceDescription: 'Наразі вимкнено, функція в бета-версії',
          executedToast: label => `Виконано: ${label}`,
        },
        avatarEditorActions: {
          avatarUpdatedToast: 'Аватар оновлено',
        },
      },
      playground: {
        controls: 'Елементи керування',
        reset: 'Скинути',
        code: 'Код',
        apiReference: 'Довідник API',
        inputs: 'Вхідні параметри',
        outputs: 'Вихідні параметри',
        methods: 'Методи',
        colName: 'Назва',
        colType: 'Тип',
        colDefault: 'За замовчуванням',
        colDescription: 'Опис',
        errorMessagesDescription:
          'Перевизначає повідомлення валідації для кожного ключа помилки для прив’язаного елемента керування формою; невстановлені ключі використовують локалізоване значення за замовчуванням.',
        ariaLabelDescription:
          'Доступне ім’я, що оголошується допоміжними технологіями, коли компонент не рендерить видимої мітки.',
        triggerErrorLabel: 'Викликати помилку',
        requiredBadge: 'обов’язковий',
        twoWayBadge: 'двостороннє',
        rangeHint: { between: 'до', min: 'Мін', max: 'Макс' },
        knobLabels: {
          timeline: { orientation: 'Орієнтація', align: 'Вирівнювання', size: 'Розмір' },
          tooltip: {
            eaTooltip: 'Вміст підказки',
          },
          input: {
            label: 'Мітка',
            placeholder: 'Заповнювач',
            size: 'Розмір',
            type: 'Тип',
            disabled: 'Вимкнено',
            readonly: 'Лише для читання',
            required: 'Обов’язковий',
            autofocus: 'Автофокус',
            showPasswordToggle: 'Показати перемикач пароля',
            clearable: 'Очищуваний',
            autocomplete: 'Автозаповнення',
          },
          'number-input': {
            allowNegative: 'Дозволити від’ємні',
            label: 'Мітка',
            placeholder: 'Заповнювач',
            size: 'Розмір',
            min: 'Мінімум',
            max: 'Максимум',
            step: 'Крок',
            disabled: 'Вимкнено',
            readonly: 'Лише для читання',
            required: 'Обов’язковий',
          },
          'form-field': {
            label: 'Мітка',
            hint: 'Підказка',
            required: 'Обов’язковий',
          },
          alert: {
            variant: 'Варіант',
            dismissible: 'Закриваний',
            size: 'Розмір',
            icon: 'Іконка (перевизначення)',
          },
          avatar: {
            size: 'Розмір',
            shape: 'Форма',
            src: 'Джерело зображення',
            initials: 'Ініціали',
            alt: 'Альтернативний текст',
          },
          badge: {
            variant: 'Варіант',
            size: 'Розмір',
            shape: 'Форма',
          },
          button: {
            variant: 'Варіант',
            size: 'Розмір',
            type: 'Тип',
            disabled: 'Вимкнено',
            loading: 'Завантаження',
            fullWidth: 'На всю ширину',
          },
          card: {
            variant: 'Варіант',
            padding: 'Внутрішній відступ',
            headerAlign: 'Вирівнювання заголовка',
            fullWidth: 'На всю ширину',
            headerDivider: 'Роздільник заголовка',
          },
          checkbox: {
            label: 'Мітка',
            count: 'Лічильник',
            size: 'Розмір',
            disabled: 'Вимкнено',
            required: 'Обов’язковий',
            indeterminate: 'Невизначений',
          },
          'code-input': {
            size: 'Розмір',
            length: 'Довжина',
            label: 'Мітка',
            placeholder: 'Заповнювач',
            disabled: 'Вимкнено',
            readonly: 'Лише для читання',
            required: 'Обов’язковий',
          },
          'color-picker': {
            label: 'Мітка',
            placeholder: 'Заповнювач',
            size: 'Розмір',
            format: 'Формат',
            showAlpha: 'Показати прозорість',
            clearable: 'Очищення',
            disabled: 'Вимкнено',
            readonly: 'Лише для читання',
            required: 'Обов’язковий',
          },
          divider: {
            orientation: 'Орієнтація',
            label: 'Мітка',
          },
          'eagami-wordmark': {
            variant: 'Варіант',
            layout: 'Макет',
            size: 'Розмір (px)',
          },
          'empty-state': {
            size: 'Розмір',
            headingLevel: 'Рівень заголовка',
            title: 'Заголовок',
            description: 'Опис',
          },
          paginator: {
            align: 'Вирівнювання',
            showPageSizeSelector: 'Показати вибір розміру сторінки',
            showRangeLabel: 'Показати мітку діапазону',
            disabled: 'Вимкнено',
            totalItems: 'Загальна кількість елементів',
          },
          'progress-bar': {
            variant: 'Варіант',
            size: 'Розмір',
            value: 'Значення',
            max: 'Макс',
            buffer: 'Буфер',
            showPercentage: 'Показати відсоток',
            indeterminate: 'Невизначений',
            label: 'Мітка',
          },
          radio: {
            label: 'Мітка',
            disabled: 'Вимкнено',
          },
          'range-slider': {
            label: 'Мітка',
            hint: 'Підказка',
            errorMsg: 'Повідомлення про помилку',
            min: 'Мінімум',
            max: 'Максимум',
            step: 'Крок',
            size: 'Розмір',
            showValue: 'Показати значення',
            showMinMaxLabels: 'Показати мін/макс мітки',
            disabled: 'Вимкнено',
            required: 'Обов’язковий',
          },
          rating: {
            label: 'Мітка',
            size: 'Розмір',
            min: 'Мінімум',
            max: 'Максимум',
            allowHalf: 'Дозволити половинні кроки',
            readonly: 'Лише для читання',
            disabled: 'Вимкнено',
            required: 'Обов’язковий',
            clearable: 'Очищуваний',
            iconClass: 'Іконка',
          },
          skeleton: {
            variant: 'Варіант',
            animated: 'Анімований',
            width: 'Ширина',
            height: 'Висота',
          },
          slider: {
            size: 'Розмір',
            min: 'Мін',
            max: 'Макс',
            step: 'Крок',
            showValue: 'Показати значення',
            showMinMaxLabels: 'Показати мін/макс мітки',
            disabled: 'Вимкнено',
            required: 'Обов’язковий',
            hasError: 'Стан помилки',
            label: 'Мітка',
          },
          spinner: {
            size: 'Розмір',
            label: 'Мітка',
          },
          switch: {
            label: 'Мітка',
            size: 'Розмір',
            disabled: 'Вимкнено',
            required: 'Обов’язковий',
          },
          tag: {
            variant: 'Варіант',
            size: 'Розмір',
            removable: 'Видаляний',
            disabled: 'Вимкнено',
            removeLabel: 'Мітка видалення',
          },
          textarea: {
            label: 'Мітка',
            placeholder: 'Заповнювач',
            size: 'Розмір',
            resize: 'Зміна розміру',
            maxlength: 'Максимальна довжина (символів)',
            minHeight: 'Мінімальна висота (px)',
            maxHeight: 'Максимальна висота (px)',
            disabled: 'Вимкнено',
            readonly: 'Лише для читання',
            required: 'Обов’язковий',
          },
        },
        knobNotes: { accordion: { headingLevel: '(лише семантично)' } },

        descriptions: {
          timeline: {
            items: 'Події для відображення, за порядком.',
            orientation: 'Напрямок, у якому йде часова шкала.',
            align:
              'Розташування вмісту відносно лінії; alternate застосовується лише до вертикальних шкал.',
            size: 'Візуальний розмір часової шкали.',
          },
          toast: {
            position: 'Кут або край вікна перегляду, до якого прикріплено стек тостів.',
            clearable: 'Показує кнопку закриття на кожному тості.',
          },
          input: {
            label: 'Текстова мітка, що рендериться над полем.',
            type: 'Нативний тип input (password додає вбудований перемикач показати/приховати).',
            placeholder: 'Заповнювач, що показується, поки поле порожнє.',
            size: 'Візуальний розмір поля.',
            hint: 'Допоміжний текст під полем, прихований, поки показується помилка.',
            errorMsg:
              'Повідомлення про помилку під полем, що замінює підказку та позначає поле недійсним.',
            disabled: 'Вимикає поле.',
            readonly: 'Рендерить поле лише для читання.',
            required: 'Позначає поле як обов’язкове.',
            autocomplete: 'Значення для нативного атрибута autocomplete.',
            list: 'id <datalist>, що пов’язується для нативних пропозицій.',
            autofocus: 'Фокусує поле один раз, після його першого рендеру.',
            showPasswordToggle: 'Показує перемикач розкриття для полів пароля.',
            clearable: 'Показує кнопку очищення, поки поле має значення.',
            id: 'id, що застосовується до нативного input і label for, генерується автоматично, якщо пропущено.',
            value: 'Поточне значення поля, двостороннє прив’язування через [(value)].',
            blurred: 'Спрацьовує, коли поле втрачає фокус.',
            focused: 'Спрацьовує, коли поле отримує фокус.',
            clear: 'Очищає поточне значення та повертає фокус на поле.',
            focus: 'Переміщує фокус клавіатури на нативне поле, що лежить в основі.',
            togglePasswordVisibility:
              'Перемикає стан розкриття пароля для полів type="password".',
            icon: 'Провідний компонент іконки, що рендериться перед текстом.',
            max: 'Максимальне значення для type="number"; значення обмежується ним при втраті фокуса.',
            maxLength:
              'Максимальна кількість символів; примусово для type="number", де нативний maxlength ігнорується.',
            min: 'Мінімальне значення для type="number"; значення обмежується ним при втраті фокуса.',
            minLength:
              'Мінімальна кількість символів, передається як нативний атрибут minlength.',
            step: 'Крок збільшення для полів type="number".',
            clampToBounds:
              'Обмежує числове значення в межах налаштованого діапазону мін/макс після завершення редагування.',
          },
          'number-input': {
            allowNegative:
              'Чи дозволені від’ємні значення; при false нижня межа дорівнює 0.',
            label: 'Текстова мітка, що рендериться над полем.',
            placeholder: 'Заповнювач, що показується, поки поле порожнє.',
            size: 'Візуальний розмір поля.',
            hint: 'Допоміжний текст під полем, прихований, поки показується помилка.',
            errorMsg:
              'Повідомлення про помилку під полем, що замінює підказку та позначає поле недійсним.',
            disabled: 'Вимикає поле.',
            readonly: 'Рендерить поле лише для читання.',
            required: 'Позначає поле як обов’язкове.',
            min: 'Мінімальне значення; введені значення обмежуються ним при втраті фокуса, і кнопки кроку його враховують.',
            max: 'Максимальне значення; введені значення обмежуються ним при втраті фокуса, і кнопки кроку його враховують.',
            step: 'Величина, яку кожен крок (клавіша зі стрілкою або кнопка кроку) додає або віднімає.',
            id: 'id, що застосовується до нативного input і label for, генерується автоматично, якщо пропущено.',
            value:
              'Поточне значення поля; null, коли порожнє, двостороннє прив’язування через [(value)].',
            changed: 'Спрацьовує з новим значенням щоразу, коли воно змінюється.',
            focused: 'Спрацьовує, коли поле отримує фокус.',
            blurred: 'Спрацьовує, коли поле втрачає фокус.',
            focus: 'Переміщує фокус клавіатури на нативне поле, що лежить в основі.',
          },
          accordion: {
            multi: 'Дозволяє кільком елементам залишатися розгорнутими одночасно.',
            headingLevel:
              'Рівень заголовка (1-6), що застосовується до заголовка кожного елемента, щоб акордеон вписувався в структуру сторінки.',
          },
          alert: {
            dismissible:
              'Показує кнопку закриття, що дозволяє користувачу закрити сповіщення.',
            variant:
              'Семантична кольорова схема, що керує іконкою та палітрою сповіщення.',
            visible:
              'Чи показано сповіщення, двостороннє прив’язування через [(visible)].',
            dismissed:
              'Спрацьовує, коли користувач закриває сповіщення через його кнопку закриття.',
            dismiss: 'Приховує сповіщення та видає подію dismissed.',
            size: 'Масштабує текст, іконку та проміжок разом.',
            icon: 'Перевизначає стандартну статусну іконку варіанта будь-яким компонентом іконки.',
          },
          avatar: {
            src: 'URL зображення для відображення; повертається до ініціалів, потім до загальної іконки користувача.',
            alt: 'Альтернативний текст для зображення аватара.',
            initials: 'Ініціали, що показуються, коли джерело зображення не надано.',
            size: 'Передустановка діаметра для аватара.',
            shape: 'Контур аватара: круглий або заокруглений квадрат.',
          },
          badge: {
            variant: 'Семантична кольорова схема бейджа.',
            size: 'Візуальний розмір бейджа.',
            shape:
              'Зовнішня форма бейджа (pill облягає вміст, pin рендериться як коло для одиночних символів).',
          },
          button: {
            variant: 'Візуальний стиль кнопки, що визначає її колір і акцент.',
            size: 'Візуальний розмір кнопки.',
            type: 'Нативний атрибут type, що застосовується до елемента button, який лежить в основі.',
            disabled: 'Вимикає кнопку та пригнічує події кліку.',
            loading: 'Замінює мітку на спінер, зберігаючи відрендерену ширину.',
            fullWidth: 'Розтягує кнопку, щоб заповнити ширину свого контейнера.',
            ariaLabel: 'Доступна мітка для кнопки, коли її вміст недостатньо описовий.',
            ariaCurrent:
              'Значення для нативного атрибута aria-current, що позначає кнопку як поточний елемент у наборі.',
            clicked:
              'Спрацьовує, коли кнопку активовано, пригнічено у вимкненому стані або під час завантаження.',
            icon: 'Необов’язковий компонент іконки, що рендериться ліворуч від мітки.',
          },
          card: {
            variant: 'Візуальний стиль поверхні картки.',
            padding: 'Передустановка внутрішнього відступу для області вмісту картки.',
            headerAlign: 'Горизонтальне вирівнювання вмісту заголовка.',
            fullWidth: 'Розтягує картку, щоб заповнити доступну ширину.',
            headerDivider: 'Показує роздільник між заголовком і тілом.',
          },
          checkbox: {
            ariaLabel: 'Доступне ім’я для прапорця, коли не рендериться видима мітка.',
            checked:
              'Поточний стан позначки, двостороннє прив’язування через [(checked)].',
            count: 'Додаткове значення, що показується приглушеним одразу після мітки.',
            disabled: 'Вимикає прапорець.',
            errorMsg:
              'Повідомлення про помилку під полем, що замінює підказку та позначає поле недійсним.',
            hint: 'Допоміжний текст під полем, прихований, поки показується помилка.',
            id: 'id, що застосовується до нативного input і label for, генерується автоматично, якщо пропущено.',
            indeterminate: 'Рендерить прапорець у візуально невизначеному стані.',
            label: 'Текстова мітка, що рендериться поряд із прапорцем.',
            required: 'Позначає прапорець як обов’язковий.',
            size: 'Візуальний розмір прапорця.',
            changed:
              'Спрацьовує з новим станом позначки щоразу, коли користувач перемикає прапорець.',
          },
          'code-input': {
            disabled: 'Вимикає кожну комірку цифри.',
            errorMsg:
              'Повідомлення про помилку під полем, що замінює підказку та позначає поле недійсним.',
            hint: 'Допоміжний текст під полем, прихований, поки показується помилка.',
            id: 'id, що застосовується до комірок цифр і label for, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться над полем.',
            length: 'Кількість комірок цифр, з яких складається код.',
            placeholder: 'Текст заповнювача, розподілений по одному символу на комірку.',
            readonly: 'Рендерить поле лише для читання.',
            required: 'Позначає поле як обов’язкове.',
            size: 'Візуальний розмір кожної комірки цифри.',
            value: 'Поточне значення коду, двостороннє прив’язування через [(value)].',
            completed: 'Спрацьовує з повним кодом, щойно введено кожну цифру.',
            focus:
              'Переміщує фокус клавіатури на наступну порожню цифру (або останню, коли заповнено).',
            allowAllChars:
              'Дозволяє будь-який символ без пробілів; коли вимкнено, приймаються лише цифри.',
          },
          'color-picker': {
            disabled: 'Вимикає поле.',
            errorMsg:
              'Повідомлення про помилку під полем, що замінює підказку та позначає поле недійсним.',
            format: 'Формат виводу видаваного значення кольору (hex, rgb або hsl).',
            hint: 'Допоміжний текст під полем, прихований, поки показується помилка.',
            id: 'id, що застосовується до тригера і label for, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться над полем.',
            placeholder: 'Заповнювач, що показується на тригері, поки колір не обрано.',
            presets:
              'Передустановлені зразки внизу поповера; передайте порожній масив, щоб приховати їх.',
            readonly: 'Рендерить поле лише для читання, не даючи поповеру відкритися.',
            required: 'Позначає поле як обов’язкове.',
            showAlpha:
              'Показує повзунок прозорості та включає прозорість у видаване значення.',
            clearable: 'Чи показувати кнопку очищення, коли задано значення.',
            size: 'Візуальний розмір тригера вибору.',
            value: 'Поточний рядок кольору, двостороннє прив’язування через [(value)].',
            changed: 'Спрацьовує з новим рядком кольору щоразу, коли змінюється вибір.',
            cycleInputMode:
              'Перемикає рядок вводу поповера між hex-рядком і RGB-каналами.',
            hasEyeDropper: 'Повертає, чи підтримує браузер API EyeDropper.',
            onHexInput:
              'Застосовує введений hex-текст до поточного кольору, поки користувач його редагує.',
            onPopoverCloseRequested:
              'Закриває поповер, коли користувач клацає поза вибором.',
          },
          divider: {
            label:
              'Необов’язкова центрована мітка, що рендериться в межах лінії роздільника.',
            orientation: 'Орієнтація, у якій пролягає лінія роздільника.',
            thick: 'Рендерить товщу лінію.',
          },
          'eagami-wordmark': {
            variant:
              'Варіант вмісту: default це чистий вордмарк, byline додає рядок «створено вручну», tagline додає слоган.',
            layout: 'Розташовує вордмарк у стос по рядках або вбудовано в один рядок.',
            size: 'Значення в пікселях, від якого масштабується весь вордмарк.',
          },
          'empty-state': {
            title: 'Текст заголовка, що показується над описом.',
            description: 'Допоміжний текст, що показується під заголовком.',
            size: 'Візуальний розмір блока порожнього стану.',
            headingLevel:
              'Рівень заголовка, що використовується для заголовка, аби він вписувався в навколишню структуру документа.',
            bordered: 'Рендерить пунктирну рамку навколо блока.',
            icon: 'Необов’язковий компонент іконки, що рендериться в медіаобласті над заголовком.',
          },
          paginator: {
            groupThousands: 'Групує тисячі комами в діапазоні та номерах сторінок.',
            size: 'Візуальний розмір пагінатора та його елементів керування.',
            align:
              'Горизонтальне вирівнювання елементів керування пагінатора в межах їхнього контейнера.',
            disabled: 'Вимикає всі елементи керування пагінатора.',
            page: 'Поточний номер сторінки, двостороннє прив’язування через [(page)].',
            pageSize:
              'Кількість елементів, що показуються на сторінці, двостороннє прив’язування через [(pageSize)].',
            pageSizeOptions:
              'Доступні для вибору розміри сторінок, пропоновані у виборі розміру сторінки.',
            showPageSizeSelector: 'Показує елемент керування вибору розміру сторінки.',
            showRangeLabel: 'Показує мітку, що описує видимий діапазон елементів.',
            totalItems:
              'Загальна кількість елементів, що використовується для обчислення кількості сторінок.',
            changed:
              'Спрацьовує, коли користувач змінює або поточну сторінку, або розмір сторінки.',
            goToPage:
              'Переходить на задану сторінку, обмежену в межах дійсного діапазону.',
            nextPage: 'Переходить на наступну сторінку, якщо така існує.',
            prevPage: 'Переходить на попередню сторінку, якщо така існує.',
          },
          'progress-bar': {
            variant: 'Кольоровий варіант смуги.',
            size: 'Візуальна товщина смуги.',
            value: 'Поточне значення прогресу.',
            max: 'Значення, при якому смуга заповнена.',
            buffer:
              'Буферизована позиція попереду значення, показана додатковим кольором.',
            showPercentage: 'Показує поточний відсоток поряд зі смугою.',
            indeterminate:
              'Рендерить циклічну анімацію для прогресу невідомої тривалості.',
            label: 'Текстова мітка, що рендериться над смугою.',
          },
          radio: {
            disabled: 'Вимикає цей варіант.',
            id: 'id, що застосовується до нативного radio input і label for, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться поряд із радіокнопкою.',
            value:
              'Значення, яке цей варіант передає своїй батьківській групі при виборі.',
          },
          'range-slider': {
            ariaLabelHigh:
              'Доступна мітка для верхнього (кінцевого) повзунка, повертається до мітки поля, якщо пропущено.',
            ariaLabelLow:
              'Доступна мітка для нижнього (початкового) повзунка, повертається до мітки поля, якщо пропущено.',
            disabled: 'Вимикає повзунок.',
            errorMsg:
              'Повідомлення про помилку під повзунком, що замінює підказку та позначає поле недійсним.',
            formatValue:
              'Форматувальник, що застосовується до кожного значення перед його відображенням.',
            hint: 'Допоміжний текст під повзунком, прихований, поки показується помилка.',
            id: 'id, що застосовується до повзунка, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться над повзунком.',
            max: 'Найвище значення, якого може досягти будь-який повзунок.',
            min: 'Найнижче значення, якого може досягти будь-який повзунок.',
            required: 'Позначає поле як обов’язкове.',
            showMinMaxLabels: 'Показує межі мін і макс на кінцях доріжки.',
            showValue: 'Показує поточні нижнє та верхнє значення поряд із повзунком.',
            size: 'Візуальний розмір доріжки та повзунків.',
            step: 'Крок збільшення, до якого прив’язується кожен повзунок під час руху.',
            value:
              'Поточний кортеж діапазону [low, high], двостороннє прив’язування через [(value)].',
            changed:
              'Спрацьовує з новим кортежем [low, high] щоразу, коли рухається будь-який повзунок.',
            commitThumb:
              'Прив’язує повзунок до найближчого кроку, обмежує його межами та обмежує протилежним повзунком.',
            groupThousands:
              'Групує відображувані значення розділювачами тисяч, ігнорується, коли надано власне formatValue.',
            formatDisplay:
              'Форматує значення для відображення, застосовуючи групування тисяч, якщо не встановлено власну функцію formatValue.',
          },
          rating: {
            allowHalf:
              'Дозволяє гранулярність півзірки, дозволяючи значенню рухатися кроками по 0,5.',
            clearable: 'Клік по поточному значенню скидає оцінку назад до 0.',
            disabled: 'Вимикає оцінювання.',
            errorMsg:
              'Повідомлення про помилку під оцінюванням, що замінює підказку та позначає його недійсним.',
            halfIconClass:
              'Клас самостійного компонента, що рендериться для половинних позицій, коли allowHalf увімкнено.',
            hint: 'Допоміжний текст під оцінюванням, прихований, поки показується помилка.',
            iconClass:
              'Клас самостійного компонента, що рендериться для порожніх і повних позицій.',
            id: 'id, що застосовується до оцінювання та його мітки, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться над оцінюванням.',
            max: 'Найвище значення оцінки та кількість відрендерених зірок.',
            min: 'Найнижче значення оцінки, яке користувач може обрати.',
            readonly:
              'Рендерить оцінювання лише для відображення, ігноруючи кліки та ввід з клавіатури.',
            required: 'Позначає оцінювання як обов’язкове.',
            size: 'Візуальний розмір оцінювання.',
            value: 'Поточне значення оцінки, двостороннє прив’язування через [(value)].',
            hoverChanged:
              'Спрацьовує з попередньо переглянутим значенням під час наведення та з null, коли курсор залишає елемент.',
            iconForState:
              'Повертає клас компонента для інстанціювання для заданого стану зірки.',
            stateFor:
              'Визначає стан рендеру (порожній, половинний або повний) для позиції зірки.',
          },
          skeleton: {
            animated:
              'Програє пульсуючу анімацію мерехтіння, автоматично пригнічену, коли користувач надає перевагу зменшеному руху.',
            height:
              'Явна CSS-висота, що застосовується до заповнювача, зі стандартним поверненням до власного розміру форми, якщо пропущено.',
            variant:
              'Передустановка форми заповнювача: текстовий рядок, коло або прямокутник.',
            width:
              'Явна CSS-ширина, що застосовується до заповнювача, зі стандартним поверненням до власного розміру форми, якщо пропущено.',
          },
          slider: {
            ariaLabel:
              'Доступна мітка, що застосовується, коли не рендериться видима мітка.',
            disabled: 'Вимикає повзунок.',
            errorMsg:
              'Повідомлення про помилку під повзунком, що замінює підказку та позначає поле недійсним.',
            formatValue:
              'Форматувальник, що перетворює числове значення на відображуваний текст.',
            hasError:
              'Примусово застосовує стиль стану помилки без прив’язування повідомлення про помилку.',
            hint: 'Допоміжний текст під повзунком, прихований, поки показується помилка.',
            id: 'id, що застосовується до повзунка та його мітки, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться над повзунком.',
            max: 'Найвище значення, якого може досягти повзунок.',
            min: 'Найнижче значення, якого може досягти повзунок.',
            required: 'Позначає повзунок як обов’язковий.',
            showMinMaxLabels: 'Показує межі мін і макс під доріжкою.',
            showValue: 'Показує поточне значення поряд із міткою.',
            size: 'Візуальний розмір доріжки та повзунка слайдера.',
            step: 'Крок збільшення, до якого прив’язується значення під час руху повзунка.',
            value:
              'Поточне значення повзунка, двостороннє прив’язування через [(value)].',
            changed:
              'Спрацьовує з новим прив’язаним значенням щоразу, коли рухається повзунок.',
            groupThousands:
              'Групує відображувані значення розділювачами тисяч, ігнорується, коли надано власне formatValue.',
            formatDisplay:
              'Форматує значення для відображення, застосовуючи групування тисяч, якщо не встановлено власну функцію formatValue.',
          },
          spinner: {
            label:
              'Доступна мітка, що оголошується допоміжним технологіям, повертається до перекладу активної мови, якщо не встановлено.',
            size: 'Візуальний розмір спінера.',
          },
          switch: {
            ariaLabel: 'Доступна мітка для перемикача, коли не рендериться видима мітка.',
            checked:
              'Поточний стан увімкнено/вимкнено, двостороннє прив’язування через [(checked)].',
            disabled: 'Вимикає перемикач і блокує перемикання.',
            errorMsg:
              'Повідомлення про помилку під перемикачем, що замінює підказку та позначає поле недійсним.',
            hint: 'Допоміжний текст під перемикачем, прихований, поки показується помилка.',
            id: 'id, що застосовується до прапорця, який лежить в основі, і label for, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться поряд із перемикачем.',
            required: 'Позначає перемикач як обов’язковий.',
            size: 'Візуальний розмір перемикача.',
            changed:
              'Спрацьовує з новим станом позначки щоразу, коли користувач перемикає перемикач.',
          },
          tag: {
            variant: 'Семантична кольорова схема тега.',
            size: 'Візуальний розмір тега.',
            removable: 'Рендерить кнопку видалення, що видає removed при активації.',
            disabled: 'Вимикає тег і його кнопку видалення.',
            removeLabel:
              'Доступна мітка для кнопки видалення, повертається до активної мови.',
            removed:
              'Спрацьовує, коли користувач активує кнопку видалення на видаляному тезі.',
          },
          textarea: {
            disabled: 'Вимикає поле.',
            errorMsg:
              'Повідомлення про помилку під полем, що замінює підказку та позначає поле недійсним.',
            hint: 'Допоміжний текст під полем, прихований, поки показується помилка.',
            id: 'id, що застосовується до нативного textarea і label for, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться над полем.',
            maxHeight:
              'Піксельна стеля для висоти поля; поза нею textarea прокручується вертикально, замість того щоб рости.',
            minHeight: 'Мінімальна висота в px; ніколи не менша за стандартну висоту.',
            maxlength: 'Максимальна кількість символів, яку приймає поле.',
            placeholder: 'Заповнювач, що показується, поки поле порожнє.',
            readonly: 'Рендерить поле лише для читання.',
            required: 'Позначає поле як обов’язкове.',
            resize: 'Вісь, уздовж якої користувач може змінювати розмір поля.',
            size: 'Візуальний розмір поля.',
            value: 'Поточне значення поля, двостороннє прив’язування через [(value)].',
            blurred: 'Спрацьовує, коли поле втрачає фокус.',
            focused: 'Спрацьовує, коли поле отримує фокус.',
            focus: 'Переміщує фокус клавіатури на нативне textarea, що лежить в основі.',
          },
          'avatar-editor': {
            accept:
              'Прийнятні MIME-типи для вибору файлів, передаються до нативного input.',
            canvasSize: 'Ширина та висота в пікселях квадратного полотна обрізки.',
            cropState:
              'Початковий стан панорамування/масштабу, що відновлюється при завантаженні вихідного зображення.',
            currentSrc:
              'URL зображення для завантаження в редактор під час ініціалізації.',
            exportQuality:
              'Якість JPEG/WebP, що використовується при експорті обрізаного зображення, між 0 і 1.',
            exportType:
              'MIME-тип експортованого blob зображення (наприклад, image/png або image/jpeg).',
            loading: 'Показує накладку-скелет, поки завантажується зовнішній ресурс.',
            maxFileSize:
              'Максимально дозволений розмір файлу в байтах; файли понад цю межу видають errored.',
            maxZoom: 'Максимальний множник масштабу, якого може досягти користувач.',
            minZoom: 'Мінімальний множник масштабу, якого може досягти користувач.',
            shape:
              'Форма маски обрізки, що застосовується до полотна та експортованого зображення.',
            cropped:
              'Спрацьовує, коли користувач експортує обрізку, надаючи як Blob, так і data URL.',
            cropStateChanged:
              'Спрацьовує щоразу, коли користувач панорамує або масштабує зображення, корисно для збереження стану редагування.',
            errored:
              'Спрацьовує з людиночитним повідомленням, коли валідація файлу не вдається.',
            fileSelected:
              'Спрацьовує, коли файл обрано з диска або перетягнуто на редактор.',
            removed:
              'Спрацьовує, коли поточне зображення очищено через елемент керування видалення.',
            captureOriginal:
              'Позначає поточне зображення та стан обрізки як базовий для revertImage.',
            exportCrop:
              'Рендерить поточну обрізку на позаекранне полотно, видає cropped і вирішується з Blob.',
            openFilePicker: 'Відкриває нативний діалог вибору файлів.',
            removeImage:
              'Очищає завантажене зображення та скидає панорамування й масштаб до стандартних.',
            revertImage:
              'Відновлює зображення та стан обрізки, захоплені останнім викликом captureOriginal.',
            setZoom:
              'Встановлює рівень масштабу, обмежений налаштованим діапазоном minZoom і maxZoom.',
            updateImageDarkness:
              'Зчитує видиму область обрізки, щоб визначити, чи зображення темніше за середньо-сіре.',
          },
          'menu-trigger': {
            menu: 'Екземпляр ea-menu, яким керує цей тригер.',
          },
          tooltip: {
            maxWidth:
              'Максимальна ширина в пікселях; текст переноситься на цій ширині (нижня межа 50px).',
            eaTooltip:
              'Текстовий вміст підказки, що показується при наведенні та фокусі з клавіатури.',
            tooltipPosition: 'Розташування підказки відносно її host-елемента.',
          },
          'time-picker': {
            disabled: 'Вимикає вибір.',
            errorMsg:
              'Повідомлення про помилку під полем, що замінює підказку та позначає поле недійсним.',
            format:
              'Формат відображення мітки тригера; значення в даних завжди 24-годинне.',
            hint: 'Допоміжний текст під полем, прихований, поки показується помилка.',
            id: 'id, що застосовується до тригера і label for, генерується автоматично, якщо пропущено.',
            includeSeconds: 'Показує стовпець секунд поряд з годинами та хвилинами.',
            label: 'Текстова мітка, що рендериться над полем.',
            minuteStep:
              'Крок збільшення, до якого прив’язується стовпець хвилин при кроці або перетягуванні.',
            placeholder: 'Заповнювач, що показується на тригері, поки час не обрано.',
            readonly: 'Рендерить поле лише для читання, не даючи поповеру відкритися.',
            required: 'Позначає поле як обов’язкове.',
            secondStep:
              'Крок збільшення, до якого прив’язується стовпець секунд при кроці або перетягуванні.',
            size: 'Візуальний розмір тригера вибору.',
            value:
              'Поточний рядок часу у форматі HH:MM або HH:MM:SS (24-годинний), двостороннє прив’язування через [(value)], або null, коли не встановлено.',
            changed:
              'Спрацьовує з новим рядком часу щоразу, коли користувач змінює обраний час.',
            advanceFocus:
              'Переміщує фокус на наступний стовпець одиниць після завершення вводу цифри.',
            cannotExtend:
              'Повертає true, коли жодна додаткова цифра не може дійсно розширити поточний буфер для заданої одиниці.',
            commitDigits:
              'Парсить буферизований рядок цифр, обмежує його дійсним діапазоном одиниці та записує у значення.',
            flushBuffer:
              'Підтверджує будь-який очікуваний буфер введених цифр і очищає його.',
            focusHoursWhenReady:
              'Фокусує ввід годин, щойно поверхню поповера відрендерено в DOM.',
            hoursFromTyped:
              'Перетворює введене значення годин на його 24-годинний еквівалент, враховуючи поточний період AM/PM.',
            onPopoverCloseRequested:
              'Закриває поповер, коли користувач клацає поза вибором.',
            onSpinnerBlur:
              'Підтверджує будь-який очікуваний буфер цифр, коли стовпець спінера втрачає фокус.',
            onSpinnerFocus:
              'Виділяє весь текст у стовпці спінера, коли він отримує фокус, тож перше натискання клавіші замінює його.',
            onSpinnerInput:
              'Опрацьовує ввід цифр у стовпці спінера, оновлює буфер і автоматично переміщує фокус, коли стовпець заповнено.',
            startHold:
              'Починає повтор при довгому натисканні на кнопку-шеврон, крокуючи задану одиницю та прискорюючись після затримки.',
            step: 'Крокує заданий стовпець одиниць угору або вниз на один налаштований крок.',
            stopHold: 'Скасовує будь-які активні таймери повтору довгого натискання.',
            togglePeriod:
              'Перемикає період AM/PM у 12-годинному режимі, перемикаючи 12-годинне зміщення.',
          },
          autocomplete: {
            disabled: 'Вимикає поле.',
            emptyMessage:
              'Повідомлення, що показується у списку, коли жоден варіант не відповідає поточному вводу, повертається до перекладу активної мови, якщо пропущено.',
            errorMsg:
              'Повідомлення про помилку під полем, що замінює підказку та позначає поле недійсним.',
            hint: 'Допоміжний текст під полем, прихований, поки показується помилка.',
            id: 'id, що застосовується до нативного input і label for, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться над полем.',
            maxResults:
              'Максимальна кількість варіантів, що показуються у списку пропозицій одночасно.',
            minLength:
              'Мінімальна кількість символів, потрібна перед появою списку пропозицій.',
            options: 'Повний список варіантів, доступних для фільтрування та вибору.',
            placeholder: 'Заповнювач, що показується, поки поле порожнє.',
            readonly: 'Рендерить поле лише для читання.',
            required: 'Позначає поле як обов’язкове.',
            size: 'Візуальний розмір поля.',
            value: 'Поточне значення поля, двостороннє прив’язування через [(value)].',
            blurred: 'Спрацьовує, коли ввід втрачає фокус.',
            changed:
              'Спрацьовує щоразу, коли змінюється текст вводу, зокрема при вільному редагуванні.',
            focused: 'Спрацьовує, коли ввід отримує фокус.',
            selected: 'Спрацьовує, коли користувач обирає варіант зі списку пропозицій.',
            close: 'Закриває список пропозицій, не змінюючи поточного значення.',
            focus: 'Переміщує фокус клавіатури на текстовий ввід, що лежить в основі.',
            selectOption:
              'Програмно обирає заданий варіант, оновлюючи значення та закриваючи список.',
          },
          'command-palette': {
            emptyMessage:
              'Повідомлення, що показується, коли пошуковий запит не відповідає жодному елементу, повертається до перекладу активної мови, якщо пропущено.',
            items:
              'Повний список командних елементів, доступних для пошуку та виконання.',
            open: 'Чи відкрито діалог палітри, двостороннє прив’язування через [(open)].',
            placeholder:
              'Заповнювач, що показується всередині поля пошуку, поки воно порожнє.',
            execute:
              'Спрацьовує, коли користувач обирає команду, видаючи обраний елемент.',
            showActiveHighlight:
              'Повертає, чи має активний рядок рендерити своє підсвічене тло для заданого плаского індексу.',
          },
          tabs: {
            activeTab:
              'Значення поточно активної вкладки, двостороннє прив’язування через [(activeTab)].',
            size: 'Візуальний розмір вкладок.',
            variant: 'Візуальний стиль панелі вкладок: підкреслення або заповнення.',
            changed:
              'Спрацьовує зі значенням нової активної вкладки щоразу, коли активна вкладка змінюється.',
            registerTab:
              'Реєструє дочірню вкладку, щоб вона з’явилася на панелі вкладок; викликається автоматично через ea-tab.',
            selectTab: 'Програмно активує вкладку із заданим значенням.',
            unregisterTab:
              'Видаляє раніше зареєстровану дочірню вкладку; викликається автоматично через ea-tab.',
          },
          tab: {
            disabled: 'Вимикає цю вкладку, не даючи користувачу обрати її.',
            id: 'id, що застосовується до кнопки вкладки та її панелі, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що показується на кнопці вкладки.',
            value:
              'Унікальне значення, що ідентифікує цю вкладку в межах її батьківської групи ea-tabs.',
          },
          'date-picker': {
            disabled: 'Вимикає вибір дати.',
            errorMsg:
              'Повідомлення про помилку під полем, що замінює підказку та позначає поле недійсним.',
            format: 'Формат відображення обраної дати (короткий, середній або довгий).',
            hint: 'Допоміжний текст під полем, прихований, поки показується помилка.',
            id: 'id, що застосовується до тригера і label for, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться над полем.',
            locale:
              'Тег мови BCP 47, що використовується для форматування дати, повертається до глобальної мови, якщо пропущено.',
            maxDate:
              'Найпізніша дата, яку користувач може обрати; дати після неї вимкнено в календарі.',
            minDate:
              'Найраніша дата, яку користувач може обрати; дати до неї вимкнено в календарі.',
            placeholder: 'Заповнювач, що показується на тригері, поки дату не обрано.',
            readonly: 'Рендерить поле лише для читання, не даючи календарю відкритися.',
            required: 'Позначає поле як обов’язкове.',
            size: 'Візуальний розмір тригера вибору дати.',
            value: 'Поточна обрана дата, двостороннє прив’язування через [(value)].',
            weekStartsOn:
              'Перший день тижня в сітці календаря (0 для неділі, 1 для понеділка).',
            changed: 'Спрацьовує, коли обрана дата змінюється, зокрема при очищенні.',
            clear: 'Очищає обрану дату та видає changed з null.',
            close: 'Закриває поповер календаря.',
            focus: 'Переміщує фокус клавіатури на кнопку тригера.',
            onPopoverCloseRequested:
              'Закриває поповер, коли користувач клацає поза вибором дати.',
            open: 'Відкриває поповер календаря та переміщує фокус на сфокусовану комірку дня.',
            toggle: 'Перемикає поповер календаря між відкритим і закритим.',
          },
          menu: {
            maxHeight:
              'Максимальна висота прокручуваного списку як CSS-довжина; вищі меню прокручуються за неї.',
            ariaLabel:
              'Доступна мітка для списку меню, повертається до активної мови, якщо пропущено.',
            disabled: 'Вимикає меню, не даючи йому відкритися.',
            id: 'id, що застосовується до елемента списку меню, генерується автоматично, якщо пропущено.',
            open: 'Чи відкрито меню, двостороннє прив’язування через [(open)].',
            placement: 'Розташування списку меню відносно його елемента-тригера.',
            closed: 'Спрацьовує, коли меню закривається.',
            opened: 'Спрацьовує, коли меню відкривається.',
            close: 'Закриває меню та за бажанням повертає фокус на елемент-тригер.',
            focusFirstItem:
              'Переміщує фокус клавіатури на перший увімкнений елемент у меню.',
            onPopoverCloseRequested: 'Закриває меню, коли користувач клацає поза ним.',
            openAt:
              'Відкриває меню, прив’язане до заданого елемента-тригера, та фокусує перший елемент.',
            toggleAt:
              'Перемикає стан відкриття меню, прив’язуючи його до заданого елемента-тригера.',
          },
          'menu-item': {
            disabled: 'Вимикає елемент і пригнічує події кліку.',
            variant:
              'Візуальний стиль елемента; використовуйте danger для деструктивних дій.',
            clicked:
              'Спрацьовує, коли елемент активовано; батьківське меню закривається одразу після цього.',
          },
          'multi-select': {
            disabled: 'Вимикає множинний вибір.',
            errorMsg:
              'Повідомлення про помилку під полем, що замінює підказку та позначає поле недійсним.',
            hint: 'Допоміжний текст під полем, прихований, поки показується помилка.',
            id: 'id, що застосовується до тригера і label for, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться над полем.',
            maxVisibleChips:
              'Максимальна кількість чипів, що показуються на тригері, перш ніж решта згорнеться в пігулку з лічильником.',
            options: 'Список варіантів для вибору, що рендеряться у випадному списку.',
            placeholder: 'Заповнювач, що показується на тригері, поки варіант не обрано.',
            readonly: 'Рендерить поле лише для читання.',
            required: 'Позначає поле як обов’язкове.',
            searchable: 'Показує поле пошуку вгорі поповера.',
            searchPlaceholder:
              'Заповнювач, що показується всередині поля пошуку, коли пошуковий термін порожній.',
            selectAll: 'Показує тристановий рядок вибору всіх угорі списку варіантів.',
            size: 'Візуальний розмір тригера множинного вибору.',
            value:
              'Обрані значення варіантів, двостороннє прив’язування через [(value)].',
            changed: 'Спрацьовує з новим значенням щоразу, коли змінюється вибір.',
            clear: 'Очищає кожен вибір і зупиняє поширення події.',
            handlePopoverKeydown:
              'Опрацьовує навігацію клавіатурою всередині відкритого поповера, маршрутизуючи клавіші стрілок, Enter, Space та Escape.',
            onPopoverCloseRequested:
              'Викликається поповером, коли користувач клацає поза ним або прокручує; закриває панель і позначає поле торкнутим.',
            orderedValues:
              'Повертає заданий набір значень, переупорядкований відповідно до масиву вхідних варіантів.',
            removeChip: 'Видаляє заданий варіант з поточного вибору.',
            toggleOption: 'Перемикає членство заданого варіанта в поточному виборі.',
            toggleSelectAll:
              'Обирає всі відфільтровані варіанти, якщо хоч один не обрано, або знімає вибір з усіх відфільтрованих варіантів, якщо всі обрано.',
          },
          dropdown: {
            disabled: 'Вимикає випадний список.',
            errorMsg:
              'Повідомлення про помилку під полем, що замінює підказку та позначає поле недійсним.',
            hint: 'Допоміжний текст під полем, прихований, поки показується помилка.',
            id: 'id, що застосовується до тригера і label for, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться над полем.',
            options: 'Список варіантів для вибору, що рендеряться у випадному списку.',
            placeholder: 'Заповнювач, що показується на тригері, поки варіант не обрано.',
            readonly: 'Рендерить поле лише для читання.',
            required: 'Позначає поле як обов’язкове.',
            size: 'Візуальний розмір тригера випадного списку.',
            value: 'Поточне обране значення, двостороннє прив’язування через [(value)].',
            changed: 'Спрацьовує з новим значенням, коли користувач обирає варіант.',
            close: 'Закриває випадний список, не змінюючи поточного значення.',
            focus: 'Переміщує фокус клавіатури на тригер випадного списку.',
            onPopoverCloseRequested:
              'Викликається поповером, коли користувач клацає поза випадним списком; закриває панель і позначає поле торкнутим.',
            select: 'Програмно обирає заданий варіант і закриває список.',
            toggle: 'Перемикає випадний список між відкритим і закритим.',
          },
          'file-uploader': {
            accept:
              "MIME-типи та розширення файлів, розділені комами, які приймає зона перетягування, наприклад 'image/*,.pdf'.",
            disabled: 'Вимикає завантажувач.',
            errorMsg:
              'Повідомлення про помилку під полем, що замінює підказку та позначає поле недійсним.',
            hint: 'Допоміжний текст під полем, прихований, поки показується помилка.',
            id: 'id, що застосовується до зони перетягування і label for, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться над полем.',
            maxFiles:
              'Максимальна загальна кількість файлів; файли понад межу відхиляються.',
            maxSize: 'Максимальний розмір на файл у байтах; більші файли відхиляються.',
            multiple: 'Дозволяє обирати більше одного файлу за раз.',
            progress:
              'Карта прогресу завантаження для кожного файлу (0-100) за ідентичністю File; пропустіть, щоб приховати смуги прогресу.',
            required: 'Позначає поле як обов’язкове.',
            showFileList: 'Показує список обраних файлів під зоною перетягування.',
            size: 'Візуальний розмір завантажувача.',
            value: 'Поточний список файлів, двостороннє прив’язування через [(value)].',
            fileRemoved:
              'Спрацьовує, коли файл видаляється через кнопку видалення в його рядку.',
            rejected:
              'Спрацьовує, коли один або більше файлів не проходять валідацію, із причиною кожного відхилення.',
            trackFile:
              'Повертає стабільний ключ відстеження для файлу, використовується внутрішньо списком файлів.',
          },
          'form-field': {
            errorMsg:
              'Повідомлення про помилку під елементом керування, що замінює підказку та позначає поле недійсним.',
            hint: 'Допоміжний текст під елементом керування, прихований, поки показується помилка.',
            id: 'Основа id для зв’язування мітки та повідомлення, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться над елементом керування.',
            required: 'Позначає поле як обов’язкове.',
          },
          popover: {
            anchor:
              'Host-елемент або ElementRef, відносно якого поповер себе позиціонує.',
            ariaLabel:
              'Доступна мітка для поверхні поповера; надайте її, коли поповер не містить видимого заголовка.',
            ariaLabelledby:
              'Id елемента, що маркує поверхню поповера, передається як aria-labelledby.',
            clamp:
              'Обмежує поповер усередині вікна перегляду, коли він інакше переповнював би його.',
            closeOnEscape: 'Закриває поповер при натисканні Escape.',
            closeOnOutsideClick:
              'Закриває поповер, коли користувач клацає поза як поповером, так і його якорем.',
            flip: 'Перевертає на протилежний бік, коли запитуване розташування переповнює вікно перегляду.',
            matchAnchorWidth:
              'Встановлює min-width поповера, щоб відповідати ширині якоря.',
            offset: 'Проміжок у px між якорем і поверхнею поповера.',
            open: 'Чи відкрито поповер наразі.',
            placement: 'Бажана позиція поповера відносно його якоря.',
            role: 'ARIA-роль, що застосовується до поверхні поповера.',
            scrollBehavior:
              'Як поповер реагує на події прокрутки та зміни розміру, поки відкритий: репозиціонувати, закрити або ігнорувати.',
            surfaceId:
              'DOM id для поверхні поповера, що використовується елементами-тригерами через aria-controls.',
            trapFocus:
              'Утримує циклічне переміщення Tab і Shift+Tab всередині поверхні, поки поповер відкритий, для поповерів у стилі діалогу.',
            closeRequested:
              'Спрацьовує, коли поповер запитує закриття; батько має віддзеркалити це в [open].',
          },
          'accordion-item': {
            disabled: 'Вимикає цей елемент, не даючи його перемикати.',
            id: 'id, що застосовується до кнопки заголовка елемента та панелі, генерується автоматично, якщо пропущено.',
            label: 'Текст, що показується в кнопці заголовка елемента.',
            value:
              'Унікальний ключ, що ідентифікує цей елемент у межах його батьківського акордеона.',
          },
          breadcrumbs: {
            ariaLabel:
              'Доступна мітка для навігації хлібних крихт, повертається до перекладу активної мови, якщо пропущено.',
            items:
              'Масив записів хлібних крихт; елементи з href рендеряться як посилання, інші як кнопки, а останній неінтерактивний.',
            separator:
              'Візуальний стиль роздільника, що рендериться між елементами хлібних крихт.',
            clicked: 'Спрацьовує, коли активовано невимкнену, неостанню хлібну крихту.',
          },
          drawer: {
            animation:
              'Анімація висування під час відкриття та закриття висувної панелі: none (миттєво), linear (стала швидкість) або eased (крива сповільнення наприкінці).',
            ariaLabel:
              'Доступна мітка для висувної панелі, коли її заголовок недостатньо описовий.',
            closeOnBackdrop: 'Закриває висувну панель, коли користувач клацає підкладку.',
            closeOnEscape:
              'Закриває висувну панель, коли користувач натискає клавішу Escape.',
            id: 'id, що застосовується до елемента dialog, генерується автоматично, якщо пропущено.',
            mode: 'Як висувна панель співвідноситься зі сторінкою: overlay плаває над затемненою сторінкою з пасткою фокуса, тоді як push відкривається немодально та відсуває вміст сторінки вбік.',
            open: 'Чи відкрито висувну панель, двостороннє прив’язування через [(open)].',
            position: 'Край вікна перегляду, з якого висувається панель.',
            pushTarget:
              'Елемент, вміст якого відсувається вбік у режимі push, як CSS-селектор або посилання на елемент; за замовчуванням це body документа.',
            showClose: 'Показує кнопку закриття в заголовку висувної панелі.',
            size: 'Розмір панелі висувної панелі вздовж її основної осі: ширина для бічних панелей, висота для верхніх і нижніх панелей.',
            closed:
              'Спрацьовує, коли висувна панель закривається, чи то через кнопку закриття, підкладку або Escape.',
            opened: 'Спрацьовує, щойно висувну панель показано.',
          },
          'data-table': {
            clickable:
              'Позначає рядки тіла як клікабельні: показує курсор-вказівник і видає rowActivate при кліку або Enter/Space.',
            rowActivate:
              'Спрацьовує з даними рядка, коли клікабельний рядок тіла активовано кліком або клавіатурою.',
            navigable:
              'Перетворює таблицю на сітку з навігацією клавіатурою з блукаючим фокусом і переміщенням по комірках клавішами стрілок.',
            bordered: 'Рендерить рамку навколо кожної комірки.',
            columns:
              'Визначення стовпців, що описують ключ кожного поля, мітку та необов’язкове сортування чи шаблон.',
            data: 'Масив об’єктів рядків для відображення в таблиці.',
            density:
              'Передустановка вертикальної щільності, що керує відступом комірок рядка та заголовка.',
            hoverable: 'Підсвічує рядок під вказівником при наведенні.',
            noDataText:
              'Текст, що показується в порожньому стані, повертається до перекладу активної мови.',
            sort: 'Поточний стан сортування (ключ стовпця та напрямок), двостороннє прив’язування через [(sort)].',
            stickyHeader:
              'Фіксує рядок заголовка вгорі таблиці, коли вміст прокручується.',
            striped: 'Застосовує почергове затінення тла до непарних і парних рядків.',
            trackBy:
              'Ключ властивості рядка, що використовується виявленням змін Angular для ефективної ідентифікації рядків.',
            sorted:
              'Спрацьовує щоразу, коли стовпець або напрямок сортування змінюється через клік по заголовку.',
          },
          'radio-group': {
            ariaLabel: 'Доступна мітка для групи, коли не рендериться видима мітка.',
            disabled: 'Вимикає всі радіоваріанти в групі.',
            errorMsg:
              'Повідомлення про помилку під групою, що замінює підказку та позначає поле недійсним.',
            hint: 'Допоміжний текст під групою, прихований, поки показується помилка.',
            id: 'id, що застосовується до елемента групи та його label for, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться над групою.',
            name: 'Спільний атрибут name, що застосовується до всіх радіовводів у групі, генерується автоматично, якщо пропущено.',
            orientation: 'Напрямок розташування радіоваріантів у межах групи.',
            required: 'Позначає групу як обов’язкову.',
            size: 'Візуальний розмір, що застосовується до всіх радіоваріантів у групі.',
            value: 'Поточно обране значення, двостороннє прив’язування через [(value)].',
            changed: 'Спрацьовує з новим значенням, коли користувач обирає варіант.',
            select: 'Програмно обирає варіант із заданим значенням.',
          },
          segmented: {
            ariaLabel:
              'Доступна мітка для елемента керування, коли не рендериться видима мітка.',
            disabled: 'Вимикає сегментований елемент керування.',
            errorMsg:
              'Повідомлення про помилку під полем, що замінює підказку та позначає поле недійсним.',
            fullWidth:
              'Розтягує елемент керування, щоб заповнити ширину свого контейнера.',
            hint: 'Допоміжний текст під полем, прихований, поки показується помилка.',
            id: 'id, що застосовується до елемента керування і label for, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що рендериться над елементом керування.',
            options:
              'Масив варіантів, що рендеряться як кнопки-перемикачі в межах елемента керування.',
            required: 'Позначає поле як обов’язкове.',
            size: 'Візуальний розмір сегментованого елемента керування.',
            value:
              'Поточно обране значення варіанта, двостороннє прив’язування через [(value)].',
            changed:
              'Спрацьовує з новим значенням, коли користувач обирає інший варіант.',
            select: 'Програмно обирає заданий варіант.',
          },
          'tree-node': {
            collapseLabel: 'Доступна мітка для кнопки-шеврона згортання.',
            disabled: 'Вимикає взаємодію з вузлом і його нащадками.',
            expandedIds: 'Набір id вузлів, що наразі розгорнуті.',
            expandLabel: 'Доступна мітка для кнопки-шеврона розгортання.',
            focusedId: 'Id вузла, що наразі утримує блукаючий фокус tabindex.',
            level:
              'Глибина від кореня дерева (з індексом від 0), використовується для відступу та aria-level.',
            node: 'Об’єкт даних, що описує цей вузол, включно з його id, міткою, дочірніми елементами та станом вимкнення.',
            posInSet:
              'Позиція (з індексом від 1) серед дочірніх елементів батьківського вузла, використовується для aria-posinset.',
            selectedId: 'Id поточно обраного вузла або null, коли нічого не обрано.',
            setSize:
              'Загальна кількість сусідів у списку дочірніх елементів батьківського вузла, використовується для aria-setsize.',
            select: 'Спрацьовує, коли користувач клацає або активує рядок вузла.',
            toggle:
              'Спрацьовує з id вузла, коли користувач клацає шеврон розгортання або згортання.',
          },
          tree: {
            ariaLabel: 'Доступна мітка для віджета дерева.',
            disabled: 'Вимикає всі вузли в дереві.',
            expandedIds:
              'Id поточно розгорнутих вузлів-гілок, двостороннє прив’язування через [(expandedIds)].',
            nodes: 'Масив об’єктів даних вузлів дерева, що визначає ієрархію.',
            selectedId:
              'Id поточно обраного вузла, двостороннє прив’язування через [(selectedId)].',
            size: 'Візуальний розмір дерева, що масштабує текст і відступи пропорційно.',
            nodeClick: 'Спрацьовує з даними вузла, коли користувач обирає вузол.',
          },
          step: {
            completed:
              'Позначає крок як завершений, оновлюючи його візуальний індикатор.',
            disabled: 'Не дає кроку бути активованим.',
            id: 'id, що застосовується до панелі кроку та його вкладки, генерується автоматично, якщо пропущено.',
            label: 'Текстова мітка, що показується в індикаторі кроку.',
            optional:
              'Позначає крок як необов’язковий, показується як підказка під міткою кроку.',
          },
          stepper: {
            activeStep:
              'Індекс поточно активного кроку (з основою 0), двостороннє прив’язування через [(activeStep)].',
            disabled: 'Вимикає весь степер і всю навігацію по кроках.',
            id: 'id, що застосовується до host-елемента степера, генерується автоматично, якщо пропущено.',
            linear:
              'Вимагає, щоб кожен необов’язковий крок було позначено завершеним, перш ніж користувач зможе просунутися.',
            size: 'Візуальний розмір степера, що масштабує індикатори кроків і мітки разом.',
            changed:
              'Спрацьовує з індексом нового активного кроку, коли користувач переходить до іншого кроку.',
            canNavigateTo:
              'Повертає, чи досяжний крок із заданим індексом з поточного стану.',
            indexOf: 'Повертає індекс заданого кроку або -1, якщо його не зареєстровано.',
            selectStep: 'Активує крок із заданим індексом, якщо він досяжний.',
          },
          'transfer-list': {
            disabled:
              'Вимикає весь список передавання та всі елементи керування переміщенням.',
            items:
              'Повний пул елементів, доступних в обох панелях, ідентифікованих за id.',
            selectedIds:
              'Id елементів, що наразі на цільовому (правому) боці, двостороннє прив’язування через [(selectedIds)].',
            size: 'Візуальний розмір списку передавання.',
            sourceLabel:
              'Заголовок, що рендериться над вихідною (лівою) панеллю, повертається до значення за замовчуванням активної мови.',
            targetLabel:
              'Заголовок, що рендериться над цільовою (правою) панеллю, повертається до значення за замовчуванням активної мови.',
          },
          'virtual-list': {
            itemHeight:
              'Висота кожного рядка в пікселях; усі рядки мають мати однакову фіксовану висоту.',
            items:
              'Повний масив елементів даних для рендеру; у будь-який момент монтується лише видимий зріз.',
            overscan:
              'Кількість додаткових рядків, відрендерених над і під видимим вікном, щоб зменшити порожні краї під час швидкого прокручування.',
            viewportHeight: 'Висота прокручуваного вікна перегляду в пікселях.',
            scrollIndexChange:
              'Спрацьовує з індексом першого рядка, видимого вгорі вікна перегляду, щоразу, коли користувач прокручує.',
            scrollToIndex:
              'Прокручує вікно перегляду так, щоб рядок із заданим індексом з’явився вгорі, обмежений межами списку.',
          },
          'field-label': {
            forId:
              'id пов’язаного елемента керування; рендерить <label for>, коли встановлено, інакше <span>.',
            labelId:
              'id, що застосовується до відрендереного елемента label, щоб елементи керування могли посилатися на нього через aria-labelledby.',
            required: 'Показує індикатор обов’язковості на мітці.',
            text: 'Текст мітки, що рендериться всередині елемента label.',
          },
          'field-messages': {
            error:
              'Повідомлення про помилку для відображення; коли встановлено, підказка приховується, а повідомлення оголошується як сповіщення.',
            hint: 'Допоміжний текст, що показується під полем, коли немає помилки.',
            id: 'Базовий id, що використовується для виведення aria-id для елементів помилки та підказки.',
          },
          dialog: {
            ariaLabel:
              'Доступна мітка для діалогу, коли його слот заголовка не містить видимого заголовка.',
            closeOnBackdrop:
              'Закриває діалог, коли користувач клацає область підкладки поза панеллю.',
            closeOnEscape: 'Закриває діалог, коли користувач натискає Escape.',
            id: 'id, що застосовується до нативного елемента dialog, генерується автоматично, якщо пропущено.',
            open: 'Чи показано діалог, двостороннє прив’язування через [(open)].',
            showClose: 'Показує кнопку закриття в заголовку діалогу.',
            width: 'Передустановка ширини для панелі діалогу.',
            closed:
              'Спрацьовує, коли діалог закривається, незалежно від того, чи закрив його користувач, чи це сталося програмно.',
            opened: 'Спрацьовує, щойно діалог показано через showModal().',
          },
        },
      },
      sharedOptions: {
        fruitOptions: [
          { value: 'apple', label: 'Яблуко' },
          { value: 'banana', label: 'Банан' },
          { value: 'cherry', label: 'Вишня' },
          { value: 'date', label: 'Фінік' },
        ],
        viewOptions: [
          { value: 'day', label: 'День' },
          { value: 'week', label: 'Тиждень' },
          { value: 'month', label: 'Місяць' },
        ],
        themeOptions: [
          { value: 'light', label: 'Світла' },
          { value: 'dark', label: 'Темна' },
        ],
        monthOptions: [
          { value: 'jan', label: 'Січень' },
          { value: 'feb', label: 'Лютий' },
          { value: 'mar', label: 'Березень' },
          { value: 'apr', label: 'Квітень' },
          { value: 'may', label: 'Травень' },
          { value: 'jun', label: 'Червень' },
          { value: 'jul', label: 'Липень' },
          { value: 'aug', label: 'Серпень' },
          { value: 'sep', label: 'Вересень' },
          { value: 'oct', label: 'Жовтень' },
          { value: 'nov', label: 'Листопад' },
          { value: 'dec', label: 'Грудень' },
        ],
        breadcrumbHome: 'Головна',
        breadcrumbProducts: 'Продукти',
        breadcrumbLaptops: 'Ноутбуки',
        breadcrumbMacBookPro: 'MacBook Pro',
        breadcrumbDashboard: 'Панель керування',
        breadcrumbSettings: 'Налаштування',
      },
    },
  },
};

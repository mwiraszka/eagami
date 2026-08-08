import type { WebMessages } from '../web-messages.types';

export const ru: WebMessages = {
  common: {
    skipToContent: 'Перейти к основному содержимому',
    brandHome: 'Главная Eagami',
    themeToggleTooltip: 'Переключить тему',
    themeToggleLabel: next =>
      `Переключиться на ${next === 'light' ? 'светлый' : 'тёмный'} режим`,
    localeMenuLabel: 'Язык',
    localeMenuTooltip: 'Сменить язык',
    activeLocale: label => `Текущий язык: ${label}`,
    footer: {
      copyright: year => `© ${year} Eagami.`,
      allRightsReserved: 'Все права защищены.',
      navLabel: 'Подвал',
      siteHeading: 'О нас',
      libraryHeading: 'Eagami UI',
      guidesHeading: 'Руководства',
      integrationsHeading: 'Интеграции',
      resourcesHeading: 'Ресурсы',
      legalHeading: 'Правовая информация',
      homeLink: 'Главная',
      contactLink: 'Контакты',
      sourceCodeLink: 'Исходный код',
      npmLink: 'npm',
    },
    codeSnippet: {
      copyLabel: 'Скопировать в буфер обмена',
      copySuccess: 'Скопировано в буфер обмена',
      copyError: 'Не удалось скопировать в буфер обмена',
    },
    copyLinkLabel: 'Скопировать ссылку на раздел',
  },
  home: {
    metaTitle: 'Eagami',
    metaDescription:
      'Элегантный веб-дизайн и дом Eagami UI: лёгкой и доступной библиотеки компонентов Angular.',
    hero: {
      tagline: 'элегантный веб-дизайн.',
      ctaPrimary: 'Связаться',
      ctaSecondary: 'Последние проекты →',
      scrollHint: 'Прокрутить к услугам',
    },
    services: {
      title: 'Услуги',
      lede: 'От одной лендинговой страницы до полноценного веб-приложения, плюс всё, что идёт после запуска.',
      featuresHeading: 'Возможности',
      uiNote: {
        before: 'Более крупные проекты можно построить на',
        link: 'Eagami UI',
        after:
          ', собственной библиотеке компонентов, для единого и современного визуального языка по всему сайту.',
      },
      core: [
        {
          title: 'Сайты под ключ',
          description:
            'Полноценный сайт, созданный с нуля: настройка домена, хостинг, брендинг, дизайн и запуск. Неограниченные правки до дня запуска.',
        },
        {
          title: 'Постоянная поддержка',
          description:
            'Ежемесячное обслуживание: хостинг, обновления безопасности, обновления зависимостей, правки контента и анализ аналитики.',
        },
      ],
      addOns: [
        {
          title: 'Управление пользователями',
          description:
            'Аутентификация пользователей, регистрация и восстановление пароля, а также панель администратора с метриками и индивидуальными настройками для каждого пользователя.',
          iconSlug: 'users',
        },
        {
          title: 'Обработка платежей',
          description:
            'Онлайн-платежи (Stripe по умолчанию, другие провайдеры по запросу) с настраиваемыми формами оплаты и периодическим выставлением счетов.',
          iconSlug: 'credit-card',
        },
        {
          title: 'Многоязычная поддержка',
          description:
            'Поддержка нескольких языков с возможностью автоопределения языка из браузера посетителя.',
          iconSlug: 'languages',
        },
        {
          title: 'Темизация',
          description:
            'Переключение тёмной и светлой темы и полностью настраиваемые цветовые темы.',
          iconSlug: 'moon',
        },
        {
          title: 'Аналитика и статистика',
          description:
            'Метрики трафика сайта (источники, устройства, местоположения), а также отслеживание пользовательских событий.',
          iconSlug: 'bar-chart',
        },
        {
          title: 'Email и уведомления',
          description: 'Автоматические письма об активности аккаунта, чеки и объявления.',
          iconSlug: 'mail',
        },
      ],
    },
    projects: {
      title: 'Последние проекты',
      lede: 'Несколько сайтов в активной разработке.',
      previousAriaLabel: 'Предыдущие проекты',
      nextAriaLabel: 'Следующие проекты',
      regionAriaLabel: 'Последние проекты',
      showing: title => `Показан проект ${title}`,
      cards: [
        {
          title: 'London Chess',
          description:
            'Площадка для шахматного клуба Лондона и шахматных событий в Лондоне, Онтарио.',
          url: 'https://londonchess.ca',
          display: 'londonchess.ca',
          logo: 'assets/projects/londonchess.svg',
        },
        {
          title: 'Chordbomb',
          description:
            'Распознаёт играющую рядом песню и подбирает её последовательность аккордов.',
          url: 'https://chordbomb.com',
          display: 'chordbomb.com',
          logo: 'assets/projects/chordbomb.svg',
        },
        {
          title: 'CIRC Aesthetics',
          description:
            'Клиника косметической интервенционной радиологии в Лондоне, Онтарио.',
          url: 'https://circaesthetics.ca',
          display: 'circaesthetics.ca',
          logo: 'assets/projects/circaesthetics.svg',
        },
        {
          title: 'Brewski Bets',
          description: 'Трекер дружеских пари, которые рассчитываются пивом.',
          url: 'https://brewskibets.com',
          display: 'brewskibets.com',
          logo: 'assets/projects/brewskibets.svg',
        },
      ],
    },
    contact: {
      title: 'Есть проект на примете?',
      lede: 'Расскажите о нём!',
      success: 'Спасибо за сообщение. Скоро мы вам ответим.',
      nameLabel: 'Имя',
      namePlaceholder: 'Ваше имя',
      emailLabel: 'Электронная почта',
      emailPlaceholder: 'you@example.com',
      emailInvalid: 'Введите действительный адрес электронной почты',
      messageLabel: 'Сообщение',
      placeholderHints: [
        'Здравствуйте! Я работаю над сторонним проектом, и мне пригодилась бы помощь с фронтендом...',
        'Ищу того, кто создаст сайт для нашего малого бизнеса...',
        'Небольшой вопрос о библиотеке компонентов, прежде чем я приступлю...',
      ],
      submit: 'Отправить сообщение',
      sentToast: 'Сообщение отправлено',
      errorMessage:
        'Извините, что-то пошло не так. Напишите напрямую на info@eagami.com.',
    },
  },
  privacy: {
    metaTitle: 'Политика конфиденциальности | Eagami',
    metaDescription: 'Что собирает eagami.com и что не собирает.',
    title: 'Политика конфиденциальности',
    lastUpdated: date => `Последнее обновление: ${date}`,
    languageNote:
      'Эта политика ведётся только на английском языке. Любой перевод предоставляется исключительно для удобства.',
  },
  terms: {
    metaTitle: 'Условия использования | Eagami',
    metaDescription:
      'Условия использования eagami.com и библиотеки компонентов Eagami UI.',
    title: 'Условия использования',
    lastUpdated: date => `Последнее обновление: ${date}`,
    languageNote:
      'Эти условия ведутся только на английском языке. Любой перевод предоставляется исключительно для удобства.',
  },
  notFound: {
    metaTitle: 'Страница не найдена | Eagami',
    metaDescription: 'Страница не найдена.',
    eyebrow: '404',
    title: 'Страница не найдена',
    lede: 'Страница, которую вы искали, не существует или была перемещена.',
    cta: 'Вернуться на главную',
  },
  ui: {
    changelog: {
      title: 'История изменений',
      metaTitle: 'История изменений | Eagami UI',
      metaDescription: 'История релизов библиотеки компонентов Angular Eagami UI.',
      lede: (pkg, version, history) =>
        `Ниже перечислены все значимые изменения библиотеки ${pkg}, начиная с версии ${version}. Полную историю можно посмотреть в ${history}.`,
      historyInline: 'файле CHANGELOG.md на GitHub',
      migrationGuide: 'Руководство по миграции',
    },
    shell: {
      changelog: 'История изменений',
      sidebarLabel: 'Боковая панель документации',
      menu: 'Меню документации',
      navLabel: 'Документация',
      overview: 'Обзор',
      setup: 'Установка',
      designTokens: 'Дизайн-токены',
      themeBuilder: 'Конструктор темы',
      icons: 'Иконки',
      i18n: 'Интернационализация',
      accessibility: 'Доступность',
      components: 'Компоненты',
    },
    index: {
      metaTitle: 'Eagami UI',
      metaDescription:
        'Лёгкая, доступная библиотека компонентов Angular на основе CSS-переменных.',
      title: 'Обзор',
      ledeBefore: 'это лёгкая, доступная библиотека компонентов Angular.',
      ledeAfter:
        'Разумные настройки по умолчанию из коробки и полностью настраиваемый дизайн под любой бренд.',
      principlesHeading: 'Принципы дизайна',
      principles: [
        {
          title: 'Доступность',
          body: 'Навигация с клавиатуры, управление фокусом, поддержка программ чтения с экрана и учёт предпочтения уменьшенной анимации встроены в каждый компонент.',
        },
        {
          title: 'Лёгкость',
          body: 'Каждый компонент импортируется независимо, и в сборку попадает только то, что вы используете.',
        },
        {
          title: 'Настраиваемость',
          body: 'Полностью настраиваемый с помощью дизайн-токенов, сохраняя единый облик на каждой странице. Светлая и тёмная варианты поставляются вместе и по умолчанию следуют системным настройкам пользователя.',
        },
        {
          title: 'Локализация',
          body: 'Встроенный текст компонентов поставляется на всех поддерживаемых языках.',
        },
        {
          title: 'Современность',
          body: 'Регулярно обновляется с учётом новейших возможностей Angular и современных веб-стандартов.',
        },
        {
          title: 'Открытость',
          body: 'Каждый компонент это обычный Angular и CSS без привязки к поставщику, поэтому исходный код можно читать, копировать или изменять, как любой другой код в вашем проекте.',
        },
      ],
      showcase: {
        button: 'Нажми меня',
        toggle: 'Переключи меня',
        tick: 'Отметь меня',
        tag: 'Тег',
        badge: 'Бейдж',
        tooltip: 'Дополнительная информация, отображаемая во всплывающей подсказке',
        exploreMore: '...изучить больше компонентов',
        list: 'Список',
        grid: 'Сетка',
        table: 'Таблица',
        radioThis: 'Это',
        radioThat: 'То',
        option1: 'Вариант 1',
        option2: 'Вариант 2',
        option3: 'Вариант 3',
        toastButton: 'Кнопка нажата',
        toastToggleOn: 'Переключатель включён',
        toastToggleOff: 'Переключатель выключен',
        toastTickOn: 'Флажок установлен',
        toastTickOff: 'Флажок снят',
        ariaView: 'Демо-вид',
        ariaSlider: 'Демо-ползунок',
        ariaRating: 'Демо-рейтинг',
        ariaLayout: 'Демо-макет',
        ariaColor: 'Демо-цвет',
        ariaSelect: 'Демо-выбор',
        ariaDate: 'Демо-дата',
        ariaMultiSelect: 'Демо-множественный выбор',
        msMusic: 'Музыка',
        msTravel: 'Путешествия',
        msFood: 'Еда',
      },
      theme: {
        heading: 'Сделайте по-своему',
        ledeBefore: '',
        ledeLink: 'Токены дизайна',
        ledeAfter:
          ' — это то, что придаёт каждому проекту Eagami особый характер: настраиваемые цвета, шрифты, отступы, скругления, тени и анимация, применяемые ко всему сайту или приложению. Измените несколько ниже и посмотрите, как они влияют на компоненты.',
        brandColor: 'Цвет бренда',
        radius: 'Радиус скругления',
        font: 'Шрифт',
        fontDefault: '(по умолчанию)',
        reset: 'Сбросить',
      },
    },
    setup: {
      metaTitle: 'Установка | Eagami UI',
      metaDescription:
        'Установите @eagami/ui и подключите глобальную таблицу стилей и шрифты.',
      title: 'Установка',
      ngAddLabel: 'Установите и настройте всё одной командой:',
      manualLabel: 'Или настройте вручную:',
      installLabel: 'Установите пакет:',
      or: 'или',
      stylesheetLabel: {
        before: 'Добавьте глобальную таблицу стилей в',
        after: ':',
      },
      fontsLabel: {
        before: 'Загрузите шрифты в',
        after: ':',
      },
      firstComponentHeading: 'Ваш первый компонент',
    },
    integrations: {
      heading: 'За пределами Angular',
      intro:
        'Дизайн-токены Eagami не зависят от фреймворка. Скопируйте самодостаточное руководство по интеграции в проект без Angular или используйте машиночитаемый экспорт токенов напрямую.',
      reactLink: 'Руководство по интеграции с React',
      flutterLink: 'Руководство по интеграции с Flutter',
      tokensLink: 'Дизайн-токены в формате JSON',
    },
    themeBuilder: {
      metaTitle: 'Конструктор темы | Eagami UI',
      metaDescription:
        'Создайте проверенную по WCAG палитру для светлой и тёмной темы на основе цветов вашего бренда и скопируйте конфигурацию провайдера или CSS.',
      title: 'Конструктор темы',
      lede: 'Выберите цвета бренда, и Eagami UI построит полную шкалу 50–900 в пространстве OKLCH, проверит её контраст по WCAG в светлой и тёмной теме и выдаст готовую конфигурацию <code>provideEagamiUi()</code>.',
      primaryLabel: 'Основной цвет',
      secondaryLabel: 'Дополнительный цвет',
      contrastPass: 'Соответствует контрасту WCAG 2.2 AA в светлой и тёмной теме',
      contrastFailIntro: 'Некоторые сочетания не достигают порога контраста WCAG AA:',
      previewHeading: 'Предпросмотр',
      previewHint: 'Переключите тему сайта, чтобы увидеть палитру в тёмном режиме.',
      previewButton: 'Начать',
      previewSwitch: 'Уведомления',
      previewStep1: 'Аккаунт',
      previewStep2: 'Профиль',
      previewStep3: 'Готово',
      previewProgress: 'Прогресс:',
      exportHeading: 'Экспорт',
      exportConfigLabel: 'Конфигурация Angular',
      exportCssLabel: 'CSS-переменные',
    },
    tokens: {
      metaTitle: 'Дизайн-токены | Eagami UI',
      metaDescription:
        'CSS-переменные для цветов, типографики, отступов, возвышения, формы и движения.',
      title: 'Дизайн-токены',
      lede: 'Дизайн-токены — это CSS-переменные, которые управляют каждым компонентом библиотеки: цвета, типографика, отступы, возвышение, форма и движение. Ссылайтесь на эти токены в своих стилях через <code>var(--token-name)</code>, чтобы сохранить визуальную согласованность во всём приложении.',
      sections: {
        theming: 'Темизация',
        palette: 'Палитра бренда',
        colors: 'Цвета',
        typography: 'Типографика',
        spacing: 'Отступы',
        elevation: 'Возвышение',
        shape: 'Форма',
        motion: 'Движение',
      },
      themingRootBefore:
        'Каждый дизайн-токен Eagami можно переопределить, поэтому библиотека адаптируется под любой бренд. Переопределите любой токен на <code>:root</code>, чтобы перетемизировать всю библиотеку:',
      themingScopedBefore:
        'Или ограничьте переопределения отдельными компонентами, где это удобно:',
      paletteIntro:
        'Передайте один hex-цвет бренда в <code>provideEagamiUi()</code>, и библиотека выведет полную шкалу из десяти оттенков (от 50 до 900) в пространстве <a href="https://www.w3.org/TR/css-color-4/#ok-lab" target="_blank" rel="noopener noreferrer"><span>OKLCH</span></a>, удерживая постоянными тон и насыщенность и меняя только светлоту. Выведенные оттенки питают каждый токен <code>--color-brand-*</code> как в светлом, так и в тёмном режиме:',
      paletteOverrides:
        'Закрепите конкретные оттенки или переназначьте, какой выведенный оттенок лежит в основе каждой семантической роли:',
      paletteContrast:
        'Каждая пара ролей бренда (текст на поверхности, поверхность на фоне) проверяется на соответствие <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer"><span>WCAG 2.2 Level AA</span></a> при инициализации. Несоответствующая комбинация выбрасывает ошибку до загрузки приложения, поэтому проблема контраста в цвете бренда выявляется при запуске, а не в продакшене.',
      paletteBuilderIntro: 'Создавайте и просматривайте палитру визуально в',
      paletteBuilderLink: 'конструкторе темы',
      elevationDrop: 'Отбрасываемые тени',
      elevationRelief: 'Фаска и углубление',
      elevationReliefBefore:
        '<code>--shadow-bevel</code> сочетает внутреннюю подсветку (сверху) с внутренней тенью (снизу) для поверхностей, которые должны читаться как приподнятые. <code>--shadow-well</code> инвертирует освещение для утопленного вида. Комбинируйте с <code>--shadow-*</code> для рассеянной тени: <code>box-shadow: var(--shadow-bevel), var(--shadow-sm);</code>',
      colorsPrimary: 'Основной',
      colorsSecondary: 'Дополнительный',
      colorsNeutral: 'Нейтральный',
      colorsSemantic: 'Семантический',
      typographyFamilies: 'Семейства',
      typographySizes: 'Размеры',
      typographyWeights: 'Начертания',
      typographyComposites: 'Составные стили',
      typographyCompositesBefore:
        'Составные токены объединяют размер, начертание, межстрочный интервал (а иногда и семейство) для конкретной роли. <code>--text-section-heading-*</code> это первый составной токен, закрепляющий font-family. Используйте его для подзаголовка <code>&lt;h2&gt;</code> на страницах документации и маркетинга.',
      typographySectionHeadingSample: 'Заголовок раздела голоса бренда',
      motionSimulate: 'Симулировать',
      motionDurations: 'Длительности',
      motionEasings: 'Функции плавности',
      integrationsIntro:
        'Все перечисленные выше дизайн-токены не зависят от фреймворка. Для проектов без Angular просто передайте самодостаточное руководство по интеграции своему ИИ-агенту или позвольте ему напрямую использовать машиночитаемый экспорт токенов.',
    },
    icons: {
      metaTitle: 'Иконки | Eagami UI',
      metaDescription: 'Набор иконок, поставляемый с @eagami/ui.',
      title: 'Иконки',
      lede: 'Самостоятельные компоненты Angular, которые наследуют свой цвет и масштабируются по <code>font-size</code>, поэтому отрисовываются в любом размере. Большинство получено из <a href="https://feathericons.com/" target="_blank" rel="noopener noreferrer"><span>Feather Icons</span></a> авторства <a href="https://github.com/colebemis" target="_blank" rel="noopener noreferrer"><span>Cole Bemis</span></a> по <a href="https://github.com/feathericons/feather/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><span>лицензии MIT</span></a>; остальные это оригинальные иконки Eagami UI. Иконки Feather также можно рисовать более тонкими или более толстыми штрихами. Нажмите на иконку, чтобы скопировать её селектор.',
      filterLabel: 'Фильтровать иконки',
      filterPlaceholder: 'Поиск иконок',
      filterClearLabel: 'Очистить поиск',
      categoryFeather: 'Feather',
      categoryEagami: 'Eagami UI',
      categoryBrand: 'Бренды',
      countAll: count => `${count} иконок`,
      countFiltered: (shown, total) => `${shown} из ${total} иконок`,
      noResults: 'Нет иконок, соответствующих вашему запросу',
      copiedToast: selector => `«${selector}» скопировано в буфер обмена`,
      copyFailedToast: selector => `Не удалось скопировать «${selector}» в буфер обмена`,
      brandTitle: 'Иконки брендов',
      brandIntro:
        'Иконки брендов в списке ниже изображают товарные знаки третьих сторон и предоставляются только для номинативного использования, то есть для идентификации бренда, который они представляют в интерфейсе (кнопка «Войти через Google», ссылка «Поделиться в Facebook» и т. п.). Они не лицензированы для общего декоративного использования. Потребители обязаны следовать рекомендациям каждого бренда:',
      brandLinkLabel: 'Ресурсы брендов',
    },
    i18n: {
      metaTitle: 'Интернационализация | Eagami UI',
      metaDescription:
        'Встроенный текст компонентов на 15 языках с переключением во время выполнения и переопределением отдельных строк.',
      title: 'Интернационализация',
      lede: 'Каждая встроенная строка (ARIA-метки, плейсхолдеры, пустые состояния, элементы управления выбором даты) поставляется на 15 языках. Задайте один для всего приложения, переключайте во время выполнения или переопределяйте отдельные строки.',
      supportedHeading: 'Поддерживаемые языки',
      quickSetupHeading: 'Быстрая настройка',
      quickSetupBefore:
        'Добавьте <code>provideEagamiUi()</code> в конфигурацию приложения и зарегистрируйте используемые языки через <code>locales</code>. Английский включён всегда, а в сборку добавляются только те языки, которые вы регистрируете.',
      lazyHeading: 'Ленивая загрузка',
      lazyBefore:
        'Зарегистрируйте <code>localeLoaders</code> вместо <code>locales</code>: язык загружается при первой активации и не попадает в начальный бандл. Направьте каждый загрузчик на модуль, реэкспортирующий один языковой пакет, а если переключение должно быть мгновенным, предзагрузите его через <code>loadLocale()</code>.',
      liveDemoHeading: 'Живая демонстрация',
      liveDemoIntro:
        'Выберите язык и понаблюдайте, как компоненты ниже подхватывают соответствующие строки и форматирование даты.',
      runtimeSwitchHeading: 'Переключение во время выполнения',
      runtimeSwitchBefore:
        'Внедрите <code>EagamiI18nService</code> и вызовите <code>setLocale()</code>. Активный язык это сигнал, поэтому каждый компонент перерисовывается с новыми строками без перезагрузки.',
      perStringHeading: 'Переопределение отдельных строк',
      perStringBefore:
        'Передайте объект <code>messages</code> вместе с языком, чтобы заменить отдельные строки. Всё, что вы опустите, откатывается к значениям по умолчанию для данного языка.',
      perStringAfter:
        'Большинство компонентов также предоставляют отдельные входные параметры для сообщений (например, <code>placeholder</code> у <code>&lt;ea-dropdown&gt;</code>) для разовых переопределений в месте вызова.',
      frenchSpacingHeading: 'Помощник для французских пробелов',
      frenchSpacingBody:
        'Французская типографика требует узкого неразрывного пробела перед <code>? ! : ; »</code> и после <code>«</code>. Экспортируемый помощник <code>frenchSpacing()</code> преобразует обычные пробелы в ваших собственных французских строках (библиотека обрабатывает свои встроенные французские сообщения внутри).',
      demoLocaleLabel: 'Язык',
    },
    accessibility: {
      metaTitle: 'Доступность | Eagami UI',
      metaDescription:
        'Соответствие WCAG 2.2 AA, полная поддержка клавиатуры и компоненты, дружественные к программам чтения с экрана, с проверкой при каждом релизе.',
      title: 'Доступность',
      lede: 'Каждый компонент построен по ведущим стандартам веб-доступности: корректная семантика, полная поддержка клавиатуры, управление фокусом и объявления для программ чтения с экрана работают из коробки.',
      conformanceHeading: 'Соответствие',
      conformanceBody:
        'Библиотека придерживается <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener">WCAG 2.2 Level AA</a>, стандарта, которому обязаны соответствовать большинство организаций, и следует официальным рекомендациям W3C для каждого вида элементов управления, от диалогов и меню до слайдеров и пикеров дат. Объявления для программ чтения с экрана поставляются на всех поддерживаемых языках, поэтому ассистивные технологии всегда говорят на языке пользователя.',
      builtInHeading: 'Встроенная доступность',
      builtInItems: [
        {
          title: 'Семантика',
          body: 'Нативные элементы там, где это возможно, и явные ARIA-роли, состояния и свойства там, где нет. Состояния вроде expanded, selected, checked, invalid и busy всегда доступны программно, а не только через оформление.',
        },
        {
          title: 'Поддержка клавиатуры',
          body: 'Полные клавиатурные паттерны APG: перемещаемый tabindex, навигация стрелками, Home и End, Escape для закрытия и Enter или пробел для активации, с учётом RTL при обработке стрелок.',
        },
        {
          title: 'Управление фокусом',
          body: 'Модальные окна и пикеры удерживают фокус, пока открыты, и возвращают его триггеру при закрытии. Индикаторы фокуса всегда видимы и никогда не подавляются.',
        },
        {
          title: 'Объявления для программ чтения с экрана',
          body: 'Тосты, оповещения, ошибки валидации и изменения асинхронного состояния объявляются через живые области с подходящим уровнем вежливости.',
        },
        {
          title: 'Уменьшенная анимация',
          body: 'Анимации повсюду учитывают медиазапрос prefers-reduced-motion.',
        },
        {
          title: 'Контрастность',
          body: 'Светлая и тёмная темы по умолчанию соответствуют требованиям WCAG к контрастности, а инструменты темизации помечают сочетания, не дотягивающие до AA.',
        },
      ],
      labelsHeading: 'Доступные имена',
      labelsBefore:
        'Компоненты, отображающие текст, именуют себя сами. Всё, что состоит только из иконки или является графическим, предоставляет входной параметр <code>aria-label</code> (с локализованными значениями по умолчанию для встроенных элементов управления, таких как кнопки очистки, закрытия и скрытия), а поля форм автоматически связывают <code>label</code>, подсказки и сообщения об ошибках с элементом управления через <code>aria-describedby</code>.',
      labelsAfter:
        'Укажите <code>label</code> или <code>aria-label</code> для элементов управления без видимого текста, а компонент позаботится об остальном: имена, подсказки и сообщения об ошибках остаются связанными автоматически.',
      testingHeading: 'Проверка при каждом релизе',
      testingBody:
        'Каждый компонент проверяется по отраслевым правилам доступности при каждом изменении, а релиз выходит только тогда, когда пройдены все проверки, поэтому доступность, которую вы видите здесь, сохраняется по мере развития библиотеки.',
    },
    component: {
      metaTitle: name => `Компонент ${name} | Eagami UI`,
      metaDescription: name =>
        `Компонент Angular ${name}: живая демонстрация, справочник API и темизация через CSS-переменные.`,
      demoHeading: 'Демо',
      notFoundTitle: 'Компонент не найден',
      notFoundBody: 'Выберите компонент на боковой панели или',
      notFoundLink: 'вернитесь к введению',
      sectionHeadings: {
        basic: 'базовый',
        variants: 'варианты',
        sizes: 'размеры',
        states: 'состояния',
        disabled: 'отключённый',
        dismissible: 'закрываемый',
        clearable: 'очищаемый',
        hintAndError: 'подсказка и ошибка',
        withHint: 'с подсказкой',
        withError: 'с ошибкой',
        withLabel: 'с меткой',
        withIcons: 'с иконками',
        withFooter: 'с подвалом',
        withPaginator: 'с пагинатором',
        withDisabledItem: 'с отключённым элементом',
        withDisabledTab: 'с отключённой вкладкой',
        required: 'обязательный',
        requiredWithHint: 'обязательный с подсказкой',
        horizontal: 'горизонтальный',
        vertical: 'вертикальный',
        single: 'одиночный',
        multi: 'множественный',
        circle: 'круг',
        square: 'квадрат',
        shapes: 'формы',
        shapesAndFallbacks: 'формы и запасные варианты',
        chevronSeparator: 'разделитель-шеврон',
        slashSeparator: 'разделитель-слеш',
        twoLevels: 'два уровня',
        fourDigitPin: '4-значный PIN',
        defaultHeading: 'по умолчанию',
        stripedAndBordered: 'полосатый и с рамкой',
        compactDensity: 'компактная плотность',
        tinyList: 'крошечный список',
        stickyHeader: 'закреплённый заголовок',
        emptyState: 'пустое состояние',
        formatVariants: 'варианты формата',
        minMax: 'мин и макс',
        positions: 'позиции',
        trigger: 'триггер',
        alignLeft: 'выравнивание: влево',
        alignCenter: 'выравнивание: по центру',
        manyPages: 'много страниц',
        minimal: 'минимальный',
        indeterminate: 'неопределённый',
        noResize: 'без изменения размера',
        resizing: 'изменение размера',
        disabledAndReadonly: 'отключённый и только для чтения',
        password: 'пароль',
        autocompleteSection: 'автозаполнение',
        twoOptions: 'два варианта',
        fullWidth: 'на всю ширину',
        minLengthMaxResults: 'мин. длина и макс. результаты',
        removable: 'удаляемый',
        minMaxLabels: 'метки мин/макс',
        underline: 'подчёркивание',
        filled: 'заливка',
        rect: 'прямоугольник',
        inlineLayout: 'строчный макет',
        noResults: 'нет результатов',
        titleOnly: 'только заголовок',
        iconTrigger: 'триггер-иконка',
        placements: 'размещения',
        canvasSizes: 'размеры холста',
        cappedChipCount: 'ограниченное число чипов',
        customIcon: 'своя иконка',
        customIconAndColor: 'своя иконка и цвет',
        customLabel: 'своя метка',
        halfSteps: 'половинные шаги',
        customSize: 'свой размер',
        linearFlow: 'линейный поток',
        manyLevels: 'много уровней',
        notAnimated: 'без анимации',
        outputFormats: 'форматы вывода',
        numberOfStars: 'количество звёзд',
        minimumOne: 'минимум 1 звезда',
        quarterHourSteps: 'шаги по четверти часа',
        readonly: 'только для чтения',
        singleFile: 'один файл',
        stepped: 'со ступенями',
        sundayStart: 'начало с воскресенья',
        twelveHourFormat: '12-часовой формат',
        twoActions: 'два действия',
        withCompletedSteps: 'с завершёнными шагами',
        withConstraints: 'с ограничениями',
        withInitialValue: 'с начальным значением',
        withMaxlength: 'с максимальной длиной',
        withMaxHeight: 'с максимальной высотой',
        withMinMaxLabels: 'с метками мин/макс',
        withOptionalStep: 'с необязательным шагом',
        withSeconds: 'с секундами',
        withSelection: 'с выбором',
        withoutAlpha: 'без альфа-канала',
        withoutSearch: 'без поиска',
        withoutSelectAll: 'без «выбрать всё»',
        wrapping: 'с переносом',
      },
      common: {
        small: 'Маленький',
        medium: 'Средний',
        large: 'Большой',
        cancel: 'Отмена',
        save: 'Сохранить',
        close: 'Закрыть',
        confirm: 'Подтвердить',
        disabled: 'Отключено',
        defaultLabel: 'По умолчанию',
        successLabel: 'Успех',
        warningLabel: 'Предупреждение',
        errorLabel: 'Ошибка',
        infoLabel: 'Информация',
      },
      demos: {
        accordion: {
          whatLabel: 'Что такое @eagami/ui?',
          whatBody:
            'Лёгкая, доступная библиотека компонентов Angular на основе CSS-переменных.',
          installLabel: 'Как её установить?',
          installBody:
            'Выполните pnpm add @eagami/ui, затем добавьте глобальную таблицу стилей в ваш angular.json.',
          themeLabel: 'Могу ли я настроить тему?',
          themeBody:
            'Да, переопределите любую CSS-переменную на :root или ограничьте переопределения отдельными компонентами.',
          sectionOneLabel: 'Раздел один',
          sectionOneBody:
            'В режиме multi несколько разделов могут быть открыты одновременно.',
          sectionTwoLabel: 'Раздел два',
          sectionTwoBody: 'Содержимое раздела два.',
          disabledSectionLabel: 'Отключённый раздел',
          disabledSectionBody: 'Это содержимое недоступно.',
        },
        alert: {
          defaultText: 'Это оповещение по умолчанию',
          successText: 'Ваши изменения сохранены',
          warningText: 'Ваш пробный период истекает через 3 дня',
          errorText: 'Что-то пошло не так, попробуйте ещё раз',
          infoText: 'Доступна новая версия',
          dismissibleText: 'Это оповещение можно закрыть',
          tooltipSuppressed:
            'На сенсорных устройствах всплывающие подсказки подавляются во избежание «залипающего» наведения. Откройте этот раздел на устройстве с мышью, чтобы увидеть демонстрации в действии.',
        },
        autocomplete: {
          startTyping: 'Начните вводить…',
          hintText: 'Начните вводить, чтобы увидеть совпадения',
          errorText: 'Выберите породу собаки',
          breedPlaceholder: 'Порода собаки…',
          minMaxLabel: 'Мин. 2 символа, макс. 3 результата',
          minMaxPlaceholder: 'Введите не менее 2 символов…',
        },
        avatarEditor: {
          result: 'Результат:',
        },
        badge: {
          successText: 'Активно',
          warningText: 'Ожидание',
          newText: 'Новое',
        },
        button: {
          primary: 'Основная',
          secondary: 'Вторичная',
          ghost: 'Призрачная',
          danger: 'Опасная',
          toggleLoading: 'Переключить загрузку',
          fullWidth: 'На всю ширину',
          clickedToast: 'Кнопка нажата!',
        },
        card: {
          elevatedHeader: 'Приподнятая',
          elevatedBody: 'Карточка с тенью возвышения.',
          outlinedHeader: 'С обводкой',
          outlinedBody: 'Карточка с рамкой по контуру.',
          filledHeader: 'С заливкой',
          filledBody: 'Карточка с лёгким фоном.',
          cardTitleHeader: 'Заголовок карточки',
          cardWithFooterBody:
            'У этой карточки есть заголовок, тело и подвал с действиями.',
        },
        checkbox: {
          acceptTermsAndConditions: 'Принять условия использования',
          disabledChecked: 'Отключённый отмеченный',
          indeterminate: 'Неопределённый',
          iAgreeToTerms: 'Я согласен с условиями',
          subscribeToUpdates: 'Подписаться на обновления',
          subscribeHint: 'Раз в месяц приходит дайджест, без спама',
          acceptTermsLabel: 'Принять условия',
          acceptTermsError: 'Для продолжения необходимо принять условия',
        },
        codeInput: {
          verificationCodeLabel: 'Код подтверждения',
          verificationCodeHint: 'Проверьте почту на наличие 6-значного кода',
          verificationCodeError: 'Неверный код подтверждения',
          pinLabel: 'PIN',
          pinHint: 'Введите ваш 4-значный PIN',
        },
        colorPicker: {
          brandLabel: 'Цвет бренда',
          hintBrandColor: 'Используется как основной цвет бренда',
          errorRequired: 'Это поле обязательно',
          hexLabel: 'Формат HEX',
          rgbLabel: 'Формат RGB',
          hslLabel: 'Формат HSL',
          noAlphaHeading: 'Только непрозрачный',
          opaqueOnlyLabel: 'Сплошной цвет',
        },
        dataTable: {
          tableColumnId: 'ID',
          tableColumnFirstName: 'Имя',
          tableColumnLastName: 'Фамилия',
          tableColumnAdmin: 'Админ',
          tableColumnPosts: 'Посты',
        },
        datePicker: {
          appointmentLabel: 'Запись',
          pickDatePlaceholder: 'Выберите дату…',
          hintAnyFutureDate: 'Выберите любую дату в будущем',
          errorRequired: 'Это поле обязательно',
          shortLabel: 'Короткий',
          mediumLabel: 'Средний',
          longLabel: 'Длинный',
          withinNextWeeksLabel: 'В течение следующих 3 недель',
          withinNextWeeksHint: '±1 неделя / +3 недели от сегодня',
        },
        dialog: {
          openButton: 'Открыть диалог',
          title: 'Заголовок диалога',
          body: 'Это тело диалога. Оно поддерживает любое содержимое, включая формы, текст и другие компоненты.',
        },
        divider: {
          orLabel: 'или',
          sectionLabel: 'Раздел',
          leftLabel: 'Слева',
          rightLabel: 'Справа',
        },
        drawer: {
          openButton: 'Открыть выдвижную панель',
          rightButton: 'Справа',
          leftButton: 'Слева',
          topButton: 'Сверху',
          bottomButton: 'Снизу',
          rightTitle: 'Правая панель',
          rightBody: 'Выезжает с правого края, удобна для панелей с деталями.',
          leftTitle: 'Левая панель',
          leftBody: 'Выезжает слева, удобна для навигационных меню.',
          topTitle: 'Верхняя панель',
          topBody: 'Опускается сверху, удобна для уведомлений.',
          bottomTitle: 'Нижняя панель',
          bottomBody:
            'Поднимается снизу, часто используется на мобильных для листов действий.',
        },
        dropdown: {
          fruitLabel: 'Фрукт',
          fruitPlaceholder: 'Выберите фрукт…',
          hintFavourite: 'Выберите свой любимый',
          errorRequired: 'Это поле обязательно',
          selectPlaceholder: 'Выберите…',
        },
        emptyState: {
          noItemsTitle: 'Пока нет элементов',
          noItemsDescription: 'Начните, создав свой первый элемент.',
          createItem: 'Создать элемент',
          noResultsTitle: 'Результаты не найдены',
          noResultsDescription:
            'Попробуйте изменить поисковый запрос или фильтр, чтобы найти то, что ищете.',
          clearFilters: 'Очистить фильтры',
          nothingHereTitle: 'Здесь ничего нет',
        },
        fileUploader: {
          attachmentsLabel: 'Вложения',
          imagesLabel: 'Загрузить изображения',
          imagesHint: 'PNG или JPEG, до 2 МБ каждое, максимум 4 файла',
          resumeLabel: 'Загрузить резюме',
          customIconLabel: 'Прикрепить файлы',
          withHintHint: 'До 10 МБ на файл',
          withErrorText: 'Требуется хотя бы одно изображение',
        },
        formField: {
          emailPlaceholder: 'you@example.com',
        },
        input: {
          defaultLabel: 'По умолчанию',
          enterTextPlaceholder: 'Введите текст…',
          hintGuidance: 'Здесь размещается полезная подсказка',
          errorRequired: 'Это поле обязательно',
          readonlyLabel: 'Только для чтения',
          readonlyValue: 'Значение только для чтения',
          passwordLabel: 'Пароль',
          passwordPlaceholder: 'Введите ваш пароль…',
          passwordNoToggleLabel: 'Пароль (переключатель скрыт)',
          passwordNoTogglePlaceholder: 'Без переключателя видимости',
          emailLabel: 'Электронная почта',
          emailPlaceholder: 'you@example.com',
        },
        menu: {
          openButton: 'Открыть меню',
          edit: 'Редактировать',
          duplicate: 'Дублировать',
          archive: 'Архивировать',
          delete: 'Удалить',
          file: 'Файл',
          moreOptionsLabel: 'Больше опций',
          view: 'Просмотр',
          rename: 'Переименовать',
          newItem: 'Создать',
          open: 'Открыть',
          saveUnavailable: 'Сохранить (недоступно)',
          saveAs: 'Сохранить как',
        },
        popover: {
          openLabel: 'Открыть поповер',
          basicContent:
            'Плавающая поверхность, привязанная к своему триггеру. Используйте её как строительный блок для меню, выпадающих списков и пользовательских оверлеев.',
          placementTopLabel: 'сверху',
          placementTopStartLabel: 'сверху-в начале',
          placementTopEndLabel: 'сверху-в конце',
          placementBottomLabel: 'снизу',
          placementBottomStartLabel: 'снизу-в начале',
          placementBottomEndLabel: 'снизу-в конце',
          placementLeftLabel: 'слева',
          placementRightLabel: 'справа',
          placementTopContent: 'По центру над триггером',
          placementTopStartContent: 'Над триггером, выровнено по его левому краю',
          placementTopEndContent: 'Над триггером, выровнено по его правому краю',
          placementBottomContent: 'По центру под триггером',
          placementBottomStartContent: 'Под триггером, выровнено по его левому краю',
          placementBottomEndContent: 'Под триггером, выровнено по его правому краю',
          placementLeftContent: 'По центру слева от триггера',
          placementRightContent: 'По центру справа от триггера',
        },
        progressBar: {
          processing: 'Обработка…',
        },
        radio: {
          appleLabel: 'Яблоко',
          bananaLabel: 'Банан',
          cherryLabel: 'Вишня',
          optionALabel: 'Вариант A',
          optionBLabel: 'Вариант B',
          subscriptionPlanLabel: 'Тарифный план',
          freeLabel: 'Бесплатный',
          proLabel: 'Pro',
          enterpriseLabel: 'Корпоративный',
          deliverySpeedLabel: 'Скорость доставки',
          deliverySpeedHint: 'Выберите, как быстро вы хотите получить',
          standardLabel: 'Стандартная',
          expressLabel: 'Экспресс',
          accountTypeLabel: 'Тип аккаунта',
          accountTypeError: 'Выберите тип аккаунта',
          personalLabel: 'Личный',
          businessLabel: 'Бизнес',
        },
        rating: {
          experienceLabel: 'Оцените свой опыт',
          halfStepsLabel: 'Рейтинг с половинными шагами',
          halfStepsHint:
            'Нажмите на левую или правую половину звезды, чтобы задать приращение 0,5.',
          readonlyLabel: 'Средний рейтинг',
          withHintHint: 'Коснитесь звезды, чтобы задать рейтинг',
          withErrorText: 'Рейтинг обязателен',
          numberOfStarsLabel: 'Оцените',
          customIconLabel: 'Насколько вам нравится?',
        },
        segmented: {
          viewLabel: 'Вид',
          themeLabel: 'Тема',
          themeHint: 'Влияет на всё приложение',
          layoutLabel: 'Макет',
          layoutError: 'Необходимо выбрать макет',
          viewOptionList: 'Список',
          viewOptionGrid: 'Сетка',
          viewOptionKanban: 'Канбан',
          themeOptionLight: 'Светлая',
          themeOptionDark: 'Тёмная',
        },
        slider: {
          volumeLabel: 'Громкость',
          brightnessLabel: 'Яркость',
          withHintLabel: 'С подсказкой',
          sliderHint: 'Перетащите ползунок или используйте клавиши-стрелки для настройки',
          withErrorLabel: 'С ошибкой',
          sliderError: 'Выберите значение выше 50',
        },
        switch: {
          enableNotificationsLabel: 'Включить уведомления',
          disabledOnLabel: 'Отключён во включённом состоянии',
          confirmConsentLabel: 'Подтвердить согласие',
          marketingEmailsLabel: 'Маркетинговые письма',
          marketingEmailsHint: 'Отписаться можно в любое время',
          twoFactorAuthLabel: 'Двухфакторная аутентификация',
          twoFactorAuthError: 'Двухфакторная аутентификация должна быть включена',
        },
        tabs: {
          account: 'Аккаунт',
          accountContent: 'Содержимое настроек аккаунта',
          security: 'Безопасность',
          securityContent: 'Содержимое настроек безопасности',
          notifications: 'Уведомления',
          notificationsContent: 'Настройки уведомлений',
          overview: 'Обзор',
          overviewContent: 'Содержимое обзора',
          analytics: 'Аналитика',
          analyticsContent: 'Содержимое аналитики',
          reports: 'Отчёты',
          reportsContent: 'Содержимое отчётов',
          general: 'Общие',
          generalContent: 'Общие настройки',
          billing: 'Оплата',
          billingContent: 'Платёжные данные',
          admin: 'Админ',
          adminContent: 'Панель администратора',
        },
        tag: {
          disabledSuccess: 'Отключённый успех',
        },
        textarea: {
          messageLabel: 'Сообщение',
          messagePlaceholder: 'Введите ваше сообщение…',
          hintMaxCharacters: 'Максимум 500 символов',
          errorRequired: 'Это поле обязательно',
          fixedSizeLabel: 'Фиксированный размер',
          fixedSizePlaceholder: 'Размер изменить нельзя',
          readonlyLabel: 'Только для чтения',
          readonlyValue: 'Содержимое только для чтения',
        },
        toast: {
          message: variant => `Это тост варианта ${variant}`,
        },
        tooltip: {
          triggerLabel: '(наведите на меня)',
          templateTriggerLabel: '(наведите для подсказки из шаблона)',
          templateTipStatus: 'Сейчас в сети',
          topLabel: 'Сверху',
          topTooltip: 'Подсказка сверху',
          bottomLabel: 'Снизу',
          bottomTooltip: 'Подсказка снизу',
          leftLabel: 'Слева',
          leftTooltip: 'Подсказка слева',
          rightLabel: 'Справа',
          rightTooltip: 'Подсказка справа',
        },
        transferList: {
          sourceLabel: 'Доступно',
          targetLabel: 'Выбрано',
          roleAdmin: 'Админ',
          roleEditor: 'Редактор',
          roleViewer: 'Наблюдатель',
          roleGuest: 'Гость',
          roleBilling: 'Биллинг',
          roleOwner: 'Владелец',
        },
        virtualList: {
          row: 'Строка',
          detail: n => `Сгенерированная запись #${n}`,
          scrollPosition: (first, total) =>
            `Показана строка ${first.toLocaleString('ru-RU')} из ${total.toLocaleString('ru-RU')}`,
        },
        commandPalette: {
          hint: 'Нажмите Ctrl + K (или Cmd + K), чтобы открыть палитру команд в любом месте этой страницы.',
          openButton: 'Открыть палитру команд',
          fileGroup: 'Файл',
          editGroup: 'Правка',
          newFile: 'Новый файл',
          openFile: 'Открыть файл',
          save: 'Сохранить',
          find: 'Найти',
          findKeyword: 'поиск',
          replace: 'Заменить',
          undo: 'Отменить',
          toggleTheme: 'Переключить тему',
          toggleThemeDescription: 'Переключение между светлым и тёмным режимом',
          lockWorkspace: 'Заблокировать рабочую область',
          lockWorkspaceDescription: 'Сейчас отключено, функция в бете',
          executedToast: label => `Выполнено: ${label}`,
        },
        avatarEditorActions: {
          avatarUpdatedToast: 'Аватар обновлён',
        },
      },
      playground: {
        controls: 'Элементы управления',
        reset: 'Сбросить',
        code: 'Код',
        apiReference: 'Справочник API',
        inputs: 'Входные параметры',
        outputs: 'Выходные параметры',
        methods: 'Методы',
        colName: 'Имя',
        colType: 'Тип',
        colDefault: 'По умолчанию',
        colDescription: 'Описание',
        errorMessagesDescription:
          'Переопределяет сообщение валидации для каждого ключа ошибки привязанного элемента формы; для незаданных ключей используется локализованное значение по умолчанию.',
        ariaLabelDescription:
          'Доступное имя, объявляемое ассистивными технологиями, когда компонент не отрисовывает видимую метку.',
        triggerErrorLabel: 'Вызвать ошибку',
        requiredBadge: 'обязательно',
        twoWayBadge: 'двусторонняя',
        rangeHint: { between: 'до', min: 'Мин', max: 'Макс' },
        knobLabels: {
          timeline: { orientation: 'Ориентация', align: 'Выравнивание', size: 'Размер' },
          tooltip: {
            eaTooltip: 'Содержимое подсказки',
          },
          input: {
            label: 'Метка',
            placeholder: 'Плейсхолдер',
            size: 'Размер',
            type: 'Тип',
            disabled: 'Отключено',
            readonly: 'Только для чтения',
            required: 'Обязательно',
            autofocus: 'Автофокус',
            showPasswordToggle: 'Показать переключатель пароля',
            clearable: 'Очищаемое',
            autocomplete: 'Автозаполнение',
          },
          'number-input': {
            allowNegative: 'Разрешить отрицательные',
            label: 'Метка',
            placeholder: 'Плейсхолдер',
            size: 'Размер',
            min: 'Минимум',
            max: 'Максимум',
            step: 'Шаг',
            maxDigits: 'Макс. цифр',
            disabled: 'Отключено',
            readonly: 'Только для чтения',
            required: 'Обязательно',
          },
          'form-field': {
            size: 'Размер',
            label: 'Метка',
            hint: 'Подсказка',
            required: 'Обязательно',
          },
          alert: {
            variant: 'Вариант',
            dismissible: 'Закрываемое',
            size: 'Размер',
            icon: 'Иконка (переопределение)',
          },
          toast: {
            icon: 'Иконка (переопределение)',
            title: 'Заголовок',
          },
          avatar: {
            size: 'Размер',
            shape: 'Форма',
            src: 'Источник изображения',
            initials: 'Инициалы',
            alt: 'Альтернативный текст',
          },
          badge: {
            variant: 'Вариант',
            size: 'Размер',
            shape: 'Форма',
          },
          button: {
            variant: 'Вариант',
            size: 'Размер',
            type: 'Тип',
            disabled: 'Отключено',
            loading: 'Загрузка',
            fullWidth: 'На всю ширину',
          },
          card: {
            variant: 'Вариант',
            padding: 'Отступы',
            headerAlign: 'Выравнивание заголовка',
            fullWidth: 'На всю ширину',
            headerDivider: 'Разделитель заголовка',
          },
          checkbox: {
            label: 'Метка',
            count: 'Счётчик',
            size: 'Размер',
            disabled: 'Отключено',
            required: 'Обязательно',
            indeterminate: 'Неопределённое',
          },
          'code-input': {
            size: 'Размер',
            length: 'Длина',
            label: 'Метка',
            placeholder: 'Плейсхолдер',
            disabled: 'Отключено',
            readonly: 'Только для чтения',
            required: 'Обязательно',
          },
          'color-picker': {
            label: 'Метка',
            placeholder: 'Плейсхолдер',
            size: 'Размер',
            format: 'Формат',
            showAlpha: 'Показать альфа-канал',
            clearable: 'Очищаемое',
            disabled: 'Отключено',
            readonly: 'Только для чтения',
            required: 'Обязательно',
          },
          divider: {
            orientation: 'Ориентация',
            label: 'Метка',
          },
          'eagami-wordmark': {
            variant: 'Вариант',
            layout: 'Макет',
            size: 'Размер (px)',
            linked: 'Ссылка',
          },
          'empty-state': {
            size: 'Размер',
            headingLevel: 'Уровень заголовка',
            title: 'Заголовок',
            description: 'Описание',
          },
          paginator: {
            align: 'Выравнивание',
            showPageSizeSelector: 'Показать выбор размера страницы',
            showRangeLabel: 'Показать метку диапазона',
            disabled: 'Отключено',
            totalItems: 'Всего элементов',
          },
          'progress-bar': {
            variant: 'Вариант',
            size: 'Размер',
            value: 'Значение',
            max: 'Максимум',
            buffer: 'Буфер',
            showPercentage: 'Показать проценты',
            indeterminate: 'Неопределённый',
            label: 'Метка',
          },
          radio: {
            label: 'Метка',
            disabled: 'Отключено',
          },
          'range-slider': {
            label: 'Метка',
            hint: 'Подсказка',
            errorMsg: 'Сообщение об ошибке',
            min: 'Минимум',
            max: 'Максимум',
            step: 'Шаг',
            size: 'Размер',
            showValue: 'Показать значение',
            showMinMaxLabels: 'Показать метки мин/макс',
            disabled: 'Отключено',
            required: 'Обязательно',
          },
          rating: {
            label: 'Метка',
            size: 'Размер',
            min: 'Минимум',
            max: 'Максимум',
            allowHalf: 'Разрешить половинные шаги',
            readonly: 'Только для чтения',
            disabled: 'Отключено',
            required: 'Обязательно',
            clearable: 'Очищаемое',
            iconClass: 'Иконка',
          },
          skeleton: {
            variant: 'Вариант',
            animated: 'Анимировано',
            width: 'Ширина',
            height: 'Высота',
          },
          slider: {
            size: 'Размер',
            min: 'Мин',
            max: 'Макс',
            step: 'Шаг',
            showValue: 'Показать значение',
            showMinMaxLabels: 'Показать метки мин/макс',
            disabled: 'Отключено',
            required: 'Обязательно',
            hasError: 'Состояние ошибки',
            label: 'Метка',
          },
          spinner: {
            size: 'Размер',
            label: 'Метка',
          },
          switch: {
            label: 'Метка',
            size: 'Размер',
            disabled: 'Отключено',
            required: 'Обязательно',
          },
          tag: {
            variant: 'Вариант',
            size: 'Размер',
            removable: 'Удаляемый',
            disabled: 'Отключено',
            removeLabel: 'Метка удаления',
          },
          textarea: {
            label: 'Метка',
            placeholder: 'Плейсхолдер',
            size: 'Размер',
            resize: 'Изменение размера',
            maxlength: 'Макс. длина (симв.)',
            minHeight: 'Мин. высота (px)',
            maxHeight: 'Макс. высота (px)',
            disabled: 'Отключено',
            readonly: 'Только для чтения',
            required: 'Обязательно',
          },
        },
        knobNotes: { accordion: { headingLevel: '(только семантически)' } },

        descriptions: {
          timeline: {
            items: 'Отображаемые события по порядку.',
            orientation: 'Направление, в котором идёт временная шкала.',
            align:
              'Расположение содержимого относительно линии; alternate применяется только к вертикальным шкалам.',
            size: 'Визуальный размер временной шкалы.',
          },
          toast: {
            size: 'Визуальный размер, применяемый к каждому тосту в стеке.',
            position:
              'Угол или край области просмотра, к которому прикреплён стек тостов.',
            clearable: 'Показывать кнопку закрытия на каждом тосте.',
          },
          input: {
            label: 'Текстовая метка, отображаемая над полем.',
            type: 'Нативный тип input (password добавляет встроенный переключатель показа/скрытия).',
            placeholder: 'Плейсхолдер, отображаемый, пока поле пустое.',
            size: 'Визуальный размер поля.',
            hint: 'Вспомогательный текст под полем, скрывается при отображении ошибки.',
            errorMsg:
              'Сообщение об ошибке под полем, заменяет подсказку и помечает поле недействительным.',
            disabled: 'Отключает поле.',
            readonly: 'Делает поле только для чтения.',
            required: 'Помечает поле как обязательное.',
            autocomplete: 'Значение для нативного атрибута autocomplete.',
            list: 'id элемента <datalist> для привязки нативных подсказок.',
            autofocus: 'Фокусирует поле один раз, после первой отрисовки.',
            showPasswordToggle: 'Показывает переключатель раскрытия для полей пароля.',
            clearable: 'Показывает кнопку очистки, пока в поле есть значение.',
            id: 'id, применяемый к нативному input и атрибуту for метки, генерируется автоматически, если не задан.',
            value: 'Текущее значение поля, двусторонняя привязка через [(value)].',
            blurred: 'Срабатывает, когда поле теряет фокус.',
            focused: 'Срабатывает, когда поле получает фокус.',
            clear: 'Очищает текущее значение и возвращает фокус полю.',
            focus: 'Перемещает фокус клавиатуры на лежащее в основе нативное поле.',
            togglePasswordVisibility:
              'Переключает состояние раскрытия пароля для полей type="password".',
            icon: 'Компонент ведущей иконки, отрисовываемый перед текстом.',
            max: 'Максимальное значение для type="number"; значение ограничивается им при потере фокуса.',
            maxLength:
              'Максимальное число символов; применяется для type="number", где нативный maxlength игнорируется.',
            min: 'Минимальное значение для type="number"; значение ограничивается им при потере фокуса.',
            minLength:
              'Минимальное число символов, передаётся как нативный атрибут minlength.',
            step: 'Шаг приращения для полей type="number".',
            clampToBounds:
              'Ограничивает числовое значение настроенным диапазоном min/max по завершении редактирования.',
          },
          'number-input': {
            allowNegative:
              'Разрешены ли отрицательные значения; при false нижняя граница равна 0.',
            label: 'Текстовая метка, отображаемая над полем.',
            placeholder: 'Плейсхолдер, отображаемый, пока поле пустое.',
            size: 'Визуальный размер поля.',
            hint: 'Вспомогательный текст под полем, скрывается при отображении ошибки.',
            errorMsg:
              'Сообщение об ошибке под полем, заменяет подсказку и помечает поле недействительным.',
            disabled: 'Отключает поле.',
            readonly: 'Делает поле только для чтения.',
            required: 'Помечает поле как обязательное.',
            min: 'Минимальное значение; введённые значения ограничиваются им при потере фокуса.',
            max: 'Максимальное значение; введённые значения ограничиваются им при потере фокуса.',
            step: 'Величина, которую каждый шаг стрелками прибавляет или вычитает.',
            maxDigits:
              'Ограничивает количество символов, принимаемых полем, и его ширину; шесть символов, если не задано.',
            id: 'id, применяемый к нативному input и атрибуту for метки, генерируется автоматически, если не задан.',
            value:
              'Текущее значение поля; null, когда пусто, двусторонняя привязка через [(value)].',
            changed: 'Срабатывает с новым значением при каждом его изменении.',
            focused: 'Срабатывает, когда поле получает фокус.',
            blurred: 'Срабатывает, когда поле теряет фокус.',
            focus: 'Перемещает фокус клавиатуры на лежащее в основе нативное поле.',
          },
          accordion: {
            size: 'Визуальный размер аккордеона; каждый элемент наследует его.',
            multi: 'Позволяет нескольким элементам оставаться раскрытыми одновременно.',
            headingLevel:
              'Уровень заголовка (1-6), применяемый к заголовку каждого элемента, чтобы аккордеон вписывался в структуру страницы.',
          },
          alert: {
            dismissible:
              'Показывает кнопку закрытия, позволяющую пользователю закрыть оповещение.',
            variant:
              'Семантическая цветовая схема, определяющая иконку и палитру оповещения.',
            visible:
              'Отображается ли оповещение, двусторонняя привязка через [(visible)].',
            dismissed:
              'Срабатывает, когда пользователь закрывает оповещение кнопкой закрытия.',
            dismiss: 'Скрывает оповещение и испускает событие dismissed.',
            size: 'Масштабирует текст, иконку и отступ вместе.',
            icon: 'Переопределяет статусную иконку варианта по умолчанию любым компонентом иконки.',
          },
          avatar: {
            src: 'URL изображения для отображения; откатывается к инициалам, затем к универсальной иконке пользователя.',
            alt: 'Альтернативный текст для изображения аватара.',
            initials: 'Инициалы, отображаемые, когда источник изображения не указан.',
            size: 'Предустановка диаметра аватара.',
            shape: 'Контур аватара: круг или скруглённый квадрат.',
          },
          badge: {
            variant: 'Семантическая цветовая схема бейджа.',
            size: 'Визуальный размер бейджа.',
            shape:
              'Внешняя форма бейджа (pill облегает содержимое, pin отрисовывается как круг для одиночных символов).',
          },
          button: {
            variant: 'Визуальный стиль кнопки, определяющий её цвет и акцент.',
            size: 'Визуальный размер кнопки.',
            type: 'Нативный атрибут type, применяемый к лежащему в основе элементу button.',
            disabled: 'Отключает кнопку и подавляет события клика.',
            loading: 'Заменяет метку спиннером, сохраняя отрисованную ширину.',
            fullWidth: 'Растягивает кнопку на всю ширину контейнера.',
            ariaLabel:
              'Доступная метка для кнопки, когда её содержимого недостаточно для описания.',
            ariaCurrent:
              'Значение для нативного атрибута aria-current, помечающее кнопку как текущий элемент в наборе.',
            clicked:
              'Срабатывает при активации кнопки, подавляется в отключённом состоянии или при загрузке.',
            icon: 'Необязательный компонент иконки, отрисовываемый слева от метки.',
          },
          card: {
            variant: 'Визуальный стиль поверхности карточки.',
            padding:
              'Предустановка отступов, применяемая к области содержимого карточки.',
            headerAlign: 'Горизонтальное выравнивание содержимого заголовка.',
            fullWidth: 'Растягивает карточку на всю доступную ширину.',
            headerDivider: 'Показывает разделитель между заголовком и телом.',
          },
          checkbox: {
            ariaLabel: 'Доступное имя для флажка, когда видимая метка не отрисовывается.',
            checked:
              'Текущее состояние отметки, двусторонняя привязка через [(checked)].',
            count: 'Дополнительное значение, отображаемое приглушённо сразу после метки.',
            disabled: 'Отключает флажок.',
            errorMsg:
              'Сообщение об ошибке под полем, заменяет подсказку и помечает поле недействительным.',
            hint: 'Вспомогательный текст под полем, скрывается при отображении ошибки.',
            id: 'id, применяемый к нативному input и атрибуту for метки, генерируется автоматически, если не задан.',
            indeterminate: 'Отрисовывает флажок в визуально неопределённом состоянии.',
            label: 'Текстовая метка, отрисовываемая рядом с флажком.',
            required: 'Помечает флажок как обязательный.',
            size: 'Визуальный размер флажка.',
            changed:
              'Срабатывает с новым состоянием отметки всякий раз, когда пользователь переключает флажок.',
          },
          'code-input': {
            disabled: 'Отключает каждую ячейку цифры.',
            errorMsg:
              'Сообщение об ошибке под полем, заменяет подсказку и помечает поле недействительным.',
            hint: 'Вспомогательный текст под полем, скрывается при отображении ошибки.',
            id: 'id, применяемый к ячейкам цифр и атрибуту for метки, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отображаемая над полем.',
            length: 'Число ячеек цифр, из которых состоит код.',
            placeholder:
              'Текст плейсхолдера, распределяемый по одному символу на ячейку.',
            readonly: 'Делает поле только для чтения.',
            required: 'Помечает поле как обязательное.',
            size: 'Визуальный размер каждой ячейки цифры.',
            value: 'Текущее значение кода, двусторонняя привязка через [(value)].',
            completed: 'Срабатывает с полным кодом, как только введена каждая цифра.',
            focus:
              'Перемещает фокус клавиатуры на следующую пустую цифру (или на последнюю, когда всё заполнено).',
            allowAllChars:
              'Разрешить любой непробельный символ; когда выключено, принимаются только цифры.',
          },
          'color-picker': {
            disabled: 'Отключает поле.',
            errorMsg:
              'Сообщение об ошибке под полем, заменяет подсказку и помечает поле недействительным.',
            format: 'Формат вывода испускаемого значения цвета (hex, rgb или hsl).',
            hint: 'Вспомогательный текст под полем, скрывается при отображении ошибки.',
            id: 'id, применяемый к триггеру и атрибуту for метки, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отображаемая над полем.',
            placeholder: 'Плейсхолдер, отображаемый на триггере, пока цвет не выбран.',
            presets:
              'Предустановленные образцы, отображаемые внизу поповера; передайте пустой массив, чтобы скрыть их.',
            readonly: 'Делает поле только для чтения, не давая поповеру открываться.',
            required: 'Помечает поле как обязательное.',
            showAlpha:
              'Показывает альфа-ползунок и включает альфа-канал в испускаемое значение.',
            clearable: 'Показывать ли кнопку очистки, когда задано значение.',
            size: 'Визуальный размер триггера выбора цвета.',
            value: 'Текущая строка цвета, двусторонняя привязка через [(value)].',
            changed:
              'Срабатывает с новой строкой цвета всякий раз, когда выбор меняется.',
            cycleInputMode:
              'Переключает строку ввода поповера между hex-строкой и каналами RGB.',
            hasEyeDropper: 'Возвращает, поддерживает ли браузер EyeDropper API.',
            onHexInput:
              'Применяет введённый hex-текст к текущему цвету по мере редактирования пользователем.',
            onPopoverCloseRequested:
              'Закрывает поповер, когда пользователь нажимает за пределами выбора цвета.',
          },
          divider: {
            label:
              'Необязательная центрированная метка, отрисовываемая внутри линии разделителя.',
            orientation: 'Ориентация, в которой проходит линия разделителя.',
            thick: 'Отрисовывает более толстую линию.',
          },
          'eagami-wordmark': {
            variant:
              'Вариант содержимого: default это голый логотип-надпись, byline добавляет строку «designed-by», tagline добавляет слоган.',
            layout: 'Размещает логотип-надпись в столбик по строкам или в одну строку.',
            size: 'Размер шрифта текста бренда в px; остальной логотип масштабируется от него.',
            linked:
              'Отображает логотип как ссылку на eagami.com; отключите, чтобы встроить его в свою ссылку или статический контекст.',
          },
          'empty-state': {
            title: 'Текст заголовка, отображаемый над описанием.',
            description: 'Вспомогательный текст, отображаемый под заголовком.',
            size: 'Визуальный размер блока пустого состояния.',
            headingLevel:
              'Уровень заголовка, используемый для заголовка, чтобы он вписывался в структуру окружающего документа.',
            bordered: 'Отрисовывает пунктирную рамку вокруг блока.',
            icon: 'Необязательный компонент иконки, отрисовываемый в области медиа над заголовком.',
          },
          paginator: {
            groupThousands: 'Группирует тысячи запятыми в диапазоне и номерах страниц.',
            size: 'Визуальный размер пагинатора и его элементов управления.',
            align:
              'Горизонтальное выравнивание элементов управления пагинатора внутри их контейнера.',
            disabled: 'Отключает все элементы управления пагинатора.',
            page: 'Текущий номер страницы, двусторонняя привязка через [(page)].',
            pageSize:
              'Число элементов на странице, двусторонняя привязка через [(pageSize)].',
            pageSizeOptions:
              'Доступные размеры страниц, предлагаемые в селекторе размера страницы.',
            showPageSizeSelector:
              'Показывает элемент управления выбором размера страницы.',
            showRangeLabel: 'Показывает метку, описывающую видимый диапазон элементов.',
            totalItems:
              'Общее число элементов, используемое для вычисления количества страниц.',
            changed:
              'Срабатывает, когда пользователь меняет текущую страницу или размер страницы.',
            goToPage:
              'Переходит на заданную страницу, ограниченную допустимым диапазоном.',
            nextPage: 'Переходит на следующую страницу, если она существует.',
            prevPage: 'Переходит на предыдущую страницу, если она существует.',
          },
          'progress-bar': {
            variant: 'Цветовой вариант полосы.',
            size: 'Визуальная толщина полосы.',
            value: 'Текущее значение прогресса.',
            max: 'Значение, при котором полоса заполнена.',
            buffer:
              'Буферизованная позиция впереди значения, показанная дополнительным цветом.',
            showPercentage: 'Показывает текущий процент рядом с полосой.',
            indeterminate:
              'Отрисовывает зацикленную анимацию для прогресса неизвестной длительности.',
            label: 'Текстовая метка, отображаемая над полосой.',
          },
          radio: {
            disabled: 'Отключает этот вариант.',
            id: 'id, применяемый к нативному radio-input и атрибуту for метки, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отрисовываемая рядом с радиокнопкой.',
            value:
              'Значение, которое этот вариант вносит в родительскую группу при выборе.',
          },
          'range-slider': {
            ariaLabelHigh:
              'Доступная метка для верхнего (конечного) ползунка, откатывается к метке поля, если не задана.',
            ariaLabelLow:
              'Доступная метка для нижнего (начального) ползунка, откатывается к метке поля, если не задана.',
            disabled: 'Отключает слайдер.',
            errorMsg:
              'Сообщение об ошибке под слайдером, заменяет подсказку и помечает поле недействительным.',
            formatValue:
              'Форматтер, применяемый к каждому значению перед его отображением.',
            hint: 'Вспомогательный текст под слайдером, скрывается при отображении ошибки.',
            id: 'id, применяемый к слайдеру, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отображаемая над слайдером.',
            max: 'Наибольшее значение, которого может достичь любой ползунок.',
            min: 'Наименьшее значение, которого может достичь любой ползунок.',
            required: 'Помечает поле как обязательное.',
            showMinMaxLabels: 'Показывает границы мин и макс на концах дорожки.',
            showValue: 'Показывает текущие нижнее и верхнее значения рядом со слайдером.',
            size: 'Визуальный размер дорожки и ползунков.',
            step: 'Приращение, к которому привязывается каждый ползунок при перемещении.',
            value:
              'Текущий кортеж диапазона [low, high], двусторонняя привязка через [(value)].',
            changed:
              'Срабатывает с новым кортежем [low, high] всякий раз, когда любой ползунок перемещается.',
            commitThumb:
              'Привязывает ползунок к ближайшему шагу, ограничивает его границами и сдерживает противоположным ползунком.',
            groupThousands:
              'Группирует отображаемые значения разделителями тысяч, игнорируется, когда предоставлен пользовательский formatValue.',
            formatDisplay:
              'Форматирует значение для отображения, применяя группировку тысяч, если не задана пользовательская функция formatValue.',
          },
          rating: {
            allowHalf:
              'Разрешает гранулярность в половину звезды, позволяя значению двигаться шагами по 0,5.',
            clearable: 'Клик по текущему значению сбрасывает рейтинг обратно к 0.',
            disabled: 'Отключает рейтинг.',
            errorMsg:
              'Сообщение об ошибке под рейтингом, заменяет подсказку и помечает его недействительным.',
            halfIconClass:
              'Класс самостоятельного компонента, отрисовываемый для половинных позиций, когда allowHalf равно true.',
            hint: 'Вспомогательный текст под рейтингом, скрывается при отображении ошибки.',
            iconClass:
              'Класс самостоятельного компонента, отрисовываемый для пустых и полных позиций.',
            id: 'id, применяемый к рейтингу и его метке, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отображаемая над рейтингом.',
            max: 'Наибольшее значение рейтинга и число отрисовываемых звёзд.',
            min: 'Наименьшее значение рейтинга, которое может выбрать пользователь.',
            readonly:
              'Отрисовывает рейтинг только для отображения, игнорируя клики и ввод с клавиатуры.',
            required: 'Помечает рейтинг как обязательный.',
            size: 'Визуальный размер рейтинга.',
            value: 'Текущее значение рейтинга, двусторонняя привязка через [(value)].',
            hoverChanged:
              'Срабатывает с предпросматриваемым значением при наведении и с null, когда курсор уходит.',
            iconForState:
              'Возвращает класс компонента для создания экземпляра для заданного состояния звезды.',
            stateFor:
              'Определяет состояние отрисовки (пустое, половинное или полное) для позиции звезды.',
          },
          skeleton: {
            animated:
              'Воспроизводит пульсирующую анимацию мерцания, автоматически подавляется, когда пользователь предпочитает уменьшенную анимацию.',
            height:
              'Явная CSS-высота, применяемая к плейсхолдеру, по умолчанию равна собственному размеру формы, если не задана.',
            variant:
              'Предустановка формы плейсхолдера: текстовая строка, круг или прямоугольник.',
            width:
              'Явная CSS-ширина, применяемая к плейсхолдеру, по умолчанию равна собственному размеру формы, если не задана.',
          },
          slider: {
            ariaLabel:
              'Доступная метка, применяемая, когда видимая метка не отрисовывается.',
            disabled: 'Отключает слайдер.',
            errorMsg:
              'Сообщение об ошибке под слайдером, заменяет подсказку и помечает поле недействительным.',
            formatValue:
              'Форматтер, превращающий числовое значение в отображаемый текст.',
            hasError:
              'Принудительно применяет стилизацию состояния ошибки без привязки сообщения об ошибке.',
            hint: 'Вспомогательный текст под слайдером, скрывается при отображении ошибки.',
            id: 'id, применяемый к слайдеру и его метке, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отображаемая над слайдером.',
            max: 'Наибольшее значение, которого может достичь слайдер.',
            min: 'Наименьшее значение, которого может достичь слайдер.',
            required: 'Помечает слайдер как обязательный.',
            showMinMaxLabels: 'Показывает границы мин и макс под дорожкой.',
            showValue: 'Показывает текущее значение рядом с меткой.',
            size: 'Визуальный размер дорожки и ползунка слайдера.',
            step: 'Приращение, к которому привязывается значение при движении слайдера.',
            value: 'Текущее значение слайдера, двусторонняя привязка через [(value)].',
            changed:
              'Срабатывает с новым привязанным значением всякий раз, когда слайдер перемещается.',
            groupThousands:
              'Группирует отображаемые значения разделителями тысяч, игнорируется, когда предоставлен пользовательский formatValue.',
            formatDisplay:
              'Форматирует значение для отображения, применяя группировку тысяч, если не задана пользовательская функция formatValue.',
          },
          spinner: {
            label:
              'Доступная метка, объявляемая ассистивным технологиям, откатывается к переводу активного языка, если не задана.',
            size: 'Визуальный размер спиннера.',
          },
          switch: {
            ariaLabel:
              'Доступная метка для переключателя, когда видимая метка не отрисовывается.',
            checked:
              'Текущее состояние вкл/выкл, двусторонняя привязка через [(checked)].',
            disabled: 'Отключает переключатель и блокирует переключение.',
            errorMsg:
              'Сообщение об ошибке под переключателем, заменяет подсказку и помечает поле недействительным.',
            hint: 'Вспомогательный текст под переключателем, скрывается при отображении ошибки.',
            id: 'id, применяемый к лежащему в основе флажку и атрибуту for метки, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отрисовываемая рядом с переключателем.',
            required: 'Помечает переключатель как обязательный.',
            size: 'Визуальный размер переключателя.',
            changed:
              'Срабатывает с новым состоянием отметки всякий раз, когда пользователь переключает переключатель.',
          },
          tag: {
            variant: 'Семантическая цветовая схема тега.',
            size: 'Визуальный размер тега.',
            maxWidth:
              'Максимальная ширина тега в px; более длинная подпись обрезается. Также задаётся через --ea-tag-max-width.',
            tooltip:
              'Показывает ли подпись, обрезанная maxWidth, полный текст во всплывающей подсказке; none для тега внутри подсказки.',
            removable:
              'Отрисовывает кнопку удаления, которая испускает removed при активации.',
            disabled: 'Отключает тег и его кнопку удаления.',
            removeLabel:
              'Доступная метка для кнопки удаления, откатывается к активному языку.',
            removeTabbable:
              'Является ли кнопка удаления точкой остановки табуляции; задайте false внутри составного виджета, который сам управляет навигацией с клавиатуры.',
            removed:
              'Срабатывает, когда пользователь активирует кнопку удаления на удаляемом теге.',
          },
          textarea: {
            disabled: 'Отключает поле.',
            errorMsg:
              'Сообщение об ошибке под полем, заменяет подсказку и помечает поле недействительным.',
            hint: 'Вспомогательный текст под полем, скрывается при отображении ошибки.',
            id: 'id, применяемый к нативному textarea и атрибуту for метки, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отображаемая над полем.',
            maxHeight:
              'Потолок высоты поля в пикселях; за его пределами textarea прокручивается вертикально, а не растёт.',
            minHeight: 'Минимальная высота в px; никогда не меньше высоты по умолчанию.',
            maxlength: 'Максимальное число символов, которое принимает поле.',
            placeholder: 'Плейсхолдер, отображаемый, пока поле пустое.',
            readonly: 'Делает поле только для чтения.',
            required: 'Помечает поле как обязательное.',
            resize: 'Ось, вдоль которой пользователь может изменять размер поля.',
            size: 'Визуальный размер поля.',
            value: 'Текущее значение поля, двусторонняя привязка через [(value)].',
            blurred: 'Срабатывает, когда поле теряет фокус.',
            focused: 'Срабатывает, когда поле получает фокус.',
            focus: 'Перемещает фокус клавиатуры на лежащее в основе нативное textarea.',
          },
          'avatar-editor': {
            accept:
              'Принимаемые MIME-типы для выбора файла, передаваемые нативному input.',
            canvasSize: 'Ширина и высота в пикселях квадратного холста кадрирования.',
            cropState:
              'Начальное состояние панорамирования/масштаба для восстановления при загрузке исходного изображения.',
            currentSrc: 'URL изображения для загрузки в редактор при инициализации.',
            exportQuality:
              'Качество JPEG/WebP, используемое при экспорте кадрированного изображения, от 0 до 1.',
            exportType:
              'MIME-тип экспортируемого blob изображения (например, image/png или image/jpeg).',
            loading: 'Показывает оверлей-скелет, пока загружается внешний ресурс.',
            maxFileSize:
              'Максимально допустимый размер файла в байтах; файлы сверх этого лимита испускают errored.',
            maxZoom:
              'Максимальный множитель масштаба, которого может достичь пользователь.',
            minZoom:
              'Минимальный множитель масштаба, которого может достичь пользователь.',
            shape:
              'Форма маски кадрирования, применяемая к холсту и экспортируемому изображению.',
            cropped:
              'Срабатывает, когда пользователь экспортирует кадр, предоставляя и Blob, и data URL.',
            cropStateChanged:
              'Срабатывает всякий раз, когда пользователь панорамирует или масштабирует изображение, полезно для сохранения состояния правки.',
            errored:
              'Срабатывает с понятным человеку сообщением, когда валидация файла не проходит.',
            fileSelected:
              'Срабатывает, когда файл выбран с диска или перетащен в редактор.',
            removed:
              'Срабатывает, когда текущее изображение очищается через элемент управления удаления.',
            captureOriginal:
              'Помечает текущее изображение и состояние кадрирования как базовое для revertImage.',
            exportCrop:
              'Отрисовывает текущий кадр на внеэкранный холст, испускает cropped и разрешается с Blob.',
            openFilePicker: 'Открывает нативный диалог выбора файла.',
            removeImage:
              'Очищает загруженное изображение и сбрасывает панорамирование и масштаб к значениям по умолчанию.',
            revertImage:
              'Восстанавливает изображение и состояние кадрирования, захваченные последним вызовом captureOriginal.',
            setZoom:
              'Задаёт уровень масштаба, ограниченный настроенным диапазоном minZoom и maxZoom.',
            updateImageDarkness:
              'Сэмплирует видимую область кадрирования, чтобы определить, темнее ли изображение, чем средне-серый.',
          },
          'menu-trigger': {
            menu: 'Экземпляр ea-menu, которым управляет этот триггер.',
          },
          tooltip: {
            maxWidth:
              'Максимальная ширина в пикселях; текст переносится на этой ширине (нижний предел 50px).',
            eaTooltip:
              'Содержимое подсказки, отображаемой при наведении и фокусе с клавиатуры. Принимает обычную строку или TemplateRef для стилизованного содержимого.',
            tooltipPosition: 'Размещение подсказки относительно её хост-элемента.',
          },
          'time-picker': {
            disabled: 'Отключает выбор времени.',
            errorMsg:
              'Сообщение об ошибке под полем, заменяет подсказку и помечает поле недействительным.',
            format:
              'Формат отображения метки триггера; значение для передачи всегда в 24-часовом формате.',
            hint: 'Вспомогательный текст под полем, скрывается при отображении ошибки.',
            id: 'id, применяемый к триггеру и атрибуту for метки, генерируется автоматически, если не задан.',
            includeSeconds: 'Показывает столбец секунд рядом с часами и минутами.',
            label: 'Текстовая метка, отображаемая над полем.',
            minuteStep:
              'Приращение, к которому привязывается столбец минут при пошаговом изменении или перетаскивании.',
            placeholder: 'Плейсхолдер, отображаемый на триггере, пока время не выбрано.',
            readonly: 'Делает поле только для чтения, не давая поповеру открываться.',
            required: 'Помечает поле как обязательное.',
            secondStep:
              'Приращение, к которому привязывается столбец секунд при пошаговом изменении или перетаскивании.',
            size: 'Визуальный размер триггера выбора времени.',
            value:
              'Текущая строка времени в формате HH:MM или HH:MM:SS (24-часовой), двусторонняя привязка через [(value)], или null, если не задана.',
            changed:
              'Срабатывает с новой строкой времени всякий раз, когда пользователь меняет выбранное время.',
            advanceFocus:
              'Перемещает фокус на следующий столбец единицы после завершения ввода цифры.',
            cannotExtend:
              'Возвращает true, когда никакая дополнительная цифра не может корректно расширить текущий буфер для заданной единицы.',
            commitDigits:
              'Разбирает буферизованную строку цифр, ограничивает её допустимым диапазоном единицы и записывает в значение.',
            flushBuffer: 'Фиксирует любой ожидающий буфер введённых цифр и очищает его.',
            focusHoursWhenReady:
              'Фокусирует ввод часов, как только поверхность поповера отрисована в DOM.',
            hoursFromTyped:
              'Преобразует введённое значение часов в его 24-часовой эквивалент с учётом текущего периода AM/PM.',
            onPopoverCloseRequested:
              'Закрывает поповер, когда пользователь нажимает за пределами выбора времени.',
            onSpinnerBlur:
              'Фиксирует любой ожидающий буфер цифр, когда столбец спиннера теряет фокус.',
            onSpinnerFocus:
              'Выделяет весь текст в столбце спиннера при получении фокуса, чтобы первое нажатие клавиши заменило его.',
            onSpinnerInput:
              'Обрабатывает ввод цифр в столбце спиннера, обновляет буфер и автоматически перемещает фокус, когда столбец заполнен.',
            startHold:
              'Начинает повтор при длительном нажатии на кнопку-шеврон, изменяя заданную единицу и ускоряясь после задержки.',
            step: 'Изменяет заданный столбец единицы вверх или вниз на одно настроенное приращение.',
            stopHold: 'Отменяет любые активные таймеры повтора длительного нажатия.',
            togglePeriod:
              'Переключает период AM/PM в 12-часовом режиме, переключая 12-часовое смещение.',
          },
          autocomplete: {
            disabled: 'Отключает поле.',
            emptyMessage:
              'Сообщение, отображаемое в списке, когда ни один вариант не соответствует текущему вводу, откатывается к переводу активного языка, если не задано.',
            errorMsg:
              'Сообщение об ошибке под полем, заменяет подсказку и помечает поле недействительным.',
            hint: 'Вспомогательный текст под полем, скрывается при отображении ошибки.',
            id: 'id, применяемый к нативному input и атрибуту for метки, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отображаемая над полем.',
            maxResults:
              'Максимальное число вариантов, отображаемых в списке подсказок одновременно.',
            minLength:
              'Минимальное число символов, требуемое перед появлением списка подсказок.',
            options: 'Полный список вариантов, доступных для фильтрации и выбора.',
            placeholder: 'Плейсхолдер, отображаемый, пока поле пустое.',
            readonly: 'Делает поле только для чтения.',
            required: 'Помечает поле как обязательное.',
            size: 'Визуальный размер поля.',
            value: 'Текущее значение поля, двусторонняя привязка через [(value)].',
            blurred: 'Срабатывает, когда input теряет фокус.',
            changed:
              'Срабатывает всякий раз, когда меняется текст ввода, включая правки свободного текста.',
            focused: 'Срабатывает, когда input получает фокус.',
            selected:
              'Срабатывает, когда пользователь выбирает вариант из списка подсказок.',
            close: 'Закрывает список подсказок без изменения текущего значения.',
            focus: 'Перемещает фокус клавиатуры на лежащий в основе текстовый input.',
            selectOption:
              'Программно выбирает заданный вариант, обновляя значение и закрывая список.',
          },
          'command-palette': {
            emptyMessage:
              'Сообщение, отображаемое, когда поисковый запрос не соответствует ни одному элементу, откатывается к переводу активного языка, если не задано.',
            items: 'Полный список элементов-команд, доступных для поиска и выполнения.',
            open: 'Открыт ли диалог палитры, двусторонняя привязка через [(open)].',
            placeholder: 'Плейсхолдер, отображаемый внутри поля поиска, пока оно пустое.',
            execute:
              'Срабатывает, когда пользователь выбирает команду, испуская выбранный элемент.',
            showActiveHighlight:
              'Возвращает, должна ли активная строка отрисовывать свой подсвеченный фон для заданного плоского индекса.',
          },
          tabs: {
            activeTab:
              'Значение текущей активной вкладки, двусторонняя привязка через [(activeTab)].',
            size: 'Визуальный размер вкладок.',
            variant: 'Визуальный стиль панели вкладок: underline или filled.',
            changed:
              'Срабатывает со значением вновь активной вкладки всякий раз, когда активная вкладка меняется.',
            registerTab:
              'Регистрирует дочернюю вкладку, чтобы она появилась в панели вкладок; вызывается автоматически компонентом ea-tab.',
            selectTab: 'Программно активирует вкладку с заданным значением.',
            unregisterTab:
              'Удаляет ранее зарегистрированную дочернюю вкладку; вызывается автоматически компонентом ea-tab.',
          },
          tab: {
            disabled: 'Отключает эту вкладку, не давая пользователю выбрать её.',
            id: 'id, применяемый к кнопке вкладки и её панели, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отображаемая на кнопке вкладки.',
            value:
              'Уникальное значение, идентифицирующее эту вкладку внутри родительской группы ea-tabs.',
          },
          'date-picker': {
            disabled: 'Отключает выбор даты.',
            errorMsg:
              'Сообщение об ошибке под полем, заменяет подсказку и помечает поле недействительным.',
            format: 'Формат отображения выбранной даты (short, medium или long).',
            hint: 'Вспомогательный текст под полем, скрывается при отображении ошибки.',
            id: 'id, применяемый к полю и атрибуту for метки, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отображаемая над полем.',
            locale:
              'Тег языка BCP 47, используемый для форматирования даты, откатывается к глобальному языку, если не задан.',
            maxDate:
              'Самая поздняя дата, которую может выбрать пользователь; даты после неё отключены в календаре.',
            minDate:
              'Самая ранняя дата, которую может выбрать пользователь; даты до неё отключены в календаре.',
            placeholder: 'Плейсхолдер, отображаемый в поле, пока дата не выбрана.',
            readonly: 'Делает поле только для чтения, не давая календарю открываться.',
            required: 'Помечает поле как обязательное.',
            size: 'Визуальный размер поля выбора даты.',
            value: 'Текущая выбранная дата, двусторонняя привязка через [(value)].',
            weekStartsOn:
              'Первый день недели в сетке календаря (0 для воскресенья, 1 для понедельника).',
            changed:
              'Срабатывает, когда выбранная дата меняется, в том числе при очистке.',
            clear: 'Очищает выбранную дату и испускает changed со значением null.',
            close: 'Закрывает поповер календаря.',
            focus: 'Перемещает фокус клавиатуры на поле даты.',
            onPopoverCloseRequested:
              'Закрывает поповер, когда пользователь нажимает за пределами выбора даты.',
            open: 'Открывает поповер календаря и перемещает фокус на сфокусированную ячейку дня.',
            toggle: 'Переключает поповер календаря между открытым и закрытым состоянием.',
          },
          menu: {
            size: 'Визуальный размер меню; каждый элемент наследует его.',
            maxHeight:
              'Максимальная высота прокручиваемого списка как CSS-длина; более высокие меню прокручиваются за её пределы.',
            ariaLabel:
              'Доступная метка для списка меню, откатывается к активному языку, если не задана.',
            disabled: 'Отключает меню, не давая ему открываться.',
            id: 'id, применяемый к элементу списка меню, генерируется автоматически, если не задан.',
            open: 'Открыто ли меню, двусторонняя привязка через [(open)].',
            placement: 'Размещение списка меню относительно его элемента-триггера.',
            closed: 'Срабатывает, когда меню закрывается.',
            opened: 'Срабатывает, когда меню открывается.',
            close: 'Закрывает меню и по желанию возвращает фокус элементу-триггеру.',
            focusFirstItem:
              'Перемещает фокус клавиатуры на первый включённый элемент в меню.',
            onPopoverCloseRequested:
              'Закрывает меню, когда пользователь нажимает за его пределами.',
            openAt:
              'Открывает меню, привязанное к заданному элементу-триггеру, и фокусирует первый элемент.',
            toggleAt:
              'Переключает состояние открытия меню, привязывая его к заданному элементу-триггеру.',
          },
          'menu-item': {
            disabled: 'Отключает элемент и подавляет события клика.',
            variant:
              'Визуальный стиль элемента; используйте danger для деструктивных действий.',
            clicked:
              'Срабатывает при активации элемента; родительское меню закрывается сразу после.',
          },
          'multi-select': {
            disabled: 'Отключает мультивыбор.',
            errorMsg:
              'Сообщение об ошибке под полем, заменяет подсказку и помечает поле недействительным.',
            hint: 'Вспомогательный текст под полем, скрывается при отображении ошибки.',
            id: 'id, применяемый к триггеру и атрибуту for метки, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отображаемая над полем.',
            maxVisibleChips:
              'Максимальное число чипов, отображаемых в триггере, прежде чем остальные сворачиваются в счётчик-пилюлю.',
            maxChipWidth:
              'Максимальная ширина чипа выбранного значения в px; более длинная подпись обрезается и показывает полный текст в подсказке.',
            popoverMaxWidth:
              'Максимальная ширина списка вариантов в px или anchor, чтобы ограничить её шириной поля.',
            options: 'Список выбираемых вариантов, отрисовываемых в выпадающем списке.',
            placeholder: 'Плейсхолдер, отображаемый на триггере, пока вариант не выбран.',
            readonly: 'Делает поле только для чтения.',
            required: 'Помечает поле как обязательное.',
            searchable: 'Показывает поле поиска вверху поповера.',
            searchPlaceholder:
              'Плейсхолдер, отображаемый внутри поля поиска, когда поисковый запрос пустой.',
            selectAll:
              'Показывает трёхпозиционную строку «выбрать всё» вверху списка вариантов.',
            size: 'Визуальный размер триггера мультивыбора.',
            value: 'Выбранные значения вариантов, двусторонняя привязка через [(value)].',
            changed: 'Срабатывает с новым значением всякий раз, когда выбор меняется.',
            clear: 'Очищает каждый выбор и останавливает распространение события.',
            handlePopoverKeydown:
              'Обрабатывает навигацию с клавиатуры внутри открытого поповера, маршрутизируя клавиши-стрелки, Enter, Space и Escape.',
            onPopoverCloseRequested:
              'Вызывается поповером, когда пользователь нажимает за его пределами или прокручивает; закрывает панель и помечает поле тронутым.',
            orderedValues:
              'Возвращает заданный набор значений, переупорядоченный в соответствии с массивом входных вариантов.',
            removeChip: 'Удаляет заданный вариант из текущего выбора.',
            toggleOption:
              'Переключает принадлежность заданного варианта к текущему выбору.',
            toggleSelectAll:
              'Выбирает все отфильтрованные варианты, если какие-либо не выбраны, или снимает выбор со всех отфильтрованных вариантов, если выбраны все.',
          },
          dropdown: {
            disabled: 'Отключает выпадающий список.',
            errorMsg:
              'Сообщение об ошибке под полем, заменяет подсказку и помечает поле недействительным.',
            hint: 'Вспомогательный текст под полем, скрывается при отображении ошибки.',
            id: 'id, применяемый к триггеру и атрибуту for метки, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отображаемая над полем.',
            options: 'Список выбираемых вариантов, отрисовываемых в выпадающем списке.',
            placeholder: 'Плейсхолдер, отображаемый на триггере, пока вариант не выбран.',
            readonly: 'Делает поле только для чтения.',
            required: 'Помечает поле как обязательное.',
            size: 'Визуальный размер триггера выпадающего списка.',
            value: 'Текущее выбранное значение, двусторонняя привязка через [(value)].',
            changed:
              'Срабатывает с новым значением, когда пользователь выбирает вариант.',
            close: 'Закрывает выпадающий список без изменения текущего значения.',
            focus: 'Перемещает фокус клавиатуры на триггер выпадающего списка.',
            onPopoverCloseRequested:
              'Вызывается поповером, когда пользователь нажимает за пределами выпадающего списка; закрывает панель и помечает поле тронутым.',
            select: 'Программно выбирает заданный вариант и закрывает список.',
            toggle: 'Переключает выпадающий список между открытым и закрытым состоянием.',
          },
          'file-uploader': {
            accept:
              "Разделённые запятыми MIME-типы и расширения файлов, которые принимает зона перетаскивания, например 'image/*,.pdf'.",
            disabled: 'Отключает загрузчик.',
            errorMsg:
              'Сообщение об ошибке под полем, заменяет подсказку и помечает поле недействительным.',
            hint: 'Вспомогательный текст под полем, скрывается при отображении ошибки.',
            id: 'id, применяемый к зоне перетаскивания и атрибуту for метки, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отображаемая над полем.',
            maxFiles: 'Максимальное общее число файлов; файлы сверх лимита отклоняются.',
            maxSize:
              'Максимальный размер на файл в байтах; более крупные файлы отклоняются.',
            multiple: 'Позволяет выбирать более одного файла за раз.',
            progress:
              'Карта прогресса загрузки на файл (0-100), ключом служит идентичность File; опустите, чтобы скрыть полосы прогресса.',
            required: 'Помечает поле как обязательное.',
            showFileList: 'Показывает список выбранных файлов под зоной перетаскивания.',
            size: 'Визуальный размер загрузчика.',
            value: 'Текущий список файлов, двусторонняя привязка через [(value)].',
            fileRemoved:
              'Срабатывает, когда файл удаляется кнопкой удаления в его строке.',
            dragOverChanged:
              'Срабатывает, когда перетаскивание входит в зону сброса или покидает её, для обёртки со своим стилем перетаскивания.',
            rejected:
              'Срабатывает, когда один или несколько файлов не проходят валидацию, с причиной каждого отклонения.',
            trackFile:
              'Возвращает стабильный ключ отслеживания для файла, используемый внутри списком файлов.',
          },
          'form-field': {
            size: 'Визуальный размер поля; метка, текст элемента управления, отступы и сообщения масштабируются вместе с ним.',
            errorMsg:
              'Сообщение об ошибке под элементом управления, заменяет подсказку и помечает поле недействительным.',
            hint: 'Вспомогательный текст под элементом управления, скрывается при отображении ошибки.',
            id: 'Основа id для связывания метки и сообщения, генерируется автоматически, если не задана.',
            label: 'Текстовая метка, отображаемая над элементом управления.',
            required: 'Помечает поле как обязательное.',
          },
          popover: {
            anchor:
              'Хост-элемент или ElementRef, относительно которого поповер позиционирует себя.',
            ariaLabel:
              'Доступная метка для поверхности поповера; укажите её, когда поповер не содержит видимого заголовка.',
            ariaLabelledby:
              'Id элемента, который именует поверхность поповера, передаётся как aria-labelledby.',
            clamp:
              'Ограничивает поповер внутри области просмотра, когда он иначе вышел бы за её пределы.',
            closeOnEscape: 'Закрывает поповер при нажатии Escape.',
            closeOnOutsideClick:
              'Закрывает поповер, когда пользователь нажимает за пределами и поповера, и его якоря.',
            flip: 'Переворачивается на противоположную сторону, когда запрошенное размещение выходит за пределы области просмотра.',
            matchAnchorWidth: 'Задаёт min-width поповера равным ширине якоря.',
            maxWidth:
              'Максимальная ширина поверхности в px или anchor, чтобы ограничить её шириной якорного элемента.',
            offset: 'Зазор в px между якорем и поверхностью поповера.',
            open: 'Открыт ли поповер в данный момент.',
            placement: 'Предпочтительная позиция поповера относительно его якоря.',
            role: 'ARIA-роль, применяемая к поверхности поповера.',
            scrollBehavior:
              'Как поповер реагирует на события прокрутки и изменения размера, пока открыт: reposition, close или ignore.',
            surfaceId:
              'DOM id для поверхности поповера, используемый элементами-триггерами через aria-controls.',
            trapFocus:
              'Удерживает циклическое перемещение Tab и Shift+Tab внутри поверхности, пока поповер открыт, для поповеров в стиле диалога.',
            closeRequested:
              'Срабатывает, когда поповер запрашивает закрытие; родитель должен отразить это в [open].',
          },
          'accordion-item': {
            disabled: 'Отключает этот элемент, не давая его переключать.',
            id: 'id, применяемый к кнопке заголовка элемента и панели, генерируется автоматически, если не задан.',
            label: 'Текст, отображаемый в кнопке заголовка элемента.',
            value:
              'Уникальный ключ, идентифицирующий этот элемент внутри родительского аккордеона.',
          },
          breadcrumbs: {
            size: 'Визуальный размер цепочки хлебных крошек.',
            ariaLabel:
              'Доступная метка для навигации по хлебным крошкам, откатывается к переводу активного языка, если не задана.',
            items:
              'Массив записей хлебных крошек; элементы с href отрисовываются как ссылки, остальные как кнопки, а последний неинтерактивен.',
            separator:
              'Визуальный стиль разделителя, отрисовываемого между элементами хлебных крошек.',
            clicked:
              'Срабатывает, когда активируется неотключённая, непоследняя хлебная крошка.',
          },
          drawer: {
            animation:
              'Анимация выдвижения при открытии и закрытии выдвижной панели: none (мгновенно), linear (постоянная скорость) или eased (кривая замедления в конце).',
            ariaLabel:
              'Доступная метка для панели, когда её заголовка недостаточно для описания.',
            closeOnBackdrop:
              'Закрывает панель, когда пользователь нажимает на затемнение.',
            closeOnEscape:
              'Закрывает панель, когда пользователь нажимает клавишу Escape.',
            id: 'id, применяемый к элементу dialog, генерируется автоматически, если не задан.',
            mode: 'Как выдвижная панель соотносится со страницей: overlay плавает над затемнённой страницей с ловушкой фокуса, тогда как push открывается немодально и отодвигает содержимое страницы в сторону.',
            open: 'Открыта ли панель, двусторонняя привязка через [(open)].',
            position: 'Край области просмотра, из которого выдвигается панель.',
            pushTarget:
              'Элемент, содержимое которого отодвигается в сторону в режиме push, в виде CSS-селектора или ссылки на элемент; по умолчанию это body документа.',
            showClose: 'Показывает кнопку закрытия в заголовке панели.',
            size: 'Размер выдвижной панели вдоль её основной оси: ширина для боковых панелей, высота для верхних и нижних панелей.',
            closed:
              'Срабатывает, когда панель закрывается, будь то кнопкой закрытия, затемнением или Escape.',
            opened: 'Срабатывает, как только панель показана.',
          },
          'data-table': {
            size: 'Визуальный размер таблицы; отступы плотности и значки масштабируются вместе с ним.',
            clickable:
              'Помечает строки тела как кликабельные: показывает курсор-указатель и испускает rowActivate по клику или Enter/Space.',
            rowActivate:
              'Срабатывает с данными строки, когда кликабельная строка тела активируется кликом или клавиатурой.',
            navigable:
              'Превращает таблицу в навигируемую с клавиатуры сетку с перемещающимся фокусом и движением по ячейкам клавишами-стрелками.',
            bordered: 'Отрисовывает рамку вокруг каждой ячейки.',
            caption:
              'Видимая подпись, отображаемая над таблицей; также задаёт её имя для ассистивных технологий.',
            columns:
              'Определения столбцов, описывающие ключ, метку и необязательную сортировку или шаблон каждого поля.',
            data: 'Массив объектов строк для отображения в таблице.',
            density:
              'Предустановка вертикальной плотности, управляющая отступами строк и ячеек заголовка.',
            hoverable: 'Подсвечивает строку под указателем при наведении.',
            noDataText:
              'Текст, отображаемый в пустом состоянии, откатывается к переводу активного языка.',
            sort: 'Текущее состояние сортировки (ключ столбца и направление), двусторонняя привязка через [(sort)].',
            stickyHeader:
              'Фиксирует строку заголовка вверху таблицы при прокрутке содержимого.',
            striped:
              'Применяет чередующееся фоновое затенение к нечётным и чётным строкам.',
            trackBy:
              'Ключ свойства строки, используемый механизмом обнаружения изменений Angular для эффективной идентификации строк.',
            sorted:
              'Срабатывает всякий раз, когда столбец или направление сортировки меняется кликом по заголовку.',
          },
          'radio-group': {
            ariaLabel:
              'Доступная метка для группы, когда видимая метка не отрисовывается.',
            disabled: 'Отключает все радиоварианты в группе.',
            errorMsg:
              'Сообщение об ошибке под группой, заменяет подсказку и помечает поле недействительным.',
            hint: 'Вспомогательный текст под группой, скрывается при отображении ошибки.',
            id: 'id, применяемый к элементу группы и атрибуту for её метки, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отображаемая над группой.',
            name: 'Общий атрибут name, применяемый ко всем радиоинпутам в группе, генерируется автоматически, если не задан.',
            orientation: 'Направление раскладки радиовариантов внутри группы.',
            required: 'Помечает группу как обязательную.',
            size: 'Визуальный размер, применяемый ко всем радиовариантам в группе.',
            value: 'Текущее выбранное значение, двусторонняя привязка через [(value)].',
            changed:
              'Срабатывает с новым значением, когда пользователь выбирает вариант.',
            select: 'Программно выбирает вариант с заданным значением.',
          },
          segmented: {
            ariaLabel:
              'Доступная метка для элемента управления, когда видимая метка не отрисовывается.',
            disabled: 'Отключает сегментированный элемент управления.',
            errorMsg:
              'Сообщение об ошибке под полем, заменяет подсказку и помечает поле недействительным.',
            fullWidth: 'Растягивает элемент управления на всю ширину контейнера.',
            hint: 'Вспомогательный текст под полем, скрывается при отображении ошибки.',
            id: 'id, применяемый к элементу управления и атрибуту for метки, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отображаемая над элементом управления.',
            options:
              'Массив вариантов, отрисовываемых как кнопки-переключатели внутри элемента управления.',
            required: 'Помечает поле как обязательное.',
            size: 'Визуальный размер сегментированного элемента управления.',
            value:
              'Текущее выбранное значение варианта, двусторонняя привязка через [(value)].',
            changed:
              'Срабатывает с новым значением, когда пользователь выбирает другой вариант.',
            select: 'Программно выбирает заданный вариант.',
          },
          tree: {
            ariaLabel: 'Доступная метка для виджета дерева.',
            disabled: 'Отключает все узлы в дереве.',
            expandedIds:
              'Id текущих раскрытых узлов-ветвей, двусторонняя привязка через [(expandedIds)].',
            nodes: 'Массив объектов данных узлов дерева, определяющий иерархию.',
            selectedId:
              'Id текущего выбранного узла, двусторонняя привязка через [(selectedId)].',
            size: 'Визуальный размер дерева, пропорционально масштабирующий текст и отступы.',
            nodeClick: 'Срабатывает с данными узла, когда пользователь выбирает узел.',
          },
          step: {
            completed: 'Помечает шаг как завершённый, обновляя его визуальный индикатор.',
            disabled: 'Не даёт активировать шаг.',
            id: 'id, применяемый к панели шага и его вкладке, генерируется автоматически, если не задан.',
            label: 'Текстовая метка, отображаемая в индикаторе шага.',
            optional:
              'Помечает шаг как необязательный, отображается как подсказка под меткой шага.',
          },
          stepper: {
            activeStep:
              'Индекс (с отсчётом от нуля) текущего активного шага, двусторонняя привязка через [(activeStep)].',
            disabled: 'Отключает весь степпер и всю навигацию по шагам.',
            id: 'id, применяемый к хост-элементу степпера, генерируется автоматически, если не задан.',
            linear:
              'Требует, чтобы каждый необязательный шаг был помечен завершённым, прежде чем пользователь сможет продвинуться.',
            orientation:
              'Ось, вдоль которой расположены шаги; располагайте их вертикально там, где строка не помещается.',
            size: 'Визуальный размер степпера, масштабирующий индикаторы шагов и метки вместе.',
            changed:
              'Срабатывает с новым индексом активного шага, когда пользователь переходит к другому шагу.',
            canNavigateTo:
              'Возвращает, достижим ли шаг с заданным индексом из текущего состояния.',
            indexOf:
              'Возвращает индекс заданного шага или -1, если он не зарегистрирован.',
            selectStep: 'Активирует шаг с заданным индексом, если он достижим.',
          },
          'transfer-list': {
            disabled:
              'Отключает весь список передачи и все элементы управления перемещением.',
            items:
              'Полный пул элементов, доступных в обеих панелях, идентифицируемых по id.',
            selectedIds:
              'Id элементов, находящихся сейчас на целевой (правой) стороне, двусторонняя привязка через [(selectedIds)].',
            size: 'Визуальный размер списка передачи.',
            sourceLabel:
              'Заголовок, отрисовываемый над исходной (левой) панелью, откатывается к значению по умолчанию активного языка.',
            targetLabel:
              'Заголовок, отрисовываемый над целевой (правой) панелью, откатывается к значению по умолчанию активного языка.',
          },
          'virtual-list': {
            itemHeight:
              'Высота каждой строки в пикселях; все строки должны иметь одинаковую фиксированную высоту.',
            items:
              'Полный массив элементов данных для отрисовки; в любой момент монтируется только видимая часть.',
            overscan:
              'Число дополнительных строк, отрисовываемых выше и ниже видимого окна, чтобы уменьшить пустые края при быстрой прокрутке.',
            viewportHeight: 'Высота прокручиваемой области просмотра в пикселях.',
            scrollIndexChange:
              'Срабатывает с индексом первой строки, видимой вверху области просмотра, всякий раз, когда пользователь прокручивает.',
            scrollToIndex:
              'Прокручивает область просмотра так, чтобы строка с заданным индексом появилась вверху, ограниченная границами списка.',
          },
          'field-label': {
            forId:
              'id связанного элемента управления; отрисовывает <label for>, когда задан, иначе <span>.',
            labelId:
              'id, применяемый к отрисованному элементу метки, чтобы элементы управления могли ссылаться на него через aria-labelledby.',
            required: 'Показывает индикатор обязательности на метке.',
            text: 'Текст метки, отрисовываемый внутри элемента метки.',
          },
          'field-messages': {
            error:
              'Сообщение об ошибке для отображения; когда задано, подсказка скрывается, а сообщение объявляется как оповещение.',
            hint: 'Вспомогательный текст под полем, когда ошибки нет.',
            id: 'Базовый id, используемый для вывода aria-id элементов ошибки и подсказки.',
          },
          dialog: {
            ariaLabel:
              'Доступная метка для диалога, когда его слот заголовка не содержит видимого заголовка.',
            closeOnBackdrop:
              'Закрывает диалог, когда пользователь нажимает на область затемнения за пределами панели.',
            closeOnEscape: 'Закрывает диалог, когда пользователь нажимает Escape.',
            id: 'id, применяемый к нативному элементу dialog, генерируется автоматически, если не задан.',
            open: 'Отображается ли диалог, двусторонняя привязка через [(open)].',
            showClose: 'Показывает кнопку закрытия в заголовке диалога.',
            width: 'Предустановка ширины для панели диалога.',
            closed:
              'Срабатывает, когда диалог закрывается, независимо от того, закрыт ли он пользователем или программно.',
            opened: 'Срабатывает, как только диалог показан через showModal().',
          },
        },
      },
      sharedOptions: {
        fruitOptions: [
          { value: 'apple', label: 'Яблоко' },
          { value: 'banana', label: 'Банан' },
          { value: 'cherry', label: 'Вишня' },
          { value: 'date', label: 'Финик' },
        ],
        viewOptions: [
          { value: 'day', label: 'День' },
          { value: 'week', label: 'Неделя' },
          { value: 'month', label: 'Месяц' },
        ],
        themeOptions: [
          { value: 'light', label: 'Светлая' },
          { value: 'dark', label: 'Тёмная' },
        ],
        monthOptions: [
          { value: 'jan', label: 'Январь' },
          { value: 'feb', label: 'Февраль' },
          { value: 'mar', label: 'Март' },
          { value: 'apr', label: 'Апрель' },
          { value: 'may', label: 'Май' },
          { value: 'jun', label: 'Июнь' },
          { value: 'jul', label: 'Июль' },
          { value: 'aug', label: 'Август' },
          { value: 'sep', label: 'Сентябрь' },
          { value: 'oct', label: 'Октябрь' },
          { value: 'nov', label: 'Ноябрь' },
          { value: 'dec', label: 'Декабрь' },
        ],
        breadcrumbHome: 'Главная',
        breadcrumbProducts: 'Продукты',
        breadcrumbLaptops: 'Ноутбуки',
        breadcrumbMacBookPro: 'MacBook Pro',
        breadcrumbDashboard: 'Панель управления',
        breadcrumbSettings: 'Настройки',
      },
    },
  },
};

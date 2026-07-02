import type { WebMessages } from '../web-messages.types';

export const pl: WebMessages = {
  common: {
    skipToContent: 'Przejdź do treści głównej',
    brandHome: 'Strona główna eagami',
    navUi: 'UI',
    navUiTooltip: 'Dokumentacja biblioteki komponentów',
    themeToggleTooltip: 'Przełącz motyw',
    themeToggleLabel: next =>
      `Przełącz na motyw ${next === 'light' ? 'jasny' : 'ciemny'}`,
    localeMenuLabel: 'Język',
    localeMenuTooltip: 'Zmień język',
    activeLocale: label => `Aktualny język: ${label}`,
    footer: {
      copyright: year => `© ${year} eagami`,
      npmLink: 'npm',
      npmTooltip: 'Zobacz @eagami/ui w npm',
      githubAriaLabel: 'eagami na GitHubie',
      githubTooltip: 'Zobacz kod źródłowy na GitHubie',
      navLabel: 'Stopka',
    },
    codeSnippet: {
      copyLabel: 'Skopiuj do schowka',
      copySuccess: 'Skopiowano do schowka',
      copyError: 'Nie udało się skopiować do schowka',
    },
  },
  home: {
    metaTitle: 'Eagami',
    metaDescription: 'Eleganckie projektowanie stron internetowych',
    hero: {
      tagline: 'eleganckie projektowanie stron.',
      ctaPrimary: 'Skontaktuj się',
      ctaSecondary: 'Zobacz ostatnie projekty →',
      scrollHint: 'Przewiń do usług',
    },
    services: {
      title: 'Usługi',
      lede: 'Od pojedynczej strony docelowej po pełną aplikację webową, plus wszystko, co dzieje się po uruchomieniu.',
      featuresHeading: 'Funkcje',
      uiNote: {
        before: 'Większe projekty można zbudować w oparciu o',
        link: 'Eagami UI',
        after:
          ', autorską bibliotekę komponentów i system projektowy, dla spójnego i nowoczesnego języka wizualnego w całym serwisie.',
      },
      core: [
        {
          title: 'Strony szyte na miarę',
          description:
            'Kompletna witryna zbudowana od podstaw: konfiguracja domeny, hosting, branding, projektowanie i uruchomienie. Nieograniczone poprawki do dnia premiery.',
        },
        {
          title: 'Bieżące utrzymanie',
          description:
            'Comiesięczna opieka obejmująca hosting, łatki bezpieczeństwa, aktualizacje zależności, edycje treści i przeglądy analityki.',
        },
      ],
      addOns: [
        {
          title: 'Zarządzanie użytkownikami',
          description:
            'Uwierzytelnianie użytkowników, rejestracja i odzyskiwanie hasła, plus panel administratora z metrykami i kontrolą poszczególnych użytkowników.',
          iconSlug: 'users',
        },
        {
          title: 'Obsługa płatności',
          description:
            'Płatności online (domyślnie Stripe, inni dostawcy na życzenie), z konfigurowalnymi formularzami płatności i płatnościami cyklicznymi.',
          iconSlug: 'credit-card',
        },
        {
          title: 'Obsługa wielu języków',
          description:
            'Wsparcie wielu lokalizacji, z opcjonalnym automatycznym wykrywaniem języka przeglądarki użytkownika.',
          iconSlug: 'globe',
        },
        {
          title: 'Motywy',
          description:
            'Przełącznik trybu jasnego/ciemnego i w pełni konfigurowalne palety kolorów.',
          iconSlug: 'moon',
        },
        {
          title: 'Analityka i statystyki',
          description:
            'Metryki ruchu na stronie (źródła, urządzenia, lokalizacje) oraz śledzenie własnych zdarzeń.',
          iconSlug: 'bar-chart',
        },
        {
          title: 'E-mail i powiadomienia',
          description:
            'Automatyczne e-maile dotyczące aktywności konta, potwierdzeń i ogłoszeń.',
          iconSlug: 'mail',
        },
      ],
    },
    projects: {
      title: 'Ostatnie projekty',
      lede: 'Kilka stron w aktywnym rozwoju.',
      previousAriaLabel: 'Poprzednie projekty',
      nextAriaLabel: 'Następne projekty',
      regionAriaLabel: 'Ostatnie projekty',
      showing: title => `Wyświetlanie: ${title}`,
      cards: [
        {
          title: 'London Chess',
          description:
            'Centrum dla London Chess Club i wydarzeń szachowych w London, ON.',
          url: 'https://londonchess.ca',
          display: 'londonchess.ca',
          logo: 'assets/projects/londonchess.svg',
        },
        {
          title: 'CIRC Aesthetics',
          description:
            'Klinika kosmetycznej radiologii interwencyjnej z siedzibą w London, ON.',
          url: 'https://circaesthetics.ca',
          display: 'circaesthetics.ca',
          logo: 'assets/projects/circaesthetics.svg',
        },
        {
          title: 'Brewski Bets',
          description:
            'Aplikacja do śledzenia nieformalnych zakładów między przyjaciółmi, rozliczanych w piwie.',
          url: 'https://brewskibets.com',
          display: 'brewskibets.com',
          logo: 'assets/projects/brewskibets.svg',
        },
        {
          title: 'Chordbomb',
          description: 'Już wkrótce…',
          url: 'https://chordbomb.com',
          display: 'chordbomb.com',
          logo: 'assets/projects/chordbomb.svg',
        },
      ],
    },
    contact: {
      title: 'Masz projekt na oku?',
      lede: 'Porozmawiajmy o nim!',
      success: 'Wiadomość została odebrana. Odpowiedź wkrótce.',
      nameLabel: 'Imię',
      namePlaceholder: 'Twoje imię',
      emailLabel: 'E-mail',
      emailPlaceholder: 'ty@przyklad.com',
      emailInvalid: 'Wprowadź poprawny adres e-mail',
      messageLabel: 'Wiadomość',
      placeholderHints: [
        'Cześć! Pracuję nad projektem ubocznym i przydałaby mi się pomoc z frontendem…',
        'Szukam kogoś, kto zbuduje stronę dla naszej małej firmy…',
        'Krótkie pytanie o bibliotekę komponentów zanim zacznę…',
      ],
      submit: 'Wyślij wiadomość',
      sentToast: 'Wiadomość wysłana',
      errorMessage:
        'Niestety coś poszło nie tak. Proszę o wysłanie e-maila bezpośrednio na michal@eagami.com.',
    },
  },
  notFound: {
    metaTitle: 'Eagami | 404',
    metaDescription: 'Strona nie znaleziona.',
    eyebrow: '404',
    title: 'Strona nie znaleziona',
    lede: 'Strona, której szukałeś, nie istnieje lub została przeniesiona.',
    cta: 'Wróć na stronę główną',
  },
  ui: {
    metaTitle: 'Eagami | UI',
    changelog: {
      title: 'Dziennik zmian',
      metaTitle: 'Eagami | Dziennik zmian',
      metaDescription: 'Historia wersji biblioteki komponentów Angular Eagami UI.',
      lead: 'Istotne zmiany w @eagami/ui, od najnowszych.',
      migrationGuide: 'Przewodnik migracji',
      fullHistory: 'Pełna historia na GitHubie',
    },
    shell: {
      changelog: 'Dziennik zmian',
      sidebarLabel: 'Pasek boczny dokumentacji',
      navLabel: 'Dokumentacja',
      overview: 'Przegląd',
      setup: 'Instalacja',
      designTokens: 'Tokeny designu',
      icons: 'Ikony',
      i18n: 'Internacjonalizacja',
      components: 'Komponenty',
    },
    index: {
      metaTitle: 'Eagami | UI',
      metaDescription:
        'Lekka, dostępna biblioteka komponentów Angular oparta na niestandardowych właściwościach CSS.',
      title: 'Eagami UI',
      ledeBefore: 'to lekka, dostępna biblioteka komponentów Angular.',
      ledeAfter:
        'Sensowne domyślne ustawienia od razu po instalacji, z w pełni konfigurowalnym designem, dopasowanym do każdej marki.',
      principlesHeading: 'Zasady projektowania',
      principles: [
        {
          title: 'Dostępne',
          body: 'Nawigacja klawiaturą, zarządzanie focusem, wsparcie czytników ekranu i obsługa zredukowanego ruchu są wbudowane w każdy komponent.',
        },
        {
          title: 'Lekkie',
          body: 'Każdy komponent importuje się niezależnie, a bundle zawiera tylko to, czego używasz.',
        },
        {
          title: 'Z motywami',
          body: 'W pełni konfigurowalne za pomocą tokenów designu, przy zachowaniu spójnego wyglądu na każdej stronie. Warianty jasny i ciemny dostarczane są razem i domyślnie podążają za preferencją systemu użytkownika.',
        },
        {
          title: 'Zlokalizowane',
          body: 'Wbudowane teksty komponentów dostępne są w 15 językach.',
        },
        {
          title: 'Nowoczesne',
          body: 'Regularnie aktualizowane o najnowsze funkcje Angulara i nowoczesne standardy webowe.',
        },
        {
          title: 'Bez zamknięcia',
          body: 'Każdy komponent to czysty Angular i CSS bez żadnego uzależnienia od dostawcy, więc źródło można czytać, kopiować lub modyfikować jak każdy inny kod w projekcie.',
        },
      ],
      getStartedHeading: 'Zacznij',
      getStartedBefore: 'Przejdź do',
      /* "Instalacja" is the nominative form (used as-is on the page title and
         the sidebar). Inside "Przejdź do …", the preposition "do" requires
         the genitive case, so this link reads "Instalacji". Polish inflects
         nouns by case; per i18n best practice we keep a separate key per
         grammatical context rather than try to derive cases at runtime. */
      getStartedLink: 'Instalacji',
      getStartedAfter: ', aby zainstalować pakiet i podpiąć globalny arkusz stylów.',
      showcase: {
        button: 'Naciśnij mnie',
        toggle: 'Przełącz mnie',
        tick: 'Zaznacz mnie',
        tag: 'Etykieta',
        badge: 'Odznaka',
        tooltip: 'Dodatkowe informacje wyświetlane w podpowiedzi',
        exploreMore: '...odkryj więcej komponentów',
        list: 'Lista',
        grid: 'Siatka',
        table: 'Tabela',
        radioThis: 'To',
        radioThat: 'Tamto',
        option1: 'Opcja 1',
        option2: 'Opcja 2',
        option3: 'Opcja 3',
        toastButton: 'Przycisk naciśnięty',
        toastToggleOn: 'Przełącznik włączony',
        toastToggleOff: 'Przełącznik wyłączony',
        toastTickOn: 'Pole zaznaczone',
        toastTickOff: 'Pole odznaczone',
        ariaView: 'Widok demonstracyjny',
        ariaSlider: 'Suwak demonstracyjny',
        ariaRating: 'Ocena demonstracyjna',
        ariaLayout: 'Układ demonstracyjny',
        ariaColor: 'Kolor demonstracyjny',
        ariaSelect: 'Wybór demonstracyjny',
        ariaDate: 'Data demonstracyjna',
        ariaMultiSelect: 'Wybór wielokrotny demonstracyjny',
        msMusic: 'Muzyka',
        msTravel: 'Podróże',
        msFood: 'Jedzenie',
      },
      theme: {
        heading: 'Dostosuj do siebie',
        ledeBefore: '',
        ledeLink: 'Tokeny projektowe',
        ledeAfter:
          ' nadają każdemu projektowi Eagami odrębny charakter: konfigurowalne kolory, czcionki, odstępy, narożniki, cienie i ruch, wszystko zastosowane w całej witrynie lub aplikacji. Zmień kilka poniżej i zobacz, jak wpływają na komponenty.',
        brandColor: 'Kolor marki',
        radius: 'Promień zaokrąglenia',
        font: 'Czcionka',
        fontDefault: '(domyślnie)',
        reset: 'Resetuj',
      },
    },
    setup: {
      metaTitle: 'Eagami | UI | Instalacja',
      metaDescription:
        'Zainstaluj @eagami/ui i podłącz globalny arkusz stylów oraz fonty.',
      title: 'Instalacja',
      ngAddLabel: 'Zainstaluj i skonfiguruj wszystko jednym poleceniem:',
      manualLabel: 'Lub skonfiguruj ręcznie:',
      installLabel: 'Zainstaluj pakiet:',
      or: 'lub',
      stylesheetLabel: {
        before: 'Dodaj globalny arkusz stylów w',
        after: ':',
      },
      fontsLabel: {
        before: 'Załaduj fonty w',
        after: ':',
      },
      firstComponentHeading: 'Twój pierwszy komponent',
    },
    tokens: {
      metaTitle: 'Eagami | UI | Tokeny designu',
      metaDescription:
        'Niestandardowe właściwości CSS dla kolorów, typografii, odstępów, elewacji, kształtu i ruchu.',
      title: 'Tokeny designu',
      lede: 'Niestandardowe właściwości CSS, które napędzają każdy komponent biblioteki: kolory, typografia, odstępy, elewacja, kształt i ruch. Odwołuj się do tych tokenów we własnych stylach przez <code>var(--token-name)</code>, aby zachować spójność wizualną w całej aplikacji.',
      sections: {
        theming: 'Motywy',
        palette: 'Paleta marki',
        colors: 'Kolory',
        typography: 'Typografia',
        spacing: 'Odstępy',
        elevation: 'Elewacja',
        shape: 'Kształt',
        motion: 'Ruch',
      },
      themingRootBefore:
        'Nadpisz dowolny token na <code>:root</code>, aby zmienić motyw całej biblioteki:',
      themingScopedBefore:
        'Lub zawęź nadpisania do pojedynczych komponentów tam, gdzie to przydatne:',
      paletteIntro:
        'Przekaż jeden hex marki do <code>provideEagamiUi</code>, a biblioteka wyprowadzi pełną skalę dziesięciu odcieni (50 do 900) w przestrzeni <a href="https://www.w3.org/TR/css-color-4/#ok-lab" target="_blank" rel="noopener noreferrer"><span>OKLCH</span></a>, utrzymując stały odcień i nasycenie przy zmianie jasności. Wyprowadzone odcienie zasilają każdy token <code>--color-brand-*</code> w trybie jasnym i ciemnym:',
      paletteOverrides:
        'Przypnij konkretne odcienie albo zmień, który wyprowadzony odcień obsługuje dany rol semantyczny:',
      paletteContrast:
        'Każda para roli marki (tekst na powierzchni, powierzchnia na tle) jest weryfikowana względem WCAG 2.1 AA przy starcie aplikacji. Niezgodna kombinacja rzuca błąd przed załadowaniem aplikacji, więc problem z kontrastem koloru marki wychodzi na jaw przy boot, a nie na produkcji.',
      elevationDrop: 'Cienie',
      elevationRelief: 'Wypukłość i wgłębienie',
      elevationReliefBefore:
        '<code>--shadow-bevel</code> łączy wewnętrzne podświetlenie (góra) z wewnętrznym cieniem (dół), dzięki czemu powierzchnia wygląda na uniesioną. <code>--shadow-well</code> odwraca oświetlenie i daje efekt wgłębienia. Połącz z <code>--shadow-*</code>, aby dodać cień otoczenia: <code>box-shadow: var(--shadow-bevel), var(--shadow-sm);</code>',
      colorsPrimary: 'Główny',
      colorsSecondary: 'Drugorzędny',
      colorsNeutral: 'Neutralny',
      colorsStatus: 'Status',
      colorsSemantic: 'Semantyczny',
      typographyComposites: 'Style złożone',
      typographyCompositesBefore:
        'Tokeny złożone łączą rozmiar, grubość, interlinię (a czasem rodzinę) dla konkretnej roli. <code>--text-section-heading-*</code> to pierwszy złożony token, który ustawia rodzinę kroju — używaj go w tytułach <code>&lt;h2&gt;</code> sekcji na stronach dokumentacji i marketingu.',
      typographySectionHeadingSample: 'Tytuł sekcji w głosie marki',
      typographyFamilies: 'Rodziny',
      typographySizes: 'Rozmiary',
      typographyWeights: 'Grubości',
      motionSimulate: 'Symuluj',
      motionDurations: 'Czasy trwania',
      motionEasings: 'Krzywe',
    },
    icons: {
      metaTitle: 'Eagami | UI | Ikony',
      metaDescription: 'Zestaw ikon dołączony do @eagami/ui.',
      title: 'Ikony',
      lede: 'Samodzielne komponenty Angular, które dziedziczą kolor i skalują się wraz z <code>font-size</code>, dzięki czemu renderują się w dowolnym rozmiarze. Większość pochodzi z <a href="https://feathericons.com/" target="_blank" rel="noopener noreferrer"><span>Feather Icons</span></a> autorstwa <a href="https://github.com/colebemis" target="_blank" rel="noopener noreferrer"><span>Cole’a Bemisa</span></a> i używana jest na <a href="https://github.com/feathericons/feather/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><span>licencji MIT</span></a>; pozostałe to oryginalne ikony Eagami UI. Ikony Feather mogą być również rysowane z cieńszymi lub grubszymi liniami. Kliknij ikonę, aby skopiować jej selektor.',
      filterLabel: 'Filtruj ikony',
      filterPlaceholder: 'Szukaj ikon',
      filterClearLabel: 'Wyczyść wyszukiwanie',
      categoryFeather: 'Feather',
      categoryEagami: 'Eagami UI',
      categoryBrand: 'Marka',
      countAll: count => `${count} ikon`,
      countFiltered: (shown, total) => `${shown} z ${total} ikon`,
      noResults: 'Żadna ikona nie pasuje do wyszukiwania',
      copiedToast: selector => `Skopiowano „${selector}” do schowka`,
      copyFailedToast: selector => `Nie udało się skopiować „${selector}” do schowka`,
      brandTitle: 'Ikony marek',
      brandIntro:
        'Ikony marek na poniższej liście przedstawiają znaki towarowe podmiotów trzecich i udostępnione są wyłącznie do użytku nominatywnego, to znaczy do identyfikacji marki, którą reprezentują w interfejsie (przycisk „Zaloguj się przez Google”, link „Udostępnij na Facebooku” itp.). Nie są licencjonowane do ogólnego użytku dekoracyjnego. Konsumenci są odpowiedzialni za przestrzeganie wytycznych każdej marki:',
      brandLinkLabel: 'Materiały marki',
    },
    i18n: {
      metaTitle: 'Eagami | UI | Internacjonalizacja',
      metaDescription:
        'Wbudowane teksty komponentów w 15 językach, z przełączaniem w czasie wykonywania i nadpisaniami pojedynczych ciągów.',
      title: 'Internacjonalizacja',
      lede: 'Każdy wbudowany ciąg (etykiety ARIA, podpowiedzi, stany puste, kontrolki kalendarza) dostarczany jest w 15 językach. Ustaw jeden dla całej aplikacji, zmieniaj w czasie wykonywania lub nadpisuj pojedyncze ciągi.',
      supportedHeading: 'Obsługiwane języki',
      supportedFallback:
        'Nieznane języki przechodzą do angielskiego, podobnie jak klucze brakujące w częściowym nadpisaniu.',
      quickSetupHeading: 'Szybka konfiguracja',
      quickSetupBefore:
        'Dodaj <code>provideEagamiUi()</code> do konfiguracji aplikacji i zarejestruj używane języki przez <code>locales</code>. Angielski jest zawsze dostępny, więc dostarczasz tylko to, czego potrzebujesz.',
      liveDemoHeading: 'Demo na żywo',
      liveDemoIntro:
        'Wybierz język i obserwuj, jak poniższe komponenty przyjmują pasujące ciągi i formatowanie dat.',
      runtimeSwitchHeading: 'Przełączanie w czasie wykonywania',
      runtimeSwitchBefore:
        'Wstrzyknij <code>EagamiI18nService</code> i wywołaj <code>setLocale()</code>. Aktywny język jest sygnałem, więc każdy komponent renderuje się ponownie z nowymi ciągami bez odświeżenia.',
      perStringHeading: 'Nadpisania pojedynczych ciągów',
      perStringBefore:
        'Przekaż obiekt <code>messages</code> razem z językiem, aby zamienić pojedyncze ciągi. Wszystko, co pominiesz, wraca do wartości domyślnych dla danego języka.',
      perStringAfter:
        'Większość komponentów udostępnia również indywidualne wejścia komunikatów (np. <code>placeholder</code> w <code>&lt;ea-dropdown&gt;</code>) do jednorazowych nadpisań w miejscu wywołania.',
      frenchSpacingHeading: 'Pomocnik francuskich odstępów',
      frenchSpacingBody:
        'Typografia francuska wymaga wąskiej, niełamliwej spacji przed <code>? ! : ; »</code> oraz po <code>«</code>. Wyeksportowany pomocnik <code>frenchSpacing()</code> konwertuje zwykłe spacje we własnych francuskich ciągach (biblioteka obsługuje swoje wbudowane francuskie komunikaty wewnętrznie).',
      demoLocaleLabel: 'Język',
    },
    component: {
      metaDescription: name => `Dokumentacja i demonstracje komponentu ${name} na żywo.`,
      demoHeading: 'Demo',
      notFoundTitle: 'Nie znaleziono komponentu',
      notFoundBody: 'Wybierz komponent z paska bocznego lub',
      notFoundLink: 'wróć do wprowadzenia',
      sectionHeadings: {
        basic: 'podstawowy',
        variants: 'warianty',
        sizes: 'rozmiary',
        states: 'stany',
        disabled: 'wyłączony',
        dismissible: 'zamykalny',
        clearable: 'czyszczone',
        hintAndError: 'wskazówka i błąd',
        withHint: 'ze wskazówką',
        withError: 'z błędem',
        withLabel: 'z etykietą',
        withIcons: 'z ikonami',
        withFooter: 'ze stopką',
        withPaginator: 'z paginatorem',
        withDisabledItem: 'z wyłączonym elementem',
        withDisabledTab: 'z wyłączoną kartą',
        required: 'wymagane',
        requiredWithHint: 'wymagane ze wskazówką',
        horizontal: 'poziomo',
        vertical: 'pionowo',
        single: 'pojedynczy',
        multi: 'wielokrotny',
        circle: 'koło',
        square: 'kwadrat',
        shapes: 'kształty',
        shapesAndFallbacks: 'kształty i zapasowe',
        chevronSeparator: 'separator chevron',
        slashSeparator: 'separator ukośnik',
        twoLevels: 'dwa poziomy',
        fourDigitPin: '4-cyfrowy PIN',
        defaultHeading: 'domyślny',
        stripedAndBordered: 'paski i obramowanie',
        compactDensity: 'gęstość kompaktowa',
        tinyList: 'mała lista',
        stickyHeader: 'przyklejony nagłówek',
        emptyState: 'stan pusty',
        formatVariants: 'warianty formatu',
        minMax: 'min i maks',
        positions: 'pozycje',
        trigger: 'wyzwalacz',
        alignLeft: 'wyrównany do lewej',
        alignCenter: 'wyrównany do środka',
        manyPages: 'wiele stron',
        minimal: 'minimalny',
        indeterminate: 'nieokreślony',
        noResize: 'bez zmiany rozmiaru',
        resizing: 'zmiana rozmiaru',
        disabledAndReadonly: 'wyłączony i tylko do odczytu',
        password: 'hasło',
        autocompleteSection: 'autouzupełnianie',
        twoOptions: 'dwie opcje',
        fullWidth: 'pełna szerokość',
        minLengthMaxResults: 'min. długość i maks. wyników',
        removable: 'usuwalny',
        minMaxLabels: 'etykiety min/maks',
        underline: 'podkreślenie',
        filled: 'wypełnione',
        rect: 'prostokąt',
        inlineLayout: 'układ wbudowany',
        noResults: 'brak wyników',
        titleOnly: 'tylko tytuł',
        iconTrigger: 'wyzwalacz ikoną',
        placements: 'umiejscowienia',
        canvasSizes: 'rozmiary płótna',
        cappedChipCount: 'ograniczona liczba chipów',
        customIcon: 'niestandardowa ikona',
        customIconAndColor: 'niestandardowa ikona i kolor',
        customLabel: 'etykieta niestandardowa',
        halfSteps: 'pół-kroki',
        customSize: 'rozmiar niestandardowy',
        linearFlow: 'przepływ liniowy',
        manyLevels: 'wiele poziomów',
        notAnimated: 'bez animacji',
        numberOfStars: 'liczba gwiazdek',
        minimumOne: 'minimum 1 gwiazdka',
        outputFormats: 'formaty wyjściowe',
        quarterHourSteps: 'kwadransowe kroki',
        readonly: 'tylko do odczytu',
        singleFile: 'pojedynczy plik',
        stepped: 'krokowo',
        sundayStart: 'tydzień zaczyna się w niedzielę',
        twelveHourFormat: 'format 12-godzinny',
        twoActions: 'dwie akcje',
        withCompletedSteps: 'z ukończonymi krokami',
        withConstraints: 'z ograniczeniami',
        withInitialValue: 'z wartością początkową',
        withMaxlength: 'z maksymalną długością',
        withMaxHeight: 'z maksymalną wysokością',
        withMinMaxLabels: 'z etykietami min/maks',
        withOptionalStep: 'z opcjonalnym krokiem',
        withSeconds: 'z sekundami',
        withSelection: 'z zaznaczeniem',
        withoutAlpha: 'bez kanału alfa',
        withoutSearch: 'bez wyszukiwania',
        withoutSelectAll: 'bez „zaznacz wszystko”',
        wrapping: 'zawijanie',
      },
      common: {
        small: 'Mały',
        medium: 'Średni',
        large: 'Duży',
        cancel: 'Anuluj',
        save: 'Zapisz',
        close: 'Zamknij',
        confirm: 'Potwierdź',
        disabled: 'Wyłączony',
        defaultLabel: 'Domyślny',
        successLabel: 'Sukces',
        warningLabel: 'Ostrzeżenie',
        errorLabel: 'Błąd',
        infoLabel: 'Informacja',
      },
      demos: {
        accordion: {
          whatLabel: 'Czym jest @eagami/ui?',
          whatBody:
            'Lekka, dostępna biblioteka komponentów Angular oparta na niestandardowych właściwościach CSS.',
          installLabel: 'Jak ją zainstalować?',
          installBody:
            'Uruchom pnpm add @eagami/ui, a następnie dodaj globalny arkusz stylów do swojego angular.json.',
          themeLabel: 'Czy mogę dostosować motyw?',
          themeBody:
            'Tak, nadpisz dowolną niestandardową właściwość CSS na :root lub zawęź nadpisania do pojedynczych komponentów.',
          sectionOneLabel: 'Sekcja pierwsza',
          sectionOneBody:
            'W trybie wielokrotnym może być otwartych wiele sekcji jednocześnie.',
          sectionTwoLabel: 'Sekcja druga',
          sectionTwoBody: 'Treść drugiej sekcji.',
          disabledSectionLabel: 'Sekcja wyłączona',
          disabledSectionBody: 'Ta treść jest niedostępna.',
        },
        alert: {
          defaultText: 'To jest domyślny alert',
          successText: 'Zmiany zostały zapisane',
          warningText: 'Twój okres próbny wygasa za 3 dni',
          errorText: 'Coś poszło nie tak, spróbuj ponownie',
          infoText: 'Dostępna jest nowa wersja',
          dismissibleText: 'Ten alert można zamknąć',
          tooltipSuppressed:
            'Podpowiedzi są wyłączone na urządzeniach dotykowych, aby uniknąć przyklejonego stanu hover. Otwórz tę sekcję na urządzeniu z myszą, aby zobaczyć demonstracje w działaniu.',
        },
        autocomplete: {
          startTyping: 'Zacznij wpisywać…',
          hintText: 'Zacznij wpisywać, aby zobaczyć dopasowania',
          errorText: 'Wybierz rasę psa',
          breedPlaceholder: 'Rasa psa…',
          minMaxLabel: 'Min. 2 znaki, maks. 3 wyniki',
          minMaxPlaceholder: 'Wpisz co najmniej 2 znaki…',
        },
        avatarEditor: {
          result: 'Wynik:',
        },
        badge: {
          successText: 'Aktywny',
          warningText: 'Oczekujący',
          newText: 'Nowy',
        },
        button: {
          primary: 'Główny',
          secondary: 'Drugorzędny',
          ghost: 'Duch',
          danger: 'Niebezpieczny',
          toggleLoading: 'Przełącz ładowanie',
          fullWidth: 'Pełna szerokość',
          clickedToast: 'Przycisk naciśnięty!',
        },
        card: {
          elevatedHeader: 'Wyniesiona',
          elevatedBody: 'Karta z cieniem.',
          outlinedHeader: 'Z obramowaniem',
          outlinedBody: 'Karta z obramowaniem.',
          filledHeader: 'Wypełniona',
          filledBody: 'Karta z subtelnym tłem.',
          cardTitleHeader: 'Tytuł karty',
          cardWithFooterBody: 'Ta karta ma nagłówek, treść i stopkę z akcjami.',
        },
        checkbox: {
          acceptTermsAndConditions: 'Akceptuję regulamin',
          disabledChecked: 'Wyłączony zaznaczony',
          indeterminate: 'Nieokreślony',
          iAgreeToTerms: 'Akceptuję warunki',
          subscribeToUpdates: 'Subskrybuj aktualizacje',
          subscribeHint: 'Co miesiąc wysyłany jest skrót, bez spamu',
          acceptTermsLabel: 'Akceptuj warunki',
          acceptTermsError: 'Aby kontynuować, należy zaakceptować warunki',
        },
        codeInput: {
          verificationCodeLabel: 'Kod weryfikacyjny',
          verificationCodeHint: 'Sprawdź swoją skrzynkę, aby znaleźć 6-cyfrowy kod',
          verificationCodeError: 'Nieprawidłowy kod weryfikacyjny',
          pinLabel: 'PIN',
          pinHint: 'Wprowadź swój 4-cyfrowy PIN',
        },
        colorPicker: {
          brandLabel: 'Kolor marki',
          hintBrandColor: 'Używany jako główny kolor marki',
          errorRequired: 'To pole jest wymagane',
          hexLabel: 'Format HEX',
          rgbLabel: 'Format RGB',
          hslLabel: 'Format HSL',
          noAlphaHeading: 'Tylko nieprzezroczyste',
          opaqueOnlyLabel: 'Kolor pełny',
        },
        dataTable: {
          tableColumnId: 'ID',
          tableColumnFirstName: 'Imię',
          tableColumnLastName: 'Nazwisko',
          tableColumnAdmin: 'Administrator',
          tableColumnPosts: 'Posty',
        },
        datePicker: {
          appointmentLabel: 'Spotkanie',
          pickDatePlaceholder: 'Wybierz datę…',
          hintAnyFutureDate: 'Wybierz dowolną przyszłą datę',
          errorRequired: 'To pole jest wymagane',
          shortLabel: 'Krótki',
          mediumLabel: 'Średni',
          longLabel: 'Długi',
          withinNextWeeksLabel: 'W ciągu najbliższych 3 tygodni',
          withinNextWeeksHint: '±1 tydzień / +3 tygodnie od dziś',
        },
        dialog: {
          openButton: 'Otwórz okno',
          title: 'Tytuł okna',
          body: 'To jest treść okna dialogowego. Obsługuje dowolną zawartość, w tym formularze, tekst i inne komponenty.',
        },
        divider: {
          orLabel: 'lub',
          sectionLabel: 'Sekcja',
          leftLabel: 'Lewo',
          rightLabel: 'Prawo',
        },
        drawer: {
          openButton: 'Otwórz szufladę',
          rightButton: 'Prawy',
          leftButton: 'Lewy',
          topButton: 'Górny',
          bottomButton: 'Dolny',
          rightTitle: 'Panel prawy',
          rightBody: 'Wysuwa się od prawej krawędzi, przydatny do paneli szczegółów.',
          leftTitle: 'Panel lewy',
          leftBody: 'Wysuwa się od lewej, przydatny do menu nawigacyjnych.',
          topTitle: 'Panel górny',
          topBody: 'Opada z góry, przydatny do powiadomień.',
          bottomTitle: 'Panel dolny',
          bottomBody:
            'Podnosi się od dołu, popularny na urządzeniach mobilnych do arkuszy akcji.',
        },
        dropdown: {
          fruitLabel: 'Owoc',
          fruitPlaceholder: 'Wybierz owoc…',
          hintFavourite: 'Wybierz swój ulubiony',
          errorRequired: 'To pole jest wymagane',
          selectPlaceholder: 'Wybierz…',
        },
        emptyState: {
          noItemsTitle: 'Jeszcze nic tu nie ma',
          noItemsDescription: 'Zacznij od stworzenia swojego pierwszego elementu.',
          createItem: 'Utwórz element',
          noResultsTitle: 'Nie znaleziono wyników',
          noResultsDescription:
            'Spróbuj zmienić wyszukiwanie lub filtr, aby znaleźć to, czego szukasz.',
          clearFilters: 'Wyczyść filtry',
          nothingHereTitle: 'Nic tu nie ma',
        },
        fileUploader: {
          attachmentsLabel: 'Załączniki',
          imagesLabel: 'Prześlij obrazy',
          imagesHint: 'PNG lub JPEG, do 2 MB każdy, maks. 4 pliki',
          resumeLabel: 'Prześlij CV',
          customIconLabel: 'Załącz pliki',
          withHintHint: 'Do 10 MB na plik',
          withErrorText: 'Wymagany jest co najmniej jeden obraz',
        },
        input: {
          defaultLabel: 'Domyślny',
          enterTextPlaceholder: 'Wprowadź tekst…',
          hintGuidance: 'Pomocne wskazówki znajdują się tutaj',
          errorRequired: 'To pole jest wymagane',
          readonlyLabel: 'Tylko do odczytu',
          readonlyValue: 'Wartość tylko do odczytu',
          passwordLabel: 'Hasło',
          passwordPlaceholder: 'Wprowadź swoje hasło…',
          passwordNoToggleLabel: 'Hasło (przełącznik ukryty)',
          passwordNoTogglePlaceholder: 'Brak przełącznika widoczności',
          emailLabel: 'E-mail',
          emailPlaceholder: 'ty@przyklad.com',
        },
        menu: {
          openButton: 'Otwórz menu',
          edit: 'Edytuj',
          duplicate: 'Duplikuj',
          archive: 'Archiwizuj',
          delete: 'Usuń',
          file: 'Plik',
          moreOptionsLabel: 'Więcej opcji',
          view: 'Zobacz',
          rename: 'Zmień nazwę',
          newItem: 'Nowy',
          open: 'Otwórz',
          saveUnavailable: 'Zapisz (niedostępne)',
          saveAs: 'Zapisz jako',
        },
        popover: {
          openLabel: 'Otwórz popover',
          basicContent:
            'Pływająca powierzchnia zakotwiczona w swoim wyzwalaczu. Użyj jej jako elementu bazowego dla menu, list rozwijanych i niestandardowych nakładek.',
          placementTopLabel: 'top',
          placementTopStartLabel: 'top-start',
          placementTopEndLabel: 'top-end',
          placementBottomLabel: 'bottom',
          placementBottomStartLabel: 'bottom-start',
          placementBottomEndLabel: 'bottom-end',
          placementLeftLabel: 'left',
          placementRightLabel: 'right',
          placementTopContent: 'Wyśrodkowana nad wyzwalaczem',
          placementTopStartContent: 'Nad wyzwalaczem, wyrównana do jego lewej krawędzi',
          placementTopEndContent: 'Nad wyzwalaczem, wyrównana do jego prawej krawędzi',
          placementBottomContent: 'Wyśrodkowana pod wyzwalaczem',
          placementBottomStartContent:
            'Pod wyzwalaczem, wyrównana do jego lewej krawędzi',
          placementBottomEndContent: 'Pod wyzwalaczem, wyrównana do jego prawej krawędzi',
          placementLeftContent: 'Wyśrodkowana na lewo od wyzwalacza',
          placementRightContent: 'Wyśrodkowana na prawo od wyzwalacza',
        },
        progressBar: {
          processing: 'Przetwarzanie…',
        },
        radio: {
          appleLabel: 'Jabłko',
          bananaLabel: 'Banan',
          cherryLabel: 'Wiśnia',
          optionALabel: 'Opcja A',
          optionBLabel: 'Opcja B',
          subscriptionPlanLabel: 'Plan subskrypcji',
          freeLabel: 'Darmowy',
          proLabel: 'Pro',
          enterpriseLabel: 'Korporacyjny',
          deliverySpeedLabel: 'Szybkość dostawy',
          deliverySpeedHint: 'Wybierz, jak szybko ma dotrzeć',
          standardLabel: 'Standard',
          expressLabel: 'Ekspres',
          accountTypeLabel: 'Typ konta',
          accountTypeError: 'Wybierz typ konta',
          personalLabel: 'Osobiste',
          businessLabel: 'Firmowe',
        },
        rating: {
          experienceLabel: 'Oceń swoje doświadczenie',
          halfStepsLabel: 'Ocena z pół-krokami',
          halfStepsHint:
            'Kliknij lewą lub prawą połowę gwiazdki, aby ustawić wartość co 0,5.',
          readonlyLabel: 'Średnia ocena',
          withHintHint: 'Stuknij gwiazdkę, aby ustawić ocenę',
          withErrorText: 'Ocena jest wymagana',
          numberOfStarsLabel: 'Oceń',
          customIconLabel: 'Jak bardzo to lubisz?',
        },
        segmented: {
          viewLabel: 'Widok',
          themeLabel: 'Motyw',
          themeHint: 'Wpływa na całą aplikację',
          layoutLabel: 'Układ',
          layoutError: 'Wybór układu jest wymagany',
          viewOptionList: 'Lista',
          viewOptionGrid: 'Siatka',
          viewOptionKanban: 'Kanban',
          themeOptionLight: 'Jasny',
          themeOptionDark: 'Ciemny',
        },
        slider: {
          volumeLabel: 'Głośność',
          brightnessLabel: 'Jasność',
          withHintLabel: 'Ze wskazówką',
          sliderHint: 'Przeciągnij uchwyt lub użyj strzałek, aby dostosować',
          withErrorLabel: 'Z błędem',
          sliderError: 'Wybierz wartość powyżej 50',
        },
        switch: {
          enableNotificationsLabel: 'Włącz powiadomienia',
          disabledOnLabel: 'Wyłączony włączony',
          confirmConsentLabel: 'Potwierdź zgodę',
          marketingEmailsLabel: 'E-maile marketingowe',
          marketingEmailsHint: 'Można zrezygnować w dowolnym momencie',
          twoFactorAuthLabel: 'Uwierzytelnianie dwuskładnikowe',
          twoFactorAuthError: 'Uwierzytelnianie dwuskładnikowe musi być włączone',
        },
        tabs: {
          account: 'Konto',
          accountContent: 'Treść ustawień konta',
          security: 'Bezpieczeństwo',
          securityContent: 'Treść ustawień bezpieczeństwa',
          notifications: 'Powiadomienia',
          notificationsContent: 'Preferencje powiadomień',
          overview: 'Przegląd',
          overviewContent: 'Treść przeglądu',
          analytics: 'Analityka',
          analyticsContent: 'Treść analityki',
          reports: 'Raporty',
          reportsContent: 'Treść raportów',
          general: 'Ogólne',
          generalContent: 'Ustawienia ogólne',
          billing: 'Rozliczenia',
          billingContent: 'Szczegóły rozliczeń',
          admin: 'Administrator',
          adminContent: 'Panel administratora',
        },
        tag: {
          disabledSuccess: 'Wyłączony sukces',
        },
        textarea: {
          messageLabel: 'Wiadomość',
          messagePlaceholder: 'Wprowadź swoją wiadomość…',
          hintMaxCharacters: 'Maksymalnie 500 znaków',
          errorRequired: 'To pole jest wymagane',
          fixedSizeLabel: 'Stały rozmiar',
          fixedSizePlaceholder: 'Nie można zmienić rozmiaru',
          readonlyLabel: 'Tylko do odczytu',
          readonlyValue: 'Treść tylko do odczytu',
        },
        toast: {
          message: variant => {
            const labels: Record<string, string> = {
              default: 'domyślny',
              success: 'sukcesu',
              warning: 'ostrzegawczy',
              error: 'błędu',
              info: 'informacyjny',
            };
            return `To jest toast ${labels[variant] ?? variant}`;
          },
        },
        tooltip: {
          triggerLabel: '(najedź na mnie)',
          topLabel: 'Góra',
          topTooltip: 'Podpowiedź u góry',
          bottomLabel: 'Dół',
          bottomTooltip: 'Podpowiedź u dołu',
          leftLabel: 'Lewo',
          leftTooltip: 'Podpowiedź po lewej',
          rightLabel: 'Prawo',
          rightTooltip: 'Podpowiedź po prawej',
        },
        transferList: {
          sourceLabel: 'Dostępne',
          targetLabel: 'Wybrane',
          roleAdmin: 'Administrator',
          roleEditor: 'Edytor',
          roleViewer: 'Czytelnik',
          roleGuest: 'Gość',
          roleBilling: 'Rozliczenia',
          roleOwner: 'Właściciel',
        },
        virtualList: {
          row: 'Wiersz',
          detail: n => `Wygenerowany rekord nr ${n}`,
          scrollPosition: (first, total) =>
            `Wiersz ${first.toLocaleString('pl-PL')} z ${total.toLocaleString('pl-PL')}`,
        },
        commandPalette: {
          hint: 'Naciśnij Ctrl + K (lub Cmd + K), aby otworzyć paletę poleceń w dowolnym miejscu strony.',
          openButton: 'Otwórz paletę poleceń',
          fileGroup: 'Plik',
          editGroup: 'Edycja',
          newFile: 'Nowy plik',
          openFile: 'Otwórz plik',
          save: 'Zapisz',
          find: 'Znajdź',
          findKeyword: 'wyszukaj',
          replace: 'Zamień',
          undo: 'Cofnij',
          toggleTheme: 'Przełącz motyw',
          toggleThemeDescription: 'Przełączaj między trybem jasnym a ciemnym',
          lockWorkspace: 'Zablokuj obszar roboczy',
          lockWorkspaceDescription: 'Obecnie wyłączone, funkcja w wersji beta',
          executedToast: label => `Wykonano: ${label}`,
        },
        avatarEditorActions: {
          avatarUpdatedToast: 'Awatar zaktualizowany',
        },
      },
      playground: {
        controls: 'Opcje',
        reset: 'Resetuj',
        code: 'Kod',
        apiReference: 'Dokumentacja API',
        inputs: 'Wejścia',
        outputs: 'Wyjścia',
        methods: 'Metody',
        colName: 'Nazwa',
        colType: 'Typ',
        colDefault: 'Domyślnie',
        colDescription: 'Opis',
        errorMessagesDescription:
          'Zastępuje komunikat walidacji dla danego klucza błędu w powiązanym formancie formularza; nieustawione klucze używają zlokalizowanej wartości domyślnej.',
        triggerErrorLabel: 'Wywołaj błąd',
        requiredBadge: 'wymagane',
        twoWayBadge: 'dwukierunkowe',
        rangeHint: { between: 'do', min: 'Min', max: 'Maks' },
        knobLabels: {
          tooltip: {
            eaTooltip: 'Treść podpowiedzi',
          },
          input: {
            label: 'Etykieta',
            placeholder: 'Tekst zastępczy',
            size: 'Rozmiar',
            type: 'Typ',
            disabled: 'Wyłączone',
            readonly: 'Tylko do odczytu',
            required: 'Wymagane',
            autofocus: 'Autofokus',
            showPasswordToggle: 'Przycisk pokazywania hasła',
            clearable: 'Z czyszczeniem',
            autocomplete: 'Autouzupełnianie',
          },
          alert: {
            variant: 'Wariant',
            dismissible: 'Z możliwością zamknięcia',
            size: 'Rozmiar',
            icon: 'Ikona (zastąp)',
          },
          avatar: {
            size: 'Rozmiar',
            shape: 'Kształt',
            src: 'Źródło obrazu',
            initials: 'Inicjały',
            alt: 'Tekst alternatywny',
          },
          badge: {
            variant: 'Wariant',
            size: 'Rozmiar',
            shape: 'Kształt',
          },
          button: {
            variant: 'Wariant',
            size: 'Rozmiar',
            type: 'Typ',
            disabled: 'Wyłączone',
            loading: 'Ładowanie',
            fullWidth: 'Pełna szerokość',
          },
          card: {
            variant: 'Wariant',
            padding: 'Wypełnienie',
            headerAlign: 'Wyrównanie nagłówka',
            fullWidth: 'Pełna szerokość',
            headerDivider: 'Linia oddzielająca nagłówek',
          },
          checkbox: {
            label: 'Etykieta',
            count: 'Liczba',
            size: 'Rozmiar',
            disabled: 'Wyłączone',
            required: 'Wymagane',
            indeterminate: 'Stan nieokreślony',
          },
          'code-input': {
            size: 'Rozmiar',
            length: 'Długość',
            label: 'Etykieta',
            placeholder: 'Tekst zastępczy',
            disabled: 'Wyłączone',
            readonly: 'Tylko do odczytu',
            required: 'Wymagane',
          },
          'color-picker': {
            label: 'Etykieta',
            placeholder: 'Tekst zastępczy',
            size: 'Rozmiar',
            format: 'Format',
            showAlpha: 'Pokaż kanał alfa',
            disabled: 'Wyłączone',
            readonly: 'Tylko do odczytu',
            required: 'Wymagane',
          },
          divider: {
            orientation: 'Orientacja',
            label: 'Etykieta',
          },
          'eagami-wordmark': {
            variant: 'Wariant',
            layout: 'Układ',
            size: 'Rozmiar (px)',
          },
          'empty-state': {
            size: 'Rozmiar',
            headingLevel: 'Poziom nagłówka',
            title: 'Tytuł',
            description: 'Opis',
          },
          paginator: {
            align: 'Wyrównanie',
            showPageSizeSelector: 'Pokaż wybór rozmiaru strony',
            showRangeLabel: 'Pokaż etykietę zakresu',
            disabled: 'Wyłączone',
            totalItems: 'Łączna liczba elementów',
          },
          'progress-bar': {
            variant: 'Wariant',
            size: 'Rozmiar',
            value: 'Wartość',
            max: 'Maksimum',
            showPercentage: 'Pokaż procent',
            indeterminate: 'Stan nieokreślony',
            label: 'Etykieta',
          },
          radio: {
            label: 'Etykieta',
            disabled: 'Wyłączone',
          },
          'range-slider': {
            label: 'Etykieta',
            hint: 'Podpowiedź',
            errorMsg: 'Komunikat o błędzie',
            min: 'Minimum',
            max: 'Maksimum',
            step: 'Krok',
            size: 'Rozmiar',
            showValue: 'Pokaż wartość',
            showMinMaxLabels: 'Pokaż etykiety min/maks',
            disabled: 'Wyłączone',
            required: 'Wymagane',
          },
          rating: {
            label: 'Etykieta',
            size: 'Rozmiar',
            min: 'Minimum',
            max: 'Maksimum',
            allowHalf: 'Zezwól na połówki',
            readonly: 'Tylko do odczytu',
            disabled: 'Wyłączone',
            required: 'Wymagane',
            clearable: 'Z czyszczeniem',
            iconClass: 'Ikona',
          },
          skeleton: {
            variant: 'Wariant',
            animated: 'Animowane',
            width: 'Szerokość',
            height: 'Wysokość',
          },
          slider: {
            size: 'Rozmiar',
            min: 'Minimum',
            max: 'Maksimum',
            step: 'Krok',
            showValue: 'Pokaż wartość',
            showMinMaxLabels: 'Pokaż etykiety min/maks',
            disabled: 'Wyłączone',
            required: 'Wymagane',
            hasError: 'Stan błędu',
            label: 'Etykieta',
          },
          spinner: {
            size: 'Rozmiar',
            label: 'Etykieta',
          },
          switch: {
            label: 'Etykieta',
            size: 'Rozmiar',
            disabled: 'Wyłączone',
            required: 'Wymagane',
          },
          tag: {
            variant: 'Wariant',
            size: 'Rozmiar',
            removable: 'Z możliwością usunięcia',
            disabled: 'Wyłączone',
            removeLabel: 'Etykieta usuwania',
          },
          textarea: {
            label: 'Etykieta',
            placeholder: 'Tekst zastępczy',
            size: 'Rozmiar',
            resize: 'Zmiana rozmiaru',
            maxlength: 'Maksymalna długość (chars)',
            minHeight: 'Minimalna wysokość (px)',
            maxHeight: 'Maksymalna wysokość (px)',
            disabled: 'Wyłączone',
            readonly: 'Tylko do odczytu',
            required: 'Wymagane',
          },
        },
        descriptions: {
          toast: {
            position: 'Róg lub krawędź okna, do której przypięty jest stos powiadomień.',
            clearable: 'Pokazuje przycisk zamknięcia na każdym powiadomieniu.',
          },
          input: {
            label: 'Etykieta wyświetlana nad polem.',
            type: 'Natywny typ pola (password dodaje wbudowany przycisk pokaż/ukryj).',
            placeholder: 'Tekst zastępczy wyświetlany, gdy pole jest puste.',
            size: 'Wizualny rozmiar pola.',
            hint: 'Tekst pomocniczy pod polem, ukryty gdy występuje błąd.',
            errorMsg:
              'Komunikat o błędzie pod polem, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            disabled: 'Wyłącza pole.',
            readonly: 'Wyświetla pole tylko do odczytu.',
            required: 'Oznacza pole jako wymagane.',
            autocomplete: 'Wartość natywnego atrybutu autocomplete.',
            list: 'id elementu <datalist> do powiązania z natywnymi podpowiedziami.',
            autofocus: 'Ustawia fokus na polu raz, po pierwszym renderowaniu.',
            showPasswordToggle: 'Wyświetla przycisk pokaż/ukryj dla pól password.',
            clearable: 'Wyświetla przycisk czyszczenia, gdy pole ma wartość.',
            id: 'id stosowane do natywnego pola i atrybutu for etykiety, generowane automatycznie gdy pominięte.',
            value: 'Bieżąca wartość pola, dwukierunkowo wiązalna przez [(value)].',
            blurred: 'Emitowane, gdy pole traci fokus.',
            focused: 'Emitowane, gdy pole otrzymuje fokus.',
            clear: 'Czyści bieżącą wartość i przywraca fokus do pola.',
            focus: 'Przenosi fokus klawiatury na natywne pole bazowe.',
            togglePasswordVisibility:
              'Przełącza widoczność hasła dla pól type="password".',
            icon: 'Komponent ikony wiodącej renderowany przed tekstem.',
            max: 'Maksymalna wartość dla type="number"; wartość jest do niej ograniczana przy utracie fokusu.',
            maxLength:
              'Maksymalna liczba znaków; wymuszana dla type="number", gdzie natywny maxlength jest ignorowany.',
            min: 'Minimalna wartość dla type="number"; wartość jest do niej ograniczana przy utracie fokusu.',
            minLength:
              'Minimalna liczba znaków, przekazywana jako natywny atrybut minlength.',
            step: 'Przyrost kroku dla pól type="number".',
            clampToBounds:
              'Ogranicza wartość liczbową do skonfigurowanego zakresu min/max po zakończeniu edycji.',
          },
          accordion: {
            multi: 'Pozwala rozwinąć wiele elementów jednocześnie.',
          },
          alert: {
            dismissible:
              'Wyświetla przycisk zamknięcia, który pozwala użytkownikowi zamknąć alert.',
            variant: 'Semantyczny schemat kolorów sterujący ikoną i paletą alertu.',
            visible:
              'Określa, czy alert jest widoczny, dwukierunkowo wiązalne przez [(visible)].',
            dismissed: 'Emitowane, gdy użytkownik zamknie alert przyciskiem zamknięcia.',
            dismiss: 'Ukrywa alert i emituje zdarzenie dismissed.',
            size: 'Skaluje razem tekst, ikonę i odstęp.',
            icon: 'Zastępuje domyślną ikonę statusu wariantu dowolnym komponentem ikony.',
          },
          avatar: {
            src: 'Adres URL obrazu do wyświetlenia; w razie braku używa inicjałów, a następnie ogólnej ikony użytkownika.',
            alt: 'Tekst alternatywny dla obrazu awatara.',
            initials: 'Inicjały wyświetlane, gdy nie podano źródła obrazu.',
            size: 'Predefiniowana średnica awatara.',
            shape: 'Kontur awatara: okrągły lub zaokrąglony kwadrat.',
          },
          badge: {
            variant: 'Semantyczny schemat kolorów odznaki.',
            size: 'Wizualny rozmiar odznaki.',
            shape:
              'Zewnętrzny kształt odznaki (pill dopasowuje się do treści, pin renderuje się jako koło dla pojedynczych znaków).',
          },
          button: {
            variant: 'Wizualny styl przycisku, sterujący jego kolorem i wyróżnieniem.',
            size: 'Wizualny rozmiar przycisku.',
            type: 'Natywny atrybut type stosowany do bazowego elementu button.',
            disabled: 'Wyłącza przycisk i blokuje zdarzenia kliknięcia.',
            loading: 'Zamienia etykietę na spinner, zachowując renderowaną szerokość.',
            fullWidth: 'Rozciąga przycisk, aby wypełnił szerokość swojego kontenera.',
            ariaLabel:
              'Dostępna etykieta przycisku, gdy jego treść nie jest wystarczająco opisowa.',
            ariaCurrent:
              'Wartość natywnego atrybutu aria-current, oznaczająca przycisk jako bieżący element w zestawie.',
            clicked:
              'Emitowane po aktywacji przycisku, blokowane gdy wyłączony lub ładuje się.',
            icon: 'Opcjonalny komponent ikony renderowany po lewej stronie etykiety.',
          },
          card: {
            variant: 'Wizualny styl powierzchni karty.',
            padding: 'Predefiniowane wypełnienie obszaru treści karty.',
            headerAlign: 'Poziome wyrównanie treści nagłówka.',
            fullWidth: 'Rozciąga kartę, aby wypełniła dostępną szerokość.',
            headerDivider: 'Wyświetla linię oddzielającą nagłówek od treści.',
          },
          checkbox: {
            ariaLabel:
              'Dostępna nazwa pola wyboru, gdy nie jest renderowana widoczna etykieta.',
            checked:
              'Bieżący stan zaznaczenia, dwukierunkowo wiązalny przez [(checked)].',
            count: 'Dodatkowa wartość wyświetlana przyciemniona zaraz po etykiecie.',
            disabled: 'Wyłącza pole wyboru.',
            errorMsg:
              'Komunikat o błędzie pod polem, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            hint: 'Tekst pomocniczy pod polem, ukryty gdy występuje błąd.',
            id: 'id stosowane do natywnego pola i atrybutu for etykiety, generowane automatycznie gdy pominięte.',
            indeterminate: 'Renderuje pole wyboru w wizualnie nieokreślonym stanie.',
            label: 'Etykieta tekstowa renderowana obok pola wyboru.',
            required: 'Oznacza pole wyboru jako wymagane.',
            size: 'Wizualny rozmiar pola wyboru.',
            changed:
              'Emitowane z nowym stanem zaznaczenia, gdy użytkownik przełączy pole wyboru.',
          },
          'code-input': {
            disabled: 'Wyłącza wszystkie komórki cyfr.',
            errorMsg:
              'Komunikat o błędzie pod polem, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            hint: 'Tekst pomocniczy pod polem, ukryty gdy występuje błąd.',
            id: 'id stosowane do komórek cyfr i atrybutu for etykiety, generowane automatycznie gdy pominięte.',
            label: 'Etykieta tekstowa renderowana nad polem.',
            length: 'Liczba komórek cyfr, z których składa się kod.',
            placeholder: 'Tekst zastępczy rozłożony po jednym znaku na komórkę.',
            readonly: 'Wyświetla pole tylko do odczytu.',
            required: 'Oznacza pole jako wymagane.',
            size: 'Wizualny rozmiar każdej komórki cyfry.',
            value: 'Bieżąca wartość kodu, dwukierunkowo wiązalna przez [(value)].',
            completed: 'Emitowane z pełnym kodem, gdy wprowadzono każdą cyfrę.',
            focus:
              'Przenosi fokus klawiatury na następną pustą cyfrę (lub ostatnią, gdy pole jest pełne).',
            allowAllChars:
              'Zezwala na dowolny znak niebędący białym; w przeciwnym razie akceptowane są tylko cyfry.',
          },
          'color-picker': {
            disabled: 'Wyłącza pole.',
            errorMsg:
              'Komunikat o błędzie pod polem, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            format: 'Format wyjściowy emitowanej wartości koloru (hex, rgb lub hsl).',
            hint: 'Tekst pomocniczy pod polem, ukryty gdy występuje błąd.',
            id: 'id stosowane do elementu wyzwalającego i atrybutu for etykiety, generowane automatycznie gdy pominięte.',
            label: 'Etykieta tekstowa renderowana nad polem.',
            placeholder:
              'Tekst zastępczy wyświetlany na elemencie wyzwalającym, gdy nie wybrano koloru.',
            presets:
              'Predefiniowane próbki kolorów wyświetlane na dole popovera; przekaż pustą tablicę, aby je ukryć.',
            readonly:
              'Wyświetla pole tylko do odczytu, uniemożliwiając otwarcie popovera.',
            required: 'Oznacza pole jako wymagane.',
            showAlpha: 'Wyświetla suwak alfa i uwzględnia alfę w emitowanej wartości.',
            size: 'Wizualny rozmiar elementu wyzwalającego selektor.',
            value: 'Bieżący ciąg koloru, dwukierunkowo wiązalny przez [(value)].',
            changed: 'Emitowane z nowym ciągiem koloru, gdy zmieni się wybór.',
            cycleInputMode:
              'Przełącza wiersz wprowadzania popovera między ciągiem hex a kanałami RGB.',
            hasEyeDropper:
              'Zwraca informację, czy przeglądarka obsługuje API EyeDropper.',
            onHexInput:
              'Stosuje wpisany tekst hex do bieżącego koloru w trakcie edycji przez użytkownika.',
            onPopoverCloseRequested:
              'Zamyka popover, gdy użytkownik kliknie poza selektorem.',
          },
          divider: {
            label: 'Opcjonalna wyśrodkowana etykieta renderowana w linii separatora.',
            orientation: 'Orientacja, w której biegnie linia separatora.',
            thick: 'Renderuje grubszą linię podziału.',
          },
          'eagami-wordmark': {
            variant:
              'Wariant treści: default to sam znak słowny, byline dodaje wiersz autorski, tagline dodaje hasło.',
            layout: 'Układa znak słowny w stos wielowierszowy lub w jednej linii.',
            size: 'Wartość w pikselach, od której skaluje się cały znak słowny.',
          },
          'empty-state': {
            title: 'Tekst nagłówka wyświetlany nad opisem.',
            description: 'Tekst pomocniczy wyświetlany pod tytułem.',
            size: 'Wizualny rozmiar bloku stanu pustego.',
            headingLevel:
              'Poziom nagłówka użyty dla tytułu, aby pasował do otaczającej struktury dokumentu.',
            bordered: 'Renderuje przerywane obramowanie wokół bloku.',
            icon: 'Opcjonalny komponent ikony renderowany w obszarze mediów nad tytułem.',
          },
          paginator: {
            groupThousands: 'Grupuje tysiące przecinkami w zakresie i numerach stron.',
            size: 'Rozmiar wizualny paginatora i jego elementów.',
            align:
              'Poziome wyrównanie elementów sterujących paginatora w ich kontenerze.',
            disabled: 'Wyłącza wszystkie elementy sterujące paginatora.',
            page: 'Bieżący numer strony, dwukierunkowo wiązalny przez [(page)].',
            pageSize:
              'Liczba elementów wyświetlanych na stronie, dwukierunkowo wiązalna przez [(pageSize)].',
            pageSizeOptions:
              'Wybieralne rozmiary stron dostępne w selektorze rozmiaru strony.',
            showPageSizeSelector: 'Wyświetla element sterujący wyboru rozmiaru strony.',
            showRangeLabel: 'Wyświetla etykietę opisującą zakres widocznych elementów.',
            totalItems: 'Łączna liczba elementów używana do obliczenia liczby stron.',
            changed:
              'Emitowane, gdy użytkownik zmieni bieżącą stronę lub rozmiar strony.',
            goToPage:
              'Przechodzi do podanej strony, ograniczonej do prawidłowego zakresu.',
            nextPage: 'Przechodzi do następnej strony, jeśli istnieje.',
            prevPage: 'Przechodzi do poprzedniej strony, jeśli istnieje.',
          },
          'progress-bar': {
            variant: 'Wariant kolorystyczny paska.',
            size: 'Wizualna grubość paska.',
            value: 'Bieżąca wartość postępu.',
            max: 'Wartość, przy której pasek jest pełny.',
            showPercentage: 'Wyświetla bieżący procent obok paska.',
            indeterminate:
              'Odtwarza zapętloną animację dla postępu o nieznanym czasie trwania.',
            label: 'Etykieta tekstowa renderowana nad paskiem.',
          },
          radio: {
            disabled: 'Wyłącza tę opcję.',
            id: 'id stosowane do natywnego pola radio i atrybutu for etykiety, generowane automatycznie gdy pominięte.',
            label: 'Etykieta tekstowa renderowana obok pola radio.',
            value:
              'Wartość, którą ta opcja wnosi do swojej grupy nadrzędnej po zaznaczeniu.',
          },
          'range-slider': {
            ariaLabelHigh:
              'Dostępna etykieta dla wysokiego (końcowego) uchwytu, w razie braku używa etykiety pola.',
            ariaLabelLow:
              'Dostępna etykieta dla niskiego (początkowego) uchwytu, w razie braku używa etykiety pola.',
            disabled: 'Wyłącza suwak.',
            errorMsg:
              'Komunikat o błędzie pod suwakiem, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            formatValue: 'Formater stosowany do każdej wartości przed jej wyświetleniem.',
            hint: 'Tekst pomocniczy pod suwakiem, ukryty gdy występuje błąd.',
            id: 'id stosowane do suwaka, generowane automatycznie gdy pominięte.',
            label: 'Etykieta tekstowa renderowana nad suwakiem.',
            max: 'Najwyższa wartość, jaką może osiągnąć którykolwiek uchwyt.',
            min: 'Najniższa wartość, jaką może osiągnąć którykolwiek uchwyt.',
            required: 'Oznacza pole jako wymagane.',
            showMinMaxLabels: 'Wyświetla granice min i maks na końcach ścieżki.',
            showValue: 'Wyświetla bieżące wartości niską i wysoką obok suwaka.',
            size: 'Wizualny rozmiar ścieżki i uchwytów.',
            step: 'Przyrost, do którego każdy uchwyt przyciąga się podczas przesuwania.',
            value:
              'Bieżąca krotka zakresu [low, high], dwukierunkowo wiązalna przez [(value)].',
            changed:
              'Emitowane z nową krotką [low, high], gdy przesunie się którykolwiek uchwyt.',
            commitThumb:
              'Przyciąga uchwyt do najbliższego kroku, ogranicza go do granic i wiąże przeciwnym uchwytem.',
            groupThousands:
              'Grupuje wyświetlane wartości separatorami tysięcy, ignorowane gdy podano niestandardowy formatValue.',
            formatDisplay:
              'Formatuje wartość do wyświetlenia, stosując grupowanie tysięcy, chyba że ustawiono niestandardową funkcję formatValue.',
          },
          rating: {
            allowHalf:
              'Zezwala na dokładność do połowy gwiazdki, umożliwiając zmianę wartości o 0,5.',
            clearable: 'Kliknięcie bieżącej wartości czyści ocenę z powrotem do 0.',
            disabled: 'Wyłącza ocenę.',
            errorMsg:
              'Komunikat o błędzie pod oceną, zastępujący podpowiedź i oznaczający ją jako nieprawidłową.',
            halfIconClass:
              'Klasa komponentu standalone renderowana dla pozycji połówkowych, gdy allowHalf jest włączone.',
            hint: 'Tekst pomocniczy pod oceną, ukryty gdy występuje błąd.',
            iconClass:
              'Klasa komponentu standalone renderowana dla pozycji pustych i pełnych.',
            id: 'id stosowane do oceny i jej etykiety, generowane automatycznie gdy pominięte.',
            label: 'Etykieta tekstowa renderowana nad oceną.',
            max: 'Najwyższa wartość oceny i liczba renderowanych gwiazdek.',
            min: 'Najniższa wartość oceny, jaką użytkownik może wybrać.',
            readonly:
              'Renderuje ocenę tylko do wyświetlania, ignorując kliknięcia i wprowadzanie z klawiatury.',
            required: 'Oznacza ocenę jako wymaganą.',
            size: 'Wizualny rozmiar oceny.',
            value: 'Bieżąca wartość oceny, dwukierunkowo wiązalna przez [(value)].',
            hoverChanged:
              'Emitowane z podglądaną wartością podczas najechania, oraz null, gdy kursor opuści element.',
            iconForState:
              'Zwraca klasę komponentu do utworzenia dla danego stanu gwiazdki.',
            stateFor:
              'Ustala stan renderowania (pusty, połówkowy lub pełny) dla pozycji gwiazdki.',
          },
          skeleton: {
            animated:
              'Odtwarza pulsujący efekt poświaty, automatycznie wyłączany, gdy użytkownik preferuje ograniczony ruch.',
            height:
              'Jawna wysokość CSS stosowana do elementu zastępczego, domyślnie przyjmująca naturalny rozmiar kształtu, gdy pominięta.',
            variant:
              'Predefiniowany kształt elementu zastępczego: linia tekstu, koło lub prostokąt.',
            width:
              'Jawna szerokość CSS stosowana do elementu zastępczego, domyślnie przyjmująca naturalny rozmiar kształtu, gdy pominięta.',
          },
          slider: {
            ariaLabel:
              'Dostępna etykieta stosowana, gdy nie jest renderowana widoczna etykieta.',
            disabled: 'Wyłącza suwak.',
            errorMsg:
              'Komunikat o błędzie pod suwakiem, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            formatValue: 'Formater zamieniający wartość liczbową na wyświetlany tekst.',
            hasError: 'Wymusza stylizację stanu błędu bez wiązania komunikatu o błędzie.',
            hint: 'Tekst pomocniczy pod suwakiem, ukryty gdy występuje błąd.',
            id: 'id stosowane do suwaka i jego etykiety, generowane automatycznie gdy pominięte.',
            label: 'Etykieta tekstowa renderowana nad suwakiem.',
            max: 'Najwyższa wartość, jaką może osiągnąć suwak.',
            min: 'Najniższa wartość, jaką może osiągnąć suwak.',
            required: 'Oznacza suwak jako wymagany.',
            showMinMaxLabels: 'Wyświetla granice min i maks pod ścieżką.',
            showValue: 'Wyświetla bieżącą wartość obok etykiety.',
            size: 'Wizualny rozmiar ścieżki i uchwytu suwaka.',
            step: 'Przyrost, do którego wartość przyciąga się podczas przesuwania suwaka.',
            value: 'Bieżąca wartość suwaka, dwukierunkowo wiązalna przez [(value)].',
            changed: 'Emitowane z nową przyciągniętą wartością, gdy suwak się przesunie.',
            groupThousands:
              'Grupuje wyświetlane wartości separatorami tysięcy, ignorowane gdy podano niestandardowy formatValue.',
            formatDisplay:
              'Formatuje wartość do wyświetlenia, stosując grupowanie tysięcy, chyba że ustawiono niestandardową funkcję formatValue.',
          },
          spinner: {
            label:
              'Dostępna etykieta odczytywana przez technologie wspomagające, w razie braku używa tłumaczenia z aktywnej lokalizacji.',
            size: 'Wizualny rozmiar spinnera.',
          },
          switch: {
            ariaLabel:
              'Dostępna etykieta przełącznika, gdy nie jest renderowana widoczna etykieta.',
            checked:
              'Bieżący stan włączony/wyłączony, dwukierunkowo wiązalny przez [(checked)].',
            disabled: 'Wyłącza przełącznik i blokuje przełączanie.',
            errorMsg:
              'Komunikat o błędzie pod przełącznikiem, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            hint: 'Tekst pomocniczy pod przełącznikiem, ukryty gdy występuje błąd.',
            id: 'id stosowane do bazowego pola wyboru i atrybutu for etykiety, generowane automatycznie gdy pominięte.',
            label: 'Etykieta tekstowa renderowana obok przełącznika.',
            required: 'Oznacza przełącznik jako wymagany.',
            size: 'Wizualny rozmiar przełącznika.',
            changed:
              'Emitowane z nowym stanem zaznaczenia, gdy użytkownik przełączy przełącznik.',
          },
          tag: {
            variant: 'Semantyczny schemat kolorów tagu.',
            size: 'Wizualny rozmiar tagu.',
            removable: 'Renderuje przycisk usuwania emitujący removed po aktywacji.',
            disabled: 'Wyłącza tag i jego przycisk usuwania.',
            removeLabel:
              'Dostępna etykieta przycisku usuwania, w razie braku używa aktywnej lokalizacji.',
            removed:
              'Emitowane, gdy użytkownik aktywuje przycisk usuwania na tagu z możliwością usunięcia.',
          },
          textarea: {
            disabled: 'Wyłącza pole.',
            errorMsg:
              'Komunikat o błędzie pod polem, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            hint: 'Tekst pomocniczy pod polem, ukryty gdy występuje błąd.',
            id: 'id stosowane do natywnego pola textarea i atrybutu for etykiety, generowane automatycznie gdy pominięte.',
            label: 'Etykieta tekstowa renderowana nad polem.',
            maxHeight:
              'Górny limit wysokości pola w pikselach; powyżej niego textarea przewija się pionowo zamiast rosnąć.',
            minHeight: 'Minimalna wysokość w px; nigdy mniejsza niż wysokość domyślna.',
            maxlength: 'Maksymalna liczba znaków akceptowana przez pole.',
            placeholder: 'Tekst zastępczy wyświetlany, gdy pole jest puste.',
            readonly: 'Wyświetla pole tylko do odczytu.',
            required: 'Oznacza pole jako wymagane.',
            resize: 'Oś, wzdłuż której użytkownik może zmieniać rozmiar pola.',
            size: 'Wizualny rozmiar pola.',
            value: 'Bieżąca wartość pola, dwukierunkowo wiązalna przez [(value)].',
            blurred: 'Emitowane, gdy pole traci fokus.',
            focused: 'Emitowane, gdy pole otrzymuje fokus.',
            focus: 'Przenosi fokus klawiatury na bazowe natywne pole textarea.',
          },
          'avatar-editor': {
            accept:
              'Akceptowane typy MIME w selektorze plików, przekazywane do natywnego pola.',
            canvasSize:
              'Szerokość i wysokość w pikselach kwadratowego obszaru kadrowania.',
            cropState:
              'Początkowy stan przesunięcia/zoomu do przywrócenia przy wczytywaniu obrazu źródłowego.',
            currentSrc: 'URL obrazu wczytywanego do edytora przy inicjalizacji.',
            exportQuality:
              'Jakość JPEG/WebP przy eksporcie przyciętego obrazu, w przedziale 0-1.',
            exportType:
              'Typ MIME eksportowanego bloba obrazu (np. image/png lub image/jpeg).',
            loading:
              'Wyświetla szkielet ładowania, gdy zewnętrzny zasób jest wczytywany.',
            maxFileSize:
              'Maksymalny dozwolony rozmiar pliku w bajtach; pliki przekraczające limit emitują errored.',
            maxZoom: 'Maksymalny mnożnik zoomu dostępny dla użytkownika.',
            minZoom: 'Minimalny mnożnik zoomu dostępny dla użytkownika.',
            shape:
              'Kształt maski kadrowania stosowany do obszaru roboczego i eksportowanego obrazu.',
            cropped:
              'Emitowane gdy użytkownik eksportuje kadr, dostarczając Blob i adres URL danych.',
            cropStateChanged:
              'Emitowane przy każdym przesunięciu lub przybliżeniu obrazu przez użytkownika, przydatne do zachowania stanu edycji.',
            errored:
              'Emitowane z czytelnym komunikatem gdy walidacja pliku się nie powiedzie.',
            fileSelected:
              'Emitowane gdy plik zostanie wybrany z dysku lub upuszczony na edytor.',
            removed:
              'Emitowane gdy bieżący obraz zostanie usunięty za pomocą kontrolki usuwania.',
            captureOriginal:
              'Oznacza bieżący obraz i stan kadrowania jako punkt odniesienia dla revertImage.',
            exportCrop:
              'Renderuje bieżący kadr na pozaekranowym obszarze roboczym, emituje cropped i zwraca Blob.',
            openFilePicker: 'Otwiera natywne okno dialogowe wyboru pliku.',
            removeImage:
              'Usuwa wczytany obraz i resetuje przesunięcie oraz zoom do wartości domyślnych.',
            revertImage:
              'Przywraca obraz i stan kadrowania uchwycone przez ostatnie wywołanie captureOriginal.',
            setZoom:
              'Ustawia poziom zoomu, ograniczony do skonfigurowanego zakresu minZoom/maxZoom.',
            updateImageDarkness:
              'Próbkuje widoczny obszar kadrowania, aby określić czy obraz jest ciemniejszy niż średnia szarość.',
          },
          'menu-trigger': {
            menu: 'Instancja ea-menu kontrolowana przez ten wyzwalacz.',
          },
          tooltip: {
            maxWidth:
              'Maksymalna szerokość w pikselach; tekst zawija się przy tej szerokości (minimum 50px).',
            eaTooltip:
              'Treść tekstowa podpowiedzi wyświetlanej przy najechaniu kursorem i fokusie klawiatury.',
            tooltipPosition: 'Pozycja podpowiedzi względem elementu nadrzędnego.',
          },
          'time-picker': {
            disabled: 'Wyłącza selektor.',
            errorMsg:
              'Komunikat o błędzie pod polem, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            format:
              'Format wyświetlania etykiety wyzwalacza; wartość przewodowa jest zawsze w formacie 24-godzinnym.',
            hint: 'Tekst pomocniczy pod polem, ukryty gdy występuje błąd.',
            id: 'id stosowane do wyzwalacza i atrybutu for etykiety, generowane automatycznie gdy pominięte.',
            includeSeconds: 'Wyświetla kolumnę sekund obok godzin i minut.',
            label: 'Etykieta tekstowa renderowana nad polem.',
            minuteStep:
              'Przyrost, do którego kolumna minut przyciąga się podczas kroku lub przeciągania.',
            placeholder:
              'Tekst zastępczy wyświetlany na wyzwalaczu, gdy nie wybrano godziny.',
            readonly:
              'Wyświetla pole tylko do odczytu, uniemożliwiając otwarcie popovera.',
            required: 'Oznacza pole jako wymagane.',
            secondStep:
              'Przyrost, do którego kolumna sekund przyciąga się podczas kroku lub przeciągania.',
            size: 'Wizualny rozmiar wyzwalacza selektora.',
            value:
              'Bieżący ciąg czasu w formacie HH:MM lub HH:MM:SS (24-godzinnym), dwukierunkowo wiązalny przez [(value)], lub null gdy nieustawiony.',
            changed:
              'Emitowane z nowym ciągiem czasu, gdy użytkownik zmieni wybraną godzinę.',
            advanceFocus:
              'Przenosi fokus do następnej kolumny jednostki po zakończeniu wpisu cyfry.',
            cannotExtend:
              'Zwraca true, gdy żadna dodatkowa cyfra nie może prawidłowo rozszerzyć bieżącego bufora dla danej jednostki.',
            commitDigits:
              'Analizuje buforowany ciąg cyfr, ogranicza go do prawidłowego zakresu jednostki i zapisuje do wartości.',
            flushBuffer:
              'Zatwierdza wszelkie oczekujące buforowane cyfry i czyści bufor.',
            focusHoursWhenReady:
              'Ustawia fokus na polu godzin po wyrenderowaniu powierzchni popovera w DOM.',
            hoursFromTyped:
              'Konwertuje wpisaną wartość godzin na odpowiednik 24-godzinny, uwzględniając bieżący okres AM/PM.',
            onPopoverCloseRequested:
              'Zamyka popover, gdy użytkownik kliknie poza selektorem.',
            onSpinnerBlur:
              'Zatwierdza wszelkie oczekujące buforowane cyfry, gdy kolumna spinnera traci fokus.',
            onSpinnerFocus:
              'Zaznacza cały tekst w kolumnie spinnera po otrzymaniu fokusu, aby pierwszy naciśnięty klawisz go zastąpił.',
            onSpinnerInput:
              'Obsługuje wprowadzanie cyfr w kolumnie spinnera, aktualizuje bufor i automatycznie przesuwa fokus, gdy kolumna jest pełna.',
            startHold:
              'Rozpoczyna powtarzanie przez długie naciśnięcie przycisku strzałki, krokując daną jednostkę i przyspieszając po opóźnieniu.',
            step: 'Przesuwa daną kolumnę jednostki w górę lub dół o jeden skonfigurowany przyrost.',
            stopHold:
              'Anuluje wszelkie aktywne timery powtarzania przez długie naciśnięcie.',
            togglePeriod:
              'Przełącza okres AM/PM w trybie 12-godzinnym przez zmianę przesunięcia o 12 godzin.',
          },
          autocomplete: {
            disabled: 'Wyłącza pole.',
            emptyMessage:
              'Komunikat wyświetlany na liście, gdy żadna opcja nie pasuje do wpisanego tekstu, z powrotem do tłumaczenia aktywnej lokalizacji gdy pominięty.',
            errorMsg:
              'Komunikat o błędzie pod polem, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            hint: 'Tekst pomocniczy pod polem, ukryty gdy występuje błąd.',
            id: 'id stosowane do natywnego pola i atrybutu for etykiety, generowane automatycznie gdy pominięte.',
            label: 'Etykieta wyświetlana nad polem.',
            maxResults:
              'Maksymalna liczba opcji wyświetlanych jednocześnie na liście sugestii.',
            minLength:
              'Minimalna liczba znaków wymagana przed pojawieniem się listy sugestii.',
            options: 'Pełna lista opcji dostępnych do filtrowania i wyboru.',
            placeholder: 'Tekst zastępczy wyświetlany, gdy pole jest puste.',
            readonly: 'Wyświetla pole tylko do odczytu.',
            required: 'Oznacza pole jako wymagane.',
            size: 'Wizualny rozmiar pola.',
            value: 'Bieżąca wartość pola, dwukierunkowo wiązalna przez [(value)].',
            blurred: 'Emitowane, gdy pole traci fokus.',
            changed:
              'Emitowane przy każdej zmianie tekstu w polu, w tym przy swobodnym wpisywaniu.',
            focused: 'Emitowane, gdy pole otrzymuje fokus.',
            selected: 'Emitowane, gdy użytkownik wybiera opcję z listy sugestii.',
            close: 'Zamyka listę sugestii bez zmiany bieżącej wartości.',
            focus: 'Przenosi fokus klawiatury na bazowe pole tekstowe.',
            selectOption:
              'Programowo zaznacza podaną opcję, aktualizuje wartość i zamyka listę.',
          },
          'command-palette': {
            emptyMessage:
              'Komunikat wyświetlany gdy zapytanie nie pasuje do żadnego elementu, z powrotem do tłumaczenia aktywnej lokalizacji gdy pominięty.',
            items:
              'Pełna lista elementów poleceń dostępnych do wyszukiwania i wykonania.',
            open: 'Określa, czy okno dialogowe palety jest otwarte, dwukierunkowo wiązalne przez [(open)].',
            placeholder:
              'Tekst zastępczy wyświetlany w polu wyszukiwania gdy jest puste.',
            execute:
              'Emitowane, gdy użytkownik wybiera polecenie, przekazując wybrany element.',
            showActiveHighlight:
              'Zwraca, czy aktywny wiersz powinien renderować podświetlone tło dla podanego indeksu płaskiego.',
          },
          tabs: {
            activeTab:
              'Wartość aktualnie aktywnej karty, dwukierunkowo wiązalna przez [(activeTab)].',
            size: 'Wizualny rozmiar kart.',
            variant: 'Wizualny styl paska kart: podkreślony lub wypełniony.',
            changed:
              'Emitowane z wartością nowo aktywnej karty przy każdej zmianie aktywnej karty.',
            registerTab:
              'Rejestruje kartę potomną, aby pojawiła się na pasku kart; wywoływane automatycznie przez ea-tab.',
            selectTab: 'Programowo aktywuje kartę o podanej wartości.',
            unregisterTab:
              'Usuwa wcześniej zarejestrowaną kartę potomną; wywoływane automatycznie przez ea-tab.',
          },
          tab: {
            disabled: 'Wyłącza tę kartę, uniemożliwiając użytkownikowi jej wybranie.',
            id: 'id stosowane do przycisku karty i jej panelu, generowane automatycznie gdy pominięte.',
            label: 'Etykieta tekstowa wyświetlana na przycisku karty.',
            value:
              'Unikalna wartość identyfikująca tę kartę w obrębie nadrzędnej grupy ea-tabs.',
          },
          'date-picker': {
            disabled: 'Wyłącza selektor daty.',
            errorMsg:
              'Komunikat o błędzie pod polem, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            format: 'Format wyświetlania wybranej daty (short, medium lub long).',
            hint: 'Tekst pomocniczy pod polem, ukryty gdy występuje błąd.',
            id: 'id stosowane do przycisku wyzwalacza i atrybutu for etykiety, generowane automatycznie gdy pominięte.',
            label: 'Etykieta wyświetlana nad polem.',
            locale:
              'Znacznik locale BCP 47 używany do formatowania dat, domyślnie globalna locale gdy pominięty.',
            maxDate:
              'Najpóźniejsza data do wyboru; późniejsze daty są wyłączone w kalendarzu.',
            minDate:
              'Najwcześniejsza data do wyboru; wcześniejsze daty są wyłączone w kalendarzu.',
            placeholder:
              'Tekst zastępczy na wyzwalaczu, gdy żadna data nie jest wybrana.',
            readonly:
              'Wyświetla pole tylko do odczytu, uniemożliwiając otwarcie kalendarza.',
            required: 'Oznacza pole jako wymagane.',
            size: 'Wizualny rozmiar wyzwalacza selektora daty.',
            value: 'Bieżąca wybrana data, dwukierunkowo wiązalna przez [(value)].',
            weekStartsOn:
              'Pierwszy dzień tygodnia w siatce kalendarza (0 dla niedzieli, 1 dla poniedziałku).',
            changed: 'Emitowane, gdy wybrana data zmienia się, w tym po wyczyszczeniu.',
            clear: 'Czyści wybraną datę i emituje changed z wartością null.',
            close: 'Zamyka popover kalendarza.',
            focus: 'Przenosi fokus klawiatury na przycisk wyzwalacza.',
            onPopoverCloseRequested:
              'Zamyka popover, gdy użytkownik kliknie poza selektorem daty.',
            open: 'Otwiera popover kalendarza i przenosi fokus na aktywną komórkę dnia.',
            toggle: 'Przełącza popover kalendarza między otwarciem a zamknięciem.',
          },
          menu: {
            maxHeight:
              'Maksymalna wysokość przewijanej listy jako długość CSS; wyższe menu są przewijane.',
            ariaLabel:
              'Dostępna etykieta listy menu, domyślnie aktywna locale gdy pominięta.',
            disabled: 'Wyłącza menu, uniemożliwiając jego otwarcie.',
            id: 'id stosowane do elementu listy menu, generowane automatycznie gdy pominięte.',
            open: 'Określa, czy menu jest otwarte, dwukierunkowo wiązalne przez [(open)].',
            placement: 'Umiejscowienie listy menu względem elementu wyzwalacza.',
            closed: 'Emitowane, gdy menu się zamknie.',
            opened: 'Emitowane, gdy menu się otworzy.',
            close: 'Zamyka menu i opcjonalnie przywraca fokus do elementu wyzwalacza.',
            focusFirstItem:
              'Przenosi fokus klawiatury na pierwszy dostępny element menu.',
            onPopoverCloseRequested: 'Zamyka menu, gdy użytkownik kliknie poza nim.',
            openAt:
              'Otwiera menu zakotwiczone do podanego elementu wyzwalacza i ustawia fokus na pierwszym elemencie.',
            toggleAt:
              'Przełącza stan otwarcia menu, zakotwiczając je do podanego elementu wyzwalacza.',
          },
          'menu-item': {
            disabled: 'Wyłącza element i blokuje zdarzenia kliknięcia.',
            variant: 'Wizualny styl elementu; użyj danger dla destrukcyjnych akcji.',
            clicked:
              'Emitowane po aktywacji elementu; menu nadrzędne zamyka się natychmiast po tym.',
          },
          'multi-select': {
            disabled: 'Wyłącza multi-select.',
            errorMsg:
              'Komunikat o błędzie pod polem, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            hint: 'Tekst pomocniczy pod polem, ukryty gdy występuje błąd.',
            id: 'id stosowane do elementu wyzwalającego i atrybutu for etykiety, generowane automatycznie gdy pominięte.',
            label: 'Etykieta tekstowa renderowana nad polem.',
            maxVisibleChips:
              'Maksymalna liczba chipów widocznych w elemencie wyzwalającym, zanim pozostałe zostaną zwinięte do pastylki z licznikiem.',
            options: 'Lista opcji do wyboru renderowanych na liście rozwijanej.',
            placeholder:
              'Tekst zastępczy wyświetlany na elemencie wyzwalającym, gdy nie wybrano żadnej opcji.',
            readonly: 'Wyświetla pole tylko do odczytu.',
            required: 'Oznacza pole jako wymagane.',
            searchable: 'Wyświetla pole wyszukiwania na górze popovera.',
            searchPlaceholder:
              'Tekst zastępczy wyświetlany w polu wyszukiwania, gdy wyszukiwany termin jest pusty.',
            selectAll:
              'Wyświetla wiersz zaznacz wszystko o trzech stanach na górze listy opcji.',
            size: 'Wizualny rozmiar elementu wyzwalającego multi-select.',
            value: 'Wartości wybranych opcji, dwukierunkowo wiązalne przez [(value)].',
            changed: 'Emitowane z nową wartością za każdym razem, gdy zmieni się wybór.',
            clear: 'Czyści wszystkie wybory i zatrzymuje propagację zdarzenia.',
            handlePopoverKeydown:
              'Obsługuje nawigację klawiaturową wewnątrz otwartego popovera, przekierowując klawisze strzałek, Enter, Spację i Escape.',
            onPopoverCloseRequested:
              'Wywoływane przez popover, gdy użytkownik kliknie poza nim lub przewinie stronę; zamyka panel i oznacza pole jako dotknięte.',
            orderedValues:
              'Zwraca podany zestaw wartości posortowany zgodnie z kolejnością tablicy opcji wejściowych.',
            removeChip: 'Usuwa podaną opcję z bieżącego wyboru.',
            toggleOption: 'Przełącza przynależność podanej opcji do bieżącego wyboru.',
            toggleSelectAll:
              'Zaznacza wszystkie przefiltrowane opcje, jeśli którakolwiek jest odznaczona, albo odznacza wszystkie, jeśli są zaznaczone.',
          },
          dropdown: {
            disabled: 'Wyłącza listę rozwijaną.',
            errorMsg:
              'Komunikat o błędzie pod polem, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            hint: 'Tekst pomocniczy pod polem, ukryty gdy występuje błąd.',
            id: 'id stosowane do elementu wyzwalającego i atrybutu for etykiety, generowane automatycznie gdy pominięte.',
            label: 'Etykieta tekstowa renderowana nad polem.',
            options: 'Lista opcji do wyboru renderowanych na liście rozwijanej.',
            placeholder:
              'Tekst zastępczy wyświetlany na elemencie wyzwalającym, gdy nie wybrano żadnej opcji.',
            readonly: 'Wyświetla pole tylko do odczytu.',
            required: 'Oznacza pole jako wymagane.',
            size: 'Wizualny rozmiar elementu wyzwalającego listę rozwijaną.',
            value: 'Bieżąca wybrana wartość, dwukierunkowo wiązalna przez [(value)].',
            changed: 'Emitowane z nową wartością, gdy użytkownik wybierze opcję.',
            close: 'Zamyka listę rozwijaną bez zmiany bieżącej wartości.',
            focus: 'Przenosi fokus klawiatury na element wyzwalający listę rozwijaną.',
            onPopoverCloseRequested:
              'Wywoływane przez popover, gdy użytkownik kliknie poza listą rozwijaną; zamyka panel i oznacza pole jako dotknięte.',
            select: 'Programowo wybiera podaną opcję i zamyka listę.',
            toggle: 'Przełącza listę rozwijaną między stanem otwartym a zamkniętym.',
          },
          'file-uploader': {
            accept:
              "Oddzielone przecinkami typy MIME i rozszerzenia plików akceptowane przez strefę upuszczania, np. 'image/*,.pdf'.",
            disabled: 'Wyłącza uploader.',
            errorMsg:
              'Komunikat o błędzie pod polem, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            hint: 'Tekst pomocniczy pod polem, ukryty gdy występuje błąd.',
            id: 'id stosowane do strefy upuszczania i atrybutu for etykiety, generowane automatycznie gdy pominięte.',
            label: 'Etykieta wyświetlana nad polem.',
            maxFiles: 'Maksymalna łączna liczba plików; nadmiarowe pliki są odrzucane.',
            maxSize: 'Maksymalny rozmiar pliku w bajtach; większe pliki są odrzucane.',
            multiple: 'Pozwala wybrać więcej niż jeden plik naraz.',
            progress:
              'Mapa postępu przesyłania per plik (0-100) indeksowana tożsamością File; pomiń, aby ukryć paski postępu.',
            required: 'Oznacza pole jako wymagane.',
            showFileList: 'Wyświetla listę wybranych plików pod strefą upuszczania.',
            size: 'Wizualny rozmiar uploadera.',
            value: 'Bieżąca lista plików, dwukierunkowo wiązalna przez [(value)].',
            fileRemoved:
              'Emitowane, gdy plik zostanie usunięty przyciskiem usuwania jego wiersza.',
            rejected:
              'Emitowane, gdy jeden lub więcej plików nie przejdzie walidacji, wraz z powodem każdego odrzucenia.',
            trackFile:
              'Zwraca stabilny klucz śledzenia pliku, używany wewnętrznie przez listę plików.',
          },
          popover: {
            anchor:
              'Element hosta lub ElementRef, względem którego popover się pozycjonuje.',
            ariaLabel:
              'Dostępna etykieta powierzchni popovera; podaj ją, gdy popover nie zawiera widocznego nagłówka.',
            clamp:
              'Ogranicza popover do obszaru widoku, gdy w przeciwnym razie by go przekraczał.',
            closeOnEscape: 'Zamyka popover po naciśnięciu klawisza Escape.',
            closeOnOutsideClick:
              'Zamyka popover po kliknięciu przez użytkownika poza popoverem i jego kotwicą.',
            flip: 'Przełącza na przeciwną stronę, gdy żądane umieszczenie przekracza obszar widoku.',
            matchAnchorWidth:
              'Ustawia min-width popovera tak, aby odpowiadało szerokości kotwicy.',
            offset: 'Odstęp w px między kotwicą a powierzchnią popovera.',
            open: 'Określa, czy popover jest aktualnie otwarty.',
            placement: 'Preferowana pozycja popovera względem jego kotwicy.',
            role: 'Rola ARIA stosowana do powierzchni popovera.',
            scrollBehavior:
              'Zachowanie popovera podczas zdarzeń przewijania i zmiany rozmiaru gdy jest otwarty: reposition, close lub ignore.',
            surfaceId:
              'Id DOM powierzchni popovera, używany przez elementy wyzwalające przez aria-controls.',
            closeRequested:
              'Emitowane, gdy popover żąda zamknięcia; rodzic powinien odzwierciedlić to w [open].',
          },
          'accordion-item': {
            disabled: 'Wyłącza ten element, uniemożliwiając jego przełączanie.',
            id: 'id stosowane do przycisku nagłówka i panelu elementu, generowane automatycznie gdy pominięte.',
            label: 'Tekst wyświetlany w przycisku nagłówka elementu.',
            value: 'Unikalny klucz identyfikujący ten element w nadrzędnym akordeonie.',
          },
          breadcrumbs: {
            ariaLabel:
              'Dostępna etykieta nawigacji okruszkowej, domyślnie używająca tłumaczenia aktywnej lokalizacji gdy pominięta.',
            items:
              'Tablica wpisów okruszkowych; elementy z href renderowane są jako linki, pozostałe jako przyciski, a ostatni jest nieinteraktywny.',
            separator:
              'Wizualny styl separatora renderowanego między elementami okruszkowymi.',
            clicked:
              'Emitowane, gdy aktywowany zostanie element okruszkowy niebędący wyłączonym ani ostatnim.',
          },
          drawer: {
            animation:
              'Animacja wsuwania podczas otwierania i zamykania szuflady: none (natychmiast), linear (stała prędkość) lub eased (krzywa spowolnienia na końcu).',
            ariaLabel:
              'Dostępna etykieta panelu szuflady, gdy jego nagłówek nie jest wystarczająco opisowy.',
            closeOnBackdrop: 'Zamyka szufladę, gdy użytkownik kliknie tło.',
            closeOnEscape: 'Zamyka szufladę, gdy użytkownik naciśnie klawisz Escape.',
            id: 'id stosowane do elementu dialog, generowane automatycznie gdy pominięte.',
            mode: 'Relacja szuflady ze stroną: overlay unosi się nad przyciemnioną stroną z pułapką fokusu, a push otwiera się niemodalnie i przesuwa treść strony na bok.',
            open: 'Określa, czy szuflada jest otwarta, dwukierunkowo wiązalne przez [(open)].',
            position: 'Krawędź widocznego obszaru, od której wysuwa się szuflada.',
            pushTarget:
              'Element, którego treść jest przesuwana na bok w trybie push, jako selektor CSS lub referencja do elementu; domyślnie jest to body dokumentu.',
            showClose: 'Wyświetla przycisk zamknięcia w nagłówku szuflady.',
            size: 'Rozmiar panelu szuflady wzdłuż jej głównej osi: szerokość dla szuflad bocznych, wysokość dla szuflad górnych i dolnych.',
            closed:
              'Emitowane, gdy szuflada zamyka się, niezależnie od sposobu (przycisk, tło lub Escape).',
            opened: 'Emitowane po wyświetleniu szuflady.',
          },
          'data-table': {
            clickable:
              'Oznacza wiersze danych jako klikalne: pokazuje kursor wskaźnika i emituje rowActivate po kliknięciu lub Enter/Spacji.',
            rowActivate:
              'Emituje dane wiersza, gdy klikalny wiersz zostanie aktywowany kliknięciem lub klawiaturą.',
            navigable:
              'Zmienia tabelę w siatkę obsługiwaną z klawiatury z przesuwanym fokusem i przechodzeniem między komórkami strzałkami.',
            bordered: 'Renderuje obramowanie wokół każdej komórki.',
            columns:
              'Definicje kolumn opisujące klucz, etykietę i opcjonalnie sortowanie lub szablon każdego pola.',
            data: 'Tablica obiektów wierszy do wyświetlenia w tabeli.',
            density:
              'Predefiniowana pionowa gęstość sterująca wypełnieniem wierszy i komórek nagłówka.',
            hoverable: 'Podświetla wiersz pod wskaźnikiem po najechaniu kursorem.',
            noDataText:
              'Tekst wyświetlany w stanie pustym, z powrotem do tłumaczenia aktywnej lokalizacji.',
            sort: 'Bieżący stan sortowania (klucz kolumny i kierunek), dwukierunkowo wiązalny przez [(sort)].',
            stickyHeader:
              'Przytwierdza wiersz nagłówka do góry tabeli podczas przewijania zawartości.',
            striped:
              'Stosuje naprzemienne cieniowanie tła do nieparzystych i parzystych wierszy.',
            trackBy:
              'Klucz właściwości wiersza używany przez wykrywanie zmian Angular do efektywnej identyfikacji wierszy.',
            sorted:
              'Emitowane za każdym razem, gdy kolumna lub kierunek sortowania zmienia się przez kliknięcie nagłówka.',
          },
          'radio-group': {
            ariaLabel:
              'Dostępna etykieta grupy, gdy nie jest renderowana widoczna etykieta.',
            disabled: 'Wyłącza wszystkie opcje radia w grupie.',
            errorMsg:
              'Komunikat o błędzie pod grupą, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            hint: 'Tekst pomocniczy pod grupą, ukryty gdy występuje błąd.',
            id: 'id stosowane do elementu grupy i atrybutu for etykiety, generowane automatycznie gdy pominięte.',
            label: 'Etykieta tekstowa renderowana nad grupą.',
            name: 'Wspólny atrybut name stosowany do wszystkich pól radio w grupie, generowany automatycznie gdy pominięty.',
            orientation: 'Kierunek układu opcji radio w grupie.',
            required: 'Oznacza grupę jako wymaganą.',
            size: 'Wizualny rozmiar stosowany do wszystkich opcji radia w grupie.',
            value: 'Aktualnie wybrana wartość, dwukierunkowo wiązalna przez [(value)].',
            changed: 'Emitowane z nową wartością, gdy użytkownik wybiera opcję.',
            select: 'Programowo wybiera opcję o podanej wartości.',
          },
          segmented: {
            ariaLabel:
              'Dostępna etykieta kontrolki, gdy nie jest renderowana widoczna etykieta.',
            disabled: 'Wyłącza kontrolkę segmentową.',
            errorMsg:
              'Komunikat o błędzie pod polem, zastępujący podpowiedź i oznaczający pole jako nieprawidłowe.',
            fullWidth: 'Rozciąga kontrolkę, aby wypełniła szerokość swojego kontenera.',
            hint: 'Tekst pomocniczy pod polem, ukryty gdy występuje błąd.',
            id: 'id stosowane do kontrolki i atrybutu for etykiety, generowane automatycznie gdy pominięte.',
            label: 'Etykieta wyświetlana nad kontrolką.',
            options:
              'Tablica opcji renderowanych jako przyciski przełączające w kontrolce.',
            required: 'Oznacza pole jako wymagane.',
            size: 'Wizualny rozmiar kontrolki segmentowej.',
            value:
              'Wartość aktualnie wybranej opcji, dwukierunkowo wiązalna przez [(value)].',
            changed: 'Emitowane z nową wartością, gdy użytkownik wybiera inną opcję.',
            select: 'Programowo zaznacza podaną opcję.',
          },
          'tree-node': {
            collapseLabel: 'Dostępna etykieta przycisku zwijania.',
            disabled: 'Wyłącza interakcję z węzłem i jego potomkami.',
            expandedIds: 'Zbiór identyfikatorów węzłów aktualnie rozwiniętych.',
            expandLabel: 'Dostępna etykieta przycisku rozwijania.',
            focusedId:
              'Identyfikator węzła aktualnie posiadającego fokus ruchomego tabindex.',
            level:
              'Głębokość od korzenia drzewa (indeksowana od 0), używana do wcięcia i aria-level.',
            node: 'Obiekt danych opisujący ten węzeł, zawierający jego id, etykietę, potomków i stan wyłączenia.',
            posInSet:
              'Pozycja (indeksowana od 1) wśród potomków węzła nadrzędnego, używana dla aria-posinset.',
            selectedId:
              'Identyfikator aktualnie wybranego węzła lub null gdy nic nie jest wybrane.',
            setSize:
              'Całkowita liczba węzłów na tym samym poziomie w liście potomków węzła nadrzędnego, używana dla aria-setsize.',
            select: 'Emitowane, gdy użytkownik klika lub aktywuje wiersz węzła.',
            toggle:
              'Emitowane z identyfikatorem węzła, gdy użytkownik klika strzałkę rozwijania lub zwijania.',
          },
          tree: {
            ariaLabel: 'Dostępna etykieta widżetu drzewa.',
            disabled: 'Wyłącza wszystkie węzły drzewa.',
            expandedIds:
              'Identyfikatory aktualnie rozwiniętych węzłów gałęzi, dwukierunkowo wiązalne przez [(expandedIds)].',
            nodes: 'Tablica obiektów danych węzłów drzewa definiująca hierarchię.',
            selectedId:
              'Identyfikator aktualnie wybranego węzła, dwukierunkowo wiązalny przez [(selectedId)].',
            size: 'Wizualny rozmiar drzewa, skalujący tekst i odstępy proporcjonalnie.',
            nodeClick: 'Emitowane z danymi węzła, gdy użytkownik wybiera węzeł.',
          },
          step: {
            completed:
              'Oznacza krok jako ukończony, aktualizując jego wskaźnik wizualny.',
            disabled: 'Uniemożliwia aktywację kroku.',
            id: 'id stosowane do panelu kroku i jego zakładki, generowane automatycznie gdy pominięte.',
            label: 'Etykieta wyświetlana we wskaźniku kroku.',
            optional:
              'Oznacza krok jako opcjonalny, wyświetlane jako podpowiedź pod etykietą kroku.',
          },
          stepper: {
            activeStep:
              'Indeks aktywnego kroku (od zera), dwukierunkowo wiązalny przez [(activeStep)].',
            disabled: 'Wyłącza cały stepper i nawigację między krokami.',
            id: 'id stosowane do elementu hosta steppera, generowane automatycznie gdy pominięte.',
            linear:
              'Wymaga oznaczenia każdego nieobowiązkowego kroku jako ukończonego przed przejściem dalej.',
            size: 'Wizualny rozmiar steppera, skalujący wskaźniki kroków i etykiety razem.',
            changed:
              'Emitowane z nowym indeksem aktywnego kroku, gdy użytkownik przechodzi do innego kroku.',
            canNavigateTo:
              'Zwraca, czy krok o podanym indeksie jest osiągalny z bieżącego stanu.',
            indexOf:
              'Zwraca indeks podanego kroku lub -1, jeśli nie jest zarejestrowany.',
            selectStep: 'Aktywuje krok o podanym indeksie, jeśli jest osiągalny.',
          },
          'transfer-list': {
            disabled: 'Wyłącza całą listę transferu i wszystkie kontrolki przesuwania.',
            items:
              'Pełna pula elementów dostępnych w obu panelach, identyfikowanych przez id.',
            selectedIds:
              'Identyfikatory elementów aktualnie po stronie docelowej (prawej), dwukierunkowo wiązalne przez [(selectedIds)].',
            size: 'Wizualny rozmiar listy transferu.',
            sourceLabel:
              'Nagłówek renderowany nad panelem źródłowym (lewym), z powrotem do domyślnej wartości aktywnej lokalizacji.',
            targetLabel:
              'Nagłówek renderowany nad panelem docelowym (prawym), z powrotem do domyślnej wartości aktywnej lokalizacji.',
          },
          'virtual-list': {
            itemHeight:
              'Wysokość w pikselach każdego wiersza; wszystkie wiersze muszą mieć tę samą stałą wysokość.',
            items:
              'Pełna tablica elementów danych do renderowania; w danym momencie montowana jest tylko widoczna część.',
            overscan:
              'Liczba dodatkowych wierszy renderowanych powyżej i poniżej widocznego okna, aby zmniejszyć puste krawędzie podczas szybkiego przewijania.',
            viewportHeight: 'Wysokość w pikselach widocznego obszaru przewijania.',
            scrollIndexChange:
              'Emitowane z indeksem pierwszego widocznego wiersza u góry widoku podczas przewijania przez użytkownika.',
            scrollToIndex:
              'Przewija widoczny obszar tak, aby wiersz o podanym indeksie pojawił się u góry, ograniczony do granic listy.',
          },
          'field-label': {
            forId:
              'id powiązanego elementu sterującego; renderuje <label for> gdy ustawione, w przeciwnym razie <span>.',
            labelId:
              'id stosowane do renderowanego elementu etykiety, aby elementy sterujące mogły odwoływać się do niego przez aria-labelledby.',
            required: 'Wyświetla wskaźnik wymaganego pola na etykiecie.',
            text: 'Tekst etykiety renderowany wewnątrz elementu etykiety.',
          },
          'field-messages': {
            error:
              'Komunikat o błędzie do wyświetlenia; gdy ustawiony, podpowiedź jest ukryta, a komunikat ogłaszany jest jako alert.',
            hint: 'Tekst pomocniczy wyświetlany pod polem, gdy nie ma błędu.',
            id: 'Bazowe id używane do wyprowadzania identyfikatorów ARIA dla elementów błędu i podpowiedzi.',
          },
          dialog: {
            ariaLabel:
              'Dostępna etykieta okna dialogowego, gdy jego slot nagłówka nie zawiera widocznego tytułu.',
            closeOnBackdrop:
              'Zamyka okno dialogowe po kliknięciu przez użytkownika obszaru tła poza panelem.',
            closeOnEscape:
              'Zamyka okno dialogowe po naciśnięciu przez użytkownika klawisza Escape.',
            id: 'id stosowane do natywnego elementu dialog, generowane automatycznie gdy pominięte.',
            open: 'Określa, czy okno dialogowe jest wyświetlane, dwukierunkowo wiązalne przez [(open)].',
            showClose: 'Wyświetla przycisk zamknięcia w nagłówku okna dialogowego.',
            width: 'Wstępnie ustawiona szerokość panelu okna dialogowego.',
            closed:
              'Emitowane po zamknięciu okna dialogowego, niezależnie od tego, czy zamknął je użytkownik, czy nastąpiło to programowo.',
            opened: 'Emitowane po wyświetleniu okna dialogowego przez showModal().',
          },
        },
      },
      sharedOptions: {
        fruitOptions: [
          { value: 'apple', label: 'Jabłko' },
          { value: 'banana', label: 'Banan' },
          { value: 'cherry', label: 'Wiśnia' },
          { value: 'date', label: 'Daktyl' },
        ],
        viewOptions: [
          { value: 'day', label: 'Dzień' },
          { value: 'week', label: 'Tydzień' },
          { value: 'month', label: 'Miesiąc' },
        ],
        themeOptions: [
          { value: 'light', label: 'Jasny' },
          { value: 'dark', label: 'Ciemny' },
        ],
        monthOptions: [
          { value: 'jan', label: 'Styczeń' },
          { value: 'feb', label: 'Luty' },
          { value: 'mar', label: 'Marzec' },
          { value: 'apr', label: 'Kwiecień' },
          { value: 'may', label: 'Maj' },
          { value: 'jun', label: 'Czerwiec' },
          { value: 'jul', label: 'Lipiec' },
          { value: 'aug', label: 'Sierpień' },
          { value: 'sep', label: 'Wrzesień' },
          { value: 'oct', label: 'Październik' },
          { value: 'nov', label: 'Listopad' },
          { value: 'dec', label: 'Grudzień' },
        ],
        breadcrumbHome: 'Strona główna',
        breadcrumbProducts: 'Produkty',
        breadcrumbLaptops: 'Laptopy',
        breadcrumbMacBookPro: 'MacBook Pro',
        breadcrumbDashboard: 'Pulpit',
        breadcrumbSettings: 'Ustawienia',
      },
    },
  },
};

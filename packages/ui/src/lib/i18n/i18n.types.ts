/**
 * BCP 47 locale tags supported out of the box. Consumers select one of these
 * via `provideEagamiUi({ locale })` or `EagamiI18nService.setLocale()`.
 */
export type EagamiLocale =
  | 'en'
  | 'de'
  | 'es-ES'
  | 'fr-FR'
  | 'is'
  | 'nl'
  | 'pl'
  | 'pt-BR'
  | 'el'
  | 'ru'
  | 'uk'
  | 'zh-CN';

/**
 * Display metadata for a built-in locale: the language's name in its own
 * language and a representative flag emoji.
 */
export interface EagamiLocaleMeta {
  locale: EagamiLocale;
  label: string;
  flag: string;
}

/**
 * Display name and flag for every built-in locale, in language-switcher order:
 * English first (the default fallback), then alphabetical by each language's own
 * name (Latin scripts first, then Greek, Cyrillic, and Chinese by Unicode block
 * order). Keyed by `EagamiLocale` so a locale added to the union without an entry
 * fails to compile, keeping this single source exhaustive.
 */
const LOCALE_DISPLAY = {
  en: { label: 'English', flag: '🇬🇧' },
  de: { label: 'Deutsch', flag: '🇩🇪' },
  'es-ES': { label: 'Español', flag: '🇪🇸' },
  'fr-FR': { label: 'Français', flag: '🇫🇷' },
  is: { label: 'Íslenska', flag: '🇮🇸' },
  nl: { label: 'Nederlands', flag: '🇳🇱' },
  pl: { label: 'Polski', flag: '🇵🇱' },
  'pt-BR': { label: 'Português (Brasil)', flag: '🇧🇷' },
  el: { label: 'Ελληνικά', flag: '🇬🇷' },
  ru: { label: 'Русский', flag: '🇷🇺' },
  uk: { label: 'Українська', flag: '🇺🇦' },
  'zh-CN': { label: '中文', flag: '🇨🇳' },
} satisfies Record<EagamiLocale, Omit<EagamiLocaleMeta, 'locale'>>;

/**
 * Display metadata for every built-in locale. The single source the Storybook
 * locale toolbar and any consumer-built language switcher derive from, so the
 * displayed list never drifts from the locales the library ships.
 */
export const EAGAMI_LOCALE_META: readonly EagamiLocaleMeta[] = (
  Object.keys(LOCALE_DISPLAY) as EagamiLocale[]
).map(locale => ({ locale, ...LOCALE_DISPLAY[locale] }));

/**
 * Supported locales for language switchers, in display order. Derived from
 * `EAGAMI_LOCALE_META` so the two never drift.
 */
export const EAGAMI_LOCALES: readonly EagamiLocale[] = EAGAMI_LOCALE_META.map(
  m => m.locale,
);

/**
 * Every user-facing string baked into the component library, grouped by
 * component. Parameterized strings are functions so each locale controls its
 * own word order and pluralization.
 */
export interface EagamiMessages {
  alert: {
    dismiss: string;
  };
  autocomplete: {
    empty: string;
  };
  avatarEditor: {
    upload: string;
    dropzone: string;
    canvas: string;
    change: string;
    revert: string;
    zoomOut: string;
    zoom: string;
    zoomIn: string;
    remove: string;
  };
  breadcrumbs: {
    label: string;
  };
  codeInput: {
    groupLabel: (length: number) => string;
    digitLabel: (index: number, length: number) => string;
  };
  commandPalette: {
    dialogLabel: string;
    searchPlaceholder: string;
    empty: string;
    clear: string;
  };
  colorPicker: {
    placeholder: string;
    clear: string;
    hue: string;
    saturationAndValue: string;
    alpha: string;
    eyedropper: string;
    presets: string;
    toggleFormat: string;
  };
  dataTable: {
    noData: string;
  };
  datePicker: {
    placeholder: string;
    clear: string;
    previousYear: string;
    previousMonth: string;
    nextMonth: string;
    nextYear: string;
    today: string;
  };
  dialog: {
    close: string;
  };
  drawer: {
    close: string;
  };
  dropdown: {
    placeholder: string;
  };
  fileUploader: {
    prompt: string;
    promptSingle: string;
    browse: string;
    removeFile: (name: string) => string;
    fileListLabel: string;
    constraintsAccept: (accept: string) => string;
    constraintsMaxSize: (size: string) => string;
    constraintsMaxFiles: (count: number) => string;
    rejectionType: (name: string) => string;
    rejectionSize: (name: string, max: string) => string;
    rejectionCount: (max: number) => string;
    bytesUnit: {
      b: string;
      kb: string;
      mb: string;
      gb: string;
      tb: string;
    };
  };
  input: {
    showPassword: string;
    hidePassword: string;
    clear: string;
  };
  menu: {
    label: string;
  };
  multiSelect: {
    placeholder: string;
    searchPlaceholder: string;
    searchEmpty: string;
    selectAll: string;
    clearAll: string;
    removeOption: (label: string) => string;
    selectedCount: (count: number) => string;
  };
  paginator: {
    label: string;
    rowsPerPage: string;
    range: (start: string, end: string, total: string) => string;
    previousPage: string;
    nextPage: string;
  };
  progressBar: {
    label: string;
  };
  rating: {
    label: string;
    valueLabel: (value: number, max: number) => string;
    clear: string;
  };
  spinner: {
    label: string;
  };
  stepper: {
    optional: string;
  };
  tag: {
    remove: string;
  };
  timePicker: {
    placeholder: string;
    clear: string;
    hoursLabel: string;
    minutesLabel: string;
    secondsLabel: string;
    incrementHours: string;
    decrementHours: string;
    incrementMinutes: string;
    decrementMinutes: string;
    incrementSeconds: string;
    decrementSeconds: string;
    amLabel: string;
    pmLabel: string;
  };
  toast: {
    dismiss: string;
  };
  transferList: {
    sourceLabel: string;
    targetLabel: string;
    controlsLabel: string;
    moveSelectedToTarget: string;
    moveAllToTarget: string;
    moveSelectedToSource: string;
    moveAllToSource: string;
    empty: string;
  };
  tree: {
    expand: string;
    collapse: string;
  };
  validation: {
    required: string;
    email: string;
    min: (min: number) => string;
    max: (max: number) => string;
    minlength: (requiredLength: number) => string;
    maxlength: (requiredLength: number) => string;
    pattern: string;
    invalid: string;
  };
  wordmark: {
    overline: string;
    tagline: string;
  };
}

/** A partial set of message overrides, applied per component group. */
export type EagamiMessagesOverride = {
  [G in keyof EagamiMessages]?: Partial<EagamiMessages[G]>;
};

/**
 * A self-identifying locale dictionary. Import the ones you need and register
 * them via `provideEagamiUi({ locales: [...] })` so only those ship in your
 * bundle; English is always available without registration.
 */
export interface EagamiLocaleBundle {
  locale: EagamiLocale;
  messages: EagamiMessages;
}

/** Configuration accepted by `provideEagamiUi`. */
export interface EagamiI18nConfig {
  /** Initial locale. Defaults to `'en'`. Falls back to English if not registered. */
  locale?: EagamiLocale;
  /**
   * Locale dictionaries to make available at runtime, beyond the built-in
   * English. Pass `EAGAMI_ALL_LOCALES` for every shipped language, or a subset
   * to keep your bundle lean.
   */
  locales?: readonly EagamiLocaleBundle[];
  /** Optional per-string overrides merged over the active locale's messages. */
  messages?: EagamiMessagesOverride;
}

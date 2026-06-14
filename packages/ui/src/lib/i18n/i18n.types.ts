/**
 * BCP 47 locale tags supported out of the box. Consumers select one of these
 * via `provideEagamiUi({ locale })` or `EagamiI18nService.setLocale()`.
 */
export type EagamiLocale =
  | 'en'
  | 'fr-FR'
  | 'el'
  | 'pl'
  | 'es-ES'
  | 'de'
  | 'pt-BR'
  | 'zh-CN'
  | 'is'
  | 'nl';

/**
 * Supported locales for language switchers: English pinned first (default
 * fallback), then alphabetical by each language's own name (Latin scripts
 * first, then Greek and Chinese).
 */
export const EAGAMI_LOCALES: readonly EagamiLocale[] = [
  'en',
  'de',
  'es-ES',
  'fr-FR',
  'is',
  'nl',
  'pl',
  'pt-BR',
  'el',
  'zh-CN',
];

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

/** Configuration accepted by `provideEagamiUi`. */
export interface EagamiI18nConfig {
  /** Initial locale. Defaults to `'en'`. */
  locale?: EagamiLocale;
  /** Optional per-string overrides merged over the active locale's messages. */
  messages?: EagamiMessagesOverride;
}

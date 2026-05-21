// =============================================================================
// EAGAMI UI — i18n types
// =============================================================================

/**
 * BCP 47 locale tags supported out of the box. Consumers select one of these
 * via `provideEagamiUi({ locale })` or `EagamiI18nService.setLocale()`.
 */
export type EagamiLocale = 'en' | 'fr-FR' | 'el' | 'pl' | 'es-ES';

/** Ordered list of every supported locale — handy for language switchers. */
export const EAGAMI_LOCALES: readonly EagamiLocale[] = [
  'en',
  'fr-FR',
  'el',
  'pl',
  'es-ES',
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
  input: {
    showPassword: string;
    hidePassword: string;
  };
  menu: {
    label: string;
  };
  paginator: {
    label: string;
    rowsPerPage: string;
    range: (start: number, end: number, total: number) => string;
    previousPage: string;
    nextPage: string;
  };
  progressBar: {
    label: string;
  };
  spinner: {
    label: string;
  };
  tag: {
    remove: string;
  };
  toast: {
    dismiss: string;
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

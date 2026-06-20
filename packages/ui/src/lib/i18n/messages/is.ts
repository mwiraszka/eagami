import type { EagamiLocaleBundle, EagamiMessages } from '../i18n.types';

/** Icelandic messages. */
const messages: EagamiMessages = {
  alert: {
    dismiss: 'Loka',
  },
  autocomplete: {
    empty: 'Engar niðurstöður',
  },
  avatarEditor: {
    upload: 'Hlaða upp mynd',
    dropzone: 'Slepptu mynd eða smelltu til að hlaða upp',
    canvas:
      'Forskoðun myndar, dragðu eða notaðu örvatakka til að hreyfa, sleða til að aðdrátta',
    change: 'Skipta um mynd',
    revert: 'Endurheimta upprunalega',
    zoomOut: 'Minnka aðdrátt',
    zoom: 'Aðdráttur',
    zoomIn: 'Auka aðdrátt',
    remove: 'Fjarlægja mynd',
  },
  breadcrumbs: {
    label: 'Brauðmolaslóð',
  },
  codeInput: {
    groupLabel: length => `Staðfestingarkóði, ${length} tölustafir`,
    digitLabel: (index, length) => `Tölustafur ${index} af ${length}`,
  },
  commandPalette: {
    dialogLabel: 'Skipanaspjald',
    searchPlaceholder: 'Sláðu inn skipun eða leitaðu…',
    empty: 'Engar niðurstöður fundust',
    clear: 'Hreinsa leit',
  },
  colorPicker: {
    placeholder: 'Veldu lit…',
    clear: 'Hreinsa lit',
    hue: 'Litblær',
    saturationAndValue: 'Mettun og birta',
    alpha: 'Gegnsæi',
    eyedropper: 'Velja af skjánum',
    presets: 'Forstillingar',
    toggleFormat: 'Skipta um innsláttarsnið',
  },
  dataTable: {
    noData: 'Engin gögn til staðar',
  },
  datePicker: {
    placeholder: 'Veldu dagsetningu…',
    clear: 'Hreinsa dagsetningu',
    previousYear: 'Fyrra ár',
    previousMonth: 'Fyrri mánuður',
    nextMonth: 'Næsti mánuður',
    nextYear: 'Næsta ár',
    today: 'Í dag',
  },
  dialog: {
    close: 'Loka glugga',
  },
  drawer: {
    close: 'Loka spjaldi',
  },
  dropdown: {
    placeholder: 'Veldu…',
  },
  fileUploader: {
    prompt: 'Smelltu eða dragðu skrár hingað til að hlaða upp',
    promptSingle: 'Smelltu eða dragðu skrá hingað til að hlaða upp',
    browse: 'Velja skrár',
    removeFile: name => `Fjarlægja ${name}`,
    fileListLabel: 'Valdar skrár',
    constraintsAccept: accept => `Samþykkt: ${accept}`,
    constraintsMaxSize: size => `Hámark ${size} á hverja skrá`,
    constraintsMaxFiles: count => `Allt að ${count} skrár`,
    rejectionType: name => `${name} er með óstudda skráargerð`,
    rejectionSize: (name, max) => `${name} fer yfir mörkin ${max}`,
    rejectionCount: max => `Aðeins er hægt að velja ${max} skrár`,
    bytesUnit: { b: 'B', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' },
  },
  input: {
    showPassword: 'Sýna lykilorð',
    hidePassword: 'Fela lykilorð',
    clear: 'Hreinsa',
  },
  menu: {
    label: 'Valmynd',
  },
  multiSelect: {
    placeholder: 'Veldu…',
    searchPlaceholder: 'Leita…',
    searchEmpty: 'Engin samsvörun',
    selectAll: 'Velja allt',
    clearAll: 'Hreinsa val',
    removeOption: label => `Fjarlægja ${label}`,
    selectedCount: count => `${count} valdar`,
  },
  paginator: {
    label: 'Síðuskipting',
    rowsPerPage: 'Raðir á síðu:',
    range: (start, end, total) => `${start}–${end} af ${total}`,
    previousPage: 'Fyrri síða',
    nextPage: 'Næsta síða',
  },
  progressBar: {
    label: 'Framvinda',
  },
  rating: {
    label: 'Einkunn',
    valueLabel: (value, max) => `${value} af ${max}`,
    clear: 'Hreinsa einkunn',
  },
  spinner: {
    label: 'Hleð',
  },
  stepper: {
    optional: 'valfrjálst',
  },
  tag: {
    remove: 'Fjarlægja',
  },
  timePicker: {
    placeholder: 'Veldu tíma…',
    clear: 'Hreinsa tíma',
    hoursLabel: 'Klukkustundir',
    minutesLabel: 'Mínútur',
    secondsLabel: 'Sekúndur',
    incrementHours: 'Hækka klukkustundir',
    decrementHours: 'Lækka klukkustundir',
    incrementMinutes: 'Hækka mínútur',
    decrementMinutes: 'Lækka mínútur',
    incrementSeconds: 'Hækka sekúndur',
    decrementSeconds: 'Lækka sekúndur',
    amLabel: 'f.h.',
    pmLabel: 'e.h.',
  },
  toast: {
    dismiss: 'Loka',
  },
  transferList: {
    sourceLabel: 'Í boði',
    targetLabel: 'Valið',
    controlsLabel: 'Flutningsstýringar',
    moveSelectedToTarget: 'Færa valið yfir',
    moveAllToTarget: 'Færa allt yfir',
    moveSelectedToSource: 'Færa valið til baka',
    moveAllToSource: 'Færa allt til baka',
    empty: 'Engin atriði',
  },
  tree: {
    expand: 'Fletta út',
    collapse: 'Fella saman',
  },
  validation: {
    required: 'Þennan reit þarf að fylla út',
    email: 'Sláðu inn gilt netfang',
    min: min => `Verður að vera að minnsta kosti ${min}`,
    max: max => `Má mest vera ${max}`,
    minlength: length => `Verður að innihalda að minnsta kosti ${length} stafi`,
    maxlength: length => `Má mest innihalda ${length} stafi`,
    pattern: 'Ógilt snið',
    invalid: 'Ógilt gildi',
  },
  wordmark: {
    overline: 'handunnið af',
    tagline: 'glæsileg vefhönnun',
  },
};

export const is: EagamiLocaleBundle = {
  locale: 'is',
  messages,
};

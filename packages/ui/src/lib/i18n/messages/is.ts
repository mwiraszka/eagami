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
    dropzone: 'Slepptu mynd eða smelltu til að velja',
    canvas:
      'Forskoðun myndar, dragðu eða notaðu örvatakka til að hreyfa, sleða til að aðdrátta',
    canvasInstructions:
      'Notaðu örvatakkana til að hreyfa myndina, plús og mínus til að breyta aðdrætti og Enter eða bilslá til að velja aðra mynd',
    change: 'Skipta um mynd',
    revert: 'Endurheimta upprunalega',
    zoomOut: 'Minnka aðdrátt',
    zoom: 'Aðdráttur',
    zoomIn: 'Auka aðdrátt',
    remove: 'Fjarlægja mynd',
    invalidType: 'Skráin verður að vera mynd',
    tooLarge: (maxMb: number) => `Skráin fer yfir ${maxMb} MB mörkin`,
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
  },
  colorPicker: {
    dialogLabel: 'Velja lit',
    placeholder: 'Veldu lit…',
    clear: 'Hreinsa lit',
    hue: 'Litblær',
    saturationAndValue: 'Mettun og birta',
    saturationAndValueStatus: (saturation, value) =>
      `Mettun ${saturation}%, birta ${value}%`,
    alpha: 'Gegnsæi',
    eyedropper: 'Velja af skjánum',
    presets: 'Forstillingar',
    toggleFormat: 'Skipta um innsláttarsnið',
  },
  dataTable: {
    noData: 'Engin gögn til staðar',
  },
  numberFormat: {
    decimal: ',',
    group: '.',
    grouping: [3],
  },
  datePicker: {
    placeholder: 'Veldu dagsetningu…',
    dialogLabel: 'Velja dagsetningu',
    clear: 'Hreinsa dagsetningu',
    previousYear: 'Fyrra ár',
    previousMonth: 'Fyrri mánuður',
    nextMonth: 'Næsti mánuður',
    nextYear: 'Næsta ár',
    today: 'Í dag',
    weekdaysShort: ['sun.', 'mán.', 'þri.', 'mið.', 'fim.', 'fös.', 'lau.'],
    months: [
      'janúar',
      'febrúar',
      'mars',
      'apríl',
      'maí',
      'júní',
      'júlí',
      'ágúst',
      'september',
      'október',
      'nóvember',
      'desember',
    ],
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
    dialogLabel: 'Velja valkosti',
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
    page: page => `Fara á síðu ${page}`,
  },
  progressBar: {
    label: 'Framvinda',
  },
  rangeSlider: {
    lowThumbLabel: 'Lágmarksgildi',
    highThumbLabel: 'Hámarksgildi',
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
    stepsLabel: 'Skref',
    optional: 'valfrjálst',
    stepCompleted: 'lokið',
  },
  tag: {
    remove: 'Fjarlægja',
  },
  timePicker: {
    placeholder: 'Veldu tíma…',
    dialogLabel: 'Velja tíma',
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
    moved: (count, listLabel) => `Flutt í ${listLabel}: ${count}`,
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
    overline: 'hannað af',
    tagline: 'glæsileg vefhönnun',
  },
};

export const is: EagamiLocaleBundle = {
  locale: 'is',
  messages,
};

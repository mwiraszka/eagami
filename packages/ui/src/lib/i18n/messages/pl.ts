import type { EagamiLocaleBundle, EagamiMessages } from '../i18n.types';

/** Polish messages. */
const messages: EagamiMessages = {
  alert: {
    dismiss: 'Zamknij',
  },
  autocomplete: {
    empty: 'Brak wyników',
  },
  avatarEditor: {
    upload: 'Prześlij obraz',
    dropzone: 'Upuść obraz lub kliknij, aby wybrać',
    canvas:
      'Podgląd obrazu, przeciągnij lub użyj strzałek, aby przesunąć, suwaka, aby przybliżyć',
    canvasInstructions:
      'Użyj strzałek, aby przesunąć obraz, plusa i minusa, aby zmienić powiększenie, oraz Enter lub spacji, aby wybrać inne zdjęcie',
    change: 'Zmień zdjęcie',
    revert: 'Przywróć oryginał',
    zoomOut: 'Pomniejsz',
    zoom: 'Powiększenie',
    zoomIn: 'Powiększ',
    remove: 'Usuń obraz',
    invalidType: 'Plik musi być obrazem',
    tooLarge: (maxMb: number) => `Plik przekracza limit ${maxMb} MB`,
  },
  breadcrumbs: {
    label: 'Ścieżka nawigacji',
  },
  codeInput: {
    groupLabel: length => `Kod weryfikacyjny, ${length} cyfr`,
    digitLabel: (index, length) => `Cyfra ${index} z ${length}`,
  },
  commandPalette: {
    dialogLabel: 'Paleta poleceń',
    searchPlaceholder: 'Wpisz polecenie lub szukaj…',
    empty: 'Brak wyników',
  },
  colorPicker: {
    dialogLabel: 'Wybierz kolor',
    placeholder: 'Wybierz kolor…',
    clear: 'Wyczyść kolor',
    hue: 'Barwa',
    saturationAndValue: 'Nasycenie i wartość',
    saturationAndValueStatus: (saturation, value) =>
      `Nasycenie ${saturation}%, jasność ${value}%`,
    alpha: 'Alfa',
    eyedropper: 'Pobierz z ekranu',
    presets: 'Predefiniowane',
    toggleFormat: 'Zmień format wprowadzania',
  },
  dataTable: {
    noData: 'Brak dostępnych danych',
  },
  numberFormat: {
    decimal: ',',
    group: '\u00A0',
    grouping: [3],
  },
  datePicker: {
    placeholder: 'Wybierz datę…',
    dialogLabel: 'Wybierz datę',
    clear: 'Wyczyść datę',
    previousYear: 'Poprzedni rok',
    previousMonth: 'Poprzedni miesiąc',
    nextMonth: 'Następny miesiąc',
    nextYear: 'Następny rok',
    today: 'Dzisiaj',
    weekdaysShort: ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'],
    months: [
      'styczeń',
      'luty',
      'marzec',
      'kwiecień',
      'maj',
      'czerwiec',
      'lipiec',
      'sierpień',
      'wrzesień',
      'październik',
      'listopad',
      'grudzień',
    ],
  },
  dialog: {
    close: 'Zamknij okno dialogowe',
  },
  drawer: {
    close: 'Zamknij panel',
  },
  dropdown: {
    placeholder: 'Wybierz…',
  },
  fileUploader: {
    prompt: 'Kliknij lub przeciągnij pliki tutaj, aby je przesłać',
    promptSingle: 'Kliknij lub przeciągnij plik tutaj, aby go przesłać',
    browse: 'Przeglądaj pliki',
    removeFile: name => `Usuń ${name}`,
    fileListLabel: 'Wybrane pliki',
    constraintsAccept: accept => `Akceptowane: ${accept}`,
    constraintsMaxSize: size => `Maks. ${size} na plik`,
    constraintsMaxFiles: count => `Do ${count} plików`,
    rejectionType: name => `${name} ma nieobsługiwany typ pliku`,
    rejectionSize: (name, max) => `${name} przekracza limit ${max}`,
    rejectionCount: max => `Można wybrać tylko ${max} plików`,
    bytesUnit: { b: 'B', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' },
  },
  input: {
    showPassword: 'Pokaż hasło',
    hidePassword: 'Ukryj hasło',
    clear: 'Wyczyść',
  },
  menu: {
    label: 'Menu',
  },
  multiSelect: {
    dialogLabel: 'Wybierz opcje',
    placeholder: 'Wybierz…',
    searchPlaceholder: 'Szukaj…',
    searchEmpty: 'Brak wyników',
    selectAll: 'Zaznacz wszystko',
    clearAll: 'Wyczyść wybór',
    removeOption: label => `Usuń ${label}`,
    selectedCount: count => `Wybrano: ${count}`,
  },
  paginator: {
    label: 'Paginacja',
    rowsPerPage: 'Wierszy na stronę:',
    range: (start, end, total) => `${start}–${end} z ${total}`,
    previousPage: 'Poprzednia strona',
    nextPage: 'Następna strona',
    page: page => `Przejdź do strony ${page}`,
  },
  progressBar: {
    label: 'Postęp',
  },
  rangeSlider: {
    lowThumbLabel: 'Wartość minimalna',
    highThumbLabel: 'Wartość maksymalna',
  },
  rating: {
    label: 'Ocena',
    valueLabel: (value, max) => `${value} z ${max}`,
    clear: 'Wyczyść ocenę',
  },
  spinner: {
    label: 'Ładowanie',
  },
  stepper: {
    stepsLabel: 'Kroki',
    optional: 'opcjonalny',
    stepCompleted: 'ukończony',
  },
  tag: {
    remove: 'Usuń',
  },
  timePicker: {
    placeholder: 'Wybierz godzinę…',
    dialogLabel: 'Wybierz godzinę',
    clear: 'Wyczyść godzinę',
    hoursLabel: 'Godziny',
    minutesLabel: 'Minuty',
    secondsLabel: 'Sekundy',
    incrementHours: 'Zwiększ godziny',
    decrementHours: 'Zmniejsz godziny',
    incrementMinutes: 'Zwiększ minuty',
    decrementMinutes: 'Zmniejsz minuty',
    incrementSeconds: 'Zwiększ sekundy',
    decrementSeconds: 'Zmniejsz sekundy',
    amLabel: 'AM',
    pmLabel: 'PM',
  },
  toast: {
    dismiss: 'Zamknij',
  },
  transferList: {
    sourceLabel: 'Dostępne',
    targetLabel: 'Wybrane',
    controlsLabel: 'Sterowanie przenoszeniem',
    moveSelectedToTarget: 'Przenieś zaznaczone do celu',
    moveAllToTarget: 'Przenieś wszystko do celu',
    moveSelectedToSource: 'Przenieś zaznaczone do źródła',
    moveAllToSource: 'Przenieś wszystko do źródła',
    empty: 'Brak elementów',
    moved: (count, listLabel) => `Przeniesiono ${count} do listy „${listLabel}”`,
  },
  validation: {
    required: 'To pole jest wymagane',
    email: 'Podaj prawidłowy adres e-mail',
    min: min => `Musi wynosić co najmniej ${min}`,
    max: max => `Może wynosić najwyżej ${max}`,
    minlength: length => `Musi mieć co najmniej ${length} znaków`,
    maxlength: length => `Może mieć najwyżej ${length} znaków`,
    pattern: 'Nieprawidłowy format',
    invalid: 'Nieprawidłowa wartość',
  },
  wordmark: {
    overline: 'zaprojektowane przez',
    tagline: 'elegancki projekt stron',
  },
};

export const pl: EagamiLocaleBundle = {
  locale: 'pl',
  messages,
};

import { EagamiMessages } from '../i18n.types';

/** Polish messages. */
export const pl: EagamiMessages = {
  alert: {
    dismiss: 'Zamknij',
  },
  autocomplete: {
    empty: 'Brak wyników',
  },
  avatarEditor: {
    upload: 'Prześlij obraz',
    dropzone: 'Upuść obraz lub kliknij, aby przesłać',
    canvas:
      'Podgląd obrazu, przeciągnij lub użyj strzałek, aby przesunąć, suwaka, aby przybliżyć',
    change: 'Zmień zdjęcie',
    revert: 'Przywróć oryginał',
    zoomOut: 'Pomniejsz',
    zoom: 'Powiększenie',
    zoomIn: 'Powiększ',
    remove: 'Usuń obraz',
  },
  breadcrumbs: {
    label: 'Ścieżka nawigacji',
  },
  codeInput: {
    groupLabel: length => `Kod weryfikacyjny, ${length} cyfr`,
    digitLabel: (index, length) => `Cyfra ${index} z ${length}`,
  },
  colorPicker: {
    placeholder: 'Wybierz kolor…',
    clear: 'Wyczyść kolor',
    hue: 'Barwa',
    saturationAndValue: 'Nasycenie i wartość',
    alpha: 'Alfa',
    eyedropper: 'Pobierz z ekranu',
    presets: 'Predefiniowane',
    toggleFormat: 'Zmień format wprowadzania',
  },
  dataTable: {
    noData: 'Brak dostępnych danych',
  },
  datePicker: {
    placeholder: 'Wybierz datę…',
    clear: 'Wyczyść datę',
    previousYear: 'Poprzedni rok',
    previousMonth: 'Poprzedni miesiąc',
    nextMonth: 'Następny miesiąc',
    nextYear: 'Następny rok',
    today: 'Dzisiaj',
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
  input: {
    showPassword: 'Pokaż hasło',
    hidePassword: 'Ukryj hasło',
  },
  menu: {
    label: 'Menu',
  },
  paginator: {
    label: 'Paginacja',
    rowsPerPage: 'Wierszy na stronę:',
    range: (start, end, total) => `${start}–${end} z ${total}`,
    previousPage: 'Poprzednia strona',
    nextPage: 'Następna strona',
  },
  progressBar: {
    label: 'Postęp',
  },
  spinner: {
    label: 'Ładowanie',
  },
  tag: {
    remove: 'Usuń',
  },
  timePicker: {
    placeholder: 'Wybierz godzinę…',
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
  wordmark: {
    overline: 'ręcznie wykonane przez',
    tagline: 'elegancki projekt stron',
  },
};

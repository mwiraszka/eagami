import type { EagamiLocaleBundle, EagamiMessages } from '../i18n.types';

/** German messages. */
const messages: EagamiMessages = {
  alert: {
    dismiss: 'Schließen',
  },
  autocomplete: {
    empty: 'Keine Ergebnisse',
  },
  avatarEditor: {
    upload: 'Bild hochladen',
    dropzone: 'Bild ablegen oder zum Hochladen klicken',
    canvas:
      'Bildvorschau, ziehen oder Pfeiltasten zum Verschieben verwenden, Schieberegler zum Zoomen',
    canvasInstructions:
      'Pfeiltasten zum Verschieben des Bildes, Plus und Minus zum Zoomen, Eingabetaste oder Leertaste zum Auswählen eines anderen Fotos verwenden',
    change: 'Foto ändern',
    revert: 'Auf Original zurücksetzen',
    zoomOut: 'Verkleinern',
    zoom: 'Zoom',
    zoomIn: 'Vergrößern',
    remove: 'Bild entfernen',
    invalidType: 'Datei muss ein Bild sein',
    tooLarge: (maxMb: number) => `Datei überschreitet das Limit von ${maxMb} MB`,
  },
  breadcrumbs: {
    label: 'Brotkrümelnavigation',
  },
  codeInput: {
    groupLabel: length => `Bestätigungscode, ${length} Ziffern`,
    digitLabel: (index, length) => `Ziffer ${index} von ${length}`,
  },
  commandPalette: {
    dialogLabel: 'Befehlspalette',
    searchPlaceholder: 'Befehl eingeben oder suchen…',
    empty: 'Keine Ergebnisse gefunden',
    clear: 'Suche löschen',
  },
  colorPicker: {
    dialogLabel: 'Farbe wählen',
    placeholder: 'Farbe wählen…',
    clear: 'Farbe löschen',
    hue: 'Farbton',
    saturationAndValue: 'Sättigung und Helligkeit',
    saturationAndValueStatus: (saturation, value) =>
      `Sättigung ${saturation} %, Helligkeit ${value} %`,
    alpha: 'Transparenz',
    eyedropper: 'Vom Bildschirm auswählen',
    presets: 'Voreinstellungen',
    toggleFormat: 'Eingabeformat wechseln',
  },
  dataTable: {
    noData: 'Keine Daten verfügbar',
  },
  numberFormat: {
    decimal: ',',
    group: '.',
    grouping: [3],
  },
  datePicker: {
    placeholder: 'Datum auswählen…',
    dialogLabel: 'Datum wählen',
    clear: 'Datum löschen',
    previousYear: 'Vorheriges Jahr',
    previousMonth: 'Vorheriger Monat',
    nextMonth: 'Nächster Monat',
    nextYear: 'Nächstes Jahr',
    today: 'Heute',
    weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    months: [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ],
  },
  dialog: {
    close: 'Dialog schließen',
  },
  drawer: {
    close: 'Panel schließen',
  },
  dropdown: {
    placeholder: 'Auswählen…',
  },
  fileUploader: {
    prompt: 'Dateien hierher klicken oder ziehen zum Hochladen',
    promptSingle: 'Datei hierher klicken oder ziehen zum Hochladen',
    browse: 'Dateien durchsuchen',
    removeFile: name => `${name} entfernen`,
    fileListLabel: 'Ausgewählte Dateien',
    constraintsAccept: accept => `Akzeptiert: ${accept}`,
    constraintsMaxSize: size => `Max. ${size} pro Datei`,
    constraintsMaxFiles: count => `Bis zu ${count} Dateien`,
    rejectionType: name => `${name} hat einen nicht unterstützten Dateityp`,
    rejectionSize: (name, max) => `${name} überschreitet das Limit von ${max}`,
    rejectionCount: max => `Es können nur ${max} Dateien ausgewählt werden`,
    bytesUnit: { b: 'B', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' },
  },
  input: {
    showPassword: 'Passwort anzeigen',
    hidePassword: 'Passwort verbergen',
    clear: 'Löschen',
  },
  menu: {
    label: 'Menü',
  },
  multiSelect: {
    dialogLabel: 'Optionen wählen',
    placeholder: 'Auswählen…',
    searchPlaceholder: 'Suchen…',
    searchEmpty: 'Keine Treffer',
    selectAll: 'Alle auswählen',
    clearAll: 'Auswahl aufheben',
    removeOption: label => `${label} entfernen`,
    selectedCount: count => `${count} ausgewählt`,
  },
  paginator: {
    label: 'Seitennummerierung',
    rowsPerPage: 'Zeilen pro Seite:',
    range: (start, end, total) => `${start}–${end} von ${total}`,
    previousPage: 'Vorherige Seite',
    nextPage: 'Nächste Seite',
    page: page => `Zu Seite ${page} wechseln`,
  },
  progressBar: {
    label: 'Fortschritt',
  },
  rangeSlider: {
    lowThumbLabel: 'Minimalwert',
    highThumbLabel: 'Maximalwert',
  },
  rating: {
    label: 'Bewertung',
    valueLabel: (value, max) => `${value} von ${max}`,
    clear: 'Bewertung löschen',
  },
  spinner: {
    label: 'Wird geladen',
  },
  stepper: {
    stepsLabel: 'Schritte',
    optional: 'optional',
    stepCompleted: 'abgeschlossen',
  },
  tag: {
    remove: 'Entfernen',
  },
  timePicker: {
    placeholder: 'Uhrzeit auswählen…',
    dialogLabel: 'Uhrzeit wählen',
    clear: 'Uhrzeit löschen',
    hoursLabel: 'Stunden',
    minutesLabel: 'Minuten',
    secondsLabel: 'Sekunden',
    incrementHours: 'Stunden erhöhen',
    decrementHours: 'Stunden verringern',
    incrementMinutes: 'Minuten erhöhen',
    decrementMinutes: 'Minuten verringern',
    incrementSeconds: 'Sekunden erhöhen',
    decrementSeconds: 'Sekunden verringern',
    amLabel: 'AM',
    pmLabel: 'PM',
  },
  toast: {
    dismiss: 'Schließen',
  },
  transferList: {
    sourceLabel: 'Verfügbar',
    targetLabel: 'Ausgewählt',
    controlsLabel: 'Übertragungssteuerung',
    moveSelectedToTarget: 'Ausgewählte nach rechts verschieben',
    moveAllToTarget: 'Alle nach rechts verschieben',
    moveSelectedToSource: 'Ausgewählte nach links verschieben',
    moveAllToSource: 'Alle nach links verschieben',
    empty: 'Keine Einträge',
    moved: (count, listLabel) => `${count} nach ${listLabel} verschoben`,
  },
  validation: {
    required: 'Dieses Feld ist erforderlich',
    email: 'Gültige E-Mail-Adresse eingeben',
    min: min => `Muss mindestens ${min} sein`,
    max: max => `Darf höchstens ${max} sein`,
    minlength: length => `Muss mindestens ${length} Zeichen lang sein`,
    maxlength: length => `Darf höchstens ${length} Zeichen lang sein`,
    pattern: 'Ungültiges Format',
    invalid: 'Ungültiger Wert',
  },
  wordmark: {
    overline: 'gestaltet von',
    tagline: 'elegantes Webdesign',
  },
};

export const de: EagamiLocaleBundle = {
  locale: 'de',
  messages,
};

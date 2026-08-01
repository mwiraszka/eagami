import type { EagamiLocaleBundle, EagamiMessages } from '../i18n.types';

/** Dutch messages. */
const messages: EagamiMessages = {
  alert: {
    dismiss: 'Sluiten',
  },
  autocomplete: {
    empty: 'Geen resultaten',
  },
  avatarEditor: {
    upload: 'Afbeelding uploaden',
    dropzone: 'Sleep een afbeelding hierheen of klik om te uploaden',
    canvas:
      'Voorbeeld van afbeelding, sleep of gebruik de pijltjestoetsen om te verplaatsen, schuifregelaar om te zoomen',
    canvasInstructions:
      'Gebruik de pijltjestoetsen om de afbeelding te verplaatsen, plus en min om te zoomen, en Enter of de spatiebalk om een andere foto te kiezen',
    change: 'Foto wijzigen',
    revert: 'Terug naar origineel',
    zoomOut: 'Uitzoomen',
    zoom: 'Zoom',
    zoomIn: 'Inzoomen',
    remove: 'Afbeelding verwijderen',
    invalidType: 'Bestand moet een afbeelding zijn',
    tooLarge: (maxMb: number) => `Bestand overschrijdt de limiet van ${maxMb} MB`,
  },
  breadcrumbs: {
    label: 'Broodkruimelnavigatie',
  },
  codeInput: {
    groupLabel: length => `Verificatiecode, ${length} cijfers`,
    digitLabel: (index, length) => `Cijfer ${index} van ${length}`,
  },
  commandPalette: {
    dialogLabel: 'Opdrachtenpalet',
    searchPlaceholder: 'Typ een opdracht of zoek…',
    empty: 'Geen resultaten gevonden',
    clear: 'Zoekopdracht wissen',
  },
  colorPicker: {
    dialogLabel: 'Kleur kiezen',
    placeholder: 'Kies een kleur…',
    clear: 'Kleur wissen',
    hue: 'Tint',
    saturationAndValue: 'Verzadiging en helderheid',
    saturationAndValueStatus: (saturation, value) =>
      `Verzadiging ${saturation}%, helderheid ${value}%`,
    alpha: 'Transparantie',
    eyedropper: 'Kies van het scherm',
    presets: 'Voorinstellingen',
    toggleFormat: 'Invoerformaat wisselen',
  },
  dataTable: {
    noData: 'Geen gegevens beschikbaar',
  },
  numberFormat: {
    decimal: ',',
    group: '.',
    grouping: [3],
  },
  datePicker: {
    placeholder: 'Selecteer datum…',
    dialogLabel: 'Datum kiezen',
    clear: 'Datum wissen',
    previousYear: 'Vorig jaar',
    previousMonth: 'Vorige maand',
    nextMonth: 'Volgende maand',
    nextYear: 'Volgend jaar',
    today: 'Vandaag',
    weekdaysShort: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
    months: [
      'januari',
      'februari',
      'maart',
      'april',
      'mei',
      'juni',
      'juli',
      'augustus',
      'september',
      'oktober',
      'november',
      'december',
    ],
  },
  dialog: {
    close: 'Dialoogvenster sluiten',
  },
  drawer: {
    close: 'Paneel sluiten',
  },
  dropdown: {
    placeholder: 'Selecteer…',
  },
  fileUploader: {
    prompt: 'Klik of sleep bestanden hierheen om te uploaden',
    promptSingle: 'Klik of sleep een bestand hierheen om te uploaden',
    browse: 'Bestanden doorbladeren',
    removeFile: name => `${name} verwijderen`,
    fileListLabel: 'Geselecteerde bestanden',
    constraintsAccept: accept => `Geaccepteerd: ${accept}`,
    constraintsMaxSize: size => `Max. ${size} per bestand`,
    constraintsMaxFiles: count => `Tot ${count} bestanden`,
    rejectionType: name => `${name} heeft een niet-ondersteund bestandstype`,
    rejectionSize: (name, max) => `${name} overschrijdt de limiet van ${max}`,
    rejectionCount: max => `Er kunnen slechts ${max} bestanden worden geselecteerd`,
    bytesUnit: { b: 'B', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' },
  },
  input: {
    showPassword: 'Wachtwoord tonen',
    hidePassword: 'Wachtwoord verbergen',
    clear: 'Wissen',
  },
  numberInput: {
    increment: 'Verhogen',
    decrement: 'Verlagen',
  },
  menu: {
    label: 'Menu',
  },
  multiSelect: {
    dialogLabel: 'Opties kiezen',
    placeholder: 'Selecteer…',
    searchPlaceholder: 'Zoeken…',
    searchEmpty: 'Geen overeenkomsten',
    selectAll: 'Alles selecteren',
    clearAll: 'Selectie wissen',
    removeOption: label => `${label} verwijderen`,
    selectedCount: count => `${count} geselecteerd`,
  },
  paginator: {
    label: 'Paginering',
    rowsPerPage: 'Rijen per pagina:',
    range: (start, end, total) => `${start}–${end} van ${total}`,
    previousPage: 'Vorige pagina',
    nextPage: 'Volgende pagina',
    page: page => `Ga naar pagina ${page}`,
  },
  progressBar: {
    label: 'Voortgang',
  },
  rangeSlider: {
    lowThumbLabel: 'Minimumwaarde',
    highThumbLabel: 'Maximumwaarde',
  },
  rating: {
    label: 'Beoordeling',
    valueLabel: (value, max) => `${value} van ${max}`,
    clear: 'Beoordeling wissen',
  },
  spinner: {
    label: 'Laden',
  },
  stepper: {
    stepsLabel: 'Stappen',
    optional: 'optioneel',
    stepCompleted: 'voltooid',
  },
  tag: {
    remove: 'Verwijderen',
  },
  timePicker: {
    placeholder: 'Selecteer tijd…',
    dialogLabel: 'Tijd kiezen',
    clear: 'Tijd wissen',
    hoursLabel: 'Uren',
    minutesLabel: 'Minuten',
    secondsLabel: 'Seconden',
    incrementHours: 'Uren verhogen',
    decrementHours: 'Uren verlagen',
    incrementMinutes: 'Minuten verhogen',
    decrementMinutes: 'Minuten verlagen',
    incrementSeconds: 'Seconden verhogen',
    decrementSeconds: 'Seconden verlagen',
    amLabel: 'AM',
    pmLabel: 'PM',
  },
  toast: {
    dismiss: 'Sluiten',
  },
  transferList: {
    sourceLabel: 'Beschikbaar',
    targetLabel: 'Geselecteerd',
    controlsLabel: 'Overdrachtsbediening',
    moveSelectedToTarget: 'Selectie naar rechts verplaatsen',
    moveAllToTarget: 'Alles naar rechts verplaatsen',
    moveSelectedToSource: 'Selectie naar links verplaatsen',
    moveAllToSource: 'Alles naar links verplaatsen',
    empty: 'Geen items',
    moved: (count, listLabel) => `${count} verplaatst naar ${listLabel}`,
  },
  validation: {
    required: 'Dit veld is verplicht',
    email: 'Voer een geldig e-mailadres in',
    min: min => `Moet minimaal ${min} zijn`,
    max: max => `Mag maximaal ${max} zijn`,
    minlength: length => `Moet minimaal ${length} tekens bevatten`,
    maxlength: length => `Mag maximaal ${length} tekens bevatten`,
    pattern: 'Ongeldige indeling',
    invalid: 'Ongeldige waarde',
  },
  wordmark: {
    overline: 'ontworpen door',
    tagline: 'elegant webontwerp',
  },
};

export const nl: EagamiLocaleBundle = {
  locale: 'nl',
  messages,
};

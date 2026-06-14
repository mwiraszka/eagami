import type { EagamiMessages } from '../i18n.types';

/** Dutch messages. */
export const nl: EagamiMessages = {
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
    change: 'Foto wijzigen',
    revert: 'Terug naar origineel',
    zoomOut: 'Uitzoomen',
    zoom: 'Zoom',
    zoomIn: 'Inzoomen',
    remove: 'Afbeelding verwijderen',
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
    placeholder: 'Kies een kleur…',
    clear: 'Kleur wissen',
    hue: 'Tint',
    saturationAndValue: 'Verzadiging en helderheid',
    alpha: 'Transparantie',
    eyedropper: 'Kies van het scherm',
    presets: 'Voorinstellingen',
    toggleFormat: 'Invoerformaat wisselen',
  },
  dataTable: {
    noData: 'Geen gegevens beschikbaar',
  },
  datePicker: {
    placeholder: 'Selecteer datum…',
    clear: 'Datum wissen',
    previousYear: 'Vorig jaar',
    previousMonth: 'Vorige maand',
    nextMonth: 'Volgende maand',
    nextYear: 'Volgend jaar',
    today: 'Vandaag',
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
  menu: {
    label: 'Menu',
  },
  multiSelect: {
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
  },
  progressBar: {
    label: 'Voortgang',
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
    optional: 'optioneel',
  },
  tag: {
    remove: 'Verwijderen',
  },
  timePicker: {
    placeholder: 'Selecteer tijd…',
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
  },
  tree: {
    expand: 'Uitvouwen',
    collapse: 'Invouwen',
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
    overline: 'handgemaakt door',
    tagline: 'elegant webontwerp',
  },
};

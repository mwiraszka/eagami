import { EagamiMessages } from '../i18n.types';

/** Greek messages. */
export const el: EagamiMessages = {
  alert: {
    dismiss: 'Απόρριψη',
  },
  autocomplete: {
    empty: 'Δεν υπάρχουν αποτελέσματα',
  },
  avatarEditor: {
    upload: 'Μεταφόρτωση εικόνας',
    dropzone: 'Αποθέστε μια εικόνα ή κάντε κλικ για μεταφόρτωση',
    canvas:
      'Προεπισκόπηση εικόνας, σύρετε ή χρησιμοποιήστε τα βέλη για μετακίνηση, το ρυθμιστικό για ζουμ',
    change: 'Αλλαγή φωτογραφίας',
    revert: 'Επαναφορά στο αρχικό',
    zoomOut: 'Σμίκρυνση',
    zoom: 'Ζουμ',
    zoomIn: 'Μεγέθυνση',
    remove: 'Αφαίρεση εικόνας',
  },
  breadcrumbs: {
    label: 'Διαδρομή πλοήγησης',
  },
  codeInput: {
    groupLabel: length => `Κωδικός επαλήθευσης, ${length} ψηφία`,
    digitLabel: (index, length) => `Ψηφίο ${index} από ${length}`,
  },
  colorPicker: {
    placeholder: 'Επιλέξτε χρώμα…',
    clear: 'Εκκαθάριση χρώματος',
    hue: 'Απόχρωση',
    saturationAndValue: 'Κορεσμός και τιμή',
    alpha: 'Άλφα',
    eyedropper: 'Επιλογή από οθόνη',
    presets: 'Προεπιλογές',
    toggleFormat: 'Αλλαγή μορφής εισαγωγής',
  },
  dataTable: {
    noData: 'Δεν υπάρχουν διαθέσιμα δεδομένα',
  },
  datePicker: {
    placeholder: 'Επιλέξτε ημερομηνία…',
    clear: 'Εκκαθάριση ημερομηνίας',
    previousYear: 'Προηγούμενο έτος',
    previousMonth: 'Προηγούμενος μήνας',
    nextMonth: 'Επόμενος μήνας',
    nextYear: 'Επόμενο έτος',
    today: 'Σήμερα',
  },
  dialog: {
    close: 'Κλείσιμο παραθύρου διαλόγου',
  },
  drawer: {
    close: 'Κλείσιμο πίνακα',
  },
  dropdown: {
    placeholder: 'Επιλέξτε…',
  },
  fileUploader: {
    prompt: 'Κάντε κλικ ή σύρετε αρχεία εδώ για μεταφόρτωση',
    promptSingle: 'Κάντε κλικ ή σύρετε ένα αρχείο εδώ για μεταφόρτωση',
    browse: 'Περιήγηση αρχείων',
    removeFile: name => `Αφαίρεση ${name}`,
    fileListLabel: 'Επιλεγμένα αρχεία',
    constraintsAccept: accept => `Αποδεκτά: ${accept}`,
    constraintsMaxSize: size => `Μέγ. ${size} ανά αρχείο`,
    constraintsMaxFiles: count => `Έως ${count} αρχεία`,
    rejectionType: name => `Το ${name} έχει μη υποστηριζόμενο τύπο αρχείου`,
    rejectionSize: (name, max) => `Το ${name} υπερβαίνει το όριο των ${max}`,
    rejectionCount: max => `Μπορούν να επιλεγούν μόνο ${max} αρχεία`,
    bytesUnit: { b: 'B', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' },
  },
  input: {
    showPassword: 'Εμφάνιση κωδικού πρόσβασης',
    hidePassword: 'Απόκρυψη κωδικού πρόσβασης',
  },
  menu: {
    label: 'Μενού',
  },
  multiSelect: {
    placeholder: 'Επιλέξτε…',
    searchPlaceholder: 'Αναζήτηση…',
    searchEmpty: 'Δεν βρέθηκαν αποτελέσματα',
    selectAll: 'Επιλογή όλων',
    clearAll: 'Εκκαθάριση επιλογής',
    removeOption: label => `Αφαίρεση ${label}`,
    selectedCount: count => `${count} επιλεγμέν${count === 1 ? 'ο' : 'α'}`,
  },
  paginator: {
    label: 'Σελιδοποίηση',
    rowsPerPage: 'Γραμμές ανά σελίδα:',
    range: (start, end, total) => `${start}–${end} από ${total}`,
    previousPage: 'Προηγούμενη σελίδα',
    nextPage: 'Επόμενη σελίδα',
  },
  progressBar: {
    label: 'Πρόοδος',
  },
  rating: {
    label: 'Αξιολόγηση',
    valueLabel: (value, max) => `${value} από ${max}`,
    clear: 'Εκκαθάριση αξιολόγησης',
  },
  spinner: {
    label: 'Φόρτωση',
  },
  stepper: {
    optional: 'προαιρετικό',
  },
  tag: {
    remove: 'Αφαίρεση',
  },
  timePicker: {
    placeholder: 'Επιλογή ώρας…',
    clear: 'Καθαρισμός ώρας',
    hoursLabel: 'Ώρες',
    minutesLabel: 'Λεπτά',
    secondsLabel: 'Δευτερόλεπτα',
    incrementHours: 'Αύξηση ωρών',
    decrementHours: 'Μείωση ωρών',
    incrementMinutes: 'Αύξηση λεπτών',
    decrementMinutes: 'Μείωση λεπτών',
    incrementSeconds: 'Αύξηση δευτερολέπτων',
    decrementSeconds: 'Μείωση δευτερολέπτων',
    amLabel: 'πμ',
    pmLabel: 'μμ',
  },
  toast: {
    dismiss: 'Απόρριψη',
  },
  wordmark: {
    overline: 'φτιαγμένο με μεράκι από',
    tagline: 'κομψός σχεδιασμός ιστού',
  },
};

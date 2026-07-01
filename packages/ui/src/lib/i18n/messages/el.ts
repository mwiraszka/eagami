import type { EagamiLocaleBundle, EagamiMessages } from '../i18n.types';

/** Greek messages. */
const messages: EagamiMessages = {
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
    invalidType: 'Το αρχείο πρέπει να είναι εικόνα',
    tooLarge: (maxMb: number) => `Το αρχείο υπερβαίνει το όριο των ${maxMb} MB`,
  },
  breadcrumbs: {
    label: 'Διαδρομή πλοήγησης',
  },
  codeInput: {
    groupLabel: length => `Κωδικός επαλήθευσης, ${length} ψηφία`,
    digitLabel: (index, length) => `Ψηφίο ${index} από ${length}`,
  },
  commandPalette: {
    dialogLabel: 'Παλέτα εντολών',
    searchPlaceholder: 'Πληκτρολογήστε εντολή ή αναζητήστε…',
    empty: 'Δεν βρέθηκαν αποτελέσματα',
    clear: 'Εκκαθάριση αναζήτησης',
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
    clear: 'Καθαρισμός',
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
  transferList: {
    sourceLabel: 'Διαθέσιμα',
    targetLabel: 'Επιλεγμένα',
    controlsLabel: 'Έλεγχοι μεταφοράς',
    moveSelectedToTarget: 'Μεταφορά επιλογής στον στόχο',
    moveAllToTarget: 'Μεταφορά όλων στον στόχο',
    moveSelectedToSource: 'Μεταφορά επιλογής στην πηγή',
    moveAllToSource: 'Μεταφορά όλων στην πηγή',
    empty: 'Καμία εγγραφή',
  },
  tree: {
    expand: 'Ανάπτυξη',
    collapse: 'Σύμπτυξη',
  },
  validation: {
    required: 'Αυτό το πεδίο είναι υποχρεωτικό',
    email: 'Εισαγάγετε έγκυρη διεύθυνση email',
    min: min => `Πρέπει να είναι τουλάχιστον ${min}`,
    max: max => `Πρέπει να είναι το πολύ ${max}`,
    minlength: length => `Πρέπει να έχει τουλάχιστον ${length} χαρακτήρες`,
    maxlength: length => `Πρέπει να έχει το πολύ ${length} χαρακτήρες`,
    pattern: 'Μη έγκυρη μορφή',
    invalid: 'Μη έγκυρη τιμή',
  },
  wordmark: {
    overline: 'φτιαγμένο με μεράκι από',
    tagline: 'κομψός σχεδιασμός ιστού',
  },
};

export const el: EagamiLocaleBundle = {
  locale: 'el',
  messages,
};

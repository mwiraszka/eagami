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
  input: {
    showPassword: 'Εμφάνιση κωδικού πρόσβασης',
    hidePassword: 'Απόκρυψη κωδικού πρόσβασης',
  },
  menu: {
    label: 'Μενού',
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
  spinner: {
    label: 'Φόρτωση',
  },
  tag: {
    remove: 'Αφαίρεση',
  },
  toast: {
    dismiss: 'Απόρριψη',
  },
  wordmark: {
    overline: 'φτιαγμένο με μεράκι από',
    tagline: 'κομψός σχεδιασμός ιστού',
  },
};

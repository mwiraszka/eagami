import type { EagamiLocaleBundle, EagamiMessages } from '../i18n.types';

/** Hindi messages. */
const messages: EagamiMessages = {
  alert: {
    dismiss: 'खारिज करें',
  },
  autocomplete: {
    empty: 'कोई परिणाम नहीं',
  },
  avatarEditor: {
    upload: 'छवि अपलोड करें',
    dropzone: 'छवि छोड़ें या अपलोड करने के लिए क्लिक करें',
    canvas:
      'छवि पूर्वावलोकन, पैन करने के लिए खींचें या तीर कुंजियों का उपयोग करें, ज़ूम के लिए स्लाइडर',
    canvasInstructions:
      'छवि को हिलाने के लिए तीर कुंजियों का उपयोग करें, ज़ूम के लिए प्लस और माइनस, और दूसरी फ़ोटो चुनने के लिए Enter या Space दबाएं',
    change: 'फ़ोटो बदलें',
    revert: 'मूल पर वापस लौटें',
    zoomOut: 'ज़ूम आउट',
    zoom: 'ज़ूम',
    zoomIn: 'ज़ूम इन',
    remove: 'छवि हटाएं',
    invalidType: 'फ़ाइल एक छवि होनी चाहिए',
    tooLarge: (maxMb: number) => `फ़ाइल ${maxMb} MB की सीमा से अधिक है`,
  },
  breadcrumbs: {
    label: 'ब्रेडक्रंब',
  },
  codeInput: {
    groupLabel: length => `सत्यापन कोड, ${length} अंक`,
    digitLabel: (index, length) => `${length} में से अंक ${index}`,
  },
  commandPalette: {
    dialogLabel: 'कमांड पैलेट',
    searchPlaceholder: 'कमांड टाइप करें या खोजें…',
    empty: 'कोई परिणाम नहीं मिला',
    clear: 'खोज साफ़ करें',
  },
  colorPicker: {
    placeholder: 'रंग चुनें…',
    clear: 'रंग साफ़ करें',
    hue: 'रंगत',
    saturationAndValue: 'संतृप्ति और मान',
    saturationAndValueStatus: (saturation, value) =>
      `संतृप्ति ${saturation}%, चमक ${value}%`,
    alpha: 'अल्फ़ा',
    eyedropper: 'स्क्रीन से चुनें',
    presets: 'प्रीसेट',
    toggleFormat: 'इनपुट प्रारूप बदलें',
  },
  dataTable: {
    noData: 'कोई डेटा उपलब्ध नहीं',
  },
  numberFormat: {
    decimal: '.',
    group: ',',
    grouping: [3, 2],
  },
  datePicker: {
    placeholder: 'तारीख चुनें…',
    dialogLabel: 'तारीख चुनें',
    clear: 'तारीख साफ़ करें',
    previousYear: 'पिछला वर्ष',
    previousMonth: 'पिछला महीना',
    nextMonth: 'अगला महीना',
    nextYear: 'अगला वर्ष',
    today: 'आज',
    weekdaysShort: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
    months: [
      'जनवरी',
      'फ़रवरी',
      'मार्च',
      'अप्रैल',
      'मई',
      'जून',
      'जुलाई',
      'अगस्त',
      'सितंबर',
      'अक्टूबर',
      'नवंबर',
      'दिसंबर',
    ],
  },
  dialog: {
    close: 'संवाद बंद करें',
  },
  drawer: {
    close: 'पैनल बंद करें',
  },
  dropdown: {
    placeholder: 'चुनें…',
  },
  fileUploader: {
    prompt: 'अपलोड करने के लिए फ़ाइलें यहाँ क्लिक करें या खींचें',
    promptSingle: 'अपलोड करने के लिए फ़ाइल यहाँ क्लिक करें या खींचें',
    browse: 'फ़ाइलें ब्राउज़ करें',
    removeFile: name => `${name} हटाएं`,
    fileListLabel: 'चयनित फ़ाइलें',
    constraintsAccept: accept => `स्वीकृत: ${accept}`,
    constraintsMaxSize: size => `प्रति फ़ाइल अधिकतम ${size}`,
    constraintsMaxFiles: count => `${count} फ़ाइलों तक`,
    rejectionType: name => `${name} एक असमर्थित फ़ाइल प्रकार है`,
    rejectionSize: (name, max) => `${name} ${max} की सीमा से अधिक है`,
    rejectionCount: max => `केवल ${max} फ़ाइलें चुनी जा सकती हैं`,
    bytesUnit: { b: 'B', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' },
  },
  input: {
    showPassword: 'पासवर्ड दिखाएं',
    hidePassword: 'पासवर्ड छिपाएं',
    clear: 'साफ़ करें',
  },
  numberInput: {
    increment: 'बढ़ाएँ',
    decrement: 'घटाएँ',
  },
  menu: {
    label: 'मेनू',
  },
  multiSelect: {
    placeholder: 'चुनें…',
    searchPlaceholder: 'खोजें…',
    searchEmpty: 'कोई मिलान नहीं',
    selectAll: 'सभी चुनें',
    clearAll: 'चयन साफ़ करें',
    removeOption: label => `${label} हटाएं`,
    selectedCount: count => `${count} चयनित`,
  },
  paginator: {
    label: 'पृष्ठ क्रमांकन',
    rowsPerPage: 'प्रति पृष्ठ पंक्तियाँ:',
    range: (start, end, total) => `${total} में से ${start}–${end}`,
    previousPage: 'पिछला पृष्ठ',
    nextPage: 'अगला पृष्ठ',
  },
  progressBar: {
    label: 'प्रगति',
  },
  rangeSlider: {
    lowThumbLabel: 'न्यूनतम मान',
    highThumbLabel: 'अधिकतम मान',
  },
  rating: {
    label: 'रेटिंग',
    valueLabel: (value, max) => `${max} में से ${value}`,
    clear: 'रेटिंग साफ़ करें',
  },
  spinner: {
    label: 'लोड हो रहा है',
  },
  stepper: {
    stepsLabel: 'चरण',
    optional: 'वैकल्पिक',
    stepCompleted: 'पूर्ण',
  },
  tag: {
    remove: 'हटाएं',
  },
  timePicker: {
    placeholder: 'समय चुनें…',
    dialogLabel: 'समय चुनें',
    clear: 'समय साफ़ करें',
    hoursLabel: 'घंटे',
    minutesLabel: 'मिनट',
    secondsLabel: 'सेकंड',
    incrementHours: 'घंटे बढ़ाएं',
    decrementHours: 'घंटे घटाएं',
    incrementMinutes: 'मिनट बढ़ाएं',
    decrementMinutes: 'मिनट घटाएं',
    incrementSeconds: 'सेकंड बढ़ाएं',
    decrementSeconds: 'सेकंड घटाएं',
    amLabel: 'AM',
    pmLabel: 'PM',
  },
  toast: {
    dismiss: 'खारिज करें',
  },
  transferList: {
    sourceLabel: 'उपलब्ध',
    targetLabel: 'चयनित',
    controlsLabel: 'स्थानांतरण नियंत्रण',
    moveSelectedToTarget: 'चयनित को लक्ष्य में ले जाएं',
    moveAllToTarget: 'सभी को लक्ष्य में ले जाएं',
    moveSelectedToSource: 'चयनित को स्रोत में ले जाएं',
    moveAllToSource: 'सभी को स्रोत में ले जाएं',
    empty: 'कोई आइटम नहीं',
  },
  validation: {
    required: 'यह फ़ील्ड आवश्यक है',
    email: 'एक मान्य ईमेल पता दर्ज करें',
    min: min => `कम से कम ${min} होना चाहिए`,
    max: max => `अधिकतम ${max} होना चाहिए`,
    minlength: length => `कम से कम ${length} अक्षर होने चाहिए`,
    maxlength: length => `अधिकतम ${length} अक्षर होने चाहिए`,
    pattern: 'अमान्य प्रारूप',
    invalid: 'अमान्य मान',
  },
  wordmark: {
    overline: 'हस्तनिर्मित द्वारा',
    tagline: 'सुरुचिपूर्ण वेब डिज़ाइन',
  },
};

export const hi: EagamiLocaleBundle = {
  locale: 'hi',
  messages,
};

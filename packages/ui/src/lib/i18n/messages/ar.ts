import type { EagamiLocaleBundle, EagamiMessages } from '../i18n.types';

/** Arabic messages. */
const messages: EagamiMessages = {
  alert: {
    dismiss: 'إغلاق',
  },
  autocomplete: {
    empty: 'لا توجد نتائج',
  },
  avatarEditor: {
    upload: 'تحميل صورة',
    dropzone: 'أفلت الصورة أو انقر للتحميل',
    canvas: 'معاينة الصورة، اسحب أو استخدم مفاتيح الأسهم للتحريك، وشريط التمرير للتكبير',
    canvasInstructions:
      'استخدم مفاتيح الأسهم لتحريك الصورة، وعلامتي الزائد والناقص للتكبير والتصغير، وEnter أو المسافة لاختيار صورة أخرى',
    change: 'تغيير الصورة',
    revert: 'استعادة الأصل',
    zoomOut: 'تصغير',
    zoom: 'تكبير/تصغير',
    zoomIn: 'تكبير',
    remove: 'إزالة الصورة',
    invalidType: 'يجب أن يكون الملف صورة',
    tooLarge: (maxMb: number) => `الملف يتجاوز حد ${maxMb} MB`,
  },
  breadcrumbs: {
    label: 'مسار التنقل',
  },
  codeInput: {
    groupLabel: length => `رمز التحقق، ${length} أرقام`,
    digitLabel: (index, length) => `الرقم ${index} من ${length}`,
  },
  commandPalette: {
    dialogLabel: 'لوحة الأوامر',
    searchPlaceholder: 'اكتب أمرًا أو ابحث…',
    empty: 'لم يتم العثور على نتائج',
    clear: 'مسح البحث',
  },
  colorPicker: {
    placeholder: 'اختر لونًا…',
    clear: 'مسح اللون',
    hue: 'تدرج اللون',
    saturationAndValue: 'التشبع والقيمة',
    saturationAndValueStatus: (saturation, value) =>
      `التشبع ${saturation}%، السطوع ${value}%`,
    alpha: 'الشفافية',
    eyedropper: 'الاختيار من الشاشة',
    presets: 'الإعدادات المسبقة',
    toggleFormat: 'تبديل تنسيق الإدخال',
  },
  dataTable: {
    noData: 'لا توجد بيانات متاحة',
  },
  numberFormat: {
    decimal: '.',
    group: ',',
    grouping: [3],
  },
  datePicker: {
    placeholder: 'اختر التاريخ…',
    dialogLabel: 'اختيار التاريخ',
    clear: 'مسح التاريخ',
    previousYear: 'السنة السابقة',
    previousMonth: 'الشهر السابق',
    nextMonth: 'الشهر التالي',
    nextYear: 'السنة التالية',
    today: 'اليوم',
    weekdaysShort: [
      'الأحد',
      'الاثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
      'السبت',
    ],
    months: [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ],
  },
  dialog: {
    close: 'إغلاق مربع الحوار',
  },
  drawer: {
    close: 'إغلاق اللوحة',
  },
  dropdown: {
    placeholder: 'اختر…',
  },
  fileUploader: {
    prompt: 'انقر أو اسحب الملفات هنا للتحميل',
    promptSingle: 'انقر أو اسحب ملفًا هنا للتحميل',
    browse: 'تصفح الملفات',
    removeFile: name => `إزالة ${name}`,
    fileListLabel: 'الملفات المحددة',
    constraintsAccept: accept => `المقبول: ${accept}`,
    constraintsMaxSize: size => `الحد الأقصى ${size} لكل ملف`,
    constraintsMaxFiles: count => `حتى ${count} ملفات`,
    rejectionType: name => `${name} من نوع ملف غير مدعوم`,
    rejectionSize: (name, max) => `${name} يتجاوز الحد ${max}`,
    rejectionCount: max => `يمكن تحديد ${max} ملفات فقط`,
    bytesUnit: { b: 'B', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' },
  },
  input: {
    showPassword: 'إظهار كلمة المرور',
    hidePassword: 'إخفاء كلمة المرور',
    clear: 'مسح',
  },
  menu: {
    label: 'القائمة',
  },
  multiSelect: {
    placeholder: 'اختر…',
    searchPlaceholder: 'بحث…',
    searchEmpty: 'لا توجد مطابقات',
    selectAll: 'تحديد الكل',
    clearAll: 'مسح التحديد',
    removeOption: label => `إزالة ${label}`,
    selectedCount: count => `${count} محدد`,
  },
  paginator: {
    label: 'ترقيم الصفحات',
    rowsPerPage: 'الصفوف لكل صفحة:',
    range: (start, end, total) => `${start}–${end} من ${total}`,
    previousPage: 'الصفحة السابقة',
    nextPage: 'الصفحة التالية',
  },
  progressBar: {
    label: 'التقدم',
  },
  rangeSlider: {
    lowThumbLabel: 'القيمة الدنيا',
    highThumbLabel: 'القيمة القصوى',
  },
  rating: {
    label: 'التقييم',
    valueLabel: (value, max) => `${value} من ${max}`,
    clear: 'مسح التقييم',
  },
  spinner: {
    label: 'جارٍ التحميل',
  },
  stepper: {
    stepsLabel: 'الخطوات',
    optional: 'اختياري',
    stepCompleted: 'مكتملة',
  },
  tag: {
    remove: 'إزالة',
  },
  timePicker: {
    placeholder: 'اختر الوقت…',
    dialogLabel: 'اختيار الوقت',
    clear: 'مسح الوقت',
    hoursLabel: 'الساعات',
    minutesLabel: 'الدقائق',
    secondsLabel: 'الثواني',
    incrementHours: 'زيادة الساعات',
    decrementHours: 'إنقاص الساعات',
    incrementMinutes: 'زيادة الدقائق',
    decrementMinutes: 'إنقاص الدقائق',
    incrementSeconds: 'زيادة الثواني',
    decrementSeconds: 'إنقاص الثواني',
    amLabel: 'ص',
    pmLabel: 'م',
  },
  toast: {
    dismiss: 'إغلاق',
  },
  transferList: {
    sourceLabel: 'المتاح',
    targetLabel: 'المحدد',
    controlsLabel: 'عناصr التحكم بالنقل',
    moveSelectedToTarget: 'نقل المحدد إلى اليمين',
    moveAllToTarget: 'نقل الكل إلى اليمين',
    moveSelectedToSource: 'نقل المحدد إلى اليسار',
    moveAllToSource: 'نقل الكل إلى اليسار',
    empty: 'لا توجد عناصر',
  },
  tree: {
    expand: 'توسيع',
    collapse: 'طي',
  },
  validation: {
    required: 'هذا الحقل مطلوب',
    email: 'أدخل عنوان بريد إلكتروني صالحًا',
    min: min => `يجب أن يكون ${min} على الأقل`,
    max: max => `يجب أن يكون ${max} على الأكثر`,
    minlength: length => `يجب أن يحتوي على ${length} حرفًا على الأقل`,
    maxlength: length => `يجب أن يحتوي على ${length} حرفًا على الأكثر`,
    pattern: 'تنسيق غير صالح',
    invalid: 'قيمة غير صالحة',
  },
  wordmark: {
    overline: 'صناعة يدوية من',
    tagline: 'تصميم ويب أنيق',
  },
};

export const ar: EagamiLocaleBundle = {
  locale: 'ar',
  messages,
};

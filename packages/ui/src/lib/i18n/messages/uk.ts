import type { EagamiLocaleBundle, EagamiMessages } from '../i18n.types';

/** Ukrainian messages. */
const messages: EagamiMessages = {
  alert: {
    dismiss: 'Закрити',
  },
  autocomplete: {
    empty: 'Немає результатів',
  },
  avatarEditor: {
    upload: 'Завантажити зображення',
    dropzone: 'Перетягніть зображення або натисніть, щоб завантажити',
    canvas:
      'Попередній перегляд зображення, перетягуйте або використовуйте стрілки для переміщення, повзунок для масштабування',
    change: 'Змінити фото',
    revert: 'Повернути до оригіналу',
    zoomOut: 'Зменшити',
    zoom: 'Масштаб',
    zoomIn: 'Збільшити',
    remove: 'Видалити зображення',
    invalidType: 'Файл має бути зображенням',
    tooLarge: (maxMb: number) => `Файл перевищує ліміт ${maxMb} MB`,
  },
  breadcrumbs: {
    label: 'Навігаційний ланцюжок',
  },
  codeInput: {
    groupLabel: length => `Код підтвердження, ${length} цифр`,
    digitLabel: (index, length) => `Цифра ${index} з ${length}`,
  },
  commandPalette: {
    dialogLabel: 'Палітра команд',
    searchPlaceholder: 'Введіть команду або шукайте…',
    empty: 'Нічого не знайдено',
    clear: 'Очистити пошук',
  },
  colorPicker: {
    placeholder: 'Виберіть колір…',
    clear: 'Очистити колір',
    hue: 'Відтінок',
    saturationAndValue: 'Насиченість і яскравість',
    alpha: 'Прозорість',
    eyedropper: 'Вибрати з екрана',
    presets: 'Шаблони',
    toggleFormat: 'Змінити формат вводу',
  },
  dataTable: {
    noData: 'Дані відсутні',
  },
  datePicker: {
    placeholder: 'Виберіть дату…',
    clear: 'Очистити дату',
    previousYear: 'Попередній рік',
    previousMonth: 'Попередній місяць',
    nextMonth: 'Наступний місяць',
    nextYear: 'Наступний рік',
    today: 'Сьогодні',
  },
  dialog: {
    close: 'Закрити діалог',
  },
  drawer: {
    close: 'Закрити панель',
  },
  dropdown: {
    placeholder: 'Виберіть…',
  },
  fileUploader: {
    prompt: 'Натисніть або перетягніть файли сюди для завантаження',
    promptSingle: 'Натисніть або перетягніть файл сюди для завантаження',
    browse: 'Огляд файлів',
    removeFile: name => `Видалити ${name}`,
    fileListLabel: 'Вибрані файли',
    constraintsAccept: accept => `Дозволено: ${accept}`,
    constraintsMaxSize: size => `Не більше ${size} на файл`,
    constraintsMaxFiles: count => `До ${count} файлів`,
    rejectionType: name => `${name} має непідтримуваний тип файлу`,
    rejectionSize: (name, max) => `${name} перевищує ліміт ${max}`,
    rejectionCount: max => `Можна вибрати лише ${max} файлів`,
    bytesUnit: { b: 'B', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' },
  },
  input: {
    showPassword: 'Показати пароль',
    hidePassword: 'Приховати пароль',
    clear: 'Очистити',
  },
  menu: {
    label: 'Меню',
  },
  multiSelect: {
    placeholder: 'Виберіть…',
    searchPlaceholder: 'Пошук…',
    searchEmpty: 'Немає збігів',
    selectAll: 'Вибрати все',
    clearAll: 'Очистити вибір',
    removeOption: label => `Видалити ${label}`,
    selectedCount: count => `Вибрано: ${count}`,
  },
  paginator: {
    label: 'Нумерація сторінок',
    rowsPerPage: 'Рядків на сторінці:',
    range: (start, end, total) => `${start}–${end} з ${total}`,
    previousPage: 'Попередня сторінка',
    nextPage: 'Наступна сторінка',
  },
  progressBar: {
    label: 'Прогрес',
  },
  rating: {
    label: 'Оцінка',
    valueLabel: (value, max) => `${value} з ${max}`,
    clear: 'Очистити оцінку',
  },
  spinner: {
    label: 'Завантаження',
  },
  stepper: {
    optional: 'необов’язково',
  },
  tag: {
    remove: 'Видалити',
  },
  timePicker: {
    placeholder: 'Виберіть час…',
    clear: 'Очистити час',
    hoursLabel: 'Години',
    minutesLabel: 'Хвилини',
    secondsLabel: 'Секунди',
    incrementHours: 'Збільшити години',
    decrementHours: 'Зменшити години',
    incrementMinutes: 'Збільшити хвилини',
    decrementMinutes: 'Зменшити хвилини',
    incrementSeconds: 'Збільшити секунди',
    decrementSeconds: 'Зменшити секунди',
    amLabel: 'AM',
    pmLabel: 'PM',
  },
  toast: {
    dismiss: 'Закрити',
  },
  transferList: {
    sourceLabel: 'Доступні',
    targetLabel: 'Вибрані',
    controlsLabel: 'Елементи керування перенесенням',
    moveSelectedToTarget: 'Перенести вибрані вправо',
    moveAllToTarget: 'Перенести все вправо',
    moveSelectedToSource: 'Перенести вибрані вліво',
    moveAllToSource: 'Перенести все вліво',
    empty: 'Немає елементів',
  },
  tree: {
    expand: 'Розгорнути',
    collapse: 'Згорнути',
  },
  validation: {
    required: 'Це поле обов’язкове',
    email: 'Введіть дійсну електронну адресу',
    min: min => `Має бути не менше ${min}`,
    max: max => `Має бути не більше ${max}`,
    minlength: length => `Має містити щонайменше ${length} символів`,
    maxlength: length => `Має містити щонайбільше ${length} символів`,
    pattern: 'Неправильний формат',
    invalid: 'Неправильне значення',
  },
  wordmark: {
    overline: 'ручна робота від',
    tagline: 'елегантний веб-дизайн',
  },
};

export const uk: EagamiLocaleBundle = {
  locale: 'uk',
  messages,
};

import type { EagamiLocaleBundle, EagamiMessages } from '../i18n.types';

/** Russian messages. */
const messages: EagamiMessages = {
  alert: {
    dismiss: 'Закрыть',
  },
  autocomplete: {
    empty: 'Нет результатов',
  },
  avatarEditor: {
    upload: 'Загрузить изображение',
    dropzone: 'Перетащите изображение или нажмите для загрузки',
    canvas:
      'Предпросмотр изображения, перетаскивайте или используйте стрелки для перемещения, ползунок для масштабирования',
    change: 'Изменить фото',
    revert: 'Вернуть к исходному',
    zoomOut: 'Уменьшить',
    zoom: 'Масштаб',
    zoomIn: 'Увеличить',
    remove: 'Удалить изображение',
    invalidType: 'Файл должен быть изображением',
    tooLarge: (maxMb: number) => `Файл превышает лимит ${maxMb} MB`,
  },
  breadcrumbs: {
    label: 'Навигационная цепочка',
  },
  codeInput: {
    groupLabel: length => `Код подтверждения, ${length} цифр`,
    digitLabel: (index, length) => `Цифра ${index} из ${length}`,
  },
  commandPalette: {
    dialogLabel: 'Палитра команд',
    searchPlaceholder: 'Введите команду или выполните поиск…',
    empty: 'Ничего не найдено',
    clear: 'Очистить поиск',
  },
  colorPicker: {
    placeholder: 'Выберите цвет…',
    clear: 'Очистить цвет',
    hue: 'Оттенок',
    saturationAndValue: 'Насыщенность и яркость',
    alpha: 'Прозрачность',
    eyedropper: 'Выбрать с экрана',
    presets: 'Предустановки',
    toggleFormat: 'Сменить формат ввода',
  },
  dataTable: {
    noData: 'Нет доступных данных',
  },
  datePicker: {
    placeholder: 'Выберите дату…',
    clear: 'Очистить дату',
    previousYear: 'Предыдущий год',
    previousMonth: 'Предыдущий месяц',
    nextMonth: 'Следующий месяц',
    nextYear: 'Следующий год',
    today: 'Сегодня',
  },
  dialog: {
    close: 'Закрыть диалог',
  },
  drawer: {
    close: 'Закрыть панель',
  },
  dropdown: {
    placeholder: 'Выберите…',
  },
  fileUploader: {
    prompt: 'Нажмите или перетащите файлы сюда для загрузки',
    promptSingle: 'Нажмите или перетащите файл сюда для загрузки',
    browse: 'Обзор файлов',
    removeFile: name => `Удалить ${name}`,
    fileListLabel: 'Выбранные файлы',
    constraintsAccept: accept => `Допустимо: ${accept}`,
    constraintsMaxSize: size => `Максимум ${size} на файл`,
    constraintsMaxFiles: count => `До ${count} файлов`,
    rejectionType: name => `${name} имеет неподдерживаемый тип файла`,
    rejectionSize: (name, max) => `${name} превышает лимит ${max}`,
    rejectionCount: max => `Можно выбрать только ${max} файлов`,
    bytesUnit: { b: 'B', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' },
  },
  input: {
    showPassword: 'Показать пароль',
    hidePassword: 'Скрыть пароль',
    clear: 'Очистить',
  },
  menu: {
    label: 'Меню',
  },
  multiSelect: {
    placeholder: 'Выберите…',
    searchPlaceholder: 'Поиск…',
    searchEmpty: 'Нет совпадений',
    selectAll: 'Выбрать все',
    clearAll: 'Очистить выбор',
    removeOption: label => `Удалить ${label}`,
    selectedCount: count => `Выбрано: ${count}`,
  },
  paginator: {
    label: 'Постраничная навигация',
    rowsPerPage: 'Строк на странице:',
    range: (start, end, total) => `${start}–${end} из ${total}`,
    previousPage: 'Предыдущая страница',
    nextPage: 'Следующая страница',
  },
  progressBar: {
    label: 'Прогресс',
  },
  rating: {
    label: 'Оценка',
    valueLabel: (value, max) => `${value} из ${max}`,
    clear: 'Очистить оценку',
  },
  spinner: {
    label: 'Загрузка',
  },
  stepper: {
    optional: 'необязательно',
  },
  tag: {
    remove: 'Удалить',
  },
  timePicker: {
    placeholder: 'Выберите время…',
    clear: 'Очистить время',
    hoursLabel: 'Часы',
    minutesLabel: 'Минуты',
    secondsLabel: 'Секунды',
    incrementHours: 'Увеличить часы',
    decrementHours: 'Уменьшить часы',
    incrementMinutes: 'Увеличить минуты',
    decrementMinutes: 'Уменьшить минуты',
    incrementSeconds: 'Увеличить секунды',
    decrementSeconds: 'Уменьшить секунды',
    amLabel: 'AM',
    pmLabel: 'PM',
  },
  toast: {
    dismiss: 'Закрыть',
  },
  transferList: {
    sourceLabel: 'Доступно',
    targetLabel: 'Выбрано',
    controlsLabel: 'Элементы управления переносом',
    moveSelectedToTarget: 'Переместить выбранное вправо',
    moveAllToTarget: 'Переместить все вправо',
    moveSelectedToSource: 'Переместить выбранное влево',
    moveAllToSource: 'Переместить все влево',
    empty: 'Нет элементов',
  },
  tree: {
    expand: 'Развернуть',
    collapse: 'Свернуть',
  },
  validation: {
    required: 'Это поле обязательно для заполнения',
    email: 'Введите действительный адрес электронной почты',
    min: min => `Должно быть не менее ${min}`,
    max: max => `Должно быть не более ${max}`,
    minlength: length => `Должно содержать не менее ${length} символов`,
    maxlength: length => `Должно содержать не более ${length} символов`,
    pattern: 'Неверный формат',
    invalid: 'Недопустимое значение',
  },
  wordmark: {
    overline: 'ручная работа от',
    tagline: 'элегантный веб-дизайн',
  },
};

export const ru: EagamiLocaleBundle = {
  locale: 'ru',
  messages,
};

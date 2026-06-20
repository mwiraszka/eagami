import type { EagamiLocaleBundle, EagamiMessages } from '../i18n.types';

/** English (default / fallback) messages. */
const messages: EagamiMessages = {
  alert: {
    dismiss: 'Dismiss',
  },
  autocomplete: {
    empty: 'No results',
  },
  avatarEditor: {
    upload: 'Upload image',
    dropzone: 'Drop image or click to upload',
    canvas: 'Image preview, drag or use arrow keys to pan, slider to zoom',
    change: 'Change photo',
    revert: 'Revert to original',
    zoomOut: 'Zoom out',
    zoom: 'Zoom',
    zoomIn: 'Zoom in',
    remove: 'Remove image',
  },
  breadcrumbs: {
    label: 'Breadcrumb',
  },
  codeInput: {
    groupLabel: length => `Verification code, ${length} digits`,
    digitLabel: (index, length) => `Digit ${index} of ${length}`,
  },
  commandPalette: {
    dialogLabel: 'Command palette',
    searchPlaceholder: 'Type a command or search…',
    empty: 'No results found',
    clear: 'Clear search',
  },
  colorPicker: {
    placeholder: 'Pick a color…',
    clear: 'Clear color',
    hue: 'Hue',
    saturationAndValue: 'Saturation and value',
    alpha: 'Alpha',
    eyedropper: 'Pick from screen',
    presets: 'Presets',
    toggleFormat: 'Switch input format',
  },
  dataTable: {
    noData: 'No data available',
  },
  datePicker: {
    placeholder: 'Select date…',
    clear: 'Clear date',
    previousYear: 'Previous year',
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    nextYear: 'Next year',
    today: 'Today',
  },
  dialog: {
    close: 'Close dialog',
  },
  drawer: {
    close: 'Close panel',
  },
  dropdown: {
    placeholder: 'Select…',
  },
  fileUploader: {
    prompt: 'Click or drag files here to upload',
    promptSingle: 'Click or drag a file here to upload',
    browse: 'Browse files',
    removeFile: name => `Remove ${name}`,
    fileListLabel: 'Selected files',
    constraintsAccept: accept => `Accepted: ${accept}`,
    constraintsMaxSize: size => `Max ${size} per file`,
    constraintsMaxFiles: count => `Up to ${count} files`,
    rejectionType: name => `${name} has an unsupported file type`,
    rejectionSize: (name, max) => `${name} exceeds the ${max} limit`,
    rejectionCount: max => `Only ${max} files can be selected`,
    bytesUnit: { b: 'B', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' },
  },
  input: {
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    clear: 'Clear',
  },
  menu: {
    label: 'Menu',
  },
  multiSelect: {
    placeholder: 'Select…',
    searchPlaceholder: 'Search…',
    searchEmpty: 'No matches',
    selectAll: 'Select all',
    clearAll: 'Clear selection',
    removeOption: label => `Remove ${label}`,
    selectedCount: count => `${count} selected`,
  },
  paginator: {
    label: 'Pagination',
    rowsPerPage: 'Rows per page:',
    range: (start, end, total) => `${start}–${end} of ${total}`,
    previousPage: 'Previous page',
    nextPage: 'Next page',
  },
  progressBar: {
    label: 'Progress',
  },
  rating: {
    label: 'Rating',
    valueLabel: (value, max) => `${value} of ${max}`,
    clear: 'Clear rating',
  },
  spinner: {
    label: 'Loading',
  },
  stepper: {
    optional: 'optional',
  },
  tag: {
    remove: 'Remove',
  },
  timePicker: {
    placeholder: 'Select time…',
    clear: 'Clear time',
    hoursLabel: 'Hours',
    minutesLabel: 'Minutes',
    secondsLabel: 'Seconds',
    incrementHours: 'Increment hours',
    decrementHours: 'Decrement hours',
    incrementMinutes: 'Increment minutes',
    decrementMinutes: 'Decrement minutes',
    incrementSeconds: 'Increment seconds',
    decrementSeconds: 'Decrement seconds',
    amLabel: 'AM',
    pmLabel: 'PM',
  },
  toast: {
    dismiss: 'Dismiss',
  },
  transferList: {
    sourceLabel: 'Available',
    targetLabel: 'Selected',
    controlsLabel: 'Transfer controls',
    moveSelectedToTarget: 'Move selected to target',
    moveAllToTarget: 'Move all to target',
    moveSelectedToSource: 'Move selected to source',
    moveAllToSource: 'Move all to source',
    empty: 'No items',
  },
  tree: {
    expand: 'Expand',
    collapse: 'Collapse',
  },
  validation: {
    required: 'This field is required',
    email: 'Enter a valid email address',
    min: min => `Must be at least ${min}`,
    max: max => `Must be at most ${max}`,
    minlength: length => `Must be at least ${length} characters`,
    maxlength: length => `Must be at most ${length} characters`,
    pattern: 'Invalid format',
    invalid: 'Invalid value',
  },
  wordmark: {
    overline: 'handcrafted by',
    tagline: 'elegant web design',
  },
};

export const en: EagamiLocaleBundle = {
  locale: 'en',
  messages,
};

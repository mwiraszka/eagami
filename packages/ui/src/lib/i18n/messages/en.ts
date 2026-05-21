import { EagamiMessages } from '../i18n.types';

/** English (default / fallback) messages. */
export const en: EagamiMessages = {
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
  input: {
    showPassword: 'Show password',
    hidePassword: 'Hide password',
  },
  menu: {
    label: 'Menu',
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
  spinner: {
    label: 'Loading',
  },
  tag: {
    remove: 'Remove',
  },
  toast: {
    dismiss: 'Dismiss',
  },
  wordmark: {
    overline: 'handcrafted by',
    tagline: 'elegant web design',
  },
};

import type { EagamiLocaleBundle, EagamiMessages } from '../i18n.types';

/** Spanish (Spain) messages. */
const messages: EagamiMessages = {
  alert: {
    dismiss: 'Descartar',
  },
  autocomplete: {
    empty: 'Sin resultados',
  },
  avatarEditor: {
    upload: 'Subir imagen',
    dropzone: 'Suelta una imagen o haz clic para subir',
    canvas:
      'Vista previa de la imagen, arrastra o usa las flechas para desplazar, el control deslizante para ampliar',
    canvasInstructions:
      'Usa las flechas para mover la imagen, más y menos para ampliar, y Intro o Espacio para elegir otra foto',
    change: 'Cambiar foto',
    revert: 'Revertir al original',
    zoomOut: 'Alejar',
    zoom: 'Ampliación',
    zoomIn: 'Acercar',
    remove: 'Eliminar imagen',
    invalidType: 'El archivo debe ser una imagen',
    tooLarge: (maxMb: number) => `El archivo supera el límite de ${maxMb} MB`,
  },
  breadcrumbs: {
    label: 'Ruta de navegación',
  },
  codeInput: {
    groupLabel: length => `Código de verificación, ${length} dígitos`,
    digitLabel: (index, length) => `Dígito ${index} de ${length}`,
  },
  commandPalette: {
    dialogLabel: 'Paleta de comandos',
    searchPlaceholder: 'Escribe un comando o busca…',
    empty: 'Sin resultados',
    clear: 'Borrar búsqueda',
  },
  colorPicker: {
    dialogLabel: 'Elegir color',
    placeholder: 'Elegir un color…',
    clear: 'Borrar color',
    hue: 'Matiz',
    saturationAndValue: 'Saturación y valor',
    saturationAndValueStatus: (saturation, value) =>
      `Saturación ${saturation} %, brillo ${value} %`,
    alpha: 'Alfa',
    eyedropper: 'Elegir de la pantalla',
    presets: 'Preajustes',
    toggleFormat: 'Cambiar formato de entrada',
  },
  dataTable: {
    noData: 'No hay datos disponibles',
  },
  numberFormat: {
    decimal: ',',
    group: '.',
    grouping: [3],
  },
  datePicker: {
    placeholder: 'Seleccionar fecha…',
    dialogLabel: 'Elegir fecha',
    clear: 'Borrar fecha',
    previousYear: 'Año anterior',
    previousMonth: 'Mes anterior',
    nextMonth: 'Mes siguiente',
    nextYear: 'Año siguiente',
    today: 'Hoy',
    weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    months: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ],
  },
  dialog: {
    close: 'Cerrar diálogo',
  },
  drawer: {
    close: 'Cerrar panel',
  },
  dropdown: {
    placeholder: 'Seleccionar…',
  },
  fileUploader: {
    prompt: 'Haz clic o arrastra archivos aquí para subirlos',
    promptSingle: 'Haz clic o arrastra un archivo aquí para subirlo',
    browse: 'Examinar archivos',
    removeFile: name => `Eliminar ${name}`,
    fileListLabel: 'Archivos seleccionados',
    constraintsAccept: accept => `Aceptados: ${accept}`,
    constraintsMaxSize: size => `Máx. ${size} por archivo`,
    constraintsMaxFiles: count => `Hasta ${count} archivos`,
    rejectionType: name => `${name} tiene un tipo de archivo no admitido`,
    rejectionSize: (name, max) => `${name} supera el límite de ${max}`,
    rejectionCount: max => `Solo se pueden seleccionar ${max} archivos`,
    bytesUnit: { b: 'B', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' },
  },
  input: {
    showPassword: 'Mostrar contraseña',
    hidePassword: 'Ocultar contraseña',
    clear: 'Borrar',
  },
  numberInput: {
    increment: 'Incrementar',
    decrement: 'Disminuir',
  },
  menu: {
    label: 'Menú',
  },
  multiSelect: {
    dialogLabel: 'Elegir opciones',
    placeholder: 'Seleccionar…',
    searchPlaceholder: 'Buscar…',
    searchEmpty: 'Sin coincidencias',
    selectAll: 'Seleccionar todo',
    clearAll: 'Borrar selección',
    removeOption: label => `Eliminar ${label}`,
    selectedCount: count => `${count} seleccionado${count === 1 ? '' : 's'}`,
  },
  paginator: {
    label: 'Paginación',
    rowsPerPage: 'Filas por página:',
    range: (start, end, total) => `${start}–${end} de ${total}`,
    previousPage: 'Página anterior',
    nextPage: 'Página siguiente',
    page: page => `Ir a la página ${page}`,
  },
  progressBar: {
    label: 'Progreso',
  },
  rangeSlider: {
    lowThumbLabel: 'Valor mínimo',
    highThumbLabel: 'Valor máximo',
  },
  rating: {
    label: 'Valoración',
    valueLabel: (value, max) => `${value} de ${max}`,
    clear: 'Borrar valoración',
  },
  spinner: {
    label: 'Cargando',
  },
  stepper: {
    stepsLabel: 'Pasos',
    optional: 'opcional',
    stepCompleted: 'completado',
  },
  tag: {
    remove: 'Eliminar',
  },
  timePicker: {
    placeholder: 'Seleccionar hora…',
    dialogLabel: 'Elegir hora',
    clear: 'Borrar hora',
    hoursLabel: 'Horas',
    minutesLabel: 'Minutos',
    secondsLabel: 'Segundos',
    incrementHours: 'Aumentar horas',
    decrementHours: 'Disminuir horas',
    incrementMinutes: 'Aumentar minutos',
    decrementMinutes: 'Disminuir minutos',
    incrementSeconds: 'Aumentar segundos',
    decrementSeconds: 'Disminuir segundos',
    amLabel: 'AM',
    pmLabel: 'PM',
  },
  toast: {
    dismiss: 'Descartar',
  },
  transferList: {
    sourceLabel: 'Disponibles',
    targetLabel: 'Seleccionados',
    controlsLabel: 'Controles de transferencia',
    moveSelectedToTarget: 'Mover seleccionados al destino',
    moveAllToTarget: 'Mover todos al destino',
    moveSelectedToSource: 'Mover seleccionados al origen',
    moveAllToSource: 'Mover todos al origen',
    empty: 'Sin elementos',
    moved: (count, listLabel) => `Movidos a ${listLabel}: ${count}`,
  },
  validation: {
    required: 'Este campo es obligatorio',
    email: 'Introduce un correo electrónico válido',
    min: min => `Debe ser como mínimo ${min}`,
    max: max => `Debe ser como máximo ${max}`,
    minlength: length => `Debe tener al menos ${length} caracteres`,
    maxlength: length => `Debe tener como máximo ${length} caracteres`,
    pattern: 'Formato no válido',
    invalid: 'Valor no válido',
  },
  wordmark: {
    overline: 'diseñado por',
    tagline: 'diseño web elegante',
  },
};

export const esES: EagamiLocaleBundle = {
  locale: 'es-ES',
  messages,
};

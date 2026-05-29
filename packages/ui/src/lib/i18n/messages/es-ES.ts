import type { EagamiMessages } from '../i18n.types';

/** Spanish (Spain) messages. */
export const esES: EagamiMessages = {
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
    change: 'Cambiar foto',
    revert: 'Revertir al original',
    zoomOut: 'Alejar',
    zoom: 'Ampliación',
    zoomIn: 'Acercar',
    remove: 'Eliminar imagen',
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
    placeholder: 'Elegir un color…',
    clear: 'Borrar color',
    hue: 'Matiz',
    saturationAndValue: 'Saturación y valor',
    alpha: 'Alfa',
    eyedropper: 'Elegir de la pantalla',
    presets: 'Preajustes',
    toggleFormat: 'Cambiar formato de entrada',
  },
  dataTable: {
    noData: 'No hay datos disponibles',
  },
  datePicker: {
    placeholder: 'Seleccionar fecha…',
    clear: 'Borrar fecha',
    previousYear: 'Año anterior',
    previousMonth: 'Mes anterior',
    nextMonth: 'Mes siguiente',
    nextYear: 'Año siguiente',
    today: 'Hoy',
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
  menu: {
    label: 'Menú',
  },
  multiSelect: {
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
  },
  progressBar: {
    label: 'Progreso',
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
    optional: 'opcional',
  },
  tag: {
    remove: 'Eliminar',
  },
  timePicker: {
    placeholder: 'Seleccionar hora…',
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
  },
  tree: {
    expand: 'Expandir',
    collapse: 'Contraer',
  },
  wordmark: {
    overline: 'hecho a mano por',
    tagline: 'diseño web elegante',
  },
};

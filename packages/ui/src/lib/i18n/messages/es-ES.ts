import { EagamiMessages } from '../i18n.types';

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
  input: {
    showPassword: 'Mostrar contraseña',
    hidePassword: 'Ocultar contraseña',
  },
  menu: {
    label: 'Menú',
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
  spinner: {
    label: 'Cargando',
  },
  tag: {
    remove: 'Eliminar',
  },
  toast: {
    dismiss: 'Descartar',
  },
  wordmark: {
    overline: 'hecho a mano por',
    tagline: 'diseño web elegante',
  },
};

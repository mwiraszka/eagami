import type { EagamiLocaleBundle, EagamiMessages } from '../i18n.types';

/** Brazilian Portuguese messages. */
const messages: EagamiMessages = {
  alert: {
    dismiss: 'Dispensar',
  },
  autocomplete: {
    empty: 'Nenhum resultado',
  },
  avatarEditor: {
    upload: 'Enviar imagem',
    dropzone: 'Solte a imagem ou clique para enviar',
    canvas:
      'Pré-visualização da imagem, arraste ou use as setas para deslocar, o controle deslizante para ampliar',
    canvasInstructions:
      'Use as setas para mover a imagem, mais e menos para ajustar o zoom, e Enter ou Espaço para escolher outra foto',
    change: 'Trocar foto',
    revert: 'Reverter ao original',
    zoomOut: 'Diminuir zoom',
    zoom: 'Zoom',
    zoomIn: 'Aumentar zoom',
    remove: 'Remover imagem',
    invalidType: 'O arquivo deve ser uma imagem',
    tooLarge: (maxMb: number) => `O arquivo excede o limite de ${maxMb} MB`,
  },
  breadcrumbs: {
    label: 'Trilha de navegação',
  },
  codeInput: {
    groupLabel: length => `Código de verificação, ${length} dígitos`,
    digitLabel: (index, length) => `Dígito ${index} de ${length}`,
  },
  commandPalette: {
    dialogLabel: 'Paleta de comandos',
    searchPlaceholder: 'Digite um comando ou pesquise…',
    empty: 'Nenhum resultado encontrado',
    clear: 'Limpar pesquisa',
  },
  colorPicker: {
    placeholder: 'Escolha uma cor…',
    clear: 'Limpar cor',
    hue: 'Matiz',
    saturationAndValue: 'Saturação e valor',
    saturationAndValueStatus: (saturation, value) =>
      `Saturação ${saturation}%, brilho ${value}%`,
    alpha: 'Alfa',
    eyedropper: 'Capturar da tela',
    presets: 'Predefinições',
    toggleFormat: 'Alternar formato de entrada',
  },
  dataTable: {
    noData: 'Nenhum dado disponível',
  },
  numberFormat: {
    decimal: ',',
    group: '.',
    grouping: [3],
  },
  datePicker: {
    placeholder: 'Selecione a data…',
    dialogLabel: 'Escolher data',
    clear: 'Limpar data',
    previousYear: 'Ano anterior',
    previousMonth: 'Mês anterior',
    nextMonth: 'Próximo mês',
    nextYear: 'Próximo ano',
    today: 'Hoje',
    weekdaysShort: ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'],
    months: [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ],
  },
  dialog: {
    close: 'Fechar diálogo',
  },
  drawer: {
    close: 'Fechar painel',
  },
  dropdown: {
    placeholder: 'Selecione…',
  },
  fileUploader: {
    prompt: 'Clique ou arraste arquivos aqui para enviar',
    promptSingle: 'Clique ou arraste um arquivo aqui para enviar',
    browse: 'Procurar arquivos',
    removeFile: name => `Remover ${name}`,
    fileListLabel: 'Arquivos selecionados',
    constraintsAccept: accept => `Aceitos: ${accept}`,
    constraintsMaxSize: size => `Máximo ${size} por arquivo`,
    constraintsMaxFiles: count => `Até ${count} arquivos`,
    rejectionType: name => `${name} tem um tipo de arquivo não suportado`,
    rejectionSize: (name, max) => `${name} excede o limite de ${max}`,
    rejectionCount: max => `Somente ${max} arquivos podem ser selecionados`,
    bytesUnit: { b: 'B', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' },
  },
  input: {
    showPassword: 'Mostrar senha',
    hidePassword: 'Ocultar senha',
    clear: 'Limpar',
  },
  numberInput: {
    increment: 'Aumentar',
    decrement: 'Diminuir',
  },
  menu: {
    label: 'Menu',
  },
  multiSelect: {
    placeholder: 'Selecione…',
    searchPlaceholder: 'Pesquisar…',
    searchEmpty: 'Nenhuma correspondência',
    selectAll: 'Selecionar tudo',
    clearAll: 'Limpar seleção',
    removeOption: label => `Remover ${label}`,
    selectedCount: count => `${count} selecionado(s)`,
  },
  paginator: {
    label: 'Paginação',
    rowsPerPage: 'Linhas por página:',
    range: (start, end, total) => `${start}–${end} de ${total}`,
    previousPage: 'Página anterior',
    nextPage: 'Próxima página',
  },
  progressBar: {
    label: 'Progresso',
  },
  rangeSlider: {
    lowThumbLabel: 'Valor mínimo',
    highThumbLabel: 'Valor máximo',
  },
  rating: {
    label: 'Avaliação',
    valueLabel: (value, max) => `${value} de ${max}`,
    clear: 'Limpar avaliação',
  },
  spinner: {
    label: 'Carregando',
  },
  stepper: {
    stepsLabel: 'Etapas',
    optional: 'opcional',
    stepCompleted: 'concluída',
  },
  tag: {
    remove: 'Remover',
  },
  timePicker: {
    placeholder: 'Selecione o horário…',
    dialogLabel: 'Escolher horário',
    clear: 'Limpar horário',
    hoursLabel: 'Horas',
    minutesLabel: 'Minutos',
    secondsLabel: 'Segundos',
    incrementHours: 'Aumentar horas',
    decrementHours: 'Diminuir horas',
    incrementMinutes: 'Aumentar minutos',
    decrementMinutes: 'Diminuir minutos',
    incrementSeconds: 'Aumentar segundos',
    decrementSeconds: 'Diminuir segundos',
    amLabel: 'AM',
    pmLabel: 'PM',
  },
  toast: {
    dismiss: 'Dispensar',
  },
  transferList: {
    sourceLabel: 'Disponíveis',
    targetLabel: 'Selecionados',
    controlsLabel: 'Controles de transferência',
    moveSelectedToTarget: 'Mover selecionados para o destino',
    moveAllToTarget: 'Mover todos para o destino',
    moveSelectedToSource: 'Mover selecionados para a origem',
    moveAllToSource: 'Mover todos para a origem',
    empty: 'Nenhum item',
  },
  validation: {
    required: 'Este campo é obrigatório',
    email: 'Insira um e-mail válido',
    min: min => `Deve ser no mínimo ${min}`,
    max: max => `Deve ser no máximo ${max}`,
    minlength: length => `Deve ter pelo menos ${length} caracteres`,
    maxlength: length => `Deve ter no máximo ${length} caracteres`,
    pattern: 'Formato inválido',
    invalid: 'Valor inválido',
  },
  wordmark: {
    overline: 'feito à mão por',
    tagline: 'web design elegante',
  },
};

export const ptBR: EagamiLocaleBundle = {
  locale: 'pt-BR',
  messages,
};

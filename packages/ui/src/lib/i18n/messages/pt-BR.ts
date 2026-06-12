import type { EagamiMessages } from '../i18n.types';

/** Brazilian Portuguese messages. */
export const ptBR: EagamiMessages = {
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
    change: 'Trocar foto',
    revert: 'Reverter ao original',
    zoomOut: 'Diminuir zoom',
    zoom: 'Zoom',
    zoomIn: 'Aumentar zoom',
    remove: 'Remover imagem',
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
    alpha: 'Alfa',
    eyedropper: 'Capturar da tela',
    presets: 'Predefinições',
    toggleFormat: 'Alternar formato de entrada',
  },
  dataTable: {
    noData: 'Nenhum dado disponível',
  },
  datePicker: {
    placeholder: 'Selecione a data…',
    clear: 'Limpar data',
    previousYear: 'Ano anterior',
    previousMonth: 'Mês anterior',
    nextMonth: 'Próximo mês',
    nextYear: 'Próximo ano',
    today: 'Hoje',
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
  rating: {
    label: 'Avaliação',
    valueLabel: (value, max) => `${value} de ${max}`,
    clear: 'Limpar avaliação',
  },
  spinner: {
    label: 'Carregando',
  },
  stepper: {
    optional: 'opcional',
  },
  tag: {
    remove: 'Remover',
  },
  timePicker: {
    placeholder: 'Selecione o horário…',
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
  tree: {
    expand: 'Expandir',
    collapse: 'Recolher',
  },
  wordmark: {
    overline: 'feito à mão por',
    tagline: 'web design elegante',
  },
};

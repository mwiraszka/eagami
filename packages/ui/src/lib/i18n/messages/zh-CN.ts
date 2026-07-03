import type { EagamiLocaleBundle, EagamiMessages } from '../i18n.types';

/** Simplified Chinese messages. */
const messages: EagamiMessages = {
  alert: {
    dismiss: '关闭',
  },
  autocomplete: {
    empty: '无结果',
  },
  avatarEditor: {
    upload: '上传图片',
    dropzone: '拖放图片或点击上传',
    canvas: '图片预览，拖动或使用方向键平移，使用滑块缩放',
    canvasInstructions:
      '使用方向键移动图片，加号和减号缩放，按 Enter 或空格键选择其他照片',
    change: '更换照片',
    revert: '恢复原图',
    zoomOut: '缩小',
    zoom: '缩放',
    zoomIn: '放大',
    remove: '移除图片',
    invalidType: '文件必须是图片',
    tooLarge: (maxMb: number) => `文件超过 ${maxMb} MB 限制`,
  },
  breadcrumbs: {
    label: '面包屑导航',
  },
  codeInput: {
    groupLabel: length => `验证码，共 ${length} 位`,
    digitLabel: (index, length) => `第 ${index} 位，共 ${length} 位`,
  },
  commandPalette: {
    dialogLabel: '命令面板',
    searchPlaceholder: '输入命令或搜索…',
    empty: '未找到结果',
    clear: '清除搜索',
  },
  colorPicker: {
    placeholder: '选择颜色…',
    clear: '清除颜色',
    hue: '色相',
    saturationAndValue: '饱和度和明度',
    saturationAndValueStatus: (saturation, value) =>
      `饱和度 ${saturation}%，明度 ${value}%`,
    alpha: '透明度',
    eyedropper: '从屏幕取色',
    presets: '预设',
    toggleFormat: '切换输入格式',
  },
  dataTable: {
    noData: '暂无数据',
  },
  numberFormat: {
    decimal: '.',
    group: ',',
    grouping: [3],
  },
  datePicker: {
    placeholder: '选择日期…',
    dialogLabel: '选择日期',
    clear: '清除日期',
    previousYear: '上一年',
    previousMonth: '上个月',
    nextMonth: '下个月',
    nextYear: '下一年',
    today: '今天',
    weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    months: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
  },
  dialog: {
    close: '关闭对话框',
  },
  drawer: {
    close: '关闭面板',
  },
  dropdown: {
    placeholder: '请选择…',
  },
  fileUploader: {
    prompt: '点击或拖动文件到此处上传',
    promptSingle: '点击或拖动文件到此处上传',
    browse: '浏览文件',
    removeFile: name => `移除 ${name}`,
    fileListLabel: '已选文件',
    constraintsAccept: accept => `支持格式：${accept}`,
    constraintsMaxSize: size => `每个文件最大 ${size}`,
    constraintsMaxFiles: count => `最多 ${count} 个文件`,
    rejectionType: name => `${name} 的文件类型不受支持`,
    rejectionSize: (name, max) => `${name} 超过了 ${max} 的限制`,
    rejectionCount: max => `最多只能选择 ${max} 个文件`,
    bytesUnit: { b: 'B', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' },
  },
  input: {
    showPassword: '显示密码',
    hidePassword: '隐藏密码',
    clear: '清除',
  },
  menu: {
    label: '菜单',
  },
  multiSelect: {
    placeholder: '请选择…',
    searchPlaceholder: '搜索…',
    searchEmpty: '无匹配项',
    selectAll: '全选',
    clearAll: '清除选择',
    removeOption: label => `移除 ${label}`,
    selectedCount: count => `已选择 ${count} 项`,
  },
  paginator: {
    label: '分页',
    rowsPerPage: '每页行数：',
    range: (start, end, total) => `共 ${total} 项中的 ${start}–${end}`,
    previousPage: '上一页',
    nextPage: '下一页',
  },
  progressBar: {
    label: '进度',
  },
  rangeSlider: {
    lowThumbLabel: '最小值',
    highThumbLabel: '最大值',
  },
  rating: {
    label: '评分',
    valueLabel: (value, max) => `${value} / ${max}`,
    clear: '清除评分',
  },
  spinner: {
    label: '加载中',
  },
  stepper: {
    stepsLabel: '步骤',
    optional: '可选',
    stepCompleted: '已完成',
  },
  tag: {
    remove: '移除',
  },
  timePicker: {
    placeholder: '选择时间…',
    dialogLabel: '选择时间',
    clear: '清除时间',
    hoursLabel: '时',
    minutesLabel: '分',
    secondsLabel: '秒',
    incrementHours: '增加小时',
    decrementHours: '减少小时',
    incrementMinutes: '增加分钟',
    decrementMinutes: '减少分钟',
    incrementSeconds: '增加秒数',
    decrementSeconds: '减少秒数',
    amLabel: '上午',
    pmLabel: '下午',
  },
  toast: {
    dismiss: '关闭',
  },
  transferList: {
    sourceLabel: '可选',
    targetLabel: '已选',
    controlsLabel: '穿梭控件',
    moveSelectedToTarget: '将所选项移至右侧',
    moveAllToTarget: '将全部移至右侧',
    moveSelectedToSource: '将所选项移至左侧',
    moveAllToSource: '将全部移至左侧',
    empty: '无项目',
  },
  tree: {
    expand: '展开',
    collapse: '折叠',
  },
  validation: {
    required: '此字段为必填项',
    email: '请输入有效的电子邮件地址',
    min: min => `不能小于 ${min}`,
    max: max => `不能大于 ${max}`,
    minlength: length => `至少需要 ${length} 个字符`,
    maxlength: length => `最多 ${length} 个字符`,
    pattern: '格式无效',
    invalid: '值无效',
  },
  wordmark: {
    overline: '匠心打造',
    tagline: '优雅的网页设计',
  },
};

export const zhCN: EagamiLocaleBundle = {
  locale: 'zh-CN',
  messages,
};

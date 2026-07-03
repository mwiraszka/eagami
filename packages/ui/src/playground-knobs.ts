import { ACCORDION_KNOBS } from './lib/accordion/accordion.component.knobs';
import { ALERT_KNOBS } from './lib/alert/alert.component.knobs';
import { AUTOCOMPLETE_KNOBS } from './lib/autocomplete/autocomplete.component.knobs';
import { AVATAR_EDITOR_KNOBS } from './lib/avatar-editor/avatar-editor.component.knobs';
import { AVATAR_KNOBS } from './lib/avatar/avatar.component.knobs';
import { BADGE_KNOBS } from './lib/badge/badge.component.knobs';
import { BREADCRUMBS_KNOBS } from './lib/breadcrumbs/breadcrumbs.component.knobs';
import { BUTTON_KNOBS } from './lib/button/button.component.knobs';
import { CARD_KNOBS } from './lib/card/card.component.knobs';
import { CHECKBOX_KNOBS } from './lib/checkbox/checkbox.component.knobs';
import { CODE_INPUT_KNOBS } from './lib/code-input/code-input.component.knobs';
import { COLOR_PICKER_KNOBS } from './lib/color-picker/color-picker.component.knobs';
import { COMMAND_PALETTE_KNOBS } from './lib/command-palette/command-palette.component.knobs';
import { DATA_TABLE_KNOBS } from './lib/data-table/data-table.component.knobs';
import { DATE_PICKER_KNOBS } from './lib/date-picker/date-picker.component.knobs';
import { DIALOG_KNOBS } from './lib/dialog/dialog.component.knobs';
import { DIVIDER_KNOBS } from './lib/divider/divider.component.knobs';
import { DRAWER_KNOBS } from './lib/drawer/drawer.component.knobs';
import { DROPDOWN_KNOBS } from './lib/dropdown/dropdown.component.knobs';
import { EAGAMI_WORDMARK_KNOBS } from './lib/eagami-wordmark/eagami-wordmark.component.knobs';
import { EMPTY_STATE_KNOBS } from './lib/empty-state/empty-state.component.knobs';
import { FORM_FIELD_KNOBS } from './lib/field/form-field.component.knobs';
import { FILE_UPLOADER_KNOBS } from './lib/file-uploader/file-uploader.component.knobs';
import { INPUT_KNOBS } from './lib/input/input.component.knobs';
import { MENU_KNOBS } from './lib/menu/menu.component.knobs';
import { MULTI_SELECT_KNOBS } from './lib/multi-select/multi-select.component.knobs';
import { PAGINATOR_KNOBS } from './lib/paginator/paginator.component.knobs';
import { POPOVER_KNOBS } from './lib/popover/popover.component.knobs';
import { PROGRESS_BAR_KNOBS } from './lib/progress-bar/progress-bar.component.knobs';
import { RADIO_KNOBS } from './lib/radio/radio.component.knobs';
import { RANGE_SLIDER_KNOBS } from './lib/range-slider/range-slider.component.knobs';
import { RATING_KNOBS } from './lib/rating/rating.component.knobs';
import { SEGMENTED_KNOBS } from './lib/segmented/segmented.component.knobs';
import { SKELETON_KNOBS } from './lib/skeleton/skeleton.component.knobs';
import { SLIDER_KNOBS } from './lib/slider/slider.component.knobs';
import { SPINNER_KNOBS } from './lib/spinner/spinner.component.knobs';
import { STEPPER_KNOBS } from './lib/stepper/stepper.component.knobs';
import { SWITCH_KNOBS } from './lib/switch/switch.component.knobs';
import { TABS_KNOBS } from './lib/tabs/tabs.component.knobs';
import { TAG_KNOBS } from './lib/tag/tag.component.knobs';
import { TEXTAREA_KNOBS } from './lib/textarea/textarea.component.knobs';
import { TIME_PICKER_KNOBS } from './lib/time-picker/time-picker.component.knobs';
import { TOAST_KNOBS } from './lib/toast/toast.component.knobs';
import { TOOLTIP_KNOBS } from './lib/tooltip/tooltip.directive.knobs';
import { TRANSFER_LIST_KNOBS } from './lib/transfer-list/transfer-list.component.knobs';
import { TREE_KNOBS } from './lib/tree/tree.component.knobs';
import { VIRTUAL_LIST_KNOBS } from './lib/virtual-list/virtual-list.component.knobs';

export type {
  ComponentKnobs,
  KnobArgType,
  KnobArgValue,
  KnobCondition,
} from './playground-knobs.types';

/**
 * Registry of component knob specs keyed by website slug. The website's
 * component playground looks up the active component's knobs here. Deliberately
 * NOT re-exported from `public-api`: this is demo metadata for the docs site,
 * not part of the published `@eagami/ui` surface.
 */
export const PLAYGROUND_KNOBS = {
  accordion: ACCORDION_KNOBS,
  alert: ALERT_KNOBS,
  autocomplete: AUTOCOMPLETE_KNOBS,
  avatar: AVATAR_KNOBS,
  'avatar-editor': AVATAR_EDITOR_KNOBS,
  badge: BADGE_KNOBS,
  breadcrumbs: BREADCRUMBS_KNOBS,
  button: BUTTON_KNOBS,
  card: CARD_KNOBS,
  checkbox: CHECKBOX_KNOBS,
  'code-input': CODE_INPUT_KNOBS,
  'color-picker': COLOR_PICKER_KNOBS,
  'command-palette': COMMAND_PALETTE_KNOBS,
  'data-table': DATA_TABLE_KNOBS,
  'date-picker': DATE_PICKER_KNOBS,
  dialog: DIALOG_KNOBS,
  divider: DIVIDER_KNOBS,
  drawer: DRAWER_KNOBS,
  dropdown: DROPDOWN_KNOBS,
  'eagami-wordmark': EAGAMI_WORDMARK_KNOBS,
  'empty-state': EMPTY_STATE_KNOBS,
  'file-uploader': FILE_UPLOADER_KNOBS,
  'form-field': FORM_FIELD_KNOBS,
  input: INPUT_KNOBS,
  menu: MENU_KNOBS,
  'multi-select': MULTI_SELECT_KNOBS,
  paginator: PAGINATOR_KNOBS,
  popover: POPOVER_KNOBS,
  'progress-bar': PROGRESS_BAR_KNOBS,
  radio: RADIO_KNOBS,
  'range-slider': RANGE_SLIDER_KNOBS,
  rating: RATING_KNOBS,
  segmented: SEGMENTED_KNOBS,
  skeleton: SKELETON_KNOBS,
  slider: SLIDER_KNOBS,
  spinner: SPINNER_KNOBS,
  stepper: STEPPER_KNOBS,
  switch: SWITCH_KNOBS,
  tabs: TABS_KNOBS,
  tag: TAG_KNOBS,
  textarea: TEXTAREA_KNOBS,
  'time-picker': TIME_PICKER_KNOBS,
  toast: TOAST_KNOBS,
  tooltip: TOOLTIP_KNOBS,
  'transfer-list': TRANSFER_LIST_KNOBS,
  tree: TREE_KNOBS,
  'virtual-list': VIRTUAL_LIST_KNOBS,
} as const;

export type PlaygroundKnobSlug = keyof typeof PLAYGROUND_KNOBS;

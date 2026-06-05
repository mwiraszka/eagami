import { ALERT_KNOBS } from './lib/alert/alert.component.knobs';
import { AVATAR_KNOBS } from './lib/avatar/avatar.component.knobs';
import { BADGE_KNOBS } from './lib/badge/badge.component.knobs';
import { BUTTON_KNOBS } from './lib/button/button.component.knobs';
import { CARD_KNOBS } from './lib/card/card.component.knobs';
import { CHECKBOX_KNOBS } from './lib/checkbox/checkbox.component.knobs';
import { CODE_INPUT_KNOBS } from './lib/code-input/code-input.component.knobs';
import { COLOR_PICKER_KNOBS } from './lib/color-picker/color-picker.component.knobs';
import { DIVIDER_KNOBS } from './lib/divider/divider.component.knobs';
import { EAGAMI_WORDMARK_KNOBS } from './lib/eagami-wordmark/eagami-wordmark.component.knobs';
import { EMPTY_STATE_KNOBS } from './lib/empty-state/empty-state.component.knobs';
import { INPUT_KNOBS } from './lib/input/input.component.knobs';
import { PAGINATOR_KNOBS } from './lib/paginator/paginator.component.knobs';
import { PROGRESS_BAR_KNOBS } from './lib/progress-bar/progress-bar.component.knobs';
import { RADIO_KNOBS } from './lib/radio/radio.component.knobs';
import { RANGE_SLIDER_KNOBS } from './lib/range-slider/range-slider.component.knobs';
import { RATING_KNOBS } from './lib/rating/rating.component.knobs';
import { SKELETON_KNOBS } from './lib/skeleton/skeleton.component.knobs';
import { SLIDER_KNOBS } from './lib/slider/slider.component.knobs';
import { SPINNER_KNOBS } from './lib/spinner/spinner.component.knobs';
import { SWITCH_KNOBS } from './lib/switch/switch.component.knobs';
import { TAG_KNOBS } from './lib/tag/tag.component.knobs';
import { TEXTAREA_KNOBS } from './lib/textarea/textarea.component.knobs';

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
  alert: ALERT_KNOBS,
  avatar: AVATAR_KNOBS,
  badge: BADGE_KNOBS,
  button: BUTTON_KNOBS,
  card: CARD_KNOBS,
  checkbox: CHECKBOX_KNOBS,
  'code-input': CODE_INPUT_KNOBS,
  'color-picker': COLOR_PICKER_KNOBS,
  divider: DIVIDER_KNOBS,
  'eagami-wordmark': EAGAMI_WORDMARK_KNOBS,
  'empty-state': EMPTY_STATE_KNOBS,
  input: INPUT_KNOBS,
  paginator: PAGINATOR_KNOBS,
  'progress-bar': PROGRESS_BAR_KNOBS,
  radio: RADIO_KNOBS,
  'range-slider': RANGE_SLIDER_KNOBS,
  rating: RATING_KNOBS,
  skeleton: SKELETON_KNOBS,
  slider: SLIDER_KNOBS,
  spinner: SPINNER_KNOBS,
  switch: SWITCH_KNOBS,
  tag: TAG_KNOBS,
  textarea: TEXTAREA_KNOBS,
} as const;

export type PlaygroundKnobSlug = keyof typeof PLAYGROUND_KNOBS;

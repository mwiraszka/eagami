import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Range Slider demo's interactive controls.
 * Consumed by `range-slider.component.stories.ts` (as Storybook
 * `argTypes`/`args`) and by the website's component playground.
 */
export const RANGE_SLIDER_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    showValue: { control: 'boolean' },
    showMinMaxLabels: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    changed: { action: 'changed' },
  },
  args: {
    label: 'Price range',
    hint: '',
    errorMsg: '',
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    showValue: true,
    showMinMaxLabels: false,
    disabled: false,
    required: false,
  },
};

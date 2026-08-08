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
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    min: { control: 'number', min: -1000, max: 1000, maxLength: 5 },
    max: { control: 'number', min: -1000, max: 1000, maxLength: 5 },
    step: { control: 'number', min: 0, max: 1000, maxLength: 4 },
    showValue: { control: 'boolean' },
    showMinMaxLabels: { control: 'boolean' },
    groupThousands: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    changed: { action: 'changed' },
    triggerError: { control: 'boolean', demoOnly: true },
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
    groupThousands: true,
    disabled: false,
    required: false,
    triggerError: false,
  },
};

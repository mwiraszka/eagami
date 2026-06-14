import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Slider demo's interactive controls. Consumed by
 * `slider.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const SLIDER_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    min: { control: 'number', min: -1000, max: 1000, maxLength: 5 },
    max: { control: 'number', min: -1000, max: 1000, maxLength: 5 },
    step: { control: 'number', min: 0, max: 1000, maxLength: 4 },
    showValue: { control: 'boolean' },
    showMinMaxLabels: { control: 'boolean' },
    groupThousands: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    hasError: { control: 'boolean' },
    changed: { action: 'changed' },
    triggerError: { control: 'boolean', demoOnly: true },
  },
  args: {
    label: 'Volume',
    size: 'md',
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    showMinMaxLabels: false,
    groupThousands: true,
    disabled: false,
    required: false,
    hasError: false,
    triggerError: false,
  },
};

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
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    showValue: { control: 'boolean' },
    showMinMaxLabels: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    hasError: { control: 'boolean' },
    changed: { action: 'changed' },
  },
  args: {
    label: 'Volume',
    size: 'md',
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    showMinMaxLabels: false,
    disabled: false,
    required: false,
    hasError: false,
  },
};

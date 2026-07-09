import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Number Input demo's interactive controls.
 * Consumed by `number-input.component.stories.ts` (as Storybook
 * `argTypes`/`args`) and by the website's component playground.
 */
export const NUMBER_INPUT_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    min: { control: 'number', maxLength: 6 },
    max: { control: 'number', maxLength: 6 },
    step: { control: 'number', min: 0, max: 1000, maxLength: 6 },
    allowNegative: { control: 'boolean' },
    triggerError: { control: 'boolean', demoOnly: true },
    changed: { action: 'changed' },
    focused: { action: 'focused' },
    blurred: { action: 'blurred' },
  },
  args: {
    label: 'Quantity',
    placeholder: '0',
    size: 'md',
    min: 0,
    max: 100,
    step: 1,
    allowNegative: true,
    disabled: false,
    readonly: false,
    required: false,
    triggerError: false,
  },
};

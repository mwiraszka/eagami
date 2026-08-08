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
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number', min: 0, max: 1000, maxLength: 4 },
    allowNegative: { control: 'boolean' },
    triggerError: { control: 'boolean', demoOnly: true },
    changed: { action: 'changed' },
    focused: { action: 'focused' },
    blurred: { action: 'blurred' },
  },
  args: {
    label: 'Value',
    placeholder: '0',
    size: 'md',
    min: -100,
    max: 100,
    step: 1,
    allowNegative: true,
    disabled: false,
    readonly: false,
    required: false,
    triggerError: false,
  },
};

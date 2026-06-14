import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Checkbox demo's interactive controls. Consumed
 * by `checkbox.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const CHECKBOX_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    count: { control: 'number', min: 0, max: 999, maxLength: 3 },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    changed: { action: 'changed' },
    triggerError: { control: 'boolean', demoOnly: true },
  },
  args: {
    label: 'Accept terms and conditions',
    count: '',
    size: 'md',
    disabled: false,
    required: false,
    indeterminate: false,
    triggerError: false,
  },
};

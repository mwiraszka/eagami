import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Date Picker demo's interactive controls.
 * Consumed by `date-picker.component.stories.ts` (as Storybook `argTypes`/`args`)
 * and by the website's component playground.
 */
export const DATE_PICKER_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    format: {
      control: 'select',
      options: ['short', 'medium', 'long'],
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    changed: { action: 'changed' },
  },
  args: {
    label: 'Appointment date',
    placeholder: 'Pick a date',
    size: 'md',
    format: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  },
};

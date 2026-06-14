import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Time Picker demo's interactive controls.
 * Consumed by `time-picker.component.stories.ts` (as Storybook `argTypes`/`args`)
 * and by the website's component playground.
 */
export const TIME_PICKER_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    format: {
      control: 'select',
      options: ['12h', '24h'],
    },
    includeSeconds: { control: 'boolean' },
    minuteStep: { control: 'number', min: 1, max: 30, maxLength: 2 },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    changed: { action: 'changed' },
    triggerError: { control: 'boolean', demoOnly: true },
  },
  args: {
    label: 'Time',
    placeholder: 'Select time…',
    size: 'md',
    format: '24h',
    includeSeconds: false,
    minuteStep: 1,
    disabled: false,
    readonly: false,
    required: false,
    triggerError: false,
  },
};

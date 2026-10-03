import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Date Picker demo's interactive controls.
 * Consumed by `date-picker.component.stories.ts` (as Storybook `argTypes`/`args`)
 * and by the website's component playground. `weekStartsOn` offers the day by
 * name in place of the input's 0 or 1, the seven `disable*` toggles build
 * the `disabledWeekdays` list, and the `disabledDates` text is parsed into dates
 * and ranges, since neither input is a value a flat knob can hold.
 */
export const DATE_PICKER_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    format: {
      control: 'select',
      options: ['short', 'medium', 'long'],
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    weekStartsOn: {
      control: 'select',
      options: ['Sunday', 'Monday'],
      demoOnly: true,
    },
    disableMondays: { control: 'boolean', demoOnly: true },
    disableTuesdays: { control: 'boolean', demoOnly: true },
    disableWednesdays: { control: 'boolean', demoOnly: true },
    disableThursdays: { control: 'boolean', demoOnly: true },
    disableFridays: { control: 'boolean', demoOnly: true },
    disableSaturdays: { control: 'boolean', demoOnly: true },
    disableSundays: { control: 'boolean', demoOnly: true },
    disabledDates: { control: 'text', demoOnly: true },
    changed: { action: 'changed' },
    triggerError: { control: 'boolean', demoOnly: true },
  },
  args: {
    label: 'Appointment date',
    placeholder: 'mm/dd/yy',
    size: 'md',
    format: 'medium',
    disabled: false,
    readonly: false,
    required: false,
    weekStartsOn: 'Monday',
    disableMondays: false,
    disableTuesdays: false,
    disableWednesdays: false,
    disableThursdays: false,
    disableFridays: false,
    disableSaturdays: false,
    disableSundays: false,
    disabledDates: '',
    triggerError: false,
  },
};

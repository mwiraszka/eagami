import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Form Field demo's interactive controls.
 * Consumed by `form-field.component.stories.ts` (as Storybook `argTypes`/`args`)
 * and by the website's component playground.
 */
export const FORM_FIELD_KNOBS: ComponentKnobs = {
  argTypes: {
    required: { control: 'boolean' },
    triggerError: { control: 'boolean', demoOnly: true },
  },
  args: {
    label: 'Email address',
    hint: 'We only use this to reach you',
    required: false,
    triggerError: false,
  },
};

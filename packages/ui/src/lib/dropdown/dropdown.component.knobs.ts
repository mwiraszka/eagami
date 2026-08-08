import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Dropdown demo's interactive controls.
 * Consumed by `dropdown.component.stories.ts` (as Storybook `argTypes`/`args`)
 * and by the website's component playground. The options list is supplied by
 * the demo, not as a flat knob.
 */
export const DROPDOWN_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    changed: { action: 'changed' },
    triggerError: { control: 'boolean', demoOnly: true },
  },
  args: {
    label: 'Fruit',
    placeholder: 'Select a fruit…',
    size: 'md',
    disabled: false,
    readonly: false,
    required: false,
    triggerError: false,
  },
};

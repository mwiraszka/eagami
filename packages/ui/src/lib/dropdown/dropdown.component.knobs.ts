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
    groupedOptions: { control: 'boolean', demoOnly: true },
    firstGroup: {
      control: 'select',
      options: ['heading', 'none'],
      if: { arg: 'groupedOptions', eq: true },
      demoOnly: true,
    },
    firstGroupLabel: {
      control: 'text',
      if: { arg: 'firstGroup', eq: 'heading' },
      demoOnly: true,
    },
    secondGroup: {
      control: 'select',
      options: ['heading', 'divider'],
      if: { arg: 'groupedOptions', eq: true },
      demoOnly: true,
    },
    secondGroupLabel: {
      control: 'text',
      if: { arg: 'secondGroup', eq: 'heading' },
      demoOnly: true,
    },
    triggerError: { control: 'boolean', demoOnly: true },
  },
  args: {
    label: 'Fruit',
    placeholder: 'Select a fruit…',
    size: 'md',
    disabled: false,
    readonly: false,
    required: false,
    groupedOptions: false,
    firstGroup: 'heading',
    firstGroupLabel: 'Recently used',
    secondGroup: 'heading',
    secondGroupLabel: 'Everything else',
    triggerError: false,
  },
};

import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Multi-select demo's interactive controls.
 * Consumed by `multi-select.component.stories.ts` (as Storybook `argTypes`/
 * `args`) and by the website's component playground. The options list is
 * supplied by the demo, not as a flat knob.
 */
export const MULTI_SELECT_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    searchable: { control: 'boolean' },
    allowCreate: { control: 'boolean', if: { arg: 'searchable', eq: true } },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    maxVisibleChips: { control: 'number', min: 0, max: 10, maxLength: 2 },
    maxChipWidth: { control: 'text' },
    changed: { action: 'changed' },
    created: { action: 'created' },
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
    label: 'Fruits',
    placeholder: 'Select…',
    size: 'md',
    searchable: true,
    allowCreate: false,
    disabled: false,
    readonly: false,
    required: false,
    optional: false,
    maxVisibleChips: 0,
    maxChipWidth: '200px',
    groupedOptions: false,
    firstGroup: 'heading',
    firstGroupLabel: 'Recently used',
    secondGroup: 'heading',
    secondGroupLabel: 'Everything else',
    triggerError: false,
  },
};

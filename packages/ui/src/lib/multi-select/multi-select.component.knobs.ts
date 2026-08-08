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
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    maxVisibleChips: { control: 'number', min: 0, max: 10, maxLength: 2 },
    changed: { action: 'changed' },
    triggerError: { control: 'boolean', demoOnly: true },
  },
  args: {
    label: 'Fruits',
    placeholder: 'Select…',
    size: 'md',
    searchable: true,
    disabled: false,
    readonly: false,
    required: false,
    maxVisibleChips: 0,
    triggerError: false,
  },
};

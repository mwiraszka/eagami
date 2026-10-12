import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Toggle Chip demo's interactive controls.
 * Consumed by `toggle-chip.component.stories.ts` (as Storybook `argTypes`/`args`)
 * and by the website's component playground.
 */
export const TOGGLE_CHIP_KNOBS: ComponentKnobs = {
  argTypes: {
    label: { control: 'text', demoOnly: true },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    changed: { action: 'changed' },
  },
  args: {
    label: 'Dark mode',
    size: 'md',
    selected: false,
    disabled: false,
  },
};

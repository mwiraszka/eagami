import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Tag demo's interactive controls. Consumed by
 * `tag.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const TAG_KNOBS: ComponentKnobs = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    maxWidth: { control: 'number', min: 0, max: 400, step: 10, maxLength: 3 },
    tooltip: { control: 'select', options: ['auto', 'none'] },
    removable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    removeLabel: { if: { arg: 'removable', eq: true } },
    removed: { action: 'removed' },
  },
  args: {
    variant: 'default',
    size: 'md',
    maxWidth: 0,
    tooltip: 'auto',
    removable: false,
    disabled: false,
    removeLabel: 'Remove tag',
  },
};

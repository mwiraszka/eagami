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
    maxWidth: { control: 'number', min: 40, max: 400, step: 10, maxLength: 3 },
    color: { control: 'color' },
    tooltip: { control: 'select', options: ['above', 'below', 'none'] },
    removable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    uppercase: { control: 'boolean' },
    removeLabel: { if: { arg: 'removable', eq: true } },
    removed: { action: 'removed' },
  },
  args: {
    variant: 'default',
    size: 'md',
    maxWidth: 200,
    color: '',
    tooltip: 'above',
    removable: false,
    disabled: false,
    uppercase: false,
    removeLabel: 'Remove tag',
  },
};

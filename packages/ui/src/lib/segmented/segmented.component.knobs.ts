import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Segmented demo's interactive controls.
 * Consumed by `segmented.component.stories.ts` (as Storybook `argTypes`/`args`)
 * and by the website's component playground. The options list is supplied by
 * the demo, not as a flat knob.
 */
export const SEGMENTED_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    changed: { action: 'changed' },
  },
  args: {
    label: 'View',
    size: 'md',
    fullWidth: false,
    disabled: false,
    required: false,
  },
};

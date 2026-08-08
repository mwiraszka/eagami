import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Tree demo's interactive controls.
 * Consumed by `tree.component.stories.ts` (as Storybook `argTypes`/`args`)
 * and by the website's component playground.
 */
export const TREE_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    nodeClick: { action: 'nodeClick' },
  },
  args: {
    size: 'md',
    disabled: false,
    ariaLabel: 'File tree',
  },
};

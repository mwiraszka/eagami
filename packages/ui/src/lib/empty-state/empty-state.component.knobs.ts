import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Empty State demo's interactive controls.
 * Consumed by `empty-state.component.stories.ts` (as Storybook
 * `argTypes`/`args`) and by the website's component playground.
 */
export const EMPTY_STATE_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    headingLevel: {
      control: 'select',
      options: ['h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
  args: {
    title: 'No items yet',
    description: 'Get started by creating your first item.',
    size: 'md',
    headingLevel: 'h2',
  },
};

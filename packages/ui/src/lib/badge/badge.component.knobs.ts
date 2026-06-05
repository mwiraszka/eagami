import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Badge demo's interactive controls. Consumed by
 * `badge.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const BADGE_KNOBS: ComponentKnobs = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['pill', 'pin'],
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    shape: 'pill',
  },
};

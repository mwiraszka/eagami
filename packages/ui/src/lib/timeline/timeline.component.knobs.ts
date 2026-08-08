import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Timeline demo's interactive controls. Consumed
 * by `timeline.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const TIMELINE_KNOBS: ComponentKnobs = {
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    align: {
      control: 'select',
      options: ['start', 'alternate'],
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    orientation: 'vertical',
    align: 'start',
    size: 'md',
  },
};

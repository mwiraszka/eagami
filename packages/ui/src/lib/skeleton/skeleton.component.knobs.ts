import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Skeleton demo's interactive controls. Consumed
 * by `skeleton.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const SKELETON_KNOBS: ComponentKnobs = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circle', 'rect'],
    },
    animated: { control: 'boolean' },
  },
  args: {
    variant: 'text',
    width: '200px',
    height: '120px',
    animated: true,
  },
};

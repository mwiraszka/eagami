import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Divider demo's interactive controls. Consumed
 * by `divider.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const DIVIDER_KNOBS: ComponentKnobs = {
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    thick: { control: 'boolean' },
  },
  args: {
    label: 'OR',
    orientation: 'horizontal',
  },
};

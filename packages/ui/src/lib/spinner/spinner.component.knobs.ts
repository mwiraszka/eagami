import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Spinner demo's interactive controls. Consumed
 * by `spinner.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const SPINNER_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    label: 'Loading',
    size: 'md',
  },
};

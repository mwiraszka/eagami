import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Stepper demo's interactive controls. Consumed
 * by `stepper.component.stories.ts` (as Storybook `argTypes`/`args`) and by
 * the website's component playground.
 */
export const STEPPER_KNOBS: ComponentKnobs = {
  argTypes: {
    linear: { control: 'boolean' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    changed: { action: 'changed' },
  },
  args: {
    linear: false,
    orientation: 'horizontal',
    size: 'md',
  },
};

import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Virtual List demo's interactive controls.
 * Consumed by `virtual-list.component.stories.ts` (as Storybook `argTypes`/`args`)
 * and by the website's component playground.
 */
export const VIRTUAL_LIST_KNOBS: ComponentKnobs = {
  argTypes: {
    itemHeight: {
      control: 'number',
      min: 20,
      max: 120,
      step: 4,
      maxLength: 3,
    },
    overscan: {
      control: 'number',
      min: 0,
      max: 20,
      maxLength: 2,
    },
    viewportHeight: {
      control: 'number',
      min: 100,
      max: 800,
      step: 50,
      maxLength: 3,
    },
    scrollIndexChange: { action: 'scrollIndexChange' },
  },
  args: {
    itemHeight: 44,
    overscan: 3,
    viewportHeight: 360,
  },
};

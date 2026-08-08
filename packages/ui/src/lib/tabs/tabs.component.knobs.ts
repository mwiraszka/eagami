import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Tabs demo's interactive controls. Consumed by
 * `tabs.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const TABS_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['underline', 'filled'],
    },
    changed: { action: 'changed' },
  },
  args: {
    size: 'md',
    variant: 'underline',
  },
};

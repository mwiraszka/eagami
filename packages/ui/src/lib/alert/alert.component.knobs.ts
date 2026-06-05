import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Alert demo's interactive controls. Consumed by
 * `alert.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const ALERT_KNOBS: ComponentKnobs = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    dismissible: { control: 'boolean' },
    dismissed: { action: 'dismissed' },
  },
  args: {
    variant: 'default',
    dismissible: false,
  },
};

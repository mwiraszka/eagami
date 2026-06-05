import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Switch demo's interactive controls. Consumed by
 * `switch.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const SWITCH_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    changed: { action: 'changed' },
  },
  args: {
    label: 'Toggle me',
    size: 'md',
    disabled: false,
    required: false,
  },
};

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
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    changed: { action: 'changed' },
    triggerError: { control: 'boolean', demoOnly: true },
  },
  args: {
    label: 'Toggle me',
    size: 'md',
    variant: 'default',
    disabled: false,
    required: false,
    triggerError: false,
  },
};

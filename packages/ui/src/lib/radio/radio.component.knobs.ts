import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Radio demo's interactive controls. Consumed by
 * `radio.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const RADIO_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    disabled: { control: 'boolean' },
    triggerError: { control: 'boolean', demoOnly: true },
  },
  args: {
    label: 'Apple',
    size: 'md',
    disabled: false,
    triggerError: false,
  },
};

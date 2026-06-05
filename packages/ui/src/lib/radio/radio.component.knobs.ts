import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Radio demo's interactive controls. Consumed by
 * `radio.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const RADIO_KNOBS: ComponentKnobs = {
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Apple',
    disabled: false,
  },
};

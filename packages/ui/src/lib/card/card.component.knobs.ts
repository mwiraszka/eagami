import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Card demo's interactive controls. Consumed by
 * `card.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const CARD_KNOBS: ComponentKnobs = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    headerAlign: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    fullWidth: { control: 'boolean' },
    headerDivider: { control: 'boolean' },
  },
  args: {
    variant: 'elevated',
    padding: 'md',
    headerAlign: 'center',
    fullWidth: false,
    headerDivider: false,
  },
};

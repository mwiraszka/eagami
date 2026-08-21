import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Button demo's interactive controls. Consumed by
 * `button.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const BUTTON_KNOBS: ComponentKnobs = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    uppercase: { control: 'boolean' },
    clicked: { action: 'clicked' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    fullWidth: false,
    uppercase: false,
  },
};

import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Menu demo's interactive controls. Consumed by
 * `menu.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const MENU_KNOBS: ComponentKnobs = {
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
    },
    ariaLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    maxHeight: { control: 'text' },
    opened: { action: 'opened' },
    closed: { action: 'closed' },
  },
  args: {
    placement: 'bottom-start',
    ariaLabel: 'Actions menu',
    disabled: false,
    maxHeight: '20rem',
  },
};

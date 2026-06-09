import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Transfer List demo's interactive controls.
 * Consumed by `transfer-list.component.stories.ts` (as Storybook `argTypes`/`args`)
 * and by the website's component playground.
 */
export const TRANSFER_LIST_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    disabled: { control: 'boolean' },
    sourceLabel: { control: 'text' },
    targetLabel: { control: 'text' },
  },
  args: {
    size: 'md',
    disabled: false,
    sourceLabel: '',
    targetLabel: '',
  },
};

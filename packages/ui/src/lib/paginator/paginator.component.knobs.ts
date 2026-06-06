import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Paginator demo's interactive controls. Consumed
 * by `paginator.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const PAGINATOR_KNOBS: ComponentKnobs = {
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    showPageSizeSelector: { control: 'boolean' },
    showRangeLabel: { control: 'boolean' },
    disabled: { control: 'boolean' },
    totalItems: { control: 'number' },
    changed: { action: 'changed' },
  },
  args: {
    totalItems: 100,
    align: 'right',
    showPageSizeSelector: true,
    showRangeLabel: true,
    disabled: false,
  },
};

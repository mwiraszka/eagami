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
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    showPageSizeSelector: { control: 'boolean' },
    showRangeLabel: { control: 'boolean' },
    showAllOption: { control: 'boolean' },
    pageSizeLabel: {
      control: 'select',
      options: [
        'rows',
        'items',
        'results',
        'products',
        'records',
        'entries',
        'posts',
        'articles',
      ],
    },
    groupThousands: { control: 'boolean' },
    disabled: { control: 'boolean' },
    totalItems: { control: 'number', min: 0, max: 1000000, maxLength: 7 },
    changed: { action: 'changed' },
  },
  args: {
    totalItems: 1000,
    align: 'right',
    size: 'md',
    showPageSizeSelector: true,
    showRangeLabel: true,
    showAllOption: false,
    pageSizeLabel: 'rows',
    groupThousands: true,
    disabled: false,
  },
};

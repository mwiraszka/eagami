import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Data Table demo's interactive controls.
 * Consumed by `data-table.component.stories.ts` (as Storybook `argTypes`/`args`)
 * and by the website's component playground. The columns and data inputs are
 * supplied as fixed sample data by the demo rather than as flat knobs.
 */
export const DATA_TABLE_KNOBS: ComponentKnobs = {
  argTypes: {
    density: {
      control: 'select',
      options: ['compact', 'comfortable', 'spacious'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    striped: { control: 'boolean' },
    bordered: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
    navigable: { control: 'boolean' },
    clickable: { control: 'boolean' },
    sorted: { action: 'sorted' },
    rowActivate: { action: 'rowActivate' },
  },
  args: {
    density: 'comfortable',
    size: 'md',
    striped: false,
    bordered: false,
    hoverable: true,
    stickyHeader: false,
    navigable: false,
    clickable: false,
  },
};

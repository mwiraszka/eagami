import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Data Table demo's interactive controls.
 * Consumed by `data-table.component.stories.ts` (as Storybook `argTypes`/`args`)
 * and by the website's component playground. The columns and data inputs are
 * supplied as fixed sample data by the demo rather than as flat knobs.
 */
export const DATA_TABLE_KNOBS: ComponentKnobs = {
  argTypes: {
    caption: { control: 'text' },
    density: {
      control: 'select',
      options: ['compact', 'comfortable', 'spacious'],
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    striped: { control: 'boolean' },
    bordered: { control: 'boolean' },
    nowrap: { control: 'boolean' },
    layout: {
      control: 'select',
      options: ['auto', 'fixed'],
    },
    hoverable: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
    navigable: { control: 'boolean' },
    clickable: { control: 'boolean' },
    loading: { control: 'boolean' },
    loadingRowCount: {
      control: 'number',
      min: 0,
      max: 20,
      maxLength: 2,
      if: { arg: 'loading', eq: true },
    },
    sorted: { action: 'sorted' },
    rowActivate: { action: 'rowActivate' },
    rowContextMenu: { action: 'rowContextMenu' },
  },
  args: {
    caption: '',
    density: 'comfortable',
    size: 'md',
    striped: false,
    bordered: false,
    nowrap: false,
    layout: 'auto',
    hoverable: true,
    stickyHeader: false,
    navigable: false,
    clickable: false,
    loading: false,
    loadingRowCount: 5,
  },
};

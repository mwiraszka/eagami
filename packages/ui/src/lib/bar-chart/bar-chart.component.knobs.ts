import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Bar Chart demo's interactive controls.
 * Consumed by `bar-chart.component.stories.ts` (as Storybook
 * `argTypes`/`args`) and by the website's component playground.
 */
export const BAR_CHART_KNOBS: ComponentKnobs = {
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    animation: {
      control: 'select',
      options: ['grow', 'cascade', 'fade', 'none'],
    },
    animationDuration: { control: 'number', min: 0, max: 5000, step: 100, maxLength: 4 },
    height: { control: 'number', min: 120, max: 600, step: 20, maxLength: 3 },
    stacked: { control: 'boolean' },
    showValues: { control: 'boolean' },
    showGrid: { control: 'boolean' },
    showLegend: { control: 'boolean' },
  },
  args: {
    orientation: 'vertical',
    size: 'md',
    animation: 'grow',
    animationDuration: 600,
    height: 240,
    stacked: false,
    showValues: false,
    showGrid: true,
    showLegend: true,
  },
};

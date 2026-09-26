import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Pie Chart demo's interactive controls.
 * Consumed by `pie-chart.component.stories.ts` (as Storybook
 * `argTypes`/`args`) and by the website's component playground.
 */
export const PIE_CHART_KNOBS: ComponentKnobs = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['pie', 'donut'],
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    animation: {
      control: 'select',
      options: ['sweep', 'grow', 'fade', 'none'],
    },
    animationDuration: { control: 'number', min: 0, max: 5000, step: 100, maxLength: 4 },
    height: { control: 'number', min: 120, max: 600, step: 20, maxLength: 3 },
    showLegend: { control: 'boolean' },
    showPercentages: { control: 'boolean', if: { arg: 'showLegend', eq: true } },
  },
  args: {
    variant: 'pie',
    size: 'md',
    animation: 'sweep',
    animationDuration: 600,
    height: 240,
    showLegend: true,
    showPercentages: true,
  },
};

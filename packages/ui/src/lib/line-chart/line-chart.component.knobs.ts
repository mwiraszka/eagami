import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Line Chart demo's interactive controls.
 * Consumed by `line-chart.component.stories.ts` (as Storybook
 * `argTypes`/`args`) and by the website's component playground.
 */
export const LINE_CHART_KNOBS: ComponentKnobs = {
  argTypes: {
    curve: {
      control: 'select',
      options: ['linear', 'smooth', 'step'],
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    animation: {
      control: 'select',
      options: ['draw', 'reveal', 'fade', 'rise', 'none'],
    },
    animationDuration: {
      control: 'number',
      min: 0,
      max: 5000,
      step: 100,
      maxLength: 4,
    },
    height: { control: 'number', min: 120, max: 600, step: 20, maxLength: 3 },
    showArea: { control: 'boolean' },
    showPoints: { control: 'boolean' },
    showGrid: { control: 'boolean' },
    showLegend: { control: 'boolean' },
  },
  args: {
    curve: 'smooth',
    size: 'md',
    animation: 'draw',
    animationDuration: 600,
    height: 240,
    showArea: false,
    showPoints: true,
    showGrid: true,
    showLegend: true,
  },
};

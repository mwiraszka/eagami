import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Sparkline demo's interactive controls.
 * Consumed by `sparkline.component.stories.ts` (as Storybook
 * `argTypes`/`args`) and by the website's component playground.
 */
export const SPARKLINE_KNOBS: ComponentKnobs = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'area', 'bar'],
    },
    curve: {
      control: 'select',
      options: ['linear', 'smooth', 'step'],
      if: { arg: 'variant', neq: 'bar' },
    },
    markers: {
      control: 'select',
      options: ['none', 'last', 'extremes', 'all'],
    },
    startAtZero: { control: 'boolean', if: { arg: 'variant', neq: 'bar' } },
    showTooltip: { control: 'boolean' },
    animation: {
      control: 'select',
      options: ['draw', 'fade', 'none'],
    },
    animationDuration: {
      control: 'number',
      unit: 'ms',
      min: 0,
      max: 5000,
      step: 100,
      maxLength: 4,
    },
    height: { control: 'number', unit: 'px', min: 16, max: 200, step: 4, maxLength: 3 },
    color: { control: 'color' },
  },
  args: {
    variant: 'area',
    curve: 'smooth',
    markers: 'last',
    startAtZero: false,
    showTooltip: false,
    animation: 'draw',
    animationDuration: 600,
    height: 48,
    color: '',
  },
};

import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Progress Bar demo's interactive controls.
 * Consumed by `progress-bar.component.stories.ts` (as Storybook
 * `argTypes`/`args`) and by the website's component playground.
 */
export const PROGRESS_BAR_KNOBS: ComponentKnobs = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    value: { control: 'number', if: { arg: 'indeterminate', eq: false } },
    max: { control: 'number', if: { arg: 'indeterminate', eq: false } },
    showPercentage: { control: 'boolean', if: { arg: 'indeterminate', eq: false } },
    indeterminate: { control: 'boolean' },
  },
  args: {
    label: 'Uploading files',
    value: 60,
    max: 100,
    variant: 'default',
    size: 'md',
    showPercentage: true,
    indeterminate: false,
  },
};

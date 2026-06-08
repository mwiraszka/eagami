import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Rating demo's interactive controls. Consumed by
 * `rating.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const RATING_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    min: { control: 'number', min: 0, max: 10, maxLength: 2 },
    max: { control: 'number', min: 1, max: 10, maxLength: 2 },
    allowHalf: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    clearable: { control: 'boolean' },
    hoverChanged: { action: 'hoverChanged' },
  },
  args: {
    label: 'Rate your experience',
    size: 'md',
    min: 0,
    max: 5,
    allowHalf: false,
    readonly: false,
    disabled: false,
    required: false,
    clearable: true,
  },
};

import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Eagami Wordmark demo's interactive controls.
 * Consumed by `eagami-wordmark.component.stories.ts` (as Storybook
 * `argTypes`/`args`) and by the website's component playground.
 */
export const EAGAMI_WORDMARK_KNOBS: ComponentKnobs = {
  argTypes: {
    variant: { control: 'number' },
    layout: {
      control: 'select',
      options: ['stacked', 'inline'],
    },
    size: { control: 'number' },
  },
  args: {
    variant: 1,
    layout: 'stacked',
    size: 32,
  },
};

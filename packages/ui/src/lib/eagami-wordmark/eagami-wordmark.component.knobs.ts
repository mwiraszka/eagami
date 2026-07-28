import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Eagami Wordmark demo's interactive controls.
 * Consumed by `eagami-wordmark.component.stories.ts` (as Storybook
 * `argTypes`/`args`) and by the website's component playground.
 */
export const EAGAMI_WORDMARK_KNOBS: ComponentKnobs = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'byline', 'tagline'],
    },
    layout: {
      control: 'select',
      options: ['stacked', 'inline'],
    },
    size: { control: 'number', min: 10, max: 512, maxLength: 3 },
    linked: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    layout: 'stacked',
    size: 24,
    linked: true,
  },
};

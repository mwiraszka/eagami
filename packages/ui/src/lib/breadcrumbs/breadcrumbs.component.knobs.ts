import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Breadcrumbs demo's interactive controls.
 * Consumed by `breadcrumbs.component.stories.ts` (as Storybook `argTypes`/`args`)
 * and by the website's component playground. `width` narrows the container the
 * trail sits in, which is what brings `overflow` into play.
 */
export const BREADCRUMBS_KNOBS: ComponentKnobs = {
  argTypes: {
    separator: {
      control: 'select',
      options: ['chevron', 'slash'],
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    maxItems: { control: 'number', min: 2, max: 10, maxLength: 2 },
    overflow: {
      control: 'select',
      options: ['menu', 'scroll'],
    },
    width: {
      control: 'number',
      unit: 'px',
      min: 120,
      max: 1200,
      step: 20,
      maxLength: 4,
      demoOnly: true,
    },
    ariaLabel: { control: 'text' },
    clicked: { action: 'clicked' },
  },
  args: {
    separator: 'chevron',
    size: 'md',
    maxItems: '',
    overflow: 'menu',
    width: '',
    ariaLabel: '',
  },
};

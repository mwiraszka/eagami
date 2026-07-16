import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Breadcrumbs demo's interactive controls.
 * Consumed by `breadcrumbs.component.stories.ts` (as Storybook `argTypes`/`args`)
 * and by the website's component playground.
 */
export const BREADCRUMBS_KNOBS: ComponentKnobs = {
  argTypes: {
    separator: {
      control: 'select',
      options: ['chevron', 'slash'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    ariaLabel: { control: 'text' },
    clicked: { action: 'clicked' },
  },
  args: {
    separator: 'chevron',
    size: 'md',
    ariaLabel: '',
  },
};

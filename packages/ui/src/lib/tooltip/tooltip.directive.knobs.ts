import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Tooltip demo's interactive controls. Consumed by
 * `tooltip.directive.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground. `eaTooltip` is the directive's own (and required)
 * text input.
 */
export const TOOLTIP_KNOBS: ComponentKnobs = {
  argTypes: {
    tooltipPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  args: {
    eaTooltip: 'Tooltips add extra context on hover or focus',
    tooltipPosition: 'top',
  },
};

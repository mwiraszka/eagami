import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Tooltip demo's interactive controls. Consumed by
 * `tooltip.directive.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground. `eaTooltip` is the directive's own (and required)
 * content input; the knob drives it with a string, though it also accepts a
 * TemplateRef.
 */
export const TOOLTIP_KNOBS: ComponentKnobs = {
  argTypes: {
    tooltipPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    maxWidth: { control: 'number', min: 50, max: 400, maxLength: 3 },
    dismissDelay: { control: 'number', min: 0, max: 1000, step: 50, maxLength: 4 },
    flip: { control: 'boolean' },
    whenClipped: { control: 'boolean' },
  },
  args: {
    eaTooltip: 'Tooltips add extra context on hover or focus',
    tooltipPosition: 'top',
    maxWidth: 200,
    dismissDelay: 150,
    flip: true,
    whenClipped: false,
  },
};

import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Accordion demo's interactive controls. Consumed
 * by `accordion.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground. The accordion items themselves are edited
 * through the playground's custom controls, not as flat knobs.
 */
export const ACCORDION_KNOBS: ComponentKnobs = {
  argTypes: {
    multi: { control: 'boolean' },
    headingLevel: { control: 'number', min: 1, max: 6, step: 1, maxLength: 1 },
  },
  args: {
    multi: false,
    headingLevel: 3,
  },
};

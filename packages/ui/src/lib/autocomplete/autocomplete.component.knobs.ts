import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Autocomplete demo's interactive controls.
 * Consumed by `autocomplete.component.stories.ts` (as Storybook `argTypes`/
 * `args`) and by the website's component playground. The options list is edited
 * through the playground's custom controls, not as a flat knob.
 */
export const AUTOCOMPLETE_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    minLength: { control: 'number', min: 0, max: 10, maxLength: 2 },
    maxResults: { control: 'number', min: 1, max: 50, maxLength: 2 },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    label: 'Dog breed',
    placeholder: 'Start typing…',
    size: 'md',
    minLength: 0,
    maxResults: 10,
    disabled: false,
    readonly: false,
    required: false,
  },
};

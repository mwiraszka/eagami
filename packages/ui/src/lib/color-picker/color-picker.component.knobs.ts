import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Color Picker demo's interactive controls.
 * Consumed by `color-picker.component.stories.ts` (as Storybook
 * `argTypes`/`args`) and by the website's component playground.
 */
export const COLOR_PICKER_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    format: {
      control: 'select',
      options: ['all', 'hex', 'rgb', 'hsl'],
    },
    showAlpha: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    changed: { action: 'changed' },
    triggerError: { control: 'boolean', demoOnly: true },
  },
  args: {
    label: 'Color',
    placeholder: 'Pick a color…',
    size: 'md',
    format: 'all',
    showAlpha: true,
    disabled: false,
    readonly: false,
    required: false,
    triggerError: false,
  },
};

import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Code Input demo's interactive controls.
 * Consumed by `code-input.component.stories.ts` (as Storybook `argTypes`/`args`)
 * and by the website's component playground.
 */
export const CODE_INPUT_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    length: { control: 'number', min: 1, max: 12, maxLength: 2 },
    allowAllChars: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    completed: { action: 'completed' },
  },
  args: {
    label: 'Verification code',
    placeholder: '',
    length: 6,
    size: 'md',
    allowAllChars: false,
    disabled: false,
    readonly: false,
    required: false,
  },
};

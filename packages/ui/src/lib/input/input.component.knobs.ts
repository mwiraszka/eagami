import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Input demo's interactive controls. Consumed by
 * `input.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const INPUT_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    autocomplete: {
      control: 'select',
      options: [
        'off',
        'on',
        'email',
        'username',
        'name',
        'tel',
        'url',
        'current-password',
        'new-password',
      ],
    },
    autofocus: { control: 'boolean' },
    showPasswordToggle: { control: 'boolean', if: { arg: 'type', eq: 'password' } },
    clearable: { control: 'boolean' },
    focused: { action: 'focused' },
    blurred: { action: 'blurred' },
  },
  args: {
    label: 'Label',
    placeholder: 'Enter text…',
    size: 'md',
    type: 'text',
    disabled: false,
    readonly: false,
    required: false,
    autofocus: false,
    showPasswordToggle: true,
    clearable: false,
  },
};

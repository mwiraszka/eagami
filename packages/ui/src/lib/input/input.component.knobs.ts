import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Input demo's interactive controls. Consumed by
 * `input.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground. The `typedPlaceholder` hints are supplied by
 * the demo, not as a flat knob.
 */
export const INPUT_KNOBS: ComponentKnobs = {
  argTypes: {
    labelHelp: { control: 'text' },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url'],
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
    keepIcon: { control: 'boolean' },
    typedHints: { control: 'boolean', demoOnly: true },
    triggerError: { control: 'boolean', demoOnly: true },
    changed: { action: 'changed' },
    focused: { action: 'focused' },
    blurred: { action: 'blurred' },
  },
  args: {
    label: 'Label',
    labelHelp: '',
    placeholder: 'Enter text…',
    size: 'md',
    type: 'text',
    disabled: false,
    readonly: false,
    required: false,
    optional: false,
    autofocus: false,
    showPasswordToggle: true,
    clearable: false,
    keepIcon: true,
    typedHints: false,
    triggerError: false,
  },
};

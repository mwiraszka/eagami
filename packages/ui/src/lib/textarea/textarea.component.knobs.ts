import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Textarea demo's interactive controls. Consumed
 * by `textarea.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground. The `typedPlaceholder` hints are supplied by
 * the demo, not as a flat knob.
 */
export const TEXTAREA_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    maxLength: { control: 'number', min: 0, max: 100000, maxLength: 6 },
    showCount: { control: 'boolean' },
    minHeight: { control: 'text' },
    maxHeight: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    changed: { action: 'changed' },
    focused: { action: 'focused' },
    blurred: { action: 'blurred' },
    typedHints: { control: 'boolean', demoOnly: true },
    triggerError: { control: 'boolean', demoOnly: true },
  },
  args: {
    label: 'Message',
    placeholder: 'Enter your message…',
    size: 'md',
    resize: 'vertical',
    maxLength: '',
    showCount: false,
    minHeight: '',
    maxHeight: '',
    disabled: false,
    readonly: false,
    required: false,
    optional: false,
    typedHints: false,
    triggerError: false,
  },
};

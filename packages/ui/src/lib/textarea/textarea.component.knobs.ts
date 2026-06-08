import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Textarea demo's interactive controls. Consumed
 * by `textarea.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const TEXTAREA_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    maxlength: { control: 'number', min: 0, max: 100000, maxLength: 6 },
    minHeight: { control: 'number', min: 0, max: 2000, maxLength: 4 },
    maxHeight: { control: 'number', min: 0, max: 2000, maxLength: 4 },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    focused: { action: 'focused' },
    blurred: { action: 'blurred' },
  },
  args: {
    label: 'Message',
    placeholder: 'Enter your message…',
    size: 'md',
    resize: 'vertical',
    maxlength: '',
    minHeight: '',
    maxHeight: '',
    disabled: false,
    readonly: false,
    required: false,
  },
};

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
      options: ['sm', 'md', 'lg'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    rows: { control: 'number' },
    maxlength: { control: 'number' },
    maxHeight: { control: 'number' },
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
    rows: 3,
    maxlength: 0,
    maxHeight: 0,
    disabled: false,
    readonly: false,
    required: false,
  },
};

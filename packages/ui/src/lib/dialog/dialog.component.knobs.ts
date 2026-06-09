import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Dialog demo's interactive controls. Consumed by
 * `dialog.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground. The dialog's open state is driven by a trigger
 * button in the demo rather than a flat knob.
 */
export const DIALOG_KNOBS: ComponentKnobs = {
  argTypes: {
    width: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    showClose: { control: 'boolean' },
    opened: { action: 'opened' },
    closed: { action: 'closed' },
  },
  args: {
    width: 'md',
    closeOnBackdrop: true,
    closeOnEscape: true,
    showClose: true,
  },
};

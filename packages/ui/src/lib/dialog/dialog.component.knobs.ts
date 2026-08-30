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
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
    modal: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    showClose: { control: 'boolean' },
    closeDisabled: { control: 'boolean', if: { arg: 'showClose', eq: true } },
    manualClose: { control: 'boolean' },
    opened: { action: 'opened' },
    closed: { action: 'closed' },
    closeRequested: { action: 'closeRequested' },
  },
  args: {
    width: 'md',
    modal: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
    showClose: true,
    closeDisabled: false,
    manualClose: false,
  },
};

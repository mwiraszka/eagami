import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Popover demo's interactive controls. Consumed by
 * `popover.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground. The popover's open state is driven by a trigger
 * button in the demo rather than a flat knob.
 */
export const POPOVER_KNOBS: ComponentKnobs = {
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'right',
      ],
    },
    role: {
      control: 'select',
      options: ['menu', 'listbox', 'dialog', 'tooltip', 'grid'],
    },
    scrollBehavior: {
      control: 'select',
      options: ['reposition', 'close', 'ignore'],
    },
    offset: { control: 'number', min: 0, max: 64, maxLength: 2 },
    flip: { control: 'boolean' },
    clamp: { control: 'boolean' },
    matchAnchorWidth: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    closeOnOutsideClick: { control: 'boolean' },
    closeRequested: { action: 'closeRequested' },
  },
  args: {
    placement: 'bottom-start',
    role: 'dialog',
    scrollBehavior: 'reposition',
    offset: 2,
    flip: true,
    clamp: true,
    matchAnchorWidth: false,
    closeOnEscape: true,
    closeOnOutsideClick: true,
  },
};

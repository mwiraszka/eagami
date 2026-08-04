import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Knob spec for the Toast demo. `<ea-toast>` is the outlet: toasts are pushed
 * through `ToastService`, while `position` and `clearable` configure the stack.
 * The demo drives the playground with trigger buttons for each variant.
 */
export const TOAST_KNOBS: ComponentKnobs = {
  argTypes: {
    position: {
      control: 'select',
      options: ['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    clearable: { control: 'boolean' },
  },
  args: {
    position: 'bottom-right',
    size: 'sm',
    clearable: true,
  },
};

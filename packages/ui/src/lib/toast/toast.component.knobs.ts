import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Knob spec for the Toast demo. `<ea-toast>` is the outlet only: toasts are
 * pushed through `ToastService`, so it exposes no inputs to knob. The demo drives
 * the playground with trigger buttons instead, and this empty spec keeps the
 * generated snippet to the bare `<ea-toast />` outlet.
 */
export const TOAST_KNOBS: ComponentKnobs = {
  argTypes: {},
  args: {},
};

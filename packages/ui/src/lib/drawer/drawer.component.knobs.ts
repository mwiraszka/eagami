import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Drawer demo's interactive controls. Consumed by
 * `drawer.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground. The drawer's open state is driven by a trigger
 * button in the demo rather than a flat knob.
 */
export const DRAWER_KNOBS: ComponentKnobs = {
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    width: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    animated: { control: 'boolean' },
    showClose: { control: 'boolean' },
    opened: { action: 'opened' },
    closed: { action: 'closed' },
  },
  args: {
    position: 'right',
    width: 'md',
    closeOnBackdrop: true,
    closeOnEscape: true,
    animated: true,
    showClose: true,
  },
};

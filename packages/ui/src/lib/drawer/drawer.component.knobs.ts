import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Drawer demo's interactive controls. Consumed by
 * `drawer.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground. The drawer's open state is driven by a trigger
 * button in the demo rather than a flat knob.
 */
export const DRAWER_KNOBS: ComponentKnobs = {
  argTypes: {
    mode: {
      control: 'select',
      options: ['overlay', 'push'],
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    animation: {
      control: 'select',
      options: ['none', 'linear', 'eased'],
    },
    showClose: { control: 'boolean' },
    opened: { action: 'opened' },
    closed: { action: 'closed' },
  },
  args: {
    mode: 'overlay',
    position: 'right',
    size: 'md',
    closeOnBackdrop: true,
    closeOnEscape: true,
    animation: 'eased',
    showClose: true,
  },
};

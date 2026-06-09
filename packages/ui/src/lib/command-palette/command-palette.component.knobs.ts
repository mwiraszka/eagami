import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Command Palette demo's interactive controls.
 * Consumed by `command-palette.component.stories.ts` (as Storybook
 * `argTypes`/`args`) and by the website's component playground. The items list
 * and open state are supplied by the demo rather than as flat knobs.
 */
export const COMMAND_PALETTE_KNOBS: ComponentKnobs = {
  argTypes: {
    execute: { action: 'execute' },
  },
  args: {
    placeholder: 'Type a command or search…',
    emptyMessage: 'No matching commands',
  },
};

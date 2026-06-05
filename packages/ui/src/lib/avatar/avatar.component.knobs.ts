import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Avatar demo's interactive controls. Consumed by
 * `avatar.component.stories.ts` (as Storybook `argTypes`/`args`) and by the
 * website's component playground.
 */
export const AVATAR_KNOBS: ComponentKnobs = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
  },
  args: {
    src: '',
    initials: 'MW',
    alt: 'User avatar',
    size: 'md',
    shape: 'circle',
  },
};

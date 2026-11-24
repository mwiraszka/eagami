import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the Avatar Editor demo's interactive controls.
 * Consumed by `avatar-editor.component.stories.ts` (as Storybook `argTypes`/
 * `args`) and by the website's component playground.
 */
export const AVATAR_EDITOR_KNOBS: ComponentKnobs = {
  argTypes: {
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
    canvasSize: { control: 'number', unit: 'px', min: 100, max: 400, maxLength: 3 },
    aspectRatio: { control: 'number', min: 0.25, max: 4, step: 0.1, maxLength: 4 },
    displayWidth: { control: 'number', unit: 'px', min: 0, max: 4000, maxLength: 4 },
    minZoom: { control: 'number', min: 1, max: 10, maxLength: 2 },
    maxZoom: { control: 'number', min: 1, max: 10, maxLength: 2 },
    letterbox: { control: 'boolean' },
    loading: { control: 'boolean' },
    cropped: { action: 'cropped' },
    removed: { action: 'removed' },
    fileSelected: { action: 'fileSelected' },
    errored: { action: 'errored' },
    cropStateChanged: { action: 'cropStateChanged' },
  },
  args: {
    shape: 'circle',
    canvasSize: 200,
    aspectRatio: 1,
    displayWidth: 0,
    minZoom: 1,
    maxZoom: 3,
    letterbox: false,
    loading: false,
  },
};

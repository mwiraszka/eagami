import type { PlaygroundKnob } from './knob';

/** How a demo's overlay is opened: by a plain click, or as a context menu. */
export type DemoOpensOn = 'click' | 'right-click';

/** Docs-only knob that switches a demo's trigger between a button and a right-click area. */
export const OPENS_ON_KNOB: PlaygroundKnob = {
  name: 'opensOn',
  control: 'select',
  options: ['click', 'right-click'],
  default: 'click',
  demoOnly: true,
};

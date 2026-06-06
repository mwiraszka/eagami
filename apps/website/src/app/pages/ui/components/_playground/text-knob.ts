import type { PlaygroundKnob } from './knob';

/**
 * Builds a docs-only playground knob for a component's projected text content
 * (rendered via `<ng-content>`, so it has no matching input). The demo renders
 * the value as the element's content, and the snippet emits it as inner text
 * rather than an attribute.
 */
export function textKnob(text: string): PlaygroundKnob {
  return {
    name: 'text',
    control: 'content',
    options: [],
    default: text,
  };
}

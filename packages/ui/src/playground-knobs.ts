import { INPUT_KNOBS } from './lib/input/input.component.knobs';

export type {
  ComponentKnobs,
  KnobArgType,
  KnobArgValue,
  KnobCondition,
} from './playground-knobs.types';

/**
 * Registry of component knob specs keyed by website slug. The website's
 * component playground looks up the active component's knobs here. Deliberately
 * NOT re-exported from `public-api`: this is demo metadata for the docs site,
 * not part of the published `@eagami/ui` surface.
 */
export const PLAYGROUND_KNOBS = {
  input: INPUT_KNOBS,
} as const;

export type PlaygroundKnobSlug = keyof typeof PLAYGROUND_KNOBS;

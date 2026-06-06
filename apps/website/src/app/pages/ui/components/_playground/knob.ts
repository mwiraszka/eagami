import type { ComponentKnobs, KnobArgValue, KnobCondition } from '@eagami/ui-knobs';

import type { ApiProp, ComponentApi } from '@app/data/ui-api.generated';

export type KnobControl =
  | 'select'
  | 'boolean'
  | 'text'
  | 'number'
  | 'color'
  | 'icon'
  | 'content';
export type KnobValue = string | number | boolean;
export type KnobState = Record<string, KnobValue>;

export interface PlaygroundKnob {
  name: string;
  control: KnobControl;
  options: readonly string[];
  /** The component's own default, used to diff for the code snippet. */
  default: KnobValue;
  /** For `color` controls: the CSS custom property the value writes. */
  cssVar?: string;
  /** When set, the control is disabled unless the referenced knob matches. */
  condition?: KnobCondition;
}

/** Whether a conditional knob is currently active given the live state. */
export function isKnobEnabled(knob: PlaygroundKnob, state: KnobState): boolean {
  return !knob.condition || state[knob.condition.arg] === knob.condition.eq;
}

/** `showPasswordToggle` -> `Show password toggle`; the playground's fallback label. */
export function humanizeKnobName(name: string): string {
  const spaced = name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function controlFallback(control: KnobControl): KnobValue {
  return control === 'boolean' ? false : control === 'number' ? 0 : '';
}

function parseApiDefault(raw: string | undefined, control: KnobControl): KnobValue {
  if (raw == null) {
    return controlFallback(control);
  }
  const trimmed = raw.trim();
  if (trimmed === '' || trimmed === 'undefined' || trimmed === 'null') {
    return controlFallback(control);
  }
  if (trimmed === 'true') {
    return true;
  }
  if (trimmed === 'false') {
    return false;
  }
  const unquoted = trimmed.replace(/^['"`]|['"`]$/g, '');
  if (control === 'number') {
    const parsed = Number(unquoted);
    return Number.isNaN(parsed) ? controlFallback(control) : parsed;
  }
  return unquoted;
}

function inferControl(
  arg: KnobArgValue | undefined,
  api: ApiProp | undefined,
): KnobControl {
  if (typeof arg === 'boolean' || api?.type === 'boolean') {
    return 'boolean';
  }
  if (typeof arg === 'number' || api?.type === 'number') {
    return 'number';
  }
  return 'text';
}

/**
 * Merges a component's knob spec (control hints + initial demo values) with its
 * compodoc-extracted API (authoritative types and defaults) into the renderable
 * knob list. The spec supplies enum option lists and curation; the API supplies
 * the real defaults the code snippet diffs against.
 */
export function buildKnobs(
  spec: ComponentKnobs,
  api: ComponentApi | undefined,
): PlaygroundKnob[] {
  const names: string[] = [...Object.keys(spec.args)];
  for (const name of Object.keys(spec.argTypes)) {
    if (!names.includes(name)) {
      names.push(name);
    }
  }

  const knobs: PlaygroundKnob[] = [];
  for (const name of names) {
    const argType = spec.argTypes[name];
    if (argType?.action) {
      continue;
    }
    const apiProp = api?.inputs.find(input => input.name === name);
    const control = argType?.control ?? inferControl(spec.args[name], apiProp);
    knobs.push({
      name,
      control,
      options: argType?.options ?? [],
      default: parseApiDefault(apiProp?.default, control),
      cssVar: argType?.cssVar,
      condition: argType?.if,
    });
  }
  return knobs;
}

export function initialKnobState(
  knobs: PlaygroundKnob[],
  spec: ComponentKnobs,
): KnobState {
  const state: KnobState = {};
  for (const knob of knobs) {
    const initial = spec.args[knob.name];
    state[knob.name] = initial !== undefined ? initial : knob.default;
  }
  return state;
}

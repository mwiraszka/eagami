import { ICONS } from '@eagami/ui';

import type { Type } from '@angular/core';

import type { PlaygroundKnob } from './knob';

/** Sentinel option for "no icon" in an icon-picker knob. */
export const ICON_NONE = 'none';

export interface IconKnobConfig {
  /** Knob name; must match the component input it binds to. Defaults to `icon`. */
  name?: string;
  /** Initial slug. Defaults to the "none" sentinel. */
  default?: string;
  /** Prepend a "none" option for inputs whose icon is optional. Defaults to true. */
  includeNone?: boolean;
}

/**
 * Builds a docs-only playground knob that lets the reader pick one of the
 * library's icons (by slug) for a component's component-class icon input. The
 * library keeps that input typed as a component class for tree-shaking; the demo
 * resolves the chosen slug back to the class via `iconComponentForSlug`, and the
 * generated snippet emits the matching `[<name>]="<Name>IconComponent"`.
 *
 * For an always-present icon (e.g. the rating star), pass `includeNone: false`
 * and a concrete `default` slug so the input never resolves to `undefined`.
 */
export function iconKnob(
  options: readonly string[],
  config: IconKnobConfig = {},
): PlaygroundKnob {
  const { name = 'icon', default: defaultSlug = ICON_NONE, includeNone = true } = config;
  return {
    name,
    control: 'icon',
    options: includeNone ? [ICON_NONE, ...options] : [...options],
    default: defaultSlug,
  };
}

/** Resolves an icon slug to its component class, or undefined for "none". */
export function iconComponentForSlug(slug: string): Type<unknown> | undefined {
  return slug && slug !== ICON_NONE ? ICONS.find(icon => icon.slug === slug) : undefined;
}

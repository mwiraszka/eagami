import { ICONS } from '@eagami/ui';

import type { Type } from '@angular/core';

import type { PlaygroundKnob } from './knob';

/** Sentinel option for "no icon" in an icon-picker knob. */
export const ICON_NONE = 'none';

/**
 * Builds a docs-only playground knob that lets the reader pick one of the
 * library's icons (by slug) for a component's component-class `icon` input. The
 * library keeps that input typed as a component class for tree-shaking; the demo
 * resolves the chosen slug back to the class via `iconComponentForSlug`, and the
 * generated snippet emits the matching `[icon]="<Name>IconComponent"`.
 */
export function iconKnob(options: readonly string[]): PlaygroundKnob {
  return {
    name: 'icon',
    control: 'icon',
    options: [ICON_NONE, ...options],
    default: ICON_NONE,
  };
}

/** Resolves an icon slug to its component class, or undefined for "none". */
export function iconComponentForSlug(slug: string): Type<unknown> | undefined {
  return slug && slug !== ICON_NONE ? ICONS.find(icon => icon.slug === slug) : undefined;
}

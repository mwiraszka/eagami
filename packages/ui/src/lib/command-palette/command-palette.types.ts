import type { Type } from '@angular/core';

/**
 * A single executable command in an `<ea-command-palette>`.
 *
 * The filter matches on `label`, `description`, and `keywords` (all
 * case-insensitive). Keywords are invisible synonyms, e.g. label "Sign out"
 * with keywords `['logout', 'log out']` so the command surfaces under any
 * spelling the user knows.
 */
export interface CommandPaletteItem<T = unknown> {
  /** Stable id used for tracking and `aria-activedescendant`. */
  id: string;

  /** Visible label rendered for the command. */
  label: string;

  /** Optional secondary text rendered below the label. */
  description?: string;

  /** Optional leading icon component (e.g. `SearchIconComponent`). */
  icon?: Type<unknown>;

  /**
   * Optional keyboard-shortcut hint rendered on the right edge of the row.
   * Decorative: the palette does not bind global shortcuts, the consumer
   * does that.
   */
  shortcut?: string;

  /** Section heading the command groups under. Items without a group render first. */
  group?: string;

  /** When true, the row is greyed out and cannot be activated. */
  disabled?: boolean;

  /** Extra hidden search terms. */
  keywords?: readonly string[];

  /** Arbitrary payload passed through to `(execute)`. */
  data?: T;
}

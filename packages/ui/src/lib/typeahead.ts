import { DestroyRef, inject } from '@angular/core';

import { foldForSearch } from './select-option-list';

/** How long after the last typed character a typeahead query starts over. */
const QUERY_RESET_MS = 500;

/** Whether the key types a character, rather than being a named key or a shortcut. */
export function isTypedCharacter(event: KeyboardEvent): boolean {
  return event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
}

/**
 * Typeahead over a list of labelled items, as the WAI-ARIA listbox, menu and tree
 * view patterns describe. Characters typed in quick succession build one query,
 * matched against the start of each label with case and diacritics folded away.
 * Create it in an injection context, so a pending reset is dropped on destroy.
 */
export class Typeahead {
  private query = '';
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.reset());
  }

  /**
   * Whether the key belongs to the query. Space only extends a query already in
   * progress, and otherwise keeps its own action.
   */
  accepts(event: KeyboardEvent): boolean {
    return isTypedCharacter(event) && (event.key !== ' ' || this.query !== '');
  }

  /**
   * Adds the typed character to the query and returns the index of the next label
   * that starts with it, wrapping past the end, or -1 when none does. A single
   * character scans from the item after `current`, so pressing it again moves on to
   * the next match; a longer query rescans from `current`, which may still match.
   * `includeCurrent` starts a single character at `current` too, and a `current` of
   * -1 starts at the first item. A `null` label never matches.
   */
  match(
    key: string,
    labels: readonly (string | null)[],
    current: number,
    includeCurrent = false,
  ): number {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => (this.query = ''), QUERY_RESET_MS);
    this.query += foldForSearch(key);
    if (labels.length === 0) {
      return -1;
    }
    const start = Math.max(current, 0);
    const firstOffset = this.query.length > 1 || includeCurrent || current < 0 ? 0 : 1;
    for (let offset = firstOffset; offset <= labels.length; offset++) {
      const idx = (start + offset) % labels.length;
      const label = labels[idx];
      if (label !== null && foldForSearch(label).startsWith(this.query)) {
        return idx;
      }
    }
    return -1;
  }

  /** Drops the query in progress. */
  reset(): void {
    clearTimeout(this.timer);
    this.timer = undefined;
    this.query = '';
  }
}

import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { type EaSize } from '../sizes';

/** Heading level exposed by each item's header for assistive technology. */
export type AccordionHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Visual size of the accordion, shared by all of its items. */
export type AccordionSize = EaSize;

/**
 * Container for expandable content sections. By default only one item can be
 * open at a time; set `multi` to allow several to stay expanded together.
 * Provides a built-in chevron animation and supports per-item disabling.
 */
@Component({
  selector: 'ea-accordion',
  template: ` <div class="ea-accordion"><ng-content /></div> `,
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  readonly multi = input<boolean>(false);
  /** Visual size of the accordion; every item inherits it. */
  readonly size = input<AccordionSize>('md');
  /** Heading level (1-6) applied to every item's header wrapper. */
  readonly headingLevel = input<AccordionHeadingLevel>(3);

  readonly expandedItems = signal<Set<string>>(new Set());

  toggle(value: string): void {
    const current = this.expandedItems();
    const next = new Set(current);

    if (next.has(value)) {
      next.delete(value);
    } else {
      if (!this.multi()) {
        next.clear();
      }
      next.add(value);
    }

    this.expandedItems.set(next);
  }

  isExpanded(value: string): boolean {
    return this.expandedItems().has(value);
  }
}

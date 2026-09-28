import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  linkedSignal,
  model,
  signal,
} from '@angular/core';

import { type EaSize } from '../sizes';
import type { AccordionItemComponent } from './accordion-item.component';

/** Heading level exposed by each item's header for assistive technology. */
export type AccordionHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Visual size of the accordion, shared by all of its items. */
export type AccordionSize = EaSize;

/**
 * Container for expandable content sections. By default only one item can be
 * open at a time; set `multi` to allow several to stay expanded together.
 * Which items are open is the `expandedValues` model, so items can start
 * expanded or be controlled from outside. Provides a built-in chevron
 * animation and supports per-item disabling.
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
  /** Tints an open item's header and sets its label, icon, and chevron in the brand color. */
  readonly highlightExpanded = input<boolean>(false);
  /**
   * Values of the expanded items. Set it to open items from the start, or bind
   * `[(expandedValues)]` to control expansion from outside. Without `multi`,
   * only the first of them in document order stays open.
   */
  readonly expandedValues = model<readonly string[]>([]);

  // Linked rather than computed, so it stays writable for callers that set it directly
  readonly expandedItems = linkedSignal(() => new Set(this.expandedValues()));
  readonly registeredItems = signal<AccordionItemComponent[]>([]);

  constructor() {
    effect(() => {
      if (this.multi()) {
        return;
      }
      const expanded = this.expandedValues();
      if (expanded.length <= 1) {
        return;
      }
      const first = this.registeredItems().find(item => expanded.includes(item.value()));
      if (first) {
        this.expandedValues.set([first.value()]);
      }
    });
  }

  // Called automatically by ea-accordion-item, in document order
  registerItem(item: AccordionItemComponent): void {
    this.registeredItems.update(items => [...items, item]);
  }

  // Called automatically by ea-accordion-item
  unregisterItem(item: AccordionItemComponent): void {
    this.registeredItems.update(items => items.filter(i => i !== item));
  }

  toggle(value: string): void {
    const next = new Set(this.expandedItems());

    if (next.has(value)) {
      next.delete(value);
    } else {
      if (!this.multi()) {
        next.clear();
      }
      next.add(value);
    }

    this.expandedValues.set([...next]);
  }

  isExpanded(value: string): boolean {
    return this.expandedItems().has(value);
  }
}

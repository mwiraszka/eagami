import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type OnDestroy,
  type OnInit,
  type Type,
  computed,
  inject,
  input,
} from '@angular/core';

import { ChevronDownIconComponent } from '../icons/chevron-down.component';
import { uniqueId } from '../unique-id';
import { AccordionComponent } from './accordion.component';

/**
 * Single expandable section within an `ea-accordion`. Each item exposes a
 * header button with the supplied `label`, or with an element projected as
 * `slot="label"` for richer content, and reveals its other projected content
 * when expanded. Inherits its size from the parent accordion. Must be
 * rendered inside an `ea-accordion`.
 */
@Component({
  selector: 'ea-accordion-item',
  imports: [ChevronDownIconComponent, NgComponentOutlet],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent implements OnInit, OnDestroy {
  private readonly accordion = inject(AccordionComponent);

  readonly value = input.required<string>();
  /**
   * Plain-text label shown in the header button. For richer content, project
   * an element with `slot="label"` instead: its text then names the button, so
   * mark purely decorative parts of it `aria-hidden`.
   */
  readonly label = input<string>('');
  /** Optional icon component rendered before the label in the header button. */
  readonly icon = input<Type<unknown> | undefined>(undefined);
  readonly disabled = input<boolean>(false);
  readonly id = input<string>(uniqueId('ea-accordion-item'));

  readonly isExpanded = computed(() => this.accordion.isExpanded(this.value()));
  readonly headingLevel = computed(() => this.accordion.headingLevel());
  readonly isHighlighted = computed(
    () => this.accordion.highlightExpanded() && this.isExpanded(),
  );
  readonly size = computed(() => this.accordion.size());

  ngOnInit(): void {
    this.accordion.registerItem(this);
  }

  ngOnDestroy(): void {
    this.accordion.unregisterItem(this);
  }

  toggle(): void {
    if (this.disabled()) {
      return;
    }
    this.accordion.toggle(this.value());
  }
}

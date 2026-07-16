import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { ChevronDownIconComponent } from '../icons/chevron-down.component';
import { uniqueId } from '../unique-id';
import { AccordionComponent } from './accordion.component';

/**
 * Single expandable section within an `ea-accordion`. Each item exposes a
 * header button with the supplied `label` and reveals its projected content
 * when expanded. Inherits its size from the parent accordion. Must be
 * rendered inside an `ea-accordion`.
 */
@Component({
  selector: 'ea-accordion-item',
  imports: [ChevronDownIconComponent],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent {
  private readonly accordion = inject(AccordionComponent);

  readonly value = input.required<string>();
  readonly label = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly id = input<string>(uniqueId('ea-accordion-item'));

  readonly isExpanded = computed(() => this.accordion.isExpanded(this.value()));
  readonly headingLevel = computed(() => this.accordion.headingLevel());
  readonly size = computed(() => this.accordion.size());

  toggle(): void {
    if (this.disabled()) {
      return;
    }
    this.accordion.toggle(this.value());
  }
}

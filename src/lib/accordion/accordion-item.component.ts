import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { ChevronDownIconComponent } from '../icons/chevron-down.component';
import { AccordionComponent } from './accordion.component';

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
  readonly id = input<string>(
    `ea-accordion-item-${Math.random().toString(36).slice(2, 9)}`,
  );

  readonly isExpanded = computed(() => this.accordion.isExpanded(this.value()));

  toggle(): void {
    if (this.disabled()) return;
    this.accordion.toggle(this.value());
  }
}

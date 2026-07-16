import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { ChevronRightIconComponent } from '../icons/chevron-right.component';
import { type EaSize } from '../sizes';

/** Visual style of the separator rendered between breadcrumb items. */
export type BreadcrumbsSeparator = 'chevron' | 'slash';

/** Visual size of the breadcrumb trail. */
export type BreadcrumbsSize = EaSize;

/** Single entry in a breadcrumb trail. */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  disabled?: boolean;
}

/** Payload emitted when a breadcrumb is activated. */
export interface BreadcrumbClickEvent {
  item: BreadcrumbItem;
  index: number;
  event: MouseEvent;
}

/**
 * Navigation trail that shows the user's location within a hierarchy. Items
 * with an `href` render as links, others render as buttons; the final item is
 * always treated as the current page and is non-interactive.
 */
@Component({
  selector: 'ea-breadcrumbs',
  imports: [ChevronRightIconComponent],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbsComponent {
  private readonly i18n = inject(EagamiI18nService);

  readonly items = input<BreadcrumbItem[]>([]);
  readonly separator = input<BreadcrumbsSeparator>('chevron');
  /** Visual size of the breadcrumb trail. */
  readonly size = input<BreadcrumbsSize>('md');
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: 'aria-label',
  });

  /** Fires when a non-disabled, non-final breadcrumb is activated. */
  readonly clicked = output<BreadcrumbClickEvent>();

  /** Accessible label for the breadcrumb nav, falling back to the active locale. */
  readonly resolvedAriaLabel = computed(
    () => this.ariaLabel() ?? this.i18n.messages().breadcrumbs.label,
  );

  isLast(index: number): boolean {
    return index === this.items().length - 1;
  }

  handleClick(item: BreadcrumbItem, index: number, event: MouseEvent): void {
    if (item.disabled || this.isLast(index)) {
      event.preventDefault();
      return;
    }
    this.clicked.emit({ item, index, event });
  }
}

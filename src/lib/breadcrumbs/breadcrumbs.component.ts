import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';

import { ChevronRightIconComponent } from '../icons/chevron-right.component';

/** Visual style of the separator rendered between breadcrumb items. */
export type BreadcrumbsSeparator = 'chevron' | 'slash';

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
  readonly items = input<BreadcrumbItem[]>([]);
  readonly separator = input<BreadcrumbsSeparator>('chevron');
  readonly ariaLabel = input<string>('Breadcrumb', { alias: 'aria-label' });

  /** Fires when a non-disabled, non-final breadcrumb is activated. */
  readonly clicked = output<BreadcrumbClickEvent>();

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

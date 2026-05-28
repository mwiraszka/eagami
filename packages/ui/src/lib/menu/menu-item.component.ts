import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';

import { MenuComponent } from './menu.component';

/** Visual style of a menu item; `danger` for destructive actions. */
export type MenuItemVariant = 'default' | 'danger';

/**
 * Selectable row inside an `ea-menu`. Supports leading icons via the `icon`
 * content slot, a disabled state, and a `danger` variant for destructive
 * actions. Activating an item closes its parent menu.
 */
@Component({
  selector: 'ea-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  private readonly menu = inject(MenuComponent, { optional: true });

  readonly disabled = input<boolean>(false);
  readonly variant = input<MenuItemVariant>('default');

  /** Fires when the item is activated; the parent menu closes immediately afterwards. */
  readonly clicked = output<MouseEvent>();

  handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
    this.menu?.close(true);
  }
}

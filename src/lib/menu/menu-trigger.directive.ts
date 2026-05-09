import { Directive, ElementRef, inject, input } from '@angular/core';

import { MenuComponent } from './menu.component';

/**
 * Wires a focusable host element (typically a button) to an `ea-menu`,
 * handling click and keyboard activation (ArrowDown/Enter/Space to open,
 * Escape to close) and applying the appropriate ARIA attributes.
 */
@Directive({
  selector: '[eaMenuTrigger]',
  host: {
    '[attr.aria-haspopup]': '"menu"',
    '[attr.aria-expanded]': 'menu()?.open() ?? false',
    '[attr.aria-controls]': 'menu()?.id() ?? null',
    '(click)': 'handleClick()',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class MenuTriggerDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  readonly menu = input.required<MenuComponent>({ alias: 'eaMenuTrigger' });

  handleClick(): void {
    const m = this.menu();
    if (m.disabled()) return;
    m.toggleAt(this.el.nativeElement);
  }

  handleKeydown(event: KeyboardEvent): void {
    const m = this.menu();
    if (m.disabled()) return;

    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!m.open()) m.openAt(this.el.nativeElement);
    } else if (event.key === 'Escape' && m.open()) {
      event.preventDefault();
      m.close();
    }
  }
}

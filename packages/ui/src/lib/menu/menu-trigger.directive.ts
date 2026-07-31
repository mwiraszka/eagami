import { Directive, ElementRef, Renderer2, effect, inject, input } from '@angular/core';

import { resolveAriaTarget } from '../aria-target';
import type { MenuComponent } from './menu.component';

/**
 * Wires a focusable host element (typically a button) to an `ea-menu`,
 * handling click and keyboard activation (ArrowDown/Enter/Space to open,
 * Escape to close) and applying the appropriate ARIA attributes.
 */
@Directive({
  selector: '[eaMenuTrigger]',
  host: {
    '(click)': 'handleClick()',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class MenuTriggerDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  readonly menu = input.required<MenuComponent>({ alias: 'eaMenuTrigger' });

  constructor() {
    effect(() => {
      const menu = this.menu();
      const open = menu?.open() ?? false;
      const controls = menu?.id() ?? null;
      const target = resolveAriaTarget(this.el.nativeElement);

      this.renderer.setAttribute(target, 'aria-haspopup', 'menu');
      this.renderer.setAttribute(target, 'aria-expanded', String(open));
      if (controls) {
        this.renderer.setAttribute(target, 'aria-controls', controls);
      } else {
        this.renderer.removeAttribute(target, 'aria-controls');
      }
    });
  }

  handleClick(): void {
    const m = this.menu();
    if (m.disabled()) {
      return;
    }
    m.toggleAt(this.el.nativeElement);
  }

  handleKeydown(event: KeyboardEvent): void {
    const m = this.menu();
    if (m.disabled()) {
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!m.open()) {
        m.openAt(this.el.nativeElement);
      }
    } else if (event.key === 'Escape' && m.open()) {
      event.preventDefault();
      m.close();
    }
  }
}

import { AlertComponent, ButtonComponent, TooltipDirective } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-tooltip-demo-page',
  templateUrl: './tooltip-demo-page.component.html',
  styleUrl: './tooltip-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AlertComponent,
    ButtonComponent,
    TooltipDirective,
    UiComponentDemoLayoutComponent,
  ],
})
export class TooltipDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  /* Subscribe rather than read once: hover capability changes at runtime (DevTools
     mobile emulation, Bluetooth peripherals), which a construction-time read misses. */
  private readonly hoverMql =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(hover: hover)')
      : null;
  protected readonly canHover = signal(this.hoverMql?.matches ?? true);

  constructor() {
    this.hoverMql?.addEventListener('change', e => this.canHover.set(e.matches));
  }
}

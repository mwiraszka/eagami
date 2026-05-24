import { PopoverComponent, PopoverPlacement } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-popover-demo-page',
  templateUrl: './popover-demo-page.component.html',
  styleUrl: './popover-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PopoverComponent, UiComponentDemoLayoutComponent],
})
export class PopoverDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly popoverBasicOpen = signal(false);
  protected readonly popoverPlacementOpen = signal<PopoverPlacement | null>(null);
}

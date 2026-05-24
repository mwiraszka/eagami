import { ColorPickerComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-color-picker-demo-page',
  templateUrl: './color-picker-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ColorPickerComponent, UiComponentDemoLayoutComponent],
})
export class ColorPickerDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly colorPickerValue = signal<string | null>('#3674a1');
}

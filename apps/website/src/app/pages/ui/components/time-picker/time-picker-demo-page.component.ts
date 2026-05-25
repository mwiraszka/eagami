import { TimePickerComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-time-picker-demo-page',
  templateUrl: './time-picker-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TimePickerComponent, UiComponentDemoLayoutComponent],
})
export class TimePickerDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly timePickerValue = signal<string | null>(null);
}

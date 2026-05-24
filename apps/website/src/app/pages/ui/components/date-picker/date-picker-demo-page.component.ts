import { DatePickerComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-date-picker-demo-page',
  templateUrl: './date-picker-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePickerComponent, UiComponentDemoLayoutComponent],
})
export class DatePickerDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly datePickerValue = signal<Date | null>(null);
  protected readonly datePickerMin = new Date(
    new Date().setDate(new Date().getDate() - 7),
  );
  protected readonly datePickerMax = new Date(
    new Date().setDate(new Date().getDate() + 21),
  );
}

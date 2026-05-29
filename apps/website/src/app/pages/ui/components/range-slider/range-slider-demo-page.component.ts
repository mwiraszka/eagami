import { RangeSliderComponent, type RangeSliderValue } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-range-slider-demo-page',
  templateUrl: './range-slider-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RangeSliderComponent, UiComponentDemoLayoutComponent],
})
export class RangeSliderDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly rangeSliderValue = signal<RangeSliderValue>([20, 80]);
}

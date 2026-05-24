import { SliderComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-slider-demo-page',
  templateUrl: './slider-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SliderComponent, UiComponentDemoLayoutComponent],
})
export class SliderDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly sliderValue = signal(40);
}

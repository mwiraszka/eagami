import { SegmentedComponent, type SelectOption } from '@eagami/ui';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-segmented-demo-page',
  templateUrl: './segmented-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SegmentedComponent, UiComponentDemoLayoutComponent],
})
export class SegmentedDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly segmentedValue = signal('list');

  protected readonly segmentedViewOptions = computed<SelectOption[]>(() =>
    this.messages().ui.component.sharedOptions.viewOptions.map(o => ({ ...o })),
  );

  protected readonly segmentedThemeOptions = computed<SelectOption[]>(() =>
    this.messages().ui.component.sharedOptions.themeOptions.map(o => ({ ...o })),
  );

  protected readonly segmentedMonthOptions = computed<SelectOption[]>(() =>
    this.messages().ui.component.sharedOptions.monthOptions.map(o => ({ ...o })),
  );
}

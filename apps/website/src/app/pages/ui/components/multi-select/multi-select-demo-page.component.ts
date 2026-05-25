import { MultiSelectComponent, SelectOption } from '@eagami/ui';

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
  selector: 'web-multi-select-demo-page',
  templateUrl: './multi-select-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MultiSelectComponent, UiComponentDemoLayoutComponent],
})
export class MultiSelectDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly multiSelectValue = signal<readonly string[]>([]);

  protected readonly dropdownOptions = computed<SelectOption[]>(() =>
    this.messages().ui.component.sharedOptions.fruitOptions.map(o => ({ ...o })),
  );
}

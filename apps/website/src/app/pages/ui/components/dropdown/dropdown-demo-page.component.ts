import { DropdownComponent, SelectOption } from '@eagami/ui';

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
  selector: 'web-dropdown-demo-page',
  templateUrl: './dropdown-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownComponent, UiComponentDemoLayoutComponent],
})
export class DropdownDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly dropdownValue = signal('');

  protected readonly dropdownOptions = computed<SelectOption[]>(() =>
    this.messages().ui.component.sharedOptions.fruitOptions.map(o => ({ ...o })),
  );
}

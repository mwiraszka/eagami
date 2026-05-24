import { AutocompleteComponent, SelectOption } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-autocomplete-demo-page',
  templateUrl: './autocomplete-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AutocompleteComponent, UiComponentDemoLayoutComponent],
})
export class AutocompleteDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly autocompleteValue = signal('');

  // Framework names are proper nouns and stay untranslated.
  protected readonly autocompleteOptions: SelectOption[] = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' },
    { value: 'qwik', label: 'Qwik' },
    { value: 'preact', label: 'Preact' },
    { value: 'lit', label: 'Lit' },
  ];
}

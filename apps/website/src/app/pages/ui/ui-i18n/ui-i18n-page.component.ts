import {
  type DataTableColumn,
  DataTableComponent,
  DatePickerComponent,
  DropdownComponent,
  EAGAMI_LOCALES,
  EagamiI18nService,
  type EagamiLocale,
  PaginatorComponent,
  SegmentedComponent,
  type SelectOption,
} from '@eagami/ui';

import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';

import { CodeSnippetComponent } from '@app/components/code-snippet/code-snippet.component';
import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

const LOCALE_LABELS: Record<EagamiLocale, string> = {
  en: 'English',
  'fr-FR': 'Français',
  el: 'Ελληνικά',
  pl: 'Polski',
  'es-ES': 'Español',
  de: 'Deutsch',
  'pt-BR': 'Português (Brasil)',
  'zh-CN': '中文',
  is: 'Íslenska',
  nl: 'Nederlands',
};

const LOCALE_FLAGS: Record<EagamiLocale, string> = {
  en: '🇬🇧',
  'fr-FR': '🇫🇷',
  el: '🇬🇷',
  pl: '🇵🇱',
  'es-ES': '🇪🇸',
  de: '🇩🇪',
  'pt-BR': '🇧🇷',
  'zh-CN': '🇨🇳',
  is: '🇮🇸',
  nl: '🇳🇱',
};

@Component({
  selector: 'web-ui-i18n-page',
  templateUrl: './ui-i18n-page.component.html',
  styleUrl: './ui-i18n-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CodeSnippetComponent,
    DataTableComponent,
    DatePickerComponent,
    DropdownComponent,
    PaginatorComponent,
    SegmentedComponent,
  ],
})
export class UiI18nPageComponent {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly i18n = inject(EagamiI18nService);
  private readonly webI18n = inject(WebI18nService);

  protected readonly messages = this.webI18n.messages;
  protected readonly locales = EAGAMI_LOCALES;
  protected readonly localeLabels = LOCALE_LABELS;
  protected readonly localeFlags = LOCALE_FLAGS;

  protected readonly localeOptions: SelectOption[] = EAGAMI_LOCALES.map(locale => ({
    value: locale,
    label: LOCALE_LABELS[locale],
  }));

  protected readonly activeLocale = signal<EagamiLocale>(this.i18n.locale());

  protected readonly demoDropdownOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];

  protected readonly demoTableColumns: DataTableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
  ];

  protected readonly demoTableData: Record<string, unknown>[] = [];

  protected readonly quickSetupSnippet = `import { frFR, provideEagamiUi } from '@eagami/ui';

export const appConfig: ApplicationConfig = {
  // Register the languages you use; English is always available.
  providers: [provideEagamiUi({ locale: 'fr-FR', locales: [frFR] })],
};`;

  protected readonly runtimeSwitchSnippet = `import { EagamiI18nService } from '@eagami/ui';

export class LanguageSwitcher {
  private readonly i18n = inject(EagamiI18nService);

  switchToFrench() {
    this.i18n.setLocale('fr-FR');
  }
}`;

  protected readonly perStringOverridesSnippet = `provideEagamiUi({
  locale: 'en',
  messages: {
    paginator: { rowsPerPage: 'Items per page' },
    dataTable: { noData: 'Nothing here yet' },
  },
})`;

  protected readonly frenchSpacingSnippet = `import { frenchSpacing } from '@eagami/ui';

frenchSpacing('Lignes par page :');     // 'Lignes par page&#8239;:'
frenchSpacing('Il a dit « bonjour ».'); // 'Il a dit&#8239;«&#8239;bonjour&#8239;».'`;

  constructor() {
    effect(() => {
      const m = this.messages().ui.i18n;
      this.metaAndTitleService.updateTitle(m.metaTitle);
      this.metaAndTitleService.updateDescription(m.metaDescription);
    });
  }

  protected onLocaleChange(value: string): void {
    const locale = value as EagamiLocale;
    this.activeLocale.set(locale);
    this.i18n.setLocale(locale);
  }
}

import {
  DataTableColumn,
  DataTableComponent,
  DatePickerComponent,
  DropdownComponent,
  EAGAMI_LOCALES,
  EagamiI18nService,
  EagamiLocale,
  PaginatorComponent,
  SegmentedComponent,
  SelectOption,
} from '@eagami/ui';

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { CodeSnippetComponent } from '@app/components/code-snippet/code-snippet.component';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

const LOCALE_LABELS: Record<EagamiLocale, string> = {
  en: 'English',
  'fr-FR': 'Français',
  el: 'Ελληνικά',
  pl: 'Polski',
  'es-ES': 'Español',
};

const LOCALE_FLAGS: Record<EagamiLocale, string> = {
  en: '🇬🇧',
  'fr-FR': '🇫🇷',
  el: '🇬🇷',
  pl: '🇵🇱',
  'es-ES': '🇪🇸',
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
export class UiI18nPageComponent implements OnInit {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly i18n = inject(EagamiI18nService);

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

  protected readonly quickSetupSnippet = `import { provideEagamiUi } from '@eagami/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideEagamiUi({ locale: 'fr-FR' })],
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

  public ngOnInit(): void {
    this.metaAndTitleService.updateTitle('Eagami | UI');
    this.metaAndTitleService.updateDescription(
      'Switch every @eagami/ui component into English, French, Greek, Polish, or Spanish with a single provider, or override individual strings to match your app.',
    );
  }

  protected onLocaleChange(value: string): void {
    const locale = value as EagamiLocale;
    this.activeLocale.set(locale);
    this.i18n.setLocale(locale);
  }
}

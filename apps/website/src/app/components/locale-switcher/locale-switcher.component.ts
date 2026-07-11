import {
  LanguagesIconComponent,
  MenuComponent,
  MenuItemComponent,
  MenuTriggerDirective,
  TooltipDirective,
} from '@eagami/ui';

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import {
  WEB_LOCALES,
  WEB_LOCALE_FLAGS,
  WEB_LOCALE_LABELS,
  type WebLocale,
} from '@app/i18n/locale.types';
import { WebI18nService } from '@app/i18n/web-i18n.service';

@Component({
  selector: 'web-locale-switcher',
  templateUrl: './locale-switcher.component.html',
  styleUrl: './locale-switcher.component.scss',
  imports: [
    LanguagesIconComponent,
    MenuComponent,
    MenuItemComponent,
    MenuTriggerDirective,
    TooltipDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocaleSwitcherComponent {
  private readonly i18n = inject(WebI18nService);

  protected readonly locales = WEB_LOCALES;
  protected readonly labels = WEB_LOCALE_LABELS;
  protected readonly flags = WEB_LOCALE_FLAGS;
  protected readonly active = this.i18n.locale;
  protected readonly messages = this.i18n.messages;

  protected readonly buttonLabel = computed(() =>
    this.messages().common.activeLocale(this.labels[this.active()]),
  );

  protected onSelect(locale: WebLocale): void {
    this.i18n.setLocale(locale);
  }
}

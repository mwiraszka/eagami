import { CardComponent } from '@eagami/ui';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';

import { UI_COMPONENTS } from '@app/data/ui-components';
import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

@Component({
  selector: 'web-ui-component-demo-layout',
  templateUrl: './ui-component-demo-layout.component.html',
  styleUrl: './ui-component-demo-layout.component.scss',
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiComponentDemoLayoutComponent {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;

  readonly slug = input.required<string>();
  /** Skip the built-in demo card so the page can provide its own surfaces. */
  readonly bare = input<boolean>(false);

  protected readonly component = computed(() =>
    UI_COMPONENTS.find(c => c.slug === this.slug()),
  );

  constructor() {
    effect(() => {
      const c = this.component();
      if (c) {
        this.metaAndTitleService.updateTitle(
          `${this.messages().ui.metaTitle} | ${c.name}`,
        );
        this.metaAndTitleService.updateDescription(
          this.messages().ui.component.metaDescription(c.name),
        );
      }
    });
  }
}

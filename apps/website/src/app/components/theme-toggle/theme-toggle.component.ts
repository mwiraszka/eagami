import { TooltipDirective } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import { ThemeService } from '@app/services/theme.service';

@Component({
  selector: 'web-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  imports: [TooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);
  private readonly i18n = inject(WebI18nService);

  public readonly mode = this.themeService.mode;
  public readonly messages = this.i18n.messages;

  public readonly label = computed(() =>
    this.messages().common.themeToggleLabel(this.mode() === 'light' ? 'dark' : 'light'),
  );

  public cycle(): void {
    this.themeService.cycle();
  }
}

import { MoonIconComponent, SunIconComponent, TooltipDirective } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import { ThemeService } from '@app/services/theme.service';

@Component({
  selector: 'web-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  imports: [MoonIconComponent, SunIconComponent, TooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);
  private readonly i18n = inject(WebI18nService);

  protected readonly mode = this.themeService.mode;
  protected readonly messages = this.i18n.messages;

  protected readonly label = computed(() =>
    this.messages().common.themeToggleLabel(this.mode() === 'light' ? 'dark' : 'light'),
  );

  protected cycle(): void {
    this.themeService.cycle();
  }
}

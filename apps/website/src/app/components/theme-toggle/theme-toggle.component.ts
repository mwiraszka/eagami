import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { ThemeService } from '@app/services/theme.service';

@Component({
  selector: 'web-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);

  public readonly mode = this.themeService.mode;

  public readonly label = computed(
    () => `Switch to ${this.mode() === 'light' ? 'dark' : 'light'} mode`,
  );

  public cycle(): void {
    this.themeService.cycle();
  }
}

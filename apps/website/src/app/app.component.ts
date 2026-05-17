import { ToastComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '@app/components/footer/footer.component';
import { HeaderComponent } from '@app/components/header/header.component';
import { WebI18nService } from '@app/i18n/web-i18n.service';

@Component({
  selector: 'web-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;
}

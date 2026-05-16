import { GithubIconComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'web-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [GithubIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public readonly currentYear = new Date().getFullYear();
}

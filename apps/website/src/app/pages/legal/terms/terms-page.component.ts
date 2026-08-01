import { DividerComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LegalPageBase } from '../legal-page.base';

@Component({
  selector: 'web-terms-page',
  imports: [DividerComponent],
  templateUrl: './terms-page.component.html',
  styleUrl: '../legal-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsPageComponent extends LegalPageBase {
  protected readonly section = 'terms' as const;
}

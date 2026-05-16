import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { MetaAndTitleService } from '@app/services/meta-and-title.service';

@Component({
  selector: 'web-ui-setup-page',
  templateUrl: './ui-setup-page.component.html',
  styleUrl: './ui-setup-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSetupPageComponent implements OnInit {
  private readonly metaAndTitleService = inject(MetaAndTitleService);

  public ngOnInit(): void {
    this.metaAndTitleService.updateTitle('Eagami | UI');
    this.metaAndTitleService.updateDescription(
      'Install @eagami/ui, wire up the global stylesheet and fonts, and import your first component.',
    );
  }
}

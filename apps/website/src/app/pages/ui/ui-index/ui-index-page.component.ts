import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MetaAndTitleService } from '@app/services/meta-and-title.service';

@Component({
  selector: 'web-ui-index-page',
  templateUrl: './ui-index-page.component.html',
  styleUrl: './ui-index-page.component.scss',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIndexPageComponent implements OnInit {
  private readonly metaAndTitleService = inject(MetaAndTitleService);

  public ngOnInit(): void {
    this.metaAndTitleService.updateTitle('Eagami | UI');
    this.metaAndTitleService.updateDescription(
      'Lightweight, accessible Angular component library built on CSS custom properties.',
    );
  }
}

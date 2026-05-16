import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MetaAndTitleService } from '@app/services/meta-and-title.service';

@Component({
  selector: 'web-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent implements OnInit {
  private readonly metaAndTitleService = inject(MetaAndTitleService);

  public ngOnInit(): void {
    this.metaAndTitleService.updateTitle('Eagami | Page not found');
    this.metaAndTitleService.updateDescription(
      'The page you were looking for does not exist.',
    );
  }
}

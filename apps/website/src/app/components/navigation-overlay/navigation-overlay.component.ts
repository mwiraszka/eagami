import { SpinnerComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NavigationStateService } from '@app/services/navigation-state.service';

@Component({
  selector: 'web-navigation-overlay',
  templateUrl: './navigation-overlay.component.html',
  styleUrl: './navigation-overlay.component.scss',
  imports: [SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationOverlayComponent {
  protected readonly navigationState = inject(NavigationStateService);
}

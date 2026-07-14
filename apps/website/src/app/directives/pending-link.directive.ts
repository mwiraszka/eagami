import { Directive, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { NavigationStateService } from '@app/services/navigation-state.service';

/**
 * Applies `web-link-pending` to a router link as soon as a navigation to its
 * target starts, so the destination reads as selected before the route's lazy
 * chunk finishes loading.
 */
@Directive({
  selector: 'a[routerLink]',
  host: {
    '[class.web-link-pending]': 'isPending()',
  },
})
export class PendingLinkDirective {
  private readonly router = inject(Router);
  private readonly routerLink = inject(RouterLink, { self: true });
  private readonly navigationState = inject(NavigationStateService);

  protected readonly isPending = computed(() => {
    const pendingUrl = this.navigationState.pendingUrl();
    const urlTree = this.routerLink.urlTree;
    return (
      pendingUrl !== null &&
      urlTree !== null &&
      this.router.serializeUrl(urlTree) === pendingUrl
    );
  });
}

import { type BreadcrumbItem, BreadcrumbsComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-breadcrumbs-demo-page',
  templateUrl: './breadcrumbs-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbsComponent, UiComponentDemoLayoutComponent],
})
export class BreadcrumbsDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    const shared = this.messages().ui.component.sharedOptions;
    return [
      { label: shared.breadcrumbHome, href: '/' },
      { label: shared.breadcrumbProducts, href: '/products' },
      { label: shared.breadcrumbLaptops, href: '/products/laptops' },
      { label: shared.breadcrumbMacBookPro },
    ];
  });

  protected readonly breadcrumbItemsShort = computed<BreadcrumbItem[]>(() => {
    const shared = this.messages().ui.component.sharedOptions;
    return [
      { label: shared.breadcrumbDashboard, href: '/' },
      { label: shared.breadcrumbSettings },
    ];
  });
}

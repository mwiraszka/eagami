import { AccordionComponent, AccordionItemComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-accordion-demo-page',
  templateUrl: './accordion-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AccordionComponent, AccordionItemComponent, UiComponentDemoLayoutComponent],
})
export class AccordionDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
}

import {
  type BreadcrumbClickEvent,
  type BreadcrumbItem,
  BreadcrumbsComponent,
  type BreadcrumbsSeparator,
  type BreadcrumbsSize,
} from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface BreadcrumbsKnobState {
  [key: string]: KnobValue;
  separator: BreadcrumbsSeparator;
  size: BreadcrumbsSize;
  ariaLabel: string;
}

const SLUG = 'breadcrumbs';

@Component({
  selector: 'web-breadcrumbs-demo-page',
  templateUrl: './breadcrumbs-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BreadcrumbsComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class BreadcrumbsDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['breadcrumbs'], UI_API[SLUG]);
  protected readonly state = signal<BreadcrumbsKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS['breadcrumbs']) as BreadcrumbsKnobState,
  );

  protected readonly extraAttributes = ['[items]="items"'];

  protected readonly items = computed<BreadcrumbItem[]>(() => {
    const shared = this.messages().ui.component.sharedOptions;
    return [
      { label: shared.breadcrumbHome, href: '/' },
      { label: shared.breadcrumbProducts, href: '/products' },
      { label: shared.breadcrumbLaptops, href: '/products/laptops' },
      { label: shared.breadcrumbMacBookPro },
    ];
  });

  protected onBreadcrumbClick(event: BreadcrumbClickEvent): void {
    event.event.preventDefault();
  }

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as BreadcrumbsKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(
        this.knobs,
        PLAYGROUND_KNOBS['breadcrumbs'],
      ) as BreadcrumbsKnobState,
    );
  }
}

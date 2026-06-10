import { VirtualListComponent } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface DemoRow {
  id: number;
  label: string;
  detail: string;
}

interface VirtualListKnobState {
  [key: string]: KnobValue;
  itemHeight: number;
  overscan: number;
  viewportHeight: number;
}

const SLUG = 'virtual-list';

@Component({
  selector: 'web-virtual-list-demo-page',
  templateUrl: './virtual-list-demo-page.component.html',
  styleUrl: './virtual-list-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VirtualListComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class VirtualListDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['virtual-list'], UI_API[SLUG]);
  protected readonly state = signal<VirtualListKnobState>(
    initialKnobState(
      this.knobs,
      PLAYGROUND_KNOBS['virtual-list'],
    ) as VirtualListKnobState,
  );

  protected readonly extraAttributes = ['[items]="items"'];

  // 10k rows is well past where naive rendering stutters, but cheap to allocate up-front
  protected readonly rows: DemoRow[] = Array.from({ length: 10_000 }, (_, i) => ({
    id: i,
    label: `${this.messages().ui.component.demos.virtualList.row} ${i + 1}`,
    detail: this.messages().ui.component.demos.virtualList.detail(i + 1),
  }));

  protected readonly visibleIndex = signal<number>(0);

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as VirtualListKnobState);
  }

  protected reset(): void {
    this.visibleIndex.set(0);
    this.state.set(
      initialKnobState(
        this.knobs,
        PLAYGROUND_KNOBS['virtual-list'],
      ) as VirtualListKnobState,
    );
  }

  protected onScrollIndex(index: number): void {
    this.visibleIndex.set(index);
  }
}

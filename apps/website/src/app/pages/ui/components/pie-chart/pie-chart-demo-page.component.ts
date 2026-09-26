import {
  ButtonComponent,
  type ChartSize,
  InputComponent,
  type PieChartAnimation,
  PieChartComponent,
  type PieChartSlice,
  type PieChartVariant,
  PlusIconComponent,
  TooltipDirective,
  TrashIconComponent,
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

interface PieChartKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive the checked bindings.
  [key: string]: KnobValue;
  variant: PieChartVariant;
  size: ChartSize;
  animation: PieChartAnimation;
  animationDuration: number;
  height: number;
  showLegend: boolean;
  showPercentages: boolean;
}

const SLUG = 'pie-chart';

interface DemoSlice {
  id: number;
  label: string;
  value: number;
}

@Component({
  selector: 'web-pie-chart-demo-page',
  templateUrl: './pie-chart-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    InputComponent,
    PieChartComponent,
    PlusIconComponent,
    TooltipDirective,
    TrashIconComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class PieChartDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['pie-chart'], UI_API[SLUG]);
  protected readonly state = signal<PieChartKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS['pie-chart']) as PieChartKnobState,
  );

  protected readonly extraAttributes = ['[data]="data"'];

  private nextId = 1;
  protected readonly slices = signal<DemoSlice[]>(this.seedSlices());

  protected readonly data = computed<PieChartSlice[]>(() =>
    this.slices().map(({ label, value }) => ({ label, value })),
  );

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as PieChartKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS['pie-chart']) as PieChartKnobState,
    );
    this.nextId = 1;
    this.slices.set(this.seedSlices());
  }

  // Blank or partly typed numbers keep the last valid value until the input reads as one
  protected toNumber(text: string, fallback: number): number {
    const value = Number(text);
    return text.trim() !== '' && Number.isFinite(value) ? value : fallback;
  }

  protected updateSlice(id: number, patch: Partial<DemoSlice>): void {
    this.slices.update(slices =>
      slices.map(slice => (slice.id === id ? { ...slice, ...patch } : slice)),
    );
  }

  protected addSlice(): void {
    const last = this.slices().at(-1);
    this.slices.update(slices => [
      ...slices,
      {
        id: this.nextId++,
        label: `${this.messages().ui.component.demos.pieChart.slice} ${slices.length + 1}`,
        value: last?.value ?? 500,
      },
    ]);
  }

  protected removeSlice(id: number): void {
    this.slices.update(slices => slices.filter(slice => slice.id !== id));
  }

  private seedSlices(): DemoSlice[] {
    const m = this.messages().ui.component.demos.pieChart;
    return [
      { label: m.desktop, value: 5480 },
      { label: m.mobile, value: 3920 },
      { label: m.tablet, value: 1140 },
      { label: m.other, value: 460 },
    ].map(slice => ({ ...slice, id: this.nextId++ }));
  }
}

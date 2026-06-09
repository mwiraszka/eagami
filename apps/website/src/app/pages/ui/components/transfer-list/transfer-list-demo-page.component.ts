import {
  TransferListComponent,
  type TransferListItem,
  type TransferListSize,
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

interface TransferListKnobState {
  [key: string]: KnobValue;
  size: TransferListSize;
  disabled: boolean;
  sourceLabel: string;
  targetLabel: string;
}

const SLUG = 'transfer-list';

@Component({
  selector: 'web-transfer-list-demo-page',
  templateUrl: './transfer-list-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TransferListComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class TransferListDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['transfer-list'], UI_API[SLUG]);
  protected readonly state = signal<TransferListKnobState>(
    initialKnobState(
      this.knobs,
      PLAYGROUND_KNOBS['transfer-list'],
    ) as TransferListKnobState,
  );

  protected readonly extraAttributes = ['[items]="items"'];

  protected readonly selectedIds = signal<readonly string[]>([]);

  protected readonly items = computed<TransferListItem[]>(() => {
    const m = this.messages().ui.component.demos.transferList;
    return [
      { id: 'admin', label: m.roleAdmin },
      { id: 'editor', label: m.roleEditor },
      { id: 'viewer', label: m.roleViewer },
      { id: 'guest', label: m.roleGuest },
      { id: 'billing', label: m.roleBilling },
      { id: 'owner', label: m.roleOwner, disabled: true },
    ];
  });

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(
      current => ({ ...current, [name]: value }) as TransferListKnobState,
    );
  }

  protected reset(): void {
    this.selectedIds.set([]);
    this.state.set(
      initialKnobState(
        this.knobs,
        PLAYGROUND_KNOBS['transfer-list'],
      ) as TransferListKnobState,
    );
  }
}

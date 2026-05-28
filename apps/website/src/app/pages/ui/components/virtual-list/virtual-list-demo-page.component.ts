import { VirtualListComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

interface DemoRow {
  id: number;
  label: string;
  detail: string;
}

@Component({
  selector: 'web-virtual-list-demo-page',
  templateUrl: './virtual-list-demo-page.component.html',
  styleUrl: './virtual-list-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VirtualListComponent, UiComponentDemoLayoutComponent],
})
export class VirtualListDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  // 10k rows is well past where naive rendering stutters, but cheap to allocate up-front
  protected readonly rows: DemoRow[] = Array.from({ length: 10_000 }, (_, i) => ({
    id: i,
    label: `${this.messages().ui.component.demos.virtualList.row} ${i + 1}`,
    detail: this.messages().ui.component.demos.virtualList.detail(i + 1),
  }));

  protected readonly visibleIndex = signal<number>(0);

  protected onScrollIndex(index: number): void {
    this.visibleIndex.set(index);
  }
}

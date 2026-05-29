import {
  ChangeDetectionStrategy,
  Component,
  type OnDestroy,
  type OnInit,
  computed,
  inject,
  input,
} from '@angular/core';

import { TabsComponent } from './tabs.component';

/**
 * Single tab within an `ea-tabs` group. Registers itself with the parent on
 * init, exposes its `value` and `label`, and shows its projected content
 * when active.
 */
@Component({
  selector: 'ea-tab',
  host: { '[style.display]': 'isActive() ? null : "none"' },
  template: `
    @if (isActive()) {
      <div
        class="ea-tab__panel"
        role="tabpanel"
        [id]="id() + '-panel'"
        [attr.aria-labelledby]="id() + '-tab'"
        tabindex="0">
        <ng-content />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnInit, OnDestroy {
  private readonly tabs = inject(TabsComponent);

  readonly value = input.required<string>();
  readonly label = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly id = input<string>(`ea-tab-${Math.random().toString(36).slice(2, 9)}`);

  readonly isActive = computed(() => this.tabs.activeTab() === this.value());

  ngOnInit(): void {
    this.tabs.registerTab(this);
  }

  ngOnDestroy(): void {
    this.tabs.unregisterTab(this);
  }
}

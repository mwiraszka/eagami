import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  signal,
} from '@angular/core';

import type { TabComponent } from './tab.component';

/** Visual style of the tab bar. */
export type TabsVariant = 'underline' | 'filled';
/** Visual size of the tabs. */
export type TabsSize = 'sm' | 'md' | 'lg';

/**
 * Tab bar paired with content panels. Child `ea-tab` components register
 * themselves automatically and the active panel is shown based on the
 * `activeTab` two-way binding. Supports keyboard navigation
 * (arrow keys, Home/End).
 */
@Component({
  selector: 'ea-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  readonly registeredTabs = signal<TabComponent[]>([]);

  readonly variant = input<TabsVariant>('underline');
  readonly size = input<TabsSize>('md');

  readonly activeTab = model<string>('');

  /** Fires with the value of the newly active tab. */
  readonly changed = output<string>();

  /** Registers a child tab so it appears in the tab bar; called automatically by `ea-tab`. */
  registerTab(tab: TabComponent): void {
    this.registeredTabs.update(tabs => [...tabs, tab]);
  }

  /** Removes a previously registered child tab; called automatically by `ea-tab`. */
  unregisterTab(tab: TabComponent): void {
    this.registeredTabs.update(tabs => tabs.filter(t => t !== tab));
  }

  /** Programmatically activates the tab with the given value. */
  selectTab(value: string): void {
    this.activeTab.set(value);
    this.changed.emit(value);
  }

  handleKeydown(event: KeyboardEvent): void {
    const tabList = this.registeredTabs().filter(t => !t.disabled());
    const currentIndex = tabList.findIndex(t => t.value() === this.activeTab());
    let nextIndex = -1;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextIndex = currentIndex < tabList.length - 1 ? currentIndex + 1 : 0;
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      nextIndex = currentIndex > 0 ? currentIndex - 1 : tabList.length - 1;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = tabList.length - 1;
    }

    if (nextIndex >= 0) {
      const tab = tabList[nextIndex];
      this.selectTab(tab.value());
      const buttons = (
        event.currentTarget as HTMLElement
      ).querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])');
      buttons[nextIndex]?.focus();
    }
  }
}

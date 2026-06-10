import { TabComponent, TabsComponent, type TabsSize, type TabsVariant } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface TabsKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  size: TabsSize;
  variant: TabsVariant;
}

const SLUG = 'tabs';

interface TabItem {
  value: string;
  label: string;
  content: string;
}

const TABS: readonly TabItem[] = [
  { value: 'account', label: 'Account', content: 'Account settings content' },
  { value: 'security', label: 'Security', content: 'Security settings content' },
  { value: 'notifications', label: 'Notifications', content: 'Notification preferences' },
];

@Component({
  selector: 'web-tabs-demo-page',
  templateUrl: './tabs-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TabComponent,
    TabsComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class TabsDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.tabs, UI_API[SLUG]);
  protected readonly state = signal<TabsKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.tabs) as TabsKnobState,
  );

  protected readonly tabs = TABS;

  protected readonly childMarkup = computed(() =>
    this.tabs
      .map(tab => {
        const attrBlock = `  value="${tab.value}"\n  label="${tab.label}">`;
        return `<ea-tab\n${attrBlock}\n  ${tab.content}\n</ea-tab>`;
      })
      .join('\n'),
  );

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as TabsKnobState);
  }

  protected reset(): void {
    this.state.set(initialKnobState(this.knobs, PLAYGROUND_KNOBS.tabs) as TabsKnobState);
  }
}

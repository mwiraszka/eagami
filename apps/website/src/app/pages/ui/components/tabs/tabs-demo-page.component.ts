import { TabComponent, TabsComponent, type TabsSize, type TabsVariant } from '@eagami/ui';
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
  protected readonly messages = inject(WebI18nService).messages;
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.tabs, UI_API[SLUG]);
  protected readonly state = signal<TabsKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.tabs) as TabsKnobState,
  );

  protected readonly tabs = computed<readonly TabItem[]>(() => {
    const m = this.messages().ui.component.demos.tabs;
    return [
      { value: 'account', label: m.account, content: m.accountContent },
      { value: 'security', label: m.security, content: m.securityContent },
      {
        value: 'notifications',
        label: m.notifications,
        content: m.notificationsContent,
      },
    ];
  });

  protected readonly childMarkup = computed(() =>
    this.tabs()
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

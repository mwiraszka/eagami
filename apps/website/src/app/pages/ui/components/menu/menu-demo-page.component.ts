import {
  ButtonComponent,
  MenuComponent,
  MenuItemComponent,
  type MenuPlacement,
  MenuTriggerDirective,
} from '@eagami/ui';
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

interface MenuKnobState {
  [key: string]: KnobValue;
  placement: MenuPlacement;
  ariaLabel: string;
  disabled: boolean;
}

const SLUG = 'menu';

const SNIPPET_CHILDREN = [
  '<ea-menu-item>Edit</ea-menu-item>',
  '<ea-menu-item>Duplicate</ea-menu-item>',
  '<ea-menu-item>Archive</ea-menu-item>',
  '<ea-menu-item variant="danger">Delete</ea-menu-item>',
].join('\n');

@Component({
  selector: 'web-menu-demo-page',
  templateUrl: './menu-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    MenuComponent,
    MenuItemComponent,
    MenuTriggerDirective,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class MenuDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly childMarkup = SNIPPET_CHILDREN;
  protected readonly extraAttributes = ['[eaMenuTrigger]="menuRef"'];

  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.menu, UI_API[SLUG]);
  protected readonly state = signal<MenuKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.menu) as MenuKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as MenuKnobState);
  }

  protected reset(): void {
    this.state.set(initialKnobState(this.knobs, PLAYGROUND_KNOBS.menu) as MenuKnobState);
  }
}

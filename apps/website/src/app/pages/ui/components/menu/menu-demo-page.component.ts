import {
  ButtonComponent,
  ContextMenuTriggerDirective,
  MenuComponent,
  MenuItemComponent,
  type MenuPlacement,
  type MenuSize,
  MenuTriggerDirective,
  ToastService,
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
import {
  type KnobValue,
  buildKnobs,
  initialKnobState,
  injectKnobDefaults,
} from '../_playground/knob';
import { type DemoOpensOn, OPENS_ON_KNOB } from '../_playground/opens-on-knob';

interface MenuKnobState {
  [key: string]: KnobValue;
  opensOn: DemoOpensOn;
  placement: MenuPlacement;
  size: MenuSize;
  ariaLabel: string;
  disabled: boolean;
  maxHeight: string;
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
    ContextMenuTriggerDirective,
    MenuComponent,
    MenuItemComponent,
    MenuTriggerDirective,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class MenuDemoPageComponent {
  private readonly toastService = inject(ToastService);
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly childMarkup = SNIPPET_CHILDREN;
  protected readonly extraAttributes = ['#menuRef'];

  private readonly knobDefaults = injectKnobDefaults(SLUG);
  protected readonly knobs = [
    OPENS_ON_KNOB,
    ...buildKnobs(PLAYGROUND_KNOBS.menu, UI_API[SLUG]),
  ];
  protected readonly state = signal<MenuKnobState>(
    initialKnobState(
      this.knobs,
      PLAYGROUND_KNOBS.menu,
      this.knobDefaults,
    ) as MenuKnobState,
  );

  protected readonly onRightClick = computed(
    () => this.state().opensOn === 'right-click',
  );

  protected readonly extraSnippet = computed(() =>
    this.onRightClick()
      ? '<div [eaContextMenuTrigger]="menuRef">Right-click here</div>'
      : '<ea-button [eaMenuTrigger]="menuRef">Open menu</ea-button>',
  );

  protected choose(item: string): void {
    this.toastService.info(this.messages().ui.component.demos.menu.chosenToast(item));
  }

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as MenuKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(
        this.knobs,
        PLAYGROUND_KNOBS.menu,
        this.knobDefaults,
      ) as MenuKnobState,
    );
  }
}

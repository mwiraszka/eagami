import {
  ButtonComponent,
  type DrawerAnimation,
  DrawerComponent,
  type DrawerMode,
  type DrawerPosition,
  type DrawerSize,
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

interface DrawerKnobState {
  [key: string]: KnobValue;
  mode: DrawerMode;
  position: DrawerPosition;
  size: DrawerSize;
  closeOnBackdrop: boolean;
  closeOnEscape: boolean;
  animation: DrawerAnimation;
  showClose: boolean;
}

const SLUG = 'drawer';

const SNIPPET_CHILDREN = [
  '<span slot="header">Settings</span>',
  '<p>Adjust your preferences here.</p>',
  '<span slot="footer">',
  '  <ea-button variant="secondary">Cancel</ea-button>',
  '  <ea-button>Save</ea-button>',
  '</span>',
].join('\n');

@Component({
  selector: 'web-drawer-demo-page',
  templateUrl: './drawer-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    DrawerComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class DrawerDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly open = signal(false);
  protected readonly childMarkup = SNIPPET_CHILDREN;
  protected readonly extraAttributes = ['[(open)]="open"'];

  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.drawer, UI_API[SLUG]);
  protected readonly state = signal<DrawerKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.drawer) as DrawerKnobState,
  );

  // Header and body copy follow the selected Position so the demo matches the edge.
  protected readonly content = computed(() => {
    const drawer = this.messages().ui.component.demos.drawer;
    const byPosition = {
      left: { title: drawer.leftTitle, body: drawer.leftBody },
      right: { title: drawer.rightTitle, body: drawer.rightBody },
      top: { title: drawer.topTitle, body: drawer.topBody },
      bottom: { title: drawer.bottomTitle, body: drawer.bottomBody },
    };
    return (
      byPosition[this.state().position as keyof typeof byPosition] ?? byPosition.right
    );
  });

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as DrawerKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.drawer) as DrawerKnobState,
    );
  }
}

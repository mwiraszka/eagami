import { ButtonComponent, DialogComponent, type DialogWidth } from '@eagami/ui';
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

interface DialogKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  width: DialogWidth;
  closeOnBackdrop: boolean;
  closeOnEscape: boolean;
  showClose: boolean;
}

const SLUG = 'dialog';

// Projected slot markup the generated snippet reflects; the live preview renders
// the equivalent localized content.
const SNIPPET_CHILDREN = [
  '<span slot="header">Confirm</span>',
  '<p>Are you sure you want to continue?</p>',
  '<span slot="footer">',
  '  <ea-button variant="secondary">Cancel</ea-button>',
  '  <ea-button>Confirm</ea-button>',
  '</span>',
].join('\n');

@Component({
  selector: 'web-dialog-demo-page',
  templateUrl: './dialog-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    DialogComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class DialogDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly open = signal(false);
  protected readonly childMarkup = SNIPPET_CHILDREN;
  protected readonly extraAttributes = ['[(open)]="open"'];

  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.dialog, UI_API[SLUG]);
  protected readonly state = signal<DialogKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.dialog) as DialogKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as DialogKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.dialog) as DialogKnobState,
    );
  }
}

import {
  ButtonComponent,
  DialogComponent,
  DialogService,
  type DialogWidth,
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
  type PlaygroundKnob,
  buildKnobs,
  initialKnobState,
} from '../_playground/knob';
import { DialogDemoContentComponent } from './dialog-demo-content.component';

type DialogOpenWith = 'template' | 'service';

interface DialogKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  openWith: DialogOpenWith;
  width: DialogWidth;
  modal: boolean;
  closeOnBackdrop: boolean;
  closeOnEscape: boolean;
  showClose: boolean;
  closeDisabled: boolean;
  manualClose: boolean;
}

const SLUG = 'dialog';

const OPEN_WITH_KNOB: PlaygroundKnob = {
  name: 'openWith',
  control: 'select',
  options: ['template', 'service'],
  default: 'template',
  demoOnly: true,
};

// Projected slot markup the generated snippet reflects; the live preview renders
// the equivalent localized content.
const TEMPLATE_SNIPPET_CHILDREN = [
  '<span slot="header">Confirm</span>',
  '<p>Are you sure you want to continue?</p>',
  '<span slot="footer">',
  '  <ea-button variant="secondary" (clicked)="open = false">Cancel</ea-button>',
  '  <ea-button (clicked)="open = false">Confirm</ea-button>',
  '</span>',
].join('\n');

// The template of a component opened through the service, whose buttons answer through the ref
const SERVICE_SNIPPET_CHILDREN = [
  '<span slot="header">Confirm</span>',
  '<p>Are you sure you want to continue?</p>',
  '<span slot="footer">',
  '  <ea-button variant="secondary" (clicked)="ref.close(false)">Cancel</ea-button>',
  '  <ea-button (clicked)="ref.close(true)">Confirm</ea-button>',
  '</span>',
].join('\n');

const SERVICE_SNIPPET = [
  '@Component({',
  "  selector: 'app-confirm-dialog',",
  '  imports: [ButtonComponent, DialogComponent],',
  "  templateUrl: './confirm-dialog.component.html',",
  '})',
  'export class ConfirmDialogComponent {',
  '  protected readonly ref = inject<DialogRef<boolean>>(DialogRef);',
  '}',
  '',
  'const confirmed = await dialogService.open<boolean>(ConfirmDialogComponent).result;',
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
  private readonly dialogService = inject(DialogService);
  private readonly toastService = inject(ToastService);
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly open = signal(false);

  protected readonly knobs = [
    OPEN_WITH_KNOB,
    ...buildKnobs(PLAYGROUND_KNOBS.dialog, UI_API[SLUG]),
  ];
  protected readonly state = signal<DialogKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.dialog) as DialogKnobState,
  );

  private readonly throughService = computed(() => this.state().openWith === 'service');

  protected readonly childMarkup = computed(() =>
    this.throughService() ? SERVICE_SNIPPET_CHILDREN : TEMPLATE_SNIPPET_CHILDREN,
  );
  protected readonly extraAttributes = computed(() => {
    if (!this.throughService()) {
      return ['[(open)]="open"'];
    }
    return this.state().manualClose ? ['(closeRequested)="ref.close()"'] : [];
  });
  protected readonly extraSnippet = computed(() =>
    this.throughService() ? SERVICE_SNIPPET : '',
  );

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as DialogKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.dialog) as DialogKnobState,
    );
  }

  protected openDialog(): void {
    if (this.throughService()) {
      void this.openThroughService();
    } else {
      this.open.set(true);
    }
  }

  // The template dialog's own Cancel and Confirm buttons
  protected choose(confirmed: boolean): void {
    this.open.set(false);
    this.announce(confirmed);
  }

  // Every other way out: the close button, the backdrop or Escape
  protected dismiss(): void {
    this.open.set(false);
    this.announce(undefined);
  }

  private async openThroughService(): Promise<void> {
    const state = this.state();
    const ref = this.dialogService.open<boolean>(DialogDemoContentComponent, {
      inputs: {
        width: state.width,
        modal: state.modal,
        closeOnBackdrop: state.closeOnBackdrop,
        closeOnEscape: state.closeOnEscape,
        showClose: state.showClose,
        closeDisabled: state.closeDisabled,
        manualClose: state.manualClose,
      },
    });
    this.announce(await ref.result);
  }

  private announce(confirmed: boolean | undefined): void {
    const messages = this.messages().ui.component;
    if (confirmed === undefined) {
      this.toastService.info(messages.demos.dialog.dismissedToast);
    } else if (confirmed) {
      this.toastService.success(
        messages.demos.dialog.pressedToast(messages.common.confirm),
      );
    } else {
      this.toastService.info(messages.demos.dialog.pressedToast(messages.common.cancel));
    }
  }
}

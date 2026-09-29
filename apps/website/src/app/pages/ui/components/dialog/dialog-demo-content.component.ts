import {
  ButtonComponent,
  DialogComponent,
  DialogRef,
  type DialogWidth,
} from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

/** The playground dialog opened through DialogService, configured by the same knobs. */
@Component({
  selector: 'web-dialog-demo-content',
  templateUrl: './dialog-demo-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, DialogComponent],
})
export class DialogDemoContentComponent {
  protected readonly ref = inject<DialogRef<boolean>>(DialogRef);
  protected readonly messages = inject(WebI18nService).messages;

  readonly width = input<DialogWidth>('md');
  readonly modal = input<boolean>(true);
  readonly closeOnBackdrop = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  readonly showClose = input<boolean>(true);
  readonly closeDisabled = input<boolean>(false);
  readonly manualClose = input<boolean>(false);
}

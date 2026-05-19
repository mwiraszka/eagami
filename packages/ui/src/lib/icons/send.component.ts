import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-send',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <line
        x1="22"
        y1="2"
        x2="11"
        y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  `,
})
export class SendIconComponent extends IconComponentBase {
  static readonly slug = 'send';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'send',
    'submit',
    'message',
    'plane',
    'mail',
    'envoyer',
    'enviar',
    'αποστολή',
    'στείλε',
    'wyślij',
    'nadaj',
  ];
}

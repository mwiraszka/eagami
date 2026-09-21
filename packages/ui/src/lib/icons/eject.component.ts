import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-eject',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <polygon points="12 4 3 14 21 14 12 4" />
      <line
        x1="3"
        y1="19"
        x2="21"
        y2="19" />
    </svg>
  `,
})
export class EjectIconComponent extends IconComponentBase {
  static readonly slug = 'eject';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'eject',
    'disc',
    'remove',
    'unmount',
    'éjecter',
    'expulsar',
    'εξαγωγή',
    'wysuń',
    'media',
  ];
}

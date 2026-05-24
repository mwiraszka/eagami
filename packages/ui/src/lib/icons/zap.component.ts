import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-zap',
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
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  `,
})
export class ZapIconComponent extends IconComponentBase {
  static readonly slug = 'zap';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'zap',
    'lightning',
    'bolt',
    'flash',
    'electric',
    'power',
    'éclair',
    'foudre',
    'rayo',
    'relámpago',
    'αστραπή',
    'κεραυνός',
    'błyskawica',
    'piorun',
  ];
}

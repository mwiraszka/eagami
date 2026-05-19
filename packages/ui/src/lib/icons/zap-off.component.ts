import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-zap-off',
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
      <polyline points="12.41 6.75 13 2 10.57 4.92" />
      <polyline points="18.57 12.91 21 10 15.66 10" />
      <polyline points="8 8 3 14 12 14 11 22 16 16" />
      <line
        x1="1"
        y1="1"
        x2="23"
        y2="23" />
    </svg>
  `,
})
export class ZapOffIconComponent extends IconComponentBase {
  static readonly slug = 'zap-off';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'zap-off',
    'zap',
    'off',
    'lightning',
    'disabled',
    'no power',
    'éclair',
    'rayo',
    'αστραπή',
    'błyskawica',
    'wyłączone',
  ];
}

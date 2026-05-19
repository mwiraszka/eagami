import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-minimize-2',
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
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 10 14 4" />
      <line
        x1="14"
        y1="10"
        x2="21"
        y2="3" />
      <line
        x1="3"
        y1="21"
        x2="10"
        y2="14" />
    </svg>
  `,
})
export class Minimize2IconComponent extends IconComponentBase {
  static readonly slug = 'minimize-2';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'minimize-2',
    'minimize',
    '2',
    'shrink',
    'reduce',
    'collapse',
    'réduire',
    'minimizar',
    'ελαχιστοποίηση',
    'minimalizuj',
  ];
}

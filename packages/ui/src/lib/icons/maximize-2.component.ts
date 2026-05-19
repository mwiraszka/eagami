import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-maximize-2',
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
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line
        x1="21"
        y1="3"
        x2="14"
        y2="10" />
      <line
        x1="3"
        y1="21"
        x2="10"
        y2="14" />
    </svg>
  `,
})
export class Maximize2IconComponent extends IconComponentBase {
  static readonly slug = 'maximize-2';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'maximize-2',
    'maximize',
    '2',
    'expand',
    'fullscreen',
    'enlarge',
    'agrandir',
    'maximizar',
    'μεγιστοποίηση',
    'maksymalizuj',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-anchor',
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
      <circle
        cx="12"
        cy="5"
        r="3" />
      <line
        x1="12"
        y1="22"
        x2="12"
        y2="8" />
      <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
    </svg>
  `,
})
export class AnchorIconComponent extends IconComponentBase {
  static readonly slug = 'anchor';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'anchor',
    'ship',
    'boat',
    'marine',
    'ancre',
    'bateau',
    'ancla',
    'barco',
    'άγκυρα',
    'πλοίο',
    'kotwica',
    'statek',
  ];
}

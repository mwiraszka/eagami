import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-life-buoy',
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
        cy="12"
        r="10" />
      <circle
        cx="12"
        cy="12"
        r="4" />
      <line
        x1="4.93"
        y1="4.93"
        x2="9.17"
        y2="9.17" />
      <line
        x1="14.83"
        y1="14.83"
        x2="19.07"
        y2="19.07" />
      <line
        x1="14.83"
        y1="9.17"
        x2="19.07"
        y2="4.93" />
      <line
        x1="14.83"
        y1="9.17"
        x2="18.36"
        y2="5.64" />
      <line
        x1="4.93"
        y1="19.07"
        x2="9.17"
        y2="14.83" />
    </svg>
  `,
})
export class LifeBuoyIconComponent extends IconComponentBase {
  static readonly slug = 'life-buoy';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'life-buoy',
    'life',
    'buoy',
    'help',
    'support',
    'rescue',
    'bouée',
    'sauvetage',
    'salvavidas',
    'ayuda',
    'σωσίβιο',
    'βοήθεια',
    'koło ratunkowe',
    'pomoc',
  ];
}

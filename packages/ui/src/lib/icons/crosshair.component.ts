import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-crosshair',
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
      <line
        x1="22"
        y1="12"
        x2="18"
        y2="12" />
      <line
        x1="6"
        y1="12"
        x2="2"
        y2="12" />
      <line
        x1="12"
        y1="6"
        x2="12"
        y2="2" />
      <line
        x1="12"
        y1="22"
        x2="12"
        y2="18" />
    </svg>
  `,
})
export class CrosshairIconComponent extends IconComponentBase {
  static readonly slug = 'crosshair';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'crosshair',
    'target',
    'aim',
    'focus',
    'precision',
    'cible',
    'mira',
    'objetivo',
    'στόχος',
    'σταυρόνημα',
    'celownik',
    'cel',
  ];
}

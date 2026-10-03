import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-train',
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
      <rect
        x="5"
        y="3"
        width="14"
        height="14"
        rx="3" />
      <rect
        x="8.5"
        y="6"
        width="7"
        height="4"
        rx="1" />
      <path d="M9 13.5h.01" />
      <path d="M15 13.5h.01" />
      <path d="m8.5 17-2.5 4" />
      <path d="m15.5 17 2.5 4" />
    </svg>
  `,
})
export class TrainIconComponent extends IconComponentBase {
  static readonly slug = 'train';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'train',
    'railway',
    'rail',
    'metro',
    'subway',
    'transit',
    'métro',
    'gare',
    'tren',
    'ferrocarril',
    'τρένο',
    'σιδηρόδρομος',
    'pociąg',
    'kolej',
  ];
}

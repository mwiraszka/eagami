import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-ship',
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
      <path d="M3 14h18l-3 6H6z" />
      <path d="M5.5 14V9.5H12V14" />
      <path d="M7 9.5V6h3v3.5" />
      <path d="M9.5 17h.01" />
      <path d="M14.5 17h.01" />
    </svg>
  `,
})
export class ShipIconComponent extends IconComponentBase {
  static readonly slug = 'ship';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'ship',
    'boat',
    'cruise',
    'ferry',
    'shipping',
    'sea',
    'navire',
    'bateau',
    'barco',
    'buque',
    'πλοίο',
    'καράβι',
    'statek',
    'okręt',
  ];
}

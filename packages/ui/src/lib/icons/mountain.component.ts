import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-mountain',
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
      <path d="M2 20 9 5l4.5 9.5 3-3.5 5.5 9z" />
      <path d="M6.2 11 9 13.5l2.84-2.5" />
    </svg>
  `,
})
export class MountainIconComponent extends IconComponentBase {
  static readonly slug = 'mountain';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'mountain',
    'peak',
    'hiking',
    'landscape',
    'summit',
    'outdoors',
    'montagne',
    'sommet',
    'montaña',
    'cumbre',
    'βουνό',
    'κορυφή',
    'góra',
    'szczyt',
  ];
}

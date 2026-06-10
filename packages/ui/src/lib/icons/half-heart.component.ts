import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-half-heart',
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
      <path d="M12 5.67 L10.94 4.61 a5.5 5.5 0 0 0 -7.78 7.78 L12 21.23 Z" />
    </svg>
  `,
})
export class HalfHeartIconComponent extends IconComponentBase {
  static readonly slug = 'half-heart';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'half-heart',
    'half',
    'left',
    'partial',
    'rating',
    'heart',
    'love',
    'shape',
    'demi-cœur',
    'demi',
    'gauche',
    'medio-corazón',
    'medio',
    'izquierda',
    'μισή-καρδιά',
    'μισό',
    'αριστερά',
    'pół-serca',
    'pół',
    'lewa',
  ];
}

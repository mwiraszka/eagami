import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-half-circle',
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
      <path d="M12 2 A10 10 0 0 0 12 22 Z" />
    </svg>
  `,
})
export class HalfCircleIconComponent extends IconComponentBase {
  static readonly slug = 'half-circle';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'half-circle',
    'half',
    'left',
    'partial',
    'rating',
    'circle',
    'round',
    'shape',
    'demi-cercle',
    'demi',
    'gauche',
    'medio-círculo',
    'medio',
    'izquierda',
    'μισός-κύκλος',
    'μισό',
    'αριστερά',
    'pół-koła',
    'pół',
    'lewa',
  ];
}

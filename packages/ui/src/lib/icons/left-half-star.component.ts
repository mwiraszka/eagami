import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-left-half-star',
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
      <path d="M12 2 L8.91 8.26 L2 9.27 L7 14.14 L5.82 21.02 L12 17.77 Z" />
    </svg>
  `,
})
export class LeftHalfStarIconComponent extends IconComponentBase {
  static readonly slug = 'left-half-star';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'left-half-star',
    'half-star',
    'half',
    'left',
    'partial',
    'rating',
    'star',
    'shape',
    'demi-étoile',
    'demi',
    'gauche',
    'media-estrella',
    'media',
    'izquierda',
    'μισό-αστέρι',
    'μισό',
    'αριστερά',
    'pół-gwiazdy',
    'pół',
    'lewa',
  ];
}

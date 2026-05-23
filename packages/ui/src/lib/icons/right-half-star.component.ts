import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-right-half-star',
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
      <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 Z" />
    </svg>
  `,
})
export class RightHalfStarIconComponent extends IconComponentBase {
  static readonly slug = 'right-half-star';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'right-half-star',
    'half-star',
    'half',
    'right',
    'partial',
    'rating',
    'star',
    'shape',
    'demi-étoile',
    'demi',
    'droite',
    'media-estrella',
    'media',
    'derecha',
    'μισό-αστέρι',
    'μισό',
    'δεξιά',
    'pół-gwiazdy',
    'pół',
    'prawa',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-id-card',
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
      <path d="M13 19a4 4 0 00-8 0" />
      <path d="M16 10h2" />
      <path d="M16 14h2" />
      <circle
        cx="9"
        cy="12"
        r="3" />
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2" />
    </svg>
  `,
})
export class IdCardIconComponent extends IconComponentBase {
  static readonly slug = 'id-card';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'id-card',
    'identity',
    'identification',
    'badge',
    'license',
    'profile',
    'carte d’identité',
    'identité',
    'documento de identidad',
    'identificación',
    'ταυτότητα',
    'κάρτα',
    'dowód osobisty',
    'tożsamość',
  ];
}

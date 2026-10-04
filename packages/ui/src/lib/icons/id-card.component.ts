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
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2" />
      <rect
        x="5.5"
        y="8.5"
        width="5"
        height="7"
        rx="1" />
      <path d="M14 8.5h4.5" />
      <path d="M14 12h4.5" />
      <path d="M14 15.5h2.5" />
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

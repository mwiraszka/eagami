import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-paw',
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
        cx="4.5"
        cy="11.25"
        r="1.75" />
      <circle
        cx="8.75"
        cy="5.75"
        r="1.75" />
      <circle
        cx="15.25"
        cy="5.75"
        r="1.75" />
      <circle
        cx="19.5"
        cy="11.25"
        r="1.75" />
      <path
        d="M12 12c2.5 0 6 3.2 6 6 0 1.8-1.4 3-3 3-1.2 0-2-.6-3-.6s-1.8.6-3 .6c-1.6 0-3-1.2-3-3 0-2.8 3.5-6 6-6z" />
    </svg>
  `,
})
export class PawIconComponent extends IconComponentBase {
  static readonly slug = 'paw';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'paw',
    'pet',
    'animal',
    'dog',
    'cat',
    'veterinary',
    'patte',
    'empreinte',
    'huella',
    'mascota',
    'πατούσα',
    'κατοικίδιο',
    'łapa',
    'zwierzę',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-car',
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
      <path
        d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle
        cx="7"
        cy="17"
        r="2" />
      <path d="M9 17h6" />
      <circle
        cx="17"
        cy="17"
        r="2" />
    </svg>
  `,
})
export class CarIconComponent extends IconComponentBase {
  static readonly slug = 'car';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'car',
    'vehicle',
    'drive',
    'transport',
    'automobile',
    'parking',
    'voiture',
    'véhicule',
    'coche',
    'vehículo',
    'αυτοκίνητο',
    'όχημα',
    'samochód',
    'pojazd',
  ];
}

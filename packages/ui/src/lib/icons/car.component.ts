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
      <path d="m5 11 1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
      <rect
        x="3"
        y="11"
        width="18"
        height="6"
        rx="2" />
      <path d="M7 14h.01" />
      <path d="M17 14h.01" />
      <path d="M6 17v2" />
      <path d="M18 17v2" />
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

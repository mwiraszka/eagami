import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-map-pin',
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle
        cx="12"
        cy="10"
        r="3" />
    </svg>
  `,
})
export class MapPinIconComponent extends IconComponentBase {
  static readonly slug = 'map-pin';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'map-pin',
    'map',
    'pin',
    'location',
    'marker',
    'place',
    'épingle',
    'marqueur',
    'ubicación',
    'marcador',
    'καρφίτσα',
    'τοποθεσία',
    'pinezka',
    'lokalizacja',
  ];
}

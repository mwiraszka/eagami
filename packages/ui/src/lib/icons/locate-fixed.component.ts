import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-locate-fixed',
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
      <line
        x1="2"
        y1="12"
        x2="5"
        y2="12" />
      <line
        x1="19"
        y1="12"
        x2="22"
        y2="12" />
      <line
        x1="12"
        y1="2"
        x2="12"
        y2="5" />
      <line
        x1="12"
        y1="19"
        x2="12"
        y2="22" />
      <circle
        cx="12"
        cy="12"
        r="7" />
      <circle
        cx="12"
        cy="12"
        r="3" />
    </svg>
  `,
})
export class LocateFixedIconComponent extends IconComponentBase {
  static readonly slug = 'locate-fixed';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'locate-fixed',
    'locate',
    'my location',
    'current location',
    'gps',
    'position',
    'localiser',
    'ma position',
    'ubicar',
    'mi ubicación',
    'εντοπισμός',
    'τοποθεσία',
    'zlokalizuj',
    'moja lokalizacja',
  ];
}

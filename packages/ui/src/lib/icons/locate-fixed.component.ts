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
      <circle
        cx="12"
        cy="12"
        r="7" />
      <circle
        cx="12"
        cy="12"
        r="1" />
      <path d="M12 2v3" />
      <path d="M12 19v3" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
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

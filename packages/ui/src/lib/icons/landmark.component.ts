import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-landmark',
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
      <path d="M12 3 3 8.5h18z" />
      <path d="M6 11.5v6" />
      <path d="M12 11.5v6" />
      <path d="M18 11.5v6" />
      <path d="M3 20.5h18" />
    </svg>
  `,
})
export class LandmarkIconComponent extends IconComponentBase {
  static readonly slug = 'landmark';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'landmark',
    'bank',
    'institution',
    'government',
    'museum',
    'courthouse',
    'banque',
    'bâtiment public',
    'banco',
    'institución',
    'τράπεζα',
    'ίδρυμα',
    'instytucja',
    'urząd',
  ];
}

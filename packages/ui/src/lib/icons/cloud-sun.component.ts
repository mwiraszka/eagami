import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-cloud-sun',
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
      <path d="M5.5 21a3.25 3.25 0 0 1 0-6.5 4.5 4.5 0 0 1 9 0 3.25 3.25 0 0 1 0 6.5z" />
      <path d="M11.37 7.53a4.5 4.5 0 0 1 6.4 5.38" />
      <path d="M13.5 2.7v2.2" />
      <path d="M20.1 11.5h2.2" />
      <path d="m18.17 6.83 1.55-1.55" />
    </svg>
  `,
})
export class CloudSunIconComponent extends IconComponentBase {
  static readonly slug = 'cloud-sun';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'cloud-sun',
    'cloud',
    'sun',
    'weather',
    'partly cloudy',
    'nuage',
    'soleil',
    'nube',
    'sol',
    'σύννεφο',
    'ήλιος',
    'chmura',
    'słońce',
  ];
}

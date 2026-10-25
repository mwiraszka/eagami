import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-bus',
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
      <path d="M5 17.5H3a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h14l5 6v6a1 1 0 0 1-1 1h-2" />
      <path d="M9 17.5h6" />
      <circle
        cx="7"
        cy="17.5"
        r="2" />
      <circle
        cx="17"
        cy="17.5"
        r="2" />
      <path d="M2 10.5h20" />
      <path d="M7 4.5v6" />
      <path d="M12 4.5v6" />
      <path d="M17 4.5v6" />
    </svg>
  `,
})
export class BusIconComponent extends IconComponentBase {
  static readonly slug = 'bus';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'bus',
    'coach',
    'transit',
    'public transport',
    'commute',
    'travel',
    'autocar',
    'transport en commun',
    'autobús',
    'transporte público',
    'λεωφορείο',
    'συγκοινωνία',
    'autobus',
    'komunikacja',
  ];
}

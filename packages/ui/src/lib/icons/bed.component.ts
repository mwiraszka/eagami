import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-bed',
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
      <path d="M3 6v13" />
      <path d="M3 16h18" />
      <path d="M21 19v-5a3 3 0 0 0-3-3h-6v5" />
      <circle
        cx="7.5"
        cy="11.5"
        r="2" />
    </svg>
  `,
})
export class BedIconComponent extends IconComponentBase {
  static readonly slug = 'bed';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'bed',
    'sleep',
    'hotel',
    'bedroom',
    'rest',
    'accommodation',
    'lit',
    'chambre',
    'cama',
    'dormitorio',
    'κρεβάτι',
    'υπνοδωμάτιο',
    'łóżko',
    'sypialnia',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-activity',
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
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  `,
})
export class ActivityIconComponent extends IconComponentBase {
  static readonly slug = 'activity';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'activity',
    'pulse',
    'heartbeat',
    'health',
    'fitness',
    'activité',
    'pouls',
    'actividad',
    'pulso',
    'δραστηριότητα',
    'παλμός',
    'aktywność',
    'puls',
  ];
}

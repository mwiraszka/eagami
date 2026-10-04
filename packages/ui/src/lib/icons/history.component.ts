import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-history',
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
      <path d="M4.63 6.84a9 9 0 1 1-1.32 7.49" />
      <path d="M4.63 3.34v3.5h3.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  `,
})
export class HistoryIconComponent extends IconComponentBase {
  static readonly slug = 'history';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'history',
    'recent',
    'clock',
    'time',
    'undo',
    'historique',
    'récent',
    'historial',
    'reciente',
    'ιστορικό',
    'historia',
    'ostatnie',
  ];
}

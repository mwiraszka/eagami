import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-alert-octagon',
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
      <polygon
        points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line
        x1="12"
        y1="8"
        x2="12"
        y2="12" />
      <line
        x1="12"
        y1="16"
        x2="12.01"
        y2="16" />
    </svg>
  `,
})
export class AlertOctagonIconComponent extends IconComponentBase {
  static readonly slug = 'alert-octagon';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'alert-octagon',
    'alert',
    'octagon',
    'warning',
    'stop',
    'danger',
    'alerte',
    'octogone',
    'alerta',
    'octágono',
    'ειδοποίηση',
    'οκτάγωνο',
    'alarm',
    'ostrzeżenie',
  ];
}

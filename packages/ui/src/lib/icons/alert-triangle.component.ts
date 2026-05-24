import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-alert-triangle',
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
      <path
        d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line
        x1="12"
        y1="9"
        x2="12"
        y2="13" />
      <line
        x1="12"
        y1="17"
        x2="12.01"
        y2="17" />
    </svg>
  `,
})
export class AlertTriangleIconComponent extends IconComponentBase {
  static readonly slug = 'alert-triangle';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'alert-triangle',
    'alert',
    'triangle',
    'warning',
    'caution',
    'danger',
    'alerte',
    'triángulo',
    'alerta',
    'ειδοποίηση',
    'τρίγωνο',
    'alarm',
    'ostrzeżenie',
  ];
}

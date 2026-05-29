import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-info',
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
        r="10" />
      <line
        x1="12"
        y1="16"
        x2="12"
        y2="12" />
      <line
        x1="12"
        y1="8"
        x2="12.01"
        y2="8" />
    </svg>
  `,
})
export class InfoIconComponent extends IconComponentBase {
  static readonly slug = 'info';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'info',
    'information',
    'help',
    'about',
    'details',
    'information',
    'información',
    'πληροφορίες',
    'informacje',
  ];
}

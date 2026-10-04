import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-scan',
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
      <path d="M3 7.5V5a2 2 0 0 1 2-2h2.5" />
      <path d="M16.5 3H19a2 2 0 0 1 2 2v2.5" />
      <path d="M21 16.5V19a2 2 0 0 1-2 2h-2.5" />
      <path d="M7.5 21H5a2 2 0 0 1-2-2v-2.5" />
    </svg>
  `,
})
export class ScanIconComponent extends IconComponentBase {
  static readonly slug = 'scan';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'scan',
    'scanner',
    'frame',
    'focus',
    'escanear',
    'σάρωση',
    'skanowanie',
  ];
}

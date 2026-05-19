import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-refresh-ccw',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <polyline points="1 4 1 10 7 10" />
      <polyline points="23 20 23 14 17 14" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  `,
})
export class RefreshCcwIconComponent extends IconComponentBase {
  static readonly slug = 'refresh-ccw';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'refresh-ccw',
    'refresh',
    'ccw',
    'reload',
    'sync',
    'update',
    'rotate',
    'actualiser',
    'actualizar',
    'recargar',
    'ανανέωση',
    'odśwież',
    'załaduj',
  ];
}

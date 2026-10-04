import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-pin-off',
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
      <path d="M8 3h8" />
      <path d="M9.5 3v4" />
      <path d="M8 11.4 6 14v2h7.5" />
      <path d="M14.5 3v6.5L18 14v2" />
      <path d="M12 16v6" />
      <path d="m3 3 18 18" />
    </svg>
  `,
})
export class PinOffIconComponent extends IconComponentBase {
  static readonly slug = 'pin-off';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'pin-off',
    'unpin',
    'detach',
    'remove pin',
    'pin',
    'désépingler',
    'détacher',
    'desanclar',
    'desfijar',
    'ξεκαρφίτσωμα',
    'αποσύνδεση',
    'odepnij',
    'odczep',
  ];
}

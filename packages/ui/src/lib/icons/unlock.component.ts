import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-unlock',
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
      <rect
        x="3"
        y="11"
        width="18"
        height="11"
        rx="2"
        ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  `,
})
export class UnlockIconComponent extends IconComponentBase {
  static readonly slug = 'unlock';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'unlock',
    'open',
    'security',
    'access',
    'password',
    'déverrouiller',
    'desbloquear',
    'abierto',
    'ξεκλείδωμα',
    'άνοιγμα',
    'odblokuj',
    'otwórz',
  ];
}

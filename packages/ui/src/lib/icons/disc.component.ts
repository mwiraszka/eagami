import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-disc',
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
      <circle
        cx="12"
        cy="12"
        r="3" />
    </svg>
  `,
})
export class DiscIconComponent extends IconComponentBase {
  static readonly slug = 'disc';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'disc',
    'cd',
    'dvd',
    'record',
    'music',
    'album',
    'disque',
    'disco',
    'δίσκος',
    'μουσική',
    'płyta',
    'dysk',
  ];
}

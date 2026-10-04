import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-megaphone',
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
      <path d="M3 9.5h4v5H3z" />
      <path d="M7 9.5 19 5v14L7 14.5" />
      <path d="M9 15.3V19a1.5 1.5 0 0 0 3 0v-2.6" />
      <path d="M22 10v4" />
    </svg>
  `,
})
export class MegaphoneIconComponent extends IconComponentBase {
  static readonly slug = 'megaphone';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'megaphone',
    'announcement',
    'broadcast',
    'bullhorn',
    'marketing',
    'mégaphone',
    'annonce',
    'megáfono',
    'anuncio',
    'μεγάφωνο',
    'ανακοίνωση',
    'megafon',
    'ogłoszenie',
  ];
}

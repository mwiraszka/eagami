import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-align-center',
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
      <line
        x1="18"
        y1="10"
        x2="6"
        y2="10" />
      <line
        x1="21"
        y1="6"
        x2="3"
        y2="6" />
      <line
        x1="21"
        y1="14"
        x2="3"
        y2="14" />
      <line
        x1="18"
        y1="18"
        x2="6"
        y2="18" />
    </svg>
  `,
})
export class AlignCenterIconComponent extends IconComponentBase {
  static readonly slug = 'align-center';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'align-center',
    'align',
    'center',
    'centre',
    'text',
    'format',
    'paragraph',
    'centrer',
    'centrado',
    'στοίχιση',
    'κέντρο',
    'wyśrodkuj',
    'środek',
  ];
}

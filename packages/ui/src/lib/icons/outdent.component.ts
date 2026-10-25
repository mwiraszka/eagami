import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-outdent',
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
      <path d="M3 4.5h18" />
      <path d="M12 9.5h9" />
      <path d="M12 14.5h9" />
      <path d="M3 19.5h18" />
      <path d="M3 12h5.5" />
      <path d="M5.5 9.5 3 12l2.5 2.5" />
    </svg>
  `,
})
export class OutdentIconComponent extends IconComponentBase {
  static readonly slug = 'outdent';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'outdent',
    'unindent',
    'dedent',
    'text',
    'paragraph',
    'format',
    'réduire le retrait',
    'retrait',
    'reducir sangría',
    'sangría',
    'μείωση εσοχής',
    'εσοχή',
    'zmniejsz wcięcie',
    'wcięcie',
  ];
}

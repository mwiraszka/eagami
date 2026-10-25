import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-indent',
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
      <path d="m6 9.5 2.5 2.5L6 14.5" />
    </svg>
  `,
})
export class IndentIconComponent extends IconComponentBase {
  static readonly slug = 'indent';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'indent',
    'indentation',
    'text',
    'paragraph',
    'format',
    'editor',
    'retrait',
    'augmenter le retrait',
    'sangría',
    'aumentar sangría',
    'εσοχή',
    'αύξηση εσοχής',
    'wcięcie',
    'zwiększ wcięcie',
  ];
}

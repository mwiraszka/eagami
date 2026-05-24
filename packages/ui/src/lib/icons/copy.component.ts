import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-copy',
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
        x="9"
        y="9"
        width="13"
        height="13"
        rx="2"
        ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  `,
})
export class CopyIconComponent extends IconComponentBase {
  static readonly slug = 'copy';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'copy',
    'duplicate',
    'clone',
    'paste',
    'clipboard',
    'copier',
    'copiar',
    'duplicar',
    'αντιγραφή',
    'kopiuj',
    'duplikuj',
  ];
}

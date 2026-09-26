import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-strikethrough',
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
      <path d="M16 4H9a3 3 0 0 0-2.83 4" />
      <path d="M14 12a4 4 0 0 1 0 8H6" />
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12" />
    </svg>
  `,
})
export class StrikethroughIconComponent extends IconComponentBase {
  static readonly slug = 'strikethrough';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'strikethrough',
    'text',
    'format',
    'cross out',
    'delete',
    'barré',
    'texte',
    'tachado',
    'texto',
    'διαγραφή',
    'κείμενο',
    'przekreślenie',
    'tekst',
  ];
}

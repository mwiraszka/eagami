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
      <path d="M16 7.5C16 5.5 14.5 4 12 4S8 5.5 8 7.5c0 1.5 1 2.5 2.5 3" />
      <path d="M8 16.5c0 2 1.5 3.5 4 3.5s4-1.5 4-3.5c0-1.5-1-2.5-2.5-3" />
      <path d="M4 12h16" />
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

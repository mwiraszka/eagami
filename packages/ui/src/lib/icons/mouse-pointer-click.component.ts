import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-mouse-pointer-click',
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
      <path d="m9 9 4.6 11.03 1.63-4.8 4.8-1.63z" />
      <path d="m15.5 15.5 4.5 4.5" />
      <path d="M9 2v3" />
      <path d="M2 9h3" />
      <path d="m4 4 2 2" />
      <path d="m14 4-1.5 1.5" />
      <path d="m4 14 1.5-1.5" />
    </svg>
  `,
})
export class MousePointerClickIconComponent extends IconComponentBase {
  static readonly slug = 'mouse-pointer-click';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'mouse-pointer-click',
    'click',
    'cursor',
    'pointer',
    'select',
    'tap',
    'cliquer',
    'curseur',
    'clic',
    'puntero',
    'κλικ',
    'δείκτης',
    'kliknięcie',
    'kursor',
  ];
}

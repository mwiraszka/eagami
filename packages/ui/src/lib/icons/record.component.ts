import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-record',
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
        r="9" />
      <circle
        cx="12"
        cy="12"
        r="4.5"
        fill="currentColor"
        stroke="none" />
    </svg>
  `,
})
export class RecordIconComponent extends IconComponentBase {
  static readonly slug = 'record';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'record',
    'capture',
    'rec',
    'take',
    'shoot',
    'enregistrer',
    'grabar',
    'εγγραφή',
    'nagrywanie',
  ];
}

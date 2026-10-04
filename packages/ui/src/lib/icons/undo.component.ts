import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-undo',
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
      <path d="m7 5-4 4 4 4" />
      <path d="M3 9h11.5a5.5 5.5 0 0 1 0 11H8" />
    </svg>
  `,
})
export class UndoIconComponent extends IconComponentBase {
  static readonly slug = 'undo';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'undo',
    'back',
    'revert',
    'history',
    'annuler',
    'deshacer',
    'αναίρεση',
    'cofnij',
  ];
}

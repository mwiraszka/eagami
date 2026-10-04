import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-redo',
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
      <path d="m17 5 4 4-4 4" />
      <path d="M21 9H9.5a5.5 5.5 0 0 0 0 11H16" />
    </svg>
  `,
})
export class RedoIconComponent extends IconComponentBase {
  static readonly slug = 'redo';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'redo',
    'forward',
    'repeat',
    'history',
    'rétablir',
    'rehacer',
    'επανάληψη',
    'ponów',
  ];
}

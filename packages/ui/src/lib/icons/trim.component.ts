import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-trim',
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
      <polyline points="8.5 4 4 4 4 20 8.5 20" />
      <polyline points="15.5 4 20 4 20 20 15.5 20" />
      <polygon points="10.5 9.5 14.5 12 10.5 14.5" />
    </svg>
  `,
})
export class TrimIconComponent extends IconComponentBase {
  static readonly slug = 'trim';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'trim',
    'clip',
    'in point',
    'out point',
    'cut range',
    'rogner',
    'recortar',
    'περικοπή',
    'przycinanie',
  ];
}

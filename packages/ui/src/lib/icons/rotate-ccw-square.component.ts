import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-rotate-ccw-square',
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
      <path d="M20 9V7a2 2 0 0 0-2-2h-6" />
      <path d="m15 2-3 3 3 3" />
      <path d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
    </svg>
  `,
})
export class RotateCcwSquareIconComponent extends IconComponentBase {
  static readonly slug = 'rotate-ccw-square';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'rotate-ccw-square',
    'rotate',
    'square',
    'ccw',
    'counterclockwise',
    'turn',
    'image',
    'photo',
    'tourner',
    'girar',
    'περιστροφή',
    'obróć',
  ];
}

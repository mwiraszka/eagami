import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-rotate-ccw',
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
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  `,
})
export class RotateCcwIconComponent extends IconComponentBase {
  static readonly slug = 'rotate-ccw';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'rotate-ccw',
    'rotate',
    'ccw',
    'counterclockwise',
    'undo',
    'turn',
    'tourner',
    'girar',
    'περιστροφή',
    'obróć',
    'cofnij',
  ];
}

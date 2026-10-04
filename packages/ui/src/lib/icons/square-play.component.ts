import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-square-play',
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
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2" />
      <path d="M10 8.5v7l5.5-3.5z" />
    </svg>
  `,
})
export class SquarePlayIconComponent extends IconComponentBase {
  static readonly slug = 'square-play';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'square-play',
    'play',
    'square',
    'video',
    'thumbnail',
    'lecture',
    'reproducir',
    'αναπαραγωγή',
    'odtwórz',
    'media',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-aspect-ratio',
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
        y="5"
        width="18"
        height="14"
        rx="2" />
      <line
        x1="6"
        y1="16"
        x2="18"
        y2="8" />
      <polyline points="14.5 8 18 8 18 11.5" />
      <polyline points="9.5 16 6 16 6 12.5" />
    </svg>
  `,
})
export class AspectRatioIconComponent extends IconComponentBase {
  static readonly slug = 'aspect-ratio';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'aspect ratio',
    'frame',
    'dimensions',
    'widescreen',
    'scale',
    "format d'image",
    'relación de aspecto',
    'λόγος διαστάσεων',
    'proporcje obrazu',
  ];
}

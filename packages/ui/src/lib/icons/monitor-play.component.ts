import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-monitor-play',
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
        x="2"
        y="3"
        width="20"
        height="14"
        rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M10 7v6l5-3z" />
    </svg>
  `,
})
export class MonitorPlayIconComponent extends IconComponentBase {
  static readonly slug = 'monitor-play';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'monitor-play',
    'monitor',
    'play',
    'screen',
    'video',
    'stream',
    'écran',
    'lecture',
    'pantalla',
    'reproducir',
    'οθόνη',
    'αναπαραγωγή',
    'ekran',
    'odtwarzanie',
  ];
}

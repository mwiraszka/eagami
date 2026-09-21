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
      <path
        d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
      <rect
        x="2"
        y="3"
        width="20"
        height="14"
        rx="2" />
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

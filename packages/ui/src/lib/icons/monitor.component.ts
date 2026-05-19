import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-monitor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
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
        rx="2"
        ry="2" />
      <line
        x1="8"
        y1="21"
        x2="16"
        y2="21" />
      <line
        x1="12"
        y1="17"
        x2="12"
        y2="21" />
    </svg>
  `,
})
export class MonitorIconComponent extends IconComponentBase {
  static readonly slug = 'monitor';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'monitor',
    'screen',
    'display',
    'computer',
    'desktop',
    'écran',
    'pantalla',
    'οθόνη',
    'monitor',
    'ekran',
  ];
}

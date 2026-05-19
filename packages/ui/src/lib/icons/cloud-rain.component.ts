import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-cloud-rain',
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
      <line
        x1="16"
        y1="13"
        x2="16"
        y2="21" />
      <line
        x1="8"
        y1="13"
        x2="8"
        y2="21" />
      <line
        x1="12"
        y1="15"
        x2="12"
        y2="23" />
      <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
    </svg>
  `,
})
export class CloudRainIconComponent extends IconComponentBase {
  static readonly slug = 'cloud-rain';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'cloud-rain',
    'cloud',
    'rain',
    'weather',
    'shower',
    'storm',
    'pluie',
    'météo',
    'lluvia',
    'tiempo',
    'βροχή',
    'καιρός',
    'deszcz',
    'pogoda',
  ];
}

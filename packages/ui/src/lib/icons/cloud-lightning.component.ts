import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-cloud-lightning',
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
      <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
      <polyline points="13 11 9 17 15 17 11 23" />
    </svg>
  `,
})
export class CloudLightningIconComponent extends IconComponentBase {
  static readonly slug = 'cloud-lightning';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'cloud-lightning',
    'cloud',
    'lightning',
    'storm',
    'thunder',
    'weather',
    'bolt',
    'éclair',
    'orage',
    'relámpago',
    'tormenta',
    'αστραπή',
    'καταιγίδα',
    'błyskawica',
    'burza',
  ];
}

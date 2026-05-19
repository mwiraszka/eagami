import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-zoom-in',
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
      <circle
        cx="11"
        cy="11"
        r="8" />
      <line
        x1="21"
        y1="21"
        x2="16.65"
        y2="16.65" />
      <line
        x1="11"
        y1="8"
        x2="11"
        y2="14" />
      <line
        x1="8"
        y1="11"
        x2="14"
        y2="11" />
    </svg>
  `,
})
export class ZoomInIconComponent extends IconComponentBase {
  static readonly slug = 'zoom-in';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'zoom-in',
    'zoom',
    'in',
    'magnify',
    'enlarge',
    'closer',
    'agrandir',
    'acercar',
    'ampliar',
    'μεγέθυνση',
    'εστίαση',
    'powiększ',
    'przybliż',
  ];
}

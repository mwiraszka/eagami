import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-cloudflare',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path
        d="M16.36 17.36a.5.5 0 0 0 .49-.6l-.34-1.6a1.97 1.97 0 0 0-1.93-1.6h-8.7a.2.2 0 0 1-.2-.27.27.27 0 0 1 .23-.18l8.78-.11a3.13 3.13 0 0 0 2.84-2.32l.36-1.37a.18.18 0 0 0 0-.08 6.27 6.27 0 0 0-12.04-.65 2.81 2.81 0 0 0-4.44 2.94 4 4 0 0 0-3.9 4 .19.19 0 0 0 .19.18Z"
        fill="#F38020" />
      <path
        d="M19.04 8.62a4.41 4.41 0 0 0-.78.07.14.14 0 0 0-.1.1l-.53 1.85a1.97 1.97 0 0 1-1.93 1.6l-1.84.04a.06.06 0 0 0-.04.1.27.27 0 0 0 .12.09l1.91.09a3.13 3.13 0 0 1 2.84 2.32l.13.46a.13.13 0 0 0 .13.1c2.21 0 4-1.79 4-4s-1.79-4.82-4-4.82Z"
        fill="#FAAE40" />
    </svg>
  `,
})
export class CloudflareIconComponent extends IconComponentBase {
  static readonly slug = 'cloudflare';
  static readonly category: IconCategory = 'eagami';
  static readonly isBrand = true;
  static readonly tags: ReadonlyArray<string> = [
    'cloudflare',
    'cdn',
    'cloud',
    'hosting',
    'dns',
  ];
}

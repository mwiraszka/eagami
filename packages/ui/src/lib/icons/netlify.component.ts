import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-netlify',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="4 4 16 16"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path
        d="m13.4 13.144-.71-.71 4.474-4.474 1.86 1.07a.39.39 0 0 1 .15.378l-.69 4.31-5.084-.574Zm-2.8 0L5.516 13.72l-.69-4.31a.39.39 0 0 1 .15-.379l1.86-1.07 4.474 4.474-.71.71Zm.71-2.04L7.05 6.694l.71-.71L12 9.604l4.24-3.62.71.71-4.26 4.41-.71-.71-.67.71Zm.69 6.91-4.24-3.62-.71.71 4.26 4.41.71-.71 4.24-3.62-.71-.71-3.55 3.54Z"
        fill="#00C7B7" />
    </svg>
  `,
})
export class NetlifyIconComponent extends IconComponentBase {
  static readonly slug = 'netlify';
  static readonly category: IconCategory = 'eagami';
  static readonly isBrand = true;
  static readonly tags: ReadonlyArray<string> = [
    'netlify',
    'hosting',
    'deploy',
    'jamstack',
  ];
}

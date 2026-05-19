import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-chrome',
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
        cx="12"
        cy="12"
        r="10" />
      <circle
        cx="12"
        cy="12"
        r="4" />
      <line
        x1="21.17"
        y1="8"
        x2="12"
        y2="8" />
      <line
        x1="3.95"
        y1="6.06"
        x2="8.54"
        y2="14" />
      <line
        x1="10.88"
        y1="21.94"
        x2="15.46"
        y2="14" />
    </svg>
  `,
})
export class ChromeIconComponent extends IconComponentBase {
  static readonly slug = 'chrome';
  static readonly category: IconCategory = 'feather';
  static readonly isBrand = true;
  static readonly tags: ReadonlyArray<string> = [
    'chrome',
    'browser',
    'google',
    'web',
    'navigateur',
    'navegador',
    'περιηγητής',
    'przeglądarka',
  ];
}

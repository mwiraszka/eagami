import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-scale',
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
      <path d="M12 4v16" />
      <path d="M8 20h8" />
      <path d="M5.5 7h13" />
      <path d="m3 13 2.5-6L8 13" />
      <path d="M3 13h5a2.5 2.5 0 0 1-5 0" />
      <path d="m16 13 2.5-6 2.5 6" />
      <path d="M16 13h5a2.5 2.5 0 0 1-5 0" />
    </svg>
  `,
})
export class ScaleIconComponent extends IconComponentBase {
  static readonly slug = 'scale';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'scale',
    'balance',
    'justice',
    'law',
    'legal',
    'weigh',
    'équilibre',
    'juridique',
    'balanza',
    'justicia',
    'ζυγαριά',
    'δικαιοσύνη',
    'waga',
    'sprawiedliwość',
  ];
}

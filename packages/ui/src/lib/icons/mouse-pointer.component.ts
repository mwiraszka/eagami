import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-mouse-pointer',
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
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      <path d="M13 13l6 6" />
    </svg>
  `,
})
export class MousePointerIconComponent extends IconComponentBase {
  static readonly slug = 'mouse-pointer';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'mouse-pointer',
    'mouse',
    'pointer',
    'cursor',
    'click',
    'arrow',
    'souris',
    'curseur',
    'ratón',
    'cursor',
    'ποντίκι',
    'δείκτης',
    'mysz',
    'kursor',
  ];
}

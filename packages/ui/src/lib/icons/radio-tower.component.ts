import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-radio-tower',
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
      <circle
        cx="12"
        cy="7"
        r="2" />
      <path d="M11 9 7 21" />
      <path d="m13 9 4 12" />
      <path d="M9 16h6" />
      <path d="M7.5 3.5a6 6 0 0 0 0 7" />
      <path d="M16.5 3.5a6 6 0 0 1 0 7" />
      <path d="M4.6 1.5a9.5 9.5 0 0 0 0 11" />
      <path d="M19.4 1.5a9.5 9.5 0 0 1 0 11" />
    </svg>
  `,
})
export class RadioTowerIconComponent extends IconComponentBase {
  static readonly slug = 'radio-tower';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'radio-tower',
    'radio',
    'tower',
    'broadcast',
    'antenna',
    'signal',
    'transmitter',
    'émetteur',
    'antenne',
    'torre de radio',
    'antena',
    'πύργος ραδιοφώνου',
    'κεραία',
    'nadajnik',
    'wieża radiowa',
  ];
}

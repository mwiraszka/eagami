import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-piggy-bank',
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
      <path
        d="M6 8.5C7.5 7 10 6 13.5 6l3-2v3.2c1.5.8 2.6 2 3.2 3.3h1.8v4h-2c-.5 1.2-1.4 2.2-2.5 3v3h-3V19h-4v1.5H7v-3C5.5 16.5 4.5 15 4.5 12.8c0-1.6.5-3.1 1.5-4.3z" />
      <path d="M16.5 11h.01" />
      <path d="M9.5 9.5h3" />
      <path d="M4.6 11.5c-1.3 0-2.1-.7-2.1-2" />
    </svg>
  `,
})
export class PiggyBankIconComponent extends IconComponentBase {
  static readonly slug = 'piggy-bank';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'piggy-bank',
    'savings',
    'save',
    'money',
    'budget',
    'deposit',
    'tirelire',
    'épargne',
    'hucha',
    'ahorro',
    'κουμπαράς',
    'αποταμίευση',
    'skarbonka',
    'oszczędności',
  ];
}

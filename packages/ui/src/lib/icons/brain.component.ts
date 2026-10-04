import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-brain',
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
        d="M12 3.8a3.3 3.3 0 0 0-5.8 2 3.25 3.25 0 0 0-1.2 6 3.1 3.1 0 0 0 .8 5.8A3.6 3.6 0 0 0 12 20.4z" />
      <path
        d="M12 3.8a3.3 3.3 0 0 1 5.8 2 3.25 3.25 0 0 1 1.2 6 3.1 3.1 0 0 1-.8 5.8A3.6 3.6 0 0 1 12 20.4" />
      <path d="M14.5 13a3.5 3.5 0 0 1-2.5-3 3.5 3.5 0 0 1-2.5 3" />
      <path d="M5 11.8c.7 0 1.3.2 1.8.5" />
      <path d="M19 11.8c-.7 0-1.3.2-1.8.5" />
    </svg>
  `,
})
export class BrainIconComponent extends IconComponentBase {
  static readonly slug = 'brain';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'brain',
    'mind',
    'intelligence',
    'think',
    'ai',
    'cerveau',
    'cerebro',
    'εγκέφαλος',
    'mózg',
  ];
}

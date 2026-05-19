import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-help-circle',
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
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line
        x1="12"
        y1="17"
        x2="12.01"
        y2="17" />
    </svg>
  `,
})
export class HelpCircleIconComponent extends IconComponentBase {
  static readonly slug = 'help-circle';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'help-circle',
    'help',
    'circle',
    'question',
    'support',
    'info',
    'aide',
    'question',
    'ayuda',
    'pregunta',
    'βοήθεια',
    'ερώτηση',
    'pomoc',
    'pytanie',
  ];
}

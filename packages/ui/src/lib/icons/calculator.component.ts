import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-calculator',
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
      <rect
        x="5"
        y="2"
        width="14"
        height="20"
        rx="2" />
      <rect
        x="8"
        y="5"
        width="8"
        height="4"
        rx="1" />
      <path d="M8.5 13.75h.01" />
      <path d="M12 13.75h.01" />
      <path d="M15.5 13.75h.01" />
      <path d="M8.5 17.25h.01" />
      <path d="M12 17.25h.01" />
      <path d="M15.5 17.25h.01" />
    </svg>
  `,
})
export class CalculatorIconComponent extends IconComponentBase {
  static readonly slug = 'calculator';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'calculator',
    'math',
    'count',
    'calculate',
    'calculatrice',
    'calculadora',
    'αριθμομηχανή',
    'kalkulator',
  ];
}

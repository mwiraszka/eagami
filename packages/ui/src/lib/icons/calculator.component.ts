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
        width="16"
        height="20"
        x="4"
        y="2"
        rx="2" />
      <line
        x1="8"
        x2="16"
        y1="6"
        y2="6" />
      <line
        x1="16"
        x2="16"
        y1="14"
        y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
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

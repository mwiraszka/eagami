import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-toggle-right',
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
        x="1"
        y="5"
        width="22"
        height="14"
        rx="7"
        ry="7" />
      <circle
        cx="16"
        cy="12"
        r="3" />
    </svg>
  `,
})
export class ToggleRightIconComponent extends IconComponentBase {
  static readonly slug = 'toggle-right';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'toggle-right',
    'toggle',
    'right',
    'switch',
    'on',
    'interrupteur',
    'droite',
    'interruptor',
    'derecha',
    'διακόπτης',
    'δεξιά',
    'przełącznik',
    'prawo',
  ];
}

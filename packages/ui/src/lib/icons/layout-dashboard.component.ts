import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-layout-dashboard',
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
        x="3"
        y="3"
        width="7"
        height="9"
        rx="1" />
      <rect
        x="14"
        y="3"
        width="7"
        height="5"
        rx="1" />
      <rect
        x="14"
        y="12"
        width="7"
        height="9"
        rx="1" />
      <rect
        x="3"
        y="16"
        width="7"
        height="5"
        rx="1" />
    </svg>
  `,
})
export class LayoutDashboardIconComponent extends IconComponentBase {
  static readonly slug = 'layout-dashboard';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'layout-dashboard',
    'dashboard',
    'layout',
    'panels',
    'overview',
    'tableau de bord',
    'disposition',
    'panel de control',
    'diseño',
    'πίνακας ελέγχου',
    'διάταξη',
    'pulpit',
    'układ',
  ];
}

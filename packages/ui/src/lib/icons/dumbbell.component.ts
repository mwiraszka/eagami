import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-dumbbell',
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
      <path d="M5 12h14" />
      <path d="M5 9v6" />
      <path d="M8 7v10" />
      <path d="M16 7v10" />
      <path d="M19 9v6" />
    </svg>
  `,
})
export class DumbbellIconComponent extends IconComponentBase {
  static readonly slug = 'dumbbell';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'dumbbell',
    'gym',
    'fitness',
    'workout',
    'exercise',
    'weights',
    'haltère',
    'musculation',
    'mancuerna',
    'gimnasio',
    'αλτήρας',
    'γυμναστήριο',
    'hantla',
    'siłownia',
  ];
}

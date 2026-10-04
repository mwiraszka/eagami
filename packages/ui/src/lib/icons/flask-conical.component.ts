import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-flask-conical',
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
      <path d="M10 3v6L4.5 19a1.4 1.4 0 0 0 1.2 2h12.6a1.4 1.4 0 0 0 1.2-2L14 9V3" />
      <path d="M8.5 3h7" />
      <path d="M6.7 15h10.6" />
    </svg>
  `,
})
export class FlaskConicalIconComponent extends IconComponentBase {
  static readonly slug = 'flask-conical';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'flask-conical',
    'flask',
    'lab',
    'experiment',
    'science',
    'beta',
    'chemistry',
    'fiole',
    'laboratoire',
    'matraz',
    'laboratorio',
    'φιάλη',
    'εργαστήριο',
    'kolba',
    'laboratorium',
  ];
}

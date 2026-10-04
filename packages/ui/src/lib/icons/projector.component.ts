import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-projector',
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
        x="2"
        y="7"
        width="20"
        height="11"
        rx="2" />
      <circle
        cx="8"
        cy="12.5"
        r="2.5" />
      <path d="M14 11h4" />
      <path d="M14 14h4" />
      <path d="M6 18v2" />
      <path d="M18 18v2" />
    </svg>
  `,
})
export class ProjectorIconComponent extends IconComponentBase {
  static readonly slug = 'projector';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'projector',
    'beamer',
    'presentation',
    'cinema',
    'screen',
    'projecteur',
    'proyector',
    'προβολέας',
    'projektor',
    'video',
  ];
}

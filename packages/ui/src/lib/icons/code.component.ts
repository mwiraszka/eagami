import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-code',
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  `,
})
export class CodeIconComponent extends IconComponentBase {
  static readonly slug = 'code';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'code',
    'programming',
    'developer',
    'syntax',
    'brackets',
    'script',
    'programmation',
    'développement',
    'código',
    'programación',
    'κώδικας',
    'προγραμματισμός',
    'kod',
    'programowanie',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-graduation-cap',
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
      <path d="M12 4 2 9l10 5 10-5z" />
      <path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      <path d="M22 9v6" />
    </svg>
  `,
})
export class GraduationCapIconComponent extends IconComponentBase {
  static readonly slug = 'graduation-cap';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'graduation-cap',
    'education',
    'school',
    'university',
    'learning',
    'student',
    'diplôme',
    'éducation',
    'graduación',
    'educación',
    'αποφοίτηση',
    'εκπαίδευση',
    'edukacja',
    'student',
  ];
}

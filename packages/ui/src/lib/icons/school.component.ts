import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-school',
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
      <path d="M3 20h18" />
      <path d="M5 20v-9l7-4 7 4v9" />
      <path d="M12 7V3h3" />
      <path d="M10 20v-4h4v4" />
      <path d="M12 11.5h.01" />
    </svg>
  `,
})
export class SchoolIconComponent extends IconComponentBase {
  static readonly slug = 'school';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'school',
    'education',
    'building',
    'campus',
    'learning',
    'class',
    'école',
    'éducation',
    'escuela',
    'colegio',
    'σχολείο',
    'εκπαίδευση',
    'szkoła',
    'edukacja',
  ];
}

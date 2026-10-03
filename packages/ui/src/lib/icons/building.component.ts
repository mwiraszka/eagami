import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-building',
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
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
      <path d="M3 21h18" />
      <path d="M10.25 7.5h.01" />
      <path d="M13.75 7.5h.01" />
      <path d="M10.25 11h.01" />
      <path d="M13.75 11h.01" />
      <path d="M10 21v-5h4v5" />
    </svg>
  `,
})
export class BuildingIconComponent extends IconComponentBase {
  static readonly slug = 'building';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'building',
    'office',
    'company',
    'organization',
    'apartment',
    'immeuble',
    'bâtiment',
    'edificio',
    'oficina',
    'κτίριο',
    'γραφείο',
    'budynek',
    'biuro',
  ];
}

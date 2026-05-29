import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-type',
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
      <polyline points="4 7 4 4 20 4 20 7" />
      <line
        x1="9"
        y1="20"
        x2="15"
        y2="20" />
      <line
        x1="12"
        y1="4"
        x2="12"
        y2="20" />
    </svg>
  `,
})
export class TypeIconComponent extends IconComponentBase {
  static readonly slug = 'type';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'type',
    'text',
    'font',
    'typography',
    'letter',
    'texte',
    'police',
    'fuente',
    'texto',
    'γραμματοσειρά',
    'κείμενο',
    'czcionka',
    'tekst',
  ];
}

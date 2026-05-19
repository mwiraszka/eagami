import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-pentagon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <polygon points="12 2 21.51 8.91 17.88 20.09 6.12 20.09 2.49 8.91" />
    </svg>
  `,
})
export class PentagonIconComponent extends IconComponentBase {
  static readonly slug = 'pentagon';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'pentagon',
    'five-sided',
    'polygon',
    'shape',
    'pentagone',
    'pentágono',
    'πεντάγωνο',
    'pięciokąt',
  ];
}

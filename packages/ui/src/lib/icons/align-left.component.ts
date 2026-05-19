import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-align-left',
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
      <line
        x1="17"
        y1="10"
        x2="3"
        y2="10" />
      <line
        x1="21"
        y1="6"
        x2="3"
        y2="6" />
      <line
        x1="21"
        y1="14"
        x2="3"
        y2="14" />
      <line
        x1="17"
        y1="18"
        x2="3"
        y2="18" />
    </svg>
  `,
})
export class AlignLeftIconComponent extends IconComponentBase {
  static readonly slug = 'align-left';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'align-left',
    'align',
    'left',
    'text',
    'format',
    'paragraph',
    'gauche',
    'izquierda',
    'αριστερά',
    'στοίχιση',
    'lewo',
    'wyrównaj',
  ];
}

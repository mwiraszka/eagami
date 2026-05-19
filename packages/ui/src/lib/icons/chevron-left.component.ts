import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-chevron-left',
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
      <polyline points="15 18 9 12 15 6" />
    </svg>
  `,
})
export class ChevronLeftIconComponent extends IconComponentBase {
  static readonly slug = 'chevron-left';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'chevron-left',
    'chevron',
    'left',
    'arrow',
    'back',
    'previous',
    'gauche',
    'izquierda',
    'αριστερά',
    'lewo',
  ];
}

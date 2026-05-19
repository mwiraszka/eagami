import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-terminal',
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
      <polyline points="4 17 10 11 4 5" />
      <line
        x1="12"
        y1="19"
        x2="20"
        y2="19" />
    </svg>
  `,
})
export class TerminalIconComponent extends IconComponentBase {
  static readonly slug = 'terminal';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'terminal',
    'console',
    'command',
    'shell',
    'prompt',
    'developer',
    'terminal',
    'consola',
    'τερματικό',
    'κονσόλα',
    'konsola',
    'wiersz poleceń',
  ];
}

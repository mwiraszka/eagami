import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-rewind',
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
      <polygon points="11 19 2 12 11 5 11 19" />
      <polygon points="22 19 13 12 22 5 22 19" />
    </svg>
  `,
})
export class RewindIconComponent extends IconComponentBase {
  static readonly slug = 'rewind';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'rewind',
    'back',
    'reverse',
    'media',
    'player',
    'retour',
    'rebobinar',
    'πίσω',
    'cofnij',
    'przewiń',
    'music',
    'audio',
  ];
}

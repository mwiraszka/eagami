import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-step-forward',
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
      <path d="M10 5v14l10-7z" />
      <path d="M5 5v14" />
    </svg>
  `,
})
export class StepForwardIconComponent extends IconComponentBase {
  static readonly slug = 'step-forward';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'step-forward',
    'step',
    'frame',
    'next',
    'forward',
    'image suivante',
    'fotograma siguiente',
    'επόμενο καρέ',
    'następna klatka',
    'video',
  ];
}

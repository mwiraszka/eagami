import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-step-back',
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
      <path d="M14 5v14L4 12z" />
      <path d="M19 5v14" />
    </svg>
  `,
})
export class StepBackIconComponent extends IconComponentBase {
  static readonly slug = 'step-back';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'step-back',
    'step',
    'frame',
    'previous',
    'back',
    'image précédente',
    'fotograma anterior',
    'προηγούμενο καρέ',
    'poprzednia klatka',
    'video',
  ];
}

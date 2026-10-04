import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-pin',
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
      <path d="M8 3h8" />
      <path d="M9.5 3v6.5L6 14v2h12v-2l-3.5-4.5V3" />
      <path d="M12 16v6" />
    </svg>
  `,
})
export class PinIconComponent extends IconComponentBase {
  static readonly slug = 'pin';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'pin',
    'pushpin',
    'tack',
    'attach',
    'save',
    'épingle',
    'punaise',
    'chincheta',
    'alfiler',
    'καρφίτσα',
    'pinezka',
    'przypnij',
  ];
}

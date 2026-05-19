import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-dropbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.color]': "brand() ? '#0061FF' : null" },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path
        d="M6 1.807 0 5.629l6 3.822 6-3.822-6-3.822Zm12 0-6 3.822 6 3.822 6-3.822-6-3.822ZM0 13.274l6 3.822 6-3.822-6-3.822-6 3.822Zm18-3.822-6 3.822 6 3.822 6-3.822-6-3.822ZM6 18.371l6 3.822 6-3.822-6-3.822-6 3.822Z" />
    </svg>
  `,
})
export class DropboxIconComponent extends IconComponentBase {
  static readonly slug = 'dropbox';
  static readonly category: IconCategory = 'eagami';
  static readonly isBrand = true;
  static readonly tags: ReadonlyArray<string> = [
    'dropbox',
    'storage',
    'cloud',
    'files',
    'sync',
  ];
  readonly brand = input<boolean>(false);
}

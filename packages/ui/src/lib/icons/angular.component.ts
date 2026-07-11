import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-angular',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.color]': "brand() ? '#0F0F11' : null" },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path
        d="M16.712 17.711H7.288l-1.204 2.916L12 24l5.916-3.373-1.204-2.916ZM14.692 0l7.832 16.855.814-12.856L14.692 0ZM9.308 0 .662 3.999l.814 12.856L9.308 0Zm-.405 13.93h6.198L12 6.396 8.903 13.93Z" />
    </svg>
  `,
})
export class AngularIconComponent extends IconComponentBase {
  static readonly slug = 'angular';
  static readonly category: IconCategory = 'eagami';
  static readonly isBrand = true;
  static readonly tags: ReadonlyArray<string> = [
    'angular',
    'framework',
    'typescript',
    'frontend',
    'web',
  ];
  readonly brand = input<boolean>(false);
}

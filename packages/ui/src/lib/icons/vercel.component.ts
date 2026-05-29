import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-vercel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.color]': "brand() ? '#000000' : null" },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path d="M12 2 24 22H0Z" />
    </svg>
  `,
})
export class VercelIconComponent extends IconComponentBase {
  static readonly slug = 'vercel';
  static readonly category: IconCategory = 'eagami';
  static readonly isBrand = true;
  static readonly tags: ReadonlyArray<string> = ['vercel', 'hosting', 'deploy', 'nextjs'];
  readonly brand = input<boolean>(false);
}

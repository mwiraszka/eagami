import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-snowflake',
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
      <path d="M12 2v20" />
      <path d="m3.34 7 17.32 10" />
      <path d="M20.66 7 3.34 17" />
      <path d="m9.4 3.5 2.6 1.5 2.6-1.5" />
      <path d="m9.4 20.5 2.6-1.5 2.6 1.5" />
      <path d="M20.66 10l-2.6-1.5v-3" />
      <path d="m3.34 10 2.6-1.5v-3" />
      <path d="m3.34 14 2.6 1.5v3" />
      <path d="m20.66 14-2.6 1.5v3" />
    </svg>
  `,
})
export class SnowflakeIconComponent extends IconComponentBase {
  static readonly slug = 'snowflake';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'snowflake',
    'snow',
    'winter',
    'cold',
    'frost',
    'flocon',
    'copo',
    'νιφάδα',
    'płatek',
  ];
}

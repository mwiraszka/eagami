import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ea-icon-linkedin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'display: inline-flex; width: 1em; height: 1em;',
    '[style.color]': "brand() ? '#0A66C2' : null",
  },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  `,
})
export class LinkedinIconComponent {
  readonly brand = input<boolean>(false);
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ea-icon-vercel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'display: inline-flex; width: 1em; height: 1em;',
    '[style.color]': "brand() ? '#000000' : null",
  },
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
export class VercelIconComponent {
  readonly brand = input<boolean>(false);
}

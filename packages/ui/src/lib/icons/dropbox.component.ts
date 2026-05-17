import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ea-icon-dropbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'display: inline-flex; width: 1em; height: 1em;',
    '[style.color]': "brand() ? '#0061FF' : null",
  },
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
export class DropboxIconComponent {
  readonly brand = input<boolean>(false);
}

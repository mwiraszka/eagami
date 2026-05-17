import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-mastercard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: inline-flex; width: 1em; height: 1em;' },
  template: `
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="100%"
      height="100%">
      <circle
        cx="9"
        cy="12"
        r="7"
        fill="#EB001B" />
      <circle
        cx="15"
        cy="12"
        r="7"
        fill="#F79E1B" />
      <path
        d="M12 6.764A6.984 6.984 0 0 1 14.5 12 6.984 6.984 0 0 1 12 17.236 6.984 6.984 0 0 1 9.5 12 6.984 6.984 0 0 1 12 6.764Z"
        fill="#FF5F00" />
    </svg>
  `,
})
export class MastercardIconComponent {}

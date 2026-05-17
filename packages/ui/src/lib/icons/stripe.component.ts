import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ea-icon-stripe',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'display: inline-flex; width: 1em; height: 1em;',
    '[style.color]': "brand() ? '#635BFF' : null",
  },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path
        d="M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.511-.977 1.422-.977 1.667 0 3.379.642 4.558 1.22l.666-4.111c-.935-.446-2.847-1.177-5.49-1.177-1.87 0-3.425.488-4.534 1.4-1.156.953-1.752 2.346-1.752 4.026 0 3.045 1.86 4.353 4.882 5.45 1.949.704 2.6 1.207 2.6 1.98 0 .751-.643 1.184-1.81 1.184-1.469 0-3.876-.72-5.444-1.642l-.666 4.158C6.738 20.213 9.099 21 11.553 21 13.532 21 15.182 20.53 16.3 19.643c1.246-.992 1.886-2.46 1.886-4.36 0-3.114-1.9-4.41-4.706-5.4Z" />
    </svg>
  `,
})
export class StripeIconComponent {
  readonly brand = input<boolean>(false);
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ea-icon-twitch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'display: inline-flex; width: 1em; height: 1em;',
    '[style.color]': "brand() ? '#9146FF' : null",
  },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path
        d="M11.571 4.714h1.715v5.143H11.57Zm4.715 0H18v5.143h-1.714ZM6 0 1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0Zm14.571 11.143-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
    </svg>
  `,
})
export class TwitchIconComponent {
  readonly brand = input<boolean>(false);
}

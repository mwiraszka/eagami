import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ea-icon-spotify',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'display: inline-flex; width: 1em; height: 1em;',
    '[style.color]': "brand() ? '#1DB954' : null",
  },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path
        d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm5.5 17.32a.748.748 0 0 1-1.029.249c-2.818-1.721-6.366-2.111-10.546-1.156a.748.748 0 0 1-.331-1.458c4.575-1.045 8.498-.594 11.658 1.336a.748.748 0 0 1 .248 1.029Zm1.468-3.265a.935.935 0 0 1-1.286.308c-3.227-1.984-8.146-2.558-11.965-1.4a.935.935 0 1 1-.542-1.79c4.362-1.323 9.782-.682 13.485 1.595a.935.935 0 0 1 .308 1.287Zm.126-3.4c-3.869-2.298-10.252-2.51-13.946-1.39a1.121 1.121 0 1 1-.652-2.146c4.241-1.286 11.288-1.038 15.74 1.605a1.121 1.121 0 0 1-1.142 1.93Z" />
    </svg>
  `,
})
export class SpotifyIconComponent {
  readonly brand = input<boolean>(false);
}

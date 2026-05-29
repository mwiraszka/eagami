import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-reddit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.color]': "brand() ? '#FF4500' : null" },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path
        d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.974 0 1.764.79 1.764 1.764 0 .715-.423 1.33-1.035 1.612a3.32 3.32 0 0 1 .045.516c0 2.652-3.086 4.802-6.888 4.802-3.803 0-6.889-2.15-6.889-4.802 0-.176.016-.348.045-.516a1.77 1.77 0 0 1-1.035-1.612c0-.974.79-1.764 1.764-1.764.477 0 .898.182 1.207.49 1.207-.868 2.88-1.43 4.728-1.487l.898-4.21a.342.342 0 0 1 .42-.255l2.922.617a1.25 1.25 0 0 1 1.118-.694Zm-8.626 7.844a1.249 1.249 0 0 0 0 2.498 1.249 1.249 0 0 0 0-2.498Zm7.232 0a1.249 1.249 0 1 0 0 2.498 1.249 1.249 0 0 0 0-2.498Zm-3.62 5.226c-1.146 0-2.222-.04-3.319.097a.252.252 0 0 0-.169.353c.477.892 1.797 1.519 3.488 1.519 1.69 0 3.01-.627 3.488-1.519a.249.249 0 0 0-.166-.355c-1.097-.135-2.176-.095-3.322-.095Z" />
    </svg>
  `,
})
export class RedditIconComponent extends IconComponentBase {
  static readonly slug = 'reddit';
  static readonly category: IconCategory = 'eagami';
  static readonly isBrand = true;
  static readonly tags: ReadonlyArray<string> = [
    'reddit',
    'social',
    'forum',
    'community',
  ];
  readonly brand = input<boolean>(false);
}

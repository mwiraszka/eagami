import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { UserIconComponent } from '../icons/user.component';

/** Diameter (or side length) preset for an avatar. */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/** Outline of the avatar: round or rounded-square. */
export type AvatarShape = 'circle' | 'square';

/**
 * Compact image used to represent a user or entity. Falls back to initials
 * when no `src` is provided, then to a generic user icon when neither image
 * nor initials are available.
 */
@Component({
  selector: 'ea-avatar',
  imports: [NgClass, UserIconComponent],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { style: 'display: inline-block; line-height: 0;' },
})
export class AvatarComponent {
  readonly src = input<string | undefined>(undefined);
  readonly alt = input<string>('');
  readonly initials = input<string | undefined>(undefined);
  readonly size = input<AvatarSize>('md');
  readonly shape = input<AvatarShape>('circle');

  readonly hostClasses = computed(() => ({
    [`ea-avatar--${this.size()}`]: true,
    [`ea-avatar--${this.shape()}`]: true,
  }));

  readonly showImage = computed(() => !!this.src());
  readonly showInitials = computed(() => !this.src() && !!this.initials());
  readonly showFallback = computed(() => !this.src() && !this.initials());

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}

import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostAttributeToken,
  Renderer2,
  type Type,
  computed,
  inject,
  input,
} from '@angular/core';

import { buttonClasses } from './button-classes';
import {
  type ButtonAlign,
  type ButtonSize,
  type ButtonVariant,
} from './button.component';

/**
 * Button styling for an anchor, for navigation that should look like a button
 * while staying a real link: middle-click and open in a new tab work, and
 * assistive technology announces it as a link. Put it on an `<a>` with an
 * `href`, or with Angular's `routerLink`, which binds the `href` itself
 * (`<a eaButtonLink routerLink="/pricing">`). Takes the same styling inputs as
 * `ea-button` and is painted by the same stylesheet.
 *
 * `disabled` sets `aria-disabled`, takes the link out of the tab order, and
 * blocks activation before `routerLink` or any `(click)` handler sees it, so
 * nothing navigates. There is no loading state: a link hands off to the
 * browser or router, so there is no in-flight action for a spinner to cover.
 */
@Component({
  selector: 'a[eaButtonLink]',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button.component.scss', './button-link.component.scss'],
  imports: [NgClass, NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ea-button--full-width]': 'fullWidth()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.tabindex]': 'disabled() ? -1 : authoredTabindex',
  },
})
export class ButtonLinkComponent {
  protected readonly authoredTabindex = inject(new HostAttributeToken('tabindex'), {
    optional: true,
  });

  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);
  /**
   * Places the content along the inline axis of a link wider than it, as a
   * full-width one is; `start` lets a stack of links read as list rows.
   */
  readonly align = input<ButtonAlign>('center');
  readonly uppercase = input<boolean>(false);
  /** Optional icon component rendered before the label. */
  readonly icon = input<Type<unknown> | undefined>(undefined);

  protected readonly boxClasses = computed(() =>
    buttonClasses({
      variant: this.variant(),
      size: this.size(),
      align: this.align(),
      fullWidth: this.fullWidth(),
      uppercase: this.uppercase(),
      loading: false,
      disabled: this.disabled(),
    }),
  );

  constructor() {
    const host = inject<ElementRef<HTMLAnchorElement>>(ElementRef).nativeElement;
    const renderer = inject(Renderer2);
    const destroyRef = inject(DestroyRef);
    const block = (event: MouseEvent): void => {
      if (this.disabled()) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    // Capture phase: Angular runs every (click) bound on one element, routerLink's
    // included, from a single native listener, so only an earlier phase can stop them
    for (const type of ['click', 'auxclick']) {
      destroyRef.onDestroy(renderer.listen(host, type, block, { capture: true }));
    }
  }
}

import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  Renderer2,
  type Type,
  computed,
  effect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';

import { type EaSize } from '../sizes';
import { buttonClasses } from './button-classes';

/**
 * Visual style of a button; drives colour and emphasis. `link` drops the box
 * for an inline text link in the link colour, underlined on hover and focus.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
/** Visual size of a button. */
export type ButtonSize = EaSize;
/** HTML `type` attribute applied to the underlying `<button>` element. */
export type ButtonType = 'button' | 'submit' | 'reset';
/**
 * Placement of a button's content along its inline axis when the button is
 * wider than its content. `start` and `end` follow the text direction.
 */
export type ButtonAlign = 'start' | 'center' | 'end';

/**
 * Standard action button supporting primary, secondary, ghost, danger, and
 * link variants. Includes a loading state that swaps the label for a spinner
 * while preserving the rendered width. Chrome is tunable per instance via
 * `--ea-button-padding`, `--ea-button-min-height` and `--ea-button-radius`,
 * which is how an icon-only button comes down to little more than its glyph
 * and how a call-to-action becomes a pill, and `--ea-button-focus-ring-offset`
 * moves the focus ring's gap, which a negative length draws inside a button
 * packed too tightly among others for the ring to fit around it. For
 * navigation, put
 * `ButtonLinkComponent` on an anchor instead (`<a eaButtonLink href="...">`):
 * it takes the same styling inputs and keeps real link behaviour.
 */
@Component({
  selector: 'ea-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  imports: [NgClass, NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ea-button--full-width]': 'fullWidth()',
  },
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly type = input<ButtonType>('button');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);
  /**
   * Places the content along the inline axis of a button wider than it, as a
   * full-width one is; `start` lets a stack of buttons read as list rows.
   */
  readonly align = input<ButtonAlign>('center');
  readonly uppercase = input<boolean>(false);
  /** Optional icon component rendered to the left of the label. */
  readonly icon = input<Type<unknown> | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly ariaCurrent = input<string | undefined>(undefined, { alias: 'aria-current' });
  /** Space-separated ids of the elements whose text names the button. */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: 'aria-labelledby',
  });
  /** Space-separated ids of the elements that describe the button, e.g. a hint. */
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: 'aria-describedby',
  });
  /** Whether the content this button shows and hides is open, for a disclosure toggle. */
  readonly ariaExpanded = input<boolean | undefined>(undefined, {
    alias: 'aria-expanded',
  });
  /** Id of the element this button shows, hides or otherwise controls. */
  readonly ariaControls = input<string | undefined>(undefined, {
    alias: 'aria-controls',
  });

  private readonly renderer = inject(Renderer2);
  private readonly buttonEl = viewChild<ElementRef<HTMLButtonElement>>('buttonEl');
  private readonly ownedAria = new Set<string>();

  /** Fires when the button is activated; suppressed while disabled or loading. */
  readonly clicked = output<MouseEvent>();

  readonly isDisabled = computed(() => this.disabled() || this.loading());

  readonly hostClasses = computed(() =>
    buttonClasses({
      variant: this.variant(),
      size: this.size(),
      align: this.align(),
      fullWidth: this.fullWidth(),
      uppercase: this.uppercase(),
      loading: this.loading(),
      disabled: this.isDisabled(),
    }),
  );

  constructor() {
    // Written only when given: trigger directives such as the menu trigger keep
    // the same state on the inner button, and an empty binding would wipe it
    effect(() => {
      const button = this.buttonEl()?.nativeElement;
      if (!button) {
        return;
      }
      const expanded = this.ariaExpanded();
      this.reflectAria(
        button,
        'aria-expanded',
        expanded === undefined ? undefined : String(expanded),
      );
      this.reflectAria(button, 'aria-controls', this.ariaControls() || undefined);
    });
  }

  handleClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }
    this.clicked.emit(event);
  }

  /** Moves keyboard focus to the underlying native button. */
  focus(): void {
    this.buttonEl()?.nativeElement.focus();
  }

  private reflectAria(
    button: HTMLButtonElement,
    name: string,
    value: string | undefined,
  ): void {
    if (value !== undefined) {
      this.renderer.setAttribute(button, name, value);
      this.ownedAria.add(name);
    } else if (this.ownedAria.delete(name)) {
      this.renderer.removeAttribute(button, name);
    }
  }
}

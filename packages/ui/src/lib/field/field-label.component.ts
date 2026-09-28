import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  Renderer2,
  TemplateRef,
  type Type,
  afterRenderEffect,
  computed,
  inject,
  input,
  linkedSignal,
  viewChild,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { InfoIconComponent } from '../icons/info.component';
import { PointerPressTracker } from '../pointer-press';
import { computePopoverPosition } from '../popover/popover-positioning';
import { uniqueId } from '../unique-id';

/** Gap in px between the help trigger and its bubble. */
const HELP_GAP = 4;
/** Matches the `--space-2` viewport margin the bubble's stylesheet caps it with. */
const HELP_VIEWPORT_MARGIN = 8;

// Shared field label for form-like components. Renders a `<label for>` when
// `forId` points at a single control, otherwise a `<span>` (grouped controls
// labelled via `aria-labelledby`). `display: contents` keeps the host out of
// the field's flex flow.
@Component({
  selector: 'ea-field-label',
  templateUrl: './field-label.component.html',
  styleUrl: './field-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InfoIconComponent, NgComponentOutlet, NgTemplateOutlet],
})
export class FieldLabelComponent {
  private readonly i18n = inject(EagamiI18nService);
  private readonly press = inject(PointerPressTracker);
  private readonly renderer = inject(Renderer2);

  readonly text = input.required<string>();
  /** Optional icon component rendered before the label text. */
  readonly icon = input<Type<unknown> | undefined>(undefined);
  /**
   * Help revealed by an info button beside the label, as plain text or a
   * template. Click, tap, Enter or Space toggles it, and it is announced when
   * shown; Escape, a click outside, or moving focus away closes it.
   */
  readonly help = input<string | TemplateRef<unknown> | undefined>(undefined);
  readonly forId = input<string | undefined>(undefined);
  readonly required = input<boolean>(false);
  readonly labelId = input<string | undefined>(undefined);

  // Starts closed again whenever the help itself changes
  protected readonly helpOpen = linkedSignal({
    source: this.help,
    computation: () => false,
  });
  protected readonly helpId = uniqueId('ea-field-label-help');
  protected readonly helpTemplate = computed(() => {
    const help = this.help();
    return help instanceof TemplateRef ? help : null;
  });
  protected readonly helpTriggerLabel = computed(() =>
    this.i18n.messages().fieldLabel.help(this.text()),
  );

  private readonly helpEl = viewChild<ElementRef<HTMLElement>>('helpEl');
  private readonly helpTrigger = viewChild<ElementRef<HTMLElement>>('helpTrigger');
  private readonly helpBubble = viewChild<ElementRef<HTMLElement>>('helpBubble');

  constructor() {
    afterRenderEffect(onCleanup => {
      const help = this.helpEl()?.nativeElement;
      const trigger = this.helpTrigger()?.nativeElement;
      const bubble = this.helpBubble()?.nativeElement;
      if (help && trigger && bubble) {
        onCleanup(this.attachHelpBubble(help, trigger, bubble));
      }
    });
  }

  protected toggleHelp(): void {
    this.helpOpen.update(open => !open);
  }

  // Clicking the bubble's own text blurs to nothing, which is not leaving it
  protected onHelpFocusout(event: FocusEvent): void {
    const next = event.relatedTarget;
    if (next instanceof Node && !this.helpEl()?.nativeElement.contains(next)) {
      this.helpOpen.set(false);
    }
  }

  /** Raises and places an open bubble and wires its dismissal; returns the teardown. */
  private attachHelpBubble(
    help: HTMLElement,
    trigger: HTMLElement,
    bubble: HTMLElement,
  ): () => void {
    // The bubble stays in the live region beside its trigger, so the top layer
    // is its only way past an ancestor that clips, transforms or contains it
    if (typeof bubble.showPopover === 'function') {
      try {
        bubble.showPopover();
      } catch {
        bubble.removeAttribute('popover');
      }
    }

    const place = (): void => {
      const { width, height } = bubble.getBoundingClientRect();
      const { top, left } = computePopoverPosition(
        trigger.getBoundingClientRect(),
        { width, height },
        {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
        },
        { placement: 'top', offset: HELP_GAP, margin: HELP_VIEWPORT_MARGIN },
      );
      this.renderer.setStyle(bubble, 'top', `${top}px`);
      this.renderer.setStyle(bubble, 'left', `${left}px`);
    };
    const onClick = (event: MouseEvent): void => {
      const target = event.target;
      if (
        (target instanceof Node && help.contains(target)) ||
        this.press.touchedInside(help)
      ) {
        return;
      }
      this.helpOpen.set(false);
    };
    // Captured and consumed, so Escape closes the bubble and not also a dialog
    // or popover the field sits in
    const onKeydown = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      // A link in template help is about to be removed from under the focus
      if (bubble.contains(document.activeElement)) {
        trigger.focus();
      }
      this.helpOpen.set(false);
    };
    const scrollOptions: AddEventListenerOptions = { capture: true, passive: true };

    place();
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeydown, true);
    window.addEventListener('scroll', place, scrollOptions);
    window.addEventListener('resize', place);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeydown, true);
      window.removeEventListener('scroll', place, scrollOptions);
      window.removeEventListener('resize', place);
    };
  }
}

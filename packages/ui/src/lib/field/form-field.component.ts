import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { type AbstractControl, NgControl } from '@angular/forms';

import {
  type EaErrorMessages,
  controlErrorStateFrom,
} from '../forms/control-error-state';
import { type EaSize } from '../sizes';
import { uniqueId } from '../unique-id';
import { FieldLabelComponent } from './field-label.component';
import { FieldMessagesComponent } from './field-messages.component';

/** Visual size of the field (label, control text, spacing, and messages). */
export type FormFieldSize = EaSize;

/**
 * Wraps a projected native control (`input`, `select`, or `textarea`) in the
 * library's standard field chrome: a label with required marker, a hint, and
 * error messages, including localized validation errors auto-derived from a
 * bound reactive or template-driven control. The label's `for` and the
 * control's `aria-describedby`, `aria-invalid`, and `aria-required` are wired
 * automatically. The eagami form components render this chrome themselves; use
 * this wrapper so native or custom controls read as part of the same form.
 *
 * The label and aria wiring attach in the browser after render, since the
 * projected control can't be reached before it exists; the server ships the
 * plain markup and the associations complete on hydration.
 */
@Component({
  selector: 'ea-form-field',
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // None so the styles can reach the projected native control, which carries
  // the consumer's scoping attribute rather than this component's
  encapsulation: ViewEncapsulation.None,
  imports: [FieldLabelComponent, FieldMessagesComponent],
})
export class FormFieldComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Text label rendered above the control. */
  readonly label = input<string | undefined>(undefined);
  /** Helper text shown below the control; hidden while an error is showing. */
  readonly hint = input<string | undefined>(undefined);
  /** Error message shown below the control; replaces the hint and flags the field invalid. */
  readonly errorMsg = input<string | undefined>(undefined);
  /** Per-validator-key message overrides for the projected form control (e.g. `{ required: '...' }`). */
  readonly errorMessages = input<EaErrorMessages | undefined>(undefined);
  /** Marks the field as required. */
  readonly required = input<boolean>(false);
  /** Visual size of the field; the label, control text, spacing, and messages scale with it. */
  readonly size = input<FormFieldSize>('md');
  /** id seed for the label and message wiring; auto-generated when omitted. */
  readonly id = input<string>(uniqueId('ea-form-field'));

  private readonly ngControl = contentChild(NgControl);
  private readonly rendered = signal(false);
  private readonly controlEl = signal<HTMLElement | null>(null);
  // The consumer's own aria-describedby, captured before this component starts
  // managing the attribute so external references survive message toggling
  private baseDescribedBy: string | null = null;

  protected readonly controlId = computed(() => this.controlEl()?.id);

  private readonly boundControl = computed<AbstractControl | null>(() =>
    this.rendered() ? (this.ngControl()?.control ?? null) : null,
  );

  private readonly errorState = controlErrorStateFrom(this.boundControl, {
    errorMsg: this.errorMsg,
    errorMessages: this.errorMessages,
  });
  protected readonly errorText = this.errorState.error;
  protected readonly hasError = this.errorState.hasError;
  protected readonly showHint = computed(() => !!this.hint() && !this.hasError());

  constructor() {
    // Browser-only: the server render ships the plain markup and the label and
    // aria wiring attach after hydration
    afterNextRender(() => this.rendered.set(true));

    effect(() => {
      if (!this.rendered()) {
        return;
      }
      // Re-locate the control when the projected form directive swaps
      this.ngControl();
      const el = this.host.nativeElement.querySelector<HTMLElement>(
        'input, select, textarea',
      );
      if (el && el !== this.controlEl()) {
        this.baseDescribedBy = el.getAttribute('aria-describedby');
        if (!el.id) {
          el.id = `${this.id()}-control`;
        }
      }
      this.controlEl.set(el);
    });

    effect(() => {
      const el = this.controlEl();
      if (!el) {
        return;
      }
      const message = this.hasError()
        ? `${this.id()}-error`
        : this.showHint()
          ? `${this.id()}-hint`
          : null;
      const describedBy = [this.baseDescribedBy, message].filter(Boolean).join(' ');
      if (describedBy) {
        el.setAttribute('aria-describedby', describedBy);
      } else {
        el.removeAttribute('aria-describedby');
      }
      if (this.hasError()) {
        el.setAttribute('aria-invalid', 'true');
      } else {
        el.removeAttribute('aria-invalid');
      }
      // aria-required rather than the native attribute: the projected control
      // may already carry reactive-forms validators, so only the state is
      // conveyed, without altering native constraint validation
      if (this.required()) {
        el.setAttribute('aria-required', 'true');
      } else {
        el.removeAttribute('aria-required');
      }
    });
  }
}

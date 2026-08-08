import { Component, type Signal, forwardRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  type AbstractControl,
  type ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  type ValidatorFn,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
  type ControlErrorState,
  type EaErrorMessages,
  controlErrorStateFrom,
  injectControlErrorState,
} from './control-error-state';

/**
 * Every form component in the library routes its error text through this, so a
 * regression here silently changes the message 19 components display. The
 * per-key cases below each cover a different validator payload shape.
 */
describe('controlErrorStateFrom', () => {
  function build(
    control: AbstractControl | null,
    overrides?: {
      errorMsg?: string | null;
      errorMessages?: EaErrorMessages;
    },
  ): ControlErrorState {
    const ctrl: Signal<AbstractControl | null> = signal(control);
    return TestBed.runInInjectionContext(() =>
      controlErrorStateFrom(ctrl, {
        errorMsg: signal(overrides?.errorMsg ?? null),
        errorMessages: signal(overrides?.errorMessages),
      }),
    );
  }

  /** Auto-derived messages surface only once the control is invalid and touched. */
  function touchedInvalid(
    value: string | number | null,
    validators: ValidatorFn | ValidatorFn[],
  ): FormControl {
    const control = new FormControl(value, validators);
    control.markAsTouched();
    return control;
  }

  it('stays silent while the control is untouched', () => {
    const control = new FormControl('', Validators.required);

    const state = build(control);

    expect(state.error()).toBeNull();
    expect(state.hasError()).toBe(false);
  });

  it('stays silent for a valid touched control', () => {
    const state = build(touchedInvalid('someone@example.com', Validators.email));

    expect(state.error()).toBeNull();
  });

  it('reports the localized message for a required control', () => {
    const state = build(touchedInvalid('', Validators.required));

    expect(state.error()).toBe('This field is required');
  });

  it('reports the localized message for a malformed email', () => {
    const state = build(touchedInvalid('not-an-email', Validators.email));

    expect(state.error()).toBe('Enter a valid email address');
  });

  it('interpolates the required length into the minlength message', () => {
    const state = build(touchedInvalid('ab', Validators.minLength(5)));

    expect(state.error()).toBe('Must be at least 5 characters');
  });

  it('interpolates the required length into the maxlength message', () => {
    const state = build(touchedInvalid('abcdef', Validators.maxLength(3)));

    expect(state.error()).toBe('Must be at most 3 characters');
  });

  it('interpolates the bound into the min message', () => {
    const state = build(touchedInvalid(2, Validators.min(10)));

    expect(state.error()).toBe('Must be at least 10');
  });

  it('interpolates the bound into the max message', () => {
    const state = build(touchedInvalid(99, Validators.max(10)));

    expect(state.error()).toBe('Must be at most 10');
  });

  it('reports the pattern message for a pattern mismatch', () => {
    const state = build(touchedInvalid('abc', Validators.pattern(/^\d+$/)));

    expect(state.error()).toBe('Invalid format');
  });

  it('falls back to the generic message for a custom validator key', () => {
    const control = new FormControl('x', () => ({ notAColour: true }));
    control.markAsTouched();

    const state = build(control);

    expect(state.error()).toBe('Invalid value');
  });

  // A hand-written validator may emit its key with no params; the message must
  // still render rather than printing "undefined"
  it('substitutes zero when a validator supplies no length param', () => {
    const control = new FormControl('x', () => ({ minlength: {} }));
    control.markAsTouched();

    const state = build(control);

    expect(state.error()).toBe('Must be at least 0 characters');
  });

  it('prefers a per-key override over the built-in message', () => {
    const state = build(touchedInvalid('', Validators.required), {
      errorMessages: { required: 'We need this one' },
    });

    expect(state.error()).toBe('We need this one');
  });

  it('prefers an explicit errorMsg over any derived message', () => {
    const state = build(touchedInvalid('', Validators.required), {
      errorMsg: 'Server rejected this',
      errorMessages: { required: 'We need this one' },
    });

    expect(state.error()).toBe('Server rejected this');
  });

  it('shows an explicit errorMsg even with no bound control', () => {
    const state = build(null, { errorMsg: 'Standalone failure' });

    expect(state.error()).toBe('Standalone failure');
    expect(state.hasError()).toBe(true);
  });
});

describe('injectControlErrorState', () => {
  const noConfig = { errorMsg: signal(undefined), errorMessages: signal(undefined) };

  @Component({ selector: 'ea-test-inner', template: '' })
  class InnerComponent {
    readonly state = injectControlErrorState(noConfig);
  }

  @Component({
    selector: 'ea-test-outer',
    imports: [InnerComponent],
    template: '<ea-test-inner />',
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OuterComponent),
        multi: true,
      },
    ],
  })
  class OuterComponent implements ControlValueAccessor {
    readonly state = injectControlErrorState(noConfig);
    writeValue(): void {}
    registerOnChange(): void {}
    registerOnTouched(): void {}
  }

  @Component({
    imports: [OuterComponent, ReactiveFormsModule],
    template: '<ea-test-outer [formControl]="control" />',
  })
  class HostComponent {
    readonly control = new FormControl('', Validators.required);
  }

  it('keeps a nested field out of the control bound to the field around it', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.control.markAsTouched();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const outer = fixture.debugElement.query(By.directive(OuterComponent))
      .componentInstance as OuterComponent;
    const inner = fixture.debugElement.query(By.directive(InnerComponent))
      .componentInstance as InnerComponent;

    expect(outer.state.error()).toBe('This field is required');
    expect(inner.state.error()).toBeNull();
  });
});

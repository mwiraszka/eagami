import {
  Component,
  ElementRef,
  type Signal,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  type AbstractControl,
  type ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  type ValidatorFn,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { provideEagamiUi } from '../eagami-ui.provider';
import {
  type ControlErrorState,
  type EaErrorMessages,
  controlErrorStateFrom,
  injectControlErrorState,
} from './control-error-state';
import type { EaShowErrorsOn } from './forms-config';

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

  it('hides an error whose key is overridden with null', () => {
    const state = build(touchedInvalid('', Validators.required), {
      errorMessages: { required: null },
    });

    expect(state.error()).toBeNull();
    expect(state.hasError()).toBe(false);
  });

  it('moves on to the next active error when the first is hidden', () => {
    const alwaysFails: ValidatorFn = () => ({ custom: true });

    const state = build(touchedInvalid('', [Validators.required, alwaysFails]), {
      errorMessages: { required: null, custom: 'Something else is wrong' },
    });

    expect(state.error()).toBe('Something else is wrong');
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

  describe('when a pointer press moves focus away', () => {
    it('holds the message back until the press lands its click', () => {
      const control = new FormControl('', Validators.required);
      const state = build(control);
      TestBed.tick();

      document.dispatchEvent(new Event('pointerdown'));
      control.markAsTouched();
      const errorDuringPress = state.error();
      document.dispatchEvent(new Event('click'));

      expect(errorDuringPress).toBeNull();
      expect(state.error()).toBe('This field is required');
    });

    it('shows the message once a cancelled press ends', () => {
      const control = new FormControl('', Validators.required);
      const state = build(control);
      TestBed.tick();

      document.dispatchEvent(new Event('pointerdown'));
      control.markAsTouched();
      document.dispatchEvent(new Event('pointercancel'));

      expect(state.error()).toBe('This field is required');
    });

    it('shows the message straight away when no press is in progress', () => {
      const control = new FormControl('', Validators.required);
      const state = build(control);
      TestBed.tick();

      control.markAsTouched();

      expect(state.error()).toBe('This field is required');
    });
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

describe('error timing while the field has focus', () => {
  const tooShort: ValidatorFn = control =>
    control.value && control.value.length < 3 ? { tooShort: true } : null;

  @Component({
    selector: 'ea-test-field',
    template: '<input />',
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true,
      },
    ],
  })
  class FieldComponent implements ControlValueAccessor {
    readonly state = injectControlErrorState({
      errorMsg: signal(undefined),
      errorMessages: signal({ tooShort: 'Too short' }),
    });
    writeValue(): void {}
    registerOnChange(): void {}
    registerOnTouched(): void {}
  }

  @Component({
    imports: [FieldComponent, ReactiveFormsModule],
    template: `
      <form
        [formGroup]="form"
        (ngSubmit)="(0)">
        <ea-test-field formControlName="code" />
        <button type="submit">Send</button>
      </form>
    `,
  })
  class FormHostComponent {
    readonly form = new FormGroup({ code: new FormControl('', tooShort) });
  }

  async function setup() {
    const fixture = TestBed.createComponent(FormHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const control = fixture.componentInstance.form.controls.code;
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const field = fixture.debugElement.query(By.directive(FieldComponent))
      .componentInstance as FieldComponent;
    control.markAsTouched();
    return { fixture, control, input, state: field.state };
  }

  it('holds a new error back until focus leaves the field', async () => {
    const { control, input, state } = await setup();
    input.focus();

    control.setValue('ab');

    expect(state.error()).toBeNull();

    input.blur();

    expect(state.error()).toBe('Too short');
  });

  it('clears a showing error once fixed, then holds the next one until blur', async () => {
    const { control, input, state } = await setup();
    control.setValue('ab');
    expect(state.error()).toBe('Too short');
    input.focus();

    control.setValue('abcd');

    expect(state.error()).toBeNull();

    control.setValue('ab');

    expect(state.error()).toBeNull();
  });

  it('reveals the error in the focused field when the form is submitted', async () => {
    const { fixture, control, input, state } = await setup();
    input.focus();
    control.setValue('ab');

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    expect(state.error()).toBe('Too short');
  });
});

describe('error timing for a field the user passes through', () => {
  @Component({
    selector: 'ea-test-touch-field',
    template: '<input #box (input)="onChange(box.value)" (blur)="onTouched()" />',
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TouchFieldComponent),
        multi: true,
      },
    ],
  })
  class TouchFieldComponent implements ControlValueAccessor {
    readonly state = injectControlErrorState({
      errorMsg: signal(undefined),
      errorMessages: signal(undefined),
    });
    protected onChange: (value: string) => void = () => {};
    protected onTouched: () => void = () => {};
    writeValue(): void {}
    registerOnChange(fn: (value: string) => void): void {
      this.onChange = fn;
    }
    registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
    }
  }

  @Component({
    imports: [TouchFieldComponent, ReactiveFormsModule],
    template: `
      <form
        [formGroup]="form"
        (ngSubmit)="(0)">
        <ea-test-touch-field formControlName="name" />
        <button type="submit">Send</button>
      </form>
    `,
  })
  class TouchFormHostComponent {
    readonly form = new FormGroup({ name: new FormControl('', Validators.required) });
  }

  async function setup() {
    const fixture = TestBed.createComponent(TouchFormHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const control = fixture.componentInstance.form.controls.name;
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const field = fixture.debugElement.query(By.directive(TouchFieldComponent))
      .componentInstance as TouchFieldComponent;
    return { fixture, control, input, state: field.state };
  }

  function type(input: HTMLInputElement, value: string): void {
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  it('stays quiet after the user tabs past an empty required field', async () => {
    const { control, input, state } = await setup();
    input.focus();

    input.blur();

    expect(control.touched).toBe(true);
    expect(state.error()).toBeNull();
  });

  it('flags a required field the user types in and empties again', async () => {
    const { input, state } = await setup();
    input.focus();
    type(input, 'Ola');
    type(input, '');

    input.blur();

    expect(state.error()).toBe('This field is required');
  });

  it('flags a field the user passed through once the form is submitted', async () => {
    const { fixture, input, state } = await setup();
    input.focus();
    input.blur();

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    expect(state.error()).toBe('This field is required');
  });

  it('flags a field straight away when the app marks it touched', async () => {
    const { control, state } = await setup();

    control.markAsTouched();

    expect(state.error()).toBe('This field is required');
  });
});

describe('a focus change during a render', () => {
  // Disabling the focused element in a template makes the browser blur it while that
  // template is still rendering, so the field hears its focusout mid-render
  @Component({
    selector: 'ea-test-blurred-field',
    template: '<input />{{ blurWhileRendering() }}',
  })
  class BlurredFieldComponent {
    readonly blur = input(false);
    readonly state = injectControlErrorState({
      errorMsg: signal(undefined),
      errorMessages: signal(undefined),
    });
    private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

    protected blurWhileRendering(): string {
      if (this.blur()) {
        this.host.nativeElement
          .querySelector('input')
          ?.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
      }
      return '';
    }
  }

  @Component({
    imports: [BlurredFieldComponent],
    template: '<ea-test-blurred-field [blur]="blur()" />',
  })
  class BlurredHostComponent {
    readonly blur = signal(false);
  }

  it('takes the focus change without writing to signals mid-render', async () => {
    const fixture = TestBed.createComponent(BlurredHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.componentInstance.blur.set(true);

    const render = (): void => fixture.detectChanges();

    expect(render).not.toThrow();
  });
});

describe('showErrorsOn', () => {
  const tooShort: ValidatorFn = control =>
    control.value && control.value.length < 3 ? { tooShort: true } : null;

  @Component({
    selector: 'ea-test-timed-field',
    template: '<input #box (input)="onChange(box.value)" (blur)="onTouched()" />',
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TimedFieldComponent),
        multi: true,
      },
    ],
  })
  class TimedFieldComponent implements ControlValueAccessor {
    readonly showErrorsOn = input<EaShowErrorsOn | undefined>(undefined);
    readonly state = injectControlErrorState({
      errorMsg: signal(undefined),
      errorMessages: signal({ tooShort: 'Too short' }),
      showErrorsOn: this.showErrorsOn,
    });
    protected onChange: (value: string) => void = () => {};
    protected onTouched: () => void = () => {};
    writeValue(): void {}
    registerOnChange(fn: (value: string) => void): void {
      this.onChange = fn;
    }
    registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
    }
  }

  @Component({
    imports: [TimedFieldComponent, ReactiveFormsModule],
    template: `
      <form [formGroup]="form">
        <ea-test-timed-field
          formControlName="code"
          [showErrorsOn]="showErrorsOn()" />
      </form>
    `,
  })
  class TimedHostComponent {
    readonly showErrorsOn = signal<EaShowErrorsOn | undefined>(undefined);
    readonly form = new FormGroup({
      code: new FormControl('', [Validators.required, tooShort]),
    });
  }

  async function setup(
    options: { appWide?: EaShowErrorsOn; field?: EaShowErrorsOn } = {},
  ) {
    TestBed.configureTestingModule({
      providers: [provideEagamiUi({ forms: { showErrorsOn: options.appWide } })],
    });
    const fixture = TestBed.createComponent(TimedHostComponent);
    fixture.componentInstance.showErrorsOn.set(options.field);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const control = fixture.componentInstance.form.controls.code;
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const field = fixture.debugElement.query(By.directive(TimedFieldComponent))
      .componentInstance as TimedFieldComponent;
    return { control, input, state: field.state };
  }

  it("flags a skipped field when the app shows errors on 'touch'", async () => {
    const { input, state } = await setup({ appWide: 'touch' });
    input.focus();

    input.blur();

    expect(state.error()).toBe('This field is required');
  });

  it("flags a skipped field set to show errors on 'touch'", async () => {
    const { input, state } = await setup({ field: 'touch' });
    input.focus();

    input.blur();

    expect(state.error()).toBe('This field is required');
  });

  it("keeps a skipped field quiet when it sets 'change' over an app-wide 'touch'", async () => {
    const { input, state } = await setup({ appWide: 'touch', field: 'change' });
    input.focus();

    input.blur();

    expect(state.error()).toBeNull();
  });

  it("shows a new error mid-edit when the app shows errors on 'touch'", async () => {
    const { control, input, state } = await setup({ appWide: 'touch' });
    control.markAsTouched();
    input.focus();

    control.setValue('ab');

    expect(state.error()).toBe('Too short');
  });

  it("holds a new error back mid-edit in a field set to 'change'", async () => {
    const { control, input, state } = await setup({ appWide: 'touch', field: 'change' });
    control.markAsTouched();
    input.focus();

    control.setValue('ab');

    expect(state.error()).toBeNull();
  });

  it("flags a skipped field when the app shows errors on 'blur'", async () => {
    const { input, state } = await setup({ appWide: 'blur' });
    input.focus();

    input.blur();

    expect(state.error()).toBe('This field is required');
  });

  it("holds a new error back mid-edit until the field is left on 'blur'", async () => {
    const { control, input, state } = await setup({ field: 'blur' });
    control.markAsTouched();
    input.focus();
    control.setValue('ab');
    const errorWhileEditing = state.error();

    input.blur();

    expect(errorWhileEditing).toBeNull();
    expect(state.error()).toBe('Too short');
  });
});

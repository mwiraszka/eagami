import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { type EaErrorMessages } from '../forms/control-error-state';
import { FormFieldComponent } from './form-field.component';

@Component({
  template: `<ea-form-field
    [label]="label()"
    [hint]="hint()"
    [errorMsg]="errorMsg()"
    [errorMessages]="errorMessages()"
    [required]="required()"
    id="field-1">
    <input
      [formControl]="ctrl"
      type="email" />
  </ea-form-field>`,
  imports: [FormFieldComponent, ReactiveFormsModule],
})
class HostComponent {
  readonly ctrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  readonly label = signal<string | undefined>('Email');
  readonly hint = signal<string | undefined>(undefined);
  readonly errorMsg = signal<string | undefined>(undefined);
  readonly errorMessages = signal<EaErrorMessages | undefined>(undefined);
  readonly required = signal(false);
}

@Component({
  template: `<ea-form-field
    hint="Helpful text"
    id="field-2">
    <input aria-describedby="external-note" />
  </ea-form-field>`,
  imports: [FormFieldComponent],
})
class DescribedByHostComponent {}

describe('FormFieldComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let el: HTMLElement;

  function getInput(): HTMLInputElement {
    const input = el.querySelector('input');
    if (!input) {
      throw new Error('projected input not found');
    }
    return input;
  }

  function errorText(): string | null {
    const alert: HTMLElement | null = el.querySelector('[role="alert"]');
    return alert ? (alert.textContent?.trim() ?? '') : null;
  }

  async function settle(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    el = fixture.nativeElement as HTMLElement;

    await settle();
  });

  it('renders the label wired to the projected control via for/id', () => {
    const label: HTMLLabelElement | null = el.querySelector('label.ea-field-label');

    expect(label?.textContent).toContain('Email');
    expect(label?.htmlFor).toBe('field-1-control');
    expect(getInput().id).toBe('field-1-control');
  });

  it('adds the required modifier class to the label', async () => {
    host.required.set(true);

    await settle();

    expect(el.querySelector('.ea-field-label--required')).toBeTruthy();
  });

  it('conveys required to the projected control via aria-required', async () => {
    expect(getInput().getAttribute('aria-required')).toBeNull();

    host.required.set(true);
    await settle();

    expect(getInput().getAttribute('aria-required')).toBe('true');

    host.required.set(false);
    await settle();

    expect(getInput().getAttribute('aria-required')).toBeNull();
  });

  it('shows the hint and points aria-describedby at it', async () => {
    host.hint.set('Helpful text');

    await settle();

    const hint = el.querySelector('.ea-field-messages__message--hint');
    expect(hint?.textContent).toContain('Helpful text');
    expect(getInput().getAttribute('aria-describedby')).toBe('field-1-hint');
  });

  it('shows an explicit errorMsg over the hint and flags the control invalid', async () => {
    host.hint.set('Helpful text');
    host.errorMsg.set('Server rejected this');

    await settle();

    expect(errorText()).toBe('Server rejected this');
    expect(el.querySelector('.ea-field-messages__message--hint')).toBeNull();
    expect(getInput().getAttribute('aria-describedby')).toBe('field-1-error');
    expect(getInput().getAttribute('aria-invalid')).toBe('true');
  });

  it('shows no error while the projected control is untouched, even when invalid', () => {
    expect(host.ctrl.invalid).toBe(true);
    expect(errorText()).toBeNull();
  });

  it('derives the localized default once the projected control is touched', async () => {
    host.ctrl.markAsTouched();

    await settle();

    expect(errorText()).toBe('This field is required');
  });

  it('reflects the active validator as the value changes', async () => {
    host.ctrl.setValue('not-an-email');
    host.ctrl.markAsTouched();

    await settle();

    expect(errorText()).toBe('Enter a valid email address');
  });

  it('prefers a per-key override over the built-in default', async () => {
    host.errorMessages.set({ required: 'We need this' });
    host.ctrl.markAsTouched();

    await settle();

    expect(errorText()).toBe('We need this');
  });

  it('clears the error and aria attributes once the control becomes valid', async () => {
    host.ctrl.markAsTouched();
    await settle();
    expect(errorText()).not.toBeNull();

    host.ctrl.setValue('user@example.com');
    await settle();

    expect(errorText()).toBeNull();
    expect(getInput().getAttribute('aria-invalid')).toBeNull();
    expect(getInput().getAttribute('aria-describedby')).toBeNull();
  });

  it('preserves a consumer-set aria-describedby alongside its own', async () => {
    const describedByFixture = TestBed.createComponent(DescribedByHostComponent);
    describedByFixture.detectChanges();
    await describedByFixture.whenStable();
    describedByFixture.detectChanges();

    const input: HTMLInputElement | null =
      describedByFixture.nativeElement.querySelector('input');

    expect(input?.getAttribute('aria-describedby')).toBe('external-note field-2-hint');
  });
});

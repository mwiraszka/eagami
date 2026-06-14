import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { type EaErrorMessages } from '../forms/control-error-state';
import { InputComponent } from './input.component';

@Component({
  template: `<ea-input
    [formControl]="ctrl"
    [errorMsg]="explicit()"
    [errorMessages]="overrides()" />`,
  imports: [InputComponent, ReactiveFormsModule],
})
class HostComponent {
  readonly ctrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  readonly explicit = signal<string | undefined>(undefined);
  readonly overrides = signal<EaErrorMessages | undefined>(undefined);
}

describe('InputComponent reactive-forms validation', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  function errorText(): string | null {
    const el: HTMLElement | null = fixture.nativeElement.querySelector('[role="alert"]');
    return el ? (el.textContent?.trim() ?? '') : null;
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

    await settle();
  });

  it('shows no error while the control is untouched, even when invalid', () => {
    expect(host.ctrl.invalid).toBe(true);
    expect(errorText()).toBeNull();
  });

  it('shows the localized default once the control is touched', async () => {
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
    host.overrides.set({ required: 'We need this' });
    host.ctrl.markAsTouched();

    await settle();

    expect(errorText()).toBe('We need this');
  });

  it('lets an explicit errorMsg win over the auto-derived message', async () => {
    host.explicit.set('Server rejected this');
    host.ctrl.markAsTouched();

    await settle();

    expect(errorText()).toBe('Server rejected this');
  });

  it('clears the error once the control becomes valid', async () => {
    host.ctrl.markAsTouched();
    await settle();
    expect(errorText()).not.toBeNull();

    host.ctrl.setValue('user@example.com');
    await settle();

    expect(errorText()).toBeNull();
  });
});

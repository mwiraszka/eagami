import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { SliderComponent } from './slider.component';

@Component({
  template: `<ea-slider [formControl]="ctrl" />`,
  imports: [SliderComponent, ReactiveFormsModule],
})
class FormHostComponent {
  readonly ctrl = new FormControl(0, {
    nonNullable: true,
    validators: [Validators.min(50)],
  });
}

@Component({
  template: `<ea-slider [hasError]="flag()" />`,
  imports: [SliderComponent],
})
class FlagHostComponent {
  readonly flag = signal(true);
}

describe('SliderComponent reactive-forms validation', () => {
  function alertText(fixture: ComponentFixture<unknown>): string | null {
    const el: HTMLElement | null = fixture.nativeElement.querySelector('[role="alert"]');
    return el ? (el.textContent?.trim() ?? '') : null;
  }

  async function settle(fixture: ComponentFixture<unknown>): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('shows no message while untouched, then the localized default once touched', async () => {
    await TestBed.configureTestingModule({
      imports: [FormHostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(FormHostComponent);
    await settle(fixture);

    expect(alertText(fixture)).toBeNull();

    fixture.componentInstance.ctrl.markAsTouched();
    await settle(fixture);

    expect(alertText(fixture)).toBe('Must be at least 50');
  });

  it('keeps the manual hasError input as a style-only flag (no message)', async () => {
    await TestBed.configureTestingModule({
      imports: [FlagHostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(FlagHostComponent);
    await settle(fixture);

    expect(fixture.nativeElement.querySelector('.ea-slider--error')).toBeTruthy();
    expect(alertText(fixture)).toBeNull();
  });
});

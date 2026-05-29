import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldMessagesComponent } from './field-messages.component';

describe('FieldMessagesComponent', () => {
  let fixture: ComponentFixture<FieldMessagesComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldMessagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldMessagesComponent);
    fixture.componentRef.setInput('id', 'field-1');
    el = fixture.nativeElement as HTMLElement;
  });

  it('renders nothing when neither error nor hint is set', () => {
    fixture.detectChanges();

    expect(el.querySelector('p')).toBeNull();
  });

  it('renders the hint with the hint id when only a hint is set', () => {
    fixture.componentRef.setInput('hint', 'Helpful text');
    fixture.detectChanges();

    const hint = el.querySelector('.ea-field-messages__message--hint');

    expect(hint?.id).toBe('field-1-hint');
    expect(hint?.textContent).toContain('Helpful text');
  });

  it('renders the error with role=alert, the error id, and the alert icon', () => {
    fixture.componentRef.setInput('error', 'Required');
    fixture.detectChanges();

    const error = el.querySelector('.ea-field-messages__message--error');

    expect(error?.getAttribute('role')).toBe('alert');
    expect(error?.id).toBe('field-1-error');
    expect(error?.querySelector('.ea-field-messages__icon')).toBeTruthy();
    expect(error?.textContent).toContain('Required');
  });

  it('shows the error and hides the hint when both are set', () => {
    fixture.componentRef.setInput('error', 'Required');
    fixture.componentRef.setInput('hint', 'Helpful text');
    fixture.detectChanges();

    expect(el.querySelector('.ea-field-messages__message--error')).toBeTruthy();
    expect(el.querySelector('.ea-field-messages__message--hint')).toBeNull();
  });
});

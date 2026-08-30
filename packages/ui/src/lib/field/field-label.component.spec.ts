import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SunIconComponent } from '../icons/sun.component';
import { FieldLabelComponent } from './field-label.component';

describe('FieldLabelComponent', () => {
  let fixture: ComponentFixture<FieldLabelComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldLabelComponent);
    fixture.componentRef.setInput('text', 'Email');
    el = fixture.nativeElement as HTMLElement;
  });

  it('renders a <label for> when forId is set', () => {
    fixture.componentRef.setInput('forId', 'email-input');
    fixture.detectChanges();

    const label = el.querySelector('label');

    expect(label?.getAttribute('for')).toBe('email-input');
    expect(el.querySelector('span')).toBeNull();
    expect(label?.textContent).toContain('Email');
  });

  it('renders a <span> when forId is absent', () => {
    fixture.detectChanges();

    expect(el.querySelector('label')).toBeNull();
    expect(el.querySelector('span')?.textContent).toContain('Email');
  });

  it('applies the required modifier when required', () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    expect(el.querySelector('.ea-field-label--required')).toBeTruthy();
  });

  it('applies labelId as the element id', () => {
    fixture.componentRef.setInput('labelId', 'email-label');
    fixture.detectChanges();

    expect(el.querySelector('.ea-field-label')?.id).toBe('email-label');
  });

  it('renders the icon before the label text, hidden from assistive tech', () => {
    fixture.componentRef.setInput('icon', SunIconComponent);
    fixture.detectChanges();

    const label = el.querySelector('.ea-field-label')!;
    const icon = label.querySelector('.ea-field-label__icon');

    expect(icon?.querySelector('svg')).toBeTruthy();
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
    expect(label.textContent).toContain('Email');
  });
});

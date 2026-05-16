import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let fixture: ComponentFixture<SpinnerComponent>;

  function getHost(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-spinner');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    fixture.detectChanges();
  });

  it('renders with role=status for screen readers', () => {
    expect(getHost().getAttribute('role')).toBe('status');
  });

  it('applies the default md size class', () => {
    expect(getHost().classList).toContain('ea-spinner--md');
  });

  it('applies the size class when set', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    expect(getHost().classList).toContain('ea-spinner--lg');
  });

  it('renders the default loading label', () => {
    const label = fixture.nativeElement.querySelector('.ea-spinner__label');

    expect(label.textContent.trim()).toBe('Loading');
  });

  it('renders the custom label when provided', () => {
    fixture.componentRef.setInput('label', 'Saving…');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.ea-spinner__label');

    expect(label.textContent.trim()).toBe('Saving…');
  });

  it('hides the SVG from assistive tech', () => {
    const svg = fixture.nativeElement.querySelector('svg');

    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });
});

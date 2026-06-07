import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerComponent } from './divider.component';

describe('DividerComponent', () => {
  let fixture: ComponentFixture<DividerComponent>;

  function getDivider(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-divider');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DividerComponent);
    fixture.detectChanges();
  });

  it('renders with role=separator', () => {
    expect(getDivider().getAttribute('role')).toBe('separator');
  });

  it('defaults to horizontal orientation', () => {
    const el = getDivider();

    expect(el.classList).toContain('ea-divider--horizontal');
    expect(el.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('applies vertical orientation', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    const el = getDivider();

    expect(el.classList).toContain('ea-divider--vertical');
    expect(el.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('renders no label by default', () => {
    expect(fixture.nativeElement.querySelector('.ea-divider__label')).toBeNull();
    expect(getDivider().classList).not.toContain('ea-divider--with-label');
  });

  it('renders the label when provided', () => {
    fixture.componentRef.setInput('label', 'or');
    fixture.detectChanges();

    const labelEl = fixture.nativeElement.querySelector('.ea-divider__label');

    expect(labelEl.textContent.trim()).toBe('or');
    expect(getDivider().classList).toContain('ea-divider--with-label');
  });

  it('is not thick by default', () => {
    expect(getDivider().classList).not.toContain('ea-divider--thick');
  });

  it('applies the thick modifier when set', () => {
    fixture.componentRef.setInput('thick', true);
    fixture.detectChanges();

    expect(getDivider().classList).toContain('ea-divider--thick');
  });
});

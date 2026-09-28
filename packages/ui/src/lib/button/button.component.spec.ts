import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CheckIconComponent } from '../icons/check.component';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  function getButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders a <button> element', () => {
      expect(getButton()).toBeTruthy();
    });

    it('applies the default variant class', () => {
      expect(getButton().classList).toContain('ea-button--primary');
    });

    it('applies the default size class', () => {
      expect(getButton().classList).toContain('ea-button--md');
    });

    it('applies the correct variant class when set', () => {
      fixture.componentRef.setInput('variant', 'danger');
      fixture.detectChanges();
      expect(getButton().classList).toContain('ea-button--danger');
    });

    it('applies the correct size class when set', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      expect(getButton().classList).toContain('ea-button--lg');
    });

    it('applies the link variant class when set', () => {
      fixture.componentRef.setInput('variant', 'link');

      fixture.detectChanges();

      expect(getButton().classList).toContain('ea-button--link');
    });

    it('adds no alignment class while the content is centred', () => {
      const alignmentClasses = Array.from(getButton().classList).filter(name =>
        name.startsWith('ea-button--align-'),
      );

      expect(alignmentClasses).toEqual([]);
    });

    it.each(['start', 'end'] as const)('applies the %s alignment class', align => {
      fixture.componentRef.setInput('align', align);

      fixture.detectChanges();

      expect(getButton().classList).toContain(`ea-button--align-${align}`);
    });

    it('sets the native button type attribute', () => {
      fixture.componentRef.setInput('type', 'submit');
      fixture.detectChanges();
      expect(getButton().type).toBe('submit');
    });

    it('sets aria-label when provided', () => {
      fixture.componentRef.setInput('aria-label', 'Close dialog');
      fixture.detectChanges();
      expect(getButton().getAttribute('aria-label')).toBe('Close dialog');
    });

    it('sets no aria-labelledby or aria-describedby by default', () => {
      expect(getButton().hasAttribute('aria-labelledby')).toBe(false);
      expect(getButton().hasAttribute('aria-describedby')).toBe(false);
    });

    it('forwards aria-labelledby and aria-describedby to the native button', () => {
      fixture.componentRef.setInput('aria-labelledby', 'field-label button-text');
      fixture.componentRef.setInput('aria-describedby', 'field-hint');
      fixture.detectChanges();

      expect(getButton().getAttribute('aria-labelledby')).toBe('field-label button-text');
      expect(getButton().getAttribute('aria-describedby')).toBe('field-hint');
    });

    it('focus() moves focus to the native button', () => {
      component.focus();

      expect(document.activeElement).toBe(getButton());
    });

    it('does not render a leading icon by default', () => {
      expect(fixture.nativeElement.querySelector('.ea-button__icon')).toBeNull();
    });

    it('renders the leading icon when an icon component is provided', () => {
      fixture.componentRef.setInput('icon', CheckIconComponent);
      fixture.detectChanges();
      const icon = fixture.nativeElement.querySelector('.ea-button__icon');
      expect(icon).toBeTruthy();
      expect(icon.querySelector('ea-icon-check')).toBeTruthy();
    });

    // The square icon-only padding and the hidden label both key off this
    // selector, so the label must genuinely match `:empty` with nothing
    // projected into it
    it('matches the icon-only selector when no label content is projected', () => {
      fixture.componentRef.setInput('icon', CheckIconComponent);
      fixture.detectChanges();

      expect(
        getButton().matches(
          '.ea-button:has(.ea-button__icon):has(.ea-button__label:empty)',
        ),
      ).toBe(true);
    });
  });

  describe('Disabled state', () => {
    it('is not disabled by default', () => {
      expect(getButton().disabled).toBe(false);
    });

    it('disables the button when disabled input is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(getButton().disabled).toBe(true);
      expect(getButton().classList).toContain('ea-button--disabled');
    });

    it('disables the button when loading is true', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      expect(getButton().disabled).toBe(true);
      expect(getButton().classList).toContain('ea-button--disabled');
    });

    it('sets aria-busy when loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      expect(getButton().getAttribute('aria-busy')).toBe('true');
    });

    it('does not set aria-busy when not loading', () => {
      expect(getButton().getAttribute('aria-busy')).toBeNull();
    });

    it('shows the spinner when loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.ea-button__spinner'))).toBeTruthy();
    });

    it('hides the spinner when not loading', () => {
      expect(fixture.debugElement.query(By.css('.ea-button__spinner'))).toBeNull();
    });

    it('applies full-width class when fullWidth is true', () => {
      fixture.componentRef.setInput('fullWidth', true);
      fixture.detectChanges();
      expect(getButton().classList).toContain('ea-button--full-width');
    });
  });

  describe('Click handling', () => {
    it('emits clicked on click', () => {
      const spy = vi.fn();
      component.clicked.subscribe(spy);
      getButton().click();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('does not emit clicked when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const spy = vi.fn();
      component.clicked.subscribe(spy);
      getButton().click();
      expect(spy).not.toHaveBeenCalled();
    });

    it('does not emit clicked when loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      const spy = vi.fn();
      component.clicked.subscribe(spy);
      getButton().click();
      expect(spy).not.toHaveBeenCalled();
    });

    it('calls preventDefault when clicked while disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const event = new MouseEvent('click');
      const preventSpy = vi.spyOn(event, 'preventDefault');
      component.handleClick(event);
      expect(preventSpy).toHaveBeenCalled();
    });
  });
});

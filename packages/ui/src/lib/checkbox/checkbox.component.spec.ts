import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TooltipDirective } from '../tooltip/tooltip.directive';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<CheckboxComponent>;
  let component: CheckboxComponent;

  function getNativeInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input[type="checkbox"]');
  }

  function getLabel(): HTMLLabelElement {
    return fixture.nativeElement.querySelector('label');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders a checkbox input', () => {
      expect(getNativeInput()).toBeTruthy();
    });

    it('applies the default size class', () => {
      expect(getLabel().classList).toContain('ea-checkbox--md');
    });

    it('applies the correct size class when set', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      expect(getLabel().classList).toContain('ea-checkbox--lg');
    });

    it('renders no label text by default', () => {
      expect(fixture.nativeElement.querySelector('.ea-checkbox__label')).toBeNull();
    });

    it('renders label text when provided', () => {
      fixture.componentRef.setInput('label', 'Accept terms');
      fixture.detectChanges();
      const labelSpan = fixture.nativeElement.querySelector('.ea-checkbox__label');
      expect(labelSpan.textContent.trim()).toBe('Accept terms');
    });

    it('renders no count by default', () => {
      fixture.componentRef.setInput('label', 'Inbox');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.ea-checkbox__count')).toBeNull();
    });

    it('renders the count inside the label span when provided', () => {
      fixture.componentRef.setInput('label', 'Inbox');
      fixture.componentRef.setInput('count', '(42)');
      fixture.detectChanges();
      const labelSpan = fixture.nativeElement.querySelector('.ea-checkbox__label');
      const countSpan = labelSpan.querySelector('.ea-checkbox__count');

      expect(countSpan).not.toBeNull();
      expect(countSpan.textContent.trim()).toBe('(42)');
    });

    it('renders a numeric count', () => {
      fixture.componentRef.setInput('label', 'Inbox');
      fixture.componentRef.setInput('count', 0);
      fixture.detectChanges();
      const countSpan = fixture.nativeElement.querySelector('.ea-checkbox__count');

      expect(countSpan.textContent.trim()).toBe('0');
    });
  });

  describe('Checked state', () => {
    it('is unchecked by default', () => {
      expect(getNativeInput().checked).toBe(false);
    });

    it('reflects the checked model', () => {
      component.checked.set(true);
      fixture.detectChanges();
      expect(getNativeInput().checked).toBe(true);
      expect(getLabel().classList).toContain('ea-checkbox--checked');
    });

    it('toggles checked on change', () => {
      getNativeInput().click();
      fixture.detectChanges();
      expect(component.checked()).toBe(true);
    });

    it('emits changed event', () => {
      const spy = vi.fn();
      component.changed.subscribe(spy);
      getNativeInput().click();
      expect(spy).toHaveBeenCalledWith(true);
    });

    it('toggles on Enter, which a native checkbox ignores', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });

      getNativeInput().dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
      expect(event.defaultPrevented).toBe(true);
    });

    it('leaves other keys to the browser', () => {
      getNativeInput().dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

      expect(component.checked()).toBe(false);
    });

    it('does not toggle on Enter while disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      getNativeInput().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(component.checked()).toBe(false);
    });
  });

  describe('Truncated label', () => {
    it('clamps the label and offers the full text in a tooltip when asked', () => {
      fixture.componentRef.setInput('label', 'A filter name too long for its column');
      fixture.componentRef.setInput('truncate', true);
      fixture.detectChanges();

      const tooltip = fixture.debugElement.query(By.directive(TooltipDirective));

      expect(getLabel().classList).toContain('ea-checkbox--truncate');
      expect(tooltip.injector.get(TooltipDirective).eaTooltip()).toBe(
        'A filter name too long for its column',
      );
      expect(tooltip.injector.get(TooltipDirective).whenClipped()).toBe(true);
    });

    it('leaves the label alone by default', () => {
      fixture.componentRef.setInput('label', 'Inbox');
      fixture.detectChanges();

      const tooltip = fixture.debugElement.query(By.directive(TooltipDirective));

      expect(getLabel().classList).not.toContain('ea-checkbox--truncate');
      expect(tooltip.injector.get(TooltipDirective).eaTooltip()).toBe('');
    });
  });

  describe('Disabled state', () => {
    it('is not disabled by default', () => {
      expect(getNativeInput().disabled).toBe(false);
    });

    it('disables the input when disabled is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(getNativeInput().disabled).toBe(true);
      expect(getLabel().classList).toContain('ea-checkbox--disabled');
    });
  });

  describe('Indeterminate state', () => {
    it('sets indeterminate on native input', () => {
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();
      expect(getNativeInput().indeterminate).toBe(true);
    });

    it('sets aria-checked to mixed when indeterminate', () => {
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();
      expect(getNativeInput().getAttribute('aria-checked')).toBe('mixed');
    });
  });

  describe('CVA', () => {
    it('writes value via writeValue', () => {
      component.writeValue(true);
      expect(component.checked()).toBe(true);
    });

    it('calls onChange when toggled', () => {
      const onChange = vi.fn();
      component.registerOnChange(onChange);
      getNativeInput().click();
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('calls onTouched when toggled', () => {
      const onTouched = vi.fn();
      component.registerOnTouched(onTouched);
      getNativeInput().click();
      expect(onTouched).toHaveBeenCalled();
    });

    it('disables via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      expect(getNativeInput().disabled).toBe(true);
    });
  });

  describe('Required', () => {
    it('sets required on the native input', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      expect(getNativeInput().required).toBe(true);
    });

    it('sets aria-required on the native input', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      expect(getNativeInput().getAttribute('aria-required')).toBe('true');
    });
  });

  describe('Hint and error messages', () => {
    it('renders nothing by default', () => {
      expect(
        fixture.nativeElement.querySelector('.ea-field-messages__message'),
      ).toBeNull();
    });

    it('renders the hint when provided', () => {
      fixture.componentRef.setInput('hint', 'Optional input');
      fixture.detectChanges();
      const hint = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--hint',
      );
      expect(hint.textContent.trim()).toBe('Optional input');
    });

    it('renders the error and hides the hint when both are set', () => {
      fixture.componentRef.setInput('hint', 'Hint text');
      fixture.componentRef.setInput('errorMsg', 'Required field');
      fixture.detectChanges();
      const error = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--error',
      );
      const hint = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--hint',
      );
      expect(error.textContent.trim()).toBe('Required field');
      expect(hint).toBeNull();
    });

    it('marks the input aria-invalid when errorMsg is set', () => {
      fixture.componentRef.setInput('errorMsg', 'Bad');
      fixture.detectChanges();
      expect(getNativeInput().getAttribute('aria-invalid')).toBe('true');
    });

    it('wires aria-describedby to the error id', () => {
      fixture.componentRef.setInput('errorMsg', 'Bad');
      fixture.detectChanges();
      const errorEl = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--error',
      );
      expect(getNativeInput().getAttribute('aria-describedby')).toBe(errorEl.id);
    });

    it('wires aria-describedby to the hint id when no error', () => {
      fixture.componentRef.setInput('hint', 'Hint text');
      fixture.detectChanges();
      const hintEl = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--hint',
      );
      expect(getNativeInput().getAttribute('aria-describedby')).toBe(hintEl.id);
    });
  });

  describe('Aria label fallback', () => {
    it('forwards ariaLabel to the input when no visible label', () => {
      fixture.componentRef.setInput('aria-label', 'Toggle option');
      fixture.detectChanges();
      expect(getNativeInput().getAttribute('aria-label')).toBe('Toggle option');
    });

    it('does not set aria-label when visible label is present', () => {
      fixture.componentRef.setInput('label', 'Visible');
      fixture.componentRef.setInput('aria-label', 'Should not be used');
      fixture.detectChanges();
      expect(getNativeInput().getAttribute('aria-label')).toBeNull();
    });
  });
});

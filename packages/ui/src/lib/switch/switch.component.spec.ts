import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchComponent } from './switch.component';

describe('SwitchComponent', () => {
  let fixture: ComponentFixture<SwitchComponent>;
  let component: SwitchComponent;

  function getInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input[type="checkbox"]');
  }

  function getSwitchLabel(): HTMLLabelElement {
    return fixture.nativeElement.querySelector('label.ea-switch');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders a checkbox input with role=switch', () => {
      const input = getInput();

      expect(input).toBeTruthy();
      expect(input.getAttribute('role')).toBe('switch');
    });

    it('applies the default size class', () => {
      expect(getSwitchLabel().classList).toContain('ea-switch--md');
    });

    it('applies the size class when set', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(getSwitchLabel().classList).toContain('ea-switch--lg');
    });

    it('renders no label text by default', () => {
      expect(fixture.nativeElement.querySelector('.ea-switch__label')).toBeNull();
    });

    it('renders the label when provided', () => {
      fixture.componentRef.setInput('label', 'Notifications');
      fixture.detectChanges();

      const labelSpan = fixture.nativeElement.querySelector('.ea-switch__label');

      expect(labelSpan.textContent.trim()).toBe('Notifications');
    });
  });

  describe('Checked state', () => {
    it('is unchecked by default', () => {
      expect(getInput().checked).toBe(false);
      expect(getInput().getAttribute('aria-checked')).toBe('false');
    });

    it('reflects the checked model', () => {
      component.checked.set(true);
      fixture.detectChanges();

      expect(getInput().checked).toBe(true);
      expect(getInput().getAttribute('aria-checked')).toBe('true');
      expect(getSwitchLabel().classList).toContain('ea-switch--checked');
    });

    it('toggles checked on change', () => {
      getInput().click();
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('emits changed event with the new value', () => {
      const spy = jest.fn();
      component.changed.subscribe(spy);

      getInput().click();

      expect(spy).toHaveBeenCalledWith(true);
    });
  });

  describe('Disabled state', () => {
    it('is not disabled by default', () => {
      expect(getInput().disabled).toBe(false);
    });

    it('disables the input when disabled is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(getInput().disabled).toBe(true);
      expect(getSwitchLabel().classList).toContain('ea-switch--disabled');
    });

    it('does not toggle when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      component.handleChange();

      expect(component.checked()).toBe(false);
    });
  });

  describe('Required', () => {
    it('forwards required to the native input', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      expect(getInput().required).toBe(true);
    });

    it('sets aria-required when required is true', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      expect(getInput().getAttribute('aria-required')).toBe('true');
    });

    it('marks the visible label as required', () => {
      fixture.componentRef.setInput('label', 'Confirm');
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      const labelSpan = fixture.nativeElement.querySelector('.ea-switch__label');

      expect(labelSpan.classList).toContain('ea-switch__label--required');
    });
  });

  describe('Hint and error messages', () => {
    it('renders no field message by default', () => {
      expect(
        fixture.nativeElement.querySelector('.ea-field-messages__message'),
      ).toBeNull();
    });

    it('renders the hint when provided', () => {
      fixture.componentRef.setInput('hint', 'You can unsubscribe later');
      fixture.detectChanges();

      const hint = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--hint',
      );

      expect(hint.textContent.trim()).toBe('You can unsubscribe later');
      expect(getInput().getAttribute('aria-describedby')).toBe(hint.id);
    });

    it('renders the error and hides the hint when both are set', () => {
      fixture.componentRef.setInput('hint', 'Hint text');
      fixture.componentRef.setInput('errorMsg', 'Required');
      fixture.detectChanges();

      const error = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--error',
      );
      const hint = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--hint',
      );

      expect(error.textContent.trim()).toBe('Required');
      expect(hint).toBeNull();
      expect(getInput().getAttribute('aria-describedby')).toBe(error.id);
      expect(getInput().getAttribute('aria-invalid')).toBe('true');
    });

    it('applies the error class to the host', () => {
      fixture.componentRef.setInput('errorMsg', 'Bad');
      fixture.detectChanges();

      expect(getSwitchLabel().classList).toContain('ea-switch--error');
    });
  });

  describe('Aria label fallback', () => {
    it('forwards ariaLabel to the input when no visible label', () => {
      fixture.componentRef.setInput('aria-label', 'Toggle option');
      fixture.detectChanges();

      expect(getInput().getAttribute('aria-label')).toBe('Toggle option');
    });

    it('does not set aria-label when a visible label is present', () => {
      fixture.componentRef.setInput('label', 'Visible');
      fixture.componentRef.setInput('aria-label', 'Should not be used');
      fixture.detectChanges();

      expect(getInput().getAttribute('aria-label')).toBeNull();
    });
  });

  describe('ControlValueAccessor', () => {
    it('writes value via writeValue', () => {
      component.writeValue(true);

      expect(component.checked()).toBe(true);
    });

    it('coerces non-boolean values to boolean', () => {
      component.writeValue(null as unknown as boolean);

      expect(component.checked()).toBe(false);
    });

    it('calls onChange when toggled', () => {
      const onChange = jest.fn();
      component.registerOnChange(onChange);

      getInput().click();

      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('calls onTouched when toggled', () => {
      const onTouched = jest.fn();
      component.registerOnTouched(onTouched);

      getInput().click();

      expect(onTouched).toHaveBeenCalled();
    });

    it('disables via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      expect(getInput().disabled).toBe(true);
    });
  });
});

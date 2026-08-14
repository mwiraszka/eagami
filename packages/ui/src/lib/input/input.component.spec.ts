import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { SearchIconComponent } from '../icons/search.component';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let fixture: ComponentFixture<InputComponent>;
  let component: InputComponent;

  function getNativeInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input');
  }

  function getWrapper(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-input-wrapper');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders an <input> element', () => {
      expect(getNativeInput()).toBeTruthy();
    });

    it('renders no label by default', () => {
      expect(fixture.nativeElement.querySelector('label')).toBeNull();
    });

    it('renders a label when provided', () => {
      fixture.componentRef.setInput('label', 'Email');
      fixture.detectChanges();
      const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
      expect(label.textContent?.trim()).toBe('Email');
    });

    it('associates the label with the input via id', () => {
      fixture.componentRef.setInput('label', 'Email');
      fixture.detectChanges();
      const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
      const input = getNativeInput();
      expect(label.htmlFor).toBe(input.id);
    });

    it('sets the input type attribute', () => {
      fixture.componentRef.setInput('type', 'email');
      fixture.detectChanges();
      expect(getNativeInput().type).toBe('email');
    });

    it('sets the placeholder', () => {
      fixture.componentRef.setInput('placeholder', 'Enter text…');
      fixture.detectChanges();
      expect(getNativeInput().placeholder).toBe('Enter text…');
    });

    it('applies the default size class on the wrapper', () => {
      expect(getWrapper().classList).toContain('ea-input-wrapper--md');
    });

    it('applies the correct size class when set', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      expect(getWrapper().classList).toContain('ea-input-wrapper--lg');
    });
  });

  describe('Leading icon', () => {
    function getIcon(): HTMLElement | null {
      return fixture.nativeElement.querySelector('.ea-input-wrapper__icon');
    }

    it('keeps the icon while the field has a value by default', () => {
      fixture.componentRef.setInput('icon', SearchIconComponent);
      component.value.set('query');

      fixture.detectChanges();

      expect(getIcon()).toBeTruthy();
    });

    it('hides the icon once a value is set when keepIcon is false', () => {
      fixture.componentRef.setInput('icon', SearchIconComponent);
      fixture.componentRef.setInput('keepIcon', false);
      fixture.detectChanges();
      expect(getIcon()).toBeTruthy();

      component.value.set('query');
      fixture.detectChanges();

      expect(getIcon()).toBeNull();
    });
  });

  describe('ARIA passthrough', () => {
    it('forwards role and combobox attributes to the native input', () => {
      fixture.componentRef.setInput('role', 'combobox');
      fixture.componentRef.setInput('aria-expanded', true);
      fixture.componentRef.setInput('aria-controls', 'listbox-1');
      fixture.componentRef.setInput('aria-activedescendant', 'option-2');
      fixture.componentRef.setInput('aria-autocomplete', 'list');

      fixture.detectChanges();

      const input = getNativeInput();
      expect(input.getAttribute('role')).toBe('combobox');
      expect(input.getAttribute('aria-expanded')).toBe('true');
      expect(input.getAttribute('aria-controls')).toBe('listbox-1');
      expect(input.getAttribute('aria-activedescendant')).toBe('option-2');
      expect(input.getAttribute('aria-autocomplete')).toBe('list');
    });

    it('renders none of the attributes when unset', () => {
      const input = getNativeInput();

      expect(input.getAttribute('role')).toBeNull();
      expect(input.getAttribute('aria-expanded')).toBeNull();
      expect(input.getAttribute('aria-autocomplete')).toBeNull();
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
      expect(getWrapper().classList).toContain('ea-input-wrapper--disabled');
    });

    it('disables the input via setDisabledState (CVA)', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      expect(getNativeInput().disabled).toBe(true);
    });

    it('re-enables the input via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      component.setDisabledState(false);
      fixture.detectChanges();
      expect(getNativeInput().disabled).toBe(false);
    });
  });

  describe('ReadOnly / Required', () => {
    it('sets readonly on the native input', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();
      expect(getNativeInput().readOnly).toBe(true);
      expect(getWrapper().classList).toContain('ea-input-wrapper--readonly');
    });

    it('sets required on the native input', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      expect(getNativeInput().required).toBe(true);
    });

    it('adds the required modifier class to the label', () => {
      fixture.componentRef.setInput('label', 'Name');
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('.ea-field-label--required'),
      ).toBeTruthy();
    });
  });

  describe('Value binding', () => {
    it('reflects the initial value on the native input', () => {
      component.value.set('hello');
      fixture.detectChanges();
      expect(getNativeInput().value).toBe('hello');
    });

    it('updates the value signal on user input', () => {
      const input = getNativeInput();
      input.value = 'typed';
      input.dispatchEvent(new Event('input'));
      expect(component.value()).toBe('typed');
    });
  });

  describe('CVA', () => {
    it('writes value via writeValue', () => {
      component.writeValue('written');
      expect(component.value()).toBe('written');
    });

    it('calls onChange when user types', () => {
      const onChange = vi.fn();
      component.registerOnChange(onChange);
      const input = getNativeInput();
      input.value = 'new value';
      input.dispatchEvent(new Event('input'));
      expect(onChange).toHaveBeenCalledWith('new value');
    });

    it('calls onTouched on blur', () => {
      const onTouched = vi.fn();
      component.registerOnTouched(onTouched);
      getNativeInput().dispatchEvent(new FocusEvent('blur'));
      expect(onTouched).toHaveBeenCalled();
    });
  });

  describe('Number type', () => {
    function configureNumber(bounds: {
      min?: number;
      max?: number;
      maxLength?: number;
    }): void {
      fixture.componentRef.setInput('type', 'number');
      for (const [key, value] of Object.entries(bounds)) {
        fixture.componentRef.setInput(key, value);
      }
      fixture.detectChanges();
    }

    it('sets min, max, and step attributes for number inputs', () => {
      configureNumber({ min: 1, max: 3 });
      fixture.componentRef.setInput('step', 1);
      fixture.detectChanges();

      const input = getNativeInput();

      expect(input.getAttribute('min')).toBe('1');
      expect(input.getAttribute('max')).toBe('3');
      expect(input.getAttribute('step')).toBe('1');
    });

    it('does not set min/max for non-number inputs', () => {
      fixture.componentRef.setInput('min', 1);
      fixture.detectChanges();

      expect(getNativeInput().getAttribute('min')).toBeNull();
    });

    it('blocks the exponent key', () => {
      configureNumber({});
      const event = new KeyboardEvent('keydown', { key: 'e', cancelable: true });

      getNativeInput().dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
    });

    it('prevents the scroll-wheel from changing a focused number input', () => {
      configureNumber({});
      getNativeInput().dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      const event = new WheelEvent('wheel', { cancelable: true });

      getNativeInput().dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
    });

    it('clamps the value to max on blur', () => {
      configureNumber({ min: 1, max: 3 });
      const input = getNativeInput();
      input.value = '9';
      input.dispatchEvent(new Event('input'));

      input.dispatchEvent(new FocusEvent('blur'));

      expect(component.value()).toBe('3');
    });

    it('clamps the value to min on blur', () => {
      configureNumber({ min: 2, max: 8 });
      const input = getNativeInput();
      input.value = '0';
      input.dispatchEvent(new Event('input'));

      input.dispatchEvent(new FocusEvent('blur'));

      expect(component.value()).toBe('2');
    });

    it('enforces maxLength while typing on number inputs', () => {
      configureNumber({ maxLength: 1 });
      const input = getNativeInput();
      input.value = '12';

      input.dispatchEvent(new Event('input'));

      expect(component.value()).toBe('1');
    });

    it('derives a capped width from its bounds', () => {
      configureNumber({ min: -1000000, max: 1000000 });

      expect(component.numberWidth()).toBe('calc(8ch + 2em)');
    });

    it('does not cap width for non-number inputs', () => {
      fixture.componentRef.setInput('maxLength', 5);
      fixture.detectChanges();

      expect(component.numberWidth()).toBeNull();
    });
  });

  describe('Focus state', () => {
    it('adds focused class on focus', () => {
      getNativeInput().dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(getWrapper().classList).toContain('ea-input-wrapper--focused');
    });

    it('removes focused class on blur', () => {
      getNativeInput().dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      getNativeInput().dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();
      expect(getWrapper().classList).not.toContain('ea-input-wrapper--focused');
    });

    it('emits focused on focus', () => {
      const spy = vi.fn();
      component.focused.subscribe(spy);
      getNativeInput().dispatchEvent(new FocusEvent('focus'));
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('emits blurred on blur', () => {
      const spy = vi.fn();
      component.blurred.subscribe(spy);
      getNativeInput().dispatchEvent(new FocusEvent('blur'));
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Status / error / hint', () => {
    it('shows the error message when errorMsg is set', () => {
      fixture.componentRef.setInput('errorMsg', 'Required');
      fixture.detectChanges();
      const msg = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--error',
      );
      expect(msg?.textContent).toContain('Required');
    });

    it('sets wrapper to error status when errorMsg is set', () => {
      fixture.componentRef.setInput('errorMsg', 'Bad input');
      fixture.detectChanges();
      expect(getWrapper().classList).toContain('ea-input-wrapper--error');
    });

    it('sets aria-invalid on the input when errorMsg is set', () => {
      fixture.componentRef.setInput('errorMsg', 'Bad input');
      fixture.detectChanges();
      expect(getNativeInput().getAttribute('aria-invalid')).toBe('true');
    });

    it('does not set aria-invalid when there is no error', () => {
      expect(getNativeInput().getAttribute('aria-invalid')).toBeNull();
    });

    it('shows the hint message when hint is set and no error', () => {
      fixture.componentRef.setInput('hint', 'Helpful text');
      fixture.detectChanges();
      const msg = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--hint',
      );
      expect(msg?.textContent).toContain('Helpful text');
    });

    it('hides hint when error is also set', () => {
      fixture.componentRef.setInput('hint', 'Helpful text');
      fixture.componentRef.setInput('errorMsg', 'Required');
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('.ea-field-messages__message--hint'),
      ).toBeNull();
    });

    it('sets aria-describedby to the error id when error is shown', () => {
      fixture.componentRef.setInput('errorMsg', 'Oops');
      fixture.detectChanges();
      const inputEl = getNativeInput();
      const errorEl = fixture.nativeElement.querySelector('[role="alert"]');
      expect(inputEl.getAttribute('aria-describedby')).toBe(errorEl.id);
    });

    it('sets aria-describedby to the hint id when hint is shown', () => {
      fixture.componentRef.setInput('hint', 'Hint text');
      fixture.detectChanges();
      const inputEl = getNativeInput();
      const hintEl = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--hint',
      );
      expect(inputEl.getAttribute('aria-describedby')).toBe(hintEl.id);
    });
  });

  describe('Reactive forms integration', () => {
    it('works with a FormControl and Validators.required', () => {
      const hostFixture = TestBed.createComponent(InputComponent);
      const hostComponent = hostFixture.componentInstance;
      const control = new FormControl('', Validators.required);

      control.registerOnChange(() => {});
      hostComponent.registerOnChange(v => control.setValue(v));
      hostComponent.registerOnTouched(() => control.markAsTouched());

      hostFixture.detectChanges();

      const input: HTMLInputElement = hostFixture.nativeElement.querySelector('input');
      input.value = 'hello';
      input.dispatchEvent(new Event('input'));

      expect(control.value).toBe('hello');
      expect(control.valid).toBe(true);
    });

    it('disables via FormControl.disable()', () => {
      const control = new FormControl('');
      control.registerOnDisabledChange(isDisabled =>
        component.setDisabledState(isDisabled),
      );
      control.disable();
      fixture.detectChanges();
      expect(getNativeInput().disabled).toBe(true);
    });
  });

  describe('Clear button', () => {
    function getClearButton(): HTMLButtonElement {
      return fixture.nativeElement.querySelector('.ea-input-wrapper__clear');
    }

    beforeEach(() => {
      fixture.componentRef.setInput('clearable', true);
      component.value.set('hello');
      fixture.detectChanges();
    });

    it('clears the value and refocuses the input on click activation', () => {
      const focusSpy = vi.spyOn(getNativeInput(), 'focus');

      getClearButton().dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(component.value()).toBe('');
      expect(focusSpy).toHaveBeenCalled();
    });

    it('keeps focus in the input on mousedown without clearing', () => {
      const event = new MouseEvent('mousedown', { cancelable: true });

      getClearButton().dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
      expect(component.value()).toBe('hello');
    });

    it('notifies onChange exactly once per activation', () => {
      const onChange = vi.fn();
      component.registerOnChange(onChange);
      const button = getClearButton();

      button.dispatchEvent(new MouseEvent('mousedown', { cancelable: true }));
      button.dispatchEvent(new MouseEvent('click'));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('');
    });
  });

  describe('Programmatic focus', () => {
    it('exposes a focus() method that focuses the native input', () => {
      const spy = vi.spyOn(getNativeInput(), 'focus');
      component.focus();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Accessible name', () => {
    it('names the control via aria-label when no visible label is set', () => {
      fixture.componentRef.setInput('aria-label', 'Search');
      fixture.detectChanges();

      expect(getNativeInput().getAttribute('aria-label')).toBe('Search');
    });

    it('defers to the visible label when both are set', () => {
      fixture.componentRef.setInput('aria-label', 'Search');
      fixture.componentRef.setInput('label', 'Email');
      fixture.detectChanges();

      expect(getNativeInput().getAttribute('aria-label')).toBeNull();
    });
  });
});

import { Component, PLATFORM_ID } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { stubMotionQuery } from '../../test-setup';
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

      component.value.set('query');
      fixture.detectChanges();

      expect(getIcon()).toBeNull();
    });
  });

  describe('Label help', () => {
    function getHelpTrigger(): HTMLButtonElement | null {
      return fixture.nativeElement.querySelector('.ea-field-label__help-trigger');
    }

    beforeEach(() => {
      fixture.componentRef.setInput('label', 'Email');
      fixture.componentRef.setInput('labelHelp', 'We never share it.');
      fixture.detectChanges();
    });

    it('hands labelHelp to the field label as a named help button', () => {
      expect(getHelpTrigger()?.getAttribute('aria-label')).toBe(
        'More information about Email',
      );
    });

    it('reveals the help text when the button is pressed', () => {
      getHelpTrigger()!.click();
      fixture.detectChanges();

      const status: HTMLElement = fixture.nativeElement.querySelector('[role="status"]');

      expect(status.textContent?.trim()).toBe('We never share it.');
    });

    it('keeps the help out of the label that names the input', () => {
      const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');

      expect(label.htmlFor).toBe(getNativeInput().id);
      expect(label.textContent?.trim()).toBe('Email');
    });
  });

  describe('Optional', () => {
    function getSuffix(): HTMLElement | null {
      return fixture.nativeElement.querySelector('.ea-field-label__optional');
    }

    beforeEach(() => {
      fixture.componentRef.setInput('label', 'Middle name');
      fixture.componentRef.setInput('optional', true);
      fixture.detectChanges();
    });

    it('hands optional to the field label inside the label that names the input', () => {
      const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');

      expect(label.htmlFor).toBe(getNativeInput().id);
      expect(label.contains(getSuffix())).toBe(true);
      expect(label.textContent?.replace(/\s+/g, ' ').trim()).toBe(
        'Middle name (optional)',
      );
    });

    it('drops the note once the field is required', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      expect(getSuffix()).toBeNull();
    });
  });

  describe('Spellcheck', () => {
    it('leaves the attribute off by default', () => {
      expect(getNativeInput().getAttribute('spellcheck')).toBeNull();
    });

    it('forwards the attribute when set', () => {
      fixture.componentRef.setInput('spellcheck', false);

      fixture.detectChanges();

      expect(getNativeInput().getAttribute('spellcheck')).toBe('false');
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

  describe('Typed placeholder', () => {
    const HINTS = ['Hey', 'Yo'];
    const TYPE_MS = 45;
    const HOLD_MS = 2500;
    const ROTATE_MS = 6000;

    function getTyped(): HTMLElement | null {
      return fixture.nativeElement.querySelector('ea-typed-placeholder');
    }

    function isBlinking(): boolean {
      return getTyped()!.classList.contains('ea-typed-placeholder--blinking');
    }

    function start(hints: readonly string[] = HINTS): void {
      fixture.componentRef.setInput('typedPlaceholder', hints);
      fixture.detectChanges();
    }

    function advance(ms: number): void {
      vi.advanceTimersByTime(ms);
      fixture.detectChanges();
    }

    function type(value: string): void {
      getNativeInput().value = value;
      getNativeInput().dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }

    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
      vi.unstubAllGlobals();
    });

    it('types the first hint one character at a time', () => {
      start();

      expect(getTyped()!.textContent).toBe('H');

      advance(TYPE_MS);

      expect(getTyped()!.textContent).toBe('He');

      advance(TYPE_MS);

      expect(getTyped()!.textContent).toBe('Hey');
    });

    it('holds the whole hint, then clears it and types the next', () => {
      start();
      advance(TYPE_MS * 2);

      advance(HOLD_MS - 1);

      expect(getTyped()!.textContent).toBe('Hey');

      advance(1);

      expect(getTyped()!.textContent).toBe('');

      advance(TYPE_MS);

      expect(getTyped()!.textContent).toBe('Y');
    });

    it('loops back to the first hint after the last', () => {
      start();
      advance(TYPE_MS * 2 + HOLD_MS);
      advance(TYPE_MS * 2);

      advance(HOLD_MS + TYPE_MS);

      expect(getTyped()!.textContent).toBe('H');
    });

    it('holds the cursor solid while typing and blinks it once the hint is whole', () => {
      start();

      expect(getTyped()!.querySelector('.ea-typed-placeholder__cursor')).toBeTruthy();
      expect(isBlinking()).toBe(false);

      advance(TYPE_MS * 2);

      expect(isBlinking()).toBe(true);

      advance(HOLD_MS);

      expect(isBlinking()).toBe(false);
    });

    it('hides the layer from assistive technology', () => {
      start();

      expect(getTyped()!.getAttribute('aria-hidden')).toBe('true');
    });

    it('keeps the whole current hint on the native placeholder, visually suppressed', () => {
      start();

      expect(getNativeInput().placeholder).toBe('Hey');
      expect(getNativeInput().classList).toContain('ea-input--typed-placeholder');

      advance(TYPE_MS * 2 + HOLD_MS);

      expect(getNativeInput().placeholder).toBe('Yo');
    });

    it('takes the place of the plain placeholder', () => {
      fixture.componentRef.setInput('placeholder', 'Write here');

      start();

      expect(getNativeInput().placeholder).toBe('Hey');
    });

    it('disappears while the field has a value and returns once it is cleared', () => {
      start();

      type('Hello');

      expect(getTyped()).toBeNull();
      expect(getNativeInput().classList).not.toContain('ea-input--typed-placeholder');

      type('');

      expect(getTyped()).toBeTruthy();
      expect(getNativeInput().classList).toContain('ea-input--typed-placeholder');
    });

    it('swaps whole hints with no typing or cursor under reduced motion', () => {
      stubMotionQuery(true);

      start();

      expect(getTyped()).toBeNull();
      expect(getNativeInput().placeholder).toBe('Hey');
      expect(getNativeInput().classList).not.toContain('ea-input--typed-placeholder');

      advance(ROTATE_MS - 1);

      expect(getNativeInput().placeholder).toBe('Hey');

      advance(1);

      expect(getNativeInput().placeholder).toBe('Yo');
    });

    it('stops typing as soon as reduced motion is turned on', () => {
      const motion = stubMotionQuery(false);
      start();
      advance(TYPE_MS);

      motion.set(true);
      fixture.detectChanges();

      expect(getTyped()).toBeNull();
      expect(getNativeInput().placeholder).toBe('Hey');
    });

    it('starts over when the hints change', () => {
      start();
      advance(TYPE_MS * 2 + HOLD_MS);

      start(['Ok']);

      expect(getTyped()!.textContent).toBe('O');
      expect(getNativeInput().placeholder).toBe('Ok');
    });

    it('keeps its place when handed an equal list of hints', () => {
      start();
      advance(TYPE_MS);

      start([...HINTS]);

      expect(getTyped()!.textContent).toBe('He');
    });

    it('stops when the hints are cleared', () => {
      fixture.componentRef.setInput('placeholder', 'Write here');
      start();

      start([]);

      expect(getTyped()).toBeNull();
      expect(getNativeInput().placeholder).toBe('Write here');
      expect(vi.getTimerCount()).toBe(0);
    });

    it('runs no timer and keeps the plain placeholder without hints', () => {
      fixture.componentRef.setInput('placeholder', 'Write here');
      fixture.detectChanges();

      expect(getTyped()).toBeNull();
      expect(getNativeInput().placeholder).toBe('Write here');
      expect(getNativeInput().classList).not.toContain('ea-input--typed-placeholder');
      expect(vi.getTimerCount()).toBe(0);
    });

    it('clears its timer on destroy', () => {
      start();

      fixture.destroy();

      expect(vi.getTimerCount()).toBe(0);
    });
  });

  describe('Changed output', () => {
    it('emits the new value when the user changes it', () => {
      const spy = vi.fn();
      component.changed.subscribe(spy);

      const input = getNativeInput();
      input.value = 'abc';
      input.dispatchEvent(new Event('input'));

      expect(spy).toHaveBeenCalledWith('abc');
    });

    it('stays quiet when the form writes a value', () => {
      const spy = vi.fn();
      component.changed.subscribe(spy);

      component.writeValue('abc');

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('aria-labelledby', () => {
    @Component({
      imports: [InputComponent],
      template: `
        <span id="email-label">Email</span>
        <ea-input aria-labelledby="email-label" />
      `,
    })
    class LabelledByHostComponent {}

    it('names the field from the given elements, leaving the host element bare', () => {
      const host = TestBed.createComponent(LabelledByHostComponent);

      host.detectChanges();

      const component: HTMLElement = host.nativeElement.querySelector('ea-input');
      const named = component.querySelector('input')!;
      expect(component.hasAttribute('aria-labelledby')).toBe(false);
      expect(named.getAttribute('aria-labelledby')).toBe('email-label');
      expect(named.hasAttribute('aria-label')).toBe(false);
      host.destroy();
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

describe('InputComponent typed placeholder on the server', () => {
  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [InputComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the first whole hint natively without starting', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentRef.setInput('typedPlaceholder', ['Hey', 'Yo']);

    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(fixture.nativeElement.querySelector('ea-typed-placeholder')).toBeNull();
    expect(input.placeholder).toBe('Hey');
    expect(vi.getTimerCount()).toBe(0);
  });
});

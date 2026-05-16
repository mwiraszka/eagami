import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  let fixture: ComponentFixture<TextareaComponent>;
  let component: TextareaComponent;

  function getTextarea(): HTMLTextAreaElement {
    return fixture.nativeElement.querySelector('textarea');
  }

  function getWrapper(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-textarea-wrapper');
  }

  function getLabel(): HTMLLabelElement | null {
    return fixture.nativeElement.querySelector('.ea-textarea-field__label');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders a textarea element', () => {
      expect(getTextarea()).toBeTruthy();
    });

    it('applies the default size class', () => {
      expect(getWrapper().classList).toContain('ea-textarea-wrapper--md');
    });

    it('applies the size class when set', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(getWrapper().classList).toContain('ea-textarea-wrapper--lg');
    });

    it('renders no label by default', () => {
      expect(getLabel()).toBeNull();
    });

    it('renders the label when provided', () => {
      fixture.componentRef.setInput('label', 'Notes');
      fixture.detectChanges();

      expect(getLabel()!.textContent!.trim()).toBe('Notes');
    });

    it('forwards placeholder to the textarea', () => {
      fixture.componentRef.setInput('placeholder', 'Type here…');
      fixture.detectChanges();

      expect(getTextarea().placeholder).toBe('Type here…');
    });

    it('forwards rows to the textarea', () => {
      fixture.componentRef.setInput('rows', 6);
      fixture.detectChanges();

      expect(getTextarea().rows).toBe(6);
    });

    it('forwards maxlength to the textarea', () => {
      fixture.componentRef.setInput('maxlength', 200);
      fixture.detectChanges();

      expect(getTextarea().getAttribute('maxlength')).toBe('200');
    });
  });

  describe('Value', () => {
    it('starts with an empty value', () => {
      expect(component.value()).toBe('');
      expect(getTextarea().value).toBe('');
    });

    it('reflects the value model', () => {
      component.value.set('Hello');
      fixture.detectChanges();

      expect(getTextarea().value).toBe('Hello');
    });

    it('updates value on input', () => {
      const textarea = getTextarea();
      textarea.value = 'Hi there';
      textarea.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.value()).toBe('Hi there');
    });
  });

  describe('Disabled / readonly', () => {
    it('is enabled by default', () => {
      expect(getTextarea().disabled).toBe(false);
      expect(getTextarea().readOnly).toBe(false);
    });

    it('disables the textarea', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(getTextarea().disabled).toBe(true);
      expect(getWrapper().classList).toContain('ea-textarea-wrapper--disabled');
    });

    it('makes the textarea readonly', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      expect(getTextarea().readOnly).toBe(true);
      expect(getWrapper().classList).toContain('ea-textarea-wrapper--readonly');
    });
  });

  describe('Focus state', () => {
    it('tracks focused state via signal', () => {
      const textarea = getTextarea();
      textarea.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(component.isFocused()).toBe(true);
      expect(getWrapper().classList).toContain('ea-textarea-wrapper--focused');

      textarea.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(component.isFocused()).toBe(false);
    });

    it('emits focused output on focus', () => {
      const spy = jest.fn();
      component.focused.subscribe(spy);

      getTextarea().dispatchEvent(new FocusEvent('focus'));

      expect(spy).toHaveBeenCalled();
    });

    it('emits blurred output on blur', () => {
      const spy = jest.fn();
      component.blurred.subscribe(spy);

      getTextarea().dispatchEvent(new FocusEvent('blur'));

      expect(spy).toHaveBeenCalled();
    });

    it('focus() public method focuses the textarea', () => {
      component.focus();

      expect(document.activeElement).toBe(getTextarea());
    });
  });

  describe('Hint and error messages', () => {
    it('renders no message by default', () => {
      expect(
        fixture.nativeElement.querySelector('.ea-textarea-field__message'),
      ).toBeNull();
    });

    it('renders the hint when provided', () => {
      fixture.componentRef.setInput('hint', 'Up to 500 characters');
      fixture.detectChanges();

      const hint = fixture.nativeElement.querySelector(
        '.ea-textarea-field__message--hint',
      );

      expect(hint.textContent.trim()).toBe('Up to 500 characters');
      expect(getTextarea().getAttribute('aria-describedby')).toBe(hint.id);
    });

    it('renders the error and hides the hint when both are set', () => {
      fixture.componentRef.setInput('hint', 'Hint');
      fixture.componentRef.setInput('errorMsg', 'Required');
      fixture.detectChanges();

      const error = fixture.nativeElement.querySelector(
        '.ea-textarea-field__message--error',
      );
      const hint = fixture.nativeElement.querySelector(
        '.ea-textarea-field__message--hint',
      );

      expect(error.textContent).toContain('Required');
      expect(hint).toBeNull();
      expect(getTextarea().getAttribute('aria-describedby')).toBe(error.id);
      expect(getTextarea().getAttribute('aria-invalid')).toBe('true');
      expect(getWrapper().classList).toContain('ea-textarea-wrapper--error');
    });
  });

  describe('ControlValueAccessor', () => {
    it('writes value via writeValue', () => {
      component.writeValue('Body');

      expect(component.value()).toBe('Body');
    });

    it('coerces null/undefined to empty string', () => {
      component.writeValue(null as unknown as string);

      expect(component.value()).toBe('');
    });

    it('calls onChange on input', () => {
      const onChange = jest.fn();
      component.registerOnChange(onChange);

      const textarea = getTextarea();
      textarea.value = 'Body';
      textarea.dispatchEvent(new Event('input'));

      expect(onChange).toHaveBeenCalledWith('Body');
    });

    it('calls onTouched on blur', () => {
      const onTouched = jest.fn();
      component.registerOnTouched(onTouched);

      getTextarea().dispatchEvent(new FocusEvent('blur'));

      expect(onTouched).toHaveBeenCalled();
    });

    it('disables via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      expect(getTextarea().disabled).toBe(true);
    });
  });
});

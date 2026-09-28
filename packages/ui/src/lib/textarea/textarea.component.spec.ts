import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TextareaComponent } from './textarea.component';

@Component({
  imports: [ReactiveFormsModule, TextareaComponent],
  template: `
    <ea-textarea
      aria-label="Body"
      [formControl]="control"
      (input)="nativeInputs = nativeInputs + 1" />
  `,
})
class FormHostComponent {
  readonly control = new FormControl('Hello world', { nonNullable: true });
  readonly textarea = viewChild.required(TextareaComponent);
  nativeInputs = 0;
}

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
    return fixture.nativeElement.querySelector('.ea-field-label');
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
      const spy = vi.fn();
      component.focused.subscribe(spy);

      getTextarea().dispatchEvent(new FocusEvent('focus'));

      expect(spy).toHaveBeenCalled();
    });

    it('emits blurred output on blur', () => {
      const spy = vi.fn();
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
        fixture.nativeElement.querySelector('.ea-field-messages__message'),
      ).toBeNull();
    });

    it('renders the hint when provided', () => {
      fixture.componentRef.setInput('hint', 'Up to 500 characters');
      fixture.detectChanges();

      const hint = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--hint',
      );

      expect(hint.textContent.trim()).toBe('Up to 500 characters');
      expect(getTextarea().getAttribute('aria-describedby')).toBe(hint.id);
    });

    it('renders the error and hides the hint when both are set', () => {
      fixture.componentRef.setInput('hint', 'Hint');
      fixture.componentRef.setInput('errorMsg', 'Required');
      fixture.detectChanges();

      const error = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--error',
      );
      const hint = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--hint',
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
      const onChange = vi.fn();
      component.registerOnChange(onChange);

      const textarea = getTextarea();
      textarea.value = 'Body';
      textarea.dispatchEvent(new Event('input'));

      expect(onChange).toHaveBeenCalledWith('Body');
    });

    it('calls onTouched on blur', () => {
      const onTouched = vi.fn();
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

  describe('Caret API', () => {
    function withValue(value: string, start: number, end: number): HTMLTextAreaElement {
      component.value.set(value);
      fixture.detectChanges();
      const textarea = getTextarea();
      textarea.setSelectionRange(start, end);
      return textarea;
    }

    it('reports the selected range', () => {
      withValue('Hello world', 6, 11);

      const selection = component.getSelection();

      expect(selection).toEqual({ start: 6, end: 11 });
    });

    it('reports a bare caret as an empty range', () => {
      withValue('Hello world', 5, 5);

      const selection = component.getSelection();

      expect(selection).toEqual({ start: 5, end: 5 });
    });

    it('still reports the range after the field loses focus', () => {
      const textarea = withValue('Hello world', 2, 4);
      textarea.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      const selection = component.getSelection();

      expect(selection).toEqual({ start: 2, end: 4 });
    });

    it('replaces the selection and moves the caret after the inserted text', () => {
      const textarea = withValue('Hello world', 6, 11);

      component.insertText('there');
      fixture.detectChanges();

      expect(textarea.value).toBe('Hello there');
      expect(component.getSelection()).toEqual({ start: 11, end: 11 });
    });

    it('inserts at a bare caret without removing anything', () => {
      withValue('Hello world', 5, 5);

      component.insertText(',');
      fixture.detectChanges();

      expect(component.value()).toBe('Hello, world');
      expect(component.getSelection()).toEqual({ start: 6, end: 6 });
    });

    it('updates the value model and notifies the form like typing', () => {
      const onChange = vi.fn<(value: string) => void>();
      component.registerOnChange(onChange);
      const valueChange = vi.fn<(value: string) => void>();
      component.value.subscribe(valueChange);
      withValue('ab', 1, 1);

      component.insertText('X');

      expect(component.value()).toBe('aXb');
      expect(onChange).toHaveBeenCalledWith('aXb');
      expect(valueChange).toHaveBeenCalledWith('aXb');
    });

    it('leaves focus where it is', () => {
      withValue('ab', 1, 1);

      component.insertText('X');

      expect(document.activeElement).not.toBe(getTextarea());
    });

    it('does nothing while disabled', () => {
      withValue('ab', 1, 1);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      component.insertText('X');

      expect(component.value()).toBe('ab');
      expect(getTextarea().value).toBe('ab');
    });

    it('does nothing while read-only', () => {
      withValue('ab', 1, 1);
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      component.insertText('X');

      expect(component.value()).toBe('ab');
      expect(getTextarea().value).toBe('ab');
    });
  });

  describe('Caret API with a reactive form', () => {
    let hostFixture: ComponentFixture<FormHostComponent>;
    let host: FormHostComponent;

    beforeEach(() => {
      hostFixture = TestBed.createComponent(FormHostComponent);
      host = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    it('writes the inserted text through to the bound form control', () => {
      const textarea: HTMLTextAreaElement =
        hostFixture.nativeElement.querySelector('textarea');
      textarea.setSelectionRange(5, 5);
      const emitted: string[] = [];
      host.control.valueChanges.subscribe(value => emitted.push(value));

      host.textarea().insertText(' there');
      hostFixture.detectChanges();

      expect(host.control.value).toBe('Hello there world');
      expect(emitted).toEqual(['Hello there world']);
      expect(host.control.dirty).toBe(true);
    });

    it('fires a native input event that bubbles to the host', () => {
      host.textarea().insertText('!');

      expect(host.nativeInputs).toBe(1);
    });
  });

  describe('Accessible name', () => {
    it('names the control via aria-label when no visible label is set', () => {
      fixture.componentRef.setInput('aria-label', 'Notes');
      fixture.detectChanges();

      expect(getTextarea().getAttribute('aria-label')).toBe('Notes');
    });

    it('defers to the visible label when both are set', () => {
      fixture.componentRef.setInput('aria-label', 'Notes');
      fixture.componentRef.setInput('label', 'Comment');
      fixture.detectChanges();

      expect(getTextarea().getAttribute('aria-label')).toBeNull();
    });
  });
});

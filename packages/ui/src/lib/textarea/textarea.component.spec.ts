import { Component, PLATFORM_ID, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { stubMotionQuery } from '../../test-setup';
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

    it('follows the label with the optional note when optional', () => {
      fixture.componentRef.setInput('label', 'Message for the organizer');
      fixture.componentRef.setInput('optional', true);
      fixture.detectChanges();

      expect(getLabel()!.querySelector('.ea-field-label__optional')).toBeTruthy();
      expect(getLabel()!.textContent!.replace(/\s+/g, ' ').trim()).toBe(
        'Message for the organizer (optional)',
      );
    });

    it('leaves the optional note out when also required', () => {
      fixture.componentRef.setInput('label', 'Message for the organizer');
      fixture.componentRef.setInput('optional', true);
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      expect(getLabel()!.querySelector('.ea-field-label__optional')).toBeNull();
    });

    it('forwards placeholder to the textarea', () => {
      fixture.componentRef.setInput('placeholder', 'Type here…');
      fixture.detectChanges();

      expect(getTextarea().placeholder).toBe('Type here…');
    });

    it('forwards maxlength to the textarea', () => {
      fixture.componentRef.setInput('maxLength', 200);
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

  describe('Character count', () => {
    function getCount(): HTMLElement | null {
      return fixture.nativeElement.querySelector('.ea-textarea-field__count');
    }

    it('renders no count by default', () => {
      expect(getCount()).toBeNull();
    });

    it('counts the characters in the value', () => {
      fixture.componentRef.setInput('showCount', true);
      component.value.set('Hello');
      fixture.detectChanges();

      expect(getCount()?.textContent?.trim()).toBe('5');
    });

    it('sets the count against maxLength when one is given', () => {
      fixture.componentRef.setInput('showCount', true);
      fixture.componentRef.setInput('maxLength', 200);
      component.value.set('Hello');
      fixture.detectChanges();

      expect(getCount()?.textContent?.trim()).toBe('5 / 200');
    });

    it('follows the value as the user types', () => {
      fixture.componentRef.setInput('showCount', true);
      fixture.detectChanges();
      getTextarea().value = 'Hi';

      getTextarea().dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(getCount()?.textContent?.trim()).toBe('2');
    });

    it('describes the field with the count alongside the hint', () => {
      fixture.componentRef.setInput('showCount', true);
      fixture.componentRef.setInput('hint', 'Keep it short');
      fixture.detectChanges();

      const hint = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--hint',
      );

      expect(getTextarea().getAttribute('aria-describedby')).toBe(
        `${hint.id} ${getCount()?.id}`,
      );
    });

    it('describes the field with the count alone when there is no message', () => {
      fixture.componentRef.setInput('showCount', true);
      fixture.detectChanges();

      expect(getTextarea().getAttribute('aria-describedby')).toBe(getCount()?.id);
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
      getTextarea().value = value;
      getTextarea().dispatchEvent(new Event('input'));
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

      expect(getTextarea().placeholder).toBe('Hey');
      expect(getTextarea().classList).toContain('ea-textarea--typed-placeholder');

      advance(TYPE_MS * 2 + HOLD_MS);

      expect(getTextarea().placeholder).toBe('Yo');
    });

    it('takes the place of the plain placeholder', () => {
      fixture.componentRef.setInput('placeholder', 'Write here');

      start();

      expect(getTextarea().placeholder).toBe('Hey');
    });

    it('disappears while the field has a value and returns once it is cleared', () => {
      start();

      type('Hello');

      expect(getTyped()).toBeNull();
      expect(getTextarea().classList).not.toContain('ea-textarea--typed-placeholder');

      type('');

      expect(getTyped()).toBeTruthy();
      expect(getTextarea().classList).toContain('ea-textarea--typed-placeholder');
    });

    it('swaps whole hints with no typing or cursor under reduced motion', () => {
      stubMotionQuery(true);

      start();

      expect(getTyped()).toBeNull();
      expect(getTextarea().placeholder).toBe('Hey');
      expect(getTextarea().classList).not.toContain('ea-textarea--typed-placeholder');

      advance(ROTATE_MS - 1);

      expect(getTextarea().placeholder).toBe('Hey');

      advance(1);

      expect(getTextarea().placeholder).toBe('Yo');
    });

    it('stops typing as soon as reduced motion is turned on', () => {
      const motion = stubMotionQuery(false);
      start();
      advance(TYPE_MS);

      motion.set(true);
      fixture.detectChanges();

      expect(getTyped()).toBeNull();
      expect(getTextarea().placeholder).toBe('Hey');
    });

    it('starts over when the hints change', () => {
      start();
      advance(TYPE_MS * 2 + HOLD_MS);

      start(['Ok']);

      expect(getTyped()!.textContent).toBe('O');
      expect(getTextarea().placeholder).toBe('Ok');
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
      expect(getTextarea().placeholder).toBe('Write here');
      expect(vi.getTimerCount()).toBe(0);
    });

    it('runs no timer and keeps the plain placeholder without hints', () => {
      fixture.componentRef.setInput('placeholder', 'Write here');
      fixture.detectChanges();

      expect(getTyped()).toBeNull();
      expect(getTextarea().placeholder).toBe('Write here');
      expect(getTextarea().classList).not.toContain('ea-textarea--typed-placeholder');
      expect(vi.getTimerCount()).toBe(0);
    });

    it('clears its timer on destroy', () => {
      start();

      fixture.destroy();

      expect(vi.getTimerCount()).toBe(0);
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

describe('TextareaComponent typed placeholder on the server', () => {
  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [TextareaComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the first whole hint natively without starting', () => {
    const fixture = TestBed.createComponent(TextareaComponent);
    fixture.componentRef.setInput('typedPlaceholder', ['Hey', 'Yo']);

    fixture.detectChanges();

    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    expect(fixture.nativeElement.querySelector('ea-typed-placeholder')).toBeNull();
    expect(textarea.placeholder).toBe('Hey');
    expect(vi.getTimerCount()).toBe(0);
  });
});

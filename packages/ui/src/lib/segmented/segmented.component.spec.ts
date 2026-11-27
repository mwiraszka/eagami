import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { REAL_GET_COMPUTED_STYLE } from '../../test-setup';
import type { SelectOption } from '../select-option';
import { SegmentedComponent } from './segmented.component';

const options: SelectOption[] = [
  { value: 'a', label: 'Apple' },
  { value: 'b', label: 'Banana' },
  { value: 'c', label: 'Cherry', disabled: true },
];

describe('SegmentedComponent', () => {
  let fixture: ComponentFixture<SegmentedComponent>;
  let component: SegmentedComponent;

  function getOptions(): HTMLButtonElement[] {
    const root = fixture.nativeElement as HTMLElement;
    return Array.from(root.querySelectorAll<HTMLButtonElement>('.ea-segmented__option'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SegmentedComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('value', 'a');
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders a button per option', () => {
      expect(getOptions().length).toBe(3);
    });

    it('marks the selected option', () => {
      const buttons = getOptions();

      expect(buttons[0].getAttribute('aria-checked')).toBe('true');
      expect(buttons[1].getAttribute('aria-checked')).toBe('false');
    });

    it('disables individually disabled options', () => {
      const buttons = getOptions();

      expect(buttons[2].disabled).toBe(true);
    });

    it('uses radiogroup role', () => {
      expect(fixture.nativeElement.querySelector('[role="radiogroup"]')).toBeTruthy();
    });
  });

  describe('Selection', () => {
    it('updates value on click', () => {
      getOptions()[1].click();
      fixture.detectChanges();

      expect(component.value()).toBe('b');
    });

    it('does not select disabled options on click', () => {
      getOptions()[2].click();
      fixture.detectChanges();

      expect(component.value()).toBe('a');
    });

    it('emits changed output', () => {
      const spy = vi.fn();
      component.changed.subscribe(spy);

      getOptions()[1].click();

      expect(spy).toHaveBeenCalledWith('b');
    });

    it('marks the control touched without emitting when the selected option is clicked again', () => {
      const onTouched = vi.fn<() => void>();
      const spy = vi.fn();
      component.registerOnTouched(onTouched);
      component.changed.subscribe(spy);

      getOptions()[0].click();

      expect(onTouched).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalled();
    });

    it('ignores select() for a disabled option', () => {
      const spy = vi.fn();
      component.changed.subscribe(spy);

      component.select(options[2]);

      expect(component.value()).toBe('a');
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard navigation', () => {
    function dispatchKey(button: HTMLButtonElement, key: string): void {
      button.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      fixture.detectChanges();
    }

    it('moves to the next enabled option on ArrowRight', () => {
      dispatchKey(getOptions()[0], 'ArrowRight');

      expect(component.value()).toBe('b');
    });

    it('skips disabled options on ArrowRight', () => {
      fixture.componentRef.setInput('value', 'b');
      fixture.detectChanges();

      dispatchKey(getOptions()[1], 'ArrowRight');

      expect(component.value()).toBe('a');
    });

    it('jumps to first enabled option on Home', () => {
      fixture.componentRef.setInput('value', 'b');
      fixture.detectChanges();

      dispatchKey(getOptions()[1], 'Home');

      expect(component.value()).toBe('a');
    });

    it('jumps to the last enabled option on End, not the last option', () => {
      dispatchKey(getOptions()[0], 'End');

      // Cherry is disabled, so Banana is the real end of the group
      expect(component.value()).toBe('b');
    });

    it('moves backwards on ArrowLeft', () => {
      fixture.componentRef.setInput('value', 'b');
      fixture.detectChanges();

      dispatchKey(getOptions()[1], 'ArrowLeft');

      expect(component.value()).toBe('a');
    });

    it('wraps from the last enabled option back to the first', () => {
      fixture.componentRef.setInput('value', 'b');
      fixture.detectChanges();

      dispatchKey(getOptions()[1], 'ArrowRight');

      expect(component.value()).toBe('a');

      dispatchKey(getOptions()[0], 'ArrowLeft');

      expect(component.value()).toBe('b');
    });

    it('treats the vertical arrows like the horizontal ones', () => {
      dispatchKey(getOptions()[0], 'ArrowDown');

      expect(component.value()).toBe('b');

      dispatchKey(getOptions()[1], 'ArrowUp');

      expect(component.value()).toBe('a');
    });

    it('selects the pressed option on Enter and Space', () => {
      dispatchKey(getOptions()[1], 'Enter');

      expect(component.value()).toBe('b');

      dispatchKey(getOptions()[0], ' ');

      expect(component.value()).toBe('a');
    });

    it('mirrors the horizontal arrows under dir="rtl"', () => {
      const first = getOptions()[0];
      // jsdom does not resolve the dir attribute into a computed direction
      vi.spyOn(window, 'getComputedStyle').mockImplementation((el, pseudo) =>
        el === first
          ? ({ direction: 'rtl' } as CSSStyleDeclaration)
          : REAL_GET_COMPUTED_STYLE(el, pseudo),
      );

      dispatchKey(first, 'ArrowLeft');

      expect(component.value()).toBe('b');
    });

    it('moves to the previous option on ArrowRight under dir="rtl"', () => {
      fixture.componentRef.setInput('options', [
        { value: 'a', label: 'Apple' },
        { value: 'b', label: 'Banana' },
        { value: 'd', label: 'Date' },
      ]);
      fixture.componentRef.setInput('value', 'b');
      fixture.detectChanges();
      const middle = getOptions()[1];
      vi.spyOn(window, 'getComputedStyle').mockImplementation((el, pseudo) =>
        el === middle
          ? ({ direction: 'rtl' } as CSSStyleDeclaration)
          : REAL_GET_COMPUTED_STYLE(el, pseudo),
      );

      dispatchKey(middle, 'ArrowRight');

      expect(component.value()).toBe('a');
    });

    it('leaves other keys to the browser', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });

      getOptions()[0].dispatchEvent(event);

      expect(event.defaultPrevented).toBe(false);
      expect(component.value()).toBe('a');
    });

    it('ignores keys while the whole group is disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      dispatchKey(getOptions()[0], 'ArrowRight');

      expect(component.value()).toBe('a');
    });
  });

  describe('ControlValueAccessor', () => {
    it('writeValue updates the value', () => {
      component.writeValue('b');

      expect(component.value()).toBe('b');
    });

    it('setDisabledState disables the whole group', () => {
      component.setDisabledState(true);

      expect(component.isDisabled()).toBe(true);
    });
  });

  describe('Reactive forms', () => {
    @Component({
      imports: [SegmentedComponent, ReactiveFormsModule],
      template: `
        <ea-segmented
          [formControl]="control"
          [options]="options" />
      `,
    })
    class FormHostComponent {
      control = new FormControl<string | null>('b');
      options = options;
    }

    let formFixture: ComponentFixture<FormHostComponent>;
    let formHost: FormHostComponent;

    function getFormOptions(): HTMLButtonElement[] {
      const root = formFixture.nativeElement as HTMLElement;
      return Array.from(
        root.querySelectorAll<HTMLButtonElement>('.ea-segmented__option'),
      );
    }

    beforeEach(() => {
      formFixture = TestBed.createComponent(FormHostComponent);
      formHost = formFixture.componentInstance;
      formFixture.detectChanges();
    });

    afterEach(() => {
      formFixture.destroy();
    });

    it('checks the option the form control holds', () => {
      expect(getFormOptions()[1].getAttribute('aria-checked')).toBe('true');
    });

    it('checks no option once the form control is reset to null', () => {
      formHost.control.reset();
      formFixture.detectChanges();

      expect(
        getFormOptions().some(option => option.getAttribute('aria-checked') === 'true'),
      ).toBe(false);
    });

    it('reports a picked option to the form control and marks it touched', () => {
      getFormOptions()[0].click();

      expect(formHost.control.value).toBe('a');
      expect(formHost.control.touched).toBe(true);
    });
  });

  describe('Form-field plumbing', () => {
    function getGroupEl(): HTMLElement {
      return fixture.nativeElement.querySelector('[role="radiogroup"]');
    }

    it('renders no field label by default', () => {
      expect(fixture.nativeElement.querySelector('.ea-field-label')).toBeNull();
    });

    it('renders the label and links it via aria-labelledby', () => {
      fixture.componentRef.setInput('label', 'View');
      fixture.detectChanges();

      const labelEl = fixture.nativeElement.querySelector('.ea-field-label');

      expect(labelEl.textContent.trim()).toBe('View');
      expect(getGroupEl().getAttribute('aria-labelledby')).toBe(labelEl.id);
    });

    it('renders the hint and wires aria-describedby', () => {
      fixture.componentRef.setInput('hint', 'Pick a layout');
      fixture.detectChanges();

      const hint = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--hint',
      );

      expect(hint.textContent.trim()).toBe('Pick a layout');
      expect(getGroupEl().getAttribute('aria-describedby')).toBe(hint.id);
    });

    it('renders the error and hides the hint when both are set', () => {
      fixture.componentRef.setInput('hint', 'Hint');
      fixture.componentRef.setInput('errorMsg', 'Pick something');
      fixture.detectChanges();

      const error = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--error',
      );
      const hint = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--hint',
      );

      expect(error.textContent.trim()).toBe('Pick something');
      expect(hint).toBeNull();
      expect(getGroupEl().getAttribute('aria-describedby')).toBe(error.id);
      expect(getGroupEl().getAttribute('aria-invalid')).toBe('true');
    });

    it('sets aria-required when required is true', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      expect(getGroupEl().getAttribute('aria-required')).toBe('true');
    });
  });

  describe('aria-labelledby', () => {
    @Component({
      imports: [SegmentedComponent],
      template: `
        <span id="view-label">View</span>
        <ea-segmented
          aria-labelledby="view-label"
          [options]="options" />
      `,
    })
    class LabelledByHostComponent {
      options: SelectOption[] = [
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' },
      ];
    }

    it('names the field from the given elements, leaving the host element bare', () => {
      const host = TestBed.createComponent(LabelledByHostComponent);

      host.detectChanges();

      const component: HTMLElement = host.nativeElement.querySelector('ea-segmented');
      const named = component.querySelector('[role="radiogroup"]')!;
      expect(component.hasAttribute('aria-labelledby')).toBe(false);
      expect(named.getAttribute('aria-labelledby')).toBe('view-label');
      expect(named.hasAttribute('aria-label')).toBe(false);
      host.destroy();
    });
  });

  describe('Read-only state', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();
    });

    it('keeps the options enabled and marks the group aria-readonly', () => {
      const group: HTMLElement =
        fixture.nativeElement.querySelector('[role="radiogroup"]');

      expect(group.getAttribute('aria-readonly')).toBe('true');
      expect(getOptions()[1].disabled).toBe(false);
    });

    it('keeps the value when another option is clicked', () => {
      const spy = vi.fn();
      component.changed.subscribe(spy);

      getOptions()[1].click();
      fixture.detectChanges();

      expect(component.value()).toBe('a');
      expect(spy).not.toHaveBeenCalled();
    });

    it('keeps the value on the arrow keys', () => {
      getOptions()[0].dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
      );
      fixture.detectChanges();

      expect(component.value()).toBe('a');
    });
  });
});

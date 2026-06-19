import { type ComponentFixture, TestBed } from '@angular/core/testing';

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
});

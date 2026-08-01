import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberInputComponent } from './number-input.component';

describe('NumberInputComponent', () => {
  let fixture: ComponentFixture<NumberInputComponent>;
  let component: NumberInputComponent;

  function input(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input.ea-number-input');
  }

  function steppers(): HTMLButtonElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.ea-number-input-wrapper__step'),
    );
  }

  function incrementBtn(): HTMLButtonElement {
    return steppers()[0];
  }

  function decrementBtn(): HTMLButtonElement {
    return steppers()[1];
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders a native number input and two steppers', () => {
      expect(input().type).toBe('number');
      expect(steppers().length).toBe(2);
    });

    it('applies the size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelector('.ea-number-input-wrapper').classList,
      ).toContain('ea-number-input-wrapper--lg');
    });

    it('renders the label when provided', () => {
      fixture.componentRef.setInput('label', 'Quantity');
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelector('.ea-field-label')?.textContent,
      ).toContain('Quantity');
    });

    it('forwards min, max, and step to the native input', () => {
      fixture.componentRef.setInput('min', 1);
      fixture.componentRef.setInput('max', 9);
      fixture.componentRef.setInput('step', 2);
      fixture.detectChanges();

      expect(input().getAttribute('min')).toBe('1');
      expect(input().getAttribute('max')).toBe('9');
      expect(input().getAttribute('step')).toBe('2');
    });
  });

  describe('Value', () => {
    it('reflects the value in the input', () => {
      component.value.set(7);
      fixture.detectChanges();

      expect(input().value).toBe('7');
    });

    it('updates the value on input', () => {
      const el = input();
      el.value = '42';
      el.dispatchEvent(new Event('input'));

      expect(component.value()).toBe(42);
    });

    it('sets a null value for an empty input', () => {
      component.value.set(5);
      fixture.detectChanges();
      const el = input();
      el.value = '';
      el.dispatchEvent(new Event('input'));

      expect(component.value()).toBeNull();
    });

    it('clamps an out-of-range typed value on blur', () => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 10);
      fixture.detectChanges();
      const el = input();
      el.value = '99';
      el.dispatchEvent(new Event('input'));
      el.dispatchEvent(new Event('blur'));

      expect(component.value()).toBe(10);
    });

    it('keeps the raw value on writeValue (clamps only on interaction)', () => {
      fixture.componentRef.setInput('min', 5);
      component.writeValue(1);

      expect(component.value()).toBe(1);
    });

    it('floors typed negatives at 0 when negatives are disallowed', () => {
      fixture.componentRef.setInput('allowNegative', false);
      fixture.detectChanges();
      const el = input();
      el.value = '-5';
      el.dispatchEvent(new Event('input'));
      el.dispatchEvent(new Event('blur'));

      expect(component.value()).toBe(0);
    });
  });

  describe('Steppers', () => {
    it('increments by step', () => {
      fixture.componentRef.setInput('step', 5);
      component.value.set(10);
      fixture.detectChanges();

      incrementBtn().click();

      expect(component.value()).toBe(15);
    });

    it('decrements by step', () => {
      component.value.set(10);
      fixture.detectChanges();

      decrementBtn().click();

      expect(component.value()).toBe(9);
    });

    it('disables the increment stepper at max', () => {
      fixture.componentRef.setInput('max', 5);
      component.value.set(5);
      fixture.detectChanges();

      expect(incrementBtn().disabled).toBe(true);
    });

    it('disables the decrement stepper at min', () => {
      fixture.componentRef.setInput('min', 0);
      component.value.set(0);
      fixture.detectChanges();

      expect(decrementBtn().disabled).toBe(true);
    });
  });

  describe('Forms', () => {
    it('calls onChange when stepped', () => {
      const onChange = vi.fn<(value: number | null) => void>();
      component.registerOnChange(onChange);
      component.value.set(1);
      fixture.detectChanges();

      incrementBtn().click();

      expect(onChange).toHaveBeenCalledWith(2);
    });

    it('does not step when disabled', () => {
      component.value.set(3);
      component.setDisabledState(true);
      fixture.detectChanges();

      incrementBtn().click();

      expect(component.value()).toBe(3);
    });

    it('does not step when read-only', () => {
      fixture.componentRef.setInput('readonly', true);
      component.value.set(3);
      fixture.detectChanges();

      incrementBtn().click();

      expect(component.value()).toBe(3);
    });

    it('does not emit on a no-op blur', () => {
      const onChange = vi.fn<(value: number | null) => void>();
      const changed = vi.fn<(value: number | null) => void>();
      component.registerOnChange(onChange);
      component.changed.subscribe(changed);

      input().dispatchEvent(new Event('blur'));

      expect(onChange).not.toHaveBeenCalled();
      expect(changed).not.toHaveBeenCalled();
    });
  });

  describe('Typing guards and commit', () => {
    function type(value: string): void {
      input().value = value;
      input().dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }

    function keydown(key: string): KeyboardEvent {
      const event = new KeyboardEvent('keydown', { key, cancelable: true });
      input().dispatchEvent(event);
      fixture.detectChanges();
      return event;
    }

    it('blocks exponent notation, which would escape the bounds', () => {
      expect(keydown('e').defaultPrevented).toBe(true);
      expect(keydown('E').defaultPrevented).toBe(true);
    });

    it('blocks the minus sign only when negatives are disallowed', () => {
      fixture.componentRef.setInput('allowNegative', false);
      fixture.detectChanges();

      expect(keydown('-').defaultPrevented).toBe(true);

      fixture.componentRef.setInput('allowNegative', true);
      fixture.detectChanges();

      expect(keydown('-').defaultPrevented).toBe(false);
    });

    it('leaves ordinary digits alone', () => {
      expect(keydown('5').defaultPrevented).toBe(false);
    });

    it('swallows the wheel only while focused, so a page scroll cannot nudge it', () => {
      const away = new WheelEvent('wheel', { cancelable: true });
      input().dispatchEvent(away);

      expect(away.defaultPrevented).toBe(false);

      input().dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      const focused = new WheelEvent('wheel', { cancelable: true });
      input().dispatchEvent(focused);

      expect(focused.defaultPrevented).toBe(true);
    });

    it('clamps into range on blur but not while typing', () => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 10);
      fixture.detectChanges();

      type('50');

      expect(component.value()).toBe(50);

      input().dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(component.value()).toBe(10);
    });

    it('treats a cleared field as null', () => {
      type('7');

      type('');

      expect(component.value()).toBeNull();
    });

    it('stays quiet on a blur that changes nothing', () => {
      component.writeValue(5);
      fixture.detectChanges();
      const changed = vi.fn<(value: number | null) => void>();
      component.changed.subscribe(changed);

      input().dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(changed).not.toHaveBeenCalled();
    });

    it('accepts an out-of-range value written by the form without clamping it', () => {
      fixture.componentRef.setInput('max', 10);
      fixture.detectChanges();

      component.writeValue(99);
      fixture.detectChanges();

      expect(component.value()).toBe(99);
    });

    it('treats a non-numeric form value as empty', () => {
      component.writeValue(Number.NaN);

      expect(component.value()).toBeNull();
    });
  });
});

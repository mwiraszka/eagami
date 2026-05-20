import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerComponent } from './color-picker.component';

describe('ColorPickerComponent', () => {
  let fixture: ComponentFixture<ColorPickerComponent>;
  let component: ColorPickerComponent;

  function getTrigger(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.ea-color-picker__trigger');
  }

  function getPopover(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.ea-color-picker__popover');
  }

  function open(): void {
    getTrigger().click();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders a trigger button', () => {
      expect(getTrigger()).toBeTruthy();
    });

    it('shows the placeholder when no color is set', () => {
      expect(getTrigger().textContent).toContain('Pick a color…');
    });

    it('renders a label when provided', () => {
      fixture.componentRef.setInput('label', 'Brand');
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('.ea-color-picker-field__label');
      expect(label.textContent.trim()).toBe('Brand');
    });

    it('does not show the popover by default', () => {
      expect(getPopover()).toBeNull();
    });

    it('applies the default size class', () => {
      expect(getTrigger().classList).toContain('ea-color-picker__trigger--md');
    });
  });

  describe('Opening and closing', () => {
    it('opens on trigger click', () => {
      open();

      expect(getPopover()).toBeTruthy();
    });

    it('closes on a second click', () => {
      open();
      getTrigger().click();
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
    });

    it('reflects open state via aria-expanded', () => {
      open();

      expect(getTrigger().getAttribute('aria-expanded')).toBe('true');
    });

    it('does not open when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      getTrigger().click();
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
    });

    it('renders the hex input by default when open', () => {
      open();

      const inputs = fixture.nativeElement.querySelectorAll('.ea-color-picker__input');
      expect(inputs.length).toBe(1); // hex only
      expect(
        fixture.nativeElement.querySelector('.ea-color-picker__input-group--hex'),
      ).toBeTruthy();
    });

    it('renders R, G, B, A inputs after switching to RGB mode', () => {
      open();
      component.cycleInputMode();
      fixture.detectChanges();

      const inputs = fixture.nativeElement.querySelectorAll('.ea-color-picker__input');
      expect(inputs.length).toBe(4); // R + G + B + A
    });

    it('omits the alpha input in RGB mode when showAlpha is false', () => {
      fixture.componentRef.setInput('showAlpha', false);
      open();
      component.cycleInputMode();
      fixture.detectChanges();

      const inputs = fixture.nativeElement.querySelectorAll('.ea-color-picker__input');
      expect(inputs.length).toBe(3); // R + G + B
    });

    it('toggles between hex and RGB via the format button', () => {
      open();
      const toggle = fixture.nativeElement.querySelector(
        '.ea-color-picker__format-toggle',
      ) as HTMLButtonElement;

      expect(toggle.textContent?.trim()).toBe('HEX');

      toggle.click();
      fixture.detectChanges();

      expect(toggle.textContent?.trim()).toBe('RGB');
    });
  });

  describe('writeValue (parsing)', () => {
    it('parses a 6-digit hex string', () => {
      component.writeValue('#ff8800');

      expect(component.rgb()).toEqual({ r: 255, g: 136, b: 0 });
    });

    it('parses a 3-digit hex string', () => {
      component.writeValue('#f80');

      expect(component.rgb()).toEqual({ r: 255, g: 136, b: 0 });
    });

    it('parses an 8-digit hex with alpha', () => {
      component.writeValue('#ff880080');

      expect(component.rgb()).toEqual({ r: 255, g: 136, b: 0 });
      // @ts-expect-error — alpha is private; reach into it for assertion only.
      expect(component.alpha()).toBeCloseTo(128 / 255, 2);
    });

    it('parses an rgb() function', () => {
      component.writeValue('rgb(10, 20, 30)');

      expect(component.rgb()).toEqual({ r: 10, g: 20, b: 30 });
    });

    it('parses an rgba() function with alpha', () => {
      component.writeValue('rgba(10, 20, 30, 0.4)');

      expect(component.rgb()).toEqual({ r: 10, g: 20, b: 30 });
      // @ts-expect-error — alpha is private; reach into it for assertion only.
      expect(component.alpha()).toBeCloseTo(0.4, 2);
    });

    it('clears state on null', () => {
      component.writeValue('#ff0000');
      component.writeValue(null);

      expect(component.value()).toBeNull();
      expect(component.rgb()).toEqual({ r: 0, g: 0, b: 0 });
    });
  });

  describe('Emission and CVA', () => {
    it('emits the new value via changed on preset click', () => {
      const spy = jest.fn();
      component.changed.subscribe(spy);
      open();

      const presets = fixture.nativeElement.querySelectorAll('.ea-color-picker__preset');
      (presets[0] as HTMLButtonElement).click();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(typeof spy.mock.calls[0][0]).toBe('string');
    });

    it('calls onChange with the formatted value', () => {
      const onChange: jest.Mock<void, [string | null]> = jest.fn();
      component.registerOnChange(onChange);
      open();

      const presets = fixture.nativeElement.querySelectorAll('.ea-color-picker__preset');
      (presets[0] as HTMLButtonElement).click();

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toMatch(/^#[0-9a-f]+$/i);
    });

    it('respects the format input when emitting', () => {
      fixture.componentRef.setInput('format', 'rgb');
      fixture.componentRef.setInput('showAlpha', false);
      const onChange: jest.Mock<void, [string | null]> = jest.fn();
      component.registerOnChange(onChange);
      fixture.detectChanges();
      open();

      const presets = fixture.nativeElement.querySelectorAll('.ea-color-picker__preset');
      (presets[0] as HTMLButtonElement).click();

      expect(onChange.mock.calls[0][0]).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
    });

    it('clears the value via the clear button', () => {
      component.writeValue('#ff0000');
      component.value.set('#ff0000');
      fixture.detectChanges();

      const clearBtn = fixture.nativeElement.querySelector(
        '.ea-color-picker__clear',
      ) as HTMLButtonElement;
      clearBtn.click();
      fixture.detectChanges();

      expect(component.value()).toBeNull();
    });

    it('disables via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      expect(getTrigger().disabled).toBe(true);
    });
  });

  describe('Keyboard', () => {
    it('opens on Enter', () => {
      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();

      expect(getPopover()).toBeTruthy();
    });

    it('opens on ArrowDown', () => {
      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(getPopover()).toBeTruthy();
    });

    it('closes on Escape', () => {
      open();
      const popover = getPopover()!;
      popover.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
    });
  });

  describe('Hex / RGB inputs', () => {
    it('updates state when a valid hex is typed', () => {
      open();
      const hexInput = fixture.nativeElement.querySelector(
        '.ea-color-picker__input-group--hex .ea-color-picker__input',
      ) as HTMLInputElement;

      hexInput.value = '#00aaff';
      hexInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.rgb()).toEqual({ r: 0, g: 170, b: 255 });
    });

    it('updates a single RGB channel after switching to RGB mode', () => {
      component.writeValue('#000000');
      open();
      component.cycleInputMode();
      fixture.detectChanges();

      const inputs = fixture.nativeElement.querySelectorAll(
        '.ea-color-picker__input--num',
      );
      const rInput = inputs[0] as HTMLInputElement;

      rInput.value = '128';
      rInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.rgb().r).toBe(128);
    });

    it('does not canonicalize a partial hex while the user is typing', () => {
      open();
      const hexInput = fixture.nativeElement.querySelector(
        '.ea-color-picker__input-group--hex .ea-color-picker__input',
      ) as HTMLInputElement;

      hexInput.value = '#123';
      hexInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      // State applies (3-digit shorthand expands to RGB).
      expect(component.rgb()).toEqual({ r: 17, g: 34, b: 51 });
      // But the input itself keeps the user's literal text.
      expect(component.hexInputValue()).toBe('#123');
    });

    it('canonicalizes the hex input on blur', () => {
      open();
      const hexInput = fixture.nativeElement.querySelector(
        '.ea-color-picker__input-group--hex .ea-color-picker__input',
      ) as HTMLInputElement;

      hexInput.value = '#123';
      hexInput.dispatchEvent(new Event('input'));
      hexInput.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(component.hexInputValue()).toBe('#112233');
    });
  });

  describe('Error and hint', () => {
    it('shows the error message when set', () => {
      fixture.componentRef.setInput('errorMsg', 'Required');
      fixture.detectChanges();

      const msg = fixture.nativeElement.querySelector(
        '.ea-color-picker-field__message--error',
      );
      expect(msg.textContent).toContain('Required');
    });

    it('shows the hint when set and no error', () => {
      fixture.componentRef.setInput('hint', 'Brand color');
      fixture.detectChanges();

      const msg = fixture.nativeElement.querySelector(
        '.ea-color-picker-field__message--hint',
      );
      expect(msg.textContent).toContain('Brand color');
    });

    it('hides the hint when an error is set', () => {
      fixture.componentRef.setInput('hint', 'Brand color');
      fixture.componentRef.setInput('errorMsg', 'Required');
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelector('.ea-color-picker-field__message--hint'),
      ).toBeNull();
    });
  });
});

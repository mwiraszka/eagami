import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerComponent } from './color-picker.component';

describe('ColorPickerComponent', () => {
  let fixture: ComponentFixture<ColorPickerComponent>;
  let component: ColorPickerComponent;

  function getTrigger(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.ea-color-picker__trigger');
  }

  function getPopover(): HTMLElement | null {
    // Surface renders unconditionally in `document.body`, hidden via `display: none`;
    // treat a hidden one as "no popover".
    const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface || surface.style.display === 'none') return null;
    return surface.querySelector<HTMLElement>('.ea-color-picker__popover');
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

  afterEach(() => {
    fixture.destroy();
    document.querySelectorAll('.ea-popover__surface').forEach(node => node.remove());
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

      const inputs = document.body.querySelectorAll('.ea-color-picker__input');
      expect(inputs.length).toBe(1); // hex only
      expect(
        document.body.querySelector('.ea-color-picker__input-group--hex'),
      ).toBeTruthy();
    });

    it('renders R, G, B, A inputs after switching to RGB mode', () => {
      open();
      component.cycleInputMode();
      fixture.detectChanges();

      const inputs = document.body.querySelectorAll('.ea-color-picker__input');
      expect(inputs.length).toBe(4); // R + G + B + A
    });

    it('omits the alpha input in RGB mode when showAlpha is false', () => {
      fixture.componentRef.setInput('showAlpha', false);
      open();
      component.cycleInputMode();
      fixture.detectChanges();

      const inputs = document.body.querySelectorAll('.ea-color-picker__input');
      expect(inputs.length).toBe(3); // R + G + B
    });

    it('toggles between hex and RGB via the format button', () => {
      open();
      const toggle = document.body.querySelector(
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
      // @ts-expect-error alpha is private; reach into it for assertion only
      expect(component.alpha()).toBeCloseTo(128 / 255, 2);
    });

    it('parses an rgb() function', () => {
      component.writeValue('rgb(10, 20, 30)');

      expect(component.rgb()).toEqual({ r: 10, g: 20, b: 30 });
    });

    it('parses an rgba() function with alpha', () => {
      component.writeValue('rgba(10, 20, 30, 0.4)');

      expect(component.rgb()).toEqual({ r: 10, g: 20, b: 30 });
      // @ts-expect-error alpha is private; reach into it for assertion only
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

      const presets = document.body.querySelectorAll('.ea-color-picker__preset');
      (presets[0] as HTMLButtonElement).click();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(typeof spy.mock.calls[0][0]).toBe('string');
    });

    it('calls onChange with the formatted value', () => {
      const onChange: jest.Mock<void, [string | null]> = jest.fn();
      component.registerOnChange(onChange);
      open();

      const presets = document.body.querySelectorAll('.ea-color-picker__preset');
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

      const presets = document.body.querySelectorAll('.ea-color-picker__preset');
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
      const hexInput = document.body.querySelector(
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

      const inputs = document.body.querySelectorAll('.ea-color-picker__input--num');
      const rInput = inputs[0] as HTMLInputElement;

      rInput.value = '128';
      rInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.rgb().r).toBe(128);
    });

    it('does not canonicalize a partial hex while the user is typing', () => {
      open();
      const hexInput = document.body.querySelector(
        '.ea-color-picker__input-group--hex .ea-color-picker__input',
      ) as HTMLInputElement;

      hexInput.value = '#123';
      hexInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      // 3-digit shorthand expands to RGB internally
      expect(component.rgb()).toEqual({ r: 17, g: 34, b: 51 });
      // but the input keeps the user's literal text
      expect(component.hexInputValue()).toBe('#123');
    });

    it('canonicalizes the hex input on blur', () => {
      open();
      const hexInput = document.body.querySelector(
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

  describe('SV area interaction', () => {
    function getSvArea(): HTMLDivElement {
      return document.body.querySelector('.ea-color-picker__sv-area')!;
    }

    function svKey(key: string, shift = false): void {
      getSvArea().dispatchEvent(
        new KeyboardEvent('keydown', { key, shiftKey: shift, bubbles: true }),
      );
      fixture.detectChanges();
    }

    beforeEach(() => {
      open();
    });

    it('increments saturation on ArrowRight', () => {
      component.writeValue('#808080');
      const before = component.rgb();
      svKey('ArrowRight');
      expect(component.rgb()).not.toEqual(before);
    });

    it('decrements saturation on ArrowLeft', () => {
      component.writeValue('#ff8800');
      const before = component.rgb();
      svKey('ArrowLeft');
      expect(component.rgb()).not.toEqual(before);
    });

    it('increments value on ArrowUp', () => {
      component.writeValue('#400000');
      const before = component.rgb();
      svKey('ArrowUp');
      expect(component.rgb()).not.toEqual(before);
    });

    it('decrements value on ArrowDown', () => {
      component.writeValue('#ff8800');
      const before = component.rgb();
      svKey('ArrowDown');
      expect(component.rgb()).not.toEqual(before);
    });

    it('jumps saturation to 0 on Home and 1 on End', () => {
      component.writeValue('#ff8800');

      svKey('Home');
      // saturation 0 is achromatic gray
      const grayish = component.rgb();
      expect(grayish.r).toBe(grayish.g);
      expect(grayish.g).toBe(grayish.b);

      svKey('End');
      const saturated = component.rgb();
      expect(saturated.r).not.toBe(saturated.g);
    });

    it('takes a coarser step with Shift+Arrow', () => {
      // saturated mid-orange so step deltas show clearly in RGB
      component.writeValue('#ff8800');
      svKey('ArrowLeft');
      const fineStep = component.rgb();

      component.writeValue('#ff8800');
      svKey('ArrowLeft', true);
      const coarseStep = component.rgb();

      // ArrowLeft lowers saturation so green climbs toward gray; the coarser Shift step climbs further
      expect(coarseStep.g).toBeGreaterThan(fineStep.g);
    });

    it('ignores unrelated keys', () => {
      component.writeValue('#ff8800');
      const before = component.rgb();
      svKey('a');
      expect(component.rgb()).toEqual(before);
    });

    it('ignores keyboard input when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      // disabling also disables the trigger, so assert the keyboard path no-ops directly
      component.writeValue('#ff8800');
      const before = component.rgb();
      component.onSvKeydown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      expect(component.rgb()).toEqual(before);
    });

    it('updates state from a pointer drag', () => {
      const area = getSvArea();
      area.getBoundingClientRect = () =>
        ({ left: 0, top: 0, width: 200, height: 200 }) as DOMRect;
      // jsdom has no `PointerEvent`; the handler only reads `clientX/Y`, `target`, `setPointerCapture`
      const fakeEvent = {
        clientX: 100,
        clientY: 100,
        pointerId: 1,
        target: area,
      } as unknown as PointerEvent;

      component.onSvPointerDown(fakeEvent);
      fixture.detectChanges();

      // middle of the area is sat 0.5, val 0.5
      // @ts-expect-error reach into private signals for assertion only
      expect(component.sat()).toBeCloseTo(0.5, 1);
      // @ts-expect-error reach into private signals for assertion only
      expect(component.val()).toBeCloseTo(0.5, 1);
    });

    it('ignores pointer move when not dragging the SV area', () => {
      const area = getSvArea();
      area.getBoundingClientRect = () =>
        ({ left: 0, top: 0, width: 200, height: 200 }) as DOMRect;
      const before = component.rgb();

      component.onSvPointerMove({
        clientX: 50,
        clientY: 50,
        target: area,
      } as unknown as PointerEvent);
      fixture.detectChanges();

      expect(component.rgb()).toEqual(before);
    });
  });

  describe('Hue strip interaction', () => {
    function getHueTrack(): HTMLDivElement {
      return document.body.querySelector('.ea-color-picker__strip--hue')!;
    }

    function hueKey(key: string, shift = false): void {
      getHueTrack().dispatchEvent(
        new KeyboardEvent('keydown', { key, shiftKey: shift, bubbles: true }),
      );
      fixture.detectChanges();
    }

    beforeEach(() => {
      component.writeValue('#ff0000');
      open();
    });

    it('advances hue on ArrowRight and rolls past 360', () => {
      for (let i = 0; i < 36; i++) hueKey('ArrowRight', true);
      expect(component.hueRounded()).toBeLessThanOrEqual(360);
    });

    it('decreases hue on ArrowDown and wraps past 0', () => {
      hueKey('ArrowDown', true);
      // wrapping past 0 lands near 350
      expect(component.hueRounded()).toBeGreaterThan(300);
    });

    it('jumps to 0 on Home', () => {
      // move first so Home has somewhere to come back from
      hueKey('End');
      hueKey('Home');
      expect(component.hueRounded()).toBe(0);
    });

    it('ignores unrelated keys', () => {
      const before = component.hueRounded();
      hueKey('Tab');
      expect(component.hueRounded()).toBe(before);
    });

    it('updates hue from a pointer drag', () => {
      const track = getHueTrack();
      track.getBoundingClientRect = () =>
        ({ left: 0, top: 0, width: 360, height: 12 }) as DOMRect;

      component.onHuePointerDown({
        clientX: 180,
        clientY: 6,
        pointerId: 1,
        target: track,
      } as unknown as PointerEvent);
      fixture.detectChanges();

      // halfway across is hue 180
      expect(component.hueRounded()).toBeCloseTo(180, 0);
    });
  });

  describe('Alpha strip interaction', () => {
    function getAlphaTrack(): HTMLDivElement {
      return document.body.querySelector('.ea-color-picker__strip--alpha')!;
    }

    function alphaKey(key: string, shift = false): void {
      getAlphaTrack().dispatchEvent(
        new KeyboardEvent('keydown', { key, shiftKey: shift, bubbles: true }),
      );
      fixture.detectChanges();
    }

    beforeEach(() => {
      component.writeValue('#ff0000');
      open();
    });

    it('decrements alpha on ArrowLeft', () => {
      alphaKey('ArrowLeft');
      expect(component.alphaPercentRounded()).toBeLessThan(100);
    });

    it('jumps alpha to 0 on Home and 1 on End', () => {
      alphaKey('Home');
      expect(component.alphaPercentRounded()).toBe(0);
      alphaKey('End');
      expect(component.alphaPercentRounded()).toBe(100);
    });

    it('takes a coarser alpha step with Shift+Arrow', () => {
      alphaKey('ArrowLeft');
      const fine = component.alphaPercentRounded();

      component.writeValue('#ff0000');
      alphaKey('ArrowLeft', true);
      const coarse = component.alphaPercentRounded();

      expect(100 - coarse).toBeGreaterThan(100 - fine);
    });

    it('updates alpha from a pointer drag', () => {
      const track = getAlphaTrack();
      track.getBoundingClientRect = () =>
        ({ left: 0, top: 0, width: 100, height: 12 }) as DOMRect;

      component.onAlphaPointerDown({
        clientX: 25,
        clientY: 6,
        pointerId: 1,
        target: track,
      } as unknown as PointerEvent);
      fixture.detectChanges();

      expect(component.alphaPercentRounded()).toBe(25);
    });

    it('ignores keys other than arrows / Home / End', () => {
      const before = component.alphaPercentRounded();
      alphaKey('q');
      expect(component.alphaPercentRounded()).toBe(before);
    });
  });

  describe('Alpha input field', () => {
    it('updates alpha state when a value is typed', () => {
      component.writeValue('#ff0000');
      open();
      component.cycleInputMode();
      fixture.detectChanges();

      const inputs = document.body.querySelectorAll('.ea-color-picker__input--num');
      const alphaInput = inputs[3] as HTMLInputElement;
      alphaInput.value = '50';
      alphaInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.alphaPercentRounded()).toBe(50);
    });
  });

  describe('Format emission', () => {
    it('emits HSL when format is hsl', () => {
      fixture.componentRef.setInput('format', 'hsl');
      const onChange: jest.Mock<void, [string | null]> = jest.fn();
      component.registerOnChange(onChange);
      fixture.detectChanges();

      component.selectPreset('#ef4444');

      expect(onChange.mock.calls[0][0]).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
    });

    it('emits rgba when format=rgb and alpha < 1', () => {
      fixture.componentRef.setInput('format', 'rgb');
      const onChange: jest.Mock<void, [string | null]> = jest.fn();
      component.registerOnChange(onChange);
      fixture.detectChanges();

      component.writeValue('rgba(10, 20, 30, 0.5)');
      // commit so onChange fires
      component.selectPreset('rgba(10, 20, 30, 0.5)');

      const last = onChange.mock.calls[onChange.mock.calls.length - 1][0];
      expect(last).toMatch(/^rgba\(\d+, \d+, \d+, /);
    });
  });

  describe('writeValue parsing edge cases', () => {
    it('parses an hsl() string', () => {
      component.writeValue('hsl(120, 100%, 50%)');
      expect(component.rgb()).toEqual({ r: 0, g: 255, b: 0 });
    });

    it('parses an hsla() string with alpha', () => {
      component.writeValue('hsla(240, 100%, 50%, 0.25)');
      expect(component.rgb()).toEqual({ r: 0, g: 0, b: 255 });
    });

    it('ignores an invalid color string entirely', () => {
      component.writeValue('#ff0000');
      const before = component.rgb();
      component.writeValue('this is not a color');
      expect(component.rgb()).toEqual(before);
    });
  });

  describe('Misc handlers', () => {
    it('cycleInputMode toggles between hex and rgb', () => {
      expect(component.inputMode()).toBe('hex');
      component.cycleInputMode();
      expect(component.inputMode()).toBe('rgb');
      component.cycleInputMode();
      expect(component.inputMode()).toBe('hex');
    });

    it('toggle is a no-op when readonly', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();
      component.toggle();
      expect(component.isOpen()).toBe(false);
    });

    it('close() is a no-op when not open', () => {
      const onTouched = jest.fn();
      component.registerOnTouched(onTouched);
      component.close();
      expect(onTouched).not.toHaveBeenCalled();
    });

    it('clear() is a no-op when readonly', () => {
      component.writeValue('#ff0000');
      component.value.set('#ff0000');
      fixture.detectChanges();
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      component.clear(new Event('click'));

      expect(component.value()).toBe('#ff0000');
    });

    it('selectPreset is a no-op when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      component.selectPreset('#ff0000');
      expect(component.value()).toBeNull();
    });

    it('onTriggerKeydown opens on Space', () => {
      const trigger = fixture.nativeElement.querySelector(
        '.ea-color-picker__trigger',
      ) as HTMLButtonElement;
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      fixture.detectChanges();
      expect(component.isOpen()).toBe(true);
    });

    it('document click outside the host closes the popover', () => {
      open();
      const outside = document.createElement('div');
      document.body.appendChild(outside);
      outside.click();
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
      outside.remove();
    });

    it('exposes hasEyeDropper based on window.EyeDropper presence', () => {
      const win = window as unknown as { EyeDropper?: unknown };
      const original = win.EyeDropper;
      win.EyeDropper = function EyeDropper() {};
      try {
        expect(component.hasEyeDropper()).toBe(true);
      } finally {
        if (original === undefined) delete win.EyeDropper;
        else win.EyeDropper = original;
      }
    });

    it('pickFromScreen applies the chosen color via the EyeDropper API', async () => {
      const win = window as unknown as {
        EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> };
      };
      win.EyeDropper = class {
        open() {
          return Promise.resolve({ sRGBHex: '#3366ff' });
        }
      };
      try {
        await component.pickFromScreen();
        expect(component.rgb()).toEqual({ r: 51, g: 102, b: 255 });
      } finally {
        delete win.EyeDropper;
      }
    });

    it('pickFromScreen swallows a user-cancelled EyeDropper rejection', async () => {
      const win = window as unknown as {
        EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> };
      };
      win.EyeDropper = class {
        open() {
          return Promise.reject(new Error('cancelled'));
        }
      };
      try {
        await expect(component.pickFromScreen()).resolves.toBeUndefined();
      } finally {
        delete win.EyeDropper;
      }
    });
  });
});

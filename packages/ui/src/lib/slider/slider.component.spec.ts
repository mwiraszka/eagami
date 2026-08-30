import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SunIconComponent } from '../icons/sun.component';
import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let fixture: ComponentFixture<SliderComponent>;
  let component: SliderComponent;

  function getThumb(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-slider__thumb');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders a slider thumb', () => {
      expect(getThumb()).toBeTruthy();
    });

    it('applies size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.ea-slider--lg')).toBeTruthy();
    });

    it('renders min/max labels when enabled', () => {
      fixture.componentRef.setInput('showMinMaxLabels', true);
      fixture.detectChanges();

      const labels = fixture.nativeElement.querySelectorAll('.ea-slider__minmax-label');
      expect(labels.length).toBe(2);
    });

    it('hands the icon to the field label', () => {
      fixture.componentRef.setInput('label', 'Brightness');
      fixture.componentRef.setInput('icon', SunIconComponent);
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelector('.ea-field-label__icon svg'),
      ).toBeTruthy();
    });

    it('shows the value with showValue even when no label is set', () => {
      fixture.componentRef.setInput('showValue', true);
      fixture.componentRef.setInput('value', 42);
      fixture.detectChanges();

      const value = fixture.nativeElement.querySelector('.ea-slider-field__value');

      expect(value).toBeTruthy();
      expect(value.textContent).toContain('42');
    });

    it('renders error message and sets aria-invalid', () => {
      fixture.componentRef.setInput('errorMsg', 'Out of range');
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('Out of range');
      expect(getThumb().getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('Aria attributes', () => {
    it('sets aria-valuemin/max/now to current bounds and value', () => {
      fixture.componentRef.setInput('min', 10);
      fixture.componentRef.setInput('max', 90);
      fixture.componentRef.setInput('value', 50);
      fixture.detectChanges();

      const thumb = getThumb();

      expect(thumb.getAttribute('aria-valuemin')).toBe('10');
      expect(thumb.getAttribute('aria-valuemax')).toBe('90');
      expect(thumb.getAttribute('aria-valuenow')).toBe('50');
    });

    it('uses formatValue for aria-valuetext', () => {
      fixture.componentRef.setInput('value', 25);
      fixture.componentRef.setInput('formatValue', (v: number) => `${v}%`);
      fixture.detectChanges();

      expect(getThumb().getAttribute('aria-valuetext')).toBe('25%');
    });
  });

  describe('Value formatting', () => {
    function getValueText(): string {
      return (
        fixture.nativeElement.querySelector('.ea-slider-field__value')?.textContent ?? ''
      );
    }

    it('groups thousands with commas by default', () => {
      fixture.componentRef.setInput('showValue', true);
      fixture.componentRef.setInput('max', 1000000);
      fixture.componentRef.setInput('value', 12345);
      fixture.detectChanges();

      expect(getValueText()).toContain('12,345');
    });

    it('shows plain numbers when groupThousands is false', () => {
      fixture.componentRef.setInput('showValue', true);
      fixture.componentRef.setInput('max', 1000000);
      fixture.componentRef.setInput('value', 12345);
      fixture.componentRef.setInput('groupThousands', false);
      fixture.detectChanges();

      expect(getValueText()).toContain('12345');
      expect(getValueText()).not.toContain('12,345');
    });

    it('lets a custom formatValue bypass grouping', () => {
      fixture.componentRef.setInput('showValue', true);
      fixture.componentRef.setInput('max', 1000000);
      fixture.componentRef.setInput('value', 12345);
      fixture.componentRef.setInput('formatValue', (v: number) => `$${v}`);
      fixture.detectChanges();

      expect(getValueText()).toContain('$12345');
    });
  });

  describe('Keyboard navigation', () => {
    function dispatchKey(key: string): void {
      const event = new KeyboardEvent('keydown', { key, bubbles: true });
      getThumb().dispatchEvent(event);
      fixture.detectChanges();
    }

    beforeEach(() => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('step', 1);
      fixture.componentRef.setInput('value', 50);
      fixture.detectChanges();
    });

    it('increments by step on ArrowRight', () => {
      dispatchKey('ArrowRight');

      expect(component.value()).toBe(51);
    });

    it('decrements by step on ArrowLeft', () => {
      dispatchKey('ArrowLeft');

      expect(component.value()).toBe(49);
    });

    it('jumps to min on Home', () => {
      dispatchKey('Home');

      expect(component.value()).toBe(0);
    });

    it('jumps to max on End', () => {
      dispatchKey('End');

      expect(component.value()).toBe(100);
    });

    it('clamps value at max', () => {
      fixture.componentRef.setInput('value', 100);
      fixture.detectChanges();

      dispatchKey('ArrowRight');

      expect(component.value()).toBe(100);
    });

    it('clamps value at min', () => {
      fixture.componentRef.setInput('value', 0);
      fixture.detectChanges();

      dispatchKey('ArrowLeft');

      expect(component.value()).toBe(0);
    });

    it('does not respond when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      dispatchKey('ArrowRight');

      expect(component.value()).toBe(50);
    });
  });

  describe('ControlValueAccessor', () => {
    it('writeValue updates the value', () => {
      component.writeValue(42);

      expect(component.value()).toBe(42);
    });

    it('writeValue falls back to min for invalid input', () => {
      fixture.componentRef.setInput('min', 5);
      component.writeValue(NaN as unknown as number);

      expect(component.value()).toBe(5);
    });

    it('setDisabledState reflects in isDisabled', () => {
      component.setDisabledState(true);

      expect(component.isDisabled()).toBe(true);
    });

    it('registerOnChange is called when value commits via keyboard', () => {
      const changes: number[] = [];
      component.registerOnChange(v => changes.push(v));
      component.writeValue(50);
      fixture.detectChanges();

      getThumb().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(changes).toEqual([51]);
    });

    it('registerOnTouched is called on blur', () => {
      let touched = 0;
      component.registerOnTouched(() => touched++);

      getThumb().dispatchEvent(new Event('blur'));

      expect(touched).toBe(1);
    });
  });

  describe('Keyboard', () => {
    function keyDown(key: string): void {
      getThumb().dispatchEvent(new KeyboardEvent('keydown', { key }));
    }

    beforeEach(() => {
      component.writeValue(50);
      fixture.detectChanges();
    });

    it('increments value with ArrowRight / ArrowUp', () => {
      keyDown('ArrowRight');
      expect(component.value()).toBe(51);
      keyDown('ArrowUp');
      expect(component.value()).toBe(52);
    });

    it('decrements value with ArrowLeft / ArrowDown', () => {
      keyDown('ArrowLeft');
      expect(component.value()).toBe(49);
      keyDown('ArrowDown');
      expect(component.value()).toBe(48);
    });

    it('jumps by 10% with PageUp / PageDown', () => {
      keyDown('PageUp');
      expect(component.value()).toBe(60);
      keyDown('PageDown');
      expect(component.value()).toBe(50);
    });

    it('jumps to min / max with Home / End', () => {
      keyDown('Home');
      expect(component.value()).toBe(0);
      keyDown('End');
      expect(component.value()).toBe(100);
    });

    it('ignores other keys', () => {
      keyDown('a');
      expect(component.value()).toBe(50);
    });

    it('ignores keyboard when disabled', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      keyDown('ArrowRight');
      expect(component.value()).toBe(50);
    });
  });

  describe('Pointer dragging', () => {
    function track(): HTMLElement {
      return fixture.nativeElement.querySelector('.ea-slider__track');
    }

    /** jsdom lays nothing out, so the track needs a measurable box. */
    function stubTrackRect(): void {
      track().getBoundingClientRect = () =>
        ({ left: 0, width: 100, top: 0, height: 8 }) as DOMRect;
    }

    function pointer(
      type: string,
      clientX: number,
      eventInit: PointerEventInit = {},
    ): void {
      track().dispatchEvent(
        new PointerEvent(type, {
          clientX,
          bubbles: true,
          pointerId: 1,
          buttons: type === 'pointerup' ? 0 : 1,
          ...eventInit,
        }),
      );
      fixture.detectChanges();
    }

    beforeEach(() => {
      fixture.componentRef.setInput('value', 20);
      fixture.detectChanges();
      stubTrackRect();
    });

    it('jumps to the pressed position on the track', () => {
      pointer('pointerdown', 60);

      expect(component.value()).toBe(60);
    });

    it('follows the pointer until release', () => {
      pointer('pointerdown', 60);

      pointer('pointermove', 75);

      expect(component.value()).toBe(75);

      pointer('pointerup', 75);
      pointer('pointermove', 10);

      expect(component.value()).toBe(75);
    });

    it('ignores a press of any button but the primary', () => {
      pointer('pointerdown', 60, { button: 2 });

      expect(component.value()).toBe(20);

      pointer('pointermove', 75);

      expect(component.value()).toBe(20);
    });

    it('stands the drag down when a move arrives with no button held', () => {
      pointer('pointerdown', 60);

      pointer('pointermove', 75, { buttons: 0 });
      pointer('pointermove', 10);

      expect(component.value()).toBe(60);
    });

    it('pulls the thumb onto a snap value within reach and lets it go past', () => {
      fixture.componentRef.setInput('snapValues', [50]);
      fixture.detectChanges();

      pointer('pointerdown', 47);

      expect(component.value()).toBe(50);

      pointer('pointermove', 30);

      expect(component.value()).toBe(30);
    });

    it('draws a tick for each snap value on the track', () => {
      fixture.componentRef.setInput('snapValues', [25, 75]);
      fixture.detectChanges();

      const ticks = fixture.nativeElement.querySelectorAll('.ea-slider__tick');

      expect(ticks).toHaveLength(2);
    });

    it('clamps a drag past either end to the bounds', () => {
      pointer('pointerdown', 50);

      pointer('pointermove', 250);

      expect(component.value()).toBe(100);

      pointer('pointermove', -80);

      expect(component.value()).toBe(0);
    });

    it('snaps a drag to the configured step', () => {
      fixture.componentRef.setInput('step', 25);
      fixture.detectChanges();

      pointer('pointerdown', 60);

      expect(component.value()).toBe(50);
    });

    it('ignores pointer input while disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      pointer('pointerdown', 60);

      expect(component.value()).toBe(20);
    });
  });
});

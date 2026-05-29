import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeSliderComponent, type RangeSliderValue } from './range-slider.component';

describe('RangeSliderComponent', () => {
  let fixture: ComponentFixture<RangeSliderComponent>;
  let component: RangeSliderComponent;

  function getLowThumb(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-range-slider__thumb--low');
  }

  function getHighThumb(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-range-slider__thumb--high');
  }

  function dispatchKey(target: HTMLElement, key: string): void {
    target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RangeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders two thumbs', () => {
      expect(getLowThumb()).toBeTruthy();
      expect(getHighThumb()).toBeTruthy();
    });

    it('applies size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.ea-range-slider--lg')).toBeTruthy();
    });

    it('renders min/max labels when enabled', () => {
      fixture.componentRef.setInput('showMinMaxLabels', true);
      fixture.detectChanges();

      const labels = fixture.nativeElement.querySelectorAll(
        '.ea-range-slider__minmax-label',
      );

      expect(labels.length).toBe(2);
    });

    it('renders error message and sets aria-invalid on both thumbs', () => {
      fixture.componentRef.setInput('errorMsg', 'Out of range');
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('Out of range');
      expect(getLowThumb().getAttribute('aria-invalid')).toBe('true');
      expect(getHighThumb().getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('Aria attributes', () => {
    it("constrains each thumb's aria-valuemin/max by the opposite thumb", () => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('value', [20, 80] as RangeSliderValue);
      fixture.detectChanges();

      expect(getLowThumb().getAttribute('aria-valuemin')).toBe('0');
      expect(getLowThumb().getAttribute('aria-valuemax')).toBe('80');
      expect(getLowThumb().getAttribute('aria-valuenow')).toBe('20');
      expect(getHighThumb().getAttribute('aria-valuemin')).toBe('20');
      expect(getHighThumb().getAttribute('aria-valuemax')).toBe('100');
      expect(getHighThumb().getAttribute('aria-valuenow')).toBe('80');
    });

    it('uses formatValue for each thumb aria-valuetext', () => {
      fixture.componentRef.setInput('value', [25, 75] as RangeSliderValue);
      fixture.componentRef.setInput('formatValue', (v: number) => `${v}%`);
      fixture.detectChanges();

      expect(getLowThumb().getAttribute('aria-valuetext')).toBe('25%');
      expect(getHighThumb().getAttribute('aria-valuetext')).toBe('75%');
    });
  });

  describe('Value invariants', () => {
    it('swaps low and high when given an inverted tuple', () => {
      component.writeValue([70, 30]);

      expect(component.clampedValue()).toEqual([30, 70]);
    });

    it('clamps both ends to [min, max]', () => {
      fixture.componentRef.setInput('min', 10);
      fixture.componentRef.setInput('max', 90);
      component.writeValue([-5, 200]);

      expect(component.clampedValue()).toEqual([10, 90]);
    });
  });

  describe('Keyboard navigation', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('step', 1);
      fixture.componentRef.setInput('value', [20, 80] as RangeSliderValue);
      fixture.detectChanges();
    });

    it('moves only the low thumb when low is focused', () => {
      dispatchKey(getLowThumb(), 'ArrowRight');

      expect(component.value()).toEqual([21, 80]);
    });

    it('moves only the high thumb when high is focused', () => {
      dispatchKey(getHighThumb(), 'ArrowLeft');

      expect(component.value()).toEqual([20, 79]);
    });

    it('prevents the low thumb from crossing the high thumb', () => {
      fixture.componentRef.setInput('value', [79, 80] as RangeSliderValue);
      fixture.detectChanges();

      dispatchKey(getLowThumb(), 'ArrowRight');
      dispatchKey(getLowThumb(), 'ArrowRight');

      expect(component.value()).toEqual([80, 80]);
    });

    it('prevents the high thumb from crossing the low thumb', () => {
      fixture.componentRef.setInput('value', [20, 21] as RangeSliderValue);
      fixture.detectChanges();

      dispatchKey(getHighThumb(), 'ArrowLeft');
      dispatchKey(getHighThumb(), 'ArrowLeft');

      expect(component.value()).toEqual([20, 20]);
    });

    it('jumps the low thumb to min on Home', () => {
      dispatchKey(getLowThumb(), 'Home');

      expect(component.value()).toEqual([0, 80]);
    });

    it('jumps the high thumb to max on End', () => {
      dispatchKey(getHighThumb(), 'End');

      expect(component.value()).toEqual([20, 100]);
    });

    it('does not respond when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      dispatchKey(getLowThumb(), 'ArrowRight');

      expect(component.value()).toEqual([20, 80]);
    });
  });

  describe('ControlValueAccessor', () => {
    it('writeValue updates the value tuple', () => {
      component.writeValue([15, 85]);

      expect(component.value()).toEqual([15, 85]);
    });

    it('writeValue falls back to [min, max] for invalid input', () => {
      fixture.componentRef.setInput('min', 5);
      fixture.componentRef.setInput('max', 95);
      component.writeValue(null);

      expect(component.value()).toEqual([5, 95]);
    });

    it('setDisabledState reflects in isDisabled', () => {
      component.setDisabledState(true);

      expect(component.isDisabled()).toBe(true);
    });

    it('registerOnChange fires when a thumb moves via keyboard', () => {
      const changes: [number, number][] = [];
      component.registerOnChange(v => changes.push([...v] as [number, number]));
      component.writeValue([20, 80]);
      fixture.detectChanges();

      const lowThumb = fixture.nativeElement.querySelector(
        '.ea-range-slider__thumb--low',
      ) as HTMLElement;
      lowThumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(changes).toEqual([[21, 80]]);
    });

    it('registerOnTouched fires on thumb blur', () => {
      let touched = 0;
      component.registerOnTouched(() => touched++);
      fixture.detectChanges();

      const highThumb = fixture.nativeElement.querySelector(
        '.ea-range-slider__thumb--high',
      ) as HTMLElement;
      highThumb.dispatchEvent(new Event('blur'));

      expect(touched).toBe(1);
    });
  });

  describe('Keyboard navigation', () => {
    function getLow(): HTMLElement {
      return fixture.nativeElement.querySelector('.ea-range-slider__thumb--low');
    }
    function getHigh(): HTMLElement {
      return fixture.nativeElement.querySelector('.ea-range-slider__thumb--high');
    }
    function keyOn(thumb: HTMLElement, key: string): void {
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key }));
    }

    beforeEach(() => {
      component.writeValue([20, 80]);
      fixture.detectChanges();
    });

    it('arrow keys step each thumb by `step`', () => {
      keyOn(getLow(), 'ArrowRight');
      expect(component.value()).toEqual([21, 80]);
      keyOn(getHigh(), 'ArrowLeft');
      expect(component.value()).toEqual([21, 79]);
      keyOn(getHigh(), 'ArrowUp');
      expect(component.value()).toEqual([21, 80]);
      keyOn(getLow(), 'ArrowDown');
      expect(component.value()).toEqual([20, 80]);
    });

    it('PageUp / PageDown jump by a larger step', () => {
      keyOn(getLow(), 'PageUp');
      expect(component.value()[0]).toBe(30);
      keyOn(getHigh(), 'PageDown');
      expect(component.value()[1]).toBe(70);
    });

    it('Home and End snap a thumb to the bounds', () => {
      keyOn(getLow(), 'Home');
      expect(component.value()[0]).toBe(0);
      keyOn(getHigh(), 'End');
      expect(component.value()[1]).toBe(100);
    });

    it('ignores keys with no mapping', () => {
      keyOn(getLow(), 'a');
      expect(component.value()).toEqual([20, 80]);
    });

    it('ignores keyboard input when disabled', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      keyOn(getLow(), 'ArrowRight');
      expect(component.value()).toEqual([20, 80]);
    });
  });
});

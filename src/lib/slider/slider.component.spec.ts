import { ComponentFixture, TestBed } from '@angular/core/testing';

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

    it('renders error message and sets aria-invalid', () => {
      fixture.componentRef.setInput('error', 'Out of range');
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
  });
});

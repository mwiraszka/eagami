import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let fixture: ComponentFixture<RatingComponent>;
  let component: RatingComponent;

  function getStars(): HTMLButtonElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.ea-rating-field__star'));
  }

  function getGroup(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-rating-field__stars');
  }

  function stateOf(index: number): 'empty' | 'half' | 'full' {
    const cls = getStars()[index].classList;
    if (cls.contains('ea-rating-field__star--full')) return 'full';
    if (cls.contains('ea-rating-field__star--half')) return 'half';
    return 'empty';
  }

  /** Stub `getBoundingClientRect` on every star so pointer-position math is deterministic. */
  function stubStarBounds(): void {
    getStars().forEach(btn => {
      btn.getBoundingClientRect = () =>
        ({ left: 0, right: 20, top: 0, bottom: 20, width: 20, height: 20 }) as DOMRect;
    });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders 5 stars by default', () => {
      expect(getStars().length).toBe(5);
    });

    it('respects the `max` input', () => {
      fixture.componentRef.setInput('max', 7);
      fixture.detectChanges();
      expect(getStars().length).toBe(7);
    });

    it('renders the slider role with aria-valuemin / valuemax / valuenow', () => {
      component.writeValue(3);
      fixture.detectChanges();
      const group = getGroup();
      expect(group.getAttribute('role')).toBe('slider');
      expect(group.getAttribute('aria-valuemin')).toBe('0');
      expect(group.getAttribute('aria-valuemax')).toBe('5');
      expect(group.getAttribute('aria-valuenow')).toBe('3');
    });

    it('renders the alert message with the alert-circle icon when errorMsg is set', () => {
      fixture.componentRef.setInput('errorMsg', 'Required');
      fixture.detectChanges();
      const msg = fixture.nativeElement.querySelector('.ea-rating-field__message--error');
      expect(msg.getAttribute('role')).toBe('alert');
      expect(msg.querySelector('.ea-rating-field__message-icon')).toBeTruthy();
    });
  });

  describe('Per-star state', () => {
    it('marks stars below value as full and at-or-above as empty for whole values', () => {
      component.writeValue(3);
      fixture.detectChanges();
      expect(stateOf(0)).toBe('full');
      expect(stateOf(2)).toBe('full');
      expect(stateOf(3)).toBe('empty');
    });

    it('marks the boundary star as half when allowHalf is true and value is X.5', () => {
      fixture.componentRef.setInput('allowHalf', true);
      component.writeValue(2.5);
      fixture.detectChanges();
      expect(stateOf(1)).toBe('full');
      expect(stateOf(2)).toBe('half');
      expect(stateOf(3)).toBe('empty');
    });

    it('renders the half-star icon component only on half positions', () => {
      fixture.componentRef.setInput('allowHalf', true);
      component.writeValue(2.5);
      fixture.detectChanges();
      // Positions 0-1: full -> star, position 2: half -> left-half-star, 3-4: empty -> star
      const halfPositionIcon = getStars()[2].querySelector('ea-icon-left-half-star');
      const fullPositionIcon = getStars()[0].querySelector('ea-icon-star');
      expect(halfPositionIcon).toBeTruthy();
      expect(fullPositionIcon).toBeTruthy();
    });
  });

  describe('Click behavior', () => {
    it('sets the value to the clicked position', () => {
      stubStarBounds();
      getStars()[3].dispatchEvent(new MouseEvent('click', { clientX: 18 }));
      expect(component.value()).toBe(4);
    });

    it('snaps to the nearer half when allowHalf is true', () => {
      fixture.componentRef.setInput('allowHalf', true);
      fixture.detectChanges();
      stubStarBounds();
      getStars()[2].dispatchEvent(new MouseEvent('click', { clientX: 5 }));
      expect(component.value()).toBe(2.5);
      getStars()[2].dispatchEvent(new MouseEvent('click', { clientX: 15 }));
      expect(component.value()).toBe(3);
    });

    it('clears the rating when clicking the current value with clearable=true', () => {
      stubStarBounds();
      component.writeValue(3);
      fixture.detectChanges();
      getStars()[2].dispatchEvent(new MouseEvent('click', { clientX: 18 }));
      expect(component.value()).toBe(0);
    });

    it('keeps the value when clicking the current value with clearable=false', () => {
      stubStarBounds();
      fixture.componentRef.setInput('clearable', false);
      component.writeValue(3);
      fixture.detectChanges();
      getStars()[2].dispatchEvent(new MouseEvent('click', { clientX: 18 }));
      expect(component.value()).toBe(3);
    });
  });

  describe('Keyboard', () => {
    it('increments by 1 with ArrowRight / ArrowUp', () => {
      component.writeValue(2);
      fixture.detectChanges();
      getGroup().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      expect(component.value()).toBe(3);
      getGroup().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(component.value()).toBe(4);
    });

    it('decrements by 0.5 with ArrowLeft when allowHalf is true', () => {
      fixture.componentRef.setInput('allowHalf', true);
      component.writeValue(3);
      fixture.detectChanges();
      getGroup().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      expect(component.value()).toBe(2.5);
    });

    it('jumps to a digit key in 0..max', () => {
      getGroup().dispatchEvent(new KeyboardEvent('keydown', { key: '4' }));
      expect(component.value()).toBe(4);
      getGroup().dispatchEvent(new KeyboardEvent('keydown', { key: '9' }));
      expect(component.value()).toBe(5);
    });

    it('clears the rating on Delete / Backspace', () => {
      component.writeValue(3);
      fixture.detectChanges();
      getGroup().dispatchEvent(new KeyboardEvent('keydown', { key: 'Delete' }));
      expect(component.value()).toBe(0);
    });
  });

  describe('Read-only and disabled', () => {
    it('does not change value on click when readonly', () => {
      stubStarBounds();
      fixture.componentRef.setInput('readonly', true);
      component.writeValue(2);
      fixture.detectChanges();
      getStars()[3].dispatchEvent(new MouseEvent('click', { clientX: 18 }));
      expect(component.value()).toBe(2);
    });

    it('does not change value on keydown when disabled via setDisabledState', () => {
      component.writeValue(2);
      component.setDisabledState(true);
      fixture.detectChanges();
      getGroup().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      expect(component.value()).toBe(2);
    });
  });

  describe('Hover preview', () => {
    // jsdom doesn't ship a PointerEvent constructor, so we hand-roll one with the
    // clientX the component reads via the shared positioning helper.
    function pointerMove(clientX: number): Event {
      const evt = new Event('pointermove', { bubbles: true });
      Object.defineProperty(evt, 'clientX', { value: clientX });
      return evt;
    }

    it('sets hoverValue on pointermove and emits hoverChanged', () => {
      stubStarBounds();
      const events: (number | null)[] = [];
      component.hoverChanged.subscribe(v => events.push(v));
      getStars()[3].dispatchEvent(pointerMove(18));
      expect(events).toEqual([4]);
    });

    it('clears hoverValue on pointerleave and emits null', () => {
      stubStarBounds();
      const events: (number | null)[] = [];
      component.hoverChanged.subscribe(v => events.push(v));
      getStars()[3].dispatchEvent(pointerMove(18));
      getGroup().dispatchEvent(new Event('pointerleave', { bubbles: true }));
      expect(events).toEqual([4, null]);
    });

    it('does not emit hover events when readonly', () => {
      stubStarBounds();
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();
      const events: (number | null)[] = [];
      component.hoverChanged.subscribe(v => events.push(v));
      getStars()[3].dispatchEvent(pointerMove(18));
      expect(events).toEqual([]);
    });
  });

  describe('Focus / blur', () => {
    it('flags the group as focused on focus and calls onTouched on blur', () => {
      let touched = 0;
      component.registerOnTouched(() => touched++);
      getGroup().dispatchEvent(new FocusEvent('focus'));
      getGroup().dispatchEvent(new FocusEvent('blur'));
      expect(touched).toBe(1);
    });
  });

  describe('Home / End keys', () => {
    it('jumps to 1 step with Home and max with End', () => {
      getGroup().dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
      expect(component.value()).toBe(5);
      getGroup().dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
      expect(component.value()).toBe(1);
    });
  });

  describe('Form integration (CVA)', () => {
    it('writes the form-control value via writeValue and notifies on changes', () => {
      stubStarBounds();
      const fc = new FormControl<number>(0, { nonNullable: true });
      component.registerOnChange(v => fc.setValue(v));
      getStars()[2].dispatchEvent(new MouseEvent('click', { clientX: 18 }));
      expect(fc.value).toBe(3);
    });

    it('clamps writeValue to 0..max', () => {
      component.writeValue(-1);
      expect(component.value()).toBe(0);
      component.writeValue(99);
      expect(component.value()).toBe(5);
    });
  });
});

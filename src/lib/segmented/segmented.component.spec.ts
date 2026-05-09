import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentedComponent, SelectOption } from './segmented.component';

const options: SelectOption[] = [
  { value: 'a', label: 'Apple' },
  { value: 'b', label: 'Banana' },
  { value: 'c', label: 'Cherry', disabled: true },
];

describe('SegmentedComponent', () => {
  let fixture: ComponentFixture<SegmentedComponent>;
  let component: SegmentedComponent;

  function getOptions(): HTMLButtonElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll<HTMLButtonElement>('.ea-segmented__option'),
    );
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
      const spy = jest.fn();
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
});

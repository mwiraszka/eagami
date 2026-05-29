import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePickerComponent } from './time-picker.component';

describe('TimePickerComponent', () => {
  let fixture: ComponentFixture<TimePickerComponent>;
  let component: TimePickerComponent;

  function getTrigger(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.ea-time-picker__trigger');
  }

  function getPopover(): HTMLElement | null {
    const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface || surface.style.display === 'none') {
      return null;
    }
    return surface.querySelector<HTMLElement>('.ea-time-picker__popover');
  }

  function getValueDisplays(): HTMLElement[] {
    const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface) {
      return [];
    }
    return Array.from(surface.querySelectorAll('.ea-time-picker__value'));
  }

  function getStepButtons(): HTMLButtonElement[] {
    const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface) {
      return [];
    }
    return Array.from(surface.querySelectorAll('.ea-time-picker__step'));
  }

  /** Chevron buttons fire on `(mousedown)`, not `(click)`, to start the long-press repeat */
  function pressStep(btn: HTMLButtonElement): void {
    btn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    btn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  }

  function getPeriodOptions(): HTMLButtonElement[] {
    const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface) {
      return [];
    }
    return Array.from(surface.querySelectorAll('.ea-time-picker__period-option'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimePickerComponent);
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

    it('shows placeholder when no value is selected', () => {
      expect(getTrigger().textContent).toContain('Select time…');
    });

    it('renders a label when provided', () => {
      fixture.componentRef.setInput('label', 'Start time');
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('.ea-field-label');
      expect(label.textContent.trim()).toBe('Start time');
    });

    it('does not show the popover by default', () => {
      expect(getPopover()).toBeNull();
    });

    it('applies the default size class', () => {
      expect(getTrigger().classList).toContain('ea-time-picker__trigger--md');
    });

    it('renders the value when set', () => {
      component.writeValue('09:30');
      fixture.detectChanges();

      expect(getTrigger().textContent).toContain('09:30');
    });
  });

  describe('Opening and closing', () => {
    it('opens the popover on trigger click', () => {
      getTrigger().click();
      fixture.detectChanges();

      expect(getPopover()).toBeTruthy();
    });

    it('renders hour and minute columns when open', () => {
      getTrigger().click();
      fixture.detectChanges();

      expect(getValueDisplays()).toHaveLength(2);
    });

    it('renders a seconds column when includeSeconds is true', () => {
      fixture.componentRef.setInput('includeSeconds', true);
      getTrigger().click();
      fixture.detectChanges();

      expect(getValueDisplays()).toHaveLength(3);
    });

    it('closes the popover on second trigger click', () => {
      getTrigger().click();
      fixture.detectChanges();

      getTrigger().click();
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
    });

    it('sets aria-expanded when open', () => {
      getTrigger().click();
      fixture.detectChanges();

      expect(getTrigger().getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('Stepping', () => {
    it('increments hours via the step button', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursUp] = getStepButtons();
      pressStep(hoursUp);

      expect(component.value()).toBe('10:30');
    });

    it('decrements hours via the step button', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const buttons = getStepButtons();
      pressStep(buttons[1]);

      expect(component.value()).toBe('08:30');
    });

    it('wraps hours from 23 back to 0', () => {
      component.writeValue('23:00');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursUp] = getStepButtons();
      pressStep(hoursUp);

      expect(component.value()).toBe('00:00');
    });

    it('wraps hours from 0 back to 23', () => {
      component.writeValue('00:00');
      getTrigger().click();
      fixture.detectChanges();

      const buttons = getStepButtons();
      pressStep(buttons[1]);

      expect(component.value()).toBe('23:00');
    });

    it('increments minutes by minuteStep', () => {
      fixture.componentRef.setInput('minuteStep', 15);
      component.writeValue('09:00');
      getTrigger().click();
      fixture.detectChanges();

      const buttons = getStepButtons();
      pressStep(buttons[2]);

      expect(component.value()).toBe('09:15');
    });

    it('wraps minutes from 55 back to 0 with step 15', () => {
      fixture.componentRef.setInput('minuteStep', 15);
      component.writeValue('09:55');
      getTrigger().click();
      fixture.detectChanges();

      const buttons = getStepButtons();
      pressStep(buttons[2]);

      expect(component.value()).toBe('09:10');
    });

    it('initializes to 00:00 when stepping with no prior value', () => {
      getTrigger().click();
      fixture.detectChanges();

      const [hoursUp] = getStepButtons();
      pressStep(hoursUp);

      expect(component.value()).toBe('01:00');
    });

    it('emits changed on each step', () => {
      const spy = jest.fn();
      component.changed.subscribe(spy);
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursUp] = getStepButtons();
      pressStep(hoursUp);

      expect(spy).toHaveBeenCalledWith('10:30');
    });

    it('respects includeSeconds in the emitted value', () => {
      fixture.componentRef.setInput('includeSeconds', true);
      component.writeValue('09:30:15');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursUp] = getStepButtons();
      pressStep(hoursUp);

      expect(component.value()).toBe('10:30:15');
    });
  });

  describe('12h format', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('format', '12h');
    });

    it('renders AM/PM toggle', () => {
      getTrigger().click();
      fixture.detectChanges();

      expect(getPeriodOptions()).toHaveLength(2);
    });

    it('marks AM as active when hour < 12', () => {
      component.writeValue('09:00');
      getTrigger().click();
      fixture.detectChanges();

      const [amBtn, pmBtn] = getPeriodOptions();
      expect(amBtn.classList).toContain('ea-time-picker__period-option--active');
      expect(pmBtn.classList).not.toContain('ea-time-picker__period-option--active');
    });

    it('marks PM as active when hour >= 12', () => {
      component.writeValue('14:00');
      getTrigger().click();
      fixture.detectChanges();

      const [amBtn, pmBtn] = getPeriodOptions();
      expect(pmBtn.classList).toContain('ea-time-picker__period-option--active');
      expect(amBtn.classList).not.toContain('ea-time-picker__period-option--active');
    });

    it('toggles 9 AM to 9 PM', () => {
      component.writeValue('09:00');
      getTrigger().click();
      fixture.detectChanges();

      const [, pmBtn] = getPeriodOptions();
      pmBtn.click();

      expect(component.value()).toBe('21:00');
    });

    it('toggles 9 PM to 9 AM', () => {
      component.writeValue('21:00');
      getTrigger().click();
      fixture.detectChanges();

      const [amBtn] = getPeriodOptions();
      amBtn.click();

      expect(component.value()).toBe('09:00');
    });

    it('formats trigger display in 12h notation', () => {
      component.writeValue('14:30');
      fixture.detectChanges();

      expect(getTrigger().textContent).toContain('2:30');
      expect(getTrigger().textContent).toContain('PM');
    });

    it('displays 12 for midnight in 12h mode', () => {
      component.writeValue('00:00');
      fixture.detectChanges();

      expect(getTrigger().textContent).toContain('12:00');
      expect(getTrigger().textContent).toContain('AM');
    });

    it('displays 12 for noon in 12h mode', () => {
      component.writeValue('12:00');
      fixture.detectChanges();

      expect(getTrigger().textContent).toContain('12:00');
      expect(getTrigger().textContent).toContain('PM');
    });
  });

  describe('Clear', () => {
    it('clears value via the clear button', () => {
      component.writeValue('09:30');
      fixture.detectChanges();

      const clearBtn = fixture.nativeElement.querySelector(
        '.ea-time-picker__clear',
      ) as HTMLButtonElement;
      clearBtn.click();
      fixture.detectChanges();

      expect(component.value()).toBeNull();
    });

    it('hides the clear button when there is no value', () => {
      const clearBtn = fixture.nativeElement.querySelector('.ea-time-picker__clear');
      expect(clearBtn).toBeNull();
    });

    it('hides the clear button when disabled', () => {
      component.writeValue('09:30');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const clearBtn = fixture.nativeElement.querySelector('.ea-time-picker__clear');
      expect(clearBtn).toBeNull();
    });
  });

  describe('Disabled state', () => {
    it('disables the trigger when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(getTrigger().disabled).toBe(true);
    });

    it('does not open when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      getTrigger().click();
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
    });
  });

  describe('Keyboard navigation', () => {
    it('opens on Enter key', () => {
      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();

      expect(getPopover()).toBeTruthy();
    });

    it('opens on ArrowDown key', () => {
      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(getPopover()).toBeTruthy();
    });

    it('closes on Escape from trigger when open', () => {
      getTrigger().click();
      fixture.detectChanges();

      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
    });

    it('steps via ArrowUp on the value spinner', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursSpinner] = getValueDisplays();
      hoursSpinner.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }),
      );

      expect(component.value()).toBe('10:30');
    });

    it('steps via ArrowDown on the value spinner', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursSpinner] = getValueDisplays();
      hoursSpinner.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
      );

      expect(component.value()).toBe('08:30');
    });
  });

  describe('Typing digits', () => {
    /** Simulates the user typing into the native input: sets the input value
     * to what would result, then fires `(input)` to drive the handler. */
    function typeInto(input: HTMLInputElement, value: string): void {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    it('reflects a typed digit in the cell without committing yet', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(hoursInput, '1');

      expect(component.value()).toBe('09:30');
      expect(component.editBuffer()).toEqual({ unit: 'hours', digits: '1' });
    });

    it('commits on the 2nd digit and auto-advances focus', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursInput, minutesInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(hoursInput, '14');
      fixture.detectChanges();

      expect(component.value()).toBe('14:30');
      expect(component.editBuffer()).toBeNull();
      expect(document.activeElement).toBe(minutesInput);
    });

    it('commits and advances when a single digit already saturates the unit', () => {
      // "7" in minutes: any second digit exceeds 59, so commit and advance
      component.writeValue('09:00');
      getTrigger().click();
      fixture.detectChanges();

      const [, minutesInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(minutesInput, '7');

      expect(component.value()).toBe('09:07');
      expect(component.editBuffer()).toBeNull();
    });

    it('commits the buffer on blur', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(hoursInput, '1');
      hoursInput.dispatchEvent(new FocusEvent('blur'));

      expect(component.value()).toBe('01:30');
      expect(component.editBuffer()).toBeNull();
    });

    it('strips non-digit characters from typed input', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(hoursInput, 'a1');

      expect(hoursInput.value).toBe('1');
      expect(component.editBuffer()).toEqual({ unit: 'hours', digits: '1' });
    });

    it('types into the minutes column', () => {
      component.writeValue('09:00');
      getTrigger().click();
      fixture.detectChanges();

      const [, minutesInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(minutesInput, '45');

      expect(component.value()).toBe('09:45');
    });

    it('respects 12h period when typing hours', () => {
      fixture.componentRef.setInput('format', '12h');
      component.writeValue('14:00');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(hoursInput, '09');

      expect(component.value()).toBe('21:00');
    });

    it('maps typed 12 to 24h hour 0 in AM', () => {
      fixture.componentRef.setInput('format', '12h');
      component.writeValue('09:00');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(hoursInput, '12');

      expect(component.value()).toBe('00:00');
    });

    it('ArrowUp flushes the buffer before stepping', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(hoursInput, '1');
      hoursInput.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }),
      );

      expect(component.value()).toBe('02:30');
    });

    it('reflects the buffer in the input value', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(hoursInput, '1');
      fixture.detectChanges();

      expect(hoursInput.value).toBe('1');
    });

    it('Escape clears the buffer and closes', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(hoursInput, '1');
      hoursInput.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
      fixture.detectChanges();

      expect(component.editBuffer()).toBeNull();
      expect(component.value()).toBe('09:30');
      expect(getPopover()).toBeNull();
    });
  });

  describe('Error and hint', () => {
    it('shows error message when set', () => {
      fixture.componentRef.setInput('errorMsg', 'Invalid time');
      fixture.detectChanges();

      const msg = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--error',
      );
      expect(msg.textContent).toContain('Invalid time');
    });

    it('shows hint when set and no error', () => {
      fixture.componentRef.setInput('hint', 'Between 9 and 5');
      fixture.detectChanges();

      const msg = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--hint',
      );
      expect(msg.textContent).toContain('Between 9 and 5');
    });

    it('hides hint when error is set', () => {
      fixture.componentRef.setInput('hint', 'Between 9 and 5');
      fixture.componentRef.setInput('errorMsg', 'Invalid time');
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelector('.ea-field-messages__message--hint'),
      ).toBeNull();
    });
  });

  describe('CVA', () => {
    it('writes a value string via writeValue', () => {
      component.writeValue('14:30');

      expect(component.value()).toBe('14:30');
    });

    it('writes null via writeValue', () => {
      component.writeValue('14:30');
      component.writeValue(null);

      expect(component.value()).toBeNull();
    });

    it('falls back to midnight on malformed input', () => {
      component.writeValue('not-a-time');
      fixture.detectChanges();

      expect(component.parsed()).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    });

    it('calls onChange on step', () => {
      const onChange: jest.Mock<void, [string | null]> = jest.fn();
      component.registerOnChange(onChange);
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursUp] = getStepButtons();
      pressStep(hoursUp);

      expect(onChange).toHaveBeenCalledWith('10:30');
    });

    it('calls onChange with null on clear', () => {
      const onChange: jest.Mock<void, [string | null]> = jest.fn();
      component.registerOnChange(onChange);
      component.writeValue('09:30');
      fixture.detectChanges();

      const clearBtn = fixture.nativeElement.querySelector(
        '.ea-time-picker__clear',
      ) as HTMLButtonElement;
      clearBtn.click();

      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('disables via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      expect(getTrigger().disabled).toBe(true);
    });
  });
});

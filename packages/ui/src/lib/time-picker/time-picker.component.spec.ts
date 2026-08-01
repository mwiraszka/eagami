import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { EagamiI18nService } from '../i18n/i18n.service';
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

    it('omits aria-controls when closed', () => {
      expect(getTrigger().hasAttribute('aria-controls')).toBe(false);
    });

    it('sets aria-controls to the popover surface id when open', () => {
      getTrigger().click();
      fixture.detectChanges();

      const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
      expect(getTrigger().getAttribute('aria-controls')).toBe(surface?.id);
    });

    it('names the dialog via the popover aria-label', () => {
      getTrigger().click();
      fixture.detectChanges();

      const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
      expect(surface?.getAttribute('aria-label')).toBe(
        TestBed.inject(EagamiI18nService).messages().timePicker.dialogLabel,
      );
    });

    it('traps Tab within the open dialog', () => {
      getTrigger().click();
      fixture.detectChanges();
      const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
      const focusable = Array.from(
        surface?.querySelectorAll<HTMLElement>('button, input') ?? [],
      );
      const last = focusable[focusable.length - 1];
      last.focus();

      last.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));

      expect(document.activeElement).toBe(focusable[0]);
    });
  });

  describe('Stepping', () => {
    it('steps on a keyboard-dispatched click', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursUp] = getStepButtons();
      // Keyboard activation of a button dispatches a click with detail 0
      hoursUp.dispatchEvent(new MouseEvent('click', { detail: 0 }));

      expect(component.value()).toBe('10:30');
    });

    it('ignores the click that follows a pointer press to avoid double stepping', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursUp] = getStepButtons();
      hoursUp.dispatchEvent(new MouseEvent('click', { detail: 1 }));

      expect(component.value()).toBe('09:30');
    });

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
      const spy = vi.fn();
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

    it('sets aria-pressed to reflect the active period', () => {
      component.writeValue('09:00');
      getTrigger().click();
      fixture.detectChanges();

      const [amBtn, pmBtn] = getPeriodOptions();
      expect(amBtn.getAttribute('aria-pressed')).toBe('true');
      expect(pmBtn.getAttribute('aria-pressed')).toBe('false');
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

    /**
     * A form can disable the control while its popover is already open. Nothing
     * inside the popover carries the `disabled` attribute, so the only thing
     * keeping the spinners inert is the guard on each handler.
     */
    it('ignores chevron presses once the form disables the control mid-edit', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();
      component.setDisabledState(true);
      fixture.detectChanges();

      const [hoursUp] = getStepButtons();
      pressStep(hoursUp);
      hoursUp.dispatchEvent(new MouseEvent('click', { detail: 0 }));

      expect(component.value()).toBe('09:30');
    });

    it('ignores typing and arrow keys once the form disables the control mid-edit', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();
      component.setDisabledState(true);
      fixture.detectChanges();

      const [hoursInput] = getValueDisplays() as HTMLInputElement[];
      hoursInput.value = '5';
      hoursInput.dispatchEvent(new Event('input', { bubbles: true }));
      hoursInput.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }),
      );

      expect(component.value()).toBe('09:30');
      expect(component.editBuffer()).toBeNull();
    });
  });

  describe('Readonly state', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('readonly', true);
      component.writeValue('09:30');
      fixture.detectChanges();
    });

    it('leaves the trigger enabled but does not open on click', () => {
      getTrigger().click();
      fixture.detectChanges();

      expect(getTrigger().disabled).toBe(false);
      expect(getPopover()).toBeNull();
    });

    it('does not open on Enter', () => {
      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
    });

    it('hides the clear button', () => {
      expect(fixture.nativeElement.querySelector('.ea-time-picker__clear')).toBeNull();
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

    it('closes and refocuses the trigger on Escape from inside the popover', () => {
      getTrigger().click();
      fixture.detectChanges();

      const [hoursUp] = getStepButtons();
      hoursUp.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
      expect(document.activeElement).toBe(getTrigger());
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

    it('keeps the popover open when ArrowDown is pressed again on the trigger', () => {
      getTrigger().click();
      fixture.detectChanges();

      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(getPopover()).toBeTruthy();
    });

    it('leaves Escape to the page while the popover is closed', () => {
      const event = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });

      getTrigger().dispatchEvent(event);

      expect(event.defaultPrevented).toBe(false);
    });

    it('jumps ten hours on PageUp', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursSpinner] = getValueDisplays();
      hoursSpinner.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true }),
      );

      expect(component.value()).toBe('19:30');
    });

    it('drops ten hours on PageDown', () => {
      component.writeValue('14:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursSpinner] = getValueDisplays();
      hoursSpinner.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }),
      );

      expect(component.value()).toBe('04:30');
    });

    it('jumps five minute steps on PageUp', () => {
      fixture.componentRef.setInput('minuteStep', 5);
      component.writeValue('09:00');
      getTrigger().click();
      fixture.detectChanges();

      const [, minutesSpinner] = getValueDisplays();
      minutesSpinner.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true }),
      );

      expect(component.value()).toBe('09:25');
    });

    it('drops five minute steps on PageDown', () => {
      fixture.componentRef.setInput('minuteStep', 5);
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [, minutesSpinner] = getValueDisplays();
      minutesSpinner.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }),
      );

      expect(component.value()).toBe('09:05');
    });

    it('commits the shown time and closes on Enter', () => {
      getTrigger().click();
      fixture.detectChanges();

      const [hoursSpinner] = getValueDisplays();
      hoursSpinner.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
      );
      fixture.detectChanges();

      expect(component.value()).toBe('00:00');
      expect(getPopover()).toBeNull();
      expect(document.activeElement).toBe(getTrigger());
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

    it('commits the previous column when the user moves on mid-edit', () => {
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursInput, minutesInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(hoursInput, '1');
      hoursInput.dispatchEvent(new FocusEvent('blur'));
      typeInto(minutesInput, '3');
      fixture.detectChanges();

      expect(component.value()).toBe('01:30');
      expect(hoursInput.value).toBe('01');
      expect(minutesInput.value).toBe('3');
    });

    it('does not re-emit when the typed value matches the current one', () => {
      const spy = vi.fn();
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();
      component.changed.subscribe(spy);

      const [hoursInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(hoursInput, '09');

      expect(spy).not.toHaveBeenCalled();
    });

    it('maps typed 12 to noon while PM is active', () => {
      fixture.componentRef.setInput('format', '12h');
      component.writeValue('21:00');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(hoursInput, '12');

      expect(component.value()).toBe('12:00');
    });

    it('keeps a typed hour in the morning while AM is active', () => {
      fixture.componentRef.setInput('format', '12h');
      component.writeValue('09:00');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(hoursInput, '05');

      expect(component.value()).toBe('05:00');
    });

    it('shows a partly typed second before it commits', () => {
      fixture.componentRef.setInput('includeSeconds', true);
      component.writeValue('09:30:15');
      getTrigger().click();
      fixture.detectChanges();

      const [, , secondsInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(secondsInput, '4');
      fixture.detectChanges();

      expect(secondsInput.value).toBe('4');
      expect(component.value()).toBe('09:30:15');
    });

    it('commits typed seconds and wraps focus back to hours', () => {
      fixture.componentRef.setInput('includeSeconds', true);
      component.writeValue('09:30:15');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursInput, , secondsInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(secondsInput, '45');

      expect(component.value()).toBe('09:30:45');
      expect(document.activeElement).toBe(hoursInput);
    });

    it('advances from minutes to seconds when the seconds column is shown', () => {
      fixture.componentRef.setInput('includeSeconds', true);
      component.writeValue('09:00:00');
      getTrigger().click();
      fixture.detectChanges();

      const [, minutesInput, secondsInput] = getValueDisplays() as HTMLInputElement[];
      typeInto(minutesInput, '45');

      expect(component.value()).toBe('09:45:00');
      expect(document.activeElement).toBe(secondsInput);
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
      const onChange = vi.fn<(value: string | null) => void>();
      component.registerOnChange(onChange);
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [hoursUp] = getStepButtons();
      pressStep(hoursUp);

      expect(onChange).toHaveBeenCalledWith('10:30');
    });

    it('calls onChange with null on clear', () => {
      const onChange = vi.fn<(value: string | null) => void>();
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

  /**
   * The chevrons repeat while held and cancel on every pointer exit path. The
   * suite above only ever dispatches mousedown/mouseup, so the touch handlers
   * and the repeat timers never run.
   */
  describe('Holding and touch stepping', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('repeats while the chevron stays held', () => {
      const [hoursUp] = getStepButtons();

      hoursUp.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

      expect(component.value()).toBe('10:30');

      // Nothing more until the initial delay elapses
      vi.advanceTimersByTime(399);

      expect(component.value()).toBe('10:30');

      vi.advanceTimersByTime(1 + 90 * 3);

      expect(component.value()).toBe('13:30');
    });

    it('stops repeating once the button is released', () => {
      const [hoursUp] = getStepButtons();
      hoursUp.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      vi.advanceTimersByTime(400 + 90);
      const held = component.value();

      hoursUp.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      vi.advanceTimersByTime(1000);

      expect(component.value()).toBe(held);
    });

    it('stops repeating when the pointer leaves the button', () => {
      const [hoursUp] = getStepButtons();
      hoursUp.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      vi.advanceTimersByTime(400 + 90);
      const held = component.value();

      hoursUp.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      vi.advanceTimersByTime(1000);

      expect(component.value()).toBe(held);
    });

    it('steps once on a touch tap and stops on touchend', () => {
      const [hoursUp] = getStepButtons();

      hoursUp.dispatchEvent(new TouchEvent('touchstart', { bubbles: true }));

      expect(component.value()).toBe('10:30');

      hoursUp.dispatchEvent(new TouchEvent('touchend', { bubbles: true }));
      vi.advanceTimersByTime(1000);

      expect(component.value()).toBe('10:30');
    });

    it('abandons the repeat when the touch is cancelled', () => {
      const [hoursUp] = getStepButtons();
      hoursUp.dispatchEvent(new TouchEvent('touchstart', { bubbles: true }));
      vi.advanceTimersByTime(400 + 90);
      const held = component.value();

      hoursUp.dispatchEvent(new TouchEvent('touchcancel', { bubbles: true }));
      vi.advanceTimersByTime(1000);

      expect(component.value()).toBe(held);
    });

    it('accelerates after a long hold', () => {
      const [hoursUp] = getStepButtons();

      hoursUp.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      vi.advanceTimersByTime(400 + 1500);
      const beforeAcceleration = component.value();
      // One slow interval would advance a single hour in this window
      vi.advanceTimersByTime(35 * 3);

      expect(component.value()).not.toBe(beforeAcceleration);

      hoursUp.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });
  });

  describe('Seconds and period controls', () => {
    it('steps the seconds column from its own chevrons', () => {
      fixture.componentRef.setInput('includeSeconds', true);
      component.writeValue('09:30:10');
      getTrigger().click();
      fixture.detectChanges();

      // Columns are hours, minutes, seconds: two chevrons each
      const secondsUp = getStepButtons()[4];
      secondsUp.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      secondsUp.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));

      expect(component.value()).toBe('09:30:11');
    });

    it('switches between AM and PM from the period buttons', () => {
      fixture.componentRef.setInput('format', '12h');
      component.writeValue('09:30');
      getTrigger().click();
      fixture.detectChanges();

      const [am, pm] = getPeriodOptions();

      pm.click();
      fixture.detectChanges();

      expect(component.value()).toBe('21:30');

      am.click();
      fixture.detectChanges();

      expect(component.value()).toBe('09:30');
    });

    it('reports no period and refuses to toggle one in 24h mode', () => {
      component.writeValue('09:00');

      component.togglePeriod();

      expect(component.period()).toBeNull();
      expect(component.value()).toBe('09:00');
    });
  });
});

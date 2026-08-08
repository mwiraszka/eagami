import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerComponent } from './date-picker.component';

describe('DatePickerComponent', () => {
  let fixture: ComponentFixture<DatePickerComponent>;
  let component: DatePickerComponent;

  function getInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('.ea-date-picker__input');
  }

  function getCalendarButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.ea-date-picker__calendar-button');
  }

  function type(text: string): void {
    const input = getInput();
    input.value = text;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function commit(): void {
    getInput().dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  }

  function getPopover(): HTMLElement | null {
    // Surface renders unconditionally in `document.body`, hidden via `display: none`;
    // treat a hidden one as "no popover".
    const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface || surface.style.display === 'none') {
      return null;
    }
    return surface.querySelector<HTMLElement>('.ea-date-picker__popover');
  }

  function getDayCells(): HTMLButtonElement[] {
    const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface || surface.style.display === 'none') {
      return [];
    }
    return Array.from(surface.querySelectorAll('.ea-date-picker__day'));
  }

  function findDayCell(dayNumber: number, currentMonth = true): HTMLButtonElement {
    return getDayCells().find(
      el =>
        el.textContent!.trim() === String(dayNumber) &&
        (currentMonth
          ? !el.classList.contains('ea-date-picker__day--outside')
          : el.classList.contains('ea-date-picker__day--outside')),
    )!;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    document.querySelectorAll('.ea-popover__surface').forEach(node => node.remove());
  });

  describe('Rendering', () => {
    it('renders an editable field and a calendar button', () => {
      expect(getInput()).toBeTruthy();
      expect(getCalendarButton()).toBeTruthy();
    });

    it('starts empty, with no placeholder of its own', () => {
      expect(getInput().value).toBe('');
      expect(getInput().placeholder).toBe('');
    });

    it('shows the placeholder when one is given', () => {
      fixture.componentRef.setInput('placeholder', 'mm/dd/yy');
      fixture.detectChanges();

      expect(getInput().placeholder).toBe('mm/dd/yy');
    });

    it('renders a label when provided', () => {
      fixture.componentRef.setInput('label', 'Birth date');
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('.ea-field-label');
      expect(label.textContent.trim()).toBe('Birth date');
    });

    it('does not show the popover by default', () => {
      expect(getPopover()).toBeNull();
    });

    it('applies the default size class', () => {
      const field = fixture.nativeElement.querySelector('.ea-date-picker-field');
      expect(field.classList).toContain('ea-date-picker-field--md');
    });
  });

  describe('Opening and closing', () => {
    it('opens the popover on calendar button click', () => {
      getCalendarButton().click();
      fixture.detectChanges();

      expect(getPopover()).toBeTruthy();
    });

    it('renders a 6-week grid when open', () => {
      getCalendarButton().click();
      fixture.detectChanges();

      expect(getDayCells()).toHaveLength(42);
    });

    it('closes the popover on second calendar button click', () => {
      getCalendarButton().click();
      fixture.detectChanges();

      getCalendarButton().click();
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
    });

    it('sets aria-expanded when open', () => {
      getCalendarButton().click();
      fixture.detectChanges();

      expect(getCalendarButton().getAttribute('aria-expanded')).toBe('true');
    });

    it('renders weekday headers when open', () => {
      getCalendarButton().click();
      fixture.detectChanges();

      const weekdays = document.body.querySelectorAll('.ea-date-picker__weekday');
      expect(weekdays).toHaveLength(7);
    });
  });

  describe('Selection', () => {
    it('selects a day on click', () => {
      getCalendarButton().click();
      fixture.detectChanges();
      component.viewYear.set(2026);
      component.viewMonth.set(3);
      fixture.detectChanges();

      findDayCell(15).click();
      fixture.detectChanges();

      const val = component.value();
      expect(val).not.toBeNull();
      expect(val!.getFullYear()).toBe(2026);
      expect(val!.getMonth()).toBe(3);
      expect(val!.getDate()).toBe(15);
    });

    it('emits changed on selection', () => {
      const spy = vi.fn();
      component.changed.subscribe(spy);
      getCalendarButton().click();
      fixture.detectChanges();
      component.viewYear.set(2026);
      component.viewMonth.set(3);
      fixture.detectChanges();

      findDayCell(10).click();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0].getDate()).toBe(10);
    });

    it('closes the popover after selection', () => {
      getCalendarButton().click();
      fixture.detectChanges();

      findDayCell(15).click();
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
    });

    it('displays the formatted value after selection', () => {
      component.viewYear.set(2026);
      component.viewMonth.set(3);
      getCalendarButton().click();
      fixture.detectChanges();

      findDayCell(15).click();
      fixture.detectChanges();

      expect(getInput().value).not.toBe('');
    });

    it('clears value via the clear button', () => {
      component.writeValue(new Date(2026, 3, 15));
      fixture.detectChanges();

      const clearBtn = fixture.nativeElement.querySelector(
        '.ea-date-picker__clear',
      ) as HTMLButtonElement;
      clearBtn.click();
      fixture.detectChanges();

      expect(component.value()).toBeNull();
    });

    it('notifies the bound control and emits null when cleared', () => {
      const onChange = vi.fn<(value: Date | null) => void>();
      const changed = vi.fn<(value: Date | null) => void>();
      component.registerOnChange(onChange);
      component.changed.subscribe(changed);
      component.writeValue(new Date(2026, 3, 15));
      fixture.detectChanges();

      const clearBtn: HTMLButtonElement = fixture.nativeElement.querySelector(
        '.ea-date-picker__clear',
      );
      clearBtn.click();
      fixture.detectChanges();

      expect(onChange).toHaveBeenCalledWith(null);
      expect(changed).toHaveBeenCalledWith(null);
    });

    it('opens on the selected month and marks that day alone as selected', () => {
      const today = new Date();
      const target = new Date(today.getFullYear(), today.getMonth() + 2, 15);
      component.writeValue(target);
      fixture.detectChanges();

      getCalendarButton().click();
      fixture.detectChanges();

      const selected = Array.from(
        document.body.querySelectorAll('.ea-date-picker__cell[aria-selected="true"]'),
      );
      expect(component.viewMonth()).toBe(target.getMonth());
      expect(selected).toHaveLength(1);
      expect(selected[0].textContent!.trim()).toBe('15');
    });

    it('closes and marks the control touched on an outside click', () => {
      const onTouched = vi.fn<() => void>();
      component.registerOnTouched(onTouched);
      getCalendarButton().click();
      fixture.detectChanges();

      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
      expect(onTouched).toHaveBeenCalled();
    });
  });

  describe('Navigation', () => {
    it('navigates to the previous month', () => {
      getCalendarButton().click();
      fixture.detectChanges();
      component.viewYear.set(2026);
      component.viewMonth.set(3);

      component.goToPrevMonth();

      expect(component.viewMonth()).toBe(2);
      expect(component.viewYear()).toBe(2026);
    });

    it('wraps to previous year at January', () => {
      component.viewYear.set(2026);
      component.viewMonth.set(0);

      component.goToPrevMonth();

      expect(component.viewMonth()).toBe(11);
      expect(component.viewYear()).toBe(2025);
    });

    it('wraps to next year at December', () => {
      component.viewYear.set(2026);
      component.viewMonth.set(11);

      component.goToNextMonth();

      expect(component.viewMonth()).toBe(0);
      expect(component.viewYear()).toBe(2027);
    });

    it('navigates to today', () => {
      component.viewYear.set(2020);
      component.viewMonth.set(0);

      component.goToToday();

      const now = new Date();
      expect(component.viewYear()).toBe(now.getFullYear());
      expect(component.viewMonth()).toBe(now.getMonth());
    });
  });

  describe('Min and max dates', () => {
    it('marks days before minDate as disabled', () => {
      fixture.componentRef.setInput('minDate', new Date(2026, 3, 10));
      getCalendarButton().click();
      fixture.detectChanges();
      component.viewYear.set(2026);
      component.viewMonth.set(3);
      fixture.detectChanges();

      expect(findDayCell(5).getAttribute('aria-disabled')).toBe('true');
      expect(findDayCell(15).getAttribute('aria-disabled')).toBeNull();
    });

    it('marks days after maxDate as disabled', () => {
      fixture.componentRef.setInput('maxDate', new Date(2026, 3, 10));
      getCalendarButton().click();
      fixture.detectChanges();
      component.viewYear.set(2026);
      component.viewMonth.set(3);
      fixture.detectChanges();

      expect(findDayCell(5).getAttribute('aria-disabled')).toBeNull();
      expect(findDayCell(20).getAttribute('aria-disabled')).toBe('true');
    });

    it('ignores a click on an out-of-range day and stays open', () => {
      const changed = vi.fn<(value: Date | null) => void>();
      component.changed.subscribe(changed);
      getCalendarButton().click();
      fixture.detectChanges();
      fixture.componentRef.setInput(
        'minDate',
        new Date(component.viewYear(), component.viewMonth(), 10),
      );
      fixture.detectChanges();

      findDayCell(5).click();
      fixture.detectChanges();

      expect(component.value()).toBeNull();
      expect(changed).not.toHaveBeenCalled();
      expect(getPopover()).not.toBeNull();
      expect(findDayCell(5).classList).toContain('ea-date-picker__day--focused');
    });
  });

  describe('Disabled state', () => {
    it('disables the trigger when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(getInput().disabled).toBe(true);
    });

    it('does not open when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      getCalendarButton().click();
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
    });
  });

  describe('Readonly state', () => {
    it('does not open the calendar', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      getCalendarButton().click();
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
    });

    it('stays closed when opened programmatically', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      component.open();
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
    });

    it('hides the clear button while still showing the value', () => {
      component.writeValue(new Date(2026, 3, 15));
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.ea-date-picker__clear')).toBeNull();
      expect(getInput().value).not.toBe('');
    });

    it('makes the field read-only', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      expect(getInput().readOnly).toBe(true);
    });
  });

  describe('Typed entry', () => {
    const target = new Date(2026, 3, 15);

    function formatted(date: Date): string {
      return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(date);
    }

    beforeEach(() => {
      fixture.componentRef.setInput('locale', 'en-GB');
      fixture.detectChanges();
    });

    it('adopts an ISO entry and rewrites it in the configured format', () => {
      type('2026-04-15');

      commit();

      expect(component.value()).toEqual(target);
      expect(getInput().value).toBe(formatted(target));
    });

    it("reads an all-numeric entry in the locale's field order", () => {
      type('15/04/26');

      commit();

      expect(component.value()).toEqual(target);
    });

    it('reads an entry that names its month', () => {
      type('15 April 2026');

      commit();

      expect(component.value()).toEqual(target);
    });

    it('notifies the bound control and emits changed', () => {
      const onChange = vi.fn<(value: Date | null) => void>();
      const changed = vi.fn<(value: Date | null) => void>();
      component.registerOnChange(onChange);
      component.changed.subscribe(changed);
      type('15 April 2026');

      commit();

      expect(onChange).toHaveBeenCalledWith(target);
      expect(changed).toHaveBeenCalledWith(target);
    });

    it('clears the value when the entry is emptied', () => {
      component.writeValue(target);
      fixture.detectChanges();
      type('');

      commit();

      expect(component.value()).toBeNull();
    });

    it('restores the current value when the entry names no date', () => {
      component.writeValue(target);
      fixture.detectChanges();
      type('whenever');

      commit();

      expect(component.value()).toEqual(target);
      expect(getInput().value).toBe(formatted(target));
    });

    it('rejects an entry outside the min and max bounds', () => {
      fixture.componentRef.setInput('minDate', new Date(2026, 3, 10));
      fixture.componentRef.setInput('maxDate', new Date(2026, 3, 20));
      fixture.detectChanges();
      type('2026-05-01');

      commit();

      expect(component.value()).toBeNull();
      expect(getInput().value).toBe('');
    });

    it('commits on Enter without opening the calendar', () => {
      type('2026-04-15');

      getInput().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();

      expect(component.value()).toEqual(target);
      expect(getPopover()).toBeNull();
    });

    it('abandons the entry on Escape', () => {
      component.writeValue(target);
      fixture.detectChanges();
      type('nonsense');

      getInput().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(component.value()).toEqual(target);
      expect(getInput().value).toBe(formatted(target));
    });
  });

  describe('Formatting', () => {
    it('maps each format to a distinct Intl date style', () => {
      const date = new Date(2024, 5, 20);
      fixture.componentRef.setInput('locale', 'en-US');
      component.writeValue(date);

      const rendered = (['short', 'medium', 'long'] as const).map(format => {
        fixture.componentRef.setInput('format', format);
        fixture.detectChanges();
        return getInput().value.trim();
      });

      const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
      expect(new Set(rendered).size).toBe(3);
      expect(rendered[2]).toContain(monthName);
      expect(rendered[0]).not.toContain(monthName);
    });
  });

  describe('Keyboard navigation', () => {
    it('does not open on Enter, which commits the entry instead', () => {
      getInput().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
    });

    it('opens on ArrowDown key', () => {
      getInput().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(getPopover()).toBeTruthy();
    });

    it('closes on Escape key', () => {
      getCalendarButton().click();
      fixture.detectChanges();

      const popover = getPopover()!;
      popover.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
    });
  });

  describe('Error and hint', () => {
    it('shows error message when set', () => {
      fixture.componentRef.setInput('errorMsg', 'Invalid date');
      fixture.detectChanges();

      const msg = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--error',
      );
      expect(msg.textContent).toContain('Invalid date');
    });

    it('shows hint when set and no error', () => {
      fixture.componentRef.setInput('hint', 'Pick a future date');
      fixture.detectChanges();

      const msg = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--hint',
      );
      expect(msg.textContent).toContain('Pick a future date');
    });

    it('hides hint when error is set', () => {
      fixture.componentRef.setInput('hint', 'Pick a future date');
      fixture.componentRef.setInput('errorMsg', 'Invalid date');
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelector('.ea-field-messages__message--hint'),
      ).toBeNull();
    });
  });

  describe('CVA', () => {
    it('writes a Date via writeValue', () => {
      component.writeValue(new Date(2026, 5, 20));
      fixture.detectChanges();

      expect(component.value()!.getDate()).toBe(20);
      expect(component.viewMonth()).toBe(5);
      expect(component.viewYear()).toBe(2026);
    });

    it('writes an ISO string via writeValue', () => {
      component.writeValue('2026-06-20');

      expect(component.value()).not.toBeNull();
      expect(component.value()!.getFullYear()).toBe(2026);
    });

    it('ignores an unparseable string from the form', () => {
      component.writeValue('not a date');
      fixture.detectChanges();

      expect(component.value()).toBeNull();
      expect(getInput().value).toBe('');
    });

    it('clears rather than rendering an invalid Date from the form', () => {
      component.writeValue(new Date(2026, 3, 15));

      component.writeValue(new Date('nonsense'));
      fixture.detectChanges();

      expect(component.value()).toBeNull();
      expect(getInput().value).toBe('');
    });

    it('writes null via writeValue', () => {
      component.writeValue(new Date(2026, 5, 20));
      component.writeValue(null);

      expect(component.value()).toBeNull();
    });

    it('calls onChange on selection', () => {
      const onChange = vi.fn<(value: Date | null) => void>();
      component.registerOnChange(onChange);
      component.viewYear.set(2026);
      component.viewMonth.set(3);
      getCalendarButton().click();
      fixture.detectChanges();

      findDayCell(15).click();

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]!.getDate()).toBe(15);
    });

    it('disables via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      expect(getInput().disabled).toBe(true);
    });
  });
});

import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerComponent } from './date-picker.component';

/**
 * Calendar grid construction and roving-focus keyboard navigation. Everything
 * here is derived from the month the calendar actually opens on, so no
 * expectation is pinned to a fixed date.
 */
describe('DatePickerComponent calendar navigation', () => {
  let fixture: ComponentFixture<DatePickerComponent>;
  let component: DatePickerComponent;

  function trigger(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.ea-date-picker__trigger');
  }

  function surface(): HTMLElement | null {
    const el = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    return el && el.style.display !== 'none' ? el : null;
  }

  function popover(): HTMLElement {
    return surface()!.querySelector<HTMLElement>('.ea-date-picker__popover')!;
  }

  function dayCells(): HTMLButtonElement[] {
    return Array.from(
      surface()?.querySelectorAll<HTMLButtonElement>('.ea-date-picker__day') ?? [],
    );
  }

  function isOutside(cell: HTMLButtonElement): boolean {
    return cell.classList.contains('ea-date-picker__day--outside');
  }

  function inMonthCell(day: number): HTMLButtonElement {
    return dayCells().find(
      cell => cell.textContent!.trim() === String(day) && !isOutside(cell),
    )!;
  }

  function focusedCell(): HTMLButtonElement {
    return surface()!.querySelector<HTMLButtonElement>('.ea-date-picker__day--focused')!;
  }

  /** Position of a day cell within its week row. */
  function columnOf(cell: HTMLButtonElement): number {
    const row = cell.closest('.ea-date-picker__week')!;
    return Array.from(row.querySelectorAll('.ea-date-picker__day')).indexOf(cell);
  }

  function navButton(ariaLabel: string): HTMLButtonElement {
    return surface()!.querySelector<HTMLButtonElement>(`[aria-label="${ariaLabel}"]`)!;
  }

  function open(): void {
    trigger().click();
    fixture.detectChanges();
  }

  function focusDay(day: number): void {
    component.focusedDate.set(new Date(component.viewYear(), component.viewMonth(), day));
    fixture.detectChanges();
  }

  function press(key: string, init: KeyboardEventInit = {}): void {
    popover().dispatchEvent(
      new KeyboardEvent('keydown', { key, bubbles: true, ...init }),
    );
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
    document.body.appendChild(fixture.nativeElement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.nativeElement.remove();
    fixture.destroy();
    document.querySelectorAll('.ea-popover__surface').forEach(node => node.remove());
  });

  describe('Grid contents', () => {
    it('renders every day of the view month once, in order', () => {
      open();

      const rendered = dayCells()
        .filter(cell => !isOutside(cell))
        .map(cell => cell.textContent!.trim());

      const daysInMonth = new Date(
        component.viewYear(),
        component.viewMonth() + 1,
        0,
      ).getDate();
      expect(rendered).toEqual(Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`));
    });

    it('flags the trailing days that spill into the next month', () => {
      open();
      const cells = dayCells();
      const inMonth = cells.filter(cell => !isOutside(cell));

      const firstTrailing = cells[cells.indexOf(inMonth[inMonth.length - 1]) + 1];

      expect(firstTrailing.textContent!.trim()).toBe('1');
      expect(isOutside(firstTrailing)).toBe(true);
    });

    it('places the first of the month in the column for its weekday', () => {
      open();
      const firstOfMonth = new Date(component.viewYear(), component.viewMonth(), 1);

      const column = columnOf(inMonthCell(1));

      expect(column).toBe((firstOfMonth.getDay() + 6) % 7);
    });

    it('shifts the grid by a day when the week starts on Sunday', () => {
      fixture.componentRef.setInput('weekStartsOn', 0);
      open();
      const firstOfMonth = new Date(component.viewYear(), component.viewMonth(), 1);

      const column = columnOf(inMonthCell(1));

      expect(column).toBe(firstOfMonth.getDay());
    });

    it('aligns the weekday headers with the columns for an explicit locale', () => {
      fixture.componentRef.setInput('locale', 'fr-FR');
      open();
      const formatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'short' });

      const headers = Array.from(
        surface()!.querySelectorAll('.ea-date-picker__weekday'),
      ).map(el => el.textContent!.trim());

      expect(headers).toEqual(
        component.weeks()[0].map(day => formatter.format(day.date)),
      );
    });
  });

  describe('Header navigation', () => {
    it('steps the view one month at a time', () => {
      open();
      component.viewMonth.set(5);
      fixture.detectChanges();

      navButton('Next month').click();
      fixture.detectChanges();

      expect(component.viewMonth()).toBe(6);

      navButton('Previous month').click();
      fixture.detectChanges();

      expect(component.viewMonth()).toBe(5);
    });

    it('rolls the view over the year boundary', () => {
      open();
      const year = component.viewYear();
      component.viewMonth.set(11);
      fixture.detectChanges();

      navButton('Next month').click();
      fixture.detectChanges();

      expect(component.viewMonth()).toBe(0);
      expect(component.viewYear()).toBe(year + 1);

      navButton('Previous month').click();
      fixture.detectChanges();

      expect(component.viewMonth()).toBe(11);
      expect(component.viewYear()).toBe(year);
    });

    it('steps the view a year at a time without changing the month', () => {
      open();
      const year = component.viewYear();
      const month = component.viewMonth();

      navButton('Previous year').click();
      fixture.detectChanges();

      expect(component.viewYear()).toBe(year - 1);
      expect(component.viewMonth()).toBe(month);

      navButton('Next year').click();
      navButton('Next year').click();
      fixture.detectChanges();

      expect(component.viewYear()).toBe(year + 1);
      expect(component.viewMonth()).toBe(month);
    });

    it('returns the view to the current month from the today button', () => {
      open();
      component.viewYear.set(component.viewYear() - 3);
      component.viewMonth.set(0);
      fixture.detectChanges();

      navButton('Previous year').click();
      surface()!.querySelector<HTMLButtonElement>('.ea-date-picker__today-btn')!.click();
      fixture.detectChanges();

      const today = new Date();
      expect(component.viewYear()).toBe(today.getFullYear());
      expect(component.viewMonth()).toBe(today.getMonth());
      expect(focusedCell().textContent!.trim()).toBe(`${today.getDate()}`);
    });
  });

  describe('Roving focus', () => {
    it('moves focus by a day with the horizontal arrows', () => {
      open();
      focusDay(10);

      press('ArrowRight');

      expect(focusedCell().textContent!.trim()).toBe('11');

      press('ArrowLeft');
      press('ArrowLeft');

      expect(focusedCell().textContent!.trim()).toBe('9');
    });

    it('moves focus by a week with the vertical arrows', () => {
      open();
      focusDay(10);

      press('ArrowDown');

      expect(focusedCell().textContent!.trim()).toBe('17');

      press('ArrowUp');
      press('ArrowUp');

      expect(focusedCell().textContent!.trim()).toBe('3');
    });

    it('keeps exactly one day cell tabbable as focus moves', () => {
      open();
      focusDay(10);

      press('ArrowDown');

      const tabbable = dayCells().filter(cell => cell.tabIndex === 0);
      expect(tabbable).toHaveLength(1);
      expect(tabbable[0]).toBe(focusedCell());
    });

    it('advances the view when arrowing past the end of December', () => {
      open();
      const year = component.viewYear();
      component.viewMonth.set(11);
      fixture.detectChanges();
      focusDay(31);

      press('ArrowRight');

      expect(component.viewMonth()).toBe(0);
      expect(component.viewYear()).toBe(year + 1);
      expect(focusedCell().textContent!.trim()).toBe('1');
      expect(isOutside(focusedCell())).toBe(false);
    });

    it('rewinds the view when arrowing before the start of January', () => {
      open();
      const year = component.viewYear();
      component.viewMonth.set(0);
      fixture.detectChanges();
      focusDay(1);

      press('ArrowLeft');

      expect(component.viewMonth()).toBe(11);
      expect(component.viewYear()).toBe(year - 1);
      expect(focusedCell().textContent!.trim()).toBe('31');
    });

    it('mirrors the horizontal arrows under rtl', () => {
      open();
      popover().style.direction = 'rtl';
      focusDay(10);

      press('ArrowRight');

      expect(focusedCell().textContent!.trim()).toBe('9');

      press('ArrowLeft');
      press('ArrowLeft');

      expect(focusedCell().textContent!.trim()).toBe('11');
    });
  });

  describe('Month and year paging', () => {
    it('pages a month at a time with PageUp and PageDown', () => {
      open();
      const year = component.viewYear();
      component.viewMonth.set(5);
      fixture.detectChanges();
      focusDay(15);

      press('PageDown');

      expect(component.viewMonth()).toBe(6);
      expect(component.focusedDate()!.getDate()).toBe(15);

      press('PageUp');
      press('PageUp');

      expect(component.viewMonth()).toBe(4);
      expect(component.viewYear()).toBe(year);
    });

    it('pages a year at a time when shift is held', () => {
      open();
      const year = component.viewYear();
      component.viewMonth.set(5);
      fixture.detectChanges();
      focusDay(15);

      press('PageDown', { shiftKey: true });

      expect(component.viewYear()).toBe(year + 1);
      expect(component.viewMonth()).toBe(5);

      press('PageUp', { shiftKey: true });

      expect(component.viewYear()).toBe(year);
    });

    it('clamps to the last day when paging into a shorter month', () => {
      open();
      const year = component.viewYear();
      component.viewMonth.set(2);
      fixture.detectChanges();
      focusDay(31);

      press('PageUp');

      const lastOfFebruary = new Date(year, 2, 0).getDate();
      expect(component.viewMonth()).toBe(1);
      expect(component.focusedDate()!.getDate()).toBe(lastOfFebruary);
    });
  });

  describe('Home and End', () => {
    it('moves to the first and last cell of the focused week', () => {
      open();
      focusDay(10);

      press('Home');

      expect(columnOf(focusedCell())).toBe(0);

      press('End');

      expect(columnOf(focusedCell())).toBe(6);
    });

    it('treats Sunday as the end of a Monday-start week', () => {
      open();
      const year = component.viewYear();
      const month = component.viewMonth();
      const firstSunday = 1 + ((7 - new Date(year, month, 1).getDay()) % 7);
      focusDay(firstSunday);

      press('Home');

      expect(component.focusedDate()!.getTime()).toBe(
        new Date(year, month, firstSunday - 6).getTime(),
      );
      expect(columnOf(focusedCell())).toBe(0);
    });

    it('treats Sunday as the start of a Sunday-start week', () => {
      fixture.componentRef.setInput('weekStartsOn', 0);
      open();
      const year = component.viewYear();
      const month = component.viewMonth();
      const firstSunday = 1 + ((7 - new Date(year, month, 1).getDay()) % 7);
      focusDay(firstSunday);

      press('Home');

      expect(component.focusedDate()!.getTime()).toBe(
        new Date(year, month, firstSunday).getTime(),
      );
      expect(columnOf(focusedCell())).toBe(0);
    });
  });

  describe('Keyboard selection', () => {
    it('selects the focused day on Enter and closes', () => {
      const changed = vi.fn<(value: Date | null) => void>();
      component.changed.subscribe(changed);
      open();
      focusDay(12);

      press('Enter');

      expect(component.value()!.getDate()).toBe(12);
      expect(changed).toHaveBeenCalledTimes(1);
      expect(surface()).toBeNull();
    });

    it('refuses to select a day before minDate', () => {
      open();
      fixture.componentRef.setInput(
        'minDate',
        new Date(component.viewYear(), component.viewMonth(), 10),
      );
      focusDay(5);

      press('Enter');

      expect(component.value()).toBeNull();
      expect(component.isOpen()).toBe(true);
    });

    it('refuses to select a day after maxDate', () => {
      open();
      fixture.componentRef.setInput(
        'maxDate',
        new Date(component.viewYear(), component.viewMonth(), 10),
      );
      focusDay(20);

      press('Enter');

      expect(component.value()).toBeNull();
      expect(component.isOpen()).toBe(true);
    });
  });

  describe('Focus management', () => {
    it('leaves keys it does not handle to the browser', () => {
      open();
      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });

      popover().dispatchEvent(event);
      fixture.detectChanges();

      expect(event.defaultPrevented).toBe(false);
      expect(component.isOpen()).toBe(true);
    });

    it('moves focus into the calendar when it opens', async () => {
      open();

      await fixture.whenStable();

      expect(document.activeElement).toBe(focusedCell());
    });

    it('restores focus to the trigger on Escape', () => {
      open();

      press('Escape');

      expect(document.activeElement).toBe(trigger());
    });

    it('restores focus to the trigger after selecting a day', () => {
      open();

      inMonthCell(12).click();
      fixture.detectChanges();

      expect(document.activeElement).toBe(trigger());
    });
  });

  describe('Roving focus follows header navigation', () => {
    function tabbableDay(): HTMLElement | null {
      return document.body.querySelector('.ea-date-picker__day[tabindex="0"]');
    }

    it('keeps a day reachable by keyboard after stepping a month', () => {
      open();

      navButton('Next month').click();
      fixture.detectChanges();

      // Without a roving target the focus-trapped dialog has no reachable day
      expect(tabbableDay()).not.toBeNull();
    });

    it('does not snap the view back on the next arrow key', () => {
      open();
      navButton('Next month').click();
      fixture.detectChanges();
      const monthAfterNav = component.viewMonth();

      press('ArrowRight');

      expect(component.viewMonth()).toBe(monthAfterNav);
    });

    it('clamps the roving day when the new month is shorter', () => {
      open();
      component.viewYear.set(2026);
      component.viewMonth.set(0);
      component.focusedDate.set(new Date(2026, 0, 31));
      fixture.detectChanges();

      navButton('Next month').click();
      fixture.detectChanges();

      expect(component.focusedDate()).toEqual(new Date(2026, 1, 28));
    });
  });

  describe('Multiple pickers', () => {
    it("focuses its own day cell, not the other open picker's", async () => {
      open();
      const second = TestBed.createComponent(DatePickerComponent);
      document.body.appendChild(second.nativeElement);
      second.detectChanges();
      second.nativeElement.querySelector('.ea-date-picker__trigger').click();
      second.detectChanges();
      await second.whenStable();

      // The stale lookup matched the first picker in document order, so it is
      // the second one whose focus went astray
      const secondSurface: HTMLElement = document.getElementById(
        second.componentInstance.dialogId(),
      )!;
      secondSurface.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
      );
      second.detectChanges();
      await second.whenStable();
      second.detectChanges();

      expect(document.activeElement?.closest('.ea-popover__surface')?.id).toBe(
        second.componentInstance.dialogId(),
      );

      second.destroy();
    });
  });
});

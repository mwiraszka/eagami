import { TestBed } from '@angular/core/testing';

import { provideEagamiUi } from '../eagami-ui.provider';
import { _eagamiI18nLocaleOverride } from '../i18n/_storybook-locale-override';
import { EagamiI18nService } from '../i18n/i18n.service';
import { EAGAMI_ALL_LOCALES } from '../i18n/messages';
import { DatePickerComponent } from './date-picker.component';

function openAndRead() {
  const surface = document.body.querySelector('.ea-popover__surface')!;
  return {
    today: (
      surface.querySelector('.ea-date-picker__today-btn')?.textContent ?? ''
    ).trim(),
    month: (
      surface.querySelector('.ea-date-picker__month-label')?.textContent ?? ''
    ).trim(),
    weekdays: Array.from(surface.querySelectorAll('.ea-date-picker__weekday')).map(e =>
      (e.textContent ?? '').trim(),
    ),
  };
}

/**
 * The calendar's weekday and month names come from the locale bundle, not the
 * runtime's `Intl`, so they localize even on browsers whose bundled ICU lacks a
 * given locale's date data (observed with Icelandic). These specs assert the
 * bundle-sourced path directly, which is the exact path the component takes for
 * any registered locale regardless of `Intl` coverage.
 */
describe('DatePicker localized calendar names', () => {
  afterEach(() => {
    _eagamiI18nLocaleOverride.set(null);
    document.querySelectorAll('.ea-popover__surface').forEach(n => n.remove());
  });

  function setup() {
    TestBed.configureTestingModule({
      providers: [provideEagamiUi({ locales: EAGAMI_ALL_LOCALES })],
    });
    const svc = TestBed.inject(EagamiI18nService);
    const fixture = TestBed.createComponent(DatePickerComponent);
    fixture.detectChanges();
    (
      fixture.nativeElement.querySelector('.ea-date-picker__trigger') as HTMLElement
    ).click();
    fixture.detectChanges();
    return { svc, fixture };
  }

  it('renders Icelandic weekdays, month, and today together', () => {
    const { svc, fixture } = setup();

    svc.setLocale('is');
    fixture.detectChanges();

    const r = openAndRead();
    // The calendar opens on the current month, so the expected name has to come
    // from the bundle by index rather than being pinned to one month
    const expectedMonth = svc
      .messages()
      .datePicker.months[new Date().getMonth()].toLowerCase();

    expect(r.weekdays).toEqual(['mán.', 'þri.', 'mið.', 'fim.', 'fös.', 'lau.', 'sun.']);
    expect(r.month.toLowerCase()).toContain(expectedMonth);
    expect(r.today).toBe('Í dag');
  });

  it('does not fall back to English for weekday names when Intl lacks the locale', () => {
    const { svc, fixture } = setup();

    svc.setLocale('is');
    fixture.detectChanges();

    // No English weekday abbreviation should appear in any position
    const english = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const rendered = openAndRead().weekdays;

    expect(rendered.some(w => english.includes(w))).toBe(false);
  });

  it('switches calendar names live when the locale changes after render', () => {
    const { svc, fixture } = setup();

    svc.setLocale('pl');
    fixture.detectChanges();
    expect(openAndRead().weekdays[0]).toBe('pon.');

    svc.setLocale('is');
    fixture.detectChanges();
    expect(openAndRead().weekdays[0]).toBe('mán.');
  });

  it('keeps the locale month/year pattern via Intl where the runtime has it', () => {
    const { svc, fixture } = setup();

    svc.setLocale('zh-CN');
    fixture.detectChanges();

    // Chinese renders year-first with a 年 marker; a plain "<month> <year>" join
    // would not, so this guards against the bundle path overriding Intl.
    expect(openAndRead().month).toContain('年');
  });
});

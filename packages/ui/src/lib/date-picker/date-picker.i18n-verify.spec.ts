import { TestBed } from '@angular/core/testing';

import { _eagamiI18nLocaleOverride } from '../i18n/_storybook-locale-override';
import { provideEagamiUi } from '../i18n/i18n.provider';
import { EAGAMI_ALL_LOCALES } from '../i18n/messages';
import { DatePickerComponent } from './date-picker.component';

function openAndRead(): { weekdays: string[]; month: string; today: string } {
  const fixture = TestBed.createComponent(DatePickerComponent);
  fixture.detectChanges();
  (
    fixture.nativeElement.querySelector('.ea-date-picker__trigger') as HTMLElement
  ).click();
  fixture.detectChanges();
  const surface = document.body.querySelector('.ea-popover__surface')!;
  const weekdays = Array.from(surface.querySelectorAll('.ea-date-picker__weekday')).map(
    e => (e.textContent ?? '').trim(),
  );
  const month = (
    surface.querySelector('.ea-date-picker__month-label')?.textContent ?? ''
  ).trim();
  const today = (
    surface.querySelector('.ea-date-picker__today-btn')?.textContent ?? ''
  ).trim();
  return { weekdays, month, today };
}

describe('DatePicker i18n ground truth', () => {
  afterEach(() => {
    _eagamiI18nLocaleOverride.set(null);
    document.querySelectorAll('.ea-popover__surface').forEach(n => n.remove());
  });

  it('config-locale path (provideEagamiUi locale is)', () => {
    TestBed.configureTestingModule({
      imports: [DatePickerComponent],
      providers: [provideEagamiUi({ locale: 'is', locales: EAGAMI_ALL_LOCALES })],
    });
    const r = openAndRead();
    expect(r.today).toBe('Í dag');
    expect(r.weekdays.join(' ').toLowerCase()).toContain('mán');
  });

  it('storybook override path (override is)', () => {
    _eagamiI18nLocaleOverride.set('is');
    TestBed.configureTestingModule({
      imports: [DatePickerComponent],
      providers: [provideEagamiUi({ locales: EAGAMI_ALL_LOCALES })],
    });
    const r = openAndRead();
    expect(r.today).toBe('Í dag');
    expect(r.weekdays.join(' ').toLowerCase()).toContain('mán');
  });
});

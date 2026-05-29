import { TestBed } from '@angular/core/testing';

import { provideEagamiUi } from './i18n.provider';
import { EagamiI18nService } from './i18n.service';
import { EAGAMI_LOCALES, type EagamiLocale } from './i18n.types';

describe('EagamiI18nService', () => {
  function createService(
    config?: Parameters<typeof provideEagamiUi>[0],
  ): EagamiI18nService {
    TestBed.configureTestingModule({
      providers: config ? [provideEagamiUi(config)] : [],
    });
    return TestBed.inject(EagamiI18nService);
  }

  it('defaults to English when no config is provided', () => {
    const service = createService();

    expect(service.locale()).toBe('en');
    expect(service.messages().dialog.close).toBe('Close dialog');
  });

  it('uses the configured locale from provideEagamiUi', () => {
    const service = createService({ locale: 'fr-FR' });

    expect(service.locale()).toBe('fr-FR');
    expect(service.messages().dialog.close).toBe('Fermer la boîte de dialogue');
  });

  it('switches locale reactively via setLocale', () => {
    const service = createService();

    service.setLocale('es-ES');

    expect(service.locale()).toBe('es-ES');
    expect(service.messages().spinner.label).toBe('Cargando');
  });

  it('resolves parameterized messages per locale', () => {
    const service = createService({ locale: 'pl' });

    expect(service.messages().paginator.range(1, 10, 120)).toBe('1–10 z 120');
    expect(service.messages().codeInput.digitLabel(2, 6)).toBe('Cyfra 2 z 6');
  });

  it('falls back to English for an unsupported locale', () => {
    const service = createService();

    service.setLocale('xx-XX' as never);

    expect(service.locale()).toBe('en');
    expect(service.messages().alert.dismiss).toBe('Dismiss');
  });

  it('applies per-string overrides over the active locale', () => {
    const service = createService({
      locale: 'el',
      messages: { alert: { dismiss: 'Κλείσιμο' } },
    });

    expect(service.messages().alert.dismiss).toBe('Κλείσιμο');
    // untouched keys still come from the active locale
    expect(service.messages().spinner.label).toBe('Φόρτωση');
  });

  it('keeps every supported locale dictionary complete', () => {
    const service = createService();
    const reference = service.messages();

    for (const locale of ['fr-FR', 'el', 'pl', 'es-ES'] as const) {
      service.setLocale(locale);
      const messages = service.messages();
      for (const group of Object.keys(reference) as (keyof typeof reference)[]) {
        expect(Object.keys(messages[group])).toEqual(Object.keys(reference[group]));
      }
    }
  });

  it.each(EAGAMI_LOCALES)(
    'resolves every parameterized message in %s without throwing',
    (locale: EagamiLocale) => {
      const service = createService({ locale });
      const messages = service.messages();

      const range = messages.paginator.range(1, 10, 100);
      const groupLabel = messages.codeInput.groupLabel(6);
      const digitLabel = messages.codeInput.digitLabel(2, 6);

      expect(typeof range).toBe('string');
      expect(range.length).toBeGreaterThan(0);
      expect(typeof groupLabel).toBe('string');
      expect(groupLabel.length).toBeGreaterThan(0);
      expect(typeof digitLabel).toBe('string');
      expect(digitLabel.length).toBeGreaterThan(0);
    },
  );
});

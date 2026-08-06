import { TestBed } from '@angular/core/testing';

import { provideEagamiUi } from '../eagami-ui.provider';
import { _eagamiI18nLocaleOverride } from './_storybook-locale-override';
import { EagamiI18nService } from './i18n.service';
import {
  EAGAMI_LOCALES,
  EAGAMI_LOCALE_META,
  type EagamiLocale,
  type EagamiLocaleBundle,
} from './i18n.types';
import { EAGAMI_ALL_LOCALES, de, frFR } from './messages';

function deferredBundle(): {
  promise: Promise<EagamiLocaleBundle>;
  resolve: (bundle: EagamiLocaleBundle) => void;
} {
  let resolve!: (bundle: EagamiLocaleBundle) => void;
  const promise = new Promise<EagamiLocaleBundle>(res => {
    resolve = res;
  });
  return { promise, resolve };
}

describe('EagamiI18nService', () => {
  function createService(
    config?: Parameters<typeof provideEagamiUi>[0],
  ): EagamiI18nService {
    TestBed.configureTestingModule({
      providers: config ? [provideEagamiUi(config)] : [],
    });
    return TestBed.inject(EagamiI18nService);
  }

  afterEach(() => _eagamiI18nLocaleOverride.set(null));

  it('defaults to English when no config is provided', () => {
    const service = createService();

    expect(service.locale()).toBe('en');
    expect(service.messages().dialog.close).toBe('Close dialog');
  });

  it('uses a configured locale once it is registered', () => {
    const service = createService({ locale: 'fr-FR', locales: [frFR] });

    expect(service.locale()).toBe('fr-FR');
    expect(service.messages().dialog.close).toBe('Fermer la boîte de dialogue');
  });

  it('falls back to English when the configured locale is not registered', () => {
    const service = createService({ locale: 'fr-FR' });

    expect(service.locale()).toBe('en');
    expect(service.messages().dialog.close).toBe('Close dialog');
  });

  it('bundles only the registered locales, falling back for the rest', () => {
    const service = createService({ locale: 'fr-FR', locales: [frFR] });

    service.setLocale('de');

    expect(service.locale()).toBe('en');
  });

  it('reacts live to the Storybook locale override signal', () => {
    const service = createService({ locales: EAGAMI_ALL_LOCALES });
    expect(service.messages().paginator.rowsPerPage).toBe('Rows per page:');

    _eagamiI18nLocaleOverride.set('is');
    TestBed.tick();

    expect(service.locale()).toBe('is');
    expect(service.messages().paginator.rowsPerPage).toBe('Raðir á síðu:');
  });

  it('switches locale reactively via setLocale', () => {
    const service = createService({ locales: EAGAMI_ALL_LOCALES });

    service.setLocale('es-ES');

    expect(service.locale()).toBe('es-ES');
    expect(service.messages().spinner.label).toBe('Cargando');
  });

  it('resolves parameterized messages per locale', () => {
    const service = createService({ locale: 'pl', locales: EAGAMI_ALL_LOCALES });

    expect(service.messages().paginator.range('1', '10', '120')).toBe('1–10 z 120');
    expect(service.messages().codeInput.digitLabel(2, 6)).toBe('Cyfra 2 z 6');
  });

  it('falls back to English for an unsupported locale', () => {
    const service = createService();

    service.setLocale('xx-XX' as never);

    expect(service.locale()).toBe('en');
    expect(service.messages().alert.dismiss).toBe('Dismiss');
  });

  it('loads a locale on demand through its loader', async () => {
    const loader = vi.fn(() => Promise.resolve(frFR));
    const service = createService({ localeLoaders: { 'fr-FR': loader } });

    await service.setLocale('fr-FR');

    expect(loader).toHaveBeenCalledTimes(1);
    expect(service.locale()).toBe('fr-FR');
    expect(service.messages().dialog.close).toBe('Fermer la boîte de dialogue');
  });

  it('keeps the active locale until a lazy load resolves', async () => {
    const load = deferredBundle();
    const service = createService({ localeLoaders: { 'fr-FR': () => load.promise } });

    const switched = service.setLocale('fr-FR');

    expect(service.locale()).toBe('en');

    load.resolve(frFR);
    await switched;

    expect(service.locale()).toBe('fr-FR');
  });

  it('lets the newest setLocale supersede an in-flight lazy switch', async () => {
    const load = deferredBundle();
    const service = createService({
      locales: [de],
      localeLoaders: { 'fr-FR': () => load.promise },
    });

    const superseded = service.setLocale('fr-FR');
    await service.setLocale('de');
    load.resolve(frFR);
    await superseded;

    expect(service.locale()).toBe('de');
  });

  it('preloads via loadLocale without switching, then switches instantly', async () => {
    const loader = vi.fn(() => Promise.resolve(frFR));
    const service = createService({ localeLoaders: { 'fr-FR': loader } });

    await service.loadLocale('fr-FR');

    expect(service.locale()).toBe('en');

    await service.setLocale('fr-FR');

    expect(loader).toHaveBeenCalledTimes(1);
    expect(service.locale()).toBe('fr-FR');
  });

  it('shares one in-flight load between concurrent requests', async () => {
    const load = deferredBundle();
    const loader = vi.fn(() => load.promise);
    const service = createService({ localeLoaders: { 'fr-FR': loader } });

    const preload = service.loadLocale('fr-FR');
    const switched = service.setLocale('fr-FR');
    load.resolve(frFR);
    await Promise.all([preload, switched]);

    expect(loader).toHaveBeenCalledTimes(1);
    expect(service.locale()).toBe('fr-FR');
  });

  it('falls back to English when a locale loader fails', async () => {
    const service = createService({
      locale: 'de',
      locales: [de],
      localeLoaders: { 'fr-FR': () => Promise.reject(new Error('offline')) },
    });

    await service.setLocale('fr-FR');

    expect(service.locale()).toBe('en');
  });

  it('activates a lazily loaded initial locale once it arrives', async () => {
    const service = createService({
      locale: 'fr-FR',
      localeLoaders: { 'fr-FR': () => Promise.resolve(frFR) },
    });

    expect(service.locale()).toBe('en');

    await vi.waitFor(() => expect(service.locale()).toBe('fr-FR'));
  });

  it('applies per-string overrides over the active locale', () => {
    const service = createService({
      locale: 'el',
      locales: EAGAMI_ALL_LOCALES,
      messages: { alert: { dismiss: 'Κλείσιμο' } },
    });

    expect(service.messages().alert.dismiss).toBe('Κλείσιμο');
    // untouched keys still come from the active locale
    expect(service.messages().spinner.label).toBe('Φόρτωση');
  });

  it('keeps every supported locale dictionary complete', () => {
    const service = createService({ locales: EAGAMI_ALL_LOCALES });
    const reference = service.messages();

    for (const locale of EAGAMI_LOCALES) {
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
      const service = createService({ locale, locales: EAGAMI_ALL_LOCALES });
      const m = service.messages();

      const results = [
        m.codeInput.groupLabel(6),
        m.codeInput.digitLabel(2, 6),
        m.fileUploader.removeFile('report.pdf'),
        m.fileUploader.constraintsAccept('image/*'),
        m.fileUploader.constraintsMaxSize('5 MB'),
        m.fileUploader.constraintsMaxFiles(3),
        m.fileUploader.rejectionType('report.pdf'),
        m.fileUploader.rejectionSize('report.pdf', '5 MB'),
        m.fileUploader.rejectionCount(3),
        m.multiSelect.removeOption('Apple'),
        m.multiSelect.selectedCount(3),
        m.paginator.range('1', '10', '100'),
        m.rating.valueLabel(3, 5),
      ];

      for (const result of results) {
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      }
    },
  );
});

describe('EAGAMI_LOCALE_META', () => {
  it('covers exactly the registered locales', () => {
    const metaLocales = [...EAGAMI_LOCALE_META.map(m => m.locale)].sort();
    const bundledLocales = [...EAGAMI_ALL_LOCALES.map(b => b.locale)].sort();

    expect(metaLocales).toEqual(bundledLocales);
  });

  it('gives every locale a non-empty label and flag', () => {
    for (const meta of EAGAMI_LOCALE_META) {
      expect(meta.label.length).toBeGreaterThan(0);
      expect(meta.flag.length).toBeGreaterThan(0);
    }
  });
});

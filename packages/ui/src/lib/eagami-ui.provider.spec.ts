import { CSP_NONCE } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { provideEagamiUi } from './eagami-ui.provider';

describe('provideEagamiUi palette', () => {
  function getTag(): HTMLStyleElement | null {
    return document.getElementById('eagami-palette') as HTMLStyleElement | null;
  }

  afterEach(() => {
    getTag()?.remove();
  });

  it('forwards the application nonce onto the palette stylesheet', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CSP_NONCE, useValue: 'r4nd0m' },
        provideEagamiUi({ palette: { primary: { base: '#3674a1' } } }),
      ],
    });

    TestBed.inject(CSP_NONCE);

    expect(getTag()?.getAttribute('nonce')).toBe('r4nd0m');
  });

  it('installs the stylesheet unadorned when the app provides no nonce', () => {
    TestBed.configureTestingModule({
      providers: [provideEagamiUi({ palette: { primary: { base: '#3674a1' } } })],
    });

    TestBed.inject(CSP_NONCE, null, { optional: true });

    expect(getTag()?.hasAttribute('nonce')).toBe(false);
  });

  it('installs no stylesheet without a palette', () => {
    TestBed.configureTestingModule({
      providers: [provideEagamiUi({ locale: 'en' })],
    });

    TestBed.inject(CSP_NONCE, null, { optional: true });

    expect(getTag()).toBeNull();
  });
});

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'web-theme';
const THEME_COLOR_LIGHT = '#ffffff';
const THEME_COLOR_DARK = '#030712';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /* Read localStorage during signal init (not in the constructor) so the very
     first render already sees the persisted theme. Reading after construction
     would briefly show the default light-mode icon on the theme-toggle button
     before the constructor flipped it to dark. The matching inline script in
     `index.html` covers the page background; this covers the JS-derived UI. */
  public readonly mode = signal<ThemeMode>(this.readStoredMode());

  constructor() {
    if (this.isBrowser) this.applyTheme();
  }

  public cycle(): void {
    this.set(this.mode() === 'light' ? 'dark' : 'light');
  }

  public set(mode: ThemeMode): void {
    this.mode.set(mode);
    this.applyTheme();
  }

  private readStoredMode(): ThemeMode {
    if (!this.isBrowser) return 'light';
    try {
      return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }

  private applyTheme(): void {
    if (!this.isBrowser) return;

    const m = this.mode();
    localStorage.setItem(STORAGE_KEY, m);

    this.doc.documentElement.setAttribute('data-theme', m);

    const themeColor = m === 'dark' ? THEME_COLOR_DARK : THEME_COLOR_LIGHT;
    this.doc
      .querySelectorAll('meta[name="theme-color"]')
      .forEach(meta => meta.setAttribute('content', themeColor));
  }
}

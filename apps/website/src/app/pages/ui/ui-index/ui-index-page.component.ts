import {
  ButtonComponent,
  CheckIconComponent,
  ColorPickerComponent,
  DropdownComponent,
  type SelectOption,
  SliderComponent,
} from '@eagami/ui';

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';
import { ToastOutletService } from '@app/services/toast-outlet.service';

import { UiShowcaseComponent } from './ui-showcase.component';

const DEFAULT_BRAND = '#3674a1';
const DEFAULT_RADIUS = 6;
const DEFAULT_FONT = 'sans';

interface FontChoice {
  value: string;
  label: string;
  // The `--font-family-sans` value to apply; empty keeps the site default.
  stack: string;
  // Google Fonts family query, fetched on demand the first time it is picked.
  google?: string;
}

// Progresses from the site's own sans through plain system families to loud
// display faces, so the playground shows how far `--font-family-sans` can move.
const FONTS: readonly FontChoice[] = [
  { value: 'sans', label: 'DM Sans', stack: '' },
  { value: 'arial', label: 'Arial', stack: 'Arial, Helvetica, sans-serif' },
  {
    value: 'georgia',
    label: 'Georgia',
    stack: "Georgia, 'Times New Roman', serif",
  },
  {
    value: 'courier',
    label: 'Courier New',
    stack: "'Courier New', Courier, monospace",
  },
  {
    value: 'playfair',
    label: 'Playfair Display',
    stack: "'Playfair Display', Georgia, serif",
    google: 'Playfair+Display:ital,wght@0,400;0,700;1,400',
  },
  {
    value: 'oswald',
    label: 'Oswald',
    stack: "'Oswald', sans-serif",
    google: 'Oswald:wght@300;500;700',
  },
  {
    value: 'lobster',
    label: 'Lobster',
    stack: "'Lobster', cursive",
    google: 'Lobster',
  },
  {
    value: 'caveat',
    label: 'Caveat',
    stack: "'Caveat', cursive",
    google: 'Caveat:wght@400;700',
  },
  {
    value: 'bungee',
    label: 'Bungee',
    stack: "'Bungee', cursive",
    google: 'Bungee',
  },
  {
    value: 'pixel',
    label: 'Press Start 2P',
    stack: "'Press Start 2P', monospace",
    google: 'Press+Start+2P',
  },
];

const FONT_BY_VALUE = new Map(FONTS.map(f => [f.value, f]));
const RADIUS_VARS = ['--radius-sm', '--radius-md', '--radius-lg', '--radius-xl'];

// Derives the radius token scale from a single md value, reproducing the default
// sm/md/lg/xl ratios at the default value.
function radiusVars(r: number): Record<string, string> {
  return {
    '--radius-sm': `${Math.round((r * 2) / 3)}px`,
    '--radius-md': `${r}px`,
    '--radius-lg': `${Math.round((r * 4) / 3)}px`,
    '--radius-xl': `${r * 2}px`,
  };
}

@Component({
  selector: 'web-ui-index-page',
  templateUrl: './ui-index-page.component.html',
  styleUrl: './ui-index-page.component.scss',
  imports: [
    RouterLink,
    CheckIconComponent,
    UiShowcaseComponent,
    ButtonComponent,
    ColorPickerComponent,
    DropdownComponent,
    SliderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIndexPageComponent {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly i18n = inject(WebI18nService);
  private readonly document = inject(DOCUMENT);
  private readonly toastOutlet = inject(ToastOutletService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly fontLoads = new Map<string, Promise<void>>();

  protected readonly messages = this.i18n.messages;

  protected readonly brandColor = signal<string | null>(DEFAULT_BRAND);
  protected readonly radius = signal(DEFAULT_RADIUS);
  // What the dropdown shows; `appliedFont` lags it until the face has loaded so
  // the showcase never flashes a fallback (see selectFont).
  protected readonly fontKey = signal(DEFAULT_FONT);
  private readonly appliedFont = signal(DEFAULT_FONT);

  protected readonly fontOptions = computed<SelectOption[]>(() => {
    const dflt = this.messages().ui.index.theme.fontDefault;
    return FONTS.map(f => ({
      value: f.value,
      label: f.value === DEFAULT_FONT ? `${f.label} ${dflt}` : f.label,
    }));
  });

  // Brand and font overrides scoped to the showcase wrapper. Radius is handled
  // globally instead (see the effect below) so the document-level toast outlet
  // picks it up too.
  protected readonly showcaseStyle = computed<Record<string, string>>(() => {
    const color = this.brandColor() ?? DEFAULT_BRAND;
    const style: Record<string, string> = {
      '--color-brand-default': color,
      '--color-brand-hover': `color-mix(in oklch, ${color}, #000 12%)`,
      '--color-brand-active': `color-mix(in oklch, ${color}, #000 22%)`,
    };
    const stack = FONT_BY_VALUE.get(this.appliedFont())?.stack;
    if (stack) {
      style['--font-family-sans'] = stack;
      // Override mono too so the color picker's hex/RGB inputs follow the font.
      style['--font-family-mono'] = stack;
    }
    return style;
  });

  // Radius is applied to :root (so toasts scale too); pin the controls card back
  // to the default so the very inputs that set the radius don't restyle by it.
  protected readonly controlsStyle = radiusVars(DEFAULT_RADIUS);

  protected resetTheme(): void {
    this.brandColor.set(DEFAULT_BRAND);
    this.radius.set(DEFAULT_RADIUS);
    this.fontKey.set(DEFAULT_FONT);
  }

  constructor() {
    effect(() => {
      const m = this.messages().ui.index;
      this.metaAndTitleService.updateTitle(m.metaTitle);
      this.metaAndTitleService.updateDescription(m.metaDescription);
    });

    // Radius is written to :root, not the showcase wrapper, so the app-level
    // toast outlet (toasts fired from the showcase) scales with it too. The
    // scale reproduces the default sm/md/lg/xl ratios at the default value.
    effect(() => {
      const r = this.radius();
      if (!this.isBrowser) {
        return;
      }
      const root = this.document.documentElement;
      for (const [key, val] of Object.entries(radiusVars(r))) {
        root.style.setProperty(key, val);
      }
    });

    effect(() => this.selectFont(this.fontKey()));

    // Toasts fired from the showcase live in the app-level outlet, which the
    // showcase wrapper's override can't reach, so push the font there too.
    effect(() => {
      const stack = FONT_BY_VALUE.get(this.appliedFont())?.stack;
      this.toastOutlet.setStyle(
        stack
          ? {
              '--font-family-sans': stack,
              '--font-family-mono': stack,
              'font-family': 'var(--font-family-sans)',
            }
          : {},
      );
    });

    inject(DestroyRef).onDestroy(() => {
      this.toastOutlet.setStyle({});
      if (!this.isBrowser) {
        return;
      }
      const root = this.document.documentElement;
      RADIUS_VARS.forEach(v => root.style.removeProperty(v));
    });
  }

  // System/default faces apply at once; display faces apply only once their
  // file has actually downloaded, so the showcase swaps cleanly with no FOUT.
  private selectFont(key: string): void {
    const choice = FONT_BY_VALUE.get(key);
    if (!this.isBrowser || !choice?.google) {
      this.appliedFont.set(key);
      return;
    }
    void this.ensureFontLoaded(choice).then(() => {
      if (this.fontKey() === key) {
        this.appliedFont.set(key);
      }
    });
  }

  private ensureFontLoaded(choice: FontChoice): Promise<void> {
    const existing = this.fontLoads.get(choice.value);
    if (existing) {
      return existing;
    }
    const promise = new Promise<void>(resolve => {
      const link = this.document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${choice.google}&display=swap`;
      link.addEventListener('load', () => {
        // The stylesheet is parsed; wait for the actual face to download before
        // resolving so the caller can swap to it without a fallback flash.
        this.document.fonts
          .load(`1em "${choice.label}"`)
          .then(() => resolve())
          .catch(() => resolve());
      });
      link.addEventListener('error', () => resolve());
      this.document.head.appendChild(link);
    });
    this.fontLoads.set(choice.value, promise);
    return promise;
  }
}

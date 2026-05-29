import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  effect,
  inject,
  signal,
} from '@angular/core';

import { CodeSnippetComponent } from '@app/components/code-snippet/code-snippet.component';
import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

interface FontFamilyToken {
  token: string;
  label: string;
  sample: string;
}

interface NamedToken {
  token: string;
  label: string;
  value: string;
}

@Component({
  selector: 'web-ui-tokens-page',
  templateUrl: './ui-tokens-page.component.html',
  styleUrl: './ui-tokens-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeSnippetComponent],
})
export class UiTokensPageComponent {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;

  protected readonly rootThemeSnippet = `:root {
  --color-primary-600: #2563eb;
  --font-family-sans: 'Inter', sans-serif;
  --radius-md: 0.5rem;
}`;

  protected readonly scopedThemeSnippet = `.my-card {
  --ea-card-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  --ea-button-font-weight: 600;
}`;

  protected readonly paletteBaseSnippet = `bootstrapApplication(AppComponent, {
  providers: [
    provideEagamiUi({
      palette: {
        primary: { base: '#2563eb' },
        secondary: { base: '#f97316' },
      },
    }),
  ],
});`;

  protected readonly paletteOverridesSnippet = `provideEagamiUi({
  palette: {
    primary: {
      base: '#2563eb',
      overrides: { '500': '#3b82f6' },
      roles: { surfaceLight: '700' },
    },
  },
});`;

  protected readonly primaryPalette = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ];

  protected readonly secondaryPalette = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ];

  protected readonly neutralPalette = [
    '0',
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
  ];

  protected readonly statusShades = ['50', '100', '200', '500', '600', '700'];

  protected readonly statusFamilies = ['success', 'warning', 'error', 'info'];

  protected readonly semanticTextTokens = [
    'text-primary',
    'text-secondary',
    'text-tertiary',
    'text-disabled',
    'text-inverse',
    'text-link',
    'text-link-hover',
  ];

  protected readonly semanticBgTokens = [
    'bg-canvas',
    'bg-base',
    'bg-subtle',
    'bg-stripe',
    'bg-muted',
  ];

  protected readonly semanticBorderTokens = [
    'border-subtle',
    'border-default',
    'border-strong',
    'border-focus',
  ];

  protected readonly semanticBrandTokens = [
    'brand-default',
    'brand-hover',
    'brand-active',
    'brand-text',
    'brand-subtle',
    'brand-muted',
  ];

  protected readonly fontFamilies: FontFamilyToken[] = [
    {
      token: '--font-family-sans',
      label: 'Sans',
      sample: 'The quick brown fox jumps over the lazy dog',
    },
    {
      token: '--font-family-brand',
      label: 'Brand (Syne)',
      sample: 'eagami',
    },
    {
      token: '--font-family-mono',
      label: 'Mono',
      sample: 'const greet = "hello, eagami";',
    },
  ];

  protected readonly fontSizes = [
    '2xs',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
  ];

  protected readonly fontWeights: NamedToken[] = [
    { token: '--font-weight-regular', label: 'Regular', value: '400' },
    { token: '--font-weight-medium', label: 'Medium', value: '500' },
    { token: '--font-weight-semibold', label: 'Semibold', value: '600' },
    { token: '--font-weight-bold', label: 'Bold', value: '700' },
    { token: '--font-weight-extrabold', label: 'Extrabold', value: '800' },
  ];

  protected readonly spacingScale = [
    '0',
    '0-5',
    '1',
    '1-5',
    '2',
    '2-5',
    '3',
    '3-5',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '14',
    '16',
    '20',
    '24',
    '32',
  ];

  protected readonly shadowSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  protected readonly reliefVariants = ['bevel', 'bevel-strong', 'well', 'well-strong'];

  protected readonly radii = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];

  protected readonly durations: NamedToken[] = [
    { token: '--duration-instant', label: 'Instant', value: '0ms' },
    { token: '--duration-fast', label: 'Fast', value: '100ms' },
    { token: '--duration-normal', label: 'Normal', value: '200ms' },
    { token: '--duration-slow', label: 'Slow', value: '300ms' },
    { token: '--duration-slower', label: 'Slower', value: '500ms' },
  ];

  protected readonly easings: NamedToken[] = [
    { token: '--ease-linear', label: 'Linear', value: 'linear' },
    { token: '--ease-in', label: 'In', value: 'cubic-bezier(0.4, 0, 1, 1)' },
    { token: '--ease-out', label: 'Out', value: 'cubic-bezier(0, 0, 0.2, 1)' },
    { token: '--ease-in-out', label: 'InOut', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    {
      token: '--ease-spring',
      label: 'Spring',
      value: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  ];

  protected readonly isSimulating = signal(false);

  /* Under `prefers-reduced-motion: reduce` the Simulate button is disabled
     entirely rather than animated against the user's setting. */
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly motionReduced = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.motionReduced.set(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      );
    }

    effect(() => {
      const m = this.messages().ui.tokens;
      this.metaAndTitleService.updateTitle(m.metaTitle);
      this.metaAndTitleService.updateDescription(m.metaDescription);
    });
  }

  protected simulateMotion(): void {
    if (this.motionReduced()) {
      return;
    }
    this.isSimulating.set(false);
    requestAnimationFrame(() => {
      this.isSimulating.set(true);
      setTimeout(() => this.isSimulating.set(false), 1400);
    });
  }
}

import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';

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
})
export class UiTokensPageComponent implements OnInit {
  private readonly metaAndTitleService = inject(MetaAndTitleService);

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

  protected readonly semanticBgTokens = ['bg-base', 'bg-subtle', 'bg-muted'];

  protected readonly semanticBorderTokens = [
    'border-default',
    'border-strong',
    'border-focus',
  ];

  protected readonly semanticBrandTokens = [
    'brand-default',
    'brand-hover',
    'brand-active',
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

  /* Resolved on first browser tick. The motion demos are decorative — under
     `prefers-reduced-motion: reduce` we disable the Simulate button entirely
     rather than animate against the user's setting. */
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly motionReduced = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.motionReduced.set(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      );
    }
  }

  public ngOnInit(): void {
    this.metaAndTitleService.updateTitle('Eagami | UI');
    this.metaAndTitleService.updateDescription(
      'Color, typography, spacing, elevation, shape, and motion tokens that drive @eagami/ui.',
    );
  }

  protected simulateMotion(): void {
    if (this.motionReduced()) return;
    this.isSimulating.set(false);
    requestAnimationFrame(() => {
      this.isSimulating.set(true);
      setTimeout(() => this.isSimulating.set(false), 1400);
    });
  }
}

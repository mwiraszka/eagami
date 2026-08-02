import {
  AlertCircleIconComponent,
  ButtonComponent,
  CheckCircleIconComponent,
  ColorPickerComponent,
  type ContrastViolation,
  DatePickerComponent,
  DividerComponent,
  type EagamiPaletteConfig,
  type ModePalette,
  type PaletteShade,
  ProgressBarComponent,
  StepComponent,
  StepperComponent,
  type StepperOrientation,
  SwitchComponent,
  derivePalette,
  validatePalette,
} from '@eagami/ui';

import { isPlatformBrowser } from '@angular/common';
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

import { CodeSnippetComponent } from '@app/components/code-snippet/code-snippet.component';
import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

// The library's shipped default brand bases, so the builder opens on the
// un-themed library look in its validated, contrast-passing state.
const DEFAULT_PRIMARY = '#3674a1';
const DEFAULT_SECONDARY = '#506086';

// The palette engine derives from an opaque `#RRGGBB` anchor; ignore any other
// value the picker may momentarily emit rather than feed it to `hexToOklch`.
const HEX = /^#[0-9a-fA-F]{6}$/;

const PREVIEW_STYLE_ID = 'web-theme-builder-preview';

// The page and anything it portals to the body (the preview's calendar), but not
// the chrome around it: the docs nav and site header keep the site's own palette
// rather than repainting with whatever colours are being tried out.
const PREVIEW_SCOPE = '.theme-builder, .ea-date-picker__popover, .ea-popover__surface';

const SHADES: readonly PaletteShade[] = [
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

interface ScaleStop {
  shade: PaletteShade;
  value: string;
}

interface ViolationRow {
  token: string;
  mode: ContrastViolation['mode'];
  ratio: string;
  required: number;
}

@Component({
  selector: 'web-ui-theme-builder-page',
  templateUrl: './ui-theme-builder-page.component.html',
  styleUrl: './ui-theme-builder-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AlertCircleIconComponent,
    ButtonComponent,
    CheckCircleIconComponent,
    CodeSnippetComponent,
    ColorPickerComponent,
    DatePickerComponent,
    DividerComponent,
    ProgressBarComponent,
    StepComponent,
    StepperComponent,
    SwitchComponent,
  ],
})
export class UiThemeBuilderPageComponent {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;
  protected readonly shades = SHADES;

  protected readonly primaryBase = signal(DEFAULT_PRIMARY);
  protected readonly secondaryBase = signal(DEFAULT_SECONDARY);

  protected readonly demoSwitch = signal(true);
  protected readonly stepperOrientation = signal<StepperOrientation>('horizontal');

  private readonly config = computed<EagamiPaletteConfig>(() => {
    const config: EagamiPaletteConfig = {};
    if (HEX.test(this.primaryBase())) {
      config.primary = { base: this.primaryBase() };
    }
    if (HEX.test(this.secondaryBase())) {
      config.secondary = { base: this.secondaryBase() };
    }
    return config;
  });

  private readonly palette = computed<ModePalette>(() => derivePalette(this.config()));

  protected readonly violations = computed<ViolationRow[]>(() =>
    validatePalette(this.palette()).map(v => ({
      token: v.token,
      mode: v.mode,
      ratio: v.ratio.toFixed(2),
      required: v.required,
    })),
  );

  protected readonly passesContrast = computed(() => this.violations().length === 0);

  protected readonly primaryScale = computed(() => this.scaleFor('primary'));
  protected readonly secondaryScale = computed(() => this.scaleFor('secondary'));

  protected readonly configSnippet = computed(() => this.buildConfigSnippet());
  protected readonly cssSnippet = computed(() => this.buildCssSnippet());

  constructor() {
    effect(() => {
      const m = this.messages().ui.themeBuilder;
      this.metaAndTitleService.updateTitle(m.metaTitle);
      this.metaAndTitleService.updateDescription(m.metaDescription);
    });

    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      // Both modes are written, so the site theme toggle still drives which one
      // shows. Cleared on leave so the theme doesn't outlive the page.
      effect(() => this.applyPreviewPalette(this.palette()));
      inject(DestroyRef).onDestroy(() =>
        document.getElementById(PREVIEW_STYLE_ID)?.remove(),
      );

      // A row of three steps stops fitting the preview well before the page's
      // own breakpoint, so this one is measured against the preview column
      const query = window.matchMedia('(max-width: 640px)');
      const update = (): void =>
        this.stepperOrientation.set(query.matches ? 'vertical' : 'horizontal');
      update();
      query.addEventListener('change', update);
      inject(DestroyRef).onDestroy(() => query.removeEventListener('change', update));
    }
  }

  protected onPrimaryChange(value: string | null): void {
    if (value) {
      this.primaryBase.set(value);
    }
  }

  protected onSecondaryChange(value: string | null): void {
    if (value) {
      this.secondaryBase.set(value);
    }
  }

  private scaleFor(family: 'primary' | 'secondary'): ScaleStop[] {
    const light = this.palette().light;
    return this.shades.map(shade => ({
      shade,
      value: light[`--color-${family}-${shade}`] ?? 'transparent',
    }));
  }

  private buildConfigSnippet(): string {
    return `bootstrapApplication(AppComponent, {
  providers: [
    provideEagamiUi({
      palette: {
        primary: { base: '${this.primaryBase()}' },
        secondary: { base: '${this.secondaryBase()}' },
      },
    }),
  ],
});`;
  }

  private buildCssSnippet(): string {
    const palette = this.palette();
    return `:root {
${this.declarations(palette.light)}
}

:root[data-theme='dark'] {
${this.declarations(palette.dark)}
}`;
  }

  private declarations(map: Record<string, string>): string {
    return Object.entries(map)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n');
  }

  private applyPreviewPalette(palette: ModePalette): void {
    const existing = document.getElementById(PREVIEW_STYLE_ID);
    const tag = existing ?? document.createElement('style');

    if (!existing) {
      tag.id = PREVIEW_STYLE_ID;
      document.head.appendChild(tag);
    }

    tag.textContent = this.buildPreviewCss(palette);
  }

  private buildPreviewCss(palette: ModePalette): string {
    const light = this.declarations(palette.light);
    const dark = this.declarations(palette.dark);
    const scoped = `:is(${PREVIEW_SCOPE})`;

    return `${PREVIEW_SCOPE} {
${light}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) ${scoped} {
${dark}
  }
}

:root[data-theme='dark'] ${scoped} {
${dark}
}`;
  }
}

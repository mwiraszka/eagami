import {
  CheckboxComponent,
  IconCategory,
  IconComponentType,
  SearchIconComponent,
  ToastService,
  TooltipDirective,
  XIconComponent,
} from '@eagami/ui';

import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

import { ICONS } from './icons.data';

/**
 * UI tab for the category-filter checkboxes. `feather` and `eagami` map to
 * each icon's `static readonly category`; `brand` is the orthogonal
 * `static readonly isBrand` flag.
 */
type CategoryTab = IconCategory | 'brand';

@Component({
  selector: 'web-ui-icons-page',
  templateUrl: './ui-icons-page.component.html',
  styleUrl: './ui-icons-page.component.scss',
  imports: [
    CheckboxComponent,
    FormsModule,
    NgComponentOutlet,
    SearchIconComponent,
    TooltipDirective,
    XIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIconsPageComponent {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly toastService = inject(ToastService);
  private readonly i18n = inject(WebI18nService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly messages = this.i18n.messages;
  protected readonly query = signal('');
  protected readonly enabledCategories = signal<ReadonlySet<CategoryTab>>(
    new Set(['feather', 'eagami', 'brand']),
  );

  protected readonly categories: ReadonlyArray<CategoryTab> = [
    'feather',
    'eagami',
    'brand',
  ];

  protected readonly categoryCounts = computed(() => {
    const counts = { feather: 0, eagami: 0, brand: 0 };
    for (const icon of ICONS) {
      counts[icon.category]++;
      if (icon.isBrand) counts.brand++;
    }
    return counts;
  });

  protected categoryLabel(category: CategoryTab): string {
    const m = this.messages().ui.icons;
    switch (category) {
      case 'feather':
        return m.categoryFeather;
      case 'eagami':
        return m.categoryEagami;
      case 'brand':
        return m.categoryBrand;
      default: {
        const exhaustiveCheck: never = category;
        return exhaustiveCheck;
      }
    }
  }

  protected isCategoryEnabled(category: CategoryTab): boolean {
    return this.enabledCategories().has(category);
  }

  protected toggleCategory(category: CategoryTab): void {
    const next = new Set(this.enabledCategories());
    if (next.has(category)) next.delete(category);
    else next.add(category);
    this.enabledCategories.set(next);
  }

  /** Lede is authored as trusted HTML so its `<a>` tags keep `target` and `rel`. */
  protected readonly ledeHtml = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.messages().ui.icons.lede),
  );

  protected readonly normalizedQuery = computed(() => normalize(this.query()));

  protected readonly filteredIcons = computed<ReadonlyArray<IconComponentType>>(() => {
    const q = this.normalizedQuery();
    const cats = this.enabledCategories();
    return ICONS.filter(icon => {
      const matchesCategory =
        cats.has(icon.category) || (!!icon.isBrand && cats.has('brand'));
      if (!matchesCategory) return false;
      if (!q) return true;
      return icon.tags.some(tag => normalize(tag).includes(q));
    });
  });

  protected readonly countLabel = computed(() => {
    const m = this.messages().ui.icons;
    const shown = this.filteredIcons().length;
    const total = ICONS.length;
    return shown === total ? m.countAll(total) : m.countFiltered(shown, total);
  });

  constructor() {
    effect(() => {
      const m = this.messages().ui.icons;
      this.metaAndTitleService.updateTitle(m.metaTitle);
      this.metaAndTitleService.updateDescription(m.metaDescription);
    });
  }

  protected displayName(slug: string): string {
    return DISPLAY_NAME_OVERRIDES[slug] ?? toTitleCase(slug);
  }

  protected clearQuery(): void {
    this.query.set('');
  }

  protected async copySelector(slug: string): Promise<void> {
    const selector = `ea-icon-${slug}`;
    const m = this.messages().ui.icons;
    try {
      await navigator.clipboard.writeText(selector);
      this.toastService.show(m.copiedToast(selector), { variant: 'success' });
    } catch {
      this.toastService.show(m.copyFailedToast(selector), { variant: 'error' });
    }
  }
}

/**
 * Lowercase + strip diacritics so a French user typing `cafe` matches `café`
 * and a Spanish user typing `arbol` matches `árbol`. Greek and Polish marks
 * decompose the same way under NFD.
 */
function normalize(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

function toTitleCase(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Display-name overrides for icons whose canonical brand or acronym casing
 * doesn't match the default `slug → Title Case` derivation (e.g. `npm` should
 * stay lowercase, `github` is `GitHub`, `rss` is `RSS`).
 */
const DISPLAY_NAME_OVERRIDES: Record<string, string> = {
  codepen: 'CodePen',
  codesandbox: 'CodeSandbox',
  cpu: 'CPU',
  github: 'GitHub',
  'github-2': 'GitHub 2',
  gitlab: 'GitLab',
  linkedin: 'LinkedIn',
  'linkedin-2': 'LinkedIn 2',
  mongodb: 'MongoDB',
  npm: 'npm',
  paypal: 'PayPal',
  rss: 'RSS',
  tv: 'TV',
  'x-twitter': 'X (Twitter)',
  youtube: 'YouTube',
  'youtube-2': 'YouTube 2',
};

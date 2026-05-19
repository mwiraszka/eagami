import {
  AccordionComponent,
  AccordionItemComponent,
  AlertComponent,
  AutocompleteComponent,
  AvatarComponent,
  AvatarEditorComponent,
  AvatarEditorCropEvent,
  BadgeComponent,
  BreadcrumbItem,
  BreadcrumbsComponent,
  ButtonComponent,
  CardComponent,
  CheckboxComponent,
  CodeInputComponent,
  DataTableColumn,
  DataTableComponent,
  DatePickerComponent,
  DialogComponent,
  DividerComponent,
  DrawerComponent,
  DropdownComponent,
  EAGAMI_LOCALES,
  EagamiI18nService,
  EagamiLocale,
  EagamiWordmarkComponent,
  Edit2IconComponent,
  EmptyStateComponent,
  FileIconComponent,
  ICONS,
  IconComponentType,
  InputComponent,
  MenuComponent,
  MenuItemComponent,
  MenuTriggerDirective,
  MoreHorizontalIconComponent,
  PaginatorComponent,
  PaginatorState,
  ProgressBarComponent,
  RadioComponent,
  RadioGroupComponent,
  SearchIconComponent,
  SegmentedComponent,
  SelectOption,
  SkeletonComponent,
  SliderComponent,
  SpinnerComponent,
  SwitchComponent,
  TabComponent,
  TabsComponent,
  TagComponent,
  TextareaComponent,
  ToastComponent,
  ToastService,
  TooltipDirective,
  TrashIconComponent,
  iconDisplayName,
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

import { DEMO_STRINGS, DemoStrings } from './demo-strings';

// localStorage keys for persisted user preferences. Namespaced so they don't
// collide with anything the host page might store.
const DARK_MODE_KEY = 'eagami-sandbox:dark-mode';
const LOCALE_KEY = 'eagami-sandbox:locale';

interface SandboxComponentEntry {
  key: string;
  label: string;
}

@Component({
  selector: 'sandbox-root',
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    AlertComponent,
    AutocompleteComponent,
    AvatarEditorComponent,
    AvatarComponent,
    BadgeComponent,
    BreadcrumbsComponent,
    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    CodeInputComponent,
    DataTableComponent,
    DatePickerComponent,
    DialogComponent,
    DividerComponent,
    DrawerComponent,
    DropdownComponent,
    EagamiWordmarkComponent,
    Edit2IconComponent,
    EmptyStateComponent,
    FileIconComponent,
    InputComponent,
    MenuComponent,
    MenuItemComponent,
    MenuTriggerDirective,
    MoreHorizontalIconComponent,
    NgComponentOutlet,
    PaginatorComponent,
    ProgressBarComponent,
    RadioComponent,
    RadioGroupComponent,
    SearchIconComponent,
    SegmentedComponent,
    SkeletonComponent,
    SliderComponent,
    SpinnerComponent,
    SwitchComponent,
    TabComponent,
    TabsComponent,
    TagComponent,
    TextareaComponent,
    ToastComponent,
    TooltipDirective,
    TrashIconComponent,
  ],
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxComponent {
  private readonly toastService = inject(ToastService);
  protected readonly i18n = inject(EagamiI18nService);

  // Sandbox demo strings for the active locale. Falls back to English.
  protected readonly s = computed<DemoStrings>(
    () => DEMO_STRINGS[this.i18n.locale()] ?? DEMO_STRINGS.en,
  );

  readonly darkMode = signal(false);

  // Locale switcher — drives every component's built-in strings at once.
  // English keeps the 🇬🇧 flag by picker convention; the locale tag itself
  // stays region-neutral `en`.
  readonly localeOptions: SelectOption[] = [
    { value: 'en', label: '🇬🇧 English' },
    { value: 'fr-FR', label: '🇫🇷 Français' },
    { value: 'el', label: '🇬🇷 Ελληνικά' },
    { value: 'pl', label: '🇵🇱 Polski' },
    { value: 'es-ES', label: '🇪🇸 Español' },
  ];

  setLocale(locale: string): void {
    if ((EAGAMI_LOCALES as readonly string[]).includes(locale)) {
      this.i18n.setLocale(locale as EagamiLocale);
    }
  }

  // Drives the tooltip demo's disabled state. Must update reactively — DevTools
  // mobile-mode emulation toggles `(hover: hover)` after page load, and real
  // devices can gain/lose hover capability via Bluetooth peripherals. A static
  // read at construction misses both, so subscribe to the MediaQueryList.
  private readonly hoverMql =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(hover: hover)')
      : null;
  readonly canHover = signal(this.hoverMql?.matches ?? true);

  constructor() {
    // Restore persisted preferences before any reactive state reads them so
    // the first paint already reflects the user's last choice.
    this.restoreLocale();
    this.restoreDarkMode();

    this.hoverMql?.addEventListener('change', e => this.canHover.set(e.matches));

    // Keep <html data-theme> in sync with the toggle and persist the choice.
    effect(() => {
      const dark = this.darkMode();
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
      this.savePreference(DARK_MODE_KEY, String(dark));
    });

    // Keep <html lang> in sync with the active locale and persist it.
    // The lang attribute matters beyond accessibility: CSS `text-transform:
    // uppercase` applies locale-aware case mapping, which (for `el`) correctly
    // drops the tonos accent. Without lang="el" the browser keeps the accent,
    // producing typographically wrong Greek headings.
    effect(() => {
      const locale = this.i18n.locale();
      document.documentElement.setAttribute('lang', locale);
      this.savePreference(LOCALE_KEY, locale);
    });
  }

  private restoreLocale(): void {
    const saved = this.readPreference(LOCALE_KEY);
    if (saved && (EAGAMI_LOCALES as readonly string[]).includes(saved)) {
      this.i18n.setLocale(saved as EagamiLocale);
    }
  }

  private restoreDarkMode(): void {
    const saved = this.readPreference(DARK_MODE_KEY);
    if (saved !== null) {
      this.darkMode.set(saved === 'true');
    }
  }

  private readPreference(key: string): string | null {
    try {
      return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
    } catch {
      return null;
    }
  }

  private savePreference(key: string, value: string): void {
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
    } catch {
      // localStorage may be unavailable (private mode, disabled cookies) —
      // persistence is a nice-to-have, not a hard requirement.
    }
  }

  readonly componentList: SandboxComponentEntry[] = [
    { key: 'accordion', label: 'Accordion' },
    { key: 'alert', label: 'Alert' },
    { key: 'autocomplete', label: 'Autocomplete' },
    { key: 'avatar', label: 'Avatar' },
    { key: 'avatarEditor', label: 'Avatar Editor' },
    { key: 'badge', label: 'Badge' },
    { key: 'breadcrumbs', label: 'Breadcrumbs' },
    { key: 'button', label: 'Button' },
    { key: 'card', label: 'Card' },
    { key: 'checkbox', label: 'Checkbox' },
    { key: 'codeInput', label: 'Code Input' },
    { key: 'dataTable', label: 'Data Table' },
    { key: 'datePicker', label: 'Date Picker' },
    { key: 'dialog', label: 'Dialog' },
    { key: 'divider', label: 'Divider' },
    { key: 'drawer', label: 'Drawer' },
    { key: 'dropdown', label: 'Dropdown' },
    { key: 'eagamiWordmark', label: 'Eagami Wordmark' },
    { key: 'emptyState', label: 'Empty State' },
    { key: 'input', label: 'Input' },
    { key: 'menu', label: 'Menu' },
    { key: 'paginator', label: 'Paginator' },
    { key: 'progressBar', label: 'Progress Bar' },
    { key: 'radio', label: 'Radio' },
    { key: 'segmented', label: 'Segmented' },
    { key: 'skeleton', label: 'Skeleton' },
    { key: 'slider', label: 'Slider' },
    { key: 'spinner', label: 'Spinner' },
    { key: 'switch', label: 'Switch' },
    { key: 'tabs', label: 'Tabs' },
    { key: 'tag', label: 'Tag' },
    { key: 'textarea', label: 'Textarea' },
    { key: 'toast', label: 'Toast' },
    { key: 'tooltip', label: 'Tooltip' },
  ];

  readonly mode = signal<'components' | 'icons'>('components');

  readonly visible = signal<Record<string, boolean>>(
    Object.fromEntries(this.componentList.map(({ key }) => [key, true])),
  );

  readonly allVisible = computed(() => {
    const state = this.visible();
    return this.componentList.every(({ key }) => state[key]);
  });

  readonly someVisible = computed(() => {
    const state = this.visible();
    const checked = this.componentList.filter(({ key }) => state[key]).length;
    return checked > 0 && checked < this.componentList.length;
  });

  toggleVisible(key: string, checked: boolean): void {
    this.visible.update(current => ({ ...current, [key]: checked }));
  }

  toggleAll(): void {
    const next = !this.allVisible();
    this.visible.set(
      Object.fromEntries(this.componentList.map(({ key }) => [key, next])),
    );
  }

  isVisible(key: string): boolean {
    return this.visible()[key] ?? false;
  }

  isLoading = signal(false);
  codeInputValue = signal('');
  inputValue = signal('');
  checkboxValue = signal(false);
  radioValue = signal('');
  dropdownValue = signal('');
  datePickerValue = signal<Date | null>(null);
  datePickerMin = new Date(new Date().setDate(new Date().getDate() - 7));
  datePickerMax = new Date(new Date().setDate(new Date().getDate() + 21));
  dialogOpen = signal(false);
  drawerOpenRight = signal(false);
  drawerOpenLeft = signal(false);
  drawerOpenTop = signal(false);
  drawerOpenBottom = signal(false);
  autocompleteValue = signal('');
  switchValue = signal(false);
  sliderValue = signal(40);
  segmentedValue = signal('list');
  textareaValue = signal('');
  croppedAvatarUrl = signal('');
  tablePage = signal(1);
  tablePageSize = signal(5);

  readonly icons = ICONS;

  // All option/item arrays follow the active locale so demos render in the
  // currently selected language.
  readonly autocompleteOptions = computed<SelectOption[]>(
    () => this.s().autocomplete.options,
  );

  readonly breadcrumbItems = computed<BreadcrumbItem[]>(() => this.s().breadcrumbs.items);

  readonly breadcrumbItemsShort = computed<BreadcrumbItem[]>(
    () => this.s().breadcrumbs.itemsShort,
  );

  readonly dropdownOptions = computed<SelectOption[]>(() => this.s().dropdown.options);

  readonly radioFruitOptions = computed(() => this.s().radio.fruitOptions);

  readonly segmentedViewOptions = computed<SelectOption[]>(
    () => this.s().segmented.viewOptions,
  );

  readonly segmentedThemeOptions = computed<SelectOption[]>(
    () => this.s().segmented.themeOptions,
  );

  readonly tableColumns = computed<DataTableColumn[]>(() => {
    const t = this.s().dataTable;
    const locale = this.i18n.locale();
    return [
      { key: 'id', label: t.columnId, sortable: true, width: '60px', align: 'center' },
      { key: 'firstName', label: t.columnFirstName, sortable: true },
      { key: 'lastName', label: t.columnLastName, sortable: true },
      { key: 'admin', label: t.columnAdmin, sortable: true, align: 'center' },
      {
        key: 'posts',
        label: t.columnPosts,
        sortable: true,
        align: 'right',
        format: v => new Intl.NumberFormat(locale).format(v as number),
      },
    ];
  });

  tableData = [
    { id: 1, firstName: 'Alice', lastName: 'Johnson', admin: '', posts: 847 },
    { id: 2, firstName: 'René', lastName: 'Dupont', admin: '✓', posts: 12 },
    { id: 3, firstName: 'Charlie', lastName: 'García', admin: '', posts: 503 },
    { id: 4, firstName: 'Diana', lastName: 'Müller', admin: '', posts: 1291 },
    { id: 5, firstName: 'Zoë', lastName: 'Davis', admin: '', posts: 68 },
    { id: 6, firstName: 'Frank', lastName: 'Østergaard', admin: '✓', posts: 245 },
    { id: 7, firstName: 'Chloé', lastName: 'Lefèvre', admin: '', posts: 1034 },
    { id: 8, firstName: 'Søren', lastName: 'Berg', admin: '', posts: 4 },
    { id: 9, firstName: 'Ivy', lastName: 'Chen', admin: '', posts: 392 },
    { id: 10, firstName: 'André', lastName: 'Turner', admin: '✓', posts: 1150 },
    { id: 11, firstName: 'Karen', lastName: 'Hernández', admin: '', posts: 76 },
    { id: 12, firstName: 'Léo', lastName: 'Martinez', admin: '', posts: 619 },
  ];

  get pagedTableData() {
    const start = (this.tablePage() - 1) * this.tablePageSize();
    return this.tableData.slice(start, start + this.tablePageSize());
  }

  onTablePageChange(event: PaginatorState): void {
    this.tablePage.set(event.page);
    this.tablePageSize.set(event.pageSize);
  }

  showToast(variant: 'default' | 'success' | 'warning' | 'error' | 'info'): void {
    const messages = this.s().toast;
    const message = (
      {
        default: messages.defaultMsg,
        success: messages.successMsg,
        warning: messages.warningMsg,
        error: messages.errorMsg,
        info: messages.infoMsg,
      } as const
    )[variant];
    this.toastService.show(message, { variant });
  }

  triggerLoading(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 3000);
  }

  onAvatarCropped(event: AvatarEditorCropEvent): void {
    this.croppedAvatarUrl.set(event.dataUrl);
    this.toastService.success(this.s().toast.avatarUpdated);
  }

  iconSelector(icon: IconComponentType): string {
    return `ea-icon-${icon.slug}`;
  }

  readonly iconLabel = iconDisplayName;

  async copyIconSelector(selector: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(selector);
      this.toastService.success(this.s().toast.copied(selector));
    } catch {
      this.toastService.error(this.s().toast.copyFailed(selector));
    }
  }
}

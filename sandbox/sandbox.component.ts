import {
  AccordionComponent,
  AccordionItemComponent,
  AlertCircleIconComponent,
  AlertComponent,
  AlertTriangleIconComponent,
  ArchiveIconComponent,
  ArrowDownIconComponent,
  ArrowLeftIconComponent,
  ArrowRightIconComponent,
  ArrowUpIconComponent,
  AtSignIconComponent,
  AutocompleteComponent,
  AvatarComponent,
  AvatarEditorComponent,
  AvatarEditorCropEvent,
  BadgeComponent,
  BarChartIconComponent,
  BellIconComponent,
  BookmarkIconComponent,
  BreadcrumbItem,
  BreadcrumbsComponent,
  BriefcaseIconComponent,
  ButtonComponent,
  CalendarIconComponent,
  CameraIconComponent,
  CardComponent,
  CheckCircleIconComponent,
  CheckIconComponent,
  CheckboxComponent,
  ChevronDownIconComponent,
  ChevronLeftIconComponent,
  ChevronRightIconComponent,
  ChevronUpIconComponent,
  ChevronsUpDownIconComponent,
  ClipboardIconComponent,
  ClockIconComponent,
  CloudIconComponent,
  CodeInputComponent,
  CopyIconComponent,
  CreditCardIconComponent,
  DataTableColumn,
  DataTableComponent,
  DatePickerComponent,
  DialogComponent,
  DividerComponent,
  DollarSignIconComponent,
  DownloadIconComponent,
  DrawerComponent,
  DropdownComponent,
  EAGAMI_LOCALES,
  EagamiI18nService,
  EagamiIconComponent,
  EagamiLocale,
  EagamiWordmarkComponent,
  EmptyStateComponent,
  ExternalLinkIconComponent,
  EyeIconComponent,
  EyeOffIconComponent,
  FacebookIconComponent,
  FileIconComponent,
  FilterIconComponent,
  FlagIconComponent,
  FolderIconComponent,
  GiftIconComponent,
  GithubIconComponent,
  GlobeIconComponent,
  GoogleIconComponent,
  HashIconComponent,
  HeartIconComponent,
  HelpCircleIconComponent,
  HomeIconComponent,
  ImageIconComponent,
  InboxIconComponent,
  InfoIconComponent,
  InputComponent,
  LinkIconComponent,
  ListIconComponent,
  LoaderIconComponent,
  LockIconComponent,
  LogInIconComponent,
  LogOutIconComponent,
  MailIconComponent,
  MapPinIconComponent,
  MaximizeIconComponent,
  MenuComponent,
  MenuIconComponent,
  MenuItemComponent,
  MenuTriggerDirective,
  MicIconComponent,
  MicrosoftIconComponent,
  MinimizeIconComponent,
  MinusIconComponent,
  MonitorIconComponent,
  MoonIconComponent,
  MoreHorizontalIconComponent,
  PackageIconComponent,
  PaginatorComponent,
  PaginatorState,
  PaperclipIconComponent,
  PauseIconComponent,
  PencilIconComponent,
  PhoneIconComponent,
  PlayIconComponent,
  PlusIconComponent,
  PrinterIconComponent,
  ProgressBarComponent,
  RadioComponent,
  RadioGroupComponent,
  RefreshCwIconComponent,
  RotateCcwIconComponent,
  SaveIconComponent,
  SearchIconComponent,
  SegmentedComponent,
  SelectOption,
  SendIconComponent,
  SettingsIconComponent,
  ShareIconComponent,
  ShieldIconComponent,
  ShoppingCartIconComponent,
  SkeletonComponent,
  SliderComponent,
  SmartphoneIconComponent,
  SpinnerComponent,
  StarIconComponent,
  SunIconComponent,
  SwitchComponent,
  TabComponent,
  TabsComponent,
  TagComponent,
  TextareaComponent,
  ThumbsDownIconComponent,
  ThumbsUpIconComponent,
  ToastComponent,
  ToastService,
  TooltipDirective,
  TrashIconComponent,
  TrendingUpIconComponent,
  UnlockIconComponent,
  UploadIconComponent,
  UserIconComponent,
  UsersIconComponent,
  VideoIconComponent,
  Volume2IconComponent,
  WifiIconComponent,
  XCircleIconComponent,
  XIconComponent,
  XTwitterIconComponent,
  ZapIconComponent,
} from '@eagami/ui';

import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Type,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

interface SandboxComponentEntry {
  key: string;
  label: string;
}

interface IconEntry {
  name: string;
  label: string;
  selector: string;
  component: Type<unknown>;
}

function buildIcon(name: string, component: Type<unknown>): IconEntry {
  return {
    name,
    component,
    label: name
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    selector: `ea-icon-${name}`,
  };
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
    EmptyStateComponent,
    FileIconComponent,
    InputComponent,
    MenuComponent,
    MenuItemComponent,
    MenuTriggerDirective,
    MoreHorizontalIconComponent,
    NgComponentOutlet,
    PaginatorComponent,
    PencilIconComponent,
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
    this.hoverMql?.addEventListener('change', e => this.canHover.set(e.matches));

    effect(() => {
      document.documentElement.setAttribute(
        'data-theme',
        this.darkMode() ? 'dark' : 'light',
      );
    });
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

  readonly icons: IconEntry[] = [
    buildIcon('alert-circle', AlertCircleIconComponent),
    buildIcon('alert-triangle', AlertTriangleIconComponent),
    buildIcon('archive', ArchiveIconComponent),
    buildIcon('arrow-down', ArrowDownIconComponent),
    buildIcon('arrow-left', ArrowLeftIconComponent),
    buildIcon('arrow-right', ArrowRightIconComponent),
    buildIcon('arrow-up', ArrowUpIconComponent),
    buildIcon('at-sign', AtSignIconComponent),
    buildIcon('bar-chart', BarChartIconComponent),
    buildIcon('bell', BellIconComponent),
    buildIcon('bookmark', BookmarkIconComponent),
    buildIcon('briefcase', BriefcaseIconComponent),
    buildIcon('calendar', CalendarIconComponent),
    buildIcon('camera', CameraIconComponent),
    buildIcon('check', CheckIconComponent),
    buildIcon('check-circle', CheckCircleIconComponent),
    buildIcon('chevron-down', ChevronDownIconComponent),
    buildIcon('chevron-left', ChevronLeftIconComponent),
    buildIcon('chevron-right', ChevronRightIconComponent),
    buildIcon('chevron-up', ChevronUpIconComponent),
    buildIcon('chevrons-up-down', ChevronsUpDownIconComponent),
    buildIcon('clipboard', ClipboardIconComponent),
    buildIcon('clock', ClockIconComponent),
    buildIcon('cloud', CloudIconComponent),
    buildIcon('copy', CopyIconComponent),
    buildIcon('credit-card', CreditCardIconComponent),
    buildIcon('dollar-sign', DollarSignIconComponent),
    buildIcon('download', DownloadIconComponent),
    buildIcon('eagami', EagamiIconComponent),
    buildIcon('external-link', ExternalLinkIconComponent),
    buildIcon('eye', EyeIconComponent),
    buildIcon('eye-off', EyeOffIconComponent),
    buildIcon('facebook', FacebookIconComponent),
    buildIcon('file', FileIconComponent),
    buildIcon('filter', FilterIconComponent),
    buildIcon('flag', FlagIconComponent),
    buildIcon('folder', FolderIconComponent),
    buildIcon('gift', GiftIconComponent),
    buildIcon('github', GithubIconComponent),
    buildIcon('globe', GlobeIconComponent),
    buildIcon('google', GoogleIconComponent),
    buildIcon('hash', HashIconComponent),
    buildIcon('heart', HeartIconComponent),
    buildIcon('help-circle', HelpCircleIconComponent),
    buildIcon('home', HomeIconComponent),
    buildIcon('image', ImageIconComponent),
    buildIcon('inbox', InboxIconComponent),
    buildIcon('info', InfoIconComponent),
    buildIcon('link', LinkIconComponent),
    buildIcon('list', ListIconComponent),
    buildIcon('loader', LoaderIconComponent),
    buildIcon('lock', LockIconComponent),
    buildIcon('log-in', LogInIconComponent),
    buildIcon('log-out', LogOutIconComponent),
    buildIcon('mail', MailIconComponent),
    buildIcon('map-pin', MapPinIconComponent),
    buildIcon('maximize', MaximizeIconComponent),
    buildIcon('menu', MenuIconComponent),
    buildIcon('mic', MicIconComponent),
    buildIcon('microsoft', MicrosoftIconComponent),
    buildIcon('minimize', MinimizeIconComponent),
    buildIcon('minus', MinusIconComponent),
    buildIcon('monitor', MonitorIconComponent),
    buildIcon('moon', MoonIconComponent),
    buildIcon('more-horizontal', MoreHorizontalIconComponent),
    buildIcon('package', PackageIconComponent),
    buildIcon('paperclip', PaperclipIconComponent),
    buildIcon('pause', PauseIconComponent),
    buildIcon('pencil', PencilIconComponent),
    buildIcon('phone', PhoneIconComponent),
    buildIcon('play', PlayIconComponent),
    buildIcon('plus', PlusIconComponent),
    buildIcon('printer', PrinterIconComponent),
    buildIcon('refresh-cw', RefreshCwIconComponent),
    buildIcon('rotate-ccw', RotateCcwIconComponent),
    buildIcon('save', SaveIconComponent),
    buildIcon('search', SearchIconComponent),
    buildIcon('send', SendIconComponent),
    buildIcon('settings', SettingsIconComponent),
    buildIcon('share', ShareIconComponent),
    buildIcon('shield', ShieldIconComponent),
    buildIcon('shopping-cart', ShoppingCartIconComponent),
    buildIcon('smartphone', SmartphoneIconComponent),
    buildIcon('star', StarIconComponent),
    buildIcon('sun', SunIconComponent),
    buildIcon('thumbs-down', ThumbsDownIconComponent),
    buildIcon('thumbs-up', ThumbsUpIconComponent),
    buildIcon('trash', TrashIconComponent),
    buildIcon('trending-up', TrendingUpIconComponent),
    buildIcon('unlock', UnlockIconComponent),
    buildIcon('upload', UploadIconComponent),
    buildIcon('user', UserIconComponent),
    buildIcon('users', UsersIconComponent),
    buildIcon('video', VideoIconComponent),
    buildIcon('volume-2', Volume2IconComponent),
    buildIcon('wifi', WifiIconComponent),
    buildIcon('x', XIconComponent),
    buildIcon('x-circle', XCircleIconComponent),
    buildIcon('x-twitter', XTwitterIconComponent),
    buildIcon('zap', ZapIconComponent),
  ];

  autocompleteOptions: SelectOption[] = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' },
    { value: 'qwik', label: 'Qwik' },
    { value: 'preact', label: 'Preact' },
    { value: 'lit', label: 'Lit' },
  ];

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Laptops', href: '/products/laptops' },
    { label: 'MacBook Pro' },
  ];

  breadcrumbItemsShort: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Settings' },
  ];

  dropdownOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
  ];

  segmentedViewOptions: SelectOption[] = [
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'kanban', label: 'Kanban' },
  ];

  segmentedThemeOptions: SelectOption[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  tableColumns: DataTableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '60px', align: 'center' },
    { key: 'firstName', label: 'First Name', sortable: true },
    { key: 'lastName', label: 'Last Name', sortable: true },
    { key: 'admin', label: 'Admin', sortable: true, align: 'center' },
    {
      key: 'posts',
      label: 'Posts',
      sortable: true,
      align: 'right',
      format: v => (v as number).toLocaleString('en-US'),
    },
  ];

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
    const article = variant === 'error' || variant === 'info' ? 'an' : 'a';
    this.toastService.show(`This is ${article} ${variant} toast`, { variant });
  }

  triggerLoading(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 3000);
  }

  onAvatarCropped(event: AvatarEditorCropEvent): void {
    this.croppedAvatarUrl.set(event.dataUrl);
    this.toastService.success('Avatar updated');
  }

  async copyIconSelector(selector: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(selector);
      this.toastService.success(`Copied ${selector}`);
    } catch {
      this.toastService.error(`Failed to copy ${selector}`);
    }
  }
}

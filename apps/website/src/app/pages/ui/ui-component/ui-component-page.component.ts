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
  ColorPickerComponent,
  DataTableColumn,
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
  MultiSelectComponent,
  PaginatorComponent,
  PaginatorState,
  PopoverComponent,
  PopoverPlacement,
  ProgressBarComponent,
  RadioComponent,
  RadioGroupComponent,
  RangeSliderComponent,
  RangeSliderValue,
  SearchIconComponent,
  SegmentedComponent,
  SelectOption,
  SkeletonComponent,
  SliderComponent,
  SpinnerComponent,
  StepComponent,
  StepperComponent,
  SwitchComponent,
  TabComponent,
  TabsComponent,
  TagComponent,
  TextareaComponent,
  TimePickerComponent,
  ToastComponent,
  ToastService,
  TooltipDirective,
  TrashIconComponent,
} from '@eagami/ui';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { UI_COMPONENTS } from '@app/data/ui-components';
import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

@Component({
  selector: 'web-ui-component-page',
  templateUrl: './ui-component-page.component.html',
  styleUrl: './ui-component-page.component.scss',
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    AlertComponent,
    AutocompleteComponent,
    AvatarComponent,
    AvatarEditorComponent,
    BadgeComponent,
    BreadcrumbsComponent,
    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    CodeInputComponent,
    ColorPickerComponent,
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
    MultiSelectComponent,
    PaginatorComponent,
    PopoverComponent,
    ProgressBarComponent,
    RadioComponent,
    RadioGroupComponent,
    RangeSliderComponent,
    RouterLink,
    SearchIconComponent,
    SegmentedComponent,
    SkeletonComponent,
    SliderComponent,
    SpinnerComponent,
    StepComponent,
    StepperComponent,
    SwitchComponent,
    TabComponent,
    TabsComponent,
    TagComponent,
    TextareaComponent,
    TimePickerComponent,
    ToastComponent,
    TooltipDirective,
    TrashIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiComponentPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly toastService = inject(ToastService);
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;

  /* Drives the tooltip demo's disabled state. Reactive — DevTools mobile mode
     emulation toggles `(hover: hover)` after page load, and real devices can
     gain/lose hover capability via Bluetooth peripherals. A static read at
     construction misses both, so subscribe to the MediaQueryList. */
  private readonly hoverMql =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(hover: hover)')
      : null;
  protected readonly canHover = signal(this.hoverMql?.matches ?? true);

  private readonly params = toSignal(this.route.params, {
    initialValue: this.route.snapshot.params,
  });

  protected readonly slug = computed(() => this.params()['slug'] as string | undefined);

  protected readonly component = computed(() => {
    const s = this.slug();
    return UI_COMPONENTS.find(c => c.slug === s);
  });

  // Demo state
  protected readonly isLoading = signal(false);
  protected readonly codeInputValue = signal('');
  protected readonly colorPickerValue = signal<string | null>('#3674a1');
  protected readonly inputValue = signal('');
  protected readonly checkboxValue = signal(false);
  protected readonly radioValue = signal('');
  protected readonly dropdownValue = signal('');
  protected readonly multiSelectValue = signal<readonly string[]>([]);
  protected readonly datePickerValue = signal<Date | null>(null);
  protected readonly datePickerMin = new Date(
    new Date().setDate(new Date().getDate() - 7),
  );
  protected readonly datePickerMax = new Date(
    new Date().setDate(new Date().getDate() + 21),
  );
  protected readonly dialogOpen = signal(false);
  protected readonly drawerOpenRight = signal(false);
  protected readonly drawerOpenLeft = signal(false);
  protected readonly drawerOpenTop = signal(false);
  protected readonly drawerOpenBottom = signal(false);
  protected readonly autocompleteValue = signal('');
  protected readonly switchValue = signal(false);
  protected readonly sliderValue = signal(40);
  protected readonly rangeSliderValue = signal<RangeSliderValue>([20, 80]);
  protected readonly timePickerValue = signal<string | null>(null);
  protected readonly segmentedValue = signal('list');
  protected readonly textareaValue = signal('');
  protected readonly croppedAvatarUrl = signal('');
  protected readonly tablePage = signal(1);
  protected readonly tablePageSize = signal(5);
  protected readonly popoverBasicOpen = signal(false);
  protected readonly popoverPlacementOpen = signal<PopoverPlacement | null>(null);

  // Demo data
  // Framework names are proper nouns and stay untranslated.
  protected readonly autocompleteOptions: SelectOption[] = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' },
    { value: 'qwik', label: 'Qwik' },
    { value: 'preact', label: 'Preact' },
    { value: 'lit', label: 'Lit' },
  ];

  protected readonly breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    const shared = this.messages().ui.component.sharedOptions;
    return [
      { label: shared.breadcrumbHome, href: '/' },
      { label: shared.breadcrumbProducts, href: '/products' },
      { label: shared.breadcrumbLaptops, href: '/products/laptops' },
      { label: shared.breadcrumbMacBookPro },
    ];
  });

  protected readonly breadcrumbItemsShort = computed<BreadcrumbItem[]>(() => {
    const shared = this.messages().ui.component.sharedOptions;
    return [
      { label: shared.breadcrumbDashboard, href: '/' },
      { label: shared.breadcrumbSettings },
    ];
  });

  protected readonly dropdownOptions = computed<SelectOption[]>(() =>
    this.messages().ui.component.sharedOptions.fruitOptions.map(o => ({ ...o })),
  );

  protected readonly segmentedViewOptions = computed<SelectOption[]>(() =>
    this.messages().ui.component.sharedOptions.viewOptions.map(o => ({ ...o })),
  );

  protected readonly segmentedThemeOptions = computed<SelectOption[]>(() =>
    this.messages().ui.component.sharedOptions.themeOptions.map(o => ({ ...o })),
  );

  protected readonly tableColumns = computed<DataTableColumn[]>(() => {
    const cols = this.messages().ui.component.demos.dataTable;
    return [
      {
        key: 'id',
        label: cols.tableColumnId,
        sortable: true,
        width: '60px',
        align: 'center',
      },
      { key: 'firstName', label: cols.tableColumnFirstName, sortable: true },
      { key: 'lastName', label: cols.tableColumnLastName, sortable: true },
      { key: 'admin', label: cols.tableColumnAdmin, sortable: true, align: 'center' },
      {
        key: 'posts',
        label: cols.tableColumnPosts,
        sortable: true,
        align: 'right',
        format: v => (v as number).toLocaleString('en-US'),
      },
    ];
  });

  protected readonly tableData = [
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

  protected get pagedTableData() {
    const start = (this.tablePage() - 1) * this.tablePageSize();
    return this.tableData.slice(start, start + this.tablePageSize());
  }

  constructor() {
    this.hoverMql?.addEventListener('change', e => this.canHover.set(e.matches));

    effect(() => {
      const c = this.component();
      if (c) {
        this.metaAndTitleService.updateTitle(
          `${this.messages().ui.metaTitle} | ${c.name}`,
        );
        this.metaAndTitleService.updateDescription(
          this.messages().ui.component.metaDescription(c.name),
        );
      }
    });
  }

  protected onTablePageChange(event: PaginatorState): void {
    this.tablePage.set(event.page);
    this.tablePageSize.set(event.pageSize);
  }

  protected showToast(
    variant: 'default' | 'success' | 'warning' | 'error' | 'info',
  ): void {
    this.toastService.show(this.messages().ui.component.demos.toast.message(variant), {
      variant,
    });
  }

  protected triggerLoading(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 3000);
  }

  protected onAvatarCropped(event: AvatarEditorCropEvent): void {
    this.croppedAvatarUrl.set(event.dataUrl);
    this.toastService.success(
      this.messages().ui.component.demos.avatarEditorActions.avatarUpdatedToast,
    );
  }
}

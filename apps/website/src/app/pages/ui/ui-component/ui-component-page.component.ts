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
  EagamiWordmarkComponent,
  EmptyStateComponent,
  FileIconComponent,
  InputComponent,
  MenuComponent,
  MenuItemComponent,
  MenuTriggerDirective,
  MoreHorizontalIconComponent,
  PaginatorComponent,
  PaginatorState,
  PencilIconComponent,
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
} from '@eagami/ui';

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { UI_COMPONENTS } from '@app/data/ui-components';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

@Component({
  selector: 'web-ui-component-page',
  templateUrl: './ui-component-page.component.html',
  styleUrl: './ui-component-page.component.scss',
  imports: [
    RouterLink,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiComponentPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly toastService = inject(ToastService);

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
  protected readonly inputValue = signal('');
  protected readonly checkboxValue = signal(false);
  protected readonly radioValue = signal('');
  protected readonly dropdownValue = signal('');
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
  protected readonly segmentedValue = signal('list');
  protected readonly textareaValue = signal('');
  protected readonly croppedAvatarUrl = signal('');
  protected readonly tablePage = signal(1);
  protected readonly tablePageSize = signal(5);

  // Demo data
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

  protected readonly breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Laptops', href: '/products/laptops' },
    { label: 'MacBook Pro' },
  ];

  protected readonly breadcrumbItemsShort: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Settings' },
  ];

  protected readonly dropdownOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
  ];

  protected readonly segmentedViewOptions: SelectOption[] = [
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'kanban', label: 'Kanban' },
  ];

  protected readonly segmentedThemeOptions: SelectOption[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  protected readonly tableColumns: DataTableColumn[] = [
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
        this.metaAndTitleService.updateTitle('Eagami | UI');
        const selectorDisplay =
          c.kind === 'directive' ? `[${c.selector}]` : `<${c.selector} />`;
        this.metaAndTitleService.updateDescription(
          `${c.name} ${c.kind ?? 'component'} reference for @eagami/ui — selector ${selectorDisplay}.`,
        );
      }
    });
  }

  public ngOnInit(): void {
    // Initial title set covered by effect; keep ngOnInit for OnInit interface.
  }

  protected onTablePageChange(event: PaginatorState): void {
    this.tablePage.set(event.page);
    this.tablePageSize.set(event.pageSize);
  }

  protected showToast(
    variant: 'default' | 'success' | 'warning' | 'error' | 'info',
  ): void {
    const article = variant === 'error' || variant === 'info' ? 'an' : 'a';
    this.toastService.show(`This is ${article} ${variant} toast`, { variant });
  }

  protected triggerLoading(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 3000);
  }

  protected onAvatarCropped(event: AvatarEditorCropEvent): void {
    this.croppedAvatarUrl.set(event.dataUrl);
    this.toastService.success('Avatar updated');
  }
}

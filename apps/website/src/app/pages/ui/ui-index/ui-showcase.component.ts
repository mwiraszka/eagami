import {
  AvatarComponent,
  BadgeComponent,
  type BreadcrumbItem,
  BreadcrumbsComponent,
  ButtonComponent,
  CheckboxComponent,
  ColorPickerComponent,
  DatePickerComponent,
  DropdownComponent,
  MultiSelectComponent,
  ProgressBarComponent,
  RadioComponent,
  RadioGroupComponent,
  RatingComponent,
  SegmentedComponent,
  type SelectOption,
  SkeletonComponent,
  SliderComponent,
  SpinnerComponent,
  SwitchComponent,
  TagComponent,
  ToastService,
  TooltipDirective,
} from '@eagami/ui';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { WebI18nService } from '@app/i18n/web-i18n.service';

// Stripped-down, live components shown as a flex-wrapped wall on the UI landing
// page: a visual teaser for the library, not the canonical demos (those live on
// each component's own page). Every control is interactive and self-labelled.
@Component({
  selector: 'web-ui-showcase',
  templateUrl: './ui-showcase.component.html',
  styleUrl: './ui-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AvatarComponent,
    BadgeComponent,
    BreadcrumbsComponent,
    ButtonComponent,
    CheckboxComponent,
    ColorPickerComponent,
    DatePickerComponent,
    DropdownComponent,
    MultiSelectComponent,
    ProgressBarComponent,
    RadioComponent,
    RadioGroupComponent,
    RatingComponent,
    SegmentedComponent,
    SkeletonComponent,
    SliderComponent,
    SpinnerComponent,
    SwitchComponent,
    TagComponent,
    TooltipDirective,
    RouterLink,
  ],
})
export class UiShowcaseComponent {
  private readonly toastService = inject(ToastService);
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly switchOn = signal(true);
  protected readonly checkboxOn = signal(true);
  protected readonly radioValue = signal('this');
  protected readonly sliderValue = signal(50);
  protected readonly ratingValue = signal(4.5);
  protected readonly segmentedValue = signal('grid');
  protected readonly colorValue = signal<string | null>('#3674a1');
  protected readonly dropdownValue = signal('option-1');
  protected readonly multiSelectValue = signal<readonly string[]>(['music', 'food']);
  protected readonly dateValue = signal<Date | null>(new Date(2026, 0, 15));

  protected readonly breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Eagami', href: '/' },
    { label: 'UI' },
  ];

  protected readonly viewOptions = computed<SelectOption[]>(() => {
    const s = this.messages().ui.index.showcase;
    return [
      { value: 'list', label: s.list },
      { value: 'grid', label: s.grid },
      { value: 'table', label: s.table },
    ];
  });

  protected readonly dropdownOptions = computed<SelectOption[]>(() => {
    const s = this.messages().ui.index.showcase;
    return [
      { value: 'option-1', label: s.option1 },
      { value: 'option-2', label: s.option2 },
      { value: 'option-3', label: s.option3 },
    ];
  });

  protected readonly multiSelectOptions = computed<SelectOption[]>(() => {
    const s = this.messages().ui.index.showcase;
    return [
      { value: 'music', label: s.msMusic },
      { value: 'travel', label: s.msTravel },
      { value: 'food', label: s.msFood },
    ];
  });

  protected pressButton(): void {
    this.toastService.success(this.messages().ui.index.showcase.toastButton);
  }

  protected onToggle(checked: boolean): void {
    this.switchOn.set(checked);
    const s = this.messages().ui.index.showcase;
    this.toastService.warning(checked ? s.toastToggleOn : s.toastToggleOff);
  }

  protected onTick(checked: boolean): void {
    this.checkboxOn.set(checked);
    const s = this.messages().ui.index.showcase;
    this.toastService.info(checked ? s.toastTickOn : s.toastTickOff);
  }
}

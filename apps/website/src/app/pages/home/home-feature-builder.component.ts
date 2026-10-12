import {
  AvatarComponent,
  BarChartIconComponent,
  ButtonComponent,
  CalendarCheckIconComponent,
  CalendarDaysIconComponent,
  ChevronLeftIconComponent,
  ChevronRightIconComponent,
  CreditCardIconComponent,
  DownloadIconComponent,
  Edit2IconComponent,
  GlobeIconComponent,
  ImageIconComponent,
  ImagesIconComponent,
  LanguagesIconComponent,
  MailIconComponent,
  MapPinIconComponent,
  MessageCircleIconComponent,
  MoonIconComponent,
  PackageIconComponent,
  SearchIconComponent,
  SmartphoneIconComponent,
  StarIconComponent,
  StoreIconComponent,
  SunIconComponent,
  ToggleChipComponent,
  UsersIconComponent,
} from '@eagami/ui';

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  type ElementRef,
  type Type,
  afterNextRender,
  afterRenderEffect,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import type { HomeFeatureId } from '@app/i18n/web-messages.types';

const FEATURE_ICONS: Record<HomeFeatureId, Type<unknown>> = {
  accounts: UsersIconComponent,
  payments: CreditCardIconComponent,
  bookings: CalendarCheckIconComponent,
  events: CalendarDaysIconComponent,
  gallery: ImagesIconComponent,
  reviews: StarIconComponent,
  search: SearchIconComponent,
  cms: Edit2IconComponent,
  languages: LanguagesIconComponent,
  theming: MoonIconComponent,
  analytics: BarChartIconComponent,
  email: MailIconComponent,
  chat: MessageCircleIconComponent,
  maps: MapPinIconComponent,
  pwa: SmartphoneIconComponent,
};

/* Features that fill the demo's content card. Only one fits, so the card shows
   whichever of these was switched on most recently. */
const CONTENT_FEATURES = [
  'accounts',
  'analytics',
  'bookings',
  'events',
  'gallery',
  'maps',
] as const satisfies ReadonlyArray<HomeFeatureId>;

type ContentFeatureId = (typeof CONTENT_FEATURES)[number];

function isContentFeature(id: HomeFeatureId): id is ContentFeatureId {
  return CONTENT_FEATURES.some(feature => feature === id);
}

/* The demo site's own languages, so it shows the same greetings whatever the
   page locale; the first entry repeats at the end for a seamless loop */
const GREETINGS: ReadonlyArray<{ code: string; text: string }> = [
  { code: 'EN', text: 'Hello.' },
  { code: 'FR', text: 'Bonjour.' },
  { code: 'ES', text: 'Hola.' },
  { code: 'PL', text: 'Cześć.' },
  { code: 'DE', text: 'Hallo.' },
  { code: 'EN', text: 'Hello.' },
];

const DEMO_VISITORS = 1284;
const DEMO_RATING = 4.9;
const DEMO_AVATAR_SRC = 'https://i.pravatar.cc/150?img=16';
const BOOKING_DAYS_AHEAD = [1, 2, 3];
const BOOKING_TIMES: ReadonlyArray<[number, number]> = [
  [10, 0],
  [11, 30],
  [14, 0],
];
const EVENT_DAYS_AHEAD = [5, 12, 20];

const DEFAULT_FEATURES: ReadonlyArray<HomeFeatureId> = [
  'accounts',
  'languages',
  'analytics',
];

function daysFromToday(days: number): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date;
}

@Component({
  selector: 'web-home-feature-builder',
  templateUrl: './home-feature-builder.component.html',
  styleUrl: './home-feature-builder.component.scss',
  imports: [
    AvatarComponent,
    ButtonComponent,
    CreditCardIconComponent,
    DownloadIconComponent,
    Edit2IconComponent,
    GlobeIconComponent,
    ImageIconComponent,
    MailIconComponent,
    MapPinIconComponent,
    MessageCircleIconComponent,
    PackageIconComponent,
    RouterLink,
    SearchIconComponent,
    StarIconComponent,
    StoreIconComponent,
    SunIconComponent,
    ToggleChipComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeatureBuilderComponent {
  private readonly i18n = inject(WebI18nService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly featureList =
    viewChild.required<ElementRef<HTMLElement>>('featureList');

  protected readonly chevronLeft = ChevronLeftIconComponent;
  protected readonly chevronRight = ChevronRightIconComponent;

  /** Whether the compact chip row has chips hidden before or after the visible ones */
  protected readonly canScrollBack = signal(false);
  protected readonly canScrollForward = signal(false);

  protected readonly services = computed(() => this.i18n.messages().home.services);
  protected readonly greetings = GREETINGS;
  protected readonly avatarSrc = DEMO_AVATAR_SRC;

  /** Enabled features, oldest first, so the newest content feature can take the spotlight */
  private readonly enabledOrder = signal<ReadonlyArray<HomeFeatureId>>(DEFAULT_FEATURES);

  protected readonly enabled = computed<ReadonlySet<HomeFeatureId>>(
    () => new Set(this.enabledOrder()),
  );

  protected readonly features = computed(() =>
    this.services().features.map(feature => ({
      ...feature,
      icon: FEATURE_ICONS[feature.id],
      on: this.enabled().has(feature.id),
    })),
  );

  /** The feature whose description the compact layout's caption shows */
  private readonly lastToggled = signal<HomeFeatureId | null>(null);

  protected readonly spotlight = computed(() => {
    const id = this.lastToggled() ?? this.enabledOrder().at(-1);
    return this.features().find(feature => feature.id === id) ?? this.features()[0];
  });

  protected readonly panel = computed<ContentFeatureId | 'about'>(
    () => [...this.enabledOrder()].reverse().find(isContentFeature) ?? 'about',
  );

  private readonly locale = computed(() => this.i18n.locale());

  protected readonly visitors = computed(() =>
    new Intl.NumberFormat(this.locale()).format(DEMO_VISITORS),
  );

  protected readonly rating = computed(() =>
    new Intl.NumberFormat(this.locale(), { minimumFractionDigits: 1 }).format(
      DEMO_RATING,
    ),
  );

  protected readonly bookingDays = computed(() => {
    const weekday = new Intl.DateTimeFormat(this.locale(), { weekday: 'short' });
    const day = new Intl.DateTimeFormat(this.locale(), { day: 'numeric' });
    return BOOKING_DAYS_AHEAD.map(offset => {
      const date = daysFromToday(offset);
      return { weekday: weekday.format(date), day: day.format(date) };
    });
  });

  protected readonly bookingTimes = computed(() => {
    const time = new Intl.DateTimeFormat(this.locale(), {
      hour: 'numeric',
      minute: '2-digit',
    });
    return BOOKING_TIMES.map(([hours, minutes]) => {
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return time.format(date);
    });
  });

  protected readonly events = computed(() => {
    const month = new Intl.DateTimeFormat(this.locale(), { month: 'short' });
    const day = new Intl.DateTimeFormat(this.locale(), { day: 'numeric' });
    return this.services().demo.events.map((title, index) => {
      const date = daysFromToday(EVENT_DAYS_AHEAD[index % EVENT_DAYS_AHEAD.length]);
      return { title, month: month.format(date), day: day.format(date) };
    });
  });

  constructor() {
    afterNextRender(() => {
      const observer = new ResizeObserver(() => this.updateScrollState());
      observer.observe(this.featureList().nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });

    // The labels change length with the locale, which changes how far the row scrolls
    afterRenderEffect(() => {
      this.features();
      this.updateScrollState();
    });
  }

  protected updateScrollState(): void {
    const list = this.featureList().nativeElement;
    // RTL scroll offsets run negative from zero, so compare distances
    const scrolled = Math.abs(list.scrollLeft);
    const scrollable = list.scrollWidth - list.clientWidth;
    this.canScrollBack.set(scrolled > 1);
    this.canScrollForward.set(scrolled < scrollable - 1);
  }

  /** Scrolls the chip row by most of its width, so a few chips stay in view for context */
  protected scrollFeatures(direction: 1 | -1): void {
    const list = this.featureList().nativeElement;
    const inline = getComputedStyle(list).direction === 'rtl' ? -1 : 1;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    list.scrollBy({
      left: direction * inline * list.clientWidth * 0.8,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }

  protected setFeature(id: HomeFeatureId, on: boolean): void {
    this.lastToggled.set(id);
    this.enabledOrder.update(order => {
      const rest = order.filter(enabled => enabled !== id);
      return on ? [...rest, id] : rest;
    });
  }
}

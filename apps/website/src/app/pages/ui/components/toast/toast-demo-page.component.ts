import {
  ButtonComponent,
  CheckboxComponent,
  InputComponent,
  PlusIconComponent,
  type ToastPosition,
  ToastService,
  type ToastSize,
  type ToastText,
  type ToastVariant,
  TooltipDirective,
  TrashIconComponent,
} from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import {
  ChangeDetectionStrategy,
  Component,
  type OnDestroy,
  computed,
  inject,
  signal,
} from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';
import { ToastOutletService } from '@app/services/toast-outlet.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { ICON_NONE, iconComponentForSlug, iconKnob } from '../_playground/icon-knob';
import {
  type KnobState,
  type PlaygroundKnob,
  buildKnobs,
  initialKnobState,
} from '../_playground/knob';
import { quoted } from '../_playground/snippet';

const SLUG = 'toast';

// Sentinel that keeps each variant's own icon (the service's default behaviour)
const VARIANT_ICON = 'variant-default';

interface MessageSegmentModel {
  id: number;
  text: string;
  strong: boolean;
}

const DEFAULT_SEGMENTS: readonly Omit<MessageSegmentModel, 'id'>[] = [
  { text: 'Moved ', strong: false },
  { text: 'Q3 roadmap', strong: true },
  { text: ' to ', strong: false },
  { text: 'Archived projects', strong: true },
];

@Component({
  selector: 'web-toast-demo-page',
  templateUrl: './toast-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    CheckboxComponent,
    InputComponent,
    PlusIconComponent,
    TooltipDirective,
    TrashIconComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class ToastDemoPageComponent implements OnDestroy {
  private readonly toastService = inject(ToastService);
  private readonly toastOutlet = inject(ToastOutletService);
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly knobs: PlaygroundKnob[] = [
    ...buildKnobs(PLAYGROUND_KNOBS.toast, UI_API[SLUG]),
    // demoOnly: the title and icon are ToastService.show() arguments, not
    // <ea-toast> inputs, so they must stay out of the generated snippet
    {
      name: 'title',
      control: 'text',
      options: [],
      default: 'Project updated',
      demoOnly: true,
    },
    iconKnob(
      [
        VARIANT_ICON,
        ICON_NONE,
        'bell',
        'heart',
        'star',
        'zap',
        'gift',
        'mail',
        'download',
        'trash-2',
        'shield',
        'rocket',
      ],
      { includeNone: false, default: VARIANT_ICON, demoOnly: true },
    ),
  ];
  protected readonly state = signal<KnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.toast),
  );

  private nextId = 1;
  protected readonly segments = signal<MessageSegmentModel[]>(this.seedSegments());

  /** The `show()` call behind the preview; the outlet markup alone never shows a toast. */
  protected readonly serviceSnippet = computed(() => {
    const rows = this.segments()
      .map(
        ({ text, strong }) =>
          `    { text: ${quoted(text)}${strong ? ', strong: true' : ''} },`,
      )
      .join('\n');
    const message = rows ? `[\n${rows}\n  ]` : '[]';
    const title = this.state()['title'] as string;
    const options = title ? `,\n  { title: ${quoted(title)} }` : '';
    return `toastService.show(\n  ${message}${options},\n);`;
  });

  // The single docs-section outlet lives in the shell; mirror the knobs onto it
  // so the playground can move and declutter the stack without a second outlet.
  constructor() {
    this.syncOutlet();
  }

  ngOnDestroy(): void {
    this.toastOutlet.reset();
  }

  protected showToast(variant: ToastVariant): void {
    const slug = this.state()['icon'] as string;
    this.toastService.show(this.messageText(), {
      title: (this.state()['title'] as string) || undefined,
      variant,
      icon:
        slug === VARIANT_ICON
          ? undefined
          : slug === ICON_NONE
            ? null
            : iconComponentForSlug(slug),
    });
  }

  protected onDirection(direction: 'ltr' | 'rtl'): void {
    this.toastOutlet.setDirection(direction);
  }

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }));
    this.syncOutlet();
  }

  protected reset(): void {
    this.state.set(initialKnobState(this.knobs, PLAYGROUND_KNOBS.toast));
    this.nextId = 1;
    this.segments.set(this.seedSegments());
    this.syncOutlet();
  }

  protected addSegment(): void {
    this.segments.update(segments => [
      ...segments,
      { id: this.nextId++, text: ' new segment', strong: false },
    ]);
  }

  protected removeSegment(id: number): void {
    this.segments.update(segments => segments.filter(segment => segment.id !== id));
  }

  protected updateSegment(id: number, patch: Partial<MessageSegmentModel>): void {
    this.segments.update(segments =>
      segments.map(segment => (segment.id === id ? { ...segment, ...patch } : segment)),
    );
  }

  // Segments run together with nothing between them, so any spacing is part of
  // a segment's own text
  private messageText(): ToastText {
    return this.segments().map(({ text, strong }) => ({ text, strong }));
  }

  private seedSegments(): MessageSegmentModel[] {
    return DEFAULT_SEGMENTS.map(segment => ({ ...segment, id: this.nextId++ }));
  }

  private syncOutlet(): void {
    const current = this.state();
    this.toastOutlet.position.set(current['position'] as ToastPosition);
    this.toastOutlet.size.set(current['size'] as ToastSize);
    this.toastOutlet.clearable.set(current['clearable'] as boolean);
  }
}

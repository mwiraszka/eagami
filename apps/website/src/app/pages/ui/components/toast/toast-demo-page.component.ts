import {
  ButtonComponent,
  type ToastPosition,
  ToastService,
  type ToastSize,
  type ToastVariant,
} from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import {
  ChangeDetectionStrategy,
  Component,
  type OnDestroy,
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

const SLUG = 'toast';

// Sentinel that keeps each variant's own icon (the service's default behaviour)
const VARIANT_ICON = 'variant-default';

@Component({
  selector: 'web-toast-demo-page',
  templateUrl: './toast-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
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
    // demoOnly: the title, message, and icon are ToastService.show() arguments,
    // not <ea-toast> inputs, so they must stay out of the generated snippet
    {
      name: 'title',
      control: 'text',
      options: [],
      default: 'Message title',
      demoOnly: true,
    },
    {
      name: 'message',
      control: 'text',
      options: [],
      default: 'This is the toast message',
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
    this.toastService.show(this.state()['message'] as string, {
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
    this.syncOutlet();
  }

  private syncOutlet(): void {
    const current = this.state();
    this.toastOutlet.position.set(current['position'] as ToastPosition);
    this.toastOutlet.size.set(current['size'] as ToastSize);
    this.toastOutlet.clearable.set(current['clearable'] as boolean);
  }
}

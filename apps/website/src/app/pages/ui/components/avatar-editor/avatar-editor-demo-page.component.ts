import {
  AvatarComponent,
  AvatarEditorComponent,
  type AvatarEditorCropEvent,
  type AvatarEditorShape,
  ToastService,
} from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface AvatarEditorKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  shape: AvatarEditorShape;
  canvasSize: number;
  minZoom: number;
  maxZoom: number;
  loading: boolean;
}

const SLUG = 'avatar-editor';

@Component({
  selector: 'web-avatar-editor-demo-page',
  templateUrl: './avatar-editor-demo-page.component.html',
  styleUrl: './avatar-editor-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AvatarComponent,
    AvatarEditorComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class AvatarEditorDemoPageComponent {
  private readonly toastService = inject(ToastService);
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['avatar-editor'], UI_API[SLUG]);
  protected readonly state = signal<AvatarEditorKnobState>(
    initialKnobState(
      this.knobs,
      PLAYGROUND_KNOBS['avatar-editor'],
    ) as AvatarEditorKnobState,
  );
  protected readonly croppedAvatarUrl = signal('');

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(
      current => ({ ...current, [name]: value }) as AvatarEditorKnobState,
    );
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(
        this.knobs,
        PLAYGROUND_KNOBS['avatar-editor'],
      ) as AvatarEditorKnobState,
    );
  }

  protected onAvatarCropped(event: AvatarEditorCropEvent): void {
    this.croppedAvatarUrl.set(event.dataUrl);
    this.toastService.success(
      this.messages().ui.component.demos.avatarEditorActions.avatarUpdatedToast,
    );
  }
}

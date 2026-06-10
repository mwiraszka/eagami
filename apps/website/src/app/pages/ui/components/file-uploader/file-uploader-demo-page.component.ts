import { FileUploaderComponent } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface FileUploaderKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  accept: string;
  multiple: boolean;
  maxFiles: number;
  maxSize: number;
  showFileList: boolean;
  disabled: boolean;
  required: boolean;
}

const SLUG = 'file-uploader';

@Component({
  selector: 'web-file-uploader-demo-page',
  templateUrl: './file-uploader-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FileUploaderComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class FileUploaderDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS[SLUG], UI_API[SLUG]);
  protected readonly state = signal<FileUploaderKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as FileUploaderKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(
      current => ({ ...current, [name]: value }) as FileUploaderKnobState,
    );
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as FileUploaderKnobState,
    );
  }
}

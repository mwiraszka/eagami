import { TreeComponent, type TreeNode, type TreeSize } from '@eagami/ui';
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

interface TreeKnobState {
  [key: string]: KnobValue;
  size: TreeSize;
  disabled: boolean;
  ariaLabel: string;
}

const SLUG = 'tree';

@Component({
  selector: 'web-tree-demo-page',
  templateUrl: './tree-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TreeComponent, UiComponentDemoLayoutComponent, ComponentPlaygroundComponent],
})
export class TreeDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['tree'], UI_API[SLUG]);
  protected readonly state = signal<TreeKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS['tree']) as TreeKnobState,
  );

  protected readonly extraAttributes = ['[nodes]="nodes"'];

  // File paths are universal proper nouns, so this stays untranslated
  protected readonly nodes: TreeNode[] = [
    {
      id: 'src',
      label: 'src',
      children: [
        {
          id: 'app',
          label: 'app',
          children: [
            { id: 'app.component.ts', label: 'app.component.ts' },
            { id: 'app.component.html', label: 'app.component.html' },
            { id: 'app.routes.ts', label: 'app.routes.ts' },
          ],
        },
        {
          id: 'assets',
          label: 'assets',
          children: [
            { id: 'logo.svg', label: 'logo.svg' },
            { id: 'favicon.ico', label: 'favicon.ico' },
          ],
        },
        { id: 'main.ts', label: 'main.ts' },
        { id: 'index.html', label: 'index.html' },
      ],
    },
    { id: 'package.json', label: 'package.json' },
    { id: 'tsconfig.json', label: 'tsconfig.json' },
  ];

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as TreeKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS['tree']) as TreeKnobState,
    );
  }
}

import {
  ButtonComponent,
  CommandPaletteComponent,
  type CommandPaletteItem,
  ToastService,
} from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  inject,
  signal,
} from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface CommandPaletteKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  placeholder: string;
  emptyMessage: string;
}

const SLUG = 'command-palette';

@Component({
  selector: 'web-command-palette-demo-page',
  templateUrl: './command-palette-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    CommandPaletteComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class CommandPaletteDemoPageComponent {
  private readonly toast = inject(ToastService);
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly open = signal<boolean>(false);
  protected readonly extraAttributes = ['[items]="commands"', '[(open)]="open"'];

  protected readonly knobs = buildKnobs(
    PLAYGROUND_KNOBS['command-palette'],
    UI_API[SLUG],
  );
  protected readonly state = signal<CommandPaletteKnobState>(
    initialKnobState(
      this.knobs,
      PLAYGROUND_KNOBS['command-palette'],
    ) as CommandPaletteKnobState,
  );

  protected readonly commands = computed<CommandPaletteItem[]>(() => {
    const m = this.messages().ui.component.demos.commandPalette;
    return [
      { id: 'new', label: m.newFile, shortcut: 'Ctrl+N', group: m.fileGroup },
      { id: 'open', label: m.openFile, shortcut: 'Ctrl+O', group: m.fileGroup },
      { id: 'save', label: m.save, shortcut: 'Ctrl+S', group: m.fileGroup },
      {
        id: 'find',
        label: m.find,
        shortcut: 'Ctrl+F',
        group: m.editGroup,
        keywords: [m.findKeyword],
      },
      { id: 'replace', label: m.replace, shortcut: 'Ctrl+H', group: m.editGroup },
      { id: 'undo', label: m.undo, shortcut: 'Ctrl+Z', group: m.editGroup },
      {
        id: 'theme',
        label: m.toggleTheme,
        description: m.toggleThemeDescription,
        shortcut: 'Ctrl+T',
      },
      {
        id: 'lock',
        label: m.lockWorkspace,
        description: m.lockWorkspaceDescription,
        disabled: true,
      },
    ];
  });

  @HostListener('document:keydown', ['$event'])
  protected onGlobalKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.open.set(true);
    }
  }

  protected onExecute(item: CommandPaletteItem): void {
    this.toast.success(
      this.messages().ui.component.demos.commandPalette.executedToast(item.label),
    );
  }

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(
      current => ({ ...current, [name]: value }) as CommandPaletteKnobState,
    );
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(
        this.knobs,
        PLAYGROUND_KNOBS['command-palette'],
      ) as CommandPaletteKnobState,
    );
  }
}

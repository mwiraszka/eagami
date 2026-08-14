import {
  ButtonComponent,
  CheckboxComponent,
  CommandPaletteComponent,
  type CommandPaletteItem,
  InputComponent,
  PlusIconComponent,
  ToastService,
  TooltipDirective,
  TrashIconComponent,
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
import { quoted } from '../_playground/snippet';

interface CommandModel {
  id: number;
  label: string;
  description: string;
  shortcut: string;
  group: string;
  disabled: boolean;
}

interface CommandPaletteKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  placeholder: string;
  emptyMessage: string;
}

const SLUG = 'command-palette';

function itemLiteral(item: CommandPaletteItem): string {
  const parts = [`id: ${quoted(item.id)}`, `label: ${quoted(item.label)}`];
  if (item.description) {
    parts.push(`description: ${quoted(item.description)}`);
  }
  if (item.shortcut) {
    parts.push(`shortcut: ${quoted(item.shortcut)}`);
  }
  if (item.group) {
    parts.push(`group: ${quoted(item.group)}`);
  }
  if (item.disabled) {
    parts.push('disabled: true');
  }
  return `{ ${parts.join(', ')} }`;
}

const DEFAULT_COMMANDS: readonly Omit<CommandModel, 'id'>[] = [
  {
    label: 'New file',
    description: '',
    shortcut: 'Ctrl+N',
    group: 'File',
    disabled: false,
  },
  {
    label: 'Open file',
    description: '',
    shortcut: 'Ctrl+O',
    group: 'File',
    disabled: false,
  },
  { label: 'Save', description: '', shortcut: 'Ctrl+S', group: 'File', disabled: false },
  { label: 'Find', description: '', shortcut: 'Ctrl+F', group: 'Edit', disabled: false },
  {
    label: 'Replace',
    description: '',
    shortcut: 'Ctrl+H',
    group: 'Edit',
    disabled: false,
  },
  { label: 'Undo', description: '', shortcut: 'Ctrl+Z', group: 'Edit', disabled: false },
  {
    label: 'Toggle theme',
    description: 'Switch between light and dark mode',
    shortcut: 'Ctrl+T',
    group: '',
    disabled: false,
  },
  {
    label: 'Lock workspace',
    description: 'Currently disabled (feature in beta)',
    shortcut: '',
    group: '',
    disabled: true,
  },
];

@Component({
  selector: 'web-command-palette-demo-page',
  templateUrl: './command-palette-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    CheckboxComponent,
    CommandPaletteComponent,
    InputComponent,
    PlusIconComponent,
    TooltipDirective,
    TrashIconComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class CommandPaletteDemoPageComponent {
  private readonly toast = inject(ToastService);
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly open = signal<boolean>(false);

  /** Snippet `[items]` binding for the playground's generated code, mirroring the live list. */
  protected readonly extraAttributes = computed(() => [
    `[items]="[${this.commands().map(itemLiteral).join(', ')}]"`,
    '[(open)]="open"',
  ]);

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

  private nextId = 1;
  protected readonly items = signal<CommandModel[]>(this.seedItems());

  protected readonly commands = computed<CommandPaletteItem[]>(() =>
    this.items().map(item => ({
      id: `command-${item.id}`,
      label: item.label,
      description: item.description || undefined,
      shortcut: item.shortcut || undefined,
      group: item.group || undefined,
      disabled: item.disabled,
    })),
  );

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
    this.nextId = 1;
    this.items.set(this.seedItems());
  }

  protected addItem(): void {
    this.items.update(items => [
      ...items,
      {
        id: this.nextId++,
        label: 'New command',
        description: '',
        shortcut: '',
        group: '',
        disabled: false,
      },
    ]);
  }

  protected removeItem(id: number): void {
    this.items.update(items => items.filter(item => item.id !== id));
  }

  protected updateItem(id: number, patch: Partial<CommandModel>): void {
    this.items.update(items =>
      items.map(item => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  private seedItems(): CommandModel[] {
    return DEFAULT_COMMANDS.map(item => ({ ...item, id: this.nextId++ }));
  }
}

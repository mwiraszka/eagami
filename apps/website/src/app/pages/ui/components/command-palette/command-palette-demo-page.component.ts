import {
  ButtonComponent,
  CommandPaletteComponent,
  type CommandPaletteItem,
  ToastService,
} from '@eagami/ui';

import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  inject,
  signal,
} from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-command-palette-demo-page',
  templateUrl: './command-palette-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, CommandPaletteComponent, UiComponentDemoLayoutComponent],
})
export class CommandPaletteDemoPageComponent {
  private readonly toast = inject(ToastService);
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly open = signal<boolean>(false);

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
}

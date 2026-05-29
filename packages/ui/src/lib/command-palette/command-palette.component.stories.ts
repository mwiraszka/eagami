import type { Meta, StoryObj } from '@storybook/angular';

import { Component, HostListener, signal } from '@angular/core';

import { ButtonComponent } from '../button/button.component';
import { CommandPaletteComponent } from './command-palette.component';
import type { CommandPaletteItem } from './command-palette.types';

const COMMANDS: CommandPaletteItem[] = [
  { id: 'new', label: 'New file', shortcut: 'Ctrl+N', group: 'File' },
  { id: 'open', label: 'Open file', shortcut: 'Ctrl+O', group: 'File' },
  { id: 'save', label: 'Save', shortcut: 'Ctrl+S', group: 'File' },
  { id: 'save-as', label: 'Save as…', shortcut: 'Ctrl+Shift+S', group: 'File' },
  { id: 'find', label: 'Find', shortcut: 'Ctrl+F', group: 'Edit', keywords: ['search'] },
  { id: 'replace', label: 'Replace', shortcut: 'Ctrl+H', group: 'Edit' },
  { id: 'undo', label: 'Undo', shortcut: 'Ctrl+Z', group: 'Edit' },
  { id: 'redo', label: 'Redo', shortcut: 'Ctrl+Shift+Z', group: 'Edit' },
  {
    id: 'theme',
    label: 'Toggle theme',
    description: 'Switch between light and dark mode',
    shortcut: 'Ctrl+T',
  },
  {
    id: 'lock',
    label: 'Lock workspace',
    description: 'Currently disabled — feature in beta',
    disabled: true,
  },
];

const meta: Meta<CommandPaletteComponent> = {
  title: 'Components/Command Palette',
  component: CommandPaletteComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
  },
  args: {
    items: COMMANDS,
    placeholder: '',
  },
};

export default meta;
type Story = StoryObj<CommandPaletteComponent>;

export const Default: Story = {
  render: args => ({
    props: { ...args, isOpen: false },
    moduleMetadata: { imports: [CommandPaletteComponent, ButtonComponent] },
    template: `
      <ea-button (clicked)="isOpen = true">Open command palette</ea-button>
      <ea-command-palette
        [items]="items"
        [placeholder]="placeholder"
        [(open)]="isOpen" />
    `,
  }),
};

export const WithCustomPlaceholder: Story = {
  args: { placeholder: 'Jump to anywhere…' },
  render: args => ({
    props: { ...args, isOpen: false },
    moduleMetadata: { imports: [CommandPaletteComponent, ButtonComponent] },
    template: `
      <ea-button (clicked)="isOpen = true">Open command palette</ea-button>
      <ea-command-palette
        [items]="items"
        [placeholder]="placeholder"
        [(open)]="isOpen" />
    `,
  }),
};

export const FlatList: Story = {
  args: {
    items: COMMANDS.map(({ group: _group, ...rest }) => rest),
  },
  render: args => ({
    props: { ...args, isOpen: false },
    moduleMetadata: { imports: [CommandPaletteComponent, ButtonComponent] },
    template: `
      <ea-button (clicked)="isOpen = true">Open command palette</ea-button>
      <ea-command-palette [items]="items" [(open)]="isOpen" />
    `,
  }),
};

// Wires Cmd/Ctrl+K to open the palette globally, mirroring the website demo so the
// keyboard shortcut can be inspected in Storybook.
@Component({
  selector: 'ea-command-palette-shortcut-host',
  imports: [CommandPaletteComponent, ButtonComponent],
  template: `
    <p
      style="font-size: 0.875rem; margin: 0 0 0.75rem; color: var(--color-text-secondary);">
      Press <kbd>Cmd</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd> anywhere on this page, or
      click the button below.
    </p>
    <ea-button (clicked)="open.set(true)">Open command palette</ea-button>
    <ea-command-palette
      [items]="items"
      [(open)]="open" />
  `,
})
class CommandPaletteShortcutHost {
  readonly items = COMMANDS;
  readonly open = signal(false);

  @HostListener('document:keydown', ['$event'])
  protected onGlobalKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.open.set(true);
    }
  }
}

export const WithGlobalShortcut: StoryObj<CommandPaletteShortcutHost> = {
  render: () => ({
    template: `<ea-command-palette-shortcut-host></ea-command-palette-shortcut-host>`,
    moduleMetadata: { imports: [CommandPaletteShortcutHost] },
  }),
};

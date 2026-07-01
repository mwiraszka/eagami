import type { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent } from '../button/button.component';
import { CommandPaletteComponent } from './command-palette.component';
import { COMMAND_PALETTE_KNOBS } from './command-palette.component.knobs';
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
    ...COMMAND_PALETTE_KNOBS.argTypes,
    placeholder: { control: 'text' },
  },
  args: {
    ...COMMAND_PALETTE_KNOBS.args,
    items: COMMANDS,
  },
};

export default meta;
type Story = StoryObj<CommandPaletteComponent>;

// `items` and `placeholder` are reachable through the controls, so no hardcoded
// data variants are needed. `open` is an arg so it survives control changes;
// otherwise re-running render would reset a local flag and close the palette
// whenever a knob changes.
export const Playground: Story = {
  args: { open: true },
  argTypes: { open: { control: 'boolean' } },
  render: args => ({
    props: { ...args },
    moduleMetadata: { imports: [CommandPaletteComponent, ButtonComponent] },
    template: `
      <ea-button (clicked)="open = true">Open command palette</ea-button>
      <ea-command-palette
        [items]="items"
        [placeholder]="placeholder"
        [(open)]="open" />
    `,
  }),
};

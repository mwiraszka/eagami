import type { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent } from '../button/button.component';
import { DialogComponent } from './dialog.component';
import { DIALOG_KNOBS } from './dialog.component.knobs';

const meta: Meta<DialogComponent> = {
  title: 'Components/Dialog',
  component: DialogComponent,
  tags: ['autodocs'],
  argTypes: DIALOG_KNOBS.argTypes,
  args: DIALOG_KNOBS.args,
};

export default meta;
type Story = StoryObj<DialogComponent>;

export const Playground: Story = {
  // `open` is an arg so control changes don't reset it and close the dialog.
  args: { open: true },
  argTypes: { open: { control: 'boolean' } },
  render: args => ({
    props: { ...args },
    moduleMetadata: { imports: [DialogComponent, ButtonComponent] },
    template: `
      <ea-button (clicked)="open = true">Open Dialog</ea-button>
      <ea-dialog
        [(open)]="open"
        [width]="width"
        [closeOnBackdrop]="closeOnBackdrop"
        [closeOnEscape]="closeOnEscape"
        [showClose]="showClose">
        <span slot="header">Dialog Title</span>
        <p>This is the dialog body content. You can put anything here.</p>
        <div slot="footer">
          <ea-button variant="secondary" (clicked)="open = false">Cancel</ea-button>
          <ea-button (clicked)="open = false">Confirm</ea-button>
        </div>
      </ea-dialog>
    `,
  }),
};

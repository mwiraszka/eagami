import type { Meta, StoryObj } from '@storybook/angular';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

import { Component, Injector, inject, input, signal } from '@angular/core';

import { ButtonComponent } from '../button/button.component';
import { DialogRef } from './dialog-ref';
import { DialogComponent, type DialogWidth } from './dialog.component';
import { DIALOG_KNOBS } from './dialog.component.knobs';
import { DialogService } from './dialog.service';

@Component({
  selector: 'ea-dialog-story-confirm',
  imports: [ButtonComponent, DialogComponent],
  template: `
    <ea-dialog [width]="width()">
      <span slot="header">Opened from code</span>
      <p>Answer to settle the promise the opener is awaiting.</p>
      <div slot="footer">
        <ea-button
          variant="ghost"
          (clicked)="stack()">
          Open another
        </ea-button>
        <ea-button
          variant="secondary"
          (clicked)="ref.close(false)">
          Cancel
        </ea-button>
        <ea-button (clicked)="ref.close(true)">Confirm</ea-button>
      </div>
    </ea-dialog>
  `,
})
class ConfirmStoryDialog {
  protected readonly ref = inject<DialogRef<boolean>>(DialogRef);
  private readonly dialogs = inject(DialogService);
  private readonly injector = inject(Injector);
  readonly width = input<DialogWidth>('md');

  protected stack(): void {
    this.dialogs.open(ConfirmStoryDialog, {
      inputs: { width: 'sm' },
      injector: this.injector,
    });
  }
}

@Component({
  selector: 'ea-dialog-story-launcher',
  imports: [ButtonComponent],
  template: `
    <div class="story-stack">
      <ea-button (clicked)="launch()">Open from code</ea-button>
      <p role="status">{{ outcome() }}</p>
    </div>
  `,
})
class DialogStoryLauncher {
  private readonly dialogs = inject(DialogService);
  readonly width = input<DialogWidth>('md');
  protected readonly outcome = signal('');

  protected async launch(): Promise<void> {
    const ref = this.dialogs.open<boolean>(ConfirmStoryDialog, {
      inputs: { width: this.width() },
    });
    this.outcome.set(`Resolved with ${String(await ref.result)}`);
  }
}

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
  // `open` is an arg so control changes don't reset it and close the dialog
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

export const InteractionTest: Story = {
  ...Playground,
  tags: ['!autodocs'],
  parameters: { chromatic: { disableSnapshot: true } },
  play: async () => {
    const dialog = await screen.findByRole('dialog');
    await expect(within(dialog).getByText('Dialog Title')).toBeInTheDocument();

    await userEvent.click(within(dialog).getByRole('button', { name: /confirm/i }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  },
};

export const FromCode: Story = {
  render: args => ({
    props: { width: args.width },
    moduleMetadata: { imports: [DialogStoryLauncher] },
    template: `<ea-dialog-story-launcher [width]="width" />`,
  }),
};

export const FromCodeInteractionTest: Story = {
  ...FromCode,
  tags: ['!autodocs'],
  parameters: { chromatic: { disableSnapshot: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: /open from code/i }));
    const dialog = await screen.findByRole('dialog');
    await userEvent.click(within(dialog).getByRole('button', { name: /confirm/i }));

    await waitFor(() =>
      expect(canvas.getByRole('status')).toHaveTextContent('Resolved with true'),
    );
    await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  },
};

import { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent } from '../button/button.component';
import { PopoverComponent } from './popover.component';

const meta: Meta<PopoverComponent> = {
  title: 'Components/Popover',
  component: PopoverComponent,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'right',
      ],
    },
    role: {
      control: 'select',
      options: ['menu', 'listbox', 'dialog', 'tooltip', 'grid'],
    },
    scrollBehavior: {
      control: 'select',
      options: ['reposition', 'close', 'ignore'],
    },
    closeRequested: { action: 'closeRequested' },
  },
  args: {
    placement: 'bottom-start',
    role: 'dialog',
    offset: 4,
    flip: true,
    clamp: true,
    matchAnchorWidth: false,
    closeOnOutsideClick: true,
    closeOnEscape: true,
    scrollBehavior: 'reposition',
  },
};

export default meta;
type Story = StoryObj<PopoverComponent>;

export const Default: Story = {
  render: args => ({
    props: { ...args, open: true },
    moduleMetadata: { imports: [PopoverComponent, ButtonComponent] },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center;">
        <ea-button #trigger variant="secondary">Anchor</ea-button>
        <ea-popover
          [anchor]="trigger"
          [open]="open"
          [placement]="placement"
          [role]="role"
          [offset]="offset"
          [flip]="flip"
          [clamp]="clamp"
          [matchAnchorWidth]="matchAnchorWidth"
          [closeOnOutsideClick]="closeOnOutsideClick"
          [closeOnEscape]="closeOnEscape"
          [scrollBehavior]="scrollBehavior"
          (closeRequested)="closeRequested($event)">
          <div style="
            padding: var(--space-3);
            min-width: 12rem;
            border: var(--border-width-thin) solid var(--color-border-default);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            background-color: var(--color-bg-base);
            color: var(--color-text-primary);
          ">
            Popover content
          </div>
        </ea-popover>
      </div>
    `,
  }),
};

export const MatchAnchorWidth: Story = {
  args: { matchAnchorWidth: true },
  render: Default.render,
};

export const TopPlacement: Story = {
  args: { placement: 'top' },
  render: Default.render,
};

import { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent } from '../button/button.component';
import { MoreHorizontalIconComponent } from '../icons/more-horizontal.component';
import { PencilIconComponent } from '../icons/pencil.component';
import { TrashIconComponent } from '../icons/trash.component';
import { MenuItemComponent } from './menu-item.component';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { MenuComponent } from './menu.component';

const meta: Meta<MenuComponent> = {
  title: 'Components/Menu',
  component: MenuComponent,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
    },
    opened: { action: 'opened' },
    closed: { action: 'closed' },
  },
  args: {
    placement: 'bottom-start',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<MenuComponent>;

export const Default: Story = {
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [MenuComponent, MenuTriggerDirective, MenuItemComponent, ButtonComponent],
    },
    template: `
      <ea-button [eaMenuTrigger]="m" variant="secondary">Actions</ea-button>
      <ea-menu #m [placement]="placement" [disabled]="disabled">
        <ea-menu-item>Edit</ea-menu-item>
        <ea-menu-item>Duplicate</ea-menu-item>
        <ea-menu-item>Archive</ea-menu-item>
        <ea-menu-item variant="danger">Delete</ea-menu-item>
      </ea-menu>
    `,
  }),
};

export const WithIcons: Story = {
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [
        MenuComponent,
        MenuTriggerDirective,
        MenuItemComponent,
        ButtonComponent,
        PencilIconComponent,
        TrashIconComponent,
      ],
    },
    template: `
      <ea-button [eaMenuTrigger]="m" variant="secondary">Actions</ea-button>
      <ea-menu #m [placement]="placement">
        <ea-menu-item>
          <ea-icon-pencil slot="icon" />
          Edit
        </ea-menu-item>
        <ea-menu-item variant="danger">
          <ea-icon-trash slot="icon" />
          Delete
        </ea-menu-item>
      </ea-menu>
    `,
  }),
};

export const IconTrigger: Story = {
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [
        MenuComponent,
        MenuTriggerDirective,
        MenuItemComponent,
        ButtonComponent,
        MoreHorizontalIconComponent,
      ],
    },
    template: `
      <ea-button [eaMenuTrigger]="m" variant="ghost" size="sm" aria-label="More options">
        <ea-icon-more-horizontal />
      </ea-button>
      <ea-menu #m [placement]="placement">
        <ea-menu-item>View</ea-menu-item>
        <ea-menu-item>Rename</ea-menu-item>
        <ea-menu-item variant="danger">Delete</ea-menu-item>
      </ea-menu>
    `,
  }),
};

export const WithDisabledItem: Story = {
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [MenuComponent, MenuTriggerDirective, MenuItemComponent, ButtonComponent],
    },
    template: `
      <ea-button [eaMenuTrigger]="m" variant="secondary">File</ea-button>
      <ea-menu #m [placement]="placement">
        <ea-menu-item>New</ea-menu-item>
        <ea-menu-item>Open</ea-menu-item>
        <ea-menu-item [disabled]="true">Save (unavailable)</ea-menu-item>
        <ea-menu-item>Save As</ea-menu-item>
      </ea-menu>
    `,
  }),
};

export const BottomEnd: Story = {
  args: { placement: 'bottom-end' },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [MenuComponent, MenuTriggerDirective, MenuItemComponent, ButtonComponent],
    },
    template: `
      <ea-button [eaMenuTrigger]="m" variant="secondary">Actions</ea-button>
      <ea-menu #m [placement]="placement">
        <ea-menu-item>Edit</ea-menu-item>
        <ea-menu-item>Share</ea-menu-item>
        <ea-menu-item variant="danger">Delete</ea-menu-item>
      </ea-menu>
    `,
  }),
};

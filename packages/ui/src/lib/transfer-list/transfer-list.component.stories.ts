import type { Meta, StoryObj } from '@storybook/angular';

import { TransferListComponent } from './transfer-list.component';
import { TRANSFER_LIST_KNOBS } from './transfer-list.component.knobs';
import type { TransferListItem } from './transfer-list.types';

const ROLES: TransferListItem[] = [
  { id: 'admin', label: 'Admin' },
  { id: 'editor', label: 'Editor' },
  { id: 'viewer', label: 'Viewer' },
  { id: 'guest', label: 'Guest' },
  { id: 'billing', label: 'Billing' },
  { id: 'owner', label: 'Owner', disabled: true },
];

const meta: Meta<TransferListComponent> = {
  title: 'Components/Transfer List',
  component: TransferListComponent,
  tags: ['autodocs'],
  argTypes: TRANSFER_LIST_KNOBS.argTypes,
  args: {
    ...TRANSFER_LIST_KNOBS.args,
    items: ROLES,
  },
};

export default meta;
type Story = StoryObj<TransferListComponent>;

export const Playground: Story = {
  render: args => ({
    props: args,
    template: `
      <ea-transfer-list
        class="story-medium"
        [items]="items"
        [size]="size"
        [disabled]="disabled"
        [sourceLabel]="sourceLabel"
        [targetLabel]="targetLabel" />
    `,
  }),
};

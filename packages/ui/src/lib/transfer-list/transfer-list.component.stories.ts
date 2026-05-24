import { Meta, StoryObj } from '@storybook/angular';

import { TransferListComponent } from './transfer-list.component';
import { TransferListItem } from './transfer-list.types';

const ROLES: TransferListItem[] = [
  { id: 'admin', label: 'Admin' },
  { id: 'editor', label: 'Editor' },
  { id: 'viewer', label: 'Viewer' },
  { id: 'guest', label: 'Guest' },
  { id: 'billing', label: 'Billing' },
  { id: 'owner', label: 'Owner', disabled: true },
];

const meta: Meta<TransferListComponent> = {
  title: 'Components/TransferList',
  component: TransferListComponent,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    disabled: false,
    items: ROLES,
    sourceLabel: 'Available',
    targetLabel: 'Selected',
  },
};

export default meta;
type Story = StoryObj<TransferListComponent>;

export const Default: Story = {
  render: args => ({
    props: args,
    template: `
      <ea-transfer-list
        class="story-medium"
        [items]="items"
        [sourceLabel]="sourceLabel"
        [targetLabel]="targetLabel"
        [size]="size"
        [disabled]="disabled" />
    `,
  }),
};

export const WithInitialSelection: Story = {
  render: args => ({
    props: { ...args, selectedIds: ['editor', 'viewer'] },
    template: `
      <ea-transfer-list
        class="story-medium"
        [items]="items"
        [sourceLabel]="sourceLabel"
        [targetLabel]="targetLabel"
        [selectedIds]="selectedIds"
        [size]="size"
        [disabled]="disabled" />
    `,
  }),
};

export const WithoutLabels: Story = {
  args: { sourceLabel: '', targetLabel: '' },
  render: args => ({
    props: args,
    template: `
      <ea-transfer-list
        class="story-medium"
        [items]="items"
        [sourceLabel]="sourceLabel"
        [targetLabel]="targetLabel"
        [size]="size"
        [disabled]="disabled" />
    `,
  }),
};

export const Sizes: Story = {
  render: args => ({
    props: args,
    template: `
      <div class="story-stack">
        <div>
          <p class="story-label">Small</p>
          <ea-transfer-list [items]="items" sourceLabel="Available" targetLabel="Selected" size="sm" />
        </div>
        <div>
          <p class="story-label">Medium</p>
          <ea-transfer-list [items]="items" sourceLabel="Available" targetLabel="Selected" size="md" />
        </div>
        <div>
          <p class="story-label">Large</p>
          <ea-transfer-list [items]="items" sourceLabel="Available" targetLabel="Selected" size="lg" />
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: args => ({
    props: { ...args, selectedIds: ['editor'] },
    template: `
      <ea-transfer-list
        class="story-medium"
        [items]="items"
        [sourceLabel]="sourceLabel"
        [targetLabel]="targetLabel"
        [selectedIds]="selectedIds"
        [size]="size"
        [disabled]="disabled" />
    `,
  }),
};

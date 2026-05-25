import { Meta, StoryObj } from '@storybook/angular';

import { VirtualListComponent } from './virtual-list.component';

interface Row {
  id: number;
  label: string;
  detail: string;
}

const LONG_LIST: Row[] = Array.from({ length: 10_000 }, (_, i) => ({
  id: i,
  label: `Item ${i + 1}`,
  detail: `Detail row ${i + 1}`,
}));

const meta: Meta<VirtualListComponent<Row>> = {
  title: 'Components/Virtual list',
  component: VirtualListComponent,
  tags: ['autodocs'],
  argTypes: {
    itemHeight: { control: { type: 'number', min: 20, max: 120, step: 4 } },
    viewportHeight: { control: { type: 'number', min: 100, max: 800, step: 50 } },
    overscan: { control: { type: 'number', min: 0, max: 20 } },
  },
  args: {
    itemHeight: 40,
    viewportHeight: 320,
    overscan: 3,
    items: LONG_LIST,
  },
};

export default meta;
type Story = StoryObj<VirtualListComponent<Row>>;

export const Default: Story = {
  render: args => ({
    props: args,
    template: `
      <ea-virtual-list
        class="story-medium"
        [items]="items"
        [itemHeight]="itemHeight"
        [viewportHeight]="viewportHeight"
        [overscan]="overscan">
        <ng-template #item let-row let-i="index">
          <div class="vl-row">
            <strong>{{ row.label }}</strong>
            <span>{{ row.detail }}</span>
          </div>
        </ng-template>
      </ea-virtual-list>

      <style>
        .vl-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--space-3);
          height: 100%;
          border-bottom: 1px solid var(--color-border-default);
          font-size: var(--font-size-sm);
        }
      </style>
    `,
  }),
};

export const TallRows: Story = {
  args: { itemHeight: 80 },
  render: args => ({
    props: args,
    template: `
      <ea-virtual-list
        class="story-medium"
        [items]="items"
        [itemHeight]="itemHeight"
        [viewportHeight]="viewportHeight"
        [overscan]="overscan">
        <ng-template #item let-row>
          <div class="vl-row-tall">
            <strong>{{ row.label }}</strong>
            <small>{{ row.detail }}</small>
          </div>
        </ng-template>
      </ea-virtual-list>

      <style>
        .vl-row-tall {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 var(--space-3);
          height: 100%;
          border-bottom: 1px solid var(--color-border-default);
        }
      </style>
    `,
  }),
};

export const TinyList: Story = {
  args: {
    items: LONG_LIST.slice(0, 4),
  },
  render: args => ({
    props: args,
    template: `
      <ea-virtual-list
        class="story-medium"
        [items]="items"
        [itemHeight]="itemHeight"
        [viewportHeight]="viewportHeight"
        [overscan]="overscan">
        <ng-template #item let-row>
          <div style="display: flex; align-items: center; height: 100%; padding: 0 12px;">
            {{ row.label }}
          </div>
        </ng-template>
      </ea-virtual-list>
    `,
  }),
};

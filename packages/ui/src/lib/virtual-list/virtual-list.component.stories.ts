import type { Meta, StoryObj } from '@storybook/angular';

import { VirtualListComponent } from './virtual-list.component';
import { VIRTUAL_LIST_KNOBS } from './virtual-list.component.knobs';

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

const meta: Meta<VirtualListComponent> = {
  title: 'Components/Virtual List',
  component: VirtualListComponent,
  tags: ['autodocs'],
  argTypes: VIRTUAL_LIST_KNOBS.argTypes,
  args: {
    ...VIRTUAL_LIST_KNOBS.args,
    items: LONG_LIST,
  },
};

export default meta;
type Story = StoryObj<VirtualListComponent>;

export const Playground: Story = {
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

import type { Meta, StoryObj } from '@storybook/angular';

import { Component, signal } from '@angular/core';

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

// Mirrors the website's "row X of Y" readout, pairing `(scrollIndexChange)` with the list
@Component({
  selector: 'ea-virtual-list-scroll-host',
  imports: [VirtualListComponent],
  template: `
    <p
      style="font-size: 0.875rem; margin: 0 0 0.5rem; color: var(--color-text-secondary);">
      Showing row {{ visibleIndex() + 1 }} of {{ items.length }}
    </p>
    <ea-virtual-list
      class="story-medium"
      [items]="items"
      [itemHeight]="40"
      [viewportHeight]="320"
      (scrollIndexChange)="visibleIndex.set($event)">
      <ng-template
        #item
        let-row>
        <div
          style="display: flex; align-items: center; justify-content: space-between; height: 100%; padding: 0 12px; border-bottom: 1px solid var(--color-border-subtle); font-size: 0.875rem;">
          <strong>{{ row.label }}</strong>
          <span>{{ row.detail }}</span>
        </div>
      </ng-template>
    </ea-virtual-list>
  `,
})
class VirtualListScrollHost {
  readonly items = LONG_LIST;
  readonly visibleIndex = signal(0);
}

export const WithScrollIndicator: StoryObj<VirtualListScrollHost> = {
  render: () => ({
    template: `<ea-virtual-list-scroll-host></ea-virtual-list-scroll-host>`,
    moduleMetadata: { imports: [VirtualListScrollHost] },
  }),
};

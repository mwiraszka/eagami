import type { Meta, StoryObj } from '@storybook/angular';

import { TreeComponent } from './tree.component';
import { TREE_KNOBS } from './tree.component.knobs';
import type { TreeNode } from './tree.types';

const FILE_TREE: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'app',
        label: 'app',
        children: [
          { id: 'app.component.ts', label: 'app.component.ts' },
          { id: 'app.component.html', label: 'app.component.html' },
          { id: 'app.routes.ts', label: 'app.routes.ts' },
        ],
      },
      {
        id: 'assets',
        label: 'assets',
        children: [
          { id: 'logo.svg', label: 'logo.svg' },
          { id: 'favicon.ico', label: 'favicon.ico' },
        ],
      },
      { id: 'main.ts', label: 'main.ts' },
      { id: 'index.html', label: 'index.html' },
    ],
  },
  {
    id: 'package.json',
    label: 'package.json',
  },
  {
    id: 'tsconfig.json',
    label: 'tsconfig.json',
  },
];

const meta: Meta<TreeComponent> = {
  title: 'Components/Tree',
  component: TreeComponent,
  tags: ['autodocs'],
  argTypes: TREE_KNOBS.argTypes,
  args: {
    ...TREE_KNOBS.args,
    nodes: FILE_TREE,
  },
};

export default meta;
type Story = StoryObj<TreeComponent>;

export const Default: Story = {
  render: args => ({
    props: { ...args, expandedIds: ['src'] },
    template: `
      <ea-tree
        class="story-medium"
        aria-label="File tree"
        [nodes]="nodes"
        [expandedIds]="expandedIds"
        [size]="size"
        [disabled]="disabled" />
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: { nodes: FILE_TREE.slice(0, 1) },
    template: `
      <div class="story-stack">
        <div>
          <p class="story-label">Extra small</p>
          <ea-tree aria-label="Extra small tree" [nodes]="nodes" [expandedIds]="['src']" size="xs" />
        </div>
        <div>
          <p class="story-label">Small</p>
          <ea-tree aria-label="Small tree" [nodes]="nodes" [expandedIds]="['src']" size="sm" />
        </div>
        <div>
          <p class="story-label">Medium</p>
          <ea-tree aria-label="Medium tree" [nodes]="nodes" [expandedIds]="['src']" size="md" />
        </div>
        <div>
          <p class="story-label">Large</p>
          <ea-tree aria-label="Large tree" [nodes]="nodes" [expandedIds]="['src']" size="lg" />
        </div>
        <div>
          <p class="story-label">Extra large</p>
          <ea-tree aria-label="Extra large tree" [nodes]="nodes" [expandedIds]="['src']" size="xl" />
        </div>
      </div>
    `,
  }),
};

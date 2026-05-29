import type { Meta, StoryObj } from '@storybook/angular';

import { TreeComponent } from './tree.component';
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

const ORG_CHART: TreeNode[] = [
  {
    id: 'ceo',
    label: 'CEO',
    children: [
      {
        id: 'cto',
        label: 'CTO',
        children: [
          { id: 'eng-mgr', label: 'Engineering Manager' },
          { id: 'principal', label: 'Principal Engineer' },
        ],
      },
      {
        id: 'cfo',
        label: 'CFO',
        children: [
          { id: 'controller', label: 'Controller' },
          { id: 'finance-lead', label: 'Finance Lead', disabled: true },
        ],
      },
    ],
  },
];

const meta: Meta<TreeComponent> = {
  title: 'Components/Tree',
  component: TreeComponent,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    disabled: false,
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

export const FullyExpanded: Story = {
  render: args => ({
    props: { ...args, expandedIds: ['src', 'app', 'assets'] },
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

export const WithSelection: Story = {
  render: args => ({
    props: { ...args, selectedId: 'app.component.ts', expandedIds: ['src', 'app'] },
    template: `
      <ea-tree
        class="story-medium"
        aria-label="File tree"
        [nodes]="nodes"
        [selectedId]="selectedId"
        [expandedIds]="expandedIds"
        [size]="size"
        [disabled]="disabled" />
    `,
  }),
};

export const WithDisabledNode: Story = {
  args: { nodes: ORG_CHART },
  render: args => ({
    props: { ...args, expandedIds: ['ceo', 'cto', 'cfo'] },
    template: `
      <ea-tree
        class="story-medium"
        aria-label="Org chart"
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
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
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

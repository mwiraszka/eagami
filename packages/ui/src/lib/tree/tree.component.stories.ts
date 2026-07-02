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

export const Playground: Story = {
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

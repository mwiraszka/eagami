import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ButtonComponent } from '../button/button.component';
import { FileIconComponent } from '../icons/file.component';
import { SearchIconComponent } from '../icons/search.component';
import { EmptyStateComponent } from './empty-state.component';

const meta: Meta<EmptyStateComponent> = {
  title: 'Components/Empty state',
  component: EmptyStateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, FileIconComponent, SearchIconComponent],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    title: 'No items yet',
    description: 'Get started by creating your first item.',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<EmptyStateComponent>;

export const Default: Story = {
  render: args => ({
    props: args,
    template: `
      <ea-empty-state [title]="title" [description]="description" [size]="size">
        <ea-icon-file slot="media" />
        <ea-button slot="actions" variant="primary">
          Create item
        </ea-button>
      </ea-empty-state>
    `,
  }),
};

export const NoResults: Story = {
  render: () => ({
    template: `
      <ea-empty-state
        title="No results found"
        description="Try adjusting your search or filter to find what you're looking for.">
        <ea-icon-search slot="media" />
        <ea-button slot="actions" variant="secondary">
          Clear filters
        </ea-button>
      </ea-empty-state>
    `,
  }),
};

export const TitleOnly: Story = {
  render: () => ({
    template: `<ea-empty-state title="Nothing to see here" />`,
  }),
};

export const WithoutMedia: Story = {
  render: () => ({
    template: `
      <ea-empty-state
        title="No notifications"
        description="When you have new updates, they'll show up here." />
    `,
  }),
};

export const TwoActions: Story = {
  render: () => ({
    template: `
      <ea-empty-state
        title="No projects yet"
        description="Create a project from scratch or import one from GitHub.">
        <ea-icon-file slot="media" />
        <ea-button slot="actions" variant="primary">
          New project
        </ea-button>
        <ea-button slot="actions" variant="secondary">
          Import
        </ea-button>
      </ea-empty-state>
    `,
  }),
};

export const Small: Story = {
  args: { size: 'sm' },
  render: args => ({
    props: args,
    template: `
      <ea-empty-state [title]="title" [description]="description" [size]="size">
        <ea-icon-file slot="media" />
      </ea-empty-state>
    `,
  }),
};

export const Large: Story = {
  args: { size: 'lg' },
  render: args => ({
    props: args,
    template: `
      <ea-empty-state [title]="title" [description]="description" [size]="size">
        <ea-icon-file slot="media" />
        <ea-button slot="actions" variant="primary">
          Get started
        </ea-button>
      </ea-empty-state>
    `,
  }),
};

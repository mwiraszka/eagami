import type { Meta, StoryObj } from '@storybook/angular';

import { PaginatorComponent } from './paginator.component';
import { PAGINATOR_KNOBS } from './paginator.component.knobs';

const meta: Meta<PaginatorComponent> = {
  title: 'Components/Paginator',
  component: PaginatorComponent,
  tags: ['autodocs'],
  argTypes: PAGINATOR_KNOBS.argTypes,
  args: PAGINATOR_KNOBS.args,
};

export default meta;
type Story = StoryObj<PaginatorComponent>;

export const Default: Story = {};

export const MiddlePage: Story = {
  args: { page: 5 },
};

export const LastPage: Story = {
  args: { page: 10 },
};

export const FewPages: Story = {
  args: { totalItems: 30, pageSize: 10 },
};

export const ManyPages: Story = {
  args: { totalItems: 500, page: 25 },
};

export const WithoutPageSizeSelector: Story = {
  args: { showPageSizeSelector: false },
};

export const WithoutRangeLabel: Story = {
  args: { showRangeLabel: false },
};

export const Minimal: Story = {
  args: {
    showPageSizeSelector: false,
    showRangeLabel: false,
  },
};

export const CustomPageSizes: Story = {
  args: {
    pageSizeOptions: [5, 15, 30],
    pageSize: 5,
    totalItems: 75,
  },
};

export const Disabled: Story = {
  args: { disabled: true, page: 3 },
};

export const SinglePage: Story = {
  args: { totalItems: 5, pageSize: 10 },
};

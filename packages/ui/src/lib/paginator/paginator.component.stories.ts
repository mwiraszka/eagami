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

export const Playground: Story = {};

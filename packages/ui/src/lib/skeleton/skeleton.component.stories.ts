import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { SkeletonComponent } from './skeleton.component';
import { SKELETON_KNOBS } from './skeleton.component.knobs';

const meta: Meta<SkeletonComponent> = {
  title: 'Components/Skeleton',
  component: SkeletonComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-skeleton ${argsToTemplate(args)}></ea-skeleton>`,
  }),
  argTypes: SKELETON_KNOBS.argTypes,
  args: SKELETON_KNOBS.args,
};

export default meta;
type Story = StoryObj<SkeletonComponent>;

export const Playground: Story = {};

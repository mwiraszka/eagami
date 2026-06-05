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

export const Text: Story = {
  args: { variant: 'text', width: '', height: '' },
};

export const Circle: Story = {
  args: { variant: 'circle', width: '', height: '' },
};

export const Rect: Story = {
  args: { variant: 'rect', width: '', height: '' },
};

export const CustomSize: Story = {
  args: { width: '200px', height: '120px' },
};

export const NotAnimated: Story = {
  args: { animated: false, width: '', height: '' },
};

export const CardPlaceholder: Story = {
  render: () => ({
    template: `
      <div class="story-skeleton-card">
        <div class="story-skeleton-row">
          <ea-skeleton variant="circle"></ea-skeleton>
          <div class="story-skeleton-lines">
            <ea-skeleton width="60%"></ea-skeleton>
            <ea-skeleton width="40%" height="0.75rem"></ea-skeleton>
          </div>
        </div>
        <ea-skeleton variant="rect" height="8rem"></ea-skeleton>
        <ea-skeleton></ea-skeleton>
        <ea-skeleton width="75%"></ea-skeleton>
      </div>
    `,
  }),
};

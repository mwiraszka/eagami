import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { AvatarComponent } from './avatar.component';
import { AVATAR_KNOBS } from './avatar.component.knobs';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-avatar ${argsToTemplate(args)} />`,
  }),
  argTypes: AVATAR_KNOBS.argTypes,
  args: AVATAR_KNOBS.args,
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-row">
        <ea-avatar size="xs" initials="XS" />
        <ea-avatar size="sm" initials="SM" />
        <ea-avatar size="md" initials="MD" />
        <ea-avatar size="lg" initials="LG" />
        <ea-avatar size="xl" initials="XL" />
      </div>
    `,
  }),
};

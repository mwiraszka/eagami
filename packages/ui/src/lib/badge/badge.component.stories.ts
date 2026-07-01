import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { BadgeComponent } from './badge.component';
import { BADGE_KNOBS } from './badge.component.knobs';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-badge ${argsToTemplate(args)}>Badge</ea-badge>`,
  }),
  argTypes: BADGE_KNOBS.argTypes,
  args: BADGE_KNOBS.args,
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="story-row">
        <ea-badge variant="default">Default</ea-badge>
        <ea-badge variant="success">Success</ea-badge>
        <ea-badge variant="warning">Warning</ea-badge>
        <ea-badge variant="error">Error</ea-badge>
        <ea-badge variant="info">Info</ea-badge>
      </div>
    `,
  }),
};

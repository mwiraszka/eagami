import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { TagComponent } from './tag.component';
import { TAG_KNOBS } from './tag.component.knobs';

const meta: Meta<TagComponent> = {
  title: 'Components/Tag',
  component: TagComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-tag ${argsToTemplate(args)}>TypeScript</ea-tag>`,
  }),
  argTypes: TAG_KNOBS.argTypes,
  args: TAG_KNOBS.args,
};

export default meta;
type Story = StoryObj<TagComponent>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="story-row story-row--sm">
        <ea-tag variant="default">Default</ea-tag>
        <ea-tag variant="success">Success</ea-tag>
        <ea-tag variant="warning">Warning</ea-tag>
        <ea-tag variant="error">Error</ea-tag>
        <ea-tag variant="info">Info</ea-tag>
      </div>
    `,
  }),
};

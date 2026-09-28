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

export const Playground: Story = {};

export const ThemeColor: Story = {
  render: () => ({
    template: `
      <ea-tag color="var(--color-brand-default)" ink="var(--color-neutral-0)">Brand</ea-tag>
    `,
  }),
};

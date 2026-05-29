import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { DividerComponent } from './divider.component';

const meta: Meta<DividerComponent> = {
  title: 'Components/Divider',
  component: DividerComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-divider ${argsToTemplate(args)} />`,
  }),
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<DividerComponent>;

export const Horizontal: Story = {};

export const WithLabel: Story = {
  args: { label: 'OR' },
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: args => ({
    props: args,
    template: `
      <div class="story-row">
        <span>Left</span>
        <ea-divider ${argsToTemplate(args)} />
        <span>Right</span>
      </div>
    `,
  }),
};

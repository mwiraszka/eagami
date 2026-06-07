import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { DividerComponent } from './divider.component';
import { DIVIDER_KNOBS } from './divider.component.knobs';

const meta: Meta<DividerComponent> = {
  title: 'Components/Divider',
  component: DividerComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-divider ${argsToTemplate(args)} />`,
  }),
  argTypes: DIVIDER_KNOBS.argTypes,
  args: DIVIDER_KNOBS.args,
};

export default meta;
type Story = StoryObj<DividerComponent>;

export const Horizontal: Story = {};

export const Thick: Story = {
  args: { thick: true },
};

export const WithLabel: Story = {
  args: { label: 'OR' },
};

export const Vertical: Story = {
  args: { orientation: 'vertical', label: undefined },
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

export const VerticalWithLabel: Story = {
  args: { orientation: 'vertical', label: 'OR' },
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

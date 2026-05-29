import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { EagamiWordmarkComponent } from './eagami-wordmark.component';

const meta: Meta<EagamiWordmarkComponent> = {
  title: 'Components/Eagami Wordmark',
  component: EagamiWordmarkComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-eagami-wordmark ${argsToTemplate(args)}></ea-eagami-wordmark>`,
  }),
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [1, 2, 3],
    },
    layout: {
      control: 'inline-radio',
      options: ['stacked', 'inline'],
    },
    size: {
      control: { type: 'number', min: 16, step: 8 },
    },
  },
  args: {
    variant: 1,
    layout: 'stacked',
    size: 32,
  },
};

export default meta;
type Story = StoryObj<EagamiWordmarkComponent>;

export const Default: Story = {};

export const HandcraftedBy: Story = {
  args: { variant: 2 },
};

export const Full: Story = {
  args: { variant: 3 },
};

export const Small: Story = {
  args: { size: 32 },
};

export const Large: Story = {
  args: { size: 96 },
};

export const InlineHandcraftedBy: Story = {
  args: { variant: 2, layout: 'inline' },
};

export const InlineFull: Story = {
  args: { variant: 3, layout: 'inline' },
};

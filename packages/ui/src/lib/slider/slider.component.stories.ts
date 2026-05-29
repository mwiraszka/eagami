import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { SliderComponent } from './slider.component';

const meta: Meta<SliderComponent> = {
  title: 'Components/Slider',
  component: SliderComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-slider ${argsToTemplate(args)} />`,
  }),
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    changed: { action: 'changed' },
  },
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    value: 40,
    showValue: true,
    showMinMaxLabels: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<SliderComponent>;

export const Default: Story = {};

export const WithMinMaxLabels: Story = {
  args: { showMinMaxLabels: true },
};

export const WithHint: Story = {
  args: { hint: 'Drag the handle or use arrow keys to adjust' },
};

export const WithError: Story = {
  args: { errorMsg: 'Please pick a value above 50' },
};

export const WithExternalError: Story = {
  args: { hasError: true, hint: 'Error message lives outside the slider' },
};

export const Stepped: Story = {
  args: { min: 0, max: 10, step: 1 },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack">
        <ea-slider size="sm" label="Small" [value]="30" [showValue]="true" />
        <ea-slider size="md" label="Medium" [value]="50" [showValue]="true" />
        <ea-slider size="lg" label="Large" [value]="70" [showValue]="true" />
      </div>
    `,
  }),
};

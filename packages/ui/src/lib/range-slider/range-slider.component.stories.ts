import { Meta, StoryObj, argsToTemplate } from '@storybook/angular';

import { RangeSliderComponent } from './range-slider.component';

const meta: Meta<RangeSliderComponent> = {
  title: 'Components/RangeSlider',
  component: RangeSliderComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-range-slider ${argsToTemplate(args)} />`,
  }),
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    changed: { action: 'changed' },
  },
  args: {
    label: 'Price range',
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    value: [20, 80],
    showValue: true,
    showMinMaxLabels: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<RangeSliderComponent>;

export const Default: Story = {};

export const WithMinMaxLabels: Story = {
  args: { showMinMaxLabels: true },
};

export const WithHint: Story = {
  args: { hint: 'Drag either thumb or use arrow keys to adjust the range' },
};

export const WithError: Story = {
  args: {
    errorMsg: 'Range must span at least 30',
    value: [40, 50],
  },
};

export const Stepped: Story = {
  args: {
    min: 0,
    max: 10,
    step: 1,
    value: [3, 7],
    showMinMaxLabels: true,
  },
};

export const Disabled: Story = {
  args: { disabled: true, value: [25, 75] },
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
        <ea-range-slider size="sm" label="Small" [value]="[20, 60]" [showValue]="true" />
        <ea-range-slider size="md" label="Medium" [value]="[30, 70]" [showValue]="true" />
        <ea-range-slider size="lg" label="Large" [value]="[40, 80]" [showValue]="true" />
      </div>
    `,
  }),
};

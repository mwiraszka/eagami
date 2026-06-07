import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { RangeSliderComponent } from './range-slider.component';
import { RANGE_SLIDER_KNOBS } from './range-slider.component.knobs';

const meta: Meta<RangeSliderComponent> = {
  title: 'Components/Range Slider',
  component: RangeSliderComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-range-slider ${argsToTemplate(args)} />`,
  }),
  argTypes: RANGE_SLIDER_KNOBS.argTypes,
  args: RANGE_SLIDER_KNOBS.args,
};

export default meta;
type Story = StoryObj<RangeSliderComponent>;

export const Default: Story = {
  args: { value: [20, 80] },
};

export const WithMinMaxLabels: Story = {
  args: { showMinMaxLabels: true },
};

export const WithHint: Story = {
  args: { hint: 'Drag either thumb or use arrow keys to adjust the range' },
};

export const WithError: Story = {
  args: { errorMsg: 'Range must span at least 30' },
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
        <ea-range-slider size="xs" label="Extra small" [value]="[10, 50]" [showValue]="true" />
        <ea-range-slider size="sm" label="Small" [value]="[20, 60]" [showValue]="true" />
        <ea-range-slider size="md" label="Medium" [value]="[30, 70]" [showValue]="true" />
        <ea-range-slider size="lg" label="Large" [value]="[40, 80]" [showValue]="true" />
        <ea-range-slider size="xl" label="Extra large" [value]="[50, 90]" [showValue]="true" />
      </div>
    `,
  }),
};

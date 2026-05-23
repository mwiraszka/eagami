import { Meta, StoryObj, argsToTemplate } from '@storybook/angular';

import { ColorPickerComponent } from './color-picker.component';

const meta: Meta<ColorPickerComponent> = {
  title: 'Components/Color picker',
  component: ColorPickerComponent,
  tags: ['autodocs'],
  parameters: {
    docs: { story: { height: '36rem' } },
  },
  render: args => ({
    props: args,
    template: `<ea-color-picker ${argsToTemplate(args)} class="story-narrow"></ea-color-picker>`,
  }),
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    format: {
      control: 'select',
      options: ['hex', 'rgb', 'hsl'],
    },
    changed: { action: 'changed' },
  },
  args: {
    label: 'Color',
    placeholder: 'Pick a color…',
    size: 'md',
    format: 'hex',
    showAlpha: true,
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<ColorPickerComponent>;

export const Default: Story = {};

export const WithInitialValue: Story = {
  args: {
    value: '#3674a1',
  },
};

export const WithHint: Story = {
  args: {
    hint: 'Used as the primary brand color.',
  },
};

export const WithError: Story = {
  args: {
    errorMsg: 'This field is required.',
  },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const NoAlpha: Story = {
  args: { showAlpha: false },
};

export const RgbFormat: Story = {
  args: { format: 'rgb' },
};

export const HslFormat: Story = {
  args: { format: 'hsl' },
};

export const TranslucentValue: Story = {
  args: { value: 'rgba(54, 116, 161, 0.5)' },
};

export const CustomPresets: Story = {
  args: {
    value: '#0ea5e9',
    presets: [
      '#0ea5e9',
      '#22c55e',
      '#f59e0b',
      '#ef4444',
      '#8b5cf6',
      '#ec4899',
    ] as readonly string[],
  },
};

export const NoPresets: Story = {
  args: { presets: [] as readonly string[] },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack story-narrow">
        <ea-color-picker size="sm" label="Small" value="#ef4444"></ea-color-picker>
        <ea-color-picker size="md" label="Medium" value="#22c55e"></ea-color-picker>
        <ea-color-picker size="lg" label="Large" value="#3b82f6"></ea-color-picker>
      </div>
    `,
  }),
};

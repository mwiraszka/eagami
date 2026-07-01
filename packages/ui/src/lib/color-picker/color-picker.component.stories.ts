import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { ColorPickerComponent } from './color-picker.component';
import { COLOR_PICKER_KNOBS } from './color-picker.component.knobs';

const meta: Meta<ColorPickerComponent> = {
  title: 'Components/Color Picker',
  component: ColorPickerComponent,
  tags: ['autodocs'],
  parameters: {
    docs: { story: { height: '36rem' } },
  },
  render: args => ({
    props: args,
    template: `<ea-color-picker ${argsToTemplate(args)} class="story-narrow"></ea-color-picker>`,
  }),
  argTypes: COLOR_PICKER_KNOBS.argTypes,
  args: COLOR_PICKER_KNOBS.args,
};

export default meta;
type Story = StoryObj<ColorPickerComponent>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack story-narrow">
        <ea-color-picker size="xs" label="Extra small" value="#f97316"></ea-color-picker>
        <ea-color-picker size="sm" label="Small" value="#ef4444"></ea-color-picker>
        <ea-color-picker size="md" label="Medium" value="#22c55e"></ea-color-picker>
        <ea-color-picker size="lg" label="Large" value="#3b82f6"></ea-color-picker>
        <ea-color-picker size="xl" label="Extra large" value="#8b5cf6"></ea-color-picker>
      </div>
    `,
  }),
};

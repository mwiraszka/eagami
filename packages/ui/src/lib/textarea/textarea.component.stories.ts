import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { TextareaComponent } from './textarea.component';
import { TEXTAREA_KNOBS } from './textarea.component.knobs';

const meta: Meta<TextareaComponent> = {
  title: 'Components/Textarea',
  component: TextareaComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-textarea ${argsToTemplate(args)} class="story-narrow"></ea-textarea>`,
  }),
  argTypes: TEXTAREA_KNOBS.argTypes,
  args: TEXTAREA_KNOBS.args,
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: 'Maximum 500 characters.',
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

export const ReadOnly: Story = {
  args: {
    readonly: true,
    value: 'This content cannot be edited.',
  },
};

export const NoResize: Story = {
  args: { resize: 'none' },
};

export const WithMaxlength: Story = {
  args: { maxlength: 100 },
};

export const WithMaxHeight: Story = {
  args: {
    label: 'Notes',
    hint: 'Caps at 200px; the field scrolls vertically beyond that.',
    maxHeight: 200,
    value:
      'Type a long enough message that the textarea would normally grow past 200px. Once it hits the cap, the textarea stops growing and the field scrolls vertically instead.',
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack story-narrow">
        <ea-textarea size="xs" label="Extra small" placeholder="Extra small textarea"></ea-textarea>
        <ea-textarea size="sm" label="Small" placeholder="Small textarea"></ea-textarea>
        <ea-textarea size="md" label="Medium" placeholder="Medium textarea"></ea-textarea>
        <ea-textarea size="lg" label="Large" placeholder="Large textarea"></ea-textarea>
        <ea-textarea size="xl" label="Extra large" placeholder="Extra large textarea"></ea-textarea>
      </div>
    `,
  }),
};

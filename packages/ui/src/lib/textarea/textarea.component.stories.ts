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

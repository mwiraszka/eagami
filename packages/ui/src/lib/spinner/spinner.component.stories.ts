import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { SpinnerComponent } from './spinner.component';
import { SPINNER_KNOBS } from './spinner.component.knobs';

const meta: Meta<SpinnerComponent> = {
  title: 'Components/Spinner',
  component: SpinnerComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-spinner ${argsToTemplate(args)} />`,
  }),
  argTypes: SPINNER_KNOBS.argTypes,
  args: SPINNER_KNOBS.args,
};

export default meta;
type Story = StoryObj<SpinnerComponent>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const CustomLabel: Story = {
  args: { label: 'Please wait...' },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-row">
        <ea-spinner size="xs" />
        <ea-spinner size="sm" />
        <ea-spinner size="md" />
        <ea-spinner size="lg" />
        <ea-spinner size="xl" />
      </div>
    `,
  }),
};

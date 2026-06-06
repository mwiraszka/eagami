import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { ProgressBarComponent } from './progress-bar.component';
import { PROGRESS_BAR_KNOBS } from './progress-bar.component.knobs';

const meta: Meta<ProgressBarComponent> = {
  title: 'Components/Progress Bar',
  component: ProgressBarComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-progress-bar ${argsToTemplate(args)} />`,
  }),
  argTypes: PROGRESS_BAR_KNOBS.argTypes,
  args: PROGRESS_BAR_KNOBS.args,
};

export default meta;
type Story = StoryObj<ProgressBarComponent>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: 'Uploading files', showPercentage: true, value: 72 },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Processing…' },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="story-stack story-medium">
        <ea-progress-bar variant="default" [value]="60" label="Default" [showPercentage]="true" />
        <ea-progress-bar variant="success" [value]="100" label="Success" [showPercentage]="true" />
        <ea-progress-bar variant="warning" [value]="45" label="Warning" [showPercentage]="true" />
        <ea-progress-bar variant="error" [value]="20" label="Error" [showPercentage]="true" />
        <ea-progress-bar variant="info" [value]="80" label="Info" [showPercentage]="true" />
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack story-medium">
        <ea-progress-bar size="sm" [value]="60" label="Small" />
        <ea-progress-bar size="md" [value]="60" label="Medium" />
        <ea-progress-bar size="lg" [value]="60" label="Large" />
      </div>
    `,
  }),
};

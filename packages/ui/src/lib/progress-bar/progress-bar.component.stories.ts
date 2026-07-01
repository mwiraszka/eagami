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

export const Playground: Story = {};

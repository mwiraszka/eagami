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

export const Playground: Story = {};

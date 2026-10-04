import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE } from '../../label-icon-story';
import { CodeInputComponent } from './code-input.component';
import { CODE_INPUT_KNOBS } from './code-input.component.knobs';

const meta: Meta<CodeInputComponent> = {
  title: 'Components/Code Input',
  component: CodeInputComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-code-input ${argsToTemplate(args)}></ea-code-input>`,
  }),
  argTypes: {
    ...CODE_INPUT_KNOBS.argTypes,
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
  },
  args: CODE_INPUT_KNOBS.args,
};

export default meta;
type Story = StoryObj<CodeInputComponent>;

export const Playground: Story = {};

export const LabelledByExternalLabel: Story = {
  render: () => ({
    template: `<span id="code-label">Verification code</span><ea-code-input aria-labelledby="code-label"></ea-code-input>`,
  }),
};

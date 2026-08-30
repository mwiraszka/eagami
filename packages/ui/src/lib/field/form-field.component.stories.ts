import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE, LABEL_ICON_STORY_NONE } from '../label-icon-story';
import { FormFieldComponent } from './form-field.component';
import { FORM_FIELD_KNOBS } from './form-field.component.knobs';

const meta: Meta<FormFieldComponent> = {
  title: 'Components/Form Field',
  component: FormFieldComponent,
  tags: ['autodocs'],
  parameters: {
    docs: { story: { height: '8rem' } },
  },
  render: args => ({
    props: args,
    template: `<ea-form-field ${argsToTemplate(args)}>
      <input type="email" placeholder="you@example.com" />
    </ea-form-field>`,
  }),
  argTypes: {
    ...FORM_FIELD_KNOBS.argTypes,
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
  },
  args: { ...FORM_FIELD_KNOBS.args, labelIcon: LABEL_ICON_STORY_NONE },
};

export default meta;
type Story = StoryObj<FormFieldComponent>;

export const Playground: Story = {};

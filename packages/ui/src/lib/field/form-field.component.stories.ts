import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE } from '../../label-icon-story';
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
  args: FORM_FIELD_KNOBS.args,
};

export default meta;
type Story = StoryObj<FormFieldComponent>;

export const Playground: Story = {};

export const WithLabelHelp: Story = {
  args: {
    labelHelp: 'We send receipts and account notices here, never marketing.',
  },
};

export const WithTemplateLabelHelp: Story = {
  render: args => ({
    props: args,
    template: `<ea-form-field
      ${argsToTemplate(args, { exclude: ['labelHelp'] })}
      [labelHelp]="help">
      <input type="email" placeholder="you@example.com" />
    </ea-form-field>
    <ng-template #help>
      <em>Optional.</em> Leave it blank to be contacted by phone instead.
    </ng-template>`,
  }),
};

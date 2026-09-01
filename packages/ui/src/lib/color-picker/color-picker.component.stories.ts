import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE } from '../../label-icon-story';
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
  argTypes: {
    ...COLOR_PICKER_KNOBS.argTypes,
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
  },
  args: COLOR_PICKER_KNOBS.args,
};

export default meta;
type Story = StoryObj<ColorPickerComponent>;

export const Playground: Story = {};

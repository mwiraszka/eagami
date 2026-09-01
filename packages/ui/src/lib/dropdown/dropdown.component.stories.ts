import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE } from '../../label-icon-story';
import { DropdownComponent } from './dropdown.component';
import { DROPDOWN_KNOBS } from './dropdown.component.knobs';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const meta: Meta<DropdownComponent> = {
  title: 'Components/Dropdown',
  component: DropdownComponent,
  tags: ['autodocs'],
  parameters: {
    docs: { story: { height: '22rem' } },
  },
  render: args => ({
    props: args,
    template: `<ea-dropdown ${argsToTemplate(args)} class="story-narrow"></ea-dropdown>`,
  }),
  argTypes: {
    ...DROPDOWN_KNOBS.argTypes,
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
  },
  args: {
    ...DROPDOWN_KNOBS.args,
    options: fruitOptions,
  },
};

export default meta;
type Story = StoryObj<DropdownComponent>;

export const Playground: Story = {};

export const Grouped: Story = {
  args: {
    options: [
      { label: 'Recently used', options: [fruitOptions[2]] },
      { label: 'All fruits', options: fruitOptions },
    ],
  },
};

export const GroupedWithoutHeadings: Story = {
  args: {
    options: [{ options: [fruitOptions[2]] }, { options: fruitOptions }],
  },
};

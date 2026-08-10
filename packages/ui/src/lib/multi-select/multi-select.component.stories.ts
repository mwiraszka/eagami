import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { MultiSelectComponent } from './multi-select.component';
import { MULTI_SELECT_KNOBS } from './multi-select.component.knobs';

const FRUITS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'mango', label: 'Mango' },
  { value: 'nectarine', label: 'Nectarine' },
];

const RECENTLY_USED = [
  { value: 'cherry', label: 'Cherry' },
  { value: 'mango', label: 'Mango' },
];

const meta: Meta<MultiSelectComponent> = {
  title: 'Components/Multi-select',
  component: MultiSelectComponent,
  tags: ['autodocs'],
  parameters: {
    docs: { story: { height: '28rem' } },
  },
  render: args => ({
    props: args,
    template: `<ea-multi-select ${argsToTemplate(args)} class="story-narrow"></ea-multi-select>`,
  }),
  argTypes: {
    ...MULTI_SELECT_KNOBS.argTypes,
  },
  args: {
    ...MULTI_SELECT_KNOBS.args,
    options: FRUITS,
    selectAll: true,
  },
};

export default meta;
type Story = StoryObj<MultiSelectComponent>;

export const Playground: Story = {};

export const Grouped: Story = {
  args: {
    options: [
      { label: 'Recently used', options: RECENTLY_USED },
      { label: 'All fruits', options: FRUITS },
    ],
  },
};

export const GroupedWithoutHeadings: Story = {
  args: {
    options: [{ options: RECENTLY_USED }, { options: FRUITS }],
  },
};

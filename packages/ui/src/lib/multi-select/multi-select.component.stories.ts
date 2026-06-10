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

export const Default: Story = {};

export const WithInitialValue: Story = {
  args: {
    value: ['apple', 'cherry', 'mango'],
  },
};

export const WithHint: Story = {
  args: {
    hint: 'Pick a few favorites.',
  },
};

export const WithError: Story = {
  args: {
    errorMsg: 'Select at least one option.',
  },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const NoSearch: Story = {
  args: {
    searchable: false,
    options: FRUITS.slice(0, 6),
  },
};

export const NoSelectAll: Story = {
  args: {
    selectAll: false,
  },
};

export const ShortChipCap: Story = {
  args: { maxVisibleChips: 2 },
};

export const DisabledOptions: Story = {
  args: {
    options: FRUITS.map((o, i) => (i % 3 === 0 ? { ...o, disabled: true } : o)),
  },
};

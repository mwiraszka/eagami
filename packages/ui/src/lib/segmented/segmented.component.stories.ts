import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE } from '../../label-icon-story';
import type { SelectOption } from '../select-option';
import { SegmentedComponent } from './segmented.component';
import { SEGMENTED_KNOBS } from './segmented.component.knobs';

const viewOptions: SelectOption[] = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'kanban', label: 'Kanban' },
];

const meta: Meta<SegmentedComponent> = {
  title: 'Components/Segmented',
  component: SegmentedComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-segmented ${argsToTemplate(args)} />`,
  }),
  argTypes: {
    ...SEGMENTED_KNOBS.argTypes,
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
  },
  args: {
    ...SEGMENTED_KNOBS.args,
    options: viewOptions,
    value: 'list',
  },
};

export default meta;
type Story = StoryObj<SegmentedComponent>;

export const Playground: Story = {};

export const LabelledByExternalLabel: Story = {
  render: () => ({
    props: { options: viewOptions },
    template: `<span id="view-label">View</span><ea-segmented aria-labelledby="view-label" [options]="options"></ea-segmented>`,
  }),
};

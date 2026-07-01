import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

import { ButtonComponent } from '../button/button.component';
import { FileIconComponent } from '../icons/file.component';
import { EmptyStateComponent } from './empty-state.component';
import { EMPTY_STATE_KNOBS } from './empty-state.component.knobs';

const meta: Meta<EmptyStateComponent> = {
  title: 'Components/Empty State',
  component: EmptyStateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, FileIconComponent],
    }),
  ],
  argTypes: EMPTY_STATE_KNOBS.argTypes,
  args: EMPTY_STATE_KNOBS.args,
};

export default meta;
type Story = StoryObj<EmptyStateComponent>;

export const Playground: Story = {
  render: args => ({
    props: args,
    template: `
      <ea-empty-state
        [title]="title"
        [description]="description"
        [size]="size"
        [bordered]="bordered">
        <ea-icon-file slot="media" />
        <ea-button slot="actions" variant="primary">
          Create item
        </ea-button>
      </ea-empty-state>
    `,
  }),
};

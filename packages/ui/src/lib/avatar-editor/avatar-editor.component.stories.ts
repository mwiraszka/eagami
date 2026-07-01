import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { AvatarEditorComponent } from './avatar-editor.component';
import { AVATAR_EDITOR_KNOBS } from './avatar-editor.component.knobs';

const meta: Meta<AvatarEditorComponent> = {
  title: 'Components/Avatar Editor',
  component: AvatarEditorComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-avatar-editor ${argsToTemplate(args)}></ea-avatar-editor>`,
  }),
  argTypes: AVATAR_EDITOR_KNOBS.argTypes,
  args: AVATAR_EDITOR_KNOBS.args,
};

export default meta;
type Story = StoryObj<AvatarEditorComponent>;

export const Playground: Story = {};

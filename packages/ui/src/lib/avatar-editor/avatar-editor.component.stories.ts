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

export const Default: Story = {};

export const WithExistingImage: Story = {
  args: { currentSrc: 'assets/sample-avatar.png' },
};

export const WithCropState: Story = {
  args: {
    currentSrc: 'assets/sample-avatar.png',
    cropState: { zoom: 1.4, offsetX: -30, offsetY: -20 },
  },
};

export const BothShapes: Story = {
  render: () => ({
    template: `
      <div class="story-shapes-row">
        <div class="story-shape-item">
          <span class="story-shape-label">Circle</span>
          <ea-avatar-editor shape="circle" [canvasSize]="180" currentSrc="assets/sample-avatar.png"></ea-avatar-editor>
        </div>
        <div class="story-shape-item">
          <span class="story-shape-label">Square</span>
          <ea-avatar-editor shape="square" [canvasSize]="180" currentSrc="assets/sample-avatar.png"></ea-avatar-editor>
        </div>
      </div>
    `,
  }),
};

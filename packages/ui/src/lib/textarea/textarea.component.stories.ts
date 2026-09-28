import {
  type Meta,
  type StoryObj,
  argsToTemplate,
  moduleMetadata,
} from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE } from '../../label-icon-story';
import { ButtonComponent } from '../button/button.component';
import { TextareaComponent } from './textarea.component';
import { TEXTAREA_KNOBS } from './textarea.component.knobs';

const meta: Meta<TextareaComponent> = {
  title: 'Components/Textarea',
  component: TextareaComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-textarea ${argsToTemplate(args)} class="story-narrow"></ea-textarea>`,
  }),
  argTypes: {
    ...TEXTAREA_KNOBS.argTypes,
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
  },
  args: TEXTAREA_KNOBS.args,
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Playground: Story = {};

// The button takes focus on click, but the textarea keeps its selection, so the
// snippet still lands where the caret was left
export const InsertAtCaret: Story = {
  decorators: [moduleMetadata({ imports: [ButtonComponent] })],
  render: () => ({
    template: `
      <div class="story-stack story-narrow">
        <ea-textarea
          #editor
          label="Article body"
          value="Place the caret anywhere in this text, then insert an image." />
        <ea-button
          variant="secondary"
          size="sm"
          (clicked)="editor.insertText('![Caption](image.png)')">
          Insert image at caret
        </ea-button>
      </div>
    `,
  }),
};

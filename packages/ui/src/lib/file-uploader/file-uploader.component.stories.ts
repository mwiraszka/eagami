import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE } from '../label-icon-story';
import { FileUploaderComponent } from './file-uploader.component';
import { FILE_UPLOADER_KNOBS } from './file-uploader.component.knobs';

const meta: Meta<FileUploaderComponent> = {
  title: 'Components/File Uploader',
  component: FileUploaderComponent,
  tags: ['autodocs'],
  parameters: {
    docs: { story: { height: '24rem' } },
  },
  render: args => ({
    props: args,
    template: `<ea-file-uploader ${argsToTemplate(args)} class="story-medium"></ea-file-uploader>`,
  }),
  argTypes: {
    ...FILE_UPLOADER_KNOBS.argTypes,
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
  },
  args: { ...FILE_UPLOADER_KNOBS.args, labelIcon: 'none' },
};

export default meta;
type Story = StoryObj<FileUploaderComponent>;

export const Playground: Story = {};

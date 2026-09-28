import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE } from '../../label-icon-story';
import { FileTextIconComponent } from '../icons/file-text.component';
import { PaperclipIconComponent } from '../icons/paperclip.component';
import { UploadIconComponent } from '../icons/upload.component';
import { FileUploaderComponent } from './file-uploader.component';
import { FILE_UPLOADER_KNOBS } from './file-uploader.component.knobs';

// `buttonIcon` takes a component class, which plain-data knobs cannot hold, so
// the story maps slugs to classes itself
const BUTTON_ICONS = {
  none: undefined,
  upload: UploadIconComponent,
  paperclip: PaperclipIconComponent,
  'file-text': FileTextIconComponent,
};

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
    buttonIcon: {
      control: 'select',
      options: Object.keys(BUTTON_ICONS),
      mapping: BUTTON_ICONS,
      if: { arg: 'variant', eq: 'button' },
    },
  },
  args: FILE_UPLOADER_KNOBS.args,
};

export default meta;
type Story = StoryObj<FileUploaderComponent>;

export const Playground: Story = {};

export const ButtonVariant: Story = {
  render: () => ({
    props: { uploadIcon: UploadIconComponent, iconOnlyName: 'Update ratings from CSV' },
    template: `
      <div class="story-stack story-medium">
        <ea-file-uploader
          variant="button"
          label="Ratings file"
          accept=".csv"
          hint="Exported from the rating system"
          buttonLabel="Import CSV"
          [buttonIcon]="uploadIcon"
          [multiple]="false" />
        <ea-file-uploader
          variant="button"
          accept=".csv"
          [aria-label]="iconOnlyName"
          buttonLabel=""
          [buttonIcon]="uploadIcon"
          [multiple]="false"
          [showFileList]="false" />
      </div>
    `,
  }),
};

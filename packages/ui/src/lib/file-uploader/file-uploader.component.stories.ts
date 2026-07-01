import {
  type Meta,
  type StoryObj,
  argsToTemplate,
  moduleMetadata,
} from '@storybook/angular';

import { PaperclipIconComponent } from '../icons/paperclip.component';
import { FileUploaderComponent } from './file-uploader.component';
import { FILE_UPLOADER_KNOBS } from './file-uploader.component.knobs';

function makeSampleFile(name: string, bytes: number, type: string): File {
  return new File([new Blob([new ArrayBuffer(bytes)], { type })], name, {
    type,
    lastModified: 0,
  });
}

const SAMPLE_FILES: File[] = [
  makeSampleFile('report.pdf', 540 * 1024, 'application/pdf'),
  makeSampleFile('logo.png', 28 * 1024, 'image/png'),
  makeSampleFile('demo-screencast.mp4', 4_200_000, 'video/mp4'),
  makeSampleFile('site-backup.zip', 12_500_000, 'application/zip'),
];

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
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
  args: {
    ...FILE_UPLOADER_KNOBS.args,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<FileUploaderComponent>;

export const Default: Story = {};

export const WithInitialValue: Story = {
  args: {
    label: 'Selected files',
    value: SAMPLE_FILES,
  },
};

export const WithProgress: Story = {
  args: {
    label: 'Uploading…',
    value: SAMPLE_FILES,
    progress: new Map<File, number>([
      [SAMPLE_FILES[0], 100],
      [SAMPLE_FILES[1], 70],
      [SAMPLE_FILES[2], 35],
      [SAMPLE_FILES[3], 5],
    ]),
  },
};

export const Sizes: Story = {
  // Literal size attributes per instance; a shared `size` arg would force all three rows to one value
  render: () => ({
    template: `
      <div class="story-stack">
        <ea-file-uploader size="xs" label="Extra small"></ea-file-uploader>
        <ea-file-uploader size="sm" label="Small"></ea-file-uploader>
        <ea-file-uploader size="md" label="Medium"></ea-file-uploader>
        <ea-file-uploader size="lg" label="Large"></ea-file-uploader>
        <ea-file-uploader size="xl" label="Extra large"></ea-file-uploader>
      </div>
    `,
  }),
};

export const CustomIcon: Story = {
  decorators: [moduleMetadata({ imports: [PaperclipIconComponent] })],
  // The `icon`-attribute slot replaces the default cloud icon; the wrapper handles sizing, so no styling needed
  render: () => ({
    template: `
      <ea-file-uploader label="Attach files" class="story-medium">
        <ea-icon-paperclip icon />
      </ea-file-uploader>
    `,
  }),
};

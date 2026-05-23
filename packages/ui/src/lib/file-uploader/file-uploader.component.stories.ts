import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

import { PaperclipIconComponent } from '../icons/paperclip.component';
import { FileUploaderComponent } from './file-uploader.component';

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
  title: 'Components/File uploader',
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
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    rejected: { action: 'rejected' },
    fileRemoved: { action: 'fileRemoved' },
  },
  args: {
    label: 'Attachments',
    size: 'md',
    multiple: true,
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<FileUploaderComponent>;

export const Default: Story = {};

export const WithConstraints: Story = {
  args: {
    label: 'Upload images',
    hint: 'PNG or JPEG, up to 2 MB each, max 4 files',
    accept: 'image/png,image/jpeg',
    maxSize: 2 * 1024 * 1024,
    maxFiles: 4,
  },
};

export const SingleFile: Story = {
  args: {
    label: 'Upload resume',
    multiple: false,
    accept: '.pdf',
    maxSize: 5 * 1024 * 1024,
  },
};

export const WithInitialValue: Story = {
  args: {
    label: 'Selected files',
    value: SAMPLE_FILES,
  },
};

export const WithError: Story = {
  args: {
    label: 'Upload images',
    accept: 'image/*',
    errorMsg: 'At least one image is required',
    required: true,
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
  // `props: args` + `argsToTemplate` would bind every <ea-file-uploader> to the
  // same top-level `size` arg, so the three rows would all render at the
  // default `md`. Use literal attribute strings instead so each instance gets
  // its own size.
  render: () => ({
    template: `
      <div class="story-stack">
        <ea-file-uploader size="sm" label="Small"></ea-file-uploader>
        <ea-file-uploader size="md" label="Medium"></ea-file-uploader>
        <ea-file-uploader size="lg" label="Large"></ea-file-uploader>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Locked uploader',
    disabled: true,
    value: [SAMPLE_FILES[0]],
  },
};

export const CustomIcon: Story = {
  decorators: [moduleMetadata({ imports: [PaperclipIconComponent] })],
  // Demonstrates the `icon` content slot: any element with `icon` attribute
  // replaces the default cloud icon. The dropzone's size-aware wrapper handles
  // sizing automatically, so the consumer's element doesn't need styling.
  render: () => ({
    template: `
      <ea-file-uploader label="Attach files" class="story-medium">
        <ea-icon-paperclip icon />
      </ea-file-uploader>
    `,
  }),
};

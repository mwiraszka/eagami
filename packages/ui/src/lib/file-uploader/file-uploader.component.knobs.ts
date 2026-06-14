import type { ComponentKnobs } from '../../playground-knobs.types';

/**
 * Single source of truth for the File Uploader demo's interactive controls.
 * Consumed by `file-uploader.component.stories.ts` (as Storybook `argTypes`/
 * `args`) and by the website's component playground.
 */
export const FILE_UPLOADER_KNOBS: ComponentKnobs = {
  argTypes: {
    multiple: { control: 'boolean' },
    maxFiles: { control: 'number', min: 1, max: 20, maxLength: 2 },
    maxSize: { control: 'number', min: 0, max: 104857600, maxLength: 9 },
    showFileList: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    rejected: { action: 'rejected' },
    fileRemoved: { action: 'fileRemoved' },
    triggerError: { control: 'boolean', demoOnly: true },
  },
  args: {
    label: 'Attachments',
    accept: '',
    multiple: true,
    showFileList: true,
    disabled: false,
    required: false,
    triggerError: false,
  },
};

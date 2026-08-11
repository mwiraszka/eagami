import type { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent } from '../button/button.component';
import { HeartIconComponent } from '../icons/heart.component';
import { ToastComponent } from './toast.component';
import { TOAST_KNOBS } from './toast.component.knobs';
import { ToastService } from './toast.service';

const toastService = new ToastService();

const meta: Meta<ToastComponent> = {
  title: 'Components/Toast',
  component: ToastComponent,
  tags: ['autodocs'],
  parameters: {
    docs: { story: { height: '28rem' } },
  },
  argTypes: TOAST_KNOBS.argTypes,
  args: TOAST_KNOBS.args,
};

export default meta;
type Story = StoryObj<ToastComponent>;

export const Playground: Story = {
  render: args => ({
    moduleMetadata: {
      imports: [ButtonComponent],
      providers: [{ provide: ToastService, useValue: toastService }],
    },
    template: `
      <ea-toast
        [position]="position"
        [size]="size"
        [clearable]="clearable" />
      <div class="story-row">
        <ea-button variant="secondary" (clicked)="showDefault()">Default</ea-button>
        <ea-button variant="secondary" (clicked)="showSuccess()">Success</ea-button>
        <ea-button variant="secondary" (clicked)="showWarning()">Warning</ea-button>
        <ea-button variant="secondary" (clicked)="showError()">Error</ea-button>
        <ea-button variant="secondary" (clicked)="showInfo()">Info</ea-button>
      </div>
    `,
    props: {
      ...args,
      showDefault: () => toastService.show('This is a default toast'),
      showSuccess: () => toastService.success('Operation completed successfully'),
      showWarning: () => toastService.warning('Please review your input'),
      showError: () => toastService.error('Something went wrong'),
      showInfo: () => toastService.info('Here is some useful information'),
    },
  }),
};

export const WithTitle: Story = {
  render: args => ({
    moduleMetadata: {
      imports: [ButtonComponent],
      providers: [{ provide: ToastService, useValue: toastService }],
    },
    template: `
      <ea-toast
        [position]="position"
        [size]="size"
        [clearable]="clearable" />
      <div class="story-row">
        <ea-button variant="secondary" (clicked)="showTitled()">Titled</ea-button>
        <ea-button variant="secondary" (clicked)="showUntitled()">Untitled</ea-button>
      </div>
    `,
    props: {
      ...args,
      showTitled: () =>
        toastService.show('Your changes are live on eagami.com', {
          title: 'Deployment finished',
          variant: 'success',
        }),
      showUntitled: () =>
        toastService.show('Your changes are live on eagami.com', { variant: 'success' }),
    },
  }),
};

export const SegmentedText: Story = {
  render: args => ({
    moduleMetadata: {
      imports: [ButtonComponent],
      providers: [{ provide: ToastService, useValue: toastService }],
    },
    template: `
      <ea-toast
        [position]="position"
        [size]="size"
        [clearable]="clearable" />
      <div class="story-row">
        <ea-button variant="secondary" (clicked)="showSegmented()">Segmented</ea-button>
        <ea-button variant="secondary" (clicked)="showPlain()">Plain</ea-button>
      </div>
    `,
    props: {
      ...args,
      showSegmented: () =>
        toastService.show(
          [
            { text: 'Moved ' },
            { text: 'Q3 roadmap', strong: true },
            { text: ' to ' },
            { text: 'Archived projects', strong: true },
          ],
          {
            title: [{ text: 'Bob Jones', strong: true }, { text: ' updated the board' }],
            variant: 'success',
          },
        ),
      showPlain: () =>
        toastService.show('Moved Q3 roadmap to Archived projects', {
          title: 'Bob Jones updated the board',
          variant: 'success',
        }),
    },
  }),
};

export const IconOverride: Story = {
  render: args => ({
    moduleMetadata: {
      imports: [ButtonComponent],
      providers: [{ provide: ToastService, useValue: toastService }],
    },
    template: `
      <ea-toast
        [position]="position"
        [size]="size"
        [clearable]="clearable" />
      <div class="story-row">
        <ea-button variant="secondary" (clicked)="showCustom()">Custom icon</ea-button>
        <ea-button variant="secondary" (clicked)="showNone()">No icon</ea-button>
      </div>
    `,
    props: {
      ...args,
      showCustom: () =>
        toastService.show('Saved to favourites', {
          variant: 'success',
          icon: HeartIconComponent,
        }),
      showNone: () =>
        toastService.show('Preferences updated', { variant: 'info', icon: null }),
    },
  }),
};

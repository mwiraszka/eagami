import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { Component, signal } from '@angular/core';

import { PopoverPlacement } from './popover-positioning';
import {
  PopoverComponent,
  PopoverRole,
  PopoverScrollBehavior,
} from './popover.component';

// Wrapper component for the stories — owns the click-to-toggle state, exposes
// the same inputs as `<ea-popover>`, and brings its own styles via `styleUrl`
// so the trigger/content render with reasonable defaults. (Stories can't rely
// on `.storybook/storybook.scss` because that file isn't actually compiled
// into Storybook's CSS output; component-scoped SCSS is.)
@Component({
  selector: 'ea-popover-story-host',
  imports: [PopoverComponent],
  template: `
    <div class="story-popover-fixture">
      <button
        #trigger
        type="button"
        class="story-popover-trigger"
        (click)="isOpen.set(!isOpen())">
        Anchor
      </button>
      <ea-popover
        [anchor]="trigger"
        [open]="isOpen()"
        [placement]="placement"
        [role]="role"
        [offset]="offset"
        [flip]="flip"
        [clamp]="clamp"
        [matchAnchorWidth]="matchAnchorWidth"
        [closeOnOutsideClick]="closeOnOutsideClick"
        [closeOnEscape]="closeOnEscape"
        [scrollBehavior]="scrollBehavior"
        (closeRequested)="isOpen.set(false)">
        <div class="story-popover-content">Popover content</div>
      </ea-popover>
    </div>
  `,
  styleUrl: './popover.component.stories.scss',
})
class PopoverStoryHost {
  isOpen = signal(false);
  placement: PopoverPlacement = 'bottom-start';
  role: PopoverRole = 'dialog';
  offset = 2;
  flip = true;
  clamp = true;
  matchAnchorWidth = false;
  closeOnOutsideClick = true;
  closeOnEscape = true;
  scrollBehavior: PopoverScrollBehavior = 'reposition';
}

const meta: Meta<PopoverStoryHost> = {
  title: 'Components/Popover',
  component: PopoverStoryHost,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [PopoverStoryHost] })],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'right',
      ],
    },
    role: {
      control: 'select',
      options: ['menu', 'listbox', 'dialog', 'tooltip', 'grid'],
    },
    scrollBehavior: {
      control: 'select',
      options: ['reposition', 'close', 'ignore'],
    },
  },
  args: {
    placement: 'bottom-start',
    role: 'dialog',
    offset: 2,
    flip: true,
    clamp: true,
    matchAnchorWidth: false,
    closeOnOutsideClick: true,
    closeOnEscape: true,
    scrollBehavior: 'reposition',
  },
};

export default meta;
type Story = StoryObj<PopoverStoryHost>;

export const Default: Story = {};

export const MatchAnchorWidth: Story = {
  args: { matchAnchorWidth: true },
};

export const TopPlacement: Story = {
  args: { placement: 'top' },
};

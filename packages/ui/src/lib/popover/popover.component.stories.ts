import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

import { Component, Input, signal } from '@angular/core';

import type { PopoverPlacement } from './popover-positioning';
import {
  PopoverComponent,
  type PopoverRole,
  type PopoverScrollBehavior,
} from './popover.component';
import { POPOVER_KNOBS } from './popover.component.knobs';

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
  // `open` is an arg so control changes don't reset it and close the popover
  @Input() set open(value: boolean) {
    this.isOpen.set(value);
  }
  isOpen = signal(true);
  placement: PopoverPlacement = 'bottom-start';
  role: PopoverRole = 'dialog';
  offset = 0;
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
  argTypes: { ...POPOVER_KNOBS.argTypes, open: { control: 'boolean' } },
  args: { ...POPOVER_KNOBS.args, open: true },
};

export default meta;
type Story = StoryObj<PopoverStoryHost>;

export const Playground: Story = {};

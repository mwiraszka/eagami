import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

import { Component, signal } from '@angular/core';

import type { PopoverPlacement } from './popover-positioning';
import {
  PopoverComponent,
  type PopoverRole,
  type PopoverScrollBehavior,
} from './popover.component';

// Story wrapper: owns the click-to-toggle state, mirrors `<ea-popover>` inputs, and
// brings its own styles so the trigger and content render with sensible defaults.
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
    offset: 0,
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

// Each cell has its own anchor and popover so all eight placements can be inspected together
@Component({
  selector: 'ea-popover-placements-host',
  imports: [PopoverComponent],
  template: `
    <div class="story-popover-grid">
      @for (p of placements; track p) {
        <div class="story-popover-grid-cell">
          <button
            #anchor
            type="button"
            class="story-popover-trigger"
            (click)="toggle(p)">
            {{ p }}
          </button>
          <ea-popover
            [anchor]="anchor"
            [open]="open() === p"
            [placement]="p"
            role="dialog"
            (closeRequested)="open.set(null)">
            <div class="story-popover-content">{{ p }}</div>
          </ea-popover>
        </div>
      }
    </div>
  `,
  styleUrl: './popover.component.stories.scss',
})
class PopoverPlacementsHost {
  readonly placements: PopoverPlacement[] = [
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'right',
  ];
  readonly open = signal<PopoverPlacement | null>(null);
  toggle(p: PopoverPlacement): void {
    this.open.update(current => (current === p ? null : p));
  }
}

export const AllPlacements: StoryObj<PopoverPlacementsHost> = {
  render: () => ({
    template: `<ea-popover-placements-host></ea-popover-placements-host>`,
    moduleMetadata: { imports: [PopoverPlacementsHost] },
  }),
};

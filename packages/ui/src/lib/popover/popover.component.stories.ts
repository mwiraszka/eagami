import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

import { Component, Input, signal } from '@angular/core';

import { ButtonComponent } from '../button/button.component';
import {
  type ContextMenuPosition,
  ContextMenuTriggerDirective,
} from '../context-menu/context-menu-trigger.directive';
import type { PopoverAnchorPoint, PopoverPlacement } from './popover-positioning';
import {
  PopoverComponent,
  type PopoverOpenRequest,
  type PopoverRole,
  type PopoverScrollBehavior,
} from './popover.component';
import { POPOVER_KNOBS } from './popover.component.knobs';

@Component({
  selector: 'ea-popover-story-host',
  imports: [ContextMenuTriggerDirective, PopoverComponent],
  template: `
    <div class="story-popover-fixture">
      <button
        #trigger
        type="button"
        class="story-popover-trigger"
        [eaContextMenuTrigger]="popover"
        [contextMenuPosition]="contextMenuPosition"
        (click)="toggle()">
        Anchor
      </button>
      <ea-popover
        #popover
        [anchor]="trigger"
        [open]="isOpen()"
        [anchorPoint]="point()"
        [contextMenu]="asContextMenu()"
        [placement]="placement"
        [role]="role"
        [offset]="offset"
        [flip]="flip"
        [clamp]="clamp"
        [matchAnchorWidth]="matchAnchorWidth"
        [closeOnOutsideClick]="closeOnOutsideClick"
        [closeOnEscape]="closeOnEscape"
        [scrollBehavior]="scrollBehavior"
        (openRequested)="openAt($event)"
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
  point = signal<PopoverAnchorPoint | null>(null);
  asContextMenu = signal(false);
  placement: PopoverPlacement = 'bottom-start';
  role: PopoverRole = 'dialog';
  offset = 0;
  flip = true;
  clamp = true;
  matchAnchorWidth = false;
  closeOnOutsideClick = true;
  closeOnEscape = true;
  scrollBehavior: PopoverScrollBehavior = 'reposition';
  contextMenuPosition: ContextMenuPosition = 'pointer';

  toggle(): void {
    this.point.set(null);
    this.asContextMenu.set(false);
    this.isOpen.set(!this.isOpen());
  }

  openAt(request: PopoverOpenRequest): void {
    this.point.set(request.point);
    this.asContextMenu.set(true);
    this.isOpen.set(true);
  }
}

@Component({
  selector: 'ea-popover-context-menu-story-host',
  imports: [ButtonComponent, ContextMenuTriggerDirective, PopoverComponent],
  template: `
    <div
      #area
      class="story-popover-area"
      [eaContextMenuTrigger]="popover"
      [contextMenuPosition]="contextMenuPosition">
      Right-click anywhere in this area, or tab to the button and press Shift+F10.
      <ea-button variant="secondary">Focus me</ea-button>
    </div>
    <ea-popover
      #popover
      [anchor]="area"
      [open]="isOpen()"
      [anchorPoint]="point()"
      [contextMenu]="true"
      [placement]="placement"
      [offset]="offset"
      aria-label="Item actions"
      (openRequested)="openAt($event)"
      (closeRequested)="isOpen.set(false)">
      <div class="story-popover-toolbar">
        <ea-button
          size="sm"
          variant="secondary"
          (clicked)="isOpen.set(false)">
          Edit
        </ea-button>
        <ea-button
          size="sm"
          variant="secondary"
          (clicked)="isOpen.set(false)">
          Delete
        </ea-button>
      </div>
    </ea-popover>
  `,
  styleUrl: './popover.component.stories.scss',
})
class PopoverContextMenuStoryHost {
  @Input() placement: PopoverPlacement = 'bottom-start';
  @Input() offset = 0;
  @Input() contextMenuPosition: ContextMenuPosition = 'pointer';
  isOpen = signal(false);
  point = signal<PopoverAnchorPoint | null>(null);

  openAt(request: PopoverOpenRequest): void {
    this.point.set(request.point);
    this.isOpen.set(true);
  }
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

/** An `inside-` placement sits over the anchor, here pinned to its top start corner. */
export const InsidePlacement: Story = {
  args: { placement: 'inside-top-start' },
};

/**
 * `[eaContextMenuTrigger]` asks the popover to open from a right-click, a long press,
 * or Shift+F10. With `contextMenu` set, it takes focus as it opens, hands it back as
 * it closes, and any click or right-click outside it dismisses it. Set
 * `contextMenuPosition` to `anchor` to open at the placement against the area instead
 * of at the pointer, e.g. with `inside-top-start`.
 */
export const ContextMenu: StoryObj<PopoverContextMenuStoryHost> = {
  render: args => ({
    props: args,
    moduleMetadata: { imports: [PopoverContextMenuStoryHost] },
    template: `
      <ea-popover-context-menu-story-host
        [placement]="placement"
        [offset]="offset"
        [contextMenuPosition]="contextMenuPosition" />
    `,
  }),
  argTypes: {
    placement: POPOVER_KNOBS.argTypes['placement'],
    offset: POPOVER_KNOBS.argTypes['offset'],
    contextMenuPosition: { control: 'select', options: ['pointer', 'anchor'] },
  },
  args: { placement: 'bottom-start', offset: 0, contextMenuPosition: 'pointer' },
};

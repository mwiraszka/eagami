import type { Mock } from 'vitest';

import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { REAL_GET_COMPUTED_STYLE } from '../../test-setup';
import {
  type DrawerAnimation,
  DrawerComponent,
  type DrawerMode,
  type DrawerPosition,
  type DrawerSize,
} from './drawer.component';

// Mock HTMLDialogElement methods for jsdom
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  });
  HTMLDialogElement.prototype.show = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
  });
});

@Component({
  selector: 'ea-test-host',
  imports: [DrawerComponent],
  template: `
    <ea-drawer
      [(open)]="isOpen"
      [mode]="mode()"
      [position]="position()"
      [size]="size()"
      [animation]="animation()"
      [pushTarget]="pushTarget()"
      [closeOnBackdrop]="closeOnBackdrop()"
      [closeOnEscape]="closeOnEscape()"
      [showClose]="showClose()"
      (opened)="openedCount.update(count => count + 1)"
      (closed)="closedCount.update(count => count + 1)">
      <span slot="header">Drawer Title</span>
      Drawer body content
      <span slot="footer">Footer</span>
    </ea-drawer>
  `,
})
class TestHostComponent {
  isOpen = signal(false);
  mode = signal<DrawerMode>('overlay');
  position = signal<DrawerPosition>('right');
  size = signal<DrawerSize>('md');
  animation = signal<DrawerAnimation>('eased');
  pushTarget = signal<string | HTMLElement | null>(null);
  closeOnBackdrop = signal(true);
  closeOnEscape = signal(true);
  showClose = signal(true);
  openedCount = signal(0);
  closedCount = signal(0);
}

@Component({
  selector: 'ea-test-no-header-host',
  imports: [DrawerComponent],
  template: `<ea-drawer [(open)]="isOpen">Body only</ea-drawer>`,
})
class NoHeaderHostComponent {
  isOpen = signal(true);
}

// Every padding side the drawer's push mode is allowed to touch
const PUSH_PROPERTIES = [
  'padding-right',
  'padding-left',
  'padding-inline-start',
  'padding-inline-end',
  'padding-top',
  'padding-bottom',
];

const PANEL_WIDTH = 320;
const PANEL_HEIGHT = 180;

describe('DrawerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  const createdTargets: HTMLElement[] = [];

  function getDrawer(): HTMLDialogElement {
    return fixture.nativeElement.querySelector('dialog.ea-drawer');
  }

  function getPanel(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-drawer__panel');
  }

  function getCloseButton(): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector('.ea-drawer__close');
  }

  function nextFrame(): Promise<void> {
    return new Promise(resolve => requestAnimationFrame(() => resolve()));
  }

  function nextTask(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve));
  }

  // Only the push paddings that are actually set, so a test can assert both the
  // side that was applied and that no other side was left behind
  function pushPaddings(target: HTMLElement = document.body): Record<string, string> {
    const applied: Record<string, string> = {};
    for (const property of PUSH_PROPERTIES) {
      const value = target.style.getPropertyValue(property);
      if (value) {
        applied[property] = value;
      }
    }
    return applied;
  }

  // jsdom never lays out, so the panel reports 0x0 and the measured push offset
  // would be meaningless without stubbed dimensions
  function stubPanelExtent(width: number, height: number): void {
    const panel = getPanel();
    Object.defineProperty(panel, 'offsetWidth', { configurable: true, value: width });
    Object.defineProperty(panel, 'offsetHeight', { configurable: true, value: height });
  }

  function createPushTarget(id?: string): HTMLElement {
    const target = document.createElement('main');
    if (id) {
      target.id = id;
    }
    document.body.appendChild(target);
    createdTargets.push(target);
    return target;
  }

  async function openInPushMode(): Promise<void> {
    host.mode.set('push');
    fixture.detectChanges();
    stubPanelExtent(PANEL_WIDTH, PANEL_HEIGHT);
    host.isOpen.set(true);
    fixture.detectChanges();
    // The outside-dismiss listener is registered a tick later so the click that
    // opened the drawer does not immediately close it
    await nextTask();
  }

  beforeEach(async () => {
    (HTMLDialogElement.prototype.showModal as Mock).mockClear();
    (HTMLDialogElement.prototype.show as Mock).mockClear();
    (HTMLDialogElement.prototype.close as Mock).mockClear();
    document.body.removeAttribute('style');

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    createdTargets.splice(0).forEach(target => target.remove());
    document.body.removeAttribute('style');
  });

  describe('Rendering', () => {
    it('renders a dialog element', () => {
      expect(getDrawer()).toBeTruthy();
    });

    it('does not show the drawer by default', () => {
      expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    });

    it('applies the default position class', () => {
      expect(getPanel().classList).toContain('ea-drawer__panel--right');
    });

    it('applies the default size class', () => {
      expect(getPanel().classList).toContain('ea-drawer__panel--md');
    });

    it('applies position classes for each side', () => {
      host.position.set('left');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ea-drawer__panel--left');

      host.position.set('top');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ea-drawer__panel--top');

      host.position.set('bottom');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ea-drawer__panel--bottom');
    });

    it('applies different size classes', () => {
      host.size.set('lg');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ea-drawer__panel--lg');
    });

    it('applies each size class', () => {
      host.size.set('xl');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ea-drawer__panel--xl');
    });
  });

  describe('Animation', () => {
    it('marks the drawer animated for the eased animation', () => {
      expect(getDrawer().classList).toContain('ea-drawer--animated');
      expect(getDrawer().classList).not.toContain('ea-drawer--linear');
    });

    it('adds the linear modifier for the linear animation', () => {
      host.animation.set('linear');
      fixture.detectChanges();

      expect(getDrawer().classList).toContain('ea-drawer--animated');
      expect(getDrawer().classList).toContain('ea-drawer--linear');
    });

    it('drops the animated class when animation is none', () => {
      host.animation.set('none');
      fixture.detectChanges();

      expect(getDrawer().classList).not.toContain('ea-drawer--animated');
      expect(getDrawer().classList).not.toContain('ea-drawer--linear');
    });
  });

  describe('Opening and closing', () => {
    it('opens when open is set to true', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });

    it('closes when open is set to false', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      host.isOpen.set(false);
      fixture.detectChanges();

      expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
    });
  });

  describe('Close button', () => {
    it('renders a close button by default', () => {
      expect(getCloseButton()).toBeTruthy();
    });

    it('hides the close button when showClose is false', () => {
      host.showClose.set(false);
      fixture.detectChanges();

      expect(getCloseButton()).toBeNull();
    });

    it('closes drawer when close button is clicked', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      getCloseButton()!.click();
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });
  });

  describe('Backdrop click', () => {
    it('closes on backdrop click when closeOnBackdrop is true', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      const drawer = getDrawer();
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: drawer });
      drawer.dispatchEvent(event);
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });

    it('does not close on backdrop click when closeOnBackdrop is false', () => {
      host.closeOnBackdrop.set(false);
      host.isOpen.set(true);
      fixture.detectChanges();

      const drawer = getDrawer();
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: drawer });
      drawer.dispatchEvent(event);
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });

    it('does not close when click target is inside the panel', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      const panel = getPanel();
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: panel });
      getDrawer().dispatchEvent(event);
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });
  });

  describe('Escape key', () => {
    it('closes on cancel event when closeOnEscape is true', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      getDrawer().dispatchEvent(new Event('cancel'));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });

    it('prevents close on cancel when closeOnEscape is false', () => {
      host.closeOnEscape.set(false);
      host.isOpen.set(true);
      fixture.detectChanges();

      const event = new Event('cancel', { cancelable: true });
      getDrawer().dispatchEvent(event);
      fixture.detectChanges();

      expect(event.defaultPrevented).toBe(true);
      expect(host.isOpen()).toBe(true);
    });

    it('syncs the open model when the dialog closes on its own', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      // The native close event fires after the dialog has already closed
      getDrawer().removeAttribute('open');
      getDrawer().dispatchEvent(new Event('close'));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });

    it('re-shows when force-closed while closeOnEscape is false', () => {
      host.closeOnEscape.set(false);
      host.isOpen.set(true);
      fixture.detectChanges();
      (HTMLDialogElement.prototype.showModal as Mock).mockClear();

      getDrawer().removeAttribute('open');
      getDrawer().dispatchEvent(new Event('close'));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });
  });

  describe('Push mode', () => {
    it('opens non-modally via show() rather than showModal()', () => {
      host.mode.set('push');
      host.isOpen.set(true);
      fixture.detectChanges();

      expect(HTMLDialogElement.prototype.show).toHaveBeenCalled();
      expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    });

    it('applies the push modifier class to the dialog', () => {
      host.mode.set('push');
      fixture.detectChanges();

      expect(getDrawer().classList).toContain('ea-drawer--push');
    });

    it('pushes the document body content aside on the position side', async () => {
      host.mode.set('push');
      host.position.set('right');
      host.isOpen.set(true);
      fixture.detectChanges();
      // The push offset is measured on the next frame, once the view reflects
      // the current position and size.
      await new Promise(resolve => requestAnimationFrame(resolve));

      expect(document.body.style.getPropertyValue('padding-right')).not.toBe('');
      expect(document.body.style.transition).toContain('padding');
    });

    it('releases the pushed content when the drawer closes', async () => {
      host.mode.set('push');
      host.isOpen.set(true);
      fixture.detectChanges();
      await new Promise(resolve => requestAnimationFrame(resolve));

      host.isOpen.set(false);
      fixture.detectChanges();

      expect(document.body.style.getPropertyValue('padding-right')).toBe('');
    });

    it('reopens in the matching modality when mode changes while open', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);

      host.mode.set('push');
      fixture.detectChanges();

      expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
      expect(HTMLDialogElement.prototype.show).toHaveBeenCalledTimes(1);
      expect(host.isOpen()).toBe(true);
    });

    it('closes on Escape keydown when closeOnEscape is true', () => {
      host.mode.set('push');
      host.isOpen.set(true);
      fixture.detectChanges();

      getDrawer().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });

    it('ignores Escape keydown when closeOnEscape is false', () => {
      host.mode.set('push');
      host.closeOnEscape.set(false);
      host.isOpen.set(true);
      fixture.detectChanges();

      getDrawer().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });
  });

  describe('Push offset', () => {
    const cases: {
      position: DrawerPosition;
      property: string;
      expected: string;
    }[] = [
      { position: 'right', property: 'padding-right', expected: `${PANEL_WIDTH}px` },
      { position: 'left', property: 'padding-left', expected: `${PANEL_WIDTH}px` },
      {
        position: 'start',
        property: 'padding-inline-start',
        expected: `${PANEL_WIDTH}px`,
      },
      { position: 'end', property: 'padding-inline-end', expected: `${PANEL_WIDTH}px` },
      { position: 'top', property: 'padding-top', expected: `${PANEL_HEIGHT}px` },
      { position: 'bottom', property: 'padding-bottom', expected: `${PANEL_HEIGHT}px` },
    ];

    it.each(cases)(
      'offsets the target with $property for the $position position',
      async ({ position, property, expected }) => {
        host.mode.set('push');
        host.position.set(position);
        fixture.detectChanges();
        stubPanelExtent(PANEL_WIDTH, PANEL_HEIGHT);

        host.isOpen.set(true);
        fixture.detectChanges();
        await nextFrame();

        expect(pushPaddings()).toEqual({ [property]: expected });
      },
    );

    it('re-measures onto the new side when position changes while open', async () => {
      await openInPushMode();
      await nextFrame();

      host.position.set('top');
      fixture.detectChanges();
      await nextFrame();

      expect(pushPaddings()).toEqual({ 'padding-top': `${PANEL_HEIGHT}px` });
    });

    it('re-measures the offset when size changes while open', async () => {
      await openInPushMode();
      await nextFrame();

      stubPanelExtent(PANEL_WIDTH * 2, PANEL_HEIGHT);
      host.size.set('lg');
      fixture.detectChanges();
      await nextFrame();

      expect(pushPaddings()).toEqual({ 'padding-right': `${PANEL_WIDTH * 2}px` });
    });

    it('offsets an element pushTarget and leaves the body alone', async () => {
      const target = createPushTarget();
      host.pushTarget.set(target);

      await openInPushMode();
      await nextFrame();

      expect(pushPaddings(target)).toEqual({ 'padding-right': `${PANEL_WIDTH}px` });
      expect(pushPaddings()).toEqual({});
    });

    it('resolves a string pushTarget as a CSS selector', async () => {
      const target = createPushTarget('push-region');
      host.pushTarget.set('#push-region');

      await openInPushMode();
      await nextFrame();

      expect(pushPaddings(target)).toEqual({ 'padding-right': `${PANEL_WIDTH}px` });
      expect(pushPaddings()).toEqual({});
    });

    it('releases the previous target when pushTarget changes while open', async () => {
      const first = createPushTarget();
      const second = createPushTarget();
      host.pushTarget.set(first);
      await openInPushMode();
      await nextFrame();

      host.pushTarget.set(second);
      fixture.detectChanges();
      await nextFrame();

      expect(pushPaddings(second)).toEqual({ 'padding-right': `${PANEL_WIDTH}px` });
      expect(pushPaddings(first)).toEqual({});
    });

    it('strips the leftover transition once the reflow has settled', async () => {
      await openInPushMode();
      await nextFrame();

      host.isOpen.set(false);
      fixture.detectChanges();
      await nextTask();

      expect(document.body.style.transition).toBe('');
    });

    it('pushes nothing when the pushTarget selector matches no element', async () => {
      host.pushTarget.set('#no-such-region');

      await openInPushMode();
      await nextFrame();

      expect(pushPaddings()).toEqual({});
      expect(host.isOpen()).toBe(true);
    });

    it('strips the offset and transition when destroyed while pushed', async () => {
      await openInPushMode();
      await nextFrame();

      fixture.destroy();

      expect(pushPaddings()).toEqual({});
      expect(document.body.style.transition).toBe('');
    });

    it('leaves no transition on the target when animation is none', async () => {
      host.animation.set('none');

      await openInPushMode();
      await nextFrame();

      expect(pushPaddings()).toEqual({ 'padding-right': `${PANEL_WIDTH}px` });
      expect(document.body.style.transition).toBe('');
    });

    it('drives the target reflow with the linear curve for the linear animation', async () => {
      host.animation.set('linear');

      await openInPushMode();
      await nextFrame();

      expect(document.body.style.transition).toContain('var(--ease-linear)');
    });
  });

  describe('Push mode outside dismissal', () => {
    it('closes on a pointerdown outside the panel', async () => {
      await openInPushMode();

      document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
      expect(host.closedCount()).toBe(1);
    });

    it('stays open for a pointerdown inside the panel', async () => {
      await openInPushMode();

      getPanel().dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });

    it('ignores an outside pointerdown when closeOnBackdrop is false', async () => {
      host.closeOnBackdrop.set(false);
      await openInPushMode();

      document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });

    it('stops listening on the document once the drawer has closed', async () => {
      await openInPushMode();
      host.isOpen.set(false);
      fixture.detectChanges();

      document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
      fixture.detectChanges();

      expect(host.closedCount()).toBe(0);
    });

    it('does not wire outside dismissal in overlay mode', async () => {
      host.isOpen.set(true);
      fixture.detectChanges();
      await nextTask();

      document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });
  });

  describe('Enter animation', () => {
    it('holds the panel off its edge for the tick the drawer opens on', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      expect(getDrawer().classList).not.toContain('ea-drawer--entered');
    });

    it('slides the panel in once the off-edge state has been painted', async () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      await nextFrame();
      await nextFrame();

      expect(getDrawer().classList).toContain('ea-drawer--entered');
    });

    it('enters immediately when animation is none', () => {
      host.animation.set('none');
      fixture.detectChanges();

      host.isOpen.set(true);
      fixture.detectChanges();

      expect(getDrawer().classList).toContain('ea-drawer--entered');
    });

    it('never enters when the drawer closes before the frames run', async () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      host.isOpen.set(false);
      fixture.detectChanges();
      await nextFrame();
      await nextFrame();

      expect(getDrawer().classList).not.toContain('ea-drawer--entered');
    });
  });

  describe('Animated exit', () => {
    // jsdom resolves the panel's token-driven transition to no duration, so the
    // animated exit only runs against an explicitly stubbed duration
    function stubPanelDuration(duration: string): void {
      const stubbed = document.createElement('div').style;
      stubbed.transitionDuration = duration;
      const panel = getPanel();
      vi.spyOn(window, 'getComputedStyle').mockImplementation((element, pseudoElement) =>
        element === panel ? stubbed : REAL_GET_COMPUTED_STYLE(element, pseudoElement),
      );
    }

    function dispatchTransitionEnd(propertyName: string): void {
      const event = new Event('transitionend');
      Object.defineProperty(event, 'propertyName', { value: propertyName });
      getPanel().dispatchEvent(event);
    }

    it('keeps the dialog open while the panel slides back out', () => {
      host.isOpen.set(true);
      fixture.detectChanges();
      stubPanelDuration('300ms');

      host.isOpen.set(false);
      fixture.detectChanges();

      expect(getDrawer().classList).not.toContain('ea-drawer--entered');
      expect(HTMLDialogElement.prototype.close).not.toHaveBeenCalled();
    });

    it('ignores a transitionend for a property other than transform', () => {
      host.isOpen.set(true);
      fixture.detectChanges();
      stubPanelDuration('300ms');
      host.isOpen.set(false);
      fixture.detectChanges();

      dispatchTransitionEnd('opacity');

      expect(HTMLDialogElement.prototype.close).not.toHaveBeenCalled();
    });

    it('closes once the panel transform transition ends', () => {
      host.isOpen.set(true);
      fixture.detectChanges();
      stubPanelDuration('300ms');
      host.isOpen.set(false);
      fixture.detectChanges();

      dispatchTransitionEnd('transform');

      expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
    });

    it('reads a duration expressed in seconds', () => {
      host.isOpen.set(true);
      fixture.detectChanges();
      stubPanelDuration('0.3s');

      host.isOpen.set(false);
      fixture.detectChanges();

      expect(HTMLDialogElement.prototype.close).not.toHaveBeenCalled();
    });

    it('falls back to a timer when transitionend never arrives', async () => {
      host.isOpen.set(true);
      fixture.detectChanges();
      stubPanelDuration('10ms');

      host.isOpen.set(false);
      fixture.detectChanges();
      await new Promise(resolve => setTimeout(resolve, 120));

      expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
    });

    it('cancels the pending close when the drawer reopens mid-exit', async () => {
      host.isOpen.set(true);
      fixture.detectChanges();
      stubPanelDuration('10ms');
      host.isOpen.set(false);
      fixture.detectChanges();

      host.isOpen.set(true);
      fixture.detectChanges();
      await new Promise(resolve => setTimeout(resolve, 120));

      expect(HTMLDialogElement.prototype.close).not.toHaveBeenCalled();
      expect(getDrawer().classList).toContain('ea-drawer--entered');
    });
  });

  describe('Outputs', () => {
    it('emits opened once the drawer has been shown', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      expect(host.openedCount()).toBe(1);
    });

    it('does not re-emit opened when only the modality changes', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      host.mode.set('push');
      fixture.detectChanges();

      expect(host.openedCount()).toBe(1);
    });

    it('emits closed once when the native close event trails a user close', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      getCloseButton()!.click();
      fixture.detectChanges();
      getDrawer().dispatchEvent(new Event('close'));
      fixture.detectChanges();

      expect(host.closedCount()).toBe(1);
    });

    it('stays quiet when the open model is cleared by the consumer', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      host.isOpen.set(false);
      fixture.detectChanges();

      expect(host.closedCount()).toBe(0);
    });

    it('ignores a close event fired while the dialog is still open', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      getDrawer().dispatchEvent(new Event('close'));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
      expect(host.closedCount()).toBe(0);
    });
  });

  describe('Accessible name', () => {
    it('points aria-labelledby at the projected header', () => {
      const drawer = fixture.nativeElement.querySelector('.ea-drawer') as HTMLElement;

      expect(drawer.getAttribute('aria-labelledby')).toBe(`${drawer.id}-header`);
    });

    it('drops aria-labelledby when no header content is projected', () => {
      const bare = TestBed.createComponent(NoHeaderHostComponent);
      bare.detectChanges();

      const drawer = bare.nativeElement.querySelector('.ea-drawer') as HTMLElement;

      expect(drawer.getAttribute('aria-labelledby')).toBeNull();
    });
  });

  describe('Content projection', () => {
    it('projects header content', () => {
      const header = fixture.nativeElement.querySelector('.ea-drawer__header');

      expect(header.textContent).toContain('Drawer Title');
    });

    it('projects body content', () => {
      const body = fixture.nativeElement.querySelector('.ea-drawer__body');

      expect(body.textContent).toContain('Drawer body content');
    });

    it('projects footer content', () => {
      const footer = fixture.nativeElement.querySelector('.ea-drawer__footer');

      expect(footer.textContent).toContain('Footer');
    });
  });
});

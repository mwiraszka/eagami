import type { Mock } from 'vitest';

import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

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
  // With no layout engine nothing ever transitions, which an empty list says
  if (typeof Element.prototype.getAnimations !== 'function') {
    Element.prototype.getAnimations = (): Animation[] => [];
  }
});

// happy-dom implements no Web Animations, so a spec stands in for a CSS
// transition a style change would start, and finishes or cancels it by hand
class FakeTransition extends EventTarget implements CSSTransition {
  currentTime: CSSNumberish | null = null;
  effect: AnimationEffect | null = null;
  id = '';
  oncancel: CSSTransition['oncancel'] = null;
  onfinish: CSSTransition['onfinish'] = null;
  onremove: CSSTransition['onremove'] = null;
  readonly overallProgress = null;
  readonly pending = false;
  playState: AnimationPlayState = 'running';
  playbackRate = 1;
  readonly replaceState: AnimationReplaceState = 'active';
  startTime: CSSNumberish | null = null;
  timeline: AnimationTimeline | null = null;
  readonly ready: Promise<Animation> = Promise.resolve(this);
  readonly finished: Promise<Animation>;
  private resolveFinished: (animation: Animation) => void = () => undefined;
  private rejectFinished: (reason: DOMException) => void = () => undefined;

  constructor(readonly transitionProperty: string) {
    super();
    this.finished = new Promise((resolve, reject) => {
      this.resolveFinished = resolve;
      this.rejectFinished = reject;
    });
  }

  finish(): void {
    this.playState = 'finished';
    this.resolveFinished(this);
  }

  cancel(): void {
    this.playState = 'idle';
    this.rejectFinished(new DOMException('The transition was cancelled', 'AbortError'));
  }

  commitStyles(): void {}

  pause(): void {}

  persist(): void {}

  play(): void {}

  reverse(): void {}

  updatePlaybackRate(): void {}
}

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

  // Lets every settled transition's promise callbacks run
  function nextTask(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve));
  }

  // Answers `getAnimations()` on `el` with the transitions a style change would
  // have started there
  function stubTransitions(el: Element, ...transitions: FakeTransition[]): void {
    vi.stubGlobal('CSSTransition', FakeTransition);
    vi.spyOn(el, 'getAnimations').mockReturnValue(transitions);
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

  function openInPushMode(): void {
    host.mode.set('push');
    fixture.detectChanges();
    stubPanelExtent(PANEL_WIDTH, PANEL_HEIGHT);
    host.isOpen.set(true);
    fixture.detectChanges();
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
    vi.unstubAllGlobals();
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

    it('does not close when a drag out of the panel releases on the backdrop', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      const drawer = getDrawer();
      getPanel().dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
      drawer.dispatchEvent(new MouseEvent('pointerup', { bubbles: true }));
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
      openInPushMode();
      await nextFrame();

      host.position.set('top');
      fixture.detectChanges();
      await nextFrame();

      expect(pushPaddings()).toEqual({ 'padding-top': `${PANEL_HEIGHT}px` });
    });

    it('re-measures the offset when size changes while open', async () => {
      openInPushMode();
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

      openInPushMode();
      await nextFrame();

      expect(pushPaddings(target)).toEqual({ 'padding-right': `${PANEL_WIDTH}px` });
      expect(pushPaddings()).toEqual({});
    });

    it('resolves a string pushTarget as a CSS selector', async () => {
      const target = createPushTarget('push-region');
      host.pushTarget.set('#push-region');

      openInPushMode();
      await nextFrame();

      expect(pushPaddings(target)).toEqual({ 'padding-right': `${PANEL_WIDTH}px` });
      expect(pushPaddings()).toEqual({});
    });

    it('releases the previous target when pushTarget changes while open', async () => {
      const first = createPushTarget();
      const second = createPushTarget();
      host.pushTarget.set(first);
      openInPushMode();
      await nextFrame();

      host.pushTarget.set(second);
      fixture.detectChanges();
      await nextFrame();

      expect(pushPaddings(second)).toEqual({ 'padding-right': `${PANEL_WIDTH}px` });
      expect(pushPaddings(first)).toEqual({});
    });

    it('strips the leftover transition at once when no reflow runs', async () => {
      openInPushMode();
      await nextFrame();

      host.isOpen.set(false);
      fixture.detectChanges();

      expect(document.body.style.transition).toBe('');
    });

    it('keeps the transition until the reflow back has finished', async () => {
      openInPushMode();
      await nextFrame();
      const reflow = new FakeTransition('padding-right');
      stubTransitions(document.body, reflow);
      host.isOpen.set(false);
      fixture.detectChanges();
      await nextTask();

      expect(document.body.style.transition).toContain('padding');

      reflow.finish();
      await nextTask();

      expect(document.body.style.transition).toBe('');
    });

    it('strips the transition once the reflow back is cancelled', async () => {
      openInPushMode();
      await nextFrame();
      const reflow = new FakeTransition('padding-right');
      stubTransitions(document.body, reflow);
      host.isOpen.set(false);
      fixture.detectChanges();

      reflow.cancel();
      await nextTask();

      expect(document.body.style.transition).toBe('');
    });

    it('keeps the transition when a reopen cuts the reflow back short', async () => {
      openInPushMode();
      await nextFrame();
      const reflow = new FakeTransition('padding-right');
      stubTransitions(document.body, reflow);
      host.isOpen.set(false);
      fixture.detectChanges();

      host.isOpen.set(true);
      fixture.detectChanges();
      await nextFrame();
      reflow.cancel();
      await nextTask();

      expect(document.body.style.transition).toContain('padding');
    });

    it('ignores transitions on properties other than padding', async () => {
      openInPushMode();
      await nextFrame();
      stubTransitions(document.body, new FakeTransition('color'));

      host.isOpen.set(false);
      fixture.detectChanges();

      expect(document.body.style.transition).toBe('');
    });

    it('pushes nothing when the pushTarget selector matches no element', async () => {
      host.pushTarget.set('#no-such-region');

      openInPushMode();
      await nextFrame();

      expect(pushPaddings()).toEqual({});
      expect(host.isOpen()).toBe(true);
    });

    it('strips the offset and transition when destroyed while pushed', async () => {
      openInPushMode();
      await nextFrame();

      fixture.destroy();

      expect(pushPaddings()).toEqual({});
      expect(document.body.style.transition).toBe('');
    });

    it('leaves no transition on the target when animation is none', async () => {
      host.animation.set('none');

      openInPushMode();
      await nextFrame();

      expect(pushPaddings()).toEqual({ 'padding-right': `${PANEL_WIDTH}px` });
      expect(document.body.style.transition).toBe('');
    });

    it('drives the target reflow with the linear curve for the linear animation', async () => {
      host.animation.set('linear');

      openInPushMode();
      await nextFrame();

      expect(document.body.style.transition).toContain('var(--ease-linear)');
    });
  });

  describe('Push mode outside dismissal', () => {
    // A press is two events, and a click is dispatched on the first ancestor
    // they share, so both ends have to be stated for the drag cases to be real
    function press(from: Element, to: Element = from): void {
      from.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
      to.dispatchEvent(new MouseEvent('pointerup', { bubbles: true }));
      to.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
    }

    it('closes on a click outside the panel', () => {
      openInPushMode();

      press(document.body);

      expect(host.isOpen()).toBe(false);
      expect(host.closedCount()).toBe(1);
    });

    it('stays open for a click inside the panel', () => {
      openInPushMode();

      press(getPanel());

      expect(host.isOpen()).toBe(true);
    });

    it('stays open when a drag out of the panel ends outside it', () => {
      openInPushMode();

      press(getPanel(), document.body);

      expect(host.isOpen()).toBe(true);
    });

    it('ignores an outside click when closeOnBackdrop is false', () => {
      host.closeOnBackdrop.set(false);
      openInPushMode();

      press(document.body);

      expect(host.isOpen()).toBe(true);
    });

    it('ignores the click that opened the drawer as it reaches the document', () => {
      host.mode.set('push');
      fixture.detectChanges();
      const trigger = document.createElement('button');
      document.body.appendChild(trigger);
      createdTargets.push(trigger);
      trigger.addEventListener('click', () => {
        host.isOpen.set(true);
        fixture.detectChanges();
      });

      trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
      expect(host.closedCount()).toBe(0);
    });

    it('stops listening on the document once the drawer has closed', () => {
      openInPushMode();
      host.isOpen.set(false);
      fixture.detectChanges();

      press(document.body);

      expect(host.closedCount()).toBe(0);
    });

    it('does not wire outside dismissal in overlay mode', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      press(document.body);

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
    function openThenClose(...transitions: FakeTransition[]): void {
      host.isOpen.set(true);
      fixture.detectChanges();
      stubTransitions(getPanel(), ...transitions);
      host.isOpen.set(false);
      fixture.detectChanges();
    }

    it('keeps the dialog open while the panel slides back out', () => {
      openThenClose(new FakeTransition('transform'));

      expect(getDrawer().classList).not.toContain('ea-drawer--entered');
      expect(HTMLDialogElement.prototype.close).not.toHaveBeenCalled();
    });

    it('closes once the panel slide finishes', async () => {
      const slide = new FakeTransition('transform');
      openThenClose(slide);

      slide.finish();
      await nextTask();

      expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
      expect(host.isOpen()).toBe(false);
    });

    it('closes at once when no slide starts, as under reduced motion', () => {
      openThenClose();

      expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
    });

    it('closes at once when only a property other than transform transitions', () => {
      openThenClose(new FakeTransition('opacity'));

      expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
    });

    it('follows a slide retargeted mid-exit into the new one', async () => {
      const slide = new FakeTransition('transform');
      const retargeted = new FakeTransition('transform');
      openThenClose(slide);
      stubTransitions(getPanel(), retargeted);

      slide.cancel();
      await nextTask();

      expect(HTMLDialogElement.prototype.close).not.toHaveBeenCalled();

      retargeted.finish();
      await nextTask();

      expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
    });

    it('closes when the slide is cancelled with none to follow', async () => {
      const slide = new FakeTransition('transform');
      openThenClose(slide);
      stubTransitions(getPanel());

      slide.cancel();
      await nextTask();

      expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
    });

    it('cancels the pending close when the drawer reopens mid-exit', async () => {
      const slide = new FakeTransition('transform');
      openThenClose(slide);

      host.isOpen.set(true);
      fixture.detectChanges();
      await nextFrame();
      await nextFrame();
      slide.cancel();
      await nextTask();

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

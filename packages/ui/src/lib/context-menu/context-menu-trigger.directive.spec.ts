import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemComponent } from '../menu/menu-item.component';
import { MenuComponent } from '../menu/menu.component';
import type { PopoverAnchorPoint } from '../popover/popover-positioning';
import { PopoverComponent, type PopoverOpenRequest } from '../popover/popover.component';
import {
  type ContextMenuPosition,
  ContextMenuTriggerDirective,
} from './context-menu-trigger.directive';
import { LONG_PRESS_DELAY_MS } from './long-press';

type TargetKind = 'menu' | 'popover' | 'none';

@Component({
  imports: [
    ContextMenuTriggerDirective,
    MenuComponent,
    MenuItemComponent,
    PopoverComponent,
  ],
  template: `
    <div
      #area
      class="area"
      [eaContextMenuTrigger]="
        target() === 'menu' ? menu : target() === 'popover' ? popover : null
      "
      [contextMenuPosition]="position()">
      <button class="inner">Inner</button>
    </div>
    <ea-menu
      #menu
      [(open)]="menuOpen"
      [disabled]="menuDisabled()">
      <ea-menu-item>Edit</ea-menu-item>
    </ea-menu>
    <ea-popover
      #popover
      [anchor]="area"
      [open]="popoverOpen()"
      [anchorPoint]="point()"
      [contextMenu]="true"
      (openRequested)="onOpenRequested($event)"
      (closeRequested)="popoverOpen.set(false)">
      <button class="popover-action">Action</button>
    </ea-popover>
  `,
})
class HostComponent {
  readonly target = signal<TargetKind>('menu');
  readonly position = signal<ContextMenuPosition>('pointer');
  readonly menuOpen = signal(false);
  readonly menuDisabled = signal(false);
  readonly popoverOpen = signal(false);
  readonly point = signal<PopoverAnchorPoint | null>(null);
  readonly requests: PopoverOpenRequest[] = [];

  onOpenRequested(request: PopoverOpenRequest): void {
    this.requests.push(request);
    this.point.set(request.point);
    this.popoverOpen.set(true);
  }
}

describe('ContextMenuTriggerDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  function area(): HTMLElement {
    return fixture.nativeElement.querySelector('.area');
  }

  function inner(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.inner');
  }

  function openSurface(): HTMLElement | null {
    return (
      Array.from(document.querySelectorAll<HTMLElement>('.ea-popover__surface')).find(
        surface => surface.style.display !== 'none',
      ) ?? null
    );
  }

  function rightClick(target: HTMLElement, init: MouseEventInit = {}): MouseEvent {
    const event = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      button: 2,
      clientX: 120,
      clientY: 80,
      ...init,
    });
    target.dispatchEvent(event);
    fixture.detectChanges();
    return event;
  }

  function shiftF10(target: HTMLElement, init: KeyboardEventInit = {}): KeyboardEvent {
    const event = new KeyboardEvent('keydown', {
      key: 'F10',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
      ...init,
    });
    target.dispatchEvent(event);
    fixture.detectChanges();
    return event;
  }

  function longPress(target: HTMLElement): void {
    target.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        cancelable: true,
        clientX: 60,
        clientY: 40,
        pointerId: 1,
        pointerType: 'touch',
        isPrimary: true,
      }),
    );
    vi.advanceTimersByTime(LONG_PRESS_DELAY_MS);
    target.dispatchEvent(
      new PointerEvent('pointerup', {
        bubbles: true,
        pointerId: 1,
        pointerType: 'touch',
      }),
    );
    fixture.detectChanges();
  }

  function click(target: HTMLElement): MouseEvent {
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    target.dispatchEvent(event);
    return event;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('with a menu', () => {
    it('opens the menu at the pointer and suppresses the browser menu', () => {
      const event = rightClick(area());

      expect(host.menuOpen()).toBe(true);
      expect(event.defaultPrevented).toBe(true);
      expect(openSurface()?.style.top).toBe('84px');
      expect(openSurface()?.style.left).toBe('120px');
    });

    it('opens on Shift+F10 below the focused element', () => {
      inner().getBoundingClientRect = () => new DOMRect(40, 60, 100, 30);

      const event = shiftF10(inner());

      expect(host.menuOpen()).toBe(true);
      expect(event.defaultPrevented).toBe(true);
      expect(openSurface()?.style.top).toBe('94px');
      expect(openSurface()?.style.left).toBe('40px');
    });

    it('opens below the focused element for the context-menu key', () => {
      inner().getBoundingClientRect = () => new DOMRect(40, 60, 100, 30);

      rightClick(inner(), { button: 0, clientX: 0, clientY: 0 });

      expect(openSurface()?.style.top).toBe('94px');
      expect(openSurface()?.style.left).toBe('40px');
    });

    it('ignores F10 without Shift, or with another modifier', () => {
      shiftF10(inner(), { shiftKey: false });
      shiftF10(inner(), { altKey: true });

      expect(host.menuOpen()).toBe(false);
    });

    it('opens at its placement against the host when positioned at the anchor', () => {
      host.position.set('anchor');
      fixture.detectChanges();
      area().getBoundingClientRect = () => new DOMRect(10, 20, 300, 100);

      rightClick(area());

      expect(openSurface()?.style.top).toBe('124px');
      expect(openSurface()?.style.left).toBe('10px');
    });

    it('leaves the browser menu alone for a disabled menu', () => {
      host.menuDisabled.set(true);
      fixture.detectChanges();

      const event = rightClick(area());

      expect(host.menuOpen()).toBe(false);
      expect(event.defaultPrevented).toBe(false);
    });

    it('hands focus back to where it was once the menu closes', async () => {
      inner().focus();
      shiftF10(inner());
      await fixture.whenStable();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(host.menuOpen()).toBe(false);
      expect(document.activeElement).toBe(inner());
    });
  });

  describe('on a touch long press', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('opens the menu at the press, since iOS sends no contextmenu event', () => {
      longPress(inner());

      expect(host.menuOpen()).toBe(true);
      expect(openSurface()?.style.left).toBe('60px');
    });

    it('keeps the click the press ends with from reaching the host', () => {
      longPress(inner());

      const trailing = click(inner());

      expect(trailing.defaultPrevented).toBe(true);
    });

    it('leaves the press and its click alone without a target', () => {
      host.target.set('none');
      fixture.detectChanges();

      longPress(inner());
      const trailing = click(inner());

      expect(trailing.defaultPrevented).toBe(false);
    });
  });

  it('drops the iOS long-press preview only while a target is set', () => {
    const setProperty = vi.spyOn(area().style, 'setProperty');
    const removeProperty = vi.spyOn(area().style, 'removeProperty');

    host.target.set('none');
    fixture.detectChanges();
    host.target.set('menu');
    fixture.detectChanges();

    expect(removeProperty).toHaveBeenCalledWith('-webkit-touch-callout');
    expect(setProperty).toHaveBeenLastCalledWith('-webkit-touch-callout', 'none');
  });

  describe('with a popover', () => {
    beforeEach(() => {
      host.target.set('popover');
      fixture.detectChanges();
    });

    it('asks the popover to open at the pointer', () => {
      const event = rightClick(area());

      expect(host.requests).toEqual([{ point: { x: 120, y: 80 } }]);
      expect(event.defaultPrevented).toBe(true);
      expect(openSurface()?.style.top).toBe('84px');
    });

    it('asks it to open against the host when positioned at the anchor', () => {
      host.position.set('anchor');
      fixture.detectChanges();

      rightClick(area());

      expect(host.requests).toEqual([{ point: null }]);
    });

    it('reopens it at the new spot on another right-click in the host', () => {
      rightClick(area());

      rightClick(area(), { clientX: 200, clientY: 150 });

      expect(host.popoverOpen()).toBe(true);
      expect(openSurface()?.style.top).toBe('154px');
      expect(openSurface()?.style.left).toBe('200px');
    });
  });

  describe('without a target', () => {
    beforeEach(() => {
      host.target.set('none');
      fixture.detectChanges();
    });

    it('leaves the browser menu alone', () => {
      const event = rightClick(area());
      const key = shiftF10(inner());

      expect(event.defaultPrevented).toBe(false);
      expect(key.defaultPrevented).toBe(false);
      expect(host.menuOpen()).toBe(false);
    });
  });

  it('leaves a request something inside the host already handled alone', () => {
    inner().addEventListener('contextmenu', event => event.preventDefault());

    rightClick(inner());

    expect(host.menuOpen()).toBe(false);
  });
});

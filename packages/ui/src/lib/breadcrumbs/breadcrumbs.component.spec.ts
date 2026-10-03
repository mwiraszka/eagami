import { type ComponentFixture, TestBed } from '@angular/core/testing';

import {
  type BreadcrumbClickEvent,
  type BreadcrumbItem,
  BreadcrumbsComponent,
} from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let component: BreadcrumbsComponent;

  const defaultItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Laptops' },
  ];

  const longTrail: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Computers', href: '/products/computers' },
    { label: 'Laptops', href: '/products/computers/laptops' },
    { label: 'MacBook Pro' },
  ];

  // The trail itself, apart from the invisible copy the component measures
  function getList(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-breadcrumbs__list');
  }

  function getItems(): HTMLElement[] {
    return Array.from(getList().querySelectorAll('.ea-breadcrumbs__item'));
  }

  function getExpand(): HTMLButtonElement | null {
    return getList().querySelector('.ea-breadcrumbs__expand');
  }

  function getLabels(): string[] {
    const crumbs: HTMLElement[] = Array.from(
      getList().querySelectorAll(
        '.ea-breadcrumbs__link:not(.ea-breadcrumbs__expand), .ea-breadcrumbs__current',
      ),
    );
    return crumbs.map(el => el.textContent?.trim() ?? '');
  }

  function getLinks(): HTMLAnchorElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('a.ea-breadcrumbs__link'));
  }

  function getCurrent(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.ea-breadcrumbs__current');
  }

  function getSeparators(): HTMLElement[] {
    return Array.from(getList().querySelectorAll('.ea-breadcrumbs__separator'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', defaultItems);
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders a nav with the correct aria-label', () => {
      const nav = fixture.nativeElement.querySelector('nav.ea-breadcrumbs');

      expect(nav).toBeTruthy();
      expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
    });

    it('renders one list item per input item', () => {
      expect(getItems()).toHaveLength(3);
    });

    it('renders anchor elements for items with an href (except last)', () => {
      const links = getLinks();

      expect(links).toHaveLength(2);
      expect(links[0].getAttribute('href')).toBe('/');
      expect(links[1].getAttribute('href')).toBe('/products');
    });

    it('renders last item as current page with aria-current', () => {
      const current = getCurrent();

      expect(current?.textContent?.trim()).toBe('Laptops');
      expect(current?.getAttribute('aria-current')).toBe('page');
    });

    it('renders one fewer separator than items', () => {
      expect(getSeparators()).toHaveLength(2);
    });

    it('renders a button for items without an href (except last)', () => {
      fixture.componentRef.setInput('items', [
        { label: 'Root' },
        { label: 'Branch' },
        { label: 'Leaf' },
      ]);
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll(
        'button.ea-breadcrumbs__link',
      );

      expect(buttons).toHaveLength(2);
    });
  });

  describe('Separator', () => {
    it('uses chevron icon by default', () => {
      const icons = getList().querySelectorAll('ea-icon-chevron-right');

      expect(icons).toHaveLength(2);
    });

    it('uses slash when separator is "slash"', () => {
      fixture.componentRef.setInput('separator', 'slash');
      fixture.detectChanges();

      const slashes = getList().querySelectorAll('.ea-breadcrumbs__separator--slash');

      expect(slashes).toHaveLength(2);
      expect(slashes[0].textContent.trim()).toBe('/');
    });
  });

  describe('Click handling', () => {
    it('emits clicked with the item and index', () => {
      const spy = vi.fn<(event: BreadcrumbClickEvent) => void>();
      component.clicked.subscribe(spy);

      getLinks()[0].click();

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ index: 0, item: defaultItems[0] }),
      );
    });

    it('does not emit on last item click', () => {
      const spy = vi.fn();
      component.clicked.subscribe(spy);

      getCurrent()?.click();

      expect(spy).not.toHaveBeenCalled();
    });

    it('does not emit on disabled item click', () => {
      fixture.componentRef.setInput('items', [
        { label: 'Home', href: '/' },
        { label: 'Archive', href: '/archive', disabled: true },
        { label: 'Item' },
      ]);
      fixture.detectChanges();

      const spy = vi.fn();
      component.clicked.subscribe(spy);

      const disabled = fixture.nativeElement.querySelector(
        '.ea-breadcrumbs__link--disabled',
      );
      disabled.click();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Hidden levels menu', () => {
    function getMenu(): HTMLElement | null {
      // The popover surface renders unconditionally in document.body, hidden via
      // display: none, so a hidden one counts as no menu
      const surface = document.querySelector<HTMLElement>('.ea-popover__surface');
      if (!surface || surface.style.display === 'none') {
        return null;
      }
      return surface.querySelector<HTMLElement>('.ea-breadcrumbs__menu');
    }

    function getMenuItems(): HTMLElement[] {
      return Array.from(
        getMenu()?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
      );
    }

    function getMenuLabels(): string[] {
      return getMenuItems().map(item => item.textContent?.trim() ?? '');
    }

    function hover(): void {
      getExpand()!.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
    }

    function leave(from: HTMLElement, to: EventTarget): void {
      from.dispatchEvent(new MouseEvent('mouseleave', { relatedTarget: to }));
      fixture.detectChanges();
    }

    function press(): void {
      getExpand()!.click();
      fixture.detectChanges();
    }

    beforeEach(() => {
      fixture.componentRef.setInput('items', longTrail);
      fixture.componentRef.setInput('maxItems', 3);
      fixture.detectChanges();
    });

    it('keeps the first item and the last ones in the trail behind a menu button', () => {
      expect(getLabels()).toEqual(['Home', 'Laptops', 'MacBook Pro']);
      expect(getExpand()?.getAttribute('aria-label')).toBe('Show hidden levels');
      expect(getExpand()?.getAttribute('aria-haspopup')).toBe('menu');
    });

    it('shows the whole trail when it fits within maxItems', () => {
      fixture.componentRef.setInput('maxItems', 5);
      fixture.detectChanges();

      expect(getLabels()).toHaveLength(5);
      expect(getExpand()).toBeNull();
    });

    it('shows the whole trail when maxItems is not set', () => {
      fixture.componentRef.setInput('maxItems', undefined);
      fixture.detectChanges();

      expect(getLabels()).toHaveLength(5);
      expect(getExpand()).toBeNull();
    });

    it('never moves the first or the last item into the menu', () => {
      fixture.componentRef.setInput('maxItems', 1);
      fixture.detectChanges();

      press();

      expect(getLabels()).toEqual(['Home', 'MacBook Pro']);
      expect(getMenuLabels()).toEqual(['Products', 'Computers', 'Laptops']);
    });

    it('lists the hidden levels in a menu on a press and leaves the trail as it is', () => {
      press();

      expect(getMenuLabels()).toEqual(['Products', 'Computers']);
      expect(getLabels()).toEqual(['Home', 'Laptops', 'MacBook Pro']);
      expect(getExpand()?.getAttribute('aria-expanded')).toBe('true');
    });

    it('closes the menu on a second press', () => {
      press();

      press();

      expect(getMenu()).toBeNull();
      expect(getExpand()?.getAttribute('aria-expanded')).toBe('false');
    });

    it('opens the menu when the pointer enters the button', () => {
      hover();

      expect(getMenuLabels()).toEqual(['Products', 'Computers']);
    });

    it('closes a hover-opened menu when the pointer leaves for somewhere else', () => {
      hover();

      leave(getExpand()!, document.body);

      expect(getMenu()).toBeNull();
    });

    it('keeps a hover-opened menu open while the pointer moves onto it', () => {
      hover();

      leave(getExpand()!, getMenu()!);

      expect(getMenu()).toBeTruthy();
    });

    it('closes a hover-opened menu when the pointer leaves the menu', () => {
      hover();

      leave(getMenu()!, document.body);

      expect(getMenu()).toBeNull();
    });

    it('keeps a menu opened by a press open when the pointer leaves', () => {
      press();

      leave(getExpand()!, document.body);

      expect(getMenu()).toBeTruthy();
    });

    it('keeps a hover-opened menu open once the button is pressed', () => {
      hover();

      press();
      leave(getExpand()!, document.body);

      expect(getMenu()).toBeTruthy();
    });

    it('renders a hidden level as a link to the same address', () => {
      press();

      expect(getMenuItems()[0].tagName).toBe('A');
      expect(getMenuItems()[0].getAttribute('href')).toBe('/products');
    });

    it('reports a menu item by its index in the full trail and closes the menu', () => {
      const spy = vi.fn<(event: BreadcrumbClickEvent) => void>();
      component.clicked.subscribe(spy);
      press();

      getMenuItems()[1].click();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ index: 2, item: longTrail[2] }),
      );
      expect(getMenu()).toBeNull();
    });

    it('leaves a disabled level in the menu inert', () => {
      const spy = vi.fn<(event: BreadcrumbClickEvent) => void>();
      component.clicked.subscribe(spy);
      fixture.componentRef.setInput('items', [
        longTrail[0],
        { ...longTrail[1], disabled: true },
        ...longTrail.slice(2),
      ]);
      fixture.detectChanges();
      press();

      getMenuItems()[0].click();

      expect(getMenuItems()[0].getAttribute('aria-disabled')).toBe('true');
      expect(spy).not.toHaveBeenCalled();
    });

    it('moves through the menu with the arrow keys', () => {
      press();
      const [first, second] = getMenuItems();
      first.focus();

      first.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
      );

      expect(document.activeElement).toBe(second);

      second.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
      );

      expect(document.activeElement).toBe(first);
    });

    it('closes on Escape and returns focus to the button', () => {
      press();
      const [first] = getMenuItems();
      first.focus();

      first.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();

      expect(getMenu()).toBeNull();
      expect(document.activeElement).toBe(getExpand());
    });

    it('opens the menu on ArrowDown from the button', () => {
      getExpand()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(getMenu()).toBeTruthy();
    });

    it('closes the menu once nothing is hidden any more', () => {
      press();

      fixture.componentRef.setInput('maxItems', 5);
      fixture.detectChanges();

      expect(getMenu()).toBeNull();
    });
  });

  describe('Overflow', () => {
    // Every level is 100px wide and the menu button 40px, against a container
    // whose width each test sets
    let available = 1000;
    const observers = new Set<ResizeObserverStub>();

    class ResizeObserverStub implements ResizeObserver {
      constructor(private readonly callback: ResizeObserverCallback) {
        observers.add(this);
      }

      observe(): void {}

      unobserve(): void {}

      disconnect(): void {
        observers.delete(this);
      }

      report(): void {
        this.callback([], this);
      }
    }

    function rect(width: number): DOMRect {
      return {
        x: 0,
        y: 0,
        top: 0,
        right: width,
        bottom: 0,
        left: 0,
        width,
        height: 0,
        toJSON: () => ({}),
      };
    }

    function resizeTo(width: number): void {
      available = width;
      for (const observer of observers) {
        observer.report();
      }
      fixture.detectChanges();
    }

    beforeEach(() => {
      available = 1000;
      vi.stubGlobal('ResizeObserver', ResizeObserverStub);
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
        this: Element,
      ) {
        if (this.classList.contains('ea-breadcrumbs__sizer')) {
          return rect(available);
        }
        return rect(this.classList.contains('ea-breadcrumbs__sizer-expand') ? 40 : 100);
      });
      fixture.componentRef.setInput('items', longTrail);
      fixture.detectChanges();
    });

    afterEach(() => {
      vi.unstubAllGlobals();
      observers.clear();
    });

    it('shows every level while the trail fits', () => {
      expect(getLabels()).toHaveLength(5);
      expect(getExpand()).toBeNull();
    });

    it('moves the earliest levels after the first into the menu when space runs short', () => {
      resizeTo(350);

      expect(getLabels()).toEqual(['Home', 'Laptops', 'MacBook Pro']);
      expect(getExpand()).toBeTruthy();
    });

    it('moves only as many levels as it takes', () => {
      resizeTo(450);

      expect(getLabels()).toEqual(['Home', 'Computers', 'Laptops', 'MacBook Pro']);
    });

    it('keeps the first and the last item however little room there is', () => {
      resizeTo(50);

      expect(getLabels()).toEqual(['Home', 'MacBook Pro']);
    });

    it('brings levels back into the trail as room opens up', () => {
      resizeTo(350);

      resizeTo(450);

      expect(getLabels()).toEqual(['Home', 'Computers', 'Laptops', 'MacBook Pro']);

      resizeTo(1000);

      expect(getLabels()).toHaveLength(5);
      expect(getExpand()).toBeNull();
    });

    it('hides whichever is more, the levels past maxItems or the ones with no room', () => {
      fixture.componentRef.setInput('maxItems', 4);
      fixture.detectChanges();

      expect(getLabels()).toEqual(['Home', 'Computers', 'Laptops', 'MacBook Pro']);

      resizeTo(350);

      expect(getLabels()).toEqual(['Home', 'Laptops', 'MacBook Pro']);
    });

    it('keeps every level in the trail and scrolls when overflow is scroll', () => {
      fixture.componentRef.setInput('overflow', 'scroll');
      fixture.detectChanges();

      resizeTo(350);

      expect(getLabels()).toHaveLength(5);
      expect(
        fixture.nativeElement.querySelector('nav.ea-breadcrumbs--scroll'),
      ).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.ea-breadcrumbs__sizer')).toBeNull();
    });

    it('still honours maxItems when overflow is scroll', () => {
      fixture.componentRef.setInput('overflow', 'scroll');
      fixture.componentRef.setInput('maxItems', 3);
      fixture.detectChanges();

      expect(getLabels()).toEqual(['Home', 'Laptops', 'MacBook Pro']);
    });
  });

  describe('Edge cases', () => {
    it('handles an empty item list', () => {
      fixture.componentRef.setInput('items', []);
      fixture.detectChanges();

      expect(getItems()).toHaveLength(0);
      expect(getSeparators()).toHaveLength(0);
    });

    it('handles a single item as current page', () => {
      fixture.componentRef.setInput('items', [{ label: 'Home' }]);
      fixture.detectChanges();

      expect(getItems()).toHaveLength(1);
      expect(getSeparators()).toHaveLength(0);
      expect(getCurrent()?.textContent?.trim()).toBe('Home');
    });

    it('accepts a custom aria-label', () => {
      fixture.componentRef.setInput('aria-label', 'Page navigation');
      fixture.detectChanges();

      const nav = fixture.nativeElement.querySelector('nav.ea-breadcrumbs');

      expect(nav.getAttribute('aria-label')).toBe('Page navigation');
    });
  });
});

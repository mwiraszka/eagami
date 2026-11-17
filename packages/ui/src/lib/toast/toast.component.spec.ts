import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartIconComponent } from '../icons/heart.component';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

describe('ToastComponent', () => {
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  function getContainer(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.ea-toast-container');
  }

  function getToasts(): HTMLElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.ea-toast'));
  }

  function getLiveRegion(politeness: 'polite' | 'assertive'): HTMLElement | null {
    return fixture.nativeElement.querySelector(
      `.ea-toast-container__live[aria-live="${politeness}"]`,
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  afterEach(() => {
    toastService.clear();
  });

  it('keeps the container itself out of the live-region tree', () => {
    expect(getContainer()?.hasAttribute('aria-live')).toBe(false);
    expect(getToasts()).toHaveLength(0);
  });

  it('renders empty polite and assertive live regions before the first toast', () => {
    const polite = getLiveRegion('polite');
    const assertive = getLiveRegion('assertive');

    expect(getToasts()).toHaveLength(0);
    expect(polite).not.toBeNull();
    expect(assertive).not.toBeNull();
    expect(polite!.textContent!.trim()).toBe('');
    expect(assertive!.textContent!.trim()).toBe('');
  });

  it('adds toast text into the live regions that were already rendered', () => {
    const polite = getLiveRegion('polite');
    const assertive = getLiveRegion('assertive');

    toastService.success('Saved', 0);
    toastService.error('Upload failed', 0);
    fixture.detectChanges();

    expect(getLiveRegion('polite')).toBe(polite);
    expect(getLiveRegion('assertive')).toBe(assertive);
    expect(polite!.textContent).toContain('Saved');
    expect(assertive!.textContent).toContain('Upload failed');
  });

  it('renders one element per active toast', () => {
    toastService.show('first', { duration: 0 });
    toastService.show('second', { duration: 0 });
    fixture.detectChanges();

    expect(getToasts()).toHaveLength(2);
  });

  it('applies the variant modifier class', () => {
    toastService.error('boom', 0);
    fixture.detectChanges();

    expect(getToasts()[0].classList).toContain('ea-toast--error');
  });

  it('renders a custom icon component in place of the variant icon', () => {
    toastService.show('saved', {
      variant: 'success',
      duration: 0,
      icon: HeartIconComponent,
    });
    fixture.detectChanges();

    const toast = getToasts()[0];

    expect(toast.querySelector('ea-icon-heart')).not.toBeNull();
    expect(toast.querySelector('ea-icon-check-circle')).toBeNull();
  });

  it('renders a title above the message when one is given', () => {
    toastService.show('Your changes are live', {
      title: 'Deployment finished',
      duration: 0,
    });
    fixture.detectChanges();

    const toast = getToasts()[0];

    expect(toast.querySelector('.ea-toast__title')!.textContent).toContain(
      'Deployment finished',
    );
    expect(toast.querySelector('.ea-toast__message')!.textContent).toContain(
      'Your changes are live',
    );
  });

  it('renders no title element when none is given', () => {
    toastService.show('Your changes are live', { duration: 0 });
    fixture.detectChanges();

    expect(getToasts()[0].querySelector('.ea-toast__title')).toBeNull();
  });

  it('renders no icon when the override is null', () => {
    toastService.show('saved', { variant: 'success', duration: 0, icon: null });
    fixture.detectChanges();

    expect(getToasts()[0].querySelector('.ea-toast__icon')).toBeNull();
  });

  it('announces errors and warnings assertively and the rest politely', () => {
    toastService.error('boom', 0);
    toastService.warning('careful', 0);
    toastService.success('ok', 0);
    toastService.info('fyi', 0);
    toastService.show('plain', { duration: 0 });
    fixture.detectChanges();

    const assertive = getLiveRegion('assertive')!.textContent;
    const polite = getLiveRegion('polite')!.textContent;

    expect(assertive).toContain('boom');
    expect(assertive).toContain('careful');
    expect(assertive).not.toContain('ok');
    expect(polite).toContain('ok');
    expect(polite).toContain('fyi');
    expect(polite).toContain('plain');
    expect(polite).not.toContain('boom');
  });

  it('leaves the visible toasts out of the live-region tree', () => {
    toastService.error('boom', 0);
    toastService.success('ok', 0);
    fixture.detectChanges();

    for (const toast of getToasts()) {
      expect(toast.hasAttribute('role')).toBe(false);
      expect(toast.hasAttribute('aria-live')).toBe(false);
    }
  });

  it('announces a title and a segmented message as plain text', () => {
    toastService.show([{ text: 'Moved ' }, { text: 'Q3 roadmap', strong: true }], {
      title: 'Board updated',
      duration: 0,
    });
    fixture.detectChanges();

    const lines = Array.from(
      getLiveRegion('polite')!.querySelectorAll(':scope > div > div'),
      line => line.textContent,
    );

    expect(lines).toEqual(['Board updated', 'Moved Q3 roadmap']);
  });

  it('removes a toast from its live region once it is dismissed', () => {
    const id = toastService.success('Saved', 0);
    fixture.detectChanges();

    toastService.dismiss(id);
    fixture.detectChanges();

    expect(getLiveRegion('polite')!.textContent!.trim()).toBe('');
  });

  it('pauses auto-dismiss while hovered and resumes on leave', () => {
    const pause = vi.spyOn(toastService, 'pause');
    const resume = vi.spyOn(toastService, 'resume');
    const container = getContainer()!;

    container.dispatchEvent(new MouseEvent('mouseenter'));

    expect(pause).toHaveBeenCalledTimes(1);
    expect(resume).not.toHaveBeenCalled();

    container.dispatchEvent(new MouseEvent('mouseleave'));

    expect(resume).toHaveBeenCalledTimes(1);
  });

  it('pauses auto-dismiss while focus is inside the stack', () => {
    toastService.show('hello', { duration: 0 });
    fixture.detectChanges();
    const pause = vi.spyOn(toastService, 'pause');
    const resume = vi.spyOn(toastService, 'resume');
    const container = getContainer()!;
    const closeBtn = getToasts()[0].querySelector<HTMLButtonElement>('.ea-toast__close')!;

    container.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

    expect(pause).toHaveBeenCalledTimes(1);

    // Focus moving between toasts stays paused; leaving the stack resumes
    container.dispatchEvent(
      new FocusEvent('focusout', { bubbles: true, relatedTarget: closeBtn }),
    );

    expect(resume).not.toHaveBeenCalled();

    container.dispatchEvent(
      new FocusEvent('focusout', { bubbles: true, relatedTarget: document.body }),
    );

    expect(resume).toHaveBeenCalledTimes(1);
  });

  it('dismisses a toast via its close button', () => {
    toastService.show('hello', { duration: 0 });
    fixture.detectChanges();

    const closeBtn = getToasts()[0].querySelector(
      '.ea-toast__close',
    ) as HTMLButtonElement;
    closeBtn.click();
    fixture.detectChanges();

    expect(getToasts()).toHaveLength(0);
  });

  it('auto-dismisses after the configured duration', () => {
    vi.useFakeTimers();
    toastService.show('disappearing', { duration: 1000 });
    fixture.detectChanges();

    expect(getToasts()).toHaveLength(1);

    vi.advanceTimersByTime(1000);
    fixture.detectChanges();

    expect(getToasts()).toHaveLength(0);
    vi.useRealTimers();
  });

  it('renders the toast message', () => {
    toastService.show('hello world', { duration: 0 });
    fixture.detectChanges();

    expect(getToasts()[0].querySelector('.ea-toast__message')?.textContent?.trim()).toBe(
      'hello world',
    );
  });

  it('renders a plain message as a single text node, with no segment spans', () => {
    toastService.show('hello world', { duration: 0 });
    fixture.detectChanges();

    const message = getToasts()[0].querySelector('.ea-toast__message')!;

    expect(message.querySelectorAll('.ea-toast__segment')).toHaveLength(0);
    expect(message.childNodes).toHaveLength(1);
  });

  it('renders one span per segment and marks the strong ones', () => {
    toastService.show([{ text: 'Moved ' }, { text: 'Q3 roadmap', strong: true }], {
      duration: 0,
    });
    fixture.detectChanges();

    const segments = getToasts()[0].querySelectorAll(
      '.ea-toast__message .ea-toast__segment',
    );

    expect(segments).toHaveLength(2);
    expect(segments[0].classList).not.toContain('ea-toast__segment--strong');
    expect(segments[1].classList).toContain('ea-toast__segment--strong');
  });

  it('reads a segmented message as the equivalent plain string', () => {
    toastService.show([{ text: 'Moved ' }, { text: 'Q3 roadmap', strong: true }], {
      duration: 0,
    });
    fixture.detectChanges();

    expect(getToasts()[0].querySelector('.ea-toast__message')!.textContent).toBe(
      'Moved Q3 roadmap',
    );
  });

  it('segments a title while leaving a plain message untouched', () => {
    toastService.show('Your changes are live', {
      title: [{ text: 'Bob Jones', strong: true }, { text: ' deployed the site' }],
      duration: 0,
    });
    fixture.detectChanges();

    const toast = getToasts()[0];

    expect(toast.querySelector('.ea-toast__title')!.textContent).toBe(
      'Bob Jones deployed the site',
    );
    expect(toast.querySelectorAll('.ea-toast__title .ea-toast__segment')).toHaveLength(2);
    expect(toast.querySelectorAll('.ea-toast__message .ea-toast__segment')).toHaveLength(
      0,
    );
  });
});

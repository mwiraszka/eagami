import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    jest.useFakeTimers();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('show', () => {
    it('starts with no toasts', () => {
      expect(service.toasts()).toEqual([]);
    });

    it('adds a toast with the given message and default variant', () => {
      service.show('Saved');

      const toasts = service.toasts();

      expect(toasts).toHaveLength(1);
      expect(toasts[0].message).toBe('Saved');
      expect(toasts[0].variant).toBe('default');
    });

    it('returns a unique id per toast', () => {
      const id1 = service.show('one');
      const id2 = service.show('two');

      expect(id1).not.toBe(id2);
    });

    it('respects custom variant and duration', () => {
      service.show('Hi', { variant: 'success', duration: 1000 });

      expect(service.toasts()[0].variant).toBe('success');
      expect(service.toasts()[0].duration).toBe(1000);
    });

    it('auto-dismisses after the duration elapses', () => {
      service.show('Bye', { duration: 1500 });

      expect(service.toasts()).toHaveLength(1);

      jest.advanceTimersByTime(1500);

      expect(service.toasts()).toHaveLength(0);
    });

    it('does not auto-dismiss when duration is 0', () => {
      service.show('Sticky', { duration: 0 });

      jest.advanceTimersByTime(60_000);

      expect(service.toasts()).toHaveLength(1);
    });
  });

  describe('Variant shortcuts', () => {
    it.each([
      ['success', 'success'],
      ['error', 'error'],
      ['warning', 'warning'],
      ['info', 'info'],
    ] as const)('%s() emits a toast with variant %s', (method, variant) => {
      service[method]('Hello');

      expect(service.toasts()[0].variant).toBe(variant);
    });
  });

  describe('dismiss / clear', () => {
    it('dismiss removes the toast with the matching id', () => {
      const id1 = service.show('one');
      service.show('two');

      service.dismiss(id1);

      const toasts = service.toasts();

      expect(toasts).toHaveLength(1);
      expect(toasts[0].message).toBe('two');
    });

    it('clear removes all toasts', () => {
      service.show('one');
      service.show('two');

      service.clear();

      expect(service.toasts()).toEqual([]);
    });
  });
});

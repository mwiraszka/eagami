import {
  Injector,
  NgZone,
  type Signal,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';

const TYPE_MS = 45;
const HOLD_MS = 2500;
const ROTATE_MS = 6000;

/** Live state of a field's typewriter placeholder. */
export interface TypedPlaceholder {
  /** Whether the typed layer stands in for the native placeholder. */
  readonly animating: Signal<boolean>;
  /** The whole hint in play, for the native `placeholder` attribute. */
  readonly hint: Signal<string>;
  /** The part of the hint typed so far. */
  readonly text: Signal<string>;
  /** Whether characters are still arriving; the cursor blinks only once they stop. */
  readonly typing: Signal<boolean>;
}

function sameHints(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((hint, i) => hint === b[i]);
}

/**
 * Types `hints` into a field's placeholder one character at a time, holds each
 * whole hint, then clears it and types the next, looping. Under
 * `prefers-reduced-motion: reduce` it swaps whole hints instead and never
 * animates. It starts in the browser after the first render, restarts when the
 * hints change, and clears its timer on destroy. The timers run outside the
 * zone so the endless loop never holds the app unstable.
 */
export function injectTypedPlaceholder(
  hints: Signal<readonly string[]>,
): TypedPlaceholder {
  const zone = inject(NgZone);
  const injector = inject(Injector);

  const list = computed(() => hints(), { equal: sameHints });
  const started = signal(false);
  const reducedMotion = signal(false);
  const index = signal(0);
  const typedLength = signal(0);

  const hint = computed(() => {
    const all = list();
    return all.length > 0 ? all[index() % all.length] : '';
  });
  const text = computed(() => hint().slice(0, typedLength()));
  const typing = computed(() => typedLength() < hint().length);
  const animating = computed(() => started() && !reducedMotion() && list().length > 0);

  afterNextRender(() => started.set(true), { injector });

  effect(onCleanup => {
    const all = list();
    if (!started() || all.length === 0) {
      return;
    }

    const motion =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const schedule = (step: () => void, ms: number): void => {
      timer = zone.runOutsideAngular(() => setTimeout(step, ms));
    };
    const advance = (): void => index.update(i => (i + 1) % all.length);
    const rotate = (): void => {
      advance();
      schedule(rotate, ROTATE_MS);
    };
    const type = (): void => {
      typedLength.update(length => length + 1);
      if (typedLength() < hint().length) {
        schedule(type, TYPE_MS);
        return;
      }
      schedule(() => {
        advance();
        typedLength.set(0);
        schedule(type, TYPE_MS);
      }, HOLD_MS);
    };
    const run = (): void => {
      clearTimeout(timer);
      const reduced = motion?.matches ?? false;
      reducedMotion.set(reduced);
      index.set(0);
      typedLength.set(0);
      if (reduced) {
        schedule(rotate, ROTATE_MS);
      } else {
        type();
      }
    };

    motion?.addEventListener('change', run);
    untracked(run);

    onCleanup(() => {
      clearTimeout(timer);
      motion?.removeEventListener('change', run);
    });
  });

  return { animating, hint, text, typing };
}

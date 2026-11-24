import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * Heading text whose words rise one after another out of their own masks the
 * first time it scrolls into view. Text already on screen when the page loads
 * stays put. The words are hidden from assistive technology, which reads one
 * unbroken copy of the text instead.
 */
@Component({
  selector: 'web-reveal-words',
  templateUrl: './reveal-words.component.html',
  styleUrl: './reveal-words.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.reveal-words--armed]': 'armed()',
    '[class.reveal-words--shown]': 'shown()',
  },
})
export class RevealWordsComponent {
  readonly text = input.required<string>();

  protected readonly words = computed(() => this.text().split(/\s+/).filter(Boolean));

  protected readonly armed = signal(false);
  protected readonly shown = signal(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            this.armed.set(true);
            return;
          }
          this.shown.set(this.armed());
          observer.disconnect();
        },
        { rootMargin: '0px 0px -10% 0px' },
      );
      observer.observe(this.host.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}

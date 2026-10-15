import {
  ButtonComponent,
  type EaErrorMessages,
  EagamiIconComponent,
  InputComponent,
  TextareaComponent,
  ToastService,
} from '@eagami/ui';

import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  type ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  type AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  type ValidationErrors,
  Validators,
} from '@angular/forms';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

import { HomeFeatureBuilderComponent } from './home-feature-builder.component';
import { HomeProcessTimelineComponent } from './home-process-timeline.component';
import { HomeProjectStoriesComponent } from './home-project-stories.component';
import {
  type HomeThread,
  type HomeThreadLayout,
  type ThreadBox,
  type ThreadSamples,
  buildHomeThread,
  sampleThread,
  threadLengthAt,
} from './home-thread';

type ContactStatus = 'idle' | 'sending' | 'sent' | 'error';

/* Matches the stylesheet: the thread shows whenever the process timeline runs across the page */
const THREAD_MEDIA = '(width > 800px)';

/* Share of the viewport height, from the top, where the drawing tip of the thread sits */
const THREAD_TIP = 0.65;

/* Stricter than `Validators.email`, which per the HTML5 spec lets TLD-less
   "a@b" through; a public contact form wants `local@host.tld`. Reuses the
   `email` error key so downstream checks are unchanged. */
const STRICT_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function strictEmailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;
  }
  return STRICT_EMAIL_PATTERN.test(value) ? null : { email: true };
}

@Component({
  selector: 'web-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [
    ButtonComponent,
    EagamiIconComponent,
    HomeFeatureBuilderComponent,
    HomeProcessTimelineComponent,
    HomeProjectStoriesComponent,
    InputComponent,
    ReactiveFormsModule,
    TextareaComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;

  protected readonly contactForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, strictEmailValidator],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  /* Every field is required, but an empty one is conveyed by the disabled submit
     rather than flagged as an error */
  protected readonly contactFieldErrors: EaErrorMessages = { required: null };
  protected readonly contactEmailErrors = computed<EaErrorMessages>(() => ({
    ...this.contactFieldErrors,
    email: this.messages().home.contact.emailInvalid,
  }));

  protected readonly contactStatus = signal<ContactStatus>('idle');
  protected readonly contactError = signal<string | null>(null);

  /* Nudged on value change so validity, which isn't a signal, is re-read */
  private readonly contactFormVersion = signal(0);

  protected readonly isContactFormValid = computed(() => {
    this.contactFormVersion();
    return this.contactForm.valid;
  });

  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetector = inject(ChangeDetectorRef);

  private readonly home = viewChild.required<ElementRef<HTMLElement>>('home');
  private readonly heroCurve = viewChild.required<ElementRef<SVGSVGElement>>('heroCurve');
  private readonly hero = viewChild.required<ElementRef<HTMLElement>>('hero');
  private readonly services = viewChild.required<ElementRef<HTMLElement>>('services');
  private readonly servicesContent =
    viewChild.required<ElementRef<HTMLElement>>('servicesContent');
  private readonly process = viewChild.required<ElementRef<HTMLElement>>('process');
  private readonly projects = viewChild.required<ElementRef<HTMLElement>>('projects');
  private readonly contact = viewChild.required<ElementRef<HTMLElement>>('contact');
  private readonly contactTitle =
    viewChild.required<ElementRef<HTMLElement>>('contactTitle');
  private readonly timeline = viewChild.required(HomeProcessTimelineComponent);
  private readonly threadSvg = viewChild<ElementRef<SVGSVGElement>>('threadSvg');
  private readonly threadPath = viewChild<ElementRef<SVGPathElement>>('threadPath');

  protected readonly thread = signal<HomeThread | null>(null);
  protected readonly threadDrawing = signal(false);
  protected readonly threadComplete = signal(false);
  private readonly reducedMotion = signal(false);
  private threadSamples: ThreadSamples | null = null;

  constructor() {
    this.contactForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.contactFormVersion.update(v => v + 1);
    });

    effect(() => {
      const m = this.messages().home;
      this.metaAndTitleService.updateTitle(m.metaTitle);
      this.metaAndTitleService.updateDescription(m.metaDescription);
    });

    afterNextRender(() => {
      this.setupScrollSpy();
      this.setupThread();
    });
  }

  /* Syncs the URL fragment to the in-view section so a refresh restores the
     reader's place. Uses `history.replaceState`, not the router, so it adds no
     history entries and doesn't re-trigger anchor scrolling. */
  private setupScrollSpy(): void {
    const sectionIds = ['services', 'process', 'projects', 'contact'];
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return;
    }

    const inView = new Set<string>();

    const syncFragment = (): void => {
      // Topmost in-view section in document order; empty while in the hero
      const activeId = sectionIds.find(id => inView.has(id)) ?? '';
      if (location.hash.slice(1) === activeId) {
        return;
      }

      const url = activeId ? `#${activeId}` : location.pathname + location.search;
      history.replaceState(history.state, '', url);
    };

    /* A section is "in view" while it overlaps the band between the 64px header
       and ~30% down the viewport (see rootMargin below). */
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            inView.add(entry.target.id);
          } else {
            inView.delete(entry.target.id);
          }
        }
        syncFragment();
      },
      { rootMargin: '-64px 0px -70% 0px', threshold: 0 },
    );

    sections.forEach(section => observer.observe(section));
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  /* Lays the thread out from the rendered sections, and redraws it whenever
     their size or the viewport width changes */
  private setupThread(): void {
    const wide = window.matchMedia(THREAD_MEDIA);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const measure = (): void => {
      const thread = wide.matches ? buildHomeThread(this.readThreadLayout()) : null;
      this.thread.set(thread);
      this.threadDrawing.set(thread !== null && !this.reducedMotion());
      // Rendered before this frame paints, so the line moves in the same frame as its sections
      this.changeDetector.detectChanges();
      this.resampleThread();
    };
    const onMotionChange = (): void => {
      this.reducedMotion.set(motion.matches);
      this.threadDrawing.set(!motion.matches && this.threadSamples !== null);
    };

    let frame: number | undefined;
    const onScroll = (): void => {
      if (frame === undefined) {
        frame = requestAnimationFrame(() => {
          frame = undefined;
          this.drawThread();
        });
      }
    };

    this.reducedMotion.set(motion.matches);
    const observer = new ResizeObserver(measure);
    observer.observe(this.home().nativeElement);
    observer.observe(this.timeline().band().nativeElement);
    observer.observe(this.contactTitle().nativeElement);
    wide.addEventListener('change', measure);
    motion.addEventListener('change', onMotionChange);
    window.addEventListener('scroll', onScroll, { passive: true });

    this.destroyRef.onDestroy(() => {
      observer.disconnect();
      wide.removeEventListener('change', measure);
      motion.removeEventListener('change', onMotionChange);
      window.removeEventListener('scroll', onScroll);
      if (frame !== undefined) {
        cancelAnimationFrame(frame);
      }
    });
  }

  private readThreadLayout(): HomeThreadLayout {
    const home = this.home().nativeElement;

    /* Layout boxes from the offset chain rather than the rendered rects, so a
       scroll reveal that is still sliding an element in can't pull the line
       off the anchors it passes through */
    const box = (element: HTMLElement): ThreadBox => {
      let top = 0;
      let left = 0;
      let current: HTMLElement | null = element;
      while (current && current !== home) {
        top += current.offsetTop;
        left += current.offsetLeft;
        current =
          current.offsetParent instanceof HTMLElement ? current.offsetParent : null;
      }
      return {
        top,
        bottom: top + element.offsetHeight,
        left,
        width: element.offsetWidth,
        height: element.offsetHeight,
      };
    };
    const title = this.contactTitle().nativeElement;
    const content = this.servicesContent().nativeElement;

    return {
      width: home.offsetWidth,
      height: home.offsetHeight,
      contentInset: box(content).left + parseFloat(getComputedStyle(content).paddingLeft),
      curveHeight: this.heroCurve().nativeElement.getBoundingClientRect().height,
      hero: box(this.hero().nativeElement),
      services: box(this.services().nativeElement),
      process: box(this.process().nativeElement),
      timeline: box(this.timeline().band().nativeElement),
      projects: box(this.projects().nativeElement),
      contact: box(this.contact().nativeElement),
      contactTitle: box(title),
      contactTitleLine: parseFloat(getComputedStyle(title).lineHeight),
      contactTitleStart: this.firstLineStart(title) - home.getBoundingClientRect().left,
    };
  }

  /* Horizontal start of an element's first line of text; a reveal transform only
     slides content vertically, so the rendered x is safe to read here */
  private firstLineStart(element: HTMLElement): number {
    const range = document.createRange();
    range.selectNodeContents(element);
    const [firstLine] = range.getClientRects();
    return firstLine ? firstLine.left : element.getBoundingClientRect().left;
  }

  /* Re-samples the rendered line, then places its tip for the current scroll */
  private resampleThread(): void {
    const path = this.threadPath()?.nativeElement;
    const svg = this.threadSvg()?.nativeElement;
    if (!path || !svg) {
      this.threadSamples = null;
      return;
    }

    this.threadSamples = sampleThread(path);
    svg.style.setProperty('--thread-length', `${this.threadSamples.total}px`);
    this.drawThread();
  }

  private drawThread(): void {
    const samples = this.threadSamples;
    const svg = this.threadSvg()?.nativeElement;
    if (!samples || !svg || this.reducedMotion()) {
      return;
    }

    const homeTop = this.home().nativeElement.getBoundingClientRect().top;
    const drawn = threadLengthAt(samples, window.innerHeight * THREAD_TIP - homeTop);
    svg.style.setProperty('--thread-drawn', `${drawn}px`);
    this.threadComplete.set(drawn >= samples.total - 1);
  }

  protected submitContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.contactStatus.set('sending');
    this.contactError.set(null);

    this.http.post('/api/contact', this.contactForm.getRawValue()).subscribe({
      next: () => {
        this.contactStatus.set('sent');
        this.contactForm.reset();
        this.toastService.success(this.messages().home.contact.sentToast);
      },
      error: () => {
        this.contactStatus.set('error');
        const message = this.messages().home.contact.errorMessage;
        this.contactError.set(message);
        this.toastService.error(message);
      },
    });
  }
}

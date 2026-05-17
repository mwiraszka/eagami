import {
  BarChartIconComponent,
  ButtonComponent,
  ChevronDownIconComponent,
  CreditCardIconComponent,
  EagamiIconComponent,
  GlobeIconComponent,
  InputComponent,
  MailIconComponent,
  MoonIconComponent,
  TextareaComponent,
  ToastService,
  UsersIconComponent,
} from '@eagami/ui';

import { NgComponentOutlet } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Type,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

const ICON_BY_SLUG: Record<string, Type<unknown>> = {
  users: UsersIconComponent,
  'credit-card': CreditCardIconComponent,
  globe: GlobeIconComponent,
  moon: MoonIconComponent,
  'bar-chart': BarChartIconComponent,
  mail: MailIconComponent,
};

interface Project {
  title: string;
  description: string;
  url?: string;
  display?: string;
  logo?: string;
  placeholder?: boolean;
}

interface ServiceView {
  title: string;
  description: string;
  icon?: Type<unknown>;
}

type ContactStatus = 'idle' | 'sending' | 'sent' | 'error';

/* Stricter than `Validators.email`, which follows the HTML5 spec and lets
   "a@b" through (intranet-style addresses with no TLD). For a public contact
   form, require `local@host.tld`. Returns the same `email` error key so the
   downstream check stays the same. */
const STRICT_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function strictEmailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  return STRICT_EMAIL_PATTERN.test(value) ? null : { email: true };
}

@Component({
  selector: 'web-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [
    NgComponentOutlet,
    RouterLink,
    ReactiveFormsModule,
    EagamiIconComponent,
    ButtonComponent,
    ChevronDownIconComponent,
    InputComponent,
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

  protected readonly projects = computed<Project[]>(() =>
    this.messages().home.projects.cards.map(c => ({ ...c })),
  );

  private readonly carouselOffset = signal(0);
  protected readonly slideDirection = signal<-1 | 0 | 1>(0);
  protected readonly suppressTransition = signal(false);
  private readonly slideMs = 320;

  protected readonly orderedProjects = computed<Project[]>(() => {
    const offset = this.carouselOffset();
    const projects = this.projects();
    const len = projects.length;
    return Array.from({ length: 5 }, (_, i) => {
      const idx = (((offset - 1 + i) % len) + len) % len;
      return projects[idx];
    });
  });

  /* Sr-only announcement: names the project currently centered in the viewport
     so keyboard / screen-reader users get feedback when they press the prev /
     next buttons or the arrow keys. */
  protected readonly carouselStatus = computed(() => {
    const centered = this.orderedProjects()[2];
    if (!centered) return '';
    return this.messages().home.projects.showing(centered.title);
  });

  protected readonly coreServices = computed<ServiceView[]>(() =>
    this.messages().home.services.core.map(s => ({
      title: s.title,
      description: s.description,
    })),
  );

  protected readonly addOnServices = computed<ServiceView[]>(() =>
    this.messages().home.services.addOns.map(s => ({
      title: s.title,
      description: s.description,
      icon: ICON_BY_SLUG[s.iconSlug],
    })),
  );

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

  protected readonly contactStatus = signal<ContactStatus>('idle');
  protected readonly contactError = signal<string | null>(null);

  /* Bumped on every form value change and on email blur so signal-derived
     computed values below pick up the change. `touched` on form controls
     doesn't emit through `valueChanges`, hence the manual nudge from the
     `(blurred)` handler on the email field. */
  private readonly contactFormVersion = signal(0);

  protected readonly isContactFormValid = computed(() => {
    this.contactFormVersion();
    return this.contactForm.valid;
  });

  /* The email validator is the only field-level error worth surfacing — empty
     fields are conveyed by the disabled submit button. This computed shows
     the email format error only after the user has blurred the field so it
     doesn't flash while they're still typing. */
  protected readonly contactEmailError = computed<string | undefined>(() => {
    this.contactFormVersion();
    const email = this.contactForm.controls.email;
    return email.touched && email.errors?.['email']
      ? this.messages().home.contact.emailInvalid
      : undefined;
  });

  /* Three example messages cycled through the textarea placeholder with a
     typewriter effect to prime first-time senders on what to write. */
  protected readonly contactMessagePlaceholder = signal('');

  private readonly destroyRef = inject(DestroyRef);

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
      this.runContactPlaceholderAnimation();
      this.setupScrollSpy();
    });
  }

  protected onContactFieldBlur(): void {
    this.contactFormVersion.update(v => v + 1);
  }

  /* Keeps the URL fragment in sync with the section currently in view, so a
     page refresh restores the reader's place instead of jumping back to
     whatever in-page anchor they originally clicked. Uses `history.replaceState`
     (not the router) so syncing the fragment neither adds history entries nor
     re-triggers the router's anchor scrolling. */
  private setupScrollSpy(): void {
    const sectionIds = ['services', 'projects', 'contact'];
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const inView = new Set<string>();

    const syncFragment = (): void => {
      // Topmost in-view section in document order; empty while in the hero.
      const activeId = sectionIds.find(id => inView.has(id)) ?? '';
      if (location.hash.slice(1) === activeId) return;

      const url = activeId ? `#${activeId}` : location.pathname + location.search;
      history.replaceState(history.state, '', url);
    };

    /* Activation band: a thin strip just below the fixed header (64px). A
       section counts as "in view" while it overlaps the strip between the
       header and ~30% down the viewport. */
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        }
        syncFragment();
      },
      { rootMargin: '-64px 0px -70% 0px', threshold: 0 },
    );

    sections.forEach(section => observer.observe(section));
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  private runContactPlaceholderAnimation(): void {
    const TYPE_MS = 45;
    const HOLD_AFTER_TYPE_MS = 2500;
    const CURSOR = '|';

    /* Under `prefers-reduced-motion: reduce` skip the typewriter, rotate
       between the full hints on a slow interval and never reveal the cursor.
       The hint is decorative; SR users have the `<ea-textarea>` label. */
    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let msgIdx = 0;
    let charIdx = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const hints = (): ReadonlyArray<string> =>
      this.messages().home.contact.placeholderHints;

    if (motionReduced) {
      const ROTATE_MS = 6000;
      const rotate = (): void => {
        const h = hints();
        this.contactMessagePlaceholder.set(h[msgIdx % h.length]);
        msgIdx = (msgIdx + 1) % h.length;
        timer = setTimeout(rotate, ROTATE_MS);
      };

      this.destroyRef.onDestroy(() => {
        if (timer !== undefined) clearTimeout(timer);
      });

      rotate();
      return;
    }

    const typeNext = (): void => {
      const h = hints();
      const current = h[msgIdx % h.length];
      charIdx++;
      this.contactMessagePlaceholder.set(current.slice(0, charIdx) + CURSOR);

      if (charIdx >= current.length) {
        timer = setTimeout(() => {
          msgIdx = (msgIdx + 1) % hints().length;
          charIdx = 0;
          this.contactMessagePlaceholder.set(CURSOR);
          timer = setTimeout(typeNext, TYPE_MS);
        }, HOLD_AFTER_TYPE_MS);
        return;
      }

      timer = setTimeout(typeNext, TYPE_MS);
    };

    this.destroyRef.onDestroy(() => {
      if (timer !== undefined) clearTimeout(timer);
    });

    typeNext();
  }

  protected scrollWork(direction: 1 | -1): void {
    if (this.slideDirection() !== 0) return;

    this.slideDirection.set(direction);

    setTimeout(() => {
      this.suppressTransition.set(true);

      requestAnimationFrame(() => {
        const len = this.projects().length;
        this.slideDirection.set(0);
        this.carouselOffset.update(v => (v + direction + len) % len);

        requestAnimationFrame(() => {
          this.suppressTransition.set(false);
        });
      });
    }, this.slideMs + 20);
  }

  protected submitContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.contactFormVersion.update(v => v + 1);
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

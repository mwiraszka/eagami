import {
  BadgeComponent,
  ButtonComponent,
  CheckboxComponent,
  ChevronDownIconComponent,
  EagamiIconComponent,
  InputComponent,
  ProgressBarComponent,
  RadioComponent,
  RadioGroupComponent,
  SkeletonComponent,
  SliderComponent,
  SpinnerComponent,
  SwitchComponent,
  TagComponent,
  TextareaComponent,
  ToastService,
} from '@eagami/ui';

import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  afterNextRender,
  computed,
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

import { MetaAndTitleService } from '@app/services/meta-and-title.service';

interface Project {
  title: string;
  description: string;
  url?: string;
  display?: string;
  logo?: string;
  placeholder?: boolean;
}

interface Service {
  title: string;
  description: string;
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
    RouterLink,
    ReactiveFormsModule,
    EagamiIconComponent,
    BadgeComponent,
    ButtonComponent,
    CheckboxComponent,
    ChevronDownIconComponent,
    InputComponent,
    ProgressBarComponent,
    RadioComponent,
    RadioGroupComponent,
    SkeletonComponent,
    SliderComponent,
    SpinnerComponent,
    SwitchComponent,
    TagComponent,
    TextareaComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);

  protected readonly projects: Project[] = [
    {
      title: 'London Chess',
      description: 'A hub for the London Chess Club and chess events in London, ON.',
      url: 'https://londonchess.ca',
      display: 'londonchess.ca',
      logo: 'assets/projects/londonchess.svg',
    },
    {
      title: 'CIRC Aesthetics',
      description: 'Cosmetic Interventional Radiology Clinic based in London, ON.',
      url: 'https://circaesthetics.ca',
      display: 'circaesthetics.ca',
      logo: 'assets/projects/circaesthetics.svg',
    },
    {
      title: 'Brewski Bets',
      description: 'A friendly beer-betting platform.',
      url: 'https://brewskibets.com',
      display: 'brewskibets.com',
      logo: 'assets/projects/brewskibets.svg',
    },
    {
      title: 'Chordbomb',
      description: 'Coming soon...',
      url: 'https://chordbomb.com',
      display: 'chordbomb.com',
      logo: 'assets/projects/chordbomb.svg',
    },
  ];

  protected readonly showcaseSliderValue = signal(60);
  protected readonly showcaseSwitchOn = signal(true);
  protected readonly showcaseRadioValue = signal('md');

  protected readonly checkboxOne = signal(false);
  protected readonly checkboxTwo = signal(false);
  protected readonly checkboxThree = signal(true);
  protected readonly checkboxMasterChecked = computed(
    () => this.checkboxOne() && this.checkboxTwo() && this.checkboxThree(),
  );
  protected readonly checkboxMasterIndeterminate = computed(() => {
    const someChecked = this.checkboxOne() || this.checkboxTwo() || this.checkboxThree();
    return someChecked && !this.checkboxMasterChecked();
  });

  private readonly radioLabels: Record<string, string> = {
    sm: 'Small',
    md: 'Medium',
    lg: 'Large',
  };

  private readonly carouselOffset = signal(0);
  protected readonly slideDirection = signal<-1 | 0 | 1>(0);
  protected readonly suppressTransition = signal(false);
  private readonly slideMs = 320;

  protected readonly orderedProjects = computed<Project[]>(() => {
    const offset = this.carouselOffset();
    const len = this.projects.length;
    return Array.from({ length: 5 }, (_, i) => {
      const idx = (((offset - 1 + i) % len) + len) % len;
      return this.projects[idx];
    });
  });

  /* Sr-only announcement: names the project currently centered in the viewport
     so keyboard / screen-reader users get feedback when they press the prev /
     next buttons or the arrow keys. */
  protected readonly carouselStatus = computed(() => {
    const centered = this.orderedProjects()[2];
    if (!centered) return '';
    return `Showing ${centered.title}`;
  });

  protected readonly coreServices: Service[] = [
    {
      title: 'Custom websites',
      description:
        'A complete site built from the ground up: domain setup, hosting, branding, design, and launch. Unlimited revisions until launch day.',
    },
    {
      title: 'Ongoing maintenance',
      description:
        'Monthly support for hosting, security updates, third-party packages, content revisions, and analytics, optionally extending to APIs and databases.',
    },
  ];

  protected readonly addOnServices: Service[] = [
    {
      title: 'User management',
      description:
        'User authentication, registration, and password recovery, plus an admin dashboard with metrics and per-user controls.',
    },
    {
      title: 'Payment processing',
      description:
        'Online payments (Stripe by default, other providers on request), with customizable payment forms and recurring billing.',
    },
    {
      title: 'Multilingual support',
      description:
        "Language support for multiple locales, with optional auto-detection from the visitor's browser.",
    },
    {
      title: 'Theming',
      description: 'Dark/light mode toggle and fully customizable color themes.',
    },
    {
      title: 'Analytics & insights',
      description:
        'Website traffic metrics (sources, devices, locations), plus custom event tracking.',
    },
    {
      title: 'Email & notifications',
      description: 'Automated emails for account activity, receipts, and announcements.',
    },
  ];

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
      ? 'Please enter a valid email address'
      : undefined;
  });

  /* Three example messages cycled through the textarea placeholder with a
     typewriter effect to prime first-time senders on what to write. */
  private readonly contactPlaceholderHints = [
    "Hi! I'm working on a side project and could use a hand with the frontend...",
    'Looking for someone to build a website for our small business...',
    'Quick question about the component library before I dig in...',
  ];
  protected readonly contactMessagePlaceholder = signal('');

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.contactForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.contactFormVersion.update(v => v + 1);
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
    const sectionIds = ['services', 'toolkit', 'work', 'contact'];
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

    /* Under `prefers-reduced-motion: reduce` skip the typewriter — rotate
       between the full hints on a slow interval and never reveal the cursor.
       The hint is decorative; SR users have the `<ea-textarea>` label. */
    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let msgIdx = 0;
    let charIdx = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (motionReduced) {
      const ROTATE_MS = 6000;
      const rotate = (): void => {
        this.contactMessagePlaceholder.set(this.contactPlaceholderHints[msgIdx]);
        msgIdx = (msgIdx + 1) % this.contactPlaceholderHints.length;
        timer = setTimeout(rotate, ROTATE_MS);
      };

      this.destroyRef.onDestroy(() => {
        if (timer !== undefined) clearTimeout(timer);
      });

      rotate();
      return;
    }

    const typeNext = (): void => {
      const current = this.contactPlaceholderHints[msgIdx];
      charIdx++;
      this.contactMessagePlaceholder.set(current.slice(0, charIdx) + CURSOR);

      if (charIdx >= current.length) {
        timer = setTimeout(() => {
          msgIdx = (msgIdx + 1) % this.contactPlaceholderHints.length;
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

  public ngOnInit(): void {
    this.metaAndTitleService.updateTitle('Eagami');
    this.metaAndTitleService.updateDescription('Elegant web design');
  }

  protected toggleCheckboxMaster(): void {
    const next = !this.checkboxMasterChecked();
    this.checkboxOne.set(next);
    this.checkboxTwo.set(next);
    this.checkboxThree.set(next);
    this.toastService.show(next ? 'All checkboxes checked' : 'All checkboxes unchecked', {
      variant: 'info',
    });
  }

  protected onShowcaseButton(label: string): void {
    this.toastService.show(`${label} button pressed`, { variant: 'info' });
  }

  protected onShowcaseSwitch(checked: boolean): void {
    this.showcaseSwitchOn.set(checked);
    this.toastService.show(`Switch turned ${checked ? 'on' : 'off'}`, {
      variant: 'info',
    });
  }

  protected onShowcaseRadio(value: string): void {
    this.showcaseRadioValue.set(value);
    this.toastService.show(`${this.radioLabels[value] ?? value} selected`, {
      variant: 'info',
    });
  }

  protected onShowcaseCheckbox(label: 1 | 2, checked: boolean): void {
    if (label === 1) this.checkboxOne.set(checked);
    else this.checkboxTwo.set(checked);
    this.toastService.show(`Checkbox ${label} ${checked ? 'checked' : 'unchecked'}`, {
      variant: 'info',
    });
  }

  protected scrollWork(direction: 1 | -1): void {
    if (this.slideDirection() !== 0) return;

    this.slideDirection.set(direction);

    setTimeout(() => {
      this.suppressTransition.set(true);

      requestAnimationFrame(() => {
        const len = this.projects.length;
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
        this.toastService.success('Message sent');
      },
      error: () => {
        this.contactStatus.set('error');
        const message =
          'Sorry, something went wrong. Please email michal@eagami.com directly.';
        this.contactError.set(message);
        this.toastService.error(message);
      },
    });
  }
}

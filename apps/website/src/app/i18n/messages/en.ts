import type { WebMessages } from '../web-messages.types';

export const en: WebMessages = {
  common: {
    skipToContent: 'Skip to main content',
    brandHome: 'eagami home',
    navUi: 'UI',
    navUiTooltip: 'Component library docs',
    themeToggleTooltip: 'Toggle theme',
    themeToggleLabel: next => `Switch to ${next} mode`,
    localeMenuLabel: 'Language',
    localeMenuTooltip: 'Change language',
    activeLocale: label => `Current language: ${label}`,
    footer: {
      copyright: year => `© ${year} eagami`,
      npmLink: 'npm',
      npmTooltip: 'View @eagami/ui on npm',
      githubAriaLabel: 'eagami on GitHub',
      githubTooltip: 'View source on GitHub',
      navLabel: 'Footer',
    },
    codeSnippet: {
      copyLabel: 'Copy to clipboard',
      copySuccess: 'Copied to clipboard',
      copyError: 'Could not copy to clipboard',
    },
  },
  home: {
    metaTitle: 'Eagami',
    metaDescription:
      'Elegant web design, and home of Eagami UI: a lightweight, accessible Angular component library.',
    hero: {
      tagline: 'elegant web design.',
      ctaPrimary: 'Get in touch',
      ctaSecondary: 'See recent projects →',
      scrollHint: 'Scroll to services',
    },
    services: {
      title: 'Services',
      lede: 'From a single landing page to a full web app, plus everything that comes after launch.',
      featuresHeading: 'Features',
      uiNote: {
        before: 'Larger projects can be built on',
        link: 'Eagami UI',
        after:
          ', a custom component library, for a consistent and modern visual language across the site.',
      },
      core: [
        {
          title: 'Custom websites',
          description:
            'A complete site built from the ground up: domain setup, hosting, branding, design, and launch. Unlimited revisions until launch day.',
        },
        {
          title: 'Ongoing maintenance',
          description:
            'Monthly upkeep covering hosting, security patches, dependency upgrades, content edits, and analytics reviews.',
        },
      ],
      addOns: [
        {
          title: 'User management',
          description:
            'User authentication, registration, and password recovery, plus an admin dashboard with metrics and per-user controls.',
          iconSlug: 'users',
        },
        {
          title: 'Payment processing',
          description:
            'Online payments (Stripe by default, other providers on request), with customizable payment forms and recurring billing.',
          iconSlug: 'credit-card',
        },
        {
          title: 'Multilingual support',
          description:
            "Language support for multiple locales, with optional auto-detection from the visitor's browser.",
          iconSlug: 'languages',
        },
        {
          title: 'Theming',
          description: 'Dark/light mode toggle and fully customizable color themes.',
          iconSlug: 'moon',
        },
        {
          title: 'Analytics & insights',
          description:
            'Website traffic metrics (sources, devices, locations), plus custom event tracking.',
          iconSlug: 'bar-chart',
        },
        {
          title: 'Email & notifications',
          description:
            'Automated emails for account activity, receipts, and announcements.',
          iconSlug: 'mail',
        },
      ],
    },
    projects: {
      title: 'Recent projects',
      lede: 'A few sites in active development.',
      previousAriaLabel: 'Previous projects',
      nextAriaLabel: 'Next projects',
      regionAriaLabel: 'Recent projects',
      showing: title => `Showing ${title}`,
      cards: [
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
          description: 'A tracker for casual bets between friends, settled in beer.',
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
      ],
    },
    contact: {
      title: 'Got a project in mind?',
      lede: "Let's hear about it!",
      success: "Thanks for the message. You'll hear back soon.",
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'you@example.com',
      emailInvalid: 'Please enter a valid email address',
      messageLabel: 'Message',
      placeholderHints: [
        "Hi! I'm working on a side project and could use a hand with the frontend...",
        'Looking for someone to build a website for our small business...',
        'Quick question about the component library before I dig in...',
      ],
      submit: 'Send message',
      sentToast: 'Message sent',
      errorMessage:
        'Sorry, something went wrong. Please email michal@eagami.com directly.',
    },
  },
  notFound: {
    metaTitle: 'Eagami | 404',
    metaDescription: 'Page not found.',
    eyebrow: '404',
    title: 'Page not found',
    lede: "The page you were looking for doesn't exist or has moved.",
    cta: 'Back to home',
  },
  ui: {
    changelog: {
      title: 'Changelog',
      metaTitle: 'Changelog | Eagami UI',
      metaDescription: 'Release history for the Eagami UI Angular component library.',
      lead: 'Notable changes to @eagami/ui, newest first.',
      migrationGuide: 'Migration guide',
      fullHistory: 'Full history on GitHub',
    },
    shell: {
      changelog: 'Changelog',
      sidebarLabel: 'Documentation sidebar',
      navLabel: 'Documentation',
      overview: 'Overview',
      setup: 'Setup',
      designTokens: 'Design tokens',
      themeBuilder: 'Theme builder',
      icons: 'Icons',
      i18n: 'Internationalization',
      accessibility: 'Accessibility',
      components: 'Components',
    },
    index: {
      metaTitle: 'Eagami UI | Angular Component Library',
      metaDescription:
        'Lightweight, accessible Angular component library built on CSS custom properties.',
      title: 'Eagami UI',
      ledeBefore: 'is a lightweight, accessible Angular component library.',
      ledeAfter:
        'Sensible defaults out of the box, with a fully customizable design to fit any brand.',
      principlesHeading: 'Design principles',
      principles: [
        {
          title: 'Accessible',
          body: 'Keyboard navigation, focus management, screen-reader support, and reduced-motion handling are built into every component.',
        },
        {
          title: 'Lightweight',
          body: 'Each component imports independently and the bundle only ships what you use.',
        },
        {
          title: 'Themeable',
          body: "Fully customizable with design tokens while maintaining a unified look across every page. Light and dark variants ship together and default to the user's system preference.",
        },
        {
          title: 'Localized',
          body: 'Built-in component text ships in all supported languages.',
        },
        {
          title: 'Modern',
          body: 'Regularly updated with the latest Angular features and modern web standards.',
        },
        {
          title: 'Unlocked',
          body: 'Every component is plain Angular and CSS with no vendor lock-in, so the source can be read, copied, or modified like any other code in your project.',
        },
      ],
      getStartedHeading: 'Get started',
      getStartedBefore: 'Head to',
      getStartedLink: 'Setup',
      /* Leading space because the template suppresses whitespace between the
         link and this string so Polish can butt its trailing comma directly
         against "Instalacji". Locales that continue with a word (en/fr/el/es)
         provide the separator themselves. */
      getStartedAfter: ' to install the package and wire up the global stylesheet.',
      showcase: {
        button: 'Press me',
        toggle: 'Toggle me',
        tick: 'Tick me',
        tag: 'Tag',
        badge: 'Badge',
        tooltip: 'Additional information displayed in a tooltip',
        exploreMore: '...explore more components',
        list: 'List',
        grid: 'Grid',
        table: 'Table',
        radioThis: 'This',
        radioThat: 'That',
        option1: 'Option 1',
        option2: 'Option 2',
        option3: 'Option 3',
        toastButton: 'Button pressed',
        toastToggleOn: 'Toggle switched on',
        toastToggleOff: 'Toggle switched off',
        toastTickOn: 'Checkbox ticked',
        toastTickOff: 'Checkbox unticked',
        ariaView: 'Demo view',
        ariaSlider: 'Demo slider',
        ariaRating: 'Demo rating',
        ariaLayout: 'Demo layout',
        ariaColor: 'Demo color',
        ariaSelect: 'Demo select',
        ariaDate: 'Demo date',
        ariaMultiSelect: 'Demo multi-select',
        msMusic: 'Music',
        msTravel: 'Travel',
        msFood: 'Food',
      },
      theme: {
        heading: 'Make it your own',
        ledeBefore: '',
        ledeLink: 'Design tokens',
        ledeAfter:
          ' are what give each Eagami project a distinct personality: customizable colors, fonts, spacing, corners, shadows, and motion, all applied across the entire site or app. Modify a few below to see how they affect the components.',
        brandColor: 'Brand color',
        radius: 'Corner radius',
        font: 'Font',
        fontDefault: '(default)',
        reset: 'Reset',
      },
    },
    setup: {
      metaTitle: 'Setup | Eagami UI',
      metaDescription: 'Install @eagami/ui and wire up the global stylesheet and fonts.',
      title: 'Setup',
      ngAddLabel: 'Install and configure everything with one command:',
      manualLabel: 'Or set it up manually:',
      installLabel: 'Install the package:',
      or: 'or',
      stylesheetLabel: {
        before: 'Add the global stylesheet in',
        after: ':',
      },
      fontsLabel: {
        before: 'Load the fonts in',
        after: ':',
      },
      firstComponentHeading: 'Your first component',
    },
    integrations: {
      heading: 'Beyond Angular',
      intro:
        'The design tokens are framework-agnostic. Copy a self-contained integration guide into a non-Angular project, or consume the machine-readable token export directly.',
      reactLink: 'React integration guide',
      flutterLink: 'Flutter integration guide',
      tokensLink: 'Design tokens as JSON',
    },
    themeBuilder: {
      metaTitle: 'Angular Theme Builder | Eagami UI',
      metaDescription:
        'Generate a WCAG-checked light and dark palette from your brand colors, then copy the provider config or CSS.',
      title: 'Theme builder',
      lede: 'Pick your brand colors and Eagami UI derives a full 50–900 scale in OKLCH space, checks it for WCAG contrast in light and dark, and hands you the <code>provideEagamiUi()</code> config to drop in.',
      controlsHeading: 'Brand colors',
      primaryLabel: 'Primary color',
      secondaryLabel: 'Secondary color',
      contrastHeading: 'Accessibility',
      contrastPass: 'Passes WCAG 2.1 AA contrast in both light and dark mode',
      contrastFailIntro: 'Some pairings fall below the WCAG AA contrast bar:',
      scaleHeading: 'Generated scale',
      previewHeading: 'Preview',
      previewHint: 'Toggle the site theme to preview the palette in dark mode.',
      previewButton: 'Get started',
      previewSwitch: 'Notifications',
      previewPrimary: 'Primary',
      previewSecondary: 'Secondary',
      previewStep1: 'Account',
      previewStep2: 'Profile',
      previewStep3: 'Done',
      previewProgress: 'Progress:',
      exportHeading: 'Use it',
      exportConfigLabel: 'Provider config',
      exportCssLabel: 'CSS custom properties',
    },
    tokens: {
      metaTitle: 'Design Tokens | Eagami UI',
      metaDescription:
        'CSS custom properties for colors, typography, spacing, elevation, shape, and motion.',
      title: 'Design tokens',
      lede: 'The CSS custom properties that drive every component in the library: colors, typography, spacing, elevation, shape, and motion. Reference these tokens in your own styles via <code>var(--token-name)</code> to keep visual consistency across the app.',
      sections: {
        theming: 'Theming',
        palette: 'Brand palette',
        colors: 'Colors',
        typography: 'Typography',
        spacing: 'Spacing',
        elevation: 'Elevation',
        shape: 'Shape',
        motion: 'Motion',
      },
      themingRootBefore:
        'Override any token on <code>:root</code> to retheme the entire library:',
      themingScopedBefore: 'Or scope overrides to individual components where useful:',
      paletteIntro:
        'Pass a single brand hex to <code>provideEagamiUi()</code> and the library derives a full ten-shade scale (50 through 900) in <a href="https://www.w3.org/TR/css-color-4/#ok-lab" target="_blank" rel="noopener noreferrer"><span>OKLCH</span></a> space, holding hue and chroma steady while stepping lightness. The derived shades feed every <code>--color-brand-*</code> token in both light and dark mode:',
      paletteOverrides:
        'Pin specific shades or remap which derived shade backs each semantic role:',
      paletteContrast:
        'Every brand-role pairing (text on surface, surface on canvas) is checked against WCAG 2.1 AA at bootstrap. A failing combination throws before the app loads, so a contrast bug in the brand colour is caught at boot rather than in production.',
      paletteBuilderIntro: 'Build and preview your palette visually in the',
      paletteBuilderLink: 'theme builder',
      elevationDrop: 'Drop shadows',
      elevationRelief: 'Bevel and well',
      elevationReliefBefore:
        '<code>--shadow-bevel</code> pairs an inset highlight (top) with an inset shadow (bottom) for surfaces that should read as raised. <code>--shadow-well</code> inverts the lighting for a recessed look. Combine with <code>--shadow-*</code> for an ambient drop: <code>box-shadow: var(--shadow-bevel), var(--shadow-sm);</code>',
      colorsPrimary: 'Primary',
      colorsSecondary: 'Secondary',
      colorsNeutral: 'Neutral',
      colorsStatus: 'Status',
      colorsSemantic: 'Semantic',
      typographyFamilies: 'Families',
      typographySizes: 'Sizes',
      typographyWeights: 'Weights',
      typographyComposites: 'Composite styles',
      typographyCompositesBefore:
        'Composite tokens bundle a size, weight, line-height (and sometimes family) for a specific role. <code>--text-section-heading-*</code> is the first composite that pins a font-family — use it for the <code>&lt;h2&gt;</code> subsection title on docs and marketing pages.',
      typographySectionHeadingSample: 'Brand voice section heading',
      motionSimulate: 'Simulate',
      motionDurations: 'Durations',
      motionEasings: 'Easings',
    },
    icons: {
      metaTitle: 'Angular Icons | Eagami UI',
      metaDescription: 'Icon set bundled with @eagami/ui.',
      title: 'Icons',
      lede: 'Standalone Angular components that inherit their color and scale with <code>font-size</code>, so they render at any size. Most are derived from <a href="https://feathericons.com/" target="_blank" rel="noopener noreferrer"><span>Feather Icons</span></a> by <a href="https://github.com/colebemis" target="_blank" rel="noopener noreferrer"><span>Cole Bemis</span></a> under the <a href="https://github.com/feathericons/feather/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><span>MIT License</span></a>; the remainder are original Eagami UI icons. Feather icons can also be drawn with thinner or thicker strokes. Click an icon to copy its selector.',
      filterLabel: 'Filter icons',
      filterPlaceholder: 'Search icons',
      filterClearLabel: 'Clear search',
      categoryFeather: 'Feather',
      categoryEagami: 'Eagami UI',
      categoryBrand: 'Brand',
      countAll: count => `${count} icons`,
      countFiltered: (shown, total) => `${shown} of ${total} icons`,
      noResults: 'No icons match your search',
      copiedToast: selector => `Copied "${selector}" to clipboard`,
      copyFailedToast: selector => `Could not copy "${selector}" to clipboard`,
      brandTitle: 'Brand icons',
      brandIntro:
        'The brand icons in the list below depict third-party trademarks and are provided only for nominative use, i.e. identifying the brand they represent in a UI (a "Sign in with Google" button, a "Share to Facebook" link, etc.). They are not licensed for general decorative use. Consumers are responsible for following each brand\'s guidelines:',
      brandLinkLabel: 'Brand resources',
    },
    i18n: {
      metaTitle: 'Internationalization | Eagami UI',
      metaDescription:
        'Built-in component text in 15 locales, with runtime switching and per-string overrides.',
      title: 'Internationalization',
      lede: 'Every built-in string (ARIA labels, placeholders, empty states, date-picker controls) ships in 15 locales. Set one for the whole app, switch at runtime, or override individual strings.',
      supportedHeading: 'Supported locales',
      supportedFallback:
        'Unknown locales fall back to English, as do any keys missing from a partial override.',
      quickSetupHeading: 'Quick setup',
      quickSetupBefore:
        'Add <code>provideEagamiUi()</code> to your app config and register the languages you use via <code>locales</code>. English is always available, so you ship only what you need.',
      lazyHeading: 'Lazy loading',
      lazyBefore:
        'Register <code>localeLoaders</code> instead of <code>locales</code> and a language is fetched the first time it becomes active, keeping it out of the initial bundle. Point each loader at a module that re-exports one locale bundle, and preload with <code>loadLocale()</code> when the switch needs to be instant.',
      liveDemoHeading: 'Live demo',
      liveDemoIntro:
        'Pick a locale and watch the components below pick up the matching strings and date formatting.',
      runtimeSwitchHeading: 'Runtime switching',
      runtimeSwitchBefore:
        'Inject <code>EagamiI18nService</code> and call <code>setLocale()</code>. The active locale is a signal, so every component re-renders with the new strings without a refresh.',
      perStringHeading: 'Per-string overrides',
      perStringBefore:
        "Pass a <code>messages</code> object alongside the locale to swap individual strings. Anything you omit falls back to the locale's defaults.",
      perStringAfter:
        'Most components also expose individual message inputs (e.g. <code>placeholder</code> on <code>&lt;ea-dropdown&gt;</code>) for one-off overrides at the call site.',
      frenchSpacingHeading: 'French spacing helper',
      frenchSpacingBody:
        'French typography expects a narrow non-breaking space before <code>? ! : ; »</code> and after <code>«</code>. The exported <code>frenchSpacing()</code> helper converts regular spaces in your own French strings (the library handles its bundled French messages internally).',
      demoLocaleLabel: 'Locale',
    },
    accessibility: {
      metaTitle: 'Accessibility | Eagami UI',
      metaDescription:
        'WCAG 2.2 AA conformance, full keyboard support, and screen-reader friendly components, verified with every release.',
      title: 'Accessibility',
      lede: 'Every component is built to the leading web accessibility standards: correct semantics, full keyboard support, focus management, and screen-reader announcements work out of the box.',
      conformanceHeading: 'Conformance',
      conformanceBody:
        'The library adheres to <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener">WCAG 2.2 Level AA</a>, the standard most organizations are required to meet, and follows the official W3C authoring practices for every kind of control, from dialogs and menus to sliders and date pickers. Screen-reader announcements ship in every supported language, so assistive technology always speaks the language of the user.',
      builtInHeading: 'Accessibility built in',
      builtInItems: [
        {
          title: 'Semantics',
          body: 'Native elements where possible, explicit ARIA roles, states, and properties where not. States like expanded, selected, checked, invalid, and busy are always exposed programmatically, never through styling alone.',
        },
        {
          title: 'Keyboard support',
          body: 'Complete APG keyboard patterns: roving tabindex, arrow-key navigation, Home and End, Escape to dismiss, and Enter or Space to activate, with RTL-aware arrow handling.',
        },
        {
          title: 'Focus management',
          body: 'Modals and pickers trap focus while open and return it to the trigger on close. Focus indicators are always visible and never suppressed.',
        },
        {
          title: 'Screen-reader announcements',
          body: 'Toasts, alerts, validation errors, and async state changes are announced through live regions with the appropriate politeness level.',
        },
        {
          title: 'Reduced motion',
          body: 'Animations respect the prefers-reduced-motion media query throughout.',
        },
        {
          title: 'Contrast',
          body: 'The default light and dark themes meet WCAG contrast requirements, and the theming tools flag combinations that fall below AA.',
        },
      ],
      labelsHeading: 'Accessible names',
      labelsBefore:
        'Components that render text label themselves. Anything icon-only or graphical exposes an <code>aria-label</code> input (with localized defaults for built-in controls like clear, close, and dismiss buttons), and form fields wire <code>label</code>, hints, and error messages to the control via <code>aria-describedby</code> automatically.',
      labelsAfter:
        'Provide a <code>label</code> or <code>aria-label</code> for controls without visible text and the component handles the rest: names, hints, and error messages stay wired together automatically.',
      testingHeading: 'Verified with every release',
      testingBody:
        'Every component is checked against industry accessibility rules whenever it changes, and a release only ships when every check passes, so the accessibility you see here holds as the library evolves.',
    },
    component: {
      metaTitle: name => `Angular ${name} Component | Eagami UI`,
      metaDescription: name =>
        `Angular ${name} component: live demo, API reference, and theming with CSS variables.`,
      demoHeading: 'Demo',
      notFoundTitle: 'Component not found',
      notFoundBody: 'Pick a component from the sidebar, or',
      notFoundLink: 'return to the introduction',
      sectionHeadings: {
        basic: 'basic',
        variants: 'variants',
        sizes: 'sizes',
        states: 'states',
        disabled: 'disabled',
        dismissible: 'dismissible',
        clearable: 'clearable',
        hintAndError: 'hint & error',
        withHint: 'with hint',
        withError: 'with error',
        withLabel: 'with label',
        withIcons: 'with icons',
        withFooter: 'with footer',
        withPaginator: 'with paginator',
        withDisabledItem: 'with disabled item',
        withDisabledTab: 'with disabled tab',
        required: 'required',
        requiredWithHint: 'required with hint',
        horizontal: 'horizontal',
        vertical: 'vertical',
        single: 'single',
        multi: 'multi',
        circle: 'circle',
        square: 'square',
        shapes: 'shapes',
        shapesAndFallbacks: 'shapes & fallbacks',
        chevronSeparator: 'chevron separator',
        slashSeparator: 'slash separator',
        twoLevels: 'two levels',
        fourDigitPin: '4-digit PIN',
        defaultHeading: 'default',
        stripedAndBordered: 'striped & bordered',
        compactDensity: 'compact density',
        tinyList: 'tiny list',
        stickyHeader: 'sticky header',
        emptyState: 'empty state',
        formatVariants: 'format variants',
        minMax: 'min & max',
        positions: 'positions',
        trigger: 'trigger',
        alignLeft: 'align: left',
        alignCenter: 'align: center',
        manyPages: 'many pages',
        minimal: 'minimal',
        indeterminate: 'indeterminate',
        noResize: 'no resize',
        resizing: 'resizing',
        disabledAndReadonly: 'disabled & readonly',
        password: 'password',
        autocompleteSection: 'autocomplete',
        twoOptions: 'two options',
        fullWidth: 'full width',
        minLengthMaxResults: 'min length & max results',
        removable: 'removable',
        minMaxLabels: 'min/max labels',
        underline: 'underline',
        filled: 'filled',
        rect: 'rect',
        inlineLayout: 'inline layout',
        noResults: 'no results',
        titleOnly: 'title only',
        iconTrigger: 'icon trigger',
        placements: 'placements',
        canvasSizes: 'canvas sizes',
        cappedChipCount: 'capped chip count',
        customIcon: 'custom icon',
        customIconAndColor: 'custom icon & color',
        halfSteps: 'half steps',
        customLabel: 'custom label',
        customSize: 'custom size',
        linearFlow: 'linear flow',
        manyLevels: 'many levels',
        notAnimated: 'not animated',
        numberOfStars: 'number of stars',
        minimumOne: 'minimum 1 star',
        outputFormats: 'output formats',
        quarterHourSteps: 'quarter-hour steps',
        readonly: 'read-only',
        singleFile: 'single file',
        stepped: 'stepped',
        sundayStart: 'sunday start',
        twelveHourFormat: '12-hour format',
        twoActions: 'two actions',
        withCompletedSteps: 'with completed steps',
        withConstraints: 'with constraints',
        withInitialValue: 'with initial value',
        withMaxlength: 'with maxlength',
        withMaxHeight: 'with max-height',
        withMinMaxLabels: 'with min/max labels',
        withOptionalStep: 'with optional step',
        withSeconds: 'with seconds',
        withSelection: 'with selection',
        withoutAlpha: 'without alpha',
        withoutSearch: 'without search',
        withoutSelectAll: 'without select-all',
        wrapping: 'wrapping',
      },
      common: {
        small: 'Small',
        medium: 'Medium',
        large: 'Large',
        cancel: 'Cancel',
        save: 'Save',
        close: 'Close',
        confirm: 'Confirm',
        disabled: 'Disabled',
        defaultLabel: 'Default',
        successLabel: 'Success',
        warningLabel: 'Warning',
        errorLabel: 'Error',
        infoLabel: 'Info',
      },
      demos: {
        accordion: {
          whatLabel: 'What is @eagami/ui?',
          whatBody:
            'A lightweight, accessible Angular component library built on CSS custom properties.',
          installLabel: 'How do I install it?',
          installBody:
            'Run pnpm add @eagami/ui, then add the global stylesheet to your angular.json.',
          themeLabel: 'Can I customize the theme?',
          themeBody:
            'Yes, override any CSS custom property on :root or scope overrides to individual components.',
          sectionOneLabel: 'Section One',
          sectionOneBody: 'Multiple sections can be open at once in multi mode.',
          sectionTwoLabel: 'Section Two',
          sectionTwoBody: 'Content for section two.',
          disabledSectionLabel: 'Disabled Section',
          disabledSectionBody: 'This content is not reachable.',
        },
        alert: {
          defaultText: 'This is a default alert',
          successText: 'Your changes have been saved',
          warningText: 'Your trial expires in 3 days',
          errorText: 'Something went wrong, please try again',
          infoText: 'A new version is available',
          dismissibleText: 'This alert can be dismissed',
          tooltipSuppressed:
            'Tooltips are suppressed on touch devices to avoid sticky-hover behaviour. View this section on a device with a mouse to see the demos in action.',
        },
        autocomplete: {
          startTyping: 'Start typing…',
          hintText: 'Start typing to see matches',
          errorText: 'Please select a dog breed',
          breedPlaceholder: 'Dog breed…',
          minMaxLabel: 'Min 2 chars, max 3 results',
          minMaxPlaceholder: 'Type at least 2 characters…',
        },
        avatarEditor: {
          result: 'Result:',
        },
        badge: {
          successText: 'Active',
          warningText: 'Pending',
          newText: 'New',
        },
        button: {
          primary: 'Primary',
          secondary: 'Secondary',
          ghost: 'Ghost',
          danger: 'Danger',
          toggleLoading: 'Toggle loading',
          fullWidth: 'Full width',
          clickedToast: 'Button pressed!',
        },
        card: {
          elevatedHeader: 'Elevated',
          elevatedBody: 'Card with shadow elevation.',
          outlinedHeader: 'Outlined',
          outlinedBody: 'Card with border outline.',
          filledHeader: 'Filled',
          filledBody: 'Card with subtle background.',
          cardTitleHeader: 'Card Title',
          cardWithFooterBody: 'This card has a header, body, and footer with actions.',
        },
        checkbox: {
          acceptTermsAndConditions: 'Accept terms and conditions',
          disabledChecked: 'Disabled checked',
          indeterminate: 'Indeterminate',
          iAgreeToTerms: 'I agree to the terms',
          subscribeToUpdates: 'Subscribe to updates',
          subscribeHint: 'A monthly digest is sent, no spam',
          acceptTermsLabel: 'Accept terms',
          acceptTermsError: 'The terms must be accepted to continue',
        },
        codeInput: {
          verificationCodeLabel: 'Verification code',
          verificationCodeHint: 'Check your email for the 6-digit code',
          verificationCodeError: 'Invalid verification code',
          pinLabel: 'PIN',
          pinHint: 'Enter your 4-digit PIN',
        },
        colorPicker: {
          brandLabel: 'Brand color',
          hintBrandColor: 'Used as the primary brand color',
          errorRequired: 'This field is required',
          hexLabel: 'HEX format',
          rgbLabel: 'RGB format',
          hslLabel: 'HSL format',
          noAlphaHeading: 'Opaque only',
          opaqueOnlyLabel: 'Solid color',
        },
        dataTable: {
          tableColumnId: 'ID',
          tableColumnFirstName: 'First Name',
          tableColumnLastName: 'Last Name',
          tableColumnAdmin: 'Admin',
          tableColumnPosts: 'Posts',
        },
        datePicker: {
          appointmentLabel: 'Appointment',
          pickDatePlaceholder: 'Pick a date…',
          hintAnyFutureDate: 'Select any future date',
          errorRequired: 'This field is required',
          shortLabel: 'Short',
          mediumLabel: 'Medium',
          longLabel: 'Long',
          withinNextWeeksLabel: 'Within next 3 weeks',
          withinNextWeeksHint: '±1 week / +3 weeks from today',
        },
        dialog: {
          openButton: 'Open dialog',
          title: 'Dialog Title',
          body: 'This is the dialog body. It supports any content including forms, text, and other components.',
        },
        divider: {
          orLabel: 'or',
          sectionLabel: 'Section',
          leftLabel: 'Left',
          rightLabel: 'Right',
        },
        drawer: {
          openButton: 'Open drawer',
          rightButton: 'Right',
          leftButton: 'Left',
          topButton: 'Top',
          bottomButton: 'Bottom',
          rightTitle: 'Right Drawer',
          rightBody: 'Slides in from the right edge, useful for details panels.',
          leftTitle: 'Left Drawer',
          leftBody: 'Slides in from the left, useful for navigation menus.',
          topTitle: 'Top Drawer',
          topBody: 'Slides down from the top, useful for notifications.',
          bottomTitle: 'Bottom Drawer',
          bottomBody: 'Slides up from the bottom, common on mobile for action sheets.',
        },
        dropdown: {
          fruitLabel: 'Fruit',
          fruitPlaceholder: 'Select a fruit…',
          hintFavourite: 'Choose your favourite',
          errorRequired: 'This field is required',
          selectPlaceholder: 'Select…',
        },
        emptyState: {
          noItemsTitle: 'No items yet',
          noItemsDescription: 'Get started by creating your first item.',
          createItem: 'Create item',
          noResultsTitle: 'No results found',
          noResultsDescription:
            "Try adjusting your search or filter to find what you're looking for.",
          clearFilters: 'Clear filters',
          nothingHereTitle: 'Nothing to see here',
        },
        fileUploader: {
          attachmentsLabel: 'Attachments',
          imagesLabel: 'Upload images',
          imagesHint: 'PNG or JPEG, up to 2 MB each, max 4 files',
          resumeLabel: 'Upload resume',
          customIconLabel: 'Attach files',
          withHintHint: 'Up to 10 MB per file',
          withErrorText: 'At least one image is required',
        },
        formField: {
          emailPlaceholder: 'you@example.com',
        },
        input: {
          defaultLabel: 'Default',
          enterTextPlaceholder: 'Enter text…',
          hintGuidance: 'Helpful guidance goes here',
          errorRequired: 'This field is required',
          readonlyLabel: 'Readonly',
          readonlyValue: 'Read-only value',
          passwordLabel: 'Password',
          passwordPlaceholder: 'Enter your password…',
          passwordNoToggleLabel: 'Password (toggle hidden)',
          passwordNoTogglePlaceholder: 'No visibility toggle',
          emailLabel: 'Email',
          emailPlaceholder: 'you@example.com',
        },
        menu: {
          openButton: 'Open menu',
          edit: 'Edit',
          duplicate: 'Duplicate',
          archive: 'Archive',
          delete: 'Delete',
          file: 'File',
          moreOptionsLabel: 'More options',
          view: 'View',
          rename: 'Rename',
          newItem: 'New',
          open: 'Open',
          saveUnavailable: 'Save (unavailable)',
          saveAs: 'Save As',
        },
        popover: {
          openLabel: 'Open popover',
          basicContent:
            'A floating surface anchored to its trigger. Use it as a building block for menus, dropdowns, and custom overlays.',
          placementTopLabel: 'top',
          placementTopStartLabel: 'top-start',
          placementTopEndLabel: 'top-end',
          placementBottomLabel: 'bottom',
          placementBottomStartLabel: 'bottom-start',
          placementBottomEndLabel: 'bottom-end',
          placementLeftLabel: 'left',
          placementRightLabel: 'right',
          placementTopContent: 'Centered above the trigger',
          placementTopStartContent: 'Above the trigger, aligned to its left edge',
          placementTopEndContent: 'Above the trigger, aligned to its right edge',
          placementBottomContent: 'Centered below the trigger',
          placementBottomStartContent: 'Below the trigger, aligned to its left edge',
          placementBottomEndContent: 'Below the trigger, aligned to its right edge',
          placementLeftContent: 'Centered to the left of the trigger',
          placementRightContent: 'Centered to the right of the trigger',
        },
        progressBar: {
          processing: 'Processing…',
        },
        radio: {
          appleLabel: 'Apple',
          bananaLabel: 'Banana',
          cherryLabel: 'Cherry',
          optionALabel: 'Option A',
          optionBLabel: 'Option B',
          subscriptionPlanLabel: 'Subscription plan',
          freeLabel: 'Free',
          proLabel: 'Pro',
          enterpriseLabel: 'Enterprise',
          deliverySpeedLabel: 'Delivery speed',
          deliverySpeedHint: 'Choose how fast you want it',
          standardLabel: 'Standard',
          expressLabel: 'Express',
          accountTypeLabel: 'Account type',
          accountTypeError: 'Please choose an account type',
          personalLabel: 'Personal',
          businessLabel: 'Business',
        },
        rating: {
          experienceLabel: 'Rate your experience',
          halfStepsLabel: 'Half-step rating',
          halfStepsHint: 'Click the left or right half of a star to set 0.5 increments.',
          readonlyLabel: 'Average rating',
          withHintHint: 'Tap a star to set the rating',
          withErrorText: 'A rating is required',
          numberOfStarsLabel: 'Rate it',
          customIconLabel: 'How much do you love it?',
        },
        segmented: {
          viewLabel: 'View',
          themeLabel: 'Theme',
          themeHint: 'Affects the entire app',
          layoutLabel: 'Layout',
          layoutError: 'Layout selection is required',
          viewOptionList: 'List',
          viewOptionGrid: 'Grid',
          viewOptionKanban: 'Kanban',
          themeOptionLight: 'Light',
          themeOptionDark: 'Dark',
        },
        slider: {
          volumeLabel: 'Volume',
          brightnessLabel: 'Brightness',
          withHintLabel: 'With hint',
          sliderHint: 'Drag the handle or use arrow keys to adjust',
          withErrorLabel: 'With error',
          sliderError: 'Please pick a value above 50',
        },
        switch: {
          enableNotificationsLabel: 'Enable notifications',
          disabledOnLabel: 'Disabled on',
          confirmConsentLabel: 'Confirm consent',
          marketingEmailsLabel: 'Marketing emails',
          marketingEmailsHint: 'Unsubscribe at any time',
          twoFactorAuthLabel: 'Two-factor auth',
          twoFactorAuthError: 'Two-factor authentication must be enabled',
        },
        tabs: {
          account: 'Account',
          accountContent: 'Account settings content',
          security: 'Security',
          securityContent: 'Security settings content',
          notifications: 'Notifications',
          notificationsContent: 'Notification preferences',
          overview: 'Overview',
          overviewContent: 'Overview content',
          analytics: 'Analytics',
          analyticsContent: 'Analytics content',
          reports: 'Reports',
          reportsContent: 'Reports content',
          general: 'General',
          generalContent: 'General settings',
          billing: 'Billing',
          billingContent: 'Billing details',
          admin: 'Admin',
          adminContent: 'Admin panel',
        },
        tag: {
          disabledSuccess: 'Disabled success',
        },
        textarea: {
          messageLabel: 'Message',
          messagePlaceholder: 'Enter your message…',
          hintMaxCharacters: 'Maximum 500 characters',
          errorRequired: 'This field is required',
          fixedSizeLabel: 'Fixed size',
          fixedSizePlaceholder: 'Cannot be resized',
          readonlyLabel: 'Readonly',
          readonlyValue: 'Read-only content',
        },
        toast: {
          message: variant => {
            const article = variant === 'error' || variant === 'info' ? 'an' : 'a';
            return `This is ${article} ${variant} toast`;
          },
        },
        tooltip: {
          triggerLabel: '(hover over me)',
          templateTriggerLabel: '(hover for a template tooltip)',
          templateTipStatus: 'Online now',
          topLabel: 'Top',
          topTooltip: 'Top tooltip',
          bottomLabel: 'Bottom',
          bottomTooltip: 'Bottom tooltip',
          leftLabel: 'Left',
          leftTooltip: 'Left tooltip',
          rightLabel: 'Right',
          rightTooltip: 'Right tooltip',
        },
        transferList: {
          sourceLabel: 'Available',
          targetLabel: 'Selected',
          roleAdmin: 'Admin',
          roleEditor: 'Editor',
          roleViewer: 'Viewer',
          roleGuest: 'Guest',
          roleBilling: 'Billing',
          roleOwner: 'Owner',
        },
        virtualList: {
          row: 'Row',
          detail: n => `Generated record #${n}`,
          scrollPosition: (first, total) =>
            `Showing row ${first.toLocaleString('en-US')} of ${total.toLocaleString('en-US')}`,
        },
        commandPalette: {
          hint: 'Press Ctrl + K (or Cmd + K) to open the command palette anywhere on this page.',
          openButton: 'Open command palette',
          fileGroup: 'File',
          editGroup: 'Edit',
          newFile: 'New file',
          openFile: 'Open file',
          save: 'Save',
          find: 'Find',
          findKeyword: 'search',
          replace: 'Replace',
          undo: 'Undo',
          toggleTheme: 'Toggle theme',
          toggleThemeDescription: 'Switch between light and dark mode',
          lockWorkspace: 'Lock workspace',
          lockWorkspaceDescription: 'Currently disabled — feature in beta',
          executedToast: label => `Executed: ${label}`,
        },
        avatarEditorActions: {
          avatarUpdatedToast: 'Avatar updated',
        },
      },
      playground: {
        controls: 'Controls',
        reset: 'Reset',
        code: 'Code',
        apiReference: 'API reference',
        inputs: 'Inputs',
        outputs: 'Outputs',
        methods: 'Methods',
        colName: 'Name',
        colType: 'Type',
        colDefault: 'Default',
        colDescription: 'Description',
        errorMessagesDescription:
          'Overrides the validation message per error key for a bound form control; unset keys use the localized default.',
        ariaLabelDescription:
          'Accessible name announced by assistive technology when the component renders no visible label.',
        triggerErrorLabel: 'Trigger error',
        requiredBadge: 'required',
        twoWayBadge: 'two-way',
        rangeHint: { between: 'to', min: 'Min', max: 'Max' },
        knobLabels: {
          timeline: { orientation: 'Orientation', align: 'Alignment', size: 'Size' },
          tooltip: {
            eaTooltip: 'Tooltip Content',
          },
          input: {
            label: 'Label',
            placeholder: 'Placeholder',
            size: 'Size',
            type: 'Type',
            disabled: 'Disabled',
            readonly: 'Read-only',
            required: 'Required',
            autofocus: 'Autofocus',
            showPasswordToggle: 'Show password toggle',
            clearable: 'Clearable',
            autocomplete: 'Autocomplete',
          },
          'number-input': {
            allowNegative: 'Allow negative',
            label: 'Label',
            placeholder: 'Placeholder',
            size: 'Size',
            min: 'Minimum',
            max: 'Maximum',
            step: 'Step',
            disabled: 'Disabled',
            readonly: 'Read-only',
            required: 'Required',
          },
          'form-field': {
            size: 'Size',
            label: 'Label',
            hint: 'Hint',
            required: 'Required',
          },
          alert: {
            variant: 'Variant',
            dismissible: 'Dismissible',
            size: 'Size',
            icon: 'Icon (override)',
          },
          avatar: {
            size: 'Size',
            shape: 'Shape',
            src: 'Image source',
            initials: 'Initials',
            alt: 'Alt text',
          },
          badge: {
            variant: 'Variant',
            size: 'Size',
            shape: 'Shape',
          },
          button: {
            variant: 'Variant',
            size: 'Size',
            type: 'Type',
            disabled: 'Disabled',
            loading: 'Loading',
            fullWidth: 'Full width',
          },
          card: {
            variant: 'Variant',
            padding: 'Padding',
            headerAlign: 'Header alignment',
            fullWidth: 'Full width',
            headerDivider: 'Header divider',
          },
          checkbox: {
            label: 'Label',
            count: 'Count',
            size: 'Size',
            disabled: 'Disabled',
            required: 'Required',
            indeterminate: 'Indeterminate',
          },
          'code-input': {
            size: 'Size',
            length: 'Length',
            label: 'Label',
            placeholder: 'Placeholder',
            disabled: 'Disabled',
            readonly: 'Read-only',
            required: 'Required',
          },
          'color-picker': {
            label: 'Label',
            placeholder: 'Placeholder',
            size: 'Size',
            format: 'Format',
            showAlpha: 'Show alpha',
            clearable: 'Clearable',
            disabled: 'Disabled',
            readonly: 'Read-only',
            required: 'Required',
          },
          divider: {
            orientation: 'Orientation',
            label: 'Label',
          },
          'eagami-wordmark': {
            variant: 'Variant',
            layout: 'Layout',
            size: 'Size (px)',
          },
          'empty-state': {
            size: 'Size',
            headingLevel: 'Heading level',
            title: 'Title',
            description: 'Description',
          },
          paginator: {
            align: 'Align',
            showPageSizeSelector: 'Show page size selector',
            showRangeLabel: 'Show range label',
            disabled: 'Disabled',
            totalItems: 'Total items',
          },
          'progress-bar': {
            variant: 'Variant',
            size: 'Size',
            value: 'Value',
            max: 'Max',
            buffer: 'Buffer',
            showPercentage: 'Show percentage',
            indeterminate: 'Indeterminate',
            label: 'Label',
          },
          radio: {
            label: 'Label',
            disabled: 'Disabled',
          },
          'range-slider': {
            label: 'Label',
            hint: 'Hint',
            errorMsg: 'Error message',
            min: 'Minimum',
            max: 'Maximum',
            step: 'Step',
            size: 'Size',
            showValue: 'Show value',
            showMinMaxLabels: 'Show min/max labels',
            disabled: 'Disabled',
            required: 'Required',
          },
          rating: {
            label: 'Label',
            size: 'Size',
            min: 'Minimum',
            max: 'Maximum',
            allowHalf: 'Allow half steps',
            readonly: 'Read-only',
            disabled: 'Disabled',
            required: 'Required',
            clearable: 'Clearable',
            iconClass: 'Icon',
          },
          skeleton: {
            variant: 'Variant',
            animated: 'Animated',
            width: 'Width',
            height: 'Height',
          },
          slider: {
            size: 'Size',
            min: 'Min',
            max: 'Max',
            step: 'Step',
            showValue: 'Show value',
            showMinMaxLabels: 'Show min/max labels',
            disabled: 'Disabled',
            required: 'Required',
            hasError: 'Error state',
            label: 'Label',
          },
          spinner: {
            size: 'Size',
            label: 'Label',
          },
          switch: {
            label: 'Label',
            size: 'Size',
            disabled: 'Disabled',
            required: 'Required',
          },
          tag: {
            variant: 'Variant',
            size: 'Size',
            removable: 'Removable',
            disabled: 'Disabled',
            removeLabel: 'Remove label',
          },
          textarea: {
            label: 'Label',
            placeholder: 'Placeholder',
            size: 'Size',
            resize: 'Resize',
            maxlength: 'Max length (chars)',
            minHeight: 'Min height (px)',
            maxHeight: 'Max height (px)',
            disabled: 'Disabled',
            readonly: 'Read-only',
            required: 'Required',
          },
        },
        knobNotes: { accordion: { headingLevel: '(semantic-only)' } },

        descriptions: {
          timeline: {
            items: 'The events to render, in order.',
            orientation: 'Direction the timeline flows.',
            align:
              'Content placement relative to the line; alternate applies to vertical timelines only.',
            size: 'Visual size of the timeline.',
          },
          toast: {
            size: 'Visual size applied to every toast in the stack.',
            position: 'Viewport corner or edge the toast stack is pinned to.',
            clearable: 'Show a dismiss button on each toast.',
          },
          input: {
            label: 'Text label rendered above the field.',
            type: 'Native input type (password adds a built-in show/hide toggle).',
            placeholder: 'Placeholder shown while the field is empty.',
            size: 'Visual size of the field.',
            hint: 'Helper text shown below the field, hidden while an error is showing.',
            errorMsg:
              'Error message shown below the field, replacing the hint and flagging the field invalid.',
            disabled: 'Disables the field.',
            readonly: 'Renders the field read-only.',
            required: 'Marks the field as required.',
            autocomplete: 'Value for the native autocomplete attribute.',
            list: 'id of a <datalist> to associate for native suggestions.',
            autofocus: 'Focuses the field once, after it first renders.',
            showPasswordToggle: 'Shows the reveal toggle for password inputs.',
            clearable: 'Shows a clear button while the field has a value.',
            id: 'id applied to the native input and label for, auto-generated when omitted.',
            value: 'Current field value, two-way bindable via [(value)].',
            blurred: 'Fires when the field loses focus.',
            focused: 'Fires when the field receives focus.',
            clear: 'Clears the current value and restores focus to the field.',
            focus: 'Moves keyboard focus to the underlying native field.',
            togglePasswordVisibility:
              'Toggles the password reveal state for type="password" inputs.',
            icon: 'Leading icon component rendered before the text.',
            max: 'Maximum value for type="number"; the value is clamped to it on blur.',
            maxLength:
              'Maximum number of characters; enforced for type="number" where native maxlength is ignored.',
            min: 'Minimum value for type="number"; the value is clamped to it on blur.',
            minLength:
              'Minimum number of characters, passed as the native minlength attribute.',
            step: 'Step increment for type="number" inputs.',
            clampToBounds:
              'Clamps a number value into the configured min/max range once editing finishes.',
          },
          'number-input': {
            allowNegative:
              'Whether negative values are allowed; when false the value floors at 0.',
            label: 'Text label rendered above the field.',
            placeholder: 'Placeholder shown while the field is empty.',
            size: 'Visual size of the field.',
            hint: 'Helper text shown below the field, hidden while an error is showing.',
            errorMsg:
              'Error message shown below the field, replacing the hint and flagging the field invalid.',
            disabled: 'Disables the field.',
            readonly: 'Renders the field read-only.',
            required: 'Marks the field as required.',
            min: 'Minimum value; typed values are clamped to it on blur and the steppers respect it.',
            max: 'Maximum value; typed values are clamped to it on blur and the steppers respect it.',
            step: 'Amount each step (arrow key or stepper) adds or subtracts.',
            id: 'id applied to the native input and label for, auto-generated when omitted.',
            value:
              'Current field value; null when empty, two-way bindable via [(value)].',
            changed: 'Fires with the new value whenever it changes.',
            focused: 'Fires when the input receives focus.',
            blurred: 'Fires when the input loses focus.',
            focus: 'Moves keyboard focus to the underlying native input.',
          },
          accordion: {
            size: 'Visual size of the accordion; every item inherits it.',
            multi: 'Allows multiple items to stay expanded at once.',
            headingLevel:
              'Heading level (1-6) applied to every item header, so the accordion slots into the page outline.',
          },
          alert: {
            dismissible: 'Shows a close button that lets the user dismiss the alert.',
            variant: "Semantic color scheme that drives the alert's icon and palette.",
            visible: 'Whether the alert is shown, two-way bindable via [(visible)].',
            dismissed: 'Fires when the user dismisses the alert via its close button.',
            dismiss: 'Hides the alert and emits the dismissed event.',
            size: 'Scales the text, icon, and gap together.',
            icon: "Overrides the variant's default status icon with any icon component.",
          },
          avatar: {
            src: 'Image URL to display; falls back to initials, then a generic user icon.',
            alt: 'Alternative text for the avatar image.',
            initials: 'Initials shown when no image source is provided.',
            size: 'Diameter preset for the avatar.',
            shape: 'Outline of the avatar: round or rounded-square.',
          },
          badge: {
            variant: 'Semantic colour scheme of the badge.',
            size: 'Visual size of the badge.',
            shape:
              'Outer shape of the badge (pill hugs the content, pin renders as a circle for single characters).',
          },
          button: {
            variant: 'Visual style of the button, driving its colour and emphasis.',
            size: 'Visual size of the button.',
            type: 'Native type attribute applied to the underlying button element.',
            disabled: 'Disables the button and suppresses click events.',
            loading: 'Swaps the label for a spinner while preserving the rendered width.',
            fullWidth: 'Stretches the button to fill the width of its container.',
            ariaLabel:
              'Accessible label for the button when its content is not descriptive enough.',
            ariaCurrent:
              'Value for the native aria-current attribute, marking the button as the current item in a set.',
            clicked:
              'Fires when the button is activated, suppressed while disabled or loading.',
            icon: 'Optional icon component rendered to the left of the label.',
          },
          card: {
            variant: 'Visual style of the card surface.',
            padding: "Padding preset applied to the card's content area.",
            headerAlign: 'Horizontal alignment of the header content.',
            fullWidth: 'Stretches the card to fill the available width.',
            headerDivider: 'Shows a divider between the header and the body.',
          },
          checkbox: {
            ariaLabel:
              'Accessible name for the checkbox when no visible label is rendered.',
            checked: 'Current checked state, two-way bindable via [(checked)].',
            count: 'Supplementary value shown dimmed right after the label.',
            disabled: 'Disables the checkbox.',
            errorMsg:
              'Error message shown below the field, replacing the hint and flagging the field invalid.',
            hint: 'Helper text shown below the field, hidden while an error is showing.',
            id: 'id applied to the native input and label for, auto-generated when omitted.',
            indeterminate: 'Renders the checkbox in a visually indeterminate state.',
            label: 'Text label rendered beside the checkbox.',
            required: 'Marks the checkbox as required.',
            size: 'Visual size of the checkbox.',
            changed:
              'Fires with the new checked state whenever the user toggles the checkbox.',
          },
          'code-input': {
            disabled: 'Disables every digit cell.',
            errorMsg:
              'Error message shown below the field, replacing the hint and flagging the field invalid.',
            hint: 'Helper text shown below the field, hidden while an error is showing.',
            id: 'id applied to the digit cells and label for, auto-generated when omitted.',
            label: 'Text label rendered above the field.',
            length: 'Number of digit cells the code is made up of.',
            placeholder: 'Placeholder text spread one character per cell.',
            readonly: 'Renders the field read-only.',
            required: 'Marks the field as required.',
            size: 'Visual size of each digit cell.',
            value: 'Current code value, two-way bindable via [(value)].',
            completed: 'Fires with the full code once every digit has been entered.',
            focus:
              'Moves keyboard focus to the next empty digit (or the last one when full).',
            allowAllChars:
              'Allow any non-whitespace character; when off only digits are accepted.',
          },
          'color-picker': {
            disabled: 'Disables the field.',
            errorMsg:
              'Error message shown below the field, replacing the hint and flagging the field invalid.',
            format: 'Output format of the emitted color value (hex, rgb, or hsl).',
            hint: 'Helper text shown below the field, hidden while an error is showing.',
            id: 'id applied to the trigger and label for, auto-generated when omitted.',
            label: 'Text label rendered above the field.',
            placeholder: 'Placeholder shown on the trigger while no color is selected.',
            presets:
              'Preset swatches shown at the bottom of the popover; pass an empty array to hide them.',
            readonly: 'Renders the field read-only, keeping the popover from opening.',
            required: 'Marks the field as required.',
            showAlpha: 'Shows the alpha slider and includes alpha in the emitted value.',
            clearable: 'Whether to show the clear button when a value is set.',
            size: 'Visual size of the picker trigger.',
            value: 'Current color string, two-way bindable via [(value)].',
            changed: 'Fires with the new color string whenever the selection changes.',
            cycleInputMode:
              'Cycles the popover input row between hex string and RGB channels.',
            hasEyeDropper: 'Returns whether the browser supports the EyeDropper API.',
            onHexInput:
              'Applies the typed hex text to the current color as the user edits it.',
            onPopoverCloseRequested:
              'Closes the popover when the user clicks outside the picker.',
          },
          divider: {
            label: 'Optional centred label rendered within the divider rule.',
            orientation: 'Orientation the divider rule runs in.',
            thick: 'Renders a heavier rule.',
          },
          'eagami-wordmark': {
            variant:
              'Content variant: default is the bare wordmark, byline adds the handcrafted-by line, tagline adds the tagline.',
            layout:
              'Arranges the wordmark stacked across lines or inline on a single line.',
            size: 'Pixel value the entire wordmark scales from.',
          },
          'empty-state': {
            title: 'Heading text shown above the description.',
            description: 'Supporting text shown below the title.',
            size: 'Visual size of the empty-state block.',
            headingLevel:
              'Heading level used for the title so it fits the surrounding document outline.',
            bordered: 'Renders a dashed frame around the block.',
            icon: 'Optional icon component rendered in the media area above the title.',
          },
          paginator: {
            groupThousands: 'Groups thousands with commas in the range and page numbers.',
            size: 'Visual size of the paginator and its controls.',
            align:
              'Horizontal alignment of the paginator controls within their container.',
            disabled: 'Disables all paginator controls.',
            page: 'Current page number, two-way bindable via [(page)].',
            pageSize:
              'Number of items shown per page, two-way bindable via [(pageSize)].',
            pageSizeOptions: 'Selectable page sizes offered in the page-size selector.',
            showPageSizeSelector: 'Shows the page-size selector control.',
            showRangeLabel: 'Shows the label describing the visible item range.',
            totalItems: 'Total number of items used to compute the page count.',
            changed:
              'Fires when the user changes either the current page or the page size.',
            goToPage: 'Navigates to the given page, clamped into the valid range.',
            nextPage: 'Navigates to the next page if one exists.',
            prevPage: 'Navigates to the previous page if one exists.',
          },
          'progress-bar': {
            variant: 'Color variant of the bar.',
            size: 'Visual thickness of the bar.',
            value: 'Current progress value.',
            max: 'Value the bar is full at.',
            buffer: 'Buffered position ahead of the value, shown in the secondary color.',
            showPercentage: 'Shows the current percentage alongside the bar.',
            indeterminate:
              'Renders a looping animation for progress of unknown duration.',
            label: 'Text label rendered above the bar.',
          },
          radio: {
            disabled: 'Disables this option.',
            id: 'id applied to the native radio input and label for, auto-generated when omitted.',
            label: 'Text label rendered beside the radio.',
            value: 'Value this option contributes to its parent group when selected.',
          },
          'range-slider': {
            ariaLabelHigh:
              'Accessible label for the high (end) thumb, falling back to the field label when omitted.',
            ariaLabelLow:
              'Accessible label for the low (start) thumb, falling back to the field label when omitted.',
            disabled: 'Disables the slider.',
            errorMsg:
              'Error message shown below the slider, replacing the hint and flagging the field invalid.',
            formatValue: 'Formatter applied to each value before it is displayed.',
            hint: 'Helper text shown below the slider, hidden while an error is showing.',
            id: 'id applied to the slider, auto-generated when omitted.',
            label: 'Text label rendered above the slider.',
            max: 'Highest value either thumb can reach.',
            min: 'Lowest value either thumb can reach.',
            required: 'Marks the field as required.',
            showMinMaxLabels: 'Shows the min and max bounds at the ends of the track.',
            showValue: 'Shows the current low and high values alongside the slider.',
            size: 'Visual size of the track and thumbs.',
            step: 'Increment each thumb snaps to when moved.',
            value: 'Current [low, high] range tuple, two-way bindable via [(value)].',
            changed: 'Fires with the new [low, high] tuple whenever either thumb moves.',
            commitThumb:
              'Snaps a thumb to the nearest step, clamps it to the bounds, and constrains it by the opposite thumb.',
            groupThousands:
              'Groups displayed values with thousands separators, ignored when a custom formatValue is provided.',
            formatDisplay:
              'Formats a value for display, applying thousand grouping unless a custom formatValue function is set.',
          },
          rating: {
            allowHalf:
              'Allows half-star granularity, letting the value move in 0.5 increments.',
            clearable: 'Clicking the current value clears the rating back to 0.',
            disabled: 'Disables the rating.',
            errorMsg:
              'Error message shown below the rating, replacing the hint and flagging it invalid.',
            halfIconClass:
              'Standalone component class rendered for half positions when allowHalf is true.',
            hint: 'Helper text shown below the rating, hidden while an error is showing.',
            iconClass:
              'Standalone component class rendered for empty and full positions.',
            id: 'id applied to the rating and its label, auto-generated when omitted.',
            label: 'Text label rendered above the rating.',
            max: 'Highest rating value and the number of stars rendered.',
            min: 'Lowest rating value the user can select.',
            readonly:
              'Renders the rating as display-only, ignoring clicks and keyboard input.',
            required: 'Marks the rating as required.',
            size: 'Visual size of the rating.',
            value: 'Current rating value, two-way bindable via [(value)].',
            hoverChanged:
              'Fires with the previewed value while hovering, and null when the cursor leaves.',
            iconForState:
              'Returns the component class to instantiate for a given star state.',
            stateFor:
              'Resolves the render state (empty, half, or full) for a star position.',
          },
          skeleton: {
            animated:
              'Plays the pulsing shimmer animation, automatically suppressed when the user prefers reduced motion.',
            height:
              "Explicit CSS height applied to the placeholder, defaulting to the shape's intrinsic size when omitted.",
            variant: 'Shape preset of the placeholder: text line, circle, or rectangle.',
            width:
              "Explicit CSS width applied to the placeholder, defaulting to the shape's intrinsic size when omitted.",
          },
          slider: {
            ariaLabel: 'Accessible label applied when no visible label is rendered.',
            disabled: 'Disables the slider.',
            errorMsg:
              'Error message shown below the slider, replacing the hint and flagging the field invalid.',
            formatValue:
              'Formatter that turns the numeric value into the displayed text.',
            hasError: 'Forces the error-state styling without binding an error message.',
            hint: 'Helper text shown below the slider, hidden while an error is showing.',
            id: 'id applied to the slider and its label, auto-generated when omitted.',
            label: 'Text label rendered above the slider.',
            max: 'Highest value the slider can reach.',
            min: 'Lowest value the slider can reach.',
            required: 'Marks the slider as required.',
            showMinMaxLabels: 'Shows the min and max bounds beneath the track.',
            showValue: 'Shows the current value alongside the label.',
            size: 'Visual size of the slider track and thumb.',
            step: 'Increment the value snaps to as the slider moves.',
            value: 'Current slider value, two-way bindable via [(value)].',
            changed: 'Fires with the new snapped value whenever the slider moves.',
            groupThousands:
              'Groups displayed values with thousands separators, ignored when a custom formatValue is provided.',
            formatDisplay:
              'Formats a value for display, applying thousand grouping unless a custom formatValue function is set.',
          },
          spinner: {
            label:
              "Accessible label announced to assistive technology, falling back to the active locale's translation when unset.",
            size: 'Visual size of the spinner.',
          },
          switch: {
            ariaLabel:
              'Accessible label for the switch when no visible label is rendered.',
            checked: 'Current on/off state, two-way bindable via [(checked)].',
            disabled: 'Disables the switch and blocks toggling.',
            errorMsg:
              'Error message shown below the switch, replacing the hint and flagging the field invalid.',
            hint: 'Helper text shown below the switch, hidden while an error is showing.',
            id: 'id applied to the underlying checkbox and label for, auto-generated when omitted.',
            label: 'Text label rendered beside the switch.',
            required: 'Marks the switch as required.',
            size: 'Visual size of the switch.',
            changed:
              'Fires with the new checked state whenever the user toggles the switch.',
          },
          tag: {
            variant: 'Semantic colour scheme of the tag.',
            size: 'Visual size of the tag.',
            removable: 'Renders a remove button that emits removed when activated.',
            disabled: 'Disables the tag and its remove button.',
            removeLabel:
              'Accessible label for the remove button, falling back to the active locale.',
            removed:
              'Fires when the user activates the remove button on a removable tag.',
          },
          textarea: {
            disabled: 'Disables the field.',
            errorMsg:
              'Error message shown below the field, replacing the hint and flagging the field invalid.',
            hint: 'Helper text shown below the field, hidden while an error is showing.',
            id: 'id applied to the native textarea and label for, auto-generated when omitted.',
            label: 'Text label rendered above the field.',
            maxHeight:
              "Pixel ceiling for the field's height; beyond it the textarea scrolls vertically instead of growing.",
            minHeight: 'Minimum height in px; never less than the default height.',
            maxlength: 'Maximum number of characters the field accepts.',
            placeholder: 'Placeholder shown while the field is empty.',
            readonly: 'Renders the field read-only.',
            required: 'Marks the field as required.',
            resize: 'Axis along which the user may resize the field.',
            size: 'Visual size of the field.',
            value: 'Current field value, two-way bindable via [(value)].',
            blurred: 'Fires when the field loses focus.',
            focused: 'Fires when the field receives focus.',
            focus: 'Moves keyboard focus to the underlying native textarea.',
          },
          'avatar-editor': {
            accept:
              'Accepted MIME types for the file picker, forwarded to the native input.',
            canvasSize: 'Pixel width and height of the square crop canvas.',
            cropState: 'Initial pan/zoom state to restore when a source image is loaded.',
            currentSrc: 'URL of the image to load into the editor on initialisation.',
            exportQuality:
              'JPEG/WebP quality used when exporting the cropped image, between 0 and 1.',
            exportType:
              'MIME type of the exported image blob (e.g. image/png or image/jpeg).',
            loading: 'Shows a skeleton overlay while an external resource is loading.',
            maxFileSize:
              'Maximum allowed file size in bytes; files above this limit emit errored.',
            maxZoom: 'Maximum zoom multiplier the user can reach.',
            minZoom: 'Minimum zoom multiplier the user can reach.',
            shape: 'Crop mask shape applied to the canvas and exported image.',
            cropped:
              'Fires when the user exports a crop, providing both a Blob and a data URL.',
            cropStateChanged:
              'Fires whenever the user pans or zooms the image, useful for persisting the edit state.',
            errored: 'Fires with a human-readable message when file validation fails.',
            fileSelected:
              'Fires when a file is chosen from disk or dropped onto the editor.',
            removed: 'Fires when the current image is cleared via the remove control.',
            captureOriginal:
              'Marks the current image and crop state as the baseline for revertImage.',
            exportCrop:
              'Renders the current crop to an offscreen canvas, emits cropped, and resolves with the Blob.',
            openFilePicker: 'Opens the native file picker dialog.',
            removeImage: 'Clears the loaded image and resets pan and zoom to defaults.',
            revertImage:
              'Restores the image and crop state captured by the most recent captureOriginal call.',
            setZoom:
              'Sets the zoom level, clamped to the configured minZoom and maxZoom range.',
            updateImageDarkness:
              'Samples the visible crop region to determine whether the image is darker than mid-grey.',
          },
          'menu-trigger': {
            menu: 'The ea-menu instance this trigger controls.',
          },
          tooltip: {
            maxWidth:
              'Maximum width in pixels; the text wraps at this width (50px floor).',
            eaTooltip:
              'Tooltip content shown on hover and keyboard focus. Accepts a plain string or a TemplateRef for styled content.',
            tooltipPosition: 'Placement of the tooltip relative to its host element.',
          },
          'time-picker': {
            disabled: 'Disables the picker.',
            errorMsg:
              'Error message shown below the field, replacing the hint and flagging the field invalid.',
            format:
              'Display format of the trigger label; the wire value is always 24-hour.',
            hint: 'Helper text shown below the field, hidden while an error is showing.',
            id: 'id applied to the trigger and label for, auto-generated when omitted.',
            includeSeconds: 'Shows a seconds column alongside hours and minutes.',
            label: 'Text label rendered above the field.',
            minuteStep: 'Increment the minutes column snaps to when stepped or dragged.',
            placeholder: 'Placeholder shown on the trigger while no time is selected.',
            readonly: 'Renders the field read-only, keeping the popover from opening.',
            required: 'Marks the field as required.',
            secondStep: 'Increment the seconds column snaps to when stepped or dragged.',
            size: 'Visual size of the picker trigger.',
            value:
              'Current time string in HH:MM or HH:MM:SS (24-hour), two-way bindable via [(value)], or null when unset.',
            changed:
              'Fires with the new time string whenever the user changes the selected time.',
            advanceFocus:
              'Moves focus to the next unit column after a digit entry is complete.',
            cannotExtend:
              'Returns true when no additional digit can validly extend the current buffer for the given unit.',
            commitDigits:
              "Parses the buffered digit string, clamps it to the unit's valid range, and writes it to the value.",
            flushBuffer: 'Commits any pending typed-digit buffer and clears it.',
            focusHoursWhenReady:
              'Focuses the hours input once the popover surface has been rendered to the DOM.',
            hoursFromTyped:
              'Converts a typed hours value to its 24-hour equivalent, accounting for the current AM/PM period.',
            onPopoverCloseRequested:
              'Closes the popover when the user clicks outside the picker.',
            onSpinnerBlur:
              'Commits any pending digit buffer when a spinner column loses focus.',
            onSpinnerFocus:
              'Selects all text in a spinner column when it receives focus so the first keystroke replaces it.',
            onSpinnerInput:
              'Handles digit input in a spinner column, updates the buffer, and auto-advances focus when the column is full.',
            startHold:
              'Begins a long-press repeat on a chevron button, stepping the given unit and accelerating after a delay.',
            step: 'Steps the given unit column up or down by one configured increment.',
            stopHold: 'Cancels any in-flight long-press repeat timers.',
            togglePeriod:
              'Switches the AM/PM period in 12-hour mode by toggling the 12-hour offset.',
          },
          autocomplete: {
            disabled: 'Disables the field.',
            emptyMessage:
              "Message shown in the list when no options match the current input, falling back to the active locale's translation when omitted.",
            errorMsg:
              'Error message shown below the field, replacing the hint and flagging the field invalid.',
            hint: 'Helper text shown below the field, hidden while an error is showing.',
            id: 'id applied to the native input and label for, auto-generated when omitted.',
            label: 'Text label rendered above the field.',
            maxResults: 'Maximum number of options shown in the suggestion list at once.',
            minLength:
              'Minimum number of characters required before the suggestion list appears.',
            options: 'Full list of options available for filtering and selection.',
            placeholder: 'Placeholder shown while the field is empty.',
            readonly: 'Renders the field read-only.',
            required: 'Marks the field as required.',
            size: 'Visual size of the field.',
            value: 'Current field value, two-way bindable via [(value)].',
            blurred: 'Fires when the input loses focus.',
            changed:
              'Fires whenever the input text changes, including on free-text edits.',
            focused: 'Fires when the input receives focus.',
            selected: 'Fires when the user picks an option from the suggestion list.',
            close: 'Closes the suggestion list without changing the current value.',
            focus: 'Moves keyboard focus to the underlying text input.',
            selectOption:
              'Programmatically selects the given option, updating the value and closing the list.',
          },
          'command-palette': {
            emptyMessage:
              "Message shown when the search query matches no items, falling back to the active locale's translation when omitted.",
            items: 'Full list of command items available for search and execution.',
            open: 'Whether the palette dialog is open, two-way bindable via [(open)].',
            placeholder: 'Placeholder shown inside the search input while it is empty.',
            execute: 'Fires when the user selects a command, emitting the chosen item.',
            showActiveHighlight:
              'Returns whether the active row should render its highlighted background for the given flat index.',
          },
          tabs: {
            activeTab:
              'Value of the currently active tab, two-way bindable via [(activeTab)].',
            size: 'Visual size of the tabs.',
            variant: 'Visual style of the tab bar: underline or filled.',
            changed:
              'Fires with the value of the newly active tab whenever the active tab changes.',
            registerTab:
              'Registers a child tab so it appears in the tab bar; called automatically by ea-tab.',
            selectTab: 'Programmatically activates the tab with the given value.',
            unregisterTab:
              'Removes a previously registered child tab; called automatically by ea-tab.',
          },
          tab: {
            disabled: 'Disables this tab, preventing the user from selecting it.',
            id: 'id applied to the tab button and its panel, auto-generated when omitted.',
            label: 'Text label shown on the tab button.',
            value:
              'Unique value that identifies this tab within its parent ea-tabs group.',
          },
          'date-picker': {
            disabled: 'Disables the date picker.',
            errorMsg:
              'Error message shown below the field, replacing the hint and flagging the field invalid.',
            format: 'Display format of the selected date (short, medium, or long).',
            hint: 'Helper text shown below the field, hidden while an error is showing.',
            id: 'id applied to the trigger and label for, auto-generated when omitted.',
            label: 'Text label rendered above the field.',
            locale:
              'BCP 47 locale tag used for date formatting, falling back to the global locale when omitted.',
            maxDate:
              'Latest date the user can select; dates after this are disabled in the calendar.',
            minDate:
              'Earliest date the user can select; dates before this are disabled in the calendar.',
            placeholder: 'Placeholder shown on the trigger while no date is selected.',
            readonly: 'Renders the field read-only, keeping the calendar from opening.',
            required: 'Marks the field as required.',
            size: 'Visual size of the date picker trigger.',
            value: 'Current selected date, two-way bindable via [(value)].',
            weekStartsOn:
              'First day of the week in the calendar grid (0 for Sunday, 1 for Monday).',
            changed: 'Fires when the selected date changes, including when cleared.',
            clear: 'Clears the selected date and emits changed with null.',
            close: 'Closes the calendar popover.',
            focus: 'Moves keyboard focus to the trigger button.',
            onPopoverCloseRequested:
              'Closes the popover when the user clicks outside the date picker.',
            open: 'Opens the calendar popover and moves focus to the focused day cell.',
            toggle: 'Toggles the calendar popover between open and closed.',
          },
          menu: {
            size: 'Visual size of the menu; every item inherits it.',
            maxHeight:
              'Maximum height of the scrollable list as a CSS length; taller menus scroll past it.',
            ariaLabel:
              'Accessible label for the menu list, falling back to the active locale when omitted.',
            disabled: 'Disables the menu, preventing it from opening.',
            id: 'id applied to the menu list element, auto-generated when omitted.',
            open: 'Whether the menu is open, two-way bindable via [(open)].',
            placement: 'Placement of the menu list relative to its trigger element.',
            closed: 'Fires when the menu closes.',
            opened: 'Fires when the menu opens.',
            close:
              'Closes the menu and optionally restores focus to the trigger element.',
            focusFirstItem: 'Moves keyboard focus to the first enabled item in the menu.',
            onPopoverCloseRequested: 'Closes the menu when the user clicks outside it.',
            openAt:
              'Opens the menu anchored to the given trigger element and focuses the first item.',
            toggleAt:
              'Toggles the menu open state, anchoring it to the given trigger element.',
          },
          'menu-item': {
            disabled: 'Disables the item and suppresses click events.',
            variant: 'Visual style of the item; use danger for destructive actions.',
            clicked:
              'Fires when the item is activated; the parent menu closes immediately afterwards.',
          },
          'multi-select': {
            disabled: 'Disables the multi-select.',
            errorMsg:
              'Error message shown below the field, replacing the hint and flagging the field invalid.',
            hint: 'Helper text shown below the field, hidden while an error is showing.',
            id: 'id applied to the trigger and label for, auto-generated when omitted.',
            label: 'Text label rendered above the field.',
            maxVisibleChips:
              'Maximum number of chips shown in the trigger before the rest collapse into a count pill.',
            options: 'List of selectable options rendered in the dropdown list.',
            placeholder: 'Placeholder shown on the trigger while no option is selected.',
            readonly: 'Renders the field read-only.',
            required: 'Marks the field as required.',
            searchable: 'Shows the search input at the top of the popover.',
            searchPlaceholder:
              'Placeholder shown inside the search input when the search term is empty.',
            selectAll:
              'Shows the tri-state select-all row at the top of the option list.',
            size: 'Visual size of the multi-select trigger.',
            value: 'Selected option values, two-way bindable via [(value)].',
            changed: 'Fires with the new value whenever the selection changes.',
            clear: 'Clears every selection and stops the event from propagating.',
            handlePopoverKeydown:
              'Handles keyboard navigation inside the open popover, routing arrow keys, Enter, Space, and Escape.',
            onPopoverCloseRequested:
              'Called by the popover when the user clicks outside or scrolls; closes the panel and marks the field touched.',
            orderedValues:
              'Returns the given value set reordered to match the input options array.',
            removeChip: 'Removes the given option from the current selection.',
            toggleOption:
              "Toggles the given option's membership in the current selection.",
            toggleSelectAll:
              'Selects all filtered options if any are unselected, or deselects all filtered options if all are selected.',
          },
          dropdown: {
            disabled: 'Disables the dropdown.',
            errorMsg:
              'Error message shown below the field, replacing the hint and flagging the field invalid.',
            hint: 'Helper text shown below the field, hidden while an error is showing.',
            id: 'id applied to the trigger and label for, auto-generated when omitted.',
            label: 'Text label rendered above the field.',
            options: 'List of selectable options rendered in the dropdown list.',
            placeholder: 'Placeholder shown on the trigger while no option is selected.',
            readonly: 'Renders the field read-only.',
            required: 'Marks the field as required.',
            size: 'Visual size of the dropdown trigger.',
            value: 'Current selected value, two-way bindable via [(value)].',
            changed: 'Fires with the new value when the user selects an option.',
            close: 'Closes the dropdown list without changing the current value.',
            focus: 'Moves keyboard focus to the dropdown trigger.',
            onPopoverCloseRequested:
              'Called by the popover when the user clicks outside the dropdown; closes the panel and marks the field touched.',
            select: 'Programmatically selects the given option and closes the list.',
            toggle: 'Toggles the dropdown list between open and closed.',
          },
          'file-uploader': {
            accept:
              "Comma-separated MIME types and file extensions the dropzone accepts, e.g. 'image/*,.pdf'.",
            disabled: 'Disables the uploader.',
            errorMsg:
              'Error message shown below the field, replacing the hint and flagging the field invalid.',
            hint: 'Helper text shown below the field, hidden while an error is showing.',
            id: 'id applied to the dropzone and label for, auto-generated when omitted.',
            label: 'Text label rendered above the field.',
            maxFiles:
              'Maximum total number of files; files beyond the limit are rejected.',
            maxSize: 'Maximum size per file in bytes; larger files are rejected.',
            multiple: 'Allows selecting more than one file at a time.',
            progress:
              'Per-file upload progress map (0-100) keyed by File identity; omit to hide progress bars.',
            required: 'Marks the field as required.',
            showFileList: 'Shows the list of selected files below the dropzone.',
            size: 'Visual size of the uploader.',
            value: 'Current file list, two-way bindable via [(value)].',
            fileRemoved: "Fires when a file is removed via its row's remove button.",
            rejected:
              'Fires when one or more files fail validation, with the reason for each rejection.',
            trackFile:
              'Returns a stable track key for a file, used internally by the file list.',
          },
          'form-field': {
            size: 'Visual size of the field; the label, control text, spacing, and messages scale with it.',
            errorMsg:
              'Error message shown below the control, replacing the hint and flagging the field invalid.',
            hint: 'Helper text shown below the control, hidden while an error is showing.',
            id: 'id seed for the label and message wiring, auto-generated when omitted.',
            label: 'Text label rendered above the control.',
            required: 'Marks the field as required.',
          },
          popover: {
            anchor: 'Host element or ElementRef the popover positions itself against.',
            ariaLabel:
              'Accessible label for the popover surface; provide one when the popover contains no visible heading.',
            ariaLabelledby:
              'Id of the element that labels the popover surface, forwarded as aria-labelledby.',
            clamp:
              'Clamps the popover inside the viewport when it would otherwise overflow.',
            closeOnEscape: 'Closes the popover when Escape is pressed.',
            closeOnOutsideClick:
              'Closes the popover when the user clicks outside both the popover and its anchor.',
            flip: 'Flips to the opposite side when the requested placement overflows the viewport.',
            matchAnchorWidth: "Sets the popover's min-width to match the anchor's width.",
            offset: 'Gap in px between the anchor and the popover surface.',
            open: 'Whether the popover is currently open.',
            placement: 'Preferred position of the popover relative to its anchor.',
            role: 'ARIA role applied to the popover surface.',
            scrollBehavior:
              'How the popover responds to scroll and resize events while open: reposition, close, or ignore.',
            surfaceId:
              'DOM id for the popover surface, used by trigger elements via aria-controls.',
            trapFocus:
              'Keeps Tab and Shift+Tab cycling inside the surface while open, for dialog-style popovers.',
            closeRequested:
              'Fires when the popover requests to be closed; the parent should mirror this into [open].',
          },
          'accordion-item': {
            disabled: 'Disables this item, preventing it from being toggled.',
            id: "id applied to the item's header button and panel, auto-generated when omitted.",
            label: "Text shown in the item's header button.",
            value: 'Unique key that identifies this item within its parent accordion.',
          },
          breadcrumbs: {
            size: 'Visual size of the breadcrumb trail.',
            ariaLabel:
              "Accessible label for the breadcrumb nav, falling back to the active locale's translation when omitted.",
            items:
              'Array of breadcrumb entries; items with an href render as links, others as buttons, and the last is non-interactive.',
            separator: 'Visual style of the separator rendered between breadcrumb items.',
            clicked: 'Fires when a non-disabled, non-final breadcrumb is activated.',
          },
          drawer: {
            animation:
              'Slide animation as the drawer opens and closes: none (instant), linear (constant speed), or eased (an ease-out curve).',
            ariaLabel:
              'Accessible label for the drawer panel when its heading is not descriptive enough.',
            closeOnBackdrop: 'Closes the drawer when the user clicks the backdrop.',
            closeOnEscape: 'Closes the drawer when the user presses the Escape key.',
            id: 'id applied to the dialog element, auto-generated when omitted.',
            mode: 'How the drawer relates to the page: overlay floats over a dimmed, focus-trapped page, while push opens non-modally and reflows the page content aside.',
            open: 'Whether the drawer is open, two-way bindable via [(open)].',
            position: 'Edge of the viewport from which the drawer slides in.',
            pushTarget:
              'Element whose content is pushed aside in push mode, as a CSS selector or element reference; defaults to the document body.',
            showClose: 'Shows the close button in the drawer header.',
            size: 'Extent of the drawer panel along its main axis: width for side drawers, height for top and bottom drawers.',
            closed:
              'Fires when the drawer closes, whether via the close button, backdrop, or Escape.',
            opened: 'Fires once the drawer has been shown.',
          },
          'data-table': {
            size: 'Visual size of the table; density paddings and icons scale with it.',
            clickable:
              'Marks body rows as clickable: shows a pointer cursor and emits rowActivate on click or Enter/Space.',
            rowActivate:
              'Fires with the row data when a clickable body row is activated by click or keyboard.',
            navigable:
              'Turns the table into a keyboard-navigable grid with roving focus and arrow-key cell movement.',
            bordered: 'Renders a border around every cell.',
            columns:
              "Column definitions describing each field's key, label, and optional sorting or template.",
            data: 'Array of row objects to display in the table.',
            density:
              'Vertical density preset controlling the row and header cell padding.',
            hoverable: 'Highlights the row under the pointer on hover.',
            noDataText:
              "Text shown in the empty state, falling back to the active locale's translation.",
            sort: 'Current sort state (column key and direction), two-way bindable via [(sort)].',
            stickyHeader:
              'Fixes the header row to the top of the table when the content scrolls.',
            striped: 'Applies alternating background shading to odd and even rows.',
            trackBy:
              "Row property key used by Angular's change detection to identify rows efficiently.",
            sorted:
              'Fires whenever the sort column or direction changes via a header click.',
          },
          'radio-group': {
            ariaLabel:
              'Accessible label for the group when no visible label is rendered.',
            disabled: 'Disables all radio options in the group.',
            errorMsg:
              'Error message shown below the group, replacing the hint and flagging the field invalid.',
            hint: 'Helper text shown below the group, hidden while an error is showing.',
            id: 'id applied to the group element and its label for, auto-generated when omitted.',
            label: 'Text label rendered above the group.',
            name: 'Shared name attribute applied to all radio inputs in the group, auto-generated when omitted.',
            orientation: 'Layout direction of the radio options within the group.',
            required: 'Marks the group as required.',
            size: 'Visual size applied to all radio options in the group.',
            value: 'Currently selected value, two-way bindable via [(value)].',
            changed: 'Fires with the new value when the user selects an option.',
            select: 'Programmatically selects the option with the given value.',
          },
          segmented: {
            ariaLabel:
              'Accessible label for the control when no visible label is rendered.',
            disabled: 'Disables the segmented control.',
            errorMsg:
              'Error message shown below the field, replacing the hint and flagging the field invalid.',
            fullWidth: 'Stretches the control to fill the width of its container.',
            hint: 'Helper text shown below the field, hidden while an error is showing.',
            id: 'id applied to the control and label for, auto-generated when omitted.',
            label: 'Text label rendered above the control.',
            options: 'Array of options rendered as toggle buttons within the control.',
            required: 'Marks the field as required.',
            size: 'Visual size of the segmented control.',
            value: 'Currently selected option value, two-way bindable via [(value)].',
            changed: 'Fires with the new value when the user selects a different option.',
            select: 'Programmatically selects the given option.',
          },
          'tree-node': {
            collapseLabel: 'Accessible label for the collapse chevron button.',
            disabled: 'Disables interaction with the node and its descendants.',
            expandedIds: 'Set of node ids that are currently expanded.',
            expandLabel: 'Accessible label for the expand chevron button.',
            focusedId: 'Id of the node that currently holds the roving tabindex focus.',
            level:
              'Depth from the tree root (0-indexed), used for indentation and aria-level.',
            node: 'Data object describing this node, including its id, label, children, and disabled state.',
            posInSet:
              "1-indexed position among the parent node's children, used for aria-posinset.",
            selectedId:
              'Id of the currently selected node, or null when nothing is selected.',
            setSize:
              "Total number of siblings in the parent node's children list, used for aria-setsize.",
            select: 'Fires when the user clicks or activates the node row.',
            toggle:
              'Fires with the node id when the user clicks the expand or collapse chevron.',
          },
          tree: {
            ariaLabel: 'Accessible label for the tree widget.',
            disabled: 'Disables all nodes in the tree.',
            expandedIds:
              'Ids of currently expanded branch nodes, two-way bindable via [(expandedIds)].',
            nodes: 'Array of tree node data objects that defines the hierarchy.',
            selectedId:
              'Id of the currently selected node, two-way bindable via [(selectedId)].',
            size: 'Visual size of the tree, scaling text and spacing proportionally.',
            nodeClick: 'Fires with the node data when the user selects a node.',
          },
          step: {
            completed: 'Marks the step as completed, updating its visual indicator.',
            disabled: 'Prevents the step from being activated.',
            id: 'id applied to the step panel and its tab, auto-generated when omitted.',
            label: 'Text label shown in the step indicator.',
            optional: 'Marks the step as optional, shown as a hint below the step label.',
          },
          stepper: {
            activeStep:
              'Zero-based index of the currently active step, two-way bindable via [(activeStep)].',
            disabled: 'Disables the entire stepper and all step navigation.',
            id: 'id applied to the stepper host element, auto-generated when omitted.',
            linear:
              'Requires each non-optional step to be marked completed before the user can advance.',
            size: 'Visual size of the stepper, scaling the step indicators and labels together.',
            changed:
              'Fires with the new active step index when the user navigates to a different step.',
            canNavigateTo:
              'Returns whether the step at the given index is reachable from the current state.',
            indexOf:
              'Returns the index of the given step, or -1 if it is not registered.',
            selectStep: 'Activate the step at the given index if it is reachable.',
          },
          'transfer-list': {
            disabled: 'Disables the entire transfer list and all move controls.',
            items: 'Full pool of items available across both panes, identified by id.',
            selectedIds:
              'Ids of the items currently on the target (right) side, two-way bindable via [(selectedIds)].',
            size: 'Visual size of the transfer list.',
            sourceLabel:
              "Heading rendered above the source (left) pane, falling back to the active locale's default.",
            targetLabel:
              "Heading rendered above the target (right) pane, falling back to the active locale's default.",
          },
          'virtual-list': {
            itemHeight:
              'Pixel height of each row; all rows must share the same fixed height.',
            items:
              'Full array of data items to render; only the visible slice is mounted at any time.',
            overscan:
              'Number of extra rows rendered above and below the visible window to reduce blank edges during fast scrolling.',
            viewportHeight: 'Pixel height of the scrolling viewport.',
            scrollIndexChange:
              'Fires with the index of the first row visible at the top of the viewport whenever the user scrolls.',
            scrollToIndex:
              'Scrolls the viewport so the row at the given index appears at the top, clamped to the list bounds.',
          },
          'field-label': {
            forId:
              'id of the associated control; renders a <label for> when set, otherwise a <span>.',
            labelId:
              'id applied to the rendered label element so controls can reference it via aria-labelledby.',
            required: 'Shows a required indicator on the label.',
            text: 'Label text rendered inside the label element.',
          },
          'field-messages': {
            error:
              'Error message to display; when set, the hint is hidden and the message is announced as an alert.',
            hint: 'Helper text shown below the field when no error is present.',
            id: 'Base id used to derive the aria ids for the error and hint elements.',
          },
          dialog: {
            ariaLabel:
              'Accessible label for the dialog when its header slot does not contain a visible title.',
            closeOnBackdrop:
              'Closes the dialog when the user clicks the backdrop area outside the panel.',
            closeOnEscape: 'Closes the dialog when the user presses Escape.',
            id: 'id applied to the native dialog element, auto-generated when omitted.',
            open: 'Whether the dialog is shown, two-way bindable via [(open)].',
            showClose: 'Shows the close button in the dialog header.',
            width: 'Width preset for the dialog panel.',
            closed:
              'Fires when the dialog closes, regardless of whether it was closed by the user or programmatically.',
            opened: 'Fires once the dialog has been shown via showModal().',
          },
        },
      },
      sharedOptions: {
        fruitOptions: [
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana' },
          { value: 'cherry', label: 'Cherry' },
          { value: 'date', label: 'Date' },
        ],
        viewOptions: [
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
        ],
        themeOptions: [
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ],
        monthOptions: [
          { value: 'jan', label: 'January' },
          { value: 'feb', label: 'February' },
          { value: 'mar', label: 'March' },
          { value: 'apr', label: 'April' },
          { value: 'may', label: 'May' },
          { value: 'jun', label: 'June' },
          { value: 'jul', label: 'July' },
          { value: 'aug', label: 'August' },
          { value: 'sep', label: 'September' },
          { value: 'oct', label: 'October' },
          { value: 'nov', label: 'November' },
          { value: 'dec', label: 'December' },
        ],
        breadcrumbHome: 'Home',
        breadcrumbProducts: 'Products',
        breadcrumbLaptops: 'Laptops',
        breadcrumbMacBookPro: 'MacBook Pro',
        breadcrumbDashboard: 'Dashboard',
        breadcrumbSettings: 'Settings',
      },
    },
  },
};

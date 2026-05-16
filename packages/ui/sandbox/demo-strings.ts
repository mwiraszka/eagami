// =============================================================================
// SANDBOX — Demo strings
// =============================================================================
//
// All user-visible demo text in the sandbox lives here so the sandbox follows
// the active EagamiI18nService locale alongside the library's own built-in
// strings. This file is sandbox-local and never ships with @eagami/ui.
//
// Component section headers (e.g. "Alert", "Button") stay English by design
// — they identify the component being demoed and aren't part of the demo
// content itself.
import type { BreadcrumbItem, EagamiLocale, SelectOption } from '@eagami/ui';

export interface DemoStrings {
  header: {
    uiSandbox: string;
    darkMode: string;
  };
  sidebar: {
    sandboxMode: string;
    components: string;
    icons: string;
    selectAll: string;
  };
  section: {
    basic: string;
    variants: string;
    sizes: string;
    states: string;
    disabled: string;
    required: string;
    horizontal: string;
    vertical: string;
    single: string;
    multi: string;
    error: string;
    status: string;
    password: string;
    autocomplete: string;
    chevronSeparator: string;
    slashSeparator: string;
    twoLevels: string;
    withFooter: string;
    shapesAndFallbacks: string;
    circle: string;
    square: string;
    circleWithImage: string;
    squareWithImage: string;
    fourDigitPin: string;
    stripedAndBordered: string;
    compactDensity: string;
    stickyHeader: string;
    withPaginator: string;
    emptyState: string;
    noResults: string;
    titleOnly: string;
    formatVariants: string;
    minAndMax: string;
    minLengthAndMaxResults: string;
    hintAndError: string;
    withHint: string;
    withError: string;
    withLabel: string;
    requiredWithHint: string;
    positions: string;
    inlineLayout: string;
    alignLeft: string;
    alignCenter: string;
    manyPages: string;
    minimal: string;
    withDisabledTab: string;
    withIcons: string;
    iconTrigger: string;
    withDisabledItem: string;
    twoOptions: string;
    fullWidth: string;
    removable: string;
    noResize: string;
    disabledAndReadonly: string;
    minMaxLabels: string;
    indeterminate: string;
    rect: string;
    trigger: string;
    underline: string;
    filled: string;
  };
  common: {
    small: string;
    medium: string;
    large: string;
    cancel: string;
    save: string;
    confirm: string;
    close: string;
    default: string;
    success: string;
    warning: string;
    info: string;
    result: string;
  };
  accordion: {
    whatQ: string;
    whatA: string;
    installQ: string;
    installA: string;
    themeQ: string;
    themeA: string;
    sectionOne: string;
    sectionOneBody: string;
    sectionTwo: string;
    sectionTwoBody: string;
    disabledSection: string;
    disabledSectionBody: string;
  };
  alert: {
    defaultMsg: string;
    successMsg: string;
    warningMsg: string;
    errorMsg: string;
    infoMsg: string;
    dismissibleMsg: string;
  };
  autocomplete: {
    frameworkLabel: string;
    startTyping: string;
    withHintLabel: string;
    hint: string;
    withErrorLabel: string;
    errorMsg: string;
    frameworkPlaceholder: string;
    minMaxLabel: string;
    minMaxPlaceholder: string;
    disabledLabel: string;
    options: SelectOption[];
  };
  avatar: {
    userPhotoAlt: string;
  };
  badge: {
    active: string;
    pending: string;
    failed: string;
    newItem: string;
  };
  breadcrumbs: {
    items: BreadcrumbItem[];
    itemsShort: BreadcrumbItem[];
  };
  button: {
    primary: string;
    secondary: string;
    ghost: string;
    danger: string;
    toggleLoading: string;
    disabled: string;
    fullWidth: string;
  };
  card: {
    elevatedTitle: string;
    elevatedBody: string;
    outlinedTitle: string;
    outlinedBody: string;
    filledTitle: string;
    filledBody: string;
    footerTitle: string;
    footerBody: string;
  };
  checkbox: {
    acceptTerms: string;
    disabledLabel: string;
    disabledChecked: string;
    indeterminate: string;
    iAgree: string;
    subscribe: string;
    subscribeHint: string;
    errorLabel: string;
    errorMsg: string;
  };
  codeInput: {
    label: string;
    hint: string;
    errorMsg: string;
    pinLabel: string;
    pinHint: string;
  };
  dataTable: {
    columnId: string;
    columnFirstName: string;
    columnLastName: string;
    columnAdmin: string;
    columnPosts: string;
  };
  datePicker: {
    appointmentLabel: string;
    placeholder: string;
    hint: string;
    errorMsg: string;
    minMaxLabel: string;
    minMaxHint: string;
    short: string;
    longLabel: string;
  };
  dialog: {
    open: string;
    title: string;
    body: string;
    confirm: string;
  };
  drawer: {
    right: string;
    left: string;
    top: string;
    bottom: string;
    rightTitle: string;
    rightBody: string;
    leftTitle: string;
    leftBody: string;
    topTitle: string;
    topBody: string;
    bottomTitle: string;
    bottomBody: string;
  };
  dropdown: {
    fruitLabel: string;
    placeholder: string;
    hint: string;
    errorMsg: string;
    options: SelectOption[];
  };
  emptyState: {
    noItemsTitle: string;
    noItemsDesc: string;
    createItem: string;
    noResultsTitle: string;
    noResultsDesc: string;
    clearFilters: string;
    nothingHere: string;
  };
  input: {
    defaultLabel: string;
    placeholder: string;
    successLabel: string;
    successPlaceholder: string;
    readonlyLabel: string;
    readonlyValue: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    passwordToggleHidden: string;
    passwordNoToggle: string;
    emailLabel: string;
  };
  menu: {
    actions: string;
    edit: string;
    duplicate: string;
    archive: string;
    deleteAction: string;
    file: string;
    moreOptions: string;
    view: string;
    rename: string;
    newItem: string;
    open: string;
    saveUnavailable: string;
    saveAs: string;
  };
  progressBar: {
    processing: string;
  };
  radio: {
    fruitOptions: { value: string; label: string }[];
    optionA: string;
    optionB: string;
    planLabel: string;
    free: string;
    pro: string;
    enterprise: string;
    deliveryLabel: string;
    deliveryHint: string;
    standard: string;
    express: string;
    accountTypeLabel: string;
    accountTypeError: string;
    personal: string;
    business: string;
  };
  segmented: {
    viewLabel: string;
    themeLabel: string;
    layoutLabel: string;
    themeHint: string;
    layoutError: string;
    viewOptions: SelectOption[];
    themeOptions: SelectOption[];
  };
  slider: {
    volume: string;
    brightness: string;
    withHintMsg: string;
    withErrorMsg: string;
  };
  switch: {
    notifications: string;
    disabledOn: string;
    consent: string;
    marketing: string;
    marketingHint: string;
    twoFactor: string;
    twoFactorError: string;
  };
  tabs: {
    account: string;
    accountBody: string;
    security: string;
    securityBody: string;
    notifications: string;
    notificationsBody: string;
    overview: string;
    overviewBody: string;
    analytics: string;
    analyticsBody: string;
    reports: string;
    reportsBody: string;
    general: string;
    generalBody: string;
    billing: string;
    billingBody: string;
    admin: string;
    adminBody: string;
  };
  tag: {
    default: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    disabled: string;
    disabledSuccess: string;
  };
  textarea: {
    messageLabel: string;
    messagePlaceholder: string;
    hint: string;
    errorMsg: string;
    fixedSizeLabel: string;
    fixedSizePlaceholder: string;
    readonlyLabel: string;
    readonlyValue: string;
  };
  toast: {
    defaultMsg: string;
    successMsg: string;
    warningMsg: string;
    errorMsg: string;
    infoMsg: string;
    avatarUpdated: string;
    copied: (selector: string) => string;
    copyFailed: (selector: string) => string;
  };
  tooltip: {
    touchAlert: string;
    top: string;
    bottom: string;
    left: string;
    right: string;
    topMsg: string;
    bottomMsg: string;
    leftMsg: string;
    rightMsg: string;
  };
}

// ─── English ─────────────────────────────────────────────────────────────────
const en: DemoStrings = {
  header: { uiSandbox: 'UI Sandbox', darkMode: 'Dark mode' },
  sidebar: {
    sandboxMode: 'Sandbox mode',
    components: 'Components',
    icons: 'Icons',
    selectAll: 'Select all',
  },
  section: {
    basic: 'basic',
    variants: 'variants',
    sizes: 'sizes',
    states: 'states',
    disabled: 'disabled',
    required: 'required',
    horizontal: 'horizontal',
    vertical: 'vertical',
    single: 'single',
    multi: 'multi',
    error: 'error',
    status: 'status',
    password: 'password',
    autocomplete: 'autocomplete',
    chevronSeparator: 'chevron separator',
    slashSeparator: 'slash separator',
    twoLevels: 'two levels',
    withFooter: 'with footer',
    shapesAndFallbacks: 'shapes and fallbacks',
    circle: 'circle',
    square: 'square',
    circleWithImage: 'circle with existing image and crop state',
    squareWithImage: 'square with existing image and crop state',
    fourDigitPin: '4-digit PIN',
    stripedAndBordered: 'striped and bordered',
    compactDensity: 'compact density',
    stickyHeader: 'sticky header',
    withPaginator: 'with paginator',
    emptyState: 'empty state',
    noResults: 'no results',
    titleOnly: 'title only',
    formatVariants: 'format variants',
    minAndMax: 'min and max',
    minLengthAndMaxResults: 'min length and max results',
    hintAndError: 'hint and error',
    withHint: 'with hint',
    withError: 'with error',
    withLabel: 'with label',
    requiredWithHint: 'required with hint',
    positions: 'positions',
    inlineLayout: 'inline layout',
    alignLeft: 'align: left',
    alignCenter: 'align: center',
    manyPages: 'many pages',
    minimal: 'minimal',
    withDisabledTab: 'with disabled tab',
    withIcons: 'with icons',
    iconTrigger: 'icon trigger',
    withDisabledItem: 'with disabled item',
    twoOptions: 'two options',
    fullWidth: 'full width',
    removable: 'removable',
    noResize: 'no resize',
    disabledAndReadonly: 'disabled and readonly',
    minMaxLabels: 'min/max labels',
    indeterminate: 'indeterminate',
    rect: 'rect',
    trigger: 'trigger',
    underline: 'underline',
    filled: 'filled',
  },
  common: {
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    cancel: 'Cancel',
    save: 'Save',
    confirm: 'Confirm',
    close: 'Close',
    default: 'Default',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
    result: 'Result:',
  },
  accordion: {
    whatQ: 'What is @eagami/ui?',
    whatA:
      'A lightweight, accessible Angular component library built on CSS custom properties.',
    installQ: 'How do I install it?',
    installA:
      'Run pnpm add @eagami/ui, then add the global stylesheet to your angular.json.',
    themeQ: 'Can I customize the theme?',
    themeA:
      'Yes: override any CSS custom property on :root or scope overrides to individual components.',
    sectionOne: 'Section One',
    sectionOneBody: 'Multiple sections can be open at once in multi mode.',
    sectionTwo: 'Section Two',
    sectionTwoBody: 'Content for section two.',
    disabledSection: 'Disabled Section',
    disabledSectionBody: 'This content is not reachable.',
  },
  alert: {
    defaultMsg: 'This is a default alert',
    successMsg: 'Your changes have been saved',
    warningMsg: 'Your trial expires in 3 days',
    errorMsg: 'Something went wrong, please try again',
    infoMsg: 'A new version is available',
    dismissibleMsg: 'This alert can be dismissed',
  },
  autocomplete: {
    frameworkLabel: 'Framework',
    startTyping: 'Start typing…',
    withHintLabel: 'With hint',
    hint: 'Start typing to see matches',
    withErrorLabel: 'With error',
    errorMsg: 'Please select a framework',
    frameworkPlaceholder: 'Framework…',
    minMaxLabel: 'Min 2 chars, max 3 results',
    minMaxPlaceholder: 'Type at least 2 characters…',
    disabledLabel: 'Disabled',
    options: [
      { value: 'angular', label: 'Angular' },
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'solid', label: 'Solid' },
      { value: 'qwik', label: 'Qwik' },
      { value: 'preact', label: 'Preact' },
      { value: 'lit', label: 'Lit' },
    ],
  },
  avatar: { userPhotoAlt: 'User photo' },
  badge: { active: 'Active', pending: 'Pending', failed: 'Failed', newItem: 'New' },
  breadcrumbs: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Laptops', href: '/products/laptops' },
      { label: 'MacBook Pro' },
    ],
    itemsShort: [{ label: 'Dashboard', href: '/' }, { label: 'Settings' }],
  },
  button: {
    primary: 'Primary',
    secondary: 'Secondary',
    ghost: 'Ghost',
    danger: 'Danger',
    toggleLoading: 'Toggle loading',
    disabled: 'Disabled',
    fullWidth: 'Full width',
  },
  card: {
    elevatedTitle: 'Elevated',
    elevatedBody: 'Card with shadow elevation.',
    outlinedTitle: 'Outlined',
    outlinedBody: 'Card with border outline.',
    filledTitle: 'Filled',
    filledBody: 'Card with subtle background.',
    footerTitle: 'Card Title',
    footerBody: 'This card has a header, body, and footer with actions.',
  },
  checkbox: {
    acceptTerms: 'Accept terms and conditions',
    disabledLabel: 'Disabled',
    disabledChecked: 'Disabled checked',
    indeterminate: 'Indeterminate',
    iAgree: 'I agree to the terms',
    subscribe: 'Subscribe to updates',
    subscribeHint: 'We send a monthly digest, no spam',
    errorLabel: 'Accept terms',
    errorMsg: 'You must accept the terms to continue',
  },
  codeInput: {
    label: 'Verification code',
    hint: 'Check your email for the 6-digit code',
    errorMsg: 'Invalid verification code',
    pinLabel: 'PIN',
    pinHint: 'Enter your 4-digit PIN',
  },
  dataTable: {
    columnId: 'ID',
    columnFirstName: 'First Name',
    columnLastName: 'Last Name',
    columnAdmin: 'Admin',
    columnPosts: 'Posts',
  },
  datePicker: {
    appointmentLabel: 'Appointment',
    placeholder: 'Pick a date…',
    hint: 'Select any future date',
    errorMsg: 'This field is required',
    minMaxLabel: 'Within next 3 weeks',
    minMaxHint: '±1 week / +3 weeks from today',
    short: 'Short',
    longLabel: 'Long',
  },
  dialog: {
    open: 'Open Dialog',
    title: 'Dialog Title',
    body: 'This is the dialog body. It supports any content including forms, text, and other components.',
    confirm: 'Confirm',
  },
  drawer: {
    right: 'Right',
    left: 'Left',
    top: 'Top',
    bottom: 'Bottom',
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
    placeholder: 'Select a fruit…',
    hint: 'Choose your favourite',
    errorMsg: 'This field is required',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'date', label: 'Date' },
    ],
  },
  emptyState: {
    noItemsTitle: 'No items yet',
    noItemsDesc: 'Get started by creating your first item.',
    createItem: 'Create item',
    noResultsTitle: 'No results found',
    noResultsDesc: "Try adjusting your search or filter to find what you're looking for.",
    clearFilters: 'Clear filters',
    nothingHere: 'Nothing to see here',
  },
  input: {
    defaultLabel: 'Default',
    placeholder: 'Enter text…',
    successLabel: 'Success',
    successPlaceholder: 'Looks good',
    readonlyLabel: 'Readonly',
    readonlyValue: 'Read-only value',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password…',
    passwordToggleHidden: 'Password (toggle hidden)',
    passwordNoToggle: 'No visibility toggle',
    emailLabel: 'Email',
  },
  menu: {
    actions: 'Actions',
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive',
    deleteAction: 'Delete',
    file: 'File',
    moreOptions: 'More options',
    view: 'View',
    rename: 'Rename',
    newItem: 'New',
    open: 'Open',
    saveUnavailable: 'Save (unavailable)',
    saveAs: 'Save As',
  },
  progressBar: { processing: 'Processing…' },
  radio: {
    fruitOptions: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
    ],
    optionA: 'Option A',
    optionB: 'Option B',
    planLabel: 'Subscription plan',
    free: 'Free',
    pro: 'Pro',
    enterprise: 'Enterprise',
    deliveryLabel: 'Delivery speed',
    deliveryHint: 'Choose how fast you want it',
    standard: 'Standard',
    express: 'Express',
    accountTypeLabel: 'Account type',
    accountTypeError: 'Please choose an account type',
    personal: 'Personal',
    business: 'Business',
  },
  segmented: {
    viewLabel: 'View',
    themeLabel: 'Theme',
    layoutLabel: 'Layout',
    themeHint: 'Affects the entire app',
    layoutError: 'Layout selection is required',
    viewOptions: [
      { value: 'list', label: 'List' },
      { value: 'grid', label: 'Grid' },
      { value: 'kanban', label: 'Kanban' },
    ],
    themeOptions: [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
    ],
  },
  slider: {
    volume: 'Volume',
    brightness: 'Brightness',
    withHintMsg: 'Drag the handle or use arrow keys to adjust',
    withErrorMsg: 'Please pick a value above 50',
  },
  switch: {
    notifications: 'Enable notifications',
    disabledOn: 'Disabled on',
    consent: 'Confirm consent',
    marketing: 'Marketing emails',
    marketingHint: 'You can unsubscribe at any time',
    twoFactor: 'Two-factor auth',
    twoFactorError: 'Two-factor authentication must be enabled',
  },
  tabs: {
    account: 'Account',
    accountBody: 'Account settings content',
    security: 'Security',
    securityBody: 'Security settings content',
    notifications: 'Notifications',
    notificationsBody: 'Notification preferences',
    overview: 'Overview',
    overviewBody: 'Overview content',
    analytics: 'Analytics',
    analyticsBody: 'Analytics content',
    reports: 'Reports',
    reportsBody: 'Reports content',
    general: 'General',
    generalBody: 'General settings',
    billing: 'Billing',
    billingBody: 'Billing details',
    admin: 'Admin',
    adminBody: 'Admin panel',
  },
  tag: {
    default: 'Default',
    success: 'Success',
    warning: 'Warning',
    error: 'Error',
    info: 'Info',
    disabled: 'Disabled',
    disabledSuccess: 'Disabled success',
  },
  textarea: {
    messageLabel: 'Message',
    messagePlaceholder: 'Enter your message…',
    hint: 'Maximum 500 characters',
    errorMsg: 'This field is required',
    fixedSizeLabel: 'Fixed size',
    fixedSizePlaceholder: 'Cannot be resized',
    readonlyLabel: 'Readonly',
    readonlyValue: 'Read-only content',
  },
  toast: {
    defaultMsg: 'This is a default toast',
    successMsg: 'This is a success toast',
    warningMsg: 'This is a warning toast',
    errorMsg: 'This is an error toast',
    infoMsg: 'This is an info toast',
    avatarUpdated: 'Avatar updated',
    copied: selector => `Copied ${selector}`,
    copyFailed: selector => `Failed to copy ${selector}`,
  },
  tooltip: {
    touchAlert:
      'Tooltips are suppressed on touch devices to avoid sticky-hover behaviour. View this section on a device with a mouse to see the demos in action.',
    top: 'Top',
    bottom: 'Bottom',
    left: 'Left',
    right: 'Right',
    topMsg: 'Top tooltip',
    bottomMsg: 'Bottom tooltip',
    leftMsg: 'Left tooltip',
    rightMsg: 'Right tooltip',
  },
};

// ─── French (France) ─────────────────────────────────────────────────────────
const frFR: DemoStrings = {
  header: { uiSandbox: 'Bac à sable UI', darkMode: 'Mode sombre' },
  sidebar: {
    sandboxMode: 'Mode du bac à sable',
    components: 'Composants',
    icons: 'Icônes',
    selectAll: 'Tout sélectionner',
  },
  section: {
    basic: 'de base',
    variants: 'variantes',
    sizes: 'tailles',
    states: 'états',
    disabled: 'désactivé',
    required: 'requis',
    horizontal: 'horizontal',
    vertical: 'vertical',
    single: 'simple',
    multi: 'multiple',
    error: 'erreur',
    status: 'statut',
    password: 'mot de passe',
    autocomplete: 'autocomplétion',
    chevronSeparator: 'séparateur chevron',
    slashSeparator: 'séparateur barre oblique',
    twoLevels: 'deux niveaux',
    withFooter: 'avec pied de page',
    shapesAndFallbacks: 'formes et substituts',
    circle: 'cercle',
    square: 'carré',
    circleWithImage: 'cercle avec image existante et état de cadrage',
    squareWithImage: 'carré avec image existante et état de cadrage',
    fourDigitPin: 'code PIN à 4 chiffres',
    stripedAndBordered: 'rayé et avec bordures',
    compactDensity: 'densité compacte',
    stickyHeader: 'en-tête fixe',
    withPaginator: 'avec paginateur',
    emptyState: 'état vide',
    noResults: 'aucun résultat',
    titleOnly: 'titre seul',
    formatVariants: 'variantes de format',
    minAndMax: 'min et max',
    minLengthAndMaxResults: 'longueur min et résultats max',
    hintAndError: 'aide et erreur',
    withHint: 'avec aide',
    withError: 'avec erreur',
    withLabel: 'avec étiquette',
    requiredWithHint: 'requis avec aide',
    positions: 'positions',
    inlineLayout: 'disposition en ligne',
    alignLeft: 'alignement : gauche',
    alignCenter: 'alignement : centre',
    manyPages: 'plusieurs pages',
    minimal: 'minimal',
    withDisabledTab: 'avec onglet désactivé',
    withIcons: 'avec icônes',
    iconTrigger: 'déclencheur icône',
    withDisabledItem: 'avec élément désactivé',
    twoOptions: 'deux options',
    fullWidth: 'pleine largeur',
    removable: 'amovible',
    noResize: 'sans redimensionnement',
    disabledAndReadonly: 'désactivé et lecture seule',
    minMaxLabels: 'étiquettes min/max',
    indeterminate: 'indéterminé',
    rect: 'rectangle',
    trigger: 'déclencheur',
    underline: 'souligné',
    filled: 'rempli',
  },
  common: {
    small: 'Petit',
    medium: 'Moyen',
    large: 'Grand',
    cancel: 'Annuler',
    save: 'Enregistrer',
    confirm: 'Confirmer',
    close: 'Fermer',
    default: 'Par défaut',
    success: 'Succès',
    warning: 'Avertissement',
    info: 'Info',
    result: 'Résultat :',
  },
  accordion: {
    whatQ: "Qu'est-ce que @eagami/ui ?",
    whatA:
      'Une bibliothèque de composants Angular légère et accessible, construite sur les propriétés personnalisées CSS.',
    installQ: "Comment l'installer ?",
    installA:
      'Exécutez pnpm add @eagami/ui, puis ajoutez la feuille de style globale à votre angular.json.',
    themeQ: 'Puis-je personnaliser le thème ?',
    themeA:
      "Oui : remplacez n'importe quelle propriété personnalisée CSS sur :root ou limitez les surcharges à des composants individuels.",
    sectionOne: 'Section un',
    sectionOneBody:
      'Plusieurs sections peuvent être ouvertes simultanément en mode multiple.',
    sectionTwo: 'Section deux',
    sectionTwoBody: 'Contenu de la section deux.',
    disabledSection: 'Section désactivée',
    disabledSectionBody: "Ce contenu n'est pas accessible.",
  },
  alert: {
    defaultMsg: 'Ceci est une alerte par défaut',
    successMsg: 'Vos modifications ont été enregistrées',
    warningMsg: 'Votre essai expire dans 3 jours',
    errorMsg: "Quelque chose s'est mal passé, veuillez réessayer",
    infoMsg: 'Une nouvelle version est disponible',
    dismissibleMsg: 'Cette alerte peut être fermée',
  },
  autocomplete: {
    frameworkLabel: 'Framework',
    startTyping: 'Commencez à saisir…',
    withHintLabel: 'Avec aide',
    hint: 'Commencez à saisir pour voir les correspondances',
    withErrorLabel: 'Avec erreur',
    errorMsg: 'Veuillez sélectionner un framework',
    frameworkPlaceholder: 'Framework…',
    minMaxLabel: 'Min 2 caractères, max 3 résultats',
    minMaxPlaceholder: 'Saisissez au moins 2 caractères…',
    disabledLabel: 'Désactivé',
    options: [
      { value: 'angular', label: 'Angular' },
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'solid', label: 'Solid' },
      { value: 'qwik', label: 'Qwik' },
      { value: 'preact', label: 'Preact' },
      { value: 'lit', label: 'Lit' },
    ],
  },
  avatar: { userPhotoAlt: 'Photo utilisateur' },
  badge: { active: 'Actif', pending: 'En attente', failed: 'Échoué', newItem: 'Nouveau' },
  breadcrumbs: {
    items: [
      { label: 'Accueil', href: '/' },
      { label: 'Produits', href: '/products' },
      { label: 'Ordinateurs portables', href: '/products/laptops' },
      { label: 'MacBook Pro' },
    ],
    itemsShort: [{ label: 'Tableau de bord', href: '/' }, { label: 'Paramètres' }],
  },
  button: {
    primary: 'Principal',
    secondary: 'Secondaire',
    ghost: 'Fantôme',
    danger: 'Danger',
    toggleLoading: 'Basculer le chargement',
    disabled: 'Désactivé',
    fullWidth: 'Pleine largeur',
  },
  card: {
    elevatedTitle: 'Élevée',
    elevatedBody: 'Carte avec élévation par ombre.',
    outlinedTitle: 'Contour',
    outlinedBody: 'Carte avec contour de bordure.',
    filledTitle: 'Remplie',
    filledBody: 'Carte avec arrière-plan subtil.',
    footerTitle: 'Titre de la carte',
    footerBody: 'Cette carte a un en-tête, un corps et un pied de page avec actions.',
  },
  checkbox: {
    acceptTerms: 'Accepter les conditions générales',
    disabledLabel: 'Désactivé',
    disabledChecked: 'Désactivé coché',
    indeterminate: 'Indéterminé',
    iAgree: "J'accepte les conditions",
    subscribe: 'Recevoir les mises à jour',
    subscribeHint: 'Nous envoyons un récapitulatif mensuel, sans spam',
    errorLabel: 'Accepter les conditions',
    errorMsg: 'Vous devez accepter les conditions pour continuer',
  },
  codeInput: {
    label: 'Code de vérification',
    hint: 'Vérifiez votre e-mail pour le code à 6 chiffres',
    errorMsg: 'Code de vérification invalide',
    pinLabel: 'PIN',
    pinHint: 'Saisissez votre code PIN à 4 chiffres',
  },
  dataTable: {
    columnId: 'ID',
    columnFirstName: 'Prénom',
    columnLastName: 'Nom',
    columnAdmin: 'Admin',
    columnPosts: 'Publications',
  },
  datePicker: {
    appointmentLabel: 'Rendez-vous',
    placeholder: 'Choisir une date…',
    hint: 'Sélectionnez toute date future',
    errorMsg: 'Ce champ est requis',
    minMaxLabel: 'Dans les 3 prochaines semaines',
    minMaxHint: "±1 semaine / +3 semaines à partir d'aujourd'hui",
    short: 'Court',
    longLabel: 'Long',
  },
  dialog: {
    open: 'Ouvrir la boîte de dialogue',
    title: 'Titre de la boîte de dialogue',
    body: "Ceci est le corps de la boîte de dialogue. Il prend en charge tout contenu, y compris les formulaires, le texte et d'autres composants.",
    confirm: 'Confirmer',
  },
  drawer: {
    right: 'Droite',
    left: 'Gauche',
    top: 'Haut',
    bottom: 'Bas',
    rightTitle: 'Panneau droit',
    rightBody: "S'ouvre depuis le bord droit, utile pour les panneaux de détails.",
    leftTitle: 'Panneau gauche',
    leftBody: "S'ouvre depuis la gauche, utile pour les menus de navigation.",
    topTitle: 'Panneau supérieur',
    topBody: 'Descend depuis le haut, utile pour les notifications.',
    bottomTitle: 'Panneau inférieur',
    bottomBody: "Remonte depuis le bas, courant sur mobile pour les feuilles d'action.",
  },
  dropdown: {
    fruitLabel: 'Fruit',
    placeholder: 'Sélectionner un fruit…',
    hint: 'Choisissez votre préféré',
    errorMsg: 'Ce champ est requis',
    options: [
      { value: 'apple', label: 'Pomme' },
      { value: 'banana', label: 'Banane' },
      { value: 'cherry', label: 'Cerise' },
      { value: 'date', label: 'Datte' },
    ],
  },
  emptyState: {
    noItemsTitle: 'Aucun élément pour le moment',
    noItemsDesc: 'Commencez par créer votre premier élément.',
    createItem: 'Créer un élément',
    noResultsTitle: 'Aucun résultat trouvé',
    noResultsDesc:
      'Essayez de modifier votre recherche ou votre filtre pour trouver ce que vous cherchez.',
    clearFilters: 'Effacer les filtres',
    nothingHere: 'Rien à voir ici',
  },
  input: {
    defaultLabel: 'Par défaut',
    placeholder: 'Saisir du texte…',
    successLabel: 'Succès',
    successPlaceholder: 'Tout est bon',
    readonlyLabel: 'Lecture seule',
    readonlyValue: 'Valeur en lecture seule',
    passwordLabel: 'Mot de passe',
    passwordPlaceholder: 'Saisissez votre mot de passe…',
    passwordToggleHidden: 'Mot de passe (bascule masquée)',
    passwordNoToggle: 'Pas de bascule de visibilité',
    emailLabel: 'E-mail',
  },
  menu: {
    actions: 'Actions',
    edit: 'Modifier',
    duplicate: 'Dupliquer',
    archive: 'Archiver',
    deleteAction: 'Supprimer',
    file: 'Fichier',
    moreOptions: "Plus d'options",
    view: 'Afficher',
    rename: 'Renommer',
    newItem: 'Nouveau',
    open: 'Ouvrir',
    saveUnavailable: 'Enregistrer (indisponible)',
    saveAs: 'Enregistrer sous',
  },
  progressBar: { processing: 'Traitement en cours…' },
  radio: {
    fruitOptions: [
      { value: 'apple', label: 'Pomme' },
      { value: 'banana', label: 'Banane' },
      { value: 'cherry', label: 'Cerise' },
    ],
    optionA: 'Option A',
    optionB: 'Option B',
    planLabel: "Plan d'abonnement",
    free: 'Gratuit',
    pro: 'Pro',
    enterprise: 'Entreprise',
    deliveryLabel: 'Vitesse de livraison',
    deliveryHint: 'Choisissez la vitesse souhaitée',
    standard: 'Standard',
    express: 'Express',
    accountTypeLabel: 'Type de compte',
    accountTypeError: 'Veuillez choisir un type de compte',
    personal: 'Personnel',
    business: 'Entreprise',
  },
  segmented: {
    viewLabel: 'Affichage',
    themeLabel: 'Thème',
    layoutLabel: 'Disposition',
    themeHint: "Affecte toute l'application",
    layoutError: 'La sélection de la disposition est requise',
    viewOptions: [
      { value: 'list', label: 'Liste' },
      { value: 'grid', label: 'Grille' },
      { value: 'kanban', label: 'Kanban' },
    ],
    themeOptions: [
      { value: 'light', label: 'Clair' },
      { value: 'dark', label: 'Sombre' },
    ],
  },
  slider: {
    volume: 'Volume',
    brightness: 'Luminosité',
    withHintMsg: 'Faites glisser la poignée ou utilisez les flèches pour ajuster',
    withErrorMsg: 'Veuillez choisir une valeur supérieure à 50',
  },
  switch: {
    notifications: 'Activer les notifications',
    disabledOn: 'Désactivé activé',
    consent: 'Confirmer le consentement',
    marketing: 'E-mails marketing',
    marketingHint: 'Vous pouvez vous désabonner à tout moment',
    twoFactor: 'Authentification à deux facteurs',
    twoFactorError: "L'authentification à deux facteurs doit être activée",
  },
  tabs: {
    account: 'Compte',
    accountBody: 'Contenu des paramètres du compte',
    security: 'Sécurité',
    securityBody: 'Contenu des paramètres de sécurité',
    notifications: 'Notifications',
    notificationsBody: 'Préférences de notification',
    overview: "Vue d'ensemble",
    overviewBody: "Contenu de la vue d'ensemble",
    analytics: 'Analyses',
    analyticsBody: 'Contenu des analyses',
    reports: 'Rapports',
    reportsBody: 'Contenu des rapports',
    general: 'Général',
    generalBody: 'Paramètres généraux',
    billing: 'Facturation',
    billingBody: 'Détails de facturation',
    admin: 'Admin',
    adminBody: "Panneau d'administration",
  },
  tag: {
    default: 'Par défaut',
    success: 'Succès',
    warning: 'Avertissement',
    error: 'Erreur',
    info: 'Info',
    disabled: 'Désactivé',
    disabledSuccess: 'Succès désactivé',
  },
  textarea: {
    messageLabel: 'Message',
    messagePlaceholder: 'Saisissez votre message…',
    hint: 'Maximum 500 caractères',
    errorMsg: 'Ce champ est requis',
    fixedSizeLabel: 'Taille fixe',
    fixedSizePlaceholder: 'Ne peut pas être redimensionné',
    readonlyLabel: 'Lecture seule',
    readonlyValue: 'Contenu en lecture seule',
  },
  toast: {
    defaultMsg: 'Ceci est un toast par défaut',
    successMsg: 'Ceci est un toast de succès',
    warningMsg: "Ceci est un toast d'avertissement",
    errorMsg: "Ceci est un toast d'erreur",
    infoMsg: "Ceci est un toast d'information",
    avatarUpdated: 'Avatar mis à jour',
    copied: selector => `${selector} copié`,
    copyFailed: selector => `Échec de la copie de ${selector}`,
  },
  tooltip: {
    touchAlert:
      'Les infobulles sont désactivées sur les appareils tactiles pour éviter le comportement de survol persistant. Consultez cette section sur un appareil avec une souris pour voir les démos en action.',
    top: 'Haut',
    bottom: 'Bas',
    left: 'Gauche',
    right: 'Droite',
    topMsg: 'Infobulle en haut',
    bottomMsg: 'Infobulle en bas',
    leftMsg: 'Infobulle à gauche',
    rightMsg: 'Infobulle à droite',
  },
};

// ─── Greek ───────────────────────────────────────────────────────────────────
const el: DemoStrings = {
  header: { uiSandbox: 'Πεδίο δοκιμών UI', darkMode: 'Σκούρο θέμα' },
  sidebar: {
    sandboxMode: 'Λειτουργία πεδίου δοκιμών',
    components: 'Στοιχεία',
    icons: 'Εικονίδια',
    selectAll: 'Επιλογή όλων',
  },
  section: {
    basic: 'βασικό',
    variants: 'παραλλαγές',
    sizes: 'μεγέθη',
    states: 'καταστάσεις',
    disabled: 'απενεργοποιημένο',
    required: 'υποχρεωτικό',
    horizontal: 'οριζόντιο',
    vertical: 'κάθετο',
    single: 'μονό',
    multi: 'πολλαπλό',
    error: 'σφάλμα',
    status: 'κατάσταση',
    password: 'κωδικός πρόσβασης',
    autocomplete: 'αυτόματη συμπλήρωση',
    chevronSeparator: 'διαχωριστικό βέλους',
    slashSeparator: 'διαχωριστικό καθέτου',
    twoLevels: 'δύο επίπεδα',
    withFooter: 'με υποσέλιδο',
    shapesAndFallbacks: 'σχήματα και εναλλακτικά',
    circle: 'κύκλος',
    square: 'τετράγωνο',
    circleWithImage: 'κύκλος με υπάρχουσα εικόνα και κατάσταση περικοπής',
    squareWithImage: 'τετράγωνο με υπάρχουσα εικόνα και κατάσταση περικοπής',
    fourDigitPin: 'PIN 4 ψηφίων',
    stripedAndBordered: 'ριγέ και με περίγραμμα',
    compactDensity: 'συμπαγής πυκνότητα',
    stickyHeader: 'σταθερή κεφαλίδα',
    withPaginator: 'με σελιδοποίηση',
    emptyState: 'κενή κατάσταση',
    noResults: 'κανένα αποτέλεσμα',
    titleOnly: 'μόνο τίτλος',
    formatVariants: 'παραλλαγές μορφής',
    minAndMax: 'ελάχιστο και μέγιστο',
    minLengthAndMaxResults: 'ελάχιστο μήκος και μέγιστα αποτελέσματα',
    hintAndError: 'υπόδειξη και σφάλμα',
    withHint: 'με υπόδειξη',
    withError: 'με σφάλμα',
    withLabel: 'με ετικέτα',
    requiredWithHint: 'υποχρεωτικό με υπόδειξη',
    positions: 'θέσεις',
    inlineLayout: 'διάταξη σε σειρά',
    alignLeft: 'στοίχιση: αριστερά',
    alignCenter: 'στοίχιση: κέντρο',
    manyPages: 'πολλές σελίδες',
    minimal: 'ελάχιστο',
    withDisabledTab: 'με απενεργοποιημένη καρτέλα',
    withIcons: 'με εικονίδια',
    iconTrigger: 'έναυσμα εικονιδίου',
    withDisabledItem: 'με απενεργοποιημένο στοιχείο',
    twoOptions: 'δύο επιλογές',
    fullWidth: 'πλήρες πλάτος',
    removable: 'αφαιρούμενο',
    noResize: 'χωρίς αλλαγή μεγέθους',
    disabledAndReadonly: 'απενεργοποιημένο και μόνο για ανάγνωση',
    minMaxLabels: 'ετικέτες ελάχιστου/μέγιστου',
    indeterminate: 'απροσδιόριστο',
    rect: 'ορθογώνιο',
    trigger: 'έναυσμα',
    underline: 'υπογράμμιση',
    filled: 'γεμάτο',
  },
  common: {
    small: 'Μικρό',
    medium: 'Μεσαίο',
    large: 'Μεγάλο',
    cancel: 'Άκυρο',
    save: 'Αποθήκευση',
    confirm: 'Επιβεβαίωση',
    close: 'Κλείσιμο',
    default: 'Προεπιλογή',
    success: 'Επιτυχία',
    warning: 'Προειδοποίηση',
    info: 'Πληροφορία',
    result: 'Αποτέλεσμα:',
  },
  accordion: {
    whatQ: 'Τι είναι το @eagami/ui;',
    whatA:
      'Μια ελαφριά, προσβάσιμη βιβλιοθήκη στοιχείων Angular βασισμένη σε προσαρμοσμένες ιδιότητες CSS.',
    installQ: 'Πώς το εγκαθιστώ;',
    installA:
      'Εκτελέστε pnpm add @eagami/ui και προσθέστε το καθολικό φύλλο στυλ στο angular.json.',
    themeQ: 'Μπορώ να προσαρμόσω το θέμα;',
    themeA:
      'Ναι: αντικαταστήστε οποιαδήποτε προσαρμοσμένη ιδιότητα CSS στο :root ή περιορίστε τις αντικαταστάσεις σε επιμέρους στοιχεία.',
    sectionOne: 'Ενότητα ένα',
    sectionOneBody:
      'Πολλές ενότητες μπορούν να είναι ανοιχτές ταυτόχρονα σε λειτουργία πολλαπλών.',
    sectionTwo: 'Ενότητα δύο',
    sectionTwoBody: 'Περιεχόμενο για την ενότητα δύο.',
    disabledSection: 'Απενεργοποιημένη ενότητα',
    disabledSectionBody: 'Αυτό το περιεχόμενο δεν είναι προσβάσιμο.',
  },
  alert: {
    defaultMsg: 'Αυτή είναι μια προεπιλεγμένη ειδοποίηση',
    successMsg: 'Οι αλλαγές σας αποθηκεύτηκαν',
    warningMsg: 'Η δοκιμαστική σας περίοδος λήγει σε 3 ημέρες',
    errorMsg: 'Κάτι πήγε στραβά, δοκιμάστε ξανά',
    infoMsg: 'Μια νέα έκδοση είναι διαθέσιμη',
    dismissibleMsg: 'Αυτή η ειδοποίηση μπορεί να απορριφθεί',
  },
  autocomplete: {
    frameworkLabel: 'Πλαίσιο',
    startTyping: 'Αρχίστε να πληκτρολογείτε…',
    withHintLabel: 'Με υπόδειξη',
    hint: 'Αρχίστε να πληκτρολογείτε για να δείτε αντιστοιχίσεις',
    withErrorLabel: 'Με σφάλμα',
    errorMsg: 'Επιλέξτε ένα πλαίσιο',
    frameworkPlaceholder: 'Πλαίσιο…',
    minMaxLabel: 'Ελάχ. 2 χαρακτήρες, μέγ. 3 αποτελέσματα',
    minMaxPlaceholder: 'Πληκτρολογήστε τουλάχιστον 2 χαρακτήρες…',
    disabledLabel: 'Απενεργοποιημένο',
    options: [
      { value: 'angular', label: 'Angular' },
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'solid', label: 'Solid' },
      { value: 'qwik', label: 'Qwik' },
      { value: 'preact', label: 'Preact' },
      { value: 'lit', label: 'Lit' },
    ],
  },
  avatar: { userPhotoAlt: 'Φωτογραφία χρήστη' },
  badge: { active: 'Ενεργό', pending: 'Εκκρεμές', failed: 'Απέτυχε', newItem: 'Νέο' },
  breadcrumbs: {
    items: [
      { label: 'Αρχική', href: '/' },
      { label: 'Προϊόντα', href: '/products' },
      { label: 'Φορητοί υπολογιστές', href: '/products/laptops' },
      { label: 'MacBook Pro' },
    ],
    itemsShort: [{ label: 'Πίνακας ελέγχου', href: '/' }, { label: 'Ρυθμίσεις' }],
  },
  button: {
    primary: 'Κύριο',
    secondary: 'Δευτερεύον',
    ghost: 'Διάφανο',
    danger: 'Κίνδυνος',
    toggleLoading: 'Εναλλαγή φόρτωσης',
    disabled: 'Απενεργοποιημένο',
    fullWidth: 'Πλήρες πλάτος',
  },
  card: {
    elevatedTitle: 'Ανυψωμένη',
    elevatedBody: 'Κάρτα με ανύψωση μέσω σκιάς.',
    outlinedTitle: 'Με περίγραμμα',
    outlinedBody: 'Κάρτα με περίγραμμα.',
    filledTitle: 'Γεμάτη',
    filledBody: 'Κάρτα με διακριτικό φόντο.',
    footerTitle: 'Τίτλος κάρτας',
    footerBody: 'Αυτή η κάρτα έχει κεφαλίδα, σώμα και υποσέλιδο με ενέργειες.',
  },
  checkbox: {
    acceptTerms: 'Αποδοχή όρων και προϋποθέσεων',
    disabledLabel: 'Απενεργοποιημένο',
    disabledChecked: 'Απενεργοποιημένο επιλεγμένο',
    indeterminate: 'Απροσδιόριστο',
    iAgree: 'Συμφωνώ με τους όρους',
    subscribe: 'Εγγραφή στις ενημερώσεις',
    subscribeHint: 'Στέλνουμε μηνιαία περίληψη, χωρίς ανεπιθύμητη αλληλογραφία',
    errorLabel: 'Αποδοχή όρων',
    errorMsg: 'Πρέπει να αποδεχτείτε τους όρους για να συνεχίσετε',
  },
  codeInput: {
    label: 'Κωδικός επαλήθευσης',
    hint: 'Ελέγξτε το email σας για τον 6ψήφιο κωδικό',
    errorMsg: 'Μη έγκυρος κωδικός επαλήθευσης',
    pinLabel: 'PIN',
    pinHint: 'Εισαγάγετε το 4ψήφιο PIN σας',
  },
  dataTable: {
    columnId: 'ID',
    columnFirstName: 'Όνομα',
    columnLastName: 'Επώνυμο',
    columnAdmin: 'Διαχειριστής',
    columnPosts: 'Δημοσιεύσεις',
  },
  datePicker: {
    appointmentLabel: 'Ραντεβού',
    placeholder: 'Επιλέξτε ημερομηνία…',
    hint: 'Επιλέξτε οποιαδήποτε μελλοντική ημερομηνία',
    errorMsg: 'Αυτό το πεδίο είναι υποχρεωτικό',
    minMaxLabel: 'Εντός των επόμενων 3 εβδομάδων',
    minMaxHint: '±1 εβδομάδα / +3 εβδομάδες από σήμερα',
    short: 'Σύντομη',
    longLabel: 'Μακρά',
  },
  dialog: {
    open: 'Άνοιγμα διαλόγου',
    title: 'Τίτλος διαλόγου',
    body: 'Αυτό είναι το σώμα του διαλόγου. Υποστηρίζει οποιοδήποτε περιεχόμενο, συμπεριλαμβανομένων φορμών, κειμένου και άλλων στοιχείων.',
    confirm: 'Επιβεβαίωση',
  },
  drawer: {
    right: 'Δεξιά',
    left: 'Αριστερά',
    top: 'Επάνω',
    bottom: 'Κάτω',
    rightTitle: 'Δεξί συρτάρι',
    rightBody: 'Εμφανίζεται από το δεξί άκρο, χρήσιμο για πίνακες λεπτομερειών.',
    leftTitle: 'Αριστερό συρτάρι',
    leftBody: 'Εμφανίζεται από αριστερά, χρήσιμο για μενού πλοήγησης.',
    topTitle: 'Επάνω συρτάρι',
    topBody: 'Κατεβαίνει από επάνω, χρήσιμο για ειδοποιήσεις.',
    bottomTitle: 'Κάτω συρτάρι',
    bottomBody: 'Ανεβαίνει από κάτω, συνηθισμένο σε κινητά για φύλλα ενεργειών.',
  },
  dropdown: {
    fruitLabel: 'Φρούτο',
    placeholder: 'Επιλέξτε φρούτο…',
    hint: 'Επιλέξτε το αγαπημένο σας',
    errorMsg: 'Αυτό το πεδίο είναι υποχρεωτικό',
    options: [
      { value: 'apple', label: 'Μήλο' },
      { value: 'banana', label: 'Μπανάνα' },
      { value: 'cherry', label: 'Κεράσι' },
      { value: 'date', label: 'Χουρμάς' },
    ],
  },
  emptyState: {
    noItemsTitle: 'Δεν υπάρχουν ακόμα στοιχεία',
    noItemsDesc: 'Ξεκινήστε δημιουργώντας το πρώτο σας στοιχείο.',
    createItem: 'Δημιουργία στοιχείου',
    noResultsTitle: 'Δεν βρέθηκαν αποτελέσματα',
    noResultsDesc:
      'Δοκιμάστε να προσαρμόσετε την αναζήτηση ή το φίλτρο σας για να βρείτε αυτό που ψάχνετε.',
    clearFilters: 'Εκκαθάριση φίλτρων',
    nothingHere: 'Δεν υπάρχει τίποτα να δείτε εδώ',
  },
  input: {
    defaultLabel: 'Προεπιλογή',
    placeholder: 'Εισαγάγετε κείμενο…',
    successLabel: 'Επιτυχία',
    successPlaceholder: 'Όλα καλά',
    readonlyLabel: 'Μόνο για ανάγνωση',
    readonlyValue: 'Τιμή μόνο για ανάγνωση',
    passwordLabel: 'Κωδικός πρόσβασης',
    passwordPlaceholder: 'Εισαγάγετε τον κωδικό σας…',
    passwordToggleHidden: 'Κωδικός (εναλλαγή κρυφή)',
    passwordNoToggle: 'Χωρίς εναλλαγή ορατότητας',
    emailLabel: 'Email',
  },
  menu: {
    actions: 'Ενέργειες',
    edit: 'Επεξεργασία',
    duplicate: 'Διπλασιασμός',
    archive: 'Αρχειοθέτηση',
    deleteAction: 'Διαγραφή',
    file: 'Αρχείο',
    moreOptions: 'Περισσότερες επιλογές',
    view: 'Προβολή',
    rename: 'Μετονομασία',
    newItem: 'Νέο',
    open: 'Άνοιγμα',
    saveUnavailable: 'Αποθήκευση (μη διαθέσιμο)',
    saveAs: 'Αποθήκευση ως',
  },
  progressBar: { processing: 'Επεξεργασία…' },
  radio: {
    fruitOptions: [
      { value: 'apple', label: 'Μήλο' },
      { value: 'banana', label: 'Μπανάνα' },
      { value: 'cherry', label: 'Κεράσι' },
    ],
    optionA: 'Επιλογή Α',
    optionB: 'Επιλογή Β',
    planLabel: 'Πρόγραμμα συνδρομής',
    free: 'Δωρεάν',
    pro: 'Pro',
    enterprise: 'Επιχείρηση',
    deliveryLabel: 'Ταχύτητα παράδοσης',
    deliveryHint: 'Επιλέξτε πόσο γρήγορα το θέλετε',
    standard: 'Τυπική',
    express: 'Ταχεία',
    accountTypeLabel: 'Τύπος λογαριασμού',
    accountTypeError: 'Επιλέξτε τύπο λογαριασμού',
    personal: 'Προσωπικός',
    business: 'Επιχειρηματικός',
  },
  segmented: {
    viewLabel: 'Προβολή',
    themeLabel: 'Θέμα',
    layoutLabel: 'Διάταξη',
    themeHint: 'Επηρεάζει ολόκληρη την εφαρμογή',
    layoutError: 'Η επιλογή διάταξης είναι υποχρεωτική',
    viewOptions: [
      { value: 'list', label: 'Λίστα' },
      { value: 'grid', label: 'Πλέγμα' },
      { value: 'kanban', label: 'Kanban' },
    ],
    themeOptions: [
      { value: 'light', label: 'Φωτεινό' },
      { value: 'dark', label: 'Σκούρο' },
    ],
  },
  slider: {
    volume: 'Ένταση',
    brightness: 'Φωτεινότητα',
    withHintMsg: 'Σύρετε τη λαβή ή χρησιμοποιήστε τα βέλη για ρύθμιση',
    withErrorMsg: 'Επιλέξτε τιμή πάνω από 50',
  },
  switch: {
    notifications: 'Ενεργοποίηση ειδοποιήσεων',
    disabledOn: 'Απενεργοποιημένο ενεργό',
    consent: 'Επιβεβαίωση συγκατάθεσης',
    marketing: 'Email μάρκετινγκ',
    marketingHint: 'Μπορείτε να καταργήσετε την εγγραφή ανά πάσα στιγμή',
    twoFactor: 'Έλεγχος ταυτότητας δύο παραγόντων',
    twoFactorError: 'Ο έλεγχος ταυτότητας δύο παραγόντων πρέπει να είναι ενεργοποιημένος',
  },
  tabs: {
    account: 'Λογαριασμός',
    accountBody: 'Περιεχόμενο ρυθμίσεων λογαριασμού',
    security: 'Ασφάλεια',
    securityBody: 'Περιεχόμενο ρυθμίσεων ασφαλείας',
    notifications: 'Ειδοποιήσεις',
    notificationsBody: 'Προτιμήσεις ειδοποιήσεων',
    overview: 'Επισκόπηση',
    overviewBody: 'Περιεχόμενο επισκόπησης',
    analytics: 'Αναλυτικά στοιχεία',
    analyticsBody: 'Περιεχόμενο αναλυτικών στοιχείων',
    reports: 'Αναφορές',
    reportsBody: 'Περιεχόμενο αναφορών',
    general: 'Γενικά',
    generalBody: 'Γενικές ρυθμίσεις',
    billing: 'Χρέωση',
    billingBody: 'Λεπτομέρειες χρέωσης',
    admin: 'Διαχείριση',
    adminBody: 'Πίνακας διαχείρισης',
  },
  tag: {
    default: 'Προεπιλογή',
    success: 'Επιτυχία',
    warning: 'Προειδοποίηση',
    error: 'Σφάλμα',
    info: 'Πληροφορία',
    disabled: 'Απενεργοποιημένο',
    disabledSuccess: 'Απενεργοποιημένη επιτυχία',
  },
  textarea: {
    messageLabel: 'Μήνυμα',
    messagePlaceholder: 'Εισαγάγετε το μήνυμά σας…',
    hint: 'Έως 500 χαρακτήρες',
    errorMsg: 'Αυτό το πεδίο είναι υποχρεωτικό',
    fixedSizeLabel: 'Σταθερό μέγεθος',
    fixedSizePlaceholder: 'Δεν μπορεί να αλλάξει μέγεθος',
    readonlyLabel: 'Μόνο για ανάγνωση',
    readonlyValue: 'Περιεχόμενο μόνο για ανάγνωση',
  },
  toast: {
    defaultMsg: 'Αυτό είναι ένα προεπιλεγμένο μήνυμα',
    successMsg: 'Αυτό είναι ένα μήνυμα επιτυχίας',
    warningMsg: 'Αυτό είναι ένα μήνυμα προειδοποίησης',
    errorMsg: 'Αυτό είναι ένα μήνυμα σφάλματος',
    infoMsg: 'Αυτό είναι ένα ενημερωτικό μήνυμα',
    avatarUpdated: 'Το avatar ενημερώθηκε',
    copied: selector => `Αντιγράφηκε ${selector}`,
    copyFailed: selector => `Αποτυχία αντιγραφής ${selector}`,
  },
  tooltip: {
    touchAlert:
      'Οι επεξηγήσεις απενεργοποιούνται σε συσκευές αφής για να αποφευχθεί η επίμονη συμπεριφορά στο πέρασμα. Δείτε αυτήν την ενότητα σε συσκευή με ποντίκι για να δείτε τις επιδείξεις σε δράση.',
    top: 'Επάνω',
    bottom: 'Κάτω',
    left: 'Αριστερά',
    right: 'Δεξιά',
    topMsg: 'Επεξήγηση επάνω',
    bottomMsg: 'Επεξήγηση κάτω',
    leftMsg: 'Επεξήγηση αριστερά',
    rightMsg: 'Επεξήγηση δεξιά',
  },
};

// ─── Polish ──────────────────────────────────────────────────────────────────
const pl: DemoStrings = {
  header: { uiSandbox: 'Piaskownica UI', darkMode: 'Tryb ciemny' },
  sidebar: {
    sandboxMode: 'Tryb piaskownicy',
    components: 'Komponenty',
    icons: 'Ikony',
    selectAll: 'Zaznacz wszystko',
  },
  section: {
    basic: 'podstawowy',
    variants: 'warianty',
    sizes: 'rozmiary',
    states: 'stany',
    disabled: 'wyłączony',
    required: 'wymagany',
    horizontal: 'poziomy',
    vertical: 'pionowy',
    single: 'pojedynczy',
    multi: 'wielokrotny',
    error: 'błąd',
    status: 'status',
    password: 'hasło',
    autocomplete: 'autouzupełnianie',
    chevronSeparator: 'separator daszka',
    slashSeparator: 'separator ukośnika',
    twoLevels: 'dwa poziomy',
    withFooter: 'ze stopką',
    shapesAndFallbacks: 'kształty i zastępniki',
    circle: 'okrąg',
    square: 'kwadrat',
    circleWithImage: 'okrąg z istniejącym obrazem i stanem kadrowania',
    squareWithImage: 'kwadrat z istniejącym obrazem i stanem kadrowania',
    fourDigitPin: '4-cyfrowy PIN',
    stripedAndBordered: 'pasiasty i obramowany',
    compactDensity: 'kompaktowa gęstość',
    stickyHeader: 'przyklejony nagłówek',
    withPaginator: 'z paginacją',
    emptyState: 'stan pusty',
    noResults: 'brak wyników',
    titleOnly: 'tylko tytuł',
    formatVariants: 'warianty formatu',
    minAndMax: 'min i maks',
    minLengthAndMaxResults: 'min. długość i maks. wyników',
    hintAndError: 'wskazówka i błąd',
    withHint: 'ze wskazówką',
    withError: 'z błędem',
    withLabel: 'z etykietą',
    requiredWithHint: 'wymagane ze wskazówką',
    positions: 'pozycje',
    inlineLayout: 'układ wbudowany',
    alignLeft: 'wyrównanie: lewo',
    alignCenter: 'wyrównanie: środek',
    manyPages: 'wiele stron',
    minimal: 'minimalny',
    withDisabledTab: 'z wyłączoną kartą',
    withIcons: 'z ikonami',
    iconTrigger: 'wyzwalacz ikony',
    withDisabledItem: 'z wyłączonym elementem',
    twoOptions: 'dwie opcje',
    fullWidth: 'pełna szerokość',
    removable: 'usuwalny',
    noResize: 'bez zmiany rozmiaru',
    disabledAndReadonly: 'wyłączony i tylko do odczytu',
    minMaxLabels: 'etykiety min/maks',
    indeterminate: 'nieokreślony',
    rect: 'prostokąt',
    trigger: 'wyzwalacz',
    underline: 'podkreślenie',
    filled: 'wypełniony',
  },
  common: {
    small: 'Mały',
    medium: 'Średni',
    large: 'Duży',
    cancel: 'Anuluj',
    save: 'Zapisz',
    confirm: 'Potwierdź',
    close: 'Zamknij',
    default: 'Domyślny',
    success: 'Sukces',
    warning: 'Ostrzeżenie',
    info: 'Info',
    result: 'Wynik:',
  },
  accordion: {
    whatQ: 'Czym jest @eagami/ui?',
    whatA:
      'Lekka, dostępna biblioteka komponentów Angular oparta na niestandardowych właściwościach CSS.',
    installQ: 'Jak ją zainstalować?',
    installA:
      'Uruchom pnpm add @eagami/ui, a następnie dodaj globalny arkusz stylów do angular.json.',
    themeQ: 'Czy mogę dostosować motyw?',
    themeA:
      'Tak: nadpisz dowolną niestandardową właściwość CSS na :root lub ogranicz nadpisania do poszczególnych komponentów.',
    sectionOne: 'Sekcja pierwsza',
    sectionOneBody: 'W trybie wielokrotnym wiele sekcji może być otwartych jednocześnie.',
    sectionTwo: 'Sekcja druga',
    sectionTwoBody: 'Treść sekcji drugiej.',
    disabledSection: 'Sekcja wyłączona',
    disabledSectionBody: 'Ta treść nie jest dostępna.',
  },
  alert: {
    defaultMsg: 'To jest domyślne powiadomienie',
    successMsg: 'Twoje zmiany zostały zapisane',
    warningMsg: 'Twój okres próbny wygasa za 3 dni',
    errorMsg: 'Coś poszło nie tak, spróbuj ponownie',
    infoMsg: 'Dostępna jest nowa wersja',
    dismissibleMsg: 'To powiadomienie można odrzucić',
  },
  autocomplete: {
    frameworkLabel: 'Framework',
    startTyping: 'Zacznij pisać…',
    withHintLabel: 'Ze wskazówką',
    hint: 'Zacznij pisać, aby zobaczyć dopasowania',
    withErrorLabel: 'Z błędem',
    errorMsg: 'Wybierz framework',
    frameworkPlaceholder: 'Framework…',
    minMaxLabel: 'Min 2 znaki, maks 3 wyniki',
    minMaxPlaceholder: 'Wpisz co najmniej 2 znaki…',
    disabledLabel: 'Wyłączony',
    options: [
      { value: 'angular', label: 'Angular' },
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'solid', label: 'Solid' },
      { value: 'qwik', label: 'Qwik' },
      { value: 'preact', label: 'Preact' },
      { value: 'lit', label: 'Lit' },
    ],
  },
  avatar: { userPhotoAlt: 'Zdjęcie użytkownika' },
  badge: {
    active: 'Aktywny',
    pending: 'Oczekuje',
    failed: 'Niepowodzenie',
    newItem: 'Nowy',
  },
  breadcrumbs: {
    items: [
      { label: 'Strona główna', href: '/' },
      { label: 'Produkty', href: '/products' },
      { label: 'Laptopy', href: '/products/laptops' },
      { label: 'MacBook Pro' },
    ],
    itemsShort: [{ label: 'Pulpit', href: '/' }, { label: 'Ustawienia' }],
  },
  button: {
    primary: 'Główny',
    secondary: 'Drugorzędny',
    ghost: 'Przezroczysty',
    danger: 'Niebezpieczeństwo',
    toggleLoading: 'Przełącz ładowanie',
    disabled: 'Wyłączony',
    fullWidth: 'Pełna szerokość',
  },
  card: {
    elevatedTitle: 'Uniesiona',
    elevatedBody: 'Karta z uniesieniem przez cień.',
    outlinedTitle: 'Obramowana',
    outlinedBody: 'Karta z obramowaniem.',
    filledTitle: 'Wypełniona',
    filledBody: 'Karta z subtelnym tłem.',
    footerTitle: 'Tytuł karty',
    footerBody: 'Ta karta ma nagłówek, treść i stopkę z akcjami.',
  },
  checkbox: {
    acceptTerms: 'Akceptuj regulamin',
    disabledLabel: 'Wyłączony',
    disabledChecked: 'Wyłączony zaznaczony',
    indeterminate: 'Nieokreślony',
    iAgree: 'Zgadzam się z warunkami',
    subscribe: 'Subskrybuj aktualizacje',
    subscribeHint: 'Wysyłamy comiesięczne podsumowanie, bez spamu',
    errorLabel: 'Akceptuj regulamin',
    errorMsg: 'Musisz zaakceptować regulamin, aby kontynuować',
  },
  codeInput: {
    label: 'Kod weryfikacyjny',
    hint: 'Sprawdź swoją skrzynkę e-mail, aby uzyskać 6-cyfrowy kod',
    errorMsg: 'Nieprawidłowy kod weryfikacyjny',
    pinLabel: 'PIN',
    pinHint: 'Wprowadź swój 4-cyfrowy PIN',
  },
  dataTable: {
    columnId: 'ID',
    columnFirstName: 'Imię',
    columnLastName: 'Nazwisko',
    columnAdmin: 'Administrator',
    columnPosts: 'Posty',
  },
  datePicker: {
    appointmentLabel: 'Spotkanie',
    placeholder: 'Wybierz datę…',
    hint: 'Wybierz dowolną przyszłą datę',
    errorMsg: 'To pole jest wymagane',
    minMaxLabel: 'W ciągu najbliższych 3 tygodni',
    minMaxHint: '±1 tydzień / +3 tygodnie od dzisiaj',
    short: 'Krótki',
    longLabel: 'Długi',
  },
  dialog: {
    open: 'Otwórz okno dialogowe',
    title: 'Tytuł okna dialogowego',
    body: 'To jest treść okna dialogowego. Obsługuje dowolną zawartość, w tym formularze, tekst i inne komponenty.',
    confirm: 'Potwierdź',
  },
  drawer: {
    right: 'Prawy',
    left: 'Lewy',
    top: 'Górny',
    bottom: 'Dolny',
    rightTitle: 'Panel prawy',
    rightBody: 'Wysuwa się od prawej krawędzi, przydatne do paneli szczegółów.',
    leftTitle: 'Panel lewy',
    leftBody: 'Wysuwa się od lewej, przydatne do menu nawigacji.',
    topTitle: 'Panel górny',
    topBody: 'Zsuwa się z góry, przydatne do powiadomień.',
    bottomTitle: 'Panel dolny',
    bottomBody:
      'Wysuwa się od dołu, popularne na urządzeniach mobilnych do arkuszy akcji.',
  },
  dropdown: {
    fruitLabel: 'Owoc',
    placeholder: 'Wybierz owoc…',
    hint: 'Wybierz swój ulubiony',
    errorMsg: 'To pole jest wymagane',
    options: [
      { value: 'apple', label: 'Jabłko' },
      { value: 'banana', label: 'Banan' },
      { value: 'cherry', label: 'Wiśnia' },
      { value: 'date', label: 'Daktyl' },
    ],
  },
  emptyState: {
    noItemsTitle: 'Brak elementów',
    noItemsDesc: 'Zacznij od utworzenia swojego pierwszego elementu.',
    createItem: 'Utwórz element',
    noResultsTitle: 'Nie znaleziono wyników',
    noResultsDesc:
      'Spróbuj dostosować wyszukiwanie lub filtr, aby znaleźć to, czego szukasz.',
    clearFilters: 'Wyczyść filtry',
    nothingHere: 'Nic tu nie ma',
  },
  input: {
    defaultLabel: 'Domyślny',
    placeholder: 'Wprowadź tekst…',
    successLabel: 'Sukces',
    successPlaceholder: 'Wygląda dobrze',
    readonlyLabel: 'Tylko do odczytu',
    readonlyValue: 'Wartość tylko do odczytu',
    passwordLabel: 'Hasło',
    passwordPlaceholder: 'Wprowadź swoje hasło…',
    passwordToggleHidden: 'Hasło (przełącznik ukryty)',
    passwordNoToggle: 'Brak przełącznika widoczności',
    emailLabel: 'E-mail',
  },
  menu: {
    actions: 'Akcje',
    edit: 'Edytuj',
    duplicate: 'Duplikuj',
    archive: 'Archiwizuj',
    deleteAction: 'Usuń',
    file: 'Plik',
    moreOptions: 'Więcej opcji',
    view: 'Zobacz',
    rename: 'Zmień nazwę',
    newItem: 'Nowy',
    open: 'Otwórz',
    saveUnavailable: 'Zapisz (niedostępne)',
    saveAs: 'Zapisz jako',
  },
  progressBar: { processing: 'Przetwarzanie…' },
  radio: {
    fruitOptions: [
      { value: 'apple', label: 'Jabłko' },
      { value: 'banana', label: 'Banan' },
      { value: 'cherry', label: 'Wiśnia' },
    ],
    optionA: 'Opcja A',
    optionB: 'Opcja B',
    planLabel: 'Plan subskrypcji',
    free: 'Darmowy',
    pro: 'Pro',
    enterprise: 'Korporacyjny',
    deliveryLabel: 'Szybkość dostawy',
    deliveryHint: 'Wybierz, jak szybko ma dotrzeć',
    standard: 'Standardowa',
    express: 'Ekspresowa',
    accountTypeLabel: 'Typ konta',
    accountTypeError: 'Wybierz typ konta',
    personal: 'Osobiste',
    business: 'Firmowe',
  },
  segmented: {
    viewLabel: 'Widok',
    themeLabel: 'Motyw',
    layoutLabel: 'Układ',
    themeHint: 'Wpływa na całą aplikację',
    layoutError: 'Wybór układu jest wymagany',
    viewOptions: [
      { value: 'list', label: 'Lista' },
      { value: 'grid', label: 'Siatka' },
      { value: 'kanban', label: 'Kanban' },
    ],
    themeOptions: [
      { value: 'light', label: 'Jasny' },
      { value: 'dark', label: 'Ciemny' },
    ],
  },
  slider: {
    volume: 'Głośność',
    brightness: 'Jasność',
    withHintMsg: 'Przeciągnij uchwyt lub użyj strzałek, aby dostosować',
    withErrorMsg: 'Wybierz wartość powyżej 50',
  },
  switch: {
    notifications: 'Włącz powiadomienia',
    disabledOn: 'Wyłączony włączony',
    consent: 'Potwierdź zgodę',
    marketing: 'E-maile marketingowe',
    marketingHint: 'Możesz zrezygnować z subskrypcji w dowolnym momencie',
    twoFactor: 'Uwierzytelnianie dwuskładnikowe',
    twoFactorError: 'Uwierzytelnianie dwuskładnikowe musi być włączone',
  },
  tabs: {
    account: 'Konto',
    accountBody: 'Treść ustawień konta',
    security: 'Bezpieczeństwo',
    securityBody: 'Treść ustawień bezpieczeństwa',
    notifications: 'Powiadomienia',
    notificationsBody: 'Preferencje powiadomień',
    overview: 'Przegląd',
    overviewBody: 'Treść przeglądu',
    analytics: 'Analityka',
    analyticsBody: 'Treść analityki',
    reports: 'Raporty',
    reportsBody: 'Treść raportów',
    general: 'Ogólne',
    generalBody: 'Ustawienia ogólne',
    billing: 'Rozliczenia',
    billingBody: 'Szczegóły rozliczeń',
    admin: 'Administrator',
    adminBody: 'Panel administratora',
  },
  tag: {
    default: 'Domyślny',
    success: 'Sukces',
    warning: 'Ostrzeżenie',
    error: 'Błąd',
    info: 'Info',
    disabled: 'Wyłączony',
    disabledSuccess: 'Wyłączony sukces',
  },
  textarea: {
    messageLabel: 'Wiadomość',
    messagePlaceholder: 'Wprowadź swoją wiadomość…',
    hint: 'Maksymalnie 500 znaków',
    errorMsg: 'To pole jest wymagane',
    fixedSizeLabel: 'Stały rozmiar',
    fixedSizePlaceholder: 'Nie można zmienić rozmiaru',
    readonlyLabel: 'Tylko do odczytu',
    readonlyValue: 'Treść tylko do odczytu',
  },
  toast: {
    defaultMsg: 'To jest domyślny komunikat',
    successMsg: 'To jest komunikat sukcesu',
    warningMsg: 'To jest komunikat ostrzeżenia',
    errorMsg: 'To jest komunikat błędu',
    infoMsg: 'To jest komunikat informacyjny',
    avatarUpdated: 'Awatar zaktualizowany',
    copied: selector => `Skopiowano ${selector}`,
    copyFailed: selector => `Nie udało się skopiować ${selector}`,
  },
  tooltip: {
    touchAlert:
      'Podpowiedzi są wyłączone na urządzeniach dotykowych, aby uniknąć zachowania przyklejonego najechania. Wyświetl tę sekcję na urządzeniu z myszą, aby zobaczyć demonstracje w akcji.',
    top: 'Góra',
    bottom: 'Dół',
    left: 'Lewo',
    right: 'Prawo',
    topMsg: 'Podpowiedź u góry',
    bottomMsg: 'Podpowiedź na dole',
    leftMsg: 'Podpowiedź po lewej',
    rightMsg: 'Podpowiedź po prawej',
  },
};

// ─── Spanish (Spain) ─────────────────────────────────────────────────────────
const esES: DemoStrings = {
  header: { uiSandbox: 'Entorno de pruebas UI', darkMode: 'Modo oscuro' },
  sidebar: {
    sandboxMode: 'Modo del entorno de pruebas',
    components: 'Componentes',
    icons: 'Iconos',
    selectAll: 'Seleccionar todo',
  },
  section: {
    basic: 'básico',
    variants: 'variantes',
    sizes: 'tamaños',
    states: 'estados',
    disabled: 'deshabilitado',
    required: 'obligatorio',
    horizontal: 'horizontal',
    vertical: 'vertical',
    single: 'simple',
    multi: 'múltiple',
    error: 'error',
    status: 'estado',
    password: 'contraseña',
    autocomplete: 'autocompletar',
    chevronSeparator: 'separador chevron',
    slashSeparator: 'separador barra',
    twoLevels: 'dos niveles',
    withFooter: 'con pie',
    shapesAndFallbacks: 'formas y reemplazos',
    circle: 'círculo',
    square: 'cuadrado',
    circleWithImage: 'círculo con imagen existente y estado de recorte',
    squareWithImage: 'cuadrado con imagen existente y estado de recorte',
    fourDigitPin: 'PIN de 4 dígitos',
    stripedAndBordered: 'rayado y con bordes',
    compactDensity: 'densidad compacta',
    stickyHeader: 'encabezado fijo',
    withPaginator: 'con paginador',
    emptyState: 'estado vacío',
    noResults: 'sin resultados',
    titleOnly: 'solo título',
    formatVariants: 'variantes de formato',
    minAndMax: 'mín y máx',
    minLengthAndMaxResults: 'longitud mín y resultados máx',
    hintAndError: 'ayuda y error',
    withHint: 'con ayuda',
    withError: 'con error',
    withLabel: 'con etiqueta',
    requiredWithHint: 'obligatorio con ayuda',
    positions: 'posiciones',
    inlineLayout: 'diseño en línea',
    alignLeft: 'alineación: izquierda',
    alignCenter: 'alineación: centro',
    manyPages: 'muchas páginas',
    minimal: 'mínimo',
    withDisabledTab: 'con pestaña deshabilitada',
    withIcons: 'con iconos',
    iconTrigger: 'activador de icono',
    withDisabledItem: 'con elemento deshabilitado',
    twoOptions: 'dos opciones',
    fullWidth: 'ancho completo',
    removable: 'eliminable',
    noResize: 'sin redimensionar',
    disabledAndReadonly: 'deshabilitado y solo lectura',
    minMaxLabels: 'etiquetas mín/máx',
    indeterminate: 'indeterminado',
    rect: 'rectángulo',
    trigger: 'activador',
    underline: 'subrayado',
    filled: 'relleno',
  },
  common: {
    small: 'Pequeño',
    medium: 'Mediano',
    large: 'Grande',
    cancel: 'Cancelar',
    save: 'Guardar',
    confirm: 'Confirmar',
    close: 'Cerrar',
    default: 'Predeterminado',
    success: 'Éxito',
    warning: 'Aviso',
    info: 'Info',
    result: 'Resultado:',
  },
  accordion: {
    whatQ: '¿Qué es @eagami/ui?',
    whatA:
      'Una biblioteca ligera y accesible de componentes Angular construida sobre propiedades personalizadas de CSS.',
    installQ: '¿Cómo lo instalo?',
    installA:
      'Ejecuta pnpm add @eagami/ui y añade la hoja de estilos global a tu angular.json.',
    themeQ: '¿Puedo personalizar el tema?',
    themeA:
      'Sí: sobrescribe cualquier propiedad personalizada de CSS en :root o limita los cambios a componentes individuales.',
    sectionOne: 'Sección uno',
    sectionOneBody:
      'En el modo múltiple pueden estar abiertas varias secciones a la vez.',
    sectionTwo: 'Sección dos',
    sectionTwoBody: 'Contenido de la sección dos.',
    disabledSection: 'Sección deshabilitada',
    disabledSectionBody: 'Este contenido no es accesible.',
  },
  alert: {
    defaultMsg: 'Esta es una alerta predeterminada',
    successMsg: 'Tus cambios se han guardado',
    warningMsg: 'Tu prueba caduca en 3 días',
    errorMsg: 'Algo salió mal, inténtalo de nuevo',
    infoMsg: 'Hay una nueva versión disponible',
    dismissibleMsg: 'Esta alerta se puede cerrar',
  },
  autocomplete: {
    frameworkLabel: 'Framework',
    startTyping: 'Empieza a escribir…',
    withHintLabel: 'Con ayuda',
    hint: 'Empieza a escribir para ver coincidencias',
    withErrorLabel: 'Con error',
    errorMsg: 'Selecciona un framework',
    frameworkPlaceholder: 'Framework…',
    minMaxLabel: 'Mín 2 caracteres, máx 3 resultados',
    minMaxPlaceholder: 'Escribe al menos 2 caracteres…',
    disabledLabel: 'Deshabilitado',
    options: [
      { value: 'angular', label: 'Angular' },
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'solid', label: 'Solid' },
      { value: 'qwik', label: 'Qwik' },
      { value: 'preact', label: 'Preact' },
      { value: 'lit', label: 'Lit' },
    ],
  },
  avatar: { userPhotoAlt: 'Foto del usuario' },
  badge: { active: 'Activo', pending: 'Pendiente', failed: 'Fallido', newItem: 'Nuevo' },
  breadcrumbs: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Productos', href: '/products' },
      { label: 'Portátiles', href: '/products/laptops' },
      { label: 'MacBook Pro' },
    ],
    itemsShort: [{ label: 'Panel', href: '/' }, { label: 'Ajustes' }],
  },
  button: {
    primary: 'Principal',
    secondary: 'Secundario',
    ghost: 'Fantasma',
    danger: 'Peligro',
    toggleLoading: 'Alternar carga',
    disabled: 'Deshabilitado',
    fullWidth: 'Ancho completo',
  },
  card: {
    elevatedTitle: 'Elevada',
    elevatedBody: 'Tarjeta con elevación mediante sombra.',
    outlinedTitle: 'Con borde',
    outlinedBody: 'Tarjeta con borde.',
    filledTitle: 'Rellena',
    filledBody: 'Tarjeta con fondo sutil.',
    footerTitle: 'Título de la tarjeta',
    footerBody: 'Esta tarjeta tiene cabecera, cuerpo y pie con acciones.',
  },
  checkbox: {
    acceptTerms: 'Acepto los términos y condiciones',
    disabledLabel: 'Deshabilitado',
    disabledChecked: 'Deshabilitado marcado',
    indeterminate: 'Indeterminado',
    iAgree: 'Acepto los términos',
    subscribe: 'Suscribirse a las actualizaciones',
    subscribeHint: 'Enviamos un resumen mensual, sin spam',
    errorLabel: 'Aceptar términos',
    errorMsg: 'Debes aceptar los términos para continuar',
  },
  codeInput: {
    label: 'Código de verificación',
    hint: 'Revisa tu correo para obtener el código de 6 dígitos',
    errorMsg: 'Código de verificación no válido',
    pinLabel: 'PIN',
    pinHint: 'Introduce tu PIN de 4 dígitos',
  },
  dataTable: {
    columnId: 'ID',
    columnFirstName: 'Nombre',
    columnLastName: 'Apellido',
    columnAdmin: 'Admin',
    columnPosts: 'Publicaciones',
  },
  datePicker: {
    appointmentLabel: 'Cita',
    placeholder: 'Elige una fecha…',
    hint: 'Selecciona cualquier fecha futura',
    errorMsg: 'Este campo es obligatorio',
    minMaxLabel: 'En las próximas 3 semanas',
    minMaxHint: '±1 semana / +3 semanas desde hoy',
    short: 'Corto',
    longLabel: 'Largo',
  },
  dialog: {
    open: 'Abrir diálogo',
    title: 'Título del diálogo',
    body: 'Este es el cuerpo del diálogo. Admite cualquier contenido, incluidos formularios, texto y otros componentes.',
    confirm: 'Confirmar',
  },
  drawer: {
    right: 'Derecha',
    left: 'Izquierda',
    top: 'Arriba',
    bottom: 'Abajo',
    rightTitle: 'Panel derecho',
    rightBody: 'Se desliza desde el borde derecho, útil para paneles de detalles.',
    leftTitle: 'Panel izquierdo',
    leftBody: 'Se desliza desde la izquierda, útil para menús de navegación.',
    topTitle: 'Panel superior',
    topBody: 'Se desliza desde arriba, útil para notificaciones.',
    bottomTitle: 'Panel inferior',
    bottomBody: 'Se desliza desde abajo, común en móviles para hojas de acciones.',
  },
  dropdown: {
    fruitLabel: 'Fruta',
    placeholder: 'Selecciona una fruta…',
    hint: 'Elige tu favorita',
    errorMsg: 'Este campo es obligatorio',
    options: [
      { value: 'apple', label: 'Manzana' },
      { value: 'banana', label: 'Plátano' },
      { value: 'cherry', label: 'Cereza' },
      { value: 'date', label: 'Dátil' },
    ],
  },
  emptyState: {
    noItemsTitle: 'Aún no hay elementos',
    noItemsDesc: 'Empieza creando tu primer elemento.',
    createItem: 'Crear elemento',
    noResultsTitle: 'No se encontraron resultados',
    noResultsDesc: 'Prueba a ajustar tu búsqueda o filtro para encontrar lo que buscas.',
    clearFilters: 'Limpiar filtros',
    nothingHere: 'No hay nada que ver aquí',
  },
  input: {
    defaultLabel: 'Predeterminado',
    placeholder: 'Introduce texto…',
    successLabel: 'Éxito',
    successPlaceholder: 'Todo correcto',
    readonlyLabel: 'Solo lectura',
    readonlyValue: 'Valor de solo lectura',
    passwordLabel: 'Contraseña',
    passwordPlaceholder: 'Introduce tu contraseña…',
    passwordToggleHidden: 'Contraseña (interruptor oculto)',
    passwordNoToggle: 'Sin interruptor de visibilidad',
    emailLabel: 'Correo',
  },
  menu: {
    actions: 'Acciones',
    edit: 'Editar',
    duplicate: 'Duplicar',
    archive: 'Archivar',
    deleteAction: 'Eliminar',
    file: 'Archivo',
    moreOptions: 'Más opciones',
    view: 'Ver',
    rename: 'Renombrar',
    newItem: 'Nuevo',
    open: 'Abrir',
    saveUnavailable: 'Guardar (no disponible)',
    saveAs: 'Guardar como',
  },
  progressBar: { processing: 'Procesando…' },
  radio: {
    fruitOptions: [
      { value: 'apple', label: 'Manzana' },
      { value: 'banana', label: 'Plátano' },
      { value: 'cherry', label: 'Cereza' },
    ],
    optionA: 'Opción A',
    optionB: 'Opción B',
    planLabel: 'Plan de suscripción',
    free: 'Gratis',
    pro: 'Pro',
    enterprise: 'Empresa',
    deliveryLabel: 'Velocidad de entrega',
    deliveryHint: 'Elige con qué rapidez la quieres',
    standard: 'Estándar',
    express: 'Exprés',
    accountTypeLabel: 'Tipo de cuenta',
    accountTypeError: 'Elige un tipo de cuenta',
    personal: 'Personal',
    business: 'Empresa',
  },
  segmented: {
    viewLabel: 'Vista',
    themeLabel: 'Tema',
    layoutLabel: 'Diseño',
    themeHint: 'Afecta a toda la aplicación',
    layoutError: 'Es obligatorio elegir un diseño',
    viewOptions: [
      { value: 'list', label: 'Lista' },
      { value: 'grid', label: 'Cuadrícula' },
      { value: 'kanban', label: 'Kanban' },
    ],
    themeOptions: [
      { value: 'light', label: 'Claro' },
      { value: 'dark', label: 'Oscuro' },
    ],
  },
  slider: {
    volume: 'Volumen',
    brightness: 'Brillo',
    withHintMsg: 'Arrastra el control o usa las flechas para ajustar',
    withErrorMsg: 'Elige un valor superior a 50',
  },
  switch: {
    notifications: 'Activar notificaciones',
    disabledOn: 'Deshabilitado activado',
    consent: 'Confirmar consentimiento',
    marketing: 'Correos de marketing',
    marketingHint: 'Puedes darte de baja en cualquier momento',
    twoFactor: 'Autenticación de dos factores',
    twoFactorError: 'La autenticación de dos factores debe estar activada',
  },
  tabs: {
    account: 'Cuenta',
    accountBody: 'Contenido de ajustes de la cuenta',
    security: 'Seguridad',
    securityBody: 'Contenido de ajustes de seguridad',
    notifications: 'Notificaciones',
    notificationsBody: 'Preferencias de notificación',
    overview: 'Resumen',
    overviewBody: 'Contenido del resumen',
    analytics: 'Analíticas',
    analyticsBody: 'Contenido de analíticas',
    reports: 'Informes',
    reportsBody: 'Contenido de informes',
    general: 'General',
    generalBody: 'Ajustes generales',
    billing: 'Facturación',
    billingBody: 'Detalles de facturación',
    admin: 'Admin',
    adminBody: 'Panel de administración',
  },
  tag: {
    default: 'Predeterminado',
    success: 'Éxito',
    warning: 'Aviso',
    error: 'Error',
    info: 'Info',
    disabled: 'Deshabilitado',
    disabledSuccess: 'Éxito deshabilitado',
  },
  textarea: {
    messageLabel: 'Mensaje',
    messagePlaceholder: 'Introduce tu mensaje…',
    hint: 'Máximo 500 caracteres',
    errorMsg: 'Este campo es obligatorio',
    fixedSizeLabel: 'Tamaño fijo',
    fixedSizePlaceholder: 'No se puede redimensionar',
    readonlyLabel: 'Solo lectura',
    readonlyValue: 'Contenido de solo lectura',
  },
  toast: {
    defaultMsg: 'Este es un toast predeterminado',
    successMsg: 'Este es un toast de éxito',
    warningMsg: 'Este es un toast de aviso',
    errorMsg: 'Este es un toast de error',
    infoMsg: 'Este es un toast informativo',
    avatarUpdated: 'Avatar actualizado',
    copied: selector => `Copiado ${selector}`,
    copyFailed: selector => `Error al copiar ${selector}`,
  },
  tooltip: {
    touchAlert:
      'Las descripciones emergentes están desactivadas en dispositivos táctiles para evitar el comportamiento de hover persistente. Visualiza esta sección en un dispositivo con ratón para ver las demos en acción.',
    top: 'Arriba',
    bottom: 'Abajo',
    left: 'Izquierda',
    right: 'Derecha',
    topMsg: 'Descripción emergente arriba',
    bottomMsg: 'Descripción emergente abajo',
    leftMsg: 'Descripción emergente a la izquierda',
    rightMsg: 'Descripción emergente a la derecha',
  },
};

export const DEMO_STRINGS: Record<EagamiLocale, DemoStrings> = {
  en,
  'fr-FR': frFR,
  el,
  pl,
  'es-ES': esES,
};

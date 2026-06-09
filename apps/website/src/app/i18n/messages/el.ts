import type { WebMessages } from '../web-messages.types';

export const el: WebMessages = {
  common: {
    skipToContent: 'Μετάβαση στο κύριο περιεχόμενο',
    brandHome: 'Αρχική eagami',
    navUi: 'UI',
    navUiTooltip: 'Τεκμηρίωση της βιβλιοθήκης',
    themeToggleTooltip: 'Εναλλαγή θέματος',
    themeToggleLabel: next =>
      `Εναλλαγή σε ${next === 'light' ? 'φωτεινό' : 'σκοτεινό'} θέμα`,
    localeMenuLabel: 'Γλώσσα',
    localeMenuTooltip: 'Αλλαγή γλώσσας',
    activeLocale: label => `Τρέχουσα γλώσσα: ${label}`,
    footer: {
      copyright: year => `© ${year} eagami`,
      npmLink: 'npm',
      npmTooltip: 'Δείτε το @eagami/ui στο npm',
      githubAriaLabel: 'eagami στο GitHub',
      githubTooltip: 'Δείτε τον πηγαίο κώδικα στο GitHub',
      navLabel: 'Υποσέλιδο',
    },
    codeSnippet: {
      copyLabel: 'Αντιγραφή στο πρόχειρο',
      copySuccess: 'Αντιγράφηκε στο πρόχειρο',
      copyError: 'Αποτυχία αντιγραφής στο πρόχειρο',
    },
  },
  home: {
    metaTitle: 'Eagami',
    metaDescription: 'Κομψός σχεδιασμός ιστού',
    hero: {
      tagline: 'κομψός σχεδιασμός ιστού.',
      ctaPrimary: 'Επικοινωνία',
      ctaSecondary: 'Δείτε πρόσφατα έργα →',
      scrollHint: 'Κύλιση στις υπηρεσίες',
    },
    services: {
      title: 'Υπηρεσίες',
      lede: 'Από μια απλή σελίδα προορισμού έως μια ολοκληρωμένη εφαρμογή ιστού, και ό,τι ακολουθεί μετά τη δημοσίευση.',
      featuresHeading: 'Χαρακτηριστικά',
      uiNote: {
        before: 'Τα μεγαλύτερα έργα μπορούν να χτιστούν πάνω στο',
        link: 'Eagami UI',
        after:
          ', μια προσαρμοσμένη βιβλιοθήκη συστατικών και σύστημα σχεδίασης, για μια συνεπή και σύγχρονη οπτική γλώσσα σε όλη τη σελίδα.',
      },
      core: [
        {
          title: 'Προσαρμοσμένοι ιστότοποι',
          description:
            'Ένας ολοκληρωμένος ιστότοπος, χτισμένος από την αρχή: ρύθμιση τομέα, φιλοξενία, branding, σχεδιασμός και δημοσίευση. Απεριόριστες αναθεωρήσεις μέχρι την ημέρα κυκλοφορίας.',
        },
        {
          title: 'Συνεχής συντήρηση',
          description:
            'Μηνιαία συντήρηση που καλύπτει τη φιλοξενία, τις διορθώσεις ασφαλείας, τις αναβαθμίσεις εξαρτήσεων, τις τροποποιήσεις περιεχομένου και την επισκόπηση των αναλυτικών στοιχείων.',
        },
      ],
      addOns: [
        {
          title: 'Διαχείριση χρηστών',
          description:
            'Έλεγχος ταυτότητας χρήστη, εγγραφή και ανάκτηση κωδικού, καθώς και πίνακας διαχειριστή με μετρήσεις και ελέγχους ανά χρήστη.',
          iconSlug: 'users',
        },
        {
          title: 'Επεξεργασία πληρωμών',
          description:
            'Διαδικτυακές πληρωμές (Stripe ως προεπιλογή, άλλοι πάροχοι κατόπιν αιτήματος), με προσαρμόσιμες φόρμες πληρωμής και επαναλαμβανόμενη χρέωση.',
          iconSlug: 'credit-card',
        },
        {
          title: 'Πολυγλωσσική υποστήριξη',
          description:
            'Υποστήριξη για πολλές γλώσσες, με προαιρετική αυτόματη ανίχνευση από τον φυλλομετρητή του επισκέπτη.',
          iconSlug: 'globe',
        },
        {
          title: 'Θέματα',
          description:
            'Εναλλαγή φωτεινού/σκοτεινού θέματος και πλήρως προσαρμόσιμες παλέτες χρωμάτων.',
          iconSlug: 'moon',
        },
        {
          title: 'Στατιστικά και πληροφορίες',
          description:
            'Μετρήσεις επισκεψιμότητας του ιστότοπου (πηγές, συσκευές, τοποθεσίες), καθώς και προσαρμοσμένη παρακολούθηση συμβάντων.',
          iconSlug: 'bar-chart',
        },
        {
          title: 'E-mail και ειδοποιήσεις',
          description:
            'Αυτοματοποιημένα e-mail για δραστηριότητα λογαριασμού, αποδείξεις και ανακοινώσεις.',
          iconSlug: 'mail',
        },
      ],
    },
    projects: {
      title: 'Πρόσφατα έργα',
      lede: 'Μερικοί ιστότοποι σε ενεργή ανάπτυξη.',
      previousAriaLabel: 'Προηγούμενα έργα',
      nextAriaLabel: 'Επόμενα έργα',
      regionAriaLabel: 'Πρόσφατα έργα',
      showing: title => `Εμφάνιση: ${title}`,
      cards: [
        {
          title: 'London Chess',
          description:
            'Ένας κόμβος για το London Chess Club και τις σκακιστικές εκδηλώσεις στο London, ON.',
          url: 'https://londonchess.ca',
          display: 'londonchess.ca',
          logo: 'assets/projects/londonchess.svg',
        },
        {
          title: 'CIRC Aesthetics',
          description:
            'Κλινική Επεμβατικής Καλλωπιστικής Ακτινολογίας με έδρα το London, ON.',
          url: 'https://circaesthetics.ca',
          display: 'circaesthetics.ca',
          logo: 'assets/projects/circaesthetics.svg',
        },
        {
          title: 'Brewski Bets',
          description:
            'Ένας καταγραφέας για ανεπίσημα στοιχήματα μεταξύ φίλων, με μπύρα ως πληρωμή.',
          url: 'https://brewskibets.com',
          display: 'brewskibets.com',
          logo: 'assets/projects/brewskibets.svg',
        },
        {
          title: 'Chordbomb',
          description: 'Έρχεται σύντομα…',
          url: 'https://chordbomb.com',
          display: 'chordbomb.com',
          logo: 'assets/projects/chordbomb.svg',
        },
      ],
    },
    contact: {
      title: 'Έχετε ένα έργο κατά νου;',
      lede: 'Ας το ακούσουμε!',
      success: 'Το μήνυμα παραλήφθηκε. Θα ακολουθήσει σύντομα απάντηση.',
      nameLabel: 'Όνομα',
      namePlaceholder: 'Το όνομά σας',
      emailLabel: 'E-mail',
      emailPlaceholder: 'esas@paradeigma.com',
      emailInvalid: 'Παρακαλώ εισαγάγετε μια έγκυρη διεύθυνση e-mail',
      messageLabel: 'Μήνυμα',
      placeholderHints: [
        'Γεια! Δουλεύω πάνω σε ένα προσωπικό έργο και θα ήθελα βοήθεια στο frontend…',
        'Ψάχνω κάποιον να φτιάξει έναν ιστότοπο για τη μικρή μας επιχείρηση…',
        'Μια γρήγορη ερώτηση για τη βιβλιοθήκη συστατικών πριν ξεκινήσω…',
      ],
      submit: 'Αποστολή μηνύματος',
      sentToast: 'Το μήνυμα στάλθηκε',
      errorMessage:
        'Συγγνώμη, κάτι πήγε στραβά. Παρακαλώ στείλτε e-mail απευθείας στο michal@eagami.com.',
    },
  },
  notFound: {
    metaTitle: 'Eagami | 404',
    metaDescription: 'Η σελίδα δεν βρέθηκε.',
    eyebrow: '404',
    title: 'Η σελίδα δεν βρέθηκε',
    lede: 'Η σελίδα που αναζητούσατε δεν υπάρχει ή έχει μετακινηθεί.',
    cta: 'Επιστροφή στην αρχική',
  },
  ui: {
    metaTitle: 'Eagami | UI',
    shell: {
      sidebarLabel: 'Πλευρική στήλη τεκμηρίωσης',
      navLabel: 'Τεκμηρίωση',
      overview: 'Επισκόπηση',
      setup: 'Εγκατάσταση',
      designTokens: 'Tokens σχεδίασης',
      icons: 'Εικονίδια',
      i18n: 'Διεθνοποίηση',
      components: 'Συστατικά',
    },
    index: {
      metaTitle: 'Eagami | UI',
      metaDescription:
        'Ελαφριά, προσβάσιμη βιβλιοθήκη συστατικών Angular, χτισμένη πάνω σε προσαρμοσμένες ιδιότητες CSS.',
      title: 'Eagami UI',
      ledeBefore: 'είναι μια ελαφριά, προσβάσιμη βιβλιοθήκη συστατικών Angular.',
      ledeAfter:
        'Λογικές προεπιλογές εκτός κουτιού, με πλήρως προσαρμόσιμο σχεδιασμό για να ταιριάζει σε οποιαδήποτε μάρκα.',
      principlesHeading: 'Αρχές σχεδίασης',
      principles: [
        {
          title: 'Προσβάσιμο',
          body: 'Πλοήγηση με πληκτρολόγιο, διαχείριση εστίασης, υποστήριξη αναγνωστών οθόνης και χειρισμός μειωμένης κίνησης ενσωματώνονται σε κάθε συστατικό.',
        },
        {
          title: 'Ελαφρύ',
          body: 'Κάθε συστατικό εισάγεται ανεξάρτητα και το πακέτο περιλαμβάνει μόνο όσα χρησιμοποιείτε.',
        },
        {
          title: 'Με δυνατότητα θέματος',
          body: 'Πλήρως προσαρμόσιμο μέσω tokens σχεδίασης, διατηρώντας μια ενιαία εμφάνιση σε κάθε σελίδα. Οι παραλλαγές φωτεινού και σκοτεινού στέλνονται μαζί και ακολουθούν εξ ορισμού την προτίμηση συστήματος του χρήστη.',
        },
        {
          title: 'Τοπικοποιημένο',
          body: 'Τα ενσωματωμένα κείμενα των συστατικών είναι διαθέσιμα σε αγγλικά, γαλλικά, ελληνικά, πολωνικά και ισπανικά.',
        },
        {
          title: 'Σύγχρονο',
          body: 'Τακτικές ενημερώσεις με τα τελευταία χαρακτηριστικά του Angular και τα σύγχρονα πρότυπα ιστού.',
        },
        {
          title: 'Χωρίς δεσμεύσεις',
          body: 'Κάθε συστατικό είναι απλό Angular και CSS χωρίς εξάρτηση από προμηθευτή, οπότε ο πηγαίος κώδικας μπορεί να διαβαστεί, να αντιγραφεί ή να τροποποιηθεί όπως κάθε άλλος κώδικας στο έργο σας.',
        },
      ],
      getStartedHeading: 'Ξεκινήστε',
      getStartedBefore: 'Πηγαίνετε στην',
      getStartedLink: 'Εγκατάσταση',
      getStartedAfter:
        ' για να εγκαταστήσετε το πακέτο και να συνδέσετε το καθολικό φύλλο στυλ.',
    },
    setup: {
      metaTitle: 'Eagami | UI | Εγκατάσταση',
      metaDescription:
        'Εγκαταστήστε το @eagami/ui και συνδέστε το καθολικό φύλλο στυλ και τις γραμματοσειρές.',
      title: 'Εγκατάσταση',
      installLabel: 'Εγκαταστήστε το πακέτο:',
      or: 'ή',
      stylesheetLabel: {
        before: 'Προσθέστε το καθολικό φύλλο στυλ στο',
        after: ':',
      },
      fontsLabel: {
        before: 'Φορτώστε τις γραμματοσειρές στο',
        after: ':',
      },
      firstComponentHeading: 'Το πρώτο σας συστατικό',
    },
    tokens: {
      metaTitle: 'Eagami | UI | Tokens σχεδίασης',
      metaDescription:
        'Προσαρμοσμένες ιδιότητες CSS για χρώματα, τυπογραφία, αποστάσεις, ανύψωση, σχήμα και κίνηση.',
      title: 'Tokens σχεδίασης',
      lede: 'Οι προσαρμοσμένες ιδιότητες CSS που οδηγούν κάθε συστατικό της βιβλιοθήκης: χρώματα, τυπογραφία, αποστάσεις, ανύψωση, σχήμα και κίνηση. Αναφέρετε αυτά τα tokens στα δικά σας στυλ μέσω <code>var(--token-name)</code> για να διατηρήσετε την οπτική συνέπεια σε όλη την εφαρμογή.',
      sections: {
        theming: 'Θέματα',
        palette: 'Παλέτα μάρκας',
        colors: 'Χρώματα',
        typography: 'Τυπογραφία',
        spacing: 'Αποστάσεις',
        elevation: 'Ανύψωση',
        shape: 'Σχήμα',
        motion: 'Κίνηση',
      },
      themingRootBefore:
        'Παρακάμψτε οποιοδήποτε token στο <code>:root</code> για να αλλάξετε το θέμα όλης της βιβλιοθήκης:',
      themingScopedBefore:
        'Ή περιορίστε τις παρακάμψεις σε μεμονωμένα συστατικά όπου είναι χρήσιμο:',
      paletteIntro:
        'Περάστε ένα μοναδικό hex μάρκας στο <code>provideEagamiUi</code> και η βιβλιοθήκη παράγει μια πλήρη κλίμακα δέκα αποχρώσεων (50 έως 900) στον χώρο <a href="https://www.w3.org/TR/css-color-4/#ok-lab" target="_blank" rel="noopener noreferrer"><span>OKLCH</span></a>, κρατώντας απόχρωση και κορεσμό σταθερά ενώ μεταβάλλει τη φωτεινότητα. Οι παραγόμενες αποχρώσεις τροφοδοτούν κάθε token <code>--color-brand-*</code> τόσο σε ανοιχτό όσο και σε σκούρο μοντέλο:',
      paletteOverrides:
        'Καρφιτσώστε συγκεκριμένες αποχρώσεις ή αντιστοιχίστε ποιά παραγόμενη απόχρωση υποστηρίζει κάθε σημασιολογικό ρόλο:',
      paletteContrast:
        'Κάθε ζευγάρι ρόλων μάρκας (κείμενο πάνω σε επιφάνεια, επιφάνεια πάνω σε καμβά) ελέγχεται έναντι του WCAG 2.1 AA στην εκκίνηση. Ένας μη συμβατός συνδυασμός ρίχνει σφάλμα πριν φορτώσει η εφαρμογή, οπότε ένα bug αντίθεσης στο χρώμα της μάρκας πιάνεται στο boot και όχι στην παραγωγή.',
      elevationDrop: 'Σκιές πτώσης',
      elevationRelief: 'Ανάγλυφο και βαθούλωμα',
      elevationReliefBefore:
        'Το <code>--shadow-bevel</code> συνδυάζει μια εσωτερική λάμψη (πάνω) με μια εσωτερική σκιά (κάτω) για επιφάνειες που πρέπει να φαίνονται ανυψωμένες. Το <code>--shadow-well</code> αντιστρέφει τον φωτισμό για μια εμφάνιση εσοχής. Συνδυάστε με <code>--shadow-*</code> για περιβάλλουσα σκιά: <code>box-shadow: var(--shadow-bevel), var(--shadow-sm);</code>',
      colorsPrimary: 'Κύριο',
      colorsSecondary: 'Δευτερεύον',
      colorsNeutral: 'Ουδέτερο',
      colorsStatus: 'Κατάσταση',
      colorsSemantic: 'Σημασιολογικό',
      typographyComposites: 'Σύνθετα στυλ',
      typographyCompositesBefore:
        'Τα σύνθετα tokens συγκεντρώνουν μέγεθος, βάρος, ύψος γραμμής (και ενίοτε οικογένεια) για έναν συγκεκριμένο ρόλο. Το <code>--text-section-heading-*</code> είναι το πρώτο σύνθετο που καρφιτσώνει οικογένεια — χρησιμοποιήστε το για τους τίτλους <code>&lt;h2&gt;</code> υποενοτήτων σε σελίδες τεκμηρίωσης και μάρκετινγκ.',
      typographySectionHeadingSample: 'Επικεφαλίδα ενότητας σε φωνή μάρκας',
      typographyFamilies: 'Οικογένειες',
      typographySizes: 'Μεγέθη',
      typographyWeights: 'Πάχη',
      motionSimulate: 'Προσομοίωση',
      motionDurations: 'Διάρκειες',
      motionEasings: 'Καμπύλες',
    },
    icons: {
      metaTitle: 'Eagami | UI | Εικονίδια',
      metaDescription: 'Σύνολο εικονιδίων που συνοδεύει το @eagami/ui.',
      title: 'Εικονίδια',
      lede: 'Αυτόνομα συστατικά Angular που κληρονομούν το χρώμα τους και προσαρμόζονται στο <code>font-size</code>, ώστε να αποδίδονται σε οποιοδήποτε μέγεθος. Τα περισσότερα προέρχονται από τα <a href="https://feathericons.com/" target="_blank" rel="noopener noreferrer"><span>Feather Icons</span></a> του <a href="https://github.com/colebemis" target="_blank" rel="noopener noreferrer"><span>Cole Bemis</span></a> υπό την <a href="https://github.com/feathericons/feather/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><span>άδεια MIT</span></a>· τα υπόλοιπα είναι πρωτότυπα εικονίδια του Eagami UI. Τα εικονίδια Feather μπορούν επίσης να σχεδιαστούν με λεπτότερες ή παχύτερες γραμμές. Κάντε κλικ σε ένα εικονίδιο για να αντιγράψετε τον επιλογέα του.',
      filterLabel: 'Φιλτράρισμα εικονιδίων',
      filterPlaceholder: 'Αναζήτηση εικονιδίων',
      filterClearLabel: 'Καθαρισμός αναζήτησης',
      categoryFeather: 'Feather',
      categoryEagami: 'Eagami UI',
      categoryBrand: 'Μάρκα',
      countAll: count => `${count} εικονίδια`,
      countFiltered: (shown, total) => `${shown} από ${total} εικονίδια`,
      noResults: 'Κανένα εικονίδιο δεν ταιριάζει με την αναζήτησή σας',
      copiedToast: selector => `Αντιγράφηκε «${selector}» στο πρόχειρο`,
      copyFailedToast: selector =>
        `Δεν ήταν δυνατή η αντιγραφή του «${selector}» στο πρόχειρο`,
      brandTitle: 'Εικονίδια μαρκών',
      brandIntro:
        'Τα εικονίδια μαρκών στον παρακάτω κατάλογο απεικονίζουν εμπορικά σήματα τρίτων και παρέχονται μόνο για ονομαστική χρήση, δηλαδή για την αναγνώριση της μάρκας που εκπροσωπούν σε μια διεπαφή (ένα κουμπί «Σύνδεση με Google», ένας σύνδεσμος «Κοινοποίηση στο Facebook» κ.ο.κ.). Δεν παραχωρούνται για γενική διακοσμητική χρήση. Οι καταναλωτές είναι υπεύθυνοι για την τήρηση των οδηγιών κάθε μάρκας:',
      brandLinkLabel: 'Πόροι μάρκας',
    },
    i18n: {
      metaTitle: 'Eagami | UI | Διεθνοποίηση',
      metaDescription:
        'Ενσωματωμένα κείμενα συστατικών σε πέντε γλώσσες, με εναλλαγή κατά την εκτέλεση και παρακάμψεις ανά συμβολοσειρά.',
      title: 'Διεθνοποίηση',
      lede: 'Κάθε ενσωματωμένη συμβολοσειρά (ετικέτες ARIA, σύμβολα κράτησης θέσης, κενές καταστάσεις, χειριστήρια επιλογέα ημερομηνίας) στέλνεται σε πέντε γλώσσες. Ορίστε μία για όλη την εφαρμογή, αλλάξτε κατά την εκτέλεση ή παρακάμψτε μεμονωμένες συμβολοσειρές.',
      supportedHeading: 'Υποστηριζόμενες γλώσσες',
      supportedFallback:
        'Άγνωστες γλώσσες επιστρέφουν στα αγγλικά, όπως και τυχόν κλειδιά που λείπουν από μια μερική παράκαμψη.',
      quickSetupHeading: 'Γρήγορη εγκατάσταση',
      quickSetupBefore:
        'Προσθέστε το <code>provideEagamiUi()</code> στη διαμόρφωση της εφαρμογής σας. Χωρίς ορίσματα, η προεπιλογή είναι τα αγγλικά, οπότε η κλήση είναι προαιρετική εκτός εάν θέλετε διαφορετική αρχική γλώσσα.',
      liveDemoHeading: 'Ζωντανή επίδειξη',
      liveDemoIntro:
        'Επιλέξτε μια γλώσσα και παρακολουθήστε τα παρακάτω συστατικά να υιοθετούν τις αντίστοιχες συμβολοσειρές και τη μορφοποίηση ημερομηνίας.',
      runtimeSwitchHeading: 'Εναλλαγή κατά την εκτέλεση',
      runtimeSwitchBefore:
        'Εισαγάγετε το <code>EagamiI18nService</code> και καλέστε <code>setLocale()</code>. Η ενεργή γλώσσα είναι σήμα, οπότε κάθε συστατικό αποδίδεται ξανά με τις νέες συμβολοσειρές χωρίς ανανέωση.',
      perStringHeading: 'Παρακάμψεις ανά συμβολοσειρά',
      perStringBefore:
        'Περάστε ένα αντικείμενο <code>messages</code> μαζί με τη γλώσσα για να αντικαταστήσετε μεμονωμένες συμβολοσειρές. Ό,τι παραλείψετε επιστρέφει στις προεπιλογές της γλώσσας.',
      perStringAfter:
        'Τα περισσότερα συστατικά εκθέτουν επίσης μεμονωμένες εισόδους μηνυμάτων (π.χ. <code>placeholder</code> στο <code>&lt;ea-dropdown&gt;</code>) για περιστασιακές παρακάμψεις στη θέση κλήσης.',
      frenchSpacingHeading: 'Βοήθημα γαλλικού διαστήματος',
      frenchSpacingBody:
        'Η γαλλική τυπογραφία απαιτεί ένα στενό αδιάσπαστο διάστημα πριν από τα <code>? ! : ; »</code> και μετά το <code>«</code>. Το εξαγόμενο βοήθημα <code>frenchSpacing()</code> μετατρέπει τα κανονικά διαστήματα στις δικές σας γαλλικές συμβολοσειρές (η βιβλιοθήκη χειρίζεται εσωτερικά τα δικά της γαλλικά μηνύματα).',
      demoLocaleLabel: 'Γλώσσα',
      demoAppointmentLabel: 'Ραντεβού',
      demoFruitLabel: 'Φρούτο',
    },
    component: {
      metaDescription: name => `Αναφορά και ζωντανές επιδείξεις του συστατικού ${name}.`,
      demoHeading: 'Επίδειξη',
      notFoundTitle: 'Το συστατικό δεν βρέθηκε',
      notFoundBody: 'Επιλέξτε ένα συστατικό από την πλευρική στήλη ή',
      notFoundLink: 'επιστρέψτε στην εισαγωγή',
      sectionHeadings: {
        basic: 'βασικό',
        variants: 'παραλλαγές',
        sizes: 'μεγέθη',
        states: 'καταστάσεις',
        disabled: 'απενεργοποιημένο',
        dismissible: 'απορρίψιμο',
        clearable: 'καθαριζόμενο',
        hintAndError: 'υπόδειξη και σφάλμα',
        withHint: 'με υπόδειξη',
        withError: 'με σφάλμα',
        withLabel: 'με ετικέτα',
        withIcons: 'με εικονίδια',
        withFooter: 'με υποσέλιδο',
        withPaginator: 'με paginator',
        withDisabledItem: 'με απενεργοποιημένο στοιχείο',
        withDisabledTab: 'με απενεργοποιημένη καρτέλα',
        required: 'υποχρεωτικό',
        requiredWithHint: 'υποχρεωτικό με υπόδειξη',
        horizontal: 'οριζόντιο',
        vertical: 'κατακόρυφο',
        single: 'μονό',
        multi: 'πολλαπλό',
        circle: 'κύκλος',
        square: 'τετράγωνο',
        shapes: 'σχήματα',
        shapesAndFallbacks: 'σχήματα και εναλλακτικά',
        chevronSeparator: 'διαχωριστικό βέλος',
        slashSeparator: 'διαχωριστικό κάθετος',
        twoLevels: 'δύο επίπεδα',
        fourDigitPin: 'PIN 4 ψηφίων',
        defaultHeading: 'προεπιλογή',
        stripedAndBordered: 'ριγέ και πλαισιωμένο',
        compactDensity: 'συμπαγής πυκνότητα',
        tinyList: 'μικρή λίστα',
        stickyHeader: 'σταθερή κεφαλίδα',
        emptyState: 'κενή κατάσταση',
        formatVariants: 'παραλλαγές μορφής',
        minMax: 'ελάχ. και μέγ.',
        positions: 'θέσεις',
        trigger: 'ενεργοποιητής',
        alignLeft: 'στοίχιση αριστερά',
        alignCenter: 'στοίχιση κέντρο',
        manyPages: 'πολλές σελίδες',
        minimal: 'ελάχιστο',
        indeterminate: 'αόριστο',
        noResize: 'χωρίς αλλαγή μεγέθους',
        resizing: 'αλλαγή μεγέθους',
        disabledAndReadonly: 'απενεργοποιημένο και μόνο για ανάγνωση',
        password: 'κωδικός',
        autocompleteSection: 'αυτόματη συμπλήρωση',
        twoOptions: 'δύο επιλογές',
        fullWidth: 'πλήρες πλάτος',
        minLengthMaxResults: 'ελάχ. μήκος και μέγ. αποτελέσματα',
        removable: 'αφαιρούμενο',
        minMaxLabels: 'ετικέτες ελάχ./μέγ.',
        underline: 'υπογράμμιση',
        filled: 'γεμάτο',
        rect: 'ορθογώνιο',
        inlineLayout: 'διάταξη σε σειρά',
        noResults: 'χωρίς αποτελέσματα',
        titleOnly: 'μόνο τίτλος',
        iconTrigger: 'ενεργοποιητής εικονιδίου',
        placements: 'τοποθετήσεις',
        canvasSizes: 'μεγέθη καμβά',
        cappedChipCount: 'περιορισμένος αριθμός ετικετών',
        customIcon: 'προσαρμοσμένο εικονίδιο',
        customIconAndColor: 'προσαρμοσμένο εικονίδιο και χρώμα',
        customLabel: 'προσαρμοσμένη ετικέτα',
        halfSteps: 'μισά βήματα',
        customSize: 'προσαρμοσμένο μέγεθος',
        linearFlow: 'γραμμική ροή',
        manyLevels: 'πολλά επίπεδα',
        notAnimated: 'χωρίς κίνηση',
        numberOfStars: 'αριθμός αστεριών',
        minimumOne: 'ελάχιστο 1 αστέρι',
        outputFormats: 'μορφές εξόδου',
        quarterHourSteps: 'βήματα τετάρτου της ώρας',
        readonly: 'μόνο για ανάγνωση',
        singleFile: 'μεμονωμένο αρχείο',
        stepped: 'με βήματα',
        sundayStart: 'η εβδομάδα ξεκινά Κυριακή',
        twelveHourFormat: '12-ωρη μορφή',
        twoActions: 'δύο ενέργειες',
        withCompletedSteps: 'με ολοκληρωμένα βήματα',
        withConstraints: 'με περιορισμούς',
        withInitialValue: 'με αρχική τιμή',
        withMaxlength: 'με μέγιστο μήκος',
        withMaxHeight: 'με μέγιστο ύψος',
        withMinMaxLabels: 'με ετικέτες ελάχ./μέγ.',
        withOptionalStep: 'με προαιρετικό βήμα',
        withSeconds: 'με δευτερόλεπτα',
        withSelection: 'με επιλογή',
        withoutAlpha: 'χωρίς άλφα',
        withoutSearch: 'χωρίς αναζήτηση',
        withoutSelectAll: 'χωρίς «επιλογή όλων»',
        wrapping: 'αναδίπλωση',
      },
      common: {
        small: 'Μικρό',
        medium: 'Μεσαίο',
        large: 'Μεγάλο',
        cancel: 'Ακύρωση',
        save: 'Αποθήκευση',
        close: 'Κλείσιμο',
        confirm: 'Επιβεβαίωση',
        disabled: 'Απενεργοποιημένο',
        defaultLabel: 'Προεπιλογή',
        successLabel: 'Επιτυχία',
        warningLabel: 'Προειδοποίηση',
        errorLabel: 'Σφάλμα',
        infoLabel: 'Πληροφορία',
      },
      demos: {
        accordion: {
          whatLabel: 'Τι είναι το @eagami/ui;',
          whatBody:
            'Μια ελαφριά, προσβάσιμη βιβλιοθήκη συστατικών Angular, χτισμένη πάνω σε προσαρμοσμένες ιδιότητες CSS.',
          installLabel: 'Πώς το εγκαθιστώ;',
          installBody:
            'Εκτελέστε pnpm add @eagami/ui, και έπειτα προσθέστε το καθολικό φύλλο στυλ στο angular.json.',
          themeLabel: 'Μπορώ να προσαρμόσω το θέμα;',
          themeBody:
            'Ναι, παρακάμψτε οποιαδήποτε προσαρμοσμένη ιδιότητα CSS στο :root ή περιορίστε τις παρακάμψεις σε μεμονωμένα συστατικά.',
          sectionOneLabel: 'Ενότητα ένα',
          sectionOneBody:
            'Στην πολλαπλή λειτουργία μπορούν να είναι ανοιχτές πολλές ενότητες ταυτόχρονα.',
          sectionTwoLabel: 'Ενότητα δύο',
          sectionTwoBody: 'Περιεχόμενο για την ενότητα δύο.',
          disabledSectionLabel: 'Απενεργοποιημένη ενότητα',
          disabledSectionBody: 'Αυτό το περιεχόμενο δεν είναι προσβάσιμο.',
        },
        alert: {
          defaultText: 'Αυτή είναι μια προεπιλεγμένη ειδοποίηση',
          successText: 'Οι αλλαγές αποθηκεύτηκαν',
          warningText: 'Η δοκιμαστική περίοδος λήγει σε 3 ημέρες',
          errorText: 'Κάτι πήγε στραβά, δοκιμάστε ξανά',
          infoText: 'Διατίθεται μια νέα έκδοση',
          dismissibleText: 'Αυτή η ειδοποίηση μπορεί να απορριφθεί',
          tooltipSuppressed:
            'Οι υποδείξεις απενεργοποιούνται σε συσκευές αφής για αποφυγή κολλημένης συμπεριφοράς αιώρησης. Δείτε αυτή την ενότητα σε συσκευή με ποντίκι για να δείτε τις επιδείξεις σε δράση.',
        },
        autocomplete: {
          startTyping: 'Ξεκινήστε να πληκτρολογείτε…',
          hintText: 'Ξεκινήστε να πληκτρολογείτε για να δείτε αντιστοιχίες',
          errorText: 'Παρακαλώ επιλέξτε μια ράτσα σκύλου',
          breedPlaceholder: 'Ράτσα σκύλου…',
          minMaxLabel: 'Ελάχ. 2 χαρακτήρες, μέγ. 3 αποτελέσματα',
          minMaxPlaceholder: 'Πληκτρολογήστε τουλάχιστον 2 χαρακτήρες…',
        },
        avatarEditor: {
          result: 'Αποτέλεσμα:',
        },
        badge: {
          successText: 'Ενεργό',
          warningText: 'Σε εκκρεμότητα',
          newText: 'Νέο',
        },
        button: {
          primary: 'Πρωτεύον',
          secondary: 'Δευτερεύον',
          ghost: 'Φάντασμα',
          danger: 'Κίνδυνος',
          toggleLoading: 'Εναλλαγή φόρτωσης',
          fullWidth: 'Πλήρες πλάτος',
          clickedToast: 'Πατήθηκε το κουμπί!',
        },
        card: {
          elevatedHeader: 'Ανυψωμένη',
          elevatedBody: 'Κάρτα με σκιά ανύψωσης.',
          outlinedHeader: 'Με περίγραμμα',
          outlinedBody: 'Κάρτα με περίγραμμα.',
          filledHeader: 'Γεμάτη',
          filledBody: 'Κάρτα με διακριτικό φόντο.',
          cardTitleHeader: 'Τίτλος κάρτας',
          cardWithFooterBody:
            'Αυτή η κάρτα έχει κεφαλίδα, σώμα και υποσέλιδο με ενέργειες.',
        },
        checkbox: {
          acceptTermsAndConditions: 'Αποδοχή όρων και προϋποθέσεων',
          disabledChecked: 'Απενεργοποιημένο και επιλεγμένο',
          indeterminate: 'Αόριστο',
          iAgreeToTerms: 'Συμφωνώ με τους όρους',
          subscribeToUpdates: 'Εγγραφή για ενημερώσεις',
          subscribeHint: 'Στέλνεται μηνιαία περίληψη, χωρίς ανεπιθύμητα',
          acceptTermsLabel: 'Αποδοχή όρων',
          acceptTermsError: 'Οι όροι πρέπει να γίνουν αποδεκτοί για να συνεχίσετε',
        },
        codeInput: {
          verificationCodeLabel: 'Κωδικός επαλήθευσης',
          verificationCodeHint: 'Ελέγξτε το e-mail σας για τον κωδικό 6 ψηφίων',
          verificationCodeError: 'Μη έγκυρος κωδικός επαλήθευσης',
          pinLabel: 'PIN',
          pinHint: 'Εισαγάγετε το PIN 4 ψηφίων σας',
        },
        colorPicker: {
          brandLabel: 'Χρώμα μάρκας',
          hintBrandColor: 'Χρησιμοποιείται ως κύριο χρώμα της μάρκας',
          errorRequired: 'Αυτό το πεδίο είναι υποχρεωτικό',
          hexLabel: 'Μορφή HEX',
          rgbLabel: 'Μορφή RGB',
          hslLabel: 'Μορφή HSL',
          noAlphaHeading: 'Μόνο αδιαφανές',
          opaqueOnlyLabel: 'Συμπαγές χρώμα',
        },
        dataTable: {
          tableColumnId: 'ID',
          tableColumnFirstName: 'Όνομα',
          tableColumnLastName: 'Επώνυμο',
          tableColumnAdmin: 'Διαχ.',
          tableColumnPosts: 'Αναρτήσεις',
        },
        datePicker: {
          appointmentLabel: 'Ραντεβού',
          pickDatePlaceholder: 'Επιλέξτε ημερομηνία…',
          hintAnyFutureDate: 'Επιλέξτε οποιαδήποτε μελλοντική ημερομηνία',
          errorRequired: 'Αυτό το πεδίο είναι υποχρεωτικό',
          shortLabel: 'Σύντομη',
          mediumLabel: 'Μεσαία',
          longLabel: 'Μεγάλη',
          withinNextWeeksLabel: 'Εντός των επόμενων 3 εβδομάδων',
          withinNextWeeksHint: '±1 εβδομάδα / +3 εβδομάδες από σήμερα',
        },
        dialog: {
          openButton: 'Άνοιγμα διαλόγου',
          title: 'Τίτλος διαλόγου',
          body: 'Αυτό είναι το σώμα του διαλόγου. Υποστηρίζει οποιοδήποτε περιεχόμενο, συμπεριλαμβανομένων φορμών, κειμένου και άλλων συστατικών.',
        },
        divider: {
          orLabel: 'ή',
          sectionLabel: 'Ενότητα',
          leftLabel: 'Αριστερά',
          rightLabel: 'Δεξιά',
        },
        drawer: {
          rightButton: 'Δεξιά',
          leftButton: 'Αριστερά',
          topButton: 'Πάνω',
          bottomButton: 'Κάτω',
          rightTitle: 'Δεξί συρτάρι',
          rightBody: 'Σύρεται από τη δεξιά άκρη, χρήσιμο για πάνελ λεπτομερειών.',
          leftTitle: 'Αριστερό συρτάρι',
          leftBody: 'Σύρεται από τα αριστερά, χρήσιμο για μενού πλοήγησης.',
          topTitle: 'Πάνω συρτάρι',
          topBody: 'Κατεβαίνει από πάνω, χρήσιμο για ειδοποιήσεις.',
          bottomTitle: 'Κάτω συρτάρι',
          bottomBody: 'Ανεβαίνει από κάτω, συνηθισμένο σε κινητά για φύλλα ενεργειών.',
        },
        dropdown: {
          fruitLabel: 'Φρούτο',
          fruitPlaceholder: 'Επιλέξτε ένα φρούτο…',
          hintFavourite: 'Επιλέξτε το αγαπημένο σας',
          errorRequired: 'Αυτό το πεδίο είναι υποχρεωτικό',
          selectPlaceholder: 'Επιλέξτε…',
        },
        emptyState: {
          noItemsTitle: 'Δεν υπάρχουν ακόμη στοιχεία',
          noItemsDescription: 'Ξεκινήστε δημιουργώντας το πρώτο σας στοιχείο.',
          createItem: 'Δημιουργία στοιχείου',
          noResultsTitle: 'Δεν βρέθηκαν αποτελέσματα',
          noResultsDescription:
            'Δοκιμάστε να προσαρμόσετε την αναζήτηση ή το φίλτρο σας για να βρείτε αυτό που ψάχνετε.',
          clearFilters: 'Καθαρισμός φίλτρων',
          nothingHereTitle: 'Τίποτα για να δείτε εδώ',
        },
        fileUploader: {
          attachmentsLabel: 'Συνημμένα',
          imagesLabel: 'Μεταφόρτωση εικόνων',
          imagesHint: 'PNG ή JPEG, έως 2 MB το καθένα, έως 4 αρχεία',
          resumeLabel: 'Μεταφόρτωση βιογραφικού',
          customIconLabel: 'Επισύναψη αρχείων',
          withHintHint: 'Έως 10 MB ανά αρχείο',
          withErrorText: 'Απαιτείται τουλάχιστον μία εικόνα',
        },
        input: {
          defaultLabel: 'Προεπιλογή',
          enterTextPlaceholder: 'Εισαγάγετε κείμενο…',
          hintGuidance: 'Χρήσιμη καθοδήγηση εδώ',
          errorRequired: 'Αυτό το πεδίο είναι υποχρεωτικό',
          readonlyLabel: 'Μόνο για ανάγνωση',
          readonlyValue: 'Τιμή μόνο για ανάγνωση',
          passwordLabel: 'Κωδικός πρόσβασης',
          passwordPlaceholder: 'Εισαγάγετε τον κωδικό σας…',
          passwordNoToggleLabel: 'Κωδικός (διακόπτης κρυφός)',
          passwordNoTogglePlaceholder: 'Χωρίς διακόπτη ορατότητας',
          emailLabel: 'E-mail',
          emailPlaceholder: 'esas@paradeigma.com',
        },
        menu: {
          actions: 'Ενέργειες',
          edit: 'Επεξεργασία',
          duplicate: 'Διπλασιασμός',
          archive: 'Αρχειοθέτηση',
          delete: 'Διαγραφή',
          file: 'Αρχείο',
          moreOptionsLabel: 'Περισσότερες επιλογές',
          view: 'Προβολή',
          rename: 'Μετονομασία',
          newItem: 'Νέο',
          open: 'Άνοιγμα',
          saveUnavailable: 'Αποθήκευση (μη διαθέσιμη)',
          saveAs: 'Αποθήκευση ως',
        },
        popover: {
          openLabel: 'Άνοιγμα popover',
          basicContent:
            'Μια αιωρούμενη επιφάνεια αγκιστρωμένη στο στοιχείο ενεργοποίησής της. Χρησιμοποίησέ την ως δομικό στοιχείο για μενού, αναπτυσσόμενες λίστες και προσαρμοσμένα επιστρώματα.',
          placementTopLabel: 'top',
          placementTopStartLabel: 'top-start',
          placementTopEndLabel: 'top-end',
          placementBottomLabel: 'bottom',
          placementBottomStartLabel: 'bottom-start',
          placementBottomEndLabel: 'bottom-end',
          placementLeftLabel: 'left',
          placementRightLabel: 'right',
          placementTopContent: 'Κεντραρισμένη πάνω από το στοιχείο ενεργοποίησης',
          placementTopStartContent:
            'Πάνω από το στοιχείο ενεργοποίησης, ευθυγραμμισμένη με την αριστερή του ακμή',
          placementTopEndContent:
            'Πάνω από το στοιχείο ενεργοποίησης, ευθυγραμμισμένη με τη δεξιά του ακμή',
          placementBottomContent: 'Κεντραρισμένη κάτω από το στοιχείο ενεργοποίησης',
          placementBottomStartContent:
            'Κάτω από το στοιχείο ενεργοποίησης, ευθυγραμμισμένη με την αριστερή του ακμή',
          placementBottomEndContent:
            'Κάτω από το στοιχείο ενεργοποίησης, ευθυγραμμισμένη με τη δεξιά του ακμή',
          placementLeftContent: 'Κεντραρισμένη αριστερά από το στοιχείο ενεργοποίησης',
          placementRightContent: 'Κεντραρισμένη δεξιά από το στοιχείο ενεργοποίησης',
        },
        progressBar: {
          processing: 'Επεξεργασία…',
        },
        radio: {
          appleLabel: 'Μήλο',
          bananaLabel: 'Μπανάνα',
          cherryLabel: 'Κεράσι',
          optionALabel: 'Επιλογή Α',
          optionBLabel: 'Επιλογή Β',
          subscriptionPlanLabel: 'Πρόγραμμα συνδρομής',
          freeLabel: 'Δωρεάν',
          proLabel: 'Pro',
          enterpriseLabel: 'Enterprise',
          deliverySpeedLabel: 'Ταχύτητα παράδοσης',
          deliverySpeedHint: 'Επιλέξτε πόσο γρήγορα το θέλετε',
          standardLabel: 'Κανονική',
          expressLabel: 'Express',
          accountTypeLabel: 'Τύπος λογαριασμού',
          accountTypeError: 'Παρακαλώ επιλέξτε τύπο λογαριασμού',
          personalLabel: 'Προσωπικός',
          businessLabel: 'Επιχειρηματικός',
        },
        rating: {
          experienceLabel: 'Αξιολογήστε την εμπειρία σας',
          halfStepsLabel: 'Αξιολόγηση με μισά βήματα',
          halfStepsHint:
            'Κάντε κλικ στο αριστερό ή το δεξί μισό ενός αστεριού για βήματα 0,5.',
          readonlyLabel: 'Μέση αξιολόγηση',
          withHintHint: 'Πατήστε ένα αστέρι για να ορίσετε την αξιολόγηση',
          withErrorText: 'Απαιτείται αξιολόγηση',
          numberOfStarsLabel: 'Αξιολογήστε',
          customIconLabel: 'Πόσο σας αρέσει;',
        },
        segmented: {
          viewLabel: 'Προβολή',
          themeLabel: 'Θέμα',
          themeHint: 'Επηρεάζει ολόκληρη την εφαρμογή',
          layoutLabel: 'Διάταξη',
          layoutError: 'Η επιλογή διάταξης είναι υποχρεωτική',
          viewOptionList: 'Λίστα',
          viewOptionGrid: 'Πλέγμα',
          viewOptionKanban: 'Kanban',
          themeOptionLight: 'Φωτεινό',
          themeOptionDark: 'Σκοτεινό',
        },
        slider: {
          volumeLabel: 'Ένταση',
          brightnessLabel: 'Φωτεινότητα',
          withHintLabel: 'Με υπόδειξη',
          sliderHint: 'Σύρετε τη λαβή ή χρησιμοποιήστε τα βέλη για προσαρμογή',
          withErrorLabel: 'Με σφάλμα',
          sliderError: 'Παρακαλώ επιλέξτε τιμή μεγαλύτερη από 50',
        },
        switch: {
          enableNotificationsLabel: 'Ενεργοποίηση ειδοποιήσεων',
          disabledOnLabel: 'Απενεργοποιημένο ενεργό',
          confirmConsentLabel: 'Επιβεβαίωση συγκατάθεσης',
          marketingEmailsLabel: 'E-mail μάρκετινγκ',
          marketingEmailsHint: 'Δυνατότητα κατάργησης εγγραφής ανά πάσα στιγμή',
          twoFactorAuthLabel: 'Έλεγχος ταυτότητας δύο παραγόντων',
          twoFactorAuthError: 'Ο έλεγχος δύο παραγόντων πρέπει να είναι ενεργοποιημένος',
        },
        tabs: {
          account: 'Λογαριασμός',
          accountContent: 'Περιεχόμενο ρυθμίσεων λογαριασμού',
          security: 'Ασφάλεια',
          securityContent: 'Περιεχόμενο ρυθμίσεων ασφαλείας',
          notifications: 'Ειδοποιήσεις',
          notificationsContent: 'Προτιμήσεις ειδοποιήσεων',
          overview: 'Επισκόπηση',
          overviewContent: 'Περιεχόμενο επισκόπησης',
          analytics: 'Αναλυτικά',
          analyticsContent: 'Περιεχόμενο αναλυτικών',
          reports: 'Αναφορές',
          reportsContent: 'Περιεχόμενο αναφορών',
          general: 'Γενικά',
          generalContent: 'Γενικές ρυθμίσεις',
          billing: 'Χρέωση',
          billingContent: 'Λεπτομέρειες χρέωσης',
          admin: 'Διαχειριστής',
          adminContent: 'Πίνακας διαχειριστή',
        },
        tag: {
          disabledSuccess: 'Απενεργοποιημένη επιτυχία',
        },
        textarea: {
          messageLabel: 'Μήνυμα',
          messagePlaceholder: 'Εισαγάγετε το μήνυμά σας…',
          hintMaxCharacters: 'Έως 500 χαρακτήρες',
          errorRequired: 'Αυτό το πεδίο είναι υποχρεωτικό',
          fixedSizeLabel: 'Σταθερό μέγεθος',
          fixedSizePlaceholder: 'Δεν μπορεί να αλλάξει μέγεθος',
          readonlyLabel: 'Μόνο για ανάγνωση',
          readonlyValue: 'Περιεχόμενο μόνο για ανάγνωση',
        },
        toast: {
          message: variant => {
            const labels: Record<string, string> = {
              default: 'προεπιλογής',
              success: 'επιτυχίας',
              warning: 'προειδοποίησης',
              error: 'σφάλματος',
              info: 'πληροφορίας',
            };
            return `Αυτό είναι ένα toast ${labels[variant] ?? variant}`;
          },
        },
        tooltip: {
          topLabel: 'Πάνω',
          topTooltip: 'Υπόδειξη πάνω',
          bottomLabel: 'Κάτω',
          bottomTooltip: 'Υπόδειξη κάτω',
          leftLabel: 'Αριστερά',
          leftTooltip: 'Υπόδειξη αριστερά',
          rightLabel: 'Δεξιά',
          rightTooltip: 'Υπόδειξη δεξιά',
        },
        transferList: {
          availableLabel: 'Διαθέσιμοι',
          assignedLabel: 'Ανατεθειμένοι',
          roleAdmin: 'Διαχειριστής',
          roleEditor: 'Συντάκτης',
          roleViewer: 'Αναγνώστης',
          roleGuest: 'Επισκέπτης',
          roleBilling: 'Χρεώσεις',
          roleOwner: 'Ιδιοκτήτης',
        },
        virtualList: {
          row: 'Γραμμή',
          detail: n => `Δημιουργημένη εγγραφή #${n}`,
          scrollPosition: (first, total) =>
            `Εμφάνιση γραμμής ${first.toLocaleString('el')} από ${total.toLocaleString('el')}`,
        },
        commandPalette: {
          hint: 'Πατήστε Ctrl + K (ή Cmd + K) για να ανοίξετε την παλέτα εντολών οπουδήποτε στη σελίδα.',
          openButton: 'Άνοιγμα παλέτας εντολών',
          fileGroup: 'Αρχείο',
          editGroup: 'Επεξεργασία',
          newFile: 'Νέο αρχείο',
          openFile: 'Άνοιγμα αρχείου',
          save: 'Αποθήκευση',
          find: 'Εύρεση',
          findKeyword: 'αναζήτηση',
          replace: 'Αντικατάσταση',
          undo: 'Αναίρεση',
          toggleTheme: 'Εναλλαγή θέματος',
          toggleThemeDescription: 'Εναλλαγή ανοιχτής και σκούρας λειτουργίας',
          lockWorkspace: 'Κλείδωμα χώρου εργασίας',
          lockWorkspaceDescription: 'Προς το παρόν ανενεργό, λειτουργία σε beta',
          executedToast: label => `Εκτελέστηκε: ${label}`,
        },
        avatarEditorActions: {
          avatarUpdatedToast: 'Το avatar ενημερώθηκε',
        },
      },
      playground: {
        controls: 'Επιλογές',
        reset: 'Επαναφορά',
        code: 'Κώδικας',
        apiReference: 'Αναφορά API',
        inputs: 'Είσοδοι',
        outputs: 'Έξοδοι',
        methods: 'Μέθοδοι',
        colName: 'Όνομα',
        colType: 'Τύπος',
        colDefault: 'Προεπιλογή',
        colDescription: 'Περιγραφή',
        requiredBadge: 'υποχρεωτικό',
        twoWayBadge: 'αμφίδρομο',
        rangeHint: { between: 'έως', min: 'Ελάχ.', max: 'Μέγ.' },
        knobLabels: {
          input: {
            label: 'Ετικέτα',
            placeholder: 'Κείμενο υποδείγματος',
            size: 'Μέγεθος',
            type: 'Τύπος',
            disabled: 'Απενεργοποιημένο',
            readonly: 'Μόνο για ανάγνωση',
            required: 'Υποχρεωτικό',
            autofocus: 'Αυτόματη εστίαση',
            showPasswordToggle: 'Εμφάνιση κωδικού',
            clearable: 'Με εκκαθάριση',
            autocomplete: 'Αυτόματη συμπλήρωση',
          },
          alert: {
            variant: 'Παραλλαγή',
            dismissible: 'Με δυνατότητα απόρριψης',
            size: 'Μέγεθος',
            icon: 'Εικονίδιο (παράκαμψη)',
          },
          avatar: {
            size: 'Μέγεθος',
            shape: 'Σχήμα',
            src: 'Πηγή εικόνας',
            initials: 'Αρχικά',
            alt: 'Εναλλακτικό κείμενο',
          },
          badge: {
            variant: 'Παραλλαγή',
            size: 'Μέγεθος',
            shape: 'Σχήμα',
          },
          button: {
            variant: 'Παραλλαγή',
            size: 'Μέγεθος',
            type: 'Τύπος',
            disabled: 'Απενεργοποιημένο',
            loading: 'Φόρτωση',
            fullWidth: 'Πλήρες πλάτος',
          },
          card: {
            variant: 'Παραλλαγή',
            padding: 'Εσωτερικό περιθώριο',
            headerAlign: 'Στοίχιση κεφαλίδας',
            fullWidth: 'Πλήρες πλάτος',
            headerDivider: 'Διαχωριστικό κεφαλίδας',
          },
          checkbox: {
            label: 'Ετικέτα',
            count: 'Πλήθος',
            size: 'Μέγεθος',
            disabled: 'Απενεργοποιημένο',
            required: 'Υποχρεωτικό',
            indeterminate: 'Απροσδιόριστο',
          },
          'code-input': {
            size: 'Μέγεθος',
            length: 'Μήκος',
            label: 'Ετικέτα',
            placeholder: 'Κείμενο υποδείγματος',
            disabled: 'Απενεργοποιημένο',
            readonly: 'Μόνο για ανάγνωση',
            required: 'Υποχρεωτικό',
          },
          'color-picker': {
            label: 'Ετικέτα',
            placeholder: 'Κείμενο υποδείγματος',
            size: 'Μέγεθος',
            format: 'Μορφή',
            showAlpha: 'Εμφάνιση άλφα',
            disabled: 'Απενεργοποιημένο',
            readonly: 'Μόνο για ανάγνωση',
            required: 'Υποχρεωτικό',
          },
          divider: {
            orientation: 'Προσανατολισμός',
            label: 'Ετικέτα',
          },
          'eagami-wordmark': {
            variant: 'Παραλλαγή',
            layout: 'Διάταξη',
            size: 'Μέγεθος (px)',
          },
          'empty-state': {
            size: 'Μέγεθος',
            headingLevel: 'Επίπεδο επικεφαλίδας',
            title: 'Τίτλος',
            description: 'Περιγραφή',
          },
          paginator: {
            align: 'Στοίχιση',
            showPageSizeSelector: 'Εμφάνιση επιλογέα μεγέθους σελίδας',
            showRangeLabel: 'Εμφάνιση ετικέτας εύρους',
            disabled: 'Απενεργοποιημένο',
            totalItems: 'Σύνολο στοιχείων',
          },
          'progress-bar': {
            variant: 'Παραλλαγή',
            size: 'Μέγεθος',
            value: 'Τιμή',
            max: 'Μέγιστο',
            showPercentage: 'Εμφάνιση ποσοστού',
            indeterminate: 'Απροσδιόριστο',
            label: 'Ετικέτα',
          },
          radio: {
            label: 'Ετικέτα',
            disabled: 'Απενεργοποιημένο',
          },
          'range-slider': {
            label: 'Ετικέτα',
            hint: 'Βοήθεια',
            errorMsg: 'Μήνυμα σφάλματος',
            min: 'Ελάχιστο',
            max: 'Μέγιστο',
            step: 'Βήμα',
            size: 'Μέγεθος',
            showValue: 'Εμφάνιση τιμής',
            showMinMaxLabels: 'Εμφάνιση ετικετών ελάχιστου/μέγιστου',
            disabled: 'Απενεργοποιημένο',
            required: 'Υποχρεωτικό',
          },
          rating: {
            label: 'Ετικέτα',
            size: 'Μέγεθος',
            min: 'Ελάχιστο',
            max: 'Μέγιστο',
            allowHalf: 'Επιτρέπονται μισά βήματα',
            readonly: 'Μόνο για ανάγνωση',
            disabled: 'Απενεργοποιημένο',
            required: 'Υποχρεωτικό',
            clearable: 'Με εκκαθάριση',
            iconClass: 'Εικονίδιο',
          },
          skeleton: {
            variant: 'Παραλλαγή',
            animated: 'Με κινούμενη εικόνα',
            width: 'Πλάτος',
            height: 'Ύψος',
          },
          slider: {
            size: 'Μέγεθος',
            min: 'Ελάχιστο',
            max: 'Μέγιστο',
            step: 'Βήμα',
            showValue: 'Εμφάνιση τιμής',
            showMinMaxLabels: 'Εμφάνιση ετικετών ελάχιστου/μέγιστου',
            disabled: 'Απενεργοποιημένο',
            required: 'Υποχρεωτικό',
            hasError: 'Κατάσταση σφάλματος',
            label: 'Ετικέτα',
          },
          spinner: {
            size: 'Μέγεθος',
            label: 'Ετικέτα',
          },
          switch: {
            label: 'Ετικέτα',
            size: 'Μέγεθος',
            disabled: 'Απενεργοποιημένο',
            required: 'Υποχρεωτικό',
          },
          tag: {
            variant: 'Παραλλαγή',
            size: 'Μέγεθος',
            removable: 'Με δυνατότητα αφαίρεσης',
            disabled: 'Απενεργοποιημένο',
            removeLabel: 'Ετικέτα αφαίρεσης',
          },
          textarea: {
            label: 'Ετικέτα',
            placeholder: 'Κείμενο υποδείγματος',
            size: 'Μέγεθος',
            resize: 'Αλλαγή μεγέθους',
            rows: 'Γραμμές',
            maxlength: 'Μέγιστο μήκος (chars)',
            minHeight: 'Ελάχιστο ύψος (px)',
            maxHeight: 'Μέγιστο ύψος (px)',
            disabled: 'Απενεργοποιημένο',
            readonly: 'Μόνο για ανάγνωση',
            required: 'Υποχρεωτικό',
          },
        },
        descriptions: {
          input: {
            label: 'Ετικέτα που εμφανίζεται πάνω από το πεδίο.',
            type: 'Εγγενής τύπος του πεδίου (το password προσθέτει ενσωματωμένο κουμπί εμφάνισης/απόκρυψης).',
            placeholder: 'Κείμενο υποδείγματος που εμφανίζεται όταν το πεδίο είναι κενό.',
            size: 'Οπτικό μέγεθος του πεδίου.',
            hint: 'Βοηθητικό κείμενο κάτω από το πεδίο, κρυμμένο όταν υπάρχει σφάλμα.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από το πεδίο, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            disabled: 'Απενεργοποιεί το πεδίο.',
            readonly: 'Εμφανίζει το πεδίο μόνο για ανάγνωση.',
            required: 'Επισημαίνει το πεδίο ως υποχρεωτικό.',
            autocomplete: 'Τιμή για το εγγενές χαρακτηριστικό autocomplete.',
            list: 'id ενός <datalist> για σύνδεση με εγγενείς προτάσεις.',
            autofocus: 'Εστιάζει στο πεδίο μία φορά, μετά την πρώτη απόδοση.',
            showPasswordToggle:
              'Εμφανίζει το κουμπί εμφάνισης/απόκρυψης για πεδία password.',
            clearable: 'Εμφανίζει κουμπί εκκαθάρισης όταν το πεδίο έχει τιμή.',
            id: 'id που εφαρμόζεται στο εγγενές πεδίο και στο for της ετικέτας, δημιουργείται αυτόματα αν παραλειφθεί.',
            value: 'Τρέχουσα τιμή του πεδίου, αμφίδρομα συνδέσιμη μέσω [(value)].',
            blurred: 'Εκπέμπεται όταν το πεδίο χάνει την εστίαση.',
            focused: 'Εκπέμπεται όταν το πεδίο λαμβάνει εστίαση.',
            clear: 'Καθαρίζει την τρέχουσα τιμή και επαναφέρει την εστίαση στο πεδίο.',
            focus: 'Μεταφέρει την εστίαση πληκτρολογίου στο υποκείμενο εγγενές πεδίο.',
            togglePasswordVisibility:
              'Εναλλάσσει την κατάσταση εμφάνισης κωδικού για πεδία type="password".',
            icon: 'Στοιχείο αρχικού εικονιδίου που αποδίδεται πριν από το κείμενο.',
            max: 'Μέγιστη τιμή για type="number". Η τιμή περιορίζεται σε αυτήν κατά την απώλεια εστίασης.',
            maxLength:
              'Μέγιστος αριθμός χαρακτήρων. Επιβάλλεται για type="number" όπου το εγγενές maxlength αγνοείται.',
            min: 'Ελάχιστη τιμή για type="number". Η τιμή περιορίζεται σε αυτήν κατά την απώλεια εστίασης.',
            minLength:
              'Ελάχιστος αριθμός χαρακτήρων, που διαβιβάζεται ως εγγενές χαρακτηριστικό minlength.',
            step: 'Βήμα αύξησης για πεδία type="number".',
            clampToBounds:
              'Περιορίζει μια αριθμητική τιμή εντός του διαμορφωμένου εύρους min/max μόλις ολοκληρωθεί η επεξεργασία.',
          },
          accordion: {
            multi: 'Επιτρέπει σε πολλά στοιχεία να παραμένουν ανοιχτά ταυτόχρονα.',
          },
          alert: {
            dismissible:
              'Εμφανίζει κουμπί κλεισίματος που επιτρέπει στον χρήστη να απορρίψει την ειδοποίηση.',
            variant:
              'Σημασιολογικό χρωματικό σχήμα που καθορίζει το εικονίδιο και την παλέτα της ειδοποίησης.',
            visible: 'Αν εμφανίζεται η ειδοποίηση, αμφίδρομα συνδέσιμη μέσω [(visible)].',
            dismissed:
              'Εκπέμπεται όταν ο χρήστης απορρίπτει την ειδοποίηση μέσω του κουμπιού κλεισίματος.',
            dismiss: 'Κρύβει την ειδοποίηση και εκπέμπει το συμβάν dismissed.',
            size: 'Κλιμακώνει μαζί το κείμενο, το εικονίδιο και το κενό.',
            icon: 'Αντικαθιστά το προεπιλεγμένο εικονίδιο κατάστασης της παραλλαγής με οποιοδήποτε στοιχείο εικονιδίου.',
          },
          avatar: {
            src: 'Διεύθυνση URL εικόνας προς εμφάνιση. Σε περίπτωση αποτυχίας, εμφανίζονται τα αρχικά και έπειτα ένα γενικό εικονίδιο χρήστη.',
            alt: 'Εναλλακτικό κείμενο για την εικόνα του άβαταρ.',
            initials: 'Αρχικά που εμφανίζονται όταν δεν παρέχεται πηγή εικόνας.',
            size: 'Προεπιλεγμένη διάμετρος για το άβαταρ.',
            shape: 'Περίγραμμα του άβαταρ: στρογγυλό ή στρογγυλεμένο τετράγωνο.',
          },
          badge: {
            variant: 'Σημασιολογικό χρωματικό σχήμα του σήματος.',
            size: 'Οπτικό μέγεθος του σήματος.',
            shape:
              'Εξωτερικό σχήμα του σήματος (το pill προσαρμόζεται στο περιεχόμενο, το pin αποδίδεται ως κύκλος για μεμονωμένους χαρακτήρες).',
          },
          button: {
            variant:
              'Οπτικό στιλ του κουμπιού, που καθορίζει το χρώμα και την έμφασή του.',
            size: 'Οπτικό μέγεθος του κουμπιού.',
            type: 'Εγγενές χαρακτηριστικό type που εφαρμόζεται στο υποκείμενο στοιχείο κουμπιού.',
            disabled: 'Απενεργοποιεί το κουμπί και αποτρέπει τα συμβάντα κλικ.',
            loading:
              'Αντικαθιστά την ετικέτα με δείκτη φόρτωσης διατηρώντας το αποδιδόμενο πλάτος.',
            fullWidth: 'Επεκτείνει το κουμπί ώστε να γεμίζει το πλάτος του περιέκτη του.',
            ariaLabel:
              'Προσβάσιμη ετικέτα για το κουμπί όταν το περιεχόμενό του δεν είναι αρκετά περιγραφικό.',
            ariaCurrent:
              'Τιμή για το εγγενές χαρακτηριστικό aria-current, που επισημαίνει το κουμπί ως το τρέχον στοιχείο σε ένα σύνολο.',
            clicked:
              'Εκπέμπεται όταν ενεργοποιείται το κουμπί, αποτρέπεται όταν είναι απενεργοποιημένο ή σε φόρτωση.',
            icon: 'Προαιρετικό συστατικό εικονιδίου που αποδίδεται αριστερά της ετικέτας.',
          },
          card: {
            variant: 'Οπτικό στιλ της επιφάνειας της κάρτας.',
            padding:
              'Προεπιλογή εσωτερικού περιθωρίου που εφαρμόζεται στην περιοχή περιεχομένου της κάρτας.',
            headerAlign: 'Οριζόντια στοίχιση του περιεχομένου της κεφαλίδας.',
            fullWidth: 'Επεκτείνει την κάρτα ώστε να γεμίζει το διαθέσιμο πλάτος.',
            headerDivider: 'Εμφανίζει διαχωριστικό μεταξύ της κεφαλίδας και του σώματος.',
          },
          checkbox: {
            ariaLabel:
              'Προσβάσιμο όνομα για το πλαίσιο ελέγχου όταν δεν αποδίδεται ορατή ετικέτα.',
            checked: 'Τρέχουσα κατάσταση επιλογής, αμφίδρομα συνδέσιμη μέσω [(checked)].',
            count: 'Συμπληρωματική τιμή που εμφανίζεται αχνή αμέσως μετά την ετικέτα.',
            disabled: 'Απενεργοποιεί το πλαίσιο ελέγχου.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από το πεδίο, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            hint: 'Βοηθητικό κείμενο κάτω από το πεδίο, κρυμμένο όταν υπάρχει σφάλμα.',
            id: 'id που εφαρμόζεται στο εγγενές πεδίο και στο for της ετικέτας, δημιουργείται αυτόματα αν παραλειφθεί.',
            indeterminate:
              'Αποδίδει το πλαίσιο ελέγχου σε οπτικά απροσδιόριστη κατάσταση.',
            label: 'Κειμενική ετικέτα που αποδίδεται δίπλα στο πλαίσιο ελέγχου.',
            required: 'Επισημαίνει το πλαίσιο ελέγχου ως υποχρεωτικό.',
            size: 'Οπτικό μέγεθος του πλαισίου ελέγχου.',
            changed:
              'Εκπέμπεται με τη νέα κατάσταση επιλογής κάθε φορά που ο χρήστης εναλλάσσει το πλαίσιο ελέγχου.',
          },
          'code-input': {
            disabled: 'Απενεργοποιεί κάθε κελί ψηφίου.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από το πεδίο, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            hint: 'Βοηθητικό κείμενο κάτω από το πεδίο, κρυμμένο όταν υπάρχει σφάλμα.',
            id: 'id που εφαρμόζεται στα κελιά ψηφίων και στο for της ετικέτας, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Ετικέτα που εμφανίζεται πάνω από το πεδίο.',
            length: 'Πλήθος κελιών ψηφίων από τα οποία αποτελείται ο κωδικός.',
            placeholder: 'Κείμενο κράτησης θέσης κατανεμημένο έναν χαρακτήρα ανά κελί.',
            readonly: 'Εμφανίζει το πεδίο μόνο για ανάγνωση.',
            required: 'Επισημαίνει το πεδίο ως υποχρεωτικό.',
            size: 'Οπτικό μέγεθος κάθε κελιού ψηφίου.',
            value: 'Τρέχουσα τιμή κωδικού, αμφίδρομα συνδέσιμη μέσω [(value)].',
            completed: 'Εκπέμπεται με τον πλήρη κωδικό μόλις εισαχθούν όλα τα ψηφία.',
            focus:
              'Μεταφέρει την εστίαση στο επόμενο κενό ψηφίο (ή στο τελευταίο όταν είναι πλήρες).',
            allowAllChars:
              'Επιτρέπει οποιονδήποτε μη κενό χαρακτήρα· διαφορετικά γίνονται δεκτά μόνο ψηφία.',
          },
          'color-picker': {
            disabled: 'Απενεργοποιεί το πεδίο.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από το πεδίο, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            format: 'Μορφή εξόδου της εκπεμπόμενης τιμής χρώματος (hex, rgb ή hsl).',
            hint: 'Βοηθητικό κείμενο κάτω από το πεδίο, κρυμμένο όταν υπάρχει σφάλμα.',
            id: 'id που εφαρμόζεται στον ενεργοποιητή και στο for της ετικέτας, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Ετικέτα που εμφανίζεται πάνω από το πεδίο.',
            placeholder:
              'Κείμενο υποδείγματος που εμφανίζεται στον ενεργοποιητή όσο δεν έχει επιλεγεί χρώμα.',
            presets:
              'Προκαθορισμένα δείγματα χρωμάτων που εμφανίζονται στο κάτω μέρος του αναδυόμενου παραθύρου. Περάστε κενό πίνακα για να αποκρυφθούν.',
            readonly:
              'Εμφανίζει το πεδίο μόνο για ανάγνωση, αποτρέποντας το άνοιγμα του αναδυόμενου παραθύρου.',
            required: 'Επισημαίνει το πεδίο ως υποχρεωτικό.',
            showAlpha:
              'Εμφανίζει τον ολισθητή άλφα και συμπεριλαμβάνει το άλφα στην εκπεμπόμενη τιμή.',
            size: 'Οπτικό μέγεθος του ενεργοποιητή του επιλογέα.',
            value: 'Τρέχουσα συμβολοσειρά χρώματος, αμφίδρομα συνδέσιμη μέσω [(value)].',
            changed:
              'Εκπέμπεται με τη νέα συμβολοσειρά χρώματος κάθε φορά που αλλάζει η επιλογή.',
            cycleInputMode:
              'Εναλλάσσει τη γραμμή εισόδου του αναδυόμενου παραθύρου μεταξύ συμβολοσειράς hex και καναλιών RGB.',
            hasEyeDropper: 'Επιστρέφει αν ο περιηγητής υποστηρίζει το EyeDropper API.',
            onHexInput:
              'Εφαρμόζει το πληκτρολογημένο κείμενο hex στο τρέχον χρώμα καθώς ο χρήστης επεξεργάζεται.',
            onPopoverCloseRequested:
              'Κλείνει το αναδυόμενο παράθυρο όταν ο χρήστης κάνει κλικ εκτός του επιλογέα.',
          },
          divider: {
            label:
              'Προαιρετική κεντραρισμένη ετικέτα που αποδίδεται εντός της γραμμής διαχωριστικού.',
            orientation:
              'Προσανατολισμός κατά τον οποίο εκτείνεται η γραμμή διαχωριστικού.',
            thick: 'Αποδίδει μια πιο έντονη γραμμή.',
          },
          'eagami-wordmark': {
            variant:
              'Παραλλαγή περιεχομένου: το default είναι το σκέτο λογότυπο, το byline προσθέτει τη γραμμή κατασκευής, το tagline προσθέτει το σύνθημα.',
            layout:
              'Διατάσσει το λογότυπο στοιβαγμένο σε γραμμές ή σε μία ενιαία γραμμή.',
            size: 'Τιμή σε pixel από την οποία κλιμακώνεται ολόκληρο το λογότυπο.',
          },
          'empty-state': {
            title: 'Κείμενο επικεφαλίδας που εμφανίζεται πάνω από την περιγραφή.',
            description: 'Υποστηρικτικό κείμενο που εμφανίζεται κάτω από τον τίτλο.',
            size: 'Οπτικό μέγεθος του μπλοκ κενής κατάστασης.',
            headingLevel:
              'Επίπεδο επικεφαλίδας που χρησιμοποιείται για τον τίτλο ώστε να ταιριάζει στη δομή του εγγράφου.',
            bordered: 'Αποδίδει διακεκομμένο πλαίσιο γύρω από το μπλοκ.',
            icon: 'Προαιρετικό συστατικό εικονιδίου που αποδίδεται στην περιοχή πολυμέσων πάνω από τον τίτλο.',
          },
          paginator: {
            align:
              'Οριζόντια στοίχιση των στοιχείων ελέγχου σελιδοποίησης εντός του περιέκτη τους.',
            disabled: 'Απενεργοποιεί όλα τα στοιχεία ελέγχου σελιδοποίησης.',
            page: 'Τρέχων αριθμός σελίδας, αμφίδρομα συνδέσιμος μέσω [(page)].',
            pageSize:
              'Πλήθος στοιχείων που εμφανίζονται ανά σελίδα, αμφίδρομα συνδέσιμο μέσω [(pageSize)].',
            pageSizeOptions:
              'Επιλέξιμα μεγέθη σελίδας που προσφέρονται στον επιλογέα μεγέθους σελίδας.',
            showPageSizeSelector:
              'Εμφανίζει το στοιχείο ελέγχου επιλογέα μεγέθους σελίδας.',
            showRangeLabel:
              'Εμφανίζει την ετικέτα που περιγράφει το ορατό εύρος στοιχείων.',
            totalItems:
              'Συνολικός αριθμός στοιχείων που χρησιμοποιείται για τον υπολογισμό του πλήθους σελίδων.',
            changed:
              'Εκπέμπεται όταν ο χρήστης αλλάζει είτε την τρέχουσα σελίδα είτε το μέγεθος σελίδας.',
            goToPage:
              'Πλοηγείται στη δεδομένη σελίδα, περιορισμένη εντός του έγκυρου εύρους.',
            nextPage: 'Πλοηγείται στην επόμενη σελίδα αν υπάρχει.',
            prevPage: 'Πλοηγείται στην προηγούμενη σελίδα αν υπάρχει.',
          },
          'progress-bar': {
            variant: 'Χρωματική παραλλαγή της μπάρας.',
            size: 'Οπτικό πάχος της μπάρας.',
            value: 'Τρέχουσα τιμή προόδου.',
            max: 'Τιμή στην οποία η μπάρα είναι γεμάτη.',
            showPercentage: 'Εμφανίζει το τρέχον ποσοστό δίπλα στην μπάρα.',
            showValue:
              'Παρωχημένο ψευδώνυμο του showPercentage· θα αφαιρεθεί στην v3.0.0.',
            indeterminate:
              'Αναπαράγει μια επαναλαμβανόμενη κίνηση για πρόοδο άγνωστης διάρκειας.',
            label: 'Κειμενική ετικέτα που αποδίδεται πάνω από την μπάρα.',
          },
          radio: {
            disabled: 'Απενεργοποιεί αυτήν την επιλογή.',
            id: 'id που εφαρμόζεται στο εγγενές πεδίο radio και στο for της ετικέτας, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Κειμενική ετικέτα που αποδίδεται δίπλα στο radio.',
            value:
              'Τιμή που συνεισφέρει αυτή η επιλογή στη γονική ομάδα της όταν επιλεγεί.',
          },
          'range-slider': {
            ariaLabelHigh:
              'Προσβάσιμη ετικέτα για τον υψηλό (τελικό) δείκτη, με εφεδρική τιμή την ετικέτα του πεδίου όταν παραλείπεται.',
            ariaLabelLow:
              'Προσβάσιμη ετικέτα για τον χαμηλό (αρχικό) δείκτη, με εφεδρική τιμή την ετικέτα του πεδίου όταν παραλείπεται.',
            disabled: 'Απενεργοποιεί τον ολισθητή.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από τον ολισθητή, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            formatValue: 'Μορφοποιητής που εφαρμόζεται σε κάθε τιμή πριν εμφανιστεί.',
            hint: 'Βοηθητικό κείμενο κάτω από τον ολισθητή, κρυμμένο όταν υπάρχει σφάλμα.',
            id: 'id που εφαρμόζεται στον ολισθητή, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Ετικέτα που εμφανίζεται πάνω από τον ολισθητή.',
            max: 'Υψηλότερη τιμή που μπορεί να φτάσει οποιοσδήποτε δείκτης.',
            min: 'Χαμηλότερη τιμή που μπορεί να φτάσει οποιοσδήποτε δείκτης.',
            required: 'Επισημαίνει το πεδίο ως υποχρεωτικό.',
            showMinMaxLabels:
              'Εμφανίζει τα όρια ελάχιστου και μέγιστου στα άκρα της τροχιάς.',
            showValue:
              'Εμφανίζει τις τρέχουσες χαμηλές και υψηλές τιμές δίπλα στον ολισθητή.',
            size: 'Οπτικό μέγεθος της τροχιάς και των δεικτών.',
            step: 'Βήμα στο οποίο προσκολλάται κάθε δείκτης όταν μετακινείται.',
            value:
              'Τρέχουσα πλειάδα εύρους [low, high], αμφίδρομα συνδέσιμη μέσω [(value)].',
            changed:
              'Εκπέμπεται με τη νέα πλειάδα [low, high] κάθε φορά που μετακινείται οποιοσδήποτε δείκτης.',
            commitThumb:
              'Προσκολλά έναν δείκτη στο πλησιέστερο βήμα, τον περιορίζει στα όρια και τον δεσμεύει από τον αντίθετο δείκτη.',
            groupThousands:
              'Ομαδοποιεί τις εμφανιζόμενες τιμές με διαχωριστικά χιλιάδων, αγνοείται όταν παρέχεται προσαρμοσμένο formatValue.',
            formatDisplay:
              'Μορφοποιεί μια τιμή για εμφάνιση, εφαρμόζοντας ομαδοποίηση χιλιάδων εκτός αν έχει οριστεί προσαρμοσμένη συνάρτηση formatValue.',
          },
          rating: {
            allowHalf:
              'Επιτρέπει διακριτότητα μισού αστεριού, αφήνοντας την τιμή να μετακινείται κατά 0,5.',
            clearable: 'Το κλικ στην τρέχουσα τιμή καθαρίζει την αξιολόγηση στο 0.',
            disabled: 'Απενεργοποιεί την αξιολόγηση.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από την αξιολόγηση, που αντικαθιστά τη βοήθεια και την επισημαίνει ως μη έγκυρη.',
            halfIconClass:
              'Κλάση αυτόνομου στοιχείου που αποδίδεται για τις μισές θέσεις όταν το allowHalf είναι true.',
            hint: 'Βοηθητικό κείμενο κάτω από την αξιολόγηση, κρυμμένο όταν υπάρχει σφάλμα.',
            iconClass:
              'Κλάση αυτόνομου στοιχείου που αποδίδεται για τις κενές και πλήρεις θέσεις.',
            id: 'id που εφαρμόζεται στην αξιολόγηση και στην ετικέτα της, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Ετικέτα που εμφανίζεται πάνω από την αξιολόγηση.',
            max: 'Υψηλότερη τιμή αξιολόγησης και πλήθος αστεριών που αποδίδονται.',
            min: 'Χαμηλότερη τιμή αξιολόγησης που μπορεί να επιλέξει ο χρήστης.',
            readonly:
              'Αποδίδει την αξιολόγηση μόνο για προβολή, αγνοώντας κλικ και πληκτρολόγιο.',
            required: 'Επισημαίνει την αξιολόγηση ως υποχρεωτική.',
            size: 'Οπτικό μέγεθος της αξιολόγησης.',
            value: 'Τρέχουσα τιμή αξιολόγησης, αμφίδρομα συνδέσιμη μέσω [(value)].',
            hoverChanged:
              'Εκπέμπεται με την προεπισκοπούμενη τιμή κατά την αιώρηση, και null όταν ο δείκτης αποχωρεί.',
            iconForState:
              'Επιστρέφει την κλάση στοιχείου προς δημιουργία για μια δεδομένη κατάσταση αστεριού.',
            stateFor:
              'Επιλύει την κατάσταση απόδοσης (κενή, μισή ή πλήρης) για μια θέση αστεριού.',
          },
          skeleton: {
            animated:
              'Αναπαράγει την παλλόμενη κινούμενη λάμψη, που αναστέλλεται αυτόματα όταν ο χρήστης προτιμά μειωμένη κίνηση.',
            height:
              'Ρητό ύψος CSS που εφαρμόζεται στον κράτη θέσης, με προεπιλογή το εγγενές μέγεθος του σχήματος όταν παραλείπεται.',
            variant:
              'Προεπιλεγμένο σχήμα του κράτη θέσης: γραμμή κειμένου, κύκλος ή ορθογώνιο.',
            width:
              'Ρητό πλάτος CSS που εφαρμόζεται στον κράτη θέσης, με προεπιλογή το εγγενές μέγεθος του σχήματος όταν παραλείπεται.',
          },
          slider: {
            ariaLabel:
              'Προσβάσιμη ετικέτα που εφαρμόζεται όταν δεν αποδίδεται ορατή ετικέτα.',
            disabled: 'Απενεργοποιεί τον ολισθητή.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από τον ολισθητή, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            formatValue:
              'Μορφοποιητής που μετατρέπει την αριθμητική τιμή στο εμφανιζόμενο κείμενο.',
            hasError:
              'Επιβάλλει το στιλ κατάστασης σφάλματος χωρίς σύνδεση μηνύματος σφάλματος.',
            hint: 'Βοηθητικό κείμενο κάτω από τον ολισθητή, κρυμμένο όταν υπάρχει σφάλμα.',
            id: 'id που εφαρμόζεται στον ολισθητή και στην ετικέτα του, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Ετικέτα που εμφανίζεται πάνω από τον ολισθητή.',
            max: 'Υψηλότερη τιμή που μπορεί να φτάσει ο ολισθητής.',
            min: 'Χαμηλότερη τιμή που μπορεί να φτάσει ο ολισθητής.',
            required: 'Επισημαίνει τον ολισθητή ως υποχρεωτικό.',
            showMinMaxLabels:
              'Εμφανίζει τα όρια ελάχιστου και μέγιστου κάτω από την τροχιά.',
            showValue: 'Εμφανίζει την τρέχουσα τιμή δίπλα στην ετικέτα.',
            size: 'Οπτικό μέγεθος της τροχιάς και του δείκτη του ολισθητή.',
            step: 'Βήμα στο οποίο προσκολλάται η τιμή καθώς κινείται ο ολισθητής.',
            value: 'Τρέχουσα τιμή ολισθητή, αμφίδρομα συνδέσιμη μέσω [(value)].',
            changed:
              'Εκπέμπεται με τη νέα προσκολλημένη τιμή κάθε φορά που κινείται ο ολισθητής.',
            groupThousands:
              'Ομαδοποιεί τις εμφανιζόμενες τιμές με διαχωριστικά χιλιάδων, αγνοείται όταν παρέχεται προσαρμοσμένο formatValue.',
            formatDisplay:
              'Μορφοποιεί μια τιμή για εμφάνιση, εφαρμόζοντας ομαδοποίηση χιλιάδων εκτός αν έχει οριστεί προσαρμοσμένη συνάρτηση formatValue.',
          },
          spinner: {
            label:
              'Προσβάσιμη ετικέτα που ανακοινώνεται στις υποστηρικτικές τεχνολογίες, με εφεδρική τιμή τη μετάφραση της ενεργής γλώσσας όταν δεν οριστεί.',
            size: 'Οπτικό μέγεθος του δείκτη φόρτωσης.',
          },
          switch: {
            ariaLabel:
              'Προσβάσιμη ετικέτα για τον διακόπτη όταν δεν αποδίδεται ορατή ετικέτα.',
            checked: 'Τρέχουσα κατάσταση on/off, αμφίδρομα συνδέσιμη μέσω [(checked)].',
            disabled: 'Απενεργοποιεί τον διακόπτη και αποκλείει την εναλλαγή.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από τον διακόπτη, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            hint: 'Βοηθητικό κείμενο κάτω από τον διακόπτη, κρυμμένο όταν υπάρχει σφάλμα.',
            id: 'id που εφαρμόζεται στο υποκείμενο πλαίσιο ελέγχου και στο for της ετικέτας, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Κειμενική ετικέτα που αποδίδεται δίπλα στον διακόπτη.',
            required: 'Επισημαίνει τον διακόπτη ως υποχρεωτικό.',
            size: 'Οπτικό μέγεθος του διακόπτη.',
            changed:
              'Εκπέμπεται με τη νέα κατάσταση επιλογής κάθε φορά που ο χρήστης εναλλάσσει τον διακόπτη.',
          },
          tag: {
            variant: 'Σημασιολογικό χρωματικό σχήμα της ετικέτας.',
            size: 'Οπτικό μέγεθος της ετικέτας.',
            removable:
              'Αποδίδει κουμπί αφαίρεσης που εκπέμπει το removed όταν ενεργοποιηθεί.',
            disabled: 'Απενεργοποιεί την ετικέτα και το κουμπί αφαίρεσής της.',
            removeLabel:
              'Προσβάσιμη ετικέτα για το κουμπί αφαίρεσης, με εφεδρική τιμή την ενεργή γλώσσα.',
            removed:
              'Εκπέμπεται όταν ο χρήστης ενεργοποιεί το κουμπί αφαίρεσης σε ετικέτα με δυνατότητα αφαίρεσης.',
          },
          textarea: {
            disabled: 'Απενεργοποιεί το πεδίο.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από το πεδίο, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            hint: 'Βοηθητικό κείμενο κάτω από το πεδίο, κρυμμένο όταν υπάρχει σφάλμα.',
            id: 'id που εφαρμόζεται στο εγγενές textarea και στο for της ετικέτας, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Ετικέτα που εμφανίζεται πάνω από το πεδίο.',
            maxHeight:
              'Όριο ύψους σε pixel για το πεδίο. Πέρα από αυτό, το textarea κυλά κατακόρυφα αντί να μεγαλώνει.',
            minHeight:
              'Ελάχιστο ύψος σε px· ποτέ μικρότερο από το ύψος που υπονοούν οι γραμμές.',
            maxlength: 'Μέγιστος αριθμός χαρακτήρων που δέχεται το πεδίο.',
            placeholder: 'Κείμενο υποδείγματος που εμφανίζεται όταν το πεδίο είναι κενό.',
            readonly: 'Εμφανίζει το πεδίο μόνο για ανάγνωση.',
            required: 'Επισημαίνει το πεδίο ως υποχρεωτικό.',
            resize:
              'Άξονας κατά τον οποίο ο χρήστης μπορεί να αλλάξει το μέγεθος του πεδίου.',
            rows: 'Αρχικός αριθμός ορατών γραμμών κειμένου.',
            size: 'Οπτικό μέγεθος του πεδίου.',
            value: 'Τρέχουσα τιμή του πεδίου, αμφίδρομα συνδέσιμη μέσω [(value)].',
            blurred: 'Εκπέμπεται όταν το πεδίο χάνει την εστίαση.',
            focused: 'Εκπέμπεται όταν το πεδίο λαμβάνει εστίαση.',
            focus: 'Μεταφέρει την εστίαση πληκτρολογίου στο υποκείμενο εγγενές textarea.',
          },
          'avatar-editor': {
            accept:
              'Αποδεκτοί τύποι MIME για τον επιλογέα αρχείων, που προωθούνται στην εγγενή είσοδο.',
            canvasSize: 'Πλάτος και ύψος σε pixel του τετράγωνου καμβά περικοπής.',
            cropState:
              'Αρχική κατάσταση μετατόπισης/ζουμ που αποκαθίσταται κατά τη φόρτωση εικόνας προέλευσης.',
            currentSrc:
              'URL της εικόνας που φορτώνεται στον επεξεργαστή κατά την αρχικοποίηση.',
            exportQuality:
              'Ποιότητα JPEG/WebP κατά την εξαγωγή της περικομμένης εικόνας, από 0 έως 1.',
            exportType:
              'Τύπος MIME του εξαγόμενου blob εικόνας (π.χ. image/png ή image/jpeg).',
            loading: 'Εμφανίζει σκελετό φόρτωσης ενώ φορτώνεται εξωτερικός πόρος.',
            maxFileSize:
              'Μέγιστο επιτρεπόμενο μέγεθος αρχείου σε bytes; αρχεία πάνω από το όριο εκπέμπουν errored.',
            maxZoom: 'Μέγιστος πολλαπλασιαστής ζουμ που μπορεί να φτάσει ο χρήστης.',
            minZoom: 'Ελάχιστος πολλαπλασιαστής ζουμ που μπορεί να φτάσει ο χρήστης.',
            shape:
              'Σχήμα μάσκας περικοπής που εφαρμόζεται στον καμβά και στην εξαγόμενη εικόνα.',
            cropped:
              'Εκπέμπεται όταν ο χρήστης εξάγει μια περικοπή, παρέχοντας Blob και URL δεδομένων.',
            cropStateChanged:
              'Εκπέμπεται κάθε φορά που ο χρήστης μετατοπίζει ή κάνει ζουμ στην εικόνα, χρήσιμο για αποθήκευση της κατάστασης επεξεργασίας.',
            errored:
              'Εκπέμπεται με ευανάγνωστο μήνυμα όταν η επαλήθευση αρχείου αποτύχει.',
            fileSelected:
              'Εκπέμπεται όταν επιλεγεί αρχείο από τον δίσκο ή αποτεθεί στον επεξεργαστή.',
            removed:
              'Εκπέμπεται όταν η τρέχουσα εικόνα διαγραφεί μέσω του στοιχείου αφαίρεσης.',
            captureOriginal:
              'Ορίζει την τρέχουσα εικόνα και κατάσταση περικοπής ως αφετηρία για το revertImage.',
            exportCrop:
              'Αποδίδει την τρέχουσα περικοπή σε εκτός οθόνης καμβά, εκπέμπει cropped και επιστρέφει το Blob.',
            openFilePicker: 'Ανοίγει τον εγγενή διάλογο επιλογής αρχείου.',
            removeImage:
              'Διαγράφει την φορτωμένη εικόνα και επαναφέρει τη μετατόπιση και το ζουμ στις προεπιλογές.',
            revertImage:
              'Επαναφέρει την εικόνα και την κατάσταση περικοπής που καταγράφηκαν από την τελευταία κλήση captureOriginal.',
            setZoom:
              'Ορίζει το επίπεδο ζουμ, περιορισμένο στο διαμορφωμένο εύρος minZoom/maxZoom.',
            updateImageDarkness:
              'Δειγματοληπτεί την ορατή περιοχή περικοπής για να εξακριβωθεί αν η εικόνα είναι σκουρότερη από το μεσαίο γκρι.',
          },
          'menu-trigger': {
            menu: 'Το στιγμιότυπο ea-menu που ελέγχει αυτός ο ενεργοποιητής.',
          },
          tooltip: {
            eaTooltip:
              'Κείμενο της υπόδειξης που εμφανίζεται κατά την αιώρηση και την εστίαση πληκτρολογίου.',
            tooltipPosition: 'Τοποθέτηση της υπόδειξης σε σχέση με το στοιχείο ξενιστή.',
          },
          'time-picker': {
            disabled: 'Απενεργοποιεί τον επιλογέα.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από το πεδίο, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            format:
              'Μορφή εμφάνισης της ετικέτας ενεργοποιητή. Η τιμή δεδομένων είναι πάντα 24ωρη.',
            hint: 'Βοηθητικό κείμενο κάτω από το πεδίο, κρυμμένο όταν υπάρχει σφάλμα.',
            id: 'id που εφαρμόζεται στον ενεργοποιητή και στο for της ετικέτας, δημιουργείται αυτόματα αν παραλειφθεί.',
            includeSeconds: 'Εμφανίζει στήλη δευτερολέπτων δίπλα στις ώρες και τα λεπτά.',
            label: 'Ετικέτα που εμφανίζεται πάνω από το πεδίο.',
            minuteStep:
              'Βήμα στο οποίο προσκολλάται η στήλη λεπτών κατά την αύξηση ή τη σύρσιμο.',
            placeholder:
              'Κείμενο υποδείγματος που εμφανίζεται στον ενεργοποιητή όσο δεν έχει επιλεγεί ώρα.',
            readonly:
              'Εμφανίζει το πεδίο μόνο για ανάγνωση, αποτρέποντας το άνοιγμα του αναδυόμενου παραθύρου.',
            required: 'Επισημαίνει το πεδίο ως υποχρεωτικό.',
            secondStep:
              'Βήμα στο οποίο προσκολλάται η στήλη δευτερολέπτων κατά την αύξηση ή τη σύρσιμο.',
            size: 'Οπτικό μέγεθος του ενεργοποιητή του επιλογέα.',
            value:
              'Τρέχουσα συμβολοσειρά ώρας σε HH:MM ή HH:MM:SS (24ωρο), αμφίδρομα συνδέσιμη μέσω [(value)], ή null όταν δεν έχει οριστεί.',
            changed:
              'Εκπέμπεται με τη νέα συμβολοσειρά ώρας κάθε φορά που ο χρήστης αλλάζει την επιλεγμένη ώρα.',
            advanceFocus:
              'Μεταφέρει την εστίαση στην επόμενη στήλη μονάδας μετά την ολοκλήρωση εισαγωγής ψηφίου.',
            cannotExtend:
              'Επιστρέφει true όταν κανένα επιπλέον ψηφίο δεν μπορεί έγκυρα να επεκτείνει τον τρέχοντα αποθηκευτή για τη δεδομένη μονάδα.',
            commitDigits:
              'Αναλύει τη συμβολοσειρά ψηφίων του αποθηκευτή, την περιορίζει στο έγκυρο εύρος της μονάδας και την εγγράφει στην τιμή.',
            flushBuffer:
              'Δεσμεύει οποιονδήποτε εκκρεμή αποθηκευτή πληκτρολογημένων ψηφίων και τον καθαρίζει.',
            focusHoursWhenReady:
              'Εστιάζει στο πεδίο ωρών μόλις η επιφάνεια του αναδυόμενου παραθύρου αποδοθεί στο DOM.',
            hoursFromTyped:
              'Μετατρέπει μια πληκτρολογημένη τιμή ωρών στο 24ωρο ισοδύναμό της, λαμβάνοντας υπόψη την τρέχουσα περίοδο AM/PM.',
            onPopoverCloseRequested:
              'Κλείνει το αναδυόμενο παράθυρο όταν ο χρήστης κάνει κλικ εκτός του επιλογέα.',
            onSpinnerBlur:
              'Δεσμεύει οποιονδήποτε εκκρεμή αποθηκευτή ψηφίων όταν μια στήλη spinner χάνει την εστίαση.',
            onSpinnerFocus:
              'Επιλέγει όλο το κείμενο σε μια στήλη spinner όταν λαμβάνει εστίαση, ώστε το πρώτο πλήκτρο να το αντικαθιστά.',
            onSpinnerInput:
              'Χειρίζεται την εισαγωγή ψηφίων σε μια στήλη spinner, ενημερώνει τον αποθηκευτή και προχωρά αυτόματα την εστίαση όταν η στήλη είναι πλήρης.',
            startHold:
              'Ξεκινά επανάληψη με παρατεταμένη πίεση σε ένα κουμπί chevron, αυξάνοντας τη δεδομένη μονάδα και επιταχύνοντας μετά από καθυστέρηση.',
            step: 'Αυξάνει ή μειώνει τη δεδομένη στήλη μονάδας κατά ένα διαμορφωμένο βήμα.',
            stopHold:
              'Ακυρώνει τυχόν ενεργούς χρονοδιακόπτες επανάληψης παρατεταμένης πίεσης.',
            togglePeriod:
              'Εναλλάσσει την περίοδο AM/PM σε λειτουργία 12 ωρών αντιστρέφοντας τη μετατόπιση 12 ωρών.',
          },
          autocomplete: {
            disabled: 'Απενεργοποιεί το πεδίο.',
            emptyMessage:
              'Μήνυμα που εμφανίζεται στη λίστα όταν καμία επιλογή δεν ταιριάζει με την τρέχουσα εισαγωγή, με εφεδρεία στη μετάφραση της ενεργής γλώσσας αν παραλειφθεί.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από το πεδίο, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            hint: 'Βοηθητικό κείμενο κάτω από το πεδίο, κρυμμένο όταν υπάρχει σφάλμα.',
            id: 'id που εφαρμόζεται στο εγγενές πεδίο και στο for της ετικέτας, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Ετικέτα που εμφανίζεται πάνω από το πεδίο.',
            maxResults:
              'Μέγιστος αριθμός επιλογών που εμφανίζονται ταυτόχρονα στη λίστα προτάσεων.',
            minLength:
              'Ελάχιστος αριθμός χαρακτήρων που απαιτείται πριν εμφανιστεί η λίστα προτάσεων.',
            options: 'Πλήρης λίστα επιλογών διαθέσιμων για φιλτράρισμα και επιλογή.',
            placeholder: 'Κείμενο υποδείγματος που εμφανίζεται όταν το πεδίο είναι κενό.',
            readonly: 'Εμφανίζει το πεδίο μόνο για ανάγνωση.',
            required: 'Επισημαίνει το πεδίο ως υποχρεωτικό.',
            size: 'Οπτικό μέγεθος του πεδίου.',
            value: 'Τρέχουσα τιμή του πεδίου, αμφίδρομα συνδέσιμη μέσω [(value)].',
            blurred: 'Εκπέμπεται όταν το πεδίο χάνει την εστίαση.',
            changed:
              'Εκπέμπεται κάθε φορά που αλλάζει το κείμενο εισαγωγής, συμπεριλαμβανομένων των ελεύθερων επεξεργασιών.',
            focused: 'Εκπέμπεται όταν το πεδίο λαμβάνει εστίαση.',
            selected:
              'Εκπέμπεται όταν ο χρήστης επιλέγει μια επιλογή από τη λίστα προτάσεων.',
            close: 'Κλείνει τη λίστα προτάσεων χωρίς να αλλάζει την τρέχουσα τιμή.',
            focus: 'Μεταφέρει την εστίαση πληκτρολογίου στο υποκείμενο πεδίο κειμένου.',
            selectOption:
              'Επιλέγει μέσω κώδικα τη δεδομένη επιλογή, ενημερώνει την τιμή και κλείνει τη λίστα.',
          },
          'command-palette': {
            emptyMessage:
              'Μήνυμα που εμφανίζεται όταν η αναζήτηση δεν ταιριάζει σε κανένα στοιχείο, με εφεδρεία στη μετάφραση της ενεργής γλώσσας αν παραλειφθεί.',
            items:
              'Πλήρης λίστα στοιχείων εντολών διαθέσιμων για αναζήτηση και εκτέλεση.',
            open: 'Αν το παράθυρο διαλόγου είναι ανοιχτό, αμφίδρομα συνδέσιμο μέσω [(open)].',
            placeholder:
              'Κείμενο υποδείγματος που εμφανίζεται στο πεδίο αναζήτησης όταν είναι κενό.',
            execute:
              'Εκπέμπεται όταν ο χρήστης επιλέγει μια εντολή, εκπέμποντας το επιλεγμένο στοιχείο.',
            showActiveHighlight:
              'Επιστρέφει αν η ενεργή γραμμή πρέπει να εμφανίζει το επισημασμένο φόντο για τον δεδομένο επίπεδο δείκτη.',
          },
          tabs: {
            activeTab:
              'Τιμή της τρέχουσας ενεργής καρτέλας, αμφίδρομα συνδέσιμη μέσω [(activeTab)].',
            size: 'Οπτικό μέγεθος των καρτελών.',
            variant: 'Οπτικό στιλ της γραμμής καρτελών: υπογράμμιση ή γεμάτο.',
            changed:
              'Εκπέμπεται με την τιμή της νέας ενεργής καρτέλας κάθε φορά που αλλάζει η ενεργή καρτέλα.',
            registerTab:
              'Καταχωρεί μια θυγατρική καρτέλα ώστε να εμφανίζεται στη γραμμή καρτελών. Καλείται αυτόματα από το ea-tab.',
            selectTab: 'Ενεργοποιεί μέσω κώδικα την καρτέλα με τη δεδομένη τιμή.',
            unregisterTab:
              'Αφαιρεί μια προηγουμένως καταχωρημένη θυγατρική καρτέλα. Καλείται αυτόματα από το ea-tab.',
          },
          tab: {
            disabled:
              'Απενεργοποιεί αυτήν την καρτέλα, αποτρέποντας τον χρήστη από το να την επιλέξει.',
            id: 'id που εφαρμόζεται στο κουμπί καρτέλας και στον πίνακά της, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Ετικέτα κειμένου που εμφανίζεται στο κουμπί καρτέλας.',
            value:
              'Μοναδική τιμή που προσδιορίζει αυτήν την καρτέλα στο γονικό της ea-tabs.',
          },
          'date-picker': {
            disabled: 'Απενεργοποιεί τον επιλογέα ημερομηνίας.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από το πεδίο, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            format: 'Μορφή εμφάνισης της επιλεγμένης ημερομηνίας (short, medium ή long).',
            hint: 'Βοηθητικό κείμενο κάτω από το πεδίο, κρυμμένο όταν υπάρχει σφάλμα.',
            id: 'id που εφαρμόζεται στο στοιχείο ενεργοποίησης και στο for της ετικέτας, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Ετικέτα που εμφανίζεται πάνω από το πεδίο.',
            locale:
              'Ετικέτα locale BCP 47 για τη μορφοποίηση ημερομηνιών, με εναλλακτική τη γενική locale αν παραλειφθεί.',
            maxDate:
              'Τελευταία ημερομηνία που μπορεί να επιλέξει ο χρήστης; μεταγενέστερες ημερομηνίες είναι απενεργοποιημένες στο ημερολόγιο.',
            minDate:
              'Πρώτη ημερομηνία που μπορεί να επιλέξει ο χρήστης; προγενέστερες ημερομηνίες είναι απενεργοποιημένες στο ημερολόγιο.',
            placeholder:
              'Κείμενο υποδείγματος στο στοιχείο ενεργοποίησης όταν δεν έχει επιλεγεί ημερομηνία.',
            readonly:
              'Εμφανίζει το πεδίο μόνο για ανάγνωση, εμποδίζοντας το άνοιγμα του ημερολογίου.',
            required: 'Επισημαίνει το πεδίο ως υποχρεωτικό.',
            size: 'Οπτικό μέγεθος του στοιχείου ενεργοποίησης του επιλογέα ημερομηνίας.',
            value: 'Τρέχουσα επιλεγμένη ημερομηνία, αμφίδρομα συνδέσιμη μέσω [(value)].',
            weekStartsOn:
              'Πρώτη ημέρα της εβδομάδας στο πλέγμα του ημερολογίου (0 για Κυριακή, 1 για Δευτέρα).',
            changed:
              'Εκπέμπεται όταν αλλάζει η επιλεγμένη ημερομηνία, συμπεριλαμβανομένης της εκκαθάρισης.',
            clear: 'Καθαρίζει την επιλεγμένη ημερομηνία και εκπέμπει changed με null.',
            close: 'Κλείνει το αναδυόμενο παράθυρο του ημερολογίου.',
            focus: 'Μεταφέρει την εστίαση πληκτρολογίου στο κουμπί ενεργοποίησης.',
            onPopoverCloseRequested:
              'Κλείνει το αναδυόμενο παράθυρο όταν ο χρήστης κάνει κλικ εκτός του επιλογέα ημερομηνίας.',
            open: 'Ανοίγει το αναδυόμενο παράθυρο του ημερολογίου και μεταφέρει την εστίαση στο κελί της εστιασμένης ημέρας.',
            toggle:
              'Εναλλάσσει το αναδυόμενο παράθυρο του ημερολογίου μεταξύ ανοιχτού και κλειστού.',
          },
          menu: {
            ariaLabel:
              'Προσβάσιμη ετικέτα για τη λίστα μενού, με εναλλακτική την ενεργή locale αν παραλειφθεί.',
            disabled: 'Απενεργοποιεί το μενού, εμποδίζοντας το να ανοίξει.',
            id: 'id που εφαρμόζεται στο στοιχείο λίστας μενού, δημιουργείται αυτόματα αν παραλειφθεί.',
            open: 'Αν το μενού είναι ανοιχτό, αμφίδρομα συνδέσιμο μέσω [(open)].',
            placement:
              'Τοποθέτηση της λίστας μενού σε σχέση με το στοιχείο ενεργοποίησης.',
            closed: 'Εκπέμπεται όταν το μενού κλείνει.',
            opened: 'Εκπέμπεται όταν το μενού ανοίγει.',
            close:
              'Κλείνει το μενού και προαιρετικά επαναφέρει την εστίαση στο στοιχείο ενεργοποίησης.',
            focusFirstItem:
              'Μεταφέρει την εστίαση πληκτρολογίου στο πρώτο ενεργοποιημένο στοιχείο του μενού.',
            onPopoverCloseRequested:
              'Κλείνει το μενού όταν ο χρήστης κάνει κλικ εκτός αυτού.',
            openAt:
              'Ανοίγει το μενού αγκυρωμένο στο δοθέν στοιχείο ενεργοποίησης και εστιάζει στο πρώτο στοιχείο.',
            toggleAt:
              'Εναλλάσσει την κατάσταση ανοίγματος του μενού, αγκυρώνοντάς το στο δοθέν στοιχείο ενεργοποίησης.',
          },
          'menu-item': {
            disabled: 'Απενεργοποιεί το στοιχείο και αποτρέπει τα συμβάντα κλικ.',
            variant:
              'Οπτικό στιλ του στοιχείου; χρησιμοποιήστε danger για καταστροφικές ενέργειες.',
            clicked:
              'Εκπέμπεται όταν ενεργοποιείται το στοιχείο; το μενού γονέας κλείνει αμέσως μετά.',
          },
          'multi-select': {
            disabled: 'Απενεργοποιεί το multi-select.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από το πεδίο, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            hint: 'Βοηθητικό κείμενο κάτω από το πεδίο, κρυμμένο όταν υπάρχει σφάλμα.',
            id: 'id που εφαρμόζεται στον ενεργοποιητή και στο for της ετικέτας, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Ετικέτα που εμφανίζεται πάνω από το πεδίο.',
            maxVisibleChips:
              'Μέγιστος αριθμός chips που εμφανίζονται στον ενεργοποιητή πριν τα υπόλοιπα συμπτυχθούν σε ένδειξη πλήθους.',
            options:
              'Λίστα επιλέξιμων επιλογών που αποδίδονται στην αναπτυσσόμενη λίστα.',
            placeholder:
              'Κείμενο υποδείγματος που εμφανίζεται στον ενεργοποιητή όσο δεν έχει επιλεγεί καμία επιλογή.',
            readonly: 'Εμφανίζει το πεδίο μόνο για ανάγνωση.',
            required: 'Επισημαίνει το πεδίο ως υποχρεωτικό.',
            searchable:
              'Εμφανίζει το πεδίο αναζήτησης στην κορυφή του αναδυόμενου παραθύρου.',
            searchPlaceholder:
              'Κείμενο υποδείγματος που εμφανίζεται στο πεδίο αναζήτησης όταν δεν υπάρχει όρος αναζήτησης.',
            selectAll:
              'Εμφανίζει τη γραμμή επιλογής όλων με τρεις καταστάσεις στην κορυφή της λίστας επιλογών.',
            size: 'Οπτικό μέγεθος του ενεργοποιητή του multi-select.',
            value: 'Τιμές επιλεγμένων επιλογών, αμφίδρομα συνδέσιμες μέσω [(value)].',
            changed: 'Εκπέμπεται με τη νέα τιμή κάθε φορά που αλλάζει η επιλογή.',
            clear: 'Καθαρίζει όλες τις επιλογές και διακόπτει τη διάδοση του συμβάντος.',
            handlePopoverKeydown:
              'Διαχειρίζεται την πλοήγηση με πληκτρολόγιο στο ανοιχτό αναδυόμενο παράθυρο, δρομολογώντας τα πλήκτρα βέλους, Enter, Space και Escape.',
            onPopoverCloseRequested:
              'Καλείται από το αναδυόμενο παράθυρο όταν ο χρήστης κάνει κλικ εκτός ή κάνει κύλιση. Κλείνει τον πίνακα και επισημαίνει το πεδίο ως αγγιγμένο.',
            orderedValues:
              'Επιστρέφει το δεδομένο σύνολο τιμών αναδιατεταγμένο ώστε να ταιριάζει με τον πίνακα επιλογών εισόδου.',
            removeChip: 'Αφαιρεί τη δεδομένη επιλογή από την τρέχουσα επιλογή.',
            toggleOption:
              'Εναλλάσσει την ένταξη της δεδομένης επιλογής στην τρέχουσα επιλογή.',
            toggleSelectAll:
              'Επιλέγει όλες τις φιλτραρισμένες επιλογές αν κάποια είναι αποεπιλεγμένη, ή αποεπιλέγει όλες αν είναι επιλεγμένες.',
          },
          dropdown: {
            disabled: 'Απενεργοποιεί το αναπτυσσόμενο μενού.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από το πεδίο, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            hint: 'Βοηθητικό κείμενο κάτω από το πεδίο, κρυμμένο όταν υπάρχει σφάλμα.',
            id: 'id που εφαρμόζεται στον ενεργοποιητή και στο for της ετικέτας, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Ετικέτα που εμφανίζεται πάνω από το πεδίο.',
            options:
              'Λίστα επιλέξιμων επιλογών που αποδίδονται στην αναπτυσσόμενη λίστα.',
            placeholder:
              'Κείμενο υποδείγματος που εμφανίζεται στον ενεργοποιητή όσο δεν έχει επιλεγεί καμία επιλογή.',
            readonly: 'Εμφανίζει το πεδίο μόνο για ανάγνωση.',
            required: 'Επισημαίνει το πεδίο ως υποχρεωτικό.',
            size: 'Οπτικό μέγεθος του ενεργοποιητή του αναπτυσσόμενου μενού.',
            value: 'Τρέχουσα επιλεγμένη τιμή, αμφίδρομα συνδέσιμη μέσω [(value)].',
            changed: 'Εκπέμπεται με τη νέα τιμή όταν ο χρήστης επιλέγει μια επιλογή.',
            close: 'Κλείνει την αναπτυσσόμενη λίστα χωρίς να αλλάξει την τρέχουσα τιμή.',
            focus:
              'Μεταφέρει την εστίαση πληκτρολογίου στον ενεργοποιητή του αναπτυσσόμενου μενού.',
            onPopoverCloseRequested:
              'Καλείται από το αναδυόμενο παράθυρο όταν ο χρήστης κάνει κλικ εκτός του αναπτυσσόμενου μενού. Κλείνει τον πίνακα και επισημαίνει το πεδίο ως αγγιγμένο.',
            select: 'Επιλέγει μέσω κώδικα τη δεδομένη επιλογή και κλείνει τη λίστα.',
            toggle:
              'Εναλλάσσει την αναπτυσσόμενη λίστα μεταξύ ανοιχτής και κλειστής κατάστασης.',
          },
          'file-uploader': {
            accept:
              "Τύποι MIME και επεκτάσεις αρχείων που δέχεται η ζώνη απόθεσης, διαχωρισμένοι με κόμμα, π.χ. 'image/*,.pdf'.",
            disabled: 'Απενεργοποιεί τον uploader.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από το πεδίο, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            hint: 'Βοηθητικό κείμενο κάτω από το πεδίο, κρυμμένο όταν υπάρχει σφάλμα.',
            id: 'id που εφαρμόζεται στη ζώνη απόθεσης και στο for της ετικέτας, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Ετικέτα που εμφανίζεται πάνω από το πεδίο.',
            maxFiles:
              'Μέγιστος συνολικός αριθμός αρχείων. Τα αρχεία πέραν του ορίου απορρίπτονται.',
            maxSize:
              'Μέγιστο μέγεθος ανά αρχείο σε bytes. Μεγαλύτερα αρχεία απορρίπτονται.',
            multiple: 'Επιτρέπει την επιλογή περισσότερων από ένα αρχείου ταυτόχρονα.',
            progress:
              'Χάρτης προόδου ανά αρχείο (0-100) με κλειδί την ταυτότητα File. Παραλείψτε το για να κρύψετε τις γραμμές προόδου.',
            required: 'Επισημαίνει το πεδίο ως υποχρεωτικό.',
            showFileList:
              'Εμφανίζει τη λίστα επιλεγμένων αρχείων κάτω από τη ζώνη απόθεσης.',
            size: 'Οπτικό μέγεθος του uploader.',
            value: 'Τρέχουσα λίστα αρχείων, αμφίδρομα συνδέσιμη μέσω [(value)].',
            fileRemoved:
              'Εκπέμπεται όταν ένα αρχείο αφαιρείται μέσω του κουμπιού αφαίρεσης της γραμμής του.',
            rejected:
              'Εκπέμπεται όταν ένα ή περισσότερα αρχεία δεν περνούν την επικύρωση, με τον λόγο κάθε απόρριψης.',
            trackFile:
              'Επιστρέφει σταθερό κλειδί παρακολούθησης για ένα αρχείο, που χρησιμοποιείται εσωτερικά από τη λίστα αρχείων.',
          },
          popover: {
            anchor:
              'Στοιχείο υποδοχής ή ElementRef ως προς το οποίο το popover τοποθετείται.',
            ariaLabel:
              'Προσβάσιμη ετικέτα για την επιφάνεια του popover. Παρέχετέ τη όταν το popover δεν περιέχει ορατή επικεφαλίδα.',
            clamp:
              'Περιορίζει το popover εντός του viewport όταν διαφορετικά θα υπερχείλιζε.',
            closeOnEscape: 'Κλείνει το popover όταν πατηθεί το Escape.',
            closeOnOutsideClick:
              'Κλείνει το popover όταν ο χρήστης κάνει κλικ εκτός του popover και της άγκυρας.',
            flip: 'Αντιστρέφεται στην αντίθετη πλευρά όταν η ζητούμενη τοποθέτηση υπερχειλίζει το viewport.',
            matchAnchorWidth:
              'Ορίζει το min-width του popover ώστε να ταιριάζει με το πλάτος της άγκυρας.',
            offset: 'Κενό σε px μεταξύ της άγκυρας και της επιφάνειας του popover.',
            open: 'Αν το popover είναι αυτή τη στιγμή ανοιχτό.',
            placement: 'Προτιμώμενη θέση του popover σε σχέση με την άγκυρά του.',
            role: 'Ρόλος ARIA που εφαρμόζεται στην επιφάνεια του popover.',
            scrollBehavior:
              'Πώς αντιδρά το popover σε συμβάντα κύλισης και αλλαγής μεγέθους όταν είναι ανοιχτό: reposition, close ή ignore.',
            surfaceId:
              'id DOM για την επιφάνεια του popover, που χρησιμοποιείται από τα στοιχεία ενεργοποίησης μέσω aria-controls.',
            closeRequested:
              'Εκπέμπεται όταν το popover ζητά να κλείσει. Ο γονέας πρέπει να το αντικατοπτρίσει στο [open].',
          },
          'accordion-item': {
            disabled: 'Απενεργοποιεί αυτό το στοιχείο, αποτρέποντας την εναλλαγή του.',
            id: 'id που εφαρμόζεται στο κουμπί κεφαλίδας και στον πίνακα του στοιχείου, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Κείμενο που εμφανίζεται στο κουμπί κεφαλίδας του στοιχείου.',
            value:
              'Μοναδικό κλειδί που αναγνωρίζει αυτό το στοιχείο μέσα στο γονικό accordion.',
          },
          breadcrumbs: {
            ariaLabel:
              'Προσβάσιμη ετικέτα για τον πλοηγό breadcrumb, με εναλλακτική χρήση της μετάφρασης της ενεργής γλώσσας αν παραλειφθεί.',
            items:
              'Πίνακας στοιχείων breadcrumb. Τα στοιχεία με href εμφανίζονται ως σύνδεσμοι, τα υπόλοιπα ως κουμπιά, και το τελευταίο είναι μη διαδραστικό.',
            separator:
              'Οπτικό στιλ του διαχωριστικού που αποδίδεται μεταξύ των στοιχείων breadcrumb.',
            clicked:
              'Εκπέμπεται όταν ενεργοποιείται ένα στοιχείο breadcrumb που δεν είναι απενεργοποιημένο ούτε τελευταίο.',
          },
          drawer: {
            ariaLabel:
              'Προσβάσιμη ετικέτα για τον πίνακα του συρταριού όταν η επικεφαλίδα του δεν είναι αρκετά περιγραφική.',
            closeOnBackdrop: 'Κλείνει το συρτάρι όταν ο χρήστης κάνει κλικ στο υπόβαθρο.',
            closeOnEscape: 'Κλείνει το συρτάρι όταν ο χρήστης πατά το πλήκτρο Escape.',
            id: 'id που εφαρμόζεται στο στοιχείο dialog, δημιουργείται αυτόματα αν παραλειφθεί.',
            open: 'Αν το συρτάρι είναι ανοιχτό, αμφίδρομα συνδέσιμο μέσω [(open)].',
            position:
              'Άκρη του παραθύρου εμφάνισης από την οποία εισέρχεται το συρτάρι με ολίσθηση.',
            showClose: 'Εμφανίζει το κουμπί κλεισίματος στην κεφαλίδα του συρταριού.',
            size: 'Αχρηστευμένη προεπιλογή πλάτους του πίνακα συρταριού. Χρησιμοποιήστε width.',
            width: 'Πλάτος του πίνακα του συρταριού κατά τον κύριο άξονά του.',
            closed:
              'Εκπέμπεται όταν το συρτάρι κλείνει, είτε μέσω του κουμπιού, του υποβάθρου, είτε με Escape.',
            opened: 'Εκπέμπεται μόλις το συρτάρι εμφανιστεί μέσω showModal().',
          },
          'data-table': {
            bordered: 'Αποδίδει περίγραμμα γύρω από κάθε κελί.',
            columns:
              'Ορισμοί στηλών που περιγράφουν το κλειδί, την ετικέτα και προαιρετικά ταξινόμηση ή πρότυπο κάθε πεδίου.',
            data: 'Πίνακας αντικειμένων γραμμών προς εμφάνιση στον πίνακα.',
            density:
              'Προεπιλογή κατακόρυφης πυκνότητας που ελέγχει την εσοχή γραμμών και κελιών κεφαλίδας.',
            hoverable:
              'Επισημαίνει τη γραμμή κάτω από τον δείκτη κατά την τοποθέτηση του ποντικιού.',
            noDataText:
              'Κείμενο που εμφανίζεται στην κενή κατάσταση, με εναλλακτική τη μετάφραση της ενεργής γλωσσικής ρύθμισης.',
            sort: 'Τρέχουσα κατάσταση ταξινόμησης (κλειδί στήλης και κατεύθυνση), αμφίδρομα συνδέσιμη μέσω [(sort)].',
            stickyHeader:
              'Καρφώνει τη γραμμή κεφαλίδας στην κορυφή του πίνακα κατά την κύλιση του περιεχομένου.',
            striped: 'Εφαρμόζει εναλλασσόμενη σκίαση φόντου σε μονές και ζυγές γραμμές.',
            trackBy:
              'Κλειδί ιδιότητας γραμμής που χρησιμοποιείται από τον μηχανισμό ανίχνευσης αλλαγών του Angular για αποδοτική αναγνώριση γραμμών.',
            sorted:
              'Εκπέμπεται κάθε φορά που αλλάζει η στήλη ή η κατεύθυνση ταξινόμησης μέσω κλικ στην κεφαλίδα.',
          },
          'radio-group': {
            ariaLabel: 'Προσβάσιμη ετικέτα της ομάδας όταν δεν αποδίδεται ορατή ετικέτα.',
            disabled: 'Απενεργοποιεί όλες τις επιλογές ραδιοφώνου στην ομάδα.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από την ομάδα, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            hint: 'Βοηθητικό κείμενο κάτω από την ομάδα, κρυμμένο όταν υπάρχει σφάλμα.',
            id: 'id που εφαρμόζεται στο στοιχείο ομάδας και στο for της ετικέτας, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Κειμενική ετικέτα που αποδίδεται πάνω από την ομάδα.',
            name: 'Κοινό χαρακτηριστικό name που εφαρμόζεται σε όλες τις επιλογές ραδιοφώνου της ομάδας, δημιουργείται αυτόματα αν παραλειφθεί.',
            orientation: 'Κατεύθυνση διάταξης των επιλογών ραδιοφώνου εντός της ομάδας.',
            required: 'Επισημαίνει την ομάδα ως υποχρεωτική.',
            size: 'Οπτικό μέγεθος που εφαρμόζεται σε όλες τις επιλογές ραδιοφώνου της ομάδας.',
            value: 'Τρέχουσα επιλεγμένη τιμή, αμφίδρομα συνδέσιμη μέσω [(value)].',
            changed: 'Εκπέμπεται με τη νέα τιμή όταν ο χρήστης επιλέγει μια επιλογή.',
            select: 'Επιλέγει μέσω κώδικα την επιλογή με τη δοθείσα τιμή.',
          },
          segmented: {
            ariaLabel:
              'Προσβάσιμη ετικέτα για το στοιχείο ελέγχου όταν δεν αποδίδεται ορατή ετικέτα.',
            disabled: 'Απενεργοποιεί το τμηματικό στοιχείο ελέγχου.',
            errorMsg:
              'Μήνυμα σφάλματος κάτω από το πεδίο, που αντικαθιστά τη βοήθεια και επισημαίνει το πεδίο ως μη έγκυρο.',
            fullWidth:
              'Επεκτείνει το στοιχείο ελέγχου ώστε να γεμίζει το πλάτος του περιέκτη του.',
            hint: 'Βοηθητικό κείμενο κάτω από το πεδίο, κρυμμένο όταν υπάρχει σφάλμα.',
            id: 'id που εφαρμόζεται στο στοιχείο ελέγχου και στο for της ετικέτας, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Ετικέτα κειμένου που αποδίδεται πάνω από το στοιχείο ελέγχου.',
            options:
              'Πίνακας επιλογών που αποδίδονται ως κουμπιά εναλλαγής στο στοιχείο ελέγχου.',
            required: 'Επισημαίνει το πεδίο ως υποχρεωτικό.',
            size: 'Οπτικό μέγεθος του τμηματικού στοιχείου ελέγχου.',
            value: 'Τιμή της επιλεγμένης επιλογής, αμφίδρομα συνδέσιμη μέσω [(value)].',
            changed:
              'Εκπέμπεται με τη νέα τιμή όταν ο χρήστης επιλέγει διαφορετική επιλογή.',
            select: 'Επιλέγει μέσω κώδικα την καθορισμένη επιλογή.',
          },
          'tree-node': {
            collapseLabel: 'Προσβάσιμη ετικέτα για το κουμπί σύμπτυξης.',
            disabled:
              'Απενεργοποιεί την αλληλεπίδραση με τον κόμβο και τους απογόνους του.',
            expandedIds: 'Σύνολο αναγνωριστικών κόμβων που είναι τρέχοντως αναπτυγμένοι.',
            expandLabel: 'Προσβάσιμη ετικέτα για το κουμπί ανάπτυξης.',
            focusedId:
              'Αναγνωριστικό του κόμβου που κατέχει τρέχοντως την εστίαση κυλιόμενου tabindex.',
            level:
              'Βάθος από τη ρίζα του δέντρου (με βάση το 0), χρησιμοποιείται για εσοχή και aria-level.',
            node: 'Αντικείμενο δεδομένων που περιγράφει αυτόν τον κόμβο, συμπεριλαμβανομένων του id, της ετικέτας, των θυγατρικών και της κατάστασης απενεργοποίησης.',
            posInSet:
              'Θέση με βάση το 1 μεταξύ των θυγατρικών του γονικού κόμβου, χρησιμοποιείται για το aria-posinset.',
            selectedId:
              'Αναγνωριστικό του τρέχοντος επιλεγμένου κόμβου ή null αν δεν υπάρχει επιλογή.',
            setSize:
              'Συνολικός αριθμός αδελφών στη λίστα θυγατρικών του γονικού κόμβου, χρησιμοποιείται για το aria-setsize.',
            select:
              'Εκπέμπεται όταν ο χρήστης κάνει κλικ ή ενεργοποιεί τη γραμμή του κόμβου.',
            toggle:
              'Εκπέμπεται με το αναγνωριστικό του κόμβου όταν ο χρήστης κάνει κλικ στο βέλος ανάπτυξης ή σύμπτυξης.',
          },
          tree: {
            ariaLabel: 'Προσβάσιμη ετικέτα για το στοιχείο δέντρου.',
            disabled: 'Απενεργοποιεί όλους τους κόμβους του δέντρου.',
            expandedIds:
              'Αναγνωριστικά τρέχοντως αναπτυγμένων κόμβων κλάδου, αμφίδρομα συνδέσιμα μέσω [(expandedIds)].',
            nodes: 'Πίνακας αντικειμένων δεδομένων κόμβων που ορίζει την ιεραρχία.',
            selectedId:
              'Αναγνωριστικό του τρέχοντος επιλεγμένου κόμβου, αμφίδρομα συνδέσιμο μέσω [(selectedId)].',
            size: 'Οπτικό μέγεθος του δέντρου, που κλιμακώνει το κείμενο και τα διαστήματα αναλογικά.',
            nodeClick:
              'Εκπέμπεται με τα δεδομένα του κόμβου όταν ο χρήστης επιλέγει έναν κόμβο.',
          },
          step: {
            completed:
              'Επισημαίνει το βήμα ως ολοκληρωμένο, ενημερώνοντας τον οπτικό δείκτη του.',
            disabled: 'Αποτρέπει την ενεργοποίηση του βήματος.',
            id: 'id που εφαρμόζεται στο πλαίσιο του βήματος και στην καρτέλα του, δημιουργείται αυτόματα αν παραλειφθεί.',
            label: 'Ετικέτα κειμένου που εμφανίζεται στον δείκτη βήματος.',
            optional:
              'Επισημαίνει το βήμα ως προαιρετικό, εμφανίζεται ως υπόδειξη κάτω από την ετικέτα.',
          },
          stepper: {
            activeStep:
              'Δείκτης του ενεργού βήματος (με βάση το μηδέν), αμφίδρομα δεσμεύσιμος μέσω [(activeStep)].',
            disabled:
              'Απενεργοποιεί ολόκληρο το stepper και την πλοήγηση μεταξύ βημάτων.',
            id: 'id που εφαρμόζεται στο στοιχείο υποδοχής του stepper, παράγεται αυτόματα αν παραλειφθεί.',
            linear:
              'Απαιτεί κάθε μη προαιρετικό βήμα να είναι σημειωμένο ως ολοκληρωμένο πριν ο χρήστης προχωρήσει.',
            size: 'Οπτικό μέγεθος του stepper, κλιμακώνοντας τους δείκτες βημάτων και τις ετικέτες μαζί.',
            changed:
              'Εκπέμπεται με τον νέο δείκτη ενεργού βήματος όταν ο χρήστης μεταβαίνει σε άλλο βήμα.',
            canNavigateTo:
              'Επιστρέφει αν το βήμα στον δοθέντα δείκτη είναι προσβάσιμο από την τρέχουσα κατάσταση.',
            indexOf:
              'Επιστρέφει τον δείκτη του δοθέντος βήματος, ή -1 αν δεν είναι καταχωρημένο.',
            selectStep: 'Ενεργοποιεί το βήμα στον δοθέντα δείκτη αν είναι προσβάσιμο.',
          },
          'transfer-list': {
            disabled:
              'Απενεργοποιεί ολόκληρη τη λίστα μεταφοράς και όλα τα χειριστήρια μετακίνησης.',
            items:
              'Πλήρης δεξαμενή στοιχείων διαθέσιμων και στα δύο πάνελ, αναγνωρίσιμων μέσω id.',
            selectedIds:
              'Τα ids των στοιχείων που βρίσκονται στην πλευρά στόχου (δεξιά), αμφίδρομα δεσμεύσιμα μέσω [(selectedIds)].',
            size: 'Οπτικό μέγεθος της λίστας μεταφοράς.',
            sourceLabel:
              'Επικεφαλίδα που εμφανίζεται πάνω από το πάνελ πηγής (αριστερά), με εναλλακτική την προεπιλογή της ενεργής γλώσσας.',
            targetLabel:
              'Επικεφαλίδα που εμφανίζεται πάνω από το πάνελ στόχου (δεξιά), με εναλλακτική την προεπιλογή της ενεργής γλώσσας.',
          },
          'virtual-list': {
            itemHeight:
              'Ύψος σε pixel κάθε γραμμής. Όλες οι γραμμές πρέπει να μοιράζονται το ίδιο σταθερό ύψος.',
            items:
              'Πλήρης πίνακας στοιχείων δεδομένων για απόδοση. Μόνο το ορατό τμήμα είναι προσαρτημένο ανά πάσα στιγμή.',
            overscan:
              'Αριθμός επιπλέον γραμμών που αποδίδονται πάνω και κάτω από το ορατό παράθυρο για να μειωθούν τα κενά άκρα κατά την γρήγορη κύλιση.',
            viewportHeight: 'Ύψος σε pixel της κυλιόμενης περιοχής προβολής.',
            scrollIndexChange:
              'Εκπέμπεται με τον δείκτη της πρώτης ορατής γραμμής στην κορυφή της περιοχής προβολής κάθε φορά που ο χρήστης κυλάει.',
            scrollToIndex:
              'Κυλάει την περιοχή προβολής ώστε η γραμμή στον δοθέντα δείκτη να εμφανίζεται στην κορυφή, περιορισμένη στα όρια της λίστας.',
          },
          'field-label': {
            forId:
              'id του συσχετισμένου χειριστηρίου. Αποδίδει <label for> όταν ορίζεται, αλλιώς <span>.',
            labelId:
              'id που εφαρμόζεται στο αποδιδόμενο στοιχείο ετικέτας ώστε τα χειριστήρια να μπορούν να το αναφέρουν μέσω aria-labelledby.',
            required: 'Εμφανίζει ένδειξη υποχρεωτικού πεδίου στην ετικέτα.',
            text: 'Κείμενο ετικέτας που αποδίδεται μέσα στο στοιχείο ετικέτας.',
          },
          'field-messages': {
            error:
              'Μήνυμα σφάλματος για εμφάνιση. Όταν ορίζεται, η υπόδειξη αποκρύπτεται και το μήνυμα ανακοινώνεται ως ειδοποίηση.',
            hint: 'Βοηθητικό κείμενο που εμφανίζεται κάτω από το πεδίο όταν δεν υπάρχει σφάλμα.',
            id: 'Βασικό id που χρησιμοποιείται για την παραγωγή των ids ARIA για τα στοιχεία σφάλματος και υπόδειξης.',
          },
          dialog: {
            ariaLabel:
              'Προσβάσιμη ετικέτα για τον διάλογο όταν η θέση κεφαλίδας δεν περιέχει ορατό τίτλο.',
            closeOnBackdrop:
              'Κλείνει τον διάλογο όταν ο χρήστης κάνει κλικ στην περιοχή φόντου εκτός του πάνελ.',
            closeOnEscape: 'Κλείνει τον διάλογο όταν ο χρήστης πατά Escape.',
            id: 'id που εφαρμόζεται στο εγγενές στοιχείο dialog, παράγεται αυτόματα αν παραλειφθεί.',
            open: 'Αν ο διάλογος εμφανίζεται, αμφίδρομα δεσμεύσιμο μέσω [(open)].',
            showClose: 'Εμφανίζει το κουμπί κλεισίματος στην κεφαλίδα του διαλόγου.',
            size: 'Απαρχαιωμένος εναλλακτικός για width. Χρησιμοποιήστε το width.',
            width: 'Προεπιλογή πλάτους για το πάνελ του διαλόγου.',
            closed:
              'Εκπέμπεται όταν ο διάλογος κλείνει, ανεξάρτητα από το αν έκλεισε ο χρήστης ή μέσω κώδικα.',
            opened: 'Εκπέμπεται μόλις ο διάλογος εμφανιστεί μέσω showModal().',
          },
        },
      },
      sharedOptions: {
        fruitOptions: [
          { value: 'apple', label: 'Μήλο' },
          { value: 'banana', label: 'Μπανάνα' },
          { value: 'cherry', label: 'Κεράσι' },
          { value: 'date', label: 'Χουρμάς' },
        ],
        viewOptions: [
          { value: 'list', label: 'Λίστα' },
          { value: 'grid', label: 'Πλέγμα' },
          { value: 'kanban', label: 'Kanban' },
        ],
        themeOptions: [
          { value: 'light', label: 'Φωτεινό' },
          { value: 'dark', label: 'Σκοτεινό' },
        ],
        monthOptions: [
          { value: 'jan', label: 'Ιανουάριος' },
          { value: 'feb', label: 'Φεβρουάριος' },
          { value: 'mar', label: 'Μάρτιος' },
          { value: 'apr', label: 'Απρίλιος' },
          { value: 'may', label: 'Μάιος' },
          { value: 'jun', label: 'Ιούνιος' },
          { value: 'jul', label: 'Ιούλιος' },
          { value: 'aug', label: 'Αύγουστος' },
          { value: 'sep', label: 'Σεπτέμβριος' },
          { value: 'oct', label: 'Οκτώβριος' },
          { value: 'nov', label: 'Νοέμβριος' },
          { value: 'dec', label: 'Δεκέμβριος' },
        ],
        breadcrumbHome: 'Αρχική',
        breadcrumbProducts: 'Προϊόντα',
        breadcrumbLaptops: 'Φορητοί',
        breadcrumbMacBookPro: 'MacBook Pro',
        breadcrumbDashboard: 'Πίνακας',
        breadcrumbSettings: 'Ρυθμίσεις',
      },
    },
  },
};

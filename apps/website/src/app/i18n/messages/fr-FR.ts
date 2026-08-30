import type { WebMessages } from '../web-messages.types';

/* Narrow no-break space (U+202F) inserted by hand before high French
   punctuation (? ! : ; ») and after («) so the typography looks right
   without running every string through `frenchSpacing()` at render time. */

export const frFR: WebMessages = {
  common: {
    skipToContent: 'Aller au contenu principal',
    brandHome: 'Accueil Eagami',
    themeToggleTooltip: 'Changer de thème',
    themeToggleLabel: next => `Passer en mode ${next === 'light' ? 'clair' : 'sombre'}`,
    localeMenuLabel: 'Langue',
    localeMenuTooltip: 'Changer de langue',
    activeLocale: label => `Langue actuelle : ${label}`,
    footer: {
      copyright: year => `© ${year} Eagami.`,
      allRightsReserved: 'Tous droits réservés.',
      navLabel: 'Pied de page',
      siteHeading: 'À propos',
      libraryHeading: 'Eagami UI',
      guidesHeading: 'Guides',
      integrationsHeading: 'Intégrations',
      resourcesHeading: 'Ressources',
      legalHeading: 'Mentions légales',
      homeLink: 'Accueil',
      contactLink: 'Contact',
      sourceCodeLink: 'Code source',
      npmLink: 'npm',
    },
    codeSnippet: {
      copyLabel: 'Copier dans le presse-papiers',
      copySuccess: 'Copié dans le presse-papiers',
      copyError: 'Impossible de copier dans le presse-papiers',
    },
    copyLinkLabel: 'Copier le lien vers la section',
  },
  home: {
    metaTitle: 'Eagami',
    metaDescription:
      'Conception web élégante, et maison d’Eagami UI : une bibliothèque de composants Angular légère et accessible.',
    hero: {
      tagline: 'conception web élégante.',
      ctaPrimary: 'Prendre contact',
      ctaSecondary: 'Voir les projets récents →',
      scrollHint: 'Faire défiler jusqu’aux services',
    },
    services: {
      title: 'Services',
      lede: 'D’une simple page d’accueil à une application web complète, et tout ce qui suit le lancement.',
      featuresHeading: 'Fonctionnalités',
      uiNote: {
        before: 'Les projets de grande envergure peuvent s’appuyer sur',
        link: 'Eagami UI',
        after:
          ', une bibliothèque de composants sur mesure, pour un langage visuel cohérent et moderne sur tout le site.',
      },
      core: [
        {
          title: 'Sites web sur mesure',
          description:
            'Un site complet conçu de zéro : configuration du domaine, hébergement, identité visuelle, design et mise en ligne. Révisions illimitées jusqu’au lancement.',
        },
        {
          title: 'Maintenance continue',
          description:
            'Entretien mensuel couvrant l’hébergement, les correctifs de sécurité, les mises à jour des dépendances, les retouches de contenu et l’examen des analyses.',
        },
      ],
      addOns: [
        {
          title: 'Gestion des utilisateurs',
          description:
            'Authentification, inscription et récupération de mot de passe, plus un tableau de bord d’administration avec métriques et contrôles par utilisateur.',
          iconSlug: 'users',
        },
        {
          title: 'Paiements en ligne',
          description:
            'Paiements en ligne (Stripe par défaut, autres prestataires sur demande), avec formulaires personnalisables et facturation récurrente.',
          iconSlug: 'credit-card',
        },
        {
          title: 'Support multilingue',
          description:
            'Prise en charge de plusieurs langues, avec détection automatique optionnelle depuis le navigateur du visiteur.',
          iconSlug: 'languages',
        },
        {
          title: 'Thèmes',
          description:
            'Bascule mode clair/sombre et thèmes de couleurs entièrement personnalisables.',
          iconSlug: 'moon',
        },
        {
          title: 'Analyses et statistiques',
          description:
            'Métriques de trafic (sources, appareils, emplacements), ainsi que le suivi d’événements personnalisés.',
          iconSlug: 'bar-chart',
        },
        {
          title: 'E-mails et notifications',
          description:
            'E-mails automatisés pour l’activité du compte, les reçus et les annonces.',
          iconSlug: 'mail',
        },
      ],
    },
    projects: {
      title: 'Projets récents',
      lede: 'Quelques sites en cours de développement.',
      previousAriaLabel: 'Projets précédents',
      nextAriaLabel: 'Projets suivants',
      regionAriaLabel: 'Projets récents',
      showing: title => `Affichage de ${title}`,
      cards: [
        {
          title: 'London Chess',
          description:
            'Un point central pour le London Chess Club et les événements d’échecs à London, ON.',
          url: 'https://londonchess.ca',
          display: 'londonchess.ca',
          logo: 'assets/projects/londonchess.svg',
        },
        {
          title: 'Chordbomb',
          description:
            'Identifie la chanson qui joue autour de vous et en déduit la progression d’accords.',
          url: 'https://chordbomb.com',
          display: 'chordbomb.com',
          logo: 'assets/projects/chordbomb.svg',
        },
        {
          title: 'CIRC Aesthetics',
          description:
            'Clinique de radiologie interventionnelle esthétique située à London, ON.',
          url: 'https://circaesthetics.ca',
          display: 'circaesthetics.ca',
          logo: 'assets/projects/circaesthetics.svg',
        },
        {
          title: 'Brewski Bets',
          description:
            'Un suivi des paris informels entre amis, réglés autour d’une bière.',
          url: 'https://brewskibets.com',
          display: 'brewskibets.com',
          logo: 'assets/projects/brewskibets.svg',
        },
      ],
    },
    contact: {
      title: 'Un projet en tête ?',
      lede: 'Parlons-en !',
      success: 'Merci pour votre message. Vous aurez bientôt des nouvelles.',
      nameLabel: 'Nom',
      namePlaceholder: 'Votre nom',
      emailLabel: 'E-mail',
      emailPlaceholder: 'vous@exemple.com',
      emailInvalid: 'Veuillez saisir une adresse e-mail valide',
      messageLabel: 'Message',
      placeholderHints: [
        'Bonjour ! Je travaille sur un projet personnel et j’aurais besoin d’aide sur le frontend…',
        'Je cherche quelqu’un pour créer un site web pour notre petite entreprise…',
        'Petite question sur la bibliothèque de composants avant de me lancer…',
      ],
      submit: 'Envoyer le message',
      sentToast: 'Message envoyé',
      errorMessage:
        'Désolé, une erreur s’est produite. Merci d’écrire directement à info@eagami.com.',
    },
  },
  privacy: {
    metaTitle: 'Politique de confidentialité | Eagami',
    metaDescription: 'Ce qu’eagami.com collecte, et ce qu’il ne collecte pas.',
    title: 'Politique de confidentialité',
    lastUpdated: date => `Dernière mise à jour : ${date}`,
    languageNote:
      'Cette politique n’est tenue à jour qu’en anglais. Toute version traduite est fournie à titre indicatif.',
  },
  terms: {
    metaTitle: 'Conditions d’utilisation | Eagami',
    metaDescription:
      'Conditions d’utilisation d’eagami.com et de la bibliothèque de composants Eagami UI.',
    title: 'Conditions d’utilisation',
    lastUpdated: date => `Dernière mise à jour : ${date}`,
    languageNote:
      'Ces conditions ne sont tenues à jour qu’en anglais. Toute version traduite est fournie à titre indicatif.',
  },
  notFound: {
    metaTitle: 'Page introuvable | Eagami',
    metaDescription: 'Page introuvable.',
    eyebrow: '404',
    title: 'Page introuvable',
    lede: 'La page que vous cherchiez n’existe pas ou a été déplacée.',
    cta: 'Retour à l’accueil',
  },
  ui: {
    changelog: {
      title: 'Journal des modifications',
      metaTitle: 'Journal des modifications | Eagami UI',
      metaDescription:
        'Historique des versions de la bibliothèque de composants Angular Eagami UI.',
      lede: (pkg, version, history) =>
        `Vous trouverez ci-dessous tous les changements notables de la bibliothèque ${pkg} depuis la version ${version}. Pour l’historique complet, voir ${history}.`,
      historyInline: 'CHANGELOG.md sur GitHub',
      migrationGuide: 'Guide de migration',
    },
    shell: {
      changelog: 'Journal des modifications',
      sidebarLabel: 'Barre latérale de documentation',
      menu: 'Menu de documentation',
      navLabel: 'Documentation',
      overview: 'Aperçu',
      setup: 'Installation',
      designTokens: 'Tokens de design',
      themeBuilder: 'Générateur de thème',
      icons: 'Icônes',
      i18n: 'Internationalisation',
      accessibility: 'Accessibilité',
      components: 'Composants',
    },
    index: {
      metaTitle: 'Eagami UI',
      metaDescription:
        'Bibliothèque de composants Angular légère et accessible, construite sur des propriétés CSS personnalisées.',
      title: 'Aperçu',
      ledeBefore: 'est une bibliothèque de composants Angular légère et accessible.',
      ledeAfter:
        'Valeurs par défaut sensées prêtes à l’emploi, avec un design entièrement personnalisable pour s’adapter à toute marque.',
      principlesHeading: 'Principes de conception',
      principles: [
        {
          title: 'Accessible',
          body: 'Navigation au clavier, gestion du focus, prise en charge des lecteurs d’écran et respect des mouvements réduits sont intégrés à chaque composant.',
        },
        {
          title: 'Léger',
          body: 'Chaque composant s’importe indépendamment et le bundle ne livre que ce que vous utilisez.',
        },
        {
          title: 'Thémable',
          body: 'Entièrement personnalisable via les tokens de design, tout en conservant une apparence cohérente sur chaque page. Les variantes claire et sombre sont livrées ensemble et suivent par défaut la préférence système de l’utilisateur.',
        },
        {
          title: 'Localisé',
          body: 'Les textes intégrés des composants sont disponibles dans toutes les langues prises en charge.',
        },
        {
          title: 'Moderne',
          body: 'Mise à jour régulière avec les dernières fonctionnalités d’Angular et les standards web modernes.',
        },
        {
          title: 'Sans verrouillage',
          body: 'Chaque composant est du simple Angular et CSS, sans dépendance propriétaire : la source peut être lue, copiée ou modifiée comme tout autre code de votre projet.',
        },
      ],
      showcase: {
        button: 'Cliquez-moi',
        toggle: 'Basculez-moi',
        tick: 'Cochez-moi',
        tag: 'Étiquette',
        badge: 'Badge',
        tooltip: 'Informations supplémentaires affichées dans une infobulle',
        exploreMore: '...explorer plus de composants',
        list: 'Liste',
        grid: 'Grille',
        table: 'Tableau',
        radioThis: 'Ceci',
        radioThat: 'Cela',
        option1: 'Option 1',
        option2: 'Option 2',
        option3: 'Option 3',
        toastButton: 'Bouton pressé',
        toastToggleOn: 'Interrupteur activé',
        toastToggleOff: 'Interrupteur désactivé',
        toastTickOn: 'Case cochée',
        toastTickOff: 'Case décochée',
        ariaView: 'Vue de démonstration',
        ariaSlider: 'Curseur de démonstration',
        ariaRating: 'Note de démonstration',
        ariaLayout: 'Disposition de démonstration',
        ariaColor: 'Couleur de démonstration',
        ariaSelect: 'Sélection de démonstration',
        ariaDate: 'Date de démonstration',
        ariaMultiSelect: 'Sélection multiple de démonstration',
        msMusic: 'Musique',
        msTravel: 'Voyages',
        msFood: 'Nourriture',
      },
      theme: {
        heading: 'Personnalisez-le',
        ledeBefore: 'Les',
        ledeLink: 'tokens de design',
        ledeAfter:
          ' sont ce qui donne à chaque projet Eagami une personnalité distincte : couleurs, polices, espacements, coins, ombres et mouvements personnalisables, le tout appliqué au site ou à l’application entière. Modifiez-en quelques-uns ci-dessous pour voir comment ils influencent les composants.',
        brandColor: 'Couleur de marque',
        radius: 'Rayon des coins',
        font: 'Police',
        fontDefault: '(par défaut)',
        reset: 'Réinitialiser',
      },
    },
    setup: {
      metaTitle: 'Installation | Eagami UI',
      metaDescription:
        'Installer @eagami/ui et brancher la feuille de style globale et les polices.',
      title: 'Installation',
      ngAddLabel: 'Tout installer et configurer avec une seule commande :',
      manualLabel: 'Ou configurer manuellement :',
      installLabel: 'Installer le paquet :',
      or: 'ou',
      stylesheetLabel: {
        before: 'Ajouter la feuille de style globale dans',
        after: ' :',
      },
      fontsLabel: {
        before: 'Charger les polices dans',
        after: ' :',
      },
      firstComponentHeading: 'Votre premier composant',
    },
    integrations: {
      heading: 'Au-delà d’Angular',
      intro:
        'Les tokens de design d’Eagami sont indépendants du framework. Copier un guide d’intégration autonome dans un projet non Angular, ou consommer directement l’export de tokens lisible par machine.',
      reactLink: 'Guide d’intégration React',
      flutterLink: 'Guide d’intégration Flutter',
      tokensLink: 'Tokens de design en JSON',
    },
    themeBuilder: {
      metaTitle: 'Générateur de thème | Eagami UI',
      metaDescription:
        'Générez une palette vérifiée WCAG pour les modes clair et sombre à partir des couleurs de votre marque, puis copiez la configuration du fournisseur ou le CSS.',
      title: 'Générateur de thème',
      lede: 'Choisissez les couleurs de votre marque et Eagami UI en dérive une échelle complète 50–900 dans l’espace OKLCH, en vérifie le contraste WCAG en mode clair et sombre, et vous fournit la configuration <code>provideEagamiUi()</code> prête à l’emploi.',
      primaryLabel: 'Couleur primaire',
      secondaryLabel: 'Couleur secondaire',
      contrastPass: 'Respecte le contraste WCAG 2.2 AA en mode clair et sombre',
      contrastFailIntro:
        'Certaines associations n’atteignent pas le seuil de contraste WCAG AA :',
      previewHeading: 'Aperçu',
      previewHint:
        'Changez le thème du site pour prévisualiser la palette en mode sombre.',
      previewButton: 'Commencer',
      previewSwitch: 'Notifications',
      previewStep1: 'Compte',
      previewStep2: 'Profil',
      previewStep3: 'Terminé',
      previewProgress: 'Progression :',
      exportHeading: 'Exporter',
      exportConfigLabel: 'Configuration Angular',
      exportCssLabel: 'Variables CSS',
    },
    tokens: {
      metaTitle: 'Tokens de design | Eagami UI',
      metaDescription:
        'Propriétés CSS personnalisées pour les couleurs, la typographie, l’espacement, l’élévation, la forme et le mouvement.',
      title: 'Tokens de design',
      lede: 'Les tokens de design sont les propriétés CSS personnalisées qui pilotent chaque composant de la bibliothèque : couleurs, typographie, espacement, élévation, forme et mouvement. Référencez ces tokens dans vos propres styles via <code>var(--token-name)</code> pour conserver une cohérence visuelle sur toute l’application.',
      sections: {
        theming: 'Thèmes',
        palette: 'Palette de marque',
        colors: 'Couleurs',
        typography: 'Typographie',
        spacing: 'Espacement',
        elevation: 'Élévation',
        shape: 'Forme',
        motion: 'Mouvement',
      },
      themingRootBefore:
        'Chaque token de design Eagami peut être remplacé, de sorte que la bibliothèque s’adapte à n’importe quelle marque. Remplacez n’importe quel token sur <code>:root</code> pour rethémer toute la bibliothèque :',
      themingScopedBefore:
        'Ou limitez les remplacements à des composants individuels là où c’est utile :',
      paletteIntro:
        'Passez un seul hex de marque à <code>provideEagamiUi()</code> et la bibliothèque dérive une échelle complète de dix nuances (50 à 900) dans l’espace <a href="https://www.w3.org/TR/css-color-4/#ok-lab" target="_blank" rel="noopener noreferrer"><span>OKLCH</span></a>, en conservant la teinte et le chroma stables tout en faisant varier la luminance. Les nuances dérivées alimentent chaque token <code>--color-brand-*</code> en mode clair comme en mode sombre :',
      paletteOverrides:
        'Épinglez des nuances précises ou remappez la nuance dérivée qui sous-tend chaque rôle sémantique :',
      paletteContrast:
        'Chaque appariement de rôle de marque (texte sur surface, surface sur fond) est vérifié face à <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer"><span>WCAG 2.2 Level AA</span></a> au démarrage. Une combinaison non conforme lève une erreur avant le chargement de l’application, de sorte qu’un défaut de contraste dans la couleur de marque est repéré au boot plutôt qu’en production.',
      paletteBuilderIntro: 'Composez et prévisualisez votre palette visuellement dans le',
      paletteBuilderLink: 'générateur de thème',
      elevationDrop: 'Ombres portées',
      elevationRelief: 'Relief et creux',
      elevationReliefBefore:
        '<code>--shadow-bevel</code> associe un reflet intérieur (haut) à une ombre intérieure (bas) pour les surfaces qui doivent paraître surélevées. <code>--shadow-well</code> inverse l’éclairage pour un effet en creux. Combinez avec <code>--shadow-*</code> pour ajouter une ombre portée : <code>box-shadow: var(--shadow-bevel), var(--shadow-sm);</code>',
      colorsPrimary: 'Primaire',
      colorsSecondary: 'Secondaire',
      colorsNeutral: 'Neutre',
      colorsSemantic: 'Sémantique',
      typographyFamilies: 'Familles',
      typographySizes: 'Tailles',
      typographyWeights: 'Graisses',
      typographyComposites: 'Styles composites',
      typographyCompositesBefore:
        'Les tokens composites regroupent une taille, une graisse, une hauteur de ligne (et parfois une famille) pour un rôle précis. <code>--text-section-heading-*</code> est le premier composite qui fixe une famille ; utilisez-le pour les titres <code>&lt;h2&gt;</code> de sous-section sur les pages de docs et marketing.',
      typographySectionHeadingSample: 'Titre de section voix de marque',
      motionSimulate: 'Simuler',
      motionDurations: 'Durées',
      motionEasings: 'Courbes',
      integrationsIntro:
        'Tous les tokens de design ci-dessus sont indépendants du framework. Pour les projets non Angular, il suffit de transmettre un guide d’intégration autonome à votre agent IA, ou de le laisser consommer directement l’export de tokens lisible par machine.',
    },
    icons: {
      metaTitle: 'Icônes | Eagami UI',
      metaDescription: 'Jeu d’icônes intégré à @eagami/ui.',
      title: 'Icônes',
      lede: 'Composants Angular autonomes qui héritent de leur couleur et s’adaptent à <code>font-size</code>, pour un rendu à toute taille. La plupart sont dérivées de <a href="https://feathericons.com/" target="_blank" rel="noopener noreferrer"><span>Feather Icons</span></a> de <a href="https://github.com/colebemis" target="_blank" rel="noopener noreferrer"><span>Cole Bemis</span></a> sous la <a href="https://github.com/feathericons/feather/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><span>licence MIT</span></a> ; les autres sont des icônes originales d’Eagami UI. Les icônes Feather peuvent aussi être dessinées avec des traits plus fins ou plus épais. Cliquez sur une icône pour copier son sélecteur.',
      filterLabel: 'Filtrer les icônes',
      filterPlaceholder: 'Rechercher des icônes',
      filterClearLabel: 'Effacer la recherche',
      categoryFeather: 'Feather',
      categoryEagami: 'Eagami UI',
      categoryBrand: 'Marque',
      countAll: count => `${count} icônes`,
      countFiltered: (shown, total) => `${shown} icônes sur ${total}`,
      noResults: 'Aucune icône ne correspond à votre recherche',
      copiedToast: selector => `« ${selector} » copié dans le presse-papiers`,
      copyFailedToast: selector =>
        `Impossible de copier « ${selector} » dans le presse-papiers`,
      brandTitle: 'Icônes de marques',
      brandIntro:
        'Les icônes de marques ci-dessous représentent des marques tierces et sont fournies uniquement pour un usage nominatif, c’est-à-dire pour identifier la marque qu’elles représentent dans une interface (un bouton « Se connecter avec Google », un lien « Partager sur Facebook », etc.). Elles ne sont pas concédées sous licence pour un usage décoratif général. Les consommateurs sont responsables du respect des directives de chaque marque :',
      brandLinkLabel: 'Ressources de marque',
    },
    i18n: {
      metaTitle: 'Internationalisation | Eagami UI',
      metaDescription:
        'Textes intégrés des composants en 15 langues, avec changement à l’exécution et remplacements chaîne par chaîne.',
      title: 'Internationalisation',
      lede: 'Toutes les chaînes intégrées (labels ARIA, espaces réservés, états vides, contrôles du sélecteur de date) sont livrées dans 15 langues. Définissez-en une pour toute l’application, changez-en à l’exécution ou remplacez des chaînes individuelles.',
      supportedHeading: 'Langues prises en charge',
      quickSetupHeading: 'Mise en place rapide',
      quickSetupBefore:
        'Ajoutez <code>provideEagamiUi()</code> à votre configuration d’application et enregistrez les langues que vous utilisez via <code>locales</code>. L’anglais est toujours inclus, et seules les langues que vous enregistrez sont ajoutées à votre bundle.',
      lazyHeading: 'Chargement différé',
      lazyBefore:
        'Enregistrez <code>localeLoaders</code> au lieu de <code>locales</code> : une langue est téléchargée à sa première activation et reste hors du bundle initial. Faites pointer chaque loader vers un module qui réexporte un seul paquet de langue, et préchargez avec <code>loadLocale()</code> pour un changement instantané.',
      liveDemoHeading: 'Démo en direct',
      liveDemoIntro:
        'Choisissez une langue et observez les composants ci-dessous reprendre les chaînes et le formatage des dates correspondants.',
      runtimeSwitchHeading: 'Changement à l’exécution',
      runtimeSwitchBefore:
        'Injectez <code>EagamiI18nService</code> et appelez <code>setLocale()</code>. La langue active est un signal : chaque composant se re-rend avec les nouvelles chaînes sans actualisation.',
      perStringHeading: 'Remplacements chaîne par chaîne',
      perStringBefore:
        'Transmettez un objet <code>messages</code> avec la langue pour remplacer des chaînes individuelles. Tout ce que vous omettez retombe sur les valeurs par défaut de la langue.',
      perStringAfter:
        'La plupart des composants exposent aussi des entrées de message individuelles (par ex. <code>placeholder</code> sur <code>&lt;ea-dropdown&gt;</code>) pour des remplacements ponctuels sur place.',
      frenchSpacingHeading: 'Aide à l’espacement français',
      frenchSpacingBody:
        'La typographie française attend une espace fine insécable avant <code>? ! : ; »</code> et après <code>«</code>. L’assistant <code>frenchSpacing()</code> exporté convertit les espaces ordinaires dans vos propres chaînes françaises (la bibliothèque gère ses messages français intégrés en interne).',
      demoLocaleLabel: 'Langue',
    },
    accessibility: {
      metaTitle: 'Accessibilité | Eagami UI',
      metaDescription:
        'Conformité WCAG 2.2 AA, prise en charge complète du clavier et composants adaptés aux lecteurs d’écran, le tout vérifié à chaque version.',
      title: 'Accessibilité',
      lede: 'Chaque composant est construit selon les principaux standards d’accessibilité du web : sémantique correcte, prise en charge complète du clavier, gestion du focus et annonces aux lecteurs d’écran fonctionnent d’emblée.',
      conformanceHeading: 'Conformité',
      conformanceBody:
        'La bibliothèque se conforme à <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener">WCAG 2.2 Level AA</a>, le standard que la plupart des organisations sont tenues de respecter, et suit les pratiques de conception officielles du W3C pour chaque type de contrôle, des modales et des menus aux curseurs et aux sélecteurs de date. Les annonces aux lecteurs d’écran sont fournies dans toutes les langues prises en charge, de sorte que les technologies d’assistance parlent toujours la langue de l’utilisateur.',
      builtInHeading: 'Accessibilité intégrée',
      builtInItems: [
        {
          title: 'Sémantique',
          body: 'Des éléments natifs lorsque c’est possible, des rôles, états et propriétés ARIA explicites sinon. Les états comme expanded, selected, checked, invalid et busy sont toujours exposés programmatiquement, jamais par le seul style.',
        },
        {
          title: 'Prise en charge du clavier',
          body: 'Motifs clavier APG complets : roving tabindex, navigation aux touches fléchées, Début et Fin, Échap pour fermer, Entrée ou Espace pour activer, avec une gestion des flèches adaptée au RTL.',
        },
        {
          title: 'Gestion du focus',
          body: 'Les modales et les sélecteurs piègent le focus tant qu’ils sont ouverts et le rendent au déclencheur à la fermeture. Les indicateurs de focus sont toujours visibles et jamais supprimés.',
        },
        {
          title: 'Annonces aux lecteurs d’écran',
          body: 'Les toasts, les alertes, les erreurs de validation et les changements d’état asynchrones sont annoncés via des régions live avec le niveau de politesse approprié.',
        },
        {
          title: 'Mouvements réduits',
          body: 'Les animations respectent partout la requête média prefers-reduced-motion.',
        },
        {
          title: 'Contraste',
          body: 'Les thèmes clair et sombre par défaut respectent les exigences de contraste WCAG, et les outils de thématisation signalent les combinaisons qui passent sous le niveau AA.',
        },
      ],
      labelsHeading: 'Noms accessibles',
      labelsBefore:
        'Les composants qui affichent du texte se nomment eux-mêmes. Tout élément graphique ou constitué d’une seule icône expose une entrée <code>aria-label</code> (avec des valeurs par défaut localisées pour les contrôles intégrés comme les boutons d’effacement, de fermeture et de masquage), et les champs de formulaire relient automatiquement <code>label</code>, indices et messages d’erreur au contrôle via <code>aria-describedby</code>.',
      labelsAfter:
        'Fournissez un <code>label</code> ou un <code>aria-label</code> pour les contrôles sans texte visible et le composant s’occupe du reste : noms, indices et messages d’erreur restent reliés automatiquement.',
      testingHeading: 'Vérifié à chaque version',
      testingBody:
        'Chaque composant est vérifié selon les règles d’accessibilité du secteur à chaque modification, et une version n’est publiée que lorsque toutes les vérifications passent, de sorte que l’accessibilité que vous voyez ici se maintient à mesure que la bibliothèque évolue.',
    },
    component: {
      metaTitle: name => `Composant ${name} | Eagami UI`,
      metaDescription: name =>
        `Composant Angular ${name} : démo en direct, référence API et thématisation avec des variables CSS.`,
      demoHeading: 'Démo',
      notFoundTitle: 'Composant introuvable',
      notFoundBody: 'Choisissez un composant dans la barre latérale, ou',
      notFoundLink: 'revenez à l’introduction',
      sectionHeadings: {
        basic: 'de base',
        variants: 'variantes',
        sizes: 'tailles',
        states: 'états',
        disabled: 'désactivé',
        dismissible: 'fermable',
        clearable: 'effaçable',
        hintAndError: 'indice et erreur',
        withHint: 'avec indice',
        withError: 'avec erreur',
        withLabel: 'avec libellé',
        withIcons: 'avec icônes',
        withFooter: 'avec pied',
        withPaginator: 'avec paginateur',
        withDisabledItem: 'avec élément désactivé',
        withDisabledTab: 'avec onglet désactivé',
        required: 'requis',
        requiredWithHint: 'requis avec indice',
        horizontal: 'horizontal',
        vertical: 'vertical',
        single: 'unique',
        multi: 'multiple',
        circle: 'cercle',
        square: 'carré',
        shapes: 'formes',
        shapesAndFallbacks: 'formes et secours',
        chevronSeparator: 'séparateur chevron',
        slashSeparator: 'séparateur barre oblique',
        twoLevels: 'deux niveaux',
        fourDigitPin: 'code PIN à 4 chiffres',
        defaultHeading: 'par défaut',
        stripedAndBordered: 'rayé et bordé',
        compactDensity: 'densité compacte',
        tinyList: 'petite liste',
        stickyHeader: 'en-tête fixe',
        emptyState: 'état vide',
        formatVariants: 'variantes de format',
        minMax: 'min et max',
        positions: 'positions',
        trigger: 'déclencheur',
        alignLeft: 'aligné à gauche',
        alignCenter: 'aligné au centre',
        manyPages: 'plusieurs pages',
        minimal: 'minimal',
        indeterminate: 'indéterminé',
        noResize: 'non redimensionnable',
        resizing: 'redimensionnement',
        disabledAndReadonly: 'désactivé et lecture seule',
        password: 'mot de passe',
        autocompleteSection: 'autocomplétion',
        twoOptions: 'deux options',
        fullWidth: 'pleine largeur',
        minLengthMaxResults: 'longueur min. et résultats max.',
        removable: 'amovible',
        minMaxLabels: 'libellés min/max',
        underline: 'souligné',
        filled: 'rempli',
        rect: 'rectangle',
        inlineLayout: 'disposition en ligne',
        noResults: 'aucun résultat',
        titleOnly: 'titre seul',
        iconTrigger: 'déclencheur icône',
        placements: 'positions',
        canvasSizes: 'tailles de canevas',
        cappedChipCount: 'nombre de chips plafonné',
        customIcon: 'icône personnalisée',
        customIconAndColor: 'icône et couleur personnalisées',
        customLabel: 'libellé personnalisé',
        halfSteps: 'demi-étapes',
        customSize: 'taille personnalisée',
        linearFlow: 'flux linéaire',
        manyLevels: 'plusieurs niveaux',
        notAnimated: 'sans animation',
        numberOfStars: 'nombre d’étoiles',
        minimumOne: 'minimum 1 étoile',
        outputFormats: 'formats de sortie',
        quarterHourSteps: 'pas d’un quart d’heure',
        readonly: 'lecture seule',
        singleFile: 'fichier unique',
        stepped: 'incréments',
        sundayStart: 'semaine commençant le dimanche',
        twelveHourFormat: 'format 12 heures',
        twoActions: 'deux actions',
        withCompletedSteps: 'avec étapes terminées',
        withConstraints: 'avec contraintes',
        withInitialValue: 'avec valeur initiale',
        withMaxlength: 'avec longueur maximale',
        withMaxHeight: 'avec hauteur maximale',
        withMinMaxLabels: 'avec libellés min/max',
        withOptionalStep: 'avec étape optionnelle',
        withSeconds: 'avec secondes',
        withSelection: 'avec sélection',
        withoutAlpha: 'sans alpha',
        withoutSearch: 'sans recherche',
        withoutSelectAll: 'sans tout sélectionner',
        wrapping: 'retour à la ligne',
      },
      common: {
        small: 'Petit',
        medium: 'Moyen',
        large: 'Grand',
        cancel: 'Annuler',
        save: 'Enregistrer',
        close: 'Fermer',
        confirm: 'Confirmer',
        disabled: 'Désactivé',
        defaultLabel: 'Par défaut',
        successLabel: 'Succès',
        warningLabel: 'Avertissement',
        errorLabel: 'Erreur',
        infoLabel: 'Info',
      },
      demos: {
        accordion: {
          whatLabel: 'Qu’est-ce que @eagami/ui ?',
          whatBody:
            'Une bibliothèque de composants Angular légère et accessible, construite sur des propriétés CSS personnalisées.',
          installLabel: 'Comment l’installer ?',
          installBody:
            'Lancez pnpm add @eagami/ui, puis ajoutez la feuille de style globale à votre angular.json.',
          themeLabel: 'Puis-je personnaliser le thème ?',
          themeBody:
            'Oui, remplacez n’importe quelle propriété CSS personnalisée sur :root ou limitez les remplacements à des composants individuels.',
          sectionOneLabel: 'Section un',
          sectionOneBody:
            'Plusieurs sections peuvent être ouvertes en même temps en mode multiple.',
          sectionTwoLabel: 'Section deux',
          sectionTwoBody: 'Contenu de la section deux.',
          disabledSectionLabel: 'Section désactivée',
          disabledSectionBody: 'Ce contenu n’est pas accessible.',
        },
        alert: {
          defaultText: 'Ceci est une alerte par défaut',
          successText: 'Vos modifications ont été enregistrées',
          warningText: 'Votre essai expire dans 3 jours',
          errorText: 'Une erreur s’est produite, veuillez réessayer',
          infoText: 'Une nouvelle version est disponible',
          dismissibleText: 'Cette alerte peut être fermée',
          tooltipSuppressed:
            'Les infobulles sont supprimées sur les appareils tactiles pour éviter un survol persistant. Consultez cette section sur un appareil avec une souris pour voir les démos en action.',
        },
        autocomplete: {
          startTyping: 'Commencez à saisir…',
          hintText: 'Commencez à saisir pour voir les correspondances',
          errorText: 'Veuillez sélectionner une race de chien',
          breedPlaceholder: 'Race de chien…',
          minMaxLabel: 'Min. 2 caractères, max. 3 résultats',
          minMaxPlaceholder: 'Saisissez au moins 2 caractères…',
        },
        avatarEditor: {
          result: 'Résultat :',
        },
        badge: {
          successText: 'Actif',
          warningText: 'En attente',
          newText: 'Nouveau',
        },
        button: {
          primary: 'Primaire',
          secondary: 'Secondaire',
          ghost: 'Fantôme',
          danger: 'Danger',
          toggleLoading: 'Basculer le chargement',
          fullWidth: 'Pleine largeur',
          clickedToast: 'Bouton pressé !',
        },
        card: {
          elevatedHeader: 'Surélevé',
          elevatedBody: 'Carte avec ombre portée.',
          outlinedHeader: 'Contouré',
          outlinedBody: 'Carte avec bordure.',
          filledHeader: 'Rempli',
          filledBody: 'Carte avec arrière-plan subtil.',
          cardTitleHeader: 'Titre de la carte',
          cardWithFooterBody:
            'Cette carte comporte un en-tête, un corps et un pied avec actions.',
        },
        checkbox: {
          acceptTermsAndConditions: 'Accepter les conditions générales',
          disabledChecked: 'Désactivé coché',
          indeterminate: 'Indéterminé',
          iAgreeToTerms: 'J’accepte les conditions',
          subscribeToUpdates: 'S’abonner aux mises à jour',
          subscribeHint: 'Un résumé mensuel est envoyé, sans spam',
          acceptTermsLabel: 'Accepter les conditions',
          acceptTermsError: 'Les conditions doivent être acceptées pour continuer',
        },
        codeInput: {
          verificationCodeLabel: 'Code de vérification',
          verificationCodeHint:
            'Consultez votre e-mail pour trouver le code à 6 chiffres',
          verificationCodeError: 'Code de vérification invalide',
          pinLabel: 'PIN',
          pinHint: 'Saisissez votre code PIN à 4 chiffres',
        },
        colorPicker: {
          brandLabel: 'Couleur de la marque',
          hintBrandColor: 'Utilisée comme couleur principale de la marque',
          errorRequired: 'Ce champ est obligatoire',
          hexLabel: 'Format HEX',
          rgbLabel: 'Format RGB',
          hslLabel: 'Format HSL',
          noAlphaHeading: 'Opaque uniquement',
          opaqueOnlyLabel: 'Couleur unie',
        },
        dataTable: {
          tableColumnId: 'ID',
          tableColumnFirstName: 'Prénom',
          tableColumnLastName: 'Nom',
          tableColumnAdmin: 'Admin',
          tableColumnPosts: 'Publications',
        },
        datePicker: {
          appointmentLabel: 'Rendez-vous',
          pickDatePlaceholder: 'Choisissez une date…',
          hintAnyFutureDate: 'Sélectionnez n’importe quelle date future',
          errorRequired: 'Ce champ est obligatoire',
          shortLabel: 'Court',
          mediumLabel: 'Moyen',
          longLabel: 'Long',
          withinNextWeeksLabel: 'Dans les 3 prochaines semaines',
          withinNextWeeksHint: '±1 semaine / +3 semaines à partir d’aujourd’hui',
        },
        dialog: {
          openButton: 'Ouvrir la boîte de dialogue',
          title: 'Titre de la boîte de dialogue',
          body: 'Ceci est le corps de la boîte de dialogue. Il prend en charge tout contenu, y compris formulaires, texte et autres composants.',
        },
        divider: {
          orLabel: 'ou',
          sectionLabel: 'Section',
          leftLabel: 'Gauche',
          rightLabel: 'Droite',
        },
        drawer: {
          openButton: 'Ouvrir le tiroir',
          rightButton: 'Droite',
          leftButton: 'Gauche',
          topButton: 'Haut',
          bottomButton: 'Bas',
          rightTitle: 'Tiroir droit',
          rightBody: 'Glisse depuis le bord droit, utile pour les panneaux de détails.',
          leftTitle: 'Tiroir gauche',
          leftBody: 'Glisse depuis la gauche, utile pour les menus de navigation.',
          topTitle: 'Tiroir supérieur',
          topBody: 'Descend depuis le haut, utile pour les notifications.',
          bottomTitle: 'Tiroir inférieur',
          bottomBody:
            'Monte depuis le bas, courant sur mobile pour les feuilles d’action.',
        },
        dropdown: {
          fruitLabel: 'Fruit',
          fruitPlaceholder: 'Sélectionnez un fruit…',
          hintFavourite: 'Choisissez votre préféré',
          errorRequired: 'Ce champ est obligatoire',
          selectPlaceholder: 'Sélectionnez…',
        },
        emptyState: {
          noItemsTitle: 'Aucun élément pour le moment',
          noItemsDescription: 'Commencez par créer votre premier élément.',
          createItem: 'Créer un élément',
          noResultsTitle: 'Aucun résultat trouvé',
          noResultsDescription:
            'Essayez d’ajuster votre recherche ou votre filtre pour trouver ce que vous cherchez.',
          clearFilters: 'Effacer les filtres',
          nothingHereTitle: 'Rien à voir ici',
        },
        fileUploader: {
          attachmentsLabel: 'Pièces jointes',
          imagesLabel: 'Téléverser des images',
          imagesHint: 'PNG ou JPEG, jusqu’à 2 Mo chacun, max 4 fichiers',
          resumeLabel: 'Téléverser un CV',
          customIconLabel: 'Joindre des fichiers',
          withHintHint: 'Jusqu’à 10 Mo par fichier',
          withErrorText: 'Au moins une image est requise',
        },
        formField: {
          emailPlaceholder: 'you@example.com',
        },
        input: {
          defaultLabel: 'Par défaut',
          enterTextPlaceholder: 'Saisissez du texte…',
          hintGuidance: 'Conseils utiles ici',
          errorRequired: 'Ce champ est obligatoire',
          readonlyLabel: 'Lecture seule',
          readonlyValue: 'Valeur en lecture seule',
          passwordLabel: 'Mot de passe',
          passwordPlaceholder: 'Saisissez votre mot de passe…',
          passwordNoToggleLabel: 'Mot de passe (bascule masquée)',
          passwordNoTogglePlaceholder: 'Pas de bascule de visibilité',
          emailLabel: 'E-mail',
          emailPlaceholder: 'vous@exemple.com',
        },
        menu: {
          openButton: 'Ouvrir le menu',
          edit: 'Modifier',
          duplicate: 'Dupliquer',
          archive: 'Archiver',
          delete: 'Supprimer',
          file: 'Fichier',
          moreOptionsLabel: 'Plus d’options',
          view: 'Voir',
          rename: 'Renommer',
          newItem: 'Nouveau',
          open: 'Ouvrir',
          saveUnavailable: 'Enregistrer (indisponible)',
          saveAs: 'Enregistrer sous',
        },
        popover: {
          openLabel: 'Ouvrir la popover',
          basicContent:
            'Une surface flottante ancrée à son déclencheur. À utiliser comme brique de base pour les menus, listes déroulantes et incrustations personnalisées.',
          placementTopLabel: 'top',
          placementTopStartLabel: 'top-start',
          placementTopEndLabel: 'top-end',
          placementBottomLabel: 'bottom',
          placementBottomStartLabel: 'bottom-start',
          placementBottomEndLabel: 'bottom-end',
          placementLeftLabel: 'left',
          placementRightLabel: 'right',
          placementTopContent: 'Centrée au-dessus du déclencheur',
          placementTopStartContent:
            'Au-dessus du déclencheur, alignée sur son bord gauche',
          placementTopEndContent: 'Au-dessus du déclencheur, alignée sur son bord droit',
          placementBottomContent: 'Centrée sous le déclencheur',
          placementBottomStartContent: 'Sous le déclencheur, alignée sur son bord gauche',
          placementBottomEndContent: 'Sous le déclencheur, alignée sur son bord droit',
          placementLeftContent: 'Centrée à gauche du déclencheur',
          placementRightContent: 'Centrée à droite du déclencheur',
        },
        progressBar: {
          processing: 'Traitement en cours…',
        },
        radio: {
          appleLabel: 'Pomme',
          bananaLabel: 'Banane',
          cherryLabel: 'Cerise',
          optionALabel: 'Option A',
          optionBLabel: 'Option B',
          subscriptionPlanLabel: 'Forfait d’abonnement',
          freeLabel: 'Gratuit',
          proLabel: 'Pro',
          enterpriseLabel: 'Entreprise',
          deliverySpeedLabel: 'Vitesse de livraison',
          deliverySpeedHint: 'Choisissez la rapidité souhaitée',
          standardLabel: 'Standard',
          expressLabel: 'Express',
          accountTypeLabel: 'Type de compte',
          accountTypeError: 'Veuillez choisir un type de compte',
          personalLabel: 'Personnel',
          businessLabel: 'Professionnel',
        },
        rating: {
          experienceLabel: 'Évaluez votre expérience',
          halfStepsLabel: 'Note avec demi-étapes',
          halfStepsHint:
            'Cliquez sur la moitié gauche ou droite d’une étoile pour incrémenter de 0,5.',
          readonlyLabel: 'Note moyenne',
          withHintHint: 'Cliquez sur une étoile pour définir la note',
          withErrorText: 'Une note est requise',
          numberOfStarsLabel: 'Évaluez',
          customIconLabel: 'À quel point vous l’aimez ?',
        },
        segmented: {
          viewLabel: 'Vue',
          themeLabel: 'Thème',
          themeHint: 'Affecte toute l’application',
          layoutLabel: 'Disposition',
          layoutError: 'La sélection de la disposition est obligatoire',
          viewOptionList: 'Liste',
          viewOptionGrid: 'Grille',
          viewOptionKanban: 'Kanban',
          themeOptionLight: 'Clair',
          themeOptionDark: 'Sombre',
        },
        slider: {
          volumeLabel: 'Volume',
          brightnessLabel: 'Luminosité',
          withHintLabel: 'Avec indice',
          sliderHint: 'Faites glisser la poignée ou utilisez les flèches pour ajuster',
          withErrorLabel: 'Avec erreur',
          sliderError: 'Veuillez choisir une valeur supérieure à 50',
        },
        switch: {
          enableNotificationsLabel: 'Activer les notifications',
          disabledOnLabel: 'Désactivé activé',
          confirmConsentLabel: 'Confirmer le consentement',
          marketingEmailsLabel: 'E-mails marketing',
          marketingEmailsHint: 'Se désabonner à tout moment',
          twoFactorAuthLabel: 'Authentification à deux facteurs',
          twoFactorAuthError: 'L’authentification à deux facteurs doit être activée',
        },
        tabs: {
          account: 'Compte',
          accountContent: 'Contenu des paramètres du compte',
          security: 'Sécurité',
          securityContent: 'Contenu des paramètres de sécurité',
          notifications: 'Notifications',
          notificationsContent: 'Préférences de notification',
          overview: 'Aperçu',
          overviewContent: 'Contenu de l’aperçu',
          analytics: 'Analyses',
          analyticsContent: 'Contenu des analyses',
          reports: 'Rapports',
          reportsContent: 'Contenu des rapports',
          general: 'Général',
          generalContent: 'Paramètres généraux',
          billing: 'Facturation',
          billingContent: 'Détails de facturation',
          admin: 'Admin',
          adminContent: 'Panneau d’administration',
        },
        tag: {
          disabledSuccess: 'Succès désactivé',
        },
        textarea: {
          messageLabel: 'Message',
          messagePlaceholder: 'Saisissez votre message…',
          hintMaxCharacters: 'Maximum 500 caractères',
          errorRequired: 'Ce champ est obligatoire',
          fixedSizeLabel: 'Taille fixe',
          fixedSizePlaceholder: 'Ne peut pas être redimensionné',
          readonlyLabel: 'Lecture seule',
          readonlyValue: 'Contenu en lecture seule',
        },
        toast: {
          message: variant => {
            const labels: Record<string, string> = {
              default: 'par défaut',
              success: 'de succès',
              warning: 'd’avertissement',
              error: 'd’erreur',
              info: 'd’information',
            };
            return `Ceci est un toast ${labels[variant] ?? variant}`;
          },
          segmentsLabel: 'Segments',
        },
        tooltip: {
          triggerLabel: '(survolez-moi)',
          templateTriggerLabel: '(survolez pour une infobulle à template)',
          templateTipStatus: 'En ligne',
          topLabel: 'Haut',
          topTooltip: 'Infobulle en haut',
          bottomLabel: 'Bas',
          bottomTooltip: 'Infobulle en bas',
          leftLabel: 'Gauche',
          leftTooltip: 'Infobulle à gauche',
          rightLabel: 'Droite',
          rightTooltip: 'Infobulle à droite',
        },
        transferList: {
          sourceLabel: 'Disponibles',
          targetLabel: 'Sélectionnés',
          roleAdmin: 'Administrateur',
          roleEditor: 'Éditeur',
          roleViewer: 'Lecteur',
          roleGuest: 'Invité',
          roleBilling: 'Facturation',
          roleOwner: 'Propriétaire',
        },
        virtualList: {
          row: 'Ligne',
          detail: n => `Enregistrement généré n°${n}`,
          scrollPosition: (first, total) =>
            `Affichage de la ligne ${first.toLocaleString('fr-FR')} sur ${total.toLocaleString('fr-FR')}`,
        },
        commandPalette: {
          hint: 'Appuyez sur Ctrl + K (ou Cmd + K) pour ouvrir la palette de commandes depuis cette page.',
          openButton: 'Ouvrir la palette de commandes',
          executedToast: label => `Exécuté : ${label}`,
        },
        avatarEditorActions: {
          avatarUpdatedToast: 'Avatar mis à jour',
        },
      },
      playground: {
        controls: 'Options',
        reset: 'Réinitialiser',
        code: 'Code',
        apiReference: 'Référence de l’API',
        inputs: 'Entrées',
        outputs: 'Sorties',
        methods: 'Méthodes',
        colName: 'Nom',
        colType: 'Type',
        colDefault: 'Défaut',
        colDescription: 'Description',
        errorMessagesDescription:
          'Remplace le message de validation par clé d’erreur pour un contrôle de formulaire lié ; les clés non définies utilisent le message localisé par défaut.',
        ariaLabelDescription:
          'Nom accessible annoncé par les technologies d’assistance lorsque le composant n’affiche aucun libellé visible.',
        triggerErrorLabel: 'Déclencher l’erreur',
        requiredBadge: 'requis',
        twoWayBadge: 'bidirectionnel',
        rangeHint: { between: 'à', min: 'Min', max: 'Max' },
        knobLabels: {
          timeline: { orientation: 'Orientation', align: 'Alignement', size: 'Taille' },
          tooltip: {
            eaTooltip: 'Contenu de l’infobulle',
          },
          input: {
            label: 'Libellé',
            placeholder: 'Texte indicatif',
            size: 'Taille',
            type: 'Type',
            disabled: 'Désactivé',
            readonly: 'Lecture seule',
            required: 'Requis',
            autofocus: 'Focus auto',
            showPasswordToggle: 'Bouton d’affichage du mot de passe',
            clearable: 'Effaçable',
            autocomplete: 'Autocomplétion',
          },
          'number-input': {
            allowNegative: 'Autoriser les négatifs',
            label: 'Libellé',
            placeholder: 'Texte indicatif',
            size: 'Taille',
            min: 'Minimum',
            max: 'Maximum',
            step: 'Pas',
            maxDigits: 'Chiffres max.',
            disabled: 'Désactivé',
            readonly: 'Lecture seule',
            required: 'Requis',
          },
          'form-field': {
            size: 'Taille',
            label: 'Libellé',
            hint: 'Indication',
            required: 'Requis',
          },
          alert: {
            variant: 'Variante',
            dismissible: 'Fermable',
            size: 'Taille',
            icon: 'Icône (remplacer)',
          },
          toast: {
            icon: 'Icône (remplacer)',
            title: 'Titre',
          },
          avatar: {
            size: 'Taille',
            shape: 'Forme',
            src: 'Source de l’image',
            initials: 'Initiales',
            alt: 'Texte alternatif',
          },
          badge: {
            variant: 'Variante',
            size: 'Taille',
            shape: 'Forme',
            uppercase: 'Majuscules',
          },
          button: {
            variant: 'Variante',
            size: 'Taille',
            type: 'Type',
            disabled: 'Désactivé',
            loading: 'Chargement',
            fullWidth: 'Pleine largeur',
            uppercase: 'Majuscules',
          },
          card: {
            variant: 'Variante',
            padding: 'Espacement',
            headerAlign: 'Alignement de l’en-tête',
            fullWidth: 'Pleine largeur',
            headerDivider: 'Séparateur d’en-tête',
          },
          checkbox: {
            label: 'Libellé',
            count: 'Compteur',
            size: 'Taille',
            disabled: 'Désactivé',
            required: 'Requis',
            indeterminate: 'Indéterminé',
          },
          'code-input': {
            size: 'Taille',
            length: 'Longueur',
            label: 'Libellé',
            placeholder: 'Texte indicatif',
            disabled: 'Désactivé',
            readonly: 'Lecture seule',
            required: 'Requis',
          },
          'color-picker': {
            label: 'Libellé',
            placeholder: 'Texte indicatif',
            size: 'Taille',
            format: 'Format',
            showAlpha: 'Afficher l’alpha',
            clearable: 'Effaçable',
            disabled: 'Désactivé',
            readonly: 'Lecture seule',
            required: 'Requis',
          },
          divider: {
            orientation: 'Orientation',
            label: 'Libellé',
          },
          'eagami-wordmark': {
            variant: 'Variante',
            layout: 'Disposition',
            size: 'Taille (px)',
            linked: 'Lié',
          },
          'empty-state': {
            size: 'Taille',
            headingLevel: 'Niveau de titre',
            title: 'Titre',
            description: 'Description',
          },
          paginator: {
            align: 'Alignement',
            showPageSizeSelector: 'Afficher le sélecteur de taille de page',
            showRangeLabel: 'Afficher l’étiquette de plage',
            disabled: 'Désactivé',
            totalItems: 'Nombre total d’éléments',
          },
          'progress-bar': {
            variant: 'Variante',
            size: 'Taille',
            value: 'Valeur',
            max: 'Maximum',
            buffer: 'Tampon',
            showPercentage: 'Afficher le pourcentage',
            indeterminate: 'Indéterminé',
            label: 'Libellé',
          },
          radio: {
            label: 'Libellé',
            disabled: 'Désactivé',
          },
          'range-slider': {
            label: 'Libellé',
            hint: 'Indication',
            errorMsg: 'Message d’erreur',
            min: 'Minimum',
            max: 'Maximum',
            step: 'Pas',
            size: 'Taille',
            showValue: 'Afficher la valeur',
            showMinMaxLabels: 'Afficher les libellés min/max',
            disabled: 'Désactivé',
            required: 'Requis',
          },
          rating: {
            label: 'Libellé',
            size: 'Taille',
            min: 'Minimum',
            max: 'Maximum',
            allowHalf: 'Autoriser les demi-pas',
            readonly: 'Lecture seule',
            disabled: 'Désactivé',
            required: 'Requis',
            clearable: 'Effaçable',
            iconClass: 'Icône',
          },
          skeleton: {
            variant: 'Variante',
            animated: 'Animé',
            width: 'Largeur',
            height: 'Hauteur',
          },
          slider: {
            size: 'Taille',
            min: 'Min',
            max: 'Max',
            step: 'Pas',
            showValue: 'Afficher la valeur',
            showMinMaxLabels: 'Afficher les libellés min/max',
            disabled: 'Désactivé',
            required: 'Requis',
            hasError: 'État d’erreur',
            label: 'Libellé',
          },
          spinner: {
            size: 'Taille',
            label: 'Libellé',
          },
          switch: {
            label: 'Libellé',
            size: 'Taille',
            disabled: 'Désactivé',
            required: 'Requis',
          },
          tag: {
            variant: 'Variante',
            size: 'Taille',
            removable: 'Supprimable',
            disabled: 'Désactivé',
            removeLabel: 'Libellé de suppression',
            uppercase: 'Majuscules',
          },
          textarea: {
            label: 'Libellé',
            placeholder: 'Texte indicatif',
            size: 'Taille',
            resize: 'Redimensionnement',
            maxlength: 'Longueur maximale (caractères)',
            minHeight: 'Hauteur minimale (px)',
            maxHeight: 'Hauteur maximale (px)',
            disabled: 'Désactivé',
            readonly: 'Lecture seule',
            required: 'Requis',
          },
        },
        knobNotes: { accordion: { headingLevel: '(sémantique uniquement)' } },

        descriptions: {
          timeline: {
            items: 'Les événements à afficher, dans l’ordre.',
            orientation: 'Sens dans lequel la frise chronologique se déroule.',
            align:
              'Placement du contenu par rapport à la ligne ; alternate ne s’applique qu’aux frises verticales.',
            size: 'Taille visuelle de la frise chronologique.',
          },
          toast: {
            size: 'Taille visuelle appliquée à chaque toast de la pile.',
            position: 'Coin ou bord de la fenêtre où la pile de toasts est ancrée.',
            clearable: 'Affiche un bouton de fermeture sur chaque toast.',
            show: 'Affiche un toast et renvoie son id. Son message et son titre acceptent une chaîne simple ou des segments mis en avant.',
            success: 'Affiche un toast de succès et renvoie son id.',
            error: 'Affiche un toast d’erreur et renvoie son id.',
            warning: 'Affiche un toast d’avertissement et renvoie son id.',
            info: 'Affiche un toast d’information et renvoie son id.',
            dismiss: 'Supprime le toast portant l’id indiqué, s’il est encore affiché.',
            clear: 'Supprime tous les toasts actuellement affichés.',
            pause:
              'Suspend tous les comptes à rebours de fermeture automatique en conservant le temps restant de chaque toast.',
            resume: 'Reprend les comptes à rebours suspendus par pause.',
          },
          input: {
            spellcheck:
              'Valeur de l’attribut natif spellcheck, laissée au réglage par défaut du navigateur si elle n’est pas définie.',
            keepIcon:
              'Garde l’icône de tête visible tant que le champ a une valeur ; avec false, l’icône n’apparaît qu’avec le placeholder.',
            role: 'Rôle ARIA appliqué au champ natif, p. ex. combobox pour un hôte de saisie semi-automatique.',
            ariaExpanded:
              'État déplié d’une fenêtre contextuelle contrôlée, transmis via aria-expanded.',
            ariaControls:
              'id de l’élément contextuel que le champ contrôle, transmis via aria-controls.',
            ariaActivedescendant:
              'id de l’option active dans la fenêtre contextuelle contrôlée, transmis via aria-activedescendant.',
            ariaAutocomplete:
              'Indice de comportement de saisie semi-automatique, transmis via aria-autocomplete.',
            label: 'Libellé affiché au-dessus du champ.',
            type: 'Type natif du champ (password ajoute un bouton afficher/masquer intégré).',
            placeholder: 'Texte indicatif affiché lorsque le champ est vide.',
            size: 'Taille visuelle du champ.',
            hint: 'Texte d’aide affiché sous le champ, masqué en cas d’erreur.',
            errorMsg:
              'Message d’erreur affiché sous le champ, remplaçant l’indication et marquant le champ comme invalide.',
            disabled: 'Désactive le champ.',
            readonly: 'Affiche le champ en lecture seule.',
            required: 'Marque le champ comme requis.',
            autocomplete: 'Valeur de l’attribut natif autocomplete.',
            list: 'id d’un <datalist> à associer pour les suggestions natives.',
            autofocus: 'Place le focus sur le champ une fois, après son premier rendu.',
            showPasswordToggle:
              'Affiche le bouton afficher/masquer pour les champs password.',
            clearable:
              'Affiche un bouton d’effacement lorsque le champ contient une valeur.',
            id: 'id appliqué au champ natif et au for du libellé, généré automatiquement si omis.',
            value: 'Valeur actuelle du champ, liable en deux sens via [(value)].',
            blurred: 'Émis lorsque le champ perd le focus.',
            focused: 'Émis lorsque le champ reçoit le focus.',
            clear: 'Efface la valeur actuelle et redonne le focus au champ.',
            focus: 'Place le focus clavier sur le champ natif sous-jacent.',
            togglePasswordVisibility:
              'Bascule l’affichage du mot de passe pour les champs type="password".',
            icon: 'Composant d’icône de tête affiché avant le texte.',
            max: 'Valeur maximale pour type="number" ; la valeur y est bornée à la perte de focus.',
            maxLength:
              'Nombre maximal de caractères ; appliqué pour type="number" où le maxlength natif est ignoré.',
            min: 'Valeur minimale pour type="number" ; la valeur y est bornée à la perte de focus.',
            minLength:
              'Nombre minimal de caractères, transmis en tant qu’attribut natif minlength.',
            step: 'Incrément de pas pour les champs type="number".',
            clampToBounds:
              'Borne une valeur numérique dans la plage min/max configurée une fois l’édition terminée.',
          },
          'number-input': {
            allowNegative:
              'Si les valeurs négatives sont autorisées ; avec false, la valeur ne descend pas sous 0.',
            label: 'Libellé affiché au-dessus du champ.',
            placeholder: 'Texte indicatif affiché lorsque le champ est vide.',
            size: 'Taille visuelle du champ.',
            hint: 'Texte d’aide affiché sous le champ, masqué en cas d’erreur.',
            errorMsg:
              'Message d’erreur affiché sous le champ, remplaçant l’indication et marquant le champ comme invalide.',
            disabled: 'Désactive le champ.',
            readonly: 'Affiche le champ en lecture seule.',
            required: 'Marque le champ comme requis.',
            min: 'Valeur minimale ; les valeurs saisies y sont ramenées à la perte du focus.',
            max: 'Valeur maximale ; les valeurs saisies y sont ramenées à la perte du focus.',
            step: 'Valeur ajoutée ou retranchée à chaque pas avec les touches fléchées.',
            maxDigits:
              'Limite le nombre de caractères acceptés par le champ ainsi que sa largeur ; six caractères par défaut.',
            id: 'id appliqué au champ natif et au for du libellé, généré automatiquement si omis.',
            value:
              'Valeur actuelle du champ ; null quand vide, liable en deux sens via [(value)].',
            changed: 'Émis avec la nouvelle valeur à chaque changement.',
            focused: 'Émis lorsque le champ reçoit le focus.',
            blurred: 'Émis lorsque le champ perd le focus.',
            focus: 'Place le focus clavier sur le champ natif sous-jacent.',
          },
          accordion: {
            size: 'Taille visuelle de l’accordéon ; chaque élément en hérite.',
            multi: 'Permet de garder plusieurs éléments ouverts à la fois.',
            headingLevel:
              'Niveau de titre (1-6) appliqué à chaque en-tête d’élément, pour que l’accordéon s’insère dans le plan de la page.',
          },
          alert: {
            dismissible:
              'Affiche un bouton de fermeture permettant à l’utilisateur de fermer l’alerte.',
            variant:
              'Schéma de couleurs sémantique qui détermine l’icône et la palette de l’alerte.',
            visible:
              'Indique si l’alerte est affichée, liable en deux sens via [(visible)].',
            dismissed:
              'Émis lorsque l’utilisateur ferme l’alerte via son bouton de fermeture.',
            dismiss: 'Masque l’alerte et émet l’événement dismissed.',
            size: 'Met à l’échelle le texte, l’icône et l’espacement ensemble.',
            icon: 'Remplace l’icône de statut par défaut de la variante par n’importe quel composant d’icône.',
          },
          avatar: {
            src: 'URL de l’image à afficher ; bascule sur les initiales, puis sur une icône d’utilisateur générique.',
            alt: 'Texte alternatif de l’image de l’avatar.',
            initials: 'Initiales affichées lorsqu’aucune source d’image n’est fournie.',
            size: 'Préréglage de diamètre de l’avatar.',
            shape: 'Contour de l’avatar : rond ou carré arrondi.',
          },
          badge: {
            variant: 'Schéma de couleurs sémantique du badge.',
            size: 'Taille visuelle du badge.',
            shape:
              'Forme extérieure du badge (pill épouse le contenu, pin s’affiche en cercle pour les caractères uniques).',
            uppercase: 'Affiche le contenu entièrement en majuscules.',
          },
          button: {
            variant: 'Style visuel du bouton, déterminant sa couleur et son emphase.',
            size: 'Taille visuelle du bouton.',
            type: 'Attribut type natif appliqué à l’élément bouton sous-jacent.',
            disabled: 'Désactive le bouton et supprime les événements de clic.',
            loading:
              'Remplace le libellé par un indicateur de chargement tout en conservant la largeur rendue.',
            fullWidth: 'Étire le bouton pour remplir la largeur de son conteneur.',
            uppercase: 'Affiche le libellé entièrement en majuscules.',
            ariaLabel:
              'Libellé accessible du bouton lorsque son contenu n’est pas suffisamment descriptif.',
            ariaCurrent:
              'Valeur de l’attribut natif aria-current, marquant le bouton comme l’élément actuel d’un ensemble.',
            clicked:
              'Émis lorsque le bouton est activé, supprimé lorsqu’il est désactivé ou en chargement.',
            icon: 'Composant d’icône optionnel rendu à gauche du libellé.',
          },
          card: {
            variant: 'Style visuel de la surface de la carte.',
            padding: 'Préréglage d’espacement appliqué à la zone de contenu de la carte.',
            headerAlign: 'Alignement horizontal du contenu de l’en-tête.',
            fullWidth: 'Étire la carte pour remplir la largeur disponible.',
            headerDivider: 'Affiche un séparateur entre l’en-tête et le corps.',
          },
          checkbox: {
            truncate:
              'Tronque un libellé trop long pour sa colonne et révèle le texte complet dans une infobulle.',
            ariaLabel:
              'Nom accessible de la case à cocher lorsqu’aucun libellé visible n’est rendu.',
            checked: 'État coché actuel, liable en deux sens via [(checked)].',
            count: 'Valeur complémentaire affichée en grisé juste après le libellé.',
            disabled: 'Désactive la case à cocher.',
            errorMsg:
              'Message d’erreur affiché sous le champ, remplaçant l’indication et marquant le champ comme invalide.',
            hint: 'Texte d’aide affiché sous le champ, masqué en cas d’erreur.',
            id: 'id appliqué au champ natif et au for du libellé, généré automatiquement si omis.',
            indeterminate:
              'Affiche la case à cocher dans un état visuellement indéterminé.',
            label: 'Libellé textuel rendu à côté de la case à cocher.',
            required: 'Marque la case à cocher comme requise.',
            size: 'Taille visuelle de la case à cocher.',
            changed:
              'Émis avec le nouvel état coché chaque fois que l’utilisateur bascule la case à cocher.',
          },
          'code-input': {
            disabled: 'Désactive toutes les cases de chiffres.',
            errorMsg:
              'Message d’erreur affiché sous le champ, remplaçant l’indication et marquant le champ comme invalide.',
            hint: 'Texte d’aide affiché sous le champ, masqué en cas d’erreur.',
            id: 'id appliqué aux cases de chiffres et au for du libellé, généré automatiquement si omis.',
            label: 'Libellé textuel rendu au-dessus du champ.',
            length: 'Nombre de cases de chiffres composant le code.',
            placeholder: 'Texte indicatif réparti un caractère par cellule.',
            readonly: 'Affiche le champ en lecture seule.',
            required: 'Marque le champ comme requis.',
            size: 'Taille visuelle de chaque case de chiffre.',
            value: 'Valeur actuelle du code, liable en deux sens via [(value)].',
            completed: 'Émis avec le code complet une fois chaque chiffre saisi.',
            focus:
              'Place le focus clavier sur le prochain chiffre vide (ou le dernier lorsque tout est rempli).',
            allowAllChars:
              'Autorise tout caractère non blanc ; sinon, seuls les chiffres sont acceptés.',
          },
          'color-picker': {
            compact:
              'Affiche le déclencheur comme une simple pastille, sans la valeur ni le bouton d’effacement.',
            disabled: 'Désactive le champ.',
            errorMsg:
              'Message d’erreur affiché sous le champ, remplaçant l’indication et marquant le champ comme invalide.',
            format: 'Format de sortie de la valeur de couleur émise (hex, rgb ou hsl).',
            hint: 'Texte d’aide affiché sous le champ, masqué en cas d’erreur.',
            id: 'id appliqué au déclencheur et au for du libellé, généré automatiquement si omis.',
            label: 'Libellé textuel rendu au-dessus du champ.',
            placeholder:
              'Texte indicatif affiché sur le déclencheur lorsqu’aucune couleur n’est sélectionnée.',
            presets:
              'Échantillons prédéfinis affichés au bas de la popover ; passez un tableau vide pour les masquer.',
            readonly:
              'Affiche le champ en lecture seule, empêchant l’ouverture de la popover.',
            required: 'Marque le champ comme requis.',
            showAlpha: 'Affiche le curseur alpha et inclut l’alpha dans la valeur émise.',
            clearable:
              'Affiche ou non le bouton d’effacement lorsqu’une valeur est définie.',
            size: 'Taille visuelle du déclencheur du sélecteur.',
            value: 'Chaîne de couleur actuelle, liable en deux sens via [(value)].',
            changed:
              'Émis avec la nouvelle chaîne de couleur chaque fois que la sélection change.',
            cycleInputMode:
              'Fait alterner la ligne de saisie de la popover entre chaîne hex et canaux RGB.',
            hasEyeDropper: 'Indique si le navigateur prend en charge l’API EyeDropper.',
            onHexInput:
              'Applique le texte hex saisi à la couleur actuelle au fur et à mesure de l’édition.',
            onPopoverCloseRequested:
              'Ferme la popover lorsque l’utilisateur clique en dehors du sélecteur.',
          },
          divider: {
            label: 'Libellé centré facultatif rendu au sein du trait de séparation.',
            orientation: 'Orientation dans laquelle s’étend le trait de séparation.',
            thick: 'Affiche un trait plus épais.',
          },
          'eagami-wordmark': {
            variant:
              'Variante de contenu : default est le logotype seul, byline ajoute la mention de conception, tagline ajoute la signature.',
            layout:
              'Dispose le logotype empilé sur plusieurs lignes ou en ligne sur une seule ligne.',
            size: 'Taille de police en px du texte de marque ; le reste du logotype est mis à l’échelle à partir de celle-ci.',
            linked:
              'Affiche le logotype sous forme de lien vers eagami.com ; désactivez-le pour l’intégrer dans un lien personnalisé ou un contexte statique.',
          },
          'empty-state': {
            title: 'Texte du titre affiché au-dessus de la description.',
            description: 'Texte d’accompagnement affiché sous le titre.',
            size: 'Taille visuelle du bloc d’état vide.',
            headingLevel:
              'Niveau de titre utilisé pour le titre afin qu’il s’intègre au plan du document environnant.',
            bordered: 'Affiche un cadre en pointillés autour du bloc.',
            icon: 'Composant d’icône optionnel rendu dans la zone média au-dessus du titre.',
          },
          paginator: {
            groupThousands:
              'Groupe les milliers par des virgules dans la plage et les numéros de page.',
            size: 'Taille visuelle du paginateur et de ses contrôles.',
            align:
              'Alignement horizontal des contrôles du paginateur au sein de leur conteneur.',
            disabled: 'Désactive tous les contrôles du paginateur.',
            page: 'Numéro de page actuel, liable en deux sens via [(page)].',
            pageSize:
              'Nombre d’éléments affichés par page, liable en deux sens via [(pageSize)].',
            pageSizeOptions:
              'Tailles de page sélectionnables proposées dans le sélecteur de taille de page.',
            showPageSizeSelector: 'Affiche le contrôle de sélection de taille de page.',
            showRangeLabel: 'Affiche le libellé décrivant la plage d’éléments visibles.',
            totalItems:
              'Nombre total d’éléments utilisé pour calculer le nombre de pages.',
            changed:
              'Émis lorsque l’utilisateur change la page actuelle ou la taille de page.',
            goToPage: 'Navigue vers la page indiquée, ramenée dans la plage valide.',
            nextPage: 'Navigue vers la page suivante s’il en existe une.',
            prevPage: 'Navigue vers la page précédente s’il en existe une.',
          },
          'progress-bar': {
            variant: 'Variante de couleur de la barre.',
            size: 'Épaisseur visuelle de la barre.',
            value: 'Valeur de progression actuelle.',
            max: 'Valeur à laquelle la barre est pleine.',
            buffer:
              'Position tamponnée en avance sur la valeur, affichée dans la couleur secondaire.',
            showPercentage: 'Affiche le pourcentage actuel à côté de la barre.',
            indeterminate:
              'Joue une animation en boucle pour une progression de durée inconnue.',
            label: 'Libellé textuel rendu au-dessus de la barre.',
          },
          radio: {
            disabled: 'Désactive cette option.',
            id: 'id appliqué au champ radio natif et au for du libellé, généré automatiquement si omis.',
            label: 'Libellé textuel rendu à côté du bouton radio.',
            value:
              'Valeur que cette option apporte à son groupe parent lorsqu’elle est sélectionnée.',
          },
          'range-slider': {
            ariaLabelHigh:
              'Libellé accessible du curseur haut (fin), revenant au libellé du champ si omis.',
            ariaLabelLow:
              'Libellé accessible du curseur bas (début), revenant au libellé du champ si omis.',
            disabled: 'Désactive le curseur.',
            errorMsg:
              'Message d’erreur affiché sous le curseur, remplaçant l’indication et marquant le champ comme invalide.',
            formatValue: 'Formateur appliqué à chaque valeur avant son affichage.',
            hint: 'Texte d’aide affiché sous le curseur, masqué en cas d’erreur.',
            id: 'id appliqué au curseur, généré automatiquement si omis.',
            label: 'Libellé textuel rendu au-dessus du curseur.',
            max: 'Valeur la plus élevée que l’un ou l’autre curseur peut atteindre.',
            min: 'Valeur la plus basse que l’un ou l’autre curseur peut atteindre.',
            required: 'Marque le champ comme requis.',
            showMinMaxLabels: 'Affiche les bornes min et max aux extrémités de la piste.',
            showValue: 'Affiche les valeurs basse et haute actuelles à côté du curseur.',
            size: 'Taille visuelle de la piste et des curseurs.',
            step: 'Incrément auquel chaque curseur s’aligne lors de son déplacement.',
            value:
              'Tuple de plage [low, high] actuel, liable en deux sens via [(value)].',
            changed:
              'Émis avec le nouveau tuple [low, high] chaque fois que l’un des curseurs se déplace.',
            commitThumb:
              'Aligne un curseur sur le pas le plus proche, le borne aux limites et le contraint par le curseur opposé.',
            groupThousands:
              'Regroupe les valeurs affichées avec des séparateurs de milliers, ignoré lorsqu’un formatValue personnalisé est fourni.',
            formatDisplay:
              'Formate une valeur pour l’affichage en appliquant le regroupement des milliers, sauf si une fonction formatValue personnalisée est définie.',
          },
          rating: {
            allowHalf:
              'Autorise une granularité d’une demi-étoile, permettant à la valeur d’évoluer par pas de 0,5.',
            clearable: 'Cliquer sur la valeur actuelle réinitialise la note à 0.',
            disabled: 'Désactive la note.',
            errorMsg:
              'Message d’erreur affiché sous la note, remplaçant l’indication et la marquant comme invalide.',
            halfIconClass:
              'Classe de composant autonome rendue pour les positions de demi-étoile lorsque allowHalf est true.',
            hint: 'Texte d’aide affiché sous la note, masqué en cas d’erreur.',
            iconClass:
              'Classe de composant autonome rendue pour les positions vides et pleines.',
            id: 'id appliqué à la note et à son libellé, généré automatiquement si omis.',
            label: 'Libellé textuel rendu au-dessus de la note.',
            max: 'Valeur de note la plus élevée et nombre d’étoiles rendues.',
            min: 'Valeur de note la plus basse que l’utilisateur peut sélectionner.',
            readonly:
              'Affiche la note en lecture seule, ignorant les clics et la saisie clavier.',
            required: 'Marque la note comme requise.',
            size: 'Taille visuelle de la note.',
            value: 'Valeur de note actuelle, liable en deux sens via [(value)].',
            hoverChanged:
              'Émis avec la valeur prévisualisée lors du survol, et null lorsque le curseur quitte la zone.',
            iconForState:
              'Renvoie la classe de composant à instancier pour un état d’étoile donné.',
            stateFor:
              'Détermine l’état de rendu (vide, demi ou plein) pour la position d’une étoile.',
          },
          skeleton: {
            animated:
              'Joue l’animation de scintillement pulsé, automatiquement supprimée lorsque l’utilisateur préfère les mouvements réduits.',
            height:
              'Hauteur CSS explicite appliquée au placeholder, revenant à la taille intrinsèque de la forme si omise.',
            variant:
              'Préréglage de forme du placeholder : ligne de texte, cercle ou rectangle.',
            width:
              'Largeur CSS explicite appliquée au placeholder, revenant à la taille intrinsèque de la forme si omise.',
          },
          slider: {
            ariaLabel:
              'Libellé accessible appliqué lorsqu’aucun libellé visible n’est rendu.',
            disabled: 'Désactive le curseur.',
            errorMsg:
              'Message d’erreur affiché sous le curseur, remplaçant l’indication et marquant le champ comme invalide.',
            formatValue: 'Formateur qui transforme la valeur numérique en texte affiché.',
            hasError: 'Force le style d’état d’erreur sans associer de message d’erreur.',
            hint: 'Texte d’aide affiché sous le curseur, masqué en cas d’erreur.',
            icon: "Composant d'icône facultatif affiché avant le texte du libellé.",
            id: 'id appliqué au curseur et à son libellé, généré automatiquement si omis.',
            label: 'Libellé textuel rendu au-dessus du curseur.',
            max: 'Valeur la plus élevée que le curseur peut atteindre.',
            min: 'Valeur la plus basse que le curseur peut atteindre.',
            required: 'Marque le curseur comme requis.',
            showMinMaxLabels: 'Affiche les bornes min et max sous la piste.',
            snapValues:
              'Valeurs sur lesquelles le curseur s’accroche pendant le glissement ; chacune est tracée comme un repère sur la piste.',
            showValue: 'Affiche la valeur actuelle à côté du libellé.',
            size: 'Taille visuelle de la piste et du curseur.',
            step: 'Incrément auquel la valeur s’aligne lors du déplacement du curseur.',
            value: 'Valeur actuelle du curseur, liable en deux sens via [(value)].',
            changed:
              'Émis avec la nouvelle valeur alignée chaque fois que le curseur se déplace.',
            groupThousands:
              'Regroupe les valeurs affichées avec des séparateurs de milliers, ignoré lorsqu’un formatValue personnalisé est fourni.',
            formatDisplay:
              'Formate une valeur pour l’affichage en appliquant le regroupement des milliers, sauf si une fonction formatValue personnalisée est définie.',
          },
          spinner: {
            label:
              'Libellé accessible annoncé aux technologies d’assistance, revenant à la traduction de la locale active si non défini.',
            size: 'Taille visuelle de l’indicateur de chargement.',
          },
          switch: {
            ariaLabel:
              'Libellé accessible de l’interrupteur lorsqu’aucun libellé visible n’est rendu.',
            checked: 'État actuel marche/arrêt, liable en deux sens via [(checked)].',
            disabled: 'Désactive l’interrupteur et bloque la bascule.',
            errorMsg:
              'Message d’erreur affiché sous l’interrupteur, remplaçant l’indication et marquant le champ comme invalide.',
            hint: 'Texte d’aide affiché sous l’interrupteur, masqué en cas d’erreur.',
            id: 'id appliqué à la case à cocher sous-jacente et au for du libellé, généré automatiquement si omis.',
            label: 'Libellé textuel rendu à côté de l’interrupteur.',
            required: 'Marque l’interrupteur comme requis.',
            size: 'Taille visuelle de l’interrupteur.',
            changed:
              'Émis avec le nouvel état coché chaque fois que l’utilisateur bascule l’interrupteur.',
          },
          tag: {
            color:
              'Couleur de remplissage en hexadécimal, qui peint la puce et choisit l’encre la plus lisible.',
            variant: 'Schéma de couleurs sémantique de l’étiquette.',
            size: 'Taille visuelle de l’étiquette.',
            maxWidth:
              'Largeur maximale du tag en px ; un libellé plus long est tronqué. Définissable aussi via --ea-tag-max-width.',
            tooltip:
              'Où un libellé tronqué par maxWidth révèle son texte complet : au-dessus ou en dessous du tag, ou none pour le masquer.',
            removable:
              'Affiche un bouton de suppression qui émet removed lorsqu’il est activé.',
            disabled: 'Désactive l’étiquette et son bouton de suppression.',
            uppercase: 'Affiche le libellé entièrement en majuscules.',
            removeLabel:
              'Libellé accessible du bouton de suppression, revenant à la locale active.',
            removeTabbable:
              'Indique si le bouton de suppression est un arrêt de tabulation ; définir false à l’intérieur d’un widget composite qui gère lui-même la navigation clavier.',
            removed:
              'Émis lorsque l’utilisateur active le bouton de suppression d’une étiquette supprimable.',
          },
          textarea: {
            disabled: 'Désactive le champ.',
            errorMsg:
              'Message d’erreur affiché sous le champ, remplaçant l’indication et marquant le champ comme invalide.',
            hint: 'Texte d’aide affiché sous le champ, masqué en cas d’erreur.',
            id: 'id appliqué au textarea natif et au for du libellé, généré automatiquement si omis.',
            label: 'Libellé textuel rendu au-dessus du champ.',
            maxHeight:
              'Plafond en pixels pour la hauteur du champ ; au-delà, le textarea défile verticalement au lieu de grandir.',
            minHeight:
              'Hauteur minimale en px ; jamais inférieure à la hauteur par défaut.',
            maxlength: 'Nombre maximal de caractères que le champ accepte.',
            placeholder: 'Texte indicatif affiché lorsque le champ est vide.',
            readonly: 'Affiche le champ en lecture seule.',
            required: 'Marque le champ comme requis.',
            resize: 'Axe selon lequel l’utilisateur peut redimensionner le champ.',
            size: 'Taille visuelle du champ.',
            value: 'Valeur actuelle du champ, liable en deux sens via [(value)].',
            blurred: 'Émis lorsque le champ perd le focus.',
            focused: 'Émis lorsque le champ reçoit le focus.',
            focus: 'Place le focus clavier sur le textarea natif sous-jacent.',
          },
          'avatar-editor': {
            accept:
              'Types MIME acceptés par le sélecteur de fichiers, transmis à l’entrée native.',
            canvasSize: 'Largeur et hauteur en pixels du canevas de recadrage carré.',
            cropState:
              'État de panoramique/zoom initial à restaurer lors du chargement d’une image source.',
            currentSrc: 'URL de l’image à charger dans l’éditeur à l’initialisation.',
            exportQuality:
              'Qualité JPEG/WebP utilisée lors de l’exportation de l’image recadrée, entre 0 et 1.',
            exportType:
              'Type MIME du blob d’image exporté (par ex. image/png ou image/jpeg).',
            loading:
              'Affiche un squelette de chargement pendant qu’une ressource externe se charge.',
            maxFileSize:
              'Taille maximale autorisée en octets ; les fichiers dépassant cette limite émettent errored.',
            maxZoom: 'Facteur de zoom maximal que l’utilisateur peut atteindre.',
            minZoom: 'Facteur de zoom minimal que l’utilisateur peut atteindre.',
            shape:
              'Forme du masque de recadrage appliquée au canevas et à l’image exportée.',
            cropped:
              'Émis lorsque l’utilisateur exporte un recadrage, fournissant à la fois un Blob et une URL de données.',
            cropStateChanged:
              'Émis à chaque fois que l’utilisateur déplace ou zoome l’image, utile pour conserver l’état d’édition.',
            errored:
              'Émis avec un message lisible lorsque la validation du fichier échoue.',
            fileSelected:
              'Émis lorsqu’un fichier est choisi depuis le disque ou déposé sur l’éditeur.',
            removed:
              'Émis lorsque l’image actuelle est supprimée via le contrôle de suppression.',
            captureOriginal:
              'Marque l’image actuelle et l’état de recadrage comme référence pour revertImage.',
            exportCrop:
              'Rend le recadrage actuel sur un canevas hors écran, émet cropped et résout avec le Blob.',
            openFilePicker: 'Ouvre la boîte de dialogue native de sélection de fichiers.',
            removeImage:
              'Efface l’image chargée et réinitialise le panoramique et le zoom aux valeurs par défaut.',
            revertImage:
              'Restaure l’image et l’état de recadrage capturés par le dernier appel à captureOriginal.',
            setZoom:
              'Définit le niveau de zoom, limité à la plage minZoom/maxZoom configurée.',
            updateImageDarkness:
              'Échantillonne la région de recadrage visible pour déterminer si l’image est plus sombre que le gris moyen.',
          },
          'menu-trigger': {
            menu: 'L’instance ea-menu que ce déclencheur contrôle.',
          },
          tooltip: {
            whenClipped:
              'N’affiche la bulle que lorsque le déclencheur tronque son contenu.',
            flip: 'Déplace une bulle sans place du côté demandé vers le côté opposé.',
            maxWidth:
              'Largeur maximale en pixels; le texte passe à la ligne à cette largeur (minimum 50px). L’infobulle ne dépasse jamais la zone d’affichage.',
            dismissDelay:
              'Délai en millisecondes avant qu’une infobulle défilante ne se ferme après le départ du pointeur, assez long pour l’atteindre. Celles qui tiennent se ferment immédiatement.',
            eaTooltip:
              'Contenu de l’infobulle affichée au survol et au focus clavier. Accepte une chaîne de texte ou un TemplateRef pour du contenu stylisé.',
            tooltipPosition: 'Position de l’infobulle par rapport à son élément hôte.',
          },
          'time-picker': {
            disabled: 'Désactive le sélecteur.',
            errorMsg:
              'Message d’erreur affiché sous le champ, remplaçant l’indication et marquant le champ comme invalide.',
            format:
              'Format d’affichage du libellé déclencheur ; la valeur transmise est toujours en 24 h.',
            hint: 'Texte d’aide affiché sous le champ, masqué en cas d’erreur.',
            id: 'id appliqué au déclencheur et au for du libellé, généré automatiquement si omis.',
            includeSeconds:
              'Affiche une colonne des secondes en plus des heures et des minutes.',
            label: 'Libellé affiché au-dessus du champ.',
            minuteStep:
              'Incrément auquel la colonne des minutes s’aligne lors d’un déplacement.',
            placeholder:
              'Texte indicatif affiché sur le déclencheur lorsqu’aucune heure n’est sélectionnée.',
            readonly:
              'Affiche le champ en lecture seule, empêchant l’ouverture de la popover.',
            required: 'Marque le champ comme requis.',
            secondStep:
              'Incrément auquel la colonne des secondes s’aligne lors d’un déplacement.',
            size: 'Taille visuelle du déclencheur du sélecteur.',
            value:
              'Heure actuelle au format HH:MM ou HH:MM:SS (24 h), liable en deux sens via [(value)], ou null si non définie.',
            changed:
              'Émis avec la nouvelle heure chaque fois que l’utilisateur modifie l’heure sélectionnée.',
            advanceFocus:
              'Déplace le focus vers la colonne d’unité suivante une fois la saisie d’un chiffre terminée.',
            cannotExtend:
              'Renvoie true lorsqu’aucun chiffre supplémentaire ne peut étendre valablement le tampon courant pour l’unité donnée.',
            commitDigits:
              'Analyse la chaîne de chiffres en tampon, la borne à la plage valide de l’unité et l’écrit dans la valeur.',
            flushBuffer: 'Valide tout tampon de chiffres en attente et l’efface.',
            focusHoursWhenReady:
              'Place le focus sur le champ des heures une fois la surface de la popover rendue dans le DOM.',
            hoursFromTyped:
              'Convertit une valeur d’heures saisie en son équivalent 24 h en tenant compte de la période AM/PM actuelle.',
            onPopoverCloseRequested:
              'Ferme la popover lorsque l’utilisateur clique en dehors du sélecteur.',
            onSpinnerBlur:
              'Valide tout tampon de chiffres en attente lorsqu’une colonne de défilement perd le focus.',
            onSpinnerFocus:
              'Sélectionne tout le texte d’une colonne de défilement lors de la prise de focus afin que la première frappe le remplace.',
            onSpinnerInput:
              'Gère la saisie de chiffres dans une colonne de défilement, met à jour le tampon et avance automatiquement le focus lorsque la colonne est pleine.',
            startHold:
              'Démarre une répétition par maintien sur un bouton chevron, incrémentant l’unité donnée et accélérant après un délai.',
            step: 'Incrémente ou décrémente la colonne d’unité donnée d’un incrément configuré.',
            stopHold: 'Annule les minuteries de répétition par maintien en cours.',
            togglePeriod:
              'Bascule la période AM/PM en mode 12 h en inversant le décalage de 12 heures.',
          },
          autocomplete: {
            disabled: 'Désactive le champ.',
            emptyMessage:
              'Message affiché dans la liste lorsqu’aucune option ne correspond à la saisie, avec repli sur la traduction de la locale active si omis.',
            errorMsg:
              'Message d’erreur affiché sous le champ, remplaçant l’indication et marquant le champ comme invalide.',
            hint: 'Texte d’aide affiché sous le champ, masqué en cas d’erreur.',
            id: 'id appliqué au champ natif et au for du libellé, généré automatiquement si omis.',
            label: 'Libellé affiché au-dessus du champ.',
            maxResults:
              'Nombre maximum d’options affichées à la fois dans la liste de suggestions.',
            minLength:
              'Nombre minimal de caractères requis avant l’affichage de la liste de suggestions.',
            options:
              'Liste complète des options disponibles pour le filtrage et la sélection, plate ou répartie en groupes.',
            placeholder: 'Texte indicatif affiché lorsque le champ est vide.',
            readonly: 'Affiche le champ en lecture seule.',
            required: 'Marque le champ comme requis.',
            size: 'Taille visuelle du champ.',
            value: 'Valeur actuelle du champ, liable en deux sens via [(value)].',
            blurred: 'Émis lorsque le champ perd le focus.',
            changed:
              'Émis à chaque modification du texte saisi, y compris lors des éditions libres.',
            focused: 'Émis lorsque le champ reçoit le focus.',
            selected:
              'Émis lorsque l’utilisateur sélectionne une option dans la liste de suggestions.',
            close: 'Ferme la liste de suggestions sans modifier la valeur actuelle.',
            focus: 'Place le focus clavier sur le champ texte sous-jacent.',
            selectOption:
              'Sélectionne par programme l’option donnée, met à jour la valeur et ferme la liste.',
          },
          'command-palette': {
            disabledWhen:
              'Prédicat facultatif qui désactive chaque élément pour lequel il renvoie true, en plus de l’indicateur disabled propre à chaque élément.',
            emptyMessage:
              'Message affiché lorsque la recherche ne correspond à aucun élément, avec repli sur la traduction de la locale active si omis.',
            items:
              'Liste complète des commandes disponibles pour la recherche et l’exécution.',
            open: 'Indique si la boîte de dialogue est ouverte, liable en deux sens via [(open)].',
            placeholder:
              'Texte indicatif affiché dans le champ de recherche lorsqu’il est vide.',
            execute:
              'Émis lorsque l’utilisateur sélectionne une commande, transmettant l’élément choisi.',
            showActiveHighlight:
              'Indique si la ligne active doit afficher son arrière-plan mis en évidence pour l’index plat donné.',
          },
          tabs: {
            activeTab:
              'Valeur de l’onglet actuellement actif, liable en deux sens via [(activeTab)].',
            size: 'Taille visuelle des onglets.',
            variant: 'Style visuel de la barre d’onglets : souligné ou rempli.',
            changed:
              'Émis avec la valeur du nouvel onglet actif à chaque changement d’onglet actif.',
            registerTab:
              'Enregistre un onglet enfant pour qu’il apparaisse dans la barre ; appelé automatiquement par ea-tab.',
            selectTab: 'Active par programme l’onglet correspondant à la valeur donnée.',
            unregisterTab:
              'Supprime un onglet enfant précédemment enregistré ; appelé automatiquement par ea-tab.',
          },
          tab: {
            disabled: 'Désactive cet onglet, empêchant l’utilisateur de le sélectionner.',
            id: 'id appliqué au bouton de l’onglet et à son panneau, généré automatiquement si omis.',
            label: 'Libellé affiché sur le bouton de l’onglet.',
            value:
              'Valeur unique identifiant cet onglet au sein de son groupe ea-tabs parent.',
          },
          'date-picker': {
            disabled: 'Désactive le sélecteur de date.',
            errorMsg:
              'Message d’erreur affiché sous le champ, remplaçant l’indication et marquant le champ comme invalide.',
            format: 'Format d’affichage de la date sélectionnée (short, medium ou long).',
            hint: 'Texte d’aide affiché sous le champ, masqué en cas d’erreur.',
            id: 'id appliqué au champ et au for du libellé, généré automatiquement si omis.',
            label: 'Libellé affiché au-dessus du champ.',
            locale:
              'Balise de locale BCP 47 pour le formatage des dates, revenant à la locale globale si omise.',
            maxDate:
              'Date la plus tardive sélectionnable ; les dates suivantes sont désactivées dans le calendrier.',
            minDate:
              'Date la plus ancienne sélectionnable ; les dates antérieures sont désactivées dans le calendrier.',
            placeholder:
              'Texte indicatif affiché dans le champ lorsqu’aucune date n’est sélectionnée.',
            readonly:
              'Affiche le champ en lecture seule, empêchant l’ouverture du calendrier.',
            required: 'Marque le champ comme requis.',
            size: 'Taille visuelle du champ du sélecteur de date.',
            value: 'Date sélectionnée actuelle, liable en deux sens via [(value)].',
            weekStartsOn:
              'Premier jour de la semaine dans la grille du calendrier (0 pour dimanche, 1 pour lundi).',
            changed:
              'Émis lorsque la date sélectionnée change, y compris lors d’un effacement.',
            clear: 'Efface la date sélectionnée et émet changed avec null.',
            close: 'Ferme la popover du calendrier.',
            focus: 'Place le focus clavier sur le champ de date.',
            onPopoverCloseRequested:
              'Ferme la popover lorsque l’utilisateur clique en dehors du sélecteur de date.',
            open: 'Ouvre la popover du calendrier et place le focus sur la cellule du jour ciblé.',
            toggle: 'Bascule la popover du calendrier entre ouvert et fermé.',
          },
          menu: {
            size: 'Taille visuelle du menu ; chaque élément en hérite.',
            maxHeight:
              'Hauteur maximale de la liste défilante (longueur CSS) ; les menus plus hauts défilent au-delà.',
            ariaLabel:
              'Libellé accessible de la liste du menu, revenant à la locale active si omis.',
            disabled: 'Désactive le menu et l’empêche de s’ouvrir.',
            id: 'id appliqué à l’élément de liste du menu, généré automatiquement si omis.',
            open: 'Indique si le menu est ouvert, liable en deux sens via [(open)].',
            placement:
              'Position de la liste du menu par rapport à son élément déclencheur.',
            closed: 'Émis lorsque le menu se ferme.',
            opened: 'Émis lorsque le menu s’ouvre.',
            close:
              'Ferme le menu et rétablit optionnellement le focus sur l’élément déclencheur.',
            focusFirstItem:
              'Place le focus clavier sur le premier élément activé du menu.',
            onPopoverCloseRequested:
              'Ferme le menu lorsque l’utilisateur clique en dehors.',
            openAt:
              'Ouvre le menu ancré à l’élément déclencheur donné et place le focus sur le premier élément.',
            toggleAt:
              'Bascule l’état du menu, en l’ancrant à l’élément déclencheur donné.',
          },
          'menu-item': {
            disabled: 'Désactive l’élément et supprime les événements de clic.',
            variant:
              'Style visuel de l’élément ; utiliser danger pour les actions destructives.',
            clicked:
              'Émis lorsque l’élément est activé ; le menu parent se ferme immédiatement après.',
          },
          'multi-select': {
            created: 'Émis avec le texte saisi lorsque la ligne de création est choisie.',
            allowCreate:
              'Propose une ligne de création lorsque le texte saisi ne correspond à aucune option.',
            disabled: 'Désactive le multi-select.',
            errorMsg:
              'Message d’erreur affiché sous le champ, remplaçant l’indication et marquant le champ comme invalide.',
            hint: 'Texte d’aide affiché sous le champ, masqué en cas d’erreur.',
            id: 'id appliqué au déclencheur et au for du libellé, généré automatiquement si omis.',
            label: 'Libellé affiché au-dessus du champ.',
            maxVisibleChips:
              'Nombre maximum de chips affichées dans le déclencheur avant que le reste soit regroupé en une pastille de décompte.',
            maxChipWidth:
              'Largeur maximale d’une puce de valeur sélectionnée en px ; un libellé plus long est tronqué et révèle son texte complet dans une infobulle.',
            popoverMaxHeight:
              'Hauteur maximale du popover d’options en px avant que la liste ne défile.',
            popoverMaxWidth:
              'Largeur maximale du popover d’options en px, ou anchor pour la limiter à celle du champ.',
            options:
              'Liste des options sélectionnables affichées dans la liste déroulante, plate ou répartie en groupes.',
            placeholder:
              'Texte indicatif affiché sur le déclencheur lorsqu’aucune option n’est sélectionnée.',
            readonly: 'Affiche le champ en lecture seule.',
            required: 'Marque le champ comme requis.',
            searchable: 'Affiche le champ de recherche en haut de la popover.',
            searchPlaceholder:
              'Texte indicatif affiché dans le champ de recherche lorsque la saisie est vide.',
            selectAll:
              'Affiche la ligne de sélection totale à trois états en haut de la liste d’options.',
            size: 'Taille visuelle du déclencheur du multi-select.',
            value:
              'Valeurs des options sélectionnées, liables en deux sens via [(value)].',
            changed: 'Émis avec la nouvelle valeur chaque fois que la sélection change.',
            clear:
              'Efface toutes les sélections et arrête la propagation de l’événement.',
            handlePopoverKeydown:
              'Gère la navigation clavier dans la popover ouverte, en traitant les touches fléchées, Entrée, Espace et Échap.',
            onPopoverCloseRequested:
              'Appelé par la popover lorsque l’utilisateur clique en dehors ou fait défiler ; ferme le panneau et marque le champ comme touché.',
            orderedValues:
              'Renvoie l’ensemble de valeurs donné réordonné pour correspondre au tableau d’options d’entrée.',
            removeChip: 'Supprime l’option donnée de la sélection actuelle.',
            toggleOption:
              'Bascule l’appartenance de l’option donnée à la sélection actuelle.',
            toggleSelectAll:
              'Sélectionne toutes les options filtrées si certaines sont désélectionnées, ou désélectionne toutes les options filtrées si toutes sont sélectionnées.',
          },
          dropdown: {
            disabled: 'Désactive le menu déroulant.',
            errorMsg:
              'Message d’erreur affiché sous le champ, remplaçant l’indication et marquant le champ comme invalide.',
            hint: 'Texte d’aide affiché sous le champ, masqué en cas d’erreur.',
            id: 'id appliqué au déclencheur et au for du libellé, généré automatiquement si omis.',
            label: 'Libellé affiché au-dessus du champ.',
            options:
              'Liste des options sélectionnables affichées dans la liste déroulante, plate ou répartie en groupes.',
            placeholder:
              'Texte indicatif affiché sur le déclencheur lorsqu’aucune option n’est sélectionnée.',
            readonly: 'Affiche le champ en lecture seule.',
            required: 'Marque le champ comme requis.',
            size: 'Taille visuelle du déclencheur du menu déroulant.',
            value: 'Valeur sélectionnée actuelle, liable en deux sens via [(value)].',
            changed:
              'Émis avec la nouvelle valeur lorsque l’utilisateur sélectionne une option.',
            close: 'Ferme la liste déroulante sans modifier la valeur actuelle.',
            focus: 'Place le focus clavier sur le déclencheur du menu déroulant.',
            onPopoverCloseRequested:
              'Appelé par la popover lorsque l’utilisateur clique en dehors du menu déroulant ; ferme le panneau et marque le champ comme touché.',
            select: 'Sélectionne l’option donnée par programmation et ferme la liste.',
            toggle: 'Bascule la liste déroulante entre ouverte et fermée.',
          },
          'file-uploader': {
            accept:
              'Types MIME et extensions de fichier acceptés par la zone de dépôt, séparés par des virgules, ex. ’image/*,.pdf’.',
            disabled: 'Désactive le téléverseur.',
            errorMsg:
              'Message d’erreur affiché sous le champ, remplaçant l’indication et marquant le champ comme invalide.',
            hint: 'Texte d’aide affiché sous le champ, masqué en cas d’erreur.',
            id: 'id appliqué à la zone de dépôt et au for du libellé, généré automatiquement si omis.',
            label: 'Libellé affiché au-dessus du champ.',
            maxFiles:
              'Nombre total maximal de fichiers ; les fichiers excédentaires sont rejetés.',
            maxSize:
              'Taille maximale par fichier en octets ; les fichiers plus volumineux sont rejetés.',
            multiple: 'Permet de sélectionner plusieurs fichiers à la fois.',
            progress:
              'Carte de progression du téléversement par fichier (0-100) indexée par identité de File ; omettez-la pour masquer les barres de progression.',
            required: 'Marque le champ comme requis.',
            showFileList:
              'Affiche la liste des fichiers sélectionnés sous la zone de dépôt.',
            size: 'Taille visuelle du téléverseur.',
            value: 'Liste de fichiers actuelle, liable en deux sens via [(value)].',
            fileRemoved:
              'Émis lorsqu’un fichier est supprimé via le bouton de suppression de sa ligne.',
            dragOverChanged:
              'Émis quand un glisser entre dans la zone de dépôt ou en sort, pour un conteneur qui gère son propre style de glisser.',
            rejected:
              'Émis lorsqu’un ou plusieurs fichiers échouent à la validation, avec la raison de chaque rejet.',
            trackFile:
              'Retourne une clé de suivi stable pour un fichier, utilisée en interne par la liste de fichiers.',
          },
          'form-field': {
            size: 'Taille visuelle du champ ; le libellé, le texte du contrôle, les espacements et les messages évoluent avec elle.',
            errorMsg:
              'Message d’erreur affiché sous le contrôle, remplaçant l’indication et marquant le champ comme invalide.',
            hint: 'Texte d’aide affiché sous le contrôle, masqué en cas d’erreur.',
            id: 'Base d’id pour relier le libellé et le message, générée automatiquement si omise.',
            label: 'Libellé affiché au-dessus du contrôle.',
            required: 'Marque le champ comme requis.',
          },
          popover: {
            anchor:
              'Élément hôte ou ElementRef par rapport auquel le popover se positionne.',
            ariaLabel:
              'Libellé accessible de la surface du popover ; à fournir lorsque le popover ne contient pas de titre visible.',
            ariaLabelledby:
              'Id de l’élément qui labellise la surface du popover, transmis comme aria-labelledby.',
            clamp:
              'Maintient le popover dans la fenêtre d’affichage lorsqu’il déborderait sinon.',
            closeOnEscape: 'Ferme le popover lorsque la touche Échap est pressée.',
            closeOnOutsideClick:
              'Ferme le popover lorsque l’utilisateur clique en dehors du popover et de son ancre.',
            flip: 'Bascule vers le côté opposé lorsque le placement demandé déborde de la fenêtre d’affichage.',
            matchAnchorWidth:
              'Définit la largeur minimale du popover pour correspondre à celle de l’ancre.',
            maxWidth:
              'Largeur maximale de la surface en px, ou anchor pour la limiter à celle de l’élément d’ancrage.',
            offset: 'Écart en px entre l’ancre et la surface du popover.',
            open: 'Indique si le popover est actuellement ouvert.',
            placement: 'Position préférée du popover par rapport à son ancre.',
            role: 'Rôle ARIA appliqué à la surface du popover.',
            scrollBehavior:
              'Comportement du popover lors des événements de défilement et de redimensionnement lorsqu’il est ouvert : reposition, close ou ignore.',
            surfaceId:
              'id DOM de la surface du popover, utilisé par les éléments déclencheurs via aria-controls.',
            trapFocus:
              'Maintient Tab et Maj+Tab en cycle à l’intérieur de la surface tant qu’elle est ouverte, pour les popovers de type dialogue.',
            closeRequested:
              'Émis lorsque le popover demande à être fermé ; le parent doit répercuter cela dans [open].',
          },
          'accordion-item': {
            disabled: 'Désactive cet élément et empêche son ouverture/fermeture.',
            id: 'id appliqué au bouton d’en-tête et au panneau de l’élément, généré automatiquement si omis.',
            label: 'Texte affiché dans le bouton d’en-tête de l’élément.',
            value: 'Clé unique qui identifie cet élément dans son accordéon parent.',
          },
          breadcrumbs: {
            size: 'Taille visuelle du fil d’Ariane.',
            ariaLabel:
              'Libellé accessible de la navigation de fil d’Ariane, basculant sur la traduction de la locale active si omis.',
            items:
              'Tableau d’entrées de fil d’Ariane ; les éléments avec href s’affichent comme liens, les autres comme boutons, et le dernier est non interactif.',
            separator:
              'Style visuel du séparateur affiché entre les éléments du fil d’Ariane.',
            clicked:
              'Émis lorsqu’un élément du fil d’Ariane non désactivé et non final est activé.',
          },
          drawer: {
            animation:
              'Animation de glissement à l’ouverture et à la fermeture du tiroir : none (instantané), linear (vitesse constante) ou eased (une courbe d’atténuation en sortie).',
            ariaLabel:
              'Libellé accessible du panneau du tiroir lorsque son titre n’est pas suffisamment descriptif.',
            closeOnBackdrop:
              'Ferme le tiroir lorsque l’utilisateur clique sur l’arrière-plan.',
            closeOnEscape:
              'Ferme le tiroir lorsque l’utilisateur appuie sur la touche Échap.',
            id: 'id appliqué à l’élément dialog, généré automatiquement si omis.',
            mode: 'Comment le tiroir se rapporte à la page : overlay flotte au-dessus d’une page assombrie où le focus est piégé, tandis que push s’ouvre de façon non modale et réagence le contenu de la page sur le côté.',
            open: 'Indique si le tiroir est ouvert, liable en deux sens via [(open)].',
            position: 'Bord de la fenêtre depuis lequel le tiroir s’ouvre en glissant.',
            pushTarget:
              'Élément dont le contenu est poussé sur le côté en mode push, sous forme de sélecteur CSS ou de référence d’élément ; par défaut, le corps du document.',
            showClose: 'Affiche le bouton de fermeture dans l’en-tête du tiroir.',
            size: 'Étendue du panneau du tiroir sur son axe principal : largeur pour les tiroirs latéraux, hauteur pour les tiroirs supérieurs et inférieurs.',
            closed:
              'Émis lorsque le tiroir se ferme, que ce soit via le bouton, l’arrière-plan ou Échap.',
            opened: 'Émis une fois le tiroir affiché.',
          },
          'data-table': {
            size: 'Taille visuelle du tableau ; les marges de densité et les icônes évoluent avec elle.',
            clickable:
              'Marque les lignes de données comme cliquables : affiche un curseur en forme de main et émet rowActivate au clic ou avec Entrée/Espace.',
            rowActivate:
              'Émis avec les données de la ligne lorsqu’une ligne cliquable est activée au clic ou au clavier.',
            navigable:
              'Transforme le tableau en une grille navigable au clavier, avec un focus mobile et un déplacement entre cellules via les flèches.',
            bordered: 'Affiche une bordure autour de chaque cellule.',
            caption:
              'Légende visible affichée au-dessus du tableau ; le nomme également pour les technologies d’assistance.',
            columns:
              'Définitions de colonnes décrivant la clé, le libellé et, éventuellement, le tri ou le modèle de chaque champ.',
            data: 'Tableau d’objets de lignes à afficher dans le tableau.',
            density:
              'Préréglage de densité verticale contrôlant le rembourrage des lignes et des cellules d’en-tête.',
            hoverable: 'Met en évidence la ligne sous le pointeur au survol.',
            noDataText:
              'Texte affiché dans l’état vide, avec repli sur la traduction de la locale active.',
            sort: 'État de tri actuel (clé de colonne et direction), liable en deux sens via [(sort)].',
            stickyHeader:
              'Fixe la ligne d’en-tête en haut du tableau lorsque le contenu défile.',
            striped:
              'Applique un ombrage d’arrière-plan alterné aux lignes paires et impaires.',
            trackBy:
              'Clé de propriété de ligne utilisée par la détection de changement d’Angular pour identifier les lignes efficacement.',
            sorted:
              'Émis chaque fois que la colonne ou la direction de tri change via un clic sur l’en-tête.',
          },
          'radio-group': {
            ariaLabel:
              'Libellé accessible du groupe lorsqu’aucun libellé visible n’est rendu.',
            disabled: 'Désactive toutes les options radio du groupe.',
            errorMsg:
              'Message d’erreur affiché sous le groupe, remplaçant l’indication et marquant le champ comme invalide.',
            hint: 'Texte d’aide affiché sous le groupe, masqué en cas d’erreur.',
            id: 'id appliqué à l’élément du groupe et au for de son libellé, généré automatiquement si omis.',
            label: 'Libellé textuel rendu au-dessus du groupe.',
            name: 'Attribut name partagé appliqué à tous les boutons radio du groupe, généré automatiquement si omis.',
            orientation: 'Direction de disposition des options radio au sein du groupe.',
            required: 'Marque le groupe comme requis.',
            size: 'Taille visuelle appliquée à toutes les options radio du groupe.',
            value: 'Valeur actuellement sélectionnée, liable en deux sens via [(value)].',
            changed:
              'Émis avec la nouvelle valeur lorsque l’utilisateur sélectionne une option.',
            select: 'Sélectionne par programmation l’option avec la valeur donnée.',
          },
          segmented: {
            ariaLabel:
              'Libellé accessible du contrôle lorsqu’aucun libellé visible n’est affiché.',
            disabled: 'Désactive le contrôle segmenté.',
            errorMsg:
              'Message d’erreur affiché sous le champ, remplaçant l’indication et marquant le champ comme invalide.',
            fullWidth: 'Étire le contrôle pour remplir la largeur de son conteneur.',
            hint: 'Texte d’aide affiché sous le champ, masqué en cas d’erreur.',
            id: 'id appliqué au contrôle et au for du libellé, généré automatiquement si omis.',
            label: 'Libellé affiché au-dessus du contrôle.',
            options:
              'Tableau d’options affichées sous forme de boutons bascule dans le contrôle.',
            required: 'Marque le champ comme requis.',
            size: 'Taille visuelle du contrôle segmenté.',
            value:
              'Valeur de l’option actuellement sélectionnée, liable en deux sens via [(value)].',
            changed:
              'Émis avec la nouvelle valeur lorsque l’utilisateur sélectionne une autre option.',
            select: 'Sélectionne l’option donnée par programmation.',
          },
          tree: {
            ariaLabel: 'Libellé accessible du composant arbre.',
            disabled: 'Désactive tous les nœuds de l’arbre.',
            expandedIds:
              'Identifiants des nœuds branche actuellement développés, liables en deux sens via [(expandedIds)].',
            nodes: 'Tableau d’objets de données de nœuds définissant la hiérarchie.',
            selectedId:
              'Identifiant du nœud actuellement sélectionné, liable en deux sens via [(selectedId)].',
            size: 'Taille visuelle de l’arbre, mettant à l’échelle le texte et l’espacement proportionnellement.',
            nodeClick:
              'Émis avec les données du nœud lorsque l’utilisateur sélectionne un nœud.',
          },
          step: {
            completed:
              'Marque l’étape comme terminée, mettant à jour son indicateur visuel.',
            disabled: 'Empêche l’activation de l’étape.',
            id: 'id appliqué au panneau de l’étape et à son onglet, généré automatiquement si omis.',
            label: 'Libellé affiché dans l’indicateur d’étape.',
            optional:
              'Marque l’étape comme facultative, affichée en indication sous le libellé.',
          },
          stepper: {
            activeStep:
              'Indice de l’étape active (base zéro), liable en deux sens via [(activeStep)].',
            disabled:
              'Désactive l’intégralité du stepper et toute navigation entre étapes.',
            id: 'id appliqué à l’élément hôte du stepper, généré automatiquement si omis.',
            linear:
              'Exige que chaque étape non optionnelle soit marquée comme terminée avant que l’utilisateur puisse avancer.',
            orientation:
              'Axe selon lequel les étapes sont disposées ; empilez-les verticalement là où une ligne ne tient pas.',
            size: 'Taille visuelle du stepper, mettant à l’échelle les indicateurs et les libellés ensemble.',
            changed:
              'Émis avec le nouvel indice d’étape active lorsque l’utilisateur navigue vers une autre étape.',
            canNavigateTo:
              'Retourne si l’étape à l’indice donné est accessible depuis l’état actuel.',
            indexOf:
              'Retourne l’indice de l’étape donnée, ou -1 si elle n’est pas enregistrée.',
            selectStep: 'Active l’étape à l’indice donné si elle est accessible.',
          },
          'transfer-list': {
            disabled:
              'Désactive l’intégralité de la liste de transfert et tous les contrôles de déplacement.',
            items:
              'Ensemble complet des éléments disponibles dans les deux volets, identifiés par id.',
            selectedIds:
              'Ids des éléments actuellement dans le volet cible (droite), liables en deux sens via [(selectedIds)].',
            size: 'Taille visuelle de la liste de transfert.',
            sourceLabel:
              'En-tête affiché au-dessus du volet source (gauche), revenant à la valeur locale active par défaut.',
            targetLabel:
              'En-tête affiché au-dessus du volet cible (droite), revenant à la valeur locale active par défaut.',
          },
          'virtual-list': {
            itemHeight:
              'Hauteur en pixels de chaque ligne ; toutes les lignes doivent partager la même hauteur fixe.',
            items:
              'Tableau complet des données à afficher ; seule la tranche visible est montée à tout moment.',
            overscan:
              'Nombre de lignes supplémentaires rendues au-dessus et en dessous de la fenêtre visible pour réduire les bords vides lors du défilement rapide.',
            viewportHeight: 'Hauteur en pixels de la fenêtre de défilement.',
            scrollIndexChange:
              'Émis avec l’indice de la première ligne visible en haut de la fenêtre chaque fois que l’utilisateur fait défiler.',
            scrollToIndex:
              'Faire défiler la fenêtre pour que la ligne à l’indice donné apparaisse en haut, limité aux bornes de la liste.',
          },
          'field-label': {
            forId:
              'id du contrôle associé ; rend un <label for> si défini, sinon un <span>.',
            icon: "Composant d'icône facultatif affiché avant le texte du libellé.",
            labelId:
              'id appliqué à l’élément de libellé rendu pour que les contrôles puissent y faire référence via aria-labelledby.',
            required: 'Affiche un indicateur de champ requis sur le libellé.',
            text: 'Texte du libellé affiché dans l’élément de libellé.',
          },
          'field-messages': {
            error:
              'Message d’erreur à afficher ; lorsqu’il est défini, l’indication est masquée et le message est annoncé comme une alerte.',
            hint: 'Texte d’aide affiché sous le champ en l’absence d’erreur.',
            id: 'id de base utilisé pour dériver les ids ARIA des éléments d’erreur et d’indication.',
          },
          dialog: {
            closeRequested:
              'Émis avec manualClose à chaque demande de fermeture, sans fermer la boîte.',
            manualClose:
              'Signale chaque fermeture via closeRequested et laisse la boîte ouverte jusqu’à ce que open passe à false.',
            modal:
              'Affiche le dialogue en mode modal avec un arrière-plan ; à false, il flotte en non modal et la page derrière reste défilable et interactive.',
            closeDisabled:
              'Désactive le bouton de fermeture intégré, par exemple pendant un enregistrement.',
            ariaLabel:
              'Libellé accessible de la boîte de dialogue lorsque son emplacement d’en-tête ne contient pas de titre visible.',
            closeOnBackdrop:
              'Ferme la boîte de dialogue lorsque l’utilisateur clique sur la zone d’arrière-plan en dehors du panneau.',
            closeOnEscape:
              'Ferme la boîte de dialogue lorsque l’utilisateur appuie sur Échap.',
            id: 'id appliqué à l’élément dialog natif, généré automatiquement si omis.',
            open: 'Indique si la boîte de dialogue est affichée, liable en deux sens via [(open)].',
            showClose:
              'Affiche le bouton de fermeture dans l’en-tête de la boîte de dialogue.',
            width: 'Préréglage de largeur du panneau de la boîte de dialogue.',
            closed:
              'Émis lorsque la boîte de dialogue se ferme, que ce soit par l’utilisateur ou de façon programmatique.',
            opened:
              'Émis une fois que la boîte de dialogue est affichée via showModal().',
          },
        },
      },
      sharedOptions: {
        fruitOptions: [
          { value: 'apple', label: 'Pomme' },
          { value: 'banana', label: 'Banane' },
          { value: 'cherry', label: 'Cerise' },
          { value: 'date', label: 'Datte' },
        ],
        viewOptions: [
          { value: 'day', label: 'Jour' },
          { value: 'week', label: 'Semaine' },
          { value: 'month', label: 'Mois' },
        ],
        themeOptions: [
          { value: 'light', label: 'Clair' },
          { value: 'dark', label: 'Sombre' },
        ],
        monthOptions: [
          { value: 'jan', label: 'Janvier' },
          { value: 'feb', label: 'Février' },
          { value: 'mar', label: 'Mars' },
          { value: 'apr', label: 'Avril' },
          { value: 'may', label: 'Mai' },
          { value: 'jun', label: 'Juin' },
          { value: 'jul', label: 'Juillet' },
          { value: 'aug', label: 'Août' },
          { value: 'sep', label: 'Septembre' },
          { value: 'oct', label: 'Octobre' },
          { value: 'nov', label: 'Novembre' },
          { value: 'dec', label: 'Décembre' },
        ],
        breadcrumbHome: 'Accueil',
        breadcrumbProducts: 'Produits',
        breadcrumbLaptops: 'Portables',
        breadcrumbMacBookPro: 'MacBook Pro',
        breadcrumbDashboard: 'Tableau de bord',
        breadcrumbSettings: 'Paramètres',
      },
    },
  },
};

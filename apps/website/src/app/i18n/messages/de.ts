import type { WebMessages } from '../web-messages.types';

export const de: WebMessages = {
  common: {
    skipToContent: 'Zum Hauptinhalt springen',
    brandHome: 'eagami Startseite',
    navUi: 'UI',
    navUiTooltip: 'Dokumentation der Komponentenbibliothek',
    themeToggleTooltip: 'Design umschalten',
    themeToggleLabel: next => `In den ${next} Modus wechseln`,
    localeMenuLabel: 'Sprache',
    localeMenuTooltip: 'Sprache ändern',
    activeLocale: label => `Aktuelle Sprache: ${label}`,
    footer: {
      copyright: year => `© ${year} eagami`,
      npmLink: 'npm',
      npmTooltip: '@eagami/ui auf npm ansehen',
      githubAriaLabel: 'eagami auf GitHub',
      githubTooltip: 'Quellcode auf GitHub ansehen',
      navLabel: 'Fußzeile',
    },
    codeSnippet: {
      copyLabel: 'In die Zwischenablage kopieren',
      copySuccess: 'In die Zwischenablage kopiert',
      copyError: 'Kopieren in die Zwischenablage nicht möglich',
    },
  },
  home: {
    metaTitle: 'Eagami',
    metaDescription: 'Elegantes Webdesign',
    hero: {
      tagline: 'elegantes Webdesign.',
      ctaPrimary: 'Kontakt aufnehmen',
      ctaSecondary: 'Aktuelle Projekte ansehen →',
      scrollHint: 'Zu den Leistungen scrollen',
    },
    services: {
      title: 'Leistungen',
      lede: 'Von einer einzelnen Landingpage bis zur vollständigen Web-App, plus alles, was nach dem Launch kommt.',
      featuresHeading: 'Funktionen',
      uiNote: {
        before: 'Größere Projekte können auf',
        link: 'Eagami UI',
        after:
          ' aufgebaut werden, einer maßgeschneiderten Komponentenbibliothek und einem Designsystem, für eine konsistente und moderne visuelle Sprache über die gesamte Website.',
      },
      core: [
        {
          title: 'Maßgeschneiderte Websites',
          description:
            'Eine komplette, von Grund auf erstellte Website: Domain-Einrichtung, Hosting, Branding, Design und Launch. Unbegrenzte Überarbeitungen bis zum Launch-Tag.',
        },
        {
          title: 'Laufende Wartung',
          description:
            'Monatliche Pflege mit Hosting, Sicherheitspatches, Abhängigkeits-Updates, Inhaltsbearbeitungen und Analyse-Reviews.',
        },
      ],
      addOns: [
        {
          title: 'Benutzerverwaltung',
          description:
            'Benutzerauthentifizierung, Registrierung und Passwortwiederherstellung, plus ein Admin-Dashboard mit Metriken und benutzerspezifischen Steuerungen.',
          iconSlug: 'users',
        },
        {
          title: 'Zahlungsabwicklung',
          description:
            'Online-Zahlungen (standardmäßig Stripe, andere Anbieter auf Anfrage), mit anpassbaren Zahlungsformularen und wiederkehrender Abrechnung.',
          iconSlug: 'credit-card',
        },
        {
          title: 'Mehrsprachige Unterstützung',
          description:
            'Sprachunterstützung für mehrere Sprachräume, mit optionaler automatischer Erkennung aus dem Browser des Besuchers.',
          iconSlug: 'globe',
        },
        {
          title: 'Themes',
          description:
            'Umschalter für Dunkel-/Hellmodus und vollständig anpassbare Farbthemes.',
          iconSlug: 'moon',
        },
        {
          title: 'Analytics & Einblicke',
          description:
            'Metriken zum Website-Traffic (Quellen, Geräte, Standorte), plus benutzerdefiniertes Event-Tracking.',
          iconSlug: 'bar-chart',
        },
        {
          title: 'E-Mail & Benachrichtigungen',
          description:
            'Automatisierte E-Mails für Kontoaktivitäten, Belege und Ankündigungen.',
          iconSlug: 'mail',
        },
      ],
    },
    projects: {
      title: 'Aktuelle Projekte',
      lede: 'Einige Websites in aktiver Entwicklung.',
      previousAriaLabel: 'Vorherige Projekte',
      nextAriaLabel: 'Nächste Projekte',
      regionAriaLabel: 'Aktuelle Projekte',
      showing: title => `${title} wird angezeigt`,
      cards: [
        {
          title: 'London Chess',
          description:
            'Ein Treffpunkt für den London Chess Club und Schachveranstaltungen in London, ON.',
          url: 'https://londonchess.ca',
          display: 'londonchess.ca',
          logo: 'assets/projects/londonchess.svg',
        },
        {
          title: 'CIRC Aesthetics',
          description:
            'Klinik für kosmetische interventionelle Radiologie mit Sitz in London, ON.',
          url: 'https://circaesthetics.ca',
          display: 'circaesthetics.ca',
          logo: 'assets/projects/circaesthetics.svg',
        },
        {
          title: 'Brewski Bets',
          description:
            'Ein Tracker für lockere Wetten unter Freunden, beglichen in Bier.',
          url: 'https://brewskibets.com',
          display: 'brewskibets.com',
          logo: 'assets/projects/brewskibets.svg',
        },
        {
          title: 'Chordbomb',
          description: 'Demnächst verfügbar...',
          url: 'https://chordbomb.com',
          display: 'chordbomb.com',
          logo: 'assets/projects/chordbomb.svg',
        },
      ],
    },
    contact: {
      title: 'Ein Projekt im Kopf?',
      lede: 'Sprechen wir darüber!',
      success: 'Danke für die Nachricht. Sie erhalten bald eine Antwort.',
      nameLabel: 'Name',
      namePlaceholder: 'Ihr Name',
      emailLabel: 'E-Mail',
      emailPlaceholder: 'sie@beispiel.com',
      emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      messageLabel: 'Nachricht',
      placeholderHints: [
        'Hallo! Ich arbeite an einem Nebenprojekt und könnte Hilfe beim Frontend gebrauchen...',
        'Wir suchen jemanden, der eine Website für unser kleines Unternehmen erstellt...',
        'Eine kurze Frage zur Komponentenbibliothek, bevor ich loslege...',
      ],
      submit: 'Nachricht senden',
      sentToast: 'Nachricht gesendet',
      errorMessage:
        'Entschuldigung, etwas ist schiefgelaufen. Bitte schreiben Sie direkt an michal@eagami.com.',
    },
  },
  notFound: {
    metaTitle: 'Eagami | 404',
    metaDescription: 'Seite nicht gefunden.',
    eyebrow: '404',
    title: 'Seite nicht gefunden',
    lede: 'Die gesuchte Seite existiert nicht oder wurde verschoben.',
    cta: 'Zurück zur Startseite',
  },
  ui: {
    metaTitle: 'Eagami | UI',
    changelog: {
      title: 'Änderungsprotokoll',
      metaTitle: 'Eagami | Änderungsprotokoll',
      metaDescription: 'Versionsverlauf der Eagami UI Angular-Komponentenbibliothek.',
      lead: 'Wichtige Änderungen an @eagami/ui, neueste zuerst.',
      migrationGuide: 'Migrationsleitfaden',
      fullHistory: 'Vollständiger Verlauf auf GitHub',
    },
    shell: {
      changelog: 'Änderungsprotokoll',
      sidebarLabel: 'Dokumentations-Seitenleiste',
      navLabel: 'Dokumentation',
      overview: 'Überblick',
      setup: 'Einrichtung',
      designTokens: 'Design-Tokens',
      icons: 'Symbole',
      i18n: 'Internationalisierung',
      components: 'Komponenten',
    },
    index: {
      metaTitle: 'Eagami | UI',
      metaDescription:
        'Leichtgewichtige, barrierefreie Angular-Komponentenbibliothek auf Basis von CSS-Custom-Properties.',
      title: 'Eagami UI',
      ledeBefore:
        'ist eine leichtgewichtige, barrierefreie Angular-Komponentenbibliothek.',
      ledeAfter:
        'Sinnvolle Standardeinstellungen von Haus aus, mit einem vollständig anpassbaren Design für jede Marke.',
      principlesHeading: 'Designprinzipien',
      principles: [
        {
          title: 'Barrierefrei',
          body: 'Tastaturnavigation, Fokusverwaltung, Screenreader-Unterstützung und Reduced-Motion-Handling sind in jede Komponente eingebaut.',
        },
        {
          title: 'Leichtgewichtig',
          body: 'Jede Komponente wird unabhängig importiert und das Bundle liefert nur das aus, was Sie verwenden.',
        },
        {
          title: 'Anpassbar',
          body: 'Vollständig anpassbar mit Design-Tokens bei gleichbleibend einheitlichem Erscheinungsbild auf jeder Seite. Helle und dunkle Varianten werden zusammen ausgeliefert und richten sich standardmäßig nach der Systemeinstellung des Nutzers.',
        },
        {
          title: 'Lokalisiert',
          body: 'Integrierter Komponententext wird in zehn Sprachen ausgeliefert.',
        },
        {
          title: 'Modern',
          body: 'Regelmäßig aktualisiert mit den neuesten Angular-Funktionen und modernen Webstandards.',
        },
        {
          title: 'Offen',
          body: 'Jede Komponente ist reines Angular und CSS ohne Anbieterbindung, sodass der Quellcode wie jeder andere Code in Ihrem Projekt gelesen, kopiert oder verändert werden kann.',
        },
      ],
      getStartedHeading: 'Erste Schritte',
      getStartedBefore: 'Gehen Sie zu',
      getStartedLink: 'Einrichtung',
      /* Leading space because the template suppresses whitespace between the
         link and this string so Polish can butt its trailing comma directly
         against "Instalacji". Locales that continue with a word (en/fr/el/es)
         provide the separator themselves. */
      getStartedAfter:
        ', um das Paket zu installieren und das globale Stylesheet einzubinden.',
      showcase: {
        button: 'Drück mich',
        toggle: 'Schalt mich um',
        tick: 'Hak mich an',
        tag: 'Etikett',
        badge: 'Abzeichen',
        tooltip: 'Zusätzliche Informationen in einem Tooltip angezeigt',
        exploreMore: '...weitere Komponenten entdecken',
        list: 'Liste',
        grid: 'Raster',
        table: 'Tabelle',
        radioThis: 'Dies',
        radioThat: 'Das',
        option1: 'Option 1',
        option2: 'Option 2',
        option3: 'Option 3',
        toastButton: 'Schaltfläche gedrückt',
        toastToggleOn: 'Schalter eingeschaltet',
        toastToggleOff: 'Schalter ausgeschaltet',
        toastTickOn: 'Kontrollkästchen aktiviert',
        toastTickOff: 'Kontrollkästchen deaktiviert',
        ariaView: 'Demo-Ansicht',
        ariaSlider: 'Demo-Schieberegler',
        ariaRating: 'Demo-Bewertung',
        ariaLayout: 'Demo-Layout',
        ariaColor: 'Demo-Farbe',
        ariaSelect: 'Demo-Auswahl',
      },
    },
    setup: {
      metaTitle: 'Eagami | UI | Einrichtung',
      metaDescription:
        'Installieren Sie @eagami/ui und binden Sie das globale Stylesheet sowie die Schriften ein.',
      title: 'Einrichtung',
      installLabel: 'Das Paket installieren:',
      or: 'oder',
      stylesheetLabel: {
        before: 'Fügen Sie das globale Stylesheet hinzu in',
        after: ':',
      },
      fontsLabel: {
        before: 'Laden Sie die Schriften in',
        after: ':',
      },
      firstComponentHeading: 'Ihre erste Komponente',
    },
    tokens: {
      metaTitle: 'Eagami | UI | Design-Tokens',
      metaDescription:
        'CSS-Custom-Properties für Farben, Typografie, Abstände, Erhebung, Form und Bewegung.',
      title: 'Design-Tokens',
      lede: 'Die CSS-Custom-Properties, die jede Komponente der Bibliothek steuern: Farben, Typografie, Abstände, Erhebung, Form und Bewegung. Verweisen Sie in Ihren eigenen Styles über <code>var(--token-name)</code> auf diese Tokens, um visuelle Konsistenz in der gesamten App zu wahren.',
      sections: {
        theming: 'Theming',
        palette: 'Markenpalette',
        colors: 'Farben',
        typography: 'Typografie',
        spacing: 'Abstände',
        elevation: 'Erhebung',
        shape: 'Form',
        motion: 'Bewegung',
      },
      themingRootBefore:
        'Überschreiben Sie ein beliebiges Token auf <code>:root</code>, um die gesamte Bibliothek neu zu gestalten:',
      themingScopedBefore:
        'Oder beschränken Sie Überschreibungen auf einzelne Komponenten, wo es sinnvoll ist:',
      paletteIntro:
        'Übergeben Sie einen einzelnen Marken-Hexwert an <code>provideEagamiUi</code>, und die Bibliothek leitet eine vollständige Zehn-Schattierungen-Skala (50 bis 900) im <a href="https://www.w3.org/TR/css-color-4/#ok-lab" target="_blank" rel="noopener noreferrer"><span>OKLCH</span></a>-Raum ab, wobei Farbton und Chroma konstant bleiben, während die Helligkeit gestuft wird. Die abgeleiteten Schattierungen speisen jedes <code>--color-brand-*</code>-Token sowohl im Hell- als auch im Dunkelmodus:',
      paletteOverrides:
        'Fixieren Sie bestimmte Schattierungen oder ordnen Sie neu zu, welche abgeleitete Schattierung jeder semantischen Rolle zugrunde liegt:',
      paletteContrast:
        'Jede Marken-Rollen-Paarung (Text auf Oberfläche, Oberfläche auf Hintergrund) wird beim Bootstrap gegen WCAG 2.1 AA geprüft. Eine fehlschlagende Kombination wirft einen Fehler, bevor die App lädt, sodass ein Kontrastfehler in der Markenfarbe schon beim Start erkannt wird und nicht erst in der Produktion.',
      elevationDrop: 'Schlagschatten',
      elevationRelief: 'Abschrägung und Vertiefung',
      elevationReliefBefore:
        '<code>--shadow-bevel</code> kombiniert eine eingelassene Aufhellung (oben) mit einem eingelassenen Schatten (unten) für Oberflächen, die erhaben wirken sollen. <code>--shadow-well</code> kehrt die Beleuchtung für einen vertieften Look um. Kombinieren Sie es mit <code>--shadow-*</code> für einen Umgebungs-Schlagschatten: <code>box-shadow: var(--shadow-bevel), var(--shadow-sm);</code>',
      colorsPrimary: 'Primär',
      colorsSecondary: 'Sekundär',
      colorsNeutral: 'Neutral',
      colorsStatus: 'Status',
      colorsSemantic: 'Semantisch',
      typographyFamilies: 'Familien',
      typographySizes: 'Größen',
      typographyWeights: 'Schriftstärken',
      typographyComposites: 'Zusammengesetzte Stile',
      typographyCompositesBefore:
        'Zusammengesetzte Tokens bündeln eine Größe, Schriftstärke, Zeilenhöhe (und manchmal Familie) für eine bestimmte Rolle. <code>--text-section-heading-*</code> ist das erste zusammengesetzte Token, das eine Schriftfamilie festlegt. Verwenden Sie es für den <code>&lt;h2&gt;</code>-Untertitel auf Doku- und Marketingseiten.',
      typographySectionHeadingSample: 'Abschnittsüberschrift im Markenstil',
      motionSimulate: 'Simulieren',
      motionDurations: 'Dauern',
      motionEasings: 'Easings',
    },
    icons: {
      metaTitle: 'Eagami | UI | Symbole',
      metaDescription: 'Symbolsatz, der mit @eagami/ui gebündelt wird.',
      title: 'Symbole',
      lede: 'Eigenständige Angular-Komponenten, die ihre Farbe erben und mit <code>font-size</code> skalieren, sodass sie in jeder Größe gerendert werden. Die meisten stammen von <a href="https://feathericons.com/" target="_blank" rel="noopener noreferrer"><span>Feather Icons</span></a> von <a href="https://github.com/colebemis" target="_blank" rel="noopener noreferrer"><span>Cole Bemis</span></a> unter der <a href="https://github.com/feathericons/feather/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><span>MIT-Lizenz</span></a>; die übrigen sind originale Eagami-UI-Symbole. Feather-Symbole können auch mit dünneren oder dickeren Strichen gezeichnet werden. Klicken Sie auf ein Symbol, um seinen Selektor zu kopieren.',
      filterLabel: 'Symbole filtern',
      filterPlaceholder: 'Symbole suchen',
      filterClearLabel: 'Suche löschen',
      categoryFeather: 'Feather',
      categoryEagami: 'Eagami UI',
      categoryBrand: 'Marke',
      countAll: count => `${count} Symbole`,
      countFiltered: (shown, total) => `${shown} von ${total} Symbolen`,
      noResults: 'Keine Symbole entsprechen Ihrer Suche',
      copiedToast: selector => `"${selector}" in die Zwischenablage kopiert`,
      copyFailedToast: selector =>
        `"${selector}" konnte nicht in die Zwischenablage kopiert werden`,
      brandTitle: 'Markensymbole',
      brandIntro:
        'Die Markensymbole in der Liste unten zeigen Marken Dritter und werden nur zur nominativen Verwendung bereitgestellt, d.h. zur Kennzeichnung der Marke, die sie in einer UI repräsentieren (ein "Mit Google anmelden"-Button, ein "Auf Facebook teilen"-Link usw.). Sie sind nicht für allgemeine dekorative Verwendung lizenziert. Die Nutzer sind dafür verantwortlich, die Richtlinien jeder Marke zu befolgen:',
      brandLinkLabel: 'Markenressourcen',
    },
    i18n: {
      metaTitle: 'Eagami | UI | Internationalisierung',
      metaDescription:
        'Integrierter Komponententext in zehn Sprachräumen, mit Umschaltung zur Laufzeit und Überschreibungen pro Zeichenkette.',
      title: 'Internationalisierung',
      lede: 'Jede integrierte Zeichenkette (ARIA-Labels, Platzhalter, Leerzustände, Datumsauswahl-Steuerungen) wird in zehn Sprachräumen ausgeliefert. Legen Sie einen für die gesamte App fest, wechseln Sie zur Laufzeit oder überschreiben Sie einzelne Zeichenketten.',
      supportedHeading: 'Unterstützte Sprachräume',
      supportedFallback:
        'Unbekannte Sprachräume greifen auf Englisch zurück, ebenso alle Schlüssel, die in einer Teilüberschreibung fehlen.',
      quickSetupHeading: 'Schnelleinrichtung',
      quickSetupBefore:
        'Fügen Sie <code>provideEagamiUi()</code> zu Ihrer App-Konfiguration hinzu und registrieren Sie die verwendeten Sprachen über <code>locales</code>. Englisch ist immer verfügbar, sodass Sie nur das ausliefern, was Sie brauchen.',
      liveDemoHeading: 'Live-Demo',
      liveDemoIntro:
        'Wählen Sie einen Sprachraum und beobachten Sie, wie die Komponenten unten die passenden Zeichenketten und die Datumsformatierung übernehmen.',
      runtimeSwitchHeading: 'Umschaltung zur Laufzeit',
      runtimeSwitchBefore:
        'Injizieren Sie <code>EagamiI18nService</code> und rufen Sie <code>setLocale()</code> auf. Der aktive Sprachraum ist ein Signal, sodass jede Komponente mit den neuen Zeichenketten ohne Neuladen neu gerendert wird.',
      perStringHeading: 'Überschreibungen pro Zeichenkette',
      perStringBefore:
        'Übergeben Sie ein <code>messages</code>-Objekt zusammen mit dem Sprachraum, um einzelne Zeichenketten auszutauschen. Alles, was Sie weglassen, greift auf die Standardwerte des Sprachraums zurück.',
      perStringAfter:
        'Die meisten Komponenten bieten zudem einzelne Message-Inputs (z.B. <code>placeholder</code> auf <code>&lt;ea-dropdown&gt;</code>) für einmalige Überschreibungen an der Aufrufstelle.',
      frenchSpacingHeading: 'Hilfsfunktion für französische Abstände',
      frenchSpacingBody:
        'Die französische Typografie erwartet ein schmales geschütztes Leerzeichen vor <code>? ! : ; »</code> und nach <code>«</code>. Die exportierte Hilfsfunktion <code>frenchSpacing()</code> wandelt normale Leerzeichen in Ihren eigenen französischen Zeichenketten um (die gebündelten französischen Messages verwaltet die Bibliothek intern).',
      demoLocaleLabel: 'Sprachraum',
    },
    component: {
      metaDescription: name => `Referenz und Live-Demos zur Komponente ${name}.`,
      demoHeading: 'Demo',
      notFoundTitle: 'Komponente nicht gefunden',
      notFoundBody: 'Wählen Sie eine Komponente aus der Seitenleiste, oder',
      notFoundLink: 'zur Einführung zurückkehren',
      sectionHeadings: {
        basic: 'einfach',
        variants: 'Varianten',
        sizes: 'Größen',
        states: 'Zustände',
        disabled: 'deaktiviert',
        dismissible: 'schließbar',
        clearable: 'löschbar',
        hintAndError: 'Hinweis & Fehler',
        withHint: 'mit Hinweis',
        withError: 'mit Fehler',
        withLabel: 'mit Label',
        withIcons: 'mit Symbolen',
        withFooter: 'mit Fußzeile',
        withPaginator: 'mit Paginator',
        withDisabledItem: 'mit deaktiviertem Eintrag',
        withDisabledTab: 'mit deaktiviertem Tab',
        required: 'erforderlich',
        requiredWithHint: 'erforderlich mit Hinweis',
        horizontal: 'horizontal',
        vertical: 'vertikal',
        single: 'einzeln',
        multi: 'mehrfach',
        circle: 'Kreis',
        square: 'Quadrat',
        shapes: 'Formen',
        shapesAndFallbacks: 'Formen & Fallbacks',
        chevronSeparator: 'Chevron-Trenner',
        slashSeparator: 'Schrägstrich-Trenner',
        twoLevels: 'zwei Ebenen',
        fourDigitPin: '4-stellige PIN',
        defaultHeading: 'Standard',
        stripedAndBordered: 'gestreift & umrandet',
        compactDensity: 'kompakte Dichte',
        tinyList: 'winzige Liste',
        stickyHeader: 'fixierte Kopfzeile',
        emptyState: 'Leerzustand',
        formatVariants: 'Formatvarianten',
        minMax: 'Min & Max',
        positions: 'Positionen',
        trigger: 'Auslöser',
        alignLeft: 'Ausrichtung: links',
        alignCenter: 'Ausrichtung: zentriert',
        manyPages: 'viele Seiten',
        minimal: 'minimal',
        indeterminate: 'unbestimmt',
        noResize: 'keine Größenänderung',
        resizing: 'Größenänderung',
        disabledAndReadonly: 'deaktiviert & schreibgeschützt',
        password: 'Passwort',
        autocompleteSection: 'Autovervollständigung',
        twoOptions: 'zwei Optionen',
        fullWidth: 'volle Breite',
        minLengthMaxResults: 'Mindestlänge & max. Ergebnisse',
        removable: 'entfernbar',
        minMaxLabels: 'Min/Max-Labels',
        underline: 'Unterstrich',
        filled: 'gefüllt',
        rect: 'Rechteck',
        inlineLayout: 'Inline-Layout',
        noResults: 'keine Ergebnisse',
        titleOnly: 'nur Titel',
        iconTrigger: 'Symbol-Auslöser',
        placements: 'Platzierungen',
        canvasSizes: 'Canvas-Größen',
        cappedChipCount: 'begrenzte Chip-Anzahl',
        customIcon: 'eigenes Symbol',
        customIconAndColor: 'eigenes Symbol & Farbe',
        halfSteps: 'halbe Schritte',
        customLabel: 'eigenes Label',
        customSize: 'eigene Größe',
        linearFlow: 'linearer Ablauf',
        manyLevels: 'viele Ebenen',
        notAnimated: 'nicht animiert',
        numberOfStars: 'Anzahl der Sterne',
        minimumOne: 'mindestens 1 Stern',
        outputFormats: 'Ausgabeformate',
        quarterHourSteps: 'Viertelstunden-Schritte',
        readonly: 'schreibgeschützt',
        singleFile: 'einzelne Datei',
        stepped: 'gestuft',
        sundayStart: 'Start am Sonntag',
        twelveHourFormat: '12-Stunden-Format',
        twoActions: 'zwei Aktionen',
        withCompletedSteps: 'mit abgeschlossenen Schritten',
        withConstraints: 'mit Einschränkungen',
        withInitialValue: 'mit Anfangswert',
        withMaxlength: 'mit Maximallänge',
        withMaxHeight: 'mit maximaler Höhe',
        withMinMaxLabels: 'mit Min/Max-Labels',
        withOptionalStep: 'mit optionalem Schritt',
        withSeconds: 'mit Sekunden',
        withSelection: 'mit Auswahl',
        withoutAlpha: 'ohne Transparenz',
        withoutSearch: 'ohne Suche',
        withoutSelectAll: 'ohne Alle-auswählen',
        wrapping: 'Umbruch',
      },
      common: {
        small: 'Klein',
        medium: 'Mittel',
        large: 'Groß',
        cancel: 'Abbrechen',
        save: 'Speichern',
        close: 'Schließen',
        confirm: 'Bestätigen',
        disabled: 'Deaktiviert',
        defaultLabel: 'Standard',
        successLabel: 'Erfolg',
        warningLabel: 'Warnung',
        errorLabel: 'Fehler',
        infoLabel: 'Info',
      },
      demos: {
        accordion: {
          whatLabel: 'Was ist @eagami/ui?',
          whatBody:
            'Eine leichtgewichtige, barrierefreie Angular-Komponentenbibliothek auf Basis von CSS-Custom-Properties.',
          installLabel: 'Wie installiere ich es?',
          installBody:
            'Führen Sie pnpm add @eagami/ui aus und fügen Sie dann das globale Stylesheet zu Ihrer angular.json hinzu.',
          themeLabel: 'Kann ich das Theme anpassen?',
          themeBody:
            'Ja, überschreiben Sie eine beliebige CSS-Custom-Property auf :root oder beschränken Sie Überschreibungen auf einzelne Komponenten.',
          sectionOneLabel: 'Abschnitt eins',
          sectionOneBody:
            'Im Mehrfachmodus können mehrere Abschnitte gleichzeitig geöffnet sein.',
          sectionTwoLabel: 'Abschnitt zwei',
          sectionTwoBody: 'Inhalt für Abschnitt zwei.',
          disabledSectionLabel: 'Deaktivierter Abschnitt',
          disabledSectionBody: 'Dieser Inhalt ist nicht erreichbar.',
        },
        alert: {
          defaultText: 'Dies ist eine Standardmeldung',
          successText: 'Ihre Änderungen wurden gespeichert',
          warningText: 'Ihre Testphase läuft in 3 Tagen ab',
          errorText: 'Etwas ist schiefgelaufen, bitte versuchen Sie es erneut',
          infoText: 'Eine neue Version ist verfügbar',
          dismissibleText: 'Diese Meldung kann geschlossen werden',
          tooltipSuppressed:
            'Tooltips werden auf Touch-Geräten unterdrückt, um klebriges Hover-Verhalten zu vermeiden. Betrachten Sie diesen Abschnitt auf einem Gerät mit Maus, um die Demos in Aktion zu sehen.',
        },
        autocomplete: {
          startTyping: 'Beginnen Sie zu tippen…',
          hintText: 'Tippen Sie, um Treffer zu sehen',
          errorText: 'Bitte wählen Sie eine Hunderasse aus',
          breedPlaceholder: 'Hunderasse…',
          minMaxLabel: 'Min. 2 Zeichen, max. 3 Ergebnisse',
          minMaxPlaceholder: 'Geben Sie mindestens 2 Zeichen ein…',
        },
        avatarEditor: {
          result: 'Ergebnis:',
        },
        badge: {
          successText: 'Aktiv',
          warningText: 'Ausstehend',
          newText: 'Neu',
        },
        button: {
          primary: 'Primär',
          secondary: 'Sekundär',
          ghost: 'Ghost',
          danger: 'Gefahr',
          toggleLoading: 'Ladezustand umschalten',
          fullWidth: 'Volle Breite',
          clickedToast: 'Button gedrückt!',
        },
        card: {
          elevatedHeader: 'Erhaben',
          elevatedBody: 'Karte mit Schattenerhebung.',
          outlinedHeader: 'Umrandet',
          outlinedBody: 'Karte mit Rahmenkontur.',
          filledHeader: 'Gefüllt',
          filledBody: 'Karte mit dezentem Hintergrund.',
          cardTitleHeader: 'Kartentitel',
          cardWithFooterBody:
            'Diese Karte hat eine Kopfzeile, einen Hauptteil und eine Fußzeile mit Aktionen.',
        },
        checkbox: {
          acceptTermsAndConditions: 'Allgemeine Geschäftsbedingungen akzeptieren',
          disabledChecked: 'Deaktiviert angekreuzt',
          indeterminate: 'Unbestimmt',
          iAgreeToTerms: 'Ich stimme den Bedingungen zu',
          subscribeToUpdates: 'Updates abonnieren',
          subscribeHint: 'Eine monatliche Zusammenfassung wird gesendet, kein Spam',
          acceptTermsLabel: 'Bedingungen akzeptieren',
          acceptTermsError: 'Die Bedingungen müssen akzeptiert werden, um fortzufahren',
        },
        codeInput: {
          verificationCodeLabel: 'Bestätigungscode',
          verificationCodeHint: 'Prüfen Sie Ihre E-Mails auf den 6-stelligen Code',
          verificationCodeError: 'Ungültiger Bestätigungscode',
          pinLabel: 'PIN',
          pinHint: 'Geben Sie Ihre 4-stellige PIN ein',
        },
        colorPicker: {
          brandLabel: 'Markenfarbe',
          hintBrandColor: 'Wird als primäre Markenfarbe verwendet',
          errorRequired: 'Dieses Feld ist erforderlich',
          hexLabel: 'HEX-Format',
          rgbLabel: 'RGB-Format',
          hslLabel: 'HSL-Format',
          noAlphaHeading: 'Nur deckend',
          opaqueOnlyLabel: 'Deckende Farbe',
        },
        dataTable: {
          tableColumnId: 'ID',
          tableColumnFirstName: 'Vorname',
          tableColumnLastName: 'Nachname',
          tableColumnAdmin: 'Admin',
          tableColumnPosts: 'Beiträge',
        },
        datePicker: {
          appointmentLabel: 'Termin',
          pickDatePlaceholder: 'Datum auswählen…',
          hintAnyFutureDate: 'Wählen Sie ein beliebiges zukünftiges Datum',
          errorRequired: 'Dieses Feld ist erforderlich',
          shortLabel: 'Kurz',
          mediumLabel: 'Mittel',
          longLabel: 'Lang',
          withinNextWeeksLabel: 'Innerhalb der nächsten 3 Wochen',
          withinNextWeeksHint: '±1 Woche / +3 Wochen ab heute',
        },
        dialog: {
          openButton: 'Dialog öffnen',
          title: 'Dialogtitel',
          body: 'Dies ist der Dialog-Hauptteil. Er unterstützt beliebige Inhalte, einschließlich Formulare, Text und andere Komponenten.',
        },
        divider: {
          orLabel: 'oder',
          sectionLabel: 'Abschnitt',
          leftLabel: 'Links',
          rightLabel: 'Rechts',
        },
        drawer: {
          openButton: 'Drawer öffnen',
          rightButton: 'Rechts',
          leftButton: 'Links',
          topButton: 'Oben',
          bottomButton: 'Unten',
          rightTitle: 'Rechter Drawer',
          rightBody: 'Schiebt sich vom rechten Rand ein, nützlich für Detailbereiche.',
          leftTitle: 'Linker Drawer',
          leftBody: 'Schiebt sich von links ein, nützlich für Navigationsmenüs.',
          topTitle: 'Oberer Drawer',
          topBody: 'Schiebt sich von oben herunter, nützlich für Benachrichtigungen.',
          bottomTitle: 'Unterer Drawer',
          bottomBody:
            'Schiebt sich von unten herauf, auf Mobilgeräten üblich für Aktionsblätter.',
        },
        dropdown: {
          fruitLabel: 'Obst',
          fruitPlaceholder: 'Obst auswählen…',
          hintFavourite: 'Wählen Sie Ihr Lieblingsobst',
          errorRequired: 'Dieses Feld ist erforderlich',
          selectPlaceholder: 'Auswählen…',
        },
        emptyState: {
          noItemsTitle: 'Noch keine Einträge',
          noItemsDescription: 'Legen Sie los, indem Sie Ihren ersten Eintrag erstellen.',
          createItem: 'Eintrag erstellen',
          noResultsTitle: 'Keine Ergebnisse gefunden',
          noResultsDescription:
            'Passen Sie Ihre Suche oder Ihren Filter an, um zu finden, wonach Sie suchen.',
          clearFilters: 'Filter löschen',
          nothingHereTitle: 'Hier gibt es nichts zu sehen',
        },
        fileUploader: {
          attachmentsLabel: 'Anhänge',
          imagesLabel: 'Bilder hochladen',
          imagesHint: 'PNG oder JPEG, bis zu je 2 MB, max. 4 Dateien',
          resumeLabel: 'Lebenslauf hochladen',
          customIconLabel: 'Dateien anhängen',
          withHintHint: 'Bis zu 10 MB pro Datei',
          withErrorText: 'Mindestens ein Bild ist erforderlich',
        },
        input: {
          defaultLabel: 'Standard',
          enterTextPlaceholder: 'Text eingeben…',
          hintGuidance: 'Hier steht ein hilfreicher Hinweis',
          errorRequired: 'Dieses Feld ist erforderlich',
          readonlyLabel: 'Schreibgeschützt',
          readonlyValue: 'Schreibgeschützter Wert',
          passwordLabel: 'Passwort',
          passwordPlaceholder: 'Geben Sie Ihr Passwort ein…',
          passwordNoToggleLabel: 'Passwort (Umschalter ausgeblendet)',
          passwordNoTogglePlaceholder: 'Kein Sichtbarkeits-Umschalter',
          emailLabel: 'E-Mail',
          emailPlaceholder: 'sie@beispiel.com',
        },
        menu: {
          openButton: 'Menü öffnen',
          edit: 'Bearbeiten',
          duplicate: 'Duplizieren',
          archive: 'Archivieren',
          delete: 'Löschen',
          file: 'Datei',
          moreOptionsLabel: 'Weitere Optionen',
          view: 'Ansicht',
          rename: 'Umbenennen',
          newItem: 'Neu',
          open: 'Öffnen',
          saveUnavailable: 'Speichern (nicht verfügbar)',
          saveAs: 'Speichern unter',
        },
        popover: {
          openLabel: 'Popover öffnen',
          basicContent:
            'Eine schwebende Oberfläche, die an ihrem Auslöser verankert ist. Verwenden Sie sie als Baustein für Menüs, Dropdowns und benutzerdefinierte Overlays.',
          placementTopLabel: 'oben',
          placementTopStartLabel: 'oben-Start',
          placementTopEndLabel: 'oben-Ende',
          placementBottomLabel: 'unten',
          placementBottomStartLabel: 'unten-Start',
          placementBottomEndLabel: 'unten-Ende',
          placementLeftLabel: 'links',
          placementRightLabel: 'rechts',
          placementTopContent: 'Zentriert über dem Auslöser',
          placementTopStartContent:
            'Über dem Auslöser, an dessen linkem Rand ausgerichtet',
          placementTopEndContent:
            'Über dem Auslöser, an dessen rechtem Rand ausgerichtet',
          placementBottomContent: 'Zentriert unter dem Auslöser',
          placementBottomStartContent:
            'Unter dem Auslöser, an dessen linkem Rand ausgerichtet',
          placementBottomEndContent:
            'Unter dem Auslöser, an dessen rechtem Rand ausgerichtet',
          placementLeftContent: 'Zentriert links vom Auslöser',
          placementRightContent: 'Zentriert rechts vom Auslöser',
        },
        progressBar: {
          processing: 'Wird verarbeitet…',
        },
        radio: {
          appleLabel: 'Apfel',
          bananaLabel: 'Banane',
          cherryLabel: 'Kirsche',
          optionALabel: 'Option A',
          optionBLabel: 'Option B',
          subscriptionPlanLabel: 'Abonnementplan',
          freeLabel: 'Kostenlos',
          proLabel: 'Pro',
          enterpriseLabel: 'Enterprise',
          deliverySpeedLabel: 'Liefergeschwindigkeit',
          deliverySpeedHint: 'Wählen Sie, wie schnell Sie es möchten',
          standardLabel: 'Standard',
          expressLabel: 'Express',
          accountTypeLabel: 'Kontotyp',
          accountTypeError: 'Bitte wählen Sie einen Kontotyp',
          personalLabel: 'Privat',
          businessLabel: 'Geschäftlich',
        },
        rating: {
          experienceLabel: 'Bewerten Sie Ihre Erfahrung',
          halfStepsLabel: 'Bewertung in halben Schritten',
          halfStepsHint:
            'Klicken Sie auf die linke oder rechte Hälfte eines Sterns, um 0,5-Schritte festzulegen.',
          readonlyLabel: 'Durchschnittliche Bewertung',
          withHintHint: 'Tippen Sie auf einen Stern, um die Bewertung festzulegen',
          withErrorText: 'Eine Bewertung ist erforderlich',
          numberOfStarsLabel: 'Bewerten',
          customIconLabel: 'Wie sehr lieben Sie es?',
        },
        segmented: {
          viewLabel: 'Ansicht',
          themeLabel: 'Theme',
          themeHint: 'Betrifft die gesamte App',
          layoutLabel: 'Layout',
          layoutError: 'Eine Layout-Auswahl ist erforderlich',
          viewOptionList: 'Liste',
          viewOptionGrid: 'Raster',
          viewOptionKanban: 'Kanban',
          themeOptionLight: 'Hell',
          themeOptionDark: 'Dunkel',
        },
        slider: {
          volumeLabel: 'Lautstärke',
          brightnessLabel: 'Helligkeit',
          withHintLabel: 'Mit Hinweis',
          sliderHint:
            'Ziehen Sie den Regler oder verwenden Sie die Pfeiltasten zum Anpassen',
          withErrorLabel: 'Mit Fehler',
          sliderError: 'Bitte wählen Sie einen Wert über 50',
        },
        switch: {
          enableNotificationsLabel: 'Benachrichtigungen aktivieren',
          disabledOnLabel: 'Deaktiviert an',
          confirmConsentLabel: 'Einwilligung bestätigen',
          marketingEmailsLabel: 'Marketing-E-Mails',
          marketingEmailsHint: 'Jederzeit abbestellbar',
          twoFactorAuthLabel: 'Zwei-Faktor-Authentifizierung',
          twoFactorAuthError: 'Die Zwei-Faktor-Authentifizierung muss aktiviert sein',
        },
        tabs: {
          account: 'Konto',
          accountContent: 'Inhalt der Kontoeinstellungen',
          security: 'Sicherheit',
          securityContent: 'Inhalt der Sicherheitseinstellungen',
          notifications: 'Benachrichtigungen',
          notificationsContent: 'Benachrichtigungseinstellungen',
          overview: 'Überblick',
          overviewContent: 'Überblicksinhalt',
          analytics: 'Analytics',
          analyticsContent: 'Analytics-Inhalt',
          reports: 'Berichte',
          reportsContent: 'Berichtsinhalt',
          general: 'Allgemein',
          generalContent: 'Allgemeine Einstellungen',
          billing: 'Abrechnung',
          billingContent: 'Abrechnungsdetails',
          admin: 'Admin',
          adminContent: 'Admin-Bereich',
        },
        tag: {
          disabledSuccess: 'Deaktivierter Erfolg',
        },
        textarea: {
          messageLabel: 'Nachricht',
          messagePlaceholder: 'Geben Sie Ihre Nachricht ein…',
          hintMaxCharacters: 'Maximal 500 Zeichen',
          errorRequired: 'Dieses Feld ist erforderlich',
          fixedSizeLabel: 'Feste Größe',
          fixedSizePlaceholder: 'Kann nicht in der Größe geändert werden',
          readonlyLabel: 'Schreibgeschützt',
          readonlyValue: 'Schreibgeschützter Inhalt',
        },
        toast: {
          message: variant => {
            const article = variant === 'error' || variant === 'info' ? 'eine' : 'ein';
            return `Dies ist ${article} ${variant} Toast`;
          },
        },
        tooltip: {
          triggerLabel: '(fahr mit der Maus über mich)',
          topLabel: 'Oben',
          topTooltip: 'Tooltip oben',
          bottomLabel: 'Unten',
          bottomTooltip: 'Tooltip unten',
          leftLabel: 'Links',
          leftTooltip: 'Tooltip links',
          rightLabel: 'Rechts',
          rightTooltip: 'Tooltip rechts',
        },
        transferList: {
          sourceLabel: 'Verfügbar',
          targetLabel: 'Ausgewählt',
          roleAdmin: 'Admin',
          roleEditor: 'Redakteur',
          roleViewer: 'Betrachter',
          roleGuest: 'Gast',
          roleBilling: 'Abrechnung',
          roleOwner: 'Inhaber',
        },
        virtualList: {
          row: 'Zeile',
          detail: n => `Generierter Datensatz #${n}`,
          scrollPosition: (first, total) =>
            `Zeile ${first.toLocaleString('de-DE')} von ${total.toLocaleString('de-DE')} wird angezeigt`,
        },
        commandPalette: {
          hint: 'Drücken Sie Strg + K (oder Cmd + K), um die Befehlspalette überall auf dieser Seite zu öffnen.',
          openButton: 'Befehlspalette öffnen',
          fileGroup: 'Datei',
          editGroup: 'Bearbeiten',
          newFile: 'Neue Datei',
          openFile: 'Datei öffnen',
          save: 'Speichern',
          find: 'Suchen',
          findKeyword: 'suchen',
          replace: 'Ersetzen',
          undo: 'Rückgängig',
          toggleTheme: 'Theme umschalten',
          toggleThemeDescription: 'Zwischen Hell- und Dunkelmodus wechseln',
          lockWorkspace: 'Arbeitsbereich sperren',
          lockWorkspaceDescription: 'Derzeit deaktiviert — Funktion in der Beta',
          executedToast: label => `Ausgeführt: ${label}`,
        },
        avatarEditorActions: {
          avatarUpdatedToast: 'Avatar aktualisiert',
        },
      },
      playground: {
        controls: 'Steuerungen',
        reset: 'Zurücksetzen',
        code: 'Code',
        apiReference: 'API-Referenz',
        inputs: 'Inputs',
        outputs: 'Outputs',
        methods: 'Methoden',
        colName: 'Name',
        colType: 'Typ',
        colDefault: 'Standard',
        colDescription: 'Beschreibung',
        errorMessagesDescription:
          'Überschreibt die Validierungsmeldung je Fehlerschlüssel für ein gebundenes Formularsteuerelement; nicht gesetzte Schlüssel verwenden die lokalisierte Standardmeldung.',
        triggerErrorLabel: 'Fehler auslösen',
        requiredBadge: 'erforderlich',
        twoWayBadge: 'bidirektional',
        rangeHint: { between: 'bis', min: 'Min', max: 'Max' },
        knobLabels: {
          tooltip: {
            eaTooltip: 'Tooltip-Inhalt',
          },
          input: {
            label: 'Label',
            placeholder: 'Platzhalter',
            size: 'Größe',
            type: 'Typ',
            disabled: 'Deaktiviert',
            readonly: 'Schreibgeschützt',
            required: 'Erforderlich',
            autofocus: 'Autofokus',
            showPasswordToggle: 'Passwort-Umschalter anzeigen',
            clearable: 'Löschbar',
            autocomplete: 'Autovervollständigung',
          },
          alert: {
            variant: 'Variante',
            dismissible: 'Schließbar',
            size: 'Größe',
            icon: 'Symbol (Überschreibung)',
          },
          avatar: {
            size: 'Größe',
            shape: 'Form',
            src: 'Bildquelle',
            initials: 'Initialen',
            alt: 'Alternativtext',
          },
          badge: {
            variant: 'Variante',
            size: 'Größe',
            shape: 'Form',
          },
          button: {
            variant: 'Variante',
            size: 'Größe',
            type: 'Typ',
            disabled: 'Deaktiviert',
            loading: 'Ladezustand',
            fullWidth: 'Volle Breite',
          },
          card: {
            variant: 'Variante',
            padding: 'Innenabstand',
            headerAlign: 'Ausrichtung der Kopfzeile',
            fullWidth: 'Volle Breite',
            headerDivider: 'Trennlinie der Kopfzeile',
          },
          checkbox: {
            label: 'Label',
            count: 'Anzahl',
            size: 'Größe',
            disabled: 'Deaktiviert',
            required: 'Erforderlich',
            indeterminate: 'Unbestimmt',
          },
          'code-input': {
            size: 'Größe',
            length: 'Länge',
            label: 'Label',
            placeholder: 'Platzhalter',
            disabled: 'Deaktiviert',
            readonly: 'Schreibgeschützt',
            required: 'Erforderlich',
          },
          'color-picker': {
            label: 'Label',
            placeholder: 'Platzhalter',
            size: 'Größe',
            format: 'Format',
            showAlpha: 'Transparenz anzeigen',
            disabled: 'Deaktiviert',
            readonly: 'Schreibgeschützt',
            required: 'Erforderlich',
          },
          divider: {
            orientation: 'Ausrichtung',
            label: 'Label',
          },
          'eagami-wordmark': {
            variant: 'Variante',
            layout: 'Layout',
            size: 'Größe (px)',
          },
          'empty-state': {
            size: 'Größe',
            headingLevel: 'Überschriftsebene',
            title: 'Titel',
            description: 'Beschreibung',
          },
          paginator: {
            align: 'Ausrichtung',
            showPageSizeSelector: 'Seitengrößen-Auswahl anzeigen',
            showRangeLabel: 'Bereichs-Label anzeigen',
            disabled: 'Deaktiviert',
            totalItems: 'Gesamtzahl der Einträge',
          },
          'progress-bar': {
            variant: 'Variante',
            size: 'Größe',
            value: 'Wert',
            max: 'Max',
            showPercentage: 'Prozentsatz anzeigen',
            indeterminate: 'Unbestimmt',
            label: 'Label',
          },
          radio: {
            label: 'Label',
            disabled: 'Deaktiviert',
          },
          'range-slider': {
            label: 'Label',
            hint: 'Hinweis',
            errorMsg: 'Fehlermeldung',
            min: 'Minimum',
            max: 'Maximum',
            step: 'Schritt',
            size: 'Größe',
            showValue: 'Wert anzeigen',
            showMinMaxLabels: 'Min/Max-Labels anzeigen',
            disabled: 'Deaktiviert',
            required: 'Erforderlich',
          },
          rating: {
            label: 'Label',
            size: 'Größe',
            min: 'Minimum',
            max: 'Maximum',
            allowHalf: 'Halbe Schritte erlauben',
            readonly: 'Schreibgeschützt',
            disabled: 'Deaktiviert',
            required: 'Erforderlich',
            clearable: 'Löschbar',
            iconClass: 'Symbol',
          },
          skeleton: {
            variant: 'Variante',
            animated: 'Animiert',
            width: 'Breite',
            height: 'Höhe',
          },
          slider: {
            size: 'Größe',
            min: 'Min',
            max: 'Max',
            step: 'Schritt',
            showValue: 'Wert anzeigen',
            showMinMaxLabels: 'Min/Max-Labels anzeigen',
            disabled: 'Deaktiviert',
            required: 'Erforderlich',
            hasError: 'Fehlerzustand',
            label: 'Label',
          },
          spinner: {
            size: 'Größe',
            label: 'Label',
          },
          switch: {
            label: 'Label',
            size: 'Größe',
            disabled: 'Deaktiviert',
            required: 'Erforderlich',
          },
          tag: {
            variant: 'Variante',
            size: 'Größe',
            removable: 'Entfernbar',
            disabled: 'Deaktiviert',
            removeLabel: 'Entfernen-Label',
          },
          textarea: {
            label: 'Label',
            placeholder: 'Platzhalter',
            size: 'Größe',
            resize: 'Größenänderung',
            maxlength: 'Maximallänge (Zeichen)',
            minHeight: 'Mindesthöhe (px)',
            maxHeight: 'Maximalhöhe (px)',
            disabled: 'Deaktiviert',
            readonly: 'Schreibgeschützt',
            required: 'Erforderlich',
          },
        },
        descriptions: {
          toast: {
            position:
              'Ecke oder Rand des Viewports, an dem der Toast-Stapel verankert ist.',
            clearable: 'Zeigt auf jedem Toast einen Schließen-Button.',
          },
          input: {
            label: 'Textlabel, das über dem Feld gerendert wird.',
            type: 'Nativer Input-Typ (password fügt einen integrierten Anzeigen/Verbergen-Umschalter hinzu).',
            placeholder: 'Platzhalter, der angezeigt wird, solange das Feld leer ist.',
            size: 'Visuelle Größe des Feldes.',
            hint: 'Hilfetext unter dem Feld, ausgeblendet, solange ein Fehler angezeigt wird.',
            errorMsg:
              'Fehlermeldung unter dem Feld, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            disabled: 'Deaktiviert das Feld.',
            readonly: 'Rendert das Feld schreibgeschützt.',
            required: 'Kennzeichnet das Feld als erforderlich.',
            autocomplete: 'Wert für das native autocomplete-Attribut.',
            list: 'id einer <datalist>, die für native Vorschläge zugeordnet wird.',
            autofocus:
              'Fokussiert das Feld einmalig, nachdem es zum ersten Mal gerendert wurde.',
            showPasswordToggle: 'Zeigt den Anzeige-Umschalter für Passwort-Eingaben.',
            clearable: 'Zeigt einen Löschen-Button, solange das Feld einen Wert hat.',
            id: 'id, die auf das native Input und das Label for angewendet wird, automatisch generiert, wenn weggelassen.',
            value: 'Aktueller Feldwert, bidirektional bindbar über [(value)].',
            blurred: 'Wird ausgelöst, wenn das Feld den Fokus verliert.',
            focused: 'Wird ausgelöst, wenn das Feld den Fokus erhält.',
            clear: 'Löscht den aktuellen Wert und stellt den Fokus auf das Feld zurück.',
            focus: 'Verschiebt den Tastaturfokus auf das zugrunde liegende native Feld.',
            togglePasswordVisibility:
              'Schaltet den Passwort-Anzeigezustand für type="password"-Eingaben um.',
            icon: 'Vorangestellte Symbolkomponente, die vor dem Text gerendert wird.',
            max: 'Maximalwert für type="number"; der Wert wird beim Verlassen darauf begrenzt.',
            maxLength:
              'Maximale Zeichenanzahl; erzwungen für type="number", bei dem das native maxlength ignoriert wird.',
            min: 'Mindestwert für type="number"; der Wert wird beim Verlassen darauf begrenzt.',
            minLength: 'Mindestzeichenanzahl, übergeben als natives minlength-Attribut.',
            step: 'Schrittweite für type="number"-Eingaben.',
            clampToBounds:
              'Begrenzt einen Zahlenwert in den konfigurierten Min/Max-Bereich, sobald die Bearbeitung abgeschlossen ist.',
          },
          accordion: {
            multi: 'Erlaubt, dass mehrere Einträge gleichzeitig aufgeklappt bleiben.',
          },
          alert: {
            dismissible:
              'Zeigt einen Schließen-Button, mit dem der Nutzer die Meldung schließen kann.',
            variant:
              'Semantisches Farbschema, das Symbol und Palette der Meldung steuert.',
            visible:
              'Ob die Meldung angezeigt wird, bidirektional bindbar über [(visible)].',
            dismissed:
              'Wird ausgelöst, wenn der Nutzer die Meldung über ihren Schließen-Button schließt.',
            dismiss: 'Blendet die Meldung aus und gibt das dismissed-Ereignis aus.',
            size: 'Skaliert Text, Symbol und Abstand gemeinsam.',
            icon: 'Überschreibt das standardmäßige Statussymbol der Variante mit einer beliebigen Symbolkomponente.',
          },
          avatar: {
            src: 'Anzuzeigende Bild-URL; greift auf Initialen, dann auf ein generisches Benutzersymbol zurück.',
            alt: 'Alternativtext für das Avatar-Bild.',
            initials:
              'Initialen, die angezeigt werden, wenn keine Bildquelle angegeben ist.',
            size: 'Durchmesser-Voreinstellung für den Avatar.',
            shape: 'Kontur des Avatars: rund oder abgerundetes Quadrat.',
          },
          badge: {
            variant: 'Semantisches Farbschema des Badges.',
            size: 'Visuelle Größe des Badges.',
            shape:
              'Äußere Form des Badges (Pill umschließt den Inhalt, Pin wird bei einzelnen Zeichen als Kreis gerendert).',
          },
          button: {
            variant: 'Visueller Stil des Buttons, der seine Farbe und Betonung bestimmt.',
            size: 'Visuelle Größe des Buttons.',
            type: 'Natives type-Attribut, das auf das zugrunde liegende Button-Element angewendet wird.',
            disabled: 'Deaktiviert den Button und unterdrückt Klick-Ereignisse.',
            loading:
              'Tauscht das Label gegen einen Spinner aus und behält dabei die gerenderte Breite bei.',
            fullWidth: 'Streckt den Button, um die Breite seines Containers zu füllen.',
            ariaLabel:
              'Barrierefreies Label für den Button, wenn sein Inhalt nicht aussagekräftig genug ist.',
            ariaCurrent:
              'Wert für das native aria-current-Attribut, das den Button als aktuelles Element in einer Gruppe kennzeichnet.',
            clicked:
              'Wird ausgelöst, wenn der Button aktiviert wird, unterdrückt im deaktivierten oder Ladezustand.',
            icon: 'Optionale Symbolkomponente, die links vom Label gerendert wird.',
          },
          card: {
            variant: 'Visueller Stil der Kartenoberfläche.',
            padding: 'Innenabstand-Voreinstellung für den Inhaltsbereich der Karte.',
            headerAlign: 'Horizontale Ausrichtung des Kopfzeileninhalts.',
            fullWidth: 'Streckt die Karte, um die verfügbare Breite zu füllen.',
            headerDivider: 'Zeigt eine Trennlinie zwischen Kopfzeile und Hauptteil.',
          },
          checkbox: {
            ariaLabel:
              'Barrierefreier Name für die Checkbox, wenn kein sichtbares Label gerendert wird.',
            checked: 'Aktueller Ankreuzzustand, bidirektional bindbar über [(checked)].',
            count: 'Zusatzwert, der gedimmt direkt nach dem Label angezeigt wird.',
            disabled: 'Deaktiviert die Checkbox.',
            errorMsg:
              'Fehlermeldung unter dem Feld, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            hint: 'Hilfetext unter dem Feld, ausgeblendet, solange ein Fehler angezeigt wird.',
            id: 'id, die auf das native Input und das Label for angewendet wird, automatisch generiert, wenn weggelassen.',
            indeterminate: 'Rendert die Checkbox in einem visuell unbestimmten Zustand.',
            label: 'Textlabel, das neben der Checkbox gerendert wird.',
            required: 'Kennzeichnet die Checkbox als erforderlich.',
            size: 'Visuelle Größe der Checkbox.',
            changed:
              'Wird mit dem neuen Ankreuzzustand ausgelöst, wann immer der Nutzer die Checkbox umschaltet.',
          },
          'code-input': {
            disabled: 'Deaktiviert jede Ziffernzelle.',
            errorMsg:
              'Fehlermeldung unter dem Feld, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            hint: 'Hilfetext unter dem Feld, ausgeblendet, solange ein Fehler angezeigt wird.',
            id: 'id, die auf die Ziffernzellen und das Label for angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das über dem Feld gerendert wird.',
            length: 'Anzahl der Ziffernzellen, aus denen der Code besteht.',
            placeholder: 'Platzhaltertext, ein Zeichen pro Zelle verteilt.',
            readonly: 'Rendert das Feld schreibgeschützt.',
            required: 'Kennzeichnet das Feld als erforderlich.',
            size: 'Visuelle Größe jeder Ziffernzelle.',
            value: 'Aktueller Codewert, bidirektional bindbar über [(value)].',
            completed:
              'Wird mit dem vollständigen Code ausgelöst, sobald jede Ziffer eingegeben wurde.',
            focus:
              'Verschiebt den Tastaturfokus auf die nächste leere Ziffer (oder die letzte, wenn voll).',
            allowAllChars:
              'Erlaubt jedes Zeichen ohne Leerzeichen; ist es aus, werden nur Ziffern akzeptiert.',
          },
          'color-picker': {
            disabled: 'Deaktiviert das Feld.',
            errorMsg:
              'Fehlermeldung unter dem Feld, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            format: 'Ausgabeformat des emittierten Farbwerts (hex, rgb oder hsl).',
            hint: 'Hilfetext unter dem Feld, ausgeblendet, solange ein Fehler angezeigt wird.',
            id: 'id, die auf den Auslöser und das Label for angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das über dem Feld gerendert wird.',
            placeholder:
              'Platzhalter, der auf dem Auslöser angezeigt wird, solange keine Farbe ausgewählt ist.',
            presets:
              'Voreingestellte Farbfelder am unteren Rand des Popovers; übergeben Sie ein leeres Array, um sie auszublenden.',
            readonly:
              'Rendert das Feld schreibgeschützt und verhindert, dass sich das Popover öffnet.',
            required: 'Kennzeichnet das Feld als erforderlich.',
            showAlpha:
              'Zeigt den Transparenz-Schieberegler und bezieht die Transparenz in den emittierten Wert ein.',
            size: 'Visuelle Größe des Picker-Auslösers.',
            value: 'Aktuelle Farb-Zeichenkette, bidirektional bindbar über [(value)].',
            changed:
              'Wird mit der neuen Farb-Zeichenkette ausgelöst, wann immer sich die Auswahl ändert.',
            cycleInputMode:
              'Wechselt die Eingabezeile des Popovers zwischen Hex-Zeichenkette und RGB-Kanälen.',
            hasEyeDropper: 'Gibt zurück, ob der Browser die EyeDropper-API unterstützt.',
            onHexInput:
              'Wendet den eingegebenen Hex-Text auf die aktuelle Farbe an, während der Nutzer ihn bearbeitet.',
            onPopoverCloseRequested:
              'Schließt das Popover, wenn der Nutzer außerhalb des Pickers klickt.',
          },
          divider: {
            label:
              'Optionales zentriertes Label, das innerhalb der Trennlinie gerendert wird.',
            orientation: 'Ausrichtung, in der die Trennlinie verläuft.',
            thick: 'Rendert eine kräftigere Linie.',
          },
          'eagami-wordmark': {
            variant:
              'Inhaltsvariante: default ist das reine Wortmark, byline fügt die Handgefertigt-von-Zeile hinzu, tagline fügt den Slogan hinzu.',
            layout:
              'Ordnet das Wortmark über mehrere Zeilen gestapelt oder inline in einer einzelnen Zeile an.',
            size: 'Pixelwert, von dem das gesamte Wortmark skaliert.',
          },
          'empty-state': {
            title: 'Überschriftstext, der über der Beschreibung angezeigt wird.',
            description: 'Begleittext, der unter dem Titel angezeigt wird.',
            size: 'Visuelle Größe des Leerzustands-Blocks.',
            headingLevel:
              'Überschriftsebene, die für den Titel verwendet wird, damit er in die umgebende Dokumentgliederung passt.',
            bordered: 'Rendert einen gestrichelten Rahmen um den Block.',
            icon: 'Optionale Symbolkomponente, die im Medienbereich über dem Titel gerendert wird.',
          },
          paginator: {
            groupThousands:
              'Gruppiert Tausender mit Kommas im Bereich und den Seitenzahlen.',
            size: 'Visuelle Größe des Paginators und seiner Steuerungen.',
            align:
              'Horizontale Ausrichtung der Paginator-Steuerungen innerhalb ihres Containers.',
            disabled: 'Deaktiviert alle Paginator-Steuerungen.',
            page: 'Aktuelle Seitenzahl, bidirektional bindbar über [(page)].',
            pageSize:
              'Anzahl der pro Seite angezeigten Einträge, bidirektional bindbar über [(pageSize)].',
            pageSizeOptions:
              'Auswählbare Seitengrößen, die in der Seitengrößen-Auswahl angeboten werden.',
            showPageSizeSelector: 'Zeigt die Steuerung zur Seitengrößen-Auswahl.',
            showRangeLabel:
              'Zeigt das Label, das den sichtbaren Eintragsbereich beschreibt.',
            totalItems:
              'Gesamtzahl der Einträge, die zur Berechnung der Seitenanzahl verwendet wird.',
            changed:
              'Wird ausgelöst, wenn der Nutzer entweder die aktuelle Seite oder die Seitengröße ändert.',
            goToPage:
              'Navigiert zur angegebenen Seite, begrenzt auf den gültigen Bereich.',
            nextPage: 'Navigiert zur nächsten Seite, sofern eine existiert.',
            prevPage: 'Navigiert zur vorherigen Seite, sofern eine existiert.',
          },
          'progress-bar': {
            variant: 'Farbvariante des Balkens.',
            size: 'Visuelle Dicke des Balkens.',
            value: 'Aktueller Fortschrittswert.',
            max: 'Wert, bei dem der Balken voll ist.',
            showPercentage: 'Zeigt den aktuellen Prozentsatz neben dem Balken.',
            indeterminate:
              'Rendert eine endlose Animation für Fortschritt unbekannter Dauer.',
            label: 'Textlabel, das über dem Balken gerendert wird.',
          },
          radio: {
            disabled: 'Deaktiviert diese Option.',
            id: 'id, die auf das native Radio-Input und das Label for angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das neben dem Radio-Button gerendert wird.',
            value:
              'Wert, den diese Option bei Auswahl zu ihrer übergeordneten Gruppe beiträgt.',
          },
          'range-slider': {
            ariaLabelHigh:
              'Barrierefreies Label für den hohen (End-)Regler, das auf das Feldlabel zurückgreift, wenn weggelassen.',
            ariaLabelLow:
              'Barrierefreies Label für den niedrigen (Start-)Regler, das auf das Feldlabel zurückgreift, wenn weggelassen.',
            disabled: 'Deaktiviert den Schieberegler.',
            errorMsg:
              'Fehlermeldung unter dem Schieberegler, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            formatValue:
              'Formatierer, der auf jeden Wert angewendet wird, bevor er angezeigt wird.',
            hint: 'Hilfetext unter dem Schieberegler, ausgeblendet, solange ein Fehler angezeigt wird.',
            id: 'id, die auf den Schieberegler angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das über dem Schieberegler gerendert wird.',
            max: 'Höchster Wert, den jeder Regler erreichen kann.',
            min: 'Niedrigster Wert, den jeder Regler erreichen kann.',
            required: 'Kennzeichnet das Feld als erforderlich.',
            showMinMaxLabels: 'Zeigt die Min- und Max-Grenzen an den Enden der Leiste.',
            showValue:
              'Zeigt den aktuellen niedrigen und hohen Wert neben dem Schieberegler.',
            size: 'Visuelle Größe der Leiste und der Regler.',
            step: 'Schrittweite, an die jeder Regler beim Bewegen einrastet.',
            value:
              'Aktuelles [low, high]-Bereichstupel, bidirektional bindbar über [(value)].',
            changed:
              'Wird mit dem neuen [low, high]-Tupel ausgelöst, wann immer sich ein Regler bewegt.',
            commitThumb:
              'Rastet einen Regler an der nächsten Schrittweite ein, begrenzt ihn auf die Grenzen und beschränkt ihn durch den gegenüberliegenden Regler.',
            groupThousands:
              'Gruppiert angezeigte Werte mit Tausendertrennzeichen, ignoriert, wenn ein benutzerdefiniertes formatValue bereitgestellt wird.',
            formatDisplay:
              'Formatiert einen Wert für die Anzeige und wendet Tausendergruppierung an, sofern keine benutzerdefinierte formatValue-Funktion gesetzt ist.',
          },
          rating: {
            allowHalf:
              'Erlaubt Halbstern-Granularität, sodass sich der Wert in 0,5-Schritten bewegt.',
            clearable:
              'Ein Klick auf den aktuellen Wert setzt die Bewertung auf 0 zurück.',
            disabled: 'Deaktiviert die Bewertung.',
            errorMsg:
              'Fehlermeldung unter der Bewertung, die den Hinweis ersetzt und sie als ungültig kennzeichnet.',
            halfIconClass:
              'Eigenständige Komponentenklasse, die bei aktiviertem allowHalf für halbe Positionen gerendert wird.',
            hint: 'Hilfetext unter der Bewertung, ausgeblendet, solange ein Fehler angezeigt wird.',
            iconClass:
              'Eigenständige Komponentenklasse, die für leere und volle Positionen gerendert wird.',
            id: 'id, die auf die Bewertung und ihr Label angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das über der Bewertung gerendert wird.',
            max: 'Höchster Bewertungswert und Anzahl der gerenderten Sterne.',
            min: 'Niedrigster Bewertungswert, den der Nutzer auswählen kann.',
            readonly:
              'Rendert die Bewertung als reine Anzeige und ignoriert Klicks und Tastatureingaben.',
            required: 'Kennzeichnet die Bewertung als erforderlich.',
            size: 'Visuelle Größe der Bewertung.',
            value: 'Aktueller Bewertungswert, bidirektional bindbar über [(value)].',
            hoverChanged:
              'Wird mit dem Vorschauwert beim Überfahren ausgelöst und mit null, wenn der Cursor das Element verlässt.',
            iconForState:
              'Gibt die Komponentenklasse zurück, die für einen bestimmten Sternzustand zu instanziieren ist.',
            stateFor:
              'Ermittelt den Render-Zustand (leer, halb oder voll) für eine Sternposition.',
          },
          skeleton: {
            animated:
              'Spielt die pulsierende Schimmer-Animation ab, automatisch unterdrückt, wenn der Nutzer reduzierte Bewegung bevorzugt.',
            height:
              'Explizite CSS-Höhe, die auf den Platzhalter angewendet wird, mit der intrinsischen Größe der Form als Standard, wenn weggelassen.',
            variant:
              'Form-Voreinstellung des Platzhalters: Textzeile, Kreis oder Rechteck.',
            width:
              'Explizite CSS-Breite, die auf den Platzhalter angewendet wird, mit der intrinsischen Größe der Form als Standard, wenn weggelassen.',
          },
          slider: {
            ariaLabel:
              'Barrierefreies Label, das angewendet wird, wenn kein sichtbares Label gerendert wird.',
            disabled: 'Deaktiviert den Schieberegler.',
            errorMsg:
              'Fehlermeldung unter dem Schieberegler, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            formatValue:
              'Formatierer, der den numerischen Wert in den angezeigten Text umwandelt.',
            hasError:
              'Erzwingt die Fehlerzustand-Stilisierung, ohne eine Fehlermeldung zu binden.',
            hint: 'Hilfetext unter dem Schieberegler, ausgeblendet, solange ein Fehler angezeigt wird.',
            id: 'id, die auf den Schieberegler und sein Label angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das über dem Schieberegler gerendert wird.',
            max: 'Höchster Wert, den der Schieberegler erreichen kann.',
            min: 'Niedrigster Wert, den der Schieberegler erreichen kann.',
            required: 'Kennzeichnet den Schieberegler als erforderlich.',
            showMinMaxLabels: 'Zeigt die Min- und Max-Grenzen unter der Leiste.',
            showValue: 'Zeigt den aktuellen Wert neben dem Label.',
            size: 'Visuelle Größe der Schieberegler-Leiste und des Reglers.',
            step: 'Schrittweite, an die der Wert einrastet, während sich der Schieberegler bewegt.',
            value: 'Aktueller Schieberegler-Wert, bidirektional bindbar über [(value)].',
            changed:
              'Wird mit dem neuen eingerasteten Wert ausgelöst, wann immer sich der Schieberegler bewegt.',
            groupThousands:
              'Gruppiert angezeigte Werte mit Tausendertrennzeichen, ignoriert, wenn ein benutzerdefiniertes formatValue bereitgestellt wird.',
            formatDisplay:
              'Formatiert einen Wert für die Anzeige und wendet Tausendergruppierung an, sofern keine benutzerdefinierte formatValue-Funktion gesetzt ist.',
          },
          spinner: {
            label:
              'Barrierefreies Label, das an assistive Technologien angekündigt wird, mit der Übersetzung des aktiven Sprachraums als Standard, wenn nicht gesetzt.',
            size: 'Visuelle Größe des Spinners.',
          },
          switch: {
            ariaLabel:
              'Barrierefreies Label für den Schalter, wenn kein sichtbares Label gerendert wird.',
            checked: 'Aktueller An/Aus-Zustand, bidirektional bindbar über [(checked)].',
            disabled: 'Deaktiviert den Schalter und blockiert das Umschalten.',
            errorMsg:
              'Fehlermeldung unter dem Schalter, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            hint: 'Hilfetext unter dem Schalter, ausgeblendet, solange ein Fehler angezeigt wird.',
            id: 'id, die auf die zugrunde liegende Checkbox und das Label for angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das neben dem Schalter gerendert wird.',
            required: 'Kennzeichnet den Schalter als erforderlich.',
            size: 'Visuelle Größe des Schalters.',
            changed:
              'Wird mit dem neuen Ankreuzzustand ausgelöst, wann immer der Nutzer den Schalter umschaltet.',
          },
          tag: {
            variant: 'Semantisches Farbschema des Tags.',
            size: 'Visuelle Größe des Tags.',
            removable:
              'Rendert einen Entfernen-Button, der bei Aktivierung removed ausgibt.',
            disabled: 'Deaktiviert das Tag und seinen Entfernen-Button.',
            removeLabel:
              'Barrierefreies Label für den Entfernen-Button, das auf den aktiven Sprachraum zurückgreift.',
            removed:
              'Wird ausgelöst, wenn der Nutzer den Entfernen-Button eines entfernbaren Tags aktiviert.',
          },
          textarea: {
            disabled: 'Deaktiviert das Feld.',
            errorMsg:
              'Fehlermeldung unter dem Feld, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            hint: 'Hilfetext unter dem Feld, ausgeblendet, solange ein Fehler angezeigt wird.',
            id: 'id, die auf das native Textarea und das Label for angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das über dem Feld gerendert wird.',
            maxHeight:
              'Pixelobergrenze für die Höhe des Feldes; darüber hinaus scrollt das Textarea vertikal, statt zu wachsen.',
            minHeight: 'Mindesthöhe in px; nie weniger als die Standardhöhe.',
            maxlength: 'Maximale Zeichenanzahl, die das Feld akzeptiert.',
            placeholder: 'Platzhalter, der angezeigt wird, solange das Feld leer ist.',
            readonly: 'Rendert das Feld schreibgeschützt.',
            required: 'Kennzeichnet das Feld als erforderlich.',
            resize: 'Achse, entlang derer der Nutzer die Größe des Feldes ändern darf.',
            size: 'Visuelle Größe des Feldes.',
            value: 'Aktueller Feldwert, bidirektional bindbar über [(value)].',
            blurred: 'Wird ausgelöst, wenn das Feld den Fokus verliert.',
            focused: 'Wird ausgelöst, wenn das Feld den Fokus erhält.',
            focus:
              'Verschiebt den Tastaturfokus auf das zugrunde liegende native Textarea.',
          },
          'avatar-editor': {
            accept:
              'Akzeptierte MIME-Typen für die Dateiauswahl, an das native Input weitergeleitet.',
            canvasSize: 'Pixelbreite und -höhe des quadratischen Zuschnitt-Canvas.',
            cropState:
              'Anfänglicher Pan/Zoom-Zustand, der wiederhergestellt wird, wenn ein Quellbild geladen wird.',
            currentSrc:
              'URL des Bildes, das bei der Initialisierung in den Editor geladen wird.',
            exportQuality:
              'JPEG/WebP-Qualität, die beim Exportieren des zugeschnittenen Bildes verwendet wird, zwischen 0 und 1.',
            exportType:
              'MIME-Typ des exportierten Bild-Blobs (z.B. image/png oder image/jpeg).',
            loading:
              'Zeigt ein Skeleton-Overlay, während eine externe Ressource geladen wird.',
            maxFileSize:
              'Maximal zulässige Dateigröße in Bytes; Dateien über diesem Limit geben errored aus.',
            maxZoom: 'Maximaler Zoom-Multiplikator, den der Nutzer erreichen kann.',
            minZoom: 'Minimaler Zoom-Multiplikator, den der Nutzer erreichen kann.',
            shape:
              'Zuschnittmaskenform, die auf das Canvas und das exportierte Bild angewendet wird.',
            cropped:
              'Wird ausgelöst, wenn der Nutzer einen Zuschnitt exportiert, und liefert sowohl ein Blob als auch eine Daten-URL.',
            cropStateChanged:
              'Wird ausgelöst, wann immer der Nutzer das Bild verschiebt oder zoomt, nützlich zum Persistieren des Bearbeitungszustands.',
            errored:
              'Wird mit einer menschenlesbaren Meldung ausgelöst, wenn die Dateivalidierung fehlschlägt.',
            fileSelected:
              'Wird ausgelöst, wenn eine Datei von der Festplatte gewählt oder auf den Editor abgelegt wird.',
            removed:
              'Wird ausgelöst, wenn das aktuelle Bild über die Entfernen-Steuerung gelöscht wird.',
            captureOriginal:
              'Markiert das aktuelle Bild und den Zuschnittzustand als Ausgangspunkt für revertImage.',
            exportCrop:
              'Rendert den aktuellen Zuschnitt auf ein Offscreen-Canvas, gibt cropped aus und löst mit dem Blob auf.',
            openFilePicker: 'Öffnet den nativen Dateiauswahl-Dialog.',
            removeImage:
              'Löscht das geladene Bild und setzt Pan und Zoom auf die Standardwerte zurück.',
            revertImage:
              'Stellt das Bild und den Zuschnittzustand wieder her, die beim letzten captureOriginal-Aufruf erfasst wurden.',
            setZoom:
              'Setzt die Zoomstufe, begrenzt auf den konfigurierten minZoom- und maxZoom-Bereich.',
            updateImageDarkness:
              'Tastet den sichtbaren Zuschnittbereich ab, um zu bestimmen, ob das Bild dunkler als Mittelgrau ist.',
          },
          'menu-trigger': {
            menu: 'Die ea-menu-Instanz, die dieser Auslöser steuert.',
          },
          tooltip: {
            maxWidth:
              'Maximalbreite in Pixeln; der Text bricht bei dieser Breite um (Untergrenze 50px).',
            eaTooltip:
              'Textinhalt des Tooltips, der bei Hover und Tastaturfokus angezeigt wird.',
            tooltipPosition: 'Platzierung des Tooltips relativ zu seinem Host-Element.',
          },
          'time-picker': {
            disabled: 'Deaktiviert die Auswahl.',
            errorMsg:
              'Fehlermeldung unter dem Feld, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            format:
              'Anzeigeformat des Auslöser-Labels; der Datenwert ist immer im 24-Stunden-Format.',
            hint: 'Hilfetext unter dem Feld, ausgeblendet, solange ein Fehler angezeigt wird.',
            id: 'id, die auf den Auslöser und das Label for angewendet wird, automatisch generiert, wenn weggelassen.',
            includeSeconds: 'Zeigt eine Sekundenspalte neben Stunden und Minuten.',
            label: 'Textlabel, das über dem Feld gerendert wird.',
            minuteStep:
              'Schrittweite, an die die Minutenspalte beim Stufen oder Ziehen einrastet.',
            placeholder:
              'Platzhalter, der auf dem Auslöser angezeigt wird, solange keine Uhrzeit ausgewählt ist.',
            readonly:
              'Rendert das Feld schreibgeschützt und verhindert, dass sich das Popover öffnet.',
            required: 'Kennzeichnet das Feld als erforderlich.',
            secondStep:
              'Schrittweite, an die die Sekundenspalte beim Stufen oder Ziehen einrastet.',
            size: 'Visuelle Größe des Picker-Auslösers.',
            value:
              'Aktuelle Uhrzeit-Zeichenkette in HH:MM oder HH:MM:SS (24-Stunden), bidirektional bindbar über [(value)], oder null, wenn nicht gesetzt.',
            changed:
              'Wird mit der neuen Uhrzeit-Zeichenkette ausgelöst, wann immer der Nutzer die ausgewählte Uhrzeit ändert.',
            advanceFocus:
              'Verschiebt den Fokus auf die nächste Einheitenspalte, nachdem eine Zifferneingabe abgeschlossen ist.',
            cannotExtend:
              'Gibt true zurück, wenn keine weitere Ziffer den aktuellen Puffer für die gegebene Einheit gültig erweitern kann.',
            commitDigits:
              'Parst die gepufferte Ziffern-Zeichenkette, begrenzt sie auf den gültigen Bereich der Einheit und schreibt sie in den Wert.',
            flushBuffer:
              'Übernimmt einen ausstehenden Eingabeziffern-Puffer und leert ihn.',
            focusHoursWhenReady:
              'Fokussiert das Stunden-Input, sobald die Popover-Oberfläche im DOM gerendert wurde.',
            hoursFromTyped:
              'Wandelt einen eingegebenen Stundenwert in sein 24-Stunden-Äquivalent um, unter Berücksichtigung der aktuellen AM/PM-Periode.',
            onPopoverCloseRequested:
              'Schließt das Popover, wenn der Nutzer außerhalb des Pickers klickt.',
            onSpinnerBlur:
              'Übernimmt einen ausstehenden Ziffernpuffer, wenn eine Spinner-Spalte den Fokus verliert.',
            onSpinnerFocus:
              'Wählt den gesamten Text in einer Spinner-Spalte aus, wenn sie den Fokus erhält, sodass der erste Tastendruck ihn ersetzt.',
            onSpinnerInput:
              'Verarbeitet Zifferneingaben in einer Spinner-Spalte, aktualisiert den Puffer und verschiebt den Fokus automatisch, wenn die Spalte voll ist.',
            startHold:
              'Startet eine Lang-Druck-Wiederholung auf einem Chevron-Button, stuft die gegebene Einheit und beschleunigt nach einer Verzögerung.',
            step: 'Stuft die gegebene Einheitenspalte um eine konfigurierte Schrittweite nach oben oder unten.',
            stopHold: 'Bricht alle laufenden Lang-Druck-Wiederholungs-Timer ab.',
            togglePeriod:
              'Wechselt die AM/PM-Periode im 12-Stunden-Modus durch Umschalten des 12-Stunden-Offsets.',
          },
          autocomplete: {
            disabled: 'Deaktiviert das Feld.',
            emptyMessage:
              'Meldung, die in der Liste angezeigt wird, wenn keine Optionen zur aktuellen Eingabe passen, mit der Übersetzung des aktiven Sprachraums als Standard, wenn weggelassen.',
            errorMsg:
              'Fehlermeldung unter dem Feld, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            hint: 'Hilfetext unter dem Feld, ausgeblendet, solange ein Fehler angezeigt wird.',
            id: 'id, die auf das native Input und das Label for angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das über dem Feld gerendert wird.',
            maxResults:
              'Maximale Anzahl der Optionen, die gleichzeitig in der Vorschlagsliste angezeigt werden.',
            minLength:
              'Mindestzeichenanzahl, die erforderlich ist, bevor die Vorschlagsliste erscheint.',
            options:
              'Vollständige Liste der zur Filterung und Auswahl verfügbaren Optionen.',
            placeholder: 'Platzhalter, der angezeigt wird, solange das Feld leer ist.',
            readonly: 'Rendert das Feld schreibgeschützt.',
            required: 'Kennzeichnet das Feld als erforderlich.',
            size: 'Visuelle Größe des Feldes.',
            value: 'Aktueller Feldwert, bidirektional bindbar über [(value)].',
            blurred: 'Wird ausgelöst, wenn das Input den Fokus verliert.',
            changed:
              'Wird ausgelöst, wann immer sich der Eingabetext ändert, auch bei Freitext-Bearbeitungen.',
            focused: 'Wird ausgelöst, wenn das Input den Fokus erhält.',
            selected:
              'Wird ausgelöst, wenn der Nutzer eine Option aus der Vorschlagsliste wählt.',
            close: 'Schließt die Vorschlagsliste, ohne den aktuellen Wert zu ändern.',
            focus: 'Verschiebt den Tastaturfokus auf das zugrunde liegende Text-Input.',
            selectOption:
              'Wählt programmatisch die gegebene Option aus, aktualisiert den Wert und schließt die Liste.',
          },
          'command-palette': {
            emptyMessage:
              'Meldung, die angezeigt wird, wenn die Suchanfrage keine Einträge findet, mit der Übersetzung des aktiven Sprachraums als Standard, wenn weggelassen.',
            items:
              'Vollständige Liste der zur Suche und Ausführung verfügbaren Befehlseinträge.',
            open: 'Ob der Paletten-Dialog geöffnet ist, bidirektional bindbar über [(open)].',
            placeholder:
              'Platzhalter, der im Such-Input angezeigt wird, solange es leer ist.',
            execute:
              'Wird ausgelöst, wenn der Nutzer einen Befehl auswählt, und gibt den gewählten Eintrag aus.',
            showActiveHighlight:
              'Gibt zurück, ob die aktive Zeile ihren hervorgehobenen Hintergrund für den gegebenen flachen Index rendern soll.',
          },
          tabs: {
            activeTab:
              'Wert des aktuell aktiven Tabs, bidirektional bindbar über [(activeTab)].',
            size: 'Visuelle Größe der Tabs.',
            variant: 'Visueller Stil der Tableiste: Unterstrich oder gefüllt.',
            changed:
              'Wird mit dem Wert des neu aktiven Tabs ausgelöst, wann immer sich der aktive Tab ändert.',
            registerTab:
              'Registriert einen untergeordneten Tab, sodass er in der Tableiste erscheint; automatisch von ea-tab aufgerufen.',
            selectTab: 'Aktiviert programmatisch den Tab mit dem gegebenen Wert.',
            unregisterTab:
              'Entfernt einen zuvor registrierten untergeordneten Tab; automatisch von ea-tab aufgerufen.',
          },
          tab: {
            disabled:
              'Deaktiviert diesen Tab und verhindert, dass der Nutzer ihn auswählt.',
            id: 'id, die auf den Tab-Button und sein Panel angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das auf dem Tab-Button angezeigt wird.',
            value:
              'Eindeutiger Wert, der diesen Tab innerhalb seiner übergeordneten ea-tabs-Gruppe identifiziert.',
          },
          'date-picker': {
            disabled: 'Deaktiviert die Datumsauswahl.',
            errorMsg:
              'Fehlermeldung unter dem Feld, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            format: 'Anzeigeformat des ausgewählten Datums (short, medium oder long).',
            hint: 'Hilfetext unter dem Feld, ausgeblendet, solange ein Fehler angezeigt wird.',
            id: 'id, die auf den Auslöser und das Label for angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das über dem Feld gerendert wird.',
            locale:
              'BCP-47-Sprach-Tag, das für die Datumsformatierung verwendet wird, mit dem globalen Sprachraum als Standard, wenn weggelassen.',
            maxDate:
              'Spätestes Datum, das der Nutzer auswählen kann; Daten danach sind im Kalender deaktiviert.',
            minDate:
              'Frühestes Datum, das der Nutzer auswählen kann; Daten davor sind im Kalender deaktiviert.',
            placeholder:
              'Platzhalter, der auf dem Auslöser angezeigt wird, solange kein Datum ausgewählt ist.',
            readonly:
              'Rendert das Feld schreibgeschützt und verhindert, dass sich der Kalender öffnet.',
            required: 'Kennzeichnet das Feld als erforderlich.',
            size: 'Visuelle Größe des Datumsauswahl-Auslösers.',
            value: 'Aktuell ausgewähltes Datum, bidirektional bindbar über [(value)].',
            weekStartsOn:
              'Erster Tag der Woche im Kalenderraster (0 für Sonntag, 1 für Montag).',
            changed:
              'Wird ausgelöst, wenn sich das ausgewählte Datum ändert, auch beim Löschen.',
            clear: 'Löscht das ausgewählte Datum und gibt changed mit null aus.',
            close: 'Schließt das Kalender-Popover.',
            focus: 'Verschiebt den Tastaturfokus auf den Auslöser-Button.',
            onPopoverCloseRequested:
              'Schließt das Popover, wenn der Nutzer außerhalb der Datumsauswahl klickt.',
            open: 'Öffnet das Kalender-Popover und verschiebt den Fokus auf die fokussierte Tageszelle.',
            toggle: 'Schaltet das Kalender-Popover zwischen geöffnet und geschlossen um.',
          },
          menu: {
            maxHeight:
              'Maximale Höhe der scrollbaren Liste als CSS-Länge; höhere Menüs scrollen darüber hinaus.',
            ariaLabel:
              'Barrierefreies Label für die Menüliste, das auf den aktiven Sprachraum zurückgreift, wenn weggelassen.',
            disabled: 'Deaktiviert das Menü und verhindert, dass es sich öffnet.',
            id: 'id, die auf das Menülisten-Element angewendet wird, automatisch generiert, wenn weggelassen.',
            open: 'Ob das Menü geöffnet ist, bidirektional bindbar über [(open)].',
            placement: 'Platzierung der Menüliste relativ zu ihrem Auslöser-Element.',
            closed: 'Wird ausgelöst, wenn sich das Menü schließt.',
            opened: 'Wird ausgelöst, wenn sich das Menü öffnet.',
            close:
              'Schließt das Menü und stellt optional den Fokus auf das Auslöser-Element zurück.',
            focusFirstItem:
              'Verschiebt den Tastaturfokus auf den ersten aktivierten Eintrag im Menü.',
            onPopoverCloseRequested:
              'Schließt das Menü, wenn der Nutzer außerhalb davon klickt.',
            openAt:
              'Öffnet das Menü verankert am gegebenen Auslöser-Element und fokussiert den ersten Eintrag.',
            toggleAt:
              'Schaltet den Öffnungszustand des Menüs um und verankert es am gegebenen Auslöser-Element.',
          },
          'menu-item': {
            disabled: 'Deaktiviert den Eintrag und unterdrückt Klick-Ereignisse.',
            variant:
              'Visueller Stil des Eintrags; verwenden Sie danger für destruktive Aktionen.',
            clicked:
              'Wird ausgelöst, wenn der Eintrag aktiviert wird; das übergeordnete Menü schließt sich unmittelbar danach.',
          },
          'multi-select': {
            disabled: 'Deaktiviert das Multi-Select.',
            errorMsg:
              'Fehlermeldung unter dem Feld, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            hint: 'Hilfetext unter dem Feld, ausgeblendet, solange ein Fehler angezeigt wird.',
            id: 'id, die auf den Auslöser und das Label for angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das über dem Feld gerendert wird.',
            maxVisibleChips:
              'Maximale Anzahl der Chips, die im Auslöser angezeigt werden, bevor der Rest in eine Zähl-Pille zusammenklappt.',
            options:
              'Liste der auswählbaren Optionen, die in der Dropdown-Liste gerendert werden.',
            placeholder:
              'Platzhalter, der auf dem Auslöser angezeigt wird, solange keine Option ausgewählt ist.',
            readonly: 'Rendert das Feld schreibgeschützt.',
            required: 'Kennzeichnet das Feld als erforderlich.',
            searchable: 'Zeigt das Such-Input am oberen Rand des Popovers.',
            searchPlaceholder:
              'Platzhalter, der im Such-Input angezeigt wird, wenn der Suchbegriff leer ist.',
            selectAll:
              'Zeigt die Tri-State-Alle-auswählen-Zeile am oberen Rand der Optionsliste.',
            size: 'Visuelle Größe des Multi-Select-Auslösers.',
            value: 'Ausgewählte Optionswerte, bidirektional bindbar über [(value)].',
            changed:
              'Wird mit dem neuen Wert ausgelöst, wann immer sich die Auswahl ändert.',
            clear: 'Löscht jede Auswahl und stoppt die Weitergabe des Ereignisses.',
            handlePopoverKeydown:
              'Verarbeitet die Tastaturnavigation im geöffneten Popover und leitet Pfeiltasten, Enter, Leertaste und Escape weiter.',
            onPopoverCloseRequested:
              'Wird vom Popover aufgerufen, wenn der Nutzer außerhalb klickt oder scrollt; schließt das Panel und markiert das Feld als berührt.',
            orderedValues:
              'Gibt die gegebene Wertmenge neu geordnet zurück, sodass sie zum Input-Optionen-Array passt.',
            removeChip: 'Entfernt die gegebene Option aus der aktuellen Auswahl.',
            toggleOption:
              'Schaltet die Zugehörigkeit der gegebenen Option in der aktuellen Auswahl um.',
            toggleSelectAll:
              'Wählt alle gefilterten Optionen aus, wenn welche nicht ausgewählt sind, oder hebt die Auswahl aller gefilterten Optionen auf, wenn alle ausgewählt sind.',
          },
          dropdown: {
            disabled: 'Deaktiviert das Dropdown.',
            errorMsg:
              'Fehlermeldung unter dem Feld, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            hint: 'Hilfetext unter dem Feld, ausgeblendet, solange ein Fehler angezeigt wird.',
            id: 'id, die auf den Auslöser und das Label for angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das über dem Feld gerendert wird.',
            options:
              'Liste der auswählbaren Optionen, die in der Dropdown-Liste gerendert werden.',
            placeholder:
              'Platzhalter, der auf dem Auslöser angezeigt wird, solange keine Option ausgewählt ist.',
            readonly: 'Rendert das Feld schreibgeschützt.',
            required: 'Kennzeichnet das Feld als erforderlich.',
            size: 'Visuelle Größe des Dropdown-Auslösers.',
            value: 'Aktuell ausgewählter Wert, bidirektional bindbar über [(value)].',
            changed:
              'Wird mit dem neuen Wert ausgelöst, wenn der Nutzer eine Option auswählt.',
            close: 'Schließt die Dropdown-Liste, ohne den aktuellen Wert zu ändern.',
            focus: 'Verschiebt den Tastaturfokus auf den Dropdown-Auslöser.',
            onPopoverCloseRequested:
              'Wird vom Popover aufgerufen, wenn der Nutzer außerhalb des Dropdowns klickt; schließt das Panel und markiert das Feld als berührt.',
            select:
              'Wählt programmatisch die gegebene Option aus und schließt die Liste.',
            toggle: 'Schaltet die Dropdown-Liste zwischen geöffnet und geschlossen um.',
          },
          'file-uploader': {
            accept:
              "Kommagetrennte MIME-Typen und Dateierweiterungen, die die Dropzone akzeptiert, z.B. 'image/*,.pdf'.",
            disabled: 'Deaktiviert den Uploader.',
            errorMsg:
              'Fehlermeldung unter dem Feld, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            hint: 'Hilfetext unter dem Feld, ausgeblendet, solange ein Fehler angezeigt wird.',
            id: 'id, die auf die Dropzone und das Label for angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das über dem Feld gerendert wird.',
            maxFiles:
              'Maximale Gesamtzahl der Dateien; Dateien über dem Limit werden abgelehnt.',
            maxSize:
              'Maximale Größe pro Datei in Bytes; größere Dateien werden abgelehnt.',
            multiple: 'Erlaubt die Auswahl mehrerer Dateien gleichzeitig.',
            progress:
              'Upload-Fortschrittskarte pro Datei (0-100), nach Datei-Identität gekeyt; weglassen, um Fortschrittsbalken auszublenden.',
            required: 'Kennzeichnet das Feld als erforderlich.',
            showFileList: 'Zeigt die Liste der ausgewählten Dateien unter der Dropzone.',
            size: 'Visuelle Größe des Uploaders.',
            value: 'Aktuelle Dateiliste, bidirektional bindbar über [(value)].',
            fileRemoved:
              'Wird ausgelöst, wenn eine Datei über den Entfernen-Button ihrer Zeile entfernt wird.',
            rejected:
              'Wird ausgelöst, wenn eine oder mehrere Dateien die Validierung nicht bestehen, mit dem Grund für jede Ablehnung.',
            trackFile:
              'Gibt einen stabilen Track-Key für eine Datei zurück, intern von der Dateiliste verwendet.',
          },
          popover: {
            anchor: 'Host-Element oder ElementRef, an dem sich das Popover positioniert.',
            ariaLabel:
              'Barrierefreies Label für die Popover-Oberfläche; geben Sie eines an, wenn das Popover keine sichtbare Überschrift enthält.',
            clamp:
              'Begrenzt das Popover innerhalb des Viewports, wenn es andernfalls überlaufen würde.',
            closeOnEscape: 'Schließt das Popover, wenn Escape gedrückt wird.',
            closeOnOutsideClick:
              'Schließt das Popover, wenn der Nutzer außerhalb sowohl des Popovers als auch seines Ankers klickt.',
            flip: 'Klappt auf die gegenüberliegende Seite um, wenn die angeforderte Platzierung den Viewport überläuft.',
            matchAnchorWidth:
              'Setzt die min-width des Popovers, sodass sie der Breite des Ankers entspricht.',
            offset: 'Abstand in px zwischen dem Anker und der Popover-Oberfläche.',
            open: 'Ob das Popover derzeit geöffnet ist.',
            placement: 'Bevorzugte Position des Popovers relativ zu seinem Anker.',
            role: 'ARIA-Rolle, die auf die Popover-Oberfläche angewendet wird.',
            scrollBehavior:
              'Wie das Popover auf Scroll- und Resize-Ereignisse reagiert, während es geöffnet ist: neu positionieren, schließen oder ignorieren.',
            surfaceId:
              'DOM-id für die Popover-Oberfläche, von Auslöser-Elementen über aria-controls verwendet.',
            closeRequested:
              'Wird ausgelöst, wenn das Popover angefordert wird zu schließen; das übergeordnete Element sollte dies in [open] spiegeln.',
          },
          'accordion-item': {
            disabled:
              'Deaktiviert diesen Eintrag und verhindert, dass er umgeschaltet wird.',
            id: 'id, die auf den Header-Button und das Panel des Eintrags angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Text, der im Header-Button des Eintrags angezeigt wird.',
            value:
              'Eindeutiger Schlüssel, der diesen Eintrag innerhalb seines übergeordneten Accordions identifiziert.',
          },
          breadcrumbs: {
            ariaLabel:
              'Barrierefreies Label für die Brotkrümel-Navigation, das auf den aktiven Sprachraum zurückgreift, wenn weggelassen.',
            items:
              'Array von Brotkrümel-Einträgen; Einträge mit einem href werden als Links gerendert, andere als Buttons, und der letzte ist nicht interaktiv.',
            separator:
              'Visueller Stil des Trenners, der zwischen den Brotkrümel-Einträgen gerendert wird.',
            clicked:
              'Wird ausgelöst, wenn ein nicht deaktivierter, nicht letzter Brotkrümel aktiviert wird.',
          },
          drawer: {
            animated:
              'Schiebt das Panel von seinem Rand ein, wenn sich der Drawer öffnet.',
            ariaLabel:
              'Barrierefreies Label für das Drawer-Panel, wenn seine Überschrift nicht aussagekräftig genug ist.',
            closeOnBackdrop:
              'Schließt den Drawer, wenn der Nutzer auf den Hintergrund klickt.',
            closeOnEscape:
              'Schließt den Drawer, wenn der Nutzer die Escape-Taste drückt.',
            id: 'id, die auf das Dialog-Element angewendet wird, automatisch generiert, wenn weggelassen.',
            open: 'Ob der Drawer geöffnet ist, bidirektional bindbar über [(open)].',
            position: 'Rand des Viewports, von dem aus sich der Drawer einschiebt.',
            showClose: 'Zeigt den Schließen-Button in der Drawer-Kopfzeile.',
            width: 'Breite des Drawer-Panels entlang seiner Primärachse.',
            closed:
              'Wird ausgelöst, wenn sich der Drawer schließt, ob über den Schließen-Button, den Hintergrund oder Escape.',
            opened: 'Wird ausgelöst, sobald der Drawer über showModal() angezeigt wurde.',
          },
          'data-table': {
            navigable:
              'Macht die Tabelle zu einem per Tastatur navigierbaren Raster mit wanderndem Fokus und Zellbewegung über die Pfeiltasten.',
            bordered: 'Rendert einen Rahmen um jede Zelle.',
            columns:
              'Spaltendefinitionen, die Schlüssel, Label und optionale Sortierung oder Template jedes Feldes beschreiben.',
            data: 'Array von Zeilenobjekten, die in der Tabelle angezeigt werden.',
            density:
              'Vertikale Dichte-Voreinstellung, die den Innenabstand von Zeilen- und Header-Zellen steuert.',
            hoverable: 'Hebt die Zeile unter dem Zeiger beim Überfahren hervor.',
            noDataText:
              'Text, der im Leerzustand angezeigt wird, mit der Übersetzung des aktiven Sprachraums als Standard.',
            sort: 'Aktueller Sortierzustand (Spaltenschlüssel und Richtung), bidirektional bindbar über [(sort)].',
            stickyHeader:
              'Fixiert die Header-Zeile am oberen Rand der Tabelle, wenn der Inhalt scrollt.',
            striped:
              'Wendet abwechselnde Hintergrundschattierung auf ungerade und gerade Zeilen an.',
            trackBy:
              'Zeileneigenschafts-Schlüssel, der von Angulars Change Detection verwendet wird, um Zeilen effizient zu identifizieren.',
            sorted:
              'Wird ausgelöst, wann immer sich die Sortierspalte oder -richtung über einen Header-Klick ändert.',
          },
          'radio-group': {
            ariaLabel:
              'Barrierefreies Label für die Gruppe, wenn kein sichtbares Label gerendert wird.',
            disabled: 'Deaktiviert alle Radio-Optionen in der Gruppe.',
            errorMsg:
              'Fehlermeldung unter der Gruppe, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            hint: 'Hilfetext unter der Gruppe, ausgeblendet, solange ein Fehler angezeigt wird.',
            id: 'id, die auf das Gruppenelement und sein Label for angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das über der Gruppe gerendert wird.',
            name: 'Gemeinsames name-Attribut, das auf alle Radio-Inputs in der Gruppe angewendet wird, automatisch generiert, wenn weggelassen.',
            orientation: 'Layout-Richtung der Radio-Optionen innerhalb der Gruppe.',
            required: 'Kennzeichnet die Gruppe als erforderlich.',
            size: 'Visuelle Größe, die auf alle Radio-Optionen in der Gruppe angewendet wird.',
            value: 'Aktuell ausgewählter Wert, bidirektional bindbar über [(value)].',
            changed:
              'Wird mit dem neuen Wert ausgelöst, wenn der Nutzer eine Option auswählt.',
            select: 'Wählt programmatisch die Option mit dem gegebenen Wert aus.',
          },
          segmented: {
            ariaLabel:
              'Barrierefreies Label für die Steuerung, wenn kein sichtbares Label gerendert wird.',
            disabled: 'Deaktiviert die segmentierte Steuerung.',
            errorMsg:
              'Fehlermeldung unter dem Feld, die den Hinweis ersetzt und das Feld als ungültig kennzeichnet.',
            fullWidth: 'Streckt die Steuerung, um die Breite ihres Containers zu füllen.',
            hint: 'Hilfetext unter dem Feld, ausgeblendet, solange ein Fehler angezeigt wird.',
            id: 'id, die auf die Steuerung und das Label for angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das über der Steuerung gerendert wird.',
            options:
              'Array von Optionen, die als Umschalt-Buttons innerhalb der Steuerung gerendert werden.',
            required: 'Kennzeichnet das Feld als erforderlich.',
            size: 'Visuelle Größe der segmentierten Steuerung.',
            value:
              'Aktuell ausgewählter Optionswert, bidirektional bindbar über [(value)].',
            changed:
              'Wird mit dem neuen Wert ausgelöst, wenn der Nutzer eine andere Option auswählt.',
            select: 'Wählt programmatisch die gegebene Option aus.',
          },
          'tree-node': {
            collapseLabel: 'Barrierefreies Label für den Zuklappen-Chevron-Button.',
            disabled: 'Deaktiviert die Interaktion mit dem Knoten und seinen Nachfahren.',
            expandedIds: 'Menge der Knoten-ids, die derzeit aufgeklappt sind.',
            expandLabel: 'Barrierefreies Label für den Aufklappen-Chevron-Button.',
            focusedId: 'Id des Knotens, der derzeit den Roving-Tabindex-Fokus hält.',
            level:
              'Tiefe von der Baumwurzel (0-indexiert), verwendet für Einrückung und aria-level.',
            node: 'Datenobjekt, das diesen Knoten beschreibt, einschließlich id, Label, Kindern und deaktiviertem Zustand.',
            posInSet:
              '1-indexierte Position unter den Kindern des übergeordneten Knotens, verwendet für aria-posinset.',
            selectedId:
              'Id des aktuell ausgewählten Knotens, oder null, wenn nichts ausgewählt ist.',
            setSize:
              'Gesamtzahl der Geschwister in der Kinderliste des übergeordneten Knotens, verwendet für aria-setsize.',
            select:
              'Wird ausgelöst, wenn der Nutzer die Knotenzeile anklickt oder aktiviert.',
            toggle:
              'Wird mit der Knoten-id ausgelöst, wenn der Nutzer den Aufklappen- oder Zuklappen-Chevron anklickt.',
          },
          tree: {
            ariaLabel: 'Barrierefreies Label für das Baum-Widget.',
            disabled: 'Deaktiviert alle Knoten im Baum.',
            expandedIds:
              'Ids der derzeit aufgeklappten Zweigknoten, bidirektional bindbar über [(expandedIds)].',
            nodes: 'Array von Baumknoten-Datenobjekten, das die Hierarchie definiert.',
            selectedId:
              'Id des aktuell ausgewählten Knotens, bidirektional bindbar über [(selectedId)].',
            size: 'Visuelle Größe des Baums, die Text und Abstände proportional skaliert.',
            nodeClick:
              'Wird mit den Knotendaten ausgelöst, wenn der Nutzer einen Knoten auswählt.',
          },
          step: {
            completed:
              'Markiert den Schritt als abgeschlossen und aktualisiert seine visuelle Anzeige.',
            disabled: 'Verhindert, dass der Schritt aktiviert wird.',
            id: 'id, die auf das Schritt-Panel und seinen Tab angewendet wird, automatisch generiert, wenn weggelassen.',
            label: 'Textlabel, das in der Schrittanzeige angezeigt wird.',
            optional:
              'Markiert den Schritt als optional, angezeigt als Hinweis unter dem Schritt-Label.',
          },
          stepper: {
            activeStep:
              'Null-basierter Index des aktuell aktiven Schritts, bidirektional bindbar über [(activeStep)].',
            disabled: 'Deaktiviert den gesamten Stepper und jede Schrittnavigation.',
            id: 'id, die auf das Stepper-Host-Element angewendet wird, automatisch generiert, wenn weggelassen.',
            linear:
              'Erfordert, dass jeder nicht optionale Schritt als abgeschlossen markiert ist, bevor der Nutzer fortfahren kann.',
            size: 'Visuelle Größe des Steppers, die Schrittanzeigen und Labels gemeinsam skaliert.',
            changed:
              'Wird mit dem neuen aktiven Schritt-Index ausgelöst, wenn der Nutzer zu einem anderen Schritt navigiert.',
            canNavigateTo:
              'Gibt zurück, ob der Schritt am gegebenen Index aus dem aktuellen Zustand erreichbar ist.',
            indexOf:
              'Gibt den Index des gegebenen Schritts zurück, oder -1, wenn er nicht registriert ist.',
            selectStep:
              'Aktiviert den Schritt am gegebenen Index, sofern er erreichbar ist.',
          },
          'transfer-list': {
            disabled:
              'Deaktiviert die gesamte Transferliste und alle Verschiebe-Steuerungen.',
            items:
              'Vollständiger Pool von Einträgen, die über beide Bereiche verfügbar sind, identifiziert durch id.',
            selectedIds:
              'Ids der Einträge, die sich derzeit auf der Ziel- (rechten) Seite befinden, bidirektional bindbar über [(selectedIds)].',
            size: 'Visuelle Größe der Transferliste.',
            sourceLabel:
              'Überschrift, die über dem Quell- (linken) Bereich gerendert wird, mit dem Standard des aktiven Sprachraums als Fallback.',
            targetLabel:
              'Überschrift, die über dem Ziel- (rechten) Bereich gerendert wird, mit dem Standard des aktiven Sprachraums als Fallback.',
          },
          'virtual-list': {
            itemHeight:
              'Pixelhöhe jeder Zeile; alle Zeilen müssen dieselbe feste Höhe haben.',
            items:
              'Vollständiges Array von Datenelementen zum Rendern; nur der sichtbare Ausschnitt wird jeweils gemountet.',
            overscan:
              'Anzahl der zusätzlichen Zeilen, die über und unter dem sichtbaren Fenster gerendert werden, um leere Ränder bei schnellem Scrollen zu reduzieren.',
            viewportHeight: 'Pixelhöhe des scrollenden Viewports.',
            scrollIndexChange:
              'Wird mit dem Index der ersten am oberen Rand des Viewports sichtbaren Zeile ausgelöst, wann immer der Nutzer scrollt.',
            scrollToIndex:
              'Scrollt den Viewport, sodass die Zeile am gegebenen Index oben erscheint, begrenzt auf die Listengrenzen.',
          },
          'field-label': {
            forId:
              'id der zugehörigen Steuerung; rendert ein <label for>, wenn gesetzt, andernfalls ein <span>.',
            labelId:
              'id, die auf das gerenderte Label-Element angewendet wird, sodass Steuerungen es über aria-labelledby referenzieren können.',
            required: 'Zeigt eine Erforderlich-Anzeige auf dem Label.',
            text: 'Label-Text, der innerhalb des Label-Elements gerendert wird.',
          },
          'field-messages': {
            error:
              'Anzuzeigende Fehlermeldung; wenn gesetzt, wird der Hinweis ausgeblendet und die Meldung als Alert angekündigt.',
            hint: 'Hilfetext, der unter dem Feld angezeigt wird, wenn kein Fehler vorliegt.',
            id: 'Basis-id, die zur Ableitung der aria-ids für die Fehler- und Hinweis-Elemente verwendet wird.',
          },
          dialog: {
            ariaLabel:
              'Barrierefreies Label für den Dialog, wenn sein Header-Slot keinen sichtbaren Titel enthält.',
            closeOnBackdrop:
              'Schließt den Dialog, wenn der Nutzer auf den Hintergrundbereich außerhalb des Panels klickt.',
            closeOnEscape: 'Schließt den Dialog, wenn der Nutzer Escape drückt.',
            id: 'id, die auf das native Dialog-Element angewendet wird, automatisch generiert, wenn weggelassen.',
            open: 'Ob der Dialog angezeigt wird, bidirektional bindbar über [(open)].',
            showClose: 'Zeigt den Schließen-Button in der Dialog-Kopfzeile.',
            width: 'Breiten-Voreinstellung für das Dialog-Panel.',
            closed:
              'Wird ausgelöst, wenn sich der Dialog schließt, unabhängig davon, ob er vom Nutzer oder programmatisch geschlossen wurde.',
            opened: 'Wird ausgelöst, sobald der Dialog über showModal() angezeigt wurde.',
          },
        },
      },
      sharedOptions: {
        fruitOptions: [
          { value: 'apple', label: 'Apfel' },
          { value: 'banana', label: 'Banane' },
          { value: 'cherry', label: 'Kirsche' },
          { value: 'date', label: 'Dattel' },
        ],
        viewOptions: [
          { value: 'day', label: 'Tag' },
          { value: 'week', label: 'Woche' },
          { value: 'month', label: 'Monat' },
        ],
        themeOptions: [
          { value: 'light', label: 'Hell' },
          { value: 'dark', label: 'Dunkel' },
        ],
        monthOptions: [
          { value: 'jan', label: 'Januar' },
          { value: 'feb', label: 'Februar' },
          { value: 'mar', label: 'März' },
          { value: 'apr', label: 'April' },
          { value: 'may', label: 'Mai' },
          { value: 'jun', label: 'Juni' },
          { value: 'jul', label: 'Juli' },
          { value: 'aug', label: 'August' },
          { value: 'sep', label: 'September' },
          { value: 'oct', label: 'Oktober' },
          { value: 'nov', label: 'November' },
          { value: 'dec', label: 'Dezember' },
        ],
        breadcrumbHome: 'Startseite',
        breadcrumbProducts: 'Produkte',
        breadcrumbLaptops: 'Laptops',
        breadcrumbMacBookPro: 'MacBook Pro',
        breadcrumbDashboard: 'Dashboard',
        breadcrumbSettings: 'Einstellungen',
      },
    },
  },
};

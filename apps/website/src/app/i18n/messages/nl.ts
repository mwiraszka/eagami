import type { WebMessages } from '../web-messages.types';

export const nl: WebMessages = {
  common: {
    skipToContent: 'Ga naar hoofdinhoud',
    brandHome: 'Eagami startpagina',
    themeToggleTooltip: 'Thema wisselen',
    themeToggleLabel: next =>
      `Schakel naar de ${next === 'light' ? 'lichte' : 'donkere'} modus`,
    localeMenuLabel: 'Taal',
    localeMenuTooltip: 'Taal wijzigen',
    activeLocale: label => `Huidige taal: ${label}`,
    footer: {
      copyright: year => `© ${year} Eagami.`,
      allRightsReserved: 'Alle rechten voorbehouden.',
      navLabel: 'Voettekst',
      siteHeading: 'Over',
      libraryHeading: 'Eagami UI',
      guidesHeading: 'Handleidingen',
      integrationsHeading: 'Integraties',
      resourcesHeading: 'Bronnen',
      legalHeading: 'Juridisch',
      homeLink: 'Home',
      contactLink: 'Contact',
      sourceCodeLink: 'Broncode',
      npmLink: 'npm',
    },
    codeSnippet: {
      copyLabel: 'Kopiëren naar klembord',
      copySuccess: 'Gekopieerd naar klembord',
      copyError: 'Kon niet naar klembord kopiëren',
    },
    copyLinkLabel: 'Link naar sectie kopiëren',
  },
  home: {
    metaTitle: 'Eagami',
    metaDescription:
      'Elegant webontwerp en de thuisbasis van Eagami UI: een lichtgewicht, toegankelijke Angular-componentenbibliotheek.',
    hero: {
      tagline: 'elegant webontwerp.',
      ctaPrimary: 'Neem contact op',
      ctaSecondary: 'Bekijk recente projecten →',
      scrollHint: 'Scroll naar diensten',
    },
    services: {
      title: 'Diensten',
      lede: 'Van een enkele landingspagina tot een volledige webapp, plus alles wat na de lancering komt.',
      featuresHeading: 'Mogelijkheden',
      uiNote: {
        before: 'Grotere projecten kunnen worden gebouwd op',
        link: 'Eagami UI',
        after:
          ', een eigen componentenbibliotheek, voor een consistente en moderne visuele taal over de hele site.',
      },
      core: [
        {
          title: 'Maatwerkwebsites',
          description:
            'Een complete site die vanaf de grond wordt opgebouwd: domeininstellingen, hosting, branding, ontwerp en lancering. Onbeperkte revisies tot de lanceringsdag.',
        },
        {
          title: 'Doorlopend onderhoud',
          description:
            'Maandelijks onderhoud dat hosting, beveiligingsupdates, afhankelijkheidsupgrades, contentaanpassingen en analysebeoordelingen omvat.',
        },
      ],
      addOns: [
        {
          title: 'Gebruikersbeheer',
          description:
            'Gebruikersauthenticatie, registratie en wachtwoordherstel, plus een beheerdersdashboard met statistieken en bediening per gebruiker.',
          iconSlug: 'users',
        },
        {
          title: 'Betalingsverwerking',
          description:
            'Online betalingen (standaard Stripe, andere providers op verzoek), met aanpasbare betaalformulieren en terugkerende facturering.',
          iconSlug: 'credit-card',
        },
        {
          title: 'Meertalige ondersteuning',
          description:
            'Taalondersteuning voor meerdere talen, met optionele automatische detectie via de browser van de bezoeker.',
          iconSlug: 'languages',
        },
        {
          title: 'Thema-aanpassing',
          description:
            "Schakelaar voor donkere/lichte modus en volledig aanpasbare kleurthema's.",
          iconSlug: 'moon',
        },
        {
          title: 'Analyse en inzichten',
          description:
            'Statistieken over websiteverkeer (bronnen, apparaten, locaties), plus aangepaste gebeurtenisregistratie.',
          iconSlug: 'bar-chart',
        },
        {
          title: 'E-mail en meldingen',
          description:
            'Geautomatiseerde e-mails voor accountactiviteit, bonnen en aankondigingen.',
          iconSlug: 'mail',
        },
      ],
    },
    projects: {
      title: 'Recente projecten',
      lede: 'Een paar sites in actieve ontwikkeling.',
      previousAriaLabel: 'Vorige projecten',
      nextAriaLabel: 'Volgende projecten',
      regionAriaLabel: 'Recente projecten',
      showing: title => `${title} wordt getoond`,
      cards: [
        {
          title: 'London Chess',
          description:
            'Een centrale plek voor de London Chess Club en schaakevenementen in London, ON.',
          url: 'https://londonchess.ca',
          display: 'londonchess.ca',
          logo: 'assets/projects/londonchess.svg',
        },
        {
          title: 'Chordbomb',
          description:
            'Herkent het nummer dat om je heen speelt en leidt het akkoordenschema af.',
          url: 'https://chordbomb.com',
          display: 'chordbomb.com',
          logo: 'assets/projects/chordbomb.svg',
        },
        {
          title: 'CIRC Aesthetics',
          description:
            'Cosmetic Interventional Radiology Clinic gevestigd in London, ON.',
          url: 'https://circaesthetics.ca',
          display: 'circaesthetics.ca',
          logo: 'assets/projects/circaesthetics.svg',
        },
        {
          title: 'Brewski Bets',
          description:
            'Een tracker voor vriendschappelijke weddenschappen, vereffend in bier.',
          url: 'https://brewskibets.com',
          display: 'brewskibets.com',
          logo: 'assets/projects/brewskibets.svg',
        },
      ],
    },
    contact: {
      title: 'Een project in gedachten?',
      lede: 'Vertel erover!',
      success: 'Bedankt voor het bericht. Er volgt snel een reactie.',
      nameLabel: 'Naam',
      namePlaceholder: 'Je naam',
      emailLabel: 'E-mail',
      emailPlaceholder: 'jij@voorbeeld.com',
      emailInvalid: 'Voer een geldig e-mailadres in',
      messageLabel: 'Bericht',
      placeholderHints: [
        'Hoi! Ik werk aan een persoonlijk project en kan wel wat hulp gebruiken bij de frontend...',
        'Op zoek naar iemand die een website bouwt voor ons kleine bedrijf...',
        'Snelle vraag over de componentenbibliotheek voordat ik erin duik...',
      ],
      submit: 'Bericht verzenden',
      sentToast: 'Bericht verzonden',
      errorMessage:
        'Sorry, er is iets misgegaan. Stuur een e-mail rechtstreeks naar info@eagami.com.',
    },
  },
  privacy: {
    metaTitle: 'Privacybeleid | Eagami',
    metaDescription: 'Wat eagami.com verzamelt en wat niet.',
    title: 'Privacybeleid',
    lastUpdated: date => `Laatst bijgewerkt: ${date}`,
    languageNote:
      'Dit beleid wordt alleen in het Engels bijgehouden. Een vertaalde versie is uitsluitend bedoeld als hulpmiddel.',
  },
  terms: {
    metaTitle: 'Gebruiksvoorwaarden | Eagami',
    metaDescription:
      'Voorwaarden voor het gebruik van eagami.com en de Eagami UI-componentenbibliotheek.',
    title: 'Gebruiksvoorwaarden',
    lastUpdated: date => `Laatst bijgewerkt: ${date}`,
    languageNote:
      'Deze voorwaarden worden alleen in het Engels bijgehouden. Een vertaalde versie is uitsluitend bedoeld als hulpmiddel.',
  },
  notFound: {
    metaTitle: 'Pagina niet gevonden | Eagami',
    metaDescription: 'Pagina niet gevonden.',
    eyebrow: '404',
    title: 'Pagina niet gevonden',
    lede: 'De pagina die je zocht bestaat niet of is verplaatst.',
    cta: 'Terug naar home',
  },
  ui: {
    changelog: {
      title: 'Wijzigingslogboek',
      metaTitle: 'Wijzigingslogboek | Eagami UI',
      metaDescription:
        'Versiegeschiedenis van de Eagami UI Angular-componentenbibliotheek.',
      lede: (pkg, version, history) =>
        `Hieronder vind je alle noemenswaardige wijzigingen aan de ${pkg}-bibliotheek sinds versie ${version}. Voor de volledige historie, zie ${history}.`,
      historyInline: 'CHANGELOG.md op GitHub',
      migrationGuide: 'Migratiegids',
    },
    shell: {
      changelog: 'Wijzigingslogboek',
      sidebarLabel: 'Documentatiezijbalk',
      menu: 'Documentatiemenu',
      navLabel: 'Documentatie',
      overview: 'Overzicht',
      setup: 'Installatie',
      designTokens: 'Designtokens',
      themeBuilder: 'Themabuilder',
      icons: 'Iconen',
      i18n: 'Internationalisatie',
      accessibility: 'Toegankelijkheid',
      components: 'Componenten',
    },
    index: {
      metaTitle: 'Eagami UI',
      metaDescription:
        'Lichtgewicht, toegankelijke Angular-componentenbibliotheek gebouwd op CSS-aangepaste eigenschappen.',
      title: 'Overzicht',
      ledeBefore: 'is een lichtgewicht, toegankelijke Angular-componentenbibliotheek.',
      ledeAfter:
        'Verstandige standaardinstellingen out of the box, met een volledig aanpasbaar ontwerp dat bij elk merk past.',
      principlesHeading: 'Ontwerpprincipes',
      principles: [
        {
          title: 'Toegankelijk',
          body: 'Toetsenbordnavigatie, focusbeheer, ondersteuning voor schermlezers en het afhandelen van gereduceerde beweging zijn in elke component ingebouwd.',
        },
        {
          title: 'Lichtgewicht',
          body: 'Elke component wordt onafhankelijk geïmporteerd en de bundel levert alleen wat je gebruikt.',
        },
        {
          title: 'Themabaar',
          body: 'Volledig aanpasbaar met designtokens en toch een uniforme uitstraling op elke pagina. Lichte en donkere varianten worden samen geleverd en volgen standaard de systeemvoorkeur van de gebruiker.',
        },
        {
          title: 'Gelokaliseerd',
          body: 'Ingebouwde componenttekst wordt geleverd in alle ondersteunde talen.',
        },
        {
          title: 'Modern',
          body: 'Regelmatig bijgewerkt met de nieuwste Angular-functies en moderne webstandaarden.',
        },
        {
          title: 'Ongebonden',
          body: 'Elke component is gewoon Angular en CSS zonder leveranciersbinding, zodat de broncode net als elke andere code in je project kan worden gelezen, gekopieerd of aangepast.',
        },
      ],
      showcase: {
        button: 'Druk op mij',
        toggle: 'Schakel mij',
        tick: 'Vink mij aan',
        tag: 'Label',
        badge: 'Insigne',
        tooltip: 'Aanvullende informatie weergegeven in een tooltip',
        exploreMore: '...meer componenten verkennen',
        list: 'Lijst',
        grid: 'Raster',
        table: 'Tabel',
        radioThis: 'Dit',
        radioThat: 'Dat',
        option1: 'Optie 1',
        option2: 'Optie 2',
        option3: 'Optie 3',
        toastButton: 'Knop ingedrukt',
        toastToggleOn: 'Schakelaar aangezet',
        toastToggleOff: 'Schakelaar uitgezet',
        toastTickOn: 'Selectievakje aangevinkt',
        toastTickOff: 'Selectievakje uitgevinkt',
        ariaView: 'Demoweergave',
        ariaSlider: 'Demoschuifregelaar',
        ariaRating: 'Demobeoordeling',
        ariaLayout: 'Demolay-out',
        ariaColor: 'Demokleur',
        ariaSelect: 'Demoselectie',
        ariaDate: 'Demodatum',
        ariaMultiSelect: 'Demo-meervoudige selectie',
        msMusic: 'Muziek',
        msTravel: 'Reizen',
        msFood: 'Eten',
      },
      theme: {
        heading: 'Maak het van jou',
        ledeBefore: '',
        ledeLink: 'Designtokens',
        ledeAfter:
          ' geven elk Eagami-project een eigen persoonlijkheid: aanpasbare kleuren, lettertypen, witruimte, hoeken, schaduwen en beweging, allemaal toegepast op de hele website of app. Pas er hieronder een paar aan om te zien hoe ze de componenten beïnvloeden.',
        brandColor: 'Merkkleur',
        radius: 'Hoekradius',
        font: 'Lettertype',
        fontDefault: '(standaard)',
        reset: 'Resetten',
      },
    },
    setup: {
      metaTitle: 'Installatie | Eagami UI',
      metaDescription:
        'Installeer @eagami/ui en sluit de globale stylesheet en lettertypen aan.',
      title: 'Installatie',
      ngAddLabel: 'Installeer en configureer alles met één commando:',
      manualLabel: 'Of stel het handmatig in:',
      installLabel: 'Installeer het pakket:',
      or: 'of',
      stylesheetLabel: {
        before: 'Voeg de globale stylesheet toe in',
        after: ':',
      },
      fontsLabel: {
        before: 'Laad de lettertypen in',
        after: ':',
      },
      firstComponentHeading: 'Je eerste component',
    },
    integrations: {
      heading: 'Voorbij Angular',
      intro:
        'De designtokens van Eagami zijn framework-onafhankelijk. Kopieer een op zichzelf staande integratiegids naar een niet-Angular-project of gebruik de machineleesbare tokenexport rechtstreeks.',
      reactLink: 'React-integratiegids',
      flutterLink: 'Flutter-integratiegids',
      tokensLink: 'Designtokens als JSON',
    },
    themeBuilder: {
      metaTitle: 'Themabuilder | Eagami UI',
      metaDescription:
        'Genereer op basis van je merkkleuren een WCAG-gecontroleerd palet voor de lichte en donkere modus en kopieer vervolgens de providerconfiguratie of CSS.',
      title: 'Themabuilder',
      lede: 'Kies je merkkleuren en Eagami UI leidt er een volledige 50–900-schaal in de OKLCH-ruimte uit af, controleert het WCAG-contrast in de lichte en donkere modus en geeft je de <code>provideEagamiUi()</code>-configuratie om direct toe te passen.',
      primaryLabel: 'Primaire kleur',
      secondaryLabel: 'Secundaire kleur',
      contrastPass:
        'Voldoet aan WCAG 2.2 AA-contrast in zowel de lichte als de donkere modus',
      contrastFailIntro: 'Sommige combinaties blijven onder de WCAG AA-contrastdrempel:',
      previewHeading: 'Voorbeeld',
      previewHint: 'Wissel het sitethema om het palet in de donkere modus te bekijken.',
      previewButton: 'Aan de slag',
      previewSwitch: 'Meldingen',
      previewStep1: 'Account',
      previewStep2: 'Profiel',
      previewStep3: 'Klaar',
      previewProgress: 'Voortgang:',
      exportHeading: 'Exporteren',
      exportConfigLabel: 'Angular-configuratie',
      exportCssLabel: 'CSS-variabelen',
    },
    tokens: {
      metaTitle: 'Designtokens | Eagami UI',
      metaDescription:
        'CSS-aangepaste eigenschappen voor kleuren, typografie, witruimte, elevatie, vorm en beweging.',
      title: 'Designtokens',
      lede: 'Designtokens zijn de CSS-aangepaste eigenschappen die elke component in de bibliotheek aansturen: kleuren, typografie, witruimte, elevatie, vorm en beweging. Verwijs naar deze tokens in je eigen stijlen via <code>var(--token-name)</code> om visuele consistentie in de hele app te behouden.',
      sections: {
        theming: 'Thema',
        palette: 'Merkpalet',
        colors: 'Kleuren',
        typography: 'Typografie',
        spacing: 'Witruimte',
        elevation: 'Elevatie',
        shape: 'Vorm',
        motion: 'Beweging',
      },
      themingRootBefore:
        'Elk Eagami-designtoken kan worden overschreven, zodat de bibliotheek zich aan elk merk aanpast. Overschrijf een token op <code>:root</code> om de hele bibliotheek opnieuw te thematiseren:',
      themingScopedBefore:
        'Of beperk overschrijvingen tot afzonderlijke componenten waar dat nuttig is:',
      paletteIntro:
        'Geef een enkele merkhexkleur door aan <code>provideEagamiUi()</code> en de bibliotheek leidt een volledige schaal van tien tinten af (50 tot en met 900) in de <a href="https://www.w3.org/TR/css-color-4/#ok-lab" target="_blank" rel="noopener noreferrer"><span>OKLCH</span></a>-ruimte, waarbij tint en chroma stabiel blijven terwijl de helderheid wordt aangepast. De afgeleide tinten voeden elk <code>--color-brand-*</code>-token in zowel de lichte als de donkere modus:',
      paletteOverrides:
        'Zet specifieke tinten vast of wijs opnieuw toe welke afgeleide tint elke semantische rol ondersteunt:',
      paletteContrast:
        'Elke combinatie van merkrollen (tekst op oppervlak, oppervlak op canvas) wordt bij het opstarten gecontroleerd op <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer"><span>WCAG 2.2 Level AA</span></a>. Een falende combinatie geeft een fout voordat de app laadt, zodat een contrastfout in de merkkleur bij het opstarten wordt opgemerkt in plaats van in productie.',
      paletteBuilderIntro: 'Stel je palet visueel samen en bekijk het in de',
      paletteBuilderLink: 'themabuilder',
      elevationDrop: 'Slagschaduwen',
      elevationRelief: 'Reliëf en uitsparing',
      elevationReliefBefore:
        '<code>--shadow-bevel</code> combineert een inwendige highlight (boven) met een inwendige schaduw (onder) voor oppervlakken die verhoogd moeten lijken. <code>--shadow-well</code> keert de belichting om voor een verzonken uiterlijk. Combineer met <code>--shadow-*</code> voor een omgevingsschaduw: <code>box-shadow: var(--shadow-bevel), var(--shadow-sm);</code>',
      colorsPrimary: 'Primair',
      colorsSecondary: 'Secundair',
      colorsNeutral: 'Neutraal',
      colorsSemantic: 'Semantisch',
      typographyFamilies: 'Families',
      typographySizes: 'Groottes',
      typographyWeights: 'Diktes',
      typographyComposites: 'Samengestelde stijlen',
      typographyCompositesBefore:
        "Samengestelde tokens bundelen een grootte, dikte, regelhoogte (en soms een familie) voor een specifieke rol. <code>--text-section-heading-*</code> is het eerste samengestelde token dat een lettertypefamilie vastzet: gebruik het voor de <code>&lt;h2&gt;</code>-subtitel op documentatie- en marketingpagina's.",
      typographySectionHeadingSample: 'Sectietitel merkstem',
      motionSimulate: 'Simuleren',
      motionDurations: 'Duur',
      motionEasings: 'Easings',
      integrationsIntro:
        'Alle bovenstaande designtokens zijn framework-onafhankelijk. Geef voor niet-Angular-projecten simpelweg een op zichzelf staande integratiegids aan je AI-agent, of laat die de machineleesbare tokenexport rechtstreeks gebruiken.',
    },
    icons: {
      metaTitle: 'Iconen | Eagami UI',
      metaDescription: 'Iconenset meegeleverd met @eagami/ui.',
      title: 'Iconen',
      lede: 'Standalone Angular-componenten die hun kleur erven en meeschalen met <code>font-size</code>, zodat ze op elke grootte worden weergegeven. De meeste zijn afgeleid van <a href="https://feathericons.com/" target="_blank" rel="noopener noreferrer"><span>Feather Icons</span></a> van <a href="https://github.com/colebemis" target="_blank" rel="noopener noreferrer"><span>Cole Bemis</span></a> onder de <a href="https://github.com/feathericons/feather/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><span>MIT-licentie</span></a>; de rest zijn originele Eagami UI-iconen. Feather-iconen kunnen ook met dunnere of dikkere lijnen worden getekend. Klik op een icoon om de selector te kopiëren.',
      filterLabel: 'Iconen filteren',
      filterPlaceholder: 'Iconen zoeken',
      filterClearLabel: 'Zoekopdracht wissen',
      categoryFeather: 'Feather',
      categoryEagami: 'Eagami UI',
      categoryBrand: 'Merk',
      countAll: count => `${count} iconen`,
      countFiltered: (shown, total) => `${shown} van ${total} iconen`,
      noResults: 'Geen iconen komen overeen met je zoekopdracht',
      copiedToast: selector => `"${selector}" gekopieerd naar klembord`,
      copyFailedToast: selector => `Kon "${selector}" niet naar klembord kopiëren`,
      brandTitle: 'Merkiconen',
      brandIntro:
        'De merkiconen in de onderstaande lijst tonen handelsmerken van derden en worden alleen verstrekt voor nominatief gebruik, dat wil zeggen het identificeren van het merk dat ze vertegenwoordigen in een UI (een knop "Inloggen met Google", een link "Delen op Facebook", enzovoort). Ze zijn niet gelicentieerd voor algemeen decoratief gebruik. Gebruikers zijn verantwoordelijk voor het volgen van de richtlijnen van elk merk:',
      brandLinkLabel: 'Merkbronnen',
    },
    i18n: {
      metaTitle: 'Internationalisatie | Eagami UI',
      metaDescription:
        'Ingebouwde componenttekst in 15 talen, met wisselen tijdens runtime en overschrijvingen per tekst.',
      title: 'Internationalisatie',
      lede: 'Elke ingebouwde tekst (ARIA-labels, plaatsaanduidingen, lege toestanden, datumkiezerbediening) wordt geleverd in 15 talen. Stel er een in voor de hele app, wissel tijdens runtime, of overschrijf afzonderlijke teksten.',
      supportedHeading: 'Ondersteunde talen',
      quickSetupHeading: 'Snelle installatie',
      quickSetupBefore:
        'Voeg <code>provideEagamiUi()</code> toe aan je app-configuratie en registreer de talen die je gebruikt via <code>locales</code>. Engels is altijd inbegrepen, en alleen de talen die je registreert worden aan je bundel toegevoegd.',
      lazyHeading: 'Lui laden',
      lazyBefore:
        'Registreer <code>localeLoaders</code> in plaats van <code>locales</code>: een taal wordt pas opgehaald zodra die actief wordt en blijft zo buiten de initiële bundel. Laat elke loader wijzen naar een module die één taalpakket herexporteert, en laad vooraf met <code>loadLocale()</code> als het wisselen direct moet gebeuren.',
      liveDemoHeading: 'Live demo',
      liveDemoIntro:
        'Kies een taal en zie hoe de onderstaande componenten de bijbehorende teksten en datumopmaak overnemen.',
      runtimeSwitchHeading: 'Wisselen tijdens runtime',
      runtimeSwitchBefore:
        'Injecteer <code>EagamiI18nService</code> en roep <code>setLocale()</code> aan. De actieve taal is een signal, dus elke component wordt opnieuw gerenderd met de nieuwe teksten zonder verversen.',
      perStringHeading: 'Overschrijvingen per tekst',
      perStringBefore:
        'Geef een <code>messages</code>-object door naast de taal om afzonderlijke teksten te vervangen. Alles wat je weglaat valt terug op de standaardinstellingen van de taal.',
      perStringAfter:
        'De meeste componenten bieden ook afzonderlijke tekstinputs (bijv. <code>placeholder</code> op <code>&lt;ea-dropdown&gt;</code>) voor eenmalige overschrijvingen op de aanroeplocatie.',
      frenchSpacingHeading: 'Hulpmiddel voor Franse spatiëring',
      frenchSpacingBody:
        'Franse typografie verwacht een smalle vaste spatie voor <code>? ! : ; »</code> en na <code>«</code>. De geëxporteerde <code>frenchSpacing()</code>-helper zet gewone spaties in je eigen Franse teksten om (de bibliotheek verwerkt haar meegeleverde Franse teksten intern).',
      demoLocaleLabel: 'Taal',
    },
    accessibility: {
      metaTitle: 'Toegankelijkheid | Eagami UI',
      metaDescription:
        'WCAG 2.2 AA-conformiteit, volledige toetsenbordondersteuning en schermlezervriendelijke componenten, geverifieerd bij elke release.',
      title: 'Toegankelijkheid',
      lede: 'Elke component is gebouwd volgens de toonaangevende standaarden voor webtoegankelijkheid: correcte semantiek, volledige toetsenbordondersteuning, focusbeheer en schermlezeraankondigingen werken direct out of the box.',
      conformanceHeading: 'Conformiteit',
      conformanceBody:
        'De bibliotheek houdt zich aan <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener">WCAG 2.2 Level AA</a>, de standaard waaraan de meeste organisaties moeten voldoen, en volgt de officiële richtlijnen van het W3C voor elk soort besturingselement, van dialogen en menu\'s tot sliders en datumkiezers. Schermlezeraankondigingen worden meegeleverd in elke ondersteunde taal, zodat hulptechnologie altijd de taal van de gebruiker spreekt.',
      builtInHeading: 'Ingebouwde toegankelijkheid',
      builtInItems: [
        {
          title: 'Semantiek',
          body: 'Native elementen waar mogelijk, expliciete ARIA-rollen, -toestanden en -eigenschappen waar niet. Toestanden zoals expanded, selected, checked, invalid en busy worden altijd programmatisch blootgesteld, nooit alleen via styling.',
        },
        {
          title: 'Toetsenbordondersteuning',
          body: 'Volledige APG-toetsenbordpatronen: roving tabindex, navigatie met de pijltjestoetsen, Home en End, Escape om te sluiten, en Enter of spatiebalk om te activeren, met RTL-bewuste afhandeling van de pijltjestoetsen.',
        },
        {
          title: 'Focusbeheer',
          body: 'Modals en kiezers houden de focus vast terwijl ze open zijn en geven die bij het sluiten terug aan de trigger. Focusindicatoren zijn altijd zichtbaar en worden nooit onderdrukt.',
        },
        {
          title: 'Schermlezeraankondigingen',
          body: 'Toasts, meldingen, validatiefouten en asynchrone toestandswijzigingen worden aangekondigd via live regions met het juiste beleefdheidsniveau.',
        },
        {
          title: 'Gereduceerde beweging',
          body: 'Animaties respecteren overal de mediaquery prefers-reduced-motion.',
        },
        {
          title: 'Contrast',
          body: "De standaard lichte en donkere thema's voldoen aan de WCAG-contrasteisen, en de themingtools markeren combinaties die onder AA uitkomen.",
        },
      ],
      labelsHeading: 'Toegankelijke namen',
      labelsBefore:
        'Componenten die tekst renderen labelen zichzelf. Alles wat alleen uit een icoon bestaat of grafisch is, biedt een <code>aria-label</code>-input (met gelokaliseerde standaardwaarden voor ingebouwde bedieningen zoals wis-, sluit- en verwijderknoppen), en formuliervelden koppelen <code>label</code>, hints en foutberichten automatisch via <code>aria-describedby</code> aan het besturingselement.',
      labelsAfter:
        'Geef een <code>label</code> of <code>aria-label</code> op voor besturingselementen zonder zichtbare tekst en de component regelt de rest: namen, hints en foutberichten blijven automatisch aan elkaar gekoppeld.',
      testingHeading: 'Geverifieerd bij elke release',
      testingBody:
        'Elke component wordt bij elke wijziging getoetst aan gangbare toegankelijkheidsregels uit de sector, en een release verschijnt pas wanneer elke controle slaagt, zodat de toegankelijkheid die je hier ziet standhoudt terwijl de bibliotheek zich verder ontwikkelt.',
    },
    component: {
      metaTitle: name => `${name}-component | Eagami UI`,
      metaDescription: name =>
        `Angular-component ${name}: live demo, API-referentie en theming met CSS-variabelen.`,
      demoHeading: 'Demo',
      notFoundTitle: 'Component niet gevonden',
      notFoundBody: 'Kies een component uit de zijbalk, of',
      notFoundLink: 'ga terug naar de introductie',
      sectionHeadings: {
        basic: 'basis',
        variants: 'varianten',
        sizes: 'groottes',
        states: 'toestanden',
        disabled: 'uitgeschakeld',
        dismissible: 'sluitbaar',
        clearable: 'wisbaar',
        hintAndError: 'hint en fout',
        withHint: 'met hint',
        withError: 'met fout',
        withLabel: 'met label',
        withIcons: 'met iconen',
        withFooter: 'met voettekst',
        withPaginator: 'met paginering',
        withDisabledItem: 'met uitgeschakeld item',
        withDisabledTab: 'met uitgeschakeld tabblad',
        required: 'verplicht',
        requiredWithHint: 'verplicht met hint',
        horizontal: 'horizontaal',
        vertical: 'verticaal',
        single: 'enkel',
        multi: 'meervoudig',
        circle: 'cirkel',
        square: 'vierkant',
        shapes: 'vormen',
        shapesAndFallbacks: 'vormen en terugvalopties',
        chevronSeparator: 'chevron-scheidingsteken',
        slashSeparator: 'slash-scheidingsteken',
        twoLevels: 'twee niveaus',
        fourDigitPin: 'pincode van 4 cijfers',
        defaultHeading: 'standaard',
        stripedAndBordered: 'gestreept en omkaderd',
        compactDensity: 'compacte dichtheid',
        tinyList: 'kleine lijst',
        stickyHeader: 'vastgezette koptekst',
        emptyState: 'lege toestand',
        formatVariants: 'opmaakvarianten',
        minMax: 'min en max',
        positions: 'posities',
        trigger: 'trigger',
        alignLeft: 'uitlijning: links',
        alignCenter: 'uitlijning: midden',
        manyPages: "veel pagina's",
        minimal: 'minimaal',
        indeterminate: 'onbepaald',
        noResize: 'niet vergrootbaar',
        resizing: 'vergroten/verkleinen',
        disabledAndReadonly: 'uitgeschakeld en alleen-lezen',
        password: 'wachtwoord',
        autocompleteSection: 'autocomplete',
        twoOptions: 'twee opties',
        fullWidth: 'volledige breedte',
        minLengthMaxResults: 'min. lengte en max. resultaten',
        removable: 'verwijderbaar',
        minMaxLabels: 'min/max-labels',
        underline: 'onderstreping',
        filled: 'gevuld',
        rect: 'rechthoek',
        inlineLayout: 'inline-indeling',
        noResults: 'geen resultaten',
        titleOnly: 'alleen titel',
        iconTrigger: 'icoontrigger',
        placements: 'plaatsingen',
        canvasSizes: 'canvasgroottes',
        cappedChipCount: 'gemaximeerd aantal chips',
        customIcon: 'aangepast icoon',
        customIconAndColor: 'aangepast icoon en kleur',
        halfSteps: 'halve stappen',
        customLabel: 'aangepast label',
        customSize: 'aangepaste grootte',
        linearFlow: 'lineaire flow',
        manyLevels: 'veel niveaus',
        notAnimated: 'niet geanimeerd',
        numberOfStars: 'aantal sterren',
        minimumOne: 'minimaal 1 ster',
        outputFormats: 'uitvoerformaten',
        quarterHourSteps: 'stappen van een kwartier',
        readonly: 'alleen-lezen',
        singleFile: 'enkel bestand',
        stepped: 'getrapt',
        sundayStart: 'begin op zondag',
        twelveHourFormat: '12-uursnotatie',
        twoActions: 'twee acties',
        withCompletedSteps: 'met voltooide stappen',
        withConstraints: 'met beperkingen',
        withInitialValue: 'met beginwaarde',
        withMaxlength: 'met maximale lengte',
        withMaxHeight: 'met max. hoogte',
        withMinMaxLabels: 'met min/max-labels',
        withOptionalStep: 'met optionele stap',
        withSeconds: 'met seconden',
        withSelection: 'met selectie',
        withoutAlpha: 'zonder alpha',
        withoutSearch: 'zonder zoeken',
        withoutSelectAll: 'zonder alles-selecteren',
        wrapping: 'omslaand',
      },
      common: {
        small: 'Klein',
        medium: 'Middel',
        large: 'Groot',
        cancel: 'Annuleren',
        save: 'Opslaan',
        close: 'Sluiten',
        confirm: 'Bevestigen',
        disabled: 'Uitgeschakeld',
        defaultLabel: 'Standaard',
        successLabel: 'Succes',
        warningLabel: 'Waarschuwing',
        errorLabel: 'Fout',
        infoLabel: 'Info',
      },
      demos: {
        accordion: {
          whatLabel: 'Wat is @eagami/ui?',
          whatBody:
            'Een lichtgewicht, toegankelijke Angular-componentenbibliotheek gebouwd op CSS-aangepaste eigenschappen.',
          installLabel: 'Hoe installeer ik het?',
          installBody:
            'Voer pnpm add @eagami/ui uit en voeg vervolgens de globale stylesheet toe aan je angular.json.',
          themeLabel: 'Kan ik het thema aanpassen?',
          themeBody:
            'Ja, overschrijf een CSS-aangepaste eigenschap op :root of beperk overschrijvingen tot afzonderlijke componenten.',
          sectionOneLabel: 'Sectie één',
          sectionOneBody:
            'Meerdere secties kunnen tegelijk open zijn in de meervoudige modus.',
          sectionTwoLabel: 'Sectie twee',
          sectionTwoBody: 'Inhoud voor sectie twee.',
          disabledSectionLabel: 'Uitgeschakelde sectie',
          disabledSectionBody: 'Deze inhoud is niet bereikbaar.',
        },
        alert: {
          defaultText: 'Dit is een standaardmelding',
          successText: 'Je wijzigingen zijn opgeslagen',
          warningText: 'Je proefperiode verloopt over 3 dagen',
          errorText: 'Er is iets misgegaan, probeer het opnieuw',
          infoText: 'Er is een nieuwe versie beschikbaar',
          dismissibleText: 'Deze melding kan worden gesloten',
          tooltipSuppressed:
            "Tooltips worden onderdrukt op aanraakapparaten om plakkerig hovergedrag te voorkomen. Bekijk deze sectie op een apparaat met een muis om de demo's in actie te zien.",
        },
        autocomplete: {
          startTyping: 'Begin met typen…',
          hintText: 'Begin met typen om overeenkomsten te zien',
          errorText: 'Selecteer een hondenras',
          breedPlaceholder: 'Hondenras…',
          minMaxLabel: 'Min. 2 tekens, max. 3 resultaten',
          minMaxPlaceholder: 'Typ minstens 2 tekens…',
        },
        avatarEditor: {
          result: 'Resultaat:',
        },
        badge: {
          successText: 'Actief',
          warningText: 'In behandeling',
          newText: 'Nieuw',
        },
        button: {
          primary: 'Primair',
          secondary: 'Secundair',
          ghost: 'Ghost',
          danger: 'Gevaar',
          toggleLoading: 'Laden in-/uitschakelen',
          fullWidth: 'Volledige breedte',
          clickedToast: 'Knop ingedrukt!',
        },
        card: {
          elevatedHeader: 'Verhoogd',
          elevatedBody: 'Kaart met schaduwelevatie.',
          outlinedHeader: 'Omkaderd',
          outlinedBody: 'Kaart met randomlijning.',
          filledHeader: 'Gevuld',
          filledBody: 'Kaart met subtiele achtergrond.',
          cardTitleHeader: 'Kaarttitel',
          cardWithFooterBody:
            'Deze kaart heeft een koptekst, body en voettekst met acties.',
        },
        checkbox: {
          acceptTermsAndConditions: 'Algemene voorwaarden accepteren',
          disabledChecked: 'Uitgeschakeld aangevinkt',
          indeterminate: 'Onbepaald',
          iAgreeToTerms: 'Ik ga akkoord met de voorwaarden',
          subscribeToUpdates: 'Abonneren op updates',
          subscribeHint: 'Er wordt een maandelijks overzicht verstuurd, geen spam',
          acceptTermsLabel: 'Voorwaarden accepteren',
          acceptTermsError: 'De voorwaarden moeten worden geaccepteerd om door te gaan',
        },
        codeInput: {
          verificationCodeLabel: 'Verificatiecode',
          verificationCodeHint: 'Controleer je e-mail voor de 6-cijferige code',
          verificationCodeError: 'Ongeldige verificatiecode',
          pinLabel: 'Pincode',
          pinHint: 'Voer je 4-cijferige pincode in',
        },
        colorPicker: {
          brandLabel: 'Merkkleur',
          hintBrandColor: 'Gebruikt als de primaire merkkleur',
          errorRequired: 'Dit veld is verplicht',
          hexLabel: 'HEX-formaat',
          rgbLabel: 'RGB-formaat',
          hslLabel: 'HSL-formaat',
          noAlphaHeading: 'Alleen ondoorzichtig',
          opaqueOnlyLabel: 'Effen kleur',
        },
        dataTable: {
          tableColumnId: 'ID',
          tableColumnFirstName: 'Voornaam',
          tableColumnLastName: 'Achternaam',
          tableColumnAdmin: 'Beheerder',
          tableColumnPosts: 'Berichten',
        },
        datePicker: {
          appointmentLabel: 'Afspraak',
          pickDatePlaceholder: 'Kies een datum…',
          hintAnyFutureDate: 'Selecteer een willekeurige toekomstige datum',
          errorRequired: 'Dit veld is verplicht',
          shortLabel: 'Kort',
          mediumLabel: 'Middel',
          longLabel: 'Lang',
          withinNextWeeksLabel: 'Binnen de komende 3 weken',
          withinNextWeeksHint: '±1 week / +3 weken vanaf vandaag',
        },
        dialog: {
          openButton: 'Dialoogvenster openen',
          title: 'Titel dialoogvenster',
          body: 'Dit is de inhoud van het dialoogvenster. Het ondersteunt alle content, waaronder formulieren, tekst en andere componenten.',
        },
        divider: {
          orLabel: 'of',
          sectionLabel: 'Sectie',
          leftLabel: 'Links',
          rightLabel: 'Rechts',
        },
        drawer: {
          openButton: 'Lade openen',
          rightButton: 'Rechts',
          leftButton: 'Links',
          topButton: 'Boven',
          bottomButton: 'Onder',
          rightTitle: 'Rechterlade',
          rightBody: 'Schuift in vanaf de rechterrand, handig voor detailpanelen.',
          leftTitle: 'Linkerlade',
          leftBody: "Schuift in vanaf de linkerkant, handig voor navigatiemenu's.",
          topTitle: 'Bovenlade',
          topBody: 'Schuift omlaag vanaf de bovenkant, handig voor meldingen.',
          bottomTitle: 'Onderlade',
          bottomBody:
            'Schuift omhoog vanaf de onderkant, gangbaar op mobiel voor actiebladen.',
        },
        dropdown: {
          fruitLabel: 'Fruit',
          fruitPlaceholder: 'Selecteer een fruit…',
          hintFavourite: 'Kies je favoriet',
          errorRequired: 'Dit veld is verplicht',
          selectPlaceholder: 'Selecteer…',
        },
        emptyState: {
          noItemsTitle: 'Nog geen items',
          noItemsDescription: 'Ga aan de slag door je eerste item te maken.',
          createItem: 'Item maken',
          noResultsTitle: 'Geen resultaten gevonden',
          noResultsDescription:
            'Pas je zoekopdracht of filter aan om te vinden wat je zoekt.',
          clearFilters: 'Filters wissen',
          nothingHereTitle: 'Hier valt niets te zien',
        },
        fileUploader: {
          attachmentsLabel: 'Bijlagen',
          imagesLabel: 'Afbeeldingen uploaden',
          imagesHint: 'PNG of JPEG, elk tot 2 MB, max. 4 bestanden',
          resumeLabel: 'Cv uploaden',
          customIconLabel: 'Bestanden bijvoegen',
          withHintHint: 'Tot 10 MB per bestand',
          withErrorText: 'Minstens één afbeelding is vereist',
        },
        formField: {
          emailPlaceholder: 'you@example.com',
        },
        input: {
          defaultLabel: 'Standaard',
          enterTextPlaceholder: 'Voer tekst in…',
          hintGuidance: 'Nuttige aanwijzingen komen hier',
          errorRequired: 'Dit veld is verplicht',
          readonlyLabel: 'Alleen-lezen',
          readonlyValue: 'Alleen-lezen waarde',
          passwordLabel: 'Wachtwoord',
          passwordPlaceholder: 'Voer je wachtwoord in…',
          passwordNoToggleLabel: 'Wachtwoord (schakelaar verborgen)',
          passwordNoTogglePlaceholder: 'Geen zichtbaarheidsschakelaar',
          emailLabel: 'E-mail',
          emailPlaceholder: 'jij@voorbeeld.com',
        },
        menu: {
          openButton: 'Menu openen',
          edit: 'Bewerken',
          duplicate: 'Dupliceren',
          archive: 'Archiveren',
          delete: 'Verwijderen',
          file: 'Bestand',
          moreOptionsLabel: 'Meer opties',
          view: 'Weergeven',
          rename: 'Hernoemen',
          newItem: 'Nieuw',
          open: 'Openen',
          saveUnavailable: 'Opslaan (niet beschikbaar)',
          saveAs: 'Opslaan als',
        },
        popover: {
          openLabel: 'Popover openen',
          basicContent:
            "Een zwevend oppervlak verankerd aan zijn trigger. Gebruik het als bouwsteen voor menu's, dropdowns en aangepaste overlays.",
          placementTopLabel: 'boven',
          placementTopStartLabel: 'boven-begin',
          placementTopEndLabel: 'boven-einde',
          placementBottomLabel: 'onder',
          placementBottomStartLabel: 'onder-begin',
          placementBottomEndLabel: 'onder-einde',
          placementLeftLabel: 'links',
          placementRightLabel: 'rechts',
          placementTopContent: 'Gecentreerd boven de trigger',
          placementTopStartContent: 'Boven de trigger, uitgelijnd op de linkerrand',
          placementTopEndContent: 'Boven de trigger, uitgelijnd op de rechterrand',
          placementBottomContent: 'Gecentreerd onder de trigger',
          placementBottomStartContent: 'Onder de trigger, uitgelijnd op de linkerrand',
          placementBottomEndContent: 'Onder de trigger, uitgelijnd op de rechterrand',
          placementLeftContent: 'Gecentreerd links van de trigger',
          placementRightContent: 'Gecentreerd rechts van de trigger',
        },
        progressBar: {
          processing: 'Verwerken…',
        },
        radio: {
          appleLabel: 'Appel',
          bananaLabel: 'Banaan',
          cherryLabel: 'Kers',
          optionALabel: 'Optie A',
          optionBLabel: 'Optie B',
          subscriptionPlanLabel: 'Abonnement',
          freeLabel: 'Gratis',
          proLabel: 'Pro',
          enterpriseLabel: 'Enterprise',
          deliverySpeedLabel: 'Leversnelheid',
          deliverySpeedHint: 'Kies hoe snel je het wilt',
          standardLabel: 'Standaard',
          expressLabel: 'Express',
          accountTypeLabel: 'Accounttype',
          accountTypeError: 'Kies een accounttype',
          personalLabel: 'Persoonlijk',
          businessLabel: 'Zakelijk',
        },
        rating: {
          experienceLabel: 'Beoordeel je ervaring',
          halfStepsLabel: 'Beoordeling met halve stappen',
          halfStepsHint:
            'Klik op de linker- of rechterhelft van een ster om stappen van 0,5 in te stellen.',
          readonlyLabel: 'Gemiddelde beoordeling',
          withHintHint: 'Tik op een ster om de beoordeling in te stellen',
          withErrorText: 'Een beoordeling is vereist',
          numberOfStarsLabel: 'Beoordeel het',
          customIconLabel: 'Hoeveel houd je ervan?',
        },
        segmented: {
          viewLabel: 'Weergave',
          themeLabel: 'Thema',
          themeHint: 'Heeft invloed op de hele app',
          layoutLabel: 'Indeling',
          layoutError: 'Indelingsselectie is vereist',
          viewOptionList: 'Lijst',
          viewOptionGrid: 'Raster',
          viewOptionKanban: 'Kanban',
          themeOptionLight: 'Licht',
          themeOptionDark: 'Donker',
        },
        slider: {
          volumeLabel: 'Volume',
          brightnessLabel: 'Helderheid',
          withHintLabel: 'Met hint',
          sliderHint: 'Sleep de schuif of gebruik de pijltjestoetsen om aan te passen',
          withErrorLabel: 'Met fout',
          sliderError: 'Kies een waarde boven 50',
        },
        switch: {
          enableNotificationsLabel: 'Meldingen inschakelen',
          disabledOnLabel: 'Uitgeschakeld aan',
          confirmConsentLabel: 'Toestemming bevestigen',
          marketingEmailsLabel: 'Marketing-e-mails',
          marketingEmailsHint: 'Op elk moment uitschrijven',
          twoFactorAuthLabel: 'Tweefactorauthenticatie',
          twoFactorAuthError: 'Tweefactorauthenticatie moet zijn ingeschakeld',
        },
        tabs: {
          account: 'Account',
          accountContent: 'Inhoud accountinstellingen',
          security: 'Beveiliging',
          securityContent: 'Inhoud beveiligingsinstellingen',
          notifications: 'Meldingen',
          notificationsContent: 'Meldingsvoorkeuren',
          overview: 'Overzicht',
          overviewContent: 'Inhoud overzicht',
          analytics: 'Analyse',
          analyticsContent: 'Inhoud analyse',
          reports: 'Rapporten',
          reportsContent: 'Inhoud rapporten',
          general: 'Algemeen',
          generalContent: 'Algemene instellingen',
          billing: 'Facturering',
          billingContent: 'Factureringsgegevens',
          admin: 'Beheer',
          adminContent: 'Beheerderspaneel',
        },
        tag: {
          disabledSuccess: 'Uitgeschakeld succes',
        },
        textarea: {
          messageLabel: 'Bericht',
          messagePlaceholder: 'Voer je bericht in…',
          hintMaxCharacters: 'Maximaal 500 tekens',
          errorRequired: 'Dit veld is verplicht',
          fixedSizeLabel: 'Vaste grootte',
          fixedSizePlaceholder: 'Kan niet worden vergroot of verkleind',
          readonlyLabel: 'Alleen-lezen',
          readonlyValue: 'Alleen-lezen inhoud',
        },
        toast: {
          message: variant => {
            return `Dit is een ${variant} toast`;
          },
          segmentsLabel: 'Segmenten',
        },
        tooltip: {
          triggerLabel: '(zweef over mij)',
          templateTriggerLabel: '(hover voor een template-tooltip)',
          templateTipStatus: 'Nu online',
          topLabel: 'Boven',
          topTooltip: 'Tooltip boven',
          bottomLabel: 'Onder',
          bottomTooltip: 'Tooltip onder',
          leftLabel: 'Links',
          leftTooltip: 'Tooltip links',
          rightLabel: 'Rechts',
          rightTooltip: 'Tooltip rechts',
        },
        transferList: {
          sourceLabel: 'Beschikbaar',
          targetLabel: 'Geselecteerd',
          roleAdmin: 'Beheerder',
          roleEditor: 'Redacteur',
          roleViewer: 'Lezer',
          roleGuest: 'Gast',
          roleBilling: 'Facturering',
          roleOwner: 'Eigenaar',
        },
        virtualList: {
          row: 'Rij',
          detail: n => `Gegenereerd record #${n}`,
          scrollPosition: (first, total) =>
            `Rij ${first.toLocaleString('nl-NL')} van ${total.toLocaleString('nl-NL')} wordt getoond`,
        },
        commandPalette: {
          hint: 'Druk op Ctrl + K (of Cmd + K) om het opdrachtenpalet overal op deze pagina te openen.',
          openButton: 'Opdrachtenpalet openen',
          executedToast: label => `Uitgevoerd: ${label}`,
        },
        avatarEditorActions: {
          avatarUpdatedToast: 'Avatar bijgewerkt',
        },
      },
      playground: {
        controls: 'Bediening',
        reset: 'Resetten',
        code: 'Code',
        apiReference: 'API-referentie',
        inputs: 'Invoer',
        outputs: 'Uitvoer',
        methods: 'Methoden',
        colName: 'Naam',
        colType: 'Type',
        colDefault: 'Standaard',
        colDescription: 'Beschrijving',
        errorMessagesDescription:
          'Overschrijft het validatiebericht per foutsleutel voor een gekoppeld formulierbesturingselement; niet-ingestelde sleutels gebruiken de gelokaliseerde standaard.',
        ariaLabelDescription:
          'Toegankelijke naam aangekondigd door hulptechnologie wanneer de component geen zichtbaar label rendert.',
        triggerErrorLabel: 'Fout activeren',
        requiredBadge: 'verplicht',
        twoWayBadge: 'tweerichtings',
        rangeHint: { between: 'tot', min: 'Min', max: 'Max' },
        knobLabels: {
          timeline: { orientation: 'Oriëntatie', align: 'Uitlijning', size: 'Grootte' },
          tooltip: {
            eaTooltip: 'Tooltipinhoud',
          },
          input: {
            label: 'Label',
            placeholder: 'Plaatsaanduiding',
            size: 'Grootte',
            type: 'Type',
            disabled: 'Uitgeschakeld',
            readonly: 'Alleen-lezen',
            required: 'Verplicht',
            autofocus: 'Autofocus',
            showPasswordToggle: 'Wachtwoordschakelaar tonen',
            clearable: 'Wisbaar',
            autocomplete: 'Autocomplete',
          },
          'number-input': {
            allowNegative: 'Negatief toestaan',
            label: 'Label',
            placeholder: 'Plaatsaanduiding',
            size: 'Grootte',
            min: 'Minimum',
            max: 'Maximum',
            step: 'Stap',
            maxDigits: 'Max. cijfers',
            disabled: 'Uitgeschakeld',
            readonly: 'Alleen-lezen',
            required: 'Verplicht',
          },
          'form-field': {
            size: 'Grootte',
            label: 'Label',
            hint: 'Hint',
            required: 'Verplicht',
          },
          alert: {
            variant: 'Variant',
            dismissible: 'Sluitbaar',
            size: 'Grootte',
            icon: 'Icoon (overschrijven)',
          },
          toast: {
            icon: 'Icoon (overschrijven)',
            title: 'Titel',
          },
          avatar: {
            size: 'Grootte',
            shape: 'Vorm',
            src: 'Afbeeldingsbron',
            initials: 'Initialen',
            alt: 'Alternatieve tekst',
          },
          badge: {
            variant: 'Variant',
            size: 'Grootte',
            shape: 'Vorm',
          },
          button: {
            variant: 'Variant',
            size: 'Grootte',
            type: 'Type',
            disabled: 'Uitgeschakeld',
            loading: 'Laden',
            fullWidth: 'Volledige breedte',
          },
          card: {
            variant: 'Variant',
            padding: 'Opvulling',
            headerAlign: 'Uitlijning koptekst',
            fullWidth: 'Volledige breedte',
            headerDivider: 'Koptekstscheiding',
          },
          checkbox: {
            label: 'Label',
            count: 'Aantal',
            size: 'Grootte',
            disabled: 'Uitgeschakeld',
            required: 'Verplicht',
            indeterminate: 'Onbepaald',
          },
          'code-input': {
            size: 'Grootte',
            length: 'Lengte',
            label: 'Label',
            placeholder: 'Plaatsaanduiding',
            disabled: 'Uitgeschakeld',
            readonly: 'Alleen-lezen',
            required: 'Verplicht',
          },
          'color-picker': {
            label: 'Label',
            placeholder: 'Plaatsaanduiding',
            size: 'Grootte',
            format: 'Formaat',
            showAlpha: 'Alpha tonen',
            clearable: 'Wisbaar',
            disabled: 'Uitgeschakeld',
            readonly: 'Alleen-lezen',
            required: 'Verplicht',
          },
          divider: {
            orientation: 'Oriëntatie',
            label: 'Label',
          },
          'eagami-wordmark': {
            variant: 'Variant',
            layout: 'Indeling',
            size: 'Grootte (px)',
            linked: 'Gelinkt',
          },
          'empty-state': {
            size: 'Grootte',
            headingLevel: 'Kopniveau',
            title: 'Titel',
            description: 'Beschrijving',
          },
          paginator: {
            align: 'Uitlijnen',
            showPageSizeSelector: 'Paginagrootteselector tonen',
            showRangeLabel: 'Bereiklabel tonen',
            disabled: 'Uitgeschakeld',
            totalItems: 'Totaal aantal items',
          },
          'progress-bar': {
            variant: 'Variant',
            size: 'Grootte',
            value: 'Waarde',
            max: 'Max',
            buffer: 'Buffer',
            showPercentage: 'Percentage tonen',
            indeterminate: 'Onbepaald',
            label: 'Label',
          },
          radio: {
            label: 'Label',
            disabled: 'Uitgeschakeld',
          },
          'range-slider': {
            label: 'Label',
            hint: 'Hint',
            errorMsg: 'Foutmelding',
            min: 'Minimum',
            max: 'Maximum',
            step: 'Stap',
            size: 'Grootte',
            showValue: 'Waarde tonen',
            showMinMaxLabels: 'Min/max-labels tonen',
            disabled: 'Uitgeschakeld',
            required: 'Verplicht',
          },
          rating: {
            label: 'Label',
            size: 'Grootte',
            min: 'Minimum',
            max: 'Maximum',
            allowHalf: 'Halve stappen toestaan',
            readonly: 'Alleen-lezen',
            disabled: 'Uitgeschakeld',
            required: 'Verplicht',
            clearable: 'Wisbaar',
            iconClass: 'Icoon',
          },
          skeleton: {
            variant: 'Variant',
            animated: 'Geanimeerd',
            width: 'Breedte',
            height: 'Hoogte',
          },
          slider: {
            size: 'Grootte',
            min: 'Min',
            max: 'Max',
            step: 'Stap',
            showValue: 'Waarde tonen',
            showMinMaxLabels: 'Min/max-labels tonen',
            disabled: 'Uitgeschakeld',
            required: 'Verplicht',
            hasError: 'Fouttoestand',
            label: 'Label',
          },
          spinner: {
            size: 'Grootte',
            label: 'Label',
          },
          switch: {
            label: 'Label',
            size: 'Grootte',
            disabled: 'Uitgeschakeld',
            required: 'Verplicht',
          },
          tag: {
            variant: 'Variant',
            size: 'Grootte',
            removable: 'Verwijderbaar',
            disabled: 'Uitgeschakeld',
            removeLabel: 'Verwijderlabel',
          },
          textarea: {
            label: 'Label',
            placeholder: 'Plaatsaanduiding',
            size: 'Grootte',
            resize: 'Vergroten/verkleinen',
            maxlength: 'Max. lengte (tekens)',
            minHeight: 'Min. hoogte (px)',
            maxHeight: 'Max. hoogte (px)',
            disabled: 'Uitgeschakeld',
            readonly: 'Alleen-lezen',
            required: 'Verplicht',
          },
        },
        knobNotes: { accordion: { headingLevel: '(alleen semantisch)' } },

        descriptions: {
          timeline: {
            items: 'De weer te geven gebeurtenissen, op volgorde.',
            orientation: 'Richting waarin de tijdlijn loopt.',
            align:
              'Plaatsing van de inhoud ten opzichte van de lijn; alternate geldt alleen voor verticale tijdlijnen.',
            size: 'Visuele grootte van de tijdlijn.',
          },
          toast: {
            size: 'Visuele grootte toegepast op elke toast in de stapel.',
            position: 'Hoek of rand van de viewport waaraan de toaststapel is vastgezet.',
            clearable: 'Toon een sluitknop op elke toast.',
            show: 'Toont een toast en geeft het id ervan terug. Het bericht en de titel accepteren een gewone tekenreeks of nadruksegmenten.',
            success: 'Toont een succes-toast en geeft het id ervan terug.',
            error: 'Toont een fout-toast en geeft het id ervan terug.',
            warning: 'Toont een waarschuwings-toast en geeft het id ervan terug.',
            info: 'Toont een info-toast en geeft het id ervan terug.',
            dismiss:
              'Verwijdert de toast met het opgegeven id, als die nog zichtbaar is.',
            clear: 'Verwijdert elke toast die nu zichtbaar is.',
            pause:
              'Schort elke aftelling voor automatisch sluiten op en behoudt de resterende tijd van elke toast.',
            resume: 'Hervat de aftellingen die door pause zijn opgeschort.',
          },
          input: {
            spellcheck:
              'Waarde voor het native spellcheck-attribuut, zonder instelling geldt de standaard van de browser.',
            keepIcon:
              'Houdt het voorloopicoon zichtbaar terwijl het veld een waarde heeft; met false verschijnt het icoon alleen samen met de placeholder.',
            role: 'ARIA-rol toegepast op het native invoerveld, bijv. combobox voor een typeahead-host.',
            ariaExpanded:
              'Uitgeklapte status van een bestuurde popup, doorgegeven als aria-expanded.',
            ariaControls:
              'id van het popup-element dat het veld bestuurt, doorgegeven als aria-controls.',
            ariaActivedescendant:
              'id van de actieve optie in de bestuurde popup, doorgegeven als aria-activedescendant.',
            ariaAutocomplete:
              'Hint voor het autoaanvulgedrag, doorgegeven als aria-autocomplete.',
            label: 'Tekstlabel weergegeven boven het veld.',
            type: 'Native invoertype (password voegt een ingebouwde tonen/verbergen-schakelaar toe).',
            placeholder: 'Plaatsaanduiding die wordt getoond terwijl het veld leeg is.',
            size: 'Visuele grootte van het veld.',
            hint: 'Hulptekst onder het veld, verborgen terwijl een fout wordt getoond.',
            errorMsg:
              'Foutmelding onder het veld, die de hint vervangt en het veld als ongeldig markeert.',
            disabled: 'Schakelt het veld uit.',
            readonly: 'Maakt het veld alleen-lezen.',
            required: 'Markeert het veld als verplicht.',
            autocomplete: 'Waarde voor het native autocomplete-attribuut.',
            list: 'id van een <datalist> om te koppelen voor native suggesties.',
            autofocus: 'Focust het veld eenmaal, nadat het voor het eerst is gerenderd.',
            showPasswordToggle:
              'Toont de zichtbaarheidsschakelaar voor wachtwoordvelden.',
            clearable: 'Toont een wisknop terwijl het veld een waarde heeft.',
            id: 'id toegepast op de native input en het label for, automatisch gegenereerd indien weggelaten.',
            value: 'Huidige veldwaarde, in twee richtingen te binden via [(value)].',
            blurred: 'Wordt geactiveerd wanneer het veld de focus verliest.',
            focused: 'Wordt geactiveerd wanneer het veld de focus krijgt.',
            clear: 'Wist de huidige waarde en herstelt de focus op het veld.',
            focus: 'Verplaatst de toetsenbordfocus naar het onderliggende native veld.',
            togglePasswordVisibility:
              'Wisselt de wachtwoordzichtbaarheid voor type="password"-velden.',
            icon: 'Voorloopicooncomponent weergegeven vóór de tekst.',
            max: 'Maximumwaarde voor type="number"; de waarde wordt erop afgekapt bij blur.',
            maxLength:
              'Maximaal aantal tekens; afgedwongen voor type="number" waar native maxlength wordt genegeerd.',
            min: 'Minimumwaarde voor type="number"; de waarde wordt erop afgekapt bij blur.',
            minLength:
              'Minimaal aantal tekens, doorgegeven als het native minlength-attribuut.',
            step: 'Stapincrement voor type="number"-velden.',
            clampToBounds:
              'Kapt een numerieke waarde af binnen het ingestelde min/max-bereik zodra het bewerken klaar is.',
          },
          'number-input': {
            allowNegative:
              'Of negatieve waarden zijn toegestaan; bij false is de ondergrens 0.',
            label: 'Tekstlabel weergegeven boven het veld.',
            placeholder: 'Plaatsaanduiding die wordt getoond terwijl het veld leeg is.',
            size: 'Visuele grootte van het veld.',
            hint: 'Hulptekst onder het veld, verborgen terwijl een fout wordt getoond.',
            errorMsg:
              'Foutmelding onder het veld, die de hint vervangt en het veld als ongeldig markeert.',
            disabled: 'Schakelt het veld uit.',
            readonly: 'Maakt het veld alleen-lezen.',
            required: 'Markeert het veld als verplicht.',
            min: 'Minimumwaarde; getypte waarden worden er bij verlies van focus naartoe begrensd.',
            max: 'Maximumwaarde; getypte waarden worden er bij verlies van focus naartoe begrensd.',
            step: 'Bedrag dat elke stap met de pijltoetsen optelt of aftrekt.',
            maxDigits:
              'Beperkt hoeveel tekens het veld accepteert en hoe breed het wordt weergegeven; zes tekens als niets is ingesteld.',
            id: 'id toegepast op de native input en het label for, automatisch gegenereerd indien weggelaten.',
            value:
              'Huidige veldwaarde; null wanneer leeg, in twee richtingen te binden via [(value)].',
            changed:
              'Wordt geactiveerd met de nieuwe waarde telkens wanneer deze verandert.',
            focused: 'Wordt geactiveerd wanneer het veld de focus krijgt.',
            blurred: 'Wordt geactiveerd wanneer het veld de focus verliest.',
            focus: 'Verplaatst de toetsenbordfocus naar het onderliggende native veld.',
          },
          accordion: {
            size: 'Visuele grootte van de accordeon; elk item erft deze.',
            multi: 'Staat toe dat meerdere items tegelijk uitgevouwen blijven.',
            headingLevel:
              'Kopniveau (1-6) toegepast op elke itemkoptekst, zodat het accordeon in de paginastructuur past.',
          },
          alert: {
            dismissible:
              'Toont een sluitknop waarmee de gebruiker de melding kan sluiten.',
            variant:
              'Semantisch kleurenschema dat het icoon en palet van de melding aanstuurt.',
            visible:
              'Of de melding wordt getoond, in twee richtingen te binden via [(visible)].',
            dismissed:
              'Wordt geactiveerd wanneer de gebruiker de melding via de sluitknop sluit.',
            dismiss: 'Verbergt de melding en zendt de dismissed-gebeurtenis uit.',
            size: 'Schaalt de tekst, het icoon en de tussenruimte samen.',
            icon: 'Overschrijft het standaardstatusicoon van de variant met een willekeurige icooncomponent.',
          },
          avatar: {
            src: 'Afbeeldings-URL om te tonen; valt terug op initialen, daarna een generiek gebruikersicoon.',
            alt: 'Alternatieve tekst voor de avatarafbeelding.',
            initials:
              'Initialen die worden getoond wanneer geen afbeeldingsbron is opgegeven.',
            size: 'Diameterinstelling voor de avatar.',
            shape: 'Contour van de avatar: rond of afgerond-vierkant.',
          },
          badge: {
            variant: 'Semantisch kleurenschema van de badge.',
            size: 'Visuele grootte van de badge.',
            shape:
              'Buitenste vorm van de badge (pill sluit aan op de inhoud, pin wordt weergegeven als een cirkel voor enkele tekens).',
          },
          button: {
            variant: 'Visuele stijl van de knop, die de kleur en nadruk aanstuurt.',
            size: 'Visuele grootte van de knop.',
            type: 'Native type-attribuut toegepast op het onderliggende knopelement.',
            disabled: 'Schakelt de knop uit en onderdrukt klikgebeurtenissen.',
            loading:
              'Verwisselt het label voor een spinner met behoud van de gerenderde breedte.',
            fullWidth: 'Rekt de knop uit om de breedte van zijn container te vullen.',
            ariaLabel:
              'Toegankelijk label voor de knop wanneer de inhoud niet beschrijvend genoeg is.',
            ariaCurrent:
              'Waarde voor het native aria-current-attribuut, dat de knop markeert als het huidige item in een set.',
            clicked:
              'Wordt geactiveerd wanneer de knop wordt geactiveerd, onderdrukt terwijl uitgeschakeld of ladend.',
            icon: 'Optionele icooncomponent weergegeven links van het label.',
          },
          card: {
            variant: 'Visuele stijl van het kaartoppervlak.',
            padding: 'Opvullingsinstelling toegepast op het inhoudsgebied van de kaart.',
            headerAlign: 'Horizontale uitlijning van de koptekstinhoud.',
            fullWidth: 'Rekt de kaart uit om de beschikbare breedte te vullen.',
            headerDivider: 'Toont een scheiding tussen de koptekst en de body.',
          },
          checkbox: {
            truncate:
              'Kort een te lang label af en toont de volledige tekst in een tooltip.',
            ariaLabel:
              'Toegankelijke naam voor de checkbox wanneer geen zichtbaar label wordt weergegeven.',
            checked:
              'Huidige aangevinkte toestand, in twee richtingen te binden via [(checked)].',
            count: 'Aanvullende waarde die gedimd direct na het label wordt getoond.',
            disabled: 'Schakelt de checkbox uit.',
            errorMsg:
              'Foutmelding onder het veld, die de hint vervangt en het veld als ongeldig markeert.',
            hint: 'Hulptekst onder het veld, verborgen terwijl een fout wordt getoond.',
            id: 'id toegepast op de native input en het label for, automatisch gegenereerd indien weggelaten.',
            indeterminate: 'Geeft de checkbox visueel weer in een onbepaalde toestand.',
            label: 'Tekstlabel weergegeven naast de checkbox.',
            required: 'Markeert de checkbox als verplicht.',
            size: 'Visuele grootte van de checkbox.',
            changed:
              'Wordt geactiveerd met de nieuwe aangevinkte toestand telkens wanneer de gebruiker de checkbox omschakelt.',
          },
          'code-input': {
            disabled: 'Schakelt elke cijfercel uit.',
            errorMsg:
              'Foutmelding onder het veld, die de hint vervangt en het veld als ongeldig markeert.',
            hint: 'Hulptekst onder het veld, verborgen terwijl een fout wordt getoond.',
            id: 'id toegepast op de cijfercellen en het label for, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven boven het veld.',
            length: 'Aantal cijfercellen waaruit de code bestaat.',
            placeholder: 'Plaatsaanduidingstekst verspreid over één teken per cel.',
            readonly: 'Maakt het veld alleen-lezen.',
            required: 'Markeert het veld als verplicht.',
            size: 'Visuele grootte van elke cijfercel.',
            value: 'Huidige codewaarde, in twee richtingen te binden via [(value)].',
            completed:
              'Wordt geactiveerd met de volledige code zodra elk cijfer is ingevoerd.',
            focus:
              'Verplaatst de toetsenbordfocus naar het volgende lege cijfer (of het laatste wanneer vol).',
            allowAllChars:
              'Sta elk teken zonder witruimte toe; wanneer uit worden alleen cijfers geaccepteerd.',
          },
          'color-picker': {
            compact:
              'Toont de trigger als een kaal kleurvlak, zonder waarde en zonder wisknop.',
            disabled: 'Schakelt het veld uit.',
            errorMsg:
              'Foutmelding onder het veld, die de hint vervangt en het veld als ongeldig markeert.',
            format: 'Uitvoerformaat van de uitgezonden kleurwaarde (hex, rgb of hsl).',
            hint: 'Hulptekst onder het veld, verborgen terwijl een fout wordt getoond.',
            id: 'id toegepast op de trigger en het label for, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven boven het veld.',
            placeholder:
              'Plaatsaanduiding getoond op de trigger terwijl geen kleur is geselecteerd.',
            presets:
              'Vooraf ingestelde stalen getoond onderaan de popover; geef een lege array door om ze te verbergen.',
            readonly: 'Maakt het veld alleen-lezen, waardoor de popover niet opent.',
            required: 'Markeert het veld als verplicht.',
            showAlpha: 'Toont de alphaschuif en neemt alpha op in de uitgezonden waarde.',
            clearable: 'Of de wisknop wordt getoond wanneer er een waarde is ingesteld.',
            size: 'Visuele grootte van de kiezertrigger.',
            value: 'Huidige kleurtekst, in twee richtingen te binden via [(value)].',
            changed:
              'Wordt geactiveerd met de nieuwe kleurtekst telkens wanneer de selectie verandert.',
            cycleInputMode:
              'Wisselt de invoerrij van de popover tussen hex-tekst en RGB-kanalen.',
            hasEyeDropper: 'Geeft terug of de browser de EyeDropper-API ondersteunt.',
            onHexInput:
              'Past de getypte hex-tekst toe op de huidige kleur terwijl de gebruiker bewerkt.',
            onPopoverCloseRequested:
              'Sluit de popover wanneer de gebruiker buiten de kiezer klikt.',
          },
          divider: {
            label: 'Optioneel gecentreerd label weergegeven binnen de scheidingslijn.',
            orientation: 'Oriëntatie waarin de scheidingslijn loopt.',
            thick: 'Geeft een zwaardere lijn weer.',
          },
          'eagami-wordmark': {
            variant:
              'Inhoudsvariant: default is het kale woordmerk, byline voegt de designed-by-regel toe, tagline voegt de tagline toe.',
            layout: 'Schikt het woordmerk gestapeld over regels of inline op één regel.',
            size: 'Lettergrootte in px van de merktekst; de rest van het woordmerk schaalt daarvan.',
            linked:
              'Toont het woordmerk als link naar eagami.com; schakel uit om het in een eigen link of statische context in te bedden.',
          },
          'empty-state': {
            title: 'Koptekst weergegeven boven de beschrijving.',
            description: 'Ondersteunende tekst weergegeven onder de titel.',
            size: 'Visuele grootte van het lege-toestandsblok.',
            headingLevel:
              'Kopniveau gebruikt voor de titel zodat deze past in de omliggende documentstructuur.',
            bordered: 'Geeft een stippelkader rond het blok weer.',
            icon: 'Optionele icooncomponent weergegeven in het mediagebied boven de titel.',
          },
          paginator: {
            groupThousands:
              "Groepeert duizendtallen met komma's in het bereik en de paginanummers.",
            size: 'Visuele grootte van de paginering en de bediening.',
            align:
              'Horizontale uitlijning van de pagineringsbediening binnen hun container.',
            disabled: 'Schakelt alle pagineringsbediening uit.',
            page: 'Huidig paginanummer, in twee richtingen te binden via [(page)].',
            pageSize:
              'Aantal items getoond per pagina, in twee richtingen te binden via [(pageSize)].',
            pageSizeOptions:
              'Selecteerbare paginagroottes aangeboden in de paginagrootteselector.',
            showPageSizeSelector: 'Toont de paginagrootteselector.',
            showRangeLabel: 'Toont het label dat het zichtbare itembereik beschrijft.',
            totalItems: 'Totaal aantal items gebruikt om het paginaaantal te berekenen.',
            changed:
              'Wordt geactiveerd wanneer de gebruiker de huidige pagina of de paginagrootte wijzigt.',
            goToPage:
              'Navigeert naar de gegeven pagina, afgekapt binnen het geldige bereik.',
            nextPage: 'Navigeert naar de volgende pagina als die bestaat.',
            prevPage: 'Navigeert naar de vorige pagina als die bestaat.',
          },
          'progress-bar': {
            variant: 'Kleurvariant van de balk.',
            size: 'Visuele dikte van de balk.',
            value: 'Huidige voortgangswaarde.',
            max: 'Waarde waarbij de balk vol is.',
            buffer:
              'Gebufferde positie vóór de waarde, weergegeven in de secundaire kleur.',
            showPercentage: 'Toont het huidige percentage naast de balk.',
            indeterminate:
              'Geeft een herhalende animatie weer voor voortgang van onbekende duur.',
            label: 'Tekstlabel weergegeven boven de balk.',
          },
          radio: {
            disabled: 'Schakelt deze optie uit.',
            id: 'id toegepast op de native radio-input en het label for, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven naast de radio.',
            value:
              'Waarde die deze optie bijdraagt aan zijn bovenliggende groep wanneer geselecteerd.',
          },
          'range-slider': {
            ariaLabelHigh:
              'Toegankelijk label voor de hoge (eind)schuif, dat terugvalt op het veldlabel indien weggelaten.',
            ariaLabelLow:
              'Toegankelijk label voor de lage (begin)schuif, dat terugvalt op het veldlabel indien weggelaten.',
            disabled: 'Schakelt de slider uit.',
            errorMsg:
              'Foutmelding onder de slider, die de hint vervangt en het veld als ongeldig markeert.',
            formatValue:
              'Opmaakfunctie toegepast op elke waarde voordat deze wordt getoond.',
            hint: 'Hulptekst onder de slider, verborgen terwijl een fout wordt getoond.',
            id: 'id toegepast op de slider, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven boven de slider.',
            max: 'Hoogste waarde die elke schuif kan bereiken.',
            min: 'Laagste waarde die elke schuif kan bereiken.',
            required: 'Markeert het veld als verplicht.',
            showMinMaxLabels:
              'Toont de min- en max-grenzen aan de uiteinden van de baan.',
            showValue: 'Toont de huidige lage en hoge waarden naast de slider.',
            size: 'Visuele grootte van de baan en de schuiven.',
            step: 'Increment waarop elke schuif vastklikt bij verplaatsing.',
            value:
              'Huidige [low, high]-bereiktupel, in twee richtingen te binden via [(value)].',
            changed:
              'Wordt geactiveerd met de nieuwe [low, high]-tupel telkens wanneer een schuif beweegt.',
            commitThumb:
              'Klikt een schuif vast op de dichtstbijzijnde stap, kapt deze af binnen de grenzen en beperkt deze door de tegenovergestelde schuif.',
            groupThousands:
              'Groepeert weergegeven waarden met duizendtalscheidingstekens, genegeerd wanneer een aangepaste formatValue is opgegeven.',
            formatDisplay:
              'Maakt een waarde op voor weergave, met duizendtalgroepering tenzij een aangepaste formatValue-functie is ingesteld.',
          },
          rating: {
            allowHalf:
              'Staat granulariteit van halve sterren toe, waardoor de waarde in stappen van 0,5 kan bewegen.',
            clearable:
              'Door op de huidige waarde te klikken wordt de beoordeling teruggezet naar 0.',
            disabled: 'Schakelt de beoordeling uit.',
            errorMsg:
              'Foutmelding onder de beoordeling, die de hint vervangt en deze als ongeldig markeert.',
            halfIconClass:
              'Standalone componentklasse weergegeven voor halve posities wanneer allowHalf waar is.',
            hint: 'Hulptekst onder de beoordeling, verborgen terwijl een fout wordt getoond.',
            iconClass:
              'Standalone componentklasse weergegeven voor lege en volle posities.',
            id: 'id toegepast op de beoordeling en het label ervan, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven boven de beoordeling.',
            max: 'Hoogste beoordelingswaarde en het aantal weergegeven sterren.',
            min: 'Laagste beoordelingswaarde die de gebruiker kan selecteren.',
            readonly:
              'Geeft de beoordeling alleen ter weergave weer, en negeert klikken en toetsenbordinvoer.',
            required: 'Markeert de beoordeling als verplicht.',
            size: 'Visuele grootte van de beoordeling.',
            value:
              'Huidige beoordelingswaarde, in twee richtingen te binden via [(value)].',
            hoverChanged:
              'Wordt geactiveerd met de voorbeeldwaarde tijdens hoveren, en null wanneer de cursor vertrekt.',
            iconForState:
              'Geeft de componentklasse terug om te instantiëren voor een gegeven stertoestand.',
            stateFor:
              'Bepaalt de weergavetoestand (leeg, half of vol) voor een sterpositie.',
          },
          skeleton: {
            animated:
              'Speelt de pulserende glinsteranimatie af, automatisch onderdrukt wanneer de gebruiker gereduceerde beweging verkiest.',
            height:
              'Expliciete CSS-hoogte toegepast op de plaatshouder, standaard de intrinsieke grootte van de vorm indien weggelaten.',
            variant:
              'Voorinstelling van de plaatshouder: tekstregel, cirkel of rechthoek.',
            width:
              'Expliciete CSS-breedte toegepast op de plaatshouder, standaard de intrinsieke grootte van de vorm indien weggelaten.',
          },
          slider: {
            ariaLabel:
              'Toegankelijk label toegepast wanneer geen zichtbaar label wordt weergegeven.',
            disabled: 'Schakelt de slider uit.',
            errorMsg:
              'Foutmelding onder de slider, die de hint vervangt en het veld als ongeldig markeert.',
            formatValue:
              'Opmaakfunctie die de numerieke waarde omzet in de weergegeven tekst.',
            hasError: 'Forceert de fouttoestandsstijl zonder een foutmelding te binden.',
            hint: 'Hulptekst onder de slider, verborgen terwijl een fout wordt getoond.',
            id: 'id toegepast op de slider en het label ervan, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven boven de slider.',
            max: 'Hoogste waarde die de slider kan bereiken.',
            min: 'Laagste waarde die de slider kan bereiken.',
            required: 'Markeert de slider als verplicht.',
            showMinMaxLabels: 'Toont de min- en max-grenzen onder de baan.',
            showValue: 'Toont de huidige waarde naast het label.',
            size: 'Visuele grootte van de baan en de schuif van de slider.',
            step: 'Increment waarop de waarde vastklikt naarmate de slider beweegt.',
            value: 'Huidige sliderwaarde, in twee richtingen te binden via [(value)].',
            changed:
              'Wordt geactiveerd met de nieuwe vastgeklikte waarde telkens wanneer de slider beweegt.',
            groupThousands:
              'Groepeert weergegeven waarden met duizendtalscheidingstekens, genegeerd wanneer een aangepaste formatValue is opgegeven.',
            formatDisplay:
              'Maakt een waarde op voor weergave, met duizendtalgroepering tenzij een aangepaste formatValue-functie is ingesteld.',
          },
          spinner: {
            label:
              'Toegankelijk label aangekondigd aan hulptechnologie, dat terugvalt op de vertaling van de actieve taal indien niet ingesteld.',
            size: 'Visuele grootte van de spinner.',
          },
          switch: {
            ariaLabel:
              'Toegankelijk label voor de switch wanneer geen zichtbaar label wordt weergegeven.',
            checked:
              'Huidige aan/uit-toestand, in twee richtingen te binden via [(checked)].',
            disabled: 'Schakelt de switch uit en blokkeert omschakelen.',
            errorMsg:
              'Foutmelding onder de switch, die de hint vervangt en het veld als ongeldig markeert.',
            hint: 'Hulptekst onder de switch, verborgen terwijl een fout wordt getoond.',
            id: 'id toegepast op de onderliggende checkbox en het label for, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven naast de switch.',
            required: 'Markeert de switch als verplicht.',
            size: 'Visuele grootte van de switch.',
            changed:
              'Wordt geactiveerd met de nieuwe aangevinkte toestand telkens wanneer de gebruiker de switch omschakelt.',
          },
          tag: {
            color:
              'Vulkleur als hexwaarde, die de chip kleurt en de best leesbare tekstkleur kiest.',
            variant: 'Semantisch kleurenschema van de tag.',
            size: 'Visuele grootte van de tag.',
            maxWidth:
              'Maximale breedte van de tag in px; een langer label wordt afgekapt. Ook instelbaar als --ea-tag-max-width.',
            tooltip:
              'Waar een door maxWidth afgekapt label zijn volledige tekst toont: boven of onder de tag, of none om het te onderdrukken.',
            removable:
              'Geeft een verwijderknop weer die removed uitzendt wanneer geactiveerd.',
            disabled: 'Schakelt de tag en de verwijderknop uit.',
            removeLabel:
              'Toegankelijk label voor de verwijderknop, dat terugvalt op de actieve taal.',
            removeTabbable:
              'Of de verwijderknop een tabstop is; zet dit op false binnen een samengestelde widget die zelf de toetsenbordnavigatie regelt.',
            removed:
              'Wordt geactiveerd wanneer de gebruiker de verwijderknop op een verwijderbare tag activeert.',
          },
          textarea: {
            disabled: 'Schakelt het veld uit.',
            errorMsg:
              'Foutmelding onder het veld, die de hint vervangt en het veld als ongeldig markeert.',
            hint: 'Hulptekst onder het veld, verborgen terwijl een fout wordt getoond.',
            id: 'id toegepast op de native textarea en het label for, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven boven het veld.',
            maxHeight:
              'Pixelplafond voor de hoogte van het veld; daarboven scrollt de textarea verticaal in plaats van te groeien.',
            minHeight: 'Minimumhoogte in px; nooit minder dan de standaardhoogte.',
            maxlength: 'Maximaal aantal tekens dat het veld accepteert.',
            placeholder: 'Plaatsaanduiding die wordt getoond terwijl het veld leeg is.',
            readonly: 'Maakt het veld alleen-lezen.',
            required: 'Markeert het veld als verplicht.',
            resize: 'As waarlangs de gebruiker het veld kan vergroten of verkleinen.',
            size: 'Visuele grootte van het veld.',
            value: 'Huidige veldwaarde, in twee richtingen te binden via [(value)].',
            blurred: 'Wordt geactiveerd wanneer het veld de focus verliest.',
            focused: 'Wordt geactiveerd wanneer het veld de focus krijgt.',
            focus:
              'Verplaatst de toetsenbordfocus naar de onderliggende native textarea.',
          },
          'avatar-editor': {
            accept:
              'Geaccepteerde MIME-types voor de bestandskiezer, doorgegeven aan de native input.',
            canvasSize: 'Pixelbreedte en -hoogte van het vierkante bijsnijdcanvas.',
            cropState:
              'Begintoestand voor pannen/zoomen om te herstellen wanneer een bronafbeelding wordt geladen.',
            currentSrc:
              'URL van de afbeelding om bij initialisatie in de editor te laden.',
            exportQuality:
              'JPEG/WebP-kwaliteit gebruikt bij het exporteren van de bijgesneden afbeelding, tussen 0 en 1.',
            exportType:
              'MIME-type van de geëxporteerde afbeeldingsblob (bijv. image/png of image/jpeg).',
            loading: 'Toont een skeletoverlay terwijl een externe bron wordt geladen.',
            maxFileSize:
              'Maximaal toegestane bestandsgrootte in bytes; bestanden boven deze limiet zenden errored uit.',
            maxZoom: 'Maximale zoomvermenigvuldiger die de gebruiker kan bereiken.',
            minZoom: 'Minimale zoomvermenigvuldiger die de gebruiker kan bereiken.',
            shape:
              'Bijsnijdmaskervorm toegepast op het canvas en de geëxporteerde afbeelding.',
            cropped:
              'Wordt geactiveerd wanneer de gebruiker een bijsnede exporteert, en levert zowel een Blob als een data-URL.',
            cropStateChanged:
              'Wordt geactiveerd telkens wanneer de gebruiker de afbeelding pant of zoomt, handig voor het bewaren van de bewerkingstoestand.',
            errored:
              'Wordt geactiveerd met een leesbare melding wanneer bestandsvalidatie mislukt.',
            fileSelected:
              'Wordt geactiveerd wanneer een bestand van schijf wordt gekozen of op de editor wordt neergezet.',
            removed:
              'Wordt geactiveerd wanneer de huidige afbeelding via de verwijderbediening wordt gewist.',
            captureOriginal:
              'Markeert de huidige afbeelding en bijsnijdtoestand als de basislijn voor revertImage.',
            exportCrop:
              'Rendert de huidige bijsnede naar een offscreen canvas, zendt cropped uit en lost op met de Blob.',
            openFilePicker: 'Opent het native bestandskiezerdialoog.',
            removeImage:
              'Wist de geladen afbeelding en zet pannen en zoomen terug op de standaardwaarden.',
            revertImage:
              'Herstelt de afbeelding en bijsnijdtoestand vastgelegd door de meest recente captureOriginal-aanroep.',
            setZoom:
              'Stelt het zoomniveau in, afgekapt binnen het ingestelde minZoom- en maxZoom-bereik.',
            updateImageDarkness:
              'Bemonstert het zichtbare bijsnijdgebied om te bepalen of de afbeelding donkerder is dan middengrijs.',
          },
          'menu-trigger': {
            menu: 'De ea-menu-instantie die deze trigger bedient.',
          },
          tooltip: {
            whenClipped:
              'Toont de ballon alleen zolang de trigger zijn eigen inhoud afkapt.',
            flip: 'Verplaatst een ballon naar de andere kant wanneer er aan de gevraagde kant geen ruimte is.',
            maxWidth:
              'Maximumbreedte in pixels; de tekst breekt af bij deze breedte (ondergrens van 50px). De tooltip wordt nooit groter dan de viewport.',
            dismissDelay:
              'Vertraging in milliseconden voordat een scrollbare tooltip verdwijnt nadat de muisaanwijzer weggaat, lang genoeg om ernaartoe te bewegen. Tooltips die passen verdwijnen meteen.',
            eaTooltip:
              'Inhoud van de tooltip getoond bij hoveren en toetsenbordfocus. Accepteert een gewone tekst of een TemplateRef voor opgemaakte inhoud.',
            tooltipPosition: 'Plaatsing van de tooltip ten opzichte van het hostelement.',
          },
          'time-picker': {
            disabled: 'Schakelt de kiezer uit.',
            errorMsg:
              'Foutmelding onder het veld, die de hint vervangt en het veld als ongeldig markeert.',
            format:
              'Weergaveformaat van het triggerlabel; de wire-waarde is altijd 24-uurs.',
            hint: 'Hulptekst onder het veld, verborgen terwijl een fout wordt getoond.',
            id: 'id toegepast op de trigger en het label for, automatisch gegenereerd indien weggelaten.',
            includeSeconds: 'Toont een secondenkolom naast uren en minuten.',
            label: 'Tekstlabel weergegeven boven het veld.',
            minuteStep:
              'Increment waarop de minutenkolom vastklikt bij stappen of slepen.',
            placeholder:
              'Plaatsaanduiding getoond op de trigger terwijl geen tijd is geselecteerd.',
            readonly: 'Maakt het veld alleen-lezen, waardoor de popover niet opent.',
            required: 'Markeert het veld als verplicht.',
            secondStep:
              'Increment waarop de secondenkolom vastklikt bij stappen of slepen.',
            size: 'Visuele grootte van de kiezertrigger.',
            value:
              'Huidige tijdtekst in HH:MM of HH:MM:SS (24-uurs), in twee richtingen te binden via [(value)], of null indien niet ingesteld.',
            changed:
              'Wordt geactiveerd met de nieuwe tijdtekst telkens wanneer de gebruiker de geselecteerde tijd wijzigt.',
            advanceFocus:
              'Verplaatst de focus naar de volgende eenheidskolom nadat een cijferinvoer is voltooid.',
            cannotExtend:
              'Geeft true terug wanneer geen extra cijfer de huidige buffer voor de gegeven eenheid geldig kan uitbreiden.',
            commitDigits:
              'Parseert de gebufferde cijfertekst, kapt deze af binnen het geldige bereik van de eenheid en schrijft deze naar de waarde.',
            flushBuffer: 'Legt elke openstaande getypte-cijferbuffer vast en wist deze.',
            focusHoursWhenReady:
              'Focust de ureninvoer zodra het popoveroppervlak naar de DOM is gerenderd.',
            hoursFromTyped:
              'Zet een getypte urenwaarde om naar het 24-uurs equivalent, rekening houdend met de huidige AM/PM-periode.',
            onPopoverCloseRequested:
              'Sluit de popover wanneer de gebruiker buiten de kiezer klikt.',
            onSpinnerBlur:
              'Legt elke openstaande cijferbuffer vast wanneer een spinnerkolom de focus verliest.',
            onSpinnerFocus:
              'Selecteert alle tekst in een spinnerkolom wanneer deze de focus krijgt zodat de eerste toetsaanslag deze vervangt.',
            onSpinnerInput:
              'Verwerkt cijferinvoer in een spinnerkolom, werkt de buffer bij en verplaatst de focus automatisch wanneer de kolom vol is.',
            startHold:
              'Begint een herhaling bij lang indrukken op een chevronknop, die de gegeven eenheid stapt en na een vertraging versnelt.',
            step: 'Stapt de gegeven eenheidskolom met één ingesteld increment omhoog of omlaag.',
            stopHold: 'Annuleert alle lopende herhalingstimers van lang indrukken.',
            togglePeriod:
              'Wisselt de AM/PM-periode in de 12-uursmodus door de 12-uursverschuiving om te schakelen.',
          },
          autocomplete: {
            disabled: 'Schakelt het veld uit.',
            emptyMessage:
              'Melding getoond in de lijst wanneer geen opties overeenkomen met de huidige invoer, die terugvalt op de vertaling van de actieve taal indien weggelaten.',
            errorMsg:
              'Foutmelding onder het veld, die de hint vervangt en het veld als ongeldig markeert.',
            hint: 'Hulptekst onder het veld, verborgen terwijl een fout wordt getoond.',
            id: 'id toegepast op de native input en het label for, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven boven het veld.',
            maxResults:
              'Maximaal aantal opties dat tegelijk in de suggestielijst wordt getoond.',
            minLength:
              'Minimaal aantal tekens vereist voordat de suggestielijst verschijnt.',
            options:
              'Volledige lijst van opties beschikbaar voor filteren en selecteren, plat of opgesplitst in groepen.',
            placeholder: 'Plaatsaanduiding die wordt getoond terwijl het veld leeg is.',
            readonly: 'Maakt het veld alleen-lezen.',
            required: 'Markeert het veld als verplicht.',
            size: 'Visuele grootte van het veld.',
            value: 'Huidige veldwaarde, in twee richtingen te binden via [(value)].',
            blurred: 'Wordt geactiveerd wanneer de input de focus verliest.',
            changed:
              'Wordt geactiveerd telkens wanneer de invoertekst verandert, ook bij vrije-tekstbewerkingen.',
            focused: 'Wordt geactiveerd wanneer de input de focus krijgt.',
            selected:
              'Wordt geactiveerd wanneer de gebruiker een optie uit de suggestielijst kiest.',
            close: 'Sluit de suggestielijst zonder de huidige waarde te wijzigen.',
            focus: 'Verplaatst de toetsenbordfocus naar de onderliggende tekstinvoer.',
            selectOption:
              'Selecteert programmatisch de gegeven optie, werkt de waarde bij en sluit de lijst.',
          },
          'command-palette': {
            disabledWhen:
              'Optioneel predicaat dat elk item uitschakelt waarvoor het true retourneert, naast de eigen disabled-vlag van elk item.',
            emptyMessage:
              'Melding getoond wanneer de zoekopdracht met geen enkel item overeenkomt, die terugvalt op de vertaling van de actieve taal indien weggelaten.',
            items:
              'Volledige lijst van opdrachtitems beschikbaar voor zoeken en uitvoeren.',
            open: 'Of het paletdialoog open is, in twee richtingen te binden via [(open)].',
            placeholder:
              'Plaatsaanduiding getoond binnen de zoekinput terwijl deze leeg is.',
            execute:
              'Wordt geactiveerd wanneer de gebruiker een opdracht selecteert, en zendt het gekozen item uit.',
            showActiveHighlight:
              'Geeft terug of de actieve rij zijn gemarkeerde achtergrond moet weergeven voor de gegeven platte index.',
          },
          tabs: {
            activeTab:
              'Waarde van het momenteel actieve tabblad, in twee richtingen te binden via [(activeTab)].',
            size: 'Visuele grootte van de tabbladen.',
            variant: 'Visuele stijl van de tabbalk: onderstreping of gevuld.',
            changed:
              'Wordt geactiveerd met de waarde van het nieuw actieve tabblad telkens wanneer het actieve tabblad verandert.',
            registerTab:
              'Registreert een onderliggend tabblad zodat het in de tabbalk verschijnt; automatisch aangeroepen door ea-tab.',
            selectTab: 'Activeert programmatisch het tabblad met de gegeven waarde.',
            unregisterTab:
              'Verwijdert een eerder geregistreerd onderliggend tabblad; automatisch aangeroepen door ea-tab.',
          },
          tab: {
            disabled:
              'Schakelt dit tabblad uit, waardoor de gebruiker het niet kan selecteren.',
            id: 'id toegepast op de tabknop en het paneel ervan, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel getoond op de tabknop.',
            value:
              'Unieke waarde die dit tabblad identificeert binnen zijn bovenliggende ea-tabs-groep.',
          },
          'date-picker': {
            disabled: 'Schakelt de datumkiezer uit.',
            errorMsg:
              'Foutmelding onder het veld, die de hint vervangt en het veld als ongeldig markeert.',
            format: 'Weergaveformaat van de geselecteerde datum (kort, middel of lang).',
            hint: 'Hulptekst onder het veld, verborgen terwijl een fout wordt getoond.',
            id: 'id toegepast op het veld en het label for, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven boven het veld.',
            locale:
              'BCP 47-taaltag gebruikt voor datumopmaak, die terugvalt op de globale taal indien weggelaten.',
            maxDate:
              'Laatste datum die de gebruiker kan selecteren; datums hierna zijn uitgeschakeld in de kalender.',
            minDate:
              'Vroegste datum die de gebruiker kan selecteren; datums hiervoor zijn uitgeschakeld in de kalender.',
            placeholder:
              'Plaatsaanduiding getoond in het veld terwijl geen datum is geselecteerd.',
            readonly: 'Maakt het veld alleen-lezen, waardoor de kalender niet opent.',
            required: 'Markeert het veld als verplicht.',
            size: 'Visuele grootte van het datumkiezerveld.',
            value:
              'Huidige geselecteerde datum, in twee richtingen te binden via [(value)].',
            weekStartsOn:
              'Eerste dag van de week in het kalenderraster (0 voor zondag, 1 voor maandag).',
            changed:
              'Wordt geactiveerd wanneer de geselecteerde datum verandert, ook bij wissen.',
            clear: 'Wist de geselecteerde datum en zendt changed uit met null.',
            close: 'Sluit de kalenderpopover.',
            focus: 'Verplaatst de toetsenbordfocus naar het datumveld.',
            onPopoverCloseRequested:
              'Sluit de popover wanneer de gebruiker buiten de datumkiezer klikt.',
            open: 'Opent de kalenderpopover en verplaatst de focus naar de gefocuste dagcel.',
            toggle: 'Wisselt de kalenderpopover tussen open en gesloten.',
          },
          menu: {
            size: 'Visuele grootte van het menu; elk item erft deze.',
            maxHeight:
              "Maximale hoogte van de scrollbare lijst als CSS-lengte; hogere menu's scrollen daarbuiten.",
            ariaLabel:
              'Toegankelijk label voor de menulijst, dat terugvalt op de actieve taal indien weggelaten.',
            disabled: 'Schakelt het menu uit, waardoor het niet kan openen.',
            id: 'id toegepast op het menulijstelement, automatisch gegenereerd indien weggelaten.',
            open: 'Of het menu open is, in twee richtingen te binden via [(open)].',
            placement: 'Plaatsing van de menulijst ten opzichte van het triggerelement.',
            closed: 'Wordt geactiveerd wanneer het menu sluit.',
            opened: 'Wordt geactiveerd wanneer het menu opent.',
            close:
              'Sluit het menu en herstelt optioneel de focus naar het triggerelement.',
            focusFirstItem:
              'Verplaatst de toetsenbordfocus naar het eerste ingeschakelde item in het menu.',
            onPopoverCloseRequested:
              'Sluit het menu wanneer de gebruiker erbuiten klikt.',
            openAt:
              'Opent het menu verankerd aan het gegeven triggerelement en focust het eerste item.',
            toggleAt:
              'Wisselt de openstaande toestand van het menu en verankert het aan het gegeven triggerelement.',
          },
          'menu-item': {
            disabled: 'Schakelt het item uit en onderdrukt klikgebeurtenissen.',
            variant:
              'Visuele stijl van het item; gebruik danger voor destructieve acties.',
            clicked:
              'Wordt geactiveerd wanneer het item wordt geactiveerd; het bovenliggende menu sluit onmiddellijk daarna.',
          },
          'multi-select': {
            created:
              'Wordt met de getypte tekst gemeld wanneer de aanmaakrij wordt gekozen.',
            allowCreate:
              'Biedt een aanmaakrij aan wanneer de zoektekst met geen enkele optie overeenkomt.',
            disabled: 'Schakelt de multi-select uit.',
            errorMsg:
              'Foutmelding onder het veld, die de hint vervangt en het veld als ongeldig markeert.',
            hint: 'Hulptekst onder het veld, verborgen terwijl een fout wordt getoond.',
            id: 'id toegepast op de trigger en het label for, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven boven het veld.',
            maxVisibleChips:
              'Maximaal aantal chips getoond in de trigger voordat de rest samenklapt tot een aantalpil.',
            maxChipWidth:
              'Maximale breedte van een geselecteerde-waardechip in px; een langer label wordt afgekapt en toont zijn volledige tekst in een tooltip.',
            popoverMaxWidth:
              'Maximale breedte van de optiepopover in px, of anchor om deze op de veldbreedte te houden.',
            options:
              'Lijst van selecteerbare opties weergegeven in de dropdownlijst, plat of opgesplitst in groepen.',
            placeholder:
              'Plaatsaanduiding getoond op de trigger terwijl geen optie is geselecteerd.',
            readonly: 'Maakt het veld alleen-lezen.',
            required: 'Markeert het veld als verplicht.',
            searchable: 'Toont de zoekinput bovenaan de popover.',
            searchPlaceholder:
              'Plaatsaanduiding getoond binnen de zoekinput wanneer de zoekterm leeg is.',
            selectAll:
              'Toont de drietoestands alles-selecteren-rij bovenaan de optielijst.',
            size: 'Visuele grootte van de multi-select-trigger.',
            value:
              'Geselecteerde optiewaarden, in twee richtingen te binden via [(value)].',
            changed:
              'Wordt geactiveerd met de nieuwe waarde telkens wanneer de selectie verandert.',
            clear: 'Wist elke selectie en stopt de gebeurtenis van propageren.',
            handlePopoverKeydown:
              'Verwerkt toetsenbordnavigatie binnen de open popover, en routeert pijltjestoetsen, Enter, Spatie en Escape.',
            onPopoverCloseRequested:
              'Aangeroepen door de popover wanneer de gebruiker erbuiten klikt of scrollt; sluit het paneel en markeert het veld als aangeraakt.',
            orderedValues:
              'Geeft de gegeven waardenset opnieuw geordend terug zodat deze overeenkomt met de invoeroptie-array.',
            removeChip: 'Verwijdert de gegeven optie uit de huidige selectie.',
            toggleOption:
              'Wisselt het lidmaatschap van de gegeven optie in de huidige selectie.',
            toggleSelectAll:
              'Selecteert alle gefilterde opties als er ongeselecteerde zijn, of deselecteert alle gefilterde opties als ze allemaal geselecteerd zijn.',
          },
          dropdown: {
            disabled: 'Schakelt de dropdown uit.',
            errorMsg:
              'Foutmelding onder het veld, die de hint vervangt en het veld als ongeldig markeert.',
            hint: 'Hulptekst onder het veld, verborgen terwijl een fout wordt getoond.',
            id: 'id toegepast op de trigger en het label for, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven boven het veld.',
            options:
              'Lijst van selecteerbare opties weergegeven in de dropdownlijst, plat of opgesplitst in groepen.',
            placeholder:
              'Plaatsaanduiding getoond op de trigger terwijl geen optie is geselecteerd.',
            readonly: 'Maakt het veld alleen-lezen.',
            required: 'Markeert het veld als verplicht.',
            size: 'Visuele grootte van de dropdowntrigger.',
            value:
              'Huidige geselecteerde waarde, in twee richtingen te binden via [(value)].',
            changed:
              'Wordt geactiveerd met de nieuwe waarde wanneer de gebruiker een optie selecteert.',
            close: 'Sluit de dropdownlijst zonder de huidige waarde te wijzigen.',
            focus: 'Verplaatst de toetsenbordfocus naar de dropdowntrigger.',
            onPopoverCloseRequested:
              'Aangeroepen door de popover wanneer de gebruiker buiten de dropdown klikt; sluit het paneel en markeert het veld als aangeraakt.',
            select: 'Selecteert programmatisch de gegeven optie en sluit de lijst.',
            toggle: 'Wisselt de dropdownlijst tussen open en gesloten.',
          },
          'file-uploader': {
            accept:
              "Door komma's gescheiden MIME-types en bestandsextensies die de dropzone accepteert, bijv. 'image/*,.pdf'.",
            disabled: 'Schakelt de uploader uit.',
            errorMsg:
              'Foutmelding onder het veld, die de hint vervangt en het veld als ongeldig markeert.',
            hint: 'Hulptekst onder het veld, verborgen terwijl een fout wordt getoond.',
            id: 'id toegepast op de dropzone en het label for, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven boven het veld.',
            maxFiles:
              'Maximaal totaal aantal bestanden; bestanden boven de limiet worden geweigerd.',
            maxSize:
              'Maximale grootte per bestand in bytes; grotere bestanden worden geweigerd.',
            multiple: 'Staat het selecteren van meer dan één bestand tegelijk toe.',
            progress:
              'Uploadvoortgangskaart per bestand (0-100) op basis van File-identiteit; weglaten om voortgangsbalken te verbergen.',
            required: 'Markeert het veld als verplicht.',
            showFileList: 'Toont de lijst van geselecteerde bestanden onder de dropzone.',
            size: 'Visuele grootte van de uploader.',
            value: 'Huidige bestandslijst, in twee richtingen te binden via [(value)].',
            fileRemoved:
              'Wordt geactiveerd wanneer een bestand via de verwijderknop van de rij wordt verwijderd.',
            dragOverChanged:
              'Vuurt wanneer een sleepactie de dropzone binnenkomt of verlaat, voor een wrapper die zijn eigen sleepstijl bijhoudt.',
            rejected:
              'Wordt geactiveerd wanneer een of meer bestanden de validatie niet doorstaan, met de reden voor elke weigering.',
            trackFile:
              'Geeft een stabiele tracksleutel voor een bestand terug, intern gebruikt door de bestandslijst.',
          },
          'form-field': {
            size: 'Visuele grootte van het veld; het label, de tekst van het besturingselement, de afstanden en de meldingen schalen mee.',
            errorMsg:
              'Foutmelding onder het besturingselement, die de hint vervangt en het veld als ongeldig markeert.',
            hint: 'Hulptekst onder het besturingselement, verborgen terwijl een fout wordt getoond.',
            id: 'id-basis voor de koppeling van label en meldingen, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven boven het besturingselement.',
            required: 'Markeert het veld als verplicht.',
          },
          popover: {
            anchor:
              'Hostelement of ElementRef waartegen de popover zichzelf positioneert.',
            ariaLabel:
              'Toegankelijk label voor het popoveroppervlak; geef er een op wanneer de popover geen zichtbare koptekst bevat.',
            ariaLabelledby:
              'Id van het element dat het popoveroppervlak labelt, doorgegeven als aria-labelledby.',
            clamp:
              'Kapt de popover binnen de viewport af wanneer deze anders zou overlopen.',
            closeOnEscape: 'Sluit de popover wanneer op Escape wordt gedrukt.',
            closeOnOutsideClick:
              'Sluit de popover wanneer de gebruiker buiten zowel de popover als zijn anchor klikt.',
            flip: 'Klapt naar de tegenovergestelde zijde wanneer de gevraagde plaatsing de viewport overloopt.',
            matchAnchorWidth:
              'Stelt de min-width van de popover in om overeen te komen met de breedte van de anchor.',
            maxWidth:
              'Maximale breedte van het oppervlak in px, of anchor om het te beperken tot de breedte van het ankerelement.',
            offset: 'Tussenruimte in px tussen de anchor en het popoveroppervlak.',
            open: 'Of de popover momenteel open is.',
            placement: 'Voorkeurspositie van de popover ten opzichte van zijn anchor.',
            role: 'ARIA-rol toegepast op het popoveroppervlak.',
            scrollBehavior:
              'Hoe de popover reageert op scroll- en formaatwijzigingsgebeurtenissen terwijl open: herpositioneren, sluiten of negeren.',
            surfaceId:
              'DOM-id voor het popoveroppervlak, gebruikt door triggerelementen via aria-controls.',
            trapFocus:
              'Laat Tab en Shift+Tab binnen het oppervlak blijven rondgaan terwijl open, voor popovers in dialoogstijl.',
            closeRequested:
              'Wordt geactiveerd wanneer de popover verzoekt te worden gesloten; de ouder moet dit spiegelen naar [open].',
          },
          'accordion-item': {
            disabled: 'Schakelt dit item uit, waardoor het niet kan worden omgeschakeld.',
            id: 'id toegepast op de koptekstknop en het paneel van het item, automatisch gegenereerd indien weggelaten.',
            label: 'Tekst getoond in de koptekstknop van het item.',
            value:
              'Unieke sleutel die dit item identificeert binnen zijn bovenliggende accordion.',
          },
          breadcrumbs: {
            size: 'Visuele grootte van het broodkruimelpad.',
            ariaLabel:
              'Toegankelijk label voor de broodkruimelnavigatie, dat terugvalt op de vertaling van de actieve taal indien weggelaten.',
            items:
              'Array van broodkruimelitems; items met een href worden weergegeven als links, andere als knoppen, en de laatste is niet-interactief.',
            separator:
              'Visuele stijl van het scheidingsteken weergegeven tussen broodkruimelitems.',
            clicked:
              'Wordt geactiveerd wanneer een niet-uitgeschakelde, niet-laatste broodkruimel wordt geactiveerd.',
          },
          drawer: {
            animation:
              'Schuifanimatie terwijl de lade opent en sluit: none (direct), linear (constante snelheid) of eased (een ease-out-curve).',
            ariaLabel:
              'Toegankelijk label voor het ladepaneel wanneer de koptekst niet beschrijvend genoeg is.',
            closeOnBackdrop:
              'Sluit de lade wanneer de gebruiker op de achtergrond klikt.',
            closeOnEscape: 'Sluit de lade wanneer de gebruiker op de Escape-toets drukt.',
            id: 'id toegepast op het dialoogelement, automatisch gegenereerd indien weggelaten.',
            mode: 'Hoe de lade zich tot de pagina verhoudt: overlay zweeft over een gedimde pagina waarin de focus wordt vastgehouden, terwijl push niet-modaal opent en de pagina-inhoud opzij herschikt.',
            open: 'Of de lade open is, in twee richtingen te binden via [(open)].',
            position: 'Rand van de viewport vanwaar de lade naar binnen schuift.',
            pushTarget:
              'Element waarvan de inhoud in de push-modus opzij wordt geschoven, als CSS-selector of elementreferentie; standaard de document-body.',
            showClose: 'Toont de sluitknop in de ladekoptekst.',
            size: 'Omvang van het ladepaneel langs zijn hoofdas: breedte voor zijladen, hoogte voor boven- en onderladen.',
            closed:
              'Wordt geactiveerd wanneer de lade sluit, of dat nu via de sluitknop, achtergrond of Escape is.',
            opened: 'Wordt geactiveerd zodra de lade is getoond.',
          },
          'data-table': {
            size: 'Visuele grootte van de tabel; dichtheidsopvulling en pictogrammen schalen mee.',
            clickable:
              'Markeert gegevensrijen als klikbaar: toont een aanwijzer en activeert rowActivate bij klik of Enter/Spatie.',
            rowActivate:
              'Wordt geactiveerd met de rijgegevens wanneer een klikbare rij via klik of toetsenbord wordt geactiveerd.',
            navigable:
              'Maakt van de tabel een met het toetsenbord navigeerbaar raster met verplaatsbare focus en celbeweging via de pijltoetsen.',
            bordered: 'Geeft een rand rond elke cel weer.',
            caption:
              'Zichtbaar bijschrift boven de tabel; benoemt deze ook voor hulptechnologie.',
            columns:
              'Kolomdefinities die de sleutel, het label en optionele sortering of template van elk veld beschrijven.',
            data: 'Array van rij-objecten om in de tabel te tonen.',
            density:
              'Voorinstelling voor verticale dichtheid die de opvulling van rij- en koptekstcellen regelt.',
            hoverable: 'Markeert de rij onder de aanwijzer bij hoveren.',
            noDataText:
              'Tekst getoond in de lege toestand, die terugvalt op de vertaling van de actieve taal.',
            sort: 'Huidige sorteertoestand (kolomsleutel en richting), in twee richtingen te binden via [(sort)].',
            stickyHeader:
              'Zet de koptekstrij vast bovenaan de tabel wanneer de inhoud scrollt.',
            striped:
              'Past afwisselende achtergrondschaduwing toe op oneven en even rijen.',
            trackBy:
              'Rij-eigenschapssleutel gebruikt door de wijzigingsdetectie van Angular om rijen efficiënt te identificeren.',
            sorted:
              'Wordt geactiveerd telkens wanneer de sorteerkolom of -richting verandert via een koptekstklik.',
          },
          'radio-group': {
            ariaLabel:
              'Toegankelijk label voor de groep wanneer geen zichtbaar label wordt weergegeven.',
            disabled: 'Schakelt alle radio-opties in de groep uit.',
            errorMsg:
              'Foutmelding onder de groep, die de hint vervangt en het veld als ongeldig markeert.',
            hint: 'Hulptekst onder de groep, verborgen terwijl een fout wordt getoond.',
            id: 'id toegepast op het groepselement en het label for ervan, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven boven de groep.',
            name: 'Gedeeld name-attribuut toegepast op alle radio-inputs in de groep, automatisch gegenereerd indien weggelaten.',
            orientation: 'Indelingsrichting van de radio-opties binnen de groep.',
            required: 'Markeert de groep als verplicht.',
            size: 'Visuele grootte toegepast op alle radio-opties in de groep.',
            value:
              'Momenteel geselecteerde waarde, in twee richtingen te binden via [(value)].',
            changed:
              'Wordt geactiveerd met de nieuwe waarde wanneer de gebruiker een optie selecteert.',
            select: 'Selecteert programmatisch de optie met de gegeven waarde.',
          },
          segmented: {
            ariaLabel:
              'Toegankelijk label voor de bediening wanneer geen zichtbaar label wordt weergegeven.',
            disabled: 'Schakelt de segmented control uit.',
            errorMsg:
              'Foutmelding onder het veld, die de hint vervangt en het veld als ongeldig markeert.',
            fullWidth:
              'Rekt de bediening uit om de breedte van zijn container te vullen.',
            hint: 'Hulptekst onder het veld, verborgen terwijl een fout wordt getoond.',
            id: 'id toegepast op de bediening en het label for, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel weergegeven boven de bediening.',
            options:
              'Array van opties weergegeven als schakelknoppen binnen de bediening.',
            required: 'Markeert het veld als verplicht.',
            size: 'Visuele grootte van de segmented control.',
            value:
              'Momenteel geselecteerde optiewaarde, in twee richtingen te binden via [(value)].',
            changed:
              'Wordt geactiveerd met de nieuwe waarde wanneer de gebruiker een andere optie selecteert.',
            select: 'Selecteert programmatisch de gegeven optie.',
          },
          tree: {
            ariaLabel: 'Toegankelijk label voor de boomwidget.',
            disabled: 'Schakelt alle nodes in de boom uit.',
            expandedIds:
              "Id's van momenteel uitgevouwen takknooppunten, in twee richtingen te binden via [(expandedIds)].",
            nodes: 'Array van boomnode-data-objecten die de hiërarchie definieert.',
            selectedId:
              'Id van de momenteel geselecteerde node, in twee richtingen te binden via [(selectedId)].',
            size: 'Visuele grootte van de boom, die tekst en witruimte proportioneel schaalt.',
            nodeClick:
              'Wordt geactiveerd met de nodedata wanneer de gebruiker een node selecteert.',
          },
          step: {
            completed: 'Markeert de stap als voltooid en werkt de visuele indicator bij.',
            disabled: 'Voorkomt dat de stap kan worden geactiveerd.',
            id: 'id toegepast op het stappaneel en het tabblad ervan, automatisch gegenereerd indien weggelaten.',
            label: 'Tekstlabel getoond in de stapindicator.',
            optional:
              'Markeert de stap als optioneel, getoond als een hint onder het staplabel.',
          },
          stepper: {
            activeStep:
              'Nulgebaseerde index van de momenteel actieve stap, in twee richtingen te binden via [(activeStep)].',
            disabled: 'Schakelt de hele stepper en alle stapnavigatie uit.',
            id: 'id toegepast op het stepper-hostelement, automatisch gegenereerd indien weggelaten.',
            linear:
              'Vereist dat elke niet-optionele stap als voltooid is gemarkeerd voordat de gebruiker verder kan.',
            orientation:
              'As waarlangs de stappen worden geplaatst; stapel ze verticaal waar een rij niet past.',
            size: 'Visuele grootte van de stepper, die de stapindicatoren en labels samen schaalt.',
            changed:
              'Wordt geactiveerd met de nieuwe actieve stapindex wanneer de gebruiker naar een andere stap navigeert.',
            canNavigateTo:
              'Geeft terug of de stap op de gegeven index bereikbaar is vanuit de huidige toestand.',
            indexOf:
              'Geeft de index van de gegeven stap terug, of -1 als deze niet is geregistreerd.',
            selectStep: 'Activeert de stap op de gegeven index als deze bereikbaar is.',
          },
          'transfer-list': {
            disabled: 'Schakelt de hele transfer list en alle verplaatsbediening uit.',
            items:
              'Volledige pool van items beschikbaar over beide deelvensters, geïdentificeerd door id.',
            selectedIds:
              "Id's van de items die momenteel aan de doelzijde (rechts) staan, in twee richtingen te binden via [(selectedIds)].",
            size: 'Visuele grootte van de transfer list.',
            sourceLabel:
              'Koptekst weergegeven boven het brondeelvenster (links), die terugvalt op de standaard van de actieve taal.',
            targetLabel:
              'Koptekst weergegeven boven het doeldeelvenster (rechts), die terugvalt op de standaard van de actieve taal.',
          },
          'virtual-list': {
            itemHeight:
              'Pixelhoogte van elke rij; alle rijen moeten dezelfde vaste hoogte delen.',
            items:
              'Volledige array van data-items om te renderen; alleen het zichtbare deel wordt op elk moment gemount.',
            overscan:
              'Aantal extra rijen weergegeven boven en onder het zichtbare venster om lege randen tijdens snel scrollen te verminderen.',
            viewportHeight: 'Pixelhoogte van de scrollende viewport.',
            scrollIndexChange:
              'Wordt geactiveerd met de index van de eerste rij die bovenaan de viewport zichtbaar is telkens wanneer de gebruiker scrollt.',
            scrollToIndex:
              'Scrollt de viewport zodat de rij op de gegeven index bovenaan verschijnt, afgekapt binnen de lijstgrenzen.',
          },
          'field-label': {
            forId:
              'id van de bijbehorende bediening; geeft een <label for> weer indien ingesteld, anders een <span>.',
            labelId:
              'id toegepast op het weergegeven labelelement zodat bedieningen ernaar kunnen verwijzen via aria-labelledby.',
            required: 'Toont een verplicht-indicator op het label.',
            text: 'Labeltekst weergegeven binnen het labelelement.',
          },
          'field-messages': {
            error:
              'Foutmelding om te tonen; indien ingesteld wordt de hint verborgen en de melding aangekondigd als een alert.',
            hint: 'Hulptekst onder het veld getoond wanneer geen fout aanwezig is.',
            id: "Basis-id gebruikt om de aria-id's voor de fout- en hintelementen af te leiden.",
          },
          dialog: {
            closeRequested:
              'Wordt bij manualClose gemeld bij elke sluitpoging, zonder te sluiten.',
            manualClose:
              'Meldt elke sluitpoging via closeRequested en houdt het dialoogvenster open tot open false is.',
            closeDisabled:
              'Schakelt de ingebouwde sluitknop uit, bijvoorbeeld tijdens het opslaan.',
            ariaLabel:
              'Toegankelijk label voor het dialoogvenster wanneer de koptekstslot geen zichtbare titel bevat.',
            closeOnBackdrop:
              'Sluit het dialoogvenster wanneer de gebruiker op het achtergrondgebied buiten het paneel klikt.',
            closeOnEscape:
              'Sluit het dialoogvenster wanneer de gebruiker op Escape drukt.',
            id: 'id toegepast op het native dialoogelement, automatisch gegenereerd indien weggelaten.',
            open: 'Of het dialoogvenster wordt getoond, in twee richtingen te binden via [(open)].',
            showClose: 'Toont de sluitknop in de dialoogkoptekst.',
            width: 'Breedte-instelling voor het dialoogpaneel.',
            closed:
              'Wordt geactiveerd wanneer het dialoogvenster sluit, ongeacht of het door de gebruiker of programmatisch werd gesloten.',
            opened:
              'Wordt geactiveerd zodra het dialoogvenster is getoond via showModal().',
          },
        },
      },
      sharedOptions: {
        fruitOptions: [
          { value: 'apple', label: 'Appel' },
          { value: 'banana', label: 'Banaan' },
          { value: 'cherry', label: 'Kers' },
          { value: 'date', label: 'Dadel' },
        ],
        viewOptions: [
          { value: 'day', label: 'Dag' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Maand' },
        ],
        themeOptions: [
          { value: 'light', label: 'Licht' },
          { value: 'dark', label: 'Donker' },
        ],
        monthOptions: [
          { value: 'jan', label: 'Januari' },
          { value: 'feb', label: 'Februari' },
          { value: 'mar', label: 'Maart' },
          { value: 'apr', label: 'April' },
          { value: 'may', label: 'Mei' },
          { value: 'jun', label: 'Juni' },
          { value: 'jul', label: 'Juli' },
          { value: 'aug', label: 'Augustus' },
          { value: 'sep', label: 'September' },
          { value: 'oct', label: 'Oktober' },
          { value: 'nov', label: 'November' },
          { value: 'dec', label: 'December' },
        ],
        breadcrumbHome: 'Home',
        breadcrumbProducts: 'Producten',
        breadcrumbLaptops: 'Laptops',
        breadcrumbMacBookPro: 'MacBook Pro',
        breadcrumbDashboard: 'Dashboard',
        breadcrumbSettings: 'Instellingen',
      },
    },
  },
};

import type { WebMessages } from '../web-messages.types';

export const is: WebMessages = {
  common: {
    skipToContent: 'Fara í meginefni',
    brandHome: 'eagami heim',
    navUi: 'UI',
    navUiTooltip: 'Skjölun fyrir einingasafn',
    themeToggleTooltip: 'Skipta um þema',
    themeToggleLabel: next => `Skipta yfir í ${next} ham`,
    localeMenuLabel: 'Tungumál',
    localeMenuTooltip: 'Breyta tungumáli',
    activeLocale: label => `Núverandi tungumál: ${label}`,
    footer: {
      copyright: year => `© ${year} eagami`,
      npmLink: 'npm',
      npmTooltip: 'Skoða @eagami/ui á npm',
      githubAriaLabel: 'eagami á GitHub',
      githubTooltip: 'Skoða frumkóða á GitHub',
      navLabel: 'Síðufótur',
    },
    codeSnippet: {
      copyLabel: 'Afrita á klippiborð',
      copySuccess: 'Afritað á klippiborð',
      copyError: 'Ekki tókst að afrita á klippiborð',
    },
  },
  home: {
    metaTitle: 'Eagami',
    metaDescription: 'Glæsileg vefhönnun',
    hero: {
      tagline: 'glæsileg vefhönnun.',
      ctaPrimary: 'Hafa samband',
      ctaSecondary: 'Sjá nýleg verkefni →',
      scrollHint: 'Skrunaðu að þjónustu',
    },
    services: {
      title: 'Þjónusta',
      lede: 'Frá einni lendingarsíðu upp í fullkomið vefforrit, ásamt öllu sem fylgir eftir útgáfu.',
      featuresHeading: 'Eiginleikar',
      uiNote: {
        before: 'Stærri verkefni má byggja á',
        link: 'Eagami UI',
        after:
          ', sérsmíðuðu einingasafni og hönnunarkerfi, fyrir samræmt og nútímalegt sjónrænt yfirbragð á öllum vefnum.',
      },
      core: [
        {
          title: 'Sérsniðnar vefsíður',
          description:
            'Heildstæð vefsíða byggð frá grunni: uppsetning léns, hýsing, vörumerki, hönnun og útgáfa. Ótakmarkaðar endurskoðanir fram að útgáfudegi.',
        },
        {
          title: 'Áframhaldandi viðhald',
          description:
            'Mánaðarlegt viðhald sem nær yfir hýsingu, öryggisuppfærslur, uppfærslur á háðum pökkum, breytingar á efni og greiningu á tölfræði.',
        },
      ],
      addOns: [
        {
          title: 'Notendaumsjón',
          description:
            'Auðkenning notenda, skráning og endurheimt lykilorða, ásamt stjórnborði með mælikvörðum og stýringum fyrir hvern notanda.',
          iconSlug: 'users',
        },
        {
          title: 'Greiðsluvinnsla',
          description:
            'Netgreiðslur (Stripe sjálfgefið, aðrir þjónustuaðilar eftir beiðni), með sérsniðnum greiðsluformum og endurteknum innheimtum.',
          iconSlug: 'credit-card',
        },
        {
          title: 'Stuðningur við mörg tungumál',
          description:
            'Tungumálastuðningur fyrir mörg svæði, með valfrjálsri sjálfvirkri greiningu úr vafra gestsins.',
          iconSlug: 'languages',
        },
        {
          title: 'Þemur',
          description: 'Rofi fyrir dökkan/ljósan ham og fullkomlega sérsniðin litaþemu.',
          iconSlug: 'moon',
        },
        {
          title: 'Tölfræði og innsýn',
          description:
            'Mælikvarðar fyrir umferð vefsíðu (uppsprettur, tæki, staðsetningar), ásamt sérsniðinni rakningu atburða.',
          iconSlug: 'bar-chart',
        },
        {
          title: 'Tölvupóstur og tilkynningar',
          description:
            'Sjálfvirkur tölvupóstur fyrir aðgangsvirkni, kvittanir og tilkynningar.',
          iconSlug: 'mail',
        },
      ],
    },
    projects: {
      title: 'Nýleg verkefni',
      lede: 'Nokkrar síður í virkri þróun.',
      previousAriaLabel: 'Fyrri verkefni',
      nextAriaLabel: 'Næstu verkefni',
      regionAriaLabel: 'Nýleg verkefni',
      showing: title => `Sýni ${title}`,
      cards: [
        {
          title: 'London Chess',
          description: 'Miðstöð fyrir London Chess Club og skákviðburði í London, ON.',
          url: 'https://londonchess.ca',
          display: 'londonchess.ca',
          logo: 'assets/projects/londonchess.svg',
        },
        {
          title: 'CIRC Aesthetics',
          description: 'Snyrtileg inngripsröntgenstofa með aðsetur í London, ON.',
          url: 'https://circaesthetics.ca',
          display: 'circaesthetics.ca',
          logo: 'assets/projects/circaesthetics.svg',
        },
        {
          title: 'Brewski Bets',
          description: 'Rakning fyrir óformleg veðmál milli vina, gerð upp í bjór.',
          url: 'https://brewskibets.com',
          display: 'brewskibets.com',
          logo: 'assets/projects/brewskibets.svg',
        },
        {
          title: 'Chordbomb',
          description: 'Væntanlegt...',
          url: 'https://chordbomb.com',
          display: 'chordbomb.com',
          logo: 'assets/projects/chordbomb.svg',
        },
      ],
    },
    contact: {
      title: 'Ertu með verkefni í huga?',
      lede: 'Tölum um það!',
      success: 'Takk fyrir skilaboðin. Þú færð svar fljótlega.',
      nameLabel: 'Nafn',
      namePlaceholder: 'Nafnið þitt',
      emailLabel: 'Netfang',
      emailPlaceholder: 'thu@daemi.is',
      emailInvalid: 'Vinsamlegast sláðu inn gilt netfang',
      messageLabel: 'Skilaboð',
      placeholderHints: [
        'Hæ! Ég er að vinna að aukaverkefni og gæti þurft aðstoð með framendann...',
        'Leita að einhverjum til að byggja vefsíðu fyrir litla fyrirtækið okkar...',
        'Stutt spurning um einingasafnið áður en ég byrja...',
      ],
      submit: 'Senda skilaboð',
      sentToast: 'Skilaboð send',
      errorMessage:
        'Því miður, eitthvað fór úrskeiðis. Vinsamlegast sendu tölvupóst beint á michal@eagami.com.',
    },
  },
  notFound: {
    metaTitle: 'Eagami | 404',
    metaDescription: 'Síða fannst ekki.',
    eyebrow: '404',
    title: 'Síða fannst ekki',
    lede: 'Síðan sem þú leitaðir að er ekki til eða hefur verið flutt.',
    cta: 'Til baka á forsíðu',
  },
  ui: {
    changelog: {
      title: 'Breytingaskrá',
      metaTitle: 'Breytingaskrá | Eagami UI',
      metaDescription: 'Útgáfusaga Eagami UI Angular íhlutasafnsins.',
      lead: 'Helstu breytingar á @eagami/ui, nýjustu fyrst.',
      migrationGuide: 'Flutningsleiðbeiningar',
      fullHistory: 'Öll sagan á GitHub',
    },
    shell: {
      changelog: 'Breytingaskrá',
      sidebarLabel: 'Hliðarstika skjölunar',
      navLabel: 'Skjölun',
      overview: 'Yfirlit',
      setup: 'Uppsetning',
      designTokens: 'Hönnunartóknar',
      themeBuilder: 'Þemasmiður',
      icons: 'Táknmyndir',
      i18n: 'Alþjóðavæðing',
      accessibility: 'Aðgengi',
      components: 'Einingar',
    },
    index: {
      metaTitle: 'Eagami UI',
      metaDescription:
        'Létt, aðgengilegt Angular einingasafn byggt á CSS sérsniðnum eiginleikum.',
      title: 'Eagami UI',
      ledeBefore: 'er létt, aðgengilegt Angular einingasafn.',
      ledeAfter:
        'Skynsamleg sjálfgildi strax úr kassanum, með fullkomlega sérsniðanlegri hönnun sem hentar hvaða vörumerki sem er.',
      principlesHeading: 'Hönnunarreglur',
      principles: [
        {
          title: 'Aðgengilegt',
          body: 'Lyklaborðsstýring, fókusstjórnun, stuðningur við skjálesara og meðhöndlun minnkaðrar hreyfingar eru innbyggð í hverja einingu.',
        },
        {
          title: 'Létt',
          body: 'Hver eining er flutt inn sjálfstætt og pakkinn afhendir aðeins það sem þú notar.',
        },
        {
          title: 'Þemanlegt',
          body: 'Fullkomlega sérsniðanlegt með hönnunartóknum en heldur samræmdu útliti á öllum síðum. Ljós og dökk afbrigði fylgja saman og fylgja sjálfgefið kerfisstillingu notandans.',
        },
        {
          title: 'Staðfært',
          body: 'Innbyggður einingatexti fylgir á öllum studdum tungumálum.',
        },
        {
          title: 'Nútímalegt',
          body: 'Reglulega uppfært með nýjustu Angular eiginleikum og nútímalegum vefstöðlum.',
        },
        {
          title: 'Opið',
          body: 'Hver eining er einfalt Angular og CSS án bindingar við söluaðila, svo hægt er að lesa frumkóðann, afrita hann eða breyta honum eins og hverjum öðrum kóða í verkefninu þínu.',
        },
      ],
      getStartedHeading: 'Byrjaðu',
      getStartedBefore: 'Farðu í',
      getStartedLink: 'Uppsetningu',
      /* Leading space because the template suppresses whitespace between the
         link and this string so Polish can butt its trailing comma directly
         against "Instalacji". Locales that continue with a word (en/fr/el/es)
         provide the separator themselves. */
      getStartedAfter: ' til að setja upp pakkann og tengja upp altæka stílblaðið.',
      showcase: {
        button: 'Ýttu á mig',
        toggle: 'Skiptu um',
        tick: 'Hakaðu við mig',
        tag: 'Merkimiði',
        badge: 'Merki',
        tooltip: 'Viðbótarupplýsingar birtar í ábendingu',
        exploreMore: '...skoða fleiri einingar',
        list: 'Listi',
        grid: 'Rúðunet',
        table: 'Tafla',
        radioThis: 'Þetta',
        radioThat: 'Hitt',
        option1: 'Valkostur 1',
        option2: 'Valkostur 2',
        option3: 'Valkostur 3',
        toastButton: 'Ýtt á hnapp',
        toastToggleOn: 'Kveikt á rofa',
        toastToggleOff: 'Slökkt á rofa',
        toastTickOn: 'Hakað í reit',
        toastTickOff: 'Afhakað úr reit',
        ariaView: 'Sýnisskoðun',
        ariaSlider: 'Sýnissleði',
        ariaRating: 'Sýniseinkunn',
        ariaLayout: 'Sýnisútlit',
        ariaColor: 'Sýnislitur',
        ariaSelect: 'Sýnisval',
        ariaDate: 'Sýnisdagsetning',
        ariaMultiSelect: 'Sýnis-fjölval',
        msMusic: 'Tónlist',
        msTravel: 'Ferðalög',
        msFood: 'Matur',
      },
      theme: {
        heading: 'Gerðu það að þínu',
        ledeBefore: '',
        ledeLink: 'Hönnunartókn',
        ledeAfter:
          ' eru það sem gefur hverju Eagami-verkefni sérstakan persónuleika: aðlaganlegir litir, letur, bil, horn, skuggar og hreyfing, allt notað á heilu vefsíðuna eða forritið. Breyttu nokkrum hér að neðan til að sjá hvernig þau hafa áhrif á einingarnar.',
        brandColor: 'Vörumerkjalitur',
        radius: 'Hornaradíus',
        font: 'Letur',
        fontDefault: '(sjálfgefið)',
        reset: 'Endurstilla',
      },
    },
    setup: {
      metaTitle: 'Uppsetning | Eagami UI',
      metaDescription: 'Settu upp @eagami/ui og tengdu altæka stílblaðið og leturgerðir.',
      title: 'Uppsetning',
      ngAddLabel: 'Settu upp og stilltu allt með einni skipun:',
      manualLabel: 'Eða settu það upp handvirkt:',
      installLabel: 'Settu upp pakkann:',
      or: 'eða',
      stylesheetLabel: {
        before: 'Bættu altæka stílblaðinu við í',
        after: ':',
      },
      fontsLabel: {
        before: 'Hladdu leturgerðunum í',
        after: ':',
      },
      firstComponentHeading: 'Fyrsta einingin þín',
    },
    integrations: {
      heading: 'Út fyrir Angular',
      intro:
        'Hönnunartóknarnir eru óháðir veflausnarramma. Afritaðu sjálfstæðar samþættingarleiðbeiningar í verkefni utan Angular eða notaðu véllesanlega tóknaútflutninginn beint.',
      reactLink: 'Samþættingarleiðbeiningar fyrir React',
      flutterLink: 'Samþættingarleiðbeiningar fyrir Flutter',
      tokensLink: 'Hönnunartóknar sem JSON',
    },
    themeBuilder: {
      metaTitle: 'Þemasmiður | Eagami UI',
      metaDescription:
        'Búðu til WCAG-yfirfarna litatöflu fyrir ljósa og dökka stillingu út frá vörumerkjalitunum þínum og afritaðu svo veitustillingarnar eða CSS.',
      title: 'Þemasmiður',
      lede: 'Veldu vörumerkjalitina þína og Eagami UI leiðir út heildstæðan 50–900 kvarða í OKLCH-rými, athugar WCAG-birtuskil hans í ljósri og dökkri stillingu og réttir þér <code>provideEagamiUi()</code>-stillinguna tilbúna til notkunar.',
      controlsHeading: 'Vörumerkjalitir',
      primaryLabel: 'Aðallitur',
      secondaryLabel: 'Aukalitur',
      contrastHeading: 'Aðgengi',
      contrastPass: 'Uppfyllir WCAG 2.2 AA birtuskil í bæði ljósri og dökkri stillingu',
      contrastFailIntro: 'Sumar samsetningar ná ekki WCAG AA birtuskilamörkunum:',
      scaleHeading: 'Myndaður kvarði',
      previewHeading: 'Forskoðun',
      previewHint:
        'Skiptu um þema vefsins til að forskoða litatöfluna í dökkri stillingu.',
      previewButton: 'Byrja',
      previewSwitch: 'Tilkynningar',
      previewPrimary: 'Aðal',
      previewSecondary: 'Auka',
      previewStep1: 'Reikningur',
      previewStep2: 'Prófíll',
      previewStep3: 'Lokið',
      previewProgress: 'Framvinda:',
      exportHeading: 'Notaðu það',
      exportConfigLabel: 'Veitustillingar',
      exportCssLabel: 'CSS sérsniðnar eigindir',
    },
    tokens: {
      metaTitle: 'Hönnunartóknar | Eagami UI',
      metaDescription:
        'CSS sérsniðnir eiginleikar fyrir liti, leturfræði, bil, upphækkun, lögun og hreyfingu.',
      title: 'Hönnunartóknar',
      lede: 'CSS sérsniðnu eiginleikarnir sem keyra hverja einingu í safninu: liti, leturfræði, bil, upphækkun, lögun og hreyfingu. Vísaðu í þessa tóknar í þínum eigin stílum með <code>var(--token-name)</code> til að halda sjónrænu samræmi um allt forritið.',
      sections: {
        theming: 'Þemun',
        palette: 'Litaspjald vörumerkis',
        colors: 'Litir',
        typography: 'Leturfræði',
        spacing: 'Bil',
        elevation: 'Upphækkun',
        shape: 'Lögun',
        motion: 'Hreyfing',
      },
      themingRootBefore:
        'Yfirskrifaðu hvaða tókna sem er á <code>:root</code> til að þemata allt safnið:',
      themingScopedBefore:
        'Eða afmarkaðu yfirskriftir við einstakar einingar þar sem það hentar:',
      paletteIntro:
        'Sendu eitt vörumerkjahex til <code>provideEagamiUi()</code> og safnið leiðir út fullan kvarða með tíu tónum (50 til 900) í <a href="https://www.w3.org/TR/css-color-4/#ok-lab" target="_blank" rel="noopener noreferrer"><span>OKLCH</span></a> rými, heldur litblæ og litmettun stöðugri á meðan birta er stigin. Útleiddu tónarnir mata hvern <code>--color-brand-*</code> tókna í bæði ljósum og dökkum ham:',
      paletteOverrides:
        'Festu ákveðna tóna eða endurúthlutaðu hvaða útleiddi tónn liggur að baki hverju merkingarhlutverki:',
      paletteContrast:
        'Hver vörumerkjahlutverkspörun (texti á yfirborði, yfirborð á striga) er athuguð gagnvart WCAG 2.1 AA við ræsingu. Samsetning sem stenst ekki kastar villu áður en forritið hleðst, svo birtuskilavilla í vörumerkjalit næst við ræsingu frekar en í framleiðslu.',
      paletteBuilderIntro: 'Búðu til og forskoðaðu litatöfluna þína sjónrænt í',
      paletteBuilderLink: 'þemasmiðnum',
      elevationDrop: 'Slagskuggar',
      elevationRelief: 'Upphleyping og dæld',
      elevationReliefBefore:
        '<code>--shadow-bevel</code> parar innfellda hápunkta (efst) við innfelldan skugga (neðst) fyrir yfirborð sem á að lesast sem upphækkað. <code>--shadow-well</code> snýr lýsingunni við fyrir innfellt útlit. Sameinaðu með <code>--shadow-*</code> fyrir umhverfisslagskugga: <code>box-shadow: var(--shadow-bevel), var(--shadow-sm);</code>',
      colorsPrimary: 'Aðallitur',
      colorsSecondary: 'Aukalitur',
      colorsNeutral: 'Hlutlaust',
      colorsStatus: 'Staða',
      colorsSemantic: 'Merkingarlegt',
      typographyFamilies: 'Leturfjölskyldur',
      typographySizes: 'Stærðir',
      typographyWeights: 'Þykktir',
      typographyComposites: 'Samsettir stílar',
      typographyCompositesBefore:
        'Samsettir tóknar búnta saman stærð, þykkt, línuhæð (og stundum fjölskyldu) fyrir tiltekið hlutverk. <code>--text-section-heading-*</code> er fyrsti samsetti tókninn sem festir leturfjölskyldu, notaðu hann fyrir <code>&lt;h2&gt;</code> undirkaflaheiti á skjölunar- og markaðssíðum.',
      typographySectionHeadingSample: 'Kaflaheiti vörumerkjaröddunar',
      motionSimulate: 'Hermir',
      motionDurations: 'Tímalengdir',
      motionEasings: 'Mýkingar',
    },
    icons: {
      metaTitle: 'Táknmyndir | Eagami UI',
      metaDescription: 'Táknmyndasett sem fylgir @eagami/ui.',
      title: 'Táknmyndir',
      lede: 'Sjálfstæðar Angular einingar sem erfa lit sinn og kvarðast með <code>font-size</code>, svo þær birtast í hvaða stærð sem er. Flestar eru leiddar af <a href="https://feathericons.com/" target="_blank" rel="noopener noreferrer"><span>Feather Icons</span></a> eftir <a href="https://github.com/colebemis" target="_blank" rel="noopener noreferrer"><span>Cole Bemis</span></a> undir <a href="https://github.com/feathericons/feather/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><span>MIT leyfinu</span></a>; afgangurinn eru frumlegar Eagami UI táknmyndir. Einnig má teikna Feather táknmyndir með þynnri eða þykkari strikum. Smelltu á táknmynd til að afrita veljara hennar.',
      filterLabel: 'Sía táknmyndir',
      filterPlaceholder: 'Leita að táknmyndum',
      filterClearLabel: 'Hreinsa leit',
      categoryFeather: 'Feather',
      categoryEagami: 'Eagami UI',
      categoryBrand: 'Vörumerki',
      countAll: count => `${count} táknmyndir`,
      countFiltered: (shown, total) => `${shown} af ${total} táknmyndum`,
      noResults: 'Engar táknmyndir passa við leitina þína',
      copiedToast: selector => `Afritaði "${selector}" á klippiborð`,
      copyFailedToast: selector => `Ekki tókst að afrita "${selector}" á klippiborð`,
      brandTitle: 'Vörumerkjatáknmyndir',
      brandIntro:
        'Vörumerkjatáknmyndirnar í listanum hér að neðan sýna vörumerki þriðju aðila og eru aðeins veittar til nafnnota, þ.e. til að bera kennsl á vörumerkið sem þær tákna í viðmóti (hnappur fyrir "Skrá inn með Google", tengill fyrir "Deila á Facebook" o.s.frv.). Þær eru ekki með leyfi til almennra skreytingarnota. Notendur bera ábyrgð á að fylgja leiðbeiningum hvers vörumerkis:',
      brandLinkLabel: 'Vörumerkjaúrræði',
    },
    i18n: {
      metaTitle: 'Alþjóðavæðing | Eagami UI',
      metaDescription:
        'Innbyggður einingatexti á 15 svæðum, með skiptingu á keyrslutíma og yfirskriftum fyrir einstakar strengi.',
      title: 'Alþjóðavæðing',
      lede: 'Hver innbyggður strengur (ARIA merkimiðar, staðgenglar, tóm ástönd, stýringar dagsetningarvelju) fylgir á 15 svæðum. Stilltu eitt fyrir allt forritið, skiptu á keyrslutíma eða yfirskrifaðu einstaka strengi.',
      supportedHeading: 'Studd svæði',
      supportedFallback:
        'Óþekkt svæði falla aftur á ensku, eins og allir lyklar sem vantar í hlutayfirskrift.',
      quickSetupHeading: 'Hröð uppsetning',
      quickSetupBefore:
        'Bættu <code>provideEagamiUi()</code> við stillingar forritsins og skráðu tungumálin sem þú notar með <code>locales</code>. Enska er alltaf í boði, svo þú sendir aðeins það sem þú þarft.',
      liveDemoHeading: 'Lifandi sýnishorn',
      liveDemoIntro:
        'Veldu svæði og horfðu á einingarnar hér að neðan taka upp samsvarandi strengi og dagsetningarsnið.',
      runtimeSwitchHeading: 'Skipting á keyrslutíma',
      runtimeSwitchBefore:
        'Sprautaðu inn <code>EagamiI18nService</code> og kallaðu á <code>setLocale()</code>. Virka svæðið er merki, svo hver eining birtist aftur með nýju strengjunum án endurnýjunar.',
      perStringHeading: 'Yfirskriftir fyrir einstaka strengi',
      perStringBefore:
        'Sendu <code>messages</code> hlut ásamt svæðinu til að skipta út einstökum strengjum. Allt sem þú sleppir fellur aftur á sjálfgildi svæðisins.',
      perStringAfter:
        'Flestar einingar bjóða einnig upp á einstök skilaboðainntök (t.d. <code>placeholder</code> á <code>&lt;ea-dropdown&gt;</code>) fyrir einstaka yfirskriftir á notkunarstað.',
      frenchSpacingHeading: 'Frönsk bilahjálp',
      frenchSpacingBody:
        'Frönsk leturfræði býst við mjóu órjúfanlegu bili á undan <code>? ! : ; »</code> og á eftir <code>«</code>. Útflutta <code>frenchSpacing()</code> hjálpin breytir venjulegum bilum í þínum eigin frönsku strengjum (safnið meðhöndlar innfelldu frönsku skilaboðin sín innbyrðis).',
      demoLocaleLabel: 'Svæði',
    },
    accessibility: {
      metaTitle: 'Aðgengi | Eagami UI',
      metaDescription:
        'WCAG 2.2 AA samræmi, fullur lyklaborðsstuðningur og einingar sem vinna vel með skjálesurum, staðfest með hverri útgáfu.',
      title: 'Aðgengi',
      lede: 'Hver eining er byggð samkvæmt fremstu aðgengisstöðlum vefsins: rétt merkingarfræði, fullur lyklaborðsstuðningur, fókusstjórnun og tilkynningar skjálesara virka strax án frekari vinnu.',
      conformanceHeading: 'Samræmi',
      conformanceBody:
        'Safnið samræmist <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener">WCAG 2.2 Level AA</a>, staðlinum sem flestum stofnunum og fyrirtækjum er skylt að uppfylla, og fylgir opinberum leiðbeiningum W3C um gerð hvers konar stýringa, frá gluggum og valmyndum til sleða og dagsetningarvelja. Tilkynningar skjálesara fylgja með á öllum studdum tungumálum, svo hjálpartækni talar alltaf tungumál notandans.',
      builtInHeading: 'Innbyggt aðgengi',
      builtInItems: [
        {
          title: 'Merkingarfræði',
          body: 'Innbyggð stök þar sem hægt er, skýr ARIA hlutverk, ástönd og eiginleikar annars staðar. Ástönd eins og útbreitt, valið, hakað, ógilt og upptekið eru alltaf aðgengileg forritunarlega, aldrei aðeins í gegnum stíla.',
        },
        {
          title: 'Lyklaborðsstuðningur',
          body: 'Fullkomin APG lyklaborðsmynstur: roving tabindex, örvatakkastýring, Home og End, Escape til að loka og Enter eða bilslá til að virkja, með örvameðhöndlun sem tekur tillit til RTL.',
        },
        {
          title: 'Fókusstjórnun',
          body: 'Gluggar og veljur halda fókus innan sín á meðan þau eru opin og skila honum á kveikjuna við lokun. Fókusvísar eru alltaf sýnilegir og aldrei bældir.',
        },
        {
          title: 'Tilkynningar skjálesara',
          body: 'Toast skilaboð, tilkynningar, staðfestingarvillur og ósamstilltar ástandsbreytingar eru tilkynntar í gegnum lifandi svæði með viðeigandi kurteisisstigi.',
        },
        {
          title: 'Minnkuð hreyfing',
          body: 'Hreyfimyndir virða prefers-reduced-motion miðlunarfyrirspurnina alls staðar.',
        },
        {
          title: 'Birtuskil',
          body: 'Sjálfgefnu ljósu og dökku þemun uppfylla birtuskilakröfur WCAG, og þemaverkfærin merkja samsetningar sem falla undir AA.',
        },
      ],
      labelsHeading: 'Aðgengileg nöfn',
      labelsBefore:
        'Einingar sem birta texta merkja sig sjálfar. Allt sem er aðeins táknmynd eða myndrænt býður upp á <code>aria-label</code> inntak (með staðfærðum sjálfgildum fyrir innbyggðar stýringar eins og hreinsunar-, lokunar- og frávísunarhnappa), og formreitir tengja <code>label</code>, vísbendingar og villuskilaboð við stýringuna með <code>aria-describedby</code> sjálfkrafa.',
      labelsAfter:
        'Gefðu upp <code>label</code> eða <code>aria-label</code> fyrir stýringar án sýnilegs texta og einingin sér um afganginn: nöfn, vísbendingar og villuskilaboð haldast sjálfkrafa tengd saman.',
      testingHeading: 'Staðfest með hverri útgáfu',
      testingBody:
        'Hver eining er athuguð samkvæmt viðurkenndum aðgengisreglum í hvert sinn sem hún breytist, og útgáfa fer aðeins út þegar allar athuganir standast, svo aðgengið sem þú sérð hér helst þegar safnið þróast.',
    },
    component: {
      metaTitle: name => `${name} | Eagami UI`,
      metaDescription: name => `Tilvísun fyrir ${name} einingu og lifandi sýnishorn.`,
      demoHeading: 'Sýnishorn',
      notFoundTitle: 'Eining fannst ekki',
      notFoundBody: 'Veldu einingu úr hliðarstikunni, eða',
      notFoundLink: 'farðu aftur í inngang',
      sectionHeadings: {
        basic: 'grunn',
        variants: 'afbrigði',
        sizes: 'stærðir',
        states: 'ástönd',
        disabled: 'óvirkt',
        dismissible: 'lokanlegt',
        clearable: 'hreinsanlegt',
        hintAndError: 'vísbending og villa',
        withHint: 'með vísbendingu',
        withError: 'með villu',
        withLabel: 'með merkimiða',
        withIcons: 'með táknmyndum',
        withFooter: 'með síðufæti',
        withPaginator: 'með síðuskiptingu',
        withDisabledItem: 'með óvirku atriði',
        withDisabledTab: 'með óvirkum flipa',
        required: 'krafist',
        requiredWithHint: 'krafist með vísbendingu',
        horizontal: 'lárétt',
        vertical: 'lóðrétt',
        single: 'einfalt',
        multi: 'mörg',
        circle: 'hringur',
        square: 'ferningur',
        shapes: 'lögun',
        shapesAndFallbacks: 'lögun og varaúrræði',
        chevronSeparator: 'oddaskilrúm',
        slashSeparator: 'skástriksskilrúm',
        twoLevels: 'tvö stig',
        fourDigitPin: '4 stafa PIN',
        defaultHeading: 'sjálfgefið',
        stripedAndBordered: 'rákótt og með ramma',
        compactDensity: 'þétt þéttleiki',
        tinyList: 'örlítill listi',
        stickyHeader: 'fastur haus',
        emptyState: 'tómt ástand',
        formatVariants: 'sniðafbrigði',
        minMax: 'lágm. og hám.',
        positions: 'staðsetningar',
        trigger: 'kveikja',
        alignLeft: 'jöfnun: vinstri',
        alignCenter: 'jöfnun: miðja',
        manyPages: 'margar síður',
        minimal: 'lágmark',
        indeterminate: 'óákveðið',
        noResize: 'engin stærðarbreyting',
        resizing: 'stærðarbreyting',
        disabledAndReadonly: 'óvirkt og skrifvarið',
        password: 'lykilorð',
        autocompleteSection: 'sjálfvirk útfylling',
        twoOptions: 'tveir valmöguleikar',
        fullWidth: 'full breidd',
        minLengthMaxResults: 'lágm. lengd og hám. niðurstöður',
        removable: 'fjarlægjanlegt',
        minMaxLabels: 'lágm./hám. merkimiðar',
        underline: 'undirstrik',
        filled: 'fyllt',
        rect: 'rétthyrningur',
        inlineLayout: 'innfelld uppsetning',
        noResults: 'engar niðurstöður',
        titleOnly: 'aðeins titill',
        iconTrigger: 'táknmyndarkveikja',
        placements: 'staðsetningar',
        canvasSizes: 'strigastærðir',
        cappedChipCount: 'takmarkaður fjöldi merkja',
        customIcon: 'sérsniðin táknmynd',
        customIconAndColor: 'sérsniðin táknmynd og litur',
        halfSteps: 'hálf skref',
        customLabel: 'sérsniðinn merkimiði',
        customSize: 'sérsniðin stærð',
        linearFlow: 'línulegt flæði',
        manyLevels: 'mörg stig',
        notAnimated: 'óhreyfanlegt',
        numberOfStars: 'fjöldi stjarna',
        minimumOne: 'lágmark 1 stjarna',
        outputFormats: 'úttakssnið',
        quarterHourSteps: 'stundarfjórðungsskref',
        readonly: 'skrifvarið',
        singleFile: 'ein skrá',
        stepped: 'þrepað',
        sundayStart: 'byrjar á sunnudegi',
        twelveHourFormat: '12 tíma snið',
        twoActions: 'tvær aðgerðir',
        withCompletedSteps: 'með loknum skrefum',
        withConstraints: 'með takmörkunum',
        withInitialValue: 'með upphafsgildi',
        withMaxlength: 'með hámarkslengd',
        withMaxHeight: 'með hámarkshæð',
        withMinMaxLabels: 'með lágm./hám. merkimiðum',
        withOptionalStep: 'með valfrjálsu skrefi',
        withSeconds: 'með sekúndum',
        withSelection: 'með vali',
        withoutAlpha: 'án gegnsæis',
        withoutSearch: 'án leitar',
        withoutSelectAll: 'án velja-allt',
        wrapping: 'umbrot',
      },
      common: {
        small: 'Lítið',
        medium: 'Miðlungs',
        large: 'Stórt',
        cancel: 'Hætta við',
        save: 'Vista',
        close: 'Loka',
        confirm: 'Staðfesta',
        disabled: 'Óvirkt',
        defaultLabel: 'Sjálfgefið',
        successLabel: 'Tókst',
        warningLabel: 'Viðvörun',
        errorLabel: 'Villa',
        infoLabel: 'Upplýsingar',
      },
      demos: {
        accordion: {
          whatLabel: 'Hvað er @eagami/ui?',
          whatBody:
            'Létt, aðgengilegt Angular einingasafn byggt á CSS sérsniðnum eiginleikum.',
          installLabel: 'Hvernig set ég það upp?',
          installBody:
            'Keyrðu pnpm add @eagami/ui, bættu svo altæka stílblaðinu við angular.json skrána þína.',
          themeLabel: 'Get ég sérsniðið þemað?',
          themeBody:
            'Já, yfirskrifaðu hvaða CSS sérsniðna eiginleika sem er á :root eða afmarkaðu yfirskriftir við einstakar einingar.',
          sectionOneLabel: 'Kafli eitt',
          sectionOneBody: 'Margir kaflar geta verið opnir í einu í fjölham.',
          sectionTwoLabel: 'Kafli tvö',
          sectionTwoBody: 'Efni fyrir kafla tvö.',
          disabledSectionLabel: 'Óvirkur kafli',
          disabledSectionBody: 'Ekki er hægt að ná í þetta efni.',
        },
        alert: {
          defaultText: 'Þetta er sjálfgefin tilkynning',
          successText: 'Breytingarnar þínar hafa verið vistaðar',
          warningText: 'Prufutímabilið þitt rennur út eftir 3 daga',
          errorText: 'Eitthvað fór úrskeiðis, vinsamlegast reyndu aftur',
          infoText: 'Ný útgáfa er í boði',
          dismissibleText: 'Þessa tilkynningu er hægt að loka',
          tooltipSuppressed:
            'Ábendingar eru bældar á snertitækjum til að forðast klístraða yfirsveiflu. Skoðaðu þennan kafla á tæki með mús til að sjá sýnishornin í aðgerð.',
        },
        autocomplete: {
          startTyping: 'Byrjaðu að skrifa…',
          hintText: 'Byrjaðu að skrifa til að sjá samsvaranir',
          errorText: 'Vinsamlegast veldu hundategund',
          breedPlaceholder: 'Hundategund…',
          minMaxLabel: 'Lágm. 2 stafir, hám. 3 niðurstöður',
          minMaxPlaceholder: 'Sláðu inn að minnsta kosti 2 stafi…',
        },
        avatarEditor: {
          result: 'Niðurstaða:',
        },
        badge: {
          successText: 'Virkt',
          warningText: 'Í bið',
          newText: 'Nýtt',
        },
        button: {
          primary: 'Aðal',
          secondary: 'Auka',
          ghost: 'Draugur',
          danger: 'Hætta',
          toggleLoading: 'Víxla hleðslu',
          fullWidth: 'Full breidd',
          clickedToast: 'Ýtt á hnapp!',
        },
        card: {
          elevatedHeader: 'Upphækkað',
          elevatedBody: 'Spjald með skuggaupphækkun.',
          outlinedHeader: 'Útlínað',
          outlinedBody: 'Spjald með rammaútlínu.',
          filledHeader: 'Fyllt',
          filledBody: 'Spjald með fíngerðum bakgrunni.',
          cardTitleHeader: 'Titill spjalds',
          cardWithFooterBody:
            'Þetta spjald er með haus, meginmál og síðufót með aðgerðum.',
        },
        checkbox: {
          acceptTermsAndConditions: 'Samþykkja skilmála og skilyrði',
          disabledChecked: 'Óvirkt valið',
          indeterminate: 'Óákveðið',
          iAgreeToTerms: 'Ég samþykki skilmálana',
          subscribeToUpdates: 'Gerast áskrifandi að uppfærslum',
          subscribeHint: 'Mánaðarlegt yfirlit er sent, enginn ruslpóstur',
          acceptTermsLabel: 'Samþykkja skilmála',
          acceptTermsError: 'Samþykkja verður skilmálana til að halda áfram',
        },
        codeInput: {
          verificationCodeLabel: 'Staðfestingarkóði',
          verificationCodeHint: 'Athugaðu tölvupóstinn þinn fyrir 6 stafa kóðann',
          verificationCodeError: 'Ógildur staðfestingarkóði',
          pinLabel: 'PIN',
          pinHint: 'Sláðu inn 4 stafa PIN þinn',
        },
        colorPicker: {
          brandLabel: 'Vörumerkjalitur',
          hintBrandColor: 'Notaður sem aðalvörumerkjalitur',
          errorRequired: 'Þessa reit þarf að fylla út',
          hexLabel: 'HEX snið',
          rgbLabel: 'RGB snið',
          hslLabel: 'HSL snið',
          noAlphaHeading: 'Aðeins ógegnsætt',
          opaqueOnlyLabel: 'Heillitur',
        },
        dataTable: {
          tableColumnId: 'Auðkenni',
          tableColumnFirstName: 'Eiginnafn',
          tableColumnLastName: 'Eftirnafn',
          tableColumnAdmin: 'Stjórnandi',
          tableColumnPosts: 'Færslur',
        },
        datePicker: {
          appointmentLabel: 'Tímabókun',
          pickDatePlaceholder: 'Veldu dagsetningu…',
          hintAnyFutureDate: 'Veldu hvaða framtíðardagsetningu sem er',
          errorRequired: 'Þessa reit þarf að fylla út',
          shortLabel: 'Stutt',
          mediumLabel: 'Miðlungs',
          longLabel: 'Langt',
          withinNextWeeksLabel: 'Innan næstu 3 vikna',
          withinNextWeeksHint: '±1 vika / +3 vikur frá deginum í dag',
        },
        dialog: {
          openButton: 'Opna glugga',
          title: 'Titill glugga',
          body: 'Þetta er meginmál gluggans. Það styður hvaða efni sem er, þar á meðal form, texta og aðrar einingar.',
        },
        divider: {
          orLabel: 'eða',
          sectionLabel: 'Kafli',
          leftLabel: 'Vinstri',
          rightLabel: 'Hægri',
        },
        drawer: {
          openButton: 'Opna skúffu',
          rightButton: 'Hægri',
          leftButton: 'Vinstri',
          topButton: 'Efst',
          bottomButton: 'Neðst',
          rightTitle: 'Hægri skúffa',
          rightBody: 'Rennur inn frá hægri brún, gagnleg fyrir upplýsingaspjöld.',
          leftTitle: 'Vinstri skúffa',
          leftBody: 'Rennur inn frá vinstri, gagnleg fyrir leiðsöguvalmyndir.',
          topTitle: 'Efri skúffa',
          topBody: 'Rennur niður að ofan, gagnleg fyrir tilkynningar.',
          bottomTitle: 'Neðri skúffa',
          bottomBody: 'Rennur upp að neðan, algeng í farsímum fyrir aðgerðablöð.',
        },
        dropdown: {
          fruitLabel: 'Ávöxtur',
          fruitPlaceholder: 'Veldu ávöxt…',
          hintFavourite: 'Veldu uppáhaldið þitt',
          errorRequired: 'Þessa reit þarf að fylla út',
          selectPlaceholder: 'Veldu…',
        },
        emptyState: {
          noItemsTitle: 'Engin atriði enn',
          noItemsDescription: 'Byrjaðu með því að búa til fyrsta atriðið þitt.',
          createItem: 'Búa til atriði',
          noResultsTitle: 'Engar niðurstöður fundust',
          noResultsDescription:
            'Reyndu að breyta leitinni eða síunni til að finna það sem þú leitar að.',
          clearFilters: 'Hreinsa síur',
          nothingHereTitle: 'Ekkert að sjá hér',
        },
        fileUploader: {
          attachmentsLabel: 'Viðhengi',
          imagesLabel: 'Hlaða upp myndum',
          imagesHint: 'PNG eða JPEG, allt að 2 MB hver, hám. 4 skrár',
          resumeLabel: 'Hlaða upp ferilskrá',
          customIconLabel: 'Hengja við skrár',
          withHintHint: 'Allt að 10 MB á hverja skrá',
          withErrorText: 'Að minnsta kosti ein mynd er nauðsynleg',
        },
        formField: {
          emailPlaceholder: 'you@example.com',
        },
        input: {
          defaultLabel: 'Sjálfgefið',
          enterTextPlaceholder: 'Sláðu inn texta…',
          hintGuidance: 'Gagnlegar leiðbeiningar fara hér',
          errorRequired: 'Þessa reit þarf að fylla út',
          readonlyLabel: 'Skrifvarið',
          readonlyValue: 'Skrifvarið gildi',
          passwordLabel: 'Lykilorð',
          passwordPlaceholder: 'Sláðu inn lykilorðið þitt…',
          passwordNoToggleLabel: 'Lykilorð (víxlun falin)',
          passwordNoTogglePlaceholder: 'Engin sýnileikavíxlun',
          emailLabel: 'Netfang',
          emailPlaceholder: 'thu@daemi.is',
        },
        menu: {
          openButton: 'Opna valmynd',
          edit: 'Breyta',
          duplicate: 'Afrita',
          archive: 'Geyma í safni',
          delete: 'Eyða',
          file: 'Skrá',
          moreOptionsLabel: 'Fleiri valkostir',
          view: 'Skoða',
          rename: 'Endurnefna',
          newItem: 'Nýtt',
          open: 'Opna',
          saveUnavailable: 'Vista (ekki í boði)',
          saveAs: 'Vista sem',
        },
        popover: {
          openLabel: 'Opna sprettiglugga',
          basicContent:
            'Fljótandi yfirborð fest við kveikju sína. Notaðu það sem byggingareiningu fyrir valmyndir, fellilista og sérsniðin yfirlög.',
          placementTopLabel: 'efst',
          placementTopStartLabel: 'efst-byrjun',
          placementTopEndLabel: 'efst-endir',
          placementBottomLabel: 'neðst',
          placementBottomStartLabel: 'neðst-byrjun',
          placementBottomEndLabel: 'neðst-endir',
          placementLeftLabel: 'vinstri',
          placementRightLabel: 'hægri',
          placementTopContent: 'Miðjað fyrir ofan kveikjuna',
          placementTopStartContent:
            'Fyrir ofan kveikjuna, jafnað við vinstri brún hennar',
          placementTopEndContent: 'Fyrir ofan kveikjuna, jafnað við hægri brún hennar',
          placementBottomContent: 'Miðjað fyrir neðan kveikjuna',
          placementBottomStartContent:
            'Fyrir neðan kveikjuna, jafnað við vinstri brún hennar',
          placementBottomEndContent:
            'Fyrir neðan kveikjuna, jafnað við hægri brún hennar',
          placementLeftContent: 'Miðjað til vinstri við kveikjuna',
          placementRightContent: 'Miðjað til hægri við kveikjuna',
        },
        progressBar: {
          processing: 'Vinnur…',
        },
        radio: {
          appleLabel: 'Epli',
          bananaLabel: 'Banani',
          cherryLabel: 'Kirsuber',
          optionALabel: 'Valkostur A',
          optionBLabel: 'Valkostur B',
          subscriptionPlanLabel: 'Áskriftarleið',
          freeLabel: 'Ókeypis',
          proLabel: 'Pro',
          enterpriseLabel: 'Fyrirtæki',
          deliverySpeedLabel: 'Afhendingarhraði',
          deliverySpeedHint: 'Veldu hversu hratt þú vilt fá það',
          standardLabel: 'Staðlað',
          expressLabel: 'Hraðsending',
          accountTypeLabel: 'Tegund aðgangs',
          accountTypeError: 'Vinsamlegast veldu tegund aðgangs',
          personalLabel: 'Einkaaðgangur',
          businessLabel: 'Fyrirtækjaaðgangur',
        },
        rating: {
          experienceLabel: 'Gefðu reynslunni einkunn',
          halfStepsLabel: 'Einkunn í hálfum skrefum',
          halfStepsHint:
            'Smelltu á vinstri eða hægri helming stjörnu til að stilla 0,5 skref.',
          readonlyLabel: 'Meðaleinkunn',
          withHintHint: 'Pikkaðu á stjörnu til að stilla einkunnina',
          withErrorText: 'Einkunn er nauðsynleg',
          numberOfStarsLabel: 'Gefðu einkunn',
          customIconLabel: 'Hversu mikið elskar þú það?',
        },
        segmented: {
          viewLabel: 'Sýn',
          themeLabel: 'Þema',
          themeHint: 'Hefur áhrif á allt forritið',
          layoutLabel: 'Uppsetning',
          layoutError: 'Val á uppsetningu er nauðsynlegt',
          viewOptionList: 'Listi',
          viewOptionGrid: 'Rúðunet',
          viewOptionKanban: 'Kanban',
          themeOptionLight: 'Ljóst',
          themeOptionDark: 'Dökkt',
        },
        slider: {
          volumeLabel: 'Hljóðstyrkur',
          brightnessLabel: 'Birta',
          withHintLabel: 'Með vísbendingu',
          sliderHint: 'Dragðu handfangið eða notaðu örvatakka til að stilla',
          withErrorLabel: 'Með villu',
          sliderError: 'Vinsamlegast veldu gildi yfir 50',
        },
        switch: {
          enableNotificationsLabel: 'Virkja tilkynningar',
          disabledOnLabel: 'Óvirkt á',
          confirmConsentLabel: 'Staðfesta samþykki',
          marketingEmailsLabel: 'Markaðstölvupóstur',
          marketingEmailsHint: 'Afskráðu þig hvenær sem er',
          twoFactorAuthLabel: 'Tveggja þátta auðkenning',
          twoFactorAuthError: 'Tveggja þátta auðkenning verður að vera virk',
        },
        tabs: {
          account: 'Aðgangur',
          accountContent: 'Efni aðgangsstillinga',
          security: 'Öryggi',
          securityContent: 'Efni öryggisstillinga',
          notifications: 'Tilkynningar',
          notificationsContent: 'Tilkynningakjör',
          overview: 'Yfirlit',
          overviewContent: 'Yfirlitsefni',
          analytics: 'Tölfræði',
          analyticsContent: 'Tölfræðiefni',
          reports: 'Skýrslur',
          reportsContent: 'Skýrsluefni',
          general: 'Almennt',
          generalContent: 'Almennar stillingar',
          billing: 'Innheimta',
          billingContent: 'Innheimtuupplýsingar',
          admin: 'Stjórnun',
          adminContent: 'Stjórnborð',
        },
        tag: {
          disabledSuccess: 'Óvirkt tókst',
        },
        textarea: {
          messageLabel: 'Skilaboð',
          messagePlaceholder: 'Sláðu inn skilaboðin þín…',
          hintMaxCharacters: 'Hámark 500 stafir',
          errorRequired: 'Þessa reit þarf að fylla út',
          fixedSizeLabel: 'Föst stærð',
          fixedSizePlaceholder: 'Ekki hægt að breyta stærð',
          readonlyLabel: 'Skrifvarið',
          readonlyValue: 'Skrifvarið efni',
        },
        toast: {
          message: variant => {
            const labels: Record<string, string> = {
              default: 'sjálfgefin',
              success: 'árangurs',
              warning: 'viðvörunar',
              error: 'villu',
              info: 'upplýsinga',
            };
            return `Þetta er ${labels[variant] ?? variant} tilkynning`;
          },
        },
        tooltip: {
          triggerLabel: '(svífðu yfir mig)',
          topLabel: 'Efst',
          topTooltip: 'Ábending efst',
          bottomLabel: 'Neðst',
          bottomTooltip: 'Ábending neðst',
          leftLabel: 'Vinstri',
          leftTooltip: 'Ábending vinstra megin',
          rightLabel: 'Hægri',
          rightTooltip: 'Ábending hægra megin',
        },
        transferList: {
          sourceLabel: 'Í boði',
          targetLabel: 'Valið',
          roleAdmin: 'Stjórnandi',
          roleEditor: 'Ritstjóri',
          roleViewer: 'Áhorfandi',
          roleGuest: 'Gestur',
          roleBilling: 'Innheimta',
          roleOwner: 'Eigandi',
        },
        virtualList: {
          row: 'Röð',
          detail: n => `Búin til færsla #${n}`,
          scrollPosition: (first, total) =>
            `Sýni röð ${first.toLocaleString('is')} af ${total.toLocaleString('is')}`,
        },
        commandPalette: {
          hint: 'Ýttu á Ctrl + K (eða Cmd + K) til að opna skipanaspjaldið hvar sem er á þessari síðu.',
          openButton: 'Opna skipanaspjald',
          fileGroup: 'Skrá',
          editGroup: 'Breyta',
          newFile: 'Ný skrá',
          openFile: 'Opna skrá',
          save: 'Vista',
          find: 'Finna',
          findKeyword: 'leita',
          replace: 'Skipta út',
          undo: 'Afturkalla',
          toggleTheme: 'Víxla þema',
          toggleThemeDescription: 'Skipta milli ljóss og dökks hams',
          lockWorkspace: 'Læsa vinnusvæði',
          lockWorkspaceDescription: 'Óvirkt sem stendur — eiginleiki í beta',
          executedToast: label => `Keyrt: ${label}`,
        },
        avatarEditorActions: {
          avatarUpdatedToast: 'Notandamynd uppfærð',
        },
      },
      playground: {
        controls: 'Stýringar',
        reset: 'Endurstilla',
        code: 'Kóði',
        apiReference: 'API tilvísun',
        inputs: 'Inntök',
        outputs: 'Úttök',
        methods: 'Aðferðir',
        colName: 'Nafn',
        colType: 'Tegund',
        colDefault: 'Sjálfgefið',
        colDescription: 'Lýsing',
        errorMessagesDescription:
          'Hnekkir staðfestingarskilaboðum eftir villulykli fyrir tengda formstýringu; ótilgreindir lyklar nota sjálfgefin staðfærð skilaboð.',
        ariaLabelDescription:
          'Aðgengilegt nafn tilkynnt hjálpartækni þegar einingin birtir engan sýnilegan merkimiða.',
        triggerErrorLabel: 'Sýna villu',
        requiredBadge: 'krafist',
        twoWayBadge: 'tvíátta',
        rangeHint: { between: 'til', min: 'Lágm.', max: 'Hám.' },
        knobLabels: {
          timeline: { orientation: 'Stefna', align: 'Jöfnun', size: 'Stærð' },
          tooltip: {
            eaTooltip: 'Efni ábendingar',
          },
          input: {
            label: 'Merkimiði',
            placeholder: 'Staðgengill',
            size: 'Stærð',
            type: 'Tegund',
            disabled: 'Óvirkt',
            readonly: 'Skrifvarið',
            required: 'Krafist',
            autofocus: 'Sjálfvirkur fókus',
            showPasswordToggle: 'Sýna lykilorðsvíxlun',
            clearable: 'Hreinsanlegt',
            autocomplete: 'Sjálfvirk útfylling',
          },
          'number-input': {
            allowNegative: 'Leyfa neikvæð gildi',
            label: 'Merkimiði',
            placeholder: 'Staðgengill',
            size: 'Stærð',
            min: 'Lágmark',
            max: 'Hámark',
            step: 'Skref',
            disabled: 'Óvirkt',
            readonly: 'Skrifvarið',
            required: 'Krafist',
          },
          'form-field': {
            label: 'Merkimiði',
            hint: 'Vísbending',
            required: 'Krafist',
          },
          alert: {
            variant: 'Afbrigði',
            dismissible: 'Lokanlegt',
            size: 'Stærð',
            icon: 'Táknmynd (yfirskrift)',
          },
          avatar: {
            size: 'Stærð',
            shape: 'Lögun',
            src: 'Uppspretta myndar',
            initials: 'Upphafsstafir',
            alt: 'Hjálpartexti',
          },
          badge: {
            variant: 'Afbrigði',
            size: 'Stærð',
            shape: 'Lögun',
          },
          button: {
            variant: 'Afbrigði',
            size: 'Stærð',
            type: 'Tegund',
            disabled: 'Óvirkt',
            loading: 'Hleður',
            fullWidth: 'Full breidd',
          },
          card: {
            variant: 'Afbrigði',
            padding: 'Innfylling',
            headerAlign: 'Jöfnun hauss',
            fullWidth: 'Full breidd',
            headerDivider: 'Hausskilrúm',
          },
          checkbox: {
            label: 'Merkimiði',
            count: 'Fjöldi',
            size: 'Stærð',
            disabled: 'Óvirkt',
            required: 'Krafist',
            indeterminate: 'Óákveðið',
          },
          'code-input': {
            size: 'Stærð',
            length: 'Lengd',
            label: 'Merkimiði',
            placeholder: 'Staðgengill',
            disabled: 'Óvirkt',
            readonly: 'Skrifvarið',
            required: 'Krafist',
          },
          'color-picker': {
            label: 'Merkimiði',
            placeholder: 'Staðgengill',
            size: 'Stærð',
            format: 'Snið',
            showAlpha: 'Sýna gegnsæi',
            clearable: 'Hreinsanlegt',
            disabled: 'Óvirkt',
            readonly: 'Skrifvarið',
            required: 'Krafist',
          },
          divider: {
            orientation: 'Stefna',
            label: 'Merkimiði',
          },
          'eagami-wordmark': {
            variant: 'Afbrigði',
            layout: 'Uppsetning',
            size: 'Stærð (px)',
          },
          'empty-state': {
            size: 'Stærð',
            headingLevel: 'Fyrirsagnarstig',
            title: 'Titill',
            description: 'Lýsing',
          },
          paginator: {
            align: 'Jafna',
            showPageSizeSelector: 'Sýna velju fyrir síðustærð',
            showRangeLabel: 'Sýna bilsmerkimiða',
            disabled: 'Óvirkt',
            totalItems: 'Heildarfjöldi atriða',
          },
          'progress-bar': {
            variant: 'Afbrigði',
            size: 'Stærð',
            value: 'Gildi',
            max: 'Hám.',
            buffer: 'Biðminni',
            showPercentage: 'Sýna prósentu',
            indeterminate: 'Óákveðið',
            label: 'Merkimiði',
          },
          radio: {
            label: 'Merkimiði',
            disabled: 'Óvirkt',
          },
          'range-slider': {
            label: 'Merkimiði',
            hint: 'Vísbending',
            errorMsg: 'Villuboð',
            min: 'Lágmark',
            max: 'Hámark',
            step: 'Skref',
            size: 'Stærð',
            showValue: 'Sýna gildi',
            showMinMaxLabels: 'Sýna lágm./hám. merkimiða',
            disabled: 'Óvirkt',
            required: 'Krafist',
          },
          rating: {
            label: 'Merkimiði',
            size: 'Stærð',
            min: 'Lágmark',
            max: 'Hámark',
            allowHalf: 'Leyfa hálf skref',
            readonly: 'Skrifvarið',
            disabled: 'Óvirkt',
            required: 'Krafist',
            clearable: 'Hreinsanlegt',
            iconClass: 'Táknmynd',
          },
          skeleton: {
            variant: 'Afbrigði',
            animated: 'Hreyfanlegt',
            width: 'Breidd',
            height: 'Hæð',
          },
          slider: {
            size: 'Stærð',
            min: 'Lágm.',
            max: 'Hám.',
            step: 'Skref',
            showValue: 'Sýna gildi',
            showMinMaxLabels: 'Sýna lágm./hám. merkimiða',
            disabled: 'Óvirkt',
            required: 'Krafist',
            hasError: 'Villuástand',
            label: 'Merkimiði',
          },
          spinner: {
            size: 'Stærð',
            label: 'Merkimiði',
          },
          switch: {
            label: 'Merkimiði',
            size: 'Stærð',
            disabled: 'Óvirkt',
            required: 'Krafist',
          },
          tag: {
            variant: 'Afbrigði',
            size: 'Stærð',
            removable: 'Fjarlægjanlegt',
            disabled: 'Óvirkt',
            removeLabel: 'Fjarlægja merkimiða',
          },
          textarea: {
            label: 'Merkimiði',
            placeholder: 'Staðgengill',
            size: 'Stærð',
            resize: 'Stærðarbreyting',
            maxlength: 'Hámarkslengd (stafir)',
            minHeight: 'Lágmarkshæð (px)',
            maxHeight: 'Hámarkshæð (px)',
            disabled: 'Óvirkt',
            readonly: 'Skrifvarið',
            required: 'Krafist',
          },
        },
        knobNotes: { accordion: { headingLevel: '(aðeins merkingarlegt)' } },

        descriptions: {
          timeline: {
            items: 'Atburðirnir sem á að birta, í röð.',
            orientation: 'Stefnan sem tímalínan liggur í.',
            align:
              'Staðsetning efnis miðað við línuna; alternate á aðeins við um lóðréttar tímalínur.',
            size: 'Sjónræn stærð tímalínunnar.',
          },
          toast: {
            position: 'Horn eða brún sýnisvæðis sem tilkynningastaflinn er festur við.',
            clearable: 'Sýna lokunarhnapp á hverri tilkynningu.',
          },
          input: {
            label: 'Textamerkimiði birtur fyrir ofan reitinn.',
            type: 'Innbyggð inntaksgerð (lykilorð bætir við innbyggðri sýna/fela víxlun).',
            placeholder: 'Staðgengill sýndur á meðan reiturinn er tómur.',
            size: 'Sjónræn stærð reitsins.',
            hint: 'Hjálpartexti sýndur fyrir neðan reitinn, falinn á meðan villa er sýnd.',
            errorMsg:
              'Villuboð sýnd fyrir neðan reitinn, koma í stað vísbendingar og merkja reitinn ógildan.',
            disabled: 'Gerir reitinn óvirkan.',
            readonly: 'Birtir reitinn skrifvarinn.',
            required: 'Merkir reitinn sem nauðsynlegan.',
            autocomplete: 'Gildi fyrir innbyggða autocomplete eigindið.',
            list: 'id á <datalist> sem á að tengja fyrir innbyggðar tillögur.',
            autofocus: 'Setur fókus á reitinn einu sinni, eftir að hann birtist fyrst.',
            showPasswordToggle: 'Sýnir afhjúpunarvíxlun fyrir lykilorðsinntök.',
            clearable: 'Sýnir hreinsunarhnapp á meðan reiturinn hefur gildi.',
            id: 'id sett á innbyggða inntakið og merkimiðann for, sjálfvirkt búið til þegar því er sleppt.',
            value: 'Núverandi reitgildi, tvíátta bindanlegt með [(value)].',
            blurred: 'Kviknar þegar reiturinn missir fókus.',
            focused: 'Kviknar þegar reiturinn fær fókus.',
            clear: 'Hreinsar núverandi gildi og endurheimtir fókus á reitinn.',
            focus: 'Færir lyklaborðsfókus á undirliggjandi innbyggða reitinn.',
            togglePasswordVisibility:
              'Víxlar afhjúpunarástandi lykilorðs fyrir type="password" inntök.',
            icon: 'Forsetar táknmyndaeining birt á undan textanum.',
            max: 'Hámarksgildi fyrir type="number"; gildið er fest við það við fókusmissi.',
            maxLength:
              'Hámarksfjöldi stafa; framfylgt fyrir type="number" þar sem innbyggt maxlength er hunsað.',
            min: 'Lágmarksgildi fyrir type="number"; gildið er fest við það við fókusmissi.',
            minLength: 'Lágmarksfjöldi stafa, sendur sem innbyggða minlength eigindið.',
            step: 'Skrefahækkun fyrir type="number" inntök.',
            clampToBounds:
              'Festir tölugildi inn í stillta lágm./hám. bilið þegar breytingu lýkur.',
          },
          'number-input': {
            allowNegative: 'Hvort neikvæð gildi eru leyfð; þegar false er lágmarkið 0.',
            label: 'Textamerkimiði birtur fyrir ofan reitinn.',
            placeholder: 'Staðgengill sýndur á meðan reiturinn er tómur.',
            size: 'Sjónræn stærð reitsins.',
            hint: 'Hjálpartexti sýndur fyrir neðan reitinn, falinn á meðan villa er sýnd.',
            errorMsg:
              'Villuboð sýnd fyrir neðan reitinn, koma í stað vísbendingar og merkja reitinn ógildan.',
            disabled: 'Gerir reitinn óvirkan.',
            readonly: 'Birtir reitinn skrifvarinn.',
            required: 'Merkir reitinn sem nauðsynlegan.',
            min: 'Lágmarksgildi; innslegin gildi eru fest við það við fókusmissi og skrefahnapparnir virða það.',
            max: 'Hámarksgildi; innslegin gildi eru fest við það við fókusmissi og skrefahnapparnir virða það.',
            step: 'Magn sem hvert skref (örvatakki eða skrefahnappur) bætir við eða dregur frá.',
            id: 'id sett á innbyggða inntakið og merkimiðann for, sjálfvirkt búið til þegar því er sleppt.',
            value:
              'Núverandi reitgildi; null þegar tómt, tvíátta bindanlegt með [(value)].',
            changed: 'Kviknar með nýja gildinu í hvert sinn sem það breytist.',
            focused: 'Kviknar þegar reiturinn fær fókus.',
            blurred: 'Kviknar þegar reiturinn missir fókus.',
            focus: 'Færir lyklaborðsfókus á undirliggjandi innbyggða reitinn.',
          },
          accordion: {
            multi: 'Leyfir mörgum atriðum að vera útbreidd í einu.',
            headingLevel:
              'Fyrirsagnarstig (1-6) sett á haus hvers atriðis, svo harmonikkan passi í uppbyggingu síðunnar.',
          },
          alert: {
            dismissible:
              'Sýnir lokunarhnapp sem leyfir notandanum að loka tilkynningunni.',
            variant:
              'Merkingarlegt litakerfi sem keyrir táknmynd og litaspjald tilkynningarinnar.',
            visible: 'Hvort tilkynningin er sýnd, tvíátta bindanlegt með [(visible)].',
            dismissed:
              'Kviknar þegar notandinn lokar tilkynningunni með lokunarhnappi hennar.',
            dismiss: 'Felur tilkynninguna og sendir dismissed atburðinn.',
            size: 'Kvarðar texta, táknmynd og bil saman.',
            icon: 'Yfirskrifar sjálfgefna stöðutáknmynd afbrigðisins með hvaða táknmyndaeiningu sem er.',
          },
          avatar: {
            src: 'Mynd-URL til að birta; fellur aftur á upphafsstafi, svo almenna notendatáknmynd.',
            alt: 'Hjálpartexti fyrir notandamyndina.',
            initials: 'Upphafsstafir sýndir þegar engin myndauppspretta er gefin.',
            size: 'Þvermálsforstilling fyrir notandamyndina.',
            shape: 'Útlína notandamyndarinnar: hringur eða rúnnaður ferningur.',
          },
          badge: {
            variant: 'Merkingarlegt litakerfi merkisins.',
            size: 'Sjónræn stærð merkisins.',
            shape:
              'Ytri lögun merkisins (pilla faðmar efnið, prjónn birtist sem hringur fyrir staka stafi).',
          },
          button: {
            variant: 'Sjónrænn stíll hnappsins, keyrir lit hans og áherslu.',
            size: 'Sjónræn stærð hnappsins.',
            type: 'Innbyggt type eigindi sett á undirliggjandi hnappastakið.',
            disabled: 'Gerir hnappinn óvirkan og bælir smelliatburði.',
            loading: 'Skiptir merkimiðanum út fyrir snúning en heldur birtu breiddinni.',
            fullWidth: 'Teygir hnappinn til að fylla breidd ílátsins.',
            ariaLabel:
              'Aðgengilegur merkimiði fyrir hnappinn þegar efni hans er ekki nógu lýsandi.',
            ariaCurrent:
              'Gildi fyrir innbyggða aria-current eigindið, merkir hnappinn sem núverandi atriði í setti.',
            clicked:
              'Kviknar þegar hnappurinn er virkjaður, bælt á meðan óvirkt eða hleður.',
            icon: 'Valfrjáls táknmyndaeining birt vinstra megin við merkimiðann.',
          },
          card: {
            variant: 'Sjónrænn stíll spjaldsyfirborðsins.',
            padding: 'Innfyllingarforstilling sett á efnissvæði spjaldsins.',
            headerAlign: 'Lárétt jöfnun hausefnisins.',
            fullWidth: 'Teygir spjaldið til að fylla tiltæka breidd.',
            headerDivider: 'Sýnir skilrúm milli hauss og meginmáls.',
          },
          checkbox: {
            ariaLabel:
              'Aðgengilegt nafn fyrir gátreitinn þegar enginn sýnilegur merkimiði er birtur.',
            checked: 'Núverandi valið ástand, tvíátta bindanlegt með [(checked)].',
            count: 'Viðbótargildi sýnt deyft strax á eftir merkimiðanum.',
            disabled: 'Gerir gátreitinn óvirkan.',
            errorMsg:
              'Villuboð sýnd fyrir neðan reitinn, koma í stað vísbendingar og merkja reitinn ógildan.',
            hint: 'Hjálpartexti sýndur fyrir neðan reitinn, falinn á meðan villa er sýnd.',
            id: 'id sett á innbyggða inntakið og merkimiðann for, sjálfvirkt búið til þegar því er sleppt.',
            indeterminate: 'Birtir gátreitinn í sjónrænt óákveðnu ástandi.',
            label: 'Textamerkimiði birtur við hlið gátreitsins.',
            required: 'Merkir gátreitinn sem nauðsynlegan.',
            size: 'Sjónræn stærð gátreitsins.',
            changed:
              'Kviknar með nýja valda ástandinu hvenær sem notandinn víxlar gátreitnum.',
          },
          'code-input': {
            disabled: 'Gerir hvern tölustafsreit óvirkan.',
            errorMsg:
              'Villuboð sýnd fyrir neðan reitinn, koma í stað vísbendingar og merkja reitinn ógildan.',
            hint: 'Hjálpartexti sýndur fyrir neðan reitinn, falinn á meðan villa er sýnd.',
            id: 'id sett á tölustafsreitina og merkimiðann for, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur fyrir ofan reitinn.',
            length: 'Fjöldi tölustafsreita sem kóðinn er gerður úr.',
            placeholder: 'Staðgengilstexti dreifður einn stafur á reit.',
            readonly: 'Birtir reitinn skrifvarinn.',
            required: 'Merkir reitinn sem nauðsynlegan.',
            size: 'Sjónræn stærð hvers tölustafsreits.',
            value: 'Núverandi kóðagildi, tvíátta bindanlegt með [(value)].',
            completed:
              'Kviknar með fullum kóða þegar hver tölustafur hefur verið sleginn inn.',
            focus:
              'Færir lyklaborðsfókus á næsta tóma tölustaf (eða þann síðasta þegar fullt).',
            allowAllChars:
              'Leyfa hvaða staf sem er án bils; þegar slökkt eru aðeins tölustafir samþykktir.',
          },
          'color-picker': {
            disabled: 'Gerir reitinn óvirkan.',
            errorMsg:
              'Villuboð sýnd fyrir neðan reitinn, koma í stað vísbendingar og merkja reitinn ógildan.',
            format: 'Úttakssnið sendrar litgildis (hex, rgb eða hsl).',
            hint: 'Hjálpartexti sýndur fyrir neðan reitinn, falinn á meðan villa er sýnd.',
            id: 'id sett á kveikjuna og merkimiðann for, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur fyrir ofan reitinn.',
            placeholder:
              'Staðgengill sýndur á kveikjunni á meðan enginn litur er valinn.',
            presets:
              'Forstilltir litareitir sýndir neðst í sprettiglugganum; sendu tóman fylki til að fela þá.',
            readonly:
              'Birtir reitinn skrifvarinn, kemur í veg fyrir að sprettiglugginn opnist.',
            required: 'Merkir reitinn sem nauðsynlegan.',
            showAlpha: 'Sýnir gegnsæissleðann og hefur gegnsæi með í sendu gildi.',
            clearable: 'Hvort hreinsihnappurinn birtist þegar gildi er sett.',
            size: 'Sjónræn stærð veljukveikjunnar.',
            value: 'Núverandi litastrengur, tvíátta bindanlegur með [(value)].',
            changed: 'Kviknar með nýja litastrengnum hvenær sem valið breytist.',
            cycleInputMode:
              'Hringar inntaksröð sprettigluggans milli hex strengs og RGB rása.',
            hasEyeDropper: 'Skilar því hvort vafrinn styður EyeDropper API.',
            onHexInput:
              'Beitir innslegnum hex texta á núverandi lit á meðan notandinn breytir honum.',
            onPopoverCloseRequested:
              'Lokar sprettiglugganum þegar notandinn smellir utan veljunnar.',
          },
          divider: {
            label: 'Valfrjáls miðjaður merkimiði birtur innan skilrúmsstriksins.',
            orientation: 'Stefnan sem skilrúmsstrikið liggur í.',
            thick: 'Birtir þyngra strik.',
          },
          'eagami-wordmark': {
            variant:
              'Efnisafbrigði: sjálfgefið er bert orðmerki, byline bætir við handunnið-af línunni, tagline bætir við slagorðinu.',
            layout: 'Raðar orðmerkinu staflað yfir línur eða innfellt á einni línu.',
            size: 'Pixlagildi sem allt orðmerkið kvarðast frá.',
          },
          'empty-state': {
            title: 'Fyrirsagnartexti sýndur fyrir ofan lýsinguna.',
            description: 'Stuðningstexti sýndur fyrir neðan titilinn.',
            size: 'Sjónræn stærð tóma-ástandsblokkarinnar.',
            headingLevel:
              'Fyrirsagnarstig notað fyrir titilinn svo hann passi í umliggjandi skjalauppbyggingu.',
            bordered: 'Birtir punktaðan ramma um blokkina.',
            icon: 'Valfrjáls táknmyndaeining birt á miðlasvæðinu fyrir ofan titilinn.',
          },
          paginator: {
            groupThousands: 'Hópar þúsundir með kommum í bilinu og síðunúmerunum.',
            size: 'Sjónræn stærð síðuskiptingarinnar og stýringa hennar.',
            align: 'Lárétt jöfnun síðuskiptingarstýringanna innan íláts þeirra.',
            disabled: 'Gerir allar síðuskiptingarstýringar óvirkar.',
            page: 'Núverandi síðunúmer, tvíátta bindanlegt með [(page)].',
            pageSize:
              'Fjöldi atriða sýndur á síðu, tvíátta bindanlegur með [(pageSize)].',
            pageSizeOptions: 'Valanlegar síðustærðir boðnar í síðustærðarveljunni.',
            showPageSizeSelector: 'Sýnir síðustærðarveljustýringuna.',
            showRangeLabel: 'Sýnir merkimiðann sem lýsir sýnilega atriðabilinu.',
            totalItems: 'Heildarfjöldi atriða notaður til að reikna síðufjöldann.',
            changed:
              'Kviknar þegar notandinn breytir annaðhvort núverandi síðu eða síðustærð.',
            goToPage: 'Fer á gefnu síðuna, fest inn í gilda bilið.',
            nextPage: 'Fer á næstu síðu ef hún er til.',
            prevPage: 'Fer á fyrri síðu ef hún er til.',
          },
          'progress-bar': {
            variant: 'Litaafbrigði stikunnar.',
            size: 'Sjónræn þykkt stikunnar.',
            value: 'Núverandi framvindugildi.',
            max: 'Gildi sem stikan er full við.',
            buffer: 'Biðminnisstaða á undan gildinu, sýnd í aukalitum.',
            showPercentage: 'Sýnir núverandi prósentu við hlið stikunnar.',
            indeterminate:
              'Birtir endurtekna hreyfingu fyrir framvindu af óþekktri tímalengd.',
            label: 'Textamerkimiði birtur fyrir ofan stikuna.',
          },
          radio: {
            disabled: 'Gerir þennan valkost óvirkan.',
            id: 'id sett á innbyggða valhnappinn og merkimiðann for, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur við hlið valhnappsins.',
            value: 'Gildi sem þessi valkostur leggur til foreldrahóps síns þegar valinn.',
          },
          'range-slider': {
            ariaLabelHigh:
              'Aðgengilegur merkimiði fyrir háa (enda) þumalinn, fellur aftur á reitmerkimiðann þegar honum er sleppt.',
            ariaLabelLow:
              'Aðgengilegur merkimiði fyrir lága (upphafs) þumalinn, fellur aftur á reitmerkimiðann þegar honum er sleppt.',
            disabled: 'Gerir sleðann óvirkan.',
            errorMsg:
              'Villuboð sýnd fyrir neðan sleðann, koma í stað vísbendingar og merkja reitinn ógildan.',
            formatValue: 'Sniðari beitt á hvert gildi áður en það er birt.',
            hint: 'Hjálpartexti sýndur fyrir neðan sleðann, falinn á meðan villa er sýnd.',
            id: 'id sett á sleðann, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur fyrir ofan sleðann.',
            max: 'Hæsta gildi sem hvor þumall getur náð.',
            min: 'Lægsta gildi sem hvor þumall getur náð.',
            required: 'Merkir reitinn sem nauðsynlegan.',
            showMinMaxLabels: 'Sýnir lágm. og hám. mörk á endum brautarinnar.',
            showValue: 'Sýnir núverandi lág og há gildi við hlið sleðans.',
            size: 'Sjónræn stærð brautarinnar og þumlanna.',
            step: 'Hækkun sem hver þumall smellur að þegar hann er hreyfður.',
            value: 'Núverandi [low, high] bilstvennd, tvíátta bindanleg með [(value)].',
            changed:
              'Kviknar með nýju [low, high] tvenndinni hvenær sem hvor þumall hreyfist.',
            commitThumb:
              'Smellir þumli að næsta skrefi, festir hann að mörkunum og takmarkar hann af gagnstæða þumlinum.',
            groupThousands:
              'Hópar birt gildi með þúsundaskiljum, hunsað þegar sérsniðið formatValue er gefið.',
            formatDisplay:
              'Sniðir gildi fyrir birtingu og beitir þúsundahópun nema sérsniðin formatValue aðgerð sé sett.',
          },
          rating: {
            allowHalf:
              'Leyfir hálfstjörnu nákvæmni, lætur gildið hreyfast í 0,5 skrefum.',
            clearable: 'Smellur á núverandi gildi hreinsar einkunnina aftur í 0.',
            disabled: 'Gerir einkunnina óvirka.',
            errorMsg:
              'Villuboð sýnd fyrir neðan einkunnina, koma í stað vísbendingar og merkja hana ógilda.',
            halfIconClass:
              'Sjálfstæður einingaklasi birtur fyrir hálfar stöður þegar allowHalf er satt.',
            hint: 'Hjálpartexti sýndur fyrir neðan einkunnina, falinn á meðan villa er sýnd.',
            iconClass: 'Sjálfstæður einingaklasi birtur fyrir tómar og fullar stöður.',
            id: 'id sett á einkunnina og merkimiða hennar, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur fyrir ofan einkunnina.',
            max: 'Hæsta einkunnargildi og fjöldi birtra stjarna.',
            min: 'Lægsta einkunnargildi sem notandinn getur valið.',
            readonly:
              'Birtir einkunnina aðeins til sýnis, hunsar smelli og lyklaborðsinntak.',
            required: 'Merkir einkunnina sem nauðsynlega.',
            size: 'Sjónræn stærð einkunnarinnar.',
            value: 'Núverandi einkunnargildi, tvíátta bindanlegt með [(value)].',
            hoverChanged:
              'Kviknar með forskoðuðu gildi á meðan svifið er yfir, og null þegar bendillinn fer.',
            iconForState:
              'Skilar einingaklasanum sem á að búa til fyrir tiltekið stjörnuástand.',
            stateFor:
              'Leysir birtingarástandið (tómt, hálft eða fullt) fyrir stjörnustöðu.',
          },
          skeleton: {
            animated:
              'Spilar pulsandi glampahreyfinguna, sjálfvirkt bæld þegar notandinn kýs minnkaða hreyfingu.',
            height:
              'Skýr CSS hæð sett á staðgengilinn, sjálfgildir á eðlislæga stærð lögunarinnar þegar henni er sleppt.',
            variant:
              'Lögunarforstilling staðgengilsins: textalína, hringur eða rétthyrningur.',
            width:
              'Skýr CSS breidd sett á staðgengilinn, sjálfgildir á eðlislæga stærð lögunarinnar þegar henni er sleppt.',
          },
          slider: {
            ariaLabel:
              'Aðgengilegur merkimiði settur þegar enginn sýnilegur merkimiði er birtur.',
            disabled: 'Gerir sleðann óvirkan.',
            errorMsg:
              'Villuboð sýnd fyrir neðan sleðann, koma í stað vísbendingar og merkja reitinn ógildan.',
            formatValue: 'Sniðari sem breytir tölugildinu í birta textann.',
            hasError: 'Þvingar villuástandsstíl án þess að binda villuboð.',
            hint: 'Hjálpartexti sýndur fyrir neðan sleðann, falinn á meðan villa er sýnd.',
            id: 'id sett á sleðann og merkimiða hans, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur fyrir ofan sleðann.',
            max: 'Hæsta gildi sem sleðinn getur náð.',
            min: 'Lægsta gildi sem sleðinn getur náð.',
            required: 'Merkir sleðann sem nauðsynlegan.',
            showMinMaxLabels: 'Sýnir lágm. og hám. mörk fyrir neðan brautina.',
            showValue: 'Sýnir núverandi gildi við hlið merkimiðans.',
            size: 'Sjónræn stærð sleðabrautar og þumals.',
            step: 'Hækkun sem gildið smellur að þegar sleðinn hreyfist.',
            value: 'Núverandi sleðagildi, tvíátta bindanlegt með [(value)].',
            changed: 'Kviknar með nýja smellta gildinu hvenær sem sleðinn hreyfist.',
            groupThousands:
              'Hópar birt gildi með þúsundaskiljum, hunsað þegar sérsniðið formatValue er gefið.',
            formatDisplay:
              'Sniðir gildi fyrir birtingu og beitir þúsundahópun nema sérsniðin formatValue aðgerð sé sett.',
          },
          spinner: {
            label:
              'Aðgengilegur merkimiði tilkynntur hjálpartækni, fellur aftur á þýðingu virka svæðisins þegar óstilltur.',
            size: 'Sjónræn stærð snúningsins.',
          },
          switch: {
            ariaLabel:
              'Aðgengilegur merkimiði fyrir rofann þegar enginn sýnilegur merkimiði er birtur.',
            checked: 'Núverandi á/af ástand, tvíátta bindanlegt með [(checked)].',
            disabled: 'Gerir rofann óvirkan og hindrar víxlun.',
            errorMsg:
              'Villuboð sýnd fyrir neðan rofann, koma í stað vísbendingar og merkja reitinn ógildan.',
            hint: 'Hjálpartexti sýndur fyrir neðan rofann, falinn á meðan villa er sýnd.',
            id: 'id sett á undirliggjandi gátreitinn og merkimiðann for, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur við hlið rofans.',
            required: 'Merkir rofann sem nauðsynlegan.',
            size: 'Sjónræn stærð rofans.',
            changed:
              'Kviknar með nýja valda ástandinu hvenær sem notandinn víxlar rofanum.',
          },
          tag: {
            variant: 'Merkingarlegt litakerfi merkisins.',
            size: 'Sjónræn stærð merkisins.',
            removable: 'Birtir fjarlægingarhnapp sem sendir removed þegar virkjaður.',
            disabled: 'Gerir merkið og fjarlægingarhnapp þess óvirk.',
            removeLabel:
              'Aðgengilegur merkimiði fyrir fjarlægingarhnappinn, fellur aftur á virka svæðið.',
            removed:
              'Kviknar þegar notandinn virkjar fjarlægingarhnappinn á fjarlægjanlegu merki.',
          },
          textarea: {
            disabled: 'Gerir reitinn óvirkan.',
            errorMsg:
              'Villuboð sýnd fyrir neðan reitinn, koma í stað vísbendingar og merkja reitinn ógildan.',
            hint: 'Hjálpartexti sýndur fyrir neðan reitinn, falinn á meðan villa er sýnd.',
            id: 'id sett á innbyggða textasvæðið og merkimiðann for, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur fyrir ofan reitinn.',
            maxHeight:
              'Pixlaþak fyrir hæð reitsins; umfram það skrunast textasvæðið lóðrétt í stað þess að stækka.',
            minHeight: 'Lágmarkshæð í px; aldrei minni en sjálfgefin hæð.',
            maxlength: 'Hámarksfjöldi stafa sem reiturinn tekur við.',
            placeholder: 'Staðgengill sýndur á meðan reiturinn er tómur.',
            readonly: 'Birtir reitinn skrifvarinn.',
            required: 'Merkir reitinn sem nauðsynlegan.',
            resize: 'Ás sem notandinn má breyta stærð reitsins eftir.',
            size: 'Sjónræn stærð reitsins.',
            value: 'Núverandi reitgildi, tvíátta bindanlegt með [(value)].',
            blurred: 'Kviknar þegar reiturinn missir fókus.',
            focused: 'Kviknar þegar reiturinn fær fókus.',
            focus: 'Færir lyklaborðsfókus á undirliggjandi innbyggða textasvæðið.',
          },
          'avatar-editor': {
            accept:
              'Samþykktar MIME tegundir fyrir skráaveljuna, áframsendar á innbyggða inntakið.',
            canvasSize: 'Pixlabreidd og hæð ferningslaga skurðstrigans.',
            cropState:
              'Upphafleg hreyfi/aðdráttarstaða til að endurheimta þegar uppsprettumynd er hlaðin.',
            currentSrc: 'URL myndarinnar til að hlaða í ritilinn við frumstillingu.',
            exportQuality:
              'JPEG/WebP gæði notuð við útflutning skurðmyndarinnar, milli 0 og 1.',
            exportType:
              'MIME tegund útfluttu myndarklessunnar (t.d. image/png eða image/jpeg).',
            loading: 'Sýnir beinagrindaryfirlag á meðan ytri tilföng eru að hlaðast.',
            maxFileSize:
              'Hámarksleyfileg skráarstærð í bætum; skrár yfir þessum mörkum senda errored.',
            maxZoom: 'Hámarksaðdráttarmargfaldari sem notandinn getur náð.',
            minZoom: 'Lágmarksaðdráttarmargfaldari sem notandinn getur náð.',
            shape: 'Lögun skurðmaska sett á strigann og útfluttu myndina.',
            cropped:
              'Kviknar þegar notandinn flytur út skurð og veitir bæði Blob og data-URL.',
            cropStateChanged:
              'Kviknar hvenær sem notandinn hreyfir eða aðdráttar myndina, gagnlegt til að varðveita breytingarástandið.',
            errored: 'Kviknar með læsilegum skilaboðum þegar skráarstaðfesting mistekst.',
            fileSelected: 'Kviknar þegar skrá er valin af diski eða sleppt á ritilinn.',
            removed:
              'Kviknar þegar núverandi mynd er hreinsuð með fjarlægingarstýringunni.',
            captureOriginal:
              'Merkir núverandi mynd og skurðarástand sem grunnlínu fyrir revertImage.',
            exportCrop:
              'Birtir núverandi skurð á striga utan skjás, sendir cropped og leysir með Blob.',
            openFilePicker: 'Opnar innbyggða skráaveljugluggann.',
            removeImage:
              'Hreinsar hlöðnu myndina og endurstillir hreyfingu og aðdrátt í sjálfgildi.',
            revertImage:
              'Endurheimtir myndina og skurðarástandið sem síðasta captureOriginal kall náði.',
            setZoom:
              'Stillir aðdráttarstigið, fest við stillta minZoom og maxZoom bilið.',
            updateImageDarkness:
              'Sýnatekur sýnilega skurðsvæðið til að ákvarða hvort myndin er dekkri en miðgrá.',
          },
          'menu-trigger': {
            menu: 'ea-menu tilvikið sem þessi kveikja stjórnar.',
          },
          tooltip: {
            maxWidth:
              'Hámarksbreidd í pixlum; textinn brotnar við þessa breidd (50px gólf).',
            eaTooltip:
              'Textaefni ábendingarinnar sem sýnt er við yfirsveiflu og lyklaborðsfókus.',
            tooltipPosition: 'Staðsetning ábendingarinnar miðað við hýsilstak hennar.',
          },
          'time-picker': {
            disabled: 'Gerir veljuna óvirka.',
            errorMsg:
              'Villuboð sýnd fyrir neðan reitinn, koma í stað vísbendingar og merkja reitinn ógildan.',
            format: 'Birtingarsnið kveikjumerkimiðans; vírgildið er alltaf 24 tíma.',
            hint: 'Hjálpartexti sýndur fyrir neðan reitinn, falinn á meðan villa er sýnd.',
            id: 'id sett á kveikjuna og merkimiðann for, sjálfvirkt búið til þegar því er sleppt.',
            includeSeconds: 'Sýnir sekúndudálk við hlið klukkustunda og mínútna.',
            label: 'Textamerkimiði birtur fyrir ofan reitinn.',
            minuteStep: 'Hækkun sem mínútudálkurinn smellur að þegar þrepað eða dregið.',
            placeholder: 'Staðgengill sýndur á kveikjunni á meðan enginn tími er valinn.',
            readonly:
              'Birtir reitinn skrifvarinn, kemur í veg fyrir að sprettiglugginn opnist.',
            required: 'Merkir reitinn sem nauðsynlegan.',
            secondStep: 'Hækkun sem sekúndudálkurinn smellur að þegar þrepað eða dregið.',
            size: 'Sjónræn stærð veljukveikjunnar.',
            value:
              'Núverandi tímastrengur í HH:MM eða HH:MM:SS (24 tíma), tvíátta bindanlegur með [(value)], eða null þegar óstilltur.',
            changed:
              'Kviknar með nýja tímastrengnum hvenær sem notandinn breytir völdum tíma.',
            advanceFocus:
              'Færir fókus á næsta einingadálk eftir að tölustafsinnslátt er lokið.',
            cannotExtend:
              'Skilar satt þegar enginn viðbótartölustafur getur með gildum hætti framlengt núverandi biðminni fyrir gefnu eininguna.',
            commitDigits:
              'Þáttar biðminnaða tölustafsstrenginn, festir hann að gilda bili einingarinnar og skrifar hann í gildið.',
            flushBuffer:
              'Skuldbindur biðjandi innslegið tölustafsbiðminni og hreinsar það.',
            focusHoursWhenReady:
              'Setur fókus á klukkustundainntakið þegar yfirborð sprettigluggans hefur verið birt í DOM.',
            hoursFromTyped:
              'Breytir innslegnu klukkustundagildi í 24 tíma jafngildi þess, með tilliti til núverandi f.h./e.h. tímabils.',
            onPopoverCloseRequested:
              'Lokar sprettiglugganum þegar notandinn smellir utan veljunnar.',
            onSpinnerBlur:
              'Skuldbindur biðjandi tölustafsbiðminni þegar snúningsdálkur missir fókus.',
            onSpinnerFocus:
              'Velur allan texta í snúningsdálki þegar hann fær fókus svo fyrsta áslátt skipti honum út.',
            onSpinnerInput:
              'Meðhöndlar tölustafsinntak í snúningsdálki, uppfærir biðminnið og færir fókus sjálfvirkt áfram þegar dálkurinn er fullur.',
            startHold:
              'Hefur langþrýstingsendurtekningu á oddahnappi, þrepar gefnu eininguna og hraðar eftir töf.',
            step: 'Þrepar gefna einingadálkinn upp eða niður um eina stillta hækkun.',
            stopHold: 'Hættir við allar í-flugi langþrýstingsendurtekningarklukkur.',
            togglePeriod:
              'Skiptir um f.h./e.h. tímabil í 12 tíma ham með því að víxla 12 tíma hliðruninni.',
          },
          autocomplete: {
            disabled: 'Gerir reitinn óvirkan.',
            emptyMessage:
              'Skilaboð sýnd í listanum þegar engir valkostir passa við núverandi inntak, fellur aftur á þýðingu virka svæðisins þegar því er sleppt.',
            errorMsg:
              'Villuboð sýnd fyrir neðan reitinn, koma í stað vísbendingar og merkja reitinn ógildan.',
            hint: 'Hjálpartexti sýndur fyrir neðan reitinn, falinn á meðan villa er sýnd.',
            id: 'id sett á innbyggða inntakið og merkimiðann for, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur fyrir ofan reitinn.',
            maxResults: 'Hámarksfjöldi valkosta sýndur í tillögulistanum í einu.',
            minLength:
              'Lágmarksfjöldi stafa sem krafist er áður en tillögulistinn birtist.',
            options: 'Fullur listi valkosta tiltækra til síunar og vals.',
            placeholder: 'Staðgengill sýndur á meðan reiturinn er tómur.',
            readonly: 'Birtir reitinn skrifvarinn.',
            required: 'Merkir reitinn sem nauðsynlegan.',
            size: 'Sjónræn stærð reitsins.',
            value: 'Núverandi reitgildi, tvíátta bindanlegt með [(value)].',
            blurred: 'Kviknar þegar inntakið missir fókus.',
            changed:
              'Kviknar hvenær sem inntakstextinn breytist, þar á meðal við frjálsa textabreytingu.',
            focused: 'Kviknar þegar inntakið fær fókus.',
            selected: 'Kviknar þegar notandinn velur valkost úr tillögulistanum.',
            close: 'Lokar tillögulistanum án þess að breyta núverandi gildi.',
            focus: 'Færir lyklaborðsfókus á undirliggjandi textainntakið.',
            selectOption:
              'Velur gefna valkostinn forritunarlega, uppfærir gildið og lokar listanum.',
          },
          'command-palette': {
            emptyMessage:
              'Skilaboð sýnd þegar leitarfyrirspurnin passar við engin atriði, fellur aftur á þýðingu virka svæðisins þegar því er sleppt.',
            items: 'Fullur listi skipanaatriða tiltækra til leitar og keyrslu.',
            open: 'Hvort spjaldsglugginn er opinn, tvíátta bindanlegt með [(open)].',
            placeholder: 'Staðgengill sýndur inni í leitarinntakinu á meðan það er tómt.',
            execute: 'Kviknar þegar notandinn velur skipun, sendir valda atriðið.',
            showActiveHighlight:
              'Skilar því hvort virka röðin á að birta auðkenndan bakgrunn sinn fyrir gefinn flatan vísi.',
          },
          tabs: {
            activeTab:
              'Gildi flipans sem nú er virkur, tvíátta bindanlegt með [(activeTab)].',
            size: 'Sjónræn stærð flipanna.',
            variant: 'Sjónrænn stíll flipastikunnar: undirstrik eða fyllt.',
            changed:
              'Kviknar með gildi nýja virka flipans hvenær sem virki flipinn breytist.',
            registerTab:
              'Skráir undirflipa svo hann birtist í flipastikunni; kallað sjálfvirkt af ea-tab.',
            selectTab: 'Virkjar flipann með gefnu gildi forritunarlega.',
            unregisterTab:
              'Fjarlægir áður skráðan undirflipa; kallað sjálfvirkt af ea-tab.',
          },
          tab: {
            disabled:
              'Gerir þennan flipa óvirkan, kemur í veg fyrir að notandinn velji hann.',
            id: 'id sett á flipahnappinn og spjald hans, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði sýndur á flipahnappinum.',
            value:
              'Einkvæmt gildi sem auðkennir þennan flipa innan foreldra ea-tabs hópsins.',
          },
          'date-picker': {
            disabled: 'Gerir dagsetningarveljuna óvirka.',
            errorMsg:
              'Villuboð sýnd fyrir neðan reitinn, koma í stað vísbendingar og merkja reitinn ógildan.',
            format: 'Birtingarsnið valdu dagsetningarinnar (stutt, miðlungs eða langt).',
            hint: 'Hjálpartexti sýndur fyrir neðan reitinn, falinn á meðan villa er sýnd.',
            id: 'id sett á kveikjuna og merkimiðann for, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur fyrir ofan reitinn.',
            locale:
              'BCP 47 svæðismerki notað fyrir dagsetningarsnið, fellur aftur á altæka svæðið þegar því er sleppt.',
            maxDate:
              'Síðasta dagsetning sem notandinn getur valið; dagsetningar eftir þessa eru óvirkar í dagatalinu.',
            minDate:
              'Fyrsta dagsetning sem notandinn getur valið; dagsetningar fyrir þessa eru óvirkar í dagatalinu.',
            placeholder:
              'Staðgengill sýndur á kveikjunni á meðan engin dagsetning er valin.',
            readonly:
              'Birtir reitinn skrifvarinn, kemur í veg fyrir að dagatalið opnist.',
            required: 'Merkir reitinn sem nauðsynlegan.',
            size: 'Sjónræn stærð dagsetningarveljukveikjunnar.',
            value: 'Núverandi valda dagsetning, tvíátta bindanleg með [(value)].',
            weekStartsOn:
              'Fyrsti dagur vikunnar í dagatalsrúðunetinu (0 fyrir sunnudag, 1 fyrir mánudag).',
            changed:
              'Kviknar þegar valda dagsetningin breytist, þar á meðal þegar hreinsuð.',
            clear: 'Hreinsar völdu dagsetninguna og sendir changed með null.',
            close: 'Lokar dagatalssprettiglugganum.',
            focus: 'Færir lyklaborðsfókus á kveikjuhnappinn.',
            onPopoverCloseRequested:
              'Lokar sprettiglugganum þegar notandinn smellir utan dagsetningarveljunnar.',
            open: 'Opnar dagatalssprettigluggann og færir fókus á fókusaða dagsreitinn.',
            toggle: 'Víxlar dagatalssprettiglugganum milli opins og lokaðs.',
          },
          menu: {
            maxHeight:
              'Hámarkshæð skrunlistans sem CSS-lengd; hærri valmyndir skruna umfram hana.',
            ariaLabel:
              'Aðgengilegur merkimiði fyrir valmyndarlistann, fellur aftur á virka svæðið þegar honum er sleppt.',
            disabled: 'Gerir valmyndina óvirka, kemur í veg fyrir að hún opnist.',
            id: 'id sett á valmyndarlistastakið, sjálfvirkt búið til þegar því er sleppt.',
            open: 'Hvort valmyndin er opin, tvíátta bindanlegt með [(open)].',
            placement: 'Staðsetning valmyndarlistans miðað við kveikjustak hans.',
            closed: 'Kviknar þegar valmyndin lokast.',
            opened: 'Kviknar þegar valmyndin opnast.',
            close: 'Lokar valmyndinni og endurheimtir valfrjálst fókus á kveikjustakið.',
            focusFirstItem: 'Færir lyklaborðsfókus á fyrsta virka atriðið í valmyndinni.',
            onPopoverCloseRequested:
              'Lokar valmyndinni þegar notandinn smellir utan hennar.',
            openAt:
              'Opnar valmyndina festa við gefna kveikjustakið og setur fókus á fyrsta atriðið.',
            toggleAt:
              'Víxlar opnunarástandi valmyndarinnar og festir hana við gefna kveikjustakið.',
          },
          'menu-item': {
            disabled: 'Gerir atriðið óvirkt og bælir smelliatburði.',
            variant:
              'Sjónrænn stíll atriðisins; notaðu danger fyrir eyðileggjandi aðgerðir.',
            clicked:
              'Kviknar þegar atriðið er virkjað; foreldravalmyndin lokast strax á eftir.',
          },
          'multi-select': {
            disabled: 'Gerir fjölvalið óvirkt.',
            errorMsg:
              'Villuboð sýnd fyrir neðan reitinn, koma í stað vísbendingar og merkja reitinn ógildan.',
            hint: 'Hjálpartexti sýndur fyrir neðan reitinn, falinn á meðan villa er sýnd.',
            id: 'id sett á kveikjuna og merkimiðann for, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur fyrir ofan reitinn.',
            maxVisibleChips:
              'Hámarksfjöldi merkja sýndur í kveikjunni áður en restin fellur saman í talningarpillu.',
            options: 'Listi valanlegra valkosta birtur í fellilistanum.',
            placeholder:
              'Staðgengill sýndur á kveikjunni á meðan enginn valkostur er valinn.',
            readonly: 'Birtir reitinn skrifvarinn.',
            required: 'Merkir reitinn sem nauðsynlegan.',
            searchable: 'Sýnir leitarinntakið efst í sprettiglugganum.',
            searchPlaceholder:
              'Staðgengill sýndur inni í leitarinntakinu þegar leitarorðið er tómt.',
            selectAll: 'Sýnir þríástands velja-allt röðina efst í valkostalistanum.',
            size: 'Sjónræn stærð fjölvalskveikjunnar.',
            value: 'Valin valkostagildi, tvíátta bindanleg með [(value)].',
            changed: 'Kviknar með nýja gildinu hvenær sem valið breytist.',
            clear: 'Hreinsar hvert val og stöðvar útbreiðslu atburðarins.',
            handlePopoverKeydown:
              'Meðhöndlar lyklaborðsleiðsögn inni í opnum sprettiglugga, beinir örvatökkum, Enter, bili og Escape.',
            onPopoverCloseRequested:
              'Kallað af sprettiglugganum þegar notandinn smellir utan eða skrunar; lokar spjaldinu og merkir reitinn snertan.',
            orderedValues:
              'Skilar gefnu gildasettinu endurraðað til að passa við inntaksvalkostafylkið.',
            removeChip: 'Fjarlægir gefna valkostinn úr núverandi vali.',
            toggleOption: 'Víxlar aðild gefna valkostsins í núverandi vali.',
            toggleSelectAll:
              'Velur alla síaða valkosti ef einhverjir eru óvaldir, eða afvelur alla síaða valkosti ef allir eru valdir.',
          },
          dropdown: {
            disabled: 'Gerir fellilistann óvirkan.',
            errorMsg:
              'Villuboð sýnd fyrir neðan reitinn, koma í stað vísbendingar og merkja reitinn ógildan.',
            hint: 'Hjálpartexti sýndur fyrir neðan reitinn, falinn á meðan villa er sýnd.',
            id: 'id sett á kveikjuna og merkimiðann for, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur fyrir ofan reitinn.',
            options: 'Listi valanlegra valkosta birtur í fellilistanum.',
            placeholder:
              'Staðgengill sýndur á kveikjunni á meðan enginn valkostur er valinn.',
            readonly: 'Birtir reitinn skrifvarinn.',
            required: 'Merkir reitinn sem nauðsynlegan.',
            size: 'Sjónræn stærð fellilistakveikjunnar.',
            value: 'Núverandi valið gildi, tvíátta bindanlegt með [(value)].',
            changed: 'Kviknar með nýja gildinu þegar notandinn velur valkost.',
            close: 'Lokar fellilistanum án þess að breyta núverandi gildi.',
            focus: 'Færir lyklaborðsfókus á fellilistakveikjuna.',
            onPopoverCloseRequested:
              'Kallað af sprettiglugganum þegar notandinn smellir utan fellilistans; lokar spjaldinu og merkir reitinn snertan.',
            select: 'Velur gefna valkostinn forritunarlega og lokar listanum.',
            toggle: 'Víxlar fellilistanum milli opins og lokaðs.',
          },
          'file-uploader': {
            accept:
              "Kommuaðskildar MIME tegundir og skráarendingar sem sleppisvæðið samþykkir, t.d. 'image/*,.pdf'.",
            disabled: 'Gerir upphlaðarann óvirkan.',
            errorMsg:
              'Villuboð sýnd fyrir neðan reitinn, koma í stað vísbendingar og merkja reitinn ógildan.',
            hint: 'Hjálpartexti sýndur fyrir neðan reitinn, falinn á meðan villa er sýnd.',
            id: 'id sett á sleppisvæðið og merkimiðann for, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur fyrir ofan reitinn.',
            maxFiles: 'Hámarksheildarfjöldi skráa; skrám umfram mörkin er hafnað.',
            maxSize: 'Hámarksstærð á hverja skrá í bætum; stærri skrám er hafnað.',
            multiple: 'Leyfir að velja fleiri en eina skrá í einu.',
            progress:
              'Upphleðsluframvindukort á hverja skrá (0-100) lyklað eftir File auðkenni; sleppið til að fela framvindustikur.',
            required: 'Merkir reitinn sem nauðsynlegan.',
            showFileList: 'Sýnir listann yfir valdar skrár fyrir neðan sleppisvæðið.',
            size: 'Sjónræn stærð upphlaðarans.',
            value: 'Núverandi skráalisti, tvíátta bindanlegur með [(value)].',
            fileRemoved:
              'Kviknar þegar skrá er fjarlægð með fjarlægingarhnappi raðar hennar.',
            rejected:
              'Kviknar þegar ein eða fleiri skrár standast ekki staðfestingu, með ástæðu fyrir hverri höfnun.',
            trackFile:
              'Skilar stöðugum raklykli fyrir skrá, notaður innbyrðis af skráalistanum.',
          },
          'form-field': {
            errorMsg:
              'Villuboð sýnd fyrir neðan stýringuna, koma í stað vísbendingar og merkja reitinn ógildan.',
            hint: 'Hjálpartexti sýndur fyrir neðan stýringuna, falinn á meðan villa er sýnd.',
            id: 'id grunnur fyrir tengingu merkimiða og skilaboða, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur fyrir ofan stýringuna.',
            required: 'Merkir reitinn sem nauðsynlegan.',
          },
          popover: {
            anchor:
              'Hýsilstak eða ElementRef sem sprettiglugginn staðsetur sig gagnvart.',
            ariaLabel:
              'Aðgengilegur merkimiði fyrir yfirborð sprettigluggans; gefðu einn þegar sprettiglugginn hefur enga sýnilega fyrirsögn.',
            ariaLabelledby:
              'Id staksins sem merkir yfirborð sprettigluggans, áframsent sem aria-labelledby.',
            clamp:
              'Festir sprettigluggann inni í sýnisvæðinu þegar hann myndi annars flæða út.',
            closeOnEscape: 'Lokar sprettiglugganum þegar ýtt er á Escape.',
            closeOnOutsideClick:
              'Lokar sprettiglugganum þegar notandinn smellir utan bæði sprettigluggans og festu hans.',
            flip: 'Snýr á gagnstæða hlið þegar umbeðin staðsetning flæðir út úr sýnisvæðinu.',
            matchAnchorWidth:
              'Stillir lágmarksbreidd sprettigluggans til að passa við breidd festunnar.',
            offset: 'Bil í px milli festunnar og yfirborðs sprettigluggans.',
            open: 'Hvort sprettiglugginn er nú opinn.',
            placement: 'Æskileg staðsetning sprettigluggans miðað við festu hans.',
            role: 'ARIA hlutverk sett á yfirborð sprettigluggans.',
            scrollBehavior:
              'Hvernig sprettiglugginn bregst við skrun- og stærðarbreytingaratburðum á meðan opinn: endurstaðsetja, loka eða hunsa.',
            surfaceId:
              'DOM id fyrir yfirborð sprettigluggans, notað af kveikjustökum með aria-controls.',
            trapFocus:
              'Heldur Tab og Shift+Tab í hringrás innan yfirborðsins á meðan opið er, fyrir sprettiglugga í gluggastíl.',
            closeRequested:
              'Kviknar þegar sprettiglugginn óskar eftir að vera lokað; foreldrið ætti að spegla þetta í [open].',
          },
          'accordion-item': {
            disabled: 'Gerir þetta atriði óvirkt, kemur í veg fyrir að því sé víxlað.',
            id: 'id sett á hausshnapp atriðisins og spjald, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Texti sýndur í hausshnappi atriðisins.',
            value:
              'Einkvæmur lykill sem auðkennir þetta atriði innan foreldra harmonikkunnar.',
          },
          breadcrumbs: {
            ariaLabel:
              'Aðgengilegur merkimiði fyrir brauðmolaleiðsögnina, fellur aftur á þýðingu virka svæðisins þegar honum er sleppt.',
            items:
              'Fylki brauðmolafærslna; atriði með href birtast sem tenglar, önnur sem hnappar, og það síðasta er óvirkt.',
            separator: 'Sjónrænn stíll skilrúmsins birts milli brauðmolaatriða.',
            clicked: 'Kviknar þegar óvirkur, ekki-loka brauðmoli er virkjaður.',
          },
          drawer: {
            animation:
              'Rennihreyfing þegar skúffan opnast og lokast: none (samstundis), linear (jafn hraði) eða eased (mýkingarferill í lokin).',
            ariaLabel:
              'Aðgengilegur merkimiði fyrir skúffuspjaldið þegar fyrirsögn þess er ekki nógu lýsandi.',
            closeOnBackdrop: 'Lokar skúffunni þegar notandinn smellir á bakgrunninn.',
            closeOnEscape: 'Lokar skúffunni þegar notandinn ýtir á Escape takkann.',
            id: 'id sett á gluggastakið, sjálfvirkt búið til þegar því er sleppt.',
            mode: 'Hvernig skúffan tengist síðunni: overlay svífur yfir deyfðri síðu með fókusgildru, á meðan push opnast ekki mótað og ýtir efni síðunnar til hliðar.',
            open: 'Hvort skúffan er opin, tvíátta bindanlegt með [(open)].',
            position: 'Brún sýnisvæðis sem skúffan rennur inn frá.',
            pushTarget:
              'Stak sem efni þess er ýtt til hliðar í push ham, sem CSS veljari eða stakvísun; sjálfgefið er það body skjalsins.',
            showClose: 'Sýnir lokunarhnappinn í skúffuhausnum.',
            size: 'Stærð skúffuspjaldsins eftir aðalási þess: breidd fyrir hliðarskúffur, hæð fyrir efri og neðri skúffur.',
            closed:
              'Kviknar þegar skúffan lokast, hvort sem það er með lokunarhnappi, bakgrunni eða Escape.',
            opened: 'Kviknar þegar skúffan hefur verið sýnd.',
          },
          'data-table': {
            clickable:
              'Merkir gagnaraðir sem smellanlegar: sýnir bendil og sendir rowActivate við smell eða Enter/Bil.',
            rowActivate:
              'Sendir gögn raðarinnar þegar smellanleg röð er virkjuð með smelli eða lyklaborði.',
            navigable:
              'Breytir töflunni í lyklaborðs-stýranlegt reitakerfi með færanlegum fókus og hreyfingu milli reita með örvalyklunum.',
            bordered: 'Birtir ramma um hverja reit.',
            columns:
              'Dálkaskilgreiningar sem lýsa lykli, merkimiða og valfrjálsri röðun eða sniðmáti hvers reits.',
            data: 'Fylki raðhluta til að birta í töflunni.',
            density:
              'Lóðrétt þéttleikaforstilling sem stjórnar innfyllingu raða og hausreita.',
            hoverable: 'Auðkennir röðina undir bendlinum við yfirsveiflu.',
            noDataText:
              'Texti sýndur í tóma ástandinu, fellur aftur á þýðingu virka svæðisins.',
            sort: 'Núverandi röðunarástand (dálkalykill og stefna), tvíátta bindanlegt með [(sort)].',
            stickyHeader: 'Festir hausröðina við topp töflunnar þegar efnið skrunast.',
            striped:
              'Beitir til skiptis bakgrunnsskygging á oddatölu- og jafntölu-raðir.',
            trackBy:
              'Raðeiginleikalykill notaður af breytingargreiningu Angular til að auðkenna raðir á skilvirkan hátt.',
            sorted:
              'Kviknar hvenær sem röðunardálkur eða stefna breytist með haussmelli.',
          },
          'radio-group': {
            ariaLabel:
              'Aðgengilegur merkimiði fyrir hópinn þegar enginn sýnilegur merkimiði er birtur.',
            disabled: 'Gerir alla valhnappavalkosti í hópnum óvirka.',
            errorMsg:
              'Villuboð sýnd fyrir neðan hópinn, koma í stað vísbendingar og merkja reitinn ógildan.',
            hint: 'Hjálpartexti sýndur fyrir neðan hópinn, falinn á meðan villa er sýnd.',
            id: 'id sett á hópstakið og merkimiða þess for, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur fyrir ofan hópinn.',
            name: 'Sameiginlegt name eigindi sett á öll valhnappainntök í hópnum, sjálfvirkt búið til þegar því er sleppt.',
            orientation: 'Uppsetningarstefna valhnappavalkostanna innan hópsins.',
            required: 'Merkir hópinn sem nauðsynlegan.',
            size: 'Sjónræn stærð sett á alla valhnappavalkosti í hópnum.',
            value: 'Nú valið gildi, tvíátta bindanlegt með [(value)].',
            changed: 'Kviknar með nýja gildinu þegar notandinn velur valkost.',
            select: 'Velur valkostinn með gefnu gildi forritunarlega.',
          },
          segmented: {
            ariaLabel:
              'Aðgengilegur merkimiði fyrir stýringuna þegar enginn sýnilegur merkimiði er birtur.',
            disabled: 'Gerir bútastýringuna óvirka.',
            errorMsg:
              'Villuboð sýnd fyrir neðan reitinn, koma í stað vísbendingar og merkja reitinn ógildan.',
            fullWidth: 'Teygir stýringuna til að fylla breidd ílátsins.',
            hint: 'Hjálpartexti sýndur fyrir neðan reitinn, falinn á meðan villa er sýnd.',
            id: 'id sett á stýringuna og merkimiðann for, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði birtur fyrir ofan stýringuna.',
            options: 'Fylki valkosta birtra sem víxlhnappar innan stýringarinnar.',
            required: 'Merkir reitinn sem nauðsynlegan.',
            size: 'Sjónræn stærð bútastýringarinnar.',
            value: 'Nú valið valkostagildi, tvíátta bindanlegt með [(value)].',
            changed: 'Kviknar með nýja gildinu þegar notandinn velur annan valkost.',
            select: 'Velur gefna valkostinn forritunarlega.',
          },
          'tree-node': {
            collapseLabel: 'Aðgengilegur merkimiði fyrir samanfellingaroddahnappinn.',
            disabled: 'Gerir samskipti við hnútinn og afkomendur hans óvirk.',
            expandedIds: 'Sett af hnútaauðkennum sem eru nú útbreidd.',
            expandLabel: 'Aðgengilegur merkimiði fyrir útbreiðsluoddahnappinn.',
            focusedId: 'Auðkenni hnútsins sem heldur nú á reikandi tabindex fókusnum.',
            level: 'Dýpt frá rót trésins (0-vísað), notuð fyrir inndrátt og aria-level.',
            node: 'Gagnahlutur sem lýsir þessum hnút, þar á meðal auðkenni hans, merkimiða, börnum og óvirku ástandi.',
            posInSet:
              '1-vísuð staða meðal barna foreldrahnútsins, notuð fyrir aria-posinset.',
            selectedId: 'Auðkenni nú valda hnútsins, eða null þegar ekkert er valið.',
            setSize:
              'Heildarfjöldi systkina í barnalista foreldrahnútsins, notaður fyrir aria-setsize.',
            select: 'Kviknar þegar notandinn smellir á eða virkjar hnútaröðina.',
            toggle:
              'Kviknar með hnútaauðkenni þegar notandinn smellir á útbreiðslu- eða samanfellingaroddann.',
          },
          tree: {
            ariaLabel: 'Aðgengilegur merkimiði fyrir trjáfítlið.',
            disabled: 'Gerir alla hnúta í trénu óvirka.',
            expandedIds:
              'Auðkenni nú útbreiddra greinahnúta, tvíátta bindanleg með [(expandedIds)].',
            nodes: 'Fylki trjáhnútagagnahluta sem skilgreinir stigveldið.',
            selectedId:
              'Auðkenni nú valda hnútsins, tvíátta bindanlegt með [(selectedId)].',
            size: 'Sjónræn stærð trésins, kvarðar texta og bil hlutfallslega.',
            nodeClick: 'Kviknar með hnútagögnunum þegar notandinn velur hnút.',
          },
          step: {
            completed: 'Merkir skrefið sem lokið, uppfærir sjónræna vísi þess.',
            disabled: 'Kemur í veg fyrir að skrefið sé virkjað.',
            id: 'id sett á skrefspjaldið og flipa þess, sjálfvirkt búið til þegar því er sleppt.',
            label: 'Textamerkimiði sýndur í skrefavísinum.',
            optional:
              'Merkir skrefið sem valfrjálst, sýnt sem vísbending fyrir neðan skrefamerkimiðann.',
          },
          stepper: {
            activeStep:
              'Núllvísaður stuðull nú virka skrefsins, tvíátta bindanlegur með [(activeStep)].',
            disabled: 'Gerir allt skrefatólið og alla skrefaleiðsögn óvirka.',
            id: 'id sett á hýsilstak skrefatólsins, sjálfvirkt búið til þegar því er sleppt.',
            linear:
              'Krefst þess að hvert ekki-valfrjálst skref sé merkt lokið áður en notandinn getur haldið áfram.',
            size: 'Sjónræn stærð skrefatólsins, kvarðar skrefavísana og merkimiðana saman.',
            changed:
              'Kviknar með nýja virka skrefastuðlinum þegar notandinn fer á annað skref.',
            canNavigateTo:
              'Skilar því hvort skrefið á gefnum stuðli er aðgengilegt frá núverandi ástandi.',
            indexOf: 'Skilar stuðli gefna skrefsins, eða -1 ef það er ekki skráð.',
            selectStep: 'Virkja skrefið á gefnum stuðli ef það er aðgengilegt.',
          },
          'transfer-list': {
            disabled: 'Gerir allan flutningslistann og allar færslustýringar óvirkar.',
            items: 'Fullt safn atriða tiltækra á báðum hliðum, auðkennt eftir auðkenni.',
            selectedIds:
              'Auðkenni atriðanna sem nú eru á markhliðinni (hægri), tvíátta bindanleg með [(selectedIds)].',
            size: 'Sjónræn stærð flutningslistans.',
            sourceLabel:
              'Fyrirsögn birt fyrir ofan upprunahliðina (vinstri), fellur aftur á sjálfgildi virka svæðisins.',
            targetLabel:
              'Fyrirsögn birt fyrir ofan markhliðina (hægri), fellur aftur á sjálfgildi virka svæðisins.',
          },
          'virtual-list': {
            itemHeight:
              'Pixlahæð hverrar raðar; allar raðir verða að deila sömu föstu hæð.',
            items:
              'Fullt fylki gagnaatriða til að birta; aðeins sýnilega sneiðin er fest í hverju sinni.',
            overscan:
              'Fjöldi aukaraða birtra fyrir ofan og neðan sýnilega gluggann til að draga úr auðum brúnum við hraða skrun.',
            viewportHeight: 'Pixlahæð skrunandi sýnisvæðisins.',
            scrollIndexChange:
              'Kviknar með stuðli fyrstu raðar sem er sýnileg efst í sýnisvæðinu hvenær sem notandinn skrunar.',
            scrollToIndex:
              'Skrunar sýnisvæðið svo röðin á gefnum stuðli birtist efst, fest við mörk listans.',
          },
          'field-label': {
            forId:
              'id tengdu stýringarinnar; birtir <label for> þegar sett, annars <span>.',
            labelId:
              'id sett á birta merkimiðastakið svo stýringar geti vísað í það með aria-labelledby.',
            required: 'Sýnir nauðsynlegan vísi á merkimiðanum.',
            text: 'Merkimiðatexti birtur inni í merkimiðastakinu.',
          },
          'field-messages': {
            error:
              'Villuboð til að birta; þegar sett er vísbendingin falin og skilaboðin tilkynnt sem viðvörun.',
            hint: 'Hjálpartexti sýndur fyrir neðan reitinn þegar engin villa er til staðar.',
            id: 'Grunn-id notað til að leiða út aria auðkennin fyrir villu- og vísbendingastökin.',
          },
          dialog: {
            ariaLabel:
              'Aðgengilegur merkimiði fyrir gluggann þegar hausarauf hans inniheldur ekki sýnilegan titil.',
            closeOnBackdrop:
              'Lokar glugganum þegar notandinn smellir á bakgrunnssvæðið utan spjaldsins.',
            closeOnEscape: 'Lokar glugganum þegar notandinn ýtir á Escape.',
            id: 'id sett á innbyggða gluggastakið, sjálfvirkt búið til þegar því er sleppt.',
            open: 'Hvort glugginn er sýndur, tvíátta bindanlegt með [(open)].',
            showClose: 'Sýnir lokunarhnappinn í gluggahausnum.',
            width: 'Breiddarforstilling fyrir gluggaspjaldið.',
            closed:
              'Kviknar þegar glugginn lokast, óháð því hvort honum var lokað af notandanum eða forritunarlega.',
            opened: 'Kviknar þegar glugginn hefur verið sýndur með showModal().',
          },
        },
      },
      sharedOptions: {
        fruitOptions: [
          { value: 'apple', label: 'Epli' },
          { value: 'banana', label: 'Banani' },
          { value: 'cherry', label: 'Kirsuber' },
          { value: 'date', label: 'Döðlur' },
        ],
        viewOptions: [
          { value: 'day', label: 'Dagur' },
          { value: 'week', label: 'Vika' },
          { value: 'month', label: 'Mánuður' },
        ],
        themeOptions: [
          { value: 'light', label: 'Ljóst' },
          { value: 'dark', label: 'Dökkt' },
        ],
        monthOptions: [
          { value: 'jan', label: 'Janúar' },
          { value: 'feb', label: 'Febrúar' },
          { value: 'mar', label: 'Mars' },
          { value: 'apr', label: 'Apríl' },
          { value: 'may', label: 'Maí' },
          { value: 'jun', label: 'Júní' },
          { value: 'jul', label: 'Júlí' },
          { value: 'aug', label: 'Ágúst' },
          { value: 'sep', label: 'september' },
          { value: 'oct', label: 'Október' },
          { value: 'nov', label: 'Nóvember' },
          { value: 'dec', label: 'Desember' },
        ],
        breadcrumbHome: 'Heim',
        breadcrumbProducts: 'Vörur',
        breadcrumbLaptops: 'Fartölvur',
        breadcrumbMacBookPro: 'MacBook Pro',
        breadcrumbDashboard: 'Stjórnborð',
        breadcrumbSettings: 'Stillingar',
      },
    },
  },
};

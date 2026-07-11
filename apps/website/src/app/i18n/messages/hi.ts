import type { WebMessages } from '../web-messages.types';

export const hi: WebMessages = {
  common: {
    skipToContent: 'मुख्य सामग्री पर जाएं',
    brandHome: 'eagami होम',
    navUi: 'UI',
    navUiTooltip: 'कंपोनेंट लाइब्रेरी दस्तावेज़',
    themeToggleTooltip: 'थीम बदलें',
    themeToggleLabel: next => `${next === 'light' ? 'लाइट' : 'डार्क'} मोड पर स्विच करें`,
    localeMenuLabel: 'भाषा',
    localeMenuTooltip: 'भाषा बदलें',
    activeLocale: label => `वर्तमान भाषा: ${label}`,
    footer: {
      copyright: year => `© ${year} eagami`,
      npmLink: 'npm',
      npmTooltip: 'npm पर @eagami/ui देखें',
      githubAriaLabel: 'GitHub पर eagami',
      githubTooltip: 'GitHub पर स्रोत कोड देखें',
      navLabel: 'फ़ुटर',
    },
    codeSnippet: {
      copyLabel: 'क्लिपबोर्ड पर कॉपी करें',
      copySuccess: 'क्लिपबोर्ड पर कॉपी किया गया',
      copyError: 'क्लिपबोर्ड पर कॉपी नहीं किया जा सका',
    },
  },
  home: {
    metaTitle: 'Eagami',
    metaDescription: 'सुरुचिपूर्ण वेब डिज़ाइन',
    hero: {
      tagline: 'सुरुचिपूर्ण वेब डिज़ाइन।',
      ctaPrimary: 'संपर्क करें',
      ctaSecondary: 'हाल के प्रोजेक्ट देखें →',
      scrollHint: 'सेवाओं तक स्क्रॉल करें',
    },
    services: {
      title: 'सेवाएं',
      lede: 'एक अकेले लैंडिंग पेज से लेकर पूर्ण वेब ऐप तक, और लॉन्च के बाद आने वाली हर चीज़।',
      featuresHeading: 'विशेषताएं',
      uiNote: {
        before: 'बड़े प्रोजेक्ट इस पर बनाए जा सकते हैं',
        link: 'Eagami UI',
        after:
          ', एक कस्टम कंपोनेंट लाइब्रेरी और डिज़ाइन सिस्टम, ताकि पूरी साइट पर एक सुसंगत और आधुनिक दृश्य भाषा बनी रहे।',
      },
      core: [
        {
          title: 'कस्टम वेबसाइटें',
          description:
            'शुरुआत से बनाई गई एक संपूर्ण साइट: डोमेन सेटअप, होस्टिंग, ब्रांडिंग, डिज़ाइन और लॉन्च। लॉन्च के दिन तक असीमित संशोधन।',
        },
        {
          title: 'निरंतर रखरखाव',
          description:
            'मासिक रखरखाव जिसमें होस्टिंग, सुरक्षा पैच, निर्भरता अपग्रेड, सामग्री संपादन और एनालिटिक्स समीक्षाएं शामिल हैं।',
        },
      ],
      addOns: [
        {
          title: 'उपयोगकर्ता प्रबंधन',
          description:
            'उपयोगकर्ता प्रमाणीकरण, पंजीकरण और पासवर्ड पुनर्प्राप्ति, साथ ही मेट्रिक्स और प्रति-उपयोगकर्ता नियंत्रण वाला एक एडमिन डैशबोर्ड।',
          iconSlug: 'users',
        },
        {
          title: 'भुगतान प्रसंस्करण',
          description:
            'ऑनलाइन भुगतान (डिफ़ॉल्ट रूप से Stripe, अनुरोध पर अन्य प्रदाता), अनुकूलन योग्य भुगतान फ़ॉर्म और आवर्ती बिलिंग के साथ।',
          iconSlug: 'credit-card',
        },
        {
          title: 'बहुभाषी समर्थन',
          description:
            'कई भाषाओं के लिए समर्थन, आगंतुक के ब्राउज़र से वैकल्पिक स्वतः-पहचान के साथ।',
          iconSlug: 'languages',
        },
        {
          title: 'थीमिंग',
          description: 'डार्क/लाइट मोड टॉगल और पूरी तरह अनुकूलन योग्य रंग थीम।',
          iconSlug: 'moon',
        },
        {
          title: 'एनालिटिक्स और अंतर्दृष्टि',
          description:
            'वेबसाइट ट्रैफ़िक मेट्रिक्स (स्रोत, डिवाइस, स्थान), साथ ही कस्टम इवेंट ट्रैकिंग।',
          iconSlug: 'bar-chart',
        },
        {
          title: 'ईमेल और सूचनाएं',
          description: 'खाता गतिविधि, रसीदों और घोषणाओं के लिए स्वचालित ईमेल।',
          iconSlug: 'mail',
        },
      ],
    },
    projects: {
      title: 'हाल के प्रोजेक्ट',
      lede: 'सक्रिय विकास में कुछ साइटें।',
      previousAriaLabel: 'पिछले प्रोजेक्ट',
      nextAriaLabel: 'अगले प्रोजेक्ट',
      regionAriaLabel: 'हाल के प्रोजेक्ट',
      showing: title => `${title} दिखाया जा रहा है`,
      cards: [
        {
          title: 'London Chess',
          description: 'लंदन शतरंज क्लब और लंदन, ON में शतरंज आयोजनों के लिए एक केंद्र।',
          url: 'https://londonchess.ca',
          display: 'londonchess.ca',
          logo: 'assets/projects/londonchess.svg',
        },
        {
          title: 'CIRC Aesthetics',
          description: 'लंदन, ON स्थित कॉस्मेटिक इंटरवेंशनल रेडियोलॉजी क्लिनिक।',
          url: 'https://circaesthetics.ca',
          display: 'circaesthetics.ca',
          logo: 'assets/projects/circaesthetics.svg',
        },
        {
          title: 'Brewski Bets',
          description:
            'दोस्तों के बीच आकस्मिक शर्तों का एक ट्रैकर, बीयर में चुकाई जाने वाली।',
          url: 'https://brewskibets.com',
          display: 'brewskibets.com',
          logo: 'assets/projects/brewskibets.svg',
        },
        {
          title: 'Chordbomb',
          description: 'जल्द आ रहा है...',
          url: 'https://chordbomb.com',
          display: 'chordbomb.com',
          logo: 'assets/projects/chordbomb.svg',
        },
      ],
    },
    contact: {
      title: 'कोई प्रोजेक्ट मन में है?',
      lede: 'इसके बारे में सुनना चाहेंगे!',
      success: 'संदेश के लिए धन्यवाद। आपको जल्द ही जवाब मिलेगा।',
      nameLabel: 'नाम',
      namePlaceholder: 'आपका नाम',
      emailLabel: 'ईमेल',
      emailPlaceholder: 'you@example.com',
      emailInvalid: 'कृपया एक मान्य ईमेल पता दर्ज करें',
      messageLabel: 'संदेश',
      placeholderHints: [
        'नमस्ते! मैं एक साइड प्रोजेक्ट पर काम कर रहा हूं और फ्रंटएंड में मदद चाहूंगा...',
        'हमारे छोटे व्यवसाय के लिए एक वेबसाइट बनाने वाले किसी की तलाश में...',
        'शुरू करने से पहले कंपोनेंट लाइब्रेरी के बारे में एक छोटा सवाल...',
      ],
      submit: 'संदेश भेजें',
      sentToast: 'संदेश भेजा गया',
      errorMessage:
        'क्षमा करें, कुछ गलत हो गया। कृपया सीधे michal@eagami.com पर ईमेल करें।',
    },
  },
  notFound: {
    metaTitle: 'Eagami | 404',
    metaDescription: 'पेज नहीं मिला।',
    eyebrow: '404',
    title: 'पेज नहीं मिला',
    lede: 'जिस पेज की आप तलाश कर रहे थे वह मौजूद नहीं है या स्थानांतरित हो गया है।',
    cta: 'होम पर वापस जाएं',
  },
  ui: {
    metaTitle: 'Eagami | UI',
    changelog: {
      title: 'चेंजलॉग',
      metaTitle: 'Eagami | चेंजलॉग',
      metaDescription: 'Eagami UI Angular कंपोनेंट लाइब्रेरी का रिलीज़ इतिहास।',
      lead: '@eagami/ui में उल्लेखनीय परिवर्तन, नवीनतम पहले।',
      migrationGuide: 'माइग्रेशन गाइड',
      fullHistory: 'GitHub पर पूरा इतिहास',
    },
    shell: {
      changelog: 'चेंजलॉग',
      sidebarLabel: 'दस्तावेज़ साइडबार',
      navLabel: 'दस्तावेज़',
      overview: 'अवलोकन',
      setup: 'सेटअप',
      designTokens: 'डिज़ाइन टोकन',
      themeBuilder: 'थीम बिल्डर',
      icons: 'आइकन',
      i18n: 'अंतर्राष्ट्रीयकरण',
      accessibility: 'सुलभता',
      components: 'कंपोनेंट',
    },
    index: {
      metaTitle: 'Eagami | UI',
      metaDescription:
        'CSS कस्टम प्रॉपर्टीज़ पर बनी हल्की, सुलभ Angular कंपोनेंट लाइब्रेरी।',
      title: 'Eagami UI',
      ledeBefore: 'एक हल्की, सुलभ Angular कंपोनेंट लाइब्रेरी है।',
      ledeAfter:
        'बॉक्स से बाहर समझदार डिफ़ॉल्ट, और किसी भी ब्रांड के अनुरूप पूरी तरह अनुकूलन योग्य डिज़ाइन।',
      principlesHeading: 'डिज़ाइन सिद्धांत',
      principles: [
        {
          title: 'सुलभ',
          body: 'कीबोर्ड नेविगेशन, फ़ोकस प्रबंधन, स्क्रीन-रीडर समर्थन और कम-गति हैंडलिंग हर कंपोनेंट में अंतर्निहित हैं।',
        },
        {
          title: 'हल्का',
          body: 'प्रत्येक कंपोनेंट स्वतंत्र रूप से इम्पोर्ट होता है और बंडल केवल वही शिप करता है जो आप उपयोग करते हैं।',
        },
        {
          title: 'थीम योग्य',
          body: 'हर पेज पर एकीकृत रूप बनाए रखते हुए डिज़ाइन टोकन के साथ पूरी तरह अनुकूलन योग्य। लाइट और डार्क वेरिएंट साथ शिप होते हैं और डिफ़ॉल्ट रूप से उपयोगकर्ता की सिस्टम वरीयता का अनुसरण करते हैं।',
        },
        {
          title: 'स्थानीयकृत',
          body: 'अंतर्निहित कंपोनेंट टेक्स्ट सभी समर्थित भाषाओं में शिप होता है।',
        },
        {
          title: 'आधुनिक',
          body: 'नवीनतम Angular सुविधाओं और आधुनिक वेब मानकों के साथ नियमित रूप से अद्यतन।',
        },
        {
          title: 'अनलॉक',
          body: 'प्रत्येक कंपोनेंट सादा Angular और CSS है, बिना किसी वेंडर लॉक-इन के, इसलिए स्रोत को आपके प्रोजेक्ट के किसी भी अन्य कोड की तरह पढ़ा, कॉपी या संशोधित किया जा सकता है।',
        },
      ],
      getStartedHeading: 'शुरू करें',
      getStartedBefore: 'जाएं',
      getStartedLink: 'सेटअप',
      /* Leading space because the template suppresses whitespace between the
         link and this string so Polish can butt its trailing comma directly
         against "Instalacji". Locales that continue with a word (en/fr/el/es)
         provide the separator themselves. */
      getStartedAfter: ' पर पैकेज इंस्टॉल करने और ग्लोबल स्टाइलशीट को जोड़ने के लिए।',
      showcase: {
        button: 'मुझे दबाएं',
        toggle: 'मुझे टॉगल करें',
        tick: 'मुझे टिक करें',
        tag: 'टैग',
        badge: 'बैज',
        tooltip: 'टूलटिप में प्रदर्शित अतिरिक्त जानकारी',
        exploreMore: '...और कंपोनेंट का अन्वेषण करें',
        list: 'सूची',
        grid: 'ग्रिड',
        table: 'तालिका',
        radioThis: 'यह',
        radioThat: 'वह',
        option1: 'विकल्प 1',
        option2: 'विकल्प 2',
        option3: 'विकल्प 3',
        toastButton: 'बटन दबाया गया',
        toastToggleOn: 'टॉगल चालू किया गया',
        toastToggleOff: 'टॉगल बंद किया गया',
        toastTickOn: 'चेकबॉक्स टिक किया गया',
        toastTickOff: 'चेकबॉक्स अनटिक किया गया',
        ariaView: 'डेमो व्यू',
        ariaSlider: 'डेमो स्लाइडर',
        ariaRating: 'डेमो रेटिंग',
        ariaLayout: 'डेमो लेआउट',
        ariaColor: 'डेमो रंग',
        ariaSelect: 'डेमो चयन',
        ariaDate: 'डेमो तिथि',
        ariaMultiSelect: 'डेमो बहु-चयन',
        msMusic: 'संगीत',
        msTravel: 'यात्रा',
        msFood: 'भोजन',
      },
      theme: {
        heading: 'इसे अपना बनाएं',
        ledeBefore: '',
        ledeLink: 'डिज़ाइन टोकन',
        ledeAfter:
          ' ही हर Eagami प्रोजेक्ट को एक अलग पहचान देते हैं: अनुकूलन योग्य रंग, फ़ॉन्ट, स्पेसिंग, कोने, छायाएं और मोशन, जो पूरी साइट या ऐप पर लागू होते हैं। नीचे कुछ बदलें और देखें कि वे घटकों को कैसे प्रभावित करते हैं।',
        brandColor: 'ब्रांड रंग',
        radius: 'कोना त्रिज्या',
        font: 'फ़ॉन्ट',
        fontDefault: '(डिफ़ॉल्ट)',
        reset: 'रीसेट करें',
      },
    },
    setup: {
      metaTitle: 'Eagami | UI | सेटअप',
      metaDescription:
        '@eagami/ui इंस्टॉल करें और ग्लोबल स्टाइलशीट तथा फ़ॉन्ट को जोड़ें।',
      title: 'सेटअप',
      ngAddLabel: 'एक कमांड से सब कुछ इंस्टॉल और कॉन्फ़िगर करें:',
      manualLabel: 'या इसे मैन्युअल रूप से सेट करें:',
      installLabel: 'पैकेज इंस्टॉल करें:',
      or: 'या',
      stylesheetLabel: {
        before: 'ग्लोबल स्टाइलशीट जोड़ें',
        after: ':',
      },
      fontsLabel: {
        before: 'फ़ॉन्ट लोड करें',
        after: ':',
      },
      firstComponentHeading: 'आपका पहला कंपोनेंट',
    },
    themeBuilder: {
      metaTitle: 'Eagami | UI | थीम बिल्डर',
      metaDescription:
        'अपने ब्रांड रंगों से लाइट और डार्क मोड के लिए WCAG-जाँची गई पैलेट बनाएँ, फिर प्रोवाइडर कॉन्फ़िगरेशन या CSS कॉपी करें।',
      title: 'थीम बिल्डर',
      lede: 'अपने ब्रांड रंग चुनें और Eagami UI, OKLCH स्पेस में पूरी 50–900 स्केल बनाता है, लाइट और डार्क मोड में इसके WCAG कंट्रास्ट की जाँच करता है, और आपको सीधे उपयोग के लिए <code>provideEagamiUi()</code> कॉन्फ़िगरेशन देता है।',
      controlsHeading: 'ब्रांड रंग',
      primaryLabel: 'प्राथमिक रंग',
      secondaryLabel: 'द्वितीयक रंग',
      contrastHeading: 'सुलभता',
      contrastPass: 'लाइट और डार्क दोनों मोड में WCAG 2.2 AA कंट्रास्ट पूरा करता है',
      contrastFailIntro: 'कुछ संयोजन WCAG AA कंट्रास्ट सीमा से नीचे हैं:',
      scaleHeading: 'जनरेट की गई स्केल',
      previewHeading: 'पूर्वावलोकन',
      previewHint: 'डार्क मोड में पैलेट देखने के लिए साइट थीम बदलें।',
      previewButton: 'शुरू करें',
      previewSwitch: 'सूचनाएँ',
      previewPrimary: 'प्राथमिक',
      previewSecondary: 'द्वितीयक',
      previewStep1: 'खाता',
      previewStep2: 'प्रोफ़ाइल',
      previewStep3: 'पूर्ण',
      previewProgress: 'प्रगति:',
      exportHeading: 'इसका उपयोग करें',
      exportConfigLabel: 'प्रोवाइडर कॉन्फ़िगरेशन',
      exportCssLabel: 'CSS कस्टम प्रॉपर्टीज़',
    },
    tokens: {
      metaTitle: 'Eagami | UI | डिज़ाइन टोकन',
      metaDescription:
        'रंगों, टाइपोग्राफी, स्पेसिंग, उन्नयन, आकार और गति के लिए CSS कस्टम प्रॉपर्टीज़।',
      title: 'डिज़ाइन टोकन',
      lede: 'CSS कस्टम प्रॉपर्टीज़ जो लाइब्रेरी के हर कंपोनेंट को चलाती हैं: रंग, टाइपोग्राफी, स्पेसिंग, उन्नयन, आकार और गति। पूरे ऐप में दृश्य संगति बनाए रखने के लिए अपनी शैलियों में इन टोकन को <code>var(--token-name)</code> के माध्यम से संदर्भित करें।',
      sections: {
        theming: 'थीमिंग',
        palette: 'ब्रांड पैलेट',
        colors: 'रंग',
        typography: 'टाइपोग्राफी',
        spacing: 'स्पेसिंग',
        elevation: 'उन्नयन',
        shape: 'आकार',
        motion: 'गति',
      },
      themingRootBefore:
        'पूरी लाइब्रेरी को री-थीम करने के लिए <code>:root</code> पर किसी भी टोकन को ओवरराइड करें:',
      themingScopedBefore:
        'या जहां उपयोगी हो, ओवरराइड को अलग-अलग कंपोनेंट तक सीमित करें:',
      paletteIntro:
        '<code>provideEagamiUi()</code> को एक अकेला ब्रांड hex पास करें और लाइब्रेरी <a href="https://www.w3.org/TR/css-color-4/#ok-lab" target="_blank" rel="noopener noreferrer"><span>OKLCH</span></a> स्पेस में दस-शेड का पूरा स्केल (50 से 900 तक) निकालती है, ह्यू और क्रोमा को स्थिर रखते हुए केवल लाइटनेस को बदलती है। निकाले गए शेड लाइट और डार्क दोनों मोड में हर <code>--color-brand-*</code> टोकन को फ़ीड करते हैं:',
      paletteOverrides:
        'विशिष्ट शेड पिन करें या यह रीमैप करें कि कौन सा निकाला गया शेड प्रत्येक सिमेंटिक भूमिका को सपोर्ट करता है:',
      paletteContrast:
        'प्रत्येक ब्रांड-भूमिका जोड़ी (सरफ़ेस पर टेक्स्ट, कैनवास पर सरफ़ेस) की बूटस्ट्रैप पर WCAG 2.1 AA के विरुद्ध जांच की जाती है। एक विफल संयोजन ऐप लोड होने से पहले ही त्रुटि देता है, इसलिए ब्रांड रंग में कंट्रास्ट बग प्रोडक्शन के बजाय बूट पर पकड़ा जाता है।',
      paletteBuilderIntro: 'दृश्य रूप से पैलेट बनाने और उसका पूर्वावलोकन करने के लिए:',
      paletteBuilderLink: 'थीम बिल्डर',
      elevationDrop: 'ड्रॉप शैडो',
      elevationRelief: 'बेवल और वेल',
      elevationReliefBefore:
        '<code>--shadow-bevel</code> एक इनसेट हाइलाइट (शीर्ष) को एक इनसेट शैडो (तल) के साथ जोड़ता है उन सरफ़ेस के लिए जो उठी हुई पढ़ी जानी चाहिए। <code>--shadow-well</code> धंसे हुए रूप के लिए प्रकाश को उलट देता है। एम्बिएंट ड्रॉप के लिए <code>--shadow-*</code> के साथ मिलाएं: <code>box-shadow: var(--shadow-bevel), var(--shadow-sm);</code>',
      colorsPrimary: 'प्राथमिक',
      colorsSecondary: 'द्वितीयक',
      colorsNeutral: 'तटस्थ',
      colorsStatus: 'स्थिति',
      colorsSemantic: 'सिमेंटिक',
      typographyFamilies: 'फ़ैमिली',
      typographySizes: 'आकार',
      typographyWeights: 'वज़न',
      typographyComposites: 'संयुक्त शैलियां',
      typographyCompositesBefore:
        'संयुक्त टोकन एक विशिष्ट भूमिका के लिए एक आकार, वज़न, लाइन-हाइट (और कभी-कभी फ़ैमिली) को बंडल करते हैं। <code>--text-section-heading-*</code> पहला संयुक्त टोकन है जो एक फ़ॉन्ट-फ़ैमिली को पिन करता है। इसे दस्तावेज़ और मार्केटिंग पेजों पर <code>&lt;h2&gt;</code> उपखंड शीर्षक के लिए उपयोग करें।',
      typographySectionHeadingSample: 'ब्रांड वॉइस सेक्शन शीर्षक',
      motionSimulate: 'अनुकरण करें',
      motionDurations: 'अवधि',
      motionEasings: 'ईज़िंग',
    },
    icons: {
      metaTitle: 'Eagami | UI | आइकन',
      metaDescription: '@eagami/ui के साथ बंडल किया गया आइकन सेट।',
      title: 'आइकन',
      lede: 'स्टैंडअलोन Angular कंपोनेंट जो अपना रंग विरासत में लेते हैं और <code>font-size</code> के साथ स्केल होते हैं, इसलिए वे किसी भी आकार पर रेंडर होते हैं। अधिकांश <a href="https://github.com/colebemis" target="_blank" rel="noopener noreferrer"><span>Cole Bemis</span></a> द्वारा बनाए गए <a href="https://feathericons.com/" target="_blank" rel="noopener noreferrer"><span>Feather Icons</span></a> से <a href="https://github.com/feathericons/feather/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><span>MIT लाइसेंस</span></a> के तहत प्राप्त किए गए हैं; शेष मूल Eagami UI आइकन हैं। Feather आइकन को पतले या मोटे स्ट्रोक के साथ भी बनाया जा सकता है। किसी आइकन का सेलेक्टर कॉपी करने के लिए उस पर क्लिक करें।',
      filterLabel: 'आइकन फ़िल्टर करें',
      filterPlaceholder: 'आइकन खोजें',
      filterClearLabel: 'खोज साफ़ करें',
      categoryFeather: 'Feather',
      categoryEagami: 'Eagami UI',
      categoryBrand: 'ब्रांड',
      countAll: count => `${count} आइकन`,
      countFiltered: (shown, total) => `${total} में से ${shown} आइकन`,
      noResults: 'आपकी खोज से कोई आइकन मेल नहीं खाता',
      copiedToast: selector => `"${selector}" क्लिपबोर्ड पर कॉपी किया गया`,
      copyFailedToast: selector => `"${selector}" क्लिपबोर्ड पर कॉपी नहीं किया जा सका`,
      brandTitle: 'ब्रांड आइकन',
      brandIntro:
        'नीचे दी गई सूची में ब्रांड आइकन तृतीय-पक्ष ट्रेडमार्क को दर्शाते हैं और केवल नाममात्र उपयोग के लिए प्रदान किए जाते हैं, अर्थात UI में उस ब्रांड की पहचान के लिए जिसका वे प्रतिनिधित्व करते हैं ("Google से साइन इन करें" बटन, "Facebook पर शेयर करें" लिंक, इत्यादि)। वे सामान्य सजावटी उपयोग के लिए लाइसेंस प्राप्त नहीं हैं। उपभोक्ता प्रत्येक ब्रांड के दिशानिर्देशों का पालन करने के लिए जिम्मेदार हैं:',
      brandLinkLabel: 'ब्रांड संसाधन',
    },
    i18n: {
      metaTitle: 'Eagami | UI | अंतर्राष्ट्रीयकरण',
      metaDescription:
        '15 लोकेल में अंतर्निहित कंपोनेंट टेक्स्ट, रनटाइम स्विचिंग और प्रति-स्ट्रिंग ओवरराइड के साथ।',
      title: 'अंतर्राष्ट्रीयकरण',
      lede: 'प्रत्येक अंतर्निहित स्ट्रिंग (ARIA लेबल, प्लेसहोल्डर, खाली स्थितियां, डेट-पिकर नियंत्रण) 15 लोकेल में शिप होती है। पूरे ऐप के लिए एक सेट करें, रनटाइम पर स्विच करें, या अलग-अलग स्ट्रिंग को ओवरराइड करें।',
      supportedHeading: 'समर्थित लोकेल',
      supportedFallback:
        'अज्ञात लोकेल अंग्रेज़ी पर फ़ॉलबैक करते हैं, जैसा कि आंशिक ओवरराइड से गायब कोई भी कुंजी।',
      quickSetupHeading: 'त्वरित सेटअप',
      quickSetupBefore:
        'अपने ऐप कॉन्फ़िग में <code>provideEagamiUi()</code> जोड़ें और <code>locales</code> के माध्यम से उपयोग की जाने वाली भाषाएं पंजीकृत करें। अंग्रेज़ी हमेशा उपलब्ध रहती है, इसलिए आप केवल वही शिप करते हैं जिसकी आपको आवश्यकता है।',
      liveDemoHeading: 'लाइव डेमो',
      liveDemoIntro:
        'एक लोकेल चुनें और देखें कि नीचे दिए गए कंपोनेंट कैसे मेल खाने वाली स्ट्रिंग और डेट फ़ॉर्मेटिंग को उठाते हैं।',
      runtimeSwitchHeading: 'रनटाइम स्विचिंग',
      runtimeSwitchBefore:
        '<code>EagamiI18nService</code> इंजेक्ट करें और <code>setLocale()</code> कॉल करें। सक्रिय लोकेल एक सिग्नल है, इसलिए प्रत्येक कंपोनेंट बिना रिफ़्रेश के नई स्ट्रिंग के साथ री-रेंडर होता है।',
      perStringHeading: 'प्रति-स्ट्रिंग ओवरराइड',
      perStringBefore:
        'अलग-अलग स्ट्रिंग को स्वैप करने के लिए लोकेल के साथ एक <code>messages</code> ऑब्जेक्ट पास करें। जो भी आप छोड़ देते हैं वह लोकेल के डिफ़ॉल्ट पर फ़ॉलबैक करता है।',
      perStringAfter:
        'अधिकांश कंपोनेंट कॉल साइट पर एक-बार के ओवरराइड के लिए अलग-अलग संदेश इनपुट भी उजागर करते हैं (उदाहरण के लिए <code>&lt;ea-dropdown&gt;</code> पर <code>placeholder</code>)।',
      frenchSpacingHeading: 'फ़्रेंच स्पेसिंग हेल्पर',
      frenchSpacingBody:
        'फ़्रेंच टाइपोग्राफी <code>? ! : ; »</code> से पहले और <code>«</code> के बाद एक संकीर्ण नॉन-ब्रेकिंग स्पेस की अपेक्षा करती है। एक्सपोर्ट किया गया <code>frenchSpacing()</code> हेल्पर आपकी अपनी फ़्रेंच स्ट्रिंग में नियमित स्पेस को बदलता है (लाइब्रेरी अपने बंडल किए गए फ़्रेंच संदेशों को आंतरिक रूप से संभालती है)।',
      demoLocaleLabel: 'लोकेल',
    },
    accessibility: {
      metaTitle: 'Eagami | UI | सुलभता',
      metaDescription:
        'WCAG 2.2 AA अनुरूपता, पूर्ण कीबोर्ड समर्थन और स्क्रीन-रीडर अनुकूल कंपोनेंट, हर रिलीज़ के साथ सत्यापित।',
      title: 'सुलभता',
      lede: 'प्रत्येक कंपोनेंट अग्रणी वेब सुलभता मानकों के अनुसार बनाया गया है: सही सिमेंटिक्स, पूर्ण कीबोर्ड समर्थन, फ़ोकस प्रबंधन और स्क्रीन-रीडर घोषणाएं बॉक्स से बाहर काम करती हैं।',
      conformanceHeading: 'अनुरूपता',
      conformanceBody:
        'लाइब्रेरी <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener">WCAG 2.2 Level AA</a> का अनुपालन करती है, वह मानक जिसे पूरा करना अधिकांश संगठनों के लिए आवश्यक है, और डायलॉग व मेनू से लेकर स्लाइडर और डेट पिकर तक हर प्रकार के नियंत्रण के लिए आधिकारिक W3C ऑथरिंग प्रथाओं का पालन करती है। स्क्रीन-रीडर घोषणाएं हर समर्थित भाषा में शिप होती हैं, इसलिए सहायक तकनीक हमेशा उपयोगकर्ता की भाषा बोलती है।',
      builtInHeading: 'अंतर्निहित सुलभता',
      builtInItems: [
        {
          title: 'सिमेंटिक्स',
          body: 'जहां संभव हो नेटिव एलिमेंट, जहां नहीं वहां स्पष्ट ARIA भूमिकाएं, स्थितियां और प्रॉपर्टीज़। expanded, selected, checked, invalid और busy जैसी स्थितियां हमेशा प्रोग्रामेटिक रूप से उजागर होती हैं, कभी केवल स्टाइलिंग के माध्यम से नहीं।',
        },
        {
          title: 'कीबोर्ड समर्थन',
          body: 'पूर्ण APG कीबोर्ड पैटर्न: रोविंग tabindex, तीर-कुंजी नेविगेशन, Home और End, खारिज करने के लिए Escape, और सक्रिय करने के लिए Enter या Space, RTL-जागरूक तीर हैंडलिंग के साथ।',
        },
        {
          title: 'फ़ोकस प्रबंधन',
          body: 'मोडल और पिकर खुले रहते हुए फ़ोकस को ट्रैप करते हैं और बंद होने पर उसे ट्रिगर पर लौटाते हैं। फ़ोकस संकेतक हमेशा दृश्यमान रहते हैं और कभी दबाए नहीं जाते।',
        },
        {
          title: 'स्क्रीन-रीडर घोषणाएं',
          body: 'टोस्ट, अलर्ट, सत्यापन त्रुटियां और async स्थिति परिवर्तन उपयुक्त शिष्टता स्तर के साथ लाइव रीजन के माध्यम से घोषित होते हैं।',
        },
        {
          title: 'कम गति',
          body: 'एनिमेशन हर जगह prefers-reduced-motion मीडिया क्वेरी का सम्मान करते हैं।',
        },
        {
          title: 'कंट्रास्ट',
          body: 'डिफ़ॉल्ट लाइट और डार्क थीम WCAG कंट्रास्ट आवश्यकताओं को पूरा करती हैं, और थीमिंग टूल AA से नीचे गिरने वाले संयोजनों को चिह्नित करते हैं।',
        },
      ],
      labelsHeading: 'सुलभ नाम',
      labelsBefore:
        'टेक्स्ट रेंडर करने वाले कंपोनेंट स्वयं को लेबल करते हैं। केवल-आइकन या ग्राफ़िकल कुछ भी एक <code>aria-label</code> इनपुट उजागर करता है (क्लियर, क्लोज़ और डिसमिस बटन जैसे अंतर्निहित नियंत्रणों के लिए स्थानीयकृत डिफ़ॉल्ट के साथ), और फ़ॉर्म फ़ील्ड <code>label</code>, संकेतों और त्रुटि संदेशों को <code>aria-describedby</code> के माध्यम से नियंत्रण से स्वचालित रूप से जोड़ते हैं।',
      labelsAfter:
        'बिना दृश्य टेक्स्ट वाले नियंत्रणों के लिए <code>label</code> या <code>aria-label</code> प्रदान करें और बाकी सब कंपोनेंट संभाल लेता है: नाम, संकेत और त्रुटि संदेश स्वचालित रूप से आपस में जुड़े रहते हैं।',
      testingHeading: 'हर रिलीज़ के साथ सत्यापित',
      testingBody:
        'जब भी किसी कंपोनेंट में बदलाव होता है, उसे उद्योग के सुलभता नियमों के आधार पर जांचा जाता है, और रिलीज़ तभी शिप होती है जब हर जांच पास हो, इसलिए जो सुलभता आप यहां देखते हैं वह लाइब्रेरी के विकसित होने के साथ बनी रहती है।',
    },
    component: {
      metaDescription: name => `${name} कंपोनेंट संदर्भ और लाइव डेमो।`,
      demoHeading: 'डेमो',
      notFoundTitle: 'कंपोनेंट नहीं मिला',
      notFoundBody: 'साइडबार से एक कंपोनेंट चुनें, या',
      notFoundLink: 'परिचय पर वापस जाएं',
      sectionHeadings: {
        basic: 'मूल',
        variants: 'वेरिएंट',
        sizes: 'आकार',
        states: 'स्थितियां',
        disabled: 'अक्षम',
        dismissible: 'खारिज करने योग्य',
        clearable: 'साफ़ करने योग्य',
        hintAndError: 'संकेत और त्रुटि',
        withHint: 'संकेत के साथ',
        withError: 'त्रुटि के साथ',
        withLabel: 'लेबल के साथ',
        withIcons: 'आइकन के साथ',
        withFooter: 'फ़ुटर के साथ',
        withPaginator: 'पेजिनेटर के साथ',
        withDisabledItem: 'अक्षम आइटम के साथ',
        withDisabledTab: 'अक्षम टैब के साथ',
        required: 'आवश्यक',
        requiredWithHint: 'संकेत के साथ आवश्यक',
        horizontal: 'क्षैतिज',
        vertical: 'लंबवत',
        single: 'एकल',
        multi: 'बहु',
        circle: 'वृत्त',
        square: 'वर्ग',
        shapes: 'आकृतियां',
        shapesAndFallbacks: 'आकृतियां और फ़ॉलबैक',
        chevronSeparator: 'शेवरॉन विभाजक',
        slashSeparator: 'स्लैश विभाजक',
        twoLevels: 'दो स्तर',
        fourDigitPin: '4-अंकीय PIN',
        defaultHeading: 'डिफ़ॉल्ट',
        stripedAndBordered: 'धारीदार और बॉर्डर वाला',
        compactDensity: 'सघन घनत्व',
        tinyList: 'छोटी सूची',
        stickyHeader: 'स्टिकी हेडर',
        emptyState: 'खाली स्थिति',
        formatVariants: 'फ़ॉर्मेट वेरिएंट',
        minMax: 'न्यूनतम और अधिकतम',
        positions: 'स्थितियां',
        trigger: 'ट्रिगर',
        alignLeft: 'संरेखण: बाएं',
        alignCenter: 'संरेखण: केंद्र',
        manyPages: 'कई पेज',
        minimal: 'न्यूनतम',
        indeterminate: 'अनिश्चित',
        noResize: 'आकार बदलाव नहीं',
        resizing: 'आकार बदलना',
        disabledAndReadonly: 'अक्षम और केवल-पढ़ने योग्य',
        password: 'पासवर्ड',
        autocompleteSection: 'ऑटोकम्प्लीट',
        twoOptions: 'दो विकल्प',
        fullWidth: 'पूरी चौड़ाई',
        minLengthMaxResults: 'न्यूनतम लंबाई और अधिकतम परिणाम',
        removable: 'हटाने योग्य',
        minMaxLabels: 'न्यूनतम/अधिकतम लेबल',
        underline: 'अंडरलाइन',
        filled: 'भरा हुआ',
        rect: 'आयत',
        inlineLayout: 'इनलाइन लेआउट',
        noResults: 'कोई परिणाम नहीं',
        titleOnly: 'केवल शीर्षक',
        iconTrigger: 'आइकन ट्रिगर',
        placements: 'स्थान',
        canvasSizes: 'कैनवास आकार',
        cappedChipCount: 'सीमित चिप संख्या',
        customIcon: 'कस्टम आइकन',
        customIconAndColor: 'कस्टम आइकन और रंग',
        customLabel: 'कस्टम लेबल',
        halfSteps: 'आधे चरण',
        customSize: 'कस्टम आकार',
        linearFlow: 'रैखिक प्रवाह',
        manyLevels: 'कई स्तर',
        notAnimated: 'एनिमेटेड नहीं',
        outputFormats: 'आउटपुट फ़ॉर्मेट',
        numberOfStars: 'तारों की संख्या',
        minimumOne: 'न्यूनतम 1 तारा',
        quarterHourSteps: 'पंद्रह-मिनट चरण',
        readonly: 'केवल-पढ़ने योग्य',
        singleFile: 'एकल फ़ाइल',
        stepped: 'चरणबद्ध',
        sundayStart: 'रविवार से शुरू',
        twelveHourFormat: '12-घंटे फ़ॉर्मेट',
        twoActions: 'दो क्रियाएं',
        withCompletedSteps: 'पूर्ण चरणों के साथ',
        withConstraints: 'बाधाओं के साथ',
        withInitialValue: 'प्रारंभिक मान के साथ',
        withMaxlength: 'अधिकतम लंबाई के साथ',
        withMaxHeight: 'अधिकतम ऊंचाई के साथ',
        withMinMaxLabels: 'न्यूनतम/अधिकतम लेबल के साथ',
        withOptionalStep: 'वैकल्पिक चरण के साथ',
        withSeconds: 'सेकंड के साथ',
        withSelection: 'चयन के साथ',
        withoutAlpha: 'अल्फ़ा के बिना',
        withoutSearch: 'खोज के बिना',
        withoutSelectAll: 'सभी-चुनें के बिना',
        wrapping: 'रैपिंग',
      },
      common: {
        small: 'छोटा',
        medium: 'मध्यम',
        large: 'बड़ा',
        cancel: 'रद्द करें',
        save: 'सहेजें',
        close: 'बंद करें',
        confirm: 'पुष्टि करें',
        disabled: 'अक्षम',
        defaultLabel: 'डिफ़ॉल्ट',
        successLabel: 'सफलता',
        warningLabel: 'चेतावनी',
        errorLabel: 'त्रुटि',
        infoLabel: 'जानकारी',
      },
      demos: {
        accordion: {
          whatLabel: '@eagami/ui क्या है?',
          whatBody:
            'CSS कस्टम प्रॉपर्टीज़ पर बनी एक हल्की, सुलभ Angular कंपोनेंट लाइब्रेरी।',
          installLabel: 'मैं इसे कैसे इंस्टॉल करूं?',
          installBody:
            'pnpm add @eagami/ui चलाएं, फिर अपने angular.json में ग्लोबल स्टाइलशीट जोड़ें।',
          themeLabel: 'क्या मैं थीम को अनुकूलित कर सकता हूं?',
          themeBody:
            'हां, :root पर किसी भी CSS कस्टम प्रॉपर्टी को ओवरराइड करें या ओवरराइड को अलग-अलग कंपोनेंट तक सीमित करें।',
          sectionOneLabel: 'खंड एक',
          sectionOneBody: 'multi मोड में एक साथ कई खंड खुले हो सकते हैं।',
          sectionTwoLabel: 'खंड दो',
          sectionTwoBody: 'खंड दो की सामग्री।',
          disabledSectionLabel: 'अक्षम खंड',
          disabledSectionBody: 'यह सामग्री पहुंच योग्य नहीं है।',
        },
        alert: {
          defaultText: 'यह एक डिफ़ॉल्ट अलर्ट है',
          successText: 'आपके परिवर्तन सहेजे गए हैं',
          warningText: 'आपका ट्रायल 3 दिनों में समाप्त हो रहा है',
          errorText: 'कुछ गलत हो गया, कृपया फिर से प्रयास करें',
          infoText: 'एक नया संस्करण उपलब्ध है',
          dismissibleText: 'इस अलर्ट को खारिज किया जा सकता है',
          tooltipSuppressed:
            'स्टिकी-होवर व्यवहार से बचने के लिए टच डिवाइस पर टूलटिप दबा दिए जाते हैं। डेमो को क्रिया में देखने के लिए इस खंड को माउस वाले डिवाइस पर देखें।',
        },
        autocomplete: {
          startTyping: 'टाइप करना शुरू करें…',
          hintText: 'मेल देखने के लिए टाइप करना शुरू करें',
          errorText: 'कृपया एक कुत्ते की नस्ल चुनें',
          breedPlaceholder: 'कुत्ते की नस्ल…',
          minMaxLabel: 'न्यूनतम 2 अक्षर, अधिकतम 3 परिणाम',
          minMaxPlaceholder: 'कम से कम 2 अक्षर टाइप करें…',
        },
        avatarEditor: {
          result: 'परिणाम:',
        },
        badge: {
          successText: 'सक्रिय',
          warningText: 'लंबित',
          newText: 'नया',
        },
        button: {
          primary: 'प्राथमिक',
          secondary: 'द्वितीयक',
          ghost: 'घोस्ट',
          danger: 'खतरा',
          toggleLoading: 'लोडिंग टॉगल करें',
          fullWidth: 'पूरी चौड़ाई',
          clickedToast: 'बटन दबाया गया!',
        },
        card: {
          elevatedHeader: 'उन्नत',
          elevatedBody: 'शैडो उन्नयन वाला कार्ड।',
          outlinedHeader: 'रूपरेखित',
          outlinedBody: 'बॉर्डर रूपरेखा वाला कार्ड।',
          filledHeader: 'भरा हुआ',
          filledBody: 'सूक्ष्म पृष्ठभूमि वाला कार्ड।',
          cardTitleHeader: 'कार्ड शीर्षक',
          cardWithFooterBody:
            'इस कार्ड में एक हेडर, बॉडी और क्रियाओं के साथ एक फ़ुटर है।',
        },
        checkbox: {
          acceptTermsAndConditions: 'नियम और शर्तें स्वीकार करें',
          disabledChecked: 'अक्षम चेक किया गया',
          indeterminate: 'अनिश्चित',
          iAgreeToTerms: 'मैं शर्तों से सहमत हूं',
          subscribeToUpdates: 'अपडेट की सदस्यता लें',
          subscribeHint: 'एक मासिक डाइजेस्ट भेजा जाता है, कोई स्पैम नहीं',
          acceptTermsLabel: 'शर्तें स्वीकार करें',
          acceptTermsError: 'जारी रखने के लिए शर्तें स्वीकार करनी होंगी',
        },
        codeInput: {
          verificationCodeLabel: 'सत्यापन कोड',
          verificationCodeHint: '6-अंकीय कोड के लिए अपना ईमेल जांचें',
          verificationCodeError: 'अमान्य सत्यापन कोड',
          pinLabel: 'PIN',
          pinHint: 'अपना 4-अंकीय PIN दर्ज करें',
        },
        colorPicker: {
          brandLabel: 'ब्रांड रंग',
          hintBrandColor: 'प्राथमिक ब्रांड रंग के रूप में उपयोग किया जाता है',
          errorRequired: 'यह फ़ील्ड आवश्यक है',
          hexLabel: 'HEX फ़ॉर्मेट',
          rgbLabel: 'RGB फ़ॉर्मेट',
          hslLabel: 'HSL फ़ॉर्मेट',
          noAlphaHeading: 'केवल अपारदर्शी',
          opaqueOnlyLabel: 'ठोस रंग',
        },
        dataTable: {
          tableColumnId: 'ID',
          tableColumnFirstName: 'पहला नाम',
          tableColumnLastName: 'अंतिम नाम',
          tableColumnAdmin: 'एडमिन',
          tableColumnPosts: 'पोस्ट',
        },
        datePicker: {
          appointmentLabel: 'अपॉइंटमेंट',
          pickDatePlaceholder: 'एक तारीख चुनें…',
          hintAnyFutureDate: 'कोई भी भविष्य की तारीख चुनें',
          errorRequired: 'यह फ़ील्ड आवश्यक है',
          shortLabel: 'छोटा',
          mediumLabel: 'मध्यम',
          longLabel: 'लंबा',
          withinNextWeeksLabel: 'अगले 3 सप्ताह के भीतर',
          withinNextWeeksHint: 'आज से ±1 सप्ताह / +3 सप्ताह',
        },
        dialog: {
          openButton: 'डायलॉग खोलें',
          title: 'डायलॉग शीर्षक',
          body: 'यह डायलॉग बॉडी है। यह फ़ॉर्म, टेक्स्ट और अन्य कंपोनेंट सहित किसी भी सामग्री का समर्थन करती है।',
        },
        divider: {
          orLabel: 'या',
          sectionLabel: 'खंड',
          leftLabel: 'बाएं',
          rightLabel: 'दाएं',
        },
        drawer: {
          openButton: 'ड्रॉअर खोलें',
          rightButton: 'दाएं',
          leftButton: 'बाएं',
          topButton: 'ऊपर',
          bottomButton: 'नीचे',
          rightTitle: 'दायां ड्रॉअर',
          rightBody: 'दाएं किनारे से अंदर सरकता है, विवरण पैनल के लिए उपयोगी।',
          leftTitle: 'बायां ड्रॉअर',
          leftBody: 'बाएं से अंदर सरकता है, नेविगेशन मेनू के लिए उपयोगी।',
          topTitle: 'ऊपरी ड्रॉअर',
          topBody: 'ऊपर से नीचे सरकता है, सूचनाओं के लिए उपयोगी।',
          bottomTitle: 'निचला ड्रॉअर',
          bottomBody: 'नीचे से ऊपर सरकता है, मोबाइल पर एक्शन शीट के लिए सामान्य।',
        },
        dropdown: {
          fruitLabel: 'फल',
          fruitPlaceholder: 'एक फल चुनें…',
          hintFavourite: 'अपना पसंदीदा चुनें',
          errorRequired: 'यह फ़ील्ड आवश्यक है',
          selectPlaceholder: 'चुनें…',
        },
        emptyState: {
          noItemsTitle: 'अभी तक कोई आइटम नहीं',
          noItemsDescription: 'अपना पहला आइटम बनाकर शुरुआत करें।',
          createItem: 'आइटम बनाएं',
          noResultsTitle: 'कोई परिणाम नहीं मिला',
          noResultsDescription:
            'जो आप ढूंढ रहे हैं उसे खोजने के लिए अपनी खोज या फ़िल्टर समायोजित करने का प्रयास करें।',
          clearFilters: 'फ़िल्टर साफ़ करें',
          nothingHereTitle: 'यहां देखने के लिए कुछ नहीं है',
        },
        fileUploader: {
          attachmentsLabel: 'संलग्नक',
          imagesLabel: 'छवियां अपलोड करें',
          imagesHint: 'PNG या JPEG, प्रत्येक 2 MB तक, अधिकतम 4 फ़ाइलें',
          resumeLabel: 'रिज़्यूमे अपलोड करें',
          customIconLabel: 'फ़ाइलें संलग्न करें',
          withHintHint: 'प्रति फ़ाइल 10 MB तक',
          withErrorText: 'कम से कम एक छवि आवश्यक है',
        },
        formField: {
          emailPlaceholder: 'you@example.com',
        },
        input: {
          defaultLabel: 'डिफ़ॉल्ट',
          enterTextPlaceholder: 'टेक्स्ट दर्ज करें…',
          hintGuidance: 'सहायक मार्गदर्शन यहां जाता है',
          errorRequired: 'यह फ़ील्ड आवश्यक है',
          readonlyLabel: 'केवल-पढ़ने योग्य',
          readonlyValue: 'केवल-पढ़ने योग्य मान',
          passwordLabel: 'पासवर्ड',
          passwordPlaceholder: 'अपना पासवर्ड दर्ज करें…',
          passwordNoToggleLabel: 'पासवर्ड (टॉगल छिपा हुआ)',
          passwordNoTogglePlaceholder: 'कोई दृश्यता टॉगल नहीं',
          emailLabel: 'ईमेल',
          emailPlaceholder: 'you@example.com',
        },
        menu: {
          openButton: 'मेनू खोलें',
          edit: 'संपादित करें',
          duplicate: 'डुप्लिकेट करें',
          archive: 'संग्रहित करें',
          delete: 'हटाएं',
          file: 'फ़ाइल',
          moreOptionsLabel: 'अधिक विकल्प',
          view: 'देखें',
          rename: 'नाम बदलें',
          newItem: 'नया',
          open: 'खोलें',
          saveUnavailable: 'सहेजें (अनुपलब्ध)',
          saveAs: 'इस रूप में सहेजें',
        },
        popover: {
          openLabel: 'पॉपओवर खोलें',
          basicContent:
            'अपने ट्रिगर पर एंकर की गई एक तैरती सरफ़ेस। इसे मेनू, ड्रॉपडाउन और कस्टम ओवरले के लिए एक बिल्डिंग ब्लॉक के रूप में उपयोग करें।',
          placementTopLabel: 'ऊपर',
          placementTopStartLabel: 'ऊपर-शुरू',
          placementTopEndLabel: 'ऊपर-अंत',
          placementBottomLabel: 'नीचे',
          placementBottomStartLabel: 'नीचे-शुरू',
          placementBottomEndLabel: 'नीचे-अंत',
          placementLeftLabel: 'बाएं',
          placementRightLabel: 'दाएं',
          placementTopContent: 'ट्रिगर के ऊपर केंद्रित',
          placementTopStartContent: 'ट्रिगर के ऊपर, उसके बाएं किनारे से संरेखित',
          placementTopEndContent: 'ट्रिगर के ऊपर, उसके दाएं किनारे से संरेखित',
          placementBottomContent: 'ट्रिगर के नीचे केंद्रित',
          placementBottomStartContent: 'ट्रिगर के नीचे, उसके बाएं किनारे से संरेखित',
          placementBottomEndContent: 'ट्रिगर के नीचे, उसके दाएं किनारे से संरेखित',
          placementLeftContent: 'ट्रिगर के बाईं ओर केंद्रित',
          placementRightContent: 'ट्रिगर के दाईं ओर केंद्रित',
        },
        progressBar: {
          processing: 'प्रसंस्करण…',
        },
        radio: {
          appleLabel: 'सेब',
          bananaLabel: 'केला',
          cherryLabel: 'चेरी',
          optionALabel: 'विकल्प A',
          optionBLabel: 'विकल्प B',
          subscriptionPlanLabel: 'सदस्यता योजना',
          freeLabel: 'मुफ़्त',
          proLabel: 'Pro',
          enterpriseLabel: 'एंटरप्राइज़',
          deliverySpeedLabel: 'डिलीवरी गति',
          deliverySpeedHint: 'चुनें कि आप इसे कितनी जल्दी चाहते हैं',
          standardLabel: 'मानक',
          expressLabel: 'एक्सप्रेस',
          accountTypeLabel: 'खाता प्रकार',
          accountTypeError: 'कृपया एक खाता प्रकार चुनें',
          personalLabel: 'व्यक्तिगत',
          businessLabel: 'व्यवसाय',
        },
        rating: {
          experienceLabel: 'अपने अनुभव को रेट करें',
          halfStepsLabel: 'आधे-चरण रेटिंग',
          halfStepsHint:
            '0.5 की वृद्धि सेट करने के लिए किसी तारे के बाएं या दाएं आधे भाग पर क्लिक करें।',
          readonlyLabel: 'औसत रेटिंग',
          withHintHint: 'रेटिंग सेट करने के लिए किसी तारे पर टैप करें',
          withErrorText: 'एक रेटिंग आवश्यक है',
          numberOfStarsLabel: 'इसे रेट करें',
          customIconLabel: 'आप इसे कितना पसंद करते हैं?',
        },
        segmented: {
          viewLabel: 'व्यू',
          themeLabel: 'थीम',
          themeHint: 'पूरे ऐप को प्रभावित करता है',
          layoutLabel: 'लेआउट',
          layoutError: 'लेआउट चयन आवश्यक है',
          viewOptionList: 'सूची',
          viewOptionGrid: 'ग्रिड',
          viewOptionKanban: 'कानबन',
          themeOptionLight: 'लाइट',
          themeOptionDark: 'डार्क',
        },
        slider: {
          volumeLabel: 'वॉल्यूम',
          brightnessLabel: 'चमक',
          withHintLabel: 'संकेत के साथ',
          sliderHint: 'समायोजित करने के लिए हैंडल खींचें या तीर कुंजियों का उपयोग करें',
          withErrorLabel: 'त्रुटि के साथ',
          sliderError: 'कृपया 50 से ऊपर का मान चुनें',
        },
        switch: {
          enableNotificationsLabel: 'सूचनाएं सक्षम करें',
          disabledOnLabel: 'चालू पर अक्षम',
          confirmConsentLabel: 'सहमति की पुष्टि करें',
          marketingEmailsLabel: 'मार्केटिंग ईमेल',
          marketingEmailsHint: 'किसी भी समय सदस्यता समाप्त करें',
          twoFactorAuthLabel: 'दो-कारक प्रमाणीकरण',
          twoFactorAuthError: 'दो-कारक प्रमाणीकरण सक्षम होना चाहिए',
        },
        tabs: {
          account: 'खाता',
          accountContent: 'खाता सेटिंग सामग्री',
          security: 'सुरक्षा',
          securityContent: 'सुरक्षा सेटिंग सामग्री',
          notifications: 'सूचनाएं',
          notificationsContent: 'सूचना वरीयताएं',
          overview: 'अवलोकन',
          overviewContent: 'अवलोकन सामग्री',
          analytics: 'एनालिटिक्स',
          analyticsContent: 'एनालिटिक्स सामग्री',
          reports: 'रिपोर्ट',
          reportsContent: 'रिपोर्ट सामग्री',
          general: 'सामान्य',
          generalContent: 'सामान्य सेटिंग',
          billing: 'बिलिंग',
          billingContent: 'बिलिंग विवरण',
          admin: 'एडमिन',
          adminContent: 'एडमिन पैनल',
        },
        tag: {
          disabledSuccess: 'अक्षम सफलता',
        },
        textarea: {
          messageLabel: 'संदेश',
          messagePlaceholder: 'अपना संदेश दर्ज करें…',
          hintMaxCharacters: 'अधिकतम 500 अक्षर',
          errorRequired: 'यह फ़ील्ड आवश्यक है',
          fixedSizeLabel: 'स्थिर आकार',
          fixedSizePlaceholder: 'आकार नहीं बदला जा सकता',
          readonlyLabel: 'केवल-पढ़ने योग्य',
          readonlyValue: 'केवल-पढ़ने योग्य सामग्री',
        },
        toast: {
          message: variant => `यह एक ${variant} टोस्ट है`,
        },
        tooltip: {
          triggerLabel: '(मुझ पर होवर करें)',
          topLabel: 'ऊपर',
          topTooltip: 'ऊपरी टूलटिप',
          bottomLabel: 'नीचे',
          bottomTooltip: 'निचला टूलटिप',
          leftLabel: 'बाएं',
          leftTooltip: 'बायां टूलटिप',
          rightLabel: 'दाएं',
          rightTooltip: 'दायां टूलटिप',
        },
        transferList: {
          sourceLabel: 'उपलब्ध',
          targetLabel: 'चयनित',
          roleAdmin: 'एडमिन',
          roleEditor: 'संपादक',
          roleViewer: 'दर्शक',
          roleGuest: 'अतिथि',
          roleBilling: 'बिलिंग',
          roleOwner: 'मालिक',
        },
        virtualList: {
          row: 'पंक्ति',
          detail: n => `उत्पन्न रिकॉर्ड #${n}`,
          scrollPosition: (first, total) =>
            `${total.toLocaleString('hi-IN')} में से पंक्ति ${first.toLocaleString('hi-IN')} दिखाई जा रही है`,
        },
        commandPalette: {
          hint: 'इस पेज पर कहीं भी कमांड पैलेट खोलने के लिए Ctrl + K (या Cmd + K) दबाएं।',
          openButton: 'कमांड पैलेट खोलें',
          fileGroup: 'फ़ाइल',
          editGroup: 'संपादन',
          newFile: 'नई फ़ाइल',
          openFile: 'फ़ाइल खोलें',
          save: 'सहेजें',
          find: 'खोजें',
          findKeyword: 'खोज',
          replace: 'बदलें',
          undo: 'पूर्ववत करें',
          toggleTheme: 'थीम टॉगल करें',
          toggleThemeDescription: 'लाइट और डार्क मोड के बीच स्विच करें',
          lockWorkspace: 'वर्कस्पेस लॉक करें',
          lockWorkspaceDescription: 'वर्तमान में अक्षम — सुविधा बीटा में है',
          executedToast: label => `निष्पादित: ${label}`,
        },
        avatarEditorActions: {
          avatarUpdatedToast: 'अवतार अपडेट किया गया',
        },
      },
      playground: {
        controls: 'नियंत्रण',
        reset: 'रीसेट करें',
        code: 'कोड',
        apiReference: 'API संदर्भ',
        inputs: 'इनपुट',
        outputs: 'आउटपुट',
        methods: 'विधियां',
        colName: 'नाम',
        colType: 'प्रकार',
        colDefault: 'डिफ़ॉल्ट',
        colDescription: 'विवरण',
        errorMessagesDescription:
          'एक बाउंड फ़ॉर्म कंट्रोल के लिए प्रति त्रुटि कुंजी सत्यापन संदेश को ओवरराइड करता है; अनसेट कुंजियां स्थानीयकृत डिफ़ॉल्ट का उपयोग करती हैं।',
        ariaLabelDescription:
          'सहायक तकनीक द्वारा घोषित सुलभ नाम जब कंपोनेंट कोई दृश्य लेबल रेंडर नहीं करता।',
        triggerErrorLabel: 'त्रुटि ट्रिगर करें',
        requiredBadge: 'आवश्यक',
        twoWayBadge: 'दो-तरफ़ा',
        rangeHint: { between: 'से', min: 'न्यूनतम', max: 'अधिकतम' },
        knobLabels: {
          timeline: { orientation: 'दिशा', align: 'संरेखण', size: 'आकार' },
          tooltip: {
            eaTooltip: 'टूलटिप सामग्री',
          },
          input: {
            label: 'लेबल',
            placeholder: 'प्लेसहोल्डर',
            size: 'आकार',
            type: 'प्रकार',
            disabled: 'अक्षम',
            readonly: 'केवल-पढ़ने योग्य',
            required: 'आवश्यक',
            autofocus: 'ऑटोफ़ोकस',
            showPasswordToggle: 'पासवर्ड टॉगल दिखाएं',
            clearable: 'साफ़ करने योग्य',
            autocomplete: 'ऑटोकम्प्लीट',
          },
          'number-input': {
            allowNegative: 'ऋणात्मक की अनुमति दें',
            label: 'लेबल',
            placeholder: 'प्लेसहोल्डर',
            size: 'आकार',
            min: 'न्यूनतम',
            max: 'अधिकतम',
            step: 'चरण',
            disabled: 'अक्षम',
            readonly: 'केवल-पढ़ने योग्य',
            required: 'आवश्यक',
          },
          'form-field': {
            label: 'लेबल',
            hint: 'संकेत',
            required: 'आवश्यक',
          },
          alert: {
            variant: 'वेरिएंट',
            dismissible: 'खारिज करने योग्य',
            size: 'आकार',
            icon: 'आइकन (ओवरराइड)',
          },
          avatar: {
            size: 'आकार',
            shape: 'आकृति',
            src: 'छवि स्रोत',
            initials: 'आद्याक्षर',
            alt: 'वैकल्पिक टेक्स्ट',
          },
          badge: {
            variant: 'वेरिएंट',
            size: 'आकार',
            shape: 'आकृति',
          },
          button: {
            variant: 'वेरिएंट',
            size: 'आकार',
            type: 'प्रकार',
            disabled: 'अक्षम',
            loading: 'लोडिंग',
            fullWidth: 'पूरी चौड़ाई',
          },
          card: {
            variant: 'वेरिएंट',
            padding: 'पैडिंग',
            headerAlign: 'हेडर संरेखण',
            fullWidth: 'पूरी चौड़ाई',
            headerDivider: 'हेडर विभाजक',
          },
          checkbox: {
            label: 'लेबल',
            count: 'गणना',
            size: 'आकार',
            disabled: 'अक्षम',
            required: 'आवश्यक',
            indeterminate: 'अनिश्चित',
          },
          'code-input': {
            size: 'आकार',
            length: 'लंबाई',
            label: 'लेबल',
            placeholder: 'प्लेसहोल्डर',
            disabled: 'अक्षम',
            readonly: 'केवल-पढ़ने योग्य',
            required: 'आवश्यक',
          },
          'color-picker': {
            label: 'लेबल',
            placeholder: 'प्लेसहोल्डर',
            size: 'आकार',
            format: 'फ़ॉर्मेट',
            showAlpha: 'अल्फ़ा दिखाएं',
            clearable: 'साफ़ करने योग्य',
            disabled: 'अक्षम',
            readonly: 'केवल-पढ़ने योग्य',
            required: 'आवश्यक',
          },
          divider: {
            orientation: 'अभिविन्यास',
            label: 'लेबल',
          },
          'eagami-wordmark': {
            variant: 'वेरिएंट',
            layout: 'लेआउट',
            size: 'आकार (px)',
          },
          'empty-state': {
            size: 'आकार',
            headingLevel: 'शीर्षक स्तर',
            title: 'शीर्षक',
            description: 'विवरण',
          },
          paginator: {
            align: 'संरेखण',
            showPageSizeSelector: 'पेज आकार चयनकर्ता दिखाएं',
            showRangeLabel: 'रेंज लेबल दिखाएं',
            disabled: 'अक्षम',
            totalItems: 'कुल आइटम',
          },
          'progress-bar': {
            variant: 'वेरिएंट',
            size: 'आकार',
            value: 'मान',
            max: 'अधिकतम',
            buffer: 'बफ़र',
            showPercentage: 'प्रतिशत दिखाएं',
            indeterminate: 'अनिश्चित',
            label: 'लेबल',
          },
          radio: {
            label: 'लेबल',
            disabled: 'अक्षम',
          },
          'range-slider': {
            label: 'लेबल',
            hint: 'संकेत',
            errorMsg: 'त्रुटि संदेश',
            min: 'न्यूनतम',
            max: 'अधिकतम',
            step: 'चरण',
            size: 'आकार',
            showValue: 'मान दिखाएं',
            showMinMaxLabels: 'न्यूनतम/अधिकतम लेबल दिखाएं',
            disabled: 'अक्षम',
            required: 'आवश्यक',
          },
          rating: {
            label: 'लेबल',
            size: 'आकार',
            min: 'न्यूनतम',
            max: 'अधिकतम',
            allowHalf: 'आधे चरण की अनुमति दें',
            readonly: 'केवल-पढ़ने योग्य',
            disabled: 'अक्षम',
            required: 'आवश्यक',
            clearable: 'साफ़ करने योग्य',
            iconClass: 'आइकन',
          },
          skeleton: {
            variant: 'वेरिएंट',
            animated: 'एनिमेटेड',
            width: 'चौड़ाई',
            height: 'ऊंचाई',
          },
          slider: {
            size: 'आकार',
            min: 'न्यूनतम',
            max: 'अधिकतम',
            step: 'चरण',
            showValue: 'मान दिखाएं',
            showMinMaxLabels: 'न्यूनतम/अधिकतम लेबल दिखाएं',
            disabled: 'अक्षम',
            required: 'आवश्यक',
            hasError: 'त्रुटि स्थिति',
            label: 'लेबल',
          },
          spinner: {
            size: 'आकार',
            label: 'लेबल',
          },
          switch: {
            label: 'लेबल',
            size: 'आकार',
            disabled: 'अक्षम',
            required: 'आवश्यक',
          },
          tag: {
            variant: 'वेरिएंट',
            size: 'आकार',
            removable: 'हटाने योग्य',
            disabled: 'अक्षम',
            removeLabel: 'हटाने का लेबल',
          },
          textarea: {
            label: 'लेबल',
            placeholder: 'प्लेसहोल्डर',
            size: 'आकार',
            resize: 'आकार बदलें',
            maxlength: 'अधिकतम लंबाई (अक्षर)',
            minHeight: 'न्यूनतम ऊंचाई (px)',
            maxHeight: 'अधिकतम ऊंचाई (px)',
            disabled: 'अक्षम',
            readonly: 'केवल-पढ़ने योग्य',
            required: 'आवश्यक',
          },
        },
        knobNotes: { accordion: { headingLevel: '(केवल सिमैंटिक)' } },

        descriptions: {
          timeline: {
            items: 'प्रदर्शित करने के लिए घटनाएँ, क्रम में।',
            orientation: 'वह दिशा जिसमें टाइमलाइन चलती है।',
            align:
              'रेखा के सापेक्ष सामग्री का स्थान; alternate केवल ऊर्ध्वाधर टाइमलाइन पर लागू होता है।',
            size: 'टाइमलाइन का दृश्य आकार।',
          },
          toast: {
            position: 'व्यूपोर्ट का कोना या किनारा जिससे टोस्ट स्टैक पिन किया गया है।',
            clearable: 'प्रत्येक टोस्ट पर एक खारिज बटन दिखाएं।',
          },
          input: {
            label: 'फ़ील्ड के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            type: 'नेटिव इनपुट प्रकार (password एक अंतर्निहित दिखाएं/छिपाएं टॉगल जोड़ता है)।',
            placeholder: 'फ़ील्ड खाली होने पर दिखाया गया प्लेसहोल्डर।',
            size: 'फ़ील्ड का दृश्य आकार।',
            hint: 'फ़ील्ड के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            errorMsg:
              'फ़ील्ड के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            disabled: 'फ़ील्ड को अक्षम करता है।',
            readonly: 'फ़ील्ड को केवल-पढ़ने योग्य रेंडर करता है।',
            required: 'फ़ील्ड को आवश्यक के रूप में चिह्नित करता है।',
            autocomplete: 'नेटिव autocomplete विशेषता के लिए मान।',
            list: 'नेटिव सुझावों को जोड़ने के लिए किसी <datalist> की id।',
            autofocus: 'पहली बार रेंडर होने के बाद फ़ील्ड को एक बार फ़ोकस करता है।',
            showPasswordToggle: 'पासवर्ड इनपुट के लिए प्रकट टॉगल दिखाता है।',
            clearable: 'फ़ील्ड में मान होने पर एक साफ़ करें बटन दिखाता है।',
            id: 'नेटिव इनपुट और लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            value:
              'वर्तमान फ़ील्ड मान, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            blurred: 'जब फ़ील्ड फ़ोकस खोता है तो ट्रिगर होता है।',
            focused: 'जब फ़ील्ड फ़ोकस प्राप्त करता है तो ट्रिगर होता है।',
            clear: 'वर्तमान मान को साफ़ करता है और फ़ील्ड पर फ़ोकस बहाल करता है।',
            focus: 'अंतर्निहित नेटिव फ़ील्ड पर कीबोर्ड फ़ोकस ले जाता है।',
            togglePasswordVisibility:
              'type="password" इनपुट के लिए पासवर्ड प्रकट स्थिति को टॉगल करता है।',
            icon: 'टेक्स्ट से पहले रेंडर किया गया अग्रणी आइकन कंपोनेंट।',
            max: 'type="number" के लिए अधिकतम मान; ब्लर पर मान इस तक सीमित किया जाता है।',
            maxLength:
              'अक्षरों की अधिकतम संख्या; type="number" के लिए लागू, जहां नेटिव maxlength को अनदेखा किया जाता है।',
            min: 'type="number" के लिए न्यूनतम मान; ब्लर पर मान इस तक सीमित किया जाता है।',
            minLength:
              'अक्षरों की न्यूनतम संख्या, नेटिव minlength विशेषता के रूप में पास की गई।',
            step: 'type="number" इनपुट के लिए चरण वृद्धि।',
            clampToBounds:
              'संपादन समाप्त होने पर एक संख्या मान को कॉन्फ़िगर की गई न्यूनतम/अधिकतम रेंज में सीमित करता है।',
          },
          'number-input': {
            allowNegative:
              'क्या ऋणात्मक मान की अनुमति है; false होने पर मान की न्यूनतम सीमा 0 है।',
            label: 'फ़ील्ड के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            placeholder: 'फ़ील्ड खाली होने पर दिखाया गया प्लेसहोल्डर।',
            size: 'फ़ील्ड का दृश्य आकार।',
            hint: 'फ़ील्ड के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            errorMsg:
              'फ़ील्ड के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            disabled: 'फ़ील्ड को अक्षम करता है।',
            readonly: 'फ़ील्ड को केवल-पढ़ने योग्य रेंडर करता है।',
            required: 'फ़ील्ड को आवश्यक के रूप में चिह्नित करता है।',
            min: 'न्यूनतम मान; टाइप किए गए मान ब्लर पर इस तक सीमित किए जाते हैं और स्टेपर इसका सम्मान करते हैं।',
            max: 'अधिकतम मान; टाइप किए गए मान ब्लर पर इस तक सीमित किए जाते हैं और स्टेपर इसका सम्मान करते हैं।',
            step: 'प्रत्येक चरण (एरो कुंजी या स्टेपर) द्वारा जोड़ी या घटाई गई मात्रा।',
            id: 'नेटिव इनपुट और लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            value:
              'वर्तमान फ़ील्ड मान; खाली होने पर null, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            changed: 'जब भी मान बदलता है तो नए मान के साथ ट्रिगर होता है।',
            focused: 'जब फ़ील्ड फ़ोकस प्राप्त करता है तो ट्रिगर होता है।',
            blurred: 'जब फ़ील्ड फ़ोकस खोता है तो ट्रिगर होता है।',
            focus: 'अंतर्निहित नेटिव फ़ील्ड पर कीबोर्ड फ़ोकस ले जाता है।',
          },
          accordion: {
            multi: 'कई आइटम को एक साथ विस्तारित रहने की अनुमति देता है।',
            headingLevel:
              'प्रत्येक आइटम हेडर पर लागू शीर्षक स्तर (1-6), ताकि अकॉर्डियन पृष्ठ की रूपरेखा में फ़िट हो।',
          },
          alert: {
            dismissible:
              'एक बंद बटन दिखाता है जो उपयोगकर्ता को अलर्ट खारिज करने देता है।',
            variant: 'सिमेंटिक रंग योजना जो अलर्ट के आइकन और पैलेट को चलाती है।',
            visible:
              'क्या अलर्ट दिखाया गया है, [(visible)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            dismissed:
              'जब उपयोगकर्ता बंद बटन के माध्यम से अलर्ट खारिज करता है तो ट्रिगर होता है।',
            dismiss: 'अलर्ट को छिपाता है और dismissed इवेंट उत्सर्जित करता है।',
            size: 'टेक्स्ट, आइकन और गैप को एक साथ स्केल करता है।',
            icon: 'किसी भी आइकन कंपोनेंट के साथ वेरिएंट के डिफ़ॉल्ट स्थिति आइकन को ओवरराइड करता है।',
          },
          avatar: {
            src: 'प्रदर्शित करने के लिए छवि URL; आद्याक्षरों पर, फिर एक सामान्य उपयोगकर्ता आइकन पर फ़ॉलबैक करता है।',
            alt: 'अवतार छवि के लिए वैकल्पिक टेक्स्ट।',
            initials: 'जब कोई छवि स्रोत प्रदान नहीं किया गया हो तो दिखाए गए आद्याक्षर।',
            size: 'अवतार के लिए व्यास प्रीसेट।',
            shape: 'अवतार की रूपरेखा: गोल या गोल-वर्ग।',
          },
          badge: {
            variant: 'बैज की सिमेंटिक रंग योजना।',
            size: 'बैज का दृश्य आकार।',
            shape:
              'बैज का बाहरी आकार (pill सामग्री से लिपटता है, pin एकल अक्षरों के लिए एक वृत्त के रूप में रेंडर होता है)।',
          },
          button: {
            variant: 'बटन की दृश्य शैली, उसके रंग और जोर को चलाती है।',
            size: 'बटन का दृश्य आकार।',
            type: 'अंतर्निहित button एलिमेंट पर लागू नेटिव type विशेषता।',
            disabled: 'बटन को अक्षम करता है और क्लिक इवेंट को दबाता है।',
            loading: 'रेंडर की गई चौड़ाई को बनाए रखते हुए लेबल को एक स्पिनर से बदलता है।',
            fullWidth: 'बटन को उसके कंटेनर की चौड़ाई भरने के लिए खींचता है।',
            ariaLabel:
              'बटन के लिए सुलभ लेबल जब उसकी सामग्री पर्याप्त वर्णनात्मक नहीं होती।',
            ariaCurrent:
              'नेटिव aria-current विशेषता के लिए मान, बटन को एक सेट में वर्तमान आइटम के रूप में चिह्नित करता है।',
            clicked:
              'जब बटन सक्रिय होता है तो ट्रिगर होता है, अक्षम या लोडिंग के दौरान दबा रहता है।',
            icon: 'लेबल के बाईं ओर रेंडर किया गया वैकल्पिक आइकन कंपोनेंट।',
          },
          card: {
            variant: 'कार्ड सरफ़ेस की दृश्य शैली।',
            padding: 'कार्ड के सामग्री क्षेत्र पर लागू पैडिंग प्रीसेट।',
            headerAlign: 'हेडर सामग्री का क्षैतिज संरेखण।',
            fullWidth: 'कार्ड को उपलब्ध चौड़ाई भरने के लिए खींचता है।',
            headerDivider: 'हेडर और बॉडी के बीच एक विभाजक दिखाता है।',
          },
          checkbox: {
            ariaLabel: 'चेकबॉक्स के लिए सुलभ नाम जब कोई दृश्य लेबल रेंडर नहीं होता।',
            checked:
              'वर्तमान चेक स्थिति, [(checked)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            count: 'लेबल के तुरंत बाद धुंधला दिखाया गया पूरक मान।',
            disabled: 'चेकबॉक्स को अक्षम करता है।',
            errorMsg:
              'फ़ील्ड के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            hint: 'फ़ील्ड के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'नेटिव इनपुट और लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            indeterminate: 'चेकबॉक्स को दृश्य रूप से अनिश्चित स्थिति में रेंडर करता है।',
            label: 'चेकबॉक्स के बगल में रेंडर किया गया टेक्स्ट लेबल।',
            required: 'चेकबॉक्स को आवश्यक के रूप में चिह्नित करता है।',
            size: 'चेकबॉक्स का दृश्य आकार।',
            changed:
              'जब भी उपयोगकर्ता चेकबॉक्स को टॉगल करता है तो नई चेक स्थिति के साथ ट्रिगर होता है।',
          },
          'code-input': {
            disabled: 'प्रत्येक अंक सेल को अक्षम करता है।',
            errorMsg:
              'फ़ील्ड के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            hint: 'फ़ील्ड के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'अंक सेल और लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'फ़ील्ड के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            length: 'अंक सेल की संख्या जिनसे कोड बना है।',
            placeholder: 'प्रति सेल एक अक्षर फैलाया गया प्लेसहोल्डर टेक्स्ट।',
            readonly: 'फ़ील्ड को केवल-पढ़ने योग्य रेंडर करता है।',
            required: 'फ़ील्ड को आवश्यक के रूप में चिह्नित करता है।',
            size: 'प्रत्येक अंक सेल का दृश्य आकार।',
            value: 'वर्तमान कोड मान, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            completed: 'प्रत्येक अंक दर्ज होने के बाद पूर्ण कोड के साथ ट्रिगर होता है।',
            focus:
              'अगले खाली अंक पर (या पूर्ण होने पर अंतिम पर) कीबोर्ड फ़ोकस ले जाता है।',
            allowAllChars:
              'किसी भी गैर-व्हाइटस्पेस अक्षर की अनुमति दें; बंद होने पर केवल अंक स्वीकार किए जाते हैं।',
          },
          'color-picker': {
            disabled: 'फ़ील्ड को अक्षम करता है।',
            errorMsg:
              'फ़ील्ड के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            format: 'उत्सर्जित रंग मान का आउटपुट फ़ॉर्मेट (hex, rgb या hsl)।',
            hint: 'फ़ील्ड के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'ट्रिगर और लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'फ़ील्ड के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            placeholder:
              'जब कोई रंग चयनित नहीं होता तो ट्रिगर पर दिखाया गया प्लेसहोल्डर।',
            presets:
              'पॉपओवर के नीचे दिखाए गए प्रीसेट स्वैच; उन्हें छिपाने के लिए एक खाली ऐरे पास करें।',
            readonly:
              'फ़ील्ड को केवल-पढ़ने योग्य रेंडर करता है, पॉपओवर को खुलने से रोकता है।',
            required: 'फ़ील्ड को आवश्यक के रूप में चिह्नित करता है।',
            showAlpha:
              'अल्फ़ा स्लाइडर दिखाता है और उत्सर्जित मान में अल्फ़ा शामिल करता है।',
            clearable: 'मान सेट होने पर साफ़ करने वाला बटन दिखाना है या नहीं।',
            size: 'पिकर ट्रिगर का दृश्य आकार।',
            value:
              'वर्तमान रंग स्ट्रिंग, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            changed: 'जब भी चयन बदलता है तो नई रंग स्ट्रिंग के साथ ट्रिगर होता है।',
            cycleInputMode:
              'पॉपओवर इनपुट पंक्ति को hex स्ट्रिंग और RGB चैनलों के बीच साइकल करता है।',
            hasEyeDropper: 'लौटाता है कि क्या ब्राउज़र EyeDropper API का समर्थन करता है।',
            onHexInput:
              'जैसे ही उपयोगकर्ता संपादित करता है, टाइप किए गए hex टेक्स्ट को वर्तमान रंग पर लागू करता है।',
            onPopoverCloseRequested:
              'जब उपयोगकर्ता पिकर के बाहर क्लिक करता है तो पॉपओवर बंद करता है।',
          },
          divider: {
            label: 'विभाजक रूल के भीतर रेंडर किया गया वैकल्पिक केंद्रित लेबल।',
            orientation: 'अभिविन्यास जिसमें विभाजक रूल चलता है।',
            thick: 'एक भारी रूल रेंडर करता है।',
          },
          'eagami-wordmark': {
            variant:
              'सामग्री वेरिएंट: default नंगा वर्डमार्क है, byline handcrafted-by लाइन जोड़ता है, tagline टैगलाइन जोड़ता है।',
            layout:
              'वर्डमार्क को कई पंक्तियों में स्टैक करता है या एक अकेली पंक्ति पर इनलाइन करता है।',
            size: 'पिक्सेल मान जिससे पूरा वर्डमार्क स्केल होता है।',
          },
          'empty-state': {
            title: 'विवरण के ऊपर दिखाया गया शीर्षक टेक्स्ट।',
            description: 'शीर्षक के नीचे दिखाया गया सहायक टेक्स्ट।',
            size: 'खाली-स्थिति ब्लॉक का दृश्य आकार।',
            headingLevel:
              'शीर्षक के लिए उपयोग किया गया शीर्षक स्तर ताकि यह आसपास की दस्तावेज़ रूपरेखा में फिट हो।',
            bordered: 'ब्लॉक के चारों ओर एक धराशायी फ़्रेम रेंडर करता है।',
            icon: 'शीर्षक के ऊपर मीडिया क्षेत्र में रेंडर किया गया वैकल्पिक आइकन कंपोनेंट।',
          },
          paginator: {
            groupThousands:
              'रेंज और पेज संख्याओं में हजारों को अल्पविरामों से समूहित करता है।',
            size: 'पेजिनेटर और उसके नियंत्रणों का दृश्य आकार।',
            align: 'पेजिनेटर नियंत्रणों का उनके कंटेनर के भीतर क्षैतिज संरेखण।',
            disabled: 'सभी पेजिनेटर नियंत्रणों को अक्षम करता है।',
            page: 'वर्तमान पेज संख्या, [(page)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            pageSize:
              'प्रति पेज दिखाए गए आइटम की संख्या, [(pageSize)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            pageSizeOptions: 'पेज-आकार चयनकर्ता में पेश किए गए चयन योग्य पेज आकार।',
            showPageSizeSelector: 'पेज-आकार चयनकर्ता नियंत्रण दिखाता है।',
            showRangeLabel: 'दृश्य आइटम रेंज का वर्णन करने वाला लेबल दिखाता है।',
            totalItems: 'पेज गणना की गणना के लिए उपयोग किए गए आइटम की कुल संख्या।',
            changed:
              'जब उपयोगकर्ता वर्तमान पेज या पेज आकार में से किसी एक को बदलता है तो ट्रिगर होता है।',
            goToPage: 'दिए गए पेज पर नेविगेट करता है, वैध रेंज में सीमित।',
            nextPage: 'अगले पेज पर नेविगेट करता है यदि कोई मौजूद हो।',
            prevPage: 'पिछले पेज पर नेविगेट करता है यदि कोई मौजूद हो।',
          },
          'progress-bar': {
            variant: 'बार का रंग वेरिएंट।',
            size: 'बार की दृश्य मोटाई।',
            value: 'वर्तमान प्रगति मान।',
            max: 'मान जिस पर बार भरा होता है।',
            buffer: 'मान से आगे बफ़र की गई स्थिति, द्वितीयक रंग में दिखाई जाती है।',
            showPercentage: 'बार के साथ वर्तमान प्रतिशत दिखाता है।',
            indeterminate:
              'अज्ञात अवधि की प्रगति के लिए एक लूपिंग एनिमेशन रेंडर करता है।',
            label: 'बार के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
          },
          radio: {
            disabled: 'इस विकल्प को अक्षम करता है।',
            id: 'नेटिव रेडियो इनपुट और लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'रेडियो के बगल में रेंडर किया गया टेक्स्ट लेबल।',
            value: 'चयनित होने पर यह विकल्प अपने मूल समूह में जो मान योगदान देता है।',
          },
          'range-slider': {
            ariaLabelHigh:
              'उच्च (अंत) थंब के लिए सुलभ लेबल, छोड़े जाने पर फ़ील्ड लेबल पर फ़ॉलबैक करता है।',
            ariaLabelLow:
              'निम्न (आरंभ) थंब के लिए सुलभ लेबल, छोड़े जाने पर फ़ील्ड लेबल पर फ़ॉलबैक करता है।',
            disabled: 'स्लाइडर को अक्षम करता है।',
            errorMsg:
              'स्लाइडर के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            formatValue:
              'प्रत्येक मान पर उसके प्रदर्शित होने से पहले लागू किया गया फ़ॉर्मेटर।',
            hint: 'स्लाइडर के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'स्लाइडर पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'स्लाइडर के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            max: 'सबसे ऊंचा मान जिस तक कोई भी थंब पहुंच सकता है।',
            min: 'सबसे नीचा मान जिस तक कोई भी थंब पहुंच सकता है।',
            required: 'फ़ील्ड को आवश्यक के रूप में चिह्नित करता है।',
            showMinMaxLabels: 'ट्रैक के सिरों पर न्यूनतम और अधिकतम सीमाएं दिखाता है।',
            showValue: 'स्लाइडर के साथ वर्तमान निम्न और उच्च मान दिखाता है।',
            size: 'ट्रैक और थंब का दृश्य आकार।',
            step: 'वृद्धि जिस पर प्रत्येक थंब हिलने पर स्नैप करता है।',
            value:
              'वर्तमान [low, high] रेंज ट्यूपल, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            changed:
              'जब भी कोई थंब हिलता है तो नए [low, high] ट्यूपल के साथ ट्रिगर होता है।',
            commitThumb:
              'एक थंब को निकटतम चरण पर स्नैप करता है, उसे सीमाओं तक सीमित करता है और विपरीत थंब द्वारा बाधित करता है।',
            groupThousands:
              'प्रदर्शित मानों को हजारों विभाजकों से समूहित करता है, कस्टम formatValue प्रदान होने पर अनदेखा किया जाता है।',
            formatDisplay:
              'प्रदर्शन के लिए एक मान को फ़ॉर्मेट करता है, जब तक कोई कस्टम formatValue फ़ंक्शन सेट न हो, हजारों समूहन लागू करता है।',
          },
          rating: {
            allowHalf:
              'आधे-तारे की ग्रेन्युलैरिटी की अनुमति देता है, जिससे मान 0.5 की वृद्धि में चल सकता है।',
            clearable: 'वर्तमान मान पर क्लिक करने से रेटिंग 0 पर वापस साफ़ हो जाती है।',
            disabled: 'रेटिंग को अक्षम करता है।',
            errorMsg:
              'रेटिंग के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और इसे अमान्य चिह्नित करता है।',
            halfIconClass:
              'allowHalf के true होने पर आधी स्थितियों के लिए रेंडर किया गया स्टैंडअलोन कंपोनेंट क्लास।',
            hint: 'रेटिंग के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            iconClass:
              'खाली और पूर्ण स्थितियों के लिए रेंडर किया गया स्टैंडअलोन कंपोनेंट क्लास।',
            id: 'रेटिंग और उसके लेबल पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'रेटिंग के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            max: 'सबसे ऊंचा रेटिंग मान और रेंडर किए गए तारों की संख्या।',
            min: 'सबसे नीचा रेटिंग मान जिसे उपयोगकर्ता चुन सकता है।',
            readonly:
              'रेटिंग को केवल-प्रदर्शन के रूप में रेंडर करता है, क्लिक और कीबोर्ड इनपुट को अनदेखा करता है।',
            required: 'रेटिंग को आवश्यक के रूप में चिह्नित करता है।',
            size: 'रेटिंग का दृश्य आकार।',
            value:
              'वर्तमान रेटिंग मान, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            hoverChanged:
              'होवर करते समय पूर्वावलोकित मान के साथ, और जब कर्सर हटता है तो null के साथ ट्रिगर होता है।',
            iconForState:
              'किसी दी गई तारे की स्थिति के लिए इंस्टैंशिएट करने के लिए कंपोनेंट क्लास लौटाता है।',
            stateFor:
              'किसी तारे की स्थिति के लिए रेंडर स्थिति (खाली, आधा या पूर्ण) हल करता है।',
          },
          skeleton: {
            animated:
              'स्पंदनशील शिमर एनिमेशन चलाता है, जब उपयोगकर्ता कम गति पसंद करता है तो स्वचालित रूप से दबा दिया जाता है।',
            height:
              'प्लेसहोल्डर पर लागू स्पष्ट CSS ऊंचाई, छोड़े जाने पर आकृति के आंतरिक आकार पर डिफ़ॉल्ट होती है।',
            variant: 'प्लेसहोल्डर का आकृति प्रीसेट: टेक्स्ट लाइन, वृत्त या आयत।',
            width:
              'प्लेसहोल्डर पर लागू स्पष्ट CSS चौड़ाई, छोड़े जाने पर आकृति के आंतरिक आकार पर डिफ़ॉल्ट होती है।',
          },
          slider: {
            ariaLabel: 'जब कोई दृश्य लेबल रेंडर नहीं होता तो लागू सुलभ लेबल।',
            disabled: 'स्लाइडर को अक्षम करता है।',
            errorMsg:
              'स्लाइडर के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            formatValue: 'फ़ॉर्मेटर जो संख्यात्मक मान को प्रदर्शित टेक्स्ट में बदलता है।',
            hasError:
              'त्रुटि संदेश बाइंड किए बिना त्रुटि-स्थिति स्टाइलिंग को बाध्य करता है।',
            hint: 'स्लाइडर के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'स्लाइडर और उसके लेबल पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'स्लाइडर के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            max: 'सबसे ऊंचा मान जिस तक स्लाइडर पहुंच सकता है।',
            min: 'सबसे नीचा मान जिस तक स्लाइडर पहुंच सकता है।',
            required: 'स्लाइडर को आवश्यक के रूप में चिह्नित करता है।',
            showMinMaxLabels: 'ट्रैक के नीचे न्यूनतम और अधिकतम सीमाएं दिखाता है।',
            showValue: 'लेबल के साथ वर्तमान मान दिखाता है।',
            size: 'स्लाइडर ट्रैक और थंब का दृश्य आकार।',
            step: 'वृद्धि जिस पर स्लाइडर हिलने पर मान स्नैप करता है।',
            value:
              'वर्तमान स्लाइडर मान, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            changed:
              'जब भी स्लाइडर हिलता है तो नए स्नैप किए गए मान के साथ ट्रिगर होता है।',
            groupThousands:
              'प्रदर्शित मानों को हजारों विभाजकों से समूहित करता है, कस्टम formatValue प्रदान होने पर अनदेखा किया जाता है।',
            formatDisplay:
              'प्रदर्शन के लिए एक मान को फ़ॉर्मेट करता है, जब तक कोई कस्टम formatValue फ़ंक्शन सेट न हो, हजारों समूहन लागू करता है।',
          },
          spinner: {
            label:
              'सहायक तकनीक को घोषित सुलभ लेबल, अनसेट होने पर सक्रिय लोकेल के अनुवाद पर फ़ॉलबैक करता है।',
            size: 'स्पिनर का दृश्य आकार।',
          },
          switch: {
            ariaLabel: 'स्विच के लिए सुलभ लेबल जब कोई दृश्य लेबल रेंडर नहीं होता।',
            checked:
              'वर्तमान चालू/बंद स्थिति, [(checked)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            disabled: 'स्विच को अक्षम करता है और टॉगलिंग को अवरुद्ध करता है।',
            errorMsg:
              'स्विच के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            hint: 'स्विच के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'अंतर्निहित चेकबॉक्स और लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'स्विच के बगल में रेंडर किया गया टेक्स्ट लेबल।',
            required: 'स्विच को आवश्यक के रूप में चिह्नित करता है।',
            size: 'स्विच का दृश्य आकार।',
            changed:
              'जब भी उपयोगकर्ता स्विच को टॉगल करता है तो नई चेक स्थिति के साथ ट्रिगर होता है।',
          },
          tag: {
            variant: 'टैग की सिमेंटिक रंग योजना।',
            size: 'टैग का दृश्य आकार।',
            removable:
              'एक हटाएं बटन रेंडर करता है जो सक्रिय होने पर removed उत्सर्जित करता है।',
            disabled: 'टैग और उसके हटाएं बटन को अक्षम करता है।',
            removeLabel: 'हटाएं बटन के लिए सुलभ लेबल, सक्रिय लोकेल पर फ़ॉलबैक करता है।',
            removed:
              'जब उपयोगकर्ता किसी हटाने योग्य टैग पर हटाएं बटन को सक्रिय करता है तो ट्रिगर होता है।',
          },
          textarea: {
            disabled: 'फ़ील्ड को अक्षम करता है।',
            errorMsg:
              'फ़ील्ड के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            hint: 'फ़ील्ड के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'नेटिव textarea और लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'फ़ील्ड के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            maxHeight:
              'फ़ील्ड की ऊंचाई के लिए पिक्सेल सीमा; उससे आगे textarea बढ़ने के बजाय लंबवत स्क्रॉल करता है।',
            minHeight: 'px में न्यूनतम ऊंचाई; कभी भी डिफ़ॉल्ट ऊंचाई से कम नहीं।',
            maxlength: 'अक्षरों की अधिकतम संख्या जो फ़ील्ड स्वीकार करता है।',
            placeholder: 'फ़ील्ड खाली होने पर दिखाया गया प्लेसहोल्डर।',
            readonly: 'फ़ील्ड को केवल-पढ़ने योग्य रेंडर करता है।',
            required: 'फ़ील्ड को आवश्यक के रूप में चिह्नित करता है।',
            resize: 'वह अक्ष जिसके साथ उपयोगकर्ता फ़ील्ड का आकार बदल सकता है।',
            size: 'फ़ील्ड का दृश्य आकार।',
            value:
              'वर्तमान फ़ील्ड मान, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            blurred: 'जब फ़ील्ड फ़ोकस खोता है तो ट्रिगर होता है।',
            focused: 'जब फ़ील्ड फ़ोकस प्राप्त करता है तो ट्रिगर होता है।',
            focus: 'अंतर्निहित नेटिव textarea पर कीबोर्ड फ़ोकस ले जाता है।',
          },
          'avatar-editor': {
            accept: 'फ़ाइल पिकर के लिए स्वीकृत MIME प्रकार, नेटिव इनपुट को अग्रेषित।',
            canvasSize: 'वर्गाकार क्रॉप कैनवास की पिक्सेल चौड़ाई और ऊंचाई।',
            cropState:
              'स्रोत छवि लोड होने पर बहाल करने के लिए प्रारंभिक पैन/ज़ूम स्थिति।',
            currentSrc: 'इनिशियलाइज़ेशन पर एडिटर में लोड करने के लिए छवि का URL।',
            exportQuality:
              'क्रॉप की गई छवि निर्यात करते समय उपयोग की गई JPEG/WebP गुणवत्ता, 0 और 1 के बीच।',
            exportType:
              'निर्यात की गई छवि blob का MIME प्रकार (उदाहरण के लिए image/png या image/jpeg)।',
            loading: 'जब कोई बाहरी संसाधन लोड हो रहा हो तो एक स्केलेटन ओवरले दिखाता है।',
            maxFileSize:
              'बाइट्स में अधिकतम अनुमत फ़ाइल आकार; इस सीमा से ऊपर की फ़ाइलें errored उत्सर्जित करती हैं।',
            maxZoom: 'अधिकतम ज़ूम गुणक जिस तक उपयोगकर्ता पहुंच सकता है।',
            minZoom: 'न्यूनतम ज़ूम गुणक जिस तक उपयोगकर्ता पहुंच सकता है।',
            shape: 'कैनवास और निर्यात की गई छवि पर लागू क्रॉप मास्क आकृति।',
            cropped:
              'जब उपयोगकर्ता एक क्रॉप निर्यात करता है तो ट्रिगर होता है, एक Blob और एक data URL दोनों प्रदान करता है।',
            cropStateChanged:
              'जब भी उपयोगकर्ता छवि को पैन या ज़ूम करता है तो ट्रिगर होता है, संपादन स्थिति को संरक्षित करने के लिए उपयोगी।',
            errored:
              'जब फ़ाइल सत्यापन विफल होता है तो एक मानव-पठनीय संदेश के साथ ट्रिगर होता है।',
            fileSelected:
              'जब डिस्क से कोई फ़ाइल चुनी जाती है या एडिटर पर छोड़ी जाती है तो ट्रिगर होता है।',
            removed:
              'जब हटाएं नियंत्रण के माध्यम से वर्तमान छवि साफ़ की जाती है तो ट्रिगर होता है।',
            captureOriginal:
              'revertImage के लिए वर्तमान छवि और क्रॉप स्थिति को आधार रेखा के रूप में चिह्नित करता है।',
            exportCrop:
              'वर्तमान क्रॉप को एक ऑफ़स्क्रीन कैनवास पर रेंडर करता है, cropped उत्सर्जित करता है और Blob के साथ हल होता है।',
            openFilePicker: 'नेटिव फ़ाइल पिकर डायलॉग खोलता है।',
            removeImage:
              'लोड की गई छवि को साफ़ करता है और पैन तथा ज़ूम को डिफ़ॉल्ट पर रीसेट करता है।',
            revertImage:
              'सबसे हाल के captureOriginal कॉल द्वारा कैप्चर की गई छवि और क्रॉप स्थिति को बहाल करता है।',
            setZoom:
              'ज़ूम स्तर सेट करता है, कॉन्फ़िगर की गई minZoom और maxZoom रेंज तक सीमित।',
            updateImageDarkness:
              'यह निर्धारित करने के लिए दृश्य क्रॉप क्षेत्र का नमूना लेता है कि क्या छवि मध्य-ग्रे से अधिक गहरी है।',
          },
          'menu-trigger': {
            menu: 'वह ea-menu इंस्टेंस जिसे यह ट्रिगर नियंत्रित करता है।',
          },
          tooltip: {
            maxWidth:
              'पिक्सेल में अधिकतम चौड़ाई; टेक्स्ट इस चौड़ाई पर रैप होता है (50px फ़्लोर)।',
            eaTooltip: 'होवर और कीबोर्ड फ़ोकस पर दिखाए गए टूलटिप की टेक्स्ट सामग्री।',
            tooltipPosition: 'अपने होस्ट एलिमेंट के सापेक्ष टूलटिप का स्थान।',
          },
          'time-picker': {
            disabled: 'पिकर को अक्षम करता है।',
            errorMsg:
              'फ़ील्ड के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            format: 'ट्रिगर लेबल का प्रदर्शन फ़ॉर्मेट; वायर मान हमेशा 24-घंटे होता है।',
            hint: 'फ़ील्ड के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'ट्रिगर और लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            includeSeconds: 'घंटों और मिनटों के साथ एक सेकंड कॉलम दिखाता है।',
            label: 'फ़ील्ड के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            minuteStep: 'वृद्धि जिस पर मिनट कॉलम चरणबद्ध या खींचे जाने पर स्नैप करता है।',
            placeholder:
              'जब कोई समय चयनित नहीं होता तो ट्रिगर पर दिखाया गया प्लेसहोल्डर।',
            readonly:
              'फ़ील्ड को केवल-पढ़ने योग्य रेंडर करता है, पॉपओवर को खुलने से रोकता है।',
            required: 'फ़ील्ड को आवश्यक के रूप में चिह्नित करता है।',
            secondStep:
              'वृद्धि जिस पर सेकंड कॉलम चरणबद्ध या खींचे जाने पर स्नैप करता है।',
            size: 'पिकर ट्रिगर का दृश्य आकार।',
            value:
              'HH:MM या HH:MM:SS (24-घंटे) में वर्तमान समय स्ट्रिंग, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य, या अनसेट होने पर null।',
            changed:
              'जब भी उपयोगकर्ता चयनित समय बदलता है तो नई समय स्ट्रिंग के साथ ट्रिगर होता है।',
            advanceFocus:
              'एक अंक प्रविष्टि पूर्ण होने के बाद अगले इकाई कॉलम पर फ़ोकस ले जाता है।',
            cannotExtend:
              'true लौटाता है जब किसी दी गई इकाई के लिए वर्तमान बफ़र को कोई अतिरिक्त अंक वैध रूप से विस्तारित नहीं कर सकता।',
            commitDigits:
              'बफ़र की गई अंक स्ट्रिंग को पार्स करता है, इसे इकाई की वैध रेंज तक सीमित करता है और इसे मान में लिखता है।',
            flushBuffer:
              'किसी भी लंबित टाइप-किए-गए अंक बफ़र को कमिट करता है और इसे साफ़ करता है।',
            focusHoursWhenReady:
              'पॉपओवर सरफ़ेस के DOM में रेंडर होने के बाद घंटे इनपुट को फ़ोकस करता है।',
            hoursFromTyped:
              'वर्तमान AM/PM अवधि का हिसाब रखते हुए एक टाइप किए गए घंटे मान को उसके 24-घंटे समकक्ष में बदलता है।',
            onPopoverCloseRequested:
              'जब उपयोगकर्ता पिकर के बाहर क्लिक करता है तो पॉपओवर बंद करता है।',
            onSpinnerBlur:
              'जब कोई स्पिनर कॉलम फ़ोकस खोता है तो किसी भी लंबित अंक बफ़र को कमिट करता है।',
            onSpinnerFocus:
              'फ़ोकस प्राप्त करने पर एक स्पिनर कॉलम में सारा टेक्स्ट चुनता है ताकि पहला कीस्ट्रोक उसे बदल दे।',
            onSpinnerInput:
              'एक स्पिनर कॉलम में अंक इनपुट को संभालता है, बफ़र को अपडेट करता है और कॉलम भरने पर स्वतः फ़ोकस आगे बढ़ाता है।',
            startHold:
              'एक शेवरॉन बटन पर एक लंबे-दबाव दोहराव को शुरू करता है, दी गई इकाई को चरणबद्ध करता है और देरी के बाद त्वरित होता है।',
            step: 'दिए गए इकाई कॉलम को एक कॉन्फ़िगर की गई वृद्धि से ऊपर या नीचे चरणबद्ध करता है।',
            stopHold: 'किसी भी प्रगति में लंबे-दबाव दोहराव टाइमर को रद्द करता है।',
            togglePeriod:
              '12-घंटे ऑफ़सेट को टॉगल करके 12-घंटे मोड में AM/PM अवधि बदलता है।',
          },
          autocomplete: {
            disabled: 'फ़ील्ड को अक्षम करता है।',
            emptyMessage:
              'जब कोई विकल्प वर्तमान इनपुट से मेल नहीं खाता तो सूची में दिखाया गया संदेश, छोड़े जाने पर सक्रिय लोकेल के अनुवाद पर फ़ॉलबैक करता है।',
            errorMsg:
              'फ़ील्ड के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            hint: 'फ़ील्ड के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'नेटिव इनपुट और लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'फ़ील्ड के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            maxResults: 'सुझाव सूची में एक बार में दिखाए गए विकल्पों की अधिकतम संख्या।',
            minLength: 'सुझाव सूची दिखने से पहले आवश्यक अक्षरों की न्यूनतम संख्या।',
            options: 'फ़िल्टरिंग और चयन के लिए उपलब्ध विकल्पों की पूरी सूची।',
            placeholder: 'फ़ील्ड खाली होने पर दिखाया गया प्लेसहोल्डर।',
            readonly: 'फ़ील्ड को केवल-पढ़ने योग्य रेंडर करता है।',
            required: 'फ़ील्ड को आवश्यक के रूप में चिह्नित करता है।',
            size: 'फ़ील्ड का दृश्य आकार।',
            value:
              'वर्तमान फ़ील्ड मान, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            blurred: 'जब इनपुट फ़ोकस खोता है तो ट्रिगर होता है।',
            changed:
              'जब भी इनपुट टेक्स्ट बदलता है तो ट्रिगर होता है, मुक्त-टेक्स्ट संपादन सहित।',
            focused: 'जब इनपुट फ़ोकस प्राप्त करता है तो ट्रिगर होता है।',
            selected: 'जब उपयोगकर्ता सुझाव सूची से एक विकल्प चुनता है तो ट्रिगर होता है।',
            close: 'वर्तमान मान बदले बिना सुझाव सूची को बंद करता है।',
            focus: 'अंतर्निहित टेक्स्ट इनपुट पर कीबोर्ड फ़ोकस ले जाता है।',
            selectOption:
              'दिए गए विकल्प को प्रोग्रामेटिक रूप से चुनता है, मान को अपडेट करता है और सूची को बंद करता है।',
          },
          'command-palette': {
            emptyMessage:
              'जब खोज क्वेरी किसी आइटम से मेल नहीं खाती तो दिखाया गया संदेश, छोड़े जाने पर सक्रिय लोकेल के अनुवाद पर फ़ॉलबैक करता है।',
            items: 'खोज और निष्पादन के लिए उपलब्ध कमांड आइटम की पूरी सूची।',
            open: 'क्या पैलेट डायलॉग खुला है, [(open)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            placeholder: 'खोज इनपुट के खाली होने पर उसके अंदर दिखाया गया प्लेसहोल्डर।',
            execute:
              'जब उपयोगकर्ता एक कमांड चुनता है तो ट्रिगर होता है, चुने गए आइटम को उत्सर्जित करता है।',
            showActiveHighlight:
              'लौटाता है कि क्या सक्रिय पंक्ति को दिए गए फ़्लैट इंडेक्स के लिए अपनी हाइलाइट की गई पृष्ठभूमि रेंडर करनी चाहिए।',
          },
          tabs: {
            activeTab:
              'वर्तमान सक्रिय टैब का मान, [(activeTab)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            size: 'टैब का दृश्य आकार।',
            variant: 'टैब बार की दृश्य शैली: underline या filled।',
            changed:
              'जब भी सक्रिय टैब बदलता है तो नए सक्रिय टैब के मान के साथ ट्रिगर होता है।',
            registerTab:
              'एक चाइल्ड टैब को पंजीकृत करता है ताकि वह टैब बार में दिखाई दे; ea-tab द्वारा स्वतः कॉल किया जाता है।',
            selectTab: 'दिए गए मान वाले टैब को प्रोग्रामेटिक रूप से सक्रिय करता है।',
            unregisterTab:
              'पहले पंजीकृत चाइल्ड टैब को हटाता है; ea-tab द्वारा स्वतः कॉल किया जाता है।',
          },
          tab: {
            disabled: 'इस टैब को अक्षम करता है, उपयोगकर्ता को इसे चुनने से रोकता है।',
            id: 'टैब बटन और उसके पैनल पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'टैब बटन पर दिखाया गया टेक्स्ट लेबल।',
            value: 'अद्वितीय मान जो इस टैब को उसके मूल ea-tabs समूह के भीतर पहचानता है।',
          },
          'date-picker': {
            disabled: 'डेट पिकर को अक्षम करता है।',
            errorMsg:
              'फ़ील्ड के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            format: 'चयनित तारीख का प्रदर्शन फ़ॉर्मेट (short, medium या long)।',
            hint: 'फ़ील्ड के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'ट्रिगर और लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'फ़ील्ड के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            locale:
              'तारीख फ़ॉर्मेटिंग के लिए उपयोग किया गया BCP 47 लोकेल टैग, छोड़े जाने पर ग्लोबल लोकेल पर फ़ॉलबैक करता है।',
            maxDate:
              'सबसे नई तारीख जिसे उपयोगकर्ता चुन सकता है; इसके बाद की तारीखें कैलेंडर में अक्षम होती हैं।',
            minDate:
              'सबसे पुरानी तारीख जिसे उपयोगकर्ता चुन सकता है; इससे पहले की तारीखें कैलेंडर में अक्षम होती हैं।',
            placeholder:
              'जब कोई तारीख चयनित नहीं होती तो ट्रिगर पर दिखाया गया प्लेसहोल्डर।',
            readonly:
              'फ़ील्ड को केवल-पढ़ने योग्य रेंडर करता है, कैलेंडर को खुलने से रोकता है।',
            required: 'फ़ील्ड को आवश्यक के रूप में चिह्नित करता है।',
            size: 'डेट पिकर ट्रिगर का दृश्य आकार।',
            value:
              'वर्तमान चयनित तारीख, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            weekStartsOn:
              'कैलेंडर ग्रिड में सप्ताह का पहला दिन (रविवार के लिए 0, सोमवार के लिए 1)।',
            changed: 'जब चयनित तारीख बदलती है तो ट्रिगर होता है, साफ़ होने पर भी।',
            clear:
              'चयनित तारीख को साफ़ करता है और null के साथ changed उत्सर्जित करता है।',
            close: 'कैलेंडर पॉपओवर को बंद करता है।',
            focus: 'ट्रिगर बटन पर कीबोर्ड फ़ोकस ले जाता है।',
            onPopoverCloseRequested:
              'जब उपयोगकर्ता डेट पिकर के बाहर क्लिक करता है तो पॉपओवर बंद करता है।',
            open: 'कैलेंडर पॉपओवर खोलता है और फ़ोकस किए गए दिन सेल पर फ़ोकस ले जाता है।',
            toggle: 'कैलेंडर पॉपओवर को खुले और बंद के बीच टॉगल करता है।',
          },
          menu: {
            maxHeight:
              'CSS लंबाई के रूप में स्क्रॉल करने योग्य सूची की अधिकतम ऊंचाई; ऊंचे मेनू इसके आगे स्क्रॉल करते हैं।',
            ariaLabel:
              'मेनू सूची के लिए सुलभ लेबल, छोड़े जाने पर सक्रिय लोकेल पर फ़ॉलबैक करता है।',
            disabled: 'मेनू को अक्षम करता है, इसे खुलने से रोकता है।',
            id: 'मेनू सूची एलिमेंट पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            open: 'क्या मेनू खुला है, [(open)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            placement: 'अपने ट्रिगर एलिमेंट के सापेक्ष मेनू सूची का स्थान।',
            closed: 'जब मेनू बंद होता है तो ट्रिगर होता है।',
            opened: 'जब मेनू खुलता है तो ट्रिगर होता है।',
            close:
              'मेनू को बंद करता है और वैकल्पिक रूप से ट्रिगर एलिमेंट पर फ़ोकस बहाल करता है।',
            focusFirstItem: 'मेनू में पहले सक्षम आइटम पर कीबोर्ड फ़ोकस ले जाता है।',
            onPopoverCloseRequested:
              'जब उपयोगकर्ता मेनू के बाहर क्लिक करता है तो उसे बंद करता है।',
            openAt:
              'मेनू को दिए गए ट्रिगर एलिमेंट पर एंकर करके खोलता है और पहले आइटम को फ़ोकस करता है।',
            toggleAt:
              'मेनू की खुली स्थिति को टॉगल करता है, इसे दिए गए ट्रिगर एलिमेंट पर एंकर करता है।',
          },
          'menu-item': {
            disabled: 'आइटम को अक्षम करता है और क्लिक इवेंट को दबाता है।',
            variant:
              'आइटम की दृश्य शैली; विनाशकारी क्रियाओं के लिए danger का उपयोग करें।',
            clicked:
              'जब आइटम सक्रिय होता है तो ट्रिगर होता है; मूल मेनू तुरंत बाद में बंद हो जाता है।',
          },
          'multi-select': {
            disabled: 'मल्टी-सेलेक्ट को अक्षम करता है।',
            errorMsg:
              'फ़ील्ड के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            hint: 'फ़ील्ड के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'ट्रिगर और लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'फ़ील्ड के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            maxVisibleChips:
              'ट्रिगर में दिखाई गई चिप्स की अधिकतम संख्या इससे पहले कि बाकी एक गणना पिल में सिमट जाएं।',
            options: 'ड्रॉपडाउन सूची में रेंडर किए गए चयन योग्य विकल्पों की सूची।',
            placeholder:
              'जब कोई विकल्प चयनित नहीं होता तो ट्रिगर पर दिखाया गया प्लेसहोल्डर।',
            readonly: 'फ़ील्ड को केवल-पढ़ने योग्य रेंडर करता है।',
            required: 'फ़ील्ड को आवश्यक के रूप में चिह्नित करता है।',
            searchable: 'पॉपओवर के शीर्ष पर खोज इनपुट दिखाता है।',
            searchPlaceholder:
              'जब खोज शब्द खाली होता है तो खोज इनपुट के अंदर दिखाया गया प्लेसहोल्डर।',
            selectAll: 'विकल्प सूची के शीर्ष पर त्रि-स्थिति सभी-चुनें पंक्ति दिखाता है।',
            size: 'मल्टी-सेलेक्ट ट्रिगर का दृश्य आकार।',
            value: 'चयनित विकल्प मान, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            changed: 'जब भी चयन बदलता है तो नए मान के साथ ट्रिगर होता है।',
            clear: 'हर चयन को साफ़ करता है और इवेंट को फैलने से रोकता है।',
            handlePopoverKeydown:
              'खुले पॉपओवर के अंदर कीबोर्ड नेविगेशन को संभालता है, तीर कुंजियों, Enter, Space और Escape को रूट करता है।',
            onPopoverCloseRequested:
              'पॉपओवर द्वारा कॉल किया जाता है जब उपयोगकर्ता बाहर क्लिक करता है या स्क्रॉल करता है; पैनल को बंद करता है और फ़ील्ड को स्पर्शित चिह्नित करता है।',
            orderedValues:
              'दिए गए मान सेट को इनपुट विकल्प ऐरे से मेल खाने के लिए पुनः क्रमित करके लौटाता है।',
            removeChip: 'दिए गए विकल्प को वर्तमान चयन से हटाता है।',
            toggleOption: 'वर्तमान चयन में दिए गए विकल्प की सदस्यता को टॉगल करता है।',
            toggleSelectAll:
              'यदि कोई अचयनित हों तो सभी फ़िल्टर किए गए विकल्प चुनता है, या यदि सभी चयनित हों तो सभी फ़िल्टर किए गए विकल्पों का चयन रद्द करता है।',
          },
          dropdown: {
            disabled: 'ड्रॉपडाउन को अक्षम करता है।',
            errorMsg:
              'फ़ील्ड के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            hint: 'फ़ील्ड के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'ट्रिगर और लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'फ़ील्ड के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            options: 'ड्रॉपडाउन सूची में रेंडर किए गए चयन योग्य विकल्पों की सूची।',
            placeholder:
              'जब कोई विकल्प चयनित नहीं होता तो ट्रिगर पर दिखाया गया प्लेसहोल्डर।',
            readonly: 'फ़ील्ड को केवल-पढ़ने योग्य रेंडर करता है।',
            required: 'फ़ील्ड को आवश्यक के रूप में चिह्नित करता है।',
            size: 'ड्रॉपडाउन ट्रिगर का दृश्य आकार।',
            value: 'वर्तमान चयनित मान, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            changed: 'जब उपयोगकर्ता एक विकल्प चुनता है तो नए मान के साथ ट्रिगर होता है।',
            close: 'वर्तमान मान बदले बिना ड्रॉपडाउन सूची को बंद करता है।',
            focus: 'ड्रॉपडाउन ट्रिगर पर कीबोर्ड फ़ोकस ले जाता है।',
            onPopoverCloseRequested:
              'पॉपओवर द्वारा कॉल किया जाता है जब उपयोगकर्ता ड्रॉपडाउन के बाहर क्लिक करता है; पैनल को बंद करता है और फ़ील्ड को स्पर्शित चिह्नित करता है।',
            select:
              'दिए गए विकल्प को प्रोग्रामेटिक रूप से चुनता है और सूची को बंद करता है।',
            toggle: 'ड्रॉपडाउन सूची को खुले और बंद के बीच टॉगल करता है।',
          },
          'file-uploader': {
            accept:
              "अल्पविराम से अलग किए गए MIME प्रकार और फ़ाइल एक्सटेंशन जो ड्रॉपज़ोन स्वीकार करता है, उदाहरण के लिए 'image/*,.pdf'।",
            disabled: 'अपलोडर को अक्षम करता है।',
            errorMsg:
              'फ़ील्ड के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            hint: 'फ़ील्ड के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'ड्रॉपज़ोन और लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'फ़ील्ड के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            maxFiles:
              'फ़ाइलों की अधिकतम कुल संख्या; सीमा से अधिक फ़ाइलें अस्वीकृत होती हैं।',
            maxSize:
              'बाइट्स में प्रति फ़ाइल अधिकतम आकार; बड़ी फ़ाइलें अस्वीकृत होती हैं।',
            multiple: 'एक बार में एक से अधिक फ़ाइल चुनने की अनुमति देता है।',
            progress:
              'File पहचान द्वारा कुंजीबद्ध प्रति-फ़ाइल अपलोड प्रगति मैप (0-100); प्रगति बार छिपाने के लिए छोड़ें।',
            required: 'फ़ील्ड को आवश्यक के रूप में चिह्नित करता है।',
            showFileList: 'ड्रॉपज़ोन के नीचे चयनित फ़ाइलों की सूची दिखाता है।',
            size: 'अपलोडर का दृश्य आकार।',
            value:
              'वर्तमान फ़ाइल सूची, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            fileRemoved:
              'जब किसी फ़ाइल को उसकी पंक्ति के हटाएं बटन के माध्यम से हटाया जाता है तो ट्रिगर होता है।',
            rejected:
              'जब एक या अधिक फ़ाइलें सत्यापन में विफल होती हैं तो ट्रिगर होता है, प्रत्येक अस्वीकृति के कारण के साथ।',
            trackFile:
              'किसी फ़ाइल के लिए एक स्थिर ट्रैक कुंजी लौटाता है, जिसका उपयोग फ़ाइल सूची द्वारा आंतरिक रूप से किया जाता है।',
          },
          'form-field': {
            errorMsg:
              'कंट्रोल के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            hint: 'कंट्रोल के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'लेबल और संदेश वायरिंग के लिए id आधार, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'कंट्रोल के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            required: 'फ़ील्ड को आवश्यक के रूप में चिह्नित करता है।',
          },
          popover: {
            anchor:
              'होस्ट एलिमेंट या ElementRef जिसके सापेक्ष पॉपओवर खुद को स्थिति देता है।',
            ariaLabel:
              'पॉपओवर सरफ़ेस के लिए सुलभ लेबल; जब पॉपओवर में कोई दृश्य शीर्षक न हो तो एक प्रदान करें।',
            ariaLabelledby:
              'उस एलिमेंट की id जो पॉपओवर सरफ़ेस को लेबल करता है, aria-labelledby के रूप में अग्रेषित।',
            clamp:
              'जब पॉपओवर अन्यथा ओवरफ़्लो करता तो उसे व्यूपोर्ट के अंदर सीमित करता है।',
            closeOnEscape: 'Escape दबाने पर पॉपओवर को बंद करता है।',
            closeOnOutsideClick:
              'जब उपयोगकर्ता पॉपओवर और उसके एंकर दोनों के बाहर क्लिक करता है तो पॉपओवर को बंद करता है।',
            flip: 'जब अनुरोधित स्थान व्यूपोर्ट को ओवरफ़्लो करता है तो विपरीत दिशा में पलटता है।',
            matchAnchorWidth:
              'पॉपओवर की min-width को एंकर की चौड़ाई से मेल खाने के लिए सेट करता है।',
            offset: 'एंकर और पॉपओवर सरफ़ेस के बीच px में गैप।',
            open: 'क्या पॉपओवर वर्तमान में खुला है।',
            placement: 'अपने एंकर के सापेक्ष पॉपओवर की पसंदीदा स्थिति।',
            role: 'पॉपओवर सरफ़ेस पर लागू ARIA भूमिका।',
            scrollBehavior:
              'खुले रहते हुए पॉपओवर स्क्रॉल और रीसाइज़ इवेंट पर कैसे प्रतिक्रिया देता है: reposition, close या ignore।',
            surfaceId:
              'पॉपओवर सरफ़ेस के लिए DOM id, ट्रिगर एलिमेंट द्वारा aria-controls के माध्यम से उपयोग किया जाता है।',
            trapFocus:
              'खुले रहते हुए Tab और Shift+Tab को सरफ़ेस के अंदर चक्रित रखता है, डायलॉग-शैली के पॉपओवर के लिए।',
            closeRequested:
              'जब पॉपओवर बंद होने का अनुरोध करता है तो ट्रिगर होता है; मूल को इसे [open] में प्रतिबिंबित करना चाहिए।',
          },
          'accordion-item': {
            disabled: 'इस आइटम को अक्षम करता है, इसे टॉगल होने से रोकता है।',
            id: 'आइटम के हेडर बटन और पैनल पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'आइटम के हेडर बटन में दिखाया गया टेक्स्ट।',
            value: 'अद्वितीय कुंजी जो इस आइटम को उसके मूल अकॉर्डियन के भीतर पहचानती है।',
          },
          breadcrumbs: {
            ariaLabel:
              'ब्रेडक्रंब nav के लिए सुलभ लेबल, छोड़े जाने पर सक्रिय लोकेल के अनुवाद पर फ़ॉलबैक करता है।',
            items:
              'ब्रेडक्रंब प्रविष्टियों का ऐरे; href वाले आइटम लिंक के रूप में रेंडर होते हैं, अन्य बटन के रूप में, और अंतिम गैर-अंतःक्रियात्मक होता है।',
            separator: 'ब्रेडक्रंब आइटम के बीच रेंडर किए गए विभाजक की दृश्य शैली।',
            clicked:
              'जब कोई गैर-अक्षम, गैर-अंतिम ब्रेडक्रंब सक्रिय होता है तो ट्रिगर होता है।',
          },
          drawer: {
            animation:
              'ड्रॉअर के खुलने और बंद होने पर स्लाइड एनिमेशन: none (तत्काल), linear (स्थिर गति), या eased (अंत में धीमा होने वाला वक्र)।',
            ariaLabel:
              'ड्रॉअर पैनल के लिए सुलभ लेबल जब उसका शीर्षक पर्याप्त वर्णनात्मक नहीं होता।',
            closeOnBackdrop:
              'जब उपयोगकर्ता बैकड्रॉप पर क्लिक करता है तो ड्रॉअर बंद करता है।',
            closeOnEscape: 'जब उपयोगकर्ता Escape कुंजी दबाता है तो ड्रॉअर बंद करता है।',
            id: 'dialog एलिमेंट पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            mode: 'ड्रॉअर पृष्ठ से कैसे संबंधित है: overlay एक धुंधले, फ़ोकस-ट्रैप किए गए पृष्ठ के ऊपर तैरता है, जबकि push गैर-मॉडल रूप से खुलता है और पृष्ठ की सामग्री को बगल में पुनः प्रवाहित करता है।',
            open: 'क्या ड्रॉअर खुला है, [(open)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            position: 'व्यूपोर्ट का किनारा जिससे ड्रॉअर अंदर सरकता है।',
            pushTarget:
              'वह एलिमेंट जिसकी सामग्री push मोड में बगल में धकेली जाती है, CSS सेलेक्टर या एलिमेंट संदर्भ के रूप में, डिफ़ॉल्ट रूप से दस्तावेज़ बॉडी।',
            showClose: 'ड्रॉअर हेडर में बंद बटन दिखाता है।',
            size: 'अपनी मुख्य अक्ष के साथ ड्रॉअर पैनल का विस्तार: साइड ड्रॉअर के लिए चौड़ाई, तथा शीर्ष और नीचे के ड्रॉअर के लिए ऊँचाई।',
            closed:
              'जब ड्रॉअर बंद होता है तो ट्रिगर होता है, चाहे बंद बटन, बैकड्रॉप या Escape के माध्यम से हो।',
            opened: 'ड्रॉअर दिखने के बाद ट्रिगर होता है।',
          },
          'data-table': {
            clickable:
              'बॉडी पंक्तियों को क्लिक करने योग्य चिह्नित करता है: एक पॉइंटर कर्सर दिखाता है और क्लिक या Enter/Space पर rowActivate उत्सर्जित करता है।',
            rowActivate:
              'जब कोई क्लिक करने योग्य बॉडी पंक्ति क्लिक या कीबोर्ड द्वारा सक्रिय होती है तो पंक्ति डेटा के साथ ट्रिगर होता है।',
            navigable:
              'तालिका को रोविंग फ़ोकस और तीर-कुंजी सेल आंदोलन के साथ एक कीबोर्ड-नेविगेबल ग्रिड में बदल देता है।',
            bordered: 'हर सेल के चारों ओर एक बॉर्डर रेंडर करता है।',
            columns:
              'कॉलम परिभाषाएं जो प्रत्येक फ़ील्ड की कुंजी, लेबल और वैकल्पिक सॉर्टिंग या टेम्पलेट का वर्णन करती हैं।',
            data: 'तालिका में प्रदर्शित करने के लिए पंक्ति ऑब्जेक्ट का ऐरे।',
            density:
              'पंक्ति और हेडर सेल पैडिंग को नियंत्रित करने वाला लंबवत घनत्व प्रीसेट।',
            hoverable: 'होवर पर पॉइंटर के नीचे की पंक्ति को हाइलाइट करता है।',
            noDataText:
              'खाली स्थिति में दिखाया गया टेक्स्ट, सक्रिय लोकेल के अनुवाद पर फ़ॉलबैक करता है।',
            sort: 'वर्तमान सॉर्ट स्थिति (कॉलम कुंजी और दिशा), [(sort)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            stickyHeader:
              'सामग्री स्क्रॉल होने पर हेडर पंक्ति को तालिका के शीर्ष पर स्थिर करता है।',
            striped: 'विषम और सम पंक्तियों पर वैकल्पिक पृष्ठभूमि छायांकन लागू करता है।',
            trackBy:
              'पंक्तियों को कुशलता से पहचानने के लिए Angular के परिवर्तन पहचान द्वारा उपयोग की गई पंक्ति प्रॉपर्टी कुंजी।',
            sorted:
              'जब भी हेडर क्लिक के माध्यम से सॉर्ट कॉलम या दिशा बदलती है तो ट्रिगर होता है।',
          },
          'radio-group': {
            ariaLabel: 'जब कोई दृश्य लेबल रेंडर नहीं होता तो समूह के लिए सुलभ लेबल।',
            disabled: 'समूह में सभी रेडियो विकल्पों को अक्षम करता है।',
            errorMsg:
              'समूह के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            hint: 'समूह के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'समूह एलिमेंट और उसके लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'समूह के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            name: 'समूह में सभी रेडियो इनपुट पर लागू साझा name विशेषता, छोड़े जाने पर स्वतः-उत्पन्न।',
            orientation: 'समूह के भीतर रेडियो विकल्पों की लेआउट दिशा।',
            required: 'समूह को आवश्यक के रूप में चिह्नित करता है।',
            size: 'समूह में सभी रेडियो विकल्पों पर लागू दृश्य आकार।',
            value: 'वर्तमान चयनित मान, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            changed: 'जब उपयोगकर्ता एक विकल्प चुनता है तो नए मान के साथ ट्रिगर होता है।',
            select: 'दिए गए मान वाले विकल्प को प्रोग्रामेटिक रूप से चुनता है।',
          },
          segmented: {
            ariaLabel: 'जब कोई दृश्य लेबल रेंडर नहीं होता तो नियंत्रण के लिए सुलभ लेबल।',
            disabled: 'सेगमेंटेड नियंत्रण को अक्षम करता है।',
            errorMsg:
              'फ़ील्ड के नीचे दिखाया गया त्रुटि संदेश, संकेत को बदलता है और फ़ील्ड को अमान्य चिह्नित करता है।',
            fullWidth: 'नियंत्रण को उसके कंटेनर की चौड़ाई भरने के लिए खींचता है।',
            hint: 'फ़ील्ड के नीचे दिखाया गया सहायक टेक्स्ट, त्रुटि दिखने पर छिपा रहता है।',
            id: 'नियंत्रण और लेबल for पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'नियंत्रण के ऊपर रेंडर किया गया टेक्स्ट लेबल।',
            options: 'नियंत्रण के भीतर टॉगल बटन के रूप में रेंडर किए गए विकल्पों का ऐरे।',
            required: 'फ़ील्ड को आवश्यक के रूप में चिह्नित करता है।',
            size: 'सेगमेंटेड नियंत्रण का दृश्य आकार।',
            value:
              'वर्तमान चयनित विकल्प मान, [(value)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            changed:
              'जब उपयोगकर्ता एक अलग विकल्प चुनता है तो नए मान के साथ ट्रिगर होता है।',
            select: 'दिए गए विकल्प को प्रोग्रामेटिक रूप से चुनता है।',
          },
          'tree-node': {
            collapseLabel: 'संक्षिप्त शेवरॉन बटन के लिए सुलभ लेबल।',
            disabled: 'नोड और उसके वंशजों के साथ अंतःक्रिया को अक्षम करता है।',
            expandedIds: 'नोड id का सेट जो वर्तमान में विस्तारित हैं।',
            expandLabel: 'विस्तार शेवरॉन बटन के लिए सुलभ लेबल।',
            focusedId: 'उस नोड की Id जो वर्तमान में रोविंग tabindex फ़ोकस रखती है।',
            level:
              'ट्री रूट से गहराई (0-इंडेक्स्ड), इंडेंटेशन और aria-level के लिए उपयोग की जाती है।',
            node: 'इस नोड का वर्णन करने वाला डेटा ऑब्जेक्ट, जिसमें इसकी id, लेबल, चिल्ड्रन और अक्षम स्थिति शामिल है।',
            posInSet:
              'मूल नोड के चिल्ड्रन के बीच 1-इंडेक्स्ड स्थिति, aria-posinset के लिए उपयोग की जाती है।',
            selectedId: 'वर्तमान चयनित नोड की Id, या जब कुछ भी चयनित नहीं होता तो null।',
            setSize:
              'मूल नोड की चिल्ड्रन सूची में भाई-बहनों की कुल संख्या, aria-setsize के लिए उपयोग की जाती है।',
            select:
              'जब उपयोगकर्ता नोड पंक्ति पर क्लिक या सक्रिय करता है तो ट्रिगर होता है।',
            toggle:
              'जब उपयोगकर्ता विस्तार या संक्षिप्त शेवरॉन पर क्लिक करता है तो नोड id के साथ ट्रिगर होता है।',
          },
          tree: {
            ariaLabel: 'ट्री विजेट के लिए सुलभ लेबल।',
            disabled: 'ट्री में सभी नोड्स को अक्षम करता है।',
            expandedIds:
              'वर्तमान विस्तारित शाखा नोड्स की Id, [(expandedIds)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            nodes: 'ट्री नोड डेटा ऑब्जेक्ट का ऐरे जो पदानुक्रम को परिभाषित करता है।',
            selectedId:
              'वर्तमान चयनित नोड की Id, [(selectedId)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            size: 'ट्री का दृश्य आकार, टेक्स्ट और स्पेसिंग को आनुपातिक रूप से स्केल करता है।',
            nodeClick: 'जब उपयोगकर्ता एक नोड चुनता है तो नोड डेटा के साथ ट्रिगर होता है।',
          },
          step: {
            completed:
              'चरण को पूर्ण के रूप में चिह्नित करता है, उसके दृश्य संकेतक को अपडेट करता है।',
            disabled: 'चरण को सक्रिय होने से रोकता है।',
            id: 'चरण पैनल और उसके टैब पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            label: 'चरण संकेतक में दिखाया गया टेक्स्ट लेबल।',
            optional:
              'चरण को वैकल्पिक के रूप में चिह्नित करता है, चरण लेबल के नीचे एक संकेत के रूप में दिखाया जाता है।',
          },
          stepper: {
            activeStep:
              'वर्तमान सक्रिय चरण का शून्य-आधारित इंडेक्स, [(activeStep)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            disabled: 'पूरे स्टेपर और सभी चरण नेविगेशन को अक्षम करता है।',
            id: 'स्टेपर होस्ट एलिमेंट पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            linear:
              'उपयोगकर्ता के आगे बढ़ने से पहले प्रत्येक गैर-वैकल्पिक चरण को पूर्ण चिह्नित करने की आवश्यकता होती है।',
            size: 'स्टेपर का दृश्य आकार, चरण संकेतकों और लेबल को एक साथ स्केल करता है।',
            changed:
              'जब उपयोगकर्ता किसी अलग चरण पर नेविगेट करता है तो नए सक्रिय चरण इंडेक्स के साथ ट्रिगर होता है।',
            canNavigateTo:
              'लौटाता है कि क्या दिए गए इंडेक्स पर चरण वर्तमान स्थिति से पहुंच योग्य है।',
            indexOf: 'दिए गए चरण का इंडेक्स लौटाता है, या -1 यदि यह पंजीकृत नहीं है।',
            selectStep: 'यदि दिए गए इंडेक्स पर चरण पहुंच योग्य है तो उसे सक्रिय करता है।',
          },
          'transfer-list': {
            disabled: 'पूरी ट्रांसफ़र सूची और सभी मूव नियंत्रणों को अक्षम करता है।',
            items: 'दोनों पैन में उपलब्ध आइटम का पूरा पूल, id द्वारा पहचाना गया।',
            selectedIds:
              'वर्तमान में लक्ष्य (दाएं) ओर के आइटम की Id, [(selectedIds)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            size: 'ट्रांसफ़र सूची का दृश्य आकार।',
            sourceLabel:
              'स्रोत (बाएं) पैन के ऊपर रेंडर किया गया शीर्षक, सक्रिय लोकेल के डिफ़ॉल्ट पर फ़ॉलबैक करता है।',
            targetLabel:
              'लक्ष्य (दाएं) पैन के ऊपर रेंडर किया गया शीर्षक, सक्रिय लोकेल के डिफ़ॉल्ट पर फ़ॉलबैक करता है।',
          },
          'virtual-list': {
            itemHeight:
              'प्रत्येक पंक्ति की पिक्सेल ऊंचाई; सभी पंक्तियों की समान स्थिर ऊंचाई होनी चाहिए।',
            items:
              'रेंडर करने के लिए डेटा आइटम का पूरा ऐरे; किसी भी समय केवल दृश्य स्लाइस माउंट होता है।',
            overscan:
              'तेज़ स्क्रॉलिंग के दौरान खाली किनारों को कम करने के लिए दृश्य विंडो के ऊपर और नीचे रेंडर की गई अतिरिक्त पंक्तियों की संख्या।',
            viewportHeight: 'स्क्रॉलिंग व्यूपोर्ट की पिक्सेल ऊंचाई।',
            scrollIndexChange:
              'जब भी उपयोगकर्ता स्क्रॉल करता है तो व्यूपोर्ट के शीर्ष पर दिखाई देने वाली पहली पंक्ति के इंडेक्स के साथ ट्रिगर होता है।',
            scrollToIndex:
              'व्यूपोर्ट को स्क्रॉल करता है ताकि दिए गए इंडेक्स पर पंक्ति शीर्ष पर दिखाई दे, सूची सीमाओं तक सीमित।',
          },
          'field-label': {
            forId:
              'संबद्ध नियंत्रण की id; सेट होने पर एक <label for> रेंडर करता है, अन्यथा एक <span>।',
            labelId:
              'रेंडर किए गए लेबल एलिमेंट पर लागू id ताकि नियंत्रण इसे aria-labelledby के माध्यम से संदर्भित कर सकें।',
            required: 'लेबल पर एक आवश्यक संकेतक दिखाता है।',
            text: 'लेबल एलिमेंट के अंदर रेंडर किया गया लेबल टेक्स्ट।',
          },
          'field-messages': {
            error:
              'प्रदर्शित करने के लिए त्रुटि संदेश; सेट होने पर, संकेत छिपा रहता है और संदेश को एक अलर्ट के रूप में घोषित किया जाता है।',
            hint: 'जब कोई त्रुटि मौजूद न हो तो फ़ील्ड के नीचे दिखाया गया सहायक टेक्स्ट।',
            id: 'त्रुटि और संकेत एलिमेंट के लिए aria id निकालने के लिए उपयोग की गई आधार id।',
          },
          dialog: {
            ariaLabel:
              'डायलॉग के लिए सुलभ लेबल जब उसके हेडर स्लॉट में दृश्य शीर्षक नहीं होता।',
            closeOnBackdrop:
              'जब उपयोगकर्ता पैनल के बाहर बैकड्रॉप क्षेत्र पर क्लिक करता है तो डायलॉग बंद करता है।',
            closeOnEscape: 'जब उपयोगकर्ता Escape दबाता है तो डायलॉग बंद करता है।',
            id: 'नेटिव dialog एलिमेंट पर लागू id, छोड़े जाने पर स्वतः-उत्पन्न।',
            open: 'क्या डायलॉग दिखाया गया है, [(open)] के माध्यम से दो-तरफ़ा बाइंड करने योग्य।',
            showClose: 'डायलॉग हेडर में बंद बटन दिखाता है।',
            width: 'डायलॉग पैनल के लिए चौड़ाई प्रीसेट।',
            closed:
              'जब डायलॉग बंद होता है तो ट्रिगर होता है, चाहे वह उपयोगकर्ता द्वारा या प्रोग्रामेटिक रूप से बंद किया गया हो।',
            opened: 'showModal() के माध्यम से डायलॉग दिखने के बाद ट्रिगर होता है।',
          },
        },
      },
      sharedOptions: {
        fruitOptions: [
          { value: 'apple', label: 'सेब' },
          { value: 'banana', label: 'केला' },
          { value: 'cherry', label: 'चेरी' },
          { value: 'date', label: 'खजूर' },
        ],
        viewOptions: [
          { value: 'day', label: 'दिन' },
          { value: 'week', label: 'सप्ताह' },
          { value: 'month', label: 'महीना' },
        ],
        themeOptions: [
          { value: 'light', label: 'लाइट' },
          { value: 'dark', label: 'डार्क' },
        ],
        monthOptions: [
          { value: 'jan', label: 'जनवरी' },
          { value: 'feb', label: 'फ़रवरी' },
          { value: 'mar', label: 'मार्च' },
          { value: 'apr', label: 'अप्रैल' },
          { value: 'may', label: 'मई' },
          { value: 'jun', label: 'जून' },
          { value: 'jul', label: 'जुलाई' },
          { value: 'aug', label: 'अगस्त' },
          { value: 'sep', label: 'सितंबर' },
          { value: 'oct', label: 'अक्टूबर' },
          { value: 'nov', label: 'नवंबर' },
          { value: 'dec', label: 'दिसंबर' },
        ],
        breadcrumbHome: 'होम',
        breadcrumbProducts: 'उत्पाद',
        breadcrumbLaptops: 'लैपटॉप',
        breadcrumbMacBookPro: 'MacBook Pro',
        breadcrumbDashboard: 'डैशबोर्ड',
        breadcrumbSettings: 'सेटिंग',
      },
    },
  },
};

/**
 * Every user-facing string on eagami.com, grouped by page or shared section.
 * Parameterized strings are functions so each locale controls its own word
 * order. The website-wide `WebI18nService` resolves the active locale's
 * dictionary; templates read it via `i18n.messages().<group>.<key>`.
 */
export interface WebMessages {
  common: {
    skipToContent: string;
    brandHome: string;
    navUi: string;
    navUiTooltip: string;
    themeToggleTooltip: string;
    themeToggleLabel: (next: 'light' | 'dark') => string;
    localeMenuLabel: string;
    localeMenuTooltip: string;
    activeLocale: (label: string) => string;
    footer: {
      copyright: (year: number) => string;
      npmLink: string;
      npmTooltip: string;
      githubAriaLabel: string;
      githubTooltip: string;
      navLabel: string;
    };
    codeSnippet: {
      copyLabel: string;
      copySuccess: string;
      copyError: string;
    };
  };
  home: {
    metaTitle: string;
    metaDescription: string;
    hero: {
      tagline: string;
      ctaPrimary: string;
      ctaSecondary: string;
      scrollHint: string;
    };
    services: {
      title: string;
      lede: string;
      featuresHeading: string;
      uiNote: {
        before: string;
        link: string;
        after: string;
      };
      core: ReadonlyArray<{ title: string; description: string }>;
      addOns: ReadonlyArray<{ title: string; description: string; iconSlug: string }>;
    };
    projects: {
      title: string;
      lede: string;
      previousAriaLabel: string;
      nextAriaLabel: string;
      regionAriaLabel: string;
      showing: (title: string) => string;
      cards: ReadonlyArray<{
        title: string;
        description: string;
        url?: string;
        display?: string;
        logo?: string;
      }>;
    };
    contact: {
      title: string;
      lede: string;
      success: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      emailInvalid: string;
      messageLabel: string;
      placeholderHints: ReadonlyArray<string>;
      submit: string;
      sentToast: string;
      errorMessage: string;
    };
  };
  notFound: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lede: string;
    cta: string;
  };
  ui: {
    metaTitle: string;
    shell: {
      sidebarLabel: string;
      navLabel: string;
      overview: string;
      setup: string;
      designTokens: string;
      icons: string;
      i18n: string;
      components: string;
    };
    index: {
      metaTitle: string;
      metaDescription: string;
      title: string;
      ledeBefore: string;
      ledeAfter: string;
      principlesHeading: string;
      principles: ReadonlyArray<{ title: string; body: string }>;
      getStartedHeading: string;
      getStartedBefore: string;
      getStartedLink: string;
      getStartedAfter: string;
    };
    setup: {
      metaTitle: string;
      metaDescription: string;
      title: string;
      installLabel: string;
      or: string;
      stylesheetLabel: {
        before: string;
        after: string;
      };
      fontsLabel: {
        before: string;
        after: string;
      };
      firstComponentHeading: string;
    };
    tokens: {
      metaTitle: string;
      metaDescription: string;
      title: string;
      lede: string;
      sections: {
        theming: string;
        colors: string;
        typography: string;
        spacing: string;
        elevation: string;
        shape: string;
        motion: string;
      };
      themingRootBefore: string;
      themingScopedBefore: string;
      colorsPrimary: string;
      colorsSecondary: string;
      colorsNeutral: string;
      colorsStatus: string;
      colorsSemantic: string;
      typographyFamilies: string;
      typographySizes: string;
      typographyWeights: string;
      motionSimulate: string;
      motionDurations: string;
      motionEasings: string;
    };
    icons: {
      metaTitle: string;
      metaDescription: string;
      title: string;
      lede: string;
      filterLabel: string;
      filterPlaceholder: string;
      filterClearLabel: string;
      categoryFeather: string;
      categoryEagami: string;
      categoryBrand: string;
      countAll: (count: number) => string;
      countFiltered: (shown: number, total: number) => string;
      noResults: string;
      copiedToast: (selector: string) => string;
      copyFailedToast: (selector: string) => string;
      brandTitle: string;
      brandIntro: string;
      brandLinkLabel: string;
    };
    i18n: {
      metaTitle: string;
      metaDescription: string;
      title: string;
      lede: string;
      supportedHeading: string;
      supportedFallback: string;
      quickSetupHeading: string;
      quickSetupBefore: string;
      liveDemoHeading: string;
      liveDemoIntro: string;
      runtimeSwitchHeading: string;
      runtimeSwitchBefore: string;
      perStringHeading: string;
      perStringBefore: string;
      perStringAfter: string;
      frenchSpacingHeading: string;
      frenchSpacingBody: string;
      demoLocaleLabel: string;
      demoAppointmentLabel: string;
      demoFruitLabel: string;
    };
    component: {
      metaDescription: (name: string) => string;
      demoHeading: string;
      notFoundTitle: string;
      notFoundBody: string;
      notFoundLink: string;
      sectionHeadings: {
        basic: string;
        variants: string;
        sizes: string;
        states: string;
        disabled: string;
        dismissible: string;
        hintAndError: string;
        withHint: string;
        withError: string;
        withLabel: string;
        withIcons: string;
        withFooter: string;
        withPaginator: string;
        withDisabledItem: string;
        withDisabledTab: string;
        required: string;
        requiredWithHint: string;
        horizontal: string;
        vertical: string;
        single: string;
        multi: string;
        circle: string;
        square: string;
        shapes: string;
        shapesAndFallbacks: string;
        chevronSeparator: string;
        slashSeparator: string;
        twoLevels: string;
        fourDigitPin: string;
        defaultHeading: string;
        stripedAndBordered: string;
        compactDensity: string;
        stickyHeader: string;
        emptyState: string;
        formatVariants: string;
        minMax: string;
        positions: string;
        trigger: string;
        alignLeft: string;
        alignCenter: string;
        manyPages: string;
        minimal: string;
        indeterminate: string;
        noResize: string;
        disabledAndReadonly: string;
        password: string;
        autocompleteSection: string;
        twoOptions: string;
        fullWidth: string;
        minLengthMaxResults: string;
        removable: string;
        minMaxLabels: string;
        underline: string;
        filled: string;
        rect: string;
        inlineLayout: string;
        noResults: string;
        titleOnly: string;
        iconTrigger: string;
        placements: string;
        canvasSizes: string;
        cappedChipCount: string;
        customIcon: string;
        customLabel: string;
        customSize: string;
        linearFlow: string;
        manyLevels: string;
        notAnimated: string;
        outputFormats: string;
        quarterHourSteps: string;
        singleFile: string;
        stepped: string;
        sundayStart: string;
        twelveHourFormat: string;
        twoActions: string;
        withCompletedSteps: string;
        withConstraints: string;
        withInitialValue: string;
        withMaxlength: string;
        withMinMaxLabels: string;
        withOptionalStep: string;
        withSeconds: string;
        withoutAlpha: string;
        withoutSearch: string;
        withoutSelectAll: string;
      };
      common: {
        small: string;
        medium: string;
        large: string;
        cancel: string;
        save: string;
        close: string;
        confirm: string;
        disabled: string;
        defaultLabel: string;
        successLabel: string;
        warningLabel: string;
        errorLabel: string;
        infoLabel: string;
      };
      demos: {
        accordion: {
          whatLabel: string;
          whatBody: string;
          installLabel: string;
          installBody: string;
          themeLabel: string;
          themeBody: string;
          sectionOneLabel: string;
          sectionOneBody: string;
          sectionTwoLabel: string;
          sectionTwoBody: string;
          disabledSectionLabel: string;
          disabledSectionBody: string;
        };
        alert: {
          defaultText: string;
          successText: string;
          warningText: string;
          errorText: string;
          infoText: string;
          dismissibleText: string;
          tooltipSuppressed: string;
        };
        autocomplete: {
          frameworkLabel: string;
          startTyping: string;
          withHintLabel: string;
          hintText: string;
          withErrorLabel: string;
          errorText: string;
          frameworkPlaceholder: string;
          minMaxLabel: string;
          minMaxPlaceholder: string;
        };
        avatarEditor: {
          result: string;
        };
        badge: {
          successText: string;
          warningText: string;
          newText: string;
        };
        button: {
          primary: string;
          secondary: string;
          ghost: string;
          danger: string;
          toggleLoading: string;
          fullWidth: string;
        };
        card: {
          elevatedHeader: string;
          elevatedBody: string;
          outlinedHeader: string;
          outlinedBody: string;
          filledHeader: string;
          filledBody: string;
          cardTitleHeader: string;
          cardWithFooterBody: string;
        };
        checkbox: {
          acceptTermsAndConditions: string;
          disabledChecked: string;
          indeterminate: string;
          iAgreeToTerms: string;
          subscribeToUpdates: string;
          subscribeHint: string;
          acceptTermsLabel: string;
          acceptTermsError: string;
        };
        codeInput: {
          verificationCodeLabel: string;
          verificationCodeHint: string;
          verificationCodeError: string;
          pinLabel: string;
          pinHint: string;
        };
        colorPicker: {
          brandLabel: string;
          withHintLabel: string;
          hintBrandColor: string;
          withErrorLabel: string;
          errorRequired: string;
          hexLabel: string;
          rgbLabel: string;
          hslLabel: string;
          noAlphaHeading: string;
          opaqueOnlyLabel: string;
        };
        dataTable: {
          tableColumnId: string;
          tableColumnFirstName: string;
          tableColumnLastName: string;
          tableColumnAdmin: string;
          tableColumnPosts: string;
        };
        datePicker: {
          appointmentLabel: string;
          pickDatePlaceholder: string;
          withHintLabel: string;
          hintAnyFutureDate: string;
          withErrorLabel: string;
          errorRequired: string;
          shortLabel: string;
          mediumLabel: string;
          longLabel: string;
          withinNextWeeksLabel: string;
          withinNextWeeksHint: string;
        };
        dialog: {
          openButton: string;
          title: string;
          body: string;
        };
        divider: {
          orLabel: string;
          sectionLabel: string;
          leftLabel: string;
          rightLabel: string;
        };
        drawer: {
          rightButton: string;
          leftButton: string;
          topButton: string;
          bottomButton: string;
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
          fruitPlaceholder: string;
          withHintLabel: string;
          hintFavourite: string;
          withErrorLabel: string;
          errorRequired: string;
          selectPlaceholder: string;
        };
        emptyState: {
          noItemsTitle: string;
          noItemsDescription: string;
          createItem: string;
          noResultsTitle: string;
          noResultsDescription: string;
          clearFilters: string;
          nothingHereTitle: string;
        };
        fileUploader: {
          attachmentsLabel: string;
          imagesLabel: string;
          imagesHint: string;
          resumeLabel: string;
          customIconLabel: string;
          withHintLabel: string;
          withHintHint: string;
          withErrorLabel: string;
          withErrorText: string;
        };
        input: {
          defaultLabel: string;
          enterTextPlaceholder: string;
          withHintLabel: string;
          hintGuidance: string;
          withErrorLabel: string;
          errorRequired: string;
          readonlyLabel: string;
          readonlyValue: string;
          passwordLabel: string;
          passwordPlaceholder: string;
          passwordNoToggleLabel: string;
          passwordNoTogglePlaceholder: string;
          emailLabel: string;
          emailPlaceholder: string;
        };
        menu: {
          actions: string;
          edit: string;
          duplicate: string;
          archive: string;
          delete: string;
          file: string;
          moreOptionsLabel: string;
          view: string;
          rename: string;
          newItem: string;
          open: string;
          saveUnavailable: string;
          saveAs: string;
        };
        popover: {
          openLabel: string;
          basicContent: string;
          placementTopLabel: string;
          placementTopStartLabel: string;
          placementTopEndLabel: string;
          placementBottomLabel: string;
          placementBottomStartLabel: string;
          placementBottomEndLabel: string;
          placementLeftLabel: string;
          placementRightLabel: string;
          placementTopContent: string;
          placementTopStartContent: string;
          placementTopEndContent: string;
          placementBottomContent: string;
          placementBottomStartContent: string;
          placementBottomEndContent: string;
          placementLeftContent: string;
          placementRightContent: string;
        };
        progressBar: {
          processing: string;
        };
        radio: {
          appleLabel: string;
          bananaLabel: string;
          cherryLabel: string;
          optionALabel: string;
          optionBLabel: string;
          subscriptionPlanLabel: string;
          freeLabel: string;
          proLabel: string;
          enterpriseLabel: string;
          deliverySpeedLabel: string;
          deliverySpeedHint: string;
          standardLabel: string;
          expressLabel: string;
          accountTypeLabel: string;
          accountTypeError: string;
          personalLabel: string;
          businessLabel: string;
        };
        segmented: {
          viewLabel: string;
          themeLabel: string;
          themeHint: string;
          layoutLabel: string;
          layoutError: string;
          viewOptionList: string;
          viewOptionGrid: string;
          viewOptionKanban: string;
          themeOptionLight: string;
          themeOptionDark: string;
        };
        slider: {
          volumeLabel: string;
          brightnessLabel: string;
          withHintLabel: string;
          sliderHint: string;
          withErrorLabel: string;
          sliderError: string;
        };
        switch: {
          enableNotificationsLabel: string;
          disabledOnLabel: string;
          confirmConsentLabel: string;
          marketingEmailsLabel: string;
          marketingEmailsHint: string;
          twoFactorAuthLabel: string;
          twoFactorAuthError: string;
        };
        tabs: {
          account: string;
          accountContent: string;
          security: string;
          securityContent: string;
          notifications: string;
          notificationsContent: string;
          overview: string;
          overviewContent: string;
          analytics: string;
          analyticsContent: string;
          reports: string;
          reportsContent: string;
          general: string;
          generalContent: string;
          billing: string;
          billingContent: string;
          admin: string;
          adminContent: string;
        };
        tag: {
          disabledSuccess: string;
        };
        textarea: {
          messageLabel: string;
          messagePlaceholder: string;
          withHintLabel: string;
          hintMaxCharacters: string;
          withErrorLabel: string;
          errorRequired: string;
          fixedSizeLabel: string;
          fixedSizePlaceholder: string;
          readonlyLabel: string;
          readonlyValue: string;
        };
        toast: {
          message: (variant: string) => string;
        };
        tooltip: {
          topLabel: string;
          topTooltip: string;
          bottomLabel: string;
          bottomTooltip: string;
          leftLabel: string;
          leftTooltip: string;
          rightLabel: string;
          rightTooltip: string;
        };
        avatarEditorActions: {
          avatarUpdatedToast: string;
        };
      };
      sharedOptions: {
        fruitOptions: ReadonlyArray<{ value: string; label: string }>;
        viewOptions: ReadonlyArray<{ value: string; label: string }>;
        themeOptions: ReadonlyArray<{ value: string; label: string }>;
        breadcrumbHome: string;
        breadcrumbProducts: string;
        breadcrumbLaptops: string;
        breadcrumbMacBookPro: string;
        breadcrumbDashboard: string;
        breadcrumbSettings: string;
      };
    };
  };
}

import type { WebMessages } from '../web-messages.types';

export const ptBR: WebMessages = {
  common: {
    skipToContent: 'Pular para o conteúdo principal',
    brandHome: 'página inicial da Eagami',
    navUi: 'UI',
    navUiTooltip: 'Documentação da biblioteca de componentes',
    themeToggleTooltip: 'Alternar tema',
    themeToggleLabel: next =>
      `Mudar para o modo ${next === 'light' ? 'claro' : 'escuro'}`,
    localeMenuLabel: 'Idioma',
    localeMenuTooltip: 'Mudar idioma',
    activeLocale: label => `Idioma atual: ${label}`,
    footer: {
      copyright: year => `© ${year} Eagami`,
      allRightsReserved: 'Todos os direitos reservados.',
      privacyLink: 'Privacidade',
      termsLink: 'Termos',
      npmLink: 'npm',
      npmTooltip: 'Ver @eagami/ui no npm',
      githubAriaLabel: 'Eagami no GitHub',
      githubTooltip: 'Ver código-fonte no GitHub',
      navLabel: 'Rodapé',
    },
    codeSnippet: {
      copyLabel: 'Copiar para a área de transferência',
      copySuccess: 'Copiado para a área de transferência',
      copyError: 'Não foi possível copiar para a área de transferência',
    },
  },
  home: {
    metaTitle: 'Eagami',
    metaDescription:
      'Web design elegante e a casa da Eagami UI: uma biblioteca de componentes Angular leve e acessível.',
    hero: {
      tagline: 'web design elegante.',
      ctaPrimary: 'Entre em contato',
      ctaSecondary: 'Ver projetos recentes →',
      scrollHint: 'Rolar até os serviços',
    },
    services: {
      title: 'Serviços',
      lede: 'De uma única página de destino a um aplicativo web completo, além de tudo o que vem depois do lançamento.',
      featuresHeading: 'Recursos',
      uiNote: {
        before: 'Projetos maiores podem ser construídos sobre',
        link: 'Eagami UI',
        after:
          ', uma biblioteca de componentes personalizados, para uma linguagem visual consistente e moderna em todo o site.',
      },
      core: [
        {
          title: 'Sites personalizados',
          description:
            'Um site completo construído do zero: configuração de domínio, hospedagem, branding, design e lançamento. Revisões ilimitadas até o dia do lançamento.',
        },
        {
          title: 'Manutenção contínua',
          description:
            'Manutenção mensal cobrindo hospedagem, correções de segurança, atualizações de dependências, edições de conteúdo e análises de métricas.',
        },
      ],
      addOns: [
        {
          title: 'Gerenciamento de usuários',
          description:
            'Autenticação, registro e recuperação de senha de usuários, além de um painel administrativo com métricas e controles por usuário.',
          iconSlug: 'users',
        },
        {
          title: 'Processamento de pagamentos',
          description:
            'Pagamentos online (Stripe por padrão, outros provedores sob solicitação), com formulários de pagamento personalizáveis e cobranças recorrentes.',
          iconSlug: 'credit-card',
        },
        {
          title: 'Suporte multilíngue',
          description:
            'Suporte a vários idiomas, com detecção automática opcional a partir do navegador do visitante.',
          iconSlug: 'languages',
        },
        {
          title: 'Temas',
          description:
            'Alternância entre modo claro/escuro e temas de cores totalmente personalizáveis.',
          iconSlug: 'moon',
        },
        {
          title: 'Análises e insights',
          description:
            'Métricas de tráfego do site (origens, dispositivos, localizações), além de rastreamento de eventos personalizados.',
          iconSlug: 'bar-chart',
        },
        {
          title: 'E-mail e notificações',
          description:
            'E-mails automatizados para atividade da conta, recibos e comunicados.',
          iconSlug: 'mail',
        },
      ],
    },
    projects: {
      title: 'Projetos recentes',
      lede: 'Alguns sites em desenvolvimento ativo.',
      previousAriaLabel: 'Projetos anteriores',
      nextAriaLabel: 'Próximos projetos',
      regionAriaLabel: 'Projetos recentes',
      showing: title => `Exibindo ${title}`,
      cards: [
        {
          title: 'London Chess',
          description:
            'Um ponto de encontro para o London Chess Club e eventos de xadrez em London, ON.',
          url: 'https://londonchess.ca',
          display: 'londonchess.ca',
          logo: 'assets/projects/londonchess.svg',
        },
        {
          title: 'Chordbomb',
          description:
            'Identifica a música tocando ao seu redor e deduz sua progressão de acordes.',
          url: 'https://chordbomb.com',
          display: 'chordbomb.com',
          logo: 'assets/projects/chordbomb.svg',
        },
        {
          title: 'CIRC Aesthetics',
          description:
            'Clínica de Radiologia Intervencionista Cosmética sediada em London, ON.',
          url: 'https://circaesthetics.ca',
          display: 'circaesthetics.ca',
          logo: 'assets/projects/circaesthetics.svg',
        },
        {
          title: 'Brewski Bets',
          description:
            'Um rastreador de apostas casuais entre amigos, acertadas em cerveja.',
          url: 'https://brewskibets.com',
          display: 'brewskibets.com',
          logo: 'assets/projects/brewskibets.svg',
        },
      ],
    },
    contact: {
      title: 'Tem um projeto em mente?',
      lede: 'Vamos conversar!',
      success: 'Obrigado pela mensagem. Em breve você terá um retorno.',
      nameLabel: 'Nome',
      namePlaceholder: 'Seu nome',
      emailLabel: 'E-mail',
      emailPlaceholder: 'voce@exemplo.com',
      emailInvalid: 'Insira um endereço de e-mail válido',
      messageLabel: 'Mensagem',
      placeholderHints: [
        'Olá! Estou trabalhando em um projeto paralelo e gostaria de uma ajuda com o frontend...',
        'Procuro alguém para criar um site para o nosso pequeno negócio...',
        'Uma pergunta rápida sobre a biblioteca de componentes antes de começar...',
      ],
      submit: 'Enviar mensagem',
      sentToast: 'Mensagem enviada',
      errorMessage:
        'Desculpe, algo deu errado. Envie um e-mail diretamente para info@eagami.com.',
    },
  },
  privacy: {
    metaTitle: 'Privacidade | Eagami',
    metaDescription: 'O que o eagami.com coleta e o que não coleta.',
    title: 'Política de privacidade',
    lastUpdated: date => `Última atualização: ${date}`,
    languageNote:
      'Esta política é mantida apenas em inglês. Qualquer versão traduzida é fornecida somente para facilitar a leitura.',
  },
  terms: {
    metaTitle: 'Termos | Eagami',
    metaDescription:
      'Termos de uso do eagami.com e da biblioteca de componentes Eagami UI.',
    title: 'Termos de uso',
    lastUpdated: date => `Última atualização: ${date}`,
    languageNote:
      'Estes termos são mantidos apenas em inglês. Qualquer versão traduzida é fornecida somente para facilitar a leitura.',
  },
  notFound: {
    metaTitle: 'Página não encontrada | Eagami',
    metaDescription: 'Página não encontrada.',
    eyebrow: '404',
    title: 'Página não encontrada',
    lede: 'A página que você procurava não existe ou foi movida.',
    cta: 'Voltar ao início',
  },
  ui: {
    changelog: {
      title: 'Registro de alterações',
      metaTitle: 'Registro de alterações | Eagami UI',
      metaDescription:
        'Histórico de versões da biblioteca de componentes Angular Eagami UI.',
      lead: 'Alterações notáveis no @eagami/ui, das mais recentes primeiro.',
      migrationGuide: 'Guia de migração',
      fullHistory: 'Histórico completo no GitHub',
    },
    shell: {
      changelog: 'Registro de alterações',
      sidebarLabel: 'Barra lateral da documentação',
      navLabel: 'Documentação',
      overview: 'Visão geral',
      setup: 'Configuração',
      designTokens: 'Tokens de design',
      themeBuilder: 'Gerador de temas',
      icons: 'Ícones',
      i18n: 'Internacionalização',
      accessibility: 'Acessibilidade',
      components: 'Componentes',
    },
    index: {
      metaTitle: 'Biblioteca de componentes Angular | Eagami UI',
      metaDescription:
        'Biblioteca de componentes Angular leve e acessível, construída sobre propriedades personalizadas de CSS.',
      title: 'Eagami UI',
      ledeBefore: 'é uma biblioteca de componentes Angular leve e acessível.',
      ledeAfter:
        'Padrões sensatos prontos para uso, com um design totalmente personalizável para se adequar a qualquer marca.',
      principlesHeading: 'Princípios de design',
      principles: [
        {
          title: 'Acessível',
          body: 'Navegação por teclado, gerenciamento de foco, suporte a leitores de tela e tratamento de movimento reduzido estão integrados em cada componente.',
        },
        {
          title: 'Leve',
          body: 'Cada componente é importado de forma independente e o pacote só inclui o que você usa.',
        },
        {
          title: 'Personalizável',
          body: 'Totalmente personalizável com tokens de design, mantendo uma aparência unificada em todas as páginas. As variantes clara e escura vêm juntas e seguem por padrão a preferência do sistema do usuário.',
        },
        {
          title: 'Localizado',
          body: 'O texto integrado dos componentes vem em todos os idiomas suportados.',
        },
        {
          title: 'Moderno',
          body: 'Atualizado regularmente com os recursos mais recentes do Angular e os padrões web modernos.',
        },
        {
          title: 'Sem amarras',
          body: 'Cada componente é Angular e CSS puros, sem dependência de fornecedor, então o código-fonte pode ser lido, copiado ou modificado como qualquer outro código do seu projeto.',
        },
      ],
      getStartedHeading: 'Comece agora',
      getStartedBefore: 'Vá até',
      getStartedLink: 'Configuração',
      /* Leading space because the template suppresses whitespace between the
         link and this string so Polish can butt its trailing comma directly
         against "Instalacji". Locales that continue with a word (en/fr/el/es)
         provide the separator themselves. */
      getStartedAfter: ' para instalar o pacote e configurar a folha de estilo global.',
      showcase: {
        button: 'Aperte aqui',
        toggle: 'Alterne aqui',
        tick: 'Marque aqui',
        tag: 'Etiqueta',
        badge: 'Selo',
        tooltip: 'Informações adicionais exibidas em uma dica',
        exploreMore: '...explorar mais componentes',
        list: 'Lista',
        grid: 'Grade',
        table: 'Tabela',
        radioThis: 'Este',
        radioThat: 'Aquele',
        option1: 'Opção 1',
        option2: 'Opção 2',
        option3: 'Opção 3',
        toastButton: 'Botão pressionado',
        toastToggleOn: 'Alternância ativada',
        toastToggleOff: 'Alternância desativada',
        toastTickOn: 'Caixa marcada',
        toastTickOff: 'Caixa desmarcada',
        ariaView: 'Visualização de demonstração',
        ariaSlider: 'Controle deslizante de demonstração',
        ariaRating: 'Avaliação de demonstração',
        ariaLayout: 'Layout de demonstração',
        ariaColor: 'Cor de demonstração',
        ariaSelect: 'Seleção de demonstração',
        ariaDate: 'Data de demonstração',
        ariaMultiSelect: 'Seleção múltipla de demonstração',
        msMusic: 'Música',
        msTravel: 'Viagens',
        msFood: 'Comida',
      },
      theme: {
        heading: 'Deixe do seu jeito',
        ledeBefore: 'Os',
        ledeLink: 'tokens de design',
        ledeAfter:
          ' são o que dá a cada projeto Eagami uma personalidade distinta: cores, fontes, espaçamento, cantos, sombras e movimento personalizáveis, tudo aplicado ao site ou aplicativo inteiro. Ajuste alguns abaixo para ver como eles afetam os componentes.',
        brandColor: 'Cor da marca',
        radius: 'Raio dos cantos',
        font: 'Fonte',
        fontDefault: '(padrão)',
        reset: 'Redefinir',
      },
    },
    setup: {
      metaTitle: 'Configuração | Eagami UI',
      metaDescription:
        'Instale o @eagami/ui e configure a folha de estilo global e as fontes.',
      title: 'Configuração',
      ngAddLabel: 'Instale e configure tudo com um único comando:',
      manualLabel: 'Ou configure manualmente:',
      installLabel: 'Instale o pacote:',
      or: 'ou',
      stylesheetLabel: {
        before: 'Adicione a folha de estilo global em',
        after: ':',
      },
      fontsLabel: {
        before: 'Carregue as fontes em',
        after: ':',
      },
      firstComponentHeading: 'Seu primeiro componente',
    },
    integrations: {
      heading: 'Além do Angular',
      intro:
        'Os tokens de design são independentes de framework. Copie um guia de integração autônomo para um projeto sem Angular ou consuma diretamente a exportação de tokens legível por máquina.',
      reactLink: 'Guia de integração com React',
      flutterLink: 'Guia de integração com Flutter',
      tokensLink: 'Tokens de design em JSON',
    },
    themeBuilder: {
      metaTitle: 'Gerador de temas Angular | Eagami UI',
      metaDescription:
        'Gere uma paleta verificada pelo WCAG para os modos claro e escuro a partir das cores da sua marca e copie a configuração do provedor ou o CSS.',
      title: 'Gerador de temas',
      lede: 'Escolha as cores da sua marca e o Eagami UI deriva uma escala completa de 50–900 no espaço OKLCH, verifica o contraste WCAG nos modos claro e escuro e entrega a configuração <code>provideEagamiUi()</code> pronta para usar.',
      controlsHeading: 'Cores da marca',
      primaryLabel: 'Cor primária',
      secondaryLabel: 'Cor secundária',
      contrastHeading: 'Acessibilidade',
      contrastPass: 'Atende ao contraste WCAG 2.2 AA nos modos claro e escuro',
      contrastFailIntro:
        'Algumas combinações ficam abaixo do limite de contraste WCAG AA:',
      scaleHeading: 'Escala gerada',
      previewHeading: 'Prévia',
      previewHint: 'Alterne o tema do site para visualizar a paleta no modo escuro.',
      previewButton: 'Começar',
      previewSwitch: 'Notificações',
      previewPrimary: 'Primária',
      previewSecondary: 'Secundária',
      previewStep1: 'Conta',
      previewStep2: 'Perfil',
      previewStep3: 'Concluído',
      previewProgress: 'Progresso:',
      exportHeading: 'Use',
      exportConfigLabel: 'Configuração do provedor',
      exportCssLabel: 'Propriedades personalizadas CSS',
    },
    tokens: {
      metaTitle: 'Tokens de design | Eagami UI',
      metaDescription:
        'Propriedades personalizadas de CSS para cores, tipografia, espaçamento, elevação, forma e movimento.',
      title: 'Tokens de design',
      lede: 'As propriedades personalizadas de CSS que governam cada componente da biblioteca: cores, tipografia, espaçamento, elevação, forma e movimento. Referencie esses tokens em seus próprios estilos via <code>var(--token-name)</code> para manter a consistência visual em todo o aplicativo.',
      sections: {
        theming: 'Temas',
        palette: 'Paleta da marca',
        colors: 'Cores',
        typography: 'Tipografia',
        spacing: 'Espaçamento',
        elevation: 'Elevação',
        shape: 'Forma',
        motion: 'Movimento',
      },
      themingRootBefore:
        'Sobrescreva qualquer token em <code>:root</code> para retematizar toda a biblioteca:',
      themingScopedBefore:
        'Ou limite as sobrescritas a componentes individuais quando útil:',
      paletteIntro:
        'Passe um único hex da marca para <code>provideEagamiUi()</code> e a biblioteca deriva uma escala completa de dez tons (50 a 900) no espaço <a href="https://www.w3.org/TR/css-color-4/#ok-lab" target="_blank" rel="noopener noreferrer"><span>OKLCH</span></a>, mantendo o matiz e a croma estáveis enquanto varia a luminosidade. Os tons derivados alimentam cada token <code>--color-brand-*</code> tanto no modo claro quanto no escuro:',
      paletteOverrides:
        'Fixe tons específicos ou remapeie qual tom derivado sustenta cada papel semântico:',
      paletteContrast:
        'Cada combinação de papel da marca (texto sobre superfície, superfície sobre tela) é verificada em relação ao WCAG 2.2 AA na inicialização. Uma combinação que falha lança um erro antes do aplicativo carregar, então um problema de contraste na cor da marca é detectado na inicialização em vez de em produção.',
      paletteBuilderIntro: 'Crie e visualize sua paleta de forma visual no',
      paletteBuilderLink: 'gerador de temas',
      elevationDrop: 'Sombras projetadas',
      elevationRelief: 'Relevo e cavidade',
      elevationReliefBefore:
        '<code>--shadow-bevel</code> combina um realce interno (topo) com uma sombra interna (base) para superfícies que devem parecer elevadas. <code>--shadow-well</code> inverte a iluminação para uma aparência rebaixada. Combine com <code>--shadow-*</code> para uma sombra projetada ambiente: <code>box-shadow: var(--shadow-bevel), var(--shadow-sm);</code>',
      colorsPrimary: 'Primária',
      colorsSecondary: 'Secundária',
      colorsNeutral: 'Neutra',
      colorsStatus: 'Status',
      colorsSemantic: 'Semântica',
      typographyFamilies: 'Famílias',
      typographySizes: 'Tamanhos',
      typographyWeights: 'Pesos',
      typographyComposites: 'Estilos compostos',
      typographyCompositesBefore:
        'Os tokens compostos agrupam um tamanho, peso, altura de linha (e às vezes família) para um papel específico. <code>--text-section-heading-*</code> é o primeiro composto que fixa uma família de fontes, use-o para o título de subseção <code>&lt;h2&gt;</code> em páginas de documentação e marketing.',
      typographySectionHeadingSample: 'Título de seção com a voz da marca',
      motionSimulate: 'Simular',
      motionDurations: 'Durações',
      motionEasings: 'Suavizações',
    },
    icons: {
      metaTitle: 'Ícones Angular | Eagami UI',
      metaDescription: 'Conjunto de ícones incluído no @eagami/ui.',
      title: 'Ícones',
      lede: 'Componentes Angular independentes que herdam sua cor e escalam com <code>font-size</code>, de modo que se renderizam em qualquer tamanho. A maioria deriva dos <a href="https://feathericons.com/" target="_blank" rel="noopener noreferrer"><span>Feather Icons</span></a> de <a href="https://github.com/colebemis" target="_blank" rel="noopener noreferrer"><span>Cole Bemis</span></a> sob a <a href="https://github.com/feathericons/feather/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><span>Licença MIT</span></a>; os demais são ícones originais da Eagami UI. Os ícones Feather também podem ser desenhados com traços mais finos ou mais grossos. Clique em um ícone para copiar seu seletor.',
      filterLabel: 'Filtrar ícones',
      filterPlaceholder: 'Pesquisar ícones',
      filterClearLabel: 'Limpar pesquisa',
      categoryFeather: 'Feather',
      categoryEagami: 'Eagami UI',
      categoryBrand: 'Marca',
      countAll: count => `${count} ícones`,
      countFiltered: (shown, total) => `${shown} de ${total} ícones`,
      noResults: 'Nenhum ícone corresponde à sua pesquisa',
      copiedToast: selector => `"${selector}" copiado para a área de transferência`,
      copyFailedToast: selector =>
        `Não foi possível copiar "${selector}" para a área de transferência`,
      brandTitle: 'Ícones de marca',
      brandIntro:
        'Os ícones de marca na lista abaixo representam marcas registradas de terceiros e são fornecidos apenas para uso nominativo, ou seja, identificar a marca que representam em uma interface (um botão "Entrar com o Google", um link "Compartilhar no Facebook", etc.). Eles não são licenciados para uso decorativo geral. Os consumidores são responsáveis por seguir as diretrizes de cada marca:',
      brandLinkLabel: 'Recursos da marca',
    },
    i18n: {
      metaTitle: 'Internacionalização | Eagami UI',
      metaDescription:
        'Texto integrado dos componentes em 15 idiomas, com troca em tempo de execução e sobrescritas por string.',
      title: 'Internacionalização',
      lede: 'Cada string integrada (rótulos ARIA, placeholders, estados vazios, controles do seletor de data) vem em 15 idiomas. Defina um para todo o aplicativo, troque em tempo de execução ou sobrescreva strings individuais.',
      supportedHeading: 'Idiomas suportados',
      supportedFallback:
        'Idiomas desconhecidos recorrem ao inglês, assim como quaisquer chaves ausentes em uma sobrescrita parcial.',
      quickSetupHeading: 'Configuração rápida',
      quickSetupBefore:
        'Adicione <code>provideEagamiUi()</code> à configuração do seu aplicativo e registre os idiomas que você usa via <code>locales</code>. O inglês está sempre disponível, então você inclui apenas o que precisa.',
      lazyHeading: 'Carregamento sob demanda',
      lazyBefore:
        'Registre <code>localeLoaders</code> em vez de <code>locales</code>: um idioma é baixado na primeira vez em que se torna ativo e fica fora do bundle inicial. Aponte cada loader para um módulo que reexporta um único pacote de idioma e pré-carregue com <code>loadLocale()</code> quando a troca precisar ser instantânea.',
      liveDemoHeading: 'Demonstração ao vivo',
      liveDemoIntro:
        'Escolha um idioma e veja os componentes abaixo adotarem as strings correspondentes e a formatação de data.',
      runtimeSwitchHeading: 'Troca em tempo de execução',
      runtimeSwitchBefore:
        'Injete <code>EagamiI18nService</code> e chame <code>setLocale()</code>. O idioma ativo é um signal, então cada componente é renderizado novamente com as novas strings sem precisar atualizar a página.',
      perStringHeading: 'Sobrescritas por string',
      perStringBefore:
        'Passe um objeto <code>messages</code> junto com o idioma para trocar strings individuais. Tudo o que você omitir recorre aos padrões do idioma.',
      perStringAfter:
        'A maioria dos componentes também expõe entradas de mensagem individuais (por exemplo, <code>placeholder</code> em <code>&lt;ea-dropdown&gt;</code>) para sobrescritas pontuais no local da chamada.',
      frenchSpacingHeading: 'Auxiliar de espaçamento francês',
      frenchSpacingBody:
        'A tipografia francesa exige um espaço estreito não separável antes de <code>? ! : ; »</code> e depois de <code>«</code>. O auxiliar exportado <code>frenchSpacing()</code> converte os espaços normais em suas próprias strings em francês (a biblioteca trata internamente suas mensagens em francês incluídas).',
      demoLocaleLabel: 'Idioma',
    },
    accessibility: {
      metaTitle: 'Acessibilidade | Eagami UI',
      metaDescription:
        'Conformidade WCAG 2.2 AA, suporte completo a teclado e componentes amigáveis a leitores de tela, verificados a cada versão.',
      title: 'Acessibilidade',
      lede: 'Cada componente é construído segundo os principais padrões de acessibilidade da web: semântica correta, suporte completo a teclado, gerenciamento de foco e anúncios em leitores de tela funcionam desde o início.',
      conformanceHeading: 'Conformidade',
      conformanceBody:
        'A biblioteca adere ao <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener">WCAG 2.2 Level AA</a>, o padrão que a maioria das organizações precisa cumprir, e segue as práticas oficiais de autoria do W3C para cada tipo de controle, de modais e menus a sliders e seletores de data. Os anúncios em leitores de tela estão disponíveis em todos os idiomas suportados, então a tecnologia assistiva sempre fala o idioma do usuário.',
      builtInHeading: 'Acessibilidade integrada',
      builtInItems: [
        {
          title: 'Semântica',
          body: 'Elementos nativos sempre que possível, papéis, estados e propriedades ARIA explícitos quando não. Estados como expanded, selected, checked, invalid e busy são sempre expostos programaticamente, nunca apenas por meio de estilo.',
        },
        {
          title: 'Suporte a teclado',
          body: 'Padrões de teclado completos do APG: roving tabindex, navegação pelas setas, Home e End, Escape para dispensar e Enter ou Espaço para ativar, com tratamento das setas ciente de RTL.',
        },
        {
          title: 'Gerenciamento de foco',
          body: 'Modais e seletores confinam o foco enquanto abertos e o devolvem ao gatilho ao fechar. Os indicadores de foco estão sempre visíveis e nunca são suprimidos.',
        },
        {
          title: 'Anúncios em leitores de tela',
          body: 'Toasts, alertas, erros de validação e mudanças de estado assíncronas são anunciados por meio de regiões ao vivo com o nível de polidez apropriado.',
        },
        {
          title: 'Movimento reduzido',
          body: 'As animações respeitam a media query prefers-reduced-motion em toda parte.',
        },
        {
          title: 'Contraste',
          body: 'Os temas claro e escuro padrão atendem aos requisitos de contraste das WCAG, e as ferramentas de temas sinalizam combinações que ficam abaixo do AA.',
        },
      ],
      labelsHeading: 'Nomes acessíveis',
      labelsBefore:
        'Componentes que renderizam texto rotulam a si mesmos. Qualquer coisa apenas com ícone ou gráfica expõe uma entrada <code>aria-label</code> (com padrões localizados para controles integrados como botões de limpar, fechar e dispensar), e os campos de formulário vinculam <code>label</code>, dicas e mensagens de erro ao controle via <code>aria-describedby</code> automaticamente.',
      labelsAfter:
        'Forneça um <code>label</code> ou <code>aria-label</code> para controles sem texto visível e o componente cuida do resto: nomes, dicas e mensagens de erro permanecem vinculados automaticamente.',
      testingHeading: 'Verificado a cada versão',
      testingBody:
        'Cada componente é verificado segundo as regras de acessibilidade do setor sempre que muda, e uma versão só é publicada quando todas as verificações passam, então a acessibilidade que você vê aqui se mantém conforme a biblioteca evolui.',
    },
    component: {
      metaTitle: name => `Componente Angular ${name} | Eagami UI`,
      metaDescription: name =>
        `Componente Angular ${name}: demonstração ao vivo, referência de API e temas com variáveis CSS.`,
      demoHeading: 'Demonstração',
      notFoundTitle: 'Componente não encontrado',
      notFoundBody: 'Escolha um componente na barra lateral, ou',
      notFoundLink: 'volte à introdução',
      sectionHeadings: {
        basic: 'básico',
        variants: 'variantes',
        sizes: 'tamanhos',
        states: 'estados',
        disabled: 'desativado',
        dismissible: 'dispensável',
        clearable: 'limpável',
        hintAndError: 'dica e erro',
        withHint: 'com dica',
        withError: 'com erro',
        withLabel: 'com rótulo',
        withIcons: 'com ícones',
        withFooter: 'com rodapé',
        withPaginator: 'com paginador',
        withDisabledItem: 'com item desativado',
        withDisabledTab: 'com aba desativada',
        required: 'obrigatório',
        requiredWithHint: 'obrigatório com dica',
        horizontal: 'horizontal',
        vertical: 'vertical',
        single: 'único',
        multi: 'múltiplo',
        circle: 'círculo',
        square: 'quadrado',
        shapes: 'formas',
        shapesAndFallbacks: 'formas e fallbacks',
        chevronSeparator: 'separador de chevron',
        slashSeparator: 'separador de barra',
        twoLevels: 'dois níveis',
        fourDigitPin: 'PIN de 4 dígitos',
        defaultHeading: 'padrão',
        stripedAndBordered: 'listrado e com bordas',
        compactDensity: 'densidade compacta',
        tinyList: 'lista minúscula',
        stickyHeader: 'cabeçalho fixo',
        emptyState: 'estado vazio',
        formatVariants: 'variantes de formato',
        minMax: 'mín e máx',
        positions: 'posições',
        trigger: 'gatilho',
        alignLeft: 'alinhamento: à esquerda',
        alignCenter: 'alinhamento: ao centro',
        manyPages: 'muitas páginas',
        minimal: 'mínimo',
        indeterminate: 'indeterminado',
        noResize: 'sem redimensionamento',
        resizing: 'redimensionando',
        disabledAndReadonly: 'desativado e somente leitura',
        password: 'senha',
        autocompleteSection: 'autocompletar',
        twoOptions: 'duas opções',
        fullWidth: 'largura total',
        minLengthMaxResults: 'comprimento mín e máx de resultados',
        removable: 'removível',
        minMaxLabels: 'rótulos mín/máx',
        underline: 'sublinhado',
        filled: 'preenchido',
        rect: 'retângulo',
        inlineLayout: 'layout em linha',
        noResults: 'sem resultados',
        titleOnly: 'somente título',
        iconTrigger: 'gatilho de ícone',
        placements: 'posicionamentos',
        canvasSizes: 'tamanhos de canvas',
        cappedChipCount: 'número de chips limitado',
        customIcon: 'ícone personalizado',
        customIconAndColor: 'ícone e cor personalizados',
        halfSteps: 'meios-passos',
        customLabel: 'rótulo personalizado',
        customSize: 'tamanho personalizado',
        linearFlow: 'fluxo linear',
        manyLevels: 'muitos níveis',
        notAnimated: 'sem animação',
        numberOfStars: 'número de estrelas',
        minimumOne: 'mínimo de 1 estrela',
        outputFormats: 'formatos de saída',
        quarterHourSteps: 'passos de quinze minutos',
        readonly: 'somente leitura',
        singleFile: 'arquivo único',
        stepped: 'em etapas',
        sundayStart: 'início no domingo',
        twelveHourFormat: 'formato de 12 horas',
        twoActions: 'duas ações',
        withCompletedSteps: 'com etapas concluídas',
        withConstraints: 'com restrições',
        withInitialValue: 'com valor inicial',
        withMaxlength: 'com comprimento máximo',
        withMaxHeight: 'com altura máxima',
        withMinMaxLabels: 'com rótulos mín/máx',
        withOptionalStep: 'com etapa opcional',
        withSeconds: 'com segundos',
        withSelection: 'com seleção',
        withoutAlpha: 'sem alfa',
        withoutSearch: 'sem pesquisa',
        withoutSelectAll: 'sem selecionar-tudo',
        wrapping: 'quebra de linha',
      },
      common: {
        small: 'Pequeno',
        medium: 'Médio',
        large: 'Grande',
        cancel: 'Cancelar',
        save: 'Salvar',
        close: 'Fechar',
        confirm: 'Confirmar',
        disabled: 'Desativado',
        defaultLabel: 'Padrão',
        successLabel: 'Sucesso',
        warningLabel: 'Aviso',
        errorLabel: 'Erro',
        infoLabel: 'Informação',
      },
      demos: {
        accordion: {
          whatLabel: 'O que é o @eagami/ui?',
          whatBody:
            'Uma biblioteca de componentes Angular leve e acessível, construída sobre propriedades personalizadas de CSS.',
          installLabel: 'Como faço para instalá-lo?',
          installBody:
            'Execute pnpm add @eagami/ui e adicione a folha de estilo global ao seu angular.json.',
          themeLabel: 'Posso personalizar o tema?',
          themeBody:
            'Sim, sobrescreva qualquer propriedade personalizada de CSS em :root ou limite as sobrescritas a componentes individuais.',
          sectionOneLabel: 'Seção Um',
          sectionOneBody:
            'Várias seções podem ficar abertas ao mesmo tempo no modo múltiplo.',
          sectionTwoLabel: 'Seção Dois',
          sectionTwoBody: 'Conteúdo da seção dois.',
          disabledSectionLabel: 'Seção Desativada',
          disabledSectionBody: 'Este conteúdo não está acessível.',
        },
        alert: {
          defaultText: 'Este é um alerta padrão',
          successText: 'Suas alterações foram salvas',
          warningText: 'Seu período de avaliação expira em 3 dias',
          errorText: 'Algo deu errado, tente novamente',
          infoText: 'Uma nova versão está disponível',
          dismissibleText: 'Este alerta pode ser dispensado',
          tooltipSuppressed:
            'As dicas de ferramenta são suprimidas em dispositivos de toque para evitar o comportamento de hover persistente. Veja esta seção em um dispositivo com mouse para ver as demonstrações em ação.',
        },
        autocomplete: {
          startTyping: 'Comece a digitar…',
          hintText: 'Comece a digitar para ver correspondências',
          errorText: 'Selecione uma raça de cachorro',
          breedPlaceholder: 'Raça de cachorro…',
          minMaxLabel: 'Mín 2 caracteres, máx 3 resultados',
          minMaxPlaceholder: 'Digite ao menos 2 caracteres…',
        },
        avatarEditor: {
          result: 'Resultado:',
        },
        badge: {
          successText: 'Ativo',
          warningText: 'Pendente',
          newText: 'Novo',
        },
        button: {
          primary: 'Primário',
          secondary: 'Secundário',
          ghost: 'Fantasma',
          danger: 'Perigo',
          toggleLoading: 'Alternar carregamento',
          fullWidth: 'Largura total',
          clickedToast: 'Botão pressionado!',
        },
        card: {
          elevatedHeader: 'Elevado',
          elevatedBody: 'Cartão com elevação por sombra.',
          outlinedHeader: 'Com contorno',
          outlinedBody: 'Cartão com contorno de borda.',
          filledHeader: 'Preenchido',
          filledBody: 'Cartão com fundo sutil.',
          cardTitleHeader: 'Título do Cartão',
          cardWithFooterBody: 'Este cartão tem cabeçalho, corpo e rodapé com ações.',
        },
        checkbox: {
          acceptTermsAndConditions: 'Aceitar termos e condições',
          disabledChecked: 'Desativado marcado',
          indeterminate: 'Indeterminado',
          iAgreeToTerms: 'Concordo com os termos',
          subscribeToUpdates: 'Inscrever-se para atualizações',
          subscribeHint: 'Um resumo mensal é enviado, sem spam',
          acceptTermsLabel: 'Aceitar termos',
          acceptTermsError: 'Os termos devem ser aceitos para continuar',
        },
        codeInput: {
          verificationCodeLabel: 'Código de verificação',
          verificationCodeHint: 'Verifique seu e-mail para o código de 6 dígitos',
          verificationCodeError: 'Código de verificação inválido',
          pinLabel: 'PIN',
          pinHint: 'Insira seu PIN de 4 dígitos',
        },
        colorPicker: {
          brandLabel: 'Cor da marca',
          hintBrandColor: 'Usada como a cor primária da marca',
          errorRequired: 'Este campo é obrigatório',
          hexLabel: 'Formato HEX',
          rgbLabel: 'Formato RGB',
          hslLabel: 'Formato HSL',
          noAlphaHeading: 'Somente opaco',
          opaqueOnlyLabel: 'Cor sólida',
        },
        dataTable: {
          tableColumnId: 'ID',
          tableColumnFirstName: 'Nome',
          tableColumnLastName: 'Sobrenome',
          tableColumnAdmin: 'Administrador',
          tableColumnPosts: 'Publicações',
        },
        datePicker: {
          appointmentLabel: 'Compromisso',
          pickDatePlaceholder: 'Escolha uma data…',
          hintAnyFutureDate: 'Selecione qualquer data futura',
          errorRequired: 'Este campo é obrigatório',
          shortLabel: 'Curto',
          mediumLabel: 'Médio',
          longLabel: 'Longo',
          withinNextWeeksLabel: 'Nas próximas 3 semanas',
          withinNextWeeksHint: '±1 semana / +3 semanas a partir de hoje',
        },
        dialog: {
          openButton: 'Abrir Diálogo',
          title: 'Título do Diálogo',
          body: 'Este é o corpo do diálogo. Ele suporta qualquer conteúdo, incluindo formulários, texto e outros componentes.',
        },
        divider: {
          orLabel: 'ou',
          sectionLabel: 'Seção',
          leftLabel: 'Esquerda',
          rightLabel: 'Direita',
        },
        drawer: {
          openButton: 'Abrir Gaveta',
          rightButton: 'Direita',
          leftButton: 'Esquerda',
          topButton: 'Topo',
          bottomButton: 'Base',
          rightTitle: 'Gaveta à Direita',
          rightBody: 'Desliza pela borda direita, útil para painéis de detalhes.',
          leftTitle: 'Gaveta à Esquerda',
          leftBody: 'Desliza pela esquerda, útil para menus de navegação.',
          topTitle: 'Gaveta Superior',
          topBody: 'Desce pelo topo, útil para notificações.',
          bottomTitle: 'Gaveta Inferior',
          bottomBody: 'Sobe pela base, comum em dispositivos móveis para folhas de ação.',
        },
        dropdown: {
          fruitLabel: 'Fruta',
          fruitPlaceholder: 'Selecione uma fruta…',
          hintFavourite: 'Escolha sua favorita',
          errorRequired: 'Este campo é obrigatório',
          selectPlaceholder: 'Selecione…',
        },
        emptyState: {
          noItemsTitle: 'Nenhum item ainda',
          noItemsDescription: 'Comece criando seu primeiro item.',
          createItem: 'Criar item',
          noResultsTitle: 'Nenhum resultado encontrado',
          noResultsDescription:
            'Tente ajustar sua pesquisa ou filtro para encontrar o que você procura.',
          clearFilters: 'Limpar filtros',
          nothingHereTitle: 'Nada para ver aqui',
        },
        fileUploader: {
          attachmentsLabel: 'Anexos',
          imagesLabel: 'Enviar imagens',
          imagesHint: 'PNG ou JPEG, até 2 MB cada, máx 4 arquivos',
          resumeLabel: 'Enviar currículo',
          customIconLabel: 'Anexar arquivos',
          withHintHint: 'Até 10 MB por arquivo',
          withErrorText: 'É necessária ao menos uma imagem',
        },
        formField: {
          emailPlaceholder: 'you@example.com',
        },
        input: {
          defaultLabel: 'Padrão',
          enterTextPlaceholder: 'Digite o texto…',
          hintGuidance: 'Orientações úteis vão aqui',
          errorRequired: 'Este campo é obrigatório',
          readonlyLabel: 'Somente leitura',
          readonlyValue: 'Valor somente leitura',
          passwordLabel: 'Senha',
          passwordPlaceholder: 'Digite sua senha…',
          passwordNoToggleLabel: 'Senha (alternância oculta)',
          passwordNoTogglePlaceholder: 'Sem alternância de visibilidade',
          emailLabel: 'E-mail',
          emailPlaceholder: 'voce@exemplo.com',
        },
        menu: {
          openButton: 'Abrir menu',
          edit: 'Editar',
          duplicate: 'Duplicar',
          archive: 'Arquivar',
          delete: 'Excluir',
          file: 'Arquivo',
          moreOptionsLabel: 'Mais opções',
          view: 'Visualizar',
          rename: 'Renomear',
          newItem: 'Novo',
          open: 'Abrir',
          saveUnavailable: 'Salvar (indisponível)',
          saveAs: 'Salvar Como',
        },
        popover: {
          openLabel: 'Abrir popover',
          basicContent:
            'Uma superfície flutuante ancorada ao seu gatilho. Use-a como bloco de construção para menus, dropdowns e sobreposições personalizadas.',
          placementTopLabel: 'top',
          placementTopStartLabel: 'top-start',
          placementTopEndLabel: 'top-end',
          placementBottomLabel: 'bottom',
          placementBottomStartLabel: 'bottom-start',
          placementBottomEndLabel: 'bottom-end',
          placementLeftLabel: 'left',
          placementRightLabel: 'right',
          placementTopContent: 'Centralizado acima do gatilho',
          placementTopStartContent: 'Acima do gatilho, alinhado à sua borda esquerda',
          placementTopEndContent: 'Acima do gatilho, alinhado à sua borda direita',
          placementBottomContent: 'Centralizado abaixo do gatilho',
          placementBottomStartContent: 'Abaixo do gatilho, alinhado à sua borda esquerda',
          placementBottomEndContent: 'Abaixo do gatilho, alinhado à sua borda direita',
          placementLeftContent: 'Centralizado à esquerda do gatilho',
          placementRightContent: 'Centralizado à direita do gatilho',
        },
        progressBar: {
          processing: 'Processando…',
        },
        radio: {
          appleLabel: 'Maçã',
          bananaLabel: 'Banana',
          cherryLabel: 'Cereja',
          optionALabel: 'Opção A',
          optionBLabel: 'Opção B',
          subscriptionPlanLabel: 'Plano de assinatura',
          freeLabel: 'Gratuito',
          proLabel: 'Pro',
          enterpriseLabel: 'Empresa',
          deliverySpeedLabel: 'Velocidade de entrega',
          deliverySpeedHint: 'Escolha a rapidez que você deseja',
          standardLabel: 'Padrão',
          expressLabel: 'Expressa',
          accountTypeLabel: 'Tipo de conta',
          accountTypeError: 'Escolha um tipo de conta',
          personalLabel: 'Pessoal',
          businessLabel: 'Empresarial',
        },
        rating: {
          experienceLabel: 'Avalie sua experiência',
          halfStepsLabel: 'Avaliação em meios-passos',
          halfStepsHint:
            'Clique na metade esquerda ou direita de uma estrela para definir incrementos de 0,5.',
          readonlyLabel: 'Avaliação média',
          withHintHint: 'Toque em uma estrela para definir a avaliação',
          withErrorText: 'Uma avaliação é obrigatória',
          numberOfStarsLabel: 'Avalie',
          customIconLabel: 'O quanto você ama isso?',
        },
        segmented: {
          viewLabel: 'Visualização',
          themeLabel: 'Tema',
          themeHint: 'Afeta todo o aplicativo',
          layoutLabel: 'Layout',
          layoutError: 'A seleção de layout é obrigatória',
          viewOptionList: 'Lista',
          viewOptionGrid: 'Grade',
          viewOptionKanban: 'Kanban',
          themeOptionLight: 'Claro',
          themeOptionDark: 'Escuro',
        },
        slider: {
          volumeLabel: 'Volume',
          brightnessLabel: 'Brilho',
          withHintLabel: 'Com dica',
          sliderHint: 'Arraste o controle ou use as setas para ajustar',
          withErrorLabel: 'Com erro',
          sliderError: 'Escolha um valor acima de 50',
        },
        switch: {
          enableNotificationsLabel: 'Ativar notificações',
          disabledOnLabel: 'Desativado ligado',
          confirmConsentLabel: 'Confirmar consentimento',
          marketingEmailsLabel: 'E-mails de marketing',
          marketingEmailsHint: 'Cancele a inscrição a qualquer momento',
          twoFactorAuthLabel: 'Autenticação de dois fatores',
          twoFactorAuthError: 'A autenticação de dois fatores deve estar ativada',
        },
        tabs: {
          account: 'Conta',
          accountContent: 'Conteúdo das configurações da conta',
          security: 'Segurança',
          securityContent: 'Conteúdo das configurações de segurança',
          notifications: 'Notificações',
          notificationsContent: 'Preferências de notificação',
          overview: 'Visão geral',
          overviewContent: 'Conteúdo da visão geral',
          analytics: 'Análises',
          analyticsContent: 'Conteúdo de análises',
          reports: 'Relatórios',
          reportsContent: 'Conteúdo de relatórios',
          general: 'Geral',
          generalContent: 'Configurações gerais',
          billing: 'Faturamento',
          billingContent: 'Detalhes de faturamento',
          admin: 'Administração',
          adminContent: 'Painel de administração',
        },
        tag: {
          disabledSuccess: 'Sucesso desativado',
        },
        textarea: {
          messageLabel: 'Mensagem',
          messagePlaceholder: 'Digite sua mensagem…',
          hintMaxCharacters: 'Máximo de 500 caracteres',
          errorRequired: 'Este campo é obrigatório',
          fixedSizeLabel: 'Tamanho fixo',
          fixedSizePlaceholder: 'Não pode ser redimensionado',
          readonlyLabel: 'Somente leitura',
          readonlyValue: 'Conteúdo somente leitura',
        },
        toast: {
          message: variant => {
            const article = variant === 'error' || variant === 'info' ? 'uma' : 'um';
            return `Este é ${article} toast de ${variant}`;
          },
        },
        tooltip: {
          triggerLabel: '(passe o mouse sobre mim)',
          templateTriggerLabel: '(passe o cursor para uma dica com template)',
          templateTipStatus: 'Online agora',
          topLabel: 'Topo',
          topTooltip: 'Dica no topo',
          bottomLabel: 'Base',
          bottomTooltip: 'Dica na base',
          leftLabel: 'Esquerda',
          leftTooltip: 'Dica à esquerda',
          rightLabel: 'Direita',
          rightTooltip: 'Dica à direita',
        },
        transferList: {
          sourceLabel: 'Disponíveis',
          targetLabel: 'Selecionados',
          roleAdmin: 'Administrador',
          roleEditor: 'Editor',
          roleViewer: 'Visualizador',
          roleGuest: 'Convidado',
          roleBilling: 'Faturamento',
          roleOwner: 'Proprietário',
        },
        virtualList: {
          row: 'Linha',
          detail: n => `Registro gerado nº ${n}`,
          scrollPosition: (first, total) =>
            `Exibindo linha ${first.toLocaleString('pt-BR')} de ${total.toLocaleString('pt-BR')}`,
        },
        commandPalette: {
          hint: 'Pressione Ctrl + K (ou Cmd + K) para abrir a paleta de comandos em qualquer lugar desta página.',
          openButton: 'Abrir paleta de comandos',
          fileGroup: 'Arquivo',
          editGroup: 'Editar',
          newFile: 'Novo arquivo',
          openFile: 'Abrir arquivo',
          save: 'Salvar',
          find: 'Localizar',
          findKeyword: 'pesquisar',
          replace: 'Substituir',
          undo: 'Desfazer',
          toggleTheme: 'Alternar tema',
          toggleThemeDescription: 'Alternar entre os modos claro e escuro',
          lockWorkspace: 'Bloquear área de trabalho',
          lockWorkspaceDescription: 'Atualmente desativado (recurso em beta)',
          executedToast: label => `Executado: ${label}`,
        },
        avatarEditorActions: {
          avatarUpdatedToast: 'Avatar atualizado',
        },
      },
      playground: {
        controls: 'Controles',
        reset: 'Redefinir',
        code: 'Código',
        apiReference: 'Referência da API',
        inputs: 'Entradas',
        outputs: 'Saídas',
        methods: 'Métodos',
        colName: 'Nome',
        colType: 'Tipo',
        colDefault: 'Padrão',
        colDescription: 'Descrição',
        errorMessagesDescription:
          'Substitui a mensagem de validação por chave de erro em um controle de formulário vinculado; chaves não definidas usam o padrão localizado.',
        ariaLabelDescription:
          'Nome acessível anunciado pela tecnologia assistiva quando o componente não renderiza um rótulo visível.',
        triggerErrorLabel: 'Provocar erro',
        requiredBadge: 'obrigatório',
        twoWayBadge: 'bidirecional',
        rangeHint: { between: 'a', min: 'Mín', max: 'Máx' },
        knobLabels: {
          timeline: { orientation: 'Orientação', align: 'Alinhamento', size: 'Tamanho' },
          tooltip: {
            eaTooltip: 'Conteúdo da Dica',
          },
          input: {
            label: 'Rótulo',
            placeholder: 'Espaço reservado',
            size: 'Tamanho',
            type: 'Tipo',
            disabled: 'Desativado',
            readonly: 'Somente leitura',
            required: 'Obrigatório',
            autofocus: 'Foco automático',
            showPasswordToggle: 'Mostrar alternância de senha',
            clearable: 'Limpável',
            autocomplete: 'Autocompletar',
          },
          'number-input': {
            allowNegative: 'Permitir negativos',
            label: 'Rótulo',
            placeholder: 'Espaço reservado',
            size: 'Tamanho',
            min: 'Mínimo',
            max: 'Máximo',
            step: 'Passo',
            disabled: 'Desativado',
            readonly: 'Somente leitura',
            required: 'Obrigatório',
          },
          'form-field': {
            size: 'Tamanho',
            label: 'Rótulo',
            hint: 'Dica',
            required: 'Obrigatório',
          },
          alert: {
            variant: 'Variante',
            dismissible: 'Dispensável',
            size: 'Tamanho',
            icon: 'Ícone (sobrescrita)',
          },
          avatar: {
            size: 'Tamanho',
            shape: 'Forma',
            src: 'Origem da imagem',
            initials: 'Iniciais',
            alt: 'Texto alternativo',
          },
          badge: {
            variant: 'Variante',
            size: 'Tamanho',
            shape: 'Forma',
          },
          button: {
            variant: 'Variante',
            size: 'Tamanho',
            type: 'Tipo',
            disabled: 'Desativado',
            loading: 'Carregando',
            fullWidth: 'Largura total',
          },
          card: {
            variant: 'Variante',
            padding: 'Preenchimento',
            headerAlign: 'Alinhamento do cabeçalho',
            fullWidth: 'Largura total',
            headerDivider: 'Divisor de cabeçalho',
          },
          checkbox: {
            label: 'Rótulo',
            count: 'Contagem',
            size: 'Tamanho',
            disabled: 'Desativado',
            required: 'Obrigatório',
            indeterminate: 'Indeterminado',
          },
          'code-input': {
            size: 'Tamanho',
            length: 'Comprimento',
            label: 'Rótulo',
            placeholder: 'Espaço reservado',
            disabled: 'Desativado',
            readonly: 'Somente leitura',
            required: 'Obrigatório',
          },
          'color-picker': {
            label: 'Rótulo',
            placeholder: 'Espaço reservado',
            size: 'Tamanho',
            format: 'Formato',
            showAlpha: 'Mostrar alfa',
            clearable: 'Limpável',
            disabled: 'Desativado',
            readonly: 'Somente leitura',
            required: 'Obrigatório',
          },
          divider: {
            orientation: 'Orientação',
            label: 'Rótulo',
          },
          'eagami-wordmark': {
            variant: 'Variante',
            layout: 'Layout',
            size: 'Tamanho (px)',
            linked: 'Com link',
          },
          'empty-state': {
            size: 'Tamanho',
            headingLevel: 'Nível de título',
            title: 'Título',
            description: 'Descrição',
          },
          paginator: {
            align: 'Alinhamento',
            showPageSizeSelector: 'Mostrar seletor de tamanho de página',
            showRangeLabel: 'Mostrar rótulo de intervalo',
            disabled: 'Desativado',
            totalItems: 'Total de itens',
          },
          'progress-bar': {
            variant: 'Variante',
            size: 'Tamanho',
            value: 'Valor',
            max: 'Máx',
            buffer: 'Buffer',
            showPercentage: 'Mostrar porcentagem',
            indeterminate: 'Indeterminado',
            label: 'Rótulo',
          },
          radio: {
            label: 'Rótulo',
            disabled: 'Desativado',
          },
          'range-slider': {
            label: 'Rótulo',
            hint: 'Dica',
            errorMsg: 'Mensagem de erro',
            min: 'Mínimo',
            max: 'Máximo',
            step: 'Passo',
            size: 'Tamanho',
            showValue: 'Mostrar valor',
            showMinMaxLabels: 'Mostrar rótulos mín/máx',
            disabled: 'Desativado',
            required: 'Obrigatório',
          },
          rating: {
            label: 'Rótulo',
            size: 'Tamanho',
            min: 'Mínimo',
            max: 'Máximo',
            allowHalf: 'Permitir meios-passos',
            readonly: 'Somente leitura',
            disabled: 'Desativado',
            required: 'Obrigatório',
            clearable: 'Limpável',
            iconClass: 'Ícone',
          },
          skeleton: {
            variant: 'Variante',
            animated: 'Animado',
            width: 'Largura',
            height: 'Altura',
          },
          slider: {
            size: 'Tamanho',
            min: 'Mín',
            max: 'Máx',
            step: 'Passo',
            showValue: 'Mostrar valor',
            showMinMaxLabels: 'Mostrar rótulos mín/máx',
            disabled: 'Desativado',
            required: 'Obrigatório',
            hasError: 'Estado de erro',
            label: 'Rótulo',
          },
          spinner: {
            size: 'Tamanho',
            label: 'Rótulo',
          },
          switch: {
            label: 'Rótulo',
            size: 'Tamanho',
            disabled: 'Desativado',
            required: 'Obrigatório',
          },
          tag: {
            variant: 'Variante',
            size: 'Tamanho',
            removable: 'Removível',
            disabled: 'Desativado',
            removeLabel: 'Rótulo de remoção',
          },
          textarea: {
            label: 'Rótulo',
            placeholder: 'Espaço reservado',
            size: 'Tamanho',
            resize: 'Redimensionar',
            maxlength: 'Comprimento máximo (caracteres)',
            minHeight: 'Altura mínima (px)',
            maxHeight: 'Altura máxima (px)',
            disabled: 'Desativado',
            readonly: 'Somente leitura',
            required: 'Obrigatório',
          },
        },
        knobNotes: { accordion: { headingLevel: '(apenas semântico)' } },

        descriptions: {
          timeline: {
            items: 'Os eventos a serem exibidos, em ordem.',
            orientation: 'Direção em que a linha do tempo flui.',
            align:
              'Posicionamento do conteúdo em relação à linha; alternate aplica-se apenas a linhas do tempo verticais.',
            size: 'Tamanho visual da linha do tempo.',
          },
          toast: {
            size: 'Tamanho visual aplicado a cada toast da pilha.',
            position:
              'Canto ou borda da janela de visualização onde a pilha de toasts é fixada.',
            clearable: 'Mostra um botão de dispensar em cada toast.',
          },
          input: {
            label: 'Rótulo de texto renderizado acima do campo.',
            type: 'Tipo de input nativo (password adiciona uma alternância integrada de mostrar/ocultar).',
            placeholder: 'Placeholder exibido enquanto o campo está vazio.',
            size: 'Tamanho visual do campo.',
            hint: 'Texto auxiliar exibido abaixo do campo, oculto enquanto um erro é exibido.',
            errorMsg:
              'Mensagem de erro exibida abaixo do campo, substituindo a dica e marcando o campo como inválido.',
            disabled: 'Desativa o campo.',
            readonly: 'Renderiza o campo como somente leitura.',
            required: 'Marca o campo como obrigatório.',
            autocomplete: 'Valor para o atributo autocomplete nativo.',
            list: 'id de um <datalist> a associar para sugestões nativas.',
            autofocus: 'Foca o campo uma vez, após a primeira renderização.',
            showPasswordToggle: 'Mostra a alternância de revelação para campos de senha.',
            clearable: 'Mostra um botão de limpar enquanto o campo tem um valor.',
            id: 'id aplicado ao input nativo e ao for do rótulo, gerado automaticamente quando omitido.',
            value:
              'Valor atual do campo, vinculável de forma bidirecional via [(value)].',
            blurred: 'Dispara quando o campo perde o foco.',
            focused: 'Dispara quando o campo recebe o foco.',
            clear: 'Limpa o valor atual e restaura o foco ao campo.',
            focus: 'Move o foco do teclado para o campo nativo subjacente.',
            togglePasswordVisibility:
              'Alterna o estado de revelação da senha para inputs type="password".',
            icon: 'Componente de ícone inicial renderizado antes do texto.',
            max: 'Valor máximo para type="number"; o valor é limitado a ele ao perder o foco.',
            maxLength:
              'Número máximo de caracteres; aplicado a type="number", onde o maxlength nativo é ignorado.',
            min: 'Valor mínimo para type="number"; o valor é limitado a ele ao perder o foco.',
            minLength:
              'Número mínimo de caracteres, passado como o atributo minlength nativo.',
            step: 'Incremento de passo para inputs type="number".',
            clampToBounds:
              'Limita um valor numérico ao intervalo mín/máx configurado quando a edição termina.',
          },
          'number-input': {
            allowNegative:
              'Se valores negativos são permitidos; quando false, o valor tem piso 0.',
            label: 'Rótulo de texto renderizado acima do campo.',
            placeholder: 'Placeholder exibido enquanto o campo está vazio.',
            size: 'Tamanho visual do campo.',
            hint: 'Texto auxiliar exibido abaixo do campo, oculto enquanto um erro é exibido.',
            errorMsg:
              'Mensagem de erro exibida abaixo do campo, substituindo a dica e marcando o campo como inválido.',
            disabled: 'Desativa o campo.',
            readonly: 'Renderiza o campo como somente leitura.',
            required: 'Marca o campo como obrigatório.',
            min: 'Valor mínimo; valores digitados são limitados a ele ao perder o foco, e os botões de passo o respeitam.',
            max: 'Valor máximo; valores digitados são limitados a ele ao perder o foco, e os botões de passo o respeitam.',
            step: 'Quantidade que cada passo (tecla de seta ou botão de passo) adiciona ou subtrai.',
            id: 'id aplicado ao input nativo e ao for do rótulo, gerado automaticamente quando omitido.',
            value:
              'Valor atual do campo; null quando vazio, vinculável de forma bidirecional via [(value)].',
            changed: 'Dispara com o novo valor sempre que ele muda.',
            focused: 'Dispara quando o campo recebe o foco.',
            blurred: 'Dispara quando o campo perde o foco.',
            focus: 'Move o foco do teclado para o campo nativo subjacente.',
          },
          accordion: {
            size: 'Tamanho visual do acordeão; cada item o herda.',
            multi: 'Permite que vários itens permaneçam expandidos ao mesmo tempo.',
            headingLevel:
              'Nível de título (1-6) aplicado a cada cabeçalho de item, de modo que o accordion se encaixe no esquema da página.',
          },
          alert: {
            dismissible:
              'Mostra um botão de fechar que permite ao usuário dispensar o alerta.',
            variant:
              'Esquema de cores semântico que governa o ícone e a paleta do alerta.',
            visible:
              'Se o alerta é exibido, vinculável de forma bidirecional via [(visible)].',
            dismissed:
              'Dispara quando o usuário dispensa o alerta pelo seu botão de fechar.',
            dismiss: 'Oculta o alerta e emite o evento dismissed.',
            size: 'Escala o texto, o ícone e o espaçamento em conjunto.',
            icon: 'Sobrescreve o ícone de status padrão da variante por qualquer componente de ícone.',
          },
          avatar: {
            src: 'URL da imagem a exibir; recorre às iniciais e, em seguida, a um ícone genérico de usuário.',
            alt: 'Texto alternativo para a imagem do avatar.',
            initials: 'Iniciais exibidas quando nenhuma origem de imagem é fornecida.',
            size: 'Predefinição de diâmetro do avatar.',
            shape: 'Contorno do avatar: redondo ou quadrado arredondado.',
          },
          badge: {
            variant: 'Esquema de cores semântico do badge.',
            size: 'Tamanho visual do badge.',
            shape:
              'Forma externa do badge (pill abraça o conteúdo, pin é renderizado como um círculo para caracteres únicos).',
          },
          button: {
            variant: 'Estilo visual do botão, que governa sua cor e ênfase.',
            size: 'Tamanho visual do botão.',
            type: 'Atributo type nativo aplicado ao elemento de botão subjacente.',
            disabled: 'Desativa o botão e suprime os eventos de clique.',
            loading:
              'Troca o rótulo por um spinner enquanto preserva a largura renderizada.',
            fullWidth: 'Estica o botão para preencher a largura de seu contêiner.',
            ariaLabel:
              'Rótulo acessível para o botão quando seu conteúdo não é descritivo o suficiente.',
            ariaCurrent:
              'Valor para o atributo aria-current nativo, marcando o botão como o item atual de um conjunto.',
            clicked:
              'Dispara quando o botão é ativado, suprimido enquanto desativado ou carregando.',
            icon: 'Componente de ícone opcional renderizado à esquerda do rótulo.',
          },
          card: {
            variant: 'Estilo visual da superfície do cartão.',
            padding:
              'Predefinição de preenchimento aplicada à área de conteúdo do cartão.',
            headerAlign: 'Alinhamento horizontal do conteúdo do cabeçalho.',
            fullWidth: 'Estica o cartão para preencher a largura disponível.',
            headerDivider: 'Mostra um divisor entre o cabeçalho e o corpo.',
          },
          checkbox: {
            ariaLabel:
              'Nome acessível para a caixa de seleção quando nenhum rótulo visível é renderizado.',
            checked:
              'Estado marcado atual, vinculável de forma bidirecional via [(checked)].',
            count: 'Valor suplementar exibido esmaecido logo após o rótulo.',
            disabled: 'Desativa a caixa de seleção.',
            errorMsg:
              'Mensagem de erro exibida abaixo do campo, substituindo a dica e marcando o campo como inválido.',
            hint: 'Texto auxiliar exibido abaixo do campo, oculto enquanto um erro é exibido.',
            id: 'id aplicado ao input nativo e ao for do rótulo, gerado automaticamente quando omitido.',
            indeterminate:
              'Renderiza a caixa de seleção em um estado visualmente indeterminado.',
            label: 'Rótulo de texto renderizado ao lado da caixa de seleção.',
            required: 'Marca a caixa de seleção como obrigatória.',
            size: 'Tamanho visual da caixa de seleção.',
            changed:
              'Dispara com o novo estado marcado sempre que o usuário alterna a caixa de seleção.',
          },
          'code-input': {
            disabled: 'Desativa todas as células de dígito.',
            errorMsg:
              'Mensagem de erro exibida abaixo do campo, substituindo a dica e marcando o campo como inválido.',
            hint: 'Texto auxiliar exibido abaixo do campo, oculto enquanto um erro é exibido.',
            id: 'id aplicado às células de dígito e ao for do rótulo, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado acima do campo.',
            length: 'Número de células de dígito que compõem o código.',
            placeholder: 'Texto de placeholder distribuído um caractere por célula.',
            readonly: 'Renderiza o campo como somente leitura.',
            required: 'Marca o campo como obrigatório.',
            size: 'Tamanho visual de cada célula de dígito.',
            value:
              'Valor de código atual, vinculável de forma bidirecional via [(value)].',
            completed: 'Dispara com o código completo assim que cada dígito é inserido.',
            focus:
              'Move o foco do teclado para o próximo dígito vazio (ou o último quando completo).',
            allowAllChars:
              'Permite qualquer caractere sem espaço em branco; quando desativado, somente dígitos são aceitos.',
          },
          'color-picker': {
            disabled: 'Desativa o campo.',
            errorMsg:
              'Mensagem de erro exibida abaixo do campo, substituindo a dica e marcando o campo como inválido.',
            format: 'Formato de saída do valor de cor emitido (hex, rgb ou hsl).',
            hint: 'Texto auxiliar exibido abaixo do campo, oculto enquanto um erro é exibido.',
            id: 'id aplicado ao gatilho e ao for do rótulo, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado acima do campo.',
            placeholder:
              'Placeholder exibido no gatilho enquanto nenhuma cor é selecionada.',
            presets:
              'Amostras predefinidas exibidas na parte inferior do popover; passe um array vazio para ocultá-las.',
            readonly:
              'Renderiza o campo como somente leitura, impedindo a abertura do popover.',
            required: 'Marca o campo como obrigatório.',
            showAlpha: 'Mostra o controle de alfa e inclui o alfa no valor emitido.',
            clearable: 'Se o botão de limpar é exibido quando há um valor definido.',
            size: 'Tamanho visual do gatilho do seletor.',
            value: 'String de cor atual, vinculável de forma bidirecional via [(value)].',
            changed: 'Dispara com a nova string de cor sempre que a seleção muda.',
            cycleInputMode:
              'Alterna a linha de entrada do popover entre string hex e canais RGB.',
            hasEyeDropper: 'Retorna se o navegador suporta a API EyeDropper.',
            onHexInput:
              'Aplica o texto hex digitado à cor atual conforme o usuário edita.',
            onPopoverCloseRequested:
              'Fecha o popover quando o usuário clica fora do seletor.',
          },
          divider: {
            label: 'Rótulo centralizado opcional renderizado dentro da régua do divisor.',
            orientation: 'Orientação em que a régua do divisor corre.',
            thick: 'Renderiza uma régua mais pesada.',
          },
          'eagami-wordmark': {
            variant:
              'Variante de conteúdo: default é o wordmark puro, byline adiciona a linha projetado-por, tagline adiciona o slogan.',
            layout: 'Organiza o wordmark empilhado em várias linhas ou em linha única.',
            size: 'Tamanho da fonte em px do texto da marca; o restante do wordmark escala a partir dele.',
            linked:
              'Renderiza o wordmark como link para eagami.com; desative para incorporá-lo em um link próprio ou contexto estático.',
          },
          'empty-state': {
            title: 'Texto de título exibido acima da descrição.',
            description: 'Texto de apoio exibido abaixo do título.',
            size: 'Tamanho visual do bloco de estado vazio.',
            headingLevel:
              'Nível de título usado para o título de modo que se encaixe no esquema do documento ao redor.',
            bordered: 'Renderiza um quadro tracejado ao redor do bloco.',
            icon: 'Componente de ícone opcional renderizado na área de mídia acima do título.',
          },
          paginator: {
            groupThousands:
              'Agrupa os milhares com vírgulas no intervalo e nos números de página.',
            size: 'Tamanho visual do paginador e seus controles.',
            align:
              'Alinhamento horizontal dos controles do paginador dentro de seu contêiner.',
            disabled: 'Desativa todos os controles do paginador.',
            page: 'Número de página atual, vinculável de forma bidirecional via [(page)].',
            pageSize:
              'Número de itens exibidos por página, vinculável de forma bidirecional via [(pageSize)].',
            pageSizeOptions:
              'Tamanhos de página selecionáveis oferecidos no seletor de tamanho de página.',
            showPageSizeSelector: 'Mostra o controle de seletor de tamanho de página.',
            showRangeLabel: 'Mostra o rótulo que descreve o intervalo de itens visíveis.',
            totalItems:
              'Número total de itens usado para calcular a contagem de páginas.',
            changed:
              'Dispara quando o usuário altera a página atual ou o tamanho da página.',
            goToPage: 'Navega para a página informada, limitada ao intervalo válido.',
            nextPage: 'Navega para a próxima página, se houver.',
            prevPage: 'Navega para a página anterior, se houver.',
          },
          'progress-bar': {
            variant: 'Variante de cor da barra.',
            size: 'Espessura visual da barra.',
            value: 'Valor de progresso atual.',
            max: 'Valor em que a barra fica cheia.',
            buffer: 'Posição em buffer à frente do valor, exibida na cor secundária.',
            showPercentage: 'Mostra a porcentagem atual ao lado da barra.',
            indeterminate:
              'Renderiza uma animação em loop para progresso de duração desconhecida.',
            label: 'Rótulo de texto renderizado acima da barra.',
          },
          radio: {
            disabled: 'Desativa esta opção.',
            id: 'id aplicado ao input de rádio nativo e ao for do rótulo, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado ao lado do rádio.',
            value: 'Valor que esta opção contribui ao seu grupo pai quando selecionada.',
          },
          'range-slider': {
            ariaLabelHigh:
              'Rótulo acessível para o controle alto (final), recorrendo ao rótulo do campo quando omitido.',
            ariaLabelLow:
              'Rótulo acessível para o controle baixo (inicial), recorrendo ao rótulo do campo quando omitido.',
            disabled: 'Desativa o controle deslizante.',
            errorMsg:
              'Mensagem de erro exibida abaixo do controle, substituindo a dica e marcando o campo como inválido.',
            formatValue: 'Formatador aplicado a cada valor antes de ser exibido.',
            hint: 'Texto auxiliar exibido abaixo do controle, oculto enquanto um erro é exibido.',
            id: 'id aplicado ao controle deslizante, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado acima do controle deslizante.',
            max: 'Valor mais alto que qualquer controle pode alcançar.',
            min: 'Valor mais baixo que qualquer controle pode alcançar.',
            required: 'Marca o campo como obrigatório.',
            showMinMaxLabels:
              'Mostra os limites mínimo e máximo nas extremidades da trilha.',
            showValue:
              'Mostra os valores baixo e alto atuais ao lado do controle deslizante.',
            size: 'Tamanho visual da trilha e dos controles.',
            step: 'Incremento ao qual cada controle se ajusta ao ser movido.',
            value:
              'Tupla de intervalo [low, high] atual, vinculável de forma bidirecional via [(value)].',
            changed:
              'Dispara com a nova tupla [low, high] sempre que qualquer controle se move.',
            commitThumb:
              'Ajusta um controle ao passo mais próximo, limita-o aos limites e o restringe pelo controle oposto.',
            groupThousands:
              'Agrupa os valores exibidos com separadores de milhares, ignorado quando um formatValue personalizado é fornecido.',
            formatDisplay:
              'Formata um valor para exibição, aplicando agrupamento de milhares a menos que uma função formatValue personalizada esteja definida.',
          },
          rating: {
            allowHalf:
              'Permite granularidade de meia estrela, deixando o valor variar em incrementos de 0,5.',
            clearable: 'Clicar no valor atual limpa a avaliação de volta para 0.',
            disabled: 'Desativa a avaliação.',
            errorMsg:
              'Mensagem de erro exibida abaixo da avaliação, substituindo a dica e marcando-a como inválida.',
            halfIconClass:
              'Classe de componente independente renderizada para posições intermediárias quando allowHalf é verdadeiro.',
            hint: 'Texto auxiliar exibido abaixo da avaliação, oculto enquanto um erro é exibido.',
            iconClass:
              'Classe de componente independente renderizada para posições vazias e cheias.',
            id: 'id aplicado à avaliação e seu rótulo, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado acima da avaliação.',
            max: 'Valor de avaliação mais alto e número de estrelas renderizadas.',
            min: 'Valor de avaliação mais baixo que o usuário pode selecionar.',
            readonly:
              'Renderiza a avaliação apenas para exibição, ignorando cliques e entrada do teclado.',
            required: 'Marca a avaliação como obrigatória.',
            size: 'Tamanho visual da avaliação.',
            value:
              'Valor de avaliação atual, vinculável de forma bidirecional via [(value)].',
            hoverChanged:
              'Dispara com o valor pré-visualizado durante o hover, e null quando o cursor sai.',
            iconForState:
              'Retorna a classe de componente a instanciar para um determinado estado de estrela.',
            stateFor:
              'Resolve o estado de renderização (vazio, meio ou cheio) para uma posição de estrela.',
          },
          skeleton: {
            animated:
              'Reproduz a animação de brilho pulsante, suprimida automaticamente quando o usuário prefere movimento reduzido.',
            height:
              'Altura CSS explícita aplicada ao placeholder, recorrendo ao tamanho intrínseco da forma quando omitida.',
            variant:
              'Predefinição de forma do placeholder: linha de texto, círculo ou retângulo.',
            width:
              'Largura CSS explícita aplicada ao placeholder, recorrendo ao tamanho intrínseco da forma quando omitida.',
          },
          slider: {
            ariaLabel:
              'Rótulo acessível aplicado quando nenhum rótulo visível é renderizado.',
            disabled: 'Desativa o controle deslizante.',
            errorMsg:
              'Mensagem de erro exibida abaixo do controle, substituindo a dica e marcando o campo como inválido.',
            formatValue: 'Formatador que transforma o valor numérico no texto exibido.',
            hasError:
              'Força o estilo de estado de erro sem vincular uma mensagem de erro.',
            hint: 'Texto auxiliar exibido abaixo do controle, oculto enquanto um erro é exibido.',
            id: 'id aplicado ao controle deslizante e seu rótulo, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado acima do controle deslizante.',
            max: 'Valor mais alto que o controle deslizante pode alcançar.',
            min: 'Valor mais baixo que o controle deslizante pode alcançar.',
            required: 'Marca o controle deslizante como obrigatório.',
            showMinMaxLabels: 'Mostra os limites mínimo e máximo abaixo da trilha.',
            showValue: 'Mostra o valor atual ao lado do rótulo.',
            size: 'Tamanho visual da trilha e do controle deslizante.',
            step: 'Incremento ao qual o valor se ajusta conforme o controle se move.',
            value:
              'Valor atual do controle deslizante, vinculável de forma bidirecional via [(value)].',
            changed: 'Dispara com o novo valor ajustado sempre que o controle se move.',
            groupThousands:
              'Agrupa os valores exibidos com separadores de milhares, ignorado quando um formatValue personalizado é fornecido.',
            formatDisplay:
              'Formata um valor para exibição, aplicando agrupamento de milhares a menos que uma função formatValue personalizada esteja definida.',
          },
          spinner: {
            label:
              'Rótulo acessível anunciado à tecnologia assistiva, recorrendo à tradução do idioma ativo quando não definido.',
            size: 'Tamanho visual do spinner.',
          },
          switch: {
            ariaLabel:
              'Rótulo acessível para o interruptor quando nenhum rótulo visível é renderizado.',
            checked:
              'Estado ligado/desligado atual, vinculável de forma bidirecional via [(checked)].',
            disabled: 'Desativa o interruptor e bloqueia a alternância.',
            errorMsg:
              'Mensagem de erro exibida abaixo do interruptor, substituindo a dica e marcando o campo como inválido.',
            hint: 'Texto auxiliar exibido abaixo do interruptor, oculto enquanto um erro é exibido.',
            id: 'id aplicado à caixa de seleção subjacente e ao for do rótulo, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado ao lado do interruptor.',
            required: 'Marca o interruptor como obrigatório.',
            size: 'Tamanho visual do interruptor.',
            changed:
              'Dispara com o novo estado marcado sempre que o usuário alterna o interruptor.',
          },
          tag: {
            variant: 'Esquema de cores semântico da tag.',
            size: 'Tamanho visual da tag.',
            removable: 'Renderiza um botão de remover que emite removed quando ativado.',
            disabled: 'Desativa a tag e seu botão de remover.',
            removeLabel:
              'Rótulo acessível para o botão de remover, recorrendo ao idioma ativo.',
            removeTabbable:
              'Se o botão de remover é uma parada de tabulação; defina como false dentro de um widget composto que controla a navegação por teclado.',
            removed:
              'Dispara quando o usuário ativa o botão de remover em uma tag removível.',
          },
          textarea: {
            disabled: 'Desativa o campo.',
            errorMsg:
              'Mensagem de erro exibida abaixo do campo, substituindo a dica e marcando o campo como inválido.',
            hint: 'Texto auxiliar exibido abaixo do campo, oculto enquanto um erro é exibido.',
            id: 'id aplicado ao textarea nativo e ao for do rótulo, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado acima do campo.',
            maxHeight:
              'Limite em pixels para a altura do campo; além dele o textarea rola verticalmente em vez de crescer.',
            minHeight: 'Altura mínima em px; nunca menor que a altura padrão.',
            maxlength: 'Número máximo de caracteres que o campo aceita.',
            placeholder: 'Placeholder exibido enquanto o campo está vazio.',
            readonly: 'Renderiza o campo como somente leitura.',
            required: 'Marca o campo como obrigatório.',
            resize: 'Eixo ao longo do qual o usuário pode redimensionar o campo.',
            size: 'Tamanho visual do campo.',
            value:
              'Valor atual do campo, vinculável de forma bidirecional via [(value)].',
            blurred: 'Dispara quando o campo perde o foco.',
            focused: 'Dispara quando o campo recebe o foco.',
            focus: 'Move o foco do teclado para o textarea nativo subjacente.',
          },
          'avatar-editor': {
            accept:
              'Tipos MIME aceitos pelo seletor de arquivos, encaminhados ao input nativo.',
            canvasSize: 'Largura e altura em pixels do canvas de recorte quadrado.',
            cropState:
              'Estado inicial de deslocamento/zoom a restaurar quando uma imagem de origem é carregada.',
            currentSrc: 'URL da imagem a carregar no editor na inicialização.',
            exportQuality:
              'Qualidade JPEG/WebP usada ao exportar a imagem recortada, entre 0 e 1.',
            exportType:
              'Tipo MIME do blob de imagem exportado (por exemplo, image/png ou image/jpeg).',
            loading:
              'Mostra uma sobreposição de esqueleto enquanto um recurso externo está carregando.',
            maxFileSize:
              'Tamanho máximo de arquivo permitido em bytes; arquivos acima deste limite emitem errored.',
            maxZoom: 'Multiplicador máximo de zoom que o usuário pode alcançar.',
            minZoom: 'Multiplicador mínimo de zoom que o usuário pode alcançar.',
            shape: 'Forma da máscara de recorte aplicada ao canvas e à imagem exportada.',
            cropped:
              'Dispara quando o usuário exporta um recorte, fornecendo tanto um Blob quanto uma data URL.',
            cropStateChanged:
              'Dispara sempre que o usuário desloca ou amplia a imagem, útil para persistir o estado da edição.',
            errored:
              'Dispara com uma mensagem legível por humanos quando a validação do arquivo falha.',
            fileSelected:
              'Dispara quando um arquivo é escolhido do disco ou solto no editor.',
            removed: 'Dispara quando a imagem atual é limpa pelo controle de remover.',
            captureOriginal:
              'Marca a imagem atual e o estado de recorte como a referência para revertImage.',
            exportCrop:
              'Renderiza o recorte atual em um canvas fora da tela, emite cropped e resolve com o Blob.',
            openFilePicker: 'Abre o diálogo nativo de seleção de arquivos.',
            removeImage:
              'Limpa a imagem carregada e redefine o deslocamento e o zoom para os padrões.',
            revertImage:
              'Restaura a imagem e o estado de recorte capturados pela chamada captureOriginal mais recente.',
            setZoom:
              'Define o nível de zoom, limitado ao intervalo de minZoom e maxZoom configurado.',
            updateImageDarkness:
              'Amostra a região de recorte visível para determinar se a imagem é mais escura que o cinza médio.',
          },
          'menu-trigger': {
            menu: 'A instância de ea-menu que este gatilho controla.',
          },
          tooltip: {
            maxWidth:
              'Largura máxima em pixels; o texto quebra nesta largura (piso de 50px).',
            eaTooltip:
              'Conteúdo da dica exibida ao passar o cursor e ao foco do teclado. Aceita uma string simples ou um TemplateRef para conteúdo estilizado.',
            tooltipPosition:
              'Posicionamento da dica em relação ao seu elemento hospedeiro.',
          },
          'time-picker': {
            disabled: 'Desativa o seletor.',
            errorMsg:
              'Mensagem de erro exibida abaixo do campo, substituindo a dica e marcando o campo como inválido.',
            format:
              'Formato de exibição do rótulo do gatilho; o valor interno é sempre de 24 horas.',
            hint: 'Texto auxiliar exibido abaixo do campo, oculto enquanto um erro é exibido.',
            id: 'id aplicado ao gatilho e ao for do rótulo, gerado automaticamente quando omitido.',
            includeSeconds: 'Mostra uma coluna de segundos ao lado de horas e minutos.',
            label: 'Rótulo de texto renderizado acima do campo.',
            minuteStep:
              'Incremento ao qual a coluna de minutos se ajusta ao ser variada ou arrastada.',
            placeholder:
              'Placeholder exibido no gatilho enquanto nenhum horário é selecionado.',
            readonly:
              'Renderiza o campo como somente leitura, impedindo a abertura do popover.',
            required: 'Marca o campo como obrigatório.',
            secondStep:
              'Incremento ao qual a coluna de segundos se ajusta ao ser variada ou arrastada.',
            size: 'Tamanho visual do gatilho do seletor.',
            value:
              'String de horário atual em HH:MM ou HH:MM:SS (24 horas), vinculável de forma bidirecional via [(value)], ou null quando não definida.',
            changed:
              'Dispara com a nova string de horário sempre que o usuário altera o horário selecionado.',
            advanceFocus:
              'Move o foco para a próxima coluna de unidade após a entrada de um dígito ser concluída.',
            cannotExtend:
              'Retorna verdadeiro quando nenhum dígito adicional pode estender validamente o buffer atual para a unidade dada.',
            commitDigits:
              'Analisa a string de dígitos no buffer, limita-a ao intervalo válido da unidade e a grava no valor.',
            flushBuffer:
              'Confirma qualquer buffer pendente de dígitos digitados e o limpa.',
            focusHoursWhenReady:
              'Foca o input de horas assim que a superfície do popover é renderizada no DOM.',
            hoursFromTyped:
              'Converte um valor de horas digitado em seu equivalente de 24 horas, considerando o período AM/PM atual.',
            onPopoverCloseRequested:
              'Fecha o popover quando o usuário clica fora do seletor.',
            onSpinnerBlur:
              'Confirma qualquer buffer de dígito pendente quando uma coluna do spinner perde o foco.',
            onSpinnerFocus:
              'Seleciona todo o texto de uma coluna do spinner quando ela recebe o foco, para que a primeira tecla o substitua.',
            onSpinnerInput:
              'Trata a entrada de dígito em uma coluna do spinner, atualiza o buffer e avança o foco automaticamente quando a coluna está cheia.',
            startHold:
              'Inicia uma repetição de pressionamento longo em um botão de chevron, variando a unidade dada e acelerando após um atraso.',
            step: 'Varia a coluna de unidade dada para cima ou para baixo em um incremento configurado.',
            stopHold:
              'Cancela quaisquer temporizadores de repetição de pressionamento longo em andamento.',
            togglePeriod:
              'Alterna o período AM/PM no modo de 12 horas alternando o deslocamento de 12 horas.',
          },
          autocomplete: {
            disabled: 'Desativa o campo.',
            emptyMessage:
              'Mensagem exibida na lista quando nenhuma opção corresponde à entrada atual, recorrendo à tradução do idioma ativo quando omitida.',
            errorMsg:
              'Mensagem de erro exibida abaixo do campo, substituindo a dica e marcando o campo como inválido.',
            hint: 'Texto auxiliar exibido abaixo do campo, oculto enquanto um erro é exibido.',
            id: 'id aplicado ao input nativo e ao for do rótulo, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado acima do campo.',
            maxResults:
              'Número máximo de opções exibidas na lista de sugestões de uma só vez.',
            minLength:
              'Número mínimo de caracteres exigidos antes que a lista de sugestões apareça.',
            options: 'Lista completa de opções disponíveis para filtragem e seleção.',
            placeholder: 'Placeholder exibido enquanto o campo está vazio.',
            readonly: 'Renderiza o campo como somente leitura.',
            required: 'Marca o campo como obrigatório.',
            size: 'Tamanho visual do campo.',
            value:
              'Valor atual do campo, vinculável de forma bidirecional via [(value)].',
            blurred: 'Dispara quando o input perde o foco.',
            changed:
              'Dispara sempre que o texto do input muda, inclusive em edições de texto livre.',
            focused: 'Dispara quando o input recebe o foco.',
            selected: 'Dispara quando o usuário escolhe uma opção da lista de sugestões.',
            close: 'Fecha a lista de sugestões sem alterar o valor atual.',
            focus: 'Move o foco do teclado para o input de texto subjacente.',
            selectOption:
              'Seleciona programaticamente a opção dada, atualizando o valor e fechando a lista.',
          },
          'command-palette': {
            emptyMessage:
              'Mensagem exibida quando a consulta de pesquisa não corresponde a nenhum item, recorrendo à tradução do idioma ativo quando omitida.',
            items:
              'Lista completa de itens de comando disponíveis para pesquisa e execução.',
            open: 'Se o diálogo da paleta está aberto, vinculável de forma bidirecional via [(open)].',
            placeholder:
              'Placeholder exibido dentro do input de pesquisa enquanto está vazio.',
            execute:
              'Dispara quando o usuário seleciona um comando, emitindo o item escolhido.',
            showActiveHighlight:
              'Retorna se a linha ativa deve renderizar seu fundo destacado para o índice plano dado.',
          },
          tabs: {
            activeTab:
              'Valor da aba atualmente ativa, vinculável de forma bidirecional via [(activeTab)].',
            size: 'Tamanho visual das abas.',
            variant: 'Estilo visual da barra de abas: sublinhado ou preenchido.',
            changed:
              'Dispara com o valor da aba recém-ativada sempre que a aba ativa muda.',
            registerTab:
              'Registra uma aba filha para que apareça na barra de abas; chamado automaticamente por ea-tab.',
            selectTab: 'Ativa programaticamente a aba com o valor dado.',
            unregisterTab:
              'Remove uma aba filha previamente registrada; chamado automaticamente por ea-tab.',
          },
          tab: {
            disabled: 'Desativa esta aba, impedindo o usuário de selecioná-la.',
            id: 'id aplicado ao botão da aba e ao seu painel, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto exibido no botão da aba.',
            value: 'Valor único que identifica esta aba dentro de seu grupo ea-tabs pai.',
          },
          'date-picker': {
            disabled: 'Desativa o seletor de data.',
            errorMsg:
              'Mensagem de erro exibida abaixo do campo, substituindo a dica e marcando o campo como inválido.',
            format: 'Formato de exibição da data selecionada (curto, médio ou longo).',
            hint: 'Texto auxiliar exibido abaixo do campo, oculto enquanto um erro é exibido.',
            id: 'id aplicado ao gatilho e ao for do rótulo, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado acima do campo.',
            locale:
              'Tag de idioma BCP 47 usada para a formatação de data, recorrendo ao idioma global quando omitida.',
            maxDate:
              'Data mais tardia que o usuário pode selecionar; datas posteriores a esta são desativadas no calendário.',
            minDate:
              'Data mais antiga que o usuário pode selecionar; datas anteriores a esta são desativadas no calendário.',
            placeholder:
              'Placeholder exibido no gatilho enquanto nenhuma data é selecionada.',
            readonly:
              'Renderiza o campo como somente leitura, impedindo a abertura do calendário.',
            required: 'Marca o campo como obrigatório.',
            size: 'Tamanho visual do gatilho do seletor de data.',
            value:
              'Data selecionada atual, vinculável de forma bidirecional via [(value)].',
            weekStartsOn:
              'Primeiro dia da semana na grade do calendário (0 para domingo, 1 para segunda-feira).',
            changed: 'Dispara quando a data selecionada muda, inclusive quando limpa.',
            clear: 'Limpa a data selecionada e emite changed com null.',
            close: 'Fecha o popover do calendário.',
            focus: 'Move o foco do teclado para o botão do gatilho.',
            onPopoverCloseRequested:
              'Fecha o popover quando o usuário clica fora do seletor de data.',
            open: 'Abre o popover do calendário e move o foco para a célula do dia focado.',
            toggle: 'Alterna o popover do calendário entre aberto e fechado.',
          },
          menu: {
            size: 'Tamanho visual do menu; cada item o herda.',
            maxHeight:
              'Altura máxima da lista rolável como comprimento CSS; menus mais altos rolam além disso.',
            ariaLabel:
              'Rótulo acessível para a lista do menu, recorrendo ao idioma ativo quando omitido.',
            disabled: 'Desativa o menu, impedindo que ele abra.',
            id: 'id aplicado ao elemento de lista do menu, gerado automaticamente quando omitido.',
            open: 'Se o menu está aberto, vinculável de forma bidirecional via [(open)].',
            placement:
              'Posicionamento da lista do menu em relação ao seu elemento de gatilho.',
            closed: 'Dispara quando o menu fecha.',
            opened: 'Dispara quando o menu abre.',
            close:
              'Fecha o menu e, opcionalmente, restaura o foco ao elemento de gatilho.',
            focusFirstItem:
              'Move o foco do teclado para o primeiro item ativado no menu.',
            onPopoverCloseRequested: 'Fecha o menu quando o usuário clica fora dele.',
            openAt:
              'Abre o menu ancorado ao elemento de gatilho dado e foca o primeiro item.',
            toggleAt:
              'Alterna o estado de abertura do menu, ancorando-o ao elemento de gatilho dado.',
          },
          'menu-item': {
            disabled: 'Desativa o item e suprime os eventos de clique.',
            variant: 'Estilo visual do item; use danger para ações destrutivas.',
            clicked:
              'Dispara quando o item é ativado; o menu pai fecha imediatamente em seguida.',
          },
          'multi-select': {
            disabled: 'Desativa a seleção múltipla.',
            errorMsg:
              'Mensagem de erro exibida abaixo do campo, substituindo a dica e marcando o campo como inválido.',
            hint: 'Texto auxiliar exibido abaixo do campo, oculto enquanto um erro é exibido.',
            id: 'id aplicado ao gatilho e ao for do rótulo, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado acima do campo.',
            maxVisibleChips:
              'Número máximo de chips exibidos no gatilho antes que os demais colapsem em uma pill de contagem.',
            options: 'Lista de opções selecionáveis renderizadas na lista suspensa.',
            placeholder:
              'Placeholder exibido no gatilho enquanto nenhuma opção é selecionada.',
            readonly: 'Renderiza o campo como somente leitura.',
            required: 'Marca o campo como obrigatório.',
            searchable: 'Mostra o input de pesquisa no topo do popover.',
            searchPlaceholder:
              'Placeholder exibido dentro do input de pesquisa quando o termo de pesquisa está vazio.',
            selectAll:
              'Mostra a linha de selecionar-tudo de três estados no topo da lista de opções.',
            size: 'Tamanho visual do gatilho da seleção múltipla.',
            value:
              'Valores das opções selecionadas, vinculável de forma bidirecional via [(value)].',
            changed: 'Dispara com o novo valor sempre que a seleção muda.',
            clear: 'Limpa toda seleção e impede a propagação do evento.',
            handlePopoverKeydown:
              'Trata a navegação por teclado dentro do popover aberto, roteando as setas, Enter, Espaço e Escape.',
            onPopoverCloseRequested:
              'Chamado pelo popover quando o usuário clica fora ou rola; fecha o painel e marca o campo como tocado.',
            orderedValues:
              'Retorna o conjunto de valores dado reordenado para corresponder ao array de opções de entrada.',
            removeChip: 'Remove a opção dada da seleção atual.',
            toggleOption: 'Alterna a inclusão da opção dada na seleção atual.',
            toggleSelectAll:
              'Seleciona todas as opções filtradas se alguma estiver desmarcada, ou desmarca todas as opções filtradas se todas estiverem selecionadas.',
          },
          dropdown: {
            disabled: 'Desativa o dropdown.',
            errorMsg:
              'Mensagem de erro exibida abaixo do campo, substituindo a dica e marcando o campo como inválido.',
            hint: 'Texto auxiliar exibido abaixo do campo, oculto enquanto um erro é exibido.',
            id: 'id aplicado ao gatilho e ao for do rótulo, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado acima do campo.',
            options: 'Lista de opções selecionáveis renderizadas na lista suspensa.',
            placeholder:
              'Placeholder exibido no gatilho enquanto nenhuma opção é selecionada.',
            readonly: 'Renderiza o campo como somente leitura.',
            required: 'Marca o campo como obrigatório.',
            size: 'Tamanho visual do gatilho do dropdown.',
            value:
              'Valor selecionado atual, vinculável de forma bidirecional via [(value)].',
            changed: 'Dispara com o novo valor quando o usuário seleciona uma opção.',
            close: 'Fecha a lista do dropdown sem alterar o valor atual.',
            focus: 'Move o foco do teclado para o gatilho do dropdown.',
            onPopoverCloseRequested:
              'Chamado pelo popover quando o usuário clica fora do dropdown; fecha o painel e marca o campo como tocado.',
            select: 'Seleciona programaticamente a opção dada e fecha a lista.',
            toggle: 'Alterna a lista do dropdown entre aberta e fechada.',
          },
          'file-uploader': {
            accept:
              "Tipos MIME e extensões de arquivo separados por vírgula que a área de soltar aceita, por exemplo 'image/*,.pdf'.",
            disabled: 'Desativa o enviador.',
            errorMsg:
              'Mensagem de erro exibida abaixo do campo, substituindo a dica e marcando o campo como inválido.',
            hint: 'Texto auxiliar exibido abaixo do campo, oculto enquanto um erro é exibido.',
            id: 'id aplicado à área de soltar e ao for do rótulo, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado acima do campo.',
            maxFiles:
              'Número total máximo de arquivos; arquivos além do limite são rejeitados.',
            maxSize:
              'Tamanho máximo por arquivo em bytes; arquivos maiores são rejeitados.',
            multiple: 'Permite selecionar mais de um arquivo por vez.',
            progress:
              'Mapa de progresso de envio por arquivo (0-100) indexado pela identidade do File; omita para ocultar as barras de progresso.',
            required: 'Marca o campo como obrigatório.',
            showFileList:
              'Mostra a lista de arquivos selecionados abaixo da área de soltar.',
            size: 'Tamanho visual do enviador.',
            value:
              'Lista de arquivos atual, vinculável de forma bidirecional via [(value)].',
            fileRemoved:
              'Dispara quando um arquivo é removido pelo botão de remover de sua linha.',
            rejected:
              'Dispara quando um ou mais arquivos falham na validação, com o motivo de cada rejeição.',
            trackFile:
              'Retorna uma chave de rastreamento estável para um arquivo, usada internamente pela lista de arquivos.',
          },
          'form-field': {
            size: 'Tamanho visual do campo; o rótulo, o texto do controle, os espaçamentos e as mensagens escalam com ele.',
            errorMsg:
              'Mensagem de erro exibida abaixo do controle, substituindo a dica e marcando o campo como inválido.',
            hint: 'Texto auxiliar exibido abaixo do controle, oculto enquanto um erro é exibido.',
            id: 'id base para a vinculação do rótulo e da mensagem, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado acima do controle.',
            required: 'Marca o campo como obrigatório.',
          },
          popover: {
            anchor:
              'Elemento hospedeiro ou ElementRef contra o qual o popover se posiciona.',
            ariaLabel:
              'Rótulo acessível para a superfície do popover; forneça um quando o popover não contiver um título visível.',
            ariaLabelledby:
              'Id do elemento que rotula a superfície do popover, encaminhado como aria-labelledby.',
            clamp:
              'Limita o popover dentro da janela de visualização quando ele transbordaria.',
            closeOnEscape: 'Fecha o popover quando Escape é pressionado.',
            closeOnOutsideClick:
              'Fecha o popover quando o usuário clica fora tanto do popover quanto de sua âncora.',
            flip: 'Vira para o lado oposto quando o posicionamento solicitado transborda a janela de visualização.',
            matchAnchorWidth:
              'Define o min-width do popover para corresponder à largura da âncora.',
            offset: 'Espaço em px entre a âncora e a superfície do popover.',
            open: 'Se o popover está atualmente aberto.',
            placement: 'Posição preferida do popover em relação à sua âncora.',
            role: 'Papel ARIA aplicado à superfície do popover.',
            scrollBehavior:
              'Como o popover responde a eventos de rolagem e redimensionamento enquanto aberto: reposicionar, fechar ou ignorar.',
            surfaceId:
              'id do DOM para a superfície do popover, usado pelos elementos de gatilho via aria-controls.',
            trapFocus:
              'Mantém Tab e Shift+Tab circulando dentro da superfície enquanto aberto, para popovers no estilo de diálogo.',
            closeRequested:
              'Dispara quando o popover solicita ser fechado; o pai deve refletir isso em [open].',
          },
          'accordion-item': {
            disabled: 'Desativa este item, impedindo que ele seja alternado.',
            id: 'id aplicado ao botão de cabeçalho e ao painel do item, gerado automaticamente quando omitido.',
            label: 'Texto exibido no botão de cabeçalho do item.',
            value: 'Chave única que identifica este item dentro de seu accordion pai.',
          },
          breadcrumbs: {
            size: 'Tamanho visual da trilha de navegação.',
            ariaLabel:
              'Rótulo acessível para a navegação da trilha, recorrendo à tradução do idioma ativo quando omitido.',
            items:
              'Array de entradas da trilha; itens com um href são renderizados como links, outros como botões, e o último é não interativo.',
            separator: 'Estilo visual do separador renderizado entre os itens da trilha.',
            clicked: 'Dispara quando uma trilha não desativada e não final é ativada.',
          },
          drawer: {
            animation:
              'Animação de deslize conforme a gaveta abre e fecha: none (instantânea), linear (velocidade constante) ou eased (curva de desaceleração suave).',
            ariaLabel:
              'Rótulo acessível para o painel da gaveta quando seu título não é descritivo o suficiente.',
            closeOnBackdrop: 'Fecha a gaveta quando o usuário clica no fundo.',
            closeOnEscape: 'Fecha a gaveta quando o usuário pressiona a tecla Escape.',
            id: 'id aplicado ao elemento de diálogo, gerado automaticamente quando omitido.',
            mode: 'Como a gaveta se relaciona com a página: overlay flutua sobre uma página escurecida e com foco confinado, enquanto push abre de forma não modal e reflui o conteúdo da página para o lado.',
            open: 'Se a gaveta está aberta, vinculável de forma bidirecional via [(open)].',
            position:
              'Borda da janela de visualização a partir da qual a gaveta desliza.',
            pushTarget:
              'Elemento cujo conteúdo é empurrado para o lado no modo push, como um seletor CSS ou referência de elemento; o padrão é o body do documento.',
            showClose: 'Mostra o botão de fechar no cabeçalho da gaveta.',
            size: 'Extensão do painel da gaveta ao longo de seu eixo principal: largura para gavetas laterais, altura para gavetas superiores e inferiores.',
            closed:
              'Dispara quando a gaveta fecha, seja pelo botão de fechar, pelo fundo ou por Escape.',
            opened: 'Dispara assim que a gaveta é exibida.',
          },
          'data-table': {
            size: 'Tamanho visual da tabela; os preenchimentos de densidade e os ícones escalam com ele.',
            clickable:
              'Marca as linhas de dados como clicáveis: mostra um cursor de ponteiro e emite rowActivate ao clicar ou pressionar Enter/Espaço.',
            rowActivate:
              'Emite os dados da linha quando uma linha clicável é ativada por clique ou teclado.',
            navigable:
              'Transforma a tabela em uma grade navegável pelo teclado, com foco móvel e movimentação entre células pelas setas.',
            bordered: 'Renderiza uma borda ao redor de cada célula.',
            caption:
              'Legenda visível exibida acima da tabela; também a nomeia para a tecnologia assistiva.',
            columns:
              'Definições de coluna descrevendo a chave, o rótulo e a ordenação ou template opcionais de cada campo.',
            data: 'Array de objetos de linha a exibir na tabela.',
            density:
              'Predefinição de densidade vertical que controla o preenchimento das células de linha e cabeçalho.',
            hoverable: 'Destaca a linha sob o ponteiro ao passar o cursor.',
            noDataText:
              'Texto exibido no estado vazio, recorrendo à tradução do idioma ativo.',
            sort: 'Estado de ordenação atual (chave e direção da coluna), vinculável de forma bidirecional via [(sort)].',
            stickyHeader:
              'Fixa a linha de cabeçalho no topo da tabela quando o conteúdo rola.',
            striped: 'Aplica sombreamento de fundo alternado às linhas ímpares e pares.',
            trackBy:
              'Chave de propriedade de linha usada pela detecção de alterações do Angular para identificar linhas de forma eficiente.',
            sorted:
              'Dispara sempre que a coluna ou direção de ordenação muda por um clique no cabeçalho.',
          },
          'radio-group': {
            ariaLabel:
              'Rótulo acessível para o grupo quando nenhum rótulo visível é renderizado.',
            disabled: 'Desativa todas as opções de rádio no grupo.',
            errorMsg:
              'Mensagem de erro exibida abaixo do grupo, substituindo a dica e marcando o campo como inválido.',
            hint: 'Texto auxiliar exibido abaixo do grupo, oculto enquanto um erro é exibido.',
            id: 'id aplicado ao elemento do grupo e ao for do seu rótulo, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado acima do grupo.',
            name: 'Atributo name compartilhado aplicado a todos os inputs de rádio no grupo, gerado automaticamente quando omitido.',
            orientation: 'Direção de layout das opções de rádio dentro do grupo.',
            required: 'Marca o grupo como obrigatório.',
            size: 'Tamanho visual aplicado a todas as opções de rádio no grupo.',
            value:
              'Valor selecionado atualmente, vinculável de forma bidirecional via [(value)].',
            changed: 'Dispara com o novo valor quando o usuário seleciona uma opção.',
            select: 'Seleciona programaticamente a opção com o valor dado.',
          },
          segmented: {
            ariaLabel:
              'Rótulo acessível para o controle quando nenhum rótulo visível é renderizado.',
            disabled: 'Desativa o controle segmentado.',
            errorMsg:
              'Mensagem de erro exibida abaixo do campo, substituindo a dica e marcando o campo como inválido.',
            fullWidth: 'Estica o controle para preencher a largura de seu contêiner.',
            hint: 'Texto auxiliar exibido abaixo do campo, oculto enquanto um erro é exibido.',
            id: 'id aplicado ao controle e ao for do rótulo, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto renderizado acima do controle.',
            options:
              'Array de opções renderizadas como botões de alternância dentro do controle.',
            required: 'Marca o campo como obrigatório.',
            size: 'Tamanho visual do controle segmentado.',
            value:
              'Valor da opção selecionada atualmente, vinculável de forma bidirecional via [(value)].',
            changed:
              'Dispara com o novo valor quando o usuário seleciona uma opção diferente.',
            select: 'Seleciona programaticamente a opção dada.',
          },
          tree: {
            ariaLabel: 'Rótulo acessível para o widget de árvore.',
            disabled: 'Desativa todos os nós da árvore.',
            expandedIds:
              'Ids dos nós de ramificação atualmente expandidos, vinculável de forma bidirecional via [(expandedIds)].',
            nodes: 'Array de objetos de dados de nó de árvore que define a hierarquia.',
            selectedId:
              'Id do nó atualmente selecionado, vinculável de forma bidirecional via [(selectedId)].',
            size: 'Tamanho visual da árvore, escalando o texto e o espaçamento proporcionalmente.',
            nodeClick: 'Dispara com os dados do nó quando o usuário seleciona um nó.',
          },
          step: {
            completed: 'Marca a etapa como concluída, atualizando seu indicador visual.',
            disabled: 'Impede que a etapa seja ativada.',
            id: 'id aplicado ao painel da etapa e à sua aba, gerado automaticamente quando omitido.',
            label: 'Rótulo de texto exibido no indicador da etapa.',
            optional:
              'Marca a etapa como opcional, exibida como uma dica abaixo do rótulo da etapa.',
          },
          stepper: {
            activeStep:
              'Índice baseado em zero da etapa atualmente ativa, vinculável de forma bidirecional via [(activeStep)].',
            disabled: 'Desativa todo o stepper e toda a navegação entre etapas.',
            id: 'id aplicado ao elemento hospedeiro do stepper, gerado automaticamente quando omitido.',
            linear:
              'Exige que cada etapa não opcional seja marcada como concluída antes que o usuário possa avançar.',
            size: 'Tamanho visual do stepper, escalando os indicadores de etapa e os rótulos em conjunto.',
            changed:
              'Dispara com o novo índice de etapa ativa quando o usuário navega para uma etapa diferente.',
            canNavigateTo:
              'Retorna se a etapa no índice dado é alcançável a partir do estado atual.',
            indexOf:
              'Retorna o índice da etapa dada, ou -1 se ela não estiver registrada.',
            selectStep: 'Ativa a etapa no índice dado se ela for alcançável.',
          },
          'transfer-list': {
            disabled:
              'Desativa toda a lista de transferência e todos os controles de movimentação.',
            items:
              'Conjunto completo de itens disponíveis em ambos os painéis, identificados por id.',
            selectedIds:
              'Ids dos itens atualmente no lado de destino (direito), vinculável de forma bidirecional via [(selectedIds)].',
            size: 'Tamanho visual da lista de transferência.',
            sourceLabel:
              'Título renderizado acima do painel de origem (esquerdo), recorrendo ao padrão do idioma ativo.',
            targetLabel:
              'Título renderizado acima do painel de destino (direito), recorrendo ao padrão do idioma ativo.',
          },
          'virtual-list': {
            itemHeight:
              'Altura em pixels de cada linha; todas as linhas devem compartilhar a mesma altura fixa.',
            items:
              'Array completo de itens de dados a renderizar; apenas a fatia visível é montada a cada momento.',
            overscan:
              'Número de linhas extras renderizadas acima e abaixo da janela visível para reduzir bordas em branco durante a rolagem rápida.',
            viewportHeight: 'Altura em pixels da janela de visualização que rola.',
            scrollIndexChange:
              'Dispara com o índice da primeira linha visível no topo da janela de visualização sempre que o usuário rola.',
            scrollToIndex:
              'Rola a janela de visualização para que a linha no índice dado apareça no topo, limitada aos limites da lista.',
          },
          'field-label': {
            forId:
              'id do controle associado; renderiza um <label for> quando definido, caso contrário um <span>.',
            labelId:
              'id aplicado ao elemento de rótulo renderizado para que os controles possam referenciá-lo via aria-labelledby.',
            required: 'Mostra um indicador de obrigatório no rótulo.',
            text: 'Texto do rótulo renderizado dentro do elemento de rótulo.',
          },
          'field-messages': {
            error:
              'Mensagem de erro a exibir; quando definida, a dica é ocultada e a mensagem é anunciada como um alerta.',
            hint: 'Texto auxiliar exibido abaixo do campo quando não há erro presente.',
            id: 'id base usado para derivar os ids aria dos elementos de erro e dica.',
          },
          dialog: {
            ariaLabel:
              'Rótulo acessível para o diálogo quando seu slot de cabeçalho não contém um título visível.',
            closeOnBackdrop:
              'Fecha o diálogo quando o usuário clica na área de fundo fora do painel.',
            closeOnEscape: 'Fecha o diálogo quando o usuário pressiona Escape.',
            id: 'id aplicado ao elemento de diálogo nativo, gerado automaticamente quando omitido.',
            open: 'Se o diálogo é exibido, vinculável de forma bidirecional via [(open)].',
            showClose: 'Mostra o botão de fechar no cabeçalho do diálogo.',
            width: 'Predefinição de largura para o painel do diálogo.',
            closed:
              'Dispara quando o diálogo fecha, independentemente de ter sido fechado pelo usuário ou programaticamente.',
            opened: 'Dispara assim que o diálogo é exibido via showModal().',
          },
        },
      },
      sharedOptions: {
        fruitOptions: [
          { value: 'apple', label: 'Maçã' },
          { value: 'banana', label: 'Banana' },
          { value: 'cherry', label: 'Cereja' },
          { value: 'date', label: 'Tâmara' },
        ],
        viewOptions: [
          { value: 'day', label: 'Dia' },
          { value: 'week', label: 'Semana' },
          { value: 'month', label: 'Mês' },
        ],
        themeOptions: [
          { value: 'light', label: 'Claro' },
          { value: 'dark', label: 'Escuro' },
        ],
        monthOptions: [
          { value: 'jan', label: 'Janeiro' },
          { value: 'feb', label: 'Fevereiro' },
          { value: 'mar', label: 'Março' },
          { value: 'apr', label: 'Abril' },
          { value: 'may', label: 'Maio' },
          { value: 'jun', label: 'Junho' },
          { value: 'jul', label: 'Julho' },
          { value: 'aug', label: 'Agosto' },
          { value: 'sep', label: 'Setembro' },
          { value: 'oct', label: 'Outubro' },
          { value: 'nov', label: 'Novembro' },
          { value: 'dec', label: 'Dezembro' },
        ],
        breadcrumbHome: 'Início',
        breadcrumbProducts: 'Produtos',
        breadcrumbLaptops: 'Notebooks',
        breadcrumbMacBookPro: 'MacBook Pro',
        breadcrumbDashboard: 'Painel',
        breadcrumbSettings: 'Configurações',
      },
    },
  },
};

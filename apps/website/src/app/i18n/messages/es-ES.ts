import type { WebMessages } from '../web-messages.types';

export const esES: WebMessages = {
  common: {
    skipToContent: 'Saltar al contenido principal',
    brandHome: 'Inicio de eagami',
    navUi: 'UI',
    navUiTooltip: 'Documentación de la biblioteca de componentes',
    themeToggleTooltip: 'Cambiar tema',
    themeToggleLabel: next => `Cambiar al modo ${next === 'light' ? 'claro' : 'oscuro'}`,
    localeMenuLabel: 'Idioma',
    localeMenuTooltip: 'Cambiar idioma',
    activeLocale: label => `Idioma actual: ${label}`,
    footer: {
      copyright: year => `© ${year} eagami`,
      npmLink: 'npm',
      npmTooltip: 'Ver @eagami/ui en npm',
      githubAriaLabel: 'eagami en GitHub',
      githubTooltip: 'Ver código fuente en GitHub',
      navLabel: 'Pie de página',
    },
    codeSnippet: {
      copyLabel: 'Copiar al portapapeles',
      copySuccess: 'Copiado al portapapeles',
      copyError: 'No se pudo copiar al portapapeles',
    },
  },
  home: {
    metaTitle: 'Eagami',
    metaDescription: 'Diseño web elegante',
    hero: {
      tagline: 'diseño web elegante.',
      ctaPrimary: 'Ponte en contacto',
      ctaSecondary: 'Ver proyectos recientes →',
      scrollHint: 'Desplázate a los servicios',
    },
    services: {
      title: 'Servicios',
      lede: 'Desde una sola página de destino hasta una aplicación web completa, además de todo lo que viene después del lanzamiento.',
      featuresHeading: 'Funcionalidades',
      uiNote: {
        before: 'Los proyectos más grandes pueden construirse sobre',
        link: 'Eagami UI',
        after:
          ', una biblioteca de componentes y un sistema de diseño a medida, para un lenguaje visual coherente y moderno en todo el sitio.',
      },
      core: [
        {
          title: 'Sitios web a medida',
          description:
            'Un sitio completo construido desde cero: configuración de dominio, alojamiento, identidad de marca, diseño y lanzamiento. Revisiones ilimitadas hasta el día del lanzamiento.',
        },
        {
          title: 'Mantenimiento continuo',
          description:
            'Mantenimiento mensual que cubre el alojamiento, los parches de seguridad, las actualizaciones de dependencias, las ediciones de contenido y la revisión de la analítica.',
        },
      ],
      addOns: [
        {
          title: 'Gestión de usuarios',
          description:
            'Autenticación, registro y recuperación de contraseñas, además de un panel de administración con métricas y controles por usuario.',
          iconSlug: 'users',
        },
        {
          title: 'Procesamiento de pagos',
          description:
            'Pagos en línea (Stripe por defecto, otros proveedores bajo petición), con formularios de pago personalizables y facturación recurrente.',
          iconSlug: 'credit-card',
        },
        {
          title: 'Soporte multilingüe',
          description:
            'Compatibilidad con varios idiomas, con detección automática opcional desde el navegador del visitante.',
          iconSlug: 'languages',
        },
        {
          title: 'Temas',
          description:
            'Conmutador de modo claro/oscuro y paletas de colores totalmente personalizables.',
          iconSlug: 'moon',
        },
        {
          title: 'Analítica e información',
          description:
            'Métricas de tráfico del sitio web (fuentes, dispositivos, ubicaciones), además del seguimiento de eventos personalizados.',
          iconSlug: 'bar-chart',
        },
        {
          title: 'Correo y notificaciones',
          description:
            'Correos automatizados para la actividad de la cuenta, recibos y anuncios.',
          iconSlug: 'mail',
        },
      ],
    },
    projects: {
      title: 'Proyectos recientes',
      lede: 'Algunos sitios en desarrollo activo.',
      previousAriaLabel: 'Proyectos anteriores',
      nextAriaLabel: 'Proyectos siguientes',
      regionAriaLabel: 'Proyectos recientes',
      showing: title => `Mostrando ${title}`,
      cards: [
        {
          title: 'London Chess',
          description:
            'Un centro para el London Chess Club y los eventos de ajedrez en London, ON.',
          url: 'https://londonchess.ca',
          display: 'londonchess.ca',
          logo: 'assets/projects/londonchess.svg',
        },
        {
          title: 'CIRC Aesthetics',
          description:
            'Clínica de Radiología Intervencionista Cosmética con sede en London, ON.',
          url: 'https://circaesthetics.ca',
          display: 'circaesthetics.ca',
          logo: 'assets/projects/circaesthetics.svg',
        },
        {
          title: 'Brewski Bets',
          description:
            'Un registro para apuestas informales entre amigos, saldadas en cerveza.',
          url: 'https://brewskibets.com',
          display: 'brewskibets.com',
          logo: 'assets/projects/brewskibets.svg',
        },
        {
          title: 'Chordbomb',
          description: 'Próximamente…',
          url: 'https://chordbomb.com',
          display: 'chordbomb.com',
          logo: 'assets/projects/chordbomb.svg',
        },
      ],
    },
    contact: {
      title: '¿Tienes un proyecto en mente?',
      lede: '¡Hablemos de ello!',
      success: 'Gracias por el mensaje. Recibirás una respuesta pronto.',
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'tu@ejemplo.com',
      emailInvalid: 'Introduce una dirección de correo válida',
      messageLabel: 'Mensaje',
      placeholderHints: [
        '¡Hola! Estoy trabajando en un proyecto personal y me vendría bien ayuda con el frontend…',
        'Busco a alguien para construir un sitio web para nuestra pequeña empresa…',
        'Una pregunta rápida sobre la biblioteca de componentes antes de empezar…',
      ],
      submit: 'Enviar mensaje',
      sentToast: 'Mensaje enviado',
      errorMessage:
        'Algo ha ido mal. Por favor, escribe directamente a michal@eagami.com.',
    },
  },
  notFound: {
    metaTitle: 'Eagami | 404',
    metaDescription: 'Página no encontrada.',
    eyebrow: '404',
    title: 'Página no encontrada',
    lede: 'La página que buscabas no existe o ha sido movida.',
    cta: 'Volver al inicio',
  },
  ui: {
    changelog: {
      title: 'Registro de cambios',
      metaTitle: 'Registro de cambios | Eagami UI',
      metaDescription:
        'Historial de versiones de la biblioteca de componentes Angular Eagami UI.',
      lead: 'Cambios destacados en @eagami/ui, los más recientes primero.',
      migrationGuide: 'Guía de migración',
      fullHistory: 'Historial completo en GitHub',
    },
    shell: {
      changelog: 'Registro de cambios',
      sidebarLabel: 'Barra lateral de documentación',
      navLabel: 'Documentación',
      overview: 'Resumen',
      setup: 'Instalación',
      designTokens: 'Tokens de diseño',
      themeBuilder: 'Generador de temas',
      icons: 'Iconos',
      i18n: 'Internacionalización',
      accessibility: 'Accesibilidad',
      components: 'Componentes',
    },
    index: {
      metaTitle: 'Eagami UI',
      metaDescription:
        'Biblioteca de componentes Angular ligera y accesible, construida sobre propiedades CSS personalizadas.',
      title: 'Eagami UI',
      ledeBefore: 'es una biblioteca de componentes Angular ligera y accesible.',
      ledeAfter:
        'Valores predeterminados sensatos listos para usar, con un diseño totalmente personalizable para adaptarse a cualquier marca.',
      principlesHeading: 'Principios de diseño',
      principles: [
        {
          title: 'Accesible',
          body: 'Navegación con teclado, gestión del foco, soporte de lectores de pantalla y manejo de movimiento reducido están integrados en cada componente.',
        },
        {
          title: 'Ligero',
          body: 'Cada componente se importa de forma independiente y el bundle solo incluye lo que utilizas.',
        },
        {
          title: 'Tematizable',
          body: 'Totalmente personalizable mediante tokens de diseño, manteniendo una apariencia unificada en cada página. Las variantes clara y oscura vienen juntas y, por defecto, siguen la preferencia del sistema del usuario.',
        },
        {
          title: 'Localizado',
          body: 'Los textos integrados de los componentes se envían en todos los idiomas compatibles.',
        },
        {
          title: 'Moderno',
          body: 'Se actualiza con regularidad con las últimas características de Angular y los estándares web modernos.',
        },
        {
          title: 'Sin ataduras',
          body: 'Cada componente es Angular y CSS puros, sin dependencia de proveedor: el código fuente puede leerse, copiarse o modificarse como cualquier otro código de tu proyecto.',
        },
      ],
      getStartedHeading: 'Empezar',
      getStartedBefore: 'Ve a',
      getStartedLink: 'Instalación',
      getStartedAfter: ' para instalar el paquete y conectar la hoja de estilos global.',
      showcase: {
        button: 'Púlsame',
        toggle: 'Actívame',
        tick: 'Márcame',
        tag: 'Etiqueta',
        badge: 'Insignia',
        tooltip: 'Información adicional mostrada en una descripción emergente',
        exploreMore: '...explorar más componentes',
        list: 'Lista',
        grid: 'Cuadrícula',
        table: 'Tabla',
        radioThis: 'Este',
        radioThat: 'Ese',
        option1: 'Opción 1',
        option2: 'Opción 2',
        option3: 'Opción 3',
        toastButton: 'Botón pulsado',
        toastToggleOn: 'Interruptor activado',
        toastToggleOff: 'Interruptor desactivado',
        toastTickOn: 'Casilla marcada',
        toastTickOff: 'Casilla desmarcada',
        ariaView: 'Vista de demostración',
        ariaSlider: 'Control deslizante de demostración',
        ariaRating: 'Valoración de demostración',
        ariaLayout: 'Diseño de demostración',
        ariaColor: 'Color de demostración',
        ariaSelect: 'Selección de demostración',
        ariaDate: 'Fecha de demostración',
        ariaMultiSelect: 'Selección múltiple de demostración',
        msMusic: 'Música',
        msTravel: 'Viajes',
        msFood: 'Comida',
      },
      theme: {
        heading: 'Hazlo a tu medida',
        ledeBefore: 'Los',
        ledeLink: 'tokens de diseño',
        ledeAfter:
          ' son los que dan a cada proyecto de Eagami una personalidad distintiva: colores, fuentes, espaciado, esquinas, sombras y movimiento personalizables, todo aplicado al sitio o la aplicación completa. Modifica algunos abajo para ver cómo afectan a los componentes.',
        brandColor: 'Color de marca',
        radius: 'Radio de las esquinas',
        font: 'Fuente',
        fontDefault: '(predeterminado)',
        reset: 'Restablecer',
      },
    },
    setup: {
      metaTitle: 'Instalación | Eagami UI',
      metaDescription:
        'Instala @eagami/ui y conecta la hoja de estilos global y las fuentes.',
      title: 'Instalación',
      ngAddLabel: 'Instala y configura todo con un solo comando:',
      manualLabel: 'O configúralo manualmente:',
      installLabel: 'Instala el paquete:',
      or: 'o',
      stylesheetLabel: {
        before: 'Añade la hoja de estilos global en',
        after: ':',
      },
      fontsLabel: {
        before: 'Carga las fuentes en',
        after: ':',
      },
      firstComponentHeading: 'Tu primer componente',
    },
    integrations: {
      heading: 'Más allá de Angular',
      intro:
        'Los tokens de diseño son independientes del framework. Copia una guía de integración autónoma en un proyecto sin Angular o consume directamente la exportación de tokens legible por máquina.',
      reactLink: 'Guía de integración con React',
      flutterLink: 'Guía de integración con Flutter',
      tokensLink: 'Tokens de diseño en JSON',
    },
    themeBuilder: {
      metaTitle: 'Generador de temas | Eagami UI',
      metaDescription:
        'Genera una paleta verificada con WCAG para los modos claro y oscuro a partir de los colores de tu marca y copia la configuración del proveedor o el CSS.',
      title: 'Generador de temas',
      lede: 'Elige los colores de tu marca y Eagami UI deriva una escala completa 50–900 en el espacio OKLCH, comprueba su contraste WCAG en modo claro y oscuro, y te entrega la configuración <code>provideEagamiUi()</code> lista para usar.',
      controlsHeading: 'Colores de marca',
      primaryLabel: 'Color primario',
      secondaryLabel: 'Color secundario',
      contrastHeading: 'Accesibilidad',
      contrastPass: 'Cumple el contraste WCAG 2.2 AA en modo claro y oscuro',
      contrastFailIntro:
        'Algunas combinaciones no alcanzan el umbral de contraste WCAG AA:',
      scaleHeading: 'Escala generada',
      previewHeading: 'Vista previa',
      previewHint: 'Cambia el tema del sitio para ver la paleta en modo oscuro.',
      previewButton: 'Empezar',
      previewSwitch: 'Notificaciones',
      previewPrimary: 'Primario',
      previewSecondary: 'Secundario',
      previewStep1: 'Cuenta',
      previewStep2: 'Perfil',
      previewStep3: 'Listo',
      previewProgress: 'Progreso:',
      exportHeading: 'Úsalo',
      exportConfigLabel: 'Configuración del proveedor',
      exportCssLabel: 'Propiedades personalizadas CSS',
    },
    tokens: {
      metaTitle: 'Tokens de diseño | Eagami UI',
      metaDescription:
        'Propiedades CSS personalizadas para colores, tipografía, espaciado, elevación, forma y movimiento.',
      title: 'Tokens de diseño',
      lede: 'Las propiedades CSS personalizadas que impulsan cada componente de la biblioteca: colores, tipografía, espaciado, elevación, forma y movimiento. Referencia estos tokens en tus propios estilos mediante <code>var(--token-name)</code> para mantener la coherencia visual en toda la aplicación.',
      sections: {
        theming: 'Temas',
        palette: 'Paleta de marca',
        colors: 'Colores',
        typography: 'Tipografía',
        spacing: 'Espaciado',
        elevation: 'Elevación',
        shape: 'Forma',
        motion: 'Movimiento',
      },
      themingRootBefore:
        'Sobrescribe cualquier token en <code>:root</code> para retematizar toda la biblioteca:',
      themingScopedBefore:
        'O limita las sobrescrituras a componentes individuales donde sea útil:',
      paletteIntro:
        'Pasa un único hex de marca a <code>provideEagamiUi()</code> y la biblioteca deriva una escala completa de diez tonos (50 a 900) en el espacio <a href="https://www.w3.org/TR/css-color-4/#ok-lab" target="_blank" rel="noopener noreferrer"><span>OKLCH</span></a>, manteniendo tono y croma estables mientras se gradúa la luminancia. Los tonos derivados alimentan cada token <code>--color-brand-*</code> tanto en modo claro como oscuro:',
      paletteOverrides:
        'Fija tonos concretos o reasigna qué tono derivado respalda cada rol semántico:',
      paletteContrast:
        'Cada combinación de rol de marca (texto sobre superficie, superficie sobre lienzo) se valida contra WCAG 2.1 AA al arrancar. Una combinación no conforme lanza un error antes de cargar la aplicación, así que un fallo de contraste en el color de marca se detecta al boot, no en producción.',
      paletteBuilderIntro: 'Crea y previsualiza tu paleta de forma visual en el',
      paletteBuilderLink: 'generador de temas',
      elevationDrop: 'Sombras proyectadas',
      elevationRelief: 'Relieve y hueco',
      elevationReliefBefore:
        '<code>--shadow-bevel</code> combina un reflejo interior (arriba) con una sombra interior (abajo) para superficies que deben verse elevadas. <code>--shadow-well</code> invierte la iluminación para un aspecto hundido. Combina con <code>--shadow-*</code> para añadir sombra ambiental: <code>box-shadow: var(--shadow-bevel), var(--shadow-sm);</code>',
      colorsPrimary: 'Primario',
      colorsSecondary: 'Secundario',
      colorsNeutral: 'Neutro',
      colorsStatus: 'Estado',
      colorsSemantic: 'Semántico',
      typographyFamilies: 'Familias',
      typographySizes: 'Tamaños',
      typographyWeights: 'Pesos',
      typographyComposites: 'Estilos compuestos',
      typographyCompositesBefore:
        'Los tokens compuestos agrupan tamaño, peso, altura de línea (y a veces familia) para un rol específico. <code>--text-section-heading-*</code> es el primer compuesto que fija una familia tipográfica; úsalo para los títulos <code>&lt;h2&gt;</code> de subsección en páginas de docs y marketing.',
      typographySectionHeadingSample: 'Título de sección con voz de marca',
      motionSimulate: 'Simular',
      motionDurations: 'Duraciones',
      motionEasings: 'Curvas',
    },
    icons: {
      metaTitle: 'Iconos | Eagami UI',
      metaDescription: 'Conjunto de iconos incluido con @eagami/ui.',
      title: 'Iconos',
      lede: 'Componentes Angular autónomos que heredan su color y se escalan con <code>font-size</code>, por lo que se renderizan a cualquier tamaño. La mayoría se derivan de <a href="https://feathericons.com/" target="_blank" rel="noopener noreferrer"><span>Feather Icons</span></a> de <a href="https://github.com/colebemis" target="_blank" rel="noopener noreferrer"><span>Cole Bemis</span></a> bajo la <a href="https://github.com/feathericons/feather/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><span>Licencia MIT</span></a>; el resto son iconos originales de Eagami UI. Los iconos Feather también pueden dibujarse con trazos más finos o más gruesos. Haz clic en un icono para copiar su selector.',
      filterLabel: 'Filtrar iconos',
      filterPlaceholder: 'Buscar iconos',
      filterClearLabel: 'Borrar búsqueda',
      categoryFeather: 'Feather',
      categoryEagami: 'Eagami UI',
      categoryBrand: 'Marca',
      countAll: count => `${count} iconos`,
      countFiltered: (shown, total) => `${shown} de ${total} iconos`,
      noResults: 'Ningún icono coincide con tu búsqueda',
      copiedToast: selector => `"${selector}" copiado al portapapeles`,
      copyFailedToast: selector => `No se pudo copiar "${selector}" al portapapeles`,
      brandTitle: 'Iconos de marca',
      brandIntro:
        'Los iconos de marca de la lista siguiente representan marcas registradas de terceros y se proporcionan únicamente para uso nominativo, es decir, para identificar la marca que representan en una interfaz (un botón "Iniciar sesión con Google", un enlace "Compartir en Facebook", etc.). No están licenciados para uso decorativo general. Los consumidores son responsables de seguir las directrices de cada marca:',
      brandLinkLabel: 'Recursos de marca',
    },
    i18n: {
      metaTitle: 'Internacionalización | Eagami UI',
      metaDescription:
        'Textos integrados de los componentes en 15 idiomas, con cambio en tiempo de ejecución y sobrescrituras por cadena.',
      title: 'Internacionalización',
      lede: 'Cada cadena integrada (etiquetas ARIA, marcadores de posición, estados vacíos, controles del selector de fecha) se envía en 15 idiomas. Define uno para toda la aplicación, cámbialo en tiempo de ejecución o sobrescribe cadenas individuales.',
      supportedHeading: 'Idiomas compatibles',
      supportedFallback:
        'Los idiomas desconocidos vuelven al inglés, al igual que cualquier clave ausente en una sobrescritura parcial.',
      quickSetupHeading: 'Configuración rápida',
      quickSetupBefore:
        'Añade <code>provideEagamiUi()</code> a la configuración de tu aplicación y registra los idiomas que uses mediante <code>locales</code>. El inglés siempre está disponible, así que solo incluyes lo que necesitas.',
      lazyHeading: 'Carga diferida',
      lazyBefore:
        'Registra <code>localeLoaders</code> en lugar de <code>locales</code>: un idioma se descarga la primera vez que se activa y queda fuera del bundle inicial. Apunta cada loader a un módulo que reexporte un único paquete de idioma y precarga con <code>loadLocale()</code> cuando el cambio deba ser instantáneo.',
      liveDemoHeading: 'Demo en directo',
      liveDemoIntro:
        'Elige un idioma y observa cómo los componentes siguientes adoptan las cadenas y el formato de fecha correspondientes.',
      runtimeSwitchHeading: 'Cambio en tiempo de ejecución',
      runtimeSwitchBefore:
        'Inyecta <code>EagamiI18nService</code> y llama a <code>setLocale()</code>. El idioma activo es una señal, así que cada componente se vuelve a renderizar con las nuevas cadenas sin recargar.',
      perStringHeading: 'Sobrescrituras por cadena',
      perStringBefore:
        'Pasa un objeto <code>messages</code> junto con el idioma para sustituir cadenas individuales. Lo que omitas vuelve a los valores predeterminados del idioma.',
      perStringAfter:
        'La mayoría de los componentes también exponen entradas de mensaje individuales (p. ej. <code>placeholder</code> en <code>&lt;ea-dropdown&gt;</code>) para sobrescrituras puntuales en el sitio de llamada.',
      frenchSpacingHeading: 'Asistente de espaciado francés',
      frenchSpacingBody:
        'La tipografía francesa requiere un espacio estrecho indivisible antes de <code>? ! : ; »</code> y después de <code>«</code>. El asistente exportado <code>frenchSpacing()</code> convierte los espacios normales en tus propias cadenas en francés (la biblioteca gestiona sus mensajes franceses integrados internamente).',
      demoLocaleLabel: 'Idioma',
    },
    accessibility: {
      metaTitle: 'Accesibilidad | Eagami UI',
      metaDescription:
        'Conformidad WCAG 2.2 AA, compatibilidad total con el teclado y componentes adaptados a los lectores de pantalla, todo verificado con cada versión.',
      title: 'Accesibilidad',
      lede: 'Cada componente está construido según los principales estándares de accesibilidad web: semántica correcta, compatibilidad total con el teclado, gestión del foco y anuncios para lectores de pantalla funcionan desde el primer momento.',
      conformanceHeading: 'Conformidad',
      conformanceBody:
        'La biblioteca se adhiere a <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener">WCAG 2.2 Level AA</a>, el estándar que la mayoría de las organizaciones están obligadas a cumplir, y sigue las prácticas de autoría oficiales del W3C para cada tipo de control, desde los diálogos y menús hasta los controles deslizantes y los selectores de fecha. Los anuncios para lectores de pantalla se incluyen en todos los idiomas compatibles, de modo que las tecnologías de asistencia siempre hablan el idioma del usuario.',
      builtInHeading: 'Accesibilidad integrada',
      builtInItems: [
        {
          title: 'Semántica',
          body: 'Elementos nativos siempre que es posible, y roles, estados y propiedades ARIA explícitos cuando no. Estados como expandido, seleccionado, marcado, inválido y ocupado se exponen siempre de forma programática, nunca solo mediante estilos.',
        },
        {
          title: 'Compatibilidad con teclado',
          body: 'Patrones de teclado APG completos: roving tabindex, navegación con flechas, Inicio y Fin, Escape para cerrar, y Intro o Espacio para activar, con gestión de flechas adaptada a RTL.',
        },
        {
          title: 'Gestión del foco',
          body: 'Los modales y selectores atrapan el foco mientras están abiertos y lo devuelven al desencadenador al cerrarse. Los indicadores de foco siempre son visibles y nunca se suprimen.',
        },
        {
          title: 'Anuncios para lectores de pantalla',
          body: 'Los toasts, las alertas, los errores de validación y los cambios de estado asíncronos se anuncian mediante regiones live con el nivel de cortesía apropiado.',
        },
        {
          title: 'Movimiento reducido',
          body: 'Las animaciones respetan en todo momento la media query prefers-reduced-motion.',
        },
        {
          title: 'Contraste',
          body: 'Los temas claro y oscuro predeterminados cumplen los requisitos de contraste de WCAG, y las herramientas de tematización señalan las combinaciones que quedan por debajo del nivel AA.',
        },
      ],
      labelsHeading: 'Nombres accesibles',
      labelsBefore:
        'Los componentes que muestran texto se etiquetan a sí mismos. Cualquier elemento gráfico o de solo icono expone una entrada <code>aria-label</code> (con valores predeterminados localizados para los controles integrados como los botones de borrar, cerrar y descartar), y los campos de formulario conectan automáticamente <code>label</code>, las pistas y los mensajes de error al control mediante <code>aria-describedby</code>.',
      labelsAfter:
        'Proporciona un <code>label</code> o un <code>aria-label</code> para los controles sin texto visible y el componente se encarga del resto: los nombres, las pistas y los mensajes de error permanecen conectados automáticamente.',
      testingHeading: 'Verificado con cada versión',
      testingBody:
        'Cada componente se comprueba según las reglas de accesibilidad del sector cada vez que cambia, y una versión solo se publica cuando todas las comprobaciones pasan, de modo que la accesibilidad que ves aquí se mantiene a medida que la biblioteca evoluciona.',
    },
    component: {
      metaTitle: name => `${name} | Eagami UI`,
      metaDescription: name => `Referencia y demos en vivo del componente ${name}.`,
      demoHeading: 'Demo',
      notFoundTitle: 'Componente no encontrado',
      notFoundBody: 'Elige un componente de la barra lateral, o',
      notFoundLink: 'vuelve a la introducción',
      sectionHeadings: {
        basic: 'básico',
        variants: 'variantes',
        sizes: 'tamaños',
        states: 'estados',
        disabled: 'deshabilitado',
        dismissible: 'descartable',
        clearable: 'borrable',
        hintAndError: 'pista y error',
        withHint: 'con pista',
        withError: 'con error',
        withLabel: 'con etiqueta',
        withIcons: 'con iconos',
        withFooter: 'con pie',
        withPaginator: 'con paginador',
        withDisabledItem: 'con elemento deshabilitado',
        withDisabledTab: 'con pestaña deshabilitada',
        required: 'obligatorio',
        requiredWithHint: 'obligatorio con pista',
        horizontal: 'horizontal',
        vertical: 'vertical',
        single: 'único',
        multi: 'múltiple',
        circle: 'círculo',
        square: 'cuadrado',
        shapes: 'formas',
        shapesAndFallbacks: 'formas y respaldos',
        chevronSeparator: 'separador chevrón',
        slashSeparator: 'separador barra',
        twoLevels: 'dos niveles',
        fourDigitPin: 'PIN de 4 dígitos',
        defaultHeading: 'predeterminado',
        stripedAndBordered: 'rayado y con borde',
        compactDensity: 'densidad compacta',
        tinyList: 'lista pequeña',
        stickyHeader: 'cabecera fija',
        emptyState: 'estado vacío',
        formatVariants: 'variantes de formato',
        minMax: 'mín. y máx.',
        positions: 'posiciones',
        trigger: 'disparador',
        alignLeft: 'alineado a la izquierda',
        alignCenter: 'alineado al centro',
        manyPages: 'muchas páginas',
        minimal: 'mínimo',
        indeterminate: 'indeterminado',
        noResize: 'sin cambio de tamaño',
        resizing: 'redimensionamiento',
        disabledAndReadonly: 'deshabilitado y solo lectura',
        password: 'contraseña',
        autocompleteSection: 'autocompletado',
        twoOptions: 'dos opciones',
        fullWidth: 'ancho completo',
        minLengthMaxResults: 'longitud mín. y resultados máx.',
        removable: 'eliminable',
        minMaxLabels: 'etiquetas mín./máx.',
        underline: 'subrayado',
        filled: 'relleno',
        rect: 'rectángulo',
        inlineLayout: 'disposición en línea',
        noResults: 'sin resultados',
        titleOnly: 'solo título',
        iconTrigger: 'disparador de icono',
        placements: 'posiciones',
        canvasSizes: 'tamaños de lienzo',
        cappedChipCount: 'recuento de chips limitado',
        customIcon: 'icono personalizado',
        customIconAndColor: 'icono y color personalizados',
        customLabel: 'etiqueta personalizada',
        halfSteps: 'medios pasos',
        customSize: 'tamaño personalizado',
        linearFlow: 'flujo lineal',
        manyLevels: 'muchos niveles',
        notAnimated: 'sin animación',
        numberOfStars: 'número de estrellas',
        minimumOne: 'mínimo 1 estrella',
        outputFormats: 'formatos de salida',
        quarterHourSteps: 'pasos de cuarto de hora',
        readonly: 'solo lectura',
        singleFile: 'archivo único',
        stepped: 'con incrementos',
        sundayStart: 'semana inicia en domingo',
        twelveHourFormat: 'formato de 12 horas',
        twoActions: 'dos acciones',
        withCompletedSteps: 'con pasos completados',
        withConstraints: 'con restricciones',
        withInitialValue: 'con valor inicial',
        withMaxlength: 'con longitud máxima',
        withMaxHeight: 'con altura máxima',
        withMinMaxLabels: 'con etiquetas mín/máx',
        withOptionalStep: 'con paso opcional',
        withSeconds: 'con segundos',
        withSelection: 'con selección',
        withoutAlpha: 'sin alfa',
        withoutSearch: 'sin búsqueda',
        withoutSelectAll: 'sin seleccionar todo',
        wrapping: 'ajuste de línea',
      },
      common: {
        small: 'Pequeño',
        medium: 'Mediano',
        large: 'Grande',
        cancel: 'Cancelar',
        save: 'Guardar',
        close: 'Cerrar',
        confirm: 'Confirmar',
        disabled: 'Deshabilitado',
        defaultLabel: 'Predeterminado',
        successLabel: 'Éxito',
        warningLabel: 'Aviso',
        errorLabel: 'Error',
        infoLabel: 'Información',
      },
      demos: {
        accordion: {
          whatLabel: '¿Qué es @eagami/ui?',
          whatBody:
            'Una biblioteca de componentes Angular ligera y accesible, construida sobre propiedades CSS personalizadas.',
          installLabel: '¿Cómo se instala?',
          installBody:
            'Ejecuta pnpm add @eagami/ui y, después, añade la hoja de estilos global a tu angular.json.',
          themeLabel: '¿Puedo personalizar el tema?',
          themeBody:
            'Sí, sobrescribe cualquier propiedad CSS personalizada en :root o limita las sobrescrituras a componentes individuales.',
          sectionOneLabel: 'Sección uno',
          sectionOneBody:
            'En el modo múltiple pueden estar abiertas varias secciones a la vez.',
          sectionTwoLabel: 'Sección dos',
          sectionTwoBody: 'Contenido para la sección dos.',
          disabledSectionLabel: 'Sección deshabilitada',
          disabledSectionBody: 'Este contenido no es accesible.',
        },
        alert: {
          defaultText: 'Esta es una alerta predeterminada',
          successText: 'Los cambios se han guardado',
          warningText: 'Tu prueba expira en 3 días',
          errorText: 'Algo ha ido mal, vuelve a intentarlo',
          infoText: 'Hay una nueva versión disponible',
          dismissibleText: 'Esta alerta se puede cerrar',
          tooltipSuppressed:
            'Las descripciones emergentes se suprimen en dispositivos táctiles para evitar el comportamiento de hover persistente. Visita esta sección en un dispositivo con ratón para ver las demos en acción.',
        },
        autocomplete: {
          startTyping: 'Empieza a escribir…',
          hintText: 'Empieza a escribir para ver coincidencias',
          errorText: 'Selecciona una raza de perro',
          breedPlaceholder: 'Raza de perro…',
          minMaxLabel: 'Mín. 2 caracteres, máx. 3 resultados',
          minMaxPlaceholder: 'Escribe al menos 2 caracteres…',
        },
        avatarEditor: {
          result: 'Resultado:',
        },
        badge: {
          successText: 'Activo',
          warningText: 'Pendiente',
          newText: 'Nuevo',
        },
        button: {
          primary: 'Primario',
          secondary: 'Secundario',
          ghost: 'Fantasma',
          danger: 'Peligro',
          toggleLoading: 'Alternar carga',
          fullWidth: 'Ancho completo',
          clickedToast: '¡Botón pulsado!',
        },
        card: {
          elevatedHeader: 'Elevada',
          elevatedBody: 'Tarjeta con sombra.',
          outlinedHeader: 'Con borde',
          outlinedBody: 'Tarjeta con borde.',
          filledHeader: 'Rellena',
          filledBody: 'Tarjeta con fondo sutil.',
          cardTitleHeader: 'Título de la tarjeta',
          cardWithFooterBody: 'Esta tarjeta tiene cabecera, cuerpo y pie con acciones.',
        },
        checkbox: {
          acceptTermsAndConditions: 'Aceptar términos y condiciones',
          disabledChecked: 'Deshabilitado marcado',
          indeterminate: 'Indeterminado',
          iAgreeToTerms: 'Acepto los términos',
          subscribeToUpdates: 'Suscribirse a actualizaciones',
          subscribeHint: 'Se envía un resumen mensual, sin spam',
          acceptTermsLabel: 'Aceptar términos',
          acceptTermsError: 'Hay que aceptar los términos para continuar',
        },
        codeInput: {
          verificationCodeLabel: 'Código de verificación',
          verificationCodeHint: 'Revisa tu correo para el código de 6 dígitos',
          verificationCodeError: 'Código de verificación no válido',
          pinLabel: 'PIN',
          pinHint: 'Introduce tu PIN de 4 dígitos',
        },
        colorPicker: {
          brandLabel: 'Color de marca',
          hintBrandColor: 'Se usa como color principal de la marca',
          errorRequired: 'Este campo es obligatorio',
          hexLabel: 'Formato HEX',
          rgbLabel: 'Formato RGB',
          hslLabel: 'Formato HSL',
          noAlphaHeading: 'Solo opaco',
          opaqueOnlyLabel: 'Color sólido',
        },
        dataTable: {
          tableColumnId: 'ID',
          tableColumnFirstName: 'Nombre',
          tableColumnLastName: 'Apellido',
          tableColumnAdmin: 'Administrador',
          tableColumnPosts: 'Publicaciones',
        },
        datePicker: {
          appointmentLabel: 'Cita',
          pickDatePlaceholder: 'Elige una fecha…',
          hintAnyFutureDate: 'Selecciona cualquier fecha futura',
          errorRequired: 'Este campo es obligatorio',
          shortLabel: 'Corto',
          mediumLabel: 'Mediano',
          longLabel: 'Largo',
          withinNextWeeksLabel: 'En las próximas 3 semanas',
          withinNextWeeksHint: '±1 semana / +3 semanas desde hoy',
        },
        dialog: {
          openButton: 'Abrir diálogo',
          title: 'Título del diálogo',
          body: 'Este es el cuerpo del diálogo. Admite cualquier contenido, incluidos formularios, texto y otros componentes.',
        },
        divider: {
          orLabel: 'o',
          sectionLabel: 'Sección',
          leftLabel: 'Izquierda',
          rightLabel: 'Derecha',
        },
        drawer: {
          openButton: 'Abrir cajón',
          rightButton: 'Derecha',
          leftButton: 'Izquierda',
          topButton: 'Arriba',
          bottomButton: 'Abajo',
          rightTitle: 'Panel derecho',
          rightBody: 'Se desliza desde el borde derecho, útil para paneles de detalles.',
          leftTitle: 'Panel izquierdo',
          leftBody: 'Se desliza desde la izquierda, útil para menús de navegación.',
          topTitle: 'Panel superior',
          topBody: 'Baja desde arriba, útil para notificaciones.',
          bottomTitle: 'Panel inferior',
          bottomBody: 'Sube desde abajo, común en móvil para hojas de acciones.',
        },
        dropdown: {
          fruitLabel: 'Fruta',
          fruitPlaceholder: 'Selecciona una fruta…',
          hintFavourite: 'Elige tu favorita',
          errorRequired: 'Este campo es obligatorio',
          selectPlaceholder: 'Seleccionar…',
        },
        emptyState: {
          noItemsTitle: 'Aún no hay elementos',
          noItemsDescription: 'Empieza creando tu primer elemento.',
          createItem: 'Crear elemento',
          noResultsTitle: 'No se han encontrado resultados',
          noResultsDescription:
            'Prueba a ajustar tu búsqueda o filtro para encontrar lo que buscas.',
          clearFilters: 'Limpiar filtros',
          nothingHereTitle: 'Nada que ver aquí',
        },
        fileUploader: {
          attachmentsLabel: 'Adjuntos',
          imagesLabel: 'Subir imágenes',
          imagesHint: 'PNG o JPEG, hasta 2 MB cada uno, máx. 4 archivos',
          resumeLabel: 'Subir CV',
          customIconLabel: 'Adjuntar archivos',
          withHintHint: 'Hasta 10 MB por archivo',
          withErrorText: 'Se requiere al menos una imagen',
        },
        formField: {
          emailPlaceholder: 'you@example.com',
        },
        input: {
          defaultLabel: 'Predeterminado',
          enterTextPlaceholder: 'Introduce texto…',
          hintGuidance: 'Orientación útil aquí',
          errorRequired: 'Este campo es obligatorio',
          readonlyLabel: 'Solo lectura',
          readonlyValue: 'Valor de solo lectura',
          passwordLabel: 'Contraseña',
          passwordPlaceholder: 'Introduce tu contraseña…',
          passwordNoToggleLabel: 'Contraseña (alternancia oculta)',
          passwordNoTogglePlaceholder: 'Sin alternancia de visibilidad',
          emailLabel: 'Correo',
          emailPlaceholder: 'tu@ejemplo.com',
        },
        menu: {
          openButton: 'Abrir menú',
          edit: 'Editar',
          duplicate: 'Duplicar',
          archive: 'Archivar',
          delete: 'Eliminar',
          file: 'Archivo',
          moreOptionsLabel: 'Más opciones',
          view: 'Ver',
          rename: 'Renombrar',
          newItem: 'Nuevo',
          open: 'Abrir',
          saveUnavailable: 'Guardar (no disponible)',
          saveAs: 'Guardar como',
        },
        popover: {
          openLabel: 'Abrir popover',
          basicContent:
            'Una superficie flotante anclada a su disparador. Úsala como pieza base para menús, desplegables y superposiciones personalizadas.',
          placementTopLabel: 'top',
          placementTopStartLabel: 'top-start',
          placementTopEndLabel: 'top-end',
          placementBottomLabel: 'bottom',
          placementBottomStartLabel: 'bottom-start',
          placementBottomEndLabel: 'bottom-end',
          placementLeftLabel: 'left',
          placementRightLabel: 'right',
          placementTopContent: 'Centrada sobre el disparador',
          placementTopStartContent: 'Sobre el disparador, alineada a su borde izquierdo',
          placementTopEndContent: 'Sobre el disparador, alineada a su borde derecho',
          placementBottomContent: 'Centrada bajo el disparador',
          placementBottomStartContent:
            'Bajo el disparador, alineada a su borde izquierdo',
          placementBottomEndContent: 'Bajo el disparador, alineada a su borde derecho',
          placementLeftContent: 'Centrada a la izquierda del disparador',
          placementRightContent: 'Centrada a la derecha del disparador',
        },
        progressBar: {
          processing: 'Procesando…',
        },
        radio: {
          appleLabel: 'Manzana',
          bananaLabel: 'Plátano',
          cherryLabel: 'Cereza',
          optionALabel: 'Opción A',
          optionBLabel: 'Opción B',
          subscriptionPlanLabel: 'Plan de suscripción',
          freeLabel: 'Gratis',
          proLabel: 'Pro',
          enterpriseLabel: 'Empresarial',
          deliverySpeedLabel: 'Velocidad de entrega',
          deliverySpeedHint: 'Elige la rapidez que quieres',
          standardLabel: 'Estándar',
          expressLabel: 'Exprés',
          accountTypeLabel: 'Tipo de cuenta',
          accountTypeError: 'Elige un tipo de cuenta',
          personalLabel: 'Personal',
          businessLabel: 'Empresa',
        },
        rating: {
          experienceLabel: 'Valora tu experiencia',
          halfStepsLabel: 'Valoración con medios pasos',
          halfStepsHint:
            'Haz clic en la mitad izquierda o derecha de una estrella para incrementos de 0,5.',
          readonlyLabel: 'Valoración media',
          withHintHint: 'Toca una estrella para fijar la valoración',
          withErrorText: 'Se requiere una valoración',
          numberOfStarsLabel: 'Valora',
          customIconLabel: '¿Cuánto te gusta?',
        },
        segmented: {
          viewLabel: 'Vista',
          themeLabel: 'Tema',
          themeHint: 'Afecta a toda la aplicación',
          layoutLabel: 'Disposición',
          layoutError: 'La selección de disposición es obligatoria',
          viewOptionList: 'Lista',
          viewOptionGrid: 'Cuadrícula',
          viewOptionKanban: 'Kanban',
          themeOptionLight: 'Claro',
          themeOptionDark: 'Oscuro',
        },
        slider: {
          volumeLabel: 'Volumen',
          brightnessLabel: 'Brillo',
          withHintLabel: 'Con pista',
          sliderHint: 'Arrastra el control o usa las flechas para ajustar',
          withErrorLabel: 'Con error',
          sliderError: 'Elige un valor superior a 50',
        },
        switch: {
          enableNotificationsLabel: 'Activar notificaciones',
          disabledOnLabel: 'Deshabilitado activado',
          confirmConsentLabel: 'Confirmar consentimiento',
          marketingEmailsLabel: 'Correos de marketing',
          marketingEmailsHint: 'Cancela la suscripción en cualquier momento',
          twoFactorAuthLabel: 'Autenticación de dos factores',
          twoFactorAuthError: 'La autenticación de dos factores debe estar activada',
        },
        tabs: {
          account: 'Cuenta',
          accountContent: 'Contenido de ajustes de la cuenta',
          security: 'Seguridad',
          securityContent: 'Contenido de ajustes de seguridad',
          notifications: 'Notificaciones',
          notificationsContent: 'Preferencias de notificación',
          overview: 'Resumen',
          overviewContent: 'Contenido del resumen',
          analytics: 'Analíticas',
          analyticsContent: 'Contenido de analíticas',
          reports: 'Informes',
          reportsContent: 'Contenido de informes',
          general: 'General',
          generalContent: 'Ajustes generales',
          billing: 'Facturación',
          billingContent: 'Detalles de facturación',
          admin: 'Administración',
          adminContent: 'Panel de administración',
        },
        tag: {
          disabledSuccess: 'Éxito deshabilitado',
        },
        textarea: {
          messageLabel: 'Mensaje',
          messagePlaceholder: 'Introduce tu mensaje…',
          hintMaxCharacters: 'Máximo 500 caracteres',
          errorRequired: 'Este campo es obligatorio',
          fixedSizeLabel: 'Tamaño fijo',
          fixedSizePlaceholder: 'No se puede redimensionar',
          readonlyLabel: 'Solo lectura',
          readonlyValue: 'Contenido de solo lectura',
        },
        toast: {
          message: variant => {
            const labels: Record<string, string> = {
              default: 'predeterminado',
              success: 'de éxito',
              warning: 'de aviso',
              error: 'de error',
              info: 'informativo',
            };
            return `Este es un toast ${labels[variant] ?? variant}`;
          },
        },
        tooltip: {
          triggerLabel: '(pasa el ratón por encima)',
          templateTriggerLabel: '(pasa el cursor para un tooltip con plantilla)',
          templateTipStatus: 'En línea ahora',
          topLabel: 'Arriba',
          topTooltip: 'Descripción arriba',
          bottomLabel: 'Abajo',
          bottomTooltip: 'Descripción abajo',
          leftLabel: 'Izquierda',
          leftTooltip: 'Descripción izquierda',
          rightLabel: 'Derecha',
          rightTooltip: 'Descripción derecha',
        },
        transferList: {
          sourceLabel: 'Disponibles',
          targetLabel: 'Seleccionados',
          roleAdmin: 'Administrador',
          roleEditor: 'Editor',
          roleViewer: 'Lector',
          roleGuest: 'Invitado',
          roleBilling: 'Facturación',
          roleOwner: 'Propietario',
        },
        virtualList: {
          row: 'Fila',
          detail: n => `Registro generado n.º${n}`,
          scrollPosition: (first, total) =>
            `Mostrando fila ${first.toLocaleString('es-ES')} de ${total.toLocaleString('es-ES')}`,
        },
        commandPalette: {
          hint: 'Pulsa Ctrl + K (o Cmd + K) para abrir la paleta de comandos desde cualquier punto de la página.',
          openButton: 'Abrir paleta de comandos',
          fileGroup: 'Archivo',
          editGroup: 'Editar',
          newFile: 'Nuevo archivo',
          openFile: 'Abrir archivo',
          save: 'Guardar',
          find: 'Buscar',
          findKeyword: 'búsqueda',
          replace: 'Reemplazar',
          undo: 'Deshacer',
          toggleTheme: 'Cambiar tema',
          toggleThemeDescription: 'Alternar entre modo claro y oscuro',
          lockWorkspace: 'Bloquear espacio de trabajo',
          lockWorkspaceDescription: 'Actualmente deshabilitado, función en beta',
          executedToast: label => `Ejecutado: ${label}`,
        },
        avatarEditorActions: {
          avatarUpdatedToast: 'Avatar actualizado',
        },
      },
      playground: {
        controls: 'Opciones',
        reset: 'Restablecer',
        code: 'Código',
        apiReference: 'Referencia de la API',
        inputs: 'Entradas',
        outputs: 'Salidas',
        methods: 'Métodos',
        colName: 'Nombre',
        colType: 'Tipo',
        colDefault: 'Predeterminado',
        colDescription: 'Descripción',
        errorMessagesDescription:
          'Sustituye el mensaje de validación por clave de error en un control de formulario vinculado; las claves sin definir usan el valor predeterminado localizado.',
        ariaLabelDescription:
          'Nombre accesible anunciado por las tecnologías de asistencia cuando el componente no muestra ninguna etiqueta visible.',
        triggerErrorLabel: 'Provocar error',
        requiredBadge: 'obligatorio',
        twoWayBadge: 'bidireccional',
        rangeHint: { between: 'a', min: 'Mín', max: 'Máx' },
        knobLabels: {
          timeline: { orientation: 'Orientación', align: 'Alineación', size: 'Tamaño' },
          tooltip: {
            eaTooltip: 'Contenido del tooltip',
          },
          input: {
            label: 'Etiqueta',
            placeholder: 'Marcador de posición',
            size: 'Tamaño',
            type: 'Tipo',
            disabled: 'Deshabilitado',
            readonly: 'Solo lectura',
            required: 'Obligatorio',
            autofocus: 'Enfoque automático',
            showPasswordToggle: 'Mostrar botón de contraseña',
            clearable: 'Con botón de borrado',
            autocomplete: 'Autocompletar',
          },
          'number-input': {
            allowNegative: 'Permitir negativos',
            label: 'Etiqueta',
            placeholder: 'Marcador de posición',
            size: 'Tamaño',
            min: 'Mínimo',
            max: 'Máximo',
            step: 'Paso',
            disabled: 'Deshabilitado',
            readonly: 'Solo lectura',
            required: 'Obligatorio',
          },
          'form-field': {
            size: 'Tamaño',
            label: 'Etiqueta',
            hint: 'Ayuda',
            required: 'Obligatorio',
          },
          alert: {
            variant: 'Variante',
            dismissible: 'Descartable',
            size: 'Tamaño',
            icon: 'Icono (sustituir)',
          },
          avatar: {
            size: 'Tamaño',
            shape: 'Forma',
            src: 'Origen de la imagen',
            initials: 'Iniciales',
            alt: 'Texto alternativo',
          },
          badge: {
            variant: 'Variante',
            size: 'Tamaño',
            shape: 'Forma',
          },
          button: {
            variant: 'Variante',
            size: 'Tamaño',
            type: 'Tipo',
            disabled: 'Deshabilitado',
            loading: 'Cargando',
            fullWidth: 'Ancho completo',
          },
          card: {
            variant: 'Variante',
            padding: 'Relleno',
            headerAlign: 'Alineación del encabezado',
            fullWidth: 'Ancho completo',
            headerDivider: 'Separador del encabezado',
          },
          checkbox: {
            label: 'Etiqueta',
            count: 'Recuento',
            size: 'Tamaño',
            disabled: 'Deshabilitado',
            required: 'Obligatorio',
            indeterminate: 'Indeterminado',
          },
          'code-input': {
            size: 'Tamaño',
            length: 'Longitud',
            label: 'Etiqueta',
            placeholder: 'Marcador de posición',
            disabled: 'Deshabilitado',
            readonly: 'Solo lectura',
            required: 'Obligatorio',
          },
          'color-picker': {
            label: 'Etiqueta',
            placeholder: 'Marcador de posición',
            size: 'Tamaño',
            format: 'Formato',
            showAlpha: 'Mostrar alfa',
            clearable: 'Borrable',
            disabled: 'Deshabilitado',
            readonly: 'Solo lectura',
            required: 'Obligatorio',
          },
          divider: {
            orientation: 'Orientación',
            label: 'Etiqueta',
          },
          'eagami-wordmark': {
            variant: 'Variante',
            layout: 'Disposición',
            size: 'Tamaño (px)',
            linked: 'Enlazado',
          },
          'empty-state': {
            size: 'Tamaño',
            headingLevel: 'Nivel de encabezado',
            title: 'Título',
            description: 'Descripción',
          },
          paginator: {
            align: 'Alineación',
            showPageSizeSelector: 'Mostrar selector de tamaño de página',
            showRangeLabel: 'Mostrar etiqueta de rango',
            disabled: 'Deshabilitado',
            totalItems: 'Total de elementos',
          },
          'progress-bar': {
            variant: 'Variante',
            size: 'Tamaño',
            value: 'Valor',
            max: 'Máximo',
            buffer: 'Búfer',
            showPercentage: 'Mostrar porcentaje',
            indeterminate: 'Indeterminado',
            label: 'Etiqueta',
          },
          radio: {
            label: 'Etiqueta',
            disabled: 'Deshabilitado',
          },
          'range-slider': {
            label: 'Etiqueta',
            hint: 'Ayuda',
            errorMsg: 'Mensaje de error',
            min: 'Mínimo',
            max: 'Máximo',
            step: 'Paso',
            size: 'Tamaño',
            showValue: 'Mostrar valor',
            showMinMaxLabels: 'Mostrar etiquetas mín./máx.',
            disabled: 'Deshabilitado',
            required: 'Obligatorio',
          },
          rating: {
            label: 'Etiqueta',
            size: 'Tamaño',
            min: 'Mínimo',
            max: 'Máximo',
            allowHalf: 'Permitir medios pasos',
            readonly: 'Solo lectura',
            disabled: 'Deshabilitado',
            required: 'Obligatorio',
            clearable: 'Con botón de borrado',
            iconClass: 'Icono',
          },
          skeleton: {
            variant: 'Variante',
            animated: 'Animado',
            width: 'Ancho',
            height: 'Alto',
          },
          slider: {
            size: 'Tamaño',
            min: 'Mín.',
            max: 'Máx.',
            step: 'Paso',
            showValue: 'Mostrar valor',
            showMinMaxLabels: 'Mostrar etiquetas mín./máx.',
            disabled: 'Deshabilitado',
            required: 'Obligatorio',
            hasError: 'Estado de error',
            label: 'Etiqueta',
          },
          spinner: {
            size: 'Tamaño',
            label: 'Etiqueta',
          },
          switch: {
            label: 'Etiqueta',
            size: 'Tamaño',
            disabled: 'Deshabilitado',
            required: 'Obligatorio',
          },
          tag: {
            variant: 'Variante',
            size: 'Tamaño',
            removable: 'Eliminable',
            disabled: 'Deshabilitado',
            removeLabel: 'Etiqueta de eliminación',
          },
          textarea: {
            label: 'Etiqueta',
            placeholder: 'Marcador de posición',
            size: 'Tamaño',
            resize: 'Redimensionar',
            maxlength: 'Longitud máxima (chars)',
            minHeight: 'Altura mínima (px)',
            maxHeight: 'Altura máxima (px)',
            disabled: 'Deshabilitado',
            readonly: 'Solo lectura',
            required: 'Obligatorio',
          },
        },
        knobNotes: { accordion: { headingLevel: '(solo semántico)' } },

        descriptions: {
          timeline: {
            items: 'Los eventos que se mostrarán, en orden.',
            orientation: 'Dirección en la que fluye la línea de tiempo.',
            align:
              'Ubicación del contenido respecto a la línea; alternate solo se aplica a líneas de tiempo verticales.',
            size: 'Tamaño visual de la línea de tiempo.',
          },
          toast: {
            size: 'Tamaño visual aplicado a cada toast de la pila.',
            position: 'Esquina o borde de la ventana donde se ancla la pila de toasts.',
            clearable: 'Muestra un botón de cierre en cada toast.',
          },
          input: {
            label: 'Etiqueta mostrada encima del campo.',
            type: 'Tipo nativo del campo (password añade un botón de mostrar/ocultar integrado).',
            placeholder: 'Texto de marcador mostrado mientras el campo está vacío.',
            size: 'Tamaño visual del campo.',
            hint: 'Texto de ayuda mostrado bajo el campo, oculto cuando hay un error.',
            errorMsg:
              'Mensaje de error mostrado bajo el campo, que sustituye la ayuda y marca el campo como no válido.',
            disabled: 'Deshabilita el campo.',
            readonly: 'Muestra el campo como de solo lectura.',
            required: 'Marca el campo como obligatorio.',
            autocomplete: 'Valor del atributo nativo autocomplete.',
            list: 'id de un <datalist> que asociar para sugerencias nativas.',
            autofocus: 'Enfoca el campo una vez, tras su primer renderizado.',
            showPasswordToggle:
              'Muestra el botón de mostrar/ocultar para los campos password.',
            clearable: 'Muestra un botón de borrado cuando el campo tiene un valor.',
            id: 'id aplicado al campo nativo y al for de la etiqueta, generado automáticamente si se omite.',
            value:
              'Valor actual del campo, vinculable en dos sentidos mediante [(value)].',
            blurred: 'Se emite cuando el campo pierde el foco.',
            focused: 'Se emite cuando el campo recibe el foco.',
            clear: 'Borra el valor actual y devuelve el foco al campo.',
            focus: 'Lleva el foco del teclado al campo nativo subyacente.',
            togglePasswordVisibility:
              'Alterna la visibilidad de la contraseña para los campos type="password".',
            icon: 'Componente de icono inicial renderizado antes del texto.',
            max: 'Valor máximo para type="number"; el valor se acota a él al perder el foco.',
            maxLength:
              'Número máximo de caracteres; aplicado para type="number" donde el maxlength nativo se ignora.',
            min: 'Valor mínimo para type="number"; el valor se acota a él al perder el foco.',
            minLength:
              'Número mínimo de caracteres, pasado como atributo nativo minlength.',
            step: 'Incremento de paso para los campos type="number".',
            clampToBounds:
              'Acota un valor numérico dentro del rango mín./máx. configurado una vez que finaliza la edición.',
          },
          'number-input': {
            allowNegative:
              'Si se permiten valores negativos; con false, el valor se limita a 0.',
            label: 'Etiqueta mostrada encima del campo.',
            placeholder: 'Texto de marcador mostrado mientras el campo está vacío.',
            size: 'Tamaño visual del campo.',
            hint: 'Texto de ayuda mostrado bajo el campo, oculto cuando hay un error.',
            errorMsg:
              'Mensaje de error mostrado bajo el campo, que sustituye la ayuda y marca el campo como no válido.',
            disabled: 'Deshabilita el campo.',
            readonly: 'Muestra el campo como de solo lectura.',
            required: 'Marca el campo como obligatorio.',
            min: 'Valor mínimo; los valores introducidos se acotan a él al perder el foco y los botones de paso lo respetan.',
            max: 'Valor máximo; los valores introducidos se acotan a él al perder el foco y los botones de paso lo respetan.',
            step: 'Cantidad que cada paso (tecla de flecha o botón de paso) suma o resta.',
            id: 'id aplicado al campo nativo y al for de la etiqueta, generado automáticamente si se omite.',
            value:
              'Valor actual del campo, null cuando está vacío, vinculable en dos sentidos mediante [(value)].',
            changed: 'Se emite con el nuevo valor cada vez que cambia.',
            focused: 'Se emite cuando el campo recibe el foco.',
            blurred: 'Se emite cuando el campo pierde el foco.',
            focus: 'Lleva el foco del teclado al campo nativo subyacente.',
          },
          accordion: {
            size: 'Tamaño visual del acordeón; cada elemento lo hereda.',
            multi: 'Permite mantener varios elementos abiertos a la vez.',
            headingLevel:
              'Nivel de encabezado (1-6) aplicado a cada encabezado de elemento, para que el acordeón encaje en el esquema de la página.',
          },
          alert: {
            dismissible:
              'Muestra un botón de cierre que permite al usuario descartar la alerta.',
            variant:
              'Esquema de color semántico que determina el icono y la paleta de la alerta.',
            visible:
              'Indica si la alerta se muestra, vinculable en dos sentidos mediante [(visible)].',
            dismissed:
              'Se emite cuando el usuario descarta la alerta mediante su botón de cierre.',
            dismiss: 'Oculta la alerta y emite el evento dismissed.',
            size: 'Escala conjuntamente el texto, el icono y el espaciado.',
            icon: 'Sustituye el icono de estado predeterminado de la variante por cualquier componente de icono.',
          },
          avatar: {
            src: 'URL de la imagen que mostrar; recurre a las iniciales y, después, a un icono de usuario genérico.',
            alt: 'Texto alternativo para la imagen del avatar.',
            initials: 'Iniciales mostradas cuando no se proporciona un origen de imagen.',
            size: 'Preajuste de diámetro del avatar.',
            shape: 'Contorno del avatar: redondo o cuadrado con esquinas redondeadas.',
          },
          badge: {
            variant: 'Esquema de color semántico de la insignia.',
            size: 'Tamaño visual de la insignia.',
            shape:
              'Forma exterior de la insignia (pill se ajusta al contenido, pin se muestra como un círculo para caracteres individuales).',
          },
          button: {
            variant: 'Estilo visual del botón, que determina su color y énfasis.',
            size: 'Tamaño visual del botón.',
            type: 'Atributo type nativo aplicado al elemento de botón subyacente.',
            disabled: 'Deshabilita el botón y suprime los eventos de clic.',
            loading:
              'Sustituye la etiqueta por un indicador de carga conservando el ancho renderizado.',
            fullWidth: 'Estira el botón para ocupar el ancho de su contenedor.',
            ariaLabel:
              'Etiqueta accesible para el botón cuando su contenido no es lo bastante descriptivo.',
            ariaCurrent:
              'Valor del atributo nativo aria-current, que marca el botón como el elemento actual de un conjunto.',
            clicked:
              'Se emite cuando se activa el botón, suprimido mientras está deshabilitado o cargando.',
            icon: 'Componente de icono opcional renderizado a la izquierda de la etiqueta.',
          },
          card: {
            variant: 'Estilo visual de la superficie de la tarjeta.',
            padding: 'Preajuste de relleno aplicado al área de contenido de la tarjeta.',
            headerAlign: 'Alineación horizontal del contenido del encabezado.',
            fullWidth: 'Estira la tarjeta para ocupar el ancho disponible.',
            headerDivider: 'Muestra un separador entre el encabezado y el cuerpo.',
          },
          checkbox: {
            ariaLabel:
              'Nombre accesible para la casilla cuando no se renderiza ninguna etiqueta visible.',
            checked:
              'Estado actual de marcado, vinculable en dos sentidos mediante [(checked)].',
            count: 'Valor complementario mostrado atenuado justo después de la etiqueta.',
            disabled: 'Deshabilita la casilla.',
            errorMsg:
              'Mensaje de error mostrado bajo el campo, que sustituye la ayuda y marca el campo como no válido.',
            hint: 'Texto de ayuda mostrado bajo el campo, oculto cuando hay un error.',
            id: 'id aplicado al campo nativo y al for de la etiqueta, generado automáticamente si se omite.',
            indeterminate: 'Muestra la casilla en un estado visualmente indeterminado.',
            label: 'Etiqueta de texto mostrada junto a la casilla.',
            required: 'Marca la casilla como obligatoria.',
            size: 'Tamaño visual de la casilla.',
            changed:
              'Se emite con el nuevo estado de marcado cada vez que el usuario alterna la casilla.',
          },
          'code-input': {
            disabled: 'Deshabilita todas las celdas de dígitos.',
            errorMsg:
              'Mensaje de error mostrado bajo el campo, que sustituye la ayuda y marca el campo como no válido.',
            hint: 'Texto de ayuda mostrado bajo el campo, oculto cuando hay un error.',
            id: 'id aplicado a las celdas de dígitos y al for de la etiqueta, generado automáticamente si se omite.',
            label: 'Etiqueta de texto mostrada encima del campo.',
            length: 'Número de celdas de dígitos que componen el código.',
            placeholder: 'Texto de marcador de posición repartido un carácter por celda.',
            readonly: 'Muestra el campo como de solo lectura.',
            required: 'Marca el campo como obligatorio.',
            size: 'Tamaño visual de cada celda de dígito.',
            value:
              'Valor actual del código, vinculable en dos sentidos mediante [(value)].',
            completed:
              'Se emite con el código completo una vez que se han introducido todos los dígitos.',
            focus:
              'Lleva el foco del teclado al siguiente dígito vacío (o al último cuando está completo).',
            allowAllChars:
              'Permite cualquier carácter que no sea un espacio; de lo contrario, solo se aceptan dígitos.',
          },
          'color-picker': {
            disabled: 'Deshabilita el campo.',
            errorMsg:
              'Mensaje de error mostrado bajo el campo, que sustituye la ayuda y marca el campo como no válido.',
            format: 'Formato de salida del valor de color emitido (hex, rgb o hsl).',
            hint: 'Texto de ayuda mostrado bajo el campo, oculto cuando hay un error.',
            id: 'id aplicado al activador y al for de la etiqueta, generado automáticamente si se omite.',
            label: 'Etiqueta de texto mostrada encima del campo.',
            placeholder:
              'Marcador de posición mostrado en el activador mientras no hay ningún color seleccionado.',
            presets:
              'Muestras predefinidas mostradas en la parte inferior del popover; pasa un array vacío para ocultarlas.',
            readonly:
              'Muestra el campo como de solo lectura, impidiendo que el popover se abra.',
            required: 'Marca el campo como obligatorio.',
            showAlpha:
              'Muestra el control deslizante de alfa e incluye el alfa en el valor emitido.',
            clearable:
              'Si se muestra el botón de borrado cuando hay un valor establecido.',
            size: 'Tamaño visual del activador del selector.',
            value:
              'Cadena de color actual, vinculable en dos sentidos mediante [(value)].',
            changed:
              'Se emite con la nueva cadena de color cada vez que cambia la selección.',
            cycleInputMode:
              'Alterna la fila de entrada del popover entre la cadena hex y los canales RGB.',
            hasEyeDropper: 'Devuelve si el navegador admite la API EyeDropper.',
            onHexInput:
              'Aplica el texto hex introducido al color actual a medida que el usuario lo edita.',
            onPopoverCloseRequested:
              'Cierra el popover cuando el usuario hace clic fuera del selector.',
          },
          divider: {
            label:
              'Etiqueta centrada opcional renderizada dentro de la línea del separador.',
            orientation: 'Orientación en la que se traza la línea del separador.',
            thick: 'Muestra una regla más gruesa.',
          },
          'eagami-wordmark': {
            variant:
              'Variante de contenido: default es el logotipo de texto sin más, byline añade la línea de autoría, tagline añade el eslogan.',
            layout:
              'Dispone el logotipo de texto apilado en varias líneas o en línea en una sola.',
            size: 'Tamaño de fuente en px del texto de marca; el resto del logotipo se escala a partir de él.',
            linked:
              'Muestra el logotipo como enlace a eagami.com; desactívalo para incrustarlo en un enlace propio o un contexto estático.',
          },
          'empty-state': {
            title: 'Texto del encabezado mostrado encima de la descripción.',
            description: 'Texto de apoyo mostrado bajo el título.',
            size: 'Tamaño visual del bloque de estado vacío.',
            headingLevel:
              'Nivel de encabezado usado para el título de modo que encaje en el esquema del documento circundante.',
            bordered: 'Muestra un marco de línea discontinua alrededor del bloque.',
            icon: 'Componente de icono opcional renderizado en el área de medios encima del título.',
          },
          paginator: {
            groupThousands:
              'Agrupa los millares con comas en el rango y los números de página.',
            size: 'Tamaño visual del paginador y sus controles.',
            align:
              'Alineación horizontal de los controles del paginador dentro de su contenedor.',
            disabled: 'Deshabilita todos los controles del paginador.',
            page: 'Número de página actual, vinculable en dos sentidos mediante [(page)].',
            pageSize:
              'Número de elementos mostrados por página, vinculable en dos sentidos mediante [(pageSize)].',
            pageSizeOptions:
              'Tamaños de página seleccionables ofrecidos en el selector de tamaño de página.',
            showPageSizeSelector: 'Muestra el control de selección de tamaño de página.',
            showRangeLabel:
              'Muestra la etiqueta que describe el rango de elementos visible.',
            totalItems:
              'Número total de elementos usado para calcular el número de páginas.',
            changed:
              'Se emite cuando el usuario cambia la página actual o el tamaño de página.',
            goToPage: 'Navega a la página indicada, acotada dentro del rango válido.',
            nextPage: 'Navega a la página siguiente si existe.',
            prevPage: 'Navega a la página anterior si existe.',
          },
          'progress-bar': {
            variant: 'Variante de color de la barra.',
            size: 'Grosor visual de la barra.',
            value: 'Valor de progreso actual.',
            max: 'Valor con el que la barra está llena.',
            buffer:
              'Posición de búfer por delante del valor, mostrada en el color secundario.',
            showPercentage: 'Muestra el porcentaje actual junto a la barra.',
            indeterminate:
              'Reproduce una animación en bucle para progreso de duración desconocida.',
            label: 'Etiqueta de texto mostrada encima de la barra.',
          },
          radio: {
            disabled: 'Deshabilita esta opción.',
            id: 'id aplicado al campo de radio nativo y al for de la etiqueta, generado automáticamente si se omite.',
            label: 'Etiqueta de texto mostrada junto al radio.',
            value: 'Valor que esta opción aporta a su grupo padre cuando se selecciona.',
          },
          'range-slider': {
            ariaLabelHigh:
              'Etiqueta accesible para el control alto (final), que recurre a la etiqueta del campo si se omite.',
            ariaLabelLow:
              'Etiqueta accesible para el control bajo (inicial), que recurre a la etiqueta del campo si se omite.',
            disabled: 'Deshabilita el control deslizante.',
            errorMsg:
              'Mensaje de error mostrado bajo el control deslizante, que sustituye la ayuda y marca el campo como no válido.',
            formatValue: 'Formateador aplicado a cada valor antes de mostrarse.',
            hint: 'Texto de ayuda mostrado bajo el control deslizante, oculto cuando hay un error.',
            id: 'id aplicado al control deslizante, generado automáticamente si se omite.',
            label: 'Etiqueta de texto mostrada encima del control deslizante.',
            max: 'Valor más alto que puede alcanzar cualquiera de los controles.',
            min: 'Valor más bajo que puede alcanzar cualquiera de los controles.',
            required: 'Marca el campo como obligatorio.',
            showMinMaxLabels:
              'Muestra los límites mín. y máx. en los extremos de la pista.',
            showValue:
              'Muestra los valores bajo y alto actuales junto al control deslizante.',
            size: 'Tamaño visual de la pista y los controles.',
            step: 'Incremento al que se ajusta cada control al moverse.',
            value:
              'Tupla de rango [bajo, alto] actual, vinculable en dos sentidos mediante [(value)].',
            changed:
              'Se emite con la nueva tupla [bajo, alto] cada vez que se mueve cualquiera de los controles.',
            commitThumb:
              'Ajusta un control al paso más cercano, lo acota a los límites y lo restringe por el control opuesto.',
            groupThousands:
              'Agrupa los valores mostrados con separadores de miles, ignorado cuando se proporciona un formatValue personalizado.',
            formatDisplay:
              'Formatea un valor para su visualización, aplicando la agrupación de miles a menos que se establezca una función formatValue personalizada.',
          },
          rating: {
            allowHalf:
              'Permite granularidad de media estrella, dejando que el valor avance en incrementos de 0,5.',
            clearable:
              'Hacer clic en el valor actual borra la valoración volviéndola a 0.',
            disabled: 'Deshabilita la valoración.',
            errorMsg:
              'Mensaje de error mostrado bajo la valoración, que sustituye la ayuda y la marca como no válida.',
            halfIconClass:
              'Clase de componente independiente renderizada para las posiciones de media estrella cuando allowHalf es true.',
            hint: 'Texto de ayuda mostrado bajo la valoración, oculto cuando hay un error.',
            iconClass:
              'Clase de componente independiente renderizada para las posiciones vacías y llenas.',
            id: 'id aplicado a la valoración y a su etiqueta, generado automáticamente si se omite.',
            label: 'Etiqueta de texto mostrada encima de la valoración.',
            max: 'Valor de valoración más alto y número de estrellas renderizadas.',
            min: 'Valor de valoración más bajo que el usuario puede seleccionar.',
            readonly:
              'Muestra la valoración como solo visualización, ignorando los clics y la entrada de teclado.',
            required: 'Marca la valoración como obligatoria.',
            size: 'Tamaño visual de la valoración.',
            value:
              'Valor de valoración actual, vinculable en dos sentidos mediante [(value)].',
            hoverChanged:
              'Se emite con el valor previsualizado al pasar el cursor, y null cuando el cursor sale.',
            iconForState:
              'Devuelve la clase de componente que instanciar para un estado de estrella dado.',
            stateFor:
              'Resuelve el estado de renderizado (vacío, medio o lleno) para una posición de estrella.',
          },
          skeleton: {
            animated:
              'Reproduce la animación de brillo pulsante, suprimida automáticamente cuando el usuario prefiere menos movimiento.',
            height:
              'Altura CSS explícita aplicada al marcador de posición, que toma por defecto el tamaño intrínseco de la forma si se omite.',
            variant:
              'Preajuste de forma del marcador de posición: línea de texto, círculo o rectángulo.',
            width:
              'Ancho CSS explícito aplicado al marcador de posición, que toma por defecto el tamaño intrínseco de la forma si se omite.',
          },
          slider: {
            ariaLabel:
              'Etiqueta accesible aplicada cuando no se renderiza ninguna etiqueta visible.',
            disabled: 'Deshabilita el control deslizante.',
            errorMsg:
              'Mensaje de error mostrado bajo el control deslizante, que sustituye la ayuda y marca el campo como no válido.',
            formatValue:
              'Formateador que convierte el valor numérico en el texto mostrado.',
            hasError:
              'Fuerza el estilo de estado de error sin vincular un mensaje de error.',
            hint: 'Texto de ayuda mostrado bajo el control deslizante, oculto cuando hay un error.',
            id: 'id aplicado al control deslizante y a su etiqueta, generado automáticamente si se omite.',
            label: 'Etiqueta de texto mostrada encima del control deslizante.',
            max: 'Valor más alto que puede alcanzar el control deslizante.',
            min: 'Valor más bajo que puede alcanzar el control deslizante.',
            required: 'Marca el control deslizante como obligatorio.',
            showMinMaxLabels: 'Muestra los límites mín. y máx. bajo la pista.',
            showValue: 'Muestra el valor actual junto a la etiqueta.',
            size: 'Tamaño visual de la pista y el control del deslizante.',
            step: 'Incremento al que se ajusta el valor a medida que se mueve el control deslizante.',
            value:
              'Valor actual del control deslizante, vinculable en dos sentidos mediante [(value)].',
            changed:
              'Se emite con el nuevo valor ajustado cada vez que se mueve el control deslizante.',
            groupThousands:
              'Agrupa los valores mostrados con separadores de miles, ignorado cuando se proporciona un formatValue personalizado.',
            formatDisplay:
              'Formatea un valor para su visualización, aplicando la agrupación de miles a menos que se establezca una función formatValue personalizada.',
          },
          spinner: {
            label:
              'Etiqueta accesible anunciada a la tecnología de asistencia, que recurre a la traducción del idioma activo si no se establece.',
            size: 'Tamaño visual del indicador de carga.',
          },
          switch: {
            ariaLabel:
              'Etiqueta accesible para el interruptor cuando no se renderiza ninguna etiqueta visible.',
            checked:
              'Estado actual de encendido/apagado, vinculable en dos sentidos mediante [(checked)].',
            disabled: 'Deshabilita el interruptor y bloquea su alternancia.',
            errorMsg:
              'Mensaje de error mostrado bajo el interruptor, que sustituye la ayuda y marca el campo como no válido.',
            hint: 'Texto de ayuda mostrado bajo el interruptor, oculto cuando hay un error.',
            id: 'id aplicado a la casilla subyacente y al for de la etiqueta, generado automáticamente si se omite.',
            label: 'Etiqueta de texto mostrada junto al interruptor.',
            required: 'Marca el interruptor como obligatorio.',
            size: 'Tamaño visual del interruptor.',
            changed:
              'Se emite con el nuevo estado de marcado cada vez que el usuario alterna el interruptor.',
          },
          tag: {
            variant: 'Esquema de color semántico de la etiqueta.',
            size: 'Tamaño visual de la etiqueta.',
            removable:
              'Renderiza un botón de eliminación que emite removed cuando se activa.',
            disabled: 'Deshabilita la etiqueta y su botón de eliminación.',
            removeLabel:
              'Etiqueta accesible para el botón de eliminación, que recurre al idioma activo.',
            removed:
              'Se emite cuando el usuario activa el botón de eliminación en una etiqueta eliminable.',
          },
          textarea: {
            disabled: 'Deshabilita el campo.',
            errorMsg:
              'Mensaje de error mostrado bajo el campo, que sustituye la ayuda y marca el campo como no válido.',
            hint: 'Texto de ayuda mostrado bajo el campo, oculto cuando hay un error.',
            id: 'id aplicado al textarea nativo y al for de la etiqueta, generado automáticamente si se omite.',
            label: 'Etiqueta de texto mostrada encima del campo.',
            maxHeight:
              'Límite en píxeles para la altura del campo; al superarlo, el textarea se desplaza verticalmente en lugar de crecer.',
            minHeight: 'Altura mínima en px; nunca inferior a la altura predeterminada.',
            maxlength: 'Número máximo de caracteres que acepta el campo.',
            placeholder: 'Marcador de posición mostrado mientras el campo está vacío.',
            readonly: 'Muestra el campo como de solo lectura.',
            required: 'Marca el campo como obligatorio.',
            resize: 'Eje a lo largo del cual el usuario puede redimensionar el campo.',
            size: 'Tamaño visual del campo.',
            value:
              'Valor actual del campo, vinculable en dos sentidos mediante [(value)].',
            blurred: 'Se emite cuando el campo pierde el foco.',
            focused: 'Se emite cuando el campo recibe el foco.',
            focus: 'Lleva el foco del teclado al textarea nativo subyacente.',
          },
          'avatar-editor': {
            accept:
              'Tipos MIME aceptados por el selector de archivos, transmitidos al campo nativo.',
            canvasSize: 'Ancho y alto en píxeles del lienzo de recorte cuadrado.',
            cropState:
              'Estado inicial de desplazamiento/zoom que se restaura al cargar una imagen fuente.',
            currentSrc: 'URL de la imagen que se carga en el editor al inicializarse.',
            exportQuality:
              'Calidad JPEG/WebP al exportar la imagen recortada, entre 0 y 1.',
            exportType:
              'Tipo MIME del blob de imagen exportado (p. ej. image/png o image/jpeg).',
            loading:
              'Muestra un esqueleto de carga mientras se carga un recurso externo.',
            maxFileSize:
              'Tamaño máximo de archivo en bytes; los archivos que superan el límite emiten errored.',
            maxZoom: 'Multiplicador de zoom máximo que puede alcanzar el usuario.',
            minZoom: 'Multiplicador de zoom mínimo que puede alcanzar el usuario.',
            shape:
              'Forma de la máscara de recorte aplicada al lienzo y a la imagen exportada.',
            cropped:
              'Se emite cuando el usuario exporta un recorte, proporcionando un Blob y una URL de datos.',
            cropStateChanged:
              'Se emite cada vez que el usuario desplaza o amplía la imagen, útil para persistir el estado de edición.',
            errored:
              'Se emite con un mensaje legible cuando falla la validación del archivo.',
            fileSelected:
              'Se emite cuando se elige un archivo del disco o se suelta en el editor.',
            removed:
              'Se emite cuando la imagen actual se elimina mediante el control de eliminación.',
            captureOriginal:
              'Establece la imagen actual y el estado de recorte como referencia para revertImage.',
            exportCrop:
              'Renderiza el recorte actual en un lienzo fuera de pantalla, emite cropped y resuelve con el Blob.',
            openFilePicker: 'Abre el cuadro de diálogo nativo de selección de archivos.',
            removeImage:
              'Elimina la imagen cargada y restablece el desplazamiento y el zoom a los valores predeterminados.',
            revertImage:
              'Restaura la imagen y el estado de recorte capturados por la llamada más reciente a captureOriginal.',
            setZoom:
              'Establece el nivel de zoom, limitado al rango configurado entre minZoom y maxZoom.',
            updateImageDarkness:
              'Muestrea la región de recorte visible para determinar si la imagen es más oscura que el gris medio.',
          },
          'menu-trigger': {
            menu: 'La instancia ea-menu que controla este disparador.',
          },
          tooltip: {
            maxWidth:
              'Ancho máximo en píxeles; el texto se ajusta a este ancho (mínimo 50px).',
            eaTooltip:
              'Contenido de la descripción emergente mostrada al pasar el cursor y al enfocar con el teclado. Acepta una cadena de texto o un TemplateRef para contenido con estilos.',
            tooltipPosition:
              'Posición de la descripción emergente respecto a su elemento anfitrión.',
          },
          'time-picker': {
            disabled: 'Deshabilita el selector.',
            errorMsg:
              'Mensaje de error mostrado bajo el campo, que sustituye la ayuda y marca el campo como no válido.',
            format:
              'Formato de visualización de la etiqueta del activador; el valor transmitido es siempre en formato de 24 horas.',
            hint: 'Texto de ayuda mostrado bajo el campo, oculto cuando hay un error.',
            id: 'id aplicado al activador y al for de la etiqueta, generado automáticamente si se omite.',
            includeSeconds:
              'Muestra una columna de segundos junto a las horas y los minutos.',
            label: 'Etiqueta de texto mostrada encima del campo.',
            minuteStep:
              'Incremento al que se ajusta la columna de minutos al avanzar o arrastrar.',
            placeholder:
              'Marcador de posición mostrado en el activador mientras no hay ninguna hora seleccionada.',
            readonly:
              'Muestra el campo como de solo lectura, impidiendo que el popover se abra.',
            required: 'Marca el campo como obligatorio.',
            secondStep:
              'Incremento al que se ajusta la columna de segundos al avanzar o arrastrar.',
            size: 'Tamaño visual del activador del selector.',
            value:
              'Cadena de hora actual en HH:MM o HH:MM:SS (24 horas), vinculable en dos sentidos mediante [(value)], o null cuando no está establecida.',
            changed:
              'Se emite con la nueva cadena de hora cada vez que el usuario cambia la hora seleccionada.',
            advanceFocus:
              'Lleva el foco a la siguiente columna de unidad cuando la entrada de un dígito está completa.',
            cannotExtend:
              'Devuelve true cuando ningún dígito adicional puede extender válidamente el búfer actual para la unidad dada.',
            commitDigits:
              'Analiza la cadena de dígitos del búfer, la acota al rango válido de la unidad y la escribe en el valor.',
            flushBuffer: 'Confirma cualquier búfer de dígitos pendiente y lo vacía.',
            focusHoursWhenReady:
              'Enfoca el campo de horas una vez que la superficie del popover se ha renderizado en el DOM.',
            hoursFromTyped:
              'Convierte un valor de horas introducido a su equivalente de 24 horas, teniendo en cuenta el periodo AM/PM actual.',
            onPopoverCloseRequested:
              'Cierra el popover cuando el usuario hace clic fuera del selector.',
            onSpinnerBlur:
              'Confirma cualquier búfer de dígitos pendiente cuando una columna del spinner pierde el foco.',
            onSpinnerFocus:
              'Selecciona todo el texto de una columna del spinner cuando recibe el foco, de modo que la primera pulsación de tecla lo reemplace.',
            onSpinnerInput:
              'Gestiona la entrada de dígitos en una columna del spinner, actualiza el búfer y avanza automáticamente el foco cuando la columna está llena.',
            startHold:
              'Inicia una repetición por pulsación larga en un botón de flecha, avanzando la unidad dada y acelerando tras un retardo.',
            step: 'Avanza o retrocede la columna de unidad dada en un incremento configurado.',
            stopHold:
              'Cancela cualquier temporizador de repetición por pulsación larga en curso.',
            togglePeriod:
              'Cambia el periodo AM/PM en el modo de 12 horas invirtiendo el desplazamiento de 12 horas.',
          },
          autocomplete: {
            disabled: 'Deshabilita el campo.',
            emptyMessage:
              'Mensaje mostrado en la lista cuando ninguna opción coincide con la entrada actual, con reserva en la traducción de la configuración regional activa si se omite.',
            errorMsg:
              'Mensaje de error mostrado bajo el campo, que sustituye la ayuda y marca el campo como no válido.',
            hint: 'Texto de ayuda mostrado bajo el campo, oculto cuando hay un error.',
            id: 'id aplicado al campo nativo y al for de la etiqueta, generado automáticamente si se omite.',
            label: 'Etiqueta mostrada encima del campo.',
            maxResults:
              'Número máximo de opciones mostradas a la vez en la lista de sugerencias.',
            minLength:
              'Número mínimo de caracteres necesarios para que aparezca la lista de sugerencias.',
            options: 'Lista completa de opciones disponibles para filtrar y seleccionar.',
            placeholder: 'Texto de marcador mostrado mientras el campo está vacío.',
            readonly: 'Muestra el campo como de solo lectura.',
            required: 'Marca el campo como obligatorio.',
            size: 'Tamaño visual del campo.',
            value:
              'Valor actual del campo, vinculable en dos sentidos mediante [(value)].',
            blurred: 'Se emite cuando el campo pierde el foco.',
            changed:
              'Se emite cada vez que cambia el texto de entrada, incluidas las ediciones de texto libre.',
            focused: 'Se emite cuando el campo recibe el foco.',
            selected:
              'Se emite cuando el usuario elige una opción de la lista de sugerencias.',
            close: 'Cierra la lista de sugerencias sin cambiar el valor actual.',
            focus: 'Lleva el foco del teclado al campo de texto subyacente.',
            selectOption:
              'Selecciona mediante programación la opción dada, actualiza el valor y cierra la lista.',
          },
          'command-palette': {
            emptyMessage:
              'Mensaje mostrado cuando la consulta de búsqueda no coincide con ningún elemento, con reserva en la traducción de la configuración regional activa si se omite.',
            items:
              'Lista completa de elementos de comando disponibles para buscar y ejecutar.',
            open: 'Indica si el cuadro de diálogo de la paleta está abierto, vinculable en dos sentidos mediante [(open)].',
            placeholder:
              'Texto de marcador mostrado dentro del campo de búsqueda mientras está vacío.',
            execute:
              'Se emite cuando el usuario selecciona un comando, emitiendo el elemento elegido.',
            showActiveHighlight:
              'Devuelve si la fila activa debe mostrar su fondo resaltado para el índice plano dado.',
          },
          tabs: {
            activeTab:
              'Valor de la pestaña actualmente activa, vinculable en dos sentidos mediante [(activeTab)].',
            size: 'Tamaño visual de las pestañas.',
            variant: 'Estilo visual de la barra de pestañas: subrayado o relleno.',
            changed:
              'Se emite con el valor de la pestaña recién activada cada vez que cambia la pestaña activa.',
            registerTab:
              'Registra una pestaña hija para que aparezca en la barra de pestañas; llamado automáticamente por ea-tab.',
            selectTab: 'Activa mediante programación la pestaña con el valor dado.',
            unregisterTab:
              'Elimina una pestaña hija previamente registrada; llamado automáticamente por ea-tab.',
          },
          tab: {
            disabled: 'Deshabilita esta pestaña, impidiendo al usuario seleccionarla.',
            id: 'id aplicado al botón de pestaña y su panel, generado automáticamente si se omite.',
            label: 'Etiqueta de texto mostrada en el botón de pestaña.',
            value:
              'Valor único que identifica esta pestaña dentro de su grupo ea-tabs padre.',
          },
          'date-picker': {
            disabled: 'Deshabilita el selector de fecha.',
            errorMsg:
              'Mensaje de error mostrado bajo el campo, que sustituye la ayuda y marca el campo como no válido.',
            format:
              'Formato de visualización de la fecha seleccionada (short, medium o long).',
            hint: 'Texto de ayuda mostrado bajo el campo, oculto cuando hay un error.',
            id: 'id aplicado al activador y al for de la etiqueta, generado automáticamente si se omite.',
            label: 'Etiqueta mostrada encima del campo.',
            locale:
              'Etiqueta de configuración regional BCP 47 para el formato de fecha, usando la configuración global si se omite.',
            maxDate:
              'Fecha más tardía que el usuario puede seleccionar; las fechas posteriores quedan deshabilitadas en el calendario.',
            minDate:
              'Fecha más temprana que el usuario puede seleccionar; las fechas anteriores quedan deshabilitadas en el calendario.',
            placeholder:
              'Texto de marcador mostrado en el activador cuando no hay ninguna fecha seleccionada.',
            readonly:
              'Muestra el campo como de solo lectura, impidiendo que se abra el calendario.',
            required: 'Marca el campo como obligatorio.',
            size: 'Tamaño visual del activador del selector de fecha.',
            value:
              'Fecha seleccionada actual, vinculable en dos sentidos mediante [(value)].',
            weekStartsOn:
              'Primer día de la semana en la cuadrícula del calendario (0 para domingo, 1 para lunes).',
            changed: 'Se emite cuando cambia la fecha seleccionada, incluso al borrarla.',
            clear: 'Borra la fecha seleccionada y emite changed con null.',
            close: 'Cierra el popover del calendario.',
            focus: 'Lleva el foco del teclado al botón activador.',
            onPopoverCloseRequested:
              'Cierra el popover cuando el usuario hace clic fuera del selector de fecha.',
            open: 'Abre el popover del calendario y lleva el foco a la celda del día enfocado.',
            toggle: 'Alterna el popover del calendario entre abierto y cerrado.',
          },
          menu: {
            size: 'Tamaño visual del menú; cada elemento lo hereda.',
            maxHeight:
              'Altura máxima de la lista desplazable como longitud CSS; los menús más altos se desplazan.',
            ariaLabel:
              'Etiqueta accesible para la lista del menú, usando la configuración regional activa si se omite.',
            disabled: 'Deshabilita el menú, impidiendo que se abra.',
            id: 'id aplicado al elemento de lista del menú, generado automáticamente si se omite.',
            open: 'Indica si el menú está abierto, vinculable en dos sentidos mediante [(open)].',
            placement: 'Posición de la lista del menú respecto a su elemento activador.',
            closed: 'Se emite cuando el menú se cierra.',
            opened: 'Se emite cuando el menú se abre.',
            close:
              'Cierra el menú y opcionalmente devuelve el foco al elemento activador.',
            focusFirstItem:
              'Lleva el foco del teclado al primer elemento habilitado del menú.',
            onPopoverCloseRequested:
              'Cierra el menú cuando el usuario hace clic fuera de él.',
            openAt:
              'Abre el menú anclado al elemento activador dado y enfoca el primer elemento.',
            toggleAt:
              'Alterna el estado de apertura del menú, anclándolo al elemento activador dado.',
          },
          'menu-item': {
            disabled: 'Deshabilita el elemento y suprime los eventos de clic.',
            variant: 'Estilo visual del elemento; use danger para acciones destructivas.',
            clicked:
              'Se emite cuando se activa el elemento; el menú padre se cierra inmediatamente después.',
          },
          'multi-select': {
            disabled: 'Deshabilita el multi-select.',
            errorMsg:
              'Mensaje de error mostrado bajo el campo, que sustituye la ayuda y marca el campo como no válido.',
            hint: 'Texto de ayuda mostrado bajo el campo, oculto cuando hay un error.',
            id: 'id aplicado al activador y al for de la etiqueta, generado automáticamente si se omite.',
            label: 'Etiqueta de texto mostrada encima del campo.',
            maxVisibleChips:
              'Número máximo de chips mostrados en el activador antes de que el resto se contraigan en una pastilla con el recuento.',
            options:
              'Lista de opciones seleccionables mostradas en la lista desplegable.',
            placeholder:
              'Marcador de posición mostrado en el activador mientras no hay ninguna opción seleccionada.',
            readonly: 'Muestra el campo como de solo lectura.',
            required: 'Marca el campo como obligatorio.',
            searchable: 'Muestra el campo de búsqueda en la parte superior del popover.',
            searchPlaceholder:
              'Marcador de posición mostrado dentro del campo de búsqueda cuando el término de búsqueda está vacío.',
            selectAll:
              'Muestra la fila de seleccionar todo con tres estados en la parte superior de la lista de opciones.',
            size: 'Tamaño visual del activador del multi-select.',
            value:
              'Valores de las opciones seleccionadas, vinculables en dos sentidos mediante [(value)].',
            changed: 'Se emite con el nuevo valor cada vez que cambia la selección.',
            clear: 'Borra todas las selecciones y detiene la propagación del evento.',
            handlePopoverKeydown:
              'Gestiona la navegación con teclado dentro del popover abierto, enrutando las teclas de flecha, Enter, Espacio y Escape.',
            onPopoverCloseRequested:
              'Lo llama el popover cuando el usuario hace clic fuera o desplaza la página; cierra el panel y marca el campo como tocado.',
            orderedValues:
              'Devuelve el conjunto de valores dado reordenado para coincidir con el array de opciones de entrada.',
            removeChip: 'Elimina la opción dada de la selección actual.',
            toggleOption:
              'Alterna la pertenencia de la opción dada a la selección actual.',
            toggleSelectAll:
              'Selecciona todas las opciones filtradas si alguna está deseleccionada, o deselecciona todas si están todas seleccionadas.',
          },
          dropdown: {
            disabled: 'Deshabilita el desplegable.',
            errorMsg:
              'Mensaje de error mostrado bajo el campo, que sustituye la ayuda y marca el campo como no válido.',
            hint: 'Texto de ayuda mostrado bajo el campo, oculto cuando hay un error.',
            id: 'id aplicado al activador y al for de la etiqueta, generado automáticamente si se omite.',
            label: 'Etiqueta de texto mostrada encima del campo.',
            options:
              'Lista de opciones seleccionables mostradas en la lista desplegable.',
            placeholder:
              'Marcador de posición mostrado en el activador mientras no hay ninguna opción seleccionada.',
            readonly: 'Muestra el campo como de solo lectura.',
            required: 'Marca el campo como obligatorio.',
            size: 'Tamaño visual del activador del desplegable.',
            value:
              'Valor seleccionado actual, vinculable en dos sentidos mediante [(value)].',
            changed:
              'Se emite con el nuevo valor cuando el usuario selecciona una opción.',
            close: 'Cierra la lista desplegable sin cambiar el valor actual.',
            focus: 'Lleva el foco del teclado al activador del desplegable.',
            onPopoverCloseRequested:
              'Lo llama el popover cuando el usuario hace clic fuera del desplegable; cierra el panel y marca el campo como tocado.',
            select: 'Selecciona por código la opción dada y cierra la lista.',
            toggle: 'Alterna la lista desplegable entre abierta y cerrada.',
          },
          'file-uploader': {
            accept:
              "Tipos MIME y extensiones de archivo aceptados por la zona de arrastre, separados por comas, p. ej. 'image/*,.pdf'.",
            disabled: 'Deshabilita el cargador.',
            errorMsg:
              'Mensaje de error mostrado bajo el campo, que sustituye la ayuda y marca el campo como no válido.',
            hint: 'Texto de ayuda mostrado bajo el campo, oculto cuando hay un error.',
            id: 'id aplicado a la zona de arrastre y al for de la etiqueta, generado automáticamente si se omite.',
            label: 'Etiqueta mostrada encima del campo.',
            maxFiles:
              'Número total máximo de archivos; los archivos que superan el límite se rechazan.',
            maxSize:
              'Tamaño máximo por archivo en bytes; los archivos más grandes se rechazan.',
            multiple: 'Permite seleccionar más de un archivo a la vez.',
            progress:
              'Mapa de progreso de carga por archivo (0-100) indexado por identidad de File; omítalo para ocultar las barras de progreso.',
            required: 'Marca el campo como obligatorio.',
            showFileList:
              'Muestra la lista de archivos seleccionados bajo la zona de arrastre.',
            size: 'Tamaño visual del cargador.',
            value:
              'Lista de archivos actual, vinculable en dos sentidos mediante [(value)].',
            fileRemoved:
              'Se emite cuando se elimina un archivo mediante el botón de su fila.',
            rejected:
              'Se emite cuando uno o más archivos no superan la validación, con el motivo de cada rechazo.',
            trackFile:
              'Devuelve una clave de seguimiento estable para un archivo, usada internamente por la lista de archivos.',
          },
          'form-field': {
            size: 'Tamaño visual del campo; la etiqueta, el texto del control, los espacios y los mensajes escalan con él.',
            errorMsg:
              'Mensaje de error mostrado bajo el control, que sustituye la ayuda y marca el campo como no válido.',
            hint: 'Texto de ayuda mostrado bajo el control, oculto cuando hay un error.',
            id: 'Base de id para conectar la etiqueta y el mensaje, generada automáticamente si se omite.',
            label: 'Etiqueta mostrada encima del control.',
            required: 'Marca el campo como obligatorio.',
          },
          popover: {
            anchor:
              'Elemento anclaje o ElementRef respecto al cual se posiciona el popover.',
            ariaLabel:
              'Etiqueta accesible para la superficie del popover; proporciónela cuando el popover no contenga un encabezado visible.',
            ariaLabelledby:
              'Id del elemento que etiqueta la superficie del popover, transmitido como aria-labelledby.',
            clamp:
              'Mantiene el popover dentro del viewport cuando de otro modo se desbordaría.',
            closeOnEscape: 'Cierra el popover al pulsar Escape.',
            closeOnOutsideClick:
              'Cierra el popover cuando el usuario hace clic fuera del popover y su ancla.',
            flip: 'Cambia al lado opuesto cuando el posicionamiento solicitado se desborda del viewport.',
            matchAnchorWidth:
              'Establece el min-width del popover para que coincida con el ancho del ancla.',
            offset: 'Espacio en px entre el ancla y la superficie del popover.',
            open: 'Indica si el popover está actualmente abierto.',
            placement: 'Posición preferida del popover respecto a su ancla.',
            role: 'Rol ARIA aplicado a la superficie del popover.',
            scrollBehavior:
              'Comportamiento del popover ante eventos de desplazamiento y redimensión mientras está abierto: reposition, close o ignore.',
            surfaceId:
              'id DOM de la superficie del popover, usado por los elementos desencadenadores mediante aria-controls.',
            trapFocus:
              'Mantiene Tab y Mayús+Tab ciclando dentro de la superficie mientras está abierto, para popovers de tipo diálogo.',
            closeRequested:
              'Se emite cuando el popover solicita cerrarse; el padre debe reflejarlo en [open].',
          },
          'accordion-item': {
            disabled: 'Deshabilita este elemento, impidiendo que se pueda alternar.',
            id: 'id aplicado al botón de encabezado y al panel del elemento, generado automáticamente si se omite.',
            label: 'Texto mostrado en el botón de encabezado del elemento.',
            value:
              'Clave única que identifica este elemento dentro de su acordeón padre.',
          },
          breadcrumbs: {
            size: 'Tamaño visual de las migas de pan.',
            ariaLabel:
              'Etiqueta accesible para la navegación de migas de pan, con reserva en la traducción de la configuración regional activa si se omite.',
            items:
              'Array de entradas de migas de pan; los elementos con href se muestran como enlaces, los demás como botones, y el último no es interactivo.',
            separator:
              'Estilo visual del separador mostrado entre los elementos de las migas de pan.',
            clicked:
              'Se emite cuando se activa una miga de pan que no está deshabilitada ni es la última.',
          },
          drawer: {
            animation:
              'Animación de deslizamiento al abrir y cerrar el cajón: none (instantánea), linear (velocidad constante) o eased (una curva de salida suave).',
            ariaLabel:
              'Etiqueta accesible para el panel del cajón cuando su encabezado no es lo bastante descriptivo.',
            closeOnBackdrop: 'Cierra el cajón cuando el usuario hace clic en el fondo.',
            closeOnEscape: 'Cierra el cajón cuando el usuario pulsa la tecla Escape.',
            id: 'id aplicado al elemento dialog, generado automáticamente si se omite.',
            mode: 'Cómo se relaciona el cajón con la página: overlay flota sobre una página atenuada con el foco atrapado, mientras que push se abre de forma no modal y reorganiza el contenido de la página hacia un lado.',
            open: 'Indica si el cajón está abierto, vinculable en dos sentidos mediante [(open)].',
            position: 'Borde del viewport desde el que se desliza el cajón.',
            pushTarget:
              'Elemento cuyo contenido se desplaza hacia un lado en el modo push, como selector CSS o referencia de elemento; de forma predeterminada, el cuerpo del documento.',
            showClose: 'Muestra el botón de cierre en el encabezado del cajón.',
            size: 'Extensión del panel del cajón a lo largo de su eje principal: ancho para los cajones laterales, alto para los cajones superiores e inferiores.',
            closed:
              'Se emite cuando el cajón se cierra, ya sea mediante el botón, el fondo o Escape.',
            opened: 'Se emite una vez que el cajón se ha mostrado.',
          },
          'data-table': {
            size: 'Tamaño visual de la tabla; los rellenos de densidad y los iconos escalan con él.',
            clickable:
              'Marca las filas de datos como clicables: muestra un cursor de puntero y emite rowActivate al hacer clic o pulsar Enter/Espacio.',
            rowActivate:
              'Se emite con los datos de la fila cuando una fila clicable se activa con clic o teclado.',
            navigable:
              'Convierte la tabla en una cuadrícula navegable por teclado con foco itinerante y movimiento entre celdas con las flechas.',
            bordered: 'Muestra un borde alrededor de cada celda.',
            columns:
              'Definiciones de columnas que describen la clave, la etiqueta y, opcionalmente, el orden o la plantilla de cada campo.',
            data: 'Array de objetos de fila que mostrar en la tabla.',
            density:
              'Preajuste de densidad vertical que controla el relleno de las filas y las celdas de encabezado.',
            hoverable: 'Resalta la fila bajo el puntero al pasar el cursor.',
            noDataText:
              'Texto mostrado en el estado vacío, con repercusión en la traducción de la configuración regional activa.',
            sort: 'Estado de orden actual (clave de columna y dirección), vinculable en dos sentidos mediante [(sort)].',
            stickyHeader:
              'Fija la fila de encabezado en la parte superior de la tabla cuando el contenido se desplaza.',
            striped:
              'Aplica un sombreado de fondo alternado a las filas pares e impares.',
            trackBy:
              'Clave de propiedad de fila usada por la detección de cambios de Angular para identificar filas de forma eficiente.',
            sorted:
              'Se emite cada vez que la columna o la dirección de orden cambia mediante un clic en el encabezado.',
          },
          'radio-group': {
            ariaLabel:
              'Etiqueta accesible para el grupo cuando no se renderiza ninguna etiqueta visible.',
            disabled: 'Deshabilita todas las opciones de radio del grupo.',
            errorMsg:
              'Mensaje de error mostrado bajo el grupo, que sustituye la ayuda y marca el campo como no válido.',
            hint: 'Texto de ayuda mostrado bajo el grupo, oculto cuando hay un error.',
            id: 'id aplicado al elemento del grupo y al for de su etiqueta, generado automáticamente si se omite.',
            label: 'Etiqueta de texto mostrada encima del grupo.',
            name: 'Atributo name compartido aplicado a todas las entradas de radio del grupo, generado automáticamente si se omite.',
            orientation:
              'Dirección de disposición de las opciones de radio dentro del grupo.',
            required: 'Marca el grupo como obligatorio.',
            size: 'Tamaño visual aplicado a todas las opciones de radio del grupo.',
            value:
              'Valor actualmente seleccionado, vinculable en dos sentidos mediante [(value)].',
            changed:
              'Se emite con el nuevo valor cuando el usuario selecciona una opción.',
            select: 'Selecciona mediante programación la opción con el valor indicado.',
          },
          segmented: {
            ariaLabel:
              'Etiqueta accesible para el control cuando no se muestra ninguna etiqueta visible.',
            disabled: 'Deshabilita el control segmentado.',
            errorMsg:
              'Mensaje de error mostrado bajo el campo, que sustituye la ayuda y marca el campo como no válido.',
            fullWidth: 'Estira el control para ocupar el ancho de su contenedor.',
            hint: 'Texto de ayuda mostrado bajo el campo, oculto cuando hay un error.',
            id: 'id aplicado al control y al for de la etiqueta, generado automáticamente si se omite.',
            label: 'Etiqueta de texto mostrada encima del control.',
            options:
              'Array de opciones renderizadas como botones de alternancia en el control.',
            required: 'Marca el campo como obligatorio.',
            size: 'Tamaño visual del control segmentado.',
            value:
              'Valor de la opción seleccionada actualmente, vinculable en dos sentidos mediante [(value)].',
            changed:
              'Se emite con el nuevo valor cuando el usuario selecciona una opción diferente.',
            select: 'Selecciona la opción indicada mediante programación.',
          },
          tree: {
            ariaLabel: 'Etiqueta accesible para el widget de árbol.',
            disabled: 'Deshabilita todos los nodos del árbol.',
            expandedIds:
              'Ids de los nodos rama actualmente expandidos, vinculables en dos sentidos mediante [(expandedIds)].',
            nodes: 'Array de objetos de datos de nodos de árbol que define la jerarquía.',
            selectedId:
              'Id del nodo actualmente seleccionado, vinculable en dos sentidos mediante [(selectedId)].',
            size: 'Tamaño visual del árbol, que escala el texto y el espaciado proporcionalmente.',
            nodeClick:
              'Se emite con los datos del nodo cuando el usuario selecciona un nodo.',
          },
          step: {
            completed: 'Marca el paso como completado, actualizando su indicador visual.',
            disabled: 'Impide que el paso sea activado.',
            id: 'id aplicado al panel del paso y a su pestaña, generado automáticamente si se omite.',
            label: 'Etiqueta de texto mostrada en el indicador del paso.',
            optional:
              'Marca el paso como opcional, mostrado como ayuda bajo la etiqueta del paso.',
          },
          stepper: {
            activeStep:
              'Índice de base cero del paso activo, vinculable en dos sentidos mediante [(activeStep)].',
            disabled: 'Deshabilita el stepper completo y toda la navegación entre pasos.',
            id: 'id aplicado al elemento contenedor del stepper, generado automáticamente si se omite.',
            linear:
              'Requiere que cada paso no opcional esté marcado como completado antes de poder avanzar.',
            size: 'Tamaño visual del stepper, escalando los indicadores y las etiquetas de pasos juntos.',
            changed:
              'Se emite con el nuevo índice del paso activo cuando el usuario navega a un paso diferente.',
            canNavigateTo:
              'Devuelve si el paso en el índice dado es accesible desde el estado actual.',
            indexOf: 'Devuelve el índice del paso dado, o -1 si no está registrado.',
            selectStep: 'Activa el paso en el índice dado si es accesible.',
          },
          'transfer-list': {
            disabled:
              'Deshabilita toda la lista de transferencia y todos los controles de movimiento.',
            items:
              'Conjunto completo de elementos disponibles en ambos paneles, identificados por id.',
            selectedIds:
              'Ids de los elementos que están actualmente en el panel de destino (derecho), vinculables en dos sentidos mediante [(selectedIds)].',
            size: 'Tamaño visual de la lista de transferencia.',
            sourceLabel:
              'Encabezado mostrado sobre el panel de origen (izquierdo), con retroceso al valor predeterminado de la configuración regional activa.',
            targetLabel:
              'Encabezado mostrado sobre el panel de destino (derecho), con retroceso al valor predeterminado de la configuración regional activa.',
          },
          'virtual-list': {
            itemHeight:
              'Altura en píxeles de cada fila; todas las filas deben compartir la misma altura fija.',
            items:
              'Array completo de elementos de datos a renderizar; solo la porción visible está montada en cada momento.',
            overscan:
              'Número de filas adicionales renderizadas por encima y por debajo de la ventana visible para reducir los bordes en blanco durante el desplazamiento rápido.',
            viewportHeight: 'Altura en píxeles del área de desplazamiento visible.',
            scrollIndexChange:
              'Se emite con el índice de la primera fila visible en la parte superior del área de desplazamiento cada vez que el usuario hace scroll.',
            scrollToIndex:
              'Desplaza el área visible para que la fila en el índice dado aparezca en la parte superior, limitado a los extremos de la lista.',
          },
          'field-label': {
            forId:
              'id del control asociado; renderiza un <label for> cuando está definido, de lo contrario un <span>.',
            labelId:
              'id aplicado al elemento de etiqueta renderizado para que los controles puedan referenciarlo mediante aria-labelledby.',
            required: 'Muestra un indicador de campo obligatorio en la etiqueta.',
            text: 'Texto de la etiqueta renderizado dentro del elemento de etiqueta.',
          },
          'field-messages': {
            error:
              'Mensaje de error a mostrar; cuando está definido, la ayuda se oculta y el mensaje se anuncia como una alerta.',
            hint: 'Texto de ayuda mostrado bajo el campo cuando no hay ningún error.',
            id: 'id base usado para derivar los ids ARIA de los elementos de error y ayuda.',
          },
          dialog: {
            ariaLabel:
              'Etiqueta accesible para el diálogo cuando su ranura de cabecera no contiene un título visible.',
            closeOnBackdrop:
              'Cierra el diálogo cuando el usuario hace clic en el área de fondo fuera del panel.',
            closeOnEscape: 'Cierra el diálogo cuando el usuario pulsa Escape.',
            id: 'id aplicado al elemento dialog nativo, generado automáticamente si se omite.',
            open: 'Indica si el diálogo se muestra, vinculable en dos sentidos mediante [(open)].',
            showClose: 'Muestra el botón de cierre en la cabecera del diálogo.',
            width: 'Preajuste de ancho para el panel del diálogo.',
            closed:
              'Se emite cuando el diálogo se cierra, independientemente de si lo cerró el usuario o mediante código.',
            opened:
              'Se emite una vez que el diálogo se ha mostrado mediante showModal().',
          },
        },
      },
      sharedOptions: {
        fruitOptions: [
          { value: 'apple', label: 'Manzana' },
          { value: 'banana', label: 'Plátano' },
          { value: 'cherry', label: 'Cereza' },
          { value: 'date', label: 'Dátil' },
        ],
        viewOptions: [
          { value: 'day', label: 'Día' },
          { value: 'week', label: 'Semana' },
          { value: 'month', label: 'Mes' },
        ],
        themeOptions: [
          { value: 'light', label: 'Claro' },
          { value: 'dark', label: 'Oscuro' },
        ],
        monthOptions: [
          { value: 'jan', label: 'Enero' },
          { value: 'feb', label: 'Febrero' },
          { value: 'mar', label: 'Marzo' },
          { value: 'apr', label: 'Abril' },
          { value: 'may', label: 'Mayo' },
          { value: 'jun', label: 'Junio' },
          { value: 'jul', label: 'Julio' },
          { value: 'aug', label: 'Agosto' },
          { value: 'sep', label: 'Septiembre' },
          { value: 'oct', label: 'Octubre' },
          { value: 'nov', label: 'Noviembre' },
          { value: 'dec', label: 'Diciembre' },
        ],
        breadcrumbHome: 'Inicio',
        breadcrumbProducts: 'Productos',
        breadcrumbLaptops: 'Portátiles',
        breadcrumbMacBookPro: 'MacBook Pro',
        breadcrumbDashboard: 'Panel',
        breadcrumbSettings: 'Ajustes',
      },
    },
  },
};

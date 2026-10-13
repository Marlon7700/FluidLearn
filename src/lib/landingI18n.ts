export const LANDING_LANG_OPTIONS = [
  { code: 'es', label: 'ESPAÑOL' },
  { code: 'pt', label: 'PORTUGUÊS' },
  { code: 'en', label: 'ENGLISH' },
  { code: 'it', label: 'ITALIANO' },
  { code: 'en-US', label: 'AMERICAN ENGLISH' },
  { code: 'en-CA', label: 'CANADA' },
  { code: 'de', label: 'DEUTSCH' },
  { code: 'en-GB', label: 'ENGLAND' },
  { code: 'pt-BR', label: 'BRASILEIRO' },
] as const

export type LandingLangCode = (typeof LANDING_LANG_OPTIONS)[number]['code']

const LANG_KEY = 'fluidlearn-landing-lang'

export function readLandingLang(): LandingLangCode {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (LANDING_LANG_OPTIONS.some((l) => l.code === saved)) {
      return saved as LandingLangCode
    }
  } catch {
    /* ignore */
  }
  return 'es'
}

export function saveLandingLang(code: LandingLangCode) {
  try {
    localStorage.setItem(LANG_KEY, code)
  } catch {
    /* ignore */
  }
}

export type LandingDict = {
  skip: string
  navHome: string
  navPromo: string
  navPlans: string
  navAbout: string
  navCompare: string
  navContact: string
  navResourcesFree: string
  navAria: string
  mobileNav: string
  fontSize: string
  decreaseFont: string
  increaseFont: string
  darkOn: string
  lightOn: string
  openMenu: string
  closeMenu: string
  login: string
  register: string
  heroTitle: string
  heroSub: string
  heroCtaPlans: string
  heroCtaApp: string
  promoTitle: string
  promoPremium: string
  promoBefore: string
  promoDiscount: string
  promoLicenses: string
  plansTitle: string
  planFree: string
  planFreePrice: string
  planFreePoints: string[]
  planPremium: string
  planPremiumPrice: string
  planPremiumPoints: string[]
  planInst: string
  planInstPrice: string
  planInstPoints: string[]
  planStart: string
  aboutTitle: string
  aboutBody: string
  location: string
  founders: string
  compareTitle: string
  compareSub: string
  excellent: string
  reviews: string
  billingAria: string
  bill3: string
  bill12: string
  billForever: string
  bestOffer: string
  billHint3: string
  billHint12: string
  billHintForever: string
  features: string
  colPremium: string
  colInst: string
  colFree: string
  licenses: string
  compareCaption: string
  continueFree: string
  included: string
  notIncluded: string
  compareRows: { feature: string; freeLabel?: string }[]
  uniShort: string
  loadingLang: string
  loadingTab: string
  selectLang: string
  menuStartTitle: string
  menuStartItems: string[]
  menuCourseTitle: string
  menuCourseItems: string[]
  menuResourcesTitle: string
  menuResourcesItems: string[]
  footerWhoTitle: string
  footerWhoLinks: string[]
  footerResourcesTitle: string
  footerResourceLinks: string[]
  footerCopyright: string
  footerLegal: { label: string; to: string }[]
  brandTagline: string
}

const en: LandingDict = {
  skip: 'Skip to content',
  navHome: 'Home',
  navPromo: 'Promotions',
  navPlans: 'Plans',
  navAbout: 'About us',
  navCompare: 'Compare',
  navContact: 'Contact',
  navAria: 'Main',
  mobileNav: 'Mobile menu',
  fontSize: 'Text size',
  decreaseFont: 'Decrease text size',
  increaseFont: 'Increase text size',
  darkOn: 'Enable dark mode',
  lightOn: 'Enable light mode',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  login: 'Log in',
  register: 'Sign up',
  heroTitle: 'Learn English at your pace, with no schedules or high costs',
  heroSub: 'EdTech platform from Universidad Simón Bolívar – MacondoLab.',
  heroCtaPlans: 'Discover our plans',
  heroCtaApp: 'Enter the app',
  promoTitle: 'Special offers!',
  promoPremium: 'Premium Plan $14,900 COP/month',
  promoBefore: 'Was',
  promoDiscount: '20% discount',
  promoLicenses: 'Institutional licenses for universities',
  plansTitle: 'Our plans',
  planFree: 'Free Plan',
  planFreePrice: 'Free',
  planFreePoints: ['Basic access', 'Starter skill practice'],
  planPremium: 'Premium Student Plan',
  planPremiumPrice: '$14,900 COP/month',
  planPremiumPoints: [
    'Full access',
    'Academic tracking',
    'AI that grades automatically',
    'Online teachers for feedback',
    'Exam simulators',
    'Fits any school or university',
  ],
  planInst: 'Institutional Plan',
  planInstPrice: 'From $34,900 COP',
  planInstPoints: [
    'Bulk licenses',
    'Coordinator dashboard',
    'Curriculum integration',
    'Real-time metrics',
  ],
  planStart: 'Get started',
  aboutTitle: 'About us',
  aboutBody:
    'FluidLearn is an EdTech platform created at Universidad Simón Bolívar – MacondoLab to strengthen language skills for students with limited time and money.',
  location: 'Cúcuta, Colombia',
  founders: 'Founders:',
  compareTitle: 'Learn English and reach your goals with FluidLearn Premium',
  compareSub: 'If your institution needs bulk licenses, choose the Institutional Plan.',
  excellent: 'Excellent:',
  reviews: 'reviews from USB students',
  billingAria: 'Plan duration',
  bill3: '3 months',
  bill12: '12 months',
  billForever: 'Forever',
  bestOffer: 'Best offer',
  billHint3: 'Quarterly billing · Great to try Premium.',
  billHint12: 'Yearly billing · Save vs paying monthly.',
  billHintForever: 'Lifetime access to the Premium Student plan.',
  features: 'Features',
  colPremium: 'Premium',
  colInst: 'Institutional',
  colFree: 'Free',
  licenses: 'Licenses',
  compareCaption: 'FluidLearn plan feature comparison',
  continueFree: 'Continue for free',
  included: 'Included',
  notIncluded: 'Not included',
  compareRows: [
    { feature: '4 skills: listening, speaking, reading and writing', freeLabel: 'Basic access' },
    { feature: 'Activities and exam simulators' },
    { feature: 'AI that grades automatically' },
    { feature: 'Online teachers for feedback' },
    { feature: 'Academic progress tracking' },
    { feature: 'Extra content and daily practice' },
    { feature: 'Fits school or university' },
    { feature: 'Coordinator dashboard and real-time metrics' },
  ],
  uniShort: 'Universidad Simón Bolívar – Cúcuta',
  loadingLang: 'Changing language…',
  loadingTab: 'Loading…',
  selectLang: 'Select language',
  navResourcesFree: 'Free resources',
  menuStartTitle: 'Get started',
  menuStartItems: [
    'English level test',
    'English levels',
    'English grammar videos',
    'Intensive English course',
    'English conversation classes',
    'English course for adults',
    'English certificates',
  ],
  menuCourseTitle: 'Our course',
  menuCourseItems: [
    'How it works',
    'Natural method',
    'Prices',
    'Our app',
    'FluidLearn certificate',
  ],
  menuResourcesTitle: 'Learn more',
  menuResourcesItems: [
    'Video classes',
    'English grammar',
    'English verb tenses',
    'English modal verbs',
    'English adjectives',
    'English adverbs',
    'English pronouns',
    'English prepositions',
    'Tips to learn English',
  ],
  footerWhoTitle: 'Who we are',
  footerWhoLinks: ['English for companies', 'Careers', 'Press', 'Help center'],
  footerResourcesTitle: 'Resources',
  footerResourceLinks: [
    'Learn English',
    'Level test',
    'Free English course',
    'Prices',
    'Reviews',
    'How it works',
    'Natural method',
    'Online English course',
    'English grammar',
    'English verbs',
    'Verb tenses',
    'Intensive course',
    'Conversation classes',
    'English for companies',
  ],
  footerCopyright: 'Copyright © 2026 · FluidLearn',
  footerLegal: [
    { label: 'Privacy policy', to: '/legal/privacidad' },
    { label: 'General terms', to: '/legal/condiciones-generales' },
    { label: 'Special conditions', to: '/legal/condiciones-particulares' },
    { label: 'Cookie policy', to: '/legal/privacidad#cookies' },
  ],
  brandTagline: 'EdTech · Universidad Simón Bolívar – MacondoLab',
}

const enGB: LandingDict = {
  ...en,
  heroTitle: 'Learn English at your own pace, without rigid schedules or high costs',
  promoPremium: 'Premium Plan $14,900 COP/month',
  billHint12: 'Annual billing · Save compared with paying monthly.',
}

const pt: LandingDict = {
  skip: 'Saltar para o conteúdo',
  navHome: 'Início',
  navPromo: 'Promoções',
  navPlans: 'Planos',
  navAbout: 'Sobre nós',
  navCompare: 'Comparar',
  navContact: 'Contacto',
  navAria: 'Principal',
  mobileNav: 'Menu móvel',
  fontSize: 'Tamanho do texto',
  decreaseFont: 'Diminuir texto',
  increaseFont: 'Aumentar texto',
  darkOn: 'Ativar modo escuro',
  lightOn: 'Ativar modo claro',
  openMenu: 'Abrir menu',
  closeMenu: 'Fechar menu',
  login: 'Entrar',
  register: 'Registar',
  heroTitle: 'Aprende inglês ao teu ritmo, sem horários nem custos elevados',
  heroSub: 'Plataforma EdTech da Universidad Simón Bolívar – MacondoLab.',
  heroCtaPlans: 'Descobre os nossos planos',
  heroCtaApp: 'Entrar na app',
  promoTitle: 'Ofertas especiais!',
  promoPremium: 'Plano Premium $14.900 COP/mês',
  promoBefore: 'Antes',
  promoDiscount: '20% de desconto',
  promoLicenses: 'Licenças institucionais para universidades',
  plansTitle: 'Os nossos planos',
  planFree: 'Plano Grátis',
  planFreePrice: 'Grátis',
  planFreePoints: ['Acesso básico', 'Prática inicial de competências'],
  planPremium: 'Plano Premium Estudante',
  planPremiumPrice: '$14.900 COP/mês',
  planPremiumPoints: [
    'Acesso completo',
    'Acompanhamento académico',
    'IA que avalia automaticamente',
    'Professores online para feedback',
    'Simuladores de exame',
    'Adaptável a escola ou universidade',
  ],
  planInst: 'Plano Institucional',
  planInstPrice: 'Desde $34.900 COP',
  planInstPoints: [
    'Licenças em massa',
    'Painel para coordenadores',
    'Integração curricular',
    'Métricas em tempo real',
  ],
  planStart: 'Começar',
  aboutTitle: 'Sobre nós',
  aboutBody:
    'A FluidLearn é uma plataforma EdTech criada na Universidad Simón Bolívar – MacondoLab para otimizar competências linguísticas de estudantes com pouco tempo e dinheiro.',
  location: 'Cúcuta, Colômbia',
  founders: 'Fundadores:',
  compareTitle: 'Aprende inglês e alcança os teus objetivos com FluidLearn Premium',
  compareSub: 'Se a tua instituição precisa de licenças em massa, escolhe o Plano Institucional.',
  excellent: 'Excelente:',
  reviews: 'opiniões de estudantes USB',
  billingAria: 'Duração do plano',
  bill3: '3 meses',
  bill12: '12 meses',
  billForever: 'Para sempre',
  bestOffer: 'Melhor oferta',
  billHint3: 'Faturação trimestral · Ideal para experimentar o Premium.',
  billHint12: 'Faturação anual · Poupças face ao pagamento mensal.',
  billHintForever: 'Acesso vitalício ao plano Premium Estudante.',
  features: 'Funcionalidades',
  colPremium: 'Premium',
  colInst: 'Institucional',
  colFree: 'Grátis',
  licenses: 'Licenças',
  compareCaption: 'Comparação de planos FluidLearn',
  continueFree: 'Continuar grátis',
  included: 'Incluído',
  notIncluded: 'Não incluído',
  compareRows: [
    { feature: '4 competências: listening, speaking, reading e writing', freeLabel: 'Acesso básico' },
    { feature: 'Atividades e simuladores de exame' },
    { feature: 'IA que avalia automaticamente' },
    { feature: 'Professores online para feedback' },
    { feature: 'Acompanhamento académico do progresso' },
    { feature: 'Conteúdo extra e prática diária' },
    { feature: 'Adaptável a escola ou universidade' },
    { feature: 'Painel para coordenadores e métricas em tempo real' },
  ],
  uniShort: 'Universidad Simón Bolívar – Cúcuta',
  loadingLang: 'A mudar o idioma…',
  loadingTab: 'A carregar…',
  selectLang: 'Selecionar idioma',
  navResourcesFree: 'Recursos grátis',
  menuStartTitle: 'Para começar',
  menuStartItems: [
    'Teste de nível de inglês',
    'Níveis de inglês',
    'Vídeos de gramática inglesa',
    'Curso intensivo de inglês',
    'Aulas de conversação',
    'Curso de inglês para adultos',
    'Certificados de inglês',
  ],
  menuCourseTitle: 'O nosso curso',
  menuCourseItems: [
    'Como funciona',
    'Método natural',
    'Preços',
    'A nossa app',
    'Certificado FluidLearn',
  ],
  menuResourcesTitle: 'Aprender mais',
  menuResourcesItems: [
    'Videoaulas',
    'Gramática inglesa',
    'Tempos verbais em inglês',
    'Verbos modais em inglês',
    'Adjetivos em inglês',
    'Advérbios em inglês',
    'Pronomes em inglês',
    'Preposições em inglês',
    'Dicas para aprender inglês',
  ],
  footerWhoTitle: 'Quem somos',
  footerWhoLinks: ['Inglês para empresas', 'Emprego', 'Imprensa', 'Centro de ajuda'],
  footerResourcesTitle: 'Recursos',
  footerResourceLinks: [
    'Aprender inglês',
    'Teste de nível',
    'Curso de inglês grátis',
    'Preços',
    'Opiniões',
    'Como funciona',
    'Método natural',
    'Curso de inglês online',
    'Gramática inglesa',
    'Verbos em inglês',
    'Tempos verbais',
    'Curso intensivo',
    'Aulas de conversação',
    'Inglês para empresas',
  ],
  footerCopyright: 'Copyright © 2026 · FluidLearn',
  footerLegal: [
    { label: 'Política de privacidade', to: '/legal/privacidad' },
    { label: 'Condições gerais', to: '/legal/condiciones-generales' },
    { label: 'Condições particulares', to: '/legal/condiciones-particulares' },
    { label: 'Política de cookies', to: '/legal/privacidad#cookies' },
  ],
  brandTagline: 'EdTech · Universidad Simón Bolívar – MacondoLab',
}

const ptBR: LandingDict = {
  ...pt,
  navContact: 'Contato',
  register: 'Cadastrar',
  heroTitle: 'Aprenda inglês no seu ritmo, sem horários nem custos altos',
  heroCtaPlans: 'Conheça nossos planos',
  heroCtaApp: 'Entrar no app',
  plansTitle: 'Nossos planos',
  planFreePoints: ['Acesso básico', 'Prática inicial de habilidades'],
  planPremiumPoints: [
    'Acesso completo',
    'Rastreabilidade acadêmica',
    'IA que avalia automaticamente',
    'Professores online para feedback',
    'Simuladores de exame',
    'Adaptável a escola ou universidade',
  ],
  aboutBody:
    'A FluidLearn é uma plataforma EdTech criada na Universidad Simón Bolívar – MacondoLab para otimizar competências linguísticas de estudantes com pouco tempo e dinheiro.',
  compareTitle: 'Aprenda inglês e alcance suas metas com FluidLearn Premium',
  compareSub: 'Se sua instituição precisa de licenças em massa, escolha o Plano Institucional.',
  billHint12: 'Cobrança anual · Você economiza em relação ao pagamento mensal.',
  loadingLang: 'Trocando o idioma…',
  loadingTab: 'Carregando…',
  menuStartTitle: 'Para começar',
  menuCourseTitle: 'Nosso curso',
  menuResourcesTitle: 'Aprenda mais',
  footerWhoTitle: 'Quem somos',
  footerResourcesTitle: 'Recursos',
}

const it: LandingDict = {
  skip: 'Vai al contenuto',
  navHome: 'Home',
  navPromo: 'Promozioni',
  navPlans: 'Piani',
  navAbout: 'Chi siamo',
  navCompare: 'Confronta',
  navContact: 'Contatti',
  navAria: 'Principale',
  mobileNav: 'Menu mobile',
  fontSize: 'Dimensione testo',
  decreaseFont: 'Riduci testo',
  increaseFont: 'Aumenta testo',
  darkOn: 'Attiva modalità scura',
  lightOn: 'Attiva modalità chiara',
  openMenu: 'Apri menu',
  closeMenu: 'Chiudi menu',
  login: 'Accedi',
  register: 'Registrati',
  heroTitle: 'Impara l’inglese al tuo ritmo, senza orari né costi elevati',
  heroSub: 'Piattaforma EdTech della Universidad Simón Bolívar – MacondoLab.',
  heroCtaPlans: 'Scopri i nostri piani',
  heroCtaApp: 'Entra nell’app',
  promoTitle: 'Offerte speciali!',
  promoPremium: 'Piano Premium $14.900 COP/mese',
  promoBefore: 'Prima',
  promoDiscount: '20% di sconto',
  promoLicenses: 'Licenze istituzionali per università',
  plansTitle: 'I nostri piani',
  planFree: 'Piano Gratis',
  planFreePrice: 'Gratis',
  planFreePoints: ['Accesso base', 'Pratica iniziale delle abilità'],
  planPremium: 'Piano Premium Studente',
  planPremiumPrice: '$14.900 COP/mese',
  planPremiumPoints: [
    'Accesso completo',
    'Tracciabilità accademica',
    'IA che valuta automaticamente',
    'Docenti online per feedback',
    'Simulatori d’esame',
    'Adattabile a scuola o università',
  ],
  planInst: 'Piano Istituzionale',
  planInstPrice: 'Da $34.900 COP',
  planInstPoints: [
    'Licenze massive',
    'Dashboard per coordinatori',
    'Integrazione curricolare',
    'Metriche in tempo reale',
  ],
  planStart: 'Inizia',
  aboutTitle: 'Chi siamo',
  aboutBody:
    'FluidLearn è una piattaforma EdTech creata presso la Universidad Simón Bolívar – MacondoLab per potenziare le competenze linguistiche di studenti con poco tempo e budget.',
  location: 'Cúcuta, Colombia',
  founders: 'Fondatori:',
  compareTitle: 'Impara l’inglese e raggiungi i tuoi obiettivi con FluidLearn Premium',
  compareSub: 'Se la tua istituzione ha bisogno di licenze massive, scegli il Piano Istituzionale.',
  excellent: 'Eccellente:',
  reviews: 'recensioni di studenti USB',
  billingAria: 'Durata del piano',
  bill3: '3 mesi',
  bill12: '12 mesi',
  billForever: 'Per sempre',
  bestOffer: 'Miglior offerta',
  billHint3: 'Fatturazione trimestrale · Ideale per provare Premium.',
  billHint12: 'Fatturazione annuale · Risparmi rispetto al mensile.',
  billHintForever: 'Accesso a vita al piano Premium Studente.',
  features: 'Funzionalità',
  colPremium: 'Premium',
  colInst: 'Istituzionale',
  colFree: 'Gratis',
  licenses: 'Licenze',
  compareCaption: 'Confronto piani FluidLearn',
  continueFree: 'Continua gratis',
  included: 'Incluso',
  notIncluded: 'Non incluso',
  compareRows: [
    { feature: '4 abilità: listening, speaking, reading e writing', freeLabel: 'Accesso base' },
    { feature: 'Attività e simulatori d’esame' },
    { feature: 'IA che valuta automaticamente' },
    { feature: 'Docenti online per feedback' },
    { feature: 'Tracciabilità accademica dei progressi' },
    { feature: 'Contenuti extra e pratica quotidiana' },
    { feature: 'Adattabile a scuola o università' },
    { feature: 'Dashboard coordinatori e metriche in tempo reale' },
  ],
  uniShort: 'Universidad Simón Bolívar – Cúcuta',
  loadingLang: 'Cambio lingua…',
  loadingTab: 'Caricamento…',
  selectLang: 'Seleziona lingua',
  navResourcesFree: 'Risorse gratuite',
  menuStartTitle: 'Per iniziare',
  menuStartItems: [
    'Test di livello di inglese',
    'Livelli di inglese',
    'Video di grammatica inglese',
    'Corso intensivo di inglese',
    'Lezioni di conversazione',
    'Corso di inglese per adulti',
    'Certificati di inglese',
  ],
  menuCourseTitle: 'Il nostro corso',
  menuCourseItems: [
    'Come funziona',
    'Metodo naturale',
    'Prezzi',
    'La nostra app',
    'Certificato FluidLearn',
  ],
  menuResourcesTitle: 'Approfondisci',
  menuResourcesItems: [
    'Videolezioni',
    'Grammatica inglese',
    'Tempi verbali in inglese',
    'Verbi modali in inglese',
    'Aggettivi in inglese',
    'Avverbi in inglese',
    'Pronomi in inglese',
    'Preposizioni in inglese',
    'Consigli per imparare l’inglese',
  ],
  footerWhoTitle: 'Chi siamo',
  footerWhoLinks: ['Inglese per aziende', 'Lavoro', 'Stampa', 'Centro assistenza'],
  footerResourcesTitle: 'Risorse',
  footerResourceLinks: [
    'Imparare inglese',
    'Test di livello',
    'Corso di inglese gratis',
    'Prezzi',
    'Recensioni',
    'Come funziona',
    'Metodo naturale',
    'Corso di inglese online',
    'Grammatica inglese',
    'Verbi in inglese',
    'Tempi verbali',
    'Corso intensivo',
    'Lezioni di conversazione',
    'Inglese per aziende',
  ],
  footerCopyright: 'Copyright © 2026 · FluidLearn',
  footerLegal: [
    { label: 'Privacy policy', to: '/legal/privacidad' },
    { label: 'Condizioni generali', to: '/legal/condiciones-generales' },
    { label: 'Condizioni particolari', to: '/legal/condiciones-particulares' },
    { label: 'Cookie policy', to: '/legal/privacidad#cookies' },
  ],
  brandTagline: 'EdTech · Universidad Simón Bolívar – MacondoLab',
}

const de: LandingDict = {
  skip: 'Zum Inhalt springen',
  navHome: 'Start',
  navPromo: 'Aktionen',
  navPlans: 'Tarife',
  navAbout: 'Über uns',
  navCompare: 'Vergleich',
  navContact: 'Kontakt',
  navAria: 'Hauptnavigation',
  mobileNav: 'Mobiles Menü',
  fontSize: 'Textgröße',
  decreaseFont: 'Text verkleinern',
  increaseFont: 'Text vergrößern',
  darkOn: 'Dunkelmodus aktivieren',
  lightOn: 'Hellmodus aktivieren',
  openMenu: 'Menü öffnen',
  closeMenu: 'Menü schließen',
  login: 'Anmelden',
  register: 'Registrieren',
  heroTitle: 'Englisch in deinem Tempo lernen – ohne feste Zeiten und hohe Kosten',
  heroSub: 'EdTech-Plattform der Universidad Simón Bolívar – MacondoLab.',
  heroCtaPlans: 'Unsere Tarife entdecken',
  heroCtaApp: 'Zur App',
  promoTitle: 'Sonderangebote!',
  promoPremium: 'Premium-Tarif $14.900 COP/Monat',
  promoBefore: 'Vorher',
  promoDiscount: '20 % Rabatt',
  promoLicenses: 'Institutionelle Lizenzen für Universitäten',
  plansTitle: 'Unsere Tarife',
  planFree: 'Gratis-Tarif',
  planFreePrice: 'Gratis',
  planFreePoints: ['Basiszugang', 'Erste Übungen zu den Fertigkeiten'],
  planPremium: 'Premium Studenten-Tarif',
  planPremiumPrice: '$14.900 COP/Monat',
  planPremiumPoints: [
    'Vollzugang',
    'Akademisches Tracking',
    'KI mit automatischer Bewertung',
    'Online-Lehrkräfte für Feedback',
    'Prüfungssimulatoren',
    'Passend für Schule oder Universität',
  ],
  planInst: 'Institutioneller Tarif',
  planInstPrice: 'Ab $34.900 COP',
  planInstPoints: [
    'Massenlizenzen',
    'Dashboard für Koordinatoren',
    'Curriculare Integration',
    'Echtzeit-Kennzahlen',
  ],
  planStart: 'Starten',
  aboutTitle: 'Über uns',
  aboutBody:
    'FluidLearn ist eine EdTech-Plattform der Universidad Simón Bolívar – MacondoLab zur Stärkung sprachlicher Kompetenzen von Studierenden mit wenig Zeit und Geld.',
  location: 'Cúcuta, Kolumbien',
  founders: 'Gründer:',
  compareTitle: 'Englisch lernen und Ziele erreichen mit FluidLearn Premium',
  compareSub: 'Braucht deine Institution Massenlizenzen, wähle den institutionellen Tarif.',
  excellent: 'Ausgezeichnet:',
  reviews: 'Bewertungen von USB-Studierenden',
  billingAria: 'Tarifdauer',
  bill3: '3 Monate',
  bill12: '12 Monate',
  billForever: 'Für immer',
  bestOffer: 'Bestes Angebot',
  billHint3: 'Vierteljährliche Abrechnung · Ideal zum Testen von Premium.',
  billHint12: 'Jährliche Abrechnung · Günstiger als monatlich.',
  billHintForever: 'Lebenslanger Zugang zum Premium-Studenten-Tarif.',
  features: 'Funktionen',
  colPremium: 'Premium',
  colInst: 'Institutionell',
  colFree: 'Gratis',
  licenses: 'Lizenzen',
  compareCaption: 'Vergleich der FluidLearn-Tarife',
  continueFree: 'Kostenlos weiter',
  included: 'Enthalten',
  notIncluded: 'Nicht enthalten',
  compareRows: [
    { feature: '4 Fertigkeiten: Listening, Speaking, Reading und Writing', freeLabel: 'Basiszugang' },
    { feature: 'Aktivitäten und Prüfungssimulatoren' },
    { feature: 'KI mit automatischer Bewertung' },
    { feature: 'Online-Lehrkräfte für Feedback' },
    { feature: 'Akademisches Fortschrittstracking' },
    { feature: 'Extra-Inhalte und tägliche Übung' },
    { feature: 'Passend für Schule oder Universität' },
    { feature: 'Koordinator-Dashboard und Echtzeit-Kennzahlen' },
  ],
  uniShort: 'Universidad Simón Bolívar – Cúcuta',
  loadingLang: 'Sprache wird gewechselt…',
  loadingTab: 'Wird geladen…',
  selectLang: 'Sprache wählen',
  navResourcesFree: 'Kostenlose Ressourcen',
  menuStartTitle: 'Loslegen',
  menuStartItems: [
    'Englisch-Einstufungstest',
    'Englischniveaus',
    'Grammatikvideos',
    'Intensivkurs Englisch',
    'Konversationskurse',
    'Englischkurs für Erwachsene',
    'Englischzertifikate',
  ],
  menuCourseTitle: 'Unser Kurs',
  menuCourseItems: [
    'So funktioniert’s',
    'Natürliche Methode',
    'Preise',
    'Unsere App',
    'FluidLearn-Zertifikat',
  ],
  menuResourcesTitle: 'Mehr lernen',
  menuResourcesItems: [
    'Videokurse',
    'Englische Grammatik',
    'Englische Zeitformen',
    'Modalverben',
    'Adjektive',
    'Adverbien',
    'Pronomen',
    'Präpositionen',
    'Tipps zum Englischlernen',
  ],
  footerWhoTitle: 'Über uns',
  footerWhoLinks: ['Englisch für Unternehmen', 'Karriere', 'Presse', 'Hilfezentrum'],
  footerResourcesTitle: 'Ressourcen',
  footerResourceLinks: [
    'Englisch lernen',
    'Einstufungstest',
    'Kostenloser Englischkurs',
    'Preise',
    'Bewertungen',
    'So funktioniert’s',
    'Natürliche Methode',
    'Online-Englischkurs',
    'Englische Grammatik',
    'Englische Verben',
    'Zeitformen',
    'Intensivkurs',
    'Konversationskurse',
    'Englisch für Unternehmen',
  ],
  footerCopyright: 'Copyright © 2026 · FluidLearn',
  footerLegal: [
    { label: 'Datenschutz', to: '/legal/privacidad' },
    { label: 'Nutzungsbedingungen', to: '/legal/condiciones-generales' },
    { label: 'Besondere Bedingungen', to: '/legal/condiciones-particulares' },
    { label: 'Cookie-Richtlinie', to: '/legal/privacidad#cookies' },
  ],
  brandTagline: 'EdTech · Universidad Simón Bolívar – MacondoLab',
}

const es: LandingDict = {
  skip: 'Saltar al contenido',
  navHome: 'Inicio',
  navPromo: 'Promociones',
  navPlans: 'Planes',
  navAbout: 'Sobre Nosotros',
  navCompare: 'Comparativa',
  navContact: 'Contacto',
  navAria: 'Principal',
  mobileNav: 'Menú móvil',
  fontSize: 'Tamaño de texto',
  decreaseFont: 'Reducir tamaño de texto',
  increaseFont: 'Aumentar tamaño de texto',
  darkOn: 'Activar modo oscuro',
  lightOn: 'Activar modo claro',
  openMenu: 'Abrir menú',
  closeMenu: 'Cerrar menú',
  login: 'Entrar',
  register: 'Registrarse',
  heroTitle: 'Aprende inglés a tu ritmo, sin horarios ni costos elevados',
  heroSub: 'Plataforma EdTech de la Universidad Simón Bolívar – MacondoLab.',
  heroCtaPlans: 'Descubre nuestros planes',
  heroCtaApp: 'Entrar a la app',
  promoTitle: '¡Ofertas especiales!',
  promoPremium: 'Plan Premium $14.900 COP/mes',
  promoBefore: 'Antes',
  promoDiscount: '20% de descuento',
  promoLicenses: 'Licencias institucionales para universidades',
  plansTitle: 'Nuestros planes',
  planFree: 'Plan Gratis',
  planFreePrice: 'Gratis',
  planFreePoints: ['Acceso básico', 'Práctica inicial de habilidades'],
  planPremium: 'Plan Premium Estudiante',
  planPremiumPrice: '$14.900 COP/mes',
  planPremiumPoints: [
    'Acceso completo',
    'Trazabilidad académica',
    'IA que califica automáticamente',
    'Profesores en línea para retroalimentación',
    'Simuladores de examen',
    'Adaptable a colegio o universidad',
  ],
  planInst: 'Plan Institucional',
  planInstPrice: 'Desde $34.900 COP',
  planInstPoints: [
    'Licencias masivas',
    'Dashboard para coordinadores',
    'Integración curricular',
    'Métricas en tiempo real',
  ],
  planStart: 'Empezar',
  aboutTitle: 'Sobre nosotros',
  aboutBody:
    'FluidLearn es una plataforma EdTech creada en la Universidad Simón Bolívar – MacondoLab para optimizar las competencias lingüísticas de estudiantes con restricciones de tiempo y dinero.',
  location: 'Cúcuta, Colombia',
  founders: 'Fundadores:',
  compareTitle: 'Aprende inglés y alcanza tus metas con FluidLearn Premium',
  compareSub: 'Y si tu institución necesita licencias masivas, elige el Plan Institucional.',
  excellent: 'Excelente:',
  reviews: 'opiniones de estudiantes USB',
  billingAria: 'Duración del plan',
  bill3: '3 meses',
  bill12: '12 meses',
  billForever: 'Para siempre',
  bestOffer: 'Mejor oferta',
  billHint3: 'Facturación trimestral · Ideal para probar Premium.',
  billHint12: 'Facturación anual · Ahorras frente al pago mes a mes.',
  billHintForever: 'Acceso de por vida al plan Premium Estudiante.',
  features: 'Características',
  colPremium: 'Premium',
  colInst: 'Institucional',
  colFree: 'Gratis',
  licenses: 'Licencias',
  compareCaption: 'Comparativa de planes FluidLearn',
  continueFree: 'Continúa gratis',
  included: 'Incluido',
  notIncluded: 'No incluido',
  compareRows: [
    { feature: '4 habilidades: listening, speaking, reading y writing', freeLabel: 'Acceso básico' },
    { feature: 'Actividades y simuladores de examen' },
    { feature: 'IA que califica automáticamente' },
    { feature: 'Profesores en línea para retroalimentación' },
    { feature: 'Trazabilidad académica del progreso' },
    { feature: 'Contenido extra y práctica diaria' },
    { feature: 'Adaptable a colegio o universidad' },
    { feature: 'Dashboard para coordinadores y métricas en tiempo real' },
  ],
  uniShort: 'Universidad Simón Bolívar – Cúcuta',
  loadingLang: 'Cambiando idioma…',
  loadingTab: 'Cargando…',
  selectLang: 'Seleccionar idioma',
  navResourcesFree: 'Recursos gratis',
  menuStartTitle: 'Para empezar',
  menuStartItems: [
    'Test de nivel inglés',
    'Niveles de inglés',
    'Videos de gramática inglesa',
    'Curso intensivo de inglés',
    'Clases de conversación inglés',
    'Curso de inglés para adultos',
    'Certificados de inglés',
  ],
  menuCourseTitle: 'Nuestro curso',
  menuCourseItems: [
    'Cómo funciona',
    'Método natural',
    'Precios',
    'Nuestra app',
    'Certificado FluidLearn',
  ],
  menuResourcesTitle: 'Aprende más',
  menuResourcesItems: [
    'Video clases',
    'Gramática inglesa',
    'Tiempos verbales en inglés',
    'Verbos modales en inglés',
    'Adjetivos en inglés',
    'Adverbios en inglés',
    'Pronombres en inglés',
    'Preposiciones en inglés',
    'Consejos para aprender inglés',
  ],
  footerWhoTitle: 'Quiénes somos',
  footerWhoLinks: ['Inglés para empresas', 'Empleo', 'Prensa', 'Centro de ayuda'],
  footerResourcesTitle: 'Recursos',
  footerResourceLinks: [
    'Aprender inglés',
    'Test de nivel',
    'Curso inglés gratis',
    'Precios',
    'Opiniones',
    'Cómo funciona',
    'Método natural',
    'Curso de inglés online',
    'Gramática inglesa',
    'Verbos en inglés',
    'Tiempos verbales',
    'Curso intensivo',
    'Clases de conversación',
    'Inglés para empresas',
  ],
  footerCopyright: 'Copyright © 2026 · FluidLearn',
  footerLegal: [
    { label: 'Política de privacidad', to: '/legal/privacidad' },
    { label: 'Condiciones generales', to: '/legal/condiciones-generales' },
    { label: 'Condiciones particulares', to: '/legal/condiciones-particulares' },
    { label: 'Política de cookies', to: '/legal/privacidad#cookies' },
  ],
  brandTagline: 'EdTech · Universidad Simón Bolívar – MacondoLab',
}

const BY_CODE: Record<LandingLangCode, LandingDict> = {
  es,
  en,
  'en-US': { ...en, heroSub: 'EdTech platform from Universidad Simón Bolívar – MacondoLab (US).' },
  'en-CA': { ...en, heroSub: 'EdTech platform from Universidad Simón Bolívar – MacondoLab (Canada).' },
  'en-GB': enGB,
  pt,
  'pt-BR': ptBR,
  it,
  de,
}

export function getLandingDict(code: LandingLangCode): LandingDict {
  return BY_CODE[code] ?? es
}

export function htmlLangFor(code: LandingLangCode): string {
  if (code === 'es') return 'es'
  if (code === 'pt-BR') return 'pt-BR'
  if (code.startsWith('pt')) return 'pt'
  if (code === 'en-GB') return 'en-GB'
  if (code === 'en-US') return 'en-US'
  if (code === 'en-CA') return 'en-CA'
  if (code === 'it') return 'it'
  if (code === 'de') return 'de'
  return 'es'
}

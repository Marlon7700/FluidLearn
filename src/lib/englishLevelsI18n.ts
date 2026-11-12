import type { LandingLangCode } from './landingI18n'

export type EnglishLevelCopy = {
  id: string
  code: string
  label: string
  title: string
  lead: string
  can: string[]
  skills: string[]
  to?: string
}

export type EnglishLevelsCopy = {
  heroTitle: string
  heroCta: string
  pageTitle: string
  intro: string[]
  tableHeaders: string[]
  interestTitle: string
  interestLinks: { label: string; to: string }[]
  sectionTitle: string
  sectionIntro: string
  summary: string
  register: string
  benefits: string[]
  developedSkills: string
  takeTest: string
  levels: EnglishLevelCopy[]
  helpTitle: string
  helpCards: { title: string; text: string }[]
  continueKicker: string
  continueTitle: string
  continueText: string
  continueCards: { title: string; text: string }[]
  whyTitle: string
  whyCards: { title: string; text: string }[]
  journeyTitle: string
  journeyText: string
  testCta: string
}

const levelData: EnglishLevelCopy[] = [
  {
    id: 'a1',
    code: 'A1',
    label: 'Beginner',
    title: 'A1 Level – Beginner',
    lead: 'A1 is ideal for students who are starting to learn English. By the end of this level, you will be able to:',
    can: ['Introduce yourself correctly.', 'Talk about personal information.', 'Understand everyday expressions.', 'Ask simple questions.', 'Use basic vocabulary.', 'Hold simple conversations.'],
    skills: ['Greetings and introductions', 'Family and friends', 'Colors and numbers', 'Dates and schedules', 'Places and directions', 'Basic shopping'],
    to: '/test/a1',
  },
  {
    id: 'a2',
    code: 'A2',
    label: 'Elementary',
    title: 'A2 Level – Elementary',
    lead: 'At this level, you begin to communicate more confidently in everyday situations. By the end of this level, you will be able to:',
    can: ['Talk about your daily routine.', 'Express likes and preferences.', 'Describe simple experiences.', 'Understand basic instructions.', 'Use simple past and future tenses.'],
    skills: ['Work and studies', 'Travel', 'Restaurants', 'Shopping', 'Transportation', 'Everyday activities'],
    to: '/test/a2',
  },
  {
    id: 'b1',
    code: 'B1',
    label: 'Intermediate',
    title: 'B1 Level – Intermediate',
    lead: 'This level marks the transition to more independent communication. By the end of this level, you will be able to:',
    can: ['Hold conversations about different topics.', 'Tell personal experiences.', 'Talk about goals and projects.', 'Understand texts and audio of medium complexity.', 'Interact in real travel and study situations.'],
    skills: ['Fluent conversation', 'Reading comprehension', 'Writing emails and messages', 'Opinions and experiences', 'Work and academic situations'],
    to: '/test/b1',
  },
  {
    id: 'b2',
    code: 'B2',
    label: 'Upper Intermediate',
    title: 'B2 Level – Upper Intermediate',
    lead: 'At this level, students develop a solid command of the language. By the end of this level, you will be able to:',
    can: ['Understand complex texts.', 'Take an active part in debates.', 'Express arguments and opinions.', 'Relate to native speakers more naturally.', 'Work in academic and professional environments.'],
    skills: ['Presentations', 'Discussions', 'Advanced writing', 'Understanding podcasts and lectures', 'Professional communication'],
    to: '/test/b2',
  },
  {
    id: 'c1',
    code: 'C1',
    label: 'Advanced',
    title: 'C1 Level – Advanced',
    lead: 'This level enables you to use the language confidently in demanding contexts. By the end of this level, you will be able to:',
    can: ['Understand complex and specialized texts.', 'Express yourself fluently and precisely.', 'Participate in academic and professional contexts.', 'Write advanced documents.', 'Understand implicit meanings.'],
    skills: ['Academic communication', 'Business', 'Research', 'Critical analysis', 'Advanced presentations'],
  },
  {
    id: 'c2',
    code: 'C2',
    label: 'Proficiency',
    title: 'C2 Level – Proficiency',
    lead: 'C2 represents a highly advanced command of the language. By the end of this level, you will be able to:',
    can: ['Understand practically any text or conversation.', 'Express yourself with complete naturalness.', 'Use specialized vocabulary.', 'Argue and debate precisely.', 'Perform in highly demanding international contexts.'],
    skills: ['Advanced fluency', 'Specialized comprehension', 'Complex argumentation', 'International professional communication'],
  },
]

const base: EnglishLevelsCopy = {
  heroTitle: 'Register for free and start your English course today.',
  heroCta: 'Start for free',
  pageTitle: 'CEFR English levels',
  intro: [
    'FluidLearn offers 6 learning levels based on the CEFR. Every time a student completes a level (24 units per level), they receive an official FluidLearn certificate as proof of their acquired skills.',
    'The table shows the equivalences for each level compared with certificates from the most recognized certifying institutions.',
  ],
  tableHeaders: ['English levels', 'A', 'CEFR', 'IELTS', 'Aptis', 'Cambridge', 'TOEFL'],
  interestTitle: 'Other links you may be interested in:',
  interestLinks: [
    { label: 'English levels', to: '/niveles' },
    { label: 'A1 English level', to: '/test/a1' },
    { label: 'A2 English level', to: '/test/a2' },
    { label: 'B1 English level', to: '/test/b1' },
    { label: 'B2 English level', to: '/test/b2' },
    { label: 'C1 English level', to: '/niveles' },
    { label: 'C2 English level', to: '/niveles' },
    { label: 'Level test', to: '/test' },
  ],
  sectionTitle: 'English levels',
  sectionIntro: 'To move forward, you first need to know your current level and the skills you need to strengthen. At FluidLearn we use AI, connected teachers, microlearning and academic tracking.',
  summary: 'Below is a summary of what you will learn at each of the 6 CEFR levels and which certificate you can take.',
  register: 'Register for free',
  benefits: ['Online course', 'Learn at your pace', 'Speak English', 'Get certified'],
  developedSkills: 'Skills developed:',
  takeTest: 'Take {level} test',
  levels: levelData,
  helpTitle: 'How does FluidLearn help you?',
  helpCards: [
    { title: 'Learn at your pace', text: 'Access your lessons anywhere and study whenever it suits you best.' },
    { title: 'Learn with Artificial Intelligence', text: 'Personalized recommendations, automatic assessment and immediate feedback.' },
    { title: 'Improve your speaking', text: 'Practice pronunciation and conversation with speech recognition and connected teachers.' },
    { title: 'Get academic tracking', text: 'View your progress through reports, metrics and achievements.' },
  ],
  continueKicker: 'Want to continue?',
  continueTitle: 'We are waiting for you at FluidLearn',
  continueText: 'We are the EdTech platform of Universidad Simón Bolívar – MacondoLab, with a guided and personalized course.',
  continueCards: [
    { title: 'Learn with a course', text: 'Vocabulary, grammar, writing, comprehension, speaking and certification by level.' },
    { title: 'Speak with teachers', text: 'Teacher support and speaking practice with AI.' },
    { title: 'Practice with microlearning', text: '10- to 15-minute lessons to learn something new every day.' },
  ],
  whyTitle: 'Why learn with FluidLearn?',
  whyCards: [
    { title: 'Educational Artificial Intelligence', text: 'Analyze your progress, identify areas for improvement and create personalized paths.' },
    { title: 'Connected teachers', text: 'Support from specialized teachers for comprehension and pronunciation.' },
    { title: 'Microlearning', text: '10- to 15-minute lessons adapted to your schedule.' },
    { title: 'Academic dashboard', text: 'Real-time reports and metrics.' },
  ],
  journeyTitle: 'Start your journey to fluency',
  journeyText: 'Discover your current level, design your learning path and master English step by step.',
  testCta: 'Take the free level test',
}

const es: EnglishLevelsCopy = {
  ...base,
  heroTitle: 'Regístrate gratis y empieza ya con tu curso de inglés.',
  heroCta: 'Empieza gratis',
  pageTitle: 'Niveles de inglés MCER',
  intro: [
    'El curso de FluidLearn ofrece 6 niveles de aprendizaje, basados en el MCER. Cada vez que un estudiante supera un nivel (24 unidades por nivel) se le otorga un certificado oficial de FluidLearn como prueba de las competencias adquiridas.',
    'En el cuadro puedes ver las equivalencias de cada nivel en comparación con los certificados oficiales de las instituciones certificadoras más reconocidas.',
  ],
  tableHeaders: ['Niveles de inglés', 'A', 'MCER', 'IELTS', 'Aptis', 'Cambridge', 'TOEFL'],
  interestTitle: 'Otros enlaces de tu interés:',
  interestLinks: [
    { label: 'Niveles de inglés', to: '/niveles' }, { label: 'Nivel de inglés A1', to: '/test/a1' }, { label: 'Nivel de inglés A2', to: '/test/a2' },
    { label: 'Nivel de inglés B1', to: '/test/b1' }, { label: 'Nivel de inglés B2', to: '/test/b2' }, { label: 'Nivel de inglés C1', to: '/niveles' },
    { label: 'Nivel de inglés C2', to: '/niveles' }, { label: 'Test de nivel', to: '/test' },
  ],
  sectionTitle: 'Niveles del inglés',
  sectionIntro: 'Para avanzar, primero debes conocer tu nivel actual y las habilidades que necesitas fortalecer. En FluidLearn usamos IA, profesores conectados, microlearning y seguimiento académico.',
  summary: 'A continuación, un resumen de lo que aprenderás en cada uno de los 6 niveles del MCER y a qué certificado puedes presentarte.',
  register: 'Regístrate gratis',
  benefits: ['Curso online', 'Aprende a tu ritmo', 'Habla inglés', 'Certifícate'],
  developedSkills: 'Habilidades desarrolladas:',
  takeTest: 'Presentar test {level}',
  levels: [
    { ...base.levels[0], label: 'Principiante', title: 'Nivel A1 – Principiante (Beginner)', lead: 'El nivel A1 es ideal para estudiantes que están iniciando su aprendizaje del inglés. Al finalizar este nivel podrás:', can: ['Presentarte correctamente.', 'Hablar sobre información personal.', 'Comprender expresiones cotidianas.', 'Formular preguntas sencillas.', 'Utilizar vocabulario básico.', 'Mantener conversaciones simples.'], skills: ['Saludos y presentaciones', 'Familia y amigos', 'Colores y números', 'Fechas y horarios', 'Lugares y direcciones', 'Compras básicas'] },
    { ...base.levels[1], label: 'Básico', title: 'Nivel A2 – Básico (Elementary)', lead: 'En este nivel comienzas a desenvolverte con mayor confianza en situaciones cotidianas. Al finalizar este nivel podrás:', can: ['Hablar sobre tu rutina diaria.', 'Expresar gustos y preferencias.', 'Describir experiencias sencillas.', 'Entender instrucciones básicas.', 'Utilizar tiempos pasados y futuros simples.'], skills: ['Trabajo y estudios', 'Viajes', 'Restaurantes', 'Compras', 'Transporte', 'Actividades cotidianas'] },
    { ...base.levels[2], label: 'Intermedio', title: 'Nivel B1 – Intermedio (Intermediate)', lead: 'Este nivel marca la transición hacia una comunicación más autónoma. Al finalizar este nivel podrás:', can: ['Mantener conversaciones sobre diversos temas.', 'Narrar experiencias personales.', 'Hablar sobre metas y proyectos.', 'Comprender textos y audios de complejidad media.', 'Interactuar en situaciones reales de viaje y estudio.'], skills: ['Conversación fluida', 'Comprensión lectora', 'Escritura de correos y mensajes', 'Opiniones y experiencias', 'Situaciones laborales y académicas'] },
    { ...base.levels[3], label: 'Intermedio alto', title: 'Nivel B2 – Intermedio Alto (Upper Intermediate)', lead: 'En este nivel el estudiante adquiere un dominio sólido del idioma. Al finalizar este nivel podrás:', can: ['Comprender textos complejos.', 'Participar activamente en debates.', 'Expresar argumentos y opiniones.', 'Relacionarte con hablantes nativos con mayor naturalidad.', 'Desenvolverte en entornos académicos y profesionales.'], skills: ['Presentaciones', 'Discusiones', 'Redacción avanzada', 'Comprensión de podcasts y conferencias', 'Comunicación profesional'] },
    { ...base.levels[4], label: 'Avanzado', title: 'Nivel C1 – Avanzado (Advanced)', lead: 'Este nivel permite utilizar el idioma con confianza en contextos exigentes. Al finalizar este nivel podrás:', can: ['Comprender textos complejos y especializados.', 'Expresarte con fluidez y precisión.', 'Participar en contextos académicos y profesionales.', 'Redactar documentos avanzados.', 'Comprender significados implícitos.'], skills: ['Comunicación académica', 'Negocios', 'Investigación', 'Análisis crítico', 'Presentaciones avanzadas'] },
    { ...base.levels[5], label: 'Dominio experto', title: 'Nivel C2 – Dominio Experto (Proficiency)', lead: 'El nivel C2 representa un manejo muy avanzado del idioma. Al finalizar este nivel podrás:', can: ['Comprender prácticamente cualquier tipo de texto o conversación.', 'Expresarte con total naturalidad.', 'Utilizar vocabulario especializado.', 'Argumentar y debatir con precisión.', 'Desempeñarte en contextos internacionales altamente exigentes.'], skills: ['Fluidez avanzada', 'Comprensión especializada', 'Argumentación compleja', 'Comunicación profesional internacional'] },
  ],
  helpTitle: '¿Cómo te ayuda FluidLearn?',
  helpCards: [
    { title: 'Aprende a tu ritmo', text: 'Accede a tus lecciones desde cualquier lugar y estudia cuando mejor te convenga.' },
    { title: 'Aprende con Inteligencia Artificial', text: 'Recomendaciones personalizadas, evaluación automática y retroalimentación inmediata.' },
    { title: 'Mejora tu Speaking', text: 'Practica pronunciación y conversación con reconocimiento de voz y profesores conectados.' },
    { title: 'Obtén seguimiento académico', text: 'Visualiza tu progreso mediante reportes, métricas y logros.' },
  ],
  continueKicker: '¿Quieres continuar?',
  continueTitle: 'Te esperamos en FluidLearn',
  continueText: 'Somos la plataforma EdTech de la Universidad Simón Bolívar – MacondoLab, con un curso guiado y personalizado.',
  continueCards: [
    { title: 'Aprende con un curso', text: 'Vocabulario, gramática, escritura, comprensión, oral y certificación por nivel.' },
    { title: 'Habla con profesores', text: 'Acompañamiento de docentes y práctica de speaking con IA.' },
    { title: 'Practica con microlearning', text: 'Lecciones de 10 a 15 minutos para aprender algo nuevo cada día.' },
  ],
  whyTitle: '¿Por qué aprender con FluidLearn?',
  whyCards: [
    { title: 'Inteligencia Artificial Educativa', text: 'Analiza tu progreso, identifica oportunidades de mejora y genera rutas personalizadas.' },
    { title: 'Profesores conectados', text: 'Apoyo de docentes especializados para comprensión y pronunciación.' },
    { title: 'Microlearning', text: 'Lecciones de 10 a 15 minutos adaptadas a tu tiempo.' },
    { title: 'Dashboard académico', text: 'Reportes y métricas en tiempo real.' },
  ],
  journeyTitle: 'Comienza tu camino hacia la fluidez',
  journeyText: 'Descubre tu nivel actual, diseña tu ruta de aprendizaje y domina el inglés paso a paso.',
  testCta: 'Realizar test de nivel gratis',
}

const localizedUi: Record<string, Partial<EnglishLevelsCopy>> = {
  pt: { heroTitle: 'Registe-se grátis e comece já o seu curso de inglês.', heroCta: 'Comece grátis', pageTitle: 'Níveis de inglês do QECR', interestTitle: 'Outros links do seu interesse:', sectionTitle: 'Níveis de inglês', register: 'Registe-se grátis', benefits: ['Curso online', 'Aprenda ao seu ritmo', 'Fale inglês', 'Certifique-se'], developedSkills: 'Competências desenvolvidas:', continueKicker: 'Quer continuar?', continueTitle: 'Esperamos por si na FluidLearn', whyTitle: 'Porquê aprender com a FluidLearn?', journeyTitle: 'Comece o seu caminho para a fluência', testCta: 'Fazer teste de nível grátis' },
  it: { heroTitle: 'Registrati gratis e inizia subito il tuo corso di inglese.', heroCta: 'Inizia gratis', pageTitle: 'Livelli di inglese QCER', interestTitle: 'Altri link che potrebbero interessarti:', sectionTitle: 'Livelli di inglese', register: 'Registrati gratis', benefits: ['Corso online', 'Impara al tuo ritmo', 'Parla inglese', 'Ottieni la certificazione'], developedSkills: 'Competenze sviluppate:', continueKicker: 'Vuoi continuare?', continueTitle: 'Ti aspettiamo su FluidLearn', whyTitle: 'Perché imparare con FluidLearn?', journeyTitle: 'Inizia il tuo percorso verso la fluidità', testCta: 'Fai il test di livello gratuito' },
  de: { heroTitle: 'Registriere dich kostenlos und beginne jetzt deinen Englischkurs.', heroCta: 'Kostenlos starten', pageTitle: 'Englisch-Niveaus nach GER', interestTitle: 'Weitere interessante Links:', sectionTitle: 'Englisch-Niveaus', register: 'Kostenlos registrieren', benefits: ['Onlinekurs', 'Lerne in deinem Tempo', 'Sprich Englisch', 'Zertifiziere dich'], developedSkills: 'Entwickelte Fähigkeiten:', continueKicker: 'Möchtest du weitermachen?', continueTitle: 'Wir erwarten dich bei FluidLearn', whyTitle: 'Warum mit FluidLearn lernen?', journeyTitle: 'Starte deinen Weg zur Sprachsicherheit', testCta: 'Kostenlosen Einstufungstest machen' },
}

export function getEnglishLevelsCopy(code: LandingLangCode): EnglishLevelsCopy {
  if (code === 'es') return es
  return { ...base, ...(localizedUi[code] ?? {}) }
}

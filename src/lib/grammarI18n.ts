import type { LandingLangCode } from './landingI18n'

export type GrammarCopy = {
  kicker: string
  title: string
  lead: string
  startTitle: string
  startBody: string
  startCta: string
  routineTitle: string
  routineLead: string
  routineDay: string
  routineItems: string[]
  routineHabit: string
  grammarTitle: string
  grammarBody: string
  mediaTitle: string
  media: { title: string; body: string }[]
  learnTitle: string
  basicTitle: string
  basicItems: string[]
  midTitle: string
  midItems: string[]
  advTitle: string
  advItems: string[]
  aiTitle: string
  aiItems: string[]
  teachersTitle: string
  teachersLead: string
  teachersItems: string[]
  devicesTitle: string
  devices: string[]
  devicesNote: string
  accessTitle: string
  accessLead: string
  accessItems: string[]
  instTitle: string
  instLead: string
  instItems: string[]
  closeTitle: string
  closeItems: string[]
  closeCta: string
}

const es: GrammarCopy = {
  kicker: 'Gramática inglesa',
  title: 'Aprende gramática inglesa con FluidLearn',
  lead:
    'En FluidLearn podrás comenzar tu aprendizaje del inglés de forma práctica, dinámica y personalizada. Nuestra plataforma ha sido diseñada para ayudarte a mejorar tus competencias lingüísticas mediante el uso de Inteligencia Artificial, profesores conectados y contenido interactivo adaptado a tu nivel.',
  startTitle: 'Empieza gratis',
  startBody:
    'Realiza tu prueba de nivel y accede a los primeros contenidos de gramática, vocabulario y pronunciación diseñados para fortalecer tu aprendizaje desde el primer día.',
  startCta: 'Empezar gratis',
  routineTitle: 'Crea una rutina de aprendizaje exitosa',
  routineLead:
    'El éxito en el aprendizaje del inglés se basa en la constancia. Por eso, FluidLearn te ofrece contenido progresivo y estructurado para que puedas avanzar paso a paso sin sentirte abrumado.',
  routineDay: 'Cada día encontrarás',
  routineItems: [
    'Nuevas lecciones interactivas.',
    'Ejercicios prácticos adaptados a tu nivel.',
    'Actividades de Listening, Speaking, Reading y Writing.',
    'Recomendaciones personalizadas generadas por Inteligencia Artificial.',
    'Retroalimentación automática sobre tu desempeño.',
  ],
  routineHabit: 'Con solo unos minutos al día podrás crear un hábito de estudio efectivo y sostenible.',
  grammarTitle: 'Aprende gramática de forma fácil y práctica',
  grammarBody:
    'Sabemos que para muchos estudiantes la gramática puede parecer complicada. Por eso, en FluidLearn la enseñamos de manera visual, interactiva y progresiva, utilizando ejemplos reales y situaciones cotidianas. Cada módulo ha sido diseñado para ayudarte a comprender las estructuras del idioma sin memorizar reglas complejas.',
  mediaTitle: 'Lecciones interactivas y multimedia',
  media: [
    {
      title: 'Videos explicativos',
      body: 'Contenido audiovisual que explica conceptos gramaticales de forma sencilla y clara.',
    },
    {
      title: 'Inteligencia Artificial educativa',
      body: 'La IA analiza tus respuestas y te ayuda a corregir errores mientras aprendes.',
    },
    {
      title: 'Ejercicios prácticos',
      body: 'Actividades dinámicas para reforzar los conceptos aprendidos.',
    },
    {
      title: 'Evaluación de pronunciación',
      body: 'Practica speaking y recibe retroalimentación instantánea.',
    },
    {
      title: 'Material adaptado por niveles',
      body: 'Desde A1 hasta C2, cada estudiante recibe contenidos acordes a sus conocimientos.',
    },
  ],
  learnTitle: '¿Qué aprenderás?',
  basicTitle: 'Nivel básico',
  basicItems: [
    'Verbo To Be.',
    'Pronombres personales.',
    'Números y fechas.',
    'Colores.',
    'Saludos y presentaciones.',
    'Vocabulario cotidiano.',
  ],
  midTitle: 'Nivel intermedio',
  midItems: [
    'Tiempos verbales.',
    'Pasado simple.',
    'Futuro.',
    'Comparativos y superlativos.',
    'Expresiones comunes.',
    'Conversaciones cotidianas.',
  ],
  advTitle: 'Nivel avanzado',
  advItems: [
    'Verbos modales.',
    'Voz pasiva.',
    'Reported Speech.',
    'Condicionales.',
    'Phrasal Verbs.',
    'Redacción académica y profesional.',
  ],
  aiTitle: 'Aprende con Inteligencia Artificial',
  aiItems: [
    'Evaluar ejercicios automáticamente.',
    'Mejorar tu pronunciación.',
    'Detectar errores frecuentes.',
    'Crear rutas de aprendizaje personalizadas.',
    'Recomendar actividades de refuerzo según tu progreso.',
  ],
  teachersTitle: 'Profesores conectados',
  teachersLead: 'Los usuarios Premium podrán acceder a apoyo especializado para:',
  teachersItems: [
    'Resolver dudas.',
    'Mejorar speaking y pronunciación.',
    'Prepararse para pruebas de nivel.',
    'Alcanzar objetivos académicos y profesionales.',
  ],
  devicesTitle: 'Aprende desde cualquier lugar',
  devices: ['Computadores', 'Smartphones', 'Tablets'],
  devicesNote: 'Nuestra plataforma es totalmente responsiva y te permite continuar aprendiendo donde quieras.',
  accessTitle: 'Accesibilidad para todos',
  accessLead: 'FluidLearn ha sido desarrollado pensando en la inclusión educativa.',
  accessItems: [
    'Modo oscuro.',
    'Ajuste de tamaño de letra (+A / −A).',
    'Alto contraste.',
    'Compatibilidad con lectores de pantalla.',
    'Navegación mediante teclado.',
    'Adaptación a cualquier dispositivo.',
  ],
  instTitle: 'Diseñado para colegios y universidades',
  instLead: 'FluidLearn ayuda a instituciones educativas a fortalecer las competencias lingüísticas de sus estudiantes mediante:',
  instItems: [
    'Pruebas diagnósticas.',
    'Seguimiento académico.',
    'Dashboard institucional.',
    'Reportes de progreso.',
    'Alertas tempranas.',
    'Cumplimiento de requisitos de graduación.',
  ],
  closeTitle: 'Comienza hoy',
  closeItems: [
    'Descubre tu nivel',
    'Aprende con IA',
    'Recibe apoyo profesional',
    'Alcanza tus metas académicas',
  ],
  closeCta: 'Comenzar gratis ahora',
}

const en: GrammarCopy = {
  kicker: 'English grammar',
  title: 'Learn English grammar with FluidLearn',
  lead:
    'With FluidLearn you can start learning English in a practical, dynamic and personalized way. Our platform helps you improve your language skills with Artificial Intelligence, connected teachers and interactive content adapted to your level.',
  startTitle: 'Start for free',
  startBody:
    'Take your placement test and access the first grammar, vocabulary and pronunciation lessons designed to strengthen your learning from day one.',
  startCta: 'Start free',
  routineTitle: 'Build a successful learning routine',
  routineLead:
    'Success in English comes from consistency. FluidLearn gives you progressive, structured content so you can move forward step by step without feeling overwhelmed.',
  routineDay: 'Every day you will find',
  routineItems: [
    'New interactive lessons.',
    'Practice exercises adapted to your level.',
    'Listening, Speaking, Reading and Writing activities.',
    'Personalized recommendations generated by Artificial Intelligence.',
    'Automatic feedback on your performance.',
  ],
  routineHabit: 'A few minutes a day are enough to build an effective, sustainable study habit.',
  grammarTitle: 'Learn grammar the easy, practical way',
  grammarBody:
    'We know grammar can feel complicated. That is why FluidLearn teaches it visually, interactively and progressively, with real examples and everyday situations. Each module helps you understand language structures without memorizing dense rules.',
  mediaTitle: 'Interactive and multimedia lessons',
  media: [
    { title: 'Explainer videos', body: 'Audiovisual content that explains grammar concepts in a simple, clear way.' },
    { title: 'Educational AI', body: 'AI analyzes your answers and helps you correct mistakes as you learn.' },
    { title: 'Practice exercises', body: 'Dynamic activities to reinforce what you have learned.' },
    { title: 'Pronunciation assessment', body: 'Practice speaking and get instant feedback.' },
    { title: 'Level-adapted material', body: 'From A1 to C2, every student gets content that matches their knowledge.' },
  ],
  learnTitle: 'What will you learn?',
  basicTitle: 'Basic level',
  basicItems: ['Verb To Be.', 'Personal pronouns.', 'Numbers and dates.', 'Colors.', 'Greetings and introductions.', 'Everyday vocabulary.'],
  midTitle: 'Intermediate level',
  midItems: ['Verb tenses.', 'Simple past.', 'Future.', 'Comparatives and superlatives.', 'Common expressions.', 'Everyday conversations.'],
  advTitle: 'Advanced level',
  advItems: ['Modal verbs.', 'Passive voice.', 'Reported speech.', 'Conditionals.', 'Phrasal verbs.', 'Academic and professional writing.'],
  aiTitle: 'Learn with Artificial Intelligence',
  aiItems: [
    'Automatically grade exercises.',
    'Improve your pronunciation.',
    'Detect frequent mistakes.',
    'Create personalized learning paths.',
    'Recommend extra practice based on your progress.',
  ],
  teachersTitle: 'Connected teachers',
  teachersLead: 'Premium users get specialist support to:',
  teachersItems: [
    'Resolve questions.',
    'Improve speaking and pronunciation.',
    'Prepare for level tests.',
    'Reach academic and professional goals.',
  ],
  devicesTitle: 'Learn from anywhere',
  devices: ['Computers', 'Smartphones', 'Tablets'],
  devicesNote: 'The platform is fully responsive so you can keep learning wherever you are.',
  accessTitle: 'Accessibility for everyone',
  accessLead: 'FluidLearn was built with educational inclusion in mind.',
  accessItems: [
    'Dark mode.',
    'Text size controls (+A / −A).',
    'High contrast.',
    'Screen reader compatibility.',
    'Keyboard navigation.',
    'Adaptation to any device.',
  ],
  instTitle: 'Built for schools and universities',
  instLead: 'FluidLearn helps institutions strengthen students’ language skills through:',
  instItems: [
    'Diagnostic tests.',
    'Academic follow-up.',
    'Institutional dashboard.',
    'Progress reports.',
    'Early alerts.',
    'Graduation requirement tracking.',
  ],
  closeTitle: 'Start today',
  closeItems: ['Discover your level', 'Learn with AI', 'Get professional support', 'Reach your academic goals'],
  closeCta: 'Start free now',
}

export function getGrammarCopy(lang: LandingLangCode): GrammarCopy {
  return lang === 'es' ? es : en
}

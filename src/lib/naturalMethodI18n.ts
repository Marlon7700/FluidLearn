import type { LandingLangCode } from './landingI18n'

export type NaturalCopy = {
  heroTitle: string
  heroLead: string
  startCta: string
  intro: [string, string]
  startTitle: string
  startLead: string
  contentsTitle: string
  contents: string[]
  firstTitle: string
  firstLead: string[]
  listenTitle: string
  listenLead: string[]
  listenItems: string[]
  listenClose: string
  aiTitle: string
  aiLead: string
  aiItems: string[]
  aiClose: string
  thenTitle: string
  thenLead: string
  skills: { title: string; body: string }[]
  grammarTitle: string
  grammarLead: string
  grammarItems: string[]
  grammarClose: string
  teachersTitle: string
  teachersLead: string
  teachersItems: string[]
  microTitle: string
  microLead: string
  microItems: string[]
  dashTitle: string
  dashLead: string
  dashItems: string[]
  accessTitle: string
  accessLead: string
  accessItems: string[]
  whyTitle: string
  whyLead: string
  whyItems: string[]
  whyGoal: string
  closeTitle: string
  closeLead: string
  closeCta: string
}

const es: NaturalCopy = {
  heroTitle: 'El Método Natural de FluidLearn',
  heroLead:
    'Una metodología innovadora que te permite aprender inglés de forma auténtica, práctica y progresiva.',
  startCta: 'Quiero aprender inglés',
  intro: [
    'Nuestro objetivo no es que memorices reglas, sino que desarrolles las competencias necesarias para comunicarte con confianza en situaciones reales.',
    'Con el apoyo de Inteligencia Artificial, profesores conectados y contenido interactivo, aprenderás inglés de manera similar a como adquiriste tu lengua materna: primero escuchando, luego hablando y finalmente perfeccionando la lectura y la escritura.',
  ],
  startTitle: 'Empieza tu aprendizaje hoy mismo',
  startLead: 'Realiza tu prueba de nivel y descubre tu ruta personalizada de aprendizaje.',
  contentsTitle: 'Contenidos que encontrarás',
  contents: [
    'Tiempos verbales',
    'Verbo To Be',
    'Verbos regulares',
    'Verbos irregulares',
    'Listening',
    'Speaking',
    'Reading',
    'Writing',
    'Pronunciación',
    'Vocabulario',
    'Gramática aplicada',
  ],
  firstTitle: 'Aprende inglés como aprendiste tu primer idioma',
  firstLead: [
    '¿Alguna vez te has preguntado cómo aprendiste a hablar? No comenzaste estudiando reglas gramaticales.',
    'Primero escuchaste. Luego comprendiste. Después hablaste. Más tarde aprendiste a leer y escribir.',
    'FluidLearn utiliza este principio para construir experiencias de aprendizaje más naturales y efectivas. Nuestro enfoque está centrado en el uso real del idioma y en la comunicación práctica desde el primer día.',
  ],
  listenTitle: 'Primero escuchar y hablar',
  listenLead: [
    'Imagina que viajas a un país donde hablan inglés. ¿Cuál sería tu primer desafío? Escuchar y entender.',
    'Por eso, cada módulo de FluidLearn comienza con actividades diseñadas para desarrollar tu comprensión auditiva y tu capacidad de expresión oral. Podrás:',
  ],
  listenItems: [
    'Escuchar conversaciones reales.',
    'Comprender expresiones cotidianas.',
    'Practicar pronunciación mediante Inteligencia Artificial.',
    'Repetir y mejorar tu fluidez.',
    'Participar en ejercicios de speaking.',
    'Recibir retroalimentación inmediata.',
  ],
  listenClose: 'Desde el primer día comenzarás a comunicarte en inglés de forma práctica y progresiva.',
  aiTitle: 'Inteligencia Artificial que te guía',
  aiLead: 'FluidLearn incorpora Inteligencia Artificial Educativa para potenciar tu aprendizaje. Nuestra IA puede:',
  aiItems: [
    'Evaluar tu pronunciación.',
    'Calificar automáticamente ejercicios.',
    'Detectar errores frecuentes.',
    'Personalizar tus actividades.',
    'Recomendar contenido de refuerzo.',
    'Adaptar tu ruta de aprendizaje según tu progreso.',
  ],
  aiClose: 'Así cada estudiante recibe una experiencia única y personalizada.',
  thenTitle: 'Después, escritura y vocabulario',
  thenLead:
    'Una vez fortalecidas las habilidades de escucha y comunicación, comenzarás a desarrollar competencias más avanzadas.',
  skills: [
    { title: 'Reading', body: 'Comprensión de textos adaptados a cada nivel.' },
    { title: 'Writing', body: 'Construcción de oraciones, respuestas y textos progresivos.' },
    { title: 'Vocabulary', body: 'Aprendizaje de vocabulario aplicado a situaciones académicas, laborales y cotidianas.' },
  ],
  grammarTitle: 'La gramática como complemento',
  grammarLead: 'En FluidLearn la gramática es una herramienta que te ayuda a comunicarte mejor. Por ello aprenderás progresivamente:',
  grammarItems: [
    'Verbo To Be.',
    'Present Simple.',
    'Present Continuous.',
    'Past Simple.',
    'Future Forms.',
    'Verbos regulares e irregulares.',
    'Comparativos y superlativos.',
    'Condicionales.',
    'Voz pasiva.',
    'Reported Speech.',
  ],
  grammarClose: 'Todo mediante ejemplos reales, ejercicios interactivos y retroalimentación inteligente.',
  teachersTitle: 'Aprende con profesores conectados',
  teachersLead: 'Los estudiantes Premium contarán con apoyo de profesores especializados que les ayudarán a:',
  teachersItems: [
    'Resolver dudas.',
    'Mejorar su pronunciación.',
    'Fortalecer habilidades comunicativas.',
    'Recibir orientación académica personalizada.',
  ],
  microTitle: 'Microlearning: aprende en pocos minutos',
  microLead: 'Cada lección está diseñada para completarse en sesiones cortas de entre 10 y 15 minutos. Esto te permitirá:',
  microItems: [
    'Aprender a tu ritmo.',
    'Mantener la motivación.',
    'Crear hábitos de estudio efectivos.',
    'Avanzar sin descuidar tus otras actividades.',
  ],
  dashTitle: 'Seguimiento de tu progreso',
  dashLead: 'Gracias al Dashboard Académico de FluidLearn podrás:',
  dashItems: [
    'Ver tu avance por niveles.',
    'Revisar resultados de evaluaciones.',
    'Analizar tus habilidades en Listening, Speaking, Reading y Writing.',
    'Recibir recomendaciones personalizadas.',
    'Medir tu evolución constantemente.',
  ],
  accessTitle: 'Aprendizaje accesible para todos',
  accessLead: 'FluidLearn ha sido desarrollado bajo principios de inclusión educativa. Incluye:',
  accessItems: [
    'Modo oscuro.',
    'Ajuste del tamaño de texto (+A / −A).',
    'Compatibilidad con lectores de pantalla.',
    'Navegación mediante teclado.',
    'Alto contraste visual.',
    'Diseño adaptable a cualquier dispositivo.',
  ],
  whyTitle: '¿Por qué funciona el Método Natural de FluidLearn?',
  whyLead: 'Porque combina:',
  whyItems: [
    'Inteligencia Artificial.',
    'Profesores conectados.',
    'Microlearning.',
    'Seguimiento académico.',
    'Aprendizaje personalizado.',
    'Accesibilidad total.',
    'Integración con colegios y universidades.',
  ],
  whyGoal: 'Todo con un único objetivo: que aprendas inglés de forma natural, práctica y efectiva.',
  closeTitle: 'Comienza gratis ahora',
  closeLead:
    'Descubre tu nivel, aprende con Inteligencia Artificial y alcanza tus metas académicas y profesionales con FluidLearn.',
  closeCta: 'Quiero aprender inglés',
}

const en: NaturalCopy = {
  heroTitle: 'The FluidLearn Natural Method',
  heroLead:
    'An innovative methodology that lets you learn English in an authentic, practical and progressive way.',
  startCta: 'I want to learn English',
  intro: [
    'Our goal is not that you memorize rules, but that you build the skills to communicate with confidence in real situations.',
    'With Artificial Intelligence, connected teachers and interactive content, you will learn English the way you acquired your first language: first by listening, then by speaking, and finally by refining reading and writing.',
  ],
  startTitle: 'Start learning today',
  startLead: 'Take your placement test and discover your personalized learning path.',
  contentsTitle: 'What you will find',
  contents: [
    'Verb tenses',
    'Verb To Be',
    'Regular verbs',
    'Irregular verbs',
    'Listening',
    'Speaking',
    'Reading',
    'Writing',
    'Pronunciation',
    'Vocabulary',
    'Applied grammar',
  ],
  firstTitle: 'Learn English the way you learned your first language',
  firstLead: [
    'Have you ever wondered how you learned to speak? You did not start with grammar rules.',
    'First you listened. Then you understood. After that you spoke. Later you learned to read and write.',
    'FluidLearn uses this principle to build more natural, effective learning. We focus on real use of the language and practical communication from day one.',
  ],
  listenTitle: 'First listen and speak',
  listenLead: [
    'Imagine you travel to a country where people speak English. What would your first challenge be? Listening and understanding.',
    'That is why every FluidLearn module starts with activities designed to build listening comprehension and oral expression. You will be able to:',
  ],
  listenItems: [
    'Listen to real conversations.',
    'Understand everyday expressions.',
    'Practice pronunciation with Artificial Intelligence.',
    'Repeat and improve your fluency.',
    'Take part in speaking exercises.',
    'Get immediate feedback.',
  ],
  listenClose: 'From day one you will start communicating in English in a practical, progressive way.',
  aiTitle: 'Artificial Intelligence that guides you',
  aiLead: 'FluidLearn uses Educational Artificial Intelligence to boost your learning. Our AI can:',
  aiItems: [
    'Assess your pronunciation.',
    'Grade exercises automatically.',
    'Detect frequent mistakes.',
    'Personalize your activities.',
    'Recommend extra practice.',
    'Adapt your learning path to your progress.',
  ],
  aiClose: 'So every student gets a unique, personalized experience.',
  thenTitle: 'Then writing and vocabulary',
  thenLead:
    'Once listening and communication skills are stronger, you start building more advanced competences.',
  skills: [
    { title: 'Reading', body: 'Comprehension of texts adapted to each level.' },
    { title: 'Writing', body: 'Building sentences, answers and progressive texts.' },
    { title: 'Vocabulary', body: 'Vocabulary applied to academic, work and everyday situations.' },
  ],
  grammarTitle: 'Grammar as a complement',
  grammarLead: 'At FluidLearn grammar is a tool that helps you communicate better. You will learn, step by step:',
  grammarItems: [
    'Verb To Be.',
    'Present Simple.',
    'Present Continuous.',
    'Past Simple.',
    'Future Forms.',
    'Regular and irregular verbs.',
    'Comparatives and superlatives.',
    'Conditionals.',
    'Passive voice.',
    'Reported speech.',
  ],
  grammarClose: 'All through real examples, interactive exercises and intelligent feedback.',
  teachersTitle: 'Learn with connected teachers',
  teachersLead: 'Premium students get support from specialist teachers who help them:',
  teachersItems: [
    'Resolve questions.',
    'Improve pronunciation.',
    'Strengthen communication skills.',
    'Receive personalized academic guidance.',
  ],
  microTitle: 'Microlearning: learn in a few minutes',
  microLead: 'Each lesson is designed to be completed in short sessions of 10 to 15 minutes. This lets you:',
  microItems: [
    'Learn at your own pace.',
    'Stay motivated.',
    'Build effective study habits.',
    'Move forward without neglecting other activities.',
  ],
  dashTitle: 'Track your progress',
  dashLead: 'With FluidLearn’s academic dashboard you can:',
  dashItems: [
    'See your progress by level.',
    'Review assessment results.',
    'Analyze Listening, Speaking, Reading and Writing.',
    'Receive personalized recommendations.',
    'Measure your evolution constantly.',
  ],
  accessTitle: 'Accessible learning for everyone',
  accessLead: 'FluidLearn was built with educational inclusion in mind. It includes:',
  accessItems: [
    'Dark mode.',
    'Text size controls (+A / −A).',
    'Screen reader compatibility.',
    'Keyboard navigation.',
    'High visual contrast.',
    'A layout that adapts to any device.',
  ],
  whyTitle: 'Why does the FluidLearn Natural Method work?',
  whyLead: 'Because it combines:',
  whyItems: [
    'Artificial Intelligence.',
    'Connected teachers.',
    'Microlearning.',
    'Academic follow-up.',
    'Personalized learning.',
    'Full accessibility.',
    'Integration with schools and universities.',
  ],
  whyGoal: 'All with one goal: that you learn English in a natural, practical and effective way.',
  closeTitle: 'Start for free now',
  closeLead:
    'Discover your level, learn with Artificial Intelligence and reach your academic and professional goals with FluidLearn.',
  closeCta: 'I want to learn English',
}

export function getNaturalMethodCopy(lang: LandingLangCode): NaturalCopy {
  return lang === 'es' ? es : en
}

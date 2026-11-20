import type { LandingLangCode } from './landingI18n'

export type TipsCopy = {
  heroTitle: string
  heroLead: string
  startCta: string
  featured: { label: string; to: string }[]
  intro: [string, string]
  tipsTitle: string
  tipsLead: string
  tips: { title: string; body: string; extra?: string }[]
  futureTitle: string
  futureLead: string
  futureItems: string[]
  levelTitle: string
  levelLead: [string, string]
  levelCta: string
  tableHeaders: string[]
  levels: { code: string; label: string }[]
  resourcesTitle: string
  resourcesLead: string
  resources: { title: string; body: string; items?: string[] }[]
  instTitle: string
  instLead: string
  instItems: string[]
  accessTitle: string
  accessLead: string
  accessItems: string[]
  interestTitle: string
  interestLinks: { label: string; to: string }[]
  continueKicker: string
  continueTitle: string
  continueText: string
  continueCards: { title: string; text: string }[]
  closeTitle: string
  closeLead: string
  closeItems: string[]
  closeCta: string
}

const es: TipsCopy = {
  heroTitle: 'Consejos para aprender inglés',
  heroLead:
    '¿Quieres mejorar tu nivel de inglés para cumplir requisitos universitarios, acceder a mejores oportunidades laborales o alcanzar tus metas personales? En FluidLearn encontrarás las herramientas, la tecnología y el acompañamiento necesarios para lograrlo.',
  startCta: 'Empieza gratis',
  featured: [
    { label: 'Test de nivel', to: '/test' },
    { label: 'Curso de inglés gratuito', to: '/register' },
    { label: 'Tiempos verbales en inglés', to: '/gramatica' },
  ],
  intro: [
    'Nuestra plataforma combina Inteligencia Artificial, profesores conectados, microlearning y aprendizaje personalizado para ayudarte a desarrollar competencias reales en inglés de forma práctica y efectiva.',
    'Aprender inglés es básico para mejorar tus competencias tanto personales como profesionales. Aquí te hablamos de recursos útiles para conocer mejor la lengua.',
  ],
  tipsTitle: 'Consejos para aprender inglés de forma efectiva',
  tipsLead: 'Los recursos de FluidLearn son muy útiles para aprender inglés, y en este apartado te queremos dar algunos consejos. Si los llevas a cabo, seguro que mejorar el idioma será más fácil.',
  tips: [
    {
      title: 'Aprende frases y no palabras sueltas',
      body: 'Aprender expresiones y frases completas te ayudará a comprender mejor el contexto y utilizar el vocabulario de forma más natural. Por ejemplo, en lugar de memorizar únicamente “study”, aprende “I study English every day.” Esto mejora tu comprensión y tu capacidad de comunicación.',
    },
    {
      title: 'Primero habla, después aprende cómo se escribe',
      body: 'El Método Natural de FluidLearn se basa en la forma en que aprendemos nuestra lengua materna: primero escuchamos, luego hablamos, después leemos y escribimos. Por ello fomentamos la comunicación práctica desde el primer día.',
    },
    {
      title: 'Escucha',
      body: 'La comprensión auditiva es fundamental para mejorar pronunciación, vocabulario, fluidez y comprensión. Escucha podcasts, videos, música y conversaciones auténticas en inglés todos los días.',
    },
    {
      title: 'Repite la lección',
      body: 'Aprender un idioma requiere repetición. Antes de avanzar, revisa ejercicios anteriores, practica el vocabulario aprendido, escucha de nuevo los audios y repite ejercicios de pronunciación. La práctica constante fortalece la memoria a largo plazo.',
    },
    {
      title: 'Cambia los tiempos verbales de tus historias',
      body: 'Los tiempos verbales son esenciales para comunicarte correctamente. Intenta transformar una misma idea en presente, pasado, futuro y presente perfecto. Esto te ayudará a comprender mejor las estructuras gramaticales.',
    },
    {
      title: 'Incorpora el inglés en tu vida cotidiana y en las cosas que te interesan',
      body: 'Convierte el inglés en parte de tu rutina: ve series, escucha música, lee artículos, configura tus dispositivos y usa videojuegos en inglés. Mientras más contacto tengas con el idioma, más rápido progresarás.',
    },
    {
      title: 'Participa activamente',
      body: 'No te limites a escuchar o leer. Responde preguntas, forma oraciones, expresa opiniones y practica conversaciones. La participación activa acelera el aprendizaje de forma significativa.',
    },
  ],
  futureTitle: 'Aprende inglés para transformar tu futuro',
  futureLead: 'El inglés se ha convertido en una de las habilidades más importantes para el ámbito académico y profesional. Aprender inglés te ayudará a:',
  futureItems: [
    'Cumplir requisitos de graduación.',
    'Acceder a programas internacionales.',
    'Mejorar tu perfil profesional.',
    'Obtener mejores oportunidades laborales.',
    'Comunicarte globalmente.',
    'Acceder a contenido educativo internacional.',
  ],
  levelTitle: '¿Cuál es mi nivel de inglés?',
  levelLead: [
    'Cada estudiante tiene conocimientos, experiencias y objetivos diferentes. Por eso, el primer paso es conocer tu nivel actual.',
    'En FluidLearn puedes realizar un test de nivel gratuito. La evaluación identifica tu nivel según el MCER y la Inteligencia Artificial genera una ruta de aprendizaje personalizada basada en tus resultados.',
  ],
  levelCta: 'Test de nivel',
  tableHeaders: ['Niveles de inglés', 'A', 'MCER', 'IELTS', 'Aptis', 'Cambridge', 'TOEFL'],
  levels: [
    { code: 'A1', label: 'Principiante' },
    { code: 'A2', label: 'Básico' },
    { code: 'B1', label: 'Intermedio' },
    { code: 'B2', label: 'Intermedio alto' },
    { code: 'C1', label: 'Avanzado' },
    { code: 'C2', label: 'Dominio experto' },
  ],
  resourcesTitle: '¿Qué recursos puedes usar para aprender inglés?',
  resourcesLead: 'Nuestra plataforma reúne todo lo necesario para aprender inglés en un solo lugar.',
  resources: [
    {
      title: 'Gramática interactiva',
      body: 'Aprende temas como verbo To Be, tiempos verbales, pronombres, preposiciones, voz pasiva, verbos regulares e irregulares, condicionales y reported speech.',
    },
    {
      title: 'Listening',
      body: 'Mejora tu comprensión auditiva con audios interactivos, conversaciones reales, pronunciaciones nativas y ejercicios de comprensión.',
    },
    {
      title: 'Speaking con Inteligencia Artificial',
      body: 'Practica conversación y pronunciación. La IA evalúa tu pronunciación, detecta errores, mejora tu fluidez y te ayuda a ganar confianza al hablar.',
    },
    {
      title: 'Reading y writing',
      body: 'Lecturas adaptadas por nivel, textos académicos, ejercicios de comprensión y escritura guiada con retroalimentación automática.',
    },
    {
      title: 'Profesores conectados',
      body: 'Los estudiantes Premium disponen de apoyo de profesores especializados para resolver dudas, mejorar speaking, recibir orientación académica y acelerar su progreso.',
    },
    {
      title: 'Dashboard académico',
      body: 'Monitorea tu evolución con reportes de progreso, resultados de evaluaciones, competencias desarrolladas, recomendaciones de la IA y seguimiento personalizado.',
    },
  ],
  instTitle: 'Diseñado para colegios y universidades',
  instLead: 'FluidLearn ayuda a las instituciones educativas a:',
  instItems: [
    'Evaluar estudiantes.',
    'Monitorear competencias lingüísticas.',
    'Generar reportes académicos.',
    'Implementar alertas tempranas.',
    'Apoyar procesos de bilingüismo.',
    'Facilitar requisitos de graduación.',
  ],
  accessTitle: 'Educación accesible para todos',
  accessLead: 'FluidLearn incorpora:',
  accessItems: [
    'Modo oscuro.',
    'Ajuste de tamaño de texto (+A / −A).',
    'Compatibilidad con lectores de pantalla.',
    'Navegación mediante teclado.',
    'Alto contraste visual.',
    'Diseño adaptable a cualquier dispositivo.',
  ],
  interestTitle: 'Otros enlaces de tu interés:',
  interestLinks: [
    { label: 'Test de nivel', to: '/test' },
    { label: 'Niveles de inglés', to: '/niveles' },
    { label: 'Gramática inglesa', to: '/gramatica' },
    { label: 'Método natural', to: '/metodo-natural' },
    { label: 'Cómo funciona', to: '/como-funciona' },
    { label: 'Curso intensivo', to: '/curso-intensivo' },
    { label: 'Inglés para adultos', to: '/ingles-adultos' },
    { label: 'Curso de inglés gratis', to: '/register' },
  ],
  continueKicker: '¿Quieres continuar?',
  continueTitle: 'Te esperamos en FluidLearn',
  continueText: 'Somos la plataforma EdTech de la Universidad Simón Bolívar – MacondoLab, con un curso guiado y personalizado.',
  continueCards: [
    { title: 'Aprende con un curso', text: 'Vocabulario, gramática, escritura, comprensión, oral y certificación por nivel.' },
    { title: 'Habla con profesores', text: 'Acompañamiento de docentes y práctica de speaking con IA.' },
    { title: 'Practica con microlearning', text: 'Lecciones de 10 a 15 minutos para aprender algo nuevo cada día.' },
  ],
  closeTitle: 'Comienza hoy con FluidLearn',
  closeLead: 'No importa si comienzas desde cero o si ya tienes conocimientos previos. Con FluidLearn podrás descubrir tu nivel, aprender con Inteligencia Artificial y alcanzar tus metas.',
  closeItems: [
    'Descubre tu nivel de inglés',
    'Aprende con IA',
    'Recibe acompañamiento profesional',
    'Desarrolla fluidez paso a paso',
  ],
  closeCta: 'Comenzar gratis ahora',
}

const en: TipsCopy = {
  heroTitle: 'Tips for learning English',
  heroLead:
    'Do you want to improve your English to meet university requirements, access better job opportunities or reach personal goals? FluidLearn gives you the tools, technology and support to get there.',
  startCta: 'Start for free',
  featured: [
    { label: 'Level test', to: '/test' },
    { label: 'Free English course', to: '/register' },
    { label: 'English verb tenses', to: '/gramatica' },
  ],
  intro: [
    'Our platform combines Artificial Intelligence, connected teachers, microlearning and personalized learning to help you build real English skills in a practical, effective way.',
    'English is essential to grow personally and professionally. Here are useful resources and tips to know the language better.',
  ],
  tipsTitle: 'Tips to learn English effectively',
  tipsLead: 'FluidLearn’s resources are very useful for learning English. If you follow these tips, improving the language will be easier.',
  tips: [
    {
      title: 'Learn phrases, not isolated words',
      body: 'Learning full expressions helps you understand context and use vocabulary more naturally. Instead of memorizing only “study”, learn “I study English every day.”',
    },
    {
      title: 'Speak first, then refine grammar',
      body: 'The FluidLearn Natural Method follows how we learn our first language: we listen, then speak, then read and write. That is why we encourage practical communication from day one.',
    },
    {
      title: 'Listen',
      body: 'Listening is essential for pronunciation, vocabulary, fluency and comprehension. Listen to podcasts, videos, music and authentic conversations in English every day.',
    },
    {
      title: 'Repeat the lesson',
      body: 'A language needs repetition. Before moving on, review previous exercises, practice vocabulary, listen to audios again and repeat pronunciation drills.',
    },
    {
      title: 'Change the verb tenses of your stories',
      body: 'Verb tenses are essential to communicate correctly. Transform the same idea into present, past, future and present perfect.',
    },
    {
      title: 'Bring English into daily life and the things you enjoy',
      body: 'Make English part of your routine: series, music, articles, device language and games. The more contact you have, the faster you progress.',
    },
    {
      title: 'Take an active part',
      body: 'Do not only listen or read. Answer questions, build sentences, share opinions and practice conversations. Active participation speeds up learning.',
    },
  ],
  futureTitle: 'Learn English to transform your future',
  futureLead: 'English is one of the most important skills for academic and professional life. Learning it will help you:',
  futureItems: [
    'Meet graduation requirements.',
    'Access international programs.',
    'Improve your professional profile.',
    'Get better job opportunities.',
    'Communicate globally.',
    'Access international educational content.',
  ],
  levelTitle: 'What is my English level?',
  levelLead: [
    'Every student has different knowledge, experience and goals. The first step is to know your current level.',
    'At FluidLearn you can take a free level test. It identifies your CEFR level and Artificial Intelligence builds a personalized path from your results.',
  ],
  levelCta: 'Level test',
  tableHeaders: ['English levels', 'A', 'CEFR', 'IELTS', 'Aptis', 'Cambridge', 'TOEFL'],
  levels: [
    { code: 'A1', label: 'Beginner' },
    { code: 'A2', label: 'Elementary' },
    { code: 'B1', label: 'Intermediate' },
    { code: 'B2', label: 'Upper intermediate' },
    { code: 'C1', label: 'Advanced' },
    { code: 'C2', label: 'Proficient' },
  ],
  resourcesTitle: 'What resources can you use to learn English?',
  resourcesLead: 'Our platform brings everything you need to learn English in one place.',
  resources: [
    { title: 'Interactive grammar', body: 'Learn To Be, verb tenses, pronouns, prepositions, passive voice, regular and irregular verbs, conditionals and reported speech.' },
    { title: 'Listening', body: 'Interactive audio, real conversations, native pronunciation and comprehension exercises.' },
    { title: 'Speaking with Artificial Intelligence', body: 'Practice conversation and pronunciation. AI assesses pronunciation, detects mistakes, improves fluency and builds confidence.' },
    { title: 'Reading and writing', body: 'Level-adapted readings, academic texts, comprehension exercises and guided writing with automatic feedback.' },
    { title: 'Connected teachers', body: 'Premium students get specialist support to resolve doubts, improve speaking, receive academic guidance and speed up progress.' },
    { title: 'Academic dashboard', body: 'Track progress reports, assessment results, skills developed, AI recommendations and personalized follow-up.' },
  ],
  instTitle: 'Built for schools and universities',
  instLead: 'FluidLearn helps educational institutions to:',
  instItems: [
    'Assess students.',
    'Monitor language skills.',
    'Generate academic reports.',
    'Set up early alerts.',
    'Support bilingual processes.',
    'Facilitate graduation requirements.',
  ],
  accessTitle: 'Accessible education for everyone',
  accessLead: 'FluidLearn includes:',
  accessItems: [
    'Dark mode.',
    'Text size controls (+A / −A).',
    'Screen reader compatibility.',
    'Keyboard navigation.',
    'High visual contrast.',
    'A layout that adapts to any device.',
  ],
  interestTitle: 'Other links you may like:',
  interestLinks: [
    { label: 'Level test', to: '/test' },
    { label: 'English levels', to: '/niveles' },
    { label: 'English grammar', to: '/gramatica' },
    { label: 'Natural method', to: '/metodo-natural' },
    { label: 'How it works', to: '/como-funciona' },
    { label: 'Intensive course', to: '/curso-intensivo' },
    { label: 'English for adults', to: '/ingles-adultos' },
    { label: 'Free English course', to: '/register' },
  ],
  continueKicker: 'Want to keep going?',
  continueTitle: 'We are waiting for you at FluidLearn',
  continueText: 'We are the EdTech platform of Universidad Simón Bolívar – MacondoLab, with a guided, personalized course.',
  continueCards: [
    { title: 'Learn with a course', text: 'Vocabulary, grammar, writing, comprehension, speaking and certification by level.' },
    { title: 'Talk with teachers', text: 'Teacher support and speaking practice with AI.' },
    { title: 'Practice with microlearning', text: '10-to-15-minute lessons to learn something new every day.' },
  ],
  closeTitle: 'Start today with FluidLearn',
  closeLead: 'It does not matter if you start from scratch or already know some English. With FluidLearn you can discover your level, learn with AI and reach your goals.',
  closeItems: [
    'Discover your English level',
    'Learn with AI',
    'Get professional support',
    'Build fluency step by step',
  ],
  closeCta: 'Start free now',
}

export function getTipsCopy(lang: LandingLangCode): TipsCopy {
  return lang === 'es' ? es : en
}

import type { LandingLangCode } from './landingI18n'

export type AdultsFaq = { q: string; a: string }

export type AdultsCopy = {
  heroTitle: string
  heroLead: string
  startCta: string
  intro: [string, string, string]
  methodTitle: string
  methodLead: [string, string, string]
  midCtaTitle: string
  whyTitle: string
  whyLead: string
  whyItems: string[]
  devicesTitle: string
  devicesLead: string
  devices: string[]
  devicesNote: string
  devicesImageAlt: string
  bestTitle: string
  bestLead: string
  aiTitle: string
  aiLead: string
  aiItems: string[]
  teachersTitle: string
  teachersLead: string
  teachersItems: string[]
  microTitle: string
  microText: string
  levelsTitle: string
  levelsLead: string
  levels: { code: string; label: string; text: string }[]
  tipsTitle: string
  tips: { title: string; body: string }[]
  dashTitle: string
  dashLead: string
  dashItems: string[]
  instTitle: string
  instLead: string
  instItems: string[]
  accessTitle: string
  accessLead: string
  accessItems: string[]
  offerTitle: string
  offerLead: string
  offer: { title: string; body: string }[]
  faqTitle: string
  faq: AdultsFaq[]
  tryTitle: string
  closeTitle: string
  closeLead: string
  closeItems: string[]
  closeCta: string
}

const es: AdultsCopy = {
  heroTitle: 'Curso de inglés para adultos',
  heroLead: 'Descubre nuestro curso en 6 niveles',
  startCta: 'Empieza gratis',
  intro: [
    '¿Te gustaría aprender a tu propio ritmo, sin estrés y en el lugar que prefieras? No busques otros cursos de inglés para adultos. Elige el que te ofrece FluidLearn y disfruta de los beneficios de aprender con un método innovador y flexible que te encantará.',
    'Aprender inglés es una cuestión de actitud, no de edad. Sin embargo, puede que no te sientas tentado a hacer clases porque piensas que probablemente no tendrás el tiempo suficiente y/o los horarios que ofrecen las academias no se adaptan a tu ritmo. La buena noticia es que no tienes que recurrir necesariamente a lo que ofrecen los métodos tradicionales: tienes la oportunidad de buscar un curso online.',
    'Descubre el curso de inglés de FluidLearn para estudiantes y profesionales: ¡no te arrepentirás!',
  ],
  methodTitle: 'Inglés para adultos: ¿cuál es el mejor método?',
  methodLead: [
    'Ya sea por decisión personal o para tener mejores oportunidades, muchos adultos se interesan por aprender inglés. Pero a diferencia de lo que se piensa, iniciar el estudio de la lengua inglesa en la edad adulta tiene varias ventajas.',
    'Entre ellas, el hecho de que, por la experiencia adquirida a lo largo de los años y el sentido de la responsabilidad que tienen, los adultos generalmente se plantean objetivos claros que pueden alcanzar gracias a la buena organización de los tiempos, la disciplina y la constancia.',
    'Sin lugar a dudas, tú tienes esas cualidades. Así que el curso de inglés para adultos de FluidLearn resulta perfecto para que tengas la satisfacción de alcanzar una meta personal y/o para que aumentes la posibilidad de tener mejores oportunidades a nivel laboral y académico.',
  ],
  midCtaTitle: 'Lleva tu inglés al siguiente nivel con FluidLearn',
  whyTitle: '¿Por qué aprender inglés con FluidLearn?',
  whyLead:
    'Aprender inglés actualmente es una de las habilidades más importantes para el crecimiento académico y profesional. Dominar este idioma puede ayudarte a:',
  whyItems: [
    'Cumplir requisitos de graduación universitaria.',
    'Postularte a mejores oportunidades laborales.',
    'Acceder a intercambios y becas internacionales.',
    'Participar en programas académicos globales.',
    'Consumir contenido educativo de calidad.',
    'Comunicarte con personas de todo el mundo.',
  ],
  devicesTitle: 'Aprende inglés donde quieras y cuando quieras',
  devicesLead:
    'Sabemos que muchas personas tienen horarios ocupados debido al trabajo, los estudios o las responsabilidades personales. Por eso, FluidLearn te permite aprender desde:',
  devices: ['Computadores', 'Smartphones', 'Tablets'],
  devicesNote: 'Podrás acceder a tus lecciones en cualquier momento y continuar exactamente donde dejaste tu progreso.',
  devicesImageAlt: 'FluidLearn en computador, tablet y celular',
  bestTitle: 'El mejor método para aprender inglés',
  bestLead:
    'FluidLearn combina tecnología educativa e innovación para ofrecer una experiencia de aprendizaje moderna y personalizada. Nuestra metodología se basa en:',
  aiTitle: 'Inteligencia Artificial Educativa',
  aiLead: 'La IA analiza tu desempeño para:',
  aiItems: [
    'Calificar ejercicios automáticamente.',
    'Evaluar pronunciación y speaking.',
    'Detectar fortalezas y oportunidades de mejora.',
    'Recomendar contenidos personalizados.',
    'Adaptar tu ruta de aprendizaje.',
  ],
  teachersTitle: 'Profesores conectados',
  teachersLead: 'Recibe orientación profesional para:',
  teachersItems: [
    'Resolver dudas.',
    'Mejorar tu speaking.',
    'Fortalecer gramática y vocabulario.',
    'Prepararte para evaluaciones y certificaciones.',
  ],
  microTitle: 'Microlearning',
  microText:
    'Lecciones breves de 10 a 15 minutos que te permiten aprender incluso si tienes poco tiempo disponible.',
  levelsTitle: 'Programa completo por niveles',
  levelsLead:
    'Nuestro contenido está alineado con el Marco Común Europeo de Referencia para las Lenguas (MCER).',
  levels: [
    { code: 'A1', label: 'Principiante', text: 'Aprende vocabulario básico, saludos, presentaciones y expresiones cotidianas.' },
    { code: 'A2', label: 'Básico', text: 'Desarrolla conversaciones sencillas y mejora tu comprensión auditiva.' },
    { code: 'B1', label: 'Intermedio', text: 'Habla con mayor confianza sobre situaciones académicas y personales.' },
    { code: 'B2', label: 'Intermedio alto', text: 'Comprende textos complejos y participa en conversaciones fluidas.' },
    { code: 'C1', label: 'Avanzado', text: 'Utiliza el inglés en contextos académicos y profesionales con precisión.' },
    { code: 'C2', label: 'Dominio experto', text: 'Alcanza una comunicación cercana a la de un hablante avanzado del idioma.' },
  ],
  tipsTitle: '5 tips para aprender inglés en la adultez',
  tips: [
    {
      title: 'Incorpora el inglés a tu vida',
      body: 'Puedes empezar por configurar tus dispositivos electrónicos, tu email y tus redes sociales en inglés. Otra opción es ver películas o series, escuchar emisoras o leer diarios y revistas de países angloparlantes.',
    },
    {
      title: 'No temas cometer errores',
      body: 'De los errores se aprende, así que deja atrás el miedo a equivocarte. Empieza a pensar en inglés, anímate a hablar y a escribir con mayor frecuencia para que adquieras una mejor capacidad de expresión.',
    },
    {
      title: 'Marca un objetivo',
      body: 'Ten siempre presente la razón por la cual decidiste aprender inglés. Te ayudará a definir una meta y a mantener la motivación para alcanzarla.',
    },
    {
      title: 'Establece una rutina de estudio',
      body: 'Si quieres tener un mejor progreso es indispensable que practiques a diario. Recuerda que la práctica hace al maestro.',
    },
    {
      title: 'Elige bien',
      body: 'No todos los cursos de inglés para adultos tienen en cuenta tus intereses y necesidades. Es importante que elijas uno como FluidLearn, que además de ajustarse a tus horarios te permite aprender con Inteligencia Artificial y profesores conectados.',
    },
  ],
  dashTitle: 'Monitorea tu progreso en tiempo real',
  dashLead: 'Con nuestro Dashboard Académico podrás visualizar:',
  dashItems: [
    'Avance por niveles.',
    'Resultados de evaluaciones.',
    'Desempeño en Speaking, Listening, Reading y Writing.',
    'Recomendaciones generadas por IA.',
    'Historial de progreso académico.',
  ],
  instTitle: 'Diseñado para colegios y universidades',
  instLead: 'FluidLearn fue desarrollado para apoyar instituciones educativas en sus procesos de bilingüismo. Nuestra plataforma permite:',
  instItems: [
    'Seguimiento individual de estudiantes.',
    'Reportes institucionales.',
    'Alertas tempranas.',
    'Evaluaciones diagnósticas.',
    'Cumplimiento de requisitos de graduación.',
    'Fortalecimiento de competencias lingüísticas.',
  ],
  accessTitle: 'Plataforma inclusiva y accesible',
  accessLead: 'FluidLearn ha sido diseñado para ofrecer una experiencia accesible para todos los usuarios. Incluye:',
  accessItems: [
    'Modo oscuro.',
    'Ajuste de tamaño de letra (+A / −A).',
    'Compatibilidad con lectores de pantalla.',
    'Navegación por teclado.',
    'Alto contraste visual.',
    'Diseño adaptable a cualquier dispositivo.',
  ],
  offerTitle: 'Anímate a probar el curso de inglés para adultos de FluidLearn',
  offerLead: 'FluidLearn pone a tu disposición una gran variedad de herramientas para que tu camino de aprendizaje del inglés sea muy agradable y fructuoso:',
  offer: [
    {
      title: 'Curso completo de inglés',
      body: 'No importa que empieces desde cero o que ya tengas conocimientos previos: el curso abarca 6 niveles definidos por el MCER, desde A1 hasta C2. En cada unidad podrás ver lecciones interactivas y quizzes para verificar tu progreso. Al finalizar cada nivel recibirás un certificado de FluidLearn con el cual podrás demostrar en qué nivel te encuentras.',
    },
    {
      title: 'Metodología única e innovadora',
      body: 'El curso de inglés para adultos fue desarrollado acorde al método de FluidLearn, basado en Inteligencia Artificial, profesores conectados y microlearning. Esta metodología se alinea con pedagogías reconocidas y con los lineamientos del MCER.',
    },
    {
      title: 'App y plataforma interactiva',
      body: 'Accede desde el dispositivo de tu preferencia para estudiar en el momento que prefieras. Continúa las unidades del curso para que puedas practicar donde lo dejaste, con tu progreso sincronizado.',
    },
  ],
  faqTitle: 'FAQ acerca de los cursos de inglés para adultos',
  faq: [
    {
      q: '¿Por qué es importante aprender inglés en la edad adulta?',
      a: 'El inglés abre puertas académicas y laborales. En FluidLearn creemos que nunca es tarde: la plataforma se adapta a tu ritmo de vida para que estudiantes universitarios, profesionales y docentes desarrollen competencias lingüísticas con flexibilidad.',
    },
    {
      q: '¿Es recomendable hacer un curso intensivo?',
      a: 'Sí, si puedes mantener una práctica constante. FluidLearn también te permite avanzar con lecciones de 10 a 15 minutos si tu agenda es apretada. Lo importante es la constancia, no la cantidad de horas de un solo día.',
    },
    {
      q: '¿Los cursos de inglés online para adultos son gratuitos?',
      a: 'Puedes empezar gratis con la prueba de nivel y los primeros contenidos. El plan gratuito da acceso básico; el plan Premium suma profesores conectados, más práctica y seguimiento avanzado.',
    },
    {
      q: '¿Necesito conocimientos previos?',
      a: 'No. Puedes comenzar desde nivel A1 y avanzar progresivamente.',
    },
    {
      q: '¿La plataforma se adapta a mi nivel?',
      a: 'Sí. Nuestra Inteligencia Artificial personaliza tu ruta de aprendizaje según tus resultados y objetivos.',
    },
    {
      q: '¿Puedo estudiar desde mi celular?',
      a: 'Sí. FluidLearn está optimizado para computadores, tablets y dispositivos móviles.',
    },
    {
      q: '¿Recibiré seguimiento de mi progreso?',
      a: 'Sí. Tendrás acceso a reportes detallados y métricas de desempeño en el dashboard académico.',
    },
    {
      q: '¿Es útil para universidades y colegios?',
      a: 'Sí. Nuestra plataforma fue diseñada para apoyar procesos académicos y requisitos institucionales de inglés.',
    },
  ],
  tryTitle: 'Anímate a probar el curso de inglés para adultos de FluidLearn',
  closeTitle: '¿Estás listo para iniciar tu curso de inglés para adultos?',
  closeLead:
    'En FluidLearn creemos que aprender inglés no depende de la edad ni del tiempo disponible, sino de contar con las herramientas adecuadas y una metodología efectiva.',
  closeItems: [
    'Aprende con Inteligencia Artificial',
    'Recibe apoyo de profesores conectados',
    'Avanza por niveles internacionales',
    'Cumple tus metas académicas y profesionales',
  ],
  closeCta: 'Comenzar gratis ahora',
}

const en: AdultsCopy = {
  heroTitle: 'English course for adults',
  heroLead: 'Discover our course across 6 levels',
  startCta: 'Start for free',
  intro: [
    'Would you like to learn at your own pace, without stress and wherever you prefer? You do not need to keep looking for other adult English courses. Choose FluidLearn and enjoy an innovative, flexible method you will love.',
    'Learning English is a matter of attitude, not age. You may feel reluctant to take classes because you think you will not have enough time, or because academy schedules do not fit your life. The good news is you do not have to rely on traditional methods: you can choose an online course.',
    'Discover FluidLearn’s English course for students and professionals — you will not regret it.',
  ],
  methodTitle: 'English for adults: what is the best method?',
  methodLead: [
    'Whether it is a personal decision or a way to open better opportunities, many adults want to learn English. Starting in adulthood actually has several advantages.',
    'Experience, responsibility and clear goals help adults organize their time, stay disciplined and be consistent.',
    'You already have those qualities. FluidLearn’s adult English course is a strong fit to reach a personal goal and improve academic and career opportunities.',
  ],
  midCtaTitle: 'Take your English to the next level with FluidLearn',
  whyTitle: 'Why learn English with FluidLearn?',
  whyLead:
    'English is one of the most important skills for academic and professional growth. Mastering it can help you:',
  whyItems: [
    'Meet university graduation requirements.',
    'Apply for better job opportunities.',
    'Access international exchanges and scholarships.',
    'Join global academic programs.',
    'Consume high-quality educational content.',
    'Communicate with people around the world.',
  ],
  devicesTitle: 'Learn English wherever and whenever you want',
  devicesLead:
    'Many people have packed schedules because of work, study or personal responsibilities. FluidLearn lets you learn from:',
  devices: ['Computers', 'Smartphones', 'Tablets'],
  devicesNote: 'You can open your lessons at any time and continue exactly where you left off.',
  devicesImageAlt: 'FluidLearn on computer, tablet and phone',
  bestTitle: 'The best method to learn English',
  bestLead:
    'FluidLearn combines educational technology and innovation for a modern, personalized learning experience. Our methodology is based on:',
  aiTitle: 'Educational Artificial Intelligence',
  aiLead: 'AI analyzes your performance to:',
  aiItems: [
    'Grade exercises automatically.',
    'Assess pronunciation and speaking.',
    'Detect strengths and areas to improve.',
    'Recommend personalized content.',
    'Adapt your learning path.',
  ],
  teachersTitle: 'Connected teachers',
  teachersLead: 'Get professional guidance to:',
  teachersItems: [
    'Resolve questions.',
    'Improve your speaking.',
    'Strengthen grammar and vocabulary.',
    'Prepare for assessments and certifications.',
  ],
  microTitle: 'Microlearning',
  microText: 'Short 10-to-15-minute lessons so you can learn even when you have little time.',
  levelsTitle: 'A complete program by level',
  levelsLead: 'Our content is aligned with the Common European Framework of Reference for Languages (CEFR).',
  levels: [
    { code: 'A1', label: 'Beginner', text: 'Learn basic vocabulary, greetings, introductions and everyday expressions.' },
    { code: 'A2', label: 'Elementary', text: 'Build simple conversations and improve listening comprehension.' },
    { code: 'B1', label: 'Intermediate', text: 'Speak with more confidence about academic and personal situations.' },
    { code: 'B2', label: 'Upper intermediate', text: 'Understand complex texts and join fluent conversations.' },
    { code: 'C1', label: 'Advanced', text: 'Use English in academic and professional contexts with precision.' },
    { code: 'C2', label: 'Proficient', text: 'Reach communication close to that of an advanced speaker.' },
  ],
  tipsTitle: '5 tips for learning English as an adult',
  tips: [
    {
      title: 'Bring English into your life',
      body: 'Set your devices, email and social networks to English. Watch films or series, listen to radio or read newspapers and magazines from English-speaking countries.',
    },
    {
      title: 'Do not be afraid of mistakes',
      body: 'You learn from mistakes, so leave the fear behind. Start thinking in English and speak and write more often to express yourself better.',
    },
    {
      title: 'Set a goal',
      body: 'Keep in mind why you decided to learn English. It will help you define a target and stay motivated.',
    },
    {
      title: 'Build a study routine',
      body: 'Daily practice is essential if you want better progress. Practice makes progress.',
    },
    {
      title: 'Choose well',
      body: 'Not every adult English course considers your interests and needs. Choose one like FluidLearn, which fits your schedule and lets you learn with Artificial Intelligence and connected teachers.',
    },
  ],
  dashTitle: 'Track your progress in real time',
  dashLead: 'With our academic dashboard you can see:',
  dashItems: [
    'Progress by level.',
    'Assessment results.',
    'Performance in Speaking, Listening, Reading and Writing.',
    'AI-generated recommendations.',
    'Academic progress history.',
  ],
  instTitle: 'Built for schools and universities',
  instLead: 'FluidLearn was developed to support educational institutions in their bilingual processes. The platform allows:',
  instItems: [
    'Individual student follow-up.',
    'Institutional reports.',
    'Early alerts.',
    'Diagnostic assessments.',
    'Graduation requirement tracking.',
    'Stronger language skills.',
  ],
  accessTitle: 'Inclusive and accessible',
  accessLead: 'FluidLearn is designed to offer an accessible experience for every user. It includes:',
  accessItems: [
    'Dark mode.',
    'Text size controls (+A / −A).',
    'Screen reader compatibility.',
    'Keyboard navigation.',
    'High visual contrast.',
    'A layout that adapts to any device.',
  ],
  offerTitle: 'Try FluidLearn’s English course for adults',
  offerLead: 'FluidLearn gives you a wide set of tools so your English journey is enjoyable and productive:',
  offer: [
    {
      title: 'A complete English course',
      body: 'Whether you start from scratch or already know some English, the course covers 6 CEFR levels from A1 to C2. Each unit includes interactive lessons and quizzes. When you finish a level you receive a FluidLearn certificate that shows where you stand.',
    },
    {
      title: 'A unique, innovative methodology',
      body: 'The adult English course follows FluidLearn’s method: Artificial Intelligence, connected teachers and microlearning, aligned with recognized pedagogy and CEFR guidelines.',
    },
    {
      title: 'Interactive app and platform',
      body: 'Study on the device you prefer, whenever you prefer. Continue units where you left off, with your progress synced.',
    },
  ],
  faqTitle: 'FAQ about English courses for adults',
  faq: [
    {
      q: 'Why is it important to learn English as an adult?',
      a: 'English opens academic and career doors. At FluidLearn it is never too late: the platform fits your life so university students, professionals and teachers can build language skills with flexibility.',
    },
    {
      q: 'Is an intensive course a good idea?',
      a: 'Yes, if you can keep consistent practice. FluidLearn also lets you move forward with 10-to-15-minute lessons if your schedule is tight. Consistency matters more than cramming hours into a single day.',
    },
    {
      q: 'Are online English courses for adults free?',
      a: 'You can start free with the placement test and first contents. The free plan gives basic access; Premium adds connected teachers, extra practice and advanced follow-up.',
    },
    {
      q: 'Do I need previous knowledge?',
      a: 'No. You can start at A1 and move forward step by step.',
    },
    {
      q: 'Does the platform adapt to my level?',
      a: 'Yes. Our Artificial Intelligence personalizes your learning path based on your results and goals.',
    },
    {
      q: 'Can I study from my phone?',
      a: 'Yes. FluidLearn is optimized for computers, tablets and mobile devices.',
    },
    {
      q: 'Will I get progress follow-up?',
      a: 'Yes. You will have detailed reports and performance metrics in the academic dashboard.',
    },
    {
      q: 'Is it useful for universities and schools?',
      a: 'Yes. The platform was designed to support academic processes and institutional English requirements.',
    },
  ],
  tryTitle: 'Try FluidLearn’s English course for adults',
  closeTitle: 'Are you ready to start your English course for adults?',
  closeLead:
    'At FluidLearn we believe learning English does not depend on age or spare time, but on the right tools and an effective method.',
  closeItems: [
    'Learn with Artificial Intelligence',
    'Get support from connected teachers',
    'Move through international levels',
    'Reach your academic and professional goals',
  ],
  closeCta: 'Start free now',
}

export function getAdultsCopy(lang: LandingLangCode): AdultsCopy {
  return lang === 'es' ? es : en
}

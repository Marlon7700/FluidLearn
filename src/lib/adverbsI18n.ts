import type { LandingLangCode } from './landingI18n'

export type AdverbGroup = {
  id: string
  title: string
  lead: string
  rows: { en: string; es: string }[]
  examples: { en: string; es: string }[]
}

export type AdverbsCopy = {
  kicker: string
  heroTitle: string
  heroLead: string
  startCta: string
  intro: string
  nav: { id: string; label: string }[]
  typesNav: { id: string; label: string }[]
  whatTitle: string
  whatLead: string
  whatExamples: { en: string; es: string }[]
  groups: AdverbGroup[]
  formTitle: string
  forms: { title: string; body: string; items: string[] }[]
  placeTitle: string
  placeLead: string
  places: { title: string; example: string; es: string }[]
  fillTitle: string
  fillLead: string
  fillText: string
  fillAnswers: string[]
  fillShow: string
  fillHide: string
  quizKicker: string
  quizTitle: string
  quizLead: string
  quizCheck: string
  quizPending: string
  quizScore: string
  quizShow: string
  quizHide: string
  quizStart: string
  quizRetry: string
  quizTime: string
  quizExpired: string
  quizLetters: string[]
  quiz: { q: string; options: string[]; answer: number; why: string }[]
  ctaKicker: string
  ctaTitle: string
  ctaHighlight: string
  ctaLead: string
  ctaButton: string
  levels: string[]
  moreTitle: string
  more: { tag: string; title: string; to: string }[]
  closeLead: string
  testCta: string
}

const es: AdverbsCopy = {
  kicker: 'Guía práctica de gramática inglesa',
  heroTitle: 'Adverbios en inglés: tipos, formación, posición y ejercicios',
  heroLead:
    'Descubre qué son los adverbios, cómo se forman y cómo se usan para dar sentido a una oración. Practica con un test cronometrado de 15 preguntas en FluidLearn.',
  startCta: 'Empieza gratis',
  intro:
    'En esta guía explicamos qué son los adverbios y cómo utilizarlos. Verás cada tipo, una lista de los más comunes, las cinco formas de construirlos y un test de 15 preguntas.',
  nav: [
    { id: 'que-son', label: 'Qué son' },
    { id: 'tipos', label: 'Tipos' },
    { id: 'formacion', label: 'Formación' },
    { id: 'posicion', label: 'Posición' },
    { id: 'ejercicios', label: 'Test' },
    { id: 'recursos', label: 'Recursos' },
  ],
  typesNav: [
    { id: 'frecuencia', label: 'Frecuencia' },
    { id: 'modo', label: 'Modo' },
    { id: 'tiempo', label: 'Tiempo' },
    { id: 'lugar', label: 'Lugar' },
    { id: 'grado', label: 'Grado' },
    { id: 'duracion', label: 'Duración' },
    { id: 'orden', label: 'Orden' },
    { id: 'certeza', label: 'Certeza' },
  ],
  whatTitle: 'Qué son los adverbs y qué tipos hay',
  whatLead:
    'Los adverbios modifican el verbo, un adjetivo u otro adverbio. Indican de qué manera se lleva a cabo una acción o sucede un evento.',
  whatExamples: [
    { en: 'The teacher explained the lesson clearly.', es: 'El profesor explicó la lección claramente.' },
    { en: 'Darla slowly finished her meal.', es: 'Darla terminó su comida lentamente.' },
  ],
  groups: [
    {
      id: 'frecuencia',
      title: 'Adverbios de frecuencia',
      lead: 'Expresan la periodicidad con la que se efectúa una acción.',
      rows: [
        { en: 'Always', es: 'Siempre' },
        { en: 'Usually', es: 'Usualmente' },
        { en: 'Frequently', es: 'Frecuentemente' },
        { en: 'Often', es: 'A menudo' },
        { en: 'Seldom', es: 'Casi nunca' },
        { en: 'Rarely', es: 'Raramente' },
        { en: 'Occasionally', es: 'Ocasionalmente' },
        { en: 'Normally', es: 'Normalmente' },
        { en: 'Once', es: 'Una vez' },
        { en: 'Never', es: 'Nunca' },
      ],
      examples: [
        { en: 'Usually, I don’t get up past eleven o’clock in the morning.', es: 'Usualmente no me levanto después de las once de la mañana.' },
        { en: 'Dianne always celebrates her birthday with her parents.', es: 'Dianne siempre celebra su cumpleaños con sus padres.' },
      ],
    },
    {
      id: 'modo',
      title: 'Adverbios de modo',
      lead: 'Indican la manera en que se realiza la acción. Muchos se forman a partir de un adjetivo.',
      rows: [
        { en: 'Slowly', es: 'Lentamente' },
        { en: 'Simply', es: 'Simplemente' },
        { en: 'Carefully', es: 'Cuidadosamente' },
        { en: 'Happily', es: 'Felizmente' },
        { en: 'Carelessly', es: 'Descuidadamente' },
        { en: 'Admirably', es: 'Admirablemente' },
        { en: 'Naturally', es: 'Naturalmente' },
        { en: 'Quickly', es: 'Rápidamente' },
        { en: 'Fast', es: 'Rápido' },
        { en: 'Hard', es: 'Duro' },
      ],
      examples: [
        { en: 'He walks slowly.', es: 'Él camina lentamente.' },
        { en: 'The doctor coldly delivered the diagnosis.', es: 'El doctor dio el diagnóstico con frialdad.' },
      ],
    },
    {
      id: 'tiempo',
      title: 'Adverbios de tiempo',
      lead: 'Expresan el momento relativo en que se realiza la acción.',
      rows: [
        { en: 'Early', es: 'Temprano' },
        { en: 'Already', es: 'Ya' },
        { en: 'Before', es: 'Antes' },
        { en: 'After', es: 'Después' },
        { en: 'Now', es: 'Ahora' },
        { en: 'Soon', es: 'Pronto' },
        { en: 'Then', es: 'Entonces' },
        { en: 'Still', es: 'Aún' },
        { en: 'Again', es: 'Nuevamente' },
        { en: 'Late', es: 'Tarde' },
      ],
      examples: [
        { en: 'I arrived late for the appointment.', es: 'Llegué tarde a la cita.' },
        { en: 'I work out before breakfast.', es: 'Entreno antes del desayuno.' },
      ],
    },
    {
      id: 'lugar',
      title: 'Adverbios de lugar',
      lead: 'Expresan la posición, relativa o figurada, o el lugar donde ocurre la acción.',
      rows: [
        { en: 'Above', es: 'Encima' },
        { en: 'Beyond', es: 'Más allá' },
        { en: 'Behind', es: 'Detrás' },
        { en: 'Over', es: 'Encima' },
        { en: 'Under', es: 'Debajo' },
        { en: 'Near', es: 'Cerca' },
        { en: 'Far', es: 'Lejos' },
        { en: 'In', es: 'Adentro' },
        { en: 'Out', es: 'Afuera' },
        { en: 'Here', es: 'Aquí' },
      ],
      examples: [
        { en: 'The cookies are over the counter.', es: 'Las galletas están sobre el mostrador.' },
        { en: 'Simon spoke above me.', es: 'Simon habló por encima de mí.' },
      ],
    },
    {
      id: 'grado',
      title: 'Adverbios de grado',
      lead: 'Expresan la intensidad de una situación o el grado en que se desarrolla un evento.',
      rows: [
        { en: 'Extremely', es: 'Extremadamente' },
        { en: 'Completely', es: 'Completamente' },
        { en: 'Fairly', es: 'Bastante' },
        { en: 'Mostly', es: 'Mayormente' },
        { en: 'Mainly', es: 'Principalmente' },
        { en: 'Too', es: 'Demasiado' },
        { en: 'So', es: 'Tan, muy' },
        { en: 'Very', es: 'Muy' },
        { en: 'Enough', es: 'Suficiente' },
        { en: 'Only', es: 'Solamente' },
      ],
      examples: [
        { en: 'I find that actor very attractive.', es: 'Encuentro a ese actor muy atractivo.' },
        { en: 'Sarah’s mother was extremely proud of her when she graduated.', es: 'La madre de Sarah estaba extremadamente orgullosa cuando se graduó.' },
      ],
    },
    {
      id: 'duracion',
      title: 'Adverbios de duración',
      lead: 'Indican la duración de un evento o el transcurrir del tiempo relativo a un suceso.',
      rows: [
        { en: 'Since', es: 'Desde' },
        { en: 'Until', es: 'Hasta' },
        { en: 'Forever', es: 'Por siempre' },
        { en: 'Permanently', es: 'Permanentemente' },
        { en: 'Temporarily', es: 'Temporalmente' },
        { en: 'Yearly', es: 'Anualmente' },
        { en: 'Daily', es: 'Diariamente' },
        { en: 'Hereafter', es: 'De ahora en adelante' },
        { en: 'Eternally', es: 'Eternamente' },
        { en: 'All day / all week', es: 'Todo el día / toda la semana' },
      ],
      examples: [
        { en: 'I haven’t talked to Mary since this morning.', es: 'No he hablado con Mary desde esta mañana.' },
        { en: 'The university decided to suspend him temporarily.', es: 'La universidad decidió suspenderlo temporalmente.' },
      ],
    },
    {
      id: 'orden',
      title: 'Adverbios de orden',
      lead: 'Sirven para listar sucesos e indicar el orden en que se realizan las acciones.',
      rows: [
        { en: 'First', es: 'Primero' },
        { en: 'Firstly', es: 'Primeramente' },
        { en: 'Initially', es: 'Inicialmente' },
        { en: 'Secondly', es: 'En segundo lugar' },
        { en: 'Thirdly', es: 'En tercer lugar' },
        { en: 'Eventually', es: 'Eventualmente' },
        { en: 'Finally', es: 'Finalmente' },
        { en: 'In the end', es: 'Al final' },
        { en: 'Lastly', es: 'Por último' },
        { en: 'Last', es: 'Por último' },
      ],
      examples: [
        { en: 'At first she didn’t like him, but eventually she warmed up to him.', es: 'Al principio no le caía bien, pero con el tiempo le fue cogiendo aprecio.' },
        { en: 'First I have to go grocery shopping, and then I decorate the house.', es: 'Primero voy a comprar y luego decoro la casa.' },
      ],
    },
    {
      id: 'certeza',
      title: 'Adverbios de certeza',
      lead: 'Indican la probabilidad de que ocurra una acción.',
      rows: [
        { en: 'Certainly', es: 'Ciertamente' },
        { en: 'Possibly', es: 'Posiblemente' },
        { en: 'Really', es: 'Realmente' },
        { en: 'Definitely', es: 'Definitivamente' },
        { en: 'Indeed', es: 'De hecho' },
        { en: 'Probably', es: 'Probablemente' },
        { en: 'Maybe', es: 'Tal vez' },
        { en: 'Surely', es: 'Seguramente' },
        { en: 'Likely', es: 'Probablemente' },
        { en: 'Of course', es: 'Por supuesto' },
      ],
      examples: [
        { en: 'Bring your umbrella; it’s probably going to rain.', es: 'Lleva el paraguas: es probable que llueva.' },
        { en: 'Maybe you’ll run into him at school tomorrow.', es: 'Tal vez te lo encuentres en la escuela mañana.' },
      ],
    },
  ],
  formTitle: 'Cómo se forman los adverbios en inglés',
  forms: [
    {
      title: 'La palabra no termina en y',
      body: 'Si el adjetivo termina en consonante distinta de y, se añade -ly (en español suele equivaler a -mente).',
      items: ['Certain → certainly', 'Final → finally', 'Permanent → permanently'],
    },
    {
      title: 'La palabra termina en y',
      body: 'Se reemplaza la y por -ily.',
      items: ['Happy → happily', 'Angry → angrily', 'Easy → easily'],
    },
    {
      title: 'La palabra termina en ic',
      body: 'Se añade -ally (con doble l).',
      items: ['Specific → specifically', 'Dramatic → dramatically', 'Terrific → terrifically'],
    },
    {
      title: 'La palabra termina en le',
      body: 'La e final se sustituye por y.',
      items: ['Comfortable → comfortably', 'Subtle → subtly', 'Incredible → incredibly'],
    },
    {
      title: 'Adverbios irregulares',
      body: 'No siguen una regla fija. A veces coinciden con el adjetivo; a veces cambian de raíz.',
      items: ['Early → early', 'Fast → fast', 'Good → well'],
    },
  ],
  placeTitle: 'Dónde se colocan los adverbios en inglés',
  placeLead: 'Según la función, el adverbio puede ir al principio, después del verbo principal o al final, tras el complemento.',
  places: [
    { title: 'Al principio', example: 'Usually, we have lunch at the cafeteria.', es: 'Usualmente almorzamos en la cafetería.' },
    { title: 'Después del verbo', example: 'She danced happily in the rain.', es: 'Ella bailó felizmente bajo la lluvia.' },
    { title: 'Después del complemento', example: 'I will get back to you later.', es: 'Te responderé más tarde.' },
  ],
  fillTitle: 'Práctica guiada',
  fillLead: 'Completa el párrafo con el adverbio adecuado. Luego compara con las respuestas.',
  fillText:
    'Lucien lives a ________ (very) busy life. ________ (usually), he wakes up at six a.m. and ________ (quickly) makes breakfast. He is in classes ________ (until) 3 pm, and ________ (then) he has swimming practice. On the weekends he also walks the neighbour’s dogs.',
  fillAnswers: ['very', 'Usually', 'quickly', 'until', 'then'],
  fillShow: 'Ver respuestas',
  fillHide: 'Ocultar respuestas',
  quizKicker: 'Test cronometrado',
  quizTitle: 'Test de adverbios en inglés: 15 preguntas',
  quizLead: 'Elige A, B o C. Tienes 10 minutos. Al terminar verás la puntuación y podrás revisar las explicaciones.',
  quizCheck: 'Corregir test',
  quizPending: 'Resultado: pendiente',
  quizScore: 'Resultado: {score} / {total}',
  quizShow: 'Ver respuestas',
  quizHide: 'Ocultar respuestas',
  quizStart: 'Empezar el test',
  quizRetry: 'Repetir test',
  quizTime: 'Tiempo',
  quizExpired: 'Tiempo agotado',
  quizLetters: ['A', 'B', 'C'],
  quiz: [
    { q: 'Clearly en “explained the lesson clearly” es un adverbio de…', options: ['lugar', 'modo', 'frecuencia'], answer: 1, why: 'Describe cómo se realiza la acción.' },
    { q: 'Always expresa…', options: ['frecuencia', 'grado', 'duración'], answer: 0, why: 'Always indica periodicidad: siempre.' },
    { q: 'Happy → adverbio:', options: ['happily', 'happyly', 'happly'], answer: 0, why: 'Si termina en y, se cambia a -ily.' },
    { q: 'Specific → adverbio:', options: ['specificly', 'specifically', 'specifily'], answer: 1, why: 'Terminación -ic → -ally.' },
    { q: 'Good como adverbio es…', options: ['goodly', 'well', 'good'], answer: 1, why: 'Irregular: good → well.' },
    { q: 'Elige la posición natural de happily.', options: ['Happily she the danced rain.', 'She danced happily in the rain.', 'She happily the rain danced.'], answer: 1, why: 'El de modo suele ir después del verbo.' },
    { q: 'Usually puede ir…', options: ['solo al final', 'al principio de la oración', 'dentro del adjetivo'], answer: 1, why: 'Los de frecuencia a menudo abren la frase.' },
    { q: 'Slow →', options: ['slowy', 'slowly', 'slowily'], answer: 1, why: 'Consonante distinta de y: se añade -ly.' },
    { q: 'Never es adverbio de…', options: ['certeza', 'frecuencia', 'lugar'], answer: 1, why: 'Never = nunca, periodicidad cero.' },
    { q: 'Very es adverbio de…', options: ['grado', 'modo', 'orden'], answer: 0, why: 'Very intensifica: adverbio de grado.' },
    { q: 'Here indica…', options: ['tiempo', 'lugar', 'modo'], answer: 1, why: 'Here = aquí, lugar.' },
    { q: 'Already es adverbio de…', options: ['tiempo', 'duración', 'certeza'], answer: 0, why: 'Already = ya, momento relativo.' },
    { q: 'Until expresa…', options: ['modo', 'duración', 'lugar'], answer: 1, why: 'Until marca hasta cuándo dura algo.' },
    { q: 'Probably indica…', options: ['certeza / probabilidad', 'frecuencia', 'material'], answer: 0, why: 'Probably = probablemente.' },
    { q: 'Comfortable →', options: ['comfortablely', 'comfortably', 'comfortibly'], answer: 1, why: 'Termina en -le: la e se cambia por y.' },
  ],
  ctaKicker: 'Nivel',
  ctaTitle: '¿Conoces tu nivel de inglés?',
  ctaHighlight: 'Haz un test ahora.',
  ctaLead: 'Regístrate en FluidLearn y accede gratis al test de nivel. En pocos minutos conocerás tu nivel y podrás seguir avanzando con el curso.',
  ctaButton: 'Empieza el test',
  levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
  moreTitle: 'Más recursos de gramática en FluidLearn',
  more: [
    { tag: 'Base', title: 'Gramática inglesa', to: '/gramatica' },
    { tag: 'Adjetivos', title: 'Adjetivos en inglés', to: '/adjetivos' },
    { tag: 'Pronombres', title: 'Pronombres en inglés', to: '/pronombres' },
    { tag: 'Verbos', title: 'Verbos modales', to: '/verbos-modales' },
    { tag: 'Nivel', title: 'Test de nivel', to: '/test' },
    { tag: 'Curso', title: 'Curso intensivo', to: '/curso-intensivo' },
    { tag: 'Consejos', title: 'Consejos para aprender', to: '/consejos' },
  ],
  closeLead: 'Usa el adverbio para precisar cómo, cuándo y con qué intensidad ocurre la acción.',
  testCta: 'Haz el test de nivel',
}

const en: AdverbsCopy = {
  ...es,
  kicker: 'Practical English grammar guide',
  heroTitle: 'English adverbs: types, formation, position and exercises',
  heroLead: 'Learn what adverbs are, how they are formed and how they give meaning to a sentence. Practise with a 15-question timed test on FluidLearn.',
  startCta: 'Start for free',
  intro: 'This guide explains English adverbs, their types, the five ways to form them and a 15-question test.',
  nav: [
    { id: 'que-son', label: 'What they are' },
    { id: 'tipos', label: 'Types' },
    { id: 'formacion', label: 'Formation' },
    { id: 'posicion', label: 'Position' },
    { id: 'ejercicios', label: 'Test' },
    { id: 'recursos', label: 'Resources' },
  ],
  whatTitle: 'What are adverbs and which types exist?',
  whatLead: 'Adverbs modify a verb, an adjective or another adverb. They show how an action is carried out or how an event happens.',
  formTitle: 'How English adverbs are formed',
  placeTitle: 'Where English adverbs go',
  placeLead: 'Depending on the function, an adverb can open the sentence, follow the main verb or come after the complement.',
  fillTitle: 'Guided practice',
  quizTitle: 'English adverbs test: 15 questions',
  quizLead: 'Choose A, B or C. You have 10 minutes. Then you will see your score and the explanations.',
  quizStart: 'Start the test',
  quizRetry: 'Try again',
  quizTime: 'Time',
  quizExpired: 'Time is up',
  quizCheck: 'Check test',
  ctaTitle: 'Do you know your English level?',
  ctaHighlight: 'Take a test now.',
  ctaLead: 'Sign up to FluidLearn and take the free level test. In a few minutes you will know your level and can keep progressing.',
  ctaButton: 'Start the test',
  moreTitle: 'More grammar resources on FluidLearn',
  closeLead: 'Use the adverb to say how, when and how strongly the action happens.',
  testCta: 'Take the level test',
}

export function getAdverbsCopy(lang: LandingLangCode): AdverbsCopy {
  return lang === 'es' ? es : en
}

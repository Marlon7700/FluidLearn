import type { CourseActivityDoc, CourseUnitDoc, QuizQuestion, SkillKey } from '../types'
import { generateAbcFromMaterial } from './generateAbcQuestions'

type Stage = {
  id: string
  title: string
  skillKey: SkillKey
  topics: string
  vocab: string
  phrases: string[]
  mission: string
  exercises: string
  games: string
  words: string[]
  clues: { word: string; clue: string }[]
  hangman: { word: string; clue: string }
}

const STAGES: Stage[] = [
  {
    id: 'a1',
    title: 'A1 · Primer contacto',
    skillKey: 'listening',
    topics: 'Alfabeto y deletreo; sonidos básicos; saludos; números, edades, colores y días; pronombres I, you, he, she, it, we, they; verbo to be; artículos a/an/the; this/that/these/those; posesivos my, your, his, her.',
    vocab: 'Familia, escuela, objetos, colores, países y profesiones.',
    phrases: ['I am a student. — Soy estudiante.', 'She is not tired. — Ella no está cansada.', 'Are you ready? — ¿Estás listo?', 'This is my book. — Este es mi libro.', 'What is your name? — ¿Cómo te llamas?'],
    mission: 'Presentarse y deletrear su nombre.',
    exercises: 'Completa: I ___ happy. (am); She ___ my sister. (is); ___ apple. (an).',
    games: 'Ahorcado de colores; sopa de letras de familia; crucigrama de pronombres.',
    words: ['CAT', 'DOG', 'RED', 'BLUE', 'BOOK', 'FAMILY', 'SCHOOL', 'HELLO'],
    clues: [
      { word: 'CAT', clue: 'A pet that says meow' },
      { word: 'APPLE', clue: 'A fruit' },
      { word: 'RED', clue: 'A color' },
      { word: 'BOOK', clue: 'You read it' },
    ],
    hangman: { word: 'HELLO', clue: 'You say this when you meet someone' },
  },
  {
    id: 'a2',
    title: 'A2 · Rutinas y presente simple',
    skillKey: 'speaking',
    topics: 'Present simple; tercera persona -s/-es; do/does; adverbios de frecuencia; have/has; can/can’t; imperativos; horas y fechas.',
    vocab: 'Rutinas, deportes, pasatiempos, alimentos y transporte.',
    phrases: ['I study every day. — Estudio cada día.', 'He studies English. — Él estudia inglés.', 'Do you play soccer? — ¿Juegas fútbol?', 'I usually wake up at seven. — Normalmente me despierto a las siete.'],
    mission: 'Entrevistar a un compañero sobre su rutina.',
    exercises: 'He ___ (go) to school. (goes); ___ she work? (Does); I ___ not smoke. (do).',
    games: 'Crucigrama de rutinas; ahorcado de verbos; sopa de deportes.',
    words: ['STUDY', 'PLAY', 'WORK', 'SLEEP', 'ALWAYS', 'NEVER', 'SOCCER', 'BREAKFAST'],
    clues: [
      { word: 'STUDY', clue: 'What students do with books' },
      { word: 'ALWAYS', clue: '100% frequency adverb' },
      { word: 'SOCCER', clue: 'A popular team sport' },
    ],
    hangman: { word: 'READ', clue: 'You do this with a book' },
  },
  {
    id: 'a3',
    title: 'A3 · Descripción y entorno',
    skillKey: 'reading',
    topics: 'Adjetivos; there is/there are; preposiciones in/on/at; some/any; present continuous; like + -ing.',
    vocab: 'Casa, ciudad, clima, ropa, comida y compras.',
    phrases: ['There are two chairs. — Hay dos sillas.', 'She speaks slowly. — Ella habla despacio.', 'I am reading now. — Estoy leyendo ahora.', 'He likes swimming. — A él le gusta nadar.'],
    mission: 'Describir una habitación y pedir alimentos.',
    exercises: 'She is ___ (cook). (cooking); How ___ apples? (many); The keys are ___ the table. (on).',
    games: 'Sopa de adjetivos; crucigrama de casa; ahorcado de clima.',
    words: ['CHAIR', 'TABLE', 'SUNNY', 'JACKET', 'MILK', 'CITY', 'SLOWLY', 'COOKING'],
    clues: [
      { word: 'CHAIR', clue: 'You sit on it' },
      { word: 'SUNNY', clue: 'Bright weather' },
      { word: 'COOKING', clue: 'Present continuous of cook' },
    ],
    hangman: { word: 'WEATHER', clue: 'Sunny, rainy or cloudy' },
  },
  {
    id: 'a4',
    title: 'A4 · Pasado y planes',
    skillKey: 'writing',
    topics: 'Past simple was/were; regulares e irregulares; did/didn’t; going to; will; comparativos; should, must, have to.',
    vocab: 'Viajes, salud, vacaciones, compras y experiencias.',
    phrases: ['I visited my aunt. — Visité a mi tía.', 'Did you go home? — ¿Fuiste a casa?', 'We are going to travel. — Vamos a viajar.', 'You should rest. — Deberías descansar.'],
    mission: 'Narrar el fin de semana y planear un viaje.',
    exercises: 'Yesterday I ___ (see) a movie. (saw); Did he ___? (go); big → ___ (bigger).',
    games: 'Crucigrama de viajes; ahorcado de irregulares; sopa de vacaciones.',
    words: ['VISITED', 'TRAVELED', 'CHEAPER', 'SHOULD', 'YESTERDAY', 'AIRPORT', 'HOTEL'],
    clues: [
      { word: 'SAW', clue: 'Past of see' },
      { word: 'HOTEL', clue: 'You stay here on a trip' },
      { word: 'SHOULD', clue: 'Advice modal' },
    ],
    hangman: { word: 'YESTERDAY', clue: 'The day before today' },
  },
  {
    id: 'b1',
    title: 'B1 · Experiencias y narración',
    skillKey: 'listening',
    topics: 'Past continuous; present perfect; ever/never/already/yet; since/for; used to; too/enough.',
    vocab: 'Experiencias, biografías, tecnología y viajes.',
    phrases: ['I was sleeping when you called. — Dormía cuando llamaste.', 'Have you ever flown? — ¿Alguna vez has volado?', 'I have lived here for years. — He vivido aquí durante años.', 'I used to play tennis. — Antes jugaba tenis.'],
    mission: 'Contar una experiencia y hacer preguntas de seguimiento.',
    exercises: 'I have ___ (finish). (finished); I have lived here ___ 2020. (since).',
    games: 'Ahorcado de participios; sopa de experiencias; crucigrama de tiempos.',
    words: ['SLEEPING', 'FLOWN', 'LIVED', 'ALREADY', 'NEVER', 'TENNIS', 'SINCE'],
    clues: [
      { word: 'FLOWN', clue: 'Past participle of fly' },
      { word: 'SINCE', clue: 'Used with a starting point in time' },
      { word: 'NEVER', clue: 'Not at any time' },
    ],
    hangman: { word: 'FINISHED', clue: 'Past participle of finish' },
  },
  {
    id: 'b2',
    title: 'B2 · Comunicación funcional',
    skillKey: 'speaking',
    topics: 'Zero, first and second conditional; modales may/might/could; gerundios; phrasal verbs; relative clauses; question tags.',
    vocab: 'Trabajo, servicios, educación, medio ambiente y tecnología.',
    phrases: ['If it rains, we will stay home. — Si llueve, nos quedaremos en casa.', 'If I had time, I would travel. — Si tuviera tiempo, viajaría.', 'Could you help me? — ¿Podrías ayudarme?', 'I enjoy reading. — Disfruto leer.'],
    mission: 'Resolver un problema en un hotel o restaurante.',
    exercises: 'If I ___ rich, I would travel. (were); I want ___ learn. (to); She enjoys ___. (reading).',
    games: 'Crucigrama de modales; sopa de phrasal verbs; ahorcado de conditionals.',
    words: ['WOULD', 'COULD', 'ENJOY', 'WHICH', 'MIGHT', 'TRAVEL', 'HELP'],
    clues: [
      { word: 'WOULD', clue: 'Used in the second conditional' },
      { word: 'COULD', clue: 'Polite request modal' },
      { word: 'WHICH', clue: 'Relative pronoun for things' },
    ],
    hangman: { word: 'COULD', clue: 'Polite way to ask for help' },
  },
  {
    id: 'b3',
    title: 'B3 · Gramática compleja',
    skillKey: 'reading',
    topics: 'Past perfect; present perfect continuous; voz pasiva; reported speech; third conditional.',
    vocab: 'Noticias, ciencia, sucesos y proyectos.',
    phrases: ['She had left before I arrived. — Ella se había ido antes de que llegara.', 'The letter was sent yesterday. — La carta fue enviada ayer.', 'He said he was tired. — Dijo que estaba cansado.', 'If I had known, I would have helped. — Si lo hubiera sabido, habría ayudado.'],
    mission: 'Transformar noticias y reconstruir eventos.',
    exercises: 'The report was ___ (write). (written); She had ___ (leave). (left); He said he ___ tired. (was).',
    games: 'Sopa de participios; crucigrama de pasiva; ahorcado de reported speech.',
    words: ['WRITTEN', 'LEFT', 'SENT', 'ARRIVED', 'HELPED', 'SAID', 'KNOWN'],
    clues: [
      { word: 'WRITTEN', clue: 'Passive of write' },
      { word: 'SAID', clue: 'Past of say' },
      { word: 'KNOWN', clue: 'Past participle of know' },
    ],
    hangman: { word: 'WRITTEN', clue: 'The report was ______ yesterday' },
  },
  {
    id: 'b4',
    title: 'B4 · Fluidez intermedia superior',
    skillKey: 'writing',
    topics: 'Mixed conditionals; modales de deducción; wish/if only; causativos; although/despite; collocations.',
    vocab: 'Opiniones, conflictos, cultura, medios y negocios.',
    phrases: ['She must be busy. — Debe estar ocupada.', 'He might have forgotten. — Puede que se haya olvidado.', 'I wish I spoke English better. — Ojalá hablara mejor inglés.', 'Despite the rain, we left. — A pesar de la lluvia, salimos.'],
    mission: 'Debatir ventajas y desventajas con argumentos.',
    exercises: 'I wish I ___ (know). (knew); He must have ___ (forget). (forgotten).',
    games: 'Crucigrama de colocaciones; ahorcado de wish; sopa de conectores.',
    words: ['DESPITE', 'FORGOTTEN', 'WISH', 'ALTHOUGH', 'MUST', 'BUSY', 'REPAIRED'],
    clues: [
      { word: 'WISH', clue: 'Used to talk about regrets' },
      { word: 'DESPITE', clue: 'Contrast connector + noun' },
      { word: 'MUST', clue: 'Deduction modal' },
    ],
    hangman: { word: 'FORGOTTEN', clue: 'He might have ______ his keys' },
  },
  {
    id: 'b5',
    title: 'B5 · Expresión avanzada',
    skillKey: 'listening',
    topics: 'Inversión negativa; cleft sentences; participle clauses; hedging; idioms académicos.',
    vocab: 'Investigación, cultura, innovación y argumentación.',
    phrases: ['Never have I seen such a thing. — Nunca he visto algo así.', 'What I need is more time. — Lo que necesito es más tiempo.', 'Having finished, she left. — Habiendo terminado, se fue.', 'The evidence appears to support this claim. — La evidencia parece respaldar esta afirmación.'],
    mission: 'Exponer una postura con cautela y precisión.',
    exercises: 'Never ___ I seen that. (have); ___ I need is time. (What).',
    games: 'Crucigrama de idioms; sopa de hedging; ahorcado de cleft.',
    words: ['NEVER', 'EVIDENCE', 'CLAIM', 'FINISHED', 'SUGGEST', 'PRECISION'],
    clues: [
      { word: 'NEVER', clue: 'Starts a negative inversion' },
      { word: 'EVIDENCE', clue: 'Facts that support a claim' },
      { word: 'WHAT', clue: 'Starts a cleft sentence: ___ I need is time' },
    ],
    hangman: { word: 'EVIDENCE', clue: 'Facts that support a claim' },
  },
  {
    id: 'b6',
    title: 'B6 · Inglés profesional y académico',
    skillKey: 'speaking',
    topics: 'Registro formal; cohesión; paráfrasis; correo profesional; CV, entrevistas, informes y negociación.',
    vocab: 'Empleo, informática, negocios, investigación y liderazgo.',
    phrases: ['I am writing to inquire about the position. — Escribo para consultar sobre el puesto.', 'The findings suggest that further research is necessary. — Los hallazgos sugieren que hace falta investigar más.', 'We would appreciate your feedback. — Agradeceríamos sus comentarios.'],
    mission: 'Redactar un correo y defender una propuesta profesional.',
    exercises: 'Formaliza “Send me the file”. (Could you please send me the file?).',
    games: 'Sopa de negocios; crucigrama de correo formal; ahorcado de interviews.',
    words: ['INQUIRE', 'FINDINGS', 'FEEDBACK', 'REPORT', 'INTERVIEW', 'PROPOSAL'],
    clues: [
      { word: 'INQUIRE', clue: 'Formal verb for ask' },
      { word: 'FEEDBACK', clue: 'Comments about work' },
      { word: 'INTERVIEW', clue: 'A job conversation' },
    ],
    hangman: { word: 'FEEDBACK', clue: 'Comments about your work' },
  },
  {
    id: 'b7',
    title: 'B7 · Dominio avanzado e integración',
    skillKey: 'writing',
    topics: 'Pragmática, ironía y humor; metáforas; diferencias UK/US; argumentación compleja; precisión léxica.',
    vocab: 'Literatura, política pública, ética, ciencia y comunicación intercultural.',
    phrases: ['That is easier said than done. — Es más fácil decirlo que hacerlo.', 'I see your point, yet I remain unconvinced. — Entiendo tu punto, pero sigo sin convencerme.', 'The proposal leaves much to be desired. — La propuesta deja mucho que desear.'],
    mission: 'Defender una tesis, improvisar y adaptar el registro a diferentes públicos.',
    exercises: 'Explica “easier said than done”. Reformula “I disagree” diplomáticamente.',
    games: 'Crucigrama de idioms; sopa de pragmática; ahorcado de metaphors.',
    words: ['THESIS', 'IRONY', 'METAPHOR', 'REGISTER', 'FEASIBILITY', 'UNCONVINCED'],
    clues: [
      { word: 'IRONY', clue: 'When the opposite of what you say is meant' },
      { word: 'THESIS', clue: 'Main academic argument' },
      { word: 'REGISTER', clue: 'Formal or informal style' },
    ],
    hangman: { word: 'METAPHOR', clue: 'A figure of speech, not literal' },
  },
]

function guideText(s: Stage) {
  return [
    `English Quest — ${s.title}`,
    '',
    'Objetivos y unidades temáticas',
    s.topics,
    '',
    'Vocabulario contextual',
    s.vocab,
    '',
    'Banco de frases bilingües',
    ...s.phrases,
    '',
    'Misión comunicativa',
    s.mission,
    '',
    'Ejercicios con solución',
    s.exercises,
    '',
    'Juegos de la etapa',
    s.games,
    '',
    'Evaluación de salida: 10 ítems nuevos, escucha, producción escrita y misión oral. Explica errores y recomienda repaso. No confundas puntos de juego con dominio lingüístico.',
  ].join('\n')
}

function quizFromStage(s: Stage): QuizQuestion[] {
  const generated = generateAbcFromMaterial(guideText(s), 6)
  const extras: QuizQuestion[] = [
    {
      prompt: `En ${s.title}, la misión comunicativa es:`,
      choices: [`A) ${s.mission}`, 'B) Memorizar un diccionario entero', 'C) Traducir solo listas de verbos'],
      correctIndex: 0,
    },
    {
      prompt: `El vocabulario contextual de ${s.title} incluye:`,
      choices: [`A) ${s.vocab}`, 'B) Solo fórmulas químicas', 'C) Código de programación'],
      correctIndex: 0,
    },
  ]
  return [...extras, ...generated].slice(0, 10)
}

export function englishQuestUnits(): CourseUnitDoc[] {
  return STAGES.map((s, i) => ({
    id: `eq_${s.id}`,
    title: `English Quest · ${s.title}`,
    skillKey: s.skillKey,
    description: `${s.topics} Vocabulario: ${s.vocab} Misión: ${s.mission}`,
    availableAt: `2026-11-${String(Math.min(28, i + 1)).padStart(2, '0')}T08:00`,
    status: 'published' as const,
    sort: 10 + i,
  }))
}

export function englishQuestActivities(): CourseActivityDoc[] {
  const rows: CourseActivityDoc[] = []
  STAGES.forEach((s, i) => {
    const unitId = `eq_${s.id}`
    const material = guideText(s)
    const due = `2026-12-${String(Math.min(28, i + 3)).padStart(2, '0')}T23:59`
    rows.push({
      id: `eq_${s.id}_guide`,
      skillKey: s.skillKey,
      title: `Guía ${s.title}`,
      subtitle: 'Guía de aprendizaje English Quest (se suma al curso, no reemplaza lo existente)',
      intro: material,
      listenAloudText: s.phrases[0]?.split('—')[0].trim() || '',
      speakPhrases: s.phrases.map((p) => p.split('—')[0].trim()),
      questions: quizFromStage(s),
      sort: 100 + i * 10,
      kind: 'guide',
      dueAt: due,
      materialText: material,
      unitId,
      published: true,
      gameWords: s.words,
      gameClues: s.clues,
      points: 5,
    })
    rows.push({
      id: `eq_${s.id}_hangman`,
      skillKey: s.skillKey,
      title: `Ahorcado · ${s.title}`,
      subtitle: s.hangman.clue,
      intro: `Adivina la palabra en inglés. Pista: ${s.hangman.clue}`,
      listenAloudText: '',
      speakPhrases: [],
      questions: [],
      sort: 101 + i * 10,
      kind: 'hangman',
      dueAt: due,
      materialText: material,
      unitId,
      published: true,
      hangmanWord: s.hangman.word,
      hangmanClue: s.hangman.clue,
      gameWords: s.words,
      points: 5,
    })
    rows.push({
      id: `eq_${s.id}_wordsearch`,
      skillKey: s.skillKey,
      title: `Sopa de letras · ${s.title}`,
      subtitle: `Encuentra: ${s.words.slice(0, 5).join(', ')}`,
      intro: 'Encuentra todas las palabras de la guía en la cuadrícula.',
      listenAloudText: '',
      speakPhrases: [],
      questions: [],
      sort: 102 + i * 10,
      kind: 'wordsearch',
      dueAt: due,
      materialText: material,
      unitId,
      published: true,
      gameWords: s.words,
      points: 5,
    })
    rows.push({
      id: `eq_${s.id}_crossword`,
      skillKey: s.skillKey,
      title: `Crucigrama · ${s.title}`,
      subtitle: 'Completa con pistas en inglés',
      intro: 'Resuelve el crucigrama con las pistas de la etapa.',
      listenAloudText: '',
      speakPhrases: [],
      questions: [],
      sort: 103 + i * 10,
      kind: 'crossword',
      dueAt: due,
      materialText: material,
      unitId,
      published: true,
      gameWords: s.words,
      gameClues: s.clues,
      points: 5,
    })
  })
  return rows
}

export function defaultClassroomUnits(): CourseUnitDoc[] {
  return [
    {
      id: 'u1',
      title: 'Unidad 1: Fundamentos y Escucha Activa',
      skillKey: 'listening',
      description: 'Estrategias de escucha global y selectiva con audios cortos y diálogos cotidianos.',
      availableAt: '2026-11-01T08:00',
      status: 'published',
      sort: 1,
    },
    {
      id: 'u2',
      title: 'Unidad 2: Expresión Oral y Role-Play',
      skillKey: 'speaking',
      description: 'Pronunciación, descripción visual y conversaciones simuladas.',
      availableAt: '2026-11-10T08:00',
      status: 'published',
      sort: 2,
    },
    {
      id: 'u3',
      title: 'Unidad 3: Lectura Crítica y Vocabulario',
      skillKey: 'reading',
      description: 'Skimming, scanning y vocabulario en contexto.',
      availableAt: '2026-11-18T08:00',
      status: 'published',
      sort: 3,
    },
    {
      id: 'u4',
      title: 'Unidad 4: Escritura con Propósito',
      skillKey: 'writing',
      description: 'Párrafos claros, conectores y redacción académica básica.',
      availableAt: '2026-11-25T08:00',
      status: 'published',
      sort: 4,
    },
  ]
}

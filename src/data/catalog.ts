import type { SkillKey, SkillQuiz, SkillTask } from '../types'

export const TASKS_BY_SKILL: Record<SkillKey, SkillTask[]> = {
  listening: [
    { id: 'listening_short_audio', title: 'Short audio clip', subtitle: 'Audio + multiple-choice with only selection' },
    { id: 'listening_dialogue', title: 'Dialogue comprehension', subtitle: 'Audio + multiple-choice with only selection' },
    { id: 'listening_gap', title: 'Gap-fill listening', subtitle: 'Audio + multiple-choice with only selection' },
    { id: 'listening_news_blurb', title: 'News blurb', subtitle: 'Audio + multiple-choice with only selection' },
  ],
  speaking: [
    { id: 'speaking_pronunciation', title: 'Pronunciation drill', subtitle: 'Record + Validate pronunciation' },
    { id: 'speaking_roleplay', title: 'Mini role-play', subtitle: 'Say phrases out loud (café)' },
    { id: 'speaking_picture', title: 'Describe the image', subtitle: 'Describe the scene out loud' },
    { id: 'speaking_small_talk', title: 'Small talk', subtitle: 'Informal oral conversation' },
  ],
  reading: [
    { id: 'reading_skim', title: 'Skim a short text', subtitle: 'Reading + multiple-choice with only selection' },
    { id: 'reading_detail', title: 'Detail questions', subtitle: 'Reading + multiple-choice with only selection' },
    { id: 'reading_vocab', title: 'Vocabulary in context', subtitle: 'Reading + multiple-choice with only selection' },
    { id: 'reading_hours_table', title: 'Hours & schedule', subtitle: 'Reading + multiple-choice with only selection' },
  ],
  writing: [
    { id: 'writing_sentence', title: 'Formal correspondence', subtitle: 'Writing · Multiple choice' },
    { id: 'writing_paragraph', title: 'Academic punctuation', subtitle: 'Writing · Multiple choice' },
    { id: 'writing_edit', title: 'Passive voice', subtitle: 'Writing · Multiple choice' },
    { id: 'writing_micro_email', title: 'Connectors & integrity', subtitle: 'Writing · Multiple choice' },
  ],
}

export const QUIZZES: Record<string, SkillQuiz> = {
  listening_short_audio: {
    intro: 'Pulsa “Escuchar” para oír el anuncio. Luego responde.',
    listenAloudText:
      'Good morning. The library opens at eight and closes at six. Student cards are required after five p.m.',
    questions: [
      { prompt: 'What time does the library open?', choices: ['6:00 a.m.', '8:00 a.m.', '10:00 a.m.', '5:00 p.m.'], correctIndex: 1 },
      { prompt: 'What is required after 5 p.m.?', choices: ['A payment', 'A student card', 'A reservation', 'Nothing'], correctIndex: 1 },
      { prompt: 'When does the library close?', choices: ['5:00 p.m.', '6:00 p.m.', '7:00 p.m.', '8:00 p.m.'], correctIndex: 1 },
    ],
  },
  listening_dialogue: {
    intro: 'Escucha el diálogo y responde.',
    listenAloudText:
      'A says: Do you have the report ready? B says: Almost — I need one more hour. A says: Okay, send it before noon.',
    questions: [
      { prompt: 'What does B still need?', choices: ['A day', 'About an hour', 'A new computer', 'Nothing'], correctIndex: 1 },
      { prompt: 'When should B send the report?', choices: ['Before noon', 'After lunch', 'Tomorrow', 'Next week'], correctIndex: 0 },
    ],
  },
  listening_gap: {
    intro: 'Escucha y elige la mejor opción.',
    listenAloudText: 'She goes to class every Monday unless it rains.',
    questions: [
      { prompt: 'Which pair fits the gaps best?', choices: ['go / rains', 'goes / rains', 'goes / rain', 'going / raining'], correctIndex: 1 },
      { prompt: 'What is true about Mondays?', choices: ['She never attends if it rains', 'She usually goes; rain is the usual exception', 'She only attends when it rains', 'Mondays are always cancelled'], correctIndex: 1 },
    ],
  },
  listening_news_blurb: {
    intro: 'Noticia corta de radio.',
    listenAloudText:
      'City council votes tonight on a plan to expand weekend bus service across the north district.',
    questions: [
      { prompt: 'What is the council mainly deciding?', choices: ['Closing all buses', 'Expanding weekend bus service', 'Building a new airport', 'Canceling weekend service'], correctIndex: 1 },
      { prompt: 'The expansion focuses on which area?', choices: ['The south district', 'The north district', 'Only the airport', 'International routes'], correctIndex: 1 },
    ],
  },
  speaking_pronunciation: {
    intro: 'Escucha el modelo, di la frase y valida.',
    speakPhrases: ['I want to learn English today.', 'Could you speak a little more slowly, please?'],
    questions: [],
  },
  speaking_roleplay: {
    intro: 'Role-play de cafetería.',
    speakPhrases: ['I will have a tea, please.', 'That will be all, thank you.'],
    questions: [],
  },
  speaking_picture: {
    intro: 'Describe el picnic en el parque.',
    speakPhrases: ['A family is having a picnic in the park.', 'The children are flying a colorful kite.'],
    questions: [],
  },
  speaking_small_talk: {
    intro: 'Small talk de fin de semana.',
    speakPhrases: ['Not bad, I visited some friends and relaxed.', 'How about you, did you get some rest?'],
    questions: [],
  },
  reading_skim: {
    intro: 'Campus notice: The language lab is open Monday to Friday from 9 a.m. to 4 p.m. Laptops can be borrowed at the front desk with a student ID.',
    questions: [
      { prompt: 'When is the lab open?', choices: ['Weekends only', 'Monday to Friday', 'Nights only', 'Never'], correctIndex: 1 },
      { prompt: 'What do you need to borrow a laptop?', choices: ['Cash', 'A student ID', 'A teacher note', 'Nothing'], correctIndex: 1 },
    ],
  },
  reading_detail: {
    intro: 'Email: Dear students, the exam is moved to Thursday at 10:00 in Room B12. Bring a pencil and your ID.',
    questions: [
      { prompt: 'What day is the exam?', choices: ['Monday', 'Thursday', 'Friday', 'Sunday'], correctIndex: 1 },
      { prompt: 'Where is it?', choices: ['Room A1', 'Room B12', 'Library', 'Gym'], correctIndex: 1 },
    ],
  },
  reading_vocab: {
    intro: 'The word “borrow” means to take something for a short time and then return it.',
    questions: [
      { prompt: '“Borrow” is closest to:', choices: ['Buy forever', 'Take and later return', 'Throw away', 'Hide'], correctIndex: 1 },
    ],
  },
  reading_hours_table: {
    intro: 'Library hours: Mon–Fri 8:00–18:00. Sat 9:00–13:00. Closed on Sunday.',
    questions: [
      { prompt: 'Is the library open on Sunday?', choices: ['Yes, all day', 'Yes, morning only', 'No', 'Only for staff'], correctIndex: 2 },
      { prompt: 'Saturday closing time?', choices: ['6 p.m.', '1 p.m.', '9 a.m.', '8 a.m.'], correctIndex: 1 },
    ],
  },
  writing_sentence: {
    intro: 'Choose the correct sentence.',
    questions: [
      { prompt: 'Best sentence:', choices: ['She go to class.', 'She goes to class.', 'She going to class.', 'She gone to class.'], correctIndex: 1 },
    ],
  },
  writing_paragraph: {
    intro: 'Choose the clearer paragraph opening.',
    questions: [
      { prompt: 'Best opening:', choices: ['Yesterday I go park.', 'Yesterday I went to the park with my friends.', 'Park I yesterday.', 'I park go friends.'], correctIndex: 1 },
    ],
  },
  writing_edit: {
    intro: 'Pick the clearer version.',
    questions: [
      { prompt: 'Clearer sentence:', choices: ['The report, it is late.', 'The report is late.', 'Report late is.', 'Late the report it.'], correctIndex: 1 },
    ],
  },
  writing_micro_email: {
    intro: 'Choose a polite email closing.',
    questions: [
      { prompt: 'Best closing:', choices: ['Bye now!!!', 'Best regards,', 'WHATEVER', 'lol'], correctIndex: 1 },
    ],
  },
}

export const SKILL_META: Record<
  SkillKey,
  { title: string; subtitle: string; accent: string; bg: string; progress: string; cover: string }
> = {
  listening: {
    title: 'Listening',
    subtitle: 'Comprensión auditiva',
    accent: '#1DBF9A',
    bg: 'linear-gradient(180deg,#E8FBF4 0%,#D4F5EA 100%)',
    progress: '#1DBF9A',
    cover: '/course-video-phones.png',
  },
  speaking: {
    title: 'Speaking',
    subtitle: 'Expresión oral',
    accent: '#F5B942',
    bg: 'linear-gradient(180deg,#FFF8E4 0%,#FDEEC4 100%)',
    progress: '#F5B942',
    cover: '/photo-1522202176988-66273c2fd55f.jpg',
  },
  reading: {
    title: 'Reading',
    subtitle: 'Comprensión lectora',
    accent: '#F06B88',
    bg: 'linear-gradient(180deg,#FFEAF0 0%,#FFD6E0 100%)',
    progress: '#F06B88',
    cover: '/login-background.png',
  },
  writing: {
    title: 'Writing',
    subtitle: 'Expresión escrita',
    accent: '#8B6EF6',
    bg: 'linear-gradient(180deg,#F1EBFF 0%,#E4D9FF 100%)',
    progress: '#8B6EF6',
    cover: '/course-video-phones.png',
  },
}

export const COURSE_INTRO: Record<SkillKey, { lead: string; body: string[] }> = {
  listening: {
    lead: 'Este espacio es el punto de partida para entrenar tu oído en inglés real.',
    body: [
      'Aquí encontrarás audios cortos, diálogos y noticias con actividades de selección. El curso está organizado por unidades para que avances de forma clara y práctica.',
      'Te invitamos a escuchar, repetir y cuestionar lo que oyes en contextos cotidianos.',
    ],
  },
  speaking: {
    lead: 'Este espacio es el punto de partida para comunicar, crear y hablar con confianza.',
    body: [
      'Aquí encontrarás drills de pronunciación, role-plays y conversación informal. El curso está organizado por unidades, alineado a tu progreso en FluidLearn.',
      'Te invitamos a explorar, participar, grabar tu voz y, sobre todo, a cuestionar cómo te expresas en un mundo cada vez más digital.',
    ],
  },
  reading: {
    lead: 'Este espacio es el punto de partida para leer con propósito y extraer ideas clave.',
    body: [
      'Aquí encontrarás textos cortos, tablas y vocabulario en contexto. El curso está organizado por unidades para que puedas avanzar de manera clara, práctica y dinámica.',
      'Te invitamos a explorar, subrayar y conectar lo que lees con tu vida académica.',
    ],
  },
  writing: {
    lead: 'Este espacio es el punto de partida para escribir con claridad e integridad académica.',
    body: [
      'Aquí encontrarás correspondencia, puntuación, voz pasiva y conectores. El curso está organizado por unidades para que practiques de forma guiada.',
      'Te invitamos a redactar, revisar y mejorar cada texto con los criterios de FluidLearn.',
    ],
  },
}

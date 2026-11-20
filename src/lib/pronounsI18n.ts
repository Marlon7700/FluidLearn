import type { LandingLangCode } from './landingI18n'

export type PronounsCopy = {
  kicker: string
  heroTitle: string
  heroLead: string
  startCta: string
  heroTestCta: string
  intro: string
  nav: { id: string; label: string }[]
  decideKicker: string
  decideTitle: string
  decideLead: string
  decideIdle: string
  functions: { id: string; label: string; type: string; rule: string; example: string }[]
  whatTitle: string
  whatLead: string
  whatNote: string
  whatQ: string
  whatA: string
  personTitle: string
  personLead: string
  headers: string[]
  rows: { subject: string; note: string; object: string; det: string; poss: string; refl: string }[]
  checksTitle: string
  checks: string[]
  typesTitle: string
  typesLead: string
  types: { id: string; title: string; q: string; body: string; forms: string; example: string }[]
  mapTitle: string
  mapLead: string
  mapHeaders: string[]
  diffsTitle: string
  diffsLead: string
  diffs: { title: string; body: string; before: string; after: string; tip: string }[]
  practiceTitle: string
  practiceLead: string
  mini: { q: string; options: string[]; answer: number; why: string }[]
  practiceCheck: string
  practiceReset: string
  practiceIdle: string
  errorsTitle: string
  errorsLead: string
  errors: { issue: string; wrong: string; right: string; why: string }[]
  faqTitle: string
  faq: { q: string; a: string }[]
  closeLead: string
  closeBody: string
  grammarCta: string
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
  moreTitle: string
  more: { tag: string; title: string; to: string }[]
  testCta: string
}

const es: PronounsCopy = {
  kicker: 'Guía de decisión 2026',
  heroTitle: 'Pronombres en inglés: elige el tipo correcto',
  heroLead:
    'Un pronombre evita repeticiones, señala, pregunta, conecta ideas o devuelve la acción al sujeto. La clave no es memorizar una lista infinita: es reconocer el trabajo que hace la palabra.',
  startCta: 'Empieza gratis',
  heroTestCta: 'Empieza el test',
  intro:
    'Empieza por los pronombres personales, compara las siete familias y comprueba tu elección con un test cronometrado de 15 preguntas en FluidLearn.',
  nav: [
    { id: 'decision', label: 'Diagnóstico' },
    { id: 'que-son', label: 'Qué es' },
    { id: 'personales', label: 'Personales' },
    { id: 'tipos', label: 'Mapa de tipos' },
    { id: 'practica', label: 'Práctica' },
    { id: 'ejercicios', label: 'Test' },
  ],
  decideKicker: 'Diagnóstico rápido',
  decideTitle: '¿Qué quieres hacer con el pronombre?',
  decideLead: 'Elige la función de la palabra. Verás el tipo más probable, una regla corta y un ejemplo.',
  decideIdle: 'Selecciona una función para recibir una recomendación.',
  functions: [
    { id: 'personales', label: 'sustituir a una persona o cosa', type: 'Personales', rule: 'Cambia según sea sujeto u objeto.', example: 'They called me after class.' },
    { id: 'posesivos', label: 'mostrar de quién es algo sin repetir el nombre', type: 'Posesivos', rule: 'La forma independiente no lleva sustantivo detrás.', example: 'This notebook is mine.' },
    { id: 'relativos', label: 'unir una descripción con su antecedente', type: 'Relativos', rule: 'who, which, that o whose abren la información extra.', example: 'The tutor who helped me was patient.' },
    { id: 'demostrativos', label: 'señalar algo cercano o lejano', type: 'Demostrativos', rule: 'this/these (cerca) y that/those (lejos), con número.', example: 'Those are the examples we need.' },
    { id: 'indefinidos', label: 'referirse a alguien o algo no específico', type: 'Indefinidos', rule: 'someone, anything, nobody, each… la identidad queda abierta.', example: 'Someone left a message.' },
    { id: 'interrogativos', label: 'preguntar por identidad, cosa o elección', type: 'Interrogativos', rule: 'who, what, which, whose abren la pregunta.', example: 'Whose keys are these?' },
    { id: 'reflexivos', label: 'devolver la acción al mismo sujeto', type: 'Reflexivos', rule: 'Terminan en -self / -selves y pueden dar énfasis.', example: 'She taught herself to code.' },
  ],
  whatTitle: 'Qué es un pronombre en inglés y por qué importa',
  whatLead:
    'Un pronombre ocupa el lugar de un sustantivo o de un grupo nominal, o permite referirse a él sin repetirlo. En inglés, su forma depende de la función: quien realiza la acción, quien la recibe, quien posee algo o el vínculo entre dos partes de una oración.',
  whatNote:
    'Por eso una misma referencia puede necesitar formas distintas. No basta con traducir palabra por palabra: primero identifica la función y después elige la forma.',
  whatQ: 'La pregunta que resuelve casi todo',
  whatA: '¿Qué trabajo realiza esta palabra dentro de la oración? Su posición ayuda, pero la función decide.',
  personTitle: 'Pronombres personales en inglés: sujeto y objeto',
  personLead:
    'Los personales son el centro del sistema. La forma de sujeto va antes del verbo en una oración afirmativa; la forma de objeto aparece después de un verbo o de una preposición.',
  headers: ['Sujeto', 'Objeto', 'Determinante posesivo', 'Pronombre posesivo', 'Reflexivo'],
  rows: [
    { subject: 'I', note: 'primera persona singular', object: 'me', det: 'my', poss: 'mine', refl: 'myself' },
    { subject: 'you', note: 'segunda persona singular o plural', object: 'you', det: 'your', poss: 'yours', refl: 'yourself / yourselves' },
    { subject: 'he', note: 'tercera persona masculina singular', object: 'him', det: 'his', poss: 'his', refl: 'himself' },
    { subject: 'she', note: 'tercera persona femenina singular', object: 'her', det: 'her', poss: 'hers', refl: 'herself' },
    { subject: 'it', note: 'cosa, animal o situación en singular', object: 'it', det: 'its', poss: '—', refl: 'itself' },
    { subject: 'we', note: 'primera persona plural', object: 'us', det: 'our', poss: 'ours', refl: 'ourselves' },
    { subject: 'they', note: 'tercera persona plural o singular no marcada por género', object: 'them', det: 'their', poss: 'theirs', refl: 'themselves' },
  ],
  checksTitle: 'Tres comprobaciones rápidas',
  checks: [
    'El inglés normalmente exige un sujeto explícito: no omitas la forma de sujeto aunque el verbo parezca suficiente.',
    'Después de una preposición, elige la forma de objeto.',
    'El singular they es habitual cuando el género no se conoce, no importa o una persona lo usa para sí.',
  ],
  typesTitle: 'Los siete tipos de pronombres, comparados por función',
  typesLead: 'Cada tarjeta parte de una decisión real. Las formas pueden coincidir entre categorías, así que observa la función completa de la oración.',
  types: [
    { id: 'personales', title: 'Personales', q: '¿Quién actúa o recibe la acción?', body: 'Sustituyen personas, animales, cosas o ideas y cambian según sean sujeto u objeto.', forms: 'I, me, she, them', example: 'They called me after class.' },
    { id: 'posesivos', title: 'Posesivos', q: '¿De quién es, sin nombrar el objeto otra vez?', body: 'Expresan posesión de manera independiente. No llevan un sustantivo inmediatamente después.', forms: 'mine, yours, hers, ours', example: 'This notebook is mine.' },
    { id: 'relativos', title: 'Relativos', q: '¿Qué palabra enlaza el antecedente con información adicional?', body: 'Introducen una oración de relativo y conectan esa información con una persona, cosa, lugar o posesión.', forms: 'who, which, that, whose', example: 'The tutor who helped me was patient.' },
    { id: 'demostrativos', title: 'Demostrativos', q: '¿Qué se señala y a qué distancia está?', body: 'Distinguen singular o plural y una distancia percibida como cercana o lejana.', forms: 'this, that, these, those', example: 'Those are the examples we need.' },
    { id: 'indefinidos', title: 'Indefinidos', q: '¿La identidad o cantidad queda abierta?', body: 'Se refieren a personas o cosas no identificadas de manera exacta.', forms: 'someone, anything, nobody, each', example: 'Someone left a message.' },
    { id: 'interrogativos', title: 'Interrogativos', q: '¿Qué información falta en la pregunta?', body: 'Preguntan por personas, cosas, elecciones o posesión.', forms: 'who, what, which, whose', example: 'Whose keys are these?' },
    { id: 'reflexivos', title: 'Reflexivos', q: '¿La acción vuelve al sujeto?', body: 'Indican que quien realiza la acción también la recibe; también pueden dar énfasis.', forms: 'myself, yourself, themselves', example: 'She taught herself to code.' },
  ],
  mapTitle: 'Cómo distinguirlos en una frase',
  mapLead: 'Usa esta secuencia: localiza el verbo, identifica la relación con el sustantivo y formula la pregunta de la segunda columna.',
  mapHeaders: ['Tipo', 'Pregunta de control', 'Señal rápida', 'Ejemplo'],
  diffsTitle: 'Tres decisiones que suelen confundirse',
  diffsLead: 'Compara la función, no solo la traducción.',
  diffs: [
    { title: 'Sujeto u objeto', body: 'Si la palabra realiza la acción, usa la forma de sujeto. Si la recibe o va tras una preposición, usa la de objeto.', before: 'Ana called Leo. Ana thanked Leo.', after: 'Ana called Leo. She thanked him.', tip: 'Busca quién controla el verbo.' },
    { title: 'Determinante o pronombre posesivo', body: 'El determinante acompaña a un sustantivo; el pronombre posesivo lo reemplaza.', before: 'This is my coat.', after: 'This coat is mine.', tip: 'Si aparece el sustantivo, no uses la forma independiente.' },
    { title: 'Reflexivo necesario o enfático', body: 'El reflexivo es necesario cuando la acción vuelve al sujeto; es enfático cuando solo refuerza quién hizo algo.', before: 'Leo fixed the bike.', after: 'Leo fixed the bike himself.', tip: 'Elimina el reflexivo: si cambia el sentido básico, era necesario.' },
  ],
  practiceTitle: 'Elige el pronombre que cumple la función',
  practiceLead: 'Resuelve las siete frases. El resultado explica la función, no solo la letra correcta.',
  mini: [
    { q: '___ am ready.', options: ['I', 'Me', 'Myself'], answer: 0, why: 'Antes del verbo hace falta la forma de sujeto.' },
    { q: 'This seat is ___.', options: ['my', 'mine', 'me'], answer: 1, why: 'No hay sustantivo detrás: pronombre posesivo independiente.' },
    { q: 'The teacher ___ helped us is new.', options: ['who', 'which', 'what'], answer: 0, why: 'El antecedente es una persona: who.' },
    { q: '___ are my keys over there.', options: ['These', 'Those', 'This'], answer: 1, why: 'Plural y distancia: those.' },
    { q: 'There is ___ in the box; it is empty.', options: ['something', 'anything', 'nothing'], answer: 2, why: 'La caja está vacía: nothing.' },
    { q: '___ bag is this?', options: ['Who', 'Whose', 'Which'], answer: 1, why: 'Pregunta de posesión: whose.' },
    { q: 'She taught ___ to code.', options: ['herself', 'her', 'hers'], answer: 0, why: 'La acción vuelve al sujeto: herself.' },
  ],
  practiceCheck: 'Comprobar respuestas',
  practiceReset: 'Reiniciar práctica',
  practiceIdle: 'Tu resultado aparecerá aquí.',
  errorsTitle: 'Errores frecuentes con pronombres en inglés',
  errorsLead: 'Estas correcciones muestran qué decisión falló y cómo repararla.',
  errors: [
    { issue: 'Forma de objeto usada como sujeto', wrong: 'Me work from home.', right: 'I work from home.', why: 'Antes del verbo se necesita la forma que realiza la acción.' },
    { issue: 'Posesivo dependiente donde falta el sustantivo', wrong: 'This laptop is her.', right: 'This laptop is hers.', why: 'Cuando el objeto ya se entiende, usa la forma posesiva independiente.' },
    { issue: 'Relativo de cosa para una persona', wrong: 'The colleague which called is new.', right: 'The colleague who called is new.', why: 'El antecedente humano pide who.' },
    { issue: 'Demostrativo singular con sustantivo plural', wrong: 'This shoes are new.', right: 'These shoes are new.', why: 'Haz concordar el demostrativo con el número.' },
    { issue: 'Indefinido singular con verbo plural', wrong: 'Everyone have a ticket.', right: 'Everyone has a ticket.', why: 'Los indefinidos en -one se tratan como singulares.' },
    { issue: 'Interrogativo de persona en vez de posesión', wrong: 'Who coat is this?', right: 'Whose coat is this?', why: 'La pregunta de “de quién” usa whose.' },
    { issue: 'Reflexivo usado como sujeto neutro', wrong: 'Myself finished the report.', right: 'I finished the report myself.', why: 'El reflexivo no sustituye al sujeto personal.' },
  ],
  faqTitle: 'Preguntas sobre los pronombres en inglés',
  faq: [
    { q: '¿Cuáles son los pronombres personales en inglés?', a: 'Sujeto: I, you, he, she, it, we, they. Objeto: me, you, him, her, it, us, them.' },
    { q: '¿Cuál es la diferencia entre my y mine?', a: 'my acompaña a un sustantivo (my coat). mine lo reemplaza (The coat is mine).' },
    { q: '¿That es siempre un pronombre relativo?', a: 'No. También es demostrativo (that book) o conjunción. Mira la función en la oración.' },
    { q: '¿Cuándo se usa who y cuándo which?', a: 'who para personas; which para cosas o animales en relativo. that puede cubrir ambos en cláusulas restrictivas.' },
    { q: '¿Se puede usar they para una sola persona?', a: 'Sí. El singular they es habitual cuando el género no se conoce, no importa o la persona lo usa para sí.' },
  ],
  closeLead: 'Decide por función y la forma llegará después',
  closeBody: 'Vuelve al mapa cuando dudes, practica primero sujeto y objeto y profundiza en una categoría solo cuando la función ya esté clara.',
  grammarCta: 'Seguir con gramática inglesa',
  quizKicker: 'Test cronometrado',
  quizTitle: 'Test de pronombres en inglés: 15 preguntas',
  quizLead: 'Elige A, B o C. Tienes 10 minutos. Al terminar verás la puntuación y un mensaje de felicitación.',
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
    { q: '___ am ready.', options: ['I', 'Me', 'Myself'], answer: 0, why: 'Sujeto explícito antes del verbo: I.' },
    { q: 'This seat is ___.', options: ['my', 'mine', 'me'], answer: 1, why: 'Sin sustantivo detrás: mine.' },
    { q: 'The teacher ___ helped us is new.', options: ['who', 'which', 'what'], answer: 0, why: 'Antecedente humano: who.' },
    { q: '___ are my keys over there.', options: ['These', 'Those', 'This'], answer: 1, why: 'Plural y lejos: those.' },
    { q: 'There is ___ in the box; it is empty.', options: ['something', 'anything', 'nothing'], answer: 2, why: 'Vacío: nothing.' },
    { q: '___ bag is this?', options: ['Who', 'Whose', 'Which'], answer: 1, why: 'Pregunta de posesión: whose.' },
    { q: 'She taught ___ to code.', options: ['herself', 'her', 'hers'], answer: 0, why: 'La acción vuelve al sujeto.' },
    { q: 'Corrige el sujeto: “Me work from home.”', options: ['Me work from home.', 'I work from home.', 'Myself work from home.'], answer: 1, why: 'Antes del verbo: I.' },
    { q: 'This laptop is ___.', options: ['her', 'hers', 'she'], answer: 1, why: 'Pronombre posesivo independiente: hers.' },
    { q: 'The colleague ___ called is new.', options: ['which', 'who', 'what'], answer: 1, why: 'Persona: who, no which.' },
    { q: '___ shoes are new.', options: ['This', 'These', 'That'], answer: 1, why: 'Plural: these.' },
    { q: 'Everyone ___ a ticket.', options: ['have', 'has', 'are'], answer: 1, why: 'Everyone es singular: has.' },
    { q: '___ coat is this?', options: ['Who', 'Whose', 'Whom'], answer: 1, why: 'De quién: whose.' },
    { q: 'Corrige: “Myself finished the report.”', options: ['Myself finished the report.', 'I finished the report myself.', 'Me finished the report.'], answer: 1, why: 'El sujeto es I; myself solo enfatiza.' },
    { q: 'This gift is for you and ___.', options: ['I', 'me', 'myself'], answer: 1, why: 'Tras preposición: objeto me.' },
  ],
  moreTitle: 'Más recursos de gramática en FluidLearn',
  more: [
    { tag: 'Base', title: 'Gramática inglesa', to: '/gramatica' },
    { tag: 'Adjetivos', title: 'Adjetivos en inglés', to: '/adjetivos' },
    { tag: 'Adverbios', title: 'Adverbios en inglés', to: '/adverbios' },
    { tag: 'Verbos', title: 'Verbos modales', to: '/verbos-modales' },
    { tag: 'Nivel', title: 'Test de nivel', to: '/test' },
    { tag: 'Consejos', title: 'Consejos para aprender', to: '/consejos' },
  ],
  testCta: 'Repasar el diagnóstico',
}

const en: PronounsCopy = {
  ...es,
  kicker: '2026 decision guide',
  heroTitle: 'English pronouns: choose the right type',
  heroLead: 'A pronoun avoids repetition, points, asks, connects ideas or sends the action back to the subject. The key is not an endless list: it is recognising the job the word does.',
  startCta: 'Start for free',
  heroTestCta: 'Start the test',
  intro: 'Start with personal pronouns, compare the seven families and check your choice with a 15-question timed test on FluidLearn.',
  decideTitle: 'What do you want the pronoun to do?',
  decideIdle: 'Select a function to get a recommendation.',
  whatTitle: 'What is an English pronoun and why it matters',
  personTitle: 'Personal pronouns in English: subject and object',
  typesTitle: 'The seven pronoun types, compared by function',
  mapTitle: 'How to tell them apart in a sentence',
  diffsTitle: 'Three decisions that often get mixed up',
  practiceTitle: 'Choose the pronoun that does the job',
  quizTitle: 'English pronouns test: 15 questions',
  quizStart: 'Start the test',
  quizRetry: 'Try again',
  moreTitle: 'More grammar resources on FluidLearn',
  closeLead: 'Decide by function and the form will follow',
  grammarCta: 'Continue with English grammar',
  testCta: 'Review the diagnosis',
}

export function getPronounsCopy(lang: LandingLangCode): PronounsCopy {
  return lang === 'es' ? es : en
}

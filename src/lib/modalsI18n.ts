import type { LandingLangCode } from './landingI18n'

export type ModalIntent = {
  id: string
  label: string
  title: string
  body: string
  family: string
  example: string
  exampleEs: string
}

export type ModalRow = {
  id: string
  verb: string
  negative: string
  uses: string
  tone: string
  example: string
  exampleEs: string
}

export type ModalsCopy = {
  kicker: string
  heroTitle: string
  heroLead: string
  startCta: string
  chooseCta: string
  heroNote: string
  pickerTitle: string
  pickerLead: string
  nav: { id: string; label: string }[]
  conceptKicker: string
  conceptTitle: string
  conceptLead: string
  conceptBody: string
  ruleTitle: string
  ruleFormula: string
  ruleExamples: string
  rules: string[]
  mapKicker: string
  mapTitle: string
  mapLead: string
  intents: ModalIntent[]
  stepsTitle: string
  steps: { title: string; body: string; note: string }[]
  listKicker: string
  listTitle: string
  listLead: string
  tableHeaders: string[]
  rows: ModalRow[]
  semiTitle: string
  semis: { title: string; body: string }[]
  guideKicker: string
  guideTitle: string
  guideLead: string
  guideCta: string
  structKicker: string
  structTitle: string
  structLead: string
  structures: { title: string; formula: string; example: string; exampleEs: string }[]
  structNote: string
  diffKicker: string
  diffTitle: string
  diffs: { title: string; body: string; example: string; cta: string }[]
  pastTitle: string
  pastLead: string
  pastFormulaTitle: string
  pastFormula: string
  pastExamples: string
  perfects: { title: string; body: string }[]
  examplesKicker: string
  examplesTitle: string
  examplesLead: string
  examples: { en: string; es: string; tag: string }[]
  errorsKicker: string
  errorsTitle: string
  errors: { wrong: string; right: string; why: string }[]
  quizKicker: string
  quizTitle: string
  quizLead: string
  quizCheck: string
  quizPending: string
  quizScore: string
  quizShow: string
  quizHide: string
  quiz: { q: string; options: string[]; answer: number; why: string }[]
  faqKicker: string
  faqTitle: string
  faq: { q: string; a: string }[]
  moreKicker: string
  moreTitle: string
  moreCta: string
  more: { title: string; text: string; to: string }[]
  closeLead: string
  testCta: string
}

const es: ModalsCopy = {
  kicker: 'Guía práctica de gramática inglesa',
  heroTitle: 'Verbos modales en inglés: lista, usos, ejemplos y ejercicios',
  heroLead:
    'Aprende qué son los verbos modales en inglés, cómo elegir entre can, could, may, might, must, should, will y would y cómo construir frases afirmativas, negativas e interrogativas sin traducir palabra por palabra.',
  startCta: 'Empieza gratis',
  chooseCta: 'Elige tu modal',
  heroNote: 'No memorices diez traducciones. Elige primero la intención.',
  pickerTitle: '¿Qué quieres expresar?',
  pickerLead: 'Selecciona una intención y descubre la familia de modal verbs más natural.',
  nav: [
    { id: 'que-son', label: 'Qué son' },
    { id: 'usos', label: 'Usos' },
    { id: 'lista', label: 'Lista' },
    { id: 'estructura', label: 'Estructura' },
    { id: 'diferencias', label: 'Diferencias' },
    { id: 'ejemplos', label: 'Ejemplos' },
    { id: 'ejercicios', label: 'Ejercicios' },
    { id: 'preguntas', label: 'Preguntas' },
  ],
  conceptKicker: 'Concepto esencial',
  conceptTitle: 'Qué son los verbos modales en inglés y para qué sirven',
  conceptLead:
    'Los modal verbs son verbos auxiliares que modifican el significado del verbo principal. Permiten decir no solo qué ocurre, sino también si una acción es posible, necesaria, aconsejable, permitida, probable o hipotética.',
  conceptBody:
    'En I work, solo afirmas que trabajas. En I can work, expresas capacidad; en I must work, obligación; y en I might work, posibilidad. El verbo principal no cambia, pero la intención sí.',
  ruleTitle: 'Regla base de los verbos modales',
  ruleFormula: 'Sujeto + modal verb + verbo en forma base',
  ruleExamples: 'I should call · She can drive · They might arrive',
  rules: [
    'No añaden -s en tercera persona: she can, no she cans.',
    'No usan do/does/did para preguntar o negar.',
    'Van antes del verbo principal y cambian su matiz.',
    'Usan infinitivo sin to, salvo ought to y semimodales.',
    'Son invariables: conservan la misma forma con todos los sujetos.',
  ],
  mapKicker: 'Mapa por intención',
  mapTitle: 'Usos de los verbos modales: elige según lo que quieres expresar',
  mapLead:
    'La misma traducción española puede corresponder a varios modales. Para acertar, decide primero si hablas de capacidad, permiso, posibilidad, obligación, consejo o deducción.',
  intents: [
    { id: 'capacidad', label: 'Capacidad', title: 'Capacidad con verbos modales', body: 'Habla de lo que alguien sabe o puede hacer ahora, podía hacer antes o será capaz de hacer.', family: 'can · could · be able to', example: 'I can speak English.', exampleEs: 'Sé hablar inglés.' },
    { id: 'permiso', label: 'Permiso', title: 'Permiso con verbos modales', body: 'Pide o concede autorización. La elección cambia el grado de formalidad y cortesía.', family: 'can · could · may', example: 'May I use your phone?', exampleEs: '¿Puedo usar tu teléfono?' },
    { id: 'posibilidad', label: 'Posibilidad', title: 'Posibilidad con verbos modales', body: 'Presenta una situación como posible sin afirmar que vaya a ocurrir con seguridad.', family: 'may · might · could', example: 'She might arrive later.', exampleEs: 'Puede que llegue más tarde.' },
    { id: 'obligacion', label: 'Obligación', title: 'Obligación con verbos modales', body: 'Señala una norma, una necesidad fuerte o una exigencia externa.', family: 'must · have to', example: 'You must show your ID.', exampleEs: 'Debes mostrar tu identificación.' },
    { id: 'consejo', label: 'Consejo', title: 'Consejo con verbos modales', body: 'Recomienda una acción sin convertirla necesariamente en una obligación.', family: 'should · ought to · had better', example: 'You should talk to her.', exampleEs: 'Deberías hablar con ella.' },
    { id: 'deduccion', label: 'Deducción', title: 'Deducción con verbos modales', body: 'Expresa el grado de certeza que deduces a partir de la información disponible.', family: 'must · might · can\'t', example: 'They must be at home.', exampleEs: 'Deben de estar en casa.' },
  ],
  stepsTitle: 'Cómo elegir el verbo modal correcto en cuatro pasos',
  steps: [
    { title: 'Identifica la intención', body: 'Pregunta qué cambia en el mensaje: ¿capacidad, permiso, probabilidad, norma, recomendación o certeza? No empieces traduciendo “poder” o “deber”.', note: 'Quiero pedir permiso → can, could o may' },
    { title: 'Sitúa el tiempo', body: 'Comprueba si la situación ocurre ahora, ocurrió en el pasado o se refiere al futuro. Los modales tienen formas limitadas y a veces necesitan una alternativa.', note: 'Capacidad futura → will be able to' },
    { title: 'Ajusta fuerza y certeza', body: 'Must, should y might no transmiten la misma intensidad. Decide si impones una obligación, das un consejo o solo admites una posibilidad.', note: 'must → obligación · should → consejo' },
    { title: 'Elige el nivel de cortesía', body: 'Can funciona en situaciones cotidianas; could crea distancia cortés; may resulta más formal. La relación entre hablantes importa tanto como la gramática.', note: 'Could you help me? → petición cortés' },
  ],
  listKicker: 'Consulta rápida',
  listTitle: 'Lista de verbos modales en inglés y su significado',
  listLead: 'Esta tabla reúne los principales modal auxiliary verbs, sus usos, su matiz y un ejemplo traducido. Úsala como mapa; el contexto decide el significado final.',
  tableHeaders: ['Modal verb', 'Usos principales', 'Matiz', 'Ejemplo en inglés y español'],
  rows: [
    { id: 'can', verb: 'Can', negative: 'cannot / can\'t', uses: 'capacidad, permiso informal y posibilidad', tone: 'directo y cotidiano', example: 'I can help you today.', exampleEs: 'Puedo ayudarte hoy.' },
    { id: 'could', verb: 'Could', negative: 'could not / couldn\'t', uses: 'capacidad pasada, posibilidad y petición cortés', tone: 'más tentativo que can', example: 'Could you open the window?', exampleEs: '¿Podrías abrir la ventana?' },
    { id: 'may', verb: 'May', negative: 'may not', uses: 'permiso formal y posibilidad', tone: 'formal o prudente', example: 'May I come in?', exampleEs: '¿Puedo pasar?' },
    { id: 'might', verb: 'Might', negative: 'might not', uses: 'posibilidad incierta o remota', tone: 'menos seguro que may', example: 'It might rain tonight.', exampleEs: 'Puede que llueva esta noche.' },
    { id: 'must', verb: 'Must', negative: 'must not / mustn\'t', uses: 'obligación fuerte y deducción lógica', tone: 'máxima necesidad o certeza', example: 'You must wear a seat belt.', exampleEs: 'Debes llevar cinturón.' },
    { id: 'should', verb: 'Should', negative: 'should not / shouldn\'t', uses: 'consejo, recomendación y expectativa', tone: 'recomendación clara', example: 'You should get some rest.', exampleEs: 'Deberías descansar.' },
    { id: 'ought', verb: 'Ought to', negative: 'ought not to / oughtn\'t to', uses: 'consejo, deber moral y expectativa', tone: 'similar a should, algo más formal', example: 'We ought to be more careful.', exampleEs: 'Deberíamos tener más cuidado.' },
    { id: 'will', verb: 'Will', negative: 'will not / won\'t', uses: 'futuro, decisión, promesa y predicción', tone: 'decisión o expectativa firme', example: 'I will call you tomorrow.', exampleEs: 'Te llamaré mañana.' },
    { id: 'would', verb: 'Would', negative: 'would not / wouldn\'t', uses: 'petición cortés, preferencia, hábito pasado y condicional', tone: 'hipotético o muy cortés', example: 'Would you like some coffee?', exampleEs: '¿Te apetece un café?' },
    { id: 'shall', verb: 'Shall', negative: 'shall not / shan\'t', uses: 'oferta, sugerencia y futuro formal', tone: 'formal, frecuente con I y we', example: 'Shall we start?', exampleEs: '¿Empezamos?' },
  ],
  semiTitle: 'Verbos semimodales y alternativas frecuentes',
  semis: [
    { title: 'have to', body: 'obligación externa y tiempos que must no tiene' },
    { title: 'need to', body: 'necesidad práctica' },
    { title: 'be able to', body: 'capacidad en distintos tiempos' },
    { title: 'had better', body: 'consejo con consecuencia' },
    { title: 'used to', body: 'hábito o estado pasado' },
  ],
  guideKicker: 'Guía individual',
  guideTitle: 'Modal verbs uno por uno: can, could, may, might, must, should, will y would',
  guideLead: 'Aprende la función central de cada verbo modal. En FluidLearn practicarás estos matices con ejercicios, IA y profesores conectados.',
  guideCta: 'Ver en la lista',
  structKicker: 'Construcción',
  structTitle: 'Estructura de los modal verbs: afirmativa, negativa e interrogativa',
  structLead: 'Los verbos modales ya funcionan como auxiliares. Por eso no necesitan do, does o did y se colocan directamente antes del sujeto en las preguntas.',
  structures: [
    { title: 'Oración afirmativa', formula: 'Sujeto + modal + verbo base', example: 'She can speak English.', exampleEs: 'Ella sabe hablar inglés.' },
    { title: 'Oración negativa', formula: 'Sujeto + modal + not + verbo base', example: 'She cannot come today.', exampleEs: 'Ella no puede venir hoy.' },
    { title: 'Oración interrogativa', formula: 'Modal + sujeto + verbo base?', example: 'Can she come today?', exampleEs: '¿Puede venir hoy?' },
  ],
  structNote: 'Excepción importante: ought to conserva to. Las expresiones have to, need to y be able to no son modales centrales y sí se conjugan.',
  diffKicker: 'Matices que cambian el mensaje',
  diffTitle: 'Diferencias entre verbos modales que suelen confundirse',
  diffs: [
    { title: 'Can, could y be able to', body: 'Can expresa capacidad presente; could, capacidad general pasada o una opción; be able to permite otros tiempos.', example: 'I can swim · I could swim at five · I will be able to swim again.', cta: 'Ver capacidad' },
    { title: 'Can, could y may', body: 'Can es directo e informal; could suena más cortés; may es formal para pedir permiso. Las tres preguntas pueden ser correctas; cambia la relación y el tono.', example: 'Can I leave? · Could I leave? · May I leave?', cta: 'Ver permiso' },
    { title: 'May, might y could', body: 'Los tres expresan posibilidad. Might suele presentar más incertidumbre; could enfatiza una opción posible.', example: 'It may rain · It might rain · It could rain.', cta: 'Ver posibilidad' },
    { title: 'Must y have to', body: 'Must suele reflejar la exigencia del hablante o una regla fuerte. Have to señala una necesidad externa y se adapta mejor a pasado o futuro.', example: 'I must call her. · I have to wear a uniform.', cta: 'Ver obligación' },
    { title: 'Mustn\'t y don\'t have to', body: 'Mustn\'t significa “está prohibido”. Don\'t have to significa “no es necesario”.', example: 'You mustn\'t park here. · You don\'t have to come.', cta: 'Ver obligación' },
    { title: 'Should, ought to y had better', body: 'Should y ought to aconsejan. Had better añade urgencia o una consecuencia probable.', example: 'You should rest. · You\'d better leave now.', cta: 'Ver consejo' },
    { title: 'Will y would', body: 'Will mira al futuro o expresa voluntad; would crea distancia, cortesía, hábito pasado o una hipótesis.', example: 'Will you help me? · Would you help me?', cta: 'Ver lista' },
  ],
  pastTitle: 'Verbos modales en pasado y perfect modals',
  pastLead: 'Para comentar una posibilidad, deducción, crítica o alternativa sobre el pasado, se usa modal + have + past participle. La estructura no cambia con la persona.',
  pastFormulaTitle: 'Fórmula de los perfect modals',
  pastFormula: 'Sujeto + modal + have + participio',
  pastExamples: 'She might have forgotten · You should have called',
  perfects: [
    { title: 'must have', body: 'deducción muy probable' },
    { title: 'might/may have', body: 'posibilidad pasada' },
    { title: 'could have', body: 'posibilidad no realizada' },
    { title: 'should have', body: 'crítica o arrepentimiento' },
    { title: 'can\'t have', body: 'imposibilidad deducida' },
  ],
  examplesKicker: 'Inglés en contexto',
  examplesTitle: 'Ejemplos de verbos modales en inglés y español',
  examplesLead: 'Estas oraciones cubren capacidad, permiso, posibilidad, obligación, consejo, deducción, futuro, cortesía y pasado. El verbo principal permanece en forma base.',
  examples: [
    { en: 'I can finish this today.', es: 'Puedo terminar esto hoy.', tag: 'Can · capacidad' },
    { en: 'Can I sit here?', es: '¿Puedo sentarme aquí?', tag: 'Can · permiso' },
    { en: 'She could read at four.', es: 'Sabía leer a los cuatro años.', tag: 'Could · capacidad pasada' },
    { en: 'Could you speak more slowly?', es: '¿Podrías hablar más despacio?', tag: 'Could · petición cortés' },
    { en: 'You may leave now.', es: 'Puede retirarse ahora.', tag: 'May · permiso formal' },
    { en: 'The train may be late.', es: 'Puede que el tren llegue tarde.', tag: 'May · posibilidad' },
    { en: 'We might go out later.', es: 'Puede que salgamos luego.', tag: 'Might · posibilidad incierta' },
    { en: 'Visitors must wear a badge.', es: 'Los visitantes deben llevar identificación.', tag: 'Must · obligación' },
    { en: 'You must be tired.', es: 'Debes de estar cansado.', tag: 'Must · deducción' },
    { en: 'You mustn\'t touch that.', es: 'No debes tocar eso.', tag: 'Mustn\'t · prohibición' },
    { en: 'You should save your work.', es: 'Deberías guardar tu trabajo.', tag: 'Should · consejo' },
    { en: 'The bus should arrive soon.', es: 'El autobús debería llegar pronto.', tag: 'Should · expectativa' },
    { en: 'We ought to apologize.', es: 'Deberíamos disculparnos.', tag: 'Ought to · deber moral' },
    { en: 'I will send the file tonight.', es: 'Enviaré el archivo esta noche.', tag: 'Will · decisión' },
    { en: 'It will be sunny tomorrow.', es: 'Mañana hará sol.', tag: 'Will · predicción' },
    { en: 'Would you like some tea?', es: '¿Te apetece un té?', tag: 'Would · ofrecimiento' },
    { en: 'We would visit every summer.', es: 'Íbamos de visita cada verano.', tag: 'Would · hábito pasado' },
    { en: 'Shall we take a break?', es: '¿Hacemos una pausa?', tag: 'Shall · sugerencia' },
    { en: 'I could have called you.', es: 'Podría haberte llamado.', tag: 'Could have · posibilidad pasada' },
    { en: 'You should have told me.', es: 'Deberías habérmelo dicho.', tag: 'Should have · crítica pasada' },
    { en: 'He must have forgotten.', es: 'Debe de haberlo olvidado.', tag: 'Must have · deducción pasada' },
    { en: 'They might have missed the bus.', es: 'Puede que hayan perdido el autobús.', tag: 'Might have · posibilidad pasada' },
    { en: 'She can\'t have seen us.', es: 'No puede habernos visto.', tag: 'Can\'t have · imposibilidad pasada' },
    { en: 'You needn\'t have waited.', es: 'No era necesario que esperaras.', tag: 'Needn\'t have · acción innecesaria' },
  ],
  errorsKicker: 'Corrección inmediata',
  errorsTitle: 'Errores comunes al usar los modal verbs',
  errors: [
    { wrong: 'She cans drive.', right: 'She can drive.', why: 'El modal no añade -s en tercera persona.' },
    { wrong: 'I must to go.', right: 'I must go.', why: 'Después de must se usa el verbo base sin to.' },
    { wrong: 'Do you can help?', right: 'Can you help?', why: 'El modal ya actúa como auxiliar.' },
    { wrong: 'He doesn\'t should worry.', right: 'He shouldn\'t worry.', why: 'La negación se forma con modal + not.' },
    { wrong: 'I musted leave early.', right: 'I had to leave early.', why: 'Must no forma el pasado con -ed.' },
    { wrong: 'You don\'t have to smoke here.', right: 'You mustn\'t smoke here.', why: 'Para una prohibición se usa mustn\'t.' },
    { wrong: 'She can singing.', right: 'She can sing.', why: 'Después del modal va la forma base.' },
    { wrong: 'We should to study.', right: 'We should study.', why: 'Should no lleva to; ought to sí.' },
  ],
  quizKicker: 'Comprueba el matiz',
  quizTitle: 'Ejercicios de verbos modales con respuestas',
  quizLead: 'Completa cada frase con el modal verb que mejor encaja. La corrección explica la intención, para que no dependas de memorizar una traducción aislada.',
  quizCheck: 'Corregir ejercicios',
  quizPending: 'Resultado: pendiente',
  quizScore: 'Resultado: {score} / {total}',
  quizShow: 'Ver respuestas de los ejercicios',
  quizHide: 'Ocultar respuestas',
  quiz: [
    { q: 'You ___ wear a helmet. It is compulsory.', options: ['may', 'must', 'could'], answer: 1, why: 'Obligación fuerte: compulsory → must.' },
    { q: '___ you help me, please?', options: ['Could', 'Must', 'Shall'], answer: 0, why: 'Petición cortés: Could you…?' },
    { q: 'She ___ be at home; the lights are on.', options: ['must', 'should', 'would'], answer: 0, why: 'Deducción lógica con evidencia → must.' },
    { q: 'We ___ go to the beach, but we are not sure.', options: ['might', 'must', 'will'], answer: 0, why: 'Incertidumbre → might.' },
    { q: 'You ___ smoke here. It is prohibited.', options: ['don\'t have to', 'mustn\'t', 'might not'], answer: 1, why: 'Prohibición → mustn\'t.' },
    { q: 'You ___ bring food; we already have enough.', options: ['mustn\'t', 'don\'t have to', 'couldn\'t'], answer: 1, why: 'No es necesario → don\'t have to.' },
    { q: 'I ___ swim when I was five.', options: ['could', 'may', 'should'], answer: 0, why: 'Capacidad pasada → could.' },
    { q: 'You ___ have checked the address before leaving.', options: ['should', 'should have', 'must'], answer: 1, why: 'Crítica sobre el pasado → should have.' },
  ],
  faqKicker: 'Dudas frecuentes',
  faqTitle: 'Preguntas frecuentes sobre los verbos modales en inglés',
  faq: [
    { q: '¿Qué son los verbos modales en inglés?', a: 'Son auxiliares (can, could, may, might, must, should, will, would, shall, ought to) que cambian el matiz del verbo principal: capacidad, permiso, posibilidad, obligación, consejo o deducción.' },
    { q: '¿Cuáles son los verbos modales en inglés?', a: 'Los centrales son can, could, may, might, must, should, will, would y shall. Ought to se comporta como modal. Have to, need to, be able to y had better son semimodales.' },
    { q: '¿Cuál es la estructura de los modal verbs?', a: 'Afirmativa: sujeto + modal + verbo base. Negativa: sujeto + modal + not + verbo base. Interrogativa: modal + sujeto + verbo base.' },
    { q: '¿Los verbos modales llevan to?', a: 'No, salvo ought to. Dices I can swim, no I can to swim. Have to, need to y be able to sí llevan to porque no son modales centrales.' },
    { q: '¿Los verbos modales se conjugan?', a: 'No cambian con la persona: I can, she can. No añaden -s ni forman pasado con -ed. Para el pasado de must se usa had to.' },
    { q: '¿Qué diferencia hay entre mustn\'t y don\'t have to?', a: 'Mustn\'t es prohibición. Don\'t have to significa que no es necesario: puedes hacerlo, pero no es obligatorio.' },
    { q: '¿Qué diferencia hay entre may, might y could?', a: 'Los tres marcan posibilidad. Might suele ser más incierta; could enfatiza una opción; may puede ser también permiso formal.' },
    { q: '¿Cómo se usan los verbos modales en pasado?', a: 'Para capacidad pasada, could. Para comentar el pasado con crítica o deducción: modal + have + participio (should have, must have, might have).' },
    { q: '¿Cómo puedo aprender los verbos modales más rápido?', a: 'Elige primero la intención, practica frases reales y usa FluidLearn: test de nivel, ejercicios con IA, speaking y profesores conectados.' },
  ],
  moreKicker: 'Sigue aprendiendo',
  moreTitle: 'Más recursos sobre verbos modales y gramática inglesa',
  moreCta: 'Practica más',
  more: [
    { title: 'Gramática inglesa', text: 'Guía completa', to: '/gramatica' },
    { title: 'Método natural', text: 'Escuchar y hablar primero', to: '/metodo-natural' },
    { title: 'Consejos para aprender', text: 'Hábitos de estudio', to: '/consejos' },
    { title: 'Test de nivel', text: 'Descubre tu nivel', to: '/test' },
    { title: 'Niveles MCER', text: 'A1 a C2', to: '/niveles' },
    { title: 'Curso intensivo', text: 'Avanza más rápido', to: '/curso-intensivo' },
  ],
  closeLead: 'De reconocer un modal verb a usarlo con naturalidad. Practica la gramática en situaciones reales, recibe una ruta adaptada a tu nivel y convierte cada regla en una decisión comunicativa con FluidLearn.',
  testCta: 'Haz el test de nivel',
}

const en: ModalsCopy = {
  ...es,
  kicker: 'Practical English grammar guide',
  heroTitle: 'English modal verbs: list, uses, examples and exercises',
  heroLead:
    'Learn what English modal verbs are, how to choose between can, could, may, might, must, should, will and would, and how to build affirmative, negative and interrogative sentences without translating word by word.',
  startCta: 'Start for free',
  chooseCta: 'Choose your modal',
  heroNote: 'Do not memorize ten translations. Choose the intention first.',
  pickerTitle: 'What do you want to express?',
  pickerLead: 'Select an intention and see the most natural modal-verb family.',
  nav: [
    { id: 'que-son', label: 'What they are' },
    { id: 'usos', label: 'Uses' },
    { id: 'lista', label: 'List' },
    { id: 'estructura', label: 'Structure' },
    { id: 'diferencias', label: 'Differences' },
    { id: 'ejemplos', label: 'Examples' },
    { id: 'ejercicios', label: 'Exercises' },
    { id: 'preguntas', label: 'Questions' },
  ],
  conceptKicker: 'Essential idea',
  conceptTitle: 'What are English modal verbs and what are they for?',
  conceptLead: 'Modal verbs are auxiliaries that change the meaning of the main verb. They say not only what happens, but whether an action is possible, necessary, advisable, allowed, likely or hypothetical.',
  conceptBody: 'In I work you only state that you work. In I can work you express ability; I must work, obligation; I might work, possibility. The main verb stays the same; the intention changes.',
  ruleTitle: 'Basic rule of modal verbs',
  ruleFormula: 'Subject + modal verb + base verb',
  rules: [
    'No -s in the third person: she can, not she cans.',
    'They do not use do/does/did to ask or negate.',
    'They go before the main verb and change its nuance.',
    'They take a bare infinitive, except ought to and semi-modals.',
    'They are invariable with every subject.',
  ],
  mapKicker: 'Map by intention',
  mapTitle: 'Uses of modal verbs: choose according to what you want to say',
  mapLead: 'The same Spanish translation can match several modals. Decide first if you mean ability, permission, possibility, obligation, advice or deduction.',
  intents: es.intents.map((item, i) =>
    [
      { ...item, label: 'Ability', title: 'Ability with modal verbs', body: 'Talk about what someone can do now, could do before or will be able to do.' },
      { ...item, label: 'Permission', title: 'Permission with modal verbs', body: 'Ask for or give authorization. The choice changes formality and politeness.' },
      { ...item, label: 'Possibility', title: 'Possibility with modal verbs', body: 'Present a situation as possible without saying it will definitely happen.' },
      { ...item, label: 'Obligation', title: 'Obligation with modal verbs', body: 'Mark a rule, a strong need or an external requirement.' },
      { ...item, label: 'Advice', title: 'Advice with modal verbs', body: 'Recommend an action without turning it into a full obligation.' },
      { ...item, label: 'Deduction', title: 'Deduction with modal verbs', body: 'Express how certain you are based on the information you have.' },
    ][i],
  ),
  stepsTitle: 'How to choose the right modal in four steps',
  steps: [
    { title: 'Identify the intention', body: 'Ask what changes in the message: ability, permission, probability, a rule, advice or certainty? Do not start by translating “can” or “must”.', note: 'I want to ask permission → can, could or may' },
    { title: 'Place it in time', body: 'Check if it is now, in the past or about the future. Modals have limited forms and sometimes need an alternative.', note: 'Future ability → will be able to' },
    { title: 'Adjust force and certainty', body: 'Must, should and might do not have the same intensity. Decide if you impose an obligation, give advice or only admit a possibility.', note: 'must → obligation · should → advice' },
    { title: 'Choose the politeness level', body: 'Can is everyday; could is more polite; may is more formal. The relationship between speakers matters as much as the grammar.', note: 'Could you help me? → polite request' },
  ],
  listKicker: 'Quick reference',
  listTitle: 'List of English modal verbs and their meaning',
  listLead: 'This table gathers the main modal auxiliary verbs, their uses, tone and a translated example. Use it as a map; context decides the final meaning.',
  tableHeaders: ['Modal verb', 'Main uses', 'Tone', 'Example in English and Spanish'],
  semiTitle: 'Semi-modals and frequent alternatives',
  guideKicker: 'One by one',
  guideTitle: 'Modal verbs one by one: can, could, may, might, must, should, will and would',
  guideLead: 'Learn the core job of each modal. In FluidLearn you will practise these nuances with exercises, AI and connected teachers.',
  guideCta: 'See it in the list',
  structKicker: 'Form',
  structTitle: 'Modal verb structure: affirmative, negative and interrogative',
  structLead: 'Modals already work as auxiliaries. They do not need do, does or did, and they go before the subject in questions.',
  structures: [
    { title: 'Affirmative', formula: 'Subject + modal + base verb', example: 'She can speak English.', exampleEs: 'She can speak English.' },
    { title: 'Negative', formula: 'Subject + modal + not + base verb', example: 'She cannot come today.', exampleEs: 'She cannot come today.' },
    { title: 'Interrogative', formula: 'Modal + subject + base verb?', example: 'Can she come today?', exampleEs: 'Can she come today?' },
  ],
  structNote: 'Important exception: ought to keeps to. Have to, need to and be able to are not core modals and they do conjugate.',
  diffKicker: 'Nuances that change the message',
  diffTitle: 'Differences between modal verbs that often get mixed up',
  pastTitle: 'Modal verbs in the past and perfect modals',
  pastLead: 'To comment on a past possibility, deduction, criticism or alternative, use modal + have + past participle. The structure does not change with the person.',
  pastFormulaTitle: 'Perfect-modal formula',
  examplesKicker: 'English in context',
  examplesTitle: 'Modal verb examples in English and Spanish',
  examplesLead: 'These sentences cover ability, permission, possibility, obligation, advice, deduction, future, politeness and the past. The main verb stays in base form.',
  errorsKicker: 'Immediate correction',
  errorsTitle: 'Common mistakes with modal verbs',
  quizKicker: 'Check the nuance',
  quizTitle: 'Modal verb exercises with answers',
  quizLead: 'Complete each sentence with the modal that fits best. The correction explains the intention so you do not rely on a single translation.',
  quizCheck: 'Check exercises',
  quizPending: 'Result: pending',
  quizScore: 'Result: {score} / {total}',
  quizShow: 'Show exercise answers',
  quizHide: 'Hide answers',
  faqKicker: 'Common questions',
  faqTitle: 'FAQ about English modal verbs',
  faq: [
    { q: 'What are English modal verbs?', a: 'They are auxiliaries (can, could, may, might, must, should, will, would, shall, ought to) that change the nuance of the main verb.' },
    { q: 'Which are the English modal verbs?', a: 'The core ones are can, could, may, might, must, should, will, would and shall. Ought to behaves like a modal. Have to, need to, be able to and had better are semi-modals.' },
    { q: 'What is the structure of modal verbs?', a: 'Affirmative: subject + modal + base verb. Negative: subject + modal + not + base verb. Questions: modal + subject + base verb.' },
    { q: 'Do modal verbs take to?', a: 'No, except ought to. You say I can swim, not I can to swim.' },
    { q: 'Do modal verbs conjugate?', a: 'They do not change with the person: I can, she can. They do not add -s or form a past with -ed. For the past of must, use had to.' },
    { q: 'What is the difference between mustn\'t and don\'t have to?', a: 'Mustn\'t is prohibition. Don\'t have to means it is not necessary.' },
    { q: 'What is the difference between may, might and could?', a: 'All three mark possibility. Might is often more uncertain; could stresses an option; may can also be formal permission.' },
    { q: 'How are modal verbs used in the past?', a: 'For past ability, could. To comment on the past: modal + have + participle (should have, must have, might have).' },
    { q: 'How can I learn modal verbs faster?', a: 'Choose the intention first, practise real sentences and use FluidLearn: level test, AI exercises, speaking and connected teachers.' },
  ],
  moreKicker: 'Keep learning',
  moreTitle: 'More resources on modal verbs and English grammar',
  moreCta: 'Practise more',
  more: [
    { title: 'English grammar', text: 'Full guide', to: '/gramatica' },
    { title: 'Natural method', text: 'Listen and speak first', to: '/metodo-natural' },
    { title: 'Learning tips', text: 'Study habits', to: '/consejos' },
    { title: 'Level test', text: 'Find your level', to: '/test' },
    { title: 'CEFR levels', text: 'A1 to C2', to: '/niveles' },
    { title: 'Intensive course', text: 'Move faster', to: '/curso-intensivo' },
  ],
  closeLead: 'Go from recognizing a modal verb to using it naturally. Practise grammar in real situations, get a path adapted to your level and turn every rule into a communication choice with FluidLearn.',
  testCta: 'Take the level test',
}

export function getModalsCopy(lang: LandingLangCode): ModalsCopy {
  return lang === 'es' ? es : en
}

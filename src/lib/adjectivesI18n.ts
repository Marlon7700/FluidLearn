import type { LandingLangCode } from './landingI18n'

export type AdjWord = { en: string; es: string; cat: string }

export type AdjectivesCopy = {
  kicker: string
  heroTitle: string
  heroLead: string
  startCta: string
  heroTestCta: string
  listCta: string
  heroNote: string
  sceneKicker: string
  sceneLead: string
  sceneNoun: string
  sceneNounEs: string
  sceneResult: string
  sceneResultEs: string
  chips: string[]
  nav: { id: string; label: string }[]
  whatKicker: string
  whatTitle: string
  whatLead: string
  attrTitle: string
  attrItems: { en: string; es: string }[]
  predTitle: string
  predItems: { en: string; es: string }[]
  invTitle: string
  invItems: string[]
  invNote: string
  posKicker: string
  posTitle: string
  posLead: string
  beforeTitle: string
  beforeItems: { en: string; es: string }[]
  afterTitle: string
  afterLead: string
  afterItems: { en: string; es: string }[]
  careTitle: string
  careLead: string
  careItems: string[]
  careNote: string
  orderKicker: string
  orderTitle: string
  orderLead: string
  osascomp: { letter: string; title: string; example: string }[]
  orderPhrase: string
  orderPhraseEs: string
  orderQ: string
  orderA: string
  commasTitle: string
  commasBody: string
  opinionTitle: string
  opinionBody: string
  typesKicker: string
  typesTitle: string
  typesLead: string
  types: { title: string; body: string; example: string }[]
  typesNote: string
  edKicker: string
  edTitle: string
  edLead: string
  edColTitle: string
  edItems: { en: string; es: string }[]
  edNote: string
  ingColTitle: string
  ingItems: { en: string; es: string }[]
  ingNote: string
  edTip: string
  degTitle: string
  degLead: string
  degHeaders: string[]
  degRows: string[][]
  degNote: string
  listKicker: string
  listTitle: string
  listLead: string
  searchLabel: string
  searchPh: string
  allFilter: string
  filters: { id: string; label: string }[]
  listHeaders: string[]
  words: AdjWord[]
  exTitle: string
  exLead: string
  examples: { tag: string; en: string; es: string }[]
  errorsTitle: string
  errorsLead: string
  errorHeaders: string[]
  errors: { issue: string; wrong: string; right: string; why: string }[]
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
  pdfTitle: string
  pdfLead: string
  pdfNote: string
  pdfCta: string
  moreKicker: string
  moreTitle: string
  moreLead: string
  more: { tag: string; title: string; to: string }[]
  faqKicker: string
  faqTitle: string
  faq: { q: string; a: string }[]
  closeLead: string
  closeBody: string
  testCta: string
}

const words: AdjWord[] = [
  { en: 'amazing', es: 'increíble', cat: 'quality' },
  { en: 'awful', es: 'horrible', cat: 'quality' },
  { en: 'beautiful', es: 'bonito/a', cat: 'quality' },
  { en: 'boring', es: 'aburrido/a', cat: 'quality' },
  { en: 'brilliant', es: 'brillante', cat: 'quality' },
  { en: 'clean', es: 'limpio/a', cat: 'quality' },
  { en: 'comfortable', es: 'cómodo/a', cat: 'quality' },
  { en: 'dangerous', es: 'peligroso/a', cat: 'quality' },
  { en: 'difficult', es: 'difícil', cat: 'quality' },
  { en: 'easy', es: 'fácil', cat: 'quality' },
  { en: 'excellent', es: 'excelente', cat: 'quality' },
  { en: 'famous', es: 'famoso/a', cat: 'quality' },
  { en: 'friendly', es: 'amable', cat: 'quality' },
  { en: 'important', es: 'importante', cat: 'quality' },
  { en: 'interesting', es: 'interesante', cat: 'quality' },
  { en: 'modern', es: 'moderno/a', cat: 'quality' },
  { en: 'perfect', es: 'perfecto/a', cat: 'quality' },
  { en: 'popular', es: 'popular', cat: 'quality' },
  { en: 'safe', es: 'seguro/a', cat: 'quality' },
  { en: 'useful', es: 'útil', cat: 'quality' },
  { en: 'big', es: 'grande', cat: 'size' },
  { en: 'deep', es: 'profundo/a', cat: 'size' },
  { en: 'high', es: 'alto/a', cat: 'size' },
  { en: 'huge', es: 'enorme', cat: 'size' },
  { en: 'large', es: 'grande', cat: 'size' },
  { en: 'little', es: 'pequeño/a', cat: 'size' },
  { en: 'long', es: 'largo/a', cat: 'size' },
  { en: 'narrow', es: 'estrecho/a', cat: 'size' },
  { en: 'short', es: 'corto/a', cat: 'size' },
  { en: 'small', es: 'pequeño/a', cat: 'size' },
  { en: 'tall', es: 'alto/a', cat: 'size' },
  { en: 'thick', es: 'grueso/a', cat: 'size' },
  { en: 'thin', es: 'fino/a', cat: 'size' },
  { en: 'tiny', es: 'diminuto/a', cat: 'size' },
  { en: 'wide', es: 'ancho/a', cat: 'size' },
  { en: 'ancient', es: 'antiguo/a', cat: 'age' },
  { en: 'new', es: 'nuevo/a', cat: 'age' },
  { en: 'old', es: 'viejo/a', cat: 'age' },
  { en: 'young', es: 'joven', cat: 'age' },
  { en: 'early', es: 'temprano/a', cat: 'age' },
  { en: 'late', es: 'tardío/a', cat: 'age' },
  { en: 'recent', es: 'reciente', cat: 'age' },
  { en: 'circular', es: 'circular', cat: 'shape' },
  { en: 'curved', es: 'curvo/a', cat: 'shape' },
  { en: 'flat', es: 'plano/a', cat: 'shape' },
  { en: 'oval', es: 'ovalado/a', cat: 'shape' },
  { en: 'rectangular', es: 'rectangular', cat: 'shape' },
  { en: 'round', es: 'redondo/a', cat: 'shape' },
  { en: 'square', es: 'cuadrado/a', cat: 'shape' },
  { en: 'straight', es: 'recto/a', cat: 'shape' },
  { en: 'black', es: 'negro/a', cat: 'color' },
  { en: 'blue', es: 'azul', cat: 'color' },
  { en: 'brown', es: 'marrón', cat: 'color' },
  { en: 'dark', es: 'oscuro/a', cat: 'color' },
  { en: 'golden', es: 'dorado/a', cat: 'color' },
  { en: 'green', es: 'verde', cat: 'color' },
  { en: 'grey', es: 'gris', cat: 'color' },
  { en: 'light', es: 'claro/a', cat: 'color' },
  { en: 'orange', es: 'naranja', cat: 'color' },
  { en: 'pink', es: 'rosa', cat: 'color' },
  { en: 'purple', es: 'morado/a', cat: 'color' },
  { en: 'red', es: 'rojo/a', cat: 'color' },
  { en: 'white', es: 'blanco/a', cat: 'color' },
  { en: 'yellow', es: 'amarillo/a', cat: 'color' },
  { en: 'American', es: 'estadounidense', cat: 'origin' },
  { en: 'British', es: 'británico/a', cat: 'origin' },
  { en: 'Chinese', es: 'chino/a', cat: 'origin' },
  { en: 'French', es: 'francés/francesa', cat: 'origin' },
  { en: 'Italian', es: 'italiano/a', cat: 'origin' },
  { en: 'Japanese', es: 'japonés/japonesa', cat: 'origin' },
  { en: 'Spanish', es: 'español/a', cat: 'origin' },
  { en: 'cotton', es: 'de algodón', cat: 'material' },
  { en: 'glass', es: 'de vidrio', cat: 'material' },
  { en: 'leather', es: 'de cuero', cat: 'material' },
  { en: 'metal', es: 'metálico/a', cat: 'material' },
  { en: 'plastic', es: 'de plástico', cat: 'material' },
  { en: 'silk', es: 'de seda', cat: 'material' },
  { en: 'silver', es: 'de plata', cat: 'material' },
  { en: 'wooden', es: 'de madera', cat: 'material' },
  { en: 'woollen', es: 'de lana', cat: 'material' },
  { en: 'cooking', es: 'de cocina', cat: 'purpose' },
  { en: 'dining', es: 'de comedor', cat: 'purpose' },
  { en: 'running', es: 'para correr', cat: 'purpose' },
  { en: 'sleeping', es: 'para dormir', cat: 'purpose' },
  { en: 'sports', es: 'deportivo/a', cat: 'purpose' },
  { en: 'travel', es: 'de viaje', cat: 'purpose' },
  { en: 'walking', es: 'para caminar', cat: 'purpose' },
  { en: 'writing', es: 'de escritura', cat: 'purpose' },
  { en: 'angry', es: 'enfadado/a', cat: 'feeling' },
  { en: 'calm', es: 'tranquilo/a', cat: 'feeling' },
  { en: 'confident', es: 'seguro/a de sí', cat: 'feeling' },
  { en: 'curious', es: 'curioso/a', cat: 'feeling' },
  { en: 'excited', es: 'emocionado/a', cat: 'feeling' },
  { en: 'happy', es: 'feliz', cat: 'feeling' },
  { en: 'nervous', es: 'nervioso/a', cat: 'feeling' },
  { en: 'proud', es: 'orgulloso/a', cat: 'feeling' },
  { en: 'sad', es: 'triste', cat: 'feeling' },
  { en: 'surprised', es: 'sorprendido/a', cat: 'feeling' },
  { en: 'tired', es: 'cansado/a', cat: 'feeling' },
  { en: 'worried', es: 'preocupado/a', cat: 'feeling' },
  { en: 'careful', es: 'cuidadoso/a', cat: 'personality' },
  { en: 'creative', es: 'creativo/a', cat: 'personality' },
  { en: 'generous', es: 'generoso/a', cat: 'personality' },
  { en: 'honest', es: 'honesto/a', cat: 'personality' },
  { en: 'patient', es: 'paciente', cat: 'personality' },
  { en: 'polite', es: 'educado/a', cat: 'personality' },
  { en: 'reliable', es: 'fiable', cat: 'personality' },
  { en: 'shy', es: 'tímido/a', cat: 'personality' },
  { en: 'smart', es: 'inteligente', cat: 'personality' },
  { en: 'stubborn', es: 'terco/a', cat: 'personality' },
]

const es: AdjectivesCopy = {
  kicker: 'Guía visual de gramática y vocabulario',
  heroTitle: 'Adjetivos en inglés: tipos, orden, lista y ejercicios',
  heroLead:
    'Aprende a elegir, colocar y ordenar los adjetivos en inglés para describir personas, objetos, lugares y emociones con precisión, no como una lista de palabras aisladas.',
  startCta: 'Empieza gratis',
  heroTestCta: 'Empieza el test',
  listCta: 'Explora la lista de 100+',
  heroNote: 'Mira una escena. Hazla más precisa.',
  sceneKicker: 'Un sustantivo nombra. Un adjetivo hace que puedas verlo.',
  sceneLead: 'Elige un rasgo y observa cómo cambia la imagen.',
  sceneNoun: 'a room',
  sceneNounEs: 'una habitación',
  sceneResult: 'a bright room',
  sceneResultEs: 'una habitación luminosa',
  chips: ['bright', 'curious', 'focused', 'friendly'],
  nav: [
    { id: 'que-son', label: 'Qué son' },
    { id: 'posicion', label: 'Posición' },
    { id: 'orden', label: 'Orden' },
    { id: 'tipos', label: 'Tipos' },
    { id: 'ed-ing', label: '-ed / -ing' },
    { id: 'lista', label: 'Lista 100+' },
    { id: 'ejercicios', label: 'Ejercicios' },
    { id: 'recursos', label: 'Recursos' },
    { id: 'preguntas', label: 'Preguntas' },
  ],
  whatKicker: 'Concepto esencial',
  whatTitle: '¿Qué son los adjetivos en inglés y cómo se usan?',
  whatLead:
    'Los adjetivos en inglés son palabras que describen cualidades, estados o rasgos de un sustantivo: tamaño, color, edad, origen, material, opinión o personalidad. En a small house, small concreta qué tipo de casa imaginamos; en the house is small, comunica la misma cualidad después del verbo.',
  attrTitle: 'Adjetivo atributivo',
  attrItems: [
    { en: 'a quiet street', es: 'una calle tranquila' },
    { en: 'two quiet streets', es: 'dos calles tranquilas' },
  ],
  predTitle: 'Adjetivo predicativo',
  predItems: [
    { en: 'The street is quiet.', es: 'La calle está tranquila.' },
    { en: 'It seems quiet.', es: 'Parece tranquila.' },
  ],
  invTitle: 'Una forma invariable',
  invItems: ['a happy boy / a happy girl', 'one happy child / three happy children'],
  invNote:
    'La diferencia esencial con el español: en inglés el adjetivo no concuerda con el sustantivo. No añadas una terminación de plural y no cambies su forma para masculino o femenino.',
  posKicker: 'Colocación',
  posTitle: 'Posición de los adjetivos en inglés: antes del nombre o después del verbo',
  posLead: 'La regla “el adjetivo siempre va antes” es incompleta. La posición depende de la función que cumple en la oración.',
  beforeTitle: 'Antes de un sustantivo',
  beforeItems: [
    { en: 'an interesting book', es: 'un libro interesante' },
    { en: 'a red jacket', es: 'una chaqueta roja' },
    { en: 'reliable colleagues', es: 'compañeros fiables' },
  ],
  afterTitle: 'Después de verbos copulativos',
  afterLead: 'Se usa después de be, seem, become, look, feel, sound, smell o taste.',
  afterItems: [
    { en: 'The soup smells delicious.', es: 'La sopa huele deliciosa.' },
    { en: 'You look tired.', es: 'Pareces cansado.' },
    { en: 'Her idea sounds useful.', es: 'Su idea suena útil.' },
  ],
  careTitle: 'Casos que exigen atención',
  careLead: 'Algunos adjetivos, como afraid, asleep, alive y alone, aparecen normalmente después del verbo.',
  careItems: ['The child is asleep.', 'No es habitual: an asleep child.', 'Alternativa: a sleeping child.'],
  careNote:
    'Después de palabras indefinidas como something, anything, nothing o someone, el adjetivo va detrás: something useful, nothing serious, someone special. Esta estructura es frecuente en conversaciones cotidianas.',
  orderKicker: 'OSASCOMP',
  orderTitle: 'Orden de los adjetivos en inglés: la pauta OSASCOMP',
  orderLead:
    'Cuando varios adjetivos describen el mismo sustantivo, el inglés tiende a ordenarlos por opinión, tamaño, edad, forma, color, origen, material y propósito. La sigla OSASCOMP ayuda a recordarlo.',
  osascomp: [
    { letter: 'O', title: 'Opinión', example: 'beautiful' },
    { letter: 'S', title: 'Tamaño', example: 'small' },
    { letter: 'A', title: 'Edad', example: 'old' },
    { letter: 'S', title: 'Forma', example: 'round' },
    { letter: 'C', title: 'Color', example: 'red' },
    { letter: 'O', title: 'Origen', example: 'Italian' },
    { letter: 'M', title: 'Material', example: 'wooden' },
    { letter: 'P', title: 'Propósito', example: 'dining' },
  ],
  orderPhrase: 'a beautiful small old round red Italian wooden dining table',
  orderPhraseEs: 'una bonita mesa de comedor italiana, de madera, roja, redonda, antigua y pequeña',
  orderQ: '¿Hay que usar ocho adjetivos?',
  orderA: 'No. La secuencia demuestra el orden, pero la comunicación natural suele usar uno, dos o tres. Elige solo los rasgos que aportan información.',
  commasTitle: 'Comas entre adjetivos',
  commasBody: 'Los adjetivos coordinados aceptan and y pueden llevar coma: a calm, friendly teacher. No se separan las categorías acumulativas: a small wooden box.',
  opinionTitle: 'Opinión general y específica',
  opinionBody: 'Una opinión general suele preceder a otra más específica: a lovely comfortable chair. El uso real y el ritmo también influyen.',
  typesKicker: 'Clasificación',
  typesTitle: 'Tipos de adjetivos en inglés con ejemplos',
  typesLead: 'Clasificar los adjetivos ayuda a comprender su función y a construir vocabulario por relaciones semánticas.',
  types: [
    { title: 'Adjetivos calificativos', body: 'Expresan una cualidad: kind, difficult, blue, tall.', example: 'She is a kind person.' },
    { title: 'Adjetivos cuantitativos', body: 'Indican cantidad aproximada: some, much, little, enough.', example: 'We have enough time.' },
    { title: 'Adjetivos numerales', body: 'Marcan número u orden: two, ten, first, third.', example: 'This is my second attempt.' },
    { title: 'Adjetivos demostrativos', body: 'Señalan distancia y número: this, that, these, those.', example: 'Those shoes are new.' },
    { title: 'Adjetivos posesivos', body: 'Relacionan el nombre con quien posee: my, your, his, her, its, our, their.', example: 'Their project is ready.' },
    { title: 'Adjetivos interrogativos', body: 'Introducen preguntas delante de un nombre: which, what, whose.', example: 'Which colour do you prefer?' },
  ],
  typesNote:
    'También encontrarás adjetivos propios (Spanish, Victorian), compuestos (well-known, five-minute) y participios usados como adjetivos (broken, smiling, exciting).',
  edKicker: 'Matiz',
  edTitle: 'Adjetivos terminados en -ed y -ing: diferencia de significado',
  edLead: 'Los pares bored/boring, interested/interesting o tired/tiring no son intercambiables. Uno describe la experiencia; el otro, su causa.',
  edColTitle: 'Terminación -ed: cómo se siente alguien',
  edItems: [
    { en: 'I am bored.', es: 'Estoy aburrido.' },
    { en: 'They were surprised by the result.', es: 'El resultado los sorprendió.' },
  ],
  edNote: 'La persona o ser animado recibe el efecto. Algunos participios también describen estados de cosas: a damaged phone.',
  ingColTitle: 'Terminación -ing: qué provoca la sensación',
  ingItems: [
    { en: 'The film is boring.', es: 'La película es aburrida.' },
    { en: 'The result was surprising.', es: 'El resultado fue sorprendente.' },
  ],
  ingNote: 'La persona, cosa o situación produce el efecto: an exhausting day, an exciting match.',
  edTip: 'Prueba rápida: si puedes preguntar “¿cómo se siente?”, suele encajar -ed. Si preguntas “¿qué provoca esa sensación?”, suele encajar -ing.',
  degTitle: 'Comparativos y superlativos de los adjetivos en inglés',
  degLead: 'Los grados del adjetivo permiten comparar. La forma depende de la longitud de la palabra, su terminación y si es regular o irregular.',
  degHeaders: ['Tipo', 'Adjetivo', 'Comparativo', 'Superlativo', 'Ejemplo'],
  degRows: [
    ['Corto', 'small', 'smaller', 'the smallest', 'This room is smaller.'],
    ['CVC', 'big', 'bigger', 'the biggest', 'It is the biggest city.'],
    ['Terminado en -y', 'happy', 'happier', 'the happiest', 'She feels happier.'],
    ['Largo', 'interesting', 'more interesting', 'the most interesting', 'This is the most interesting chapter.'],
    ['Irregular', 'good', 'better', 'the best', 'Your second answer is better.'],
    ['Irregular', 'bad', 'worse', 'the worst', 'That was the worst option.'],
  ],
  degNote: 'Practica estos patrones en FluidLearn con ejercicios, IA y profesores conectados: no memorices la tabla, úsala como mapa.',
  listKicker: 'Vocabulario',
  listTitle: 'Lista de más de 100 adjetivos en inglés y español',
  listLead: 'Busca por palabra o filtra la lista por significado. Todas las entradas permanecen en la página para que puedas estudiar sin perder el contexto.',
  searchLabel: 'Buscar un adjetivo',
  searchPh: 'Busca: happy, rojo, material...',
  allFilter: 'Todos',
  filters: [
    { id: 'all', label: 'Todos' },
    { id: 'quality', label: 'Cualidad' },
    { id: 'size', label: 'Tamaño' },
    { id: 'color', label: 'Color' },
    { id: 'feeling', label: 'Emoción' },
    { id: 'personality', label: 'Personalidad' },
    { id: 'age', label: 'Edad' },
    { id: 'shape', label: 'Forma' },
    { id: 'origin', label: 'Origen' },
    { id: 'material', label: 'Material' },
    { id: 'purpose', label: 'Propósito' },
  ],
  listHeaders: ['Adjetivo', 'Traducción', 'Categoría'],
  words,
  exTitle: 'Ejemplos de adjetivos en inglés en oraciones reales',
  exLead: 'Observa la posición, el matiz y la traducción. Después cambia un elemento para crear una oración propia.',
  examples: [
    { tag: 'Descripción personal', en: 'My new colleague is patient and reliable.', es: 'Mi nueva compañera es paciente y fiable.' },
    { tag: 'Objeto y material', en: 'They bought a beautiful old wooden table.', es: 'Compraron una bonita mesa antigua de madera.' },
    { tag: 'Percepción', en: 'This coffee tastes surprisingly sweet.', es: 'Este café sabe sorprendentemente dulce.' },
    { tag: 'Algo indefinido', en: 'We need something simple and useful.', es: 'Necesitamos algo sencillo y útil.' },
    { tag: 'Emoción y causa', en: 'I felt excited because the project was inspiring.', es: 'Me sentí emocionado porque el proyecto era inspirador.' },
    { tag: 'Comparación', en: 'The blue route is shorter but more difficult.', es: 'La ruta azul es más corta, pero más difícil.' },
  ],
  errorsTitle: 'Errores comunes al usar adjetivos en inglés',
  errorsLead: 'Estas correcciones atacan interferencias frecuentes del español y mejoran la naturalidad de inmediato.',
  errorHeaders: ['Error', 'Evitar', 'Correcto', 'Razón'],
  errors: [
    { issue: 'Pluralizar el adjetivo', wrong: 'two reds cars', right: 'two red cars', why: 'El adjetivo es invariable.' },
    { issue: 'Colocarlo detrás del nombre', wrong: 'a car red', right: 'a red car', why: 'El adjetivo atributivo suele ir delante.' },
    { issue: 'Olvidar el verbo', wrong: 'She very happy.', right: 'She is very happy.', why: 'El predicado necesita un verbo.' },
    { issue: 'Confundir -ed y -ing', wrong: 'I am boring.', right: 'I am bored.', why: 'La persona siente aburrimiento.' },
    { issue: 'Orden poco natural', wrong: 'a wooden old chair', right: 'an old wooden chair', why: 'Edad suele preceder a material.' },
    { issue: 'Usar very con comparativo', wrong: 'very better', right: 'much better', why: 'Los comparativos se intensifican con much, far o a lot.' },
    { issue: 'Duplicar la comparación', wrong: 'more easier', right: 'easier', why: 'No combines more con -er.' },
  ],
  quizKicker: 'Comprueba el matiz',
  quizTitle: 'Ejercicios de adjetivos en inglés con respuestas',
  quizLead: 'Resuelve cada actividad. Explicar por qué eliges una forma consolida mejor la regla que acertar por intuición.',
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
    { q: 'Elige la posición correcta del adjetivo.', options: ['a street quiet', 'a quiet street', 'quiet a street'], answer: 1, why: 'El adjetivo atributivo va delante del sustantivo.' },
    { q: '¿Cuál es el orden más natural?', options: ['a wooden old chair', 'an old wooden chair', 'a chair old wooden'], answer: 1, why: 'Edad (old) precede a material (wooden).' },
    { q: 'Completa: I am ___ because the film is ___.', options: ['boring / bored', 'bored / boring', 'bored / bored'], answer: 1, why: '-ed = cómo te sientes; -ing = qué provoca la sensación.' },
    { q: 'Corrige el error de plural.', options: ['two reds cars', 'two red cars', 'two car red'], answer: 1, why: 'El adjetivo no se pluraliza.' },
    { q: 'They bought a ___ table.', options: ['wooden beautiful old', 'beautiful old wooden', 'old wooden beautiful'], answer: 1, why: 'OSASCOMP: opinión + edad + material.' },
    { q: 'Elige la predicativa correcta.', options: ['Quiet the street.', 'The street is quiet.', 'The quiet is street.'], answer: 1, why: 'Después de be el adjetivo va al final: The street is quiet.' },
    { q: 'Después de something, el adjetivo va…', options: ['something useful', 'useful something', 'something usefuls'], answer: 0, why: 'Tras indefinidos el adjetivo va detrás.' },
    { q: 'afraid / asleep suelen ir…', options: ['an asleep child', 'The child is asleep.', 'asleep the child'], answer: 1, why: 'Estos adjetivos aparecen normalmente después del verbo.' },
    { q: '¿Cuál es invariable?', options: ['three happies children', 'three happy children', 'three happy childs adjective'], answer: 1, why: 'happy no cambia en plural ni por género.' },
    { q: 'Comparativo de small:', options: ['more small', 'smaller', 'the more small'], answer: 1, why: 'Adjetivos cortos: -er.' },
    { q: 'good en comparativo es…', options: ['gooder', 'more good', 'better'], answer: 2, why: 'Irregular: good → better → the best.' },
    { q: 'Intensifica un comparativo con…', options: ['very better', 'much better', 'more better'], answer: 1, why: 'Se usa much/far/a lot, no very.' },
    { q: 'Corrige la doble comparación.', options: ['more easier', 'easier', 'most easier'], answer: 1, why: 'No combines more con -er.' },
    { q: 'The lesson is ___. I am ___.', options: ['interesting / interested', 'interested / interesting', 'interesting / interesting'], answer: 0, why: '-ing causa el efecto; -ed es cómo te sientes.' },
    { q: 'Elige la forma atributiva.', options: ['a jacket red', 'red a jacket', 'a red jacket'], answer: 2, why: 'El adjetivo va delante: a red jacket.' },
  ],
  pdfTitle: 'Lista de los 100 adjetivos más usados en inglés',
  pdfLead:
    'Usa esta lista junto con los filtros y ejemplos de la guía: primero recuerda la palabra, después comprueba la traducción y finalmente crea una frase personal en FluidLearn.',
  pdfNote: 'La memoria mejora cuando recuperas el término y lo usas en contexto, no cuando solo lo lees.',
  pdfCta: 'Practica en FluidLearn',
  moreKicker: 'Sigue aprendiendo',
  moreTitle: 'Gramática y vocabulario relacionados con los adjetivos en inglés',
  moreLead: 'Conecta esta lección con gramática, verbos modales, niveles y práctica. Los enlaces forman una ruta de FluidLearn, no una lista aleatoria.',
  more: [
    { tag: 'Base', title: 'Gramática inglesa', to: '/gramatica' },
    { tag: 'Verbos', title: 'Verbos modales', to: '/verbos-modales' },
    { tag: 'Adverbios', title: 'Adverbios en inglés', to: '/adverbios' },
    { tag: 'Pronombres', title: 'Pronombres en inglés', to: '/pronombres' },
    { tag: 'Método', title: 'Método natural', to: '/metodo-natural' },
    { tag: 'Hábitos', title: 'Consejos para aprender', to: '/consejos' },
    { tag: 'Nivel', title: 'Niveles MCER', to: '/niveles' },
    { tag: 'Práctica', title: 'Test de nivel', to: '/test' },
    { tag: 'Ritmo', title: 'Curso intensivo', to: '/curso-intensivo' },
    { tag: 'Adultos', title: 'Inglés para adultos', to: '/ingles-adultos' },
    { tag: 'Cómo', title: 'Cómo funciona', to: '/como-funciona' },
  ],
  faqKicker: 'Dudas frecuentes',
  faqTitle: 'Preguntas frecuentes sobre los adjetivos en inglés',
  faq: [
    { q: '¿Qué es un adjetivo en inglés?', a: 'Es una palabra que describe un sustantivo: tamaño, color, edad, origen, material, opinión o personalidad. En a small house, small concreta la casa.' },
    { q: '¿Dónde se colocan los adjetivos en inglés?', a: 'Delante del nombre cuando lo modifican (a red jacket) y después de verbos como be, seem, look o feel (You look tired). Tras something/anyone van detrás: something useful.' },
    { q: '¿Los adjetivos ingleses cambian en plural o según el género?', a: 'No. happy sirve para boy, girl, one child y three children. No añadas -s al adjetivo.' },
    { q: '¿Cuál es el orden de varios adjetivos en inglés?', a: 'OSASCOMP: opinión, tamaño, edad, forma, color, origen, material y propósito. En la práctica usa dos o tres rasgos.' },
    { q: '¿Qué diferencia hay entre bored y boring?', a: 'Bored describe cómo se siente alguien. Boring describe lo que provoca esa sensación: I am bored / The film is boring.' },
    { q: '¿Cómo se forman comparativos y superlativos?', a: 'Cortos: -er / the -est. Largos: more / the most. Irregulares: good → better → the best.' },
    { q: '¿Cómo puedo memorizar 100 adjetivos en inglés?', a: 'Filtra por categoría, crea una imagen y una frase propia, y practica en FluidLearn con test, IA y profesores conectados.' },
  ],
  closeLead: 'Describe lo que ves. Expresa exactamente lo que quieres decir.',
  closeBody: 'Convierte cada palabra nueva en una imagen, una comparación y una frase propia. Así los adjetivos dejan de ser una lista y pasan a formar parte de tu inglés con FluidLearn.',
  testCta: 'Haz el test de nivel',
}

const en: AdjectivesCopy = {
  ...es,
  kicker: 'Visual grammar and vocabulary guide',
  heroTitle: 'English adjectives: types, order, list and exercises',
  heroLead: 'Learn how to choose, place and order English adjectives to describe people, objects, places and emotions with precision — not as an isolated word list.',
  startCta: 'Start for free',
  heroTestCta: 'Start the test',
  listCta: 'Explore the 100+ list',
  heroNote: 'Look at a scene. Make it more precise.',
  sceneKicker: 'A noun names. An adjective lets you see it.',
  sceneLead: 'Pick a trait and watch the picture change.',
  sceneNounEs: 'a room',
  sceneResultEs: 'a bright room',
  nav: [
    { id: 'que-son', label: 'What they are' },
    { id: 'posicion', label: 'Position' },
    { id: 'orden', label: 'Order' },
    { id: 'tipos', label: 'Types' },
    { id: 'ed-ing', label: '-ed / -ing' },
    { id: 'lista', label: '100+ list' },
    { id: 'ejercicios', label: 'Exercises' },
    { id: 'recursos', label: 'Resources' },
    { id: 'preguntas', label: 'Questions' },
  ],
  whatTitle: 'What are English adjectives and how are they used?',
  whatLead: 'English adjectives describe qualities, states or traits of a noun: size, colour, age, origin, material, opinion or personality. In a small house, small specifies the house; in the house is small, the same quality comes after the verb.',
  attrTitle: 'Attributive adjective',
  predTitle: 'Predicative adjective',
  invTitle: 'One invariable form',
  invNote: 'Unlike Spanish, English adjectives do not agree with the noun. Do not add a plural ending or change the form for gender.',
  posTitle: 'Adjective position in English: before the noun or after the verb',
  posLead: 'The rule “the adjective always goes before” is incomplete. Position depends on the function in the sentence.',
  beforeTitle: 'Before a noun',
  afterTitle: 'After linking verbs',
  afterLead: 'Used after be, seem, become, look, feel, sound, smell or taste.',
  careTitle: 'Cases that need attention',
  careLead: 'Some adjectives, such as afraid, asleep, alive and alone, normally appear after the verb.',
  careNote: 'After something, anything, nothing or someone, the adjective comes after: something useful, nothing serious, someone special.',
  orderTitle: 'Adjective order in English: the OSASCOMP pattern',
  orderLead: 'When several adjectives describe the same noun, English tends to order them by opinion, size, age, shape, colour, origin, material and purpose.',
  osascomp: [
    { letter: 'O', title: 'Opinion', example: 'beautiful' },
    { letter: 'S', title: 'Size', example: 'small' },
    { letter: 'A', title: 'Age', example: 'old' },
    { letter: 'S', title: 'Shape', example: 'round' },
    { letter: 'C', title: 'Colour', example: 'red' },
    { letter: 'O', title: 'Origin', example: 'Italian' },
    { letter: 'M', title: 'Material', example: 'wooden' },
    { letter: 'P', title: 'Purpose', example: 'dining' },
  ],
  orderQ: 'Do you need eight adjectives?',
  orderA: 'No. The sequence shows the order, but natural speech usually uses one, two or three. Keep only the traits that add information.',
  commasTitle: 'Commas between adjectives',
  commasBody: 'Coordinated adjectives can take and and a comma: a calm, friendly teacher. Cumulative categories are not separated: a small wooden box.',
  opinionTitle: 'General and specific opinion',
  opinionBody: 'A general opinion usually precedes a more specific one: a lovely comfortable chair.',
  typesTitle: 'Types of English adjectives with examples',
  typesLead: 'Classifying adjectives helps you understand their function and build vocabulary by meaning.',
  types: [
    { title: 'Qualitative adjectives', body: 'Express a quality: kind, difficult, blue, tall.', example: 'She is a kind person.' },
    { title: 'Quantitative adjectives', body: 'Show approximate amount: some, much, little, enough.', example: 'We have enough time.' },
    { title: 'Numeral adjectives', body: 'Mark number or order: two, ten, first, third.', example: 'This is my second attempt.' },
    { title: 'Demonstrative adjectives', body: 'Point to distance and number: this, that, these, those.', example: 'Those shoes are new.' },
    { title: 'Possessive adjectives', body: 'Link the noun to the owner: my, your, his, her, its, our, their.', example: 'Their project is ready.' },
    { title: 'Interrogative adjectives', body: 'Introduce questions before a noun: which, what, whose.', example: 'Which colour do you prefer?' },
  ],
  typesNote: 'You will also find proper adjectives (Spanish, Victorian), compounds (well-known) and participles used as adjectives (broken, smiling, exciting).',
  edTitle: '-ed and -ing adjectives: a difference in meaning',
  edLead: 'Pairs like bored/boring are not interchangeable. One describes the experience; the other, its cause.',
  edColTitle: '-ed: how someone feels',
  ingColTitle: '-ing: what causes the feeling',
  edTip: 'Quick test: if you can ask “how does someone feel?”, -ed usually fits. If you ask “what causes that feeling?”, -ing usually fits.',
  degTitle: 'Comparatives and superlatives of English adjectives',
  degLead: 'Adjective degrees let you compare. The form depends on word length, ending and whether it is regular or irregular.',
  degHeaders: ['Type', 'Adjective', 'Comparative', 'Superlative', 'Example'],
  degNote: 'Practise these patterns in FluidLearn with exercises, AI and connected teachers.',
  listTitle: 'List of 100+ English adjectives with Spanish',
  listLead: 'Search by word or filter by meaning. Every entry stays on the page so you can study without losing context.',
  searchLabel: 'Search an adjective',
  searchPh: 'Search: happy, red, material...',
  allFilter: 'All',
  filters: [
    { id: 'all', label: 'All' },
    { id: 'quality', label: 'Quality' },
    { id: 'size', label: 'Size' },
    { id: 'color', label: 'Colour' },
    { id: 'feeling', label: 'Feeling' },
    { id: 'personality', label: 'Personality' },
    { id: 'age', label: 'Age' },
    { id: 'shape', label: 'Shape' },
    { id: 'origin', label: 'Origin' },
    { id: 'material', label: 'Material' },
    { id: 'purpose', label: 'Purpose' },
  ],
  listHeaders: ['Adjective', 'Translation', 'Category'],
  exTitle: 'English adjective examples in real sentences',
  exLead: 'Notice position, nuance and translation. Then change one element to make a sentence of your own.',
  errorsTitle: 'Common mistakes with English adjectives',
  errorsLead: 'These corrections target frequent Spanish interference and improve naturalness immediately.',
  errorHeaders: ['Mistake', 'Avoid', 'Correct', 'Why'],
  quizTitle: 'English adjective exercises with answers',
  quizLead: 'Solve each activity. Explaining why you choose a form consolidates the rule better than guessing.',
  quizCheck: 'Check test',
  quizPending: 'Result: pending',
  quizScore: 'Result: {score} / {total}',
  quizShow: 'Show answers',
  quizHide: 'Hide answers',
  quizStart: 'Start the test',
  quizRetry: 'Try again',
  quizTime: 'Time',
  quizExpired: 'Time is up',
  quizLetters: ['A', 'B', 'C'],
  pdfTitle: 'The 100 most used English adjectives',
  pdfLead: 'Use this list with the filters and examples: recall the word, check the translation, then make a personal sentence in FluidLearn.',
  pdfNote: 'Memory improves when you retrieve the term and use it in context, not when you only read it.',
  pdfCta: 'Practise in FluidLearn',
  moreTitle: 'Grammar and vocabulary related to English adjectives',
  moreLead: 'Connect this lesson with grammar, modal verbs, levels and practice. The links form a FluidLearn path.',
  faqTitle: 'Frequently asked questions about English adjectives',
  faq: [
    { q: 'What is an adjective in English?', a: 'A word that describes a noun: size, colour, age, origin, material, opinion or personality.' },
    { q: 'Where do English adjectives go?', a: 'Before the noun when they modify it (a red jacket) and after linking verbs (You look tired). After something/anyone they come after: something useful.' },
    { q: 'Do English adjectives change in the plural or by gender?', a: 'No. happy works for boy, girl, one child and three children.' },
    { q: 'What is the order of several adjectives?', a: 'OSASCOMP: opinion, size, age, shape, colour, origin, material and purpose. In practice use two or three traits.' },
    { q: 'What is the difference between bored and boring?', a: 'Bored is how someone feels. Boring is what causes the feeling.' },
    { q: 'How are comparatives and superlatives formed?', a: 'Short: -er / the -est. Long: more / the most. Irregular: good → better → the best.' },
    { q: 'How can I memorise 100 English adjectives?', a: 'Filter by category, create an image and a sentence, and practise in FluidLearn.' },
  ],
  closeLead: 'Describe what you see. Say exactly what you mean.',
  closeBody: 'Turn each new word into an image, a comparison and a sentence of your own. Then adjectives stop being a list and become part of your English with FluidLearn.',
  testCta: 'Take the level test',
}

export function getAdjectivesCopy(lang: LandingLangCode): AdjectivesCopy {
  return lang === 'es' ? es : en
}

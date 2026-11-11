import { A1_QUESTIONS } from './a1LevelTest'
import { A2_QUESTIONS } from './a2LevelTest'
import { B1_QUESTIONS } from './b1LevelTest'
import { B2_QUESTIONS } from './b2LevelTest'
import type { LevelTestQuestion } from './levelTest'

export type WhyItem = { title?: string; text: string }
export type TextCard = { title: string; text: string }
export type TopicBlock = { title: string; text?: string; items?: string[] }

export type LevelTestSpec = {
  slug: string
  heroImage: string
  questions: LevelTestQuestion[]
  passLabel: string
  failLabel: string
  heroKicker: string
  heroTitle: string
  heroLead: string
  heroCta: string
  introTitle: string
  introParas: string[]
  sideTitle: string
  sideText: string
  readyTitle: string
  readyLead: string
  readyItems: string[]
  whyTitle: string
  whyLead: string
  whyItems: WhyItem[]
  evalTitle: string
  evalItems: TextCard[]
  topicsTitle?: string
  topics?: TopicBlock[]
  midCtaTitle: string
  midCta: string
  afterTitle: string
  afterItems: string[]
  tipsTitle: string
  tips: TextCard[]
  methodTitle: string
  methodItems: TextCard[]
  schoolsTitle: string
  schoolsBody: string
  schoolsItems?: string[]
  ctaTitle: string
  ctaLead: string
  ctaButton: string
  moreTestsTitle: string
  passedMsg: string
  failMsg: string
}

const METHOD: TextCard[] = [
  {
    title: 'Inteligencia Artificial Educativa',
    text: 'Nuestra IA evalúa ejercicios, pronunciación y escritura con retroalimentación inmediata.',
  },
  {
    title: 'Profesores conectados',
    text: 'Los estudiantes Premium resuelven dudas con docentes especializados.',
  },
  {
    title: 'Microlearning inteligente',
    text: 'Lecciones de 10 a 15 minutos que se adaptan a tu rutina diaria.',
  },
  {
    title: 'Dashboard de progreso',
    text: 'Reportes, logros y métricas académicas para ver tu avance.',
  },
  {
    title: 'Accesibilidad para todos',
    text: 'Modo oscuro, tamaño de texto, lectores de pantalla, teclado y alto contraste.',
  },
]

export const A1_SPEC: LevelTestSpec = {
  slug: 'a1',
  heroImage:
    'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1600&q=80',
  questions: A1_QUESTIONS,
  passLabel: 'A1 — Principiante',
  failLabel: 'En camino a A1',
  heroKicker: 'FluidLearn · MCER',
  heroTitle: 'Test de nivel de inglés A1',
  heroLead:
    'Descubre si tu nivel de inglés es realmente un A1 con nuestra prueba gratuita y sin registro. Responde las preguntas del test y averigua tu nivel.',
  heroCta: 'Empieza el test',
  introTitle: 'Ubica tu nivel de inglés con nuestro Test Inteligente',
  introParas: [
    'Aprender inglés es un proceso que comienza identificando tu nivel actual. En FluidLearn hemos desarrollado un test de diagnóstico para conocer tus fortalezas y las habilidades que necesitas reforzar.',
    'El examen sigue los estándares del Marco Común Europeo de Referencia (MCER) y te ayuda a identificar si estás en A1, A2, B1, B2 o superior. Nuestra Inteligencia Artificial te dará recomendaciones personalizadas desde el primer día.',
  ],
  sideTitle: 'Nivel A1 · Principiante',
  sideText: '19 preguntas de opción múltiple. Tiempo: 1:30. Resultado inmediato según el MCER.',
  readyTitle: 'Nivel A1: Principiante',
  readyLead: 'El nivel A1 es el primer peldaño del idioma. Al finalizarlo, el estudiante debe ser capaz de:',
  readyItems: [
    'Comprender expresiones sencillas de uso cotidiano.',
    'Presentarse y proporcionar información personal básica.',
    'Preguntar y responder sobre temas familiares.',
    'Hablar sobre su familia, estudios y lugar de residencia.',
    'Comprender instrucciones simples.',
    'Mantener conversaciones breves cuando el interlocutor habla claro y pausado.',
  ],
  whyTitle: '¿Por qué realizar el test de nivel de inglés?',
  whyLead:
    'Una evaluación diagnóstica te ayuda a aprender desde el nivel que realmente necesitas, optimizar tu tiempo y mejorar tu experiencia.',
  whyItems: [
    { text: 'Conocer tu nivel actual de inglés.' },
    { text: 'Identificar fortalezas y oportunidades de mejora.' },
    { text: 'Acceder a una ruta de aprendizaje personalizada.' },
    { text: 'Medir tu progreso a lo largo del tiempo.' },
    { text: 'Prepararte para requisitos de colegios y universidades.' },
    { text: 'Obtener recomendaciones generadas por nuestra IA educativa.' },
  ],
  evalTitle: '¿Qué evalúa la prueba de nivel de inglés?',
  evalItems: [
    { title: 'Listening', text: 'Comprensión de audios, conversaciones y situaciones cotidianas.' },
    { title: 'Reading', text: 'Interpretación de textos cortos, anuncios, mensajes y lecturas básicas.' },
    { title: 'Writing', text: 'Capacidad para escribir frases, responder y redactar información personal.' },
    { title: 'Speaking', text: 'Pronunciación y fluidez con herramientas impulsadas por Inteligencia Artificial.' },
    { title: 'Gramática y vocabulario', text: 'Estructuras y vocabulario de situaciones cotidianas.' },
  ],
  midCtaTitle: 'Haz el test de inglés A1 y comprueba tu nivel',
  midCta: 'Ir al test',
  afterTitle: '¿Qué sucede después de completar el test?',
  afterItems: [
    'Resultado inmediato.',
    'Nivel estimado según el MCER.',
    'Reporte de habilidades.',
    'Recomendaciones personalizadas.',
    'Ruta de aprendizaje adaptativa.',
    'Plan de estudio recomendado por Inteligencia Artificial.',
  ],
  tipsTitle: 'Consejos para mejorar tu nivel de inglés',
  tips: [
    { title: 'Aprende con imágenes', text: 'Asocia palabras y conceptos más rápido y fortalece la memoria visual.' },
    { title: 'Practica con otras personas', text: 'Conversar con compañeros o profesores mejora tu confianza y fluidez.' },
    { title: 'Aprende jugando', text: 'Juegos, cuestionarios y desafíos hacen el aprendizaje más efectivo.' },
    { title: 'Escucha música en inglés', text: 'Las canciones amplían vocabulario y desarrollan la capacidad auditiva.' },
    { title: 'Mira contenido audiovisual', text: 'Series, películas y videos educativos mejoran la comprensión.' },
  ],
  methodTitle: 'Aprende con la metodología FluidLearn',
  methodItems: METHOD,
  schoolsTitle: 'Diseñado para colegios y universidades',
  schoolsBody:
    'FluidLearn se adapta a instituciones que buscan fortalecer las competencias lingüísticas de sus estudiantes: seguimiento académico, alertas tempranas, reportes, integración curricular y apoyo a requisitos de graduación.',
  ctaTitle: '¿Quieres aprobar tu examen de inglés nivel A1?',
  ctaLead:
    'Comienza hoy tu camino hacia la fluidez con una experiencia moderna, accesible y personalizada. Realiza nuestro Test de Nivel y descubre qué tan cerca estás de dominar el inglés.',
  ctaButton: 'Empieza hoy',
  moreTestsTitle: 'Prepárate para superar cualquier test con FluidLearn',
  passedMsg: 'Tienes una base A1 sólida. Te recomendamos continuar con microlecciones y práctica de conversación.',
  failMsg:
    'Sigue practicando saludos, el verbo to be, números y vocabulario cotidiano. Nuestra IA puede armarte una ruta corta.',
}

export const A2_SPEC: LevelTestSpec = {
  slug: 'a2',
  heroImage:
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
  questions: A2_QUESTIONS,
  passLabel: 'A2 — Elemental',
  failLabel: 'En camino a A2',
  heroKicker: 'FluidLearn · MCER',
  heroTitle: 'Test de nivel de inglés A2',
  heroLead:
    'Si ya tienes conocimientos básicos y te comunicas en situaciones cotidianas, da el siguiente paso. Prueba gratuita, sin registro y con resultado inmediato.',
  heroCta: 'Empieza el test',
  introTitle: 'Prueba tu nivel de inglés A2 con FluidLearn',
  introParas: [
    'Si ya tienes conocimientos básicos de inglés y eres capaz de comunicarte en situaciones cotidianas, es momento de dar el siguiente paso. En FluidLearn hemos desarrollado un Test Inteligente de Nivel A2 para evaluar tus conocimientos y saber qué habilidades reforzar rumbo a B1 y B2.',
    'Gracias a nuestra Inteligencia Artificial, el sistema analiza tu desempeño y te recomienda una ruta de aprendizaje personalizada, adaptada a tus fortalezas y áreas de mejora.',
  ],
  sideTitle: 'Nivel A2 · Elemental',
  sideText: '19 preguntas de opción múltiple. Tiempo: 1:30. Resultado inmediato según el MCER.',
  readyTitle: '¿Estoy preparado para un nivel A2?',
  readyLead:
    'Según el Marco Común Europeo de Referencia (MCER), un estudiante de nivel A2 debe ser capaz de:',
  readyItems: [
    'Comprender expresiones y frases relacionadas con información personal y familiar.',
    'Hablar sobre actividades diarias, estudios, trabajo y tiempo libre.',
    'Describir experiencias pasadas de manera sencilla.',
    'Comunicarse en situaciones comunes como compras, viajes, restaurantes o transporte.',
    'Solicitar y proporcionar información básica en inglés.',
    'Mantener conversaciones simples cuando el interlocutor habla de forma clara y pausada.',
  ],
  whyTitle: '¿Por qué hacer un test de nivel A2?',
  whyLead: 'Nuestro examen de diagnóstico te ofrece múltiples beneficios:',
  whyItems: [
    { title: 'Conoce tu nivel real', text: 'Obtén un resultado inmediato y descubre qué tan cerca estás del siguiente nivel.' },
    { title: 'Monitorea tu progreso', text: 'Repite la prueba cuando quieras y compara tus resultados para ver tu evolución.' },
    { title: 'Establece objetivos claros', text: 'Identifica qué habilidades requieren más atención y arma un plan de estudio.' },
    { title: 'Prepárate para certificaciones', text: 'Los test siguen el MCER y sirven como preparación para certificaciones académicas.' },
    { title: 'Acceso en cualquier momento', text: 'Haz la prueba desde computador, tablet o smartphone, donde y cuando quieras.' },
  ],
  evalTitle: '¿Qué evalúa la prueba de nivel A2?',
  evalItems: [
    { title: 'Speaking', text: 'Capacidad para expresar ideas, opiniones y experiencias personales.' },
    { title: 'Listening', text: 'Comprensión de conversaciones cotidianas y mensajes simples.' },
    { title: 'Reading', text: 'Interpretación de textos cortos, anuncios, descripciones e instrucciones.' },
    { title: 'Writing', text: 'Redacción de mensajes, correos y descripciones básicas.' },
    { title: 'Gramática y vocabulario', text: 'Tiempos verbales básicos, expresiones comunes y vocabulario habitual.' },
  ],
  midCtaTitle: 'Haz el test de inglés A2 y comprueba tu nivel',
  midCta: 'Ir al test',
  afterTitle: 'Continúa avanzando hacia la fluidez',
  afterItems: [
    'Resultado inmediato.',
    'Nivel estimado según el MCER.',
    'Recomendaciones personalizadas.',
    'Ruta de aprendizaje adaptativa.',
    'Plan de estudio recomendado por IA.',
    'Puedes repetir la prueba cuando quieras.',
  ],
  tipsTitle: 'Consejos para mejorar tu nivel A2',
  tips: [
    { title: 'Mira series y películas en inglés', text: 'Activa subtítulos en inglés y presta atención a la pronunciación y nuevas expresiones.' },
    { title: 'Aprende mediante la música', text: 'Escuchar canciones ayuda a desarrollar comprensión auditiva y pronunciación.' },
    { title: 'Conversa con otras personas', text: 'Practicar con compañeros, profesores o comunidades fortalece tu confianza.' },
    { title: 'Utiliza FluidLearn diariamente', text: 'Dedica entre 10 y 15 minutos al día para completar tus lecciones y actividades.' },
    { title: 'Aprende de forma interactiva', text: 'Desafíos, cuestionarios y ejercicios dinámicos para fortalecer tus conocimientos.' },
  ],
  methodTitle: 'Aprende con la metodología FluidLearn',
  methodItems: METHOD,
  schoolsTitle: 'Diseñado para colegios y universidades',
  schoolsBody:
    'FluidLearn puede integrarse en instituciones educativas para seguimiento académico, evaluación continua, alertas tempranas, reportes para coordinadores, fortalecimiento lingüístico y requisitos de graduación.',
  ctaTitle: 'Realiza ahora tu Test de Nivel A2',
  ctaLead:
    'Cada prueba te acerca a tus objetivos académicos y profesionales. Descubre tu nivel, fortalece tus habilidades y aprende de forma inteligente con FluidLearn.',
  ctaButton: 'Empieza el test A2',
  moreTestsTitle: 'Prepárate para superar cualquier test con FluidLearn',
  passedMsg: 'Tienes una base A2 sólida. Sigue con conversación, pasado simple y vocabulario de la vida diaria rumbo a B1.',
  failMsg:
    'Refuerza pasado simple, comparativos, present continuous y rutinas. Nuestra IA puede armarte una ruta corta hacia A2.',
}

export const B1_SPEC: LevelTestSpec = {
  slug: 'b1',
  heroImage:
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
  questions: B1_QUESTIONS,
  passLabel: 'B1 — Intermedio',
  failLabel: 'En camino a B1',
  heroKicker: 'FluidLearn · MCER',
  heroTitle: 'Test de nivel de inglés B1',
  heroLead:
    'El nivel B1 es un punto clave: desenvuélvete con confianza en lo académico, laboral y social. Prueba gratuita, sin registro y con resultado inmediato.',
  heroCta: 'Empieza el test',
  introTitle: 'Prueba tu nivel de inglés B1 con FluidLearn',
  introParas: [
    'El nivel B1 (Intermedio) del MCER representa un punto clave en el aprendizaje del inglés. Alcanzarlo significa desenvolverte con confianza en situaciones académicas, laborales y sociales, comprendiendo información general y participando en conversaciones.',
    'En FluidLearn hemos desarrollado un Test Inteligente de Nivel B1 para conocer tu nivel, identificar fortalezas y ver qué mejorar rumbo a B2 y C1. Combinamos Inteligencia Artificial, profesores conectados, microlearning y trazabilidad académica.',
  ],
  sideTitle: 'Nivel B1 · Intermedio',
  sideText: '19 preguntas de opción múltiple. Tiempo: 1:30. Resultado inmediato según el MCER.',
  readyTitle: '¿Estoy preparado para un nivel B1?',
  readyLead: 'Un estudiante con nivel B1 debe ser capaz de:',
  readyItems: [
    'Comprender los puntos principales de conversaciones y textos sobre temas familiares.',
    'Desenvolverse en viajes y situaciones cotidianas en países angloparlantes.',
    'Expresar opiniones, ideas y experiencias personales.',
    'Narrar acontecimientos pasados y describir planes futuros.',
    'Escribir textos sencillos y coherentes sobre temas de interés.',
    'Mantener conversaciones fluidas sobre trabajo, estudios y tiempo libre.',
  ],
  whyTitle: '¿Por qué realizar el Test de Inglés B1?',
  whyLead: 'Nuestro examen de diagnóstico te ofrece una evaluación clara y accionable.',
  whyItems: [
    { title: 'Conoce tu nivel real', text: 'Obtén una evaluación precisa de tus competencias lingüísticas.' },
    { title: 'Identifica oportunidades de mejora', text: 'Descubre qué habilidades requieren más práctica y atención.' },
    { title: 'Mide tu progreso', text: 'Repite la prueba cuando quieras y compara resultados para ver tu evolución.' },
    { title: 'Prepárate para certificaciones', text: 'Sirve como punto de referencia para certificaciones internacionales.' },
    { title: 'Disponible donde quieras', text: 'Hazlo desde computador, tablet o smartphone.' },
  ],
  evalTitle: '¿Qué evalúa el test B1 de FluidLearn?',
  evalItems: [
    { title: 'Speaking', text: 'Capacidad para expresar opiniones, ideas y experiencias con claridad.' },
    { title: 'Listening', text: 'Comprensión de conversaciones, entrevistas y situaciones reales.' },
    { title: 'Reading', text: 'Interpretación de textos, artículos, correos e información general.' },
    { title: 'Writing', text: 'Redacción de mensajes, opiniones y textos estructurados.' },
    { title: 'Gramática y vocabulario', text: 'Uso correcto de estructuras intermedias del idioma.' },
  ],
  topicsTitle: 'Temas esenciales para superar el nivel B1',
  topics: [
    {
      title: 'Conjugación verbal',
      items: [
        'Present Simple',
        'Present Continuous',
        'Present Perfect',
        'Past Simple',
        'Past Continuous',
        'Future Will',
        'Going To',
      ],
    },
    {
      title: 'Gramática',
      items: [
        'Comparativos y superlativos',
        'Condicionales básicas',
        'Verbos modales',
        'Preposiciones',
        'Conectores',
        'Voz pasiva básica',
      ],
    },
    {
      title: 'Vocabulario',
      items: ['Estudios', 'Trabajo', 'Tecnología', 'Viajes', 'Salud', 'Medio ambiente', 'Situaciones cotidianas'],
    },
  ],
  midCtaTitle: 'Haz el test de inglés B1 y comprueba tu nivel',
  midCta: 'Ir al test',
  afterTitle: 'Sigue avanzando hacia la fluidez',
  afterItems: [
    'Resultado inmediato.',
    'Nivel estimado según el MCER.',
    'Recomendaciones personalizadas.',
    'Ruta de aprendizaje adaptativa.',
    'Plan de estudio recomendado por IA.',
    'Puedes repetir la prueba cuando quieras.',
  ],
  tipsTitle: 'Consejos para mejorar tu nivel B1',
  tips: [
    { title: 'Consume contenido en inglés', text: 'Series, películas, podcasts y videos para distintos acentos y expresiones.' },
    { title: 'Lee con frecuencia', text: 'Artículos, blogs, revistas y noticias fortalecen tu comprensión lectora.' },
    { title: 'Habla sin miedo', text: 'La práctica constante es fundamental para ganar fluidez.' },
    { title: 'Escucha podcasts', text: 'Mejoran de forma notable las habilidades de comprensión auditiva.' },
    { title: 'Practica diariamente', text: 'Con 10 a 15 minutos al día puedes avanzar de forma constante.' },
  ],
  methodTitle: 'Aprende con la metodología FluidLearn',
  methodItems: METHOD,
  schoolsTitle: 'Diseñado para colegios y universidades',
  schoolsBody: 'FluidLearn permite a las instituciones educativas fortalecer el inglés con trazabilidad real.',
  schoolsItems: [
    'Monitorear el avance de los estudiantes.',
    'Generar reportes académicos.',
    'Implementar alertas tempranas.',
    'Fortalecer competencias lingüísticas.',
    'Facilitar el cumplimiento de requisitos de graduación.',
  ],
  ctaTitle: 'Comienza ahora tu Test de Nivel B1',
  ctaLead:
    'El nivel B1 es un paso importante hacia el dominio del inglés. Descubre si estás listo para avanzar a niveles superiores.',
  ctaButton: 'Empieza el test B1',
  moreTestsTitle: 'Prepárate para superar cualquier test con FluidLearn',
  passedMsg: 'Tienes una base B1 sólida. Sigue con condicionales, present perfect y conversación rumbo a B2.',
  failMsg:
    'Refuerza past perfect, used to, voz pasiva y conectores. Nuestra IA puede armarte una ruta hacia B1.',
}

export const B2_SPEC: LevelTestSpec = {
  slug: 'b2',
  heroImage:
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1600&q=80',
  questions: B2_QUESTIONS,
  passLabel: 'B2 — Intermedio alto',
  failLabel: 'En camino a B2',
  heroKicker: 'FluidLearn · MCER',
  heroTitle: 'Test de nivel de inglés B2',
  heroLead:
    'En B2 puedes comprender textos complejos y conversar con claridad en lo académico y profesional. Prueba gratuita, sin registro y con resultado inmediato.',
  heroCta: 'Empieza el test',
  introTitle: 'Prueba tu nivel de inglés B2 con FluidLearn',
  introParas: [
    'El nivel B2 (Intermedio Alto) del MCER es una etapa avanzada: comprendes textos complejos, conversas con hablantes nativos y expresas ideas con claridad sobre temas académicos, profesionales y sociales.',
    'En FluidLearn hemos desarrollado un Test Inteligente de Nivel B2 para conocer tu nivel, identificar fortalezas y ver qué mejorar rumbo a C1 y C2. Combinamos IA, profesores conectados, aprendizaje adaptativo y trazabilidad académica.',
  ],
  sideTitle: 'Nivel B2 · Intermedio alto',
  sideText: '19 preguntas de opción múltiple. Tiempo: 1:30. Resultado inmediato según el MCER.',
  readyTitle: '¿Estoy preparado para un nivel B2?',
  readyLead: 'Un estudiante con nivel B2 debe ser capaz de:',
  readyItems: [
    'Comprender artículos, informes y textos complejos.',
    'Participar en conversaciones de forma espontánea y fluida.',
    'Defender opiniones y argumentar puntos de vista.',
    'Comprender películas, conferencias y programas en inglés estándar.',
    'Escribir textos detallados y bien estructurados.',
    'Comunicarse eficazmente en contextos académicos y profesionales.',
    'Comprender diferentes registros del idioma y expresiones comunes.',
  ],
  whyTitle: '¿Por qué realizar el Test de Inglés B2?',
  whyLead: 'Evalúa tu progreso y prepárate para retos más avanzados.',
  whyItems: [
    { title: 'Evalúa tu progreso', text: 'Comprueba cuánto has avanzado y si estás listo para retos más avanzados.' },
    { title: 'Identifica oportunidades de mejora', text: 'Detecta qué habilidades fortalecer para alcanzar la fluidez.' },
    { title: 'Mide tu evolución', text: 'Repite el test cuando desees para comparar resultados.' },
    { title: 'Prepárate para certificaciones internacionales', text: 'El B2 es uno de los niveles más pedidos por universidades y empleadores.' },
    { title: 'Acceso desde cualquier lugar', text: 'Completa la prueba en computador, tablet o móvil.' },
  ],
  evalTitle: '¿Qué evalúa la prueba de nivel B2?',
  evalItems: [
    { title: 'Reading', text: 'Comprensión de textos largos y complejos, artículos académicos y noticias.' },
    { title: 'Listening', text: 'Interpretación de conversaciones naturales, conferencias y contenido multimedia.' },
    { title: 'Writing', text: 'Redacción de opiniones, ensayos, informes y textos argumentativos.' },
    { title: 'Speaking', text: 'Capacidad para expresarse de forma clara, natural y detallada.' },
    { title: 'Gramática y vocabulario', text: 'Uso avanzado de estructuras gramaticales y vocabulario contextualizado.' },
  ],
  topicsTitle: 'Temas esenciales para dominar el nivel B2',
  topics: [
    { title: 'Reading', text: 'Comprender artículos periodísticos, textos literarios y documentos académicos.' },
    { title: 'Listening', text: 'Identificar argumentos, opiniones y detalles en conversaciones complejas.' },
    { title: 'Writing', text: 'Redactar textos organizados, coherentes y bien estructurados.' },
    { title: 'Speaking', text: 'Mantener conversaciones fluidas con hablantes nativos sin dificultad significativa.' },
    {
      title: 'Gramática',
      items: [
        'Todos los tiempos verbales',
        'Present Perfect y Present Perfect Continuous',
        'Reported Speech',
        'Voz pasiva',
        'First, Second y Third Conditional',
        'Verbos modales',
        'Relative Clauses',
        'Phrasal Verbs',
        'Linking words y conectores avanzados',
      ],
    },
    {
      title: 'Vocabulario',
      text: 'También necesitarás collocations, expresiones idiomáticas y vocabulario académico.',
      items: [
        'Educación',
        'Tecnología',
        'Negocios',
        'Medio ambiente',
        'Sociedad',
        'Cultura',
        'Salud',
        'Ciencia',
        'Actualidad internacional',
      ],
    },
  ],
  midCtaTitle: 'Haz el test de inglés B2 y comprueba tu nivel',
  midCta: 'Ir al test',
  afterTitle: 'Da el siguiente paso hacia la fluidez',
  afterItems: [
    'Resultado inmediato.',
    'Nivel estimado según el MCER.',
    'Recomendaciones personalizadas.',
    'Ruta de aprendizaje adaptativa.',
    'Plan de estudio recomendado por IA.',
    'Puedes repetir la prueba cuando quieras.',
  ],
  tipsTitle: 'Consejos para mejorar tu nivel B2',
  tips: [
    { title: 'Lee contenido auténtico', text: 'Periódicos, revistas, blogs y artículos académicos en inglés.' },
    { title: 'Mira contenido en versión original', text: 'Películas, documentales y series con subtítulos en inglés.' },
    { title: 'Escucha podcasts y conferencias', text: 'Te acostumbras a distintos acentos y velocidades.' },
    { title: 'Escribe con frecuencia', text: 'Practica opiniones, correos formales y ensayos cortos.' },
    { title: 'Habla constantemente', text: 'Busca conversar y pierde el miedo a cometer errores.' },
  ],
  methodTitle: 'Aprende con la metodología FluidLearn',
  methodItems: METHOD,
  schoolsTitle: 'Diseñado para colegios y universidades',
  schoolsBody: 'FluidLearn ayuda a las instituciones educativas a integrar el inglés en su operación académica.',
  schoolsItems: [
    'Monitorear competencias lingüísticas.',
    'Generar reportes académicos.',
    'Aplicar evaluaciones diagnósticas.',
    'Implementar alertas tempranas.',
    'Cumplir requisitos de graduación relacionados con el inglés.',
  ],
  ctaTitle: 'Comenzar Test de Nivel B2',
  ctaLead:
    'El B2 demuestra que puedes desenvolverte con seguridad en entornos académicos y profesionales. Descubre si estás listo para un nivel avanzado.',
  ctaButton: 'Empieza el test B2',
  moreTestsTitle: 'Prepárate para superar cualquier test con FluidLearn',
  passedMsg: 'Tienes una base B2 sólida. Sigue con reported speech, inversion y vocabulario académico rumbo a C1.',
  failMsg:
    'Refuerza condicionales, voz pasiva, phrasal verbs y conectores. Nuestra IA puede armarte una ruta hacia B2.',
}

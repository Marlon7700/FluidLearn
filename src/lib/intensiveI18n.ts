import type { LandingLangCode } from './landingI18n'

export type IntensiveBlock = { title: string; body: string }

export type IntensiveCopy = {
  heroTitle: string
  heroLead: string
  startKicker: string
  startLead: string
  startCta: string
  intro: [string, string]
  whyTitle: string
  whyLead: string
  whyItems: IntensiveBlock[]
  differentTitle: string
  differentLead: string
  differentItems: string[]
  paceTitle: string
  paceLead: string
  paceItems: string[]
  methodTitle: string
  methodLead: string
  method: IntensiveBlock[]
  devicesTitle: string
  devicesLead: string
  devices: string[]
  devicesNote: string
  devicesImageAlt: string
  chooseTitle: string
  chooseLead: [string, string]
  chooseItems: IntensiveBlock[]
  tipsTitle: string
  tipsLead: string
  tipsItems: IntensiveBlock[]
  intensiveQ: string
  intensiveLead: string
  intensiveItems: IntensiveBlock[]
  onlineQ: string
  onlineLead: [string, string]
  teachersTitle: string
  teachersLead: string
  teachersItems: string[]
  aiTitle: string
  aiLead: string
  aiItems: string[]
  instTitle: string
  instLead: string
  instItems: string[]
  accessTitle: string
  accessLead: string
  accessItems: string[]
  reviewsTitle: string
  reviewsLead: string
  reviews: { quote: string; name: string; place: string }[]
  closeTitle: string
  closeLead: string
  closeItems: string[]
  closeCta: string
}

const es: IntensiveCopy = {
  heroTitle: 'Curso intensivo de inglés online',
  heroLead:
    'Dale un empujón a tu inglés. Aprende de forma intensiva, donde quieras y cuando quieras, con Inteligencia Artificial, profesores conectados y rutas personalizadas.',
  startKicker: 'Empieza gratis',
  startLead:
    'Realiza tu prueba de nivel y comienza un programa diseñado para ayudarte a alcanzar tus metas académicas y profesionales en menos tiempo.',
  startCta: 'Empieza gratis',
  intro: [
    'Anímate a seguir el plan de estudios que te proponemos y consigue los mejores resultados en poco tiempo.',
    'Además, nuestro curso de inglés guiado se adapta a tu nivel, a tus intereses y a tus objetivos, para que tengas una experiencia inmejorable mientras aprendes inglés.',
  ],
  whyTitle: '¿Por qué hacer un curso intensivo de inglés?',
  whyLead:
    'Sin duda alguna, hay miles de razones para aprender inglés. No importa cuál sea tu contexto o cuál haya sido tu experiencia previa con el idioma: estas son cinco razones por las que deberías realizar un curso intensivo de inglés en línea con FluidLearn.',
  whyItems: [
    {
      title: 'Podrás aprender más rápido el idioma',
      body: 'Al mantener una práctica constante lograrás avanzar de nivel en menos tiempo y, en consecuencia, obtendrás resultados más rápido.',
    },
    {
      title: 'Utilizarás materiales especiales de aprendizaje',
      body: 'Accede a contenidos diseñados específicamente para desarrollar competencias lingüísticas y alcanzar tus metas con más rapidez.',
    },
    {
      title: 'Tendrás mayor exposición al idioma',
      body: 'Cuanto más interactúes con el inglés, más natural será comprenderlo, hablarlo y escribirlo.',
    },
    {
      title: 'Obtendrás una mejor relación coste-beneficio',
      body: 'Inviertes recursos, no solo económicos, sino también de tiempo y esfuerzo, y el beneficio lo verás a muy corto plazo.',
    },
    {
      title: 'Un curso intensivo online te dará flexibilidad',
      body: 'Aprende cuando quieras, desde donde quieras y a tu ritmo, con horarios y dispositivos que se adaptan a ti.',
    },
    {
      title: 'Mejores resultados académicos',
      body: 'Fortalece las habilidades necesarias para cumplir requisitos universitarios y profesionales.',
    },
  ],
  differentTitle: '¿Por qué el curso intensivo de FluidLearn es diferente?',
  differentLead:
    'FluidLearn ha sido diseñado especialmente para estudiantes universitarios y de educación media que necesitan fortalecer sus competencias en inglés para cumplir objetivos académicos, laborales y personales. Nuestro método combina:',
  differentItems: [
    'Inteligencia Artificial Educativa.',
    'Profesores conectados.',
    'Microlearning.',
    'Evaluaciones automáticas.',
    'Dashboard académico.',
    'Práctica constante de Speaking, Reading, Writing y Listening.',
  ],
  paceTitle: 'Aprende a tu propio ritmo',
  paceLead:
    'No todos los estudiantes aprenden al mismo ritmo. Por eso, FluidLearn te permite crear tu propio plan de estudio y avanzar según tu disponibilidad. Tú decides:',
  paceItems: [
    'Cuándo estudiar.',
    'Desde qué dispositivo aprender.',
    'Cuánto tiempo dedicar al inglés.',
    'Qué objetivos alcanzar.',
  ],
  methodTitle: 'Metodología Aprende, Practica y Comunícate',
  methodLead: 'Cada lección está diseñada para ayudarte a usar el idioma desde el primer día.',
  method: [
    {
      title: 'Aprende',
      body: 'Accede a contenido interactivo, videos educativos y recursos adaptados a tu nivel.',
    },
    {
      title: 'Practica',
      body: 'Realiza ejercicios, actividades de gramática, vocabulario y comprensión.',
    },
    {
      title: 'Comunícate',
      body: 'Desarrolla tus habilidades de conversación con speaking evaluado por Inteligencia Artificial y profesores conectados.',
    },
  ],
  devicesTitle: 'Aprende desde cualquier lugar',
  devicesLead: 'FluidLearn funciona completamente online. Puedes acceder desde:',
  devices: ['Computadores', 'Smartphones', 'Tablets'],
  devicesNote: 'Tu progreso se sincroniza automáticamente para que continúes estudiando donde lo dejaste.',
  devicesImageAlt: 'FluidLearn en computador, tablet y celular',
  chooseTitle: '¿Cómo elegir el mejor curso intensivo de inglés?',
  chooseLead: [
    'Muy bien, ya has decidido que quieres hacer un curso intensivo de inglés. Haces una búsqueda en Internet y la cantidad de ofertas que aparecen es muy extensa. ¿Cómo escoger el curso que se adapte mejor a tus necesidades?',
    'Sin importar la razón por la que quieres aprender inglés, hay algunos elementos que debes tener en cuenta a la hora de elegir. Te proponemos esta lista de chequeo para que escojas el mejor.',
  ],
  chooseItems: [
    {
      title: 'El método de aprendizaje debe ser práctico y ligado al uso del idioma.',
      body: 'El curso debe conjugar el aprendizaje y el uso de las cuatro habilidades: hablar, leer, escribir y escuchar.',
    },
    {
      title: 'Revisa qué tipo de acompañamiento te ofrece',
      body: 'Profesor en línea, chat, clases con docentes conectados y retroalimentación con Inteligencia Artificial.',
    },
    {
      title: 'La gramática es importante, pero no es lo único y más importante.',
      body: 'Verifica en qué plataformas puedes hacer el curso (web y app) y que sea accesible desde cualquier dispositivo.',
    },
    {
      title: 'Toma en cuenta el tiempo que debes invertir',
      body: 'Para alcanzar tus objetivos y qué tan flexible es tu plan de estudio semanal.',
    },
    {
      title: 'Verifica si te ofrece algún certificado oficial',
      body: 'Esto es muy importante en el campo laboral y académico. FluidLearn otorga certificado por nivel superado.',
    },
    {
      title: 'Considera el precio y su relación con lo que te ofrece.',
      body: 'También el seguimiento continuo, la evaluación del progreso y que sea adaptable a colegios y universidades.',
    },
  ],
  tipsTitle: 'Tips para un aprendizaje intensivo eficaz',
  tipsLead:
    'Una parte del éxito en el aprendizaje del inglés es escoger el mejor curso para ti. Pero eso no es todo: también es muy importante crear un método de estudio que te ayude a alcanzar tus metas. Aquí te proponemos algunos tips:',
  tipsItems: [
    {
      title: 'Establece una meta semanal de horas de estudio y práctica.',
      body: 'Define cuántas horas dedicarás al aprendizaje cada semana.',
    },
    {
      title: 'Aprovecha la ayuda de tu profesor conectado',
      body: 'Resuelve dudas, mejora pronunciación y speaking con docentes especializados.',
    },
    {
      title: 'Decide el horario en que vas a estudiar.',
      body: 'No tiene que ser siempre a la misma hora, pero sí debes estudiar y practicar todos los días, aunque sean solo 10 o 15 minutos.',
    },
    {
      title: 'Practica constante e intensivamente.',
      body: 'Escucha música, ve videos, lee artículos y utiliza la plataforma todos los días.',
    },
    {
      title: 'Planifica en qué dispositivo vas a aprender y practicar.',
      body: 'Si el curso es compatible con computador, tablet o celular, continuar será mucho más fácil. FluidLearn sincroniza tu progreso.',
    },
    {
      title: 'Evalúa tu progreso cada semana.',
      body: 'Al terminar la semana, toma 10 minutos para revisar si cumpliste con el tiempo de estudio y tus horarios. Ajusta tus objetivos cuando sea necesario.',
    },
    {
      title: 'Sigue tu ruta personalizada',
      body: 'La Inteligencia Artificial de FluidLearn te recomendará qué estudiar según tus resultados y avances.',
    },
    {
      title: 'Planifica qué vas a practicar día a día.',
      body: 'Esto te ayudará a estar más enfocado y a aprovechar cada sesión de microlearning.',
    },
  ],
  intensiveQ: '¿FluidLearn es intensivo?',
  intensiveLead:
    'El curso de FluidLearn ha sido especialmente diseñado para estudiantes que por trabajo o estudio necesitan aprender inglés de manera efectiva, a su propio ritmo y estableciendo sus horarios. Tú eres quien decide cómo y cuándo estudiar.',
  intensiveItems: [
    {
      title: 'Método aprende, practica y habla',
      body: 'Cada unidad está basada en situaciones reales que te ayudan a aprender y hablar desde el primer día.',
    },
    {
      title: 'Resultados en poco tiempo',
      body: 'Te recomendamos estudiar 30 minutos, 3 o 4 veces por semana. El curso es tan flexible que puedes crear tu propia rutina según tu disponibilidad y metas.',
    },
  ],
  onlineQ: '¿FluidLearn es online?',
  onlineLead: [
    'Claro que sí. Además, una de las mayores ventajas de estudiar en la app es que puedes descargar el contenido para practicar inglés sin conexión. Esto hará que tu progreso en el dominio del idioma sea rápido.',
    'No importa si estudias en tu ordenador, móvil o tablet: tu progreso se guarda independientemente del dispositivo en que estés estudiando.',
  ],
  teachersTitle: 'Profesores conectados',
  teachersLead: 'Los estudiantes Premium podrán:',
  teachersItems: [
    'Resolver dudas con docentes especializados.',
    'Mejorar pronunciación y speaking.',
    'Recibir orientación personalizada.',
    'Obtener retroalimentación constante.',
  ],
  aiTitle: 'Inteligencia Artificial que te acompaña',
  aiLead: 'FluidLearn incorpora IA para:',
  aiItems: [
    'Evaluar ejercicios automáticamente.',
    'Calificar pronunciación.',
    'Detectar fortalezas y debilidades.',
    'Crear rutas personalizadas de aprendizaje.',
    'Recomendar actividades de refuerzo.',
  ],
  instTitle: 'Diseñado para colegios y universidades',
  instLead: 'Nuestra plataforma puede integrarse con instituciones educativas para:',
  instItems: [
    'Monitorear estudiantes.',
    'Generar reportes académicos.',
    'Implementar alertas tempranas.',
    'Fortalecer competencias lingüísticas.',
    'Apoyar procesos de graduación y bilingüismo.',
  ],
  accessTitle: 'Accesibilidad para todos',
  accessLead: 'FluidLearn ha sido desarrollado bajo principios de inclusión educativa:',
  accessItems: [
    'Modo oscuro.',
    'Ajuste de tamaño de letra (+A / −A).',
    'Compatibilidad con lectores de pantalla.',
    'Navegación mediante teclado.',
    'Diseño adaptable a cualquier dispositivo.',
    'Alto contraste visual.',
  ],
  reviewsTitle: '¿Qué opinan nuestros estudiantes?',
  reviewsLead:
    'FluidLearn es la plataforma EdTech de la Universidad Simón Bolívar – MacondoLab. Estudiantes de colegio y universidad ya usan el curso guiado para avanzar de nivel con práctica diaria e Inteligencia Artificial.',
  reviews: [
    {
      quote:
        'El plan intensivo me ayudó a organizar 20 minutos al día. La IA me dice qué reforzar y los profesores conectados me sacaron de dudas en speaking. En pocas semanas noté que entendía más y hablaba con más seguridad.',
      name: 'Camila R.',
      place: 'Cúcuta',
    },
    {
      quote:
        'Necesitaba cumplir el requisito de inglés de la universidad. FluidLearn se adaptó a mi horario, pude estudiar en el celular y el dashboard me mostró el progreso real. Recomiendo el curso intensivo si quieres resultados sin dejar de lado el resto de materias.',
      name: 'Andrés M.',
      place: 'Barranquilla',
    },
  ],
  closeTitle: '¿A qué esperas? Aprende inglés gratis ahora',
  closeLead:
    'No importa si comienzas desde cero o si ya tienes conocimientos previos. Con FluidLearn podrás mejorar tu inglés de forma práctica, accesible y personalizada.',
  closeItems: [
    'Descubre tu nivel',
    'Aprende con Inteligencia Artificial',
    'Recibe apoyo de profesores',
    'Avanza más rápido hacia tus metas',
  ],
  closeCta: 'Empieza tu curso gratis',
}

const en: IntensiveCopy = {
  heroTitle: 'Intensive online English course',
  heroLead:
    'Give your English a boost. Learn intensively, wherever and whenever you want, with Artificial Intelligence, connected teachers and personalized learning paths.',
  startKicker: 'Start for free',
  startLead:
    'Take your placement test and begin a program designed to help you reach academic and professional goals in less time.',
  startCta: 'Start for free',
  intro: [
    'Follow the study plan we propose and get the best results in a short time.',
    'Our guided English course also adapts to your level, interests and goals, so you have an outstanding experience while you learn.',
  ],
  whyTitle: 'Why take an intensive English course?',
  whyLead:
    'There are countless reasons to learn English. Whatever your context or previous experience, these are five reasons to take an intensive online English course with FluidLearn.',
  whyItems: [
    {
      title: 'You will learn the language faster',
      body: 'With consistent practice you will move up a level in less time and see results sooner.',
    },
    {
      title: 'You will use specialized learning materials',
      body: 'Access content designed specifically to build language skills and reach your goals faster.',
    },
    {
      title: 'You will get more exposure to English',
      body: 'The more you interact with the language, the more natural it becomes to understand, speak and write it.',
    },
    {
      title: 'You will get a better cost-benefit ratio',
      body: 'You invest resources — money, time and effort — and you will see the benefit in the short term.',
    },
    {
      title: 'An intensive online course gives you flexibility',
      body: 'Learn when you want, from where you want and at your own pace, on the devices that fit your life.',
    },
    {
      title: 'Better academic results',
      body: 'Strengthen the skills you need to meet university and professional requirements.',
    },
  ],
  differentTitle: 'Why is FluidLearn’s intensive course different?',
  differentLead:
    'FluidLearn was designed for university and secondary students who need to strengthen their English for academic, work and personal goals. Our method combines:',
  differentItems: [
    'Educational Artificial Intelligence.',
    'Connected teachers.',
    'Microlearning.',
    'Automatic assessments.',
    'Academic dashboard.',
    'Constant Speaking, Reading, Writing and Listening practice.',
  ],
  paceTitle: 'Learn at your own pace',
  paceLead:
    'Not every student learns at the same speed. FluidLearn lets you build your own study plan and move forward according to your availability. You decide:',
  paceItems: [
    'When to study.',
    'Which device to learn from.',
    'How much time to spend on English.',
    'Which goals to reach.',
  ],
  methodTitle: 'Learn, Practice and Communicate',
  methodLead: 'Every lesson is designed to help you use the language from day one.',
  method: [
    {
      title: 'Learn',
      body: 'Access interactive content, educational videos and resources adapted to your level.',
    },
    {
      title: 'Practice',
      body: 'Do exercises and grammar, vocabulary and comprehension activities.',
    },
    {
      title: 'Communicate',
      body: 'Build conversation skills with speaking assessed by Artificial Intelligence and connected teachers.',
    },
  ],
  devicesTitle: 'Learn from anywhere',
  devicesLead: 'FluidLearn is fully online. You can access it from:',
  devices: ['Computers', 'Smartphones', 'Tablets'],
  devicesNote: 'Your progress syncs automatically so you can continue where you left off.',
  devicesImageAlt: 'FluidLearn on computer, tablet and phone',
  chooseTitle: 'How do you choose the best intensive English course?',
  chooseLead: [
    'You have decided to take an intensive English course. You search online and the number of offers is huge. How do you pick the course that best fits your needs?',
    'Whatever your reason for learning English, there are a few things to check. Use this checklist to choose well.',
  ],
  chooseItems: [
    {
      title: 'The method should be practical and tied to using the language.',
      body: 'The course should combine learning with the four skills: speaking, reading, writing and listening.',
    },
    {
      title: 'Check what kind of support you get',
      body: 'Online teacher, chat, connected-teacher classes and Artificial Intelligence feedback.',
    },
    {
      title: 'Grammar matters, but it is not the only or most important piece.',
      body: 'Check which platforms you can use (web and app) and that it works on any device.',
    },
    {
      title: 'Consider how much time you need to invest',
      body: 'To reach your goals, and how flexible your weekly study plan can be.',
    },
    {
      title: 'Check whether you get an official certificate',
      body: 'This matters at work and in academia. FluidLearn awards a certificate when you complete a level.',
    },
    {
      title: 'Weigh price against what you actually get.',
      body: 'Also look for continuous follow-up, progress tracking and whether it fits schools and universities.',
    },
  ],
  tipsTitle: 'Tips for effective intensive learning',
  tipsLead:
    'Part of succeeding in English is choosing the right course. It is also important to build a study method that helps you reach your goals. Here are some tips:',
  tipsItems: [
    {
      title: 'Set a weekly goal for study and practice hours.',
      body: 'Decide how many hours you will dedicate to learning each week.',
    },
    {
      title: 'Use the help of your connected teacher',
      body: 'Resolve doubts and improve pronunciation and speaking with specialist teachers.',
    },
    {
      title: 'Decide the time of day you will study.',
      body: 'It does not have to be the same hour every day, but you should study and practice daily, even if it is only 10 or 15 minutes.',
    },
    {
      title: 'Practice constantly and intensively.',
      body: 'Listen to music, watch videos, read articles and use the platform every day.',
    },
    {
      title: 'Plan which device you will learn and practice on.',
      body: 'If the course works on computer, tablet or phone, it is much easier to keep going. FluidLearn syncs your progress.',
    },
    {
      title: 'Review your progress every week.',
      body: 'At the end of the week, take 10 minutes to check whether you met your study time and schedule. Adjust your goals when needed.',
    },
    {
      title: 'Follow your personalized path',
      body: 'FluidLearn’s Artificial Intelligence will recommend what to study based on your results and progress.',
    },
    {
      title: 'Plan what you will practice each day.',
      body: 'This keeps you focused and helps you make the most of every microlearning session.',
    },
  ],
  intensiveQ: 'Is FluidLearn intensive?',
  intensiveLead:
    'FluidLearn was designed for students who, because of work or study, need to learn English effectively, at their own pace and on their own schedule. You decide how and when to study.',
  intensiveItems: [
    {
      title: 'Learn, practice and speak',
      body: 'Every unit is based on real situations that help you learn and speak from day one.',
    },
    {
      title: 'Results in little time',
      body: 'We recommend 30 minutes, 3 or 4 times a week. The course is flexible enough to build a routine around your availability and goals.',
    },
  ],
  onlineQ: 'Is FluidLearn online?',
  onlineLead: [
    'Yes. One of the biggest advantages of studying in the app is that you can download content to practice English offline. That helps you progress faster.',
    'It does not matter if you study on a computer, phone or tablet: your progress is saved independently of the device you are using.',
  ],
  teachersTitle: 'Connected teachers',
  teachersLead: 'Premium students can:',
  teachersItems: [
    'Resolve questions with specialist teachers.',
    'Improve pronunciation and speaking.',
    'Receive personalized guidance.',
    'Get constant feedback.',
  ],
  aiTitle: 'Artificial Intelligence that supports you',
  aiLead: 'FluidLearn uses AI to:',
  aiItems: [
    'Grade exercises automatically.',
    'Score pronunciation.',
    'Detect strengths and weaknesses.',
    'Create personalized learning paths.',
    'Recommend extra practice.',
  ],
  instTitle: 'Built for schools and universities',
  instLead: 'Our platform can integrate with educational institutions to:',
  instItems: [
    'Monitor students.',
    'Generate academic reports.',
    'Set up early alerts.',
    'Strengthen language skills.',
    'Support graduation and bilingualism processes.',
  ],
  accessTitle: 'Accessibility for everyone',
  accessLead: 'FluidLearn was built with educational inclusion in mind:',
  accessItems: [
    'Dark mode.',
    'Text size controls (+A / −A).',
    'Screen reader compatibility.',
    'Keyboard navigation.',
    'A layout that adapts to any device.',
    'High visual contrast.',
  ],
  reviewsTitle: 'What do our students say?',
  reviewsLead:
    'FluidLearn is the EdTech platform of Universidad Simón Bolívar – MacondoLab. School and university students already use the guided course to move up a level with daily practice and Artificial Intelligence.',
  reviews: [
    {
      quote:
        'The intensive plan helped me organize 20 minutes a day. AI tells me what to reinforce and connected teachers cleared up my speaking doubts. In a few weeks I understood more and spoke with more confidence.',
      name: 'Camila R.',
      place: 'Cúcuta',
    },
    {
      quote:
        'I needed to meet my university English requirement. FluidLearn fit my schedule, I could study on my phone and the dashboard showed real progress. I recommend the intensive course if you want results without dropping your other subjects.',
      name: 'Andrés M.',
      place: 'Barranquilla',
    },
  ],
  closeTitle: 'What are you waiting for? Learn English for free now',
  closeLead:
    'It does not matter if you start from scratch or already know some English. With FluidLearn you can improve in a practical, accessible and personalized way.',
  closeItems: [
    'Discover your level',
    'Learn with Artificial Intelligence',
    'Get support from teachers',
    'Move faster toward your goals',
  ],
  closeCta: 'Start your course for free',
}

export function getIntensiveCopy(lang: LandingLangCode): IntensiveCopy {
  return lang === 'es' ? es : en
}

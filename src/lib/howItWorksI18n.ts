import type { LandingLangCode } from './landingI18n'

export type HowItWorksCopy = {
  heroTitle: string
  heroSubtitle: string
  heroCta: string
  intro: string
  courseTitle: string
  courseText: string
  courseImageAlt: string
  classesTitle: string
  classesText: string
  classesItems: string[]
  teacherTitle: string
  teacherText: string
  aiTitle: string
  aiText: string
  aiItems: string[]
  methodologyTitle: string
  methodologyText: string
  methodology: { title: string; text: string }[]
  timeTitle: string
  timeText: string
  timeItems: string[]
  devicesTitle: string
  devices: string[]
  dashboardTitle: string
  dashboardItems: string[]
  institutionsTitle: string
  institutionsItems: string[]
  accessibilityTitle: string
  accessibility: string[]
  journeyTitle: string
  journeyText: string
  startCta: string
  accountCta: string
}

const en: HowItWorksCopy = {
  heroTitle: 'Here you will learn English',
  heroSubtitle: 'Students from schools and universities confirm the effectiveness of FluidLearn.',
  heroCta: 'I want to learn English',
  intro: 'FluidLearn is your platform to learn English for real. Whether you have studied before or not, we support you with all the practical and theoretical resources you need. In a short time, you can advance your level and earn your FluidLearn certificate.',
  courseTitle: 'Learn with a video-based course',
  courseText: 'Our course covers units organized into 6 levels (A1 to C2) and is designed to work on a computer, mobile phone or tablet. Each unit begins with a short film that places English in real life. Then you practice speaking, writing, vocabulary and grammar.',
  courseImageAlt: 'FluidLearn English course on mobile devices',
  classesTitle: 'Get classes and ongoing support',
  classesText: 'Learning English is not just about memorizing rules. FluidLearn gives you spaces to practice conversation, ask connected teachers questions and receive personalized feedback.',
  classesItems: ['Practice conversation in English.', 'Ask connected teachers questions.', 'Receive personalized feedback.', 'Take part in collaborative activities.', 'Build confidence when communicating.'],
  teacherTitle: 'Count on your teacher',
  teacherText: 'From day one, specialized teachers help you with questions, grammar, pronunciation and certification preparation.',
  aiTitle: 'Artificial Intelligence that helps you improve',
  aiText: 'AI is an intelligent tutor that supports you throughout the process.',
  aiItems: ['Automatically assess exercises.', 'Analyze pronunciation and speaking.', 'Generate personalized recommendations.', 'Detect strengths and areas for improvement.', 'Adapt your learning path to your performance.'],
  methodologyTitle: 'Our learning methodology',
  methodologyText: 'Practical and immersive learning to communicate for real, with the four essential skills.',
  methodology: [
    { title: 'Listening', text: 'Audio, videos and interactive exercises.' },
    { title: 'Speaking', text: 'Pronunciation and conversation with AI and teachers.' },
    { title: 'Reading', text: 'Texts adapted to each level.' },
    { title: 'Writing', text: 'Writing with automatic feedback.' },
  ],
  timeTitle: 'Learning adapted to your schedule',
  timeText: 'Microlearning: 10- to 15-minute lessons to advance without interrupting the rest of your academic life.',
  timeItems: ['Learn consistently.', 'Stay motivated.', 'Progress without affecting your other activities.', 'Study from any device.'],
  devicesTitle: 'Learn from any device',
  devices: ['Computer', 'Smartphone', 'Tablet'],
  dashboardTitle: 'Academic dashboard and tracking',
  dashboardItems: ['Performance reports.', 'Progress percentage.', 'Assessment results.', 'Strengthened skills.', 'AI recommendations.', 'Personalized academic alerts.'],
  institutionsTitle: 'Designed for schools and universities',
  institutionsItems: ['Monitor students.', 'Generate academic reports.', 'Strengthen language skills.', 'Reduce classroom workload through self-directed learning.', 'Support English graduation requirements.', 'Implement a scalable language program.'],
  accessibilityTitle: 'Inclusive and accessible education',
  accessibility: ['🌙 Dark mode', '🔠 +A / −A', '👁️ High contrast', 'Screen readers', 'Keyboard'],
  journeyTitle: 'Start your journey to fluency',
  journeyText: 'Take your level test, receive your personalized path and learn with AI and connected teachers.',
  startCta: 'Start free now',
  accountCta: 'Create account',
}

const es: HowItWorksCopy = {
  ...en,
  heroTitle: 'Aquí vas a aprender inglés',
  heroSubtitle: 'Estudiantes de colegios y universidades avalan la eficacia de FluidLearn.',
  heroCta: 'Quiero aprender inglés',
  intro: 'FluidLearn es tu plataforma para aprender inglés de verdad. No importa si ya estudiaste antes: te acompañamos con todos los recursos prácticos y teóricos que necesitas. En poco tiempo puedes subir de nivel y obtener tu certificado FluidLearn.',
  courseTitle: 'Aprendes con un curso basado en vídeos',
  courseText: 'Nuestro curso cubre unidades organizadas en 6 niveles (A1 a C2) y está pensado para que puedas seguirlo en computador, móvil o tablet. Cada unidad empieza con un cortometraje que sitúa el inglés en la vida real. Luego practicas con ejercicios de habla, escritura, vocabulario y gramática.',
  courseImageAlt: 'Curso de inglés FluidLearn en dispositivos móviles',
  classesTitle: 'Tienes clases y acompañamiento permanente',
  classesText: 'Aprender inglés no es solo memorizar reglas. FluidLearn te da espacios para practicar conversación, resolver dudas con profesores conectados y recibir retroalimentación personalizada.',
  classesItems: ['Practicar conversación en inglés.', 'Resolver dudas con profesores conectados.', 'Recibir retroalimentación personalizada.', 'Participar en actividades colaborativas.', 'Desarrollar confianza al comunicarte.'],
  teacherTitle: 'Cuenta con tu teacher',
  teacherText: 'Desde el primer día, docentes especializados te ayudan con dudas, gramática, pronunciación y preparación para certificaciones.',
  aiTitle: 'Inteligencia Artificial que te ayuda a mejorar',
  aiText: 'La IA es un tutor inteligente que te acompaña en todo el proceso.',
  aiItems: ['Evaluar automáticamente ejercicios.', 'Analizar pronunciación y speaking.', 'Generar recomendaciones personalizadas.', 'Detectar fortalezas y oportunidades de mejora.', 'Adaptar tu ruta de aprendizaje según tu rendimiento.'],
  methodologyTitle: 'Nuestra metodología de aprendizaje',
  methodologyText: 'Aprendizaje práctico e inmersivo para comunicarte de verdad, con las cuatro habilidades fundamentales.',
  methodology: [{ title: 'Listening', text: 'Audios, videos y ejercicios interactivos.' }, { title: 'Speaking', text: 'Pronunciación y conversación con IA y profesores.' }, { title: 'Reading', text: 'Textos adaptados a cada nivel.' }, { title: 'Writing', text: 'Escritura con retroalimentación automática.' }],
  timeTitle: 'Aprendizaje adaptado a tu tiempo',
  timeText: 'Microlearning: lecciones de 10 a 15 minutos para avanzar sin frenar el resto de tu vida académica.',
  timeItems: ['Aprender de manera constante.', 'Mantener la motivación.', 'Avanzar sin afectar tus demás actividades.', 'Estudiar desde cualquier dispositivo.'],
  devicesTitle: 'Aprende desde cualquier dispositivo',
  devices: ['Computador', 'Smartphone', 'Tablet'],
  dashboardTitle: 'Dashboard académico y seguimiento',
  dashboardItems: ['Reportes de desempeño.', 'Porcentaje de progreso.', 'Resultados de evaluaciones.', 'Habilidades fortalecidas.', 'Recomendaciones de la IA.', 'Alertas académicas personalizadas.'],
  institutionsTitle: 'Diseñado para colegios y universidades',
  institutionsItems: ['Monitorear estudiantes.', 'Generar reportes académicos.', 'Fortalecer competencias lingüísticas.', 'Reducir la carga presencial con aprendizaje autónomo.', 'Apoyar requisitos de graduación de inglés.', 'Implementar un programa de idiomas escalable.'],
  accessibilityTitle: 'Educación inclusiva y accesible',
  accessibility: ['🌙 Modo oscuro', '🔠 +A / −A', '👁️ Alto contraste', 'Lectores de pantalla', 'Teclado'],
  journeyTitle: 'Comienza tu camino hacia la fluidez',
  journeyText: 'Realiza tu prueba de nivel, recibe tu ruta personalizada y aprende con IA y profesores conectados.',
  startCta: 'Comenzar gratis ahora',
  accountCta: 'Crear cuenta',
}

const pt: HowItWorksCopy = {
  ...en,
  heroTitle: 'Aqui você vai aprender inglês',
  heroSubtitle: 'Estudantes de escolas e universidades comprovam a eficácia da FluidLearn.',
  heroCta: 'Quero aprender inglês',
  intro: 'A FluidLearn é a sua plataforma para aprender inglês de verdade. Não importa se já estudou antes: acompanhamos você com todos os recursos práticos e teóricos necessários. Em pouco tempo, você pode avançar de nível e obter o seu certificado FluidLearn.',
  courseTitle: 'Aprenda com um curso baseado em vídeos',
  courseText: 'O nosso curso tem unidades organizadas em 6 níveis (A1 a C2) e foi pensado para computador, celular ou tablet. Cada unidade começa com um curta-metragem que coloca o inglês na vida real. Depois, você pratica fala, escrita, vocabulário e gramática.',
  classesTitle: 'Tenha aulas e acompanhamento contínuo',
  classesText: 'Aprender inglês não é apenas memorizar regras. A FluidLearn oferece espaços para praticar conversação, tirar dúvidas com professores conectados e receber feedback personalizado.',
  classesItems: ['Praticar conversação em inglês.', 'Tirar dúvidas com professores conectados.', 'Receber feedback personalizado.', 'Participar de atividades colaborativas.', 'Desenvolver confiança ao se comunicar.'],
  teacherTitle: 'Conte com o seu professor',
  teacherText: 'Desde o primeiro dia, professores especializados ajudam você com dúvidas, gramática, pronúncia e preparação para certificações.',
  aiTitle: 'Inteligência Artificial que ajuda você a melhorar',
  aiText: 'A IA é um tutor inteligente que acompanha você durante todo o processo.',
  aiItems: ['Avaliar exercícios automaticamente.', 'Analisar pronúncia e speaking.', 'Gerar recomendações personalizadas.', 'Detectar pontos fortes e oportunidades de melhoria.', 'Adaptar o seu caminho de aprendizagem ao seu desempenho.'],
  methodologyTitle: 'A nossa metodologia de aprendizagem',
  methodologyText: 'Aprendizagem prática e imersiva para você se comunicar de verdade, com as quatro habilidades essenciais.',
  methodology: [{ title: 'Listening', text: 'Áudios, vídeos e exercícios interativos.' }, { title: 'Speaking', text: 'Pronúncia e conversação com IA e professores.' }, { title: 'Reading', text: 'Textos adaptados a cada nível.' }, { title: 'Writing', text: 'Escrita com feedback automático.' }],
  timeTitle: 'Aprendizagem adaptada ao seu tempo',
  timeText: 'Microlearning: aulas de 10 a 15 minutos para avançar sem interromper o resto da sua vida acadêmica.',
  timeItems: ['Aprender de forma constante.', 'Manter a motivação.', 'Avançar sem afetar as suas outras atividades.', 'Estudar em qualquer dispositivo.'],
  devicesTitle: 'Aprenda em qualquer dispositivo',
  devices: ['Computador', 'Smartphone', 'Tablet'],
  dashboardTitle: 'Dashboard acadêmico e acompanhamento',
  dashboardItems: ['Relatórios de desempenho.', 'Percentual de progresso.', 'Resultados das avaliações.', 'Habilidades fortalecidas.', 'Recomendações da IA.', 'Alertas acadêmicos personalizados.'],
  institutionsTitle: 'Projetado para escolas e universidades',
  institutionsItems: ['Monitorar estudantes.', 'Gerar relatórios acadêmicos.', 'Fortalecer competências linguísticas.', 'Reduzir a carga presencial com aprendizagem autônoma.', 'Apoiar requisitos de graduação em inglês.', 'Implementar um programa de idiomas escalável.'],
  accessibilityTitle: 'Educação inclusiva e acessível',
  accessibility: ['🌙 Modo escuro', '🔠 +A / −A', '👁️ Alto contraste', 'Leitores de tela', 'Teclado'],
  journeyTitle: 'Comece o seu caminho para a fluência',
  journeyText: 'Faça o teste de nível, receba o seu percurso personalizado e aprenda com IA e professores conectados.',
  startCta: 'Começar grátis agora',
  accountCta: 'Criar conta',
}

const it: HowItWorksCopy = {
  ...en,
  heroTitle: 'Qui imparerai l’inglese',
  heroSubtitle: 'Studenti di scuole e università confermano l’efficacia di FluidLearn.',
  heroCta: 'Voglio imparare l’inglese',
  intro: 'FluidLearn è la tua piattaforma per imparare davvero l’inglese. Che tu abbia già studiato o meno, ti accompagniamo con tutte le risorse pratiche e teoriche di cui hai bisogno. In poco tempo puoi avanzare di livello e ottenere il tuo certificato FluidLearn.',
  courseTitle: 'Impara con un corso basato sui video',
  courseText: 'Il nostro corso comprende unità organizzate in 6 livelli (da A1 a C2) ed è pensato per computer, cellulare o tablet. Ogni unità inizia con un cortometraggio che porta l’inglese nella vita reale. Poi pratichi conversazione, scrittura, vocabolario e grammatica.',
  classesTitle: 'Lezioni e supporto continuo',
  classesText: 'Imparare l’inglese non significa solo memorizzare regole. FluidLearn ti offre spazi per praticare la conversazione, chiarire i dubbi con insegnanti connessi e ricevere feedback personalizzato.',
  classesItems: ['Praticare la conversazione in inglese.', 'Chiarire i dubbi con insegnanti connessi.', 'Ricevere feedback personalizzato.', 'Partecipare ad attività collaborative.', 'Sviluppare sicurezza nella comunicazione.'],
  teacherTitle: 'Conta sul tuo insegnante',
  teacherText: 'Dal primo giorno, insegnanti specializzati ti aiutano con dubbi, grammatica, pronuncia e preparazione alle certificazioni.',
  aiTitle: 'L’intelligenza artificiale ti aiuta a migliorare',
  aiText: 'L’IA è un tutor intelligente che ti accompagna durante tutto il percorso.',
  aiItems: ['Valutare automaticamente gli esercizi.', 'Analizzare pronuncia e speaking.', 'Generare raccomandazioni personalizzate.', 'Rilevare punti di forza e opportunità di miglioramento.', 'Adattare il percorso di apprendimento alle tue prestazioni.'],
  methodologyTitle: 'Il nostro metodo di apprendimento',
  methodologyText: 'Apprendimento pratico e immersivo per comunicare davvero, con le quattro competenze fondamentali.',
  methodology: [{ title: 'Listening', text: 'Audio, video ed esercizi interattivi.' }, { title: 'Speaking', text: 'Pronuncia e conversazione con IA e insegnanti.' }, { title: 'Reading', text: 'Testi adattati a ogni livello.' }, { title: 'Writing', text: 'Scrittura con feedback automatico.' }],
  timeTitle: 'Apprendimento adattato al tuo tempo',
  timeText: 'Microlearning: lezioni da 10 a 15 minuti per avanzare senza fermare il resto della tua vita accademica.',
  timeItems: ['Imparare con costanza.', 'Mantenere la motivazione.', 'Avanzare senza influire sulle altre attività.', 'Studiare da qualsiasi dispositivo.'],
  devicesTitle: 'Impara da qualsiasi dispositivo',
  devices: ['Computer', 'Smartphone', 'Tablet'],
  dashboardTitle: 'Dashboard accademica e monitoraggio',
  dashboardItems: ['Report delle prestazioni.', 'Percentuale di progresso.', 'Risultati delle valutazioni.', 'Competenze rafforzate.', 'Raccomandazioni dell’IA.', 'Avvisi accademici personalizzati.'],
  institutionsTitle: 'Progettato per scuole e università',
  institutionsItems: ['Monitorare gli studenti.', 'Generare report accademici.', 'Rafforzare le competenze linguistiche.', 'Ridurre il carico in presenza con l’apprendimento autonomo.', 'Supportare i requisiti di laurea in inglese.', 'Implementare un programma linguistico scalabile.'],
  accessibilityTitle: 'Educazione inclusiva e accessibile',
  accessibility: ['🌙 Modalità scura', '🔠 +A / −A', '👁️ Alto contrasto', 'Lettori dello schermo', 'Tastiera'],
  journeyTitle: 'Inizia il tuo percorso verso la fluidità',
  journeyText: 'Fai il test di livello, ricevi il tuo percorso personalizzato e impara con IA e insegnanti connessi.',
  startCta: 'Inizia gratis ora',
  accountCta: 'Crea account',
}
const de: HowItWorksCopy = {
  ...en,
  heroTitle: 'Hier lernst du Englisch',
  heroSubtitle: 'Schülerinnen, Schüler und Studierende bestätigen die Wirksamkeit von FluidLearn.',
  heroCta: 'Ich möchte Englisch lernen',
  intro: 'FluidLearn ist deine Plattform, um wirklich Englisch zu lernen. Egal, ob du schon gelernt hast: Wir begleiten dich mit allen praktischen und theoretischen Ressourcen, die du brauchst. In kurzer Zeit kannst du dein Niveau verbessern und dein FluidLearn-Zertifikat erhalten.',
  courseTitle: 'Lerne mit einem videobasierten Kurs',
  courseText: 'Unser Kurs umfasst Einheiten in 6 Niveaus (A1 bis C2) und ist für Computer, Handy oder Tablet konzipiert. Jede Einheit beginnt mit einem Kurzfilm, der Englisch ins echte Leben bringt. Danach übst du Sprechen, Schreiben, Wortschatz und Grammatik.',
  classesTitle: 'Unterricht und kontinuierliche Begleitung',
  classesText: 'Englischlernen bedeutet nicht nur, Regeln auswendig zu lernen. FluidLearn bietet dir Räume zum Konversationsüben, zur Klärung von Fragen mit verbundenen Lehrkräften und für persönliches Feedback.',
  classesItems: ['Englische Konversation üben.', 'Fragen mit verbundenen Lehrkräften klären.', 'Persönliches Feedback erhalten.', 'An gemeinsamen Aktivitäten teilnehmen.', 'Sicherheit beim Kommunizieren entwickeln.'],
  teacherTitle: 'Verlass dich auf deine Lehrkraft',
  teacherText: 'Von Anfang an helfen dir spezialisierte Lehrkräfte bei Fragen, Grammatik, Aussprache und der Vorbereitung auf Zertifikate.',
  aiTitle: 'Künstliche Intelligenz hilft dir, besser zu werden',
  aiText: 'Die KI ist ein intelligenter Tutor, der dich durch den gesamten Prozess begleitet.',
  aiItems: ['Übungen automatisch bewerten.', 'Aussprache und Speaking analysieren.', 'Personalisierte Empfehlungen erstellen.', 'Stärken und Verbesserungsmöglichkeiten erkennen.', 'Deinen Lernweg an deine Leistung anpassen.'],
  methodologyTitle: 'Unsere Lernmethodik',
  methodologyText: 'Praktisches und immersives Lernen für echte Kommunikation mit den vier grundlegenden Fähigkeiten.',
  methodology: [{ title: 'Listening', text: 'Audio, Videos und interaktive Übungen.' }, { title: 'Speaking', text: 'Aussprache und Konversation mit KI und Lehrkräften.' }, { title: 'Reading', text: 'Texte für jedes Niveau.' }, { title: 'Writing', text: 'Schreiben mit automatischem Feedback.' }],
  timeTitle: 'Lernen passend zu deiner Zeit',
  timeText: 'Microlearning: 10- bis 15-minütige Lektionen, damit du vorankommst, ohne dein akademisches Leben zu unterbrechen.',
  timeItems: ['Regelmäßig lernen.', 'Motiviert bleiben.', 'Vorankommen, ohne andere Aktivitäten zu beeinträchtigen.', 'Mit jedem Gerät lernen.'],
  devicesTitle: 'Lerne mit jedem Gerät',
  devices: ['Computer', 'Smartphone', 'Tablet'],
  dashboardTitle: 'Akademisches Dashboard und Fortschritt',
  dashboardItems: ['Leistungsberichte.', 'Fortschrittsanteil.', 'Bewertungsergebnisse.', 'Gestärkte Fähigkeiten.', 'KI-Empfehlungen.', 'Personalisierte akademische Hinweise.'],
  institutionsTitle: 'Für Schulen und Universitäten entwickelt',
  institutionsItems: ['Studierende überwachen.', 'Akademische Berichte erstellen.', 'Sprachkenntnisse stärken.', 'Präsenzaufwand durch selbstständiges Lernen reduzieren.', 'Anforderungen für den englischen Studienabschluss unterstützen.', 'Ein skalierbares Sprachprogramm umsetzen.'],
  accessibilityTitle: 'Inklusive und zugängliche Bildung',
  accessibility: ['🌙 Dunkelmodus', '🔠 +A / −A', '👁️ Hoher Kontrast', 'Screenreader', 'Tastatur'],
  journeyTitle: 'Starte deinen Weg zur Sprachsicherheit',
  journeyText: 'Mach deinen Einstufungstest, erhalte deinen persönlichen Lernweg und lerne mit KI und verbundenen Lehrkräften.',
  startCta: 'Jetzt kostenlos starten',
  accountCta: 'Konto erstellen',
}

const BY_CODE: Record<LandingLangCode, HowItWorksCopy> = { es, en, it, de, pt, 'en-US': en, 'en-CA': en, 'en-GB': en, 'pt-BR': pt }

export function getHowItWorksCopy(code: LandingLangCode): HowItWorksCopy {
  return BY_CODE[code] ?? es
}

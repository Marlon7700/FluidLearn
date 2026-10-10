export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'h2'; text: string; id?: string }
  | { type: 'h3'; text: string }

export type LegalDoc = {
  slug: 'condiciones-particulares' | 'condiciones-generales' | 'privacidad'
  title: string
  subtitle: string
  updated: string
  blocks: LegalBlock[]
}

export const LEGAL_DOCS: Record<LegalDoc['slug'], LegalDoc> = {
  'condiciones-particulares': {
    slug: 'condiciones-particulares',
    title: 'Condiciones Particulares de Contratación',
    subtitle: 'FluidLearn · Universidad Simón Bolívar – MacondoLab',
    updated: 'Actualizado: 2026',
    blocks: [
      { type: 'h2', text: 'a) Precio' },
      {
        type: 'ul',
        items: [
          'Cuenta Free (Freemium): gratuita e ilimitada, acceso básico a lecciones diarias.',
          'Cuenta Premium Estudiante: $14.900 COP/mes, incluye acceso completo, trazabilidad académica, inteligencia artificial que califica automáticamente, profesores conectados para retroalimentación y simuladores de examen.',
          'Cuenta Institucional (B2B2C): desde $34.900 COP, licencias masivas para universidades y colegios, con dashboard académico para coordinadores.',
        ],
      },
      {
        type: 'p',
        text: 'Los precios incluyen impuestos vigentes. FluidLearn se reserva el derecho de modificar tarifas sin previo aviso, sin afectar suscripciones ya confirmadas.',
      },
      { type: 'h2', text: 'b) Términos, condiciones y formas de pago' },
      {
        type: 'ul',
        items: [
          'Suscripciones disponibles en modalidad mensual, semestral, anual o institucional.',
          'Pagos mediante tarjeta de crédito/débito (Visa, MasterCard) u otros métodos habilitados.',
          'Los cargos se realizan automáticamente según la periodicidad elegida (mensual, semestral, anual).',
        ],
      },
      { type: 'h2', text: 'c) Modalidad de entrega' },
      {
        type: 'ul',
        items: [
          'Todos los cursos se ofrecen online mediante la App FluidLearn (Android/iOS) o plataforma web.',
          'El acceso a los contenidos Premium es inmediato tras la confirmación del pago.',
        ],
      },
      { type: 'h2', text: 'd) Duración y cancelación' },
      {
        type: 'ul',
        items: [
          'Cuenta Free: ilimitada, cancelable en cualquier momento.',
          'Cuenta Premium: duración mensual, semestral o anual, renovable automáticamente.',
          'Derecho de desistimiento: cancelación dentro de los primeros 14 días con devolución del importe.',
          'Cancelación de renovación: hasta 15 días después del vencimiento.',
        ],
      },
      { type: 'h2', text: 'e) Garantías y reclamaciones' },
      {
        type: 'p',
        text: 'En caso de fallas técnicas o defectos en el servicio, FluidLearn procederá a la reparación, sustitución o devolución según corresponda.',
      },
      { type: 'h3', text: 'Reclamos' },
      {
        type: 'ul',
        items: [
          'Universidad Simón Bolívar – sede Cúcuta, Colombia',
          'Correo: info@fluidlearn.com',
        ],
      },
      { type: 'h2', text: 'f) Idiomas del contrato' },
      { type: 'p', text: 'Disponible en: español e inglés.' },
      { type: 'h2', text: 'g) Servicios Premium y Free' },
      {
        type: 'ul',
        items: [
          'Premium: acceso completo a módulos de Listening, Speaking (IA + profesores conectados), Reading y Writing; trazabilidad académica; simuladores de examen; adaptable para cualquier colegio o universidad.',
          'Free: acceso básico a lecciones diarias y práctica limitada.',
          'Uso personal, no transferible ni revendible.',
        ],
      },
      { type: 'h2', text: 'h) Suscripción institucional' },
      {
        type: 'ul',
        items: [
          'Las licencias institucionales permiten homologar horas de práctica independiente y reducir carga presencial.',
          'Incluyen dashboard de alerta temprana para coordinadores académicos.',
          'Adaptable a universidades y colegios de la región.',
        ],
      },
    ],
  },

  'condiciones-generales': {
    slug: 'condiciones-generales',
    title: 'Condiciones Generales para Estudiantes',
    subtitle: 'Plataforma FluidLearn',
    updated: 'Actualizado: 2026',
    blocks: [
      { type: 'h2', text: '1. Acceso y utilización de los servicios' },
      { type: 'h3', text: '1.1. Acceso a la Plataforma' },
      {
        type: 'p',
        text: 'FluidLearn ofrece cursos de inglés online mediante su aplicación móvil y sitio web. El acceso está disponible para estudiantes universitarios y de colegios que requieran cumplir con requisitos de idioma (B1/B2) para graduación.',
      },
      { type: 'h3', text: '1.2. Geolocalización' },
      {
        type: 'p',
        text: 'La App puede solicitar geolocalización para optimizar la experiencia y adaptar contenidos al contexto del estudiante.',
      },
      { type: 'h3', text: '1.3. Edad mínima' },
      {
        type: 'p',
        text: 'El estudiante declara ser mayor de 18 años o contar con autorización institucional para el uso de la plataforma.',
      },
      { type: 'h3', text: '1.4. Aceptación de Condiciones' },
      {
        type: 'p',
        text: 'El acceso implica la aceptación de estas Condiciones Generales y, en su caso, de las Condiciones Particulares de contratación.',
      },
      { type: 'h2', text: '2. Servicios ofrecidos' },
      {
        type: 'ul',
        items: [
          'Cuenta Free (Freemium): acceso gratuito a lecciones básicas de microlearning (10–15 min).',
          'Cuenta Premium Estudiante: $14.900 COP/mes, incluye trazabilidad académica, inteligencia artificial que califica automáticamente, profesores conectados y simuladores de examen.',
          'Cuenta Institucional (B2B2C): licencias masivas para universidades y colegios, con dashboard académico para coordinadores.',
        ],
      },
      {
        type: 'p',
        text: 'FluidLearn se reserva el derecho de introducir nuevos servicios o modificar los existentes.',
      },
      { type: 'h2', text: '3. Registro e identificación' },
      {
        type: 'p',
        text: 'Para usar activamente FluidLearn, el estudiante debe registrarse creando un perfil con correo electrónico y contraseña. Estos datos constituyen su firma electrónica personal e intransferible.',
      },
      { type: 'h2', text: '4. Política de privacidad' },
      {
        type: 'p',
        text: 'Los datos personales proporcionados se tratarán conforme a la Política de Privacidad de FluidLearn, que debe ser aceptada al registrarse.',
      },
      { type: 'h2', text: '5. Responsabilidad de FluidLearn' },
      {
        type: 'ul',
        items: [
          'FluidLearn se compromete a mantener la plataforma en funcionamiento y actualizada.',
          'No se responsabiliza de daños derivados de un uso indebido o negligente por parte del estudiante.',
          'La información de la plataforma es de carácter académico y orientativo.',
        ],
      },
      { type: 'h2', text: '6. Responsabilidad del estudiante' },
      {
        type: 'p',
        text: 'El estudiante se compromete a:',
      },
      {
        type: 'ul',
        items: [
          'Usar la plataforma únicamente para fines académicos.',
          'Respetar la legislación vigente y los derechos de terceros.',
          'No revender ni transferir el servicio a terceros.',
        ],
      },
      { type: 'h2', text: '7. Propiedad intelectual' },
      {
        type: 'p',
        text: 'Todos los contenidos, software, logos y materiales de FluidLearn son propiedad de la plataforma o de sus proveedores, protegidos por la legislación vigente.',
      },
      { type: 'h2', text: '8. Licencia de uso' },
      {
        type: 'p',
        text: 'FluidLearn concede al estudiante una licencia personal, no transferible, para usar la plataforma en dispositivos compatibles. Queda prohibida la ingeniería inversa, copia o redistribución sin autorización.',
      },
      { type: 'h2', text: '9. Acceso desde dispositivos móviles' },
      {
        type: 'p',
        text: 'El acceso móvil está incluido sin costo adicional, aunque el operador de telefonía puede aplicar tarifas de datos.',
      },
      { type: 'h2', text: '10. Legislación aplicable' },
      {
        type: 'p',
        text: 'El acceso y uso de FluidLearn se regirá por la legislación colombiana. En caso de conflicto, se aplicarán los mecanismos de resolución previstos por la normativa vigente.',
      },
    ],
  },

  privacidad: {
    slug: 'privacidad',
    title: 'Política de Privacidad',
    subtitle: 'FluidLearn · Protección de datos personales',
    updated: 'Actualizado: 2026',
    blocks: [
      { type: 'h2', text: '1. Responsable del tratamiento de datos' },
      {
        type: 'ul',
        items: [
          'Identidad: FluidLearn – Universidad Simón Bolívar, sede Cúcuta – MacondoLab',
          'Correo electrónico de contacto: info@fluidlearn.com',
          'Delegado de Protección de Datos: privacidad@fluidlearn.com',
        ],
      },
      { type: 'h2', text: '2. Información que recopilamos' },
      { type: 'p', text: 'Al registrarte en FluidLearn recopilamos:' },
      {
        type: 'ul',
        items: [
          'Nombre y correo electrónico.',
          'Datos de acceso (usuario y contraseña).',
          'Progreso académico en Listening, Speaking, Reading y Writing.',
          'Datos técnicos: dispositivo, navegador, sistema operativo, dirección IP.',
          'Actividad de aprendizaje (tiempo de uso, resultados de ejercicios, trazabilidad).',
        ],
      },
      { type: 'h2', text: '3. Uso de la información' },
      { type: 'p', text: 'Tus datos se utilizan para:' },
      {
        type: 'ul',
        items: [
          'Crear y gestionar tu cuenta de estudiante.',
          'Medir tu progreso académico y generar trazabilidad hacia el requisito de graduación.',
          'Proporcionar retroalimentación automática mediante inteligencia artificial y profesores conectados.',
          'Garantizar la seguridad y estabilidad de la plataforma.',
          'Comunicación sobre actualizaciones, promociones o incidencias técnicas.',
        ],
      },
      { type: 'h2', text: '4. Derechos de los estudiantes' },
      {
        type: 'p',
        text: 'De acuerdo con la normativa vigente, tienes derecho a:',
      },
      {
        type: 'ul',
        items: [
          'Acceder a tus datos personales.',
          'Rectificar información incorrecta.',
          'Solicitar la eliminación de tus datos.',
          'Limitar el tratamiento de tus datos.',
          'Portar tus datos en formato legible.',
          'Oponerte al uso de tus datos para fines de marketing.',
        ],
      },
      {
        type: 'p',
        text: 'Para ejercer estos derechos, escribe a privacidad@fluidlearn.com.',
      },
      { type: 'h2', text: '5. Período de almacenamiento' },
      {
        type: 'p',
        text: 'Los datos se conservan mientras mantengas tu cuenta activa. Si cancelas tu suscripción, tus datos se eliminarán o anonimizarán en un plazo máximo de 90 días.',
      },
      { type: 'h2', text: '6. Seguridad' },
      {
        type: 'p',
        text: 'FluidLearn utiliza cifrado SSL, servidores en la nube con arquitectura segura y protocolos de protección contra accesos no autorizados.',
      },
      { type: 'h2', text: '7. Cookies', id: 'cookies' },
      { type: 'p', text: 'Nuestro sitio web utiliza cookies para:' },
      {
        type: 'ul',
        items: [
          'Necesarias: garantizar el correcto funcionamiento de la plataforma.',
          'Funcionales: mejorar la experiencia de usuario.',
          'Analíticas: medir el rendimiento y optimizar contenidos.',
        ],
      },
      {
        type: 'p',
        text: 'Puedes configurar o desactivar cookies desde tu navegador.',
      },
      { type: 'h2', text: '8. Servicios externos' },
      {
        type: 'ul',
        items: [
          'YouTube: para integrar videos educativos.',
          'Google Analytics: para análisis estadístico anónimo del uso de la plataforma.',
          'Chatbot IA: para asistencia personalizada en tiempo real.',
        ],
      },
      { type: 'h2', text: '9. Legislación aplicable' },
      {
        type: 'p',
        text: 'El tratamiento de datos se rige por la legislación colombiana en materia de protección de datos personales (Ley 1581 de 2012 y normas complementarias).',
      },
    ],
  },
}

export function getLegalDoc(slug: string): LegalDoc | null {
  if (slug in LEGAL_DOCS) return LEGAL_DOCS[slug as LegalDoc['slug']]
  return null
}

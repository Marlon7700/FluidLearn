/** Destinos de cada ítem de menú (mismo orden que landingI18n). */

export type MenuLink = { label: string; href: string }

/** Para empezar */
export const START_HREFS = [
  '/test', // Test de nivel
  '/niveles', // Niveles
  '/gramatica', // Videos de gramática inglesa
  '/curso-intensivo', // Curso intensivo
  '#planes', // Conversación
  '/ingles-adultos', // Adultos
  '#comparativa', // Certificados
] as const

/** Nuestro curso */
export const COURSE_HREFS = [
  '/como-funciona', // Cómo funciona
  '/metodo-natural', // Método natural
  '#planes', // Precios
  '/register', // Nuestra app
  '#comparativa', // Certificado FluidLearn
] as const

/** Recursos */
export const RESOURCE_HREFS = [
  '#promociones',
  '/gramatica',
  '#planes',
  '/verbos-modales',
  '/adjetivos',
  '/adverbios',
  '/pronombres',
  '#planes',
  '/consejos',
] as const

/** Recursos del pie: el test de nivel abre la página principal del examen. */
export const FOOTER_RESOURCE_HREFS = [
  '/',
  '/test',
  '/',
  '/#planes',
  '/',
  '/como-funciona',
  '/metodo-natural',
  '/',
  '/gramatica',
  '/verbos-modales',
  '/',
  '/curso-intensivo',
  '/',
  '/',
] as const

function hrefForLabel(label: string, fallback: string): string {
  const n = label.toLowerCase()
  if (n.includes('modal') || n.includes('modales') || n.includes('modais') || n.includes('modali')) {
    return '/verbos-modales'
  }
  if (n.includes('adjetiv') || n.includes('adjectiv') || n.includes('aggettiv') || n.includes('adjektiv')) {
    return '/adjetivos'
  }
  if (n.includes('adverb') || n.includes('avverb') || n.includes('advérb') || n.includes('adverbien')) {
    return '/adverbios'
  }
  if (n.includes('pronoun') || n.includes('pronombre') || n.includes('pronom') || n.includes('pronomen')) {
    return '/pronombres'
  }
  return fallback
}

export function zipMenuLinks(labels: string[], hrefs: readonly string[]): MenuLink[] {
  return labels.map((label, i) => ({
    label,
    href: hrefForLabel(label, hrefs[i] ?? '#planes'),
  }))
}

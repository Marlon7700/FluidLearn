/** Destinos de cada ítem de menú (mismo orden que landingI18n). */

export type MenuLink = { label: string; href: string }

/** Para empezar */
export const START_HREFS = [
  '/test', // Test de nivel
  '/niveles', // Niveles
  '#promociones', // Videos / recursos
  '#planes', // Curso intensivo
  '#planes', // Conversación
  '#planes', // Adultos
  '#comparativa', // Certificados
] as const

/** Nuestro curso */
export const COURSE_HREFS = [
  '/como-funciona', // Cómo funciona
  '/como-funciona', // Método natural
  '#planes', // Precios
  '/register', // Nuestra app
  '#comparativa', // Certificado FluidLearn
] as const

/** Recursos */
export const RESOURCE_HREFS = [
  '#promociones',
  '#planes',
  '#planes',
  '#planes',
  '#planes',
  '#planes',
  '#planes',
  '#planes',
  '#nosotros',
] as const

/** Recursos del pie: el test de nivel abre la página principal del examen. */
export const FOOTER_RESOURCE_HREFS = [
  '/',
  '/test',
  '/',
  '/#planes',
  '/',
  '/#nosotros',
  '/#nosotros',
  '/',
  '/',
  '/',
  '/',
  '/',
  '/',
  '/',
] as const

export function zipMenuLinks(labels: string[], hrefs: readonly string[]): MenuLink[] {
  return labels.map((label, i) => ({
    label,
    href: hrefs[i] ?? '#planes',
  }))
}

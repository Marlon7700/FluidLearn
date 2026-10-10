/** Destinos de cada ítem de menú (mismo orden que landingI18n). */

export type MenuLink = { label: string; href: string }

/** Para empezar */
export const START_HREFS = [
  '#planes', // Test de nivel
  '#planes', // Niveles
  '#promociones', // Videos / recursos
  '#planes', // Curso intensivo
  '#planes', // Conversación
  '#planes', // Adultos
  '#comparativa', // Certificados
] as const

/** Nuestro curso */
export const COURSE_HREFS = [
  '#nosotros', // Cómo funciona
  '#nosotros', // Método natural
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

export function zipMenuLinks(labels: string[], hrefs: readonly string[]): MenuLink[] {
  return labels.map((label, i) => ({
    label,
    href: hrefs[i] ?? '#planes',
  }))
}

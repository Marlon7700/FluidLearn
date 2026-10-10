/** Solo dígitos, máximo 12 (código / carnet estudiantil). */
export function digitsOnlyMax12(value: string): string {
  return value.replace(/\D/g, '').slice(0, 12)
}

export function isValidStudentId(value: string): boolean {
  return /^\d{1,12}$/.test(value.trim())
}

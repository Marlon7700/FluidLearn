import { FirebaseError } from 'firebase/app'

/** Loguea y traduce errores reales de Firestore/Auth. */
export function logAndMessageFirestoreError(context: string, err: unknown): string {
  const code =
    err instanceof FirebaseError
      ? err.code
      : typeof err === 'object' && err && 'code' in err
        ? String((err as { code: string }).code)
        : 'unknown'
  const message = err instanceof Error ? err.message : String(err)

  console.error(`[Firestore] ${context}`, { code, message, err })

  if (code === 'permission-denied') {
    return (
      'permission-denied: Firestore rechazó el guardado. ' +
      'Publica firestore.rules en el proyecto pu-fluidlearn (Firestore → Reglas → Publicar).'
    )
  }
  if (code === 'unauthenticated') {
    return 'unauthenticated: la sesión de Auth no estaba lista al guardar. Intenta de nuevo.'
  }
  if (code === 'unavailable') {
    return 'unavailable: no hay conexión con Firestore. Revisa tu red e inténtalo otra vez.'
  }
  if (code.startsWith('auth/')) {
    if (code === 'auth/email-already-in-use') {
      return 'Ese correo ya está registrado. Ve al login (modo Administración), envía el código a tu correo y entra.'
    }
    if (code === 'auth/weak-password') return 'La contraseña debe tener al menos 6 caracteres.'
    if (code === 'auth/invalid-email') return 'Correo inválido.'
    return `${code}: ${message}`
  }
  return `Error al guardar en Firestore (${code}): ${message}`
}

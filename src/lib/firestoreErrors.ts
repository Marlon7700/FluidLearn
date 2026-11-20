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
      return 'Esta cuenta ya existe. Entra en modo Administración, envía el código a tu correo personal y escríbelo.'
    }
    if (code === 'auth/weak-password') return 'La contraseña debe tener al menos 6 caracteres.'
    if (code === 'auth/invalid-email') return 'Correo inválido.'
    if (code === 'auth/too-many-requests') {
      return 'Firebase bloqueó el login un rato por muchos intentos. Revisa el correo (el código puede llegar igual). Espera 15–30 minutos y pulsa Entrar. No sigas pulsando Enviar código.'
    }
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
      return 'Correo o contraseña no coinciden con Firebase. Prueba «Entrar con Google» o restablece la contraseña.'
    }
    if (code === 'auth/unauthorized-domain') {
      return 'Este dominio de Vercel no está autorizado en Firebase. En Authentication → Settings → Authorized domains añade tu URL (por ejemplo tu-proyecto.vercel.app).'
    }
    if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
      return 'El navegador bloqueó la ventana de Google. Se usará redirección; espera a volver a FluidLearn.'
    }
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
      return 'Cerraste la ventana de Google. Vuelve a intentarlo.'
    }
    if (code === 'auth/account-exists-with-different-credential') {
      return 'Ese Gmail ya existe con otro método. Entra con correo y contraseña.'
    }
    return `${code}: ${message}`
  }
  return `Error al guardar en Firestore (${code}): ${message}`
}

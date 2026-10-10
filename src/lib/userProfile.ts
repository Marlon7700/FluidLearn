import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { User } from 'firebase/auth'
import { db } from '../firebase'
import { emptyProgress } from './skillLevel'
import { logAndMessageFirestoreError } from './firestoreErrors'

export type StudentProfileInput = {
  email: string
  fullName: string
  studentId: string
}

/**
 * Guarda el perfil en `users/{uid}` y verifica que el documento exista
 * antes de considerar el registro exitoso.
 */
export async function saveStudentProfile(user: User, input: StudentProfileInput) {
  const uid = user.uid
  const email = input.email.trim().toLowerCase()
  const fullName = input.fullName.trim()
  const studentId = input.studentId.trim()

  // Token fresco: evita unauthenticated / permission-denied por sesión no lista.
  await user.getIdToken(true)

  const ref = doc(db, 'users', uid)
  const payload = {
    uid,
    email,
    fullName,
    studentId,
    profileComplete: Boolean(fullName && studentId),
    role: 'student' as const,
    createdAt: new Date().toISOString(),
    appLanguage: 'es',
    notifications: {
      dailyReminders: true,
      pendingActivities: true,
      levelUpdates: true,
    },
    skillProgress: emptyProgress(),
    completedTaskIds: [] as string[],
    streakDays: 0,
    feedItems: [] as unknown[],
  }

  try {
    await setDoc(ref, payload, { merge: true })
  } catch (err) {
    throw new Error(logAndMessageFirestoreError(`setDoc users/${uid}`, err))
  }

  // Confirmación real de lectura (el guardado terminó en el servidor).
  let snap
  try {
    snap = await getDoc(ref)
  } catch (err) {
    throw new Error(logAndMessageFirestoreError(`getDoc verify users/${uid}`, err))
  }

  if (!snap.exists()) {
    console.error(`[Firestore] users/${uid} no existe tras setDoc`)
    throw new Error(
      'El perfil no quedó guardado en Firestore (documento ausente tras escribir). Revisa las reglas publicadas.',
    )
  }

  const data = snap.data()
  console.info(`[Firestore] Perfil guardado OK users/${uid}`, {
    email: data.email,
    fullName: data.fullName,
    studentId: data.studentId,
    profileComplete: data.profileComplete,
    createdAt: data.createdAt,
  })

  return { uid, data }
}

import { deleteApp, getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth'
import { deleteDoc, doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import { db, firebaseConfig } from '../firebase'
import { emptyProgress } from './skillLevel'
import { logAndMessageFirestoreError } from './firestoreErrors'

function secondaryAuthApp(): FirebaseApp {
  const name = 'fluidlearn-admin-secondary'
  return getApps().some((a) => a.name === name) ? getApp(name) : initializeApp(firebaseConfig, name)
}

function studentPayload(uid: string, email: string, fullName: string, studentId: string) {
  return {
    uid,
    email,
    fullName: fullName.trim(),
    studentId: studentId.trim(),
    profileComplete: true,
    role: 'student' as const,
    bio: '',
    createdAt: new Date().toISOString(),
    createdByAdmin: true,
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
}

/**
 * Crea Auth + documento Firestore.
 * Escribe con la sesión del estudiante nuevo (secondary app) para que
 * las reglas `request.auth.uid == userId` siempre permitan el create.
 * Reutiliza firebaseConfig del módulo principal (sin otra config).
 */
export async function createStudentByAdmin(p: {
  email: string
  password: string
  fullName: string
  studentId: string
}) {
  const email = p.email.trim().toLowerCase()
  const app = secondaryAuthApp()
  const secondaryAuth = getAuth(app)
  const secondaryDb = getFirestore(app)
  try {
    const cred = await createUserWithEmailAndPassword(secondaryAuth, email, p.password)
    await cred.user.getIdToken(true)
    const ref = doc(secondaryDb, 'users', cred.user.uid)
    const payload = studentPayload(cred.user.uid, email, p.fullName, p.studentId)
    await setDoc(ref, payload)
    const snap = await getDoc(ref)
    if (!snap.exists()) {
      throw new Error('El estudiante no quedó guardado en Firestore.')
    }
    console.info('[Firestore] Estudiante (admin) guardado OK', cred.user.uid)
    await signOut(secondaryAuth)
    return cred.user.uid
  } catch (err) {
    try {
      await signOut(secondaryAuth)
    } catch {
      /* ignore */
    }
    throw new Error(logAndMessageFirestoreError('createStudentByAdmin', err))
  } finally {
    try {
      await deleteApp(app)
    } catch {
      /* ignore */
    }
  }
}

export async function updateStudentByAdmin(
  uid: string,
  p: { fullName: string; studentId: string; email: string; bio?: string },
) {
  try {
    await updateDoc(doc(db, 'users', uid), {
      fullName: p.fullName.trim(),
      studentId: p.studentId.trim(),
      email: p.email.trim().toLowerCase(),
      bio: (p.bio ?? '').trim(),
      profileComplete: true,
      role: 'student',
      updatedAt: new Date().toISOString(),
    })
  } catch (err) {
    throw new Error(logAndMessageFirestoreError(`updateDoc users/${uid}`, err))
  }
}

/** Elimina el perfil en Firestore. La cuenta Auth hay que borrarla en Firebase Console si hace falta. */
export async function deleteStudentByAdmin(uid: string) {
  try {
    await deleteDoc(doc(db, 'users', uid))
  } catch (err) {
    throw new Error(logAndMessageFirestoreError(`deleteDoc users/${uid}`, err))
  }
}

export function firebaseErrorMessage(err: unknown) {
  return err instanceof Error ? err.message : logAndMessageFirestoreError('adminStudents', err)
}

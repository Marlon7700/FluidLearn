import { deleteApp, initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { firebaseConfig } from '../firebase'

/** Sesión aislada: no toca el Auth principal (evita entrar al panel sin OTP). */
export async function runWithSecondarySession<T>(
  email: string,
  password: string,
  fn: (ctx: { uid: string; email: string; db: Firestore; user: User }) => Promise<T>,
): Promise<T> {
  const app = initializeApp(firebaseConfig, `fl-sec-${crypto.randomUUID()}`)
  const secondaryAuth = getAuth(app)
  const secondaryDb = getFirestore(app)
  try {
    const cred = await signInWithEmailAndPassword(secondaryAuth, email.trim().toLowerCase(), password)
    return await fn({
      uid: cred.user.uid,
      email: cred.user.email ?? email.trim().toLowerCase(),
      db: secondaryDb,
      user: cred.user,
    })
  } finally {
    await signOut(secondaryAuth).catch(() => undefined)
    await deleteApp(app).catch(() => undefined)
  }
}

export async function runWithSecondaryCreate<T>(
  email: string,
  password: string,
  fn: (ctx: { uid: string; email: string; db: Firestore; user: User }) => Promise<T>,
): Promise<T> {
  const app = initializeApp(firebaseConfig, `fl-sec-new-${crypto.randomUUID()}`)
  const secondaryAuth = getAuth(app)
  const secondaryDb = getFirestore(app)
  try {
    const cred = await createUserWithEmailAndPassword(secondaryAuth, email.trim().toLowerCase(), password)
    return await fn({
      uid: cred.user.uid,
      email: cred.user.email ?? email.trim().toLowerCase(),
      db: secondaryDb,
      user: cred.user,
    })
  } finally {
    await signOut(secondaryAuth).catch(() => undefined)
    await deleteApp(app).catch(() => undefined)
  }
}

import { getApp, getApps, initializeApp, type FirebaseOptions } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

function requiredEnv(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name]
  if (!value || String(value).trim() === '') {
    throw new Error(
      `Falta ${name} en .env. Copia .env.example → .env con la config de pu-fluidlearn.`,
    )
  }
  return String(value).trim()
}

/** Proyecto real: pu-fluidlearn. Claves solo desde variables de entorno (no hardcode). */
export const firebaseConfig: FirebaseOptions = {
  apiKey: requiredEnv('VITE_FIREBASE_API_KEY'),
  authDomain: requiredEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: requiredEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: requiredEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: requiredEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: requiredEnv('VITE_FIREBASE_APP_ID'),
  ...(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    ? { measurementId: String(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID).trim() }
    : {}),
}

// Una sola inicialización (evita duplicar si HMR reimporta el módulo).
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()

if (import.meta.env.DEV) {
  // Solo projectId — nunca loguear apiKey ni appId completos.
  console.info('[Firebase] proyecto activo:', firebaseConfig.projectId)
}

import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut as fbSignOut,
  type User,
} from 'firebase/auth'
import {
  arrayUnion,
  deleteField,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Capacitor } from '@capacitor/core'
import { auth, db, firebaseConfig, googleProvider } from '../firebase'
import {
  issueAndSendAdminOtp,
  saveAdminProfile,
  storeAndSendAdminCode,
  type AdminDelivery,
  verifyAdminOtp,
  verifyLegacyAdminCode,
} from '../lib/adminProfile'
import { logAndMessageFirestoreError } from '../lib/firestoreErrors'
import { dateKey, emptyProgress, labelForProgress } from '../lib/skillLevel'
import { isValidStudentId } from '../lib/studentId'
import { saveStudentProfile } from '../lib/userProfile'
import type { CustomAvatar, FeedItem, SkillKey, UserProfile } from '../types'

const ADMIN_EMAILS = new Set(['admin@usb.ve', 'administracion@usb.ve', 'maopromaster11@gmail.com'])

const defaults = {
  appLanguage: 'es',
  notifications: {
    dailyReminders: true,
    pendingActivities: true,
    levelUpdates: true,
  },
  skillProgress: emptyProgress(),
}

function isCustomAvatar(value: unknown): value is CustomAvatar {
  if (!value || typeof value !== 'object') return false
  const v = value as CustomAvatar
  return Boolean(v.skin && v.hair && v.hairStyle && v.eyes && v.shirt)
}

async function finishGoogleUser(user: User) {
  const email = user.email ?? ''
  await user.getIdToken(true)
  const ref = doc(db, 'users', user.uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      email,
      fullName: user.displayName ?? '',
      studentId: '',
      profileComplete: false,
      role: ADMIN_EMAILS.has(email.toLowerCase()) ? 'admin' : 'student',
      createdAt: new Date().toISOString(),
      ...defaults,
    })
    return
  }
  const existing = snap.data()?.role as string | undefined
  const role = existing === 'admin' || ADMIN_EMAILS.has(email.toLowerCase()) ? 'admin' : existing ?? 'student'
  await setDoc(ref, { role, email }, { merge: true })
}

function parseProfile(uid: string, email: string, data: Record<string, unknown> | undefined): UserProfile {
  const sp = (data?.skillProgress as Record<string, number> | undefined) ?? {}
  return {
    uid,
    email: (data?.email as string) || email,
    fullName: (data?.fullName as string) || '',
    studentId: (data?.studentId as string) || '',
    profileComplete: Boolean(data?.profileComplete) || Boolean((data?.fullName as string)?.trim() && (data?.studentId as string)?.trim()),
    bio: (data?.bio as string) || '',
    profilePhotoUrl: data?.profilePhotoUrl as string | undefined,
    avatarIndex: data?.avatarIndex as number | undefined,
    customAvatar: isCustomAvatar(data?.customAvatar) ? data?.customAvatar : undefined,
    role: data?.role === 'admin' || ADMIN_EMAILS.has(email.toLowerCase()) ? 'admin' : 'student',
    emailVerificationCodeHash: (data?.emailVerificationCodeHash as string | undefined) || undefined,
    skillProgress: {
      listening: Number(sp.listening ?? 0),
      speaking: Number(sp.speaking ?? 0),
      reading: Number(sp.reading ?? 0),
      writing: Number(sp.writing ?? 0),
    },
    completedTaskIds: Array.isArray(data?.completedTaskIds) ? data.completedTaskIds.map(String) : [],
    streakDays: Number(data?.streakDays ?? 0),
    streakLastDate: data?.streakLastDate as string | undefined,
    feedItems: Array.isArray(data?.feedItems) ? (data.feedItems as FeedItem[]) : [],
  }
}

interface AuthCtx {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  isAdmin: boolean
  needsProfile: boolean
  signIn: (
    email: string,
    password: string,
    opts?: { adminMode?: boolean; emailVerificationCode?: string },
  ) => Promise<void>
  /** Tras email+password válidos de admin: genera OTP y lo envía al correo personal o institucional. */
  requestAdminEmailCode: (
    email: string,
    password: string,
    delivery: AdminDelivery,
  ) => Promise<{ to: string }>
  signUp: (p: { email: string; password: string; fullName: string; studentId: string }) => Promise<void>
  signUpAdmin: (p: {
    password: string
    fullName: string
    /** Un solo correo según Personal o Institucional. */
    contactEmail: string
    preferredDelivery: AdminDelivery
    /** Código seguro generado por la app (se envía al correo). */
    generatedCode: string
  }) => Promise<{ emailedTo: string; channel: string; needsInboxConfirm?: boolean }>
  google: () => Promise<void>
  completeProfile: (p: {
    fullName: string
    studentId: string
    bio: string
    avatarIndex?: number
    customAvatar?: CustomAvatar | null
  }) => Promise<void>
  signOut: () => Promise<void>
  completeActivity: (p: {
    skillKey: SkillKey
    taskId: string
    taskTitle: string
    overallPercent: number
    quizCorrect: number
    quizTotal: number
  }) => Promise<void>
  resetProgress: () => Promise<void>
  addTeacherNotice: () => Promise<void>
}

const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u)
      if (!u) {
        setProfile(null)
        setLoading(false)
      }
    })
    void getRedirectResult(auth)
      .then((cred) => {
        if (cred?.user) return finishGoogleUser(cred.user)
      })
      .catch(() => undefined)
    return () => unsubAuth()
  }, [])

  useEffect(() => {
    if (!user) return
    const ref = doc(db, 'users', user.uid)
    const unsub = onSnapshot(ref, (snap) => {
      setProfile(parseProfile(user.uid, user.email ?? '', snap.data()))
      setLoading(false)
    })
    return () => unsub()
  }, [user])

  const ensureRole = async (uid: string, email: string, forceAdmin = false) => {
    const ref = doc(db, 'users', uid)
    const snap = await getDoc(ref)
    const existing = snap.data()?.role as string | undefined
    const role =
      forceAdmin || existing === 'admin' || ADMIN_EMAILS.has(email.toLowerCase()) ? 'admin' : existing ?? 'student'
    if (!snap.exists()) {
      await setDoc(ref, {
        uid,
        email: email.toLowerCase(),
        fullName: '',
        studentId: role === 'admin' ? 'ADMIN' : '',
        profileComplete: role === 'admin',
        role,
        createdAt: new Date().toISOString(),
        ...defaults,
      })
      return
    }
    await setDoc(ref, { role, email: email.toLowerCase() }, { merge: true })
  }

  const value = useMemo<AuthCtx>(() => {
    const isAdmin = profile?.role === 'admin'
    const needsProfile = Boolean(user && !isAdmin && !profile?.profileComplete)

    return {
      user,
      profile,
      loading,
      isAdmin,
      needsProfile,
      async signIn(email, password, opts) {
        const cred = await signInWithEmailAndPassword(auth, email, password)
        await ensureRole(cred.user.uid, email)
        const snap = await getDoc(doc(db, 'users', cred.user.uid))
        const data = snap.data()
        const role = data?.role === 'admin' || ADMIN_EMAILS.has(email.toLowerCase()) ? 'admin' : 'student'

        if (opts?.adminMode) {
          if (role !== 'admin') {
            await fbSignOut(auth)
            throw new Error('Esta cuenta no es administrador.')
          }
          const code = opts.emailVerificationCode?.trim() ?? ''
          if (code.length < 4) {
            await fbSignOut(auth)
            throw new Error('Ingresa el código que llegó a tu correo.')
          }
          const otpOk = await verifyAdminOtp(cred.user.uid, code)
          const legacyOk = !otpOk
            ? await verifyLegacyAdminCode(data?.emailVerificationCodeHash as string | undefined, code)
            : false
          if (!otpOk && !legacyOk) {
            await fbSignOut(auth)
            throw new Error('Código incorrecto o vencido. Pulsa «Enviar código» e inténtalo de nuevo.')
          }
          await ensureRole(cred.user.uid, email, true)
        } else if (role === 'admin') {
          await fbSignOut(auth)
          throw new Error('Usa el modo Administración e ingresa el código enviado a tu correo.')
        }
      },
      async requestAdminEmailCode(email, password, delivery) {
        const cred = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password)
        try {
          await ensureRole(cred.user.uid, email)
          const snap = await getDoc(doc(db, 'users', cred.user.uid))
          const role =
            snap.data()?.role === 'admin' || ADMIN_EMAILS.has(email.toLowerCase()) ? 'admin' : 'student'
          if (role !== 'admin') {
            throw new Error('Esta cuenta no es administrador.')
          }
          const { to } = await issueAndSendAdminOtp(cred.user.uid, delivery)
          return { to }
        } finally {
          // Cierra sesión hasta que el admin introduzca el OTP en «Entrar».
          await fbSignOut(auth).catch(() => undefined)
        }
      },
      async signUp({ email, password, fullName, studentId }) {
        if (!isValidStudentId(studentId)) {
          throw new Error('El código estudiantil debe tener entre 1 y 12 dígitos (solo números).')
        }
        console.info('[Auth] Registro estudiante → proyecto', firebaseConfig.projectId)
        const cred = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password)
        try {
          await saveStudentProfile(cred.user, {
            email: email.trim().toLowerCase(),
            fullName,
            studentId,
          })
        } catch (err) {
          await fbSignOut(auth).catch(() => undefined)
          throw err instanceof Error ? err : new Error(logAndMessageFirestoreError('signUp student', err))
        }
        await fbSignOut(auth)
      },
      async signUpAdmin({ password, fullName, contactEmail, preferredDelivery, generatedCode }) {
        const accountEmail = contactEmail.trim().toLowerCase()
        if (!accountEmail) {
          throw new Error('Indica el correo donde recibirás el código.')
        }
        const code = generatedCode.trim()
        if (code.length < 8) {
          throw new Error('El código generado no es válido. Pulsa «Nuevo código».')
        }
        const personal = preferredDelivery === 'personal' ? accountEmail : ''
        const institutional = preferredDelivery === 'institutional' ? accountEmail : ''

        let cred
        try {
          cred = await createUserWithEmailAndPassword(auth, accountEmail, password)
        } catch (err) {
          throw new Error(logAndMessageFirestoreError('signUpAdmin auth', err))
        }
        await cred.user.getIdToken(true)
        const ref = doc(db, 'users', cred.user.uid)
        try {
          await setDoc(ref, {
            uid: cred.user.uid,
            email: accountEmail,
            fullName: fullName.trim(),
            studentId: 'ADMIN',
            profileComplete: true,
            role: 'admin',
            personalEmail: personal,
            institutionalEmail: institutional,
            preferredDelivery,
            emailVerificationEnabled: true,
            createdAt: new Date().toISOString(),
            ...defaults,
          })
          await saveAdminProfile(cred.user, {
            email: accountEmail,
            fullName,
            personalEmail: personal,
            institutionalEmail: institutional,
            preferredDelivery,
          })
          const sent = await storeAndSendAdminCode(
            cred.user.uid,
            code,
            preferredDelivery,
            fullName.trim(),
            60,
          )
          console.info('[Firestore] Admin users+admins OK', cred.user.uid, sent)
          return {
            emailedTo: sent.to,
            channel: sent.channel,
            needsInboxConfirm: sent.needsInboxConfirm,
          }
        } catch (err) {
          await fbSignOut(auth).catch(() => undefined)
          throw err instanceof Error
            ? err
            : new Error(logAndMessageFirestoreError(`setDoc users|admins/${cred.user.uid}`, err))
        } finally {
          await fbSignOut(auth).catch(() => undefined)
        }
      },
      async google() {
        if (Capacitor.isNativePlatform()) {
          await signInWithRedirect(auth, googleProvider)
          return
        }
        try {
          const cred = await signInWithPopup(auth, googleProvider)
          await finishGoogleUser(cred.user)
        } catch (err) {
          const code = typeof err === 'object' && err && 'code' in err ? String((err as { code: string }).code) : ''
          if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
            await signInWithRedirect(auth, googleProvider)
            return
          }
          throw err
        }
      },
      async completeProfile({ fullName, studentId, bio, avatarIndex, customAvatar }) {
        if (!user) return
        const payload: Record<string, unknown> = {
          uid: user.uid,
          email: user.email,
          fullName: fullName.trim(),
          studentId: studentId.trim(),
          bio: bio.trim(),
          profileComplete: true,
        }
        if (customAvatar) {
          payload.customAvatar = customAvatar
          payload.avatarIndex = deleteField()
        } else {
          payload.customAvatar = deleteField()
          if (avatarIndex != null) payload.avatarIndex = avatarIndex
        }
        await setDoc(doc(db, 'users', user.uid), payload, { merge: true })
      },
      async signOut() {
        await fbSignOut(auth)
      },
      async completeActivity({ skillKey, taskId, taskTitle, overallPercent, quizCorrect, quizTotal }) {
        if (!user || !profile) return
        if (profile.completedTaskIds.includes(taskId)) {
          throw new Error('Esta actividad ya está completada.')
        }
        const sp = { ...profile.skillProgress }
        sp[skillKey] = Math.min(1, (sp[skillKey] ?? 0) + 0.12)
        const today = dateKey()
        const yesterday = dateKey(new Date(Date.now() - 86400000))
        let streakDays = profile.streakDays
        if (profile.streakLastDate !== today) {
          streakDays = !profile.streakLastDate ? 1 : profile.streakLastDate === yesterday ? streakDays + 1 : 1
        }
        const feed = [
          {
            title: 'Activity completed · AI feedback',
            body: `${taskTitle}: ${overallPercent}% (${quizCorrect}/${quizTotal})`,
            type: 'activity',
            at: new Date().toISOString(),
          },
          ...profile.feedItems,
        ].slice(0, 40)
        const levels = {
          listening: labelForProgress(sp.listening),
          speaking: labelForProgress(sp.speaking),
          reading: labelForProgress(sp.reading),
          writing: labelForProgress(sp.writing),
        }
        await setDoc(
          doc(db, 'users', user.uid),
          {
            skillProgress: sp,
            skillLevels: levels,
            streakDays,
            streakLastDate: today,
            completedTaskIds: arrayUnion(taskId),
            feedItems: feed,
            recentAssessments: [
              {
                taskId,
                taskTitle,
                skillKey,
                overallPercent,
                quizCorrect,
                quizTotal,
                at: new Date().toISOString(),
              },
            ],
          },
          { merge: true },
        )
      },
      async resetProgress() {
        if (!user) return
        await updateDoc(doc(db, 'users', user.uid), {
          skillProgress: emptyProgress(),
          completedTaskIds: [],
          streakDays: 0,
          streakLastDate: deleteField(),
          feedItems: [],
        })
      },
      async addTeacherNotice() {
        if (!user || !profile) return
        const feed = [
          {
            title: 'New activity from your teacher',
            body: 'A sample listening task was posted. Check Skills to practice.',
            type: 'teacher',
            at: new Date().toISOString(),
          },
          ...profile.feedItems,
        ].slice(0, 40)
        await setDoc(doc(db, 'users', user.uid), { feedItems: feed }, { merge: true })
      },
    }
  }, [user, profile, loading])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

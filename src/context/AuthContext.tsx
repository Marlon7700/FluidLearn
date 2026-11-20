import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  sendPasswordResetEmail,
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
import { isAllowlistedAdminEmail } from '../lib/adminEmails'
import {
  beginAdminOtpChallenge,
  consumeSessionOtp,
  endAdminOtpChallenge,
  ensureAdminRecord,
  hasAdminOtpChallenge,
  issueAndSendAdminOtp,
  issueEmailOnlyAdminOtp,
  peekSessionOtp,
  type AdminDelivery,
  verifyAdminOtp,
  verifyLegacyAdminCode,
} from '../lib/adminProfile'
import { runWithSecondaryCreate, runWithSecondarySession } from '../lib/secondaryFirebase'
import { logAndMessageFirestoreError } from '../lib/firestoreErrors'
import { uploadProfilePhoto } from '../lib/uploadProfilePhoto'
import { dateKey, emptyProgress, labelForProgress } from '../lib/skillLevel'
import { isValidStudentId } from '../lib/studentId'
import { saveStudentProfile } from '../lib/userProfile'
import { parseAppLanguage } from '../lib/studentUi'
import type { AppLanguageCode, Assessment, CustomAvatar, FeedItem, NotificationPrefs, SkillKey, UserProfile } from '../types'

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
      role: isAllowlistedAdminEmail(email) ? 'admin' : 'student',
      createdAt: new Date().toISOString(),
      ...defaults,
    })
    return
  }
  const existing = snap.data()?.role as string | undefined
  const role = existing === 'admin' || isAllowlistedAdminEmail(email) ? 'admin' : existing ?? 'student'
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
    bio: ((data?.description as string) || (data?.bio as string) || ''),
    profilePhotoUrl: data?.profilePhotoUrl as string | undefined,
    avatarIndex: data?.avatarIndex as number | undefined,
    customAvatar: isCustomAvatar(data?.customAvatar) ? data?.customAvatar : undefined,
    role: data?.role === 'admin' || isAllowlistedAdminEmail(email) ? 'admin' : 'student',
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
    recentAssessments: Array.isArray(data?.recentAssessments) ? (data.recentAssessments as Assessment[]) : [],
    appLanguage: parseAppLanguage(data?.appLanguage),
    notifications: {
      dailyReminders: Boolean((data?.notifications as NotificationPrefs | undefined)?.dailyReminders ?? true),
      pendingActivities: Boolean((data?.notifications as NotificationPrefs | undefined)?.pendingActivities ?? true),
      levelUpdates: Boolean((data?.notifications as NotificationPrefs | undefined)?.levelUpdates ?? true),
    },
    practiceMinutes: Number(data?.practiceMinutes ?? 0),
    firstName: String(data?.firstName ?? '').trim() || splitName((data?.fullName as string) || '').first,
    lastName: String(data?.lastName ?? '').trim() || splitName((data?.fullName as string) || '').last,
    country: String(data?.country ?? 'Colombia'),
    city: String(data?.city ?? ''),
    timezone: String(data?.timezone ?? 'America/Bogota'),
    visibility: data?.visibility === 'hidden' ? 'hidden' : 'visible',
    interests: String(data?.interests ?? ''),
    imageAlt: String(data?.imageAlt ?? ''),
    createdAt: data?.createdAt as string | undefined,
    lastAccess: data?.lastAccess as string | undefined,
  }
}

function splitName(full: string) {
  const parts = full.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { first: '', last: '' }
  if (parts.length === 1) return { first: parts[0], last: '' }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

interface AuthCtx {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  isAdmin: boolean
  adminOtpPending: boolean
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
  ) => Promise<{ to: string; needsInboxConfirm?: boolean; throttled?: boolean }>
  signUp: (p: { email: string; password: string; fullName: string; studentId: string }) => Promise<void>
  signUpAdmin: (p: {
    password: string
    fullName: string
    contactEmail: string
    preferredDelivery: AdminDelivery
    generatedCode?: string
  }) => Promise<{
    emailedTo: string
    channel: string
    needsInboxConfirm?: boolean
    alreadyExisted?: boolean
    needsLogin?: boolean
  }>
  google: (opts?: { adminMode?: boolean }) => Promise<void>
  registerAdminWithGoogle: (delivery: AdminDelivery) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  completeProfile: (p: {
    fullName: string
    studentId: string
    bio: string
    avatarIndex?: number
    customAvatar?: CustomAvatar | null
    photoFile?: File | null
    profilePhotoUrl?: string | null
    firstName?: string
    lastName?: string
    country?: string
    city?: string
    timezone?: string
    visibility?: 'visible' | 'hidden'
    interests?: string
    imageAlt?: string
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
  updateStudentSettings: (p: {
    appLanguage?: AppLanguageCode
    notifications?: NotificationPrefs
  }) => Promise<void>
}

const GOOGLE_ADMIN_REGISTER_KEY = 'fluidlearn.adminGoogleRegister'
const GOOGLE_INTENT_KEY = 'fluidlearn.googleIntent'

type GoogleIntent = 'student' | 'admin' | 'admin-register'

function preferGoogleRedirect() {
  return import.meta.env.PROD || Capacitor.isNativePlatform()
}

const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [adminOtpPending, setAdminOtpPending] = useState(() => hasAdminOtpChallenge())

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u)
      if (!u) {
        setProfile(null)
        setLoading(false)
      }
    })
    void getRedirectResult(auth)
      .then(async (cred) => {
        if (!cred?.user) return
        const pendingDelivery = sessionStorage.getItem(GOOGLE_ADMIN_REGISTER_KEY) as AdminDelivery | null
        const intent = (sessionStorage.getItem(GOOGLE_INTENT_KEY) as GoogleIntent | null) || (pendingDelivery ? 'admin-register' : 'student')
        sessionStorage.removeItem(GOOGLE_INTENT_KEY)
        sessionStorage.removeItem(GOOGLE_ADMIN_REGISTER_KEY)
        await finishGoogleUser(cred.user)
        const email = (cred.user.email || '').toLowerCase()
        if (intent === 'admin-register' || pendingDelivery === 'personal' || pendingDelivery === 'institutional') {
          await ensureAdminRecord(db, cred.user.uid, email, pendingDelivery || 'personal', cred.user.displayName || '')
          await ensureRole(cred.user.uid, email, true)
          endAdminOtpChallenge()
          setAdminOtpPending(false)
          return
        }
        if (intent === 'admin') {
          const snap = await getDoc(doc(db, 'users', cred.user.uid))
          const role =
            snap.data()?.role === 'admin' || isAllowlistedAdminEmail(email) ? 'admin' : 'student'
          if (role !== 'admin') {
            await fbSignOut(auth)
            return
          }
          await ensureRole(cred.user.uid, email, true)
          endAdminOtpChallenge()
          setAdminOtpPending(false)
          return
        }
        if (isAllowlistedAdminEmail(email)) {
          endAdminOtpChallenge()
          setAdminOtpPending(false)
        }
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
      forceAdmin || existing === 'admin' || isAllowlistedAdminEmail(email) ? 'admin' : existing ?? 'student'
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
      adminOtpPending,
      needsProfile,
      async signIn(email, password, opts) {
        const account = email.trim().toLowerCase()
        const otpCode = opts?.emailVerificationCode?.trim() ?? ''
        const otpLooksGood = opts?.adminMode && otpCode.length >= 4 ? await peekSessionOtp(account, otpCode) : false

        let uid = auth.currentUser?.uid
        const already = auth.currentUser?.email?.toLowerCase() === account
        if (!already) {
          try {
            const cred = await signInWithEmailAndPassword(auth, account, password)
            uid = cred.user.uid
          } catch (err) {
            const code = err instanceof FirebaseError ? err.code : ''
            if (
              (code === 'auth/invalid-credential' || code === 'auth/wrong-password') &&
              otpLooksGood
            ) {
              throw new Error(
                'El código es válido. La contraseña no coincide con Firebase. Entra con Google (mismo Gmail) o pulsa «Olvidé mi contraseña».',
              )
            }
            throw new Error(logAndMessageFirestoreError('signIn', err))
          }
        }
        if (!uid) throw new Error('No se pudo iniciar sesión.')
        await ensureRole(uid, account)
        const snap = await getDoc(doc(db, 'users', uid))
        const data = snap.data()
        const role = data?.role === 'admin' || isAllowlistedAdminEmail(account) ? 'admin' : 'student'

        if (opts?.adminMode) {
          if (role !== 'admin') {
            endAdminOtpChallenge()
            setAdminOtpPending(false)
            await fbSignOut(auth)
            throw new Error('Esta cuenta no es administrador en Firestore.')
          }
          if (otpCode.length >= 4) {
            const otpOk = await verifyAdminOtp(uid, otpCode)
            const sessionOk = !otpOk ? await consumeSessionOtp(account, otpCode) : false
            const legacyOk =
              !otpOk && !sessionOk
                ? await verifyLegacyAdminCode(data?.emailVerificationCodeHash as string | undefined, otpCode)
                : false
            if (!otpOk && !sessionOk && !legacyOk && !otpLooksGood) {
              throw new Error('Código incorrecto o vencido. Revisa el correo o espera unos minutos.')
            }
            if (!otpOk && !sessionOk && !legacyOk && otpLooksGood) {
              await consumeSessionOtp(account, otpCode)
            }
          }
          endAdminOtpChallenge()
          setAdminOtpPending(false)
          await ensureRole(uid, account, true)
        } else if (role === 'admin') {
          await fbSignOut(auth)
          throw new Error('Usa el modo Administración e ingresa el código enviado a tu correo.')
        }
      },
      async requestAdminEmailCode(email, password, delivery) {
        const account = email.trim().toLowerCase()
        const sendFallback = () => issueEmailOnlyAdminOtp(account)

        const sendWithSession = async (uid: string) => {
          const snap = await getDoc(doc(db, 'users', uid))
          const role =
            snap.data()?.role === 'admin' || isAllowlistedAdminEmail(account) ? 'admin' : 'student'
          if (role !== 'admin') {
            throw new Error('Esta cuenta no es administrador. Regístrala primero en «Registrar administrador».')
          }
          await ensureAdminRecord(db, uid, account, delivery, String(snap.data()?.fullName || ''))
          const sent = await issueAndSendAdminOtp(uid, delivery, db)
          return { to: sent.to, needsInboxConfirm: sent.needsInboxConfirm }
        }

        beginAdminOtpChallenge()
        setAdminOtpPending(true)
        try {
          const current = auth.currentUser
          if (current?.email?.toLowerCase() === account) {
            return await sendWithSession(current.uid)
          }
          const cred = await signInWithEmailAndPassword(auth, account, password)
          return await sendWithSession(cred.user.uid)
        } catch (err) {
          const code = err instanceof FirebaseError ? err.code : ''
          if (code === 'auth/too-many-requests') {
            const sent = await sendFallback()
            return { to: sent.to, needsInboxConfirm: sent.needsInboxConfirm, throttled: true }
          }
          endAdminOtpChallenge()
          setAdminOtpPending(false)
          if (
            code === 'auth/invalid-credential' ||
            code === 'auth/wrong-password' ||
            code === 'auth/user-not-found' ||
            code === 'auth/invalid-login-credentials'
          ) {
            throw new Error('Correo o contraseña incorrectos.')
          }
          if (err instanceof Error && err.message.includes('administrador')) throw err
          throw new Error(logAndMessageFirestoreError('requestAdminEmailCode', err))
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
      async signUpAdmin({ password, fullName, contactEmail, preferredDelivery }) {
        const accountEmail = contactEmail.trim().toLowerCase()
        if (!accountEmail) {
          throw new Error('Indica el correo donde recibirás el código.')
        }

        const provision = async (uid: string, sdb: typeof db) => {
          await ensureAdminRecord(sdb, uid, accountEmail, preferredDelivery, fullName)
          const sent = await issueAndSendAdminOtp(uid, preferredDelivery, sdb)
          return {
            emailedTo: sent.to,
            channel: sent.channel,
            needsInboxConfirm: sent.needsInboxConfirm,
          }
        }

        try {
          return await runWithSecondaryCreate(accountEmail, password, ({ uid, db: sdb }) =>
            provision(uid, sdb),
          )
        } catch (err) {
          const code = err instanceof FirebaseError ? err.code : ''
          if (code !== 'auth/email-already-in-use') {
            throw err instanceof Error ? err : new Error(logAndMessageFirestoreError('signUpAdmin', err))
          }
          try {
            const sent = await runWithSecondarySession(accountEmail, password, ({ uid, db: sdb }) =>
              provision(uid, sdb),
            )
            return { ...sent, alreadyExisted: true }
          } catch (inner) {
            const innerCode = inner instanceof FirebaseError ? inner.code : ''
            if (
              innerCode === 'auth/invalid-credential' ||
              innerCode === 'auth/wrong-password' ||
              innerCode === 'auth/invalid-login-credentials' ||
              innerCode === 'auth/too-many-requests'
            ) {
              return {
                emailedTo: accountEmail,
                channel: 'existing',
                alreadyExisted: true,
                needsLogin: true,
              }
            }
            throw inner instanceof Error ? inner : new Error(logAndMessageFirestoreError('signUpAdmin existing', inner))
          }
        }
      },
      async registerAdminWithGoogle(delivery) {
        sessionStorage.setItem(GOOGLE_ADMIN_REGISTER_KEY, delivery)
        sessionStorage.setItem(GOOGLE_INTENT_KEY, 'admin-register')
        const finish = async (googleUser: User) => {
          const email = (googleUser.email || '').toLowerCase()
          if (!email) {
            await fbSignOut(auth)
            throw new Error('Google no devolvió un correo. Usa una cuenta con Gmail visible.')
          }
          await finishGoogleUser(googleUser)
          await ensureAdminRecord(db, googleUser.uid, email, delivery, googleUser.displayName || '')
          await ensureRole(googleUser.uid, email, true)
          sessionStorage.removeItem(GOOGLE_ADMIN_REGISTER_KEY)
          sessionStorage.removeItem(GOOGLE_INTENT_KEY)
          endAdminOtpChallenge()
          setAdminOtpPending(false)
        }

        if (preferGoogleRedirect()) {
          await signInWithRedirect(auth, googleProvider)
          return
        }
        try {
          const cred = await signInWithPopup(auth, googleProvider)
          await finish(cred.user)
        } catch (err) {
          sessionStorage.removeItem(GOOGLE_ADMIN_REGISTER_KEY)
          sessionStorage.removeItem(GOOGLE_INTENT_KEY)
          const code = typeof err === 'object' && err && 'code' in err ? String((err as { code: string }).code) : ''
          if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
            sessionStorage.setItem(GOOGLE_ADMIN_REGISTER_KEY, delivery)
            sessionStorage.setItem(GOOGLE_INTENT_KEY, 'admin-register')
            await signInWithRedirect(auth, googleProvider)
            return
          }
          throw new Error(logAndMessageFirestoreError('registerAdminWithGoogle', err))
        }
      },
      async google(opts) {
        const intent: GoogleIntent = opts?.adminMode ? 'admin' : 'student'
        sessionStorage.setItem(GOOGLE_INTENT_KEY, intent)
        const afterGoogle = async (googleUser: User) => {
          await finishGoogleUser(googleUser)
          const email = (googleUser.email || '').toLowerCase()
          sessionStorage.removeItem(GOOGLE_INTENT_KEY)
          if (!opts?.adminMode) return
          const snap = await getDoc(doc(db, 'users', googleUser.uid))
          const role =
            snap.data()?.role === 'admin' || isAllowlistedAdminEmail(email) ? 'admin' : 'student'
          if (role !== 'admin') {
            await fbSignOut(auth)
            throw new Error('Este Google no está registrado como administrador.')
          }
          await ensureRole(googleUser.uid, email, true)
          endAdminOtpChallenge()
          setAdminOtpPending(false)
        }

        if (preferGoogleRedirect()) {
          await signInWithRedirect(auth, googleProvider)
          return
        }
        try {
          const cred = await signInWithPopup(auth, googleProvider)
          await afterGoogle(cred.user)
        } catch (err) {
          const code = typeof err === 'object' && err && 'code' in err ? String((err as { code: string }).code) : ''
          if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
            sessionStorage.setItem(GOOGLE_INTENT_KEY, intent)
            await signInWithRedirect(auth, googleProvider)
            return
          }
          sessionStorage.removeItem(GOOGLE_INTENT_KEY)
          throw new Error(logAndMessageFirestoreError('google', err))
        }
      },
      async resetPassword(email) {
        const account = email.trim().toLowerCase()
        if (!account) throw new Error('Escribe tu correo para restablecer la contraseña.')
        try {
          await sendPasswordResetEmail(auth, account)
        } catch (err) {
          throw new Error(logAndMessageFirestoreError('resetPassword', err))
        }
      },
      async completeProfile({
        fullName,
        studentId,
        bio,
        avatarIndex,
        customAvatar,
        photoFile,
        profilePhotoUrl,
        firstName,
        lastName,
        country,
        city,
        timezone,
        visibility,
        interests,
        imageAlt,
      }) {
        if (!user) return
        const description = bio.trim()
        const first = (firstName ?? splitName(fullName).first).trim()
        const last = (lastName ?? splitName(fullName).last).trim()
        const composed = [first, last].filter(Boolean).join(' ') || fullName.trim()
        const payload: Record<string, unknown> = {
          uid: user.uid,
          email: user.email,
          fullName: composed,
          firstName: first,
          lastName: last,
          studentId: studentId.trim(),
          bio: description,
          description,
          profileComplete: true,
          lastAccess: new Date().toISOString(),
        }
        if (country != null) payload.country = country
        if (city != null) payload.city = city
        if (timezone != null) payload.timezone = timezone
        if (visibility) payload.visibility = visibility
        if (interests != null) payload.interests = interests
        if (imageAlt != null) payload.imageAlt = imageAlt
        if (photoFile) {
          const url = await uploadProfilePhoto(user.uid, photoFile)
          payload.profilePhotoUrl = url
          payload.avatarIndex = deleteField()
          payload.customAvatar = deleteField()
        } else if (profilePhotoUrl === null) {
          payload.profilePhotoUrl = deleteField()
        } else if (profilePhotoUrl) {
          payload.profilePhotoUrl = profilePhotoUrl
        } else if (customAvatar) {
          payload.customAvatar = customAvatar
          payload.avatarIndex = deleteField()
          payload.profilePhotoUrl = deleteField()
        } else {
          payload.customAvatar = deleteField()
          if (avatarIndex != null) {
            payload.avatarIndex = avatarIndex
            payload.profilePhotoUrl = `/avatars/avatar_${avatarIndex + 1}.png`
          }
        }
        await setDoc(doc(db, 'users', user.uid), payload, { merge: true })
      },
      async signOut() {
        endAdminOtpChallenge()
        setAdminOtpPending(false)
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
            practiceMinutes: (profile.practiceMinutes ?? 0) + 18,
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
              ...profile.recentAssessments.filter((a) => a.taskId !== taskId),
            ].slice(0, 40),
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
          practiceMinutes: 0,
          streakLastDate: deleteField(),
          feedItems: [],
          recentAssessments: [],
        })
      },
      async updateStudentSettings(p) {
        if (!user) return
        const payload: Record<string, unknown> = {}
        if (p.appLanguage) payload.appLanguage = p.appLanguage
        if (p.notifications) payload.notifications = p.notifications
        if (Object.keys(payload).length === 0) return
        await setDoc(doc(db, 'users', user.uid), payload, { merge: true })
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
  }, [user, profile, loading, adminOtpPending])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

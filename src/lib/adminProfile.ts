import { addDoc, collection, doc, getDoc, setDoc, updateDoc, type Firestore } from 'firebase/firestore'
import type { User } from 'firebase/auth'
import { db } from '../firebase'
import { hashVerificationCode } from './cryptoStorage'
import { logAndMessageFirestoreError } from './firestoreErrors'

export type AdminDelivery = 'personal' | 'institutional'

export type AdminRecord = {
  uid: string
  email: string
  fullName: string
  personalEmail: string
  institutionalEmail: string
  preferredDelivery: AdminDelivery
  role: 'admin'
  emailVerificationEnabled: boolean
  createdAt: string
  otpHash?: string
  otpExpiresAt?: string
  otpDeliveryEmail?: string
  lastOtpRequestedAt?: string
  otpFailCount?: number
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase()
}

export function resolveDeliveryEmail(
  admin: Pick<AdminRecord, 'personalEmail' | 'institutionalEmail' | 'email'>,
  delivery: AdminDelivery,
): string {
  const personal = normalizeEmail(admin.personalEmail || admin.email)
  const institutional = normalizeEmail(admin.institutionalEmail)
  if (delivery === 'personal') {
    if (!personal) throw new Error('No hay correo personal configurado para este admin.')
    return personal
  }
  return institutional || personal
}

export async function getAdminRecord(uid: string, firestore: Firestore = db): Promise<AdminRecord | null> {
  const snap = await getDoc(doc(firestore, 'admins', uid))
  if (!snap.exists()) return null
  return snap.data() as AdminRecord
}

/** Crea o completa la ficha de admin (correo personal/institucional) sin guardar el código en claro. */
export async function ensureAdminRecord(
  firestore: Firestore,
  uid: string,
  email: string,
  delivery: AdminDelivery,
  fullName = '',
) {
  const account = normalizeEmail(email)
  const ref = doc(firestore, 'admins', uid)
  const snap = await getDoc(ref)
  const prev = snap.exists() ? (snap.data() as AdminRecord) : null
  const personalEmail =
    delivery === 'personal' ? account : normalizeEmail(prev?.personalEmail || prev?.email || '')
  const institutionalEmail =
    delivery === 'institutional' ? account : normalizeEmail(prev?.institutionalEmail || '')
  const payload: AdminRecord = {
    uid,
    email: account,
    fullName: (fullName || prev?.fullName || '').trim(),
    personalEmail: personalEmail || account,
    institutionalEmail,
    preferredDelivery: delivery,
    role: 'admin',
    emailVerificationEnabled: true,
    createdAt: prev?.createdAt || new Date().toISOString(),
  }
  await setDoc(ref, payload, { merge: true })
  await setDoc(
    doc(firestore, 'users', uid),
    {
      uid,
      email: account,
      role: 'admin',
      profileComplete: true,
      studentId: 'ADMIN',
      fullName: payload.fullName,
      personalEmail: payload.personalEmail,
      institutionalEmail: payload.institutionalEmail,
      preferredDelivery: delivery,
    },
    { merge: true },
  )
  const saved = await getDoc(ref)
  return saved.data() as AdminRecord
}

export async function saveAdminProfile(
  user: User,
  input: {
    email: string
    fullName: string
    personalEmail: string
    institutionalEmail: string
    preferredDelivery: AdminDelivery
  },
) {
  const uid = user.uid
  await user.getIdToken(true)
  const email = normalizeEmail(input.email)
  const personalEmail = normalizeEmail(input.personalEmail)
  const institutionalEmail = normalizeEmail(input.institutionalEmail)
  if (!personalEmail && !institutionalEmail) {
    throw new Error('Indica al menos un correo personal o institucional para recibir el código.')
  }

  const payload: AdminRecord = {
    uid,
    email,
    fullName: input.fullName.trim(),
    personalEmail,
    institutionalEmail,
    preferredDelivery: input.preferredDelivery,
    role: 'admin',
    emailVerificationEnabled: true,
    createdAt: new Date().toISOString(),
  }

  const ref = doc(db, 'admins', uid)
  try {
    await setDoc(ref, payload)
    const snap = await getDoc(ref)
    if (!snap.exists()) {
      throw new Error('El documento admins/{uid} no quedó guardado.')
    }
    console.info('[Firestore] Admin tabla OK', uid)
  } catch (err) {
    throw new Error(logAndMessageFirestoreError(`setDoc admins/${uid}`, err))
  }

  return payload
}

function hashesEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let mix = 0
  for (let i = 0; i < a.length; i += 1) mix |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return mix === 0
}

const SESSION_OTP_KEY = 'fluidlearn.adminOtp.v1'
const OTP_PENDING_KEY = 'fluidlearn.adminOtpPending'

export function beginAdminOtpChallenge() {
  sessionStorage.setItem(OTP_PENDING_KEY, '1')
}

export function endAdminOtpChallenge() {
  sessionStorage.removeItem(OTP_PENDING_KEY)
}

export function hasAdminOtpChallenge() {
  return sessionStorage.getItem(OTP_PENDING_KEY) === '1'
}

export async function storeSessionOtp(email: string, code: string, minutes = 15) {
  const otpHash = await hashVerificationCode(code.trim())
  sessionStorage.setItem(
    SESSION_OTP_KEY,
    JSON.stringify({
      email: email.trim().toLowerCase(),
      otpHash,
      exp: Date.now() + minutes * 60 * 1000,
    }),
  )
}

async function sessionOtpMatches(email: string, code: string) {
  const raw = sessionStorage.getItem(SESSION_OTP_KEY)
  if (!raw) return false
  try {
    const parsed = JSON.parse(raw) as { email?: string; otpHash?: string; exp?: number }
    if (parsed.email !== email.trim().toLowerCase() || !parsed.otpHash) return false
    if (Date.now() > Number(parsed.exp || 0)) {
      sessionStorage.removeItem(SESSION_OTP_KEY)
      return false
    }
    const hash = await hashVerificationCode(code.trim())
    return hashesEqual(hash, parsed.otpHash)
  } catch {
    return false
  }
}

export async function peekSessionOtp(email: string, code: string) {
  return sessionOtpMatches(email, code)
}

export async function consumeSessionOtp(email: string, code: string) {
  const ok = await sessionOtpMatches(email, code)
  if (ok) sessionStorage.removeItem(SESSION_OTP_KEY)
  return ok
}

/** Código seguro al azar (sin caracteres ambiguos I/O/0/1). */
export function generateSecureAdminCode(length = 10): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = crypto.getRandomValues(new Uint8Array(length))
  let out = ''
  for (let i = 0; i < length; i += 1) {
    out += alphabet[bytes[i]! % alphabet.length]!
  }
  return out
}

async function persistHashedOtp(
  firestore: Firestore,
  uid: string,
  admin: AdminRecord,
  delivery: AdminDelivery,
  code: string,
  expiresMinutes: number,
) {
  if (admin.lastOtpRequestedAt) {
    const elapsed = Date.now() - new Date(admin.lastOtpRequestedAt).getTime()
    if (elapsed < 8_000) {
      throw new Error('Espera unos segundos antes de pedir otro código.')
    }
  }
  const to = resolveDeliveryEmail(admin, delivery)
  const otpHash = await hashVerificationCode(code.trim())
  await storeSessionOtp(to, code, expiresMinutes)
  const otpExpiresAt = new Date(Date.now() + expiresMinutes * 60 * 1000).toISOString()
  try {
    await updateDoc(doc(firestore, 'admins', uid), {
      otpHash,
      otpExpiresAt,
      otpDeliveryEmail: to,
      preferredDelivery: delivery,
      lastOtpRequestedAt: new Date().toISOString(),
      otpFailCount: 0,
    })
  } catch {
    /* el hash queda en sessionStorage; el correo igual se envía */
  }
  const deliveryResult = await deliverOtpEmail(to, code.trim(), admin.fullName)
  return { to, ...deliveryResult }
}

/** Guarda un código concreto (solo hash en Firestore) y lo envía al correo. */
export async function storeAndSendAdminCode(
  uid: string,
  code: string,
  delivery: AdminDelivery,
  fullName: string,
  expiresMinutes = 10,
  firestore: Firestore = db,
) {
  const admin = await getAdminRecord(uid, firestore)
  if (!admin) {
    throw new Error('No hay ficha de administrador en Firestore (colección admins).')
  }
  if (fullName.trim()) admin.fullName = fullName.trim()
  return persistHashedOtp(firestore, uid, admin, delivery, code, expiresMinutes)
}

export type EmailDeliveryChannel = 'emailjs' | 'web3forms' | 'formsubmit' | 'firestore-mail' | 'dev-console'

export type EmailDeliveryResult = {
  channel: EmailDeliveryChannel
  /** Primera vez con FormSubmit: hay que confirmar el enlace en el correo. */
  needsInboxConfirm?: boolean
}

function formSubmitNeedsConfirm(message: string) {
  const msg = message.toLowerCase()
  return msg.includes('confirm') || msg.includes('activate') || msg.includes('activation')
}

async function sendViaFormSubmit(
  to: string,
  code: string,
  fullName: string,
  subject: string,
  text: string,
): Promise<EmailDeliveryResult | null> {
  const url = `https://formsubmit.co/ajax/${encodeURIComponent(to)}`
  const payload = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    _honey: '',
    name: fullName || 'Admin FluidLearn',
    email: to,
    codigo: code,
    message: text,
  }
  try {
    const jsonRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = (await jsonRes.json().catch(() => ({}))) as { success?: string | boolean; message?: string }
    if (jsonRes.ok && (data.success === true || data.success === 'true' || Boolean(data.message))) {
      return { channel: 'formsubmit', needsInboxConfirm: formSubmitNeedsConfirm(data.message || '') }
    }
  } catch {
    /* try form-urlencoded */
  }
  try {
    const body = new URLSearchParams()
    Object.entries(payload).forEach(([k, v]) => body.set(k, v))
    const formRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body,
    })
    const data = (await formRes.json().catch(() => ({}))) as { success?: string | boolean; message?: string }
    if (formRes.ok && (data.success === true || data.success === 'true' || Boolean(data.message))) {
      return { channel: 'formsubmit', needsInboxConfirm: formSubmitNeedsConfirm(data.message || '') }
    }
  } catch {
    /* next provider */
  }
  return null
}

/**
 * Envía el código al correo personal o institucional del admin.
 * FormSubmit primero (llega a Gmail/Outlook/universidad). La 1ª vez hay que abrir el enlace de activación.
 */
async function deliverOtpEmail(to: string, code: string, fullName: string): Promise<EmailDeliveryResult> {
  const subject = 'FluidLearn — tu código de administrador'
  const text =
    `Hola ${fullName || 'admin'},\n\n` +
    `Tu código para entrar como administrador en FluidLearn es:\n\n` +
    `${code}\n\n` +
    `Válido por unos minutos. Si no solicitaste este código, ignora este mensaje.`
  const html =
    `<p>Hola ${fullName || 'admin'},</p>` +
    `<p>Tu código para entrar como <strong>administrador</strong> en FluidLearn es:</p>` +
    `<p style="font-size:28px;letter-spacing:3px;font-weight:bold;color:#1967D2">${code}</p>` +
    `<p>Válido por unos minutos.</p>`

  const formSubmit = await sendViaFormSubmit(to, code, fullName, subject, text)
  if (formSubmit) return formSubmit

  const serviceId = String(import.meta.env.VITE_EMAILJS_SERVICE_ID || '').trim()
  const templateId = String(import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '').trim()
  const publicKey = String(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '').trim()

  if (serviceId && templateId && publicKey) {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: to,
          email: to,
          to_name: fullName || 'Admin',
          subject,
          message: text,
          code,
        },
      }),
    })
    if (res.ok) return { channel: 'emailjs' }
  }

  const web3Key = String(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim()
  if (web3Key) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          subject,
          from_name: 'FluidLearn',
          email: to,
          to,
          message: text,
          code,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { success?: boolean }
      if (res.ok && data.success !== false) return { channel: 'web3forms' }
    } catch {
      /* next */
    }
  }

  if (String(import.meta.env.VITE_USE_FIRESTORE_MAIL || '').trim() === 'true') {
    try {
      await addDoc(collection(db, 'mail'), {
        to: [to],
        message: { subject, text, html },
        createdAt: new Date().toISOString(),
      })
      return { channel: 'firestore-mail' }
    } catch {
      /* fall through */
    }
  }

  throw new Error(
    `No se pudo enviar el código a ${to}. Revisa internet e inténtalo otra vez. La primera vez Gmail puede pedirte confirmar un enlace de FormSubmit.`,
  )
}

/**
 * Genera OTP, lo guarda hasheado en `admins/{uid}` y lo envía al correo elegido.
 * Requiere sesión Auth activa (tras password).
 */
export async function issueAndSendAdminOtp(uid: string, delivery: AdminDelivery, firestore: Firestore = db) {
  const admin = await getAdminRecord(uid, firestore)
  if (!admin) {
    throw new Error('No hay ficha de administrador. Completa el registro o vuelve a enviar el código.')
  }
  const code = generateSecureAdminCode(8)
  return persistHashedOtp(firestore, uid, admin, delivery, code, 10)
}

/** Envía el código al correo sin exigir login (si Firebase bloqueó auth/too-many-requests). */
export async function issueEmailOnlyAdminOtp(to: string, fullName = '') {
  const code = generateSecureAdminCode(8)
  await storeSessionOtp(to, code, 15)
  const sent = await deliverOtpEmail(to, code, fullName)
  return { to, ...sent }
}

export async function verifyAdminOtp(uid: string, code: string, firestore: Firestore = db): Promise<boolean> {
  const admin = await getAdminRecord(uid, firestore)
  const email = admin?.personalEmail || admin?.email || admin?.institutionalEmail || ''
  if (email && (await consumeSessionOtp(email, code))) {
    await updateDoc(doc(firestore, 'admins', uid), {
      otpHash: null,
      otpExpiresAt: null,
      otpFailCount: 0,
      lastOtpVerifiedAt: new Date().toISOString(),
    }).catch(() => undefined)
    return true
  }
  if (!admin?.otpHash || !admin.otpExpiresAt) return false
  if (Date.now() > new Date(admin.otpExpiresAt).getTime()) {
    await updateDoc(doc(firestore, 'admins', uid), { otpHash: null, otpExpiresAt: null }).catch(() => undefined)
    return false
  }
  const hash = await hashVerificationCode(code.trim())
  if (!hashesEqual(hash, admin.otpHash)) {
    const fails = (admin.otpFailCount ?? 0) + 1
    if (fails >= 5) {
      await updateDoc(doc(firestore, 'admins', uid), {
        otpHash: null,
        otpExpiresAt: null,
        otpFailCount: fails,
      }).catch(() => undefined)
    } else {
      await updateDoc(doc(firestore, 'admins', uid), { otpFailCount: fails }).catch(() => undefined)
    }
    return false
  }

  try {
    await updateDoc(doc(firestore, 'admins', uid), {
      otpHash: null,
      otpExpiresAt: null,
      otpFailCount: 0,
      lastOtpVerifiedAt: new Date().toISOString(),
    })
  } catch {
    /* ignore clear errors */
  }
  return true
}

/** Compatibilidad: código fijo antiguo en users.emailVerificationCodeHash */
export async function verifyLegacyAdminCode(userHash: string | undefined, code: string) {
  if (!userHash) return false
  const hash = await hashVerificationCode(code.trim())
  return hashesEqual(hash, userHash)
}

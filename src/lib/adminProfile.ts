import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
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
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase()
}

export function resolveDeliveryEmail(
  admin: Pick<AdminRecord, 'personalEmail' | 'institutionalEmail' | 'email'>,
  delivery: AdminDelivery,
): string {
  if (delivery === 'personal') {
    const e = normalizeEmail(admin.personalEmail || admin.email)
    if (!e) throw new Error('No hay correo personal configurado para este admin.')
    return e
  }
  const e = normalizeEmail(admin.institutionalEmail)
  if (!e) throw new Error('No hay correo institucional configurado. Edítalo en el registro o elige personal.')
  return e
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

export async function getAdminRecord(uid: string): Promise<AdminRecord | null> {
  const snap = await getDoc(doc(db, 'admins', uid))
  if (!snap.exists()) return null
  return snap.data() as AdminRecord
}

function generateOtp(): string {
  const n = crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000
  return String(n).padStart(6, '0')
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

/** Guarda un código concreto (p. ej. el generado en registro) y lo envía al correo. */
export async function storeAndSendAdminCode(
  uid: string,
  code: string,
  delivery: AdminDelivery,
  fullName: string,
  expiresMinutes = 30,
) {
  const admin = await getAdminRecord(uid)
  if (!admin) {
    throw new Error('No hay ficha de administrador en Firestore (colección admins).')
  }
  const to = resolveDeliveryEmail(admin, delivery)
  const otpHash = await hashVerificationCode(code.trim())
  const otpExpiresAt = new Date(Date.now() + expiresMinutes * 60 * 1000).toISOString()
  try {
    await updateDoc(doc(db, 'admins', uid), {
      otpHash,
      otpExpiresAt,
      otpDeliveryEmail: to,
      preferredDelivery: delivery,
      lastOtpRequestedAt: new Date().toISOString(),
    })
  } catch (err) {
    throw new Error(logAndMessageFirestoreError(`updateDoc admins/${uid} otp`, err))
  }
  const deliveryResult = await deliverOtpEmail(to, code.trim(), fullName || admin.fullName)
  console.info('[Admin OTP] código enviado', { to, ...deliveryResult })
  return { to, ...deliveryResult }
}

export type EmailDeliveryChannel = 'emailjs' | 'web3forms' | 'formsubmit' | 'firestore-mail' | 'dev-console'

export type EmailDeliveryResult = {
  channel: EmailDeliveryChannel
  /** Primera vez con FormSubmit: hay que confirmar el enlace en el correo. */
  needsInboxConfirm?: boolean
}

/**
 * Envía el código al correo real del admin.
 * Orden: EmailJS → Web3Forms → FormSubmit → (opcional) cola Firestore → consola en DEV.
 * Nota: escribir en `mail` NO envía solo; hace falta la extensión Trigger Email.
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
    if (!res.ok) {
      const body = await res.text()
      console.error('[Admin OTP] EmailJS error', body)
    } else {
      return { channel: 'emailjs' }
    }
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
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
      if (res.ok && data.success !== false) {
        return { channel: 'web3forms' }
      }
      console.warn('[Admin OTP] Web3Forms', data)
    } catch (w3Err) {
      console.warn('[Admin OTP] Web3Forms falló', w3Err)
    }
  }

  // FormSubmit: envía de verdad al correo. La 1ª vez pide confirmar el enlace en la bandeja.
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
        name: fullName || 'Admin FluidLearn',
        email: to,
        Código: code,
        message: text,
      }),
    })
    const data = (await res.json().catch(() => ({}))) as {
      success?: string | boolean
      message?: string
    }
    const ok = res.ok && (data.success === true || data.success === 'true')
    if (ok) {
      const msg = (data.message || '').toLowerCase()
      const needsInboxConfirm =
        msg.includes('confirm') || msg.includes('activate') || msg.includes('activation')
      return { channel: 'formsubmit', needsInboxConfirm }
    }
    console.warn('[Admin OTP] FormSubmit respuesta', res.status, data)
  } catch (fsErr) {
    console.warn('[Admin OTP] FormSubmit falló', fsErr)
  }

  // Solo si activaste la extensión Trigger Email en Firebase.
  if (String(import.meta.env.VITE_USE_FIRESTORE_MAIL || '').trim() === 'true') {
    try {
      await addDoc(collection(db, 'mail'), {
        to: [to],
        message: { subject, text, html },
        createdAt: new Date().toISOString(),
      })
      return { channel: 'firestore-mail' }
    } catch (mailErr) {
      console.warn('[Admin OTP] cola mail no disponible', mailErr)
    }
  }

  if (import.meta.env.DEV) {
    console.warn(`[Admin OTP DEV] código para ${to}: ${code}`)
    return { channel: 'dev-console' }
  }

  throw new Error(
    'No se pudo enviar el correo a ' +
      to +
      '. Revisa spam o configura VITE_EMAILJS_* / VITE_WEB3FORMS_ACCESS_KEY en .env.',
  )
}

/**
 * Genera OTP, lo guarda hasheado en `admins/{uid}` y lo envía al correo elegido.
 * Requiere sesión Auth activa (tras password).
 */
export async function issueAndSendAdminOtp(uid: string, delivery: AdminDelivery) {
  const admin = await getAdminRecord(uid)
  if (!admin) {
    throw new Error('No hay ficha de administrador en Firestore (colección admins). Regístrate de nuevo.')
  }

  const to = resolveDeliveryEmail(admin, delivery)
  const code = generateOtp()
  const otpHash = await hashVerificationCode(code)
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()

  try {
    await updateDoc(doc(db, 'admins', uid), {
      otpHash,
      otpExpiresAt,
      otpDeliveryEmail: to,
      preferredDelivery: delivery,
      lastOtpRequestedAt: new Date().toISOString(),
    })
  } catch (err) {
    throw new Error(logAndMessageFirestoreError(`updateDoc admins/${uid} otp`, err))
  }

  const deliveryResult = await deliverOtpEmail(to, code, admin.fullName)
  console.info('[Admin OTP] enviado', { to, ...deliveryResult })
  return { to, ...deliveryResult }
}

export async function verifyAdminOtp(uid: string, code: string): Promise<boolean> {
  const admin = await getAdminRecord(uid)
  if (!admin?.otpHash || !admin.otpExpiresAt) return false
  if (Date.now() > new Date(admin.otpExpiresAt).getTime()) return false
  const hash = await hashVerificationCode(code.trim())
  if (hash !== admin.otpHash) return false

  try {
    await updateDoc(doc(db, 'admins', uid), {
      otpHash: null,
      otpExpiresAt: null,
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
  return (await hashVerificationCode(code.trim())) === userHash
}

import { isAllowlistedAdminEmail } from './adminEmails'

export type LoginSlot = 'student' | 'admin'

const LEGACY_KEY = 'fluidlearn.login.v1'
const SLOT_KEYS: Record<LoginSlot, string> = {
  student: 'fluidlearn.login.student.v2',
  admin: 'fluidlearn.login.admin.v2',
}
const SECRET = 'FluidLearn-USB-2026-local-vault'

function toB64(bytes: ArrayBuffer | Uint8Array) {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  let s = ''
  arr.forEach((b) => {
    s += String.fromCharCode(b)
  })
  return btoa(s)
}

function fromB64(value: string) {
  const bin = atob(value)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i)
  return out
}

async function getKey(salt: Uint8Array) {
  const base = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SECRET),
    'PBKDF2',
    false,
    ['deriveKey'],
  )
  const saltBuf = salt.buffer.slice(salt.byteOffset, salt.byteOffset + salt.byteLength) as ArrayBuffer
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: saltBuf, iterations: 120_000, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  )
}

/** El vault mixto anterior mezclaba profesor y estudiante: se elimina, no se rellena en el otro login. */
function dropLegacySharedVault() {
  localStorage.removeItem(LEGACY_KEY)
}

export async function saveEncryptedCredentials(slot: LoginSlot, email: string, password: string) {
  dropLegacySharedVault()
  const normalized = email.trim().toLowerCase()
  if (slot === 'student' && isAllowlistedAdminEmail(normalized)) {
    return
  }
  if (slot === 'student') {
    const adminSaved = await loadEncryptedCredentials('admin')
    if (adminSaved && adminSaved.email === normalized) return
  }
  if (slot === 'admin' && !isAllowlistedAdminEmail(normalized)) {
    /* admin no allowlist (p. ej. docente con Gmail): sí puede recordar, solo en el slot admin */
  }
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await getKey(salt)
  const payload = new TextEncoder().encode(JSON.stringify({ email: normalized, password, slot }))
  const ivBuf = iv.buffer.slice(iv.byteOffset, iv.byteOffset + iv.byteLength) as ArrayBuffer
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: ivBuf }, key, payload)
  localStorage.setItem(
    SLOT_KEYS[slot],
    JSON.stringify({
      salt: toB64(salt),
      iv: toB64(iv),
      data: toB64(cipher),
    }),
  )
}

export async function loadEncryptedCredentials(slot: LoginSlot): Promise<{ email: string; password: string } | null> {
  dropLegacySharedVault()
  const raw = localStorage.getItem(SLOT_KEYS[slot])
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as { salt: string; iv: string; data: string }
    const key = await getKey(fromB64(parsed.salt))
    const iv = fromB64(parsed.iv)
    const data = fromB64(parsed.data)
    const ivBuf = iv.buffer.slice(iv.byteOffset, iv.byteOffset + iv.byteLength) as ArrayBuffer
    const dataBuf = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBuf }, key, dataBuf)
    const saved = JSON.parse(new TextDecoder().decode(plain)) as { email: string; password: string; slot?: LoginSlot }
    if (slot === 'student' && isAllowlistedAdminEmail(saved.email)) {
      localStorage.removeItem(SLOT_KEYS.student)
      return null
    }
    if (saved.slot && saved.slot !== slot) {
      localStorage.removeItem(SLOT_KEYS[slot])
      return null
    }
    return { email: saved.email, password: saved.password }
  } catch {
    localStorage.removeItem(SLOT_KEYS[slot])
    return null
  }
}

export function clearEncryptedCredentials(slot?: LoginSlot) {
  dropLegacySharedVault()
  if (slot) {
    localStorage.removeItem(SLOT_KEYS[slot])
    return
  }
  localStorage.removeItem(SLOT_KEYS.student)
  localStorage.removeItem(SLOT_KEYS.admin)
}

export async function hashVerificationCode(code: string) {
  const normalized = code.trim().toUpperCase()
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`FL-ADMIN:${normalized}`))
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

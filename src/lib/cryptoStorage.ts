const STORAGE_KEY = 'fluidlearn.login.v1'
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

export async function saveEncryptedCredentials(email: string, password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await getKey(salt)
  const payload = new TextEncoder().encode(JSON.stringify({ email, password }))
  const ivBuf = iv.buffer.slice(iv.byteOffset, iv.byteOffset + iv.byteLength) as ArrayBuffer
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: ivBuf }, key, payload)
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      salt: toB64(salt),
      iv: toB64(iv),
      data: toB64(cipher),
    }),
  )
}

export async function loadEncryptedCredentials(): Promise<{ email: string; password: string } | null> {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as { salt: string; iv: string; data: string }
    const key = await getKey(fromB64(parsed.salt))
    const iv = fromB64(parsed.iv)
    const data = fromB64(parsed.data)
    const ivBuf = iv.buffer.slice(iv.byteOffset, iv.byteOffset + iv.byteLength) as ArrayBuffer
    const dataBuf = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBuf }, key, dataBuf)
    return JSON.parse(new TextDecoder().decode(plain)) as { email: string; password: string }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function clearEncryptedCredentials() {
  localStorage.removeItem(STORAGE_KEY)
}

export async function hashVerificationCode(code: string) {
  const normalized = code.trim().toUpperCase()
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`FL-ADMIN:${normalized}`))
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}
